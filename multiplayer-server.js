const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || (process.env.RENDER ? "0.0.0.0" : "127.0.0.1");
const worlds = new Map();
const players = new Map();
const sockets = new Map();
const teams = new Map();
const pendingTeamInvites = new Map();
const trades = new Map();
const characterSaves = new Map();
const DATA_DIR = path.join(root, ".soulreaper-data");
const ACCOUNT_STORE_FILE = process.env.SOULREAPER_ACCOUNT_STORE || path.join(DATA_DIR, "accounts.json");
const DATABASE_URL = process.env.DATABASE_URL || "";
const USE_POSTGRES_ACCOUNT_STORE = Boolean(DATABASE_URL);
const SESSION_COOKIE = "soulreaper_session";
const SESSION_DAYS = 14;
const MAX_CHARACTERS_PER_ACCOUNT = 6;
const PROFANE_NAME_PARTS = [
  "fuck", "shit", "bitch", "cunt", "dick", "pussy", "asshole", "nigger", "faggot", "retard"
];
const accountStore = {
  accounts: [],
  characters: [],
  sessions: []
};
let accountStoreSaveTimer = null;
let postgresPool = null;
const RANGE_UNIT = 34;
const HOSTILE_TRIGGER_RANGE = 7;
const LEASH_RETURN_RANGE = 42;
const UNIT_SIZE_SCALE = 1.5;
const PET_DURATION_SECONDS = 150;
const ELITE_RESPAWN_SECONDS = 900;
const BOSS_RESPAWN_SECONDS = 900;
const spawnRates = { None: 0, Low: 0.06, Normal: 0.18, High: 0.36, Insane: 0.84 };
const spawnAmountMultipliers = { "Very Low": 0.25, Low: 0.5, Moderate: 0.75, Normal: 1, Busy: 1.25, Crowded: 1.5, Intense: 2 };
const BASE_AMBIENT_MOBS_PER_PLAYER = 28;
const AMBIENT_EMPTY_AREA_GRACE_SECONDS = 20;
const AMBIENT_EMPTY_AREA_DESPAWN_INTERVAL = 6;

function normalizeRealm(realm = "Mortal") {
  return realm === "Shadow" ? "Umbral" : realm || "Mortal";
}

function mergeRealmValue(existing, incoming) {
  if (existing === undefined) return incoming;
  if (typeof existing === "number" || typeof incoming === "number") return (Number(existing) || 0) + (Number(incoming) || 0);
  if (existing && incoming && typeof existing === "object" && typeof incoming === "object" && !Array.isArray(existing) && !Array.isArray(incoming)) {
    const merged = { ...existing };
    for (const [key, value] of Object.entries(incoming)) {
      merged[key] = mergeRealmValue(merged[key], value);
    }
    return merged;
  }
  return existing;
}

function normalizeRealmMap(map = {}) {
  if (!map || typeof map !== "object") return map;
  for (const [key, value] of Object.entries(map)) {
    const normalized = normalizeRealm(key);
    if (normalized !== key) {
      map[normalized] = mergeRealmValue(map[normalized], value);
      delete map[key];
    }
  }
  return map;
}

function normalizeRealmData(value) {
  if (value === "Shadow") return "Umbral";
  if (Array.isArray(value)) {
    value.forEach((entry, index) => { value[index] = normalizeRealmData(entry); });
    return value;
  }
  if (!value || typeof value !== "object") return value;
  for (const [key, entry] of Object.entries(value)) {
    const normalizedKey = normalizeRealm(key);
    const normalizedValue = normalizeRealmData(entry);
    if (normalizedKey !== key) {
      value[normalizedKey] = mergeRealmValue(value[normalizedKey], normalizedValue);
      delete value[key];
    } else {
      value[key] = normalizedValue;
    }
  }
  return value;
}

let weaponTemplates = {
  "Rat Claw": { name: "Rat Claw", realm: "Mortal", dmgType: "Physical", dice: "1D4", speed: 100, range: 1, animation: "claw" },
  "Rusty Dagger": { name: "Rusty Dagger", realm: "Mortal", dmgType: "Physical", dice: "1D4", speed: 100, range: 1, animation: "stab" },
  "Ivory Wand": { name: "Ivory Wand", realm: "Sylvan", dmgType: "Magical", dice: "1D6", speed: 100, range: 5, animation: "projectile", projectileSpeed: 2 },
  Bite: { name: "Bite", realm: "Mortal", dmgType: "Physical", dice: "1D6", speed: 100, range: 1, animation: "claw" },
  "Willow Branch": { name: "Willow Branch", realm: "Mortal", dmgType: "Magical", dice: "1D4", speed: 100, range: 4, animation: "projectile", projectileSpeed: 3 },
  Spark: { name: "Spark", realm: "Ethereal", dmgType: "Magical", dice: "1D6", speed: 100, range: 4, animation: "projectile", projectileSpeed: 3 },
  "Fetid Splash": { name: "Fetid Splash", realm: "Mortal", dmgType: "Magical", dice: "1D6", speed: 50, range: 4, animation: "projectile", projectileSpeed: 1.2 },
  "Bronze Dagger": { name: "Bronze Dagger", realm: "Mortal", dmgType: "Physical", dice: "1D4", speed: 50, range: 3, animation: "stab" },
  "Bronze Shortsword": { name: "Bronze Shortsword", realm: "Mortal", dmgType: "Physical", dice: "1D6", speed: 100, range: 3, animation: "slash" },
  "Bronze Longsword": { name: "Bronze Longsword", realm: "Mortal", category: "Melee", rarity: "common", hands: "Two-Handed", dmgType: "Physical", dice: "2D6", speed: 150, range: 3.5, animation: "slash", goldValue: 10 },
  "Ebony Wand": { name: "Ebony Wand", realm: "Infernal", dmgType: "Magical", dice: "1D6", speed: 100, range: 5, animation: "projectile", projectileSpeed: 2 },
  "Bone Staff": { name: "Bone Staff", realm: "Umbral", dmgType: "Magical", dice: "1D6", speed: 100, range: 5, animation: "projectile", projectileSpeed: 2 },
  Shortbow: { name: "Shortbow", realm: "Mortal", category: "Bow", dmgType: "Physical", dice: "1D4", speed: 150, range: 6, animation: "projectile", projectileAnimation: "Arrow", projectileSpeed: 4, ammo: "Bronze Arrow" },
  Longbow: { name: "Longbow", realm: "Mortal", category: "Bow", dmgType: "Physical", dice: "1D6", speed: 250, range: 10, animation: "projectile", projectileAnimation: "Arrow", projectileSpeed: 4, ammo: "Bronze Arrow" },
  "Eldwood Shortbow": { name: "Eldwood Shortbow", realm: "Mortal", category: "Bow", dmgType: "Physical", dice: "1D4 + 2", speed: 150, range: 6, animation: "projectile", projectileAnimation: "Arrow", projectileSpeed: 4, ammo: "Bronze Arrow", statBuffs: { FOCUS: 1 } }
};

let monsterTemplates = [
  { name: "Giant Rat", realm: "Mortal", type: "Beast", foodchain: "Prey", alignment: "Neutral", radius: 11, gold: "0", stats: { HP: 4, ATK: 1, DEF: 0, SPD: 1, AGL: 0, FOCUS: 2, BLOCK: 2, RESIST: 0, REGEN: 0 }, weapon: { name: "Rat Claw" } },
  { name: "Wolf", realm: "Mortal", type: "Beast", foodchain: "Predator", alignment: "Neutral", aggressive: true, radius: 17, gold: "0", stats: { HP: 7, ATK: 3, DEF: 0, SPD: 3, AGL: 0, FOCUS: 2, BLOCK: 5, RESIST: 0, REGEN: 1 }, weapon: { name: "Bite" } },
  { name: "Goblin", realm: "Mortal", type: "Humanoid", alignment: "Evil", radius: 13, gold: "1D5", stats: { HP: 5, ATK: 1, DEF: 0.5, SPD: 2, AGL: 0, FOCUS: 2, BLOCK: 2, RESIST: 0, REGEN: 1 }, weapon: { name: "Rusty Dagger" } },
  { name: "Guard", realm: "Mortal", type: "Humanoid", alignment: "Good", radius: 14, gold: "4D4", stats: { HP: 6, ATK: 2, DEF: 10, SPD: 2, AGL: 0, FOCUS: 10, BLOCK: 10, RESIST: 0, REGEN: 1 }, weapon: { name: "Bronze Shortsword" } },
  { name: "Imp", realm: "Infernal", type: "Demon", alignment: "Evil", radius: 13, gold: "1D5", stats: { HP: 5, ATK: 1, DEF: 0, SPD: 2, AGL: 0, FOCUS: 2, BLOCK: 2, RESIST: 1, REGEN: 1 }, weapon: { name: "Ebony Wand" } },
  { name: "Brownie Scout", realm: "Sylvan", type: "Faerie", alignment: "Good", radius: 12, gold: "1D5", stats: { HP: 3, ATK: 1, DEF: 0, SPD: 2, AGL: 0, FOCUS: 2, BLOCK: 2, RESIST: 1, REGEN: 1 }, weapon: { name: "Rusty Dagger" }, spells: ["Tangle Vine"] },
  { name: "Pixie", realm: "Sylvan", type: "Faerie", alignment: "Good", radius: 10, flying: true, gold: "1D5", stats: { HP: 3, ATK: 1, DEF: 0, SPD: 3, AGL: 0, FOCUS: 2, BLOCK: 2, RESIST: 1, REGEN: 1 }, weapon: { name: "Ivory Wand" }, spells: ["Faerie Dust"] },
  { name: "Plague Rat", realm: "Mortal", type: "Beast", foodchain: "Prey", alignment: "Neutral", aggressive: true, radius: 11, gold: "0", stats: { HP: 3, ATK: 2, DEF: 0, SPD: 1, AGL: 0, FOCUS: 2, BLOCK: 2, RESIST: 0, REGEN: 1 }, weapon: { name: "Bite" }, spells: ["Poison"] },
  { name: "Goblin Thug", realm: "Mortal", type: "Humanoid", alignment: "Evil", radius: 15, gold: "1D5", stats: { HP: 5, ATK: 2, DEF: 1, SPD: 2, AGL: 0, FOCUS: 2, BLOCK: 5, RESIST: 0, REGEN: 1 }, weapon: { name: "Bronze Dagger" } },
  { name: "Goblin Shaman", realm: "Mortal", type: "Humanoid", alignment: "Evil", radius: 14, gold: "1D5", stats: { HP: 5, ATK: 2, DEF: 0.5, SPD: 2, AGL: 0, FOCUS: 2, BLOCK: 2, RESIST: 1, REGEN: 1 }, weapon: { name: "Bone Staff" }, spells: ["Magic Missile"] },
  { name: "Bog Witch", realm: "Umbral", type: "Humanoid", alignment: "Evil", aggressive: true, radius: 14, gold: "2D5", stats: { HP: 5, ATK: 2, DEF: 0.5, SPD: 3, AGL: 0, FOCUS: 2, BLOCK: 2, RESIST: 1, REGEN: 1 }, weapon: { name: "Willow Branch" }, spells: ["Curse of Disdain"] },
  { name: "Plague Wolf", realm: "Mortal", type: "Beast", foodchain: "Predator", alignment: "Neutral", aggressive: true, radius: 17, gold: "0", stats: { HP: 7, ATK: 3, DEF: 0, SPD: 3, AGL: 0, FOCUS: 2, BLOCK: 5, RESIST: 0, REGEN: 1 }, weapon: { name: "Bite" }, spells: ["Poison"] },
  { name: "Will-o-Wisp", realm: "Ethereal", type: "Entity", alignment: "Neutral", radius: 12, flying: true, incorporeal: true, gold: "0", stats: { HP: 5, ATK: 2, DEF: 0, SPD: 2, AGL: 0, FOCUS: 2, BLOCK: 2, RESIST: 0, REGEN: 1 }, weapon: { name: "Spark" } },
  { name: "Skeleton", realm: "Umbral", type: "Revenant", alignment: "Evil", radius: 13, gold: "2D5", stats: { HP: 4, ATK: 2, DEF: 1, SPD: 1, AGL: 0, FOCUS: 2, BLOCK: 5, RESIST: 0, REGEN: 1 }, weapon: { name: "Bronze Shortsword" } },
  { name: "Diarrhea Monster", realm: "Mortal", type: "Entity", alignment: "Neutral", aggressive: true, radius: 15, gold: "2D5", stats: { HP: 6, ATK: 2, DEF: 0, SPD: 2, AGL: 0, FOCUS: 2, BLOCK: 5, RESIST: 0, REGEN: 1 }, weapon: { name: "Fetid Splash" } }
];

let monsterByName = new Map(monsterTemplates.map(template => [template.name, template]));
let serverSpellConfigs = {};
const DEFAULT_SERVER_FACTIONS = [
  { id: "ratkin", name: "Ratkin", enemyFactionIds: [] },
  { id: "gandersguard", name: "Gandersguard", enemyFactionIds: ["fenguard", "goblin", "froglin"] },
  { id: "fenguard", name: "Fenguard", enemyFactionIds: ["gandersguard"] },
  { id: "goblin", name: "Goblin", enemyFactionIds: ["gandersguard"] },
  { id: "froglin", name: "Froglin", enemyFactionIds: ["gandersguard"] }
];
let serverFactionConfigs = [];
let serverFactionById = new Map();
let areaSpawnTables = {
  "The Ganderswood": [{ name: "Giant Rat", frequency: 100 }, { name: "Goblin", frequency: 50 }, { name: "Wolf", frequency: 20 }, { name: "Brownie Scout", frequency: 15 }, { name: "Pixie", frequency: 15 }, { name: "Imp", frequency: 10 }],
  "Ganderswood Fen": [{ name: "Plague Rat", frequency: 100 }, { name: "Goblin Thug", frequency: 50 }, { name: "Imp", frequency: 30 }, { name: "Will-o-Wisp", frequency: 20 }, { name: "Goblin Shaman", frequency: 15 }, { name: "Bog Witch", frequency: 15 }, { name: "Plague Wolf", frequency: 10 }, { name: "Skeleton", frequency: 30 }, { name: "Diarrhea Monster", frequency: 1 }],
  "Rat Den": [{ name: "Giant Rat", frequency: 100 }, { name: "Plague Rat", frequency: 50 }],
  "Ratzkhan": [{ name: "Giant Rat", frequency: 100 }, { name: "Plague Rat", frequency: 85 }, { name: "Vampire Bat", frequency: 25 }],
  "Diarrh Realm": [{ name: "Diarrhea Monster", frequency: 100 }, { name: "Plague Rat", frequency: 45 }, { name: "Vampire Bat", frequency: 20 }],
  "Ganderswood Glade": [{ name: "Giant Rat", frequency: 100 }, { name: "Goblin", frequency: 50 }, { name: "Wolf", frequency: 20 }, { name: "Brownie Scout", frequency: 15 }, { name: "Pixie", frequency: 15 }, { name: "Imp", frequency: 10 }],
  "Grimswood Pass": [{ name: "Skeleton", frequency: 100 }, { name: "Imp", frequency: 50 }, { name: "Plague Wolf", frequency: 30 }]
};

let areaLevelRanges = {
  "The Ganderswood": { min: 1, max: 3 },
  "Rat Den": { min: 3, max: 5 },
  "Ratzkhan": { min: 5, max: 8 },
  "Diarrh Realm": { min: 8, max: 10 },
  "Ganderswood Glade": { min: 5, max: 6 },
  "Ganderswood Fen": { min: 6, max: 7 },
  "Grimswood Pass": { min: 7, max: 8 }
};
let areaSpawnRates = {};
let areaSpawnAmounts = {};

let monsterLootTables = {
  "Giant Rat": [{ name: "Rat Pelt", chance: 0.5 }],
  "Plague Rat": [{ name: "Rat Pelt", chance: 0.5 }],
  Wolf: [{ name: "Wolf Pelt", chance: 0.5 }],
  "Brownie Scout": [{ name: "Magic Mushroom", chance: 0.02 }, { name: "Ivory Wand", chance: 0.02 }],
  Pixie: [{ name: "Magic Mushroom", chance: 0.02 }, { name: "Ivory Wand", chance: 0.02 }],
  Imp: [{ name: "Bloody Emblem", chance: 0.02 }, { name: "Ebony Wand", chance: 0.02 }],
  Snapdragon: [{ name: "Snapdragon Frond", chance: 1 }],
  Guard: [
    { name: "Bronze Chainmail Vest", chance: 0.05 },
    { name: "Bronze Spangenhelm", chance: 0.05 },
    { name: "Chainmail Pants", chance: 0.05 },
    { name: "Chainmail Gloves", chance: 0.05 },
    { name: "Bronze Chainmail Pauldrons", chance: 0.05 },
    { name: "Bronze Chainmail Boots", chance: 0.05 },
    { name: "Iron Shield", chance: 0.05 }
  ],
  "Goblin Shaman": [{ name: "Bone Staff", chance: 0.02 }],
  "Bog Witch": []
};

const gameDataFile = path.join(root, "game.js");
const itemDataFile = path.join(root, "data", "items.js");
const monsterDataFile = path.join(root, "data", "monsters.js");
const worldDataFile = path.join(root, "data", "world.js");
let gameDataMtimeMs = 0;
let itemDataMtimeMs = 0;
let monsterDataMtimeMs = 0;
let worldDataMtimeMs = 0;

function findConstBlock(source, name) {
  const declaration = `const ${name} =`;
  const declarationIndex = source.indexOf(declaration);
  if (declarationIndex === -1) return null;
  const equalsIndex = source.indexOf("=", declarationIndex);
  let valueStart = equalsIndex + 1;
  while (/\s/.test(source[valueStart])) valueStart += 1;
  const open = source[valueStart];
  const close = open === "[" ? "]" : "}";
  let depth = 0;
  let quote = "";
  let escaped = false;
  for (let index = valueStart; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = "";
      continue;
    }
    if (char === "\"" || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char === open) depth += 1;
    if (char === close) {
      depth -= 1;
      if (depth === 0) return source.slice(valueStart, index + 1);
    }
  }
  return null;
}

function constContext(source) {
  const context = {};
  for (const match of source.matchAll(/^const\s+([A-Z0-9_]+)\s*=\s*(".*?");/gm)) {
    context[match[1]] = JSON.parse(match[2]);
  }
  return context;
}

function parseJsValue(valueText, context = {}) {
  return require("vm").runInNewContext(`(${valueText})`, Object.freeze({ ...context }), { timeout: 1000 });
}

function loadSharedGameData(force = false) {
  try {
    const stat = fs.statSync(gameDataFile);
    const itemStat = fs.statSync(itemDataFile);
    const monsterStat = fs.statSync(monsterDataFile);
    const worldStat = fs.statSync(worldDataFile);
    if (!force
      && stat.mtimeMs === gameDataMtimeMs
      && itemStat.mtimeMs === itemDataMtimeMs
      && monsterStat.mtimeMs === monsterDataMtimeMs
      && worldStat.mtimeMs === worldDataMtimeMs) return false;
    const source = fs.readFileSync(gameDataFile, "utf8");
    const itemSource = fs.readFileSync(itemDataFile, "utf8");
    const monsterSource = fs.readFileSync(monsterDataFile, "utf8");
    const worldSource = fs.readFileSync(worldDataFile, "utf8");
    const context = constContext(source);
    const parsedWeaponTemplates = parseJsValue(findConstBlock(itemSource, "weaponTemplates"), context);
    const parsedMonsterTemplates = parseJsValue(findConstBlock(monsterSource, "monsterTemplates"), context);
    const parsedFenMonsterTemplates = parseJsValue(findConstBlock(monsterSource, "fenMonsterTemplates"), context);
    const parsedAreaSpawnTables = parseJsValue(findConstBlock(worldSource, "areaSpawnTables"), context);
    const parsedDevAreaConfigs = parseJsValue(findConstBlock(worldSource, "devAreaConfigs"), context);
    const devDungeonBlock = findConstBlock(worldSource, "devDungeonConfigs");
    const parsedDevDungeonConfigs = devDungeonBlock ? parseJsValue(devDungeonBlock, context) : [];
    const devSpellBlock = findConstBlock(worldSource, "devSpellConfigs");
    const parsedDevSpellConfigs = devSpellBlock ? parseJsValue(devSpellBlock, context) : {};
    const devFactionBlock = findConstBlock(worldSource, "devFactionConfigs");
    const parsedDevFactionConfigs = devFactionBlock ? parseJsValue(devFactionBlock, context) : [];
    const parsedMonsterLootTables = parseJsValue(findConstBlock(monsterSource, "monsterLootTables"), context);

    weaponTemplates = normalizeRealmData(parsedWeaponTemplates);
    monsterTemplates = normalizeRealmData([...parsedMonsterTemplates, ...parsedFenMonsterTemplates]);
    monsterByName = new Map(monsterTemplates.map(template => [template.name, template]));
    serverSpellConfigs = normalizeRealmData(parsedDevSpellConfigs || {});
    serverFactionConfigs = normalizeServerFactionConfigs((parsedDevFactionConfigs || []).length ? parsedDevFactionConfigs : DEFAULT_SERVER_FACTIONS);
    serverFactionById = new Map(serverFactionConfigs.map(faction => [faction.id, faction]));
    areaSpawnTables = normalizeRealmData(parsedAreaSpawnTables);
    for (const dungeon of parsedDevDungeonConfigs || []) {
      if (dungeon?.name && Array.isArray(dungeon.spawnTable)) areaSpawnTables[dungeon.name] = normalizeRealmData(dungeon.spawnTable);
    }
    areaLevelRanges = {
      ...areaLevelRanges,
      ...Object.fromEntries(Object.entries(parsedDevAreaConfigs || {})
        .filter(([, config]) => config?.levelRange)
        .map(([name, config]) => {
          const min = Math.max(1, Math.floor(Number(config.levelRange.min) || 1));
          const max = Math.max(min, Math.floor(Number(config.levelRange.max) || min));
          return [name, { min, max }];
        }))
    };
    areaSpawnRates = Object.fromEntries(Object.entries(parsedDevAreaConfigs || {})
      .filter(([, config]) => config?.spawnRate)
      .map(([name, config]) => [name, String(config.spawnRate)]));
    areaSpawnAmounts = Object.fromEntries(Object.entries(parsedDevAreaConfigs || {})
      .filter(([, config]) => config?.spawnAmount)
      .map(([name, config]) => [name, String(config.spawnAmount)]));
    for (const dungeon of parsedDevDungeonConfigs || []) {
      if (!dungeon?.name) continue;
      if (dungeon.spawnRate) areaSpawnRates[dungeon.name] = String(dungeon.spawnRate);
      if (dungeon.spawnAmount) areaSpawnAmounts[dungeon.name] = String(dungeon.spawnAmount);
    }
    monsterLootTables = normalizeRealmData(parsedMonsterLootTables);
    gameDataMtimeMs = stat.mtimeMs;
    itemDataMtimeMs = itemStat.mtimeMs;
    monsterDataMtimeMs = monsterStat.mtimeMs;
    worldDataMtimeMs = worldStat.mtimeMs;
    console.log(`Loaded shared game data: ${monsterTemplates.length} units, ${Object.keys(areaSpawnTables).length} spawn tables.`);
    return true;
  } catch (error) {
    console.warn(`Could not load shared game data from game.js: ${error.message}`);
    return false;
  }
}

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg"
};

function safeFilePath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]);
  const requested = cleanPath === "/" ? "/index.html" : cleanPath;
  const resolved = path.resolve(root, `.${requested}`);
  return resolved.startsWith(root) ? resolved : null;
}

function sendJson(res, status, body, headers = {}) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...headers
  });
  res.end(JSON.stringify(body, null, 2));
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 200000) {
        reject(new Error("Request too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function ensureAccountStoreLoaded() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(ACCOUNT_STORE_FILE)) {
      saveAccountStore();
      return;
    }
    const parsed = JSON.parse(fs.readFileSync(ACCOUNT_STORE_FILE, "utf8"));
    accountStore.accounts = Array.isArray(parsed.accounts) ? parsed.accounts : [];
    accountStore.characters = Array.isArray(parsed.characters) ? parsed.characters : [];
    accountStore.sessions = Array.isArray(parsed.sessions) ? parsed.sessions : [];
  } catch (error) {
    console.warn(`Could not load account store: ${error.message}`);
  }
}

function accountRecordFromDb(row) {
  return {
    id: row.id,
    username: row.username,
    passwordSalt: row.password_salt,
    passwordHash: row.password_hash,
    createdAt: Number(row.created_at) || Date.now(),
    updatedAt: Number(row.updated_at) || Date.now()
  };
}

function characterRecordFromDb(row) {
  return {
    id: row.id,
    accountId: row.account_id,
    name: row.name,
    race: row.race || "human",
    sex: row.sex || "male",
    avatar: row.avatar || "",
    level: Number(row.level) || 1,
    lastArea: row.last_area || "",
    lastWorld: row.last_world || "",
    lastX: Number(row.last_x) || 0,
    lastY: Number(row.last_y) || 0,
    save: row.save_json && typeof row.save_json === "object" ? normalizeRealmData(row.save_json) : {},
    deletedAt: row.deleted_at ? Number(row.deleted_at) : undefined,
    createdAt: Number(row.created_at) || Date.now(),
    updatedAt: Number(row.updated_at) || Date.now()
  };
}

function sessionRecordFromDb(row) {
  return {
    tokenHash: row.token_hash,
    accountId: row.account_id,
    createdAt: Number(row.created_at) || Date.now(),
    expiresAt: Number(row.expires_at) || 0
  };
}

async function initializePostgresAccountStore() {
  let pg;
  try {
    pg = require("pg");
  } catch (error) {
    throw new Error(`DATABASE_URL is set, but the pg package is not installed: ${error.message}`);
  }
  postgresPool = new pg.Pool({
    connectionString: DATABASE_URL,
    ssl: DATABASE_URL.includes("sslmode=require") || process.env.PGSSLMODE === "require"
      ? { rejectUnauthorized: false }
      : undefined
  });
  await postgresPool.query(`
    CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password_salt TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      created_at BIGINT NOT NULL,
      updated_at BIGINT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS characters (
      id TEXT PRIMARY KEY,
      account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      race TEXT NOT NULL DEFAULT 'human',
      sex TEXT NOT NULL DEFAULT 'male',
      avatar TEXT NOT NULL DEFAULT '',
      level INTEGER NOT NULL DEFAULT 1,
      last_area TEXT NOT NULL DEFAULT '',
      last_world TEXT NOT NULL DEFAULT '',
      last_x DOUBLE PRECISION NOT NULL DEFAULT 0,
      last_y DOUBLE PRECISION NOT NULL DEFAULT 0,
      save_json JSONB NOT NULL DEFAULT '{}'::jsonb,
      deleted_at BIGINT,
      created_at BIGINT NOT NULL,
      updated_at BIGINT NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS characters_name_unique_active
      ON characters (lower(name))
      WHERE deleted_at IS NULL;
    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY,
      account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
      created_at BIGINT NOT NULL,
      expires_at BIGINT NOT NULL
    );
  `);
  const now = Date.now();
  await postgresPool.query("DELETE FROM sessions WHERE expires_at <= $1", [now]);
  const [accounts, characters, sessions] = await Promise.all([
    postgresPool.query("SELECT * FROM accounts ORDER BY created_at ASC"),
    postgresPool.query("SELECT * FROM characters ORDER BY updated_at DESC"),
    postgresPool.query("SELECT * FROM sessions WHERE expires_at > $1", [now])
  ]);
  accountStore.accounts = accounts.rows.map(accountRecordFromDb);
  accountStore.characters = characters.rows.map(characterRecordFromDb);
  accountStore.sessions = sessions.rows.map(sessionRecordFromDb);
}

