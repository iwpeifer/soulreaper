#!/usr/bin/env node
"use strict";

const fs = require("fs");
const vm = require("vm");

const RUNS = Number(process.argv.find(arg => arg.startsWith("--runs="))?.split("=")[1]) || 180;
const SEED = Number(process.argv.find(arg => arg.startsWith("--seed="))?.split("=")[1]) || 20260702;
const MAX_LEVEL = Number(process.argv.find(arg => arg.startsWith("--max-level="))?.split("=")[1]) || 20;
const OVERHEAD_SECONDS = Number(process.argv.find(arg => arg.startsWith("--overhead="))?.split("=")[1]) || 6;
const DEATH_SECONDS = Number(process.argv.find(arg => arg.startsWith("--death="))?.split("=")[1]) || 30;

const REALMS = ["Mortal", "Ethereal", "Celestial", "Infernal", "Sylvan", "Umbral"];
const STATS = ["HP", "ATK", "DEF", "SPD", "AGL", "INT", "FOCUS", "BLOCK", "RESIST", "REGEN"];
const ROUTE_FALLBACK = [
  "The Ganderswood",
  "Rat Den",
  "Rat Warren",
  "Ganderswood Glade",
  "Whisperspring",
  "Ratzkhan",
  "Ganderswood Fen",
  "Fenhold",
  "Diarrh Realm",
  "Grimswood Pass",
  "The Crowing Fields",
  "Gobba",
  "Evermist Glade"
];

const BUILDS = [
  { name: "Mortal melee", weapon: "Iron Shortsword", spells: ["Rage", "Basic Prayer"], passive: "Dual Wield", statPlan: ["ATK", "AGL", "DEF", "ATK", "FOCUS"] },
  { name: "Ethereal control", weapon: "Wooden Staff", spells: ["Magic Missile", "Ice Storm"], passive: "Etherwind Aura", statPlan: ["INT", "FOCUS", "RESIST", "INT", "AGL"] },
  { name: "Infernal damage", weapon: "Wooden Staff", spells: ["Fireball", "Ring of Fire"], passive: "Burning Skin", statPlan: ["INT", "FOCUS", "RESIST", "INT", "AGL"] },
  { name: "Celestial sustain", weapon: "Iron Mace", spells: ["Heavenly Light", "Divine Shield"], passive: "Aura of Protection", statPlan: ["DEF", "ATK", "INT", "RESIST", "AGL"] },
  { name: "Umbral attrition", weapon: "Iron Dagger", spells: ["Curse of Disdain", "Lifesteal"], passive: "Pestilent Aura", statPlan: ["INT", "ATK", "FOCUS", "RESIST", "AGL"] },
  { name: "Sylvan control", weapon: "Willow Branch", spells: ["Tangle Vine", "Faerie Fire"], passive: "Song of White Stag", statPlan: ["INT", "AGL", "RESIST", "FOCUS", "DEF"] }
];

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function loadData() {
  const context = { window: {}, console, structuredClone };
  vm.createContext(context);
  for (const file of ["data/spells.js", "data/items.js", "data/monsters.js", "data/world.js"]) {
    vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
  }
  return context.window;
}

function normalizeRealm(realm = "Mortal") {
  const text = String(realm || "Mortal");
  return text === "Shadow" ? "Umbral" : (REALMS.includes(text) ? text : "Mortal");
}

function statBlock(stats = {}) {
  const out = {};
  for (const stat of STATS) out[stat] = Number(stats[stat]) || 0;
  return out;
}

function addStats(target, stats = {}) {
  for (const stat of STATS) target[stat] = (target[stat] || 0) + (Number(stats[stat]) || 0);
}

function avgDice(dice = "1D4", rng = Math.random) {
  const text = String(dice || "1D4").trim();
  const add = text.match(/^(.+?)\s*\+\s*(\d+(?:\.\d+)?)$/);
  if (add) return avgDice(add[1], rng) + Number(add[2]);
  const range = text.match(/^(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)$/);
  if (range) return Number(range[1]) + rng() * (Number(range[2]) - Number(range[1]));
  const die = text.match(/^(\d+)D(\d+)$/i);
  if (!die) return Number(text) || 1;
  let total = 0;
  for (let i = 0; i < Number(die[1]); i += 1) total += 1 + Math.floor(rng() * Number(die[2]));
  return total;
}

function attackBonus(atk) {
  return Math.max(0, Number(atk) || 0) * 0.75;
}

