const STAT_KEYS = ["HP", "ATK", "DEF", "SPD", "AGL", "INT", "FOCUS", "BLOCK", "RESIST", "REGEN"];
const REALMS = ["Mortal", "Ethereal", "Celestial", "Infernal", "Sylvan", "Umbral"];
const CRAFTING_SKILLS = ["Smithing", "Leatherworking", "Tailoring", "Alchemy", "Jewelry"];
const ALIGNMENTS = ["Neutral", "Good", "Evil"];
const NPC_ALIGNMENTS = ["Neutral", "Neutral Good", "Good", "Neutral Evil", "Evil"];
const AREA_SPAWN_RATES = ["None", "Low", "Normal", "High", "Insane"];
const AREA_SPAWN_AMOUNTS = ["Very Low", "Low", "Moderate", "Normal", "Busy", "Crowded", "Intense"];
const DEFAULT_NPC_REFUSAL_TEXT = "I have no use for you. Be gone.";
const RARITIES = ["poor", "common", "uncommon", "rare", "epic"];
const SPELL_NUMERIC_KEYS = ["lvl", "cooldown", "range", "aoeRadius", "duration", "tick"];
const SPELL_BOOLEAN_KEYS = ["manualTarget", "autocast", "passive", "aura"];
const SPELL_FORMULA_STATS = new Set([...STAT_KEYS, "HP", "MP"]);
const BLOCKED_SPELL_JSON_KEYS = new Set(["cast", "castAt", "update", "onHit", "effect", "__proto__", "prototype", "constructor"]);
const QUEST_VISIBLE_KEYS = new Set(["id", "name", "description", "objectives", "minimumLevel", "minLevel", "requiredLevel", "minimumRealm", "requiredRealm", "realmRequirement", "minimumRealmLevel", "requiredRealmLevel", "rewardXp", "rewardGold", "rewardVirtue", "rewardItem", "rewardItems", "rewardRealmXp", "realmXpRewards", "rewardText"]);
const QUEST_OBJECTIVE_TYPES = ["item", "anyItems", "kill", "phase", "flag", "custom"];
const WEAPON_TYPES = ["Bow", "Slashing", "Stabbing", "Blunt", "Axe", "Spear"];
const ENCHANTMENT_SLOTS = ["Main Hand", "Off-Hand", "Head", "Chest", "Legs", "Shoulders", "Hands", "Feet", "Neck", "Finger", "Wrist", "Ear", "Waist", "Cape"];
const ARMOR_TYPES = ["Cloth", "Leather", "Chainmail", "Plate Mail", "Shield"];
const AVATAR_BASES = {
  soulreaperMale: "Male",
  soulreaperFemale: "Female",
  shadowSoulreaperMale: "Shadow Male",
  shadowSoulreaperFemale: "Shadow Female",
  sylvanSoulreaperMale: "Sylvan Male",
  sylvanSoulreaperFemale: "Sylvan Female",
  infernalSoulreaperMale: "Infernal Male",
  infernalSoulreaperFemale: "Infernal Female",
  etherealSoulreaperMale: "Ethereal Male",
  etherealSoulreaperFemale: "Ethereal Female",
  celestialSoulreaperMale: "Celestial Male",
  celestialSoulreaperFemale: "Celestial Female"
};

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
const AVATAR_BASE_SPRITES = {
  soulreaperMale: "./assets/sprites/player-bases/soulreaper-male-naked.png",
  soulreaperFemale: "./assets/sprites/player-bases/soulreaper-female-naked.png",
  dwarfMale: "./assets/sprites/player-bases/soulreaper-dwarf-male-naked.png",
  dwarfFemale: "./assets/sprites/player-bases/soulreaper-dwarf-female-naked.png",
  shadowSoulreaperMale: "./assets/sprites/player-bases/shadow-soulreaper-male-naked.png",
  shadowSoulreaperFemale: "./assets/sprites/player-bases/shadow-soulreaper-female-naked.png",
  sylvanSoulreaperMale: "./assets/sprites/player-bases/sylvan-soulreaper-male-naked.png",
  sylvanSoulreaperFemale: "./assets/sprites/player-bases/sylvan-soulreaper-female-naked.png",
  infernalSoulreaperMale: "./assets/sprites/player-bases/infernal-soulreaper-male-naked.png",
  infernalSoulreaperFemale: "./assets/sprites/player-bases/infernal-soulreaper-female-naked.png",
  etherealSoulreaperMale: "./assets/sprites/player-bases/ethereal-soulreaper-male-naked.png",
  etherealSoulreaperFemale: "./assets/sprites/player-bases/ethereal-soulreaper-female-naked.png",
  celestialSoulreaperMale: "./assets/sprites/player-bases/celestial-soulreaper-male-naked.png",
  celestialSoulreaperFemale: "./assets/sprites/player-bases/celestial-soulreaper-female-naked.png"
};
const ITEM_GROUPS = {
  weapons: "Weapons",
  equipment: "Equipment",
  bags: "Bags",
  consumables: "Consumables",
  scrolls: "Scrolls",
  misc: "Materials"
};
const ITEM_GROUP_KEYS = Object.keys(ITEM_GROUPS);
const NPC_DIALOGUE_CONTEXTS = [
  { key: "dialogue", label: "Default Interaction" },
  { key: "questMinimumLevelText", label: "Quest Unavailable: Under Minimum LVL / Realm" },
  { key: "refusalText", label: "Refusal Dialogue" },
  { key: "factionNotAllyText", label: "Faction: Not Ally" },
  { key: "factionEnemyText", label: "Faction: Enemy" },
  { key: "questOffer", label: "Quest: Offer" },
  { key: "questActive", label: "Quest: In Progress" },
  { key: "questReady", label: "Quest: Ready To Complete" },
  { key: "questComplete", label: "Quest: Completion / Turn-In" },
  { key: "questAfterComplete", label: "Quest: After Complete" },
  { key: "questFollowupOffer", label: "Quest: Follow-Up Offer" },
  { key: "questFollowupActive", label: "Quest: Follow-Up In Progress" },
  { key: "questFollowupComplete", label: "Quest: Follow-Up Completion / Turn-In" },
  { key: "questFollowupAfterComplete", label: "Quest: Follow-Up After Complete" },
  { key: "trainerQuestOffer", label: "Trainer Quest: Offer" },
  { key: "trainerQuestActive", label: "Trainer Quest: In Progress" },
  { key: "trainerQuestReady", label: "Trainer Quest: Ready To Complete" },
  { key: "trainerQuestAfterComplete", label: "Trainer Quest: After Complete" },
  { key: "shopGreeting", label: "Shopkeeper: Greeting" },
  { key: "bankGreeting", label: "Banker: Greeting" },
  { key: "repeatGreeting", label: "Repeat Greeting" }
];
const NPC_DIALOGUE_CONTEXT_LABELS = Object.fromEntries(NPC_DIALOGUE_CONTEXTS.map(context => [context.key, context.label]));
const NPC_DIALOGUE_BUILTIN_KEYS = new Set(NPC_DIALOGUE_CONTEXTS.map(context => context.key));
const NPC_DIALOGUE_EXACT_FIELD_KEYS = new Set(["dialogue", "questMinimumLevelText", "refusalText", "factionNotAllyText", "factionEnemyText"]);
const NPC_DIALOGUE_LEGACY_KEYS = NPC_DIALOGUE_BUILTIN_KEYS;
const NPC_VISIBLE_KEYS = new Set(["id", "name", "area", "alignment", "faction", "mustBeFactionAlly", "requiresFactionAlly", "requireFactionAlly", "radius", "label", "sprite", "trainer", "trainerRealms", "trainerMaxSpellLevel", "shopkeeper", "banker", "startsQuest", "questId", "questChain", "dialogue", "questMinimumLevelText", "minimumLevelDialogue", "questLevelRefusalText", "refusalText", "factionNotAllyText", "factionEnemyText", "dialogueContexts", "wandering", "shop"]);
const ASSET_GROUPS = {
  all: "All",
  unitSprites: "Units",
  featureSprites: "Features",
  groundTextures: "Ground",
  spellIcons: "Spells",
  audio: "Audio"
};
const ASSET_UPLOAD_FOLDERS = {
  "assets/sprites/mobs": "Unit Sprites",
  "assets/sprites/props": "Feature Sprites",
  "assets/ground": "Ground Textures",
  "assets/spells": "Spell Icons",
  "assets/audio": "Audio",
  "assets": "Other Assets"
};
const REALM_COLORS = {
  Mortal: "#b99a66",
  Ethereal: "#6d95c8",
  Celestial: "#d9bf55",
  Infernal: "#c25f4b",
  Sylvan: "#6fa768",
  Umbral: "#7b5aa6"
};
const UNIT_SIZE_SCALE = 1.5;
const DUNGEON_CELL_SIZE = 128;
const DEFAULT_DUNGEON_TEXTURE = "";
const DUNGEON_BRUSHES = [
  { id: "square", label: "Square" },
  { id: "diag-nw", label: "Diagonal NW" },
  { id: "diag-ne", label: "Diagonal NE" },
  { id: "diag-se", label: "Diagonal SE" },
  { id: "diag-sw", label: "Diagonal SW" },
  { id: "curve-nw", label: "Curved NW" },
  { id: "curve-ne", label: "Curved NE" },
  { id: "curve-se", label: "Curved SE" },
  { id: "curve-sw", label: "Curved SW" }
];
const DUNGEON_BRUSH_IDS = new Set(DUNGEON_BRUSHES.map(brush => brush.id));
const DEFAULT_DUNGEON_WALL_TEXTURE = "./assets/ground/whisperspring-wall.png";
const itemPreviewImages = new Map();
const tintedItemPreviewCache = new Map();
const avatarPreviewImages = new Map();

const state = {
  tab: "units",
  unitGroups: {},
  unitRefs: [],
  unitFilters: { realm: "All", type: "All", alignment: "All", faction: "All", elite: "All" },
  npcFilters: { area: "All", alignment: "All" },
  itemFilters: { rarity: "All", slot: "All" },
  unitIndex: 0,
  areaIndex: 0,
  dungeonIndex: 0,
  dungeonSelectedUnitIndex: -1,
  dungeonSelectedTexture: "",
  dungeonSelectedUnit: "",
  dungeonSelectedNpc: "",
  dungeonSelectedBrush: "square",
  spellIndex: 0,
  lootTableIndex: 0,
  enchantmentIndex: 0,
  craftingSkill: "Tailoring",
  craftingIndex: 0,
  factionIndex: 0,
  questIndex: 0,
  npcIndex: 0,
  npcDialogueContext: "dialogue",
  itemGroup: "weapons",
  itemIndex: 0,
  assetGroup: "all",
  assetIndex: 0,
  npcShopBulkGroup: "",
  lootBulkTableIndex: -1,
  lootBulkContainerSelector: "#unitLootList",
  areas: [],
  dungeons: [],
  spells: [],
  enchantments: [],
  craftingRecipes: Object.fromEntries(CRAFTING_SKILLS.map(skill => [skill, []])),
  factions: [],
  quests: [],
  npcs: [],
  items: Object.fromEntries(ITEM_GROUP_KEYS.map(key => [key, []])),
  itemOriginalNames: Object.fromEntries(ITEM_GROUP_KEYS.map(key => [key, []])),
  itemRenames: {},
  lootTables: {},
  editorLootTables: [],
  inheritedLootTables: {},
  assets: { all: [], unitSprites: [], featureSprites: [], groundTextures: [], spellIcons: [], audio: [] },
  dirty: false,
  picker: null
};

const $ = selector => document.querySelector(selector);
const recordList = $("#recordList");
const statusText = $("#statusText");
const validationPanel = $("#validationPanel");
const searchInput = $("#searchInput");
const unitForm = $("#unitForm");
const lootTableForm = $("#lootTableForm");
const areaForm = $("#areaForm");
const dungeonForm = $("#dungeonForm");
const spellForm = $("#spellForm");
const enchantmentForm = $("#enchantmentForm");
const craftingForm = $("#craftingForm");
const factionForm = $("#factionForm");
const itemForm = $("#itemForm");
const questForm = $("#questForm");
const npcForm = $("#npcForm");

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;"
  }[char]));
}

function setStatus(text, tone = "") {
  statusText.textContent = text;
  statusText.style.color = tone === "error" ? "#ffd0c8" : tone === "ok" ? "#bfe4b8" : "";
}

function optionHtml(options, selected) {
  const values = [...options];
  if (selected && !values.includes(selected)) values.unshift(selected);
  return values.map(option => `<option value="${escapeHtml(option)}" ${option === selected ? "selected" : ""}>${escapeHtml(option)}</option>`).join("");
}

function areaSpawnRateOptionHtml(selected = "") {
  return [
    `<option value="" ${selected ? "" : "selected"}>Map Default</option>`,
    ...AREA_SPAWN_RATES.map(rate => `<option value="${escapeHtml(rate)}" ${rate === selected ? "selected" : ""}>${escapeHtml(rate)}</option>`)
  ].join("");
}

function areaSpawnAmountOptionHtml(selected = "") {
  const value = AREA_SPAWN_AMOUNTS.includes(selected) ? selected : "Normal";
  return AREA_SPAWN_AMOUNTS.map(amount => `<option value="${escapeHtml(amount)}" ${amount === value ? "selected" : ""}>${escapeHtml(amount)}</option>`).join("");
}