async function flushAccountStoreToPostgres() {
  if (!postgresPool) return;
  const client = await postgresPool.connect();
  try {
    await client.query("BEGIN");
    for (const account of accountStore.accounts) {
      await client.query(`
        INSERT INTO accounts (id, username, password_salt, password_hash, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (id) DO UPDATE SET
          username = EXCLUDED.username,
          password_salt = EXCLUDED.password_salt,
          password_hash = EXCLUDED.password_hash,
          updated_at = EXCLUDED.updated_at
      `, [account.id, account.username, account.passwordSalt, account.passwordHash, Number(account.createdAt) || Date.now(), Number(account.updatedAt) || Date.now()]);
    }
    for (const character of accountStore.characters) {
      await client.query(`
        INSERT INTO characters (
          id, account_id, name, race, sex, avatar, level, last_area, last_world,
          last_x, last_y, save_json, deleted_at, created_at, updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12::jsonb, $13, $14, $15)
        ON CONFLICT (id) DO UPDATE SET
          account_id = EXCLUDED.account_id,
          name = EXCLUDED.name,
          race = EXCLUDED.race,
          sex = EXCLUDED.sex,
          avatar = EXCLUDED.avatar,
          level = EXCLUDED.level,
          last_area = EXCLUDED.last_area,
          last_world = EXCLUDED.last_world,
          last_x = EXCLUDED.last_x,
          last_y = EXCLUDED.last_y,
          save_json = EXCLUDED.save_json,
          deleted_at = EXCLUDED.deleted_at,
          updated_at = EXCLUDED.updated_at
      `, [
        character.id,
        character.accountId,
        character.name,
        character.race || "human",
        character.sex || "male",
        character.avatar || "",
        Number(character.level) || 1,
        String(character.lastArea || "").slice(0, 80),
        String(character.lastWorld || "").slice(0, 32),
        Number(character.lastX) || 0,
        Number(character.lastY) || 0,
        JSON.stringify(character.save && typeof character.save === "object" ? character.save : {}),
        character.deletedAt ? Number(character.deletedAt) : null,
        Number(character.createdAt) || Date.now(),
        Number(character.updatedAt) || Date.now()
      ]);
    }
    await client.query("DELETE FROM sessions");
    for (const session of accountStore.sessions.filter(session => Number(session.expiresAt) > Date.now())) {
      await client.query(`
        INSERT INTO sessions (token_hash, account_id, created_at, expires_at)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (token_hash) DO UPDATE SET
          account_id = EXCLUDED.account_id,
          expires_at = EXCLUDED.expires_at
      `, [session.tokenHash, session.accountId, Number(session.createdAt) || Date.now(), Number(session.expiresAt) || 0]);
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function initializeAccountStore() {
  if (USE_POSTGRES_ACCOUNT_STORE) {
    await initializePostgresAccountStore();
    console.log(`Loaded account store from Postgres: ${accountStore.accounts.length} accounts, ${accountStore.characters.length} characters.`);
    return;
  }
  ensureAccountStoreLoaded();
}

function saveAccountStore() {
  if (accountStoreSaveTimer) {
    clearTimeout(accountStoreSaveTimer);
    accountStoreSaveTimer = null;
  }
  if (USE_POSTGRES_ACCOUNT_STORE) {
    flushAccountStoreToPostgres().catch(error => console.warn(`Could not save Postgres account store: ${error.message}`));
    return;
  }
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(ACCOUNT_STORE_FILE, JSON.stringify(accountStore, null, 2));
  } catch (error) {
    console.warn(`Could not save account store: ${error.message}`);
  }
}

function scheduleAccountStoreSave() {
  if (accountStoreSaveTimer) return;
  accountStoreSaveTimer = setTimeout(() => {
    accountStoreSaveTimer = null;
    saveAccountStore();
  }, 1200);
}

function randomToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString("base64url");
}

function hashToken(token) {
  return crypto.createHash("sha256").update(String(token || "")).digest("hex");
}

function hashPassword(password, salt = randomToken(16)) {
  const hash = crypto.scryptSync(String(password || ""), salt, 64).toString("base64");
  return { salt, hash };
}

function verifyPassword(password, account) {
  if (!account?.passwordHash || !account?.passwordSalt) return false;
  const { hash } = hashPassword(password, account.passwordSalt);
  const a = Buffer.from(hash);
  const b = Buffer.from(account.passwordHash);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function parseCookies(req) {
  return Object.fromEntries(String(req.headers.cookie || "")
    .split(";")
    .map(part => part.trim())
    .filter(Boolean)
    .map(part => {
      const index = part.indexOf("=");
      return index < 0 ? [part, ""] : [decodeURIComponent(part.slice(0, index)), decodeURIComponent(part.slice(index + 1))];
    }));
}

function sessionCookie(token, maxAgeSeconds = SESSION_DAYS * 24 * 60 * 60) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${SESSION_COOKIE}=${encodeURIComponent(token || "")}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}${secure}`;
}

function normalizeUsername(username) {
  return String(username || "").trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "").slice(0, 24);
}

function normalizeCharacterName(name) {
  const raw = String(name || "").trim();
  if (!/^[A-Za-z]+$/.test(raw)) return "";
  const lower = raw.toLowerCase();
  return `${lower.charAt(0).toUpperCase()}${lower.slice(1)}`.slice(0, 24);
}

function characterNameError(name) {
  const normalized = normalizeCharacterName(name);
  if (!normalized) return "Names may only contain letters, with no spaces, numbers, or symbols.";
  const lower = normalized.toLowerCase();
  if (PROFANE_NAME_PARTS.some(part => lower.includes(part))) return "That name is not allowed.";
  if (accountStore.characters.some(character => !character.deletedAt && String(character.name || "").toLowerCase() === lower)) return "A character with that name already exists.";
  return "";
}

function accountBySessionToken(token) {
  const tokenHash = hashToken(token);
  const now = Date.now();
  const before = accountStore.sessions.length;
  accountStore.sessions = accountStore.sessions.filter(session => Number(session.expiresAt) > now);
  if (accountStore.sessions.length !== before) saveAccountStore();
  const session = accountStore.sessions.find(candidate => candidate.tokenHash === tokenHash);
  return session ? accountStore.accounts.find(account => account.id === session.accountId) || null : null;
}

function authenticatedAccount(req) {
  const token = parseCookies(req)[SESSION_COOKIE];
  return token ? accountBySessionToken(token) : null;
}

function publicCharacter(character) {
  const save = character.save && typeof character.save === "object" ? character.save : {};
  const worldActive = Boolean(character.lastWorld && worlds.has(character.lastWorld));
  const equippedItems = save.equippedItems && typeof save.equippedItems === "object" ? save.equippedItems : {};
  const equipment = save.equipment && typeof save.equipment === "object" ? save.equipment : {};
  return {
    id: character.id,
    name: character.name,
    avatar: character.avatar || save.avatar || "soulreaperMale",
    race: character.race || (String(character.avatar || save.avatar || "").includes("dwarf") ? "dwarf" : "human"),
    sex: character.sex || (String(character.avatar || save.avatar || "").toLowerCase().includes("female") ? "female" : "male"),
    level: Number(character.level || save.level) || 1,
    area: character.lastArea || save.area || "Unknown",
    world: worldActive ? character.lastWorld : "",
    lastArea: character.lastArea || save.area || "Unknown",
    lastWorld: worldActive ? character.lastWorld : "",
    worldActive,
    equippedItems,
    equipment,
    updatedAt: character.updatedAt || character.createdAt || 0
  };
}

function publicAccount(account) {
  return {
    username: account.username,
    characters: accountStore.characters
      .filter(character => character.accountId === account.id && !character.deletedAt)
      .map(publicCharacter)
      .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
  };
}

function activeWorldSummaries() {
  return [...worlds.values()]
    .map(world => ({
      name: world.name,
      playerCount: [...players.values()].filter(player => player.world === world.name).length
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function characterForAccount(account, characterId) {
  return accountStore.characters.find(character => account && character.accountId === account.id && character.id === characterId && !character.deletedAt) || null;
}

function avatarForRaceSex(race, sex) {
  if (race === "dwarf") return sex === "female" ? "dwarfFemale" : "dwarfMale";
  return sex === "female" ? "soulreaperFemale" : "soulreaperMale";
}

async function handleApiRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathName = url.pathname;
  if (req.method === "GET" && pathName === "/api/account/me") {
    const account = authenticatedAccount(req);
    return sendJson(res, 200, { ok: true, account: account ? publicAccount(account) : null, worlds: activeWorldSummaries() });
  }
  if (req.method === "GET" && pathName === "/api/worlds") {
    return sendJson(res, 200, { ok: true, worlds: activeWorldSummaries() });
  }
  let body = {};
  if (req.method !== "GET") {
    try {
      body = JSON.parse(await readRequestBody(req) || "{}");
    } catch {
      return sendJson(res, 400, { ok: false, message: "Invalid request." });
    }
  }
  if (req.method === "POST" && pathName === "/api/account/create") {
    const username = normalizeUsername(body.username);
    const password = String(body.password || "");
    const repeatPassword = String(body.repeatPassword || "");
    if (username.length < 3) return sendJson(res, 400, { ok: false, message: "Username must be at least 3 characters." });
    if (password.length < 8 || password.length > 128) return sendJson(res, 400, { ok: false, message: "Password must be 8 to 128 characters." });
    if (password !== repeatPassword) return sendJson(res, 400, { ok: false, message: "Passwords do not match." });
    if (accountStore.accounts.some(account => account.username === username)) return sendJson(res, 409, { ok: false, message: "That username is already taken." });
    const { salt, hash } = hashPassword(password);
    const account = { id: crypto.randomUUID(), username, passwordSalt: salt, passwordHash: hash, createdAt: Date.now(), updatedAt: Date.now() };
    accountStore.accounts.push(account);
    const token = randomToken();
    accountStore.sessions.push({ tokenHash: hashToken(token), accountId: account.id, createdAt: Date.now(), expiresAt: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000 });
    saveAccountStore();
    return sendJson(res, 200, { ok: true, account: publicAccount(account), worlds: activeWorldSummaries() }, { "Set-Cookie": sessionCookie(token) });
  }
  if (req.method === "POST" && pathName === "/api/account/login") {
    const account = accountStore.accounts.find(candidate => candidate.username === normalizeUsername(body.username));
    if (!account || !verifyPassword(body.password || "", account)) return sendJson(res, 401, { ok: false, message: "Invalid username or password." });
    const token = randomToken();
    accountStore.sessions.push({ tokenHash: hashToken(token), accountId: account.id, createdAt: Date.now(), expiresAt: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000 });
    saveAccountStore();
    return sendJson(res, 200, { ok: true, account: publicAccount(account), worlds: activeWorldSummaries() }, { "Set-Cookie": sessionCookie(token) });
  }
  if (req.method === "POST" && pathName === "/api/account/logout") {
    const token = parseCookies(req)[SESSION_COOKIE];
    if (token) accountStore.sessions = accountStore.sessions.filter(session => session.tokenHash !== hashToken(token));
    saveAccountStore();
    return sendJson(res, 200, { ok: true }, { "Set-Cookie": sessionCookie("", 0) });
  }
  const account = authenticatedAccount(req);
  if (!account) return sendJson(res, 401, { ok: false, message: "Login required." });
  if (req.method === "POST" && pathName === "/api/characters") {
    const existing = accountStore.characters.filter(character => character.accountId === account.id && !character.deletedAt);
    if (existing.length >= MAX_CHARACTERS_PER_ACCOUNT) return sendJson(res, 400, { ok: false, message: "You already have 6 characters." });
    const nameError = characterNameError(body.name);
    if (nameError) return sendJson(res, 400, { ok: false, message: nameError });
    const race = String(body.race || "human").toLowerCase() === "dwarf" ? "dwarf" : "human";
    const sex = String(body.sex || "male").toLowerCase() === "female" ? "female" : "male";
    const name = normalizeCharacterName(body.name);
    const nameKey = name.toLowerCase();
    if (accountStore.characters.some(character => !character.deletedAt && String(character.name || "").toLowerCase() === nameKey)) {
      return sendJson(res, 409, { ok: false, message: "That character name is already taken." });
    }
    const avatar = avatarForRaceSex(race, sex);
    const startingEquipment = {
      "Main Hand": "Empty",
      "Off-Hand": "Empty",
      Head: "Empty",
      Chest: "Linen Shirt",
      Legs: "Linen Pants",
      Shoulders: "Empty",
      Hands: "Empty",
      Feet: "Empty",
      Neck: "Empty",
      "Right Finger": "Empty",
      "Left Finger": "Empty",
      "Right Wrist": "Empty",
      "Left Wrist": "Empty",
      "Right Ear": "Empty",
      "Left Ear": "Empty"
    };
    const character = {
      id: crypto.randomUUID(),
      accountId: account.id,
      name,
      race,
      sex,
      avatar,
      level: 1,
      lastArea: "",
      lastWorld: "",
      save: {
        name,
        avatar,
        level: 1,
        equipment: startingEquipment,
        equippedItems: {
          Chest: { name: "Linen Shirt" },
          Legs: { name: "Linen Pants" }
        }
      },
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    accountStore.characters.push(character);
    saveAccountStore();
    return sendJson(res, 200, { ok: true, account: publicAccount(account), character: publicCharacter(character), worlds: activeWorldSummaries() });
  }
  const deleteMatch = pathName.match(/^\/api\/characters\/([^/]+)$/);
  if (req.method === "DELETE" && deleteMatch) {
    const character = characterForAccount(account, deleteMatch[1]);
    if (!character) return sendJson(res, 404, { ok: false, message: "Character not found." });
    character.deletedAt = Date.now();
    character.updatedAt = Date.now();
    saveAccountStore();
    return sendJson(res, 200, { ok: true, account: publicAccount(account), worlds: activeWorldSummaries() });
  }
  return sendJson(res, 404, { ok: false, message: "Not found." });
}

function serveFile(req, res) {
  if (req.url.split("?")[0] === "/healthz") {
    sendJson(res, 200, {
      ok: true,
      server: "Soulreaper multiplayer server",
      accountStore: USE_POSTGRES_ACCOUNT_STORE ? "postgres" : "json",
      players: players.size,
      worlds: worlds.size
    });
    return;
  }
  if (req.url.split("?")[0].startsWith("/api/")) {
    handleApiRequest(req, res).catch(error => sendJson(res, 500, { ok: false, message: error.message || "Server error." }));
    return;
  }
  if (req.url.split("?")[0] === "/multiplayer-status") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({
      ok: true,
      server: "Soulreaper multiplayer server",
      players: players.size,
      sockets: sockets.size,
      worlds: [...worlds.values()].map(world => ({
        name: world.name,
        players: [...players.values()]
          .filter(player => player.world === world.name)
          .map(player => ({
            id: player.id,
            name: player.name,
            hp: player.hp,
            area: player.area,
            inferredArea: playerAreaFromPosition(world, player) || null
          })),
        hostId: world.hostId || null,
        revision: world.revision || 0,
        hasState: Boolean(world.state),
        hasCollision: Boolean(world.state?.collision),
        enemies: Array.isArray(world.state?.enemies) ? world.state.enemies.length : 0,
        ambientEnemies: ambientEnemyCount(world),
        groundItems: Array.isArray(world.state?.groundItems) ? world.state.groundItems.length : 0,
        lastTickError: world.lastTickError || null
      }))
    }, null, 2));
    return;
  }
  const filePath = safeFilePath(req.url);
  if (!filePath) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(error.code === "ENOENT" ? 404 : 500);
      res.end(error.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }
    res.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(data);
  });
}

function wsAccept(key) {
  return crypto
    .createHash("sha1")
    .update(`${key}258EAFA5-E914-47DA-95CA-C5AB0DC85B11`)
    .digest("base64");
}

function encodeFrame(payload) {
  const data = Buffer.from(JSON.stringify(payload));
  if (data.length < 126) return Buffer.concat([Buffer.from([0x81, data.length]), data]);
  if (data.length < 65536) {
    const header = Buffer.alloc(4);
    header[0] = 0x81;
    header[1] = 126;
    header.writeUInt16BE(data.length, 2);
    return Buffer.concat([header, data]);
  }
  const header = Buffer.alloc(10);
  header[0] = 0x81;
  header[1] = 127;
  header.writeBigUInt64BE(BigInt(data.length), 2);
  return Buffer.concat([header, data]);
}

function decodeFrames(socket, chunk) {
  socket.buffer = Buffer.concat([socket.buffer || Buffer.alloc(0), chunk]);
  const messages = [];
  while (socket.buffer.length >= 2) {
    const first = socket.buffer[0];
    const second = socket.buffer[1];
    const fin = Boolean(first & 0x80);
    const opcode = first & 0x0f;
    const masked = Boolean(second & 0x80);
    let length = second & 0x7f;
    let offset = 2;
    if (length === 126) {
      if (socket.buffer.length < offset + 2) break;
      length = socket.buffer.readUInt16BE(offset);
      offset += 2;
    } else if (length === 127) {
      if (socket.buffer.length < offset + 8) break;
      length = Number(socket.buffer.readBigUInt64BE(offset));
      offset += 8;
    }
    const maskOffset = offset;
    if (masked) offset += 4;
    if (socket.buffer.length < offset + length) break;
    const payload = Buffer.from(socket.buffer.subarray(offset, offset + length));
    if (masked) {
      const mask = socket.buffer.subarray(maskOffset, maskOffset + 4);
      for (let i = 0; i < payload.length; i += 1) payload[i] ^= mask[i % 4];
    }
    socket.buffer = socket.buffer.subarray(offset + length);
    if (opcode === 0x8) {
      socket.end();
      break;
    }
    if (opcode === 0x9 || opcode === 0xa) continue;
    if (opcode === 0x1) {
      if (fin) {
        messages.push(payload.toString("utf8"));
      } else {
        socket.fragmentedMessage = [payload];
        socket.fragmentedOpcode = opcode;
      }
      continue;
    }
    if (opcode === 0x0) {
      if (!socket.fragmentedMessage) continue;
      socket.fragmentedMessage.push(payload);
      if (fin) {
        const wholePayload = Buffer.concat(socket.fragmentedMessage);
        const originalOpcode = socket.fragmentedOpcode;
        socket.fragmentedMessage = null;
        socket.fragmentedOpcode = null;
        if (originalOpcode === 0x1) messages.push(wholePayload.toString("utf8"));
      }
    }
  }
  return messages;
}

function send(socket, payload) {
  if (!socket.destroyed) socket.write(encodeFrame(payload));
}

function broadcast(payload, exceptId = null) {
  for (const [id, state] of sockets) {
    if (id !== exceptId) send(state.socket, payload);
  }
}

function broadcastToWorld(worldName, payload, exceptId = null) {
  for (const [id, state] of sockets) {
    if (id !== exceptId && state.world === worldName) send(state.socket, payload);
  }
}

function playerList(worldName) {
  return [...players.values()].filter(player => player.world === worldName);
}

function playerByName(worldName, name) {
  const wanted = String(name || "").trim().toLowerCase();
  if (!wanted) return null;
  return playerList(worldName).find(player => String(player.name || "").toLowerCase() === wanted) || null;
}

function chatPayloadForPlayer(fromId, text, channel) {
  const player = players.get(fromId);
  return {
    type: "chat",
    id: fromId,
    name: player?.name || "Soulreaper",
    text: String(text || "").trim().slice(0, 200),
    channel,
    area: player?.area || "The Black Wilds"
  };
}

function sendChannelChat(fromId, channel, text) {
  const state = sockets.get(fromId);
  const from = players.get(fromId);
  if (!state?.world || !from) return;
  const clean = String(text || "").trim().slice(0, 200);
  if (!clean) return;
  const normalizedChannel = ["say", "shout", "team", "world", "general"].includes(channel) ? channel : "say";
  const payload = chatPayloadForPlayer(fromId, clean, normalizedChannel);
  if (normalizedChannel === "general") {
    broadcast(payload, fromId);
    return;
  }
  if (normalizedChannel === "team") {
    const team = teamForPlayer(fromId);
    if (!team) {
      send(state.socket, { type: "chat:error", message: "You are not in a team." });
      return;
    }
    for (const memberId of team.members || []) {
      if (memberId === fromId) continue;
      const memberSocket = sockets.get(memberId)?.socket;
      if (memberSocket) send(memberSocket, payload);
    }
    return;
  }
  if (normalizedChannel === "shout") {
    for (const [id, socketState] of sockets) {
      if (id === fromId || socketState.world !== state.world) continue;
      const player = players.get(id);
      if (player?.area === from.area) send(socketState.socket, payload);
    }
    return;
  }
  if (normalizedChannel === "world") {
    broadcastToWorld(state.world, payload, fromId);
    return;
  }
  const sayRange = 320;
  for (const [id, socketState] of sockets) {
    if (id === fromId || socketState.world !== state.world) continue;
    const player = players.get(id);
    if (!player || player.area !== from.area) continue;
    if (Math.hypot((player.x || 0) - (from.x || 0), (player.y || 0) - (from.y || 0)) <= sayRange) {
      send(socketState.socket, payload);
    }
  }
}

function playerSummaryList(worldName) {
  return playerList(worldName)
    .map(player => ({
      id: player.id,
      name: player.name || "Soulreaper",
      level: Number(player.level) || 1,
      area: player.area || "Unknown",
      afk: Boolean(player.afk),
      lfg: Boolean(player.lfg)
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function sendPrivateTell(worldName, fromId, targetName, text) {
  const from = players.get(fromId);
  const target = playerByName(worldName, targetName);
  const fromSocket = sockets.get(fromId)?.socket;
  if (!from || !fromSocket) return false;
  const clean = String(text || "").trim().slice(0, 160);
  if (!clean) {
    send(fromSocket, { type: "tell:error", message: "Use /tell [name] [message]." });
    return true;
  }
  if (!target) {
    send(fromSocket, { type: "tell:error", message: `Could not find player \"${String(targetName || "").slice(0, 24)}\" in this world.` });
    return true;
  }
  send(fromSocket, { type: "tell", direction: "to", targetId: target.id, name: target.name || "Soulreaper", text: clean });
  const targetSocket = sockets.get(target.id)?.socket;
  if (targetSocket) send(targetSocket, { type: "tell", direction: "from", fromId, name: from.name || "Soulreaper", text: clean });
  return true;
}

function teamForPlayer(playerId) {
  if (!playerId) return null;
  for (const team of teams.values()) {
    if (team.members.includes(playerId)) return team;
  }
  return null;
}

function teamMemberIdsForPlayer(playerId) {
  if (!playerId) return [];
  const team = teamForPlayer(playerId);
  return team ? [...team.members] : [playerId];
}

function publicTeamState(team) {
  if (!team) return null;
  return {
    id: team.id,
    leaderId: team.leaderId,
    members: team.members
      .map(memberId => players.get(memberId))
      .filter(Boolean)
      .map(player => ({
        id: player.id,
        name: player.name || "Soulreaper",
        level: Number(player.level) || 1,
        hp: Number(player.hp) || 0,
        maxHp: Number(player.maxHp) || 0,
        area: player.area || "The Black Wilds"
      }))
  };
}

function sendTeamState(team) {
  if (!team) return;
  const payload = { type: "team:update", team: publicTeamState(team) };
  for (const memberId of team.members) {
    const socket = sockets.get(memberId)?.socket;
    if (socket) send(socket, payload);
  }
}

function clearTeamForPlayer(playerId) {
  const socket = sockets.get(playerId)?.socket;
  if (socket) send(socket, { type: "team:update", team: null });
}

function promoteTeamLeader(team) {
  team.leaderId = team.members.find(memberId => players.has(memberId) && sockets.has(memberId)) || team.members[0] || null;
}

function disbandTeam(team) {
  if (!team) return;
  teams.delete(team.id);
  for (const memberId of team.members) clearTeamForPlayer(memberId);
}

function itemQuantity(item) {
  return item?.stackable ? Math.max(1, Math.floor(Number(item.quantity) || 1)) : 1;
}

function sameStack(item, other) {
  return Boolean(item?.stackable && other?.stackable && item.name === other.name);
}

function cloneTradeItem(item) {
  if (!item || typeof item !== "object") return null;
  try {
    const json = JSON.stringify(item);
    if (json.length > 8000) return null;
    return normalizeRealmData(JSON.parse(json));
  } catch {
    return null;
  }
}

function cloneTradeSave(save, fallbackName = "Soulreaper") {
  if (!save || typeof save !== "object") return null;
  try {
    const json = JSON.stringify(save);
    if (json.length > 120000) return null;
    const clone = normalizeRealmData(JSON.parse(json));
    clone.name = String(clone.name || fallbackName || "Soulreaper").slice(0, 24);
    clone.inventory = Array.isArray(clone.inventory) ? clone.inventory : Array(12).fill(null);
    clone.gold = Math.max(0, Math.floor(Number(clone.gold) || 0));
    return clone;
  } catch {
    return null;
  }
}

function tradeForPlayer(playerId) {
  for (const trade of trades.values()) {
    if (trade.players.includes(playerId)) return trade;
  }
  return null;
}

function publicTradeState(trade, viewerId = "") {
  const [a, b] = trade.players;
  const offerA = trade.offers[a] || { slots: [], gold: 0, items: [], accepted: false };
  const offerB = trade.offers[b] || { slots: [], gold: 0, items: [], accepted: false };
  return {
    id: trade.id,
    players: trade.players.map(playerId => {
      const player = players.get(playerId);
      return { id: playerId, name: player?.name || "Soulreaper", level: Number(player?.level) || 1 };
    }),
    offers: {
      [a]: { gold: offerA.gold || 0, items: offerA.items || [], accepted: Boolean(offerA.accepted) },
      [b]: { gold: offerB.gold || 0, items: offerB.items || [], accepted: Boolean(offerB.accepted) }
    },
    viewerId
  };
}

function sendTradeState(trade) {
  if (!trade) return;
  for (const playerId of trade.players) {
    const socket = sockets.get(playerId)?.socket;
    if (socket) send(socket, { type: "trade:update", trade: publicTradeState(trade, playerId) });
  }
}

function sendTradeNotice(playerId, type, message, extra = {}) {
  const socket = sockets.get(playerId)?.socket;
  if (socket) send(socket, { type, message, ...extra });
}

function broadcastPlayerBuffEffect(worldName, target, sourceName, statMod = null, extra = {}) {
  if (!worldName || !target?.id) return;
  broadcastToWorld(worldName, {
    type: "player:buff-effect",
    targetPlayerId: target.id,
    targetName: target.name || "Soulreaper",
    x: target.x || 0,
    y: target.y || 0,
    radius: target.radius || 18,
    sourceName: String(sourceName || statMod?.name || "Buff").slice(0, 80),
    statMod,
    ...extra
  }, target.id);
}

function normalizeTradeOffer(message) {
  const seen = new Set();
  const slots = (Array.isArray(message.slots) ? message.slots : [])
    .map(slot => Math.floor(Number(slot)))
    .filter(slot => Number.isInteger(slot) && slot >= 0 && slot < 12 && !seen.has(slot) && (seen.add(slot), true))
    .slice(0, 12);
  const itemMap = new Map();
  for (const entry of Array.isArray(message.items) ? message.items : []) {
    const slot = Math.floor(Number(entry?.slot));
    if (!slots.includes(slot)) continue;
    const item = cloneTradeItem(entry?.item);
    if (item) itemMap.set(slot, { slot, item });
  }
  return {
    slots,
    gold: Math.max(0, Math.floor(Number(message.gold) || 0)),
    items: slots.map(slot => itemMap.get(slot)).filter(Boolean),
    accepted: Boolean(message.accepted)
  };
}

function tradeInventorySlotMatches(save, entry) {
  const slot = Math.floor(Number(entry?.slot));
  const current = save?.inventory?.[slot] || null;
  const offered = entry?.item || null;
  if (!current || !offered) return false;
  return current.name === offered.name && itemQuantity(current) >= itemQuantity(offered);
}

function removeTradeItems(save, offer) {
  const removedItems = [];
  for (const entry of offer.items || []) {
    const slot = Math.floor(Number(entry.slot));
    const current = save.inventory?.[slot] || null;
    if (!current) return false;
    const removed = cloneTradeItem(current);
    if (!removed) return false;
    if (removed.stackable) removed.quantity = itemQuantity(entry.item);
    removedItems.push(removed);
    if (current.stackable && itemQuantity(current) > itemQuantity(entry.item)) {
      current.quantity = itemQuantity(current) - itemQuantity(entry.item);
    } else {
      save.inventory[slot] = null;
    }
  }
  return removedItems;
}

function addTradeItems(save, items) {
  save.inventory = Array.isArray(save.inventory) ? save.inventory : Array(12).fill(null);
  for (const source of items) {
    const item = cloneTradeItem(source);
    if (!item) return false;
    let remaining = itemQuantity(item);
    if (item.stackable) {
      for (const stack of save.inventory) {
        if (!sameStack(stack, item)) continue;
        const max = Number(stack.maxStack || item.maxStack || 20) || 20;
        const room = Math.max(0, max - itemQuantity(stack));
        if (!room) continue;
        const moved = Math.min(room, remaining);
        stack.quantity = itemQuantity(stack) + moved;
        remaining -= moved;
        if (remaining <= 0) break;
      }
    }
    while (remaining > 0) {
      const slot = save.inventory.findIndex(candidate => !candidate);
      if (slot < 0) return false;
      const moved = item.stackable ? Math.min(Number(item.maxStack || 20) || 20, remaining) : 1;
      const copy = cloneTradeItem(item);
      if (copy.stackable) copy.quantity = moved;
      save.inventory[slot] = copy;
      remaining -= moved;
    }
  }
  return true;
}

function completeTrade(worldName, trade) {
  const [a, b] = trade.players;
  const offerA = trade.offers[a];
  const offerB = trade.offers[b];
  const playerA = players.get(a);
  const playerB = players.get(b);
  if (!playerA || !playerB || !offerA?.accepted || !offerB?.accepted) return false;
  const saveA = cloneTradeSave(characterSaveFor(worldName, playerA.name), playerA.name);
  const saveB = cloneTradeSave(characterSaveFor(worldName, playerB.name), playerB.name);
  if (!saveA || !saveB) return false;
  if (saveA.gold < offerA.gold || saveB.gold < offerB.gold) return false;
  if (!(offerA.items || []).every(entry => tradeInventorySlotMatches(saveA, entry))) return false;
  if (!(offerB.items || []).every(entry => tradeInventorySlotMatches(saveB, entry))) return false;
  const removedA = removeTradeItems(saveA, offerA);
  const removedB = removeTradeItems(saveB, offerB);
  if (!removedA || !removedB) return false;
  if (!addTradeItems(saveA, removedB)) return false;
  if (!addTradeItems(saveB, removedA)) return false;
  saveA.gold = saveA.gold - offerA.gold + offerB.gold;
  saveB.gold = saveB.gold - offerB.gold + offerA.gold;
  characterSaves.set(characterSaveKey(worldName, saveA.name || playerA.name), normalizeRealmData(saveA));
  characterSaves.set(characterSaveKey(worldName, saveB.name || playerB.name), normalizeRealmData(saveB));
  sendTradeNotice(a, "trade:complete", "Trade complete.", { character: saveA });
  sendTradeNotice(b, "trade:complete", "Trade complete.", { character: saveB });
  trades.delete(trade.id);
  return true;
}

function cancelTrade(trade, message = "Trade canceled.") {
  if (!trade) return;
  trades.delete(trade.id);
  for (const playerId of trade.players) sendTradeNotice(playerId, "trade:canceled", message);
}

function handleTradeCommand(worldName, playerId, message) {
  const player = players.get(playerId);
  if (!player) return false;
  const action = String(message.tradeAction || "").toLowerCase();
  if (action === "request") {
    if (tradeForPlayer(playerId)) {
      sendTradeNotice(playerId, "trade:error", "Finish your current trade first.");
      return true;
    }
    const target = playerByName(worldName, message.playerName);
    if (!target || target.id === playerId) {
      sendTradeNotice(playerId, "trade:error", "That player is not available to trade.");
      return true;
    }
    if (tradeForPlayer(target.id)) {
      sendTradeNotice(playerId, "trade:error", `${target.name || "That player"} is already trading.`);
      return true;
    }
    const id = `trade-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const trade = {
      id,
      players: [playerId, target.id],
      offers: {
        [playerId]: { slots: [], gold: 0, items: [], accepted: false },
        [target.id]: { slots: [], gold: 0, items: [], accepted: false }
      },
      createdAt: Date.now()
    };
    trades.set(id, trade);
    sendTradeState(trade);
    return true;
  }
  const trade = tradeForPlayer(playerId);
  if (!trade) {
    sendTradeNotice(playerId, "trade:error", "You are not in a trade.");
    return true;
  }
  if (action === "cancel" || action === "reject") {
    cancelTrade(trade, action === "reject" ? "Trade rejected." : "Trade canceled.");
    return true;
  }
  if (action === "offer") {
    trade.offers[playerId] = normalizeTradeOffer(message);
    if (!trade.offers[playerId].accepted) {
      for (const otherId of trade.players) if (otherId !== playerId && trade.offers[otherId]) trade.offers[otherId].accepted = false;
    }
    sendTradeState(trade);
    if (trade.players.every(id => trade.offers[id]?.accepted)) {
      if (!completeTrade(worldName, trade)) cancelTrade(trade, "Trade failed. Items, gold, or inventory space changed.");
    }
    return true;
  }
  return false;
}

function removePlayerFromTeam(playerId, notify = true) {
  const team = teamForPlayer(playerId);
  if (!team) return null;
  team.members = team.members.filter(memberId => memberId !== playerId);
  if (notify) clearTeamForPlayer(playerId);
  if (team.members.length <= 1) {
    disbandTeam(team);
    return null;
  }
  if (team.leaderId === playerId || !team.members.includes(team.leaderId)) promoteTeamLeader(team);
  sendTeamState(team);
  return team;
}

function teamInviteKey(inviterId, inviteeId) {
  return `${inviterId}:${inviteeId}`;
}

function createTeamFor(inviterId, inviteeId) {
  const existingInviteeTeam = teamForPlayer(inviteeId);
  if (existingInviteeTeam) removePlayerFromTeam(inviteeId, true);
  let team = teamForPlayer(inviterId);
  if (!team) {
    team = {
      id: `team-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      leaderId: inviterId,
      members: [inviterId],
      createdAt: Date.now()
    };
    teams.set(team.id, team);
  }
  if (!team.members.includes(inviteeId)) team.members.push(inviteeId);
  sendTeamState(team);
  return team;
}

function handleTeamCommand(worldName, playerId, message) {
  const player = players.get(playerId);
  const socket = sockets.get(playerId)?.socket;
  if (!player || !socket) return false;
  const action = String(message.teamAction || message.action || "").toLowerCase();
  if (action === "invite") {
    const team = teamForPlayer(playerId);
    if (team && team.leaderId !== playerId) {
      send(socket, { type: "team:error", message: "Only the Team Leader can invite players." });
      return true;
    }
    const target = playerByName(worldName, message.playerName);
    if (!target || target.id === playerId) {
      send(socket, { type: "team:error", message: "Could not find that player." });
      return true;
    }
    if (teamForPlayer(target.id)) {
      send(socket, { type: "team:error", message: `${target.name} is already in a Team.` });
      return true;
    }
    pendingTeamInvites.set(teamInviteKey(playerId, target.id), { inviterId: playerId, inviteeId: target.id, world: worldName, createdAt: Date.now() });
    const targetSocket = sockets.get(target.id)?.socket;
    if (targetSocket) send(targetSocket, { type: "team:invite", inviterId: playerId, inviterName: player.name || "Soulreaper" });
    send(socket, { type: "team:notice", message: `Invited ${target.name} to join your Team.` });
    return true;
  }
  if (action === "accept") {
    const inviterId = String(message.inviterId || "");
    const invite = pendingTeamInvites.get(teamInviteKey(inviterId, playerId));
    if (!invite || invite.world !== worldName || Date.now() - invite.createdAt > 120000) {
      send(socket, { type: "team:error", message: "That Team invite is no longer available." });
      return true;
    }
    const inviter = players.get(inviterId);
    if (!inviter || inviter.world !== worldName) {
      pendingTeamInvites.delete(teamInviteKey(inviterId, playerId));
      send(socket, { type: "team:error", message: "That Team invite is no longer available." });
      return true;
    }
    pendingTeamInvites.delete(teamInviteKey(inviterId, playerId));
    createTeamFor(inviterId, playerId);
    return true;
  }
  if (action === "reject") {
    const inviterId = String(message.inviterId || "");
    pendingTeamInvites.delete(teamInviteKey(inviterId, playerId));
    const inviterSocket = sockets.get(inviterId)?.socket;
    if (inviterSocket) send(inviterSocket, { type: "team:notice", message: `${player.name || "Soulreaper"} rejected your Team invite.` });
    return true;
  }
  if (action === "leave") {
    removePlayerFromTeam(playerId, true);
    return true;
  }
  if (action === "remove") {
    const team = teamForPlayer(playerId);
    if (!team || team.leaderId !== playerId) {
      send(socket, { type: "team:error", message: "Only the Team Leader can remove players." });
      return true;
    }
    const target = playerByName(worldName, message.playerName);
    if (!target || !team.members.includes(target.id) || target.id === playerId) {
      send(socket, { type: "team:error", message: "That player is not in your Team." });
      return true;
    }
    removePlayerFromTeam(target.id, true);
    return true;
  }
  if (action === "makeleader") {
    const team = teamForPlayer(playerId);
    if (!team || team.leaderId !== playerId) {
      send(socket, { type: "team:error", message: "Only the Team Leader can choose a new Leader." });
      return true;
    }
    const target = playerByName(worldName, message.playerName);
    if (!target || !team.members.includes(target.id)) {
      send(socket, { type: "team:error", message: "That player is not in your Team." });
      return true;
    }
    team.leaderId = target.id;
    sendTeamState(team);
    return true;
  }
  return false;
}

function socketIdsInWorld(worldName) {
  return [...sockets.entries()]
    .filter(([, state]) => state.world === worldName)
    .map(([id]) => id);
}

function normalizeWorldName(name) {
  return String(name || "").trim().replace(/\s+/g, " ").slice(0, 32);
}

function characterSaveKey(worldName, characterName) {
  return `${normalizeWorldName(worldName).toLowerCase()}::${String(characterName || "Soulreaper").trim().toLowerCase().slice(0, 24)}`;
}

function sanitizeCharacterSave(message) {
  const save = message?.character;
  if (!save || typeof save !== "object") return null;
  try {
    const json = JSON.stringify(save);
    if (json.length > 120000) return null;
    const clone = JSON.parse(json);
    clone.name = String(clone.name || message.name || "Soulreaper").slice(0, 24);
    clone.gold = Math.max(0, Math.floor(Number(clone.gold) || 0));
    clone.level = Math.max(1, Math.floor(Number(clone.level) || 1));
    clone.x = Number(clone.x) || Number(message.x) || 0;
    clone.y = Number(clone.y) || Number(message.y) || 0;
    clone.savedAt = Date.now();
    return normalizeRealmData(clone);
  } catch {
    return null;
  }
}

function saveCharacterForPlayer(worldName, message, account = null, characterId = "") {
  const save = sanitizeCharacterSave(message);
  if (!save?.name) return;
  if (account && characterId) {
    const character = characterForAccount(account, characterId);
    if (!character) return;
    character.save = save;
    character.name = save.name || character.name;
    character.avatar = save.avatar || character.avatar;
    character.level = Number(save.level) || character.level || 1;
    character.lastArea = String(message.area || save.area || character.lastArea || "").slice(0, 80);
    character.lastWorld = normalizeWorldName(worldName);
    character.lastX = Number(save.x) || Number(message.x) || 0;
    character.lastY = Number(save.y) || Number(message.y) || 0;
    character.updatedAt = Date.now();
    scheduleAccountStoreSave();
    return;
  }
  characterSaves.set(characterSaveKey(worldName, save.name), save);
}

function characterSaveFor(worldName, name) {
  return characterSaves.get(characterSaveKey(worldName, name)) || null;
}

function worldSeed(name) {
  return crypto.createHash("sha256").update(`${name}:${Date.now()}:${Math.random()}`).digest("hex").slice(0, 16);
}

function pruneWorld(worldName) {
  if (!worldName) return;
  if (socketIdsInWorld(worldName).length) return;
  worlds.delete(worldName);
}

function ensureWorldHost(worldName) {
  const world = worlds.get(worldName);
  if (!world) return null;
  const worldSocketIds = socketIdsInWorld(worldName);
  if (world.hostId && worldSocketIds.includes(world.hostId)) return world.hostId;
  world.hostId = worldSocketIds[0] || null;
  if (world.hostId) broadcastToWorld(worldName, { type: "world:host", hostId: world.hostId });
  return world.hostId;
}

function sanitizePlayer(id, message) {
  const state = sockets.get(id);
  return normalizeRealmData({
    id,
    world: state?.world || "",
    name: String(message.name || "Soulreaper").slice(0, 24),
    avatar: String(message.avatar || "soulreaperMale").slice(0, 40),
    x: Number(message.x) || 0,
    y: Number(message.y) || 0,
    dx: Number(message.dx) || 0,
    dy: Number(message.dy) || 0,
    hp: Number(message.hp) || 0,
    maxHp: Number(message.maxHp) || 0,
    level: Number(message.level) || 1,
    radius: Number(message.radius) || 18,
    stats: typeof message.stats === "object" && message.stats ? message.stats : {},
    weapon: typeof message.weapon === "object" && message.weapon ? message.weapon : null,
    equippedItems: message.equippedItems && typeof message.equippedItems === "object"
      ? Object.fromEntries(Object.entries(message.equippedItems).slice(0, 24).map(([slot, item]) => [
        String(slot || "").slice(0, 32),
        item && typeof item === "object" ? {
          ...item,
          name: String(item.name || "").slice(0, 100)
        } : null
      ]).filter(([, item]) => item?.name))
      : {},
    equipmentVisuals: Array.isArray(message.equipmentVisuals)
      ? message.equipmentVisuals.slice(0, 20).map(layer => ({
        slot: String(layer?.slot || "").slice(0, 24),
        name: String(layer?.name || "").slice(0, 80),
        weapon: Boolean(layer?.weapon),
        shield: Boolean(layer?.shield),
        heldAvatarItem: Boolean(layer?.heldAvatarItem),
        graphicSize: Math.max(8, Math.min(96, Number(layer?.graphicSize) || 30)),
        maleAvatarSprite: String(layer?.maleAvatarSprite || "").slice(0, 180),
        femaleAvatarSprite: String(layer?.femaleAvatarSprite || "").slice(0, 180),
        dwarfMaleAvatarSprite: String(layer?.dwarfMaleAvatarSprite || "").slice(0, 180),
        dwarfFemaleAvatarSprite: String(layer?.dwarfFemaleAvatarSprite || "").slice(0, 180),
        avatarSprite: String(layer?.avatarSprite || "").slice(0, 180),
        avatarSpriteTint: String(layer?.avatarSpriteTint || "").slice(0, 16),
        avatarSpriteChannels: typeof layer?.avatarSpriteChannels === "object" && layer.avatarSpriteChannels ? layer.avatarSpriteChannels : {}
      }))
      : [],
    statMods: Array.isArray(message.statMods) ? message.statMods : [],
    activeSpells: Array.isArray(message.activeSpells) ? message.activeSpells : [],
    area: String(message.area || "The Black Wilds").slice(0, 80),
    alignment: String(message.alignment || "Neutral").slice(0, 12),
    factionStandings: message.factionStandings && typeof message.factionStandings === "object" ? message.factionStandings : {},
    speech: String(message.speech || "").slice(0, 160),
    afk: Boolean(message.afk),
    lfg: Boolean(message.lfg),
    updatedAt: Date.now()
  });
}

function playerAreaFromPosition(world, player) {
  if (!world?.state || !player) return "";
  const area = serverAreaAt(world, player.x, player.y);
  return area && area !== true ? String(area.name || "") : "";
}

function normalizedPlayerForWorld(world, player) {
  if (!player) return player;
  const inferredArea = playerAreaFromPosition(world, player);
  if (inferredArea && inferredArea !== player.area) {
    player.area = inferredArea;
  }
  return player;
}

function publicEnemyState(enemy) {
  if (!enemy || typeof enemy !== "object") return enemy;
  const publicEnemy = {
    id: enemy.id,
    name: enemy.name,
    templateName: enemy.templateName || enemy.name,
    lvl: enemy.lvl,
    realm: enemy.realm,
    alignment: enemy.alignment,
    faction: unitFactionId(enemy),
    aggressive: enemy.aggressive,
    type: enemy.type,
    foodchain: enemy.foodchain,
    incorporeal: enemy.incorporeal,
    flying: enemy.flying,
    elite: enemy.elite,
    boss: enemy.boss,
    spawnSource: enemy.spawnSource,
    respawnKey: enemy.respawnKey,
    noWander: enemy.noWander,
    noLoot: enemy.noLoot,
    pet: enemy.pet,
    masterId: enemy.masterId,
    masterName: enemy.masterName,
    petCommand: enemy.petCommand,
    petTargetId: enemy.petTargetId,
    petDuration: enemy.petDuration,
    petTimeRemaining: enemy.petTimeRemaining,
    guardX: enemy.guardX,
    guardY: enemy.guardY,
    friendlyToGoodPlayer: enemy.friendlyToGoodPlayer,
    friendlyToNonEvilPlayer: enemy.friendlyToNonEvilPlayer,
    shopkeeper: enemy.shopkeeper,
    banker: enemy.banker,
    trainer: enemy.trainer,
    questGiver: enemy.questGiver,
    aggroRange: enemy.aggroRange,
    x: enemy.x,
    y: enemy.y,
    facingX: enemy.facingX,
    area: enemy.area,
    homeX: enemy.homeX,
    homeY: enemy.homeY,
    leashX: enemy.leashX,
    leashY: enemy.leashY,
    leashRadius: enemy.leashRadius,
    triggerX: enemy.triggerX,
    triggerY: enemy.triggerY,
    radius: enemy.radius,
    hp: enemy.hp,
    maxHp: enemy.maxHp,
    attackTimer: enemy.attackTimer,
    regenTimer: enemy.regenTimer,
    pacified: enemy.pacified,
    rooted: enemy.rooted,
    rootVisual: enemy.rootVisual,
    stunned: enemy.stunned,
    mortified: enemy.mortified,
    mortifySourceX: enemy.mortifySourceX,
    mortifySourceY: enemy.mortifySourceY,
    hostileToPlayer: enemy.hostileToPlayer,
    hostileToPlayerReason: enemy.hostileToPlayerReason,
    targetPlayerId: enemy.targetPlayerId,
    hostileTargetId: enemy.hostileTargetId,
    plagueHostilePlayerIds: enemy.plagueHostilePlayerIds,
    wanderTimer: enemy.wanderTimer,
    wanderAngle: enemy.wanderAngle,
    leashState: enemy.leashState,
    statMods: enemy.statMods,
    dots: enemy.dots
  };
  if (enemy.shopkeeper) {
    publicEnemy.inventory = enemy.inventory;
    publicEnemy.consumables = enemy.consumables;
    publicEnemy.misc = enemy.misc;
    publicEnemy.scrolls = enemy.scrolls;
  }
  return publicEnemy;
}

function publicWorldState(state) {
  if (!state || typeof state !== "object") return state;
  return {
    enemies: Array.isArray(state.enemies) ? state.enemies.map(publicEnemyState) : [],
    projectiles: state.projectiles || [],
    effects: state.effects || [],
    groundItems: state.groundItems || [],
    eliteRespawns: state.eliteRespawns || [],
    resourceRespawns: state.resourceRespawns || []
  };
}

function mergeAuthoritativeWorldState(previousState, incomingState) {
  if (!incomingState || typeof incomingState !== "object") return incomingState;
  const previousDrops = Array.isArray(previousState?.groundItems) ? previousState.groundItems : [];
  const incomingDrops = Array.isArray(incomingState.groundItems) ? incomingState.groundItems : [];
  if (previousDrops.length) {
    const incomingIds = new Set(incomingDrops.map(drop => drop?.id).filter(Boolean));
    for (const drop of previousDrops) {
      if (!drop?.serverOwned) continue;
      if (!drop?.id || incomingIds.has(drop.id)) continue;
      incomingDrops.push(drop);
      incomingIds.add(drop.id);
    }
  }
  incomingState.groundItems = incomingDrops;
  const previousPets = new Map((previousState?.enemies || [])
    .filter(enemy => enemy?.id && enemy.pet && enemy.masterId)
    .map(enemy => [enemy.id, enemy]));
  if (previousPets.size && Array.isArray(incomingState.enemies)) {
    for (const enemy of incomingState.enemies) {
      const previousPet = previousPets.get(enemy?.id);
      if (!previousPet || enemy.pet) continue;
      Object.assign(enemy, {
        pet: true,
        masterId: previousPet.masterId,
        masterName: previousPet.masterName,
        petCommand: previousPet.petCommand || "follow",
        petTargetId: previousPet.petTargetId || null,
        petDuration: previousPet.petDuration,
        petTimeRemaining: previousPet.petTimeRemaining,
        noLoot: true,
        hostileToPlayer: false,
        hostileTarget: null,
        hostileToPlayerReason: null,
        targetPlayerId: null,
        hostileTargetId: null,
        leashState: "idle"
      });
      delete enemy.triggerX;
      delete enemy.triggerY;
    }
  }
  return incomingState;
}

function worldStatePayload(world, sourceId = "server") {
  return { type: "world:state", state: publicWorldState(world.state), hostId: world.hostId, revision: world.revision || 0, sourceId };
}

function acceptWorldRevision(world) {
  world.revision = (world.revision || 0) + 1;
  return world.revision;
}