function xpRequirementForLevel(level) {
  let req = 30;
  for (let lvl = 1; lvl < level; lvl += 1) {
    const nextLevel = lvl + 1;
    const multiplier = nextLevel >= 12 ? 1.15 : nextLevel >= 10 ? 1.5 : 2;
    req = Math.ceil(req * multiplier);
  }
  return req;
}

function buildCatalog(data) {
  const spells = new Map();
  for (const spell of data.SoulreaperSpells.starterSpells || []) spells.set(spell.name, spell);
  for (const spell of Object.values(data.SoulreaperWorldData.devSpellConfigs || {})) spells.set(spell.name, spell);
  const monsters = new Map([
    ...(data.SoulreaperMonsters.monsterTemplates || []),
    ...(data.SoulreaperMonsters.fenMonsterTemplates || [])
  ].map(monster => [monster.name, monster]));
  return {
    spells,
    monsters,
    itemTemplates: data.SoulreaperItems.itemTemplates || {},
    weaponTemplates: data.SoulreaperItems.weaponTemplates || {}
  };
}

function weaponByName(catalog, name) {
  return catalog.weaponTemplates[name]
    || catalog.itemTemplates[name]?.weapon
    || catalog.weaponTemplates["Rat Claw"]
    || { name: "Fallback", dice: "1D4", speed: 100, dmgType: "Physical", realm: "Mortal" };
}

function spellValue(spell, key, level, statValue = 0, fallbackBase = 0, fallbackPer = 0) {
  const formula = spell?.formulas?.[key];
  const raw = formula
    ? (Number(formula.base) || 0) + (Number(formula.perLevel) || 0) * level + (Number(formula.statScale) || 0) * statValue
    : fallbackBase + fallbackPer * level;
  if (formula?.round === "ceil") return Math.ceil(raw);
  if (formula?.round === "floor") return Math.floor(raw);
  return raw;
}

function makePlayer(build, catalog, level) {
  const stats = statBlock({ HP: 15 + level * 5, ATK: 1, DEF: 0, SPD: 2, AGL: 1, INT: 1, FOCUS: 2, BLOCK: 2, RESIST: 1, REGEN: 1 });
  for (let lvl = 2; lvl <= level; lvl += 1) {
    const stat = build.statPlan[(lvl - 2) % build.statPlan.length];
    stats[stat] = (stats[stat] || 0) + 1;
  }
  const kit = level >= 6
    ? ["Chainmail Coif", "Iron Chainmail Vest", "Chainmail Pants", "Chainmail Gloves", "Chainmail Pauldrons", "Chainmail Boots", "Chainmail Bracer", "Chainmail Bracer", "Iron Shield"]
    : level >= 3
      ? ["Leather Hood", "Leather Breastplate", "Leather Pants", "Leather Gloves", "Leather Boots", "Leather Bracer"]
      : ["Linen Shirt", "Linen Pants"];
  for (const itemName of kit) addStats(stats, catalog.itemTemplates[itemName]?.stats || {});
  const spells = build.spells.map(name => catalog.spells.get(name)).filter(Boolean);
  const passive = catalog.spells.get(build.passive);
  return {
    build: build.name,
    level,
    maxHp: stats.HP,
    hp: stats.HP,
    stats,
    weapon: weaponByName(catalog, build.weapon),
    spells,
    passive,
    spellLevel: Math.max(1, Math.min(level, Math.floor((level + 1) / 2))),
    deaths: 0,
    kills: 0
  };
}

function monsterAtLevel(template, level, catalog) {
  const base = statBlock(template.stats || {});
  const stats = statBlock();
  stats.HP = Math.max(1, base.HP * level);
  stats.ATK = Math.floor(base.ATK * level);
  stats.DEF = Math.floor((base.DEF * level) / 2);
  stats.SPD = base.SPD;
  stats.AGL = base.AGL;
  stats.INT = base.INT;
  stats.FOCUS = base.FOCUS;
  stats.BLOCK = base.BLOCK;
  stats.RESIST = base.RESIST;
  stats.REGEN = base.REGEN * level;
  if (template.elite) stats.HP *= 3;
  if (template.boss) stats.HP *= 6;
  return {
    name: template.name,
    level,
    realm: normalizeRealm(template.realm),
    stats,
    maxHp: stats.HP,
    hp: stats.HP,
    elite: Boolean(template.elite),
    boss: Boolean(template.boss),
    weapon: weaponByName(catalog, template.weapon?.name || "Rat Claw")
  };
}

