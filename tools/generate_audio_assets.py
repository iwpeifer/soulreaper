#!/usr/bin/env python3
import json
import math
import random
import struct
import wave
from pathlib import Path

SAMPLE_RATE = 44100
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "audio"


def slug(name):
    return name.lower().replace("'", "").replace("/", " ").replace("-", " ").replace(" ", "-")


def clamp(value):
    return max(-1.0, min(1.0, value))


def ease_out(t):
    return 1 - (1 - t) * (1 - t)


def env(t, duration, attack=0.01, hold=0.0, release=0.12):
    if t < 0 or duration <= 0:
        return 0.0
    if t < attack:
        return t / max(attack, 0.0001)
    if t < attack + hold:
        return 1.0
    remaining = max(0.0, duration - t)
    if remaining < release:
        return max(0.0, remaining / max(release, 0.0001))
    return 1.0


def silence(duration):
    return [(0.0, 0.0) for _ in range(max(1, int(duration * SAMPLE_RATE)))]


def as_stereo(mono, pan=0.0):
    left = math.cos((pan + 1) * math.pi / 4)
    right = math.sin((pan + 1) * math.pi / 4)
    return [(sample * left, sample * right) for sample in mono]


def tone(freq, duration, volume=0.25, wave_type="sine", attack=0.01, hold=0.0, release=0.15, sweep=0.0, vibrato=0.0, pan=0.0):
    count = max(1, int(duration * SAMPLE_RATE))
    mono = []
    phase = 0.0
    for i in range(count):
        t = i / SAMPLE_RATE
        f = max(18.0, freq + sweep * t + math.sin(t * math.tau * 5.1) * vibrato)
        phase += math.tau * f / SAMPLE_RATE
        pos = (phase / math.tau) % 1
        if wave_type == "square":
            sample = 1.0 if math.sin(phase) >= 0 else -1.0
        elif wave_type == "triangle":
            sample = 2 * abs(2 * pos - 1) - 1
        elif wave_type == "saw":
            sample = 2 * pos - 1
        elif wave_type == "organ":
            sample = math.sin(phase) + 0.45 * math.sin(phase * 2) + 0.18 * math.sin(phase * 3)
        else:
            sample = math.sin(phase)
        mono.append(sample * volume * env(t, duration, attack, hold, release))
    return as_stereo(mono, pan)


def noise(duration, volume=0.18, attack=0.004, hold=0.0, release=0.12, seed=1, lowpass=0.0, highpass=0.0, pan=0.0):
    rng = random.Random(seed)
    count = max(1, int(duration * SAMPLE_RATE))
    mono = []
    low = 0.0
    last_low = 0.0
    for i in range(count):
        t = i / SAMPLE_RATE
        sample = rng.uniform(-1, 1)
        if lowpass:
            low = low * lowpass + sample * (1 - lowpass)
            sample = low
        if highpass:
            last_low = last_low * highpass + sample * (1 - highpass)
            sample = sample - last_low
        mono.append(sample * volume * env(t, duration, attack, hold, release))
    return as_stereo(mono, pan)


def delay(part, seconds):
    return silence(seconds) + part


def mix(*parts):
    length = max((len(part) for part in parts), default=0)
    data = [(0.0, 0.0) for _ in range(length)]
    for part in parts:
        for i, (left, right) in enumerate(part):
            dl, dr = data[i]
            data[i] = (dl + left, dr + right)
    return data


def gain(part, amount):
    return [(left * amount, right * amount) for left, right in part]


def normalize(part, peak=0.92):
    max_peak = max((max(abs(left), abs(right)) for left, right in part), default=0.0)
    if max_peak <= 0:
        return part
    scale = min(1.0, peak / max_peak)
    return gain(part, scale)


def fade(part, attack=0.0, release=0.0):
    length = len(part)
    duration = length / SAMPLE_RATE
    out = []
    for i, (left, right) in enumerate(part):
        t = i / SAMPLE_RATE
        amp = 1.0
        if attack and t < attack:
            amp *= t / attack
        if release and duration - t < release:
            amp *= max(0.0, (duration - t) / release)
        out.append((left * amp, right * amp))
    return out


def reverb(part, taps=((0.09, 0.22), (0.17, 0.13), (0.29, 0.08)), width=0.35):
    echoes = [part]
    for delay_time, amount in taps:
        delayed = []
        for left, right in delay(gain(part, amount), delay_time):
            delayed.append((right * width + left * (1 - width), left * width + right * (1 - width)))
        echoes.append(delayed)
    return mix(*echoes)