function numberValue(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function activeUnits() {
  return state.unitRefs.map(ref => ref.unit);
}

function selectedUnit() {
  return state.unitRefs[state.unitIndex]?.unit || null;
}

function selectedArea() {
  return state.areas[state.areaIndex] || null;
}

function selectedDungeon() {
  return state.dungeons[state.dungeonIndex] || null;
}

function currentCraftingRecipes() {
  state.craftingRecipes[state.craftingSkill] ||= [];
  return state.craftingRecipes[state.craftingSkill];
}

function selectedCraftingRecipe() {
  return currentCraftingRecipes()[state.craftingIndex] || null;
}

function defaultCraftingRecipe() {
  const names = currentCraftingRecipes().map(recipe => recipe.name);
  return {
    name: uniqueName("New Recipe", names),
    station: state.craftingSkill === "Tailoring" ? "Dress Form Mannequin" : "Crafting Table",
    output: allItemNames()[0] || "",
    quantity: 1,
    ingredients: [{ item: allItemNames()[0] || "", quantity: 1 }],
    level: 1,
    xp: 0,
    soundEffect: ""
  };
}

function selectedSpell() {
  return state.spells[state.spellIndex] || null;
}

function selectedQuest() {
  return state.quests[state.questIndex] || null;
}

function selectedNpc() {
  return state.npcs[state.npcIndex] || null;
}

function allUnitNames() {
  return [...new Set(Object.values(state.unitGroups).flatMap(group => group.entries.map(unit => unit.name)).filter(Boolean))].sort();
}

function allGroundTexturePaths() {
  const fromGroundGroup = (state.assets.groundTextures || []).map(asset => asset.path);
  const fromAllAssets = (state.assets.all || [])
    .map(asset => asset.path)
    .filter(path => /(?:^|\/)assets\/ground\//.test(path || ""));
  return [...new Set([...fromGroundGroup, ...fromAllAssets].filter(Boolean))].sort();
}

function unitByName(name) {
  return activeUnits().find(unit => unit.name === name) || null;
}

function rebuildUnitRefs() {
  state.unitRefs = Object.entries(state.unitGroups).flatMap(([groupName, group]) =>
    (group.entries || []).map((unit, index) => ({ groupName, index, unit, virtual: Boolean(group.virtual) }))
  );
  state.unitIndex = Math.max(0, Math.min(state.unitIndex, state.unitRefs.length - 1));
}

function selectedUnitRef() {
  return state.unitRefs[state.unitIndex] || null;
}

function allItemNames() {
  return ITEM_GROUP_KEYS.flatMap(group => state.items[group] || []).map(item => item.name).filter(Boolean).sort();
}

function normalizeItemGroups(items = {}) {
  const grouped = { ...Object.fromEntries(ITEM_GROUP_KEYS.map(key => [key, []])), ...items };
  const bags = [];
  for (const group of ITEM_GROUP_KEYS) {
    grouped[group] = (grouped[group] || []).filter(item => {
      const isBag = Boolean(item?.bag || item?.slot === "Bag");
      if (isBag) bags.push(item);
      return !isBag;
    });
  }
  grouped.bags = bags;
  return grouped;
}

function itemGraphicFor(name) {
  const item = itemByName(name);
  return item?.graphic || item?.weapon?.graphic || "";
}

function itemPreviewHtml(name) {
  const graphic = itemGraphicFor(name);
  return graphic ? `<img src="../${escapeHtml(graphic.replace(/^\.\//, ""))}" alt="">` : "";
}

function itemSelectOptions(selected = "") {
  return optionHtml(allItemNames(), selected);
}

function weaponNames() {
  return (state.items.weapons || []).map(item => item.name).filter(Boolean).sort();
}

function inferredWeaponTypes(item = {}) {
  const weapon = item.weapon || item;
  const values = [item.name, item.category, weapon.category, item.animation, weapon.animation]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  const types = [];
  if (values.includes("bow") || String(item.ammo || weapon.ammo || "").toLowerCase() === "arrow") types.push("Bow");
  if (values.includes("slash")) types.push("Slashing");
  if (values.includes("stab") || values.includes("dagger")) types.push("Stabbing");
  if (values.includes("blunt") || values.includes("mace") || values.includes("whack")) types.push("Blunt");
  if (values.includes("axe")) types.push("Axe");
  if (values.includes("spear")) types.push("Spear");
  return types;
}

function slugify(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function inferItemAvatarSprite(item = {}) {
  if (/neck/i.test(String(item.slot || "")) || /bracelet|necklace/i.test(String(item.name || item.weapon?.name || ""))) return "";
  const slug = slugify(item.name || item.graphic || item.weapon?.graphic);
  return slug ? `./assets/sprites/player-equipment/${slug}.png` : "";
}

function inferGenderedItemAvatarSprite(item = {}, gender = "male") {
  if (/neck/i.test(String(item.slot || "")) || /bracelet|necklace/i.test(String(item.name || item.weapon?.name || ""))) return "";
  const slug = slugify(item.name || item.graphic || item.weapon?.graphic);
  return slug ? `./assets/sprites/player-equipment/${gender}/${slug}.png` : "";
}

function itemByName(name) {
  return ITEM_GROUP_KEYS.flatMap(group => state.items[group] || []).find(item => item.name === name) || null;
}

function itemIsStackable(name) {
  return Boolean(itemByName(name)?.stackable);
}

function currentAssets() {
  const assets = state.assetGroup === "all" ? state.assets.all || [] : state.assets[state.assetGroup] || [];
  return [...assets].sort((a, b) => a.path.localeCompare(b.path));
}

function selectedAsset() {
  return currentAssets()[state.assetIndex] || null;
}

function spellNames() {
  return state.spells.map(spell => spell.name).filter(Boolean).sort();
}

function spellTemplateByName(name) {
  return state.spells.find(spell => spell.name === name) || {};
}

function questOptions(selected = "") {
  return optionHtml(["", ...state.quests.map(quest => quest.id).filter(Boolean)], selected);
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function validateSpellObject(spell, where = "Spell") {
  const errors = [];
  if (!isPlainObject(spell)) return [`${where} JSON must be an object.`];
  normalizeRealmData(spell);
  if (!String(spell.name || "").trim()) errors.push(`${where}.name is required.`);
  if (!REALMS.includes(spell.realm)) errors.push(`${where}.realm must be one of ${REALMS.join(", ")}.`);
  for (const key of SPELL_NUMERIC_KEYS) {
    if (spell[key] !== undefined && !Number.isFinite(Number(spell[key]))) errors.push(`${where}.${key} must be a number.`);
  }
  for (const key of SPELL_BOOLEAN_KEYS) {
    if (spell[key] !== undefined && typeof spell[key] !== "boolean") errors.push(`${where}.${key} must be true or false.`);
  }
  for (const key of Object.keys(spell)) {
    if (BLOCKED_SPELL_JSON_KEYS.has(key)) errors.push(`${where}.${key} cannot be edited here.`);
  }
  errors.push(...validateSpellFormulas(spell.formulas, `${where}.formulas`));
  errors.push(...validateSpellTextPlaceholders(spell, where));
  return errors;
}

function validateSpellFormulas(formulas, where) {
  const errors = [];
  if (formulas === undefined) return errors;
  if (!isPlainObject(formulas)) return [`${where} must be an object.`];
  for (const [name, formula] of Object.entries(formulas)) {
    const formulaWhere = `${where}.${name}`;
    if (BLOCKED_SPELL_JSON_KEYS.has(name)) {
      errors.push(`${formulaWhere} is not allowed.`);
      continue;
    }
    if (!isPlainObject(formula)) {
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

function uniqueName(base, names) {
  const used = new Set(names);
  if (!used.has(base)) return base;
  let index = 2;
  while (used.has(`${base} ${index}`)) index += 1;
  return `${base} ${index}`;
}

function uniqueId(base, ids) {
  const cleanBase = String(base || "new-quest").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "new-quest";
  const used = new Set(ids);
  if (!used.has(cleanBase)) return cleanBase;
  let index = 2;
  while (used.has(`${cleanBase}-${index}`)) index += 1;
  return `${cleanBase}-${index}`;
}

function factionId(value) {
  return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function inferredFactionForUnit(unit) {
  const name = String(unit?.name || "").toLowerCase();
  if (name === "guard" || name.includes("gandersguard")) return "gandersguard";
  if (name.includes("fenguard") || name.includes("fenhold guard") || name.includes("evil guard")) return "fenguard";
  if (name.includes("goblin")) return "goblin";
  if (name.includes("froglin")) return "froglin";
  if (/\brat\b/.test(name) || name.includes("ratkin") || name.includes("ratz") || name.includes("ratzkhan") || name.includes("skaven")) return "ratkin";
  return "";
}

function normalizeFaction(faction = {}) {
  const id = factionId(faction.id || faction.name || "new-faction");
  return {
    id,
    name: String(faction.name || id || "New Faction").trim() || "New Faction",
    enemyFactionIds: [...new Set((faction.enemyFactionIds || []).map(factionId).filter(Boolean))].filter(enemyId => enemyId !== id)
  };
}

function normalizeFactions(factions = []) {
  const byId = new Map();
  for (const faction of Array.isArray(factions) ? factions : []) {
    const normalized = normalizeFaction(faction);
    if (normalized.id) byId.set(normalized.id, normalized);
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

const DEFAULT_FACTIONS = normalizeFactions([
  { id: "ratkin", name: "Ratkin", enemyFactionIds: [] },
  { id: "gandersguard", name: "Gandersguard", enemyFactionIds: ["fenguard", "goblin", "froglin"] },
  { id: "fenguard", name: "Fenguard", enemyFactionIds: ["gandersguard"] },
  { id: "goblin", name: "Goblin", enemyFactionIds: ["gandersguard"] },
  { id: "froglin", name: "Froglin", enemyFactionIds: ["gandersguard"] }
]);

function factionOptions(selected = "") {
  return `<option value="">None</option>` + state.factions.map(faction => `
    <option value="${escapeHtml(faction.id)}" ${faction.id === selected ? "selected" : ""}>${escapeHtml(faction.name)}</option>
  `).join("");
}

function normalizeUnit(unit = {}) {
  return {
    name: unit.name || "New Unit",
    realm: unit.realm || "Mortal",
    type: unit.type || "Beast",
    foodchain: unit.foodchain || "",
    alignment: unit.alignment || "Neutral",
    faction: factionId(unit.faction),
    aggressive: Boolean(unit.aggressive),
    flying: Boolean(unit.flying),
    incorporeal: Boolean(unit.incorporeal),
    aquatic: Boolean(unit.aquatic),
    amphibious: Boolean(unit.amphibious),
    elite: Boolean(unit.elite),
    boss: Boolean(unit.boss),
    existingElite: Boolean(unit.existingElite),
    template: unit.template || "",
    source: unit.source || "",
    radius: unit.radius ?? 13,
    gold: unit.gold ?? "0",
    sprite: unit.sprite || inferUnitSprite(unit.name),
    stats: Object.fromEntries(STAT_KEYS.map(stat => [stat, numberValue(unit.stats?.[stat])])),
    weapon: { name: unit.weapon?.name || "Bite" },
    spells: Array.isArray(unit.spells) ? structuredClone(unit.spells) : []
  };
}

function inferUnitSprite(name) {
  const slug = String(name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const exact = state.assets.unitSprites.find(asset => asset.path.endsWith(`/${slug}.png`));
  if (exact) return exact.path;
  const loose = state.assets.unitSprites.find(asset => asset.name.toLowerCase().includes(slug));
  return loose?.path || "";
}

function buildStaticInputs() {
  for (const select of [unitForm.elements.realm, spellForm.elements.realm, enchantmentForm.elements.realm, itemForm.elements.realm]) select.innerHTML = optionHtml(REALMS, "Mortal");
  unitForm.elements.alignment.innerHTML = optionHtml(ALIGNMENTS, "Neutral");
  npcForm.elements.alignment.innerHTML = optionHtml(NPC_ALIGNMENTS, "Neutral");
  npcForm.elements.faction.innerHTML = factionOptions("");
  itemForm.elements.rarity.innerHTML = optionHtml(RARITIES, "common");
  $("#unitStatsGrid").innerHTML = STAT_KEYS.map(stat => `
    <label><span>${stat}</span><input name="stat_${stat}" type="number" step="0.5"></label>
  `).join("");
  $("#itemStatsGrid").innerHTML = STAT_KEYS.map(stat => `
    <label><span>${stat}</span><input name="stat_${stat}" type="number" step="0.5"></label>
  `).join("");
  $("#itemRealmResistsGrid").innerHTML = REALMS.map(realm => `
    <label><span>${realm}</span><input name="resist_${realm}" type="number" step="0.5"></label>
  `).join("");
  $("#enchantmentStatsGrid").innerHTML = STAT_KEYS.map(stat => `
    <label><span>${stat}</span><input name="stat_${stat}" type="number" step="0.5"></label>
  `).join("");
  $("#enchantmentSlotRequirements").innerHTML = ENCHANTMENT_SLOTS.map(slot => `
    <label><input name="requiredSlot_${slot.replace(/\W+/g, "")}" type="checkbox" value="${escapeHtml(slot)}"> ${escapeHtml(slot)}</label>
  `).join("");
  $("#enchantmentWeaponTypeRequirements").innerHTML = WEAPON_TYPES.map(type => `
    <label><input name="requiredWeaponType_${type.replace(/\W+/g, "")}" type="checkbox" value="${escapeHtml(type)}"> ${escapeHtml(type)}</label>
  `).join("");
  $("#enchantmentArmorTypeRequirements").innerHTML = ARMOR_TYPES.map(type => `
    <label><input name="requiredArmorType_${type.replace(/\W+/g, "")}" type="checkbox" value="${escapeHtml(type)}"> ${escapeHtml(type)}</label>
  `).join("");
}

function filterOptions(values) {
  return ["All", ...[...new Set(values.filter(Boolean))].sort()];
}

function renderUnitFilters() {
  $("#unitRealmFilter").innerHTML = optionHtml(filterOptions(activeUnits().map(unit => unit.realm)), state.unitFilters.realm);
  $("#unitTypeFilter").innerHTML = optionHtml(filterOptions(activeUnits().map(unit => unit.type)), state.unitFilters.type);
  $("#unitAlignmentFilter").innerHTML = optionHtml(filterOptions(activeUnits().map(unit => unit.alignment)), state.unitFilters.alignment);
  $("#unitFactionFilter").innerHTML = optionHtml(["All", "None", ...state.factions.map(faction => faction.name)], state.unitFilters.faction);
  $("#unitEliteFilter").innerHTML = optionHtml(["All", "Elite", "Non-Elite"], state.unitFilters.elite);
}

function renderNpcFilters() {
  $("#npcAreaFilter").innerHTML = optionHtml(filterOptions(state.npcs.map(npc => npc.area)), state.npcFilters.area);
  $("#npcAlignmentFilter").innerHTML = optionHtml(filterOptions(state.npcs.map(npc => npc.alignment)), state.npcFilters.alignment);
}

function renderItemFilters() {
  const showRarity = ["weapons", "equipment"].includes(state.itemGroup);
  const showSlot = state.itemGroup === "equipment";
  $("#itemFiltersPanel").style.display = showRarity || showSlot ? "" : "none";
  $("#itemRarityFilter").parentElement.style.display = showRarity ? "" : "none";
  $("#itemSlotFilter").parentElement.style.display = showSlot ? "" : "none";
  $("#itemRarityFilter").innerHTML = optionHtml(filterOptions((state.items[state.itemGroup] || []).map(item => item.rarity)), state.itemFilters.rarity);
  $("#itemSlotFilter").innerHTML = optionHtml(filterOptions((state.items.equipment || []).map(item => item.slot)), state.itemFilters.slot);
}

function unitMatchesFilters(unit) {
  if (state.unitFilters.realm !== "All" && unit.realm !== state.unitFilters.realm) return false;
  if (state.unitFilters.type !== "All" && unit.type !== state.unitFilters.type) return false;
  if (state.unitFilters.alignment !== "All" && unit.alignment !== state.unitFilters.alignment) return false;
  if (state.unitFilters.faction !== "All") {
    const faction = state.factions.find(entry => entry.id === unit.faction);
    if (state.unitFilters.faction === "None") {
      if (unit.faction) return false;
    } else if ((faction?.name || "") !== state.unitFilters.faction) {
      return false;
    }
  }
  if (state.unitFilters.elite === "Elite" && !unit.elite) return false;
  if (state.unitFilters.elite === "Non-Elite" && unit.elite) return false;
  return true;
}

function npcMatchesFilters(npc) {
  if (state.npcFilters.area !== "All" && npc.area !== state.npcFilters.area) return false;
  if (state.npcFilters.alignment !== "All" && npc.alignment !== state.npcFilters.alignment) return false;
  return true;
}

function itemMatchesFilters(item) {
  if (!["weapons", "equipment"].includes(state.itemGroup)) return true;
  if (state.itemFilters.rarity !== "All" && item.rarity !== state.itemFilters.rarity) return false;
  if (state.itemGroup === "equipment" && state.itemFilters.slot !== "All" && item.slot !== state.itemFilters.slot) return false;
  return true;
}

function selectFirstFilteredUnitIfNeeded() {
  if (state.tab !== "units") return;
  const unit = selectedUnit();
  if (unit && unitMatchesFilters(unit)) return;
  const nextIndex = activeUnits().findIndex(unit => unitMatchesFilters(unit));
  if (nextIndex >= 0) state.unitIndex = nextIndex;
}

function selectFirstFilteredNpcIfNeeded() {
  if (state.tab !== "npcs") return;
  const npc = selectedNpc();
  if (npc && npcMatchesFilters(npc)) return;
  const nextIndex = state.npcs.findIndex(npc => npcMatchesFilters(npc));
  if (nextIndex >= 0) state.npcIndex = nextIndex;
}

function selectFirstFilteredItemIfNeeded() {
  if (state.tab !== "items") return;
  const item = selectedItem();
  if (item && itemMatchesFilters(item)) return;
  const nextIndex = (state.items[state.itemGroup] || []).findIndex(item => itemMatchesFilters(item));
  if (nextIndex >= 0) state.itemIndex = nextIndex;
}

function renderTabs() {
  document.querySelectorAll("[data-tab]").forEach(button => button.classList.toggle("active", button.dataset.tab === state.tab));
  document.querySelectorAll(".tab-view").forEach(view => view.classList.toggle("active", view.id === `${state.tab}View`));
  $("#unitGroupsPanel").style.display = state.tab === "units" ? "" : "none";
  $("#itemGroupsPanel").style.display = state.tab === "items" ? "" : "none";
  $("#npcGroupsPanel").style.display = state.tab === "npcs" ? "" : "none";
  $("#assetGroupsPanel").style.display = state.tab === "assets" ? "" : "none";
  $("#editorTitle").textContent = state.tab === "units" ? "Units" : state.tab === "lootTables" ? "Loot Tables" : state.tab === "areas" ? "Areas" : state.tab === "dungeons" ? "Dungeons" : state.tab === "spells" ? "Spells" : state.tab === "enchantments" ? "Enchantments" : state.tab === "items" ? "Items" : state.tab === "crafting" ? "Crafting" : state.tab === "factions" ? "Factions" : state.tab === "npcs" ? "NPCs" : state.tab === "quests" ? "Quests" : "Assets";
  $("#newButton").disabled = state.tab === "assets";
  $("#duplicateButton").disabled = state.tab === "assets";
  $("#deleteButton").disabled = state.tab === "assets";
  $("#saveButton").style.display = state.tab === "assets" ? "none" : "";
}

function renderGroupTabs() {
  renderUnitFilters();
  renderNpcFilters();
  renderItemFilters();
  $("#itemTabs").innerHTML = Object.entries(ITEM_GROUPS).map(([name, label]) => `
    <button type="button" class="${name === state.itemGroup ? "active" : ""}" data-item-group="${name}">${escapeHtml(label)}</button>
  `).join("");
  $("#assetTabs").innerHTML = Object.entries(ASSET_GROUPS).map(([name, label]) => `
    <button type="button" class="${name === state.assetGroup ? "active" : ""}" data-asset-group="${name}">${escapeHtml(label)}</button>
  `).join("");
  $("#assetUploadFolder").innerHTML = Object.entries(ASSET_UPLOAD_FOLDERS).map(([folder, label]) => `
    <option value="${escapeHtml(folder)}">${escapeHtml(label)}</option>
  `).join("");
}

function currentRecords() {
  if (state.tab === "units") return activeUnits();
  if (state.tab === "lootTables") return state.editorLootTables;
  if (state.tab === "areas") return state.areas;
  if (state.tab === "dungeons") return state.dungeons;
  if (state.tab === "spells") return state.spells;
  if (state.tab === "enchantments") return state.enchantments;
  if (state.tab === "crafting") return currentCraftingRecipes();
  if (state.tab === "factions") return state.factions;
  if (state.tab === "npcs") return state.npcs;
  if (state.tab === "quests") return state.quests;
  if (state.tab === "assets") return currentAssets();
  return state.items[state.itemGroup] || [];
}

function currentIndex() {
  if (state.tab === "units") return state.unitIndex;
  if (state.tab === "lootTables") return state.lootTableIndex;
  if (state.tab === "areas") return state.areaIndex;
  if (state.tab === "dungeons") return state.dungeonIndex;
  if (state.tab === "spells") return state.spellIndex;
  if (state.tab === "enchantments") return state.enchantmentIndex;
  if (state.tab === "crafting") return state.craftingIndex;
  if (state.tab === "factions") return state.factionIndex;
  if (state.tab === "npcs") return state.npcIndex;
  if (state.tab === "quests") return state.questIndex;
  if (state.tab === "assets") return state.assetIndex;
  return state.itemIndex;
}

function setCurrentIndex(index) {
  if (state.tab === "units") state.unitIndex = index;
  else if (state.tab === "lootTables") state.lootTableIndex = index;
  else if (state.tab === "areas") state.areaIndex = index;
  else if (state.tab === "dungeons") {
    state.dungeonIndex = index;
    state.dungeonSelectedUnitIndex = -1;
  }
  else if (state.tab === "spells") state.spellIndex = index;
  else if (state.tab === "enchantments") state.enchantmentIndex = index;
  else if (state.tab === "crafting") state.craftingIndex = index;
  else if (state.tab === "factions") state.factionIndex = index;
  else if (state.tab === "npcs") state.npcIndex = index;
  else if (state.tab === "quests") state.questIndex = index;
  else if (state.tab === "assets") state.assetIndex = index;
  else state.itemIndex = index;
}

function renderRecordList() {
  const query = searchInput.value.trim().toLowerCase();
  const rows = currentRecords()
    .map((record, index) => ({ record, index }))
    .filter(({ record }) => {
      const haystack = [record.name, record.id, record.realm, record.type, record.path, record.folder].join(" ").toLowerCase();
      if (query && !haystack.includes(query)) return false;
      if (state.tab === "units") return unitMatchesFilters(record);
      if (state.tab === "npcs") return npcMatchesFilters(record);
      if (state.tab === "items") return itemMatchesFilters(record);
      return true;
    });
  if (!rows.length) {
    const hasFilters = query
      || state.unitFilters.realm !== "All"
      || state.unitFilters.type !== "All"
      || state.unitFilters.alignment !== "All"
      || state.unitFilters.faction !== "All"
      || state.unitFilters.elite !== "All"
      || state.npcFilters.area !== "All"
      || state.npcFilters.alignment !== "All"
      || state.itemFilters.rarity !== "All"
      || state.itemFilters.slot !== "All";
    recordList.innerHTML = `<div class="empty-state">${hasFilters ? "No records match the current search or filters." : "No records found."}</div>`;
    return;
  }
  recordList.innerHTML = rows.map(({ record, index }) => `
    <button type="button" class="record-row ${index === currentIndex() ? "active" : ""}" data-index="${index}">
      <span><strong>${escapeHtml(record.name || record.path)}</strong><br><small>${escapeHtml([record.elite ? "Elite" : "", record.boss ? "Boss" : "", record.realm || record.type || record.folder || "", record.existingElite && record.template ? `Template: ${record.template}` : ""].filter(Boolean).join(" / "))}</small></span>
      <i class="realm-dot" style="background:${REALM_COLORS[record.realm] || "#8c7b5c"}"></i>
    </button>
  `).join("");
}

function renderItemNameOptions() {
  const datalist = $("#itemNameOptions");
  if (!datalist) return;
  datalist.innerHTML = allItemNames().map(name => `<option value="${escapeHtml(name)}"></option>`).join("");
}

function fillUnitForm() {
  const unit = normalizeUnit(selectedUnit());
  unitForm.elements.weaponName.innerHTML = optionHtml(weaponNames(), unit.weapon.name);
  unitForm.elements.faction.innerHTML = factionOptions(unit.faction);
  unitForm.elements.name.value = unit.name;
  unitForm.elements.realm.value = unit.realm;
  unitForm.elements.type.value = unit.type;
  unitForm.elements.foodchain.value = unit.foodchain;
  unitForm.elements.alignment.value = unit.alignment;
  unitForm.elements.faction.value = unit.faction;
  unitForm.elements.gold.value = unit.gold;
  unitForm.elements.aggressive.checked = unit.aggressive;
  unitForm.elements.flying.checked = unit.flying;
  unitForm.elements.incorporeal.checked = unit.incorporeal;
  unitForm.elements.aquatic.checked = unit.aquatic;
  unitForm.elements.amphibious.checked = unit.amphibious;
  unitForm.elements.elite.checked = unit.elite;
  unitForm.elements.boss.checked = unit.boss;
  unitForm.elements.weaponName.value = unit.weapon.name;
  unitForm.elements.radius.value = unit.radius;
  unitForm.elements.sprite.value = unit.sprite;
  for (const stat of STAT_KEYS) unitForm.elements[`stat_${stat}`].value = unit.stats[stat];
  renderUnitSprite();
  renderUnitSpells(unit.spells);
  renderUnitLoot();
}

function readUnitForm() {
  const unit = {
    name: unitForm.elements.name.value.trim(),
    realm: unitForm.elements.realm.value,
    type: unitForm.elements.type.value.trim(),
    alignment: unitForm.elements.alignment.value,
    faction: factionId(unitForm.elements.faction.value),
    radius: numberValue(unitForm.elements.radius.value, 13),
    gold: unitForm.elements.gold.value.trim() || "0",
    sprite: unitForm.elements.sprite.value.trim(),
    stats: {},
    weapon: { name: unitForm.elements.weaponName.value.trim() }
  };
  const foodchain = unitForm.elements.foodchain.value.trim();
  if (foodchain) unit.foodchain = foodchain;
  if (unitForm.elements.aggressive.checked) unit.aggressive = true;
  if (unitForm.elements.flying.checked) unit.flying = true;
  if (unitForm.elements.incorporeal.checked) unit.incorporeal = true;
  if (unitForm.elements.aquatic.checked) unit.aquatic = true;
  if (unitForm.elements.amphibious.checked) unit.amphibious = true;
  if (unitForm.elements.elite.checked) unit.elite = true;
  if (unitForm.elements.boss.checked) unit.boss = true;
  for (const stat of STAT_KEYS) unit.stats[stat] = numberValue(unitForm.elements[`stat_${stat}`].value);
  const spells = readUnitSpells();
  if (spells.length) unit.spells = spells;
  return unit;
}

function selectedFaction() {
  return state.factions[state.factionIndex] || null;
}

function fillFactionForm() {
  if (!factionForm) return;
  const faction = selectedFaction() || normalizeFaction({ name: "New Faction" });
  factionForm.elements.name.value = faction.name || "";
  factionForm.elements.id.value = faction.id || "";
  $("#factionEnemyList").innerHTML = state.factions
    .filter(candidate => candidate.id !== faction.id)
    .map(candidate => `
      <label class="stack-row">
        <input type="checkbox" data-faction-enemy="${escapeHtml(candidate.id)}" ${faction.enemyFactionIds?.includes(candidate.id) ? "checked" : ""}>
        <span>${escapeHtml(candidate.name)}</span>
      </label>
    `).join("") || `<div class="empty-state">Create another faction to add enemies.</div>`;
  renderFactionUnitAssignList();
}

function readFactionForm() {
  const current = selectedFaction() || {};
  const id = factionId(factionForm.elements.id.value || factionForm.elements.name.value || current.id);
  const enemies = [...document.querySelectorAll("[data-faction-enemy]:checked")].map(input => factionId(input.dataset.factionEnemy)).filter(Boolean);
  return normalizeFaction({
    id,
    name: factionForm.elements.name.value.trim() || id || "New Faction",
    enemyFactionIds: enemies
  });
}

function renderFactionUnitAssignList() {
  const faction = selectedFaction();
  const query = ($("#factionUnitSearch")?.value || "").trim().toLowerCase();
  const filter = $("#factionUnitFilter")?.value || "all";
  const rows = state.unitRefs
    .filter(ref => !ref.virtual)
    .filter(ref => {
      const unit = ref.unit;
      if (query && !String(unit.name || "").toLowerCase().includes(query)) return false;
      if (filter === "unassigned" && unit.faction) return false;
      if (filter === "assigned-here" && unit.faction !== faction?.id) return false;
      return true;
    });
  $("#factionUnitAssignList").innerHTML = rows.length ? rows.map(ref => `
    <label class="bulk-check-row">
      <input type="checkbox" data-faction-unit="${escapeHtml(ref.unit.name)}">
      <strong>${escapeHtml(ref.unit.name)}</strong>
      <small>${escapeHtml(state.factions.find(faction => faction.id === ref.unit.faction)?.name || "None")}</small>
    </label>
  `).join("") : `<div class="empty-state">No units match.</div>`;
}

function applyFactionToSelectedUnits(factionIdValue) {
  const selected = new Set([...document.querySelectorAll("[data-faction-unit]:checked")].map(input => input.dataset.factionUnit));
  if (!selected.size) return;
  for (const ref of state.unitRefs) {
    if (selected.has(ref.unit.name)) {
      ref.unit.faction = factionIdValue || "";
    }
  }
  state.dirty = true;
  renderCurrentForm();
}

function applyDefaultFactionAssignments() {
  const validIds = new Set(state.factions.map(faction => faction.id));
  for (const ref of state.unitRefs) {
    if (Object.prototype.hasOwnProperty.call(ref.unit, "faction")) continue;
    const inferred = inferredFactionForUnit(ref.unit);
    if (inferred && validIds.has(inferred)) ref.unit.faction = inferred;
  }
}

function normalizeUnitSpell(spell) {
  if (typeof spell === "string") return { name: spell };
  return spell && typeof spell === "object" ? spell : {};
}

function renderUnitSpells(spells = []) {
  $("#unitSpellsList").innerHTML = spells.map(spell => unitSpellRow(spell)).join("");
}

function unitSpellRow(spell) {
  const normalized = normalizeUnitSpell(spell);
  return `
    <div class="stack-row unit-spell-row" data-unit-spell-row>
      <label><span>Spell</span><select data-unit-spell-name>${optionHtml(spellNames(), normalized.name || "")}</select></label>
      <button type="button" data-remove-row>Delete</button>
    </div>
  `;
}

function readUnitSpells() {
  return [...document.querySelectorAll("[data-unit-spell-row]")].map(row => {
    const name = row.querySelector("[data-unit-spell-name]").value;
    if (!name) return null;
    const template = spellTemplateByName(name);
    return {
      name,
      realm: template.realm || "Mortal"
    };
  }).filter(Boolean);
}

function renderUnitLoot() {
  const unit = selectedUnit();
  const tables = normalizeLootTables(state.lootTables[unit?.name]);
  const inheritedTables = normalizeLootTables(state.inheritedLootTables[unit?.name]);
  $("#unitLootList").innerHTML = [
    ...inheritedTables.map(table => inheritedLootTableHtml(table)),
    ...tables.map((table, tableIndex) => editableLootTableHtml(table, tableIndex))
  ].join("");
}

function selectedEditorLootTable() {
  return state.editorLootTables[state.lootTableIndex] || null;
}

function normalizeEditorLootTables(tables = []) {
  return (Array.isArray(tables) ? tables : [])
    .map(table => ({
      name: table.name || "New Loot Table",
      tables: normalizeLootTables(table)
    }))
    .filter(table => table.name);
}

function fillLootTableForm() {
  const table = selectedEditorLootTable();
  if (!table) {
    lootTableForm.elements.name.value = "";
    $("#editorLootTableList").innerHTML = `<p class="hint">Create a loot table to edit it.</p>`;
    return;
  }
  lootTableForm.elements.name.value = table.name || "";
  $("#editorLootTableList").innerHTML = normalizeLootTables(table).map((lootTable, tableIndex) => editableLootTableHtml(lootTable, tableIndex)).join("");
}

function readLootTableForm() {
  const current = selectedEditorLootTable() || { name: "New Loot Table", tables: [] };
  return {
    ...current,
    name: lootTableForm.elements.name.value.trim() || current.name || "New Loot Table",
    tables: normalizeLootTables(readLootTablesFrom("#editorLootTableList"))
  };
}

function editableLootTableHtml(table, tableIndex) {
  return `
    <section class="stack-row loot-table-row" data-loot-table="${tableIndex}">
      <div class="form-grid two">
        <label><span>Min LVL</span><input data-loot-table-min type="number" step="1" min="1" value="${table.minLvl ?? ""}"></label>
        <label><span>Max LVL</span><input data-loot-table-max type="number" step="1" min="1" value="${table.maxLvl ?? ""}"></label>
      </div>
      <div class="stack-list">
        ${(table.entries || []).map(entry => lootEntryRow(entry)).join("")}
      </div>
      <div class="toggle-row">
        <button type="button" data-add-loot-entry>Add Item</button>
        <button type="button" data-add-loot-many>Add Many</button>
        <button type="button" data-remove-loot-table>Delete Table</button>
      </div>
    </section>
  `;
}

function normalizeLootTables(raw) {
  if (Array.isArray(raw)) {
    const groups = new Map();
    for (const entry of raw) {
      const minLvl = entry.minLvl ?? "";
      const maxLvl = entry.maxLvl ?? "";
      const key = `${minLvl}|${maxLvl}`;
      if (!groups.has(key)) groups.set(key, { minLvl, maxLvl, entries: [] });
      const cleanEntry = { ...entry };
      delete cleanEntry.minLvl;
      delete cleanEntry.maxLvl;
      groups.get(key).entries.push(cleanEntry);
    }
    return [...groups.values()];
  }
  if (raw?.tables && Array.isArray(raw.tables)) {
    return raw.tables.map(table => ({
      minLvl: table.minLvl ?? "",
      maxLvl: table.maxLvl ?? "",
      entries: Array.isArray(table.entries) ? structuredClone(table.entries) : []
    }));
  }
  return [];
}

function inheritedLootTableHtml(table) {
  return `
    <section class="stack-row loot-table-row inherited-loot-table">
      <div class="loot-table-title">
        <strong>${escapeHtml(table.source || "Inherited Loot")}</strong>
        <span>${table.minLvl ? `Min LVL ${escapeHtml(table.minLvl)}` : "Any Min LVL"} / ${table.maxLvl ? `Max LVL ${escapeHtml(table.maxLvl)}` : "Any Max LVL"}</span>
      </div>
      <div class="stack-list">
        ${(table.entries || []).map(entry => inheritedLootEntryRow(entry)).join("")}
      </div>
    </section>
  `;
}

function inheritedLootEntryRow(entry = {}) {
  const graphic = itemGraphicFor(entry.name);
  const range = [entry.minLvl ? `Min ${entry.minLvl}` : "", entry.maxLvl ? `Max ${entry.maxLvl}` : ""].filter(Boolean).join(" / ");
  return `
    <div class="stack-row loot-entry-row inherited-loot-entry">
      <span class="loot-item-preview">${graphic ? `<img src="../${graphic.replace(/^\.\//, "")}" alt="">` : ""}</span>
      <div><span>Item</span><strong>${escapeHtml(entry.name || "")}</strong></div>
      <div><span>Chance</span><strong>${escapeHtml(entry.chance ?? "")}</strong></div>
      <small>${escapeHtml(range)}</small>
    </div>
  `;
}

function lootEntryRow(entry = {}) {
  const graphic = itemGraphicFor(entry.name);
  return `
    <div class="stack-row loot-entry-row" data-loot-row>
      <span class="loot-item-preview" data-loot-preview>${graphic ? `<img src="../${graphic.replace(/^\.\//, "")}" alt="">` : ""}</span>
      <label><span>Item</span><select data-loot-name>${optionHtml(allItemNames(), entry.name)}</select></label>
      <label><span>Chance</span><input data-loot-chance type="number" step="0.01" min="0" max="1" value="${entry.chance ?? 0.01}"></label>
      <button type="button" data-remove-row>Delete</button>
    </div>
  `;
}

function syncLootPreview(row) {
  const name = row.querySelector("[data-loot-name]")?.value || "";
  const graphic = itemGraphicFor(name);
  const preview = row.querySelector("[data-loot-preview]");
  if (preview) preview.innerHTML = graphic ? `<img src="../${graphic.replace(/^\.\//, "")}" alt="">` : "";
}

function readLootTablesFrom(containerSelector) {
  const tables = [...document.querySelectorAll(`${containerSelector} [data-loot-table]`)].map(section => {
    const minValue = section.querySelector("[data-loot-table-min]").value;
    const maxValue = section.querySelector("[data-loot-table-max]").value;
    const entries = [...section.querySelectorAll("[data-loot-row]")].map(row => ({
      name: row.querySelector("[data-loot-name]").value,
      chance: numberValue(row.querySelector("[data-loot-chance]").value, 0.01)
    })).filter(entry => entry.name);
    const table = { entries };
    if (minValue !== "") table.minLvl = Math.max(1, Math.floor(numberValue(minValue, 1)));
    if (maxValue !== "") table.maxLvl = Math.max(table.minLvl || 1, Math.floor(numberValue(maxValue, table.minLvl || 1)));
    return table;
  }).filter(table => table.entries.length);
  if (!tables.length) return [];
  return { tables };
}

function readUnitLootFor(name) {
  return readLootTablesFrom("#unitLootList");
}

function renderUnitSprite() {
  const img = $("#unitSpritePreview");
  const path = unitForm.elements.sprite.value.trim();
  const src = path ? `../${path.replace(/^\.\//, "")}` : "";
  img.src = src;
  const radius = numberValue(unitForm.elements.radius.value, 13);
  const size = Math.min(160, Math.max(24, radius * UNIT_SIZE_SCALE * 4.3));
  img.style.width = `${size}px`;
  img.style.height = `${size}px`;
}

function fillAreaForm() {
  const area = selectedArea();
  if (!area) return;
  areaForm.elements.minLvl.value = area.levelRange?.min ?? 1;
  areaForm.elements.maxLvl.value = area.levelRange?.max ?? area.levelRange?.min ?? 1;
  areaForm.elements.spawnRate.innerHTML = areaSpawnRateOptionHtml(AREA_SPAWN_RATES.includes(area.spawnRate) ? area.spawnRate : "");
  areaForm.elements.spawnAmount.innerHTML = areaSpawnAmountOptionHtml(area.spawnAmount);
  renderSpawns();
}

function readAreaForm() {
  const area = structuredClone(selectedArea());
  const minLvl = Math.max(1, Math.floor(numberValue(areaForm.elements.minLvl.value, 1)));
  const maxLvl = Math.max(minLvl, Math.floor(numberValue(areaForm.elements.maxLvl.value, minLvl)));
  area.levelRange = { min: minLvl, max: maxLvl };
  const spawnRate = areaForm.elements.spawnRate.value;
  if (AREA_SPAWN_RATES.includes(spawnRate)) area.spawnRate = spawnRate;
  else delete area.spawnRate;
  const spawnAmount = areaForm.elements.spawnAmount.value;
  if (AREA_SPAWN_AMOUNTS.includes(spawnAmount) && spawnAmount !== "Normal") area.spawnAmount = spawnAmount;
  else delete area.spawnAmount;
  area.spawnTable = readSpawnRows("#spawnList");
  return area;
}

function readSpawnRows(containerSelector) {
  return normalizeSpawnRows([...document.querySelectorAll(`${containerSelector} [data-spawn-row]`)].map(row => ({
    name: row.querySelector("[data-spawn-name]").value,
    frequency: numberValue(row.querySelector("[data-spawn-frequency]").value, 1),
    minLvl: row.querySelector("[data-spawn-min-lvl]").value === "" ? undefined : Math.max(1, Math.floor(numberValue(row.querySelector("[data-spawn-min-lvl]").value, 1))),
    maxLvl: row.querySelector("[data-spawn-max-lvl]").value === "" ? undefined : Math.max(1, Math.floor(numberValue(row.querySelector("[data-spawn-max-lvl]").value, 1)))
  })));
}

function normalizeSpawnRows(spawns = []) {
  const normalized = (Array.isArray(spawns) ? spawns : []).map(spawn => ({
    name: spawn.name || spawn.unit || "",
    frequency: numberValue(spawn.frequency, 1),
    minLvl: spawn.minLvl ?? spawn.minLevel ?? spawn.levelRange?.min,
    maxLvl: spawn.maxLvl ?? spawn.maxLevel ?? spawn.levelRange?.max
  })).filter(spawn => spawn.name);
  for (const spawn of normalized) {
    if (spawn.minLvl === undefined) delete spawn.minLvl;
    if (spawn.maxLvl === undefined) delete spawn.maxLvl;
    if (spawn.minLvl !== undefined && spawn.maxLvl !== undefined && spawn.maxLvl < spawn.minLvl) spawn.maxLvl = spawn.minLvl;
  }
  return normalized;
}

function defaultDungeon() {
  const name = uniqueName("New Dungeon", state.dungeons.map(dungeon => dungeon.name));
  return {
    id: uniqueId(slugify(name) || "new-dungeon", state.dungeons.map(dungeon => dungeon.id)),
    name,
    cellSize: DUNGEON_CELL_SIZE,
    width: 8,
    height: 8,
    wallTexture: DEFAULT_DUNGEON_WALL_TEXTURE,
    entrance: { x: 0, y: 0 },
    cells: [],
    water: [],
    lava: [],
    units: [],
    npcs: [],
    features: [],
    spawnRate: "Normal",
    spawnAmount: "Normal",
    spawnTable: []
  };
}

function normalizeDungeon(dungeon = {}) {
  const width = Math.max(1, Math.min(80, Math.floor(numberValue(dungeon.width, 8))));
  const height = Math.max(1, Math.min(80, Math.floor(numberValue(dungeon.height, 8))));
  const normalized = {
    id: dungeon.id || slugify(dungeon.name) || "new-dungeon",
    name: dungeon.name || dungeon.id || "New Dungeon",
    cellSize: DUNGEON_CELL_SIZE,
    width,
    height,
    wallTexture: dungeon.wallTexture || DEFAULT_DUNGEON_WALL_TEXTURE,
    entrance: {
      x: Math.max(0, Math.min(width - 1, Math.floor(numberValue(dungeon.entrance?.x, 0)))),
      y: Math.max(0, Math.min(height - 1, Math.floor(numberValue(dungeon.entrance?.y, 0))))
    },
    cells: (Array.isArray(dungeon.cells) ? dungeon.cells : [])
      .map(cell => ({
        x: Math.floor(numberValue(cell.x, 0)),
        y: Math.floor(numberValue(cell.y, 0)),
        texture: cell.texture || cell.groundTexture || "",
        brush: DUNGEON_BRUSH_IDS.has(cell.brush) ? cell.brush : "square"
      }))
      .filter(cell => cell.x >= 0 && cell.y >= 0 && cell.x < width && cell.y < height && cell.texture),
    water: (Array.isArray(dungeon.water) ? dungeon.water : [])
      .map(water => ({
        x: Math.floor(numberValue(water.x, 0)),
        y: Math.floor(numberValue(water.y, 0))
      }))
      .filter(water => water.x >= 0 && water.y >= 0 && water.x < width && water.y < height),
    lava: (Array.isArray(dungeon.lava) ? dungeon.lava : [])
      .map(lava => ({
        x: Math.floor(numberValue(lava.x, 0)),
        y: Math.floor(numberValue(lava.y, 0))
      }))
      .filter(lava => lava.x >= 0 && lava.y >= 0 && lava.x < width && lava.y < height),
    units: (Array.isArray(dungeon.units) ? dungeon.units : [])
      .map(unit => ({
        name: unit.name || unit.unit || "",
        x: Math.floor(numberValue(unit.x, 0)),
        y: Math.floor(numberValue(unit.y, 0)),
        level: Math.max(1, Math.floor(numberValue(unit.level ?? unit.lvl, 1))),
        elite: Boolean(unit.elite),
        boss: Boolean(unit.boss)
      }))
      .filter(unit => unit.name && unit.x >= 0 && unit.y >= 0 && unit.x < width && unit.y < height),
    npcs: (Array.isArray(dungeon.npcs) ? dungeon.npcs : [])
      .map(npc => ({
        id: npc.id || npc.npcId || "",
        x: Math.floor(numberValue(npc.x, 0)),
        y: Math.floor(numberValue(npc.y, 0))
      }))
      .filter(npc => npc.id && npc.x >= 0 && npc.y >= 0 && npc.x < width && npc.y < height),
    features: (Array.isArray(dungeon.features) ? dungeon.features : [])
      .map(feature => ({
        sprite: feature.sprite || feature.path || "",
        x: Math.floor(numberValue(feature.x, 0)),
        y: Math.floor(numberValue(feature.y, 0)),
        size: Math.max(16, Math.floor(numberValue(feature.size, 96))),
        obstacle: feature.obstacle !== false
      }))
      .filter(feature => feature.sprite && feature.x >= 0 && feature.y >= 0 && feature.x < width && feature.y < height),
    spawnTable: normalizeSpawnRows(dungeon.spawnTable)
  };
  if (AREA_SPAWN_RATES.includes(dungeon.spawnRate)) normalized.spawnRate = dungeon.spawnRate;
  if (AREA_SPAWN_AMOUNTS.includes(dungeon.spawnAmount) && dungeon.spawnAmount !== "Normal") normalized.spawnAmount = dungeon.spawnAmount;
  const seenCells = new Map();
  for (const cell of normalized.cells) seenCells.set(`${cell.x},${cell.y}`, cell);
  normalized.cells = [...seenCells.values()].sort((a, b) => a.y - b.y || a.x - b.x);
  const seenWater = new Map();
  for (const water of normalized.water) seenWater.set(`${water.x},${water.y}`, water);
  normalized.water = [...seenWater.values()].sort((a, b) => a.y - b.y || a.x - b.x);
  const seenLava = new Map();
  for (const lava of normalized.lava) seenLava.set(`${lava.x},${lava.y}`, lava);
  normalized.lava = [...seenLava.values()].sort((a, b) => a.y - b.y || a.x - b.x);
  return normalized;
}

function dungeonCellTexture(dungeon, x, y) {
  return dungeon.cells.find(cell => cell.x === x && cell.y === y)?.texture || DEFAULT_DUNGEON_TEXTURE;
}

function dungeonCellBrush(dungeon, x, y) {
  return dungeon.cells.find(cell => cell.x === x && cell.y === y)?.brush || "square";
}

function setDungeonCellTexture(dungeon, x, y, texture, brush = "square") {
  const index = dungeon.cells.findIndex(cell => cell.x === x && cell.y === y);
  const normalizedBrush = DUNGEON_BRUSH_IDS.has(brush) ? brush : "square";
  if (index >= 0) {
    dungeon.cells[index].texture = texture;
    dungeon.cells[index].brush = normalizedBrush;
  } else {
    dungeon.cells.push({ x, y, texture, brush: normalizedBrush });
  }
}

function removeDungeonCellTexture(dungeon, x, y) {
  dungeon.cells = dungeon.cells.filter(cell => cell.x !== x || cell.y !== y);
}

function dungeonHasWater(dungeon, x, y) {
  return (dungeon.water || []).some(water => water.x === x && water.y === y);
}

function setDungeonCellWater(dungeon, x, y) {
  dungeon.water ||= [];
  if (!dungeonHasWater(dungeon, x, y)) dungeon.water.push({ x, y });
}

function removeDungeonCellWater(dungeon, x, y) {
  dungeon.water = (dungeon.water || []).filter(water => water.x !== x || water.y !== y);
}

function dungeonHasLava(dungeon, x, y) {
  return (dungeon.lava || []).some(lava => lava.x === x && lava.y === y);
}

function setDungeonCellLava(dungeon, x, y) {
  dungeon.lava ||= [];
  if (!dungeonHasLava(dungeon, x, y)) dungeon.lava.push({ x, y });
}

function removeDungeonCellLava(dungeon, x, y) {
  dungeon.lava = (dungeon.lava || []).filter(lava => lava.x !== x || lava.y !== y);
}

function dungeonUnitIndexAt(dungeon, x, y) {
  return dungeon.units.findIndex(unit => unit.x === x && unit.y === y);
}

function dungeonNpcIndexAt(dungeon, x, y) {
  return (dungeon.npcs || []).findIndex(npc => npc.x === x && npc.y === y);
}

function dungeonFeatureIndexAt(dungeon, x, y) {
  return (dungeon.features || []).findIndex(feature => feature.x === x && feature.y === y);
}

function npcOptionLabel(npc) {
  return npc?.name ? `${npc.name} (${npc.id})` : npc?.id || "";
}

function fillDungeonForm() {
  const dungeon = selectedDungeon();
  if (!dungeon) {
    renderDungeonToolOptions({ cells: [] });
    $("#dungeonGrid").innerHTML = "";
    $("#dungeonSpawnList").innerHTML = "";
    $("#dungeonSelectedUnitDetails").innerHTML = `<p class="hint">Create a dungeon to edit its grid.</p>`;
    return;
  }
  const normalized = normalizeDungeon(dungeon);
  state.dungeons[state.dungeonIndex] = normalized;
  dungeonForm.elements.name.value = normalized.name;
  dungeonForm.elements.id.value = normalized.id;
  dungeonForm.elements.width.value = normalized.width;
  dungeonForm.elements.height.value = normalized.height;
  dungeonForm.elements.wallTexture.value = normalized.wallTexture;
  dungeonForm.elements.spawnRate.innerHTML = areaSpawnRateOptionHtml(AREA_SPAWN_RATES.includes(normalized.spawnRate) ? normalized.spawnRate : "");
  dungeonForm.elements.spawnAmount.innerHTML = areaSpawnAmountOptionHtml(normalized.spawnAmount);
  renderDungeonToolOptions(normalized);
  renderDungeonGrid(normalized);
  renderDungeonSpawns(normalized);
  renderDungeonSelectedUnit(normalized);
}

function readDungeonForm() {
  const dungeon = normalizeDungeon(selectedDungeon() || defaultDungeon());
  dungeon.name = dungeonForm.elements.name.value.trim() || dungeon.name;
  dungeon.id = dungeonForm.elements.id.value.trim() || slugify(dungeon.name) || dungeon.id;
  const width = Math.max(1, Math.min(80, Math.floor(numberValue(dungeonForm.elements.width.value, dungeon.width))));
  const height = Math.max(1, Math.min(80, Math.floor(numberValue(dungeonForm.elements.height.value, dungeon.height))));
  dungeon.width = width;
  dungeon.height = height;
  dungeon.wallTexture = dungeonForm.elements.wallTexture.value || DEFAULT_DUNGEON_WALL_TEXTURE;
  const spawnRate = dungeonForm.elements.spawnRate.value;
  if (AREA_SPAWN_RATES.includes(spawnRate)) dungeon.spawnRate = spawnRate;
  else delete dungeon.spawnRate;
  const spawnAmount = dungeonForm.elements.spawnAmount.value;
  if (AREA_SPAWN_AMOUNTS.includes(spawnAmount) && spawnAmount !== "Normal") dungeon.spawnAmount = spawnAmount;
  else delete dungeon.spawnAmount;
  dungeon.spawnTable = readSpawnRows("#dungeonSpawnList");
  return normalizeDungeon(dungeon);
}

function ingredientRow(ingredient = {}) {
  const selected = ingredient.item || allItemNames()[0] || "";
  return `
    <div class="stack-row" data-crafting-ingredient>
      <label><span>Item</span><span class="select-with-preview"><span class="loot-item-preview" data-crafting-ingredient-preview>${itemPreviewHtml(selected)}</span><select data-crafting-ingredient-item>${itemSelectOptions(selected)}</select></span></label>
      <label><span>Qty</span><input data-crafting-ingredient-qty type="number" min="1" step="1" value="${Number(ingredient.quantity) || 1}"></label>
      <button type="button" data-remove-crafting-ingredient class="danger">Remove</button>
    </div>
  `;
}

function fillCraftingForm() {
  const recipe = selectedCraftingRecipe() || defaultCraftingRecipe();
  $("#craftingSkillTabs").innerHTML = CRAFTING_SKILLS.map(skill => `
    <button type="button" class="${skill === state.craftingSkill ? "active" : ""}" data-crafting-skill="${skill}">${skill}</button>
  `).join("");
  craftingForm.elements.name.value = recipe.name || "";
  craftingForm.elements.station.value = recipe.station || "Crafting Table";
  craftingForm.elements.output.innerHTML = itemSelectOptions(recipe.output || recipe.item || recipe.name || "");
  craftingForm.elements.output.value = recipe.output || recipe.item || recipe.name || "";
  $("#craftingOutputPreview").innerHTML = itemPreviewHtml(craftingForm.elements.output.value);
  craftingForm.elements.quantity.value = Number(recipe.quantity) || 1;
  craftingForm.elements.level.value = Number(recipe.level) || 1;
  craftingForm.elements.xp.value = Number(recipe.xp) || 0;
  craftingForm.elements.soundEffect.value = recipe.soundEffect || "";
  $("#craftingIngredientsList").innerHTML = (recipe.ingredients?.length ? recipe.ingredients : [{ item: "", quantity: 1 }]).map(ingredientRow).join("");
}

function readCraftingForm() {
  const recipe = selectedCraftingRecipe() || defaultCraftingRecipe();
  return {
    ...recipe,
    name: craftingForm.elements.name.value.trim() || craftingForm.elements.output.value.trim() || recipe.name,
    station: craftingForm.elements.station.value,
    output: craftingForm.elements.output.value.trim(),
    quantity: Math.max(1, Math.floor(numberValue(craftingForm.elements.quantity.value, 1))),
    ingredients: [...document.querySelectorAll("[data-crafting-ingredient]")].map(row => ({
      item: row.querySelector("[data-crafting-ingredient-item]")?.value || "",
      quantity: Math.max(1, Math.floor(numberValue(row.querySelector("[data-crafting-ingredient-qty]")?.value, 1)))
    })).filter(ingredient => ingredient.item),
    level: Math.max(1, Math.floor(numberValue(craftingForm.elements.level.value, 1))),
    xp: Math.max(0, Math.floor(numberValue(craftingForm.elements.xp.value, 0))),
    soundEffect: craftingForm.elements.soundEffect.value.trim()
  };
}

function renderDungeonToolOptions(dungeon) {
  const textureSelect = $("#dungeonTextureSelect");
  const unitSelect = $("#dungeonUnitSelect");
  const npcSelect = $("#dungeonNpcSelect");
  const featureSelect = $("#dungeonFeatureSelect");
  const brushSelect = $("#dungeonBrushSelect");
  const wallTextureSelect = $("#dungeonWallTextureSelect");
  const textures = allGroundTexturePaths();
  const texture = state.dungeonSelectedTexture || textureSelect.value || dungeon.cells?.[0]?.texture || textures[0] || "";
  textureSelect.innerHTML = optionHtml(textures, texture);
  textureSelect.value = texture;
  state.dungeonSelectedTexture = textureSelect.value || "";
  const units = allUnitNames();
  const unit = state.dungeonSelectedUnit || unitSelect.value || units[0] || "";
  unitSelect.innerHTML = optionHtml(units, unit);
  unitSelect.value = unit;
  state.dungeonSelectedUnit = unitSelect.value || "";
  const npcOptions = state.npcs.map(npc => npc.id).filter(Boolean);
  const npc = state.dungeonSelectedNpc || npcSelect.value || npcOptions[0] || "";
  npcSelect.innerHTML = state.npcs.map(config => `<option value="${escapeHtml(config.id)}" ${config.id === npc ? "selected" : ""}>${escapeHtml(npcOptionLabel(config))}</option>`).join("");
  npcSelect.value = npc;
  state.dungeonSelectedNpc = npcSelect.value || "";
  const featureOptions = (state.assets.featureSprites || []).map(asset => asset.path).filter(path => path.includes("/sprites/props/"));
  const feature = state.dungeonSelectedFeature || featureSelect.value || featureOptions[0] || "";
  featureSelect.innerHTML = optionHtml(featureOptions, feature);
  featureSelect.value = feature;
  state.dungeonSelectedFeature = featureSelect.value || "";
  const brush = DUNGEON_BRUSH_IDS.has(state.dungeonSelectedBrush || brushSelect.value) ? (state.dungeonSelectedBrush || brushSelect.value) : "square";
  brushSelect.innerHTML = DUNGEON_BRUSHES.map(option => `<option value="${option.id}" ${option.id === brush ? "selected" : ""}>${option.label}</option>`).join("");
  brushSelect.value = brush;
  state.dungeonSelectedBrush = brushSelect.value || "square";
  const wallTexture = dungeon.wallTexture || wallTextureSelect.value || DEFAULT_DUNGEON_WALL_TEXTURE;
  wallTextureSelect.innerHTML = optionHtml(textures, wallTexture);
  wallTextureSelect.value = wallTexture;
  renderPreviewSelect({
    container: $("#dungeonTexturePreviewSelect"),
    type: "texture",
    options: textures,
    selected: state.dungeonSelectedTexture,
    previewPathFor: value => value
  });
  renderPreviewSelect({
    container: $("#dungeonUnitPreviewSelect"),
    type: "unit",
    options: units,
    selected: state.dungeonSelectedUnit,
    previewPathFor: value => {
      const unitTemplate = unitByName(value);
      return unitTemplate?.sprite || inferUnitSprite(value);
    }
  });
  renderPreviewSelect({
    container: $("#dungeonWallTexturePreviewSelect"),
    type: "wall-texture",
    options: textures,
    selected: wallTextureSelect.value,
    previewPathFor: value => value
  });
  renderPreviewSelect({
    container: $("#dungeonFeaturePreviewSelect"),
    type: "feature",
    options: featureOptions,
    selected: state.dungeonSelectedFeature,
    previewPathFor: value => value
  });
}

function previewImageHtml(path, type) {
  if (!path) return `<span class="preview-select-thumb empty"></span>`;
  const src = `/${path.replace(/^\.\//, "")}`;
  return `<span class="preview-select-thumb ${type}"><img src="${escapeHtml(src)}" alt=""></span>`;
}

function previewLabel(value) {
  return String(value || "None").replace(/^\.\/assets\/(?:ground|sprites\/mobs|sprites\/npcs|sprites\/props)\//, "");
}

function renderPreviewSelect({ container, type, options, selected, previewPathFor }) {
  if (!container) return;
  const selectedPath = previewPathFor(selected);
  container.innerHTML = `
    <button type="button" class="preview-select-button" data-preview-toggle="${escapeHtml(type)}">
      ${previewImageHtml(selectedPath, type)}
      <span class="preview-select-label">${escapeHtml(previewLabel(selected))}</span>
      <span class="preview-select-caret">v</span>
    </button>
    <div class="preview-select-menu" data-preview-menu="${escapeHtml(type)}">
      ${(options || []).map(value => `
        <button type="button" class="preview-select-option${value === selected ? " selected" : ""}" data-preview-type="${escapeHtml(type)}" data-preview-value="${escapeHtml(value)}">
          ${previewImageHtml(previewPathFor(value), type)}
          <span>${escapeHtml(previewLabel(value))}</span>
        </button>
      `).join("")}
    </div>
  `;
}

function dungeonCellStyle(texture) {
  if (!texture) return "";
  return ` style="background-image:url('../${escapeHtml(texture.replace(/^\.\//, ""))}')"`;
}

function dungeonCellBrushStyle(texture, brush) {
  if (!texture) return "";
  const url = `url('../${escapeHtml(texture.replace(/^\.\//, ""))}')`;
  if (!brush || brush === "square") return ` style="background-image:${url}"`;
  const diagonal = {
    "diag-nw": "135deg, transparent 0 49%, #000 50% 100%",
    "diag-ne": "225deg, transparent 0 49%, #000 50% 100%",
    "diag-se": "315deg, transparent 0 49%, #000 50% 100%",
    "diag-sw": "45deg, transparent 0 49%, #000 50% 100%"
  }[brush];
  if (diagonal) return ` style="background-image:linear-gradient(${diagonal}), ${url}"`;
  const radial = {
    "curve-nw": "circle at 0 0, transparent 0 70%, #000 71% 100%",
    "curve-ne": "circle at 100% 0, transparent 0 70%, #000 71% 100%",
    "curve-se": "circle at 100% 100%, transparent 0 70%, #000 71% 100%",
    "curve-sw": "circle at 0 100%, transparent 0 70%, #000 71% 100%"
  }[brush];
  if (radial) return ` style="background-image:radial-gradient(${radial}), ${url}"`;
  return ` style="background-image:${url}"`;
}

function renderDungeonGrid(dungeon = selectedDungeon()) {
  const grid = $("#dungeonGrid");
  if (!grid || !dungeon) return;
  grid.style.gridTemplateColumns = `repeat(${dungeon.width}, 44px)`;
  const entranceKey = `${dungeon.entrance.x},${dungeon.entrance.y}`;
  const selected = state.dungeonSelectedUnitIndex;
  const cells = [];
  for (let y = 0; y < dungeon.height; y += 1) {
    for (let x = 0; x < dungeon.width; x += 1) {
      const unitIndex = dungeonUnitIndexAt(dungeon, x, y);
      const unit = unitIndex >= 0 ? dungeon.units[unitIndex] : null;
      const npcIndex = dungeonNpcIndexAt(dungeon, x, y);
      const npc = npcIndex >= 0 ? dungeon.npcs[npcIndex] : null;
      const featureIndex = dungeonFeatureIndexAt(dungeon, x, y);
      const feature = featureIndex >= 0 ? dungeon.features[featureIndex] : null;
      const texture = dungeonCellTexture(dungeon, x, y);
      const brush = dungeonCellBrush(dungeon, x, y);
      const hasWater = dungeonHasWater(dungeon, x, y);
      const hasLava = dungeonHasLava(dungeon, x, y);
      const classes = ["dungeon-cell"];
      if (`${x},${y}` === entranceKey) classes.push("has-entrance");
      if (unitIndex >= 0) classes.push("has-unit");
      if (npcIndex >= 0) classes.push("has-npc");
      if (featureIndex >= 0) classes.push("has-feature");
      if (hasWater) classes.push("has-water");
      if (hasLava) classes.push("has-lava");
      if (unitIndex === selected) classes.push("selected-unit");
      cells.push(`
        <button type="button" class="${classes.join(" ")}" data-dungeon-x="${x}" data-dungeon-y="${y}"${dungeonCellBrushStyle(texture, brush)}>
          <span class="dungeon-cell-coords">${x},${y}</span>
          ${hasWater ? `<span class="dungeon-water-marker">W</span>` : ""}
          ${hasLava ? `<span class="dungeon-lava-marker">L</span>` : ""}
          ${`${x},${y}` === entranceKey ? `<span class="dungeon-entrance-marker">E</span>` : ""}
          ${unit ? `<span class="dungeon-unit-marker" title="${escapeHtml(unit.name)}">${escapeHtml(unit.name.slice(0, 2))}</span>` : ""}
          ${npc ? `<span class="dungeon-npc-marker" title="${escapeHtml(npc.id)}">N</span>` : ""}
          ${feature ? `<span class="dungeon-feature-marker" title="${escapeHtml(previewLabel(feature.sprite))}">F</span>` : ""}
        </button>
      `);
    }
  }
  grid.innerHTML = cells.join("");
}

function renderDungeonSelectedUnit(dungeon = selectedDungeon()) {
  const panel = $("#dungeonSelectedUnitDetails");
  if (!panel || !dungeon) return;
  const unit = dungeon.units[state.dungeonSelectedUnitIndex];
  if (!unit) {
    panel.innerHTML = `<p class="hint">Click a placed unit to edit its level, Elite/Boss flags, or delete it.</p>`;
    return;
  }
  panel.innerHTML = `
    <div class="stack-row dungeon-unit-edit" data-dungeon-selected-unit>
      <label><span>Unit</span><strong>${escapeHtml(unit.name)}</strong></label>
      <label><span>Level</span><input data-dungeon-unit-level type="number" min="1" step="1" value="${unit.level ?? 1}"></label>
      <label class="toggle-inline"><input data-dungeon-unit-elite type="checkbox" ${unit.elite ? "checked" : ""}> Elite</label>
      <label class="toggle-inline"><input data-dungeon-unit-boss type="checkbox" ${unit.boss ? "checked" : ""}> Boss</label>
      <button type="button" class="danger" data-delete-dungeon-unit>Delete</button>
    </div>
  `;
}

function spawnRowsHtml(spawns = []) {
  return spawns.map(spawn => `
    <div class="stack-row spawn-row" data-spawn-row>
      <label><span>Unit</span><select data-spawn-name>${optionHtml(allUnitNames(), spawn.name)}</select></label>
      <label><span>Frequency</span><input data-spawn-frequency type="number" step="1" value="${spawn.frequency ?? 1}"></label>
      <label><span>Min LVL</span><input data-spawn-min-lvl type="number" min="1" step="1" placeholder="Area" value="${spawn.minLvl ?? spawn.minLevel ?? spawn.levelRange?.min ?? ""}"></label>
      <label><span>Max LVL</span><input data-spawn-max-lvl type="number" min="1" step="1" placeholder="Area" value="${spawn.maxLvl ?? spawn.maxLevel ?? spawn.levelRange?.max ?? ""}"></label>
      <button type="button" data-remove-row>Delete</button>
    </div>
  `).join("");
}

function renderSpawns() {
  $("#spawnList").innerHTML = spawnRowsHtml(selectedArea()?.spawnTable || []);
}

function renderDungeonSpawns(dungeon = selectedDungeon()) {
  $("#dungeonSpawnList").innerHTML = spawnRowsHtml(dungeon?.spawnTable || []);
}

function fillSpellForm() {
  const spell = selectedSpell() || {};
  spellForm.elements.name.value = spell.name || "";
  spellForm.elements.realm.value = spell.realm || "Mortal";
  spellForm.elements.cooldown.value = spell.cooldown ?? 0;
  spellForm.elements.range.value = spell.range ?? 0;
  spellForm.elements.lvl.value = spell.lvl ?? 1;
  spellForm.elements.aoeRadius.value = spell.aoeRadius ?? "";
  spellForm.elements.duration.value = spell.duration ?? "";
  spellForm.elements.tick.value = spell.tick ?? "";
  spellForm.elements.text.value = spell.text || "";
  spellForm.elements.icon.value = spell.icon || inferSpellIcon(spell.name);
  spellForm.elements.soundEffect.value = spell.soundEffect || "";
  for (const key of ["manualTarget", "autocast", "passive", "aura"]) spellForm.elements[key].checked = Boolean(spell[key]);
  spellForm.elements.advancedJson.value = JSON.stringify(spell, null, 2);
  renderSpellIcon();
}

function selectedEnchantment() {
  return state.enchantments[state.enchantmentIndex] || null;
}

function arrayFromValue(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function setCheckedValues(prefix, options, values) {
  const selected = new Set(arrayFromValue(values));
  for (const option of options) {
    const input = enchantmentForm.elements[`${prefix}_${option.replace(/\W+/g, "")}`];
    if (input) input.checked = selected.has(option);
  }
}

function checkedValues(prefix, options) {
  return options.filter(option => enchantmentForm.elements[`${prefix}_${option.replace(/\W+/g, "")}`]?.checked);
}

function normalizeEnchantment(enchantment = {}) {
  const requirements = enchantment.requirements || {};
  const colorChannels = enchantment.colorChannels || enchantment.graphicChannels || {};
  return {
    name: enchantment.name || "New Enchantment",
    realm: enchantment.realm || "Mortal",
    stats: Object.fromEntries(STAT_KEYS.map(stat => [stat, numberValue(enchantment.stats?.[stat], 0)])),
    requiredSlots: arrayFromValue(enchantment.requiredSlots || requirements.slots || requirements.requiredSlots),
    requiredWeaponTypes: arrayFromValue(enchantment.requiredWeaponTypes || requirements.weaponTypes || requirements.requiredWeaponTypes),
    requiredArmorTypes: arrayFromValue(enchantment.requiredArmorTypes || requirements.armorTypes || requirements.requiredArmorTypes),
    changesColorChannels: Boolean(enchantment.changesColorChannels || enchantment.applyColorChannels || enchantment.tintItem),
    colorChannels: {
      metal: colorChannels.metal || "",
      gem: colorChannels.gem || "",
      rune: colorChannels.rune || ""
    },
    advanced: Object.fromEntries(Object.entries(enchantment).filter(([key]) => ![
      "name", "realm", "stats", "requirements", "requiredSlots", "requiredWeaponTypes", "requiredArmorTypes",
      "changesColorChannels", "applyColorChannels", "tintItem", "colorChannels", "graphicChannels"
    ].includes(key)))
  };
}

function fillEnchantmentForm() {
  const enchantment = normalizeEnchantment(selectedEnchantment());
  enchantmentForm.elements.name.value = enchantment.name;
  enchantmentForm.elements.realm.value = enchantment.realm;
  for (const stat of STAT_KEYS) enchantmentForm.elements[`stat_${stat}`].value = enchantment.stats[stat];
  setCheckedValues("requiredSlot", ENCHANTMENT_SLOTS, enchantment.requiredSlots);
  setCheckedValues("requiredWeaponType", WEAPON_TYPES, enchantment.requiredWeaponTypes);
  setCheckedValues("requiredArmorType", ARMOR_TYPES, enchantment.requiredArmorTypes);
  enchantmentForm.elements.changesColorChannels.checked = enchantment.changesColorChannels;
  enchantmentForm.elements.enchantmentMetalChannel.value = normalizeHexColor(enchantment.colorChannels.metal) || "#c8c9c2";
  enchantmentForm.elements.enchantmentMetalChannelText.value = enchantment.colorChannels.metal || "";
  enchantmentForm.elements.enchantmentGemChannel.value = normalizeHexColor(enchantment.colorChannels.gem) || "#68a85e";
  enchantmentForm.elements.enchantmentGemChannelText.value = enchantment.colorChannels.gem || "";
  enchantmentForm.elements.enchantmentRuneChannel.value = normalizeHexColor(enchantment.colorChannels.rune) || "#9ad8ff";
  enchantmentForm.elements.enchantmentRuneChannelText.value = enchantment.colorChannels.rune || "";
  enchantmentForm.elements.advancedJson.value = Object.keys(enchantment.advanced).length ? JSON.stringify(enchantment.advanced, null, 2) : "";
}

function readEnchantmentForm() {
  const advancedText = enchantmentForm.elements.advancedJson.value.trim();
  const enchantment = advancedText ? JSON.parse(advancedText) : {};
  const stats = {};
  for (const stat of STAT_KEYS) {
    const value = numberValue(enchantmentForm.elements[`stat_${stat}`].value, 0);
    if (value) stats[stat] = value;
  }
  const requiredSlots = checkedValues("requiredSlot", ENCHANTMENT_SLOTS);
  const requiredWeaponTypes = checkedValues("requiredWeaponType", WEAPON_TYPES);
  const requiredArmorTypes = checkedValues("requiredArmorType", ARMOR_TYPES);
  const colorChannels = {
    metal: normalizeHexColor(enchantmentForm.elements.enchantmentMetalChannelText.value),
    gem: normalizeHexColor(enchantmentForm.elements.enchantmentGemChannelText.value),
    rune: normalizeHexColor(enchantmentForm.elements.enchantmentRuneChannelText.value)
  };
  const output = {
    ...enchantment,
    name: enchantmentForm.elements.name.value.trim(),
    realm: enchantmentForm.elements.realm.value,
    stats
  };
  if (requiredSlots.length) output.requiredSlots = requiredSlots;
  else delete output.requiredSlots;
  if (requiredWeaponTypes.length) output.requiredWeaponTypes = requiredWeaponTypes;
  else delete output.requiredWeaponTypes;
  if (requiredArmorTypes.length) output.requiredArmorTypes = requiredArmorTypes;
  else delete output.requiredArmorTypes;
  if (enchantmentForm.elements.changesColorChannels.checked) {
    output.changesColorChannels = true;
    output.colorChannels = Object.fromEntries(Object.entries(colorChannels).filter(([, value]) => value));
  } else {
    delete output.changesColorChannels;
    delete output.colorChannels;
  }
  return output;
}

function selectedItem() {
  return (state.items[state.itemGroup] || [])[state.itemIndex] || null;
}

function normalizeItem(item = {}) {
  const weaponEffects = item.effects || item.weapon?.effects || {};
  const stunEffect = weaponEffects.stun || {};
  const inferredStun = !("stun" in weaponEffects) && inferredWeaponTypes(item).includes("Blunt");
  return {
    name: item.name || "New Item",
    rarity: item.rarity || "common",
    slot: item.slot || (state.itemGroup === "weapons" ? "Main Hand" : state.itemGroup === "bags" ? "Bag" : "Material"),
    goldValue: item.goldValue ?? "",
    soundEffect: item.soundEffect || item.weapon?.soundEffect || item.consumable?.soundEffect || "",
    lore: item.lore || "",
    graphic: item.graphic || "",
    graphicSize: item.graphicSize ?? item.weapon?.graphicSize ?? 30,
    graphicTint: item.graphicTint || item.weapon?.graphicTint || "",
    graphicChannels: {
      ...(item.weapon?.graphicChannels || {}),
      ...(item.graphicChannels || {})
    },
    maleAvatarSprite: item.maleAvatarSprite || item.weapon?.maleAvatarSprite || item.avatarSpriteMale || item.weapon?.avatarSpriteMale || inferGenderedItemAvatarSprite(item, "male"),
    femaleAvatarSprite: item.femaleAvatarSprite || item.weapon?.femaleAvatarSprite || item.avatarSpriteFemale || item.weapon?.avatarSpriteFemale || inferGenderedItemAvatarSprite(item, "female"),
    dwarfMaleAvatarSprite: item.dwarfMaleAvatarSprite || item.weapon?.dwarfMaleAvatarSprite || item.avatarSpriteDwarfMale || item.weapon?.avatarSpriteDwarfMale || "",
    dwarfFemaleAvatarSprite: item.dwarfFemaleAvatarSprite || item.weapon?.dwarfFemaleAvatarSprite || item.avatarSpriteDwarfFemale || item.weapon?.avatarSpriteDwarfFemale || "",
    maleLeftWristAvatarSprite: item.maleLeftWristAvatarSprite || item.weapon?.maleLeftWristAvatarSprite || item.leftWristMaleAvatarSprite || item.weapon?.leftWristMaleAvatarSprite || "",
    femaleLeftWristAvatarSprite: item.femaleLeftWristAvatarSprite || item.weapon?.femaleLeftWristAvatarSprite || item.leftWristFemaleAvatarSprite || item.weapon?.leftWristFemaleAvatarSprite || "",
    dwarfMaleLeftWristAvatarSprite: item.dwarfMaleLeftWristAvatarSprite || item.weapon?.dwarfMaleLeftWristAvatarSprite || item.leftWristDwarfMaleAvatarSprite || item.weapon?.leftWristDwarfMaleAvatarSprite || "",
    dwarfFemaleLeftWristAvatarSprite: item.dwarfFemaleLeftWristAvatarSprite || item.weapon?.dwarfFemaleLeftWristAvatarSprite || item.leftWristDwarfFemaleAvatarSprite || item.weapon?.leftWristDwarfFemaleAvatarSprite || "",
    maleRightWristAvatarSprite: item.maleRightWristAvatarSprite || item.weapon?.maleRightWristAvatarSprite || item.rightWristMaleAvatarSprite || item.weapon?.rightWristMaleAvatarSprite || "",
    femaleRightWristAvatarSprite: item.femaleRightWristAvatarSprite || item.weapon?.femaleRightWristAvatarSprite || item.rightWristFemaleAvatarSprite || item.weapon?.rightWristFemaleAvatarSprite || "",
    dwarfMaleRightWristAvatarSprite: item.dwarfMaleRightWristAvatarSprite || item.weapon?.dwarfMaleRightWristAvatarSprite || item.rightWristDwarfMaleAvatarSprite || item.weapon?.rightWristDwarfMaleAvatarSprite || "",
    dwarfFemaleRightWristAvatarSprite: item.dwarfFemaleRightWristAvatarSprite || item.weapon?.dwarfFemaleRightWristAvatarSprite || item.rightWristDwarfFemaleAvatarSprite || item.weapon?.rightWristDwarfFemaleAvatarSprite || "",
    avatarSprite: item.avatarSprite || item.weapon?.avatarSprite || inferItemAvatarSprite(item),
    avatarSpriteTint: item.avatarSpriteTint || item.weapon?.avatarSpriteTint || "",
    avatarSpriteChannels: {
      ...(item.weapon?.avatarSpriteChannels || {}),
      ...(item.avatarSpriteChannels || {})
    },
    maxStack: item.maxStack ?? "",
    stackable: Boolean(item.stackable),
    noDrop: Boolean(item.noDrop),
    noSell: Boolean(item.noSell),
    shield: Boolean(item.shield),
    bag: item.bag || (state.itemGroup === "bags" ? { slots: 6 } : undefined),
    bagInventory: Array.isArray(item.bagInventory) ? item.bagInventory : undefined,
    stats: Object.fromEntries(STAT_KEYS.map(stat => [stat, numberValue(item.stats?.[stat])])),
    resistances: Object.fromEntries(REALMS.map(realm => [realm, numberValue(item.resistances?.[realm])])),
    glow: Boolean(item.glow || item.itemGlow || item.graphicGlow),
    glowColor: item.glowColor || item.itemGlowColor || item.graphicGlowColor || "",
    realm: item.realm || item.weapon?.realm || "Mortal",
    hands: item.hands || item.weapon?.hands || "One-Handed",
    dmgType: item.dmgType || item.weapon?.dmgType || "Physical",
    dice: item.dice || item.weapon?.dice || "1D4",
    speed: item.speed ?? item.weapon?.speed ?? 100,
    range: item.range ?? item.weapon?.range ?? 1,
    animation: item.animation || item.weapon?.animation || "slash",
    projectileSpeed: item.projectileSpeed ?? item.weapon?.projectileSpeed ?? "",
    projectileAnimation: item.projectileAnimation || item.weapon?.projectileAnimation || "",
    projectileSprite: item.projectileSprite || item.weapon?.projectileSprite || "",
    projectileSize: item.projectileSize ?? item.weapon?.projectileSize ?? "",
    projectileTint: item.projectileTint || item.weapon?.projectileTint || "",
    projectileGlow: Boolean(item.projectileGlow || item.weapon?.projectileGlow),
    projectileGlowColor: item.projectileGlowColor || item.weapon?.projectileGlowColor || "",
    ammo: item.ammo || item.weapon?.ammo || "",
    category: item.category || item.weapon?.category || "",
    weaponTypes: Array.isArray(item.weaponTypes) ? item.weaponTypes : Array.isArray(item.weapon?.weaponTypes) ? item.weapon.weaponTypes : inferredWeaponTypes(item),
    effects: weaponEffects,
    stunEnabled: stunEffect.enabled !== false && (Boolean(stunEffect.chance) || inferredStun),
    stunChance: stunEffect.chance ?? (inferredStun ? 5 : 0),
    stunDuration: stunEffect.duration ?? (inferredStun ? 2 : 2),
    advanced: Object.fromEntries(Object.entries(item).filter(([key]) => ![
      "name", "rarity", "slot", "goldValue", "soundEffect", "lore", "graphic", "graphicSize", "graphicTint", "graphicChannels",
      "avatarSprite", "maleAvatarSprite", "femaleAvatarSprite", "dwarfMaleAvatarSprite", "dwarfFemaleAvatarSprite", "avatarSpriteMale", "avatarSpriteFemale", "avatarSpriteDwarfMale", "avatarSpriteDwarfFemale",
      "maleLeftWristAvatarSprite", "femaleLeftWristAvatarSprite", "maleRightWristAvatarSprite", "femaleRightWristAvatarSprite",
      "dwarfMaleLeftWristAvatarSprite", "dwarfFemaleLeftWristAvatarSprite", "dwarfMaleRightWristAvatarSprite", "dwarfFemaleRightWristAvatarSprite",
      "leftWristMaleAvatarSprite", "leftWristFemaleAvatarSprite", "leftWristDwarfMaleAvatarSprite", "leftWristDwarfFemaleAvatarSprite",
      "rightWristMaleAvatarSprite", "rightWristFemaleAvatarSprite", "rightWristDwarfMaleAvatarSprite", "rightWristDwarfFemaleAvatarSprite",
      "avatarSpriteTint", "avatarSpriteChannels", "resistances", "glow", "glowColor", "itemGlow", "itemGlowColor", "graphicGlow", "graphicGlowColor",
      "metalTint", "gemTint", "graphicMetalTint", "graphicGemTint", "maxStack", "stackable", "noDrop", "noSell", "stats",
      "shield",
      "realm", "hands", "dmgType", "dice", "speed", "range", "animation", "projectileSpeed", "projectileAnimation",
      "projectileSprite", "projectileSize", "projectileTint", "projectileGlow", "projectileGlowColor",
      "ammo", "category", "weaponTypes", "effects", "weapon"
    ].includes(key)))
  };
}

function fillItemForm() {
  const item = normalizeItem(selectedItem());
  $("#weaponFields").style.display = state.itemGroup === "weapons" ? "" : "none";
  itemForm.elements.name.value = item.name;
  itemForm.elements.rarity.value = item.rarity;
  itemForm.elements.slot.value = item.slot;
  itemForm.elements.goldValue.value = item.goldValue;
  itemForm.elements.soundEffect.value = item.soundEffect;
  itemForm.elements.lore.value = item.lore;
  itemForm.elements.graphic.value = item.graphic;
  itemForm.elements.graphicSize.value = item.graphicSize;
  itemForm.elements.graphicTint.value = normalizeHexColor(item.graphicTint) || "#68a85e";
  itemForm.elements.graphicTintText.value = item.graphicTint || "";
  itemForm.elements.graphicMetalTint.value = normalizeHexColor(item.graphicChannels.metal) || "#c8c9c2";
  itemForm.elements.graphicMetalTintText.value = item.graphicChannels.metal || "";
  itemForm.elements.graphicGemTint.value = normalizeHexColor(item.graphicChannels.gem) || "#68a85e";
  itemForm.elements.graphicGemTintText.value = item.graphicChannels.gem || "";
  itemForm.elements.glow.checked = item.glow;
  itemForm.elements.glowColor.value = normalizeHexColor(item.glowColor) || "#68a85e";
  itemForm.elements.glowColorText.value = item.glowColor || "";
  itemForm.elements.maleAvatarSprite.value = item.maleAvatarSprite || "";
  itemForm.elements.femaleAvatarSprite.value = item.femaleAvatarSprite || "";
  itemForm.elements.dwarfMaleAvatarSprite.value = item.dwarfMaleAvatarSprite || "";
  itemForm.elements.dwarfFemaleAvatarSprite.value = item.dwarfFemaleAvatarSprite || "";
  itemForm.elements.maleLeftWristAvatarSprite.value = item.maleLeftWristAvatarSprite || "";
  itemForm.elements.femaleLeftWristAvatarSprite.value = item.femaleLeftWristAvatarSprite || "";
  itemForm.elements.dwarfMaleLeftWristAvatarSprite.value = item.dwarfMaleLeftWristAvatarSprite || "";
  itemForm.elements.dwarfFemaleLeftWristAvatarSprite.value = item.dwarfFemaleLeftWristAvatarSprite || "";
  itemForm.elements.maleRightWristAvatarSprite.value = item.maleRightWristAvatarSprite || "";
  itemForm.elements.femaleRightWristAvatarSprite.value = item.femaleRightWristAvatarSprite || "";
  itemForm.elements.dwarfMaleRightWristAvatarSprite.value = item.dwarfMaleRightWristAvatarSprite || "";
  itemForm.elements.dwarfFemaleRightWristAvatarSprite.value = item.dwarfFemaleRightWristAvatarSprite || "";
  itemForm.elements.avatarSprite.value = item.avatarSprite || "";
  $("#wristAvatarSpriteFields").style.display = item.slot === "Wrist" ? "" : "none";
  itemForm.elements.avatarSpriteTint.value = normalizeHexColor(item.avatarSpriteTint) || "#68a85e";
  itemForm.elements.avatarSpriteTintText.value = item.avatarSpriteTint || "";
  itemForm.elements.avatarSpriteMetalTint.value = normalizeHexColor(item.avatarSpriteChannels.metal) || "#c8c9c2";
  itemForm.elements.avatarSpriteMetalTintText.value = item.avatarSpriteChannels.metal || "";
  itemForm.elements.avatarSpriteGemTint.value = normalizeHexColor(item.avatarSpriteChannels.gem) || "#68a85e";
  itemForm.elements.avatarSpriteGemTintText.value = item.avatarSpriteChannels.gem || "";
  itemForm.elements.maxStack.value = item.maxStack;
  itemForm.elements.stackable.checked = item.stackable;
  itemForm.elements.noDrop.checked = item.noDrop;
  itemForm.elements.noSell.checked = item.noSell;
  itemForm.elements.shield.checked = item.shield;
  for (const stat of STAT_KEYS) itemForm.elements[`stat_${stat}`].value = item.stats[stat];
  for (const realm of REALMS) itemForm.elements[`resist_${realm}`].value = item.resistances[realm];
  itemForm.elements.realm.value = item.realm;
  itemForm.elements.hands.value = item.hands;
  itemForm.elements.dmgType.value = item.dmgType;
  itemForm.elements.dice.value = item.dice;
  itemForm.elements.speed.value = item.speed;
  itemForm.elements.range.value = item.range;
  itemForm.elements.animation.value = item.animation;
  itemForm.elements.projectileSpeed.value = item.projectileSpeed;
  itemForm.elements.projectileAnimation.value = item.projectileAnimation;
  itemForm.elements.projectileSprite.value = item.projectileSprite;
  itemForm.elements.projectileSize.value = item.projectileSize;
  itemForm.elements.projectileTint.value = normalizeHexColor(item.projectileTint) || "#8db8ff";
  itemForm.elements.projectileTintText.value = item.projectileTint || "";
  itemForm.elements.projectileGlow.checked = item.projectileGlow;
  itemForm.elements.projectileGlowColor.value = normalizeHexColor(item.projectileGlowColor) || "#8db8ff";
  itemForm.elements.projectileGlowColorText.value = item.projectileGlowColor || "";
  itemForm.elements.ammo.value = item.ammo;
  itemForm.elements.category.value = item.category;
  for (const type of WEAPON_TYPES) {
    const input = itemForm.elements[`weaponType${type}`];
    if (input) input.checked = item.weaponTypes.includes(type);
  }
  itemForm.elements.weaponEffectStun.checked = item.stunEnabled;
  itemForm.elements.weaponStunChance.value = item.stunChance;
  itemForm.elements.weaponStunDuration.value = item.stunDuration;
  itemForm.elements.advancedJson.value = Object.keys(item.advanced).length ? JSON.stringify(item.advanced, null, 2) : "";
  renderItemGraphic();
  renderWeaponProjectilePreview();
  renderItemAvatarPreview();
}

function readItemForm() {
  const stats = {};
  for (const stat of STAT_KEYS) {
    const value = numberValue(itemForm.elements[`stat_${stat}`].value, 0);
    if (value) stats[stat] = value;
  }
  const resistances = {};
  for (const realm of REALMS) {
    const value = numberValue(itemForm.elements[`resist_${realm}`].value, 0);
    if (value) resistances[realm] = value;
  }
  const advancedText = itemForm.elements.advancedJson.value.trim();
  const advanced = advancedText ? JSON.parse(advancedText) : {};
  const item = {
    ...advanced,
    name: itemForm.elements.name.value.trim(),
    rarity: itemForm.elements.rarity.value,
    slot: itemForm.elements.slot.value.trim(),
    stats,
    lore: itemForm.elements.lore.value.trim(),
    graphic: itemForm.elements.graphic.value.trim(),
    graphicSize: numberValue(itemForm.elements.graphicSize.value, 30)
  };
  const graphicTint = normalizeHexColor(itemForm.elements.graphicTintText.value);
  if (graphicTint) item.graphicTint = graphicTint;
  else delete item.graphicTint;
  const graphicChannels = {
    metal: normalizeHexColor(itemForm.elements.graphicMetalTintText.value),
    gem: normalizeHexColor(itemForm.elements.graphicGemTintText.value)
  };
  if (graphicChannels.metal || graphicChannels.gem) {
    item.graphicChannels = Object.fromEntries(Object.entries(graphicChannels).filter(([, value]) => value));
  } else {
    delete item.graphicChannels;
  }
  if (Object.keys(resistances).length) item.resistances = resistances;
  else delete item.resistances;
  const glowColor = normalizeHexColor(itemForm.elements.glowColorText.value);
  if (itemForm.elements.glow.checked) {
    item.glow = true;
    item.glowColor = glowColor || "#68a85e";
  } else {
    delete item.glow;
    delete item.glowColor;
  }
  const maleAvatarSprite = itemForm.elements.maleAvatarSprite.value.trim();
  const femaleAvatarSprite = itemForm.elements.femaleAvatarSprite.value.trim();
  const dwarfMaleAvatarSprite = itemForm.elements.dwarfMaleAvatarSprite.value.trim();
  const dwarfFemaleAvatarSprite = itemForm.elements.dwarfFemaleAvatarSprite.value.trim();
  const maleLeftWristAvatarSprite = itemForm.elements.maleLeftWristAvatarSprite.value.trim();
  const femaleLeftWristAvatarSprite = itemForm.elements.femaleLeftWristAvatarSprite.value.trim();
  const dwarfMaleLeftWristAvatarSprite = itemForm.elements.dwarfMaleLeftWristAvatarSprite.value.trim();
  const dwarfFemaleLeftWristAvatarSprite = itemForm.elements.dwarfFemaleLeftWristAvatarSprite.value.trim();
  const maleRightWristAvatarSprite = itemForm.elements.maleRightWristAvatarSprite.value.trim();
  const femaleRightWristAvatarSprite = itemForm.elements.femaleRightWristAvatarSprite.value.trim();
  const dwarfMaleRightWristAvatarSprite = itemForm.elements.dwarfMaleRightWristAvatarSprite.value.trim();
  const dwarfFemaleRightWristAvatarSprite = itemForm.elements.dwarfFemaleRightWristAvatarSprite.value.trim();
  const avatarSprite = itemForm.elements.avatarSprite.value.trim();
  const avatarSpriteTint = normalizeHexColor(itemForm.elements.avatarSpriteTintText.value);
  const avatarSpriteChannels = {
    metal: normalizeHexColor(itemForm.elements.avatarSpriteMetalTintText.value),
    gem: normalizeHexColor(itemForm.elements.avatarSpriteGemTintText.value)
  };
  if (maleAvatarSprite) item.maleAvatarSprite = maleAvatarSprite;
  else delete item.maleAvatarSprite;
  if (femaleAvatarSprite) item.femaleAvatarSprite = femaleAvatarSprite;
  else delete item.femaleAvatarSprite;
  if (dwarfMaleAvatarSprite) item.dwarfMaleAvatarSprite = dwarfMaleAvatarSprite;
  else delete item.dwarfMaleAvatarSprite;
  if (dwarfFemaleAvatarSprite) item.dwarfFemaleAvatarSprite = dwarfFemaleAvatarSprite;
  else delete item.dwarfFemaleAvatarSprite;
  if (maleLeftWristAvatarSprite) item.maleLeftWristAvatarSprite = maleLeftWristAvatarSprite;
  else delete item.maleLeftWristAvatarSprite;
  if (femaleLeftWristAvatarSprite) item.femaleLeftWristAvatarSprite = femaleLeftWristAvatarSprite;
  else delete item.femaleLeftWristAvatarSprite;
  if (dwarfMaleLeftWristAvatarSprite) item.dwarfMaleLeftWristAvatarSprite = dwarfMaleLeftWristAvatarSprite;
  else delete item.dwarfMaleLeftWristAvatarSprite;
  if (dwarfFemaleLeftWristAvatarSprite) item.dwarfFemaleLeftWristAvatarSprite = dwarfFemaleLeftWristAvatarSprite;
  else delete item.dwarfFemaleLeftWristAvatarSprite;
  if (maleRightWristAvatarSprite) item.maleRightWristAvatarSprite = maleRightWristAvatarSprite;
  else delete item.maleRightWristAvatarSprite;
  if (femaleRightWristAvatarSprite) item.femaleRightWristAvatarSprite = femaleRightWristAvatarSprite;
  else delete item.femaleRightWristAvatarSprite;
  if (dwarfMaleRightWristAvatarSprite) item.dwarfMaleRightWristAvatarSprite = dwarfMaleRightWristAvatarSprite;
  else delete item.dwarfMaleRightWristAvatarSprite;
  if (dwarfFemaleRightWristAvatarSprite) item.dwarfFemaleRightWristAvatarSprite = dwarfFemaleRightWristAvatarSprite;
  else delete item.dwarfFemaleRightWristAvatarSprite;
  if (avatarSprite) item.avatarSprite = avatarSprite;
  else delete item.avatarSprite;
  if (avatarSpriteTint) item.avatarSpriteTint = avatarSpriteTint;
  else delete item.avatarSpriteTint;
  if (avatarSpriteChannels.metal || avatarSpriteChannels.gem) {
    item.avatarSpriteChannels = Object.fromEntries(Object.entries(avatarSpriteChannels).filter(([, value]) => value));
  } else {
    delete item.avatarSpriteChannels;
  }
  const goldValue = itemForm.elements.goldValue.value;
  const soundEffect = itemForm.elements.soundEffect.value.trim();
  const maxStack = itemForm.elements.maxStack.value;
  if (goldValue !== "") item.goldValue = numberValue(goldValue);
  if (soundEffect) item.soundEffect = soundEffect;
  if (maxStack !== "") item.maxStack = numberValue(maxStack);
  if (itemForm.elements.stackable.checked) item.stackable = true;
  if (itemForm.elements.noDrop.checked) item.noDrop = true;
  if (itemForm.elements.noSell.checked) item.noSell = true;
  if (itemForm.elements.shield.checked) item.shield = true;
  if (state.itemGroup === "bags") {
    item.slot = "Bag";
    item.bag = {
      ...(advanced.bag || {}),
      slots: Math.max(1, Math.floor(numberValue(advanced.bag?.slots, item.bag?.slots || 6)))
    };
    if (!Array.isArray(item.bagInventory)) item.bagInventory = [];
  }
  if (state.itemGroup === "weapons") {
    const weaponTypes = WEAPON_TYPES.filter(type => itemForm.elements[`weaponType${type}`]?.checked);
    const effects = { ...(advanced.effects || {}) };
    const stunChecked = itemForm.elements.weaponEffectStun.checked;
    const stunChance = numberValue(itemForm.elements.weaponStunChance.value, 5);
    const stunDuration = numberValue(itemForm.elements.weaponStunDuration.value, 2);
    if (stunChecked) {
      effects.stun = {
        ...(effects.stun || {}),
        enabled: true,
        chance: stunChance,
        duration: stunDuration
      };
    } else if (weaponTypes.includes("Blunt") || effects.stun) {
      effects.stun = {
        ...(effects.stun || {}),
        enabled: false,
        chance: stunChance,
        duration: stunDuration
      };
    } else {
      delete effects.stun;
    }
    Object.assign(item, {
      realm: itemForm.elements.realm.value,
      hands: itemForm.elements.hands.value,
      dmgType: itemForm.elements.dmgType.value,
      dice: itemForm.elements.dice.value.trim() || "1D4",
      speed: numberValue(itemForm.elements.speed.value, 100),
      range: numberValue(itemForm.elements.range.value, 1),
      animation: itemForm.elements.animation.value.trim() || "slash",
      projectileSpeed: itemForm.elements.projectileSpeed.value === "" ? undefined : numberValue(itemForm.elements.projectileSpeed.value),
      projectileAnimation: itemForm.elements.projectileAnimation.value.trim() || undefined,
      projectileSprite: itemForm.elements.projectileSprite.value.trim() || undefined,
      projectileSize: itemForm.elements.projectileSize.value === "" ? undefined : Math.max(0.1, numberValue(itemForm.elements.projectileSize.value, 1)),
      projectileTint: normalizeHexColor(itemForm.elements.projectileTintText.value) || undefined,
      projectileGlow: itemForm.elements.projectileGlow.checked || undefined,
      projectileGlowColor: itemForm.elements.projectileGlow.checked
        ? (normalizeHexColor(itemForm.elements.projectileGlowColorText.value) || "#8db8ff")
        : undefined,
      ammo: itemForm.elements.ammo.value.trim() || undefined,
      category: itemForm.elements.category.value.trim() || undefined,
      weaponTypes: weaponTypes.length ? weaponTypes : undefined,
      effects: Object.keys(effects).length ? effects : undefined,
      soundEffect: soundEffect || undefined
    });
  }
  return item;
}

function inferSpellIcon(name) {
  const slug = String(name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return state.assets.spellIcons.find(asset => asset.path.endsWith(`/${slug}.png`))?.path || "";
}

function readSpellForm() {
  const advancedText = spellForm.elements.advancedJson.value.trim();
  const spell = advancedText ? JSON.parse(advancedText) : spellFromVisibleFields({});
  if (!isPlainObject(spell)) throw new Error("Spell JSON must be an object.");
  const errors = validateSpellObject(spell);
  if (errors.length) throw new Error(errors.join(" "));
  return spell;
}

function spellFromVisibleFields(base = {}) {
  const spell = {
    ...base,
    name: spellForm.elements.name.value.trim(),
    realm: spellForm.elements.realm.value,
    cooldown: numberValue(spellForm.elements.cooldown.value, 0),
    range: numberValue(spellForm.elements.range.value, 0),
    lvl: numberValue(spellForm.elements.lvl.value, 1),
    text: spellForm.elements.text.value,
    icon: spellForm.elements.icon.value.trim(),
    soundEffect: spellForm.elements.soundEffect.value.trim(),
    manualTarget: spellForm.elements.manualTarget.checked,
    autocast: spellForm.elements.autocast.checked,
    passive: spellForm.elements.passive.checked,
    aura: spellForm.elements.aura.checked
  };
  for (const key of ["aoeRadius", "duration", "tick"]) {
    const value = spellForm.elements[key].value;
    if (value === "") delete spell[key];
    else spell[key] = numberValue(value, 0);
  }
  return spell;
}

function applySpellToVisibleFields(spell) {
  spellForm.elements.name.value = spell.name || "";
  spellForm.elements.realm.value = REALMS.includes(spell.realm) ? spell.realm : "Mortal";
  spellForm.elements.cooldown.value = spell.cooldown ?? 0;
  spellForm.elements.range.value = spell.range ?? 0;
  spellForm.elements.lvl.value = spell.lvl ?? 1;
  spellForm.elements.aoeRadius.value = spell.aoeRadius ?? "";
  spellForm.elements.duration.value = spell.duration ?? "";
  spellForm.elements.tick.value = spell.tick ?? "";
  spellForm.elements.text.value = spell.text || "";
  spellForm.elements.icon.value = spell.icon || "";
  spellForm.elements.soundEffect.value = spell.soundEffect || "";
  for (const key of SPELL_BOOLEAN_KEYS) spellForm.elements[key].checked = Boolean(spell[key]);
  renderSpellIcon();
}

function syncSpellJsonFromVisibleFields() {
  const text = spellForm.elements.advancedJson.value.trim();
  let base = {};
  if (text) {
    try {
      const parsed = JSON.parse(text);
      if (isPlainObject(parsed)) base = parsed;
    } catch {
      return;
    }
  }
  spellForm.elements.advancedJson.value = JSON.stringify(spellFromVisibleFields(base), null, 2);
}

function renderSpellIcon() {
  const path = spellForm.elements.icon.value.trim();
  $("#spellIconPreview").src = path ? `../${path.replace(/^\.\//, "")}` : "";
}

function renderItemGraphic() {
  const img = $("#itemGraphicPreview");
  const path = itemForm.elements.graphic.value.trim();
  const src = path ? `../${path.replace(/^\.\//, "")}` : "";
  const tints = itemPreviewTints();
  img.src = tintedItemPreviewSrc(src, tints) || src;
  const size = Math.min(96, Math.max(8, numberValue(itemForm.elements.graphicSize.value, 30)));
  img.style.width = `${size}px`;
  img.style.height = `${size}px`;
  const glowColor = normalizeHexColor(itemForm.elements.glowColorText.value) || "#68a85e";
  img.classList.toggle("item-preview-glow", Boolean(itemForm.elements.glow.checked));
  img.style.setProperty("--item-preview-glow", glowColor);
}

function renderWeaponProjectilePreview() {
  const img = $("#weaponProjectilePreview");
  if (!img) return;
  const path = itemForm.elements.projectileSprite.value.trim();
  const src = path ? `../${path.replace(/^\.\//, "")}` : "";
  const tint = normalizeHexColor(itemForm.elements.projectileTintText.value);
  img.src = tintedItemPreviewSrc(src, { base: tint }) || src;
  const glowColor = normalizeHexColor(itemForm.elements.projectileGlowColorText.value) || "#8db8ff";
  img.classList.toggle("item-preview-glow", Boolean(itemForm.elements.projectileGlow.checked));
  img.style.setProperty("--item-preview-glow", glowColor);
}

function renderItemAvatarPreview() {
  renderItemAvatarPreviewForGender("male");
  renderItemAvatarPreviewForGender("female");
  renderItemAvatarPreviewForGender("dwarfMale");
  renderItemAvatarPreviewForGender("dwarfFemale");
}

function renderItemAvatarPreviewForGender(gender) {
  const canvas = gender === "dwarfFemale"
    ? $("#itemDwarfFemaleAvatarPreview")
    : gender === "dwarfMale"
      ? $("#itemDwarfMaleAvatarPreview")
      : gender === "female"
        ? $("#itemFemaleAvatarPreview")
        : $("#itemMaleAvatarPreview");
  if (!canvas) return;
  const previewCtx = canvas.getContext("2d");
  previewCtx.clearRect(0, 0, canvas.width, canvas.height);
  previewCtx.imageSmoothingEnabled = false;
  const legacyPath = itemForm.elements.avatarSprite.value.trim();
  const wristSide = itemForm.elements.avatarPreviewWristSide.value;
  const basePath = gender === "dwarfFemale"
    ? AVATAR_BASE_SPRITES.dwarfFemale
    : gender === "dwarfMale"
      ? AVATAR_BASE_SPRITES.dwarfMale
      : gender === "female"
        ? AVATAR_BASE_SPRITES.soulreaperFemale
        : AVATAR_BASE_SPRITES.soulreaperMale;
  const baseSrc = `../${basePath.replace(/^\.\//, "")}`;
  const wristPath = wristSide === "left-wrist"
    ? (gender === "dwarfFemale"
      ? itemForm.elements.dwarfFemaleLeftWristAvatarSprite.value.trim()
      : gender === "dwarfMale"
        ? itemForm.elements.dwarfMaleLeftWristAvatarSprite.value.trim()
        : gender === "female" ? itemForm.elements.femaleLeftWristAvatarSprite.value.trim() : itemForm.elements.maleLeftWristAvatarSprite.value.trim())
    : wristSide === "right-wrist"
      ? (gender === "dwarfFemale"
        ? itemForm.elements.dwarfFemaleRightWristAvatarSprite.value.trim()
        : gender === "dwarfMale"
          ? itemForm.elements.dwarfMaleRightWristAvatarSprite.value.trim()
          : gender === "female" ? itemForm.elements.femaleRightWristAvatarSprite.value.trim() : itemForm.elements.maleRightWristAvatarSprite.value.trim())
      : "";
  const avatarPath = wristPath || (gender === "dwarfFemale"
    ? itemForm.elements.dwarfFemaleAvatarSprite.value.trim() || itemForm.elements.femaleAvatarSprite.value.trim()
    : gender === "dwarfMale"
      ? itemForm.elements.dwarfMaleAvatarSprite.value.trim() || itemForm.elements.maleAvatarSprite.value.trim()
      : gender === "female"
        ? itemForm.elements.femaleAvatarSprite.value.trim()
        : itemForm.elements.maleAvatarSprite.value.trim()) || legacyPath;
  const avatarSrc = avatarPath ? `../${avatarPath.replace(/^\.\//, "")}` : "";
  const baseImage = avatarPreviewImage(baseSrc);
  if (baseImage?.complete && baseImage.naturalWidth) {
    previewCtx.drawImage(baseImage, 0, 0, 128, 128);
  }
  const avatarImage = avatarPreviewImage(avatarSrc);
  const layerSrc = tintedItemPreviewSrc(avatarSrc, avatarPreviewTints());
  const layerImage = layerSrc && layerSrc !== avatarSrc ? avatarPreviewImage(layerSrc) : avatarImage;
  if (layerImage?.complete && layerImage.naturalWidth) {
    previewCtx.drawImage(layerImage, 0, 0, 128, 128);
  }
}

function itemPreviewImage(src) {
  if (!src) return null;
  if (!itemPreviewImages.has(src)) {
    const image = new Image();
    image.onload = () => {
      renderItemGraphic();
      renderItemAvatarPreview();
    };
    image.src = src;
    itemPreviewImages.set(src, image);
  }
  return itemPreviewImages.get(src);
}

function avatarPreviewImage(src) {
  if (!src) return null;
  if (!avatarPreviewImages.has(src)) {
    const image = new Image();
    image.onload = () => renderItemAvatarPreview();
    image.src = src;
    avatarPreviewImages.set(src, image);
  }
  return avatarPreviewImages.get(src);
}

function parseHexColor(value) {
  const color = normalizeHexColor(value);
  if (!color) return null;
  const number = Number.parseInt(color.slice(1), 16);
  return {
    r: (number >> 16) & 255,
    g: (number >> 8) & 255,
    b: number & 255
  };
}

function mixColor(a, b, t) {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t)
  };
}

function itemPreviewTints() {
  return {
    base: normalizeHexColor(itemForm.elements.graphicTintText.value),
    metal: normalizeHexColor(itemForm.elements.graphicMetalTintText.value),
    gem: normalizeHexColor(itemForm.elements.graphicGemTintText.value)
  };
}

function avatarPreviewTints() {
  return {
    base: normalizeHexColor(itemForm.elements.avatarSpriteTintText.value),
    metal: normalizeHexColor(itemForm.elements.avatarSpriteMetalTintText.value),
    gem: normalizeHexColor(itemForm.elements.avatarSpriteGemTintText.value)
  };
}

function shadeTintColor(color, lum) {
  const black = { r: 8, g: 8, b: 10 };
  const white = { r: 255, g: 252, b: 235 };
  if (lum < 0.34) return mixColor(black, color, lum / 0.34);
  if (lum > 0.74) return mixColor(color, white, (lum - 0.74) / 0.26);
  return mixColor(color, white, (lum - 0.34) * 0.18);
}

function tintedItemPreviewSrc(src, tints) {
  const hasTint = tints?.base || tints?.metal || tints?.gem;
  if (!src || !hasTint) return "";
  const key = `${src}|base:${tints.base || ""}|metal:${tints.metal || ""}|gem:${tints.gem || ""}`;
  if (tintedItemPreviewCache.has(key)) return tintedItemPreviewCache.get(key);
  const image = itemPreviewImage(src);
  if (!image?.complete || !image.naturalWidth) return "";
  const baseColor = parseHexColor(tints.base);
  const metalColor = parseHexColor(tints.metal);
  const gemColor = parseHexColor(tints.gem);
  if (!baseColor && !metalColor && !gemColor) return "";
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext("2d");
  context.imageSmoothingEnabled = false;
  context.drawImage(image, 0, 0);
  const data = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = data.data;
  for (let i = 0; i < pixels.length; i += 4) {
    if (!pixels[i + 3]) continue;
    const lum = (pixels[i] * 0.299 + pixels[i + 1] * 0.587 + pixels[i + 2] * 0.114) / 255;
    const maxChannel = Math.max(pixels[i], pixels[i + 1], pixels[i + 2]);
    const minChannel = Math.min(pixels[i], pixels[i + 1], pixels[i + 2]);
    const saturation = maxChannel - minChannel;
    const isGemChannel = pixels[i + 2] > pixels[i] + 38 && pixels[i + 1] > pixels[i] + 18;
    const isMetalChannel = saturation < 42 && lum > 0.16;
    let out = null;
    if (gemColor && isGemChannel) out = shadeTintColor(gemColor, lum);
    else if (metalColor && isMetalChannel) out = shadeTintColor(metalColor, lum);
    else if (baseColor) out = shadeTintColor(baseColor, lum);
    if (!out) continue;
    pixels[i] = out.r;
    pixels[i + 1] = out.g;
    pixels[i + 2] = out.b;
  }
  context.putImageData(data, 0, 0);
  const dataUrl = canvas.toDataURL("image/png");
  tintedItemPreviewCache.set(key, dataUrl);
  return dataUrl;
}

function normalizeHexColor(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  const match = text.match(/^#?([0-9a-f]{6})$/i);
  return match ? `#${match[1].toLowerCase()}` : "";
}

function syncItemTintInputs(source) {
  const pairs = [
    [itemForm.elements.graphicTint, itemForm.elements.graphicTintText],
    [itemForm.elements.graphicMetalTint, itemForm.elements.graphicMetalTintText],
    [itemForm.elements.graphicGemTint, itemForm.elements.graphicGemTintText],
    [itemForm.elements.glowColor, itemForm.elements.glowColorText],
    [itemForm.elements.avatarSpriteTint, itemForm.elements.avatarSpriteTintText],
    [itemForm.elements.avatarSpriteMetalTint, itemForm.elements.avatarSpriteMetalTintText],
    [itemForm.elements.avatarSpriteGemTint, itemForm.elements.avatarSpriteGemTintText],
    [itemForm.elements.projectileTint, itemForm.elements.projectileTintText],
    [itemForm.elements.projectileGlowColor, itemForm.elements.projectileGlowColorText]
  ];
  for (const [picker, text] of pairs) {
    if (source === picker) {
      text.value = picker.value;
      return;
    }
    if (source === text) {
      const color = normalizeHexColor(text.value);
      if (color) picker.value = color;
      return;
    }
  }
}

function syncEnchantmentColorInputs(source) {
  const pairs = [
    [enchantmentForm.elements.enchantmentMetalChannel, enchantmentForm.elements.enchantmentMetalChannelText],
    [enchantmentForm.elements.enchantmentGemChannel, enchantmentForm.elements.enchantmentGemChannelText],
    [enchantmentForm.elements.enchantmentRuneChannel, enchantmentForm.elements.enchantmentRuneChannelText]
  ];
  for (const [picker, text] of pairs) {
    if (source === picker) {
      text.value = picker.value;
      return;
    }
    if (source === text) {
      const color = normalizeHexColor(text.value);
      if (color) picker.value = color;
      return;
    }
  }
}

function normalizeQuest(quest = {}) {
  const rewardRealmXp = quest.rewardRealmXp || quest.realmXpRewards || {};
  return {
    id: quest.id || "",
    name: quest.name || "New Quest",
    description: quest.description || "",
    minimumLevel: quest.minimumLevel ?? quest.minLevel ?? quest.requiredLevel ?? "",
    minimumRealm: quest.minimumRealm || quest.requiredRealm || quest.realmRequirement?.realm || "",
    minimumRealmLevel: quest.minimumRealmLevel ?? quest.requiredRealmLevel ?? quest.realmRequirement?.level ?? "",
    rewardXp: quest.rewardXp ?? "",
    rewardGold: quest.rewardGold ?? "",
    rewardVirtue: quest.rewardVirtue ?? "",
    rewardItem: quest.rewardItem || "",
    rewardItems: Array.isArray(quest.rewardItems) ? quest.rewardItems : [],
    objectives: Array.isArray(quest.objectives) ? quest.objectives.map(normalizeQuestObjective) : [],
    rewardRealmXp: isPlainObject(rewardRealmXp) ? rewardRealmXp : {},
    rewardText: quest.rewardText || "",
    advanced: Object.fromEntries(Object.entries(quest).filter(([key]) => !QUEST_VISIBLE_KEYS.has(key)))
  };
}

function normalizeQuestObjective(objective = {}) {
  const type = QUEST_OBJECTIVE_TYPES.includes(objective.type) ? objective.type : "item";
  const normalized = {
    type,
    label: objective.label || objective.item || objective.enemy || objective.key || objective.flag || "Complete",
    required: Math.max(1, Math.floor(numberValue(objective.required ?? objective.count, 1)))
  };
  if (type === "item") normalized.item = objective.item || objective.name || allItemNames()[0] || "";
  if (type === "anyItems") normalized.items = Array.isArray(objective.items) ? objective.items.filter(Boolean) : [];
  if (type === "kill") normalized.enemy = objective.enemy || objective.name || allUnitNames()[0] || "";
  if (type === "phase") normalized.completePhase = objective.completePhase || objective.phase || "";
  if (type === "flag") normalized.flag = objective.flag || "";
  if (type === "custom") normalized.key = objective.key || "";
  return normalized;
}

function questObjectiveRow(objective = {}) {
  const normalized = normalizeQuestObjective(objective);
  const typeOptions = QUEST_OBJECTIVE_TYPES.map(type => `<option value="${type}" ${type === normalized.type ? "selected" : ""}>${type}</option>`).join("");
  const item = normalized.item || allItemNames()[0] || "";
  const anyItems = (normalized.items || []).join("\n");
  const enemy = normalized.enemy || allUnitNames()[0] || "";
  return `
    <div class="stack-row" data-quest-objective>
      <label><span>Type</span><select data-quest-objective-type>${typeOptions}</select></label>
      <label><span>Label</span><input data-quest-objective-label type="text" value="${escapeHtml(normalized.label)}"></label>
      <label><span>Required</span><input data-quest-objective-required type="number" min="1" step="1" value="${normalized.required}"></label>
      <label data-quest-objective-field="item" style="${normalized.type === "item" ? "" : "display:none"}"><span>Item</span><span class="select-with-preview"><span class="loot-item-preview" data-quest-objective-item-preview>${itemPreviewHtml(item)}</span><select data-quest-objective-item>${itemSelectOptions(item)}</select></span></label>
      <label data-quest-objective-field="anyItems" style="${normalized.type === "anyItems" ? "" : "display:none"}"><span>Any Items</span><textarea data-quest-objective-items rows="3" placeholder="Rusty Dagger&#10;Goblin Spear">${escapeHtml(anyItems)}</textarea></label>
      <label data-quest-objective-field="kill" style="${normalized.type === "kill" ? "" : "display:none"}"><span>Unit</span><select data-quest-objective-enemy>${optionHtml(allUnitNames(), enemy)}</select></label>
      <label data-quest-objective-field="phase" style="${normalized.type === "phase" ? "" : "display:none"}"><span>Complete Phase</span><input data-quest-objective-phase type="text" value="${escapeHtml(normalized.completePhase || "")}"></label>
      <label data-quest-objective-field="flag" style="${normalized.type === "flag" ? "" : "display:none"}"><span>Flag</span><input data-quest-objective-flag type="text" value="${escapeHtml(normalized.flag || "")}"></label>
      <label data-quest-objective-field="custom" style="${normalized.type === "custom" ? "" : "display:none"}"><span>Custom Key</span><input data-quest-objective-key type="text" value="${escapeHtml(normalized.key || "")}"></label>
      <button type="button" data-remove-quest-objective class="danger">Remove</button>
    </div>
  `;
}

function formatRealmXpRewards(rewards = {}) {
  return Object.entries(rewards)
    .filter(([realm, amount]) => REALMS.includes(realm) && Number(amount) > 0)
    .map(([realm, amount]) => `${realm}: ${Number(amount)}`)
    .join("\n");
}

function parseRealmXpRewards(text) {
  const rewards = {};
  for (const entry of text.split(/\r?\n|,/).map(line => line.trim()).filter(Boolean)) {
    const match = entry.match(/^([A-Za-z]+)\s*[:=]\s*(\d+(?:\.\d+)?)$/);
    if (!match) throw new Error(`Realm XP reward must look like "Sylvan: 25" (${entry}).`);
    const realm = REALMS.find(candidate => candidate.toLowerCase() === normalizeRealm(match[1]).toLowerCase());
    if (!realm || realm === "Mortal") throw new Error(`Realm XP reward realm must be Ethereal, Celestial, Infernal, Sylvan, or Umbral (${match[1]}).`);
    const amount = numberValue(match[2]);
    if (amount > 0) rewards[realm] = amount;
  }
  return rewards;
}

function fillQuestForm() {
  const quest = normalizeQuest(selectedQuest());
  questForm.elements.id.value = quest.id;
  questForm.elements.name.value = quest.name;
  questForm.elements.minimumLevel.value = quest.minimumLevel;
  questForm.elements.minimumRealm.value = quest.minimumRealm;
  questForm.elements.minimumRealmLevel.value = quest.minimumRealmLevel;
  questForm.elements.description.value = quest.description;
  questForm.elements.rewardXp.value = quest.rewardXp;
  questForm.elements.rewardGold.value = quest.rewardGold;
  questForm.elements.rewardVirtue.value = quest.rewardVirtue;
  questForm.elements.rewardItem.value = quest.rewardItem;
  questForm.elements.rewardItems.value = quest.rewardItems.join("\n");
  questForm.elements.rewardRealmXp.value = formatRealmXpRewards(quest.rewardRealmXp);
  questForm.elements.rewardText.value = quest.rewardText;
  $("#questObjectivesList").innerHTML = quest.objectives.length ? quest.objectives.map(questObjectiveRow).join("") : "";
  questForm.elements.advancedJson.value = Object.keys(quest.advanced).length ? JSON.stringify(quest.advanced, null, 2) : "";
}

function refreshQuestObjectiveRow(row) {
  const type = row.querySelector("[data-quest-objective-type]")?.value || "item";
  row.querySelectorAll("[data-quest-objective-field]").forEach(field => {
    field.style.display = field.dataset.questObjectiveField === type ? "" : "none";
  });
  const itemSelect = row.querySelector("[data-quest-objective-item]");
  const preview = row.querySelector("[data-quest-objective-item-preview]");
  if (itemSelect && preview) preview.innerHTML = itemPreviewHtml(itemSelect.value);
}

function readQuestObjectives() {
  return [...document.querySelectorAll("[data-quest-objective]")].map(row => {
    const type = row.querySelector("[data-quest-objective-type]")?.value || "item";
    const objective = {
      type,
      label: row.querySelector("[data-quest-objective-label]")?.value.trim() || "Complete",
      required: Math.max(1, Math.floor(numberValue(row.querySelector("[data-quest-objective-required]")?.value, 1)))
    };
    if (type === "item") objective.item = row.querySelector("[data-quest-objective-item]")?.value || "";
    if (type === "anyItems") {
      objective.items = (row.querySelector("[data-quest-objective-items]")?.value || "")
        .split(/\r?\n|,/)
        .map(name => name.trim())
        .filter(Boolean);
    }
    if (type === "kill") objective.enemy = row.querySelector("[data-quest-objective-enemy]")?.value || "";
    if (type === "phase") objective.completePhase = row.querySelector("[data-quest-objective-phase]")?.value.trim() || "";
    if (type === "flag") objective.flag = row.querySelector("[data-quest-objective-flag]")?.value.trim() || "";
    if (type === "custom") objective.key = row.querySelector("[data-quest-objective-key]")?.value.trim() || "";
    return objective;
  });
}

function validateQuestObjectives(quest, errors, where = "Quest") {
  const labels = new Set();
  const items = new Set(allItemNames());
  const units = new Set(allUnitNames());
  for (const [index, objective] of (quest.objectives || []).entries()) {
    const label = String(objective.label || "").trim();
    const prefix = `${where} objective ${index + 1}`;
    if (!QUEST_OBJECTIVE_TYPES.includes(objective.type)) errors.push(`${prefix} type is invalid.`);
    if (!label) errors.push(`${prefix} label is required.`);
    if (label && labels.has(label)) errors.push(`${prefix} label duplicates "${label}".`);
    if (label) labels.add(label);
    if (!Number.isFinite(Number(objective.required)) || Number(objective.required) < 1) errors.push(`${prefix} required count must be positive.`);
    if (objective.type === "item" && !items.has(objective.item)) errors.push(`${prefix} item is invalid.`);
    if (objective.type === "anyItems") {
      if (!Array.isArray(objective.items) || !objective.items.length) errors.push(`${prefix} must list at least one item.`);
      for (const itemName of objective.items || []) {
        if (!items.has(itemName)) errors.push(`${prefix} item "${itemName}" is invalid.`);
      }
    }
    if (objective.type === "kill" && !units.has(objective.enemy)) errors.push(`${prefix} unit is invalid.`);
    if (objective.type === "phase" && !String(objective.completePhase || "").trim()) errors.push(`${prefix} complete phase is required.`);
    if (objective.type === "flag" && !String(objective.flag || "").trim()) errors.push(`${prefix} flag is required.`);
    if (objective.type === "custom" && !String(objective.key || "").trim()) errors.push(`${prefix} custom key is required.`);
  }
}

function readQuestForm() {
  const advancedText = questForm.elements.advancedJson.value.trim();
  const advanced = advancedText ? JSON.parse(advancedText) : {};
  if (!isPlainObject(advanced)) throw new Error("Quest Advanced JSON must be an object.");
  const quest = {
    ...advanced,
    id: questForm.elements.id.value.trim(),
    name: questForm.elements.name.value.trim(),
    description: questForm.elements.description.value.trim()
  };
  const minimumLevel = questForm.elements.minimumLevel.value;
  if (minimumLevel !== "") quest.minimumLevel = Math.max(1, Math.floor(numberValue(minimumLevel)));
  else delete quest.minimumLevel;
  const minimumRealm = questForm.elements.minimumRealm.value;
  const minimumRealmLevel = questForm.elements.minimumRealmLevel.value;
  if (minimumRealm && minimumRealmLevel !== "") {
    quest.minimumRealm = minimumRealm;
    quest.minimumRealmLevel = Math.max(1, Math.floor(numberValue(minimumRealmLevel)));
  } else {
    delete quest.minimumRealm;
    delete quest.minimumRealmLevel;
  }
  for (const key of ["rewardXp", "rewardGold", "rewardVirtue"]) {
    const value = questForm.elements[key].value;
    if (value !== "") quest[key] = numberValue(value);
    else delete quest[key];
  }
  const rewardItem = questForm.elements.rewardItem.value.trim();
  const rewardRealmXp = parseRealmXpRewards(questForm.elements.rewardRealmXp.value.trim());
  const rewardItems = questForm.elements.rewardItems.value
    .split(/\r?\n|,/)
    .map(item => item.trim())
    .filter(Boolean);
  const rewardText = questForm.elements.rewardText.value.trim();
  const objectives = readQuestObjectives();
  if (rewardItem) quest.rewardItem = rewardItem;
  else delete quest.rewardItem;
  if (Object.keys(rewardRealmXp).length) quest.rewardRealmXp = rewardRealmXp;
  else delete quest.rewardRealmXp;
  if (rewardItems.length) quest.rewardItems = rewardItems;
  else delete quest.rewardItems;
  if (rewardText) quest.rewardText = rewardText;
  else delete quest.rewardText;
  if (objectives.length) quest.objectives = objectives;
  else delete quest.objectives;
  return quest;
}

function npcDialogueContextLabel(key) {
  return NPC_DIALOGUE_CONTEXT_LABELS[key] || String(key || "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase());
}

function normalizeNpcDialogueContexts(npc = {}) {
  const contexts = builtinNpcDialogueDefaults(npc);
  if (npc.dialogue) contexts.dialogue = String(npc.dialogue);
  const minimumText = npc.questMinimumLevelText || npc.minimumLevelDialogue || npc.questLevelRefusalText;
  if (minimumText) contexts.questMinimumLevelText = String(minimumText);
  if (npc.refusalText) contexts.refusalText = String(npc.refusalText);
  if (npc.factionNotAllyText) contexts.factionNotAllyText = String(npc.factionNotAllyText);
  if (npc.factionEnemyText) contexts.factionEnemyText = String(npc.factionEnemyText);
  if (isPlainObject(npc.dialogueContexts)) {
    for (const [key, value] of Object.entries(npc.dialogueContexts)) {
      if (!key || value === undefined || value === null) continue;
      contexts[key] = String(value);
    }
  }
  return contexts;
}

function builtinNpcDialogueDefaults(npc = {}) {
  const id = String(npc.id || "").toLowerCase();
  const name = String(npc.name || "").toLowerCase();
  const defaults = {};
  const match = (...needles) => needles.some(needle => id === needle || name === needle || id.includes(needle) || name.includes(needle.replaceAll("-", " ")));
  if (match("naturalist-walden")) {
    defaults.questOffer = "Imps are wreaking havoc on the ecosystem. Their Infernal magic is especially cruel to Sylvan creatures, who take extra damage from it. Get rid of 4 Imps, then return to me and tell me the woods can breathe easier.";
    defaults.questActive = "The Imps are still loose. You have dealt with {count}/4 of them. Keep them away from the old growth.";
    defaults.questComplete = "Four Imps gone. Good. The forest is resilient, but not invulnerable, especially when Infernal fire turns on Sylvan life. Take this as thanks.";
    defaults.questAfterComplete = "The woods breathe easier with fewer Imps setting every root and burrow aflame. Keep watch for smoke.";
    defaults.questGlowOffer = "The woods breathe easier with fewer Imps setting every root and burrow aflame. Now learn to reveal what threatens them. Take Faerie Fire and mark 3 hostile mobs.";
    defaults.questGlowActive = "Mark 3 hostile mobs with Faerie Fire, then return.";
    defaults.questGlowReady = "You marked them well. Faerie Fire does not merely shine; it tells the forest where weakness hides.";
    defaults.questLeashOffer = "Now learn the gentler bond. Take Tame Beast, befriend a Beast, and return while it still follows your call.";
    defaults.questLeashActive = "Tame any Beast and return while it is still with you.";
    defaults.questLeashReady = "A beast walked beside you by choice of magic and instinct. Remember the difference between companionship and command.";
    defaults.questThornsOffer = "Mercy does not mean softness. Take Thorn Shield. Let an enemy strike you, and let the living world answer through you.";
    defaults.questThornsActive = "Let Thorn Shield wound an enemy that strikes you. Do not seek harm, but do not waste it either.";
    defaults.questThornsReady = "You felt the lesson. The forest does not need to chase every axe; sometimes the wound comes to the thorn.";
    defaults.questDustOffer = "Some threats do not stand fully in the world. Faerie Dust can pull the strange and hidden back toward leaf and soil. Use it on an incorporeal enemy.";
    defaults.questDustActive = "Use Faerie Dust on an incorporeal enemy, then return to me.";
    defaults.questDustReady = "Good. Faerie Dust reminds even the half-present that the living world has claims on them.";
    defaults.questRootsOffer = "One last beginning remains. The forest is not only a place; it is an ally. Take Summon Treant, call one forth, and let it strike an enemy.";
    defaults.questRootsActive = "Summon a Treant and let it strike an enemy. The forest should not be ornamental.";
    defaults.questRootsReady = "You heard it answer, then. Root, bark, and old patience can walk when the woods decide movement is needed.";
  } else if (match("heretic-slayleigh")) {
    defaults.questOffer = "I'm looking for bones. Which is... a strange thing to say out loud, isn't it? Not strange, actually. Normal. People need bones. For crafts. Research. Very normal errands. Bring me a stack of 20 Bones and I'll pay you for them.";
    defaults.questActive = "Still looking for that stack of 20 bones. For ordinary bone-related purposes. Perfectly mundane.";
    defaults.questComplete = "Ah, excellent. A proper stack of bones. Here, take your payment, and let's both pretend this was a normal transaction.";
    defaults.questFollowupOffer = "Practitioners of the Umbral Arts often need Bones to cast certain spells. For example, a spell called Bone Ritual. Here, take the scroll. Use Bone Ritual once and return to me.";
    defaults.questFollowupActive = "Use Bone Ritual once, then return. Bring bones, obviously. The spell is not named metaphorically.";
    defaults.questAfterComplete = "Remember: every bone has a memory, and every memory has a use.";
  } else if (match("magister-maimon")) {
    defaults.trainerQuestOffer = "Ether is the essential substance of the Ethereal Realm. Without it, Ethereal magic would not exist. It is harvested from Elementals, and the real lessons can begin as soon as you bring me 4 Ether.";
    defaults.trainerQuestActive = "Bring me 4 Ether harvested from Elementals. Without Ether, Ethereal magic is only an idea without a body.";
    defaults.trainerQuestReady = "Four measures of Ether, properly harvested. Good. Now the real lessons can begin.";
    defaults.questFollowupOffer = "Ethereal practitioners are adept at managing a battlefield. Learn Pacify or Banish, then use either spell once in battle. Afterwards, return to me for further training.";
    defaults.questFollowupActive = "Learn Pacify or Banish and use one of them in battle. When you have done so, return to me.";
    defaults.trainerQuestAfterComplete = "Ether is not merely fuel. It is the breath of the Ethereal Realm. Remember that, and your magic will obey you more readily.";
  } else if (match("barbarianess-skjoldma")) {
    defaults.trainerQuestOffer = "Weapon mastery is not one lesson, but many. Bows reward clean shots, axes reward heavy hands, maces reward stunning blows, dual wielding rewards off-hand strikes, and daggers reward precision. FOCUS is your chance to land a Critical Hit. Take this Scroll of Dagger Mastery, learn it, equip a stabbing weapon, and return after you have landed a Critical Hit.";
    defaults.trainerQuestActive = "Use a stabbing weapon. A dagger, spear, anything with a proper thrust. Land a Critical Hit with it, then come back and tell me what you learned.";
    defaults.trainerQuestReady = "Good. You felt it, then. FOCUS is not luck; it is the eye finding a weak place. With Dagger Mastery, a stabbing weapon makes that eye keener, and a critical hit feeds your Mortal training.";
    defaults.questFollowupOffer = "Now we speak of shields. BLOCK is your chance to turn a hit aside before it bites. A proper shield makes that chance better, and Shield Mastery sharpens it further. Equip a shield, block an attack with it, then return to me.";
    defaults.questFollowupActive = "Equip a shield, let an enemy take a swing, and come back after you have blocked the blow.";
    defaults.trainerQuestAfterComplete = "Weapons choose their lessons. Bows teach patience, axes teach force, maces teach interruption, daggers teach precision, and shields teach survival.";
  } else if (match("lord-yantos")) {
    defaults.questOffer = "If you are interested in joining the Gandersguard, you will need to prove your mettle. The Goblins need to be reminded who is in control of the Ganderswoods. Bring me six Goblin Heads; that should be enough to prove your merit.";
    defaults.questActive = "Bring me six Goblin Heads. The Goblins need to be reminded who is in control of the Ganderswoods.";
    defaults.questComplete = "Six Goblin Heads. Grim work, but necessary. The Gandersguard has need of people with your resolve.";
    defaults.questAfterComplete = "You have proven your mettle. Wear the Gandersguard Sigil with the dignity it deserves.";
  } else if (match("lord-rauf")) {
    defaults.questOffer = "Gandersville postures as if it were the heart of these woods, but Yantos is a soft-handed lord fattened on borrowed peace. Fenhold has held back worse things than his little hamlet will ever understand. Guard Dorin has been a thorn in our side for too long. Kill him and bring me Dorin's Shield, and I will fast-track you into the Fenguard.";
    defaults.questActive = "Kill Guard Dorin and bring me Dorin's Shield. Do this, and I will fast-track you into the Fenguard.";
    defaults.questComplete = "Dorin's Shield. So the old thorn is finally pulled from Fenhold's side. You have spared me a long irritation, and I will not forget it.";
    defaults.questFollowupOffer = "You have done well enough to be useful. Now remind Gandersville who holds power in these woods. Kill the Gandersguard Footmen who patrol that hamlet and bring me four Gandersguard Insignias.";
    defaults.questFollowupActive = "Invade Gandersville and kill the Gandersguard Footmen who patrol the town. Bring me four Gandersguard Insignias as proof.";
    defaults.questFollowupComplete = "Four Gandersguard Insignias. Good. Yantos may dress his levy in bright colors, but their courage tears loose easily enough.";
    defaults.questFollowupAfterComplete = "Gandersville will remember this lesson. The Fenguard remembers its own.";
  } else if (match("juan-tabo")) {
    defaults.questOffer = "Within these woods there walks a milk-white stag, / A myth made flesh beneath the Ganders leaves. / I touch the Sylvan art with novice hands, / And yearn to learn what secret grace it bears. / If thou canst tame the creature, bring it here; / This hall shall witness wonder, and reward.";
    defaults.questActive = "Seek yet the glades where moonlit branches lean; / Then tame the stag and lead it to this hall.";
    defaults.questComplete = "O blessed sight, pale monarch of the green! / My Sylvan heart shall ponder what thou art.";
    defaults.questAfterComplete = "The white stag's song still stirs the leaves for me; / I thank thee, friend, for wonder brought to hall.";
  }
  return defaults;
}

function npcDialogueContextsFromForm() {
  const contexts = JSON.parse(npcForm.dataset.dialogueContexts || "{}");
  const selected = $("#npcDialogueContextSelect")?.value || state.npcDialogueContext || "dialogue";
  const text = $("#npcDialogueContextText")?.value ?? "";
  contexts[selected] = text;
  return contexts;
}

function setNpcDialogueContextsOnForm(contexts = {}, selected = state.npcDialogueContext || "dialogue") {
  const merged = { ...contexts };
  for (const context of NPC_DIALOGUE_CONTEXTS) {
    if (!(context.key in merged)) merged[context.key] = "";
  }
  const customKeys = Object.keys(merged)
    .filter(key => !NPC_DIALOGUE_BUILTIN_KEYS.has(key))
    .sort((a, b) => npcDialogueContextLabel(a).localeCompare(npcDialogueContextLabel(b)));
  const keys = [...NPC_DIALOGUE_CONTEXTS.map(context => context.key), ...customKeys];
  const active = keys.includes(selected) ? selected : "dialogue";
  npcForm.dataset.dialogueContexts = JSON.stringify(merged);
  state.npcDialogueContext = active;
  $("#npcDialogueContextSelect").innerHTML = keys.map(key => `<option value="${escapeHtml(key)}" ${key === active ? "selected" : ""}>${escapeHtml(npcDialogueContextLabel(key))}</option>`).join("");
  $("#npcDialogueContextText").value = merged[active] || "";
  $("#deleteNpcDialogueContextButton").disabled = NPC_DIALOGUE_BUILTIN_KEYS.has(active);
}

function commitNpcDialogueContextText() {
  if (!npcForm.dataset.dialogueContexts) return;
  setNpcDialogueContextsOnForm(npcDialogueContextsFromForm(), $("#npcDialogueContextSelect")?.value || state.npcDialogueContext);
}

function normalizeNpc(npc = {}) {
  const dialogueContexts = normalizeNpcDialogueContexts(npc);
  return {
    id: npc.id || uniqueId(npc.name || "new-npc", state.npcs.map(candidate => candidate.id)),
    name: npc.name || "New NPC",
    area: npc.area || state.areas[0]?.name || "The Ganderswood",
    alignment: npc.alignment || "Neutral",
    faction: factionId(npc.faction || ""),
    mustBeFactionAlly: Boolean(npc.mustBeFactionAlly || npc.requiresFactionAlly || npc.requireFactionAlly),
    radius: npc.radius ?? 16,
    label: npc.label || "",
    sprite: npc.sprite || "./assets/sprites/npcs/villager-male.png",
    trainer: Boolean(npc.trainer),
    trainerRealms: Array.isArray(npc.trainerRealms) ? npc.trainerRealms.filter(realm => REALMS.includes(realm)) : [],
    trainerMaxSpellLevel: Number.isFinite(Number(npc.trainerMaxSpellLevel)) && Number(npc.trainerMaxSpellLevel) > 0 ? Math.floor(Number(npc.trainerMaxSpellLevel)) : "",
    shopkeeper: Boolean(npc.shopkeeper),
    banker: Boolean(npc.banker),
    startsQuest: Boolean(npc.startsQuest || npc.questId),
    questId: npc.questId || "",
    dialogue: dialogueContexts.dialogue || "",
    questMinimumLevelText: dialogueContexts.questMinimumLevelText || "",
    refusalText: dialogueContexts.refusalText || DEFAULT_NPC_REFUSAL_TEXT,
    factionNotAllyText: dialogueContexts.factionNotAllyText || "",
    factionEnemyText: dialogueContexts.factionEnemyText || "",
    dialogueContexts,
    wandering: Boolean(npc.wandering),
    shop: {
      weapons: Array.isArray(npc.shop?.weapons) ? npc.shop.weapons : [],
      equipment: Array.isArray(npc.shop?.equipment) ? npc.shop.equipment : [],
      bags: Array.isArray(npc.shop?.bags) ? npc.shop.bags : [],
      consumables: Array.isArray(npc.shop?.consumables) ? npc.shop.consumables : [],
      scrolls: Array.isArray(npc.shop?.scrolls) ? npc.shop.scrolls : [],
      misc: Array.isArray(npc.shop?.misc) ? npc.shop.misc : []
    },
    advanced: Object.fromEntries(Object.entries(npc).filter(([key]) => !NPC_VISIBLE_KEYS.has(key)))
  };
}

function fillNpcForm() {
  const npc = normalizeNpc(selectedNpc());
  state.npcDialogueContext = "dialogue";
  npcForm.elements.area.innerHTML = optionHtml(state.areas.map(area => area.name), npc.area);
  npcForm.elements.questId.innerHTML = questOptions(npc.questId);
  npcForm.elements.faction.innerHTML = factionOptions(npc.faction);
  npcForm.elements.id.value = npc.id;
  npcForm.elements.name.value = npc.name;
  npcForm.elements.area.value = npc.area;
  npcForm.elements.alignment.value = npc.alignment;
  npcForm.elements.faction.value = npc.faction;
  npcForm.elements.radius.value = npc.radius;
  npcForm.elements.label.value = npc.label;
  npcForm.elements.sprite.value = npc.sprite;
  npcForm.elements.trainerMaxSpellLevel.value = npc.trainerMaxSpellLevel;
  REALMS.forEach(realm => {
    const input = npcForm.elements[`trainerRealm${realm}`];
    if (input) input.checked = npc.trainerRealms.includes(realm);
  });
  npcForm.elements.trainer.checked = npc.trainer;
  npcForm.elements.shopkeeper.checked = npc.shopkeeper;
  npcForm.elements.banker.checked = npc.banker;
  npcForm.elements.startsQuest.checked = npc.startsQuest;
  npcForm.elements.wandering.checked = npc.wandering;
  npcForm.elements.mustBeFactionAlly.checked = npc.mustBeFactionAlly;
  npcForm.elements.questId.disabled = !npc.startsQuest;
  setNpcDialogueContextsOnForm(npc.dialogueContexts, state.npcDialogueContext);
  npcForm.elements.advancedJson.value = Object.keys(npc.advanced).length ? JSON.stringify(npc.advanced, null, 2) : "";
  $("#npcShopPanel").style.display = npc.shopkeeper ? "" : "none";
  renderNpcShop(npc.shop);
  renderNpcSprite();
}

function readNpcForm() {
  commitNpcDialogueContextText();
  const advancedText = npcForm.elements.advancedJson.value.trim();
  const advanced = advancedText ? JSON.parse(advancedText) : {};
  if (!isPlainObject(advanced)) throw new Error("NPC Advanced JSON must be an object.");
  const npc = {
    ...advanced,
    id: npcForm.elements.id.value.trim(),
    name: npcForm.elements.name.value.trim(),
    area: npcForm.elements.area.value,
    alignment: npcForm.elements.alignment.value,
    radius: numberValue(npcForm.elements.radius.value, 16),
    sprite: npcForm.elements.sprite.value.trim()
  };
  const label = npcForm.elements.label.value.trim();
  const dialogueContexts = npcDialogueContextsFromForm();
  const dialogue = String(dialogueContexts.dialogue || "").trim();
  const questMinimumLevelText = String(dialogueContexts.questMinimumLevelText || "").trim();
  const refusalText = String(dialogueContexts.refusalText || "").trim();
  const factionNotAllyText = String(dialogueContexts.factionNotAllyText || "").trim();
  const factionEnemyText = String(dialogueContexts.factionEnemyText || "").trim();
  const customDialogueContexts = Object.fromEntries(Object.entries(dialogueContexts)
    .filter(([key, value]) => !NPC_DIALOGUE_EXACT_FIELD_KEYS.has(key) && String(value || "").trim())
    .map(([key, value]) => [key, String(value).trim()]));
  const trainerRealms = REALMS.filter(realm => npcForm.elements[`trainerRealm${realm}`]?.checked);
  const trainerMaxSpellLevel = numberValue(npcForm.elements.trainerMaxSpellLevel.value, 0);
  if (label) npc.label = label;
  if (trainerRealms.length) npc.trainerRealms = trainerRealms;
  if (trainerMaxSpellLevel > 0) npc.trainerMaxSpellLevel = Math.floor(trainerMaxSpellLevel);
  if (dialogue) npc.dialogue = dialogue;
  if (questMinimumLevelText) npc.questMinimumLevelText = questMinimumLevelText;
  if (refusalText && refusalText !== DEFAULT_NPC_REFUSAL_TEXT) npc.refusalText = refusalText;
  if (factionNotAllyText) npc.factionNotAllyText = factionNotAllyText;
  if (factionEnemyText) npc.factionEnemyText = factionEnemyText;
  if (Object.keys(customDialogueContexts).length) npc.dialogueContexts = customDialogueContexts;
  const npcFaction = factionId(npcForm.elements.faction.value);
  if (npcFaction) npc.faction = npcFaction;
  if (npcForm.elements.mustBeFactionAlly.checked) npc.mustBeFactionAlly = true;
  if (npcForm.elements.trainer.checked) npc.trainer = true;
  if (npcForm.elements.banker.checked) npc.banker = true;
  if (npcForm.elements.wandering.checked) npc.wandering = true;
  if (npcForm.elements.shopkeeper.checked) {
    npc.shopkeeper = true;
    npc.shop = readNpcShop();
  }
  if (npcForm.elements.startsQuest.checked) {
    npc.startsQuest = true;
    npc.questId = npcForm.elements.questId.value;
  }
  return npc;
}

function renderNpcSprite() {
  const path = npcForm.elements.sprite.value.trim();
  const src = path ? `../${path.replace(/^\.\//, "")}` : "";
  $("#npcSpritePreview").src = src;
}

function renderNpcShop(shop = {}) {
  const containers = {
    weapons: "#npcShopWeapons",
    equipment: "#npcShopEquipment",
    bags: "#npcShopBags",
    consumables: "#npcShopConsumables",
    scrolls: "#npcShopScrolls",
    misc: "#npcShopMisc"
  };
  for (const [group, selector] of Object.entries(containers)) {
    const entries = (shop[group] || []).filter(entry => typeof entry === "string" ? entry : entry?.name);
    $(selector).innerHTML = entries.map(entry => npcShopRow(group, entry)).join("");
  }
}

function npcShopContainerSelector(group) {
  return {
    weapons: "#npcShopWeapons",
    equipment: "#npcShopEquipment",
    bags: "#npcShopBags",
    consumables: "#npcShopConsumables",
    scrolls: "#npcShopScrolls",
    misc: "#npcShopMisc"
  }[group] || "";
}

function npcShopRow(group, entry = "") {
  const name = typeof entry === "string" ? entry : entry?.name || "";
  const quantity = typeof entry === "object" && entry?.quantity !== undefined ? Number(entry.quantity) || 1 : 1;
  const stackable = itemIsStackable(name);
  return `
    <div class="stack-row" data-npc-shop-row="${escapeHtml(group)}">
      <label><span>Item</span><select data-npc-shop-item>${optionHtml((state.items[group] || []).map(item => item.name).filter(Boolean).sort(), name)}</select></label>
      <label data-npc-shop-quantity-wrap style="${stackable ? "" : "display:none"}"><span>Qty</span><input data-npc-shop-quantity type="number" step="1" min="1" value="${quantity}"></label>
      <button type="button" data-remove-row>Delete</button>
    </div>
  `;
}

function syncNpcShopRowQuantity(row) {
  const name = row.querySelector("[data-npc-shop-item]")?.value || "";
  const wrap = row.querySelector("[data-npc-shop-quantity-wrap]");
  const input = row.querySelector("[data-npc-shop-quantity]");
  const stackable = itemIsStackable(name);
  if (wrap) wrap.style.display = stackable ? "" : "none";
  if (input && stackable && !Number(input.value)) input.value = "1";
}

function readNpcShop() {
  const shop = {};
  for (const group of ITEM_GROUP_KEYS) {
    const items = [...document.querySelectorAll(`[data-npc-shop-row="${group}"]`)]
      .map(row => {
        const name = row.querySelector("[data-npc-shop-item]").value;
        if (!name) return null;
        if (!itemIsStackable(name)) return name;
        return {
          name,
          quantity: Math.max(1, Math.floor(numberValue(row.querySelector("[data-npc-shop-quantity]")?.value, 1)))
        };
      })
      .filter(Boolean);
    if (items.length) shop[group] = items;
  }
  return shop;
}

function currentNpcShopItemNames(group) {
  return new Set([...document.querySelectorAll(`[data-npc-shop-row="${group}"]`)]
    .map(row => row.querySelector("[data-npc-shop-item]")?.value)
    .filter(Boolean));
}

function openNpcShopBulkPicker(group) {
  state.npcShopBulkGroup = group;
  $("#npcShopBulkTitle").textContent = `Add ${ITEM_GROUPS[group] || "Items"}`;
  $("#npcShopBulkSearch").value = "";
  renderNpcShopBulkPicker();
  $("#npcShopBulkDialog").showModal();
}

function renderNpcShopBulkPicker() {
  const group = state.npcShopBulkGroup;
  const query = $("#npcShopBulkSearch").value.trim().toLowerCase();
  const existing = currentNpcShopItemNames(group);
  const items = (state.items[group] || [])
    .filter(item => !query || [item.name, item.rarity, item.slot].join(" ").toLowerCase().includes(query))
    .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  $("#npcShopBulkList").innerHTML = items.length ? items.map(item => {
    const exists = existing.has(item.name);
    return `
      <label class="bulk-check-row ${exists ? "exists" : ""}">
        <input type="checkbox" data-npc-shop-bulk-item value="${escapeHtml(item.name)}" ${exists ? "checked disabled" : ""}>
        <strong>${escapeHtml(item.name)}</strong>
        <small>${escapeHtml([item.rarity, item.slot].filter(Boolean).join(" / ") || ITEM_GROUPS[group] || "")}</small>
      </label>
    `;
  }).join("") : `<div class="empty-state">No items found.</div>`;
}

function addSelectedNpcShopItems() {
  const group = state.npcShopBulkGroup;
  const selector = npcShopContainerSelector(group);
  if (!group || !selector) return;
  const selected = [...document.querySelectorAll("[data-npc-shop-bulk-item]:checked:not(:disabled)")]
    .map(input => input.value)
    .filter(Boolean);
  if (!selected.length) return;
  const container = $(selector);
  for (const name of selected) {
    container.insertAdjacentHTML("beforeend", npcShopRow(group, itemIsStackable(name) ? { name, quantity: 1 } : name));
  }
  $("#npcShopBulkDialog").close();
  state.dirty = true;
  validateCurrentForm();
  setStatus("Unsaved changes");
}

function unitLootSummary(unitName) {
  const directCount = normalizeLootTables(state.lootTables[unitName]).reduce((sum, table) => sum + (table.entries || []).length, 0);
  const inheritedCount = normalizeLootTables(state.inheritedLootTables[unitName]).reduce((sum, table) => sum + (table.entries || []).length, 0);
  return [
    directCount ? `${directCount} direct` : "",
    inheritedCount ? `${inheritedCount} inherited` : ""
  ].filter(Boolean).join(" / ") || "No loot";
}

function lootTableEntryCount(table) {
  return (table?.entries || []).length;
}

function lootImportButtonHtml(source, table, index) {
  const range = [table.minLvl ? `Min ${table.minLvl}` : "", table.maxLvl ? `Max ${table.maxLvl}` : ""].filter(Boolean).join(" / ") || "Any level";
  return `
    <button type="button" class="bulk-check-row" data-import-loot-kind="${escapeHtml(source.kind)}" data-import-loot-name="${escapeHtml(source.name)}" data-import-loot-index="${index}">
      <strong>${escapeHtml(source.label)}</strong>
      <small>${escapeHtml(`${range} - ${lootTableEntryCount(table)} item${lootTableEntryCount(table) === 1 ? "" : "s"}`)}</small>
    </button>
  `;
}

function openLootImportPicker() {
  const unit = selectedUnit();
  if (!unit) return;
  state.lootTables[unit.name] = readUnitLootFor(unit.name);
  $("#lootImportSearch").value = "";
  renderLootImportPicker();
  $("#lootImportDialog").showModal();
}

function renderLootImportPicker() {
  const currentName = selectedUnit()?.name || "";
  const query = $("#lootImportSearch").value.trim().toLowerCase();
  const rows = [];
  for (const name of allUnitNames().filter(name => name !== currentName)) {
    const tables = normalizeLootTables(state.lootTables[name]);
    const inheritedTables = normalizeLootTables(state.inheritedLootTables[name]);
    tables.forEach((table, index) => rows.push({
      haystack: `${name} ${unitLootSummary(name)} direct`,
      html: lootImportButtonHtml({ kind: "unit", name, label: `${name} - Table ${index + 1}` }, table, index)
    }));
    inheritedTables.forEach((table, index) => rows.push({
      haystack: `${name} ${table.source || "inherited"} inherited`,
      html: lootImportButtonHtml({ kind: "unitInherited", name, label: `${name} - ${table.source || "Inherited Table"}` }, table, index)
    }));
  }
  for (const tableSet of state.editorLootTables || []) {
    normalizeLootTables(tableSet).forEach((table, index) => rows.push({
      haystack: `${tableSet.name} standalone loot table`,
      html: lootImportButtonHtml({ kind: "editor", name: tableSet.name, label: `${tableSet.name} - Table ${index + 1}` }, table, index)
    }));
  }
  const filtered = rows.filter(row => !query || row.haystack.toLowerCase().includes(query));
  $("#lootImportList").innerHTML = filtered.length ? filtered.map(row => row.html).join("") : `<div class="empty-state">No loot tables found.</div>`;
}

function importLootTable(kind, sourceName, sourceIndex) {
  const unit = selectedUnit();
  if (!unit || !sourceName) return;
  const sourceTables = kind === "unitInherited"
    ? normalizeLootTables(state.inheritedLootTables[sourceName])
    : kind === "editor"
      ? normalizeLootTables((state.editorLootTables || []).find(table => table.name === sourceName))
      : normalizeLootTables(state.lootTables[sourceName]);
  const table = sourceTables[Number(sourceIndex)];
  if (!table) return;
  const tables = normalizeLootTables(readUnitLootFor(unit.name));
  tables.push(structuredClone(table));
  state.lootTables[unit.name] = { tables };
  $("#lootImportDialog").close();
  state.dirty = true;
  renderCurrentForm();
  setStatus(`Imported loot table from ${sourceName}`);
}

function currentLootTableItemNames(tableIndex, containerSelector = "#unitLootList") {
  const section = document.querySelector(`${containerSelector} [data-loot-table="${tableIndex}"]`);
  return new Set([...section?.querySelectorAll("[data-loot-row]") || []]
    .map(row => row.querySelector("[data-loot-name]")?.value)
    .filter(Boolean));
}

function openLootBulkPicker(tableIndex, containerSelector = "#unitLootList") {
  state.lootBulkTableIndex = Number(tableIndex);
  state.lootBulkContainerSelector = containerSelector;
  $("#lootBulkSearch").value = "";
  renderLootBulkPicker();
  $("#lootBulkDialog").showModal();
}

function renderLootBulkPicker() {
  const query = $("#lootBulkSearch").value.trim().toLowerCase();
  const existing = currentLootTableItemNames(state.lootBulkTableIndex, state.lootBulkContainerSelector);
  const items = ITEM_GROUP_KEYS.flatMap(group => (state.items[group] || []).map(item => ({ ...item, group })))
    .filter(item => !query || [item.name, item.rarity, item.slot, ITEM_GROUPS[item.group]].join(" ").toLowerCase().includes(query))
    .sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  $("#lootBulkList").innerHTML = items.length ? items.map(item => {
    const exists = existing.has(item.name);
    return `
      <label class="bulk-check-row ${exists ? "exists" : ""}">
        <input type="checkbox" data-loot-bulk-item value="${escapeHtml(item.name)}" ${exists ? "checked disabled" : ""}>
        <strong>${escapeHtml(item.name)}</strong>
        <small>${escapeHtml([ITEM_GROUPS[item.group], item.rarity, item.slot].filter(Boolean).join(" / "))}</small>
      </label>
    `;
  }).join("") : `<div class="empty-state">No items found.</div>`;
}

function addSelectedLootItems() {
  const unit = selectedUnit();
  const tableSet = selectedEditorLootTable();
  const section = document.querySelector(`${state.lootBulkContainerSelector || "#unitLootList"} [data-loot-table="${state.lootBulkTableIndex}"]`);
  const container = section?.querySelector(".stack-list");
  if (!container || (!unit && !tableSet)) return;
  const selected = [...document.querySelectorAll("[data-loot-bulk-item]:checked:not(:disabled)")]
    .map(input => input.value)
    .filter(Boolean);
  if (!selected.length) return;
  for (const name of selected) {
    container.insertAdjacentHTML("beforeend", lootEntryRow({ name, chance: 0.1 }));
  }
  if (state.lootBulkContainerSelector === "#editorLootTableList" && tableSet) tableSet.tables = normalizeLootTables(readLootTablesFrom("#editorLootTableList"));
  else if (unit) state.lootTables[unit.name] = readUnitLootFor(unit.name);
  $("#lootBulkDialog").close();
  state.dirty = true;
  validateCurrentForm();
  setStatus("Unsaved changes");
}

function writeCurrentFormToState() {
  if (state.tab === "units" && selectedUnit()) {
    const ref = selectedUnitRef();
    if (ref.virtual) return;
    const previousName = ref.unit.name;
    const unit = readUnitForm();
    state.lootTables[unit.name] = readUnitLootFor(unit.name);
    if (previousName && previousName !== unit.name) delete state.lootTables[previousName];
    state.unitGroups[ref.groupName].entries[ref.index] = unit;
    ref.unit = unit;
  }
  if (state.tab === "lootTables" && selectedEditorLootTable()) state.editorLootTables[state.lootTableIndex] = readLootTableForm();
  if (state.tab === "areas" && selectedArea()) state.areas[state.areaIndex] = readAreaForm();
  if (state.tab === "dungeons" && selectedDungeon()) state.dungeons[state.dungeonIndex] = readDungeonForm();
  if (state.tab === "spells" && selectedSpell()) state.spells[state.spellIndex] = readSpellForm();
  if (state.tab === "enchantments" && selectedEnchantment()) state.enchantments[state.enchantmentIndex] = readEnchantmentForm();
  if (state.tab === "crafting" && selectedCraftingRecipe()) currentCraftingRecipes()[state.craftingIndex] = readCraftingForm();
  if (state.tab === "factions" && selectedFaction()) {
    const previousId = selectedFaction().id;
    const faction = readFactionForm();
    state.factions[state.factionIndex] = faction;
    if (previousId && previousId !== faction.id) {
      for (const ref of state.unitRefs) if (ref.unit.faction === previousId) ref.unit.faction = faction.id;
      for (const other of state.factions) other.enemyFactionIds = (other.enemyFactionIds || []).map(id => id === previousId ? faction.id : id);
    }
    state.factions = normalizeFactions(state.factions);
    state.factionIndex = state.factions.findIndex(candidate => candidate.id === faction.id);
    if (state.factionIndex < 0) state.factionIndex = 0;
  }
  if (state.tab === "npcs" && selectedNpc()) state.npcs[state.npcIndex] = readNpcForm();
  if (state.tab === "quests" && selectedQuest()) state.quests[state.questIndex] = readQuestForm();
  if (state.tab === "items" && selectedItem()) {
    const previousName = state.itemOriginalNames[state.itemGroup]?.[state.itemIndex] || selectedItem().name;
    const item = readItemForm();
    if (previousName && item.name && previousName !== item.name) state.itemRenames[previousName] = item.name;
    state.items[state.itemGroup][state.itemIndex] = item;
  }
  if (state.tab === "assets") return;
  state.dirty = true;
}

function validateCurrentForm() {
  const errors = [];
  try {
    if (state.tab === "units") {
      const unit = readUnitForm();
      if (!unit.name) errors.push("Unit name is required.");
      if (!unit.weapon.name) errors.push("Weapon is required.");
    } else if (state.tab === "lootTables") {
      const table = readLootTableForm();
      if (!table.name) errors.push("Loot table name is required.");
      const duplicateIndex = state.editorLootTables.findIndex((candidate, index) => index !== state.lootTableIndex && candidate.name === table.name);
      if (table.name && duplicateIndex >= 0) errors.push(`Loot table name duplicates "${table.name}".`);
      validateJsonSafeValueInBrowser(table, "loot table", errors);
    } else if (state.tab === "areas") {
      const area = readAreaForm();
      if (!area.name) errors.push("Area name is required.");
    } else if (state.tab === "dungeons") {
      const dungeon = readDungeonForm();
      if (!dungeon.name) errors.push("Dungeon name is required.");
      if (!dungeon.id) errors.push("Dungeon ID is required.");
      const duplicateIndex = state.dungeons.findIndex((candidate, index) => index !== state.dungeonIndex && candidate.id === dungeon.id);
      if (dungeon.id && duplicateIndex >= 0) errors.push(`Dungeon ID duplicates "${dungeon.id}".`);
      validateJsonSafeValueInBrowser(dungeon, "dungeon", errors);
    } else if (state.tab === "assets") {
      validationPanel.innerHTML = `<div class="ok">Ready.</div>`;
      return true;
    } else if (state.tab === "factions") {
      const faction = readFactionForm();
      if (!faction.name) errors.push("Faction name is required.");
      if (!faction.id) errors.push("Faction ID is required.");
      const duplicateIndex = state.factions.findIndex((candidate, index) => index !== state.factionIndex && candidate.id === faction.id);
      if (faction.id && duplicateIndex >= 0) errors.push(`Faction ID duplicates "${faction.id}".`);
    } else if (state.tab === "quests") {
      const quest = readQuestForm();
      if (!quest.id) errors.push("Quest ID is required.");
      if (!quest.name) errors.push("Quest name is required.");
      const duplicateIndex = state.quests.findIndex((candidate, index) => index !== state.questIndex && candidate.id === quest.id);
      if (quest.id && duplicateIndex >= 0) errors.push(`Quest ID duplicates "${quest.id}".`);
      validateQuestObjectives(quest, errors);
      validateJsonSafeValueInBrowser(quest, "quest", errors);
    } else if (state.tab === "npcs") {
      const npc = readNpcForm();
      if (!npc.id) errors.push("NPC ID is required.");
      if (!npc.name) errors.push("NPC name is required.");
      if (!npc.area) errors.push("NPC area is required.");
      if (!NPC_ALIGNMENTS.includes(npc.alignment)) errors.push("NPC alignment is required.");
      const duplicateIndex = state.npcs.findIndex((candidate, index) => index !== state.npcIndex && candidate.id === npc.id);
      if (npc.id && duplicateIndex >= 0) errors.push(`NPC ID duplicates "${npc.id}".`);
      if (npc.startsQuest && !npc.questId) errors.push("Choose a quest or turn off Starts Quest.");
      validateJsonSafeValueInBrowser(npc, "npc", errors);
    } else if (state.tab === "crafting") {
      const recipe = readCraftingForm();
      if (!recipe.name) errors.push("Recipe name is required.");
      if (!recipe.output) errors.push("Output item is required.");
      if (!recipe.ingredients.length) errors.push("At least one ingredient is required.");
      validateJsonSafeValueInBrowser(recipe, "crafting recipe", errors);
    } else {
      if (state.tab === "items") {
        const item = readItemForm();
        if (!item.name) errors.push("Item name is required.");
        for (const [label, field] of [
          ["Graphic tint", itemForm.elements.graphicTintText],
          ["Metal tint", itemForm.elements.graphicMetalTintText],
          ["Gem tint", itemForm.elements.graphicGemTintText],
          ["Projectile tint", itemForm.elements.projectileTintText],
          ["Projectile glow color", itemForm.elements.projectileGlowColorText]
        ]) {
          const tintText = field.value.trim();
          if (tintText && !normalizeHexColor(tintText)) errors.push(`${label} must be a 6-digit hex color.`);
        }
        validationPanel.innerHTML = errors.length ? errors.map(error => `<div>${escapeHtml(error)}</div>`).join("") : `<div class="ok">Ready.</div>`;
        return errors.length === 0;
      }
      if (state.tab === "enchantments") {
        const enchantment = readEnchantmentForm();
        if (!enchantment.name) errors.push("Enchantment name is required.");
        if (!REALMS.includes(enchantment.realm)) errors.push("Enchantment realm is required.");
        for (const [label, field] of [
          ["Enchantment metal channel", enchantmentForm.elements.enchantmentMetalChannelText],
          ["Enchantment gem channel", enchantmentForm.elements.enchantmentGemChannelText],
          ["Enchantment rune channel", enchantmentForm.elements.enchantmentRuneChannelText]
        ]) {
          const tintText = field.value.trim();
          if (tintText && !normalizeHexColor(tintText)) errors.push(`${label} must be a 6-digit hex color.`);
        }
        validateJsonSafeValueInBrowser(enchantment, "enchantment", errors);
        validationPanel.innerHTML = errors.length ? errors.map(error => `<div>${escapeHtml(error)}</div>`).join("") : `<div class="ok">Ready.</div>`;
        return errors.length === 0;
      }
      const spell = readSpellForm();
      if (!spell.name) errors.push("Spell name is required.");
      errors.push(...validateSpellObject(spell));
    }
  } catch (error) {
    errors.push(error.message);
  }
  validationPanel.innerHTML = errors.length ? errors.map(error => `<div>${escapeHtml(error)}</div>`).join("") : `<div class="ok">Ready.</div>`;
  return errors.length === 0;
}

function validateJsonSafeValueInBrowser(value, where, errors) {
  if (value === null) return;
  if (["string", "number", "boolean"].includes(typeof value)) {
    if (typeof value === "number" && !Number.isFinite(value)) errors.push(`${where} must be a finite number.`);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) => validateJsonSafeValueInBrowser(entry, `${where}[${index}]`, errors));
    return;
  }
  if (typeof value === "object") {
    for (const [key, entry] of Object.entries(value)) {
      if (["__proto__", "prototype", "constructor"].includes(key)) errors.push(`${where}.${key} is not allowed.`);
      validateJsonSafeValueInBrowser(entry, `${where}.${key}`, errors);
    }
    return;
  }
  errors.push(`${where} must be JSON data, not ${typeof value}.`);
}

function renderCurrentForm() {
  selectFirstFilteredUnitIfNeeded();
  selectFirstFilteredNpcIfNeeded();
  selectFirstFilteredItemIfNeeded();
  renderTabs();
  renderGroupTabs();
  renderItemNameOptions();
  renderRecordList();
  if (state.tab === "units") fillUnitForm();
  if (state.tab === "lootTables") fillLootTableForm();
  if (state.tab === "areas") fillAreaForm();
  if (state.tab === "dungeons") fillDungeonForm();
  if (state.tab === "spells") fillSpellForm();
  if (state.tab === "enchantments") fillEnchantmentForm();
  if (state.tab === "crafting") fillCraftingForm();
  if (state.tab === "factions") fillFactionForm();
  if (state.tab === "npcs") fillNpcForm();
  if (state.tab === "items") fillItemForm();
  if (state.tab === "quests") fillQuestForm();
  if (state.tab === "assets") renderAssetsView();
  validateCurrentForm();
}

async function loadData() {
  setStatus("Loading...");
  const response = await fetch("/api/data");
  const data = await response.json();
  if (!response.ok || data.error) throw new Error(data.error || "Could not load data.");

  if (!data.unitGroups && data.groups) {
    throw new Error("This browser is connected to the older Dev Interface server. Open http://127.0.0.1:4322 instead, or restart the dev server so the expanded Units/Areas/Spells API is active.");
  }

  if (!data.unitGroups || !data.assets || !Array.isArray(data.areas) || !Array.isArray(data.dungeons) || !Array.isArray(data.spells) || !Array.isArray(data.enchantments) || !data.craftingRecipes || !Array.isArray(data.quests) || !Array.isArray(data.npcs) || !data.items || !data.lootTables) {
    throw new Error("The Dev Interface server returned incomplete data. Restart the updated dev server and reload this page.");
  }

  normalizeRealmData(data);
  const loadedFactions = normalizeFactions(data.factions || []);
  state.factions = loadedFactions.length ? loadedFactions : structuredClone(DEFAULT_FACTIONS);
  state.unitGroups = data.unitGroups;
  rebuildUnitRefs();
  applyDefaultFactionAssignments();
  state.areas = data.areas;
  state.dungeons = data.dungeons.map(normalizeDungeon);
  state.spells = data.spells;
  state.enchantments = data.enchantments;
  state.craftingRecipes = Object.fromEntries(CRAFTING_SKILLS.map(skill => [skill, Array.isArray(data.craftingRecipes?.[skill]) ? data.craftingRecipes[skill] : []]));
  state.quests = data.quests;
  state.npcs = data.npcs;
  state.items = normalizeItemGroups(data.items);
  state.itemOriginalNames = Object.fromEntries(Object.entries(state.items).map(([group, items]) => [
    group,
    (items || []).map(item => item.name)
  ]));
  state.itemRenames = {};
  state.lootTables = data.lootTables || {};
  state.editorLootTables = normalizeEditorLootTables(data.editorLootTables || []);
  state.inheritedLootTables = data.inheritedLootTables || {};
  state.assets = { all: [], unitSprites: [], featureSprites: [], groundTextures: [], spellIcons: [], audio: [], ...data.assets };
  state.unitIndex = 0;
  state.lootTableIndex = 0;
  state.areaIndex = 0;
  state.dungeonIndex = 0;
  state.dungeonSelectedUnitIndex = -1;
  state.spellIndex = 0;
  state.enchantmentIndex = 0;
  state.craftingSkill = "Tailoring";
  state.craftingIndex = 0;
  state.factionIndex = 0;
  state.questIndex = 0;
  state.npcIndex = 0;
  state.assetIndex = 0;
  state.dirty = false;
  renderItemNameOptions();
  $("#filePath").textContent = data.gameFile;
  renderCurrentForm();
  setStatus("Loaded", "ok");
}

async function saveData() {
  if (!validateCurrentForm()) return setStatus("Fix validation errors first.", "error");
  writeCurrentFormToState();
  const payload = {
    unitGroups: Object.fromEntries(Object.entries(state.unitGroups)
      .filter(([, group]) => !group.virtual)
      .map(([name, group]) => [name, group.entries])),
    areas: state.areas,
    dungeons: state.dungeons.map(normalizeDungeon),
    spells: state.spells,
    enchantments: state.enchantments,
    craftingRecipes: state.craftingRecipes,
    factions: normalizeFactions(state.factions),
    npcs: state.npcs,
    quests: state.quests,
    items: state.items,
    itemRenames: state.itemRenames,
    lootTables: state.lootTables,
    editorLootTables: state.editorLootTables
  };
  normalizeRealmData(payload);
  setStatus("Saving...");
  const response = await fetch("/api/save", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  });
  const result = await response.json();
  if (!response.ok || !result.ok) throw new Error(result.errors?.join(" ") || result.error || "Save failed.");
  state.itemOriginalNames = Object.fromEntries(Object.entries(state.items).map(([group, items]) => [
    group,
    (items || []).map(item => item.name)
  ]));
  state.itemRenames = {};
  state.dirty = false;
  setStatus(`Saved. Backup: ${result.backupPath}`, "ok");
}

function createRecord() {
  writeCurrentFormToState();
  if (state.tab === "units") {
    const groupName = state.unitGroups.monsterTemplates ? "monsterTemplates" : Object.keys(state.unitGroups)[0];
    const entries = state.unitGroups[groupName].entries;
    const unit = normalizeUnit({ name: uniqueName("New Unit", allUnitNames()) });
    entries.push(unit);
    rebuildUnitRefs();
    state.unitIndex = state.unitRefs.findIndex(ref => ref.unit === unit);
  } else if (state.tab === "lootTables") {
    state.editorLootTables.push({ name: uniqueName("New Loot Table", state.editorLootTables.map(table => table.name)), tables: [{ entries: [{ name: allItemNames()[0] || "", chance: 0.1 }] }] });
    state.lootTableIndex = state.editorLootTables.length - 1;
  } else if (state.tab === "areas") {
    state.areas.push({ name: uniqueName("New Area", state.areas.map(area => area.name)), levelRange: { min: 1, max: 1 }, spawnRate: "Normal", spawnAmount: "Normal", connectsTo: [], environment: { groundTexture: "", features: [] }, spawnTable: [] });
    state.areaIndex = state.areas.length - 1;
  } else if (state.tab === "dungeons") {
    state.dungeons.push(defaultDungeon());
    state.dungeonIndex = state.dungeons.length - 1;
    state.dungeonSelectedUnitIndex = -1;
  } else if (state.tab === "quests") {
    const name = uniqueName("New Quest", state.quests.map(quest => quest.name));
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    state.quests.push({ id: uniqueId(id, state.quests.map(quest => quest.id)), name, description: "", rewardXp: 0, new: true });
    state.questIndex = state.quests.length - 1;
  } else if (state.tab === "enchantments") {
    state.enchantments.push({ name: uniqueName("New Enchantment", state.enchantments.map(enchantment => enchantment.name)), realm: "Mortal", stats: {} });
    state.enchantmentIndex = state.enchantments.length - 1;
  } else if (state.tab === "crafting") {
    currentCraftingRecipes().push(defaultCraftingRecipe());
    state.craftingIndex = currentCraftingRecipes().length - 1;
  } else if (state.tab === "factions") {
    const name = uniqueName("New Faction", state.factions.map(faction => faction.name));
    state.factions.push(normalizeFaction({ id: uniqueId(name, state.factions.map(faction => faction.id)), name }));
    state.factionIndex = state.factions.length - 1;
  } else if (state.tab === "npcs") {
    const name = uniqueName("New NPC", state.npcs.map(npc => npc.name));
    state.npcs.push(normalizeNpc({ id: uniqueId(name, state.npcs.map(npc => npc.id)), name }));
    state.npcIndex = state.npcs.length - 1;
  } else {
    if (state.tab === "items") {
      const names = (state.items[state.itemGroup] || []).map(item => item.name);
      state.items[state.itemGroup].push(normalizeItem({ name: uniqueName("New Item", names) }));
      state.itemOriginalNames[state.itemGroup] ||= [];
      state.itemOriginalNames[state.itemGroup].push("");
      state.itemIndex = state.items[state.itemGroup].length - 1;
      state.dirty = true;
      renderCurrentForm();
      return;
    }
    state.spells.push({ name: uniqueName("New Spell", state.spells.map(spell => spell.name)), realm: "Mortal", lvl: 1, cooldown: 0, range: 0, text: "", icon: "" });
    state.spellIndex = state.spells.length - 1;
  }
  state.dirty = true;
  renderCurrentForm();
}

function duplicateRecord() {
  writeCurrentFormToState();
  if (state.tab === "units") {
    const ref = selectedUnitRef();
    if (!ref) return;
    const entries = state.unitGroups[ref.groupName].entries;
    const copy = structuredClone(ref.unit);
    copy.name = uniqueName(`${copy.name} Copy`, allUnitNames());
    entries.splice(ref.index + 1, 0, copy);
    rebuildUnitRefs();
    state.unitIndex = state.unitRefs.findIndex(candidate => candidate.unit === copy);
    state.dirty = true;
    renderCurrentForm();
    return;
  }
  const records = currentRecords();
  const copy = structuredClone(records[currentIndex()]);
  copy.name = uniqueName(`${copy.name} Copy`, records.map(record => record.name));
  if (state.tab === "quests") copy.id = uniqueId(`${copy.id || "quest"}-copy`, records.map(record => record.id));
  if (state.tab === "factions") copy.id = uniqueId(`${copy.id || "faction"}-copy`, records.map(record => record.id));
  if (state.tab === "npcs") copy.id = uniqueId(`${copy.id || "npc"}-copy`, records.map(record => record.id));
  if (state.tab === "dungeons") copy.id = uniqueId(`${copy.id || "dungeon"}-copy`, records.map(record => record.id));
  if (state.tab === "crafting") copy.name = uniqueName(`${copy.name || "Recipe"} Copy`, records.map(record => record.name));
  if (state.tab === "lootTables") copy.name = uniqueName(`${copy.name || "Loot Table"} Copy`, records.map(record => record.name));
  records.splice(currentIndex() + 1, 0, copy);
  if (state.tab === "items") state.itemOriginalNames[state.itemGroup].splice(currentIndex() + 1, 0, "");
  setCurrentIndex(currentIndex() + 1);
  state.dirty = true;
  renderCurrentForm();
}

function deleteRecord() {
  if (state.tab === "units") {
    const ref = selectedUnitRef();
    if (!ref) return;
    if (!confirm(`Delete ${ref.unit.name}?`)) return;
    state.unitGroups[ref.groupName].entries.splice(ref.index, 1);
    delete state.lootTables[ref.unit.name];
    rebuildUnitRefs();
    state.dirty = true;
    renderCurrentForm();
    return;
  }
  const records = currentRecords();
  if (!records.length) return;
  const record = records[currentIndex()];
  if (!confirm(`Delete ${record.name}?`)) return;
  records.splice(currentIndex(), 1);
  if (state.tab === "factions") {
    for (const ref of state.unitRefs) if (ref.unit.faction === record.id) delete ref.unit.faction;
    for (const faction of state.factions) faction.enemyFactionIds = (faction.enemyFactionIds || []).filter(id => id !== record.id);
  }
  if (state.tab === "items") state.itemOriginalNames[state.itemGroup].splice(currentIndex(), 1);
  setCurrentIndex(Math.max(0, Math.min(currentIndex(), records.length - 1)));
  state.dirty = true;
  renderCurrentForm();
}

function openAssetPicker(title, assets, onPick) {
  state.picker = { assets, onPick };
  $("#assetDialogTitle").textContent = title;
  $("#assetSearch").value = "";
  renderAssetGrid();
  $("#assetDialog").showModal();
}

function renderAssetGrid() {
  const query = $("#assetSearch").value.trim().toLowerCase();
  const assets = (state.picker?.assets || []).filter(asset => !query || asset.path.toLowerCase().includes(query));
  $("#assetGrid").innerHTML = assets.map(asset => `
    <button type="button" class="asset-choice" data-asset-path="${escapeHtml(asset.path)}">
      ${assetPreviewHtml(asset)}
      <small>${escapeHtml(asset.path.replace("./assets/", ""))}</small>
    </button>
  `).join("");
}

function assetUrl(asset) {
  return asset?.path ? `/${asset.path.replace(/^\.\//, "")}` : "";
}

function assetExtension(asset) {
  const source = asset?.extension || asset?.path || asset?.filename || "";
  const match = String(source).toLowerCase().match(/\.[a-z0-9]+$/);
  return match?.[0] || "";
}

function isImageAsset(asset) {
  return [".png", ".webp", ".jpg", ".jpeg", ".gif"].includes(assetExtension(asset));
}

function imageAssets() {
  return (state.assets.all || []).filter(isImageAsset);
}

function isAudioAsset(asset) {
  return [".wav", ".mp3", ".ogg"].includes(assetExtension(asset));
}

function assetExtensionLabel(asset) {
  return escapeHtml((assetExtension(asset) || "file").replace(".", "").toUpperCase());
}

function assetPreviewHtml(asset, variant = "thumb") {
  if (isImageAsset(asset)) return `<img src="${assetUrl(asset)}" alt="">`;
  if (isAudioAsset(asset) && variant === "detail") {
    return `
      <div class="asset-audio-preview">
        <div class="asset-file-icon">AUDIO</div>
        <audio controls preload="metadata" src="${assetUrl(asset)}" aria-label="${escapeHtml(asset.name || "Audio asset")}"></audio>
      </div>
    `;
  }
  return variant === "detail"
    ? `<div class="asset-file-icon">${assetExtensionLabel(asset)}</div>`
    : `<span>${assetExtensionLabel(asset)}</span>`;
}

function renderAssetsView() {
  const assets = currentAssets();
  state.assetIndex = Math.max(0, Math.min(state.assetIndex, assets.length - 1));
  const selected = selectedAsset();
  $("#assetDetails").innerHTML = selected ? `
    <div class="asset-detail-preview">
      ${assetPreviewHtml(selected, "detail")}
    </div>
    <dl>
      <div><dt>Name</dt><dd>${escapeHtml(selected.name)}</dd></div>
      <div><dt>Path</dt><dd>${escapeHtml(selected.path)}</dd></div>
      <div><dt>Folder</dt><dd>${escapeHtml(selected.folder)}</dd></div>
      <div><dt>Size</dt><dd>${escapeHtml(formatBytes(selected.size || 0))}</dd></div>
    </dl>
  ` : `<div class="empty-state">No assets found.</div>`;
  $("#assetManagerGrid").innerHTML = assets.map((asset, index) => `
    <button type="button" class="asset-manager-card ${index === state.assetIndex ? "active" : ""}" data-asset-index="${index}">
      <span class="asset-thumb">
        ${assetPreviewHtml(asset)}
      </span>
      <strong>${escapeHtml(asset.name)}</strong>
      <small>${escapeHtml(asset.path.replace("./assets/", ""))}</small>
    </button>
  `).join("");
}

function formatBytes(bytes) {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
    reader.onerror = () => reject(reader.error || new Error("Could not read file."));
    reader.readAsDataURL(file);
  });
}

async function uploadAsset() {
  const file = $("#assetUploadFile").files[0];
  if (!file) return setStatus("Choose an asset file first.", "error");
  setStatus("Uploading asset...");
  const response = await fetch("/api/assets/upload", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      folder: $("#assetUploadFolder").value,
      filename: file.name,
      contentBase64: await fileToBase64(file)
    })
  });
  const result = await response.json();
  if (!response.ok || !result.ok) throw new Error(result.error || "Upload failed.");
  $("#assetUploadFile").value = "";
  await loadData();
  state.tab = "assets";
  state.assetGroup = "all";
  state.assetIndex = Math.max(0, currentAssets().findIndex(asset => asset.path === result.asset.path));
  renderCurrentForm();
  setStatus(`Uploaded ${result.asset.path}`, "ok");
}

document.querySelectorAll("[data-tab]").forEach(button => button.addEventListener("click", () => {
  if (validateCurrentForm()) writeCurrentFormToState();
  state.tab = button.dataset.tab;
  searchInput.value = "";
  renderCurrentForm();
}));

for (const [id, key] of [
  ["#unitRealmFilter", "realm"],
  ["#unitTypeFilter", "type"],
  ["#unitAlignmentFilter", "alignment"],
  ["#unitFactionFilter", "faction"],
  ["#unitEliteFilter", "elite"]
]) {
  $(id).addEventListener("change", event => {
    if (validateCurrentForm()) writeCurrentFormToState();
    state.unitFilters[key] = event.target.value;
    renderCurrentForm();
  });
}

$("#factionUnitSearch")?.addEventListener("input", renderFactionUnitAssignList);
$("#factionUnitFilter")?.addEventListener("change", renderFactionUnitAssignList);
$("#assignSelectedFactionUnitsButton")?.addEventListener("click", () => {
  if (validateCurrentForm()) writeCurrentFormToState();
  applyFactionToSelectedUnits(selectedFaction()?.id || "");
});
$("#clearSelectedFactionUnitsButton")?.addEventListener("click", () => applyFactionToSelectedUnits(""));

$("#itemTabs").addEventListener("click", event => {
  const button = event.target.closest("[data-item-group]");
  if (!button) return;
  if (validateCurrentForm()) writeCurrentFormToState();
  state.itemGroup = button.dataset.itemGroup;
  state.itemIndex = 0;
  state.itemFilters = { rarity: "All", slot: "All" };
  renderCurrentForm();
});

$("#itemRarityFilter").addEventListener("change", event => {
  if (validateCurrentForm()) writeCurrentFormToState();
  state.itemFilters.rarity = event.target.value;
  state.itemIndex = 0;
  renderCurrentForm();
});

$("#itemSlotFilter").addEventListener("change", event => {
  if (validateCurrentForm()) writeCurrentFormToState();
  state.itemFilters.slot = event.target.value;
  state.itemIndex = 0;
  renderCurrentForm();
});

for (const [id, key] of [
  ["#npcAreaFilter", "area"],
  ["#npcAlignmentFilter", "alignment"]
]) {
  $(id).addEventListener("change", event => {
    if (validateCurrentForm()) writeCurrentFormToState();
    state.npcFilters[key] = event.target.value;
    renderCurrentForm();
  });
}

$("#assetTabs").addEventListener("click", event => {
  const button = event.target.closest("[data-asset-group]");
  if (!button) return;
  state.assetGroup = button.dataset.assetGroup;
  state.assetIndex = 0;
  renderCurrentForm();
});

recordList.addEventListener("click", event => {
  const button = event.target.closest("[data-index]");
  if (!button) return;
  if (validateCurrentForm()) writeCurrentFormToState();
  setCurrentIndex(Number(button.dataset.index));
  renderCurrentForm();
});

for (const form of [unitForm, lootTableForm, areaForm, dungeonForm, spellForm, enchantmentForm, craftingForm, factionForm, itemForm, questForm, npcForm]) {
  form.addEventListener("input", event => {
    state.dirty = true;
    if (form === unitForm) {
      if (event.target === unitForm.elements.aquatic && event.target.checked) unitForm.elements.amphibious.checked = false;
      if (event.target === unitForm.elements.amphibious && event.target.checked) unitForm.elements.aquatic.checked = false;
      renderUnitSprite();
    }
    if (form === npcForm) {
      renderNpcSprite();
      npcForm.elements.questId.disabled = !npcForm.elements.startsQuest.checked;
      $("#npcShopPanel").style.display = npcForm.elements.shopkeeper.checked ? "" : "none";
    }
    if (form === itemForm) {
      syncItemTintInputs(event.target);
      $("#wristAvatarSpriteFields").style.display = itemForm.elements.slot.value.trim() === "Wrist" ? "" : "none";
      renderItemGraphic();
      renderWeaponProjectilePreview();
      renderItemAvatarPreview();
    }
    if (form === enchantmentForm) {
      syncEnchantmentColorInputs(event.target);
    }
    if (form === craftingForm) {
      refreshCraftingItemPreview(event.target);
    }
    if (form === factionForm) {
      if (!event.target.matches("[data-faction-unit], [data-faction-enemy]")) {
        renderFactionUnitAssignList();
      }
    }
    if (form === dungeonForm) {
      if (["name", "id", "width", "height"].includes(event.target.name)) {
        state.dungeons[state.dungeonIndex] = readDungeonForm();
        renderRecordList();
        renderDungeonGrid();
        renderDungeonSelectedUnit();
      }
    }
    if (form === spellForm) {
      if (event.target === spellForm.elements.advancedJson) {
        try {
          const parsed = JSON.parse(spellForm.elements.advancedJson.value);
          if (isPlainObject(parsed)) applySpellToVisibleFields(parsed);
        } catch {
          // Validation panel reports malformed JSON while the user is typing.
        }
      } else {
        renderSpellIcon();
        syncSpellJsonFromVisibleFields();
      }
    }
    validateCurrentForm();
    setStatus("Unsaved changes");
  });
}

function refreshCraftingItemPreview(target) {
  if (target === craftingForm.elements.output) {
    $("#craftingOutputPreview").innerHTML = itemPreviewHtml(target.value);
  }
  if (target?.matches?.("[data-crafting-ingredient-item]")) {
    const row = target.closest("[data-crafting-ingredient]");
    const preview = row?.querySelector("[data-crafting-ingredient-preview]");
    if (preview) preview.innerHTML = itemPreviewHtml(target.value);
  }
}

function markQuestObjectivesDirty(target = null) {
  const row = target?.closest?.("[data-quest-objective]");
  if (row) refreshQuestObjectiveRow(row);
  state.dirty = true;
  validateCurrentForm();
  setStatus("Unsaved changes");
}

craftingForm.addEventListener("change", event => {
  refreshCraftingItemPreview(event.target);
  state.dirty = true;
  validateCurrentForm();
  setStatus("Unsaved changes");
});

$("#addQuestObjectiveButton")?.addEventListener("click", () => {
  $("#questObjectivesList").insertAdjacentHTML("beforeend", questObjectiveRow({ type: "item", item: allItemNames()[0] || "", required: 1 }));
  state.dirty = true;
  validateCurrentForm();
  setStatus("Unsaved changes");
});

$("#questObjectivesList")?.addEventListener("click", event => {
  const remove = event.target.closest("[data-remove-quest-objective]");
  if (!remove) return;
  remove.closest("[data-quest-objective]")?.remove();
  state.dirty = true;
  validateCurrentForm();
  setStatus("Unsaved changes");
});

$("#questObjectivesList")?.addEventListener("input", event => {
  markQuestObjectivesDirty(event.target);
});

$("#questObjectivesList")?.addEventListener("change", event => {
  markQuestObjectivesDirty(event.target);
});

$("#dungeonGrid").addEventListener("click", event => {
  const cell = event.target.closest("[data-dungeon-x]");
  if (!cell || !selectedDungeon()) return;
  state.dungeons[state.dungeonIndex] = readDungeonForm();
  const dungeon = state.dungeons[state.dungeonIndex];
  const x = Number(cell.dataset.dungeonX);
  const y = Number(cell.dataset.dungeonY);
  const tool = dungeonForm.elements.dungeonTool.value;
  const unitIndex = dungeonUnitIndexAt(dungeon, x, y);
  const npcIndex = dungeonNpcIndexAt(dungeon, x, y);
  const featureIndex = dungeonFeatureIndexAt(dungeon, x, y);
  if (tool === "select") {
    state.dungeonSelectedUnitIndex = unitIndex;
  } else if (tool === "paint") {
    const texture = state.dungeonSelectedTexture || $("#dungeonTextureSelect").value;
    const brush = state.dungeonSelectedBrush || $("#dungeonBrushSelect").value || "square";
    if (texture) setDungeonCellTexture(dungeon, x, y, texture, brush);
  } else if (tool === "water") {
    setDungeonCellWater(dungeon, x, y);
  } else if (tool === "lava") {
    setDungeonCellLava(dungeon, x, y);
  } else if (tool === "unit") {
    const name = state.dungeonSelectedUnit || $("#dungeonUnitSelect").value;
    if (name) {
      if (unitIndex >= 0) state.dungeonSelectedUnitIndex = unitIndex;
      else {
        dungeon.units.push({ name, x, y, level: 1, elite: false, boss: false });
        state.dungeonSelectedUnitIndex = dungeon.units.length - 1;
      }
    }
  } else if (tool === "npc") {
    const id = state.dungeonSelectedNpc || $("#dungeonNpcSelect").value;
    if (id) {
      dungeon.npcs ||= [];
      if (npcIndex >= 0) dungeon.npcs[npcIndex].id = id;
      else dungeon.npcs.push({ id, x, y });
    }
  } else if (tool === "feature") {
    const sprite = state.dungeonSelectedFeature || $("#dungeonFeatureSelect").value;
    if (sprite) {
      dungeon.features ||= [];
      const feature = { sprite, x, y, size: 96, obstacle: true };
      if (featureIndex >= 0) dungeon.features[featureIndex] = { ...dungeon.features[featureIndex], ...feature };
      else dungeon.features.push(feature);
    }
  } else if (tool === "entrance") {
    dungeon.entrance = { x, y };
  } else if (tool === "erase") {
    removeDungeonCellTexture(dungeon, x, y);
    removeDungeonCellWater(dungeon, x, y);
    removeDungeonCellLava(dungeon, x, y);
    if (unitIndex >= 0) {
      dungeon.units.splice(unitIndex, 1);
      state.dungeonSelectedUnitIndex = -1;
    }
    if (npcIndex >= 0) dungeon.npcs.splice(npcIndex, 1);
    if (featureIndex >= 0) dungeon.features.splice(featureIndex, 1);
  }
  state.dirty = tool !== "select" || state.dirty;
  renderDungeonGrid(dungeon);
  renderDungeonSelectedUnit(dungeon);
  validateCurrentForm();
  if (tool !== "select") setStatus("Unsaved changes");
});

$("#dungeonTextureSelect").addEventListener("change", event => {
  state.dungeonSelectedTexture = event.target.value;
  renderDungeonToolOptions(selectedDungeon() || { cells: [] });
});

$("#dungeonUnitSelect").addEventListener("change", event => {
  state.dungeonSelectedUnit = event.target.value;
  renderDungeonToolOptions(selectedDungeon() || { cells: [] });
});

$("#dungeonNpcSelect").addEventListener("change", event => {
  state.dungeonSelectedNpc = event.target.value;
  renderDungeonToolOptions(selectedDungeon() || { cells: [] });
});

$("#dungeonFeatureSelect").addEventListener("change", event => {
  state.dungeonSelectedFeature = event.target.value;
  renderDungeonToolOptions(selectedDungeon() || { cells: [] });
});

$("#dungeonBrushSelect").addEventListener("change", event => {
  state.dungeonSelectedBrush = DUNGEON_BRUSH_IDS.has(event.target.value) ? event.target.value : "square";
  renderDungeonToolOptions(selectedDungeon() || { cells: [] });
});

$("#dungeonWallTextureSelect").addEventListener("change", event => {
  const dungeon = selectedDungeon();
  if (dungeon) dungeon.wallTexture = event.target.value || DEFAULT_DUNGEON_WALL_TEXTURE;
  renderDungeonToolOptions(selectedDungeon() || { cells: [] });
});

document.addEventListener("click", event => {
  const toggle = event.target.closest("[data-preview-toggle]");
  const option = event.target.closest("[data-preview-value]");
  if (toggle) {
    const select = toggle.closest(".preview-select");
    document.querySelectorAll(".preview-select.open").forEach(openSelect => {
      if (openSelect !== select) openSelect.classList.remove("open");
    });
    select?.classList.toggle("open");
    return;
  }
  if (option) {
    const type = option.dataset.previewType;
    const value = option.dataset.previewValue || "";
    if (type === "texture") {
      state.dungeonSelectedTexture = value;
      $("#dungeonTextureSelect").value = value;
    } else if (type === "unit") {
      state.dungeonSelectedUnit = value;
      $("#dungeonUnitSelect").value = value;
    } else if (type === "feature") {
      state.dungeonSelectedFeature = value;
      $("#dungeonFeatureSelect").value = value;
    } else if (type === "wall-texture") {
      $("#dungeonWallTextureSelect").value = value;
      const dungeon = selectedDungeon();
      if (dungeon) dungeon.wallTexture = value;
    }
    renderDungeonToolOptions(selectedDungeon() || { cells: [] });
    return;
  }
  document.querySelectorAll(".preview-select.open").forEach(openSelect => openSelect.classList.remove("open"));
});

$("#dungeonSelectedUnitDetails").addEventListener("input", event => {
  const dungeon = selectedDungeon();
  const unit = dungeon?.units[state.dungeonSelectedUnitIndex];
  if (!unit) return;
  if (event.target.matches("[data-dungeon-unit-level]")) unit.level = Math.max(1, Math.floor(numberValue(event.target.value, 1)));
  if (event.target.matches("[data-dungeon-unit-elite]")) unit.elite = event.target.checked;
  if (event.target.matches("[data-dungeon-unit-boss]")) unit.boss = event.target.checked;
  state.dirty = true;
  renderDungeonGrid(dungeon);
  validateCurrentForm();
  setStatus("Unsaved changes");
});

$("#dungeonSelectedUnitDetails").addEventListener("click", event => {
  if (!event.target.closest("[data-delete-dungeon-unit]")) return;
  const dungeon = selectedDungeon();
  if (!dungeon?.units[state.dungeonSelectedUnitIndex]) return;
  dungeon.units.splice(state.dungeonSelectedUnitIndex, 1);
  state.dungeonSelectedUnitIndex = -1;
  state.dirty = true;
  renderDungeonGrid(dungeon);
  renderDungeonSelectedUnit(dungeon);
  validateCurrentForm();
  setStatus("Unsaved changes");
});

dungeonForm.addEventListener("click", event => {
  if (!event.target.closest("#dungeonSpawnList [data-remove-row]")) return;
  event.target.closest(".stack-row")?.remove();
  writeCurrentFormToState();
  state.dirty = true;
  renderCurrentForm();
});

$("#craftingSkillTabs")?.addEventListener("click", event => {
  const button = event.target.closest("[data-crafting-skill]");
  if (!button) return;
  if (validateCurrentForm()) writeCurrentFormToState();
  state.craftingSkill = button.dataset.craftingSkill;
  state.craftingIndex = 0;
  state.dirty = true;
  renderCurrentForm();
});

$("#addCraftingIngredientButton")?.addEventListener("click", () => {
  const list = $("#craftingIngredientsList");
  list.insertAdjacentHTML("beforeend", ingredientRow({ item: allItemNames()[0] || "", quantity: 1 }));
  list.querySelector("[data-crafting-ingredient]:last-child [data-crafting-ingredient-item]")?.focus();
  state.dirty = true;
  validateCurrentForm();
  setStatus("Unsaved changes");
});

$("#craftingIngredientsList")?.addEventListener("click", event => {
  const remove = event.target.closest("[data-remove-crafting-ingredient]");
  if (!remove) return;
  remove.closest("[data-crafting-ingredient]")?.remove();
  state.dirty = true;
  validateCurrentForm();
  setStatus("Unsaved changes");
});

searchInput.addEventListener("input", renderRecordList);
$("#newButton").addEventListener("click", createRecord);
$("#duplicateButton").addEventListener("click", duplicateRecord);
$("#deleteButton").addEventListener("click", deleteRecord);
$("#reloadButton").addEventListener("click", () => {
  if (!state.dirty || confirm("Reload and discard unsaved changes?")) loadData().catch(error => setStatus(error.message, "error"));
});
$("#saveButton").addEventListener("click", () => saveData().catch(error => setStatus(error.message, "error")));
$("#uploadAssetButton").addEventListener("click", () => uploadAsset().catch(error => setStatus(error.message, "error")));
$("#assetManagerGrid").addEventListener("click", event => {
  const button = event.target.closest("[data-asset-index]");
  if (!button) return;
  state.assetIndex = Number(button.dataset.assetIndex);
  renderCurrentForm();
});

$("#unitSpriteButton").addEventListener("click", () => openAssetPicker("Choose Unit Sprite", state.assets.unitSprites, path => {
  unitForm.elements.sprite.value = path;
  renderUnitSprite();
  state.dirty = true;
}));
$("#spellIconButton").addEventListener("click", () => openAssetPicker("Choose Spell Icon", state.assets.spellIcons, path => {
  spellForm.elements.icon.value = path;
  renderSpellIcon();
  syncSpellJsonFromVisibleFields();
  state.dirty = true;
}));
$("#spellSoundEffectButton").addEventListener("click", () => openAssetPicker("Choose Spell Sound", state.assets.audio || [], path => {
  spellForm.elements.soundEffect.value = path;
  syncSpellJsonFromVisibleFields();
  state.dirty = true;
  validateCurrentForm();
  setStatus("Unsaved changes");
}));
$("#itemGraphicButton").addEventListener("click", () => openAssetPicker("Choose Item Graphic", imageAssets(), path => {
  itemForm.elements.graphic.value = path;
  renderItemGraphic();
  state.dirty = true;
}));
$("#weaponProjectileSpriteButton").addEventListener("click", () => openAssetPicker("Choose Projectile Sprite", imageAssets(), path => {
  itemForm.elements.projectileSprite.value = path;
  renderWeaponProjectilePreview();
  state.dirty = true;
}));
function avatarSpriteFieldForGender(gender, wristSide = itemForm.elements.avatarPreviewWristSide.value) {
  if (wristSide === "left-wrist") {
    if (gender === "dwarfFemale") return itemForm.elements.dwarfFemaleLeftWristAvatarSprite;
    if (gender === "dwarfMale") return itemForm.elements.dwarfMaleLeftWristAvatarSprite;
    return gender === "female" ? itemForm.elements.femaleLeftWristAvatarSprite : itemForm.elements.maleLeftWristAvatarSprite;
  }
  if (wristSide === "right-wrist") {
    if (gender === "dwarfFemale") return itemForm.elements.dwarfFemaleRightWristAvatarSprite;
    if (gender === "dwarfMale") return itemForm.elements.dwarfMaleRightWristAvatarSprite;
    return gender === "female" ? itemForm.elements.femaleRightWristAvatarSprite : itemForm.elements.maleRightWristAvatarSprite;
  }
  if (gender === "dwarfFemale") return itemForm.elements.dwarfFemaleAvatarSprite;
  if (gender === "dwarfMale") return itemForm.elements.dwarfMaleAvatarSprite;
  return gender === "female" ? itemForm.elements.femaleAvatarSprite : itemForm.elements.maleAvatarSprite;
}
function chooseAvatarSpriteForGender(gender, wristSide = "") {
  const genderLabel = gender === "dwarfFemale" ? "Dwarf Female" : gender === "dwarfMale" ? "Dwarf Male" : gender === "female" ? "Female" : "Male";
  const label = `${genderLabel}${wristSide ? ` ${wristSide === "left-wrist" ? "Left Wrist" : "Right Wrist"}` : ""} Avatar Sprite`;
  openAssetPicker(`Choose ${label}`, imageAssets(), path => {
    avatarSpriteFieldForGender(gender, wristSide).value = path;
    renderItemAvatarPreview();
    state.dirty = true;
  });
}
$("#itemMaleAvatarSpriteButton").addEventListener("click", () => chooseAvatarSpriteForGender("male", ""));
$("#itemFemaleAvatarSpriteButton").addEventListener("click", () => chooseAvatarSpriteForGender("female", ""));
$("#itemDwarfMaleAvatarSpriteButton").addEventListener("click", () => chooseAvatarSpriteForGender("dwarfMale", ""));
$("#itemDwarfFemaleAvatarSpriteButton").addEventListener("click", () => chooseAvatarSpriteForGender("dwarfFemale", ""));
function wristAvatarSpriteField(side, gender = "male") {
  return avatarSpriteFieldForGender(gender, side);
}
$("#itemLeftWristAvatarSpriteButton").addEventListener("click", () => openAssetPicker("Choose Male Left Wrist Avatar Sprite", imageAssets(), path => {
  itemForm.elements.avatarPreviewWristSide.value = "left-wrist";
  wristAvatarSpriteField("left-wrist", "male").value = path;
  renderItemAvatarPreview();
  state.dirty = true;
}));
$("#itemRightWristAvatarSpriteButton").addEventListener("click", () => openAssetPicker("Choose Male Right Wrist Avatar Sprite", imageAssets(), path => {
  itemForm.elements.avatarPreviewWristSide.value = "right-wrist";
  wristAvatarSpriteField("right-wrist", "male").value = path;
  renderItemAvatarPreview();
  state.dirty = true;
}));
$("#itemDwarfLeftWristAvatarSpriteButton").addEventListener("click", () => openAssetPicker("Choose Dwarf Male Left Wrist Avatar Sprite", imageAssets(), path => {
  itemForm.elements.avatarPreviewWristSide.value = "left-wrist";
  wristAvatarSpriteField("left-wrist", "dwarfMale").value = path;
  renderItemAvatarPreview();
  state.dirty = true;
}));
$("#itemDwarfRightWristAvatarSpriteButton").addEventListener("click", () => openAssetPicker("Choose Dwarf Male Right Wrist Avatar Sprite", imageAssets(), path => {
  itemForm.elements.avatarPreviewWristSide.value = "right-wrist";
  wristAvatarSpriteField("right-wrist", "dwarfMale").value = path;
  renderItemAvatarPreview();
  state.dirty = true;
}));
$("#itemDwarfFemaleLeftWristAvatarSpriteButton").addEventListener("click", () => openAssetPicker("Choose Dwarf Female Left Wrist Avatar Sprite", imageAssets(), path => {
  itemForm.elements.avatarPreviewWristSide.value = "left-wrist";
  wristAvatarSpriteField("left-wrist", "dwarfFemale").value = path;
  renderItemAvatarPreview();
  state.dirty = true;
}));
$("#itemDwarfFemaleRightWristAvatarSpriteButton").addEventListener("click", () => openAssetPicker("Choose Dwarf Female Right Wrist Avatar Sprite", imageAssets(), path => {
  itemForm.elements.avatarPreviewWristSide.value = "right-wrist";
  wristAvatarSpriteField("right-wrist", "dwarfFemale").value = path;
  renderItemAvatarPreview();
  state.dirty = true;
}));
$("#itemSoundEffectButton").addEventListener("click", () => openAssetPicker("Choose Item Sound", state.assets.audio || [], path => {
  itemForm.elements.soundEffect.value = path;
  state.dirty = true;
  validateCurrentForm();
  setStatus("Unsaved changes");
}));
$("#npcSpriteButton").addEventListener("click", () => openAssetPicker("Choose NPC Sprite", state.assets.all.filter(asset => asset.path.includes("/sprites/npcs/")), path => {
  npcForm.elements.sprite.value = path;
  renderNpcSprite();
  state.dirty = true;
}));

$("#npcDialogueContextSelect").addEventListener("change", event => {
  const contexts = npcDialogueContextsFromForm();
  const selected = event.target.value || "dialogue";
  setNpcDialogueContextsOnForm(contexts, selected);
  state.dirty = true;
});

$("#npcDialogueContextText").addEventListener("input", () => {
  const selected = $("#npcDialogueContextSelect").value || "dialogue";
  const contexts = JSON.parse(npcForm.dataset.dialogueContexts || "{}");
  contexts[selected] = $("#npcDialogueContextText").value;
  npcForm.dataset.dialogueContexts = JSON.stringify(contexts);
});

$("#addNpcDialogueContextButton").addEventListener("click", () => {
  commitNpcDialogueContextText();
  const label = prompt("Dialogue context / trigger name:");
  if (!label) return;
  const key = label.trim()
    .replace(/[^A-Za-z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^[A-Z]/, char => char.toLowerCase());
  if (!key) return;
  const contexts = npcDialogueContextsFromForm();
  if (!(key in contexts)) contexts[key] = "";
  setNpcDialogueContextsOnForm(contexts, key);
  state.dirty = true;
});

$("#deleteNpcDialogueContextButton").addEventListener("click", () => {
  const selected = $("#npcDialogueContextSelect").value || "dialogue";
  if (NPC_DIALOGUE_LEGACY_KEYS.has(selected)) return;
  const contexts = npcDialogueContextsFromForm();
  delete contexts[selected];
  setNpcDialogueContextsOnForm(contexts, "dialogue");
  state.dirty = true;
});

$("#addSpawnButton").addEventListener("click", () => {
  writeCurrentFormToState();
  selectedArea().spawnTable.push({ name: allUnitNames()[0] || "", frequency: 10 });
  renderCurrentForm();
});
$("#addDungeonSpawnButton").addEventListener("click", () => {
  writeCurrentFormToState();
  const dungeon = selectedDungeon();
  if (!dungeon) return;
  dungeon.spawnTable ||= [];
  dungeon.spawnTable.push({ name: allUnitNames()[0] || "", frequency: 10 });
  state.dirty = true;
  renderCurrentForm();
});
$("#addUnitSpellButton").addEventListener("click", () => {
  const unit = selectedUnit();
  if (!unit) return;
  writeCurrentFormToState();
  const firstSpell = spellNames()[0] || "";
  if (!firstSpell) return;
  const template = spellTemplateByName(firstSpell);
  selectedUnit().spells ||= [];
  selectedUnit().spells.push({ name: firstSpell, realm: template.realm || "Mortal" });
  state.dirty = true;
  renderCurrentForm();
});
$("#addLootButton").addEventListener("click", () => {
  const unit = selectedUnit();
  if (!unit) return;
  state.lootTables[unit.name] = readUnitLootFor(unit.name);
  const tables = normalizeLootTables(state.lootTables[unit.name]);
  tables.push({ minLvl: "", maxLvl: "", entries: [{ name: allItemNames()[0] || "", chance: 0.1 }] });
  state.lootTables[unit.name] = { tables };
  state.dirty = true;
  renderCurrentForm();
});
$("#importLootButton").addEventListener("click", openLootImportPicker);
$("#addEditorLootTableButton").addEventListener("click", () => {
  const table = selectedEditorLootTable();
  if (!table) return;
  state.editorLootTables[state.lootTableIndex] = readLootTableForm();
  const tables = normalizeLootTables(state.editorLootTables[state.lootTableIndex]);
  tables.push({ minLvl: "", maxLvl: "", entries: [{ name: allItemNames()[0] || "", chance: 0.1 }] });
  state.editorLootTables[state.lootTableIndex].tables = tables;
  state.dirty = true;
  renderCurrentForm();
});
unitForm.addEventListener("click", event => {
  const addLootEntryButton = event.target.closest("[data-add-loot-entry]");
  if (addLootEntryButton) {
    addLootEntryButton.closest("[data-loot-table]")?.querySelector(".stack-list")?.insertAdjacentHTML("beforeend", lootEntryRow({ name: allItemNames()[0] || "", chance: 0.1 }));
    state.dirty = true;
    validateCurrentForm();
    setStatus("Unsaved changes");
    return;
  }
  const addLootManyButton = event.target.closest("[data-add-loot-many]");
  if (addLootManyButton) {
    const table = addLootManyButton.closest("[data-loot-table]");
    if (table) openLootBulkPicker(table.dataset.lootTable);
    return;
  }
  if (event.target.closest("[data-remove-loot-table]")) {
    event.target.closest("[data-loot-table]")?.remove();
    const unit = selectedUnit();
    if (unit) state.lootTables[unit.name] = readUnitLootFor(unit.name);
    state.dirty = true;
    renderCurrentForm();
    return;
  }
  if (event.target.closest("[data-remove-row]")) {
    const row = event.target.closest(".stack-row");
    const isSpellRow = Boolean(row?.matches("[data-unit-spell-row]"));
    const isLootRow = Boolean(row?.matches("[data-loot-row]"));
    row.remove();
    const unit = selectedUnit();
    if (unit && isSpellRow) unit.spells = readUnitSpells();
    if (unit && isLootRow) state.lootTables[unit.name] = readUnitLootFor(unit.name);
    state.dirty = true;
    renderCurrentForm();
  }
});
lootTableForm.addEventListener("click", event => {
  const addLootEntryButton = event.target.closest("[data-add-loot-entry]");
  if (addLootEntryButton) {
    addLootEntryButton.closest("[data-loot-table]")?.querySelector(".stack-list")?.insertAdjacentHTML("beforeend", lootEntryRow({ name: allItemNames()[0] || "", chance: 0.1 }));
    state.dirty = true;
    validateCurrentForm();
    setStatus("Unsaved changes");
    return;
  }
  const addLootManyButton = event.target.closest("[data-add-loot-many]");
  if (addLootManyButton) {
    const table = addLootManyButton.closest("[data-loot-table]");
    if (table) openLootBulkPicker(table.dataset.lootTable, "#editorLootTableList");
    return;
  }
  if (event.target.closest("[data-remove-loot-table]")) {
    event.target.closest("[data-loot-table]")?.remove();
    const table = selectedEditorLootTable();
    if (table) table.tables = normalizeLootTables(readLootTablesFrom("#editorLootTableList"));
    state.dirty = true;
    renderCurrentForm();
    return;
  }
  if (event.target.closest("[data-remove-row]")) {
    event.target.closest(".stack-row")?.remove();
    const table = selectedEditorLootTable();
    if (table) table.tables = normalizeLootTables(readLootTablesFrom("#editorLootTableList"));
    state.dirty = true;
    renderCurrentForm();
  }
});
areaForm.addEventListener("click", event => {
  if (event.target.closest("[data-remove-row]")) {
    event.target.closest(".stack-row").remove();
    writeCurrentFormToState();
    renderCurrentForm();
  }
});

npcForm.addEventListener("click", event => {
  const bulkButton = event.target.closest("[data-bulk-add-npc-shop]");
  if (bulkButton) {
    openNpcShopBulkPicker(bulkButton.dataset.bulkAddNpcShop);
    return;
  }
  const addButton = event.target.closest("[data-add-npc-shop]");
  if (addButton) {
    const group = addButton.dataset.addNpcShop;
    const first = (state.items[group] || [])[0]?.name || "";
    if (!first) return;
    const selector = npcShopContainerSelector(group);
    $(selector).insertAdjacentHTML("beforeend", npcShopRow(group, first));
    state.dirty = true;
    validateCurrentForm();
    setStatus("Unsaved changes");
    return;
  }
  if (event.target.closest("[data-remove-row]")) {
    event.target.closest(".stack-row")?.remove();
    state.dirty = true;
    validateCurrentForm();
    setStatus("Unsaved changes");
  }
});

npcForm.addEventListener("change", event => {
  const row = event.target.closest("[data-npc-shop-row]");
  if (!row) return;
  syncNpcShopRowQuantity(row);
  state.dirty = true;
  validateCurrentForm();
  setStatus("Unsaved changes");
});

unitForm.addEventListener("change", event => {
  const row = event.target.closest("[data-loot-row]");
  if (!row) return;
  syncLootPreview(row);
  state.dirty = true;
  validateCurrentForm();
  setStatus("Unsaved changes");
});
lootTableForm.addEventListener("change", event => {
  const row = event.target.closest("[data-loot-row]");
  if (row) syncLootPreview(row);
  state.dirty = true;
  validateCurrentForm();
  setStatus("Unsaved changes");
});

$("#closeAssetDialog").addEventListener("click", () => $("#assetDialog").close());
$("#assetSearch").addEventListener("input", renderAssetGrid);
$("#assetGrid").addEventListener("click", event => {
  const button = event.target.closest("[data-asset-path]");
  if (!button) return;
  state.picker?.onPick(button.dataset.assetPath);
  $("#assetDialog").close();
  validateCurrentForm();
  setStatus("Unsaved changes");
});
$("#closeNpcShopBulkDialog").addEventListener("click", () => $("#npcShopBulkDialog").close());
$("#npcShopBulkSearch").addEventListener("input", renderNpcShopBulkPicker);
$("#addNpcShopBulkSelected").addEventListener("click", addSelectedNpcShopItems);
$("#closeLootImportDialog").addEventListener("click", () => $("#lootImportDialog").close());
$("#lootImportSearch").addEventListener("input", renderLootImportPicker);
$("#lootImportList").addEventListener("click", event => {
  const button = event.target.closest("[data-import-loot-kind]");
  if (!button) return;
  importLootTable(button.dataset.importLootKind, button.dataset.importLootName, button.dataset.importLootIndex);
});
$("#closeLootBulkDialog").addEventListener("click", () => $("#lootBulkDialog").close());
$("#lootBulkSearch").addEventListener("input", renderLootBulkPicker);
$("#addLootBulkSelected").addEventListener("click", addSelectedLootItems);

window.addEventListener("beforeunload", event => {
  if (!state.dirty) return;
  event.preventDefault();
  event.returnValue = "";
});

buildStaticInputs();
loadData().catch(error => setStatus(error.message, "error"));
