#!/usr/bin/env node
"use strict";

const fs = require("fs");
const vm = require("vm");

const RUNS = Number(process.argv.find(arg => arg.startsWith("--runs="))?.split("=")[1]) || 80;
const FIGHTS = Number(process.argv.find(arg => arg.startsWith("--fights="))?.split("=")[1]) || 14;
const SEED = Number(process.argv.find(arg => arg.startsWith("--seed="))?.split("=")[1]) || 777331;
const SPELL_LEVEL = Number(process.argv.find(arg => arg.startsWith("--spell-level="))?.split("=")[1]) || 7;
const PLAYER_LEVEL = 7;

const STATS = ["HP", "ATK", "DEF", "SPD", "AGL", "INT", "FOCUS", "BLOCK", "REGEN", "RESIST"];
const REALMS = ["Mortal", "Ethereal", "Celestial", "Infernal", "Sylvan", "Umbral"];
const TANK_KIT = [
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
const CASTER_KIT = [
  "Spidersilk Cowl",
  "Spidersilk Shirt",
  "Spidersilk Gloves",
  "Spidersilk Pants",
  "Spidersilk Slippers",
  "Spidersilk Shoulderpads"
];
const TANK_COMBOS = [
  ["Divine Shield", "Aura of Protection"],
  ["Divine Shield", "Heavenly Light"],
  ["Divine Shield", "Basic Prayer"],
  ["Divine Shield", "Rage"],
  ["Divine Shield", "Thorn Shield"],
  ["Arcane Shield", "Divine Shield"],
  ["Arcane Shield", "Aura of Protection"],
  ["Rage", "Aura of Protection"],
  ["Rage", "Thorn Shield"],
  ["Heavenly Light", "Aura of Protection"],
  ["Song of White Stag", "Aura of Protection"],
  ["War Drums", "Aura of Protection"]
];
const CASTER_COMBOS = [
  ["Ice Bolt", "Summon Treant"],
  ["Ice Bolt", "Summon Water Elemental"],
  ["Ice Bolt", "Lifesteal"],
  ["Ice Bolt", "Fireball"],
  ["Ice Storm", "Fireball"],
  ["Ice Storm", "Summon Fire Elemental"],
  ["Magic Missile", "Summon Treant"],
  ["Magic Missile", "Fireball"],
  ["Chain Lightning", "Ice Bolt"],
  ["Chain Lightning", "Lifesteal"],
  ["Fireblast", "Ice Storm"],
  ["Fireblast", "Summon Fire Elemental"],
  ["Fireball", "Lifesteal"],
  ["Curse of Disdain", "Lifesteal"],
  ["Curse of Disdain", "Summon Shade"],
  ["Faerie Fire", "Summon Treant"],
  ["Faerie Dust", "Ice Bolt"],
  ["Tangle Vine", "Fireball"],
  ["Tangle Vine", "Summon Treant"],
  ["Pestilent Aura", "Lifesteal"]
];
const FIXED_WHISPERSPRING = [
  ["Razorfang Snapdragon", "Snapdragon", 5, 3, 5],
  ["Green Drake", "Green Drake", 5, 2, 4],
  ["Whisperspring Mushroom Man", "Mushroom Man", 6, 2, 7],
  ["Whisperspring Treant", "Treant", 6, 2, 7],
  ["Whisperspring Nymph", "Nymph", 7, 1, 8],
  ["Whisperspring Naiad", "Naiad", 8, 4, 5],
  ["Scylox the Many", "Scylox the Many", 8, 1, 4],
  ["Cogar the Whisperer", "Cogar the Whisperer", 8, 1, 4]
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

function avgDice(dice = "1D4", rng) {
  const die = String(dice || "1D4").trim().match(/^(\d+)D(\d+)$/i);
  if (!die) return Number(dice) || 1;
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

function makeCatalog(data) {
  const spells = new Map();
  for (const spell of data.SoulreaperSpells.starterSpells || []) spells.set(spell.name, spell);
  for (const spell of Object.values(data.SoulreaperWorldData.devSpellConfigs || {})) {
    if (spell.name !== "Arcane Protection") spells.set(spell.name, spell);
  }
  const monsters = new Map([...data.SoulreaperMonsters.monsterTemplates, ...data.SoulreaperMonsters.fenMonsterTemplates].map(monster => [monster.name, monster]));
  return { spells, monsters };
}

function item(data, name) {
  return data.SoulreaperItems.itemTemplates[name] || null;
}

function weapon(data, name) {
  return data.SoulreaperItems.weaponTemplates[name] || data.SoulreaperItems.itemTemplates[name]?.weapon || data.SoulreaperItems.weaponTemplates["Rat Claw"];
}

function spellList(catalog, names) {
  return names.map(name => ({ ...catalog.spells.get(name), lvl: SPELL_LEVEL, realm: normalizeRealm(catalog.spells.get(name)?.realm) })).filter(spell => spell.name);
}

function makePlayer(data, catalog, role, combo) {
  const stats = emptyStats();
  stats.HP = 15 + (PLAYER_LEVEL - 1) * 5;
  stats.REGEN = 1;
  const kit = role === "tank" ? TANK_KIT : CASTER_KIT;
  for (const name of kit) addStats(stats, item(data, name)?.stats || {});
  const unit = {
    role,
    lvl: PLAYER_LEVEL,
    maxHp: stats.HP,
    hp: stats.HP,
    stats,
    resistances: {},
    weapon: role === "tank" ? weapon(data, "Iron Shortsword") : weapon(data, "Coral Wand"),
    spells: spellList(catalog, combo),
    cooldowns: {},
    mods: [],
    shields: [],
    attackTimer: 0
  };
  for (const name of kit) {
    const resists = item(data, name)?.resistances || {};
    for (const [realm, amount] of Object.entries(resists)) unit.resistances[normalizeRealm(realm)] = (unit.resistances[normalizeRealm(realm)] || 0) + Number(amount || 0);
  }
  return unit;
}

function makeEnemy(data, catalog, entry, rng) {
  const template = catalog.monsters.get(entry.template || entry.name);
  if (!template) return null;
  const lvl = entry.lvl;
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
  if (template.elite) stats.HP *= 3;
  if (template.boss) stats.HP *= 6;
  return {
    name: entry.name,
    templateName: template.name,
    lvl,
    realm: normalizeRealm(template.realm),
    maxHp: stats.HP,
    hp: stats.HP,
    stats,
    weapon: weapon(data, template.weapon?.name || "Rat Claw"),
    elite: Boolean(template.elite),
    boss: Boolean(template.boss),
    spells: (template.spells || []).map(ref => catalog.spells.get(ref.name)).filter(Boolean),
    cooldowns: {},
    mods: [],
    shields: [],
    attackTimer: rng() * 0.5
  };
}

function effectiveStats(unit) {
  const stats = { ...unit.stats };
  for (const mod of unit.mods || []) addStats(stats, mod.addStats || {});
  if ((unit.mods || []).some(mod => mod.name === "Pestilent Aura")) stats.REGEN = 0;
  return stats;
}

function mitigation(amount, defender, dmgType = "Physical", realm = "Mortal") {
  const stats = effectiveStats(defender);
  return Math.max(dmgType === "Physical" ? 1 : 0, amount - (dmgType === "Physical" ? stats.DEF : stats.RESIST) - (Number(defender.resistances?.[realm]) || 0));
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
  target.shields = (target.shields || []).filter(shield => shield.remaining > 0 && shield.amount > 0);
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

function weaponDelay(unit) {
  const stats = effectiveStats(unit);
  return Math.max(0.35, ((Number(unit.weapon?.speed) || 100) - (stats.AGL || 0)) / 100);
}

function castSpell(caster, enemy, spell, ally) {
  const stats = effectiveStats(caster);
  const targetFriend = caster.role === "tank" ? caster : ally || caster;
  switch (spell.name) {
    case "Rage":
      addMod(caster, { name: "Rage", remaining: 8, addStats: { ATK: SPELL_LEVEL / 2, DEF: SPELL_LEVEL, AGL: SPELL_LEVEL } });
      return true;
    case "Aura of Protection":
      addMod(caster, { name: "Aura of Protection", remaining: 999, addStats: { DEF: value(spell, "defenseBonus", SPELL_LEVEL, stats.INT) } });
      if (ally) addMod(ally, { name: "Aura of Protection", remaining: 999, addStats: { DEF: value(spell, "defenseBonus", SPELL_LEVEL, stats.INT) } });
      return true;
    case "Song of White Stag":
      addMod(caster, { name: "Song of White Stag", remaining: 999, addStats: { REGEN: value(spell, "regenBonus", SPELL_LEVEL, stats.INT) } });
      if (ally) addMod(ally, { name: "Song of White Stag", remaining: 999, addStats: { REGEN: value(spell, "regenBonus", SPELL_LEVEL, stats.INT) } });
      return true;
    case "War Drums":
      addMod(caster, { name: "War Drums", remaining: 999, addStats: { AGL: value(spell, "agilityBonus", SPELL_LEVEL, stats.INT) } });
      if (ally) addMod(ally, { name: "War Drums", remaining: 999, addStats: { AGL: value(spell, "agilityBonus", SPELL_LEVEL, stats.INT) } });
      return true;
    case "Basic Prayer":
    case "Heavenly Light":
      targetFriend.hp = Math.min(targetFriend.maxHp, targetFriend.hp + value(spell, "heal", SPELL_LEVEL, stats.INT));
      return true;
    case "Divine Shield":
    case "Arcane Shield":
      targetFriend.shields.push({ amount: value(spell, "shield", SPELL_LEVEL, stats.INT), type: spell.name === "Divine Shield" ? "Physical" : "Magical", remaining: 8 });
      return true;
    case "Clarity":
      addMod(caster, { name: "Clarity", remaining: 15, addStats: { INT: value(spell, "intelligenceBonus", SPELL_LEVEL, stats.INT) } });
      return true;
    case "Thorn Shield":
      addMod(caster, { name: "Thorn Shield", remaining: 8, thorn: value(spell, "damage", SPELL_LEVEL, stats.INT) });
      return true;
    case "Ice Bolt":
      addMod(enemy, { name: "Ice Bolt", remaining: 3, disabled: true });
      dealDamage(enemy, value(spell, "damage", SPELL_LEVEL, stats.INT), spell.realm, "Magical");
      return true;
    case "Ice Storm":
      addMod(enemy, { name: "Ice Storm", remaining: Number(spell.duration || 4), disabled: true, dot: value(spell, "damage", SPELL_LEVEL, stats.INT), tick: 1, tickTimer: 1, realm: spell.realm });
      return true;
    case "Tangle Vine":
    case "Pacify":
      addMod(enemy, { name: spell.name, remaining: spell.name === "Pacify" ? 4 : 3, disabled: true });
      return true;
    case "Faerie Fire":
      addMod(enemy, { name: "Faerie Fire", remaining: 6, addStats: { DEF: value(spell, "defensePenalty", SPELL_LEVEL, stats.INT) } });
      return true;
    case "Faerie Dust":
      addMod(enemy, { name: "Faerie Dust", remaining: 6, addStats: { SPD: value(spell, "speedPenalty", SPELL_LEVEL, stats.INT), AGL: value(spell, "agilityPenalty", SPELL_LEVEL, stats.INT) } });
      return true;
    case "Fireball":
    case "Magic Missile":
    case "Chain Lightning":
    case "Lifesteal": {
      const damage = value(spell, "damage", SPELL_LEVEL, stats.INT);
      const dealt = dealDamage(enemy, damage, spell.realm, "Magical");
      if (spell.name === "Lifesteal") caster.hp = Math.min(caster.maxHp, caster.hp + dealt * 0.5);
      if (spell.name === "Fireball") addMod(enemy, { name: "Fireball", remaining: 4, dot: damage * 0.25, tick: 1, tickTimer: 1, realm: spell.realm });
      return true;
    }
    case "Fireblast":
    case "Ring of Fire":
      addMod(enemy, { name: spell.name, remaining: Number(spell.duration || 3), dot: value(spell, "damage", SPELL_LEVEL, stats.INT), tick: Number(spell.tick || 1), tickTimer: Number(spell.tick || 1), realm: spell.realm });
      return true;
    case "Curse of Disdain":
      addMod(enemy, { name: "Curse of Disdain", remaining: 8, dot: value(spell, "dotDamage", SPELL_LEVEL, stats.INT), tick: 1, tickTimer: 1, realm: spell.realm });
      return true;
    case "Pestilent Aura":
      addMod(caster, { name: "Pestilent Aura", remaining: 999 });
      return true;
    case "Summon Treant":
    case "Summon Water Elemental":
    case "Summon Fire Elemental":
    case "Summon Shade":
    case "Raise Skeleton":
      addMod(caster, { name: spell.name, remaining: 30, summonDps: 1.2 + SPELL_LEVEL * 0.45 });
      return true;
    default:
      return false;
  }
}

function tick(unit, dt) {
  for (const shield of unit.shields || []) shield.remaining -= dt;
  unit.shields = (unit.shields || []).filter(shield => shield.remaining > 0 && shield.amount > 0);
  for (const mod of unit.mods || []) {
    mod.remaining -= dt;
    if (mod.dot) {
      mod.tickTimer -= dt;
      while (mod.tickTimer <= 0 && mod.remaining > 0) {
        dealDamage(unit, mod.dot, mod.realm || "Mortal", "Magical");
        mod.tickTimer += mod.tick || 1;
      }
    }
  }
  unit.mods = (unit.mods || []).filter(mod => mod.remaining > 0);
}

function encounterTable(data) {
  const cfg = data.SoulreaperWorldData.devAreaConfigs.Whisperspring;
  const table = (data.SoulreaperWorldData.areaSpawnTables.Whisperspring || []).map(entry => ({
    name: entry.name,
    template: entry.name,
    min: cfg.levelRange.min,
    max: cfg.levelRange.max,
    weight: entry.frequency
  }));
  for (const [name, template, lvl, count, weight] of FIXED_WHISPERSPRING) {
    for (let i = 0; i < count; i += 1) table.push({ name, template, min: lvl, max: lvl, weight });
  }
  return table;
}

function pick(table, rng) {
  const total = table.reduce((sum, entry) => sum + entry.weight, 0);
  let roll = rng() * total;
  for (const entry of table) {
    roll -= entry.weight;
    if (roll <= 0) return entry;
  }
  return table[0];
}

function fight(data, catalog, tankCombo, casterCombo, enemyEntry, seed) {
  const rng = mulberry32(seed);
  const tank = makePlayer(data, catalog, "tank", tankCombo);
  const caster = makePlayer(data, catalog, "caster", casterCombo);
  const enemy = makeEnemy(data, catalog, enemyEntry, rng);
  if (!enemy) return null;
  tank.attackTimer = rng() * 0.3;
  caster.attackTimer = rng() * 0.3;
  const team = [tank, caster];
  for (const spell of tank.spells) if (spell.aura || ["Rage", "Divine Shield", "Arcane Shield"].includes(spell.name)) castSpell(tank, enemy, spell, caster);
  for (const spell of caster.spells) if (spell.aura || ["Clarity"].includes(spell.name)) castSpell(caster, enemy, spell, tank);
  let time = 0;
  while (time < 120 && enemy.hp > 0 && team.some(unit => unit.hp > 0)) {
    const dt = 0.1;
    time += dt;
    for (const unit of [tank, caster, enemy]) tick(unit, dt);
    for (const unit of team) {
      if (unit.hp <= 0) continue;
      const stats = effectiveStats(unit);
      unit.hp = Math.min(unit.maxHp, unit.hp + Math.max(0, stats.REGEN || 0) * dt / 5);
      const ally = unit === tank ? caster : tank;
      for (const spell of unit.spells) {
        unit.cooldowns[spell.name] = Math.max(0, (unit.cooldowns[spell.name] || 0) - dt);
        const heal = ["Basic Prayer", "Heavenly Light"].includes(spell.name) && tank.hp > 0 && tank.hp <= tank.maxHp * 0.72;
        const shield = ["Divine Shield", "Arcane Shield"].includes(spell.name) && tank.hp > 0 && !tank.shields.some(s => s.type === (spell.name === "Divine Shield" ? "Physical" : "Magical"));
        const combat = !spell.aura && !["Rage", "Basic Prayer", "Heavenly Light", "Divine Shield", "Arcane Shield", "Clarity"].includes(spell.name);
        if ((unit.cooldowns[spell.name] || 0) <= 0 && (heal || shield || combat)) {
          castSpell(unit, enemy, spell, ally);
          unit.cooldowns[spell.name] = Math.max(0.5, Number(spell.cooldown || 0));
        }
      }
      const summonDps = unit.mods.reduce((sum, mod) => sum + (Number(mod.summonDps) || 0), 0);
      if (summonDps > 0) dealDamage(enemy, summonDps * dt, "Mortal", "Physical");
      if (unit.spells.some(spell => spell.name === "Pestilent Aura") && enemy.realm !== "Umbral") dealDamage(enemy, SPELL_LEVEL / 5 * dt, "Umbral", "Magical");
      unit.attackTimer -= dt;
      if (unit.attackTimer <= 0) {
        const s = effectiveStats(unit);
        dealDamage(enemy, avgDice(unit.weapon?.dice, rng) + attackDamageBonus(s.ATK), unit.weapon?.realm || "Mortal", unit.weapon?.dmgType || "Physical");
        unit.attackTimer += weaponDelay(unit);
      }
    }
    const target = tank.hp > 0 ? tank : caster;
    const enemyStats = effectiveStats(enemy);
    enemy.hp = Math.min(enemy.maxHp, enemy.hp + Math.max(0, enemyStats.REGEN || 0) * dt / 5);
    const disabled = enemy.mods.some(mod => mod.disabled);
    enemy.attackTimer -= dt;
    if (!disabled && enemy.attackTimer <= 0 && target.hp > 0) {
      const raw = avgDice(enemy.weapon?.dice, rng) + attackDamageBonus(enemyStats.ATK);
      const dealt = dealDamage(target, raw, enemy.weapon?.realm || enemy.realm, enemy.weapon?.dmgType || "Physical");
      const thorn = target.mods.reduce((sum, mod) => sum + (Number(mod.thorn) || 0), 0);
      if (dealt > 0 && thorn > 0) dealDamage(enemy, thorn, "Sylvan", "Magical");
      enemy.attackTimer += weaponDelay(enemy);
    }
    for (const spell of enemy.spells || []) {
      enemy.cooldowns[spell.name] = Math.max(0, (enemy.cooldowns[spell.name] || 0) - dt);
      if (disabled || enemy.cooldowns[spell.name] > 0 || target.hp <= 0) continue;
      if (spell.formulas?.damage) dealDamage(target, value(spell, "damage", enemy.lvl, enemyStats.INT), spell.realm, "Magical");
      else if (spell.formulas?.dotDamage) addMod(target, { name: spell.name, remaining: 8, dot: value(spell, "dotDamage", enemy.lvl, enemyStats.INT), tick: 1, tickTimer: 1, realm: spell.realm });
      else if (spell.formulas?.speedPenalty) addMod(target, { name: spell.name, remaining: 6, addStats: { SPD: value(spell, "speedPenalty", enemy.lvl, enemyStats.INT), AGL: value(spell, "agilityPenalty", enemy.lvl, enemyStats.INT) } });
      enemy.cooldowns[spell.name] = Math.max(2, Number(spell.cooldown || 6));
    }
  }
  return {
    survived: enemy.hp <= 0 && team.some(unit => unit.hp > 0),
    fullTeam: enemy.hp <= 0 && tank.hp > 0 && caster.hp > 0,
    tankDead: tank.hp <= 0,
    casterDead: caster.hp <= 0,
    enemy: enemy.name,
    boss: enemy.boss,
    elite: enemy.elite,
    time,
    hpLeft: Math.max(0, tank.hp) + Math.max(0, caster.hp)
  };
}

function runBuild(data, catalog, table, tankCombo, casterCombo, index) {
  const rng = mulberry32(SEED + index * 8191);
  const deathsBy = new Map();
  let survived = 0;
  let fullTeam = 0;
  let tankDeaths = 0;
  let casterDeaths = 0;
  let bossWins = 0;
  let bossFights = 0;
  let hpLeft = 0;
  let time = 0;
  let total = 0;
  for (let run = 0; run < RUNS; run += 1) {
    for (let fightIndex = 0; fightIndex < FIGHTS; fightIndex += 1) {
      const picked = pick(table, rng);
      const lvl = picked.min + Math.floor(rng() * (picked.max - picked.min + 1));
      const result = fight(data, catalog, tankCombo, casterCombo, { ...picked, lvl }, SEED + index * 100003 + run * 379 + fightIndex);
      if (!result) continue;
      total += 1;
      if (result.boss) bossFights += 1;
      if (result.survived) {
        survived += 1;
        if (result.fullTeam) fullTeam += 1;
        if (result.boss) bossWins += 1;
      } else {
        deathsBy.set(result.enemy, (deathsBy.get(result.enemy) || 0) + 1);
      }
      if (result.tankDead) tankDeaths += 1;
      if (result.casterDead) casterDeaths += 1;
      hpLeft += result.hpLeft;
      time += result.time;
    }
  }
  return {
    tank: tankCombo.join(" + "),
    caster: casterCombo.join(" + "),
    survival: survived / total,
    fullTeamSurvival: fullTeam / total,
    tankDeathRate: tankDeaths / total,
    casterDeathRate: casterDeaths / total,
    bossSurvival: bossFights ? bossWins / bossFights : 0,
    avgHpLeft: hpLeft / total,
    avgTime: time / total,
    total,
    topKiller: [...deathsBy.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || ""
  };
}

function main() {
  const data = loadData();
  const catalog = makeCatalog(data);
  const table = encounterTable(data);
  const results = [];
  let index = 0;
  for (const tankCombo of TANK_COMBOS) {
    for (const casterCombo of CASTER_COMBOS) {
      results.push(runBuild(data, catalog, table, tankCombo, casterCombo, index++));
    }
  }
  results.sort((a, b) => b.survival - a.survival || b.fullTeamSurvival - a.fullTeamSurvival || b.avgHpLeft - a.avgHpLeft);
  console.log(JSON.stringify({
    runs: RUNS,
    fightsPerBuild: FIGHTS,
    testedBuilds: results.length,
    playerLevel: PLAYER_LEVEL,
    spellLevel: SPELL_LEVEL,
    tankGear: TANK_KIT,
    casterGear: CASTER_KIT,
    top: results.slice(0, 15),
    bottom: results.slice(-15).reverse(),
    median: results[Math.floor(results.length / 2)]
  }, null, 2));
}

main();
