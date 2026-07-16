#!/usr/bin/env node
"use strict";

const fs = require("fs");
const vm = require("vm");

const RUNS = Number(process.argv.find(arg => arg.startsWith("--runs="))?.split("=")[1]) || 40;
const SAMPLE = Number(process.argv.find(arg => arg.startsWith("--sample="))?.split("=")[1]) || 420;
const SEED = Number(process.argv.find(arg => arg.startsWith("--seed="))?.split("=")[1]) || 20260708;
const TARGET_LEVEL = 10;
const OVERHEAD_SECONDS = 7;
const DEATH_SECONDS = 35;
const REALMS = ["Mortal", "Ethereal", "Celestial", "Infernal", "Sylvan", "Umbral"];
const STATS = ["HP", "ATK", "DEF", "SPD", "AGL", "INT", "FOCUS", "BLOCK", "RESIST", "REGEN"];

const ARMOR_SETS = [
  { name: "Linen", items: ["Linen Shirt", "Linen Pants"] },
  { name: "Leather", items: ["Leather Hood", "Leather Breastplate", "Leather Pants", "Leather Gloves", "Leather Boots", "Leather Pauldrons", "Leather Bracer", "Leather Bracer"] },
  { name: "Spidersilk", items: ["Spidersilk Cowl", "Spidersilk Robe", "Spidersilk Pants", "Spidersilk Gloves", "Spidersilk Slippers", "Spidersilk Shoulderpads", "Spidersilk Belt"] },
  { name: "Eldweave", items: ["Eldweave Hood", "Eldweave Shirt", "Eldweave Pants", "Eldweave Gloves", "Eldweave Boots", "Eldweave Shoulderpads"] },
  { name: "Bronze Chainmail", items: ["Bronze Chainmail Coif", "Bronze Chainmail Vest", "Bronze Chainmail Pants", "Bronze Chainmail Gloves", "Bronze Chainmail Pauldrons", "Bronze Chainmail Boots", "Bronze Chainmail Bracer", "Bronze Chainmail Bracer"] },
  { name: "Bronze Plate", items: ["Bronze Spangenhelm", "Bronze Plate Cuirass", "Bronze Plate Greaves", "Bronze Plate Gauntlets", "Bronze Plate Pauldrons", "Bronze Plate Sabatons", "Bronze Plate Bracer", "Bronze Plate Bracer"] },
  { name: "Iron Plate", items: ["Iron Plate Spangenhelm", "Iron Plate Cuirass", "Iron Plate Greaves", "Iron Plate Gauntlets", "Iron Plate Pauldrons", "Iron Plate Sabatons", "Iron Plate Bracer", "Iron Plate Bracer"] },
  { name: "Ratzkhanite Leather", items: ["Ratzkhanite Leather Corset", "Ratzkhanite Leather Garter", "Ratzkhanite Leather Boots", "Ratzkhanite Leather Spaulder", "Ratzkhanite Leather Bracer", "Ratzkhanite Leather Bracer"] }
];

const WEAPONS = [
  "Iron Dagger",
  "Iron Shortsword",
  "Iron Longsword",
  "Iron Mace",
  "Iron Battleaxe",
  "Shortbow",
  "Longbow",
  "Wooden Staff",
  "Willow Branch",
  "Ebony Wand",
  "Bone Wand",
  "Sunstone Wand"
];

