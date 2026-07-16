#!/usr/bin/env node
"use strict";

const fs = require("fs");
const vm = require("vm");

const ITERATIONS = Number(process.argv.find(arg => arg.startsWith("--runs="))?.split("=")[1]) || 250;
const FIGHTS_PER_AREA = Number(process.argv.find(arg => arg.startsWith("--fights="))?.split("=")[1]) || 24;
const SEED = Number(process.argv.find(arg => arg.startsWith("--seed="))?.split("=")[1]) || 1337;

const REALMS = ["Mortal", "Ethereal", "Celestial", "Infernal", "Sylvan", "Umbral"];
const ROUTE = [
  "The Ganderswood",
  "Rat Den",
  "Ganderswood Glade",
  "Ganderswood Fen",
  "Ratzkhan",
  "Diarrh Realm",
  "Grimswood Pass",
  "The Crowing Fields"
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
  if (text === "Shadow") return "Umbral";
  return REALMS.includes(text) ? text : "Mortal";
}

function avgDice(dice = "1D4") {
  const text = String(dice || "1D4").trim();
  const add = text.match(/^(.+?)\s*\+\s*(\d+(?:\.\d+)?)$/);
  if (add) return avgDice(add[1]) + Number(add[2]);
  const range = text.match(/^(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)$/);
  if (range) return (Number(range[1]) + Number(range[2])) / 2;
  const die = text.match(/^(\d+)D(\d+)$/i);
  if (!die) return 1;
  return Number(die[1]) * (Number(die[2]) + 1) / 2;
}

function attackBonus(atk) {
  const value = Math.max(0, Number(atk) || 0);
  return value > 0 ? value * 0.75 : 0;
}

function round1(value) {
  return Math.round(value * 10) / 10;
}

function nextXp(current, level) {
  return Math.ceil(current * (level >= 12 ? 1.15 : 1.65));
}

function statBlock(stats = {}) {
  return {
    HP: Number(stats.HP) || 0,
    ATK: Number(stats.ATK) || 0,
    DEF: Number(stats.DEF) || 0,
    SPD: Number(stats.SPD) || 0,
    AGL: Number(stats.AGL) || 0,
    INT: Number(stats.INT) || 0,
    FOCUS: Number(stats.FOCUS) || 0,
    BLOCK: Number(stats.BLOCK) || 0,
    RESIST: Number(stats.RESIST) || 0,
    REGEN: Number(stats.REGEN) || 0
  };
}

function buildCatalog(data) {
  const weapons = Object.values(data.SoulreaperItems.itemTemplates)
    .filter(item => item.weapon)
    .map(item => ({ ...item.weapon, itemName: item.name, goldValue: Number(item.goldValue ?? item.weapon.goldValue ?? 0) || 0 }));
  const spells = new Map(data.SoulreaperSpells.starterSpells.map(spell => [spell.name, spell]));
  const monsters = new Map([
    ...data.SoulreaperMonsters.monsterTemplates,
    ...data.SoulreaperMonsters.fenMonsterTemplates
  ].map(monster => [monster.name, monster]));
  return { weapons, spells, monsters };
}

function weaponByName(catalog, name) {
  return catalog.weapons.find(weapon => weapon.name === name || weapon.itemName === name)
    || catalog.weapons.find(weapon => weapon.name === "Wooden Knife")
    || catalog.weapons[0];
}

function spellNumber(spell, key, fallbackBase = 0, fallbackPer = 0, level = 1, statValue = 0) {
  const formula = spell?.formulas?.[key];
  if (!formula) return fallbackBase + fallbackPer * level;
  const base = Number(formula.base) || 0;
  const per = Number(formula.perLevel) || 0;
  const statScale = Number(formula.statScale) || 0;
  return base + per * level + statValue * statScale;
}

const BUILDS = [
  {
    name: "Mortal melee",
    weapon: "Iron Shortsword",
    starterSpell: "Rage",
    statPlan: ["ATK", "AGL", "DEF", "ATK", "FOCUS"]
  },
  {
    name: "Ethereal caster",
    weapon: "Wooden Staff",
    starterSpell: "Magic Missile",
    statPlan: ["INT", "FOCUS", "RESIST", "INT", "AGL"]
  },
  {
    name: "Infernal caster",
    weapon: "Wooden Staff",
    starterSpell: "Fireball",
    statPlan: ["INT", "FOCUS", "RESIST", "INT", "AGL"]
  },
  {
    name: "Celestial prayer",
    weapon: "Iron Mace",
    starterSpell: "Basic Prayer",
    statPlan: ["DEF", "ATK", "INT", "RESIST", "AGL"]
  },
  {
    name: "Umbral curse",
    weapon: "Iron Dagger",
    starterSpell: "Curse of Disdain",
    statPlan: ["INT", "ATK", "FOCUS", "RESIST", "AGL"]
  },
  {
    name: "Sylvan control",
    weapon: "Willow Branch",
    starterSpell: "Tangle Vine",
    statPlan: ["INT", "AGL", "RESIST", "FOCUS", "DEF"]
  }
];