function distance(a, b) {
  return Math.hypot((a.x || 0) - (b.x || 0), (a.y || 0) - (b.y || 0));
}

function rectCollidesCircle(rect, x, y, radius = 0) {
  const dx = Math.max((rect.x || 0) - x, 0, x - ((rect.x || 0) + (rect.w || 0)));
  const dy = Math.max((rect.y || 0) - y, 0, y - ((rect.y || 0) + (rect.h || 0)));
  return Math.hypot(dx, dy) <= radius;
}

function pointInBoundary(x, y, boundary = []) {
  let inside = false;
  for (let i = 0, j = boundary.length - 1; i < boundary.length; j = i, i += 1) {
    const xi = boundary[i].x;
    const yi = boundary[i].y;
    const xj = boundary[j].x;
    const yj = boundary[j].y;
    const intersects = ((yi > y) !== (yj > y))
      && x < ((xj - xi) * (y - yi)) / ((yj - yi) || 0.0001) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
}

function pointInPassage(x, y, passage) {
  const dx = (passage.x2 || 0) - (passage.x1 || 0);
  const dy = (passage.y2 || 0) - (passage.y1 || 0);
  const lengthSq = dx * dx + dy * dy || 1;
  const t = Math.max(0, Math.min(1, ((x - (passage.x1 || 0)) * dx + (y - (passage.y1 || 0)) * dy) / lengthSq));
  const px = (passage.x1 || 0) + dx * t;
  const py = (passage.y1 || 0) + dy * t;
  return Math.hypot(x - px, y - py) <= (passage.width || 0) / 2;
}

function serverAreaAt(world, x, y) {
  const collision = world.state?.collision;
  if (!collision) return true;
  for (let i = (collision.areas || []).length - 1; i >= 0; i -= 1) {
    const area = collision.areas[i];
    const bounds = area.bounds;
    if (bounds && (x < bounds.minX || x > bounds.maxX || y < bounds.minY || y > bounds.maxY)) continue;
    if (pointInBoundary(x, y, area.boundary || [])) return {
      ...area,
      name: area.metadata?.areaName || area.areaName || area.name
    };
  }
  for (const passage of collision.passages || []) {
    const bounds = passage.bounds;
    if (bounds && (x < bounds.minX || x > bounds.maxX || y < bounds.minY || y > bounds.maxY)) continue;
    if (pointInPassage(x, y, passage)) return { name: passage.metadata?.areaName || passage.areaName || "Passage" };
  }
  return null;
}

function serverCollidingObstacle(world, x, y, radius = 0) {
  const collision = world.state?.collision;
  if (!collision) return false;
  for (const house of collision.houses || []) {
    if ((house.blocks || []).some(block => rectCollidesCircle(block, x, y, radius))) return true;
  }
  for (const obstacle of collision.obstacles || []) {
    if (obstacle.kind === "city-building") {
      const dx = Math.max(Math.abs(x - (obstacle.x || 0)) - (obstacle.w || 0) / 2, 0);
      const dy = Math.max(Math.abs(y - (obstacle.y || 0)) - (obstacle.h || 0) / 2, 0);
      if (Math.hypot(dx, dy) <= radius) return true;
      continue;
    }
    if (obstacle.kind === "whisperspring-entrance") {
      if ((obstacle.blockRects || []).some(rect => rectCollidesCircle({
        x: (obstacle.x || 0) + (rect.x || 0),
        y: (obstacle.y || 0) + (rect.y || 0),
        w: rect.w || 0,
        h: rect.h || 0
      }, x, y, radius))) return true;
      continue;
    }
    if ((obstacle.blockRects || []).length) {
      if (obstacle.blockRects.some(rect => rectCollidesCircle({
        x: (obstacle.x || 0) + (rect.x || 0),
        y: (obstacle.y || 0) + (rect.y || 0),
        w: rect.w || 0,
        h: rect.h || 0
      }, x, y, radius))) return true;
      continue;
    }
    if (Math.hypot(x - (obstacle.x || 0), y - (obstacle.y || 0)) < (obstacle.radius || 0) + radius) return true;
  }
  return false;
}

function serverWalkable(world, x, y, radius = 0) {
  return Boolean(serverAreaAt(world, x, y)) && !serverCollidingObstacle(world, x, y, radius);
}

function serverEnemySeparationScore(world, enemy, x = enemy?.x || 0, y = enemy?.y || 0) {
  let score = 0;
  const radius = Math.max(18, enemy?.radius || 14);
  const avoidRange = radius + 34;
  for (const other of world?.state?.enemies || []) {
    if (!other || other === enemy || other.hp <= 0) continue;
    const d = Math.max(1, Math.hypot(x - (other.x || 0), y - (other.y || 0)));
    const desired = Math.max(avoidRange, radius + (other.radius || 14) + 12);
    if (d >= desired) continue;
    const overlap = desired - d;
    score += overlap * overlap;
  }
  return score;
}

function serverEnemySpawnSeparated(world, x, y, radius = 14) {
  for (const other of world?.state?.enemies || []) {
    if (!other || other.hp <= 0) continue;
    if (Math.hypot(x - (other.x || 0), y - (other.y || 0)) < radius + (other.radius || 14) + 28) return false;
  }
  return true;
}

function segmentIntersectsRect(x1, y1, x2, y2, rect, padding = 0) {
  const left = (rect.x || 0) - padding;
  const right = (rect.x || 0) + (rect.w || 0) + padding;
  const top = (rect.y || 0) - padding;
  const bottom = (rect.y || 0) + (rect.h || 0) + padding;
  if ((x1 >= left && x1 <= right && y1 >= top && y1 <= bottom)
    || (x2 >= left && x2 <= right && y2 >= top && y2 <= bottom)) return true;
  let t0 = 0;
  let t1 = 1;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const clip = (p, q) => {
    if (p === 0) return q >= 0;
    const r = q / p;
    if (p < 0) {
      if (r > t1) return false;
      if (r > t0) t0 = r;
    } else {
      if (r < t0) return false;
      if (r < t1) t1 = r;
    }
    return true;
  };
  return clip(-dx, x1 - left)
    && clip(dx, right - x1)
    && clip(-dy, y1 - top)
    && clip(dy, bottom - y1)
    && t0 <= t1;
}

function distancePointToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSq = dx * dx + dy * dy;
  if (lengthSq <= 0) return Math.hypot(px - x1, py - y1);
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lengthSq));
  return Math.hypot(px - (x1 + dx * t), py - (y1 + dy * t));
}

function projectileWeaponIsBow(weapon) {
  const category = String(weapon?.category || "").toLowerCase();
  const name = String(weapon?.name || "").toLowerCase();
  const ammo = String(weapon?.ammo || "").toLowerCase();
  const animation = String(weapon?.projectileAnimation || weapon?.animation || "").toLowerCase();
  return category === "bow" || name.includes("bow") || ammo.includes("arrow") || animation.includes("arrow");
}

function projectileHitRadius(projectile, target) {
  const bowBonus = projectileWeaponIsBow(projectile?.sourceWeapon) ? 24 : 0;
  return (projectile?.radius || 4) + (target?.radius || 18) + bowBonus;
}

function projectileIntersectsTarget(projectile, target, fromX, fromY, toX, toY) {
  if (!projectile || !target) return false;
  const hitRadius = projectileHitRadius(projectile, target);
  const targetX = target.x || 0;
  const targetY = target.y || 0;
  if (Math.hypot(targetX - toX, targetY - toY) <= hitRadius) return true;
  return distancePointToSegment(targetX, targetY, fromX, fromY, toX, toY) <= hitRadius;
}

function serverHasLineOfSight(world, source, target, padding = 2) {
  if (!source || !target) return false;
  if (source === target) return true;
  const collision = world.state?.collision;
  if (!collision) return true;
  const x1 = source.x || 0;
  const y1 = source.y || 0;
  const x2 = target.x || 0;
  const y2 = target.y || 0;
  const minX = Math.min(x1, x2);
  const maxX = Math.max(x1, x2);
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);
  for (const house of collision.houses || []) {
    if ((house.blocks || []).some(block => segmentIntersectsRect(x1, y1, x2, y2, block, padding))) return false;
  }
  for (const obstacle of collision.obstacles || []) {
    const radius = obstacle.radius || Math.max(obstacle.w || 0, obstacle.h || 0, obstacle.size || 0) / 2 || 0;
    if ((obstacle.x || 0) + radius + padding < minX || (obstacle.x || 0) - radius - padding > maxX
      || (obstacle.y || 0) + radius + padding < minY || (obstacle.y || 0) - radius - padding > maxY) continue;
    if (obstacle.kind === "city-building") {
      if (segmentIntersectsRect(x1, y1, x2, y2, {
        x: (obstacle.x || 0) - (obstacle.w || 0) / 2,
        y: (obstacle.y || 0) - (obstacle.h || 0) / 2,
        w: obstacle.w || 0,
        h: obstacle.h || 0
      }, padding)) return false;
      continue;
    }
    if (obstacle.kind === "whisperspring-entrance") {
      if ((obstacle.blockRects || []).some(rect => segmentIntersectsRect(x1, y1, x2, y2, {
        x: (obstacle.x || 0) + (rect.x || 0),
        y: (obstacle.y || 0) + (rect.y || 0),
        w: rect.w || 0,
        h: rect.h || 0
      }, padding))) return false;
      continue;
    }
    if ((obstacle.blockRects || []).length) {
      if (obstacle.blockRects.some(rect => segmentIntersectsRect(x1, y1, x2, y2, {
        x: (obstacle.x || 0) + (rect.x || 0),
        y: (obstacle.y || 0) + (rect.y || 0),
        w: rect.w || 0,
        h: rect.h || 0
      }, padding))) return false;
      continue;
    }
    if (distancePointToSegment(obstacle.x || 0, obstacle.y || 0, x1, y1, x2, y2) <= radius + padding) return false;
  }
  return true;
}

function moveServerUnit(world, unit, dx, dy) {
  if (!dx && !dy) return false;
  const beforeX = unit.x || 0;
  const nextX = (unit.x || 0) + dx;
  const nextY = (unit.y || 0) + dy;
  let moved = false;
  const isEnemyUnit = Array.isArray(world?.state?.enemies) && world.state.enemies.includes(unit);
  if (isEnemyUnit && serverSacredGroveBlocksStep(world, unit, nextX, nextY)) return false;
  if (serverWalkable(world, nextX, nextY, unit.radius || 0)) {
    unit.x = nextX;
    unit.y = nextY;
    if (Math.abs((unit.x || 0) - beforeX) >= 0.2) unit.facingX = (unit.x || 0) < beforeX ? 1 : -1;
    return true;
  }
  if ((!isEnemyUnit || !serverSacredGroveBlocksStep(world, unit, nextX, unit.y || 0)) && serverWalkable(world, nextX, unit.y || 0, unit.radius || 0)) {
    unit.x = nextX;
    moved = true;
  }
  if ((!isEnemyUnit || !serverSacredGroveBlocksStep(world, unit, unit.x || 0, nextY)) && serverWalkable(world, unit.x || 0, nextY, unit.radius || 0)) {
    unit.y = nextY;
    moved = true;
  }
  if (Math.abs((unit.x || 0) - beforeX) >= 0.2) unit.facingX = (unit.x || 0) < beforeX ? 1 : -1;
  return moved;
}

function defaultAlignmentForRealm(realm) {
  realm = normalizeRealm(realm);
  if (realm === "Celestial" || realm === "Sylvan") return "Good";
  if (realm === "Umbral" || realm === "Infernal") return "Evil";
  return "Neutral";
}

function alignmentHostileTo(attackerAlignment, defenderAlignment) {
  if (attackerAlignment === "Evil") return defenderAlignment === "Neutral" || defenderAlignment === "Good";
  if (attackerAlignment === "Good") return defenderAlignment === "Evil";
  return false;
}

function factionId(value) {
  return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function normalizeServerFactionConfigs(configs = []) {
  const byId = new Map();
  for (const config of Array.isArray(configs) ? configs : []) {
    const id = factionId(config?.id || config?.name);
    if (!id) continue;
    byId.set(id, {
      id,
      name: String(config?.name || id).trim() || id,
      enemyFactionIds: [...new Set((config?.enemyFactionIds || []).map(factionId).filter(Boolean))].filter(enemyId => enemyId !== id)
    });
  }
  for (const faction of byId.values()) faction.enemyFactionIds = faction.enemyFactionIds.filter(id => byId.has(id));
  for (const faction of byId.values()) {
    for (const enemyId of faction.enemyFactionIds) {
      const enemy = byId.get(enemyId);
      if (enemy && !enemy.enemyFactionIds.includes(faction.id)) enemy.enemyFactionIds.push(faction.id);
    }
  }
  return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function inferredFactionForUnit(unit) {
  const name = String(unit?.name || unit?.templateName || "").toLowerCase();
  if (name === "guard" || name.includes("gandersguard")) return "gandersguard";
  if (name.includes("fenguard") || name.includes("fenhold guard") || name.includes("evil guard")) return "fenguard";
  if (name.includes("goblin")) return "goblin";
  if (name.includes("froglin")) return "froglin";
  if (/\brat\b/.test(name) || name.includes("ratkin") || name.includes("ratz") || name.includes("ratzkhan") || name.includes("skaven")) return "ratkin";
  return "";
}

function unitFactionId(unit) {
  return factionId(unit?.faction || inferredFactionForUnit(unit));
}

function factionsAreEnemies(a, b) {
  const faction = serverFactionById.get(factionId(a));
  const other = factionId(b);
  return Boolean(faction && other && faction.enemyFactionIds.includes(other));
}

function factionStanding(player, faction) {
  return Number(player?.factionStandings?.[factionId(faction)] || 0);
}

function playerFactionStatus(player, faction) {
  const standing = factionStanding(player, faction);
  if (standing < -10) return "Enemy";
  if (standing > 10) return "Ally";
  return "Neutral";
}

function playerFriendlyToFaction(player, faction) {
  return playerFactionStatus(player, faction) === "Ally";
}

function playerHostileToFaction(player, faction) {
  return playerFactionStatus(player, faction) === "Enemy";
}

function unitsFactionHostile(attacker, defender) {
  const attackerFaction = unitFactionId(attacker);
  const defenderFaction = unitFactionId(defender);
  if (!attackerFaction || !defenderFaction) return null;
  if (attackerFaction === defenderFaction) return false;
  if (factionsAreEnemies(attackerFaction, defenderFaction) || factionsAreEnemies(defenderFaction, attackerFaction)) return true;
  return null;
}

function enemyAlignment(enemy) {
  if (enemy?.pet) {
    const master = petMaster(enemy);
    if (master) return master.alignment || "Neutral";
  }
  return enemy.alignment || defaultAlignmentForRealm(enemy.realm);
}

function beastFoodchain(unit) {
  return unit?.type === "Beast" ? (unit.foodchain || "Prey") : "";
}

function foodchainHostileTo(attacker, defender) {
  return beastFoodchain(attacker) === "Predator" && beastFoodchain(defender) === "Prey";
}

function neutralAggressiveThreatToMobs(attacker, defender) {
  return Boolean(attacker)
    && Boolean(defender)
    && enemyAlignment(defender) === "Neutral"
    && Boolean(defender.aggressive)
    && (enemyAlignment(attacker) === "Good" || enemyAlignment(attacker) === "Neutral");
}

function sameNonMortalRealmAggroBlocked(attacker, defender) {
  const realm = attacker?.realm || "Mortal";
  return Boolean(attacker?.aggressive)
    && realm !== "Mortal"
    && Boolean(defender?.realm)
    && defender.realm === realm;
}

const DUNGEON_AREA_NAMES = new Set(["Ratzkhan", "Diarrh Realm", "Bear Cave", "Rogabogu", "Yrgma Dim", "Whisperspring", "Wyndhelm Cathedral"]);

function areaNameIsDungeon(name) {
  const value = String(name || "");
  return DUNGEON_AREA_NAMES.has(value) || /\bDungeon\b/i.test(value);
}

function unitInServerDungeon(world, unit) {
  const namedArea = enemyAreaName(unit);
  if (areaNameIsDungeon(namedArea)) return true;
  const area = world ? serverAreaAt(world, unit?.x || 0, unit?.y || 0) : null;
  return Boolean(area?.dungeon || areaNameIsDungeon(area?.name));
}

function serverDungeonAreaNameForUnit(world, unit) {
  const area = world ? serverAreaAt(world, unit?.x || 0, unit?.y || 0) : null;
  const areaName = area && area !== true ? String(area.name || area.areaName || area.metadata?.areaName || "") : "";
  const fallbackName = players.has(unit?.id) ? String(unit?.area || "") : enemyAreaName(unit);
  const name = areaName || fallbackName;
  return areaNameIsDungeon(name) ? name : "";
}

function targetOutsideServerEnemyDungeon(world, enemy, target) {
  const enemyDungeon = serverDungeonAreaNameForUnit(world, enemy);
  if (!enemyDungeon) return false;
  return serverDungeonAreaNameForUnit(world, target) !== enemyDungeon;
}

function dungeonEvilNeutralAggroBlocked(world, attacker, defender) {
  return enemyAlignment(attacker) === "Evil"
    && enemyAlignment(defender) === "Neutral"
    && unitInServerDungeon(world, attacker);
}

function dungeonMobTargetBlocked(world, attacker, defender) {
  return Boolean(attacker)
    && !players.has(attacker.id)
    && !attacker.pet
    && Boolean(defender)
    && !players.has(defender.id)
    && unitInServerDungeon(world, attacker);
}

function activeServerSacredGroves(world) {
  return (world?.state?.effects || []).filter(effect => (
    effect?.type === "sacredGrove"
    && (Number(effect.duration) || 0) > (Number(effect.age) || 0)
  ));
}

function serverSacredGroveContains(effect, unit, padding = 0) {
  if (!effect || !unit) return false;
  return distance(effect, unit) <= (effect.radius || 0) + padding;
}

function serverSacredGroveBlocksTarget(world, enemy, target) {
  if (!enemy || !target || enemy.pet || players.has(enemy.id)) return false;
  return activeServerSacredGroves(world).some(effect => (
    serverSacredGroveContains(effect, target, target.radius || 18)
    && !serverSacredGroveContains(effect, enemy, enemy.radius || 14)
  ));
}

function serverSacredGroveBlocksPlayerTarget(world, player, target) {
  if (!player || !target || !players.has(player.id)) return false;
  return activeServerSacredGroves(world).some(effect => (
    effect.ownerEnemyId
    && serverSacredGroveContains(effect, target, target.radius || 18)
    && !serverSacredGroveContains(effect, player, player.radius || 18)
  ));
}

function serverSacredGroveBlocksStep(world, enemy, x, y) {
  if (!enemy || enemy.pet || players.has(enemy.id)) return false;
  const next = { x, y, radius: enemy.radius || 14 };
  return activeServerSacredGroves(world).some(effect => (
    !serverSacredGroveContains(effect, enemy, enemy.radius || 14)
    && serverSacredGroveContains(effect, next, enemy.radius || 14)
  ));
}

function unitFriendlyAlignedWithPlayer(unit, player, options = {}) {
  const faction = unitFactionId(unit);
  if (faction) {
    if (playerFriendlyToFaction(player, faction)) return true;
    if (playerHostileToFaction(player, faction)) return false;
  }
  const unitSide = enemyAlignment(unit);
  if (unitSide === "Neutral" && options.excludeNeutralUnits) return false;
  const playerSide = player?.alignment || "Neutral";
  if (playerSide === "Evil") return unitSide === "Evil";
  if (playerSide === "Good") return unitSide === "Good" || unitSide === "Neutral";
  return unitSide === "Good" || unitSide === "Neutral";
}

function unitIncorporeal(unit) {
  if (unit?.statMods?.some(mod => mod.corporeal)) return false;
  return Boolean(unit?.incorporeal || unit?.statMods?.some(mod => mod.incorporeal));
}

function unitInvisible(unit) {
  return Boolean(unit?.invisible || unit?.statMods?.some(mod => mod.invisible));
}

function unitFrozen(unit) {
  return Boolean(unit?.statMods?.some(mod => mod.freeze));
}

function removeStatModByName(unit, name) {
  if (!unit?.statMods?.length) return false;
  const before = unit.statMods.length;
  unit.statMods = unit.statMods.filter(mod => mod.name !== name);
  return unit.statMods.length !== before;
}

function removeInvisibility(unit) {
  if (!unit) return false;
  unit.invisible = false;
  return removeStatModByName(unit, "Invisibility");
}

function clearPacify(unit) {
  let cleared = false;
  if ((unit?.pacified || 0) > 0) {
    unit.pacified = 0;
    cleared = true;
  }
  return removeStatModByName(unit, "Pacify") || cleared;
}

function freezeDurationFor(target, duration) {
  return players.has(target?.id) || target?.boss ? duration / 2 : duration;
}

function absorbShieldDamage(target, damage, dmgType = "Magical") {
  if (damage <= 0 || !target?.statMods?.length) return damage;
  const shield = target.statMods.find(mod => mod.shieldAmount > 0 && (mod.shieldDamageType || "Physical") === dmgType);
  if (!shield) return damage;
  const absorbed = Math.min(damage, shield.shieldAmount);
  shield.shieldAmount = roundUpTenth(shield.shieldAmount - absorbed);
  if (shield.shieldAmount <= 0) target.statMods.splice(target.statMods.indexOf(shield), 1);
  return roundUpTenth(damage - absorbed);
}

function enemyHostileToPlayer(enemy, player, world = null) {
  if ((enemy.pacified || 0) > 0) return false;
  if (unitInvisible(player)) return false;
  if (enemy.pet && unitFriendlyToPetMaster(enemy, player)) return false;
  if (enemyAggroTowardPlayerPet(enemy, player.id, world)) return true;
  clearStaleServerAlignmentPlayerAggro(enemy, player);
  if (Array.isArray(enemy.plagueHostilePlayerIds) && enemy.plagueHostilePlayerIds.includes(player.id)) return true;
  if (enemy.hostileToPlayer || enemy.targetPlayerId === player.id) return true;
  if (enemy.pet) return false;
  return enemyNaturallyHostileToPlayer(enemy, player);
}

function enemyNaturallyHostileToPlayer(enemy, player) {
  if ((enemy.pacified || 0) > 0) return false;
  if (unitInvisible(player)) return false;
  if (enemy.pet) return false;
  const faction = unitFactionId(enemy);
  if (faction) {
    if (playerFriendlyToFaction(player, faction)) return false;
    if (playerHostileToFaction(player, faction)) return true;
  }
  return Boolean(enemy.aggressive) || alignmentHostileTo(enemyAlignment(enemy), player?.alignment || "Neutral");
}

function refreshNaturalPlayerAggro(world, player) {
  if (!world?.state?.enemies?.length || !player) return false;
  let changed = false;
  for (const enemy of world.state.enemies) {
    if (!enemy || enemy.hp <= 0 || enemy.pet) continue;
    if (enemy.targetPlayerId === player.id) continue;
    if (targetOutsideServerEnemyDungeon(world, enemy, player)) continue;
    if (serverSacredGroveBlocksTarget(world, enemy, player)) continue;
    if (!enemyNaturallyHostileToPlayer(enemy, player)) continue;
    const triggerRange = (enemy.aggroRange || HOSTILE_TRIGGER_RANGE) * RANGE_UNIT;
    if (distance(enemy, player) > triggerRange) continue;
    if (!serverHasLineOfSight(world, enemy, player)) continue;
    const faction = unitFactionId(enemy);
    const reason = faction && playerHostileToFaction(player, faction) ? "faction" : "alignment";
    setServerEnemyPlayerTarget(enemy, player.id, reason);
    changed = true;
  }
  return changed;
}

function clearStaleServerAlignmentPlayerAggro(enemy, player) {
  if (!enemy || !player || enemy.hostileToPlayerReason !== "alignment") return false;
  if (enemy.targetPlayerId && enemy.targetPlayerId !== player.id) return false;
  if (enemyNaturallyHostileToPlayer(enemy, player)) return false;
  enemy.hostileToPlayer = false;
  enemy.targetPlayerId = null;
  enemy.hostileToPlayerReason = null;
  enemy.hostileTargetId = null;
  if (enemy.leashState === "aggro") {
    enemy.leashState = "idle";
    enemy.triggerX = undefined;
    enemy.triggerY = undefined;
  }
  return true;
}

function markEnemyProvokedByPlayer(enemy, playerId) {
  rememberServerEnemyTrigger(enemy);
  enemy.hostileToPlayer = true;
  enemy.targetPlayerId = playerId;
  enemy.hostileToPlayerReason = "provoked";
}

function setServerEnemyPlayerTarget(enemy, playerId, reason = "alignment") {
  rememberServerEnemyTrigger(enemy);
  enemy.hostileToPlayer = true;
  enemy.targetPlayerId = playerId;
  enemy.hostileToPlayerReason = reason;
}

function forceEnemyHostileToAttacker(world, enemy, attacker) {
  if (!enemy || !attacker) return;
  if (players.has(attacker.id)) {
    markEnemyProvokedByPlayer(enemy, attacker.id);
    return;
  }
  if (dungeonMobTargetBlocked(world, enemy, attacker)) return;
  setEnemyTargetEnemy(world, enemy, attacker);
}

function callForDefense(world, attacked, attacker) {
  if (!world?.state?.enemies?.length || !attacked || !attacker) return false;
  const attackedAlignment = enemyAlignment(attacked);
  const attackedFaction = unitFactionId(attacked);
  if (!attackedFaction && attackedAlignment === "Neutral") return false;
  const defenseRange = 9 * RANGE_UNIT;
  let changed = false;
  for (const ally of world.state.enemies) {
    if (!ally || ally === attacked || ally === attacker || ally.hp <= 0) continue;
    if (distance(ally, attacked) > defenseRange) continue;
    if (!serverHasLineOfSight(world, ally, attacked)) continue;
    const allyAlignment = enemyAlignment(ally);
    const allyFaction = unitFactionId(ally);
    const sameAlignment = attackedFaction
      ? allyFaction === attackedFaction
      : allyAlignment === attackedAlignment;
    if (!sameAlignment) continue;
    forceEnemyHostileToAttacker(world, ally, attacker);
    changed = true;
  }
  return changed;
}

function resetPlayerProvokedAggro(world, playerId) {
  const player = players.get(playerId) || { id: playerId, alignment: "Neutral" };
  let changed = false;
  for (const enemy of world.state?.enemies || []) {
    if (enemy.targetPlayerId !== playerId) continue;
    if (enemy.hostileToPlayerReason !== "provoked") continue;
    if (enemyNaturallyHostileToPlayer(enemy, player)) continue;
    enemy.hostileToPlayer = false;
    enemy.targetPlayerId = null;
    enemy.hostileToPlayerReason = null;
    enemy.leashState = "retreating";
    changed = true;
  }
  return changed;
}

function unitHostileToEnemy(attacker, defender, world = null) {
  if (!attacker || !defender || attacker === defender) return false;
  if ((attacker.pacified || 0) > 0) return false;
  if (attacker.questSpawn && defender.questSpawn && attacker.questSpawn === defender.questSpawn) return false;
  if (attacker.pet) {
    if (unitFriendlyToPetMaster(attacker, defender)) return false;
    if (attacker.petCommand === "attack") return defender?.id === attacker.petTargetId;
    if (petShouldDefendAgainst(attacker, defender)) return true;
    return false;
  }
  if (defender?.pet && unitFriendlyToPetMaster(defender, attacker)) return false;
  if (unitThreatensPetMaster(attacker, defender)) return true;
  if (dungeonMobTargetBlocked(world, attacker, defender)) return false;
  if (attacker.hostileTargetId === defender.id) return true;
  if (sameNonMortalRealmAggroBlocked(attacker, defender)) return false;
  if (dungeonEvilNeutralAggroBlocked(world, attacker, defender)) return false;
  const factionHostile = unitsFactionHostile(attacker, defender);
  if (factionHostile !== null) return factionHostile;
  return foodchainHostileTo(attacker, defender)
    || neutralAggressiveThreatToMobs(attacker, defender)
    || alignmentHostileTo(enemyAlignment(attacker), enemyAlignment(defender));
}

function petMaster(enemy) {
  if (!enemy?.pet || !enemy.masterId) return null;
  return players.get(enemy.masterId) || null;
}

function petCreditId(enemy) {
  return enemy?.pet ? enemy.masterId : enemy?.id;
}

function petDamageRealmXpRealm(enemy) {
  if (!enemy?.pet) return null;
  const name = String(enemy.name || "").toLowerCase();
  const type = String(enemy.type || "").toLowerCase();
  const realm = normalizeRealm(enemy.realm || "Mortal");
  // Pet spells earn Realm XP through pet damage. Named summoned pets provide
  // a fallback when older templates do not carry their Realm cleanly.
  const summonRealmByName = {
    "skeleton": "Umbral",
    "revenant": "Umbral",
    "shade": "Umbral",
    "water elemental": "Ethereal",
    "earth elemental": "Ethereal",
    "fire elemental": "Infernal",
    "treant": "Sylvan"
  };
  if (name.includes("skeleton") || type === "revenant" || realm === "Umbral") return "Umbral";
  if (type === "demon" || type === "daemon") return "Infernal";
  if (type === "beast") return "Sylvan";
  for (const [needle, xpRealm] of Object.entries(summonRealmByName)) {
    if (name.includes(needle) || type.includes(needle)) return xpRealm;
  }
  if (realm && realm !== "Mortal") return realm;
  return null;
}

function unitFriendlyToPetMaster(pet, unit) {
  const master = petMaster(pet);
  if (!master || !unit) return false;
  if (unit.id === master.id || unit.id === pet.masterId) return true;
  if (unit.pet && unit.masterId && unit.masterId === pet.masterId) return true;
  return false;
}

function unitTypeIsDaemon(unit) {
  const type = String(unit?.type || "").trim().toLowerCase();
  return type === "demon" || type === "daemon" || type === "demons" || type === "daemons";
}

function ensurePetLifetime(enemy) {
  if (!enemy?.pet) return;
  if (!Number.isFinite(enemy.petDuration)) enemy.petDuration = PET_DURATION_SECONDS;
  if (!Number.isFinite(enemy.petTimeRemaining)) enemy.petTimeRemaining = enemy.petDuration;
}

function tickPetLifetime(world, enemy, dt) {
  if (!enemy?.pet) return false;
  ensurePetLifetime(enemy);
  enemy.petTimeRemaining = Math.max(0, enemy.petTimeRemaining - dt);
  if (enemy.petTimeRemaining > 0) return false;
  const index = world.state.enemies.indexOf(enemy);
  if (index >= 0) world.state.enemies.splice(index, 1);
  return true;
}

function enemyAggroTowardPlayerPet(enemy, playerId, world) {
  if (!enemy?.hostileTargetId || !playerId) return false;
  return Boolean((world?.state?.enemies || []).some(target => (
    target?.id === enemy.hostileTargetId && target.pet && target.masterId === playerId
  )));
}

function petMasterThreatenedByUnit(pet, unit) {
  const master = petMaster(pet);
  if (!master || !unit || unitFriendlyToPetMaster(pet, unit)) return false;
  if (players.has(unit.id)) {
    return alignmentHostileTo(unit.alignment || "Neutral", master.alignment || "Neutral");
  }
  return Boolean(unit.targetPlayerId && unit.targetPlayerId === master.id)
    || enemyHostileToPlayer(unit, master)
    || alignmentHostileTo(enemyAlignment(unit), master.alignment || "Neutral");
}

function unitThreatensPetMaster(attacker, defender) {
  return Boolean(defender?.pet && petMasterThreatenedByUnit(defender, attacker));
}

function petShouldDefendAgainst(attacker, defender) {
  return Boolean(attacker?.pet && petMasterThreatenedByUnit(attacker, defender));
}

function setEnemyTargetEnemy(world, enemy, target) {
  if (dungeonMobTargetBlocked(world, enemy, target)) return;
  if (serverSacredGroveBlocksTarget(world, enemy, target)) return;
  if (target) rememberServerEnemyTrigger(enemy);
  enemy.hostileTargetId = target?.id || null;
  if (target && enemyAlignment(target) === "Neutral" && !target.hostileTargetId && !dungeonMobTargetBlocked(world, target, enemy)) {
    target.hostileTargetId = enemy.id;
  }
}

function serverEnemyLeashPoint(enemy) {
  return {
    x: enemy.leashX ?? enemy.triggerX ?? enemy.homeX ?? enemy.x,
    y: enemy.leashY ?? enemy.triggerY ?? enemy.homeY ?? enemy.y
  };
}

function rememberServerEnemyTrigger(enemy) {
  if (!enemy || enemy.pet || enemy.leashState === "retreating") return;
  if (enemy.leashState === "aggro" && enemy.triggerX !== undefined && enemy.triggerY !== undefined) return;
  enemy.triggerX = enemy.x;
  enemy.triggerY = enemy.y;
  enemy.leashState = "aggro";
}

function clearServerEnemyCombat(enemy) {
  enemy.hostileToPlayer = false;
  enemy.targetPlayerId = null;
  enemy.hostileToPlayerReason = null;
  enemy.hostileTargetId = null;
  if (enemy.petCommand === "attack") {
    enemy.petCommand = "follow";
    enemy.petTargetId = null;
  }
}

function restoreServerEnemyAtLeash(enemy) {
  enemy.hp = enemy.maxHp;
  enemy.dots = [];
  enemy.statMods = [];
  enemy.rooted = 0;
  enemy.rootVisual = "";
  enemy.pacified = 0;
  enemy.stunned = 0;
  enemy.leashState = "idle";
  enemy.leashPath = null;
  enemy.leashPathTarget = null;
  delete enemy.triggerX;
  delete enemy.triggerY;
  clearServerEnemyCombat(enemy);
}

function shouldServerEnemyReturnToLeash(enemy) {
  if (!enemy || enemy.pet || enemy.leashState === "retreating") return false;
  if (enemy.leashState !== "aggro") return false;
  const point = serverEnemyLeashPoint(enemy);
  const leashRange = Number(enemy.leashRadius) || LEASH_RETURN_RANGE * RANGE_UNIT;
  if (distance(enemy, point) > leashRange) {
    enemy.leashState = "retreating";
    return true;
  }
  return false;
}

function serverSegmentWalkableForUnit(world, unit, from, to, step = 44) {
  const length = Math.hypot((to.x || 0) - (from.x || 0), (to.y || 0) - (from.y || 0));
  const samples = Math.max(1, Math.ceil(length / step));
  for (let i = 1; i <= samples; i += 1) {
    const t = i / samples;
    const x = (from.x || 0) + ((to.x || 0) - (from.x || 0)) * t;
    const y = (from.y || 0) + ((to.y || 0) - (from.y || 0)) * t;
    if (!serverWalkable(world, x, y, unit.radius || 14)) return false;
  }
  return true;
}

function findNearestServerLeashPathCell(world, unit, origin, minX, minY, cols, rows, cellSize) {
  const start = {
    cx: Math.max(0, Math.min(cols - 1, Math.round(((origin.x || 0) - minX) / cellSize))),
    cy: Math.max(0, Math.min(rows - 1, Math.round(((origin.y || 0) - minY) / cellSize)))
  };
  for (let radius = 0; radius <= 4; radius += 1) {
    for (let dy = -radius; dy <= radius; dy += 1) {
      for (let dx = -radius; dx <= radius; dx += 1) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) !== radius) continue;
        const cx = start.cx + dx;
        const cy = start.cy + dy;
        if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) continue;
        const x = minX + cx * cellSize;
        const y = minY + cy * cellSize;
        if (serverWalkable(world, x, y, unit.radius || 14)) return { cx, cy, x, y };
      }
    }
  }
  return null;
}

function smoothServerLeashPath(world, unit, points, target) {
  const path = [];
  let index = 0;
  while (index < points.length - 1) {
    let next = points.length - 1;
    for (; next > index + 1; next -= 1) {
      if (serverSegmentWalkableForUnit(world, unit, points[index], points[next])) break;
    }
    path.push(points[next]);
    index = next;
  }
  if (!path.length || Math.hypot(path[path.length - 1].x - target.x, path[path.length - 1].y - target.y) > 18) {
    path.push({ x: target.x, y: target.y });
  }
  return path;
}

function findServerEnemyLeashPath(world, enemy, target) {
  const padding = 720;
  const minX = Math.min(enemy.x || 0, target.x || 0) - padding;
  const minY = Math.min(enemy.y || 0, target.y || 0) - padding;
  const maxX = Math.max(enemy.x || 0, target.x || 0) + padding;
  const maxY = Math.max(enemy.y || 0, target.y || 0) + padding;
  const cellSize = Math.max(96, Math.ceil(Math.max(maxX - minX, maxY - minY) / 41));
  const cols = Math.max(8, Math.ceil((maxX - minX) / cellSize) + 1);
  const rows = Math.max(8, Math.ceil((maxY - minY) / cellSize) + 1);
  const start = findNearestServerLeashPathCell(world, enemy, enemy, minX, minY, cols, rows, cellSize);
  const goal = findNearestServerLeashPathCell(world, enemy, target, minX, minY, cols, rows, cellSize);
  if (!start || !goal) return null;
  const key = (cx, cy) => `${cx},${cy}`;
  const open = [{ ...start, g: 0, f: Math.hypot(goal.cx - start.cx, goal.cy - start.cy) }];
  const cameFrom = new Map();
  const bestG = new Map([[key(start.cx, start.cy), 0]]);
  const closed = new Set();
  const dirs = [
    [1, 0], [-1, 0], [0, 1], [0, -1],
    [1, 1], [1, -1], [-1, 1], [-1, -1]
  ];
  let found = null;
  let nodes = 0;
  while (open.length && nodes < 1400) {
    nodes += 1;
    open.sort((a, b) => a.f - b.f);
    const current = open.shift();
    const currentKey = key(current.cx, current.cy);
    if (closed.has(currentKey)) continue;
    if (current.cx === goal.cx && current.cy === goal.cy) {
      found = current;
      break;
    }
    closed.add(currentKey);
    for (const [dx, dy] of dirs) {
      const cx = current.cx + dx;
      const cy = current.cy + dy;
      if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) continue;
      const x = minX + cx * cellSize;
      const y = minY + cy * cellSize;
      if (!serverWalkable(world, x, y, enemy.radius || 14)) continue;
      if (dx && dy) {
        const sideA = { x: minX + (current.cx + dx) * cellSize, y: minY + current.cy * cellSize };
        const sideB = { x: minX + current.cx * cellSize, y: minY + (current.cy + dy) * cellSize };
        if (!serverWalkable(world, sideA.x, sideA.y, enemy.radius || 14)
          || !serverWalkable(world, sideB.x, sideB.y, enemy.radius || 14)) continue;
      }
      const nextKey = key(cx, cy);
      const nextG = current.g + (dx && dy ? 1.42 : 1);
      if (nextG >= (bestG.get(nextKey) ?? Infinity)) continue;
      bestG.set(nextKey, nextG);
      cameFrom.set(nextKey, currentKey);
      const h = Math.hypot(goal.cx - cx, goal.cy - cy);
      open.push({ cx, cy, x, y, g: nextG, f: nextG + h });
    }
  }
  if (!found) return null;
  const cells = [];
  let currentKey = key(found.cx, found.cy);
  while (currentKey) {
    const [cx, cy] = currentKey.split(",").map(Number);
    cells.push({ x: minX + cx * cellSize, y: minY + cy * cellSize });
    currentKey = cameFrom.get(currentKey);
  }
  cells.reverse();
  return smoothServerLeashPath(world, enemy, cells, target);
}