const SPELL_BUILDS = [
  { name: "Mortal burst", active: ["Rage", "Shield Bash"], passive: "Shield Mastery", plan: ["ATK", "DEF", "AGL", "BLOCK", "FOCUS"] },
  { name: "Mortal crit", active: ["Rage", "Basic Prayer"], passive: "Dagger Mastery", plan: ["FOCUS", "ATK", "AGL", "DEF", "RESIST"] },
  { name: "Mortal dual", active: ["Rage", "Godspeed"], passive: "Dual Wield", plan: ["ATK", "AGL", "FOCUS", "DEF", "ATK"] },
  { name: "Infernal burn", active: ["Fireball", "Ring of Fire"], passive: "Burning Skin", plan: ["INT", "FOCUS", "AGL", "RESIST", "INT"] },
  { name: "Infernal blast", active: ["Fireball", "Fireblast"], passive: "War Drums", plan: ["INT", "AGL", "FOCUS", "RESIST", "DEF"] },
  { name: "Ethereal control", active: ["Magic Missile", "Ice Bolt"], passive: "Etherwind Aura", plan: ["INT", "FOCUS", "RESIST", "AGL", "INT"] },
  { name: "Ethereal shield", active: ["Magic Missile", "Arcane Shield"], passive: "Etherwind Aura", plan: ["INT", "RESIST", "FOCUS", "AGL", "DEF"] },
  { name: "Celestial sustain", active: ["Heavenly Light", "Divine Shield"], passive: "Aura of Protection", plan: ["DEF", "RESIST", "INT", "BLOCK", "AGL"] },
  { name: "Celestial tempo", active: ["Godspeed", "Basic Prayer"], passive: "Aura of Protection", plan: ["AGL", "DEF", "INT", "RESIST", "ATK"] },
  { name: "Umbral attrition", active: ["Curse of Disdain", "Bone Ritual"], passive: "Pestilent Aura", plan: ["INT", "RESIST", "FOCUS", "DEF", "AGL"] },
  { name: "Umbral plague", active: ["Virulent Plague", "Bone Ritual"], passive: "Pestilent Aura", plan: ["INT", "FOCUS", "RESIST", "AGL", "DEF"] },
  { name: "Sylvan control", active: ["Tangle Vine", "Faerie Fire"], passive: "Song of White Stag", plan: ["INT", "AGL", "RESIST", "FOCUS", "DEF"] },
  { name: "Sylvan support", active: ["Faerie Circle", "Tangle Vine"], passive: "Song of White Stag", plan: ["INT", "RESIST", "AGL", "FOCUS", "DEF"] },
  { name: "Pet safety", active: ["Summon Earth Elemental", "Basic Prayer"], passive: "Aura of Protection", plan: ["INT", "DEF", "RESIST", "FOCUS", "AGL"] },
  { name: "Pet damage", active: ["Summon Fire Elemental", "Fireball"], passive: "Burning Skin", plan: ["INT", "FOCUS", "AGL", "RESIST", "DEF"] }
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
  return value === "Shadow" ? "Umbral" : REALMS.includes(value) ? value : "Mortal";
}

function statBlock(stats = {}) {
  const out = {};
  for (const stat of STATS) out[stat] = Number(stats[stat]) || 0;
  return out;
}

function addStats(target, stats = {}, scale = 1) {
  for (const stat of STATS) target[stat] = (target[stat] || 0) + (Number(stats?.[stat]) || 0) * scale;
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
    req = Math.ceil(req * (nextLevel >= 12 ? 1.15 : nextLevel >= 10 ? 1.5 : 2));
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
    weaponTemplates: data.SoulreaperItems.weaponTemplates || {},
    areaSpawnTables: data.SoulreaperWorldData.areaSpawnTables || {},
    areaConfigs: data.SoulreaperWorldData.devAreaConfigs || {}
  };
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

function item(catalog, name) {
  return catalog.itemTemplates[name] || null;
}

function weapon(catalog, name) {
  return catalog.weaponTemplates[name]
    || catalog.itemTemplates[name]?.weapon
    || catalog.weaponTemplates["Rat Claw"]
    || { name, dice: "1D4", speed: 100, dmgType: "Physical", realm: "Mortal" };
}

function armorStats(catalog, armorSet) {
  const stats = statBlock();
  for (const name of armorSet.items) addStats(stats, item(catalog, name)?.stats || {});
  return stats;
}

function makePlayer(catalog, loadout, level) {
  const stats = statBlock({ HP: 15 + (level - 1) * 5, ATK: 1, DEF: 0, SPD: 2, AGL: 1, INT: 1, FOCUS: 2, BLOCK: 2, RESIST: 1, REGEN: 1 });
  for (let lvl = 2; lvl <= level; lvl += 1) {
    const stat = loadout.spells.plan[(lvl - 2) % loadout.spells.plan.length];
    stats[stat] = (stats[stat] || 0) + 1;
  }
  addStats(stats, armorStats(catalog, loadout.armor));
  const shield = loadout.weapon.includes("Shortsword") || loadout.weapon.includes("Mace") || loadout.weapon.includes("Dagger")
    ? item(catalog, "Iron Shield")
    : null;
  if (shield) addStats(stats, shield.stats || {});
  const active = loadout.spells.active.map(name => catalog.spells.get(name)).filter(Boolean);
  const passive = catalog.spells.get(loadout.spells.passive);
  return {
    level,
    maxHp: stats.HP,
    hp: stats.HP,
    stats,
    weapon: weapon(catalog, loadout.weapon),
    armor: loadout.armor.name,
    shield,
    active,
    passive,
    spellLevel: Math.max(1, Math.min(level, Math.floor((level + 1) / 2))),
    mods: [],
    shields: []
  };
}

