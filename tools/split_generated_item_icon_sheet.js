const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const sourcePath = process.argv[2];
if (!sourcePath) {
  console.error("Usage: node split_generated_item_icon_sheet.js <generated-sheet.png> [items|fixes|weapons]");
  process.exit(1);
}
const mode = process.argv[3] || "items";

const outDir = path.resolve(__dirname, "../assets/items");
fs.mkdirSync(outDir, { recursive: true });

const configs = {
  items: {
    cols: 7,
    rows: 3,
    contactSheet: "item-icons-contact-sheet.png",
    sourceSheet: "item-icons-ai-source-sheet.png",
    names: [
      "bone.png",
      "brown-pelt.png",
      "grey-pelt.png",
      "fang.png",
      "frond.png",
      "purple-mushroom.png",
      "red-mushroom.png",
      "opal.png",
      "emerald.png",
      "sapphire.png",
      "ruby.png",
      "diamond.png",
      "aquamarine.png",
      "onyx.png",
      "amethyst.png",
      "parcel.png",
      "skull.png",
      "copper-coin.png",
      "silver-coin.png",
      "gold-coin.png",
      "ether.png"
    ]
  },
  fixes: {
    cols: 4,
    rows: 1,
    contactSheet: "item-icon-fixes-contact-sheet.png",
    sourceSheet: "item-icon-fixes-ai-source-sheet.png",
    names: [
      "bone.png",
      "brown-pelt.png",
      "grey-pelt.png",
      "fang.png"
    ]
  },
  weapons: {
    cols: 4,
    rows: 4,
    contactSheet: "weapon-icons-contact-sheet.png",
    sourceSheet: "weapon-icons-ai-source-sheet.png",
    names: [
      "rat-claw.png",
      "iron-dagger.png",
      "ivory-wand.png",
      "willow-branch.png",
      "wooden-knife.png",
      "iron-shortsword.png",
      "wooden-staff.png",
      "ebony-wand.png",
      "bone-staff.png",
      "shortbow.png",
      "longbow.png",
      "iron-longsword.png",
      "iron-battleaxe.png",
      "iron-mace.png",
      "wooden-shield.png",
      "iron-shield.png"
    ]
  }
};

const config = configs[mode];
if (!config) {
  console.error(`Unknown mode "${mode}". Expected one of: ${Object.keys(configs).join(", ")}`);
  process.exit(1);
}
const { cols, rows, names } = config;

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n += 1) {
  let c = n;
  for (let k = 0; k < 8; k += 1) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  crcTable[n] = c >>> 0;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])));
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function savePng(filePath, width, height, rgba) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (width * 4 + 1)] = 0;
    rgba.copy(raw, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const png = Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0))
  ]);
  fs.writeFileSync(filePath, png);
}

function decodePng(filePath) {
  const png = fs.readFileSync(filePath);
  if (!png.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) throw new Error("Not a PNG");
  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idat = [];
  while (offset < png.length) {
    const length = png.readUInt32BE(offset);
    const type = png.subarray(offset + 4, offset + 8).toString("ascii");
    const data = png.subarray(offset + 8, offset + 8 + length);
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
  if (bitDepth !== 8 || ![2, 6].includes(colorType)) throw new Error(`Unsupported PNG format: bitDepth=${bitDepth}, colorType=${colorType}`);
  const channels = colorType === 6 ? 4 : 3;
  const stride = width * channels;
  const inflated = zlib.inflateSync(Buffer.concat(idat));
  const pixels = Buffer.alloc(width * height * 4);
  let inOffset = 0;
  let previous = Buffer.alloc(stride);
  for (let y = 0; y < height; y += 1) {
    const filter = inflated[inOffset];
    inOffset += 1;
    const row = Buffer.from(inflated.subarray(inOffset, inOffset + stride));
    inOffset += stride;
    for (let x = 0; x < stride; x += 1) {
      const left = x >= channels ? row[x - channels] : 0;
      const up = previous[x] || 0;
      const upLeft = x >= channels ? previous[x - channels] || 0 : 0;
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
      }
      row[x] = value;
    }
    for (let x = 0; x < width; x += 1) {
      const src = x * channels;
      const dst = (y * width + x) * 4;
      pixels[dst] = row[src];
      pixels[dst + 1] = row[src + 1];
      pixels[dst + 2] = row[src + 2];
      pixels[dst + 3] = channels === 4 ? row[src + 3] : 255;
    }
    previous = row;
  }
  return { width, height, pixels };
}

function isMagenta(r, g, b) {
  return r > 170 && b > 145 && g < 145 && r - g > 70 && b - g > 55;
}