def sequence(events):
    return mix(*(delay(part, offset) for offset, part in events))


def chime(freqs, spacing=0.08, duration=0.55, volume=0.14, wave_type="sine", pan_spread=0.3):
    events = []
    for i, freq in enumerate(freqs):
        pan = (-pan_spread if i % 2 == 0 else pan_spread) * (0.5 + i / max(1, len(freqs)))
        events.append((i * spacing, tone(freq, duration, volume, wave_type, attack=0.006, release=duration * 0.82, pan=pan)))
        events.append((i * spacing + 0.012, tone(freq * 2.01, duration * 0.55, volume * 0.035, "sine", attack=0.002, release=duration * 0.45, pan=-pan)))
    return sequence(events)


def impact(freq=120, duration=0.26, body=0.28, grit=0.22, seed=1):
    return mix(
        tone(freq, duration, body, "triangle", attack=0.001, release=duration * 0.88, sweep=-freq * 1.4),
        tone(freq * 2.7, duration * 0.3, body * 0.28, "sine", attack=0.001, release=duration * 0.22, sweep=-freq),
        noise(duration * 0.9, grit, attack=0.001, release=duration * 0.68, seed=seed, lowpass=0.58)
    )


def whoosh(duration=0.35, seed=1, volume=0.2, lowpass=0.8, sweep=900, pan=0.0):
    return mix(
        noise(duration, volume, attack=0.02, release=0.12, seed=seed, lowpass=lowpass, highpass=0.96, pan=pan),
        tone(150, duration, volume * 0.22, "saw", attack=0.025, release=0.1, sweep=sweep, pan=pan)
    )


def bubbles(duration=0.75, seed=1, base=170, volume=0.13):
    rng = random.Random(seed)
    events = []
    for i in range(12):
        offset = rng.random() * duration * 0.75
        freq = base + rng.random() * 330
        dur = 0.08 + rng.random() * 0.18
        events.append((offset, tone(freq, dur, volume * (0.6 + rng.random() * 0.8), "sine", attack=0.004, release=dur * 0.7, sweep=-freq * 0.45, pan=rng.uniform(-0.5, 0.5))))
    return sequence(events)


def coin_jingle():
    rng = random.Random(12)
    events = []
    for i in range(22):
        offset = rng.random() * 0.55
        freq = rng.choice([880, 1040, 1240, 1480, 1760, 2110]) * rng.uniform(0.94, 1.06)
        dur = rng.uniform(0.035, 0.11)
        events.append((offset, tone(freq, dur, rng.uniform(0.045, 0.12), "triangle", attack=0.001, release=dur * 0.9, pan=rng.uniform(-0.75, 0.75))))
    return reverb(sequence(events), taps=((0.055, 0.18), (0.12, 0.1)), width=0.55)


def page_turn():
    return mix(
        noise(0.45, 0.12, attack=0.015, release=0.13, seed=22, lowpass=0.88, highpass=0.995, pan=-0.2),
        delay(noise(0.24, 0.16, attack=0.002, release=0.08, seed=23, lowpass=0.76, highpass=0.985, pan=0.3), 0.16),
        delay(tone(260, 0.18, 0.025, "sine", attack=0.01, release=0.12, sweep=180, pan=0.1), 0.08)
    )


def gong():
    body = mix(
        tone(82, 2.45, 0.42, "sine", attack=0.002, release=2.2, vibrato=1.5),
        tone(123, 2.2, 0.25, "sine", attack=0.002, release=2.0, vibrato=2.1, pan=-0.12),
        tone(246, 1.7, 0.13, "sine", attack=0.002, release=1.5, vibrato=3.0, pan=0.18),
        noise(0.18, 0.18, attack=0.001, release=0.11, seed=30, lowpass=0.72)
    )
    sparkle = delay(chime([523, 659, 784, 1046], 0.07, 0.7, 0.075), 0.32)
    return reverb(mix(body, sparkle), taps=((0.16, 0.23), (0.34, 0.15), (0.62, 0.09)), width=0.5)


def fanfare(success=True):
    if success:
        base = chime([523, 659, 784, 1046, 1318], 0.075, 0.58, 0.12, "triangle", 0.45)
        bell = delay(chime([1568, 2093], 0.065, 0.45, 0.07), 0.22)
    else:
        base = chime([392, 523, 659], 0.09, 0.42, 0.1, "triangle", 0.3)
        bell = delay(tone(880, 0.3, 0.045, "sine", release=0.22), 0.18)
    return reverb(mix(base, bell), taps=((0.11, 0.18), (0.23, 0.1)), width=0.45)


