const fs = require("fs/promises");
const http = require("http");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const GAME_FILE = path.join(ROOT, "game.js");
const MAP_GENERATION_FILE = path.join(ROOT, "map-generation.js");
const INDEX_FILE = path.join(ROOT, "index.html");
const ITEM_DATA_FILE = path.join(ROOT, "data", "items.js");
const ITEM_ART_DATA_FILE = path.join(ROOT, "data", "item-art.js");
const MONSTER_DATA_FILE = path.join(ROOT, "data", "monsters.js");
const WORLD_DATA_FILE = path.join(ROOT, "data", "world.js");
const SPELL_DATA_FILE = path.join(ROOT, "data", "spells.js");
const PORT = Number(process.env.SOULREAPER_DEV_PORT || 4321);
const HOST = process.env.SOULREAPER_DEV_HOST || "127.0.0.1";

const UNIT_GROUPS = {
  monsterTemplates: { label: "Ganderswood Units" },
  fenMonsterTemplates: { label: "Fen Units" }
};
const REALMS = ["Mortal", "Ethereal", "Celestial", "Infernal", "Sylvan", "Umbral"];
const CRAFTING_SKILLS = ["Smithing", "Leatherworking", "Tailoring", "Alchemy", "Jewelry"];

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

const SPELL_NUMERIC_KEYS = ["lvl", "cooldown", "range", "aoeRadius", "duration", "tick"];
const SPELL_BOOLEAN_KEYS = ["manualTarget", "manualCast", "autocast", "passive", "aura"];
const SPELL_FORMULA_STATS = new Set(["HP", "ATK", "DEF", "SPD", "AGL", "INT", "FOCUS", "BLOCK", "RESIST", "REGEN", "MP"]);
const BLOCKED_SPELL_JSON_KEYS = new Set(["cast", "castAt", "update", "onHit", "effect", "__proto__", "prototype", "constructor"]);
const DEFAULT_QUEST_CONFIGS = {
  "roga-reconnaissance": {
    id: "roga-reconnaissance",
    name: "Roga Reconnaissance",
    description: "Reeve Marlowe wants a first report from Lake Roga. Thin the Froglins and Giant Toads around the lake, then return to Gandersville Town Hall.",
    minimumLevel: 10,
    rewardXp: 350,
    rewardGold: 90,
    objectives: [
      { type: "kill", enemy: "Froglin", label: "Froglins Slain", required: 5 },
      { type: "kill", enemy: "Giant Toad", label: "Giant Toads Slain", required: 3 }
    ],
    new: true
  },
  "grindylow-problem": {
    id: "grindylow-problem",
    name: "The Grindylow Problem",
    description: "Reeve Marlowe says Lake Roga's shallows have become dangerous. Slay Grindylows near the water and report back to Town Hall.",
    minimumLevel: 10,
    rewardXp: 425,
    rewardGold: 120,
    objectives: [
      { type: "kill", enemy: "Grindylow", label: "Grindylows Slain", required: 4 }
    ],
    new: true
  },
  "bogseer-signs": {
    id: "bogseer-signs",
    name: "Bogseer Signs",
    description: "Reeve Marlowe believes the Froglin Bogseers are stirring up Lake Roga's stranger beasts. Defeat the Bogseers and Hypnotoads, then return to Town Hall.",
    minimumLevel: 10,
    rewardXp: 525,
    rewardGold: 150,
    objectives: [
      { type: "kill", enemy: "Froglin Bogseer", label: "Froglin Bogseers Slain", required: 4 },
      { type: "kill", enemy: "Hypnotoad", label: "Hypnotoads Slain", required: 2 }
    ],
    new: true
  }
};
const QUEST_FACTORY_NAMES = [
  "gvadaQuest",
  "ratInfestationQuest",
  "investigateRatWarrenQuest",
  "sharleneParcelQuest",
  "napaeaSkullQuest",
  "fenholdQuest",
  "morganesReagentsQuest",
  "removeGoblinMenaceQuest",
  "warWithGoblinsQuest",
  "antidoteForThePlagueQuest",
  "morePlagueResearchQuest",
  "boneCollectorQuest",
  "introductionToEtherQuest",
  "whiteStagQuest"
];
const ITEM_GROUPS = ["weapons", "equipment", "bags", "consumables", "scrolls", "misc"];
const ASSET_UPLOAD_FOLDERS = new Set([
  "assets/sprites/mobs",
  "assets/sprites/props",
  "assets/ground",
  "assets/spells",
  "assets/audio",
  "assets"
]);
const ALLOWED_ASSET_EXTENSIONS = new Set([".png", ".webp", ".jpg", ".jpeg", ".gif", ".wav", ".mp3", ".ogg", ".json", ".txt"]);
const AUDIO_ASSET_EXTENSIONS = new Set([".wav", ".mp3", ".ogg"]);

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".wav": "audio/wav",
  ".mp3": "audio/mpeg",
  ".ogg": "audio/ogg"
};

const DEFAULT_AREA_CONFIGS = {
  "The Ganderswood": {
    levelRange: { min: 1, max: 3 },
    connectsTo: ["Ganderswood Fen", "Rat Den", "Gandersville"],
    environment: {
      groundTexture: "./assets/ground/ganderswood.png",
      features: [
        { name: "Trees", sprite: "./assets/sprites/tree-64.png", minRadius: 16, maxRadius: 38, obstacle: true, minCount: 0, maxCount: 120 },
        { name: "Boulders", sprite: "./assets/sprites/rock-64.png", minRadius: 16, maxRadius: 38, obstacle: true, minCount: 0, maxCount: 80 }
      ]
    }
  },
  Gandersville: {
    levelRange: { min: 1, max: 1 },
    connectsTo: ["The Ganderswood"],
    environment: {
      groundTexture: "./assets/ground/wyndhelm.png",
      features: []
    }
  },
  "Ganderswood Fen": {
    levelRange: { min: 6, max: 7 },
    connectsTo: ["The Ganderswood", "Grimswood Pass", "Fenhold"],
    environment: {
      groundTexture: "./assets/ground/muddyfield.png",
      features: [
        { name: "Fen Vegetation", sprite: "./assets/sprites/props/bush.png", minRadius: 16, maxRadius: 38, obstacle: true, minCount: 0, maxCount: 80 }
      ]
    }
  },
  Fenhold: {
    levelRange: { min: 7, max: 8 },
    connectsTo: ["Ganderswood Fen"],
    environment: {
      groundTexture: "./assets/ground/muddyfield.png",
      features: []
    }
  },
  "Rat Den": {
    levelRange: { min: 3, max: 5 },
    connectsTo: ["The Ganderswood", "Ganderswood Glade", "Ratzkhan"],
    environment: {
      groundTexture: "./assets/ground/rat-den.png",
      features: []
    }
  },
  "Rat Warren": {
    levelRange: { min: 3, max: 6 },
    connectsTo: ["Rat Den"],
    environment: {
      groundTexture: "./assets/ground/rat-den.png",
      features: []
    }
  },
  Ratzkhan: {
    levelRange: { min: 5, max: 8 },
    connectsTo: ["Rat Den", "Diarrh Realm"],
    environment: {
      groundTexture: "./assets/ground/rat-den.png",
      features: []
    }
  },
  "Diarrh Realm": {
    levelRange: { min: 8, max: 10 },
    connectsTo: ["Ratzkhan"],
    environment: {
      groundTexture: "./assets/ground/ratzkhan-chamber.png",
      features: []
    }
  },
  "Ganderswood Glade": {
    levelRange: { min: 5, max: 6 },
    connectsTo: ["Rat Den", "Whisperspring"],
    environment: {
      groundTexture: "./assets/ground/ganderswood-glade.png",
      features: [
        { name: "Ruined Pillars", sprite: "./assets/sprites/props/ruined-pillar.png", minRadius: 16, maxRadius: 34, obstacle: true, minCount: 4, maxCount: 9 }
      ]
    }
  },
  Whisperspring: {
    levelRange: { min: 1, max: 1 },
    connectsTo: ["Ganderswood Glade"],
    environment: {
      groundTexture: "./assets/ground/whisperspring.png",
      features: []
    }
  },
  "Grimswood Pass": {
    levelRange: { min: 7, max: 8 },
    connectsTo: ["Ganderswood Fen", "Wyndhelm", "The Crowing Fields"],
    environment: {
      groundTexture: "./assets/ground/grimswood-pass.png",
      features: [
        { name: "Dead Trees", sprite: "./assets/sprites/props/dead-tree.png", minRadius: 18, maxRadius: 42, obstacle: true, minCount: 80, maxCount: 150 }
      ]
    }
  },
  Wyndhelm: {
    levelRange: { min: 1, max: 1 },
    connectsTo: ["Grimswood Pass"],
    environment: {
      groundTexture: "./assets/ground/wyndhelm.png",
      features: []
    }
  },
  "The Crowing Fields": {
    levelRange: { min: 8, max: 9 },
    connectsTo: ["Grimswood Pass", "Gobba"],
    environment: {
      groundTexture: "./assets/ground/crowing-fields.png",
      features: []
    }
  },
  Gobba: {
    levelRange: { min: 9, max: 11 },
    connectsTo: ["The Crowing Fields"],
    environment: {
      groundTexture: "./assets/ground/gobba.png",
      features: []
    }
  },
  "Harkhar Highlands": {
    levelRange: { min: 12, max: 14 },
    connectsTo: ["The Crowing Fields", "Harmush Lagh"],
    environment: {
      groundTexture: "./assets/ground/snow-grass.png",
      features: []
    }
  },
  "Harmush Lagh": {
    levelRange: { min: 14, max: 16 },
    connectsTo: ["Harkhar Highlands", "Highstone Pass"],
    environment: {
      groundTexture: "./assets/ground/mountain.png",
      features: [
        { name: "Snowy Pine Trees", sprite: "./assets/sprites/props/snowy-pine-tree.png", minRadius: 18, maxRadius: 40, obstacle: true, minCount: 32, maxCount: 48 },
        { name: "Snowy Boulders", sprite: "./assets/sprites/props/snowy-boulder.png", minRadius: 18, maxRadius: 38, obstacle: true, minCount: 24, maxCount: 40 }
      ]
    }
  },
  "Highstone Pass": {
    levelRange: { min: 15, max: 17 },
    connectsTo: ["Harmush Lagh", "Harga Voagh"],
    environment: {
      groundTexture: "./assets/ground/mountain.png",
      features: [
        { name: "Snowy Boulders", sprite: "./assets/sprites/props/snowy-boulder.png", minRadius: 14, maxRadius: 32, obstacle: true, minCount: 34, maxCount: 46 },
        { name: "Snowy Pine Trees", sprite: "./assets/sprites/props/snowy-pine-tree.png", minRadius: 16, maxRadius: 34, obstacle: true, minCount: 10, maxCount: 18 }
      ]
    }
  },
  "Harga Voagh": {
    levelRange: { min: 17, max: 19 },
    connectsTo: ["Highstone Pass", "Firecry Peak"],
    environment: {
      groundTexture: "./assets/ground/snow.png",
      features: [
        { name: "Snowy Pine Trees", sprite: "./assets/sprites/props/snowy-pine-tree.png", minRadius: 18, maxRadius: 42, obstacle: true, minCount: 28, maxCount: 42 },
        { name: "Snowy Boulders", sprite: "./assets/sprites/props/snowy-boulder.png", minRadius: 16, maxRadius: 34, obstacle: true, minCount: 16, maxCount: 28 },
        { name: "Snow-Covered Dead Trees", sprite: "./assets/sprites/props/snow-covered-dead-tree.png", minRadius: 18, maxRadius: 36, obstacle: true, minCount: 8, maxCount: 18 }
      ]
    }
  },
  "Firecry Peak": {
    levelRange: { min: 19, max: 21 },
    connectsTo: ["Harga Voagh"],
    environment: {
      groundTexture: "./assets/ground/ash.png",
      features: [
        { name: "Dead Trees", sprite: "./assets/sprites/props/dead-tree.png", minRadius: 18, maxRadius: 40, obstacle: true, minCount: 32, maxCount: 56 }
      ]
    }
  }
};