function mitigated(amount, defender, dmgType = "Physical") {
  const mitigation = dmgType === "Physical" ? defender.stats.DEF : defender.stats.RESIST;
  return Math.max(dmgType === "Physical" ? 1 : 0, amount - mitigation);
}

function weaponDps(attacker, defender, weapon) {
  const delay = Math.max(0.35, ((Number(weapon.speed) || 100) - (attacker.stats.AGL || 0)) / 100);
  const raw = avgDice(weapon.dice || "1D4") + attackBonus(attacker.stats.ATK || 0);
  return mitigated(raw, defender, weapon.dmgType || "Physical") / delay;
}

function passiveAdjustments(player) {
  const passive = player.passive;
  if (!passive) return;
  const lvl = player.spellLevel;
  const int = player.stats.INT || 0;
  switch (passive.name) {
    case "Burning Skin":
      player.thorns = spellValue(passive, "damage", lvl, int, 0, 0.5);
      break;
    case "Pestilent Aura":
      player.auraDps = lvl / 5;
      player.stats.REGEN = 0;
      break;
    case "War Drums":
      player.stats.AGL += spellValue(passive, "agilityBonus", lvl, int, 0, 2.5);
      break;
    case "Aura of Protection":
      player.stats.DEF += spellValue(passive, "defenseBonus", lvl, int, 0, 1);
      break;
    case "Song of White Stag":
      player.stats.REGEN += spellValue(passive, "regenBonus", lvl, int, 0, 0.5);
      break;
    case "Etherwind Aura":
      player.stats.INT += spellValue(passive, "intelligenceBonus", lvl, int, 0, 0.5);
      player.stats.RESIST += spellValue(passive, "resistBonus", lvl, int, 0, 0.5);
      break;
    case "Dual Wield":
      player.offhandDps = weaponDps(player, { stats: statBlock() }, { dice: "1D4", speed: 80, dmgType: "Physical" }) * (0.1 + lvl * 0.02);
      break;
    default:
      break;
  }
}

function spellProfile(player, enemy) {
  const lvl = player.spellLevel;
  const int = player.stats.INT || 0;
  let dps = 0;
  let heal = 0;
  let control = 1;
  let defenseBoost = 0;
  for (const spell of player.spells) {
    const cooldown = Math.max(0.8, Number(spell.cooldown) || 1);
    if (spell.name === "Basic Prayer" || spell.name === "Heavenly Light" || spell.name === "Bone Ritual") {
      heal += spellValue(spell, "heal", lvl, int, spell.name === "Heavenly Light" ? 5 : 0, spell.name === "Heavenly Light" ? 2 : 1.5) / cooldown;
    } else if (spell.name === "Rage") {
      defenseBoost += lvl;
      dps += attackBonus(lvl / 2) / Math.max(0.8, cooldown / 2);
    } else if (spell.name === "Divine Shield") {
      defenseBoost += spellValue(spell, "shield", lvl, int, 0, 3) / 8;
    } else if (spell.name === "Arcane Shield") {
      player.stats.RESIST += spellValue(spell, "shield", lvl, int, 0, 3) / 8;
    } else if (spell.name === "Tangle Vine" || spell.name === "Pacify") {
      control *= spell.name === "Pacify" ? 0.72 : 0.78;
    } else if (spell.name === "Ice Bolt") {
      control *= 0.82;
      dps += mitigated(spellValue(spell, "damage", lvl, int), enemy, "Magical") / cooldown;
    } else if (spell.name === "Ice Storm") {
      control *= 0.68;
      dps += mitigated(spellValue(spell, "damage", lvl, int), enemy, "Magical") / Math.max(1, Number(spell.tick) || 1);
    } else if (spell.name === "Lifesteal") {
      const damage = mitigated(spellValue(spell, "damage", lvl, int), enemy, "Magical") / cooldown;
      dps += damage;
      heal += damage * 0.5;
    } else if (spell.name === "Fireball") {
      const damage = mitigated(spellValue(spell, "damage", lvl, int), enemy, "Magical");
      dps += damage / cooldown + (damage * 0.25 * 4) / cooldown;
    } else if (spell.name === "Curse of Disdain" || spell.name === "Virulent Plague") {
      dps += mitigated(spellValue(spell, "dotDamage", lvl, int), enemy, "Magical") * Math.ceil(Number(spell.duration || 8) / Number(spell.tick || 1)) / cooldown;
    } else if (spell.formulas?.damage) {
      dps += mitigated(spellValue(spell, "damage", lvl, int), enemy, "Magical") / cooldown;
    } else if (spell.name === "Faerie Fire") {
      enemy.stats.DEF += spellValue(spell, "defensePenalty", lvl, int, 0, -0.5);
    } else if (spell.name === "Faerie Circle") {
      player.stats.RESIST += spellValue(spell, "resistBonus", lvl, int, 0, 1);
    } else if (spell.name === "Dark Circle") {
      dps += attackBonus(spellValue(spell, "attackBonus", lvl, int, 0, 0.5));
    } else if (spell.name === "Grace from Above") {
      heal += lvl / 2;
    }
  }
  player.stats.DEF += defenseBoost;
  return { dps, heal, control };
}

