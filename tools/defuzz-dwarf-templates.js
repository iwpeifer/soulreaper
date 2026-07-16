const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i += 1) {
    c ^= buf[i];
    for (let k = 0; k < 8; k += 1) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}

function readPng(file) {
  const raw = fs.readFileSync(file);
  if (!raw.subarray(0, 8).equals(PNG_SIGNATURE)) throw new Error(`${file}: not a PNG`);
  let offset = 8;
  let width = 0;
  let height = 0;
  let colorType = 0;
  let bitDepth = 0;
  const idat = [];
  while (offset < raw.length) {
    const length = raw.readUInt32BE(offset);
    const type = raw.subarray(offset + 4, offset + 8).toString("ascii");
    const data = raw.subarray(offset + 8, offset + 8 + length);
    offset += 12 + length;
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === "IDAT") {
      idat.push(data);
    } else if (type === "IEND") {
      break;
    }
  }
  if (bitDepth !== 8 || colorType !== 6) throw new Error(`${file}: expected 8-bit RGBA PNG`);
  const inflated = zlib.inflateSync(Buffer.concat(idat));
  const bpp = 4;
  const stride = width * bpp;
  const pixels = Buffer.alloc(width * height * bpp);
  let inOffset = 0;
  for (let y = 0; y < height; y += 1) {
    const filter = inflated[inOffset++];
    const row = Buffer.from(inflated.subarray(inOffset, inOffset + stride));
    inOffset += stride;
    const prevOffset = (y - 1) * stride;
    const outOffset = y * stride;
    for (let x = 0; x < stride; x += 1) {
      const left = x >= bpp ? row[x - bpp] : 0;
      const up = y > 0 ? pixels[prevOffset + x] : 0;
      const upLeft = y > 0 && x >= bpp ? pixels[prevOffset + x - bpp] : 0;
      let value = row[x];
      if (filter === 1) value = (value + left) & 255;
      else if (filter === 2) value = (value + up) & 255;
      else if (filter === 3) value = (value + Math.floor((left + up) / 2)) & 255;
      else if (filter === 4) {
        const p = left + up - upLeft;
        const pa = Math.abs(p - left);
        const pb = Math.abs(p - up);
        const pc = Math.abs(p - upLeft);
        value = (value + (pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft)) & 255;
      } else if (filter !== 0) {
        throw new Error(`${file}: unsupported PNG filter ${filter}`);
      }
      row[x] = value;
      pixels[outOffset + x] = value;
    }
  }
  return { width, height, pixels };
}

function writePng(file, image) {
  const { width, height, pixels } = image;
  const stride = width * 4;
  const scanlines = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const outOffset = y * (stride + 1);
    scanlines[outOffset] = 0;
    pixels.copy(scanlines, outOffset + 1, y * stride, (y + 1) * stride);
  }
  const chunks = [];
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  chunks.push(makeChunk("IHDR", ihdr));
  chunks.push(makeChunk("IDAT", zlib.deflateSync(scanlines, { level: 9 })));
  chunks.push(makeChunk("IEND", Buffer.alloc(0)));
  fs.writeFileSync(file, Buffer.concat([PNG_SIGNATURE, ...chunks]));
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const out = Buffer.alloc(12 + data.length);
  out.writeUInt32BE(data.length, 0);
  typeBuf.copy(out, 4);
  data.copy(out, 8);
  out.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 8 + data.length);
  return out;
}