def lightning():
    return mix(
        noise(0.08, 0.62, attack=0.001, release=0.05, seed=71, highpass=0.7),
        delay(tone(1260, 0.16, 0.26, "square", attack=0.001, release=0.09, sweep=-1300), 0.015),
        delay(noise(0.36, 0.28, attack=0.002, release=0.24, seed=72, lowpass=0.45), 0.07)
    )


def fire(duration=0.65, burst=False):
    rumble = tone(88, duration, 0.16 if burst else 0.08, "saw", attack=0.004, release=duration * 0.7, sweep=-45)
    crackle = noise(duration, 0.24 if burst else 0.16, attack=0.003, release=duration * 0.45, seed=82 if burst else 81, lowpass=0.62, highpass=0.96)
    flame = whoosh(duration * 0.85, 83 if burst else 84, 0.18 if burst else 0.14, 0.73, 420)
    return mix(rumble, crackle, flame)


def icy_storm():
    rng = random.Random(91)
    shards = []
    for i in range(16):
        offset = rng.uniform(0.0, 1.0)
        freq = rng.uniform(900, 2100)
        shards.append((offset, tone(freq, rng.uniform(0.06, 0.16), 0.07, "triangle", attack=0.001, release=0.08, sweep=-rng.uniform(200, 600), pan=rng.uniform(-0.8, 0.8))))
        shards.append((offset + rng.uniform(0.02, 0.08), impact(rng.uniform(120, 260), 0.12, 0.07, 0.08, int(freq))))
    wind = noise(1.45, 0.2, attack=0.08, release=0.35, seed=93, lowpass=0.86, highpass=0.992)
    return reverb(mix(wind, sequence(shards)), taps=((0.08, 0.13), (0.19, 0.08)), width=0.45)


def vine_sound():
    rng = random.Random(101)
    events = [(0, noise(0.62, 0.12, attack=0.03, release=0.22, seed=102, lowpass=0.9, highpass=0.985))]
    for i in range(10):
        offset = i * 0.045 + rng.random() * 0.025
        events.append((offset, whoosh(0.13, 105 + i, 0.09, 0.74, rng.uniform(260, 620), rng.uniform(-0.7, 0.7))))
        if i % 3 == 0:
            events.append((offset + 0.035, impact(100 + i * 11, 0.1, 0.08, 0.08, 130 + i)))
    return mix(*[delay(part, offset) for offset, part in events])


def fairy_dust():
    rng = random.Random(111)
    events = []
    for i in range(22):
        offset = rng.random() * 0.72
        freq = rng.choice([1046, 1174, 1318, 1568, 1760, 2093]) * rng.uniform(0.96, 1.05)
        events.append((offset, tone(freq, 0.16, rng.uniform(0.035, 0.08), "sine", attack=0.003, release=0.13, pan=rng.uniform(-0.9, 0.9))))
    flutter = noise(0.72, 0.06, attack=0.02, release=0.18, seed=112, lowpass=0.82, highpass=0.995)
    return reverb(mix(sequence(events), flutter), taps=((0.08, 0.14), (0.18, 0.08)), width=0.6)