function makeMonster(catalog, name, level) {
  const template = catalog.monsters.get(name);
  if (!template) return null;
  const base = statBlock(template.stats || {});
  const stats = statBlock({
    HP: Math.max(1, base.HP * level),
    ATK: Math.floor(base.ATK * level),
    DEF: Math.floor((base.DEF * level) / 2),
    SPD: base.SPD,
    AGL: base.AGL,
    INT: base.INT,
    FOCUS: base.FOCUS,
    BLOCK: base.BLOCK,
    RESIST: base.RESIST,
    REGEN: base.REGEN * level
  });
  if (template.elite) stats.HP *= 3;
  if (template.boss) stats.HP *= 6;
  return {
    name,
    level,
    realm: normalizeRealm(template.realm),
    stats,
    maxHp: stats.HP,
    hp: stats.HP,
    weapon: weapon(catalog, template.weapon?.name || "Rat Claw"),
    elite: Boolean(template.elite),
    boss: Boolean(template.boss),
    spells: (template.spells || []).map(ref => catalog.spells.get(ref.name || ref)).filter(Boolean),
    timers: {},
    mods: [],
    shields: []
  };
}

function effectiveStats(unit) {
  const stats = { ...unit.stats };
  for (const mod of unit.mods || []) addStats(stats, mod.addStats || {});
  return stats;
}

function mitigated(amount, defender, dmgType = "Physical") {
  const stats = effectiveStats(defender);
  const mitigation = dmgType === "Physical" ? stats.DEF : stats.RESIST;
  return Math.max(dmgType === "Physical" ? 1 : 0, amount - mitigation);
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
  const dealt = mitigated(remaining, target, dmgType);
  target.hp -= dealt;
  return dealt;
}

function addMod(unit, mod) {
  const existing = unit.mods.find(item => item.name === mod.name);
  if (existing) Object.assign(existing, mod, { remaining: mod.remaining });
  else unit.mods.push({ ...mod });
}

function weaponDelay(unit, usedWeapon) {
  const stats = effectiveStats(unit);
  let speed = Number(usedWeapon?.speed) || 100;
  if (unit.passive?.name === "Archery Mastery" && String(usedWeapon?.category || "").includes("Bow")) speed -= unit.spellLevel * 3;
  if (unit.passive?.name === "Axe Mastery" && String(usedWeapon?.weaponTypes || usedWeapon?.category || "").includes("Axe")) speed -= unit.spellLevel * 3;
  return Math.max(0.35, (speed - (stats.AGL || 0)) / 100);
}

