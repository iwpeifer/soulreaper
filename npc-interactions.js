// NPC config, shop setup, and contact interaction helpers for Soulreaper.
(function () {
  const NPC_INTERACTION_ALIGNMENTS = ["Neutral", "Neutral Good", "Good", "Neutral Evil", "Evil"];
  const DEFAULT_NPC_REFUSAL_TEXT = "I have no use for you. Be gone.";
  
  function npcConfigKey(value) {
    return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  
  function npcConfigFor(npcOrId) {
    const id = typeof npcOrId === "string" ? npcOrId : npcOrId?.id;
    const name = typeof npcOrId === "string" ? npcOrId : npcOrId?.name;
    const idKey = npcConfigKey(id);
    const nameKey = npcConfigKey(name);
    return devNpcConfigs.find(config => npcConfigKey(config.id) === idKey)
      || devNpcConfigs.find(config => npcConfigKey(config.name) === nameKey)
      || null;
  }
  
  function npcShopItems(configEntries, fallbackEntries = []) {
    const entries = Array.isArray(configEntries) ? configEntries : fallbackEntries;
    return entries.map(cloneItem).filter(Boolean);
  }
  
  function npcShopInventory(config = npcConfigFor("shopkeeper-billiam")) {
    const shop = config?.shop || {};
    const hasShopConfig = Boolean(config?.shop);
    return {
      inventory: [
        ...npcShopItems(shop.weapons, hasShopConfig ? [] : shopkeeperStartingInventory),
        ...npcShopItems(shop.equipment, []),
        ...npcShopItems(shop.bags, [])
      ],
      bags: [],
      consumables: npcShopItems(shop.consumables, hasShopConfig ? [] : shopkeeperStartingConsumables),
      scrolls: npcShopItems(shop.scrolls, hasShopConfig ? [] : shopkeeperStartingScrolls),
      misc: npcShopItems(shop.misc, [])
    };
  }
  
  function applyNpcShopInventory(shopkeeper, config = npcConfigFor(shopkeeper || "shopkeeper-billiam")) {
    if (!shopkeeper) return shopkeeper;
    const shop = npcShopInventory(config);
    shopkeeper.inventory = shop.inventory;
    shopkeeper.bags = shop.bags;
    shopkeeper.consumables = shop.consumables;
    shopkeeper.scrolls = shop.scrolls;
    shopkeeper.misc = shop.misc;
    return shopkeeper;
  }
  
  function applyConfiguredNpcShopSection(shopkeeper, config, section) {
    if (!shopkeeper || !config?.shop || !Array.isArray(config.shop[section])) return;
    shopkeeper[section] = npcShopItems(config.shop[section], []);
  }
  
  function npcInteractionAlignment(npc) {
    const config = npcConfigFor(npc);
    const alignment = npc?.npcAlignment || npc?.interactionAlignment || config?.alignment || npc?.alignment || "Neutral";
    return NPC_INTERACTION_ALIGNMENTS.includes(alignment) ? alignment : "Neutral";
  }
  
  function npcRefusalText(npc) {
    const config = npcConfigFor(npc);
    return npc?.refusalText || npc?.rejectionText || config?.refusalText || DEFAULT_NPC_REFUSAL_TEXT;
  }

  function normalizeNpcFactionId(value) {
    if (typeof factionId === "function") return factionId(value);
    return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function npcFactionId(npc) {
    const config = npcConfigFor(npc);
    return normalizeNpcFactionId(npc?.faction || config?.faction || "");
  }

  function npcRequiresFactionAlly(npc) {
    const config = npcConfigFor(npc);
    return Boolean(
      npc?.mustBeFactionAlly
      || npc?.requiresFactionAlly
      || npc?.requireFactionAlly
      || config?.mustBeFactionAlly
      || config?.requiresFactionAlly
      || config?.requireFactionAlly
    );
  }

  function npcDialogueContextText(npc, key) {
    const config = npcConfigFor(npc);
    return npc?.[key]
      || npc?.dialogueContexts?.[key]
      || config?.[key]
      || config?.dialogueContexts?.[key]
      || "";
  }

  function npcFactionRefusalText(npc, reason) {
    if (reason === "enemy") {
      return npcDialogueContextText(npc, "factionEnemyText")
        || "Your reputation with my people marks you as an enemy. I will not deal with you.";
    }
    return npcDialogueContextText(npc, "factionNotAllyText")
      || "You have not earned enough standing with my people for this.";
  }

  function npcFactionInteractionBlock(npc) {
    const id = npcFactionId(npc);
    if (!id || typeof playerFactionStatus !== "function") return null;
    const status = playerFactionStatus(id);
    if (status === "Enemy") return { reason: "enemy", text: npcFactionRefusalText(npc, "enemy") };
    if (npcRequiresFactionAlly(npc) && status !== "Ally") {
      return { reason: "not-ally", text: npcFactionRefusalText(npc, "not-ally") };
    }
    return null;
  }
  
  function npcInteractsWithPlayer(npc, alignment = playerAlignment()) {
    if (npcFactionInteractionBlock(npc)) return false;
    switch (npcInteractionAlignment(npc)) {
      case "Neutral Good": return alignment !== "Evil";
      case "Good": return alignment === "Good";
      case "Neutral Evil": return alignment !== "Good";
      case "Evil": return alignment === "Evil";
      case "Neutral":
      default: return true;
    }
  }
  
  function refuseNpcInteraction(npc) {
    const factionBlock = npcFactionInteractionBlock(npc);
    openDialogue(npc?.name || "NPC", factionBlock?.text || npcRefusalText(npc), npc);
  }
  
  function allowNpcInteraction(npc) {
    if (npcInteractsWithPlayer(npc)) return true;
    refuseNpcInteraction(npc);
    return false;
  }
  
  function applyNpcConfig(npc, id) {
    if (!npc) return npc;
    const config = npcConfigFor(id || npc);
    if (!config) return npc;
    const { area, shop, ...overlay } = config;
    Object.assign(npc, overlay);
    if (shop) {
      applyNpcShopInventory(npc, config);
      if (npcConfigKey(config.id) === "huntsman-robb") applyConfiguredNpcShopSection(npc, config, "scrolls");
      if (npcConfigKey(config.id) === "blacksmith-fredward") npc.scrolls = [];
      if (npcConfigKey(config.id) === "chaplain-sonsam") npc.consumables = [];
    }
    if (!npc.refusalText) npc.refusalText = config.refusalText || DEFAULT_NPC_REFUSAL_TEXT;
    return npc;
  }
  
  function applyNpcConfigsToMap(map) {
    if (!map) return map;
    applyNpcConfig(map.gvada, "gvada");
    applyNpcConfig(map.shopkeeper, "shopkeeper-billiam");
    applyNpcConfig(map.huntsmanRobb, "huntsman-robb");
    applyNpcConfig(map.blacksmithFredward, "blacksmith-fredward");
    applyNpcConfig(map.tailorAntonia, "tailor-antonia");
    applyNpcConfig(map.barbarianessSkjoldma, "barbarianess-skjoldma");
    applyNpcConfig(map.chaplainSonsam, "chaplain-sonsam");
    applyNpcConfig(map.highPriestessSierra, "high-priestess-sierra");
    applyNpcConfig(map.alchemistClaristra, "alchemist-claristra");
    applyNpcConfig(map.magisterMaimon, "magister-maimon");
    applyNpcConfig(map.juanTabo, "juan-tabo");
    applyNpcConfig(map.lordYantos, "lord-yantos");
    applyNpcConfig(map.hereticOswaldo, "heretic-oswaldo");
    applyNpcConfig(map.hereticSlayleigh, "heretic-slayleigh");
    applyNpcConfig(map.pleezix, "pleezix");
    applyNpcConfig(map.sharlene, "sharlene");
    applyNpcConfig(map.mordren, "mordren");
    applyNpcConfig(map.cecil, "cecil-paddywagon");
    applyNpcConfig(map.theodora, "theodora");
    if (map.gladeTrainer) applyNpcConfig(map.gladeTrainer, "soulreaper-trainer-dyaria");
    for (const npc of map.configuredNpcs || []) applyNpcConfig(npc);
    for (const npc of map.bumsforkNpcs || []) applyNpcConfig(npc);
    return map;
  }
  
  function npcContactKey(npc) {
    return npc?.id || npc?.name || "";
  }
  
  function handleWhisperspringFriendlyContacts() {
    const contacts = [
      { enemy: namedEnemy("Finnegan"), action: enemy => openShop(enemy) },
      { enemy: namedEnemy("Quigley Thistleberry"), action: () => startQuigleyDialogue() },
      { enemy: namedEnemy("Soulreaper Trainer Bogsley"), action: enemy => openTrainer(enemy) },
      { enemy: namedEnemy("Happie Filmore"), action: () => startHappieDialogue() }
    ];
    for (const { enemy, action } of contacts) {
      if (!enemy) continue;
      const touching = distance(game.player, enemy) <= game.player.radius + enemy.radius + 4;
      const key = npcContactKey(enemy);
      if (touching && key && !game.friendlyNpcContactLatches[key]) {
        game.friendlyNpcContactLatches[key] = true;
        if (!npcInteractsWithPlayer(enemy)) refuseNpcInteraction(enemy);
        else if (protectedFromPlayerEffects(enemy)) action(enemy);
        if (!shopWindow.classList.contains("hidden") || !trainerWindow.classList.contains("hidden") || !dialogueWindow.classList.contains("hidden")) return;
      } else if (!touching) {
        delete game.friendlyNpcContactLatches[key];
      }
    }
  }
  
  function handleGuardContact() {
    const guard = namedEnemy("Guard Dorin");
    if (!guard || enemyHostileToPlayer(guard)) {
      game.guardContactLatch = false;
      return;
    }
    const touching = distance(game.player, guard) <= game.player.radius + guard.radius + 4;
    if (touching && !game.guardContactLatch) {
      game.guardContactLatch = true;
      startGuardDialogue(guard);
    } else if (!touching) {
      game.guardContactLatch = false;
    }
  }

  window.SoulreaperNpcInteractions = {
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
    npcFactionId,
    npcRequiresFactionAlly,
    npcFactionInteractionBlock,
    npcInteractsWithPlayer,
    refuseNpcInteraction,
    allowNpcInteraction,
    applyNpcConfig,
    applyNpcConfigsToMap,
    npcContactKey,
    handleWhisperspringFriendlyContacts,
    handleGuardContact
  };
})();