const DEFAULT_NPC_CONFIGS = [
  { id: "gvada", name: "Gvada", area: "Gandersville", alignment: "Neutral", radius: 16, sprite: "./assets/sprites/npcs/gvada-v2.png", startsQuest: true, questId: "gvada-starter-magic" },
  { id: "shopkeeper-billiam", name: "Shopkeeper Billiam", area: "The Ganderswood", alignment: "Neutral", radius: 16, sprite: "./assets/sprites/npcs/shopkeeper.png", shopkeeper: true },
  { id: "pleezix", name: "Pleezix", area: "The Ganderswood", alignment: "Neutral", radius: 16, sprite: "./assets/sprites/npcs/old-man.png", startsQuest: true, questId: "rat-infestation" },
  { id: "sharlene", name: "Sharlene", area: "Ganderswood Fen", alignment: "Neutral", radius: 16, sprite: "./assets/sprites/npcs/villager-female.png", startsQuest: true, questId: "sharlene-parcel" },
  { id: "mordren", name: "Mordren", area: "Rat Den", alignment: "Neutral", radius: 16, sprite: "./assets/sprites/npcs/shadow-soulreaper-male.png", startsQuest: true, questId: "napaea-skull" },
  { id: "cecil-paddywagon", name: "Cecil Paddywagon", area: "Grimswood Pass", alignment: "Neutral", radius: 16, sprite: "./assets/sprites/npcs/villager-male-2.png" },
  { id: "theodora", name: "Theodora", area: "Ganderswood Fen", alignment: "Neutral", radius: 16, sprite: "./assets/sprites/npcs/old-woman.png", startsQuest: true, questId: "antidote-for-the-plague" },
  { id: "quigley-thistleberry", name: "Quigley Thistleberry", area: "Whisperspring", alignment: "Good", radius: 16, sprite: "./assets/sprites/npcs/guard.png" },
  { id: "happie-filmore", name: "Happie Filmore", area: "Whisperspring", alignment: "Neutral Good", radius: 16, sprite: "./assets/sprites/npcs/sylvan-soulreaper-male.png", startsQuest: true, questId: "war-with-goblins" },
  { id: "guard-dorin", name: "Guard Dorin", area: "Whisperspring", alignment: "Neutral Good", radius: 16, sprite: "./assets/sprites/npcs/guard.png" },
  { id: "druidess-dyaria", name: "Druidess Dyaria", area: "Ganderswood Glade", alignment: "Neutral Good", radius: 16, sprite: "./assets/sprites/npcs/sylvan-soulreaper-female.png", trainer: true, shopkeeper: true, trainerRealms: ["Sylvan"], trainerMaxSpellLevel: 18, refusalText: "You disgrace the sanctity of this hallowed glade. Begone." },
  {
    id: "mira-kettlewick",
    name: "Mira Kettlewick",
    area: "Gandersville",
    alignment: "Neutral",
    radius: 16,
    sprite: "./assets/sprites/npcs/villager-female.png",
    startsQuest: true,
    questId: "pantry-pests",
    dialogueContexts: {
      questOffer: "My pantry is crawling with rats. I cannot cook, I cannot sleep, and I will not open another cupboard until someone clears them out.",
      questAccepted: "Thank you. The pantry is through the back. Please be quick.",
      questActive: "The rats are still in there. I can hear them chewing.",
      questReady: "Quiet at last. You have saved my stores and what remained of my patience.",
      questAfterComplete: "My pantry is peaceful again. I still check the corners twice."
    }
  },
  {
    id: "sergeant-bram",
    name: "Sergeant Bram",
    area: "Gandersville",
    alignment: "Neutral Good",
    radius: 16,
    sprite: "./assets/sprites/npcs/guard.png",
    startsQuest: true,
    questId: "fen-patrol",
    questMinimumLevelText: "The Fen patrol is not work for a green recruit. Come back when you are LVL {level}.",
    dialogueContexts: {
      questOffer: "The road by Ganderswood Fen has been too quiet, which usually means trouble is choosing where to strike. Thin the Goblin Thugs and Goblin Shamans out there, then report back.",
      questActive: "Finish the Fen patrol. Goblins do not stop being a problem because we stop counting them.",
      questReady: "Good work. The road will breathe easier for a while.",
      questAfterComplete: "Keep your eyes on the Fen. It has a habit of growing new problems."
    }
  },
  {
    id: "widow-elowen",
    name: "Widow Elowen",
    area: "Gandersville",
    alignment: "Neutral Good",
    radius: 16,
    sprite: "./assets/sprites/npcs/old-woman.png",
    startsQuest: true,
    questId: "flowers-for-the-grave",
    questMinimumLevelText: "The graveyard is no place for you yet. Return when you are LVL {level}.",
    dialogueContexts: {
      questOffer: "My husband rests in the Fen graveyard, and I have not had the courage to go. Please take these Mourning Flowers to his grave.",
      questActive: "Please place the Mourning Flowers at my husband's grave in the Fen.",
      questReady: "You placed them? Thank you. Some debts of the heart can only be carried by another.",
      questAfterComplete: "You gave an old grief a little peace.",
      letterRead: "This letter... I thought his last words were lost. You have returned more than flowers to me."
    }
  },
  {
    id: "reeve-marlowe",
    name: "Reeve Marlowe",
    area: "Gandersville",
    alignment: "Neutral",
    radius: 16,
    sprite: "./assets/sprites/npcs/mayor.png",
    startsQuest: true,
    questId: "roga-reconnaissance",
    questChain: ["roga-reconnaissance", "grindylow-problem", "bogseer-signs"],
    questMinimumLevelText: "Lake Roga is no errand for an untested soulreaper. Return when you are LVL {level}.",
    dialogueContexts: {
      questOffer: "Gandersville has need of eyes on Lake Roga. The waterline has grown restless, and the first task is simple: clear enough of the smaller threats that folk can approach the shore again.",
      questActive: "Lake Roga still needs your attention. Finish the work marked in your Chronicle and report back here.",
      questReady: "Good. A report backed by action is worth more than a stack of frightened rumors.",
      questAfterComplete: "For now, Town Hall has what it needs from Lake Roga. If the lake stirs again, I will know where to look."
    }
  }
];
const NPC_ALIGNMENTS = ["Neutral", "Neutral Good", "Good", "Neutral Evil", "Evil"];
const BUILTIN_QUEST_IDS = new Set([
  "gvada-starter-magic",
  "rat-infestation",
  "pantry-pests",
  "fen-patrol",
  "flowers-for-the-grave",
  "ratkin-menace",
  "investigate-rat-warren",
  "sharlene-parcel",
  "napaea-skull",
  "fenhold",
  "morganes-reagents",
  "remove-goblin-menace",
  "war-with-goblins",
  "antidote-for-the-plague",
  "more-plague-research",
  "bone-collector",
  "only-you-can-prevent-forest-fires",
  "the-glow-of-the-glade",
  "a-gentle-leash",
  "thorns-remember",
  "dust-of-the-hidden-folk",
  "roots-that-walk",
  "bone-ritual",
  "first-flame",
  "controlled-burn",
  "too-close-to-the-fire",
  "unholy-dominion",
  "introduction-to-ether",
  "introduction-to-crowd-control",
  "introduction-to-celestial-mercy",
  "blessing-of-the-road",
  "a-shield-of-faith",
  "janglebones-in-the-fen",
  "introduction-to-weapons-mastery",
  "introduction-to-shields",
  "joining-the-gandersguard",
  "joining-the-fenguard",
  "gandersville-raid",
  "the-white-stag"
]);
const SPRITE_CHANNEL_KEYS = ["hair", "skin", "clothing-primary", "clothing-secondary"];

function send(res, status, body, type = "application/json; charset=utf-8") {
  const payload = Buffer.isBuffer(body) || typeof body === "string" ? body : JSON.stringify(body, null, 2);
  res.writeHead(status, { "content-type": type, "cache-control": "no-store" });
  res.end(payload);
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.setEncoding("utf8");
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 24_000_000) {
        reject(new Error("Request body is too large."));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function findConstBlock(source, name) {
  const declaration = `const ${name} =`;
  const declarationIndex = source.indexOf(declaration);
  if (declarationIndex === -1) return null;

  const equalsIndex = source.indexOf("=", declarationIndex);
  let valueStart = equalsIndex + 1;
  while (/\s/.test(source[valueStart])) valueStart += 1;
  if (valueStart === -1) throw new Error(`Could not find ${name}'s opening value.`);

  const opener = source[valueStart];
  const closer = opener === "[" ? "]" : opener === "{" ? "}" : opener === "(" ? ")" : "";
  if (!closer) return null;
  const stack = [];
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

    if (char === "[" || char === "{" || char === "(") {
      stack.push(char);
      continue;
    }
    if (char === "]" || char === "}" || char === ")") {
      const expectedOpen = char === "]" ? "[" : char === "}" ? "{" : "(";
      const actualOpen = stack.pop();
      if (actualOpen !== expectedOpen) throw new Error(`Could not parse ${name}; mismatched ${char}.`);
      if (!stack.length) {
        const valueEnd = index + 1;
        const semicolonEnd = source.indexOf(";", valueEnd);
        if (semicolonEnd === -1) throw new Error(`Could not find ${name}'s closing semicolon.`);
        return {
          start: declarationIndex,
          valueStart,
          valueEnd,
          end: semicolonEnd + 1,
          valueText: source.slice(valueStart, valueEnd)
        };
      }
    }
  }
  throw new Error(`Could not find ${name}'s closing value.`);
}