function moveServerEnemyAlongLeashPath(world, enemy, point, dt) {
  const targetChanged = !enemy.leashPathTarget
    || Math.hypot((enemy.leashPathTarget.x || 0) - point.x, (enemy.leashPathTarget.y || 0) - point.y) > 24;
  const needsPath = targetChanged
    || !Array.isArray(enemy.leashPath)
    || !enemy.leashPath.length
    || (enemy.leashRepathTimer || 0) <= 0;
  if (needsPath) {
    enemy.leashPath = findServerEnemyLeashPath(world, enemy, point);
    enemy.leashPathTarget = { x: point.x, y: point.y };
    enemy.leashRepathTimer = 0.9;
  } else {
    enemy.leashRepathTimer -= dt;
  }
  const waypoint = enemy.leashPath?.[0] || point;
  if (distance(enemy, waypoint) <= Math.max(18, enemy.radius || 14)) enemy.leashPath?.shift();
  return moveEnemyTowardTarget(world, enemy, enemy.leashPath?.[0] || point, enemyMoveSpeed(enemy) * 2, dt);
}

function moveServerEnemyToLeash(world, enemy, dt) {
  const point = serverEnemyLeashPoint(enemy);
  const canMoveDirect = serverSegmentWalkableForUnit(world, enemy, enemy, point)
    && serverHasLineOfSight(world, enemy, point, enemy.radius || 14);
  const moved = canMoveDirect
    ? (enemy.leashPath = null, moveEnemyTowardTarget(world, enemy, point, enemyMoveSpeed(enemy) * 2, dt))
    : moveServerEnemyAlongLeashPath(world, enemy, point, dt);
  if (distance(enemy, point) <= Math.max(4, (enemy.radius || 18) * 0.5)) {
    enemy.x = point.x;
    enemy.y = point.y;
    restoreServerEnemyAtLeash(enemy);
    return true;
  }
  return moved;
}

function enemyMoveSpeed(enemy) {
  const freezeMultiplier = unitFrozen(enemy) ? 0.5 : 1;
  return (72 + ((enemy.stats?.SPD || 0) * 9)) * freezeMultiplier;
}

function enemyAreaName(enemy) {
  return String(enemy.area || enemy.areaName || enemy.currentArea || "");
}

function enemyShouldWander(world, enemy) {
  if ((enemy.rooted || 0) > 0) return false;
  if ((enemy.pacified || 0) > 0) return false;
  if (enemy.leashState === "retreating") return false;
  if (enemy.noWander || enemy.name === "Guard Dorin") return false;
  if ((enemy.elite || enemy.boss) && unitInServerDungeon(world, enemy)) return false;
  if (enemy.shopkeeper || enemy.trainer || enemy.questGiver) return false;
  return true;
}

function tickEnemyWander(world, enemy, dt) {
  if (!enemyShouldWander(world, enemy)) return false;
  enemy.wanderTimer = (enemy.wanderTimer || 0) - dt;
  if (enemy.wanderTimer <= 0) {
    enemy.wanderTimer = randomBetween(0.8, 2.4);
    enemy.wanderAngle = randomBetween(0, Math.PI * 2);
  }
  const speed = enemyMoveSpeed(enemy) * 0.5;
  const moved = moveServerUnit(world, enemy, Math.cos(enemy.wanderAngle || 0) * speed * dt, Math.sin(enemy.wanderAngle || 0) * speed * dt);
  if (!moved) enemy.wanderTimer = 0;
  return moved;
}

function moveEnemyTowardTarget(world, enemy, target, speed, dt) {
  const d = distance(enemy, target);
  if (d <= 1) return false;
  const step = Math.min(d, speed * dt);
  const baseAngle = Math.atan2((target.y || 0) - (enemy.y || 0), (target.x || 0) - (enemy.x || 0));
  const angles = [0, 0.35, -0.35, 0.7, -0.7, 1.15, -1.15, 1.65, -1.65, Math.PI];
  let best = null;
  let bestScore = Infinity;
  for (const offset of angles) {
    const angle = baseAngle + offset;
    const dx = Math.cos(angle) * step;
    const dy = Math.sin(angle) * step;
    const x = (enemy.x || 0) + dx;
    const y = (enemy.y || 0) + dy;
    if (!serverWalkable(world, x, y, enemy.radius || 14)) continue;
    if (serverSacredGroveBlocksStep(world, enemy, x, y)) continue;
    const score = Math.hypot((target.x || 0) - x, (target.y || 0) - y) + Math.abs(offset) * 18 + serverEnemySeparationScore(world, enemy, x, y) * 0.08;
    if (score < bestScore) {
      bestScore = score;
      best = { dx, dy };
    }
  }
  return best ? moveServerUnit(world, enemy, best.dx, best.dy) : false;
}

function moveMortifiedServerEnemy(world, enemy, dt) {
  if (!enemy || (enemy.mortified || 0) <= 0 || (enemy.rooted || 0) > 0 || (enemy.stunned || 0) > 0) return false;
  const sourceX = Number(enemy.mortifySourceX);
  const sourceY = Number(enemy.mortifySourceY);
  let dx = (enemy.x || 0) - (Number.isFinite(sourceX) ? sourceX : enemy.x || 0);
  let dy = (enemy.y || 0) - (Number.isFinite(sourceY) ? sourceY : enemy.y || 0);
  let mag = Math.hypot(dx, dy);
  if (mag <= 0.001) {
    dx = enemy.facingX || 1;
    dy = 0;
    mag = 1;
  }
  const target = {
    x: (enemy.x || 0) + (dx / mag) * 240,
    y: (enemy.y || 0) + (dy / mag) * 240
  };
  return moveEnemyTowardTarget(world, enemy, target, enemyMoveSpeed(enemy) * 1.15, dt);
}

function tickPetIdle(world, enemy, dt) {
  if (!enemy.pet) return false;
  if (enemy.petCommand === "guard") return false;
  const master = petMaster(enemy);
  if (!master) return false;
  const d = distance(enemy, master);
  if (d > 150) return moveEnemyTowardTarget(world, enemy, master, enemyMoveSpeed(enemy), dt);
  if (d > 96) return moveEnemyTowardTarget(world, enemy, master, enemyMoveSpeed(enemy) * 0.75, dt);
  enemy.wanderTimer = (enemy.wanderTimer || 0) - dt;
  if (enemy.wanderTimer <= 0) {
    enemy.wanderTimer = randomBetween(0.8, 2.4);
    enemy.wanderAngle = randomBetween(0, Math.PI * 2);
  }
  const moved = moveServerUnit(
    world,
    enemy,
    Math.cos(enemy.wanderAngle || 0) * enemyMoveSpeed(enemy) * 0.35 * dt,
    Math.sin(enemy.wanderAngle || 0) * enemyMoveSpeed(enemy) * 0.35 * dt
  );
  if (distance(enemy, master) > 150) return moveEnemyTowardTarget(world, enemy, master, enemyMoveSpeed(enemy), dt) || moved;
  return moved;
}

function rollDice(dice) {
  const text = String(dice || "1D4").trim();
  const additiveMatch = text.match(/^(.+?)\s*\+\s*(\d+(?:\.\d+)?)$/);
  if (additiveMatch) return rollDice(additiveMatch[1]) + Number(additiveMatch[2]);
  const match = text.match(/^(\d+)D(\d+)$/i);
  if (!match) return 1;
  const count = Math.max(1, Number(match[1]) || 1);
  const sides = Math.max(1, Number(match[2]) || 1);
  let total = 0;
  for (let i = 0; i < count; i += 1) total += 1 + Math.floor(Math.random() * sides);
  return total;
}

function realmMatchup(realm) {
  realm = normalizeRealm(realm);
  return {
    Mortal: { strongVs: [], weakVs: [] },
    Ethereal: { strongVs: ["Infernal"], weakVs: ["Sylvan", "Ethereal"] },
    Celestial: { strongVs: ["Umbral", "Infernal"], weakVs: ["Sylvan", "Celestial"] },
    Infernal: { strongVs: ["Sylvan"], weakVs: ["Ethereal", "Infernal"] },
    Sylvan: { strongVs: ["Ethereal"], weakVs: ["Infernal", "Sylvan"] },
    Umbral: { strongVs: ["Sylvan"], weakVs: ["Celestial", "Umbral"] }
  }[realm] || { strongVs: [], weakVs: [] };
}

function realmMultiplier(attackingRealm, defendingRealm) {
  attackingRealm = normalizeRealm(attackingRealm);
  defendingRealm = normalizeRealm(defendingRealm);
  if (attackingRealm === "Mortal") return 1;
  const matchup = realmMatchup(attackingRealm);
  if (matchup.strongVs.includes(defendingRealm)) return 1.25;
  if (matchup.weakVs.includes(defendingRealm)) return 0.75;
  return 1;
}

function unitServerAuraSpells(unit) {
  return (unit?.activeSpells || unit?.spells || [])
    .map(spell => {
      const name = spell?.name;
      return name ? { ...(serverSpellTemplates[name] || {}), ...spell } : spell;
    })
    .filter(spell => spell?.aura);
}

function serverAuraSourceFriendlyToTarget(world, source, target) {
  if (!source || !target) return false;
  if (source === target || source.id === target.id) return true;
  const sourceIsPlayer = players.has(source.id);
  const targetIsPlayer = players.has(target.id);
  if (sourceIsPlayer && targetIsPlayer) return (source.alignment || "Neutral") === (target.alignment || "Neutral");
  if (sourceIsPlayer) {
    if (target.pet && target.masterId === source.id) return true;
    return unitFriendlyAlignedWithPlayer(target, source);
  }
  if (targetIsPlayer) {
    if (source.pet && source.masterId === target.id) return true;
    return unitFriendlyAlignedWithPlayer(source, target);
  }
  if (source.pet && unitFriendlyToPetMaster(source, target)) return true;
  if (target.pet && unitFriendlyToPetMaster(target, source)) return true;
  const factionHostile = unitsFactionHostile(source, target);
  if (factionHostile !== null) return !factionHostile;
  return enemyAlignment(source) === enemyAlignment(target);
}

function serverAuraStatBonus(world, unit, stat) {
  if (!world || !unit) return 0;
  let bonus = 0;
  const sources = [
    ...playerList(world.name).filter(player => (player.hp || 0) > 0),
    ...(world.state?.enemies || []).filter(enemy => enemy?.hp > 0)
  ];
  for (const source of sources) {
    if (!serverAuraSourceFriendlyToTarget(world, source, unit)) continue;
    for (const aura of unitServerAuraSpells(source)) {
      const range = Number(aura.range) || 0;
      if (source.id !== unit.id && distance(source, unit) > range * RANGE_UNIT) continue;
      if (stat === "AGL" && aura.name === "War Drums") bonus += spellValue(aura, "agilityBonus", 0, 2.5);
      else if (stat === "DEF" && aura.name === "Aura of Protection") bonus += spellValue(aura, "defenseBonus", 0, 0.25);
      else if (stat === "REGEN" && aura.name === "Song of White Stag") bonus += spellValue(aura, "regenBonus", 0, 0.5);
      else if (stat === "FOCUS" && aura.name === "Bloodthirsty Aura") bonus += spellValue(aura, "focusBonus", 0, 1);
      else if (stat === "INT" && aura.name === "Etherwind Aura") bonus += spellValue(aura, "intelligenceBonus", 0, 0.5);
      else if (stat === "RESIST" && aura.name === "Etherwind Aura") bonus += spellValue(aura, "resistBonus", 0, 0.5);
    }
  }
  return bonus;
}

function serverEffectiveStat(unit, stat, world = null) {
  let value = Number(unit?.stats?.[stat]) || 0;
  value += serverAuraStatBonus(world, unit, stat);
  for (const mod of unit?.statMods || []) {
    if (mod.setStats?.[stat] !== undefined) value = Number(mod.setStats[stat]) || 0;
    if (mod.stats?.[stat] !== undefined) value *= Number(mod.stats[stat]) || 0;
    if (mod.addStats?.[stat] !== undefined) value += Number(mod.addStats[stat]) || 0;
  }
  return Math.max(0, value);
}

function realmResist(target, realm, world = null) {
  realm = normalizeRealm(realm);
  normalizeRealmMap(target.resistances);
  let value = (target.resistances?.[realm] || 0) + serverEffectiveStat(target, "RESIST", world);
  for (const mod of target.statMods || []) {
    normalizeRealmMap(mod.addResistances);
    if (mod.addResistances?.[realm] !== undefined) value += mod.addResistances[realm];
  }
  return Math.max(0, value);
}

function roundUpTenth(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return Math.ceil((numeric - Number.EPSILON) * 10) / 10;
}

function mitigatedDamage(target, amount, dmgType, realm, world = null) {
  const mitigation = dmgType === "Status" ? 0 : dmgType === "Physical" ? serverEffectiveStat(target, "DEF", world) : realmResist(target, realm, world);
  return roundUpTenth(Math.max(0, amount - mitigation));
}

function protectedFromPlayerEffects(enemy, player) {
  return Boolean(enemy?.friendlyToGoodPlayer && (player?.alignment || "Neutral") === "Good");
}

function enemyAttackInterval(enemy, world = null) {
  const axeMastery = (enemy.spells || []).find(spell => spell?.name === "Axe Mastery");
  const masteryDelay = axeMastery && playerWeaponHasType(enemy.weapon, "axe") ? (Number(axeMastery.lvl) || 1) * 3 : 0;
  const interval = Math.max(0.25, (((enemy.weapon?.speed ?? 100) - masteryDelay - serverEffectiveStat(enemy, "AGL", world)) / 100));
  return unitFrozen(enemy) ? interval * 2 : interval;
}

function enemyDamage(enemy, world = null) {
  return roundUpTenth(rollDice(enemy.weapon?.dice || "1D4") + attackDamageBonus(serverEffectiveStat(enemy, "ATK", world)));
}

function spellLevel(spell) {
  return Math.max(1, Number(spell?.lvl) || 1);
}

function spellValue(spell, formulaKeyOrBase, baseOrPerLevel, maybePerLevel) {
  const keyed = typeof formulaKeyOrBase === "string";
  const formulaKey = keyed ? formulaKeyOrBase : null;
  const base = keyed ? baseOrPerLevel : formulaKeyOrBase;
  const perLevel = keyed ? maybePerLevel : baseOrPerLevel;
  const formula = spellFormulaFor(spell, formulaKey, base, perLevel, "value");
  return roundUpTenth(spellFormulaBaseValue(spell, formula, base, perLevel));
}

function spellDamageValue(spell, formulaKeyOrBase, baseOrPerLevel, maybePerLevel) {
  const keyed = typeof formulaKeyOrBase === "string";
  const formulaKey = keyed ? formulaKeyOrBase : null;
  const base = keyed ? baseOrPerLevel : formulaKeyOrBase;
  const perLevel = keyed ? maybePerLevel : baseOrPerLevel;
  const formula = spellFormulaFor(spell, formulaKey, base, perLevel, "damage");
  return roundUpTenth(spellFormulaBaseValue(spell, formula, base, perLevel));
}

function spellFormulaFor(spell, formulaKey, base, perLevel, kind) {
  const formulas = spell?.formulas;
  if (!formulas || typeof formulas !== "object") return null;
  if (formulaKey && formulas[formulaKey] && typeof formulas[formulaKey] === "object") return formulas[formulaKey];
  const expectedBase = Number(base);
  const expectedPerLevel = Number(perLevel);
  return Object.values(formulas).find(formula => {
    if (!formula || typeof formula !== "object") return false;
    const type = formula.type || "value";
    if (kind === "damage" && type !== "damage") return false;
    if (kind !== "damage" && type === "damage") return false;
    return Number(formula.base) === expectedBase && Number(formula.perLevel) === expectedPerLevel;
  }) || null;
}

function spellFormulaBaseValue(spell, formula, fallbackBase, fallbackPerLevel) {
  const base = Number(formula?.base ?? fallbackBase);
  const perLevel = Number(formula?.perLevel ?? fallbackPerLevel);
  return base + perLevel * spellLevel(spell);
}

const serverSpellTemplates = {
  "Magic Missile": { name: "Magic Missile", realm: "Ethereal", cooldown: 4, range: 10 },
  Hypnotize: { name: "Hypnotize", realm: "Ethereal", cooldown: 10, range: 8 },
  Invisibility: { name: "Invisibility", realm: "Ethereal", cooldown: 12, range: 6 },
  Banish: { name: "Banish", realm: "Ethereal", cooldown: 12, range: 6 },
  Clarity: { name: "Clarity", realm: "Ethereal", cooldown: 5, range: 6 },
  "Ice Bolt": { name: "Ice Bolt", realm: "Ethereal", cooldown: 6, range: 10 },
  "Ice Storm": { name: "Ice Storm", realm: "Ethereal", cooldown: 10, range: 10, aoeRadius: 5 },
  "Frozen Touch": { name: "Frozen Touch", realm: "Ethereal", cooldown: 0, range: 0, passive: true, duration: 4, formulas: { freezeChance: { type: "stat", base: 0, perLevel: 2 } } },
  "Chain Lightning": { name: "Chain Lightning", realm: "Celestial", cooldown: 6, range: 8 },
  "Grace from Above": { name: "Grace from Above", realm: "Celestial", cooldown: 16, range: 8, aoeRadius: 5, duration: 8, tick: 1, formulas: { heal: { type: "heal", base: 0, perLevel: 0.5 } } },
  "Divine Shield": { name: "Divine Shield", realm: "Celestial", cooldown: 12, range: 8, duration: 8, formulas: { shield: { type: "shield", base: 0, perLevel: 3 } } },
  "Arcane Shield": { name: "Arcane Shield", realm: "Ethereal", cooldown: 12, range: 8, duration: 8, formulas: { shield: { type: "shield", base: 0, perLevel: 3 } } },
  "Aura of Protection": { name: "Aura of Protection", realm: "Celestial", cooldown: 0, range: 6, passive: true, aura: true, formulas: { defenseBonus: { type: "stat", base: 0, perLevel: 0.25 } } },
  "Etherwind Aura": { name: "Etherwind Aura", realm: "Ethereal", cooldown: 0, range: 9, passive: true, aura: true, formulas: { intelligenceBonus: { type: "stat", base: 0, perLevel: 0.5 }, resistBonus: { type: "stat", base: 0, perLevel: 0.5 } } },
  "Song of White Stag": { name: "Song of White Stag", realm: "Sylvan", cooldown: 0, range: 6, passive: true, aura: true, formulas: { regenBonus: { type: "stat", base: 0, perLevel: 0.5 } } },
  "War Drums": { name: "War Drums", realm: "Mortal", cooldown: 0, range: 9, passive: true, aura: true, formulas: { agilityBonus: { type: "stat", base: 0, perLevel: 2.5 } } },
  "Bloodthirsty Aura": { name: "Bloodthirsty Aura", realm: "Infernal", cooldown: 0, range: 6, passive: true, aura: true, formulas: { focusBonus: { type: "stat", base: 0, perLevel: 1 } } },
  "Pestilent Aura": {
    name: "Pestilent Aura",
    realm: "Umbral",
    cooldown: 0,
    range: 9,
    passive: true,
    aura: true,
    tick: 1,
    formulas: { damage: { type: "damage", base: 0, perLevel: 0.2, stat: null, statScale: 0 } }
  },
  "Basic Prayer": { name: "Basic Prayer", realm: "Celestial", cooldown: 5, range: 8 },
  "Heavenly Light": { name: "Heavenly Light", realm: "Celestial", cooldown: 6, range: 8 },
  Godspeed: { name: "Godspeed", realm: "Celestial", cooldown: 60, range: 8, duration: 60 },
  "Ring of Fire": { name: "Ring of Fire", realm: "Infernal", cooldown: 9, range: 0, duration: 3, tick: 0.25 },
  "Axe Mastery": { name: "Axe Mastery", realm: "Mortal", cooldown: 0, range: 0, passive: true },
  "Mace Mastery": { name: "Mace Mastery", realm: "Mortal", cooldown: 0, range: 0, passive: true, formulas: { stunChanceBonus: { type: "stat", base: 0, perLevel: 1 } } },
  "Dagger Mastery": { name: "Dagger Mastery", realm: "Mortal", cooldown: 0, range: 0, passive: true, formulas: { focusBonus: { type: "stat", base: 4, perLevel: 1 } } },
  "Shield Mastery": { name: "Shield Mastery", realm: "Mortal", cooldown: 0, range: 0, passive: true, formulas: { blockBonus: { type: "stat", base: 0, perLevel: 1 } } },
  "Shield Bash": { name: "Shield Bash", realm: "Mortal", cooldown: 6, range: 2, duration: 2, formulas: { damage: { type: "damage", base: 0, perLevel: 1, stat: null, statScale: 0 } } },
  "Battle Cry": { name: "Battle Cry", realm: "Mortal", cooldown: 18, range: 4, formulas: { duration: { type: "duration", base: 0, perLevel: 0.5 } } },
  "Raise Skeleton": { name: "Raise Skeleton", realm: "Umbral", cooldown: 30, range: 0, summonTemplate: "Skeleton" },
  "Summon Water Elemental": { name: "Summon Water Elemental", realm: "Ethereal", cooldown: 30, range: 0, summonTemplate: "Water Elemental" },
  "Summon Earth Elemental": { name: "Summon Earth Elemental", realm: "Ethereal", cooldown: 30, range: 0, summonTemplate: "Earth Elemental" },
  "Summon Fire Elemental": { name: "Summon Fire Elemental", realm: "Infernal", cooldown: 30, range: 0, summonTemplate: "Fire Elemental" },
  "Summon Shade": { name: "Summon Shade", realm: "Umbral", cooldown: 30, range: 0, summonTemplate: "Shade" },
  "Summon Treant": { name: "Summon Treant", realm: "Sylvan", cooldown: 30, range: 0, summonTemplate: "Treant" },
  "Tame Beast": { name: "Tame Beast", realm: "Sylvan", cooldown: 150, range: 6, duration: 150 },
  "Unholy Dominion": { name: "Unholy Dominion", realm: "Infernal", cooldown: 60, range: 6, duration: 300 },
  "Curse of Disdain": { name: "Curse of Disdain", realm: "Umbral", cooldown: 4, range: 6 },
  "Bone Ritual": { name: "Bone Ritual", realm: "Umbral", cooldown: 4, range: 8, manualTarget: true, autocast: true, formulas: { heal: { type: "heal", base: 0, perLevel: 1.5 } } },
  "Briar Lash": { name: "Briar Lash", realm: "Sylvan", cooldown: 5, range: 8, duration: 3, formulas: { damage: { type: "damage", base: 4, perLevel: 1, stat: "INT", statScale: 1 }, speedPenalty: { type: "stat", base: -1.5, perLevel: -0.5 } } },
  Chlorophyll: { name: "Chlorophyll", realm: "Sylvan", cooldown: 8, range: 8, duration: 30, tick: 1, manualTarget: true, autocast: true, formulas: { heal: { type: "heal", base: 0, perLevel: 0.5, stat: null, statScale: 0 } } },
  "Wooden Skin": { name: "Wooden Skin", realm: "Sylvan", cooldown: 12, range: 8, duration: 30, manualTarget: true, autocast: true, formulas: { defenseBonus: { type: "stat", base: 0, perLevel: 0.5 } } },
  "Sacred Grove": { name: "Sacred Grove", realm: "Sylvan", cooldown: 24, range: 6, formulas: { duration: { type: "duration", base: 4, perLevel: 2 } } },
  "Tangle Vine": { name: "Tangle Vine", realm: "Sylvan", cooldown: 2, range: 6 },
  Spiderweb: { name: "Spiderweb", realm: "Mortal", cooldown: 2, range: 9, manualTarget: true, autocast: true, formulas: { rootDuration: { type: "duration", base: 1.5, perLevel: 0.5 } } },
  "Faerie Dust": { name: "Faerie Dust", realm: "Sylvan", cooldown: 4, range: 5, duration: 6 },
  Poison: { name: "Poison", realm: "Mortal", cooldown: 0, range: 0, passive: true },
  Lifesteal: { name: "Lifesteal", realm: "Umbral", cooldown: 8, range: 6 },
  "Thorn Shield": { name: "Thorn Shield", realm: "Sylvan", cooldown: 24, range: 0 },
  "Burning Skin": {
    name: "Burning Skin",
    realm: "Infernal",
    cooldown: 0,
    range: 0,
    passive: true,
    formulas: { damage: { type: "damage", base: 0, perLevel: 0.5, stat: "INT", statScale: 1 } }
  },
  "Faerie Fire": { name: "Faerie Fire", realm: "Sylvan", cooldown: 8, range: 8 },
  Fireblast: { name: "Fireblast", realm: "Infernal", cooldown: 10, range: 10, aoeRadius: 4 },
  Fireball: { name: "Fireball", realm: "Infernal", cooldown: 6, range: 10 }
};

function makeServerEnemySpell(spellEntry, lvl) {
  const name = typeof spellEntry === "string" ? spellEntry : spellEntry?.name;
  if (!name) return null;
  const template = {
    ...(serverSpellTemplates[name] || { name, realm: spellEntry?.realm || "Mortal", cooldown: spellEntry?.cooldown || 0, range: spellEntry?.range || 0 }),
    ...(serverSpellConfigs[name] || {}),
    ...(typeof spellEntry === "object" && spellEntry ? spellEntry : {})
  };
  normalizeRealmData(template);
  return {
    ...template,
    name,
    lvl,
    timer: template.cooldown ? randomBetween(0.4, template.cooldown) : 0
  };
}

function poisonTickDamage(spell) {
  const tick = Number(spell.tick ?? 1);
  const duration = Number(spell.duration ?? 4);
  const tickCount = Math.max(1, Math.ceil(duration / tick));
  return roundUpTenth(spellDamageValue(spell, "totalDamage", 0, 1) / tickCount);
}

function projectileSpeed(spd) {
  return 160 + spd * 80;
}

function weaponAmmoName(weapon) {
  if (!weapon) return null;
  return weapon.ammo || (weapon.category === "Bow" ? "Bronze Arrow" : null);
}

function maybeDropProjectileAmmo(world, projectile, target) {
  if (!projectile?.ammoDrop || Math.random() >= 0.5) return;
  dropServerItem(
    world,
    projectile.ammoDrop,
    (target.x || projectile.x) + randomBetween(-8, 8),
    (target.y || projectile.y) + randomBetween(-8, 8)
  );
}

const realmColors = {
  Mortal: "#d9bd8c",
  Ethereal: "#8db8ff",
  Celestial: "#f0cf63",
  Infernal: "#e0523f",
  Sylvan: "#68a85e",
  Umbral: "#111111"
};

function weaponProjectileTrailColor(weapon) {
  const realm = normalizeRealm(weapon?.realm || "Mortal");
  return realmColors[realm] || "#d9bd8c";
}

function createEnemyWeaponProjectile(world, enemy, target, damage) {
  const weapon = enemy.weapon || {};
  const d = Math.max(1, distance(enemy, target));
  const realm = weapon.realm || enemy.realm || "Mortal";
  const speed = projectileSpeed(weapon.projectileSpeed || weapon.spd || 1);
  world.state.projectiles = Array.isArray(world.state.projectiles) ? world.state.projectiles : [];
  world.state.projectiles.push({
    id: sharedServerId("projectile"),
    x: enemy.x,
    y: enemy.y,
    fromX: enemy.x,
    fromY: enemy.y,
    vx: ((target.x - enemy.x) / d) * speed,
    vy: ((target.y - enemy.y) / d) * speed,
    distanceTraveled: 0,
    maxDistance: (weapon.range || 1) * RANGE_UNIT * 1.5,
    targetPlayerId: players.has(target.id) ? target.id : null,
    targetEnemyId: players.has(target.id) ? null : target.id,
    targetType: players.has(target.id) ? "player" : "enemy",
    owner: "enemy",
    ownerId: enemy.id,
    ownerCreditId: petCreditId(enemy),
    damage,
    realm,
    color: realmColors[realm] || "#f04f48",
    label: `<b>${enemy.name}</b>'s ${weapon.name || "attack"}`,
    radius: 5,
    speed,
    trail: weaponProjectileTrailColor(weapon),
    dmgType: weapon.dmgType || "Physical",
    ammoDrop: weaponAmmoName(weapon),
    projectileAnimation: weapon.projectileAnimation || "ball",
    sourceKind: "weapon",
    sourceWeapon: weapon
  });
}

function sharedServerId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function attackDamageBonus(atk) {
  const value = Math.max(0, Number(atk) || 0);
  return value > 0 ? roundUpTenth(randomBetween(value * 0.5, value)) : 0;
}

function randomInt(min, max) {
  return Math.floor(randomBetween(min, max + 1));
}

function weightedChoice(entries) {
  const total = entries.reduce((sum, entry) => sum + Math.max(0, Number(entry.frequency) || 0), 0);
  if (total <= 0) return null;
  let roll = Math.random() * total;
  for (const entry of entries) {
    roll -= Math.max(0, Number(entry.frequency) || 0);
    if (roll <= 0) return entry;
  }
  return entries[entries.length - 1] || null;
}

function normalizeWeapon(weapon) {
  const template = weaponTemplates[weapon?.name] || weaponTemplates["Rat Claw"];
  const normalized = { ...template, ...(weapon || {}) };
  normalized.realm = normalizeRealm(normalized.realm || "Mortal");
  const name = String(normalized.name || weapon?.name || "");
  const isWand = name.toLowerCase().includes("wand") || String(normalized.category || "").toLowerCase() === "wand";
  if (!normalized.projectileAnimation && isWand) normalized.projectileAnimation = "magic missile";
  normalizeRealmMap(normalized.resistances);
  return normalized;
}

function scaledEnemyStats(baseStats, lvl, options = {}) {
  const stats = { ...(baseStats || {}) };
  stats.HP = (Number(stats.HP) || 5) * lvl;
  stats.ATK = Math.floor((Number(stats.ATK) || 0) * lvl);
  stats.DEF = Math.floor(((Number(stats.DEF) || 0) * lvl) / 2);
  stats.REGEN = (Number(stats.REGEN) || 0) * lvl;
  if (options.elite) stats.HP *= 3;
  if (options.boss) stats.HP *= 6;
  return stats;
}

function makeServerEnemy(template, lvl, x, y, area = "") {
  normalizeRealmData(template);
  const elite = Boolean(template.elite);
  const boss = Boolean(template.boss);
  const stats = scaledEnemyStats(template.stats, lvl, { elite, boss });
  const realm = normalizeRealm(template.realm || "Mortal");
  return {
    id: sharedServerId("enemy"),
    name: template.name,
    templateName: template.name,
    lvl,
    realm,
    alignment: template.alignment || defaultAlignmentForRealm(realm),
    faction: factionId(template.faction || inferredFactionForUnit(template)),
    aggressive: Boolean(template.aggressive),
    type: template.type || "Beast",
    foodchain: template.foodchain || ((template.type || "Beast") === "Beast" ? "Prey" : undefined),
    incorporeal: Boolean(template.incorporeal),
    flying: Boolean(template.flying),
    elite,
    boss,
    sprite: template.sprite,
    spriteChannels: structuredClone(template.spriteChannels || template.channels || null),
    x,
    y,
    facingX: 1,
    area,
    homeX: x,
    homeY: y,
    radius: (template.radius || 14) * UNIT_SIZE_SCALE,
    hp: stats.HP,
    maxHp: stats.HP,
    attackTimer: randomBetween(0, 0.5),
    regenTimer: 5,
    pacified: 0,
    rooted: 0,
    stunned: 0,
    wanderTimer: randomBetween(0.5, 2.5),
    wanderAngle: randomBetween(0, Math.PI * 2),
    leashState: "idle",
    stats,
    resistances: normalizeRealmMap({ ...(template.resistances || {}) }),
    gold: template.gold || "0",
    weapon: normalizeWeapon(template.weapon),
    spells: Array.isArray(template.spells) ? template.spells.map(spell => makeServerEnemySpell(spell, lvl)).filter(Boolean) : [],
    statMods: [],
    dots: []
  };
}

function spawnEnemyNearPlayer(world, player) {
  loadSharedGameData();
  player = normalizedPlayerForWorld(world, player);
  const playerArea = player?.area || "";
  const table = areaSpawnTables[playerArea] || null;
  if (!table?.length) return false;
  const choice = weightedChoice(table);
  const template = choice ? monsterByName.get(choice.name) : null;
  if (!template) return false;
  const range = areaLevelRanges[playerArea] || { min: 1, max: 3 };
  const selectedMin = Number(choice.minLvl ?? choice.minLevel ?? choice.levelRange?.min);
  const selectedMax = Number(choice.maxLvl ?? choice.maxLevel ?? choice.levelRange?.max);
  const levelMin = Number.isFinite(selectedMin) && selectedMin > 0 ? Math.floor(selectedMin) : range.min;
  const levelMax = Number.isFinite(selectedMax) && selectedMax > 0 ? Math.floor(selectedMax) : range.max;
  const lvl = randomInt(Math.max(1, levelMin), Math.max(Math.max(1, levelMin), levelMax));
  const radius = (template.radius || 14) * UNIT_SIZE_SCALE;
  for (let attempt = 0; attempt < 24; attempt += 1) {
    const angle = randomBetween(0, Math.PI * 2);
    const distanceFromPlayer = randomBetween(420, 820);
    const x = (player.x || 0) + Math.cos(angle) * distanceFromPlayer;
    const y = (player.y || 0) + Math.sin(angle) * distanceFromPlayer;
    const area = serverAreaAt(world, x, y);
    if (!area || (area !== true && area.name !== playerArea) || !serverWalkable(world, x, y, radius)) continue;
    if (!serverEnemySpawnSeparated(world, x, y, radius)) continue;
    world.state.enemies = Array.isArray(world.state.enemies) ? world.state.enemies : [];
    const enemy = makeServerEnemy(template, lvl, x, y, playerArea);
    enemy.spawnSource = "ambient";
    enemy.ambientSpawnOrder = nextAmbientSpawnOrder(world);
    world.state.enemies.push(enemy);
    return true;
  }
  return false;
}

function isAmbientEnemy(enemy) {
  if (!enemy || enemy.hp <= 0) return false;
  if (enemy.spawnSource === "ambient") return true;
  if (enemy.pet || enemy.masterId || enemy.elite || enemy.boss || enemy.respawnKey || enemy.noWander) return false;
  if (enemy.shopkeeper || enemy.trainer || enemy.questGiver || enemy.banker) return false;
  return true;
}

function nextAmbientSpawnOrder(world) {
  world.ambientSpawnSequence = Math.max(0, Number(world.ambientSpawnSequence) || 0) + 1;
  return world.ambientSpawnSequence;
}

function ensureAmbientSpawnOrder(world, enemy) {
  if (!Number.isFinite(Number(enemy?.ambientSpawnOrder))) {
    enemy.ambientSpawnOrder = nextAmbientSpawnOrder(world);
  }
  return Number(enemy.ambientSpawnOrder) || 0;
}

function serverEnemyAreaName(world, enemy) {
  if (!enemy) return "";
  if (enemy.area) return String(enemy.area);
  const area = serverAreaAt(world, enemy.x, enemy.y);
  return area && area !== true ? String(area.name || "") : "";
}

function ambientEnemyCount(world) {
  return (world.state?.enemies || []).filter(isAmbientEnemy).length;
}

function ambientEnemyCountForArea(world, areaName) {
  return (world.state?.enemies || [])
    .filter(enemy => isAmbientEnemy(enemy) && serverEnemyAreaName(world, enemy) === areaName)
    .length;
}

function spawnAmountMultiplierForArea(areaName) {
  return spawnAmountMultipliers[areaSpawnAmounts[areaName] || "Normal"] ?? spawnAmountMultipliers.Normal;
}

function ambientEnemyCapForArea(areaName, playersInArea = 1) {
  return Math.max(1, Math.round(BASE_AMBIENT_MOBS_PER_PLAYER * Math.max(1, playersInArea) * spawnAmountMultiplierForArea(areaName)));
}

function spawnDevEnemy(world, playerId, message) {
  loadSharedGameData();
  const player = players.get(playerId);
  const templateName = String(message.templateName || message.name || "").slice(0, 80);
  const template = monsterByName.get(templateName);
  if (!world?.state || !player || !template) return false;
  const lvl = Math.max(1, Math.min(99, Math.floor(Number(message.lvl) || 1)));
  const radius = (template.radius || 14) * UNIT_SIZE_SCALE;
  let x = Number(message.x);
  let y = Number(message.y);
  let area = serverAreaAt(world, x, y);
  if (!Number.isFinite(x) || !Number.isFinite(y) || !area || !serverWalkable(world, x, y, radius)) {
    x = NaN;
    y = NaN;
    for (let attempt = 0; attempt < 36; attempt += 1) {
      const angle = randomBetween(0, Math.PI * 2);
      const distanceFromPlayer = randomBetween(90, 260);
      const tryX = (player.x || 0) + Math.cos(angle) * distanceFromPlayer;
      const tryY = (player.y || 0) + Math.sin(angle) * distanceFromPlayer;
      const tryArea = serverAreaAt(world, tryX, tryY);
      if (!tryArea || !serverWalkable(world, tryX, tryY, radius)) continue;
      if (!serverEnemySpawnSeparated(world, tryX, tryY, radius)) continue;
      x = tryX;
      y = tryY;
      area = tryArea;
      break;
    }
  }
  if (!Number.isFinite(x) || !Number.isFinite(y)) return false;
  if (!serverEnemySpawnSeparated(world, x, y, radius)) {
    const baseX = x;
    const baseY = y;
    for (let attempt = 0; attempt < 18; attempt += 1) {
      const angle = (Math.PI * 2 * attempt) / 18 + randomBetween(-0.12, 0.12);
      const tryX = baseX + Math.cos(angle) * randomBetween(radius + 30, 140);
      const tryY = baseY + Math.sin(angle) * randomBetween(radius + 30, 140);
      const tryArea = serverAreaAt(world, tryX, tryY);
      if (!tryArea || !serverWalkable(world, tryX, tryY, radius) || !serverEnemySpawnSeparated(world, tryX, tryY, radius)) continue;
      x = tryX;
      y = tryY;
      area = tryArea;
      break;
    }
  }
  if (!serverEnemySpawnSeparated(world, x, y, radius)) return false;
  world.state.enemies = Array.isArray(world.state.enemies) ? world.state.enemies : [];
  world.state.enemies.push(makeServerEnemy(template, lvl, x, y, area?.name || player.area || ""));
  acceptWorldRevision(world);
  broadcastToWorld(world.name, worldStatePayload(world, playerId));
  return true;
}

