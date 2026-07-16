const fs = require("fs");
const path = require("path");
const { readPng, writePng } = require("./defuzz-dwarf-templates");

function newImage(width, height, color = [32, 32, 32, 255]) {
  const pixels = Buffer.alloc(width * height * 4);
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i] = color[0];
    pixels[i + 1] = color[1];
    pixels[i + 2] = color[2];
    pixels[i + 3] = color[3];
  }
  return { width, height, pixels };
}

function blendPixel(dst, di, src, si) {
  const sa = src[si + 3] / 255;
  if (sa <= 0) return;
  const da = dst[di + 3] / 255;
  const outA = sa + da * (1 - sa);
  dst[di] = Math.round((src[si] * sa + dst[di] * da * (1 - sa)) / outA);
  dst[di + 1] = Math.round((src[si + 1] * sa + dst[di + 1] * da * (1 - sa)) / outA);
  dst[di + 2] = Math.round((src[si + 2] * sa + dst[di + 2] * da * (1 - sa)) / outA);
  dst[di + 3] = Math.round(outA * 255);
}

function blit(dst, src, x0, y0, scale = 1) {
  for (let y = 0; y < src.height; y += 1) {
    for (let x = 0; x < src.width; x += 1) {
      const si = (y * src.width + x) * 4;
      if (!src.pixels[si + 3]) continue;
      for (let yy = 0; yy < scale; yy += 1) {
        for (let xx = 0; xx < scale; xx += 1) {
          const dx = x0 + x * scale + xx;
          const dy = y0 + y * scale + yy;
          if (dx < 0 || dy < 0 || dx >= dst.width || dy >= dst.height) continue;
          blendPixel(dst.pixels, (dy * dst.width + dx) * 4, src.pixels, si);
        }
      }
    }
  }
}

function composite(base, overlay) {
  const out = { width: base.width, height: base.height, pixels: Buffer.from(base.pixels) };
  blit(out, overlay, 0, 0, 1);
  return out;
}

function makeSheet(gender) {
  const base = readPng(`assets/sprites/player-bases/soulreaper-dwarf-${gender}-naked.png`);
  const dir = `assets/sprites/player-equipment/templates/dwarf-${gender}`;
  const preferred = [
    "cloth-full.png",
    "leather-full.png",
    "chainmail-full.png",
    "plate-full.png",
    "wizard-robe-full.png",
    "sylvan-full-first-pass.png",
    "skaven-dominatrix-full.png",
    "casual-clothes.png"
  ].filter(name => fs.existsSync(path.join(dir, name)));
  const scale = 4;
  const cellW = base.width * scale;
  const cellH = base.height * scale;
  const sheet = newImage(cellW * preferred.length, cellH, [18, 18, 18, 255]);
  for (let i = 0; i < preferred.length; i += 1) {
    const overlay = readPng(path.join(dir, preferred[i]));
    blit(sheet, composite(base, overlay), i * cellW, 0, scale);
  }
  const out = `tmp/dwarf-${gender}-template-sheet.png`;
  fs.mkdirSync("tmp", { recursive: true });
  writePng(out, sheet);
  console.log(out);
}

makeSheet("male");
makeSheet("female");