function alphaBounds(image) {
  let minX = image.width;
  let minY = image.height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < image.height; y += 1) {
    for (let x = 0; x < image.width; x += 1) {
      const a = image.pixels[(y * image.width + x) * 4 + 3];
      if (!a) continue;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
  return maxX < 0 ? null : { minX, minY, maxX, maxY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

function colorKey(r, g, b) {
  return `${r},${g},${b}`;
}

function getColor(buf, index) {
  return [buf[index], buf[index + 1], buf[index + 2]];
}

function setColor(buf, index, color, alpha = 255) {
  buf[index] = color[0];
  buf[index + 1] = color[1];
  buf[index + 2] = color[2];
  buf[index + 3] = alpha;
}

function distSq(a, b) {
  const dr = a[0] - b[0];
  const dg = a[1] - b[1];
  const db = a[2] - b[2];
  return dr * dr + dg * dg + db * db;
}

function buildPalette(image, target = 42) {
  const counts = new Map();
  for (let i = 0; i < image.pixels.length; i += 4) {
    const a = image.pixels[i + 3];
    if (a < 128) continue;
    const r = image.pixels[i] & 0xf8;
    const g = image.pixels[i + 1] & 0xf8;
    const b = image.pixels[i + 2] & 0xf8;
    const key = colorKey(r, g, b);
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  const colors = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, target)
    .map(([key]) => key.split(",").map(Number));
  if (!colors.length) colors.push([0, 0, 0]);
  return colors;
}

function nearestPaletteColor(color, palette) {
  let best = palette[0];
  let bestDist = Infinity;
  for (const candidate of palette) {
    const d = distSq(color, candidate);
    if (d < bestDist) {
      bestDist = d;
      best = candidate;
    }
  }
  return best;
}

function neighborOpaque(mask, width, height, x, y) {
  let count = 0;
  for (let yy = y - 1; yy <= y + 1; yy += 1) {
    for (let xx = x - 1; xx <= x + 1; xx += 1) {
      if (xx === x && yy === y) continue;
      if (xx < 0 || yy < 0 || xx >= width || yy >= height) continue;
      if (mask[yy * width + xx]) count += 1;
    }
  }
  return count;
}

function smoothMask(mask, width, height) {
  const out = Uint8Array.from(mask);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = y * width + x;
      const neighbors = neighborOpaque(mask, width, height, x, y);
      if (mask[index] && neighbors <= 1) out[index] = 0;
      else if (!mask[index] && neighbors >= 6) out[index] = 1;
    }
  }
  return out;
}

function cleanupImage(image) {
  const palette = buildPalette(image);
  const { width, height, pixels } = image;
  let mask = new Uint8Array(width * height);
  for (let i = 0; i < width * height; i += 1) {
    mask[i] = pixels[i * 4 + 3] >= 112 ? 1 : 0;
  }
  mask = smoothMask(mask, width, height);
  const out = Buffer.from(pixels);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const p = y * width + x;
      const i = p * 4;
      if (!mask[p]) {
        out[i] = 0;
        out[i + 1] = 0;
        out[i + 2] = 0;
        out[i + 3] = 0;
        continue;
      }
      const original = getColor(pixels, i);
      const q = nearestPaletteColor(original, palette);
      const neighborColors = [];
      for (let yy = y - 1; yy <= y + 1; yy += 1) {
        for (let xx = x - 1; xx <= x + 1; xx += 1) {
          if (xx < 0 || yy < 0 || xx >= width || yy >= height) continue;
          const np = yy * width + xx;
          if (!mask[np]) continue;
          neighborColors.push(getColor(pixels, np * 4));
        }
      }
      const sorted = neighborColors.sort((a, b) => distSq(original, a) - distSq(original, b));
      const local = sorted[0] || original;
      const color = distSq(original, q) <= distSq(original, local) * 1.35 ? q : nearestPaletteColor(local, palette);
      setColor(out, i, color, 255);
    }
  }
  image.pixels = out;
  return image;
}

function metrics(file) {
  const image = readPng(file);
  const colors = new Set();
  let semi = 0;
  let opaque = 0;
  for (let i = 0; i < image.pixels.length; i += 4) {
    const a = image.pixels[i + 3];
    if (!a) continue;
    if (a < 255) semi += 1;
    else opaque += 1;
    colors.add(`${image.pixels[i]},${image.pixels[i + 1]},${image.pixels[i + 2]},${a}`);
  }
  return { file, size: `${image.width}x${image.height}`, bounds: alphaBounds(image), opaque, semi, colors: colors.size };
}

if (require.main === module) {
  console.log("This module now exposes PNG helpers only. It no longer performs destructive template cleanup.");
}

module.exports = {
  readPng,
  writePng,
  alphaBounds,
  metrics
};