function summonPlayerPet(world, playerId, message) {
  loadSharedGameData();
  const player = players.get(playerId);
  const templateName = String(message.templateName || "Skeleton").slice(0, 80);
  const template = monsterByName.get(templateName);
  if (!world?.state || !player || !template) return false;
  const lvl = Math.max(1, Math.min(99, Math.floor(Number(message.lvl) || 1)));
  const radius = (template.radius || 14) * UNIT_SIZE_SCALE;
  let x = Number(message.x);
  let y = Number(message.y);
  let area = serverAreaAt(world, x, y);
  if (!Number.isFinite(x) || !Number.isFinite(y) || !area || !serverWalkable(world, x, y, radius)) {
    x = (player.x || 0) + 48;
    y = player.y || 0;
    area = serverAreaAt(world, x, y);
    if (!area || !serverWalkable(world, x, y, radius)) return false;
  }
  if (!serverEnemySpawnSeparated(world, x, y, radius)) {
    for (let attempt = 0; attempt < 16; attempt += 1) {
      const angle = randomBetween(0, Math.PI * 2);
      const tryX = (player.x || 0) + Math.cos(angle) * randomBetween(48, 120);
      const tryY = (player.y || 0) + Math.sin(angle) * randomBetween(48, 120);
      const tryArea = serverAreaAt(world, tryX, tryY);
      if (!tryArea || !serverWalkable(world, tryX, tryY, radius) || !serverEnemySpawnSeparated(world, tryX, tryY, radius)) continue;
      x = tryX;
      y = tryY;
      area = tryArea;
      break;
    }
  }
  if (!serverEnemySpawnSeparated(world, x, y, radius)) return false;
  const pet = makeServerEnemy(template, lvl, x, y, area?.name || player.area || "");
  Object.assign(pet, {
    pet: true,
    masterId: playerId,
    masterName: player.name || "Soulreaper",
    petCommand: "follow",
    petTargetId: null,
    petDuration: PET_DURATION_SECONDS,
    petTimeRemaining: PET_DURATION_SECONDS,
    noLoot: true,
    gold: "0",
    guaranteedDrops: []
  });
  world.state.enemies = Array.isArray(world.state.enemies) ? world.state.enemies : [];
  world.state.enemies.push(pet);
  acceptWorldRevision(world);
  broadcastToWorld(world.name, worldStatePayload(world, playerId));
  return true;
}

function summonEnemyMinion(world, caster, target, spell, templateName = "Skeleton") {
  loadSharedGameData();
  const template = monsterByName.get(templateName);
  if (!world?.state || !caster || !template) return null;
  const lvl = Math.max(1, Math.min(99, spellLevel(spell || caster)));
  const radius = (template.radius || 14) * UNIT_SIZE_SCALE;
  let x = NaN;
  let y = NaN;
  let area = null;
  for (let attempt = 0; attempt < 24; attempt += 1) {
    const angle = randomBetween(0, Math.PI * 2);
    const dist = randomBetween((caster.radius || 18) + 28, (caster.radius || 18) + 104);
    const tryX = (caster.x || 0) + Math.cos(angle) * dist;
    const tryY = (caster.y || 0) + Math.sin(angle) * dist;
    const tryArea = serverAreaAt(world, tryX, tryY);
    if (!tryArea || !serverWalkable(world, tryX, tryY, radius) || !serverEnemySpawnSeparated(world, tryX, tryY, radius)) continue;
    x = tryX;
    y = tryY;
    area = tryArea;
    break;
  }
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    x = (caster.x || 0) + (caster.radius || 18) + 44;
    y = caster.y || 0;
    area = serverAreaAt(world, x, y);
    if (!area || !serverWalkable(world, x, y, radius) || !serverEnemySpawnSeparated(world, x, y, radius)) return null;
  }
  const minion = makeServerEnemy(template, lvl, x, y, area?.name || caster.area || "");
  Object.assign(minion, {
    name: `${caster.name || "Enemy"}'s ${template.name}`,
    alignment: caster.alignment || minion.alignment,
    homeX: caster.homeX ?? caster.x ?? x,
    homeY: caster.homeY ?? caster.y ?? y,
    noLoot: true,
    gold: "0",
    guaranteedDrops: [],
    hostileTargetId: target?.id || null,
    targetPlayerId: players.has(target?.id) ? target.id : null
  });
  world.state.enemies = Array.isArray(world.state.enemies) ? world.state.enemies : [];
  world.state.enemies.push(minion);
  return minion;
}

function applyPetCommand(world, playerId, message) {
  const pet = (world.state?.enemies || []).find(enemy => enemy?.id === String(message.petId || ""));
  if (!pet || !pet.pet || pet.masterId !== playerId) return false;
  const command = String(message.command || "");
  if (command === "attack") {
    const target = (world.state.enemies || []).find(enemy => enemy?.id === String(message.targetId || "") && enemy.hp > 0);
    if (!target || target === pet || unitFriendlyToPetMaster(pet, target)) return false;
    pet.petCommand = "attack";
    pet.petTargetId = target.id;
    pet.hostileTargetId = target.id;
    pet.guardX = undefined;
    pet.guardY = undefined;
  } else if (command === "guard") {
    pet.petCommand = "guard";
    pet.petTargetId = null;
    pet.hostileTargetId = null;
    pet.guardX = pet.x;
    pet.guardY = pet.y;
  } else if (command === "follow") {
    pet.petCommand = "follow";
    pet.petTargetId = null;
    pet.hostileTargetId = null;
    pet.guardX = undefined;
    pet.guardY = undefined;
  } else if (command === "release") {
    pet.pet = false;
    pet.masterId = null;
    pet.masterName = null;
    pet.petCommand = null;
    pet.petTargetId = null;
    delete pet.petDuration;
    delete pet.petTimeRemaining;
    pet.noLoot = false;
    pet.hostileTargetId = null;
  } else {
    return false;
  }
  acceptWorldRevision(world);
  broadcastToWorld(world.name, worldStatePayload(world, playerId));
  return true;
}

function tickSpawning(world, dt) {
  loadSharedGameData();
  const worldPlayers = playerList(world.name)
    .map(player => normalizedPlayerForWorld(world, player))
    .filter(player => player.hp > 0 && areaSpawnTables[player.area]);
  if (!worldPlayers.length) return false;
  world.state.enemies = Array.isArray(world.state.enemies) ? world.state.enemies : [];
  world.spawnTimer = (world.spawnTimer || 0) + dt;
  const player = worldPlayers[randomInt(0, worldPlayers.length - 1)];
  const playersInArea = worldPlayers.filter(candidate => candidate.area === player.area).length;
  if (ambientEnemyCountForArea(world, player.area) >= ambientEnemyCapForArea(player.area, playersInArea)) return false;
  const rateName = areaSpawnRates[player.area] || "Normal";
  const rate = spawnRates[rateName] ?? spawnRates.Normal;
  if (Math.random() >= rate * dt) return false;
  return spawnEnemyNearPlayer(world, player);
}

function tickAmbientDespawn(world, dt) {
  if (!world?.state) return false;
  world.state.enemies = Array.isArray(world.state.enemies) ? world.state.enemies : [];
  const activeAreas = new Set(
    playerList(world.name)
      .map(player => normalizedPlayerForWorld(world, player))
      .filter(player => player.hp > 0)
      .map(player => player.area)
      .filter(Boolean)
  );
  const ambientByArea = new Map();
  for (const enemy of world.state.enemies) {
    if (!isAmbientEnemy(enemy)) continue;
    ensureAmbientSpawnOrder(world, enemy);
    const areaName = serverEnemyAreaName(world, enemy);
    if (!areaName || activeAreas.has(areaName)) continue;
    if (!ambientByArea.has(areaName)) ambientByArea.set(areaName, []);
    ambientByArea.get(areaName).push(enemy);
  }

  world.emptyAmbientAreaTimers ||= {};
  for (const areaName of Object.keys(world.emptyAmbientAreaTimers)) {
    if (activeAreas.has(areaName) || !ambientByArea.has(areaName)) delete world.emptyAmbientAreaTimers[areaName];
  }
  for (const areaName of ambientByArea.keys()) {
    world.emptyAmbientAreaTimers[areaName] = (world.emptyAmbientAreaTimers[areaName] || 0) + dt;
  }

  const eligible = [...ambientByArea.entries()]
    .filter(([areaName]) => (world.emptyAmbientAreaTimers[areaName] || 0) >= AMBIENT_EMPTY_AREA_GRACE_SECONDS)
    .flatMap(([, enemies]) => enemies);
  if (!eligible.length) return false;

  world.ambientDespawnTimer = (world.ambientDespawnTimer || 0) + dt;
  if (world.ambientDespawnTimer < AMBIENT_EMPTY_AREA_DESPAWN_INTERVAL) return false;
  world.ambientDespawnTimer = 0;

  eligible.sort((a, b) => ensureAmbientSpawnOrder(world, a) - ensureAmbientSpawnOrder(world, b));
  const enemy = eligible[0];
  const index = world.state.enemies.indexOf(enemy);
  if (index < 0) return false;
  world.state.enemies.splice(index, 1);
  return true;
}

function tickGroundItems(world, dt) {
  let changed = false;
  world.state.groundItems = Array.isArray(world.state.groundItems) ? world.state.groundItems : [];
  for (let i = world.state.groundItems.length - 1; i >= 0; i -= 1) {
    const drop = world.state.groundItems[i];
    if (!drop.duration) continue;
    drop.age = (drop.age || 0) + dt;
    if (drop.age >= drop.duration) {
      world.state.groundItems.splice(i, 1);
      changed = true;
    }
  }
  world.state.resourceRespawns = Array.isArray(world.state.resourceRespawns) ? world.state.resourceRespawns : [];
  for (let i = world.state.resourceRespawns.length - 1; i >= 0; i -= 1) {
    const respawn = world.state.resourceRespawns[i];
    respawn.remaining = (respawn.remaining || 0) - dt;
    if (respawn.remaining > 0) continue;
    const drop = {
      ...(respawn.drop || {}),
      id: sharedServerId("drop"),
      age: 0
    };
    if (drop.resourceKey && !world.state.groundItems.some(existing => existing?.resourceKey === drop.resourceKey)) {
      world.state.groundItems.push(drop);
    }
    world.state.resourceRespawns.splice(i, 1);
    changed = true;
  }
  return changed;
}

function scheduleServerResourceRespawn(world, drop) {
  if (!drop?.resourceKey || !drop.respawnAfter) return;
  world.state.resourceRespawns = Array.isArray(world.state.resourceRespawns) ? world.state.resourceRespawns : [];
  if (world.state.resourceRespawns.some(respawn => respawn.key === drop.resourceKey)) return;
  world.state.resourceRespawns.push({
    key: drop.resourceKey,
    remaining: drop.respawnAfter,
    drop: {
      ...drop,
      id: sharedServerId("drop"),
      age: 0
    }
  });
}

function playerWeaponHasType(weapon, type) {
  const target = String(type || "").toLowerCase();
  const types = Array.isArray(weapon?.weaponTypes) ? weapon.weaponTypes : [];
  if (types.some(candidate => String(candidate).toLowerCase() === target)) return true;
  const category = String(weapon?.category || "").toLowerCase();
  if (category === target) return true;
  const name = String(weapon?.name || "").toLowerCase();
  const animation = String(weapon?.animation || "").toLowerCase();
  const ammo = String(weapon?.ammo || "").toLowerCase();
  if (target === "bow") return category === "bow" || name.includes("bow") || ammo === "arrow";
  if (target === "axe") return category === "axe" || name.includes("axe");
  if (target === "blunt") return category === "blunt" || name.includes("mace") || name.includes("club") || name.includes("hammer") || animation === "whack";
  if (target === "slashing") return category === "slashing" || animation === "slash" || name.includes("sword") || name.includes("axe");
  if (target === "stabbing") return category === "stabbing" || name.includes("dagger") || name.includes("spear");
  return false;
}

function playerWeaponIsBow(weapon) {
  return playerWeaponHasType(weapon, "bow") || String(weapon?.ammo || "").toLowerCase() === "arrow";
}

function playerArcheryMasteryDelayReduction(player) {
  const mastery = (player?.activeSpells || []).find(spell => spell?.name === "Archery Mastery");
  return mastery ? (Number(mastery.lvl) || 1) * 3 : 0;
}

function playerAxeMasteryDelayReduction(player) {
  const mastery = (player?.activeSpells || []).find(spell => spell?.name === "Axe Mastery");
  return mastery ? (Number(mastery.lvl) || 1) * 3 : 0;
}

function playerDaggerMasteryFocusBonus(player, weapon = player?.weapon) {
  const mastery = (player?.activeSpells || []).find(spell => spell?.name === "Dagger Mastery");
  if (!mastery || !playerWeaponHasType(weapon, "stabbing")) return 0;
  return spellValue(mastery, "focusBonus", 4, 1);
}

function playerEffectiveWeaponDelay(player, weapon = player?.weapon) {
  const base = Number(weapon?.speed ?? 100);
  let mastery = playerWeaponIsBow(weapon) ? playerArcheryMasteryDelayReduction(player) : 0;
  if (playerWeaponHasType(weapon, "axe")) mastery += playerAxeMasteryDelayReduction(player);
  return Math.max(25, base - mastery);
}

function playerAttackInterval(player, weapon = player?.weapon) {
  return Math.max(0.25, ((playerEffectiveWeaponDelay(player, weapon) - (player.stats?.AGL || 0)) / 100));
}

function playerWeaponDamage(player, weapon = player?.weapon, world = null) {
  const weaponRoll = rollDice(weapon?.dice || "1D4");
  const attack = attackDamageBonus(serverEffectiveStat(player, "ATK", world));
  let total = roundUpTenth(weaponRoll + attack);
  const focus = serverEffectiveStat(player, "FOCUS", world) + playerDaggerMasteryFocusBonus(player, weapon);
  const crit = Math.random() * 100 < focus;
  if (crit) total = roundUpTenth(total * 2.5);
  return { total, weaponRoll, attack, crit };
}

function playerSpellLevel(player, name) {
  const spell = (player?.activeSpells || []).find(candidate => candidate?.name === name);
  return spell ? Number(spell.lvl) || 1 : 0;
}

function playerActiveSpell(player, name) {
  const active = (player?.activeSpells || []).find(candidate => candidate?.name === name);
  if (!active) return null;
  return {
    ...(serverSpellTemplates[name] || {}),
    ...(serverSpellConfigs[name] || {}),
    ...active
  };
}

function serverPlayerHasEquippedShield(player) {
  const visuals = Array.isArray(player?.equipmentVisuals) ? player.equipmentVisuals : [];
  return visuals.some(layer => {
    const slot = String(layer?.slot || "").toLowerCase();
    return slot.includes("off-hand") && Boolean(layer?.shield);
  });
}

function unitActiveServerSpell(unit, name) {
  if (players.has(unit?.id)) return playerActiveSpell(unit, name);
  const active = (unit?.spells || unit?.activeSpells || []).find(candidate => candidate?.name === name);
  if (!active) return null;
  return {
    ...(serverSpellTemplates[name] || {}),
    ...(serverSpellConfigs[name] || {}),
    ...active
  };
}

function burningSkinServerDamage(unit) {
  const spell = unitActiveServerSpell(unit, "Burning Skin");
  return spell ? spellDamageValue(spell, "damage", 0, 0.5) : 0;
}

function serverWeaponIsMelee(weapon) {
  return String(weapon?.animation || "claw").toLowerCase() !== "projectile" && (Number(weapon?.range) || 1) <= 3;
}

function frozenTouchServerSpell(unit) {
  return unitActiveServerSpell(unit, "Frozen Touch");
}

function maybeApplyFrozenTouchServer(attacker, target, weapon) {
  if (!attacker || !target || !serverWeaponIsMelee(weapon)) return false;
  const spell = frozenTouchServerSpell(attacker);
  if (!spell) return false;
  const chance = Math.max(0, spellValue(spell, "freezeChance", 0, 2));
  if (Math.random() * 100 >= chance) return false;
  applyStatModToTarget(target, {
    name: "Frozen",
    realm: "Ethereal",
    remaining: freezeDurationFor(target, Number(spell.duration ?? 4) || 4),
    freeze: true,
    debuff: true
  });
  if (players.has(attacker.id)) {
    const socket = sockets.get(attacker.id)?.socket;
    if (socket) send(socket, { type: "player:realm-xp", realm: "Ethereal", amount: Number(spell.lvl) || 1 });
  }
  return true;
}

function playerRageActive(player) {
  return Boolean(player?.statMods?.some(mod => mod?.name === "Rage"));
}

function playerOffHandDamageMultiplier(player) {
  const lvl = playerSpellLevel(player, "Dual Wield");
  return lvl ? (8 + lvl * 2) / 100 : 0;
}

function applyPostMitigationMultiplier(amount, multiplier = 1) {
  const value = Number(amount) || 0;
  const mult = Number(multiplier);
  if (!Number.isFinite(mult) || mult === 1) return value;
  return roundUpTenth(Math.max(0, value * Math.max(0, mult)));
}

function playerWeaponRealmXpOptions(player, weapon, { offHand = false, forceRealmXp = false } = {}) {
  const hasRealmXp = Boolean(
    forceRealmXp
    || (playerRageActive(player) && String(weapon?.dmgType || "Physical").toLowerCase() === "physical")
    || (offHand && playerSpellLevel(player, "Dual Wield") > 0)
    || (playerSpellLevel(player, "Archery Mastery") > 0 && playerWeaponIsBow(weapon))
    || (playerSpellLevel(player, "Axe Mastery") > 0 && playerWeaponHasType(weapon, "axe"))
    || (playerSpellLevel(player, "Mace Mastery") > 0 && playerWeaponHasType(weapon, "blunt"))
  );
  return hasRealmXp ? { realmXp: true, realmXpRealm: "Mortal" } : { realmXp: false };
}

function playerDaggerMasteryCritRealmXp(player, weapon, crit, damage) {
  if (!crit || !(Number(damage) > 0)) return 0;
  if (playerSpellLevel(player, "Dagger Mastery") <= 0 || !playerWeaponHasType(weapon, "stabbing")) return 0;
  return Number(damage) || 0;
}

function playerMaceStunChance(player, weapon) {
  const stun = weapon?.effects?.stun;
  if (stun?.enabled === false) return 0;
  if (!stun && !playerWeaponHasType(weapon, "blunt")) return 0;
  return (Number(stun?.chance ?? 5) || 0) + playerSpellLevel(player, "Mace Mastery");
}

function playerWeaponStunDuration(weapon) {
  return Math.max(0, Number(weapon?.effects?.stun?.duration ?? 2) || 0);
}

function maybeApplyPlayerWeaponStun(player, enemy, weapon) {
  const chance = playerMaceStunChance(player, weapon);
  if (!chance || Math.random() * 100 >= chance) return false;
  enemy.stunned = Math.max(enemy.stunned || 0, playerWeaponStunDuration(weapon));
  return true;
}

function enemyMaceStunChance(enemy, weapon = enemy?.weapon) {
  const stun = weapon?.effects?.stun;
  if (stun?.enabled === false) return 0;
  if (!stun && !playerWeaponHasType(weapon, "blunt")) return 0;
  const mastery = unitActiveServerSpell(enemy, "Mace Mastery");
  return (Number(stun?.chance ?? 5) || 0) + (mastery ? spellValue(mastery, "stunChanceBonus", 0, 1) : 0);
}

function enemyWeaponStunDuration(weapon) {
  return Math.max(0, Number(weapon?.effects?.stun?.duration ?? 2) || 0);
}

function stunTarget(target, duration, sourceName = "Stun") {
  const amount = Math.max(0, Number(duration) || 0);
  if (!target || amount <= 0) return false;
  if (players.has(target.id)) {
    const socket = sockets.get(target.id)?.socket;
    if (socket) send(socket, { type: "player:stun", duration: amount, sourceName });
    return Boolean(socket);
  }
  target.stunned = Math.max(target.stunned || 0, amount);
  return true;
}

function maybeApplyEnemyWeaponStun(enemy, target, weapon = enemy?.weapon) {
  const chance = enemyMaceStunChance(enemy, weapon);
  if (!chance || Math.random() * 100 >= chance) return false;
  return stunTarget(target, enemyWeaponStunDuration(weapon), `<b>${enemy.name}</b>'s ${weapon?.name || "attack"}`);
}

function rollGoldDrop(gold) {
  if (typeof gold === "number") return Math.max(0, Math.floor(gold));
  if (typeof gold === "string") {
    const numeric = Number(gold);
    if (Number.isFinite(numeric)) return Math.max(0, Math.floor(numeric));
    return rollDice(gold);
  }
  if (gold && typeof gold === "object") return randomInt(gold.min || 0, gold.max || 0);
  return 0;
}

function dropServerGold(world, amount, x, y) {
  if (!amount || amount <= 0) return;
  world.state.groundItems = Array.isArray(world.state.groundItems) ? world.state.groundItems : [];
  world.state.groundItems.push({
    id: sharedServerId("drop"),
    type: "gold",
    amount,
    x,
    y,
    radius: 14
  });
}

function dropServerItem(world, name, x, y, options = {}) {
  world.state.groundItems = Array.isArray(world.state.groundItems) ? world.state.groundItems : [];
  world.state.groundItems.push({
    id: sharedServerId("drop"),
    type: "item",
    item: { name },
    x,
    y,
    radius: 14,
    age: 0,
    duration: options.persistent ? null : 20
  });
}

function cloneClientItem(item) {
  if (!item || typeof item !== "object") return null;
  try {
    const snapshot = JSON.stringify(item);
    if (snapshot.length > 6000) return null;
    const clone = JSON.parse(snapshot);
    if (!clone || typeof clone.name !== "string" || !clone.name.trim()) return null;
    clone.name = clone.name.slice(0, 120);
    if (clone.quantity !== undefined) clone.quantity = Math.max(1, Math.min(999, Math.floor(Number(clone.quantity) || 1)));
    return clone;
  } catch {
    return null;
  }
}

function addPlayerDrop(world, drop, sourceId = "server") {
  if (!drop || typeof drop !== "object") return false;
  const x = Number(drop.x);
  const y = Number(drop.y);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return false;
  world.state.groundItems = Array.isArray(world.state.groundItems) ? world.state.groundItems : [];
  if (drop.type === "gold") {
    const amount = Math.floor(Number(drop.amount) || 0);
    if (amount <= 0) return false;
    world.state.groundItems.push({
      id: sharedServerId("drop"),
      type: "gold",
      serverOwned: true,
      amount,
      x,
      y,
      radius: Math.max(6, Math.min(30, Number(drop.radius) || 14)),
      age: 0,
      duration: drop.duration === null ? null : Math.max(1, Math.min(3600, Number(drop.duration) || 20))
    });
    return true;
  }
  const item = cloneClientItem(drop.item);
  if (!item) return false;
  world.state.groundItems.push({
    id: sharedServerId("drop"),
    type: "item",
    serverOwned: true,
    item,
    x,
    y,
    radius: Math.max(6, Math.min(30, Number(drop.radius) || 14)),
    age: 0,
    duration: drop.duration === null ? null : Math.max(1, Math.min(3600, Number(drop.duration) || 20))
  });
  return true;
}

function addPlayerDroppedItem(world, message) {
  const drop = message?.drop || {};
  if (!addPlayerDrop(world, drop, message.playerId || "server")) return false;
  acceptWorldRevision(world);
  broadcastToWorld(world.name, worldStatePayload(world, message.playerId || "server"));
  return true;
}

function addPlayerDeathDrops(world, message) {
  const drops = Array.isArray(message?.drops) ? message.drops.slice(0, 40) : [];
  let accepted = 0;
  for (const drop of drops) {
    const normalized = { ...drop, duration: 3600 };
    if (addPlayerDrop(world, normalized, message.playerId || "server")) accepted += 1;
  }
  if (!accepted) return false;
  acceptWorldRevision(world);
  broadcastToWorld(world.name, worldStatePayload(world, message.playerId || "server"));
  return true;
}

function clientDropMatchesServerDrop(clientDrop, serverDrop) {
  if (!clientDrop || !serverDrop || (clientDrop.type || "item") !== (serverDrop.type || "item")) return false;
  const dx = Number(clientDrop.x) - Number(serverDrop.x);
  const dy = Number(clientDrop.y) - Number(serverDrop.y);
  if (!Number.isFinite(dx) || !Number.isFinite(dy) || Math.hypot(dx, dy) > 64) return false;
  if (serverDrop.type === "gold") {
    return Math.floor(Number(clientDrop.amount) || 0) === Math.floor(Number(serverDrop.amount) || 0);
  }
  return Boolean(clientDrop.item?.name && clientDrop.item.name === serverDrop.item?.name);
}

function pickupMatchedPlayerDrop(world, message, playerId) {
  const drops = Array.isArray(world.state.groundItems) ? world.state.groundItems : [];
  const dropIndex = drops.findIndex(drop => drop?.serverOwned && clientDropMatchesServerDrop(message.drop, drop));
  if (dropIndex < 0) return false;
  const [drop] = drops.splice(dropIndex, 1);
  scheduleServerResourceRespawn(world, drop);
  acceptWorldRevision(world);
  send(sockets.get(playerId)?.socket, { ...worldStatePayload(world, playerId), type: "world:pickup:accepted", drop, localDropId: message.localDropId || "" });
  broadcastToWorld(world.name, worldStatePayload(world, playerId), playerId);
  return true;
}

function dropServerHeart(world, enemy) {
  world.state.groundItems = Array.isArray(world.state.groundItems) ? world.state.groundItems : [];
  world.state.groundItems.push({
    id: sharedServerId("drop"),
    type: "heart",
    heal: 5 * (enemy.lvl || 1),
    age: 0,
    duration: 15,
    x: (enemy.x || 0) + randomBetween(-18, 18),
    y: (enemy.y || 0) + randomBetween(-18, 18),
    radius: 14
  });
}

function rollServerLoot(world, enemy) {
  loadSharedGameData();
  if (Math.random() < 0.05) dropServerHeart(world, enemy);
  let drops = 0;
  const dropLootItem = (name, options = {}) => {
    const angle = randomBetween(0, Math.PI * 2);
    const offset = 16 + drops * 14;
    dropServerItem(world, name, (enemy.x || 0) + Math.cos(angle) * offset, (enemy.y || 0) + Math.sin(angle) * offset, options);
    drops += 1;
  };

  const guaranteedDrops = [...(enemy.guaranteedDrops || [])];
  if (enemy.name === "Napaea" && !guaranteedDrops.includes("Napaea's Skull")) guaranteedDrops.push("Napaea's Skull");
  if (enemy.name === "Elowen's Beloved" && !guaranteedDrops.includes("Forgotten Letter")) guaranteedDrops.push("Forgotten Letter");
  for (const name of guaranteedDrops) dropLootItem(name, name === "Forgotten Letter" ? { persistent: true } : {});
  if (enemy.name === "Bog Witch") {
    world.state.uniqueDrops ||= {};
    if (!world.state.uniqueDrops.sharleneParcelDropped) {
      dropServerItem(world, "Sharlene's Parcel", (enemy.x || 0) + randomBetween(-10, 10), (enemy.y || 0) + randomBetween(-10, 10), { persistent: true });
      world.state.uniqueDrops.sharleneParcelDropped = true;
      drops += 1;
    }
  }

  const templateLootKey = enemy.templateName || enemy.name;
  const nameLootKey = enemy.name && enemy.name !== templateLootKey ? enemy.name : null;
  const lootTable = [
    ...monsterLootEntries(monsterLootTables[templateLootKey], enemy.lvl),
    ...monsterLootEntries(monsterLootTables[nameLootKey], enemy.lvl)
  ];
  for (const entry of lootTable) {
    if (entry.minLvl && enemy.lvl < entry.minLvl) continue;
    if (entry.maxLvl && enemy.lvl > entry.maxLvl) continue;
    if (Math.random() < entry.chance) dropLootItem(entry.name);
  }
  return drops;
}

function monsterLootEntries(tableConfig, lvl = 1) {
  if (Array.isArray(tableConfig)) return tableConfig;
  if (!Array.isArray(tableConfig?.tables)) return [];
  return tableConfig.tables.flatMap(table => {
    if (table.minLvl && lvl < table.minLvl) return [];
    if (table.maxLvl && lvl > table.maxLvl) return [];
    return Array.isArray(table.entries) ? table.entries : [];
  });
}

function serverEnemyRespawnKey(enemy) {
  if (!enemy) return "";
  if (enemy.respawnKey) return enemy.respawnKey;
  const template = enemy.templateName || enemy.name || "enemy";
  const name = enemy.name || template;
  const x = Math.round(enemy.homeX ?? enemy.x ?? 0);
  const y = Math.round(enemy.homeY ?? enemy.y ?? 0);
  return `${template}:${name}:${x}:${y}`;
}

function serverRespawnRecordKey(respawn) {
  if (!respawn) return "";
  if (respawn.respawnKey) return respawn.respawnKey;
  return serverEnemyRespawnKey(respawn.enemy);
}

function scheduleServerEliteRespawn(world, enemy) {
  if (!enemy?.elite && !enemy?.boss) return;
  if (enemy.noRespawn) return;
  world.state.eliteRespawns = Array.isArray(world.state.eliteRespawns) ? world.state.eliteRespawns : [];
  const respawnKey = serverEnemyRespawnKey(enemy);
  if (respawnKey && world.state.eliteRespawns.some(respawn => serverRespawnRecordKey(respawn) === respawnKey)) return;
  const snapshot = JSON.parse(JSON.stringify(enemy));
  world.state.eliteRespawns.push({
    respawnKey,
    remaining: enemy.boss ? BOSS_RESPAWN_SECONDS : ELITE_RESPAWN_SECONDS,
    enemy: {
      ...snapshot,
      id: sharedServerId("enemy"),
      respawnKey,
      x: snapshot.homeX ?? snapshot.x,
      y: snapshot.homeY ?? snapshot.y,
      hp: snapshot.maxHp,
      attackTimer: 0,
      pacified: 0,
      rooted: 0,
      stunned: 0,
      dots: [],
      statMods: [],
      hostileToPlayer: false,
      targetPlayerId: null,
      leashState: "idle"
    }
  });
}

function serverKillEnemy(world, enemy, attackerId) {
  const enemyIndex = world.state.enemies.indexOf(enemy);
  if (enemyIndex >= 0) world.state.enemies.splice(enemyIndex, 1);
  scheduleServerEliteRespawn(world, enemy);
  const attackerSocket = sockets.get(attackerId)?.socket;
  if (!attackerSocket) return;
  const attacker = players.get(attackerId);
  const team = teamForPlayer(attackerId);
  const xpRecipients = team
    ? team.members
      .map(memberId => players.get(memberId))
      .filter(player => player
        && player.world === attacker?.world
        && distance(player, enemy) <= 9 * RANGE_UNIT + (player.radius || 18) + (enemy.radius || 18))
    : [attacker].filter(Boolean);
  if (!xpRecipients.length && attacker) xpRecipients.push(attacker);
  const alignment = enemyAlignment(enemy);
  const virtue = alignment === "Good" ? -1 : alignment === "Evil" ? 1 : 0;
  const factionChanges = serverFactionStandingChangesForKill(enemy);
  if (enemy.noLoot) {
    for (const recipient of xpRecipients) {
      applyServerFactionStandingChanges(recipient, factionChanges);
      refreshNaturalPlayerAggro(world, recipient);
    }
    if (Object.keys(factionChanges).length) {
      for (const recipient of xpRecipients) {
        const recipientSocket = sockets.get(recipient.id)?.socket;
        if (recipientSocket) send(recipientSocket, { type: "player:faction", factionChanges });
      }
    }
    return;
  }
  const gold = rollGoldDrop(enemy.gold);
  dropServerGold(world, gold, (enemy.x || 0) + randomBetween(-12, 12), (enemy.y || 0) + randomBetween(-12, 12));
  const itemDrops = rollServerLoot(world, enemy);
  const shareCount = Math.max(1, xpRecipients.length);
  for (const recipient of xpRecipients) {
    const recipientSocket = sockets.get(recipient.id)?.socket;
    if (!recipientSocket) continue;
    applyServerFactionStandingChanges(recipient, factionChanges);
    refreshNaturalPlayerAggro(world, recipient);
    const xp = Math.floor(serverKillXpForEnemy(enemy, recipient) / shareCount);
    send(recipientSocket, {
      type: "player:xp",
      amount: xp,
      enemyName: enemy.name,
      enemyLevel: enemy.lvl || 1,
      virtue: recipient.id === attackerId ? virtue : 0,
      factionChanges,
      gold: recipient.id === attackerId ? gold : 0,
      itemDrops: recipient.id === attackerId ? itemDrops : []
    });
  }
}

function serverFactionStandingChangesForKill(enemy) {
  const killedFaction = unitFactionId(enemy);
  if (!killedFaction || !serverFactionById.has(killedFaction)) return {};
  const changes = { [killedFaction]: -2 };
  for (const faction of serverFactionConfigs) {
    if (faction.enemyFactionIds.includes(killedFaction)) {
      changes[faction.id] = (changes[faction.id] || 0) + 1;
    }
  }
  return changes;
}

function applyServerFactionStandingChanges(player, changes = {}) {
  if (!player || !changes || typeof changes !== "object") return;
  player.factionStandings ||= {};
  for (const [rawId, rawDelta] of Object.entries(changes)) {
    const id = factionId(rawId);
    const delta = Number(rawDelta) || 0;
    if (!id || !delta) continue;
    player.factionStandings[id] = (Number(player.factionStandings[id]) || 0) + delta;
  }
}

function serverKillXpForEnemy(enemy, player) {
  const baseXp = Math.max(0, Math.floor(Number(enemy?.stats?.HP ?? enemy?.maxHp) || 0));
  const enemyLevel = Number(enemy?.lvl) || 1;
  const playerLevel = Number(player?.level) || 1;
  return playerLevel - enemyLevel >= 5 ? Math.floor(baseXp * 0.5) : baseXp;
}

function tickEliteRespawns(world, dt) {
  if (!Array.isArray(world.state?.eliteRespawns) || !world.state.eliteRespawns.length) return false;
  let changed = false;
  world.state.enemies = Array.isArray(world.state.enemies) ? world.state.enemies : [];
  for (const respawn of [...world.state.eliteRespawns]) {
    respawn.remaining = (respawn.remaining || 0) - dt;
    if (respawn.remaining > 0) continue;
    if (respawn.enemy) {
      world.state.enemies.push({
        ...respawn.enemy,
        id: sharedServerId("enemy"),
        respawnKey: respawn.respawnKey || respawn.enemy.respawnKey,
        hp: respawn.enemy.maxHp,
        x: respawn.enemy.homeX ?? respawn.enemy.x,
        y: respawn.enemy.homeY ?? respawn.enemy.y
      });
    }
    world.state.eliteRespawns.splice(world.state.eliteRespawns.indexOf(respawn), 1);
    changed = true;
  }
  return changed;
}

function applyServerDamageToEnemy(world, enemy, attackerId, amount, realm, label, dmgType = "Magical", options = {}) {
  realm = normalizeRealm(realm);
  const player = players.get(attackerId);
  if (!enemy || !player || protectedFromPlayerEffects(enemy, player)) {
    return { rejected: true, protected: true };
  }
  if (serverSacredGroveBlocksPlayerTarget(world, player, enemy)) {
    return { rejected: true, protected: true };
  }
  if (enemy.pet && enemy.masterId === attackerId) {
    enemy.hostileToPlayer = false;
    enemy.targetPlayerId = null;
    enemy.hostileToPlayerReason = null;
    enemy.hostileTargetId = null;
    return { rejected: true, friendly: true };
  }
  if (unitIncorporeal(player) && dmgType === "Physical") {
    return {
      attackerId,
      enemyId: enemy.id,
      damage: 0,
      realm,
      crit: false,
      killed: false,
      label,
      immune: true
    };
  }
  if (amount > 0) {
    removeInvisibility(player);
    clearPacify(enemy);
  }
  markEnemyProvokedByPlayer(enemy, attackerId);
  callForDefense(world, enemy, player);
  if (unitIncorporeal(enemy) && dmgType === "Physical") {
    return {
      attackerId,
      enemyId: enemy.id,
      damage: 0,
      realm,
      crit: false,
      killed: false,
      label,
      immune: true
    };
  }
  const damage = absorbShieldDamage(enemy, mitigatedDamage(enemy, amount * realmMultiplier(realm, enemy.realm), dmgType, realm, world), dmgType);
  enemy.hp = Math.max(0, (enemy.hp || 0) - damage);
  const killed = enemy.hp <= 0;
  if (killed) serverKillEnemy(world, enemy, attackerId);
  return {
    attackerId,
    enemyId: enemy.id,
    damage,
    realm,
    crit: false,
    killed,
    label,
    sourceEffectId: options.sourceEffectId || "",
    realmXp: options.realmXp ? damage : 0,
    realmXpRealm: options.realmXpRealm
  };
}

function damageEnemyFromEnemy(world, target, attacker, amount, realm, label, dmgType = "Physical") {
  realm = normalizeRealm(realm);
  if (!world.state.enemies.includes(target) || !world.state.enemies.includes(attacker)) return null;
  if (attacker.pet && unitFriendlyToPetMaster(attacker, target)) {
    attacker.hostileTargetId = null;
    attacker.petTargetId = null;
    attacker.petCommand = "follow";
    return null;
  }
  if (target.pet && unitFriendlyToPetMaster(target, attacker)) {
    target.hostileTargetId = null;
    return null;
  }
  const creditId = petCreditId(attacker);
  setEnemyTargetEnemy(world, target, attacker);
  callForDefense(world, target, attacker);
  if (amount > 0) {
    removeInvisibility(attacker);
    clearPacify(target);
  }
  if (unitIncorporeal(attacker) && dmgType === "Physical") {
    return {
      attackerId: creditId,
      enemyId: target.id,
      damage: 0,
      realm,
      crit: false,
      killed: false,
      label,
      immune: true,
      silent: true,
      sourceName: attacker.name || "",
      sourceType: attacker.type || ""
    };
  }
  if (unitIncorporeal(target) && dmgType === "Physical") {
    return {
      attackerId: creditId,
      enemyId: target.id,
      damage: 0,
      realm,
      crit: false,
      killed: false,
      label,
      immune: true,
      silent: true,
      sourceName: attacker.name || "",
      sourceType: attacker.type || ""
    };
  }
  const damage = absorbShieldDamage(target, mitigatedDamage(target, amount * realmMultiplier(realm, target.realm), dmgType, realm, world), dmgType);
  target.hp = Math.max(0, (target.hp || 0) - damage);
  const petRealmXpRealm = petDamageRealmXpRealm(attacker);
  const killed = target.hp <= 0;
  if (killed) serverKillEnemy(world, target, creditId);
  return {
    attackerId: creditId,
    enemyId: target.id,
    damage,
    realm,
    crit: false,
    killed,
    label,
    silent: true,
    sourceName: attacker.name || "",
    sourceType: attacker.type || "",
    realmXp: petRealmXpRealm ? damage : 0,
    realmXpRealm: petRealmXpRealm || undefined
  };
}

