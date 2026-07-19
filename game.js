const canvas = document.querySelector("#gameCanvas");
let ctx = canvas.getContext("2d");
const arenaWrap = document.querySelector(".arena-wrap");
const trainerRealmOverlay = document.querySelector("#trainerRealmOverlay");

const statsGrid = document.querySelector("#statsGrid");
const playerSummary = document.querySelector("#playerSummary");
const resistancesGrid = document.querySelector("#resistancesGrid");
const equipmentGrid = document.querySelector("#equipmentGrid");
const equipmentHover = document.querySelector(".equipment-hover");
const equipmentPopover = document.querySelector(".equipment-popover");
const inventoryGrid = document.querySelector("#inventoryGrid");
const itemActionMenu = document.querySelector("#itemActionMenu");
const openSpellbookButton = document.querySelector("#openSpellbookButton");
const openSpellLineupsButton = document.querySelector("#openSpellLineupsButton");
const spellbookWindow = document.querySelector("#spellbookWindow");
const closeSpellbookButton = document.querySelector("#closeSpellbookButton");
const spellbookSlotsReadout = document.querySelector("#spellbookSlotsReadout");
const spellbookRealmTabs = document.querySelector("#spellbookRealmTabs");
const spellbookSpellList = document.querySelector("#spellbookSpellList");
const openSoulCrystalsButton = document.querySelector("#openSoulCrystalsButton");
const soulCrystalsWindow = document.querySelector("#soulCrystalsWindow");
const closeSoulCrystalsButton = document.querySelector("#closeSoulCrystalsButton");
const soulCrystalsList = document.querySelector("#soulCrystalsList");
const skillsTabs = document.querySelector("#skillsTabs");
const craftingWindow = document.querySelector("#craftingWindow");
const closeCraftingButton = document.querySelector("#closeCraftingButton");
const craftingTitle = document.querySelector("#craftingTitle");
const craftingSubtitle = document.querySelector("#craftingSubtitle");
const craftingUsableOnlyToggle = document.querySelector("#craftingUsableOnlyToggle");
const craftingList = document.querySelector("#craftingList");
const replaceSpellWindow = document.querySelector("#replaceSpellWindow");
const replaceSpellOptions = document.querySelector("#replaceSpellOptions");
const spellHudEl = document.querySelector("#spellHud");
const statusEffectHud = document.querySelector("#statusEffectHud");
let targetWindowBody = null;
let targetWindowSignature = "";
let effectsWindowBody = null;
let effectsWindowSignature = "";
let petWindowBody = null;
let petWindowSignature = "";
let inspectWindowBody = null;
let inspectWindowSignature = "";
const logEl = document.querySelector("#log");
const rightPanel = document.querySelector(".right-panel");
const chronicleTab = document.querySelector("#chronicleTab");
const chatLogTab = document.querySelector("#chatLogTab");
const modeChoice = document.querySelector("#modeChoice");
const accountStatus = document.querySelector("#accountStatus");
const authPanel = document.querySelector("#authPanel");
const characterDashboard = document.querySelector("#characterDashboard");
const loginForm = document.querySelector("#loginForm");
const createAccountForm = document.querySelector("#createAccountForm");
const createCharacterForm = document.querySelector("#createCharacterForm");
const characterList = document.querySelector("#characterList");
const loginUsernameInput = document.querySelector("#loginUsernameInput");
const loginPasswordInput = document.querySelector("#loginPasswordInput");
const createUsernameInput = document.querySelector("#createUsernameInput");
const createPasswordInput = document.querySelector("#createPasswordInput");
const createRepeatPasswordInput = document.querySelector("#createRepeatPasswordInput");
const createPasswordHelp = document.querySelector("#createPasswordHelp");
const characterNameHelp = document.querySelector("#characterNameHelp");
const playerNameInput = document.querySelector("#playerNameInput");
const multiplayerWorldInput = document.querySelector("#multiplayerWorldInput");
const multiplayerWorldList = document.querySelector("#multiplayerWorldList");
const refreshMultiplayerWorldsButton = document.querySelector("#refreshMultiplayerWorldsButton");
const openQuestLogButton = document.querySelector("#openQuestLogButton");
const questLogWindow = document.querySelector("#questLogWindow");
const closeQuestLogButton = document.querySelector("#closeQuestLogButton");
const questList = document.querySelector("#questList");
const dialogueWindow = document.querySelector("#dialogueWindow");
const dialogueTitle = document.querySelector("#dialogueTitle");
const dialogueText = document.querySelector("#dialogueText");
const dialogueNextButton = document.querySelector("#dialogueNextButton");
const closeDialogueButton = document.querySelector("#closeDialogueButton");
const hpReadout = document.querySelector("#hpReadout");
const xpReadout = document.querySelector("#xpReadout");
const goldReadout = document.querySelector("#goldReadout");
const weaponReadout = document.querySelector("#weaponReadout");
const levelReadout = document.querySelector("#levelReadout");
const areaNameEl = document.querySelector("#areaName");
const pauseNotice = document.querySelector("#pauseNotice");
const chatInput = document.querySelector("#chatInput");
const chatChannelControl = document.createElement("label");
chatChannelControl.className = "chat-channel-control";
chatChannelControl.innerHTML = `
  <span class="sr-only">Chat channel</span>
  <select id="chatChannelSelect" aria-label="Chat channel">
    <option value="say">Say</option>
    <option value="team">Team</option>
    <option value="world">World</option>
    <option value="general">General</option>
  </select>
`;
const chatChannelSelect = chatChannelControl.querySelector("select");
canvas.tabIndex = 0;
const hpBar = document.querySelector("#hpBar");
const xpBar = document.querySelector("#xpBar");
const goldBar = document.querySelector("#goldBar");
const weaponBar = document.querySelector("#weaponBar");
const spellChoice = document.querySelector("#spellChoice");
const starterSpellsEl = document.querySelector("#starterSpells");
const levelChoice = document.querySelector("#levelChoice");
const levelOptions = document.querySelector("#levelOptions");
const deathScreen = document.querySelector("#deathScreen");
const restartButton = document.querySelector("#restartButton");
const shopWindow = document.querySelector("#shopWindow");
const shopInventoryEl = document.querySelector("#shopInventory");
const shopEquipmentTab = document.querySelector("#shopEquipmentTab");
const shopConsumablesTab = document.querySelector("#shopConsumablesTab");
const shopScrollsTab = document.querySelector("#shopScrollsTab");
const shopMiscTab = document.querySelector("#shopMiscTab");
const shopTrainTab = document.querySelector("#shopTrainTab");
const closeShopButton = document.querySelector("#closeShopButton");
const shopTitle = document.querySelector("#shopTitle");
const shopSubtitle = shopWindow.querySelector(".shop-header p");
const shopGoldReadout = document.querySelector("#shopGoldReadout");
const bankWindow = document.querySelector("#bankWindow");
const bankInventoryEl = document.querySelector("#bankInventory");
const bankGoldButton = document.querySelector("#bankGoldButton");
const bankGoldReadout = document.querySelector("#bankGoldReadout");
const bankPlayerGoldReadout = document.querySelector("#bankPlayerGoldReadout");
const closeBankButton = document.querySelector("#closeBankButton");
const confirmWindow = document.querySelector("#confirmWindow");
const confirmTitle = document.querySelector("#confirmTitle");
const confirmText = document.querySelector("#confirmText");
const confirmInputWrap = document.querySelector("#confirmInputWrap");
const confirmInputLabel = document.querySelector("#confirmInputLabel");
const confirmInput = document.querySelector("#confirmInput");
const confirmOptions = document.querySelector("#confirmOptions");
const confirmAcceptButton = document.querySelector("#confirmAcceptButton");
const confirmCancelButton = document.querySelector("#confirmCancelButton");
const tradeWindow = document.querySelector("#tradeWindow");
const tradeTitle = document.querySelector("#tradeTitle");
const tradeSubtitle = document.querySelector("#tradeSubtitle");
const tradeGoldInput = document.querySelector("#tradeGoldInput");
const tradeYourOffer = document.querySelector("#tradeYourOffer");
const tradeTheirGold = document.querySelector("#tradeTheirGold");
const tradeTheirOffer = document.querySelector("#tradeTheirOffer");
const tradeInventory = document.querySelector("#tradeInventory");
const tradeConfirmButton = document.querySelector("#tradeConfirmButton");
const tradeCancelButton = document.querySelector("#tradeCancelButton");
const tradeRejectButton = document.querySelector("#tradeRejectButton");
const devSpawnWindow = document.querySelector("#devSpawnWindow");
const devSpawnList = document.querySelector("#devSpawnList");
const devSpawnLevelInput = document.querySelector("#devSpawnLevelInput");
const closeDevSpawnButton = document.querySelector("#closeDevSpawnButton");
const trainerWindow = document.querySelector("#trainerWindow");
const trainerSpellList = document.querySelector("#trainerSpellList");
const trainerSubtitle = trainerWindow?.querySelector(".shop-header p");
const closeTrainerButton = document.querySelector("#closeTrainerButton");
const floatingItemTooltip = document.createElement("div");
floatingItemTooltip.className = "floating-item-tooltip hidden";
document.body.appendChild(floatingItemTooltip);
const spellbookFloatingTooltip = document.createElement("div");
spellbookFloatingTooltip.className = "spellbook-floating-tooltip hidden";
document.body.appendChild(spellbookFloatingTooltip);

const runtimeUiStyle = document.createElement("style");
runtimeUiStyle.textContent = `
  .shop-item > .item-art-frame {
    position: relative !important;
    top: auto !important;
    right: auto !important;
    bottom: auto !important;
    left: auto !important;
    width: calc(100% - 16px) !important;
    height: calc(100% - 16px) !important;
  }
`;
document.head.appendChild(runtimeUiStyle);
// Legacy inventory event bindings still attach to this node; pet commands now live in the Pet window.
const petCommandMenu = document.createElement("div");
petCommandMenu.className = "pet-command-menu hidden";
document.body.appendChild(petCommandMenu);
const teamInvitePopup = document.createElement("div");
teamInvitePopup.className = "team-invite-popup hidden";
document.body.appendChild(teamInvitePopup);
const teamWindow = document.createElement("section");
teamWindow.className = "team-window hidden";
teamWindow.innerHTML = `<div class="team-window-header">Team</div><div class="team-member-list"></div>`;
document.body.appendChild(teamWindow);
let characterFactionList = null;
let characterRealmList = null;
let minimapWindowCanvas = null;
let minimapWindowCtx = null;
let minimapZoomHoldTimer = null;
let minimapZoomHoldPointerId = null;
const MIN_MAP_ZOOM = 8;
const MAX_MAP_ZOOM = 64;
const DEFAULT_MAP_ZOOM = MAX_MAP_ZOOM;
let floatingWindowsReady = false;
let floatingFitFrame = 0;
let floatingFitDirty = false;
let floatingFitReason = "";
let floatingFitMeasureCount = 0;
let floatingFitMeasureSecond = 0;
const floatingFitPaneCache = new WeakMap();
let spellHudSignature = "";
let statusEffectHudSignature = "";
let characterFactionSignature = "";
let characterRealmSignature = "";
let nextSharedEntityId = 1;
const PET_DURATION_SECONDS = 150;
const REMOTE_COMBAT_SOUND_RANGE = 1100;
const SPELL_MEMORIZATION_SECONDS = 5;
const SPELL_LINEUP_COUNT = 3;
window.SoulreaperSpellLineupCount = SPELL_LINEUP_COUNT;
const SOUND_VOLUME_STORAGE_KEY = "soulreaperSoundVolume.v1";
const levelUpGongAudio = new Audio("./assets/audio/level-up-gong.wav");
levelUpGongAudio.preload = "auto";
const soundEffectCache = {};

function loadSoundVolume() {
  try {
    const stored = localStorage.getItem(SOUND_VOLUME_STORAGE_KEY);
    if (stored === null) return 1;
    const value = Number(stored);
    return Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 1;
  } catch {
    return 1;
  }
}

function setSoundVolume(value) {
  const volume = Math.max(0, Math.min(1, Number(value)));
  game.soundVolume = Number.isFinite(volume) ? volume : 1;
  try {
    localStorage.setItem(SOUND_VOLUME_STORAGE_KEY, String(game.soundVolume));
  } catch {}
  renderOptionsWindow();
}

function playLevelUpGong() {
  try {
    levelUpGongAudio.currentTime = 0;
    levelUpGongAudio.volume = game?.soundVolume ?? 1;
    const playback = levelUpGongAudio.play();
    if (playback?.catch) playback.catch(() => {});
  } catch {}
}

function playSoundEffect(name) {
  const clean = String(name || "").trim();
  if (!clean) return;
  const audioPath = /\.(wav|mp3|ogg)$/i.test(clean)
    ? (clean.startsWith("./") ? clean : clean.startsWith("assets/") ? `./${clean}` : clean.startsWith("/assets/") ? `.${clean}` : `./assets/audio/${clean}`)
    : "";
  const slug = audioPath ? "" : clean.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (!audioPath && !slug) return;
  const src = audioPath || `./assets/audio/${slug}.wav`;
  try {
    const audio = soundEffectCache[src] ||= new Audio(src);
    audio.currentTime = 0;
    audio.volume = game?.soundVolume ?? 1;
    const playback = audio.play();
    if (playback?.catch) playback.catch(() => {});
  } catch {}
}

function playRemoteCombatSound(name, point, range = REMOTE_COMBAT_SOUND_RANGE) {
  if (!name) return;
  const x = Number(point?.x);
  const y = Number(point?.y);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return;
  if (distance({ x, y }, game.player) > range) return;
  playSoundEffect(name);
}

function playSpellSound(spell) {
  playSoundEffect(spell?.soundEffect || spell?.castSound || "");
}

const logPanel = document.querySelector(".right-panel .grow");

const sprites = {
  player: new Image(),
  tree: new Image(),
  rock: new Image(),
  whisperspringEntrance: new Image(),
  wyndhelmCathedralEntrance: new Image(),
  mineEntrance: new Image(),
  underneathEntrance: new Image(),
  caveEntrance: new Image(),
  spellEffects: {
    tangleVine: new Image(),
    spiderweb: new Image(),
    ringOfFire: new Image()
  },
  projectiles: {
    fireball: new Image(),
    magicMissile: new Image(),
    iceBolt: new Image()
  },
  ground: {
    ganderswood: new Image(),
    ganderswoodFen: new Image(),
    ratDen: new Image(),
    ratzkhan: new Image(),
    ratzkhanChamber: new Image(),
    slimepool: new Image(),
    ganderswoodGlade: new Image(),
    grimswoodPass: new Image(),
    wyndhelm: new Image(),
    crowingFields: new Image(),
    gobba: new Image(),
    gobbaStronghold: new Image(),
    sand: new Image(),
    oasis: new Image(),
    evermistGlade: new Image(),
    whisperspring: new Image(),
    whisperspringWall: new Image(),
    cathFloor: new Image(),
    cathCarpet: new Image(),
    mageGuildCarpet: new Image(),
    hereticCarpet: new Image(),
    stoneTiles: new Image(),
    greyTiles: new Image(),
    oldwood: new Image(),
    desertWall: new Image(),
    desertRuinsFloor: new Image(),
    desertRuinsRoof: new Image(),
    whisperspringVoid: new Image(),
    water: new Image(),
    lava: new Image(),
    ash: new Image(),
    houseWall: new Image(),
    woodenPosts: new Image(),
    houseFloor: new Image(),
    houseRoof: new Image(),
    greyRoof: new Image(),
    circularHouseRoof: new Image(),
    thatchedCircleRoof: new Image(),
    theodoraRoof: new Image(),
    spookyRoof: new Image()
  },
  mobs: {
    giantRat: new Image(),
    goblinTroublemaker: new Image(),
    imp: new Image(),
    brownieScout: new Image(),
    pixie: new Image(),
    plagueRat: new Image(),
    goblinThug: new Image(),
    goblinShaman: new Image(),
    bogWitch: new Image(),
    plagueWolf: new Image(),
    willOWisp: new Image(),
    decayingSkeleton: new Image(),
    secretDiarrheaMonster: new Image(),
    bat: new Image(),
    brownieDruid: new Image(),
    greaterPixie: new Image(),
    unicorn: new Image(),
    nymph: new Image(),
    dryad: new Image(),
    treant: new Image(),
    leprechaun: new Image(),
    naiad: new Image(),
    carnivorousPlant: new Image(),
    greenDrakeling: new Image(),
    salamander: new Image(),
    incubus: new Image(),
    zombie: new Image(),
    efreet: new Image(),
    goblinWolfrider: new Image(),
    goblinKing: new Image(),
    mushroomMan: new Image(),
    wolf: new Image(),
    bear: new Image(),
    blackPanther: new Image(),
    snowLeopard: new Image(),
    stag: new Image(),
    whiteStag: new Image(),
    skeletonMage: new Image(),
    ghost: new Image(),
    waterElemental: new Image(),
    fireElemental: new Image(),
    iceElemental: new Image(),
    shadowElemental: new Image(),
    lightElemental: new Image(),
    yeti: new Image(),
    troll: new Image(),
    cherub: new Image(),
    ogre: new Image(),
    blueHydra: new Image(),
    charybdis: new Image(),
    waterfallGolem: new Image(),
    ancientTreant: new Image(),
    leshy: new Image(),
    leshachikha: new Image(),
    greenDragon: new Image(),
    satyr: new Image(),
    tatzelwurm: new Image()
  },
  props: {
    deadTree: new Image(),
    gravestone: new Image(),
    gargoyleStatue: new Image(),
    pineTree: new Image(),
    snowyPineTree: new Image(),
    bush: new Image(),
    ruinedPillar: new Image(),
    ruinedStatue: new Image(),
    mushroom: new Image(),
    tropicalTree: new Image(),
    palmTree: new Image(),
    cactus: new Image(),
    tumbleweed: new Image(),
    redBoulder: new Image(),
    snowyBoulder: new Image(),
    snowCoveredDeadTree: new Image(),
    desertRuin: new Image(),
    jungleRuin: new Image(),
    summerTree: new Image(),
    summerBush: new Image(),
    plumTree: new Image(),
    autumnTree: new Image(),
    autumnBush: new Image(),
    weepingWillow: new Image(),
    enchantedTree: new Image(),
    ancientTree: new Image(),
    loom: new Image(),
    smeltingFurnace: new Image(),
    tanningDrum: new Image(),
    potionmakingTable: new Image(),
    craftingTable: new Image(),
    anvil: new Image(),
    dressFormMannequin: new Image(),
    portal: new Image()
  },
  yrgmaDimEntrance: new Image(),
  npcs: {
    gvada: new Image(),
    wanderingSalesman: new Image(),
    shopkeeper: new Image(),
    soulreaperTrainer: new Image(),
    pleezix: new Image(),
    sharlene: new Image(),
    mordren: new Image(),
    cecilPaddywagon: new Image(),
    bumsforkLocal: new Image(),
    bumsforkWatcher: new Image(),
    quietVillager: new Image(),
    soulreaperMale: new Image(),
    soulreaperFemale: new Image(),
    shadowSoulreaperMale: new Image(),
    shadowSoulreaperFemale: new Image(),
    sylvanSoulreaperMale: new Image(),
    sylvanSoulreaperFemale: new Image(),
    infernalSoulreaperMale: new Image(),
    infernalSoulreaperFemale: new Image(),
    etherealSoulreaperMale: new Image(),
    etherealSoulreaperFemale: new Image(),
    celestialSoulreaperMale: new Image(),
    celestialSoulreaperFemale: new Image(),
    oldMan: new Image(),
    oldWoman: new Image(),
    villagerMale: new Image(),
    villagerFemale: new Image(),
    villagerMale2: new Image(),
    villagerFemale2: new Image(),
    childMale: new Image(),
    childFemale: new Image(),
    mordred: new Image(),
    guard: new Image()
  }
};
sprites.player.src = "./assets/sprites/soulreaper-wizard-64.png";
sprites.tree.src = "./assets/sprites/tree-64.png";
sprites.rock.src = "./assets/sprites/rock-64.png";
sprites.whisperspringEntrance.src = "./assets/sprites/whisperspring-entrance.png";
sprites.wyndhelmCathedralEntrance.src = "./assets/sprites/wyndhelm-cathedral-entrance.png";
sprites.mineEntrance.src = "./assets/sprites/mine-entrance.png";
sprites.underneathEntrance.src = "./assets/sprites/underneath-entrance.png";
sprites.caveEntrance.src = "./assets/sprites/cave-entrance.png";
sprites.yrgmaDimEntrance.src = "./assets/sprites/yrgma-dim.png";
sprites.spellEffects.tangleVine.src = "./assets/spells/tangle-vine-animation.png";
sprites.spellEffects.spiderweb.src = "./assets/spells/spiderweb-animation.png";
sprites.spellEffects.ringOfFire.src = "./assets/spells/ring-of-fire-effect.png";
sprites.projectiles.fireball.src = "./assets/projectiles/fireball.png";
sprites.projectiles.magicMissile.src = "./assets/projectiles/magic-missile.png";
sprites.projectiles.iceBolt.src = "./assets/projectiles/ice-bolt.png";
sprites.npcs.gvada.src = "./assets/sprites/npcs/gvada-v2.png";
sprites.npcs.wanderingSalesman.src = "./assets/sprites/npcs/wandering-salesman.png";
sprites.npcs.shopkeeper.src = "./assets/sprites/npcs/shopkeeper.png";
sprites.npcs.soulreaperTrainer.src = "./assets/sprites/npcs/soulreaper-trainer.png";
sprites.npcs.pleezix.src = "./assets/sprites/npcs/pleezix.png";
sprites.npcs.sharlene.src = "./assets/sprites/npcs/sharlene.png";
sprites.npcs.mordren.src = "./assets/sprites/npcs/mordren.png";
sprites.npcs.cecilPaddywagon.src = "./assets/sprites/npcs/cecil-paddywagon.png";
sprites.npcs.bumsforkLocal.src = "./assets/sprites/npcs/bumsfork-local.png";
sprites.npcs.bumsforkWatcher.src = "./assets/sprites/npcs/bumsfork-watcher.png";
sprites.npcs.quietVillager.src = "./assets/sprites/npcs/quiet-villager.png";
sprites.npcs.soulreaperMale.src = "./assets/sprites/npcs/soulreaper-male.png";
sprites.npcs.soulreaperFemale.src = "./assets/sprites/npcs/soulreaper-female.png";
sprites.npcs.shadowSoulreaperMale.src = "./assets/sprites/npcs/shadow-soulreaper-male.png";
sprites.npcs.shadowSoulreaperFemale.src = "./assets/sprites/npcs/shadow-soulreaper-female.png";
sprites.npcs.sylvanSoulreaperMale.src = "./assets/sprites/npcs/sylvan-soulreaper-male.png";
sprites.npcs.sylvanSoulreaperFemale.src = "./assets/sprites/npcs/sylvan-soulreaper-female.png";
sprites.npcs.infernalSoulreaperMale.src = "./assets/sprites/npcs/infernal-soulreaper-male.png";
sprites.npcs.infernalSoulreaperFemale.src = "./assets/sprites/npcs/infernal-soulreaper-female.png";
sprites.npcs.etherealSoulreaperMale.src = "./assets/sprites/npcs/ethereal-soulreaper-male.png";
sprites.npcs.etherealSoulreaperFemale.src = "./assets/sprites/npcs/ethereal-soulreaper-female.png";
sprites.npcs.celestialSoulreaperMale.src = "./assets/sprites/npcs/celestial-soulreaper-male.png";
sprites.npcs.celestialSoulreaperFemale.src = "./assets/sprites/npcs/celestial-soulreaper-female.png";
sprites.npcs.oldMan.src = "./assets/sprites/npcs/old-man.png";
sprites.npcs.oldWoman.src = "./assets/sprites/npcs/old-woman.png";
sprites.npcs.villagerMale.src = "./assets/sprites/npcs/villager-male.png";
sprites.npcs.villagerFemale.src = "./assets/sprites/npcs/villager-female.png";
sprites.npcs.villagerMale2.src = "./assets/sprites/npcs/villager-male-2.png";
sprites.npcs.villagerFemale2.src = "./assets/sprites/npcs/villager-female-2.png";
sprites.npcs.childMale.src = "./assets/sprites/npcs/child-male.png";
sprites.npcs.childFemale.src = "./assets/sprites/npcs/child-female.png";
sprites.npcs.mordred.src = "./assets/sprites/npcs/mordred.png";
sprites.npcs.guard.src = "./assets/sprites/npcs/guard.png";
const npcSpriteRegistry = window.SoulreaperNpcSprites?.sprites || {};
for (const [key, config] of Object.entries(npcSpriteRegistry)) {
  if (!sprites.npcs[key]) sprites.npcs[key] = new Image();
  sprites.npcs[key].src = config.src;
}
sprites.mobs.giantRat.src = "./assets/sprites/mobs/giant-rat.png";
sprites.mobs.goblinTroublemaker.src = "./assets/sprites/mobs/goblin-troublemaker.png";
sprites.mobs.imp.src = "./assets/sprites/mobs/imp.png";
sprites.mobs.brownieScout.src = "./assets/sprites/mobs/brownie-scout.png";
sprites.mobs.pixie.src = "./assets/sprites/mobs/pixie.png";
sprites.mobs.plagueRat.src = "./assets/sprites/mobs/plague-rat.png";
sprites.mobs.goblinThug.src = "./assets/sprites/mobs/goblin-thug.png";
sprites.mobs.goblinShaman.src = "./assets/sprites/mobs/goblin-shaman.png";
sprites.mobs.bogWitch.src = "./assets/sprites/mobs/bog-witch.png";
sprites.mobs.plagueWolf.src = "./assets/sprites/mobs/plague-wolf.png";
sprites.mobs.willOWisp.src = "./assets/sprites/mobs/will-o-wisp.png";
sprites.mobs.decayingSkeleton.src = "./assets/sprites/mobs/decaying-skeleton.png";
sprites.mobs.secretDiarrheaMonster.src = "./assets/sprites/mobs/secret-diarrhea-monster.png";
sprites.mobs.bat.src = "./assets/sprites/mobs/bat.png";
sprites.mobs.brownieDruid.src = "./assets/sprites/mobs/brownie-druid.png";
sprites.mobs.greaterPixie.src = "./assets/sprites/mobs/greater-pixie.png";
sprites.mobs.unicorn.src = "./assets/sprites/mobs/unicorn.png";
sprites.mobs.nymph.src = "./assets/sprites/mobs/nymph.png";
sprites.mobs.dryad.src = "./assets/sprites/mobs/dryad.png";
sprites.mobs.treant.src = "./assets/sprites/mobs/treant.png";
sprites.mobs.leprechaun.src = "./assets/sprites/mobs/leprechaun.png";
sprites.mobs.naiad.src = "./assets/sprites/mobs/naiad.png";
sprites.mobs.carnivorousPlant.src = "./assets/sprites/mobs/carnivorous-plant.png";
sprites.mobs.greenDrakeling.src = "./assets/sprites/mobs/green-drakeling.png";
sprites.mobs.salamander.src = "./assets/sprites/mobs/salamander.png";
sprites.mobs.incubus.src = "./assets/sprites/mobs/incubus.png";
sprites.mobs.zombie.src = "./assets/sprites/mobs/zombie.png";
sprites.mobs.efreet.src = "./assets/sprites/mobs/efreet.png";
sprites.mobs.goblinWolfrider.src = "./assets/sprites/mobs/goblin-wolfrider.png";
sprites.mobs.goblinKing.src = "./assets/sprites/mobs/goblin-king.png";
sprites.mobs.mushroomMan.src = "./assets/sprites/mobs/mushroom-man.png";
sprites.mobs.wolf.src = "./assets/sprites/mobs/wolf.png";
sprites.mobs.bear.src = "./assets/sprites/mobs/bear.png";
sprites.mobs.blackPanther.src = "./assets/sprites/mobs/black-panther.png";
sprites.mobs.snowLeopard.src = "./assets/sprites/mobs/snow-leopard.png";
sprites.mobs.stag.src = "./assets/sprites/mobs/stag.png";
sprites.mobs.whiteStag.src = "./assets/sprites/mobs/white-stag.png";
sprites.mobs.skeletonMage.src = "./assets/sprites/mobs/skeleton-mage.png";
sprites.mobs.ghost.src = "./assets/sprites/mobs/ghost.png";
sprites.mobs.waterElemental.src = "./assets/sprites/mobs/water-elemental.png";
sprites.mobs.fireElemental.src = "./assets/sprites/mobs/fire-elemental.png";
sprites.mobs.iceElemental.src = "./assets/sprites/mobs/ice-elemental.png";
sprites.mobs.shadowElemental.src = "./assets/sprites/mobs/shadow-elemental.png";
sprites.mobs.lightElemental.src = "./assets/sprites/mobs/light-elemental.png";
sprites.mobs.yeti.src = "./assets/sprites/mobs/yeti.png";
sprites.mobs.troll.src = "./assets/sprites/mobs/troll.png";
sprites.mobs.cherub.src = "./assets/sprites/mobs/cherub.png";
sprites.mobs.ogre.src = "./assets/sprites/mobs/ogre.png";
sprites.mobs.blueHydra.src = "./assets/sprites/mobs/blue-hydra.png";
sprites.mobs.charybdis.src = "./assets/sprites/mobs/charybdis.png";
sprites.mobs.waterfallGolem.src = "./assets/sprites/mobs/waterfall-golem.png";
sprites.mobs.ancientTreant.src = "./assets/sprites/mobs/ancient-treant.png";
sprites.mobs.leshy.src = "./assets/sprites/mobs/leshy.png";
sprites.mobs.leshachikha.src = "./assets/sprites/mobs/leshachikha.png";
sprites.mobs.greenDragon.src = "./assets/sprites/mobs/green-dragon.png";
sprites.mobs.satyr.src = "./assets/sprites/mobs/satyr.png";
sprites.mobs.tatzelwurm.src = "./assets/sprites/mobs/tatzelwurm.png";
sprites.props.deadTree.src = "./assets/sprites/props/dead-tree.png";
sprites.props.gravestone.src = "./assets/sprites/props/gravestone.png";
sprites.props.gargoyleStatue.src = "./assets/sprites/props/gargoyle-statue.png";
sprites.props.pineTree.src = "./assets/sprites/props/pine-tree.png";
sprites.props.snowyPineTree.src = "./assets/sprites/props/snowy-pine-tree.png";
sprites.props.bush.src = "./assets/sprites/props/bush.png";
sprites.props.ruinedPillar.src = "./assets/sprites/props/ruined-pillar.png";
sprites.props.ruinedStatue.src = "./assets/sprites/props/ruined-statue.png";
sprites.props.mushroom.src = "./assets/sprites/props/mushroom.png";
sprites.props.tropicalTree.src = "./assets/sprites/props/tropical-tree.png";
sprites.props.palmTree.src = "./assets/sprites/props/palm-tree.png";
sprites.props.cactus.src = "./assets/sprites/props/cactus.png";
sprites.props.tumbleweed.src = "./assets/sprites/props/tumbleweed.png";
sprites.props.redBoulder.src = "./assets/sprites/props/red-boulder.png";
sprites.props.snowyBoulder.src = "./assets/sprites/props/snowy-boulder.png";
sprites.props.snowCoveredDeadTree.src = "./assets/sprites/props/snow-covered-dead-tree.png";
sprites.props.desertRuin.src = "./assets/sprites/props/desert-ruin.png";
sprites.props.jungleRuin.src = "./assets/sprites/props/jungle-ruin.png";
sprites.props.summerTree.src = "./assets/sprites/props/summer-tree.png";
sprites.props.summerBush.src = "./assets/sprites/props/summer-bush.png";
sprites.props.plumTree.src = "./assets/sprites/props/plum-tree.png";
sprites.props.autumnTree.src = "./assets/sprites/props/autumn-tree.png";
sprites.props.autumnBush.src = "./assets/sprites/props/autumn-bush.png";
sprites.props.weepingWillow.src = "./assets/sprites/props/weeping-willow.png";
sprites.props.enchantedTree.src = "./assets/sprites/props/enchanted-tree.png";
sprites.props.ancientTree.src = "./assets/sprites/props/ancient-tree.png";
sprites.props.loom.src = "./assets/sprites/props/loom.png";
sprites.props.smeltingFurnace.src = "./assets/sprites/props/smelting-furnace.png";
sprites.props.tanningDrum.src = "./assets/sprites/props/tanning-drum.png";
sprites.props.potionmakingTable.src = "./assets/sprites/props/potionmaking-table.png";
sprites.props.craftingTable.src = "./assets/sprites/props/crafting-table.png";
sprites.props.anvil.src = "./assets/sprites/props/anvil.png";
sprites.props.dressFormMannequin.src = "./assets/sprites/props/dress-form-mannequin.png";
sprites.props.portal.src = "./assets/sprites/props/portal.png";

const itemIconSources = window.SoulreaperItemArt?.iconSources || {};


const itemIconImages = {};
const itemIconPathImages = {};
const tintedItemIconCache = {};
const tintedProjectileSpriteCache = new Map();
const tintedSpriteOverlayCache = new Map();
const neutralGemIconSrc = "./assets/items/neutral-gem.png";
const itemIconTints = window.SoulreaperItemArt?.iconTints || {};
function requestItemIconRerender() {
  if (typeof markUIDirty === "function") markUIDirty();
  if (typeof renderUI === "function") renderUI();
  if (typeof renderShop === "function" && shopWindow && !shopWindow.classList.contains("hidden")) renderShop();
}
for (const [key, src] of Object.entries(itemIconSources)) {
  const image = new Image();
  image.onload = requestItemIconRerender;
  image.src = src;
  itemIconImages[key] = image;
}

function normalizedItemGraphicPath(graphic) {
  const value = String(graphic || "").trim();
  if (!/\.(png|webp|jpe?g|gif)$/i.test(value)) return "";
  if (value.startsWith("./assets/")) return value;
  if (value.startsWith("assets/")) return `./${value}`;
  if (value.startsWith("/assets/")) return `.${value}`;
  return "";
}

function itemIconImageForGraphic(graphic) {
  const src = itemIconSrc(graphic);
  const tintedCanvas = tintedItemIconCanvas(graphic, src);
  if (tintedCanvas) return tintedCanvas;
  return itemIconImageForSource(src);
}

function itemIconImageForSource(src) {
  if (!src) return null;
  const cacheKey = src.toLowerCase();
  if (!itemIconPathImages[cacheKey]) {
    const image = new Image();
    image.onload = requestItemIconRerender;
    image.src = src;
    itemIconPathImages[cacheKey] = image;
  }
  return itemIconPathImages[cacheKey];
}

function itemIconTint(itemOrGraphic) {
  if (typeof itemOrGraphic !== "string" && itemOrGraphic?.graphicTint) return itemOrGraphic.graphicTint;
  const graphic = typeof itemOrGraphic === "string"
    ? itemOrGraphic
    : itemOrGraphic?.graphic || itemOrGraphic?.name;
  const name = typeof itemOrGraphic === "string" ? "" : itemOrGraphic?.name;
  return itemIconTints[String(graphic || "").toLowerCase()]
    || itemIconTints[String(name || "").toLowerCase()]
    || null;
}

function itemIconChannelTints(itemOrGraphic) {
  if (!itemOrGraphic || typeof itemOrGraphic === "string") return null;
  const channels = itemOrGraphic.graphicChannels || {};
  const metal = channels.metal || itemOrGraphic.metalTint || itemOrGraphic.graphicMetalTint;
  const gem = channels.gem || itemOrGraphic.gemTint || itemOrGraphic.graphicGemTint;
  const rune = channels.rune || itemOrGraphic.runeTint || itemOrGraphic.graphicRuneTint;
  if (!metal && !gem && !rune) return null;
  return { metal, gem, rune };
}

function parseHexColor(color) {
  const value = String(color || "").replace("#", "").trim();
  if (value.length !== 6) return null;
  const number = Number.parseInt(value, 16);
  if (!Number.isFinite(number)) return null;
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

function shadeTintColor(color, lum) {
  const black = { r: 8, g: 8, b: 10 };
  const white = { r: 255, g: 252, b: 235 };
  if (lum < 0.34) return mixColor(black, color, lum / 0.34);
  if (lum > 0.74) return mixColor(color, white, (lum - 0.74) / 0.26);
  return mixColor(color, white, (lum - 0.34) * 0.18);
}

function tintedItemIconCanvas(itemOrGraphic, src = itemIconSrc(itemOrGraphic)) {
  const tint = itemIconTint(itemOrGraphic);
  const channelTints = itemIconChannelTints(itemOrGraphic);
  if (!src || (!tint && !channelTints)) return null;
  const key = channelTints
    ? `${src}|base:${tint || ""}|metal:${channelTints.metal || ""}|gem:${channelTints.gem || ""}|rune:${channelTints.rune || ""}`
    : `${src}|${tint}`;
  if (tintedItemIconCache[key]) return tintedItemIconCache[key];
  const image = itemIconImageForSource(src);
  if (!image?.complete || !image.naturalWidth) return null;
  const color = parseHexColor(tint);
  const metalColor = parseHexColor(channelTints?.metal);
  const gemColor = parseHexColor(channelTints?.gem);
  const runeColor = parseHexColor(channelTints?.rune);
  if (!color && !metalColor && !gemColor && !runeColor) return null;
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const tintCtx = canvas.getContext("2d");
  tintCtx.imageSmoothingEnabled = false;
  tintCtx.drawImage(image, 0, 0);
  const data = tintCtx.getImageData(0, 0, canvas.width, canvas.height);
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
    if (runeColor && isGemChannel) out = shadeTintColor(runeColor, lum);
    else if (gemColor && isGemChannel) out = shadeTintColor(gemColor, lum);
    else if (metalColor && isMetalChannel) out = shadeTintColor(metalColor, lum);
    else if (color) out = shadeTintColor(color, lum);
    if (!out) continue;
    pixels[i] = out.r;
    pixels[i + 1] = out.g;
    pixels[i + 2] = out.b;
  }
  tintCtx.putImageData(data, 0, 0);
  tintedItemIconCache[key] = canvas;
  return canvas;
}

function tintedProjectileSpriteCanvas(image, tint) {
  const color = parseHexColor(tint);
  if (!image?.complete || !image.naturalWidth || !color) return null;
  const key = `${image.currentSrc || image.src || image.dataset?.src || "projectile"}|${tint}`;
  if (tintedProjectileSpriteCache.has(key)) return tintedProjectileSpriteCache.get(key);
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const tintCtx = canvas.getContext("2d");
  tintCtx.imageSmoothingEnabled = false;
  tintCtx.drawImage(image, 0, 0);
  let data;
  try {
    data = tintCtx.getImageData(0, 0, canvas.width, canvas.height);
  } catch {
    return null;
  }
  const pixels = data.data;
  for (let i = 0; i < pixels.length; i += 4) {
    const alpha = pixels[i + 3];
    if (alpha <= 8) {
      pixels[i + 3] = 0;
      continue;
    }
    const lum = (pixels[i] * 0.299 + pixels[i + 1] * 0.587 + pixels[i + 2] * 0.114) / 255;
    const out = shadeTintColor(color, lum);
    pixels[i] = out.r;
    pixels[i + 1] = out.g;
    pixels[i + 2] = out.b;
  }
  tintCtx.putImageData(data, 0, 0);
  tintedProjectileSpriteCache.set(key, canvas);
  return canvas;
}

function tintedSpriteOverlayCanvas(image, fillStyle) {
  if (!image?.complete || !image.naturalWidth || !fillStyle) return null;
  const key = `${image.currentSrc || image.src || image.dataset?.src || "sprite"}|overlay:${fillStyle}`;
  if (tintedSpriteOverlayCache.has(key)) return tintedSpriteOverlayCache.get(key);
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const tintCtx = canvas.getContext("2d");
  tintCtx.imageSmoothingEnabled = false;
  tintCtx.drawImage(image, 0, 0);
  tintCtx.globalCompositeOperation = "source-atop";
  tintCtx.fillStyle = fillStyle;
  tintCtx.fillRect(0, 0, canvas.width, canvas.height);
  tintCtx.globalCompositeOperation = "source-over";
  tintedSpriteOverlayCache.set(key, canvas);
  return canvas;
}

function itemIconCssSrc(itemOrGraphic, src = itemIconSrc(itemOrGraphic)) {
  const tintedCanvas = tintedItemIconCanvas(itemOrGraphic, src);
  if (!tintedCanvas) return src;
  tintedCanvas.dataUrl ||= tintedCanvas.toDataURL("image/png");
  return tintedCanvas.dataUrl;
}

const avatarBaseSprites = {};
const avatarEquipmentSprites = {};
const avatarBaseSources = {
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
const avatarLayerOrder = ["Cape", "Base", "Legs", "Feet", "Chest", "Waist", "Shoulders", "Neck", "Head", "Hands", "Wrist", "Left Wrist", "Right Wrist", "Off-Hand", "Main Hand"];
const avatarLayerPriority = Object.fromEntries(avatarLayerOrder.map((slot, index) => [slot, index]));
avatarLayerPriority.Belt = avatarLayerPriority.Waist;

function slugifyAssetName(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function normalizedAvatarSpritePath(path) {
  const value = String(path || "").trim();
  if (!/\.(png|webp|jpe?g|gif)$/i.test(value)) return "";
  if (value.startsWith("./assets/")) return value;
  if (value.startsWith("assets/")) return `./${value}`;
  if (value.startsWith("/assets/")) return `.${value}`;
  return "";
}

function avatarBaseSprite(avatar) {
  const key = avatarBaseSources[avatar] ? avatar : "soulreaperMale";
  if (!avatarBaseSprites[key]) {
    const image = new Image();
    image.onload = () => {};
    image.src = avatarBaseSources[key];
    avatarBaseSprites[key] = image;
  }
  return avatarBaseSprites[key];
}

function avatarEquipmentSprite(src) {
  const path = normalizedAvatarSpritePath(src);
  if (!path) return null;
  const key = path.toLowerCase();
  if (!avatarEquipmentSprites[key]) {
    const image = new Image();
    image.onload = () => {};
    image.src = path;
    avatarEquipmentSprites[key] = image;
  }
  return avatarEquipmentSprites[key];
}

function avatarGenderForAvatar(avatar) {
  return /female/i.test(String(avatar || "")) ? "female" : "male";
}

function avatarRaceForAvatar(avatar) {
  return /dwarf/i.test(String(avatar || "")) ? "dwarf" : "human";
}

function avatarVariantForAvatar(avatarOrGender = "male") {
  const value = String(avatarOrGender || "");
  if (value === "dwarfMale" || value === "dwarfFemale") return value;
  const gender = value === "female" || value === "male"
    ? value
    : avatarGenderForAvatar(value);
  const race = value === "female" || value === "male"
    ? "human"
    : avatarRaceForAvatar(value);
  if (race === "dwarf") return gender === "female" ? "dwarfFemale" : "dwarfMale";
  return gender;
}

function avatarGenderForVariant(variant) {
  return variant === "female" || variant === "dwarfFemale" ? "female" : "male";
}

function avatarEquipmentFolderForVariant(variant) {
  if (variant === "dwarfFemale") return "dwarf-female";
  if (variant === "dwarfMale") return "dwarf-male";
  return avatarGenderForVariant(variant);
}

function wristAvatarSpritePathForItem(item, avatarOrVariant, slot = "") {
  const slotSlug = slugifyAssetName(slot);
  if (slotSlug !== "left-wrist" && slotSlug !== "right-wrist") return "";
  const side = slotSlug === "left-wrist" ? "Left" : "Right";
  const variant = avatarVariantForAvatar(avatarOrVariant);
  const gender = avatarGenderForVariant(variant);
  const genderPrefix = gender === "female" ? "female" : "male";
  const legacyGenderPrefix = gender === "female" ? "Female" : "Male";
  const dwarfPrefix = variant === "dwarfFemale" ? "dwarfFemale" : variant === "dwarfMale" ? "dwarfMale" : "";
  const legacyDwarfPrefix = variant === "dwarfFemale" ? "DwarfFemale" : variant === "dwarfMale" ? "DwarfMale" : "";
  return (dwarfPrefix && (item?.[`${dwarfPrefix}${side}WristAvatarSprite`]
    || item?.weapon?.[`${dwarfPrefix}${side}WristAvatarSprite`]
    || item?.[`${side.toLowerCase()}Wrist${legacyDwarfPrefix}AvatarSprite`]
    || item?.weapon?.[`${side.toLowerCase()}Wrist${legacyDwarfPrefix}AvatarSprite`]))
    || item?.[`${genderPrefix}${side}WristAvatarSprite`]
    || item?.weapon?.[`${genderPrefix}${side}WristAvatarSprite`]
    || item?.[`${side.toLowerCase()}Wrist${legacyGenderPrefix}AvatarSprite`]
    || item?.weapon?.[`${side.toLowerCase()}Wrist${legacyGenderPrefix}AvatarSprite`]
    || item?.[`${side.toLowerCase()}WristAvatarSprite`]
    || item?.weapon?.[`${side.toLowerCase()}WristAvatarSprite`]
    || "";
}

function avatarSpritePathForItem(item, avatarOrGender = "male", slot = "") {
  const variant = avatarVariantForAvatar(avatarOrGender);
  const gender = avatarGenderForVariant(variant);
  const folder = avatarEquipmentFolderForVariant(variant);
  const slotSlug = slugifyAssetName(slot);
  const wristExplicit = normalizedAvatarSpritePath(wristAvatarSpritePathForItem(item, variant, slot));
  if (wristExplicit) return wristExplicit;
  const dwarfExplicit = variant === "dwarfFemale"
    ? item?.dwarfFemaleAvatarSprite || item?.weapon?.dwarfFemaleAvatarSprite || item?.avatarSpriteDwarfFemale || item?.weapon?.avatarSpriteDwarfFemale
    : variant === "dwarfMale"
      ? item?.dwarfMaleAvatarSprite || item?.weapon?.dwarfMaleAvatarSprite || item?.avatarSpriteDwarfMale || item?.weapon?.avatarSpriteDwarfMale
      : "";
  const accidentalDwarfWristExplicit = !dwarfExplicit && variant === "dwarfFemale" && slotSlug !== "left-wrist" && slotSlug !== "right-wrist"
    ? item?.dwarfFemaleLeftWristAvatarSprite || item?.weapon?.dwarfFemaleLeftWristAvatarSprite || item?.dwarfFemaleRightWristAvatarSprite || item?.weapon?.dwarfFemaleRightWristAvatarSprite
    : !dwarfExplicit && variant === "dwarfMale" && slotSlug !== "left-wrist" && slotSlug !== "right-wrist"
      ? item?.dwarfMaleLeftWristAvatarSprite || item?.weapon?.dwarfMaleLeftWristAvatarSprite || item?.dwarfMaleRightWristAvatarSprite || item?.weapon?.dwarfMaleRightWristAvatarSprite
      : "";
  const genderExplicit = gender === "female"
    ? item?.femaleAvatarSprite || item?.weapon?.femaleAvatarSprite || item?.avatarSpriteFemale || item?.weapon?.avatarSpriteFemale
    : item?.maleAvatarSprite || item?.weapon?.maleAvatarSprite || item?.avatarSpriteMale || item?.weapon?.avatarSpriteMale;
  const explicit = dwarfExplicit || accidentalDwarfWristExplicit || genderExplicit;
  const normalized = normalizedAvatarSpritePath(explicit || item?.avatarSprite || item?.weapon?.avatarSprite);
  if (normalized) return normalized;
  const slug = slugifyAssetName(item?.name || item?.weapon?.name || "");
  if (slug && (slotSlug === "left-wrist" || slotSlug === "right-wrist")) {
    return `./assets/sprites/player-equipment/${folder}/${slug}-${slotSlug}.png`;
  }
  return slug ? `./assets/sprites/player-equipment/${folder}/${slug}.png` : "";
}

function avatarSpritePathsForItem(item, slot = "") {
  return {
    male: avatarSpritePathForItem(item, "male", slot),
    female: avatarSpritePathForItem(item, "female", slot),
    dwarfMale: avatarSpritePathForItem(item, "dwarfMale", slot),
    dwarfFemale: avatarSpritePathForItem(item, "dwarfFemale", slot)
  };
}

function avatarSpritePathForLayer(layer, avatar) {
  const variant = avatarVariantForAvatar(avatar);
  const gender = avatarGenderForVariant(variant);
  const wristExplicit = normalizedAvatarSpritePath(wristAvatarSpritePathForItem(layer, variant, layer?.slot));
  if (wristExplicit) return wristExplicit;
  const dwarfExplicit = variant === "dwarfFemale"
    ? layer?.dwarfFemaleAvatarSprite || layer?.avatarSpriteDwarfFemale
    : variant === "dwarfMale"
      ? layer?.dwarfMaleAvatarSprite || layer?.avatarSpriteDwarfMale
      : "";
  const slotSlug = slugifyAssetName(layer?.slot);
  const accidentalDwarfWristExplicit = !dwarfExplicit && variant === "dwarfFemale" && slotSlug !== "left-wrist" && slotSlug !== "right-wrist"
    ? layer?.dwarfFemaleLeftWristAvatarSprite || layer?.dwarfFemaleRightWristAvatarSprite
    : !dwarfExplicit && variant === "dwarfMale" && slotSlug !== "left-wrist" && slotSlug !== "right-wrist"
      ? layer?.dwarfMaleLeftWristAvatarSprite || layer?.dwarfMaleRightWristAvatarSprite
      : "";
  const genderExplicit = gender === "female"
    ? layer?.femaleAvatarSprite || layer?.avatarSpriteFemale
    : layer?.maleAvatarSprite || layer?.avatarSpriteMale;
  const explicit = dwarfExplicit || accidentalDwarfWristExplicit || genderExplicit;
  const normalized = normalizedAvatarSpritePath(explicit || layer?.avatarSprite);
  if (normalized) return normalized;
  return avatarSpritePathForItem(layer, variant, layer?.slot);
}

function avatarTintProxy(item, src) {
  const channels = {
    ...(item?.weapon?.avatarSpriteChannels || {}),
    ...(item?.avatarSpriteChannels || {})
  };
  return {
    name: item?.name,
    graphic: src,
    graphicTint: item?.avatarSpriteTint || item?.weapon?.avatarSpriteTint || "",
    graphicChannels: channels
  };
}

function avatarLayerImage(item, avatar) {
  const src = avatarSpritePathForLayer(item, avatar);
  if (!src) return null;
  const tinted = tintedItemIconCanvas(avatarTintProxy(item, src), src);
  if (tinted) return tinted;
  return avatarEquipmentSprite(src);
}

function slotSkipsAvatarLayer(slot, item = null) {
  const slotName = String(slot || "");
  const itemName = String(item?.name || item?.weapon?.name || "");
  return /ear|finger|ring|neck/i.test(slotName) || /bracelet|necklace/i.test(itemName);
}

function equipmentVisualFromItem(slot, item) {
  if (!item || slotSkipsAvatarLayer(slot || item.slot, item)) return null;
  const paths = avatarSpritePathsForItem(item, slot || item.slot);
  if (!paths.male && !paths.female && !paths.dwarfMale && !paths.dwarfFemale) return null;
  return {
    slot: slot || item.slot || "",
    name: item.name || item.weapon?.name || "",
    weapon: Boolean(item.weapon),
    shield: Boolean(item.shield),
    heldAvatarItem: Boolean(item.weapon) || (slot || item.slot) === "Off-Hand",
    graphicSize: item.graphicSize ?? item.weapon?.graphicSize ?? 30,
    maleAvatarSprite: paths.male,
    femaleAvatarSprite: paths.female,
    dwarfMaleAvatarSprite: paths.dwarfMale,
    dwarfFemaleAvatarSprite: paths.dwarfFemale,
    avatarSprite: paths.male || paths.female || paths.dwarfMale || paths.dwarfFemale,
    avatarSpriteTint: item.avatarSpriteTint || item.weapon?.avatarSpriteTint || "",
    avatarSpriteChannels: {
      ...(item.weapon?.avatarSpriteChannels || {}),
      ...(item.avatarSpriteChannels || {})
    }
  };
}

function playerEquipmentVisuals(player) {
  const visuals = [];
  for (const [slot, item] of Object.entries(player?.equippedItems || {})) {
    const visual = equipmentVisualFromItem(slot, item);
    if (visual) visuals.push(visual);
  }
  if (!visuals.some(visual => visual.slot === "Main Hand") && player?.weapon) {
    const visual = equipmentVisualFromItem("Main Hand", { ...player.weapon, weapon: player.weapon, slot: "Main Hand" });
    if (visual) visuals.push(visual);
  }
  return visuals;
}

function avatarLayersForEntity(entity) {
  if (entity === game.player) return playerEquipmentVisuals(entity);
  if (Array.isArray(entity?.equipmentVisuals)) return entity.equipmentVisuals;
  return playerEquipmentVisuals(entity);
}

function avatarLayerSortValue(layer) {
  const rawSlot = String(layer?.slot || "");
  const lowerSlot = rawSlot.toLowerCase();
  const slot = lowerSlot === "belt" ? "Waist" : avatarLayerOrder.find(candidate => candidate.toLowerCase() === lowerSlot) || rawSlot;
  if (slot === "Cape") return -1;
  return avatarLayerPriority[slot] ?? avatarLayerOrder.length;
}

function drawableAvatarImage(image) {
  if (!image) return false;
  if (image instanceof HTMLCanvasElement) return Boolean(image.width && image.height);
  return Boolean(image.complete && (image.naturalWidth || image.width));
}

function avatarEquipmentDrawOffset(avatar, size) {
  return { x: 0, y: 0 };
}

function isHeldAvatarLayer(layer) {
  return Boolean(layer?.heldAvatarItem || layer?.weapon || layer?.slot === "Off-Hand");
}

function heldAvatarLayerAnchor(layer, avatar, size, layerX, layerY) {
  const offHand = layer?.slot === "Off-Hand";
  const scale = size / 128;
  const x = layerX + size * (offHand ? 0.29 : 0.71);
  const y = layerY + size * 0.59;
  return {
    x: x + (offHand ? -3 : 3) * scale,
    y: y + (offHand ? 1 : 0) * scale
  };
}

function drawHeldAvatarLayer(image, layer, avatar, size, layerX, layerY) {
  const heldSize = itemGraphicSize(layer, 30);
  const anchor = heldAvatarLayerAnchor(layer, avatar, size, layerX, layerY);
  ctx.save();
  ctx.translate(anchor.x, anchor.y);
  if (layer.slot === "Off-Hand" && layer.weapon) ctx.scale(-1, 1);
  ctx.drawImage(image, -heldSize / 2, -heldSize / 2, heldSize, heldSize);
  ctx.restore();
}

function drawPlayerAvatar(entity, avatar, radius, alpha = 1) {
  const size = radius * 3.45;
  const base = avatarBaseSprite(avatar);
  const layers = avatarLayersForEntity(entity).slice().sort((a, b) => avatarLayerSortValue(a) - avatarLayerSortValue(b));
  const layerOffset = avatarEquipmentDrawOffset(avatar, size);
  const layerX = -size / 2 + layerOffset.x;
  const layerY = -size / 2 - 5 + layerOffset.y;
  const baseX = -size / 2;
  const baseY = -size / 2 - 5;
  ctx.save();
  ctx.globalAlpha = alpha;
  setSpriteSmoothing(true);
  for (const layer of layers.filter(layer => layer.slot === "Cape")) {
    const image = avatarLayerImage(layer, avatar);
    if (drawableAvatarImage(image)) ctx.drawImage(image, layerX, layerY, size, size);
  }
  if (base?.complete && base.naturalWidth) {
    ctx.drawImage(base, baseX, baseY, size, size);
  } else {
    const fallback = spriteForAvatar(avatar);
    if (fallback?.complete && fallback.naturalWidth) ctx.drawImage(fallback, baseX, baseY, size, size);
  }
  for (const layer of layers.filter(layer => layer.slot !== "Cape")) {
    const image = avatarLayerImage(layer, avatar);
    if (!drawableAvatarImage(image)) continue;
    if (isHeldAvatarLayer(layer)) {
      drawHeldAvatarLayer(image, layer, avatar, size, layerX, layerY);
    } else {
      ctx.drawImage(image, layerX, layerY, size, size);
    }
  }
  ctx.restore();
}

const realmInfo = {
  Mortal: { color: "#b58a62", mark: "HAND", strongVs: [], weakVs: [] },
  Ethereal: { color: "#5f94d9", mark: "EYE", strongVs: ["Infernal"], weakVs: ["Sylvan", "Ethereal"] },
  Celestial: { color: "#d9c85f", mark: "SUN", strongVs: ["Umbral", "Infernal"], weakVs: ["Sylvan", "Celestial"] },
  Infernal: { color: "#d84e42", mark: "FIRE", strongVs: ["Sylvan"], weakVs: ["Ethereal", "Infernal"] },
  Sylvan: { color: "#68a85e", mark: "TREE", strongVs: ["Ethereal"], weakVs: ["Infernal", "Sylvan"] },
  Umbral: { color: "#070707", mark: "SKULL", strongVs: ["Sylvan"], weakVs: ["Celestial", "Umbral"] }
};

const AREA_NAME = "The Ganderswood";
const FEN_AREA_NAME = "Ganderswood Fen";
const FENHOLD_AREA_NAME = "Fenhold";
const RAT_DEN_AREA_NAME = "Rat Den";
const GLADE_AREA_NAME = "Ganderswood Glade";
const LAKE_ROGA_AREA_NAME = "Lake Roga";
const EVERMIST_GLADE_NAME = "Evermist Glade";
const WHISPERSPRING_AREA_NAME = "Whisperspring";
const GRIMSWOOD_PATH_NAME = "Grimswood Pass";
const WYNDHELM_AREA_NAME = "Wyndhelm";
const WYNDHELM_CATHEDRAL_AREA_NAME = "Wyndhelm Cathedral";
const RATZKHAN_AREA_NAME = "Ratzkhan";
const DIARRH_REALM_AREA_NAME = "Diarrh Realm";
const BEAR_CAVE_AREA_NAME = "Bear Cave";
const ROGABOGU_AREA_NAME = "Rogabogu";
const YRGMA_DIM_AREA_NAME = "Yrgma Dim";
const DWARF_START_DUNGEON_ID = "yrgma-dim";
const DWARF_START_CELL = { x: 15, y: 23 };
const CROWING_FIELDS_AREA_NAME = "The Crowing Fields";
const HARKHAR_HIGHLANDS_AREA_NAME = "Harkhar Highlands";
const HARMUSH_LAGH_AREA_NAME = "Harmush Lagh";
const HIGHSTONE_PASS_AREA_NAME = "Highstone Pass";
const HARGA_VOAGH_AREA_NAME = "Harga Voagh";
const FIRECRY_PEAK_AREA_NAME = "Firecry Peak";
const BADGERIA_AREA_NAME = "Badgeria";
const GOBBA_AREA_NAME = "Gobba";
const WASTES_OF_KEBAAN_AREA_NAME = "Wastes of Kebaan";
const KEBAAN_OASIS_AREA_NAME = "Kebaan Oasis";
const RUINS_OF_KEBAAN_AREA_NAME = "Ruins of Kebaan";
const GANDERSVILLE_AREA_NAME = "Gandersville";
const RANGE_UNIT = 34;
const SPELL_TARGET_LOCK_PADDING = RANGE_UNIT;
const TRAINER_WINDOW_CLOSE_RANGE = RANGE_UNIT * 5;
const SHOP_WINDOW_CLOSE_RANGE = RANGE_UNIT * 5;
const UNIT_SIZE_SCALE = 1.5;
const HOSTILE_TRIGGER_RANGE = 7;
const LEASH_RETURN_RANGE = 42;
const ENEMY_SPATIAL_CELL_SIZE = HOSTILE_TRIGGER_RANGE * RANGE_UNIT;
const ELITE_RESPAWN_SECONDS = 900;
const BOSS_RESPAWN_SECONDS = 900;
const spellSlotUnlocks = [
  { slots: 2, level: 6, cost: 50 },
  { slots: 3, level: 10, cost: 100 },
  { slots: 4, level: 14, cost: 200 },
  { slots: 5, level: 18, cost: 400 },
  { slots: 6, level: 22, cost: 800 },
  { slots: 7, level: 26, cost: 1600 }
];
sprites.ground.ganderswood.src = "./assets/ground/ganderswood.png";
sprites.ground.ganderswoodFen.src = "./assets/ground/muddyfield.png";
sprites.ground.ratDen.src = "./assets/ground/rat-den.png";
sprites.ground.ratzkhan.src = "./assets/ground/ratzkhan.png";
sprites.ground.ratzkhanChamber.src = "./assets/ground/ratzkhan-chamber.png";
sprites.ground.slimepool.src = "./assets/ground/slimepool.png";
sprites.ground.ganderswoodGlade.src = "./assets/ground/ganderswood-glade.png";
sprites.ground.whisperspring.src = "./assets/ground/whisperspring.png";
sprites.ground.whisperspringWall.src = "./assets/ground/whisperspring-wall.png";
sprites.ground.cathFloor.src = "./assets/ground/cath_floor.png";
sprites.ground.cathCarpet.src = "./assets/ground/cath-carpet.png";
sprites.ground.mageGuildCarpet.src = "./assets/ground/mage-guild-carpet.png";
sprites.ground.hereticCarpet.src = "./assets/ground/heretic-carpet.png";
sprites.ground.stoneTiles.src = "./assets/ground/stone-tiles.png";
sprites.ground.greyTiles.src = "./assets/ground/grey-tiles.png";
sprites.ground.oldwood.src = "./assets/ground/oldwood.png";
sprites.ground.desertWall.src = "./assets/ground/desert-wall.png";
sprites.ground.desertRuinsFloor.src = "./assets/ground/desert-ruins-floor.png";
sprites.ground.desertRuinsRoof.src = "./assets/ground/desert-ruins-roof.png";
sprites.ground.whisperspringVoid.src = "./assets/ground/whisperspring-void.png";
sprites.ground.water.src = "./assets/ground/water.png";
sprites.ground.lava.src = "./assets/ground/lava.png";
sprites.ground.ash.src = "./assets/ground/ash.png";
sprites.ground.houseWall.src = "./assets/ground/house-wall.png";
sprites.ground.woodenPosts.src = "./assets/ground/woodenposts.png";
sprites.ground.houseFloor.src = "./assets/ground/dark-wood-floor.png";
sprites.ground.houseRoof.src = "./assets/ground/house-roof.png";
sprites.ground.greyRoof.src = "./assets/ground/grey-roof.png";
sprites.ground.circularHouseRoof.src = "./assets/ground/circular-house-roof.png";
sprites.ground.thatchedCircleRoof.src = "./assets/ground/thatched-circle-roof.png";
sprites.ground.theodoraRoof.src = "./assets/ground/theodora-roof.png";
sprites.ground.spookyRoof.src = "./assets/ground/spookyrooftop.png";
sprites.ground.grimswoodPass.src = "./assets/ground/grimswood-pass.png";
sprites.ground.wyndhelm.src = "./assets/ground/wyndhelm.png";
sprites.ground.crowingFields.src = "./assets/ground/crowing-fields.png";
sprites.ground.gobba.src = "./assets/ground/gobba.png";
sprites.ground.gobbaStronghold.src = "./assets/ground/gobba-stronghold.png";
sprites.ground.sand.src = "./assets/ground/sand.png";
sprites.ground.oasis.src = "./assets/ground/oasis.png";
sprites.ground.evermistGlade.src = "./assets/ground/evermist-glade.png";

const spawnRates = {
  None: 0,
  Low: 0.06,
  Normal: 0.18,
  High: 0.36,
  Insane: 0.84
};
const spawnAmountMultipliers = {
  "Very Low": 0.25,
  Low: 0.5,
  Moderate: 0.75,
  Normal: 1,
  Busy: 1.25,
  Crowded: 1.5,
  Intense: 2
};
const BASE_AMBIENT_MOBS_PER_PLAYER = 28;
const COLLISION_CELL_SIZE = 220;
const texturePatternCache = new WeakMap();
const customSpriteCache = new Map();
const groundCache = {
  canvas: document.createElement("canvas"),
  ctx: null,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  map: null,
  valid: false
};
groundCache.ctx = groundCache.canvas.getContext("2d");

function texturePatternFor(image) {
  if (!image?.complete || !image.naturalWidth) return null;
  let patternsByContext = texturePatternCache.get(image);
  if (!patternsByContext) {
    patternsByContext = new WeakMap();
    texturePatternCache.set(image, patternsByContext);
  }
  let pattern = patternsByContext.get(ctx);
  if (!pattern) {
    pattern = ctx.createPattern(image, "repeat");
    if (pattern) patternsByContext.set(ctx, pattern);
  }
  return pattern;
}

Object.values(sprites.ground).forEach(image => {
  image.addEventListener("load", invalidateGroundCache);
});

function spriteFromPath(src) {
  if (!src) return null;
  if (!customSpriteCache.has(src)) {
    const image = new Image();
    image.src = src;
    image.addEventListener("load", invalidateGroundCache);
    customSpriteCache.set(src, image);
  }
  return customSpriteCache.get(src);
}

const weaponTemplates = window.SoulreaperItems?.weaponTemplates || {};
const WHISPERSPRING_LAYOUT_RECTS = "78,15,38,5,g;121,15,15,5,s;50,18,7,1,s;48,19,2,1,s;50,19,7,1,b;57,19,2,1,s;46,20,2,1,s;48,20,11,1,b;59,20,2,1,s;78,20,5,29,g;83,20,53,5,s;45,21,2,1,s;47,21,14,1,b;61,21,1,1,s;44,22,2,1,s;46,22,16,1,b;62,22,1,2,s;44,23,1,1,s;45,23,17,1,b;43,24,1,2,s;44,24,19,2,b;63,24,1,2,s;83,25,5,19,s;88,25,28,6,g;121,25,15,5,s;42,26,1,6,s;43,26,21,6,b;64,26,1,6,s;88,31,11,13,g;43,32,1,2,s;44,32,19,2,b;63,32,1,2,s;44,34,1,1,s;45,34,17,1,b;62,34,1,2,s;44,35,2,1,s;46,35,16,1,b;45,36,2,1,s;47,36,14,1,b;61,36,1,1,s;46,37,2,1,s;48,37,11,1,b;59,37,2,1,s;48,38,2,1,s;50,38,7,1,b;57,38,2,1,s;104,38,11,6,s;50,39,7,1,s;51,40,5,14,s;83,44,32,5,s;78,49,21,9,g;104,49,11,14,s;42,54,23,2,s;42,56,2,27,s;44,56,19,36,b;63,56,2,36,s;80,63,35,5,s;80,68,5,8,s;75,76,40,17,s;11,77,17,6,s;11,83,33,5,s;11,88,17,6,s;42,88,2,4,s;42,92,23,2,s;104,93,5,15,s;17,94,5,14,s;11,108,17,6,s;43,108,40,6,s;98,108,17,4,s;94,112,25,2,s;11,114,108,5,s;11,119,17,6,s;43,119,40,6,s;94,119,25,8,s;59,125,8,16,s;51,141,24,24,s;59,165,8,8,s";
const shopkeeperStartingInventory = window.SoulreaperItems?.shopkeeperStartingInventory || [];
const shopkeeperStartingConsumables = window.SoulreaperItems?.shopkeeperStartingConsumables || [];
const shopkeeperStartingScrolls = window.SoulreaperItems?.shopkeeperStartingScrolls || [];
const sylvanScrolls = [
  "Scroll of Tangle Vine",
  "Scroll of Spirit of Avia",
  "Scroll of Thorn Shield",
  "Scroll of Chlorophyll",
  "Scroll of Wooden Skin",
  "Scroll of Faerie Fire",
  "Scroll of Faerie Dust",
  "Scroll of Tame Beast"
];
const realms = ["Mortal", "Ethereal", "Celestial", "Infernal", "Sylvan", "Umbral"];
const realmProgressRealms = realms;
const craftingSkills = ["Smithing", "Leatherworking", "Tailoring", "Alchemy", "Jewelry"];
const craftingStations = {
  "smelting-furnace": { title: "Smelting", stationNames: ["Smelting", "Smelting Furnace"], skills: ["Smithing"] },
  "anvil": { title: "Smithing", stationNames: ["Smithing", "Anvil"], skills: ["Smithing"] },
  "loom": { title: "Weaving", stationNames: ["Weaving", "Loom"], skills: ["Tailoring"] },
  "dress-form-mannequin": { title: "Tailoring", stationNames: ["Tailoring", "Dress Form Mannequin"], skills: ["Tailoring"] },
  "potionmaking-table": { title: "Alchemy", stationNames: ["Alchemy", "Potionmaking Table"], skills: ["Alchemy"] },
  "tanning-drum": { title: "Tanning", stationNames: ["Tanning", "Tanning Drum"], skills: ["Leatherworking"] },
  "crafting-table": { title: "Crafting Table", stationNames: ["Crafting Table"], skills: ["Leatherworking", "Jewelry"] }
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

const equipmentDisplaySlots = [
  { slot: "Main Hand", label: "Main Hand", col: 2, row: 1 },
  { slot: "Right Ear", label: "Ear", col: 3, row: 1, small: true },
  { slot: "Head", label: "Head", col: 4, row: 1 },
  { slot: "Left Ear", label: "Ear", col: 5, row: 1, small: true },
  { slot: "Off-Hand", label: "Off-Hand", col: 6, row: 1 },
  { slot: "Left Finger", label: "Finger", col: 1, row: 2 },
  { slot: "Left Wrist", label: "Wrist", col: 2, row: 2 },
  { slot: "Neck", label: "Neck", col: 3, row: 2 },
  { slot: "Shoulders", label: "Shoulders", col: 4, row: 2 },
  { slot: "Right Wrist", label: "Wrist", col: 5, row: 2 },
  { slot: "Right Finger", label: "Finger", col: 6, row: 2 },
  { slot: "Hands", label: "Gloves", col: 2, row: 3 },
  { slot: "Chest", label: "Chest", col: 4, row: 3 },
  { slot: "Cape", label: "Back", col: 6, row: 3 },
  { slot: "Waist", label: "Waist", col: 4, row: 4 },
  { slot: "Legs", label: "Legs", col: 3, row: 5 },
  { slot: "Feet", label: "Feet", col: 5, row: 5 }
];

function formatNumber(value) {
  const rounded = roundUpTenth(value);
  if (Number.isInteger(rounded)) return String(rounded);
  return rounded.toFixed(1).replace(/\.0$/, "");
}

function roundUpTenth(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return Math.ceil((numeric - Number.EPSILON) * 10) / 10;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function makeEnemySpell(spellEntry, lvl) {
  const name = typeof spellEntry === "string" ? spellEntry : spellEntry?.name;
  if (!name) return null;
  const spell = makeSpell(name, lvl);
  if (!spell) return null;
  spell.lvl = lvl;
  spell.timer = spell.cooldown ? randomBetween(0.4, spell.cooldown) : 0;
  return spell;
}

const starterSpells = window.SoulreaperSpells?.starterSpells || [];
normalizeRealmData(starterSpells);

function spellTemplateByName(name) {
  return starterSpells.find(spell => spell.name === name);
}

function makeSpell(name, lvl = 1) {
  const template = spellTemplateByName(name);
  if (!template) return null;
  const overrides = devSpellConfigs[name] || {};
  return {
    ...template,
    ...overrides,
    cast: template.cast,
    castAt: template.castAt,
    lvl,
    timer: 0
  };
}

function savedSpellLevel(name) {
  return game.player.spellLevels?.[name] || 1;
}

function saveSpellLevel(spell) {
  if (!spell?.name || spell.static) return;
  game.player.spellLevels ||= {};
  game.player.spellLevels[spell.name] = Math.max(savedSpellLevel(spell.name), spellLevel(spell));
}

function makePlayerSpell(name, lvl = null) {
  const spell = makeSpell(name, lvl ?? savedSpellLevel(name));
  if (!spell) return null;
  spell.cooldownMultiplier = game.player.spellCooldownMods?.[name] || 1;
  spell.timer = playerSpellTimer(name);
  return spell;
}

function isPassivePreparedSpell(spell) {
  return Boolean(spell?.passive);
}

function preparedPassiveSpellEntry() {
  return (game.player.spells || [])
    .map((spell, index) => ({ spell, index }))
    .find(({ spell }) => isPassivePreparedSpell(spell)) || null;
}

function preparedActiveSpellEntries() {
  return (game.player.spells || [])
    .map((spell, index) => ({ spell, index }))
    .filter(({ spell }) => spell && !isPassivePreparedSpell(spell));
}

function preparedActiveSpellCount() {
  return preparedActiveSpellEntries().length;
}

function preparedActiveSpellEntryBySlot(slotIndex) {
  return preparedActiveSpellEntries()[slotIndex] || null;
}

function enforceSinglePassiveSpell() {
  if (!Array.isArray(game.player.spells)) return false;
  let seen = false;
  let changed = false;
  game.player.spells = game.player.spells.filter(spell => {
    if (!isPassivePreparedSpell(spell)) return true;
    if (!seen) {
      seen = true;
      return true;
    }
    saveSpellLevel(spell);
    changed = true;
    return false;
  });
  return changed;
}

function playerSpellTimer(spellOrName) {
  const name = typeof spellOrName === "string" ? spellOrName : spellOrName?.name;
  if (!name) return 0;
  return Math.max(0, Number(game.player.spellTimers?.[name]) || 0);
}

function setPlayerSpellTimer(spellOrName, value) {
  const name = typeof spellOrName === "string" ? spellOrName : spellOrName?.name;
  if (!name) return;
  game.player.spellTimers ||= {};
  const timer = Math.max(0, Number(value) || 0);
  if (timer > 0) game.player.spellTimers[name] = timer;
  else delete game.player.spellTimers[name];
  for (const activeSpell of game.player.spells || []) {
    if (activeSpell.name === name) activeSpell.timer = timer;
  }
}

function setSpellOnCooldown(spell) {
  setPlayerSpellTimer(spell, spellCooldown(spell));
}

function updatePlayerSpellTimers(dt) {
  game.player.spellTimers ||= {};
  for (const [name, value] of Object.entries(game.player.spellTimers)) {
    const next = Math.max(0, Number(value || 0) - dt);
    if (next > 0) game.player.spellTimers[name] = next;
    else delete game.player.spellTimers[name];
  }
  for (const spell of game.player.spells || []) {
    spell.timer = playerSpellTimer(spell);
  }
}

function startSpellMemorization(spell) {
  if (!spell || spell.passive) return false;
  spell.memorizing = SPELL_MEMORIZATION_SECONDS;
  spell.memorizationDuration = SPELL_MEMORIZATION_SECONDS;
  spell.memorizationReadyFlash = 0;
  spell.memorizationReadyFlashed = false;
  spellHudSignature = "";
  return true;
}

function clearSpellMemorization(spell) {
  if (!spell) return false;
  delete spell.memorizing;
  delete spell.memorizationDuration;
  delete spell.memorizationReadyFlash;
  delete spell.memorizationReadyFlashed;
  return true;
}

function spellMemorizing(spell) {
  return Math.max(0, Number(spell?.memorizing) || 0);
}

function updateSpellMemorization(dt) {
  let changed = false;
  for (const spell of game.player.spells || []) {
    if (!spell) continue;
    if (spell.memorizationReadyFlash > 0) {
      spell.memorizationReadyFlash = Math.max(0, Number(spell.memorizationReadyFlash) - dt);
      if (spell.memorizationReadyFlash <= 0) changed = true;
    }
    if (spellMemorizing(spell) <= 0) continue;
    const next = Math.max(0, spellMemorizing(spell) - dt);
    spell.memorizing = next;
    if (next <= 0 && !spell.memorizationReadyFlashed) {
      spell.memorizationReadyFlashed = true;
      spell.memorizationReadyFlash = 1.2;
      changed = true;
    }
  }
  if (changed) spellHudSignature = "";
}

function normalizeStats(stats = {}) {
  const usesNewNames = stats.BLOCK !== undefined || stats.FOCUS !== undefined || stats.DEF_NEW !== undefined;
  return {
    HP: stats.HP ?? 5,
    ATK: stats.ATK ?? 0,
    DEF: stats.DEF_NEW ?? stats.ARMOR ?? (usesNewNames ? stats.DEF ?? 0 : stats.DEF_MITIGATION ?? 0),
    SPD: stats.SPD ?? 0,
    AGL: stats.AGL ?? 0,
    INT: stats.INT ?? 0,
    FOCUS: stats.FOCUS ?? stats.LUCK ?? 0,
    BLOCK: stats.BLOCK ?? (usesNewNames ? 0 : stats.DEF ?? 0),
    REGEN: stats.REGEN ?? 0,
    RESIST: stats.RESIST ?? 0
  };
}

function normalizeItemStats(stats = {}) {
  const normalized = {};
  for (const [stat, value] of Object.entries(stats)) {
    const key = stat === "ARMOR" ? "DEF" : stat === "LUCK" ? "FOCUS" : stat;
    normalized[key] = (normalized[key] || 0) + value;
  }
  return normalized;
}

function normalizeWeapon(raw = {}, name = "Rat Claw") {
  const catalogWeapon = weaponTemplates[raw.name || name];
  const source = catalogWeapon || raw;
  const weaponName = String(source.name || raw.name || name);
  const isWand = weaponName.toLowerCase().includes("wand") || String(source.category || "").toLowerCase() === "wand";
  const dice = source.dice || (source.min !== undefined && source.max !== undefined
    ? `${Math.max(0, source.min)}-${Math.max(0, source.max)}`
    : "1D4");
  const speed = source.speed ?? source.cooldownHundredths ?? (source.cooldown !== undefined ? source.cooldown * 100 : 100);
  return {
    name: source.name || raw.name || name,
    realm: normalizeRealm(source.realm || "Mortal"),
    hands: source.hands || source.type || "One-Handed",
    type: source.hands || source.type || "One-Handed",
    dmgType: source.dmgType || source.damageType || "Physical",
    dice,
    speed,
    range: source.range ?? 1,
    animation: source.animation || (source.range > 1 ? "projectile" : "claw"),
    soundEffect: source.soundEffect,
    projectileSpeed: source.projectileSpeed ?? source.spd ?? (isWand ? 5 : 10),
    projectileAnimation: source.projectileAnimation || (isWand ? "magic missile" : "ball"),
    projectileSprite: source.projectileSprite,
    projectileSize: source.projectileSize,
    projectileTint: source.projectileTint,
    projectileGlow: source.projectileGlow,
    projectileGlowColor: source.projectileGlowColor,
    statBuffs: source.statBuffs || source.stats || {},
    ammo: source.ammo || (source.category === "Bow" ? "Bronze Arrow" : null),
    category: source.category,
    weaponTypes: source.weaponTypes,
    effects: source.effects || {},
    goldValue: source.goldValue,
    lore: source.lore,
    graphic: source.graphic || "question mark",
    graphicSize: source.graphicSize ?? 30,
    graphicTint: source.graphicTint,
    graphicChannels: source.graphicChannels
  };
}

function rollDice(dice = "1D4") {
  const text = String(dice).trim();
  const additiveMatch = text.match(/^(.+?)\s*\+\s*(\d+(?:\.\d+)?)$/);
  if (additiveMatch) return rollDice(additiveMatch[1]) + Number(additiveMatch[2]);
  const rangeMatch = text.match(/^(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)$/);
  if (rangeMatch) return randomInt(Math.floor(Number(rangeMatch[1])), Math.floor(Number(rangeMatch[2])));
  const match = text.match(/^(\d+)d(\d+)$/i);
  const count = match ? Number(match[1]) : 1;
  const sides = match ? Number(match[2]) : 4;
  let total = 0;
  for (let i = 0; i < count; i += 1) total += randomInt(1, sides);
  return total;
}

const statDescriptions = {
  HP: "Health Points. If this reaches 0, your Soulreaper falls. Maximum HP increases automatically when you level.",
  ATK: "Attack. Adds damage to weapon attacks.",
  DEF: "Defense. Reduces incoming Physical damage.",
  SPD: "Speed. Increases movement speed.",
  AGL: "Agility. Positive AGL reduces weapon attack interval; negative AGL slows base attack speed by 1% per point below zero.",
  INT: "Intellect. Positive INT increases spell damage by 1% per point; negative INT lowers magic damage by 1% per point below zero.",
  FOCUS: "Focus. Each point gives +1% chance to critically hit for 250% damage.",
  BLOCK: "Block. Each point gives +1% chance to block an incoming attack.",
  RESIST: "Resist. Reduces incoming Magical damage from each Realm.",
  REGEN: "Regeneration. Restores HP over time. Each point currently restores 1 HP every 5 seconds.",
  Virtue: "Virtue. Killing Evil units raises it, while killing Good units lowers it. At 10 or higher you are Good; at -10 or lower you are Evil."
};

const initialPlayerState = {
  name: "Soulreaper",
  avatar: "soulreaperMale",
  x: 0,
  y: 0,
  radius: 16 * UNIT_SIZE_SCALE,
  level: 1,
  xp: 0,
  gold: 0,
  nextXp: 30,
  hp: 20,
  maxHp: 20,
  stats: { HP: 20, ATK: 0, DEF: 0, SPD: 0, AGL: 0, INT: 0, FOCUS: 0, BLOCK: 0, REGEN: 1, RESIST: 0 },
  resistances: {},
  virtue: 0,
  realm: "Mortal",
  incorporeal: false,
  attackTimer: 0,
  offHandAttackTimer: 0,
  regenTimer: 5,
  rooted: 0,
  rootVisual: "",
  stunned: 0,
  mortified: 0,
  mortifySourceX: 0,
  mortifySourceY: 0,
  dots: [],
  statMods: [],
  inventory: Array(12).fill(null),
  bank: {
    gold: 0,
    inventory: Array(15).fill(null)
  },
  equippedItems: {},
  learnedSpells: [],
  newSpellAlerts: [],
  spellLevels: {},
  spellCooldownMods: {},
  spellTimers: {},
  spellLineups: Array(SPELL_LINEUP_COUNT).fill(null),
  realmProgress: {},
  craftingProgress: {},
  factionStandings: {},
  gvadaStarterMagic: null,
  sybilStarterMagic: null,
  lastDeath: null,
  spells: [],
  soulsActive: 0,
  spellSlotsActive: 1,
  equipment: {
    "Main Hand": "Empty",
    "Off-Hand": "Empty",
    Head: "Empty",
    Chest: "Empty",
    Legs: "Empty",
    Shoulders: "Empty",
    Hands: "Empty",
    Feet: "Empty",
    "Right Ear": "Empty",
    "Left Ear": "Empty",
    Neck: "Empty",
    "Left Wrist": "Empty",
    "Right Wrist": "Empty",
    Waist: "Empty",
    "Right Finger": "Empty",
    "Left Finger": "Empty",
    Cape: "Empty"
  },
  weapon: null
};

const game = {
  running: false,
  keys: new Set(),
  last: performance.now(),
  shake: 0,
  player: structuredClone(initialPlayerState),
  enemies: [],
  eliteRespawns: [],
  projectiles: [],
  effects: [],
  floatingTexts: [],
  playerSpeech: null,
  npcSpeech: [],
  groundItems: [],
  logs: [],
  logView: "all",
  chatChannel: "say",
  autoFollowTargetId: "",
  chronicleArea: null,
  map: null,
  enemySpatialGrid: null,
  enemySpatialCount: 0,
  enemySpatialVersion: 0,
  enemySpatialGridVersion: -1,
  startPoint: null,
  mode: null,
  shopTab: "Equipment",
  spellbookTab: "all",
  skillsTab: "Realms",
  activeCraftingStation: null,
  craftingUsableOnly: false,
  pendingSpellAssignment: null,
  quests: [],
  completedQuests: [],
  questLogAlert: false,
  realmTabAlert: false,
  pointerInArena: false,
  pausedByPointer: false,
  uiDirty: true,
  soundVolume: loadSoundVolume(),
  account: {
    username: "",
    characters: [],
    selectedCharacterId: "",
    race: "human",
    sex: "male",
    creatingCharacter: false,
    message: "",
    loading: false
  },
  lastPlayerDamageAt: 0,
  pestilentAuraTick: 0,
  auraRealmXpTimers: {},
  spellHudCooldownBars: [],
  spellHudMemorizationBars: [],
  spellHudPills: [],
  selectedTarget: null,
  pendingLevelChoices: null,
  loopErrorLogged: false,
  shopContactLatch: false,
  trainerContactLatch: false,
  friendlyNpcContactLatches: {},
  genericQuestNpcContactLatches: {},
  gvadaContactLatch: false,
  juanTaboContactLatch: false,
  lordYantosContactLatch: false,
  lordRaufContactLatch: false,
  pleezixContactLatch: false,
  sharleneContactLatch: false,
  mordrenContactLatch: false,
  cecilContactLatch: false,
  theodoraContactLatch: false,
  slayleighContactLatch: false,
  guardContactLatch: false,
  bankerContactLatch: false,
  dialoguePages: [],
  dialoguePageIndex: 0,
  chatOpen: false,
  devtoolsEnabled: false,
  godMode: false,
  ghostMode: false,
  inspectMobs: false,
  showCollision: false,
  mapVisible: true,
  mapZoom: DEFAULT_MAP_ZOOM,
  devItemShop: false,
  activeShopkeeper: null,
  activeBanker: null,
  activeTrainer: null,
  pointTargetArea: null,
  pendingSpellTarget: null,
  portalContactLatch: null,
  activePetMenuId: null,
  pendingPetAttackId: null,
  mouseWorld: null,
  renderHoveredEnemy: null,
  multiplayer: {
    socket: null,
    id: null,
    connected: false,
    peers: new Map(),
    pendingPickups: new Set(),
    lastSent: 0,
    lastSnapshot: "",
    lastWorldStateSent: 0,
    lastWorldStateSnapshot: "",
    worldName: "",
    worldSeed: "",
    worldRevision: 0,
    pendingAction: "",
    hostId: null,
    isHost: false,
    sentInitialWorldState: false,
    latencyMs: null,
    lastPingSent: 0,
    pendingPingId: null,
    pendingPingAt: 0,
    availableWorlds: [],
    selectedWorldName: "",
    worldListLoading: false,
    worldListError: "",
    team: null,
    pendingTeamInvite: null,
    teamWindowX: 18,
    teamWindowY: 96,
    teamDragging: null,
    trade: null,
    tradeSelectedSlots: new Set(),
    tradeGold: 0
  }
};

const FLOATING_LAYOUT_STORAGE_KEY = "soulreaperFloatingLayout.v1";
const floatingDefaults = {
  bar: { x: Math.max(8, Math.floor(window.innerWidth / 2) - 165), y: 10, width: 330, height: 40, locked: false, open: true },
  character: { x: 14, y: 58, width: 286, height: 430, locked: false, open: true },
  inventory: { x: 14, y: 502, width: 300, height: 330, locked: false, open: true },
  spells: { x: Math.max(320, Math.floor(window.innerWidth / 2) - 180), y: Math.max(58, window.innerHeight - 150), width: 360, height: 96, locked: false, open: true },
  target: { x: Math.max(320, window.innerWidth - 330), y: 290, width: 260, height: 176, locked: false, open: true },
  effects: { x: Math.max(320, window.innerWidth - 330), y: 478, width: 260, height: 104, locked: false, open: true },
  pet: { x: Math.max(320, window.innerWidth - 330), y: 594, width: 260, height: 170, locked: false, open: false },
  minimap: { x: Math.max(320, window.innerWidth - 320), y: 58, width: 292, height: 220, locked: false, open: true },
  spellbook: { x: Math.max(340, Math.floor(window.innerWidth / 2) - 260), y: 80, width: 560, height: 520, locked: false, open: false },
  questlog: { x: Math.max(360, window.innerWidth - 390), y: 300, width: 360, height: 420, locked: false, open: false },
  chronicle: { x: Math.max(330, Math.floor(window.innerWidth / 2) - 260), y: Math.max(360, window.innerHeight - 245), width: 560, height: 205, locked: false, open: true },
  options: { x: Math.max(320, Math.floor(window.innerWidth / 2) - 140), y: 84, width: 280, height: 170, locked: false, open: false },
  shop: { x: Math.max(300, Math.floor(window.innerWidth / 2) - 190), y: 82, width: 380, height: 420, locked: false, open: false },
  bank: { x: Math.max(300, Math.floor(window.innerWidth / 2) - 215), y: 82, width: 430, height: 360, locked: false, open: false },
  trainer: { x: Math.max(330, Math.floor(window.innerWidth / 2) - 180), y: 90, width: 360, height: 280, locked: false, open: false },
  crafting: { x: Math.max(330, Math.floor(window.innerWidth / 2) - 300), y: 90, width: 620, height: 520, locked: false, open: false },
  trade: { x: Math.max(260, Math.floor(window.innerWidth / 2) - 380), y: 80, width: 780, height: 560, locked: false, open: false },
  inspect: { x: Math.max(330, Math.floor(window.innerWidth / 2) - 160), y: 92, width: 320, height: 390, locked: false, open: false },
  dialogue: { x: Math.max(340, Math.floor(window.innerWidth / 2) - 260), y: Math.max(90, window.innerHeight - 260), width: 560, height: 190, locked: false, open: false },
  devspawn: { x: Math.max(330, Math.floor(window.innerWidth / 2) - 280), y: 90, width: 580, height: 530, locked: false, open: false }
};

const floatingWindowLabels = {
  character: "Character",
  inventory: "Inventory",
  spells: "Spells",
  target: "Target",
  effects: "Effects",
  pet: "Pet",
  minimap: "Minimap",
  spellbook: "Spellbook",
  questlog: "Quest Log",
  chronicle: "Chronicle",
  options: "Options",
  shop: "Shop",
  bank: "Bank",
  trainer: "Train Skills",
  crafting: "Crafting",
  trade: "Trade",
  inspect: "Inspect",
  dialogue: "Dialogue",
  devspawn: "Spawn Mob"
};

const floatingWindowHotkeys = {
  character: "c",
  inventory: "i",
  spells: "l",
  target: "t",
  effects: "e",
  pet: "p",
  minimap: "m",
  spellbook: "b",
  questlog: "q",
  chronicle: "h",
  options: "o"
};

function hotkeyLabelHtml(label, hotkey) {
  const text = String(label || "");
  const key = String(hotkey || "").trim().toLowerCase();
  if (!key) return escapeHtml(text);
  const index = text.toLowerCase().indexOf(key);
  if (index < 0) return escapeHtml(text);
  return `${escapeHtml(text.slice(0, index))}<span class="window-hotkey-letter">${escapeHtml(text[index])}</span>${escapeHtml(text.slice(index + 1))}`;
}

function floatingWindowTitleHtml(id, title) {
  return hotkeyLabelHtml(title, floatingWindowHotkeys[id]);
}

window.SoulreaperWindowHotkeyLabelHtml = floatingWindowTitleHtml;

const floatingWindowRegistry = new Map();
let floatingLayout = loadFloatingLayout();
let floatingZIndex = 20;

function loadFloatingLayout() {
  try {
    const parsed = JSON.parse(localStorage.getItem(FLOATING_LAYOUT_STORAGE_KEY) || "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveFloatingLayout() {
  try {
    localStorage.setItem(FLOATING_LAYOUT_STORAGE_KEY, JSON.stringify(floatingLayout));
  } catch {
    // Layout persistence is a convenience; ignore storage failures.
  }
}

function floatingState(id) {
  const defaults = floatingDefaults[id] || { x: 40, y: 80, width: 320, height: 260, locked: false, open: false };
  floatingLayout[id] = { ...defaults, ...(floatingLayout[id] || {}) };
  return floatingLayout[id];
}

function clampFloatingGeometry(state, el) {
  const minWidth = Number(el.dataset.minWidth) || 220;
  const minHeight = Number(el.dataset.minHeight) || 130;
  state.width = Math.max(minWidth, Math.min(Number(state.width) || minWidth, Math.max(minWidth, window.innerWidth - 8)));
  state.height = Math.max(minHeight, Math.min(Number(state.height) || minHeight, Math.max(minHeight, window.innerHeight - 8)));
  state.x = Math.max(0, Math.min(Number(state.x) || 0, Math.max(0, window.innerWidth - state.width)));
  state.y = Math.max(0, Math.min(Number(state.y) || 0, Math.max(0, window.innerHeight - state.height)));
}

function floatingRectOverlapArea(a, b) {
  const x = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x));
  const y = Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
  return x * y;
}

function openFloatingWindowRects(excludeId = "") {
  const rects = [];
  for (const [id, entry] of floatingWindowRegistry) {
    if (id === excludeId || !entry?.el || entry.el.classList.contains("hidden")) continue;
    const rect = entry.el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) continue;
    rects.push({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });
  }
  return rects;
}

function fitFloatingCandidate(x, y, width, height) {
  return {
    x: Math.max(0, Math.min(x, Math.max(0, window.innerWidth - width))),
    y: Math.max(0, Math.min(y, Math.max(0, window.innerHeight - height))),
    width,
    height
  };
}

function moveFloatingWindowAwayFromOverlap(id) {
  const entry = floatingWindowRegistry.get(id);
  if (!entry?.el) return;
  const state = floatingState(id);
  clampFloatingGeometry(state, entry.el);
  const occupied = openFloatingWindowRects(id);
  if (!occupied.length) return;
  const current = { x: state.x, y: state.y, width: state.width, height: state.height };
  const currentOverlap = occupied.reduce((sum, rect) => sum + floatingRectOverlapArea(current, rect), 0);
  if (currentOverlap <= Math.max(360, current.width * current.height * 0.04)) return;
  const gap = 12;
  const candidates = [current];
  for (const rect of occupied) {
    candidates.push(
      fitFloatingCandidate(rect.x + rect.width + gap, rect.y, current.width, current.height),
      fitFloatingCandidate(rect.x - current.width - gap, rect.y, current.width, current.height),
      fitFloatingCandidate(rect.x, rect.y + rect.height + gap, current.width, current.height),
      fitFloatingCandidate(rect.x, rect.y - current.height - gap, current.width, current.height)
    );
  }
  const stepX = Math.max(80, Math.floor(current.width * 0.55));
  const stepY = Math.max(70, Math.floor(current.height * 0.55));
  for (let y = 8; y <= Math.max(8, window.innerHeight - current.height); y += stepY) {
    for (let x = 8; x <= Math.max(8, window.innerWidth - current.width); x += stepX) {
      candidates.push(fitFloatingCandidate(x, y, current.width, current.height));
    }
  }
  let best = current;
  let bestOverlap = currentOverlap;
  for (const candidate of candidates) {
    const overlap = occupied.reduce((sum, rect) => sum + floatingRectOverlapArea(candidate, rect), 0);
    if (overlap < bestOverlap) {
      best = candidate;
      bestOverlap = overlap;
      if (overlap === 0) break;
    }
  }
  state.x = best.x;
  state.y = best.y;
}

function applyNewCharacterWindowLayout() {
  const topY = 58;
  const minimapWidth = 292;
  const rightX = Math.max(320, window.innerWidth - minimapWidth - 14);
  const effectsWidth = 260;
  const effectsX = Math.max(320, rightX - effectsWidth - 14);
  const desired = {
    character: { x: 14, y: topY, width: 250, height: 260, open: true },
    inventory: { x: 14, y: topY + 272, width: 258, height: 230, open: true },
    target: { x: 314, y: topY, width: 260, height: 176, open: true },
    minimap: { x: rightX, y: topY, width: minimapWidth, height: 220, open: true },
    effects: { x: effectsX, y: topY, width: effectsWidth, height: 104, open: true },
    spells: { x: rightX, y: topY + 232, width: minimapWidth, height: 96, open: true },
    chronicle: { x: Math.max(8, Math.floor(window.innerWidth / 2) - 280), y: Math.max(360, window.innerHeight - 230), width: 560, height: 205, open: true }
  };
  const openIds = new Set(Object.keys(desired));
  for (const id of Object.keys(floatingDefaults)) {
    const state = floatingState(id);
    if (desired[id]) Object.assign(state, desired[id], { locked: false });
    else if (id !== "bar") state.open = false;
  }
  for (const [id] of floatingWindowRegistry) {
    const state = floatingState(id);
    state.open = openIds.has(id) || id === "bar";
    applyFloatingState(id);
  }
  saveFloatingLayout();
  resizeMinimapWindowCanvas();
  updateSpellsWindowLayout();
  scheduleFloatingFitContent("new-character-default-layout");
}

function applyFloatingState(id) {
  const entry = floatingWindowRegistry.get(id);
  if (!entry) return;
  const { el, closable } = entry;
  const state = floatingState(id);
  if (id === "bar") {
    state.open = isGameplayScreenActive();
    state.locked = true;
    el.classList.toggle("hidden", !state.open);
  }
  clampFloatingGeometry(state, el);
  el.style.left = `${state.x}px`;
  el.style.top = `${state.y}px`;
  el.style.width = `${state.width}px`;
  el.style.height = `${state.height}px`;
  el.classList.toggle("locked", Boolean(state.locked));
  if (closable) el.classList.toggle("hidden", !state.open);
  else if (id === "bar") el.classList.toggle("hidden", !state.open);
  const lock = el.querySelector("[data-floating-lock]");
  if (lock) {
    lock.textContent = state.locked ? "◆" : "◇";
    lock.title = state.locked ? "Unlock" : "Lock";
  }
  updateWindowBarButtons();
}

function isGameplayScreenActive() {
  return Boolean(game.mode && modeChoice?.classList.contains("hidden"));
}

function setFloatingOpen(id, open) {
  if (!open && closeFloatingSemanticWindow(id)) return;
  const entry = floatingWindowRegistry.get(id);
  const wasHidden = entry?.el?.classList.contains("hidden");
  const state = floatingState(id);
  state.open = Boolean(open);
  if (open && wasHidden) moveFloatingWindowAwayFromOverlap(id);
  applyFloatingState(id);
  saveFloatingLayout();
  if (floatingWindowUsesFitContent(id, entry)) scheduleFloatingFitContent(`${id}-${open ? "open" : "close"}`);
  syncPointerPause();
}

window.openInventoryWindow = () => setFloatingOpen("inventory", true);
window.openSoulreaperFloatingWindow = id => setFloatingOpen(id, true);

function closeFloatingSemanticWindow(id) {
  const entry = floatingWindowRegistry.get(id);
  if (entry?.onClose) {
    entry.onClose();
    return true;
  }
  if (id === "spellbook") closeSpellbookWindow?.();
  else if (id === "questlog") closeQuestLog?.();
  else if (id === "shop") closeShop?.();
  else if (id === "bank") closeBank?.();
  else if (id === "trainer") closeTrainer?.();
  else if (id === "crafting") closeCraftingWindow?.();
  else if (id === "trade") closeTradeWindow?.();
  else if (id === "inspect") closeInspectWindow();
  else if (id === "dialogue") closeDialogue?.();
  else if (id === "devspawn") closeDevSpawnWindow?.();
  else return false;
  return false;
}

function toggleFloatingWindow(id) {
  setFloatingOpen(id, floatingWindowRegistry.get(id)?.el.classList.contains("hidden"));
}

function focusFloatingWindow(id) {
  const entry = floatingWindowRegistry.get(id);
  if (!entry) return;
  entry.el.style.zIndex = `${++floatingZIndex}`;
}

function focusTooltipOwner(target) {
  const trigger = target?.closest?.([
    ".window-bar-button",
    ".stat-row",
    ".resistance-chip",
    ".inventory-slot",
    ".equip-button",
    ".shop-item",
    ".quest-reward-item",
    ".action-item-preview",
    ".bag-slot",
    ".status-effect-icon",
    ".target-effect-icon",
    ".spell-pill",
    ".passive-spell-slot",
    ".learned-spell-icon-button",
    ".quest-item",
    ".dialogue-spell-choice-button"
  ].join(","));
  const owner = trigger?.closest?.("[data-window-id]");
  if (owner?.dataset.windowId) focusFloatingWindow(owner.dataset.windowId);
}

function floatingHeaderHtml(title, closable) {
  const id = Object.entries(floatingWindowLabels).find(([, label]) => label === title)?.[0] || "";
  return `
    <div class="floating-window-header" data-floating-drag>
      <span class="floating-window-title">${floatingWindowTitleHtml(id, title)}</span>
      <button class="floating-window-tool" type="button" data-floating-lock title="Lock">◇</button>
      ${closable ? `<button class="floating-window-tool" type="button" data-floating-close title="Close">×</button>` : ""}
    </div>
  `;
}

function floatingResizeHandles() {
  return ["n", "e", "s", "w", "ne", "nw", "se", "sw"]
    .map(dir => `<span class="floating-resize-handle ${dir}" data-floating-resize="${dir}"></span>`)
    .join("");
}

function createFloatingShell(id, title, { closable = true, minWidth = 220, minHeight = 130, onClose = null } = {}) {
  const el = document.createElement("section");
  el.id = `${id}FloatingWindow`;
  el.className = "floating-window";
  el.dataset.windowId = id;
  el.dataset.minWidth = String(minWidth);
  el.dataset.minHeight = String(minHeight);
  el.innerHTML = `${floatingHeaderHtml(title, closable)}<div class="floating-window-body"></div>${floatingResizeHandles()}`;
  document.body.appendChild(el);
  registerFloatingWindow(id, el, { closable, onClose });
  return el.querySelector(".floating-window-body");
}

function convertBackdropToFloating(id, backdrop, title, { minWidth = 260, minHeight = 170 } = {}) {
  if (!backdrop || backdrop.dataset.windowId) return;
  const children = [...backdrop.childNodes];
  backdrop.classList.add("floating-window");
  backdrop.classList.remove("shop-backdrop");
  backdrop.dataset.windowId = id;
  backdrop.dataset.minWidth = String(minWidth);
  backdrop.dataset.minHeight = String(minHeight);
  backdrop.innerHTML = `${floatingHeaderHtml(title, true)}<div class="floating-window-body"></div>${floatingResizeHandles()}`;
  const body = backdrop.querySelector(".floating-window-body");
  children.forEach(child => body.appendChild(child));
  registerFloatingWindow(id, backdrop, { closable: true });
}

function registerFloatingWindow(id, el, { closable = true, onClose = null } = {}) {
  floatingWindowRegistry.set(id, { el, closable, onClose });
  el.addEventListener("pointerdown", () => focusFloatingWindow(id));
  if (closable) {
    const observer = new MutationObserver(() => {
      const state = floatingState(id);
      const open = !el.classList.contains("hidden");
      if (state.open !== open) {
        state.open = open;
        saveFloatingLayout();
        updateWindowBarButtons();
      }
    });
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
  }
  el.addEventListener("click", event => {
    const lockButton = event.target.closest("[data-floating-lock]");
    if (lockButton) {
      const state = floatingState(id);
      state.locked = !state.locked;
      applyFloatingState(id);
      saveFloatingLayout();
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (event.target.closest("[data-floating-close]")) {
      event.preventDefault();
      event.stopPropagation();
      setFloatingOpen(id, false);
    }
  });
  el.addEventListener("pointerdown", event => {
    const state = floatingState(id);
    if (state.locked || event.button !== 0) return;
    if (event.target.closest("button, input, select, textarea, [data-floating-lock], [data-floating-close]")) return;
    const resize = event.target.closest("[data-floating-resize]");
    const dragHandle = event.target.closest("[data-floating-drag]");
    if (!resize && !dragHandle) return;
    const rect = el.getBoundingClientRect();
    game.floatingDrag = {
      id,
      mode: resize ? "resize" : "move",
      dir: resize?.dataset.floatingResize || "",
      startX: event.clientX,
      startY: event.clientY,
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height
    };
    el.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  });
  el.addEventListener("pointermove", event => updateFloatingDrag(event, el));
  el.addEventListener("pointerup", event => finishFloatingDrag(event, el));
  applyFloatingState(id);
}

function updateFloatingDrag(event, el) {
  const drag = game.floatingDrag;
  if (!drag || drag.id !== el.dataset.windowId) return;
  const state = floatingState(drag.id);
  const dx = event.clientX - drag.startX;
  const dy = event.clientY - drag.startY;
  if (drag.mode === "move") {
    state.x = drag.x + dx;
    state.y = drag.y + dy;
  } else {
    const dir = drag.dir;
    if (dir.includes("e")) state.width = drag.width + dx;
    if (dir.includes("s")) state.height = drag.height + dy;
    if (dir.includes("w")) {
      state.x = drag.x + dx;
      state.width = drag.width - dx;
    }
    if (dir.includes("n")) {
      state.y = drag.y + dy;
      state.height = drag.height - dy;
    }
  }
  applyFloatingState(drag.id);
  if (drag.id === "minimap") resizeMinimapWindowCanvas();
  if (drag.id === "spells") updateSpellsWindowLayout();
  const entry = floatingWindowRegistry.get(drag.id);
  if (floatingWindowUsesFitContent(drag.id, entry)) scheduleFloatingFitContent(`${drag.id}-${drag.mode}`);
}

function finishFloatingDrag(event, el) {
  const drag = game.floatingDrag;
  if (!drag || drag.id !== el.dataset.windowId) return;
  game.floatingDrag = null;
  el.releasePointerCapture?.(event.pointerId);
  saveFloatingLayout();
  const entry = floatingWindowRegistry.get(drag.id);
  if (drag.mode === "move" && entry?.detachedMeta && detachedWindowDroppedOnSource(entry.detachedMeta, event.clientX, event.clientY)) {
    entry.onClose?.();
  }
}

function makeFloatingTabs(tabs, active, attr = "data-floating-tab") {
  return tabs.map(tab => `<button class="floating-tab${tab.id === active ? " active" : ""}" type="button" ${attr}="${escapeHtml(tab.id)}" data-tab-label="${escapeHtml(tab.label)}">${escapeHtml(tab.label)}</button>`).join("");
}

function updateWindowBarButtons() {
  const bar = document.querySelector("#windowBar");
  if (!bar) return;
  for (const button of bar.querySelectorAll("[data-window-toggle]")) {
    const entry = floatingWindowRegistry.get(button.dataset.windowToggle);
    button.classList.toggle("active", Boolean(entry && !entry.el.classList.contains("hidden")));
  }
}

function createWindowBar() {
  const bar = document.createElement("nav");
  bar.id = "windowBar";
  bar.className = "window-bar";
  bar.dataset.windowId = "bar";
  bar.dataset.minWidth = "220";
  bar.dataset.minHeight = "36";
  const buttons = [
    ["character", "☥", "Character"],
    ["inventory", "▦", "Inventory"],
    ["spells", "✹", "Spells"],
    ["target", "◇", "Target"],
    ["effects", "✺", "Effects"],
    ["pet", "♙", "Pet"],
    ["minimap", "◎", "Minimap"],
    ["spellbook", "✦", "Spellbook"],
    ["questlog", "!", "Quest Log"],
    ["chronicle", "≡", "Chronicle"],
    ["options", "◈", "Options"]
  ];
  bar.innerHTML = `
    <span class="window-bar-drag"></span>
    ${buttons.map(([id, symbol, label]) => `
      <button class="window-bar-button" type="button" data-window-toggle="${id}" aria-label="${label}">
        <span aria-hidden="true">${symbol}</span><span class="window-tooltip">${floatingWindowTitleHtml(id, label)}</span>
      </button>
    `).join("")}
  `;
  document.body.appendChild(bar);
  registerFloatingWindow("bar", bar, { closable: false });
  floatingState("bar").locked = true;
  applyFloatingState("bar");
  bar.addEventListener("click", event => {
    const button = event.target.closest("[data-window-toggle]");
    if (!button) return;
    const id = button.dataset.windowToggle;
    if (id === "spellbook") {
      if (spellbookWindow.classList.contains("hidden")) openSpellbookWindow();
      else closeSpellbookWindow();
      return;
    }
    if (id === "questlog") {
      if (questLogWindow.classList.contains("hidden")) openQuestLog();
      else closeQuestLog();
      return;
    }
    toggleFloatingWindow(id);
  });
}

function createFloatingFitContent(pane) {
  const fit = document.createElement("div");
  fit.className = "floating-fit-content";
  pane.appendChild(fit);
  return fit;
}

function scheduleFloatingFitContent(reason = "changed") {
  floatingFitDirty = true;
  floatingFitReason = reason;
  if (floatingFitFrame) return;
  floatingFitFrame = requestAnimationFrame(() => {
    floatingFitFrame = 0;
    if (!floatingFitDirty) return;
    floatingFitDirty = false;
    updateFloatingFitContent();
  });
}

function updateFloatingFitContent() {
  let measured = 0;
  for (const [id, entry] of floatingWindowRegistry) {
    if (!floatingWindowUsesFitContent(id, entry) || entry.el.classList.contains("hidden")) continue;
    const fitTargets = [
      ...entry.el.querySelectorAll(".floating-pane:not(.hidden) > .floating-fit-content"),
      ...entry.el.querySelectorAll(".floating-window-body > .floating-fit-content")
    ];
    for (const fit of fitTargets) {
      const pane = fit.parentElement;
      const availableWidth = Math.max(1, pane.clientWidth);
      const availableHeight = Math.max(1, pane.clientHeight);
      const contentSignature = fit.dataset.fitSignature || "";
      const previous = floatingFitPaneCache.get(fit);
      const geometrySignature = `${availableWidth}x${availableHeight}|${contentSignature}`;
      if (previous?.geometrySignature === geometrySignature) continue;
      fit.style.transform = "none";
      fit.style.width = "100%";
      fit.style.height = "100%";
      const contentWidth = Math.max(1, fit.scrollWidth);
      const contentHeight = Math.max(1, fit.scrollHeight);
      const scale = Math.min(1, availableWidth / contentWidth, availableHeight / contentHeight);
      const width = scale < 1 ? `${100 / scale}%` : "100%";
      const height = scale < 1 ? `${100 / scale}%` : "100%";
      if (previous?.scale !== scale) {
        fit.style.setProperty("--floating-fit-scale", String(scale));
        fit.style.transform = `scale(${scale})`;
      }
      if (previous?.width !== width) fit.style.width = width;
      if (previous?.height !== height) fit.style.height = height;
      floatingFitPaneCache.set(fit, { geometrySignature, scale, width, height });
      measured += 1;
    }
  }
  trackFloatingFitMeasurements(measured);
}

function floatingWindowUsesFitContent(id, entry) {
  return id === "character"
    || id === "inventory"
    || id === "target"
    || id === "inspect"
    || id === "spellbook"
    || id === "questlog"
    || entry?.detachedMeta?.group === "character"
    || entry?.detachedMeta?.group === "inventory";
}

function markFloatingFitContentChanged(group = "") {
  const roots = [];
  if (!group || group === "character") roots.push(document.querySelector("#characterFloatingWindow"));
  if (!group || group === "inventory") roots.push(document.querySelector("#inventoryFloatingWindow"));
  if (!group || group === "target") roots.push(document.querySelector("#targetFloatingWindow"));
  if (!group || group === "spellbook") roots.push(document.querySelector("#spellbookWindow"));
  if (!group || group === "questlog") roots.push(document.querySelector("#questLogWindow"));
  for (const [id, entry] of floatingWindowRegistry) {
    if (group && entry?.detachedMeta?.group !== group) continue;
    if (!group && !floatingWindowUsesFitContent(id, entry)) continue;
    roots.push(entry.el);
  }
  roots.filter(Boolean).forEach(root => {
    root.querySelectorAll(".floating-fit-content").forEach(fit => {
      fit.dataset.fitSignature = String((Number(fit.dataset.fitSignature) || 0) + 1);
      floatingFitPaneCache.delete(fit);
    });
  });
  scheduleFloatingFitContent(group ? `${group}-content` : "fit-content");
}

window.markFloatingFitContentChanged = markFloatingFitContentChanged;

function trackFloatingFitMeasurements(count) {
  if (!count) return;
  const now = Math.floor(performance.now() / 1000);
  if (now !== floatingFitMeasureSecond) {
    floatingFitMeasureSecond = now;
    floatingFitMeasureCount = 0;
  }
  floatingFitMeasureCount += count;
  if (new URLSearchParams(window.location.search).has("debugUiFit") && floatingFitMeasureCount > 30) {
    console.warn(`[ui-fit] ${floatingFitMeasureCount} fitted pane measurements in 1s after ${floatingFitReason}`);
  }
}

function setupCoreFloatingWindows() {
  if (floatingWindowsReady) return;
  floatingWindowsReady = true;
  createWindowBar();

  const characterBody = createFloatingShell("character", "Character", { minWidth: 250, minHeight: 260 });
  characterBody.innerHTML = `
    <div class="floating-tabs" id="characterTabs">${makeFloatingTabs([
      { id: "stats", label: "Stats" },
      { id: "equipment", label: "Equipment" },
      { id: "realm", label: "Realm" },
      { id: "faction", label: "Faction" }
    ], "stats")}<button class="floating-tab level-up-tab hidden" type="button" data-floating-tab="levelup" data-tab-label="Level Up!"><span class="attention-spark" aria-hidden="true"></span>Level Up!</button></div>
    <div class="floating-pane" data-character-pane="stats"></div>
    <div class="floating-pane hidden" data-character-pane="equipment"></div>
    <div class="floating-pane hidden" data-character-pane="realm"><div id="characterRealmList" class="realm-progress-list"></div></div>
    <div class="floating-pane hidden" data-character-pane="faction"><div id="characterFactionList" class="faction-standing-list"></div></div>
    <div class="floating-pane hidden" data-character-pane="levelup"></div>
  `;
  const statsPane = characterBody.querySelector("[data-character-pane='stats']");
  const equipmentPane = characterBody.querySelector("[data-character-pane='equipment']");
  const realmPane = characterBody.querySelector("[data-character-pane='realm']");
  const factionPane = characterBody.querySelector("[data-character-pane='faction']");
  const levelUpPane = characterBody.querySelector("[data-character-pane='levelup']");
  const statsFit = createFloatingFitContent(statsPane);
  const equipmentFit = createFloatingFitContent(equipmentPane);
  const realmFit = createFloatingFitContent(realmPane);
  const factionFit = createFloatingFitContent(factionPane);
  const levelUpFit = createFloatingFitContent(levelUpPane);
  statsFit.appendChild(playerSummary);
  statsFit.appendChild(statsGrid);
  statsFit.appendChild(resistancesGrid);
  equipmentFit.appendChild(equipmentGrid);
  characterRealmList = characterBody.querySelector("#characterRealmList");
  realmFit.appendChild(characterRealmList);
  characterFactionList = characterBody.querySelector("#characterFactionList");
  factionFit.appendChild(characterFactionList);
  levelUpFit.appendChild(levelOptions);

  const inventoryBody = createFloatingShell("inventory", "Inventory", { minWidth: 258, minHeight: 230 });
  inventoryBody.innerHTML = `
    <div class="floating-pane" data-inventory-pane="pack"></div>
  `;
  const packPane = inventoryBody.querySelector("[data-inventory-pane='pack']");
  const packFit = createFloatingFitContent(packPane);
  const goldPill = goldReadout?.closest(".sheet-gold");
  if (goldPill) packFit.appendChild(goldPill);
  packFit.appendChild(inventoryGrid);

  const spellsBody = createFloatingShell("spells", "Spells", { minWidth: 56, minHeight: 56 });
  spellsBody.appendChild(spellHudEl);

  const targetBody = createFloatingShell("target", "Target", { minWidth: 96, minHeight: 64 });
  targetBody.classList.add("target-window-body");
  targetWindowBody = createFloatingFitContent(targetBody);
  targetWindowBody.classList.add("target-fit-content");

  const effectsBody = createFloatingShell("effects", "Effects", { minWidth: 72, minHeight: 56 });
  effectsWindowBody = document.createElement("div");
  effectsWindowBody.className = "effects-window-list";
  effectsBody.appendChild(effectsWindowBody);
  if (statusEffectHud) {
    statusEffectHud.innerHTML = "";
    statusEffectHud.classList.add("hidden");
  }

  const petBody = createFloatingShell("pet", "Pet", { minWidth: 180, minHeight: 116 });
  petWindowBody = document.createElement("div");
  petWindowBody.className = "pet-window-list";
  petBody.appendChild(petWindowBody);
  petBody.addEventListener("click", handlePetWindowClick);

  const inspectBody = createFloatingShell("inspect", "Inspect", { minWidth: 260, minHeight: 300 });
  inspectWindowBody = createFloatingFitContent(inspectBody);
  inspectWindowBody.classList.add("inspect-fit-content");

  const optionsBody = createFloatingShell("options", "Options", { minWidth: 220, minHeight: 130 });
  optionsBody.innerHTML = `
    <div class="options-window">
      <label class="options-control">
        <span>Sound Effects</span>
        <input id="soundVolumeRange" type="range" min="0" max="100" step="1">
        <strong id="soundVolumeValue">100%</strong>
      </label>
      <button id="logoutButton" class="options-logout-button" type="button">Log Off</button>
    </div>
  `;

  const minimapBody = createFloatingShell("minimap", "Minimap", { minWidth: 190, minHeight: 150 });
  minimapWindowCanvas = document.createElement("canvas");
  minimapWindowCanvas.className = "floating-minimap-canvas";
  minimapWindowCanvas.width = 280;
  minimapWindowCanvas.height = 180;
  minimapWindowCtx = minimapWindowCanvas.getContext("2d");
  minimapBody.appendChild(minimapWindowCanvas);
  minimapWindowCanvas.addEventListener("pointerdown", handleFloatingMinimapPointerDown);
  minimapWindowCanvas.addEventListener("pointerup", stopFloatingMinimapZoomHold);
  minimapWindowCanvas.addEventListener("pointercancel", stopFloatingMinimapZoomHold);
  minimapWindowCanvas.addEventListener("pointerleave", stopFloatingMinimapZoomHold);

  const chronicleBody = createFloatingShell("chronicle", "Chronicle", { minWidth: 320, minHeight: 150 });
  chronicleBody.innerHTML = `
    <div class="chronicle-toolbar">
      <div class="floating-tabs" id="chronicleTabs">${makeFloatingTabs([
        { id: "all", label: "All" },
        { id: "combat", label: "Combat" },
        { id: "chat", label: "Chat" }
      ], "all", "data-log-view")}</div>
      <div class="chat-channel-slot" data-chat-channel-slot="chronicle"></div>
    </div>
  `;
  chronicleBody.appendChild(logEl);

  convertBackdropToFloating("spellbook", spellbookWindow, "Spellbook", { minWidth: 360, minHeight: 280 });
  const spellbookBody = spellbookWindow?.querySelector(".floating-window-body");
  if (spellbookBody && !spellbookBody.querySelector(":scope > .floating-fit-content")) {
    const spellbookFit = createFloatingFitContent(spellbookBody);
    [...spellbookBody.childNodes]
      .filter(node => node !== spellbookFit)
      .forEach(node => spellbookFit.appendChild(node));
  }
  if (spellbookRealmTabs && !document.querySelector("#spellbookModeTabs")) {
    spellbookRealmTabs.insertAdjacentHTML("beforebegin", `
      <div id="spellbookModeTabs" class="floating-tabs">
        <button class="floating-tab active" type="button" data-spellbook-mode="spells">Spells</button>
        <button class="floating-tab" type="button" data-spellbook-mode="lineups">Lineups</button>
      </div>
    `);
  }
  convertBackdropToFloating("questlog", questLogWindow, "Quest Log", { minWidth: 280, minHeight: 260 });
  const questLogBody = questLogWindow?.querySelector(".floating-window-body");
  if (questLogBody && !questLogBody.querySelector(":scope > .floating-fit-content")) {
    const questLogFit = createFloatingFitContent(questLogBody);
    [...questLogBody.childNodes]
      .filter(node => node !== questLogFit)
      .forEach(node => questLogFit.appendChild(node));
  }
  convertBackdropToFloating("shop", shopWindow, "Shop", { minWidth: 360, minHeight: 300 });
  convertBackdropToFloating("bank", bankWindow, "Bank", { minWidth: 390, minHeight: 300 });
  convertBackdropToFloating("trainer", trainerWindow, "Trainer", { minWidth: 360, minHeight: 280 });
  convertBackdropToFloating("crafting", craftingWindow, "Crafting", { minWidth: 360, minHeight: 280 });
  convertBackdropToFloating("trade", tradeWindow, "Trade", { minWidth: 500, minHeight: 340 });
  convertBackdropToFloating("dialogue", dialogueWindow, "Dialogue", { minWidth: 320, minHeight: 140 });
  convertBackdropToFloating("devspawn", devSpawnWindow, "Spawn Mob", { minWidth: 360, minHeight: 280 });

  document.addEventListener("click", handleFloatingTabs);
  document.addEventListener("pointerdown", beginFloatingTabDrag);
  document.addEventListener("pointermove", updateFloatingTabDrag);
  document.addEventListener("pointerup", finishFloatingTabDrag);
  resizeMinimapWindowCanvas();
  updateWindowBarButtons();
  scheduleFloatingFitContent("setup");
}

function renderOptionsWindow() {
  const range = document.querySelector("#soundVolumeRange");
  const value = document.querySelector("#soundVolumeValue");
  const percent = Math.round((game.soundVolume ?? 1) * 100);
  if (range && document.activeElement !== range) range.value = String(percent);
  if (value) value.textContent = `${percent}%`;
}

function floatingTabDescriptor(button) {
  if (!button) return null;
  if (button.closest("#characterFloatingWindow") && button.dataset.floatingTab) {
    return {
      group: "character",
      tabId: button.dataset.floatingTab,
      label: button.dataset.tabLabel || button.textContent.trim(),
      root: document.querySelector("#characterFloatingWindow"),
      paneSelector: `[data-character-pane="${CSS.escape(button.dataset.floatingTab)}"]`,
      tabSelector: `[data-floating-tab="${CSS.escape(button.dataset.floatingTab)}"]`,
      minWidth: 250,
      minHeight: 220
    };
  }
  if (button.closest("#inventoryFloatingWindow") && button.dataset.floatingTab) {
    return {
      group: "inventory",
      tabId: button.dataset.floatingTab,
      label: button.dataset.tabLabel || button.textContent.trim(),
      root: document.querySelector("#inventoryFloatingWindow"),
      paneSelector: `[data-inventory-pane="${CSS.escape(button.dataset.floatingTab)}"]`,
      tabSelector: `[data-floating-tab="${CSS.escape(button.dataset.floatingTab)}"]`,
      minWidth: 258,
      minHeight: 210
    };
  }
  if (button.closest("#chronicleFloatingWindow") && button.dataset.logView) {
    return {
      group: "chronicle",
      tabId: button.dataset.logView,
      label: button.dataset.tabLabel || button.textContent.trim(),
      root: document.querySelector("#chronicleFloatingWindow"),
      tabSelector: `[data-log-view="${CSS.escape(button.dataset.logView)}"]`,
      minWidth: 320,
      minHeight: 150,
      channel: button.dataset.logView
    };
  }
  return null;
}

function beginFloatingTabDrag(event) {
  if (event.button !== 0) return;
  const button = event.target.closest(".floating-tab");
  const descriptor = floatingTabDescriptor(button);
  if (!descriptor || !descriptor.root || descriptor.root.classList.contains("locked")) return;
  game.floatingTabDrag = {
    descriptor,
    button,
    startX: event.clientX,
    startY: event.clientY,
    active: false
  };
}

function updateFloatingTabDrag(event) {
  const drag = game.floatingTabDrag;
  if (!drag) return;
  const distanceMoved = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);
  if (!drag.active && distanceMoved < 14) return;
  drag.active = true;
  document.body.classList.add("floating-tab-dragging");
  drag.button.classList.add("dragging");
  event.preventDefault();
}

function finishFloatingTabDrag(event) {
  const drag = game.floatingTabDrag;
  if (!drag) return;
  game.floatingTabDrag = null;
  document.body.classList.remove("floating-tab-dragging");
  drag.button.classList.remove("dragging");
  if (!drag.active) return;
  const rootRect = drag.descriptor.root.getBoundingClientRect();
  const droppedOutside = event.clientX < rootRect.left
    || event.clientX > rootRect.right
    || event.clientY < rootRect.top
    || event.clientY > rootRect.bottom;
  if (droppedOutside) detachFloatingPaneTab(drag.descriptor, event.clientX, event.clientY);
}

function detachedWindowIdFor(group, tabId) {
  return `${group}-${tabId}-detached`;
}

function detachFloatingPaneTab(descriptor, clientX, clientY) {
  const { group, tabId, label, root, paneSelector, tabSelector, minWidth, minHeight } = descriptor;
  const tab = root.querySelector(tabSelector);
  const pane = paneSelector ? root.querySelector(paneSelector) : null;
  if (!tab) return;
  if (paneSelector && !pane) return;
  if (pane?.dataset.detached === "true" || tab.dataset.detached === "true") return;
  const id = detachedWindowIdFor(group, tabId);
  if (floatingWindowRegistry.has(id)) {
    setFloatingOpen(id, true);
    return;
  }
  const tabParent = tab.parentElement;
  const nextTab = tab.nextElementSibling;
  const wasActive = tab.classList.contains("active");
  tab.dataset.detached = "true";
  tab.remove();
  const body = createFloatingShell(id, label, {
    minWidth,
    minHeight,
    onClose: () => reattachFloatingPaneTab({ group, tabId, pane, tab, tabParent, nextTab, windowId: id, channel: descriptor.channel })
  });
  if (pane) {
    pane.dataset.detached = "true";
    pane.classList.remove("hidden");
    body.appendChild(pane);
  } else {
    if (group === "chronicle" && tabId === "chat") {
      const toolbar = document.createElement("div");
      toolbar.className = "chronicle-toolbar detached-chat-toolbar";
      toolbar.innerHTML = `<div class="chat-channel-slot" data-chat-channel-slot="detached-chat"></div>`;
      body.appendChild(toolbar);
    }
    const list = document.createElement("ol");
    list.className = "log detached-chronicle-log";
    list.dataset.detachedLogView = descriptor.channel || tabId;
    body.appendChild(list);
  }
  const state = floatingState(id);
  state.x = Math.max(0, Math.min(window.innerWidth - state.width, clientX - 28));
  state.y = Math.max(0, Math.min(window.innerHeight - state.height, clientY - 14));
  state.open = true;
  state.locked = false;
  const entry = floatingWindowRegistry.get(id);
  if (entry) {
    entry.detachedMeta = { group, tabId };
    if (group === "character" || group === "inventory") entry.el.classList.add("floating-fit-window");
    if (group === "chronicle") entry.el.classList.add("detached-chronicle-window");
  }
  applyFloatingState(id);
  saveFloatingLayout();
  if (group === "character" || group === "inventory") markFloatingFitContentChanged(group);
  if (group === "chronicle") {
    if (wasActive) {
      const remaining = [...root.querySelectorAll("[data-log-view]")];
      game.logView = remaining[0]?.dataset.logView || "all";
    }
    renderChronicle();
    if (tabId === "chat") dockChatInput();
  } else {
    const remaining = [...root.querySelectorAll("[data-floating-tab]")];
    if (remaining.length && wasActive) setFloatingPane(group, remaining[0].dataset.floatingTab);
  }
}

function reattachFloatingPaneTab({ group, tabId, pane, tab, tabParent, nextTab, windowId, channel }) {
  const root = document.querySelector(`#${group}FloatingWindow`);
  const body = root?.querySelector(".floating-window-body");
  const tabs = root?.querySelector(".floating-tabs") || tabParent;
  if (!root || !body || !tabs) return;
  tab.dataset.detached = "false";
  tab.classList.remove("dragging");
  insertTabInOrder(tabs, tab, group, tabId, nextTab);
  if (pane) {
    const nextPane = [...body.querySelectorAll(`[data-${group}-pane]`)]
      .find(candidate => paneOrderIndex(group, candidate.dataset[`${group}Pane`]) > paneOrderIndex(group, tabId));
    pane.dataset.detached = "false";
    pane.classList.add("hidden");
    if (nextPane) body.insertBefore(pane, nextPane);
    else body.appendChild(pane);
    setFloatingPane(group, tabId);
  } else if (group === "chronicle") {
    game.logView = channel || tabId;
    renderChronicle();
    if (tabId === "chat") dockChatInput();
  }
  const entry = floatingWindowRegistry.get(windowId);
  entry?.el?.remove();
  floatingWindowRegistry.delete(windowId);
  delete floatingLayout[windowId];
  saveFloatingLayout();
  updateWindowBarButtons();
  if (group === "character" || group === "inventory") markFloatingFitContentChanged(group);
  syncPointerPause();
}

function insertTabInOrder(tabs, tab, group, tabId, originalNext = null) {
  if (originalNext?.parentElement === tabs) {
    tabs.insertBefore(tab, originalNext);
    return;
  }
  const next = [...tabs.querySelectorAll(".floating-tab")]
    .find(candidate => paneOrderIndex(group, tabIdForFloatingTab(candidate, group)) > paneOrderIndex(group, tabId));
  if (next) tabs.insertBefore(tab, next);
  else tabs.appendChild(tab);
}

function tabIdForFloatingTab(tab, group) {
  if (group === "chronicle") return tab.dataset.logView || "";
  return tab.dataset.floatingTab || "";
}

function detachedWindowDroppedOnSource(meta, clientX, clientY) {
  const source = document.querySelector(`#${meta.group}FloatingWindow`);
  if (!source || source.classList.contains("hidden")) return false;
  const rect = source.getBoundingClientRect();
  return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
}

function paneOrderIndex(group, tabId) {
  const orders = {
    character: ["stats", "equipment", "realm", "faction", "levelup"],
    inventory: ["pack"],
    chronicle: ["all", "combat", "chat"]
  };
  const order = orders[group] || [];
  const index = order.indexOf(tabId);
  return index < 0 ? Number.MAX_SAFE_INTEGER : index;
}

function handleFloatingTabs(event) {
  const characterTab = event.target.closest("[data-floating-tab]");
  if (characterTab && characterTab.closest("#characterFloatingWindow")) {
    setFloatingPane("character", characterTab.dataset.floatingTab);
    return;
  }
  if (characterTab && characterTab.closest("#inventoryFloatingWindow")) {
    setFloatingPane("inventory", characterTab.dataset.floatingTab);
    return;
  }
  const logTab = event.target.closest("[data-log-view]");
  if (logTab) {
    game.logView = logTab.dataset.logView || "all";
    renderChronicle();
    return;
  }
  const spellbookMode = event.target.closest("[data-spellbook-mode]");
  if (spellbookMode) {
    game.spellbookTab = spellbookMode.dataset.spellbookMode === "lineups" ? "lineups" : "all";
    renderSpellbookWindow();
  }
}

function setFloatingPane(group, pane) {
  const root = document.querySelector(`#${group}FloatingWindow`);
  if (!root) return;
  root.querySelectorAll(`[data-${group}-pane]`).forEach(el => {
    el.classList.toggle("hidden", el.dataset[`${group}Pane`] !== pane);
  });
  root.querySelectorAll("[data-floating-tab]").forEach(button => {
    button.classList.toggle("active", button.dataset.floatingTab === pane);
  });
  if (group === "character" || group === "inventory") scheduleFloatingFitContent(`${group}-tab`);
}

function setLevelUpTabVisible(visible) {
  const root = document.querySelector("#characterFloatingWindow");
  const tab = root?.querySelector("[data-floating-tab='levelup']");
  if (!tab) return;
  tab.classList.toggle("hidden", !visible);
  tab.classList.toggle("gold-orbit", visible);
  if (visible) {
    setFloatingOpen("character", true);
    setFloatingPane("character", "levelup");
    focusFloatingWindow("character");
  } else if (tab.classList.contains("active")) {
    setFloatingPane("character", "stats");
  }
}

function renderCharacterRealmPane() {
  if (!characterRealmList) return;
  const progressEntries = realmProgressRealms.map(realm => {
    const progress = realmProgress(realm);
    return [
      realm,
      Number(progress.level) || 0,
      Number(progress.xp) || 0,
      Number(progress.nextXp) || realmXpRequirement(Number(progress.level) || 0)
    ];
  });
  const signature = progressEntries
    .map(([realm, level, xp, nextXp]) => `${realm}:${level}:${roundUpTenth(xp)}:${roundUpTenth(nextXp)}`)
    .join("|");
  if (signature === characterRealmSignature) return;
  characterRealmSignature = signature;
  characterRealmList.innerHTML = progressEntries.map(([realm, level, xp, nextXp]) => {
    const color = realmUiColor(realm);
    const percent = nextXp > 0 ? Math.max(0, Math.min(100, (xp / nextXp) * 100)) : 100;
    return `
      <div class="realm-progress-row" style="--realm-color:${color}" tabindex="0">
        <strong style="color:${color}">${escapeHtml(realm)}</strong>
        <div class="realm-progress-bar"><i style="width:${percent}%"></i><span>${formatNumber(xp)} / ${formatNumber(nextXp)} XP</span></div>
        <em>LVL ${formatNumber(level)}</em>
      </div>
    `;
  }).join("");
  markFloatingFitContentChanged("character");
}

function renderCharacterFactionPane() {
  if (!characterFactionList) return;
  const alignment = playerAlignment();
  const factionConfigs = window.SoulreaperWorldData?.devFactionConfigs || [];
  const standings = game.player.factionStandings || {};
  const signature = [
    alignment,
    JSON.stringify(Object.entries(standings).sort()),
    factionConfigs.map(config => `${config.id || ""}:${config.name || ""}`).join("|")
  ].join(";");
  if (signature === characterFactionSignature) return;
  characterFactionSignature = signature;
  const rows = Object.entries(standings)
    .map(([id, standing]) => {
      const faction = factionConfigs.find(config => config.id === id || String(config.name || "").toLowerCase() === id);
      const value = Number(standing) || 0;
      const status = value < -10 ? "Enemy" : value > 10 ? "Ally" : "Neutral";
      const color = status === "Enemy" ? "#d84e42" : status === "Ally" ? "#68a85e" : "#f2ede3";
      return `<div class="realm-progress-row" style="--realm-color:${color}"><strong style="color:${color}">${escapeHtml(faction?.name || id)}</strong><div class="realm-progress-bar"><i style="width:${Math.max(0, Math.min(100, 50 + value * 2))}%"></i><span>${status}</span></div><em>${value > 0 ? "+" : ""}${formatNumber(value)}</em></div>`;
    })
    .sort()
    .join("");
  characterFactionList.innerHTML = `
    <div class="stat-row"><span>Alignment</span><strong>${escapeHtml(alignment)}</strong></div>
    ${rows || `<div class="empty-state">No faction standing recorded.</div>`}
  `;
  markFloatingFitContentChanged("character");
}

function resizeMinimapWindowCanvas() {
  if (!minimapWindowCanvas) return;
  const rect = minimapWindowCanvas.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  minimapWindowCanvas.width = Math.max(160, Math.floor(rect.width * scale));
  minimapWindowCanvas.height = Math.max(110, Math.floor(rect.height * scale));
  minimapWindowCtx = minimapWindowCanvas.getContext("2d");
  minimapWindowCtx.setTransform(scale, 0, 0, scale, 0, 0);
}

function updateSpellsWindowLayout() {
  if (!spellHudEl || !spellHudEl.closest("#spellsFloatingWindow")) return;
  const body = spellHudEl.closest(".floating-window-body");
  const rect = body?.getBoundingClientRect();
  if (!rect || rect.width <= 0 || rect.height <= 0) return;
  const iconCount = spellHudEl.querySelectorAll(".spell-pill, .passive-spell-slot").length;
  if (!iconCount) {
    spellHudEl.style.setProperty("--spell-window-icon-size", "56px");
    spellHudEl.style.setProperty("--spell-window-gap", "4px");
    spellHudEl.style.setProperty("--spell-window-columns", "1");
    return;
  }
  const normalIconSize = 56;
  const minIconSize = 4;
  let bestSize = 0;
  let bestColumns = 1;
  for (let columns = 1; columns <= iconCount; columns += 1) {
    const rows = Math.ceil(iconCount / columns);
    const gapLimit = Math.min(8, Math.max(1, Math.min(rect.width, rect.height) * 0.03));
    const widthSize = (rect.width - gapLimit * Math.max(0, columns - 1)) / columns;
    const heightSize = (rect.height - gapLimit * Math.max(0, rows - 1)) / rows;
    const size = Math.min(normalIconSize, widthSize, heightSize);
    if (size > bestSize) {
      bestSize = size;
      bestColumns = columns;
    }
  }
  const rows = Math.ceil(iconCount / bestColumns);
  const horizontalGap = bestColumns > 1 ? Math.max(1, Math.min(8, (rect.width - bestSize * bestColumns) / (bestColumns - 1))) : 1;
  const verticalGap = rows > 1 ? Math.max(1, Math.min(8, (rect.height - bestSize * rows) / (rows - 1))) : 1;
  const gap = Math.min(horizontalGap, verticalGap);
  spellHudEl.style.setProperty("--spell-window-icon-size", `${Math.max(minIconSize, Math.floor(bestSize))}px`);
  spellHudEl.style.setProperty("--spell-window-gap", `${Math.max(1, Math.floor(gap))}px`);
  spellHudEl.style.setProperty("--spell-window-columns", String(bestColumns));
}

function renderFloatingMinimap() {
  const entry = floatingWindowRegistry.get("minimap");
  if (!entry || entry.el.classList.contains("hidden") || !minimapWindowCanvas || !minimapWindowCtx) return;
  const rect = minimapWindowCanvas.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return;
  const previousCtx = ctx;
  ctx = minimapWindowCtx;
  ctx.clearRect(0, 0, rect.width, rect.height);
  const previousMapVisible = game.mapVisible;
  game.mapVisible = true;
  drawMapOverlay({ width: rect.width, height: rect.height, floatingMap: true });
  drawFloatingMinimapAreaName({ width: rect.width, height: rect.height });
  game.mapVisible = previousMapVisible;
  ctx = previousCtx;
}

function drawFloatingMinimapAreaName(rect) {
  const name = currentPlayerAreaName();
  if (!name) return;
  const maxWidth = Math.max(90, rect.width - 74);
  ctx.save();
  ctx.font = "bold 13px Georgia, serif";
  const textWidth = Math.min(maxWidth, Math.ceil(ctx.measureText(name).width));
  const boxWidth = textWidth + 18;
  const boxHeight = 26;
  const x = 12;
  const y = 12;
  ctx.globalAlpha = 1;
  ctx.fillStyle = "rgba(8, 10, 8, 0.82)";
  ctx.strokeStyle = "rgba(217, 185, 95, 0.62)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x, y, boxWidth, boxHeight, 4);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.rect(x + 9, y, Math.max(1, boxWidth - 18), boxHeight);
  ctx.clip();
  ctx.fillStyle = "#d7c48b";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(name, x + 9, y + boxHeight / 2 + 1);
  ctx.restore();
}

function stopFloatingMinimapZoomHold() {
  const pointerId = minimapZoomHoldPointerId;
  if (minimapZoomHoldTimer) {
    clearInterval(minimapZoomHoldTimer);
    minimapZoomHoldTimer = null;
  }
  try {
    if (pointerId !== null && pointerId !== undefined) minimapWindowCanvas?.releasePointerCapture?.(pointerId);
  } catch (error) {
    // Pointer capture may already be released by the browser.
  }
  minimapZoomHoldPointerId = null;
}

function floatingMinimapZoomDirectionAt(event) {
  if (!minimapWindowCanvas) return 0;
  const rect = minimapWindowCanvas.getBoundingClientRect();
  const mapRect = mapOverlayBounds({ left: rect.left, top: rect.top, width: rect.width, height: rect.height, floatingMap: true });
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const controls = mapZoomControlBounds(mapRect);
  if (pointInRect(x, y, controls.plus)) return 1;
  if (pointInRect(x, y, controls.minus)) return -1;
  return 0;
}

function startFloatingMinimapZoomHold(direction, pointerId = null) {
  stopFloatingMinimapZoomHold();
  minimapZoomHoldPointerId = pointerId;
  const step = () => {
    adjustMapZoom(direction);
    renderFloatingMinimap();
  };
  step();
  minimapZoomHoldTimer = setInterval(step, 70);
}

function handleFloatingMinimapPointerDown(event) {
  if (event.button !== undefined && event.button !== 0) return;
  const direction = floatingMinimapZoomDirectionAt(event);
  if (direction) {
    event.preventDefault();
    minimapWindowCanvas?.setPointerCapture?.(event.pointerId);
    startFloatingMinimapZoomHold(direction, event.pointerId);
    return;
  }
  handleFloatingMinimapClick(event);
}

function handleFloatingMinimapClick(event) {
  const rect = minimapWindowCanvas.getBoundingClientRect();
  const previousMapVisible = game.mapVisible;
  game.mapVisible = true;
  const handled = handleMapOverlayClick({
    clientX: event.clientX,
    clientY: event.clientY
  }, { left: rect.left, top: rect.top, width: rect.width, height: rect.height, floatingMap: true });
  game.mapVisible = previousMapVisible;
  if (handled) renderFloatingMinimap();
}

const monsterTemplates = window.SoulreaperMonsters?.monsterTemplates || [];

const fenMonsterTemplates = window.SoulreaperMonsters?.fenMonsterTemplates || [];

const allMonsterTemplates = [...monsterTemplates, ...fenMonsterTemplates];
normalizeRealmData(allMonsterTemplates);

const rarityInfo = {
  poor: { label: "Poor", color: "#9a9a9a" },
  common: { label: "Common", color: "#f2ede3" },
  uncommon: { label: "Uncommon", color: "#68a85e" },
  rare: { label: "Rare", color: "#5f94d9" },
  epic: { label: "Epic", color: "#9c6be8" }
};

const enchantmentTemplates = {
  "Faerie Sigil": {
    "name": "Faerie Sigil",
    "realm": "Sylvan",
    "stats": {
      "FOCUS": 1,
      "REGEN": 1
    }
  },
  "Blue Hydra Scale": {
    "name": "Blue Hydra Scale",
    "realm": "Ethereal",
    "stats": {
      "DEF": 1,
      "INT": 1,
      "FOCUS": 1,
      "BLOCK": 1,
      "RESIST": 1,
      "REGEN": 1
    },
    "requiredArmorTypes": [
      "Chainmail"
    ],
    "changesColorChannels": true,
    "colorChannels": {
      "metal": "#0b45a2"
    }
  },
  "Smokey Badge": {
    "name": "Smokey Badge",
    "realm": "Sylvan",
    "stats": {
      "REGEN": 1
    }
  },
  "Lake Yarrow": {
    "name": "Lake Yarrow",
    "realm": "Sylvan",
    "stats": {
      "AGL": 1,
      "RESIST": 1,
      "REGEN": 1
    }
  },
  "Ember Badge": {
    "name": "Ember Badge",
    "realm": "Infernal",
    "stats": {
      "ATK": 1
    }
  },
  "Warden Badge": {
    "name": "Warden Badge",
    "realm": "Sylvan",
    "stats": {
      "RESIST": 1
    }
  },
  "Gandersguard Sigil": {
    "name": "Gandersguard Sigil",
    "realm": "Mortal",
    "stats": {
      "HP": 5,
      "RESIST": 1
    }
  },
  "Goblin Slayer": {
    "name": "Goblin Slayer",
    "realm": "Mortal",
    "stats": {
      "HP": 5,
      "RESIST": 1
    },
    "requiredSlots": [
      "Main Hand"
    ],
    "requiredWeaponTypes": [
      "Bow",
      "Slashing",
      "Stabbing",
      "Blunt",
      "Axe",
      "Spear"
    ]
  },
  "Fenguard Sigil": {
    "name": "Fenguard Sigil",
    "realm": "Infernal",
    "stats": {
      "HP": 5,
      "ATK": 1,
      "AGL": 2,
      "RESIST": 2
    }
  },
  "Necromagister's Sigil": {
    "name": "Necromagister's Sigil",
    "realm": "Umbral",
    "stats": {
      "INT": 2,
      "RESIST": 1
    }
  },
  "Gvada's Blessing": {
    "name": "Gvada's Blessing",
    "realm": "Ethereal",
    "stats": {
      "RESIST": 1
    }
  },
  "Neophyte Badge": {
    "name": "Neophyte Badge",
    "realm": "Ethereal",
    "stats": {
      "INT": 1
    }
  },
  "Badge of Light": {
    "name": "Badge of Light",
    "realm": "Celestial",
    "stats": {
      "INT": 1
    }
  },
  "Acolyte Badge": {
    "name": "Acolyte Badge",
    "realm": "Umbral",
    "stats": {
      "INT": 1
    }
  },
  "Weapons Training Badge": {
    "name": "Weapons Training Badge",
    "realm": "Mortal",
    "stats": {
      "ATK": 1
    }
  },
  "Shield Training Badge": {
    "name": "Shield Training Badge",
    "realm": "Mortal",
    "stats": {
      "BLOCK": 1
    }
  }
};

const itemTemplates = window.SoulreaperItems?.itemTemplates || {};
normalizeRealmData(itemTemplates);

const itemGraphics = window.SoulreaperItemArt?.graphics || {};


for (const [name, graphic] of Object.entries(itemGraphics)) {
  if (itemTemplates[name] && !itemTemplates[name].graphic) itemTemplates[name].graphic = graphic;
}

for (const item of Object.values(itemTemplates)) {
  item.stats = normalizeItemStats(item.stats || {});
  normalizeRealmMap(item.resistances);
  if (item.weapon) {
    item.weapon = normalizeWeapon(item.weapon, item.name);
    item.graphic = item.graphic || item.weapon.graphic || "question mark";
    item.resistances = item.resistances || item.weapon.resistances || {};
    normalizeRealmMap(item.resistances);
    if (item.glow === undefined && item.weapon.glow !== undefined) item.glow = item.weapon.glow;
    if (!item.glowColor && item.weapon.glowColor) item.glowColor = item.weapon.glowColor;
    if (item.goldValue === undefined && item.weapon.goldValue !== undefined) item.goldValue = item.weapon.goldValue;
  }
}

const monsterLootTables = window.SoulreaperMonsters?.monsterLootTables || {};
normalizeRealmData(monsterLootTables);

const areaSpawnTables = window.SoulreaperWorldData?.areaSpawnTables || {};
normalizeRealmData(areaSpawnTables);

const devAreaConfigs = window.SoulreaperWorldData?.devAreaConfigs || {};
const devQuestConfigs = window.SoulreaperWorldData?.devQuestConfigs || {};

const devNpcConfigs = window.SoulreaperWorldData?.devNpcConfigs || [];

const devDungeonConfigs = window.SoulreaperWorldData?.devDungeonConfigs || [];

const devSpellConfigs = window.SoulreaperWorldData?.devSpellConfigs || {};
const devCraftingRecipes = window.SoulreaperWorldData?.devCraftingRecipes || {};
const DEFAULT_FACTION_CONFIGS = [
  { id: "ratkin", name: "Ratkin", enemyFactionIds: [] },
  { id: "gandersguard", name: "Gandersguard", enemyFactionIds: ["fenguard", "goblin", "froglin"] },
  { id: "fenguard", name: "Fenguard", enemyFactionIds: ["gandersguard"] },
  { id: "goblin", name: "Goblin", enemyFactionIds: ["gandersguard"] },
  { id: "froglin", name: "Froglin", enemyFactionIds: ["gandersguard"] }
];
const worldFactionConfigs = window.SoulreaperWorldData?.devFactionConfigs || [];
const devFactionConfigs = normalizeFactionConfigs(worldFactionConfigs.length ? worldFactionConfigs : DEFAULT_FACTION_CONFIGS);
const factionConfigById = new Map(devFactionConfigs.map(faction => [faction.id, faction]));
normalizeRealmData(devAreaConfigs);
normalizeRealmData(devQuestConfigs);
normalizeRealmData(devNpcConfigs);
normalizeRealmData(devDungeonConfigs);
normalizeRealmData(devSpellConfigs);
for (const dungeon of devDungeonConfigs) {
  if (dungeon?.name && Array.isArray(dungeon.spawnTable)) areaSpawnTables[dungeon.name] = dungeon.spawnTable;
}

function devDungeonConfigForArea(areaName) {
  return devDungeonConfigs.find(dungeon => dungeon?.name === areaName) || null;
}

const {
  NPC_INTERACTION_ALIGNMENTS,
  DEFAULT_NPC_REFUSAL_TEXT,
  npcConfigKey,
  npcConfigFor,
  npcShopItems,
  npcShopInventory,
  applyNpcShopInventory,
  applyConfiguredNpcShopSection,
  npcInteractionAlignment,
  npcRefusalText,
  npcInteractsWithPlayer,
  refuseNpcInteraction,
  allowNpcInteraction,
  applyNpcConfig,
  applyNpcConfigsToMap,
  npcContactKey,
  handleWhisperspringFriendlyContacts,
  handleGuardContact
} = window.SoulreaperNpcInteractions || {};



function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  canvas.width = Math.max(640, Math.floor(rect.width * scale));
  canvas.height = Math.max(420, Math.floor(rect.height * scale));
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  invalidateGroundCache();
}

function currentPlayerAreaName() {
  return spawnAreaAt(game.player.x, game.player.y) || "The Black Wilds";
}

function logAreaName(context = null) {
  if (typeof context === "string") return context;
  if (context && Number.isFinite(context.x) && Number.isFinite(context.y)) {
    return areaAt(context.x, context.y)?.name || "The Black Wilds";
  }
  return currentPlayerAreaName();
}

function renderChronicle() {
  const area = currentPlayerAreaName();
  game.chronicleArea = area;
  const entriesForView = view => game.logs
    .filter(entry => {
      if (view === "all") return true;
      const kind = inferLogKind(entry.message, entry.kind);
      return view === "chronicle" ? kind === "chronicle" : kind === view;
    })
    .slice(0, 42)
    .reverse();
  const entries = entriesForView(game.logView);
  logEl.innerHTML = entries.map(entry => `<li>${entry.message}</li>`).join("");
  chronicleTab?.classList.toggle("active", game.logView === "all" || game.logView === "chronicle");
  chatLogTab?.classList.toggle("active", game.logView === "chat");
  document.querySelectorAll("[data-log-view]").forEach(button => {
    button.classList.toggle("active", button.dataset.logView === (game.logView === "chronicle" ? "all" : game.logView));
  });
  document.querySelectorAll("[data-detached-log-view]").forEach(list => {
    const view = list.dataset.detachedLogView || "all";
    list.innerHTML = entriesForView(view).map(entry => `<li>${entry.message}</li>`).join("");
  });
  dockChatInput();
  requestAnimationFrame(() => {
    const logs = [logEl, ...document.querySelectorAll("[data-detached-log-view]")].filter(Boolean);
    logs.forEach(list => { list.scrollTop = list.scrollHeight; });
  });
}

function inferLogKind(message, kind = "chronicle") {
  if (kind !== "chronicle") return kind;
  const text = String(message || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
  if (/\b(deals?|hits?|blocks?|blocked|slain|reaped|resisted|immune|poisoned|afflicts?|stuns?|holds?|curses?|fizzles|out of range|line of sight|cooling down|cannot harm|cannot deal|incorporeal|ring of fire|fireblast|ice storm|thorn shield|burning skin|tangle vine|spiderweb|mortify|faerie dust)\b/.test(text)) {
    return "combat";
  }
  if (/^lvl\s+\d+.+\b(is slain|is reaped)\b/.test(text)) return "combat";
  return kind;
}

function addLog(message, context = null, kind = "chronicle") {
  const resolvedKind = inferLogKind(message, kind);
  game.logs.unshift({ message, area: logAreaName(context), kind: resolvedKind });
  if (game.logs.length > 240) game.logs.length = 240;
  renderChronicle();
}

function addThrottledLog(message, context = null, kind = "chronicle", key = message, intervalSeconds = 3) {
  game.logThrottle ||= {};
  const now = performance.now() / 1000;
  const throttleKey = `${kind}:${key}`;
  if (now - (game.logThrottle[throttleKey] || 0) < intervalSeconds) return false;
  game.logThrottle[throttleKey] = now;
  addLog(message, context, kind);
  return true;
}

function addChatLog(message, context = null) {
  addLog(message, context, "chat");
}

function playerDamageAmountHtml(amount) {
  return `<b class="chronicle-player-damage">${formatNumber(amount)}</b>`;
}

function playerHealAmountHtml(amount) {
  return `<b class="chronicle-player-heal">${formatNumber(amount)} HP</b>`;
}

const CHAT_COMMAND_LIST = [
  "/list",
  "/say [message] or /s [message]",
  "/shout [message], /yell [message], or /y [message]",
  "/team [message] or /t [message]",
  "/world [message] or /w [message]",
  "/general [message] or /g [message]",
  "/tell [name] [message]",
  "/who",
  "/trade [name]",
  "/inspect [name]",
  "/invite [player name]",
  "/leave",
  "/remove [player name]",
  "/makeleader [player name]",
  "/afk",
  "/lfg",
  "/map",
  "/worlds"
];

const CHAT_CHANNELS = {
  say: { label: "Say", color: "", aliases: ["/say", "/s"] },
  shout: { label: "Shout", color: "#ff4d4d", aliases: ["/shout", "/yell", "/y"] },
  team: { label: "Team", color: "#6fd7ff", aliases: ["/team", "/t"] },
  world: { label: "World", color: "#60d466", aliases: ["/world", "/w"] },
  general: { label: "General", color: "#a9a9a9", aliases: ["/general", "/g"] }
};

function playerChatTags(player = game.player) {
  return `${player?.afk ? " (AFK)" : ""}${player?.lfg ? " (LFG)" : ""}`;
}

function renderChatTextWithItemLinks(text) {
  const escaped = escapeHtml(text);
  return escaped.replace(/\[([^\]\n]{1,100})\]/g, (match, itemName) => {
    const template = itemTemplates[itemName];
    if (!template) return match;
    const item = cloneItem(itemName) || template;
    return `<span class="chat-item-link" tabindex="0">${match}${itemTooltipHtml(item)}</span>`;
  });
}

function chatLineHtml(name, text, channel = "say", self = false) {
  const info = CHAT_CHANNELS[channel] || CHAT_CHANNELS.say;
  const speaker = self ? "You" : (name || "Soulreaper");
  let label = speaker;
  if (channel === "say") label = `${speaker} say${self ? "" : "s"}`;
  else if (channel === "shout") label = `${speaker} shout${self ? "" : "s"}`;
  else if (channel === "world") label = `${speaker} (World)`;
  else if (channel === "general") label = `${speaker} (General)`;
  const content = `<b>${escapeHtml(label)}:</b> ${renderChatTextWithItemLinks(text)}`;
  return info.color ? `<span style="color:${info.color}">${content}</span>` : content;
}

function addChannelChatLog(name, text, channel = "say", { self = false, area = null } = {}) {
  game.logs.unshift({ message: chatLineHtml(name, text, channel, self), area: area || currentPlayerAreaName(), kind: "chat" });
  if (game.logs.length > 240) game.logs.length = 240;
  renderChronicle();
}

function addPlayerSpeech(text, { broadcast = true, channel = "say" } = {}) {
  const clean = text.trim();
  if (!clean) return;
  if ((channel === "team" || channel === "world" || channel === "general") && game.mode !== "multiplayer") {
    addLog(`<b>Chat:</b> ${CHAT_CHANNELS[channel]?.label || "That"} channel requires multiplayer.`, null, "chat");
    return;
  }
  if (channel === "team" && !game.multiplayer.team) {
    addLog("<b>Team:</b> you are not in a team.", null, "chat");
    return;
  }
  if (channel === "say" || channel === "shout") {
    const duration = Math.min(9, Math.max(2.4, clean.length * 0.065));
    game.playerSpeech = { text: clean, age: 0, duration };
  }
  addChannelChatLog(game.player.name || "Soulreaper", clean, channel, { self: true });
  if (broadcast) sendMultiplayerChat(clean, channel);
}

function addNpcSpeech(speaker, text) {
  const clean = String(text || "").trim();
  if (!speaker || !clean) return;
  const duration = Math.min(12, Math.max(3, clean.length * 0.07));
  const existing = game.npcSpeech.find(entry => entry.speaker === speaker);
  if (existing?.text === clean && existing.age < existing.duration * 0.85) return false;
  const speech = { speaker, text: clean, age: 0, duration };
  if (existing) Object.assign(existing, speech);
  else game.npcSpeech.push(speech);
  return true;
}

function listDevtoolCommands() {
  addLog("<b>Devtools:</b> addgold [n], addxp [n], addxp [realm] [n], addlvl [n], maxlvl, allspells, addstat [STAT] [n], additem, additem [item], spawn, godmode, ghostmode, inspect, collision, pointto [area], goto [area], list devtools.");
}

function nextXpRequirement(current, currentLevel = game.player.level) {
  const multiplier = currentLevel >= 12 ? 1.15 : currentLevel >= 10 ? 1.5 : 2;
  return Math.ceil(current * multiplier);
}

function levelHpGain() {
  return 5;
}

function levelPlayerByCommand(amount) {
  if (!Number.isFinite(amount)) return false;
  const levels = Math.max(0, Math.floor(amount));
  for (let i = 0; i < levels; i += 1) {
    const hpGain = levelHpGain();
    game.player.level += 1;
    game.player.maxHp += hpGain;
    game.player.stats.HP = game.player.maxHp;
    game.player.hp = Math.min(game.player.maxHp, game.player.hp + hpGain);
    game.player.nextXp = nextXpRequirement(game.player.nextXp);
  }
  if (levels) {
    spawnFloatingText(game.player, `+${levels} LVL`, "#d9b95f", "rgba(0, 0, 0, 0.82)", 1.4);
    addLog(`<b>Devtools:</b> gained <b>${levels}</b> ${levels === 1 ? "level" : "levels"}.`);
    openLevelChoice(levels);
    markUIDirty();
  }
  return true;
}

function maxLearnedSpellLevelsByCommand() {
  const targetLevel = Math.max(1, Math.floor(Number(game.player.level) || 1));
  let changed = 0;
  game.player.spellLevels ||= {};
  const learnedNames = new Set([
    ...(Array.isArray(game.player.learnedSpells) ? game.player.learnedSpells : []),
    ...(game.player.spells || []).map(spell => spell?.name).filter(Boolean)
  ]);
  for (const name of learnedNames) {
    if ((game.player.spellLevels[name] || 1) < targetLevel) {
      game.player.spellLevels[name] = targetLevel;
      changed += 1;
    }
  }
  for (const spell of game.player.spells || []) {
    if (!spell || spell.static) continue;
    if (spellLevel(spell) >= targetLevel) {
      spell.lvl = Math.max(spellLevel(spell), game.player.spellLevels[spell.name] || 1);
      continue;
    }
    spell.lvl = targetLevel;
  }
  if (changed) {
    spawnFloatingText(game.player, "SPELLS MAXED", "#d9b95f", "rgba(0, 0, 0, 0.82)", 1.4);
    addLog(`<b>Devtools:</b> trained <b>${changed}</b> learned ${changed === 1 ? "spell" : "spells"} to LVL <b>${targetLevel}</b>.`);
    markUIDirty();
  } else {
    addLog(`<b>Devtools:</b> all learned spells are already LVL <b>${targetLevel}</b> or higher.`);
  }
  return true;
}

function learnAllSpellsByCommand() {
  game.player.learnedSpells ||= [];
  game.player.newSpellAlerts ||= [];
  game.player.spellLevels ||= {};
  const known = new Set(game.player.learnedSpells);
  const spellNames = starterSpells
    .map(spell => spell?.name)
    .filter(name => name && makeSpell(name));
  let learned = 0;
  for (const name of spellNames) {
    if (known.has(name)) continue;
    known.add(name);
    game.player.learnedSpells.push(name);
    if (!game.player.newSpellAlerts.includes(name)) game.player.newSpellAlerts.push(name);
    game.player.spellLevels[name] = savedSpellLevel(name);
    learned += 1;
  }
  if (learned) {
    spawnFloatingText(game.player, `+${learned} SPELLS`, "#d9b95f", "rgba(0, 0, 0, 0.82)", 1.4);
    addLog(`<b>Devtools:</b> learned <b>${learned}</b> ${learned === 1 ? "spell" : "spells"}.`);
    markUIDirty();
    renderSpellbookWindow();
    renderUI();
  } else {
    addLog("<b>Devtools:</b> all spells are already in your Spell Book.");
  }
  return true;
}

function findAreaByName(name) {
  const normalized = name.trim().toLowerCase();
  if (!normalized) return null;
  return game.map?.areas?.find(area => area.name.toLowerCase() === normalized)
    || game.map?.areas?.find(area => area.name.toLowerCase().includes(normalized));
}

function runDevtoolCommand(text) {
  const trimmed = text.trim();
  const parts = trimmed.split(/\s+/);
  const command = parts[0]?.toLowerCase();
  if (trimmed.toLowerCase() === "list devtools") {
    listDevtoolCommands();
    return true;
  }
  if (command === "addgold") {
    const parsed = Number(parts[1] || 0);
    if (!Number.isFinite(parsed)) {
      addLog(`<b>Devtools:</b> use addgold [n].`);
      return true;
    }
    const amount = Math.max(0, Math.floor(parsed));
    game.player.gold += amount;
    spawnFloatingText(game.player, `+${amount} Gold`, "#d9b95f", "rgba(0, 0, 0, 0.82)", 1.4);
    addLog(`<b>Devtools:</b> added <b>${amount} gold</b>.`);
    markUIDirty();
    return true;
  }
  if (command === "addxp") {
    if (parts.length >= 3) {
      const realm = normalizeRealm(parts[1] || "");
      const parsedRealmAmount = Number(parts[2] || 0);
      if (!realm || !Number.isFinite(parsedRealmAmount)) {
        addLog(`<b>Devtools:</b> use addxp [realm] [n].`);
        return true;
      }
      const amount = Math.max(0, Math.floor(parsedRealmAmount));
      grantRealmXP(realm, amount);
      addLog(`<b>Devtools:</b> gained <b>${amount} ${realm}</b> Realm XP.`);
      markUIDirty();
      return true;
    }
    const parsed = Number(parts[1] || 0);
    if (!Number.isFinite(parsed)) {
      addLog(`<b>Devtools:</b> use addxp [n] or addxp [realm] [n].`);
      return true;
    }
    const amount = Math.max(0, Math.floor(parsed));
    grantXP(amount);
    addLog(`<b>Devtools:</b> gained <b>${amount} XP</b>.`);
    markUIDirty();
    return true;
  }
  if (command === "addlvl") {
    if (!levelPlayerByCommand(Number(parts[1] || 0))) addLog(`<b>Devtools:</b> use addlvl [n].`);
    return true;
  }
  if (command === "maxlvl") {
    return maxLearnedSpellLevelsByCommand();
  }
  if (command === "allspells") {
    return learnAllSpellsByCommand();
  }
  if (command === "addstat") {
    const stat = (parts[1] || "").toUpperCase();
    const amount = Number(parts[2] || 0);
    if (!Number.isFinite(amount)) {
      addLog(`<b>Devtools:</b> use addstat [STAT] [n].`);
      return true;
    }
    if (stat === "VIRTUE") {
      adjustVirtue(amount);
      addLog(`<b>Devtools:</b> <b>VIRTUE</b> changed by <b>${formatNumber(amount)}</b>.`);
      markUIDirty();
      return true;
    }
    if (!Object.prototype.hasOwnProperty.call(game.player.stats, stat)) {
      addLog(`<b>Devtools:</b> use addstat [STAT] [n].`);
      return true;
    }
    game.player.stats[stat] += amount;
    if (stat === "HP") {
      game.player.maxHp = Math.max(1, game.player.stats.HP);
      game.player.hp = Math.min(game.player.maxHp, game.player.hp + amount);
    }
    spawnFloatingText(game.player, `${stat} ${amount >= 0 ? "+" : ""}${formatNumber(amount)}`, "#d9b95f", "rgba(0, 0, 0, 0.82)", 1.4);
    addLog(`<b>Devtools:</b> <b>${stat}</b> changed by <b>${formatNumber(amount)}</b>.`);
    markUIDirty();
    return true;
  }
  if (command === "additem") {
    const itemName = parts.slice(1).join(" ");
    if (!itemName.trim()) {
      openDevItemShop();
      return true;
    }
    const item = cloneItem(itemName);
    if (!item) {
      addLog(`<b>Devtools:</b> item not found.`);
      return true;
    }
    if (!addInventoryItem(item)) {
      addLog(`<b>Devtools:</b> inventory is full.`);
      return true;
    }
    spawnFloatingText(game.player, `+${item.name}`, "#d9b95f", "rgba(0, 0, 0, 0.82)", 1.4);
    addLog(`<b>Devtools:</b> added <b>${escapeHtml(item.name)}</b> to inventory.`);
    markUIDirty();
    return true;
  }
  if (command === "spawn") {
    openDevSpawnWindow();
    return true;
  }
  if (command === "godmode") {
    game.godMode = !game.godMode;
    spawnFloatingText(game.player, game.godMode ? "GODMODE ON" : "GODMODE OFF", "#f0cf63", "rgba(0, 0, 0, 0.82)", 1.4);
    addLog(`<b>Devtools:</b> godmode ${game.godMode ? "enabled" : "disabled"}.`);
    markUIDirty();
    return true;
  }
  if (command === "ghostmode") {
    game.ghostMode = !game.ghostMode;
    spawnFloatingText(game.player, game.ghostMode ? "GHOST ON" : "GHOST OFF", "#d9b95f", "rgba(0, 0, 0, 0.82)", 1.4);
    addLog(`<b>Devtools:</b> ghost mode ${game.ghostMode ? "enabled" : "disabled"}.`);
    return true;
  }
  if (command === "inspect") {
    game.inspectMobs = !game.inspectMobs;
    spawnFloatingText(game.player, game.inspectMobs ? "INSPECT ON" : "INSPECT OFF", "#8db8ff", "rgba(0, 0, 0, 0.82)", 1.4);
    addLog(`<b>Devtools:</b> mob inspection ${game.inspectMobs ? "enabled" : "disabled"}.`);
    return true;
  }
  if (command === "collision") {
    game.showCollision = !game.showCollision;
    spawnFloatingText(game.player, game.showCollision ? "COLLISION ON" : "COLLISION OFF", "#ffcf66", "rgba(0, 0, 0, 0.82)", 1.4);
    addLog(`<b>Devtools:</b> collision boundaries ${game.showCollision ? "enabled" : "disabled"}.`);
    return true;
  }
  if (command === "pointto") {
    const areaName = parts.slice(1).join(" ");
    const area = findAreaByName(areaName);
    if (!area) {
      addLog(`<b>Devtools:</b> area not found.`);
      return true;
    }
    game.pointTargetArea = area.name;
    addLog(`<b>Devtools:</b> pointing to <b>${escapeHtml(area.name)}</b>.`);
    return true;
  }
  if (command === "goto") {
    const areaName = parts.slice(1).join(" ");
    const area = findAreaByName(areaName);
    if (!area) {
      addLog(`<b>Devtools:</b> area not found.`);
      return true;
    }
    teleportPlayerTo(area.center);
    game.pointTargetArea = null;
    game.whisperspringTeleportLatch = true;
    spawnFloatingText(game.player, `GOTO ${area.name}`, "#ffcf66", "rgba(0, 0, 0, 0.82)", 1.4);
    addLog(`<b>Devtools:</b> teleported to <b>${escapeHtml(area.name)}</b>.`);
    return true;
  }
  addLog(`<b>Devtools:</b> unknown command. Type <b>list devtools</b>.`);
  return true;
}

function submitChatInput() {
  const text = chatInput.value.trim();
  chatInput.value = "";
  chatInput.classList.add("hidden");
  game.chatOpen = false;
  canvas.focus?.();
  if (!text) return;
  if (text.toLowerCase() === "/list") {
    addLog(`<b>Chat commands:</b> ${CHAT_COMMAND_LIST.map(escapeHtml).join(", ")}`, null, "chat");
    return;
  }
  if (text.toLowerCase() === "/map") {
    game.mapVisible = !game.mapVisible;
    addLog(`Map ${game.mapVisible ? "shown" : "hidden"}.`);
    return;
  }
  if (text.toLowerCase() === "/world") {
    if (game.mode === "multiplayer" && game.multiplayer.worldName) {
      addLog(`<b>World:</b> ${escapeHtml(game.multiplayer.worldName)}.`);
    } else {
      addLog("<b>World:</b> single-player/local game.");
    }
    return;
  }
  if (text.toLowerCase() === "/worlds") {
    requestMultiplayerWorldList();
    return;
  }
  if (handleChannelChatCommand(text)) return;
  if (handleMultiplayerChatCommand(text)) return;
  if (handleTeamChatCommand(text)) return;
  if (!game.devtoolsEnabled && text.toLowerCase() === "devtools") {
    game.devtoolsEnabled = true;
    addLog("<b>Devtools enabled.</b>");
    listDevtoolCommands();
    return;
  }
  if (game.devtoolsEnabled) {
    runDevtoolCommand(text);
    return;
  }
  addPlayerSpeech(text, { channel: game.chatChannel || "say" });
}

function chatInputHost() {
  const detachedChatList = document.querySelector('[data-detached-log-view="chat"]');
  const detachedChatWindow = detachedChatList?.closest(".floating-window");
  if (detachedChatWindow && !detachedChatWindow.classList.contains("hidden")) {
    return detachedChatWindow.querySelector(".floating-window-body") || detachedChatWindow;
  }
  return document.querySelector("#chronicleFloatingWindow .floating-window-body") || document.querySelector("#chronicleFloatingWindow");
}

function chatChannelHost() {
  const detachedChatList = document.querySelector('[data-detached-log-view="chat"]');
  const detachedChatWindow = detachedChatList?.closest(".floating-window");
  if (detachedChatWindow && !detachedChatWindow.classList.contains("hidden")) {
    return detachedChatWindow.querySelector('[data-chat-channel-slot="detached-chat"]') || detachedChatWindow.querySelector(".floating-window-body") || detachedChatWindow;
  }
  return document.querySelector('[data-chat-channel-slot="chronicle"]')
    || document.querySelector("#chronicleFloatingWindow .chronicle-toolbar")
    || document.querySelector("#chronicleFloatingWindow .floating-window-body")
    || document.querySelector("#chronicleFloatingWindow");
}

function syncChatChannelSelect() {
  if (chatChannelSelect) chatChannelSelect.value = game.chatChannel || "say";
}

function dockChatInput() {
  if (!chatInput) return;
  const host = chatInputHost();
  if (!host) return;
  const channelHost = chatChannelHost();
  if (channelHost && chatChannelControl.parentElement !== channelHost) channelHost.appendChild(chatChannelControl);
  if (chatInput.parentElement !== host) host.appendChild(chatInput);
  syncChatChannelSelect();
}

function itemFromClickedElement(target) {
  const inventoryButton = target?.closest?.("[data-inventory-index]");
  if (inventoryButton) return game.player.inventory[Number(inventoryButton.dataset.inventoryIndex)] || null;
  const equipmentButton = target?.closest?.("[data-equipment-slot]");
  if (equipmentButton) return game.player.equippedItems[equipmentButton.dataset.equipmentSlot] || null;
  const bagButton = target?.closest?.("[data-bag-slot-index]");
  if (bagButton) {
    const bagIndex = Number(bagButton.closest("#bagInventoryTooltip")?.dataset.inventoryIndex);
    const bag = game.player.inventory[bagIndex];
    const bagInventory = isBagItem(bag) ? ensureBagInventory(bag) : [];
    return bagInventory[Number(bagButton.dataset.bagSlotIndex)] || null;
  }
  return null;
}

function insertChatItemLink(item) {
  if (!item?.name || !chatInput) return false;
  const link = `[${item.name}]`;
  const start = chatInput.selectionStart ?? chatInput.value.length;
  const end = chatInput.selectionEnd ?? chatInput.value.length;
  const before = chatInput.value.slice(0, start);
  const after = chatInput.value.slice(end);
  const prefix = before && !/\s$/.test(before) ? " " : "";
  const suffix = after && !/^\s/.test(after) ? " " : "";
  chatInput.value = `${before}${prefix}${link}${suffix}${after}`;
  const cursor = before.length + prefix.length + link.length;
  chatInput.focus();
  chatInput.setSelectionRange?.(cursor, cursor);
  return true;
}

function openChatInput() {
  if (hasOpenModal()) return;
  if (document.querySelector("#chronicleFloatingWindow")?.classList.contains("hidden")) setFloatingOpen("chronicle", true);
  dockChatInput();
  game.chatOpen = true;
  game.keys.clear();
  chatInput.classList.remove("hidden");
  chatInput.value = "";
  chatInput.focus();
}

function hasOpenModal() {
  return !spellChoice.classList.contains("hidden")
    || !modeChoice.classList.contains("hidden")
    || !deathScreen.classList.contains("hidden")
    || !confirmWindow.classList.contains("hidden")
    || !replaceSpellWindow.classList.contains("hidden");
}

function syncPointerPause() {
  if (game.mode === "multiplayer") {
    const hardStopped = !modeChoice.classList.contains("hidden") || !deathScreen.classList.contains("hidden");
    game.pausedByPointer = false;
    if (pauseNotice) pauseNotice.classList.add("hidden");
    game.running = !hardStopped;
    return;
  }
  game.pausedByPointer = !game.pointerInArena && !hasOpenModal();
  if (pauseNotice) pauseNotice.classList.toggle("hidden", !game.pausedByPointer);
  if (game.pausedByPointer) {
    game.running = false;
  } else if (hasOpenModal()) {
    game.running = false;
  } else if (!hasOpenModal()) {
    game.running = true;
  }
}

function updatePointerFromEvent(event) {
  const element = document.elementFromPoint(event.clientX, event.clientY);
  game.pointerInArena = Boolean(element && arenaWrap.contains(element));
}

function realmMultiplier(attackingRealm, defendingRealm) {
  attackingRealm = normalizeRealm(attackingRealm);
  defendingRealm = normalizeRealm(defendingRealm);
  if (attackingRealm === "Mortal") return 1;
  const matchup = realmInfo[attackingRealm] || {};
  if ((matchup.strongVs || []).includes(defendingRealm)) return 1.25;
  if ((matchup.weakVs || []).includes(defendingRealm)) return 0.75;
  return 1;
}

function realmUiColor(realm) {
  realm = normalizeRealm(realm);
  return realm === "Umbral" ? "#9c6be8" : realmInfo[realm]?.color || realmInfo.Mortal.color;
}

function colorWithAlpha(color, alpha) {
  const hex = String(color || "").trim();
  const normalized = hex.startsWith("#") ? hex.slice(1) : hex;
  if (/^[0-9a-f]{3}$/i.test(normalized)) {
    const [r, g, b] = normalized.split("").map(char => parseInt(`${char}${char}`, 16));
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  if (/^[0-9a-f]{6}$/i.test(normalized)) {
    const r = parseInt(normalized.slice(0, 2), 16);
    const g = parseInt(normalized.slice(2, 4), 16);
    const b = parseInt(normalized.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return color || `rgba(240, 207, 99, ${alpha})`;
}

function colorWithAlpha(color, alpha) {
  const match = String(color || "").match(/^#([0-9a-f]{6})$/i);
  if (!match) return color;
  const value = parseInt(match[1], 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function positionFloatingItemTooltip(event) {
  const trigger = event.target.closest(".inventory-slot.filled, .equip-button, .shop-item, .quest-reward-item, .action-item-preview, .chat-item-link");
  const tooltip = trigger?.querySelector(".item-tooltip");
  if (!tooltip) {
    floatingItemTooltip.classList.add("hidden");
    return;
  }
  floatingItemTooltip.innerHTML = tooltip.innerHTML;
  floatingItemTooltip.classList.remove("hidden");
  const rect = floatingItemTooltip.getBoundingClientRect();
  const triggerRect = trigger.getBoundingClientRect();
  const gap = 14;
  const anchorX = Number.isFinite(event.clientX) ? event.clientX : triggerRect.right;
  const anchorY = Number.isFinite(event.clientY) ? event.clientY : triggerRect.bottom;
  let left = anchorX + gap;
  let top = anchorY + gap;
  if (left + rect.width > window.innerWidth - 10) left = anchorX - rect.width - gap;
  if (top + rect.height > window.innerHeight - 10) top = window.innerHeight - rect.height - 10;
  floatingItemTooltip.style.left = `${Math.max(10, left)}px`;
  floatingItemTooltip.style.top = `${Math.max(10, top)}px`;
}

function defaultAlignmentForRealm(realm) {
  realm = normalizeRealm(realm);
  if (realm === "Celestial" || realm === "Sylvan") return "Good";
  if (realm === "Umbral" || realm === "Infernal") return "Evil";
  return "Neutral";
}

function playerAlignment() {
  if (game.player.virtue <= -10) return "Evil";
  if (game.player.virtue >= 10) return "Good";
  return "Neutral";
}

function unitAlignment(unit) {
  if (unit === game.player) return playerAlignment();
  if (unit?.pet) {
    const master = petMaster(unit);
    if (master) return master === game.player ? playerAlignment() : (master.alignment || "Neutral");
  }
  return unit.alignment || defaultAlignmentForRealm(unit.realm);
}

function alignmentSymbol(alignment) {
  if (alignment === "Good") return "☀";
  if (alignment === "Evil") return "☾";
  return "";
}

function alignmentSymbolColor(alignment) {
  if (alignment === "Good") return "#f0cf63";
  if (alignment === "Evil") return "#d84e42";
  return "#d7c48b";
}

function alignmentHostileTo(attackerAlignment, defenderAlignment) {
  if (attackerAlignment === "Evil") return defenderAlignment === "Neutral" || defenderAlignment === "Good";
  if (attackerAlignment === "Good") return defenderAlignment === "Evil";
  return false;
}

function factionId(value) {
  return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function normalizeFactionConfigs(configs = []) {
  const byId = new Map();
  for (const config of Array.isArray(configs) ? configs : []) {
    const id = factionId(config?.id || config?.name);
    if (!id) continue;
    byId.set(id, {
      id,
      name: String(config?.name || id).trim() || id,
      enemyFactionIds: [...new Set((config?.enemyFactionIds || []).map(factionId).filter(Boolean))]
    });
  }
  for (const faction of byId.values()) {
    faction.enemyFactionIds = faction.enemyFactionIds.filter(id => byId.has(id) && id !== faction.id);
  }
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
  if (!name) return "";
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
  const factionA = factionConfigById.get(factionId(a));
  const idB = factionId(b);
  return Boolean(factionA && idB && factionA.enemyFactionIds.includes(idB));
}

function playerFactionStandings(player = game.player) {
  player.factionStandings ||= {};
  return player.factionStandings;
}

function playerFactionStanding(id, player = game.player) {
  return Number(playerFactionStandings(player)[factionId(id)] || 0);
}

function playerFactionStatus(id, player = game.player) {
  const standing = playerFactionStanding(id, player);
  if (standing < -10) return "Enemy";
  if (standing > 10) return "Ally";
  return "Neutral";
}

function playerFriendlyToFaction(id, player = game.player) {
  return playerFactionStatus(id, player) === "Ally";
}

function playerHostileToFaction(id, player = game.player) {
  return playerFactionStatus(id, player) === "Enemy";
}

function unitsFactionHostile(attacker, defender) {
  const attackerFaction = unitFactionId(attacker);
  const defenderFaction = unitFactionId(defender);
  if (!attackerFaction || !defenderFaction) return null;
  if (attackerFaction === defenderFaction) return false;
  if (factionsAreEnemies(attackerFaction, defenderFaction) || factionsAreEnemies(defenderFaction, attackerFaction)) return true;
  return null;
}

function beastFoodchain(unit) {
  return unit?.type === "Beast" ? (unit.foodchain || "Prey") : "";
}

function foodchainHostileTo(attacker, defender) {
  return beastFoodchain(attacker) === "Predator" && beastFoodchain(defender) === "Prey";
}

function neutralAggressiveThreatToMobs(attacker, defender) {
  return attacker !== game.player
    && defender !== game.player
    && unitAlignment(defender) === "Neutral"
    && Boolean(defender.aggressive)
    && (unitAlignment(attacker) === "Good" || unitAlignment(attacker) === "Neutral");
}

function sameNonMortalRealmAggroBlocked(attacker, defender) {
  const realm = attacker?.realm || "Mortal";
  return Boolean(attacker?.aggressive)
    && realm !== "Mortal"
    && Boolean(defender?.realm)
    && defender.realm === realm;
}

const DUNGEON_AREA_NAMES = new Set([RATZKHAN_AREA_NAME, DIARRH_REALM_AREA_NAME, BEAR_CAVE_AREA_NAME, ROGABOGU_AREA_NAME, YRGMA_DIM_AREA_NAME, BADGERIA_AREA_NAME, WHISPERSPRING_AREA_NAME, WYNDHELM_CATHEDRAL_AREA_NAME]);

function areaNameIsDungeon(name) {
  const value = String(name || "");
  return DUNGEON_AREA_NAMES.has(value) || /\bDungeon\b/i.test(value);
}

function unitInMarkedOrNamedDungeon(unit) {
  const area = areaAt(unit?.x || 0, unit?.y || 0);
  return Boolean(area?.dungeon || areaNameIsDungeon(area?.name || unit?.area));
}

function dungeonAreaNameForUnit(unit) {
  const area = areaAt(unit?.x || 0, unit?.y || 0);
  const areaName = area && area !== true ? String(area.name || area.areaName || area.metadata?.areaName || "") : "";
  const fallbackName = unit === game.player ? currentPlayerAreaName() : String(unit?.area || "");
  const name = areaName || fallbackName;
  return areaNameIsDungeon(name) ? name : "";
}

function targetOutsideEnemyDungeon(enemy, target) {
  const enemyDungeon = dungeonAreaNameForUnit(enemy);
  if (!enemyDungeon) return false;
  return dungeonAreaNameForUnit(target) !== enemyDungeon;
}

function dungeonEvilNeutralAggroBlocked(attacker, defender) {
  return unitAlignment(attacker) === "Evil"
    && unitAlignment(defender) === "Neutral"
    && unitInMarkedOrNamedDungeon(attacker);
}

function dungeonMobTargetBlocked(attacker, defender) {
  return Boolean(attacker)
    && attacker !== game.player
    && !attacker.pet
    && Boolean(defender)
    && defender !== game.player
    && unitInMarkedOrNamedDungeon(attacker);
}

function unitFriendlyAlignedWithPlayer(unit, player = game.player, options = {}) {
  const faction = unitFactionId(unit);
  if (faction) {
    if (playerFriendlyToFaction(faction, player)) return true;
    if (playerHostileToFaction(faction, player)) return false;
  }
  const unitSide = unitAlignment(unit);
  if (unitSide === "Neutral" && options.excludeNeutralUnits) return false;
  const playerSide = player === game.player ? playerAlignment() : (player?.alignment || "Neutral");
  if (playerSide === "Evil") return unitSide === "Evil";
  if (playerSide === "Good") return unitSide === "Good" || unitSide === "Neutral";
  return unitSide === "Good" || unitSide === "Neutral";
}

function localPlayerId() {
  return game.mode === "multiplayer" ? game.multiplayer.id : "player";
}

function isOwnPet(unit) {
  return Boolean(unit?.pet && unit.masterId === localPlayerId());
}

function petMasterIsLocalPlayer(unit) {
  return Boolean(unit?.pet && unit.masterId === localPlayerId());
}

function isFriendlyPlayerPet(unit) {
  if (!unit?.pet) return false;
  if (isOwnPet(unit)) return true;
  const master = game.multiplayer?.peers?.get?.(unit.masterId);
  return Boolean(master && canTargetFriendlyPlayer(master));
}

function petCombatCredit(unit) {
  if (!unit?.pet) return { killedByPlayer: false, ownerId: unit?.id || null };
  return {
    killedByPlayer: petMasterIsLocalPlayer(unit),
    ownerId: unit.masterId || null
  };
}

function ensurePetLifetime(unit) {
  if (!unit?.pet) return;
  if (!Number.isFinite(unit.petDuration)) unit.petDuration = PET_DURATION_SECONDS;
  if (!Number.isFinite(unit.petTimeRemaining)) unit.petTimeRemaining = unit.petDuration;
}

function tickPetLifetime(enemy, dt) {
  if (!enemy?.pet) return false;
  ensurePetLifetime(enemy);
  enemy.petTimeRemaining = Math.max(0, enemy.petTimeRemaining - dt);
  if (enemy.petTimeRemaining > 0) return false;
  if (game.activePetMenuId === enemy.id) hidePetCommandMenu();
  if (game.pendingPetAttackId === enemy.id) {
    game.pendingPetAttackId = null;
    updatePetTargetCursor();
  }
  game.enemies.splice(game.enemies.indexOf(enemy), 1);
  return true;
}

function petMaster(unit) {
  if (!unit?.pet) return null;
  if (unit.masterId === localPlayerId()) return game.player;
  return game.multiplayer.peers.get(unit.masterId) || null;
}

function unitFriendlyToPetMaster(pet, unit) {
  const master = petMaster(pet);
  if (!master) return false;
  if (unit === master) return true;
  if (unit?.id && unit.id === pet.masterId) return true;
  if (unit?.pet && unit.masterId && unit.masterId === pet.masterId) return true;
  return false;
}

function unitAggroTowardPlayerPet(unit, playerId = localPlayerId()) {
  const target = unit?.hostileTarget;
  return Boolean(target?.pet && target.masterId === playerId);
}

function petMasterThreatenedByUnit(pet, unit) {
  const master = petMaster(pet);
  if (!master || !unit || unitFriendlyToPetMaster(pet, unit)) return false;
  if (master === game.player) return enemyHostileToPlayer(unit) || enemyNaturallyHostileToPlayer(unit);
  if (master === game.player && enemyNaturallyHostileToPlayer(unit)) return true;
  return Boolean(unit.targetPlayerId && unit.targetPlayerId === master.id)
    || Boolean(unit.hostileTarget?.pet && unit.hostileTarget.masterId === master.id)
    || alignmentHostileTo(unitAlignment(unit), unitAlignment(master));
}

function unitThreatensPetMaster(attacker, defender) {
  return Boolean(defender?.pet && petMasterThreatenedByUnit(defender, attacker));
}

function petShouldDefendAgainst(attacker, defender) {
  return Boolean(attacker?.pet && petMasterThreatenedByUnit(attacker, defender));
}

function enemyHostileToPlayer(enemy) {
  clearStaleAlignmentPlayerAggro(enemy);
  if (Array.isArray(enemy.plagueHostilePlayerIds) && enemy.plagueHostilePlayerIds.includes(localPlayerId())) return !(enemy.pacified > 0);
  if (game.mode === "multiplayer" && enemy.targetPlayerId) {
    return enemy.targetPlayerId === game.multiplayer.id && !(enemy.pacified > 0);
  }
  if (unitAggroTowardPlayerPet(enemy)) return !(enemy.pacified > 0);
  return Boolean(enemy.hostileToPlayer) && !(enemy.pacified > 0);
}

function enemyAggressiveToPlayer(enemy) {
  return enemy.pacified <= 0 && unitHostileTo(enemy, game.player);
}

function enemyNaturallyHostileToPlayer(enemy) {
  if (enemy.pacified > 0) return false;
  if (unitInvisible(game.player)) return false;
  if (protectedFromPlayerEffects(enemy)) return false;
  if (enemy.pet) return false;
  const faction = unitFactionId(enemy);
  if (faction) {
    if (playerFriendlyToFaction(faction)) return false;
    if (playerHostileToFaction(faction)) return true;
  }
  return Boolean(enemy.aggressive) || alignmentHostileTo(unitAlignment(enemy), playerAlignment());
}

function clearStaleAlignmentPlayerAggro(enemy) {
  if (!enemy || enemy.hostileToPlayerReason !== "alignment") return false;
  if (enemyNaturallyHostileToPlayer(enemy)) return false;
  if (enemy.hostileTarget !== game.player && !enemy.hostileToPlayer) return false;
  clearEnemyCombat(enemy);
  enemy.leashState = "idle";
  enemy.triggerX = undefined;
  enemy.triggerY = undefined;
  return true;
}

function unitHostileTo(attacker, defender) {
  if (attacker.pacified > 0) return false;
  if (attacker.questSpawn && defender?.questSpawn && attacker.questSpawn === defender.questSpawn) return false;
  if (attacker.pet) {
    if (unitFriendlyToPetMaster(attacker, defender)) return false;
    if (attacker.petCommand === "attack") return defender?.id === attacker.petTargetId;
    if (petShouldDefendAgainst(attacker, defender)) return true;
    return false;
  }
  if (defender?.pet && unitFriendlyToPetMaster(defender, attacker)) return false;
  if (unitThreatensPetMaster(attacker, defender)) return true;
  if (defender !== game.player && protectedFromPlayerEffects(defender)) return false;
  if (defender === game.player) {
    if (protectedFromPlayerEffects(attacker)) return false;
    clearStaleAlignmentPlayerAggro(attacker);
    return Boolean(attacker.hostileToPlayer)
      || enemyNaturallyHostileToPlayer(attacker);
  }
  if (attacker === game.player) {
    const defenderFaction = unitFactionId(defender);
    if (defenderFaction) {
      if (playerFriendlyToFaction(defenderFaction)) return false;
      if (playerHostileToFaction(defenderFaction)) return true;
    }
  }
  if (dungeonMobTargetBlocked(attacker, defender)) return false;
  if (attacker.hostileTarget === defender) return true;
  if (sameNonMortalRealmAggroBlocked(attacker, defender)) return false;
  if (dungeonEvilNeutralAggroBlocked(attacker, defender)) return false;
  const factionHostile = unitsFactionHostile(attacker, defender);
  if (factionHostile !== null) return factionHostile;
  return foodchainHostileTo(attacker, defender)
    || neutralAggressiveThreatToMobs(attacker, defender)
    || alignmentHostileTo(unitAlignment(attacker), unitAlignment(defender));
}

function friendlyToGoodPlayer(unit) {
  return Boolean(unit?.friendlyToGoodPlayer) && playerAlignment() === "Good";
}

function friendlyToNonEvilPlayer(unit) {
  return Boolean(unit?.friendlyToNonEvilPlayer) && playerAlignment() !== "Evil";
}

function protectedFromPlayerEffects(unit) {
  return (friendlyToGoodPlayer(unit) || friendlyToNonEvilPlayer(unit))
    && !unit?.hostileToPlayer
    && unit?.hostileTarget !== game.player;
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function randomInt(min, max) {
  return Math.floor(randomBetween(min, max + 1));
}

function sharedEntityId(prefix) {
  const id = `${prefix}-${nextSharedEntityId}`;
  nextSharedEntityId += 1;
  return id;
}

function hashSeed(value) {
  let hash = 2166136261;
  for (let i = 0; i < String(value).length; i += 1) {
    hash ^= String(value).charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed) {
  let state = hashSeed(seed) || 1;
  return () => {
    state = Math.imul(state + 0x6d2b79f5, 1);
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function generateSeededMap(seed) {
  const originalRandom = Math.random;
  Math.random = seededRandom(seed);
  try {
    return generateMap();
  } finally {
    Math.random = originalRandom;
  }
}

function cloneItem(name) {
  const itemName = typeof name === "object" && name ? name.name : name;
  const template = itemTemplates[itemName];
  if (!template) return null;
  const item = {
    ...structuredClone(template),
    id: `${itemName}-${performance.now()}-${Math.random()}`
  };
  if (typeof name === "object" && name?.quantity !== undefined) item.quantity = Number(name.quantity) || 1;
  if (item.stackable) item.quantity = item.quantity || 1;
  normalizeRealmData(item);
  if (item.weapon) item.weapon = normalizeWeapon(item.weapon, item.name);
  normalizeRealmMap(item.resistances);
  return item;
}

function equipStartingItem(name) {
  const item = cloneItem(name);
  if (!item?.slot) return;
  const slot = typeof resolveEquipmentSlot === "function" ? resolveEquipmentSlot(item) : item.slot;
  if (!(slot in game.player.equipment)) return;
  game.player.equippedItems[slot] = item;
  game.player.equipment[slot] = item.name;
}

function equipStartingClothes() {
  equipStartingItem("Linen Shirt");
  equipStartingItem("Linen Pants");
}

function itemQuantity(item) {
  return item?.stackable ? Math.max(1, item.quantity || 1) : 1;
}

function sameStack(item, other) {
  return Boolean(item?.stackable && other?.stackable && item.name === other.name);
}

function cloneItemStack(item, quantity) {
  const copy = structuredClone(item);
  copy.id = `${item.name}-${performance.now()}-${Math.random()}`;
  copy.quantity = quantity;
  return copy;
}

function isBagItem(item) {
  return Boolean(item?.bag || item?.slot === "Bag");
}

function bagSlotCount(item) {
  return Math.max(0, Math.floor(Number(item?.bag?.slots ?? item?.bagSlots ?? 0)));
}

function ensureBagInventory(item) {
  if (!isBagItem(item)) return [];
  const slots = bagSlotCount(item);
  if (!Array.isArray(item.bagInventory)) item.bagInventory = [];
  while (item.bagInventory.length < slots) item.bagInventory.push(null);
  if (item.bagInventory.length > slots) item.bagInventory.length = slots;
  return item.bagInventory;
}

function playerBagInventories() {
  return game.player.inventory
    .filter(item => isBagItem(item))
    .map(item => ensureBagInventory(item));
}

function inventoryCapacityFor(item, includeBags = true) {
  const stackMax = item.maxStack || 20;
  const capacityForList = list => list.reduce((total, inventoryItem) => {
    if (!inventoryItem) return total + (item.stackable ? stackMax : 1);
    if (item.stackable && sameStack(inventoryItem, item)) return total + Math.max(0, (inventoryItem.maxStack || stackMax) - itemQuantity(inventoryItem));
    return total;
  }, 0);
  let capacity = capacityForList(game.player.inventory);
  if (includeBags && !isBagItem(item)) {
    for (const bagInventory of playerBagInventories()) capacity += capacityForList(bagInventory);
  }
  return capacity;
}

function addItemToInventoryList(item, list, remaining, { fillEmpty = true } = {}) {
  if (item.stackable) {
    for (const stack of list) {
      if (!sameStack(stack, item)) continue;
      const space = (stack.maxStack || item.maxStack || 20) - itemQuantity(stack);
      if (space <= 0) continue;
      const moved = Math.min(space, remaining);
      stack.quantity = itemQuantity(stack) + moved;
      remaining -= moved;
      if (remaining <= 0) return 0;
    }
    if (!fillEmpty) return remaining;
    while (remaining > 0) {
      const slot = list.findIndex(inventoryItem => inventoryItem === null);
      if (slot < 0) return remaining;
      const moved = Math.min(item.maxStack || 20, remaining);
      list[slot] = cloneItemStack(item, moved);
      remaining -= moved;
    }
    return 0;
  }
  const slot = list.findIndex(inventoryItem => inventoryItem === null);
  if (slot < 0) return 1;
  list[slot] = item;
  return 0;
}

function addInventoryItem(item) {
  if (!item) return false;
  if (item.stackable) {
    let remaining = itemQuantity(item);
    if (inventoryCapacityFor(item, true) < remaining) return false;
    remaining = addItemToInventoryList(item, game.player.inventory, remaining, { fillEmpty: false });
    if (remaining > 0 && !isBagItem(item)) {
      for (const bagInventory of playerBagInventories()) {
        remaining = addItemToInventoryList(item, bagInventory, remaining, { fillEmpty: false });
        if (remaining <= 0) break;
      }
    }
    if (remaining > 0) remaining = addItemToInventoryList(item, game.player.inventory, remaining, { fillEmpty: true });
    if (remaining > 0 && !isBagItem(item)) {
      for (const bagInventory of playerBagInventories()) {
        remaining = addItemToInventoryList(item, bagInventory, remaining, { fillEmpty: true });
        if (remaining <= 0) break;
      }
    }
    return true;
  }
  const slot = game.player.inventory.findIndex(inventoryItem => inventoryItem === null);
  if (slot >= 0) {
    game.player.inventory[slot] = item;
    return true;
  }
  if (isBagItem(item)) return false;
  for (const bagInventory of playerBagInventories()) {
    const bagSlot = bagInventory.findIndex(inventoryItem => inventoryItem === null);
    if (bagSlot < 0) continue;
    bagInventory[bagSlot] = item;
    return true;
  }
  return false;
}

function hasInventoryRoomFor(item) {
  if (!item) return true;
  return inventoryCapacityFor(item, true) >= itemQuantity(item);
}

function removeInventoryStack(name, quantity) {
  let remaining = quantity;
  for (let i = 0; i < game.player.inventory.length && remaining > 0; i += 1) {
    const item = game.player.inventory[i];
    if (!item || item.name !== name) continue;
    if (item.stackable) {
      const removed = Math.min(itemQuantity(item), remaining);
      item.quantity = itemQuantity(item) - removed;
      remaining -= removed;
      if (item.quantity <= 0) game.player.inventory[i] = null;
    } else {
      game.player.inventory[i] = null;
      remaining -= 1;
    }
  }
  return remaining === 0;
}

function consumeInventoryStack(name, quantity = 1) {
  return removeInventoryStack(name, quantity);
}

function removeInventoryItemByName(name) {
  const index = game.player.inventory.findIndex(item => item?.name === name);
  if (index < 0) return false;
  const item = game.player.inventory[index];
  if (item.stackable && itemQuantity(item) > 1) item.quantity = itemQuantity(item) - 1;
  else game.player.inventory[index] = null;
  return true;
}

function inventoryItemCount(name) {
  return game.player.inventory.reduce((total, item) => total + (item?.name === name ? itemQuantity(item) : 0), 0);
}

function weaponHandText(weapon) {
  return (weapon?.hands || weapon?.type || "One-Handed").toLowerCase() === "two-handed" ? "Two-handed" : "One-handed";
}

function isTwoHandedWeapon(weapon) {
  return weaponHandText(weapon).toLowerCase() === "two-handed";
}

function weaponHasType(weapon, type) {
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
  if (target === "stabbing") return category === "stabbing" || name.includes("dagger");
  if (target === "spear") return category === "spear" || name.includes("spear");
  if (target === "wand") return category === "wand" || name.includes("wand");
  return false;
}

function isBowWeapon(weapon) {
  return weaponHasType(weapon, "bow") || String(weapon?.ammo || "").toLowerCase() === "arrow";
}

function isStabWeapon(weapon) {
  return weaponHasType(weapon, "stabbing") || String(weapon?.animation || "").toLowerCase() === "stab";
}

function equippedShieldItem() {
  const item = game.player.equippedItems?.["Off-Hand"];
  if (!item || item.weapon) return null;
  return item.shield ? item : null;
}

function playerHasEquippedShield() {
  return Boolean(equippedShieldItem());
}

function archeryMasteryDelayReduction() {
  const spell = activeSpellByName("Archery Mastery");
  return spell ? spellLevel(spell) * 3 : 0;
}

function axeMasteryDelayReduction() {
  const spell = activeSpellByName("Axe Mastery");
  return spell ? spellLevel(spell) * 3 : 0;
}

function daggerMasteryFocusBonus() {
  const spell = activeSpellByName("Dagger Mastery");
  return spell && isStabWeapon(game.player.weapon) ? spellValue(spell, "focusBonus", 4, 1) : 0;
}

function shieldMasteryBlockBonus() {
  const spell = activeSpellByName("Shield Mastery");
  return spell && playerHasEquippedShield() ? spellValue(spell, "blockBonus", 0, 1) : 0;
}

function effectivePlayerWeaponDelay(weapon = game.player.weapon) {
  const base = Number(weapon?.speed ?? 100);
  let mastery = isBowWeapon(weapon) ? archeryMasteryDelayReduction() : 0;
  if (weaponHasType(weapon, "axe")) mastery += axeMasteryDelayReduction();
  return Math.max(25, base - mastery);
}

function weaponTooltipText(weapon) {
  if (!weapon) return "";
  const delay = effectivePlayerWeaponDelay(weapon);
  const lines = [
    `Realm: ${weapon.realm || "Mortal"}`,
    weaponHandText(weapon),
    `DMG: ${weapon.dice || "1D4"}`,
    `Delay: ${formatNumber(delay)}`
  ];
  const stun = weaponStunSummary(weapon);
  if (stun) lines.push(stun);
  return lines.join("\n");
}

function weaponStunSummary(weapon) {
  const stun = weapon?.effects?.stun;
  if (stun?.enabled === false) return "";
  if (!stun && !weaponHasType(weapon, "blunt")) return "";
  const chance = Number(stun?.chance ?? 5) || 0;
  const duration = Number(stun?.duration ?? 2) || 0;
  if (chance <= 0 || duration <= 0) return "";
  return `Stun ${formatNumber(chance)}% / ${formatNumber(duration)}s`;
}

function weaponTooltipHtml(weapon, item = null) {
  if (!weapon) return "";
  const realm = weapon.realm || "Mortal";
  const color = realmInfo[realm]?.color || realmInfo.Mortal.color;
  const shadowClass = realm === "Umbral" ? " shadow-text" : "";
  const delay = effectivePlayerWeaponDelay(weapon);
  const stun = weaponStunSummary(weapon);
  const bonuses = item ? itemStatsHtml({ ...item, weapon: null }) : "";
  return `
    <span>Realm <b class="${shadowClass.trim()}" style="color:${color}">${escapeHtml(realm)}</b></span>
    <span>${escapeHtml(weaponHandText(weapon))}</span>
    <span>DMG <b>${escapeHtml(weapon.dice || "1D4")}</b></span>
    <span>Delay <b>${formatNumber(delay)}</b></span>
    ${stun ? `<span>${escapeHtml(stun)}</span>` : ""}
    ${bonuses ? `<p>${bonuses}</p>` : ""}
  `;
}

function itemEnchantments(item) {
  return (item?.enchantments || [])
    .map(enchantment => typeof enchantment === "string" ? enchantmentTemplates[enchantment] : enchantment)
    .filter(Boolean);
}

function itemEnchantmentStats(item) {
  const totals = {};
  for (const enchantment of itemEnchantments(item)) {
    for (const [stat, value] of Object.entries(enchantment.stats || {})) {
      totals[stat] = (totals[stat] || 0) + value;
    }
  }
  return totals;
}

function itemDisplayNameHtml(item) {
  const base = `<span class="${itemRarityClass(item)}">${escapeHtml(item?.name || "Item")}</span>`;
  const enchantments = itemEnchantments(item);
  if (!enchantments.length) return base;
  return `${base} ${enchantments.map(enchantment => {
    const color = realmUiColor(enchantment.realm || "Mortal");
    const shadowClass = enchantment.realm === "Umbral" ? " shadow-text" : "";
    return `<span class="${shadowClass.trim()}" style="color:${color}">${escapeHtml(enchantment.name)}</span>`;
  }).join(" ")}`;
}

function itemStatsText(item) {
  if (item.scroll) {
    const spell = makeSpell(item.scroll.spellName);
    return spell ? spellDescription(spell) : `Teaches ${item.scroll.spellName}`;
  }
  if (item.consumable) return item.consumable.text;
  const stats = Object.entries(item.stats || {})
    .map(([stat, value]) => `${stat} +${formatNumber(value)}`)
    .join("\n");
  const resistances = Object.entries(item.resistances || {})
    .map(([realm, value]) => `${realm} RESIST +${formatNumber(value)}`)
    .join("\n");
  const weapon = item.weapon ? weaponTooltipText(item.weapon) : "";
  const reductions = Object.entries(item.effects?.realmDamageReduction || {})
    .map(([realm, value]) => `-${formatNumber(value * 100)}% ${realm} damage taken`)
    .join("\n");
  return [weapon, stats, resistances, reductions].filter(Boolean).join("\n");
}

function itemTooltipText(item) {
  const stats = itemStatsText(item) || "No stat bonuses";
  const stack = item?.stackable ? `\nQuantity: ${itemQuantity(item)}` : "";
  const lore = item?.lore ? `\n${item.lore}` : "";
  return `${item.name}\nSlot: ${item.slot}${stack}\n${stats}${lore}`;
}

function statBonusHtml(label, value) {
  const amount = Number(value) || 0;
  const sign = amount > 0 ? "+" : "";
  const tone = amount < 0 ? "negative" : "positive";
  return `<span class="item-stat-bonus ${tone}">${escapeHtml(label)} ${sign}${formatNumber(amount)}</span>`;
}

function itemStatsHtml(item) {
  const lines = [];
  for (const [stat, value] of Object.entries(item.stats || {})) {
    lines.push(statBonusHtml(stat, value));
  }
  for (const [realm, value] of Object.entries(item.resistances || {})) {
    lines.push(statBonusHtml(`${realm} RESIST`, value));
  }
  for (const [realm, value] of Object.entries(item.effects?.realmDamageReduction || {})) {
    lines.push(`<span>${escapeHtml(`-${formatNumber(value * 100)}% ${realm} damage taken`)}</span>`);
  }
  return lines.join("<br>");
}

function itemTooltipHtml(item) {
  if (item?.scroll) return scrollTooltipHtml(item);
  const stats = itemStatsText(item) || "No stat bonuses";
  const stack = item?.stackable ? `<span>Quantity <b>${itemQuantity(item)}</b></span>` : "";
  const bagInfo = isBagItem(item) ? `<span>Bag Slots <b>${bagSlotCount(item)}</b></span>` : "";
  const lore = item?.lore ? `<p class="item-lore">${escapeHtml(item.lore)}</p>` : "";
  const enchantmentStats = Object.entries(itemEnchantmentStats(item));
  const enchantmentHtml = enchantmentStats.length
    ? `<p class="enchantment-bonuses">${enchantmentStats.map(([stat, value]) => statBonusHtml(stat, value)).join("<br>")}</p>`
    : "";
  const body = item.weapon
    ? `${weaponTooltipHtml(item.weapon, item)}${enchantmentHtml}`
    : `<p>${itemStatsHtml(item) || escapeHtml(stats).replaceAll("\n", "<br>")}</p>${enchantmentHtml}`;
  return `
    <div class="item-tooltip">
      <strong>${itemDisplayNameHtml(item)}</strong>
      <span>Slot <b>${escapeHtml(item.slot)}</b></span>
      ${stack}
      ${bagInfo}
      ${body}
      ${lore}
    </div>
  `;
}

function scrollTooltipHtml(item) {
  const spell = makeSpell(item.scroll.spellName);
  const lore = item?.lore ? `<p class="item-lore">${escapeHtml(item.lore)}</p>` : "";
  if (!spell) return `
    <div class="item-tooltip">
      <strong class="${itemRarityClass(item)}">${escapeHtml(item.name)}</strong>
      <p>Teaches ${escapeHtml(item.scroll.spellName)}</p>
      ${lore}
    </div>
  `;
  const realmColor = realmInfo[spell.realm]?.color || "#f2ede3";
  const shadowClass = spell.realm === "Umbral" ? " shadow-text" : "";
  const cooldownText = spell.passive ? "Passive" : `${formatNumber(spellCooldown(spell))}s`;
  return `
    <div class="item-tooltip">
      <strong class="${itemRarityClass(item)}">${escapeHtml(spell.name)}</strong>
      <span>Realm <b class="${shadowClass.trim()}" style="color:${realmColor}">${escapeHtml(spell.realm)}</b></span>
      <span>Cooldown <b>${cooldownText}</b>${spell.range ? ` / Range <b>${formatNumber(spell.range)}</b>` : ""}</span>
      <p>${escapeHtml(spellDescription(spell))}</p>
      ${lore}
    </div>
  `;
}

function itemRarity(item) {
  return rarityInfo[item?.rarity || "common"] || rarityInfo.common;
}

function itemRarityClass(item) {
  return `rarity-${item?.rarity || "common"}`;
}

function graphicClass(item) {
  return `item-graphic graphic-${(item?.graphic || item?.name || "item").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

function itemIconSrc(itemOrGraphic) {
  if (typeof itemOrGraphic !== "string" && itemOrGraphic?.scroll) return "./assets/items/scroll.png";
  const graphic = typeof itemOrGraphic === "string"
    ? itemOrGraphic
    : itemOrGraphic?.graphic || itemOrGraphic?.name;
  return itemIconSources[String(graphic || "").toLowerCase()] || normalizedItemGraphicPath(graphic);
}

function itemGraphicSize(item, fallback = 30) {
  return Math.max(8, Math.min(96, Number(item?.graphicSize) || fallback));
}

function itemGlowColor(item) {
  if (item?.glow && item?.glowColor) return item.glowColor;
  if (item?.glow) return "#68a85e";
  const enchantment = itemEnchantments(item)[0];
  return enchantment ? realmUiColor(enchantment.realm || "Mortal") : "";
}

function itemGlowDeclaration(item) {
  const glow = itemGlowColor(item);
  return glow ? `--enchant-glow:${glow};` : "";
}

function itemHasGlow(item) {
  return Boolean(item?.glow || itemEnchantments(item).length);
}

function enchantmentGlowStyle(item) {
  const declaration = itemGlowDeclaration(item);
  return declaration ? ` style="${declaration}"` : "";
}

function itemGraphicStyle(item, extra = "") {
  const size = itemGraphicSize(item);
  return ` style="--item-graphic-size:${size}px;${itemGlowDeclaration(item)}${extra}"`;
}

function spriteItemGraphicStyle(item, extra = "") {
  const customSize = item?.graphicSize && Number(item.graphicSize) !== 30
    ? `--item-graphic-size:${itemGraphicSize(item)}px;`
    : "";
  return ` style="${customSize}${itemGlowDeclaration(item)}${extra}"`;
}

function spellRealmForScroll(item) {
  const spell = item?.scroll ? makeSpell(item.scroll.spellName) : null;
  return spell?.realm || "Mortal";
}

function scrollGlowForRealm(realm) {
  return {
    Ethereal: "#5f94d9",
    Celestial: "#d9c85f",
    Infernal: "#d84e42",
    Sylvan: "#68a85e",
    Umbral: "#6e35b8"
  }[realm] || "transparent";
}

function renderItemContents(item, compact = false) {
  const quantity = item?.stackable && itemQuantity(item) > 1
    ? `<span class="stack-count">${itemQuantity(item)}</span>`
    : "";
  const wrapItemArt = html => `<span class="item-art-frame">${html}</span>`;
  const iconSrc = itemIconSrc(item);
  if (iconSrc) {
    const cssIconSrc = itemIconCssSrc(item, iconSrc);
    const scrollGlow = item.scroll ? `--scroll-glow:${scrollGlowForRealm(spellRealmForScroll(item))};` : "";
    const scrollClass = item.scroll ? " scroll-sprite-graphic" : "";
    return `
      ${wrapItemArt(`<span class="item-graphic sprite-item-graphic${scrollClass}${itemHasGlow(item) ? " enchanted-graphic" : ""}"${spriteItemGraphicStyle(item, `${scrollGlow}background-image:url('${cssIconSrc}');`)} aria-label="${escapeHtml(item.name)}"></span>`)}
      <span class="sr-only">${escapeHtml(item.name)}</span>
      ${quantity}
    `;
  }
  if (item.scroll) {
    const realm = spellRealmForScroll(item);
    const glow = scrollGlowForRealm(realm);
    return `
      ${wrapItemArt(`<span class="scroll-graphic" style="--scroll-glow:${glow}" aria-label="${escapeHtml(item.name)}"></span>`)}
      <span class="sr-only">${escapeHtml(item.name)}</span>
      ${quantity}
    `;
  }
  if (item.graphic) {
    return `
      ${wrapItemArt(`<span class="${graphicClass(item)}${itemHasGlow(item) ? " enchanted-graphic" : ""}"${itemGraphicStyle(item)} aria-label="${escapeHtml(item.name)}"></span>`)}
      <span class="sr-only">${escapeHtml(item.name)}</span>
      ${quantity}
    `;
  }
  if (item.consumable) {
    return `
      ${wrapItemArt(`<span class="potion-graphic potion-${item.consumable.color}" aria-label="${escapeHtml(item.name)}"></span>`)}
      <span class="sr-only">${escapeHtml(item.name)}</span>
      ${quantity}
    `;
  }
  return `${wrapItemArt(`<span class="item-graphic graphic-generic" aria-label="${escapeHtml(item.name)}"></span>`)}<span class="sr-only">${escapeHtml(item.name)}</span>${quantity}${compact ? "" : ""}`;
}

function itemGoldValue(item) {
  const templateValue = item?.name ? itemTemplates[item.name]?.goldValue : undefined;
  if (typeof templateValue === "number") return templateValue;
  if (typeof item?.goldValue === "number") return item.goldValue;
  if (item?.scroll) return 5;
  if (item?.consumable) return 10;
  if ((item?.rarity || "common") === "uncommon") return 50;
  return 10;
}

function itemPurchaseValue(item) {
  return itemGoldValue(item) * itemQuantity(item);
}

function itemSellValue(item, quantity = itemQuantity(item)) {
  return Math.ceil(itemGoldValue(item) * quantity / 2);
}

function addShopStack(destination, item) {
  if (!item?.stackable) {
    destination.push(item);
    return;
  }
  const existing = destination.find(candidate => sameStack(candidate, item) && itemQuantity(candidate) < (candidate.maxStack || item.maxStack || 20));
  if (!existing) {
    destination.push(item);
    return;
  }
  const maxStack = existing.maxStack || item.maxStack || 20;
  let remaining = itemQuantity(item);
  const moved = Math.min(maxStack - itemQuantity(existing), remaining);
  existing.quantity = itemQuantity(existing) + moved;
  remaining -= moved;
  if (remaining > 0) destination.push(cloneItemStack(item, remaining));
}

const SHOP_RESTOCK_SECONDS = 60 * 60;

function shopkeeperStockLists(shopkeeper) {
  return [
    ["inventory", shopkeeper.inventory ||= []],
    ["bags", shopkeeper.bags ||= []],
    ["consumables", shopkeeper.consumables ||= []],
    ["scrolls", shopkeeper.scrolls ||= []],
    ["misc", shopkeeper.misc ||= []]
  ];
}

function rememberOriginalShopStock(shopkeeper) {
  if (!shopkeeper || shopkeeper.originalStock) return;
  shopkeeper.originalStock = {};
  for (const [key, list] of shopkeeperStockLists(shopkeeper)) {
    shopkeeper.originalStock[key] = structuredClone(list || []);
  }
  shopkeeper.lastRestockAt = performance.now() / 1000;
}

function restockShopkeeper(shopkeeper) {
  if (!shopkeeper) return;
  rememberOriginalShopStock(shopkeeper);
  const now = performance.now() / 1000;
  if (now - (shopkeeper.lastRestockAt || 0) < SHOP_RESTOCK_SECONDS) return;
  shopkeeper.lastRestockAt = now;
  for (const [key, list] of shopkeeperStockLists(shopkeeper)) {
    const originals = shopkeeper.originalStock?.[key] || [];
    for (const original of originals) {
      const currentQuantity = list
        .filter(item => item?.name === original.name)
        .reduce((total, item) => total + itemQuantity(item), 0);
      const originalQuantity = itemQuantity(original);
      const missing = originalQuantity - currentQuantity;
      if (missing <= 0) continue;
      const restockItem = original.stackable ? cloneItemStack(original, missing) : cloneItem(original.name);
      addShopStack(list, restockItem || structuredClone(original));
    }
  }
}

function rollLoot(enemy) {
  if (Math.random() < 0.05) {
    game.groundItems.push({
      type: "heart",
      heal: 5 * enemy.lvl,
      age: 0,
      duration: 15,
      x: enemy.x + randomBetween(-18, 18),
      y: enemy.y + randomBetween(-18, 18),
      radius: 14
    });
  }

  let drops = 0;
  const dropLootItem = (name, options = {}) => {
    const item = cloneItem(name);
    if (!item) return false;
    const angle = randomBetween(0, Math.PI * 2);
    const offset = 16 + drops * 14;
    dropGroundItem(item, enemy.x + Math.cos(angle) * offset, enemy.y + Math.sin(angle) * offset, options.duration ?? null);
    drops += 1;
    return true;
  };

  const guaranteedDrops = [...(enemy.guaranteedDrops || [])];
  if (enemy.name === "Elowen's Beloved" && !guaranteedDrops.includes("Forgotten Letter")) guaranteedDrops.push("Forgotten Letter");
  for (const name of guaranteedDrops) dropLootItem(name, name === "Forgotten Letter" ? { duration: 3600 } : {});

  const templateLootKey = enemy.templateName || enemy.name;
  const nameLootKey = enemy.name && enemy.name !== templateLootKey ? enemy.name : null;
  const lootTable = [
    ...monsterLootEntries(monsterLootTables[templateLootKey], enemy.lvl),
    ...monsterLootEntries(monsterLootTables[nameLootKey], enemy.lvl)
  ];
  for (const entry of lootTable) {
    if (entry.minLvl && enemy.lvl < entry.minLvl) continue;
    if (entry.maxLvl && enemy.lvl > entry.maxLvl) continue;
    if (Math.random() >= entry.chance) continue;
    dropLootItem(entry.name);
  }
  if (drops) addLog(`<b>${enemy.name}</b> dropped ${drops === 1 ? "an item" : `${drops} items`}.`, enemy);
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

function dropGold(amount, x, y, duration = null) {
  if (amount <= 0) return;
  const drop = {
    id: sharedEntityId("drop"),
    type: "gold",
    amount,
    x,
    y,
    radius: 14,
    age: 0,
    duration
  };
  game.groundItems.push(drop);
  return drop;
}

function dropGroundItem(item, x = game.player.x, y = game.player.y + game.player.radius + 18, duration = null) {
  const drop = {
    id: sharedEntityId("drop"),
    type: "item",
    item,
    x,
    y,
    radius: 14,
    age: 0,
    duration: duration ?? (item?.persistent ? null : 20)
  };
  game.groundItems.push(drop);
  return drop;
}

function dropQuestRewardItem(item) {
  if (!item) return null;
  const point = playerDropPoint();
  const duration = 3600;
  if (game.mode === "multiplayer") {
    sendMultiplayerAction({
      action: "drop:item",
      drop: { type: "item", item, x: point.x, y: point.y, radius: 14, age: 0, duration }
    });
  }
  const localDrop = dropGroundItem(item, point.x, point.y, duration);
  if (game.mode === "multiplayer" && localDrop) localDrop.localOnly = true;
  return localDrop;
}

function playerDropPoint() {
  const distanceFromPlayer = game.player.radius + 72;
  const preferredAngles = [Math.PI / 2, 0, Math.PI, -Math.PI / 2, Math.PI / 4, Math.PI * 0.75, -Math.PI / 4, -Math.PI * 0.75];
  for (const angle of preferredAngles) {
    const x = game.player.x + Math.cos(angle) * distanceFromPlayer;
    const y = game.player.y + Math.sin(angle) * distanceFromPlayer;
    if (isWalkable(x, y, 14)) return { x, y };
  }
  return randomWalkablePointNear(game.player.x, game.player.y, 72, 120) || {
    x: game.player.x,
    y: game.player.y + distanceFromPlayer
  };
}

let activePrompt = null;

function closeConfirmPrompt(result = null) {
  if (!activePrompt) {
    confirmWindow?.classList.add("hidden");
    return;
  }
  const prompt = activePrompt;
  activePrompt = null;
  confirmWindow.classList.add("hidden");
  confirmInput.value = "";
  confirmInputWrap.classList.add("hidden");
  confirmOptions.innerHTML = "";
  confirmOptions.classList.add("hidden");
  confirmAcceptButton.classList.remove("hidden");
  confirmCancelButton.classList.remove("hidden");
  syncPointerPause();
  prompt.resolve(result);
}

function showConfirmPrompt({ title = "Confirm", text = "", input = false, label = "Amount", value = 1, min = 1, max = null, options = null } = {}) {
  return new Promise(resolve => {
    activePrompt = { resolve, input };
    confirmTitle.textContent = title;
    confirmTitle.classList.toggle("hidden", !title);
    confirmText.textContent = text;
    confirmInputWrap.classList.toggle("hidden", !input);
    const optionList = Array.isArray(options) ? options : [];
    confirmOptions.classList.toggle("hidden", !optionList.length);
    confirmOptions.innerHTML = optionList.map(option => (
      `<button class="shop-close" type="button" data-confirm-option="${escapeHtml(String(option.value ?? ""))}">${escapeHtml(option.label || option.value || "")}</button>`
    )).join("");
    confirmAcceptButton.classList.toggle("hidden", Boolean(optionList.length));
    confirmCancelButton.classList.toggle("hidden", Boolean(optionList.length));
    confirmInput.value = "";
    confirmInput.removeAttribute("min");
    confirmInput.removeAttribute("max");
    if (input) {
      confirmInputLabel.textContent = label;
      confirmInput.min = String(min);
      confirmInput.max = max === null ? "" : String(max);
      confirmInput.value = String(value);
      setTimeout(() => confirmInput.focus(), 0);
    }
    confirmWindow.classList.remove("hidden");
    syncPointerPause();
  });
}

async function askGoldAmount(title, text, max) {
  max = Math.max(0, Math.floor(Number(max) || 0));
  if (max <= 0) return 0;
  const result = await showConfirmPrompt({ title, text, input: true, label: "Amount", value: max, min: 1, max });
  const amount = Math.floor(Number(result) || 0);
  return Math.max(0, Math.min(max, amount));
}

async function dropPlayerGoldPrompt() {
  const amount = await askGoldAmount("", "How much gold do you want to drop?", game.player.gold);
  if (amount <= 0) return;
  game.player.gold -= amount;
  const point = playerDropPoint();
  if (game.mode === "multiplayer") {
    sendMultiplayerAction({
      action: "drop:gold",
      drop: { type: "gold", amount, x: point.x, y: point.y, radius: 14, age: 0, duration: null }
    });
  }
  const localDrop = dropGold(amount, point.x, point.y, null);
  if (game.mode === "multiplayer" && localDrop) localDrop.localOnly = true;
  addLog(`Dropped <b>${amount} gold</b>.`);
  markUIDirty();
  renderUI();
}

function ensureBankState() {
  game.player.bank ||= {};
  game.player.bank.gold = Math.max(0, Math.floor(Number(game.player.bank.gold) || 0));
  game.player.bank.inventory = Array.isArray(game.player.bank.inventory) ? game.player.bank.inventory : [];
  while (game.player.bank.inventory.length < 15) game.player.bank.inventory.push(null);
  if (game.player.bank.inventory.length > 15) game.player.bank.inventory.length = 15;
  return game.player.bank;
}

function renderBank() {
  if (!bankWindow || bankWindow.classList.contains("hidden")) return;
  const bank = ensureBankState();
  bankGoldReadout.textContent = bank.gold;
  bankPlayerGoldReadout.textContent = game.player.gold;
  const bankHtml = bank.inventory.map((item, index) => {
    if (!item) return `<button class="shop-item empty" type="button" data-bank-index="${index}"><span>Empty</span></button>`;
    return `<button class="shop-item" type="button" data-bank-index="${index}">${renderItemContents(item, true)}${itemTooltipHtml(item)}</button>`;
  }).join("");
  updateHtmlIfChanged(bankInventoryEl, bankHtml);
}

function openBank(banker = null) {
  if (!bankWindow || !bankWindow.classList.contains("hidden")) return;
  if (banker && !allowNpcInteraction(banker)) return;
  hideItemActionMenu();
  ensureBankState();
  game.activeBanker = banker;
  const bankFloatingState = game.floating?.bank;
  if (bankFloatingState && (bankFloatingState.width > 490 || bankFloatingState.height > 430)) {
    bankFloatingState.width = 430;
    bankFloatingState.height = 360;
    bankFloatingState.x = Math.max(8, Math.min(bankFloatingState.x || 82, window.innerWidth - bankFloatingState.width - 8));
    bankFloatingState.y = Math.max(8, Math.min(bankFloatingState.y || 82, window.innerHeight - bankFloatingState.height - 8));
  }
  renderBank();
  bankWindow.classList.remove("hidden");
  window.openInventoryWindow?.();
  syncPointerPause();
}

function closeBank() {
  bankWindow?.classList.add("hidden");
  game.activeBanker = null;
  syncPointerPause();
}

async function transferGoldToBankPrompt() {
  const bank = ensureBankState();
  const amount = await askGoldAmount("Deposit Gold", "How much gold do you want to transfer to the bank?", game.player.gold);
  if (amount <= 0) return;
  game.player.gold -= amount;
  bank.gold += amount;
  addLog(`Deposited <b>${amount} gold</b> in the bank.`);
  markUIDirty();
  renderBank();
  renderUI();
}

function recordPlayerDeathMarker() {
  game.player.lastDeath = {
    x: game.player.x,
    y: game.player.y,
    area: currentPlayerAreaName()
  };
  markUIDirty();
}

const DEATH_MARKER_CLEAR_DISTANCE = 160;

function clearDeathMarkerIfNearby() {
  const marker = game.player?.lastDeath;
  if (!Number.isFinite(marker?.x) || !Number.isFinite(marker?.y)) return;
  const markerArea = marker.area || "";
  const playerArea = currentPlayerAreaName();
  if (markerArea && playerArea && markerArea !== playerArea) return;
  if (Math.hypot(game.player.x - marker.x, game.player.y - marker.y) > DEATH_MARKER_CLEAR_DISTANCE) return;
  game.player.lastDeath = null;
  markUIDirty();
}

function dropPlayerDeathLoot() {
  const deathX = game.player.x;
  const deathY = game.player.y;
  const drops = [];
  if (game.player.gold > 0) {
    const droppedGold = Math.floor(game.player.gold / 2);
    if (droppedGold > 0) {
      drops.push({ type: "gold", amount: droppedGold, x: deathX + randomBetween(-16, 16), y: deathY + randomBetween(-16, 16), radius: 14, age: 0, duration: 3600 });
      game.player.gold -= droppedGold;
    }
  }
  for (let index = 0; index < game.player.inventory.length; index += 1) {
    const item = game.player.inventory[index];
    if (!item) continue;
    game.player.inventory[index] = null;
    drops.push({ type: "item", item, x: deathX + randomBetween(-28, 28), y: deathY + randomBetween(-28, 28), radius: 14, age: 0, duration: 3600 });
  }
  if (!drops.length) return;
  if (game.mode === "multiplayer") {
    sendMultiplayerAction({ action: "death:drops", drops: drops.map(serializeGroundItem) });
  }
  for (const drop of drops) {
    const localDrop = drop.type === "gold"
      ? dropGold(drop.amount, drop.x, drop.y, drop.duration)
      : dropGroundItem(drop.item, drop.x, drop.y, drop.duration);
    if (game.mode === "multiplayer" && localDrop) localDrop.localOnly = true;
  }
  markUIDirty();
  renderUI();
}

function healPlayer(amount, sourceName) {
  if (game.player.hp >= game.player.maxHp) return 0;
  const healed = roundUpTenth(Math.min(amount, game.player.maxHp - game.player.hp));
  game.player.hp += healed;
  spawnFloatingText(game.player, `+${formatNumber(healed)}`, "#61d66f");
  if (sourceName) addLog(`${sourceName} restores ${playerHealAmountHtml(healed)}.`);
  return healed;
}

function spawnPrayerSparkles(target = game.player, palette = null) {
  game.effects.push({
    type: "prayer",
    localOnly: true,
    age: 0,
    duration: 0.75,
    target,
    targetPlayerId: target?.id && target !== game.player ? target.id : null,
    x: target?.x ?? game.player.x,
    y: target?.y ?? game.player.y,
    palette
  });
}

function spawnClarityFlash(target = game.player) {
  game.effects.push({
    type: "clarity",
    localOnly: true,
    age: 0,
    duration: 0.75,
    target,
    targetPlayerId: target?.id && target !== game.player ? target.id : null,
    x: target?.x ?? game.player.x,
    y: target?.y ?? game.player.y
  });
}

function spawnRaiseSkeletonSmoke(x, y, color = "Umbral") {
  game.effects.push({
    type: "raiseSkeleton",
    localOnly: true,
    x,
    y,
    age: 0,
    duration: 0.75,
    color
  });
}

function teleportPlayerTo(point) {
  game.player.x = point.x;
  game.player.y = point.y;
  game.player.attackTimer = Math.max(game.player.attackTimer, 0.2);
  game.mouseWorld = null;
}

function applyPlayerStartFromMap() {
  const candidates = [
    game.map?.playerStart,
    game.map?.gandersvilleTownSquare?.center,
    game.map?.areas?.find(area => area?.name === GANDERSVILLE_AREA_NAME)?.center,
    game.map?.areas?.find(area => area?.name === AREA_NAME)?.center,
    initialPlayerState
  ];
  const start = candidates.find(point => Number.isFinite(point?.x) && Number.isFinite(point?.y)) || { x: 0, y: 0 };
  game.startPoint = { x: start.x, y: start.y };
  game.player.x = start.x;
  game.player.y = start.y;
}

function dungeonCellCenter(dungeon, cell) {
  const room = dungeon?.rooms?.find(candidate => String(candidate?.id) === `${cell.x},${cell.y}`);
  if (room?.center && Number.isFinite(room.center.x) && Number.isFinite(room.center.y)) return { x: room.center.x, y: room.center.y };
  if (dungeon?.origin && Number.isFinite(dungeon.origin.x) && Number.isFinite(dungeon.origin.y)) {
    const cellSize = Math.max(64, Number(dungeon.cellSize) || 128);
    return {
      x: dungeon.origin.x + (cell.x + 0.5) * cellSize,
      y: dungeon.origin.y + (cell.y + 0.5) * cellSize
    };
  }
  return null;
}

function applyRaceStartFromMap({ onlyIfAtDefault = false } = {}) {
  if (avatarRaceForAvatar(game.player.avatar) !== "dwarf") return false;
  const start = dungeonCellCenter(game.map?.yrgmaDim, DWARF_START_CELL);
  if (!start) return false;
  if (onlyIfAtDefault) {
    const defaultStart = Number.isFinite(game.startPoint?.x) && Number.isFinite(game.startPoint?.y)
      ? game.startPoint
      : game.map?.playerStart || initialPlayerState;
    if (distance(game.player, defaultStart) > 4) return false;
  }
  game.startPoint = { x: start.x, y: start.y, dungeon: DWARF_START_DUNGEON_ID, area: YRGMA_DIM_AREA_NAME };
  game.player.x = start.x;
  game.player.y = start.y;
  return true;
}

function respawnMultiplayerPlayer() {
  const start = game.startPoint || game.map?.playerStart || initialPlayerState;
  teleportPlayerTo(start);
  game.player.hp = game.player.maxHp;
  game.player.dots = [];
  game.player.rooted = 0;
  game.player.rootVisual = "";
  game.player.attackTimer = 0.5;
  game.running = true;
  deathScreen.classList.add("hidden");
  syncPointerPause();
  spawnFloatingText(game.player, "RESPAWNED", "#f0cf63");
  addLog(avatarRaceForAvatar(game.player.avatar) === "dwarf"
    ? "<b>Your Soulreaper reforms in Yrgma Dim.</b>"
    : "<b>Your Soulreaper reforms in the starting house.</b>");
  markUIDirty();
  sendMultiplayerUpdate(true);
}

function bankerNpcs() {
  const seen = new Set();
  const candidates = [];
  const add = npc => {
    if (!npc || !npc.banker || seen.has(npc)) return;
    seen.add(npc);
    candidates.push(npc);
  };
  for (const value of Object.values(game.map || {})) {
    if (Array.isArray(value)) value.forEach(add);
    else add(value);
  }
  for (const enemy of game.enemies || []) add(enemy);
  return candidates;
}

function configuredShopNpcs() {
  return (game.map?.configuredNpcs || []).filter(npc => npc?.shopkeeper && !npc.banker);
}

function handleWhisperspringTeleport() {
  const portals = [
    {
      state: game.map?.whisperspring,
      latch: "whisperspringTeleportLatch",
      areaName: WHISPERSPRING_AREA_NAME,
      enterLog: "<b>Whisperspring</b>: you step through the temple entrance.",
      exitLog: "<b>Whisperspring</b>: you return to Ganderswood Glade."
    },
    {
      state: game.map?.wyndhelmCathedral,
      latch: "wyndhelmCathedralTeleportLatch",
      areaName: WYNDHELM_CATHEDRAL_AREA_NAME,
      enterLog: "<b>Wyndhelm Cathedral</b>: you pass beneath the ruined arch.",
      exitLog: "<b>Wyndhelm Cathedral</b>: you return to Wyndhelm."
    },
    {
      state: game.map?.ratzkhan,
      latch: "ratzkhanTeleportLatch",
      areaName: RATZKHAN_AREA_NAME,
      enterLog: "<b>Ratzkhan</b>: you descend into the rat maze.",
      exitLog: "<b>Ratzkhan</b>: you climb back into the Rat Room."
    },
    {
      state: game.map?.diarrhRealm,
      latch: "diarrhRealmTeleportLatch",
      areaName: DIARRH_REALM_AREA_NAME,
      enterLog: "<b>Diarrh Realm</b>: you sink into the underneath.",
      exitLog: "<b>Diarrh Realm</b>: you return to Ratzkhan Chamber 6."
    },
    {
      state: game.map?.bearCave,
      latch: "bearCaveTeleportLatch",
      areaName: BEAR_CAVE_AREA_NAME,
      enterLog: "<b>Bear Cave</b>: you enter the cave.",
      exitLog: "<b>Bear Cave</b>: you return to Ganderswood Fen."
    },
    {
      state: game.map?.rogabogu,
      latch: "rogaboguTeleportLatch",
      areaName: ROGABOGU_AREA_NAME,
      enterLog: "<b>Rogabogu</b>: you descend beneath Lake Roga.",
      exitLog: "<b>Rogabogu</b>: you surface in Lake Roga."
    },
    {
      state: game.map?.yrgmaDim,
      latch: "yrgmaDimTeleportLatch",
      areaName: YRGMA_DIM_AREA_NAME,
      enterLog: "<b>Yrgma Dim</b>: you enter the mountain dark.",
      exitLog: "<b>Yrgma Dim</b>: you return to Harmush Lagh."
    },
    {
      state: game.map?.badgeria,
      latch: "badgeriaTeleportLatch",
      areaName: BADGERIA_AREA_NAME,
      enterLog: "<b>Badgeria</b>: you squeeze into the badger den.",
      exitLog: "<b>Badgeria</b>: you climb back into Harmush Lagh."
    }
  ];
  for (const portal of portals) {
    const dungeon = portal.state;
    if (!dungeon) continue;
    const entrance = dungeon.entranceObstacle;
    if (!entrance?.door || !dungeon.entryPoint || !dungeon.exitPoint || !dungeon.returnPoint) continue;
    const atEntrance = distance(game.player, entrance.door) <= entrance.door.radius + game.player.radius;
    const atExit = distance(game.player, dungeon.exitPoint) <= 72 + game.player.radius;
    if ((atEntrance || atExit) && game[portal.latch]) continue;
    if (atEntrance) {
      game[portal.latch] = true;
      teleportPlayerTo(dungeon.entryPoint);
      addLog(portal.enterLog);
      return;
    }
    if (atExit && areaAt(game.player.x, game.player.y)?.name === portal.areaName) {
      game[portal.latch] = true;
      teleportPlayerTo(dungeon.returnPoint);
      addLog(portal.exitLog);
      return;
    }
    if (!atEntrance && !atExit) game[portal.latch] = false;
  }
}

function portalEffects(ownerId = null) {
  return game.effects.filter(effect =>
    (effect.type === "portal" || effect.type === "portalMarker")
    && (!ownerId || effect.ownerId === ownerId)
  );
}

function portalPairFor(effect) {
  if (!effect || effect.type !== "portal") return [];
  return game.effects
    .filter(candidate => candidate.type === "portal" && candidate.ownerId === effect.ownerId)
    .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
}

function otherPortal(effect) {
  return portalPairFor(effect).find(candidate => candidate.id !== effect.id) || null;
}

function portalTriggerRadius(portal) {
  return Math.max(10, Math.min(16, (portal?.radius || 30) * 0.48));
}

function portalAreaNameAt(x, y) {
  return spawnAreaAt(x, y) || areaAt(x, y)?.name || "The Black Wilds";
}

function portalLocationLabel(portal) {
  return portal?.areaName || portalAreaNameAt(portal?.x, portal?.y);
}

async function portalReplacementChoice(ownerId = "player") {
  const portals = portalEffects(ownerId)
    .filter(effect => effect.type === "portal")
    .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  if (portals.length < 2) return "";
  const originLabel = portalLocationLabel(portals[0]);
  const destinationLabel = portalLocationLabel(portals[1]);
  return await showConfirmPrompt({
    title: "",
    text: "You already have two linked portals. Choose which portal this spell will replace.",
    options: [
      { label: `Replace Origin (${originLabel})`, value: "origin" },
      { label: `Replace Destination (${destinationLabel})`, value: "destination" },
      { label: "Cancel", value: "" }
    ]
  });
}

function summonPortalAt(x, y, { ownerId = "player", ownerName = "Soulreaper", replace = "" } = {}) {
  const existing = portalEffects(ownerId).sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  const marker = existing.find(effect => effect.type === "portalMarker");
  const now = performance.now();
  if (marker) {
    marker.type = "portal";
    marker.radius = 30;
    marker.age = 0;
    marker.areaName = marker.areaName || portalAreaNameAt(marker.x, marker.y);
    game.effects.push({
      id: sharedEntityId("portal"),
      type: "portal",
      ownerId,
      ownerName,
      x,
      y,
      radius: 30,
      age: 0,
      createdAt: now,
      areaName: portalAreaNameAt(x, y)
    });
    addLog(`<b>Summon Portal</b> links two Ethereal portals.`);
    return;
  }
  const portals = existing.filter(effect => effect.type === "portal");
  if (portals.length >= 2) {
    const target = replace === "destination" ? portals[1] : portals[0];
    target.x = x;
    target.y = y;
    target.radius = 30;
    target.age = 0;
    target.areaName = portalAreaNameAt(x, y);
    addLog(`<b>Summon Portal</b> replaces the ${replace === "destination" ? "destination" : "origin"} Portal.`);
    return;
  }
  game.effects.push({
    id: sharedEntityId("portal-marker"),
    type: "portalMarker",
    ownerId,
    ownerName,
    x,
    y,
    radius: 24,
    age: 0,
    createdAt: now,
    areaName: portalAreaNameAt(x, y)
  });
  addLog(`<b>Summon Portal</b> places an Ethereal marker.`);
}

function handlePortals() {
  const touching = game.effects.find(effect =>
    effect.type === "portal"
    && distance(game.player, effect) <= portalTriggerRadius(effect)
    && otherPortal(effect)
  );
  if (!touching) {
    game.portalContactLatch = null;
    return;
  }
  if (game.portalContactLatch === touching.id) return;
  const destination = otherPortal(touching);
  if (!destination) return;
  game.portalContactLatch = destination.id;
  teleportPlayerTo({ x: destination.x, y: destination.y });
  addLog(`<b>Portal</b>: you step through to <b>${escapeHtml(destination.areaName || areaAt(destination.x, destination.y)?.name || "The Black Wilds")}</b>.`);
  sendMultiplayerUpdate(true);
}

function clearHollyhockMossRocks(keepId = "") {
  game.groundItems = game.groundItems.filter(drop => !(drop.localOnly && drop.questId === "hollyhocks-mossy-errand" && drop.id !== keepId));
}

function hollyhockQuestAnchorPoint() {
  return (game.map?.configuredNpcs || []).find(npc => npc.id === "herbalist-hollyhock" || npc.name === "Herbalist Hollyhock")
    || game.player;
}

function randomFarHollyhockMossStonePoint(existingPoints = []) {
  const area = areaByName(HARMUSH_LAGH_AREA_NAME);
  const bounds = areaSamplingBounds(area);
  if (!bounds) return null;
  const anchor = hollyhockQuestAnchorPoint();
  const minimumDistance = 760;
  const minimumStoneSpacing = 320;
  let farthest = null;
  let farthestDistance = 0;
  for (let attempt = 0; attempt < 420; attempt += 1) {
    const x = randomBetween(bounds.minX, bounds.maxX);
    const y = randomBetween(bounds.minY, bounds.maxY);
    if (spawnAreaAt(x, y) !== HARMUSH_LAGH_AREA_NAME) continue;
    if (!isWalkable(x, y, 18)) continue;
    const preferenceUnit = { radius: 18, aquatic: false, amphibious: false };
    if (terrainPreferenceSatisfied(preferenceUnit, x, y, 18) !== true) continue;
    if (existingPoints.some(point => Math.hypot(point.x - x, point.y - y) < minimumStoneSpacing)) continue;
    const distanceFromHollyhock = Math.hypot((anchor.x || 0) - x, (anchor.y || 0) - y);
    if (distanceFromHollyhock >= minimumDistance) return { x, y };
    if (distanceFromHollyhock > farthestDistance) {
      farthestDistance = distanceFromHollyhock;
      farthest = { x, y };
    }
  }
  return farthest;
}

function spawnHollyhockMossRocks(questId = "hollyhocks-mossy-errand", count = 1) {
  clearHollyhockMossRocks();
  const itemTemplate = cloneItem("Moss-Covered Stone");
  if (!itemTemplate) return null;
  const ids = [];
  const points = [];
  for (let i = 0; i < Math.max(1, count); i += 1) {
    const point = randomFarHollyhockMossStonePoint(points)
      || randomTerrainPointInArea(HARMUSH_LAGH_AREA_NAME, 18, false, 220)
      || randomWalkablePointNear(hollyhockQuestAnchorPoint().x, hollyhockQuestAnchorPoint().y, 760, 1600)
      || { x: game.player.x + 900, y: game.player.y + 120 };
    points.push(point);
    const drop = dropGroundItem(cloneItem("Moss-Covered Stone") || structuredClone(itemTemplate), point.x, point.y, 0);
    if (!drop) continue;
    drop.localOnly = true;
    drop.questId = questId;
    drop.ownerId = localPlayerId();
    ids.push(drop.id);
  }
  return ids.length ? ids : null;
}

function clearHollyhockKappa() {
  const removed = game.enemies.filter(enemy => enemy.questSpawn === "hollyhock-kappa");
  game.enemies = game.enemies.filter(enemy => enemy.questSpawn !== "hollyhock-kappa");
  invalidateEnemySpatialGrid();
  if (game.mode === "multiplayer") {
    for (const enemy of removed) sendMultiplayerEnemyUpdate(enemy, false);
  }
}

function spawnHollyhockKappa(origin = game.player, questId = "hollyhocks-lake-offering") {
  clearHollyhockKappa();
  const template = allMonsterTemplates.find(candidate => candidate.name === "Kappa");
  if (!template) {
    addLog("<b>Hollyhock's Lake Offering</b>: no Kappa template is available.");
    return null;
  }
  const lake = (game.map?.puddles || []).find(puddle => puddle.kind === "harmush-lake");
  const source = lake || origin || game.player;
  const point = randomWalkablePointNear(source.x, source.y, game.player.radius + 110, 260)
    || randomTerrainPointInArea(HARMUSH_LAGH_AREA_NAME, (template.radius || 14) * UNIT_SIZE_SCALE, false, 120)
    || { x: game.player.x + 140, y: game.player.y };
  const lvl = Math.max(2, Math.min(8, game.player.level || 2));
  const enemy = makeEnemy(template, lvl, point.x, point.y, {
    aggressive: true,
    hostileToPlayer: true,
    hostileToPlayerReason: "quest",
    targetPlayerId: localPlayerId(),
    questSpawn: "hollyhock-kappa",
    questId,
    questOwnerId: localPlayerId(),
    spawnSource: "quest",
    noRespawn: true,
    area: HARMUSH_LAGH_AREA_NAME
  });
  enemy.hostileTarget = game.player;
  game.enemies.push(enemy);
  invalidateEnemySpatialGrid();
  spawnFloatingText(enemy, "RISING", realmUiColor(enemy.realm), "rgba(0, 0, 0, 0.82)");
  if (game.mode === "multiplayer") sendMultiplayerEnemyUpdate(enemy, true);
  return enemy;
}

window.spawnHollyhockMossRocks = spawnHollyhockMossRocks;
window.clearHollyhockMossRocks = clearHollyhockMossRocks;
window.spawnHollyhockKappa = spawnHollyhockKappa;
window.clearHollyhockKappa = clearHollyhockKappa;

const {
  applyItemStats,
  resolveEquipmentSlot,
  weaponFromItem,
  positionEquipmentPopover,
  equipInventoryItem,
  hideItemActionMenu,
  showItemActionMenu,
  showStackQuantityMenu,
  showShopBuyMenu,
  positionItemActionMenu,
  showRealmStoneSpellMenu,
  enchantableInventoryItems,
  enchantableEquippedItems,
  showEnchantmentTargetMenu,
  applyEnchantmentFromInventory,
  showRewardItemPreview,
  dropInventoryItem,
  useInventoryItem,
  applyRealmStone,
  learnScroll,
  sellInventoryItem,
  renderShop,
  openShop,
  closeShop,
  openDevItemShop,
  buyShopItem,
  currentShopkeeper,
  activeShopInventory,
  isMiscItem,
  devShopInventoryForTab,
  addDevShopItem,
  syncOpenBagInventory,
  bindInventoryUIEvents
} = window.SoulreaperInventoryUI || {};

function renderDevSpawnWindow() {
  const templates = [...allMonsterTemplates].sort((a, b) => a.name.localeCompare(b.name));
  updateHtmlIfChanged(devSpawnList, templates.map(template => {
    const realm = template.realm || "Mortal";
    const color = realmInfo[realm]?.color || "#f2ede3";
    const shadowClass = realm === "Umbral" ? " shadow-text" : "";
    return `
      <button class="dev-spawn-item" type="button" data-spawn-template="${escapeHtml(template.name)}">
        <strong>${escapeHtml(template.name)}</strong>
        <span>
          <b class="${shadowClass}" style="color:${color}">${escapeHtml(realm)}</b>
          ${escapeHtml(template.type || "Beast")}
          ${template.alignment ? ` / ${escapeHtml(template.alignment)}` : ""}
        </span>
        <small>${escapeHtml(template.weapon?.name || "Rat Claw")}</small>
      </button>
    `;
  }).join(""));
}

function openDevSpawnWindow() {
  if (!devSpawnWindow.classList.contains("hidden")) return;
  hideItemActionMenu();
  devSpawnLevelInput.value = "1";
  renderDevSpawnWindow();
  game.running = false;
  devSpawnWindow.classList.remove("hidden");
  syncPointerPause();
}

function closeDevSpawnWindow() {
  devSpawnWindow.classList.add("hidden");
  syncPointerPause();
}

function spawnDevMob(templateName) {
  const template = allMonsterTemplates.find(candidate => candidate.name === templateName);
  if (!template) {
    addLog("<b>Devtools:</b> mob not found.");
    return;
  }
  const lvl = Math.max(1, Math.min(99, Math.floor(Number(devSpawnLevelInput.value) || 1)));
  devSpawnLevelInput.value = String(lvl);
  const spawnRadius = (template.radius || 14) * UNIT_SIZE_SCALE;
  let point = null;
  for (let attempt = 0; attempt < 10 && !point; attempt += 1) {
    const candidate = randomWalkablePointNear(game.player.x, game.player.y, game.player.radius + 72, 220)
      || randomWalkablePointNear(game.player.x, game.player.y, game.player.radius + 24, 320);
    if (candidate && enemySpawnSeparated(candidate.x, candidate.y, spawnRadius)) point = candidate;
  }
  point ||= randomWalkablePointNear(game.player.x, game.player.y, game.player.radius + 24, 320)
    || { x: game.player.x + game.player.radius + 90, y: game.player.y };
  if (game.mode === "multiplayer" && game.multiplayer.connected) {
    sendMultiplayerAction({
      action: "dev:spawn",
      templateName: template.name,
      lvl,
      x: point.x,
      y: point.y
    });
    addLog(`<b>Devtools:</b> requested <b>LVL ${lvl} ${escapeHtml(template.name)}</b> spawn.`);
    closeDevSpawnWindow();
    return;
  }
  const enemy = makeEnemy(template, lvl, point.x, point.y);
  game.enemies.push(enemy);
  spawnFloatingText(enemy, `LVL ${lvl}`, "#ffcf66", "rgba(0, 0, 0, 0.82)", 1.2);
  addLog(`<b>Devtools:</b> spawned <b>LVL ${lvl} ${escapeHtml(enemy.name)}</b>.`, enemy);
  sendMultiplayerWorldState(true);
  closeDevSpawnWindow();
}

const {
  openTrainer,
  mapTrainers,
  handleTrainerContact,
  closeTrainer,
  nextSpellSlotUnlock,
  trainerRealms,
  trainerCanTrainSpell,
  trainerMaxSpellLevel,
  trainerCanTrainSpellLevel,
  renderTrainerWindow,
  trainActiveSpell,
  unlockTrainerSpellSlot,
  openSpellbookWindow,
  openSpellLineupsWindow,
  closeSpellbookWindow,
  openSoulCrystalsWindow,
  closeSoulCrystalsWindow,
  chronicleWindows,
  closeChronicleWindows,
  updateChronicleInlineMode,
  renderSoulCrystalsWindow,
  renderSpellbookWindow,
  syncSpellbookAttention,
  clearNewSpellAlert,
  assignLearnedSpell,
  renderReplaceSpellWindow,
  replaceActiveSpell
} = window.SoulreaperSpellUI || {};


const {
  renderQuestLog,
  questRewardHtml,
  openQuestLog,
  closeQuestLog,
  markQuestHovered,
  positionQuestTooltip,
  hideQuestTooltip,
  abandonQuest,
  completeQuest,
  configuredQuest,
  handleInventoryItemPickedUp,
  handleHollyhockPlayerDeath,
  updateHollyhockKappaDefeated,
  updateHollyhockChlorophyllTellursa,
  canDropMossCoveredRockForHollyhock,
  canChlorophyllHollyhockTellursa,
  gvadaQuest,
  ratInfestationQuest,
  sharleneParcelQuest,
  renderDialoguePage,
  realmNameHtml,
  dialoguePageText,
  dialogueSpeakerByTitle,
  openDialogue,
  closeDialogue,
  napaeaSkullQuest,
  removeGoblinMenaceQuest,
  warWithGoblinsQuest,
  antidoteForThePlagueQuest,
  boneCollectorQuest,
  whiteStagQuest,
  startGvadaDialogue,
  startPleezixDialogue,
  startSharleneDialogue,
  startMordrenDialogue,
  startCecilDialogue,
  startQuigleyDialogue,
  startHappieDialogue,
  startTheodoraDialogue,
  startSlayleighDialogue,
  startJuanTaboDialogue,
  startWaldenDialogue,
  startMaimonDialogue,
  startSierraDialogue,
  startConfiguredQuestDialogue,
  startGuardDialogue,
  completeGvadaScrollObjective,
  updateGvadaRealmObjective,
  startGvadaStarterQuest,
  startSybilStarterQuest
} = window.SoulreaperQuestUI || {};

function unequipItem(slot) {
  const item = game.player.equippedItems[slot];
  if (!item) return;
  const inventorySlot = game.player.inventory.findIndex(inventoryItem => inventoryItem === null);
  applyItemStats(item, -1);
  delete game.player.equippedItems[slot];
  if (slot === "Main Hand") {
    game.player.equipment[slot] = "Empty";
    game.player.weapon = null;
    game.player.attackTimer = 0;
  } else {
    game.player.equipment[slot] = "Empty";
  }
  if (inventorySlot >= 0) {
    game.player.inventory[inventorySlot] = item;
    addLog(`Unequipped <b>${item.name}</b>.`);
  } else {
    const point = playerDropPoint();
    dropGroundItem(item, point.x, point.y);
    addLog(`Inventory full. <b>${item.name}</b> was dropped.`);
  }
  playSoundEffect("claw");
  markUIDirty();
  renderUI();
}

function pickupNearbyItems() {
  if (game.mode === "multiplayer") {
    for (const drop of game.groundItems) {
      if (distance(game.player, drop) > game.player.radius + drop.radius + 10) continue;
      if (game.multiplayer.pendingPickups.has(drop.id)) continue;
      if (drop.item && !hasInventoryRoomFor(drop.item)) continue;
      if (drop.localOnly && drop.questId === "hollyhocks-mossy-errand") {
        if (!addInventoryItem(drop.item)) return;
        game.groundItems.splice(game.groundItems.indexOf(drop), 1);
        addLog(`Picked up <b>${drop.item.name}</b>${drop.item.stackable ? ` x${itemQuantity(drop.item)}` : ""}.`);
        handleInventoryItemPickedUp?.(drop.item, drop);
        markUIDirty();
        return;
      }
      game.multiplayer.pendingPickups.add(drop.id);
      if (drop.localOnly) sendMultiplayerAction({ action: "pickup:match", drop: serializeGroundItem(drop), localDropId: drop.id });
      else sendMultiplayerAction({ action: "pickup", dropId: drop.id });
      return;
    }
    return;
  }
  let pickedUpSharedDrop = false;
  for (const drop of [...game.groundItems]) {
    if (distance(game.player, drop) > game.player.radius + drop.radius + 10) continue;
    if (drop.type === "heart") {
      healPlayer(drop.heal, "Heart");
      game.groundItems.splice(game.groundItems.indexOf(drop), 1);
      pickedUpSharedDrop = true;
      continue;
    }
    if (drop.type === "gold") {
      game.player.gold += drop.amount;
      spawnFloatingText(game.player, `+${drop.amount} Gold`, "#d9b95f", "rgba(0, 0, 0, 0.82)");
      game.groundItems.splice(game.groundItems.indexOf(drop), 1);
      markUIDirty();
      pickedUpSharedDrop = true;
      continue;
    }
    if (!addInventoryItem(drop.item)) return;
    game.groundItems.splice(game.groundItems.indexOf(drop), 1);
    addLog(`Picked up <b>${drop.item.name}</b>${drop.item.stackable ? ` x${itemQuantity(drop.item)}` : ""}.`);
    handleInventoryItemPickedUp?.(drop.item, drop);
    markUIDirty();
    pickedUpSharedDrop = true;
  }
  if (pickedUpSharedDrop) sendMultiplayerWorldState(true);
}

function grantAcceptedPickup(drop) {
  if (!drop) return;
  drop = hydrateMultiplayerDrop(drop);
  game.multiplayer.pendingPickups.delete(drop.id);
  game.groundItems = game.groundItems.filter(groundDrop => !groundDrop.localOnly || !groundDropsMatch(groundDrop, drop));
  if (drop.type === "heart") {
    healPlayer(drop.heal, "Heart");
    return;
  }
  if (drop.type === "gold") {
    game.player.gold += drop.amount || 0;
    spawnFloatingText(game.player, `+${drop.amount || 0} Gold`, "#d9b95f", "rgba(0, 0, 0, 0.82)");
    markUIDirty();
    return;
  }
  if (drop.item && addInventoryItem(drop.item)) {
    addLog(`Picked up <b>${drop.item.name}</b>${drop.item.stackable ? ` x${itemQuantity(drop.item)}` : ""}.`);
    handleInventoryItemPickedUp?.(drop.item, drop);
    markUIDirty();
  }
}


const {
  applyDevAreaConfigs,
  generateMap,
  rectangleBoundary,
  rectContainsPoint,
  rectCollidesCircle,
  pointInsideHouse,
  pointCollidesHouseWalls,
  houseCollisionBounds,
  makeArea,
  smoothBoundary,
  areaBoundsOverlap,
  areaRadiusAt,
  boundaryRadiusAt,
  makeWindingArea,
  makeGladePuddles,
  makePassage,
  isPointInBoundary,
  pointInPassage,
  pointInAnyPassage,
  boundsForPoints,
  obstacleBounds,
  prepareMapCaches,
  scaleMapNpcRadii,
  nearbyObstacles,
  nearbyPuddles,
  pointInPuddle,
  unitInPuddle,
  unitInDungeon,
  areaAt,
  collidingObstacle,
  pointInsideRect,
  segmentIntersectsRect,
  distancePointToSegment,
  segmentIntersectsObstacle,
  lineOfSightBlocked,
  hasLineOfSight,
  isWalkable
} = window.SoulreaperMapGeneration || {};

function moveUnit(unit, dx, dy) {
  if (!dx && !dy) return;
  const nextX = unit.x + dx;
  const nextY = unit.y + dy;
  if ((unit === game.player && game.ghostMode) || unitFlying(unit)) {
    if (!areaAt(nextX, nextY)) return;
    unit.x = nextX;
    unit.y = nextY;
    return;
  }
  if (unit === game.player && collidingObstacle(unit.x, unit.y, unit.radius) && areaAt(nextX, nextY)) {
    unit.x = nextX;
    unit.y = nextY;
    return;
  }
  if (isWalkable(nextX, nextY, unit.radius)) {
    unit.x = nextX;
    unit.y = nextY;
    return;
  }
  if (isWalkable(nextX, unit.y, unit.radius)) unit.x = nextX;
  if (isWalkable(unit.x, nextY, unit.radius)) unit.y = nextY;
}

function updateUnitFacingFromMovement(unit, beforeX, afterX) {
  const dx = afterX - beforeX;
  if (Math.abs(dx) >= 0.2) unit.facingX = dx < 0 ? 1 : -1;
}

function forcedFleeVector(unit) {
  const sourceX = Number(unit?.mortifySourceX);
  const sourceY = Number(unit?.mortifySourceY);
  let dx = unit.x - (Number.isFinite(sourceX) ? sourceX : unit.x);
  let dy = unit.y - (Number.isFinite(sourceY) ? sourceY : unit.y);
  let mag = Math.hypot(dx, dy);
  if (mag <= 0.001) {
    dx = unit.facingX || 1;
    dy = 0;
    mag = 1;
  }
  return { dx: dx / mag, dy: dy / mag };
}

function moveMortifiedPlayer(dt) {
  if ((game.player.mortified || 0) <= 0 || game.player.rooted > 0 || game.player.stunned > 0) return false;
  const { dx, dy } = forcedFleeVector(game.player);
  const puddleMultiplier = waterSpeedMultiplier(game.player);
  const freezeMultiplier = unitFrozen(game.player) ? 0.5 : 1;
  const speed = (132 + effectiveStat(game.player, "SPD") * 9) * puddleMultiplier * freezeMultiplier;
  const beforeX = game.player.x;
  moveUnit(game.player, dx * speed * dt, dy * speed * dt);
  updateUnitFacingFromMovement(game.player, beforeX, game.player.x);
  return true;
}

function moveMortifiedEnemy(enemy, dt) {
  if (!enemy || (enemy.mortified || 0) <= 0 || enemy.rooted > 0 || enemy.stunned > 0) return false;
  const { dx, dy } = forcedFleeVector(enemy);
  enemy.moveSpeedOverride = unitSpeed(enemy) * 1.15;
  moveEnemyToward(enemy, { x: enemy.x + dx * 240, y: enemy.y + dy * 240 }, dt, {
    path: false,
    respectTerrainPreference: unitHasWaterPreference(enemy)
  });
  delete enemy.moveSpeedOverride;
  return true;
}

function unitCanMoveTo(unit, x, y) {
  if (unitFlying(unit)) return Boolean(areaAt(x, y));
  return isWalkable(x, y, unit.radius);
}

function unitAmphibious(unit) {
  return Boolean(unit?.amphibious);
}

function unitAquatic(unit) {
  return Boolean(unit?.aquatic) && !unitAmphibious(unit);
}

function unitHasWaterPreference(unit) {
  return !unitFlying(unit) && !unitAmphibious(unit);
}

function isLavaFeature(puddle) {
  return puddle?.terrain === "lava" || String(puddle?.kind || "").includes("lava");
}

function pointInWaterFeature(x, y, padding = 0) {
  const waterPadding = Number(padding) || 0;
  const puddles = nearbyPuddles
    ? nearbyPuddles(x, y, Math.abs(waterPadding) + 96)
    : game.map?.puddles || [];
  return puddles.some(puddle => !isLavaFeature(puddle) && pointInPuddle(x, y, puddle, waterPadding));
}

function pointInLavaFeature(x, y, padding = 0) {
  const lavaPadding = Number(padding) || 0;
  const puddles = nearbyPuddles
    ? nearbyPuddles(x, y, Math.abs(lavaPadding) + 96)
    : game.map?.puddles || [];
  return puddles.some(puddle => isLavaFeature(puddle) && pointInPuddle(x, y, puddle, lavaPadding));
}

function terrainPreferenceWaterPadding(unit, radius = unit?.radius || 0) {
  if (!unitHasWaterPreference(unit)) return Math.max(1, radius * 0.35);
  return unitAquatic(unit)
    ? -Math.max(3, radius * 0.35)
    : Math.max(6, radius * 0.65);
}

function unitInWaterFeature(unit) {
  if (!unit || unitFlying(unit)) return false;
  return pointInWaterFeature(unit.x, unit.y, terrainPreferenceWaterPadding(unit));
}

function terrainPreferenceSatisfied(unit, x = unit?.x, y = unit?.y, radius = unit?.radius || 0) {
  if (!unitHasWaterPreference(unit)) return true;
  const inWater = pointInWaterFeature(x, y, terrainPreferenceWaterPadding(unit, radius));
  return unitAquatic(unit) ? inWater : !inWater;
}

function areaByName(name) {
  if (!name) return null;
  return (game.map?.areas || []).find(area => area.name === name) || null;
}

function areaSamplingBounds(area) {
  if (!area) return null;
  return area.bounds
    || (area.boundary?.length ? boundsForPoints(area.boundary) : null)
    || {
      minX: area.center.x - area.width / 2,
      maxX: area.center.x + area.width / 2,
      minY: area.center.y - area.height / 2,
      maxY: area.center.y + area.height / 2
    };
}

function randomTerrainPointInArea(areaName, radius = 18, wantsWater = false, attempts = 160) {
  const area = areaByName(areaName);
  const bounds = areaSamplingBounds(area);
  if (!bounds) return null;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const x = randomBetween(bounds.minX, bounds.maxX);
    const y = randomBetween(bounds.minY, bounds.maxY);
    if (spawnAreaAt(x, y) !== areaName) continue;
    if (!isWalkable(x, y, radius)) continue;
    const preferenceUnit = { radius, aquatic: wantsWater, amphibious: false };
    if (terrainPreferenceSatisfied(preferenceUnit, x, y, radius) !== true) continue;
    return { x, y };
  }
  return null;
}

function nearestTerrainPointForUnit(unit, wantsWater, attempts = 120) {
  const areaName = unit.area || spawnAreaAt(unit.x, unit.y);
  const area = areaByName(areaName);
  const bounds = areaSamplingBounds(area);
  if (!bounds) return null;
  let best = null;
  let bestDistance = Infinity;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const x = randomBetween(bounds.minX, bounds.maxX);
    const y = randomBetween(bounds.minY, bounds.maxY);
    if (spawnAreaAt(x, y) !== areaName) continue;
    if (!unitCanMoveTo(unit, x, y)) continue;
    if (terrainPreferenceSatisfied({ ...unit, aquatic: wantsWater, amphibious: false }, x, y, unit.radius || 0) !== true) continue;
    const d = Math.hypot(unit.x - x, unit.y - y);
    if (d < bestDistance) {
      bestDistance = d;
      best = { x, y };
    }
  }
  return best;
}

function enemySeparationScore(enemy, x = enemy.x, y = enemy.y) {
  let score = 0;
  const radius = Math.max(18, enemy.radius || 14);
  const avoidRange = radius + 34;
  for (const other of nearbyEnemies({ x, y }, avoidRange + 40)) {
    if (other === enemy || other.hp <= 0) continue;
    if (enemy.pet && other === petMaster(enemy)) continue;
    if (other.pet && enemy === petMaster(other)) continue;
    const d = Math.max(1, Math.hypot(x - other.x, y - other.y));
    const desired = Math.max(avoidRange, radius + (other.radius || 14) + 12);
    if (d >= desired) continue;
    const overlap = desired - d;
    score += overlap * overlap;
  }
  return score;
}

function enemySpawnSeparated(x, y, radius = 14) {
  for (const other of nearbyEnemies({ x, y }, radius + 70)) {
    if (!other || other.hp <= 0) continue;
    if (Math.hypot(x - other.x, y - other.y) < radius + (other.radius || 14) + 28) return false;
  }
  return true;
}

function enemyPathTargetChanged(previousTarget, target, threshold = 72) {
  return !previousTarget || Math.hypot(previousTarget.x - target.x, previousTarget.y - target.y) > threshold;
}

function clearEnemyNavigationPath(enemy) {
  enemy.navigationPath = null;
  enemy.navigationPathTarget = null;
  enemy.navigationRepathTimer = 0;
  enemy.navigationStuckTime = 0;
}

function enemyNavigationWaypoint(enemy, target, dt) {
  if (segmentWalkableForUnit(enemy, enemy, target, 36)) {
    clearEnemyNavigationPath(enemy);
    return target;
  }
  enemy.navigationRepathTimer = Math.max(0, (enemy.navigationRepathTimer || 0) - dt);
  const needsPath = enemyPathTargetChanged(enemy.navigationPathTarget, target)
    || !Array.isArray(enemy.navigationPath)
    || !enemy.navigationPath.length
    || enemy.navigationRepathTimer <= 0
    || (enemy.navigationStuckTime || 0) > 0.55;
  if (needsPath) {
    enemy.navigationPath = findEnemyLeashPath(enemy, target);
    enemy.navigationPathTarget = { x: target.x, y: target.y };
    enemy.navigationRepathTimer = 0.65;
    enemy.navigationStuckTime = 0;
  }
  while (enemy.navigationPath?.length) {
    const waypoint = enemy.navigationPath[0];
    if (Math.hypot(enemy.x - waypoint.x, enemy.y - waypoint.y) > Math.max(22, (enemy.radius || 14) * 1.2)) break;
    enemy.navigationPath.shift();
  }
  return enemy.navigationPath?.[0] || target;
}

function moveEnemyToward(enemy, target, dt, options = {}) {
  const d = distance(enemy, target);
  if (d <= 1) return;
  const moveTarget = options.path === false ? target : enemyNavigationWaypoint(enemy, target, dt);
  const speed = (enemy.moveSpeedOverride ?? unitSpeed(enemy)) * dt;
  const baseAngle = Math.atan2(moveTarget.y - enemy.y, moveTarget.x - enemy.x);
  const angles = [0, 0.28, -0.28, 0.56, -0.56, 0.9, -0.9, 1.25, -1.25, 1.7, -1.7, Math.PI];
  let best = null;
  let bestScore = Infinity;

  for (const offset of angles) {
    const angle = baseAngle + offset;
    const x = enemy.x + Math.cos(angle) * speed;
    const y = enemy.y + Math.sin(angle) * speed;
    if (!unitCanMoveTo(enemy, x, y)) continue;
    if (sacredGroveBlocksEnemyStep(enemy, x, y)) continue;
    if (options.respectTerrainPreference && !terrainPreferenceSatisfied(enemy, x, y, enemy.radius || 0)) continue;
    const lookaheadDistance = Math.max((enemy.radius || 14) * 2.4, speed + 18);
    const lookahead = {
      x: x + Math.cos(angle) * lookaheadDistance,
      y: y + Math.sin(angle) * lookaheadDistance
    };
    const blockedSoon = !unitCanMoveTo(enemy, lookahead.x, lookahead.y);
    const score = Math.hypot(moveTarget.x - x, moveTarget.y - y)
      + Math.abs(offset) * 18
      + enemySeparationScore(enemy, x, y) * 0.08
      + (blockedSoon ? 70 : 0);
    if (score < bestScore) {
      bestScore = score;
      best = { x, y };
    }
  }

  if (best) {
    const beforeX = enemy.x;
    const beforeY = enemy.y;
    enemy.x = best.x;
    enemy.y = best.y;
    updateUnitFacingFromMovement(enemy, beforeX, enemy.x);
    const moved = Math.hypot(enemy.x - beforeX, enemy.y - beforeY);
    enemy.navigationStuckTime = moved < 0.35 ? (enemy.navigationStuckTime || 0) + dt : 0;
  } else {
    enemy.navigationStuckTime = (enemy.navigationStuckTime || 0) + dt;
  }
}

function wanderEnemy(enemy, dt) {
  enemy.wanderTimer = (enemy.wanderTimer || 0) - dt;
  if (enemy.wanderTimer <= 0) {
    enemy.wanderTimer = randomBetween(0.8, 2.4);
    enemy.wanderAngle = randomBetween(0, Math.PI * 2);
    if (unitHasWaterPreference(enemy)) {
      for (let attempt = 0; attempt < 16; attempt += 1) {
        const angle = randomBetween(0, Math.PI * 2);
        const target = {
          x: enemy.x + Math.cos(angle) * 80,
          y: enemy.y + Math.sin(angle) * 80
        };
        if (!unitCanMoveTo(enemy, target.x, target.y)) continue;
        if (!terrainPreferenceSatisfied(enemy, target.x, target.y, enemy.radius || 0)) continue;
        enemy.wanderAngle = angle;
        break;
      }
    }
  }
  enemy.moveSpeedOverride = unitSpeed(enemy) * 0.5;
  const target = {
    x: enemy.x + Math.cos(enemy.wanderAngle) * 80,
    y: enemy.y + Math.sin(enemy.wanderAngle) * 80
  };
  if (!terrainPreferenceSatisfied(enemy, target.x, target.y, enemy.radius || 0)) {
    delete enemy.moveSpeedOverride;
    enemy.wanderTimer = 0;
    return;
  }
  const beforeX = enemy.x;
  const beforeY = enemy.y;
  moveEnemyToward(enemy, target, dt, { path: false, respectTerrainPreference: true });
  delete enemy.moveSpeedOverride;
  if (Math.hypot(enemy.x - beforeX, enemy.y - beforeY) < 0.5) enemy.wanderTimer = 0;
}

function correctIdleEnemyTerrain(enemy, dt) {
  if (!unitHasWaterPreference(enemy)) return false;
  const inWater = unitInWaterFeature(enemy);
  const wantsWater = unitAquatic(enemy);
  if (inWater === wantsWater) {
    enemy.terrainPreferenceTarget = null;
    return false;
  }
  const cached = enemy.terrainPreferenceTarget;
  const cachedValid = cached
    && spawnAreaAt(cached.x, cached.y) === (enemy.area || spawnAreaAt(enemy.x, enemy.y))
    && terrainPreferenceSatisfied({ ...enemy, aquatic: wantsWater, amphibious: false }, cached.x, cached.y, enemy.radius || 0)
    && unitCanMoveTo(enemy, cached.x, cached.y);
  const target = cachedValid ? cached : nearestTerrainPointForUnit(enemy, wantsWater);
  if (!target) return false;
  enemy.terrainPreferenceTarget = target;
  enemy.moveSpeedOverride = unitSpeed(enemy) * 0.75;
  moveEnemyToward(enemy, target, dt);
  delete enemy.moveSpeedOverride;
  if (Math.hypot(enemy.x - target.x, enemy.y - target.y) < Math.max(12, enemy.radius || 14)) {
    enemy.terrainPreferenceTarget = null;
    enemy.wanderTimer = 0;
  }
  return true;
}

function wanderingNpcs() {
  return [
    game.map?.juanTabo,
    game.map?.barbarianessSkjoldma,
    ...(game.map?.configuredNpcs || [])
  ].filter(npc => npc?.wandering);
}

function updateWanderingNpc(npc, dt) {
  npc.homeX ??= npc.x;
  npc.homeY ??= npc.y;
  npc.wanderTimer = (npc.wanderTimer || 0) - dt;
  if (npc.wanderTimer <= 0) {
    npc.wanderTimer = randomBetween(1.2, 3.4);
    npc.wanderAngle = randomBetween(0, Math.PI * 2);
  }
  const speed = 28;
  const nextX = npc.x + Math.cos(npc.wanderAngle || 0) * speed * dt;
  const nextY = npc.y + Math.sin(npc.wanderAngle || 0) * speed * dt;
  const homeDistance = Math.hypot(nextX - npc.homeX, nextY - npc.homeY);
  if (homeDistance > 130 || !unitCanMoveTo(npc, nextX, nextY)) {
    npc.wanderTimer = 0;
    return;
  }
  npc.x = nextX;
  npc.y = nextY;
}

function updateWanderingNpcs(dt) {
  for (const npc of wanderingNpcs()) updateWanderingNpc(npc, dt);
}

function updatePetIdle(enemy, dt) {
  if (!enemy.pet) return false;
  if (enemy.petCommand === "guard") return true;
  const master = petMaster(enemy);
  if (!master) return false;
  const followRange = 96;
  const looseRange = 150;
  const d = distance(enemy, master);
  if (d > looseRange) {
    enemy.moveSpeedOverride = unitSpeed(enemy);
    moveEnemyToward(enemy, master, dt);
    delete enemy.moveSpeedOverride;
    return true;
  }
  if (d > followRange) {
    enemy.moveSpeedOverride = unitSpeed(enemy) * 0.75;
    moveEnemyToward(enemy, master, dt);
    delete enemy.moveSpeedOverride;
    return true;
  }
  wanderEnemy(enemy, dt * 0.75);
  if (distance(enemy, master) > looseRange) moveEnemyToward(enemy, master, dt);
  return true;
}

function enemyLeashPoint(enemy) {
  return {
    x: enemy.leashX ?? enemy.triggerX ?? enemy.homeX ?? enemy.x,
    y: enemy.leashY ?? enemy.triggerY ?? enemy.homeY ?? enemy.y
  };
}

function rememberEnemyTrigger(enemy) {
  if (enemy.leashState === "retreating") return;
  if (enemy.leashState === "aggro" && enemy.triggerX !== undefined && enemy.triggerY !== undefined) return;
  enemy.triggerX = enemy.x;
  enemy.triggerY = enemy.y;
  enemy.leashState = "aggro";
}

function clearEnemyCombat(enemy) {
  enemy.hostileToPlayer = false;
  enemy.hostileTarget = null;
  enemy.hostileToPlayerReason = null;
  enemy.targetPlayerId = null;
  enemy.hostileTargetId = null;
  enemy.leashState = "idle";
  delete enemy.triggerX;
  delete enemy.triggerY;
  clearEnemyNavigationPath(enemy);
  if (enemy.petCommand === "attack") {
    enemy.petCommand = "follow";
    enemy.petTargetId = null;
  }
}

function restoreEnemyAtLeash(enemy) {
  enemy.hp = enemy.maxHp;
  enemy.dots = [];
  enemy.rooted = 0;
  enemy.rootVisual = "";
  enemy.pacified = 0;
  enemy.leashState = "idle";
  enemy.triggerX = undefined;
  enemy.triggerY = undefined;
  enemy.leashPath = null;
  enemy.leashPathTarget = null;
  clearEnemyCombat(enemy);
  spawnFloatingText(enemy, "RESTORED", "#f0cf63", "rgba(0, 0, 0, 0.82)");
}

function segmentWalkableForUnit(unit, from, to, step = 44) {
  const length = Math.hypot(to.x - from.x, to.y - from.y);
  const samples = Math.max(1, Math.ceil(length / step));
  for (let i = 1; i <= samples; i += 1) {
    const t = i / samples;
    const x = from.x + (to.x - from.x) * t;
    const y = from.y + (to.y - from.y) * t;
    if (!unitCanMoveTo(unit, x, y)) return false;
  }
  return true;
}

function findNearestLeashPathCell(unit, origin, minX, minY, cols, rows, cellSize) {
  const cellFor = point => ({
    cx: Math.max(0, Math.min(cols - 1, Math.round((point.x - minX) / cellSize))),
    cy: Math.max(0, Math.min(rows - 1, Math.round((point.y - minY) / cellSize)))
  });
  const start = cellFor(origin);
  for (let radius = 0; radius <= 4; radius += 1) {
    for (let dy = -radius; dy <= radius; dy += 1) {
      for (let dx = -radius; dx <= radius; dx += 1) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) !== radius) continue;
        const cx = start.cx + dx;
        const cy = start.cy + dy;
        if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) continue;
        const x = minX + cx * cellSize;
        const y = minY + cy * cellSize;
        if (unitCanMoveTo(unit, x, y)) return { cx, cy, x, y };
      }
    }
  }
  return null;
}

function smoothLeashPath(unit, points, target) {
  const path = [];
  let index = 0;
  while (index < points.length - 1) {
    let next = points.length - 1;
    for (; next > index + 1; next -= 1) {
      if (segmentWalkableForUnit(unit, points[index], points[next])) break;
    }
    path.push(points[next]);
    index = next;
  }
  if (!path.length || Math.hypot(path[path.length - 1].x - target.x, path[path.length - 1].y - target.y) > 18) {
    path.push({ x: target.x, y: target.y });
  }
  return path;
}

function findEnemyLeashPath(enemy, target) {
  const padding = 720;
  const minX = Math.min(enemy.x, target.x) - padding;
  const minY = Math.min(enemy.y, target.y) - padding;
  const maxX = Math.max(enemy.x, target.x) + padding;
  const maxY = Math.max(enemy.y, target.y) + padding;
  const cellSize = Math.max(96, Math.ceil(Math.max(maxX - minX, maxY - minY) / 41));
  const cols = Math.max(8, Math.ceil((maxX - minX) / cellSize) + 1);
  const rows = Math.max(8, Math.ceil((maxY - minY) / cellSize) + 1);
  const start = findNearestLeashPathCell(enemy, enemy, minX, minY, cols, rows, cellSize);
  const goal = findNearestLeashPathCell(enemy, target, minX, minY, cols, rows, cellSize);
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
      if (!unitCanMoveTo(enemy, x, y)) continue;
      if (dx && dy) {
        const sideA = { x: minX + (current.cx + dx) * cellSize, y: minY + current.cy * cellSize };
        const sideB = { x: minX + current.cx * cellSize, y: minY + (current.cy + dy) * cellSize };
        if (!unitCanMoveTo(enemy, sideA.x, sideA.y) || !unitCanMoveTo(enemy, sideB.x, sideB.y)) continue;
      }
      const nextKey = key(cx, cy);
      const moveCost = dx && dy ? 1.42 : 1;
      const nextG = current.g + moveCost;
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
  return smoothLeashPath(enemy, cells, target);
}

function moveEnemyAlongLeashPath(enemy, point, dt) {
  const targetChanged = !enemy.leashPathTarget
    || Math.hypot(enemy.leashPathTarget.x - point.x, enemy.leashPathTarget.y - point.y) > 24;
  const needsPath = targetChanged
    || !Array.isArray(enemy.leashPath)
    || !enemy.leashPath.length
    || (enemy.leashRepathTimer || 0) <= 0;
  if (needsPath) {
    enemy.leashPath = findEnemyLeashPath(enemy, point);
    enemy.leashPathTarget = { x: point.x, y: point.y };
    enemy.leashRepathTimer = 0.9;
  } else {
    enemy.leashRepathTimer -= dt;
  }
  const waypoint = enemy.leashPath?.[0] || point;
  if (Math.hypot(enemy.x - waypoint.x, enemy.y - waypoint.y) <= Math.max(18, enemy.radius || 14)) {
    enemy.leashPath?.shift();
  }
  enemy.moveSpeedOverride = unitSpeed(enemy) * 2;
  moveEnemyToward(enemy, enemy.leashPath?.[0] || point, dt, { path: false });
  delete enemy.moveSpeedOverride;
}

function moveEnemyToLeash(enemy, dt) {
  const point = enemyLeashPoint(enemy);
  if (segmentWalkableForUnit(enemy, enemy, point) && hasLineOfSight(enemy, point, enemy.radius || 14)) {
    enemy.leashPath = null;
    enemy.moveSpeedOverride = unitSpeed(enemy) * 2;
    moveEnemyToward(enemy, point, dt, { path: false });
    delete enemy.moveSpeedOverride;
  } else {
    moveEnemyAlongLeashPath(enemy, point, dt);
  }
  if (Math.hypot(enemy.x - point.x, enemy.y - point.y) <= Math.max(4, enemy.radius * 0.5)) {
    enemy.x = point.x;
    enemy.y = point.y;
    restoreEnemyAtLeash(enemy);
  }
}

function shouldEnemyReturnToLeash(enemy) {
  if (enemy.pet) return false;
  if (enemy.leashState === "retreating") return false;
  if (enemy.leashState !== "aggro") return false;
  const point = enemyLeashPoint(enemy);
  const leashRange = Number(enemy.leashRadius) || LEASH_RETURN_RANGE * RANGE_UNIT;
  if (Math.hypot(enemy.x - point.x, enemy.y - point.y) > leashRange) {
    enemy.leashState = "retreating";
    return true;
  }
  return false;
}

function shouldThrottleIdleEnemy(enemy, dt) {
  if (!enemy || enemy.pet) return false;
  if (enemy.hostileTarget || enemy.hostileToPlayer || enemy.leashState === "aggro" || enemy.leashState === "retreating") return false;
  if (enemy.hp < enemy.maxHp || enemy.dots?.length || enemy.statMods?.length || enemy.pacified > 0 || enemy.rooted > 0) return false;
  if (distance(enemy, game.player) <= 38 * RANGE_UNIT) return false;
  enemy.idleThinkTimer = (enemy.idleThinkTimer || 0) - dt;
  if (enemy.idleThinkTimer > 0) return true;
  enemy.idleThinkTimer = randomBetween(0.35, 0.65);
  return false;
}

function targetIsValid(target) {
  if (!target) return false;
  if (target === game.player) return game.player.hp > 0 && !unitInvisible(game.player);
  return game.enemies.includes(target) && target.hp > 0;
}

function enemySpatialKey(x, y) {
  return `${Math.floor(x / ENEMY_SPATIAL_CELL_SIZE)},${Math.floor(y / ENEMY_SPATIAL_CELL_SIZE)}`;
}

function invalidateEnemySpatialGrid() {
  game.enemySpatialGrid = null;
  game.enemySpatialCount = 0;
  game.enemySpatialVersion += 1;
}

function rebuildEnemySpatialGrid() {
  const grid = new Map();
  for (const enemy of game.enemies) {
    if (!enemy || enemy.hp <= 0) continue;
    const key = enemySpatialKey(enemy.x, enemy.y);
    if (!grid.has(key)) grid.set(key, []);
    grid.get(key).push(enemy);
  }
  game.enemySpatialGrid = grid;
  game.enemySpatialCount = game.enemies.length;
  game.enemySpatialGridVersion = game.enemySpatialVersion;
  return grid;
}

function nearbyEnemies(origin, radius = ENEMY_SPATIAL_CELL_SIZE) {
  if (!origin || !Number.isFinite(origin.x) || !Number.isFinite(origin.y)) return game.enemies;
  if (!Number.isFinite(radius)) return game.enemies;
  const grid = game.enemySpatialGrid
    && game.enemySpatialCount === game.enemies.length
    && game.enemySpatialGridVersion === game.enemySpatialVersion
    ? game.enemySpatialGrid
    : rebuildEnemySpatialGrid();
  const minCellX = Math.floor((origin.x - radius) / ENEMY_SPATIAL_CELL_SIZE);
  const maxCellX = Math.floor((origin.x + radius) / ENEMY_SPATIAL_CELL_SIZE);
  const minCellY = Math.floor((origin.y - radius) / ENEMY_SPATIAL_CELL_SIZE);
  const maxCellY = Math.floor((origin.y + radius) / ENEMY_SPATIAL_CELL_SIZE);
  const found = [];
  const seen = new Set();
  for (let cx = minCellX; cx <= maxCellX; cx += 1) {
    for (let cy = minCellY; cy <= maxCellY; cy += 1) {
      for (const enemy of grid.get(`${cx},${cy}`) || []) {
        if (seen.has(enemy)) continue;
        seen.add(enemy);
        found.push(enemy);
      }
    }
  }
  return found;
}

function activeSacredGroves() {
  return (game.effects || []).filter(effect => (
    effect?.type === "sacredGrove"
    && (Number(effect.duration) || 0) > (Number(effect.age) || 0)
  ));
}

function sacredGroveContains(effect, unit, padding = 0) {
  if (!effect || !unit) return false;
  return distance(effect, unit) <= (effect.radius || 0) + padding;
}

function sacredGroveBlocksEnemyTarget(enemy, target) {
  if (!enemy || !target || enemy.pet) return false;
  return activeSacredGroves().some(effect => (
    sacredGroveContains(effect, target, target.radius || 0)
    && !sacredGroveContains(effect, enemy, enemy.radius || 0)
  ));
}

function sacredGroveBlocksEnemyStep(enemy, x, y) {
  if (!enemy || enemy.pet) return false;
  const next = { x, y, radius: enemy.radius || 14 };
  return activeSacredGroves().some(effect => (
    !sacredGroveContains(effect, enemy, enemy.radius || 0)
    && sacredGroveContains(effect, next, enemy.radius || 0)
  ));
}

function setEnemyTarget(enemy, target, reason = "provoked") {
  if (dungeonMobTargetBlocked(enemy, target)) return;
  if (sacredGroveBlocksEnemyTarget(enemy, target)) return;
  rememberEnemyTrigger(enemy);
  enemy.hostileTarget = target;
  if (target === game.player) {
    enemy.hostileToPlayer = true;
    if (game.mode === "multiplayer") enemy.targetPlayerId = game.multiplayer.id;
    enemy.hostileToPlayerReason = reason;
  } else if (unitAlignment(target) === "Neutral" && !target.hostileTarget && !dungeonMobTargetBlocked(target, enemy)) {
    target.hostileTarget = enemy;
  }
}

function updateEnemyTarget(enemy) {
  if (enemy.pacified > 0) {
    clearEnemyCombat(enemy);
    return null;
  }
  if (enemy.pet && enemy.petCommand === "attack") {
    const orderedTarget = game.enemies.find(candidate => candidate.id === enemy.petTargetId && candidate.hp > 0);
    if (orderedTarget && !unitFriendlyToPetMaster(enemy, orderedTarget) && !targetOutsideEnemyDungeon(enemy, orderedTarget)) {
      setEnemyTarget(enemy, orderedTarget, "pet-command");
      return orderedTarget;
    }
    enemy.petCommand = "follow";
    enemy.petTargetId = null;
  }
  if (enemy.pet && enemy.hostileTarget && unitFriendlyToPetMaster(enemy, enemy.hostileTarget)) {
    clearEnemyCombat(enemy);
  }
  if (enemy.pet && unitFriendlyToPetMaster(enemy, game.player)) {
    enemy.hostileToPlayer = false;
    if (enemy.targetPlayerId === localPlayerId()) enemy.targetPlayerId = null;
    enemy.hostileToPlayerReason = null;
  }
  if ((enemy.hostileTarget && targetOutsideEnemyDungeon(enemy, enemy.hostileTarget))
    || (enemy.targetPlayerId === localPlayerId() && targetOutsideEnemyDungeon(enemy, game.player))) {
    clearEnemyCombat(enemy);
    return null;
  }
  if ((enemy.hostileTarget && sacredGroveBlocksEnemyTarget(enemy, enemy.hostileTarget))
    || (enemy.targetPlayerId === localPlayerId() && sacredGroveBlocksEnemyTarget(enemy, game.player))) {
    clearEnemyCombat(enemy);
    return null;
  }
  if (enemy.hostileTarget && dungeonMobTargetBlocked(enemy, enemy.hostileTarget)) {
    clearEnemyCombat(enemy);
    return null;
  }
  const triggerRange = (enemy.aggroRange || HOSTILE_TRIGGER_RANGE) * RANGE_UNIT;
  if (distance(enemy, game.player) <= triggerRange
    && enemyNaturallyHostileToPlayer(enemy)
    && !targetOutsideEnemyDungeon(enemy, game.player)
    && hasLineOfSight(enemy, game.player)) {
    setEnemyTarget(enemy, game.player, "alignment");
  }
  if (targetIsValid(enemy.hostileTarget)) return enemy.hostileTarget;
  enemy.hostileTarget = null;
  let best = null;
  let bestDistance = Infinity;
  const candidates = [game.player, ...nearbyEnemies(enemy, triggerRange + 120)];
  for (const candidate of candidates) {
    if (candidate === enemy || !targetIsValid(candidate)) continue;
    if (targetOutsideEnemyDungeon(enemy, candidate)) continue;
    if (sacredGroveBlocksEnemyTarget(enemy, candidate)) continue;
    if (dungeonMobTargetBlocked(enemy, candidate)) {
      if (enemy.hostileTarget === candidate) enemy.hostileTarget = null;
      continue;
    }
    if (!unitHostileTo(enemy, candidate)) continue;
    const d = distance(enemy, candidate);
    if (d > triggerRange || d >= bestDistance) continue;
    if (!hasLineOfSight(enemy, candidate)) continue;
    best = candidate;
    bestDistance = d;
  }
  if (best) setEnemyTarget(enemy, best);
  return best;
}

function randomWalkablePointNear(cx, cy, minDistance, maxDistance) {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const angle = randomBetween(0, Math.PI * 2);
    const dist = randomBetween(minDistance, maxDistance);
    const x = cx + Math.cos(angle) * dist;
    const y = cy + Math.sin(angle) * dist;
    if (isWalkable(x, y, 18)) return { x, y };
  }
  return null;
}

function spawnFloatingText(unit, text, color, strokeColor = "rgba(0, 0, 0, 0.75)", duration = 1.15, options = {}) {
  game.floatingTexts.push({
    x: unit.x + randomBetween(-8, 8),
    y: unit.y - unit.radius - 8,
    vy: -58,
    age: 0,
    duration,
    text,
    color,
    strokeColor,
    style: options.style || ""
  });
}

function effectiveStat(unit, stat) {
  let value = unit.stats[stat] || 0;
  if (unit === game.player && stat === "SPD" && game.godMode) return 40;
  if (stat === "AGL") value += activeWarDrumsAgilityBonus(unit);
  if (stat === "DEF") value += activeAuraProtectionBonus(unit);
  if (stat === "REGEN") value += activeWhiteStagRegenBonus(unit);
  if (stat === "INT" || stat === "RESIST") value += activeEtherwindAuraBonus(unit, stat);
  if (stat === "FOCUS") value += activeBloodthirstyAuraBonus(unit);
  if (unit === game.player && stat === "FOCUS") value += daggerMasteryFocusBonus();
  if (unit === game.player && stat === "BLOCK") value += shieldMasteryBlockBonus();
  for (const mod of unit.statMods || []) {
    if (mod.setStats?.[stat] !== undefined) value = mod.setStats[stat];
    if (mod.stats?.[stat] !== undefined) value *= mod.stats[stat];
    if (mod.addStats?.[stat] !== undefined) value += mod.addStats[stat];
  }
  if (unit === game.player && stat === "REGEN" && activeSpellByName("Pestilent Aura")) return 0;
  if (stat === "AGL" || stat === "INT") return value;
  return Math.max(0, value);
}

function updateStatMods(unit, dt) {
  if (!unit.statMods?.length) return;
  for (const mod of [...unit.statMods]) {
    tickStatModHeal(unit, mod, dt);
    mod.remaining -= dt;
    if (mod.remaining <= 0) {
      unit.statMods.splice(unit.statMods.indexOf(mod), 1);
      if (unit === game.player) markUIDirty();
    }
  }
}

function tickStatModHeal(unit, mod, dt) {
  const heal = roundUpTenth(Number(mod?.healPerTick) || 0);
  if (!unit || heal <= 0) return;
  const tick = Math.max(0.1, Number(mod.tick) || 1);
  mod.tickTimer = Math.max(0, Number(mod.tickTimer ?? tick) - dt);
  while (mod.tickTimer <= 0 && (Number(mod.remaining) || 0) > 0) {
    mod.tickTimer += tick;
    const healed = healFriendlyCircleTarget(unit, heal, mod.name || "Healing");
    if (healed > 0) {
      if (mod.realmXpRealm && unit === game.player) grantRealmXP(mod.realmXpRealm, healed);
      if (mod.chlorophyll) spawnChlorophyllSparkles(unit);
    }
  }
}

function applyUnitStatMod(target, mod) {
  if (!target || !mod) return false;
  normalizeRealmData(mod);
  target.statMods = Array.isArray(target.statMods) ? target.statMods : [];
  const normalized = {
    ...mod,
    name: String(mod.name || "Spell").slice(0, 80),
    remaining: Math.max(0, Number(mod.remaining) || 0)
  };
  const existing = target.statMods.find(candidate => candidate.name === normalized.name);
  if (existing) Object.assign(existing, normalized);
  else target.statMods.push(normalized);
  if (target === game.player) markUIDirty();
  return true;
}

function removeStatModByName(unit, name) {
  if (!unit?.statMods?.length) return false;
  const before = unit.statMods.length;
  unit.statMods = unit.statMods.filter(mod => mod.name !== name);
  if (unit === game.player && unit.statMods.length !== before) markUIDirty();
  return unit.statMods.length !== before;
}

function removeInvisibility(unit) {
  if (!unitInvisible(unit)) return false;
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

function unitFrozen(unit) {
  return Boolean(unit?.statMods?.some(mod => mod.freeze));
}

function freezeDurationFor(target, duration) {
  return target === game.player || target?.boss ? duration / 2 : duration;
}

function applyFreeze(target, duration = 4) {
  applyUnitStatMod(target, { name: "Frozen", realm: "Ethereal", remaining: freezeDurationFor(target, duration), freeze: true, debuff: true });
  spawnFloatingText(target, "FROZEN", realmInfo.Ethereal.color, "rgba(0, 20, 70, 0.9)");
}

function applyDivineShield(target, amount, duration = 8) {
  applyUnitStatMod(target, { name: "Divine Shield", remaining: duration, shieldAmount: roundUpTenth(amount), shieldDamageType: "Physical", shieldColor: realmInfo.Celestial.color, realmXpRealm: "Celestial" });
  spawnFloatingText(target, "SHIELDED", realmInfo.Celestial.color);
}

function applyArcaneProtection(target, amount, duration = 8) {
  applyUnitStatMod(target, { name: "Arcane Shield", remaining: duration, shieldAmount: roundUpTenth(amount), shieldDamageType: "Magical", shieldColor: realmInfo.Ethereal.color, realmXpRealm: "Ethereal" });
  spawnFloatingText(target, "ARCANE SHIELD", realmInfo.Ethereal.color);
}

function absorbShieldDamage(target, damage, dmgType = "Magical") {
  if (damage <= 0 || !target?.statMods?.length) return damage;
  const shield = target.statMods.find(mod => mod.shieldAmount > 0 && (mod.shieldDamageType || "Physical") === dmgType);
  if (!shield) return damage;
  const absorbed = Math.min(damage, shield.shieldAmount);
  shield.shieldAmount = roundUpTenth(shield.shieldAmount - absorbed);
  if (shield.shieldAmount <= 0) target.statMods.splice(target.statMods.indexOf(shield), 1);
  if (absorbed > 0) spawnFloatingText(target, `-${formatNumber(absorbed)} Shield`, shield.shieldColor || realmInfo.Celestial.color);
  if (absorbed > 0 && shield.name === "Divine Shield") window.SoulreaperQuestUI?.updateDivineShieldObjective?.(absorbed);
  if (absorbed > 0 && target === game.player && shield.realmXpRealm) grantRealmXP(shield.realmXpRealm, absorbed);
  if (target === game.player) markUIDirty();
  return roundUpTenth(damage - absorbed);
}

function applyFaerieFire(target, lvl = 1, duration = 6, defensePenalty = -0.5 * lvl) {
  const existing = target.statMods.find(mod => mod.name === "Faerie Fire");
  const addStats = { DEF: defensePenalty };
  if (existing) {
    existing.remaining = duration;
    existing.addStats = addStats;
  } else {
    target.statMods.push({ name: "Faerie Fire", remaining: duration, addStats });
  }
  if (target === game.player) markUIDirty();
  spawnFloatingText(target, "FAERIE FIRE", realmInfo.Sylvan.color, "rgba(0, 48, 18, 0.9)");
}

function applyFaerieDust(target, lvl = 1, duration = 6, addStats = { SPD: -2 * lvl, AGL: -2 * lvl }, addResistances = { Sylvan: -lvl }) {
  const existing = target.statMods.find(mod => mod.name === "Faerie Dust");
  if (existing) {
    existing.remaining = duration;
    existing.addStats = addStats;
    existing.addResistances = addResistances;
    existing.corporeal = true;
  } else {
    target.statMods.push({ name: "Faerie Dust", remaining: duration, addStats, addResistances, corporeal: true });
  }
  if (target === game.player) markUIDirty();
  spawnFloatingText(target, "DUST", "#ff9bdc", "rgba(65, 0, 45, 0.85)");
}

function rollWeaponDamage() {
  const weapon = game.player.weapon;
  const attack = attackDamageBonus(effectiveStat(game.player, "ATK"));
  if (!weapon) return { total: attack, weaponRoll: 0, attack };
  const weaponRoll = rollDice(weapon.dice);
  return {
    total: roundUpTenth(weaponRoll + attack),
    weaponRoll,
    attack
  };
}

function rollWeaponDamageFor(weapon = game.player.weapon) {
  const attack = attackDamageBonus(effectiveStat(game.player, "ATK"));
  if (!weapon) return { total: roundUpTenth(attack), weaponRoll: 0, attack };
  const weaponRoll = rollDice(weapon.dice);
  return {
    total: roundUpTenth(weaponRoll + attack),
    weaponRoll,
    attack
  };
}

function attackInterval(weapon = game.player.weapon) {
  if (!weapon) return 1;
  const interval = Math.max(0.25, (effectivePlayerWeaponDelay(weapon) - effectiveStat(game.player, "AGL")) / 100);
  return unitFrozen(game.player) ? interval * 2 : interval;
}

function spellCooldown(spell) {
  if (!spell.cooldown) return 0;
  return Math.max(0.8, spell.cooldown * (spell.cooldownMultiplier || 1));
}

const clickTargetSpellNames = new Set([
  "Magic Missile",
  "Basic Prayer",
  "Heavenly Light",
  "Bone Ritual",
  "Curse of Disdain",
  "Virulent Plague",
  "Tangle Vine",
  "Spiderweb",
  "Chlorophyll",
  "Wooden Skin",
  "Pacify",
  "Hypnotize",
  "Lifesteal",
  "Spirit of Avia",
  "Godspeed",
  "Faerie Dust",
  "Fireball",
  "Invisibility",
  "Banish",
  "Clarity",
  "Ice Bolt",
  "Chain Lightning",
  "Divine Shield",
  "Arcane Shield",
  "Tame Beast",
  "Unholy Dominion",
  "Mortify"
]);

function spellTargetMode(spell) {
  if (!spell) return "none";
  if (spell.manualTarget && spell.castAt) return "point";
  if (spell.name === "Basic Prayer" || spell.name === "Heavenly Light" || spell.name === "Bone Ritual" || spell.name === "Chlorophyll" || spell.name === "Wooden Skin") return "friendly-unit";
  if (spell.name === "Spirit of Avia" || spell.name === "Godspeed" || spell.name === "Invisibility" || spell.name === "Clarity" || spell.name === "Divine Shield" || spell.name === "Arcane Shield") return "friendly-player";
  if (spell.name === "Banish") return "unit";
  if (clickTargetSpellNames.has(spell.name)) return "enemy";
  return "none";
}

function isUmbralRevenant(unit) {
  return Boolean(unit && normalizeRealm(unit.realm || "") === "Umbral" && String(unit.type || "").toLowerCase() === "revenant");
}

function isCelestialHealingSpell(spell) {
  return spell?.name === "Basic Prayer" || spell?.name === "Heavenly Light";
}

function celestialHealingDamagesTarget(spell, target) {
  return isCelestialHealingSpell(spell) && game.enemies.includes(target) && isUmbralRevenant(target);
}

function canTargetFriendlyPlayer(target) {
  if (!target) return false;
  if (target === game.player) return true;
  const targetAlignment = target === game.player ? playerAlignment() : target.alignment || "Neutral";
  const ownAlignment = playerAlignment();
  return targetAlignment === "Neutral" || targetAlignment === ownAlignment;
}

function canTargetFriendlyUnit(target) {
  if (!target) return false;
  if (target === game.player || !game.enemies.includes(target)) return canTargetFriendlyPlayer(target);
  if (isOwnPet(target)) return true;
  if (unitHostileTo(target, game.player) || unitHostileTo(game.player, target)) return false;
  return unitFriendlyAlignedWithPlayer(target);
}

function friendlyCircleTargets() {
  const targets = [game.player];
  for (const enemy of game.enemies || []) {
    if (canTargetFriendlyUnit(enemy)) targets.push(enemy);
  }
  if (game.mode === "multiplayer") {
    for (const peer of game.multiplayer?.peers?.values?.() || []) {
      if (canTargetFriendlyPlayer(peer)) targets.push(peer);
    }
  }
  return targets;
}

function friendlySpellTargetFailure(spell, target) {
  if (!target) return `${spell.name} needs a friendly target.`;
  if (spell.name === "Chlorophyll" && canChlorophyllHollyhockTellursa?.(target)) return "";
  const healsFriendlyUnits = spell.name === "Basic Prayer" || spell.name === "Heavenly Light" || spell.name === "Bone Ritual";
  const targetsFriendlyUnits = healsFriendlyUnits || spell.name === "Chlorophyll" || spell.name === "Wooden Skin";
  if (celestialHealingDamagesTarget(spell, target)) return "";
  const canTarget = targetsFriendlyUnits ? canTargetFriendlyUnit(target) : canTargetFriendlyPlayer(target);
  if (!canTarget) return `${spell.name} cannot target that unit.`;
  if (healsFriendlyUnits && target.hp >= target.maxHp) return `${target === game.player ? "You are" : target.name || "That player is"} already at full HP.`;
  if (spell.name === "Spirit of Avia" && target.statMods?.some(mod => mod.name === "Spirit of Avia")) return `${target === game.player ? "You are" : target.name || "That player is"} already blessed by Spirit of Avia.`;
  if (spell.name === "Godspeed" && target.statMods?.some(mod => mod.name === "Godspeed")) return `${target === game.player ? "You are" : target.name || "That player is"} already blessed by Godspeed.`;
  return "";
}

function canCastFriendlySpellOn(spell, target) {
  return !friendlySpellTargetFailure(spell, target);
}

function activeSpellByName(name) {
  return game.player.spells.find(spell => spell.name === name);
}

function unitActiveSpellByName(unit, name) {
  if (unit === game.player) return activeSpellByName(name);
  return (unit?.spells || unit?.activeSpells || []).find(spell => spell?.name === name) || null;
}

function burningSkinSpell(unit) {
  return unitActiveSpellByName(unit, "Burning Skin");
}

function burningSkinDamageValue(unit) {
  const spell = burningSkinSpell(unit);
  return spell ? spellDamageValue(spell, "damage", 0, 0.5, unit) : 0;
}

function weaponIsMelee(weapon) {
  return String(weapon?.animation || "claw").toLowerCase() !== "projectile" && (Number(weapon?.range) || 1) <= 3;
}

function frozenTouchSpell(unit = game.player) {
  return unitActiveSpellByName(unit, "Frozen Touch");
}

function maybeApplyFrozenTouch(target, weapon, landed) {
  if (!landed || !target || !weaponIsMelee(weapon)) return false;
  const spell = frozenTouchSpell(game.player);
  if (!spell) return false;
  const chance = Math.max(0, spellValue(spell, "freezeChance", 0, 2));
  if (Math.random() * 100 >= chance) return false;
  applyFreeze(target, Number(spell.duration ?? 4) || 4);
  grantRealmXP("Ethereal", spellLevel(spell));
  addLog(`<b>Frozen Touch</b> freezes <b>${escapeHtml(target.name || "the enemy")}</b>.`);
  return true;
}

function playerRageActive() {
  return Boolean(game.player.statMods?.some(mod => mod.name === "Rage"));
}

function rageMortalWeaponRealmXp(weapon) {
  return playerRageActive() && String(weapon?.dmgType || "Physical").toLowerCase() === "physical";
}

const realmXpOnCastSpellNames = new Set([
  "Godspeed",
  "Pacify",
  "Hypnotize",
  "Mortify",
  "Battle Cry",
  "Sacred Grove",
  "Invisibility",
  "Banish",
  "Clarity",
  "Spirit of Avia",
  "Faerie Fire",
  "Faerie Dust",
  "Dark Circle",
  "Faerie Circle"
]);

function grantSpellCastRealmXP(spell) {
  if (!spell || !realmXpOnCastSpellNames.has(spell.name)) return;
  grantRealmXP(spell.realm || "Mortal", spellLevel(spell));
}

function petDamageRealmXpRealm(unit) {
  if (!unit?.pet || !petMasterIsLocalPlayer(unit)) return null;
  const name = String(unit.name || "").toLowerCase();
  const type = String(unit.type || "").toLowerCase();
  const realm = normalizeRealm(unit.realm || "Mortal");
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

function weaponDamageRealmXpOptions(weapon, { offHand = false } = {}) {
  const realmXp = Boolean(
    rageMortalWeaponRealmXp(weapon)
    || (offHand && dualWieldSpell())
    || (activeSpellByName("Archery Mastery") && isBowWeapon(weapon))
    || (activeSpellByName("Axe Mastery") && weaponHasType(weapon, "axe"))
    || (activeSpellByName("Mace Mastery") && weaponHasType(weapon, "blunt"))
  );
  return realmXp ? { realmXp: true, realmXpRealm: "Mortal" } : { realmXp: false };
}

function daggerMasteryCanEarnXp(weapon = game.player.weapon) {
  return Boolean(activeSpellByName("Dagger Mastery") && isStabWeapon(weapon));
}

function maybeGrantDaggerMasteryCritXp(weapon, damage, crit, target = null) {
  const amount = Number(damage) || 0;
  if (!crit || amount <= 0 || !daggerMasteryCanEarnXp(weapon)) return false;
  grantRealmXP("Mortal", amount);
  window.SoulreaperQuestUI?.updateWeaponsMasteryObjective?.(weapon, target);
  return true;
}

function maybeGrantShieldMasteryBlockXp(blockedDamage) {
  const amount = Number(blockedDamage) || 0;
  if (amount <= 0 || !activeSpellByName("Shield Mastery") || !playerHasEquippedShield()) return false;
  grantRealmXP("Mortal", amount);
  window.SoulreaperQuestUI?.updateShieldMasteryObjective?.();
  return true;
}

function activeAuraProtectionBonus(unit) {
  const aura = activeSpellByName("Aura of Protection");
  if (!aura) return 0;
  if (unit !== game.player && distance(game.player, unit) > (aura.range || 0) * RANGE_UNIT) return 0;
  return spellValue(aura, "defenseBonus", 0, 0.25);
}

function activeWhiteStagRegenBonus(unit) {
  const aura = activeSpellByName("Song of White Stag");
  if (!aura) return 0;
  if (unit !== game.player && distance(game.player, unit) > (aura.range || 0) * RANGE_UNIT) return 0;
  return spellValue(aura, "regenBonus", 0, 0.5);
}

function activeWarDrumsAgilityBonus(unit) {
  const aura = activeSpellByName("War Drums");
  if (!aura) return 0;
  if (unit !== game.player && distance(game.player, unit) > (aura.range || 0) * RANGE_UNIT) return 0;
  if (unit !== game.player && !canTargetFriendlyUnit(unit)) return 0;
  return spellValue(aura, "agilityBonus", 0, 2.5);
}

function activeBloodthirstyAuraBonus(unit) {
  const aura = activeSpellByName("Bloodthirsty Aura");
  if (!aura) return 0;
  if (unit !== game.player && distance(game.player, unit) > (aura.range || 0) * RANGE_UNIT) return 0;
  if (unit !== game.player && !canTargetFriendlyUnit(unit)) return 0;
  return spellValue(aura, "focusBonus", 0, 1);
}

function activeEtherwindAuraBonus(unit, stat) {
  const aura = activeSpellByName("Etherwind Aura");
  if (!aura || (stat !== "INT" && stat !== "RESIST")) return 0;
  if (unit !== game.player && distance(game.player, unit) > (aura.range || 0) * RANGE_UNIT) return 0;
  return stat === "INT"
    ? spellValue(aura, "intelligenceBonus", 0, 0.5)
    : spellValue(aura, "resistBonus", 0, 0.5);
}

function healFriendlyCircleTarget(target, amount, sourceName) {
  const heal = roundUpTenth(Number(amount) || 0);
  if (!target || heal <= 0 || target.hp >= target.maxHp) return 0;
  if (target === game.player) {
    const before = game.player.hp;
    healPlayer(heal, sourceName);
    return Math.max(0, game.player.hp - before);
  }
  const healed = roundUpTenth(Math.min(heal, target.maxHp - target.hp));
  target.hp = roundUpTenth(target.hp + healed);
  spawnFloatingText(target, `+${formatNumber(healed)}`, "#fff6b6", "rgba(74, 60, 12, 0.8)");
  return healed;
}

function pestilentAuraTarget(enemy) {
  if (!enemy || enemy.hp <= 0 || enemy.pet || protectedFromPlayerEffects(enemy)) return false;
  return normalizeRealm(enemy.realm || "Mortal") !== "Umbral";
}

function updatePestilentAura(dt) {
  const spell = activeSpellByName("Pestilent Aura");
  if (!spell || game.mode === "multiplayer") {
    game.pestilentAuraTick = 0;
    return;
  }
  game.pestilentAuraTick = Math.max(0, (game.pestilentAuraTick || 0) - dt);
  if (game.pestilentAuraTick > 0) return;
  game.pestilentAuraTick = Number(spell.tick ?? 1) || 1;
  const range = (spell.range || 6) * RANGE_UNIT;
  const damage = spellDamageValue(spell, "damage", 0, 0.2);
  if (damage <= 0) return;
  for (const enemy of [...game.enemies]) {
    if (!pestilentAuraTarget(enemy)) continue;
    if (distance(game.player, enemy) > range + (enemy.radius || 0)) continue;
    applyDamage(enemy, damage, "Umbral", "Pestilent Aura", "Magical", { realmXp: true });
  }
}

function virulentPlagueSpreadTargetAllowed(source, target) {
  if (!target || target === source || target.hp <= 0 || protectedFromPlayerEffects(target)) return false;
  return !isFriendlyPlayerPet(target);
}

function markVirulentPlagueHostile(target) {
  if (!target || target.pet || target === game.player) return;
  setEnemyTarget(target, game.player, "plague");
}

function normalizeVirulentPlagueDots(unit) {
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

function applyVirulentPlagueDot(target, sourceDot = {}, options = {}) {
  if (!target || target.hp <= 0 || protectedFromPlayerEffects(target)) return false;
  target.dots = Array.isArray(target.dots) ? target.dots : [];
  const existing = normalizeVirulentPlagueDots(target);
  const tick = 1;
  const remaining = Math.max(0.1, Number(sourceDot.remaining ?? sourceDot.duration ?? 15) || 15);
  const damage = Math.max(0, Number(sourceDot.damage) || 0);
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
  if (options.spreadInfection) markVirulentPlagueHostile(target);
  return true;
}

function spreadVirulentPlagueFrom(source) {
  if (!source || source.hp <= 0 || !Array.isArray(source.dots)) return false;
  const sourceDot = source.dots.find(dot => dot.name === "Virulent Plague" && (dot.remaining ?? 0) > 0);
  if (!sourceDot) return false;
  const range = Math.max(0, Number(sourceDot.spreadRange ?? 3) || 3) * RANGE_UNIT;
  let spread = false;
  for (const enemy of [...game.enemies]) {
    if (!virulentPlagueSpreadTargetAllowed(source, enemy)) continue;
    if (distance(source, enemy) > range + (source.radius || 0) + (enemy.radius || 0)) continue;
    spread = applyVirulentPlagueDot(enemy, sourceDot, { spreadInfection: true }) || spread;
  }
  return spread;
}

function updateAuraRealmXP(dt) {
  game.auraRealmXpTimers ||= {};
  const activeAuras = game.player.spells.filter(spell => spell?.aura);
  const activeNames = new Set(activeAuras.map(spell => spell.name));
  for (const name of Object.keys(game.auraRealmXpTimers)) {
    if (!activeNames.has(name)) delete game.auraRealmXpTimers[name];
  }
  for (const spell of activeAuras) {
    game.auraRealmXpTimers[spell.name] = (game.auraRealmXpTimers[spell.name] ?? 20) - dt;
    while (game.auraRealmXpTimers[spell.name] <= 0) {
      game.auraRealmXpTimers[spell.name] += 20;
      grantRealmXP(spell.realm || "Mortal", spellLevel(spell));
    }
  }
}

function maceStunChance(weapon = game.player.weapon) {
  const stun = weapon?.effects?.stun;
  if (stun?.enabled === false) return 0;
  if (!stun && !weaponHasType(weapon, "blunt")) return 0;
  const baseChance = Number(stun?.chance ?? 5) || 0;
  const mastery = activeSpellByName("Mace Mastery");
  return baseChance + (mastery ? spellValue(mastery, "stunChanceBonus", 0, 1) : 0);
}

function weaponStunDuration(weapon = game.player.weapon) {
  return Math.max(0, Number(weapon?.effects?.stun?.duration ?? 2) || 0);
}

function dualWieldSpell() {
  return activeSpellByName("Dual Wield");
}

function dualWieldOffHandMultiplier() {
  const spell = dualWieldSpell();
  return spell ? spellValue(spell, "offHandDamagePercent", 8, 2) / 100 : 0;
}

function canDualWieldWeaponItem(item) {
  return Boolean(dualWieldSpell() && item?.weapon && !isTwoHandedWeapon(item.weapon) && !weaponHasType(item.weapon, "wand"));
}

function offHandWeapon() {
  const item = game.player.equippedItems?.["Off-Hand"];
  if (!canDualWieldWeaponItem(item)) return null;
  return { name: item.name, ...normalizeWeapon(item.weapon, item.name) };
}

function unitFlying(unit) {
  return Boolean(unit.flying || unit.statMods?.some(mod => mod.flying));
}

function unitIncorporeal(unit) {
  if (unit?.statMods?.some(mod => mod.corporeal)) return false;
  return Boolean(unit?.incorporeal || unit?.statMods?.some(mod => mod.incorporeal));
}

function unitInvisible(unit) {
  return Boolean(unit?.invisible || unit?.statMods?.some(mod => mod.invisible));
}

function unitSpeed(unit) {
  const puddleMultiplier = waterSpeedMultiplier(unit);
  const freezeMultiplier = unitFrozen(unit) ? 0.5 : 1;
  return (72 + effectiveStat(unit, "SPD") * 9) * puddleMultiplier * freezeMultiplier;
}

function waterSpeedMultiplier(unit) {
  if (!unitInPuddle(unit)) return 1;
  return unitAquatic(unit) ? 1.25 : 0.75;
}

function unitImmuneToLava(unit) {
  return normalizeRealm(unit?.realm || "Mortal") === "Infernal";
}

function unitInfernalResistanceOnly(unit) {
  const resistances = unit?.resistances || {};
  normalizeRealmMap(resistances);
  let value = Number(resistances.Infernal) || 0;
  for (const mod of unit?.statMods || []) {
    normalizeRealmMap(mod.addResistances);
    if (mod.addResistances?.Infernal !== undefined) value += Number(mod.addResistances.Infernal) || 0;
  }
  return Math.max(0, value);
}

function applyLavaContactDamage(unit, dt) {
  if (!unit || unitFlying(unit) || unitImmuneToLava(unit) || !pointInLavaFeature(unit.x, unit.y, Math.max(4, (unit.radius || 18) * 0.35))) {
    if (unit) {
      unit.lavaContactFloatTimer = 0;
      unit.lavaContactTickTimer = 0;
    }
    return false;
  }
  if (unit === game.player && game.godMode) {
    spawnFloatingText(game.player, "GODMODE", "#f0cf63", "rgba(0, 0, 0, 0.75)", 0.8);
    return false;
  }
  const maxHp = Math.max(1, Number(unit.maxHp) || Number(unit.hp) || 1);
  const rawTickDamage = maxHp * 0.10;
  const tickDamage = roundUpTenth(Math.max(0, rawTickDamage - unitInfernalResistanceOnly(unit)));
  let didDamage = false;
  unit.lavaContactTickTimer = (unit.lavaContactTickTimer || 0) - Math.max(0, dt);
  if (unit.lavaContactTickTimer <= 0) {
    unit.lavaContactTickTimer = 1;
    if (tickDamage > 0) {
      unit.hp -= tickDamage;
      didDamage = true;
    }
    spawnFloatingText(unit, tickDamage <= 0 ? "Resisted" : `-${formatNumber(tickDamage)}`, realmInfo.Infernal.color, "rgba(0, 0, 0, 0.75)");
    if (unit === game.player) addThrottledLog(tickDamage <= 0 ? "You resist the lava." : "Lava burns you.", unit, "combat", "lava-player", 2);
  }
  if (unit === game.player) {
    if (didDamage) game.lastPlayerDamageAt = performance.now();
    if (game.player.hp <= 0) handlePlayerDefeat();
    return true;
  }
  if (game.enemies.includes(unit) && unit.hp <= 0) {
    if (game.mode === "multiplayer") {
      const index = game.enemies.indexOf(unit);
      if (index >= 0) game.enemies.splice(index, 1);
      sendMultiplayerEnemyUpdate(unit, false);
    } else {
      killEnemy(unit, { killedByPlayer: false });
    }
  }
  return true;
}

function unitAttackInterval(unit) {
  const axeMastery = unit === game.player ? null : (unit.spells || []).find(spell => spell?.name === "Axe Mastery");
  const masteryDelay = axeMastery && weaponHasType(unit.weapon, "axe") ? spellLevel(axeMastery) * 3 : 0;
  const interval = Math.max(0.25, (((unit.weapon?.speed ?? 100) - masteryDelay - effectiveStat(unit, "AGL")) / 100));
  return unitFrozen(unit) ? interval * 2 : interval;
}

function projectileSpeed(spd) {
  return 160 + spd * 80;
}

function weaponProjectileTrailColor(weapon) {
  return realmInfo[normalizeRealm(weapon?.realm || "Mortal")]?.color || "#d9bd8c";
}

function attackDamageBonus(atk) {
  const value = Math.max(0, Number(atk) || 0);
  return value > 0 ? roundUpTenth(randomBetween(value * 0.5, value)) : 0;
}

function rollDamage(weapon, stats) {
  return roundUpTenth(rollDice(weapon.dice) + attackDamageBonus(stats.ATK || 0));
}

function enemyDamageAmount(enemy, amount) {
  return amount;
}

function getCamera(rect = canvas.getBoundingClientRect()) {
  if (!Number.isFinite(game.player.x) || !Number.isFinite(game.player.y)) applyPlayerStartFromMap();
  return {
    x: game.player.x - rect.width / 2,
    y: game.player.y - rect.height / 2,
    width: rect.width,
    height: rect.height
  };
}

function enemyAtWorldPoint(x, y) {
  return enemyAtWorldPointWithPadding(x, y, 0);
}

function enemyAtWorldPointWithPadding(x, y, extraPadding = 0) {
  const candidates = [...game.enemies].reverse();
  for (const enemy of candidates) {
    if (!enemy || enemy.hp <= 0) continue;
    const hitRadius = Math.max(enemy.radius + 12, enemySpriteSize(enemy) * 0.36) + Math.max(0, extraPadding || 0);
    if (Math.hypot(x - enemy.x, y - enemy.y) <= hitRadius) return enemy;
  }
  return null;
}

function playerAtWorldPoint(x, y) {
  return playerAtWorldPointWithPadding(x, y, 0);
}

function playerAtWorldPointWithPadding(x, y, extraPadding = 0) {
  const padding = Math.max(0, extraPadding || 0);
  if (Math.hypot(x - game.player.x, y - game.player.y) <= game.player.radius + 24 + padding) return game.player;
  if (game.mode === "multiplayer") {
    for (const peer of game.multiplayer.peers.values()) {
      if (Math.hypot(x - peer.x, y - peer.y) <= (peer.radius || game.player.radius) + 24 + padding) return peer;
    }
  }
  return null;
}

function targetKindForUnit(unit) {
  if (unit === game.player) return "player";
  if (game.enemies.includes(unit)) return "enemy";
  if (unit?.id && game.multiplayer?.peers?.get?.(unit.id) === unit) return "peer";
  return "";
}

function setSelectedTarget(unit) {
  const kind = targetKindForUnit(unit);
  if (!kind) return false;
  game.selectedTarget = {
    kind,
    id: kind === "player" ? "player" : unit.id,
    ref: unit
  };
  targetWindowSignature = "";
  renderTargetWindow();
  return true;
}

function clearSelectedTarget() {
  if (!game.selectedTarget) return;
  game.selectedTarget = null;
  targetWindowSignature = "";
  renderTargetWindow();
}

function selectedTargetUnit() {
  const target = game.selectedTarget;
  if (!target) return null;
  if (target.kind === "player") return game.player;
  if (target.kind === "peer") return game.multiplayer?.peers?.get?.(target.id) || null;
  if (target.kind === "enemy") {
    return game.enemies.find(enemy => enemy.id === target.id && enemy.hp > 0)
      || (game.enemies.includes(target.ref) && target.ref.hp > 0 ? target.ref : null);
  }
  return null;
}

function hoveredEnemy() {
  if (!game.mouseWorld) return null;
  const candidates = [...game.enemies].reverse();
  for (const enemy of candidates) {
    if (!enemy || enemy.hp <= 0) continue;
    const hitRadius = Math.max(enemy.radius + 12, enemySpriteSize(enemy) * 0.36);
    if (distance(game.mouseWorld, enemy) <= hitRadius) return enemy;
  }
  return null;
}

function hidePetCommandMenu() {
  game.activePetMenuId = null;
}

function updatePetTargetCursor() {
  canvas.classList.toggle("targeting-cursor", Boolean(game.pendingPetAttackId));
}

function commandPetAttack(pet, target) {
  if (!pet || !target || target === pet || !game.enemies.includes(target)) return false;
  if (unitFriendlyToPetMaster(pet, target)) {
    addLog(`<b>${pet.name}</b> will not attack a friendly target.`);
    return false;
  }
  pet.petCommand = "attack";
  pet.petTargetId = target.id;
  pet.hostileTarget = target;
  pet.guardX = undefined;
  pet.guardY = undefined;
  setEnemyTarget(pet, target, "pet-command");
  addLog(`<b>${pet.name}</b> attacks <b>${target.name}</b>.`, pet);
  if (game.mode === "multiplayer" && game.multiplayer.connected) {
    sendMultiplayerAction({ action: "pet:command", petId: pet.id, command: "attack", targetId: target.id });
  }
  return true;
}

function togglePetGuard(pet) {
  if (!pet) return;
  if (pet.petCommand === "guard") {
    pet.petCommand = "follow";
    pet.petTargetId = null;
    pet.guardX = undefined;
    pet.guardY = undefined;
    addLog(`<b>${pet.name}</b> follows you.`);
  } else {
    pet.petCommand = "guard";
    pet.petTargetId = null;
    pet.guardX = pet.x;
    pet.guardY = pet.y;
    clearEnemyCombat(pet);
    addLog(`<b>${pet.name}</b> guards this spot.`);
  }
  if (game.mode === "multiplayer" && game.multiplayer.connected) {
    sendMultiplayerAction({ action: "pet:command", petId: pet.id, command: pet.petCommand });
  }
}

function releasePet(pet) {
  if (!pet) return;
  pet.pet = false;
  pet.masterId = null;
  pet.masterName = null;
  pet.petCommand = null;
  pet.petTargetId = null;
  delete pet.petDuration;
  delete pet.petTimeRemaining;
  pet.noLoot = false;
  clearEnemyCombat(pet);
  addLog(`<b>${pet.name}</b> is released.`);
  if (game.mode === "multiplayer" && game.multiplayer.connected) {
    sendMultiplayerAction({ action: "pet:command", petId: pet.id, command: "release" });
  }
}

function ownedPets() {
  return game.enemies.filter(enemy => isOwnPet(enemy) && enemy.hp > 0);
}

function renderPetWindow() {
  if (!petWindowBody) return;
  const pets = ownedPets();
  const signature = pets.map(pet => {
    ensurePetLifetime(pet);
    const targetName = game.enemies.find(enemy => enemy.id === pet.petTargetId)?.name || "";
    const remaining = Math.ceil(Number(pet.petTimeRemaining) || 0);
    return [pet.id, pet.name, pet.hp, pet.maxHp, pet.petCommand, pet.petTargetId || "", targetName, remaining].join("|");
  }).join(";");
  if (signature === petWindowSignature) return;
  petWindowSignature = signature;
  if (!pets.length) {
    updateHtmlIfChanged(petWindowBody, `<div class="pet-window-empty">No pets bound.</div>`);
    return;
  }
  updateHtmlIfChanged(petWindowBody, pets.map(pet => {
    const hp = Math.max(0, Number(pet.hp) || 0);
    const maxHp = Math.max(1, Number(pet.maxHp) || hp || 1);
    const duration = Math.max(0.1, Number(pet.petDuration) || PET_DURATION_SECONDS);
    const remaining = Math.max(0, Number(pet.petTimeRemaining ?? duration) || 0);
    const target = game.enemies.find(enemy => enemy.id === pet.petTargetId);
    const command = pet.petCommand === "guard" ? "Guarding"
      : pet.petCommand === "attack" && target ? `Attacking ${target.name}`
      : "Following";
    const guardLabel = pet.petCommand === "guard" ? "Follow" : "Guard";
    return `
      <div class="pet-window-card" data-pet-id="${escapeHtml(pet.id)}">
        <div class="pet-window-header-row">
          <strong>${escapeHtml(pet.name || "Pet")}</strong>
          <span>${escapeHtml(command)}</span>
        </div>
        <div class="pet-window-meter hp"><i style="width:${Math.max(0, Math.min(100, (hp / maxHp) * 100))}%"></i></div>
        <div class="pet-window-meter time"><i style="width:${Math.max(0, Math.min(100, (remaining / duration) * 100))}%"></i></div>
        <div class="pet-window-meta">${formatNumber(Math.ceil(remaining))}s</div>
        <div class="pet-window-actions">
          <button type="button" data-pet-window-action="attack" data-pet-id="${escapeHtml(pet.id)}">Attack</button>
          <button type="button" data-pet-window-action="guard" data-pet-id="${escapeHtml(pet.id)}">${guardLabel}</button>
          <button type="button" data-pet-window-action="release" data-pet-id="${escapeHtml(pet.id)}">Release</button>
        </div>
      </div>
    `;
  }).join(""));
}

function handlePetWindowClick(event) {
  const button = event.target.closest("[data-pet-window-action]");
  if (!button) return;
  const pet = game.enemies.find(enemy => enemy.id === button.dataset.petId && isOwnPet(enemy));
  if (!pet) {
    addLog("That pet is no longer bound.");
    renderPetWindow();
    return;
  }
  const action = button.dataset.petWindowAction;
  if (action === "attack") {
    const selected = selectedTargetUnit();
    if (selected && commandPetAttack(pet, selected)) {
      game.pendingPetAttackId = null;
      updatePetTargetCursor();
    } else {
      game.pendingPetAttackId = pet.id;
      updatePetTargetCursor();
      addLog(`Choose a target for <b>${pet.name}</b>.`);
    }
  } else if (action === "guard") {
    togglePetGuard(pet);
  } else if (action === "release") {
    releasePet(pet);
  }
  petWindowSignature = "";
  renderPetWindow();
}

function tameBeast(beast, options = {}) {
  if (!beast || beast.type !== "Beast" || beast.pet) return false;
  clearEnemyCombat(beast);
  beast.pet = true;
  beast.masterId = options.masterId || localPlayerId();
  beast.masterName = options.masterName || game.player.name || "Soulreaper";
  beast.petCommand = "follow";
  beast.petTargetId = null;
  beast.petDuration = Math.max(1, Number(options.duration) || PET_DURATION_SECONDS);
  beast.petTimeRemaining = beast.petDuration;
  beast.noLoot = true;
  beast.hostileToPlayer = false;
  beast.hostileTarget = null;
  beast.targetPlayerId = null;
  beast.hostileToPlayerReason = null;
  beast.pacified = 0;
  beast.leashState = "idle";
  delete beast.triggerX;
  delete beast.triggerY;
  spawnRaiseSkeletonSmoke(beast.x, beast.y, "Sylvan");
  spawnFloatingText(beast, "TAMED", realmInfo.Sylvan.color, "rgba(0, 0, 0, 0.75)");
  addLog(`<b>${beast.name}</b> has been tamed.`, beast);
  return true;
}

function unitTypeIsDaemon(unit) {
  const type = String(unit?.type || "").trim().toLowerCase();
  return type === "demon" || type === "daemon" || type === "demons" || type === "daemons";
}

function dominateDaemon(daemon, options = {}) {
  if (!daemon || !unitTypeIsDaemon(daemon) || daemon.pet) return false;
  clearEnemyCombat(daemon);
  daemon.pet = true;
  daemon.masterId = options.masterId || localPlayerId();
  daemon.masterName = options.masterName || game.player.name || "Soulreaper";
  daemon.petCommand = "follow";
  daemon.petTargetId = null;
  daemon.petDuration = Math.max(1, Number(options.duration) || PET_DURATION_SECONDS);
  daemon.petTimeRemaining = daemon.petDuration;
  daemon.noLoot = true;
  daemon.hostileToPlayer = false;
  daemon.hostileTarget = null;
  daemon.targetPlayerId = null;
  daemon.hostileToPlayerReason = null;
  daemon.pacified = 0;
  daemon.leashState = "idle";
  delete daemon.triggerX;
  delete daemon.triggerY;
  spawnRaiseSkeletonSmoke(daemon.x, daemon.y, "Infernal");
  spawnFloatingText(daemon, "DOMINATED", realmInfo.Infernal.color, "rgba(0, 0, 0, 0.75)");
  addLog(`<b>${daemon.name}</b> has been dominated.`, daemon);
  return true;
}

function applyAcceptedPetState(message) {
  const enemy = game.enemies.find(candidate => candidate.id === message.enemyId)
    || game.enemies.find(candidate => candidate.name === message.enemyName && unitTypeIsDaemon(candidate));
  if (!enemy) return false;
  const pet = message.pet && typeof message.pet === "object" ? message.pet : {};
  clearEnemyCombat(enemy);
  Object.assign(enemy, {
    ...pet,
    id: pet.id || enemy.id,
    name: pet.name || enemy.name,
    type: pet.type || message.enemyType || enemy.type,
    pet: true,
    masterId: pet.masterId || game.multiplayer?.id || "player",
    masterName: pet.masterName || game.player.name || "Soulreaper",
    petCommand: pet.petCommand || "follow",
    petTargetId: null,
    hostileToPlayer: false,
    hostileTarget: null,
    hostileTargetId: null,
    targetPlayerId: null,
    hostileToPlayerReason: null,
    leashState: "idle"
  });
  enemy.noLoot = true;
  enemy.pacified = 0;
  delete enemy.triggerX;
  delete enemy.triggerY;
  spawnFloatingText(enemy, message.spellName === "Unholy Dominion" ? "DOMINATED" : "TAMED", realmInfo[enemy.realm]?.color || "#d9b95f", "rgba(0, 0, 0, 0.75)");
  return true;
}

function whiteStagInTownHall() {
  const townHall = game.map?.houses?.find(house => house.id === "gandersville-town-hall");
  if (!townHall) return false;
  return game.enemies.some(enemy => enemy.name === "White Stag"
    && isOwnPet(enemy)
    && pointInsideHouse(townHall, enemy.x, enemy.y, enemy.radius));
}

function handleArenaClick(event) {
  if (!game.running) return;
  if (hasOpenModal() && !game.pendingPetAttackId) return;
  const rect = canvas.getBoundingClientRect();
  if (handleMapOverlayClick(event, rect)) return;
  const camera = getCamera(rect);
  const worldX = event.clientX - rect.left + camera.x;
  const worldY = event.clientY - rect.top + camera.y;
  if (game.pendingPetAttackId) {
    const pet = game.enemies.find(enemy => enemy.id === game.pendingPetAttackId && isOwnPet(enemy));
    const target = enemyAtWorldPoint(worldX, worldY);
    game.pendingPetAttackId = null;
    updatePetTargetCursor();
    hidePetCommandMenu();
    if (!pet || !target || target === pet) {
      addLog("Pet attack canceled.");
      return;
    }
    commandPetAttack(pet, target);
    return;
  }
  if (game.pendingSpellTarget !== null) {
    castTargetedSpell(worldX, worldY);
    return;
  }
  const clickedUnit = enemyAtWorldPoint(worldX, worldY);
  const clickedTarget = clickedUnit || playerAtWorldPoint(worldX, worldY);
  if (clickedTarget) setSelectedTarget(clickedTarget);
  hidePetCommandMenu();
  if (!game.player.weapon) return;
  if ((game.player.stunned || 0) > 0) return;
  if ((game.player.mortified || 0) > 0) return;
  if (game.player.attackTimer > 0) return;
  const enemy = clickedUnit;
  if (!enemy) return;
  if (isOwnPet(enemy)) return;
  const weaponRange = game.player.weapon.range * RANGE_UNIT + enemy.radius + game.player.radius;
  if (distance(game.player, enemy) > weaponRange) return;
  if (!hasLineOfSight(game.player, enemy)) {
    addLog("Your line of sight is blocked.");
    return;
  }
  activateWeapon(enemy);
}

async function castTargetedSpell(x, y) {
  const index = game.pendingSpellTarget;
  const spell = game.player.spells[index];
  game.pendingSpellTarget = null;
  if (!spell || playerSpellTimer(spell) > 0) return;
  const mode = spellTargetMode(spell);
  if (mode === "point") {
    const inRange = distance(game.player, { x, y }) <= (spell.range || 0) * RANGE_UNIT;
    if (!inRange) {
      addLog(`<b>${spell.name}</b> is out of range.`);
      return;
    }
    if (!hasLineOfSight(game.player, { x, y })) {
      addLog(`<b>${spell.name}</b> needs line of sight.`);
      return;
    }
    if (await spell.castAt?.(x, y)) {
      grantSpellCastRealmXP(spell);
      playSpellSound(spell);
      setSpellOnCooldown(spell);
      spellHudSignature = "";
    }
    return;
  }
  const target = mode === "friendly-player"
    ? playerAtWorldPointWithPadding(x, y, SPELL_TARGET_LOCK_PADDING)
    : mode === "friendly-unit"
      ? enemyAtWorldPointWithPadding(x, y, SPELL_TARGET_LOCK_PADDING) || playerAtWorldPointWithPadding(x, y, SPELL_TARGET_LOCK_PADDING)
    : mode === "unit"
      ? enemyAtWorldPointWithPadding(x, y, SPELL_TARGET_LOCK_PADDING) || playerAtWorldPointWithPadding(x, y, SPELL_TARGET_LOCK_PADDING)
      : enemyAtWorldPointWithPadding(x, y, SPELL_TARGET_LOCK_PADDING);
  if (target) setSelectedTarget(target);
  castSelectedSpellOnTarget(spell, target);
}

function castSelectedSpellOnTarget(spell, target) {
  if (!spell || playerSpellTimer(spell) > 0) return;
  if (spellMemorizing(spell) > 0) {
    addLog(`<b>${spell.name}</b> is still being memorized.`);
    spellHudSignature = "";
    return;
  }
  if ((game.player.stunned || 0) > 0) {
    addLog("You are stunned.");
    spellHudSignature = "";
    return;
  }
  if ((game.player.mortified || 0) > 0) {
    addLog("You are mortified.");
    spellHudSignature = "";
    return;
  }
  const mode = spellTargetMode(spell);
  if (mode === "point") {
    addLog(`<b>${spell.name}</b> needs a ground target.`);
    spellHudSignature = "";
    return;
  }
  if (!target) {
    addLog(`<b>${spell.name}</b> needs a target.`);
    spellHudSignature = "";
    return;
  }
  if (mode === "enemy" && !game.enemies.includes(target)) {
    addLog(`<b>${spell.name}</b> needs an enemy target.`);
    spellHudSignature = "";
    return;
  }
  if (mode === "friendly-player" && target !== game.player && game.enemies.includes(target)) {
    addLog(`<b>${spell.name}</b> needs a friendly player target.`);
    spellHudSignature = "";
    return;
  }
  if (game.enemies.includes(target) && isOwnPet(target) && mode !== "friendly-unit") {
    addLog("You cannot attack your own Pet.");
    spellHudSignature = "";
    return;
  }
  const targetIsFriendlyPlayer = target === game.player || !game.enemies.includes(target);
  if (mode === "friendly-player" || mode === "friendly-unit" || (mode === "unit" && targetIsFriendlyPlayer)) {
    const failure = friendlySpellTargetFailure(spell, target);
    if (failure) {
      addLog(failure);
      spellHudSignature = "";
      return;
    }
  }
  const maxRange = spell.range ? spell.range * RANGE_UNIT + (target.radius || game.player.radius) + game.player.radius : Infinity;
  if (distance(game.player, target) > maxRange) {
    addLog(`<b>${spell.name}</b> is out of range.`);
    spellHudSignature = "";
    return;
  }
  if (!hasLineOfSight(game.player, target)) {
    addLog(`<b>${spell.name}</b> needs line of sight.`);
    spellHudSignature = "";
    return;
  }
  if (spell.cast?.(game, target)) {
    window.SoulreaperQuestUI?.updateCrowdControlObjective?.(spell.name, target);
    window.SoulreaperQuestUI?.updateHollyhockChlorophyllTellursa?.(spell.name, target);
    grantSpellCastRealmXP(spell);
    playSpellSound(spell);
    setSpellOnCooldown(spell);
    spellHudSignature = "";
  } else {
    addLog(`<b>${spell.name}</b> fizzles.`);
    spellHudSignature = "";
  }
}

function selectTargetedSpell(index) {
  const spell = game.player.spells[index];
  if (!spell || spell.passive) return;
  if ((game.player.mortified || 0) > 0) {
    addLog("You are mortified.");
    return;
  }
  if (playerSpellTimer(spell) > 0) {
    addLog(`<b>${spell.name}</b> is still cooling down.`);
    return;
  }
  if (spellMemorizing(spell) > 0) {
    addLog(`<b>${spell.name}</b> is still being memorized.`);
    return;
  }
  const mode = spellTargetMode(spell);
  if (mode === "none" && spell.manualCast) {
    if (spell.cast(game)) {
      grantSpellCastRealmXP(spell);
      playSpellSound(spell);
      setSpellOnCooldown(spell);
      spellHudSignature = "";
    }
    return;
  }
  if (mode === "none") return;
  const selected = mode === "point" ? null : selectedTargetUnit();
  if (selected) {
    game.pendingSpellTarget = null;
    castSelectedSpellOnTarget(spell, selected);
    return;
  }
  game.pendingSpellTarget = index;
  addLog(`Choose where to cast <b>${spell.name}</b>.`);
}

function activateSpellSlot(index) {
  if (!Number.isInteger(index) || index < 0 || index >= game.player.spellSlotsActive) return;
  const entry = preparedActiveSpellEntryBySlot(index);
  if (!entry) return;
  selectTargetedSpell(entry.index);
}

function mitigationStatForDamageType(dmgType) {
  return dmgType === "Physical" ? "DEF" : "RESIST";
}

function realmResist(target, realm) {
  realm = normalizeRealm(realm);
  const resistances = target.resistances || {};
  normalizeRealmMap(resistances);
  let value = (resistances[realm] || 0) + effectiveStat(target, "RESIST");
  for (const mod of target.statMods || []) {
    normalizeRealmMap(mod.addResistances);
    if (mod.addResistances?.[realm] !== undefined) value += mod.addResistances[realm];
  }
  return Math.max(0, value);
}

function mitigatedDamage(target, amount, dmgType, realm = "Mortal") {
  realm = normalizeRealm(realm);
  const mitigation = dmgType === "Status"
    ? 0
    : dmgType === "Physical"
    ? effectiveStat(target, "DEF")
    : realmResist(target, realm);
  return roundUpTenth(Math.max(0, amount - mitigation));
}

function applyDamage(target, amount, realm, sourceName, dmgType = "Magical", options = {}) {
  realm = normalizeRealm(realm);
  const targetWasEnemy = game.enemies.includes(target);
  if (options.source?.pet && unitFriendlyToPetMaster(options.source, target)) {
    clearEnemyCombat(options.source);
    return false;
  }
  if (target?.pet && options.source && unitFriendlyToPetMaster(target, options.source)) {
    clearEnemyCombat(target);
    return false;
  }
  if (amount > 0) clearPacify(target);
  if (options.source && amount > 0) removeInvisibility(options.source);
  if (options.source && unitIncorporeal(options.source) && dmgType === "Physical") {
    spawnFloatingText(options.source, "INCORPOREAL", "#b8c7d9");
    if (sourceName) addLog(`${sourceName} cannot deal Physical damage while incorporeal.`, options.source);
    return false;
  }
  if (options.killedByPlayer !== false && protectedFromPlayerEffects(target)) {
    spawnFloatingText(target, "Protected", "#68a85e", "rgba(0, 0, 0, 0.75)");
    return false;
  }
  if (options.killedByPlayer !== false && game.enemies.includes(target)) provokeEnemy(target);
  if (unitIncorporeal(target) && dmgType === "Physical") {
    spawnFloatingText(target, "IMMUNE", "#b8c7d9");
    if (sourceName) addLog(`${sourceName} cannot harm incorporeal <b>${target.name}</b>.`, target);
    return false;
  }
  if (target.stats && Math.random() * 100 < effectiveStat(target, "BLOCK")) {
    spawnFloatingText(target, "*blocked*", "#ffffff", "rgba(0, 0, 0, 0.85)");
    if (sourceName) addLog(`<b>${target.name}</b> blocks ${sourceName}.`, target);
    return false;
  }
  const mult = realmMultiplier(realm, target.realm);
  let damage = mitigatedDamage(target, amount * mult, dmgType, realm);
  const postMitigationDamageMultiplier = Number(options.postMitigationDamageMultiplier);
  if (Number.isFinite(postMitigationDamageMultiplier) && postMitigationDamageMultiplier !== 1) {
    damage = roundUpTenth(Math.max(0, damage * Math.max(0, postMitigationDamageMultiplier)));
  }
  damage = absorbShieldDamage(target, damage, dmgType);
  target.hp -= damage;
  const weaponRealmXp = options.source === game.player
    && options.sourceKind === "weapon"
    && weaponDamageRealmXpOptions(options.sourceWeapon || game.player.weapon, { offHand: Boolean(options.offHand) }).realmXp;
  const rageRealmXp = options.source === game.player
    && playerRageActive()
    && String(dmgType || "Physical").toLowerCase() === "physical";
  if ((options.realmXp || rageRealmXp || weaponRealmXp) && damage > 0) {
    grantRealmXP(options.realmXpRealm || (rageRealmXp || weaponRealmXp ? "Mortal" : realm), damage);
  }
  const petRealmXpRealm = petDamageRealmXpRealm(options.source);
  if (!options.realmXp && !rageRealmXp && petRealmXpRealm && damage > 0) grantRealmXP(petRealmXpRealm, damage);
  if (damage > 0) window.SoulreaperQuestUI?.updateTreantDamageObjective?.(options.source, target);
  spawnFloatingText(
    target,
    damage <= 0 ? "Resisted" : `-${formatNumber(damage)}`,
    options.critical && damage > 0 ? "#fff2d8" : realmInfo[realm]?.color || "#f04f48",
    options.critical && damage > 0 ? "#000000" : realm === "Umbral" ? "#d9c7ff" : "rgba(0, 0, 0, 0.75)",
    1.15,
    { style: options.critical && damage > 0 ? "critical" : "" }
  );
  const bonus = mult > 1 ? " with realm advantage" : "";
  if (sourceName) addLog(`${sourceName} deals <b>${formatNumber(damage)}</b> ${realm} damage to <b>${target.name}</b>${bonus}.`, target);
  if (target.hp <= 0) {
    if (targetWasEnemy && options.killedByPlayer !== false) window.SoulreaperQuestUI?.updateHollyhockKappaDefeated?.(target);
    if (game.mode === "multiplayer" && targetWasEnemy) {
      const index = game.enemies.indexOf(target);
      if (index >= 0) game.enemies.splice(index, 1);
      sendMultiplayerEnemyUpdate(target, false);
    } else {
      killEnemy(target, { killedByPlayer: options.killedByPlayer !== false });
    }
  } else if (game.mode === "multiplayer" && targetWasEnemy) {
    sendMultiplayerEnemyUpdate(target, true);
  }
  return damage > 0;
}

function playerRealmDamageReduction(realm) {
  realm = normalizeRealm(realm);
  return Object.values(game.player.equippedItems).reduce((total, item) => (
    normalizeRealmMap(item.effects?.realmDamageReduction),
    total + (item.effects?.realmDamageReduction?.[realm] || 0)
  ), 0);
}

function reducePlayerDamage(amount, realm, dmgType = "Magical") {
  realm = normalizeRealm(realm);
  const realmReduction = Math.min(0.9, playerRealmDamageReduction(realm));
  const reduced = mitigatedDamage(game.player, amount * (1 - realmReduction), dmgType, realm);
  return dmgType === "Physical" && amount > 0 ? roundUpTenth(Math.max(1, reduced)) : reduced;
}

function weaponAmmoName(weapon) {
  if (!weapon) return null;
  return weapon.ammo || (weapon.category === "Bow" ? "Bronze Arrow" : null);
}

function consumePlayerAmmoForWeapon(weapon) {
  const ammoName = weaponAmmoName(weapon);
  if (!ammoName) return true;
  if (inventoryItemCount(ammoName) <= 0) {
    addLog(`<b>${weapon.name}</b> needs <b>${ammoName}s</b>.`);
    return false;
  }
  removeInventoryStack(ammoName, 1);
  markUIDirty();
  return true;
}

function maybeDropProjectileAmmo(projectile, target) {
  if (!projectile?.ammoDrop || Math.random() >= 0.5) return;
  const item = cloneItem(projectile.ammoDrop);
  if (!item) return;
  dropGroundItem(item, (target.x || projectile.x) + randomBetween(-8, 8), (target.y || projectile.y) + randomBetween(-8, 8));
}

function damagePlayer(enemy, amount, realm, sourceName, dmgType = "Magical", options = {}) {
  realm = normalizeRealm(realm);
  if (game.godMode) {
    if (amount > 0) spawnFloatingText(game.player, "GODMODE", "#f0cf63", "rgba(0, 0, 0, 0.75)", 0.8);
    return false;
  }
  if (enemy?.pet && unitFriendlyToPetMaster(enemy, game.player)) {
    clearEnemyCombat(enemy);
    return false;
  }
  if (amount > 0) {
    clearPacify(game.player);
    removeInvisibility(enemy);
  }
  if (unitIncorporeal(enemy) && dmgType === "Physical") {
    spawnFloatingText(enemy, "INCORPOREAL", "#b8c7d9");
    return false;
  }
  if (unitIncorporeal(game.player) && dmgType === "Physical") {
    spawnFloatingText(game.player, "IMMUNE", "#b8c7d9");
    addLog(`${sourceName} cannot harm your incorporeal form.`);
    return false;
  }
  if (Math.random() * 100 < effectiveStat(game.player, "BLOCK")) {
    const blockedDamage = reducePlayerDamage(amount, realm, dmgType);
    if (playerHasEquippedShield()) window.SoulreaperQuestUI?.updateShieldMasteryObjective?.();
    maybeGrantShieldMasteryBlockXp(blockedDamage);
    spawnFloatingText(game.player, "*blocked*", "#ffffff", "rgba(0, 0, 0, 0.85)");
    addLog(`Blocked <b>${enemy.name}</b>.`);
    return false;
  }
  const reduced = absorbShieldDamage(game.player, reducePlayerDamage(amount, realm, dmgType), dmgType);
  game.player.hp -= reduced;
  game.lastPlayerDamageAt = performance.now();
  spawnFloatingText(
    game.player,
    reduced <= 0 ? "Resisted" : `-${formatNumber(reduced)}`,
    options.critical && reduced > 0 ? "#fff2d8" : realmInfo[realm]?.color || "#f04f48",
    options.critical && reduced > 0 ? "#000000" : realm === "Umbral" ? "#d9c7ff" : "rgba(0, 0, 0, 0.75)",
    1.15,
    { style: options.critical && reduced > 0 ? "critical" : "" }
  );
  game.shake = 0.18;
  addLog(`${sourceName} hits you for ${playerDamageAmountHtml(reduced)} ${realm} damage.`);
  if (game.player.hp <= 0) handlePlayerDefeat();
  return true;
}

function playerUnderAttackForAutocast() {
  if (performance.now() - (game.lastPlayerDamageAt || 0) <= 5000) return true;
  return game.enemies.some(enemy => {
    if (!enemy || enemy.hp <= 0 || enemy.stunned > 0 || enemy.pacified > 0) return false;
    if (!enemyHostileToPlayer(enemy) && enemy.targetPlayerId !== game.multiplayer.id) return false;
    const range = Math.max((enemy.aggroRange || HOSTILE_TRIGGER_RANGE) * RANGE_UNIT, 8 * RANGE_UNIT);
    return distance(enemy, game.player) <= range && hasLineOfSight(enemy, game.player);
  });
}

function applyStatusDamageToPlayer(amount, realm, sourceName, dmgType = "Magical") {
  realm = normalizeRealm(realm);
  const damage = absorbShieldDamage(game.player, reducePlayerDamage(amount, realm, dmgType), dmgType);
  game.player.hp -= damage;
  spawnFloatingText(
    game.player,
    damage <= 0 ? "Resisted" : `-${formatNumber(damage)}`,
    realmInfo[realm]?.color || "#f04f48",
    realm === "Umbral" ? "#d9c7ff" : "rgba(0, 0, 0, 0.75)"
  );
  addLog(`${sourceName} deals ${playerDamageAmountHtml(damage)} ${realm} damage to you.`);
  if (game.player.hp <= 0) handlePlayerDefeat();
}

function handlePlayerDefeat() {
  resetPlayerProvokedAggroOnDeath();
  window.SoulreaperQuestUI?.handleHollyhockPlayerDeath?.();
  playSoundEffect("game-over");
  recordPlayerDeathMarker();
  dropPlayerDeathLoot();
  if (game.mode === "multiplayer") {
    respawnMultiplayerPlayer();
    return;
  }
  if (game.mode === "dev") {
    game.player.x = game.startPoint?.x ?? initialPlayerState.x;
    game.player.y = game.startPoint?.y ?? initialPlayerState.y;
    game.player.hp = game.player.maxHp;
    game.player.dots = [];
    game.player.rooted = 0;
    spawnFloatingText(game.player, "DEV RETURN", "#f0cf63");
    addLog("Dev Mode returns your Soulreaper to the starting place.");
    markUIDirty();
    return;
  }
  game.player.hp = 0;
  game.running = false;
  addLog("<b>Your Soulreaper falls.</b>");
  deathScreen.classList.remove("hidden");
  syncPointerPause();
}

function updateRegeneration(unit, dt) {
  const regen = effectiveStat(unit, "REGEN");
  if (regen <= 0 || unit.hp <= 0 || unit.hp >= unit.maxHp) {
    unit.regenTimer = 5;
    return;
  }
  unit.regenTimer -= dt;
  if (unit.regenTimer > 0) return;
  unit.regenTimer += 5;
  const healed = roundUpTenth(Math.min(regen, unit.maxHp - unit.hp));
  unit.hp += healed;
  spawnFloatingText(unit, `+${formatNumber(healed)}`, "#61d66f");
}

function killEnemy(enemy, { killedByPlayer = true } = {}) {
  const index = game.enemies.indexOf(enemy);
  if (index >= 0) game.enemies.splice(index, 1);
  if ((enemy.elite || enemy.boss) && !enemy.noRespawn) scheduleEliteRespawn(enemy);
  if (!killedByPlayer) {
    addLog(`<b>LVL ${enemy.lvl} ${enemy.name}</b> is slain.`, enemy);
    return;
  }
  updateFactionStandingForKill(enemy);
  if (enemy.noLoot) {
    addLog(`<b>LVL ${enemy.lvl} ${enemy.name}</b> is slain.`, enemy);
    return;
  }
  updateVirtueForKill(enemy);
  window.SoulreaperQuestUI?.updateKillQuestObjectives?.(enemy);
  window.SoulreaperQuestUI?.updateHollyhockKappaDefeated?.(enemy);
  maybeDropSharleneParcel(enemy);
  maybeDropNapaeaSkull(enemy);
  rollLoot(enemy);
  const xp = killXpForEnemy(enemy);
  const gold = rollGoldDrop(enemy.gold);
  dropGold(gold, enemy.x + randomBetween(-12, 12), enemy.y + randomBetween(-12, 12));
  grantXP(xp);
  addLog(`<b>LVL ${enemy.lvl} ${enemy.name}</b> is reaped. Gained <b>${xp} XP</b>${gold ? ` and dropped <b>${gold} gold</b>` : ""}.`, enemy);
}

function updateFactionStandingForKill(enemy) {
  const killedFaction = unitFactionId(enemy);
  const changes = factionStandingChangesForKilledFaction(killedFaction);
  applyFactionStandingChanges(changes);
  return changes;
}

function factionStandingChangesForKilledFaction(killedFaction) {
  killedFaction = factionId(killedFaction);
  if (!killedFaction || !factionConfigById.has(killedFaction)) return {};
  const changes = { [killedFaction]: -2 };
  for (const faction of devFactionConfigs) {
    if (faction.enemyFactionIds.includes(killedFaction)) {
      changes[faction.id] = (changes[faction.id] || 0) + 1;
    }
  }
  return changes;
}

function factionStandingChangesForKilledName(enemyName) {
  return factionStandingChangesForKilledFaction(inferredFactionForUnit({ name: enemyName }));
}

function applyFactionStandingChanges(changes = {}) {
  const standings = playerFactionStandings();
  const lines = [];
  for (const [rawId, rawDelta] of Object.entries(changes || {})) {
    const id = factionId(rawId);
    const delta = Number(rawDelta) || 0;
    if (!id || !delta || !factionConfigById.has(id)) continue;
    standings[id] = (Number(standings[id]) || 0) + delta;
    const faction = factionConfigById.get(id);
    lines.push(`${faction.name} ${delta > 0 ? "+" : ""}${delta}`);
  }
  if (lines.length) {
    addLog(`Faction standing: ${lines.map(escapeHtml).join(", ")}.`);
    markUIDirty();
    if (game.mode === "multiplayer") sendMultiplayerUpdate(true);
  }
}

function killXpForEnemy(enemy) {
  const baseXp = Math.max(0, Math.floor(Number(enemy?.stats?.HP) || 0));
  const enemyLevel = Number(enemy?.lvl) || 1;
  const playerLevel = Number(game.player.level) || 1;
  return playerLevel - enemyLevel >= 5 ? Math.floor(baseXp * 0.5) : baseXp;
}

function rollGoldDrop(gold) {
  if (typeof gold === "number") return Math.max(0, Math.floor(gold));
  if (typeof gold === "string") {
    const numeric = Number(gold);
    if (Number.isFinite(numeric)) return Math.max(0, Math.floor(numeric));
    return rollDice(gold);
  }
  return randomInt(gold?.min || 0, gold?.max || 0);
}

function enemyRespawnKey(enemy) {
  if (!enemy) return "";
  if (enemy.respawnKey) return enemy.respawnKey;
  const template = enemy.templateName || enemy.name || "enemy";
  const name = enemy.name || template;
  const x = Math.round(enemy.homeX ?? enemy.x ?? 0);
  const y = Math.round(enemy.homeY ?? enemy.y ?? 0);
  return `${template}:${name}:${x}:${y}`;
}

function eliteRespawnRecordKey(respawn) {
  if (!respawn) return "";
  if (respawn.respawnKey) return respawn.respawnKey;
  const template = respawn.template || respawn.enemy?.templateName || respawn.enemy?.name || respawn.name || "enemy";
  const name = respawn.name || respawn.enemy?.name || template;
  const x = Math.round(respawn.x ?? respawn.enemy?.homeX ?? respawn.enemy?.x ?? 0);
  const y = Math.round(respawn.y ?? respawn.enemy?.homeY ?? respawn.enemy?.y ?? 0);
  return `${template}:${name}:${x}:${y}`;
}

function scheduleEliteRespawn(enemy) {
  if (enemy?.noRespawn) return;
  const respawnKey = enemyRespawnKey(enemy);
  if (respawnKey && game.eliteRespawns.some(respawn => eliteRespawnRecordKey(respawn) === respawnKey)) return;
  game.eliteRespawns.push({
    respawnKey,
    remaining: enemy.boss ? BOSS_RESPAWN_SECONDS : ELITE_RESPAWN_SECONDS,
    name: enemy.name,
    template: enemy.templateName || enemy.name,
    lvl: enemy.lvl,
    elite: Boolean(enemy.elite),
    boss: Boolean(enemy.boss),
    x: enemy.homeX ?? enemy.x,
    y: enemy.homeY ?? enemy.y,
    leashX: enemy.leashX,
    leashY: enemy.leashY,
    leashRadius: enemy.leashRadius,
    aggroRange: enemy.aggroRange,
    gold: structuredClone(enemy.gold),
    guaranteedDrops: [...(enemy.guaranteedDrops || [])],
    noWander: Boolean(enemy.noWander),
    friendlyToGoodPlayer: enemy.friendlyToGoodPlayer,
    friendlyToNonEvilPlayer: enemy.friendlyToNonEvilPlayer,
    shopkeeper: enemy.shopkeeper,
    inventory: enemy.inventory ? enemy.inventory.map(item => structuredClone(item)) : undefined,
    consumables: enemy.consumables ? enemy.consumables.map(item => structuredClone(item)) : undefined,
    misc: enemy.misc ? enemy.misc.map(item => structuredClone(item)) : undefined,
    scrolls: enemy.scrolls ? enemy.scrolls.map(item => structuredClone(item)) : undefined,
    questGiver: enemy.questGiver,
    trainer: enemy.trainer
  });
}

function updateEliteRespawns(dt) {
  for (const respawn of [...game.eliteRespawns]) {
    respawn.remaining -= dt;
    if (respawn.remaining > 0) continue;
    const template = allMonsterTemplates.find(candidate => candidate.name === respawn.template);
    if (template) {
      game.enemies.push(makeEnemy(template, respawn.lvl, respawn.x, respawn.y, {
        name: respawn.name,
        respawnKey: respawn.respawnKey,
        elite: respawn.elite === undefined ? true : Boolean(respawn.elite),
        boss: Boolean(respawn.boss),
        aggroRange: respawn.aggroRange,
        homeX: respawn.x,
        homeY: respawn.y,
        leashX: respawn.leashX,
        leashY: respawn.leashY,
        leashRadius: respawn.leashRadius,
        leashState: "idle",
        gold: respawn.gold !== undefined ? respawn.gold : { min: 0, max: 0 },
        guaranteedDrops: respawn.guaranteedDrops,
        noWander: Boolean(respawn.noWander),
        friendlyToGoodPlayer: respawn.friendlyToGoodPlayer,
        friendlyToNonEvilPlayer: respawn.friendlyToNonEvilPlayer,
        shopkeeper: respawn.shopkeeper,
        inventory: respawn.inventory ? respawn.inventory.map(item => structuredClone(item)) : undefined,
        consumables: respawn.consumables ? respawn.consumables.map(item => structuredClone(item)) : undefined,
        misc: respawn.misc ? respawn.misc.map(item => structuredClone(item)) : undefined,
        scrolls: respawn.scrolls ? respawn.scrolls.map(item => structuredClone(item)) : undefined,
        questGiver: respawn.questGiver,
        trainer: respawn.trainer
      }));
      addLog(`<b>${respawn.name}</b> returns.`, { x: respawn.x, y: respawn.y });
    }
    game.eliteRespawns.splice(game.eliteRespawns.indexOf(respawn), 1);
  }
}

function updateVirtueForKill(enemy) {
  const alignment = unitAlignment(enemy);
  if (alignment === "Good") {
    adjustVirtue(-1);
  } else if (alignment === "Evil") {
    adjustVirtue(1);
  }
}

function adjustVirtue(amount) {
  if (!amount) return;
  const previousAlignment = playerAlignment();
  const before = game.player.virtue;
  game.player.virtue = Math.max(-100, Math.min(100, game.player.virtue + amount));
  const changed = game.player.virtue - before;
  if (!changed) return;
  refreshPlayerAlignmentAggro(previousAlignment, playerAlignment());
  const text = `${changed > 0 ? "+" : ""}${changed} Virtue`;
  spawnFloatingText(
    game.player,
    text,
    changed > 0 ? "#f0cf63" : "#d84e42",
    changed > 0 ? "rgba(0, 0, 0, 0.82)" : "rgba(0, 0, 0, 0.75)"
  );
  markUIDirty();
}

function refreshPlayerAlignmentAggro(previousAlignment, currentAlignment) {
  if (previousAlignment === currentAlignment) return;
  for (const enemy of game.enemies || []) {
    if (enemy.hostileTarget !== game.player && !enemy.hostileToPlayer) continue;
    const shouldClearFriendly = friendlyToGoodPlayer(enemy) || friendlyToNonEvilPlayer(enemy);
    const shouldClearAlignmentAggro = enemy.hostileToPlayerReason === "alignment" && !enemyNaturallyHostileToPlayer(enemy);
    if (!shouldClearFriendly && !shouldClearAlignmentAggro) continue;
    clearEnemyCombat(enemy);
    enemy.leashState = "idle";
    enemy.triggerX = undefined;
    enemy.triggerY = undefined;
    spawnFloatingText(enemy, "CALMED", "#8db8ff", "rgba(0, 0, 0, 0.75)");
  }
}

function resetPlayerProvokedAggroOnDeath() {
  if (game.mode === "multiplayer") sendMultiplayerAction({ action: "player:defeated" });
  for (const enemy of game.enemies || []) {
    const targetedThisPlayer = game.mode === "multiplayer"
      ? enemy.targetPlayerId === game.multiplayer.id
      : enemy.hostileTarget === game.player || enemy.hostileToPlayer;
    if (!targetedThisPlayer) continue;
    if (enemy.hostileToPlayerReason !== "provoked") continue;
    if (enemyNaturallyHostileToPlayer(enemy)) continue;
    clearEnemyCombat(enemy);
    enemy.leashState = "retreating";
    spawnFloatingText(enemy, "CALMED", "#8db8ff", "rgba(0, 0, 0, 0.75)");
    if (game.mode === "multiplayer" && game.multiplayer.isHost) sendMultiplayerEnemyUpdate(enemy);
  }
}

function maybeDropSharleneParcel(enemy) {
  if (enemy.name !== "Bog Witch") return;
  const quest = game.quests.find(candidate => candidate.id === "sharlene-parcel");
  if (!quest || quest.phase !== "find-parcel" || quest.parcelDropped) return;
  const parcel = cloneItem("Sharlene's Parcel");
  if (!parcel) return;
  parcel.persistent = true;
  dropGroundItem(parcel, enemy.x + randomBetween(-10, 10), enemy.y + randomBetween(-10, 10));
  quest.parcelDropped = true;
  game.questLogAlert = true;
  addLog("<b>Bog Witch</b> dropped <b>Sharlene's Parcel</b>.", enemy);
  renderQuestLog();
}

function maybeDropNapaeaSkull(enemy) {
  if (enemy.name !== "Napaea") return;
  const quest = game.quests.find(candidate => candidate.id === "napaea-skull");
  if (!quest || quest.skullDropped || game.completedQuests.includes(quest.id)) return;
  const skull = cloneItem("Napaea's Skull");
  if (!skull) return;
  skull.persistent = true;
  dropGroundItem(skull, enemy.x + randomBetween(-10, 10), enemy.y + randomBetween(-10, 10));
  quest.skullDropped = true;
  game.questLogAlert = true;
  addLog("<b>Napaea</b> dropped <b>Napaea's Skull</b>.", enemy);
  renderQuestLog();
}

function grantXP(amount) {
  game.player.xp += amount;
  if (amount > 0) {
    spawnFloatingText(game.player, `+${formatNumber(amount)} XP`, "#8db8ff");
    markUIDirty();
  }
  while (game.player.xp >= game.player.nextXp) {
    game.player.xp -= game.player.nextXp;
    const hpGain = levelHpGain();
    game.player.level += 1;
    game.player.maxHp += hpGain;
    game.player.stats.HP = game.player.maxHp;
    game.player.hp = Math.min(game.player.maxHp, game.player.hp + hpGain);
    markUIDirty();
    spawnFloatingText(game.player, `+${hpGain} HP`, "#61d66f");
    addLog(`Level ${game.player.level}: maximum HP increased by <b>${hpGain}</b>.`);
    playSoundEffect("complete-quest");
    game.player.nextXp = nextXpRequirement(game.player.nextXp);
    openLevelChoice();
  }
}

function realmXpRequirement(level) {
  return Math.ceil(100 * Math.pow(1.65, Math.max(0, level)));
}

function realmProgress(realm) {
  realm = normalizeRealm(realm);
  game.player.realmProgress ||= {};
  normalizeRealmMap(game.player.realmProgress);
  if (!game.player.realmProgress[realm]) {
    game.player.realmProgress[realm] = { level: 0, xp: 0, nextXp: realmXpRequirement(0) };
  }
  return game.player.realmProgress[realm];
}

function grantRealmXP(realm, amount) {
  realm = normalizeRealm(realm);
  if (!realm || amount <= 0) return;
  const progress = realmProgress(realm);
  progress.xp = roundUpTenth((progress.xp || 0) + amount);
  while (progress.xp >= progress.nextXp) {
    progress.xp = roundUpTenth(progress.xp - progress.nextXp);
    progress.level += 1;
    progress.nextXp = realmXpRequirement(progress.level);
    addLog(`${realmNameHtml(realm)} mastery reached <b>Level ${progress.level}</b>.`);
    updateGvadaRealmObjective?.(realm);
  }
  markUIDirty();
  if (!soulCrystalsWindow.classList.contains("hidden")) renderSoulCrystalsWindow();
}

function craftingXpRequirement(level) {
  return Math.ceil(100 * Math.pow(1.5, Math.max(0, level)));
}

function craftingProgress(skill) {
  if (!craftingSkills.includes(skill)) skill = "Tailoring";
  game.player.craftingProgress ||= {};
  if (!game.player.craftingProgress[skill]) {
    game.player.craftingProgress[skill] = { level: 0, xp: 0, nextXp: craftingXpRequirement(0) };
  }
  return game.player.craftingProgress[skill];
}

function grantCraftingXP(skill, amount) {
  if (!craftingSkills.includes(skill) || amount <= 0) return;
  const progress = craftingProgress(skill);
  progress.xp = roundUpTenth((progress.xp || 0) + amount);
  while (progress.xp >= progress.nextXp) {
    progress.xp = roundUpTenth(progress.xp - progress.nextXp);
    progress.level += 1;
    progress.nextXp = craftingXpRequirement(progress.level);
    addLog(`<b>${skill}</b> reached <b>Level ${progress.level + 1}</b>.`);
  }
  markUIDirty();
  if (!soulCrystalsWindow.classList.contains("hidden")) renderSoulCrystalsWindow();
}

function allCraftingRecipes() {
  const recipes = {};
  for (const skill of craftingSkills) recipes[skill] = Array.isArray(devCraftingRecipes[skill]) ? devCraftingRecipes[skill] : [];
  if (!recipes.Tailoring.length) {
    recipes.Tailoring = [{
      name: "Bolt of Spidersilk Cloth",
      station: "Loom",
      output: "Bolt of Spidersilk Cloth",
      quantity: 1,
      ingredients: [{ item: "Spider Silk", quantity: 2 }],
      level: 1,
      xp: 10,
      soundEffect: "./assets/audio/tangle-vines.wav"
    }];
  }
  return recipes;
}

function normalizeCraftingStationName(value = "") {
  return String(value || "").trim().toLowerCase();
}

function recipesForStation(station) {
  const config = craftingStations[station?.kind];
  if (!config) return [];
  const stationNames = new Set([station?.kind, config.title, ...(config.stationNames || [])].map(normalizeCraftingStationName));
  const recipes = allCraftingRecipes();
  return config.skills.flatMap(skill => (recipes[skill] || [])
    .filter(recipe => !recipe.station || stationNames.has(normalizeCraftingStationName(recipe.station)))
    .map(recipe => ({ ...recipe, skill })));
}

function recipeCanCraft(recipe) {
  const levelRequired = Math.max(1, Math.floor(Number(recipe.level) || 1));
  if ((craftingProgress(recipe.skill).level + 1) < levelRequired) return false;
  return (recipe.ingredients || []).every(ingredient => inventoryItemCount(ingredient.item) >= Math.max(1, Math.floor(Number(ingredient.quantity) || 1)));
}

function craftRecipe(recipe) {
  if (!recipe || !recipeCanCraft(recipe)) {
    addLog("You do not meet the requirements for that recipe.");
    return;
  }
  const output = cloneItem(recipe.output || recipe.item || recipe.name);
  if (!output) {
    addLog("That recipe has no valid output item.");
    return;
  }
  output.quantity = Math.max(1, Math.floor(Number(recipe.quantity) || 1));
  if (!hasInventoryRoomFor(output)) {
    addLog("Inventory full. Make room before crafting.");
    return;
  }
  for (const ingredient of recipe.ingredients || []) {
    removeInventoryStack(ingredient.item, Math.max(1, Math.floor(Number(ingredient.quantity) || 1)));
  }
  addInventoryItem(output);
  grantCraftingXP(recipe.skill, Number(recipe.xp) || 0);
  playSoundEffect(recipe.soundEffect || "");
  addLog(`Crafted <b>${escapeHtml(output.name)}</b>.`);
  renderCraftingWindow();
  renderUI();
}

function makeProjectile({
  source,
  target,
  targetType = "enemy",
  owner = source === game.player ? "player" : "enemy",
  damage,
  realm,
  color,
  label,
  radius = 5,
  speed = 360,
  trail = color,
  vx = null,
  vy = null,
  maxDistance = Infinity,
  dmgType = "Magical",
  dot = null,
  ammoDrop = null,
  projectileAnimation = "ball",
  sourceKind = "spell",
  sourceWeapon = null,
  realmXp = false,
  realmXpRealm = null,
  statMod = null,
  postMitigationDamageMultiplier = 1,
  crit = false
}) {
  realm = normalizeRealm(realm);
  normalizeRealmData(dot);
  normalizeRealmData(statMod);
  if (damage > 0) removeInvisibility(source);
  if (source?.pet && petMasterIsLocalPlayer(source)) owner = "player";
  return {
    source,
    x: source.x,
    y: source.y,
    fromX: source.x,
    fromY: source.y,
    target,
    targetType,
    owner,
    damage,
    realm,
    color,
    label,
    radius,
    speed,
    trail,
    vx,
    vy,
    distanceTraveled: 0,
    maxDistance,
    dmgType,
    dot,
    ammoDrop,
    projectileAnimation,
    sourceKind,
    sourceWeapon,
    realmXp,
    realmXpRealm,
    statMod,
    postMitigationDamageMultiplier,
    crit: Boolean(crit)
  };
}

function projectileHitRadius(projectile, target) {
  const bowBonus = projectile?.sourceKind === "weapon" && isBowWeapon(projectile.sourceWeapon) ? 24 : 0;
  return (target?.radius || 0) + (projectile?.radius || 0) + bowBonus;
}

function projectileIntersectsTarget(projectile, target, fromX = projectile.x, fromY = projectile.y, toX = projectile.x, toY = projectile.y) {
  if (!projectile || !target) return false;
  const hitRadius = projectileHitRadius(projectile, target);
  if (Math.hypot((target.x || 0) - toX, (target.y || 0) - toY) <= hitRadius) return true;
  return distancePointToSegment(target.x || 0, target.y || 0, fromX, fromY, toX, toY) <= hitRadius;
}

function applyProjectileDot(projectile, target) {
  const dot = projectile.dot;
  if (!dot || !game.enemies.includes(target) || protectedFromPlayerEffects(target)) return;
  if (dot.name === "Virulent Plague") {
    applyVirulentPlagueDot(target, { ...dot, realmXp: dot.realmXp || projectile.realmXp, realmXpRealm: dot.realmXpRealm || projectile.realmXpRealm });
    return;
  }
  normalizeRealmData(dot);
  const existing = target.dots.find(existingDot => existingDot.name === dot.name);
  const tick = dot.tick || 1;
  const duration = dot.duration || dot.remaining || 4;
  if (existing) {
    existing.remaining = duration;
    existing.damage = dot.damage;
    existing.realm = normalizeRealm(dot.realm || projectile.realm);
    existing.tick = tick;
    existing.timer = Math.min(existing.timer, tick);
    existing.killedByPlayer = projectile.owner === "player";
    existing.dmgType = dot.dmgType || projectile.dmgType;
    existing.realmXp = Boolean(dot.realmXp || projectile.realmXp);
    existing.realmXpRealm = dot.realmXpRealm || projectile.realmXpRealm || null;
  } else {
    target.dots.push({
      name: dot.name,
      realm: normalizeRealm(dot.realm || projectile.realm),
      damage: dot.damage,
      tick,
      timer: tick,
      remaining: duration,
      killedByPlayer: projectile.owner === "player",
      dmgType: dot.dmgType || projectile.dmgType,
      realmXp: Boolean(dot.realmXp || projectile.realmXp),
      realmXpRealm: dot.realmXpRealm || projectile.realmXpRealm || null
    });
  }
}

function applyProjectileDotToPlayer(projectile) {
  const dot = projectile.dot;
  if (!dot) return;
  normalizeRealmData(dot);
  if (dot.name === "Virulent Plague") normalizeVirulentPlagueDots(game.player);
  const existing = game.player.dots.find(existingDot => existingDot.name === dot.name);
  const tick = dot.name === "Virulent Plague" ? 1 : dot.tick || 1;
  const duration = dot.duration || dot.remaining || 4;
  if (existing) {
    existing.remaining = duration;
    existing.damage = dot.damage;
    existing.realm = normalizeRealm(dot.realm || projectile.realm);
    existing.tick = tick;
    existing.timer = Math.min(existing.timer, tick);
    existing.dmgType = dot.dmgType || projectile.dmgType;
  } else {
    game.player.dots.push({
      name: dot.name,
      realm: normalizeRealm(dot.realm || projectile.realm),
      damage: dot.damage,
      tick,
      timer: tick,
      remaining: duration,
      killedByPlayer: false,
      dmgType: dot.dmgType || projectile.dmgType
    });
  }
}

function activateWeapon(target, options = {}) {
  const weapon = options.weapon || game.player.weapon;
  if (!weapon) return;
  if (protectedFromPlayerEffects(target)) {
    spawnFloatingText(target, "Protected", "#68a85e", "rgba(0, 0, 0, 0.75)");
    return;
  }
  if (!hasLineOfSight(game.player, target)) return;
  removeInvisibility(game.player);
  provokeEnemy(target);
  const animation = (weapon.animation || "claw").toLowerCase();
  const realmXpOptions = weaponDamageRealmXpOptions(weapon, { offHand: Boolean(options.offHand) });
  if (animation === "projectile" && !consumePlayerAmmoForWeapon(weapon)) return;
  playSoundEffect(weapon.soundEffect || weapon.projectileAnimation || animation);
  if (game.mode === "multiplayer") {
    const angle = Math.atan2(target.y - game.player.y, target.x - game.player.x);
    if (animation !== "projectile") {
      game.effects.push({
        type: animation,
        source: game.player,
        target,
        age: 0,
        duration: animation === "slash" ? 0.22 : 0.18,
        realm: weapon.realm,
        angle,
        range: weapon.range * RANGE_UNIT,
        weapon: clonePlain(weapon)
      });
    }
    sendMultiplayerAction({
      action: "weapon:attack",
      offHand: Boolean(options.offHand),
      realmXp: realmXpOptions.realmXp,
      realmXpRealm: realmXpOptions.realmXpRealm,
      combatState: multiplayerCombatStatePayload(),
      weapon: clonePlain(weapon),
      enemyId: target.id,
      enemyIds: animation === "slash" ? slashTargetsIncludingPrimary(target, angle, weapon.range * RANGE_UNIT).map(enemy => enemy.id) : undefined
    });
    if (options.offHand) game.player.offHandAttackTimer = attackInterval(weapon);
    else game.player.attackTimer = attackInterval(weapon);
    sendMultiplayerUpdate(true);
    return;
  }
  const damageMultiplier = options.offHand ? dualWieldOffHandMultiplier() : 1;
  const roll = rollWeaponDamageFor(weapon);
  let damage = roll.total;
  let label = `${options.offHand ? "Off-hand " : ""}${weapon.name} (${roll.weaponRoll} weapon + ${roll.attack} ATK)`;

  if (Math.random() * 100 < effectiveStat(game.player, "FOCUS")) {
    roll.crit = true;
    damage = roundUpTenth(damage * 2.5);
    label = `<b>${weapon.name} crit</b> (${roll.weaponRoll} weapon + ${roll.attack} ATK)`;
  } else {
    roll.crit = false;
  }

  if ((weapon.animation || "claw").toLowerCase() === "slash") {
    const slashAngle = Math.atan2(target.y - game.player.y, target.x - game.player.x);
    game.effects.push({
      type: "slash",
      source: game.player,
      target,
      age: 0,
      duration: 0.22,
      realm: weapon.realm,
      angle: slashAngle,
      range: weapon.range * RANGE_UNIT,
      weapon: clonePlain(weapon)
    });
    for (const enemy of slashTargetsIncludingPrimary(target, slashAngle, weapon.range * RANGE_UNIT)) {
      if (protectedFromPlayerEffects(enemy)) continue;
      provokeEnemy(enemy);
      const hpBefore = enemy.hp;
      applyDamage(enemy, damage, weapon.realm, label, weapon.dmgType || "Physical", {
        source: game.player,
        sourceKind: "weapon",
        sourceWeapon: weapon,
        offHand: Boolean(options.offHand),
        postMitigationDamageMultiplier: options.offHand ? damageMultiplier : 1,
        critical: roll.crit,
        ...realmXpOptions
      });
      const dealt = Math.max(0, hpBefore - enemy.hp);
      if (!realmXpOptions.realmXp) maybeGrantDaggerMasteryCritXp(weapon, dealt, roll.crit, enemy);
      const landed = enemy.hp < hpBefore;
      if (landed) maybeApplyPlayerPoison(enemy);
      if (landed) maybeApplyWeaponStun(enemy, weapon);
      if (landed) maybeApplyFrozenTouch(enemy, weapon, true);
      maybeTriggerEnemyThornShield(enemy, weapon, landed);
    }
  } else if ((weapon.animation || "claw").toLowerCase() === "projectile") {
    const bowShot = isBowWeapon(weapon);
    if (bowShot) {
      const hpBefore = target.hp;
      applyDamage(target, damage, weapon.realm, label, weapon.dmgType || "Physical", {
        killedByPlayer: true,
        source: game.player,
        sourceKind: "weapon",
        sourceWeapon: weapon,
        offHand: Boolean(options.offHand),
        postMitigationDamageMultiplier: options.offHand ? damageMultiplier : 1,
        critical: roll.crit,
        ...realmXpOptions
      });
      const dealt = Math.max(0, hpBefore - target.hp);
      if (target.hp < hpBefore) {
        maybeApplyPlayerPoison(target);
        maybeApplyWeaponStun(target, weapon);
      }
      if (!realmXpOptions.realmXp) maybeGrantDaggerMasteryCritXp(weapon, dealt, roll.crit, target);
      maybeDropProjectileAmmo({ ammoDrop: weaponAmmoName(weapon), x: game.player.x, y: game.player.y }, target);
    }
    game.projectiles.push(makeProjectile({
      source: game.player,
      target,
      damage: bowShot ? 0 : damage,
      realm: weapon.realm,
      color: "#d9bd8c",
      label,
      radius: 4,
      speed: projectileSpeed(weapon.projectileSpeed || 10),
      trail: weaponProjectileTrailColor(weapon),
      owner: "player",
      dmgType: weapon.dmgType || "Physical",
      ammoDrop: bowShot ? null : weaponAmmoName(weapon),
      projectileAnimation: weapon.projectileAnimation || "ball",
      sourceKind: "weapon",
      sourceWeapon: clonePlain(weapon),
      postMitigationDamageMultiplier: options.offHand ? damageMultiplier : 1,
      crit: roll.crit,
      visualOnly: bowShot,
      ...realmXpOptions
    }));
  } else {
    game.effects.push({
      type: (weapon.animation || "claw").toLowerCase(),
      source: game.player,
      target,
      age: 0,
      duration: 0.18,
      realm: weapon.realm,
      weapon: clonePlain(weapon)
    });
    const hpBefore = target.hp;
    applyDamage(target, damage, weapon.realm, label, weapon.dmgType || "Physical", {
      source: game.player,
      sourceKind: "weapon",
      sourceWeapon: weapon,
      offHand: Boolean(options.offHand),
      postMitigationDamageMultiplier: options.offHand ? damageMultiplier : 1,
      critical: roll.crit,
      ...realmXpOptions
    });
    const dealt = Math.max(0, hpBefore - target.hp);
    if (!realmXpOptions.realmXp) maybeGrantDaggerMasteryCritXp(weapon, dealt, roll.crit, target);
    const landed = target.hp < hpBefore;
    if (landed) maybeApplyPlayerPoison(target);
    if (landed) maybeApplyWeaponStun(target, weapon);
    if (landed) maybeApplyFrozenTouch(target, weapon, true);
    maybeTriggerEnemyThornShield(target, weapon, landed);
  }
  if (options.offHand) game.player.offHandAttackTimer = attackInterval(weapon);
  else game.player.attackTimer = attackInterval(weapon);
}

function angleDelta(a, b) {
  return Math.atan2(Math.sin(a - b), Math.cos(a - b));
}

function enemiesInSlash(angle, range) {
  return nearbyEnemies(game.player, range + 120).filter(enemy => {
    const d = distance(game.player, enemy);
    if (d > range + enemy.radius) return false;
    if (!hasLineOfSight(game.player, enemy)) return false;
    const enemyAngle = Math.atan2(enemy.y - game.player.y, enemy.x - game.player.x);
    return Math.abs(angleDelta(enemyAngle, angle)) <= 0.72;
  });
}

function slashTargetsIncludingPrimary(target, angle, range) {
  const targets = enemiesInSlash(angle, range);
  if (target && !targets.includes(target)) targets.unshift(target);
  return targets;
}

function chainJumpAllowed(casterAlignment, target) {
  if (casterAlignment !== "Good" && casterAlignment !== "Evil") return true;
  return unitAlignment(target) !== casterAlignment;
}

function nearestEnemyFrom(origin, range, excluded = [], casterAlignment = "Neutral") {
  let best = null;
  let bestDistance = Infinity;
  const pxRange = Number.isFinite(range) ? range * RANGE_UNIT + 120 : Infinity;
  for (const enemy of nearbyEnemies(origin, pxRange)) {
    if (excluded.includes(enemy) || enemy.hp <= 0) continue;
    if (!chainJumpAllowed(casterAlignment, enemy)) continue;
    const d = distance(origin, enemy);
    if (d > range * RANGE_UNIT + enemy.radius || d >= bestDistance) continue;
    if (!hasLineOfSight(origin, enemy)) continue;
    best = enemy;
    bestDistance = d;
  }
  return best;
}

function forceEnemyHostile(enemy) {
  setEnemyTarget(enemy, game.player);
}

function callForDefense(attacked) {
  const attackedAlignment = unitAlignment(attacked);
  const attackedFaction = unitFactionId(attacked);
  if (!attackedFaction && attackedAlignment === "Neutral") return;
  const defenseRange = 9 * RANGE_UNIT;
  for (const ally of nearbyEnemies(attacked, defenseRange + 120)) {
    if (ally === attacked) continue;
    if (distance(ally, attacked) > defenseRange) continue;
    if (!hasLineOfSight(ally, attacked)) continue;
    const allyAlignment = unitAlignment(ally);
    const allyFaction = unitFactionId(ally);
    const sameDefenseGroup = attackedFaction
      ? allyFaction === attackedFaction
      : allyAlignment === attackedAlignment;
    if (sameDefenseGroup) forceEnemyHostile(ally);
  }
}

function provokeEnemy(enemy) {
  if (!enemy) return;
  enemy.pacified = 0;
  forceEnemyHostile(enemy);
  callForDefense(enemy);
}

function makeStraightEnemyProjectile(enemy, target, options) {
  const d = Math.max(1, distance(enemy, target));
  const speed = options.speed;
  return makeProjectile({
    source: enemy,
    target,
    targetType: target === game.player ? "player" : "enemy",
    damage: options.damage,
    realm: options.realm,
    color: options.color,
    label: options.label,
    radius: options.radius,
    speed,
    trail: options.trail,
    vx: ((target.x - enemy.x) / d) * speed,
    vy: ((target.y - enemy.y) / d) * speed,
    maxDistance: options.maxDistance,
    dmgType: options.dmgType || "Magical",
    dot: options.dot || null,
    projectileAnimation: options.projectileAnimation || "ball",
    sourceKind: options.sourceKind || null,
    sourceWeapon: options.sourceWeapon || null,
    crit: Boolean(options.crit)
  });
}

function enemyDealDamage(enemy, target, amount, realm, sourceName, dmgType = "Magical", options = {}) {
  if (enemy?.pet && unitFriendlyToPetMaster(enemy, target)) {
    clearEnemyCombat(enemy);
    return false;
  }
  if (target?.pet && unitFriendlyToPetMaster(target, enemy)) {
    clearEnemyCombat(target);
    return false;
  }
  if (target === game.player) return damagePlayer(enemy, amount, realm, sourceName, dmgType, options);
  setEnemyTarget(target, enemy);
  const credit = petCombatCredit(enemy);
  applyDamage(target, amount, realm, sourceName, dmgType, { killedByPlayer: credit.killedByPlayer, source: enemy, critical: Boolean(options.critical) });
  return game.enemies.includes(target);
}

function maybeTriggerThornShield(enemy, weapon, landed) {
  if (!landed || !game.enemies.includes(enemy)) return;
  if ((weapon.animation || "claw").toLowerCase() === "projectile" || (weapon.range || 1) > 3) return;
  const thorn = game.player.statMods.find(mod => mod.thornShield);
  if (thorn && applyDamage(enemy, thorn.damage || 0, "Sylvan", "Thorn Shield", "Magical", { realmXp: true })) {
    window.SoulreaperQuestUI?.updateThornShieldObjective?.(enemy);
  }
  const burnDamage = burningSkinDamageValue(game.player);
  if (burnDamage > 0) {
    if (applyDamage(enemy, burnDamage, "Infernal", "Burning Skin", "Magical", { realmXp: true })) {
      spawnBurningSkinHitEffect(enemy);
    }
  }
}

function maybeTriggerEnemyThornShield(enemy, weapon, landed) {
  if (!landed || !game.enemies.includes(enemy)) return;
  if ((weapon.animation || "claw").toLowerCase() === "projectile" || (weapon.range || 1) > 3) return;
  const thorn = enemy.statMods.find(mod => mod.thornShield);
  if (thorn) damagePlayer(enemy, thorn.damage || 0, "Sylvan", `<b>${enemy.name}</b>'s Thorn Shield`, "Magical");
  const burnDamage = burningSkinDamageValue(enemy);
  if (burnDamage > 0 && damagePlayer(enemy, burnDamage, "Infernal", `<b>${enemy.name}</b>'s Burning Skin`, "Magical")) {
    spawnBurningSkinHitEffect(game.player);
  }
}

function activateEnemyWeapon(enemy, target = game.player) {
  if (!hasLineOfSight(enemy, target)) return;
  const weapon = enemy.weapon;
  const animation = (weapon.animation || "claw").toLowerCase();
  playSoundEffect(weapon.soundEffect || weapon.projectileAnimation || weapon.animation);
  let damage = enemyDamageAmount(enemy, rollDamage(weapon, enemy.stats));
  let label = `<b>${enemy.name}</b>'s ${weapon.name}`;
  let crit = false;

  if (Math.random() * 100 < effectiveStat(enemy, "FOCUS")) {
    crit = true;
    damage = roundUpTenth(damage * 2.5);
    label = `<b>${enemy.name}</b>'s ${weapon.name} crit`;
  }

  if (animation === "projectile") {
    const speed = projectileSpeed(weapon.projectileSpeed || weapon.spd || 1);
    game.projectiles.push(makeStraightEnemyProjectile(enemy, target, {
      damage,
      realm: weapon.realm,
      color: realmInfo[weapon.realm]?.color || "#f04f48",
      label,
      radius: 5,
      speed,
      trail: weaponProjectileTrailColor(weapon),
      maxDistance: weapon.range * RANGE_UNIT * 1.5,
      dmgType: weapon.dmgType || "Physical",
      ammoDrop: weaponAmmoName(weapon),
      projectileAnimation: weapon.projectileAnimation || "ball",
      sourceKind: "weapon",
      sourceWeapon: clonePlain(weapon),
      crit
    }));
  } else {
    const angle = Math.atan2(target.y - enemy.y, target.x - enemy.x);
    game.effects.push({
      type: animation,
      source: enemy,
      target,
      age: 0,
      duration: animation === "slash" ? 0.22 : 0.18,
      realm: weapon.realm,
      angle,
      range: (weapon.range || 1) * RANGE_UNIT,
      weapon: clonePlain(weapon)
    });
    const landed = enemyDealDamage(enemy, target, damage, weapon.realm, label, weapon.dmgType || "Physical", { critical: crit });
    if (target === game.player) maybeTriggerThornShield(enemy, weapon, landed);
    if (landed) maybeApplyPoison(enemy, target);
  }

  enemy.attackTimer = unitAttackInterval(enemy);
}

function updateEnemySpells(enemy, dt, target = game.player) {
  if (!enemy.spells?.length) return;
  if (!hasLineOfSight(enemy, target)) return;
  for (const spell of enemy.spells) {
    spell.timer -= dt;
    if (spell.timer > 0) continue;
    if (spell.name === "Basic Prayer") {
      const range = Number(spell.range) || 8;
      let healTarget = enemy.hp < enemy.maxHp ? enemy : null;
      let bestMissing = healTarget ? healTarget.maxHp - healTarget.hp : 0;
      for (const ally of game.enemies) {
        if (ally === enemy || ally.hp <= 0 || ally.hp >= ally.maxHp) continue;
        if (unitAlignment(ally) !== unitAlignment(enemy)) continue;
        if (distance(enemy, ally) > range * RANGE_UNIT + ally.radius + enemy.radius) continue;
        const missing = ally.maxHp - ally.hp;
        if (missing > bestMissing) {
          healTarget = ally;
          bestMissing = missing;
        }
      }
      if (!healTarget) {
        spell.timer = 1;
        continue;
      }
      const healAmount = roundUpTenth((2.5 + 0.5 * spellLevel(spell)) * Math.max(0, 1 + effectiveStat(enemy, "INT") / 100));
      const healed = roundUpTenth(Math.min(healAmount, healTarget.maxHp - healTarget.hp));
      healTarget.hp += healed;
      spawnFloatingText(healTarget, `+${formatNumber(healed)}`, "#61d66f");
      spawnPrayerSparkles(healTarget);
      playSpellSound(spell);
      spell.timer = spell.cooldown || 5;
      continue;
    }
    if (spell.name === "Tangle Vine" && distance(enemy, target) <= spell.range * RANGE_UNIT) {
      const damage = enemyDamageAmount(enemy, spellDamageValue(spell, "damage", 2.5, 0.5, enemy));
      const rootDuration = spellValue(spell, "rootDuration", 1.5, 0.5);
      enemyDealDamage(enemy, target, damage, spell.realm, `<b>${enemy.name}</b>'s Tangle Vine`, "Magical");
      target.rooted = Math.max(target.rooted || 0, rootDuration);
      target.rootVisual = "tangle-vine";
      spawnFloatingText(target, "ROOTED", realmInfo.Sylvan.color);
      if (target === game.player) addLog(`<b>${enemy.name}</b> holds you with Tangle Vine.`);
      playSpellSound(spell);
      spell.timer = spell.cooldown;
    }
    if (spell.name === "Spiderweb" && distance(enemy, target) <= spell.range * RANGE_UNIT) {
      const rootDuration = spellValue(spell, "rootDuration", 1.5, 0.5);
      target.rooted = Math.max(target.rooted || 0, rootDuration);
      target.rootVisual = "spiderweb";
      spawnFloatingText(target, "WEBBED", realmInfo.Mortal.color);
      if (target === game.player) addLog(`<b>${enemy.name}</b> catches you in Spiderweb.`);
      playSpellSound(spell);
      spell.timer = spell.cooldown;
    }
    if (spell.name === "Magic Missile" && distance(enemy, target) <= spell.range * RANGE_UNIT) {
      game.projectiles.push(makeStraightEnemyProjectile(enemy, target, {
        damage: enemyDamageAmount(enemy, spellDamageValue(spell, "damage", 6, 1, enemy)),
        realm: "Ethereal",
        color: "#8db8ff",
        label: `<b>${enemy.name}</b>'s Magic Missile`,
        radius: 5,
        speed: 360,
        trail: "#4068a8",
        maxDistance: spell.range * RANGE_UNIT * 1.5,
        dmgType: "Magical",
        projectileAnimation: "magic missile"
      }));
      playSpellSound(spell);
      spell.timer = spell.cooldown;
    }
    if (spell.name === "Fireball" && distance(enemy, target) <= spell.range * RANGE_UNIT) {
      const damage = enemyDamageAmount(enemy, spellDamageValue(spell, "damage", 4, 1, enemy));
      const duration = Number(spell.duration ?? 4);
      const tick = Number(spell.tick ?? 1);
      const dotDamage = roundUpTenth(damage * spellValue(spell, "dotDamageMultiplier", 0.25, 0));
      game.projectiles.push(makeStraightEnemyProjectile(enemy, target, {
        damage,
        realm: "Infernal",
        color: realmInfo.Infernal.color,
        label: `<b>${enemy.name}</b>'s Fireball`,
        radius: 7,
        speed: 330,
        trail: "#f0cf63",
        maxDistance: spell.range * RANGE_UNIT * 1.5,
        dmgType: "Magical",
        dot: { name: "Burning", realm: "Infernal", damage: dotDamage, tick, timer: tick, remaining: duration, dmgType: "Magical" },
        projectileAnimation: "flaming projectile"
      }));
      playSpellSound(spell);
      spell.timer = spell.cooldown;
    }
    if (spell.name === "Fireblast" && distance(enemy, target) <= spell.range * RANGE_UNIT) {
      const duration = Number(spell.duration ?? 4);
      const tick = Number(spell.tick ?? 1);
      game.effects.push({
        type: "fireblast",
        x: target.x,
        y: target.y,
        realm: "Infernal",
        damage: enemyDamageAmount(enemy, spellDamageValue(spell, "damage", 0, 0.5, enemy)),
        sourceEnemy: enemy,
        age: 0,
        duration,
        tick,
        tickTimer: 0,
        radius: (spell.aoeRadius || 4) * RANGE_UNIT
      });
      playSpellSound(spell);
      spell.timer = spell.cooldown;
    }
    if (spell.name === "Ring of Fire") {
      const duration = Number(spell.duration ?? 3);
      const tick = Number(spell.tick ?? 0.25);
      game.effects.push({
        type: "ring",
        sourceEnemy: enemy,
        realm: "Infernal",
        damage: enemyDamageAmount(enemy, spellDamageValue(spell, "damage", 0.5, 0.5, enemy)),
        age: 0,
        duration,
        tick,
        tickTimer: 0,
        radius: 96
      });
      playSpellSound(spell);
      spell.timer = spell.cooldown || 9;
    }
    if (spell.summonTemplate || spell.name === "Raise Skeleton") {
      summonEnemyMinion(enemy, target, spell, spell.summonTemplate || "Skeleton");
      playSpellSound(spell);
      spell.timer = spell.cooldown || 30;
    }
    if (spell.name === "Curse of Disdain" && distance(enemy, target) <= spell.range * RANGE_UNIT) {
      const damage = enemyDamageAmount(enemy, spellDamageValue(spell, "dotDamage", 0.5, 0.5, enemy));
      const duration = Number(spell.duration ?? 8);
      const tick = Number(spell.tick ?? 1);
      if (target !== game.player) setEnemyTarget(target, enemy);
      const existing = target.dots.find(dot => dot.name === "Curse of Disdain");
      if (existing) {
        existing.remaining = duration;
        existing.damage = damage;
        existing.tick = tick;
        existing.timer = Math.min(existing.timer, tick);
      } else {
        target.dots.push({ name: "Curse of Disdain", realm: "Umbral", damage, tick, timer: tick, remaining: duration, killedByPlayer: false });
      }
      if (target === game.player) addLog(`<b>${enemy.name}</b> curses you with disdain.`);
      playSpellSound(spell);
      spell.timer = spell.cooldown;
    }
    if (spell.name === "Lifesteal" && distance(enemy, target) <= spell.range * RANGE_UNIT) {
      const damage = enemyDamageAmount(enemy, spellDamageValue(spell, "damage", 6, 1, enemy));
      const hpBefore = target.hp;
      game.effects.push({ type: "lifesteal", source: enemy, target, targetX: target.x, targetY: target.y, age: 0, duration: 0.22, localOnly: true });
      enemyDealDamage(enemy, target, damage, "Umbral", `<b>${enemy.name}</b>'s Lifesteal`, "Magical");
      const dealt = Math.max(0, hpBefore - target.hp);
      const healed = roundUpTenth(Math.min(dealt * spellValue(spell, "healMultiplier", 0.5, 0), enemy.maxHp - enemy.hp));
      if (healed > 0) {
        enemy.hp += healed;
        spawnFloatingText(enemy, `+${formatNumber(healed)}`, "#61d66f");
      }
      playSpellSound(spell);
      spell.timer = spell.cooldown;
    }
    if (spell.name === "Chain Lightning" && distance(enemy, target) <= spell.range * RANGE_UNIT) {
      const damage = enemyDamageAmount(enemy, spellDamageValue(spell, "damage", 0, 1.25, enemy));
      spawnChainLightningEffect(enemy, target, "Celestial");
      enemyDealDamage(enemy, target, damage, "Celestial", `<b>${enemy.name}</b>'s Chain Lightning`, "Magical");
      playSpellSound(spell);
      spell.timer = spell.cooldown || 6;
    }
    if (spell.name === "Thorn Shield") {
      const damage = spellDamageValue(spell, "damage", 0, 0.5, enemy);
      const duration = Number(spell.duration ?? 8);
      const existing = enemy.statMods.find(mod => mod.name === "Thorn Shield");
      if (existing) {
        existing.remaining = duration;
        existing.damage = damage;
        existing.lvl = spellLevel(spell);
      } else {
        enemy.statMods.push({
          name: "Thorn Shield",
          remaining: duration,
          damage,
          lvl: spellLevel(spell),
          thornShield: true
        });
      }
      spawnFloatingText(enemy, "THORNS", realmInfo.Sylvan.color);
      playSpellSound(spell);
      spell.timer = spell.cooldown;
    }
    if (spell.name === "Faerie Dust" && distance(enemy, target) <= spell.range * RANGE_UNIT) {
      if (target !== game.player) target.hostileTarget = enemy;
      applyFaerieDust(target, spell.lvl || 1, spell.duration || 6, {
        SPD: spellValue(spell, "speedPenalty", 0, -2),
        AGL: spellValue(spell, "agilityPenalty", 0, -2)
      }, {
        Sylvan: spellValue(spell, "sylvanResistPenalty", 0, -1)
      });
      if (target === game.player) addLog(`<b>${enemy.name}</b> scatters Faerie Dust over you.`);
      playSpellSound(spell);
      spell.timer = spell.cooldown;
    }
  }
}

function maybeApplyPoison(enemy, target = game.player) {
  const poison = enemy.spells?.find(spell => spell.name === "Poisonous" || spell.name === "Poison");
  if (!poison || Math.random() >= poison.chance) return;
  const existing = target.dots.find(dot => dot.name === "Poison");
  const tick = poison.tick || 1;
  const duration = poison.duration || 4;
  const tickCount = Math.max(1, Math.ceil(duration / tick));
  const damage = enemyDamageAmount(enemy, (poison.damage ?? poisonTotalDamage(poison)) / tickCount);
  if (existing) {
    existing.remaining = duration;
    existing.damage = damage;
    existing.tick = tick;
    existing.timer = Math.min(existing.timer, tick);
    existing.dmgType = "Status";
  } else {
    target.dots.push({ name: "Poison", realm: "Mortal", damage, tick, timer: tick, remaining: duration, killedByPlayer: false, dmgType: "Status" });
  }
  if (target === game.player) addLog(`<b>${enemy.name}</b> poisons you.`);
}

function activePlayerPoisonSpell() {
  return game.player.spells.find(spell => spell.name === "Poison");
}

function maybeApplyPlayerPoison(target) {
  const poison = activePlayerPoisonSpell();
  if (!poison || !game.enemies.includes(target) || Math.random() >= 0.5) return;
  if (protectedFromPlayerEffects(target)) return;
  const damage = poisonTickDamage(poison);
  const tick = Number(poison.tick ?? 1);
  const duration = Number(poison.duration ?? 4);
  const existing = target.dots.find(dot => dot.name === "Poison");
  if (existing) {
    existing.remaining = duration;
    existing.damage = damage;
    existing.tick = tick;
    existing.timer = Math.min(existing.timer, tick);
    existing.killedByPlayer = true;
    existing.dmgType = "Status";
    existing.realmXp = true;
    existing.realmXpRealm = "Mortal";
  } else {
    target.dots.push({ name: "Poison", realm: "Mortal", damage, tick, timer: tick, remaining: duration, killedByPlayer: true, dmgType: "Status", realmXp: true, realmXpRealm: "Mortal" });
  }
  addLog(`<b>${target.name}</b> is poisoned.`, target);
}

function applyStun(target, duration = 2) {
  if (!game.enemies.includes(target) || protectedFromPlayerEffects(target)) return false;
  target.stunned = Math.max(target.stunned || 0, duration);
  spawnFloatingText(target, "STUN", "#f0a348", "rgba(0, 0, 0, 0.8)");
  playSoundEffect("poison");
  if (game.mode === "multiplayer") sendMultiplayerEnemyUpdate(target);
  return true;
}

function applyMortify(target, source = game.player, duration = 1) {
  if (!target || duration <= 0) return false;
  if (game.enemies.includes(target) && protectedFromPlayerEffects(target)) return false;
  target.mortified = Math.max(target.mortified || 0, duration);
  target.mortifySourceX = source?.x ?? target.x;
  target.mortifySourceY = source?.y ?? target.y;
  if (game.enemies.includes(target)) clearEnemyCombat(target);
  spawnFloatingText(target, "MORTIFY", realmInfo.Umbral?.color || "#9b5cff", "rgba(0, 0, 0, 0.8)");
  if (target === game.player) addLog("Mortify seizes your body. You flee in panic.");
  if (game.mode === "multiplayer" && game.enemies.includes(target)) sendMultiplayerEnemyUpdate(target);
  return true;
}

function maybeApplyWeaponStun(target, weapon = game.player.weapon) {
  const chance = maceStunChance(weapon);
  if (!chance || Math.random() * 100 >= chance) return false;
  return applyStun(target, weaponStunDuration(weapon));
}

function nearestEnemy(maxRangeUnits = Infinity) {
  const pxRange = maxRangeUnits === Infinity ? Infinity : maxRangeUnits * RANGE_UNIT;
  let best = null;
  let bestDistance = Infinity;
  for (const enemy of nearbyEnemies(game.player, pxRange + 160)) {
    if (!enemyHostileToPlayer(enemy)) continue;
    const d = distance(game.player, enemy);
    if (!hasLineOfSight(game.player, enemy)) continue;
    if (d < bestDistance && d <= pxRange) {
      best = enemy;
      bestDistance = d;
    }
  }
  return best;
}

function enemyAlreadyAfflictedBySpell(enemy, spell) {
  if (!enemy || !spell) return false;
  if (spell.name === "Curse of Disdain") {
    return Boolean(enemy.dots?.some(dot => dot.name === "Curse of Disdain" && (dot.remaining ?? 0) > 0));
  }
  return false;
}

function nearestAutocastEnemy(spell, maxRangeUnits = Infinity) {
  const pxRange = maxRangeUnits === Infinity ? Infinity : maxRangeUnits * RANGE_UNIT;
  let best = null;
  let bestDistance = Infinity;
  for (const enemy of nearbyEnemies(game.player, pxRange + 160)) {
    if (!enemyHostileToPlayer(enemy)) continue;
    if (enemyAlreadyAfflictedBySpell(enemy, spell)) continue;
    const d = distance(game.player, enemy);
    if (!hasLineOfSight(game.player, enemy)) continue;
    if (d < bestDistance && d <= pxRange) {
      best = enemy;
      bestDistance = d;
    }
  }
  return best;
}

function nearestFriendlyHealTarget(maxRangeUnits = Infinity) {
  const pxRange = maxRangeUnits === Infinity || !maxRangeUnits ? Infinity : maxRangeUnits * RANGE_UNIT;
  const candidates = [game.player, ...game.enemies, ...(game.mode === "multiplayer" ? [...game.multiplayer.peers.values()] : [])];
  let best = null;
  let bestScore = Infinity;
  for (const candidate of candidates) {
    if (!candidate || candidate.hp >= candidate.maxHp) continue;
    if (game.enemies.includes(candidate) && !isFriendlyPlayerPet(candidate)) continue;
    if (!canTargetFriendlyUnit(candidate)) continue;
    const d = distance(game.player, candidate);
    if (d > pxRange + (candidate.radius || 0) + game.player.radius) continue;
    if (!hasLineOfSight(game.player, candidate)) continue;
    const missingHp = Math.max(0, (candidate.maxHp || 0) - (candidate.hp || 0));
    const score = d - missingHp * 12;
    if (score < bestScore) {
      best = candidate;
      bestScore = score;
    }
  }
  return best;
}

function nearestFriendlyAutocastTarget(spell, maxRangeUnits = Infinity) {
  if (spell?.name === "Wooden Skin") {
    if (!game.player.statMods?.some(mod => mod.name === "Wooden Skin")) return game.player;
    return null;
  }
  if (spell?.name === "Chlorophyll") {
    const existing = nearestFriendlyHealTarget(maxRangeUnits);
    if (existing && !existing.statMods?.some(mod => mod.name === "Chlorophyll")) return existing;
    return null;
  }
  return nearestFriendlyHealTarget(maxRangeUnits);
}

function spawnAreaAt(x, y) {
  const passage = (game.map?.passages || []).find(candidate => candidate?.metadata?.areaName && pointInPassage(x, y, candidate));
  if (passage?.metadata?.areaName) return passage.metadata.areaName;
  const area = areaAt(x, y);
  return area?.metadata?.areaName || area?.name || AREA_NAME;
}

function spawnAmountMultiplierForArea(areaName, area = null) {
  const amountName = devAreaConfigs[areaName]?.spawnAmount || devDungeonConfigForArea(areaName)?.spawnAmount || area?.spawnAmount || "Normal";
  return spawnAmountMultipliers[amountName] ?? spawnAmountMultipliers.Normal;
}

function ambientEnemyAreaCount(areaName) {
  return game.enemies.filter(enemy => {
    if (!enemy || enemy.hp <= 0) return false;
    if (enemy.spawnSource !== "ambient") return false;
    if (enemy.pet || enemy.masterId || enemy.elite || enemy.boss || enemy.respawnKey || enemy.noWander) return false;
    if (enemy.shopkeeper || enemy.trainer || enemy.questGiver || enemy.banker) return false;
    return spawnAreaAt(enemy.x, enemy.y) === areaName;
  }).length;
}

function ambientEnemyCapForArea(areaName, area = null, playersInArea = 1) {
  const multiplier = spawnAmountMultiplierForArea(areaName, area);
  return Math.max(1, Math.round(BASE_AMBIENT_MOBS_PER_PLAYER * Math.max(1, playersInArea) * multiplier));
}

function randomSpawnPointForTemplate(template, spawnAreaName, radius) {
  const preferenceUnit = {
    aquatic: Boolean(template?.aquatic),
    amphibious: Boolean(template?.amphibious),
    flying: Boolean(template?.flying),
    radius
  };
  const hasPreference = unitHasWaterPreference(preferenceUnit);
  const wantsWater = unitAquatic(preferenceUnit);
  const tryNearPlayer = (requirePreference) => {
    for (let attempt = 0; attempt < 16; attempt += 1) {
      const candidate = randomWalkablePointNear(game.player.x, game.player.y, 420, 820);
      if (!candidate) continue;
      if (spawnAreaAt(candidate.x, candidate.y) !== spawnAreaName) continue;
      if (requirePreference && !terrainPreferenceSatisfied(preferenceUnit, candidate.x, candidate.y, radius)) continue;
      if (enemySpawnSeparated(candidate.x, candidate.y, radius)) return candidate;
    }
    return null;
  };
  if (hasPreference) {
    const nearbyPreferred = tryNearPlayer(true);
    if (nearbyPreferred) return nearbyPreferred;
    for (let attempt = 0; attempt < 18; attempt += 1) {
      const candidate = randomTerrainPointInArea(spawnAreaName, radius, wantsWater, 24);
      if (candidate && enemySpawnSeparated(candidate.x, candidate.y, radius)) return candidate;
    }
    return null;
  }
  return tryNearPlayer(false);
}

function spawnEnemy() {
  const playerArea = areaAt(game.player.x, game.player.y);
  const playerSpawnAreaName = spawnAreaAt(game.player.x, game.player.y);
  if (ambientEnemyAreaCount(playerSpawnAreaName) >= ambientEnemyCapForArea(playerSpawnAreaName, playerArea, 1)) return;
  const spawnTable = areaSpawnTables[playerSpawnAreaName]
    || areaSpawnTables[playerArea?.name || AREA_NAME]
    || areaSpawnTables[AREA_NAME];
  if (!spawnTable?.length) return;
  const totalFrequency = spawnTable.reduce((sum, entry) => sum + Number(entry.frequency || 0), 0);
  if (totalFrequency <= 0) return;
  let roll = randomBetween(0, totalFrequency);
  const selected = spawnTable.find(entry => {
    roll -= Number(entry.frequency || 0);
    return roll <= 0;
  }) || spawnTable[0];
  const template = allMonsterTemplates.find(candidate => candidate.name === selected.name);
  if (!template) return;
  const spawnRadius = (template.radius || 14) * UNIT_SIZE_SCALE;
  const point = randomSpawnPointForTemplate(template, playerSpawnAreaName, spawnRadius);
  if (!point) return;
  const pointArea = areaAt(point.x, point.y) || playerArea;
  const pointSpawnAreaName = spawnAreaAt(point.x, point.y);
  const configuredLevelRange = devAreaConfigs[pointSpawnAreaName]?.levelRange;
  const areaLevelRange = configuredLevelRange || pointArea?.levelRange || playerArea?.levelRange || { min: 1, max: 1 };
  const selectedMin = Number(selected.minLvl ?? selected.minLevel ?? selected.levelRange?.min);
  const selectedMax = Number(selected.maxLvl ?? selected.maxLevel ?? selected.levelRange?.max);
  const levelMin = Number.isFinite(selectedMin) && selectedMin > 0 ? Math.floor(selectedMin) : areaLevelRange.min;
  const levelMax = Number.isFinite(selectedMax) && selectedMax > 0 ? Math.floor(selectedMax) : areaLevelRange.max;
  const lvl = randomInt(Math.max(1, levelMin), Math.max(Math.max(1, levelMin), levelMax));
  game.enemies.push(makeEnemy(template, lvl, point.x, point.y, { area: pointSpawnAreaName, spawnSource: "ambient" }));
}

function separatedSpawnPoint(x, y, radius = 14, maxDistance = 120) {
  if (enemySpawnSeparated(x, y, radius)) return { x, y };
  for (let attempt = 0; attempt < 24; attempt += 1) {
    const angle = (Math.PI * 2 * attempt) / 24 + randomBetween(-0.12, 0.12);
    const dist = randomBetween(radius + 30, maxDistance);
    const tryX = x + Math.cos(angle) * dist;
    const tryY = y + Math.sin(angle) * dist;
    if (unitCanMoveTo({ x, y, radius }, tryX, tryY) && enemySpawnSeparated(tryX, tryY, radius)) return { x: tryX, y: tryY };
  }
  return { x, y };
}

function makeEnemy(template, lvl, x, y, overrides = {}) {
  const baseStats = normalizeStats(template.stats);
  const stats = structuredClone(baseStats);
  const realm = normalizeRealm(overrides.realm || template.realm || "Mortal");
  const type = overrides.type || template.type || "Beast";
  stats.HP = baseStats.HP * lvl;
  stats.ATK = Math.floor(baseStats.ATK * lvl);
  stats.DEF = Math.floor((baseStats.DEF * lvl) / 2);
  stats.REGEN = baseStats.REGEN * lvl;
  const elite = Boolean(overrides.elite ?? template.elite);
  const boss = Boolean(overrides.boss ?? template.boss);
  if (elite) stats.HP *= 3;
  if (boss) stats.HP *= 6;
  const hp = stats.HP;
  const enemy = {
    id: overrides.id || sharedEntityId("enemy"),
    name: overrides.name || template.name,
    templateName: template.name,
    lvl,
    realm,
    alignment: overrides.alignment || template.alignment || (template.name.includes("Goblin") ? "Evil" : defaultAlignmentForRealm(realm)),
    faction: factionId(overrides.faction ?? template.faction ?? inferredFactionForUnit(template)),
    aggressive: Boolean(overrides.aggressive ?? template.aggressive),
    type,
    foodchain: overrides.foodchain ?? template.foodchain ?? (type === "Beast" ? "Prey" : undefined),
    incorporeal: Boolean(overrides.incorporeal ?? template.incorporeal),
    flying: Boolean(overrides.flying ?? template.flying),
    aquatic: Boolean(overrides.aquatic ?? template.aquatic),
    amphibious: Boolean(overrides.amphibious ?? template.amphibious),
    spawnSource: overrides.spawnSource || template.spawnSource || "",
    sprite: overrides.sprite ?? template.sprite,
    resistances: structuredClone(template.resistances || {}),
    gold: structuredClone(template.gold || { min: 0, max: 0 }),
    stats,
    weapon: normalizeWeapon(structuredClone(template.weapon || { name: "Rat Claw", dice: "1D4", speed: 100, range: 1, animation: "claw" }), template.weapon?.name || "Rat Claw"),
    spells: (template.spells || []).map(spell => makeEnemySpell(spell, lvl)).filter(Boolean),
    x,
    y,
    facingX: overrides.facingX || 1,
    radius: (template.radius || 14) * UNIT_SIZE_SCALE,
    maxHp: hp,
    hp,
    attackTimer: 0,
    regenTimer: 5,
    pacified: 0,
    stunned: 0,
    mortified: 0,
    mortifySourceX: x,
    mortifySourceY: y,
    wanderTimer: randomBetween(0.2, 1.8),
    wanderAngle: randomBetween(0, Math.PI * 2),
    rooted: 0,
    rootVisual: "",
    statMods: [],
    dots: [],
    ...overrides,
    elite,
    boss,
    homeX: overrides.homeX ?? x,
    homeY: overrides.homeY ?? y,
    leashState: overrides.leashState || "idle"
  };
  return enemy;
}

function summonPetByTemplate(templateName, lvl, x, y, options = {}) {
  const template = allMonsterTemplates.find(candidate => candidate.name === templateName);
  if (!template) return null;
  const pet = makeEnemy(template, lvl, x, y, {
    pet: true,
    masterId: options.masterId || localPlayerId(),
    masterName: options.masterName || game.player.name || "Soulreaper",
    petCommand: "follow",
    petTargetId: null,
    petDuration: PET_DURATION_SECONDS,
    petTimeRemaining: PET_DURATION_SECONDS,
    noLoot: true,
    gold: { min: 0, max: 0 },
    guaranteedDrops: [],
    area: areaAt(x, y)?.name
  });
  game.enemies.push(pet);
  spawnFloatingText(pet, options.floatingText || "SUMMONED", realmInfo[pet.realm]?.color || "#d9c7ff", "#d9c7ff");
  return pet;
}

function summonPetSkeleton(lvl, x, y, options = {}) {
  return summonPetByTemplate("Skeleton", lvl, x, y, { floatingText: "RAISED", ...options });
}

function summonEnemyMinion(caster, target, spell, templateName = "Skeleton") {
  const template = allMonsterTemplates.find(candidate => candidate.name === templateName);
  if (!template || !caster) return null;
  const lvl = Math.max(1, spellLevel(spell || caster));
  const point = randomWalkablePointNear(caster.x, caster.y, caster.radius + 28, caster.radius + 92)
    || { x: caster.x + caster.radius + 44, y: caster.y };
  const minion = makeEnemy(template, lvl, point.x, point.y, {
    name: `${caster.name}'s ${template.name}`,
    alignment: caster.alignment || template.alignment,
    homeX: caster.homeX ?? caster.x,
    homeY: caster.homeY ?? caster.y,
    noLoot: true,
    gold: { min: 0, max: 0 },
    guaranteedDrops: [],
    area: areaAt(point.x, point.y)?.name || caster.area
  });
  if (target) {
    minion.hostileTarget = target;
    if (target === game.player) minion.targetPlayerId = localPlayerId();
  }
  game.enemies.push(minion);
  spawnRaiseSkeletonSmoke(point.x, point.y);
  spawnFloatingText(minion, templateName === "Skeleton" ? "RAISED" : "SUMMONED", realmInfo[minion.realm]?.color || "#d9c7ff", "#d9c7ff");
  return minion;
}

function populateFixedElites() {
  if (!game.map?.eliteSpawns?.length) return;
  game.map.eliteSpawns.forEach((spawn, index) => {
    const template = allMonsterTemplates.find(candidate => candidate.name === spawn.template);
    if (!template) return;
    const radius = (template.radius || 14) * UNIT_SIZE_SCALE;
    const point = separatedSpawnPoint(spawn.x, spawn.y, radius);
    game.enemies.push(makeEnemy(template, spawn.lvl, point.x, point.y, {
      name: spawn.name,
      respawnKey: spawn.respawnKey || `elite:${index}:${spawn.template}:${spawn.name || spawn.template}:${Math.round(spawn.x)}:${Math.round(spawn.y)}`,
      elite: true,
      aggressive: spawn.aggressive,
      aggroRange: spawn.aggroRange,
      homeX: point.x,
      homeY: point.y,
      leashX: spawn.leashX,
      leashY: spawn.leashY,
      leashRadius: spawn.leashRadius,
      area: areaAt(point.x, point.y)?.name,
      leashState: "idle",
      gold: spawn.gold !== undefined ? spawn.gold : { min: 0, max: 0 },
      guaranteedDrops: [...(spawn.guaranteedDrops || [])],
      noWander: Boolean(spawn.noWander),
      friendlyToGoodPlayer: spawn.friendlyToGoodPlayer,
      friendlyToNonEvilPlayer: spawn.friendlyToNonEvilPlayer,
      shopkeeper: spawn.shopkeeper,
      inventory: spawn.inventory ? spawn.inventory.map(item => structuredClone(item)) : undefined,
      consumables: spawn.consumables ? spawn.consumables.map(item => structuredClone(item)) : undefined,
      misc: spawn.misc ? spawn.misc.map(item => structuredClone(item)) : undefined,
      scrolls: spawn.scrolls ? spawn.scrolls.map(item => structuredClone(item)) : undefined,
      questGiver: spawn.questGiver,
      trainer: spawn.trainer
    }));
  });
}

function populateFixedSpawns() {
  if (!game.map?.fixedSpawns?.length) return;
  for (const spawn of game.map.fixedSpawns) {
    const template = allMonsterTemplates.find(candidate => candidate.name === spawn.template);
    if (!template) continue;
    const radius = (template.radius || 14) * UNIT_SIZE_SCALE;
    const point = spawn.lockPosition ? { x: spawn.x, y: spawn.y } : separatedSpawnPoint(spawn.x, spawn.y, radius);
    game.enemies.push(makeEnemy(template, spawn.lvl || 1, point.x, point.y, {
      id: spawn.id,
      name: spawn.name || spawn.template,
      aggroRange: spawn.aggroRange,
      homeX: spawn.homeX ?? point.x,
      homeY: spawn.homeY ?? point.y,
      leashX: spawn.leashX,
      leashY: spawn.leashY,
      leashRadius: spawn.leashRadius,
      area: spawn.area || areaAt(point.x, point.y)?.name,
      leashState: "idle",
      gold: spawn.gold,
      guaranteedDrops: [...(spawn.guaranteedDrops || [])],
      noWander: Boolean(spawn.noWander),
      lockPosition: Boolean(spawn.lockPosition),
      elite: Boolean(spawn.elite),
      boss: Boolean(spawn.boss)
    }));
  }
}

function namedEnemy(name) {
  return game.enemies.find(enemy => enemy.name === name) || null;
}

function closeTrainerIfPlayerWalkedAway() {
  const trainer = game.activeTrainer;
  if (!trainer) return;
  if (!trainer || !Number.isFinite(trainer.x) || !Number.isFinite(trainer.y)) {
    closeTrainer();
    return;
  }
  const closeRange = TRAINER_WINDOW_CLOSE_RANGE + game.player.radius + trainer.radius;
  if (distance(game.player, trainer) > closeRange) closeTrainer();
}

function updateTrainerRealmOverlay() {
  if (!trainerRealmOverlay) return;
  const trainer = game.activeTrainer;
  if (!trainer) {
    trainerRealmOverlay.classList.add("hidden");
    trainerRealmOverlay.style.removeProperty("--trainer-realm-overlay");
    return;
  }
  const realms = [...new Set((trainerRealms?.(trainer) || []).map(normalizeRealm).filter(realm => realmInfo[realm]))];
  if (!realms.length) {
    trainerRealmOverlay.classList.add("hidden");
    trainerRealmOverlay.style.removeProperty("--trainer-realm-overlay");
    return;
  }
  const colors = realms.map(realm => colorWithAlpha(realmUiColor(realm), 0.24));
  const background = colors.length === 1
    ? colors[0]
    : `linear-gradient(90deg, ${colors.map((color, index) => {
      const position = Math.round((index / (colors.length - 1)) * 100);
      return `${color} ${position}%`;
    }).join(", ")})`;
  trainerRealmOverlay.style.setProperty("--trainer-realm-overlay", background);
  trainerRealmOverlay.classList.remove("hidden");
}

function closeShopIfPlayerWalkedAway() {
  if (shopWindow.classList.contains("hidden")) return;
  if (game.devItemShop) return;
  const shopkeeper = game.activeShopkeeper;
  if (!shopkeeper || !Number.isFinite(shopkeeper.x) || !Number.isFinite(shopkeeper.y)) {
    closeShop();
    return;
  }
  const closeRange = SHOP_WINDOW_CLOSE_RANGE + game.player.radius + (shopkeeper.radius || 0);
  if (distance(game.player, shopkeeper) > closeRange) closeShop();
}

function updatePlayer(dt) {
  updateStatMods(game.player, dt);
  updateSpellMemorization(dt);
  updateRegeneration(game.player, dt);
  applyLavaContactDamage(game.player, dt);
  for (const dot of [...game.player.dots]) {
    if (dot.name === "Virulent Plague") {
      const keep = normalizeVirulentPlagueDots(game.player);
      if (dot !== keep) continue;
    }
    dot.timer -= dt;
    dot.remaining -= dt;
    if (dot.timer <= 0) {
      dot.timer += dot.tick;
      applyStatusDamageToPlayer(dot.damage, dot.realm, dot.name, dot.dmgType || "Magical");
    }
    if (dot.remaining <= 0) game.player.dots.splice(game.player.dots.indexOf(dot), 1);
  }
  game.player.rooted = Math.max(0, game.player.rooted - dt);
  if (game.player.rooted <= 0) game.player.rootVisual = "";
  game.player.stunned = Math.max(0, (game.player.stunned || 0) - dt);
  game.player.mortified = Math.max(0, (game.player.mortified || 0) - dt);
  let dx = 0;
  let dy = 0;
  if (game.keys.has("ArrowLeft") || game.keys.has("a")) dx -= 1;
  if (game.keys.has("ArrowRight") || game.keys.has("d")) dx += 1;
  if (game.keys.has("ArrowUp") || game.keys.has("w")) dy -= 1;
  if (game.keys.has("ArrowDown") || game.keys.has("s")) dy += 1;
  if ((dx || dy) && game.autoFollowTargetId) {
    game.autoFollowTargetId = "";
    renderTargetWindow();
    addLog("<b>Follow:</b> stopped.", null, "chat");
  } else if (!dx && !dy && game.autoFollowTargetId) {
    const followTarget = game.multiplayer.peers.get(game.autoFollowTargetId);
    if (!followTarget || followTarget.area !== currentPlayerAreaName()) {
      game.autoFollowTargetId = "";
      renderTargetWindow();
    } else {
      const followDistance = Math.hypot((followTarget.x || 0) - game.player.x, (followTarget.y || 0) - game.player.y);
      if (followDistance > 70) {
        dx = (followTarget.x || 0) - game.player.x;
        dy = (followTarget.y || 0) - game.player.y;
      }
    }
  }

  if (moveMortifiedPlayer(dt)) {
    dx = 0;
    dy = 0;
  } else if ((dx || dy) && game.player.rooted <= 0 && game.player.stunned <= 0) {
    const mag = Math.hypot(dx, dy);
    const puddleMultiplier = waterSpeedMultiplier(game.player);
    const freezeMultiplier = unitFrozen(game.player) ? 0.5 : 1;
    const speed = (132 + effectiveStat(game.player, "SPD") * 9) * puddleMultiplier * freezeMultiplier;
    moveUnit(game.player, (dx / mag) * speed * dt, (dy / mag) * speed * dt);
  }
  pickupNearbyItems();
  clearDeathMarkerIfNearby();
  handleWhisperspringTeleport();
  handlePortals();
  handleWhisperspringFriendlyContacts();
  handleGuardContact();
  closeTrainerIfPlayerWalkedAway();
  closeShopIfPlayerWalkedAway();
  const craftingStation = nearestCraftingStation();
  if (craftingStation && !game.craftingContactLatch) {
    game.craftingContactLatch = true;
    openCraftingWindow(craftingStation);
  } else if (!craftingStation) {
    game.craftingContactLatch = false;
    if (game.activeCraftingStation) closeCraftingWindow();
  }
  const shopkeeper = game.map?.shopkeeper;
  const touchingShopkeeper = shopkeeper && distance(game.player, shopkeeper) <= game.player.radius + shopkeeper.radius;
  if (touchingShopkeeper && !game.shopContactLatch) {
    game.shopContactLatch = true;
    openShop();
  } else if (!touchingShopkeeper) {
    game.shopContactLatch = false;
  }
  const huntsmanRobb = game.map?.huntsmanRobb;
  const touchingHuntsmanRobb = huntsmanRobb && distance(game.player, huntsmanRobb) <= game.player.radius + huntsmanRobb.radius;
  if (touchingHuntsmanRobb && !game.huntsmanRobbContactLatch) {
    game.huntsmanRobbContactLatch = true;
    openShop(huntsmanRobb);
  } else if (!touchingHuntsmanRobb) {
    game.huntsmanRobbContactLatch = false;
  }
  const blacksmithFredward = game.map?.blacksmithFredward;
  const touchingBlacksmithFredward = blacksmithFredward && distance(game.player, blacksmithFredward) <= game.player.radius + blacksmithFredward.radius;
  if (touchingBlacksmithFredward && !game.blacksmithFredwardContactLatch) {
    game.blacksmithFredwardContactLatch = true;
    openShop(blacksmithFredward);
  } else if (!touchingBlacksmithFredward) {
    game.blacksmithFredwardContactLatch = false;
  }
  const tailorAntonia = game.map?.tailorAntonia;
  const touchingTailorAntonia = tailorAntonia && distance(game.player, tailorAntonia) <= game.player.radius + tailorAntonia.radius;
  if (touchingTailorAntonia && !game.tailorAntoniaContactLatch) {
    game.tailorAntoniaContactLatch = true;
    openShop(tailorAntonia);
  } else if (!touchingTailorAntonia) {
    game.tailorAntoniaContactLatch = false;
  }
  const chaplainSonsam = game.map?.chaplainSonsam;
  const touchingChaplainSonsam = chaplainSonsam && distance(game.player, chaplainSonsam) <= game.player.radius + chaplainSonsam.radius;
  if (touchingChaplainSonsam && !game.chaplainSonsamContactLatch) {
    game.chaplainSonsamContactLatch = true;
    openShop(chaplainSonsam);
  } else if (!touchingChaplainSonsam) {
    game.chaplainSonsamContactLatch = false;
  }
  const alchemistClaristra = game.map?.alchemistClaristra;
  const touchingAlchemistClaristra = alchemistClaristra && distance(game.player, alchemistClaristra) <= game.player.radius + alchemistClaristra.radius;
  if (touchingAlchemistClaristra && !game.alchemistClaristraContactLatch) {
    game.alchemistClaristraContactLatch = true;
    openShop(alchemistClaristra);
  } else if (!touchingAlchemistClaristra) {
    game.alchemistClaristraContactLatch = false;
  }
  const skjoldma = game.map?.barbarianessSkjoldma;
  const touchingSkjoldma = skjoldma && distance(game.player, skjoldma) <= game.player.radius + skjoldma.radius;
  if (touchingSkjoldma && !game.skjoldmaContactLatch) {
    game.skjoldmaContactLatch = true;
    handleTrainerContact(skjoldma);
    if (skjoldma.shopkeeper) openShop(skjoldma);
    window.SoulreaperQuestUI?.startSkjoldmaDialogue?.(skjoldma);
    if (!trainerWindow.classList.contains("hidden")) return;
    if (!dialogueWindow.classList.contains("hidden")) return;
  } else if (!touchingSkjoldma) {
    game.skjoldmaContactLatch = false;
  }
  const banker = bankerNpcs().find(candidate => distance(game.player, candidate) <= game.player.radius + candidate.radius);
  const touchingBanker = Boolean(banker);
  if (touchingBanker && !game.bankerContactLatch) {
    game.bankerContactLatch = true;
    openBank(banker);
  } else if (!touchingBanker) {
    game.bankerContactLatch = false;
  }
  const configuredShopkeeper = configuredShopNpcs().find(candidate => distance(game.player, candidate) <= game.player.radius + candidate.radius);
  const touchingConfiguredShopkeeper = Boolean(configuredShopkeeper);
  if (touchingConfiguredShopkeeper && !game.configuredShopkeeperContactLatch) {
    game.configuredShopkeeperContactLatch = true;
    openShop(configuredShopkeeper);
  } else if (!touchingConfiguredShopkeeper) {
    game.configuredShopkeeperContactLatch = false;
  }
  const hereticOswaldo = game.map?.hereticOswaldo;
  const touchingHereticOswaldo = hereticOswaldo && distance(game.player, hereticOswaldo) <= game.player.radius + hereticOswaldo.radius;
  if (touchingHereticOswaldo && !game.hereticOswaldoContactLatch) {
    game.hereticOswaldoContactLatch = true;
    openShop(hereticOswaldo);
  } else if (!touchingHereticOswaldo) {
    game.hereticOswaldoContactLatch = false;
  }
  const slayleigh = game.map?.hereticSlayleigh;
  const touchingSlayleigh = slayleigh && distance(game.player, slayleigh) <= game.player.radius + slayleigh.radius;
  if (touchingSlayleigh && !game.slayleighContactLatch) {
    game.slayleighContactLatch = true;
    handleTrainerContact(slayleigh);
    if (slayleigh.shopkeeper) openShop(slayleigh);
    if (!trainerWindow.classList.contains("hidden")) return;
    if (!dialogueWindow.classList.contains("hidden")) return;
  } else if (!touchingSlayleigh) {
    game.slayleighContactLatch = false;
  }
  const naturalistWalden = (game.map?.configuredNpcs || []).find(npc => npc.id === "naturalist-walden" || npc.name === "Naturalist Walden");
  const touchingNaturalistWalden = naturalistWalden && distance(game.player, naturalistWalden) <= game.player.radius + naturalistWalden.radius;
  if (touchingNaturalistWalden && !game.naturalistWaldenContactLatch) {
    game.naturalistWaldenContactLatch = true;
    handleTrainerContact(naturalistWalden);
    if (naturalistWalden.shopkeeper) openShop(naturalistWalden);
    startWaldenDialogue?.(naturalistWalden);
    if (!trainerWindow.classList.contains("hidden")) return;
    if (!dialogueWindow.classList.contains("hidden")) return;
  } else if (!touchingNaturalistWalden) {
    game.naturalistWaldenContactLatch = false;
  }
  const herbalistHollyhock = (game.map?.configuredNpcs || []).find(npc => npc.id === "herbalist-hollyhock" || npc.name === "Herbalist Hollyhock");
  const touchingHerbalistHollyhock = herbalistHollyhock && distance(game.player, herbalistHollyhock) <= game.player.radius + herbalistHollyhock.radius;
  if (touchingHerbalistHollyhock && !game.herbalistHollyhockContactLatch) {
    game.herbalistHollyhockContactLatch = true;
    handleTrainerContact(herbalistHollyhock);
    if (herbalistHollyhock.shopkeeper) openShop(herbalistHollyhock);
    startConfiguredQuestDialogue?.(herbalistHollyhock);
    if (!trainerWindow.classList.contains("hidden")) return;
    if (!dialogueWindow.classList.contains("hidden")) return;
  } else if (!touchingHerbalistHollyhock) {
    game.herbalistHollyhockContactLatch = false;
  }
  const magisterMaimon = game.map?.magisterMaimon
    || (game.map?.configuredNpcs || []).find(npc => npc.id === "magister-maimon" || npc.name === "Magister Maimon");
  const touchingMagisterMaimon = magisterMaimon && distance(game.player, magisterMaimon) <= game.player.radius + magisterMaimon.radius;
  if (touchingMagisterMaimon && !game.magisterMaimonContactLatch) {
    game.magisterMaimonContactLatch = true;
    handleTrainerContact(magisterMaimon);
    if (magisterMaimon.shopkeeper) openShop(magisterMaimon);
    startMaimonDialogue?.(magisterMaimon);
    if (!trainerWindow.classList.contains("hidden")) return;
    if (!dialogueWindow.classList.contains("hidden")) return;
  } else if (!touchingMagisterMaimon) {
    game.magisterMaimonContactLatch = false;
  }
  const highPriestessSierra = game.map?.highPriestessSierra
    || (game.map?.configuredNpcs || []).find(npc => npc.id === "high-priestess-sierra" || npc.name === "High Priestess Sierra");
  const touchingHighPriestessSierra = highPriestessSierra && distance(game.player, highPriestessSierra) <= game.player.radius + highPriestessSierra.radius;
  if (touchingHighPriestessSierra && !game.highPriestessSierraContactLatch) {
    game.highPriestessSierraContactLatch = true;
    handleTrainerContact(highPriestessSierra);
    if (highPriestessSierra.shopkeeper) openShop(highPriestessSierra);
    startSierraDialogue?.(highPriestessSierra);
    if (!trainerWindow.classList.contains("hidden")) return;
    if (!dialogueWindow.classList.contains("hidden")) return;
  } else if (!touchingHighPriestessSierra) {
    game.highPriestessSierraContactLatch = false;
  }
  const trainer = mapTrainers().find(candidate => distance(game.player, candidate) <= game.player.radius + candidate.radius);
  const touchingTrainer = Boolean(trainer);
  if (touchingTrainer && !game.trainerContactLatch) {
    game.trainerContactLatch = true;
    handleTrainerContact(trainer);
    if (trainer.shopkeeper) openShop(trainer);
    if (!trainerWindow.classList.contains("hidden")) return;
    if (!dialogueWindow.classList.contains("hidden")) return;
  } else if (!touchingTrainer) {
    game.trainerContactLatch = false;
  }
  const gvada = game.map?.gvada;
  const touchingGvada = gvada && distance(game.player, gvada) <= game.player.radius + gvada.radius;
  if (touchingGvada && !game.gvadaContactLatch) {
    game.gvadaContactLatch = true;
    startGvadaDialogue();
    if (!dialogueWindow.classList.contains("hidden")) return;
  } else if (!touchingGvada) {
    game.gvadaContactLatch = false;
  }
  const juanTabo = game.map?.juanTabo;
  const touchingJuanTabo = juanTabo && distance(game.player, juanTabo) <= game.player.radius + juanTabo.radius;
  if (touchingJuanTabo && !game.juanTaboContactLatch) {
    game.juanTaboContactLatch = true;
    startJuanTaboDialogue();
    if (!dialogueWindow.classList.contains("hidden")) return;
  } else if (!touchingJuanTabo) {
    game.juanTaboContactLatch = false;
  }
  const lordYantos = game.map?.lordYantos;
  const touchingLordYantos = lordYantos && distance(game.player, lordYantos) <= game.player.radius + lordYantos.radius;
  if (touchingLordYantos && !game.lordYantosContactLatch) {
    game.lordYantosContactLatch = true;
    window.SoulreaperQuestUI?.startYantosDialogue?.(lordYantos);
    if (!dialogueWindow.classList.contains("hidden")) return;
  } else if (!touchingLordYantos) {
    game.lordYantosContactLatch = false;
  }
  const lordRauf = (game.map?.configuredNpcs || []).find(npc => npc.id === "lord-rauf" || npc.name === "Lord Rauf");
  const touchingLordRauf = lordRauf && distance(game.player, lordRauf) <= game.player.radius + lordRauf.radius;
  if (touchingLordRauf && !game.lordRaufContactLatch) {
    game.lordRaufContactLatch = true;
    window.SoulreaperQuestUI?.startRaufDialogue?.(lordRauf);
    if (!dialogueWindow.classList.contains("hidden")) return;
  } else if (!touchingLordRauf) {
    game.lordRaufContactLatch = false;
  }
  const pleezix = game.map?.pleezix;
  const touchingPleezix = pleezix && distance(game.player, pleezix) <= game.player.radius + pleezix.radius;
  if (touchingPleezix && !game.pleezixContactLatch) {
    game.pleezixContactLatch = true;
    startPleezixDialogue();
    if (!dialogueWindow.classList.contains("hidden")) return;
  } else if (!touchingPleezix) {
    game.pleezixContactLatch = false;
  }
  const sharlene = game.map?.sharlene;
  const touchingSharlene = sharlene && distance(game.player, sharlene) <= game.player.radius + sharlene.radius;
  if (touchingSharlene && !game.sharleneContactLatch) {
    game.sharleneContactLatch = true;
    startSharleneDialogue();
    if (!dialogueWindow.classList.contains("hidden")) return;
  } else if (!touchingSharlene) {
    game.sharleneContactLatch = false;
  }
  const mordren = game.map?.mordren;
  const touchingMordren = mordren && distance(game.player, mordren) <= game.player.radius + mordren.radius;
  if (touchingMordren && !game.mordrenContactLatch) {
    game.mordrenContactLatch = true;
    startMordrenDialogue();
    if (!dialogueWindow.classList.contains("hidden")) return;
  } else if (!touchingMordren) {
    game.mordrenContactLatch = false;
  }
  const cecil = game.map?.cecil;
  const touchingCecil = cecil && distance(game.player, cecil) <= game.player.radius + cecil.radius;
  if (touchingCecil && !game.cecilContactLatch) {
    game.cecilContactLatch = true;
    startCecilDialogue();
    if (!dialogueWindow.classList.contains("hidden")) return;
  } else if (!touchingCecil) {
    game.cecilContactLatch = false;
  }
  const theodora = game.map?.theodora;
  const touchingTheodora = theodora && distance(game.player, theodora) <= game.player.radius + theodora.radius;
  if (touchingTheodora && !game.theodoraContactLatch) {
    game.theodoraContactLatch = true;
    startTheodoraDialogue();
    if (!dialogueWindow.classList.contains("hidden")) return;
  } else if (!touchingTheodora) {
    game.theodoraContactLatch = false;
  }
  const specialQuestNpcIds = new Set([
    "gvada",
    "juan-tabo",
    "lord-yantos",
    "lord-rauf",
    "pleezix",
    "sharlene",
    "mordren",
    "cecil-paddywagon",
    "theodora",
    "heretic-slayleigh",
    "naturalist-walden",
    "herbalist-hollyhock",
    "magister-maimon",
    "high-priestess-sierra",
    "barbarianess-skjoldma",
    "necromancer-morgane"
  ]);
  for (const npc of game.map?.configuredNpcs || []) {
    const hasConfiguredQuest = npc?.startsQuest && (npc.questId || (Array.isArray(npc.questChain) && npc.questChain.length));
    if (!hasConfiguredQuest || specialQuestNpcIds.has(npc.id)) continue;
    const key = npcContactKey?.(npc) || npc.id || npc.name;
    if (!key) continue;
    const touchingQuestNpc = distance(game.player, npc) <= game.player.radius + npc.radius;
    if (touchingQuestNpc && !game.genericQuestNpcContactLatches[key]) {
      game.genericQuestNpcContactLatches[key] = true;
      startConfiguredQuestDialogue?.(npc);
      if (!dialogueWindow.classList.contains("hidden")) return;
    } else if (!touchingQuestNpc) {
      delete game.genericQuestNpcContactLatches[key];
    }
  }

  game.player.attackTimer -= dt;
  if (game.player.weapon && game.player.attackTimer <= 0 && game.player.stunned <= 0 && (game.player.mortified || 0) <= 0) {
    const target = nearestEnemy(game.player.weapon.range);
    if (target) activateWeapon(target);
  }
  game.player.offHandAttackTimer = Math.max(0, (game.player.offHandAttackTimer || 0) - dt);
  const offHand = offHandWeapon();
  if (offHand && game.player.offHandAttackTimer <= 0 && game.player.stunned <= 0 && (game.player.mortified || 0) <= 0) {
    const target = nearestEnemy(offHand.range);
    if (target) activateWeapon(target, { weapon: offHand, offHand: true });
  }

  updatePlayerSpellTimers(dt);
  updateAuraRealmXP(dt);
  updatePestilentAura(dt);
  for (const spell of game.player.spells) {
    if (spell.passive) continue;
    if (spellMemorizing(spell) > 0) continue;
    if ((spell.manualTarget || spell.manualCast) && !spell.autocast) continue;
    if (spell.manualTarget && spell.castAt) continue;
    if (spell.autocast && !playerUnderAttackForAutocast()) continue;
    if (spell.autocast && spell.requiresShield && !playerHasEquippedShield()) continue;
    if (playerSpellTimer(spell) <= 0) {
      const mode = spellTargetMode(spell);
      const target = mode === "friendly-unit"
        ? nearestFriendlyAutocastTarget(spell, spell.range || Infinity)
        : mode === "friendly-player"
          ? game.player
          : spell.range
            ? nearestAutocastEnemy(spell, spell.range)
            : null;
      const didCast = spell.cast(game, target);
      if (didCast) {
        grantSpellCastRealmXP(spell);
        playSpellSound(spell);
        setSpellOnCooldown(spell);
      }
    }
  }
  const area = areaAt(game.player.x, game.player.y);
  const areaName = area?.name || "The Black Wilds";
  updateTextIfChanged(areaNameEl, areaName);
  if (areaName !== game.chronicleArea) renderChronicle();
}

function updateEnemies(dt) {
  rebuildEnemySpatialGrid();
  for (const enemy of [...game.enemies]) {
    if (shouldThrottleIdleEnemy(enemy, dt)) continue;
    if (tickPetLifetime(enemy, dt)) continue;
    enemy.attackTimer -= dt;
    enemy.pacified = Math.max(0, (enemy.pacified || 0) - dt);
    enemy.stunned = Math.max(0, (enemy.stunned || 0) - dt);
    enemy.mortified = Math.max(0, (enemy.mortified || 0) - dt);
    updateStatMods(enemy, dt);
    updateRegeneration(enemy, dt);
    applyLavaContactDamage(enemy, dt);
    if (!game.enemies.includes(enemy)) continue;
    enemy.rooted = Math.max(0, enemy.rooted - dt);
    if (enemy.rooted <= 0) enemy.rootVisual = "";
    let virulentPlagueSeen = false;
    for (const dot of [...enemy.dots]) {
      if (dot.name === "Virulent Plague") {
        const keep = normalizeVirulentPlagueDots(enemy);
        if (dot !== keep) continue;
        if (virulentPlagueSeen) {
          enemy.dots.splice(enemy.dots.indexOf(dot), 1);
          continue;
        }
        virulentPlagueSeen = true;
      }
      dot.timer -= dt;
      dot.remaining -= dt;
      if (dot.name === "Virulent Plague" && dot.remaining > 0) spreadVirulentPlagueFrom(enemy);
      if (dot.timer <= 0) {
        if (dot.killedByPlayer !== false && protectedFromPlayerEffects(enemy)) {
          enemy.dots.splice(enemy.dots.indexOf(dot), 1);
          continue;
        }
        dot.timer += dot.tick;
        applyDamage(enemy, dot.damage, dot.realm, dot.name, dot.dmgType || "Magical", { killedByPlayer: dot.killedByPlayer !== false, realmXp: Boolean(dot.realmXp), realmXpRealm: dot.realmXpRealm || null });
      }
      if (dot.remaining <= 0) enemy.dots.splice(enemy.dots.indexOf(dot), 1);
    }
    if (!game.enemies.includes(enemy)) continue;
    if (enemy.stunned > 0) continue;
    if (moveMortifiedEnemy(enemy, dt)) continue;
    let target = updateEnemyTarget(enemy);
    if (enemy.leashState === "retreating" || shouldEnemyReturnToLeash(enemy)) {
      clearEnemyCombat(enemy);
      if (enemy.rooted <= 0) moveEnemyToLeash(enemy, dt);
      continue;
    }
    if (!targetIsValid(target)) target = enemy.hostileTarget;
    if (!targetIsValid(target)) {
      if (updatePetIdle(enemy, dt)) continue;
      if (enemy.rooted <= 0 && correctIdleEnemyTerrain(enemy, dt)) continue;
      if (enemy.rooted <= 0 && !enemy.noWander && enemy.name !== "Guard Dorin" && !((enemy.elite || enemy.boss) && unitInDungeon(enemy))) wanderEnemy(enemy, dt);
      continue;
    }
    updateEnemySpells(enemy, dt, target);
    const d = distance(enemy, target);
    const weaponRange = enemy.weapon.range * RANGE_UNIT + enemy.radius + target.radius;
    const canSeeTarget = hasLineOfSight(enemy, target);
    if ((d > weaponRange || !canSeeTarget) && enemy.rooted <= 0) {
      moveEnemyToward(enemy, target, dt);
    } else if (d <= weaponRange && canSeeTarget && enemy.attackTimer <= 0) {
      activateEnemyWeapon(enemy, target);
    }
  }
  invalidateEnemySpatialGrid();
}

function updateProjectiles(dt) {
  for (let i = game.projectiles.length - 1; i >= 0; i -= 1) {
    const projectile = game.projectiles[i];
    const targetsEnemy = projectile.targetType !== "player";
    if (targetsEnemy && !game.enemies.includes(projectile.target)) {
      game.projectiles.splice(i, 1);
      continue;
    }

    if (projectile.vx !== null && projectile.vy !== null) {
      const prevX = projectile.x;
      const prevY = projectile.y;
      const stepX = projectile.vx * dt;
      const stepY = projectile.vy * dt;
      projectile.x += stepX;
      projectile.y += stepY;
      projectile.distanceTraveled += Math.hypot(stepX, stepY);

      if (projectile.distanceTraveled >= projectile.maxDistance || !isWalkable(projectile.x, projectile.y, projectile.radius)) {
        game.projectiles.splice(i, 1);
        continue;
      }

      if (projectile.targetType === "player" && projectileIntersectsTarget(projectile, game.player, prevX, prevY, projectile.x, projectile.y)) {
        if (projectile.visualOnly) {
          game.projectiles.splice(i, 1);
          continue;
        }
        damagePlayer(projectile.source || { name: projectile.label.replace(/<[^>]+>/g, ""), realm: projectile.realm }, projectile.damage, projectile.realm, projectile.label, projectile.dmgType, { critical: Boolean(projectile.crit) });
        applyProjectileDotToPlayer(projectile);
        maybeDropProjectileAmmo(projectile, game.player);
        game.projectiles.splice(i, 1);
      } else if (projectile.targetType !== "player" && projectileIntersectsTarget(projectile, projectile.target, prevX, prevY, projectile.x, projectile.y)) {
        if (projectile.visualOnly) {
          game.projectiles.splice(i, 1);
          continue;
        }
        if (projectile.source?.pet && unitFriendlyToPetMaster(projectile.source, projectile.target)) {
          game.projectiles.splice(i, 1);
          continue;
        }
        if (game.enemies.includes(projectile.source)) setEnemyTarget(projectile.target, projectile.source);
        const hpBefore = projectile.target.hp;
        applyDamage(projectile.target, projectile.damage, projectile.realm, projectile.label, projectile.dmgType, {
          killedByPlayer: projectile.owner === "player",
          source: projectile.source,
          sourceKind: projectile.sourceKind,
          sourceWeapon: projectile.sourceWeapon,
          offHand: Boolean(projectile.postMitigationDamageMultiplier && projectile.postMitigationDamageMultiplier !== 1),
          postMitigationDamageMultiplier: projectile.postMitigationDamageMultiplier || 1,
          realmXp: Boolean(projectile.realmXp),
          realmXpRealm: projectile.realmXpRealm,
          critical: Boolean(projectile.crit)
        });
        if (projectile.statMod && projectile.target.hp > 0) applyUnitStatMod(projectile.target, projectile.statMod);
        applyProjectileDot(projectile, projectile.target);
        if (projectile.owner === "player" && projectile.sourceKind === "weapon" && projectile.target.hp < hpBefore) {
          maybeApplyPlayerPoison(projectile.target);
          maybeApplyWeaponStun(projectile.target, projectile.sourceWeapon);
          if (!projectile.realmXp) maybeGrantDaggerMasteryCritXp(projectile.sourceWeapon || game.player.weapon, Math.max(0, hpBefore - projectile.target.hp), projectile.crit, projectile.target);
        }
        maybeDropProjectileAmmo(projectile, projectile.target);
        game.projectiles.splice(i, 1);
      }
      continue;
    }

    const d = distance(projectile, projectile.target);
    if (projectileIntersectsTarget(projectile, projectile.target)) {
      if (projectile.visualOnly) {
        game.projectiles.splice(i, 1);
        continue;
      }
      if (projectile.targetType === "player") {
        damagePlayer(projectile.source || { name: projectile.label.replace(/<[^>]+>/g, ""), realm: projectile.realm }, projectile.damage, projectile.realm, projectile.label, projectile.dmgType, { critical: Boolean(projectile.crit) });
        applyProjectileDotToPlayer(projectile);
        maybeDropProjectileAmmo(projectile, game.player);
      } else {
        if (projectile.source?.pet && unitFriendlyToPetMaster(projectile.source, projectile.target)) {
          game.projectiles.splice(i, 1);
          continue;
        }
        if (game.enemies.includes(projectile.source)) setEnemyTarget(projectile.target, projectile.source);
        const hpBefore = projectile.target.hp;
        applyDamage(projectile.target, projectile.damage, projectile.realm, projectile.label, projectile.dmgType, {
          killedByPlayer: projectile.owner === "player",
          source: projectile.source,
          sourceKind: projectile.sourceKind,
          sourceWeapon: projectile.sourceWeapon,
          offHand: Boolean(projectile.postMitigationDamageMultiplier && projectile.postMitigationDamageMultiplier !== 1),
          postMitigationDamageMultiplier: projectile.postMitigationDamageMultiplier || 1,
          realmXp: Boolean(projectile.realmXp),
          realmXpRealm: projectile.realmXpRealm,
          critical: Boolean(projectile.crit)
        });
        if (projectile.statMod && projectile.target.hp > 0) applyUnitStatMod(projectile.target, projectile.statMod);
        applyProjectileDot(projectile, projectile.target);
        if (projectile.owner === "player" && projectile.sourceKind === "weapon" && projectile.target.hp < hpBefore) {
          maybeApplyPlayerPoison(projectile.target);
          maybeApplyWeaponStun(projectile.target, projectile.sourceWeapon);
          if (!projectile.realmXp) maybeGrantDaggerMasteryCritXp(projectile.sourceWeapon || game.player.weapon, Math.max(0, hpBefore - projectile.target.hp), projectile.crit, projectile.target);
        }
        maybeDropProjectileAmmo(projectile, projectile.target);
      }
      game.projectiles.splice(i, 1);
    } else {
      const prevX = projectile.x;
      const prevY = projectile.y;
      projectile.x += ((projectile.target.x - projectile.x) / d) * projectile.speed * dt;
      projectile.y += ((projectile.target.y - projectile.y) / d) * projectile.speed * dt;
      if (projectileIntersectsTarget(projectile, projectile.target, prevX, prevY, projectile.x, projectile.y)) {
        if (projectile.visualOnly) {
          game.projectiles.splice(i, 1);
          continue;
        }
        if (projectile.targetType === "player") {
          damagePlayer(projectile.source || { name: projectile.label.replace(/<[^>]+>/g, ""), realm: projectile.realm }, projectile.damage, projectile.realm, projectile.label, projectile.dmgType, { critical: Boolean(projectile.crit) });
          applyProjectileDotToPlayer(projectile);
          maybeDropProjectileAmmo(projectile, game.player);
        } else {
          if (projectile.source?.pet && unitFriendlyToPetMaster(projectile.source, projectile.target)) {
            game.projectiles.splice(i, 1);
            continue;
          }
          if (game.enemies.includes(projectile.source)) setEnemyTarget(projectile.target, projectile.source);
          const hpBefore = projectile.target.hp;
          applyDamage(projectile.target, projectile.damage, projectile.realm, projectile.label, projectile.dmgType, {
            killedByPlayer: projectile.owner === "player",
            source: projectile.source,
            sourceKind: projectile.sourceKind,
            sourceWeapon: projectile.sourceWeapon,
            offHand: Boolean(projectile.postMitigationDamageMultiplier && projectile.postMitigationDamageMultiplier !== 1),
            postMitigationDamageMultiplier: projectile.postMitigationDamageMultiplier || 1,
            realmXp: Boolean(projectile.realmXp),
            realmXpRealm: projectile.realmXpRealm,
            critical: Boolean(projectile.crit)
          });
          if (projectile.statMod && projectile.target.hp > 0) applyUnitStatMod(projectile.target, projectile.statMod);
          applyProjectileDot(projectile, projectile.target);
          if (projectile.owner === "player" && projectile.sourceKind === "weapon" && projectile.target.hp < hpBefore) {
            maybeApplyPlayerPoison(projectile.target);
            maybeApplyWeaponStun(projectile.target, projectile.sourceWeapon);
            if (!projectile.realmXp) maybeGrantDaggerMasteryCritXp(projectile.sourceWeapon || game.player.weapon, Math.max(0, hpBefore - projectile.target.hp), projectile.crit, projectile.target);
          }
          maybeDropProjectileAmmo(projectile, projectile.target);
        }
        game.projectiles.splice(i, 1);
        continue;
      }
      if (!isWalkable(projectile.x, projectile.y, projectile.radius)) {
        game.projectiles.splice(i, 1);
      }
    }
  }
}

function updateEffects(dt) {
  for (let i = game.effects.length - 1; i >= 0; i -= 1) {
    const effect = game.effects[i];
    effect.age += dt;
    if (game.mode === "multiplayer" && effect.ownerId) {
      if (effect.age >= effect.duration) game.effects.splice(i, 1);
      continue;
    }
    if (effect.type === "ring") {
      const owner = effect.sourceEnemy || game.player;
      effect.tickTimer -= dt;
      while (effect.tickTimer <= 0) {
        effect.tickTimer += effect.tick;
        if (effect.sourceEnemy) {
          const playerRingDistance = Math.abs(distance(owner, game.player) - (effect.radius || 96));
          if (playerRingDistance < game.player.radius + 8) {
            damagePlayer(owner, effect.damage, effect.realm, `<b>${owner.name}</b>'s Ring of Fire`, "Magical");
          }
          for (let enemyIndex = game.enemies.length - 1; enemyIndex >= 0; enemyIndex -= 1) {
            const enemy = game.enemies[enemyIndex];
            if (enemy === owner) continue;
            const ringDistance = Math.abs(distance(owner, enemy) - (effect.radius || 96));
            if (ringDistance < enemy.radius + 8) {
              enemyDealDamage(owner, enemy, effect.damage, effect.realm, `<b>${owner.name}</b>'s Ring of Fire`, "Magical");
            }
          }
        } else {
          for (let enemyIndex = game.enemies.length - 1; enemyIndex >= 0; enemyIndex -= 1) {
            const enemy = game.enemies[enemyIndex];
            const ringDistance = Math.abs(distance(game.player, enemy) - 96);
            if (ringDistance < enemy.radius + 8) {
              const hpBefore = enemy.hp;
              applyDamage(enemy, effect.damage, effect.realm, "Ring of Fire", "Magical", { realmXp: Boolean(effect.realmXp) });
              if (hpBefore > enemy.hp) window.SoulreaperQuestUI?.updateTooCloseToTheFireObjective?.(enemy);
            }
          }
        }
      }
    }
    if (effect.type === "fireblast") {
      effect.tickTimer -= dt;
      while (effect.tickTimer <= 0) {
        effect.tickTimer += effect.tick;
        if (effect.sourceEnemy) {
          if (distance(effect, game.player) <= effect.radius + game.player.radius) {
            damagePlayer(effect.sourceEnemy, effect.damage, effect.realm, `<b>${effect.sourceEnemy.name}</b>'s Fireblast`, "Magical");
          }
          for (let enemyIndex = game.enemies.length - 1; enemyIndex >= 0; enemyIndex -= 1) {
            const enemy = game.enemies[enemyIndex];
            if (enemy === effect.sourceEnemy || distance(effect, enemy) > effect.radius + enemy.radius) continue;
            enemyDealDamage(effect.sourceEnemy, enemy, effect.damage, effect.realm, `<b>${effect.sourceEnemy.name}</b>'s Fireblast`, "Magical");
          }
          continue;
        }
        for (let enemyIndex = game.enemies.length - 1; enemyIndex >= 0; enemyIndex -= 1) {
          const enemy = game.enemies[enemyIndex];
          if (distance(effect, enemy) <= effect.radius + enemy.radius) {
            if (protectedFromPlayerEffects(enemy)) {
              spawnFloatingText(enemy, "Protected", "#68a85e", "rgba(0, 0, 0, 0.75)");
              continue;
            }
            provokeEnemy(enemy);
            const hpBefore = enemy.hp;
            applyDamage(enemy, effect.damage, effect.realm, "Fireblast", "Magical", { realmXp: Boolean(effect.realmXp) });
            if (hpBefore > enemy.hp) window.SoulreaperQuestUI?.updateControlledBurnObjective?.(effect.castId || `${effect.x}:${effect.y}:${effect.age}`, enemy);
          }
        }
      }
    }
    if (effect.type === "iceStorm") {
      effect.tickTimer -= dt;
      while (effect.tickTimer <= 0) {
        effect.tickTimer += effect.tick;
        for (let enemyIndex = game.enemies.length - 1; enemyIndex >= 0; enemyIndex -= 1) {
          const enemy = game.enemies[enemyIndex];
          if (distance(effect, enemy) <= effect.radius + enemy.radius) {
            if (protectedFromPlayerEffects(enemy)) {
              spawnFloatingText(enemy, "Protected", "#68a85e", "rgba(0, 0, 0, 0.75)");
              continue;
            }
            provokeEnemy(enemy);
            applyDamage(enemy, effect.damage, effect.realm, "Ice Storm", "Magical", { realmXp: Boolean(effect.realmXp), source: game.player });
            if (game.enemies.includes(enemy)) applyFreeze(enemy, effect.statMod?.remaining || 4);
          }
        }
      }
    }
    if (effect.type === "faerieCircle" || effect.type === "darkCircle") {
      effect.tickTimer -= dt;
      while (effect.tickTimer <= 0) {
        effect.tickTimer += effect.tick || 0.5;
        for (const target of friendlyCircleTargets()) {
          if (distance(effect, target) > effect.radius + (target.radius || 18)) continue;
          applyUnitStatMod(target, effect.statMod);
        }
      }
    }
    if (effect.type === "graceFromAbove") {
      effect.tickTimer -= dt;
      while (effect.tickTimer <= 0) {
        effect.tickTimer += effect.tick || 1;
        for (const target of friendlyCircleTargets()) {
          if (distance(effect, target) > effect.radius + (target.radius || 18)) continue;
          const healed = healFriendlyCircleTarget(target, effect.heal, "Grace from Above");
          if (healed > 0) grantRealmXP("Celestial", healed);
        }
      }
    }
    if (effect.age >= effect.duration) game.effects.splice(i, 1);
  }
}

function updateFloatingTexts(dt) {
  for (let i = game.floatingTexts.length - 1; i >= 0; i -= 1) {
    const floater = game.floatingTexts[i];
    floater.age += dt;
    floater.y += floater.vy * dt;
    if (floater.age >= floater.duration) {
      game.floatingTexts.splice(i, 1);
    }
  }
}

function updatePlayerSpeech(dt) {
  if (!game.playerSpeech) return;
  game.playerSpeech.age += dt;
  if (game.playerSpeech.age >= game.playerSpeech.duration) game.playerSpeech = null;
}

function updateNpcSpeech(dt) {
  for (let i = game.npcSpeech.length - 1; i >= 0; i -= 1) {
    const speech = game.npcSpeech[i];
    speech.age += dt;
    if (!speech.speaker || speech.age >= speech.duration) game.npcSpeech.splice(i, 1);
  }
}

function updateGroundItems(dt) {
  for (let i = game.groundItems.length - 1; i >= 0; i -= 1) {
    const drop = game.groundItems[i];
    if (!drop.duration) continue;
    drop.age += dt;
    if (drop.age >= drop.duration) {
      game.groundItems.splice(i, 1);
    }
  }
}

function updateSpawning(dt) {
  const area = areaAt(game.player.x, game.player.y);
  const spawnsPerSecond = spawnRates[area?.spawnRate || "Normal"] ?? spawnRates.Normal;
  if (Math.random() < spawnsPerSecond * dt) spawnEnemy();
}

function draw() {
  const rect = canvas.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height);
  if (!game.map || !modeChoice.classList.contains("hidden")) return;
  const camera = getCamera(rect);
  if (game.shake > 0) {
    ctx.save();
    ctx.translate(randomBetween(-3, 3), randomBetween(-3, 3));
  }

  drawGround(rect, camera);
  ctx.save();
  ctx.translate(-camera.x, -camera.y);
  const visibleEnemies = game.enemies.filter(enemy => unitVisible(enemy, camera, rect, 160));
  game.renderHoveredEnemy = hoveredEnemy();
  for (const effect of game.effects) if (effectVisible(effect, camera, rect)) drawEffect(effect);
  for (const projectile of game.projectiles) if (unitVisible(projectile, camera, rect, 220)) drawProjectile(projectile);
  for (const drop of game.groundItems) if (unitVisible(drop, camera, rect, 120)) drawGroundItem(drop);
  if (unitVisible(game.map?.gvada, camera, rect, 110)) drawGvada();
  if (unitVisible(game.map?.pleezix, camera, rect, 110)) drawPleezix();
  drawTrainer(camera, rect);
  if (unitVisible(game.map?.sharlene, camera, rect, 110)) drawSharlene();
  if (unitVisible(game.map?.mordren, camera, rect, 110)) drawMordren();
  if (unitVisible(game.map?.cecil, camera, rect, 110)) drawCecil();
  if (unitVisible(game.map?.theodora, camera, rect, 110)) drawTheodora();
  drawBumsforkNpcs(camera, rect);
  if (unitVisible(game.map?.shopkeeper, camera, rect, 120)) drawShopkeeper();
  if (unitVisible(game.map?.huntsmanRobb, camera, rect, 120)) drawHuntsmanRobb();
  if (unitVisible(game.map?.blacksmithFredward, camera, rect, 120)) drawBlacksmithFredward();
  if (unitVisible(game.map?.tailorAntonia, camera, rect, 120)) drawNamedNpc(game.map.tailorAntonia, sprites.npcs.villagerFemale);
  if (unitVisible(game.map?.barbarianessSkjoldma, camera, rect, 120)) drawNamedNpc(game.map.barbarianessSkjoldma, sprites.npcs.guard);
  if (unitVisible(game.map?.chaplainSonsam, camera, rect, 120)) drawChaplainSonsam();
  if (unitVisible(game.map?.alchemistClaristra, camera, rect, 120)) drawAlchemistClaristra();
  if (unitVisible(game.map?.juanTabo, camera, rect, 120)) drawNamedNpc(game.map.juanTabo, sprites.npcs.wanderingSalesman);
  if (unitVisible(game.map?.lordYantos, camera, rect, 120)) drawNamedNpc(game.map.lordYantos);
  if (unitVisible(game.map?.hereticOswaldo, camera, rect, 120)) drawHereticOswaldo();
  for (const npc of game.map?.configuredNpcs || []) {
    if (npc.trainer) continue;
    if (unitVisible(npc, camera, rect, 120)) drawNamedNpc(npc);
  }
  for (const enemy of visibleEnemies) if (!unitFlying(enemy)) drawEnemy(enemy);
  drawRemotePlayers(false);
  drawPointTargetArrow();
  if (!unitFlying(game.player)) drawPlayer();
  drawWaterOverSubmergedUnits(visibleEnemies, camera, rect);
  drawMapObstacleTops(camera, rect);
  drawHouseRoofs(camera, rect);
  drawRuinsOfKebaanRoofs(game.map?.kebaan?.ruins, camera, rect);
  for (const enemy of visibleEnemies) if (unitFlying(enemy)) drawEnemy(enemy);
  drawRemotePlayers(true);
  if (unitFlying(game.player)) drawPlayer();
  if (game.inspectMobs) for (const enemy of visibleEnemies) drawMobInspectTooltip(enemy, camera, rect);
  drawTargetingPreview();
  drawPortalHoverText();
  drawNpcSpeech();
  drawPlayerSpeech();
  for (const floater of game.floatingTexts) if (unitVisible(floater, camera, rect, 120)) drawFloatingText(floater);
  drawMistClouds(camera, rect);
  ctx.restore();

  if (game.shake > 0) ctx.restore();
  if (!floatingWindowsReady) drawMapOverlay(rect);
  renderFloatingMinimap();
  drawMultiplayerLatency(rect);
  game.renderHoveredEnemy = null;
}

function drawMultiplayerLatency(rect) {
  if (game.mode !== "multiplayer") return;
  const measuredLatency = Number.isFinite(game.multiplayer.latencyMs) ? Math.round(game.multiplayer.latencyMs) : null;
  const latency = measuredLatency === null ? "--" : `${measuredLatency}`;
  const color = measuredLatency === null
    ? "#f0cf63"
    : measuredLatency <= 50
      ? "#61d66f"
      : measuredLatency >= 150
        ? "#e0523f"
        : "#f0cf63";
  ctx.save();
  ctx.font = "bold 12px system-ui";
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(0, 0, 0, 0.78)";
  ctx.fillStyle = color;
  const text = `Latency: ${latency}`;
  ctx.strokeText(text, rect.width - 14, 14);
  ctx.fillText(text, rect.width - 14, 14);
  ctx.restore();
}

function mapOverlayBounds(rect) {
  if (rect?.floatingMap) {
    const margin = 6;
    return {
      x: margin,
      y: margin,
      width: Math.max(80, rect.width - margin * 2),
      height: Math.max(70, rect.height - margin * 2)
    };
  }
  const width = Math.min(220, Math.max(150, rect.width * 0.24));
  const height = Math.min(160, Math.max(110, rect.height * 0.24));
  const margin = 14;
  return {
    x: rect.width - width - margin,
    y: rect.height - height - margin,
    width,
    height
  };
}

function mapZoomControlBounds(mapRect) {
  const size = 20;
  const gap = 5;
  const y = mapRect.y + 8;
  return {
    plus: { x: mapRect.x + mapRect.width - size - 8, y, w: size, h: size },
    minus: { x: mapRect.x + mapRect.width - size * 2 - gap - 8, y, w: size, h: size }
  };
}

function pointInRect(x, y, rect) {
  return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
}

function clampMapZoom(value) {
  return Math.max(MIN_MAP_ZOOM, Math.min(MAX_MAP_ZOOM, value));
}

function adjustMapZoom(direction) {
  game.mapZoom = clampMapZoom((game.mapZoom || DEFAULT_MAP_ZOOM) + direction);
}

function worldMapBounds(map = game.map) {
  const dungeonName = currentMinimapDungeonName();
  if (dungeonName) {
    const points = [];
    for (const area of map?.areas || []) {
      if (area.hiddenFromMap || area.name !== dungeonName) continue;
      points.push(...(area.boundary || []));
    }
    for (const passage of map?.passages || []) {
      if (passage.hiddenFromMap || passage.areaName !== dungeonName) continue;
      points.push({ x: passage.x1, y: passage.y1 }, { x: passage.x2, y: passage.y2 });
    }
    return points.length ? boundsForPoints(points) : { minX: game.player.x - 1, minY: game.player.y - 1, maxX: game.player.x + 1, maxY: game.player.y + 1 };
  }
  if (!map?._worldMapBounds) {
    const points = [];
    for (const area of map?.areas || []) {
      if (area.hiddenFromMap) continue;
      points.push(...(area.boundary || []));
    }
    for (const passage of map?.passages || []) {
      if (passage.hiddenFromMap) continue;
      points.push({ x: passage.x1, y: passage.y1 }, { x: passage.x2, y: passage.y2 });
    }
    map._worldMapBounds = points.length ? boundsForPoints(points) : { minX: -1, minY: -1, maxX: 1, maxY: 1 };
  }
  return map._worldMapBounds;
}

function currentMinimapDungeonName() {
  const area = areaAt(game.player?.x || 0, game.player?.y || 0);
  return area?.dungeon ? area.name : "";
}

function minimapObjectVisibleForCurrentArea(areaName) {
  const dungeonName = currentMinimapDungeonName();
  if (!dungeonName) return true;
  return areaName === dungeonName;
}

function drawMinimapPolygon(area, mapRect, scale) {
  if (area.hiddenFromMap) return;
  if (!minimapObjectVisibleForCurrentArea(area.name)) return;
  const points = area.boundary || [];
  if (!points.length) return;
  const centerX = mapRect.x + mapRect.width / 2;
  const centerY = mapRect.y + mapRect.height / 2;
  ctx.beginPath();
  for (const [index, point] of points.entries()) {
    const x = centerX + (point.x - game.player.x) * scale;
    const y = centerY + (point.y - game.player.y) * scale;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = areaFillColor(area);
  ctx.globalAlpha = area.surface === "water" ? 0.42 : 0.68;
  ctx.fill();
  ctx.globalAlpha = 0.9;
  ctx.strokeStyle = "rgba(227, 219, 190, 0.16)";
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawMinimapPassage(passage, mapRect, scale) {
  if (passage.hiddenFromMap) return;
  if (!minimapObjectVisibleForCurrentArea(passage.areaName)) return;
  const centerX = mapRect.x + mapRect.width / 2;
  const centerY = mapRect.y + mapRect.height / 2;
  ctx.strokeStyle = passageFillColor(passage);
  ctx.globalAlpha = 0.58;
  ctx.lineWidth = Math.max(2, passage.width * scale);
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(centerX + (passage.x1 - game.player.x) * scale, centerY + (passage.y1 - game.player.y) * scale);
  ctx.lineTo(centerX + (passage.x2 - game.player.x) * scale, centerY + (passage.y2 - game.player.y) * scale);
  ctx.stroke();
}

function minimapPoint(point, mapRect, scale) {
  return {
    x: mapRect.x + mapRect.width / 2 + (point.x - game.player.x) * scale,
    y: mapRect.y + mapRect.height / 2 + (point.y - game.player.y) * scale
  };
}

function traceMinimapBlobPath(blob, mapRect, scale) {
  const center = minimapPoint(blob, mapRect, scale);
  const rx = Math.max(2, (blob.rx || 24) * scale);
  const ry = Math.max(2, (blob.ry || blob.rx || 24) * scale);
  const wobble = Array.isArray(blob.wobble) ? blob.wobble : [];
  const points = wobble.map((wobbleAmount, index, list) => {
    const angle = (index / list.length) * Math.PI * 2;
    return {
      x: center.x + Math.cos(angle) * rx * wobbleAmount,
      y: center.y + Math.sin(angle) * ry * wobbleAmount
    };
  });
  ctx.beginPath();
  if (!points.length) {
    ctx.ellipse(center.x, center.y, rx, ry, 0, 0, Math.PI * 2);
    return;
  }
  for (let i = 0; i < points.length; i += 1) {
    const current = points[i];
    const next = points[(i + 1) % points.length];
    const following = points[(i + 2) % points.length];
    const midX = (current.x + next.x) / 2;
    const midY = (current.y + next.y) / 2;
    const nextMidX = (next.x + following.x) / 2;
    const nextMidY = (next.y + following.y) / 2;
    if (i === 0) ctx.moveTo(midX, midY);
    ctx.quadraticCurveTo(next.x, next.y, nextMidX, nextMidY);
  }
  ctx.closePath();
}

function traceMinimapPolygonPath(points, mapRect, scale) {
  if (!Array.isArray(points) || !points.length) return false;
  ctx.beginPath();
  points.forEach((worldPoint, index) => {
    const point = minimapPoint(worldPoint, mapRect, scale);
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.closePath();
  return true;
}

function drawMinimapRect(rect, mapRect, scale, options = {}) {
  if (!rect) return;
  const point = minimapPoint({ x: rect.x, y: rect.y }, mapRect, scale);
  const w = Math.max(options.minSize || 2, rect.w * scale);
  const h = Math.max(options.minSize || 2, rect.h * scale);
  ctx.save();
  ctx.globalAlpha = options.alpha ?? 0.82;
  ctx.fillStyle = options.fill || "rgba(154, 104, 55, 0.8)";
  ctx.strokeStyle = options.stroke || "rgba(246, 213, 137, 0.62)";
  ctx.lineWidth = options.lineWidth || 1;
  ctx.beginPath();
  ctx.roundRect(point.x, point.y, w, h, options.radius || 2);
  ctx.fill();
  if (options.stroke !== "none") ctx.stroke();
  ctx.restore();
}

function drawMinimapHouse(house, mapRect, scale) {
  if (!house) return;
  ctx.save();
  if (house.kind === "circular") {
    const point = minimapPoint(house, mapRect, scale);
    const radius = Math.max(2.5, (house.radius || house.w / 2 || 120) * scale);
    ctx.globalAlpha = 0.86;
    ctx.fillStyle = "rgba(136, 86, 43, 0.86)";
    ctx.strokeStyle = "rgba(246, 213, 137, 0.66)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(point.x, point.y, radius, radius, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else {
    const floors = house.floors || [house.floor || house.interior].filter(Boolean);
    for (const floor of floors) {
      drawMinimapRect(floor, mapRect, scale, {
        fill: "rgba(136, 86, 43, 0.86)",
        stroke: "rgba(246, 213, 137, 0.66)",
        minSize: 3,
        radius: 0
      });
    }
  }
  const entrances = house.entrances || [house.entrance].filter(Boolean);
  ctx.fillStyle = "#f4dc92";
  for (const entrance of entrances) {
    const point = minimapPoint(entrance, mapRect, scale);
    const size = 3;
    ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size);
  }
  ctx.restore();
}

function drawMinimapGraveyard(graveyard, mapRect, scale) {
  if (!graveyard) return;
  drawMinimapRect({
    x: graveyard.x - graveyard.w / 2,
    y: graveyard.y - graveyard.h / 2,
    w: graveyard.w,
    h: graveyard.h
  }, mapRect, scale, {
    fill: "rgba(61, 35, 20, 0.86)",
    stroke: "none",
    minSize: 5,
    radius: 0
  });
}

function drawMinimapWater(puddle, mapRect, scale) {
  if (!puddle) return;
  if (!minimapObjectVisibleForCurrentArea(puddle.areaName || "")) return;
  const lava = isLavaFeature(puddle);
  ctx.save();
  ctx.globalAlpha = puddle.kind === "river" ? 0.82 : 0.58;
  ctx.fillStyle = lava ? "rgba(221, 72, 26, 0.76)" : "rgba(62, 142, 196, 0.72)";
  ctx.strokeStyle = lava ? "rgba(255, 151, 54, 0.86)" : "rgba(83, 177, 231, 0.86)";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  if (puddle.kind === "river") {
    const points = puddle.points || [];
    if (points.length >= 2) {
      ctx.lineWidth = Math.max(2.5, (puddle.width || 150) * scale);
      ctx.beginPath();
      const start = minimapPoint(points[0], mapRect, scale);
      ctx.moveTo(start.x, start.y);
      if (points.length === 2) {
        const end = minimapPoint(points[1], mapRect, scale);
        ctx.lineTo(end.x, end.y);
      } else {
        for (let i = 1; i < points.length - 1; i += 1) {
          const current = minimapPoint(points[i], mapRect, scale);
          const nextWorld = points[i + 1];
          const next = minimapPoint(nextWorld, mapRect, scale);
          ctx.quadraticCurveTo(current.x, current.y, (current.x + next.x) / 2, (current.y + next.y) / 2);
        }
        const last = minimapPoint(points[points.length - 1], mapRect, scale);
        ctx.lineTo(last.x, last.y);
      }
      ctx.stroke();
    }
  } else if (puddle.kind === "rect-water" || puddle.kind === "rect-lava") {
    drawMinimapRect(puddle, mapRect, scale, {
      fill: lava ? "rgba(221, 72, 26, 0.76)" : "rgba(62, 142, 196, 0.72)",
      stroke: lava ? "rgba(255, 151, 54, 0.86)" : "rgba(83, 177, 231, 0.78)",
      minSize: 3,
      radius: 2
    });
  } else if (puddle.kind === "polygon-water" || puddle.kind === "polygon-lava") {
    if (traceMinimapPolygonPath(puddle.boundary || [], mapRect, scale)) {
      ctx.fill();
      ctx.stroke();
    }
  } else if (typeof puddle.x === "number" && typeof puddle.y === "number") {
    traceMinimapBlobPath(puddle, mapRect, scale);
    ctx.fill();
  }
  ctx.restore();
}

function drawMinimapDungeonEntrance(entrance, mapRect, scale) {
  if (!entrance || entrance.kind !== "whisperspring-entrance") return;
  const entranceArea = areaAt(entrance.door?.x || entrance.x, entrance.door?.y || entrance.y);
  if (!minimapObjectVisibleForCurrentArea(entranceArea?.name || "")) return;
  const point = minimapPoint(entrance.door || entrance, mapRect, scale);
  const size = Math.max(5, Math.min(10, (entrance.size || 220) * scale * 0.18));
  ctx.save();
  ctx.globalAlpha = 0.96;
  ctx.translate(point.x, point.y);
  ctx.fillStyle = "rgba(101, 55, 146, 0.95)";
  ctx.strokeStyle = "rgba(246, 213, 137, 0.92)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(size, 0);
  ctx.lineTo(0, size);
  ctx.lineTo(-size, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawMinimapPlaces(mapRect, scale) {
  for (const puddle of game.map?.puddles || []) drawMinimapWater(puddle, mapRect, scale);
  const graveyards = game.map?.graveyards?.length
    ? game.map.graveyards
    : [game.map?.ganderswoodGraveyard].filter(Boolean);
  for (const graveyard of graveyards) drawMinimapGraveyard(graveyard, mapRect, scale);
  for (const house of game.map?.houses || []) drawMinimapHouse(house, mapRect, scale);
  for (const obstacle of game.map?.obstacles || []) drawMinimapDungeonEntrance(obstacle, mapRect, scale);
}

function drawMinimapTeammates(mapRect, scale) {
  const team = game.multiplayer?.team;
  if (!team?.members?.length || !game.multiplayer?.peers?.size) return;
  const ownId = game.multiplayer.id;
  ctx.save();
  ctx.fillStyle = "#00ffff";
  ctx.strokeStyle = "rgba(0, 0, 0, 0.88)";
  ctx.lineWidth = 1.25;
  for (const member of team.members) {
    if (!member || member.id === ownId) continue;
    const peer = game.multiplayer.peers.get(member.id);
    if (!Number.isFinite(peer?.x) || !Number.isFinite(peer?.y)) continue;
    const point = minimapPoint(peer, mapRect, scale);
    const radius = 3.5;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

function drawMinimapDeathMarker(mapRect, scale) {
  const marker = game.player?.lastDeath;
  if (!Number.isFinite(marker?.x) || !Number.isFinite(marker?.y)) return;
  const point = minimapPoint(marker, mapRect, scale);
  const size = 6;
  ctx.save();
  ctx.globalAlpha = 0.98;
  ctx.strokeStyle = "#ff1f1f";
  ctx.lineWidth = 2.25;
  ctx.lineCap = "round";
  ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
  ctx.shadowBlur = 3;
  ctx.beginPath();
  ctx.moveTo(point.x - size, point.y - size);
  ctx.lineTo(point.x + size, point.y + size);
  ctx.moveTo(point.x + size, point.y - size);
  ctx.lineTo(point.x - size, point.y + size);
  ctx.stroke();
  ctx.restore();
}

function drawMapOverlay(rect) {
  if (!game.mapVisible || !game.map || !game.player) return;
  const mapRect = mapOverlayBounds(rect);
  const bounds = worldMapBounds(game.map);
  const worldWidth = Math.max(1, bounds.maxX - bounds.minX);
  const worldHeight = Math.max(1, bounds.maxY - bounds.minY);
  const scale = Math.min(mapRect.width / worldWidth, mapRect.height / worldHeight) * (game.mapZoom || DEFAULT_MAP_ZOOM);
  const centerX = mapRect.x + mapRect.width / 2;
  const centerY = mapRect.y + mapRect.height / 2;
  ctx.save();
  ctx.fillStyle = "rgba(8, 9, 8, 0.78)";
  ctx.strokeStyle = "rgba(217, 185, 95, 0.54)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(mapRect.x, mapRect.y, mapRect.width, mapRect.height, 5);
  ctx.fill();
  ctx.stroke();
  ctx.save();
  ctx.beginPath();
  ctx.rect(mapRect.x + 5, mapRect.y + 5, mapRect.width - 10, mapRect.height - 10);
  ctx.clip();
  for (const area of game.map.areas || []) drawMinimapPolygon(area, mapRect, scale);
  for (const passage of game.map.passages || []) drawMinimapPassage(passage, mapRect, scale);
  drawMinimapPlaces(mapRect, scale);
  drawMinimapTeammates(mapRect, scale);
  drawMinimapDeathMarker(mapRect, scale);
  ctx.restore();
  ctx.globalAlpha = 1;
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 1.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(centerX - 4, centerY - 4);
  ctx.lineTo(centerX + 4, centerY + 4);
  ctx.moveTo(centerX + 4, centerY - 4);
  ctx.lineTo(centerX - 4, centerY + 4);
  ctx.stroke();
  const controls = mapZoomControlBounds(mapRect);
  drawMapZoomButton(controls.minus, "-");
  drawMapZoomButton(controls.plus, "+");
  ctx.restore();
}

function drawMapZoomButton(button, label) {
  ctx.save();
  ctx.globalAlpha = 1;
  ctx.fillStyle = "rgba(17, 16, 14, 0.92)";
  ctx.strokeStyle = "rgba(217, 185, 95, 0.72)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(button.x, button.y, button.w, button.h, 4);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#f2ede3";
  ctx.font = "bold 15px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, button.x + button.w / 2, button.y + button.h / 2 - 1);
  ctx.restore();
}

function handleMapOverlayClick(event, rect) {
  if (!game.mapVisible) return false;
  const mapRect = mapOverlayBounds(rect);
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  if (x < mapRect.x || x > mapRect.x + mapRect.width || y < mapRect.y || y > mapRect.y + mapRect.height) return false;
  const controls = mapZoomControlBounds(mapRect);
  if (pointInRect(x, y, controls.plus)) {
    adjustMapZoom(1);
    return true;
  }
  if (pointInRect(x, y, controls.minus)) {
    adjustMapZoom(-1);
    return true;
  }
  return true;
}

function boundsVisible(bounds, camera, rect, padding = 0) {
  if (!bounds) return true;
  return bounds.minX - padding <= camera.x + rect.width
    && bounds.maxX + padding >= camera.x
    && bounds.minY - padding <= camera.y + rect.height
    && bounds.maxY + padding >= camera.y;
}

function circleVisible(x, y, radius, camera, rect, padding = 0) {
  return x + radius + padding >= camera.x
    && x - radius - padding <= camera.x + rect.width
    && y + radius + padding >= camera.y
    && y - radius - padding <= camera.y + rect.height;
}

function unitVisible(unit, camera, rect, padding = 96) {
  if (!unit || !Number.isFinite(unit.x) || !Number.isFinite(unit.y)) return false;
  return circleVisible(unit.x, unit.y, unit.radius || 0, camera, rect, padding);
}

function effectVisible(effect, camera, rect) {
  if (!effect || !Number.isFinite(effect.x) || !Number.isFinite(effect.y)) return true;
  return circleVisible(effect.x, effect.y, effect.radius || effect.size || 160, camera, rect, 320);
}

function houseVisible(house, camera, rect, padding = 160) {
  let bounds = house?._bounds;
  if (!bounds) {
    const blocks = house?.blocks || [];
    if (!blocks.length) return true;
    bounds = blocks.reduce((acc, block) => ({
      minX: Math.min(acc.minX, block.x),
      minY: Math.min(acc.minY, block.y),
      maxX: Math.max(acc.maxX, block.x + block.w),
      maxY: Math.max(acc.maxY, block.y + block.h)
    }), { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity });
  }
  return boundsVisible(bounds, camera, rect, padding);
}

function puddleVisible(puddle, camera, rect, padding = 120) {
  if (!puddle) return false;
  if ((puddle.kind === "river" || puddle.kind === "mud-bank") && puddle.bounds) {
    return boundsVisible(puddle.bounds, camera, rect, padding);
  }
  if ((puddle.kind === "polygon-water" || puddle.kind === "polygon-lava") && puddle.bounds) {
    return boundsVisible(puddle.bounds, camera, rect, padding);
  }
  if (puddle.kind === "rect-water" || puddle.kind === "rect-lava") {
    return boundsVisible({
      minX: puddle.x,
      minY: puddle.y,
      maxX: puddle.x + puddle.w,
      maxY: puddle.y + puddle.h
    }, camera, rect, padding);
  }
  return circleVisible(puddle.x, puddle.y, Math.max(puddle.rx || 0, puddle.ry || 0), camera, rect, padding);
}

function obstacleVisible(obstacle, camera, rect, padding = 140) {
  if (!obstacle) return false;
  return boundsVisible(obstacleBounds(obstacle), camera, rect, padding);
}

function viewportQuery(camera, rect, padding = 220) {
  const centerX = camera.x + rect.width / 2;
  const centerY = camera.y + rect.height / 2;
  return {
    x: centerX,
    y: centerY,
    radius: Math.hypot(rect.width, rect.height) / 2 + padding
  };
}

function invalidateGroundCache() {
  groundCache.valid = false;
}

function resetGroundCacheForMap() {
  groundCache.map = game.map;
  invalidateGroundCache();
  if (game.map) game.map._playablePath = null;
}

function groundCacheCovers(camera, rect, padding = 96) {
  if (!groundCache.valid || groundCache.map !== game.map) return false;
  if (groundCache.width < rect.width || groundCache.height < rect.height) return false;
  return camera.x >= groundCache.x + padding
    && camera.y >= groundCache.y + padding
    && camera.x + rect.width <= groundCache.x + groundCache.width - padding
    && camera.y + rect.height <= groundCache.y + groundCache.height - padding;
}

function drawStaticGroundLayer(rect, camera) {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, rect.width, rect.height);

  ctx.save();
  ctx.translate(-camera.x, -camera.y);
  drawWhisperspringVoid(camera, rect);
  for (const area of game.map.areas) {
    if (boundsVisible(area.bounds || boundsForPoints(area.boundary || []), camera, rect, 260)) {
      drawAreaShape(area, areaFillStyle(area));
      drawGroundTexturePatches(area);
    }
  }
  drawDungeonWalls(game.map?.whisperspring?.wallRects, sprites.ground.whisperspringWall, "#4f5b44", camera, rect, { brighten: 0.18 });
  drawDungeonWalls(game.map?.wyndhelmCathedral?.wallRects, sprites.ground.houseWall, "#77786f", camera, rect, { darken: 0.5 });
  drawDungeonWalls(game.map?.diarrhRealm?.wallRects, sprites.ground.houseWall, "#514338", camera, rect, { darken: 0.45 });
  drawConfiguredDungeonWalls(game.map?.bearCave, camera, rect);
  drawConfiguredDungeonWalls(game.map?.rogabogu, camera, rect);
  drawConfiguredDungeonWalls(game.map?.yrgmaDim, camera, rect);
  drawConfiguredDungeonWalls(game.map?.badgeria, camera, rect);
  drawRuinsOfKebaanWalls(game.map?.kebaan?.ruins, camera, rect);
  for (const passage of game.map.passages) {
    if (boundsVisible(passage.bounds, camera, rect, 260)) {
      drawPassage(passage, passageFillStyle(passage));
    }
  }
  for (const area of game.map.areas) {
    if (area.name !== RATZKHAN_AREA_NAME && area.name !== DIARRH_REALM_AREA_NAME) continue;
    if (boundsVisible(area.bounds || boundsForPoints(area.boundary || []), camera, rect, 260)) {
      drawAreaShape(area, areaFillStyle(area));
      drawGroundTexturePatches(area);
    }
  }
  drawGraveyardPatches();

  ctx.save();
  clipPlayableMap();
  const grid = RANGE_UNIT;
  const minX = Math.floor(camera.x / grid) * grid;
  const maxX = camera.x + rect.width + grid;
  const minY = Math.floor(camera.y / grid) * grid;
  const maxY = camera.y + rect.height + grid;
  ctx.strokeStyle = "rgba(130, 169, 107, 0.055)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = minX; x < maxX; x += grid) {
    ctx.moveTo(x, minY);
    ctx.lineTo(x, maxY);
  }
  for (let y = minY; y < maxY; y += grid) {
    ctx.moveTo(minX, y);
    ctx.lineTo(maxX, y);
  }
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}

function drawDungeonWalls(walls, texture, fallback, camera, rect, options = {}) {
  walls = walls || [];
  if (!walls.length) return;
  const fill = houseTextureFill(texture, fallback);
  ctx.save();
  ctx.fillStyle = fill;
  ctx.strokeStyle = "rgba(12, 12, 12, 0.42)";
  ctx.lineWidth = 2;
  for (const wall of walls) {
    if (!boundsVisible({
      minX: wall.x,
      minY: wall.y,
      maxX: wall.x + wall.w,
      maxY: wall.y + wall.h
    }, camera, rect, 80)) continue;
    const polygon = wall.polygon || null;
    const traceWall = () => {
      ctx.beginPath();
      if (polygon?.length) {
        polygon.forEach((point, index) => {
          if (index === 0) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        });
        ctx.closePath();
      } else {
        ctx.rect(wall.x, wall.y, wall.w, wall.h);
      }
    };
    traceWall();
    ctx.fill();
    if (options.darken) {
      ctx.save();
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = `rgba(0, 0, 0, ${options.darken})`;
      traceWall();
      ctx.fill();
      ctx.restore();
    }
    if (options.brighten) {
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = `rgba(255, 255, 255, ${options.brighten})`;
      traceWall();
      ctx.fill();
      ctx.restore();
    }
    traceWall();
    ctx.stroke();
  }
  ctx.restore();
}

function drawConfiguredDungeonWalls(dungeon, camera, rect) {
  if (!dungeon?.wallRects?.length) return;
  const texture = spriteFromPath(dungeon.wallTexture || "./assets/ground/whisperspring-wall.png");
  drawDungeonWalls(dungeon.wallRects, texture, "#4f5b44", camera, rect, { brighten: 0.12 });
}

function rebuildGroundCache(rect, camera) {
  const margin = 360;
  const width = Math.ceil(rect.width + margin * 2);
  const height = Math.ceil(rect.height + margin * 2);
  const originX = Math.floor((camera.x - margin) / 96) * 96;
  const originY = Math.floor((camera.y - margin) / 96) * 96;
  if (groundCache.canvas.width !== width || groundCache.canvas.height !== height) {
    groundCache.canvas.width = width;
    groundCache.canvas.height = height;
  }
  const mainCtx = ctx;
  try {
    ctx = groundCache.ctx;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, height);
    drawStaticGroundLayer({ width, height }, { x: originX, y: originY });
  } finally {
    ctx = mainCtx;
  }
  groundCache.x = originX;
  groundCache.y = originY;
  groundCache.width = width;
  groundCache.height = height;
  groundCache.map = game.map;
  groundCache.valid = true;
}

function drawGround(rect, camera) {
  if (!groundCacheCovers(camera, rect)) rebuildGroundCache(rect, camera);
  ctx.drawImage(groundCache.canvas, groundCache.x - camera.x, groundCache.y - camera.y);

  ctx.save();
  ctx.translate(-camera.x, -camera.y);
  ctx.save();
  clipPlayableMap();

  const visiblePuddleQuery = viewportQuery(camera, rect, 160);
  for (const oasisGround of game.map?.oasisGrounds || []) if (puddleVisible(oasisGround, camera, rect)) drawOasisGround(oasisGround);
  for (const mudBank of game.map?.mudBanks || []) if (puddleVisible(mudBank, camera, rect)) drawRiverMudBank(mudBank);
  const puddles = nearbyPuddles
    ? nearbyPuddles(visiblePuddleQuery.x, visiblePuddleQuery.y, visiblePuddleQuery.radius)
    : game.map.puddles || [];
  for (const puddle of puddles) if (puddleVisible(puddle, camera, rect)) drawPuddle(puddle);
  drawGandersvilleTownSquare();
  drawHouseInteriors(camera, rect);
  ctx.restore();

  drawMapObstacles(camera, rect);
  drawWhisperspringEntrances(camera);
  if (game.showCollision) drawCollisionBoundaries(camera, rect);

  ctx.restore();
}

function drawRuinsOfKebaanWalls(ruins, camera, rect) {
  if (!ruins) return;
  drawDungeonWalls(ruins.wallRects, sprites.ground.desertWall, "#76614c", camera, rect, { darken: 0.12 });
}

function drawRuinsOfKebaanRoofs(ruins, camera, rect) {
  if (!ruins) return;
  const roofRects = ruins.roofRects || [];
  if (!roofRects.length) return;
  const fill = houseTextureFill(sprites.ground.desertRuinsRoof, "#6f5638");
  ctx.save();
  ctx.fillStyle = fill;
  ctx.strokeStyle = "rgba(38, 25, 14, 0.38)";
  ctx.lineWidth = 2;
  for (const roof of roofRects) {
    if (!boundsVisible({
      minX: roof.x,
      minY: roof.y,
      maxX: roof.x + roof.w,
      maxY: roof.y + roof.h
    }, camera, rect, 80)) continue;
    ctx.fillRect(roof.x, roof.y, roof.w, roof.h);
    ctx.strokeRect(roof.x, roof.y, roof.w, roof.h);
  }
  ctx.restore();
}

function drawMapObstacles(camera, rect) {
  const query = viewportQuery(camera, rect, 260);
  const obstacles = nearbyObstacles
    ? nearbyObstacles(query.x, query.y, query.radius)
    : game.map.obstacles || [];
  for (const obstacle of obstacles) {
    if (obstacle.kind === "whisperspring-entrance") continue;
    if (!obstacleVisible(obstacle, camera, rect)) continue;
    if (obstacle.sprite) {
      drawPropObstacle(obstacle, spriteFromPath(obstacle.sprite), Number(obstacle.size) || obstacle.radius * 3.4);
    } else if (obstacle.kind === "gnarled-tree" || obstacle.kind === "dead-tree") {
      drawDeadTree(obstacle);
    } else if (obstacle.kind === "pine-tree") {
      drawPropObstacle(obstacle, sprites.props.pineTree, obstacle.radius * 3.7);
    } else if (obstacle.kind === "snowy-pine-tree") {
      drawPropObstacle(obstacle, sprites.props.snowyPineTree, obstacle.radius * 3.7);
    } else if (obstacle.kind === "bush") {
      drawPropObstacle(obstacle, sprites.props.bush, obstacle.radius * 3.0);
    } else if (obstacle.kind === "ruined-pillar") {
      drawPropObstacle(obstacle, sprites.props.ruinedPillar, obstacle.radius * 3.8);
    } else if (obstacle.kind === "ruined-statue") {
      drawPropObstacle(obstacle, sprites.props.ruinedStatue, obstacle.radius * 3.8);
    } else if (obstacle.kind === "mushroom") {
      drawPropObstacle(obstacle, sprites.props.mushroom, obstacle.radius * 3.0);
    } else if (obstacle.kind === "tropical-tree") {
      drawPropObstacle(obstacle, sprites.props.tropicalTree, obstacle.radius * 3.9);
    } else if (obstacle.kind === "palm-tree") {
      drawPropObstacle(obstacle, sprites.props.palmTree, obstacle.radius * 4.1);
    } else if (obstacle.kind === "cactus") {
      drawPropObstacle(obstacle, sprites.props.cactus, obstacle.radius * 3.5);
    } else if (obstacle.kind === "tumbleweed") {
      drawPropObstacle(obstacle, sprites.props.tumbleweed, obstacle.radius * 2.8);
    } else if (obstacle.kind === "red-boulder") {
      drawPropObstacle(obstacle, sprites.props.redBoulder, obstacle.radius * 2.65);
    } else if (obstacle.kind === "snowy-boulder") {
      drawPropObstacle(obstacle, sprites.props.snowyBoulder, obstacle.radius * 2.65);
    } else if (obstacle.kind === "snow-covered-dead-tree") {
      drawPropObstacle(obstacle, sprites.props.snowCoveredDeadTree, obstacle.radius * 3.6);
    } else if (obstacle.kind === "desert-ruin") {
      drawPropObstacle(obstacle, sprites.props.desertRuin, obstacle.radius * 3.8);
    } else if (obstacle.kind === "jungle-ruin") {
      drawPropObstacle(obstacle, sprites.props.jungleRuin, obstacle.radius * 3.8);
    } else if (obstacle.kind === "summer-tree") {
      drawPropObstacle(obstacle, sprites.props.summerTree, obstacle.radius * 3.9);
    } else if (obstacle.kind === "summer-bush") {
      drawPropObstacle(obstacle, sprites.props.summerBush, obstacle.radius * 3.2);
    } else if (obstacle.kind === "plum-tree") {
      drawPropObstacle(obstacle, sprites.props.plumTree, obstacle.radius * 3.9);
    } else if (obstacle.kind === "autumn-tree") {
      drawPropObstacle(obstacle, sprites.props.autumnTree, obstacle.radius * 3.9);
    } else if (obstacle.kind === "autumn-bush") {
      drawPropObstacle(obstacle, sprites.props.autumnBush, obstacle.radius * 3.2);
    } else if (obstacle.kind === "weeping-willow") {
      drawPropObstacle(obstacle, sprites.props.weepingWillow, obstacle.radius * 4.0);
    } else if (obstacle.kind === "enchanted-tree") {
      drawPropObstacle(obstacle, sprites.props.enchantedTree, obstacle.radius * 4.0);
    } else if (obstacle.kind === "ancient-tree") {
      drawPropObstacle(obstacle, sprites.props.ancientTree, obstacle.radius * 4.4);
    } else if (obstacle.kind === "gravestone") {
      drawGravestoneObstacle(obstacle);
    } else if (obstacle.kind === "city-building") {
      drawCityBuilding(obstacle);
    } else if (obstacle.kind === "tree") {
      if (!drawSprite(sprites.tree, obstacle.x, obstacle.y, obstacle.radius * 3.3)) {
        ctx.fillStyle = "#071208";
        ctx.beginPath();
        ctx.arc(obstacle.x, obstacle.y, obstacle.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#1d4a22";
        ctx.beginPath();
        ctx.arc(obstacle.x - obstacle.radius * 0.18, obstacle.y - obstacle.radius * 0.15, obstacle.radius * 0.75, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      if (!drawSprite(sprites.rock, obstacle.x, obstacle.y, obstacle.radius * 2.55)) {
        ctx.fillStyle = "#454a43";
        ctx.beginPath();
        ctx.arc(obstacle.x, obstacle.y, obstacle.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#232720";
        ctx.lineWidth = 3;
        ctx.stroke();
      }
    }
  }
}

function obstacleTopSpriteSpec(obstacle) {
  if (obstacle.kind === "gnarled-tree" || obstacle.kind === "dead-tree") {
    return { sprite: sprites.props.deadTree, size: obstacle.radius * 3.6, topRatio: 0.68 };
  }
  if (obstacle.kind === "pine-tree") return { sprite: sprites.props.pineTree, size: obstacle.radius * 3.7, topRatio: 0.68 };
  if (obstacle.kind === "snowy-pine-tree") return { sprite: sprites.props.snowyPineTree, size: obstacle.radius * 3.7, topRatio: 0.68 };
  if (obstacle.kind === "snowy-boulder") return { sprite: sprites.props.snowyBoulder, size: obstacle.radius * 2.65, topRatio: 0.58 };
  if (obstacle.kind === "snow-covered-dead-tree") return { sprite: sprites.props.snowCoveredDeadTree, size: obstacle.radius * 3.6, topRatio: 0.68 };
  if (obstacle.kind === "bush") return { sprite: sprites.props.bush, size: obstacle.radius * 3.0, topRatio: 0.64 };
  if (obstacle.kind === "ruined-pillar") return { sprite: sprites.props.ruinedPillar, size: obstacle.radius * 3.8, topRatio: 0.62 };
  if (obstacle.kind === "ruined-statue") return { sprite: sprites.props.ruinedStatue, size: obstacle.radius * 3.8, topRatio: 0.64 };
  if (obstacle.kind === "tropical-tree") return { sprite: sprites.props.tropicalTree, size: obstacle.radius * 3.9, topRatio: 0.68 };
  if (obstacle.kind === "palm-tree") return { sprite: sprites.props.palmTree, size: obstacle.radius * 4.1, topRatio: 0.72 };
  if (obstacle.kind === "cactus") return { sprite: sprites.props.cactus, size: obstacle.radius * 3.5, topRatio: 0.62 };
  if (obstacle.kind === "desert-ruin") return { sprite: sprites.props.desertRuin, size: obstacle.radius * 3.8, topRatio: 0.62 };
  if (obstacle.kind === "jungle-ruin") return { sprite: sprites.props.jungleRuin, size: obstacle.radius * 3.8, topRatio: 0.64 };
  if (obstacle.kind === "summer-tree") return { sprite: sprites.props.summerTree, size: obstacle.radius * 3.9, topRatio: 0.68 };
  if (obstacle.kind === "summer-bush") return { sprite: sprites.props.summerBush, size: obstacle.radius * 3.2, topRatio: 0.64 };
  if (obstacle.kind === "plum-tree") return { sprite: sprites.props.plumTree, size: obstacle.radius * 3.9, topRatio: 0.68 };
  if (obstacle.kind === "autumn-tree") return { sprite: sprites.props.autumnTree, size: obstacle.radius * 3.9, topRatio: 0.68 };
  if (obstacle.kind === "autumn-bush") return { sprite: sprites.props.autumnBush, size: obstacle.radius * 3.2, topRatio: 0.64 };
  if (obstacle.kind === "weeping-willow") return { sprite: sprites.props.weepingWillow, size: obstacle.radius * 4.0, topRatio: 0.72 };
  if (obstacle.kind === "enchanted-tree") return { sprite: sprites.props.enchantedTree, size: obstacle.radius * 4.0, topRatio: 0.68 };
  if (obstacle.kind === "ancient-tree") return { sprite: sprites.props.ancientTree, size: obstacle.radius * 4.4, topRatio: 0.7 };
  if (obstacle.kind === "tree") return { sprite: sprites.tree, size: obstacle.radius * 3.3, topRatio: 0.68 };
  return null;
}

function drawMapObstacleTops(camera, rect) {
  const query = viewportQuery(camera, rect, 260);
  const obstacles = nearbyObstacles
    ? nearbyObstacles(query.x, query.y, query.radius)
    : game.map.obstacles || [];
  for (const obstacle of obstacles) {
    const spec = obstacleTopSpriteSpec(obstacle);
    if (!spec) continue;
    if (!obstacleVisible(obstacle, camera, rect)) continue;
    drawSpriteTop(spec.sprite, obstacle.x, obstacle.y, spec.size, spec.topRatio);
  }
}

function drawMistClouds(camera, rect) {
  const clouds = game.map?.mistClouds || [];
  if (!clouds.length) return;
  const now = performance.now() / 1000;
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (const cloud of clouds) {
    const driftX = Math.sin(now * cloud.speed + cloud.phase) * cloud.drift;
    const driftY = Math.cos(now * cloud.speed * 0.76 + cloud.phase) * cloud.drift * 0.34;
    const x = cloud.x + driftX;
    const y = cloud.y + driftY;
    if (x + cloud.rx < camera.x || x - cloud.rx > camera.x + rect.width || y + cloud.ry < camera.y || y - cloud.ry > camera.y + rect.height) continue;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, Math.max(cloud.rx, cloud.ry));
    gradient.addColorStop(0, `rgba(214, 231, 220, ${cloud.alpha})`);
    gradient.addColorStop(0.42, `rgba(174, 205, 190, ${cloud.alpha * 0.75})`);
    gradient.addColorStop(1, "rgba(174, 205, 190, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(x, y, cloud.rx, cloud.ry, Math.sin(cloud.phase) * 0.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function shouldSmoothCharacterSprite(image) {
  return Boolean(image?.src && image.src.includes("/sprites/npcs/"));
}

function setSpriteSmoothing(enabled) {
  ctx.imageSmoothingEnabled = enabled;
  if (enabled) ctx.imageSmoothingQuality = "high";
}

function drawSprite(image, x, y, size, yOffset = 0) {
  if (!image.complete || !image.naturalWidth) return false;
  setSpriteSmoothing(shouldSmoothCharacterSprite(image));
  ctx.drawImage(image, x - size / 2, y - size / 2 + yOffset, size, size);
  return true;
}

function drawSpriteFacing(image, x, y, size, facingX = 1, yOffset = 0) {
  if (!image.complete || !image.naturalWidth) return false;
  setSpriteSmoothing(shouldSmoothCharacterSprite(image));
  ctx.save();
  ctx.translate(x, y);
  if (facingX < 0) ctx.scale(-1, 1);
  ctx.drawImage(image, -size / 2, -size / 2 + yOffset, size, size);
  ctx.restore();
  return true;
}

function npcSpriteFromConfig(npc, fallbackSprite = null) {
  const configured = npc?.sprite;
  if (!configured) return fallbackSprite;
  if (sprites.npcs[configured]) return sprites.npcs[configured];
  const normalized = String(configured).replace(/^\.\//, "");
  for (const [key, config] of Object.entries(window.SoulreaperNpcSprites?.sprites || {})) {
    const src = String(config.src || "").replace(/^\.\//, "");
    const nameKey = String(config.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
    const configuredKey = String(configured).toLowerCase().replace(/[^a-z0-9]+/g, "");
    if (src === normalized || key === configured || nameKey === configuredKey) return sprites.npcs[key];
  }
  return spriteFromPath(configured) || fallbackSprite;
}

function drawNpcSprite(npc, sprite, x = npc?.x, y = npc?.y, size = npc?.radius * 3.4, yOffset = -4) {
  const resolvedSprite = npcSpriteFromConfig(npc, sprite);
  const scale = Number(npc?.renderScale) || 1;
  return drawSprite(resolvedSprite, x, y, size * scale, yOffset);
}

function drawNamedNpc(npc, fallbackSprite = sprites.npcs.villagerMale) {
  if (!npc) return;
  if (!drawNpcSprite(npc, fallbackSprite)) {
    ctx.save();
    ctx.translate(npc.x, npc.y);
    ctx.fillStyle = "#d6cfbf";
    ctx.beginPath();
    ctx.arc(0, 0, npc.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#f0cf63";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();
  }
  drawNpcLabel(npc, npc.label || npc.name || "NPC");
  drawQuestMarkerForNpc(npc);
}

function drawSpriteTop(image, x, y, size, topRatio = 0.62) {
  if (!image.complete || !image.naturalWidth) return false;
  const sx = 0;
  const sy = 0;
  const sw = image.naturalWidth;
  const sh = image.naturalHeight * topRatio;
  const dx = x - size / 2;
  const dy = y - size / 2;
  const dw = size;
  const dh = size * topRatio;
  setSpriteSmoothing(shouldSmoothCharacterSprite(image));
  ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
  return true;
}

function drawAreaShape(area, fill) {
  if (!area.dungeon) drawAreaEdgeBlend(area, fill);
  ctx.beginPath();
  for (const [index, point] of area.boundary.entries()) {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  }
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

function pathSegmentPoints(points, from = 0, to = 1) {
  if (!Array.isArray(points) || points.length < 2) return [];
  const segments = [];
  let total = 0;
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1];
    const b = points[i];
    const length = Math.hypot(b.x - a.x, b.y - a.y);
    segments.push({ a, b, start: total, end: total + length, length });
    total += length;
  }
  if (!total) return points.slice();
  const startDistance = Math.max(0, Math.min(1, from)) * total;
  const endDistance = Math.max(startDistance, Math.min(1, to)) * total;
  const result = [];
  const pointAt = (segment, distance) => {
    const t = segment.length ? (distance - segment.start) / segment.length : 0;
    return {
      x: segment.a.x + (segment.b.x - segment.a.x) * t,
      y: segment.a.y + (segment.b.y - segment.a.y) * t
    };
  };
  for (const segment of segments) {
    if (segment.end < startDistance || segment.start > endDistance) continue;
    if (!result.length) result.push(pointAt(segment, Math.max(startDistance, segment.start)));
    if (segment.end <= endDistance) result.push({ x: segment.b.x, y: segment.b.y });
    else {
      result.push(pointAt(segment, endDistance));
      break;
    }
  }
  return result;
}

function drawGroundTexturePatches(area) {
  if (!Array.isArray(area?.groundTexturePatches) || !area.groundTexturePatches.length) return;
  ctx.save();
  ctx.beginPath();
  for (const [index, point] of (area.boundary || []).entries()) {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  }
  ctx.closePath();
  ctx.clip();
  for (const patch of area.groundTexturePatches) {
    const image = spriteFromPath(patch.texture);
    const pattern = image?.complete && image.naturalWidth ? texturePatternFor(image) : null;
    const fill = pattern || areaFillColor({ name: area.name, groundTexture: patch.texture });
    ctx.strokeStyle = fill;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = Math.max(16, Number(patch.width || area.pathWidth || 320));
    const points = pathSegmentPoints(area.path, Number(patch.from ?? 0), Number(patch.to ?? 1));
    if (patch.kind === "path-segment" && points.length >= 2) {
      ctx.beginPath();
      for (const [index, point] of points.entries()) {
        if (index === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      }
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawAreaEdgeBlend(area, fill) {
  ctx.save();
  ctx.strokeStyle = fill;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  const bands = [
    { width: 150, alpha: 0.05 },
    { width: 88, alpha: 0.12 },
    { width: 38, alpha: 0.24 }
  ];
  for (const band of bands) {
    ctx.globalAlpha = band.alpha;
    ctx.lineWidth = band.width;
    ctx.beginPath();
    for (const [index, point] of area.boundary.entries()) {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    }
    ctx.closePath();
    ctx.stroke();
  }
  ctx.restore();
}

function areaFillColor(area) {
  if (area.surface === "water") return "rgba(67, 145, 211, 0.48)";
  if (area.surface === "glade") return "#17351d";
  if (area.surface === "whisperspring") return "#5d604f";
  if (area.surface === "rat-den") return "#4b3424";
  if (area.surface === "ratzkhan") return "#3f2b1d";
  if (area.surface === "ratzkhan-chamber") return "#3f2b1d";
  if (area.surface === "diarrh-floor") return "#3f2b1d";
  if (area.surface === "diarrh-slime") return "#6d9230";
  if (area.surface === "cathedral-floor") return "#494846";
  if (area.surface === "cathedral-carpet") return "#3a2325";
  if (area.surface === "cathedral-oldwood") return "#3e3023";
  if (area.surface === "desert-ruins-floor") return "#8b7046";
  if (area.name === FEN_AREA_NAME || area.name === FENHOLD_AREA_NAME) return "#142c1e";
  if (area.name === RAT_DEN_AREA_NAME) return "#4b3424";
  if (area.name === RATZKHAN_AREA_NAME) return "#3f2b1d";
  if (area.name === DIARRH_REALM_AREA_NAME) return "#3f2b1d";
  if (area.name === BEAR_CAVE_AREA_NAME) return "#4b3424";
  if (area.name === GLADE_AREA_NAME) return "#17351d";
  if (area.name === EVERMIST_GLADE_NAME) return "#132817";
  if (area.name === WHISPERSPRING_AREA_NAME) return "#5d604f";
  if (area.name === WYNDHELM_CATHEDRAL_AREA_NAME) return "#494846";
  if (area.name === GRIMSWOOD_PATH_NAME) return "#142c1e";
  if (area.name === GANDERSVILLE_AREA_NAME) return "#17351d";
  if (area.name === WYNDHELM_AREA_NAME) return "#17351d";
  if (area.name === CROWING_FIELDS_AREA_NAME) return "#8f773d";
  if (area.name === GOBBA_AREA_NAME) return "#456333";
  if (area.name === FIRECRY_PEAK_AREA_NAME) return "#2a2724";
  if (area.name === WASTES_OF_KEBAAN_AREA_NAME || area.name === KEBAAN_OASIS_AREA_NAME) return "#9f7a43";
  return "#132817";
}

function areaTexture(area) {
  const areaName = typeof area === "string" ? area : area.name;
  const surface = typeof area === "string" ? null : area.surface;
  const groundTexture = typeof area === "string" ? null : area.groundTexture;
  if (surface === "water") return null;
  if (groundTexture) return spriteFromPath(groundTexture);
  if (surface === "glade") return sprites.ground.ganderswoodGlade;
  if (surface === "whisperspring") return sprites.ground.whisperspring;
  if (surface === "rat-den") return sprites.ground.ratDen;
  if (surface === "ratzkhan") return sprites.ground.ratzkhan;
  if (surface === "ratzkhan-chamber") return sprites.ground.ratzkhanChamber;
  if (surface === "diarrh-floor") return sprites.ground.ratzkhanChamber;
  if (surface === "diarrh-slime") return sprites.ground.slimepool;
  if (surface === "cathedral-floor") return sprites.ground.cathFloor;
  if (surface === "cathedral-carpet") return sprites.ground.cathCarpet;
  if (surface === "cathedral-oldwood") return sprites.ground.oldwood;
  if (surface === "cathedral-courtyard") return sprites.ground.ganderswoodFen;
  if (surface === "desert-ruins-floor") return sprites.ground.desertRuinsFloor;
  const configuredTexture = devAreaConfigs[areaName]?.environment?.groundTexture;
  if (configuredTexture) return spriteFromPath(configuredTexture);
  if (areaName === FEN_AREA_NAME || areaName === FENHOLD_AREA_NAME) return sprites.ground.ganderswoodFen;
  if (areaName === RAT_DEN_AREA_NAME) return sprites.ground.ratDen;
  if (areaName === RATZKHAN_AREA_NAME) return sprites.ground.ratzkhan;
  if (areaName === BEAR_CAVE_AREA_NAME) return sprites.ground.ratDen;
  if (areaName === GLADE_AREA_NAME) return sprites.ground.ganderswoodGlade;
  if (areaName === EVERMIST_GLADE_NAME) return sprites.ground.evermistGlade;
  if (areaName === WHISPERSPRING_AREA_NAME) return sprites.ground.whisperspring;
  if (areaName === WYNDHELM_CATHEDRAL_AREA_NAME) return sprites.ground.cathFloor;
  if (areaName === GRIMSWOOD_PATH_NAME) return sprites.ground.grimswoodPass;
  if (areaName === GANDERSVILLE_AREA_NAME) return sprites.ground.wyndhelm;
  if (areaName === WYNDHELM_AREA_NAME) return sprites.ground.wyndhelm;
  if (areaName === CROWING_FIELDS_AREA_NAME) return sprites.ground.crowingFields;
  if (areaName === GOBBA_AREA_NAME) return sprites.ground.gobba;
  if (areaName === FIRECRY_PEAK_AREA_NAME) return sprites.ground.ash;
  if (areaName === WASTES_OF_KEBAAN_AREA_NAME || areaName === KEBAAN_OASIS_AREA_NAME) return sprites.ground.sand;
  return sprites.ground.ganderswood;
}

function areaFillStyle(area) {
  const image = areaTexture(area);
  if (!image?.complete || !image.naturalWidth) return areaFillColor(area);
  const pattern = texturePatternFor(image);
  return pattern || areaFillColor(area);
}

function passageFillColor(passage) {
  return areaFillColor({ name: passage.areaName, surface: passage.surface });
}

function passageFillStyle(passage) {
  return areaFillStyle({ name: passage.areaName, surface: passage.surface });
}

function drawFeatheredPassageFill(passage, fill) {
  const bands = [
    { scale: 1.00, alpha: 0.22 },
    { scale: 0.70, alpha: 0.52 },
    { scale: 0.42, alpha: 0.98 }
  ];
  ctx.save();
  ctx.strokeStyle = fill;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (const band of bands) {
    ctx.globalAlpha = band.alpha;
    ctx.lineWidth = Math.max(2, passage.width * band.scale);
    ctx.beginPath();
    ctx.moveTo(passage.x1, passage.y1);
    ctx.lineTo(passage.x2, passage.y2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawDungeonVoidBackground(background, camera, rect) {
  if (!background) return;
  const visible = background.x + background.w > camera.x
    && background.x < camera.x + rect.width
    && background.y + background.h > camera.y
    && background.y < camera.y + rect.height;
  if (!visible) return;
  ctx.save();
  ctx.fillStyle = "#000";
  ctx.fillRect(background.x, background.y, background.w, background.h);
  ctx.restore();
}

function drawWhisperspringVoid(camera, rect) {
  drawDungeonVoidBackground(game.map?.whisperspring?.background, camera, rect);
  drawDungeonVoidBackground(game.map?.diarrhRealm?.background, camera, rect);
}

function traceRiverLikePath(points) {
  if (!points?.length) return;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  if (points.length === 2) {
    ctx.lineTo(points[1].x, points[1].y);
  } else {
    for (let i = 1; i < points.length - 1; i += 1) {
      const midX = (points[i].x + points[i + 1].x) / 2;
      const midY = (points[i].y + points[i + 1].y) / 2;
      ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
    }
    const last = points[points.length - 1];
    ctx.lineTo(last.x, last.y);
  }
}

function drawRiverMudBank(mudBank) {
  const points = mudBank.points || [];
  if (points.length < 2) return;
  const mudFill = texturePatternFor(sprites.ground.ratDen) || "#4b3424";
  const width = mudBank.width || 245;
  ctx.save();
  ctx.strokeStyle = mudFill;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const edgePasses = [
    { extra: 72, alpha: 0.08 },
    { extra: 48, alpha: 0.14 },
    { extra: 26, alpha: 0.24 },
    { extra: 0, alpha: 0.72 }
  ];
  for (const pass of edgePasses) {
    ctx.globalAlpha = pass.alpha;
    ctx.lineWidth = width + pass.extra;
    traceRiverLikePath(points);
    ctx.stroke();
  }
  ctx.restore();
}

function traceBlobPath(blob, scale = 1) {
  const points = (blob.wobble || []).map((wobble, index, list) => {
    const angle = (index / list.length) * Math.PI * 2;
    return {
      x: Math.cos(angle) * blob.rx * scale * wobble,
      y: Math.sin(angle) * blob.ry * scale * wobble
    };
  });
  ctx.beginPath();
  if (!points.length) {
    ctx.ellipse(0, 0, blob.rx * scale, blob.ry * scale, 0, 0, Math.PI * 2);
    return;
  }
  for (let i = 0; i < points.length; i += 1) {
    const current = points[i];
    const next = points[(i + 1) % points.length];
    const following = points[(i + 2) % points.length];
    const midX = (current.x + next.x) / 2;
    const midY = (current.y + next.y) / 2;
    const nextMidX = (next.x + following.x) / 2;
    const nextMidY = (next.y + following.y) / 2;
    if (i === 0) ctx.moveTo(midX, midY);
    ctx.quadraticCurveTo(next.x, next.y, nextMidX, nextMidY);
  }
  ctx.closePath();
}

function drawOasisGround(oasisGround) {
  const oasisFill = texturePatternFor(sprites.ground.oasis) || "#5f7d3e";
  ctx.save();
  ctx.translate(oasisGround.x, oasisGround.y);
  ctx.fillStyle = oasisFill;
  const passes = [
    { scale: 1.14, alpha: 0.08 },
    { scale: 1.08, alpha: 0.16 },
    { scale: 1.02, alpha: 0.34 },
    { scale: 0.95, alpha: 0.74 }
  ];
  for (const pass of passes) {
    ctx.globalAlpha = pass.alpha;
    traceBlobPath(oasisGround, pass.scale);
    ctx.fill();
  }
  ctx.restore();
}

function drawPuddle(puddle) {
  const lava = isLavaFeature(puddle);
  const waterFill = lava
    ? texturePatternFor(sprites.ground.lava) || "rgb(207, 65, 28)"
    : texturePatternFor(sprites.ground.water) || "rgb(67, 145, 211)";
  if (puddle.kind === "river") {
    const points = puddle.points || [];
    if (points.length < 2) return;
    ctx.save();
    ctx.globalAlpha = 0.66;
    ctx.strokeStyle = waterFill;
    ctx.lineWidth = puddle.width || 150;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    traceRiverLikePath(points);
    ctx.stroke();
    ctx.restore();
    return;
  }
  if (puddle.kind === "rect-water" || puddle.kind === "rect-lava") {
    ctx.save();
    ctx.globalAlpha = 0.66;
    ctx.fillStyle = waterFill;
    ctx.beginPath();
    ctx.roundRect(puddle.x, puddle.y, puddle.w, puddle.h, Math.min(puddle.w, puddle.h) * 0.18);
    ctx.fill();
    ctx.restore();
    return;
  }
  if (puddle.kind === "polygon-water" || puddle.kind === "polygon-lava") {
    const boundary = puddle.boundary || [];
    if (!boundary.length) return;
    ctx.save();
    ctx.globalAlpha = 0.66;
    ctx.fillStyle = waterFill;
    ctx.beginPath();
    boundary.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    return;
  }
  ctx.save();
  ctx.globalAlpha = 0.66;
  ctx.translate(puddle.x, puddle.y);
  ctx.fillStyle = waterFill;
  traceBlobPath(puddle);
  ctx.fill();
  ctx.restore();
}

function drawWaterOverSubmergedEntrance(entrance) {
  if (!entrance?.waterSubmerged) return;
  const size = entrance.size || 120;
  const waterFill = texturePatternFor(sprites.ground.water) || "rgb(67, 145, 211)";
  const puddles = nearbyPuddles
    ? nearbyPuddles(entrance.x, entrance.y, size)
    : game.map?.puddles || [];
  const waterFeatures = puddles.filter(puddle =>
    (!entrance.waterFeatureKind || puddle.kind === entrance.waterFeatureKind)
    && pointInPuddle(entrance.x, entrance.y + size * 0.22, puddle, 0)
  );
  if (!waterFeatures.length) return;
  ctx.save();
  ctx.beginPath();
  ctx.rect(entrance.x - size / 2, entrance.y, size, size / 2);
  ctx.clip();
  ctx.globalAlpha = 0.66;
  ctx.fillStyle = waterFill;
  for (const puddle of waterFeatures) {
    if (puddle.kind === "rect-water") {
      ctx.beginPath();
      ctx.roundRect(puddle.x, puddle.y, puddle.w, puddle.h, Math.min(puddle.w, puddle.h) * 0.18);
      ctx.fill();
    } else {
      ctx.save();
      ctx.translate(puddle.x, puddle.y);
      traceBlobPath(puddle);
      ctx.fill();
      ctx.restore();
    }
  }
  ctx.restore();
}

function waterOverlayBoundsForUnit(unit) {
  const radius = unit?.radius || 22;
  const width = Math.max(radius * 3.8, 82);
  const top = unit.y - radius * 0.06;
  return {
    x: unit.x - width / 2,
    y: top,
    w: width,
    h: Math.max(radius * 2.9, 72)
  };
}

function traceWaterOverlayClipForUnit(unit) {
  const radius = unit?.radius || 22;
  const width = Math.max(radius * 3.8, 82);
  const height = Math.max(radius * 2.7, 68);
  ctx.beginPath();
  ctx.ellipse(unit.x, unit.y + radius * 0.82, width / 2, height / 2, 0, 0, Math.PI * 2);
}

function unitWaterPuddles(unit, camera, rect) {
  if (!unit || unitFlying(unit)) return [];
  const bounds = waterOverlayBoundsForUnit(unit);
  if (!boundsVisible({
    minX: bounds.x,
    minY: bounds.y,
    maxX: bounds.x + bounds.w,
    maxY: bounds.y + bounds.h
  }, camera, rect, 40)) return [];
  const radius = Math.max(unit.radius || 18, 28);
  const candidates = nearbyPuddles
    ? nearbyPuddles(unit.x, unit.y, radius + 80)
    : game.map?.puddles || [];
  const sampleY = unit.y + radius * 0.7;
  return candidates.filter(puddle => pointInPuddle(unit.x, unit.y, puddle, radius * 0.25)
    || pointInPuddle(unit.x, sampleY, puddle, radius * 0.35)
    || pointInPuddle(unit.x - radius * 0.45, sampleY, puddle, radius * 0.2)
    || pointInPuddle(unit.x + radius * 0.45, sampleY, puddle, radius * 0.2));
}

function collectSubmergedUnits(visibleEnemies, camera, rect) {
  const units = [];
  const add = unit => {
    if (!unit || unitFlying(unit) || !unitVisible(unit, camera, rect, 130)) return;
    if (unitWaterPuddles(unit, camera, rect).length) units.push(unit);
  };
  for (const enemy of visibleEnemies || []) add(enemy);
  add(game.player);
  for (const peer of game.multiplayer?.peers?.values?.() || []) {
    if (peer.area && peer.area !== currentPlayerAreaName()) continue;
    if (remotePlayerFlying(peer)) continue;
    add({ ...peer, radius: peer.radius || game.player.radius || 24 });
  }
  const namedNpcs = [
    game.map?.gvada,
    game.map?.pleezix,
    game.map?.sharlene,
    game.map?.mordren,
    game.map?.cecil,
    game.map?.theodora,
    game.map?.shopkeeper,
    game.map?.huntsmanRobb,
    game.map?.blacksmithFredward,
    game.map?.tailorAntonia,
    game.map?.barbarianessSkjoldma,
    game.map?.chaplainSonsam,
    game.map?.alchemistClaristra,
    game.map?.juanTabo,
    game.map?.lordYantos,
    game.map?.hereticOswaldo,
    game.map?.hereticSlayleigh,
    game.map?.highPriestessSierra,
    game.map?.magisterMaimon,
    game.map?.trainer,
    game.map?.gladeTrainer,
    ...(game.map?.configuredNpcs || []),
    ...(game.map?.bumsforkNpcs || [])
  ];
  namedNpcs.forEach(add);
  return units;
}

function drawWaterOverSubmergedUnits(visibleEnemies, camera, rect) {
  const units = collectSubmergedUnits(visibleEnemies, camera, rect);
  if (!units.length) return;
  for (const unit of units) {
    const puddles = unitWaterPuddles(unit, camera, rect);
    if (!puddles.length) continue;
    ctx.save();
    traceWaterOverlayClipForUnit(unit);
    ctx.clip();
    for (const puddle of puddles) {
      if (puddleVisible(puddle, camera, rect)) drawPuddle(puddle);
    }
    ctx.restore();
  }
}

function drawGraveyardPatches() {
  const graveyards = game.map?.graveyards?.length
    ? game.map.graveyards
    : [game.map?.ganderswoodGraveyard].filter(Boolean);
  if (!graveyards.length) return;
  const image = sprites.ground.ratDen;
  const pattern = texturePatternFor(image);
  const fill = pattern || "#4b3424";
  const bands = [
    { expand: 38, alpha: 0.18 },
    { expand: 22, alpha: 0.36 },
    { expand: 8, alpha: 0.68 },
    { expand: 0, alpha: 1 }
  ];
  ctx.save();
  for (const graveyard of graveyards) {
    for (const band of bands) {
      const x = graveyard.x - graveyard.w / 2 - band.expand;
      const y = graveyard.y - graveyard.h / 2 - band.expand;
      const w = graveyard.w + band.expand * 2;
      const h = graveyard.h + band.expand * 2;
      ctx.globalAlpha = band.alpha;
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, (graveyard.cornerRadius || 64) + band.expand);
      ctx.fill();
    }
  }
  ctx.restore();
}

function drawWhisperspringEntrances(camera) {
  const query = viewportQuery(camera, camera, 260);
  const obstacles = nearbyObstacles
    ? nearbyObstacles(query.x, query.y, query.radius)
    : game.map?.obstacles || [];
  for (const entrance of obstacles) {
    if (entrance.kind !== "whisperspring-entrance") continue;
    const visible = entrance.x + entrance.size / 2 > camera.x
      && entrance.x - entrance.size / 2 < camera.x + camera.width
      && entrance.y + entrance.size / 2 > camera.y
      && entrance.y - entrance.size / 2 < camera.y + camera.height;
    if (!visible) continue;
    const sprite = entrance.sprite === "wyndhelm-cathedral"
      ? sprites.wyndhelmCathedralEntrance
      : entrance.sprite === "mine-entrance"
        ? sprites.mineEntrance
      : entrance.sprite === "underneath-entrance"
        ? sprites.underneathEntrance
        : entrance.sprite === "yrgma-dim"
          ? sprites.yrgmaDimEntrance
          : entrance.sprite === "cave-entrance"
            ? sprites.caveEntrance
            : sprites.whisperspringEntrance;
    if (!drawSprite(sprite, entrance.x, entrance.y, entrance.size)) {
      ctx.save();
      ctx.translate(entrance.x, entrance.y);
      ctx.fillStyle = "#5d604f";
      ctx.strokeStyle = "#22281e";
      ctx.lineWidth = 4;
      ctx.fillRect(-entrance.size * 0.42, -entrance.size * 0.46, entrance.size * 0.84, entrance.size * 0.78);
      ctx.strokeRect(-entrance.size * 0.42, -entrance.size * 0.46, entrance.size * 0.84, entrance.size * 0.78);
      ctx.fillStyle = "#11180f";
      ctx.beginPath();
      ctx.roundRect(-entrance.size * 0.14, entrance.size * 0.08, entrance.size * 0.28, entrance.size * 0.34, 18);
      ctx.fill();
      ctx.restore();
    }
    drawWaterOverSubmergedEntrance(entrance);
  }
}

function drawCollisionBoundaries(camera, rect) {
  ctx.save();
  ctx.strokeStyle = "rgba(255, 207, 102, 0.92)";
  ctx.fillStyle = "rgba(255, 207, 102, 0.12)";
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 5]);
  for (const house of game.map?.houses || []) {
    for (const block of house.blocks || []) {
      const visible = block.x + block.w > camera.x
        && block.x < camera.x + rect.width
        && block.y + block.h > camera.y
        && block.y < camera.y + rect.height;
      if (!visible) continue;
      ctx.beginPath();
      ctx.rect(block.x, block.y, block.w, block.h);
      ctx.fill();
      ctx.stroke();
    }
  }
  const query = viewportQuery(camera, rect, 260);
  const obstacles = nearbyObstacles
    ? nearbyObstacles(query.x, query.y, query.radius)
    : game.map?.obstacles || [];
  for (const obstacle of obstacles) {
    if (!obstacleVisible(obstacle, camera, rect)) continue;
    if (obstacle.kind === "ruins-wall") continue;
    if (obstacle.kind === "city-building") {
      ctx.beginPath();
      ctx.rect(obstacle.x - obstacle.w / 2, obstacle.y - obstacle.h / 2, obstacle.w, obstacle.h);
      ctx.fill();
      ctx.stroke();
    } else if (obstacle.kind === "whisperspring-entrance") {
      for (const block of obstacle.blockRects || []) {
        ctx.beginPath();
        ctx.rect(obstacle.x + block.x, obstacle.y + block.y, block.w, block.h);
        ctx.fill();
        ctx.stroke();
      }
      ctx.setLineDash([3, 4]);
      ctx.strokeStyle = "rgba(97, 215, 255, 0.9)";
      ctx.beginPath();
      ctx.arc(obstacle.door.x, obstacle.door.y, obstacle.door.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "rgba(255, 207, 102, 0.92)";
      ctx.setLineDash([8, 5]);
    } else {
      ctx.beginPath();
      ctx.arc(obstacle.x, obstacle.y, obstacle.radius || 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }
  ctx.restore();
}

function playerInsideHouse(house) {
  return pointInsideHouse(house, game.player.x, game.player.y, game.player.radius * 0.3);
}

function houseTextureFill(image, fallback) {
  if (!image?.complete || !image.naturalWidth) return fallback;
  const pattern = texturePatternFor(image);
  return pattern || fallback;
}

function houseRoofImageFor(texture) {
  if (texture === "ganderswood") return sprites.ground.ganderswood;
  if (texture === "spooky") return sprites.ground.spookyRoof;
  if (texture === "greyRoof" || texture === "grey-roof") return sprites.ground.greyRoof;
  if (texture === "theodoraRoof" || texture === "redShingles") return sprites.ground.theodoraRoof;
  if (texture === "thatchedCircleRoof") return sprites.ground.thatchedCircleRoof;
  if (texture === "circularHouseRoof" || texture === "purpleCircularShingles") return sprites.ground.circularHouseRoof;
  if (texture === "thatch" || texture === "houseRoof") return sprites.ground.houseRoof;
  return sprites.ground.houseRoof;
}

function houseRoofFallbackFor(texture) {
  if (texture === "ganderswood") return "#17351d";
  if (texture === "spooky") return "#25202a";
  if (texture === "greyRoof" || texture === "grey-roof") return "#5c5f5d";
  if (texture === "theodoraRoof" || texture === "redShingles") return "#9b2324";
  if (texture === "thatchedCircleRoof") return "#8a6232";
  if (texture === "circularHouseRoof" || texture === "purpleCircularShingles") return "#5b3c85";
  if (texture === "thatch") return "#8a6232";
  return "#8a6232";
}

function houseFloorImageFor(texture) {
  if (texture === "ratDen" || texture === "rat-den") return sprites.ground.ratDen;
  if (texture === "gobbaStronghold" || texture === "gobba-stronghold") return sprites.ground.gobbaStronghold;
  if (texture === "oldwood") return sprites.ground.oldwood;
  if (texture === "greyTiles" || texture === "grey-tiles") return sprites.ground.greyTiles;
  if (texture === "cathCarpet" || texture === "cathedral-carpet") return sprites.ground.cathCarpet;
  if (texture === "mageGuildCarpet" || texture === "mage-guild-carpet") return sprites.ground.mageGuildCarpet;
  if (texture === "hereticCarpet" || texture === "heretic-carpet") return sprites.ground.hereticCarpet;
  if (texture === "stoneTiles" || texture === "stone-tiles") return sprites.ground.stoneTiles;
  return sprites.ground.houseFloor;
}

function houseFloorFallbackFor(texture) {
  if (texture === "ratDen" || texture === "rat-den") return "#4b3424";
  if (texture === "gobbaStronghold" || texture === "gobba-stronghold") return "#4b3424";
  if (texture === "oldwood") return "#3e3023";
  if (texture === "greyTiles" || texture === "grey-tiles") return "#666864";
  if (texture === "cathCarpet" || texture === "cathedral-carpet") return "#3a2325";
  if (texture === "mageGuildCarpet" || texture === "mage-guild-carpet") return "#35224d";
  if (texture === "hereticCarpet" || texture === "heretic-carpet") return "#33202a";
  if (texture === "stoneTiles" || texture === "stone-tiles") return "#4d4a43";
  return "#6b4527";
}

function houseWallImageFor(texture) {
  if (texture === "woodenposts" || texture === "woodenPosts") return sprites.ground.woodenPosts;
  return sprites.ground.houseWall;
}

function houseWallFallbackFor(texture) {
  if (texture === "woodenposts" || texture === "woodenPosts") return "#5a4028";
  return "#77786f";
}

function circularHouseFloorTextureFits(texture) {
  return texture === "mageGuildCarpet"
    || texture === "mage-guild-carpet"
    || texture === "hereticCarpet"
    || texture === "heretic-carpet";
}

function isGobbaStrongholdFloorTexture(texture) {
  return texture === "gobbaStronghold" || texture === "gobba-stronghold";
}

function drawCircularFloorWithSoftEdge(floor, floorImage, floorFallback) {
  if (!floor?.radius || typeof document === "undefined") return false;
  const size = Math.ceil(floor.radius * 2);
  const buffer = document.createElement("canvas");
  buffer.width = size;
  buffer.height = size;
  const bufferCtx = buffer.getContext("2d");
  if (!bufferCtx) return false;
  const radius = size / 2;
  bufferCtx.imageSmoothingEnabled = false;
  bufferCtx.save();
  bufferCtx.beginPath();
  bufferCtx.arc(radius, radius, radius, 0, Math.PI * 2);
  bufferCtx.clip();
  if (floorImage?.complete && floorImage.naturalWidth) {
    const pattern = bufferCtx.createPattern(floorImage, "repeat");
    bufferCtx.fillStyle = pattern || floorFallback;
  } else {
    bufferCtx.fillStyle = floorFallback;
  }
  bufferCtx.fillRect(0, 0, size, size);
  bufferCtx.restore();

  const fade = Math.max(34, Math.min(82, floor.radius * 0.16));
  const gradient = bufferCtx.createRadialGradient(radius, radius, Math.max(0, radius - fade), radius, radius, radius);
  gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0.82)");
  bufferCtx.save();
  bufferCtx.globalCompositeOperation = "destination-out";
  bufferCtx.fillStyle = gradient;
  bufferCtx.fillRect(0, 0, size, size);
  bufferCtx.restore();

  ctx.drawImage(buffer, floor.x - radius, floor.y - radius);
  return true;
}

function drawWoodPanelFloor(house) {
  const floorTexture = house.floorTexture || "houseFloor";
  const floorImage = houseFloorImageFor(floorTexture);
  const floorFallback = houseFloorFallbackFor(floorTexture);
  const floorFill = houseTextureFill(floorImage, floorFallback);
  if (house.kind === "circular") {
    const floor = house.floor || house.interior;
    if (isGobbaStrongholdFloorTexture(floorTexture) && drawCircularFloorWithSoftEdge(floor, floorImage, floorFallback)) return;
    ctx.save();
    ctx.beginPath();
    ctx.arc(floor.x, floor.y, floor.radius, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = circularHouseFloorTextureFits(floorTexture) ? floorFallback : floorFill;
    ctx.fillRect(floor.x - floor.radius, floor.y - floor.radius, floor.radius * 2, floor.radius * 2);
    if (circularHouseFloorTextureFits(floorTexture) && floorImage?.complete && floorImage.naturalWidth) {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(floorImage, floor.x - floor.radius, floor.y - floor.radius, floor.radius * 2, floor.radius * 2);
    }
    ctx.restore();
    return;
  }
  ctx.save();
  ctx.fillStyle = floorFill;
  for (const floor of house.floors || [house.floor || house.interior]) {
    ctx.fillRect(floor.x, floor.y, floor.w, floor.h);
  }
  ctx.restore();
}

function drawHouseWalls(house) {
  const applyWallDarken = () => {
    const darken = Number(house.wallDarken) || 0;
    if (darken <= 0) return;
    ctx.save();
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(1, darken)})`;
    for (const block of house.blocks) {
      ctx.fillRect(block.x, block.y, block.w, block.h);
    }
    ctx.restore();
  };
  if (house.kind === "circular") {
    ctx.save();
    ctx.fillStyle = houseTextureFill(houseWallImageFor(house.wallTexture), houseWallFallbackFor(house.wallTexture));
    for (const block of house.blocks) {
      ctx.fillRect(block.x, block.y, block.w, block.h);
    }
    applyWallDarken();
    ctx.restore();
    return;
  }
  ctx.save();
  ctx.fillStyle = houseTextureFill(houseWallImageFor(house.wallTexture), houseWallFallbackFor(house.wallTexture));
  for (const block of house.blocks) {
    ctx.fillRect(block.x, block.y, block.w, block.h);
  }
  applyWallDarken();
  ctx.restore();
}

function drawHouseInteriors(camera, rect) {
  for (const house of game.map?.houses || []) {
    if (!houseVisible(house, camera, rect)) continue;
    drawWoodPanelFloor(house);
    drawHouseWalls(house);
  }
  drawHouseFurniture(camera, rect);
}

function furnitureSpriteFor(kind) {
  if (kind === "loom") return sprites.props.loom;
  if (kind === "smelting-furnace") return sprites.props.smeltingFurnace;
  if (kind === "tanning-drum") return sprites.props.tanningDrum;
  if (kind === "potionmaking-table") return sprites.props.potionmakingTable;
  if (kind === "crafting-table") return sprites.props.craftingTable;
  if (kind === "anvil") return sprites.props.anvil;
  if (kind === "dress-form-mannequin") return sprites.props.dressFormMannequin;
  return null;
}

function drawHouseFurniture(camera, rect) {
  const furniture = game.map?.furniture || [];
  if (!furniture.length) return;
  for (const piece of furniture) {
    const size = Number(piece.size) || 150;
    const visible = piece.x + size / 2 > camera.x
      && piece.x - size / 2 < camera.x + rect.width
      && piece.y + size / 2 > camera.y
      && piece.y - size / 2 < camera.y + rect.height;
    if (!visible) continue;
    const sprite = furnitureSpriteFor(piece.kind);
    if (sprite?.complete && sprite.naturalWidth) {
      const scaleX = Number(piece.scaleX) || 1;
      const scaleY = Number(piece.scaleY) || 1;
      setSpriteSmoothing(shouldSmoothCharacterSprite(sprite));
      ctx.drawImage(sprite, piece.x - (size * scaleX) / 2, piece.y - (size * scaleY) / 2 + (Number(piece.yOffset) || 0), size * scaleX, size * scaleY);
      continue;
    }
    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.fillStyle = "#6e4a2c";
    ctx.strokeStyle = "#1d120b";
    ctx.lineWidth = 2;
    ctx.fillRect(-size * 0.35, -size * 0.25, size * 0.7, size * 0.5);
    ctx.strokeRect(-size * 0.35, -size * 0.25, size * 0.7, size * 0.5);
    ctx.restore();
  }
}

function nearestCraftingStation() {
  let nearest = null;
  let nearestDistance = Infinity;
  for (const piece of game.map?.furniture || []) {
    if (!craftingStations[piece.kind]) continue;
    const d = distance(game.player, piece);
    const range = game.player.radius + Math.max(34, (Number(piece.size) || 120) * 0.32);
    if (d <= range && d < nearestDistance) {
      nearest = piece;
      nearestDistance = d;
    }
  }
  return nearest;
}

function openCraftingWindow(station) {
  if (!station || !craftingWindow) return;
  game.activeCraftingStation = station;
  craftingWindow.classList.remove("hidden");
  renderCraftingWindow();
  syncPointerPause();
}

function closeCraftingWindow() {
  game.activeCraftingStation = null;
  craftingWindow?.classList.add("hidden");
  syncPointerPause();
}

function renderCraftingWindow() {
  if (!craftingWindow || craftingWindow.classList.contains("hidden")) return;
  const station = game.activeCraftingStation;
  const config = craftingStations[station?.kind];
  if (!station || !config) {
    closeCraftingWindow();
    return;
  }
  if (craftingTitle) craftingTitle.textContent = config.title;
  if (craftingSubtitle) craftingSubtitle.textContent = config.skills.join(" / ");
  if (craftingUsableOnlyToggle) craftingUsableOnlyToggle.checked = Boolean(game.craftingUsableOnly);
  const recipes = recipesForStation(station);
  if (!recipes.length) {
    updateHtmlIfChanged(craftingList, `<div class="empty-state">No recipes configured for this station.</div>`);
    return;
  }
  const visibleRecipes = recipes
    .map((recipe, index) => ({ recipe, index, canCraft: recipeCanCraft(recipe) }))
    .filter(entry => !game.craftingUsableOnly || entry.canCraft);
  if (!visibleRecipes.length) {
    updateHtmlIfChanged(craftingList, `<div class="empty-state">No usable recipes right now.</div>`);
    return;
  }
  updateHtmlIfChanged(craftingList, visibleRecipes.map(({ recipe, index, canCraft }) => {
    const level = Math.max(1, Math.floor(Number(recipe.level) || 1));
    const ingredients = (recipe.ingredients || [])
      .map(ingredient => {
        const required = Math.max(1, Math.floor(Number(ingredient.quantity) || 1));
        const owned = inventoryItemCount(ingredient.item);
        const cls = owned >= required ? "ok" : "bad";
        return `<span class="${cls}">${escapeHtml(ingredient.item)} ${owned}/${required}</span>`;
      })
      .join(", ");
    return `
      <button type="button" class="spellbook-spell-button crafting-recipe-button${canCraft ? "" : " disabled"}" data-craft-recipe="${index}" ${canCraft ? "" : "disabled"}>
        <strong>${escapeHtml(recipe.name || recipe.output || "Recipe")}</strong>
        <span>${escapeHtml(recipe.skill)} LVL ${level} / ${Number(recipe.xp) || 0} XP</span>
        <small>${ingredients || "No ingredients"}</small>
      </button>
    `;
  }).join(""));
}

function drawHouseEntranceLight(rect, roofs) {
  if (rect.side === "north") {
    const roofTop = Math.min(...roofs
      .filter(roof => rect.x + rect.w > roof.x && rect.x < roof.x + roof.w)
      .map(roof => roof.y));
    const lightBottom = Number.isFinite(roofTop) ? roofTop : rect.y;
    const lightLength = 70;
    const startWidth = rect.w;
    const endWidth = rect.w * 1.9;
    const centerX = rect.x + rect.w / 2;
    const gradient = ctx.createRadialGradient(centerX, lightBottom, 0, centerX, lightBottom - lightLength, lightLength);
    gradient.addColorStop(0, "rgba(244, 218, 146, 0.34)");
    gradient.addColorStop(0.48, "rgba(244, 218, 146, 0.14)");
    gradient.addColorStop(1, "rgba(244, 218, 146, 0)");
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX - startWidth / 2, lightBottom);
    ctx.lineTo(centerX + startWidth / 2, lightBottom);
    ctx.lineTo(centerX + endWidth / 2, lightBottom - lightLength);
    ctx.lineTo(centerX - endWidth / 2, lightBottom - lightLength);
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = gradient;
    ctx.fillRect(centerX - endWidth / 2, lightBottom - lightLength, endWidth, lightLength);
    ctx.restore();
    return;
  }
}

function drawHouseRoof(house) {
  if (playerInsideHouse(house)) return;
  const roof = house.roof;
  ctx.save();
  const roofImage = houseRoofImageFor(house.roofTexture);
  ctx.fillStyle = houseTextureFill(roofImage, houseRoofFallbackFor(house.roofTexture));
  if (house.kind === "circular") {
    const roofCenterX = roof.x + roof.radius;
    const roofCenterY = roof.y + roof.radius;
    ctx.beginPath();
    ctx.arc(roofCenterX, roofCenterY, roof.radius, 0, Math.PI * 2);
    ctx.clip();
    if (roofImage?.complete && roofImage.naturalWidth) ctx.drawImage(roofImage, roof.x, roof.y, roof.w, roof.h);
    else ctx.fillRect(roof.x, roof.y, roof.w, roof.h);
    ctx.restore();
    for (const rect of house.doorRects || [house.doorRect].filter(Boolean)) {
      drawHouseEntranceLight(rect, [roof]);
    }
    return;
  }
  const roofs = house.roofs || [roof];
  for (const roofPart of roofs) ctx.fillRect(roofPart.x, roofPart.y, roofPart.w, roofPart.h);
  for (const rect of house.doorRects || [house.doorRect, house.farDoorRect].filter(Boolean)) {
    drawHouseEntranceLight(rect, roofs);
  }
  ctx.restore();
}

function drawHouseRoofs(camera, rect) {
  for (const house of game.map?.houses || []) {
    if (!houseVisible(house, camera, rect)) continue;
    drawHouseRoof(house);
  }
}

function drawShopkeeperSite() {
  const shopkeeper = game.map?.shopkeeper;
  if (!shopkeeper) return;
  ctx.save();
  ctx.translate(shopkeeper.x, shopkeeper.y);
  ctx.fillStyle = "#5a1d2a";
  ctx.strokeStyle = "#b58a62";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(-52, -36, 104, 72, 8);
  ctx.fill();
  ctx.stroke();

  const benches = [
    { x: -82, y: -46, r: -0.45 },
    { x: 82, y: -46, r: 0.45 },
    { x: -78, y: 48, r: 0.36 },
    { x: 78, y: 48, r: -0.36 }
  ];
  for (const bench of benches) {
    ctx.save();
    ctx.translate(bench.x, bench.y);
    ctx.rotate(bench.r);
    ctx.fillStyle = "#6b4527";
    ctx.strokeStyle = "#2c1b10";
    ctx.lineWidth = 2;
    ctx.fillRect(-28, -6, 56, 12);
    ctx.strokeRect(-28, -6, 56, 12);
    ctx.fillRect(-24, 8, 6, 14);
    ctx.fillRect(18, 8, 6, 14);
    ctx.restore();
  }
  ctx.restore();
}

function drawGravestoneObstacle(obstacle) {
  ctx.save();
  ctx.translate(obstacle.x, obstacle.y);
  ctx.rotate(obstacle.rotation || 0);
  const sprite = sprites.props.gravestone;
  if (sprite.complete && sprite.naturalWidth) {
    const size = obstacle.radius * 3.1;
    setSpriteSmoothing(false);
    ctx.drawImage(sprite, -size / 2, -size / 2, size, size);
    ctx.restore();
    return;
  }
  ctx.fillStyle = "#77786f";
  ctx.strokeStyle = "#30312d";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(-obstacle.radius * 0.7, -obstacle.radius, obstacle.radius * 1.4, obstacle.radius * 1.8, 5);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "#42433d";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-4, -3);
  ctx.lineTo(4, -3);
  ctx.moveTo(0, -8);
  ctx.lineTo(0, 4);
  ctx.stroke();
  ctx.restore();
}

function drawGandersvilleTownSquare() {
  return;
}

function drawCityBuilding(obstacle) {
  ctx.save();
  ctx.translate(obstacle.x, obstacle.y);
  ctx.fillStyle = "#6b211e";
  ctx.strokeStyle = "#2d0f0e";
  ctx.lineWidth = 3;
  ctx.fillRect(-obstacle.w / 2, -obstacle.h / 2, obstacle.w, obstacle.h);
  ctx.strokeRect(-obstacle.w / 2, -obstacle.h / 2, obstacle.w, obstacle.h);
  ctx.fillStyle = "#4f5452";
  ctx.globalAlpha = 0.72;
  ctx.fillRect(-obstacle.w / 2 + 8, -obstacle.h / 2 + 8, obstacle.w - 16, obstacle.h - 16);
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#050505";
  const windowSize = 10;
  for (let y = -obstacle.h / 2 + 24; y < obstacle.h / 2 - 18; y += 32) {
    for (let x = -obstacle.w / 2 + 24; x < obstacle.w / 2 - 18; x += 38) {
      ctx.fillRect(x, y, windowSize, windowSize + 3);
    }
  }
  ctx.restore();
}

function drawDeadTree(obstacle) {
  if (drawSprite(sprites.props.deadTree, obstacle.x, obstacle.y, obstacle.radius * 3.6)) return;
  ctx.save();
  ctx.translate(obstacle.x, obstacle.y);
  ctx.fillStyle = "#2a1710";
  ctx.strokeStyle = "#120906";
  ctx.lineWidth = 2;
  ctx.beginPath();
  const spikes = 11;
  for (let i = 0; i < spikes; i += 1) {
    const angle = -Math.PI / 2 + i * ((Math.PI * 2) / spikes);
    const radius = obstacle.radius * (i % 2 === 0 ? 1.25 : 0.45);
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "#3a2116";
  ctx.lineWidth = Math.max(4, obstacle.radius * 0.18);
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, obstacle.radius * 0.5);
  ctx.lineTo(0, -obstacle.radius * 0.82);
  ctx.moveTo(0, -obstacle.radius * 0.15);
  ctx.lineTo(-obstacle.radius * 0.78, -obstacle.radius * 0.68);
  ctx.moveTo(0, -obstacle.radius * 0.28);
  ctx.lineTo(obstacle.radius * 0.72, -obstacle.radius * 0.72);
  ctx.stroke();
  ctx.restore();
}

function drawPropObstacle(obstacle, sprite, size) {
  if (drawSprite(sprite, obstacle.x, obstacle.y, size)) return;
  ctx.save();
  ctx.translate(obstacle.x, obstacle.y);
  ctx.fillStyle = obstacle.kind === "bush" ? "#1f4a25" : "#12341d";
  ctx.strokeStyle = "#071208";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, obstacle.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawShopkeeper() {
  const shopkeeper = game.map?.shopkeeper;
  if (!shopkeeper) return;
  if (!drawNpcSprite(shopkeeper, sprites.npcs.shopkeeper)) {
    ctx.save();
    ctx.translate(shopkeeper.x, shopkeeper.y);
    ctx.fillStyle = "#d7c48b";
    ctx.beginPath();
    ctx.arc(0, 0, shopkeeper.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#5a1d2a";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = "#11100e";
    ctx.font = "bold 10px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SALE", 0, 1);
    ctx.restore();
  }

  ctx.save();
  ctx.fillStyle = "#f2ede3";
  ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
  ctx.lineWidth = 3;
  ctx.font = "bold 12px system-ui";
  ctx.textAlign = "center";
  ctx.strokeText(shopkeeper.name, shopkeeper.x, shopkeeper.y - shopkeeper.radius - 14);
  ctx.fillText(shopkeeper.name, shopkeeper.x, shopkeeper.y - shopkeeper.radius - 14);
  ctx.restore();
}

function drawHuntsmanRobb() {
  const huntsman = game.map?.huntsmanRobb;
  if (!huntsman) return;
  if (!drawNpcSprite(huntsman, sprites.npcs.villagerMale)) {
    ctx.save();
    ctx.translate(huntsman.x, huntsman.y);
    ctx.fillStyle = "#8e6a3f";
    ctx.beginPath();
    ctx.arc(0, 0, huntsman.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#3f2b18";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = "#11100e";
    ctx.font = "bold 10px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("R", 0, 1);
    ctx.restore();
  }
  drawNpcLabel(huntsman, huntsman.name || "Huntsman Robb");
}

function drawBlacksmithFredward() {
  const blacksmith = game.map?.blacksmithFredward;
  if (!blacksmith) return;
  if (!drawNpcSprite(blacksmith, sprites.npcs.villagerMale2)) {
    ctx.save();
    ctx.translate(blacksmith.x, blacksmith.y);
    ctx.fillStyle = "#7b7f86";
    ctx.beginPath();
    ctx.arc(0, 0, blacksmith.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#2d3033";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = "#11100e";
    ctx.font = "bold 10px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("F", 0, 1);
    ctx.restore();
  }
  drawNpcLabel(blacksmith, blacksmith.name || "Blacksmith Fredward");
}

function drawChaplainSonsam() {
  const chaplain = game.map?.chaplainSonsam;
  if (!chaplain) return;
  if (!drawNpcSprite(chaplain, sprites.npcs.priest)) {
    ctx.save();
    ctx.translate(chaplain.x, chaplain.y);
    ctx.fillStyle = "#d4bd6a";
    ctx.beginPath();
    ctx.arc(0, 0, chaplain.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#3c3034";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = "#11100e";
    ctx.font = "bold 10px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("S", 0, 1);
    ctx.restore();
  }
  drawNpcLabel(chaplain, chaplain.name || "Chaplain Sonsam");
}

function drawAlchemistClaristra() {
  const alchemist = game.map?.alchemistClaristra;
  if (!alchemist) return;
  if (!drawNpcSprite(alchemist, sprites.npcs.etherealSoulreaperFemale)) {
    ctx.save();
    ctx.translate(alchemist.x, alchemist.y);
    ctx.fillStyle = "#7fd0f2";
    ctx.beginPath();
    ctx.arc(0, 0, alchemist.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#23466e";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = "#11100e";
    ctx.font = "bold 10px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("C", 0, 1);
    ctx.restore();
  }
  drawNpcLabel(alchemist, alchemist.name || "Alchemist Claristra");
}

function drawHereticOswaldo() {
  const oswaldo = game.map?.hereticOswaldo;
  if (!oswaldo) return;
  if (!drawNpcSprite(oswaldo, sprites.npcs.priest)) {
    ctx.save();
    ctx.translate(oswaldo.x, oswaldo.y);
    ctx.fillStyle = "#2b1d2f";
    ctx.beginPath();
    ctx.arc(0, 0, oswaldo.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#8f5ac7";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = "#f2ede3";
    ctx.font = "bold 10px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("O", 0, 1);
    ctx.restore();
  }
  drawNpcLabel(oswaldo, oswaldo.name || "Heretic Oswaldo");
}

function drawGvada() {
  const gvada = game.map?.gvada;
  if (!gvada) return;
  if (!drawNpcSprite(gvada, sprites.npcs.gvada)) {
    ctx.save();
    ctx.translate(gvada.x, gvada.y);
    ctx.fillStyle = "#ff8bc8";
    ctx.beginPath();
    ctx.arc(0, 0, gvada.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#7b2b5f";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = "#11100e";
    ctx.font = "bold 10px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("G", 0, 1);
    ctx.restore();
  }
  drawQuestMarkerForNpc(gvada);
  ctx.save();
  ctx.fillStyle = "#f2ede3";
  ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
  ctx.lineWidth = 3;
  ctx.font = "bold 12px system-ui";
  ctx.textAlign = "center";
  ctx.strokeText("Gvada", gvada.x, gvada.y - gvada.radius - 13);
  ctx.fillText("Gvada", gvada.x, gvada.y - gvada.radius - 13);
  ctx.restore();
}

function drawPleezix() {
  const pleezix = game.map?.pleezix;
  if (!pleezix) return;
  if (!drawNpcSprite(pleezix, sprites.npcs.oldMan)) {
    ctx.save();
    ctx.translate(pleezix.x, pleezix.y);
    ctx.fillStyle = "#9fdf70";
    ctx.beginPath();
    ctx.arc(0, 0, pleezix.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#2f6a28";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = "#11100e";
    ctx.font = "bold 10px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("P", 0, 1);
    ctx.restore();
  }
  drawQuestMarkerForNpc(pleezix);
  ctx.save();
  ctx.fillStyle = "#f2ede3";
  ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
  ctx.lineWidth = 3;
  ctx.font = "bold 12px system-ui";
  ctx.textAlign = "center";
  ctx.strokeText("Pleezix", pleezix.x, pleezix.y - pleezix.radius - 13);
  ctx.fillText("Pleezix", pleezix.x, pleezix.y - pleezix.radius - 13);
  ctx.restore();
}

function drawTrainer(camera, rect) {
  for (const trainer of mapTrainers()) {
    if (!unitVisible(trainer, camera, rect, 120)) continue;
    drawTrainerNpc(trainer);
  }
}

function drawTrainerNpc(trainer) {
  const sprite = trainer.sprite === "sylvanSoulreaperFemale"
    ? sprites.npcs.sylvanSoulreaperFemale
    : sprites.npcs.etherealSoulreaperMale;
  if (!drawNpcSprite(trainer, sprite)) {
    ctx.save();
    ctx.translate(trainer.x, trainer.y);
    ctx.fillStyle = "#d6cfbf";
    ctx.beginPath();
    ctx.arc(0, 0, trainer.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#f0cf63";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = "#11100e";
    ctx.font = "bold 10px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("T", 0, 1);
    ctx.restore();
  }
  ctx.save();
  ctx.fillStyle = "#f2ede3";
  ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
  ctx.lineWidth = 3;
  ctx.font = "bold 12px system-ui";
  ctx.textAlign = "center";
  ctx.strokeText(trainer.name || "Soulreaper Trainer", trainer.x, trainer.y - trainer.radius - 13);
  ctx.fillText(trainer.name || "Soulreaper Trainer", trainer.x, trainer.y - trainer.radius - 13);
  ctx.restore();
  drawQuestMarkerForNpc(trainer);
}

function drawSharlene() {
  const sharlene = game.map?.sharlene;
  if (!sharlene) return;
  if (!drawNpcSprite(sharlene, sprites.npcs.villagerFemale)) {
    ctx.save();
    ctx.translate(sharlene.x, sharlene.y);
    ctx.fillStyle = "#8db8ff";
    ctx.beginPath();
    ctx.arc(0, 0, sharlene.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#315f9c";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = "#11100e";
    ctx.font = "bold 10px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("S", 0, 1);
    ctx.restore();
  }
  drawQuestMarkerForNpc(sharlene);
  ctx.save();
  ctx.fillStyle = "#f2ede3";
  ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
  ctx.lineWidth = 3;
  ctx.font = "bold 12px system-ui";
  ctx.textAlign = "center";
  ctx.strokeText("Sharlene", sharlene.x, sharlene.y - sharlene.radius - 13);
  ctx.fillText("Sharlene", sharlene.x, sharlene.y - sharlene.radius - 13);
  ctx.restore();
}

function drawMordren() {
  const mordren = game.map?.mordren;
  if (!mordren) return;
  if (!drawNpcSprite(mordren, sprites.npcs.shadowSoulreaperMale)) {
    ctx.save();
    ctx.translate(mordren.x, mordren.y);
    ctx.fillStyle = "#2b2230";
    ctx.beginPath();
    ctx.arc(0, 0, mordren.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#8f66c9";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = "#f2ede3";
    ctx.font = "bold 10px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("M", 0, 1);
    ctx.restore();
  }
  drawQuestMarkerForNpc(mordren);
  ctx.save();
  ctx.fillStyle = "#f2ede3";
  ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
  ctx.lineWidth = 3;
  ctx.font = "bold 12px system-ui";
  ctx.textAlign = "center";
  ctx.strokeText("Mordren", mordren.x, mordren.y - mordren.radius - 13);
  ctx.fillText("Mordren", mordren.x, mordren.y - mordren.radius - 13);
  ctx.restore();
}

function drawCecil() {
  const cecil = game.map?.cecil;
  if (!cecil) return;
  if (!drawNpcSprite(cecil, sprites.npcs.villagerMale2)) {
    ctx.save();
    ctx.translate(cecil.x, cecil.y);
    ctx.fillStyle = "#d6c69a";
    ctx.beginPath();
    ctx.arc(0, 0, cecil.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#4f3622";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = "#11100e";
    ctx.font = "bold 9px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("C", 0, 1);
    ctx.restore();
  }
  drawNpcLabel(cecil, "Cecil Paddywagon");
}

function drawTheodora() {
  const theodora = game.map?.theodora;
  if (!theodora) return;
  if (!drawNpcSprite(theodora, sprites.npcs.oldWoman)) {
    ctx.save();
    ctx.translate(theodora.x, theodora.y);
    ctx.fillStyle = "#c6a0c9";
    ctx.beginPath();
    ctx.arc(0, 0, theodora.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#3c2441";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();
  }
  drawNpcLabel(theodora, "Theodora");
  drawQuestMarkerForNpc(theodora);
}

function drawBumsforkNpcs(camera, rect) {
  for (const npc of game.map?.bumsforkNpcs || []) {
    if (!unitVisible(npc, camera, rect, 120)) continue;
    const sprite = sprites.npcs.villagerMale;
    if (!drawNpcSprite(npc, sprite)) {
      ctx.save();
      ctx.translate(npc.x, npc.y);
      ctx.fillStyle = npc.color || "#b58a62";
      ctx.beginPath();
      ctx.arc(0, 0, npc.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#211a14";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = "#11100e";
      ctx.font = "bold 8px system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("?", 0, 1);
      ctx.restore();
    }
    drawNpcLabel(npc, npc.label || npc.name);
    drawQuestMarkerForNpc(npc);
  }
}

function drawNpcLabel(npc, label) {
  ctx.save();
  ctx.fillStyle = "#f2ede3";
  ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
  ctx.lineWidth = 3;
  ctx.font = "bold 12px system-ui";
  ctx.textAlign = "center";
  ctx.strokeText(label, npc.x, npc.y - npc.radius - 13);
  ctx.fillText(label, npc.x, npc.y - npc.radius - 13);
  ctx.restore();
}

function npcQuestMarkerState(questId) {
  if (!questId) return null;
  const active = game.quests.some(quest => quest.id === questId);
  if (active) return "accepted";
  const minLevel = questMinimumLevel(questId);
  if (minLevel > 1 && game.player.level < minLevel) return null;
  if (!playerMeetsQuestMinimumRealm(questId)) return null;
  if (!game.completedQuests.includes(questId)) return "available";
  return null;
}

function npcQuestIdsForMarker(npc) {
  const ids = [];
  const add = id => {
    id = String(id || "").trim();
    if (id && !ids.includes(id)) ids.push(id);
  };
  if (Array.isArray(npc?.questChain)) npc.questChain.forEach(add);
  add(npc?.questId);
  if (npc?.id === "lord-yantos" || npc?.name === "Lord Yantos") add("joining-the-gandersguard");
  if (npc?.id === "lord-rauf" || npc?.name === "Lord Rauf") {
    add("joining-the-fenguard");
    add("gandersville-raid");
  }
  if (npc?.id === "pleezix" || npc?.name === "Pleezix") {
    add("rat-infestation");
    add("investigate-rat-warren");
    add("ratkin-menace");
  }
  if (npc?.id === "mordren" || npc?.name === "Mordren") {
    add("napaea-skull");
    add("fenhold");
  }
  if (npc?.id === "heretic-slayleigh" || npc?.name === "Heretic Slayleigh") {
    add("bone-collector");
    add("bone-ritual");
    add("first-flame");
    add("controlled-burn");
    add("too-close-to-the-fire");
    add("unholy-dominion");
  }
  if (npc?.id === "magister-maimon" || npc?.name === "Magister Maimon") {
    add("introduction-to-ether");
    add("introduction-to-crowd-control");
  }
  if (npc?.id === "high-priestess-sierra" || npc?.name === "High Priestess Sierra") {
    add("blessing-of-the-road");
    add("a-shield-of-faith");
    add("introduction-to-celestial-mercy");
    add("janglebones-in-the-fen");
  }
  if (npc?.id === "barbarianess-skjoldma" || npc?.name === "Barbarianess Skjoldma") {
    add("introduction-to-weapons-mastery");
    add("introduction-to-shields");
  }
  if (npc?.id === "theodora" || npc?.name === "Theodora") {
    add("antidote-for-the-plague");
    add("more-plague-research");
  }
  if (npc?.id === "naturalist-walden" || npc?.name === "Naturalist Walden") {
    add("only-you-can-prevent-forest-fires");
    add("the-glow-of-the-glade");
    add("a-gentle-leash");
    add("thorns-remember");
    add("dust-of-the-hidden-folk");
  }
  return ids;
}

function questMinimumLevel(questOrId) {
  const quest = typeof questOrId === "object" ? questOrId : window.SoulreaperQuestUI?.questById?.(questOrId) || devQuestConfigs[questOrId] || {};
  const level = Number(quest.minimumLevel ?? quest.minLevel ?? quest.requiredLevel);
  return Number.isFinite(level) && level > 1 ? Math.floor(level) : 1;
}

function questMinimumRealmRequirement(questOrId) {
  const quest = typeof questOrId === "object" ? questOrId : window.SoulreaperQuestUI?.questById?.(questOrId) || devQuestConfigs[questOrId] || {};
  const rawRealm = quest.minimumRealm || quest.requiredRealm || quest.realmRequirement?.realm || "";
  if (!rawRealm) return null;
  const realm = normalizeRealm(rawRealm);
  const level = Number(quest.minimumRealmLevel ?? quest.requiredRealmLevel ?? quest.realmRequirement?.level);
  if (!realm || !Number.isFinite(level) || level < 1) return null;
  return { realm, level: Math.floor(level) };
}

function playerMeetsQuestMinimumRealm(questOrId) {
  const requirement = questMinimumRealmRequirement(questOrId);
  if (!requirement) return true;
  return (realmProgress(requirement.realm)?.level || 0) >= requirement.level;
}

function drawQuestMarkerForNpc(npc) {
  if (!npc) return;
  const questId = npcQuestIdForMarker(npc);
  if (!questId) return;
  drawQuestMarker(npc, npcQuestMarkerState(questId));
}

function npcQuestIdForMarker(npc) {
  const chainQuestId = window.SoulreaperQuestUI?.questChainQuestIdForNpc?.(npc);
  if (chainQuestId) return chainQuestId;
  if ((npc.id === "pleezix" || npc.name === "Pleezix")
    && game.completedQuests.includes("investigate-rat-warren")
    && !game.completedQuests.includes("ratkin-menace")) {
    return "ratkin-menace";
  }
  if ((npc.id === "pleezix" || npc.name === "Pleezix")
    && game.completedQuests.includes("rat-infestation")
    && !game.completedQuests.includes("investigate-rat-warren")) {
    return "investigate-rat-warren";
  }
  if ((npc.id === "mordren" || npc.name === "Mordren")
    && game.completedQuests.includes("napaea-skull")
    && !game.completedQuests.includes("fenhold")) {
    return "fenhold";
  }
  if ((npc.id === "necromancer-morgane" || npc.name === "Necromancer Morgane")
    && !game.completedQuests.includes("morganes-reagents")) {
    const fenholdActive = game.quests.some(quest => quest.id === "fenhold");
    const reagentsActive = game.quests.some(quest => quest.id === "morganes-reagents");
    return (fenholdActive || reagentsActive || game.completedQuests.includes("fenhold")) ? "morganes-reagents" : null;
  }
  if ((npc.id === "heretic-slayleigh" || npc.name === "Heretic Slayleigh")
    && game.completedQuests.includes("too-close-to-the-fire")
    && !game.completedQuests.includes("unholy-dominion")) {
    return "unholy-dominion";
  }
  if ((npc.id === "heretic-slayleigh" || npc.name === "Heretic Slayleigh")
    && game.completedQuests.includes("controlled-burn")
    && !game.completedQuests.includes("too-close-to-the-fire")) {
    return "too-close-to-the-fire";
  }
  if ((npc.id === "heretic-slayleigh" || npc.name === "Heretic Slayleigh")
    && game.completedQuests.includes("first-flame")
    && !game.completedQuests.includes("controlled-burn")) {
    return "controlled-burn";
  }
  if ((npc.id === "heretic-slayleigh" || npc.name === "Heretic Slayleigh")
    && !game.completedQuests.includes("first-flame")
    && (realmProgress("Infernal").level || 0) >= 1) {
    return "first-flame";
  }
  if ((npc.id === "heretic-slayleigh" || npc.name === "Heretic Slayleigh")
    && game.completedQuests.includes("bone-collector")
    && !game.completedQuests.includes("bone-ritual")) {
    return "bone-ritual";
  }
  if ((npc.id === "magister-maimon" || npc.name === "Magister Maimon")
    && game.completedQuests.includes("introduction-to-ether")
    && !game.completedQuests.includes("introduction-to-crowd-control")) {
    return "introduction-to-crowd-control";
  }
  if ((npc.id === "magister-maimon" || npc.name === "Magister Maimon")
    && !game.completedQuests.includes("introduction-to-ether")) {
    return "introduction-to-ether";
  }
  if ((npc.id === "high-priestess-sierra" || npc.name === "High Priestess Sierra")
    && game.completedQuests.includes("introduction-to-celestial-mercy")
    && !game.completedQuests.includes("janglebones-in-the-fen")) {
    return "janglebones-in-the-fen";
  }
  if ((npc.id === "high-priestess-sierra" || npc.name === "High Priestess Sierra")
    && game.completedQuests.includes("a-shield-of-faith")
    && !game.completedQuests.includes("introduction-to-celestial-mercy")) {
    return "introduction-to-celestial-mercy";
  }
  if ((npc.id === "high-priestess-sierra" || npc.name === "High Priestess Sierra")
    && game.completedQuests.includes("blessing-of-the-road")
    && !game.completedQuests.includes("a-shield-of-faith")) {
    return "a-shield-of-faith";
  }
  if ((npc.id === "high-priestess-sierra" || npc.name === "High Priestess Sierra")
    && !game.completedQuests.includes("blessing-of-the-road")) {
    return "blessing-of-the-road";
  }
  if ((npc.id === "barbarianess-skjoldma" || npc.name === "Barbarianess Skjoldma")
    && game.completedQuests.includes("introduction-to-weapons-mastery")
    && !game.completedQuests.includes("introduction-to-shields")) {
    return "introduction-to-shields";
  }
  if ((npc.id === "lord-rauf" || npc.name === "Lord Rauf")
    && game.completedQuests.includes("joining-the-fenguard")
    && !game.completedQuests.includes("gandersville-raid")) {
    return "gandersville-raid";
  }
  if ((npc.id === "theodora" || npc.name === "Theodora")
    && game.completedQuests.includes("antidote-for-the-plague")
    && !game.completedQuests.includes("more-plague-research")) {
    return "more-plague-research";
  }
  if ((npc.id === "naturalist-walden" || npc.name === "Naturalist Walden")
    && game.completedQuests.includes("thorns-remember")
    && !game.completedQuests.includes("dust-of-the-hidden-folk")) {
    return "dust-of-the-hidden-folk";
  }
  if ((npc.id === "naturalist-walden" || npc.name === "Naturalist Walden")
    && game.completedQuests.includes("a-gentle-leash")
    && !game.completedQuests.includes("thorns-remember")) {
    return "thorns-remember";
  }
  if ((npc.id === "naturalist-walden" || npc.name === "Naturalist Walden")
    && game.completedQuests.includes("the-glow-of-the-glade")
    && !game.completedQuests.includes("a-gentle-leash")) {
    return "a-gentle-leash";
  }
  if ((npc.id === "naturalist-walden" || npc.name === "Naturalist Walden")
    && game.completedQuests.includes("only-you-can-prevent-forest-fires")
    && !game.completedQuests.includes("the-glow-of-the-glade")) {
    return "the-glow-of-the-glade";
  }
  for (const questId of npcQuestIdsForMarker(npc)) {
    const state = npcQuestMarkerState(questId);
    if (state) return questId;
  }
  return null;
}

function drawQuestMarker(npc, state = "available") {
  if (!state) return;
  const y = npc.y - npc.radius - 32 + Math.sin(performance.now() / 240) * 2;
  ctx.save();
  ctx.fillStyle = state === "accepted" ? "#9a9a92" : "#f0cf63";
  ctx.strokeStyle = "rgba(0, 0, 0, 0.85)";
  ctx.lineWidth = 3;
  ctx.font = "bold 20px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.strokeText("!", npc.x, y);
  ctx.fillText("!", npc.x, y);
  ctx.restore();
}

function drawGvadaPointer(gvada, shopkeeper) {
  const angle = Math.atan2(shopkeeper.y - gvada.y, shopkeeper.x - gvada.x);
  ctx.save();
  ctx.translate(gvada.x + Math.cos(angle) * 42, gvada.y + Math.sin(angle) * 42);
  ctx.rotate(angle);
  ctx.fillStyle = "#f0cf63";
  ctx.strokeStyle = "#4f3c12";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(18, 0);
  ctx.lineTo(-12, -11);
  ctx.lineTo(-7, 0);
  ctx.lineTo(-12, 11);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawPassage(passage, fill) {
  drawFeatheredPassageFill(passage, fill);
}

function clipPlayableMap() {
  if (typeof Path2D !== "undefined") {
    if (!game.map._playablePath) {
      const path = new Path2D();
      for (const area of game.map.areas) {
        for (const [index, point] of area.boundary.entries()) {
          if (index === 0) path.moveTo(point.x, point.y);
          else path.lineTo(point.x, point.y);
        }
        path.closePath();
      }
      for (const passage of game.map.passages) {
        const dx = passage.x2 - passage.x1;
        const dy = passage.y2 - passage.y1;
        const length = Math.hypot(dx, dy) || 1;
        const nx = (-dy / length) * passage.width / 2;
        const ny = (dx / length) * passage.width / 2;
        path.moveTo(passage.x1 + nx, passage.y1 + ny);
        path.lineTo(passage.x2 + nx, passage.y2 + ny);
        path.lineTo(passage.x2 - nx, passage.y2 - ny);
        path.lineTo(passage.x1 - nx, passage.y1 - ny);
        path.closePath();
      }
      game.map._playablePath = path;
    }
    ctx.clip(game.map._playablePath);
    return;
  }

  ctx.beginPath();
  for (const area of game.map.areas) {
    for (const [index, point] of area.boundary.entries()) {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    }
    ctx.closePath();
  }
  for (const passage of game.map.passages) {
    const dx = passage.x2 - passage.x1;
    const dy = passage.y2 - passage.y1;
    const length = Math.hypot(dx, dy) || 1;
    const nx = (-dy / length) * passage.width / 2;
    const ny = (dx / length) * passage.width / 2;
    ctx.moveTo(passage.x1 + nx, passage.y1 + ny);
    ctx.lineTo(passage.x2 + nx, passage.y2 + ny);
    ctx.lineTo(passage.x2 - nx, passage.y2 - ny);
    ctx.lineTo(passage.x1 - nx, passage.y1 - ny);
    ctx.closePath();
  }
  ctx.clip();
}

function playerSprite() {
  return sprites.npcs[game.player.avatar] || sprites.npcs.soulreaperMale || sprites.player;
}

function spriteForAvatar(avatar) {
  return sprites.npcs[avatar] || sprites.npcs.soulreaperMale || sprites.player;
}

function multiplayerUrl() {
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${window.location.host}/soulreaper-ws`;
}

function multiplayerStatsPayload() {
  const stats = clonePlain(game.player.stats);
  stats.AGL = effectiveStat(game.player, "AGL");
  stats.FOCUS = effectiveStat(game.player, "FOCUS");
  return stats;
}

function multiplayerActiveSpellsPayload() {
  return clonePlain(game.player.spells.map(spell => ({
    name: spell.name,
    realm: spell.realm,
    lvl: spellLevel(spell),
    aura: Boolean(spell.aura),
    passive: Boolean(spell.passive),
    range: spell.range,
    tick: spell.tick,
    formulas: spell.formulas
  })));
}

function multiplayerCombatStatePayload() {
  return {
    stats: multiplayerStatsPayload(),
    weapon: clonePlain(game.player.weapon),
    activeSpells: multiplayerActiveSpellsPayload(),
    statMods: clonePlain(game.player.statMods)
  };
}

function multiplayerPayload() {
  const start = game.startPoint || { x: 0, y: 0 };
  return {
    type: "player:update",
    world: game.multiplayer.worldName,
    name: game.player.name || "Soulreaper",
    avatar: game.player.avatar || "soulreaperMale",
    x: game.player.x,
    y: game.player.y,
    dx: game.player.x - start.x,
    dy: game.player.y - start.y,
    hp: game.player.hp,
    maxHp: game.player.maxHp,
    level: game.player.level,
    radius: game.player.radius,
    stats: multiplayerStatsPayload(),
    weapon: clonePlain(game.player.weapon),
    equipmentVisuals: clonePlain(playerEquipmentVisuals(game.player)),
    equippedItems: clonePlain(game.player.equippedItems),
    statMods: clonePlain(game.player.statMods),
    activeSpells: multiplayerActiveSpellsPayload(),
    stunned: game.player.stunned || 0,
    mortified: game.player.mortified || 0,
    mortifySourceX: game.player.mortifySourceX || 0,
    mortifySourceY: game.player.mortifySourceY || 0,
    area: currentPlayerAreaName(),
    alignment: playerAlignment(),
    factionStandings: clonePlain(playerFactionStandings()),
    speech: game.playerSpeech ? game.playerSpeech.text : "",
    afk: Boolean(game.player.afk),
    lfg: Boolean(game.player.lfg),
    character: serializeCharacterSave()
  };
}

function serializeCharacterSave() {
  window.SoulreaperQuestUI?.normalizeQuestState?.();
  return {
    name: game.player.name || "Soulreaper",
    avatar: game.player.avatar || "soulreaperMale",
    x: game.player.x,
    y: game.player.y,
    hp: game.player.hp,
    maxHp: game.player.maxHp,
    level: game.player.level,
    xp: game.player.xp,
    nextXp: game.player.nextXp,
    gold: game.player.gold,
    stats: clonePlain(game.player.stats),
    resistances: clonePlain(game.player.resistances),
    virtue: game.player.virtue,
    factionStandings: clonePlain(playerFactionStandings()),
    inventory: clonePlain(game.player.inventory),
    equippedItems: clonePlain(game.player.equippedItems),
    equipment: clonePlain(game.player.equipment),
    weapon: clonePlain(game.player.weapon),
    learnedSpells: clonePlain(game.player.learnedSpells),
    spellLevels: clonePlain(game.player.spellLevels),
    spellCooldownMods: clonePlain(game.player.spellCooldownMods),
    spellLineups: clonePlain(game.player.spellLineups),
    realmProgress: clonePlain(game.player.realmProgress),
    craftingProgress: clonePlain(game.player.craftingProgress),
    gvadaStarterMagic: clonePlain(game.player.gvadaStarterMagic),
    sybilStarterMagic: clonePlain(game.player.sybilStarterMagic),
    lastDeath: clonePlain(game.player.lastDeath),
    spells: clonePlain(game.player.spells),
    spellSlotsActive: game.player.spellSlotsActive,
    bank: clonePlain(ensureBankState()),
    quests: clonePlain(game.quests),
    completedQuests: clonePlain(game.completedQuests)
  };
}

function hydrateSavedItem(item) {
  if (!item?.name) return item || null;
  const template = cloneItem(item.name);
  return template ? { ...template, ...item } : item;
}

function hydrateSavedSpell(spell, spellLevels = game.player.spellLevels) {
  const name = typeof spell === "string" ? spell : spell?.name;
  if (!name) return null;
  const level = Number(spell?.lvl ?? spell?.level ?? spellLevels?.[name]) || null;
  const template = makeSpell(name, level);
  const hydrated = makePlayerSpell(name, level);
  if (!hydrated) return null;
  if (typeof spell === "object" && spell) {
    hydrated.autocast = spell.autocast ?? hydrated.autocast;
    hydrated.cooldownMultiplier = spell.cooldownMultiplier ?? hydrated.cooldownMultiplier;
    hydrated.memorizing = Math.max(0, Number(spell.memorizing) || 0);
    hydrated.memorizationDuration = Number(spell.memorizationDuration) || hydrated.memorizationDuration;
    hydrated.memorizationReadyFlash = Math.max(0, Number(spell.memorizationReadyFlash) || 0);
    hydrated.memorizationReadyFlashed = Boolean(spell.memorizationReadyFlashed);
  }
  hydrated.cast = template?.cast || hydrated.cast;
  hydrated.castAt = template?.castAt || hydrated.castAt;
  return hydrated;
}

function applyCharacterSave(save) {
  if (!save || typeof save !== "object") return false;
  const keepName = game.player.name;
  Object.assign(game.player, {
    ...game.player,
    name: String(save.name || keepName || "Soulreaper").slice(0, 24),
    avatar: save.avatar || game.player.avatar,
    x: Number(save.x) || game.player.x,
    y: Number(save.y) || game.player.y,
    hp: Number(save.hp) || game.player.hp,
    maxHp: Number(save.maxHp) || game.player.maxHp,
    level: Number(save.level) || game.player.level,
    xp: Number(save.xp) || 0,
    nextXp: Number(save.nextXp) || game.player.nextXp,
    gold: Math.max(0, Math.floor(Number(save.gold) || 0)),
    stats: { ...game.player.stats, ...(save.stats || {}) },
    resistances: save.resistances || {},
    virtue: Number(save.virtue) || 0,
    factionStandings: save.factionStandings && typeof save.factionStandings === "object" ? clonePlain(save.factionStandings) : {},
    learnedSpells: Array.isArray(save.learnedSpells) ? save.learnedSpells : [],
    spellLevels: save.spellLevels || {},
    spellCooldownMods: save.spellCooldownMods || {},
    spellLineups: Array.isArray(save.spellLineups) ? save.spellLineups.slice(0, SPELL_LINEUP_COUNT) : Array(SPELL_LINEUP_COUNT).fill(null),
    realmProgress: save.realmProgress || {},
    craftingProgress: save.craftingProgress || {},
    gvadaStarterMagic: save.gvadaStarterMagic || null,
    sybilStarterMagic: save.sybilStarterMagic || null,
    lastDeath: save.lastDeath && Number.isFinite(Number(save.lastDeath.x)) && Number.isFinite(Number(save.lastDeath.y))
      ? { x: Number(save.lastDeath.x), y: Number(save.lastDeath.y), area: save.lastDeath.area || "" }
      : null,
    spells: [],
    spellSlotsActive: Number(save.spellSlotsActive) || game.player.spellSlotsActive,
    bank: save.bank && typeof save.bank === "object" ? save.bank : game.player.bank
  });
  game.player.spells = Array.isArray(save.spells)
    ? save.spells.map(spell => hydrateSavedSpell(spell, game.player.spellLevels)).filter(Boolean)
    : [];
  game.player.inventory = Array.isArray(save.inventory) ? save.inventory.slice(0, game.player.inventory.length).map(hydrateSavedItem) : game.player.inventory;
  while (game.player.inventory.length < initialPlayerState.inventory.length) game.player.inventory.push(null);
  while (game.player.spellLineups.length < SPELL_LINEUP_COUNT) game.player.spellLineups.push(null);
  game.player.equippedItems = {};
  for (const [slot, item] of Object.entries(save.equippedItems || {})) game.player.equippedItems[slot] = hydrateSavedItem(item);
  game.player.equipment = { ...initialPlayerState.equipment, ...(save.equipment || {}) };
  if (!game.player.equippedItems.Chest && game.player.equipment.Chest === "Empty") equipStartingItem("Linen Shirt");
  if (!game.player.equippedItems.Legs && game.player.equipment.Legs === "Empty") equipStartingItem("Linen Pants");
  game.player.weapon = save.weapon || (game.player.equippedItems["Main Hand"] ? weaponFromItem(game.player.equippedItems["Main Hand"]) : null);
  enforceSinglePassiveSpell();
  game.quests = Array.isArray(save.quests) ? save.quests : [];
  game.completedQuests = Array.isArray(save.completedQuests) ? save.completedQuests : [];
  window.SoulreaperQuestUI?.normalizeQuestState?.();
  ensureBankState();
  game.player.bank.inventory = game.player.bank.inventory.map(hydrateSavedItem);
  markUIDirty();
  return true;
}

function sendMultiplayerChat(text, channel = "say") {
  const mp = game.multiplayer;
  if (!mp.connected || !mp.socket || mp.socket.readyState !== WebSocket.OPEN) return;
  mp.socket.send(JSON.stringify({
    type: "chat",
    world: game.multiplayer.worldName,
    text,
    channel,
    name: game.player.name || "Soulreaper",
    area: currentPlayerAreaName()
  }));
  sendMultiplayerUpdate(true);
}

function sendMultiplayerTell(targetName, text) {
  const mp = game.multiplayer;
  if (game.mode !== "multiplayer" || !mp.connected || !mp.socket || mp.socket.readyState !== WebSocket.OPEN) {
    addLog("<b>Tell:</b> you are not connected to multiplayer.");
    return false;
  }
  mp.socket.send(JSON.stringify({ type: "tell", targetName, text }));
  return true;
}

function selectedAccountCharacter() {
  const id = game.account?.selectedCharacterId || "";
  return (game.account?.characters || []).find(character => character.id === id) || null;
}

function avatarForRaceSex(race = "human", sex = "male") {
  if (race === "dwarf") return sex === "female" ? "dwarfFemale" : "dwarfMale";
  return sex === "female" ? "soulreaperFemale" : "soulreaperMale";
}

function hydrateAccountEquipmentItem(item) {
  if (!item) return null;
  if (typeof item === "string") return item === "Empty" ? null : hydrateSavedItem({ name: item });
  return hydrateSavedItem(item);
}

function accountCharacterEquipmentItems(character) {
  const equippedItems = {};
  for (const [slot, item] of Object.entries(character?.equippedItems || {})) {
    const hydrated = hydrateAccountEquipmentItem(item);
    if (hydrated) equippedItems[slot] = hydrated;
  }
  for (const [slot, itemName] of Object.entries(character?.equipment || {})) {
    if (equippedItems[slot] || !itemName || itemName === "Empty") continue;
    const hydrated = hydrateAccountEquipmentItem(itemName);
    if (hydrated) equippedItems[slot] = hydrated;
  }
  return equippedItems;
}

function characterSelectionPortraitHtml(character) {
  const avatar = character?.avatar || avatarForRaceSex(character?.race, character?.sex);
  const baseSrc = avatarBaseSources[avatar] || avatarBaseSources.soulreaperMale;
  const entity = {
    avatar,
    equippedItems: accountCharacterEquipmentItems(character)
  };
  const layers = avatarLayersForEntity(entity).slice().sort((a, b) => avatarLayerSortValue(a) - avatarLayerSortValue(b));
  const layerHtml = layers.map(layer => {
    const rawSrc = avatarSpritePathForLayer(layer, avatar);
    if (!rawSrc) return "";
    const src = itemIconCssSrc(avatarTintProxy(layer, rawSrc), rawSrc);
    const held = isHeldAvatarLayer(layer);
    const offHand = layer.slot === "Off-Hand";
    const heldClass = held ? ` held ${slugifyAssetName(layer.slot)}${offHand && layer.weapon ? " mirrored" : ""}` : "";
    const heldStyle = held
      ? ` style="--held-size:${Math.max(10, Math.min(34, itemGraphicSize(layer, 30)))}px;--held-x:${offHand ? 29 : 71}%;--held-y:${offHand ? 60 : 59}%;--held-offset-x:${offHand ? -1.3 : 1.3}px;"`
      : "";
    return `<img class="character-portrait-layer${heldClass}" src="${escapeHtml(src)}" alt=""${heldStyle}>`;
  }).join("");
  return `
    <span class="character-portrait" aria-hidden="true">
      <img class="character-portrait-base" src="${escapeHtml(baseSrc)}" alt="">
      ${layerHtml}
    </span>
  `;
}

function characterHasActiveWorld(character) {
  return Boolean(character?.lastWorld && game.multiplayer.availableWorlds.some(world => world.name === character.lastWorld));
}

async function accountRequest(path, options = {}) {
  const response = await fetch(path, {
    credentials: "same-origin",
    cache: "no-store",
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {})
    }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.ok === false) {
    if (response.status === 404 && path.startsWith("/api/account")) {
      throw new Error("Account login only works from the multiplayer server. Open the game from the multiplayer server URL, not the editor server.");
    }
    throw new Error(data.message || `Request failed (${response.status}).`);
  }
  return data;
}

function applyAccountResponse(data) {
  const account = data?.account || null;
  game.account.username = account?.username || "";
  game.account.characters = Array.isArray(account?.characters) ? account.characters : [];
  if (!game.account.characters.some(character => character.id === game.account.selectedCharacterId)) {
    game.account.selectedCharacterId = "";
  }
  if (Array.isArray(data?.worlds)) {
    game.multiplayer.availableWorlds = data.worlds
      .map(world => ({
        name: String(world?.name || "").trim(),
        playerCount: Number(world?.playerCount) || 0
      }))
      .filter(world => world.name)
      .sort((a, b) => a.name.localeCompare(b.name));
    if (!game.multiplayer.availableWorlds.some(world => world.name === game.multiplayer.selectedWorldName)) {
      game.multiplayer.selectedWorldName = game.multiplayer.availableWorlds[0]?.name || "";
    }
  }
  renderAccountHome();
}

async function refreshAccountState() {
  game.account.loading = true;
  game.account.message = "";
  renderAccountHome();
  try {
    const data = await accountRequest("/api/account/me");
    applyAccountResponse(data);
  } catch (error) {
    game.account.username = "";
    game.account.characters = [];
    game.account.selectedCharacterId = "";
    game.account.message = error.message || "Login required.";
    renderAccountHome();
  } finally {
    game.account.loading = false;
    renderAccountHome();
  }
}

function renderAccountHome() {
  if (!modeChoice) return;
  const loggedIn = Boolean(game.account.username);
  authPanel?.classList.toggle("hidden", loggedIn);
  characterDashboard?.classList.toggle("hidden", !loggedIn);
  characterDashboard?.classList.toggle("creating-character", Boolean(game.account.creatingCharacter));
  if (accountStatus) {
    accountStatus.textContent = game.account.loading
      ? "Loading..."
      : loggedIn
        ? `Logged in as ${game.account.username}`
        : (game.account.message || "Create an account or log in.");
  }
  const race = game.account.race || "human";
  const sex = game.account.sex || "male";
  modeChoice.querySelectorAll("[data-race-choice]").forEach(button => {
    button.classList.toggle("selected", button.dataset.raceChoice === race);
  });
  const sexButton = modeChoice.querySelector("[data-sex-toggle]");
  if (sexButton) sexButton.setAttribute("aria-label", sex === "female" ? "Female" : "Male");
  const sexImage = modeChoice.querySelector("[data-sex-toggle] img");
  if (sexImage) {
    sexImage.src = sex === "female" ? "./assets/UI/female.png" : "./assets/UI/male.png";
    sexImage.alt = sex === "female" ? "Female" : "Male";
  }
  if (characterList) {
    const characters = game.account.characters || [];
    characterList.innerHTML = characters.length
      ? characters.map(character => {
          const selected = character.id === game.account.selectedCharacterId;
          const activeWorld = characterHasActiveWorld(character);
          const worldText = character.lastWorld
            ? activeWorld ? character.lastWorld : "No active world"
            : "No world yet";
          return `
            <button class="character-list-card${selected ? " selected" : ""}" type="button" data-character-id="${escapeHtml(character.id)}">
              ${characterSelectionPortraitHtml(character)}
              <span><strong>${escapeHtml(character.name)}</strong><small>LVL ${Number(character.level) || 1} · ${escapeHtml(character.lastArea || "Starting Area")}</small><small>${escapeHtml(worldText)}${activeWorld ? ` · ${Number(game.multiplayer.availableWorlds.find(world => world.name === character.lastWorld)?.playerCount) || 0} players` : ""}</small></span>
            </button>
          `;
        }).join("")
      : "";
  }
  const selectedCharacter = selectedAccountCharacter();
  createCharacterForm?.classList.toggle("hidden", !game.account.creatingCharacter);
  const multiplayerPanel = modeChoice.querySelector(".multiplayer-panel");
  multiplayerPanel?.classList.toggle("hidden", game.account.creatingCharacter || !selectedCharacter);
  renderMultiplayerWorldList();
  const canResume = characterHasActiveWorld(selectedCharacter);
  modeChoice.querySelectorAll("[data-multiplayer-action]").forEach(button => {
    const action = button.dataset.multiplayerAction;
    const disabled = !selectedCharacter
      || (action === "resume" && !canResume)
      || (action === "join" && !game.multiplayer.selectedWorldName);
    button.disabled = disabled;
  });
  const deleteButton = modeChoice.querySelector("[data-delete-character]");
  if (deleteButton) deleteButton.disabled = !selectedCharacter;
}

function showAccountCharacterSelectionScreen(message = "") {
  game.account.creatingCharacter = false;
  game.account.selectedCharacterId = "";
  if (message) game.account.message = message;
  modeChoice?.classList.remove("hidden");
  authPanel?.classList.toggle("hidden", Boolean(game.account.username));
  characterDashboard?.classList.toggle("hidden", !game.account.username);
  renderAccountHome();
}

function randomDarkFantasyWorldName() {
  const prefixes = ["Black", "Grim", "Hollow", "Dread", "Ashen", "Umbral", "Raven", "Blood", "Frost", "Iron", "Duskworn", "Witch"];
  const middles = ["mire", "fell", "grave", "thorn", "gloom", "wraith", "cairn", "barrow", "night", "wolf", "ember", "veil"];
  const suffixes = ["Reach", "Hollow", "March", "Vale", "Moor", "Fen", "Pass", "Crown", "Gate", "Watch", "Wold", "Hold"];
  const pick = list => list[Math.floor(Math.random() * list.length)];
  return `${pick(prefixes)}${pick(middles)} ${pick(suffixes)}`;
}

function setFieldHelp(el, message = "") {
  if (!el) return;
  el.textContent = message;
  el.classList.toggle("hidden", !message);
}

async function createAccountFromForm(form) {
  const username = form === loginForm ? loginUsernameInput?.value : createUsernameInput?.value;
  const password = form === loginForm ? loginPasswordInput?.value : createPasswordInput?.value;
  const path = form === loginForm ? "/api/account/login" : "/api/account/create";
  game.account.message = "";
  setFieldHelp(createPasswordHelp, "");
  if (form === createAccountForm) {
    const repeatPassword = createRepeatPasswordInput?.value || "";
    if (String(password || "").length < 8 || String(password || "").length > 128) {
      setFieldHelp(createPasswordHelp, "Password must be 8 to 128 characters.");
      return;
    }
    if (password !== repeatPassword) {
      setFieldHelp(createPasswordHelp, "Passwords do not match.");
      return;
    }
  }
  renderAccountHome();
  try {
    const data = await accountRequest(path, {
      method: "POST",
      body: JSON.stringify({ username, password, repeatPassword: createRepeatPasswordInput?.value || "" })
    });
    applyAccountResponse(data);
    if (loginPasswordInput) loginPasswordInput.value = "";
    if (createPasswordInput) createPasswordInput.value = "";
    if (createRepeatPasswordInput) createRepeatPasswordInput.value = "";
  } catch (error) {
    if (form === createAccountForm) setFieldHelp(createPasswordHelp, error.message || "Account request failed.");
    game.account.message = error.message || "Account request failed.";
    renderAccountHome();
  }
}

async function createCharacterFromForm() {
  game.account.message = "";
  setFieldHelp(characterNameHelp, "");
  renderAccountHome();
  try {
    const data = await accountRequest("/api/characters", {
      method: "POST",
      body: JSON.stringify({
        name: playerNameInput?.value || "",
        race: game.account.race || "human",
        sex: game.account.sex || "male"
      })
    });
    applyAccountResponse(data);
    if (data.character?.id) game.account.selectedCharacterId = data.character.id;
    game.account.creatingCharacter = false;
    if (playerNameInput) playerNameInput.value = "";
    renderAccountHome();
  } catch (error) {
    setFieldHelp(characterNameHelp, error.message || "Character creation failed.");
    game.account.message = error.message || "Character creation failed.";
    renderAccountHome();
  }
}

async function deleteSelectedCharacter() {
  const character = selectedAccountCharacter();
  if (!character) return;
  const result = await showConfirmPrompt({
    title: "Delete Character",
    text: `Delete ${character.name}? This cannot be undone.`,
    options: [
      { label: "Delete", value: "delete" },
      { label: "Cancel", value: "cancel" }
    ]
  });
  if (result !== "delete") return;
  try {
    const data = await accountRequest(`/api/characters/${encodeURIComponent(character.id)}`, { method: "DELETE" });
    applyAccountResponse(data);
  } catch (error) {
    game.account.message = error.message || "Could not delete character.";
    renderAccountHome();
  }
}

async function logoutAccount() {
  try {
    await accountRequest("/api/account/logout", { method: "POST" });
  } catch {}
  game.account.username = "";
  game.account.characters = [];
  game.account.selectedCharacterId = "";
  game.account.creatingCharacter = false;
  game.account.message = "Logged off.";
  returnToHomeScreen();
  renderAccountHome();
}

function logOffCharacterToAccount() {
  const accountSnapshot = {
    username: game.account.username || "",
    characters: Array.isArray(game.account.characters) ? structuredClone(game.account.characters) : [],
    worlds: Array.isArray(game.multiplayer.availableWorlds) ? structuredClone(game.multiplayer.availableWorlds) : []
  };
  const restoreAccountScreen = () => {
    game.account.username = accountSnapshot.username;
    game.account.characters = accountSnapshot.characters;
    game.account.selectedCharacterId = "";
    game.account.creatingCharacter = false;
    game.account.loading = false;
    game.multiplayer.availableWorlds = accountSnapshot.worlds;
    modeChoice?.classList.remove("hidden");
    if (modeChoice) modeChoice.style.display = "";
    authPanel?.classList.toggle("hidden", Boolean(game.account.username));
    characterDashboard?.classList.toggle("hidden", !game.account.username);
    showAccountCharacterSelectionScreen(game.account.username
      ? `Logged in as ${game.account.username}`
      : "Create an account or log in."
    );
  };
  if (game.mode === "multiplayer" && game.multiplayer.connected) {
    sendMultiplayerUpdate(true);
  }
  restoreAccountScreen();
  try {
    returnToHomeScreen();
  } catch (error) {
    console.error(error);
  }
  restoreAccountScreen();
  refreshMultiplayerWorldList();
}

function closeAllFloatingWindowsForHome() {
  for (const [id, entry] of floatingWindowRegistry) {
    const state = floatingState(id);
    if (id === "bar") {
      state.open = false;
      state.locked = true;
      entry?.el?.classList.add("hidden");
      applyFloatingState(id);
      continue;
    }
    state.open = false;
    if (entry?.el) entry.el.classList.add("hidden");
  }
  saveFloatingLayout();
  updateWindowBarButtons();
}

function hideSessionOverlaysForHome() {
  [
    deathScreen,
    levelChoice,
    shopWindow,
    bankWindow,
    confirmWindow,
    devSpawnWindow,
    trainerWindow,
    craftingWindow,
    spellbookWindow,
    soulCrystalsWindow,
    replaceSpellWindow,
    spellChoice,
    questLogWindow,
    dialogueWindow,
    tradeWindow
  ].filter(Boolean).forEach(el => el.classList.add("hidden"));
  trainerRealmOverlay?.classList.add("hidden");
  floatingItemTooltip?.classList.add("hidden");
  spellbookFloatingTooltip?.classList.add("hidden");
  itemActionMenu?.classList.add("hidden");
  document.querySelector("#bagInventoryTooltip")?.classList.add("hidden");
  hideTeamInvite?.();
  hidePetCommandMenu?.();
  activePrompt = null;
  game.activeCraftingStation = null;
  game.activeShopkeeper = null;
  game.activeBanker = null;
  game.activeTrainer = null;
}

function clearSessionScreenForHome() {
  const rect = canvas.getBoundingClientRect();
  ctx.clearRect(0, 0, rect.width, rect.height);
  if (minimapCtx && minimapCanvas) minimapCtx.clearRect(0, 0, minimapCanvas.width, minimapCanvas.height);
  logEl.innerHTML = "";
  chatInput.value = "";
  chatInput.classList.add("hidden");
}

function returnToHomeScreen() {
  modeChoice?.classList.remove("hidden");
  disconnectMultiplayer();
  game.running = false;
  game.mode = null;
  game.keys.clear();
  game.map = null;
  resetGroundCacheForMap();
  game.player = structuredClone(initialPlayerState);
  game.enemies = [];
  game.enemySpatialGrid = null;
  game.enemySpatialCount = 0;
  game.enemySpatialVersion = 0;
  game.enemySpatialGridVersion = -1;
  game.eliteRespawns = [];
  game.projectiles = [];
  game.effects = [];
  game.floatingTexts = [];
  game.groundItems = [];
  game.logs = [];
  game.chronicleArea = null;
  game.playerSpeech = null;
  game.npcSpeech = [];
  game.quests = [];
  game.completedQuests = [];
  game.questLogAlert = false;
  game.pendingLevelChoices = null;
  game.pendingSpellAssignment = null;
  game.pendingSpellTarget = null;
  game.chatOpen = false;
  game.multiplayer.peers.clear();
  game.multiplayer.team = null;
  clearSelectedTarget();
  closeAllFloatingWindowsForHome();
  hideSessionOverlaysForHome();
  clearSessionScreenForHome();
  setLevelUpTabVisible(false);
  updateChronicleInlineMode();
  modeChoice.classList.remove("hidden");
  syncPointerPause();
}

function requestMultiplayerWho() {
  const mp = game.multiplayer;
  if (game.mode !== "multiplayer" || !mp.connected || !mp.socket || mp.socket.readyState !== WebSocket.OPEN) {
    addLog("<b>Who:</b> you are not connected to multiplayer.");
    return false;
  }
  mp.socket.send(JSON.stringify({ type: "who" }));
  return true;
}

function sendTradeAction(tradeAction, extra = {}) {
  if (game.mode !== "multiplayer" || !game.multiplayer.connected) {
    addLog("<b>Trade:</b> you must be in multiplayer.");
    return false;
  }
  sendMultiplayerAction({ action: "trade", tradeAction, ...extra });
  return true;
}

function requestMultiplayerWorldList() {
  const mp = game.multiplayer;
  if (!mp.connected || !mp.socket || mp.socket.readyState !== WebSocket.OPEN) {
    addLog("<b>Worlds:</b> you are not connected to the multiplayer server.");
    return false;
  }
  mp.socket.send(JSON.stringify({ type: "worlds:list" }));
  return true;
}

function renderMultiplayerWorldList() {
  if (!multiplayerWorldList) return;
  const mp = game.multiplayer;
  if (mp.worldListLoading) {
    multiplayerWorldList.innerHTML = `<span class="multiplayer-world-empty">Loading worlds...</span>`;
    return;
  }
  if (mp.worldListError) {
    multiplayerWorldList.innerHTML = `<span class="multiplayer-world-empty">${escapeHtml(mp.worldListError)}</span>`;
    return;
  }
  const worlds = Array.isArray(mp.availableWorlds) ? mp.availableWorlds : [];
  if (!worlds.length) {
    mp.selectedWorldName = "";
    multiplayerWorldList.innerHTML = `<span class="multiplayer-world-empty">No worlds exist on this server yet.</span>`;
    return;
  }
  if (!worlds.some(world => world.name === mp.selectedWorldName)) mp.selectedWorldName = worlds[0].name;
  multiplayerWorldList.innerHTML = worlds.map(world => `
    <button class="multiplayer-world-button${world.name === mp.selectedWorldName ? " selected" : ""}" type="button" data-world-name="${escapeHtml(world.name)}">
      <strong>${escapeHtml(world.name)}</strong>
      <small>${world.playerCount === 1 ? "1 player" : `${world.playerCount} players`}</small>
    </button>
  `).join("");
}

async function refreshMultiplayerWorldList() {
  if (!multiplayerWorldList) return;
  const mp = game.multiplayer;
  mp.worldListLoading = true;
  mp.worldListError = "";
  renderMultiplayerWorldList();
  try {
    const status = await accountRequest("/api/worlds");
    const worlds = Array.isArray(status.worlds) ? status.worlds : [];
    mp.availableWorlds = worlds
      .map(world => ({
        name: String(world?.name || "").trim(),
        playerCount: Number(world?.playerCount) || (Array.isArray(world?.players) ? world.players.length : 0)
      }))
      .filter(world => world.name)
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    mp.availableWorlds = [];
    mp.selectedWorldName = "";
    mp.worldListError = "World list unavailable. Open the game from the multiplayer server.";
  } finally {
    mp.worldListLoading = false;
    renderMultiplayerWorldList();
    renderAccountHome();
  }
}

function sendMultiplayerUpdate(force = false) {
  const mp = game.multiplayer;
  if (!mp.connected || !mp.socket || mp.socket.readyState !== WebSocket.OPEN) return;
  const now = performance.now();
  if (!force && now - mp.lastSent < 80) return;
  const payload = multiplayerPayload();
  const snapshot = JSON.stringify(payload);
  if (!force && snapshot === mp.lastSnapshot) return;
  mp.lastSent = now;
  mp.lastSnapshot = snapshot;
  mp.socket.send(snapshot);
}

function sendMultiplayerAction(action) {
  const mp = game.multiplayer;
  if (!mp.connected || !mp.socket || mp.socket.readyState !== WebSocket.OPEN) return;
  mp.socket.send(JSON.stringify({
    type: "world:action",
    world: mp.worldName,
    baseRevision: mp.worldRevision || 0,
    ...action
  }));
}

function sendTeamAction(teamAction, extra = {}) {
  if (game.mode !== "multiplayer" || !game.multiplayer.connected) {
    addLog("<b>Team:</b> you must be in multiplayer.");
    return false;
  }
  sendMultiplayerAction({ action: "team", teamAction, ...extra });
  return true;
}

function handleTeamChatCommand(text) {
  const parts = text.trim().split(/\s+/);
  const command = (parts.shift() || "").toLowerCase();
  const playerName = parts.join(" ").trim();
  if (command === "/invite") {
    if (!playerName) addLog("<b>Team:</b> use /invite [player name].");
    else sendTeamAction("invite", { playerName });
    return true;
  }
  if (command === "/leave") {
    sendTeamAction("leave");
    return true;
  }
  if (command === "/remove") {
    if (!playerName) addLog("<b>Team:</b> use /remove [player name].");
    else sendTeamAction("remove", { playerName });
    return true;
  }
  if (command === "/makeleader") {
    if (!playerName) addLog("<b>Team:</b> use /makeleader [player name].");
    else sendTeamAction("makeleader", { playerName });
    return true;
  }
  return false;
}

function splitCommandTargetAndMessage(text, command) {
  const rest = text.slice(command.length).trim();
  if (!rest) return { targetName: "", message: "" };
  const quoted = rest.match(/^"([^"]+)"\s+([\s\S]+)$/);
  if (quoted) return { targetName: quoted[1].trim(), message: quoted[2].trim() };
  const parts = rest.split(/\s+/);
  return { targetName: parts.shift() || "", message: parts.join(" ").trim() };
}

function handleChannelChatCommand(text) {
  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();
  if (lower === "/afk") {
    game.player.afk = !game.player.afk;
    addLog(`<b>Status:</b> AFK ${game.player.afk ? "enabled" : "disabled"}.`, null, "chat");
    sendMultiplayerUpdate(true);
    return true;
  }
  if (lower === "/lfg") {
    game.player.lfg = !game.player.lfg;
    addLog(`<b>Status:</b> LFG ${game.player.lfg ? "enabled" : "disabled"}.`, null, "chat");
    sendMultiplayerUpdate(true);
    return true;
  }
  for (const [channel, info] of Object.entries(CHAT_CHANNELS)) {
    const alias = info.aliases.find(command => lower === command || lower.startsWith(`${command} `));
    if (!alias) continue;
    const message = trimmed.slice(alias.length).trim();
    if (!message) {
      game.chatChannel = channel;
      syncChatChannelSelect();
      addLog(`<b>Chat:</b> default channel set to ${escapeHtml(info.label)}.`, null, "chat");
    } else {
      addPlayerSpeech(message, { channel });
    }
    return true;
  }
  return false;
}

function handleMultiplayerChatCommand(text) {
  const lower = text.trim().toLowerCase();
  if (lower === "/who") {
    requestMultiplayerWho();
    return true;
  }
  if (lower.startsWith("/tell ")) {
    const { targetName, message } = splitCommandTargetAndMessage(text, "/tell");
    if (!targetName || !message) addLog("<b>Tell:</b> use /tell [name] [message].");
    else sendMultiplayerTell(targetName, message);
    return true;
  }
  if (lower.startsWith("/trade ")) {
    const playerName = text.slice("/trade".length).trim();
    if (!playerName) addLog("<b>Trade:</b> use /trade [name].");
    else {
      const peer = peerByName(playerName);
      if (peer) tradeWithPeer(peer);
      else sendTradeAction("request", { playerName });
    }
    return true;
  }
  if (lower.startsWith("/inspect ")) {
    const playerName = text.slice("/inspect".length).trim();
    if (!playerName) addLog("<b>Inspect:</b> use /inspect [player name].");
    else {
      const peer = peerByName(playerName);
      if (!peer) addLog(`<b>Inspect:</b> could not find ${escapeHtml(playerName)} nearby.`, null, "chat");
      else inspectPeer(peer);
    }
    return true;
  }
  return false;
}

function showTeamInvite(inviterId, inviterName) {
  game.multiplayer.pendingTeamInvite = { inviterId, inviterName };
  teamInvitePopup.innerHTML = `
    <div><b>${escapeHtml(inviterName || "Soulreaper")}</b> has invited you to join a team.</div>
    <div class="team-invite-actions">
      <button type="button" data-team-invite="accept">Accept</button>
      <button type="button" data-team-invite="reject">Reject</button>
    </div>
  `;
  teamInvitePopup.classList.remove("hidden");
}

function hideTeamInvite() {
  game.multiplayer.pendingTeamInvite = null;
  teamInvitePopup.classList.add("hidden");
  teamInvitePopup.innerHTML = "";
}

function renderTeamWindow() {
  const team = game.multiplayer.team;
  if (!team?.members?.length) {
    teamWindow.classList.add("hidden");
    return;
  }
  const ownId = game.multiplayer.id;
  const currentArea = currentPlayerAreaName();
  const teammates = team.members.filter(member => member.id !== ownId);
  if (!teammates.length) {
    teamWindow.classList.add("hidden");
    return;
  }
  teamWindow.style.left = `${game.multiplayer.teamWindowX}px`;
  teamWindow.style.top = `${game.multiplayer.teamWindowY}px`;
  const list = teamWindow.querySelector(".team-member-list");
  list.innerHTML = teammates.map(member => {
    const peer = game.multiplayer.peers.get(member.id);
    const live = peer ? { ...member, ...peer } : member;
    const hp = Math.max(0, Number(live.hp) || 0);
    const maxHp = Math.max(1, Number(live.maxHp) || 1);
    const sameArea = (live.area || "") === currentArea;
    const leader = member.id === team.leaderId;
    return `
      <button class="team-member${sameArea ? "" : " away"}" type="button" data-team-target="${escapeHtml(member.id)}">
        <span class="team-member-label">${leader ? "<b>" : ""}<i>(${Number(live.level) || 1})</i> ${escapeHtml(live.name || "Soulreaper")}${leader ? "</b>" : ""}</span>
        <span class="team-hp-bar"><span style="width:${Math.max(0, Math.min(100, (hp / maxHp) * 100))}%"></span></span>
      </button>
    `;
  }).join("");
  teamWindow.classList.remove("hidden");
}

function tradePeer(trade = game.multiplayer.trade) {
  if (!trade) return null;
  return (trade.players || []).find(player => player.id !== game.multiplayer.id) || null;
}

function tradeOfferFor(playerId, trade = game.multiplayer.trade) {
  return trade?.offers?.[playerId] || { gold: 0, items: [], accepted: false };
}

function tradeOfferItemsFromSlots() {
  return [...game.multiplayer.tradeSelectedSlots]
    .sort((a, b) => a - b)
    .map(slot => ({ slot, item: clonePlain(game.player.inventory[slot]) }))
    .filter(entry => entry.item);
}

function tradeItemButton(item, options = {}) {
  if (!item) return `<button class="shop-item empty" type="button" disabled><span>Empty</span></button>`;
  return `
    <button class="shop-item${options.className ? ` ${options.className}` : ""}" type="button"${options.attrs || ""}>
      ${renderItemContents(item)}
      ${itemTooltipHtml(item)}
    </button>
  `;
}

function sendCurrentTradeOffer(accepted = false) {
  const gold = Math.max(0, Math.min(game.player.gold, Math.floor(Number(tradeGoldInput?.value ?? game.multiplayer.tradeGold) || 0)));
  game.multiplayer.tradeGold = gold;
  if (tradeGoldInput) tradeGoldInput.value = String(gold);
  const items = tradeOfferItemsFromSlots();
  sendTradeAction("offer", {
    slots: items.map(entry => entry.slot),
    items,
    gold,
    accepted
  });
}

function renderTradeWindow() {
  const trade = game.multiplayer.trade;
  if (!trade || !tradeWindow) {
    tradeWindow?.classList.add("hidden");
    return;
  }
  const peer = tradePeer(trade);
  const ownOffer = tradeOfferFor(game.multiplayer.id, trade);
  const peerOffer = tradeOfferFor(peer?.id, trade);
  if (tradeTitle) tradeTitle.textContent = `Trade with ${peer?.name || "Player"}`;
  if (tradeSubtitle) {
    tradeSubtitle.textContent = ownOffer.accepted
      ? "Waiting for both players to confirm."
      : "Select items, set gold, then confirm.";
  }
  if (tradeGoldInput && document.activeElement !== tradeGoldInput) {
    tradeGoldInput.value = String(game.multiplayer.tradeGold || ownOffer.gold || 0);
  }
  if (tradeYourOffer) {
    const selected = tradeOfferItemsFromSlots();
    tradeYourOffer.innerHTML = selected.length
      ? selected.map(entry => tradeItemButton(entry.item, { className: ownOffer.accepted ? "trade-accepted" : "", attrs: ` data-trade-remove-slot="${entry.slot}"` })).join("")
      : `<button class="shop-item empty" type="button" disabled><span>No Items</span></button>`;
  }
  if (tradeTheirGold) tradeTheirGold.textContent = `Gold ${formatNumber(peerOffer.gold || 0)}${peerOffer.accepted ? " - Confirmed" : ""}`;
  if (tradeTheirOffer) {
    const items = peerOffer.items || [];
    tradeTheirOffer.innerHTML = items.length
      ? items.map(entry => tradeItemButton(entry.item, { className: peerOffer.accepted ? "trade-accepted" : "" })).join("")
      : `<button class="shop-item empty" type="button" disabled><span>No Items</span></button>`;
  }
  if (tradeInventory) {
    tradeInventory.innerHTML = game.player.inventory.map((item, index) => {
      if (!item) return `<button class="shop-item empty" type="button" disabled><span>Empty</span></button>`;
      const selected = game.multiplayer.tradeSelectedSlots.has(index);
      return tradeItemButton(item, {
        className: selected ? "trade-selected" : "",
        attrs: ` data-trade-inventory-slot="${index}"`
      });
    }).join("");
  }
  if (tradeConfirmButton) tradeConfirmButton.textContent = ownOffer.accepted ? "Confirmed" : "Confirm";
  tradeWindow.classList.remove("hidden");
}

function closeTradeWindow() {
  game.multiplayer.trade = null;
  game.multiplayer.tradeSelectedSlots.clear();
  game.multiplayer.tradeGold = 0;
  tradeWindow?.classList.add("hidden");
}

function applyTradeCharacter(character) {
  if (!character || typeof character !== "object") return;
  game.player.gold = Math.max(0, Math.floor(Number(character.gold) || 0));
  game.player.inventory = Array.isArray(character.inventory)
    ? character.inventory.slice(0, game.player.inventory.length).map(hydrateSavedItem)
    : game.player.inventory;
  while (game.player.inventory.length < initialPlayerState.inventory.length) game.player.inventory.push(null);
  markUIDirty();
  saveCharacter();
  if (game.mode === "multiplayer") sendMultiplayerUpdate(true);
}

function updateMultiplayerLatency() {
  const mp = game.multiplayer;
  if (game.mode !== "multiplayer" || !mp.connected || !mp.socket || mp.socket.readyState !== WebSocket.OPEN) return;
  const now = performance.now();
  if (mp.pendingPingId && now - mp.pendingPingAt < 4500) return;
  if (!mp.pendingPingId && now - mp.lastPingSent < 1200) return;
  const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  mp.pendingPingId = id;
  mp.pendingPingAt = now;
  mp.lastPingSent = now;
  mp.socket.send(JSON.stringify({ type: "latency:ping", id }));
}

function sendMultiplayerEnemyUpdate(enemy, alive = game.enemies.includes(enemy)) {
  if (game.mode !== "multiplayer" || !enemy?.id) return;
  sendMultiplayerAction({
    action: "enemy:update",
    enemyId: enemy.id,
    alive,
    enemy: alive ? serializeEnemy(enemy) : null,
    drops: game.groundItems.filter(drop => !drop.localOnly).map(serializeGroundItem),
    eliteRespawns: clonePlain(game.eliteRespawns)
  });
}

function isMultiplayerHost() {
  return game.mode === "multiplayer" && game.multiplayer.isHost;
}

function shouldSimulateWorld() {
  return game.mode !== "multiplayer" || game.multiplayer.isHost;
}

function clonePlain(value) {
  if (value === undefined || value === null) return value;
  return JSON.parse(JSON.stringify(value));
}

function serializeEnemy(enemy) {
  return {
    id: enemy.id,
    name: enemy.name,
    templateName: enemy.templateName || enemy.name,
    lvl: enemy.lvl,
    realm: normalizeRealm(enemy.realm),
    alignment: enemy.alignment,
    faction: unitFactionId(enemy),
    aggressive: enemy.aggressive,
    type: enemy.type,
    foodchain: enemy.foodchain,
    incorporeal: enemy.incorporeal,
    flying: enemy.flying,
    aquatic: enemy.aquatic,
    amphibious: enemy.amphibious,
    elite: enemy.elite,
    boss: enemy.boss,
    noRespawn: enemy.noRespawn,
    respawnKey: enemy.respawnKey,
    noWander: enemy.noWander,
    lockPosition: enemy.lockPosition,
    noLoot: enemy.noLoot,
    questSpawn: enemy.questSpawn,
    questId: enemy.questId,
    questOwnerId: enemy.questOwnerId,
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
    stunned: enemy.stunned,
    mortified: enemy.mortified,
    mortifySourceX: enemy.mortifySourceX,
    mortifySourceY: enemy.mortifySourceY,
    hostileToPlayer: enemy.hostileToPlayer,
    hostileToPlayerReason: enemy.hostileToPlayerReason,
    targetPlayerId: enemy.targetPlayerId,
    hostileTargetId: enemy.hostileTargetId,
    plagueHostilePlayerIds: clonePlain(enemy.plagueHostilePlayerIds),
    wanderTimer: enemy.wanderTimer,
    wanderAngle: enemy.wanderAngle,
    leashState: enemy.leashState,
    stats: clonePlain(enemy.stats),
    resistances: clonePlain(enemy.resistances),
    gold: clonePlain(enemy.gold),
    weapon: clonePlain(enemy.weapon),
    spells: clonePlain(enemy.spells),
    statMods: clonePlain(enemy.statMods),
    dots: clonePlain(enemy.dots),
    guaranteedDrops: clonePlain(enemy.guaranteedDrops),
    inventory: clonePlain(enemy.inventory),
    consumables: clonePlain(enemy.consumables),
    misc: clonePlain(enemy.misc),
    scrolls: clonePlain(enemy.scrolls)
  };
}

function deserializeEnemy(data, previous = null) {
  normalizeRealmData(data);
  const template = allMonsterTemplates.find(candidate => candidate.name === data.templateName)
    || allMonsterTemplates.find(candidate => candidate.name === data.name)
    || {
      name: data.templateName || data.name || "Enemy",
      realm: normalizeRealm(data.realm || "Mortal"),
      type: data.type || "Beast",
      alignment: data.alignment,
      faction: data.faction,
      aggressive: data.aggressive,
      radius: Math.max(1, (data.radius || 14) / UNIT_SIZE_SCALE),
      foodchain: data.foodchain,
      aquatic: data.aquatic,
      amphibious: data.amphibious,
      gold: data.gold || { min: 0, max: 0 },
      stats: data.stats || {},
      weapon: data.weapon || { name: "Rat Claw" },
      spells: data.spells || []
    };
  const enemy = makeEnemy(template, data.lvl || 1, data.x || 0, data.y || 0, {
    id: data.id,
    name: data.name,
    elite: data.elite,
    boss: data.boss,
    respawnKey: data.respawnKey,
    noWander: data.noWander,
    noRespawn: Boolean(data.noRespawn),
    lockPosition: data.lockPosition,
    noLoot: data.noLoot,
    questSpawn: data.questSpawn,
    questId: data.questId,
    questOwnerId: data.questOwnerId,
    pet: data.pet,
    masterId: data.masterId,
    masterName: data.masterName,
    faction: data.faction,
    petCommand: data.petCommand,
    petTargetId: data.petTargetId,
    petDuration: data.petDuration,
    petTimeRemaining: data.petTimeRemaining,
    guardX: data.guardX,
    guardY: data.guardY,
    friendlyToGoodPlayer: data.friendlyToGoodPlayer,
    friendlyToNonEvilPlayer: data.friendlyToNonEvilPlayer,
    shopkeeper: data.shopkeeper,
    trainer: data.trainer,
    questGiver: data.questGiver,
    aggroRange: data.aggroRange,
    homeX: data.homeX,
    homeY: data.homeY,
    gold: data.gold,
    guaranteedDrops: data.guaranteedDrops,
    inventory: data.inventory,
    consumables: data.consumables,
    misc: data.misc,
    scrolls: data.scrolls
  });
  const dataX = data.x || enemy.x;
  Object.assign(enemy, {
    realm: normalizeRealm(data.realm || enemy.realm),
    alignment: data.alignment || enemy.alignment,
    faction: factionId(data.faction ?? enemy.faction ?? inferredFactionForUnit(enemy)),
    aggressive: Boolean(data.aggressive),
    type: data.type || enemy.type,
    foodchain: data.foodchain || enemy.foodchain,
    incorporeal: Boolean(data.incorporeal),
    flying: Boolean(data.flying),
    aquatic: Boolean(data.aquatic),
    amphibious: Boolean(data.amphibious),
    noWander: Boolean(data.noWander),
    noRespawn: Boolean(data.noRespawn),
    noLoot: Boolean(data.noLoot),
    questSpawn: data.questSpawn,
    questId: data.questId,
    questOwnerId: data.questOwnerId,
    boss: Boolean(data.boss),
    pet: Boolean(data.pet),
    masterId: data.masterId,
    masterName: data.masterName,
    petCommand: data.petCommand,
    petTargetId: data.petTargetId,
    petDuration: data.petDuration,
    petTimeRemaining: data.petTimeRemaining,
    guardX: data.guardX,
    guardY: data.guardY,
    x: dataX,
    y: data.y || enemy.y,
    facingX: data.facingX || previous?.facingX || enemy.facingX || 1,
    area: data.area || enemy.area,
    homeX: data.homeX ?? enemy.homeX,
    homeY: data.homeY ?? enemy.homeY,
    leashX: data.leashX ?? enemy.leashX,
    leashY: data.leashY ?? enemy.leashY,
    leashRadius: data.leashRadius ?? enemy.leashRadius,
    triggerX: data.triggerX,
    triggerY: data.triggerY,
    radius: data.radius || enemy.radius,
    hp: data.hp ?? enemy.hp,
    maxHp: data.maxHp ?? enemy.maxHp,
    attackTimer: data.attackTimer ?? enemy.attackTimer,
    regenTimer: data.regenTimer ?? enemy.regenTimer,
    pacified: data.pacified || 0,
    rooted: data.rooted || 0,
    rootVisual: data.rootVisual || enemy.rootVisual || "",
    stunned: data.stunned || 0,
    mortified: data.mortified || 0,
    mortifySourceX: data.mortifySourceX ?? enemy.mortifySourceX ?? enemy.x,
    mortifySourceY: data.mortifySourceY ?? enemy.mortifySourceY ?? enemy.y,
    hostileToPlayer: Boolean(data.hostileToPlayer),
    hostileToPlayerReason: data.hostileToPlayerReason,
    targetPlayerId: data.targetPlayerId,
    hostileTargetId: data.hostileTargetId,
    plagueHostilePlayerIds: Array.isArray(data.plagueHostilePlayerIds) ? data.plagueHostilePlayerIds : [],
    wanderTimer: data.wanderTimer ?? enemy.wanderTimer,
    wanderAngle: data.wanderAngle ?? enemy.wanderAngle,
    leashState: data.leashState || enemy.leashState,
    stats: data.stats || enemy.stats,
    resistances: data.resistances || enemy.resistances,
    weapon: data.weapon || enemy.weapon,
    spells: data.spells || enemy.spells,
    statMods: data.statMods || [],
    dots: data.dots || []
  });
  if (previous) updateUnitFacingFromMovement(enemy, previous.x || enemy.x, enemy.x);
  return enemy;
}

function serializeProjectile(projectile) {
  return {
    id: projectile.id,
    x: projectile.x,
    y: projectile.y,
    fromX: projectile.fromX,
    fromY: projectile.fromY,
    targetType: projectile.targetType,
    targetEnemyId: projectile.targetEnemyId || projectile.target?.id,
    targetPlayerId: projectile.targetPlayerId,
    owner: projectile.owner,
    ownerId: projectile.ownerId,
    damage: projectile.damage,
    realm: projectile.realm,
    color: projectile.color,
    label: projectile.label,
    radius: projectile.radius,
    speed: projectile.speed,
    trail: projectile.trail,
    vx: projectile.vx,
    vy: projectile.vy,
    distanceTraveled: projectile.distanceTraveled,
    maxDistance: projectile.maxDistance,
    dmgType: projectile.dmgType,
    dot: clonePlain(projectile.dot),
    statMod: clonePlain(projectile.statMod),
    realmXp: Boolean(projectile.realmXp),
    realmXpRealm: projectile.realmXpRealm,
    sourceKind: projectile.sourceKind,
    sourceWeapon: clonePlain(projectile.sourceWeapon),
    ammoDrop: projectile.ammoDrop,
    projectileAnimation: projectile.projectileAnimation,
    crit: Boolean(projectile.crit)
  };
}

function deserializeProjectile(data) {
  return {
    ...data,
    target: data.targetEnemyId ? game.enemies.find(enemy => enemy.id === data.targetEnemyId) || game.player : game.player,
    targetPlayerId: data.targetPlayerId,
    source: game.player,
    vx: data.vx ?? null,
    vy: data.vy ?? null,
    distanceTraveled: data.distanceTraveled || 0,
    maxDistance: data.maxDistance ?? Infinity
  };
}

function serializeEffect(effect) {
  return {
    ...clonePlain(Object.fromEntries(Object.entries(effect).filter(([key]) => key !== "source" && key !== "target"))),
    sourceX: effect.source?.x,
    sourceY: effect.source?.y,
    targetX: effect.target?.x ?? effect.targetX,
    targetY: effect.target?.y ?? effect.targetY
  };
}

function deserializeEffect(data) {
  const effect = { ...data };
  if (data.sourceX !== undefined && data.sourceY !== undefined) effect.source = { x: data.sourceX, y: data.sourceY };
  if (data.targetX !== undefined && data.targetY !== undefined) effect.target = { x: data.targetX, y: data.targetY };
  return effect;
}

function isLocalTransientEffect(effect) {
  return Boolean(effect?.localOnly);
}

function activeLocalTransientEffects() {
  return game.effects.filter(effect => {
    if (!isLocalTransientEffect(effect)) return false;
    const duration = Number(effect.duration);
    if (!Number.isFinite(duration)) return true;
    return Number(effect.age || 0) < duration;
  });
}

function multiplayerActorById(id) {
  if (!id) return null;
  if (id === game.multiplayer.id) return game.player;
  return game.multiplayer.peers.get(id) || null;
}

function serializeGroundItem(drop) {
  return {
    id: drop.id,
    type: drop.type || "item",
    x: drop.x,
    y: drop.y,
    radius: drop.radius,
    age: drop.age || 0,
    duration: drop.duration,
    amount: drop.amount,
    heal: drop.heal,
    item: clonePlain(drop.item)
  };
}

function serializeCollisionMap() {
  const map = game.map || {};
  return {
    areas: (map.areas || []).map(area => ({
      name: area.name,
      metadata: clonePlain(area.metadata),
      bounds: area.bounds,
      boundary: area.boundary
    })),
    passages: (map.passages || []).map(passage => ({
      x1: passage.x1,
      y1: passage.y1,
      x2: passage.x2,
      y2: passage.y2,
      width: passage.width,
      areaName: passage.areaName,
      metadata: clonePlain(passage.metadata),
      bounds: passage.bounds
    })),
    obstacles: (map.obstacles || []).map(obstacle => ({
      kind: obstacle.kind,
      x: obstacle.x,
      y: obstacle.y,
      radius: obstacle.radius,
      w: obstacle.w,
      h: obstacle.h,
      size: obstacle.size,
      blockRects: obstacle.blockRects
    })),
    houses: (map.houses || []).map(house => ({
      blocks: house.blocks
    }))
  };
}

function hydrateMultiplayerDrop(drop) {
  const hydrated = { ...drop };
  if (hydrated.item?.name) {
    const item = cloneItem(hydrated.item.name);
    hydrated.item = item ? { ...item, ...hydrated.item, id: hydrated.item.id || item.id } : hydrated.item;
  }
  return hydrated;
}

function multiplayerWorldState(includeCollision = true) {
  const state = {
    enemies: game.enemies.map(serializeEnemy),
    projectiles: game.projectiles.map(serializeProjectile),
    effects: game.effects.filter(effect => !isLocalTransientEffect(effect)).map(serializeEffect),
    groundItems: game.groundItems.filter(drop => !drop.localOnly).map(serializeGroundItem),
    eliteRespawns: clonePlain(game.eliteRespawns)
  };
  if (includeCollision) state.collision = serializeCollisionMap();
  return state;
}

function sendMultiplayerWorldState(force = false) {
  const mp = game.multiplayer;
  if ((!isMultiplayerHost() && !force) || !mp.connected || !mp.socket || mp.socket.readyState !== WebSocket.OPEN) return;
  const now = performance.now();
  if (!force && now - mp.lastWorldStateSent < 120) return;
  const includeCollision = mp.isHost && !mp.sentInitialWorldState;
  const state = multiplayerWorldState(includeCollision);
  const snapshot = JSON.stringify(state);
  if (!force && snapshot === mp.lastWorldStateSnapshot) return;
  mp.lastWorldStateSent = now;
  mp.lastWorldStateSnapshot = snapshot;
  mp.sentInitialWorldState = true;
  mp.socket.send(JSON.stringify({
    type: "world:state:propose",
    world: mp.worldName,
    baseRevision: mp.worldRevision || 0,
    state
  }));
}

function applyMultiplayerWorldState(state, revision = null) {
  if (!state) return;
  normalizeRealmData(state);
  if (revision !== null && revision < (game.multiplayer.worldRevision || 0)) return;
  if (revision !== null) game.multiplayer.worldRevision = revision;
  const localEffects = activeLocalTransientEffects();
  const localGroundDrops = game.groundItems.filter(drop => drop.localOnly);
  const previousEnemies = new Map(game.enemies.map(enemy => [enemy.id, enemy]));
  game.enemies = (state.enemies || []).map(data => deserializeEnemy(data, previousEnemies.get(data.id)));
  const currentEnemyIds = new Set(game.enemies.map(enemy => enemy.id));
  for (const enemy of previousEnemies.values()) {
    if (!currentEnemyIds.has(enemy.id)) window.SoulreaperQuestUI?.updateHollyhockKappaDefeated?.(enemy);
  }
  invalidateEnemySpatialGrid();
  game.projectiles = (state.projectiles || []).map(deserializeProjectile);
  game.effects = [
    ...(state.effects || []).map(deserializeEffect),
    ...localEffects
  ];
  const authoritativeDrops = (state.groundItems || [])
    .map(hydrateMultiplayerDrop)
    .map(drop => ({ ...drop, id: drop.id || sharedEntityId("drop"), item: drop.item || null }));
  const matchedLocalDrops = new Set();
  for (const authoritative of authoritativeDrops) {
    const match = localGroundDrops.find(localDrop => !matchedLocalDrops.has(localDrop) && groundDropsMatch(localDrop, authoritative));
    if (match) matchedLocalDrops.add(match);
  }
  game.groundItems = [
    ...authoritativeDrops,
    ...localGroundDrops.filter(drop => !matchedLocalDrops.has(drop))
  ];
  game.eliteRespawns = state.eliteRespawns || [];
}

function groundDropsMatch(a, b) {
  const aType = a?.type || (a?.item ? "item" : "");
  const bType = b?.type || (b?.item ? "item" : "");
  if (!a || !b || aType !== bType) return false;
  if (Math.hypot((a.x || 0) - (b.x || 0), (a.y || 0) - (b.y || 0)) > 48) return false;
  if (aType === "gold") return Math.floor(Number(a.amount) || 0) === Math.floor(Number(b.amount) || 0);
  return Boolean(a.item?.name && a.item.name === b.item?.name);
}

function showServerCombat(combat) {
  if (!combat) return;
  normalizeRealmData(combat);
  if (combat.attackerId === game.multiplayer.id && Number(combat.realmXp) > 0) {
    grantRealmXP(combat.realmXpRealm || combat.realm || "Mortal", Number(combat.realmXp));
  }
  const enemy = game.enemies.find(candidate => candidate.id === combat.enemyId);
  if (combat.attackerId === game.multiplayer.id
    && String(combat.label || "") === "Fireball"
    && Number(combat.damage) > 0) {
    window.SoulreaperQuestUI?.updateFirstFlameObjective?.(enemy || {
      id: combat.enemyId,
      name: combat.enemyName || combat.targetName || "",
      realm: combat.enemyRealm || combat.realm || ""
    });
  }
  if (combat.attackerId === game.multiplayer.id && combat.killed) {
    window.SoulreaperQuestUI?.updateKillQuestObjectives?.(enemy || { name: combat.enemyName || combat.targetName || "" });
  }
  if (!enemy) return;
  if (combat.soundEffect) playRemoteCombatSound(combat.soundEffect, enemy);
  const color = realmInfo[combat.realm]?.color || "#f04f48";
  spawnFloatingText(
    enemy,
    combat.immune ? "IMMUNE" : combat.damage <= 0 ? "Resisted" : `-${formatNumber(combat.damage)}`,
    combat.crit && Number(combat.damage) > 0 ? "#fff2d8" : color,
    combat.crit && Number(combat.damage) > 0 ? "#000000" : combat.realm === "Umbral" ? "#d9c7ff" : "rgba(0, 0, 0, 0.75)",
    1.15,
    { style: combat.crit && Number(combat.damage) > 0 ? "critical" : "" }
  );
  if (combat.attackerId === game.multiplayer.id) {
    if (combat.immune) addLog(`${combat.label || "Weapon"} cannot harm incorporeal <b>${enemy.name}</b>.`, enemy);
    else addLog(`${combat.label || "Weapon"} deals <b>${formatNumber(combat.damage)}</b> ${combat.realm || "Mortal"} damage to <b>${enemy.name}</b>.`, enemy);
    if (combat.crit && Number(combat.damage) > 0) window.SoulreaperQuestUI?.updateWeaponsMasteryObjective?.(game.player.weapon, enemy);
    if (Number(combat.damage) > 0) window.SoulreaperQuestUI?.updateTreantDamageObjective?.(
      { name: combat.sourceName || "", type: combat.sourceType || "" },
      enemy
    );
    if (String(combat.label || "") === "Fireblast" && Number(combat.damage) > 0) {
      window.SoulreaperQuestUI?.updateControlledBurnObjective?.(combat.sourceEffectId || "fireblast", enemy);
    }
    if (String(combat.label || "") === "Ring of Fire" && Number(combat.damage) > 0) {
      window.SoulreaperQuestUI?.updateTooCloseToTheFireObjective?.(enemy);
    }
    if (String(combat.label || "") === "Thorn Shield" && Number(combat.damage) > 0) {
      window.SoulreaperQuestUI?.updateThornShieldObjective?.(enemy);
    }
  }
  if (String(combat.label || "").includes("Burning Skin")) spawnBurningSkinHitEffect(enemy);
}

function showIncomingEnemyWeaponEffect(message) {
  const weapon = message?.weapon;
  const animation = String(weapon?.animation || "").toLowerCase();
  if (!weapon || !animation || animation === "projectile") return;
  const source = game.enemies.find(enemy => enemy.id === message.sourceId)
    || game.enemies.find(enemy => enemy.name === message.enemy?.name);
  if (!source) return;
  const angle = Math.atan2(game.player.y - source.y, game.player.x - source.x);
  game.effects.push({
    type: animation,
    source,
    target: game.player,
    age: 0,
    duration: animation === "slash" ? 0.22 : 0.18,
    realm: normalizeRealm(weapon.realm || message.realm || source.realm),
    angle,
    range: (weapon.range || 1) * RANGE_UNIT,
    weapon: clonePlain(weapon)
  });
}

function showEnemyWeaponEffect(message) {
  const weapon = message?.weapon;
  const animation = String(weapon?.animation || "").toLowerCase();
  if (!weapon || !animation || animation === "projectile") return;
  if (message.targetId && message.targetId === game.multiplayer.id) return;
  const source = game.enemies.find(enemy => enemy.id === message.sourceId)
    || (message.source ? { x: Number(message.source.x) || 0, y: Number(message.source.y) || 0 } : null);
  if (!source) return;
  if (message.soundEffect) playRemoteCombatSound(message.soundEffect, source);
  const target = game.enemies.find(enemy => enemy.id === message.targetId)
    || multiplayerActorById(message.targetId)
    || (message.target ? { x: Number(message.target.x) || source.x, y: Number(message.target.y) || source.y } : source);
  const angle = Number.isFinite(message.angle)
    ? message.angle
    : Math.atan2(target.y - source.y, target.x - source.x);
  game.effects.push({
    type: animation,
    source,
    target,
    age: 0,
    duration: animation === "slash" ? 0.22 : 0.18,
    realm: weapon.realm || message.realm || message.source?.realm,
    angle,
    range: (weapon.range || 1) * RANGE_UNIT,
    weapon: clonePlain(weapon)
  });
}

function showServerCombats(message) {
  const combats = Array.isArray(message.combats) ? message.combats : (message.combat ? [message.combat] : []);
  if (Array.isArray(message.chainLinks) && message.chainLinks.length) {
    spawnChainLightningLinks(message.chainLinks, message.chainLinks[0]?.realm || "Celestial");
  }
  if (combats.length > 1) {
    for (const combat of combats) showServerCombat(combat);
  } else {
    showServerCombat(combats[0]);
  }
}

function connectMultiplayer(worldName, action) {
  if (!("WebSocket" in window)) {
    addLog("<b>Multiplayer:</b> this browser does not support WebSockets.");
    return;
  }
  game.multiplayer.worldName = worldName;
  game.multiplayer.pendingAction = action;
  if (game.multiplayer.socket && game.multiplayer.socket.readyState <= WebSocket.OPEN) {
    requestMultiplayerWorld();
    return;
  }
  const url = multiplayerUrl();
  addLog(`<b>Multiplayer:</b> connecting to <b>${escapeHtml(url)}</b>.`);
  const socket = new WebSocket(url);
  game.multiplayer.socket = socket;
  socket.addEventListener("open", () => {
    game.multiplayer.connected = true;
    addLog("<b>Multiplayer:</b> connected to the shared world.");
    requestMultiplayerWorld();
  });
  socket.addEventListener("message", event => {
    let message;
    try {
      message = JSON.parse(event.data);
    } catch {
      return;
    }
    handleMultiplayerMessage(message);
  });
  socket.addEventListener("close", () => {
    game.multiplayer.connected = false;
    game.multiplayer.id = null;
    game.multiplayer.socket = null;
    game.multiplayer.hostId = null;
    game.multiplayer.isHost = false;
    game.multiplayer.latencyMs = null;
    game.multiplayer.pendingPingId = null;
    game.multiplayer.pendingPingAt = 0;
    game.multiplayer.sentInitialWorldState = false;
    game.multiplayer.peers.clear();
    game.multiplayer.pendingPickups.clear();
    game.multiplayer.team = null;
    closeTradeWindow();
    hideTeamInvite();
    renderTeamWindow();
    if (game.mode === "multiplayer") addLog("<b>Multiplayer:</b> disconnected from the shared world.");
  });
  socket.addEventListener("error", () => {
    if (game.mode === "multiplayer") addLog(`<b>Multiplayer:</b> connection failed at <b>${escapeHtml(url)}</b>. Make sure this page was opened from the multiplayer server URL.`);
  });
}

function requestMultiplayerWorld() {
  const mp = game.multiplayer;
  if (!mp.connected || !mp.socket || mp.socket.readyState !== WebSocket.OPEN) return;
  mp.socket.send(JSON.stringify({
    type: mp.pendingAction === "create" ? "world:create" : "world:join",
    world: mp.worldName,
    characterId: game.account.selectedCharacterId || "",
    resume: mp.pendingAction === "resume"
  }));
}

function disconnectMultiplayer() {
  const socket = game.multiplayer.socket;
  if (socket && socket.readyState <= WebSocket.OPEN) socket.close();
  game.multiplayer.socket = null;
  game.multiplayer.connected = false;
  game.multiplayer.id = null;
  game.multiplayer.peers.clear();
  if (game.selectedTarget?.kind === "peer") clearSelectedTarget();
  game.multiplayer.pendingPickups.clear();
  game.multiplayer.lastSnapshot = "";
  game.multiplayer.lastWorldStateSnapshot = "";
  game.multiplayer.lastWorldStateSent = 0;
  game.multiplayer.sentInitialWorldState = false;
  game.multiplayer.worldName = "";
  game.multiplayer.worldSeed = "";
  game.multiplayer.worldRevision = 0;
  game.multiplayer.pendingAction = "";
  game.multiplayer.hostId = null;
  game.multiplayer.isHost = false;
  game.multiplayer.availableWorlds = game.multiplayer.availableWorlds || [];
  game.multiplayer.selectedWorldName = "";
  game.multiplayer.worldListLoading = false;
  game.multiplayer.worldListError = "";
  game.multiplayer.team = null;
  closeTradeWindow();
  hideTeamInvite();
  renderTeamWindow();
}

function handleMultiplayerMessage(message) {
  if (message.type === "welcome") {
    game.multiplayer.id = message.id;
    return;
  }
  if (message.type === "latency:pong") {
    if (message.id && message.id === game.multiplayer.pendingPingId) {
      game.multiplayer.latencyMs = performance.now() - game.multiplayer.pendingPingAt;
      game.multiplayer.pendingPingId = null;
      game.multiplayer.pendingPingAt = 0;
    }
    return;
  }
  if (message.type === "world:error") {
    addLog(`<b>Multiplayer:</b> ${escapeHtml(message.message || "World error.")}`);
    return;
  }
  if (message.type === "worlds:list") {
    const names = Array.isArray(message.worlds) ? message.worlds.map(name => String(name || "").trim()).filter(Boolean) : [];
    addLog(names.length
      ? `<b>Worlds:</b> ${names.map(escapeHtml).join(", ")}.`
      : "<b>Worlds:</b> no worlds currently exist on this server.");
    return;
  }
  if (message.type === "spell:rejected") {
    const spellName = String(message.spellName || "Spell");
    setPlayerSpellTimer(spellName, 0);
    addLog(message.reason || `<b>${escapeHtml(spellName)}</b> failed.`);
    spellHudSignature = "";
    return;
  }
  if (message.type === "spell:pet-accepted") {
    applyAcceptedPetState(message);
    return;
  }
  if (message.type === "world:joined") {
    enterMultiplayerWorld(message.world, message.seed, message.hostId, message.revision || 0, message.character || null, Boolean(message.resume));
    return;
  }
  if (message.type === "world:host") {
    game.multiplayer.hostId = message.hostId || null;
    const wasHost = game.multiplayer.isHost;
    game.multiplayer.isHost = Boolean(message.hostId && message.hostId === game.multiplayer.id);
    if (game.mode === "multiplayer" && game.multiplayer.isHost && !wasHost) {
      addLog("<b>Multiplayer:</b> your browser is now keeping this world moving.");
      sendMultiplayerWorldState(true);
    }
    return;
  }
  if (message.type === "world:state") {
    if (message.hostId) {
      game.multiplayer.hostId = message.hostId;
      game.multiplayer.isHost = message.hostId === game.multiplayer.id;
    }
    applyMultiplayerWorldState(message.state, message.revision ?? null);
    showServerCombats(message);
    return;
  }
  if (message.type === "world:pickup:accepted") {
    if (message.localDropId) {
      game.multiplayer.pendingPickups.delete(message.localDropId);
      game.groundItems = game.groundItems.filter(drop => drop.id !== message.localDropId);
    }
    grantAcceptedPickup(message.drop);
    if (message.state) applyMultiplayerWorldState(message.state, message.revision ?? null);
    return;
  }
  if (message.type === "world:pickup:rejected") {
    if (message.dropId) game.multiplayer.pendingPickups.delete(message.dropId);
    if (message.localDropId) game.multiplayer.pendingPickups.delete(message.localDropId);
    if (message.state) applyMultiplayerWorldState(message.state, message.revision ?? null);
    return;
  }
  if (message.type === "players") {
    game.multiplayer.peers.clear();
    for (const player of message.players || []) {
      normalizeRealmData(player);
      if (player.id !== game.multiplayer.id) game.multiplayer.peers.set(player.id, player);
    }
    renderTeamWindow();
    return;
  }
  if (message.type === "player:update") {
    if (message.player?.id && message.player.id !== game.multiplayer.id) {
      normalizeRealmData(message.player);
      game.multiplayer.peers.set(message.player.id, message.player);
      renderTeamWindow();
    }
    return;
  }
  if (message.type === "player:left") {
    if (game.selectedTarget?.kind === "peer" && game.selectedTarget.id === message.id) clearSelectedTarget();
    game.multiplayer.peers.delete(message.id);
    renderTeamWindow();
    return;
  }
  if (message.type === "chat") {
    const name = `${message.name || "Soulreaper"}${playerChatTags(message)}`;
    const text = message.text || "";
    const area = message.area || currentPlayerAreaName();
    addChannelChatLog(name, text, message.channel || "say", { area });
    return;
  }
  if (message.type === "chat:error") {
    addLog(`<b>Chat:</b> ${escapeHtml(message.message || "Message failed.")}`, null, "chat");
    return;
  }
  if (message.type === "tell") {
    const name = escapeHtml(message.name || "Soulreaper");
    const text = escapeHtml(message.text || "");
    const label = message.direction === "to" ? `To ${name}` : `From ${name}`;
    addLog(`<span style="color:#6fd7ff"><b>${label}:</b> ${text}</span>`, null, "chat");
    return;
  }
  if (message.type === "tell:error") {
    addLog(`<span style="color:#6fd7ff"><b>Tell:</b> ${escapeHtml(message.message || "Message failed.")}</span>`, null, "chat");
    return;
  }
  if (message.type === "who") {
    const players = Array.isArray(message.players) ? message.players : [];
    const lines = players.map(player => `${escapeHtml(player.name || "Soulreaper")}${escapeHtml(playerChatTags(player))} (${escapeHtml(player.area || "Unknown")}) LVL ${Number(player.level) || 1}`);
    addLog(`<b>Who:</b> ${lines.length ? lines.join(", ") : "No players in this world."}`);
    return;
  }
  if (message.type === "team:invite") {
    showTeamInvite(message.inviterId, message.inviterName);
    return;
  }
  if (message.type === "team:update") {
    game.multiplayer.team = message.team || null;
    renderTeamWindow();
    return;
  }
  if (message.type === "team:notice" || message.type === "team:error") {
    addLog(`<b>Team:</b> ${escapeHtml(message.message || "")}`);
    return;
  }
  if (message.type === "trade:update") {
    const previous = game.multiplayer.trade;
    game.multiplayer.trade = message.trade || null;
    const ownOffer = tradeOfferFor(game.multiplayer.id);
    game.multiplayer.tradeGold = Number(ownOffer.gold) || game.multiplayer.tradeGold || 0;
    if (!previous || previous.id !== game.multiplayer.trade?.id) {
      game.multiplayer.tradeSelectedSlots.clear();
      for (const entry of ownOffer.items || []) game.multiplayer.tradeSelectedSlots.add(Number(entry.slot));
      addLog(`<b>Trade:</b> trade opened with <b>${escapeHtml(tradePeer()?.name || "Player")}</b>.`);
    }
    renderTradeWindow();
    return;
  }
  if (message.type === "trade:complete") {
    applyTradeCharacter(message.character);
    closeTradeWindow();
    addLog(`<b>Trade:</b> ${escapeHtml(message.message || "Trade complete.")}`);
    return;
  }
  if (message.type === "trade:canceled" || message.type === "trade:error") {
    closeTradeWindow();
    addLog(`<b>Trade:</b> ${escapeHtml(message.message || "Trade canceled.")}`);
    return;
  }
  if (message.type === "player:damage") {
    if (message.soundEffect) playSoundEffect(message.soundEffect);
    showIncomingEnemyWeaponEffect(message);
    damagePlayer(
      message.enemy || { name: "Enemy", realm: normalizeRealm(message.realm || "Mortal") },
      Number(message.amount) || 0,
      message.realm || "Mortal",
      message.sourceName || "Enemy attack",
      message.dmgType || "Physical",
      { critical: Boolean(message.crit) }
    );
    if (String(message.sourceName || "").includes("Burning Skin")) spawnBurningSkinHitEffect(game.player);
    return;
  }
  if (message.type === "enemy:weapon-effect") {
    showEnemyWeaponEffect(message);
    return;
  }
  if (message.type === "player:xp") {
    const amount = Number(message.amount) || 0;
    grantXP(amount);
    adjustVirtue(Number(message.virtue) || 0);
    const factionChanges = Object.keys(message.factionChanges || {}).length
      ? message.factionChanges
      : factionStandingChangesForKilledName(message.enemyName);
    applyFactionStandingChanges(factionChanges);
    if (message.enemyName) {
      addLog(`<b>LVL ${message.enemyLevel || 1} ${escapeHtml(message.enemyName)}</b> is reaped. Gained <b>${formatNumber(amount)} XP</b>${message.gold ? ` and dropped <b>${formatNumber(message.gold)} gold</b>` : ""}.`);
    }
    return;
  }
  if (message.type === "player:realm-xp") {
    grantRealmXP(message.realm || message.realmXpRealm || "Mortal", Number(message.amount) || 0);
    return;
  }
  if (message.type === "player:virtue") {
    adjustVirtue(Number(message.amount) || 0);
    return;
  }
  if (message.type === "player:faction") {
    applyFactionStandingChanges(message.factionChanges || {});
    return;
  }
  if (message.type === "quest:unholy-dominion") {
    window.SoulreaperQuestUI?.updateUnholyDominionObjective?.({ id: message.enemyId, name: message.enemyName });
    return;
  }
  if (message.type === "quest:tame-beast") {
    window.SoulreaperQuestUI?.updateTameBeastObjective?.({ id: message.enemyId, name: message.enemyName, type: "Beast" });
    return;
  }
  if (message.type === "player:heal") {
    const healed = healPlayer(Number(message.amount) || 0, message.sourceName || "Healing");
    if (message.realmXp && healed > 0) grantRealmXP(message.realmXpRealm || "Celestial", healed);
    if (healed > 0) window.SoulreaperQuestUI?.updateCelestialMercyObjective?.(message.sourceName || "", healed);
    if (message.animation === "prayer" || String(message.sourceName || "").includes("Basic Prayer")) spawnPrayerSparkles(game.player, message.palette || null);
    return;
  }
  if (message.type === "player:buff-effect") {
    showPlayerBuffEffect(message);
    return;
  }
  if (message.type === "player:statmod") {
    const mod = message.statMod && typeof message.statMod === "object" ? message.statMod : null;
    if (mod) {
      normalizeRealmData(mod);
      const existing = game.player.statMods.find(candidate => candidate.name === mod.name);
      if (existing) Object.assign(existing, mod);
      else game.player.statMods.push(mod);
      if (!message.quiet) spawnFloatingText(game.player, mod.name || message.sourceName || "BUFF", "#68a85e");
      if (mod.name === "Clarity") spawnClarityFlash(game.player);
      if (mod.name === "Chlorophyll") spawnChlorophyllSparkles(game.player);
      if (mod.name === "Godspeed" || message.sourceName === "Godspeed") window.SoulreaperQuestUI?.updateGodspeedObjective?.();
      markUIDirty();
    }
    return;
  }
  if (message.type === "player:dot") {
    const dot = message.dot && typeof message.dot === "object" ? message.dot : null;
    if (dot) {
      normalizeRealmData(dot);
      const existing = game.player.dots.find(candidate => candidate.name === dot.name);
      if (existing) Object.assign(existing, dot);
      else game.player.dots.push(dot);
      addLog(`${message.sourceName || dot.name} afflicts you.`);
    }
    return;
  }
  if (message.type === "player:root") {
    game.player.rooted = Math.max(game.player.rooted || 0, Number(message.duration) || 0);
    game.player.rootVisual = message.rootVisual || (message.sourceName === "Spiderweb" ? "spiderweb" : "tangle-vine");
    if (message.sourceName) addLog(`${message.sourceName} holds you in place.`);
    return;
  }
  if (message.type === "player:stun") {
    game.player.stunned = Math.max(game.player.stunned || 0, Number(message.duration) || 0);
    if (message.sourceName) addLog(`${message.sourceName} stuns you.`);
    return;
  }
  if (message.type === "player:mortify") {
    applyMortify(game.player, {
      x: Number(message.sourceX) || game.player.x,
      y: Number(message.sourceY) || game.player.y
    }, Number(message.duration) || 0);
  }
}

function enterMultiplayerWorld(worldName, seed, hostId = null, revision = 0, characterSave = null, resume = false) {
  game.mode = "multiplayer";
  game.multiplayer.worldName = worldName || game.multiplayer.worldName;
  game.multiplayer.worldSeed = seed || game.multiplayer.worldSeed || game.multiplayer.worldName;
  game.multiplayer.worldRevision = revision || 0;
  game.multiplayer.hostId = hostId;
  game.multiplayer.isHost = Boolean(hostId && hostId === game.multiplayer.id);
  game.multiplayer.peers.clear();
  clearSelectedTarget();
  game.multiplayer.lastSnapshot = "";
  game.multiplayer.lastWorldStateSnapshot = "";
  game.multiplayer.lastWorldStateSent = 0;
  game.multiplayer.sentInitialWorldState = false;
  game.map = generateSeededMap(game.multiplayer.worldSeed);
  resetGroundCacheForMap();
  applyPlayerStartFromMap();
  const hasSavedPosition = Number.isFinite(Number(characterSave?.x)) && Number.isFinite(Number(characterSave?.y));
  const freshCharacterSession = !resume && !hasSavedPosition;
  const appliedSave = applyCharacterSave(characterSave);
  if (!appliedSave || freshCharacterSession) applyRaceStartFromMap();
  game.enemies = [];
  game.enemySpatialGrid = null;
  game.enemySpatialCount = 0;
  game.enemySpatialVersion = 0;
  game.enemySpatialGridVersion = -1;
  game.eliteRespawns = [];
  populateFixedSpawns();
  populateFixedElites();
  game.projectiles = [];
  game.effects = [];
  game.groundItems = [];
  modeChoice.classList.add("hidden");
  applyFloatingState("bar");
  if (freshCharacterSession) applyNewCharacterWindowLayout();
  syncPointerPause();
  addLog(`<b>${escapeHtml(game.player.name)}</b> ${resume && appliedSave ? "resumes in" : "enters"} multiplayer world <b>${escapeHtml(game.multiplayer.worldName)}</b>.`);
  if (game.multiplayer.isHost) {
    addLog("<b>Multiplayer:</b> your browser is keeping this world moving.");
    sendMultiplayerWorldState(true);
  }
  sendMultiplayerUpdate(true);
  renderUI();
}

function drawPlayer() {
  if (game.player.weapon) {
    ctx.save();
    ctx.globalAlpha = 0.45;
    ctx.strokeStyle = realmUiColor(game.player.weapon.realm);
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.arc(game.player.x, game.player.y, game.player.weapon.range * RANGE_UNIT, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  drawPlayerAuraEffects();
  ctx.save();
  ctx.translate(game.player.x, game.player.y);
  if (unitInvisible(game.player)) {
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
    ctx.beginPath();
    ctx.ellipse(0, game.player.radius * 0.28, game.player.radius * 1.35, game.player.radius * 0.52, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  const avatarAlpha = unitInvisible(game.player) ? 0.35 : unitIncorporeal(game.player) ? 0.5 : 1;
  const baseSprite = avatarBaseSprite(game.player.avatar);
  if (baseSprite?.complete && baseSprite.naturalWidth) {
    drawPlayerAvatar(game.player, game.player.avatar, game.player.radius, avatarAlpha);
  } else {
    ctx.save();
    ctx.globalAlpha = avatarAlpha;
    ctx.fillStyle = "#d6cfbf";
    ctx.beginPath();
    ctx.arc(0, 0, game.player.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = realmInfo.Mortal.color;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.strokeStyle = "#b58a62";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(13, -12);
    ctx.lineTo(34, -28);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();

  if (game.player.rooted > 0) {
    drawTangleVineAnimation(game.player);
  }

  if (game.player.dots.some(dot => dot.name === "Poison")) drawPoisonIndicator(game.player);
  if (game.player.dots.some(dot => dot.name === "Virulent Plague")) drawVirulentPlagueIndicator(game.player);
  if (unitHasBurningDot(game.player) || unitInsideFireblast(game.player)) drawBurningSkinHitFlames(game.player, 0.74, 0.22);

  if (game.player.dots.some(dot => dot.name === "Curse of Disdain")) {
    drawCurseIndicator(game.player);
  }

  if (game.player.statMods.some(mod => mod.name === "Faerie Dust")) drawFaerieDustIndicator(game.player);
  drawChlorophyllIndicator(game.player);
  drawWoodenSkinIndicator(game.player);
  if ((game.player.stunned || 0) > 0) drawStunSpiral(game.player);
  if (unitFrozen(game.player)) drawFreezeTint(game.player);
  drawClarityIndicator(game.player);
  drawDivineShieldIndicator(game.player);

  drawPotionBubbles(game.player);
  drawSpiritOfAvia();
  drawThornShield();
  if (burningSkinSpell(game.player)) drawBurningSkinAura(game.player);
  drawRageIndicator(game.player);
  drawWeaponCooldownMeter();

  drawHealthBar(game.player, 42, "#49c35b");
  drawPlayerXpBar();
  drawPlayerLevelByBars();
}

function drawRageIndicator(unit) {
  if (!unit?.statMods?.some(mod => mod.name === "Rage")) return;
  const t = performance.now() / 1000;
  ctx.save();
  ctx.translate(unit.x, unit.y);
  ctx.rotate(t * 2.4);
  ctx.globalAlpha = 0.72;
  ctx.lineCap = "round";
  for (let i = 0; i < 12; i += 1) {
    const angle = (Math.PI * 2 * i) / 12;
    const inner = unit.radius + 10 + Math.sin(t * 5 + i) * 2;
    const outer = inner + 18;
    ctx.strokeStyle = i % 2 ? "#ff9a2e" : "#d65d1f";
    ctx.lineWidth = i % 2 ? 3 : 2;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
    ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
    ctx.stroke();
  }
  ctx.restore();
}

function drawTangleVineAnimation(unit, local = false) {
  const isSpiderweb = unit.rootVisual === "spiderweb";
  const sprite = isSpiderweb ? sprites.spellEffects.spiderweb : sprites.spellEffects.tangleVine;
  const x = local ? 0 : unit.x;
  const y = local ? 0 : unit.y;
  if (sprite?.complete && sprite.naturalWidth) {
    ctx.save();
    const pulse = 1 + Math.sin(performance.now() / 180) * 0.025;
    const width = Math.max(unit.radius * (isSpiderweb ? 4.4 : 3.7), isSpiderweb ? 92 : 78) * pulse;
    const height = width * (sprite.naturalHeight / sprite.naturalWidth);
    setSpriteSmoothing(true);
    ctx.globalAlpha = isSpiderweb ? 0.86 : 0.9;
    ctx.drawImage(sprite, x - width / 2, y - height / 2, width, height);
    ctx.restore();
    return;
  }
  ctx.save();
  ctx.strokeStyle = isSpiderweb ? realmInfo.Mortal.color : realmInfo.Sylvan.color;
  ctx.lineWidth = local ? 3 : 4;
  ctx.beginPath();
  ctx.arc(x, y, unit.radius + (local ? 6 : 8), 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawWeaponCooldownMeter() {
  if (!game.player.weapon) return;
  const interval = attackInterval();
  const readyProgress = Math.max(0, Math.min(1, 1 - game.player.attackTimer / interval));
  const radius = game.player.radius + 16;
  ctx.save();
  ctx.translate(game.player.x, game.player.y);
  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = "rgba(0, 0, 0, 0.72)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = realmUiColor(game.player.weapon.realm);
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(0, 0, radius, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * readyProgress);
  ctx.stroke();
  ctx.restore();
}

function remotePlayerFlying(peer) {
  return Boolean(peer?.flying || remoteHasStatMod(peer, mod => mod.flying || mod.name === "Spirit of Avia"));
}

function drawRemotePlayerNameplate(peer, radius) {
  const width = 42;
  const height = 5;
  const barY = -playerAvatarTopOffset(radius) - 10;
  const hp = Number(peer.hp);
  const maxHp = Math.max(1, Number(peer.maxHp) || hp || 1);
  const progress = Math.max(0, Math.min(1, (Number.isFinite(hp) ? hp : maxHp) / maxHp));
  ctx.fillStyle = "#0b0a09";
  ctx.fillRect(-width / 2, barY, width, height);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.32)";
  ctx.lineWidth = 1;
  ctx.strokeRect(-width / 2, barY, width, height);
  ctx.fillStyle = "#49c35b";
  ctx.fillRect(-width / 2, barY, width * progress, height);

  const alignment = peer.alignment || "Neutral";
  const symbol = alignmentSymbol(alignment);
  const name = `${String(peer.name || "Soulreaper").slice(0, 24)}${playerChatTags(peer)}`;
  const gap = symbol ? 4 : 0;
  const labelY = barY - 4;
  ctx.font = "bold 12px system-ui";
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(0, 0, 0, 0.88)";
  const symbolWidth = symbol ? ctx.measureText(symbol).width : 0;
  const nameWidth = ctx.measureText(name).width;
  let x = -(symbolWidth + gap + nameWidth) / 2;
  if (symbol) {
    ctx.fillStyle = alignmentSymbolColor(alignment);
    ctx.strokeText(symbol, x, labelY);
    ctx.fillText(symbol, x, labelY);
    x += symbolWidth + gap;
  }
  ctx.fillStyle = "#f2ede3";
  ctx.strokeText(name, x, labelY);
  ctx.fillText(name, x, labelY);
}

function drawRemotePlayers(airborne = false) {
  if (!game.multiplayer.peers.size) return;
  for (const peer of game.multiplayer.peers.values()) {
    if (peer.area && peer.area !== currentPlayerAreaName()) continue;
    if (remotePlayerFlying(peer) !== airborne) continue;
    const x = Number(peer.x) || 0;
    const y = Number(peer.y) || 0;
    const radius = peer.radius || game.player.radius;
    drawRemotePlayerStatusEffects(peer, x, y);
    ctx.save();
    ctx.translate(x, y);
    const avatarAlpha = remoteHasStatMod(peer, mod => mod.invisible)
      ? 0.35
      : remoteHasStatMod(peer, mod => mod.incorporeal)
        ? 0.5
        : 0.86;
    const baseSprite = avatarBaseSprite(peer.avatar);
    if (baseSprite?.complete && baseSprite.naturalWidth) {
      drawPlayerAvatar(peer, peer.avatar, radius, avatarAlpha);
    } else {
      ctx.globalAlpha = avatarAlpha;
      ctx.fillStyle = "#c8bfdf";
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    drawRemotePlayerNameplate(peer, radius);
    if (peer.speech) {
      ctx.font = "bold 12px system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.strokeStyle = "rgba(0, 0, 0, 0.88)";
      ctx.lineWidth = 3;
      ctx.fillStyle = "#f2ede3";
      ctx.strokeText(peer.speech, 0, -radius - 48);
      ctx.fillText(peer.speech, 0, -radius - 48);
    }
    ctx.restore();
  if ((peer.stunned || 0) > 0) drawStunSpiral({ ...peer, radius });
  }
}

function remoteHasStatMod(peer, predicate) {
  return (peer.statMods || []).some(predicate);
}

function remoteHasAura(peer, name) {
  return (peer.activeSpells || []).some(spell => spell.name === name);
}

function buffEffectTarget(message) {
  const targetId = String(message?.targetPlayerId || "");
  if (targetId && targetId === game.multiplayer.id) return game.player;
  const peer = targetId ? game.multiplayer.peers.get(targetId) : null;
  if (peer) return peer;
  return {
    id: targetId,
    x: Number(message?.x) || game.player.x,
    y: Number(message?.y) || game.player.y,
    radius: Number(message?.radius) || game.player.radius,
    statMods: []
  };
}

function applyBuffEffectStatMod(unit, mod) {
  if (!unit || !mod) return;
  normalizeRealmData(mod);
  unit.statMods = Array.isArray(unit.statMods) ? unit.statMods : [];
  const existing = unit.statMods.find(candidate => candidate.name === mod.name);
  if (existing) Object.assign(existing, mod);
  else unit.statMods.push(mod);
}

function showPlayerBuffEffect(message) {
  const unit = buffEffectTarget(message);
  const mod = message.statMod && typeof message.statMod === "object" ? message.statMod : null;
  const sourceName = String(message.sourceName || mod?.name || "Buff");
  if (mod) applyBuffEffectStatMod(unit, mod);
  spawnFloatingText(unit, mod?.name || sourceName, "#68a85e");
  if (message.animation === "prayer" || ["Basic Prayer", "Heavenly Light", "Bone Ritual"].some(name => sourceName.includes(name))) {
    spawnPrayerSparkles(unit, message.palette || null);
  }
  if (mod?.name === "Clarity" || sourceName === "Clarity") spawnClarityFlash(unit);
  if (mod?.name === "Chlorophyll" || sourceName === "Chlorophyll") spawnChlorophyllSparkles(unit);
}

function colorWithAlpha(color, alpha) {
  const value = String(color || "").trim();
  const clamped = Math.max(0, Math.min(1, Number(alpha) || 0));
  const hex = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)?.[1];
  if (hex) {
    const full = hex.length === 3 ? hex.split("").map(char => char + char).join("") : hex;
    const int = Number.parseInt(full, 16);
    return `rgba(${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}, ${clamped})`;
  }
  const rgb = value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (rgb) return `rgba(${rgb[1]}, ${rgb[2]}, ${rgb[3]}, ${clamped})`;
  return `rgba(242, 237, 227, ${clamped})`;
}

function drawAuraFadeCircle(x, y, radius, color, alpha, pulse = 1) {
  const drawRadius = Math.max(1, radius * pulse);
  const centerAlpha = Math.min(0.42, alpha * 1.55);
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, drawRadius);
  gradient.addColorStop(0, colorWithAlpha(color, centerAlpha));
  gradient.addColorStop(0.38, colorWithAlpha(color, centerAlpha * 0.62));
  gradient.addColorStop(0.72, colorWithAlpha(color, centerAlpha * 0.22));
  gradient.addColorStop(1, colorWithAlpha(color, 0));
  ctx.save();
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, drawRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawRemotePlayerStatusEffects(peer, x, y) {
  if (remoteHasAura(peer, "Aura of Protection")) {
    const radius = 9 * RANGE_UNIT;
    const pulse = 1 + Math.sin(performance.now() / 360) * 0.04;
    drawAuraFadeCircle(x, y, radius, "#f0cf63", 0.17 + Math.sin(performance.now() / 260) * 0.05, pulse);
  }
  if (remoteHasAura(peer, "Song of White Stag")) {
    const radius = 9 * RANGE_UNIT;
    const pulse = 1 + Math.sin(performance.now() / 360) * 0.04;
    drawAuraFadeCircle(x, y, radius, realmInfo.Sylvan.color, 0.19 + Math.sin(performance.now() / 260) * 0.05, pulse);
  }
  if (remoteHasAura(peer, "War Drums")) {
    const radius = 9 * RANGE_UNIT;
    const pulse = 1 + Math.sin(performance.now() / 300) * 0.05;
    drawAuraFadeCircle(x, y, radius, "#f08730", 0.18 + Math.sin(performance.now() / 230) * 0.05, pulse);
  }
  if (remoteHasAura(peer, "Bloodthirsty Aura")) {
    const radius = 6 * RANGE_UNIT;
    const pulse = 1 + Math.sin(performance.now() / 280) * 0.06;
    drawAuraFadeCircle(x, y, radius, "#c51f2d", 0.24 + Math.sin(performance.now() / 220) * 0.06, pulse);
  }
  if (remoteHasAura(peer, "Pestilent Aura")) {
    const radius = 9 * RANGE_UNIT;
    const pulse = 1 + Math.sin(performance.now() / 310) * 0.06;
    drawAuraFadeCircle(x, y, radius, realmInfo.Umbral.color, 0.22 + Math.sin(performance.now() / 230) * 0.06, pulse);
  }
  if (remoteHasAura(peer, "Etherwind Aura")) {
    const radius = 9 * RANGE_UNIT;
    const pulse = 1 + Math.sin(performance.now() / 330) * 0.05;
    drawAuraFadeCircle(x, y, radius, "#59b8ff", 0.23 + Math.sin(performance.now() / 250) * 0.05, pulse);
  }
  if (remoteHasStatMod(peer, mod => mod.flying || mod.name === "Spirit of Avia")) {
    const flap = Math.sin(performance.now() / 130) * 6;
    ctx.save();
    ctx.globalAlpha = 0.72;
    ctx.fillStyle = "rgba(104, 168, 94, 0.42)";
    ctx.strokeStyle = realmInfo.Sylvan.color;
    ctx.lineWidth = 3;
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(x + side * 12, y - 6);
      ctx.quadraticCurveTo(x + side * (38 + flap), y - 26, x + side * 30, y + 12);
      ctx.quadraticCurveTo(x + side * 20, y + 6, x + side * 12, y - 6);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }
  if (remoteHasStatMod(peer, mod => mod.thornShield)) {
    const t = performance.now() / 240;
    ctx.save();
    ctx.globalAlpha = 0.58;
    ctx.strokeStyle = realmInfo.Sylvan.color;
    ctx.fillStyle = "rgba(104, 168, 94, 0.12)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, (peer.radius || game.player.radius) + 17 + Math.sin(t) * 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  if ((peer.activeSpells || []).some(spell => spell?.name === "Burning Skin")) {
    drawBurningSkinAura({ x, y, radius: peer.radius || game.player.radius });
  }
  if (remoteHasStatMod(peer, mod => mod.name === "Clarity")) {
    drawClarityIndicator({ x, y, radius: peer.radius || game.player.radius, statMods: peer.statMods || [] });
  }
  if (remoteHasStatMod(peer, mod => mod.name === "Rage")) {
    drawRageIndicator({ x, y, radius: peer.radius || game.player.radius, statMods: peer.statMods || [] });
  }
  if (remoteHasStatMod(peer, mod => mod.name === "Chlorophyll")) {
    drawChlorophyllIndicator({ x, y, radius: peer.radius || game.player.radius, statMods: peer.statMods || [] });
  }
  if (remoteHasStatMod(peer, mod => mod.name === "Wooden Skin")) {
    drawWoodenSkinIndicator({ x, y, radius: peer.radius || game.player.radius, statMods: peer.statMods || [] });
  }
  if (remoteHasStatMod(peer, mod => mod.godspeed || mod.name === "Godspeed")) {
    drawGodspeedBolt({ x, y, radius: peer.radius || game.player.radius, statMods: peer.statMods || [] });
  }
}

function drawPlayerAuraEffects() {
  const auras = [
    { spell: activeSpellByName("Aura of Protection"), color: "#f0cf63", alpha: 0.22 },
    { spell: activeSpellByName("Song of White Stag"), color: realmInfo.Sylvan.color, alpha: 0.24 },
    { spell: activeSpellByName("War Drums"), color: "#f08730", alpha: 0.22 },
    { spell: activeSpellByName("Bloodthirsty Aura"), color: "#c51f2d", alpha: 0.28 },
    { spell: activeSpellByName("Etherwind Aura"), color: "#59b8ff", alpha: 0.24 },
    { spell: activeSpellByName("Pestilent Aura"), color: realmInfo.Umbral.color, alpha: 0.28 }
  ].filter(entry => entry.spell);
  for (const { spell, color, alpha } of auras) {
    const radius = (spell.range || 6) * RANGE_UNIT;
    const pulse = 1 + Math.sin(performance.now() / 360) * 0.04;
    drawAuraFadeCircle(game.player.x, game.player.y, radius, color, alpha + Math.sin(performance.now() / 260) * 0.05, pulse);
    ctx.save();
    ctx.globalAlpha = 0.75;
    ctx.shadowColor = color;
    ctx.shadowBlur = 18;
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(game.player.x, game.player.y, game.player.radius + 14, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}

function drawSpiritOfAvia() {
  if (!unitFlying(game.player)) return;
  const flap = Math.sin(performance.now() / 130) * 6;
  ctx.save();
  ctx.globalAlpha = 0.86;
  ctx.fillStyle = "rgba(104, 168, 94, 0.58)";
  ctx.strokeStyle = realmInfo.Sylvan.color;
  ctx.lineWidth = 3;
  ctx.shadowColor = realmInfo.Sylvan.color;
  ctx.shadowBlur = 14;
  for (const side of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(game.player.x + side * 12, game.player.y - 6);
    ctx.quadraticCurveTo(game.player.x + side * (38 + flap), game.player.y - 26, game.player.x + side * 30, game.player.y + 12);
    ctx.quadraticCurveTo(game.player.x + side * 20, game.player.y + 6, game.player.x + side * 12, game.player.y - 6);
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

function spawnBurningSkinHitEffect(target) {
  if (!target) return;
  game.effects.push({
    type: "burningSkinHit",
    target,
    x: target.x,
    y: target.y,
    age: 0,
    duration: 0.85,
    localOnly: true
  });
}

const BURNING_DOT_NAMES = ["Burning", "Fireball", "Fireblast"];

function unitHasBurningDot(unit) {
  return Boolean(unit?.dots?.some(dot => BURNING_DOT_NAMES.includes(dot.name) && (dot.remaining ?? 0) > 0));
}

function unitInsideFireblast(unit) {
  if (!unit) return false;
  return game.effects.some(effect => (
    effect.type === "fireblast"
    && (unit !== game.player || effect.sourceEnemy || effect.ownerEnemyId)
    && effect.age < (effect.duration || 0)
    && distance(effect, unit) <= (effect.radius || 0) + (unit.radius || 0)
  ));
}

function drawBurningSkinHitFlames(target, alpha = 0.85, overlayAlpha = 0.34) {
  if (!target) return;
  const x = target.x;
  const y = target.y;
  const radius = target.radius || game.player.radius || 18;
  const flicker = Math.sin(performance.now() / 55) * 0.18;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.shadowColor = "#ff7a1f";
  ctx.shadowBlur = 18;
  for (let i = 0; i < 10; i += 1) {
    const angle = i * (Math.PI * 2 / 10) + performance.now() / 180;
    const px = x + Math.cos(angle) * (radius * 0.45 + (i % 3) * 3);
    const py = y - radius * 0.35 + Math.sin(angle * 1.7) * radius * 0.5;
    const height = 14 + ((i * 7) % 9);
    ctx.fillStyle = i % 2 ? "#ffb12a" : "#d84e42";
    ctx.beginPath();
    ctx.moveTo(px, py - height);
    ctx.lineTo(px + 5, py + 5);
    ctx.lineTo(px - 5, py + 5);
    ctx.closePath();
    ctx.fill();
  }
  ctx.globalAlpha = Math.max(0, overlayAlpha + flicker * 0.06);
  ctx.fillStyle = "rgba(216, 78, 66, 0.3)";
  ctx.beginPath();
  ctx.arc(x, y, radius + 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawBurningSkinAura(unit) {
  if (!unit) return;
  const t = performance.now() / 180;
  const radius = unit.radius || game.player.radius;
  ctx.save();
  ctx.translate(unit.x, unit.y);
  ctx.globalAlpha = 0.78;
  ctx.shadowColor = "#ff7a1f";
  ctx.shadowBlur = 18;
  ctx.strokeStyle = "#ff7a1f";
  ctx.fillStyle = "rgba(216, 78, 66, 0.14)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, radius + 17 + Math.sin(t) * 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  for (let i = 0; i < 12; i += 1) {
    const angle = t * 0.9 + i * (Math.PI * 2 / 12);
    const inner = radius + 14;
    const outer = radius + 28 + Math.sin(t * 1.6 + i) * 4;
    const x1 = Math.cos(angle - 0.08) * inner;
    const y1 = Math.sin(angle - 0.08) * inner;
    const x2 = Math.cos(angle) * outer;
    const y2 = Math.sin(angle) * outer;
    const x3 = Math.cos(angle + 0.08) * inner;
    const y3 = Math.sin(angle + 0.08) * inner;
    ctx.fillStyle = i % 2 ? "#ffb12a" : "#d84e42";
    ctx.strokeStyle = "#6f1b11";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(Math.cos(angle) * (outer + 5), Math.sin(angle) * (outer + 5), x2, y2);
    ctx.quadraticCurveTo(Math.cos(angle) * (outer - 5), Math.sin(angle) * (outer - 5), x3, y3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

function drawThornShield() {
  if (!game.player.statMods.some(mod => mod.thornShield)) return;
  const t = performance.now() / 240;
  ctx.save();
  ctx.globalAlpha = 0.76;
  ctx.shadowColor = realmInfo.Sylvan.color;
  ctx.shadowBlur = 16;
  ctx.strokeStyle = realmInfo.Sylvan.color;
  ctx.fillStyle = "rgba(104, 168, 94, 0.18)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(game.player.x, game.player.y, game.player.radius + 17 + Math.sin(t) * 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#9ff27f";
  ctx.strokeStyle = "#1d5a25";
  ctx.lineWidth = 2;
  for (let i = 0; i < 10; i += 1) {
    const angle = t + i * (Math.PI * 2 / 10);
    const inner = game.player.radius + 15;
    const outer = game.player.radius + 27 + Math.sin(t * 1.7 + i) * 2;
    const x1 = game.player.x + Math.cos(angle - 0.12) * inner;
    const y1 = game.player.y + Math.sin(angle - 0.12) * inner;
    const x2 = game.player.x + Math.cos(angle) * outer;
    const y2 = game.player.y + Math.sin(angle) * outer;
    const x3 = game.player.x + Math.cos(angle + 0.12) * inner;
    const y3 = game.player.y + Math.sin(angle + 0.12) * inner;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

function drawPlayerXpBar() {
  const width = 42;
  const height = 3;
  const y = healthBarY(game.player) + 9;
  const progress = game.player.nextXp > 0 ? Math.max(0, Math.min(1, game.player.xp / game.player.nextXp)) : 0;
  ctx.fillStyle = "#0b0a09";
  ctx.fillRect(game.player.x - width / 2, y, width, height);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.lineWidth = 1;
  ctx.strokeRect(game.player.x - width / 2, y, width, height);
  ctx.fillStyle = "#dec466";
  ctx.fillRect(game.player.x - width / 2, y, width * progress, height);
}

function drawPlayerLevelByBars() {
  const width = 42;
  const barLeft = game.player.x - width / 2;
  const labelX = barLeft - 7;
  const labelY = healthBarY(game.player) + 3;
  ctx.save();
  ctx.font = "bold 10px system-ui";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(0, 0, 0, 0.82)";
  ctx.fillStyle = "#f0cf63";
  const text = String(game.player.level);
  ctx.strokeText(text, labelX, labelY);
  ctx.fillText(text, labelX, labelY);
  ctx.restore();
}

function potionColor(color) {
  return {
    blue: "#5f94d9",
    orange: "#e28a35",
    green: "#68a85e",
    white: "#f2ede3",
    red: "#d84e42"
  }[color] || "#f2ede3";
}

function drawPotionBubbles(unit) {
  const potions = (unit.statMods || []).filter(mod => mod.potion);
  if (!potions.length) return;
  ctx.save();
  potions.forEach((mod, potionIndex) => {
    const color = potionColor(mod.color);
    ctx.fillStyle = color;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.65)";
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 4; i += 1) {
      const t = performance.now() / 650 + i * 0.8 + potionIndex * 1.7;
      const x = unit.x + Math.sin(t * 1.9) * (unit.radius + 8 + potionIndex * 3);
      const y = unit.y - unit.radius - 4 - ((t * 18) % 34);
      const radius = 2.5 + ((i + potionIndex) % 3);
      ctx.globalAlpha = 0.45 + Math.sin(t) * 0.16;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  });
  ctx.restore();
}

function drawFaerieFireIndicator(unit) {
  ctx.save();
  ctx.strokeStyle = realmInfo.Sylvan.color;
  ctx.fillStyle = "rgba(101, 214, 111, 0.12)";
  ctx.shadowColor = realmInfo.Sylvan.color;
  ctx.shadowBlur = 16;
  ctx.lineWidth = 3;
  const pulse = Math.sin(performance.now() / 150) * 3;
  ctx.beginPath();
  ctx.arc(unit.x, unit.y, unit.radius + 10 + pulse, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.shadowBlur = 0;
  for (let i = 0; i < 6; i += 1) {
    const angle = performance.now() / 280 + i * ((Math.PI * 2) / 6);
    const x = unit.x + Math.cos(angle) * (unit.radius + 15);
    const y = unit.y + Math.sin(angle * 1.2) * (unit.radius + 15);
    ctx.fillStyle = i % 2 ? "#b7ff7f" : realmInfo.Sylvan.color;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawFaerieDustIndicator(unit) {
  ctx.save();
  ctx.fillStyle = "#ff9bdc";
  ctx.strokeStyle = "rgba(90, 0, 65, 0.85)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 7; i += 1) {
    const angle = performance.now() / 260 + i * ((Math.PI * 2) / 7);
    const x = unit.x + Math.cos(angle) * (unit.radius + 12);
    const y = unit.y + Math.sin(angle * 1.15) * (unit.radius + 12);
    ctx.beginPath();
    ctx.moveTo(x, y - 5);
    ctx.lineTo(x + 2, y - 1);
    ctx.lineTo(x + 6, y);
    ctx.lineTo(x + 2, y + 1);
    ctx.lineTo(x, y + 5);
    ctx.lineTo(x - 2, y + 1);
    ctx.lineTo(x - 6, y);
    ctx.lineTo(x - 2, y - 1);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

function unitHasStatMod(unit, name) {
  return Boolean(unit?.statMods?.some(mod => mod.name === name));
}

function spawnChlorophyllSparkles(unit) {
  if (!unit) return;
  game.effects.push({
    type: "chlorophyllSparkle",
    x: unit.x,
    y: unit.y,
    radius: unit.radius || 18,
    age: 0,
    duration: 0.85,
    localOnly: game.mode === "multiplayer"
  });
}

function drawChlorophyllIndicator(unit) {
  if (!unitHasStatMod(unit, "Chlorophyll")) return;
  const t = performance.now() / 1000;
  const radius = (unit.radius || 18) + 9 + Math.sin(t * 4) * 1.5;
  ctx.save();
  ctx.translate(unit.x, unit.y);
  ctx.globalAlpha = 0.28;
  ctx.shadowColor = "#7dff67";
  ctx.shadowBlur = 16;
  ctx.fillStyle = "rgba(89, 190, 75, 0.42)";
  ctx.beginPath();
  ctx.ellipse(0, 0, radius * 0.92, radius * 1.12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 0.74;
  ctx.fillStyle = "#baff6a";
  for (let i = 0; i < 6; i += 1) {
    const angle = t * 1.8 + i * Math.PI / 3;
    const x = Math.cos(angle) * (radius + 5);
    const y = Math.sin(angle * 1.08) * (radius + 2);
    ctx.beginPath();
    ctx.arc(x, y, 2.2 + (i % 2), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawWoodenSkinIndicator(unit) {
  if (!unitHasStatMod(unit, "Wooden Skin")) return;
  const t = performance.now() / 1000;
  const radius = (unit.radius || 18) + 13;
  ctx.save();
  ctx.translate(unit.x, unit.y);
  ctx.globalAlpha = 0.72;
  ctx.strokeStyle = "#7b5a36";
  ctx.shadowColor = "#68a85e";
  ctx.shadowBlur = 8;
  ctx.lineWidth = 3;
  for (let i = 0; i < 8; i += 1) {
    const angle = i * Math.PI / 4 + Math.sin(t + i) * 0.08;
    const inner = radius - 5 + (i % 2) * 2;
    const outer = radius + 8;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
    ctx.lineTo(Math.cos(angle + 0.12) * outer, Math.sin(angle + 0.12) * outer);
    ctx.stroke();
  }
  ctx.restore();
}

function drawFreezeTint(unit) {
  ctx.save();
  ctx.globalAlpha = 0.34 + Math.sin(performance.now() / 180) * 0.08;
  ctx.fillStyle = "#5f94d9";
  ctx.beginPath();
  ctx.arc(unit.x, unit.y, unit.radius + 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#bde7ff";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();
}

function drawClarityIndicator(unit) {
  if (!unit.statMods?.some(mod => mod.name === "Clarity")) return;
  const now = performance.now();
  ctx.save();
  ctx.translate(unit.x, unit.y);
  ctx.globalAlpha = 0.28;
  ctx.fillStyle = "rgba(67, 226, 255, 0.16)";
  ctx.strokeStyle = "#43e2ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, unit.radius + 13, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.globalAlpha = 0.75;
  for (let i = 0; i < 4; i += 1) {
    const angle = i * (Math.PI / 2) + now / 900;
    const r = unit.radius + 10;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    const size = 2;
    ctx.fillStyle = i % 2 ? "#ffffff" : "#bdf8ff";
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x - size, y);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function spawnChainLightningEffect(source, target, realm = "Celestial") {
  if (!source || !target) return;
  spawnChainLightningLinks([{ sourceX: source.x, sourceY: source.y, targetX: target.x, targetY: target.y }], realm);
}

function spawnChainLightningLinks(links, realm = "Celestial") {
  const normalized = (links || [])
    .map(link => ({
      sourceX: Number(link.sourceX),
      sourceY: Number(link.sourceY),
      targetX: Number(link.targetX),
      targetY: Number(link.targetY)
    }))
    .filter(link => [link.sourceX, link.sourceY, link.targetX, link.targetY].every(Number.isFinite));
  if (!normalized.length) return;
  game.effects.push({
    type: "chainLightning",
    localOnly: true,
    links: normalized,
    age: 0,
    duration: 0.38,
    realm
  });
}

function drawDivineShieldIndicator(unit) {
  const shield = unit.statMods?.find(mod => mod.shieldAmount > 0);
  if (!shield) return;
  const color = shield.shieldColor || (shield.name === "Arcane Shield" ? realmInfo.Ethereal.color : realmInfo.Celestial.color);
  const particleColor = shield.name === "Arcane Shield" ? "#bde7ff" : "#fff1a8";
  const t = performance.now() / 260;
  ctx.save();
  ctx.globalAlpha = 0.72;
  ctx.strokeStyle = color;
  ctx.fillStyle = colorWithAlpha(color, 0.12);
  ctx.shadowColor = color;
  ctx.shadowBlur = 14;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(unit.x, unit.y, unit.radius + 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  for (let i = 0; i < 5; i += 1) {
    const angle = t + i * ((Math.PI * 2) / 5);
    ctx.fillStyle = particleColor;
    ctx.beginPath();
    ctx.arc(unit.x + Math.cos(angle) * (unit.radius + 20), unit.y + Math.sin(angle) * (unit.radius + 20), 3.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawEnemy(enemy) {
  const realm = realmInfo[enemy.realm];
  ctx.save();
  ctx.translate(enemy.x, enemy.y);
  if (enemy.pacified > 0) {
    const pulse = 0.5 + Math.sin(performance.now() / 130) * 0.16;
    ctx.save();
    ctx.globalAlpha = 0.45 + pulse * 0.25;
    ctx.shadowColor = "#6bbcff";
    ctx.shadowBlur = 24;
    ctx.strokeStyle = "#6bbcff";
    ctx.fillStyle = "rgba(107, 188, 255, 0.16)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, enemy.radius + 9 + pulse * 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  if (enemy.boss) {
    const auraColor = realmUiColor(enemy.realm);
    const time = performance.now();
    const pulse = 0.5 + Math.sin(time / 150) * 0.5;
    ctx.save();
    ctx.globalAlpha = 0.72 + pulse * 0.16;
    ctx.shadowColor = auraColor;
    ctx.shadowBlur = 42;
    ctx.fillStyle = colorWithAlpha(auraColor, 0.16);
    ctx.strokeStyle = auraColor;
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.arc(0, 0, enemy.radius + 16 + pulse * 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.rotate(time / 520);
    ctx.setLineDash([11, 7]);
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(0, 0, enemy.radius + 25, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = auraColor;
    for (let index = 0; index < 8; index += 1) {
      const angle = index * Math.PI / 4;
      const distance = enemy.radius + 25;
      ctx.beginPath();
      ctx.arc(Math.cos(angle) * distance, Math.sin(angle) * distance, 3.5 + pulse * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  } else if (enemy.elite) {
    const auraColor = realmUiColor(enemy.realm);
    ctx.save();
    ctx.globalAlpha = 0.42 + Math.sin(performance.now() / 180) * 0.12;
    ctx.shadowColor = auraColor;
    ctx.shadowBlur = 24;
    ctx.strokeStyle = auraColor;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(0, 0, enemy.radius + 8, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
  const sprite = enemySprite(enemy);
  const spriteSize = enemySpriteSize(enemy);
  ctx.save();
  ctx.globalAlpha = unitIncorporeal(enemy) ? 0.5 : 1;
  if (sprite?.complete && sprite.naturalWidth) {
    const size = spriteSize;
    drawSpriteFacing(sprite, 0, 0, size, enemy.facingX || 1);
  } else {
    ctx.fillStyle = realm.color;
    ctx.beginPath();
    ctx.arc(0, 0, enemy.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = enemy.boss ? realmUiColor(enemy.realm) : enemy.elite ? "#f0cf63" : enemy.rooted > 0 ? realmInfo.Sylvan.color : "#0d0c0b";
    ctx.lineWidth = enemy.boss ? 5 : enemy.elite ? 3.5 : 3;
    ctx.stroke();
  }
  ctx.restore();
  if (enemy.rooted > 0) {
    drawTangleVineAnimation(enemy, true);
  }
  drawEnemyNameLabel(enemy, spriteSize);
  ctx.restore();

  if (enemy.dots.some(dot => dot.name === "Curse of Disdain")) drawCurseIndicator(enemy);
  if (enemy.dots.some(dot => dot.name === "Poison")) drawPoisonIndicator(enemy);
  if (enemy.dots.some(dot => dot.name === "Virulent Plague")) drawVirulentPlagueIndicator(enemy);
  if (unitHasBurningDot(enemy) || unitInsideFireblast(enemy)) drawBurningSkinHitFlames(enemy, 0.74, 0.22);
  if (enemy.stunned > 0) drawStunSpiral(enemy);
  if (enemy.pacified > 0) drawPacifySparkles(enemy);
  if (enemy.statMods.some(mod => mod.name === "Faerie Fire")) drawFaerieFireIndicator(enemy);
  if (enemy.statMods.some(mod => mod.name === "Faerie Dust")) drawFaerieDustIndicator(enemy);
  drawChlorophyllIndicator(enemy);
  drawWoodenSkinIndicator(enemy);
  if (unitFrozen(enemy)) drawFreezeTint(enemy);
  drawClarityIndicator(enemy);
  drawDivineShieldIndicator(enemy);
  if (burningSkinSpell(enemy)) drawBurningSkinAura(enemy);
  if (enemy.questGiver === "war-with-goblins" && npcInteractsWithPlayer(enemy)) {
    drawQuestMarker(enemy, npcQuestMarkerState("war-with-goblins"));
  }
  drawQuestMarkerForNpc(enemy);

  drawHealthBar(enemy, 34, "#d84e42");
}

function stunMarkerOffset(unit) {
  if (game.enemies.includes(unit)) return Math.max(unit.radius + 26, enemySpriteSize(unit) * 0.44 + 12);
  return Math.max((unit.radius || game.player.radius || 18) + 30, (unit.radius || game.player.radius || 18) * 2.25);
}

function drawStunSpiral(unit) {
  const t = performance.now() / 220;
  const y = unit.y - stunMarkerOffset(unit);
  ctx.save();
  ctx.translate(unit.x, y);
  ctx.rotate(t);
  ctx.strokeStyle = "#f0a348";
  ctx.shadowColor = "#f0cf63";
  ctx.shadowBlur = 10;
  ctx.lineWidth = 2.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  for (let i = 0; i < 42; i += 1) {
    const p = i / 41;
    const angle = p * Math.PI * 4.5;
    const radius = 2 + p * 12;
    const x = Math.cos(angle) * radius;
    const sy = Math.sin(angle) * radius * 0.62;
    if (i === 0) ctx.moveTo(x, sy);
    else ctx.lineTo(x, sy);
  }
  ctx.stroke();
  ctx.restore();
}

function drawEnemyNameLabel(enemy) {
  const labelY = healthBarY(enemy) - enemy.y - 8;
  const hostile = enemyAggressiveToPlayer(enemy);
  const hovered = game.renderHoveredEnemy === enemy;
  const nameText = enemy.name;
  const levelText = ` (${enemy.lvl})`;
  ctx.save();
  ctx.strokeStyle = "rgba(0, 0, 0, 0.88)";
  ctx.lineWidth = 3;
  ctx.font = "bold 10px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  if (enemy.pet && enemy.masterName && !hovered) {
    ctx.fillStyle = "#d9b95f";
    const petText = `(${enemy.masterName}'s Pet)`;
    ctx.strokeText(petText, 0, labelY - 12);
    ctx.fillText(petText, 0, labelY - 12);
  }
  const metricsKey = `${nameText}|${levelText}`;
  if (enemy._labelMetrics?.key !== metricsKey) {
    enemy._labelMetrics = {
      key: metricsKey,
      nameWidth: ctx.measureText(nameText).width,
      levelWidth: ctx.measureText(levelText).width
    };
  }
  const { nameWidth, levelWidth } = enemy._labelMetrics;
  let x = -(nameWidth + levelWidth) / 2;
  ctx.fillStyle = hostile ? "#ff4d4d" : "#f2ede3";
  ctx.textAlign = "left";
  ctx.strokeText(nameText, x, labelY);
  ctx.fillText(nameText, x, labelY);
  x += nameWidth;
  ctx.fillStyle = "#f2ede3";
  ctx.strokeText(levelText, x, labelY);
  ctx.fillText(levelText, x, labelY);
  if (hovered) drawEnemyHoverDetails(enemy, labelY - 12);
  ctx.restore();
}

function drawEnemyHoverDetails(enemy, y) {
  const realmColor = realmUiColor(enemy.realm);
  const type = enemy.type || "Unknown";
  const middle = enemy.realm;
  const right = ` ${type}`;
  ctx.font = "bold 8px system-ui";
  ctx.lineWidth = 2.5;
  const metricsKey = `${middle}|${right}`;
  if (enemy._hoverLabelMetrics?.key !== metricsKey) {
    const middleWidth = ctx.measureText(middle).width;
    enemy._hoverLabelMetrics = {
      key: metricsKey,
      middleWidth,
      totalWidth: middleWidth + ctx.measureText(right).width
    };
  }
  const { middleWidth, totalWidth } = enemy._hoverLabelMetrics;
  let x = -totalWidth / 2;
  ctx.strokeStyle = "rgba(0, 0, 0, 0.9)";
  ctx.fillStyle = realmColor;
  ctx.strokeText(middle, x, y);
  ctx.fillText(middle, x, y);
  x += middleWidth;
  ctx.fillStyle = "#d6cfbf";
  ctx.strokeText(right, x, y);
  ctx.fillText(right, x, y);
}

function enemySprite(enemy) {
  if (enemy.sprite) return spriteFromPath(enemy.sprite);
  const key = enemy.templateName || enemy.name;
  return {
    "Giant Rat": sprites.mobs.giantRat,
    Goblin: sprites.mobs.goblinTroublemaker,
    "Goblin Troublemaker": sprites.mobs.goblinTroublemaker,
    Guard: sprites.npcs.guard,
    "Guard Dorin": sprites.npcs.guard,
    Imp: sprites.mobs.imp,
    "Brownie Scout": sprites.mobs.brownieScout,
    Pixie: sprites.mobs.pixie,
    Napaea: sprites.mobs.pixie,
    "Plague Rat": sprites.mobs.plagueRat,
    "Goblin Thug": sprites.mobs.goblinThug,
    "Goblin Shaman": sprites.mobs.goblinShaman,
    "Bog Witch": sprites.mobs.bogWitch,
    "Plague Wolf": sprites.mobs.plagueWolf,
    "Will-o-Wisp": sprites.mobs.willOWisp,
    Skeleton: sprites.mobs.decayingSkeleton,
    "Diarrhea Monster": sprites.mobs.secretDiarrheaMonster,
    "Secret Diarrhea Monster": sprites.mobs.secretDiarrheaMonster,
    Bat: sprites.mobs.bat,
    "Brownie Druid": sprites.mobs.brownieDruid,
    "Greater Pixie": sprites.mobs.greaterPixie,
    Unicorn: sprites.mobs.unicorn,
    Nymph: sprites.mobs.nymph,
    Dryad: sprites.mobs.dryad,
    "Whisperspring Nymph": sprites.mobs.nymph,
    "Whisperspring Dryad": sprites.mobs.dryad,
    "Whisperspring Elder Nymph": sprites.mobs.nymph,
    "Whisperspring Elder Dryad": sprites.mobs.dryad,
    Treant: sprites.mobs.treant,
    Leprechaun: sprites.mobs.leprechaun,
    Naiad: sprites.mobs.naiad,
    "Carnivorous Plant": sprites.mobs.carnivorousPlant,
    Snapdragon: sprites.mobs.carnivorousPlant,
    "Green Drakeling": sprites.mobs.greenDrakeling,
    Salamander: sprites.mobs.salamander,
    Incubus: sprites.mobs.incubus,
    Zombie: sprites.mobs.zombie,
    Efreet: sprites.mobs.efreet,
    "Goblin Wolfrider": sprites.mobs.goblinWolfrider,
    "Goblin King": sprites.mobs.goblinKing,
    "Mushroom Man": sprites.mobs.mushroomMan,
    Wolf: sprites.mobs.wolf,
    Bear: sprites.mobs.bear,
    "Black Panther": sprites.mobs.blackPanther,
    "Snow Leopard": sprites.mobs.snowLeopard,
    "Snow Leapard": sprites.mobs.snowLeopard,
    Stag: sprites.mobs.stag,
    "White Stag": sprites.mobs.whiteStag,
    "Skeleton Mage": sprites.mobs.skeletonMage,
    Ghost: sprites.mobs.ghost,
    "Water Elemental": sprites.mobs.waterElemental,
    "Fire Elemental": sprites.mobs.fireElemental,
    "Ice Elemental": sprites.mobs.iceElemental,
    "Shadow Elemental": sprites.mobs.shadowElemental,
    "Light Elemental": sprites.mobs.lightElemental,
    Yeti: sprites.mobs.yeti,
    Troll: sprites.mobs.troll,
    Cherub: sprites.mobs.cherub,
    Ogre: sprites.mobs.ogre,
    "Blue Hydra": sprites.mobs.blueHydra,
    Charybdis: sprites.mobs.charybdis,
    "Waterfall Golem": sprites.mobs.waterfallGolem,
    "Ancient Treant": sprites.mobs.ancientTreant,
    Leshy: sprites.mobs.leshy,
    Leshachikha: sprites.mobs.leshachikha,
    "Yaar the Slumberer": sprites.mobs.greenDragon,
    Satyr: sprites.mobs.satyr,
    Tatzelwurm: sprites.mobs.tatzelwurm
  }[key] || null;
}

function enemySpriteSize(enemy) {
  const key = enemy.templateName || enemy.name;
  const scale = {
    "Giant Rat": 4.8,
    "Plague Rat": 4.5,
    Wolf: 5,
    Bear: 5.6,
    "Black Panther": 5,
    "Snow Leopard": 5,
    "Snow Leapard": 5,
    Stag: 5.3,
    "White Stag": 5.3,
    "Skeleton Mage": 4.8,
    Ghost: 5,
    "Plague Wolf": 5,
    "Goblin Thug": 4.7,
    "Bog Witch": 4.7,
    "Will-o-Wisp": 4.2,
    Skeleton: 4.4,
    "Diarrhea Monster": 5,
    "Secret Diarrhea Monster": 5,
    Bat: 5.2,
    "Greater Pixie": 4.6,
    Unicorn: 5.2,
    Treant: 5.4,
    "Carnivorous Plant": 5.1,
    Snapdragon: 5.1,
    "Green Drakeling": 5,
    Salamander: 5,
    Incubus: 5,
    Zombie: 4.8,
    Efreet: 4.8,
    "Goblin Wolfrider": 5.5,
    "Goblin King": 5.3,
    "Mushroom Man": 5,
    "Water Elemental": 5,
    "Fire Elemental": 5,
    "Ice Elemental": 5,
    "Shadow Elemental": 5,
    "Light Elemental": 5,
    Yeti: 5.3,
    Troll: 5.2,
    Cherub: 4.4,
    Ogre: 5.4,
    "Blue Hydra": 5.8,
    Charybdis: 5.7,
    "Waterfall Golem": 5.5,
    "Ancient Treant": 5.7,
    Leshy: 5,
    Leshachikha: 5,
    "Yaar the Slumberer": 5.8,
    "Whisperspring Nymph": 4.5,
    "Whisperspring Dryad": 4.5,
    "Whisperspring Elder Nymph": 4.7,
    "Whisperspring Elder Dryad": 4.7,
    Satyr: 4.8,
    Tatzelwurm: 5.1
  }[key] || 4.3;
  return enemy.radius * scale * (enemy.boss ? 1.16 : enemy.elite ? 1.08 : 1);
}

function drawMobInspectTooltip(enemy, camera, rect) {
  const visible = enemy.x + 120 > camera.x
    && enemy.x - 40 < camera.x + rect.width
    && enemy.y + 90 > camera.y
    && enemy.y - 90 < camera.y + rect.height;
  if (!visible) return;

  const stats = enemy.stats || {};
  const spellSegments = (enemy.spells || []).map(spell => ({
    text: `${spell.name}${spellLevel(spell) ? ` ${spellLevel(spell)}` : ""}`,
    color: realmUiColor(spell.realm || "Mortal"),
    shadow: (spell.realm || "Mortal") === "Umbral"
  }));
  const lines = [
    `${enemy.name} LVL ${enemy.lvl}`,
    `${enemy.realm} ${enemy.type} ${unitAlignment(enemy)}`,
    ...(enemy.type === "Beast" ? [`Foodchain ${enemy.foodchain || "Prey"}`] : []),
    `Weapon ${enemy.weapon?.name || "None"}`,
    ...(spellSegments.length ? ["Spells"] : []),
    `HP ${formatNumber(enemy.hp)}/${formatNumber(enemy.maxHp)}`,
    `ATK ${formatNumber(stats.ATK)} DEF ${formatNumber(stats.DEF)} SPD ${formatNumber(stats.SPD)}`,
    `AGL ${formatNumber(stats.AGL)} INT ${formatNumber(stats.INT)} FOCUS ${formatNumber(stats.FOCUS)}`,
    `BLOCK ${formatNumber(stats.BLOCK)} RES ${formatNumber(stats.RESIST)} REG ${formatNumber(stats.REGEN)}`
  ];
  const padding = 7;
  const lineHeight = 12;
  const width = 172;
  const height = padding * 2 + lines.length * lineHeight;
  let x = enemy.x + enemy.radius + 12;
  let y = enemy.y - height / 2;
  const worldRight = camera.x + rect.width;
  const worldBottom = camera.y + rect.height;
  if (x + width > worldRight - 8) x = enemy.x - enemy.radius - width - 12;
  y = Math.max(camera.y + 8, Math.min(y, worldBottom - height - 8));

  ctx.save();
  ctx.fillStyle = "rgba(9, 8, 7, 0.9)";
  ctx.strokeStyle = realmUiColor(enemy.realm);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, 5);
  ctx.fill();
  ctx.stroke();
  ctx.font = "bold 10px system-ui";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  lines.forEach((line, index) => {
    const tx = x + padding;
    const ty = y + padding + index * lineHeight;
    if (line === "Spells") {
      drawInspectTextSegments([
        { text: "Spells ", color: "#d6cfbf" },
        ...spellSegments.flatMap((segment, segmentIndex) => [
          segmentIndex ? { text: ", ", color: "#d6cfbf" } : null,
          segment
        ]).filter(Boolean)
      ], tx, ty, width - padding * 2);
    } else {
      ctx.fillStyle = index === 0 ? "#f2ede3" : index === 1 ? realmUiColor(enemy.realm) : "#d6cfbf";
      ctx.fillText(line, tx, ty);
    }
  });
  ctx.restore();

  const weaponLineIndex = enemy.type === "Beast" ? 3 : 2;
  const mouse = game.mouseWorld;
  const weaponLineTop = y + padding + weaponLineIndex * lineHeight;
  if (mouse
    && enemy.weapon
    && mouse.x >= x
    && mouse.x <= x + width
    && mouse.y >= weaponLineTop - 2
    && mouse.y <= weaponLineTop + lineHeight + 2) {
    drawWeaponInspectTooltip(enemy.weapon, x + width + 8, weaponLineTop - 6, camera, rect);
  }
}

function drawInspectTextSegments(segments, x, y, maxWidth = Infinity) {
  let cursor = x;
  for (const segment of segments) {
    const text = String(segment.text || "");
    const available = maxWidth - (cursor - x);
    if (available <= 0) break;
    let drawText = text;
    if (ctx.measureText(drawText).width > available) {
      while (drawText.length > 1 && ctx.measureText(`${drawText}...`).width > available) {
        drawText = drawText.slice(0, -1);
      }
      drawText = `${drawText}...`;
    }
    ctx.fillStyle = segment.color || "#d6cfbf";
    if (segment.shadow) {
      ctx.strokeStyle = "#a16cff";
      ctx.lineWidth = 2;
      ctx.strokeText(drawText, cursor, y);
    }
    ctx.fillText(drawText, cursor, y);
    cursor += ctx.measureText(drawText).width;
    if (drawText.endsWith("...")) break;
  }
}

function drawWeaponInspectTooltip(weapon, x, y, camera, rect) {
  const realm = weapon.realm || "Mortal";
  const lines = [
    { label: "Realm", value: realm, color: realmUiColor(realm), shadow: realm === "Umbral" },
    { value: weaponHandText(weapon) },
    { label: "DMG", value: weapon.dice || "1D4" },
    { label: "Delay", value: formatNumber(weapon.speed ?? 100) }
  ];
  const padding = 7;
  const lineHeight = 13;
  const width = 118;
  const height = padding * 2 + lines.length * lineHeight;
  const worldRight = camera.x + rect.width;
  const worldBottom = camera.y + rect.height;
  x = Math.min(x, worldRight - width - 8);
  y = Math.max(camera.y + 8, Math.min(y, worldBottom - height - 8));

  ctx.save();
  ctx.fillStyle = "rgba(9, 8, 7, 0.94)";
  ctx.strokeStyle = "#65563d";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, 5);
  ctx.fill();
  ctx.stroke();
  ctx.font = "bold 10px system-ui";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  lines.forEach((line, index) => {
    const text = line.label ? `${line.label}: ${line.value}` : line.value;
    const tx = x + padding;
    const ty = y + padding + index * lineHeight;
    ctx.fillStyle = line.color || "#d6cfbf";
    if (line.shadow) {
      ctx.strokeStyle = "#a16cff";
      ctx.lineWidth = 2;
      ctx.strokeText(text, tx, ty);
    }
    ctx.fillText(text, tx, ty);
  });
  ctx.restore();
}

function drawPacifySparkles(unit) {
  const now = performance.now();
  ctx.save();
  ctx.translate(unit.x, unit.y);
  ctx.fillStyle = "#a9dcff";
  ctx.strokeStyle = "#2f8fe8";
  ctx.lineWidth = 1.5;
  ctx.shadowColor = "#6bbcff";
  ctx.shadowBlur = 10;
  for (let i = 0; i < 8; i += 1) {
    const drift = (now / 520 + i * 0.19) % 1;
    const angle = i * ((Math.PI * 2) / 8) + now / 650;
    const radius = unit.radius + 9 + Math.sin(now / 180 + i) * 5;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius - drift * 12;
    const size = 2.4 + Math.sin(now / 120 + i) * 0.8;
    ctx.globalAlpha = 0.35 + (1 - drift) * 0.55;
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x + size, y);
    ctx.lineTo(x, y + size);
    ctx.lineTo(x - size, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

function drawCurseIndicator(unit) {
  const pulse = 1 + Math.sin(performance.now() / 140) * 0.12;
  ctx.save();
  ctx.translate(unit.x, unit.y);
  ctx.strokeStyle = "#b35cff";
  ctx.fillStyle = "rgba(179, 92, 255, 0.18)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, (unit.radius + 8) * pulse, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#ead8ff";
  ctx.font = "bold 12px system-ui";
  ctx.textAlign = "center";
  ctx.fillText("!", 0, -unit.radius - 14);
  ctx.restore();
}

function unitHeadMarkerY(unit, extraOffset = 12) {
  const enemy = game.enemies.includes(unit);
  const spriteTopOffset = enemy ? Math.max(unit.radius + 16, enemySpriteSize(unit) * 0.42) : unit.radius + 18;
  return unit.y - spriteTopOffset - extraOffset;
}

function playerAvatarTopOffset(radius = game.player.radius) {
  return radius * 1.725 + 5;
}

function unitSpriteTopOffset(unit) {
  const radius = unit?.radius || game.player.radius || 18;
  if (game.enemies.includes(unit)) {
    const sprite = enemySprite(unit);
    return sprite?.complete && sprite.naturalWidth
      ? Math.max(radius, enemySpriteSize(unit) / 2)
      : radius;
  }
  return playerAvatarTopOffset(radius);
}

function healthBarY(unit) {
  const isPlayer = unit === game.player;
  return unit.y - unitSpriteTopOffset(unit) - (isPlayer ? 16 : 10);
}

function drawPoisonIndicator(unit) {
  const y = unitHeadMarkerY(unit, unit === game.player ? 28 : 12);
  ctx.save();
  ctx.fillStyle = "#f2f2ef";
  ctx.strokeStyle = "rgba(0, 0, 0, 0.85)";
  ctx.lineWidth = 3;
  ctx.font = "bold 18px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.strokeText("☠", unit.x, y);
  ctx.fillText("☠", unit.x, y);
  ctx.restore();
}

function drawVirulentPlagueIndicator(unit) {
  const pulse = 0.72 + Math.sin(performance.now() / 150) * 0.18;
  const y = unitHeadMarkerY(unit, unit === game.player ? 30 : 14);
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 19px system-ui";
  ctx.shadowColor = "#b35cff";
  ctx.shadowBlur = 12 + pulse * 8;
  ctx.strokeStyle = "rgba(31, 3, 45, 0.95)";
  ctx.fillStyle = "#c77dff";
  ctx.lineWidth = 4;
  ctx.globalAlpha = 0.92;
  ctx.strokeText("☠", unit.x, y);
  ctx.fillText("☠", unit.x, y);
  ctx.fillStyle = "#6f1bb1";
  ctx.globalAlpha = 0.65 + pulse * 0.2;
  for (let i = 0; i < 3; i += 1) {
    const angle = performance.now() / 360 + i * Math.PI * 2 / 3;
    ctx.beginPath();
    ctx.arc(unit.x + Math.cos(angle) * 12, y + Math.sin(angle) * 7, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function unitHasGodspeed(unit) {
  return Boolean(unit?.statMods?.some(mod => mod.godspeed || mod.name === "Godspeed"));
}

function drawGodspeedBolt(unit) {
  if (!unitHasGodspeed(unit)) return;
  const pulse = 0.65 + Math.sin(performance.now() / 120) * 0.18;
  const x = unit.x;
  const y = unitHeadMarkerY(unit, 0);
  ctx.save();
  ctx.globalAlpha = 0.88;
  ctx.shadowColor = "#ffd84a";
  ctx.shadowBlur = 10 + pulse * 8;
  ctx.fillStyle = "#ffd84a";
  ctx.beginPath();
  ctx.moveTo(x + 1, y - 10);
  ctx.lineTo(x - 8, y + 1);
  ctx.lineTo(x - 2, y + 1);
  ctx.lineTo(x - 5, y + 12);
  ctx.lineTo(x + 8, y - 3);
  ctx.lineTo(x + 1, y - 3);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawHealthBar(unit, width, color) {
  const isPlayer = unit === game.player;
  const height = isPlayer ? 6 : 4;
  const y = healthBarY(unit);
  drawGodspeedBolt(unit);
  ctx.fillStyle = "#0b0a09";
  ctx.fillRect(unit.x - width / 2, y, width, height);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.32)";
  ctx.lineWidth = 1;
  ctx.strokeRect(unit.x - width / 2, y, width, height);
  ctx.fillStyle = color;
  ctx.fillRect(unit.x - width / 2, y, width * Math.max(0, unit.hp / unit.maxHp), height);
  if (!isPlayer && unit.pet) {
    ensurePetLifetime(unit);
    const duration = Math.max(0.1, unit.petDuration || PET_DURATION_SECONDS);
    const progress = Math.max(0, Math.min(1, (unit.petTimeRemaining ?? duration) / duration));
    const petBarHeight = 2;
    ctx.fillStyle = "#0b0a09";
    ctx.fillRect(unit.x - width / 2, y + height, width, petBarHeight);
    ctx.fillStyle = "#f0cf63";
    ctx.fillRect(unit.x - width / 2, y + height, width * progress, petBarHeight);
  }
}

function drawProjectile(projectile) {
  ctx.strokeStyle = projectile.trail;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(projectile.fromX, projectile.fromY);
  ctx.lineTo(projectile.x, projectile.y);
  ctx.stroke();

  const animation = projectileSpriteKey(projectile);
  const angle = projectileTravelAngle(projectile);
  const projectileArt = projectileSpriteForProjectile(projectile, animation);
  if (projectileArt?.sprite?.complete && (projectileArt.sprite.naturalWidth || projectileArt.sprite.width)) {
    const spriteScale = projectileSpriteScale(projectile, animation);
    const size = Math.max(projectile.radius * 7.25, 34) * spriteScale;
    const tint = projectileSpriteTint(projectile, animation);
    const glow = projectileSpriteGlow(projectile);
    const sprite = tint ? (tintedProjectileSpriteCanvas(projectileArt.sprite, tint) || projectileArt.sprite) : projectileArt.sprite;
    ctx.save();
    ctx.translate(projectile.x, projectile.y);
    ctx.rotate(angle - projectileArt.forwardAngle);
    ctx.imageSmoothingEnabled = false;
    if (glow) {
      ctx.shadowColor = glow;
      ctx.shadowBlur = Math.max(8, size * 0.42);
    }
    ctx.drawImage(sprite, -size / 2, -size / 2, size, size);
    ctx.restore();
    return;
  }

  if (animation === "arrow") {
    ctx.save();
    ctx.translate(projectile.x, projectile.y);
    ctx.rotate(angle);
    ctx.strokeStyle = "#d9cfb4";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(9, 0);
    ctx.stroke();
    ctx.fillStyle = "#d9cfb4";
    ctx.beginPath();
    ctx.moveTo(11, 0);
    ctx.lineTo(4, -4);
    ctx.lineTo(4, 4);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#8e6845";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(-15, -4);
    ctx.moveTo(-10, 0);
    ctx.lineTo(-15, 4);
    ctx.stroke();
    ctx.restore();
    return;
  }

  ctx.fillStyle = projectile.color;
  ctx.beginPath();
  ctx.arc(projectile.x, projectile.y, projectile.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#fff6dc";
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function projectileSpriteKey(projectile) {
  const raw = [
    projectile.projectileAnimation,
    projectile.spellName,
    projectile.label
  ].filter(Boolean).join(" ").toLowerCase().replace(/<[^>]*>/g, " ");
  if (raw.includes("fireball") || raw.includes("flaming projectile")) return "fireball";
  if (raw.includes("magic missile") || raw.includes("magic-missile")) return "magic missile";
  if (raw.includes("ice bolt") || raw.includes("ice-bolt")) return "ice bolt";
  return String(projectile.projectileAnimation || "").toLowerCase();
}

function projectileSourceWeapon(projectile) {
  return projectile?.sourceKind === "weapon" && projectile.sourceWeapon ? projectile.sourceWeapon : null;
}

function projectileSpriteForProjectile(projectile, key) {
  const weapon = projectileSourceWeapon(projectile);
  const path = weapon?.projectileSprite || projectile.projectileSprite;
  if (path) {
    const normalizedPath = String(path).replace(/^\.\//, "");
    const sprite = spriteFromPath(normalizedPath.startsWith("assets/") ? `./${normalizedPath}` : normalizedPath);
    return { sprite, forwardAngle: projectileSpriteForwardAngle(path, key) };
  }
  return projectileSpriteForKey(key);
}

function projectileSpriteForKey(key) {
  const projectileSprites = {
    fireball: { sprite: sprites.projectiles.fireball, forwardAngle: Math.PI * 0.75 },
    "magic missile": { sprite: sprites.projectiles.magicMissile, forwardAngle: Math.PI * 0.75 },
    "magic-missile": { sprite: sprites.projectiles.magicMissile, forwardAngle: Math.PI * 0.75 },
    "ice bolt": { sprite: sprites.projectiles.iceBolt, forwardAngle: -Math.PI * 0.25 },
    "ice-bolt": { sprite: sprites.projectiles.iceBolt, forwardAngle: -Math.PI * 0.25 }
  };
  return projectileSprites[key];
}

function projectileSpriteForwardAngle(path, key = "") {
  const name = `${path || ""} ${key || ""}`.toLowerCase();
  if (name.includes("fireball") || name.includes("magic-missile") || name.includes("magic missile")) return Math.PI * 0.75;
  if (name.includes("ice-bolt") || name.includes("ice bolt")) return -Math.PI * 0.25;
  return 0;
}

function projectileSpriteScale(projectile, animation) {
  const weapon = projectileSourceWeapon(projectile);
  const configured = Number(weapon?.projectileSize ?? projectile.projectileSize);
  const customScale = Number.isFinite(configured) && configured > 0 ? configured : 1;
  const baseScale = projectile.sourceKind === "weapon" && (animation === "magic missile" || animation === "magic-missile") ? 0.62 : 1;
  return baseScale * customScale;
}

function projectileSpriteTint(projectile, animation) {
  const weapon = projectileSourceWeapon(projectile);
  if (weapon?.projectileTint) return weapon.projectileTint;
  if (projectile.projectileTint) return projectile.projectileTint;
  if (!weapon) return "";
  if (animation !== "magic missile" && animation !== "magic-missile") return "";
  return realmInfo[normalizeRealm(projectile.realm)]?.color || "";
}

function projectileSpriteGlow(projectile) {
  const weapon = projectileSourceWeapon(projectile);
  if (weapon?.projectileGlow) return weapon.projectileGlowColor || weapon.projectileTint || realmInfo[normalizeRealm(projectile.realm)]?.color || "#8db8ff";
  if (projectile.projectileGlow) return projectile.projectileGlowColor || projectile.projectileTint || projectile.color || "#8db8ff";
  return "";
}

function projectileTravelAngle(projectile) {
  const vx = Number(projectile.vx);
  const vy = Number(projectile.vy);
  if (Number.isFinite(vx) && Number.isFinite(vy) && Math.hypot(vx, vy) > 0.001) return Math.atan2(vy, vx);
  if (projectile.target) {
    const tx = Number(projectile.target.x);
    const ty = Number(projectile.target.y);
    if (Number.isFinite(tx) && Number.isFinite(ty)) {
      const dx = tx - projectile.x;
      const dy = ty - projectile.y;
      if (Math.hypot(dx, dy) > 0.001) return Math.atan2(dy, dx);
    }
  }
  return Math.atan2(projectile.y - projectile.fromY, projectile.x - projectile.fromX);
}

function drawItemIconGraphic(graphic, size = 28) {
  const image = itemIconImageForGraphic(graphic);
  const width = image?.naturalWidth || image?.width || 0;
  const height = image?.naturalHeight || image?.height || 0;
  if (!width || !height || (image instanceof HTMLImageElement && !image.complete)) return false;
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(image, -size / 2, -size / 2, size, size);
  ctx.restore();
  return true;
}

function drawGroundItem(drop) {
  const remaining = drop.duration ? drop.duration - (drop.age || 0) : Infinity;
  const blinkWindow = drop.type === "heart" ? 2 : 5;
  if (remaining <= blinkWindow && Math.floor(remaining * 8) % 2 === 0) return;

  ctx.save();
  ctx.translate(drop.x, drop.y);
  if (drop.type === "heart") {
    ctx.fillStyle = "#d84e42";
    ctx.strokeStyle = "#ffd7d2";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 9);
    ctx.bezierCurveTo(-16, -2, -8, -16, 0, -7);
    ctx.bezierCurveTo(8, -16, 16, -2, 0, 9);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    return;
  }
  if (drop.type === "gold") {
    drawGoldDrop(drop.amount);
    ctx.restore();
    return;
  }
  if (drawItemIconGraphic(drop.item, itemGraphicSize(drop.item, 30))) {
    // Shared item sprite rendered.
  } else if (drop.item?.graphic === "brown pelt" || drop.item?.graphic === "grey pelt") {
    drawPeltGraphic(drop.item.graphic);
  } else if (drop.item?.graphic === "fang") {
    drawFangGraphic();
  } else if (drop.item?.graphic === "leaf") {
    drawLeafGraphic();
  } else if (drop.item?.graphic?.includes("gem")) {
    drawGemGraphic(drop.item.graphic);
  } else {
    ctx.fillStyle = "rgba(217, 185, 95, 0.18)";
    ctx.strokeStyle = "#d9b95f";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(-8, -8, 16, 16);
    ctx.fill();
    ctx.stroke();
  }
  ctx.fillStyle = itemRarity(drop.item).color;
  ctx.strokeStyle = "rgba(0, 0, 0, 0.86)";
  ctx.lineWidth = 3;
  ctx.font = "bold 11px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  ctx.strokeText(drop.item.name, 0, -14);
  ctx.fillText(drop.item.name, 0, -14);
  ctx.restore();
}

function drawPeltGraphic(graphic = "brown pelt") {
  ctx.fillStyle = graphic === "grey pelt" ? "#8d9299" : "#7a4a27";
  ctx.strokeStyle = graphic === "grey pelt" ? "#2e3338" : "#2b1b12";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-10, -5);
  ctx.bezierCurveTo(-5, -12, 8, -11, 11, -3);
  ctx.bezierCurveTo(7, 2, 9, 9, 0, 10);
  ctx.bezierCurveTo(-10, 8, -12, 2, -10, -5);
  ctx.fill();
  ctx.stroke();
}

function gemGraphicColor(graphic) {
  return {
    "green gem": "#68a85e",
    "light pink gem": "#f2a9d0",
    "red gem": "#d84e42",
    "blue gem": "#5f94d9",
    "purple gem": "#9c6be8",
    "cyan gem": "#6bd7d4",
    "white gem": "#f6f6ee"
  }[graphic] || "#f2ede3";
}

function drawGemGraphic(graphic) {
  const color = gemGraphicColor(graphic);
  ctx.fillStyle = color;
  ctx.strokeStyle = "rgba(0, 0, 0, 0.78)";
  ctx.lineWidth = 2;
  ctx.shadowColor = color;
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.moveTo(0, -13);
  ctx.lineTo(12, -4);
  ctx.lineTo(8, 13);
  ctx.lineTo(-8, 13);
  ctx.lineTo(-12, -4);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.stroke();
}

function drawFangGraphic() {
  ctx.fillStyle = "#e8dcc4";
  ctx.strokeStyle = "#4c3422";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-7, -12);
  ctx.quadraticCurveTo(8, -12, 6, -2);
  ctx.quadraticCurveTo(4, 7, 0, 14);
  ctx.quadraticCurveTo(-5, 6, -7, -12);
  ctx.fill();
  ctx.stroke();
}

function drawLeafGraphic() {
  ctx.save();
  ctx.rotate(-0.5);
  ctx.fillStyle = "#68a85e";
  ctx.strokeStyle = "#1e4f24";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(0, 0, 9, 16, 0.35, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "rgba(236, 255, 208, 0.65)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-1, -12);
  ctx.lineTo(2, 12);
  ctx.stroke();
  ctx.restore();
}

function drawGoldDrop(amount) {
  const coins = [];
  let remaining = amount;
  while (remaining >= 125) {
    coins.push({ color: "#dfe7f1", stroke: "#7f8ca0", graphic: "platinum coin" });
    remaining -= 125;
  }
  while (remaining >= 25) {
    coins.push({ color: "#f0cf63", stroke: "#7f6321", graphic: "gold coin" });
    remaining -= 25;
  }
  while (remaining >= 5) {
    coins.push({ color: "#c8c9c2", stroke: "#686c66", graphic: "silver coin" });
    remaining -= 5;
  }
  while (remaining >= 1) {
    coins.push({ color: "#bd7140", stroke: "#65361f", graphic: "copper coin" });
    remaining -= 1;
  }

  const radius = 4;
  const spacing = 9;
  const columns = Math.min(5, Math.max(1, coins.length));
  coins.forEach((coin, index) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    const rowCount = Math.min(columns, coins.length - row * columns);
    const x = (col - (rowCount - 1) / 2) * spacing;
    const y = (row - Math.floor((coins.length - 1) / columns) / 2) * spacing;
    ctx.save();
    ctx.translate(x, y);
    if (drawItemIconGraphic(coin.graphic, 10)) {
      ctx.restore();
      return;
    }
    ctx.restore();
    ctx.fillStyle = coin.color;
    ctx.strokeStyle = coin.stroke;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });
}

function drawWeaponEffectSprite(effect, progress, reach) {
  const weapon = effect.weapon;
  if (!weapon || !itemIconSrc(weapon)) return false;
  const size = Math.max(34, Math.min(64, Math.max(itemGraphicSize(weapon, 30) * 1.45, reach * 0.32)));
  const travel = Math.max(18, reach * (effect.type === "slash" ? 0.72 : 0.78));
  ctx.save();
  if (effect.type === "slash") {
    ctx.rotate(-0.58 + progress * 1.16);
    ctx.translate(travel, 0);
    ctx.rotate(Math.PI / 4);
  } else if (effect.type === "stab") {
    ctx.translate(10 + travel * Math.min(1, progress * 1.6), 0);
    ctx.rotate(Math.PI / 4);
  } else {
    ctx.translate(10 + travel * 0.68, -10 + progress * 18);
    ctx.rotate(-0.85 + progress * 1.35);
  }
  const drawn = drawItemIconGraphic(weapon, size);
  ctx.restore();
  return drawn;
}

function drawEffect(effect) {
  if (effect.type === "burningSkinHit") {
    const target = effect.target
      || (effect.targetId ? game.enemies.find(enemy => enemy.id === effect.targetId) : null)
      || game.player;
    const progress = Math.min(1, effect.age / Math.max(0.1, effect.duration || 0.85));
    drawBurningSkinHitFlames(
      { ...target, x: target?.x ?? effect.x, y: target?.y ?? effect.y },
      Math.max(0, 0.85 - progress * 0.65),
      Math.max(0, 0.34 - progress * 0.24)
    );
    return;
  }

  if (effect.type === "slash") {
    const progress = effect.age / effect.duration;
    const alpha = Math.max(0, 1 - progress);
    const source = effect.source || game.player;
    const target = effect.target || source;
    const radius = Math.max(28, effect.range || RANGE_UNIT);
    const angle = Number.isFinite(effect.angle) ? effect.angle : Math.atan2(target.y - source.y, target.x - source.x);
    ctx.save();
    ctx.translate(source.x, source.y);
    ctx.rotate(angle);
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = realmInfo[effect.realm]?.color || "#f2ede3";
    const hasWeaponSprite = Boolean(effect.weapon && itemIconSrc(effect.weapon));
    if (hasWeaponSprite) ctx.globalAlpha = alpha * 0.42;
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(0, 0, radius, -0.55 + progress * 0.75, 0.55 + progress * 0.75);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, radius + 4, -0.42 + progress * 0.75, 0.42 + progress * 0.75);
    ctx.stroke();
    ctx.globalAlpha = alpha;
    drawWeaponEffectSprite(effect, progress, radius);
    ctx.restore();
    return;
  }

  if (effect.type === "stab" || effect.type === "claw" || effect.type === "whack") {
    const progress = effect.age / effect.duration;
    const alpha = Math.max(0, 1 - progress);
    const source = effect.source || game.player;
    const target = effect.target || source;
    const angle = Math.atan2(target.y - source.y, target.x - source.x);
    const reach = Math.min(distance(source, target), RANGE_UNIT * 3);
    ctx.save();
    ctx.translate(source.x, source.y);
    ctx.rotate(angle);
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = realmInfo[effect.realm]?.color || "#f2ede3";
    const hasWeaponSprite = Boolean(effect.weapon && itemIconSrc(effect.weapon));
    if (hasWeaponSprite) ctx.globalAlpha = alpha * 0.42;
    ctx.lineCap = "round";
    if (effect.type === "stab") {
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(8, 0);
      ctx.lineTo(reach, 0);
      ctx.stroke();
    } else if (effect.type === "claw") {
      ctx.lineWidth = 4;
      for (const offset of [-7, 0, 7]) {
        ctx.beginPath();
        ctx.arc(reach * 0.6, offset, 18, -0.7, 0.7);
        ctx.stroke();
      }
    } else {
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(8, -8);
      ctx.lineTo(reach * 0.82, 4);
      ctx.stroke();
      ctx.globalAlpha = alpha * 0.55;
      ctx.beginPath();
      ctx.arc(reach, 0, 14 + progress * 10, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = alpha;
    drawWeaponEffectSprite(effect, progress, reach);
    ctx.restore();
    return;
  }

  if (effect.type === "briarLash") {
    const progress = Math.min(1, effect.age / Math.max(0.1, effect.duration || 0.38));
    const alpha = Math.sin(progress * Math.PI);
    const sourceX = effect.source?.x ?? effect.sourceX ?? game.player.x;
    const sourceY = effect.source?.y ?? effect.sourceY ?? game.player.y;
    const targetX = effect.target?.x ?? effect.targetX ?? effect.x ?? game.player.x;
    const targetY = effect.target?.y ?? effect.targetY ?? effect.y ?? game.player.y;
    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    const length = Math.max(1, Math.hypot(dx, dy));
    const nx = -dy / length;
    const ny = dx / length;
    const lashReach = Math.min(1, progress * 1.35);
    const endX = sourceX + dx * lashReach;
    const endY = sourceY + dy * lashReach;
    const arc = Math.min(54, Math.max(22, length * 0.22));
    const controlX = (sourceX + endX) / 2 + nx * arc * Math.sin(progress * Math.PI);
    const controlY = (sourceY + endY) / 2 + ny * arc * Math.sin(progress * Math.PI);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowColor = "#8cff4a";
    ctx.shadowBlur = 14;
    for (const pass of [
      { width: 13, color: "rgba(33, 82, 31, 0.86)" },
      { width: 7, color: "#58b33f" },
      { width: 3, color: "#c9ff7a" }
    ]) {
      ctx.strokeStyle = pass.color;
      ctx.lineWidth = pass.width;
      ctx.beginPath();
      ctx.moveTo(sourceX, sourceY);
      ctx.quadraticCurveTo(controlX, controlY, endX, endY);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#f2e8a8";
    for (let i = 1; i <= 7; i += 1) {
      const t = i / 8 * lashReach;
      const bx = (1 - t) * (1 - t) * sourceX + 2 * (1 - t) * t * controlX + t * t * endX;
      const by = (1 - t) * (1 - t) * sourceY + 2 * (1 - t) * t * controlY + t * t * endY;
      const side = i % 2 ? 1 : -1;
      const size = 6 + (i % 3);
      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(Math.atan2(dy, dx) + side * 0.95);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-size, -size * 0.45);
      ctx.lineTo(-size * 0.42, size * 0.7);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = "#baff6a";
    for (let i = 0; i < 9; i += 1) {
      const angle = i * ((Math.PI * 2) / 9) + progress * 2.2;
      const r = 10 + (i % 3) * 5 + progress * 18;
      ctx.globalAlpha = alpha * (1 - progress * 0.35);
      ctx.beginPath();
      ctx.arc(targetX + Math.cos(angle) * r, targetY + Math.sin(angle) * r, 2.2 + (i % 2), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    return;
  }

  if (effect.type === "ring") {
    const owner = effect.ownerEnemyId
      ? game.enemies.find(enemy => enemy.id === effect.ownerEnemyId)
      : multiplayerActorById(effect.ownerId) || game.player;
    if (!owner) return;
    const sprite = sprites.spellEffects.ringOfFire;
    const pulse = Math.sin(effect.age * 10) * 4;
    const radius = (effect.radius || 96) + pulse;
    const size = radius * 2.35;
    ctx.save();
    ctx.translate(owner.x, owner.y);
    ctx.rotate(effect.age * 3.8);
    ctx.globalAlpha = Math.max(0.6, 1 - effect.age / Math.max(0.1, effect.duration || 3) * 0.2);
    if (sprite?.complete && sprite.naturalWidth) {
      setSpriteSmoothing(false);
      ctx.drawImage(sprite, -size / 2, -size / 2, size, size);
    } else {
      ctx.strokeStyle = realmInfo.Infernal.color;
      ctx.lineWidth = 30;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
    return;
  }

  if (effect.type === "fireblast") {
    const progress = effect.age / effect.duration;
    const flicker = Math.sin(performance.now() / 70) * 0.18;
    ctx.save();
    ctx.globalAlpha = Math.max(0.25, 0.78 - progress * 0.28);
    ctx.fillStyle = `rgba(216, 78, 66, ${0.22 + flicker * 0.08})`;
    ctx.strokeStyle = realmInfo.Infernal.color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(effect.x, effect.y, effect.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    for (let i = 0; i < 14; i += 1) {
      const angle = i * ((Math.PI * 2) / 14) + performance.now() / 240;
      const r = effect.radius * randomBetween(0.18, 0.92);
      const x = effect.x + Math.cos(angle) * r;
      const y = effect.y + Math.sin(angle) * r;
      ctx.fillStyle = i % 2 ? "#f0cf63" : "#d84e42";
      ctx.beginPath();
      ctx.moveTo(x, y - 10);
      ctx.lineTo(x + 5, y + 6);
      ctx.lineTo(x - 5, y + 6);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
    return;
  }

  if (effect.type === "iceStorm") {
    const progress = effect.age / effect.duration;
    ctx.save();
    ctx.globalAlpha = Math.max(0.22, 0.72 - progress * 0.25);
    ctx.fillStyle = "rgba(95, 148, 217, 0.15)";
    ctx.strokeStyle = "#bde7ff";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(effect.x, effect.y, effect.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    for (let i = 0; i < 18; i += 1) {
      const angle = i * ((Math.PI * 2) / 18) + performance.now() / 360;
      const r = effect.radius * (0.18 + ((i * 23) % 78) / 100);
      const x = effect.x + Math.cos(angle) * r;
      const y = effect.y + Math.sin(angle * 1.13) * r + ((performance.now() / 24 + i * 13) % 30) - 15;
      ctx.strokeStyle = i % 2 ? "#e8fbff" : "#8db8ff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(x, y - 9);
      ctx.lineTo(x - 4, y + 5);
      ctx.stroke();
    }
    ctx.restore();
    return;
  }

  if (effect.type === "faerieFire") {
    const progress = effect.age / effect.duration;
    ctx.save();
    ctx.globalAlpha = Math.max(0, 1 - progress * 0.65);
    ctx.fillStyle = "rgba(101, 214, 111, 0.12)";
    ctx.strokeStyle = realmInfo.Sylvan.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(effect.x, effect.y, effect.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    for (let i = 0; i < 18; i += 1) {
      const angle = i * ((Math.PI * 2) / 18) + performance.now() / 220;
      const r = effect.radius * (0.2 + ((i * 17) % 70) / 100);
      const x = effect.x + Math.cos(angle) * r;
      const y = effect.y + Math.sin(angle * 1.07) * r;
      ctx.fillStyle = i % 2 ? "#b7ff7f" : realmInfo.Sylvan.color;
      ctx.beginPath();
      ctx.arc(x, y, 3 + (i % 3), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    return;
  }

  if (effect.type === "portalMarker") {
    const pulse = 1 + Math.sin(performance.now() / 220) * 0.08;
    ctx.save();
    ctx.globalAlpha = 0.7 + Math.sin(performance.now() / 180) * 0.15;
    ctx.strokeStyle = "#8db8ff";
    ctx.fillStyle = "rgba(93, 184, 255, 0.14)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(effect.x, effect.y, (effect.radius || 24) * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.setLineDash([4, 5]);
    ctx.beginPath();
    ctx.arc(effect.x, effect.y, (effect.radius || 24) * 0.58, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    for (let i = 0; i < 7; i += 1) {
      const angle = i * ((Math.PI * 2) / 7) + performance.now() / 520;
      const r = (effect.radius || 24) * (0.5 + (i % 3) * 0.16);
      const x = effect.x + Math.cos(angle) * r;
      const y = effect.y + Math.sin(angle) * r;
      ctx.fillStyle = i % 2 ? "#ffffff" : "#6fd7ff";
      ctx.beginPath();
      ctx.arc(x, y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    return;
  }

  if (effect.type === "portal") {
    const size = 92 + Math.sin(performance.now() / 250) * 4;
    ctx.save();
    ctx.globalAlpha = 0.96;
    if (!drawSprite(sprites.props.portal, effect.x, effect.y - 20, size)) {
      ctx.strokeStyle = "#36d7ff";
      ctx.fillStyle = "rgba(32, 93, 190, 0.32)";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.ellipse(effect.x, effect.y - 18, 24, 38, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
    return;
  }

  if (effect.type === "sacredGrove") {
    const progress = effect.age / Math.max(0.1, effect.duration || 1);
    const radius = effect.radius || RANGE_UNIT * 6;
    const treeSprite = sprites.props.enchantedTree;
    const pulse = Math.sin(performance.now() / 220) * 5;
    ctx.save();
    ctx.globalAlpha = Math.max(0.22, 0.5 - progress * 0.12);
    ctx.shadowColor = "#65d66f";
    ctx.shadowBlur = 24;
    ctx.fillStyle = "rgba(50, 155, 68, 0.13)";
    ctx.strokeStyle = "rgba(163, 255, 137, 0.72)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(effect.x, effect.y, radius + pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    const count = Math.max(14, Math.round(radius / 16));
    const treeSize = 54;
    const tintedTreeSprite = tintedSpriteOverlayCanvas(treeSprite, "rgba(90, 220, 92, 0.42)");
    for (let i = 0; i < count; i += 1) {
      const angle = i * ((Math.PI * 2) / count) + Math.sin(performance.now() / 900) * 0.025;
      const x = effect.x + Math.cos(angle) * radius;
      const y = effect.y + Math.sin(angle) * radius;
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = 0.5;
      ctx.shadowColor = "#65d66f";
      ctx.shadowBlur = 14;
      if (tintedTreeSprite) {
        setSpriteSmoothing(false);
        ctx.drawImage(tintedTreeSprite, -treeSize / 2, -treeSize * 0.72, treeSize, treeSize);
      } else {
        ctx.fillStyle = "rgba(81, 176, 65, 0.8)";
        ctx.beginPath();
        ctx.moveTo(0, -treeSize * 0.72);
        ctx.lineTo(treeSize * 0.36, treeSize * 0.12);
        ctx.lineTo(-treeSize * 0.36, treeSize * 0.12);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }
    return;
  }

  if (effect.type === "faerieCircle") {
    const progress = effect.age / Math.max(0.1, effect.duration || 12);
    const pulse = Math.sin(performance.now() / 180) * 4;
    ctx.save();
    ctx.globalAlpha = Math.max(0.34, 0.86 - progress * 0.28);
    ctx.fillStyle = "rgba(255, 112, 218, 0.13)";
    ctx.beginPath();
    ctx.arc(effect.x, effect.y, effect.radius + pulse, 0, Math.PI * 2);
    ctx.fill();
    for (let i = 0; i < 28; i += 1) {
      const seed = i * 31;
      const angle = i * ((Math.PI * 2) / 28) + performance.now() / 430;
      const r = effect.radius * (0.12 + ((seed % 82) / 100));
      const x = effect.x + Math.cos(angle) * r;
      const y = effect.y + Math.sin(angle * 1.17) * r;
      const size = 2 + (i % 4);
      ctx.fillStyle = i % 3 ? "#ffd6f7" : "#ff74dd";
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x + size, y);
      ctx.lineTo(x, y + size);
      ctx.lineTo(x - size, y);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
    return;
  }

  if (effect.type === "darkCircle") {
    const progress = effect.age / Math.max(0.1, effect.duration || 12);
    const radius = effect.radius;
    const rotation = -Math.PI / 2 + Math.sin(performance.now() / 520) * 0.05;
    ctx.save();
    ctx.globalAlpha = Math.max(0.38, 0.9 - progress * 0.24);
    ctx.translate(effect.x, effect.y);
    ctx.shadowColor = "#ff1f24";
    ctx.shadowBlur = 18;
    ctx.fillStyle = "rgba(145, 0, 0, 0.16)";
    ctx.strokeStyle = "#ff3333";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    const points = [];
    for (let i = 0; i < 5; i += 1) {
      const angle = rotation + i * ((Math.PI * 2) / 5);
      points.push({ x: Math.cos(angle) * radius * 0.82, y: Math.sin(angle) * radius * 0.82 });
    }
    ctx.strokeStyle = "#ff4a2c";
    ctx.lineWidth = 4;
    ctx.beginPath();
    [0, 2, 4, 1, 3, 0].forEach((index, order) => {
      const point = points[index];
      if (order === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
    ctx.shadowBlur = 0;
    for (const point of points) {
      ctx.fillStyle = "#ffb13d";
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    return;
  }

  if (effect.type === "graceFromAbove") {
    const progress = effect.age / Math.max(0.1, effect.duration || 8);
    const pulse = Math.sin(performance.now() / 190) * 5;
    ctx.save();
    ctx.globalAlpha = Math.max(0.28, 0.78 - progress * 0.2);
    const gradient = ctx.createRadialGradient(effect.x, effect.y, 0, effect.x, effect.y, effect.radius + pulse);
    gradient.addColorStop(0, "rgba(255, 255, 224, 0.28)");
    gradient.addColorStop(0.48, "rgba(255, 220, 80, 0.18)");
    gradient.addColorStop(1, "rgba(255, 220, 80, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(effect.x, effect.y, effect.radius + pulse, 0, Math.PI * 2);
    ctx.fill();
    for (const target of friendlyCircleTargets()) {
      if (distance(effect, target) > effect.radius + (target.radius || 18)) continue;
      const radius = (target.radius || 18) + 17 + Math.sin(performance.now() / 160) * 2;
      ctx.save();
      ctx.globalAlpha = 0.78;
      ctx.shadowColor = "#fff9d8";
      ctx.shadowBlur = 20;
      ctx.fillStyle = "rgba(255, 255, 210, 0.22)";
      ctx.beginPath();
      ctx.arc(target.x, target.y, radius, 0, Math.PI * 2);
      ctx.fill();
      for (let i = 0; i < 7; i += 1) {
        const angle = i * ((Math.PI * 2) / 7) + performance.now() / 330;
        const r = radius * (0.55 + (i % 3) * 0.12);
        const x = target.x + Math.cos(angle) * r;
        const y = target.y + Math.sin(angle * 1.12) * r;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(x, y - 4);
        ctx.lineTo(x + 4, y);
        ctx.lineTo(x, y + 4);
        ctx.lineTo(x - 4, y);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }
    ctx.restore();
    return;
  }

  if (effect.type === "lifesteal") {
    const progress = effect.age / effect.duration;
    const sourceX = effect.source?.x ?? effect.sourceX ?? game.player.x;
    const sourceY = effect.source?.y ?? effect.sourceY ?? game.player.y;
    const targetX = effect.target?.x ?? effect.targetX ?? game.player.x;
    const targetY = effect.target?.y ?? effect.targetY ?? game.player.y;
    const boltColor = realmInfo[effect.realm]?.color || "#ff2636";
    ctx.save();
    ctx.globalAlpha = Math.max(0, 1 - progress);
    ctx.strokeStyle = boltColor;
    ctx.shadowColor = boltColor;
    ctx.shadowBlur = 14;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(sourceX, sourceY);
    const midX = (sourceX + targetX) / 2 + Math.sin(progress * Math.PI * 8) * 18;
    const midY = (sourceY + targetY) / 2 + Math.cos(progress * Math.PI * 7) * 18;
    ctx.lineTo(midX, midY);
    ctx.lineTo(targetX, targetY);
    ctx.stroke();
    ctx.restore();
    return;
  }

  if (effect.type === "chlorophyllSparkle") {
    const progress = Math.min(1, effect.age / Math.max(0.1, effect.duration || 0.85));
    const pulse = Math.sin(progress * Math.PI);
    const radius = (effect.radius || 18) + 12 + progress * 18;
    ctx.save();
    ctx.globalAlpha = 0.88 * pulse;
    ctx.shadowColor = "#7dff67";
    ctx.shadowBlur = 18;
    for (let i = 0; i < 12; i += 1) {
      const angle = i * ((Math.PI * 2) / 12) + progress * Math.PI * 1.2;
      const distance = radius * (0.34 + (i % 4) * 0.15);
      const x = effect.x + Math.cos(angle) * distance;
      const y = effect.y + Math.sin(angle * 1.1) * distance - progress * 10;
      const size = 2.2 + (i % 3);
      ctx.fillStyle = i % 2 ? "#d9ff9c" : "#65d66f";
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x + size, y);
      ctx.lineTo(x, y + size);
      ctx.lineTo(x - size, y);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
    return;
  }

  if (effect.type === "chainLightning") {
    const progress = Math.min(1, effect.age / effect.duration);
    const boltColor = realmInfo[effect.realm]?.color || realmInfo.Celestial.color;
    const links = effect.links || [{
      sourceX: effect.sourceX ?? game.player.x,
      sourceY: effect.sourceY ?? game.player.y,
      targetX: effect.targetX ?? game.player.x,
      targetY: effect.targetY ?? game.player.y
    }];
    ctx.save();
    ctx.globalAlpha = Math.max(0, 1 - progress);
    ctx.lineCap = "round";
    for (const link of links) {
      const dx = link.targetX - link.sourceX;
      const dy = link.targetY - link.sourceY;
      const length = Math.max(1, Math.hypot(dx, dy));
      const nx = -dy / length;
      const ny = dx / length;
      for (let pass = 0; pass < 2; pass += 1) {
        ctx.strokeStyle = pass === 0 ? boltColor : "#fff6b8";
        ctx.lineWidth = pass === 0 ? 8 : 3;
        ctx.beginPath();
        ctx.moveTo(link.sourceX, link.sourceY);
        ctx.lineTo(link.sourceX + dx * 0.33 + nx * 8, link.sourceY + dy * 0.33 + ny * 8);
        ctx.lineTo(link.sourceX + dx * 0.66 - nx * 8, link.sourceY + dy * 0.66 - ny * 8);
        ctx.lineTo(link.targetX, link.targetY);
        ctx.stroke();
      }
    }
    ctx.restore();
    return;
  }

  if (effect.type === "prayer") {
    const progress = effect.age / effect.duration;
    const target = effect.targetPlayerId ? game.multiplayer.peers.get(effect.targetPlayerId) : effect.target;
    const x = target?.x ?? effect.x ?? game.player.x;
    const y = target?.y ?? effect.y ?? game.player.y;
    const pulse = Math.sin(progress * Math.PI);
    const palette = effect.palette || {};
    const stroke = palette.stroke || "#fff1a8";
    const fill = palette.fill || "rgba(255, 235, 92, 0.32)";
    const moteA = palette.moteA || "#fff8b8";
    const moteB = palette.moteB || "#f0cf63";
    ctx.save();
    ctx.globalAlpha = 0.62 * pulse;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, 20 + progress * 26, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 0.52 * pulse;
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(x, y, 22 + progress * 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.95 * pulse;
    for (let i = 0; i < 14; i += 1) {
      const angle = i * ((Math.PI * 2) / 14) + progress * Math.PI * 1.4;
      const distance = 7 + progress * (26 + (i % 3) * 9);
      const moteX = x + Math.cos(angle) * distance;
      const moteY = y + Math.sin(angle) * distance - progress * 14;
      const size = i % 3 === 0 ? 4 : 2.8;
      ctx.fillStyle = i % 2 ? moteA : moteB;
      ctx.beginPath();
      ctx.moveTo(moteX, moteY - size);
      ctx.lineTo(moteX + size, moteY);
      ctx.lineTo(moteX, moteY + size);
      ctx.lineTo(moteX - size, moteY);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
    return;
  }

  if (effect.type === "raiseSkeleton") {
    const progress = Math.min(1, effect.age / effect.duration);
    const pulse = Math.sin(progress * Math.PI);
    const sylvan = effect.color === "Sylvan";
    ctx.save();
    ctx.globalAlpha = 0.75 * (1 - progress);
    for (let i = 0; i < 8; i += 1) {
      const angle = i * ((Math.PI * 2) / 8) + progress * 1.6;
      const dist = 8 + progress * 34;
      ctx.fillStyle = sylvan
        ? (i % 2 ? "rgba(137, 224, 98, 0.76)" : "rgba(44, 112, 48, 0.78)")
        : (i % 2 ? "rgba(185, 105, 230, 0.75)" : "rgba(92, 42, 128, 0.78)");
      ctx.beginPath();
      ctx.arc(effect.x + Math.cos(angle) * dist, effect.y + Math.sin(angle) * dist - progress * 12, 7 + pulse * 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 0.8 * pulse;
    ctx.fillStyle = sylvan ? "#d8ffc4" : "#d9c7ff";
    ctx.beginPath();
    ctx.arc(effect.x, effect.y - 8, 5 + progress * 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  if (effect.type === "clarity") {
    const progress = effect.age / effect.duration;
    const target = effect.targetPlayerId ? game.multiplayer.peers.get(effect.targetPlayerId) : effect.target;
    const x = target?.x ?? effect.x ?? game.player.x;
    const y = target?.y ?? effect.y ?? game.player.y;
    const pulse = Math.sin(progress * Math.PI);
    ctx.save();
    ctx.globalAlpha = 0.75 * pulse;
    ctx.strokeStyle = "#43e2ff";
    ctx.fillStyle = "rgba(67, 226, 255, 0.18)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, 16 + progress * 32, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    for (let i = 0; i < 6; i += 1) {
      const angle = i * ((Math.PI * 2) / 6) - progress * Math.PI;
      const distance = 8 + progress * 24;
      const moteX = x + Math.cos(angle) * distance;
      const moteY = y + Math.sin(angle) * distance - progress * 10;
      const size = 1.8;
      ctx.fillStyle = i % 2 ? "#ffffff" : "#bdf8ff";
      ctx.beginPath();
      ctx.moveTo(moteX, moteY - size);
      ctx.lineTo(moteX + size, moteY);
      ctx.lineTo(moteX, moteY + size);
      ctx.lineTo(moteX - size, moteY);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
    return;
  }
}

function drawTargetingPreview() {
  if (game.pendingSpellTarget === null) return;
  const spell = game.player.spells[game.pendingSpellTarget];
  if (!spell) return;
  const mode = spellTargetMode(spell);
  const rangeRadius = spell.range ? spell.range * RANGE_UNIT : 0;
  if (rangeRadius > 0) {
    ctx.save();
    ctx.globalAlpha = 0.75;
    ctx.strokeStyle = realmUiColor(spell.realm);
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 7]);
    ctx.beginPath();
    ctx.arc(game.player.x, game.player.y, rangeRadius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
  if (!game.mouseWorld) return;
  const target = mode === "friendly-player"
    ? playerAtWorldPointWithPadding(game.mouseWorld.x, game.mouseWorld.y, SPELL_TARGET_LOCK_PADDING)
    : mode === "friendly-unit"
      ? enemyAtWorldPointWithPadding(game.mouseWorld.x, game.mouseWorld.y, SPELL_TARGET_LOCK_PADDING) || playerAtWorldPointWithPadding(game.mouseWorld.x, game.mouseWorld.y, SPELL_TARGET_LOCK_PADDING)
    : mode === "unit"
      ? enemyAtWorldPointWithPadding(game.mouseWorld.x, game.mouseWorld.y, SPELL_TARGET_LOCK_PADDING) || playerAtWorldPointWithPadding(game.mouseWorld.x, game.mouseWorld.y, SPELL_TARGET_LOCK_PADDING)
      : mode === "enemy"
        ? enemyAtWorldPointWithPadding(game.mouseWorld.x, game.mouseWorld.y, SPELL_TARGET_LOCK_PADDING)
        : null;
  const maxRange = spell.range ? spell.range * RANGE_UNIT + (target?.radius || 0) + game.player.radius : Infinity;
  const hasSight = mode === "point"
    ? hasLineOfSight(game.player, game.mouseWorld)
    : target && hasLineOfSight(game.player, target);
  const inRange = mode === "point"
    ? distance(game.player, game.mouseWorld) <= (spell.range || 0) * RANGE_UNIT && hasSight
    : target && distance(game.player, target) <= maxRange && hasSight && (
      mode !== "friendly-player"
      && mode !== "friendly-unit"
      && !(mode === "unit" && (target === game.player || !game.enemies.includes(target)))
      || canCastFriendlySpellOn(spell, target)
    );
  const radius = mode === "point" ? (spell.aoeRadius || 1) * RANGE_UNIT : Math.max(18, target?.radius || 18);
  const x = target?.x ?? game.mouseWorld.x;
  const y = target?.y ?? game.mouseWorld.y;
  ctx.save();
  ctx.strokeStyle = inRange ? "#61d66f" : "#d84e42";
  ctx.lineWidth = 3;
  ctx.setLineDash([7, 7]);
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawPortalHoverText() {
  if (!game.mouseWorld) return;
  const portal = game.effects.find(effect =>
    effect.type === "portal"
    && distance(game.mouseWorld, effect) <= (effect.radius || 30) + 12
  );
  if (!portal) return;
  const destination = otherPortal(portal);
  if (!destination) return;
  const text = `Portal to ${destination.areaName || areaAt(destination.x, destination.y)?.name || "The Black Wilds"}`;
  ctx.save();
  ctx.font = "bold 13px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  if (portal._labelMetrics?.text !== text) {
    portal._labelMetrics = { text, width: ctx.measureText(text).width + 22 };
  }
  const width = portal._labelMetrics.width;
  const x = portal.x;
  const y = portal.y - 80;
  ctx.fillStyle = "rgba(8, 14, 28, 0.88)";
  ctx.strokeStyle = "#6fd7ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(x - width / 2, y - 14, width, 28, 6);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#dff8ff";
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawPlayerSpeech() {
  if (!game.playerSpeech) return;
  drawSpeechBubble(game.player, game.playerSpeech);
}

function drawNpcSpeech() {
  for (const speech of game.npcSpeech) drawSpeechBubble(speech.speaker, speech);
}

function speechBubbleLayout(speech, text, maxWidth) {
  const key = `${text}|${maxWidth}`;
  if (speech._layout?.key === key) return speech._layout;
  const words = text.split(/\s+/);
  const lines = [];
  const lineWidths = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (ctx.measureText(next).width > maxWidth - 24 && line) {
      lines.push(line);
      lineWidths.push(ctx.measureText(line).width);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) {
    lines.push(line);
    lineWidths.push(ctx.measureText(line).width);
  }
  if (lines.length > 5) {
    lines.length = 5;
    lineWidths.length = 5;
    lines[4] = `${lines[4].replace(/[.?!,;:]*$/, "")}...`;
    lineWidths[4] = ctx.measureText(lines[4]).width;
  }
  speech._layout = {
    key,
    lines,
    width: Math.min(maxWidth, Math.max(...lineWidths, 40) + 24),
    height: 18 + lines.length * 17
  };
  return speech._layout;
}

function drawSpeechBubble(unit, speech) {
  if (!unit || !speech) return;
  const text = speech.text;
  const progress = speech.age / speech.duration;
  const alpha = Math.min(1, Math.max(0, progress < 0.85 ? 1 : (1 - progress) / 0.15));
  const maxWidth = 300;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = "bold 13px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const { lines, width, height } = speechBubbleLayout(speech, text, maxWidth);
  const x = unit.x;
  const y = unit.y - (unit.radius || 18) - 48 - Math.max(0, lines.length - 1) * 8;
  ctx.fillStyle = "rgba(17, 16, 14, 0.9)";
  ctx.strokeStyle = "#756343";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(x - width / 2, y - height / 2, width, height, 6);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#f2ede3";
  lines.forEach((candidate, index) => {
    ctx.fillText(candidate, x, y - (lines.length - 1) * 8.5 + index * 17);
  });
  ctx.restore();
}

function drawPointTargetArrow() {
  if (!game.pointTargetArea) return;
  const area = findAreaByName(game.pointTargetArea);
  if (!area) return;
  const angle = Math.atan2(area.center.y - game.player.y, area.center.x - game.player.x);
  ctx.save();
  ctx.translate(
    game.player.x + Math.cos(angle) * (game.player.radius + 34),
    game.player.y + Math.sin(angle) * (game.player.radius + 34)
  );
  ctx.rotate(angle);
  ctx.fillStyle = "#f0cf63";
  ctx.strokeStyle = "#4f3c12";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(22, 0);
  ctx.lineTo(-12, -12);
  ctx.lineTo(-6, 0);
  ctx.lineTo(-12, 12);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawCriticalSunburst(x, y, progress = 0) {
  const points = 18;
  const inner = 17 + Math.sin(progress * Math.PI) * 2;
  const outer = 31 + Math.sin(progress * Math.PI) * 3;
  ctx.save();
  ctx.translate(x, y - 6);
  ctx.rotate(progress * 0.45);
  const gradient = ctx.createRadialGradient(0, 0, 3, 0, 0, outer);
  gradient.addColorStop(0, "rgba(255, 222, 91, 0.98)");
  gradient.addColorStop(0.42, "rgba(230, 34, 28, 0.95)");
  gradient.addColorStop(1, "rgba(114, 0, 0, 0.1)");
  ctx.fillStyle = gradient;
  ctx.strokeStyle = "rgba(20, 0, 0, 0.75)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (let i = 0; i < points * 2; i += 1) {
    const angle = (i / (points * 2)) * Math.PI * 2;
    const radius = i % 2 === 0 ? outer : inner;
    const px = Math.cos(angle) * radius;
    const py = Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawFloatingText(floater) {
  const progress = floater.age / floater.duration;
  const fadeProgress = Math.max(0, (progress - 0.18) / 0.82);
  ctx.save();
  ctx.globalAlpha = Math.max(0, 1 - fadeProgress);
  if (floater.style === "critical") drawCriticalSunburst(floater.x, floater.y, progress);
  ctx.fillStyle = floater.color;
  ctx.strokeStyle = floater.strokeColor;
  ctx.lineWidth = floater.style === "critical" ? 4 : 3;
  ctx.font = floater.style === "critical" ? "900 18px system-ui" : "bold 16px system-ui";
  ctx.textAlign = "center";
  ctx.strokeText(floater.text, floater.x, floater.y);
  ctx.fillText(floater.text, floater.x, floater.y);
  ctx.restore();
}

function updateHtmlIfChanged(element, html) {
  if (element.innerHTML !== html) element.innerHTML = html;
}

function updateTextIfChanged(element, text) {
  const value = String(text);
  if (element && element.textContent !== value) element.textContent = value;
}

function updateWidthIfChanged(element, width) {
  const value = String(width);
  if (element && element.style.width !== value) element.style.width = value;
}

function statusEffectRealm(effect) {
  const template = spellTemplateByName(effect.name);
  return normalizeRealm(effect.realm || template?.realm || "Mortal");
}

function statusEffectIsDebuff(effect) {
  if (effect.kind === "dot") return true;
  if (effect.freeze) return true;
  if (effect.debuff || effect.negative || effect.harmful) return true;
  const statValues = Object.values(effect.addStats || {});
  const resistanceValues = Object.values(effect.addResistances || {});
  return [...statValues, ...resistanceValues].some(value => Number(value) < 0);
}

function statusEffectDescription(effect) {
  if (effect.kind === "dot") {
    const realm = statusEffectRealm(effect);
    const tick = formatNumber(effect.tick || 1);
    const remaining = effect.remaining != null ? ` for ${formatNumber(Math.max(0, effect.remaining))}s` : "";
    return `Takes ${formatNumber(effect.damage || 0)} ${realm} damage every ${tick}s${remaining}.`;
  }
  const template = spellTemplateByName(effect.name);
  if (template) return spellDescription({ ...template, ...effect, lvl: effect.lvl || template.lvl || 1 });
  const parts = [];
  for (const [stat, value] of Object.entries(effect.addStats || {})) {
    parts.push(`${stat} ${Number(value) >= 0 ? "+" : ""}${formatNumber(value)}`);
  }
  for (const [realm, value] of Object.entries(effect.addResistances || {})) {
    parts.push(`${realm} RESIST ${Number(value) >= 0 ? "+" : ""}${formatNumber(value)}`);
  }
  if (effect.shieldAmount) parts.push(`Absorbs ${formatNumber(effect.shieldAmount)} damage.`);
  if (effect.invisible) parts.push("Invisible to enemies.");
  if (effect.incorporeal) parts.push("Incorporeal.");
  if (effect.freeze) parts.push("Frozen.");
  if (effect.damage) parts.push(`Deals ${formatNumber(effect.damage)} damage every ${formatNumber(effect.tick || 1)}s.`);
  if (effect.remaining != null) parts.push(`${formatNumber(Math.max(0, effect.remaining))}s remaining.`);
  return parts.join(" ") || "Active effect.";
}

function activePlayerStatusEffects() {
  const effects = [];
  for (const mod of game.player.statMods || []) {
    if (!mod?.name) continue;
    effects.push({
      ...mod,
      kind: "buff",
      debuff: statusEffectIsDebuff(mod)
    });
  }
  for (const dot of game.player.dots || []) {
    if (!dot?.name) continue;
    effects.push({
      ...dot,
      kind: "dot",
      debuff: true
    });
  }
  for (const spell of game.player.spells || []) {
    if (!spell?.aura) continue;
    effects.push({
      ...spell,
      kind: "aura",
      debuff: spell.name === "Pestilent Aura"
    });
  }
  return effects;
}

function activeTargetStatusEffects(target) {
  if (!target) return [];
  if (target === game.player) return activePlayerStatusEffects();
  const effects = [];
  for (const mod of target.statMods || []) {
    if (!mod?.name) continue;
    effects.push({ ...mod, kind: "buff", debuff: statusEffectIsDebuff(mod) });
  }
  for (const dot of target.dots || []) {
    if (!dot?.name) continue;
    effects.push({ ...dot, kind: "dot", debuff: true });
  }
  for (const spell of target.activeSpells || target.spells || []) {
    if (!spell?.aura) continue;
    effects.push({ ...spell, kind: "aura", debuff: spell.name === "Pestilent Aura" });
  }
  return effects;
}

function statusEffectIconHtml(effect) {
  if (effect?.name === "Frozen" || effect?.freeze) return spellIconHtml({ name: "Frozen Touch" }, "status-effect-img");
  if (effect?.name === "Burning") return spellIconHtml({ name: "Fireball" }, "status-effect-img");
  const iconItem = effect.iconItem || (effect.iconGraphic ? { name: effect.name, graphic: effect.iconGraphic } : null);
  const iconSrc = iconItem ? itemIconSrc(iconItem) : "";
  if (iconSrc) {
    const cssIconSrc = itemIconCssSrc(iconItem, iconSrc);
    const label = escapeHtml(effect.name || "Effect");
    return `<span class="status-effect-img status-effect-item-img" style="background-image:url('${cssIconSrc}')" aria-label="${label}"></span>`;
  }
  return spellIconHtml(effect, "status-effect-img");
}

function targetIsHostileToPlayer(target) {
  if (!target || target === game.player) return false;
  if (game.enemies.includes(target)) return unitHostileTo(target, game.player) || unitHostileTo(game.player, target);
  return alignmentHostileTo(target.alignment || "Neutral", playerAlignment())
    || alignmentHostileTo(playerAlignment(), target.alignment || "Neutral");
}

function targetAlignmentHtml(target) {
  const alignment = target === game.player ? playerAlignment() : unitAlignment(target);
  const symbol = alignmentSymbol(alignment);
  if (!symbol) return "";
  const className = alignment === "Evil" ? "evil" : "good";
  return `<span class="alignment-icon ${className}" title="${escapeHtml(alignment)}">${symbol}</span>`;
}

function targetTypeLabel(target) {
  if (target === game.player || targetKindForUnit(target) === "peer") return "Player";
  const parts = [];
  if (target?.elite) parts.push("Elite");
  if (target?.boss) parts.push("Boss");
  parts.push(target?.type || "Unit");
  return parts.join(" ");
}

function peerByName(name) {
  const wanted = String(name || "").trim().toLowerCase();
  if (!wanted) return null;
  return [...game.multiplayer.peers.values()].find(peer => String(peer.name || "").toLowerCase() === wanted) || null;
}

function peerCloseEnough(peer, rangeUnits = 3) {
  return Boolean(peer
    && peer.area === currentPlayerAreaName()
    && Math.hypot((peer.x || 0) - game.player.x, (peer.y || 0) - game.player.y) <= rangeUnits * RANGE_UNIT);
}

function hydratedPeerEquippedItems(peer) {
  const equipped = {};
  for (const [slot, item] of Object.entries(peer?.equippedItems || {})) {
    const hydrated = hydrateAccountEquipmentItem(item);
    if (hydrated) equipped[slot] = hydrated;
  }
  return equipped;
}

function renderInspectWindow(peer) {
  if (!inspectWindowBody || !peer) return;
  const equipped = hydratedPeerEquippedItems(peer);
  const html = `
    <div class="inspect-window">
      <strong>${escapeHtml(peer.name || "Player")}</strong>
      <div class="equipment-grid inspect-equipment-grid">
        ${equipmentDisplaySlots.map(({ slot, label, col, row, small }) => {
          const item = equipped[slot];
          const style = `grid-column:${col};grid-row:${row};`;
          const labelHtml = `<span>${escapeHtml(label)}</span>`;
          if (!item) return `<div class="equip-row empty${small ? " small-slot" : ""}" style="${style}" title="${escapeHtml(slot)}">${labelHtml}</div>`;
          return `
            <button class="equip-row equip-button${small ? " small-slot" : ""}" type="button" style="${style}" title="${escapeHtml(slot)}">
              ${renderItemContents(item, true)}
              ${itemTooltipHtml(item)}
            </button>
          `;
        }).join("")}
      </div>
    </div>
  `;
  updateHtmlIfChanged(inspectWindowBody, html);
  inspectWindowSignature = `${peer.id}|${JSON.stringify(peer.equippedItems || {})}`;
  setFloatingOpen("inspect", true);
  markFloatingFitContentChanged("inspect");
}

function closeInspectWindow() {
  document.querySelector("#inspectFloatingWindow")?.classList.add("hidden");
  floatingState("inspect").open = false;
  inspectWindowSignature = "";
}

function inspectPeer(peer) {
  if (!peer) return false;
  if (!peerCloseEnough(peer)) {
    addLog(`<b>Inspect:</b> ${escapeHtml(peer.name || "Player")} is too far away.`, null, "chat");
    return false;
  }
  renderInspectWindow(peer);
  return true;
}

function tradeWithPeer(peer) {
  if (!peer) return false;
  if (!peerCloseEnough(peer)) {
    addLog(`<b>Trade:</b> ${escapeHtml(peer.name || "Player")} is too far away.`, null, "chat");
    return false;
  }
  sendTradeAction("request", { playerName: peer.name || "" });
  return true;
}

function toggleFollowPeer(peer) {
  if (!peer) return false;
  if (game.autoFollowTargetId === peer.id) {
    game.autoFollowTargetId = "";
    addLog(`<b>Follow:</b> stopped following ${escapeHtml(peer.name || "Player")}.`, null, "chat");
  } else {
    game.autoFollowTargetId = peer.id;
    addLog(`<b>Follow:</b> following ${escapeHtml(peer.name || "Player")}.`, null, "chat");
  }
  renderTargetWindow();
  return true;
}

function renderTargetWindow() {
  if (!targetWindowBody) return;
  const target = selectedTargetUnit();
  if (!target) {
    if (game.selectedTarget) game.selectedTarget = null;
    const empty = `<div class="target-empty">No target selected.</div>`;
    if (targetWindowSignature !== empty) {
      targetWindowBody.innerHTML = empty;
      targetWindowSignature = empty;
    }
    return;
  }
  const hp = Math.max(0, Number(target.hp) || 0);
  const maxHp = Math.max(1, Number(target.maxHp) || hp || 1);
  const realm = normalizeRealm(target.realm || "Mortal");
  const realmColor = realmUiColor(realm);
  const hostile = targetIsHostileToPlayer(target);
  const effects = activeTargetStatusEffects(target);
  const isPeerTarget = targetKindForUnit(target) === "peer";
  const followingTarget = isPeerTarget && game.autoFollowTargetId === target.id;
  const effectHtml = effects.map(effect => {
    const effectRealm = statusEffectRealm(effect);
    const realmEffectColor = realmUiColor(effectRealm);
    const debuff = statusEffectIsDebuff(effect);
    return `
      <span class="target-effect-icon ${debuff ? "debuff" : "buff"}" tabindex="0" aria-label="${escapeHtml(effect.name || "Effect")}">
        ${statusEffectIconHtml(effect)}
        <span class="status-effect-tooltip" role="tooltip">
          <strong style="color:${realmEffectColor}">${escapeHtml(effect.name || "Effect")}</strong>
        </span>
      </span>
    `;
  }).join("");
  const html = `
    <div class="target-card">
      <div class="target-name-row">
        <strong class="${hostile ? "hostile" : ""}">${escapeHtml(target.name || "Target")}</strong>
        ${targetAlignmentHtml(target)}
      </div>
      <div class="target-meta">
        <span>LVL <b>${formatNumber(target.level || target.lvl || 1)}</b></span>
        <span><b style="color:${realmColor}">${escapeHtml(realm)}</b></span>
        <span>${escapeHtml(targetTypeLabel(target))}</span>
      </div>
      <div class="target-hp">
        <span class="sr-only">HP</span>
        <i style="width:${Math.max(0, Math.min(100, (hp / maxHp) * 100))}%"></i>
      </div>
      <div class="target-effects">${effectHtml}</div>
      ${isPeerTarget ? `
        <div class="target-actions">
          <button type="button" data-target-action="invite">Invite</button>
          <button type="button" data-target-action="inspect">Inspect</button>
          <button type="button" data-target-action="trade">Trade</button>
          <button type="button" data-target-action="follow">${followingTarget ? "Unfollow" : "Follow"}</button>
        </div>
      ` : ""}
    </div>
  `;
  if (targetWindowSignature !== html) {
    targetWindowBody.innerHTML = html;
    targetWindowSignature = html;
    markFloatingFitContentChanged("target");
  }
}

function renderStatusEffectHud() {
  if (statusEffectHud && !statusEffectHud.classList.contains("hidden")) {
    statusEffectHud.innerHTML = "";
    statusEffectHud.classList.add("hidden");
  }
  if (!effectsWindowBody) return;
  const effects = activePlayerStatusEffects();
  const signature = effects.map(effect => [
    effect.kind,
    effect.name,
    statusEffectRealm(effect),
    statusEffectIsDebuff(effect) ? "debuff" : "buff",
    effect.iconGraphic || "",
    JSON.stringify(effect.iconItem || {}),
    formatNumber(effect.shieldAmount ?? ""),
    JSON.stringify(effect.addStats || {}),
    JSON.stringify(effect.addResistances || {})
  ].join("|")).join(";");
  if (signature === effectsWindowSignature) return;
  effectsWindowSignature = signature;
  statusEffectHudSignature = signature;
  const html = effects.map(effect => {
    const realm = statusEffectRealm(effect);
    const realmColor = realmInfo[realm]?.color || realmInfo.Mortal.color;
    const shadowClass = realm === "Umbral" ? " shadow-text" : "";
    const debuff = statusEffectIsDebuff(effect);
    return `
      <div class="status-effect-icon ${debuff ? "debuff" : "buff"}" tabindex="0" aria-label="${escapeHtml(effect.name)}">
        ${statusEffectIconHtml(effect)}
        <div class="status-effect-tooltip" role="tooltip">
          <strong class="${shadowClass.trim()}" style="color:${realmColor}">${escapeHtml(effect.name)}</strong>
        </div>
      </div>
    `;
  }).join("");
  updateHtmlIfChanged(effectsWindowBody, html);
}

function markUIDirty() {
  game.uiDirty = true;
  game.shopContactLatch = false;
}

function renderUI() {
  applyFloatingState("bar");
  if (!game.map || !modeChoice.classList.contains("hidden")) return;
  const p = game.player;
  syncOpenBagInventory?.();
  renderStatusEffectHud();
  renderTargetWindow();
  renderPetWindow();
  renderOptionsWindow();
  renderCharacterRealmPane();
  renderCharacterFactionPane();
  updateTrainerRealmOverlay();
  if (bankWindow && !bankWindow.classList.contains("hidden")) renderBank();
  updateTextIfChanged(hpReadout, `${p.hp} / ${p.maxHp}`);
  updateTextIfChanged(xpReadout, `${p.xp} / ${p.nextXp}`);
  updateTextIfChanged(goldReadout, p.gold);
  updateTextIfChanged(weaponReadout, p.weapon ? p.attackTimer <= 0 ? "Ready" : `${p.attackTimer.toFixed(1)}s` : "Empty");
  updateTextIfChanged(levelReadout, p.level);
  updateWidthIfChanged(hpBar, `${(p.hp / p.maxHp) * 100}%`);
  updateWidthIfChanged(xpBar, `${(p.xp / p.nextXp) * 100}%`);
  updateWidthIfChanged(goldBar, "100%");
  updateWidthIfChanged(weaponBar, p.weapon ? `${Math.max(0, Math.min(1, 1 - p.attackTimer / attackInterval())) * 100}%` : "0%");

  const alignment = playerAlignment();
  const alignmentSymbol = alignment === "Evil"
    ? `<span class="alignment-icon evil">☾</span>`
    : alignment === "Good"
      ? `<span class="alignment-icon good">☀</span>`
      : "";

  if (game.uiDirty) {
    renderQuestLog();
    renderSoulCrystalsWindow();
    updateHtmlIfChanged(playerSummary, `
      <div class="summary-compact">
        <div class="summary-name"><strong data-summary-name></strong><span data-summary-alignment></span></div>
        <div class="summary-level"><span>LVL</span><strong data-summary-level></strong></div>
        <div class="summary-bar"><span>HP</span><strong data-summary-hp></strong><i data-summary-hp-bar></i></div>
        <div class="summary-bar xp"><span>EXP</span><strong data-summary-xp></strong><i data-summary-xp-bar></i></div>
      </div>
    `);

    const visibleStats = ["ATK", "DEF", "SPD", "AGL", "INT", "FOCUS", "BLOCK", "REGEN"];
    const statRows = visibleStats.map((key) => {
      const value = p.stats[key] || 0;
      const effective = effectiveStat(p, key);
      const debuffed = effective < value;
      const buffed = effective > value;
      return `
        <div class="stat-row${debuffed ? " debuffed" : buffed ? " buffed" : ""}" tabindex="0">
          <span>${key}</span>
          <strong>${formatStat(key, debuffed || buffed ? effective : value)}</strong>
          <div class="stat-tooltip">${escapeHtml(statDescriptions[key] || key)}</div>
        </div>
      `;
    });
    const virtueClass = p.virtue <= -10 ? " debuffed" : p.virtue >= 10 ? " virtuous" : "";
    statRows.push(`
      <div class="stat-row${virtueClass}" tabindex="0">
        <span>VIRTUE</span>
        <strong>${formatNumber(p.virtue)}</strong>
        <div class="stat-tooltip">${escapeHtml(statDescriptions.Virtue)}</div>
      </div>
    `);
    updateHtmlIfChanged(statsGrid, statRows.join(""));

    updateHtmlIfChanged(resistancesGrid, realms.map(realm => {
      const color = realmInfo[realm]?.color || "#f2ede3";
      const shadowClass = realm === "Umbral" ? " shadow-text" : "";
      return `
        <div class="resistance-chip" tabindex="0">
          <span class="${shadowClass}" style="color:${color}">${realm}</span>
          <strong>${formatNumber(realmResist(p, realm))}</strong>
          <div class="stat-tooltip">Reduces incoming ${realm} Magical damage.</div>
        </div>
      `;
    }).join(""));

    updateHtmlIfChanged(equipmentGrid, equipmentDisplaySlots.map(({ slot, label, col, row, small }) => {
      const item = p.equippedItems[slot];
      const style = `grid-column:${col};grid-row:${row};`;
      const labelHtml = `<span>${escapeHtml(label)}</span>`;
      if (!item) {
        return `<div class="equip-row empty${small ? " small-slot" : ""}" style="${style}" title="${escapeHtml(slot)}">${labelHtml}</div>`;
      }
      return `
        <button class="equip-row equip-button${small ? " small-slot" : ""}" type="button" data-equipment-slot="${escapeHtml(slot)}" style="${style}" title="${escapeHtml(slot)}">
          ${renderItemContents(item, true)}
          ${itemTooltipHtml(item)}
        </button>
      `;
    }).join(""));

    const inventoryHtml = p.inventory.map((item, index) => {
      if (!item) {
        return `<button class="inventory-slot empty" type="button" data-inventory-index="${index}" aria-label="Empty inventory slot"><span>Empty</span></button>`;
      }
      return `
        <button class="inventory-slot filled" type="button" data-inventory-index="${index}">
          ${renderItemContents(item)}
          ${itemTooltipHtml(item)}
        </button>
      `;
    }).join("");
    updateHtmlIfChanged(inventoryGrid, inventoryHtml);

    game.uiDirty = false;
    markFloatingFitContentChanged("character");
    markFloatingFitContentChanged("inventory");
  }

  const summaryName = playerSummary.querySelector("[data-summary-name]");
  const summaryLevel = playerSummary.querySelector("[data-summary-level]");
  const summaryAlignment = playerSummary.querySelector("[data-summary-alignment]");
  const summaryHp = playerSummary.querySelector("[data-summary-hp]");
  const summaryHpBar = playerSummary.querySelector("[data-summary-hp-bar]");
  const summaryXp = playerSummary.querySelector("[data-summary-xp]");
  const summaryXpBar = playerSummary.querySelector("[data-summary-xp-bar]");
  updateTextIfChanged(summaryName, p.name || "Soulreaper");
  updateTextIfChanged(summaryLevel, p.level);
  if (summaryAlignment) updateHtmlIfChanged(summaryAlignment, alignmentSymbol);
  updateTextIfChanged(summaryHp, `${formatNumber(p.hp)} / ${formatNumber(p.maxHp)}`);
  updateWidthIfChanged(summaryHpBar, `${Math.max(0, Math.min(1, p.hp / p.maxHp)) * 100}%`);
  updateTextIfChanged(summaryXp, `${formatNumber(p.xp)} / ${formatNumber(p.nextXp)}`);
  updateWidthIfChanged(summaryXpBar, `${Math.max(0, Math.min(1, p.xp / p.nextXp)) * 100}%`);

  enforceSinglePassiveSpell();
  const passiveEntry = preparedPassiveSpellEntry();
  const activeEntries = preparedActiveSpellEntries();
  const nextSpellHudSignature = p.spells.map(spell => [
    spell.name,
    spell.realm,
    spell.static ? "static" : spellLevel(spell),
    spell.range || 0,
    formatNumber(spellCooldown(spell)),
    spellDescription(spell),
    Boolean(spell.manualTarget || spell.manualCast || clickTargetSpellNames.has(spell.name)) ? "clickable" : "passive",
    spell.autocast ? "auto" : "manual",
    spellMemorizing(spell) > 0 ? "memorizing" : "",
    spell.memorizationReadyFlash > 0 ? "memorized-flash" : "",
    game.pendingSpellAssignment || "",
    game.activeTrainer ? `${game.activeTrainer.id || game.activeTrainer.name}|${game.player.gold}|${game.player.level}|${game.player.spellSlotsActive}` : ""
  ].join("|")).join(";") + `;active:${activeEntries.map(entry => entry.index).join(",")};passive:${passiveEntry?.index ?? ""}` + (game.activeTrainer ? `;trainer:${game.activeTrainer.id || game.activeTrainer.name}|${game.player.gold}|${game.player.level}|${game.player.spellSlotsActive};trainer-slot:${JSON.stringify(nextSpellSlotUnlock?.() || null)}` : "");

  spellHudEl.classList.toggle("trainer-active", Boolean(game.activeTrainer));

  if (!p.spells.length && !game.activeTrainer) {
    if (spellHudEl.innerHTML) spellHudEl.innerHTML = "";
    spellHudSignature = "";
    game.spellHudCooldownBars = [];
    game.spellHudMemorizationBars = [];
    game.spellHudPills = [];
    return;
  }

  if (spellHudSignature !== nextSpellHudSignature) {
    const spellTooltipHtml = (spell, training, armorBonusText, rangeText, cooldownText, realmColor, shadowClass) => training.active ? trainerSpellTooltipHtml(spell, training) : `<div class="spell-tooltip">
      <strong>${escapeHtml(spell.name)}</strong>
      <span>Realm <b class="${shadowClass.trim()}" style="color:${realmColor}">${escapeHtml(spell.realm)}</b></span>
      <span>${spell.static ? "Static Spell" : `LVL <b>${spellLevel(spell)}</b>`}</span>
      <span>Cooldown <b>${cooldownText}</b></span>
      ${rangeText}
      ${armorBonusText}
      <p>${escapeHtml(spellDescription(spell))}</p>
    </div>`;
    const spellPillHtml = ({ spell, index }, activeSlotIndex = 0) => {
      const cd = spellCooldown(spell);
      const realmColor = realmInfo[spell.realm]?.color || "#f2ede3";
      const realmUi = realmUiColor(spell.realm);
      const shadowClass = spell.realm === "Umbral" ? " shadow-text" : "";
      const rangeText = spell.range ? `<span>Range <b>${formatNumber(spell.range)}</b></span>` : "";
      const cooldownText = spell.passive ? "Passive" : `${formatNumber(cd)}s`;
      const canAutocast = spell.autocastAvailable !== false && !spell.passive && spell.cast && !spell.castAt;
      const memorizing = spellMemorizing(spell) > 0;
      const memorizedFlash = Number(spell.memorizationReadyFlash) > 0;
      const training = spellTrainerState(spell, index);
      const trainerClasses = training.active
        ? ` trainer-active-spell${training.trainable ? " trainer-trainable" : " trainer-maxed"}${training.affordable ? " trainer-affordable gold-orbit" : ""}${training.trainable && !training.affordable ? " trainer-unaffordable" : ""}`
        : "";
      const armorBonusText = spell.name === "Aura of Protection"
        ? `<span>DEF <b>+${formatNumber(spellValue(spell, "defenseBonus", 0, 0.25))}</b></span>`
        : spell.name === "Song of White Stag"
          ? `<span>REGEN <b>+${formatNumber(spellValue(spell, "regenBonus", 0, 0.5))}</b></span>`
          : spell.name === "Archery Mastery"
            ? `<span>Bow Delay <b>-${formatNumber(spellValue(spell, "bowDelayReduction", 0, 3))}</b></span>`
          : spell.name === "Axe Mastery"
            ? `<span>Axe Delay <b>-${formatNumber(spellValue(spell, "axeDelayReduction", 0, 3))}</b></span>`
          : spell.name === "Mace Mastery"
            ? `<span>Mace Stun <b>+${formatNumber(spellValue(spell, "stunChanceBonus", 0, 1))}%</b></span>`
          : spell.name === "Dagger Mastery"
            ? `<span>FOCUS <b>+${formatNumber(spellValue(spell, "focusBonus", 4, 1))}</b></span>`
          : spell.name === "Shield Mastery"
            ? `<span>BLOCK <b>+${formatNumber(spellValue(spell, "blockBonus", 0, 1))}</b></span>`
          : spell.name === "Dual Wield"
            ? `<span>Off-Hand <b>${formatNumber(spellValue(spell, "offHandDamagePercent", 8, 2))}%</b></span>`
          : spell.name === "War Drums"
            ? `<span>AGL <b>+${formatNumber(spellValue(spell, "agilityBonus", 0, 2.5))}</b></span>`
          : spell.name === "Bloodthirsty Aura"
            ? `<span>FOCUS <b>+${formatNumber(spellValue(spell, "focusBonus", 0, 1))}</b></span>`
          : spell.name === "Etherwind Aura"
            ? `<span>INT/RESIST <b>+${formatNumber(spellValue(spell, "intelligenceBonus", 0, 0.5))}</b></span>`
          : spell.name === "Pestilent Aura"
            ? `<span>Umbral DMG <b>${formatNumber(spellDamageValue(spell, "damage", 0, 0.2))}/s</b> / REGEN <b>0</b></span>`
          : "";
      if (spell.passive) {
        return `
          <div class="passive-spell-slot${trainerClasses}" style="--spell-realm-color:${realmUi}" data-active-spell-index="${index}" role="button" tabindex="0" aria-label="Passive Spell Slot: ${escapeHtml(spell.name)}">
            ${training.affordable ? `<span class="attention-spark" aria-hidden="true"></span>` : ""}
            ${spellIconHtml(spell, "spell-slot-icon passive-spell-icon")}
            ${training.active && training.trainable && !training.affordable ? `<span class="trainer-unaffordable-overlay" aria-hidden="true"></span>` : ""}
            ${spellTooltipHtml(spell, training, armorBonusText, rangeText, cooldownText, realmColor, shadowClass)}
          </div>
        `;
      }
      return `
          <div class="spell-pill${spell.autocast ? " autocast-on" : ""}${game.pendingSpellAssignment ? " replacing-spell" : ""}${memorizing ? " memorizing-spell" : ""}${memorizedFlash ? " memorized-flash gold-orbit" : ""}${trainerClasses}" style="--spell-realm-color:${realmUi}" data-active-spell-index="${index}" role="button" tabindex="0">
            ${training.affordable ? `<span class="attention-spark" aria-hidden="true"></span>` : ""}
            ${memorizedFlash ? `<span class="attention-spark" aria-hidden="true"></span>` : ""}
            ${spell.autocast ? `<span class="autocast-orb" aria-hidden="true"></span>` : ""}
          ${canAutocast ? `<button class="autocast-toggle${spell.autocast ? " active" : ""}" type="button" data-toggle-autocast="${index}" title="Toggle autocast">A</button>` : ""}
          <span class="spell-slot-face">
            ${spellIconHtml(spell, "spell-slot-icon")}
            <span class="spell-slot-hotkey">${activeSlotIndex + 1}</span>
          </span>
          ${training.active && training.trainable && !training.affordable ? `<span class="trainer-unaffordable-overlay" aria-hidden="true"></span>` : ""}
          ${game.pendingSpellAssignment ? `<span class="spell-replace-overlay" aria-hidden="true"></span>` : ""}
          <span class="spell-memorization-meter" aria-hidden="true"><i data-spell-memorization="${index}"></i></span>
          <div class="cooldown-bar"><i data-spell-cooldown="${index}"></i></div>
          ${spellTooltipHtml(spell, training, armorBonusText, rangeText, cooldownText, realmColor, shadowClass)}
        </div>
      `;
    };
    const passiveHtml = passiveEntry ? spellPillHtml(passiveEntry, -1) : "";
    const activeHtml = activeEntries.map((entry, activeSlotIndex) => spellPillHtml(entry, activeSlotIndex)).join("");
    const nextUnlock = game.activeTrainer ? nextSpellSlotUnlock?.() : null;
    const unlockReady = Boolean(nextUnlock && game.player.level >= nextUnlock.level);
    const unlockAffordable = Boolean(unlockReady && game.player.gold >= nextUnlock.cost);
    const unlockHtml = game.activeTrainer ? `
      <div class="spell-pill trainer-empty-slot${unlockReady ? " trainer-trainable" : ""}${unlockAffordable ? " trainer-affordable gold-orbit" : ""}${nextUnlock && !unlockAffordable ? " trainer-unaffordable" : ""}" data-trainer-unlock-slot role="button" tabindex="0">
        ${unlockAffordable ? `<span class="attention-spark" aria-hidden="true"></span>` : ""}
        <span class="spell-slot-face empty-spell-slot-face">
          <span class="empty-spell-slot-icon">+</span>
          <span class="spell-slot-hotkey">${activeEntries.length + 1}</span>
        </span>
        ${nextUnlock && !unlockAffordable ? `<span class="trainer-unaffordable-overlay" aria-hidden="true"></span>` : ""}
        <div class="cooldown-bar"><i></i></div>
        ${trainerEmptySlotTooltipHtml(nextUnlock)}
      </div>
    ` : "";
  spellHudEl.innerHTML = passiveHtml + activeHtml + unlockHtml;
  spellHudSignature = nextSpellHudSignature;
  game.spellHudCooldownBars = new Map([...spellHudEl.querySelectorAll("[data-spell-cooldown]")].map(bar => [Number(bar.dataset.spellCooldown), bar]));
  game.spellHudMemorizationBars = new Map([...spellHudEl.querySelectorAll("[data-spell-memorization]")].map(bar => [Number(bar.dataset.spellMemorization), bar]));
  game.spellHudPills = new Map([...spellHudEl.querySelectorAll("[data-active-spell-index]")].map(pill => [Number(pill.dataset.activeSpellIndex), pill]));
  updateSpellsWindowLayout();
}

  p.spells.forEach((spell, index) => {
    if (spell.passive) return;
    const cd = spellCooldown(spell);
    const ready = cd > 0 ? Math.max(0, Math.min(1, 1 - spell.timer / cd)) : 1;
    const cooldownBar = game.spellHudCooldownBars.get?.(index) || game.spellHudCooldownBars[index];
    updateWidthIfChanged(cooldownBar, `${ready * 100}%`);
    const memorizationRemaining = spellMemorizing(spell);
    const memorizationDuration = Math.max(0.1, Number(spell.memorizationDuration) || SPELL_MEMORIZATION_SECONDS);
    const memorizationBar = game.spellHudMemorizationBars?.get?.(index) || game.spellHudMemorizationBars?.[index];
    if (memorizationBar) {
      const height = memorizationRemaining > 0 ? Math.max(0, Math.min(1, memorizationRemaining / memorizationDuration)) * 100 : 0;
      memorizationBar.style.height = `${height}%`;
    }
    const clickableWithCooldown = cd > 0 && !spell.passive && Boolean(spell.manualTarget || spell.manualCast || clickTargetSpellNames.has(spell.name));
    const spellPill = game.spellHudPills.get?.(index) || game.spellHudPills[index];
    if (spellPill) spellPill.classList.toggle("spell-ready", clickableWithCooldown && spell.timer <= 0);
  });
}

function spellTrainerCost(spell) {
  return spellLevel(spell) * 5;
}

function spellTrainerState(spell, index) {
  const trainer = game.activeTrainer;
  if (trainer) {
    return { active: false, trainable: false, affordable: false, maxed: false, cost: 0, reason: "", index };
  }
  if (!trainer || !spell || spell.static) {
    return { active: false, trainable: false, affordable: false, maxed: false, cost: 0, reason: "", index };
  }
  const level = spellLevel(spell);
  const cap = trainerMaxSpellLevel?.(trainer) ?? Infinity;
  const realmAllowed = trainerRealms?.(trainer)?.includes(spell.realm || "Mortal") ?? true;
  const playerLevelMaxed = level >= game.player.level;
  const trainerCapMaxed = Number.isFinite(cap) && level >= cap;
  const maxed = playerLevelMaxed || trainerCapMaxed;
  const trainable = realmAllowed && !maxed && Boolean(trainerCanTrainSpell?.(spell, trainer));
  const cost = spellTrainerCost(spell);
  const affordable = trainable && game.player.gold >= cost;
  const reason = !realmAllowed
    ? `${trainer.name || "This trainer"} cannot train ${spell.realm || "Mortal"} spells.`
    : trainerCapMaxed
      ? `Max trained here: LVL ${cap}.`
      : playerLevelMaxed
        ? `Max for your player LVL: ${game.player.level}.`
        : "This spell is already at max level.";
  return { active: true, trainable, affordable, maxed, cost, reason, index };
}

function spellTrainerScalingLines(spell) {
  const lines = [];
  if (spell.name === "Aura of Protection") lines.push(["DEF", spellValue(spell, "defenseBonus", 0, 0.25)]);
  else if (spell.name === "Song of White Stag") lines.push(["REGEN", spellValue(spell, "regenBonus", 0, 0.5)]);
  else if (spell.name === "Archery Mastery") lines.push(["Bow Delay", -spellValue(spell, "bowDelayReduction", 0, 3)]);
  else if (spell.name === "Axe Mastery") lines.push(["Axe Delay", -spellValue(spell, "axeDelayReduction", 0, 3)]);
  else if (spell.name === "Mace Mastery") lines.push(["Mace Stun", `${formatNumber(spellValue(spell, "stunChanceBonus", 0, 1))}%`]);
  else if (spell.name === "Dagger Mastery") lines.push(["FOCUS", spellValue(spell, "focusBonus", 4, 1)]);
  else if (spell.name === "Shield Mastery") lines.push(["BLOCK", spellValue(spell, "blockBonus", 0, 1)]);
  else if (spell.name === "Dual Wield") lines.push(["Off-Hand", `${formatNumber(spellValue(spell, "offHandDamagePercent", 8, 2))}%`]);
  else if (spell.name === "War Drums") lines.push(["AGL", spellValue(spell, "agilityBonus", 0, 2.5)]);
  else if (spell.name === "Bloodthirsty Aura") lines.push(["FOCUS", spellValue(spell, "focusBonus", 0, 1)]);
  else if (spell.name === "Etherwind Aura") {
    lines.push(["INT", spellValue(spell, "intelligenceBonus", 0, 0.5)]);
    lines.push(["RESIST", spellValue(spell, "resistBonus", 0, 0.5)]);
  }
  else if (spell.name === "Pestilent Aura") lines.push(["Umbral DMG/s", spellDamageValue(spell, "damage", 0, 0.2)]);
  else if (spell.name === "Frozen Touch") lines.push(["Freeze Chance", `${formatNumber(spellValue(spell, "freezeChance", 0, 2))}%`]);
  else if (spell.name === "Burning Skin") lines.push(["Retaliation", `${formatNumber(spellDamageValue(spell, "damage", 0, 0.5))} Infernal`]);
  else if (Number(spell.damage) || Number(spell.damageBase) || Number(spell.damagePerLevel)) lines.push(["Damage", spellDamageValue(spell, "damage", Number(spell.damageBase) || 0, Number(spell.damagePerLevel) || 0)]);
  else if (Number(spell.heal) || Number(spell.healBase) || Number(spell.healPerLevel)) lines.push(["Heal", spellDamageValue(spell, "heal", Number(spell.healBase) || 0, Number(spell.healPerLevel) || 0)]);
  return lines;
}

function spellTrainerStatsHtml(spell) {
  const cd = spellCooldown(spell);
  const stats = [
    `LVL <b>${spellLevel(spell)}</b>`,
    `Cooldown <b>${spell.passive ? "Passive" : `${formatNumber(cd)}s`}</b>`
  ];
  if (spell.range) stats.push(`Range <b>${formatNumber(spell.range)}</b>`);
  for (const [label, value] of spellTrainerScalingLines(spell)) {
    stats.push(`${escapeHtml(label)} <b>${typeof value === "number" ? formatNumber(value) : escapeHtml(String(value))}</b>`);
  }
  stats.push(`<p>${escapeHtml(spellDescription(spell))}</p>`);
  return stats.map(line => line.startsWith("<p>") ? line : `<span>${line}</span>`).join("");
}

function trainerSpellTooltipHtml(spell, state) {
  if (!state.trainable) {
    return `
      <div class="spell-tooltip trainer-spell-tooltip">
        <strong>${escapeHtml(spell.name)}</strong>
        <span>${escapeHtml(state.reason || "This spell is already at max level.")}</span>
      </div>
    `;
  }
  const nextSpell = { ...spell, lvl: spellLevel(spell) + 1 };
  const costClass = game.player.gold >= state.cost ? "" : " insufficient";
  return `
    <div class="spell-tooltip trainer-spell-tooltip">
      <strong>${escapeHtml(spell.name)}</strong>
      <div class="trainer-compare">
        <div>${spellTrainerStatsHtml(spell)}</div>
        <b class="trainer-compare-arrow">-&gt;</b>
        <div>${spellTrainerStatsHtml(nextSpell)}</div>
      </div>
      <span class="trainer-cost${costClass}">Train: <b>${state.cost} Gold</b></span>
    </div>
  `;
}

function trainerEmptySlotTooltipHtml(nextUnlock) {
  if (!nextUnlock) {
    return `<div class="spell-tooltip trainer-spell-tooltip"><strong>Spell Slot</strong><span>All available spell slots are unlocked.</span></div>`;
  }
  const levelOk = game.player.level >= nextUnlock.level;
  const goldOk = game.player.gold >= nextUnlock.cost;
  return `
    <div class="spell-tooltip trainer-spell-tooltip trainer-slot-tooltip">
      <strong>Unlock Spell Slot</strong>
      <span class="${levelOk ? "" : "insufficient"}">Requires LVL <b>${nextUnlock.level}</b></span>
      <span class="${goldOk ? "" : "insufficient"}">Cost <b>${nextUnlock.cost} Gold</b></span>
    </div>
  `;
}

function formatStat(key, value) {
  return value;
}

function startingSpellChoices() {
  return starterSpells.filter(spell => !spell?.passive && typeof spell?.cast === "function");
}

function renderStarterChoices() {
  starterSpellsEl.innerHTML = startingSpellChoices().map((spell, index) => `
    <button class="choice-card" type="button" data-spell="${index}">
      <strong>${spell.name}</strong>
      <span>${spell.realm} / LVL ${spellLevel(spell)} / ${spell.cooldown}s</span>
      <small>${spellDescription(spell)}</small>
    </button>
  `).join("");
}

function randomStatChoices(count = 3) {
  const stats = Object.keys(game.player.stats).filter(stat => !["HP", "RESIST"].includes(stat));
  for (let i = stats.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [stats[i], stats[j]] = [stats[j], stats[i]];
  }
  return stats.slice(0, count);
}

function pendingLevelStatsRequired() {
  return Math.max(2, Number(game.pendingLevelChoices?.statsRequired) || 2);
}

function renderLevelStatChoices() {
  const round = (game.pendingLevelChoices?.statsChosen || 0) + 1;
  const total = pendingLevelStatsRequired();
  const statChoices = randomStatChoices(3);
  return `
    <h3>Stat ${round} of ${total}</h3>
    <div class="level-choice-grid level-stat-choice-grid">
      ${statChoices.map(stat => `
        <button class="level-button level-stat-button gold-orbit" type="button" data-stat="${stat}" aria-label="${escapeHtml(stat)}: ${escapeHtml(statDescriptions[stat] || stat)}">
          <span class="attention-spark" aria-hidden="true"></span>
          <strong>${stat}</strong>
          <span class="level-choice-tooltip" role="tooltip">${escapeHtml(statDescriptions[stat] || stat)}</span>
        </button>
      `).join("")}
    </div>
  `;
}

function openLevelChoice(levelsGained = 1) {
  const trainableSpells = game.player.spells
    .map((spell, index) => ({ spell, index }))
    .filter(({ spell }) => !spell.static);
  const addedStatsRequired = Math.max(1, Math.floor(Number(levelsGained) || 1)) * 2;
  if (game.pendingLevelChoices) {
    game.pendingLevelChoices.statsRequired = pendingLevelStatsRequired() + addedStatsRequired;
  } else {
    game.pendingLevelChoices = {
      statsChosen: 0,
      statsRequired: addedStatsRequired,
      spell: trainableSpells.length === 0
    };
  }
  levelOptions.innerHTML = `
    <div id="levelStatChoices" class="level-choice-group">${renderLevelStatChoices()}</div>
    <div class="level-choice-group">
      <h3>Spell</h3>
      <div class="level-choice-grid level-spell-choice-grid">
        ${trainableSpells.map(({ spell, index }) => `
          <button class="level-button level-spell-button gold-orbit" type="button" data-spell-index="${index}" aria-label="${escapeHtml(spell.name)}: LVL ${spellLevel(spell)} to ${spellLevel(spell) + 1}">
            <span class="attention-spark" aria-hidden="true"></span>
            ${spellIconHtml(spell, "level-spell-icon")}
            <span class="level-choice-tooltip level-spell-tooltip" role="tooltip">
              <strong>${escapeHtml(spell.name)}</strong>
              <span>LVL <b>${spellLevel(spell)}</b> to <b>${spellLevel(spell) + 1}</b></span>
              <span>${escapeHtml(spellDescription({ ...spell, lvl: spellLevel(spell) + 1 }))}</span>
            </span>
          </button>
        `).join("") || `<div class="level-note">No levelable equipped spells.</div>`}
      </div>
    </div>
  `;
  levelChoice.classList.add("hidden");
  levelChoice.classList.remove("gold-orbit");
  logPanel?.classList.remove("level-up-active");
  setLevelUpTabVisible(true);
  syncPointerPause();
}

function finishLevelChoiceIfReady() {
  if (!game.pendingLevelChoices || game.pendingLevelChoices.statsChosen < pendingLevelStatsRequired() || !game.pendingLevelChoices.spell) return;
  game.pendingLevelChoices = null;
  levelChoice.classList.add("hidden");
  levelChoice.classList.remove("gold-orbit");
  logPanel?.classList.remove("level-up-active");
  setLevelUpTabVisible(false);
  syncPointerPause();
}

function increaseStat(stat) {
  const p = game.player;
  if (!game.pendingLevelChoices || game.pendingLevelChoices.statsChosen >= pendingLevelStatsRequired()) return;
  p.stats[stat] += 1;
  addLog(`Level ${p.level}: <b>${stat}</b> increased.`);
  markUIDirty();
  game.pendingLevelChoices.statsChosen += 1;
  if (game.pendingLevelChoices.statsChosen < pendingLevelStatsRequired()) {
    levelOptions.querySelector("#levelStatChoices").innerHTML = renderLevelStatChoices();
  } else {
    levelOptions.querySelectorAll("[data-stat]").forEach(button => {
      button.disabled = true;
      if (button.dataset.stat === stat) button.classList.add("selected");
    });
  }
  finishLevelChoiceIfReady();
}

function increaseSpell(index) {
  const spell = game.player.spells[index];
  if (!spell || spell.static) return;
  spell.lvl = spellLevel(spell) + 1;
  saveSpellLevel(spell);
  addLog(`<b>${spell.name}</b> increased to LVL ${spell.lvl}.`);
  markUIDirty();
  game.pendingLevelChoices.spell = true;
  levelOptions.querySelectorAll("[data-spell-index]").forEach(button => {
    button.disabled = true;
    if (Number(button.dataset.spellIndex) === index) button.classList.add("selected");
  });
  finishLevelChoiceIfReady();
}

function resetGame() {
  disconnectMultiplayer();
  game.running = false;
  game.keys.clear();
  game.last = performance.now();
  game.shake = 0;
  game.loopErrorLogged = false;
  game.mapVisible = true;
  game.mapZoom = DEFAULT_MAP_ZOOM;
  game.auraRealmXpTimers = {};
  game.player = structuredClone(initialPlayerState);
  equipStartingClothes();
  game.player.inventory[0] = cloneItem("Wooden Knife");
  game.map = generateMap();
  resetGroundCacheForMap();
  applyPlayerStartFromMap();
  game.mode = null;
  game.shopTab = "Equipment";
  game.quests = [];
  game.completedQuests = [];
  game.questLogAlert = false;
  game.enemies = [];
  game.enemySpatialGrid = null;
  game.enemySpatialCount = 0;
  game.enemySpatialVersion = 0;
  game.enemySpatialGridVersion = -1;
  game.eliteRespawns = [];
  populateFixedSpawns();
  populateFixedElites();
  game.projectiles = [];
  game.effects = [];
  game.floatingTexts = [];
  game.playerSpeech = null;
  game.npcSpeech = [];
  game.groundItems = [];
  game.logs = [];
  game.chronicleArea = null;
  game.chatOpen = false;
  game.devtoolsEnabled = false;
  game.godMode = false;
  game.ghostMode = false;
  game.inspectMobs = false;
  game.showCollision = false;
  game.devItemShop = false;
  game.activeShopkeeper = null;
  game.activeTrainer = null;
  game.pointTargetArea = null;
  game.pendingSpellTarget = null;
  clearSelectedTarget();
  game.activePetMenuId = null;
  game.pendingPetAttackId = null;
  hidePetCommandMenu();
  updatePetTargetCursor();
  game.mouseWorld = null;
  game.multiplayer.peers.clear();
  game.multiplayer.pendingPickups.clear();
  game.multiplayer.lastSent = 0;
  game.multiplayer.lastSnapshot = "";
  game.multiplayer.lastWorldStateSent = 0;
  game.multiplayer.lastWorldStateSnapshot = "";
  game.multiplayer.sentInitialWorldState = false;
  game.multiplayer.worldRevision = 0;
  game.multiplayer.hostId = null;
  game.multiplayer.isHost = false;
  game.multiplayer.team = null;
  hideTeamInvite();
  renderTeamWindow();
  chatInput.value = "";
  chatInput.classList.add("hidden");
  game.uiDirty = true;
  logEl.innerHTML = "";
  game.pendingLevelChoices = null;
  setLevelUpTabVisible(false);
  game.trainerContactLatch = false;
  game.craftingContactLatch = false;
  game.activeCraftingStation = null;
  game.friendlyNpcContactLatches = {};
  game.gvadaContactLatch = false;
  game.juanTaboContactLatch = false;
  game.lordYantosContactLatch = false;
  game.lordRaufContactLatch = false;
  game.pleezixContactLatch = false;
  game.sharleneContactLatch = false;
  game.mordrenContactLatch = false;
  game.cecilContactLatch = false;
  game.theodoraContactLatch = false;
  game.hereticOswaldoContactLatch = false;
  game.slayleighContactLatch = false;
  game.tailorAntoniaContactLatch = false;
  game.guardContactLatch = false;
  game.bankerContactLatch = false;
  deathScreen.classList.add("hidden");
  levelChoice.classList.add("hidden");
  levelChoice.classList.remove("gold-orbit");
  logPanel?.classList.remove("level-up-active");
  shopWindow.classList.add("hidden");
  bankWindow.classList.add("hidden");
  confirmWindow.classList.add("hidden");
  activePrompt = null;
  devSpawnWindow.classList.add("hidden");
  trainerWindow.classList.add("hidden");
  craftingWindow?.classList.add("hidden");
  spellbookWindow.classList.add("hidden");
  soulCrystalsWindow.classList.add("hidden");
  replaceSpellWindow.classList.add("hidden");
  spellChoice.classList.add("hidden");
  questLogWindow.classList.add("hidden");
  updateChronicleInlineMode();
  dialogueWindow.classList.add("hidden");
  modeChoice.classList.remove("hidden");
  spellHudSignature = "";
  game.pendingSpellAssignment = null;
  if (playerNameInput) playerNameInput.value = "";
  if (multiplayerWorldInput) multiplayerWorldInput.value = "";
  renderMultiplayerWorldList();
  refreshMultiplayerWorldList();
  renderAccountHome();
  renderQuestLog();
  syncPointerPause();
  addLog("Inventory: <b>Wooden Knife</b>.");
  renderUI();
}

function loop(now) {
  const dt = Math.min(0.05, (now - game.last) / 1000);
  game.last = now;
  try {
    if (game.running) {
      updateWanderingNpcs(dt);
      updatePlayer(dt);
      if (game.mode !== "multiplayer") updateEnemies(dt);
      if (game.mode !== "multiplayer") updateProjectiles(dt);
      updateEffects(dt);
      updateGroundItems(dt);
      if (game.mode !== "multiplayer" && shouldSimulateWorld()) {
        updateEliteRespawns(dt);
        updateSpawning(dt);
        sendMultiplayerWorldState();
      }
      updateFloatingTexts(dt);
      updatePlayerSpeech(dt);
      updateNpcSpeech(dt);
      updateMultiplayerLatency();
      sendMultiplayerUpdate();
      if (game.multiplayer.team) renderTeamWindow();
      game.shake = Math.max(0, game.shake - dt);
    }
    closeShopIfPlayerWalkedAway();
  } catch (error) {
    console.error(error);
    if (!game.loopErrorLogged) {
      game.loopErrorLogged = true;
      addLog(`<b>Runtime error:</b> ${escapeHtml(error?.message || String(error))}`);
    }
    if (game.mode === null && modeChoice?.classList.contains("hidden")) modeChoice.classList.remove("hidden");
  }
  try {
    draw();
    renderUI();
  } catch (error) {
    console.error(error);
    if (!game.loopErrorLogged) {
      game.loopErrorLogged = true;
      addLog(`<b>Render error:</b> ${escapeHtml(error?.message || String(error))}`);
    }
    if (game.mode === null && modeChoice?.classList.contains("hidden")) modeChoice.classList.remove("hidden");
  }
  requestAnimationFrame(loop);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  resizeMinimapWindowCanvas();
  updateSpellsWindowLayout();
  for (const id of floatingWindowRegistry.keys()) applyFloatingState(id);
  scheduleFloatingFitContent("window-resize");
  positionEquipmentPopover();
});

function isTextEntryActive() {
  const active = document.activeElement;
  if (!active || active === chatInput) return false;
  if (active.isContentEditable) return true;
  const tag = active.tagName?.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select";
}

function handleWindowHotkey(event) {
  if (event.metaKey || event.ctrlKey || event.altKey) return false;
  const key = event.key.length === 1 ? event.key.toLowerCase() : "";
  const simpleToggle = id => {
    event.preventDefault();
    game.keys.delete(key);
    toggleFloatingWindow(id);
    return true;
  };
  if (key === "c") return simpleToggle("character");
  if (key === "i") return simpleToggle("inventory");
  if (key === "m") return simpleToggle("minimap");
  if (key === "l") return simpleToggle("spells");
  if (key === "e") return simpleToggle("effects");
  if (key === "p") return simpleToggle("pet");
  if (key === "t") return simpleToggle("target");
  if (key === "h") return simpleToggle("chronicle");
  if (key === "o") return simpleToggle("options");
  if (key === "q") {
    event.preventDefault();
    game.keys.delete(key);
    if (questLogWindow.classList.contains("hidden")) openQuestLog();
    else closeQuestLog();
    return true;
  }
  if (key === "b") {
    event.preventDefault();
    game.keys.delete(key);
    if (spellbookWindow.classList.contains("hidden")) openSpellbookWindow();
    else closeSpellbookWindow();
    return true;
  }
  return false;
}

window.addEventListener("keydown", event => {
  if (isTextEntryActive()) {
    game.keys.clear();
    return;
  }
  if (event.key === "Enter") {
    event.preventDefault();
    if (game.chatOpen || document.activeElement === chatInput) submitChatInput();
    else openChatInput();
    return;
  }
  if (game.chatOpen || document.activeElement === chatInput) return;
  if (handleWindowHotkey(event)) return;
  if (event.shiftKey && ["ArrowLeft", "ArrowRight", "a", "A", "d", "D"].includes(event.key)) {
    event.preventDefault();
    window.SoulreaperSpellUI?.cycleSpellLineup?.(event.key === "ArrowLeft" || event.key.toLowerCase() === "a" ? -1 : 1);
    return;
  }
  if (event.key === "Escape" && game.pendingSpellAssignment) {
    game.pendingSpellAssignment = null;
    spellHudSignature = "";
    renderUI();
    addLog("Spell replacement canceled.");
    return;
  }
  if (event.key === "Escape" && game.pendingSpellTarget !== null) {
    game.pendingSpellTarget = null;
    spellHudSignature = "";
    addLog("Spell targeting canceled.");
    return;
  }
  if (event.key === "Escape" && game.pendingPetAttackId !== null) {
    game.pendingPetAttackId = null;
    updatePetTargetCursor();
    hidePetCommandMenu();
    addLog("Pet command canceled.");
    return;
  }
  if (!event.metaKey && !event.ctrlKey && !event.altKey && /^[1-6]$/.test(event.key)) {
    event.preventDefault();
    activateSpellSlot(Number(event.key) - 1);
    return;
  }
  game.keys.add(event.key.length === 1 ? event.key.toLowerCase() : event.key);
});
window.addEventListener("keyup", event => {
  if (game.chatOpen || document.activeElement === chatInput || isTextEntryActive()) {
    game.keys.delete(event.key.length === 1 ? event.key.toLowerCase() : event.key);
    return;
  }
  game.keys.delete(event.key.length === 1 ? event.key.toLowerCase() : event.key);
});

document.addEventListener("pointerover", event => focusTooltipOwner(event.target));
document.addEventListener("focusin", event => focusTooltipOwner(event.target));

document.addEventListener("input", event => {
  if (event.target?.id === "soundVolumeRange") setSoundVolume(Number(event.target.value) / 100);
  if (event.target === createPasswordInput || event.target === createRepeatPasswordInput) setFieldHelp(createPasswordHelp, "");
  if (event.target === playerNameInput) setFieldHelp(characterNameHelp, "");
});

function handleChatItemLinkClick(event) {
  if (game.chatOpen || document.activeElement === chatInput) {
    const item = itemFromClickedElement(event.target);
    if (item && insertChatItemLink(item)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
  }
}

document.addEventListener("click", handleChatItemLinkClick, true);

document.addEventListener("click", event => {
  const targetAction = event.target?.closest?.("[data-target-action]");
  if (targetAction) {
    const peer = selectedTargetUnit();
    if (!peer || targetKindForUnit(peer) !== "peer") return;
    const action = targetAction.dataset.targetAction;
    if (action === "invite") sendTeamAction("invite", { playerName: peer.name || "" });
    else if (action === "inspect") inspectPeer(peer);
    else if (action === "trade") tradeWithPeer(peer);
    else if (action === "follow") toggleFollowPeer(peer);
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  if (event.target?.closest?.("#logoutButton")) {
    event.preventDefault();
    event.stopPropagation();
    logOffCharacterToAccount();
    return;
  }
  if (event.target?.closest?.("#accountLogoutButton")) {
    logoutAccount();
  }
});

chatInput.addEventListener("keydown", event => {
  event.stopPropagation();
  if (event.key === "Enter") {
    event.preventDefault();
    submitChatInput();
  } else if (event.key === "Escape") {
    event.preventDefault();
    chatInput.value = "";
    chatInput.classList.add("hidden");
    game.chatOpen = false;
  }
});

chatChannelSelect?.addEventListener("change", () => {
  game.chatChannel = chatChannelSelect.value || "say";
  syncChatChannelSelect();
  chatChannelSelect.blur();
  canvas.focus?.();
});

teamInvitePopup.addEventListener("click", event => {
  const button = event.target.closest("[data-team-invite]");
  if (!button || !game.multiplayer.pendingTeamInvite) return;
  const inviterId = game.multiplayer.pendingTeamInvite.inviterId;
  sendTeamAction(button.dataset.teamInvite === "accept" ? "accept" : "reject", { inviterId });
  hideTeamInvite();
});

teamWindow.addEventListener("click", event => {
  const button = event.target.closest("[data-team-target]");
  if (!button) return;
  const member = game.multiplayer.team?.members?.find(candidate => candidate.id === button.dataset.teamTarget);
  const target = game.multiplayer.peers.get(button.dataset.teamTarget);
  if (!target) {
    if (game.pendingSpellTarget !== null) addLog(`<b>${escapeHtml(member?.name || "Teammate")}</b> is not targetable right now.`);
    return;
  }
  if (game.pendingSpellTarget === null) {
    setSelectedTarget(target);
    addLog(`<b>${escapeHtml(target.name || member?.name || "Teammate")}</b> selected.`);
    return;
  }
  const spell = game.player.spells[game.pendingSpellTarget];
  game.pendingSpellTarget = null;
  setSelectedTarget(target);
  castSelectedSpellOnTarget(spell, target);
});

teamWindow.querySelector(".team-window-header")?.addEventListener("pointerdown", event => {
  if (event.button !== 0) return;
  const rect = teamWindow.getBoundingClientRect();
  game.multiplayer.teamDragging = {
    dx: event.clientX - rect.left,
    dy: event.clientY - rect.top
  };
  teamWindow.setPointerCapture?.(event.pointerId);
  event.preventDefault();
});

teamWindow.addEventListener("pointermove", event => {
  const drag = game.multiplayer.teamDragging;
  if (!drag) return;
  game.multiplayer.teamWindowX = Math.max(0, Math.min(window.innerWidth - teamWindow.offsetWidth, event.clientX - drag.dx));
  game.multiplayer.teamWindowY = Math.max(0, Math.min(window.innerHeight - teamWindow.offsetHeight, event.clientY - drag.dy));
  renderTeamWindow();
});

teamWindow.addEventListener("pointerup", event => {
  if (!game.multiplayer.teamDragging) return;
  game.multiplayer.teamDragging = null;
  teamWindow.releasePointerCapture?.(event.pointerId);
});

chronicleTab?.addEventListener("click", () => {
  game.logView = "chronicle";
  renderChronicle();
});

chatLogTab?.addEventListener("click", () => {
  game.logView = "chat";
  renderChronicle();
});

equipmentHover.addEventListener("mouseenter", positionEquipmentPopover);
equipmentHover.addEventListener("focusin", positionEquipmentPopover);

arenaWrap.addEventListener("mouseenter", () => {
  game.pointerInArena = true;
  syncPointerPause();
});

arenaWrap.addEventListener("mouseleave", () => {
  game.pointerInArena = false;
  syncPointerPause();
});

canvas.addEventListener("pointerdown", handleArenaClick);
canvas.addEventListener("pointermove", event => {
  const rect = canvas.getBoundingClientRect();
  const camera = getCamera(rect);
  game.mouseWorld = {
    x: event.clientX - rect.left + camera.x,
    y: event.clientY - rect.top + camera.y
  };
});

spellHudEl.addEventListener("click", event => {
  const button = event.target.closest("[data-active-spell-index]");
  const unlockSlot = event.target.closest("[data-trainer-unlock-slot]");
  if (game.activeTrainer && unlockSlot) {
    event.preventDefault();
    event.stopPropagation();
    unlockTrainerSpellSlot();
    unlockSlot.blur();
    return;
  }
  if (game.pendingSpellAssignment && button) {
    event.preventDefault();
    event.stopPropagation();
    const spell = game.player.spells[Number(button.dataset.activeSpellIndex)];
    if (!spell?.passive) replaceActiveSpell(Number(button.dataset.activeSpellIndex));
    button.blur();
    return;
  }
  const toggle = event.target.closest("[data-toggle-autocast]");
  if (toggle) {
    event.stopPropagation();
    const spell = game.player.spells[Number(toggle.dataset.toggleAutocast)];
    if (!spell) return;
    spell.autocast = !spell.autocast;
    spellHudSignature = "";
    renderUI();
    addLog(`<b>${spell.name}</b> autocast ${spell.autocast ? "enabled" : "disabled"}.`);
    return;
  }
  if (!button) return;
  if (event.detail >= 2) {
    const spell = game.player.spells[Number(button.dataset.activeSpellIndex)];
    const mode = spellTargetMode(spell);
    if (mode === "friendly-player" || mode === "friendly-unit") {
      event.preventDefault();
      event.stopPropagation();
      game.pendingSpellTarget = null;
      castSelectedSpellOnTarget(spell, game.player);
      button.blur();
      return;
    }
  }
  if (game.activeTrainer) {
    event.preventDefault();
    event.stopPropagation();
    trainActiveSpell(Number(button.dataset.activeSpellIndex));
    button.blur();
    return;
  }
  const spell = game.player.spells[Number(button.dataset.activeSpellIndex)];
  if (!spell?.passive) selectTargetedSpell(Number(button.dataset.activeSpellIndex));
  button.blur();
});

document.addEventListener("click", event => {
  if (!game.pendingSpellAssignment) return;
  if (performance.now() - (game.pendingSpellAssignmentArmedAt || 0) < 80) return;
  if (event.target.closest("[data-active-spell-index]")) return;
  game.pendingSpellAssignment = null;
  game.pendingSpellAssignmentArmedAt = 0;
  spellHudSignature = "";
  renderUI();
  renderSpellbookWindow();
});

modeChoice.addEventListener("click", event => {
  const refreshWorldsButton = event.target.closest("#refreshMultiplayerWorldsButton");
  if (refreshWorldsButton) {
    refreshMultiplayerWorldList();
    return;
  }
  const worldButton = event.target.closest("[data-world-name]");
  if (worldButton) {
    game.multiplayer.selectedWorldName = worldButton.dataset.worldName || "";
    renderMultiplayerWorldList();
    renderAccountHome();
    return;
  }
  const characterButton = event.target.closest("[data-character-id]");
  if (characterButton) {
    game.account.selectedCharacterId = characterButton.dataset.characterId || "";
    game.account.creatingCharacter = false;
    renderAccountHome();
    return;
  }
  if (event.target.closest("[data-create-character-toggle]")) {
    game.account.creatingCharacter = true;
    game.account.selectedCharacterId = "";
    renderAccountHome();
    playerNameInput?.focus();
    return;
  }
  const raceButton = event.target.closest("[data-race-choice]");
  if (raceButton) {
    game.account.race = raceButton.dataset.raceChoice || "human";
    game.player.avatar = avatarForRaceSex(game.account.race, game.account.sex);
    renderAccountHome();
    return;
  }
  if (event.target.closest("[data-sex-toggle]")) {
    game.account.sex = game.account.sex === "female" ? "male" : "female";
    game.player.avatar = avatarForRaceSex(game.account.race, game.account.sex);
    renderAccountHome();
    return;
  }
  if (event.target.closest("[data-delete-character]")) {
    deleteSelectedCharacter();
    return;
  }
  const multiplayerButton = event.target.closest("[data-multiplayer-action]");
  if (multiplayerButton) {
    const character = selectedAccountCharacter();
    if (!character) {
      game.account.message = "Choose or create a character first.";
      renderAccountHome();
      return;
    }
    const action = multiplayerButton.dataset.multiplayerAction;
    const worldName = action === "resume"
      ? (character.lastWorld || "").trim()
      : action === "create"
        ? randomDarkFantasyWorldName()
        : (game.multiplayer.selectedWorldName || "").trim();
    if (!worldName) {
      game.account.message = action === "create"
        ? "Could not create a world name."
        : action === "resume"
          ? "That character has no active world to resume."
          : "Select an existing world first.";
      renderAccountHome();
      return;
    }
    connectMultiplayer(worldName, action);
    return;
  }
});

loginForm?.addEventListener("submit", event => {
  event.preventDefault();
  createAccountFromForm(loginForm);
});

createAccountForm?.addEventListener("submit", event => {
  event.preventDefault();
  createAccountFromForm(createAccountForm);
});

createCharacterForm?.addEventListener("submit", event => {
  event.preventDefault();
  createCharacterFromForm();
});

starterSpellsEl.addEventListener("click", event => {
  event.preventDefault();
  const button = event.target.closest("[data-spell]");
  if (!button) return;
  const spell = startingSpellChoices()[Number(button.dataset.spell)];
  if (!spell) return;
  const learned = makePlayerSpell(spell.name);
  if (!learned) return;
  game.mode = "singleplayer";
  game.loopErrorLogged = false;
  game.player.name = (playerNameInput?.value || "").trim() || game.player.name || "Soulreaper";
  game.player.learnedSpells ||= [];
  if (!game.player.learnedSpells.includes(learned.name)) game.player.learnedSpells.push(learned.name);
  game.player.spells = [learned];
  saveSpellLevel(learned);
  applyPlayerStartFromMap();
  applyRaceStartFromMap({ onlyIfAtDefault: true });
  modeChoice.classList.add("hidden");
  spellChoice.classList.add("hidden");
  applyFloatingState("bar");
  game.running = true;
  game.pointerInArena = true;
  spellHudSignature = "";
  addLog(`<b>${escapeHtml(game.player.name)}</b> begins with <b>${escapeHtml(learned.name)}</b>.`);
  renderUI();
  syncPointerPause();
});

levelOptions.addEventListener("click", event => {
  const button = event.target.closest("[data-stat]");
  const spellButton = event.target.closest("[data-spell-index]");
  if (button && !button.disabled) increaseStat(button.dataset.stat);
  if (spellButton && !spellButton.disabled) increaseSpell(Number(spellButton.dataset.spellIndex));
  updatePointerFromEvent(event);
  syncPointerPause();
});

bindInventoryUIEvents();

closeDevSpawnButton.addEventListener("click", closeDevSpawnWindow);
closeTrainerButton.addEventListener("click", closeTrainer);
closeCraftingButton?.addEventListener("click", closeCraftingWindow);
craftingUsableOnlyToggle?.addEventListener("change", event => {
  game.craftingUsableOnly = Boolean(event.target.checked);
  renderCraftingWindow();
});

craftingList?.addEventListener("click", event => {
  const button = event.target.closest("[data-craft-recipe]");
  if (!button || button.disabled) return;
  const recipes = recipesForStation(game.activeCraftingStation);
  craftRecipe(recipes[Number(button.dataset.craftRecipe)]);
});

devSpawnList.addEventListener("click", event => {
  const button = event.target.closest("[data-spawn-template]");
  if (!button) return;
  spawnDevMob(button.dataset.spawnTemplate);
});

trainerSpellList.addEventListener("click", event => {
  const unlockButton = event.target.closest("[data-unlock-spell-slot]");
  if (unlockButton && !unlockButton.disabled) {
    unlockTrainerSpellSlot();
    return;
  }
  const button = event.target.closest("[data-train-spell-name], [data-train-spell-index]");
  if (!button || button.disabled) return;
  trainActiveSpell(button.dataset.trainSpellName || Number(button.dataset.trainSpellIndex));
});

openSpellbookButton.addEventListener("click", openSpellbookWindow);
openSpellLineupsButton.addEventListener("click", openSpellLineupsWindow);
closeSpellbookButton?.addEventListener("click", closeSpellbookWindow);
openSoulCrystalsButton.addEventListener("click", openSoulCrystalsWindow);
closeSoulCrystalsButton.addEventListener("click", closeSoulCrystalsWindow);
skillsTabs?.addEventListener("click", event => {
  const button = event.target.closest("[data-skills-tab]");
  if (!button) return;
  const tab = button.dataset.skillsTab || "Realms";
  game.skillsTab = tab === "Crafting" || tab === "Factions" ? tab : "Realms";
  if (game.skillsTab === "Realms") game.realmTabAlert = false;
  renderSoulCrystalsWindow();
});

openQuestLogButton.addEventListener("click", openQuestLog);
closeQuestLogButton?.addEventListener("click", closeQuestLog);

dialogueNextButton.addEventListener("click", () => {
  if (game.dialoguePageIndex < game.dialoguePages.length - 1) {
    game.dialoguePageIndex += 1;
    renderDialoguePage();
  } else {
    closeDialogue();
  }
});
dialogueText.addEventListener("click", event => {
  const button = event.target.closest("[data-dialogue-choice]");
  if (!button) return;
  const choice = button.dataset.dialogueChoice;
  if (!choice) return;
  if (game.pendingStarterQuestNpc === "sybil") startSybilStarterQuest?.(choice);
  else if (game.pendingStarterQuestNpc === "gvada") startGvadaStarterQuest?.(choice);
  game.pendingStarterQuestNpc = null;
});
closeDialogueButton.addEventListener("click", closeDialogue);

goldReadout?.closest(".sheet-gold")?.addEventListener("click", event => {
  event.preventDefault();
  dropPlayerGoldPrompt();
});

confirmAcceptButton?.addEventListener("click", () => {
  if (!activePrompt) return;
  closeConfirmPrompt(activePrompt.input ? confirmInput.value : true);
});

confirmCancelButton?.addEventListener("click", () => closeConfirmPrompt(null));

confirmOptions?.addEventListener("click", event => {
  const button = event.target.closest("[data-confirm-option]");
  if (!button) return;
  closeConfirmPrompt(button.dataset.confirmOption || "");
});

confirmInput?.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    event.preventDefault();
    closeConfirmPrompt(confirmInput.value);
  } else if (event.key === "Escape") {
    event.preventDefault();
    closeConfirmPrompt(null);
  }
});

bankGoldButton?.addEventListener("click", transferGoldToBankPrompt);
closeBankButton?.addEventListener("click", closeBank);

tradeInventory?.addEventListener("click", event => {
  const button = event.target.closest("[data-trade-inventory-slot]");
  if (!button || !game.multiplayer.trade) return;
  const slot = Number(button.dataset.tradeInventorySlot);
  if (!Number.isInteger(slot)) return;
  if (game.multiplayer.tradeSelectedSlots.has(slot)) game.multiplayer.tradeSelectedSlots.delete(slot);
  else game.multiplayer.tradeSelectedSlots.add(slot);
  sendCurrentTradeOffer(false);
  renderTradeWindow();
});

tradeYourOffer?.addEventListener("click", event => {
  const button = event.target.closest("[data-trade-remove-slot]");
  if (!button || !game.multiplayer.trade) return;
  game.multiplayer.tradeSelectedSlots.delete(Number(button.dataset.tradeRemoveSlot));
  sendCurrentTradeOffer(false);
  renderTradeWindow();
});

tradeGoldInput?.addEventListener("input", () => {
  if (!game.multiplayer.trade) return;
  game.multiplayer.tradeGold = Math.max(0, Math.min(game.player.gold, Math.floor(Number(tradeGoldInput.value) || 0)));
  sendCurrentTradeOffer(false);
});

tradeConfirmButton?.addEventListener("click", () => {
  if (!game.multiplayer.trade) return;
  sendCurrentTradeOffer(true);
});

tradeCancelButton?.addEventListener("click", () => {
  if (game.multiplayer.trade) sendTradeAction("cancel");
  closeTradeWindow();
});

tradeRejectButton?.addEventListener("click", () => {
  if (game.multiplayer.trade) sendTradeAction("reject");
  closeTradeWindow();
});

questList.addEventListener("mouseover", event => {
  const item = event.target.closest("[data-quest-id]");
  if (!item) return;
  positionQuestTooltip?.(item);
  markQuestHovered(item.dataset.questId);
});

questList.addEventListener("focusin", event => {
  const item = event.target.closest("[data-quest-id]");
  if (!item) return;
  positionQuestTooltip?.(item);
  markQuestHovered(item.dataset.questId);
});

questList.addEventListener("mouseout", event => {
  const item = event.target.closest("[data-quest-id]");
  if (!item) return;
  const next = event.relatedTarget;
  if (next?.closest?.(`[data-quest-id="${CSS.escape(item.dataset.questId || "")}"]`) || next?.closest?.(".quest-floating-tooltip")) return;
  hideQuestTooltip?.();
});

questList.addEventListener("focusout", event => {
  const item = event.target.closest("[data-quest-id]");
  if (!item) return;
  const next = event.relatedTarget;
  if (next?.closest?.(`[data-quest-id="${CSS.escape(item.dataset.questId || "")}"]`) || next?.closest?.(".quest-floating-tooltip")) return;
  hideQuestTooltip?.();
});

questList.addEventListener("click", event => {
  const abandonButton = event.target.closest("[data-abandon-quest]");
  if (abandonButton) {
    event.preventDefault();
    event.stopPropagation();
    abandonQuest?.(abandonButton.dataset.abandonQuest);
    return;
  }
  const rewardButton = event.target.closest("[data-preview-reward]");
  if (rewardButton) {
    event.preventDefault();
    event.stopPropagation();
    showRewardItemPreview(rewardButton.dataset.previewReward, event);
  }
});

document.addEventListener("click", event => {
  const tooltip = event.target.closest(".quest-floating-tooltip");
  if (!tooltip) return;
  const abandonButton = event.target.closest("[data-abandon-quest]");
  if (abandonButton) {
    event.preventDefault();
    event.stopPropagation();
    abandonQuest?.(abandonButton.dataset.abandonQuest);
    hideQuestTooltip?.();
    return;
  }
  const rewardButton = event.target.closest("[data-preview-reward]");
  if (rewardButton) {
    event.preventDefault();
    event.stopPropagation();
    showRewardItemPreview(rewardButton.dataset.previewReward, event);
  }
});

document.addEventListener("mouseout", event => {
  const tooltip = event.target.closest(".quest-floating-tooltip");
  if (!tooltip) return;
  const questId = tooltip.dataset.questId || "";
  const next = event.relatedTarget;
  if (questId && next?.closest?.(`[data-quest-id="${CSS.escape(questId)}"]`)) return;
  if (next?.closest?.(".quest-floating-tooltip")) return;
  hideQuestTooltip?.();
});

spellbookRealmTabs.addEventListener("click", event => {
  const button = event.target.closest("[data-realm-tab]");
  if (!button) return;
  game.spellbookTab = button.dataset.realmTab;
  renderSpellbookWindow();
});

spellbookSpellList.addEventListener("click", event => {
  const saveButton = event.target.closest("[data-save-spell-lineup]");
  if (saveButton) {
    window.SoulreaperSpellUI?.saveSpellLineup?.(Number(saveButton.dataset.saveSpellLineup));
    return;
  }
  const deleteButton = event.target.closest("[data-delete-spell-lineup]");
  if (deleteButton) {
    window.SoulreaperSpellUI?.deleteSpellLineup?.(Number(deleteButton.dataset.deleteSpellLineup));
    return;
  }
  const applyButton = event.target.closest("[data-apply-spell-lineup]");
  if (applyButton) {
    window.SoulreaperSpellUI?.applySpellLineup?.(Number(applyButton.dataset.applySpellLineup));
    return;
  }
  const lineupCard = event.target.closest("[data-lineup-card]");
  if (lineupCard) {
    window.SoulreaperSpellUI?.applySpellLineup?.(Number(lineupCard.dataset.lineupCard));
    return;
  }
  const button = event.target.closest("[data-learned-spell]");
  if (!button) return;
  assignLearnedSpell(button.dataset.learnedSpell);
});

function positionLearnedSpellTooltip(button) {
  const tooltip = button?.querySelector?.(".spellbook-spell-tooltip");
  if (!tooltip) return;
  const rect = button.getBoundingClientRect();
  const width = Math.min(320, Math.max(220, window.innerWidth - 24));
  spellbookFloatingTooltip.innerHTML = tooltip.innerHTML;
  spellbookFloatingTooltip.style.width = `${width}px`;
  spellbookFloatingTooltip.classList.remove("hidden");
  let left = rect.right + 10;
  if (left + width > window.innerWidth - 8) left = rect.left - width - 10;
  left = Math.max(8, Math.min(window.innerWidth - width - 8, left));
  let top = Math.max(8, Math.min(window.innerHeight - 120, rect.top));
  spellbookFloatingTooltip.style.left = `${left}px`;
  spellbookFloatingTooltip.style.top = `${top}px`;
  requestAnimationFrame(() => {
    const tooltipRect = spellbookFloatingTooltip.getBoundingClientRect();
    if (tooltipRect.bottom <= window.innerHeight - 8) return;
    top = Math.max(8, window.innerHeight - tooltipRect.height - 8);
    spellbookFloatingTooltip.style.top = `${top}px`;
  });
}

function hideLearnedSpellTooltip() {
  spellbookFloatingTooltip.classList.add("hidden");
  spellbookFloatingTooltip.innerHTML = "";
}
window.hideLearnedSpellTooltip = hideLearnedSpellTooltip;

function positionActiveSpellTooltip(trigger) {
  const tooltip = trigger?.querySelector?.(".spell-tooltip");
  if (!tooltip || !trigger.closest?.("#spellsFloatingWindow")) return;
  const rect = trigger.getBoundingClientRect();
  const width = Math.min(320, Math.max(220, window.innerWidth - 24));
  spellbookFloatingTooltip.innerHTML = tooltip.innerHTML;
  spellbookFloatingTooltip.style.width = `${width}px`;
  spellbookFloatingTooltip.classList.remove("hidden");
  let left = rect.right + 10;
  if (left + width > window.innerWidth - 8) left = rect.left - width - 10;
  left = Math.max(8, Math.min(window.innerWidth - width - 8, left));
  let top = Math.max(8, Math.min(window.innerHeight - 120, rect.top));
  spellbookFloatingTooltip.style.left = `${left}px`;
  spellbookFloatingTooltip.style.top = `${top}px`;
  requestAnimationFrame(() => {
    const tooltipRect = spellbookFloatingTooltip.getBoundingClientRect();
    if (tooltipRect.bottom <= window.innerHeight - 8) return;
    top = Math.max(8, window.innerHeight - tooltipRect.height - 8);
    spellbookFloatingTooltip.style.top = `${top}px`;
  });
}

function hideActiveSpellTooltip() {
  spellbookFloatingTooltip.classList.add("hidden");
  spellbookFloatingTooltip.innerHTML = "";
}

function positionTrainerSpellTooltip(trigger) {
  const tooltip = trigger?.querySelector?.(".trainer-spell-tooltip");
  if (!tooltip || !trigger.closest?.("#trainerWindow, #shopWindow")) return;
  const rect = trigger.getBoundingClientRect();
  const width = Math.min(520, Math.max(280, window.innerWidth - 24));
  spellbookFloatingTooltip.innerHTML = tooltip.innerHTML;
  spellbookFloatingTooltip.style.width = `${width}px`;
  spellbookFloatingTooltip.classList.remove("hidden");
  let left = rect.right + 10;
  if (left + width > window.innerWidth - 8) left = rect.left - width - 10;
  left = Math.max(8, Math.min(window.innerWidth - width - 8, left));
  let top = Math.max(8, Math.min(window.innerHeight - 120, rect.top));
  spellbookFloatingTooltip.style.left = `${left}px`;
  spellbookFloatingTooltip.style.top = `${top}px`;
  requestAnimationFrame(() => {
    const tooltipRect = spellbookFloatingTooltip.getBoundingClientRect();
    if (tooltipRect.bottom <= window.innerHeight - 8) return;
    top = Math.max(8, window.innerHeight - tooltipRect.height - 8);
    spellbookFloatingTooltip.style.top = `${top}px`;
  });
}

function hideTrainerSpellTooltip() {
  spellbookFloatingTooltip.classList.add("hidden");
  spellbookFloatingTooltip.innerHTML = "";
}

spellbookSpellList.addEventListener("mousemove", event => {
  const button = event.target.closest(".learned-spell-icon-button");
  if (button) positionLearnedSpellTooltip(button);
});

spellbookSpellList.addEventListener("focusin", event => {
  const button = event.target.closest(".learned-spell-icon-button");
  if (button) positionLearnedSpellTooltip(button);
});

spellbookSpellList.addEventListener("mouseleave", hideLearnedSpellTooltip);
spellbookSpellList.addEventListener("focusout", event => {
  if (!event.relatedTarget || !spellbookSpellList.contains(event.relatedTarget)) hideLearnedSpellTooltip();
});

function trainerTooltipRootForEvent(event) {
  return event.target.closest?.("#trainerSpellList, #shopInventory");
}

document.addEventListener("mousemove", event => {
  if (!trainerTooltipRootForEvent(event)) return;
  const button = event.target.closest?.(".trainer-spell-icon-button");
  if (button) positionTrainerSpellTooltip(button);
  else hideTrainerSpellTooltip();
});

document.addEventListener("focusin", event => {
  if (!trainerTooltipRootForEvent(event)) return;
  const button = event.target.closest?.(".trainer-spell-icon-button");
  if (button) positionTrainerSpellTooltip(button);
});

document.addEventListener("mouseout", event => {
  const root = trainerTooltipRootForEvent(event);
  if (!root) return;
  if (event.relatedTarget && root.contains(event.relatedTarget)) return;
  hideTrainerSpellTooltip();
});

document.addEventListener("focusout", event => {
  const root = trainerTooltipRootForEvent(event);
  if (!root) return;
  if (event.relatedTarget && root.contains(event.relatedTarget)) return;
  hideTrainerSpellTooltip();
});

spellHudEl.addEventListener("mousemove", event => {
  const trigger = event.target.closest(".spell-pill, .passive-spell-slot");
  if (trigger) positionActiveSpellTooltip(trigger);
});

spellHudEl.addEventListener("focusin", event => {
  const trigger = event.target.closest(".spell-pill, .passive-spell-slot");
  if (trigger) positionActiveSpellTooltip(trigger);
});

spellHudEl.addEventListener("mouseleave", hideActiveSpellTooltip);
spellHudEl.addEventListener("focusout", event => {
  if (!event.relatedTarget || !spellHudEl.contains(event.relatedTarget)) hideActiveSpellTooltip();
});

replaceSpellOptions.addEventListener("click", event => {
  const button = event.target.closest("[data-replace-spell-index]");
  if (!button) return;
  replaceActiveSpell(Number(button.dataset.replaceSpellIndex));
});

document.addEventListener("pointerdown", event => {
  if (
    event.target.closest("#itemActionMenu")
    || event.target.closest("#inventoryGrid")
    || event.target.closest("#shopInventory")
    || event.target.closest("#bankInventory")
    || event.target.closest("#tradeWindow")
    || event.target.closest("#confirmWindow")
  ) return;
  hideItemActionMenu();
  floatingItemTooltip.classList.add("hidden");
});

document.addEventListener("pointermove", positionFloatingItemTooltip);
document.addEventListener("focusin", event => {
  if (event.target?.closest?.(".chat-item-link")) positionFloatingItemTooltip(event);
});
document.addEventListener("focusout", event => {
  if (event.target?.closest?.(".chat-item-link")) floatingItemTooltip.classList.add("hidden");
});

restartButton.addEventListener("click", resetGame);

resizeCanvas();
setupCoreFloatingWindows();
game.map = generateMap();
resetGroundCacheForMap();
applyPlayerStartFromMap();
populateFixedSpawns();
populateFixedElites();
equipStartingClothes();
game.player.inventory[0] = cloneItem("Wooden Knife");
renderStarterChoices();
refreshMultiplayerWorldList();
refreshAccountState();
renderUI();
addLog("Inventory: <b>Wooden Knife</b>. Equipped <b>Linen Shirt</b> and <b>Linen Pants</b>.");
requestAnimationFrame(loop);
