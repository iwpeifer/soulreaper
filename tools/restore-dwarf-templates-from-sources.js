const fs = require("fs");
const path = require("path");
const { readPng, writePng, alphaBounds } = require("./defuzz-dwarf-templates");

const SOURCE_DIR = "tmp/imagegen/dwarf-equipment/proportion-remake";

const TARGETS = [
  ["dwarf-male", "cloth-full.png", "dwarf-male-cloth-full-alpha-large.png", { x: 29, y: 28, w: 69, h: 94 }],
  ["dwarf-male", "leather-full.png", "dwarf-male-leather-full-alpha-large.png", { x: 29, y: 28, w: 69, h: 94 }],
  ["dwarf-male", "chainmail-full.png", "dwarf-male-chainmail-full-alpha-large.png", { x: 29, y: 28, w: 69, h: 94 }],
  ["dwarf-male", "plate-full.png", "dwarf-male-plate-full-alpha-large.png", { x: 27, y: 27, w: 73, h: 95 }],
  ["dwarf-male", "wizard-robe-full.png", "dwarf-male-wizard-robe-full-alpha-large.png", { x: 28, y: 20, w: 71, h: 102 }],
  ["dwarf-male", "sylvan-full-first-pass.png", "dwarf-male-sylvan-full-first-pass-alpha-large.png", { x: 27, y: 18, w: 73, h: 104 }],
  ["dwarf-male", "skaven-dominatrix-full.png", "dwarf-male-skaven-dominatrix-full-alpha-large.png", { x: 28, y: 26, w: 71, h: 96 }],
  ["dwarf-male", "casual-clothes.png", "dwarf-male-casual-clothes-alpha-large.png", { x: 29, y: 24, w: 69, h: 98 }],
  ["dwarf-female", "cloth-full.png", "dwarf-female-cloth-full-alpha-large.png", { x: 33, y: 32, w: 62, h: 90 }],
  ["dwarf-female", "leather-full.png", "dwarf-female-leather-full-alpha-large.png", { x: 33, y: 32, w: 62, h: 90 }],
  ["dwarf-female", "chainmail-full.png", "dwarf-female-chainmail-full-alpha-large-v2.png", { x: 33, y: 32, w: 62, h: 90 }],
  ["dwarf-female", "plate-full.png", "dwarf-female-plate-full-alpha-large.png", { x: 31, y: 30, w: 66, h: 92 }],
  ["dwarf-female", "wizard-robe-full.png", "dwarf-female-wizard-robe-full-alpha-large.png", { x: 32, y: 24, w: 64, h: 98 }],
  ["dwarf-female", "sylvan-full-first-pass.png", "dwarf-female-sylvan-full-first-pass-alpha-large.png", { x: 31, y: 22, w: 66, h: 100 }],
  ["dwarf-female", "skaven-dominatrix-full.png", "dwarf-female-skaven-dominatrix-full-alpha-large.png", { x: 32, y: 30, w: 64, h: 92 }],
  ["dwarf-female", "casual-clothes.png", "dwarf-female-casual-clothes-alpha-large.png", { x: 33, y: 28, w: 62, h: 94 }]
];

function blankImage(width, height) {
  return { width, height, pixels: Buffer.alloc(width * height * 4) };
}

function getPixel(image, x, y) {
  const xx = Math.max(0, Math.min(image.width - 1, x));
  const yy = Math.max(0, Math.min(image.height - 1, y));
  const i = (yy * image.width + xx) * 4;
  return [image.pixels[i], image.pixels[i + 1], image.pixels[i + 2], image.pixels[i + 3]];
}

function sampleBilinear(image, x, y) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const tx = x - x0;
  const ty = y - y0;
  const c00 = getPixel(image, x0, y0);
  const c10 = getPixel(image, x0 + 1, y0);
  const c01 = getPixel(image, x0, y0 + 1);
  const c11 = getPixel(image, x0 + 1, y0 + 1);
  const out = [0, 0, 0, 0];
  for (let i = 0; i < 4; i += 1) {
    const top = c00[i] * (1 - tx) + c10[i] * tx;
    const bottom = c01[i] * (1 - tx) + c11[i] * tx;
    out[i] = Math.round(top * (1 - ty) + bottom * ty);
  }
  return out;
}

function sourceBounds(image) {
  const b = alphaBounds(image);
  if (!b) throw new Error("source has no alpha pixels");
  const padX = Math.round(b.width * 0.015);
  const padY = Math.round(b.height * 0.012);
  return {
    minX: Math.max(0, b.minX - padX),
    minY: Math.max(0, b.minY - padY),
    maxX: Math.min(image.width - 1, b.maxX + padX),
    maxY: Math.min(image.height - 1, b.maxY + padY)
  };
}

function renderTemplate(source, targetBox) {
  const out = blankImage(128, 128);
  const srcBox = sourceBounds(source);
  for (let y = 0; y < targetBox.h; y += 1) {
    for (let x = 0; x < targetBox.w; x += 1) {
      const sx = srcBox.minX + (x + 0.5) * (srcBox.maxX - srcBox.minX + 1) / targetBox.w - 0.5;
      const sy = srcBox.minY + (y + 0.5) * (srcBox.maxY - srcBox.minY + 1) / targetBox.h - 0.5;
      const [r, g, b, a] = sampleBilinear(source, sx, sy);
      if (a < 54) continue;
      const dx = targetBox.x + x;
      const dy = targetBox.y + y;
      const i = (dy * 128 + dx) * 4;
      out.pixels[i] = r;
      out.pixels[i + 1] = g;
      out.pixels[i + 2] = b;
      out.pixels[i + 3] = 255;
    }
  }
  return out;
}

function colorCount(image) {
  const colors = new Set();
  for (let i = 0; i < image.pixels.length; i += 4) {
    const a = image.pixels[i + 3];
    if (!a) continue;
    colors.add(`${image.pixels[i]},${image.pixels[i + 1]},${image.pixels[i + 2]},${a}`);
  }
  return colors.size;
}

for (const [gender, targetName, sourceName, box] of TARGETS) {
  const sourcePath = path.join(SOURCE_DIR, sourceName);
  const targetPath = path.join("assets/sprites/player-equipment/templates", gender, targetName);
  const source = readPng(sourcePath);
  const rendered = renderTemplate(source, box);
  writePng(targetPath, rendered);
  console.log(`${targetPath} <= ${sourcePath} bbox=${JSON.stringify(alphaBounds(rendered))} colors=${colorCount(rendered)}`);
}