function maybeApplyEnemyPoison(attacker, target) {
  const poison = (attacker.spells || []).find(spell => spell.name === "Poison" || spell.name === "Poisonous");
  if (!poison || Math.random() >= (poison.chance ?? 0.5)) return false;
  const tick = Number(poison.tick) || 1;
  const dot = {
    name: "Poison",
    realm: "Mortal",
    damage: poisonTickDamage(poison),
    tick,
    timer: tick,
    remaining: Number(poison.duration) || 4,
    ownerId: attacker.id,
    dmgType: "Status"
  };
  if (players.has(target.id)) {
    const socket = sockets.get(target.id)?.socket;
    if (socket) send(socket, { type: "player:dot", sourceName: `<b>${attacker.name}</b>'s Poison`, dot });
    return Boolean(socket);
  }
  target.dots = Array.isArray(target.dots) ? target.dots : [];
  const existing = target.dots.find(candidate => candidate.name === "Poison");
  if (existing) Object.assign(existing, dot);
  else target.dots.push(dot);
  return true;
}

function activePlayerPoisonSpell(player) {
  return (player?.activeSpells || []).find(spell => spell.name === "Poison");
}

function maybeApplyPlayerPoison(world, target, playerId) {
  const player = players.get(playerId);
  const poison = activePlayerPoisonSpell(player);
  if (!world?.state?.enemies?.includes(target) || !poison || Math.random() >= 0.5) return false;
  target.dots = Array.isArray(target.dots) ? target.dots : [];
  const dot = {
    name: "Poison",
    realm: "Mortal",
    damage: poisonTickDamage(poison),
    tick: 1,
    timer: 1,
    remaining: 4,
    ownerId: playerId,
    dmgType: "Status",
    realmXp: true,
    realmXpRealm: "Mortal"
  };
  const existing = target.dots.find(candidate => candidate.name === "Poison" && candidate.ownerId === playerId);
  if (existing) Object.assign(existing, dot);
  else target.dots.push(dot);
  return true;
}

function updateEnemyStatMods(enemy, dt) {
  if (!Array.isArray(enemy.statMods) || !enemy.statMods.length) return false;
  let changed = false;
  for (const mod of [...enemy.statMods]) {
    if (tickEnemyStatModHeal(enemy, mod, dt)) changed = true;
    mod.remaining = (mod.remaining || 0) - dt;
    if (mod.remaining <= 0) {
      enemy.statMods.splice(enemy.statMods.indexOf(mod), 1);
      changed = true;
    }
  }
  return changed;
}

function tickEnemyStatModHeal(enemy, mod, dt) {
  const heal = roundUpTenth(Number(mod?.healPerTick) || 0);
  if (!enemy || heal <= 0 || enemy.hp <= 0) return false;
  const tick = Math.max(0.1, Number(mod.tick) || 1);
  mod.tickTimer = Math.max(0, Number(mod.tickTimer ?? tick) - dt);
  let changed = false;
  while (mod.tickTimer <= 0 && (Number(mod.remaining) || 0) > 0) {
    mod.tickTimer += tick;
    if (healServerEnemy(enemy, heal) > 0) changed = true;
  }
  return changed;
}

function applyEnemyStatMod(enemy, mod) {
  normalizeRealmData(mod);
  enemy.statMods = Array.isArray(enemy.statMods) ? enemy.statMods : [];
  const existing = enemy.statMods.find(candidate => candidate.name === mod.name);
  if (existing) Object.assign(existing, mod);
  else enemy.statMods.push(mod);
}

function sendDamageToPlayer(target, source, amount, realm, sourceName, dmgType = "Magical", soundEffect = "", options = {}) {
  realm = normalizeRealm(realm);
  if (source?.pet && unitFriendlyToPetMaster(source, target)) {
    source.hostileToPlayer = false;
    source.targetPlayerId = null;
    source.hostileToPlayerReason = null;
    source.hostileTargetId = null;
    return false;
  }
  if (unitIncorporeal(source) && dmgType === "Physical") return false;
  if (amount > 0) removeInvisibility(source);
  const targetSocket = sockets.get(target.id)?.socket;
  if (!targetSocket) return false;
  send(targetSocket, {
    type: "player:damage",
    enemy: { name: source.name || "Enemy", realm },
    amount,
    realm,
    dmgType,
    sourceName,
    soundEffect,
    sourceId: source?.id || "",
    weapon: options.weaponEffect ? source?.weapon || null : null,
    crit: Boolean(options.crit || options.critical)
  });
  return true;
}

function applyStatModToTarget(target, mod) {
  normalizeRealmData(mod);
  if (players.has(target.id)) {
    target.statMods = Array.isArray(target.statMods) ? target.statMods : [];
    const normalized = {
      ...mod,
      name: String(mod.name || "Spell").slice(0, 80),
      remaining: Math.max(0, Number(mod.remaining) || 0)
    };
    const existing = target.statMods.find(candidate => candidate.name === normalized.name);
    if (existing) Object.assign(existing, normalized);
    else target.statMods.push(normalized);
    const socket = sockets.get(target.id)?.socket;
    if (socket) send(socket, { type: "player:statmod", sourceName: normalized.name || "Spell", statMod: normalized });
    return Boolean(socket);
  }
  applyEnemyStatMod(target, mod);
  return true;
}

function rootTarget(target, duration, sourceName, rootVisual = "") {
  const rootDuration = Math.max(0, Number(duration) || 0);
  if (players.has(target.id)) {
    const socket = sockets.get(target.id)?.socket;
    if (socket) send(socket, { type: "player:root", duration: rootDuration, sourceName, rootVisual });
    return Boolean(socket);
  }
  target.rooted = Math.max(target.rooted || 0, rootDuration);
  target.rootVisual = rootVisual || (sourceName === "Spiderweb" ? "spiderweb" : "tangle-vine");
  return true;
}

function mortifyTarget(target, source, duration) {
  const amount = Math.max(0, Number(duration) || 0);
  if (!target || amount <= 0) return false;
  if (players.has(target.id)) {
    const socket = sockets.get(target.id)?.socket;
    if (socket) {
      send(socket, {
        type: "player:mortify",
        duration: amount,
        sourceName: source?.name || "Mortify",
        sourceX: source?.x || target.x,
        sourceY: source?.y || target.y
      });
    }
    return Boolean(socket);
  }
  target.mortified = Math.max(target.mortified || 0, amount);
  target.mortifySourceX = source?.x || target.x;
  target.mortifySourceY = source?.y || target.y;
  target.hostileToPlayer = false;
  target.targetPlayerId = null;
  target.hostileToPlayerReason = null;
  target.hostileTargetId = null;
  target.hostileTarget = null;
  target.leashState = "idle";
  return true;
}

function createEnemySpellProjectile(world, enemy, target, options) {
  const d = Math.max(1, distance(enemy, target));
  const speed = Number(options.speed) || 360;
  world.state.projectiles = Array.isArray(world.state.projectiles) ? world.state.projectiles : [];
  world.state.projectiles.push({
    id: sharedServerId("projectile"),
    x: enemy.x,
    y: enemy.y,
    fromX: enemy.x,
    fromY: enemy.y,
    vx: ((target.x - enemy.x) / d) * speed,
    vy: ((target.y - enemy.y) / d) * speed,
    distanceTraveled: 0,
    maxDistance: (options.range || 6) * RANGE_UNIT * 1.5,
    targetPlayerId: players.has(target.id) ? target.id : null,
    targetEnemyId: players.has(target.id) ? null : target.id,
    targetType: players.has(target.id) ? "player" : "enemy",
    owner: "enemy",
    ownerId: enemy.id,
    damage: Number(options.damage) || 0,
    realm: options.realm || "Mortal",
    color: options.color || realmColors[options.realm] || "#f04f48",
    label: options.label || `<b>${enemy.name}</b>'s spell`,
    radius: options.radius || 5,
    speed,
    trail: options.trail || "#8e6845",
    dmgType: options.dmgType || "Magical",
    dot: options.dot || null,
    statMod: options.statMod || null,
    projectileAnimation: options.projectileAnimation || "ball"
  });
}

function healServerEnemy(target, amount) {
  if (!target || target.hp <= 0 || target.hp >= target.maxHp) return 0;
  const healed = roundUpTenth(Math.min(Number(amount) || 0, target.maxHp - target.hp));
  target.hp += healed;
  return healed;
}

function isUmbralRevenantEnemy(enemy) {
  return Boolean(enemy && normalizeRealm(enemy.realm || "") === "Umbral" && String(enemy.type || "").toLowerCase() === "revenant");
}

function injuredEnemyAllyInRange(world, caster, range) {
  let best = caster.hp < caster.maxHp ? caster : null;
  let bestMissing = best ? best.maxHp - best.hp : 0;
  for (const ally of world.state.enemies || []) {
    if (!ally || ally.hp <= 0 || ally === caster || ally.hp >= ally.maxHp) continue;
    if (range > 0 && distance(caster, ally) > range * RANGE_UNIT + (ally.radius || 18) + (caster.radius || 18)) continue;
    if (enemyAlignment(ally) !== enemyAlignment(caster)) continue;
    const missing = ally.maxHp - ally.hp;
    if (missing > bestMissing) {
      best = ally;
      bestMissing = missing;
    }
  }
  return best;
}

function enemyAllyInRangeForBuff(world, caster, range, predicate = () => true) {
  if (!world || !caster) return null;
  const candidates = [caster, ...(world.state.enemies || [])];
  for (const ally of candidates) {
    if (!ally || ally.hp <= 0) continue;
    if (ally !== caster && !serverAuraSourceFriendlyToTarget(world, caster, ally)) continue;
    if (range > 0 && distance(caster, ally) > range * RANGE_UNIT + (ally.radius || 18) + (caster.radius || 18)) continue;
    if (ally !== caster && !serverHasLineOfSight(world, caster, ally)) continue;
    if (predicate(ally)) return ally;
  }
  return null;
}

function serverHypnotizeDuration(spell, target, world) {
  const maxDuration = Math.max(0, spellValue(spell, "duration", 0, 0.5));
  if (maxDuration <= 0) return 0;
  const minDuration = Math.max(0.2, maxDuration * 0.35);
  const rolled = minDuration + Math.random() * (maxDuration - minDuration);
  const resist = Math.max(0, realmResist(target, "Ethereal", world));
  const multiplier = Math.max(0.1, 1 - resist * 0.1);
  return roundUpTenth(Math.max(0.1, rolled * multiplier));
}

function enemyChainLightning(world, enemy, target, spell, combats, chainLinks) {
  const range = Number(spell.range) || 8;
  const realm = "Celestial";
  const firstDamage = spellDamageValue(spell, "damage", 0, 1.25);
  const jumpMultiplier = spellValue(spell, "jumpDamageMultiplier", 0.75, 0);
  const hitIds = new Set([enemy.id]);
  let previous = enemy;
  let current = target;
  for (let i = 0; i < 4 && current; i += 1) {
    chainLinks.push({ sourceX: previous.x, sourceY: previous.y, targetX: current.x, targetY: current.y, realm });
    hitIds.add(current.id);
    const damage = roundUpTenth(firstDamage * (i === 0 ? 1 : jumpMultiplier ** i));
    if (players.has(current.id)) {
      sendDamageToPlayer(current, enemy, damage, realm, `<b>${enemy.name}</b>'s Chain Lightning`, "Magical");
    } else {
      const combat = damageEnemyFromEnemy(world, current, enemy, damage, realm, `<b>${enemy.name}</b>'s Chain Lightning`, "Magical");
      if (combat) combats.push(combat);
    }
    previous = current;
    const candidates = [];
    for (const player of playerList(world.name)) {
      if ((player.hp || 0) <= 0 || hitIds.has(player.id)) continue;
      if (enemyAlignment(enemy) === (player.alignment || "Neutral")) continue;
      const d = distance(previous, player);
      if (d <= range * RANGE_UNIT + (player.radius || 18)) candidates.push({ target: player, distance: d });
    }
    for (const other of world.state.enemies || []) {
      if (!other || other.hp <= 0 || hitIds.has(other.id)) continue;
      if (enemyAlignment(other) === enemyAlignment(enemy)) continue;
      const d = distance(previous, other);
      if (d <= range * RANGE_UNIT + (other.radius || 18)) candidates.push({ target: other, distance: d });
    }
    candidates.sort((a, b) => a.distance - b.distance);
    current = candidates[0]?.target || null;
  }
  return chainLinks.length > 0;
}

function tickEnemySpells(world, enemy, target, dt, combats, chainLinks = []) {
  if (!Array.isArray(enemy.spells) || !enemy.spells.length || !target) return false;
  let changed = false;
  for (const spell of enemy.spells) {
    if (spell.name === "Poison" || spell.name === "Poisonous") continue;
    spell.timer = Math.max(0, (spell.timer || 0) - dt);
    if (spell.timer > 0) continue;
    if (spell.name === "Basic Prayer" || spell.name === "Heavenly Light") {
      const healTarget = injuredEnemyAllyInRange(world, enemy, Number(spell.range) || 8);
      if (!healTarget) {
        spell.timer = 1;
        continue;
      }
      healServerEnemy(healTarget, spell.name === "Heavenly Light"
        ? spellValue(spell, "heal", 5, 2)
        : spellValue(spell, "heal", 2.5, 0.5));
      spell.timer = Number(spell.cooldown) || 5;
      changed = true;
      continue;
    }
    if (spell.name === "Chlorophyll") {
      const range = Number(spell.range) || 8;
      const buffTarget = enemyAllyInRangeForBuff(world, enemy, range, ally => {
        if ((ally.statMods || []).some(mod => mod.name === "Chlorophyll")) return false;
        return ally.hp < ally.maxHp;
      });
      if (!buffTarget) {
        spell.timer = 1;
        continue;
      }
      const tick = Number(spell.tick ?? 1);
      applyStatModToTarget(buffTarget, {
        name: "Chlorophyll",
        remaining: Number(spell.duration) || 30,
        healPerTick: spellValue(spell, "heal", 0, 0.5),
        tick,
        tickTimer: tick,
        chlorophyll: true
      });
      world.state.effects = Array.isArray(world.state.effects) ? world.state.effects : [];
      world.state.effects.push({
        type: "chlorophyllSparkle",
        age: 0,
        duration: 0.85,
        x: buffTarget.x,
        y: buffTarget.y,
        radius: buffTarget.radius || 18
      });
      spell.timer = Number(spell.cooldown) || 8;
      changed = true;
      continue;
    }
    if (spell.name === "Wooden Skin") {
      const range = Number(spell.range) || 8;
      const buffTarget = enemyAllyInRangeForBuff(world, enemy, range, ally => !(ally.statMods || []).some(mod => mod.name === "Wooden Skin"));
      if (!buffTarget) {
        spell.timer = 1;
        continue;
      }
      applyStatModToTarget(buffTarget, {
        name: "Wooden Skin",
        remaining: Number(spell.duration) || 30,
        addStats: { DEF: spellValue(spell, "defenseBonus", 0, 0.5) },
        woodenSkin: true
      });
      spell.timer = Number(spell.cooldown) || 12;
      changed = true;
      continue;
    }
    if (spell.name === "Spirit of Avia") {
      const existing = (enemy.statMods || []).some(mod => mod.name === "Spirit of Avia");
      if (existing) {
        spell.timer = 1;
        continue;
      }
      applyEnemyStatMod(enemy, {
        name: "Spirit of Avia",
        realm: "Sylvan",
        remaining: Number(spell.duration) || 8,
        addStats: {
          SPD: spellValue(spell, "speedBonus", 0, 0.5),
          AGL: spellValue(spell, "agilityBonus", 0, 1)
        },
        flying: true
      });
      world.state.effects = Array.isArray(world.state.effects) ? world.state.effects : [];
      world.state.effects.push({
        id: sharedServerId("effect"),
        type: "spiritOfAvia",
        ownerId: "server",
        ownerEnemyId: enemy.id,
        x: enemy.x,
        y: enemy.y,
        age: 0,
        duration: 0.85,
        radius: enemy.radius || 18
      });
      spell.timer = Number(spell.cooldown) || 20;
      changed = true;
      continue;
    }
    const range = Number(spell.range) || 0;
    if (range > 0 && distance(enemy, target) > (range * RANGE_UNIT) + (target.radius || 18) + (enemy.radius || 18)) continue;
    if (spell.name === "Tangle Vine") {
      const damage = spellDamageValue(spell, "damage", 2.5, 0.5);
      const rootDuration = freezeDurationFor(target, spellValue(spell, "rootDuration", 1.5, 0.5));
      if (players.has(target.id)) {
        sendDamageToPlayer(target, enemy, damage, "Sylvan", `<b>${enemy.name}</b>'s Tangle Vine`, "Magical");
      } else {
        const combat = damageEnemyFromEnemy(world, target, enemy, damage, "Sylvan", `<b>${enemy.name}</b>'s Tangle Vine`, "Magical");
        if (combat) combats.push(combat);
      }
      rootTarget(target, rootDuration, `<b>${enemy.name}</b>'s Tangle Vine`);
      spell.timer = Number(spell.cooldown) || 2;
      changed = true;
    } else if (spell.name === "Spiderweb") {
      const rootDuration = freezeDurationFor(target, spellValue(spell, "rootDuration", 1.5, 0.5));
      rootTarget(target, rootDuration, `<b>${enemy.name}</b>'s Spiderweb`, "spiderweb");
      spell.timer = Number(spell.cooldown) || 2;
      changed = true;
    } else if (spell.name === "Hypnotize") {
      const duration = serverHypnotizeDuration(spell, target, world);
      if (stunTarget(target, duration, `<b>${enemy.name}</b>'s Hypnotize`)) {
        spell.timer = Number(spell.cooldown) || 10;
        changed = true;
      }
    } else if (spell.name === "Battle Cry") {
      const duration = spellValue(spell, "duration", 0, 0.5);
      const radius = (Number(spell.range) || 4) * RANGE_UNIT;
      let affected = 0;
      const candidates = [
        ...playerList(world.name).filter(player => (player.hp || 0) > 0 && enemyHostileToPlayer(enemy, player, world)),
        ...(world.state.enemies || []).filter(other => other && other !== enemy && other.hp > 0 && unitHostileToEnemy(enemy, other, world))
      ];
      for (const candidate of candidates) {
        if (distance(enemy, candidate) > radius + (candidate.radius || 18) + (enemy.radius || 18)) continue;
        if (!serverHasLineOfSight(world, enemy, candidate)) continue;
        if (stunTarget(candidate, duration, `<b>${enemy.name}</b>'s Battle Cry`)) affected += 1;
      }
      if (affected > 0) {
        spell.timer = Number(spell.cooldown) || 18;
        changed = true;
      } else {
        spell.timer = 1;
      }
    } else if (spell.name === "Magic Missile") {
      createEnemySpellProjectile(world, enemy, target, {
        damage: spellDamageValue(spell, "damage", 6, 1),
        realm: "Ethereal",
        color: "#8db8ff",
        label: `<b>${enemy.name}</b>'s Magic Missile`,
        radius: 5,
        speed: 360,
        trail: "#4068a8",
        range: spell.range || 10,
        dmgType: "Magical",
        projectileAnimation: "magic missile"
      });
      spell.timer = Number(spell.cooldown) || 4;
      changed = true;
    } else if (spell.name === "Ice Bolt") {
      const freeze = { name: "Frozen", realm: "Ethereal", remaining: freezeDurationFor(target, Number(spell.duration ?? 4) || 4), freeze: true, debuff: true };
      createEnemySpellProjectile(world, enemy, target, {
        damage: spellDamageValue(spell, "damage", 4, 1),
        realm: "Ethereal",
        color: "#91cfff",
        label: `<b>${enemy.name}</b>'s Ice Bolt`,
        radius: 6,
        speed: 330,
        trail: "#d9f6ff",
        range: spell.range || 10,
        dmgType: "Magical",
        statMod: freeze,
        projectileAnimation: "ice bolt"
      });
      spell.timer = Number(spell.cooldown) || 6;
      changed = true;
    } else if (spell.name === "Fireball") {
      const damage = spellDamageValue(spell, "damage", 4, 1);
      const duration = Number(spell.duration ?? 4);
      const tick = Number(spell.tick ?? 1);
      const dotDamage = roundUpTenth(damage * spellValue(spell, "dotDamageMultiplier", 0.25, 0));
      createEnemySpellProjectile(world, enemy, target, {
        damage,
        realm: "Infernal",
        color: realmColors.Infernal,
        label: `<b>${enemy.name}</b>'s Fireball`,
        radius: 7,
        speed: 330,
        trail: "#f0cf63",
        range: spell.range || 10,
        dmgType: "Magical",
        dot: { name: "Burning", realm: "Infernal", damage: dotDamage, tick, timer: tick, remaining: duration, dmgType: "Magical" },
        projectileAnimation: "fireball"
      });
      spell.timer = Number(spell.cooldown) || 6;
      changed = true;
    } else if (spell.name === "Fireblast") {
      const duration = Number(spell.duration ?? 4);
      const tick = Number(spell.tick ?? 1);
      world.state.effects = Array.isArray(world.state.effects) ? world.state.effects : [];
      world.state.effects.push({
        id: sharedServerId("effect"),
        type: "fireblast",
        x: target.x,
        y: target.y,
        realm: "Infernal",
        damage: spellDamageValue(spell, "damage", 0, 0.5),
        ownerId: "server",
        ownerEnemyId: enemy.id,
        age: 0,
        duration,
        tick,
        tickTimer: 0,
        radius: (spell.aoeRadius || 4) * RANGE_UNIT
      });
      spell.timer = Number(spell.cooldown) || 10;
      changed = true;
    } else if (spell.name === "Ice Storm") {
      const duration = Number(spell.duration ?? 4);
      const tick = Number(spell.tick ?? 1);
      world.state.effects = Array.isArray(world.state.effects) ? world.state.effects : [];
      world.state.effects.push({
        id: sharedServerId("effect"),
        type: "iceStorm",
        x: target.x,
        y: target.y,
        realm: "Ethereal",
        damage: spellDamageValue(spell, "damage", 0, 0.5),
        ownerId: "server",
        ownerEnemyId: enemy.id,
        age: 0,
        duration,
        tick,
        tickTimer: 0,
        radius: (spell.aoeRadius || 5) * RANGE_UNIT,
        statMod: { name: "Frozen", realm: "Ethereal", remaining: duration, freeze: true, debuff: true }
      });
      spell.timer = Number(spell.cooldown) || 10;
      changed = true;
    } else if (spell.name === "Ring of Fire") {
      world.state.effects = Array.isArray(world.state.effects) ? world.state.effects : [];
      world.state.effects.push({
        id: sharedServerId("effect"),
        type: "ring",
        ownerId: "server",
        ownerEnemyId: enemy.id,
        x: enemy.x,
        y: enemy.y,
        realm: "Infernal",
        damage: spellDamageValue(spell, "damage", 0.5, 0.5),
        age: 0,
        duration: Number(spell.duration ?? 3),
        tick: Number(spell.tick ?? 0.25),
        tickTimer: 0,
        radius: 96
      });
      spell.timer = Number(spell.cooldown) || 9;
      changed = true;
    } else if (spell.summonTemplate || spell.name === "Raise Skeleton") {
      if (summonEnemyMinion(world, enemy, target, spell, spell.summonTemplate || "Skeleton")) {
        spell.timer = Number(spell.cooldown) || 30;
        changed = true;
      } else {
        spell.timer = 2;
      }
    } else if (spell.name === "Sacred Grove") {
      world.state.effects = Array.isArray(world.state.effects) ? world.state.effects : [];
      world.state.effects.push({
        id: sharedServerId("effect"),
        type: "sacredGrove",
        ownerId: "server",
        ownerEnemyId: enemy.id,
        x: enemy.x,
        y: enemy.y,
        realm: "Sylvan",
        age: 0,
        duration: spellValue(spell, "duration", 4, 2),
        tick: 1,
        tickTimer: 0,
        radius: (Number(spell.range) || 6) * RANGE_UNIT
      });
      spell.timer = Number(spell.cooldown) || 24;
      changed = true;
    } else if (spell.name === "Curse of Disdain") {
      const tick = Number(spell.tick ?? 1);
      const duration = Number(spell.duration ?? 8);
      const dot = {
        name: "Curse of Disdain",
        realm: "Umbral",
        damage: spellDamageValue(spell, "dotDamage", 0.5, 0.5),
        tick,
        timer: tick,
        remaining: duration,
        ownerId: enemy.id,
        dmgType: "Magical"
      };
      if (players.has(target.id)) {
        const socket = sockets.get(target.id)?.socket;
        if (socket) send(socket, { type: "player:dot", sourceName: `<b>${enemy.name}</b>'s Curse of Disdain`, dot });
      } else {
        target.dots = Array.isArray(target.dots) ? target.dots : [];
        const existing = target.dots.find(candidate => candidate.name === dot.name);
        if (existing) Object.assign(existing, dot);
        else target.dots.push(dot);
      }
      spell.timer = Number(spell.cooldown) || 1.5;
      changed = true;
    } else if (spell.name === "Lifesteal") {
      const damage = spellDamageValue(spell, "damage", 6, 1);
      let dealt = damage;
      world.state.effects = Array.isArray(world.state.effects) ? world.state.effects : [];
      world.state.effects.push({
        id: sharedServerId("effect"),
        type: "lifesteal",
        sourceX: enemy.x,
        sourceY: enemy.y,
        targetX: target.x,
        targetY: target.y,
        age: 0,
        duration: 0.22
      });
      if (players.has(target.id)) {
        const sent = sendDamageToPlayer(target, enemy, damage, "Umbral", `<b>${enemy.name}</b>'s Lifesteal`, "Magical");
        if (!sent) dealt = 0;
      } else {
        const hpBefore = target.hp || 0;
        const combat = damageEnemyFromEnemy(world, target, enemy, damage, "Umbral", `<b>${enemy.name}</b>'s Lifesteal`, "Magical");
        if (combat) combats.push(combat);
        dealt = Math.max(0, hpBefore - (target.hp || 0));
      }
      const healed = roundUpTenth(Math.min(dealt * spellValue(spell, "healMultiplier", 0.5, 0), (enemy.maxHp || enemy.hp || 0) - (enemy.hp || 0)));
      if (healed > 0) enemy.hp += healed;
      spell.timer = Number(spell.cooldown) || 8;
      changed = true;
    } else if (spell.name === "Chain Lightning") {
      if (enemyChainLightning(world, enemy, target, spell, combats, chainLinks)) {
        spell.timer = Number(spell.cooldown) || 6;
        changed = true;
      }
    } else if (spell.name === "Arcane Shield" || spell.name === "Divine Shield") {
      const shieldTarget = injuredEnemyAllyInRange(world, enemy, Number(spell.range) || 8) || enemy;
      const existingShield = (shieldTarget.statMods || []).some(mod => mod?.name === spell.name && Number(mod.shieldAmount) > 0);
      if (existingShield) {
        spell.timer = 1;
        continue;
      }
      const isArcane = spell.name === "Arcane Shield";
      applyEnemyStatMod(shieldTarget, {
        name: spell.name,
        remaining: Number(spell.duration) || 8,
        shieldAmount: spellValue(spell, "shield", 0, 3),
        shieldDamageType: isArcane ? "Magical" : "Physical",
        shieldColor: realmColors[isArcane ? "Ethereal" : "Celestial"],
        realmXpRealm: isArcane ? "Ethereal" : "Celestial"
      });
      spell.timer = Number(spell.cooldown) || 12;
      changed = true;
    } else if (spell.name === "Thorn Shield") {
      applyEnemyStatMod(enemy, {
        name: "Thorn Shield",
        remaining: Number(spell.duration) || 8,
        damage: spellDamageValue(spell, "damage", 0, 0.5),
        lvl: spellLevel(spell),
        thornShield: true
      });
      spell.timer = Number(spell.cooldown) || 24;
      changed = true;
    } else if (spell.name === "Mortify") {
      if (mortifyTarget(target, enemy, spellValue(spell, "duration", 0, 0.5))) {
        spell.timer = Number(spell.cooldown) || 14;
        changed = true;
      }
    } else if (spell.name === "Briar Lash") {
      const damage = spellDamageValue(spell, "damage", 4, 1);
      const statMod = {
        name: "Briar Lash",
        remaining: Number(spell.duration) || 3,
        addStats: { SPD: spellValue(spell, "speedPenalty", -1.5, -0.5) }
      };
      const sourceX = enemy.x;
      const sourceY = enemy.y;
      const targetX = target.x;
      const targetY = target.y;
      world.state.effects = Array.isArray(world.state.effects) ? world.state.effects : [];
      world.state.effects.push({
        id: sharedServerId("effect"),
        type: "briarLash",
        sourceX,
        sourceY,
        targetX,
        targetY,
        x: (sourceX + targetX) / 2,
        y: (sourceY + targetY) / 2,
        radius: Math.max(80, distance({ x: sourceX, y: sourceY }, { x: targetX, y: targetY }) / 2),
        realm: "Sylvan",
        age: 0,
        duration: 0.38
      });
      let landed = false;
      if (players.has(target.id)) {
        landed = sendDamageToPlayer(target, enemy, damage, "Sylvan", `<b>${enemy.name}</b>'s Briar Lash`, "Magical");
      } else {
        const combat = damageEnemyFromEnemy(world, target, enemy, damage, "Sylvan", `<b>${enemy.name}</b>'s Briar Lash`, "Magical");
        if (combat) combats.push(combat);
        landed = Boolean(combat && Number(combat.damage) > 0);
      }
      if (landed) applyStatModToTarget(target, statMod);
      spell.timer = Number(spell.cooldown) || 5;
      changed = true;
    } else if (spell.name === "Faerie Fire") {
      const radius = (spell.aoeRadius || 4) * RANGE_UNIT;
      const defensePenalty = spellValue(spell, "defensePenalty", 0, -0.5);
      world.state.effects = Array.isArray(world.state.effects) ? world.state.effects : [];
      world.state.effects.push({
        id: sharedServerId("effect"),
        type: "faerieFire",
        x: target.x,
        y: target.y,
        ownerId: "server",
        ownerEnemyId: enemy.id,
        age: 0,
        duration: Number(spell.duration ?? 1.2),
        radius,
        statMod: { name: "Faerie Fire", remaining: 6, addStats: { DEF: defensePenalty } }
      });
      const candidates = [
        ...playerList(world.name).filter(player => (player.hp || 0) > 0),
        ...(world.state.enemies || []).filter(other => other && other !== enemy && other.hp > 0)
      ];
      for (const candidate of candidates) {
        if (distance(target, candidate) > radius + (candidate.radius || 18)) continue;
        if (players.has(candidate.id)) {
          if (!enemyHostileToPlayer(enemy, candidate, world) && enemy.targetPlayerId !== candidate.id) continue;
        } else if (!unitHostileToEnemy(enemy, candidate, world)) {
          continue;
        }
        applyStatModToTarget(candidate, { name: "Faerie Fire", remaining: 6, addStats: { DEF: defensePenalty } });
      }
      spell.timer = Number(spell.cooldown) || 8;
      changed = true;
    } else if (spell.name === "Faerie Dust") {
      const lvl = spellLevel(spell);
      applyStatModToTarget(target, {
        name: "Faerie Dust",
        remaining: Number(spell.duration) || 6,
        addStats: { SPD: spellValue(spell, "speedPenalty", 0, -2), AGL: spellValue(spell, "agilityPenalty", 0, -2) },
        addResistances: { Sylvan: spellValue(spell, "sylvanResistPenalty", 0, -1) },
        corporeal: true
      });
      if (!players.has(target.id)) setEnemyTargetEnemy(world, target, enemy);
      spell.timer = Number(spell.cooldown) || 4;
      changed = true;
    }
  }
  return changed;
}

function applyPlayerWeaponAttack(world, playerId, enemyId, enemyIds = [], options = {}) {
  const player = players.get(playerId);
  const combatState = options.combatState && typeof options.combatState === "object" ? options.combatState : null;
  if (player && combatState) {
    if (combatState.stats && typeof combatState.stats === "object") player.stats = combatState.stats;
    if (Array.isArray(combatState.activeSpells)) player.activeSpells = combatState.activeSpells;
    if (Array.isArray(combatState.statMods)) player.statMods = combatState.statMods;
    if (combatState.weapon && typeof combatState.weapon === "object") player.weapon = combatState.weapon;
  }
  const weapon = options.weapon || player?.weapon;
  if (!player || !weapon || !world?.state?.enemies?.length) return false;
  const cooldownKey = options.offHand ? "offHandAttackReadyAt" : "attackReadyAt";
  if ((player[cooldownKey] || 0) > Date.now()) return false;
  const enemy = world.state.enemies.find(candidate => candidate?.id === enemyId);
  if (!enemy) return false;
  if (serverSacredGroveBlocksPlayerTarget(world, player, enemy)) return false;
  const weaponRange = ((weapon.range || 1) * RANGE_UNIT) + (enemy.radius || 18) + (player.radius || 18);
  if (distance(player, enemy) > weaponRange) return false;
  const animation = (weapon.animation || "claw").toLowerCase();
  if (animation === "projectile" && !serverHasLineOfSight(world, player, enemy)) return false;
  const multiplier = options.offHand ? playerOffHandDamageMultiplier(player) : 1;
  if (options.offHand && multiplier <= 0) return false;
  const roll = playerWeaponDamage(player, weapon, world);
  const realmXpOptions = playerWeaponRealmXpOptions(player, weapon, {
    offHand: Boolean(options.offHand),
    forceRealmXp: Boolean(options.realmXp)
  });
  player[cooldownKey] = Date.now() + playerAttackInterval(player, weapon) * 1000;
  if (animation === "projectile") {
    removeInvisibility(player);
    const d = Math.max(1, distance(player, enemy));
    const speed = projectileSpeed(weapon.projectileSpeed || 2);
    const isBowShot = playerWeaponIsBow(weapon);
    const projectile = {
      id: sharedServerId("projectile"),
      x: player.x,
      y: player.y,
      fromX: player.x,
      fromY: player.y,
      vx: ((enemy.x - player.x) / d) * speed,
      vy: ((enemy.y - player.y) / d) * speed,
      distanceTraveled: 0,
      maxDistance: (weapon.range || 1) * RANGE_UNIT * 1.5,
      targetEnemyId: enemy.id,
      targetType: "enemy",
      owner: "player",
      ownerId: player.id,
      damage: roll.total,
      postMitigationDamageMultiplier: options.offHand ? multiplier : 1,
      realm: weapon.realm || "Mortal",
      color: "#d9bd8c",
      label: `${weapon.name || "Weapon"} (${roll.weaponRoll} weapon + ${roll.attack} ATK)`,
      radius: 4,
      speed,
      trail: weaponProjectileTrailColor(weapon),
      dmgType: weapon.dmgType || "Physical",
      ammoDrop: weaponAmmoName(weapon),
      projectileAnimation: weapon.projectileAnimation || "ball",
      sourceKind: "weapon",
      sourceWeapon: weapon,
      ...realmXpOptions,
      daggerMasteryCrit: playerDaggerMasteryCritRealmXp(player, weapon, roll.crit, 1) > 0,
      crit: roll.crit
    };
    if (isBowShot) applyProjectileHit(world, projectile, enemy);
    world.state.projectiles = Array.isArray(world.state.projectiles) ? world.state.projectiles : [];
    world.state.projectiles.push({
      ...projectile,
      damage: isBowShot ? 0 : projectile.damage,
      ammoDrop: isBowShot ? null : projectile.ammoDrop,
      realmXp: isBowShot ? false : projectile.realmXp,
      daggerMasteryCrit: isBowShot ? false : projectile.daggerMasteryCrit,
      visualOnly: isBowShot
    });
    markEnemyProvokedByPlayer(enemy, player.id);
    callForDefense(world, enemy, player);
    acceptWorldRevision(world);
    broadcastToWorld(world.name, worldStatePayload(world, playerId));
    return true;
  }
  const realm = weapon.realm || "Mortal";
  const dmgType = weapon.dmgType || "Physical";
  const targetIds = animation === "slash" && Array.isArray(enemyIds) && enemyIds.length
    ? [...new Set([enemyId, ...enemyIds.map(String)])]
    : [enemyId];
  const combats = [];
  for (const [targetIndex, targetId] of targetIds.entries()) {
    const targetEnemy = world.state.enemies.find(candidate => candidate?.id === targetId);
    if (!targetEnemy) continue;
    if (serverSacredGroveBlocksPlayerTarget(world, player, targetEnemy)) continue;
    const targetRange = ((weapon.range || 1) * RANGE_UNIT) + (targetEnemy.radius || 18) + (player.radius || 18);
    if (distance(player, targetEnemy) > targetRange) continue;
    if (targetId !== enemyId && !serverHasLineOfSight(world, player, targetEnemy)) continue;
    markEnemyProvokedByPlayer(targetEnemy, player.id);
    callForDefense(world, targetEnemy, player);
    removeInvisibility(player);
    clearPacify(targetEnemy);
    if (unitIncorporeal(player) && dmgType === "Physical") {
      combats.push({
        attackerId: playerId,
        enemyId: targetId,
        enemyName: targetEnemy.name || "",
        damage: 0,
        realm,
        crit: roll.crit,
        killed: false,
        label: `${weapon.name || "Weapon"} (${roll.weaponRoll} weapon + ${roll.attack} ATK)`,
        immune: true,
        soundEffect: targetIndex === 0 ? (weapon.soundEffect || "") : ""
      });
      continue;
    }
    if (unitIncorporeal(targetEnemy) && dmgType === "Physical") {
      combats.push({
        attackerId: playerId,
        enemyId: targetId,
        enemyName: targetEnemy.name || "",
        damage: 0,
        realm,
        crit: roll.crit,
        killed: false,
        label: `${weapon.name || "Weapon"} (${roll.weaponRoll} weapon + ${roll.attack} ATK)`,
        immune: true,
        soundEffect: targetIndex === 0 ? (weapon.soundEffect || "") : ""
      });
      continue;
    }
    const mitigated = mitigatedDamage(targetEnemy, roll.total * realmMultiplier(realm, targetEnemy.realm), dmgType, realm, world);
    const damage = absorbShieldDamage(targetEnemy, applyPostMitigationMultiplier(mitigated, options.offHand ? multiplier : 1), dmgType);
    targetEnemy.hp = Math.max(0, (targetEnemy.hp || 0) - damage);
    let stunned = false;
    if (damage > 0 && targetEnemy.hp > 0) {
      maybeApplyPlayerPoison(world, targetEnemy, playerId);
      stunned = maybeApplyPlayerWeaponStun(player, targetEnemy, weapon);
      maybeApplyFrozenTouchServer(player, targetEnemy, weapon);
    }
    const thorn = (targetEnemy.statMods || []).find(mod => mod.thornShield);
    const closeRange = (weapon.animation || "claw").toLowerCase() !== "projectile" && (weapon.range || 1) <= 3;
    if (damage > 0 && targetEnemy.hp > 0 && thorn && closeRange) {
      sendDamageToPlayer(player, targetEnemy, Number(thorn.damage) || 0, "Sylvan", `<b>${targetEnemy.name}</b>'s Thorn Shield`, "Magical");
    }
    const burningSkinDamage = burningSkinServerDamage(targetEnemy);
    if (damage > 0 && targetEnemy.hp > 0 && burningSkinDamage > 0 && closeRange) {
      sendDamageToPlayer(player, targetEnemy, burningSkinDamage, "Infernal", `<b>${targetEnemy.name}</b>'s Burning Skin`, "Magical");
    }
    if (targetEnemy.hp <= 0) serverKillEnemy(world, targetEnemy, playerId);
    const daggerCritRealmXp = playerDaggerMasteryCritRealmXp(player, weapon, roll.crit, damage);
    const realmXpAmount = realmXpOptions.realmXp ? damage : daggerCritRealmXp;
    combats.push({
      attackerId: playerId,
      enemyId: targetId,
      enemyName: targetEnemy.name || "",
      damage,
      realm,
      crit: roll.crit,
      killed: targetEnemy.hp <= 0,
      label: `${weapon.name || "Weapon"} (${roll.weaponRoll} weapon + ${roll.attack} ATK)`,
      soundEffect: stunned ? "poison" : targetIndex === 0 ? (weapon.soundEffect || "") : "",
      stunned,
      realmXp: realmXpAmount,
      realmXpRealm: realmXpAmount > 0 ? (realmXpOptions.realmXpRealm || "Mortal") : undefined
    });
  }
  if (!combats.length) return false;
  acceptWorldRevision(world);
  broadcastToWorld(world.name, {
    ...worldStatePayload(world, playerId),
    combats
  });
  return true;
}