function enemyDps(enemy, player) {
  const delay = Math.max(0.35, ((Number(enemy.weapon?.speed) || 100) - (enemy.stats.AGL || 0)) / 100);
  const raw = avgDice(enemy.weapon?.dice || "1D4") + attackBonus(enemy.stats.ATK || 0);
  return mitigated(raw, player, enemy.weapon?.dmgType || "Physical") / delay;
}

function fight(playerBase, enemyBase, rng) {
  const player = { ...playerBase, stats: { ...playerBase.stats } };
  const enemy = { ...enemyBase, stats: { ...enemyBase.stats } };
  passiveAdjustments(player);
  const spells = spellProfile(player, enemy);
  const playerDps = Math.max(0.15, weaponDps(player, enemy, player.weapon) + (player.offhandDps || 0) + (player.auraDps || 0) + spells.dps);
  const incomingDps = Math.max(0, enemyDps(enemy, player) * spells.control - spells.heal - (player.stats.REGEN || 0) / 5);
  const timeToKill = enemy.maxHp / playerDps;
  const timeToDie = incomingDps <= 0 ? Infinity : player.hp / incomingDps;
  const variance = 0.85 + rng() * 0.3;
  const survived = timeToKill * variance < timeToDie;
  return {
    survived,
    seconds: Math.max(1, timeToKill * variance),
    xp: survived ? killXpFor(enemy, player.level) : 0
  };
}

function killXpFor(enemy, playerLevel) {
  const base = Math.max(0, Math.floor(enemy.stats.HP || 0));
  return playerLevel - enemy.level >= 5 ? Math.floor(base * 0.5) : base;
}

function weightedPick(entries, rng) {
  const total = entries.reduce((sum, entry) => sum + Number(entry.frequency || entry.weight || 0), 0);
  let roll = rng() * total;
  for (const entry of entries) {
    roll -= Number(entry.frequency || entry.weight || 0);
    if (roll <= 0) return entry;
  }
  return entries[0];
}

function areaCandidates(data, level) {
  const configs = data.SoulreaperWorldData.devAreaConfigs || {};
  const tables = data.SoulreaperWorldData.areaSpawnTables || {};
  const rows = Object.entries(configs)
    .filter(([name, cfg]) => cfg.levelRange && tables[name]?.length)
    .map(([name, cfg]) => ({ name, ...cfg.levelRange }));
  const inRange = rows.filter(row => level >= row.min && level <= row.max + 1);
  if (inRange.length) return inRange;
  const below = rows.filter(row => row.max < level).sort((a, b) => b.max - a.max);
  if (below.length) return [below[0]];
  const above = rows.filter(row => row.min > level).sort((a, b) => a.min - b.min);
  return above.length ? [above[0]] : rows.slice(0, 1);
}

function expectedAreaLevel(area, playerLevel) {
  if (playerLevel < area.min) return area.min;
  if (playerLevel > area.max) return area.max;
  return playerLevel;
}

function chooseArea(data, catalog, player, rng) {
  const candidates = areaCandidates(data, player.level);
  let best = null;
  for (const area of candidates) {
    const table = data.SoulreaperWorldData.areaSpawnTables[area.name] || [];
    const samples = [];
    for (let i = 0; i < 16; i += 1) {
      const entry = weightedPick(table, rng);
      const template = catalog.monsters.get(entry?.name);
      if (!template) continue;
      const lvlMin = Number(entry.minLvl ?? entry.minLevel ?? area.min);
      const lvlMax = Number(entry.maxLvl ?? entry.maxLevel ?? area.max);
      const min = Number.isFinite(lvlMin) ? lvlMin : area.min;
      const max = Number.isFinite(lvlMax) ? lvlMax : area.max;
      const monsterLevel = Math.max(min, Math.min(max, expectedAreaLevel(area, player.level)));
      const result = fight(player, monsterAtLevel(template, monsterLevel, catalog), rng);
      samples.push(result);
    }
    const survival = samples.filter(sample => sample.survived).length / Math.max(1, samples.length);
    const xpPerSecond = samples.reduce((sum, sample) => sum + sample.xp, 0) / Math.max(1, samples.reduce((sum, sample) => sum + sample.seconds + OVERHEAD_SECONDS + (sample.survived ? 0 : DEATH_SECONDS), 0));
    const score = survival < 0.55 ? xpPerSecond * survival * 0.25 : xpPerSecond;
    if (!best || score > best.score) best = { ...area, score, survival };
  }
  return best || candidates[0];
}