function makePlayer(build, catalog) {
  const weapon = weaponByName(catalog, build.weapon);
  return {
    build: build.name,
    level: 1,
    xp: 0,
    nextXp: 30,
    maxHp: 15,
    hp: 15,
    gold: 0,
    stats: statBlock({ HP: 15, REGEN: 1 }),
    weapon,
    spell: catalog.spells.get(build.starterSpell),
    spellLevel: 1,
    statPlan: build.statPlan,
    deaths: 0,
    kills: 0
  };
}

function applyLevelUps(player) {
  while (player.xp >= player.nextXp) {
    player.xp -= player.nextXp;
    player.level += 1;
    player.maxHp += 5;
    player.stats.HP = player.maxHp;
    player.hp = player.maxHp;
    const stat = player.statPlan[(player.level - 2) % player.statPlan.length];
    player.stats[stat] = (player.stats[stat] || 0) + 1;
    if (player.level % 3 === 0) player.spellLevel += 1;
    player.nextXp = nextXp(player.nextXp, player.level);
  }
}

function monsterAtLevel(template, level) {
  const base = statBlock(template.stats);
  const stats = { ...base };
  stats.HP = base.HP * level;
  stats.ATK = Math.floor(base.ATK * level);
  stats.DEF = Math.floor((base.DEF * level) / 2);
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
    weapon: template.weapon || { name: "Rat Claw" },
    gold: template.gold
  };
}

function mitigated(amount, defender, dmgType = "Physical") {
  const mitigation = dmgType === "Physical" ? defender.stats.DEF : defender.stats.RESIST;
  return Math.max(dmgType === "Physical" ? 1 : 0, amount - mitigation);
}

function weaponDps(attacker, defender, weapon) {
  const delay = Math.max(0.25, ((Number(weapon.speed) || 100) - (attacker.stats.AGL || 0)) / 100);
  const raw = avgDice(weapon.dice || "1D4") + attackBonus(attacker.stats.ATK || 0);
  return mitigated(raw, defender, weapon.dmgType || "Physical") / delay;
}

function spellProfile(player, enemy) {
  const spell = player.spell;
  if (!spell || spell.passive || spell.aura) return { dps: 0, healPerSecond: 0, controlMultiplier: 1 };
  const level = player.spellLevel;
  const int = player.stats.INT || 0;
  const cooldown = Math.max(0.8, Number(spell.cooldown) || 1);
  if (spell.name === "Basic Prayer") {
    const heal = spellNumber(spell, "heal", 2.5, 0.5, level, int);
    return { dps: 0, healPerSecond: heal / cooldown, controlMultiplier: 1 };
  }
  if (spell.name === "Rage") {
    return { dps: 0, healPerSecond: 0, controlMultiplier: 1, rage: true };
  }
  if (spell.name === "Curse of Disdain") {
    const tick = Number(spell.tick) || 1;
    const duration = Number(spell.duration) || 8;
    const damage = spellNumber(spell, "dotDamage", 0.5, 0.5, level, int);
    return { dps: mitigated(damage, enemy, "Magical") * Math.ceil(duration / tick) / cooldown, healPerSecond: 0, controlMultiplier: 1 };
  }
  const formulaKey = spell.formulas?.damage ? "damage" : "dotDamage";
  const damage = spellNumber(spell, formulaKey, 2, 1, level, int);
  const root = spell.name === "Tangle Vine" ? Math.min(0.65, spellNumber(spell, "rootDuration", 1.5, 0.5, level, int) / Math.max(2, cooldown) * 0.18) : 0;
  return {
    dps: mitigated(damage, enemy, "Magical") / cooldown,
    healPerSecond: 0,
    controlMultiplier: 1 - root
  };
}

function enemyDps(enemy, player) {
  const weapon = enemy.weapon || { dice: "1D4", speed: 100, dmgType: "Physical" };
  const delay = Math.max(0.35, ((Number(weapon.speed) || 100) - (enemy.stats.AGL || 0)) / 100);
  const raw = avgDice(weapon.dice || "1D4") + attackBonus(enemy.stats.ATK || 0);
  return mitigated(raw, player, weapon.dmgType || "Physical") / delay;
}