function castSpell(caster, target, spell) {
  const level = caster.spellLevel || caster.level || 1;
  const stats = effectiveStats(caster);
  const int = stats.INT || 0;
  switch (spell.name) {
    case "Rage":
      addMod(caster, { name: "Rage", remaining: 8, addStats: { ATK: level / 2, DEF: level, AGL: level } });
      return true;
    case "Godspeed":
      addMod(caster, { name: "Godspeed", remaining: 60, addStats: { SPD: spellValue(spell, "speedBonus", level, int, 0, 0.25) } });
      return true;
    case "Basic Prayer":
    case "Heavenly Light":
    case "Bone Ritual":
      caster.hp = Math.min(caster.maxHp, caster.hp + spellValue(spell, "heal", level, int, spell.name === "Heavenly Light" ? 5 : 0, spell.name === "Heavenly Light" ? 2 : 1.5));
      return true;
    case "Divine Shield":
      caster.shields.push({ amount: spellValue(spell, "shield", level, int, 0, 3), type: "Physical", remaining: 8 });
      return true;
    case "Arcane Shield":
      caster.shields.push({ amount: spellValue(spell, "shield", level, int, 0, 3), type: "Magical", remaining: 8 });
      return true;
    case "Shield Bash":
      dealDamage(target, spellValue(spell, "damage", level, int, 0, 1), "Mortal", "Physical");
      addMod(target, { name: "Shield Bash", remaining: 2, disabled: true });
      return true;
    case "Tangle Vine":
    case "Pacify":
    case "Ice Bolt":
      if (spell.name === "Ice Bolt") dealDamage(target, spellValue(spell, "damage", level, int), spell.realm, "Magical");
      addMod(target, { name: spell.name, remaining: spell.name === "Pacify" ? 4 : 3, disabled: true });
      return true;
    case "Faerie Fire":
      addMod(target, { name: "Faerie Fire", remaining: 8, addStats: { DEF: spellValue(spell, "defensePenalty", level, int, 0, -0.5) } });
      return true;
    case "Magic Missile":
    case "Lifesteal":
    case "Fireball": {
      const damage = spellValue(spell, "damage", level, int, 2, 1);
      const dealt = dealDamage(target, damage, spell.realm, "Magical");
      if (spell.name === "Lifesteal") caster.hp = Math.min(caster.maxHp, caster.hp + dealt * 0.5);
      if (spell.name === "Fireball") addMod(target, { name: "Fireball", remaining: 4, dot: damage * 0.25, tick: 1, tickTimer: 1, realm: spell.realm });
      return true;
    }
    case "Curse of Disdain":
    case "Virulent Plague":
      addMod(target, { name: spell.name, remaining: Number(spell.duration || 8), dot: spellValue(spell, "dotDamage", level, int, 0, 0.5), tick: Number(spell.tick || 1), tickTimer: 1, realm: spell.realm });
      return true;
    case "Fireblast":
    case "Ring of Fire":
    case "Ice Storm":
      addMod(target, { name: spell.name, remaining: Number(spell.duration || 4), dot: spellValue(spell, "damage", level, int, 1, 1), tick: Number(spell.tick || 1), tickTimer: Number(spell.tick || 1), realm: spell.realm, disabled: spell.name === "Ice Storm" });
      return true;
    case "Faerie Circle":
      addMod(caster, { name: spell.name, remaining: 12, addStats: { RESIST: level } });
      return true;
    case "Dark Circle":
      addMod(caster, { name: spell.name, remaining: 12, addStats: { ATK: level / 2 } });
      return true;
    case "Grace from Above":
      addMod(caster, { name: spell.name, remaining: 8, healDot: level / 2 });
      return true;
    case "Summon Earth Elemental":
    case "Summon Fire Elemental":
    case "Summon Water Elemental":
    case "Summon Shade":
    case "Summon Treant":
    case "Raise Skeleton":
      addMod(caster, { name: spell.name, remaining: 30, summonDps: 1.2 + level * 0.45 });
      return true;
    default:
      if (spell.formulas?.damage) return Boolean(dealDamage(target, spellValue(spell, "damage", level, int), spell.realm, "Magical"));
      return false;
  }
}

function applyPassive(player) {
  const passive = player.passive;
  if (!passive) return;
  const level = player.spellLevel;
  const int = player.stats.INT || 0;
  if (passive.name === "Aura of Protection") addMod(player, { name: passive.name, remaining: 999, addStats: { DEF: spellValue(passive, "defenseBonus", level, int, 0, 1) } });
  if (passive.name === "Song of White Stag") addMod(player, { name: passive.name, remaining: 999, addStats: { REGEN: spellValue(passive, "regenBonus", level, int, 0, 0.5) } });
  if (passive.name === "War Drums") addMod(player, { name: passive.name, remaining: 999, addStats: { AGL: spellValue(passive, "agilityBonus", level, int, 0, 2.5) } });
  if (passive.name === "Etherwind Aura") addMod(player, { name: passive.name, remaining: 999, addStats: { INT: level / 2, RESIST: level / 2 } });
  if (passive.name === "Shield Mastery" && player.shield) addMod(player, { name: passive.name, remaining: 999, addStats: { BLOCK: level } });
  if (passive.name === "Dagger Mastery" && /dagger/i.test(player.weapon?.name || "")) addMod(player, { name: passive.name, remaining: 999, addStats: { FOCUS: 4 + level } });
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
    if (mod.healDot) unit.hp = Math.min(unit.maxHp, unit.hp + mod.healDot * dt);
  }
  unit.mods = (unit.mods || []).filter(mod => mod.remaining > 0);
}