function constContext(source) {
  const context = {};
  for (const match of source.matchAll(/^const\s+([A-Z0-9_]+)\s*=\s*(".*?");/gm)) {
    context[match[1]] = JSON.parse(match[2]);
  }
  return context;
}

function trimJsExpression(valueText) {
  const text = String(valueText || "").trim();
  let depth = 0;
  let quote = "";
  let escaped = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
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
    if (char === "[" || char === "{" || char === "(") depth += 1;
    else if (char === "]" || char === "}" || char === ")") depth = Math.max(0, depth - 1);
    else if (char === ";" && depth === 0) return text.slice(0, index).trim();
  }
  return text.replace(/;+$/, "").trim();
}

function parseJsValue(valueText, name, context = {}) {
  const expression = trimJsExpression(valueText);
  try {
    return vm.runInNewContext(`(${expression})`, Object.freeze({ window: {}, ...context }), { timeout: 1000 });
  } catch (error) {
    throw new Error(`Could not parse ${name}: ${error.message}`);
  }
}

function findFunctionReturnObject(source, functionName) {
  const declarationIndex = source.indexOf(`function ${functionName}(`);
  if (declarationIndex === -1) return null;
  const returnIndex = source.indexOf("return", declarationIndex);
  if (returnIndex === -1) return null;
  const objectStart = source.indexOf("{", returnIndex);
  if (objectStart === -1) return null;
  let depth = 0;
  let quote = "";
  let escaped = false;
  for (let index = objectStart; index < source.length; index += 1) {
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
    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(objectStart, index + 1);
    }
  }
  return null;
}

function ensureConstBlock(source, name, defaultValue, afterName = "areaSpawnTables") {
  if (findConstBlock(source, name)) return source;
  const after = findConstBlock(source, afterName);
  const insertion = `\n\nconst ${name} = ${JSON.stringify(defaultValue, null, 2)};`;
  if (!after) return `${source}${insertion}\n`;
  return `${source.slice(0, after.end)}${insertion}${source.slice(after.end)}`;
}

function ensureWorldDataExport(source, name) {
  const pattern = /window\.SoulreaperWorldData\s*=\s*\{([\s\S]*?)\n\};/m;
  const match = source.match(pattern);
  if (!match || match[1].includes(name)) return source;
  const insert = match[1].trim().length ? `,\n  ${name}` : `\n  ${name}`;
  return source.replace(pattern, `window.SoulreaperWorldData = {${match[1]}${insert}\n};`);
}

function toJsConst(name, entries) {
  return `const ${name} = ${JSON.stringify(entries, null, 2)};`;
}

function cleanItemRenames(rawRenames = {}) {
  return Object.fromEntries(Object.entries(rawRenames)
    .map(([from, to]) => [String(from || "").trim(), String(to || "").trim()])
    .filter(([from, to]) => from && to && from !== to));
}

function renameItemReferences(value, renames) {
  if (!renames || !Object.keys(renames).length) return value;
  if (typeof value === "string") return renames[value] || value;
  if (Array.isArray(value)) return value.map(entry => renameItemReferences(entry, renames));
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value).map(([key, entry]) => [
    renames[key] || key,
    renameItemReferences(entry, renames)
  ]));
}

function renameItemReferencesInSource(source, renames, context = {}) {
  if (!Object.keys(renames).length) return source;
  const names = [
    "shopkeeperStartingInventory",
    "shopkeeperStartingConsumables",
    "shopkeeperStartingScrolls",
    "monsterLootTables",
    "itemGraphics"
  ];
  for (const name of names) {
    const block = findConstBlock(source, name);
    if (!block) continue;
    const value = parseJsValue(block.valueText, name, context);
    const renamed = renameItemReferences(value, renames);
    context[name] = renamed;
    source = `${source.slice(0, block.start)}${toJsConst(name, renamed)}${source.slice(block.end)}`;
  }
  return source;
}

async function listAssetFolder(folder, extensions = new Set([".png", ".webp", ".jpg", ".jpeg"])) {
  const base = path.join(ROOT, folder);
  const entries = [];
  async function walk(dir) {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (extensions.has(path.extname(entry.name).toLowerCase())) {
        const relative = `./${path.relative(ROOT, full).split(path.sep).join("/")}`;
        const stat = await fs.stat(full);
        entries.push({
          name: path.basename(entry.name, path.extname(entry.name)),
          filename: entry.name,
          path: relative,
          folder: `./${path.relative(ROOT, path.dirname(full)).split(path.sep).join("/")}`,
          extension: path.extname(entry.name).toLowerCase(),
          size: stat.size
        });
      }
    }
  }
  await walk(base);
  return entries.sort((a, b) => a.path.localeCompare(b.path));
}

async function listAllAssets() {
  const base = path.join(ROOT, "assets");
  const entries = [];
  async function walk(dir) {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else {
        const stat = await fs.stat(full);
        entries.push({
          name: path.basename(entry.name, path.extname(entry.name)),
          filename: entry.name,
          path: `./${path.relative(ROOT, full).split(path.sep).join("/")}`,
          folder: `./${path.relative(ROOT, path.dirname(full)).split(path.sep).join("/")}`,
          extension: path.extname(entry.name).toLowerCase(),
          size: stat.size
        });
      }
    }
  }
  await walk(base);
  return entries.sort((a, b) => a.path.localeCompare(b.path));
}

function sanitizeAssetFilename(filename) {
  const clean = path.basename(String(filename || "")).replace(/[^a-zA-Z0-9._ -]/g, "-").replace(/\s+/g, "-");
  if (!clean || clean === "." || clean === "..") throw new Error("Asset filename is required.");
  return clean;
}

