const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");

function loadBrowserData(relativePath) {
  const source = fs.readFileSync(path.join(root, relativePath), "utf8");
  const context = {
    window: {},
    console,
    structuredClone: value => JSON.parse(JSON.stringify(value))
  };
  context.window.window = context.window;
  vm.createContext(context);
  vm.runInContext(source, context, { filename: relativePath });
  return context.window;
}

function normalizedAssetPath(assetPath) {
  const text = String(assetPath || "").trim();
  if (!text) return "";
  if (text.startsWith("./")) return text.slice(2);
  if (text.startsWith("/")) return text.slice(1);
  return text;
}

const world = loadBrowserData("data/world.js").SoulreaperWorldData;
const npcSprites = loadBrowserData("data/npc-sprites.js").SoulreaperNpcSprites?.sprites || {};
const questUiSource = fs.readFileSync(path.join(root, "quest-ui.js"), "utf8");
const builtInQuestIds = new Set([...questUiSource.matchAll(/"([a-z0-9-]+)":\s*[a-zA-Z0-9_]+Quest/g)].map(match => match[1]));
const configuredQuestIds = new Set(Object.keys(world.devQuestConfigs || {}));
const questIds = new Set([...builtInQuestIds, ...configuredQuestIds]);
const spritePaths = new Set(Object.values(npcSprites).map(sprite => normalizedAssetPath(sprite.src)));
const knownCustomQuestNpcs = new Map([
  ["lord-yantos", ["joining-the-gandersguard"]],
  ["lord-rauf", ["joining-the-fenguard", "gandersville-raid"]]
]);

const errors = [];
for (const [id, requiredQuestIds] of knownCustomQuestNpcs) {
  const npc = (world.devNpcConfigs || []).find(candidate => candidate.id === id);
  if (!npc) {
    errors.push(`Missing configured NPC ${id}.`);
    continue;
  }
  if (!npc.startsQuest) errors.push(`${id} must be marked startsQuest.`);
  for (const questId of requiredQuestIds) {
    const declared = npc.questId === questId || (Array.isArray(npc.questChain) && npc.questChain.includes(questId));
    if (!declared) errors.push(`${id} must declare quest ${questId}.`);
  }
}

for (const npc of world.devNpcConfigs || []) {
  const chain = Array.isArray(npc.questChain) ? npc.questChain.filter(Boolean) : [];
  const ids = [npc.questId, ...chain].filter(Boolean);
  if (!npc.startsQuest && !ids.length) continue;
  if (!npc.startsQuest) errors.push(`${npc.id || npc.name} declares quest ids but is not marked startsQuest.`);
  if (!ids.length) errors.push(`${npc.id || npc.name} starts quests but has no questId or questChain.`);
  for (const questId of ids) {
    if (!questIds.has(questId)) errors.push(`${npc.id || npc.name} references unknown quest ${questId}.`);
  }
  const sprite = normalizedAssetPath(npc.sprite);
  if (!sprite) {
    errors.push(`${npc.id || npc.name} starts quests but has no sprite.`);
  } else if (!spritePaths.has(sprite) && !fs.existsSync(path.join(root, sprite))) {
    errors.push(`${npc.id || npc.name} references missing sprite ${npc.sprite}.`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated ${(world.devNpcConfigs || []).length} NPC configs and ${questIds.size} quest ids.`);