function simulateLevel(data, catalog, build, level, rng) {
  const xpNeeded = xpRequirementForLevel(level);
  const player = makePlayer(build, catalog, level);
  const area = chooseArea(data, catalog, player, rng);
  const table = data.SoulreaperWorldData.areaSpawnTables[area.name] || [];
  let xp = 0;
  let seconds = 0;
  let kills = 0;
  let deaths = 0;
  let guard = 0;
  while (xp < xpNeeded && guard < 5000) {
    guard += 1;
    const entry = weightedPick(table, rng);
    const template = catalog.monsters.get(entry?.name);
    if (!template) continue;
    const lvlMin = Number(entry.minLvl ?? entry.minLevel ?? area.min);
    const lvlMax = Number(entry.maxLvl ?? entry.maxLevel ?? area.max);
    const min = Number.isFinite(lvlMin) ? lvlMin : area.min;
    const max = Number.isFinite(lvlMax) ? lvlMax : area.max;
    const monsterLevel = Math.max(min, Math.min(max, expectedAreaLevel(area, level) + Math.floor(rng() * 2)));
    const result = fight(player, monsterAtLevel(template, monsterLevel, catalog), rng);
    seconds += result.seconds + OVERHEAD_SECONDS;
    if (result.survived) {
      xp += result.xp;
      kills += 1;
    } else {
      seconds += DEATH_SECONDS;
      deaths += 1;
    }
  }
  return { level, nextLevel: level + 1, xpNeeded, seconds, kills, deaths, area: area.name };
}

function percentile(values, p) {
  const sorted = values.slice().sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))] || 0;
}

function formatMinutes(seconds) {
  return Math.round(seconds / 60);
}

function main() {
  const data = loadData();
  const catalog = buildCatalog(data);
  const byLevel = new Map();
  for (let run = 0; run < RUNS; run += 1) {
    for (const build of BUILDS) {
      const rng = mulberry32(SEED + run * 1009 + build.name.length * 9173);
      for (let level = 1; level < MAX_LEVEL; level += 1) {
        const row = simulateLevel(data, catalog, build, level, rng);
        const rows = byLevel.get(level) || [];
        rows.push(row);
        byLevel.set(level, rows);
      }
    }
  }
  const summary = [];
  for (let level = 1; level < MAX_LEVEL; level += 1) {
    const rows = byLevel.get(level) || [];
    const seconds = rows.map(row => row.seconds);
    const areaCounts = new Map();
    for (const row of rows) areaCounts.set(row.area, (areaCounts.get(row.area) || 0) + 1);
    const topArea = [...areaCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || "";
    summary.push({
      level,
      to: level + 1,
      xp: xpRequirementForLevel(level),
      avgMinutes: formatMinutes(seconds.reduce((a, b) => a + b, 0) / Math.max(1, seconds.length)),
      p25Minutes: formatMinutes(percentile(seconds, 0.25)),
      p75Minutes: formatMinutes(percentile(seconds, 0.75)),
      avgKills: Math.round(rows.reduce((sum, row) => sum + row.kills, 0) / Math.max(1, rows.length)),
      avgDeaths: Math.round(rows.reduce((sum, row) => sum + row.deaths, 0) * 10 / Math.max(1, rows.length)) / 10,
      mainArea: topArea
    });
  }
  console.log(JSON.stringify({
    runs: RUNS,
    builds: BUILDS.map(build => build.name),
    maxLevel: MAX_LEVEL,
    assumptions: {
      overheadSecondsPerFight: OVERHEAD_SECONDS,
      deathPenaltySeconds: DEATH_SECONDS,
      xpRule: "mob XP equals scaled mob HP, halved if player is 5+ levels above mob",
      questXp: "not included"
    },
    summary
  }, null, 2));
}

main();