function fight(catalog, loadout, enemyBase, level, seed) {
  const rng = mulberry32(seed);
  const player = makePlayer(catalog, loadout, level);
  const enemy = { ...enemyBase, stats: { ...enemyBase.stats }, mods: [], shields: [], timers: {} };
  let pAttack = rng() * 0.4;
  let eAttack = rng() * 0.5;
  applyPassive(player);
  for (const spell of player.active) {
    if (["Rage", "Godspeed", "Divine Shield", "Arcane Shield"].includes(spell.name)) castSpell(player, enemy, spell);
  }
  let time = 0;
  while (time < 120 && player.hp > 0 && enemy.hp > 0) {
    const dt = 0.1;
    time += dt;
    tick(player, dt);
    tick(enemy, dt);
    player.hp = Math.min(player.maxHp, player.hp + Math.max(0, effectiveStats(player).REGEN || 0) * dt / 5);
    enemy.hp = Math.min(enemy.maxHp, enemy.hp + Math.max(0, effectiveStats(enemy).REGEN || 0) * dt / 5);
    for (const spell of player.active) {
      player.cooldowns ||= {};
      player.cooldowns[spell.name] = Math.max(0, (player.cooldowns[spell.name] || 0) - dt);
      const heal = ["Basic Prayer", "Heavenly Light", "Bone Ritual"].includes(spell.name) && player.hp < player.maxHp * 0.72;
      const shield = spell.name.includes("Shield") && !player.shields.length;
      const attack = !["Rage", "Godspeed", "Basic Prayer", "Heavenly Light", "Bone Ritual", "Divine Shield", "Arcane Shield"].includes(spell.name);
      if (player.cooldowns[spell.name] <= 0 && (heal || shield || attack)) {
        castSpell(player, enemy, spell);
        player.cooldowns[spell.name] = Math.max(0.5, Number(spell.cooldown || 0));
      }
    }
    const summonDps = player.mods.reduce((sum, mod) => sum + (Number(mod.summonDps) || 0), 0);
    if (summonDps) dealDamage(enemy, summonDps * dt, "Mortal", "Physical");
    if (player.passive?.name === "Pestilent Aura" && enemy.realm !== "Umbral") dealDamage(enemy, player.spellLevel / 5 * dt, "Umbral", "Magical");
    if (player.passive?.name === "Burning Skin") addMod(player, { name: "Burning Skin", remaining: 999, thorn: player.spellLevel * 0.5 });
    pAttack -= dt;
    if (pAttack <= 0) {
      const raw = avgDice(player.weapon?.dice, rng) + attackBonus(effectiveStats(player).ATK);
      dealDamage(enemy, raw, player.weapon?.realm || "Mortal", player.weapon?.dmgType || "Physical");
      if (player.passive?.name === "Dual Wield") dealDamage(enemy, raw * (0.1 + player.spellLevel * 0.02), player.weapon?.realm || "Mortal", player.weapon?.dmgType || "Physical");
      pAttack += weaponDelay(player, player.weapon);
    }
    const disabled = enemy.mods.some(mod => mod.disabled);
    eAttack -= dt;
    if (!disabled && eAttack <= 0) {
      const raw = avgDice(enemy.weapon?.dice, rng) + attackBonus(effectiveStats(enemy).ATK);
      const blocked = rng() < Math.min(0.7, Math.max(0, effectiveStats(player).BLOCK || 0) / 100);
      const dealt = blocked ? 0 : dealDamage(player, raw, enemy.weapon?.realm || enemy.realm, enemy.weapon?.dmgType || "Physical");
      const thorn = player.mods.reduce((sum, mod) => sum + (Number(mod.thorn) || 0), 0);
      if (thorn > 0 && dealt > 0) dealDamage(enemy, thorn, player.passive?.name === "Burning Skin" ? "Infernal" : "Sylvan", "Magical");
      eAttack += weaponDelay(enemy, enemy.weapon);
    }
    for (const spell of enemy.spells || []) {
      enemy.timers[spell.name] = Math.max(0, (enemy.timers[spell.name] || 0) - dt);
      if (enemy.timers[spell.name] > 0 || disabled) continue;
      if (spell.formulas?.damage) dealDamage(player, spellValue(spell, "damage", enemy.level, 0), spell.realm, "Magical");
      if (spell.formulas?.dotDamage) addMod(player, { name: spell.name, remaining: 8, dot: spellValue(spell, "dotDamage", enemy.level, 0), tick: 1, tickTimer: 1, realm: spell.realm });
      enemy.timers[spell.name] = Math.max(2, Number(spell.cooldown || 6));
    }
  }
  return {
    survived: player.hp > 0 && enemy.hp <= 0,
    timeout: player.hp > 0 && enemy.hp > 0,
    seconds: time,
    hpLeft: Math.max(0, player.hp),
    enemyHpLeft: Math.max(0, enemy.hp)
  };
}