async function uploadAsset(payload) {
  const folder = String(payload.folder || "");
  if (!ASSET_UPLOAD_FOLDERS.has(folder)) throw new Error("That upload folder is not allowed.");
  const filename = sanitizeAssetFilename(payload.filename);
  const extension = path.extname(filename).toLowerCase();
  if (!ALLOWED_ASSET_EXTENSIONS.has(extension)) throw new Error(`Unsupported asset type: ${extension || "none"}.`);
  const destinationFolder = path.resolve(ROOT, folder);
  if (!destinationFolder.startsWith(path.join(ROOT, "assets"))) throw new Error("Invalid upload folder.");
  await fs.mkdir(destinationFolder, { recursive: true });
  const destination = path.join(destinationFolder, filename);
  if (!destination.startsWith(destinationFolder)) throw new Error("Invalid asset path.");
  try {
    await fs.stat(destination);
    throw new Error(`An asset named ${filename} already exists in that folder.`);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  const bytes = Buffer.from(String(payload.contentBase64 || ""), "base64");
  if (!bytes.length) throw new Error("Asset file is empty.");
  await fs.writeFile(destination, bytes);
  const stat = await fs.stat(destination);
  return {
    ok: true,
    asset: {
      name: path.basename(filename, extension),
      filename,
      path: `./${path.relative(ROOT, destination).split(path.sep).join("/")}`,
      folder: `./${path.relative(ROOT, destinationFolder).split(path.sep).join("/")}`,
      extension,
      size: stat.size
    }
  };
}

function spellSummaries(starterSpells, spellConfigs) {
  const existing = starterSpells.map(spell => {
    const override = spellConfigs[spell.name] || {};
    const summary = {
      name: spell.name,
      realm: spell.realm,
      lvl: spell.lvl || 1,
      cooldown: spell.cooldown ?? 0,
      range: spell.range ?? 0,
      text: spell.text || "",
      manualTarget: Boolean(spell.manualTarget),
      autocast: Boolean(spell.autocast),
      passive: Boolean(spell.passive),
      aura: Boolean(spell.aura),
      icon: override.icon || "",
      ...override
    };
    for (const key of ["aoeRadius", "duration", "tick", "formulas"]) {
      if (summary[key] === undefined && spell[key] !== undefined) summary[key] = spell[key];
    }
    return summary;
  });

  for (const [name, config] of Object.entries(spellConfigs)) {
    if (!existing.some(spell => spell.name === name)) existing.push({ name, ...config });
  }
  return existing;
}

function questSummaries(source, questConfigs, context = {}) {
  const quests = [];
  for (const functionName of QUEST_FACTORY_NAMES) {
    const objectText = findFunctionReturnObject(source, functionName);
    if (!objectText) continue;
    const baseQuest = parseJsValue(objectText, functionName, context);
    const override = questConfigs[baseQuest.id] || {};
    quests.push({ ...baseQuest, ...override, id: baseQuest.id });
  }
  for (const [id, config] of Object.entries(DEFAULT_QUEST_CONFIGS)) {
    const override = questConfigs[id] || {};
    if (!quests.some(quest => quest.id === id)) quests.push({ ...structuredClone(config), ...override, id });
  }
  for (const [id, config] of Object.entries(questConfigs)) {
    if (!quests.some(quest => quest.id === id)) quests.push({ id, ...config });
  }
  return quests;
}

function fixedEliteUnitSummaries(mapSource, unitGroups) {
  const templates = new Map(Object.values(unitGroups)
    .flatMap(group => group.entries || [])
    .map(unit => [unit.name, unit]));
  const seen = new Set();
  const elites = [];
  for (const match of mapSource.matchAll(/\{[^{}]*template:\s*["']([^"']+)["'][^{}]*\}/gs)) {
    const objectText = match[0];
    const templateName = match[1];
    const name = objectText.match(/\bname:\s*["']([^"']+)["']/)?.[1] || templateName;
    const lvl = Number(objectText.match(/\blvl:\s*(\d+)/)?.[1]) || 1;
    if (templates.has(name)) continue;
    const key = `${name}|${templateName}|${lvl}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const template = templates.get(templateName) || {};
    elites.push({
      ...JSON.parse(JSON.stringify(template)),
      name,
      template: templateName,
      lvl,
      elite: true,
      existingElite: true,
      source: "Fixed Elite Spawn"
    });
  }
  return elites;
}

function shopEntryName(entry) {
  return typeof entry === "string" ? entry : entry?.name;
}

function editorShopEntry(entry) {
  const name = shopEntryName(entry);
  if (!name) return null;
  return typeof entry === "object" && entry.quantity !== undefined
    ? { name, quantity: Number(entry.quantity) || 1 }
    : name;
}

function defaultShopForEditor(startingInventory = [], startingConsumables = [], startingScrolls = [], items = {}) {
  const weaponNames = new Set((items.weapons || []).map(item => item.name));
  const equipmentNames = new Set((items.equipment || []).map(item => item.name));
  const bagNames = new Set((items.bags || []).map(item => item.name));
  const shop = { weapons: [], equipment: [], bags: [], consumables: [], scrolls: [], misc: [] };
  for (const entry of startingInventory || []) {
    const name = shopEntryName(entry);
    const editorEntry = editorShopEntry(entry);
    if (!name) continue;
    if (weaponNames.has(name)) shop.weapons.push(editorEntry);
    else if (equipmentNames.has(name)) shop.equipment.push(editorEntry);
    else if (bagNames.has(name)) shop.bags.push(editorEntry);
    else shop.misc.push(editorEntry);
  }
  shop.consumables = (startingConsumables || []).map(editorShopEntry).filter(Boolean);
  shop.scrolls = (startingScrolls || []).map(editorShopEntry).filter(Boolean);
  return Object.fromEntries(Object.entries(shop).filter(([, names]) => names.length));
}

function hydrateShopQuantities(shop = {}, defaultShop = {}) {
  const hydrated = {};
  for (const group of ITEM_GROUPS) {
    const entries = shop[group] || [];
    const defaults = defaultShop[group] || [];
    const usedDefaults = new Set();
    hydrated[group] = entries.map(entry => {
      if (typeof entry === "object" && entry?.quantity !== undefined) return entry;
      const name = shopEntryName(entry);
      if (!name) return entry;
      const defaultIndex = defaults.findIndex((candidate, index) =>
        !usedDefaults.has(index) && shopEntryName(candidate) === name
      );
      if (defaultIndex === -1) return entry;
      usedDefaults.add(defaultIndex);
      const defaultEntry = defaults[defaultIndex];
      return typeof defaultEntry === "object" && defaultEntry.quantity !== undefined
        ? { name, quantity: Number(defaultEntry.quantity) || 1 }
        : entry;
    }).filter(Boolean);
    if (!hydrated[group].length) delete hydrated[group];
  }
  return hydrated;
}

function npcSummaries(npcConfigs = [], defaultShop = {}) {
  const byId = new Map(DEFAULT_NPC_CONFIGS.map(npc => [npc.id, { ...npc }]));
  for (const npc of npcConfigs || []) {
    if (!npc?.id) continue;
    byId.set(npc.id, { ...(byId.get(npc.id) || {}), ...npc });
  }
  for (const npc of byId.values()) {
    if (npc.shopkeeper && !npc.shop) npc.shop = structuredClone(defaultShop);
    else if (npc.shopkeeper) npc.shop = hydrateShopQuantities(npc.shop, defaultShop);
  }
  return [...byId.values()];
}

function inheritedLootSummaries(unitGroups, itemContext = {}) {
  return {};
}

function normalizeAssetPath(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  if (text.startsWith("./assets/")) return text;
  if (text.startsWith("assets/")) return `./${text}`;
  if (text.startsWith("/assets/")) return `.${text}`;
  return text;
}

function resolveItemGraphicPath(item, itemIconSources, itemGraphics) {
  const graphic = item?.graphic || item?.weapon?.graphic || itemGraphics?.[item?.name] || "";
  const source = itemIconSources?.[String(graphic).toLowerCase()] || graphic;
  return normalizeAssetPath(source);
}

function resolveItemGraphicTint(item, itemIconTints = {}) {
  const explicit = item?.graphicTint || item?.weapon?.graphicTint;
  if (explicit) return explicit;
  return itemIconTints?.[String(item?.graphic || "").toLowerCase()]
    || itemIconTints?.[String(item?.name || "").toLowerCase()]
    || "";
}

function resolveItemGraphicForEditor(item, itemIconSources, itemGraphics, itemIconTints) {
  const path = resolveItemGraphicPath(item, itemIconSources, itemGraphics);
  const builtInGemTint = itemIconTints?.[String(path || "").toLowerCase()]
    || itemIconTints?.[String(item?.name || "").toLowerCase()];
  return builtInGemTint
    ? "./assets/items/neutral-gem.png"
    : path;
}

function itemSummaries(weaponTemplates, itemTemplates, itemIconSources = {}, itemGraphics = {}, itemIconTints = {}) {
  const weapons = Object.values(weaponTemplates).map(weapon => {
    const item = itemTemplates[weapon.name] || {};
    const summary = {
      ...item,
      ...weapon,
      name: weapon.name,
      slot: item.slot || "Main Hand",
      rarity: item.rarity || weapon.rarity || "common",
      stats: item.stats || weapon.statBuffs || {},
      weapon: { ...weapon }
    };
    return {
      ...summary,
      graphic: resolveItemGraphicForEditor(summary, itemIconSources, itemGraphics, itemIconTints),
      graphicTint: resolveItemGraphicTint(summary, itemIconTints)
    };
  });
  const weaponNames = new Set(weapons.map(item => item.name));
  const equipment = [];
  const bags = [];
  const consumables = [];
  const scrolls = [];
  const misc = [];
  for (const item of Object.values(itemTemplates)) {
    if (weaponNames.has(item.name)) continue;
    const summary = {
      ...item,
      graphic: resolveItemGraphicForEditor(item, itemIconSources, itemGraphics, itemIconTints)
    };
    summary.graphicTint = resolveItemGraphicTint(summary, itemIconTints);
    if (summary.bag || summary.slot === "Bag") bags.push(summary);
    else if (summary.scroll || summary.slot === "Scroll") scrolls.push(summary);
    else if (summary.consumable || ["Supply", "Consumable"].includes(summary.slot)) consumables.push(summary);
    else if (["Head", "Chest", "Legs", "Shoulders", "Hands", "Feet", "Off-Hand", "Neck", "Finger", "Wrist", "Ear", "Waist", "Cape", "Right Ear", "Left Ear"].includes(summary.slot)) equipment.push(summary);
    else misc.push(summary);
  }
  return { weapons, equipment, bags, consumables, scrolls, misc };
}

async function loadData() {
  let source = await fs.readFile(GAME_FILE, "utf8");
  const itemSource = await fs.readFile(ITEM_DATA_FILE, "utf8");
  const itemArtSource = await fs.readFile(ITEM_ART_DATA_FILE, "utf8");
  const monsterSource = await fs.readFile(MONSTER_DATA_FILE, "utf8");
  const mapSource = await fs.readFile(MAP_GENERATION_FILE, "utf8");
  let worldSource = await fs.readFile(WORLD_DATA_FILE, "utf8");
  const spellSource = await fs.readFile(SPELL_DATA_FILE, "utf8");
  worldSource = ensureConstBlock(worldSource, "devAreaConfigs", DEFAULT_AREA_CONFIGS);
  worldSource = ensureConstBlock(worldSource, "devSpellConfigs", {}, "devAreaConfigs");
  worldSource = ensureConstBlock(worldSource, "devQuestConfigs", {}, "devSpellConfigs");
  worldSource = ensureConstBlock(worldSource, "devNpcConfigs", [], "devQuestConfigs");
  worldSource = ensureConstBlock(worldSource, "devDungeonConfigs", [], "devNpcConfigs");
  worldSource = ensureConstBlock(worldSource, "devCraftingRecipes", Object.fromEntries(CRAFTING_SKILLS.map(skill => [skill, []])), "devDungeonConfigs");
  worldSource = ensureConstBlock(worldSource, "devFactionConfigs", [], "devCraftingRecipes");
  worldSource = ensureWorldDataExport(worldSource, "devFactionConfigs");
  if (worldSource !== await fs.readFile(WORLD_DATA_FILE, "utf8")) await fs.writeFile(WORLD_DATA_FILE, worldSource, "utf8");

  const context = constContext(source);
  const unitGroups = {};
  for (const [name, config] of Object.entries(UNIT_GROUPS)) {
    const block = findConstBlock(monsterSource, name);
    unitGroups[name] = { label: config.label, entries: parseJsValue(block.valueText, name, context) };
  }
  unitGroups.existingEliteUnits = {
    label: "Existing Elite Units",
    virtual: true,
    entries: fixedEliteUnitSummaries(mapSource, unitGroups)
  };

  const spawnTables = parseJsValue(findConstBlock(worldSource, "areaSpawnTables").valueText, "areaSpawnTables", context);
  const areaConfigs = {
    ...DEFAULT_AREA_CONFIGS,
    ...parseJsValue(findConstBlock(worldSource, "devAreaConfigs").valueText, "devAreaConfigs", context)
  };
  const spellConfigs = parseJsValue(findConstBlock(worldSource, "devSpellConfigs").valueText, "devSpellConfigs", context);
  const questConfigs = parseJsValue(findConstBlock(worldSource, "devQuestConfigs").valueText, "devQuestConfigs", context);
  const npcConfigs = parseJsValue(findConstBlock(worldSource, "devNpcConfigs").valueText, "devNpcConfigs", context);
  const dungeonConfigs = parseJsValue(findConstBlock(worldSource, "devDungeonConfigs").valueText, "devDungeonConfigs", context);
  const craftingRecipes = parseJsValue(findConstBlock(worldSource, "devCraftingRecipes").valueText, "devCraftingRecipes", context);
  const factionConfigs = parseJsValue(findConstBlock(worldSource, "devFactionConfigs").valueText, "devFactionConfigs", context);
  const enchantmentTemplates = parseJsValue(findConstBlock(source, "enchantmentTemplates").valueText, "enchantmentTemplates", context);
  const starterSpells = parseJsValue(findConstBlock(spellSource, "starterSpells").valueText, "starterSpells", context);
  const weaponTemplates = parseJsValue(findConstBlock(itemSource, "weaponTemplates").valueText, "weaponTemplates", context);
  const itemIconSources = parseJsValue(findConstBlock(itemArtSource, "itemIconSources").valueText, "itemIconSources", context);
  const itemGraphics = parseJsValue(findConstBlock(itemArtSource, "itemGraphics").valueText, "itemGraphics", context);
  const itemIconTints = parseJsValue(findConstBlock(itemArtSource, "itemIconTints").valueText, "itemIconTints", context);
  const itemContext = { ...context, weaponTemplates };
  const itemTemplates = parseJsValue(findConstBlock(itemSource, "itemTemplates").valueText, "itemTemplates", itemContext);
  const monsterLootTables = parseJsValue(findConstBlock(monsterSource, "monsterLootTables").valueText, "monsterLootTables", itemContext);
  const items = itemSummaries(weaponTemplates, itemTemplates, itemIconSources, itemGraphics, itemIconTints);
  const shopkeeperStartingInventory = parseJsValue(findConstBlock(itemSource, "shopkeeperStartingInventory").valueText, "shopkeeperStartingInventory", itemContext);
  const shopkeeperStartingConsumables = parseJsValue(findConstBlock(itemSource, "shopkeeperStartingConsumables").valueText, "shopkeeperStartingConsumables", itemContext);
  const shopkeeperStartingScrolls = parseJsValue(findConstBlock(itemSource, "shopkeeperStartingScrolls").valueText, "shopkeeperStartingScrolls", itemContext);
  const defaultShop = defaultShopForEditor(shopkeeperStartingInventory, shopkeeperStartingConsumables, shopkeeperStartingScrolls, items);

  for (const areaName of Object.keys(spawnTables)) {
    areaConfigs[areaName] ||= {
      connectsTo: [],
      environment: { groundTexture: "./assets/ground/ganderswood.png", features: [] }
    };
  }

  const payload = {
    gameFile: GAME_FILE,
    unitGroups,
    areas: Object.entries(areaConfigs).map(([name, config]) => ({
      name,
      levelRange: config.levelRange || DEFAULT_AREA_CONFIGS[name]?.levelRange || { min: 1, max: 1 },
      ...(config.spawnRate ? { spawnRate: config.spawnRate } : {}),
      ...(config.spawnAmount ? { spawnAmount: config.spawnAmount } : {}),
      connectsTo: config.connectsTo || [],
      environment: {
        groundTexture: config.environment?.groundTexture || "",
        features: config.environment?.features || []
      },
      spawnTable: spawnTables[name] || []
    })),
    dungeons: Array.isArray(dungeonConfigs) ? dungeonConfigs : [],
    factions: normalizeFactionConfigs(factionConfigs),
    spells: spellSummaries(starterSpells, spellConfigs),
    enchantments: Object.values(enchantmentTemplates),
    craftingRecipes,
    quests: questSummaries(source, questConfigs, context),
    npcs: npcSummaries(npcConfigs, defaultShop),
    items,
    lootTables: monsterLootTables,
    inheritedLootTables: inheritedLootSummaries(unitGroups, itemContext),
    assets: {
      all: await listAllAssets(),
      unitSprites: [...await listAssetFolder("assets/sprites/mobs"), ...await listAssetFolder("assets/sprites/npcs")],
      featureSprites: await listAssetFolder("assets/sprites/props"),
      groundTextures: await listAssetFolder("assets/ground"),
      spellIcons: await listAssetFolder("assets/spells"),
      audio: await listAssetFolder("assets/audio", AUDIO_ASSET_EXTENSIONS)
    },
    loadedAt: new Date().toISOString()
  };
  return normalizeRealmData(payload);
}

function validateUnit(unit, groupName, index, seenNames) {
  const errors = [];
  const where = `${groupName}[${index}]`;
  if (!unit?.name) errors.push(`${where}.name is required.`);
  if (unit?.name && seenNames.has(unit.name)) errors.push(`${where}.name duplicates "${unit.name}".`);
  if (unit?.name) seenNames.add(unit.name);
  for (const key of ["realm", "type", "alignment"]) if (!unit?.[key]) errors.push(`${where}.${key} is required.`);
  if (!unit?.weapon?.name) errors.push(`${where}.weapon.name is required.`);
  for (const stat of ["HP", "ATK", "DEF", "SPD", "AGL", "INT", "FOCUS", "BLOCK", "RESIST", "REGEN"]) {
    if (!Number.isFinite(Number(unit?.stats?.[stat]))) errors.push(`${where}.stats.${stat} must be a number.`);
  }
  if (unit?.radius !== undefined && !Number.isFinite(Number(unit.radius))) errors.push(`${where}.radius must be a number.`);
  errors.push(...validateSpriteChannels(unit?.spriteChannels || unit?.channels, `${where}.spriteChannels`));
  return errors;
}

function factionId(value) {
  return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function normalizeFactionConfigs(factions = []) {
  const byId = new Map();
  for (const faction of Array.isArray(factions) ? factions : []) {
    const id = factionId(faction?.id || faction?.name);
    if (!id) continue;
    byId.set(id, {
      id,
      name: String(faction?.name || id).trim() || id,
      enemyFactionIds: [...new Set((faction?.enemyFactionIds || []).map(factionId).filter(Boolean))].filter(enemyId => enemyId !== id)
    });
  }
  for (const faction of byId.values()) {
    faction.enemyFactionIds = faction.enemyFactionIds.filter(id => byId.has(id));
  }
  for (const faction of byId.values()) {
    for (const enemyId of faction.enemyFactionIds) {
      const enemy = byId.get(enemyId);
      if (enemy && !enemy.enemyFactionIds.includes(faction.id)) enemy.enemyFactionIds.push(faction.id);
    }
  }
  return [...byId.values()].sort((a, b) => a.name.localeCompare(b.name));
}

function validateFactions(factions = []) {
  const errors = [];
  const normalized = normalizeFactionConfigs(factions);
  const seen = new Set();
  normalized.forEach((faction, index) => {
    const where = `factions[${index}]`;
    if (!faction.id) errors.push(`${where}.id is required.`);
    if (!faction.name) errors.push(`${where}.name is required.`);
    if (seen.has(faction.id)) errors.push(`${where}.id duplicates "${faction.id}".`);
    seen.add(faction.id);
  });
  return errors;
}

function validateSpriteChannels(channels, where) {
  const errors = [];
  if (channels === undefined || channels === null) return errors;
  if (!channels || typeof channels !== "object" || Array.isArray(channels)) return [`${where} must be an object.`];
  for (const [key, value] of Object.entries(channels)) {
    if (!SPRITE_CHANNEL_KEYS.includes(key)) errors.push(`${where}.${key} is not a recognized channel.`);
    if (typeof value !== "string" || !/^#[0-9a-f]{6}$/i.test(value)) errors.push(`${where}.${key} must be a 6-digit hex color.`);
  }
  return errors;
}

function validateJsonSafeValue(value, where, errors) {
  if (value === null) return;
  if (["string", "number", "boolean"].includes(typeof value)) {
    if (typeof value === "number" && !Number.isFinite(value)) errors.push(`${where} must be a finite number.`);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) => validateJsonSafeValue(entry, `${where}[${index}]`, errors));
    return;
  }
  if (typeof value === "object") {
    for (const [key, entry] of Object.entries(value)) {
      if (["__proto__", "prototype", "constructor"].includes(key)) errors.push(`${where}.${key} is not allowed.`);
      validateJsonSafeValue(entry, `${where}.${key}`, errors);
    }
    return;
  }
  errors.push(`${where} must be JSON data, not ${typeof value}.`);
}

function validateSpell(spell, index, seenNames) {
  const errors = [];
  const where = `spells[${index}]`;
  if (!spell || typeof spell !== "object" || Array.isArray(spell)) return [`${where} must be an object.`];
  if (!spell.name) errors.push(`${where}.name is required.`);
  if (spell.name && seenNames.has(spell.name)) errors.push(`${where}.name duplicates "${spell.name}".`);
  if (spell.name) seenNames.add(spell.name);
  if (!REALMS.includes(spell.realm)) errors.push(`${where}.realm must be one of ${REALMS.join(", ")}.`);
  for (const key of SPELL_NUMERIC_KEYS) {
    if (spell[key] !== undefined && !Number.isFinite(Number(spell[key]))) errors.push(`${where}.${key} must be a number.`);
  }
  for (const key of SPELL_BOOLEAN_KEYS) {
    if (spell[key] !== undefined && typeof spell[key] !== "boolean") errors.push(`${where}.${key} must be true or false.`);
  }
  for (const key of Object.keys(spell)) {
    if (BLOCKED_SPELL_JSON_KEYS.has(key)) errors.push(`${where}.${key} cannot be edited from the Dev Interface.`);
  }
  errors.push(...validateSpellFormulas(spell.formulas, `${where}.formulas`));
  errors.push(...validateSpellTextPlaceholders(spell, where));
  validateJsonSafeValue(spell, where, errors);
  return errors;
}

function validateSpellFormulas(formulas, where) {
  const errors = [];
  if (formulas === undefined) return errors;
  if (!formulas || typeof formulas !== "object" || Array.isArray(formulas)) return [`${where} must be an object.`];
  for (const [name, formula] of Object.entries(formulas)) {
    const formulaWhere = `${where}.${name}`;
    if (["__proto__", "prototype", "constructor"].includes(name)) {
      errors.push(`${formulaWhere} is not allowed.`);
      continue;
    }
    if (!formula || typeof formula !== "object" || Array.isArray(formula)) {
      errors.push(`${formulaWhere} must be an object.`);
      continue;
    }
    for (const key of ["base", "perLevel", "statScale"]) {
      if (formula[key] !== undefined && !Number.isFinite(Number(formula[key]))) errors.push(`${formulaWhere}.${key} must be a number.`);
    }
    if (formula.stat !== undefined && formula.stat !== null && !SPELL_FORMULA_STATS.has(formula.stat)) {
      errors.push(`${formulaWhere}.stat must be a known stat or null.`);
    }
  }
  return errors;
}

function validateSpellTextPlaceholders(spell, where) {
  const errors = [];
  const allowed = new Set(["lvl", "level", "duration", "tick", "aoeRadius", "aoe", ...Object.keys(spell.formulas || {})]);
  for (const match of String(spell.text || "").matchAll(/\{([A-Za-z][A-Za-z0-9_]*)\}/g)) {
    if (!allowed.has(match[1])) errors.push(`${where}.text uses unknown placeholder {${match[1]}}.`);
  }
  return errors;
}

const QUEST_OBJECTIVE_TYPES = new Set(["item", "kill", "phase", "flag", "custom"]);

function validateQuest(quest, index, seenIds, context = {}) {
  const errors = [];
  const where = `quests[${index}]`;
  if (!quest || typeof quest !== "object" || Array.isArray(quest)) return [`${where} must be an object.`];
  if (!quest.id) errors.push(`${where}.id is required.`);
  if (quest.id && seenIds.has(quest.id)) errors.push(`${where}.id duplicates "${quest.id}".`);
  if (quest.id) seenIds.add(quest.id);
  if (!quest.name) errors.push(`${where}.name is required.`);
  if (quest.minimumLevel !== undefined && (!Number.isFinite(Number(quest.minimumLevel)) || Number(quest.minimumLevel) < 1)) errors.push(`${where}.minimumLevel must be a positive number.`);
  if (quest.minimumRealm !== undefined && !REALMS.includes(quest.minimumRealm)) errors.push(`${where}.minimumRealm must be a valid Realm.`);
  if (quest.minimumRealmLevel !== undefined && (!Number.isFinite(Number(quest.minimumRealmLevel)) || Number(quest.minimumRealmLevel) < 1)) errors.push(`${where}.minimumRealmLevel must be a positive number.`);
  for (const key of ["rewardXp", "rewardGold", "rewardVirtue"]) {
    if (quest[key] !== undefined && !Number.isFinite(Number(quest[key]))) errors.push(`${where}.${key} must be a number.`);
  }
  if (quest.rewardItems !== undefined && !Array.isArray(quest.rewardItems)) errors.push(`${where}.rewardItems must be a list.`);
  const itemNames = context.itemNames || new Set();
  const unitNames = context.unitNames || new Set();
  for (const itemName of [quest.rewardItem, ...(Array.isArray(quest.rewardItems) ? quest.rewardItems : [])].filter(Boolean)) {
    if (itemNames.size && !itemNames.has(itemName)) errors.push(`${where} reward item "${itemName}" does not exist.`);
  }
  if (quest.objectives !== undefined && !Array.isArray(quest.objectives)) errors.push(`${where}.objectives must be a list.`);
  if (Array.isArray(quest.objectives)) {
    const labels = new Set();
    quest.objectives.forEach((objective, objectiveIndex) => {
      const objectiveWhere = `${where}.objectives[${objectiveIndex}]`;
      if (!objective || typeof objective !== "object" || Array.isArray(objective)) {
        errors.push(`${objectiveWhere} must be an object.`);
        return;
      }
      const label = String(objective.label || "").trim();
      if (!QUEST_OBJECTIVE_TYPES.has(objective.type)) errors.push(`${objectiveWhere}.type must be item, kill, phase, flag, or custom.`);
      if (!label) errors.push(`${objectiveWhere}.label is required.`);
      if (label && labels.has(label)) errors.push(`${objectiveWhere}.label duplicates "${label}".`);
      if (label) labels.add(label);
      if (!Number.isFinite(Number(objective.required)) || Number(objective.required) < 1) errors.push(`${objectiveWhere}.required must be a positive number.`);
      if (objective.type === "item" && (!objective.item || (itemNames.size && !itemNames.has(objective.item)))) errors.push(`${objectiveWhere}.item must be an existing item.`);
      if (objective.type === "kill" && (!objective.enemy || (unitNames.size && !unitNames.has(objective.enemy)))) errors.push(`${objectiveWhere}.enemy must be an existing unit.`);
      if (objective.type === "phase" && !String(objective.completePhase || "").trim()) errors.push(`${objectiveWhere}.completePhase is required.`);
      if (objective.type === "flag" && !String(objective.flag || "").trim()) errors.push(`${objectiveWhere}.flag is required.`);
      if (objective.type === "custom" && !String(objective.key || "").trim()) errors.push(`${objectiveWhere}.key is required.`);
    });
  }
  validateJsonSafeValue(quest, where, errors);
  return errors;
}

function validateNpc(npc, index, seenIds) {
  const errors = [];
  const where = `npcs[${index}]`;
  if (!npc || typeof npc !== "object" || Array.isArray(npc)) return [`${where} must be an object.`];
  if (!npc.id) errors.push(`${where}.id is required.`);
  if (npc.id && seenIds.has(npc.id)) errors.push(`${where}.id duplicates "${npc.id}".`);
  if (npc.id) seenIds.add(npc.id);
  if (!npc.name) errors.push(`${where}.name is required.`);
  if (!npc.area) errors.push(`${where}.area is required.`);
  if (npc.alignment && !NPC_ALIGNMENTS.includes(npc.alignment)) errors.push(`${where}.alignment must be one of ${NPC_ALIGNMENTS.join(", ")}.`);
  if (npc.faction !== undefined && typeof npc.faction !== "string") errors.push(`${where}.faction must be a string.`);
  if (npc.mustBeFactionAlly !== undefined && typeof npc.mustBeFactionAlly !== "boolean") errors.push(`${where}.mustBeFactionAlly must be true or false.`);
  if (npc.factionNotAllyText !== undefined && typeof npc.factionNotAllyText !== "string") errors.push(`${where}.factionNotAllyText must be a string.`);
  if (npc.factionEnemyText !== undefined && typeof npc.factionEnemyText !== "string") errors.push(`${where}.factionEnemyText must be a string.`);
  if (npc.radius !== undefined && !Number.isFinite(Number(npc.radius))) errors.push(`${where}.radius must be a number.`);
  if (npc.trainerMaxSpellLevel !== undefined && (!Number.isFinite(Number(npc.trainerMaxSpellLevel)) || Number(npc.trainerMaxSpellLevel) < 1)) errors.push(`${where}.trainerMaxSpellLevel must be a positive number.`);
  if (npc.startsQuest) {
    const hasQuestId = Boolean(String(npc.questId || "").trim());
    const hasQuestChain = Array.isArray(npc.questChain) && npc.questChain.some(id => String(id || "").trim());
    if (!hasQuestId && !hasQuestChain) errors.push(`${where} starts quests but has no questId or questChain.`);
    if (!String(npc.sprite || "").trim()) errors.push(`${where} starts quests but has no sprite.`);
  }
  errors.push(...validateSpriteChannels(npc.spriteChannels || npc.channels, `${where}.spriteChannels`));
  if (npc.shop !== undefined && (!npc.shop || typeof npc.shop !== "object" || Array.isArray(npc.shop))) errors.push(`${where}.shop must be an object.`);
  for (const group of ITEM_GROUPS) {
    if (npc.shop?.[group] !== undefined && !Array.isArray(npc.shop[group])) errors.push(`${where}.shop.${group} must be a list.`);
  }
  validateJsonSafeValue(npc, where, errors);
  return errors;
}

function validatePayload(payload) {
  const errors = [];
  const seenNames = new Set();
  const questIds = new Set([
    ...BUILTIN_QUEST_IDS,
    ...Object.keys(DEFAULT_QUEST_CONFIGS),
    ...((payload.quests || []).map(quest => quest?.id).filter(Boolean))
  ]);
  for (const groupName of Object.keys(UNIT_GROUPS)) {
    if (!Array.isArray(payload.unitGroups?.[groupName])) errors.push(`${groupName} must be a list.`);
    else payload.unitGroups[groupName].forEach((unit, index) => errors.push(...validateUnit(unit, groupName, index, seenNames)));
  }
  errors.push(...validateFactions(payload.factions || []));
  if (!Array.isArray(payload.areas)) errors.push("areas must be a list.");
  if (!Array.isArray(payload.dungeons)) errors.push("dungeons must be a list.");
  else {
    const seenDungeonIds = new Set();
    payload.dungeons.forEach((dungeon, index) => {
      const where = `dungeons[${index}]`;
      if (!dungeon?.id) errors.push(`${where}.id is required.`);
      if (!dungeon?.name) errors.push(`${where}.name is required.`);
      if (dungeon?.id && seenDungeonIds.has(dungeon.id)) errors.push(`${where}.id duplicates "${dungeon.id}".`);
      if (dungeon?.id) seenDungeonIds.add(dungeon.id);
      if (!Number.isFinite(Number(dungeon?.width)) || Number(dungeon.width) < 1) errors.push(`${where}.width must be a positive number.`);
      if (!Number.isFinite(Number(dungeon?.height)) || Number(dungeon.height) < 1) errors.push(`${where}.height must be a positive number.`);
      if (dungeon?.cells !== undefined && !Array.isArray(dungeon.cells)) errors.push(`${where}.cells must be a list.`);
      if (dungeon?.units !== undefined && !Array.isArray(dungeon.units)) errors.push(`${where}.units must be a list.`);
      validateJsonSafeValue(dungeon, where, errors);
    });
  }
  if (!Array.isArray(payload.spells)) errors.push("spells must be a list.");
  else {
    const seenSpellNames = new Set();
    payload.spells.forEach((spell, index) => errors.push(...validateSpell(spell, index, seenSpellNames)));
  }
  if (!Array.isArray(payload.enchantments)) errors.push("enchantments must be a list.");
  else {
    const seenEnchantmentNames = new Set();
    payload.enchantments.forEach((enchantment, index) => {
      const where = `enchantments[${index}]`;
      if (!enchantment?.name) errors.push(`${where}.name is required.`);
      if (enchantment?.name && seenEnchantmentNames.has(enchantment.name)) errors.push(`${where}.name duplicates "${enchantment.name}".`);
      if (enchantment?.name) seenEnchantmentNames.add(enchantment.name);
      if (!enchantment?.realm) errors.push(`${where}.realm is required.`);
      if (enchantment?.stats && typeof enchantment.stats !== "object") errors.push(`${where}.stats must be an object.`);
      for (const key of ["requiredSlots", "requiredWeaponTypes", "requiredArmorTypes"]) {
        if (enchantment?.[key] !== undefined && !Array.isArray(enchantment[key])) errors.push(`${where}.${key} must be a list.`);
      }
      if (enchantment?.colorChannels !== undefined && (!enchantment.colorChannels || typeof enchantment.colorChannels !== "object" || Array.isArray(enchantment.colorChannels))) {
        errors.push(`${where}.colorChannels must be an object.`);
      }
    });
  }
  if (!payload.craftingRecipes || typeof payload.craftingRecipes !== "object") errors.push("craftingRecipes must be present.");
  else {
    for (const skill of CRAFTING_SKILLS) {
      if (!Array.isArray(payload.craftingRecipes[skill])) errors.push(`craftingRecipes.${skill} must be a list.`);
      else payload.craftingRecipes[skill].forEach((recipe, index) => validateJsonSafeValue(recipe, `craftingRecipes.${skill}[${index}]`, errors));
    }
  }
  if (!Array.isArray(payload.quests)) errors.push("quests must be a list.");
  else {
    const seenQuestIds = new Set();
    const itemNames = new Set(ITEM_GROUPS.flatMap(group => (payload.items?.[group] || []).map(item => item?.name).filter(Boolean)));
    const unitNames = new Set(Object.keys(UNIT_GROUPS).flatMap(groupName => (payload.unitGroups?.[groupName] || []).map(unit => unit?.name).filter(Boolean)));
    payload.quests.forEach((quest, index) => errors.push(...validateQuest(quest, index, seenQuestIds, { itemNames, unitNames })));
  }
  if (!Array.isArray(payload.npcs)) errors.push("npcs must be a list.");
  else {
    const seenNpcIds = new Set();
    payload.npcs.forEach((npc, index) => {
      errors.push(...validateNpc(npc, index, seenNpcIds));
      if (!npc?.startsQuest) return;
      const referencedQuestIds = [
        npc.questId,
        ...(Array.isArray(npc.questChain) ? npc.questChain : [])
      ].map(id => String(id || "").trim()).filter(Boolean);
      for (const questId of referencedQuestIds) {
        if (!questIds.has(questId)) errors.push(`npcs[${index}] references missing quest "${questId}".`);
      }
    });
  }
  if (!payload.items || typeof payload.items !== "object") errors.push("items must be present.");
  if (!payload.lootTables || typeof payload.lootTables !== "object") errors.push("lootTables must be present.");
  return errors;
}

function areasToConfig(areas) {
  return Object.fromEntries(areas.map(area => {
    const config = {
      levelRange: area.levelRange || { min: 1, max: 1 },
      connectsTo: area.connectsTo || [],
      environment: area.environment || { groundTexture: "", features: [] }
    };
    if (area.spawnRate) config.spawnRate = area.spawnRate;
    if (area.spawnAmount) config.spawnAmount = area.spawnAmount;
    return [area.name, config];
  }));
}

function areasToSpawnTables(areas) {
  return Object.fromEntries(areas.map(area => [area.name, area.spawnTable || []]));
}

function dungeonsToConfig(dungeons) {
  return (dungeons || []).map(dungeon => ({
    ...dungeon,
    id: dungeon.id,
    name: dungeon.name || dungeon.id,
    cellSize: 128,
    width: Number(dungeon.width || 1),
    height: Number(dungeon.height || 1),
    wallTexture: dungeon.wallTexture || "./assets/ground/whisperspring-wall.png",
    entrance: dungeon.entrance || { x: 0, y: 0 },
    cells: dungeon.cells || [],
    units: dungeon.units || [],
    npcs: dungeon.npcs || [],
    water: dungeon.water || [],
    spawnTable: dungeon.spawnTable || []
  }));
}

function spellsToConfig(spells) {
  return Object.fromEntries(spells.map(spell => [spell.name, {
    ...spell,
    name: spell.name,
    realm: spell.realm,
    lvl: Number(spell.lvl || 1),
    cooldown: Number(spell.cooldown || 0),
    range: Number(spell.range || 0),
    text: spell.text || "",
    manualTarget: Boolean(spell.manualTarget),
    autocast: Boolean(spell.autocast),
    passive: Boolean(spell.passive),
    aura: Boolean(spell.aura),
    icon: spell.icon || "",
    formulas: spell.formulas || {},
    soundEffect: spell.soundEffect || ""
  }]));
}

function enchantmentsToTemplates(enchantments) {
  return Object.fromEntries((enchantments || []).map(enchantment => [enchantment.name, {
    ...enchantment,
    name: enchantment.name,
    realm: enchantment.realm || "Mortal",
    stats: enchantment.stats || {}
  }]));
}

function questsToConfig(quests) {
  const byId = new Map(Object.entries(DEFAULT_QUEST_CONFIGS).map(([id, quest]) => [id, structuredClone(quest)]));
  for (const quest of quests || []) {
    if (!quest?.id) continue;
    byId.set(quest.id, {
      ...(byId.get(quest.id) || {}),
      ...quest,
      id: quest.id,
      name: quest.name || quest.id,
      description: quest.description || ""
    });
  }
  return Object.fromEntries(byId);
}

function npcsToConfig(npcs) {
  const byId = new Map(DEFAULT_NPC_CONFIGS.map(npc => [npc.id, structuredClone(npc)]));
  for (const npc of npcs || []) {
    if (!npc?.id) continue;
    byId.set(npc.id, {
      ...(byId.get(npc.id) || {}),
      ...npc,
      id: npc.id,
      name: npc.name || npc.id,
      area: npc.area || "The Ganderswood",
      alignment: npc.alignment || "Neutral",
      radius: Number(npc.radius || 16)
    });
  }
  return [...byId.values()];
}

function weaponsToTemplates(weapons) {
  return Object.fromEntries((weapons || []).map(item => {
    const weapon = {
      ...(item.weapon || {}),
      name: item.name,
      realm: item.realm || item.weapon?.realm || "Mortal",
      hands: item.hands || item.weapon?.hands || "One-Handed",
      dmgType: item.dmgType || item.weapon?.dmgType || "Physical",
      dice: item.dice || item.weapon?.dice || "1D4",
      speed: Number(item.speed ?? item.weapon?.speed ?? 100),
      range: Number(item.range ?? item.weapon?.range ?? 1),
      animation: item.animation || item.weapon?.animation || "slash",
      lore: item.lore || item.weapon?.lore || undefined,
      graphic: item.graphic || item.weapon?.graphic || "question mark",
      graphicSize: Number(item.graphicSize ?? item.weapon?.graphicSize ?? 30),
      graphicTint: item.graphicTint || item.weapon?.graphicTint,
      graphicChannels: item.graphicChannels || item.weapon?.graphicChannels,
      glow: item.glow ?? item.weapon?.glow,
      glowColor: item.glowColor || item.weapon?.glowColor,
      maleAvatarSprite: item.maleAvatarSprite || item.weapon?.maleAvatarSprite,
      femaleAvatarSprite: item.femaleAvatarSprite || item.weapon?.femaleAvatarSprite,
      dwarfMaleAvatarSprite: item.dwarfMaleAvatarSprite || item.weapon?.dwarfMaleAvatarSprite,
      dwarfFemaleAvatarSprite: item.dwarfFemaleAvatarSprite || item.weapon?.dwarfFemaleAvatarSprite,
      maleLeftWristAvatarSprite: item.maleLeftWristAvatarSprite || item.weapon?.maleLeftWristAvatarSprite,
      femaleLeftWristAvatarSprite: item.femaleLeftWristAvatarSprite || item.weapon?.femaleLeftWristAvatarSprite,
      dwarfMaleLeftWristAvatarSprite: item.dwarfMaleLeftWristAvatarSprite || item.weapon?.dwarfMaleLeftWristAvatarSprite,
      dwarfFemaleLeftWristAvatarSprite: item.dwarfFemaleLeftWristAvatarSprite || item.weapon?.dwarfFemaleLeftWristAvatarSprite,
      maleRightWristAvatarSprite: item.maleRightWristAvatarSprite || item.weapon?.maleRightWristAvatarSprite,
      femaleRightWristAvatarSprite: item.femaleRightWristAvatarSprite || item.weapon?.femaleRightWristAvatarSprite,
      dwarfMaleRightWristAvatarSprite: item.dwarfMaleRightWristAvatarSprite || item.weapon?.dwarfMaleRightWristAvatarSprite,
      dwarfFemaleRightWristAvatarSprite: item.dwarfFemaleRightWristAvatarSprite || item.weapon?.dwarfFemaleRightWristAvatarSprite,
      avatarSprite: item.avatarSprite || item.weapon?.avatarSprite,
      avatarSpriteTint: item.avatarSpriteTint || item.weapon?.avatarSpriteTint,
      avatarSpriteChannels: item.avatarSpriteChannels || item.weapon?.avatarSpriteChannels,
      projectileSprite: item.projectileSprite || item.weapon?.projectileSprite,
      projectileSize: item.projectileSize ?? item.weapon?.projectileSize,
      projectileTint: item.projectileTint || item.weapon?.projectileTint,
      projectileGlow: item.projectileGlow ?? item.weapon?.projectileGlow,
      projectileGlowColor: item.projectileGlowColor || item.weapon?.projectileGlowColor,
      soundEffect: item.soundEffect || item.weapon?.soundEffect
    };
    if (item.category) weapon.category = item.category;
    if (Array.isArray(item.weaponTypes) && item.weaponTypes.length) weapon.weaponTypes = item.weaponTypes;
    if (item.projectileAnimation) weapon.projectileAnimation = item.projectileAnimation;
    if (item.projectileSpeed !== undefined) weapon.projectileSpeed = Number(item.projectileSpeed);
    if (item.ammo) weapon.ammo = item.ammo;
    if (item.goldValue !== undefined) weapon.goldValue = Number(item.goldValue);
    if (item.stats && Object.keys(item.stats).length) weapon.statBuffs = item.stats;
    if (item.resistances && Object.keys(item.resistances).length) weapon.resistances = item.resistances;
    if (item.effects && Object.keys(item.effects).length) weapon.effects = item.effects;
    return [item.name, weapon];
  }));
}

function itemListToTemplates(items) {
  const templates = {};
  for (const weapon of items.weapons || []) {
    templates[weapon.name] = {
      name: weapon.name,
      rarity: weapon.rarity || "common",
      slot: weapon.slot || "Main Hand",
      stats: weapon.stats || {},
      goldValue: weapon.goldValue,
      lore: weapon.lore,
      soundEffect: weapon.soundEffect,
      graphic: weapon.graphic,
      graphicSize: weapon.graphicSize,
      graphicTint: weapon.graphicTint,
      graphicChannels: weapon.graphicChannels,
      resistances: weapon.resistances || {},
      glow: weapon.glow,
      glowColor: weapon.glowColor,
      maleAvatarSprite: weapon.maleAvatarSprite,
      femaleAvatarSprite: weapon.femaleAvatarSprite,
      dwarfMaleAvatarSprite: weapon.dwarfMaleAvatarSprite,
      dwarfFemaleAvatarSprite: weapon.dwarfFemaleAvatarSprite,
      maleLeftWristAvatarSprite: weapon.maleLeftWristAvatarSprite,
      femaleLeftWristAvatarSprite: weapon.femaleLeftWristAvatarSprite,
      dwarfMaleLeftWristAvatarSprite: weapon.dwarfMaleLeftWristAvatarSprite,
      dwarfFemaleLeftWristAvatarSprite: weapon.dwarfFemaleLeftWristAvatarSprite,
      maleRightWristAvatarSprite: weapon.maleRightWristAvatarSprite,
      femaleRightWristAvatarSprite: weapon.femaleRightWristAvatarSprite,
      dwarfMaleRightWristAvatarSprite: weapon.dwarfMaleRightWristAvatarSprite,
      dwarfFemaleRightWristAvatarSprite: weapon.dwarfFemaleRightWristAvatarSprite,
      avatarSprite: weapon.avatarSprite,
      avatarSpriteTint: weapon.avatarSpriteTint,
      avatarSpriteChannels: weapon.avatarSpriteChannels,
      projectileSprite: weapon.projectileSprite,
      projectileSize: weapon.projectileSize,
      projectileTint: weapon.projectileTint,
      projectileGlow: weapon.projectileGlow,
      projectileGlowColor: weapon.projectileGlowColor,
      weapon: {
        name: weapon.name,
        realm: weapon.realm || "Mortal",
        hands: weapon.hands || "One-Handed",
        dmgType: weapon.dmgType || "Physical",
        dice: weapon.dice || "1D4",
        speed: Number(weapon.speed || 100),
        range: Number(weapon.range || 1),
        animation: weapon.animation || "slash",
        soundEffect: weapon.soundEffect || undefined,
        projectileAnimation: weapon.projectileAnimation,
        projectileSpeed: weapon.projectileSpeed === undefined ? undefined : Number(weapon.projectileSpeed),
        ammo: weapon.ammo || undefined,
        category: weapon.category || undefined,
        weaponTypes: Array.isArray(weapon.weaponTypes) && weapon.weaponTypes.length ? weapon.weaponTypes : undefined,
        effects: weapon.effects && Object.keys(weapon.effects).length ? weapon.effects : undefined,
        goldValue: weapon.goldValue === undefined ? undefined : Number(weapon.goldValue),
        lore: weapon.lore || undefined,
        graphic: weapon.graphic || "question mark",
        graphicSize: Number(weapon.graphicSize ?? 30),
        graphicTint: weapon.graphicTint || undefined,
        graphicChannels: weapon.graphicChannels || undefined,
        resistances: weapon.resistances && Object.keys(weapon.resistances).length ? weapon.resistances : undefined,
        glow: weapon.glow || undefined,
        glowColor: weapon.glowColor || undefined,
        maleAvatarSprite: weapon.maleAvatarSprite || undefined,
        femaleAvatarSprite: weapon.femaleAvatarSprite || undefined,
        dwarfMaleAvatarSprite: weapon.dwarfMaleAvatarSprite || undefined,
        dwarfFemaleAvatarSprite: weapon.dwarfFemaleAvatarSprite || undefined,
        maleLeftWristAvatarSprite: weapon.maleLeftWristAvatarSprite || undefined,
        femaleLeftWristAvatarSprite: weapon.femaleLeftWristAvatarSprite || undefined,
        dwarfMaleLeftWristAvatarSprite: weapon.dwarfMaleLeftWristAvatarSprite || undefined,
        dwarfFemaleLeftWristAvatarSprite: weapon.dwarfFemaleLeftWristAvatarSprite || undefined,
        maleRightWristAvatarSprite: weapon.maleRightWristAvatarSprite || undefined,
        femaleRightWristAvatarSprite: weapon.femaleRightWristAvatarSprite || undefined,
        dwarfMaleRightWristAvatarSprite: weapon.dwarfMaleRightWristAvatarSprite || undefined,
        dwarfFemaleRightWristAvatarSprite: weapon.dwarfFemaleRightWristAvatarSprite || undefined,
        avatarSprite: weapon.avatarSprite || undefined,
        avatarSpriteTint: weapon.avatarSpriteTint || undefined,
        avatarSpriteChannels: weapon.avatarSpriteChannels || undefined,
        projectileSprite: weapon.projectileSprite || undefined,
        projectileSize: weapon.projectileSize === undefined ? undefined : Number(weapon.projectileSize),
        projectileTint: weapon.projectileTint || undefined,
        projectileGlow: weapon.projectileGlow || undefined,
        projectileGlowColor: weapon.projectileGlowColor || undefined,
        statBuffs: weapon.stats || undefined
      }
    };
  }
  for (const group of ["equipment", "bags", "consumables", "scrolls", "misc"]) {
    for (const item of items[group] || []) templates[item.name] = item;
  }
  return templates;
}

function preserveExistingStartingScrollTemplates(rebuiltTemplates, existingTemplates, startingScrolls = []) {
  const templates = { ...rebuiltTemplates };
  for (const scrollName of startingScrolls || []) {
    if (!templates[scrollName] && existingTemplates?.[scrollName]) {
      templates[scrollName] = existingTemplates[scrollName];
    }
  }
  return templates;
}

async function saveData(payload) {
  payload = normalizeRealmData(payload);
  const errors = validatePayload(payload);
  if (errors.length) return { ok: false, errors };
  const itemRenames = cleanItemRenames(payload.itemRenames);
  if (Object.keys(itemRenames).length) {
    payload.unitGroups = renameItemReferences(payload.unitGroups, itemRenames);
    payload.lootTables = renameItemReferences(payload.lootTables, itemRenames);
  }

  let source = await fs.readFile(GAME_FILE, "utf8");
  let itemSource = await fs.readFile(ITEM_DATA_FILE, "utf8");
  let itemArtSource = await fs.readFile(ITEM_ART_DATA_FILE, "utf8");
  let monsterSource = await fs.readFile(MONSTER_DATA_FILE, "utf8");
  let worldSource = await fs.readFile(WORLD_DATA_FILE, "utf8");
  worldSource = ensureConstBlock(worldSource, "devAreaConfigs", DEFAULT_AREA_CONFIGS);
  worldSource = ensureConstBlock(worldSource, "devSpellConfigs", {}, "devAreaConfigs");
  worldSource = ensureConstBlock(worldSource, "devQuestConfigs", {}, "devSpellConfigs");
  worldSource = ensureConstBlock(worldSource, "devNpcConfigs", [], "devQuestConfigs");
  worldSource = ensureConstBlock(worldSource, "devDungeonConfigs", [], "devNpcConfigs");
  worldSource = ensureConstBlock(worldSource, "devCraftingRecipes", Object.fromEntries(CRAFTING_SKILLS.map(skill => [skill, []])), "devDungeonConfigs");
  worldSource = ensureConstBlock(worldSource, "devFactionConfigs", [], "devCraftingRecipes");
  worldSource = ensureWorldDataExport(worldSource, "devFactionConfigs");
  source = renameItemReferencesInSource(source, itemRenames, constContext(source));
  itemSource = renameItemReferencesInSource(itemSource, itemRenames, constContext(source));
  itemArtSource = renameItemReferencesInSource(itemArtSource, itemRenames, constContext(source));
  monsterSource = renameItemReferencesInSource(monsterSource, itemRenames, constContext(source));
  worldSource = renameItemReferencesInSource(worldSource, itemRenames, constContext(source));
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupPath = path.join(ROOT, `game.js.dev-backup-${timestamp}`);
  const itemBackupPath = path.join(ROOT, `data/items.js.dev-backup-${timestamp}`);
  const itemArtBackupPath = path.join(ROOT, `data/item-art.js.dev-backup-${timestamp}`);
  const monsterBackupPath = path.join(ROOT, `data/monsters.js.dev-backup-${timestamp}`);
  const worldBackupPath = path.join(ROOT, `data/world.js.dev-backup-${timestamp}`);
  await fs.writeFile(backupPath, source, "utf8");
  await fs.writeFile(itemBackupPath, itemSource, "utf8");
  await fs.writeFile(itemArtBackupPath, itemArtSource, "utf8");
  await fs.writeFile(monsterBackupPath, monsterSource, "utf8");
  await fs.writeFile(worldBackupPath, worldSource, "utf8");

  const itemContext = constContext(itemSource);
  const existingItemTemplates = parseJsValue(findConstBlock(itemSource, "itemTemplates").valueText, "itemTemplates", itemContext);
  const existingStartingScrolls = parseJsValue(findConstBlock(itemSource, "shopkeeperStartingScrolls").valueText, "shopkeeperStartingScrolls", itemContext);
  const rebuiltItemTemplates = preserveExistingStartingScrollTemplates(
    itemListToTemplates(payload.items),
    existingItemTemplates,
    existingStartingScrolls
  );
  const worldReplacements = {
    areaSpawnTables: areasToSpawnTables(payload.areas),
    devAreaConfigs: areasToConfig(payload.areas),
    devSpellConfigs: spellsToConfig(payload.spells),
    devQuestConfigs: questsToConfig(payload.quests),
    devNpcConfigs: npcsToConfig(payload.npcs),
    devDungeonConfigs: dungeonsToConfig(payload.dungeons),
    devCraftingRecipes: payload.craftingRecipes || {},
    devFactionConfigs: normalizeFactionConfigs(payload.factions || [])
  };
  const itemReplacements = {
    weaponTemplates: weaponsToTemplates(payload.items.weapons),
    itemTemplates: rebuiltItemTemplates
  };
  const gameReplacements = {
    enchantmentTemplates: enchantmentsToTemplates(payload.enchantments)
  };
  const monsterReplacements = {
    ...payload.unitGroups,
    monsterLootTables: payload.lootTables
  };

  for (const [name, value] of Object.entries(gameReplacements)) {
    const block = findConstBlock(source, name);
    if (!block) throw new Error(`Could not save ${name}; block was not found.`);
    source = `${source.slice(0, block.start)}${toJsConst(name, value)}${source.slice(block.end)}`;
  }
  for (const [name, value] of Object.entries(itemReplacements)) {
    const block = findConstBlock(itemSource, name);
    if (!block) throw new Error(`Could not save ${name}; block was not found.`);
    itemSource = `${itemSource.slice(0, block.start)}${toJsConst(name, value)}${itemSource.slice(block.end)}`;
  }
  for (const [name, value] of Object.entries(worldReplacements)) {
    const block = findConstBlock(worldSource, name);
    if (!block) throw new Error(`Could not save ${name}; block was not found.`);
    worldSource = `${worldSource.slice(0, block.start)}${toJsConst(name, value)}${worldSource.slice(block.end)}`;
  }
  for (const [name, value] of Object.entries(monsterReplacements)) {
    const block = findConstBlock(monsterSource, name);
    if (!block) throw new Error(`Could not save ${name}; block was not found.`);
    monsterSource = `${monsterSource.slice(0, block.start)}${toJsConst(name, value)}${monsterSource.slice(block.end)}`;
  }

  await fs.writeFile(GAME_FILE, source, "utf8");
  await fs.writeFile(ITEM_DATA_FILE, itemSource, "utf8");
  await fs.writeFile(ITEM_ART_DATA_FILE, itemArtSource, "utf8");
  await fs.writeFile(MONSTER_DATA_FILE, monsterSource, "utf8");
  await fs.writeFile(WORLD_DATA_FILE, worldSource, "utf8");
  await bumpGameAssetVersions();
  return { ok: true, backupPath, itemBackupPath, itemArtBackupPath, monsterBackupPath, worldBackupPath, savedAt: new Date().toISOString() };
}

async function bumpGameAssetVersions() {
  const stamp = `editor-save-${Date.now()}`;
  let html = await fs.readFile(INDEX_FILE, "utf8");
  html = html.replace(/\.\/data\/world\.js(?:\?v=[^"]*)?/g, `./data/world.js?v=${stamp}`);
  html = html.replace(/\.\/map-generation\.js(?:\?v=[^"]*)?/g, `./map-generation.js?v=${stamp}`);
  html = html.replace(/\.\/game\.js(?:\?v=[^"]*)?/g, `./game.js?v=${stamp}`);
  await fs.writeFile(INDEX_FILE, html, "utf8");
}

async function serveStatic(req, res) {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const requestedPath = requestUrl.pathname === "/" ? "/dev-interface.html" : requestUrl.pathname;
  const staticRoot = requestedPath.startsWith("/assets/") ? ROOT : __dirname;
  const filePath = path.resolve(staticRoot, `.${requestedPath}`);
  if (!filePath.startsWith(staticRoot)) return send(res, 403, "Forbidden", "text/plain; charset=utf-8");
  try {
    const contents = await fs.readFile(filePath);
    send(res, 200, contents, MIME_TYPES[path.extname(filePath)] || "application/octet-stream");
  } catch {
    send(res, 404, "Not found", "text/plain; charset=utf-8");
  }
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET" && req.url.startsWith("/api/data")) return send(res, 200, await loadData());
    if (req.method === "POST" && req.url.startsWith("/api/assets/upload")) {
      const body = await readRequestBody(req);
      return send(res, 200, await uploadAsset(JSON.parse(body || "{}")));
    }
    if (req.method === "POST" && req.url.startsWith("/api/save")) {
      const body = await readRequestBody(req);
      return send(res, 200, await saveData(JSON.parse(body || "{}")));
    }
    if (req.method === "GET") return serveStatic(req, res);
    return send(res, 405, { error: "Method not allowed." });
  } catch (error) {
    return send(res, 500, { error: error.message });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Soulreaper Dev Interface running at http://${HOST}:${PORT}`);
  console.log(`Editing ${GAME_FILE}`);
});