function createPlayerSpellProjectile(world, playerId, message) {
  const player = players.get(playerId);
  if (!player || !world?.state?.enemies?.length) return false;
  const enemyId = String(message.enemyId || "");
  const enemy = world.state.enemies.find(candidate => candidate?.id === enemyId);
  if (!enemy) return false;
  if (serverSacredGroveBlocksPlayerTarget(world, player, enemy)) return false;
  const range = Number(message.range) || 10;
  const projectileRange = (range * RANGE_UNIT) + (enemy.radius || 18) + (player.radius || 18);
  if (distance(player, enemy) > projectileRange) return false;
  if (!serverHasLineOfSight(world, player, enemy)) return false;
  if (Number(message.damage) > 0) removeInvisibility(player);
  const d = Math.max(1, distance(player, enemy));
  const speed = Math.max(80, Math.min(600, Number(message.speed) || 330));
  world.state.projectiles = Array.isArray(world.state.projectiles) ? world.state.projectiles : [];
  world.state.projectiles.push({
    id: sharedServerId("projectile"),
    x: player.x,
    y: player.y,
    fromX: player.x,
    fromY: player.y,
    vx: ((enemy.x - player.x) / d) * speed,
    vy: ((enemy.y - player.y) / d) * speed,
    distanceTraveled: 0,
    maxDistance: range * RANGE_UNIT * 1.5,
    targetEnemyId: enemy.id,
    targetType: "enemy",
    owner: "player",
    ownerId: player.id,
    damage: roundUpTenth(Math.max(0, Number(message.damage) || 0)),
    realm: normalizeRealm(String(message.realm || "Mortal").slice(0, 20)),
    color: String(message.color || "#d9bd8c").slice(0, 20),
    label: String(message.label || "Spell").slice(0, 80),
    radius: Math.max(2, Math.min(18, Number(message.radius) || 5)),
    speed,
    trail: String(message.trail || "#8e6845").slice(0, 20),
    dmgType: String(message.dmgType || "Magical").slice(0, 20),
    realmXp: Boolean(message.realmXp),
    projectileAnimation: String(message.projectileAnimation || "ball").slice(0, 80),
    statMod: message.statMod && typeof message.statMod === "object" ? message.statMod : null,
    dot: message.dot && typeof message.dot === "object" ? {
      ...message.dot,
      damage: roundUpTenth(Math.max(0, Number(message.dot.damage) || 0)),
      ownerId: player.id
    } : null,
    crit: false
  });
  markEnemyProvokedByPlayer(enemy, player.id);
  callForDefense(world, enemy, player);
  acceptWorldRevision(world);
  broadcastToWorld(world.name, worldStatePayload(world, playerId));
  return true;
}

function applyDirectSpell(world, playerId, message) {
  const enemyId = String(message.enemyId || "");
  const enemy = world.state.enemies.find(candidate => candidate?.id === enemyId);
  const player = players.get(playerId);
  if (!enemy || !player) return false;
  const spellName = String(message.spellName || "Spell").slice(0, 80);
  const realm = normalizeRealm(String(message.realm || "Mortal").slice(0, 20));
  const socket = sockets.get(playerId)?.socket;
  const rejectDirectSpell = reason => {
    if (socket) send(socket, { type: "spell:rejected", spellName, reason });
    return false;
  };
  const range = Number(message.range) || 0;
  if (message.tameBeast || message.unholyDominion) {
    const maxLevel = Math.max(1, Number(message.maxLevel) || 1);
    const isUnholyDominion = Boolean(message.unholyDominion);
    if (range > 0 && distance(player, enemy) > (range * RANGE_UNIT) + (enemy.radius || 18) + (player.radius || 18)) {
      return rejectDirectSpell(`<b>${enemy.name}</b> is out of range.`);
    }
    if (protectedFromPlayerEffects(enemy, player)) {
      return rejectDirectSpell(`<b>${enemy.name}</b> is protected.`);
    }
    const validTargetType = isUnholyDominion
      ? unitTypeIsDaemon(enemy)
      : enemy.type === "Beast";
    if (enemy.pet) return rejectDirectSpell(`<b>${enemy.name}</b> is already bound.`);
    if (!validTargetType) return rejectDirectSpell(`<b>${spellName}</b> can only target ${isUnholyDominion ? "Daemons" : "Beasts"}.`);
    if ((enemy.lvl || 1) > maxLevel) return rejectDirectSpell(`<b>${enemy.name}</b> is too strong for <b>${spellName}</b>.`);
    removeInvisibility(player);
    enemy.pet = true;
    enemy.masterId = playerId;
    enemy.masterName = player.name || "Soulreaper";
    enemy.petCommand = "follow";
    enemy.petTargetId = null;
    enemy.petDuration = Math.max(1, Number(message.duration) || PET_DURATION_SECONDS);
    enemy.petTimeRemaining = enemy.petDuration;
    enemy.noLoot = true;
    enemy.hostileToPlayer = false;
    enemy.hostileTarget = null;
    enemy.targetPlayerId = null;
    enemy.hostileToPlayerReason = null;
    enemy.hostileTargetId = null;
    enemy.pacified = 0;
    enemy.leashState = "idle";
    delete enemy.triggerX;
    delete enemy.triggerY;
    world.state.effects = Array.isArray(world.state.effects) ? world.state.effects : [];
    world.state.effects.push({
      id: sharedServerId("effect"),
      type: "raiseSkeleton",
      x: enemy.x,
      y: enemy.y,
      age: 0,
      duration: 0.75,
      color: isUnholyDominion ? "Infernal" : "Sylvan"
    });
    if (isUnholyDominion && socket) {
      send(socket, { type: "player:virtue", amount: -1 });
      send(socket, {
        type: "spell:pet-accepted",
        spellName,
        enemyId: enemy.id,
        enemyName: enemy.name,
        enemyType: enemy.type,
        pet: publicEnemyState(enemy)
      });
      send(socket, { type: "quest:unholy-dominion", enemyId: enemy.id, enemyName: enemy.name });
    } else if (message.tameBeast && socket) {
      send(socket, {
        type: "spell:pet-accepted",
        spellName,
        enemyId: enemy.id,
        enemyName: enemy.name,
        enemyType: enemy.type,
        pet: publicEnemyState(enemy)
      });
      send(socket, { type: "quest:tame-beast", enemyId: enemy.id, enemyName: enemy.name });
    }
    acceptWorldRevision(world);
    broadcastToWorld(world.name, worldStatePayload(world, playerId));
    return true;
  }
  if (range > 0 && distance(player, enemy) > (range * RANGE_UNIT) + (enemy.radius || 18) + (player.radius || 18)) return false;
  if (!serverHasLineOfSight(world, player, enemy)) return false;
  if (protectedFromPlayerEffects(enemy, player)) return false;
  if (serverSacredGroveBlocksPlayerTarget(world, player, enemy)) return false;
  if (spellName === "Shield Bash" && !serverPlayerHasEquippedShield(player)) return false;
  removeInvisibility(player);
  if (message.effectType === "briarLash") {
    const sourceX = Number(message.sourceX) || player.x;
    const sourceY = Number(message.sourceY) || player.y;
    const targetX = Number(message.targetX) || enemy.x;
    const targetY = Number(message.targetY) || enemy.y;
    world.state.effects = Array.isArray(world.state.effects) ? world.state.effects : [];
    world.state.effects.push({
      id: sharedServerId("effect"),
      type: "briarLash",
      sourceX,
      sourceY,
      targetX,
      targetY,
      x: (sourceX + targetX) / 2,
      y: (sourceY + targetY) / 2,
      radius: Math.max(80, distance({ x: sourceX, y: sourceY }, { x: targetX, y: targetY }) / 2),
      realm,
      age: 0,
      duration: 0.38
    });
  }
  let combat = null;
  if (Number(message.damage) > 0) {
    combat = applyServerDamageToEnemy(world, enemy, playerId, roundUpTenth(Number(message.damage) || 0), realm, spellName, message.dmgType || "Magical", { realmXp: Boolean(message.realmXp) });
  } else {
    markEnemyProvokedByPlayer(enemy, playerId);
    callForDefense(world, enemy, player);
  }
  if (!world.state.enemies.includes(enemy)) {
    if (combat && Number(message.healFraction) > 0) {
      const socket = sockets.get(playerId)?.socket;
      if (socket) send(socket, { type: "player:heal", amount: roundUpTenth(combat.damage * Number(message.healFraction)), sourceName: spellName });
    }
    acceptWorldRevision(world);
    broadcastToWorld(world.name, {
      ...worldStatePayload(world, playerId),
      ...(combat ? { combat } : {})
    });
    return true;
  }
  if (Number(message.rooted) > 0) {
    enemy.rooted = Math.max(enemy.rooted || 0, freezeDurationFor(enemy, Number(message.rooted)));
    enemy.rootVisual = message.rootVisual || (spellName === "Spiderweb" ? "spiderweb" : "tangle-vine");
  }
  if (Number(message.stunned) > 0 && (!combat || Number(combat.damage) > 0)) {
    enemy.stunned = Math.max(enemy.stunned || 0, freezeDurationFor(enemy, Number(message.stunned)));
  }
  if (Number(message.mortified) > 0) {
    enemy.mortified = Math.max(enemy.mortified || 0, Number(message.mortified));
    enemy.mortifySourceX = Number(message.mortifySourceX) || player.x;
    enemy.mortifySourceY = Number(message.mortifySourceY) || player.y;
    enemy.hostileToPlayer = false;
    enemy.targetPlayerId = null;
    enemy.hostileToPlayerReason = null;
    enemy.hostileTargetId = null;
    enemy.hostileTarget = null;
    enemy.leashState = "idle";
  }
  if (message.dot && typeof message.dot === "object") {
    if (String(message.dot.name || spellName) === "Virulent Plague") {
      applyVirulentPlagueToEnemy(world, enemy, { ...message.dot, ownerId: playerId });
      return true;
    }
    enemy.dots = Array.isArray(enemy.dots) ? enemy.dots : [];
    const dotName = String(message.dot.name || spellName).slice(0, 80);
    const existing = enemy.dots.find(dot => dot.name === dotName);
    const dot = {
      ...message.dot,
      name: dotName,
      damage: roundUpTenth(Math.max(0, Number(message.dot.damage) || 0)),
      ownerId: playerId,
      timer: Number(message.dot.timer ?? message.dot.tick ?? 1),
      remaining: Number(message.dot.remaining ?? message.dot.duration ?? 1)
    };
    if (existing) Object.assign(existing, dot);
    else enemy.dots.push(dot);
  }
  if (Number(message.pacified) > 0) {
    enemy.hostileToPlayer = false;
    enemy.targetPlayerId = null;
    enemy.hostileToPlayerReason = null;
    enemy.pacified = Math.max(enemy.pacified || 0, Number(message.pacified));
  }
  if (message.statMod && typeof message.statMod === "object") {
    applyEnemyStatMod(enemy, {
      ...message.statMod,
      name: String(message.statMod.name || spellName).slice(0, 80),
      remaining: Math.max(0, Number(message.statMod.remaining) || 0)
    });
  }
  if (combat && Number(message.healFraction) > 0) {
    const socket = sockets.get(playerId)?.socket;
    if (socket) send(socket, { type: "player:heal", amount: roundUpTenth(combat.damage * Number(message.healFraction)), sourceName: spellName });
  }
  acceptWorldRevision(world);
  broadcastToWorld(world.name, {
    ...worldStatePayload(world, playerId),
    ...(combat ? { combat } : {})
  });
  return true;
}

function serverChainJumpAllowed(casterAlignment, target) {
  if (casterAlignment !== "Good" && casterAlignment !== "Evil") return true;
  return enemyAlignment(target) !== casterAlignment;
}

function nearestServerEnemyFrom(world, origin, range, excluded = [], casterAlignment = "Neutral") {
  let best = null;
  let bestDistance = Infinity;
  for (const enemy of world.state.enemies || []) {
    if (!enemy || enemy.hp <= 0 || excluded.includes(enemy)) continue;
    if (!serverChainJumpAllowed(casterAlignment, enemy)) continue;
    const d = distance(origin, enemy);
    if (d > range * RANGE_UNIT + (enemy.radius || 18) || d >= bestDistance) continue;
    if (!serverHasLineOfSight(world, origin, enemy)) continue;
    best = enemy;
    bestDistance = d;
  }
  return best;
}

function applyChainSpell(world, playerId, message) {
  const player = players.get(playerId);
  if (!player) return false;
  const first = world.state.enemies.find(enemy => enemy?.id === String(message.enemyId || ""));
  if (!first) return false;
  if (serverSacredGroveBlocksPlayerTarget(world, player, first)) return false;
  const range = Number(message.range) || 8;
  if (distance(player, first) > range * RANGE_UNIT + (first.radius || 18) + (player.radius || 18)) return false;
  if (!serverHasLineOfSight(world, player, first)) return false;
  removeInvisibility(player);
  const realm = normalizeRealm(String(message.realm || "Celestial").slice(0, 20));
  const firstDamage = roundUpTenth(Number(message.damage) || 0);
  const jumps = Math.max(0, Math.min(6, Number(message.jumps) || 3));
  const jumpMultiplier = Math.max(0, Math.min(4, Number(message.jumpDamageMultiplier) || 0.75));
  const combats = [];
  const hit = [];
  const chainLinks = [];
  let current = first;
  let previous = player;
  const casterAlignment = player.alignment || "Neutral";
  for (let i = 0; i <= jumps && current; i += 1) {
    chainLinks.push({ sourceX: previous.x, sourceY: previous.y, targetX: current.x, targetY: current.y, realm });
    hit.push(current);
    const damage = roundUpTenth(firstDamage * (i === 0 ? 1 : jumpMultiplier ** i));
    const combat = applyServerDamageToEnemy(world, current, playerId, damage, realm, "Chain Lightning", "Magical", { realmXp: Boolean(message.realmXp) });
    if (!combat.rejected) {
      Object.assign(combat, {
        sourceX: previous.x,
        sourceY: previous.y,
        targetX: current.x,
        targetY: current.y
      });
      combats.push(combat);
    }
    previous = current;
    current = nearestServerEnemyFrom(world, current, range, hit, casterAlignment);
  }
  if (!combats.length) return false;
  acceptWorldRevision(world);
  broadcastToWorld(world.name, {
    ...worldStatePayload(world, playerId),
    combats,
    chainLinks
  });
  return true;
}

function createServerEffect(world, playerId, message) {
  const player = players.get(playerId);
  if (!player) return false;
  const effectType = String(message.effectType || "").slice(0, 40);
  if (!["fireblast", "iceStorm", "faerieFire", "faerieCircle", "darkCircle", "graceFromAbove", "ring", "sacredGrove"].includes(effectType)) return false;
  const range = Number(message.range) || 0;
  const x = Number(message.x) || player.x;
  const y = Number(message.y) || player.y;
  if (range > 0 && distance(player, { x, y }) > range * RANGE_UNIT) return false;
  if (range > 0 && !serverHasLineOfSight(world, player, { x, y })) return false;
  world.state.effects = Array.isArray(world.state.effects) ? world.state.effects : [];
  const effect = {
    id: sharedServerId("effect"),
    type: effectType,
    ownerId: playerId,
    x,
    y,
    realm: normalizeRealm(String(message.realm || "Mortal").slice(0, 20)),
    damage: roundUpTenth(Math.max(0, Number(message.damage) || 0)),
    age: 0,
    duration: Math.max(0.1, Number(message.duration) || 1),
    tick: Math.max(0.1, Number(message.tick) || 1),
    tickTimer: 0,
    radius: Math.max(1, Number(message.radius) || RANGE_UNIT),
    heal: roundUpTenth(Math.max(0, Number(message.heal) || 0)),
    statMod: message.statMod && typeof message.statMod === "object" ? message.statMod : null,
    castId: String(message.castId || "").slice(0, 80),
    realmXp: Boolean(message.realmXp)
  };
  world.state.effects.push(effect);
  acceptWorldRevision(world);
  broadcastToWorld(world.name, worldStatePayload(world, playerId));
  return true;
}

function summonServerPortal(world, playerId, message) {
  const player = players.get(playerId);
  if (!player) return false;
  const x = Number(message.x);
  const y = Number(message.y);
  const range = Number(message.range) || 0;
  if (!Number.isFinite(x) || !Number.isFinite(y)) return false;
  if (range > 0 && distance(player, { x, y }) > range * RANGE_UNIT) return false;
  if (range > 0 && !serverHasLineOfSight(world, player, { x, y })) return false;
  const area = serverAreaAt(world, x, y);
  if (!area) return false;
  const areaName = typeof area === "object" && area.name
    ? area.name
    : String(message.areaName || player.area || "The Black Wilds").slice(0, 80);
  world.state.effects = Array.isArray(world.state.effects) ? world.state.effects : [];
  const ownerEffects = world.state.effects
    .filter(effect => (effect.type === "portal" || effect.type === "portalMarker") && effect.ownerId === playerId)
    .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  const marker = ownerEffects.find(effect => effect.type === "portalMarker");
  const now = Date.now();
  if (marker) {
    marker.type = "portal";
    marker.radius = 30;
    marker.age = 0;
    marker.areaName = marker.areaName || serverAreaAt(world, marker.x, marker.y)?.name || "The Black Wilds";
    world.state.effects.push({
      id: sharedServerId("portal"),
      type: "portal",
      ownerId: playerId,
      ownerName: player.name || "Soulreaper",
      x,
      y,
      radius: 30,
      age: 0,
      createdAt: now,
      areaName
    });
  } else {
    const portals = ownerEffects.filter(effect => effect.type === "portal");
    if (portals.length >= 2) {
      const target = String(message.replace || "").toLowerCase() === "destination" ? portals[1] : portals[0];
      target.x = x;
      target.y = y;
      target.radius = 30;
      target.age = 0;
      target.areaName = areaName;
    } else {
      world.state.effects.push({
        id: sharedServerId("portal-marker"),
        type: "portalMarker",
        ownerId: playerId,
        ownerName: player.name || "Soulreaper",
        x,
        y,
        radius: 24,
        age: 0,
        createdAt: now,
        areaName
      });
    }
  }
  acceptWorldRevision(world);
  broadcastToWorld(world.name, worldStatePayload(world, playerId));
  return true;
}

function applyPlayerTargetSpell(world, playerId, message) {
  const caster = players.get(playerId);
  const targetId = String(message.targetPlayerId || playerId);
  const target = players.get(targetId);
  if (!caster || !target || caster.world !== target.world) return false;
  if (!serverHasLineOfSight(world, caster, target)) return false;
  const spellName = String(message.spellName || "Spell").slice(0, 80);
  const socket = sockets.get(targetId)?.socket;
  if (!socket) return false;
  if (Number(message.heal) > 0) {
    send(socket, {
      type: "player:heal",
      amount: roundUpTenth(Number(message.heal) || 0),
      sourceName: spellName,
      animation: spellName === "Basic Prayer" || spellName === "Bone Ritual" ? "prayer" : null,
      palette: message.palette || null
    });
    broadcastPlayerBuffEffect(caster.world, target, spellName, null, {
      animation: spellName === "Basic Prayer" || spellName === "Bone Ritual" || spellName === "Heavenly Light" ? "prayer" : "heal",
      palette: message.palette || null
    });
  }
  if (message.statMod && typeof message.statMod === "object") {
    target.statMods = Array.isArray(target.statMods) ? target.statMods : [];
    const normalized = {
      ...message.statMod,
      name: String(message.statMod.name || spellName).slice(0, 80),
      remaining: Math.max(0, Number(message.statMod.remaining) || 0)
    };
    const existing = target.statMods.find(candidate => candidate.name === normalized.name);
    if (existing) Object.assign(existing, normalized);
    else target.statMods.push(normalized);
    send(socket, {
      type: "player:statmod",
      sourceName: spellName,
      statMod: normalized
    });
    broadcastPlayerBuffEffect(caster.world, target, spellName, normalized);
  }
  return true;
}

function applyUnitHealSpell(world, playerId, message) {
  const caster = players.get(playerId);
  const enemy = world.state?.enemies?.find(candidate => candidate?.id === String(message.enemyId || ""));
  if (!caster || !enemy || enemy.hp <= 0) return false;
  if (!serverHasLineOfSight(world, caster, enemy)) return false;
  const heal = roundUpTenth(Math.max(0, Number(message.heal) || 0));
  const spellName = String(message.spellName || "Spell").slice(0, 80);
  if ((spellName === "Basic Prayer" || spellName === "Heavenly Light") && isUmbralRevenantEnemy(enemy)) {
    const combat = applyServerDamageToEnemy(world, enemy, playerId, heal, "Celestial", spellName, "Magical", { realmXp: true });
    world.state.effects = Array.isArray(world.state.effects) ? world.state.effects : [];
    world.state.effects.push({
      type: "prayer",
      age: 0,
      duration: 0.75,
      x: enemy.x,
      y: enemy.y,
      palette: message.palette || null
    });
    acceptWorldRevision(world);
    broadcastToWorld(world.name, {
      ...worldStatePayload(world, playerId),
      ...(combat ? { combat } : {})
    });
    return true;
  }
  const hasStatMod = message.statMod && typeof message.statMod === "object";
  if (heal <= 0 && !hasStatMod) return false;
  if (heal > 0) {
    if (enemy.hp >= enemy.maxHp) return false;
    enemy.hp = roundUpTenth(Math.min(enemy.maxHp, enemy.hp + heal));
  }
  if (hasStatMod) {
    applyEnemyStatMod(enemy, {
      ...message.statMod,
      name: String(message.statMod.name || spellName).slice(0, 80),
      remaining: Math.max(0, Number(message.statMod.remaining) || 0)
    });
  }
  world.state.effects = Array.isArray(world.state.effects) ? world.state.effects : [];
  if (heal > 0 || spellName === "Bone Ritual") {
    world.state.effects.push({
      type: "prayer",
      age: 0,
      duration: 0.75,
      x: enemy.x,
      y: enemy.y,
      palette: message.palette || null
    });
  }
  if (spellName === "Chlorophyll") {
    world.state.effects.push({
      type: "chlorophyllSparkle",
      age: 0,
      duration: 0.85,
      x: enemy.x,
      y: enemy.y,
      radius: enemy.radius || 18
    });
  }
  acceptWorldRevision(world);
  broadcastToWorld(world.name, worldStatePayload(world, playerId));
  return true;
}

function applyProjectileHit(world, projectile, enemy) {
  if (projectile.owner === "player" && enemy.pet && enemy.masterId === projectile.ownerId) return;
  const projectileSource = projectile.owner === "player" ? players.get(projectile.ownerId) : world.state.enemies.find(candidate => candidate?.id === projectile.ownerId);
  if (projectile.owner === "player" && projectile.ownerId) {
    markEnemyProvokedByPlayer(enemy, projectile.ownerId);
    if (projectileSource) callForDefense(world, enemy, projectileSource);
  }
  if (projectileSource?.pet && unitFriendlyToPetMaster(projectileSource, enemy)) return;
  const creditId = projectile.ownerCreditId || projectile.ownerId;
  const petRealmXpRealm = petDamageRealmXpRealm(projectileSource);
  if (unitIncorporeal(projectileSource) && (projectile.dmgType || "Magical") === "Physical") {
    maybeDropProjectileAmmo(world, projectile, enemy);
    broadcastToWorld(world.name, {
      ...worldStatePayload(world, creditId || "server"),
      combat: {
        attackerId: creditId,
        enemyId: enemy.id,
        enemyName: enemy.name || "",
        damage: 0,
        realm: projectile.realm || "Mortal",
        crit: projectile.crit,
        killed: false,
        label: projectile.label || "Projectile",
        immune: true
      }
    });
    return;
  }
  if (unitIncorporeal(enemy) && (projectile.dmgType || "Magical") === "Physical") {
    maybeDropProjectileAmmo(world, projectile, enemy);
    broadcastToWorld(world.name, {
      ...worldStatePayload(world, creditId || "server"),
      combat: {
        attackerId: creditId,
        enemyId: enemy.id,
        enemyName: enemy.name || "",
        damage: 0,
        realm: projectile.realm || "Mortal",
        crit: projectile.crit,
        killed: false,
        label: projectile.label || "Projectile",
        immune: true
      }
    });
    return;
  }
  const mitigated = mitigatedDamage(
    enemy,
    (projectile.damage || 0) * realmMultiplier(projectile.realm || "Mortal", enemy.realm),
    projectile.dmgType || "Magical",
    projectile.realm || "Mortal",
    world
  );
  const damage = applyPostMitigationMultiplier(mitigated, projectile.postMitigationDamageMultiplier || 1);
  enemy.hp = Math.max(0, (enemy.hp || 0) - damage);
  maybeDropProjectileAmmo(world, projectile, enemy);
  if (projectile.statMod && enemy.hp > 0) {
    applyEnemyStatMod(enemy, {
      ...projectile.statMod,
      remaining: freezeDurationFor(enemy, Number(projectile.statMod.remaining) || 4)
    });
  }
  if (projectile.owner === "player" && projectile.sourceKind === "weapon" && damage > 0 && enemy.hp > 0) {
    maybeApplyPlayerPoison(world, enemy, projectile.ownerId);
    const owner = players.get(projectile.ownerId);
    if (owner && maybeApplyPlayerWeaponStun(owner, enemy, projectile.sourceWeapon || owner.weapon)) {
      projectile.stunned = true;
    }
  }
  if (enemy.hp <= 0) {
    serverKillEnemy(world, enemy, creditId);
  } else if (projectile.dot && typeof projectile.dot === "object") {
    if (String(projectile.dot.name || projectile.label || "Burn") === "Virulent Plague") {
      applyVirulentPlagueToEnemy(world, enemy, { ...projectile.dot, ownerId: creditId });
    } else {
      enemy.dots = Array.isArray(enemy.dots) ? enemy.dots : [];
      const dotName = String(projectile.dot.name || projectile.label || "Burn").slice(0, 80);
      const existing = enemy.dots.find(dot => dot.name === dotName);
      const dot = {
        ...projectile.dot,
        name: dotName,
        ownerId: creditId,
        timer: Number(projectile.dot.timer ?? projectile.dot.tick ?? 1),
        remaining: Number(projectile.dot.remaining ?? projectile.dot.duration ?? 1)
      };
      if (existing) Object.assign(existing, dot);
      else enemy.dots.push(dot);
    }
  }
  broadcastToWorld(world.name, {
    ...worldStatePayload(world, creditId || "server"),
    combat: {
      attackerId: creditId,
      enemyId: enemy.id,
      enemyName: enemy.name || "",
      enemyRealm: enemy.realm || "Mortal",
      damage,
      realm: projectile.realm || "Mortal",
      crit: projectile.crit,
      killed: enemy.hp <= 0,
      label: projectile.label || "Projectile",
      realmXp: (projectile.realmXp || petRealmXpRealm || projectile.daggerMasteryCrit) ? damage : 0,
      realmXpRealm: projectile.realmXpRealm || petRealmXpRealm || (projectile.daggerMasteryCrit ? "Mortal" : undefined),
      soundEffect: projectile.stunned ? "poison" : "",
      stunned: Boolean(projectile.stunned)
    }
  });
}

function applyVirulentPlagueToEnemy(world, target, sourceDot) {
  if (!world || !target || target.hp <= 0 || !sourceDot) return false;
  const owner = sourceDot.ownerId ? players.get(sourceDot.ownerId) : null;
  if (target.pet && owner && unitFriendlyToPetMaster(target, owner)) return false;
  if (protectedFromPlayerEffects(target, owner)) return false;
  target.dots = Array.isArray(target.dots) ? target.dots : [];
  const existing = normalizeServerVirulentPlagueDots(target);
  const tick = 1;
  const remaining = Math.max(0.1, Number(sourceDot.remaining ?? sourceDot.duration ?? 15) || 15);
  const damage = roundUpTenth(Math.max(0, Number(sourceDot.damage) || 0));
  if (damage <= 0) return false;
  const dot = {
    ...sourceDot,
    name: "Virulent Plague",
    realm: "Umbral",
    damage,
    tick,
    timer: Math.max(0.05, Math.min(Number(sourceDot.timer ?? tick) || tick, tick)),
    remaining,
    duration: Number(sourceDot.duration ?? 15) || 15,
    dmgType: "Magical",
    realmXp: sourceDot.realmXp !== false,
    realmXpRealm: sourceDot.realmXpRealm || "Umbral",
    spreadRange: Number(sourceDot.spreadRange ?? 3) || 3
  };
  if (existing) {
    Object.assign(existing, dot, {
      tick,
      timer: Math.max(0.05, Math.min(Number(existing.timer ?? tick) || tick, dot.timer, tick)),
      remaining: Math.max(Number(existing.remaining ?? 0) || 0, dot.remaining)
    });
  } else {
    target.dots.push(dot);
  }
  if (sourceDot.spreadInfection && sourceDot.ownerId) {
    const hostileIds = new Set(Array.isArray(target.plagueHostilePlayerIds) ? target.plagueHostilePlayerIds : []);
    for (const memberId of teamMemberIdsForPlayer(sourceDot.ownerId)) hostileIds.add(memberId);
    target.plagueHostilePlayerIds = [...hostileIds];
    target.hostileToPlayerReason = target.hostileToPlayerReason || "plague";
    target.targetPlayerId = target.targetPlayerId || sourceDot.ownerId;
    rememberServerEnemyTrigger(target);
  }
  return true;
}

function normalizeServerVirulentPlagueDots(unit) {
  if (!unit || !Array.isArray(unit.dots)) return null;
  const plagues = unit.dots.filter(dot => dot?.name === "Virulent Plague");
  if (!plagues.length) return null;
  const keep = plagues.reduce((best, dot) => {
    const bestDamage = Number(best.damage) || 0;
    const dotDamage = Number(dot.damage) || 0;
    if (dotDamage !== bestDamage) return dotDamage > bestDamage ? dot : best;
    return (Number(dot.remaining) || 0) > (Number(best.remaining) || 0) ? dot : best;
  }, plagues[0]);
  unit.dots = unit.dots.filter(dot => dot?.name !== "Virulent Plague" || dot === keep);
  keep.tick = 1;
  keep.timer = Math.max(0.05, Math.min(Number(keep.timer ?? 1) || 1, 1));
  return keep;
}

function spreadVirulentPlagueFromEnemy(world, source, sourceDot) {
  if (!world || !source || source.hp <= 0 || !sourceDot || sourceDot.name !== "Virulent Plague") return false;
  const range = Math.max(0, Number(sourceDot.spreadRange ?? 3) || 3) * RANGE_UNIT;
  let changed = false;
  for (const target of world.state.enemies || []) {
    if (!target || target === source || target.hp <= 0) continue;
    if (distance(source, target) > range + (source.radius || 0) + (target.radius || 0)) continue;
    changed = applyVirulentPlagueToEnemy(world, target, { ...sourceDot, spreadInfection: true }) || changed;
  }
  return changed;
}

function tickEnemyDots(world, enemy, dt, combats) {
  if (!Array.isArray(enemy.dots) || !enemy.dots.length) return false;
  let changed = false;
  let virulentPlagueSeen = false;
  for (const dot of [...enemy.dots]) {
    if (dot.name === "Virulent Plague") {
      const keep = normalizeServerVirulentPlagueDots(enemy);
      if (dot !== keep) {
        changed = true;
        continue;
      }
      if (virulentPlagueSeen) {
        enemy.dots.splice(enemy.dots.indexOf(dot), 1);
        changed = true;
        continue;
      }
      virulentPlagueSeen = true;
    }
    dot.timer = (dot.timer ?? dot.tick ?? 1) - dt;
    dot.remaining = (dot.remaining ?? 0) - dt;
    if (dot.name === "Virulent Plague" && dot.remaining > 0) {
      changed = spreadVirulentPlagueFromEnemy(world, enemy, dot) || changed;
    }
    if (dot.timer <= 0) {
      dot.timer += dot.tick || 1;
      const realm = dot.realm || "Mortal";
      const dmgType = dot.dmgType || "Magical";
      const damage = absorbShieldDamage(enemy, mitigatedDamage(
        enemy,
        (Number(dot.damage) || 0) * realmMultiplier(realm, enemy.realm),
        dmgType,
        realm,
        world
      ), dmgType);
      enemy.hp = Math.max(0, (enemy.hp || 0) - damage);
      combats.push({
        attackerId: dot.ownerId || null,
        enemyId: enemy.id,
        damage,
        realm,
        crit: false,
        killed: enemy.hp <= 0,
        label: dot.name || "Damage over time",
        realmXp: dot.realmXp ? damage : 0,
        realmXpRealm: dot.realmXpRealm || undefined
      });
      changed = true;
      if (enemy.hp <= 0) {
        serverKillEnemy(world, enemy, dot.ownerId);
        return true;
      }
    }
    if (dot.remaining <= 0) {
      enemy.dots.splice(enemy.dots.indexOf(dot), 1);
      changed = true;
    }
  }
  return changed;
}

function tickProjectiles(world, dt) {
  if (!world?.state?.projectiles?.length) return false;
  let changed = false;
  for (let i = world.state.projectiles.length - 1; i >= 0; i -= 1) {
    const projectile = world.state.projectiles[i];
    const prevX = projectile.x || 0;
    const prevY = projectile.y || 0;
    const stepX = (projectile.vx || 0) * dt;
    const stepY = (projectile.vy || 0) * dt;
    projectile.x += stepX;
    projectile.y += stepY;
    projectile.distanceTraveled = (projectile.distanceTraveled || 0) + Math.hypot(stepX, stepY);
    changed = true;
    if (projectile.distanceTraveled >= (projectile.maxDistance || Infinity)) {
      world.state.projectiles.splice(i, 1);
      continue;
    }
    if (projectile.targetType === "enemy") {
      const enemy = world.state.enemies.find(candidate => candidate?.id === projectile.targetEnemyId);
      if (!enemy) {
        world.state.projectiles.splice(i, 1);
        continue;
      }
      if (projectileIntersectsTarget(projectile, enemy, prevX, prevY, projectile.x, projectile.y)) {
        world.state.projectiles.splice(i, 1);
        if (!projectile.visualOnly) applyProjectileHit(world, projectile, enemy);
      }
    } else if (projectile.targetType === "player") {
      const player = players.get(projectile.targetPlayerId);
      if (!player || player.hp <= 0) {
        world.state.projectiles.splice(i, 1);
        continue;
      }
      if (projectileIntersectsTarget(projectile, player, prevX, prevY, projectile.x, projectile.y)) {
        world.state.projectiles.splice(i, 1);
        if (projectile.visualOnly) continue;
        const sourceEnemy = world.state.enemies.find(enemy => enemy?.id === projectile.ownerId);
        if (sourceEnemy?.pet && unitFriendlyToPetMaster(sourceEnemy, player)) continue;
        if (unitIncorporeal(sourceEnemy) && (projectile.dmgType || "Physical") === "Physical") continue;
        const targetSocket = sockets.get(player.id)?.socket;
        if (targetSocket) {
          send(targetSocket, {
            type: "player:damage",
            enemy: { name: projectile.label || "Enemy projectile", realm: projectile.realm || "Mortal" },
            amount: projectile.damage || 0,
            realm: projectile.realm || "Mortal",
            dmgType: projectile.dmgType || "Physical",
            sourceName: projectile.label || "Enemy projectile"
          });
          if (projectile.dot && typeof projectile.dot === "object") {
            send(targetSocket, {
              type: "player:dot",
              sourceName: projectile.label || "Enemy projectile",
              dot: {
                ...projectile.dot,
                timer: Number(projectile.dot.timer ?? projectile.dot.tick ?? 1),
                remaining: Number(projectile.dot.remaining ?? projectile.dot.duration ?? 1)
              }
            });
          }
        }
        maybeDropProjectileAmmo(world, projectile, player);
      }
    }
  }
  return changed;
}