def sounds():
    return {
        "handle money": coin_jingle(),
        "item handle": reverb(mix(whoosh(0.26, 2, 0.12, 0.82, 720), delay(chime([740, 990], 0.04, 0.18, 0.08), 0.1)), taps=((0.08, 0.12),), width=0.35),
        "turn page": page_turn(),
        "level up gong": gong(),
        "game over": reverb(sequence([
            (0.0, tone(220, 0.55, 0.21, "organ", release=0.45, sweep=-70)),
            (0.28, tone(147, 0.85, 0.27, "sine", release=0.75, sweep=-55)),
            (0.72, tone(73, 1.25, 0.34, "triangle", release=1.1)),
            (0.5, noise(0.55, 0.09, seed=120, lowpass=0.8))
        ]), taps=((0.22, 0.18), (0.48, 0.11)), width=0.4),
        "autocast on": reverb(chime([988, 1318, 1760, 2349], 0.045, 0.28, 0.09, "sine", 0.55), taps=((0.07, 0.18), (0.16, 0.1)), width=0.6),
        "receive physical damage": impact(86, 0.28, 0.32, 0.36, 130),
        "receive magic damage": reverb(mix(impact(145, 0.3, 0.16, 0.16, 131), tone(760, 0.42, 0.16, "sine", attack=0.002, release=0.32, sweep=-620)), taps=((0.09, 0.12),), width=0.35),
        "bite": mix(impact(70, 0.18, 0.2, 0.28, 140), delay(noise(0.16, 0.2, seed=141, lowpass=0.38, highpass=0.93), 0.045)),
        "claw": sequence([(0, whoosh(0.105, 151, 0.12, 0.7, 900, -0.4)), (0.055, whoosh(0.105, 152, 0.13, 0.7, 1000, 0.2)), (0.11, whoosh(0.11, 153, 0.12, 0.7, 850, 0.55))]),
        "stab": mix(whoosh(0.11, 161, 0.12, 0.75, 1100), delay(impact(310, 0.11, 0.13, 0.09, 162), 0.045), delay(tone(1550, 0.05, 0.06, "triangle", release=0.035), 0.06)),
        "slash": mix(whoosh(0.34, 171, 0.2, 0.78, 1250), delay(tone(620, 0.1, 0.08, "triangle", release=0.08, sweep=-340), 0.13), delay(impact(120, 0.12, 0.08, 0.07, 172), 0.2)),
        "whack": mix(whoosh(0.16, 181, 0.1, 0.75, 420), delay(impact(72, 0.24, 0.38, 0.18, 182), 0.08)),
        "wand": reverb(mix(tone(470, 0.36, 0.12, "sine", attack=0.012, release=0.22, sweep=980, vibrato=16), delay(tone(1440, 0.22, 0.08, "sine", release=0.18), 0.09), noise(0.24, 0.035, seed=190, lowpass=0.92, highpass=0.99)), taps=((0.09, 0.14), (0.21, 0.08)), width=0.6),
        "shoot arrow": mix(whoosh(0.34, 201, 0.18, 0.84, 1550), delay(tone(1180, 0.08, 0.075, "triangle", release=0.05, sweep=-700), 0.015)),
        "receive quest": fanfare(False),
        "complete quest": fanfare(True),
        "generic Celestial offensive spell": reverb(mix(tone(880, 0.5, 0.18, "sine", sweep=520, vibrato=8), delay(chime([1318, 1760], 0.05, 0.28, 0.08), 0.16), delay(impact(260, 0.12, 0.08, 0.05, 210), 0.32)), taps=((0.12, 0.19), (0.27, 0.1)), width=0.52),
        "heal spell": reverb(mix(chime([659, 784, 1046, 1318], 0.055, 0.46, 0.105), delay(noise(0.42, 0.035, seed=220, lowpass=0.94, highpass=0.995), 0.05)), taps=((0.1, 0.16), (0.22, 0.09)), width=0.56),
        "generic Celestial buff": reverb(mix(chime([392, 523, 659, 880], 0.09, 0.72, 0.12, "organ"), delay(tone(1568, 0.7, 0.06, "sine", release=0.58), 0.22)), taps=((0.16, 0.2), (0.34, 0.12)), width=0.5),
        "lightning": lightning(),
        "generic Ethereal offensive spell": reverb(mix(tone(110, 0.8, 0.2, "sine", attack=0.04, release=0.55, sweep=-22), tone(620, 0.42, 0.15, "sine", attack=0.01, release=0.32, sweep=820), noise(0.5, 0.06, seed=230, lowpass=0.9)), taps=((0.14, 0.2), (0.33, 0.12)), width=0.65),
        "generic Ethereal buff": reverb(mix(chime([370, 554, 740, 988], 0.11, 0.76, 0.09), tone(185, 0.9, 0.09, "sine", attack=0.06, release=0.75)), taps=((0.18, 0.22), (0.42, 0.13)), width=0.65),
        "ice storm": icy_storm(),
        "invisible": reverb(mix(tone(980, 0.62, 0.13, "sine", attack=0.02, release=0.42, sweep=-920), tone(245, 0.58, 0.11, "sine", attack=0.02, release=0.44, sweep=-160), noise(0.48, 0.045, seed=240, lowpass=0.9)), taps=((0.12, 0.16), (0.3, 0.1)), width=0.65),
        "banish": reverb(mix(tone(130, 0.82, 0.22, "saw", attack=0.02, release=0.58, sweep=-80), noise(0.6, 0.11, seed=250, lowpass=0.84), delay(tone(740, 0.35, 0.08, "sine", release=0.25, sweep=-540), 0.1)), taps=((0.18, 0.22), (0.39, 0.13)), width=0.68),
        "pacify": reverb(mix(chime([330, 440, 554], 0.12, 0.52, 0.075), tone(155, 0.78, 0.07, "sine", attack=0.08, release=0.58), delay(tone(659, 0.38, 0.035, "sine", release=0.28), 0.32)), taps=((0.16, 0.18), (0.35, 0.09)), width=0.6),
        "summon pet": reverb(mix(noise(0.36, 0.22, seed=260, lowpass=0.72), tone(138, 0.5, 0.2, "triangle", attack=0.006, release=0.38, sweep=120), delay(chime([330, 440, 660], 0.07, 0.35, 0.075), 0.18)), taps=((0.1, 0.16), (0.25, 0.09)), width=0.48),
        "generic Shadow offensive spell": reverb(mix(tone(82, 0.55, 0.27, "saw", attack=0.006, release=0.42, sweep=-38), delay(noise(0.28, 0.18, seed=270, lowpass=0.7), 0.06), delay(tone(520, 0.2, 0.12, "square", release=0.13, sweep=-260), 0.16)), taps=((0.13, 0.2), (0.31, 0.12)), width=0.55),
        "generic Shadow buff": reverb(mix(tone(147, 0.92, 0.22, "organ", attack=0.04, release=0.72, vibrato=5), delay(chime([220, 293, 392], 0.11, 0.5, 0.06), 0.08)), taps=((0.2, 0.22), (0.44, 0.13)), width=0.6),
        "curse": reverb(mix(tone(98, 0.95, 0.26, "saw", attack=0.01, release=0.74, sweep=-48), noise(0.75, 0.12, seed=280, lowpass=0.88), delay(tone(311, 0.45, 0.1, "sine", attack=0.03, release=0.32, sweep=-170), 0.18)), taps=((0.18, 0.24), (0.43, 0.14)), width=0.64),
        "poison": mix(bubbles(0.82, 290, 120, 0.12), tone(260, 0.72, 0.1, "triangle", attack=0.02, release=0.5, sweep=-190), noise(0.62, 0.06, seed=291, lowpass=0.94)),
        "generic Infernal offensive spell": reverb(mix(fire(0.58, True), tone(73, 0.5, 0.22, "saw", attack=0.002, release=0.36, sweep=40)), taps=((0.09, 0.15), (0.21, 0.08)), width=0.4),
        "generic Infernal buff": reverb(mix(tone(110, 0.82, 0.25, "organ", attack=0.025, release=0.62, sweep=35), delay(fire(0.46, False), 0.04), delay(chime([220, 330, 440], 0.1, 0.45, 0.05), 0.18)), taps=((0.17, 0.2), (0.39, 0.12)), width=0.5),
        "fireball": reverb(mix(whoosh(0.74, 300, 0.28, 0.7, 680), fire(0.58, False), delay(tone(170, 0.24, 0.14, "saw", release=0.18, sweep=-40), 0.38)), taps=((0.08, 0.12),), width=0.35),
        "fireblast": reverb(mix(delay(impact(64, 0.42, 0.42, 0.42, 310), 0.05), fire(0.92, True), noise(0.82, 0.16, seed=311, lowpass=0.78)), taps=((0.11, 0.2), (0.27, 0.1)), width=0.45),
        "generic Sylvan offensive spell": reverb(mix(tone(294, 0.48, 0.14, "triangle", sweep=260), noise(0.38, 0.09, seed=320, lowpass=0.9), delay(chime([440, 587], 0.06, 0.24, 0.055), 0.18)), taps=((0.12, 0.15), (0.27, 0.08)), width=0.55),
        "generic Sylvan buff": reverb(mix(chime([392, 523, 659, 784], 0.1, 0.68, 0.095), tone(196, 0.82, 0.075, "sine", attack=0.06, release=0.62)), taps=((0.16, 0.18), (0.34, 0.1)), width=0.58),
        "tangle vines": vine_sound(),
        "fairy dust": fairy_dust(),
    }


def write_wav(name, data):
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / f"{slug(name)}.wav"
    data = normalize(fade(data, 0.002, 0.015))
    with wave.open(str(path), "wb") as wav:
        wav.setnchannels(2)
        wav.setsampwidth(2)
        wav.setframerate(SAMPLE_RATE)
        frames = b"".join(
            struct.pack("<hh", int(clamp(left) * 32767), int(clamp(right) * 32767))
            for left, right in data
        )
        wav.writeframes(frames)
    return path


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for stale in OUT.glob("*.wav"):
        stale.unlink()
    generated = sounds()
    manifest = []
    for name, data in generated.items():
        path = write_wav(name, data)
        manifest.append({
            "id": slug(name),
            "name": name,
            "file": f"./assets/audio/{path.name}",
            "sampleRate": SAMPLE_RATE,
            "channels": 2
        })
    (OUT / "sounds.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"Wrote {len(manifest)} higher-quality sound effects to {OUT}")


if __name__ == "__main__":
    main()