function fight(player, enemy, rng) {
  const simPlayer = {
    ...player,
    stats: { ...player.stats },
    hp: player.hp
  };
  const spell = spellProfile(simPlayer, enemy);
  if (spell.rage) {
    simPlayer.stats.ATK += simPlayer.spellLevel * 0.5;
    simPlayer.stats.DEF += simPlayer.spellLevel;
    simPlayer.stats.AGL += simPlayer.spellLevel;
  }
  const playerDps = weaponDps(simPlayer, enemy, simPlayer.weapon) + spell.dps;
  const incomingDps = Math.max(0, enemyDps(enemy, simPlayer) * spell.controlMultiplier - spell.healPerSecond - (simPlayer.stats.REGEN || 0) / 5);
  const timeToKill = enemy.maxHp / Math.max(0.1, playerDps);
  const timeToDie = incomingDps <= 0 ? Infinity : simPlayer.hp / incomingDps;
  const variance = 0.85 + rng() * 0.3;
  const survived = timeToKill * variance < timeToDie;
  if (survived) {
    const damageTaken = incomingDps * timeToKill * variance;
    player.hp = Math.max(1, player.hp - damageTaken);
    player.xp += enemy.maxHp;
    player.kills += 1;
    applyLevelUps(player);
  } else {
    player.deaths += 1;
    player.hp = player.maxHp;
  }
  return {
    survived,
    timeToKill: timeToKill * variance,
    timeToDie,
    playerDps,
    incomingDps
  };
}

function weightedPick(entries, rng) {
  const total = entries.reduce((sum, entry) => sum + Number(entry.frequency || 0), 0);
  let roll = rng() * total;
  for (const entry of entries) {
    roll -= Number(entry.frequency || 0);
    if (roll <= 0) return entry;
  }
  return entries[0];
}

function runArea(player, areaName, data, catalog, rng) {
  const config = data.SoulreaperWorldData.devAreaConfigs[areaName];
  const table = data.SoulreaperWorldData.areaSpawnTables[areaName] || [];
  if (!config || !table.length) return null;
  const levels = config.levelRange || { min: player.level, max: player.level };
  const metrics = [];
  for (let i = 0; i < FIGHTS_PER_AREA; i += 1) {
    const picked = weightedPick(table, rng);
    const template = catalog.monsters.get(picked.name);
    if (!template) continue;
    const level = levels.min + Math.floor(rng() * (levels.max - levels.min + 1));
    metrics.push({ monster: picked.name, level, ...fight(player, monsterAtLevel(template, level), rng) });
  }
  const deaths = metrics.filter(row => !row.survived).length;
  const avgTtk = average(metrics.map(row => row.timeToKill));
  const avgIncoming = average(metrics.map(row => row.incomingDps));
  return { areaName, deaths, fights: metrics.length, avgTtk, avgIncoming, finalLevel: player.level };
}

function average(values) {
  const filtered = values.filter(Number.isFinite);
  return filtered.length ? filtered.reduce((a, b) => a + b, 0) / filtered.length : 0;
}

function percentile(values, p) {
  const filtered = values.filter(Number.isFinite).sort((a, b) => a - b);
  if (!filtered.length) return 0;
  return filtered[Math.min(filtered.length - 1, Math.floor(filtered.length * p))];
}

function runPlaythrough(build, data, catalog, seed) {
  const rng = mulberry32(seed);
  const player = makePlayer(build, catalog);
  const areaResults = [];
  for (const area of ROUTE) {
    const result = runArea(player, area, data, catalog, rng);
    if (result) areaResults.push(result);
  }
  return { build: build.name, player, areaResults };
}

function aggregate(results) {
  const byBuild = new Map();
  const byArea = new Map();
  const areaBuild = new Map();
  for (const result of results) {
    const buildRows = byBuild.get(result.build) || [];
    buildRows.push(result);
    byBuild.set(result.build, buildRows);
    for (const area of result.areaResults) {
      const areaRows = byArea.get(area.areaName) || [];
      areaRows.push(area);
      byArea.set(area.areaName, areaRows);
      const key = `${result.build} @ ${area.areaName}`;
      const rows = areaBuild.get(key) || [];
      rows.push(area);
      areaBuild.set(key, rows);
    }
  }
  return { byBuild, byArea, areaBuild };
}

function summarizeGroup(rows) {
  const fights = rows.reduce((sum, row) => sum + row.fights, 0);
  const deaths = rows.reduce((sum, row) => sum + row.deaths, 0);
  return {
    survival: fights ? 1 - deaths / fights : 1,
    avgTtk: average(rows.map(row => row.avgTtk)),
    p90Ttk: percentile(rows.map(row => row.avgTtk), 0.9),
    avgIncoming: average(rows.map(row => row.avgIncoming)),
    avgFinalLevel: average(rows.map(row => row.finalLevel))
  };
}