function areaRows(catalog) {
  return Object.entries(catalog.areaConfigs)
    .filter(([name, cfg]) => cfg.levelRange && catalog.areaSpawnTables[name]?.length)
    .map(([name, cfg]) => ({ name, min: cfg.levelRange.min, max: cfg.levelRange.max }));
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

function candidateAreas(catalog, level) {
  const rows = areaRows(catalog);
  const exact = rows.filter(row => level >= row.min && level <= row.max + 1);
  if (exact.length) return exact;
  const below = rows.filter(row => row.max < level).sort((a, b) => b.max - a.max);
  return below.length ? [below[0]] : rows.slice(0, 1);
}

function sampleEncounter(catalog, area, level, rng) {
  const table = catalog.areaSpawnTables[area.name] || [];
  for (let guard = 0; guard < 20; guard += 1) {
    const entry = weightedPick(table, rng);
    const template = catalog.monsters.get(entry?.name);
    if (!template) continue;
    const min = Number(entry.minLvl ?? entry.minLevel ?? area.min);
    const max = Number(entry.maxLvl ?? entry.maxLevel ?? area.max);
    const lvl = Math.max(min, Math.min(max, level + Math.floor(rng() * 2)));
    const monster = makeMonster(catalog, template.name, lvl);
    if (monster) return monster;
  }
  return null;
}

function chooseArea(catalog, loadout, level, rng) {
  let best = null;
  for (const area of candidateAreas(catalog, level)) {
    let wins = 0;
    let xp = 0;
    let seconds = 0;
    for (let i = 0; i < 12; i += 1) {
      const enemy = sampleEncounter(catalog, area, level, rng);
      if (!enemy) continue;
      const result = fight(catalog, loadout, enemy, level, SEED + i * 97 + level * 13);
      if (result.survived) {
        wins += 1;
        xp += enemy.maxHp;
      }
      seconds += result.seconds + OVERHEAD_SECONDS + (result.survived ? 0 : DEATH_SECONDS);
    }
    const survival = wins / 12;
    const xpPerMinute = xp / Math.max(1, seconds / 60);
    const score = survival < 0.45 ? xpPerMinute * survival * 0.2 : xpPerMinute * Math.max(0.2, survival);
    if (!best || score > best.score) best = { ...area, survival, score };
  }
  return best || candidateAreas(catalog, level)[0];
}

function runLoadout(catalog, loadout, run) {
  const rng = mulberry32(SEED + run * 10007 + loadout.id * 313);
  const byLevel = [];
  let totalKills = 0;
  let totalDeaths = 0;
  let totalSeconds = 0;
  const deathBy = new Map();
  for (let level = 1; level < TARGET_LEVEL; level += 1) {
    const area = chooseArea(catalog, loadout, level, rng);
    const xpNeeded = xpRequirementForLevel(level);
    let xp = 0;
    let kills = 0;
    let deaths = 0;
    let seconds = 0;
    let guard = 0;
    while (xp < xpNeeded && guard < 650) {
      guard += 1;
      const enemy = sampleEncounter(catalog, area, level, rng);
      if (!enemy) break;
      const result = fight(catalog, loadout, enemy, level, SEED + run * 99991 + loadout.id * 131 + guard);
      seconds += result.seconds + OVERHEAD_SECONDS;
      if (result.survived) {
        xp += Math.max(1, Math.floor(enemy.maxHp));
        kills += 1;
      } else {
        deaths += 1;
        seconds += DEATH_SECONDS;
        deathBy.set(enemy.name, (deathBy.get(enemy.name) || 0) + 1);
      }
    }
    totalKills += kills;
    totalDeaths += deaths;
    totalSeconds += seconds;
    byLevel.push({ level, area: area.name, kills, deaths, minutes: seconds / 60, xpNeeded, stuck: guard >= 650 });
  }
  return {
    key: loadout.key,
    spellBuild: loadout.spells.name,
    armor: loadout.armor.name,
    weapon: loadout.weapon,
    kills: totalKills,
    deaths: totalDeaths,
    minutes: totalSeconds / 60,
    byLevel,
    topKiller: [...deathBy.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || ""
  };
}

function average(values) {
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
}

function percentile(values, p) {
  const sorted = values.slice().sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))] || 0;
}