function alphaFor(r, g, b) {
  if (isMagenta(r, g, b)) return 0;
  if (r > 145 && b > 125 && g < 165 && r - g > 45 && b - g > 35) return 40;
  return 255;
}

function get(src, x, y) {
  const xx = Math.max(0, Math.min(src.width - 1, Math.round(x)));
  const yy = Math.max(0, Math.min(src.height - 1, Math.round(y)));
  const i = (yy * src.width + xx) * 4;
  const r = src.pixels[i];
  const g = src.pixels[i + 1];
  const b = src.pixels[i + 2];
  const a = Math.min(src.pixels[i + 3], alphaFor(r, g, b));
  if (a <= 0) return [0, 0, 0, 0];
  return [r, g, b, a];
}

function put(dest, width, x, y, rgba) {
  if (x < 0 || y < 0 || x >= width || y >= width) return;
  const i = (y * width + x) * 4;
  if (rgba[3] <= 0) {
    dest[i] = 0;
    dest[i + 1] = 0;
    dest[i + 2] = 0;
    dest[i + 3] = 0;
    return;
  }
  dest[i] = rgba[0];
  dest[i + 1] = rgba[1];
  dest[i + 2] = rgba[2];
  dest[i + 3] = rgba[3];
}

function boundsForCell(src, x0, y0, x1, y1) {
  let minX = x1;
  let minY = y1;
  let maxX = x0;
  let maxY = y0;
  for (let y = y0; y < y1; y += 1) {
    for (let x = x0; x < x1; x += 1) {
      const [r, g, b] = get(src, x, y);
      if (alphaFor(r, g, b) <= 20) continue;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }
  if (maxX <= minX || maxY <= minY) return { minX: x0, minY: y0, maxX: x1 - 1, maxY: y1 - 1 };
  const pad = 4;
  return {
    minX: Math.max(x0, minX - pad),
    minY: Math.max(y0, minY - pad),
    maxX: Math.min(x1 - 1, maxX + pad),
    maxY: Math.min(y1 - 1, maxY + pad)
  };
}

function makeIcon(src, bounds) {
  const size = 128;
  const dest = Buffer.alloc(size * size * 4);
  const bw = bounds.maxX - bounds.minX + 1;
  const bh = bounds.maxY - bounds.minY + 1;
  const scale = Math.min(112 / bw, 112 / bh);
  const drawW = Math.max(1, Math.round(bw * scale));
  const drawH = Math.max(1, Math.round(bh * scale));
  const dx = Math.round((size - drawW) / 2);
  const dy = Math.round((size - drawH) / 2);
  for (let y = 0; y < drawH; y += 1) {
    for (let x = 0; x < drawW; x += 1) {
      const sx = bounds.minX + Math.floor(x / scale);
      const sy = bounds.minY + Math.floor(y / scale);
      put(dest, size, dx + x, dy + y, get(src, sx, sy));
    }
  }
  return dest;
}

function copyIconToSheet(icon, sheet, sheetWidth, x0, y0) {
  for (let y = 0; y < 128; y += 1) {
    for (let x = 0; x < 128; x += 1) {
      const src = (y * 128 + x) * 4;
      const dst = ((y0 + y) * sheetWidth + x0 + x) * 4;
      sheet[dst] = icon[src];
      sheet[dst + 1] = icon[src + 1];
      sheet[dst + 2] = icon[src + 2];
      sheet[dst + 3] = icon[src + 3];
    }
  }
}

const src = decodePng(sourcePath);
const cellW = src.width / cols;
const cellH = src.height / rows;
const icons = [];
for (let row = 0; row < rows; row += 1) {
  for (let col = 0; col < cols; col += 1) {
    const index = row * cols + col;
    const x0 = Math.round(col * cellW);
    const y0 = Math.round(row * cellH);
    const x1 = Math.round((col + 1) * cellW);
    const y1 = Math.round((row + 1) * cellH);
    const icon = makeIcon(src, boundsForCell(src, x0, y0, x1, y1));
    icons.push(icon);
    savePng(path.join(outDir, names[index]), 128, 128, icon);
  }
}

const contactWidth = cols * 144;
const contactHeight = rows * 144;
const contact = Buffer.alloc(contactWidth * contactHeight * 4);
icons.forEach((icon, index) => {
  const col = index % cols;
  const row = Math.floor(index / cols);
  copyIconToSheet(icon, contact, contactWidth, col * 144 + 8, row * 144 + 8);
});
savePng(path.join(outDir, config.contactSheet), contactWidth, contactHeight, contact);
fs.copyFileSync(sourcePath, path.join(outDir, config.sourceSheet));
console.log(`Split ${icons.length} ${mode} icons from ${sourcePath}`);
