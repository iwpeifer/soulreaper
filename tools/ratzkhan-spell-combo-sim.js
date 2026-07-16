#!/usr/bin/env node
"use strict";

const fs = require("fs");
const vm = require("vm");

const RUNS = Number(process.argv.find(arg => arg.startsWith("--runs="))?.split("=")[1]) || 180;
const FIGHTS = Number(process.argv.find(arg => arg.startsWith("--fights="))?.split("=")[1]) || 18;
const SEED = Number(process.argv.find(arg => arg.startsWith("--seed="))?.split("=")[1]) || 424242;
const SPELL_LEVEL = Number(process.argv.find(arg => arg.startsWith("--spell-level="))?.split("=")[1]) || 9;

const REALMS = ["Mortal", "Ethereal", "Celestial", "Infernal", "Sylvan", "Umbral"];
const STATS = ["HP", "ATK", "DEF", "SPD", "AGL", "INT", "FOCUS", "BLOCK", "REGEN", "RESIST"];
const CHAINMAIL_KIT = [
  "Chainmail Coif",
  "Iron Chainmail Vest",
  "Chainmail Pants",
  "Chainmail Gloves",
  "Chainmail Pauldrons",
  "Chainmail Boots",
  "Chainmail Bracer",
  "Chainmail Bracer",
  "Iron Shield"
];
const FIXED_RATZKHAN = [
  ["Ratkin Turdburglar", 6, 4],
  ["Ratkin Warlock", 7, 2],
  ["Shade", 7, 2],
  ["Narmon Ratfinkelstein", 8, 1],
  ["Ratfinkelstein's Ratstrocity", 8, 1],
  ["Princess Nurdine", 8, 1]
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
  const value = String(realm || "Mortal");
  return value === "Shadow" ? "Umbral" : (REALMS.includes(value) ? value : "Mortal");
}

function emptyStats() {
  return { HP: 0, ATK: 0, DEF: 0, SPD: 0, AGL: 0, INT: 0, FOCUS: 0, BLOCK: 0, REGEN: 0, RESIST: 0 };
}

function addStats(target, stats = {}, scale = 1) {
  for (const stat of STATS) target[stat] = (target[stat] || 0) + (Number(stats[stat]) || 0) * scale;
  return target;
}

function avgDice(dice = "1D4", rng = Math.random) {
  const text = String(dice || "1D4").trim();
  const add = text.match(/^(.+?)\s*\+\s*(\d+(?:\.\d+)?)$/);
  if (add) return avgDice(add[1], rng) + Number(add[2]);
  const die = text.match(/^(\d+)D(\d+)$/i);
  if (!die) return Number(text) || 1;
  let total = 0;
  for (let i = 0; i < Number(die[1]); i += 1) total += 1 + Math.floor(rng() * Number(die[2]));
  return total;
}

function attackDamageBonus(atk) {
  return Math.max(0, Number(atk) || 0) * 0.75;
}

function value(spell, key, lvl = SPELL_LEVEL, statValue = 0) {
  const formula = spell?.formulas?.[key];
  if (!formula) return 0;
  return (Number(formula.base) || 0) + (Number(formula.perLevel) || 0) * lvl + (Number(formula.statScale) || 0) * statValue;
}