function findMonsterOutliers(data, catalog) {
  const rows = [];
  for (const [area, table] of Object.entries(data.SoulreaperWorldData.areaSpawnTables)) {
    const config = data.SoulreaperWorldData.devAreaConfigs[area];
    if (!config?.levelRange || !table.length) continue;
    const level = Math.round((config.levelRange.min + config.levelRange.max) / 2);
    for (const entry of table) {
      const template = catalog.monsters.get(entry.name);
      if (!template) continue;
      const monster = monsterAtLevel(template, level);
      const baseline = makePlayer(BUILDS[0], catalog);
      baseline.level = Math.max(1, level);
      baseline.maxHp = 15 + (baseline.level - 1) * 5;
      baseline.hp = baseline.maxHp;
      baseline.stats.HP = baseline.maxHp;
      baseline.stats.ATK += Math.floor(level / 2);
      baseline.stats.DEF += Math.floor(level / 3);
      baseline.stats.AGL += Math.floor(level / 4);
      const incoming = enemyDps(monster, baseline);
      const ttkPlayer = monster.maxHp / Math.max(0.1, weaponDps(baseline, monster, baseline.weapon));
      const ttdPlayer = incoming <= 0 ? Infinity : baseline.maxHp / incoming;
      rows.push({ area, monster: monster.name, level, hp: monster.maxHp, incoming, ttkPlayer, ttdPlayer });
    }
  }
  return rows
    .filter(row => row.ttdPlayer < 5 || row.ttkPlayer > 55 || row.incoming > 12)
    .sort((a, b) => (a.ttdPlayer - b.ttdPlayer) || (b.ttkPlayer - a.ttkPlayer));
}

function fmtPct(value) {
  return `${Math.round(value * 100)}%`;
}

function printReport(results, data, catalog) {
  const { byBuild, byArea, areaBuild } = aggregate(results);
  console.log(`Soulreaper balance simulation`);
  console.log(`runs=${ITERATIONS} fightsPerArea=${FIGHTS_PER_AREA} seed=${SEED}`);
  console.log("");
  console.log("Build survivability:");
  for (const [build, rows] of byBuild) {
    const deaths = rows.reduce((sum, row) => sum + row.player.deaths, 0);
    const kills = rows.reduce((sum, row) => sum + row.player.kills, 0);
    const finalLevel = average(rows.map(row => row.player.level));
    console.log(`- ${build}: deaths/run=${round1(deaths / rows.length)} kills/run=${round1(kills / rows.length)} finalLVL=${round1(finalLevel)}`);
  }
  console.log("");
  console.log("Area pressure:");
  for (const [area, rows] of byArea) {
    const s = summarizeGroup(rows);
    console.log(`- ${area}: survival=${fmtPct(s.survival)} avgTTK=${round1(s.avgTtk)}s p90TTK=${round1(s.p90Ttk)}s incomingDPS=${round1(s.avgIncoming)} avgLVL=${round1(s.avgFinalLevel)}`);
  }
  console.log("");
  console.log("Glaring build/area failures:");
  const failures = [...areaBuild.entries()]
    .map(([key, rows]) => ({ key, ...summarizeGroup(rows) }))
    .filter(row => row.survival < 0.55 || row.avgTtk > 45 || row.avgIncoming > 10)
    .sort((a, b) => a.survival - b.survival || b.avgTtk - a.avgTtk)
    .slice(0, 18);
  if (!failures.length) console.log("- None by current thresholds.");
  else for (const row of failures) {
    console.log(`- ${row.key}: survival=${fmtPct(row.survival)} avgTTK=${round1(row.avgTtk)}s incomingDPS=${round1(row.avgIncoming)} avgLVL=${round1(row.avgFinalLevel)}`);
  }
  console.log("");
  console.log("Monster outliers against same-level Mortal melee baseline:");
  const outliers = findMonsterOutliers(data, catalog).slice(0, 20);
  if (!outliers.length) console.log("- None by current thresholds.");
  else for (const row of outliers) {
    console.log(`- ${row.area} LVL${row.level} ${row.monster}: HP=${round1(row.hp)} playerTTK=${round1(row.ttkPlayer)}s playerTTD=${round1(row.ttdPlayer)}s incomingDPS=${round1(row.incoming)}`);
  }
  console.log("");
  console.log("Notes:");
  console.log("- This is a headless statistical approximation, not a browser bot. It uses real data tables but simplified movement, spell AI, and gear progression.");
  console.log("- Treat failures as triage targets for manual playtesting, not final balance verdicts.");
}

const data = loadData();
const catalog = buildCatalog(data);
const results = [];
for (let run = 0; run < ITERATIONS; run += 1) {
  for (const build of BUILDS) {
    results.push(runPlaythrough(build, data, catalog, SEED + run * 997 + build.name.length * 31));
  }
}
printReport(results, data, catalog);
