from pathlib import Path
from PIL import Image
import colorsys


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "sprites" / "mobs" / "plague-wolf.png"
TARGET = ROOT / "assets" / "sprites" / "mobs" / "wolf.png"
PREVIEW = ROOT / "assets" / "sprites" / "mobs" / "wolf-clean-preview.png"


def clamp(value, low=0, high=255):
    return max(low, min(high, int(round(value))))


def clean_pixel(r, g, b, a):
    if a == 0:
        return r, g, b, a

    rf, gf, bf = r / 255, g / 255, b / 255
    hue, sat, val = colorsys.rgb_to_hsv(rf, gf, bf)
    lum = 0.299 * r + 0.587 * g + 0.114 * b

    is_pustule = sat > 0.35 and 0.11 <= hue <= 0.28 and val > 0.24
    is_green_rot = sat > 0.28 and 0.22 < hue < 0.46 and val > 0.18
    is_purple_glow = sat > 0.28 and (hue > 0.72 or hue < 0.04) and b > g and r > g

    # Remove plague spots by folding them back into the wolf's dark fur ramp.
    if is_pustule or is_green_rot:
        lum = min(lum * 0.55, 76)
        return clamp(lum * 0.92), clamp(lum * 0.9), clamp(lum * 0.86), a

    # Keep the sprite's dark fantasy outline, but make it less diseased-purple.
    if is_purple_glow:
        lum *= 0.7
        return clamp(lum * 0.85 + 18), clamp(lum * 0.8 + 16), clamp(lum * 0.92 + 24), a

    # General fur pass: cool charcoal/brown-gray with retained pixel shading.
    return (
        clamp(lum * 0.86 + 10),
        clamp(lum * 0.84 + 9),
        clamp(lum * 0.82 + 8),
        a,
    )


def main():
    image = Image.open(SOURCE).convert("RGBA")
    out = Image.new("RGBA", image.size)
    out.putdata([clean_pixel(*px) for px in image.getdata()])

    # Add a few tiny natural eye highlights where the source eyes already sit.
    pixels = out.load()
    for x, y in [(47, 49), (72, 45)]:
        for dx, dy, color in [
            (0, 0, (221, 189, 96, 255)),
            (1, 0, (132, 74, 45, 230)),
        ]:
            if 0 <= x + dx < out.width and 0 <= y + dy < out.height:
                pixels[x + dx, y + dy] = color

    out.save(TARGET)

    preview = Image.new("RGBA", (image.width * 2 + 12, image.height), (0, 0, 0, 0))
    preview.alpha_composite(image, (0, 0))
    preview.alpha_composite(out, (image.width + 12, 0))
    preview.save(PREVIEW)


if __name__ == "__main__":
    main()