function allSpells(data) {
  const spells = new Map();
  for (const spell of data.SoulreaperSpells.starterSpells || []) spells.set(spell.name, spell);
  for (const spell of Object.values(data.SoulreaperWorldData.devSpellConfigs || {})) spells.set(spell.name, spell);
  const excluded = new Set(["Arcane Protection", "Summon Portal", "Tame Beast"]);
  return [...spells.values()]
    .filter(spell => spell?.name && !excluded.has(spell.name))
    .filter(spell => spell.name !== "Poison" || spell.passive)
    .map(spell => ({ ...spell, realm: normalizeRealm(spell.realm), lvl: SPELL_LEVEL }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function itemByName(data, name) {
  return data.SoulreaperItems.itemTemplates[name] || null;
}

function weaponByName(data, name) {
  return data.SoulreaperItems.weaponTemplates[name]
    || data.SoulreaperItems.itemTemplates[name]?.weapon
    || data.SoulreaperItems.weaponTemplates["Rat Claw"];
}

function monsterByName(data, name) {
  return [...data.SoulreaperMonsters.monsterTemplates, ...data.SoulreaperMonsters.fenMonsterTemplates]
    .find(monster => monster.name === name);
}

function makePlayer(data, spells) {
  const stats = emptyStats();
  stats.HP = 55;
  stats.REGEN = 1;
  for (const name of CHAINMAIL_KIT) addStats(stats, itemByName(data, name)?.stats || {});
  return {
    name: spells.map(spell => spell.name).join(" + "),
    lvl: 9,
    maxHp: stats.HP,
    hp: stats.HP,
    stats,
    weapon: weaponByName(data, "Iron Shortsword"),
    spells,
    cooldowns: Object.fromEntries(spells.map(spell => [spell.name, 0])),
    mods: [],
    shields: []
  };
}

function makeMonster(data, name, lvl, rng) {
  const template = monsterByName(data, name);
  if (!template) return null;
  const base = { ...emptyStats(), ...(template.stats || {}) };
  const stats = emptyStats();
  stats.HP = Number(base.HP || 1) * lvl;
  stats.ATK = Math.floor(Number(base.ATK || 0) * lvl);
  stats.DEF = Math.floor((Number(base.DEF || 0) * lvl) / 2);
  stats.SPD = Number(base.SPD || 0);
  stats.AGL = Number(base.AGL || 0);
  stats.INT = Number(base.INT || 0);
  stats.FOCUS = Number(base.FOCUS || 0);
  stats.BLOCK = Number(base.BLOCK || 0);
  stats.REGEN = Number(base.REGEN || 0) * lvl;
  stats.RESIST = Number(base.RESIST || 0);
  const elite = Boolean(template.elite);
  const boss = Boolean(template.boss);
  if (elite) stats.HP *= 3;
  if (boss) stats.HP *= 6;
  return {
    name,
    lvl,
    realm: normalizeRealm(template.realm),
    maxHp: stats.HP,
    hp: stats.HP,
    stats,
    weapon: weaponByName(data, template.weapon?.name || "Rat Claw"),
    elite,
    boss,
    spells: (template.spells || []).map(ref => allSpells(data).find(spell => spell.name === ref.name)).filter(Boolean),
    attackTimer: rng() * 0.5,
    spellTimers: {}
  };
}

function mitigation(amount, defender, dmgType = "Physical", realm = "Mortal") {
  const statMitigation = dmgType === "Physical" ? defender.stats.DEF : defender.stats.RESIST;
  const realmMitigation = Number(defender.resistances?.[realm]) || 0;
  return Math.max(dmgType === "Physical" ? 1 : 0, amount - statMitigation - realmMitigation);
}

function effectiveStats(unit) {
  const stats = { ...unit.stats };
  for (const mod of unit.mods || []) addStats(stats, mod.addStats || {});
  if ((unit.mods || []).some(mod => mod.name === "Pestilent Aura")) stats.REGEN = 0;
  return stats;
}

function weaponDelay(unit, weapon) {
  const stats = effectiveStats(unit);
  let speed = Number(weapon?.speed) || 100;
  if (unit.spells?.some(spell => spell.name === "Archery Mastery") && (weapon.weaponTypes || []).includes("Bow")) speed -= SPELL_LEVEL * 3;
  if (unit.spells?.some(spell => spell.name === "Axe Mastery") && (weapon.weaponTypes || []).includes("Axe")) speed -= SPELL_LEVEL * 3;
  return Math.max(0.35, (speed - (stats.AGL || 0)) / 100);
}

function dealDamage(target, amount, realm, dmgType) {
  let remaining = amount;
  for (const shield of target.shields || []) {
    if (shield.type !== dmgType || shield.amount <= 0) continue;
    const absorbed = Math.min(shield.amount, remaining);
    shield.amount -= absorbed;
    remaining -= absorbed;
    if (remaining <= 0) break;
  }
  if (remaining <= 0) return 0;
  const dealt = mitigation(remaining, target, dmgType, realm);
  target.hp -= dealt;
  return dealt;
}

function addMod(unit, mod) {
  const existing = unit.mods.find(item => item.name === mod.name);
  if (existing) Object.assign(existing, mod, { remaining: mod.remaining });
  else unit.mods.push({ ...mod });
}

function castPlayerSpell(player, enemy, spell) {
  const stats = effectiveStats(player);
  const lvl = SPELL_LEVEL;
  switch (spell.name) {
    case "Rage":
      addMod(player, { name: "Rage", remaining: 8, addStats: { ATK: lvl / 2, DEF: lvl, AGL: lvl } });
      return true;
    case "Basic Prayer":
      player.hp = Math.min(player.maxHp, player.hp + value(spell, "heal", lvl, stats.INT));
      return true;
    case "Heavenly Light":
      player.hp = Math.min(player.maxHp, player.hp + value(spell, "heal", lvl, stats.INT));
      return true;
    case "Divine Shield":
      player.shields.push({ amount: value(spell, "shield", lvl, stats.INT), type: "Physical", remaining: 8 });
      return true;
    case "Arcane Shield":
      player.shields.push({ amount: value(spell, "shield", lvl, stats.INT), type: "Magical", remaining: 8 });
      return true;
    case "Godspeed":
      addMod(player, { name: "Godspeed", remaining: 60, addStats: { SPD: value(spell, "speedBonus", lvl, stats.INT) } });
      return true;
    case "Spirit of Avia":
      addMod(player, { name: "Spirit of Avia", remaining: 8, addStats: { SPD: value(spell, "speedBonus", lvl, stats.INT), AGL: value(spell, "agilityBonus", lvl, stats.INT) } });
      return true;
    case "Clarity":
      addMod(player, { name: "Clarity", remaining: 15, addStats: { INT: value(spell, "intelligenceBonus", lvl, stats.INT) } });
      return true;
    case "Aura of Protection":
      addMod(player, { name: "Aura of Protection", remaining: 999, addStats: { DEF: value(spell, "defenseBonus", lvl, stats.INT) } });
      return true;
    case "Song of White Stag":
      addMod(player, { name: "Song of White Stag", remaining: 999, addStats: { REGEN: value(spell, "regenBonus", lvl, stats.INT) } });
      return true;
    case "War Drums":
      addMod(player, { name: "War Drums", remaining: 999, addStats: { AGL: value(spell, "agilityBonus", lvl, stats.INT) } });
      return true;
    case "Pestilent Aura":
      addMod(player, { name: "Pestilent Aura", remaining: 999, addStats: {} });
      return true;
    case "Thorn Shield":
      addMod(player, { name: "Thorn Shield", remaining: 8, thorn: value(spell, "damage", lvl, stats.INT) });
      return true;
    case "Faerie Dust":
      addMod(enemy, { name: "Faerie Dust", remaining: 6, addStats: { SPD: value(spell, "speedPenalty", lvl, stats.INT), AGL: value(spell, "agilityPenalty", lvl, stats.INT) } });
      return true;
    case "Faerie Fire":
      addMod(enemy, { name: "Faerie Fire", remaining: 6, addStats: { DEF: value(spell, "defensePenalty", lvl, stats.INT) } });
      return true;
    case "Tangle Vine":
    case "Pacify":
    case "Ice Bolt":
      addMod(enemy, { name: spell.name, remaining: spell.name === "Pacify" ? 4 : 3, disabled: true });
      if (spell.name === "Ice Bolt") dealDamage(enemy, value(spell, "damage", lvl, stats.INT), spell.realm, "Magical");
      return true;
    case "Magic Missile":
    case "Chain Lightning":
    case "Lifesteal":
    case "Fireball":
      {
        const damage = value(spell, "damage", lvl, stats.INT);
        const dealt = dealDamage(enemy, damage, spell.realm, "Magical");
        if (spell.name === "Lifesteal") player.hp = Math.min(player.maxHp, player.hp + dealt * 0.5);
        if (spell.name === "Fireball") addMod(enemy, { name: "Fireball", remaining: 4, dot: damage * 0.25, tick: 1, tickTimer: 1, realm: spell.realm });
        return true;
      }
    case "Curse of Disdain":
      addMod(enemy, { name: "Curse of Disdain", remaining: 8, dot: value(spell, "dotDamage", lvl, stats.INT), tick: 1, tickTimer: 1, realm: spell.realm });
      return true;
    case "Fireblast":
    case "Ring of Fire":
      addMod(enemy, { name: spell.name, remaining: Number(spell.duration || 3), dot: value(spell, "damage", lvl, stats.INT), tick: Number(spell.tick || 1), tickTimer: Number(spell.tick || 1), realm: spell.realm });
      return true;
    case "Ice Storm":
      addMod(enemy, { name: "Ice Storm", remaining: Number(spell.duration || 4), dot: value(spell, "damage", lvl, stats.INT), tick: Number(spell.tick || 1), tickTimer: Number(spell.tick || 1), realm: spell.realm, disabled: true });
      return true;
    case "Raise Skeleton":
    case "Summon Water Elemental":
    case "Summon Fire Elemental":
    case "Summon Shade":
    case "Summon Treant":
      addMod(player, { name: spell.name, remaining: 30, summonDps: 1.2 + lvl * 0.45 });
      return true;
    case "Dual Wield":
    case "Archery Mastery":
    case "Axe Mastery":
    case "Mace Mastery":
    case "Poison":
    case "Banish":
    case "Invisibility":
      return true;
    default:
      return false;
  }
}

function tickMods(unit, dt, opponent) {
  for (const shield of unit.shields || []) shield.remaining -= dt;
  unit.shields = (unit.shields || []).filter(shield => shield.remaining > 0 && shield.amount > 0);
  for (const mod of unit.mods || []) {
    mod.remaining -= dt;
    if (mod.dot && opponent === unit) {
      mod.tickTimer -= dt;
      while (mod.tickTimer <= 0 && mod.remaining > 0) {
        dealDamage(unit, mod.dot, mod.realm || "Mortal", "Magical");
        mod.tickTimer += mod.tick || 1;
      }
    }
  }
  unit.mods = (unit.mods || []).filter(mod => mod.remaining > 0);
}

function fight(data, spellPair, encounter, seed) {
  const rng = mulberry32(seed);
  const player = makePlayer(data, spellPair);
  const enemy = makeMonster(data, encounter.name, encounter.lvl, rng);
  if (!enemy) return null;
  let playerAttack = rng() * 0.4;
  let enemyAttack = rng() * 0.6;
  for (const spell of player.spells) {
    if (spell.passive || spell.aura || spell.name === "Rage" || spell.name.includes("Shield") || spell.name === "Godspeed" || spell.name === "Spirit of Avia" || spell.name === "Clarity") {
      castPlayerSpell(player, enemy, spell);
      player.cooldowns[spell.name] = Number(spell.cooldown || 0);
    }
  }
  let time = 0;
  while (time < 120 && player.hp > 0 && enemy.hp > 0) {
    const dt = 0.1;
    time += dt;
    tickMods(player, dt, player);
    tickMods(enemy, dt, enemy);
    const pStats = effectiveStats(player);
    const eStats = effectiveStats(enemy);
    player.hp = Math.min(player.maxHp, player.hp + Math.max(0, pStats.REGEN || 0) * dt / 5);
    enemy.hp = Math.min(enemy.maxHp, enemy.hp + Math.max(0, eStats.REGEN || 0) * dt / 5);
    for (const spell of player.spells) {
      player.cooldowns[spell.name] = Math.max(0, (player.cooldowns[spell.name] || 0) - dt);
      const shouldHeal = ["Basic Prayer", "Heavenly Light"].includes(spell.name) && player.hp <= player.maxHp * 0.72;
      const shouldShield = spell.name.includes("Shield") && !player.shields.some(shield => shield.type === (spell.name === "Divine Shield" ? "Physical" : "Magical"));
      const shouldCombatCast = !spell.passive && !spell.aura && !["Rage", "Godspeed", "Spirit of Avia", "Clarity", "Basic Prayer", "Heavenly Light", "Divine Shield", "Arcane Shield"].includes(spell.name);
      if ((player.cooldowns[spell.name] || 0) <= 0 && (shouldHeal || shouldShield || shouldCombatCast)) {
        castPlayerSpell(player, enemy, spell);
        player.cooldowns[spell.name] = Math.max(0.5, Number(spell.cooldown || 0));
      }
    }
    const summonDps = player.mods.reduce((sum, mod) => sum + (Number(mod.summonDps) || 0), 0);
    if (summonDps > 0) dealDamage(enemy, summonDps * dt, "Mortal", "Physical");
    const pestilent = player.spells.some(spell => spell.name === "Pestilent Aura");
    if (pestilent && enemy.realm !== "Umbral") dealDamage(enemy, SPELL_LEVEL / 5 * dt, "Umbral", "Magical");
    playerAttack -= dt;
    if (playerAttack <= 0) {
      const pStatsNow = effectiveStats(player);
      const raw = avgDice(player.weapon?.dice, rng) + attackDamageBonus(pStatsNow.ATK);
      dealDamage(enemy, raw, player.weapon?.realm || "Mortal", player.weapon?.dmgType || "Physical");
      if (player.spells.some(spell => spell.name === "Poison") && rng() < 0.5) {
        addMod(enemy, { name: "Poison", remaining: 4, dot: SPELL_LEVEL / 4, tick: 1, tickTimer: 1, realm: "Mortal" });
      }
      playerAttack += weaponDelay(player, player.weapon);
    }
    const enemyDisabled = enemy.mods.some(mod => mod.disabled);
    enemyAttack -= dt;
    if (!enemyDisabled && enemyAttack <= 0) {
      const eStatsNow = effectiveStats(enemy);
      const raw = avgDice(enemy.weapon?.dice, rng) + attackDamageBonus(eStatsNow.ATK);
      const dealt = dealDamage(player, raw, enemy.weapon?.realm || enemy.realm || "Mortal", enemy.weapon?.dmgType || "Physical");
      const thorn = player.mods.reduce((sum, mod) => sum + (Number(mod.thorn) || 0), 0);
      if (thorn > 0 && dealt > 0) dealDamage(enemy, thorn, "Sylvan", "Magical");
      enemyAttack += weaponDelay(enemy, enemy.weapon);
    }
    for (const spell of enemy.spells || []) {
      enemy.spellTimers[spell.name] = Math.max(0, (enemy.spellTimers[spell.name] || 0) - dt);
      if (enemy.spellTimers[spell.name] > 0 || enemyDisabled) continue;
      if (spell.name === "Basic Prayer" && enemy.hp < enemy.maxHp * 0.7) enemy.hp = Math.min(enemy.maxHp, enemy.hp + value(spell, "heal", enemy.lvl, 0));
      else if (spell.formulas?.damage) dealDamage(player, value(spell, "damage", enemy.lvl, 0), spell.realm, "Magical");
      else if (spell.formulas?.dotDamage) addMod(player, { name: spell.name, remaining: 8, dot: value(spell, "dotDamage", enemy.lvl, 0), tick: 1, tickTimer: 1, realm: spell.realm });
      enemy.spellTimers[spell.name] = Math.max(2, Number(spell.cooldown || 6));
    }
  }
  return {
    survived: player.hp > 0 && enemy.hp <= 0,
    timeout: player.hp > 0 && enemy.hp > 0,
    time,
    enemy: enemy.name,
    boss: enemy.boss,
    elite: enemy.elite,
    hpLeft: Math.max(0, player.hp),
    enemyHpLeft: Math.max(0, enemy.hp)
  };
}

function weightedPick(entries, rng) {
  const total = entries.reduce((sum, entry) => sum + Number(entry.weight || entry.frequency || 0), 0);
  let roll = rng() * total;
  for (const entry of entries) {
    roll -= Number(entry.weight || entry.frequency || 0);
    if (roll <= 0) return entry;
  }
  return entries[0];
}

function encounters(data) {
  const config = data.SoulreaperWorldData.devAreaConfigs.Ratzkhan;
  const area = (data.SoulreaperWorldData.areaSpawnTables.Ratzkhan || []).map(entry => ({
    name: entry.name,
    min: config.levelRange.min,
    max: config.levelRange.max,
    weight: entry.frequency
  }));
  const fixed = [];
  for (const [name, lvl, count] of FIXED_RATZKHAN) {
    for (let i = 0; i < count; i += 1) fixed.push({ name, min: lvl, max: lvl, weight: 5 });
  }
  return [...area, ...fixed];
}

function runCombo(data, spellPair, comboIndex) {
  const rng = mulberry32(SEED + comboIndex * 10007);
  const table = encounters(data);
  let survived = 0;
  let deaths = 0;
  let timeouts = 0;
  let bossWins = 0;
  let bossFights = 0;
  let hpLeft = 0;
  let time = 0;
  const deathBy = new Map();
  for (let run = 0; run < RUNS; run += 1) {
    for (let fightIndex = 0; fightIndex < FIGHTS; fightIndex += 1) {
      const picked = weightedPick(table, rng);
      const lvl = picked.min + Math.floor(rng() * (picked.max - picked.min + 1));
      const result = fight(data, spellPair, { name: picked.name, lvl }, SEED + comboIndex * 99991 + run * 313 + fightIndex);
      if (!result) continue;
      if (result.boss) bossFights += 1;
      if (result.survived) {
        survived += 1;
        if (result.boss) bossWins += 1;
      } else if (result.timeout) {
        timeouts += 1;
      } else {
        deaths += 1;
        deathBy.set(result.enemy, (deathBy.get(result.enemy) || 0) + 1);
      }
      hpLeft += result.hpLeft;
      time += result.time;
    }
  }
  const total = survived + deaths + timeouts;
  return {
    spells: spellPair.map(spell => spell.name).join(" + "),
    survival: survived / total,
    deaths,
    timeouts,
    total,
    avgHpLeft: hpLeft / total,
    avgTime: time / total,
    bossSurvival: bossFights ? bossWins / bossFights : 0,
    topKiller: [...deathBy.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || ""
  };
}

function pct(value) {
  return `${Math.round(value * 1000) / 10}%`;
}

function main() {
  const data = loadData();
  const spells = allSpells(data);
  const pairs = [];
  for (let i = 0; i < spells.length; i += 1) {
    for (let j = i + 1; j < spells.length; j += 1) pairs.push([spells[i], spells[j]]);
  }
  const results = pairs.map((pair, index) => runCombo(data, pair, index))
    .sort((a, b) => b.survival - a.survival || b.avgHpLeft - a.avgHpLeft || a.avgTime - b.avgTime);
  console.log(JSON.stringify({
    runs: RUNS,
    fightsPerRun: FIGHTS,
    spellLevel: SPELL_LEVEL,
    combos: pairs.length,
    testedSpells: spells.map(spell => spell.name),
    top: results.slice(0, 15),
    bottom: results.slice(-15).reverse(),
    median: results[Math.floor(results.length / 2)]
  }, null, 2));
}

main();