function enemyTargetCandidates(world, enemy, worldPlayers) {
  const triggerRange = (enemy.aggroRange || HOSTILE_TRIGGER_RANGE) * RANGE_UNIT;
  if (enemy.pet && enemy.petCommand === "attack" && enemy.petTargetId) {
    const ordered = (world.state.enemies || []).find(candidate => candidate?.id === enemy.petTargetId && candidate.hp > 0);
    if (ordered && ordered !== enemy && !unitFriendlyToPetMaster(enemy, ordered) && !targetOutsideServerEnemyDungeon(world, enemy, ordered)) {
      return [{ target: ordered, type: "enemy", distance: distance(enemy, ordered) }];
    }
    enemy.petCommand = "follow";
    enemy.petTargetId = null;
  }
  const candidates = [];
  for (const player of worldPlayers) {
    if (enemy.pet && unitFriendlyToPetMaster(enemy, player)) {
      if (enemy.targetPlayerId === player.id) {
        enemy.hostileToPlayer = false;
        enemy.targetPlayerId = null;
        enemy.hostileToPlayerReason = null;
      }
      continue;
    }
    if (targetOutsideServerEnemyDungeon(world, enemy, player)) {
      if (enemy.targetPlayerId === player.id) {
        enemy.hostileToPlayer = false;
        enemy.targetPlayerId = null;
        enemy.hostileToPlayerReason = null;
      }
      continue;
    }
    if (unitInvisible(player)) {
      if (enemy.targetPlayerId === player.id) {
        enemy.hostileToPlayer = false;
        enemy.targetPlayerId = null;
        enemy.hostileToPlayerReason = null;
      }
      continue;
    }
    if (serverSacredGroveBlocksTarget(world, enemy, player)) {
      if (enemy.targetPlayerId === player.id) {
        enemy.hostileToPlayer = false;
        enemy.targetPlayerId = null;
        enemy.hostileToPlayerReason = null;
      }
      continue;
    }
    const d = distance(enemy, player);
    if (d > triggerRange && enemy.targetPlayerId !== player.id) continue;
    if (!enemyHostileToPlayer(enemy, player, world)) continue;
    if (!serverHasLineOfSight(world, enemy, player) && enemy.targetPlayerId !== player.id) continue;
    candidates.push({ target: player, type: "player", distance: d });
  }
  for (const other of world.state.enemies || []) {
    if (other === enemy || other.hp <= 0) continue;
    if (dungeonMobTargetBlocked(world, enemy, other)) {
      if (enemy.hostileTargetId === other.id) enemy.hostileTargetId = null;
      continue;
    }
    if (targetOutsideServerEnemyDungeon(world, enemy, other)) {
      if (enemy.hostileTargetId === other.id) enemy.hostileTargetId = null;
      continue;
    }
    if (serverSacredGroveBlocksTarget(world, enemy, other)) {
      if (enemy.hostileTargetId === other.id) enemy.hostileTargetId = null;
      continue;
    }
    const d = distance(enemy, other);
    if (d > triggerRange && enemy.hostileTargetId !== other.id) continue;
    if (!unitHostileToEnemy(enemy, other, world)) continue;
    if (!serverHasLineOfSight(world, enemy, other) && enemy.hostileTargetId !== other.id) continue;
    candidates.push({ target: other, type: "enemy", distance: d });
  }
  candidates.sort((a, b) => a.distance - b.distance);
  return candidates;
}

function attackEnemyTarget(world, enemy, target, damage, realm, sourceName, dmgType, combats, soundEffect = "") {
  if (players.has(target.id)) {
    sendDamageToPlayer(target, enemy, damage, realm, sourceName, dmgType, soundEffect, { weaponEffect: true });
    return true;
  }
  const combat = damageEnemyFromEnemy(world, target, enemy, damage, realm, sourceName, dmgType);
  if (combat) combats.push(combat);
  return Boolean(combat);
}

function broadcastEnemyWeaponEffect(world, enemy, target, weapon, soundEffect = "") {
  if (!world || !enemy || !target || !weapon) return;
  const animation = String(weapon.animation || "").toLowerCase();
  if (!animation || animation === "projectile") return;
  const targetPlayerId = players.has(target.id) ? target.id : null;
  broadcastToWorld(world.name, {
    type: "enemy:weapon-effect",
    sourceId: enemy.id || "",
    targetId: target.id || "",
    source: { x: enemy.x, y: enemy.y, realm: enemy.realm || weapon.realm || "Mortal" },
    target: { x: target.x, y: target.y },
    angle: Math.atan2((target.y || 0) - (enemy.y || 0), (target.x || 0) - (enemy.x || 0)),
    realm: weapon.realm || enemy.realm || "Mortal",
    soundEffect,
    weapon
  }, targetPlayerId);
}

function tickServerEffects(world, dt, combats) {
  if (!Array.isArray(world.state?.effects) || !world.state.effects.length) return false;
  let changed = false;
  for (let i = world.state.effects.length - 1; i >= 0; i -= 1) {
    const effect = world.state.effects[i];
    effect.age = (effect.age || 0) + dt;
    if (effect.type === "portal" || effect.type === "portalMarker") {
      if (effect.ownerId && !players.has(effect.ownerId)) {
        world.state.effects.splice(i, 1);
        changed = true;
      }
      continue;
    }
    if (effect.type === "ring") {
      const owner = effect.ownerEnemyId
        ? world.state.enemies.find(enemy => enemy?.id === effect.ownerEnemyId)
        : players.get(effect.ownerId);
      if (!owner) {
        world.state.effects.splice(i, 1);
        changed = true;
        continue;
      }
      effect.x = owner.x;
      effect.y = owner.y;
      effect.tickTimer = (effect.tickTimer ?? 0) - dt;
      while (effect.tickTimer <= 0 && effect.age <= effect.duration) {
        effect.tickTimer += effect.tick || 0.25;
        if (effect.ownerEnemyId) {
          for (const player of playerList(world.name)) {
            if ((player.hp || 0) <= 0) continue;
            const ringDistance = Math.abs(distance(owner, player) - (effect.radius || 96));
            if (ringDistance > (player.radius || 18) + 8) continue;
            sendDamageToPlayer(player, owner, effect.damage || 0, effect.realm || "Infernal", `<b>${owner.name}</b>'s Ring of Fire`, "Magical");
          }
          for (const enemy of [...(world.state.enemies || [])]) {
            if (enemy.id === owner.id) continue;
            const ringDistance = Math.abs(distance(owner, enemy) - (effect.radius || 96));
            if (ringDistance > (enemy.radius || 18) + 8) continue;
            const combat = damageEnemyFromEnemy(world, enemy, owner, effect.damage || 0, effect.realm || "Infernal", `<b>${owner.name}</b>'s Ring of Fire`, "Magical");
            if (combat) combats.push(combat);
          }
        } else {
          for (const enemy of [...(world.state.enemies || [])]) {
            const ringDistance = Math.abs(distance(owner, enemy) - (effect.radius || 96));
            if (ringDistance > (enemy.radius || 18) + 8) continue;
            const combat = applyServerDamageToEnemy(world, enemy, effect.ownerId, effect.damage || 0, effect.realm || "Infernal", "Ring of Fire", "Magical", { realmXp: Boolean(effect.realmXp), sourceEffectId: effect.castId || effect.id });
            if (!combat.rejected) combats.push(combat);
          }
        }
        changed = true;
      }
    }
    if (effect.type === "fireblast") {
      effect.tickTimer = (effect.tickTimer ?? 0) - dt;
      while (effect.tickTimer <= 0 && effect.age <= effect.duration) {
        effect.tickTimer += effect.tick || 1;
        if (effect.ownerEnemyId) {
          const ownerEnemy = world.state.enemies.find(enemy => enemy?.id === effect.ownerEnemyId);
          if (!ownerEnemy) {
            world.state.effects.splice(i, 1);
            changed = true;
            break;
          }
          for (const player of playerList(world.name)) {
            if ((player.hp || 0) <= 0) continue;
            if (distance(effect, player) > (effect.radius || 0) + (player.radius || 18)) continue;
            sendDamageToPlayer(player, ownerEnemy, effect.damage || 0, effect.realm || "Infernal", `<b>${ownerEnemy.name}</b>'s Fireblast`, "Magical");
          }
          for (const enemy of [...(world.state.enemies || [])]) {
            if (enemy.id === ownerEnemy.id || distance(effect, enemy) > (effect.radius || 0) + (enemy.radius || 18)) continue;
            const combat = damageEnemyFromEnemy(world, enemy, ownerEnemy, effect.damage || 0, effect.realm || "Infernal", `<b>${ownerEnemy.name}</b>'s Fireblast`, "Magical");
            if (combat) combats.push(combat);
          }
          changed = true;
          continue;
        }
        for (const enemy of [...(world.state.enemies || [])]) {
          if (distance(effect, enemy) > (effect.radius || 0) + (enemy.radius || 18)) continue;
          const combat = applyServerDamageToEnemy(world, enemy, effect.ownerId, effect.damage || 0, effect.realm || "Infernal", "Fireblast", "Magical", { realmXp: Boolean(effect.realmXp), sourceEffectId: effect.castId || effect.id });
          if (!combat.rejected) combats.push(combat);
        }
        changed = true;
      }
    }
    if (effect.type === "iceStorm") {
      effect.tickTimer = (effect.tickTimer ?? 0) - dt;
      while (effect.tickTimer <= 0 && effect.age <= effect.duration) {
        effect.tickTimer += effect.tick || 1;
        if (effect.ownerEnemyId) {
          const ownerEnemy = world.state.enemies.find(enemy => enemy?.id === effect.ownerEnemyId);
          if (!ownerEnemy) {
            world.state.effects.splice(i, 1);
            changed = true;
            break;
          }
          for (const player of playerList(world.name)) {
            if ((player.hp || 0) <= 0) continue;
            if (distance(effect, player) > (effect.radius || 0) + (player.radius || 18)) continue;
            sendDamageToPlayer(player, ownerEnemy, effect.damage || 0, effect.realm || "Ethereal", `<b>${ownerEnemy.name}</b>'s Ice Storm`, "Magical");
            const freeze = effect.statMod || { name: "Frozen", realm: "Ethereal", remaining: 4, freeze: true, debuff: true };
            applyStatModToTarget(player, {
              ...freeze,
              name: "Frozen",
              realm: "Ethereal",
              remaining: freezeDurationFor(player, Number(freeze.remaining) || 4),
              freeze: true,
              debuff: true
            });
          }
          for (const enemy of [...(world.state.enemies || [])]) {
            if (enemy.id === ownerEnemy.id || distance(effect, enemy) > (effect.radius || 0) + (enemy.radius || 18)) continue;
            const combat = damageEnemyFromEnemy(world, enemy, ownerEnemy, effect.damage || 0, effect.realm || "Ethereal", `<b>${ownerEnemy.name}</b>'s Ice Storm`, "Magical");
            if (combat) combats.push(combat);
            if (world.state.enemies.includes(enemy)) {
              applyEnemyStatMod(enemy, {
                ...(effect.statMod || { name: "Frozen", realm: "Ethereal", remaining: 4, freeze: true, debuff: true }),
                name: "Frozen",
                realm: "Ethereal",
                remaining: freezeDurationFor(enemy, Number(effect.statMod?.remaining) || 4),
                freeze: true,
                debuff: true
              });
            }
          }
          changed = true;
          continue;
        }
        for (const enemy of [...(world.state.enemies || [])]) {
          if (distance(effect, enemy) > (effect.radius || 0) + (enemy.radius || 18)) continue;
          const combat = applyServerDamageToEnemy(world, enemy, effect.ownerId, effect.damage || 0, effect.realm || "Ethereal", "Ice Storm", "Magical", { realmXp: Boolean(effect.realmXp) });
          if (!combat.rejected) combats.push(combat);
          if (world.state.enemies.includes(enemy)) {
            applyEnemyStatMod(enemy, {
              ...(effect.statMod || { name: "Frozen", realm: "Ethereal", remaining: 4, freeze: true, debuff: true }),
              name: "Frozen",
              realm: "Ethereal",
              remaining: freezeDurationFor(enemy, Number(effect.statMod?.remaining) || 4),
              freeze: true,
              debuff: true
            });
          }
        }
        changed = true;
      }
    }
    if (effect.type === "faerieFire") {
      if (effect.ownerEnemyId) continue;
      for (const enemy of [...(world.state.enemies || [])]) {
        if (enemy._faerieFireEffectId === effect.id) continue;
        if (distance(effect, enemy) > (effect.radius || 0) + (enemy.radius || 18)) continue;
        const player = players.get(effect.ownerId);
        if (protectedFromPlayerEffects(enemy, player)) continue;
        markEnemyProvokedByPlayer(enemy, effect.ownerId);
        if (player) callForDefense(world, enemy, player);
        applyEnemyStatMod(enemy, effect.statMod || { name: "Faerie Fire", remaining: 6, addStats: { DEF: -0.5 } });
        enemy._faerieFireEffectId = effect.id;
        changed = true;
      }
    }
    if (effect.type === "faerieCircle" || effect.type === "darkCircle") {
      effect.tickTimer = (effect.tickTimer ?? 0) - dt;
      while (effect.tickTimer <= 0 && effect.age <= effect.duration) {
        effect.tickTimer += effect.tick || 0.5;
        const owner = players.get(effect.ownerId);
        const friendlyPlayerIds = new Set(teamMemberIdsForPlayer(effect.ownerId));
        for (const player of playerList(world.name)) {
          if ((player.hp || 0) <= 0 || !friendlyPlayerIds.has(player.id)) continue;
          if (distance(effect, player) > (effect.radius || 0) + (player.radius || 18)) continue;
          const baseMod = effect.statMod || { name: effect.type === "faerieCircle" ? "Faerie Circle" : "Dark Circle", remaining: 0.8 };
          const normalized = {
            ...baseMod,
            name: String(baseMod.name || "Spell").slice(0, 80),
            remaining: Math.max(0, Number(baseMod.remaining) || 0)
          };
          player.statMods = Array.isArray(player.statMods) ? player.statMods : [];
          const existing = player.statMods.find(candidate => candidate.name === normalized.name);
          if (existing) Object.assign(existing, normalized);
          else player.statMods.push(normalized);
          const socket = sockets.get(player.id)?.socket;
          if (socket) send(socket, { type: "player:statmod", sourceName: normalized.name || "Spell", statMod: normalized, quiet: true });
        }
        for (const enemy of [...(world.state.enemies || [])]) {
          const petMasterIsFriendly = enemy.pet && friendlyPlayerIds.has(enemy.masterId);
          const friendlyNpc = owner && (
            (enemy.friendlyToGoodPlayer && (owner.alignment || "Neutral") === "Good")
            || (enemy.friendlyToNonEvilPlayer && (owner.alignment || "Neutral") !== "Evil")
          );
          if (!petMasterIsFriendly && !friendlyNpc) continue;
          if (distance(effect, enemy) > (effect.radius || 0) + (enemy.radius || 18)) continue;
          applyEnemyStatMod(enemy, effect.statMod || { name: effect.type === "faerieCircle" ? "Faerie Circle" : "Dark Circle", remaining: 0.8 });
        }
        changed = true;
      }
    }
    if (effect.type === "graceFromAbove") {
      effect.tickTimer = (effect.tickTimer ?? 0) - dt;
      while (effect.tickTimer <= 0 && effect.age <= effect.duration) {
        effect.tickTimer += effect.tick || 1;
        const owner = players.get(effect.ownerId);
        const friendlyPlayerIds = new Set(teamMemberIdsForPlayer(effect.ownerId));
        const heal = roundUpTenth(Number(effect.heal) || 0);
        if (heal <= 0) break;
        let totalHealed = 0;
        for (const player of playerList(world.name)) {
          if ((player.hp || 0) <= 0 || !friendlyPlayerIds.has(player.id)) continue;
          if (distance(effect, player) > (effect.radius || 0) + (player.radius || 18)) continue;
          totalHealed += roundUpTenth(Math.min(heal, Math.max(0, (player.maxHp || 0) - (player.hp || 0))));
          const socket = sockets.get(player.id)?.socket;
          if (socket) send(socket, { type: "player:heal", amount: heal, sourceName: "Grace from Above" });
        }
        for (const enemy of [...(world.state.enemies || [])]) {
          const petMasterIsFriendly = enemy.pet && friendlyPlayerIds.has(enemy.masterId);
          const friendlyNpc = owner && (
            (enemy.friendlyToGoodPlayer && (owner.alignment || "Neutral") === "Good")
            || (enemy.friendlyToNonEvilPlayer && (owner.alignment || "Neutral") !== "Evil")
          );
          if (!petMasterIsFriendly && !friendlyNpc) continue;
          if (distance(effect, enemy) > (effect.radius || 0) + (enemy.radius || 18)) continue;
          totalHealed += healServerEnemy(enemy, heal);
        }
        if (totalHealed > 0) {
          const ownerSocket = sockets.get(effect.ownerId)?.socket;
          if (ownerSocket) send(ownerSocket, { type: "player:realm-xp", realm: "Celestial", amount: roundUpTenth(totalHealed) });
        }
        changed = true;
      }
    }
    if (effect.age >= effect.duration) {
      world.state.effects.splice(i, 1);
      changed = true;
    }
  }
  return changed;
}

function pestilentAuraCanHit(world, enemy, player) {
  if (!enemy || enemy.hp <= 0 || enemy.pet || protectedFromPlayerEffects(enemy, player)) return false;
  return normalizeRealm(enemy.realm || "Mortal") !== "Umbral";
}

function tickPestilentAuras(world, dt, combats) {
  const playersInWorld = playerList(world.name).filter(player => (player.hp || 0) > 0);
  if (!playersInWorld.length) return false;
  world.state.pestilentAuraTimers = world.state.pestilentAuraTimers || {};
  let changed = false;
  for (const player of playersInWorld) {
    const spell = playerActiveSpell(player, "Pestilent Aura");
    if (!spell) {
      delete world.state.pestilentAuraTimers[player.id];
      continue;
    }
    const tick = Number(spell.tick ?? 1) || 1;
    world.state.pestilentAuraTimers[player.id] = (world.state.pestilentAuraTimers[player.id] ?? 0) - dt;
    if (world.state.pestilentAuraTimers[player.id] > 0) continue;
    world.state.pestilentAuraTimers[player.id] += tick;
    const range = (Number(spell.range) || 6) * RANGE_UNIT;
    const damage = spellDamageValue(spell, "damage", 0, 0.2);
    if (damage <= 0) continue;
    for (const enemy of [...(world.state.enemies || [])]) {
      if (!pestilentAuraCanHit(world, enemy, player)) continue;
      if (distance(player, enemy) > range + (enemy.radius || 0)) continue;
      const combat = applyServerDamageToEnemy(world, enemy, player.id, damage, "Umbral", "Pestilent Aura", "Magical", { realmXp: true });
      if (!combat.rejected) {
        combats.push(combat);
        changed = true;
      }
    }
  }
  return changed;
}

function tickWorld(world, dt) {
  if (!world?.state) return;
  const combats = [];
  const chainLinks = [];
  const projectilesChanged = tickProjectiles(world, dt);
  const effectsChanged = tickServerEffects(world, dt, combats);
  const pestilentAurasChanged = tickPestilentAuras(world, dt, combats);
  const groundItemsChanged = tickGroundItems(world, dt);
  const eliteRespawnsChanged = tickEliteRespawns(world, dt);
  const worldPlayers = playerList(world.name).filter(player => player.hp > 0);
  const spawnChanged = tickSpawning(world, dt);
  const ambientDespawnChanged = tickAmbientDespawn(world, dt);
  if (!worldPlayers.length) {
    if (projectilesChanged || spawnChanged || ambientDespawnChanged || groundItemsChanged || effectsChanged || pestilentAurasChanged || eliteRespawnsChanged) {
      acceptWorldRevision(world);
      broadcastToWorld(world.name, worldStatePayload(world));
    }
    return;
  }
  let changed = spawnChanged || ambientDespawnChanged;
  if (!world.state.enemies?.length) {
    if (projectilesChanged || groundItemsChanged || effectsChanged || pestilentAurasChanged || eliteRespawnsChanged || changed) {
      acceptWorldRevision(world);
      broadcastToWorld(world.name, worldStatePayload(world));
    }
    return;
  }
  for (const enemy of [...world.state.enemies]) {
    if (tickPetLifetime(world, enemy, dt)) {
      changed = true;
      continue;
    }
    enemy.attackTimer = Math.max(0, (enemy.attackTimer || 0) - dt);
    enemy.pacified = Math.max(0, (enemy.pacified || 0) - dt);
    if ((enemy.rooted || 0) > 0) enemy.rooted = Math.max(0, enemy.rooted - dt);
    if ((enemy.rooted || 0) <= 0) enemy.rootVisual = "";
    if ((enemy.stunned || 0) > 0) enemy.stunned = Math.max(0, enemy.stunned - dt);
    if ((enemy.mortified || 0) > 0) enemy.mortified = Math.max(0, enemy.mortified - dt);
    if (updateEnemyStatMods(enemy, dt)) changed = true;
    if (tickEnemyDots(world, enemy, dt, combats)) {
      changed = true;
      if (!world.state.enemies.includes(enemy)) continue;
    }
    if ((enemy.stunned || 0) > 0) {
      changed = true;
      continue;
    }
    if ((enemy.mortified || 0) > 0) {
      changed = moveMortifiedServerEnemy(world, enemy, dt) || changed;
      continue;
    }
    if (enemy.leashState === "retreating" || shouldServerEnemyReturnToLeash(enemy)) {
      clearServerEnemyCombat(enemy);
      if ((enemy.rooted || 0) <= 0) changed = moveServerEnemyToLeash(world, enemy, dt) || changed;
      else changed = true;
      continue;
    }
    const targetEntry = enemyTargetCandidates(world, enemy, worldPlayers)[0] || null;
    const target = targetEntry?.target || null;
    let targetDistance = targetEntry?.distance ?? Infinity;
    if (!target) {
      if (enemy.pet && enemy.petCommand === "guard") continue;
      if (tickPetIdle(world, enemy, dt)) {
        changed = true;
        continue;
      }
      if (tickEnemyWander(world, enemy, dt)) changed = true;
      continue;
    }
    if (enemy.leashState === "retreating" || shouldServerEnemyReturnToLeash(enemy)) {
      clearServerEnemyCombat(enemy);
      if ((enemy.rooted || 0) <= 0) changed = moveServerEnemyToLeash(world, enemy, dt) || changed;
      else changed = true;
      continue;
    }
    if (targetEntry.type === "player") {
      setServerEnemyPlayerTarget(enemy, target.id, enemy.hostileToPlayerReason || "alignment");
    } else {
      setEnemyTargetEnemy(world, enemy, target);
    }
    const canSeeTarget = serverHasLineOfSight(world, enemy, target);
    if (canSeeTarget && tickEnemySpells(world, enemy, target, dt, combats, chainLinks)) changed = true;
    if (!world.state.enemies.includes(enemy) || !target || (targetEntry.type === "enemy" && !world.state.enemies.includes(target))) continue;
    targetDistance = distance(enemy, target);
    const weaponRange = ((enemy.weapon?.range || 1) * RANGE_UNIT) + (enemy.radius || 18) + 18;
    if ((targetDistance > weaponRange || !canSeeTarget) && (enemy.rooted || 0) <= 0) {
      const desiredStep = canSeeTarget ? targetDistance - weaponRange + 2 : enemyMoveSpeed(enemy) * dt;
      const step = Math.max(0, Math.min(desiredStep, enemyMoveSpeed(enemy) * dt));
      changed = moveEnemyTowardTarget(world, enemy, target, step / Math.max(dt, 0.001), dt) || changed;
    } else if (targetDistance <= weaponRange && canSeeTarget && enemy.attackTimer <= 0) {
      const enemyWeapon = enemy.weapon || {};
      const enemyWeaponAnimation = (enemyWeapon.animation || "claw").toLowerCase();
      const damage = enemyDamage(enemy, world);
      if (enemyWeaponAnimation === "projectile") {
        createEnemyWeaponProjectile(world, enemy, target, damage);
      } else {
        const realm = enemyWeapon.realm || enemy.realm || "Mortal";
        const dmgType = enemyWeapon.dmgType || "Physical";
        broadcastEnemyWeaponEffect(world, enemy, target, enemyWeapon, enemyWeapon.soundEffect || "");
        const landed = attackEnemyTarget(world, enemy, target, damage, realm, `<b>${enemy.name}</b>'s ${enemyWeapon.name || "attack"}`, dmgType, combats, enemyWeapon.soundEffect || "");
        if (landed && (players.has(target.id) || world.state.enemies.includes(target))) maybeApplyEnemyPoison(enemy, target);
        if (landed && (players.has(target.id) || world.state.enemies.includes(target))) maybeApplyEnemyWeaponStun(enemy, target, enemyWeapon);
        if (landed && (players.has(target.id) || world.state.enemies.includes(target))) maybeApplyFrozenTouchServer(enemy, target, enemyWeapon);
      }
      const thorn = (target.statMods || []).find(mod => mod.thornShield);
      const closeRange = enemyWeaponAnimation !== "projectile" && (enemyWeapon.range || 1) <= 3;
      if (players.has(target.id) && thorn && closeRange && world.state.enemies.includes(enemy)) {
        const combat = applyServerDamageToEnemy(world, enemy, target.id, Number(thorn.damage) || 0, "Sylvan", "Thorn Shield", "Magical", { realmXp: true });
        if (!combat.rejected) combats.push(combat);
      }
      const burningSkinDamage = burningSkinServerDamage(target);
      if (players.has(target.id) && burningSkinDamage > 0 && closeRange && world.state.enemies.includes(enemy)) {
        const combat = applyServerDamageToEnemy(world, enemy, target.id, burningSkinDamage, "Infernal", "Burning Skin", "Magical", { realmXp: true });
        if (!combat.rejected) combats.push(combat);
      }
      enemy.attackTimer = enemyAttackInterval(enemy, world);
      changed = true;
    }
  }
  if (changed || projectilesChanged || groundItemsChanged || effectsChanged || pestilentAurasChanged || eliteRespawnsChanged) {
    acceptWorldRevision(world);
    broadcastToWorld(world.name, {
      ...worldStatePayload(world),
      combats,
      ...(chainLinks.length ? { chainLinks } : {})
    });
  }
}

const server = http.createServer(serveFile);

server.on("upgrade", (req, socket) => {
  if (req.url !== "/soulreaper-ws") {
    console.warn(`Rejected WebSocket upgrade for ${req.url}`);
    socket.destroy();
    return;
  }
  const account = authenticatedAccount(req);
  if (!account) {
    socket.write("HTTP/1.1 401 Unauthorized\r\nConnection: close\r\n\r\n");
    socket.destroy();
    return;
  }
  const key = req.headers["sec-websocket-key"];
  if (!key) {
    socket.destroy();
    return;
  }
  const id = crypto.randomUUID();
  console.log(`Soulreaper WebSocket connected: ${id}`);
  socket.write([
    "HTTP/1.1 101 Switching Protocols",
    "Upgrade: websocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Accept: ${wsAccept(key)}`,
    "",
    ""
  ].join("\r\n"));
  sockets.set(id, { socket, world: "", accountId: account.id, characterId: "" });
  send(socket, { type: "welcome", id });
  socket.on("data", chunk => {
    for (const raw of decodeFrames(socket, chunk)) {
      let message;
      try {
        message = JSON.parse(raw);
      } catch (error) {
        console.warn(`Ignored malformed Soulreaper multiplayer message (${raw.length} chars): ${error.message}`);
        continue;
      }
      normalizeRealmData(message);
      const state = sockets.get(id);
      if (message.type === "latency:ping") {
        send(socket, { type: "latency:pong", id: String(message.id || "").slice(0, 80) });
      } else if (message.type === "worlds:list") {
        send(socket, {
          type: "worlds:list",
          worlds: [...worlds.values()].map(world => world.name).sort((a, b) => a.localeCompare(b))
        });
      } else if (message.type === "world:create" || message.type === "world:join") {
        const account = accountStore.accounts.find(candidate => candidate.id === state?.accountId);
        const selectedCharacter = characterForAccount(account, String(message.characterId || ""));
        if (!account || !selectedCharacter) {
          send(socket, { type: "world:error", message: "Choose a character first." });
          continue;
        }
        const name = normalizeWorldName(message.world);
        if (!name) {
          send(socket, { type: "world:error", message: "Enter a world name." });
          continue;
        }
        if (message.type === "world:create" && worlds.has(name)) {
          send(socket, { type: "world:error", message: `World \"${name}\" already exists. Join it instead.` });
          continue;
        }
        if (message.type === "world:join" && !worlds.has(name)) {
          send(socket, { type: "world:error", message: `World \"${name}\" does not exist yet.` });
          continue;
        }
        if (!worlds.has(name)) worlds.set(name, { name, seed: worldSeed(name), createdAt: Date.now(), hostId: null, state: null, revision: 0 });
        if (state?.world && state.world !== name) {
          removePlayerFromTeam(id, false);
          players.delete(id);
          broadcastToWorld(state.world, { type: "player:left", id }, id);
          ensureWorldHost(state.world);
          pruneWorld(state.world);
        }
        state.world = name;
        state.characterId = selectedCharacter.id;
        const world = worlds.get(name);
        ensureWorldHost(name);
        const resume = Boolean(message.resume && selectedCharacter.lastWorld === name && worlds.has(name));
        const characterSave = selectedCharacter.save && typeof selectedCharacter.save === "object" ? JSON.parse(JSON.stringify(selectedCharacter.save)) : null;
        if (characterSave && !resume) {
          delete characterSave.x;
          delete characterSave.y;
          delete characterSave.lastDeath;
        }
        send(socket, { type: "world:joined", world: name, seed: world.seed, hostId: world.hostId, revision: world.revision || 0, character: normalizeRealmData(characterSave), resume });
        send(socket, { type: "players", players: playerList(name) });
        if (world.state) send(socket, worldStatePayload(world));
      } else if (message.type === "player:update") {
        if (!state?.world) continue;
        const world = worlds.get(state.world);
        const player = normalizedPlayerForWorld(world, sanitizePlayer(id, message));
        players.set(id, player);
        const account = accountStore.accounts.find(candidate => candidate.id === state.accountId);
        saveCharacterForPlayer(state.world, message, account, state.characterId);
        if (refreshNaturalPlayerAggro(world, player)) {
          acceptWorldRevision(world);
          broadcastToWorld(state.world, worldStatePayload(world, id));
        }
        broadcastToWorld(state.world, { type: "player:update", player }, id);
        const team = teamForPlayer(id);
        if (team) sendTeamState(team);
      } else if (message.type === "world:action") {
        if (!state?.world) continue;
        const world = worlds.get(state.world);
        if (message.action === "team") {
          handleTeamCommand(state.world, id, message);
          continue;
        }
        if (message.action === "trade") {
          handleTradeCommand(state.world, id, message);
          continue;
        }
        if (!world?.state) continue;
        if (message.action === "pickup") {
          const dropId = String(message.dropId || "");
          const drops = Array.isArray(world.state.groundItems) ? world.state.groundItems : [];
          const dropIndex = drops.findIndex(drop => drop?.id === dropId);
          if (dropIndex < 0) {
            send(state.socket, { ...worldStatePayload(world), type: "world:pickup:rejected", dropId });
            continue;
          }
          const [drop] = drops.splice(dropIndex, 1);
          scheduleServerResourceRespawn(world, drop);
          acceptWorldRevision(world);
          send(state.socket, { ...worldStatePayload(world, id), type: "world:pickup:accepted", drop });
          broadcastToWorld(state.world, worldStatePayload(world, id), id);
        } else if (message.action === "drop:item" || message.action === "drop:gold") {
          const accepted = addPlayerDroppedItem(world, { ...message, playerId: id });
          if (!accepted) send(state.socket, worldStatePayload(world));
        } else if (message.action === "pickup:match") {
          const accepted = pickupMatchedPlayerDrop(world, message, id);
          if (!accepted) send(state.socket, { ...worldStatePayload(world), type: "world:pickup:rejected", localDropId: message.localDropId || "" });
        } else if (message.action === "death:drops") {
          const accepted = addPlayerDeathDrops(world, { ...message, playerId: id });
          if (!accepted) send(state.socket, worldStatePayload(world));
        } else if (message.action === "player:defeated") {
          if (resetPlayerProvokedAggro(world, id)) {
            acceptWorldRevision(world);
            broadcastToWorld(state.world, worldStatePayload(world, id));
          } else {
            send(state.socket, worldStatePayload(world));
          }
        } else if (message.action === "enemy:update") {
          const enemyId = String(message.enemyId || "");
          const enemies = Array.isArray(world.state.enemies) ? world.state.enemies : [];
          const enemyIndex = enemies.findIndex(enemy => enemy?.id === enemyId);
          if (enemyIndex < 0) {
            if (message.alive && message.enemy) {
              const newEnemy = { ...message.enemy, id: enemyId };
              if (Array.isArray(newEnemy.dots)) {
                for (const dot of newEnemy.dots) {
                  if (dot && dot.killedByPlayer !== false && !dot.ownerId) dot.ownerId = id;
                }
              }
              enemies.push(newEnemy);
              acceptWorldRevision(world);
              broadcastToWorld(state.world, worldStatePayload(world, id));
            } else {
              send(state.socket, worldStatePayload(world));
            }
            continue;
          }
          if (message.alive && message.enemy) {
            const updatedEnemy = { ...message.enemy, id: enemyId };
            if (Array.isArray(updatedEnemy.dots)) {
              for (const dot of updatedEnemy.dots) {
                if (dot && dot.killedByPlayer !== false && !dot.ownerId) dot.ownerId = id;
              }
            }
            enemies[enemyIndex] = updatedEnemy;
          } else {
            serverKillEnemy(world, enemies[enemyIndex], id);
          }
          acceptWorldRevision(world);
          broadcastToWorld(state.world, worldStatePayload(world, id));
        } else if (message.action === "weapon:attack") {
          const accepted = applyPlayerWeaponAttack(world, id, String(message.enemyId || ""), message.enemyIds, {
            offHand: Boolean(message.offHand),
            realmXp: Boolean(message.realmXp),
            combatState: message.combatState && typeof message.combatState === "object" ? message.combatState : null,
            weapon: typeof message.weapon === "object" && message.weapon ? message.weapon : null
          });
          if (!accepted) send(state.socket, worldStatePayload(world));
        } else if (message.action === "spell:projectile") {
          const accepted = createPlayerSpellProjectile(world, id, message);
          if (!accepted) send(state.socket, worldStatePayload(world));
        } else if (message.action === "spell:direct") {
          const accepted = applyDirectSpell(world, id, message);
          if (!accepted) send(state.socket, worldStatePayload(world));
        } else if (message.action === "spell:chain") {
          const accepted = applyChainSpell(world, id, message);
          if (!accepted) send(state.socket, worldStatePayload(world));
        } else if (message.action === "spell:effect") {
          const accepted = createServerEffect(world, id, message);
          if (!accepted) send(state.socket, worldStatePayload(world));
        } else if (message.action === "spell:portal") {
          const accepted = summonServerPortal(world, id, message);
          if (!accepted) send(state.socket, worldStatePayload(world));
        } else if (message.action === "spell:player") {
          const accepted = applyPlayerTargetSpell(world, id, message);
          if (!accepted) send(state.socket, worldStatePayload(world));
        } else if (message.action === "spell:unit-heal") {
          const accepted = applyUnitHealSpell(world, id, message);
          if (!accepted) send(state.socket, worldStatePayload(world));
        } else if (message.action === "spell:summon") {
          const accepted = summonPlayerPet(world, id, message);
          if (!accepted) send(state.socket, worldStatePayload(world));
        } else if (message.action === "pet:command") {
          const accepted = applyPetCommand(world, id, message);
          if (!accepted) send(state.socket, worldStatePayload(world));
        } else if (message.action === "dev:spawn") {
          const accepted = spawnDevEnemy(world, id, message);
          if (!accepted) send(state.socket, worldStatePayload(world));
        }
      } else if (message.type === "world:state:propose" || message.type === "world:state") {
        if (!state?.world) continue;
        const world = worlds.get(state.world);
        if (!world) continue;
        if (world.hostId && world.hostId !== id) {
          send(state.socket, worldStatePayload(world));
          continue;
        }
        const baseRevision = Number(message.baseRevision || 0);
        if (world.state && baseRevision < (world.revision || 0)) {
          send(state.socket, worldStatePayload(world));
          continue;
        }
        const incomingState = mergeAuthoritativeWorldState(world.state, message.state || null);
        if (incomingState && world.state?.collision && !incomingState.collision) {
          incomingState.collision = world.state.collision;
        }
        world.state = incomingState;
        acceptWorldRevision(world);
        broadcastToWorld(state.world, worldStatePayload(world, id));
      } else if (message.type === "chat") {
        if (!state?.world) continue;
        sendChannelChat(id, String(message.channel || "say").toLowerCase(), message.text);
      } else if (message.type === "tell") {
        if (!state?.world) continue;
        sendPrivateTell(state.world, id, message.targetName, message.text);
      } else if (message.type === "who") {
        if (!state?.world) continue;
        send(state.socket, { type: "who", players: playerSummaryList(state.world) });
      }
    }
  });
  socket.on("close", () => {
    console.log(`Soulreaper WebSocket disconnected: ${id}`);
    const worldName = sockets.get(id)?.world;
    const trade = tradeForPlayer(id);
    if (trade) cancelTrade(trade, "Trade canceled because a player disconnected.");
    removePlayerFromTeam(id, false);
    sockets.delete(id);
    players.delete(id);
    broadcastToWorld(worldName, { type: "player:left", id }, id);
    ensureWorldHost(worldName);
    pruneWorld(worldName);
  });
  socket.on("error", () => {
    console.log(`Soulreaper WebSocket error: ${id}`);
    const worldName = sockets.get(id)?.world;
    removePlayerFromTeam(id, false);
    sockets.delete(id);
    players.delete(id);
    broadcastToWorld(worldName, { type: "player:left", id }, id);
    ensureWorldHost(worldName);
    pruneWorld(worldName);
  });
});

server.on("error", error => {
  console.error(`Soulreaper multiplayer server failed to start: ${error.message}`);
  process.exitCode = 1;
});

let lastWorldTick = Date.now();
setInterval(() => {
  const now = Date.now();
  const dt = Math.min(0.1, Math.max(0.001, (now - lastWorldTick) / 1000));
  lastWorldTick = now;
  for (const world of worlds.values()) {
    try {
      tickWorld(world, dt);
      world.lastTickError = null;
    } catch (error) {
      world.lastTickError = String(error?.stack || error).slice(0, 1200);
      console.error(`Soulreaper world tick failed for "${world.name}": ${error?.stack || error}`);
    }
  }
}, 100);

async function startServer() {
  loadSharedGameData(true);
  await initializeAccountStore();
  server.listen(port, host, () => {
    console.log(`Soulreaper multiplayer server running at http://${host}:${port}/`);
  });
}

startServer().catch(error => {
  console.error(`Soulreaper multiplayer server failed to initialize: ${error.stack || error.message || error}`);
  process.exitCode = 1;
});