function aggregate(results) {
  const byKey = new Map();
  for (const row of results) {
    const rows = byKey.get(row.key) || [];
    rows.push(row);
    byKey.set(row.key, rows);
  }
  return [...byKey.entries()].map(([key, rows]) => ({
    key,
    spellBuild: rows[0].spellBuild,
    armor: rows[0].armor,
    weapon: rows[0].weapon,
    avgDeaths: average(rows.map(row => row.deaths)),
    avgKills: average(rows.map(row => row.kills)),
    avgMinutes: average(rows.map(row => row.minutes)),
    p75Minutes: percentile(rows.map(row => row.minutes), 0.75),
    deathRate: rows.reduce((sum, row) => sum + row.deaths, 0) / Math.max(1, rows.reduce((sum, row) => sum + row.kills + row.deaths, 0)),
    topKiller: mode(rows.map(row => row.topKiller).filter(Boolean)),
    levelTrouble: summarizeLevels(rows)
  })).sort((a, b) => a.deathRate - b.deathRate || a.avgMinutes - b.avgMinutes);
}

function mode(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) || 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || "";
}

function summarizeLevels(rows) {
  const byLevel = new Map();
  for (const row of rows) {
    for (const level of row.byLevel) {
      const list = byLevel.get(level.level) || [];
      list.push(level);
      byLevel.set(level.level, list);
    }
  }
  return [...byLevel.entries()].map(([level, list]) => ({
    level,
    area: mode(list.map(item => item.area)),
    avgDeaths: average(list.map(item => item.deaths)),
    avgMinutes: average(list.map(item => item.minutes))
  })).filter(item => item.avgDeaths >= 1.5 || item.avgMinutes >= 28);
}

function makeLoadouts(catalog) {
  const all = [];
  let id = 1;
  for (const spells of SPELL_BUILDS) {
    const exists = [...spells.active, spells.passive].every(name => catalog.spells.has(name));
    if (!exists) continue;
    for (const armor of ARMOR_SETS) {
      for (const weaponName of WEAPONS) {
        if (!weapon(catalog, weaponName)) continue;
        all.push({ id: id++, spells, armor, weapon: weaponName, key: `${spells.name} | ${armor.name} | ${weaponName}` });
      }
    }
  }
  const rng = mulberry32(SEED);
  return all.sort(() => rng() - 0.5).slice(0, Math.min(SAMPLE, all.length));
}

function groupSummary(rows, field) {
  const groups = new Map();
  for (const row of rows) {
    const list = groups.get(row[field]) || [];
    list.push(row);
    groups.set(row[field], list);
  }
  return [...groups.entries()].map(([name, list]) => ({
    name,
    count: list.length,
    deathRate: average(list.map(item => item.deathRate)),
    avgMinutes: average(list.map(item => item.avgMinutes))
  })).sort((a, b) => a.deathRate - b.deathRate || a.avgMinutes - b.avgMinutes);
}

function contentGapSummary(catalog) {
  return Array.from({ length: TARGET_LEVEL - 1 }, (_, index) => index + 1).map(level => {
    const areas = candidateAreas(catalog, level);
    return {
      level,
      areas: areas.map(area => `${area.name}(${area.min}-${area.max})`)
    };
  });
}

function main() {
  const data = loadData();
  const catalog = buildCatalog(data);
  const loadouts = makeLoadouts(catalog);
  const results = [];
  for (let run = 0; run < RUNS; run += 1) {
    for (const loadout of loadouts) results.push(runLoadout(catalog, loadout, run));
  }
  const rows = aggregate(results);
  console.log(JSON.stringify({
    runs: RUNS,
    sampledLoadouts: loadouts.length,
    possibleLoadouts: SPELL_BUILDS.length * ARMOR_SETS.length * WEAPONS.length,
    targetLevel: TARGET_LEVEL,
    assumptions: {
      questXp: "not included",
      gearAccess: "stress test; each sampled loadout uses the named weapon/armor from lvl 1-10",
      movement: "abstracted to overhead seconds per fight",
      resultUse: "triage signal, not a frame-perfect browser playthrough"
    },
    best: rows.slice(0, 20),
    worst: rows.slice(-20).reverse(),
    bySpellBuild: groupSummary(rows, "spellBuild"),
    byArmor: groupSummary(rows, "armor"),
    byWeapon: groupSummary(rows, "weapon"),
    contentGaps: contentGapSummary(catalog)
  }, null, 2));
}

main();
