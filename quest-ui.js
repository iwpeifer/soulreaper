// Quest log, quest completion, and NPC dialogue helpers for Soulreaper.
(function () {
  function normalizeQuestState() {
    if (!game) return false;
    const beforeActive = Array.isArray(game.quests) ? game.quests.length : 0;
    const beforeCompleted = Array.isArray(game.completedQuests) ? game.completedQuests.length : 0;
    const completed = [];
    const completedIds = new Set();
    for (const id of Array.isArray(game.completedQuests) ? game.completedQuests : []) {
      const cleanId = String(id || "").trim();
      if (!cleanId || completedIds.has(cleanId)) continue;
      completedIds.add(cleanId);
      completed.push(cleanId);
    }
    const active = [];
    const activeIds = new Set();
    for (const quest of Array.isArray(game.quests) ? game.quests : []) {
      const id = String(quest?.id || "").trim();
      if (!id || completedIds.has(id) || activeIds.has(id)) continue;
      activeIds.add(id);
      active.push(quest);
    }
    game.completedQuests = completed;
    game.quests = active;
    return beforeActive !== active.length || beforeCompleted !== completed.length;
  }

  function renderQuestLog() {
    normalizeQuestState();
    const hasQuestUpdate = game.questLogAlert;
    openQuestLogButton.classList.toggle("alert", game.questLogAlert);
    openQuestLogButton.classList.toggle("sparkle", false);
    openQuestLogButton.classList.toggle("gold-orbit", hasQuestUpdate);
    if (hasQuestUpdate && !openQuestLogButton.querySelector(":scope > .attention-spark")) {
      openQuestLogButton.insertAdjacentHTML("afterbegin", `<span class="attention-spark" aria-hidden="true"></span>`);
    } else if (!hasQuestUpdate) {
      openQuestLogButton.querySelector(":scope > .attention-spark")?.remove();
    }
    document.querySelector("[data-window-toggle='questlog']")?.classList.toggle("gold-orbit", hasQuestUpdate);
    if (!questLogWindow || questLogWindow.classList.contains("hidden")) return;
    updateHtmlIfChanged(questList, game.quests.length
      ? game.quests.map(quest => `
        <div class="quest-item${quest.new ? " new gold-orbit" : ""}" data-quest-id="${quest.id}" tabindex="0">
          ${quest.new ? `<span class="attention-spark" aria-hidden="true"></span>` : ""}
          <strong class="quest-title">${escapeHtml(quest.name)}</strong>
          <div class="quest-tooltip">
            <p>${escapeHtml(quest.description)}</p>
            ${questObjectivesHtml(quest)}
            <p>Reward: ${questRewardHtml(quest)}</p>
            <button class="quest-abandon-button" type="button" data-abandon-quest="${escapeHtml(quest.id)}">Abandon Quest</button>
          </div>
        </div>
      `).join("")
      : `<div class="level-note">No active quests.</div>`);
    window.markFloatingFitContentChanged?.("questlog");
  }

  function questObjectivesHtml(quest) {
    const objectives = questObjectivesFor(quest);
    if (!objectives.length) return "";
    const rows = objectives
      .map(objective => {
        const progress = questObjectiveProgress(quest, objective);
        const done = progress.current >= progress.required;
        return `<li class="${done ? "complete" : ""}" style="${done ? "color:#5ee06f;" : ""}">[${progress.current}/${progress.required}] ${escapeHtml(progress.label)}</li>`;
      })
      .join("");
    return rows ? `<ul class="quest-objectives">${rows}</ul>` : "";
  }

  function questObjectivesFor(quest) {
    if (Array.isArray(quest?.objectives) && quest.objectives.length) return quest.objectives;
    const template = quest?.id ? questById(quest.id) : null;
    return Array.isArray(template?.objectives) ? template.objectives : [];
  }

  function questObjectiveProgress(quest, objective) {
    const required = Math.max(1, Math.floor(Number(objective.required ?? objective.count ?? 1) || 1));
    let current = 0;
    if (objective.type === "item") {
      current = inventoryItemCount(objective.item || objective.name || "");
    } else if (objective.type === "kill") {
      current = Number(quest.kills?.[objective.enemy] ?? quest.killCount ?? 0) || 0;
    } else if (objective.type === "phase") {
      current = quest.phase === objective.completePhase ? required : Number(quest.objectiveProgress?.[objective.label] || 0);
    } else if (objective.type === "flag") {
      current = quest[objective.flag] ? required : 0;
    } else if (objective.type === "custom" && objective.key === "white-stag-town-hall") {
      current = whiteStagInTownHall() ? required : 0;
    }
    return {
      current: Math.min(required, Math.max(0, Math.floor(current))),
      required,
      label: objective.label || objective.item || objective.enemy || "Complete"
    };
  }
  
  function questRewardHtml(quest) {
    if (quest.rewardText) return escapeHtml(quest.rewardText);
    const xp = quest.rewardXp ? `${quest.rewardXp} XP` : "";
    const gold = quest.rewardGold ? `${quest.rewardGold} Gold` : "";
    const virtue = quest.rewardVirtue ? `${quest.rewardVirtue > 0 ? "+" : ""}${quest.rewardVirtue} Virtue` : "";
    const realmXpRewards = quest.rewardRealmXp || quest.realmXpRewards || {};
    const realmXp = Object.entries(realmXpRewards)
      .filter(([, amount]) => Number(amount) > 0)
      .map(([realm, amount]) => `${Number(amount)} ${realm} Realm XP`);
    const baseReward = [xp, gold, virtue, ...realmXp].filter(Boolean).join(", ");
    const rewardItemNames = [quest.rewardItem, ...(quest.rewardItems || [])].filter(Boolean);
    const itemRewards = rewardItemNames
      .map(itemName => {
        const item = cloneItem(itemName);
        if (!item) return "";
        return `<button class="quest-reward-item" type="button" data-preview-reward="${escapeHtml(itemName)}">${renderItemContents(item, true)}${itemTooltipHtml(item)}</button>`;
      })
      .filter(Boolean)
      .join(", ");
    return [baseReward, itemRewards].filter(Boolean).join(", ") || "?";
  }
  
  function openQuestLog() {
    game.questLogAlert = false;
    questLogWindow.classList.remove("hidden");
    renderQuestLog();
    syncPointerPause();
  }
  
  function closeQuestLog() {
    questLogWindow.classList.add("hidden");
    syncPointerPause();
  }
  
  function markQuestHovered(id) {
    const quest = game.quests.find(candidate => candidate.id === id);
    if (!quest || !quest.new) return;
    quest.new = false;
    const item = questList.querySelector(`[data-quest-id="${id}"]`);
    item?.classList.remove("new");
    item?.classList.remove("gold-orbit");
  }

  function positionQuestTooltip(item) {
    const tooltip = item?.querySelector?.(".quest-tooltip");
    if (!tooltip) return;
    const rect = item.getBoundingClientRect();
    const width = Math.min(360, Math.max(240, window.innerWidth - 16));
    const left = Math.max(8, rect.left - width - 10);
    const top = Math.max(8, Math.min(rect.top, window.innerHeight - 80));
    tooltip.style.setProperty("--quest-tooltip-width", `${width}px`);
    tooltip.style.setProperty("--quest-tooltip-left", `${left}px`);
    tooltip.style.setProperty("--quest-tooltip-top", `${top}px`);
    requestAnimationFrame(() => {
      const tooltipRect = tooltip.getBoundingClientRect();
      if (tooltipRect.bottom <= window.innerHeight - 8) return;
      const adjustedTop = Math.max(8, window.innerHeight - tooltipRect.height - 8);
      tooltip.style.setProperty("--quest-tooltip-top", `${adjustedTop}px`);
    });
  }

  async function abandonQuest(id) {
    const quest = game.quests.find(candidate => candidate.id === id);
    if (!quest) return false;
    const confirmed = await showConfirmPrompt({
      title: "",
      text: `Are you sure you want to abandon ${quest.name}?`
    });
    if (!confirmed) return false;
    game.quests = game.quests.filter(candidate => candidate?.id !== quest.id);
    if (quest.id === "gvada-starter-magic" && game.player.gvadaStarterMagic?.spellName) {
      game.player.gvadaStarterMagic = { ...game.player.gvadaStarterMagic, phase: "abandoned" };
    }
    game.questLogAlert = false;
    addLog(`Abandoned quest: <b>${quest.name}</b>.`);
    renderQuestLog();
    renderUI();
    return true;
  }
  
  function completeQuest(questOrId) {
    normalizeQuestState();
    const quest = typeof questOrId === "string"
      ? game.quests.find(candidate => candidate.id === questOrId)
      : questOrId;
    if (!quest || game.completedQuests.includes(quest.id)) return false;
    if (quest.rewardXp) grantXP(quest.rewardXp);
    if (quest.rewardGold) {
      game.player.gold += quest.rewardGold;
      spawnFloatingText(game.player, `+${quest.rewardGold} Gold`, "#d9b95f", "rgba(0, 0, 0, 0.82)");
    }
    if (quest.rewardVirtue) adjustVirtue(quest.rewardVirtue);
    const realmXpRewards = quest.rewardRealmXp || quest.realmXpRewards || {};
    for (const [realm, amount] of Object.entries(realmXpRewards)) {
      const numericAmount = Number(amount) || 0;
      if (numericAmount > 0) grantRealmXP(realm, numericAmount);
    }
    const rewardItemNames = questRewardItemNames(quest);
    for (const rewardItemName of rewardItemNames) {
      deliverQuestRewardItem(rewardItemName);
    }
    markUIDirty();
    if (!game.completedQuests.includes(quest.id)) game.completedQuests.push(quest.id);
    game.quests = game.quests.filter(candidate => candidate?.id !== quest.id);
    const virtueText = quest.rewardVirtue ? `, <b>${quest.rewardVirtue > 0 ? "+" : ""}${quest.rewardVirtue} Virtue</b>` : "";
    const rewardParts = [
      quest.rewardXp ? `<b>${quest.rewardXp} XP</b>` : "",
      quest.rewardGold ? `<b>${quest.rewardGold} gold</b>` : "",
      virtueText ? `<b>${quest.rewardVirtue > 0 ? "+" : ""}${quest.rewardVirtue} Virtue</b>` : "",
      ...Object.entries(realmXpRewards)
        .filter(([, amount]) => Number(amount) > 0)
        .map(([realm, amount]) => `<b>${Number(amount)} ${escapeHtml(realm)} Realm XP</b>`),
      rewardItemNames.length ? `<b>${rewardItemNames.join(", ")}</b>` : ""
    ].filter(Boolean);
    addLog(`Quest complete: <b>${quest.name}</b>${rewardParts.length ? `. Gained ${rewardParts.join(", ")}.` : "."}`);
    playLevelUpGong();
    renderQuestLog();
    renderUI();
    return true;
  }

  function receiveQuest(quest) {
    normalizeQuestState();
    if (!quest) return null;
    const existing = game.quests.find(candidate => candidate?.id === quest.id);
    if (existing) return existing;
    if (game.completedQuests.includes(quest.id)) return null;
    game.quests.push(quest);
    game.questLogAlert = true;
    playSoundEffect("receive-quest");
    return quest;
  }
  
  function configuredQuest(base) {
    const override = devQuestConfigs[base.id] || {};
    return { ...base, ...clonePlain(override), id: base.id };
  }

  function questRewardItemNames(quest) {
    return [quest?.rewardItem, ...(Array.isArray(quest?.rewardItems) ? quest.rewardItems : [])]
      .map(name => String(name || "").trim())
      .filter(Boolean);
  }

  function deliverQuestRewardItem(itemOrName) {
    const item = typeof itemOrName === "string" ? cloneItem(itemOrName) : itemOrName;
    const name = typeof itemOrName === "string" ? itemOrName : item?.name;
    if (!item) {
      console.warn(`Missing quest reward item: ${name || itemOrName}`);
      addLog(`Quest reward missing: <b>${escapeHtml(name || "Unknown Item")}</b>.`);
      return false;
    }
    if (addInventoryItem(item)) {
      addLog(`Received <b>${escapeHtml(item.name)}</b>.`);
      return true;
    }
    if (typeof dropQuestRewardItem === "function") {
      dropQuestRewardItem(item);
    } else {
      const point = playerDropPoint();
      dropGroundItem(item, point.x, point.y, 3600);
    }
    addLog(`Inventory full. <b>${escapeHtml(item.name)}</b> was dropped.`);
    return true;
  }

  function setQuestObjectiveProgress(quest, label, current = 1) {
    if (!quest || !label) return false;
    quest.objectiveProgress ||= {};
    const numeric = Math.max(0, Math.floor(Number(current) || 0));
    if (Number(quest.objectiveProgress[label] || 0) === numeric) return false;
    quest.objectiveProgress[label] = numeric;
    quest.new = true;
    game.questLogAlert = true;
    return true;
  }

  function setQuestFlagObjective(quest, flag, value = true) {
    if (!quest || !flag) return false;
    const next = Boolean(value);
    if (Boolean(quest[flag]) === next) return false;
    quest[flag] = next;
    quest.new = true;
    game.questLogAlert = true;
    return true;
  }

  function npcDialogueContext(speaker, key, fallback = "", replacements = {}) {
    const contexts = speaker?.dialogueContexts && typeof speaker.dialogueContexts === "object" ? speaker.dialogueContexts : {};
    let text = contexts[key] ?? speaker?.[key] ?? fallback;
    text = String(text || "");
    for (const [token, value] of Object.entries(replacements)) {
      text = text.replaceAll(`{${token}}`, String(value));
    }
    return text;
  }

  function giveQuestScrollIfNeeded(scrollName, spellName) {
    if (!scrollName) return false;
    if (spellName && game.player.learnedSpells?.includes(spellName)) return false;
    if (inventoryItemCount(scrollName) > 0) return false;
    const scroll = cloneItem(scrollName);
    if (!scroll) return false;
    return deliverQuestRewardItem(scroll);
  }

  function questObjectivesComplete(quest) {
    const objectives = questObjectivesFor(quest);
    if (!objectives.length) return false;
    return objectives.every(objective => {
      const progress = questObjectiveProgress(quest, objective);
      return progress.current >= progress.required;
    });
  }

  function consumeQuestObjectiveItems(quest) {
    let consumed = false;
    for (const objective of questObjectivesFor(quest)) {
      if (objective.type !== "item") continue;
      const itemName = objective.item || objective.name || "";
      const required = Math.max(1, Math.floor(Number(objective.required ?? objective.count ?? 1) || 1));
      if (!itemName || inventoryItemCount(itemName) < required) continue;
      removeInventoryStack(itemName, required);
      consumed = true;
    }
    return consumed;
  }

  function activeQuestById(id) {
    return game.quests.find(candidate => candidate.id === id) || null;
  }

  function questChainIdsForNpc(speaker) {
    const ids = Array.isArray(speaker?.questChain) && speaker.questChain.length
      ? speaker.questChain
      : [speaker?.questId];
    return ids
      .map(id => String(id || "").trim())
      .filter(Boolean);
  }

  function questChainQuestIdForNpc(speaker) {
    const ids = questChainIdsForNpc(speaker);
    if (!ids.length) return null;
    const active = ids.find(id => activeQuestById(id));
    if (active) return active;
    const next = ids.find(id => !game.completedQuests.includes(id));
    return next || null;
  }

  function grantQuestStartItem(itemName) {
    const item = cloneItem(itemName);
    if (!item) return false;
    if (addInventoryItem(item)) {
      addLog(`Received <b>${escapeHtml(item.name)}</b>.`);
      return true;
    }
    dropQuestRewardItem(item);
    return true;
  }

  function questById(id) {
    const factories = {
      "gvada-starter-magic": gvadaQuest,
      "rat-infestation": ratInfestationQuest,
      "pantry-pests": pantryPestsQuest,
      "fen-patrol": fenPatrolQuest,
      "flowers-for-the-grave": flowersForTheGraveQuest,
      "ratkin-menace": ratkinMenaceQuest,
      "investigate-rat-warren": investigateRatWarrenQuest,
      "sharlene-parcel": sharleneParcelQuest,
      "napaea-skull": napaeaSkullQuest,
      "fenhold": fenholdQuest,
      "morganes-reagents": morganesReagentsQuest,
      "remove-goblin-menace": removeGoblinMenaceQuest,
      "war-with-goblins": warWithGoblinsQuest,
      "antidote-for-the-plague": antidoteForThePlagueQuest,
      "more-plague-research": morePlagueResearchQuest,
      "bone-collector": boneCollectorQuest,
      "only-you-can-prevent-forest-fires": onlyYouCanPreventForestFiresQuest,
      "the-glow-of-the-glade": glowOfTheGladeQuest,
      "a-gentle-leash": gentleLeashQuest,
      "thorns-remember": thornsRememberQuest,
      "dust-of-the-hidden-folk": dustOfTheHiddenFolkQuest,
      "roots-that-walk": rootsThatWalkQuest,
      "bone-ritual": boneRitualQuest,
      "first-flame": firstFlameQuest,
      "controlled-burn": controlledBurnQuest,
      "too-close-to-the-fire": tooCloseToTheFireQuest,
      "unholy-dominion": unholyDominionQuest,
      "introduction-to-ether": introductionToEtherQuest,
      "introduction-to-crowd-control": introductionToCrowdControlQuest,
      "introduction-to-celestial-mercy": introductionToCelestialMercyQuest,
      "blessing-of-the-road": blessingOfTheRoadQuest,
      "a-shield-of-faith": aShieldOfFaithQuest,
      "janglebones-in-the-fen": janglebonesInTheFenQuest,
      "introduction-to-weapons-mastery": introductionToWeaponsMasteryQuest,
      "introduction-to-shields": introductionToShieldsQuest,
      "joining-the-gandersguard": joiningTheGandersguardQuest,
      "joining-the-fenguard": joiningTheFenguardQuest,
      "gandersville-raid": gandersvilleRaidQuest,
      "the-white-stag": whiteStagQuest
    };
    if (factories[id]) return factories[id]();
    const config = devQuestConfigs[id];
    return config ? configuredQuest({ ...clonePlain(config), id, name: config.name || id, description: config.description || "" }) : null;
  }

  function questMinimumLevel(quest) {
    const level = Number(quest?.minimumLevel ?? quest?.minLevel ?? quest?.requiredLevel);
    return Number.isFinite(level) && level > 1 ? Math.floor(level) : 1;
  }

  function playerMeetsQuestMinimumLevel(quest) {
    return game.player.level >= questMinimumLevel(quest);
  }

  function questMinimumRealmRequirement(quest) {
    const rawRealm = quest?.minimumRealm || quest?.requiredRealm || quest?.realmRequirement?.realm || "";
    if (!rawRealm) return null;
    const realm = normalizeRealm(rawRealm);
    const level = Number(quest?.minimumRealmLevel ?? quest?.requiredRealmLevel ?? quest?.realmRequirement?.level);
    if (!realm || !Number.isFinite(level) || level < 1) return null;
    return { realm, level: Math.floor(level) };
  }

  function playerMeetsQuestMinimumRealm(quest) {
    const requirement = questMinimumRealmRequirement(quest);
    if (!requirement) return true;
    return (realmProgress(requirement.realm)?.level || 0) >= requirement.level;
  }

  function questMinimumLevelBlockedText(quest, speakerOrOptions = null) {
    const minimumLevel = questMinimumLevel(quest);
    const realmRequirement = questMinimumRealmRequirement(quest);
    const speaker = speakerOrOptions?.npc || speakerOrOptions?.speaker || speakerOrOptions;
    const configuredText = speaker?.questMinimumLevelText
      || speaker?.minimumLevelDialogue
      || speaker?.questLevelRefusalText
      || quest?.minimumLevelText
      || quest?.minimumLevelDialogue
      || quest?.levelRefusalText;
    const text = configuredText
      || (realmRequirement
        ? `Come back when your ${realmRequirement.realm} Realm LVL is ${realmRequirement.level}.`
        : `Come back when you are LVL ${minimumLevel}.`);
    return String(text)
      .replaceAll("{level}", String(minimumLevel))
      .replaceAll("{minLevel}", String(minimumLevel))
      .replaceAll("{playerLevel}", String(game.player.level))
      .replaceAll("{realm}", realmRequirement?.realm || "")
      .replaceAll("{realmLevel}", String(realmRequirement?.level || ""))
      .replaceAll("{playerRealmLevel}", String(realmRequirement ? (realmProgress(realmRequirement.realm)?.level || 0) : ""));
  }

  function receiveQuestIfEligible(quest, speakerOrOptions = null) {
    if (!quest) return { received: false, blockedText: "" };
    if (game.completedQuests.includes(quest.id)) return { received: false, blockedText: "" };
    if (game.quests.some(candidate => candidate?.id === quest.id)) return { received: false, blockedText: "" };
    const minimumLevel = questMinimumLevel(quest);
    if (game.player.level < minimumLevel || !playerMeetsQuestMinimumRealm(quest)) {
      return {
        received: false,
        blockedText: questMinimumLevelBlockedText(quest, speakerOrOptions)
      };
    }
    receiveQuest(quest);
    return { received: true, blockedText: "" };
  }
  
  function gvadaQuest() {
    return configuredQuest({
      id: "gvada-starter-magic",
      name: "Gvada's Lesson",
      description: "Gvada has given you a starter spell scroll. Learn it, practice with it, and return to her after your matching Realm LVL increases.",
      rewardXp: 100,
      rewardGold: 50,
      phase: "choose-spell",
      objectives: [{ type: "phase", completePhase: "return-to-gvada", label: "Realm LVL Gained", required: 1 }],
      new: true
    });
  }
  
  function ratInfestationQuest() {
    return configuredQuest({
      id: "rat-infestation",
      name: "Rat Infestation",
      description: "Prove you've helped Pleezix with the rat problem by bringing him seven rat pelts.",
      rewardXp: 35,
      rewardGold: 20,
      rewardItem: "Rat-Skin Shawl",
      objectives: [{ type: "item", item: "Rat Pelt", label: "Rat Pelts Collected", required: 7 }],
      new: true
    });
  }

  function investigateRatWarrenQuest() {
    return configuredQuest({
      id: "investigate-rat-warren",
      name: "Investigate the Rat Warren",
      description: "Pleezix has heard strange sounds coming from the tunnels. Bring him evidence of what is happening in the Rat Warren.",
      rewardXp: 150,
      rewardGold: 50,
      rewardItem: "Potion of Resist Magic",
      objectives: [{ type: "item", item: "Ratkin Tail", label: "Ratkin Tails Collected", required: 1 }],
      new: true
    });
  }

  function ratkinMenaceQuest() {
    return configuredQuest({
      id: "ratkin-menace",
      name: "Ratkin Menace",
      description: "Pleezix wants you to thin the Ratkin forces by killing Ratkin Turdburglars and Ratkin Warlocks.",
      rewardXp: 300,
      rewardGold: 125,
      rewardItem: "Greater Healing Potion",
      objectives: [
        { type: "kill", enemy: "Ratkin Turdburglar", label: "Ratkin Turdburglars Slain", required: 6 },
        { type: "kill", enemy: "Ratkin Warlock", label: "Ratkin Warlocks Slain", required: 6 }
      ],
      new: true
    });
  }

  function pantryPestsQuest() {
    return configuredQuest({
      id: "pantry-pests",
      name: "Pantry Pests",
      description: "Mira Kettlewick's pantry has been overrun by Giant Rats. Drive them out before they eat everything she has stored.",
      rewardXp: 30,
      rewardGold: 20,
      rewardItem: "Healing Potion",
      objectives: [{ type: "kill", enemy: "Giant Rat", label: "Giant Rats Slain", required: 4 }],
      new: true
    });
  }

  function fenPatrolQuest() {
    return configuredQuest({
      id: "fen-patrol",
      name: "Fen Patrol",
      description: "Sergeant Bram wants the roads near Ganderswood Fen thinned of Goblin Thugs and Goblin Shamans.",
      minimumLevel: 6,
      rewardXp: 140,
      rewardGold: 70,
      rewardItem: "Potion of Resist Magic",
      objectives: [
        { type: "kill", enemy: "Goblin Thug", label: "Goblin Thugs Slain", required: 3 },
        { type: "kill", enemy: "Goblin Shaman", label: "Goblin Shamans Slain", required: 3 }
      ],
      new: true
    });
  }

  function flowersForTheGraveQuest() {
    return configuredQuest({
      id: "flowers-for-the-grave",
      name: "Flowers for the Grave",
      description: "Widow Elowen has asked you to carry Mourning Flowers to her husband's grave in the Ganderswood Fen graveyard.",
      minimumLevel: 8,
      phase: "place-flowers",
      rewardXp: 225,
      rewardGold: 110,
      objectives: [{ type: "phase", completePhase: "flowers-placed", label: "Flowers Placed", required: 1 }],
      new: true
    });
  }
  
  function sharleneParcelQuest() {
    return configuredQuest({
      id: "sharlene-parcel",
      name: "Sharlene's Parcel",
      description: "Sharlene was chased out of Ganderswood Fen by Bog Witch and dropped a parcel she had been meaning to deliver to Bumsfork. She would be very grateful if you would return it to her.",
      rewardXp: 100,
      rewardGold: 25,
      phase: "find-parcel",
      parcelDropped: false,
      firstRewardGranted: false,
      objectives: [{ type: "item", item: "Sharlene's Parcel", label: "Parcel Recovered", required: 1 }],
      new: true
    });
  }
  
  function renderDialoguePage() {
    const pages = game.dialoguePages || [];
    const page = pages[game.dialoguePageIndex] || "";
    if (typeof page === "object" && page.html) {
      dialogueText.innerHTML = page.html;
    } else if (typeof page === "object" && page.choices) {
      const choiceClass = page.choiceLayout === "spell-icons" ? "dialogue-choice-list spell-choice-icons" : "dialogue-choice-list";
      const buttonClass = page.choiceLayout === "spell-icons" ? "dialogue-spell-choice-button" : "choice-card dialogue-choice-button";
      dialogueText.innerHTML = `
        <p>${escapeHtml(page.text || "")}</p>
        <div class="${choiceClass}">
          ${page.choices.map(choice => `
            <button class="${buttonClass}" type="button" data-dialogue-choice="${escapeHtml(choice.value)}" aria-label="${escapeHtml(choice.label)}">
              ${choice.html || `<strong>${escapeHtml(choice.label)}</strong>${choice.description ? `<small>${escapeHtml(choice.description)}</small>` : ""}`}
            </button>
          `).join("")}
        </div>
      `;
    } else {
      dialogueText.textContent = page;
    }
    const hasMore = game.dialoguePageIndex < pages.length - 1;
    dialogueNextButton.classList.toggle("hidden", pages.length <= 1 || Boolean(page?.choices));
    dialogueNextButton.textContent = hasMore ? "Next" : "Done";
  }
  
  function realmNameHtml(realm) {
    const color = realmInfo[realm]?.color || "#f2ede3";
    const shadowClass = realm === "Umbral" ? " shadow-text" : "";
    return `<b class="${shadowClass.trim()}" style="color:${color}">${realm}</b>`;
  }
  
  function dialoguePageText(page) {
    if (typeof page === "object" && page.html) {
      const scratch = document.createElement("div");
      scratch.innerHTML = page.html;
      return scratch.textContent || "";
    }
    if (typeof page === "object" && page.choices) return String(page.text || "");
    return String(page || "");
  }
  
  function dialogueSpeakerCandidates() {
    const candidates = [];
    const addCandidate = candidate => {
      if (!candidate || typeof candidate !== "object" || !candidate.name) return;
      if (!Number.isFinite(Number(candidate.x)) || !Number.isFinite(Number(candidate.y))) return;
      candidates.push(candidate);
    };
    for (const value of Object.values(game.map || {})) {
      if (Array.isArray(value)) value.forEach(addCandidate);
      else addCandidate(value);
    }
    for (const enemy of game.enemies || []) addCandidate(enemy);
    return candidates;
  }

  function dialogueSpeakerByTitle(title) {
    const key = String(title || "").toLowerCase();
    const exactSpeaker = dialogueSpeakerCandidates().find(candidate => String(candidate.name || "").toLowerCase() === key);
    if (exactSpeaker) return exactSpeaker;
    if (key.includes("gvada")) return game.map?.gvada;
    if (key.includes("pleezix")) return game.map?.pleezix;
    if (key.includes("sharlene")) return game.map?.sharlene;
    if (key.includes("mordren")) return game.map?.mordren;
    if (key.includes("cecil")) return game.map?.cecil;
    if (key.includes("theodora")) return game.map?.theodora;
    if (key.includes("quigley")) return namedEnemy("Quigley Thistleberry");
    if (key.includes("happie")) return namedEnemy("Happie Filmore");
    if (key.includes("guard")) return namedEnemy("Guard Dorin");
    return dialogueSpeakerCandidates().find(candidate => key.includes(String(candidate.name || "").toLowerCase())) || null;
  }

  function dialogueSpeakerOverride(speakerOrOptions) {
    const speaker = speakerOrOptions?.speaker || speakerOrOptions;
    if (!speaker || typeof speaker !== "object") return null;
    if (!Number.isFinite(Number(speaker.x)) || !Number.isFinite(Number(speaker.y))) return null;
    return speaker;
  }

  function dialoguePageNeedsWindow(page) {
    return Boolean(page && typeof page === "object" && page.choices);
  }

  function dialogueNeedsWindow(pages, speakerOrOptions = null) {
    if (speakerOrOptions?.forceWindow || speakerOrOptions?.forceModal) return true;
    return pages.some(dialoguePageNeedsWindow);
  }

  function openDialogue(title, pages, speakerOrOptions = null) {
    const speakerOverride = dialogueSpeakerOverride(speakerOrOptions);
    const speaker = speakerOverride || dialogueSpeakerByTitle(title);
    if (speakerOverride && speakerOverride.name && !title) title = speakerOverride.name;
    title = title || "NPC";
    game.dialoguePages = Array.isArray(pages) ? pages : [pages];
    game.dialoguePageIndex = 0;
    const shouldOpenWindow = dialogueNeedsWindow(game.dialoguePages, speakerOrOptions);
    const spokenTexts = [];
    for (const page of game.dialoguePages) {
      const text = dialoguePageText(page).trim();
      if (!text) continue;
      spokenTexts.push(text);
    }
    const joinedText = spokenTexts.join(" ");
    if (speaker && joinedText) {
      const existing = game.npcSpeech.find(entry => entry.speaker === speaker);
      if (existing?.text === joinedText && existing.age < existing.duration * 0.85) return;
    }
    for (const text of spokenTexts) {
      addChatLog(`<b>${escapeHtml(title)}:</b> ${escapeHtml(text)}`);
    }
    if (speaker && joinedText) addNpcSpeech(speaker, joinedText);
    if (!shouldOpenWindow) {
      dialogueWindow.classList.add("hidden");
      game.dialoguePages = [];
      game.dialoguePageIndex = 0;
      dialogueNextButton.classList.add("hidden");
      syncPointerPause();
      return;
    }
    dialogueTitle.textContent = title;
    renderDialoguePage();
    dialogueWindow.classList.remove("hidden");
    syncPointerPause();
  }

  const gvadaStarterChoices = [
    { spell: "Rage", scroll: "Scroll of Rage" },
    { spell: "Magic Missile", scroll: "Scroll of Magic Missile" },
    { spell: "Fireball", scroll: "Scroll of Fireball" },
    { spell: "Basic Prayer", scroll: "Scroll of Basic Prayer" },
    { spell: "Curse of Disdain", scroll: "Scroll of Curse of Disdain" },
    { spell: "Tangle Vine", scroll: "Scroll of Tangle Vine" }
  ];

  const gvadaTrainerHints = {
    Mortal: "Barbarianess Skjoldma in the Gandersville Barracks can train Mortal spells.",
    Ethereal: "Magister Maimon in the Mage Guild can train Ethereal spells.",
    Infernal: "Heretic Slayleigh in The Ganderswood can train Infernal spells.",
    Celestial: "High Priestess Sierra in Gandersville can train Celestial spells.",
    Umbral: "Heretic Slayleigh in The Ganderswood can train Umbral spells.",
    Sylvan: "Juan Tabo in Gandersville Town Hall can train Sylvan spells."
  };

  function gvadaQuestByPlayer() {
    return game.quests.find(candidate => candidate.id === "gvada-starter-magic");
  }

  function gvadaStarterChoiceBySpell(spellName) {
    return gvadaStarterChoices.find(choice => choice.spell === spellName) || null;
  }

  function gvadaStarterRealm(spellName) {
    return makeSpell(spellName)?.realm || "Mortal";
  }

  function gvadaQuestDescription(realm, targetLevel, phase = "practice-spell") {
    if (phase === "return-to-gvada") {
      return `Your ${realm} Realm LVL has increased. Return to Gvada for further guidance.`;
    }
    return `Practice with your starter spell until your ${realm} Realm LVL increases, then return to Gvada.`;
  }

  function giveGvadaStarterScroll(choice) {
    const item = cloneItem(choice.scroll);
    if (!item) return false;
    if (addInventoryItem(item)) {
      addLog(`Gvada gave you <b>${choice.scroll}</b>.`);
      return true;
    }
    const point = playerDropPoint();
    dropGroundItem(item, point.x, point.y);
    addLog(`Inventory full. <b>${choice.scroll}</b> was dropped.`);
    return true;
  }

  function startGvadaStarterQuest(spellName, options = {}) {
    const giveScroll = options.giveScroll !== false;
    const gvada = game.map?.gvada;
    const choice = gvadaStarterChoiceBySpell(spellName);
    if (!choice) return;
    const realm = gvadaStarterRealm(spellName);
    const progress = realmProgress(realm);
    const targetLevel = (progress.level || 0) + 1;
    if (giveScroll) giveGvadaStarterScroll(choice);
    let quest = gvadaQuestByPlayer();
    if (!quest) {
      quest = gvadaQuest();
      receiveQuest(quest);
    }
    quest.phase = "practice-spell";
    quest.starterSpell = spellName;
    quest.starterRealm = realm;
    quest.targetRealmLevel = targetLevel;
    quest.description = gvadaQuestDescription(realm, targetLevel);
    quest.new = true;
    game.player.gvadaStarterMagic = { spellName, realm, targetRealmLevel: targetLevel, phase: "practice-spell" };
    game.realmTabAlert = true;
    game.questLogAlert = true;
    if (gvada) gvada.spoken = true;
    openDialogue("Gvada", [
      `${choice.scroll.replace("Scroll of ", "")}. Good. You will need magic if you intend to survive in a world that keeps sharpening its teeth.`,
      gvadaTrainerHints[realm] || "There are trainers nearby who can help you strengthen that Realm.",
      `Learn the scroll from your inventory, practice the spell, and come back after your ${realm} Realm LVL increases.`
    ], gvada);
    renderQuestLog();
    markUIDirty();
  }

  function openGvadaStarterChoice() {
    const choices = gvadaStarterChoices.map(choice => {
      const spell = makeSpell(choice.spell);
      const realm = spell?.realm || "Mortal";
      const realmColor = realmInfo[realm]?.color || realmInfo.Mortal.color;
      const shadowClass = realm === "Umbral" ? " shadow-text" : "";
      return {
        value: choice.spell,
        label: choice.spell,
        html: `
          <span class="spell-choice-icon-frame" style="--spell-realm-color:${realmUiColor(realm)}">
            ${spellIconHtml(spell, "spell-choice-icon")}
          </span>
          <div class="spell-tooltip dialogue-spell-tooltip">
            <strong>${escapeHtml(spell.name)}</strong>
            <span>Realm <b class="${shadowClass.trim()}" style="color:${realmColor}">${escapeHtml(realm)}</b></span>
            <span>LVL <b>${spellLevel(spell)}</b></span>
            <span>Cooldown <b>${spell.cooldown ? `${formatNumber(spell.cooldown)}s` : "Passive"}</b></span>
            <p>${escapeHtml(spellDescription(spell))}</p>
          </div>
        `
      };
    });
    openDialogue("Gvada", {
      text: "This world is dangerous, soulreaper. You are going to need to learn some magic if you mean to survive it. Choose one scroll, and choose carefully enough.",
      choices,
      choiceLayout: "spell-icons"
    }, game.map?.gvada);
  }
  
  function closeDialogue() {
    dialogueWindow.classList.add("hidden");
    game.dialoguePages = [];
    game.dialoguePageIndex = 0;
    dialogueNextButton.classList.add("hidden");
    syncPointerPause();
  }
  
  function napaeaSkullQuest() {
    return configuredQuest({
      id: "napaea-skull",
      name: "Napaea's Skull",
      description: "Mordren wants you to kill Napaea in Ganderswood Glade and bring back her skull.",
      rewardXp: 100,
      rewardVirtue: -25,
      rewardItem: "Onyx Bracelet",
      skullDropped: false,
      objectives: [{ type: "item", item: "Napaea's Skull", label: "Napaea's Skull Collected", required: 1 }],
      new: true
    });
  }

  function fenholdQuest() {
    return configuredQuest({
      id: "fenhold",
      name: "Fenhold",
      description: "Mordren says his mistress Morgane in Fenhold Keep will be pleased to know Napaea's life has been snuffed out. Speak with Necromancer Morgane in Fenhold Keep.",
      objectives: [{ type: "phase", completePhase: "complete", label: "Necromancer Morgane Contacted", required: 1 }],
      new: true
    });
  }

  function morganesReagentsQuest() {
    return configuredQuest({
      id: "morganes-reagents",
      name: "Morgane's Reagents",
      description: "Necromancer Morgane needs magical reagents from the ancient forest temple of Whisperspring: a Dryad Horn, a Vial of Naiad Water, and a Nymph Floret.",
      rewardXp: 300,
      rewardGold: 100,
      rewardRealmXp: {
        Umbral: 300
      },
      objectives: [
        { type: "item", item: "Dryad Horn", label: "Dryad Horns Collected", required: 1 },
        { type: "item", item: "Vial of Naiad Water", label: "Vials of Naiad Water Collected", required: 1 },
        { type: "item", item: "Nymph Floret", label: "Nymph Florets Collected", required: 1 }
      ],
      new: true
    });
  }
  
  function removeGoblinMenaceQuest() {
    return configuredQuest({
      id: "remove-goblin-menace",
      name: "Remove the Goblin Menace",
      description: "Quigley Thistleberry has asked you to defeat Mukluk the Deceiver and bring back proof that the goblins no longer hold the eastern ruins of Whisperspring.",
      rewardXp: 500,
      rewardGold: 100,
      rewardItem: "Tabard of Whisperspring",
      objectives: [{ type: "item", item: "Bloody Emblem", label: "Proof of Mukluk's Defeat Collected", required: 1 }],
      new: true
    });
  }
  
  function warWithGoblinsQuest() {
    return configuredQuest({
      id: "war-with-goblins",
      name: "War with Goblins",
      description: "Happie Filmore has asked you to prove your allegiance to Faekind by bringing him six Goblin Fangs from the war against the goblins.",
      rewardXp: 100,
      rewardGold: 30,
      rewardItem: "Faerie Sigil",
      objectives: [{ type: "item", item: "Goblin Fang", label: "Goblin Fangs Collected", required: 6 }],
      new: true
    });
  }
  
  function antidoteForThePlagueQuest() {
    return configuredQuest({
      id: "antidote-for-the-plague",
      name: "Antidote for the Plague",
      description: "Theodora is working on an antidote for whatever has been plaguing the animals of Ganderswood. She needs one rare Purple Mushroom, said to grow somewhere in Ganderswood Fen.",
      rewardXp: 300,
      rewardItem: "Theodora's Pearl",
      rewardItems: ["Soothing Potion"],
      objectives: [{ type: "item", item: "Purple Mushroom", label: "Purple Mushrooms Collected", required: 1 }],
      new: true
    });
  }

  function morePlagueResearchQuest() {
    return configuredQuest({
      id: "more-plague-research",
      name: "More Plague Research",
      description: "Theodora needs the adrenal gland of a plague-stricken bear from the Fen so she can conduct a biopsy and better understand the disease.",
      rewardXp: 250,
      rewardGold: 100,
      rewardItem: "Greater Healing Potion",
      objectives: [{ type: "item", item: "Plague Bear Adrenal Gland", label: "Plague Bear Adrenal Glands Collected", required: 1 }],
      new: true
    });
  }

  function boneCollectorQuest() {
    return configuredQuest({
      id: "bone-collector",
      name: "Bone Collector",
      description: "Heretic Slayleigh wants a stack of 20 Bones. She insists this is a perfectly normal thing to be looking for.",
      minimumRealm: "Umbral",
      minimumRealmLevel: 1,
      rewardXp: 50,
      rewardGold: 40,
      rewardRealmXp: {},
      objectives: [{ type: "item", item: "Bone", label: "Bones Collected", required: 20 }],
      new: true
    });
  }

  function onlyYouCanPreventForestFiresQuest() {
    return configuredQuest({
      id: "only-you-can-prevent-forest-fires",
      name: "Only You Can Prevent Forest Fires",
      description: "Naturalist Walden says Imps are wreaking havoc on the ecosystem and that Sylvan creatures take extra damage from Infernal magic. Slay 4 Imps and return to him.",
      minimumRealm: "Sylvan",
      minimumRealmLevel: 1,
      rewardXp: 40,
      rewardGold: 40,
      rewardItem: "Smokey Badge",
      objectives: [{ type: "kill", enemy: "Imp", label: "Imps Slain", required: 4 }],
      kills: {},
      new: true
    });
  }

  function glowOfTheGladeQuest() {
    return configuredQuest({
      id: "the-glow-of-the-glade",
      name: "The Glow of the Glade",
      description: "Naturalist Walden has given you a Scroll of Faerie Fire. Mark 3 hostile mobs with Faerie Fire, then return to him.",
      phase: "mark-with-faerie-fire",
      rewardXp: 60,
      rewardGold: 50,
      objectives: [{ type: "phase", completePhase: "return-to-walden", label: "Mobs Marked With Faerie Fire", required: 3 }],
      faerieFireTargetIds: [],
      new: true
    });
  }

  function gentleLeashQuest() {
    return configuredQuest({
      id: "a-gentle-leash",
      name: "A Gentle Leash",
      description: "Naturalist Walden has given you a Scroll of Tame Beast. Tame any Beast and return to him while it is still your pet.",
      phase: "tame-beast",
      rewardXp: 80,
      rewardGold: 60,
      objectives: [{ type: "phase", completePhase: "return-to-walden", label: "Beast Tamed", required: 1 }],
      new: true
    });
  }

  function thornsRememberQuest() {
    return configuredQuest({
      id: "thorns-remember",
      name: "Thorns Remember",
      description: "Naturalist Walden has given you a Scroll of Thorn Shield. Let Thorn Shield wound an enemy that strikes you, then return to him.",
      phase: "thorn-shield-retaliation",
      rewardXp: 100,
      rewardGold: 75,
      rewardItem: "Warden Badge",
      objectives: [{ type: "phase", completePhase: "return-to-walden", label: "Enemy Wounded by Thorn Shield", required: 1 }],
      new: true
    });
  }

  function dustOfTheHiddenFolkQuest() {
    return configuredQuest({
      id: "dust-of-the-hidden-folk",
      name: "Dust of the Hidden Folk",
      description: "Naturalist Walden has given you a Scroll of Faerie Dust. Use it on an incorporeal enemy, then return to him.",
      phase: "dust-incorporeal-enemy",
      rewardXp: 125,
      rewardGold: 90,
      objectives: [{ type: "phase", completePhase: "return-to-walden", label: "Incorporeal Enemy Revealed", required: 1 }],
      new: true
    });
  }

  function rootsThatWalkQuest() {
    return configuredQuest({
      id: "roots-that-walk",
      name: "Roots That Walk",
      description: "Naturalist Walden has given you a Scroll of Summon Treant. Summon a Treant and have it damage an enemy, then return to him.",
      phase: "treant-damage",
      rewardXp: 150,
      rewardGold: 100,
      rewardItem: "Scroll of Faerie Circle",
      objectives: [{ type: "phase", completePhase: "return-to-walden", label: "Enemy Damaged by Treant", required: 1 }],
      new: true
    });
  }

  function boneRitualQuest() {
    return configuredQuest({
      id: "bone-ritual",
      name: "Bone Ritual",
      description: "Heretic Slayleigh has given you a Scroll of Bone Ritual. Learn it, use Bone Ritual once, and return to her.",
      phase: "cast-bone-ritual",
      rewardXp: 30,
      rewardGold: 30,
      rewardItem: "Acolyte Badge",
      objectives: [{ type: "phase", completePhase: "return-to-slayleigh", label: "Bone Ritual Cast", required: 1 }],
      new: true
    });
  }

  function firstFlameQuest() {
    return configuredQuest({
      id: "first-flame",
      name: "First Flame",
      description: "Heretic Slayleigh wants you to burn 4 different Sylvan mobs with Fireball.",
      phase: "burn-sylvan-mobs",
      minimumRealm: "Infernal",
      minimumRealmLevel: 1,
      rewardXp: 40,
      rewardGold: 40,
      objectives: [{ type: "phase", completePhase: "return-to-slayleigh", label: "Sylvan Mobs Burned", required: 4 }],
      burnedSylvanMobIds: [],
      new: true
    });
  }

  function controlledBurnQuest() {
    return configuredQuest({
      id: "controlled-burn",
      name: "Controlled Burn",
      description: "Heretic Slayleigh wants you to hit more than one mob with the same Fireblast.",
      phase: "multi-mob-fireblast",
      rewardXp: 60,
      rewardGold: 50,
      objectives: [{ type: "phase", completePhase: "return-to-slayleigh", label: "Multi-Mob Fireblast", required: 1 }],
      fireblastHitsByCast: {},
      new: true
    });
  }

  function tooCloseToTheFireQuest() {
    return configuredQuest({
      id: "too-close-to-the-fire",
      name: "Too Close to the Fire",
      description: "Heretic Slayleigh wants you to damage a Brownie Gladekeeper with Ring of Fire and bring her a Gladekeeper Brooch.",
      phase: "ring-brownie-gladekeeper",
      rewardXp: 80,
      rewardGold: 60,
      rewardItem: "Ember Badge",
      objectives: [
        { type: "flag", flag: "ringOfFireBrownieGladekeeper", label: "Brownie Gladekeeper Burned", required: 1 },
        { type: "item", item: "Gladekeeper Brooch", label: "Gladekeeper Brooch Collected", required: 1 }
      ],
      new: true
    });
  }

  function unholyDominionQuest() {
    return configuredQuest({
      id: "unholy-dominion",
      name: "Unholy Dominion",
      description: "Heretic Slayleigh has given you a Scroll of Unholy Dominion. Use Unholy Dominion on an Incubus, then return to her.",
      phase: "dominate-incubus",
      rewardXp: 100,
      rewardGold: 80,
      rewardItem: "Scroll of Dark Circle",
      objectives: [{ type: "phase", completePhase: "return-to-slayleigh", label: "Incubus Dominated", required: 1 }],
      new: true
    });
  }

  function introductionToEtherQuest() {
    return configuredQuest({
      id: "introduction-to-ether",
      name: "Introduction to Ether",
      description: "Magister Maimon has explained that Ether is harvested from Elementals. Bring him 4 Ether so the real lessons can begin.",
      minimumRealm: "Ethereal",
      minimumRealmLevel: 1,
      rewardXp: 50,
      rewardGold: 50,
      rewardItem: "Neophyte Badge",
      objectives: [{ type: "item", item: "Ether", label: "Ether Collected", required: 4 }],
      new: true
    });
  }

  function introductionToCrowdControlQuest() {
    return configuredQuest({
      id: "introduction-to-crowd-control",
      name: "Introduction to Crowd Control",
      description: "Magister Maimon wants you to learn Pacify or Banish, use either spell once in battle, and then return to him for further training.",
      phase: "cast-spell",
      rewardXp: 40,
      rewardGold: 40,
      rewardItem: "Scroll of Summon Earth Elemental",
      objectives: [{ type: "phase", completePhase: "return-to-maimon", label: "Crowd Control Spell Used", required: 1 }],
      new: true
    });
  }

  function introductionToCelestialMercyQuest() {
    return configuredQuest({
      id: "introduction-to-celestial-mercy",
      name: "Introduction to Celestial Mercy",
      description: "High Priestess Sierra wants you to turn Celestial mercy against the restless dead. Use Basic Prayer or Heavenly Light against a Skeleton, then return to her.",
      phase: "use-celestial-heal-on-skeleton",
      rewardXp: 80,
      rewardGold: 80,
      rewardItem: "Badge of Light",
      objectives: [{ type: "phase", completePhase: "return-to-sierra", label: "Skeleton Struck With Celestial Healing", required: 1 }],
      new: true
    });
  }

  function blessingOfTheRoadQuest() {
    return configuredQuest({
      id: "blessing-of-the-road",
      name: "Blessing of the Road",
      description: "High Priestess Sierra wants you to learn how Celestial blessings guide and hasten the faithful. Cast Godspeed on yourself or an ally, then return to her.",
      phase: "cast-godspeed",
      minimumRealm: "Celestial",
      minimumRealmLevel: 1,
      rewardXp: 40,
      rewardGold: 40,
      objectives: [{ type: "phase", completePhase: "return-to-sierra", label: "Godspeed Cast", required: 1 }],
      new: true
    });
  }

  function aShieldOfFaithQuest() {
    return configuredQuest({
      id: "a-shield-of-faith",
      name: "A Shield of Faith",
      description: "High Priestess Sierra wants you to learn protective Celestial magic. Let Divine Shield absorb damage, then return to her.",
      phase: "absorb-with-divine-shield",
      rewardXp: 60,
      rewardGold: 60,
      objectives: [{ type: "phase", completePhase: "return-to-sierra", label: "Damage Absorbed by Divine Shield", required: 1 }],
      new: true
    });
  }

  function janglebonesInTheFenQuest() {
    return configuredQuest({
      id: "janglebones-in-the-fen",
      name: "Janglebones in the Fen",
      description: "High Priestess Sierra asks you to defeat Janglebones, the elite skeleton stalking the graveyard in Ganderswood Fen.",
      rewardXp: 150,
      rewardGold: 100,
      rewardItem: "Scroll of Grace from Above",
      objectives: [{ type: "kill", enemy: "Janglebones", label: "Janglebones Defeated", required: 1 }],
      new: true
    });
  }

  function introductionToWeaponsMasteryQuest() {
    return configuredQuest({
      id: "introduction-to-weapons-mastery",
      name: "Introduction to Weapons Mastery",
      description: "Barbarianess Skjoldma has given you a Scroll of Dagger Mastery. Learn how weapon mastery spells earn Mortal Realm XP, then land a Critical Hit with a stabbing weapon and return to her.",
      phase: "land-critical-hit",
      minimumRealm: "Mortal",
      minimumRealmLevel: 1,
      rewardXp: 30,
      rewardGold: 30,
      rewardItem: "Weapons Training Badge",
      objectives: [{ type: "phase", completePhase: "return-to-skjoldma", label: "Stabbing Critical Hit Landed", required: 1 }],
      new: true
    });
  }

  function introductionToShieldsQuest() {
    return configuredQuest({
      id: "introduction-to-shields",
      name: "Introduction to Shields",
      description: "Barbarianess Skjoldma wants you to equip a shield, block an attack with it, and return to her.",
      phase: "block-attack",
      rewardXp: 50,
      rewardGold: 50,
      rewardItem: "Scroll of Shield Mastery",
      objectives: [{ type: "phase", completePhase: "return-to-skjoldma", label: "Attack Blocked With Shield", required: 1 }],
      new: true
    });
  }

  function joiningTheGandersguardQuest() {
    return configuredQuest({
      id: "joining-the-gandersguard",
      name: "Joining the Gandersguard",
      description: "Lord Yantos says that anyone interested in joining the Gandersguard must prove their mettle by bringing him six Goblin Heads.",
      rewardXp: 60,
      rewardGold: 60,
      rewardItem: "Gandersguard Sigil",
      objectives: [{ type: "item", item: "Goblin Head", label: "Goblin Heads Collected", required: 6 }],
      new: true
    });
  }

  function joiningTheFenguardQuest() {
    return configuredQuest({
      id: "joining-the-fenguard",
      name: "Joining the Fenguard",
      description: "Lord Rauf has offered to fast-track you into the Fenguard if you kill Guard Dorin and bring back Dorin's Shield.",
      rewardXp: 200,
      rewardGold: 100,
      rewardItem: "Fenguard Sigil",
      objectives: [{ type: "item", item: "Dorin's Shield", label: "Dorin's Shield Collected", required: 1 }],
      new: true
    });
  }

  function gandersvilleRaidQuest() {
    return configuredQuest({
      id: "gandersville-raid",
      name: "Gandersville Raid",
      description: "Lord Rauf wants you to invade Gandersville and bring back four Gandersguard Insignias from the Gandersguard Footmen who patrol the town.",
      rewardXp: 350,
      rewardGold: 200,
      rewardItem: "Fenguard Ring",
      objectives: [{ type: "item", item: "Gandersguard Insignia", label: "Gandersguard Insignias Collected", required: 4 }],
      new: true
    });
  }

  function whiteStagQuest() {
    return configuredQuest({
      id: "the-white-stag",
      name: "The White Stag",
      description: "Juan Tabo wants to study the mythical White Stag that roams the glades of the Ganderswood. Tame one and bring it into Gandersville Town Hall.",
      rewardXp: 500,
      rewardItem: "Scroll of Song of White Stag",
      rewardRealmXp: {
        Sylvan: 500
      },
      objectives: [{ type: "custom", key: "white-stag-town-hall", label: "White Stag Brought to Town Hall", required: 1 }],
      new: true
    });
  }
  
  function startGvadaDialogue() {
    const gvada = game.map?.gvada;
    if (!gvada) return;
    if (!allowNpcInteraction(gvada)) return;
    const quest = gvadaQuestByPlayer();
    const completed = game.completedQuests.includes("gvada-starter-magic");
    if (!quest && !completed) {
      const previousChoice = game.player.gvadaStarterMagic?.spellName;
      if (previousChoice) {
        startGvadaStarterQuest(previousChoice, { giveScroll: false });
        return;
      }
      openGvadaStarterChoice();
      renderQuestLog();
      return;
    }
    if (quest?.phase === "return-to-gvada") {
      completeQuest(quest);
      game.player.gvadaStarterMagic = { ...(game.player.gvadaStarterMagic || {}), phase: "completed" };
      gvada.lessonGiven = true;
      openDialogue("Gvada", "Good. Now you understand the first rule: power grows when you use it. Keep training your Realms, and seek out the trainers I told you about.", gvada);
    } else if (completed && !gvada.lessonGiven) {
      gvada.lessonGiven = true;
      openDialogue("Gvada", [
        "Good. A Soulreaper without magic is just a wanderer with a sharp stick. Now listen closely: Soulreaper Trainers can improve active spells for gold, but only spells you have prepared in your active slots.",
        "Magic damage is different from Physical damage. Physical attacks are reduced by DEF. Magical attacks are reduced by Realm RESIST. Spells and magical weapons usually deal Magical damage, so watch what sort of enemy you are facing.",
        { html: `Every spell and many weapons belong to a Realm. ${realmNameHtml("Celestial")} burns ${realmNameHtml("Umbral")} more fiercely. ${realmNameHtml("Umbral")} devours ${realmNameHtml("Sylvan")}. ${realmNameHtml("Sylvan")} disrupts ${realmNameHtml("Ethereal")}. ${realmNameHtml("Ethereal")} pierces ${realmNameHtml("Infernal")}. ${realmNameHtml("Infernal")} scorches ${realmNameHtml("Celestial")}. ${realmNameHtml("Mortal")} is plain, but reliable, and has no special weakness or advantage.` },
        "Starting at level 6, a Soulreaper Trainer can unlock additional Spell Slots for you, for a price. More spells means more answers when the woods stop being polite."
      ], gvada);
    } else if (completed) {
      openDialogue("Gvada", "Be smart out there, young soulreaper. We will surely meet again.", gvada);
    } else {
      const realm = quest?.starterRealm || game.player.gvadaStarterMagic?.realm || "Mortal";
      openDialogue("Gvada", `Learn your scroll, practice your spell, and return after your ${realm} Realm LVL increases.`, gvada);
    }
    renderQuestLog();
  }
  
  function startPleezixDialogue() {
    const pleezix = game.map?.pleezix;
    if (!pleezix) return;
    if (!allowNpcInteraction(pleezix)) return;
    const quest = game.quests.find(candidate => candidate.id === "rat-infestation");
    const ratWarrenQuest = game.quests.find(candidate => candidate.id === "investigate-rat-warren");
    const menaceQuest = game.quests.find(candidate => candidate.id === "ratkin-menace");
    let text = "";
    if (game.completedQuests.includes("ratkin-menace")) {
      text = "The Ratkin will think twice before gathering near Ganderswood again. At least for a while.";
    } else if (game.completedQuests.includes("investigate-rat-warren")) {
      if (menaceQuest && questObjectivesComplete(menaceQuest)) {
        text = "Six Turdburglars and six Warlocks? That is a blow they will feel. The tunnels may still stink of Ratkin, but you have bought us time.";
        completeQuest(menaceQuest);
        markUIDirty();
      } else if (menaceQuest) {
        text = "Thin their numbers in those tunnels. Six Ratkin Turdburglars and six Ratkin Warlocks. Then come back alive.";
      } else {
        text = "The Ratkin are not just hiding in the old mine. They are rebuilding. Kill six Ratkin Turdburglars and six Ratkin Warlocks before they gather too many blades and too much sorcery.";
        const offer = receiveQuestIfEligible(ratkinMenaceQuest(), pleezix);
        if (offer.received) markUIDirty();
        else text = offer.blockedText;
      }
    } else if (game.completedQuests.includes("rat-infestation")) {
      if (ratWarrenQuest && inventoryItemCount("Ratkin Tail") >= 1) {
        removeInventoryStack("Ratkin Tail", 1);
        text = "A Ratkin tail? Then the old stories are true. The Ratkin are back, and if they are hiding in the abandoned mine, they may be regathering their forces after being driven out of Ganderswood long ago. This is worse than rats. Much worse.";
        addLog("<b>Investigate the Rat Warren</b>: delivered a Ratkin Tail to Pleezix.");
        completeQuest(ratWarrenQuest);
        markUIDirty();
      } else if (ratWarrenQuest) {
        text = "Listen close in those tunnels. If something stranger than rats is down there, bring me proof.";
      } else {
        text = "Travelers have reported strange sounds from the tunnels. I suspect it has something to do with the rat infestation and the disease they bear. Bring me back some sort of evidence of what is going on.";
        const offer = receiveQuestIfEligible(investigateRatWarrenQuest(), pleezix);
        if (offer.received) markUIDirty();
        else text = offer.blockedText;
      }
    } else if (quest && inventoryItemCount("Rat Pelt") >= 7) {
      removeInventoryStack("Rat Pelt", 7);
      text = "Excellent! Lord Yantos will be pleased. Can't let these pelts go to waste!";
      addLog("<b>Rat Infestation</b>: delivered 7 Rat Pelts to Pleezix.");
      completeQuest(quest);
      markUIDirty();
    } else {
      text = "The Ganderswood has a real rat problem. I've been tasked by Lord Yantos to deal with it, but I could use some help. If you bring me seven rat pelts, I could even fashion something nice from them as thanks.";
      if (!quest) {
        const offer = receiveQuestIfEligible(ratInfestationQuest(), pleezix);
        if (offer.received) markUIDirty();
        else text = offer.blockedText;
      }
    }
    openDialogue("Pleezix", text, pleezix);
    renderQuestLog();
    renderUI();
  }

  function spawnPantryPests(speaker, quest) {
    if (!speaker || quest?.pantryRatsSpawned) return false;
    const template = allMonsterTemplates.find(candidate => candidate.name === "Giant Rat");
    if (!template) return false;
    const house = (game.map?.houses || []).find(candidate => candidate.id === speaker.houseId);
    const houseCx = house?.x ?? speaker.x;
    const houseCy = house?.y ?? speaker.y;
    const houseW = Number(house?.w) || 240;
    const houseH = Number(house?.h) || 190;
    const outsidePad = 72;
    const spawnPoints = house ? [
      { x: houseCx, y: houseCy - houseH / 2 - outsidePad },
      { x: houseCx + houseW / 2 + outsidePad, y: houseCy },
      { x: houseCx, y: houseCy + houseH / 2 + outsidePad },
      { x: houseCx - houseW / 2 - outsidePad, y: houseCy }
    ] : [
      { x: speaker.x - 52, y: speaker.y - 44 },
      { x: speaker.x + 54, y: speaker.y - 32 },
      { x: speaker.x - 38, y: speaker.y + 50 },
      { x: speaker.x + 48, y: speaker.y + 46 }
    ];
    for (const [index, point] of spawnPoints.entries()) {
      const enemy = makeEnemy(template, randomInt(1, 3), point.x, point.y, {
        id: sharedEntityId("enemy"),
        name: "Giant Rat",
        aggressive: true,
        noWander: true,
        questSpawn: "pantry-pests",
        respawnKey: null,
        homeX: point.x,
        homeY: point.y,
        leashX: houseCx,
        leashY: houseCy,
        leashRadius: Math.max(houseW, houseH) * 0.8,
        area: "Gandersville",
        gold: { min: 0, max: 0 }
      });
      enemy.attackTimer = 0.35 + index * 0.12;
      game.enemies.push(enemy);
      if (game.mode === "multiplayer") sendMultiplayerEnemyUpdate(enemy, true);
    }
    quest.pantryRatsSpawned = true;
    addLog("<b>Mira Kettlewick</b> shrieks as rats pour from the pantry.");
    return true;
  }

  function handleConfiguredQuestAccepted(speaker, quest) {
    if (!quest) return;
    if (quest.id === "pantry-pests") {
      spawnPantryPests(speaker, quest);
    } else if (quest.id === "flowers-for-the-grave") {
      grantQuestStartItem("Mourning Flowers");
    }
  }

  function startConfiguredQuestDialogue(speaker = null) {
    const hasQuestSource = speaker?.questId || (Array.isArray(speaker?.questChain) && speaker.questChain.length);
    if (!speaker || !speaker.startsQuest || !hasQuestSource) return false;
    if (!allowNpcInteraction(speaker)) return true;
    const questId = questChainQuestIdForNpc(speaker) || speaker.questId;
    const active = activeQuestById(questId);
    let text = "";
    if ((speaker.id === "widow-elowen" || speaker.name === "Widow Elowen")
      && game.completedQuests.includes("flowers-for-the-grave")
      && !game.player.elowenLetterReturned
      && inventoryItemCount("Forgotten Letter") >= 1) {
      removeInventoryStack("Forgotten Letter", 1);
      game.player.elowenLetterReturned = true;
      grantXP(150);
      game.player.gold += 75;
      spawnFloatingText(game.player, "+75 Gold", "#d9b95f", "rgba(0, 0, 0, 0.82)");
      text = npcDialogueContext(speaker, "letterRead", "She reads the forgotten letter aloud through tears.");
      addLog("<b>Widow Elowen</b> reads the Forgotten Letter and rewards you.");
      markUIDirty();
    } else if (!questId || game.completedQuests.includes(questId)) {
      text = npcDialogueContext(speaker, "questAfterComplete", speaker.dialogue || "Thank you again.");
    } else if (active && questObjectivesComplete(active)) {
      text = npcDialogueContext(speaker, "questReady", "You have done what I asked. Thank you.");
      consumeQuestObjectiveItems(active);
      completeQuest(active);
      markUIDirty();
    } else if (active) {
      text = npcDialogueContext(speaker, "questActive", active.description || "Please finish what I asked of you.");
    } else {
      const quest = questById(questId);
      text = npcDialogueContext(speaker, "questOffer", quest?.description || speaker.dialogue || "");
      const offer = receiveQuestIfEligible(quest, speaker);
      if (offer.received) {
        handleConfiguredQuestAccepted(speaker, offer.received === true ? activeQuestById(questId) : offer.received);
        text = npcDialogueContext(speaker, questId === "pantry-pests" ? "questAccepted" : "questOffer", text);
        markUIDirty();
      } else {
        text = offer.blockedText || text;
      }
    }
    openDialogue(speaker.name || "NPC", text, speaker);
    renderQuestLog();
    renderUI();
    return true;
  }

  function ganderswoodFenGraveyardAt(x, y) {
    const graveyards = game.map?.graveyards?.length
      ? game.map.graveyards
      : [game.map?.ganderswoodGraveyard].filter(Boolean);
    return graveyards.find(graveyard => {
      if (!graveyard || graveyard.areaName !== "Ganderswood Fen") return false;
      return x >= graveyard.x - graveyard.w / 2
        && x <= graveyard.x + graveyard.w / 2
        && y >= graveyard.y - graveyard.h / 2
        && y <= graveyard.y + graveyard.h / 2;
    }) || null;
  }

  function spawnElowensBeloved(graveyard) {
    if (!graveyard || game.enemies.some(enemy => enemy.questSpawn === "elowens-beloved")) return false;
    const template = allMonsterTemplates.find(candidate => candidate.name === "Zombie");
    if (!template) return false;
    const enemy = makeEnemy(template, 8, graveyard.x, graveyard.y, {
      name: "Elowen's Beloved",
      elite: true,
      noRespawn: true,
      noWander: true,
      aggressive: true,
      aggroRange: 9,
      questSpawn: "elowens-beloved",
      guaranteedDrops: ["Forgotten Letter"],
      homeX: graveyard.x,
      homeY: graveyard.y,
      leashX: graveyard.x,
      leashY: graveyard.y,
      leashRadius: Math.max(graveyard.w, graveyard.h) * 0.55,
      area: "Ganderswood Fen"
    });
    game.enemies.push(enemy);
    if (game.mode === "multiplayer") sendMultiplayerEnemyUpdate(enemy, true);
    spawnFloatingText(enemy, "AWAKENED", "#9f7bb9", "rgba(0, 0, 0, 0.82)");
    addLog("<b>Elowen's Beloved</b> rises from the graveyard.");
    return true;
  }

  function handleInventoryItemDropped(item, point) {
    if (!item || item.name !== "Mourning Flowers") return false;
    const quest = activeQuestById("flowers-for-the-grave");
    if (!quest) return false;
    const graveyard = ganderswoodFenGraveyardAt(point.x, point.y);
    if (!graveyard) return false;
    quest.phase = "flowers-placed";
    quest.description = "You placed Widow Elowen's flowers in the Ganderswood Fen graveyard.";
    setQuestObjectiveProgress(quest, "Flowers Placed", 1);
    spawnElowensBeloved(graveyard);
    completeQuest(quest);
    markUIDirty();
    renderQuestLog();
    renderUI();
    return true;
  }
  
  function startSharleneDialogue() {
    const sharlene = game.map?.sharlene;
    if (!sharlene) return;
    if (!allowNpcInteraction(sharlene)) return;
    const quest = game.quests.find(candidate => candidate.id === "sharlene-parcel");
    let text = "";
    if (quest?.phase === "find-parcel" && inventoryItemCount("Sharlene's Parcel") > 0) {
      if (!quest.firstRewardGranted) {
        quest.firstRewardGranted = true;
        grantXP(100);
        game.player.gold += 25;
        spawnFloatingText(game.player, "+25 Gold", "#d9b95f", "rgba(0, 0, 0, 0.82)");
        addLog("<b>Sharlene's Parcel</b>: returned the parcel to Sharlene. Gained <b>100 XP</b> and <b>25 gold</b>.");
      }
      quest.phase = "deliver-to-cecil";
      quest.description = "Sharlene now asks that you deliver the parcel to Cecil Paddywagon in Bumsfork.";
      quest.rewardXp = 0;
      quest.rewardGold = 0;
      quest.rewardText = "?";
      quest.new = true;
      game.questLogAlert = true;
      text = "That's it! Thank you so much! Say, would you mind delivering it to Cecil Paddywagon in Bumsfork? I would do it, but I think the fen is too dangerous for me.";
      markUIDirty();
    } else if (quest) {
      text = quest.phase === "deliver-to-cecil"
        ? "Please take the parcel to Cecil Paddywagon in Bumsfork. I still don't dare cross the fen again."
        : "Please keep an eye out for my parcel in Ganderswood Fen. I dropped it when that Bog Witch chased me.";
    } else if (!game.completedQuests.includes("sharlene-parcel")) {
      text = "Beyond here is Ganderswood Fen. It is a bit more dangerous than this side of the forest; I was chased by a Bog Witch and nearly didn't make it out alive! I was trying to deliver a parcel to Bumsfork, but I dropped it somewhere in the fen and I'm afraid to go back. If you happen to see it, could you return it to me?";
      const offer = receiveQuestIfEligible(sharleneParcelQuest(), sharlene);
      if (offer.received) markUIDirty();
      else text = offer.blockedText;
    }
    openDialogue("Sharlene", text || "Safe travels.", sharlene);
    renderQuestLog();
    renderUI();
  }
  
  function startMordrenDialogue() {
    const mordren = game.map?.mordren;
    if (!mordren) return;
    if (!allowNpcInteraction(mordren)) return;
    const quest = game.quests.find(candidate => candidate.id === "napaea-skull");
    const fenhold = game.quests.find(candidate => candidate.id === "fenhold");
    let text = "";
    if (game.completedQuests.includes("fenhold")) {
      text = "Morgane will decide what use you are now. Do not keep her waiting if she has given you work.";
    } else if (fenhold) {
      text = "Go to Fenhold Keep. Necromancer Morgane will want to hear of Napaea's end from the hand that made it so.";
    } else if (game.completedQuests.includes("napaea-skull")) {
      text = "The Glade is quieter without Napaea. Keep the bracelet; you earned it.";
      const offer = receiveQuestIfEligible(fenholdQuest(), mordren);
      if (offer.received) {
        text = "My mistress Morgane in Fenhold Keep will be pleased to know that Napaea's life has been snuffed out. Go to her. Tell her what you have done.";
        markUIDirty();
      } else {
        text = offer.blockedText;
      }
    } else if (quest && inventoryItemCount("Napaea's Skull") > 0) {
      removeInventoryItemByName("Napaea's Skull");
      text = "So the pixie queen bleeds like anything else. Good. Take your reward.";
      addLog("<b>Napaea's Skull</b>: delivered Napaea's Skull to Mordren.");
      completeQuest(quest);
      markUIDirty();
    } else if (quest) {
      text = "Napaea lairs somewhere in Ganderswood Glade. Bring me her skull when the deed is done.";
    } else {
      text = "Past the Rat Den lies Ganderswood Glade, and in that Glade flits Napaea. Kill her and bring me her skull. I will reward you, though your conscience may not thank you.";
      const offer = receiveQuestIfEligible(napaeaSkullQuest(), mordren);
      if (offer.received) markUIDirty();
      else text = offer.blockedText;
    }
    openDialogue("Mordren", text, mordren);
    renderQuestLog();
    renderUI();
  }

  function startMorganeDialogue(morgane = null) {
    const speaker = morgane
      || (game.map?.configuredNpcs || []).find(npc => npc.id === "necromancer-morgane" || npc.name === "Necromancer Morgane")
      || game.enemies?.find(npc => npc.id === "necromancer-morgane" || npc.name === "Necromancer Morgane");
    if (!speaker) return;
    if (!allowNpcInteraction(speaker)) return;
    const fenhold = game.quests.find(candidate => candidate.id === "fenhold");
    const reagents = game.quests.find(candidate => candidate.id === "morganes-reagents");
    let text = "";
    if (game.completedQuests.includes("morganes-reagents")) {
      text = "The reagents are already at work. Whisperspring's old magic is not as dead as fools suppose.";
    } else if (reagents) {
      const hasDryadHorn = inventoryItemCount("Dryad Horn") >= 1;
      const hasNaiadWater = inventoryItemCount("Vial of Naiad Water") >= 1;
      const hasNymphFloret = inventoryItemCount("Nymph Floret") >= 1;
      if (hasDryadHorn && hasNaiadWater && hasNymphFloret) {
        removeInventoryStack("Dryad Horn", 1);
        removeInventoryStack("Vial of Naiad Water", 1);
        removeInventoryStack("Nymph Floret", 1);
        text = "A Dryad Horn, Naiad Water, and a Nymph Floret. Good. Whisperspring still bleeds useful secrets for those with the will to cut them free.";
        addLog("<b>Morgane's Reagents</b>: delivered the Whisperspring reagents to Necromancer Morgane.");
        completeQuest(reagents);
        markUIDirty();
      } else {
        text = "Do not return empty-handed. I need a Dryad Horn, a Vial of Naiad Water, and a Nymph Floret from Whisperspring.";
      }
    } else if (fenhold || game.completedQuests.includes("fenhold")) {
      if (fenhold) {
        completeQuest(fenhold);
        markUIDirty();
      }
      text = "So Mordren sends word that Napaea's life has been snuffed out. Useful. I am gathering magical reagents found in the ancient forest temple of Whisperspring. Bring me a Dryad Horn, a Vial of Naiad Water, and a Nymph Floret.";
      const offer = receiveQuestIfEligible(morganesReagentsQuest(), speaker);
      if (offer.received) markUIDirty();
      else text = offer.blockedText;
    } else {
      text = "Mordren's errands have not yet made you useful to me.";
    }
    openDialogue("Necromancer Morgane", text, speaker);
    renderQuestLog();
    renderUI();
  }
  
  function startCecilDialogue() {
    const cecil = game.map?.cecil;
    if (!cecil) return;
    if (!allowNpcInteraction(cecil)) return;
    const quest = game.quests.find(candidate => candidate.id === "sharlene-parcel");
    let text = "";
    if (quest?.phase === "deliver-to-cecil" && inventoryItemCount("Sharlene's Parcel") > 0) {
      removeInventoryItemByName("Sharlene's Parcel");
      text = "Ah, Sharlene's parcel. Good of you to carry it through those woods. Bumsfork remembers a favor.";
      addLog("<b>Sharlene's Parcel</b>: delivered the parcel to Cecil Paddywagon.");
      completeQuest(quest);
      markUIDirty();
    } else if (quest?.phase === "deliver-to-cecil") {
      text = "Sharlene sent word that a parcel may be coming. Let me know if you find it.";
    } else {
      text = "Welcome to Bumsfork. Stay near the houses if the path starts whispering at you.";
    }
    openDialogue("Cecil Paddywagon", text, cecil);
    renderQuestLog();
    renderUI();
  }
  
  function startQuigleyDialogue() {
    const quigley = namedEnemy("Quigley Thistleberry");
    if (quigley && !allowNpcInteraction(quigley)) return;
    const quest = game.quests.find(candidate => candidate.id === "remove-goblin-menace");
    if (game.completedQuests.includes("remove-goblin-menace")) {
      openDialogue("Quigley Thistleberry", "Whisperspring remembers what you have done for Faekind.", quigley);
    } else if (quest) {
      openDialogue("Quigley Thistleberry", "Mukluk the Deceiver still fouls the eastern ruins. Bring back proof of his demise, trusted Soulreaper.", quigley);
    } else {
      const offer = receiveQuestIfEligible(removeGoblinMenaceQuest(), quigley);
      openDialogue("Quigley Thistleberry", offer.received ? "The hated Goblins, led by Mukluk the Deceiver, have overtaken the eastern part of our sacred ruins. We could use the help of a trusted Soulreaper like you. All of Faekind would be indebted to you if you could bring back proof of Mukluk's demise." : offer.blockedText, quigley);
      if (offer.received) markUIDirty();
    }
    renderQuestLog();
    renderUI();
  }
  
  function startHappieDialogue() {
    const happie = namedEnemy("Happie Filmore");
    if (happie && !allowNpcInteraction(happie)) return;
    const quest = game.quests.find(candidate => candidate.id === "war-with-goblins");
    if (game.completedQuests.includes("war-with-goblins")) {
      openDialogue("Happie Filmore", "Faekind remembers your service in the war effort.", happie);
    } else if (quest && inventoryItemCount("Goblin Fang") >= 6) {
      removeInventoryStack("Goblin Fang", 6);
      openDialogue("Happie Filmore", "Excellent work. Six Goblin fangs is proof enough that you stand with Faekind. Take your reward.", happie);
      addLog("<b>War with Goblins</b>: delivered 6 Goblin Fangs to Happie Filmore.");
      completeQuest(quest);
      markUIDirty();
    } else if (quest) {
      openDialogue("Happie Filmore", "Bring me six Goblin fangs and Faekind will know where your allegiance lies.", happie);
    } else {
      const offer = receiveQuestIfEligible(warWithGoblinsQuest(), happie);
      openDialogue("Happie Filmore", offer.received ? "This Glade is sacred to the Sylvan Realm. Unfortunately, the Goblins ahistorically claim this land as rightfully theirs and have been waging a relentless war against us! If you join the war effort, you will be rewarded handsomely. Prove your allegiance to Faekind by bringing me six Goblin fangs; I will reward you handsomely" : offer.blockedText, happie);
      if (offer.received) markUIDirty();
    }
    renderQuestLog();
    renderUI();
  }
  
  function startTheodoraDialogue() {
    const theodora = game.map?.theodora;
    if (!theodora) return;
    if (!allowNpcInteraction(theodora)) return;
    const quest = game.quests.find(candidate => candidate.id === "antidote-for-the-plague");
    const researchQuest = game.quests.find(candidate => candidate.id === "more-plague-research");
    let text = "";
    if (game.completedQuests.includes("more-plague-research")) {
      text = "This gland tissue is unpleasant work, but it may finally reveal what the plague is doing to the Fen's creatures. Thank you for taking the risk.";
    } else if (researchQuest && inventoryItemCount("Plague Bear Adrenal Gland") > 0) {
      removeInventoryStack("Plague Bear Adrenal Gland", 1);
      text = "You found the gland. Grim as it is, this biopsy may tell me how the plague has altered the creature's humors. Take this for your trouble.";
      addLog("<b>More Plague Research</b>: delivered a Plague Bear Adrenal Gland to Theodora.");
      completeQuest(researchQuest);
      markUIDirty();
    } else if (researchQuest) {
      text = "The plague-stricken bear still roams the Fen. Please bring me its adrenal gland so I can continue the biopsy research.";
    } else if (game.completedQuests.includes("antidote-for-the-plague")) {
      text = "The antidote helped, but it did not answer the deeper question. There is a bear in the Fen that has succumbed fully to the plague, and I need its adrenal gland for a biopsy. Bring me a Plague Bear Adrenal Gland, and I will compensate you for the danger.";
      const offer = receiveQuestIfEligible(morePlagueResearchQuest(), theodora);
      if (offer.received) markUIDirty();
      else text = offer.blockedText;
    } else if (quest && inventoryItemCount("Purple Mushroom") > 0) {
      removeInventoryStack("Purple Mushroom", 1);
      text = "Ah! A Purple Mushroom, and fresh enough to work with. This may be exactly what the antidote needs. Take your reward.";
      addLog("<b>Antidote for the Plague</b>: delivered a Purple Mushroom to Theodora.");
      completeQuest(quest);
      markUIDirty();
    } else if (quest) {
      text = "Please keep searching Ganderswood Fen for a rare Purple Mushroom. I have tried everything else, and the poor animals keep worsening.";
    } else {
      text = "I've been working on a potential antidote for whatever has been plaguing the animals of Ganderswood. I just need one more ingredient: a rare Purple Mushroom. They are said to grow in Ganderswood Fen, but I've never seen one myself. If you find one, please bring it to me.";
      const offer = receiveQuestIfEligible(antidoteForThePlagueQuest(), theodora);
      if (offer.received) markUIDirty();
      else text = offer.blockedText;
    }
    openDialogue("Theodora", text, theodora);
    renderQuestLog();
    renderUI();
  }

  function startSlayleighDialogue() {
    const slayleigh = game.map?.hereticSlayleigh;
    if (!slayleigh) return;
    if (!allowNpcInteraction(slayleigh)) return;
    const quest = game.quests.find(candidate => candidate.id === "bone-collector");
    const ritualQuest = game.quests.find(candidate => candidate.id === "bone-ritual");
    const firstFlame = game.quests.find(candidate => candidate.id === "first-flame");
    const controlledBurn = game.quests.find(candidate => candidate.id === "controlled-burn");
    const tooClose = game.quests.find(candidate => candidate.id === "too-close-to-the-fire");
    const dominion = game.quests.find(candidate => candidate.id === "unholy-dominion");
    if (tooClose) {
      if (tooClose.phase === "return-to-slayleigh") tooClose.ringOfFireBrownieGladekeeper = true;
      tooClose.objectives = tooCloseToTheFireQuest().objectives;
      tooClose.objectiveProgress ||= {};
      if (tooClose.ringOfFireBrownieGladekeeper) tooClose.objectiveProgress["Brownie Gladekeeper Burned"] = 1;
    }
    let text = "";
    if (dominion?.phase === "return-to-slayleigh") {
      text = npcDialogueContext(slayleigh, "questDominionReady", "An Incubus, bent to your will. Good. Daemons understand hierarchy when it is written in fire. Take this circle-work next; command is cleaner when the ground itself obeys.");
      completeQuest(dominion);
      markUIDirty();
    } else if (dominion) {
      text = npcDialogueContext(slayleigh, "questDominionActive", "Use Unholy Dominion on an Incubus. Not an imp, not a rat, not whatever else you might be tempted to bully. An Incubus.");
    } else if (tooClose?.ringOfFireBrownieGladekeeper && inventoryItemCount("Gladekeeper Brooch") >= 1) {
      text = npcDialogueContext(slayleigh, "questTooCloseReady", "A Brownie Gladekeeper burned for standing too near you, and you brought proof. Excellent. Wear this Ember Badge and remember the lesson: closeness is a privilege fire may revoke.");
      tooClose.phase = "return-to-slayleigh";
      removeInventoryStack("Gladekeeper Brooch", 1);
      completeQuest(tooClose);
      markUIDirty();
    } else if (tooClose) {
      text = tooClose.ringOfFireBrownieGladekeeper
        ? npcDialogueContext(slayleigh, "questTooCloseNeedsBrooch", "The burning lesson is done. Now bring me a Gladekeeper Brooch. If you are going to offend the glade, at least bring back something worth looking at.")
        : npcDialogueContext(slayleigh, "questTooCloseActive", "Find a Brownie Gladekeeper and let Ring of Fire teach it distance. Bring me a Gladekeeper Brooch as proof that you chose the right sort of victim.");
    } else if (controlledBurn?.phase === "return-to-slayleigh") {
      text = npcDialogueContext(slayleigh, "questControlledReady", "There. More than one fool inside the same burn. Infernal magic is not merely heat; it is where you decide heat belongs.");
      completeQuest(controlledBurn);
      markUIDirty();
    } else if (controlledBurn) {
      text = npcDialogueContext(slayleigh, "questControlledActive", "Use Fireblast so it catches more than one mob at the same time. If only one thing burns, your placement was timid.");
    } else if (firstFlame?.phase === "return-to-slayleigh") {
      text = npcDialogueContext(slayleigh, "questFirstFlameReady", "Four Sylvan things scorched. Good. They are all sap and songs until the flame explains itself.");
      completeQuest(firstFlame);
      markUIDirty();
    } else if (firstFlame) {
      text = npcDialogueContext(slayleigh, "questFirstFlameActive", "Burn four different Sylvan mobs with Fireball. Different ones. Do not make me explain counting.");
    } else if (ritualQuest?.phase === "return-to-slayleigh") {
      text = npcDialogueContext(slayleigh, "trainerQuestReady", "There. You felt the lesson, yes? Bones are not merely remains. They are handles. The Umbral Arts are full of such handles.");
      completeQuest(ritualQuest);
      markUIDirty();
    } else if (ritualQuest) {
      text = npcDialogueContext(slayleigh, "questFollowupActive", "Use Bone Ritual once, then return. Bring bones, obviously. The spell is not named metaphorically.");
    } else if (game.completedQuests.includes("too-close-to-the-fire")) {
      text = npcDialogueContext(slayleigh, "questDominionOffer", "You have learned to burn at range, burn the ground, and punish closeness. Now learn command. Take Unholy Dominion and use it on an Incubus. Every proper Daemon should know when it has met a sharper will.");
      const offer = receiveQuestIfEligible(unholyDominionQuest(), slayleigh);
      if (offer.received) {
        giveQuestScrollIfNeeded("Scroll of Unholy Dominion", "Unholy Dominion");
        markUIDirty();
      } else text = offer.blockedText;
    } else if (game.completedQuests.includes("controlled-burn")) {
      text = npcDialogueContext(slayleigh, "questTooCloseOffer", "Distance is pleasant, but enemies will insist on becoming personal. Take Ring of Fire. Use it against a Brownie Gladekeeper and watch nature learn manners.");
      const offer = receiveQuestIfEligible(tooCloseToTheFireQuest(), slayleigh);
      if (offer.received) {
        giveQuestScrollIfNeeded("Scroll of Ring of Fire", "Ring of Fire");
        markUIDirty();
      } else text = offer.blockedText;
    } else if (game.completedQuests.includes("first-flame")) {
      text = npcDialogueContext(slayleigh, "questControlledOffer", "A spark is charming. Control is useful. Take Fireblast and catch more than one mob in the same burn. Placement is the difference between a tantrum and a lesson.");
      const offer = receiveQuestIfEligible(controlledBurnQuest(), slayleigh);
      if (offer.received) {
        giveQuestScrollIfNeeded("Scroll of Fireblast", "Fireblast");
        markUIDirty();
      } else text = offer.blockedText;
    } else if (!game.completedQuests.includes("first-flame") && (realmProgress("Infernal").level || 0) >= 1) {
      text = npcDialogueContext(slayleigh, "questFirstFlameOffer", "You have enough Infernal sense to begin. Fire is honest magic: it hungers, it answers, and it leaves evidence. Take Fireball and burn four different Sylvan mobs.");
      const offer = receiveQuestIfEligible(firstFlameQuest(), slayleigh);
      if (offer.received) {
        giveQuestScrollIfNeeded("Scroll of Fireball", "Fireball");
        markUIDirty();
      } else text = offer.blockedText;
    } else if (game.completedQuests.includes("bone-collector")) {
      text = npcDialogueContext(slayleigh, "questFollowupOffer", "Practitioners of the Umbral Arts often need Bones to cast certain spells. For example, a spell called Bone Ritual. Here, take the scroll. Use Bone Ritual once and return to me.");
      const offer = receiveQuestIfEligible(boneRitualQuest(), slayleigh);
      if (offer.received) {
        const scroll = cloneItem("Scroll of Bone Ritual");
        if (scroll && !addInventoryItem(scroll)) {
          const point = playerDropPoint();
          dropGroundItem(scroll, point.x, point.y);
          addLog("Inventory full. <b>Scroll of Bone Ritual</b> was dropped.");
        }
        markUIDirty();
      } else {
        text = offer.blockedText;
      }
    } else if (quest && inventoryItemCount("Bone") >= 20) {
      removeInventoryStack("Bone", 20);
      text = npcDialogueContext(slayleigh, "questComplete", "Ah, excellent. A proper stack of bones. Here, take your payment, and let's both pretend this was a normal transaction.");
      addLog("<b>Bone Collector</b>: delivered 20 Bones to Heretic Slayleigh.");
      completeQuest(quest);
      markUIDirty();
    } else if (quest) {
      text = npcDialogueContext(slayleigh, "questActive", "Still looking for that stack of 20 bones. For ordinary bone-related purposes. Perfectly mundane.");
    } else if (!game.completedQuests.includes("bone-ritual")) {
      text = npcDialogueContext(slayleigh, "questOffer", "I'm looking for bones. Which is... a strange thing to say out loud, isn't it? Not strange, actually. Normal. People need bones. For crafts. Research. Very normal errands. Bring me a stack of 20 Bones and I'll pay you for them.");
      const offer = receiveQuestIfEligible(boneCollectorQuest(), slayleigh);
      if (offer.received) markUIDirty();
      else text = offer.blockedText;
    } else if (game.completedQuests.includes("bone-ritual")) {
      text = npcDialogueContext(slayleigh, "questAfterComplete", "Remember: every bone has a memory, and every memory has a use.");
    }
    openDialogue("Heretic Slayleigh", text, slayleigh);
    renderQuestLog();
    renderUI();
  }

  function startJuanTaboDialogue() {
    const juan = game.map?.juanTabo;
    if (!juan) return;
    if (!allowNpcInteraction(juan)) return;
    const quest = game.quests.find(candidate => candidate.id === "the-white-stag");
    let text = "";
    if (game.completedQuests.includes("the-white-stag")) {
      text = npcDialogueContext(juan, "questAfterComplete", "The white stag's song still stirs the leaves for me; / I thank thee, friend, for wonder brought to hall.");
    } else if (quest && whiteStagInTownHall()) {
      text = npcDialogueContext(juan, "questComplete", "O blessed sight, pale monarch of the green! / My Sylvan heart shall ponder what thou art.");
      addLog("<b>The White Stag</b>: brought a tamed White Stag into Gandersville Town Hall.");
      completeQuest(quest);
      markUIDirty();
    } else if (quest) {
      text = npcDialogueContext(juan, "questActive", "Seek yet the glades where moonlit branches lean; / Then tame the stag and lead it to this hall.");
    } else {
      text = npcDialogueContext(juan, "questOffer", "Within these woods there walks a milk-white stag, / A myth made flesh beneath the Ganders leaves. / I touch the Sylvan art with novice hands, / And yearn to learn what secret grace it bears. / If thou canst tame the creature, bring it here; / This hall shall witness wonder, and reward.");
      const offer = receiveQuestIfEligible(whiteStagQuest(), juan);
      if (offer.received) markUIDirty();
      else text = offer.blockedText;
    }
    openDialogue("Juan Tabo", text, juan);
    renderQuestLog();
    renderUI();
  }

  function playerOwnedPet(unit) {
    if (!unit?.pet) return false;
    const masterId = String(unit.masterId || "");
    const multiplayerId = String(game.multiplayer?.id || "");
    return masterId === "player" || (multiplayerId && masterId === multiplayerId);
  }

  function playerTamedBeastNear(unit, rangeUnits = 9) {
    if (!unit) return null;
    const range = rangeUnits * 34;
    return (game.enemies || []).find(enemy => {
      if (String(enemy.type || "") !== "Beast") return false;
      if (!playerOwnedPet(enemy)) return false;
      const dx = (enemy.x || 0) - (unit.x || 0);
      const dy = (enemy.y || 0) - (unit.y || 0);
      return Math.hypot(dx, dy) <= range;
    }) || null;
  }

  function startWaldenDialogue(walden = null) {
    const speaker = walden
      || (game.map?.configuredNpcs || []).find(npc => npc.id === "naturalist-walden" || npc.name === "Naturalist Walden")
      || game.enemies?.find(npc => npc.id === "naturalist-walden" || npc.name === "Naturalist Walden");
    if (!speaker) return;
    if (!allowNpcInteraction(speaker)) return;
    const quest = game.quests.find(candidate => candidate.id === "only-you-can-prevent-forest-fires");
    const glowQuest = game.quests.find(candidate => candidate.id === "the-glow-of-the-glade");
    const leashQuest = game.quests.find(candidate => candidate.id === "a-gentle-leash");
    const thornsQuest = game.quests.find(candidate => candidate.id === "thorns-remember");
    const dustQuest = game.quests.find(candidate => candidate.id === "dust-of-the-hidden-folk");
    const leashBeast = leashQuest ? playerTamedBeastNear(speaker) : null;
    const slain = Number(quest?.kills?.Imp || 0);
    let text = "";
    if (game.completedQuests.includes("dust-of-the-hidden-folk")) {
      text = npcDialogueContext(speaker, "questAfterComplete", "The woods breathe easier, and you have learned how many ways the green can answer.");
    } else if (dustQuest?.phase === "return-to-walden") {
      text = npcDialogueContext(speaker, "questDustReady", "Good. Faerie Dust reminds even the half-present that the living world has claims on them.");
      completeQuest(dustQuest);
      markUIDirty();
    } else if (dustQuest) {
      text = npcDialogueContext(speaker, "questDustActive", "Use Faerie Dust on an incorporeal enemy, then return to me.");
    } else if (thornsQuest?.phase === "return-to-walden") {
      text = npcDialogueContext(speaker, "questThornsReady", "You felt the lesson. The forest does not need to chase every axe; sometimes the wound comes to the thorn.");
      completeQuest(thornsQuest);
      markUIDirty();
    } else if (thornsQuest) {
      text = npcDialogueContext(speaker, "questThornsActive", "Let Thorn Shield wound an enemy that strikes you. Do not seek harm, but do not waste it either.");
    } else if (leashQuest && leashBeast) {
      if (leashQuest.phase === "tame-beast") updateTameBeastObjective(leashBeast);
      text = npcDialogueContext(speaker, "questLeashReady", "A beast walked beside you by choice of magic and instinct. Remember the difference between companionship and command.");
      completeQuest(leashQuest);
      markUIDirty();
    } else if (leashQuest) {
      text = npcDialogueContext(speaker, "questLeashActive", "Tame any Beast and return while it is still with you.");
    } else if (glowQuest?.phase === "return-to-walden") {
      text = npcDialogueContext(speaker, "questGlowReady", "You marked them well. Faerie Fire does not merely shine; it tells the forest where weakness hides.");
      completeQuest(glowQuest);
      markUIDirty();
    } else if (glowQuest) {
      text = npcDialogueContext(speaker, "questGlowActive", "Mark 3 hostile mobs with Faerie Fire, then return.");
    } else if (game.completedQuests.includes("thorns-remember")) {
      text = npcDialogueContext(speaker, "questDustOffer", "Some threats do not stand fully in the world. Faerie Dust can pull the strange and hidden back toward leaf and soil. Use it on an incorporeal enemy.");
      const offer = receiveQuestIfEligible(dustOfTheHiddenFolkQuest(), speaker);
      if (offer.received) {
        giveQuestScrollIfNeeded("Scroll of Faerie Dust", "Faerie Dust");
        markUIDirty();
      } else text = offer.blockedText;
    } else if (game.completedQuests.includes("a-gentle-leash")) {
      text = npcDialogueContext(speaker, "questThornsOffer", "Mercy does not mean softness. Take Thorn Shield. Let an enemy strike you, and let the living world answer through you.");
      const offer = receiveQuestIfEligible(thornsRememberQuest(), speaker);
      if (offer.received) {
        giveQuestScrollIfNeeded("Scroll of Thorn Shield", "Thorn Shield");
        markUIDirty();
      } else text = offer.blockedText;
    } else if (game.completedQuests.includes("the-glow-of-the-glade")) {
      text = npcDialogueContext(speaker, "questLeashOffer", "Now learn the gentler bond. Take Tame Beast, befriend a Beast, and return while it still follows your call.");
      const offer = receiveQuestIfEligible(gentleLeashQuest(), speaker);
      if (offer.received) {
        giveQuestScrollIfNeeded("Scroll of Tame Beast", "Tame Beast");
        markUIDirty();
      } else text = offer.blockedText;
    } else if (game.completedQuests.includes("only-you-can-prevent-forest-fires")) {
      text = npcDialogueContext(speaker, "questGlowOffer", "The woods breathe easier with fewer Imps setting every root and burrow aflame. Now learn to reveal what threatens them. Take Faerie Fire and mark 3 hostile mobs.");
      const offer = receiveQuestIfEligible(glowOfTheGladeQuest(), speaker);
      if (offer.received) {
        giveQuestScrollIfNeeded("Scroll of Faerie Fire", "Faerie Fire");
        markUIDirty();
      } else text = offer.blockedText;
    } else if (quest && slain >= 4) {
      text = npcDialogueContext(speaker, "questComplete", "Four Imps gone. Good. The forest is resilient, but not invulnerable, especially when Infernal fire turns on Sylvan life. Take this as thanks.");
      addLog("<b>Only You Can Prevent Forest Fires</b>: reported 4 slain Imps to Naturalist Walden.");
      completeQuest(quest);
      markUIDirty();
    } else if (quest) {
      text = npcDialogueContext(speaker, "questActive", "The Imps are still loose. You have dealt with {count}/4 of them. Keep them away from the old growth.", { count: Math.min(4, slain) });
    } else {
      text = npcDialogueContext(speaker, "questOffer", "Imps are wreaking havoc on the ecosystem. Their Infernal magic is especially cruel to Sylvan creatures, who take extra damage from it. Get rid of 4 Imps, then return to me and tell me the woods can breathe easier.");
      const offer = receiveQuestIfEligible(onlyYouCanPreventForestFiresQuest(), speaker);
      if (offer.received) markUIDirty();
      else text = offer.blockedText;
    }
    openDialogue("Naturalist Walden", text, speaker);
    renderQuestLog();
    renderUI();
  }

  function startMaimonDialogue(maimon = null) {
    const speaker = maimon
      || game.map?.magisterMaimon
      || (game.map?.configuredNpcs || []).find(npc => npc.id === "magister-maimon" || npc.name === "Magister Maimon");
    if (!speaker) return;
    if (!allowNpcInteraction(speaker)) return;
    const quest = game.quests.find(candidate => candidate.id === "introduction-to-ether");
    const crowdControlQuest = game.quests.find(candidate => candidate.id === "introduction-to-crowd-control");
    let text = "";
    if (crowdControlQuest?.phase === "return-to-maimon") {
      text = npcDialogueContext(speaker, "trainerQuestReady", "You have seen it now: a battlefield is not merely won by damage, but by denial, position, and timing. Good. Continue your studies.");
      completeQuest(crowdControlQuest);
      markUIDirty();
    } else if (crowdControlQuest) {
      text = npcDialogueContext(speaker, "questFollowupActive", "Learn Pacify or Banish and use one of them in battle. When you have done so, return to me.");
    } else if (game.completedQuests.includes("introduction-to-ether") && !game.completedQuests.includes("introduction-to-crowd-control")) {
      text = npcDialogueContext(speaker, "questFollowupOffer", "Ethereal practitioners are adept at managing a battlefield. Learn Pacify or Banish, then use either spell once in battle. Afterwards, return to me for further training.");
      const offer = receiveQuestIfEligible(introductionToCrowdControlQuest(), speaker);
      if (offer.received) markUIDirty();
      else text = offer.blockedText;
    } else if (game.completedQuests.includes("introduction-to-ether")) {
      text = npcDialogueContext(speaker, "trainerQuestAfterComplete", "Ether is not merely fuel. It is the breath of the Ethereal Realm. Remember that, and your magic will obey you more readily.");
    } else if (quest && inventoryItemCount("Ether") >= 4) {
      removeInventoryStack("Ether", 4);
      text = npcDialogueContext(speaker, "trainerQuestReady", "Four measures of Ether, properly harvested. Good. Now the real lessons can begin.");
      addLog("<b>Introduction to Ether</b>: delivered 4 Ether to Magister Maimon.");
      completeQuest(quest);
      markUIDirty();
    } else if (quest) {
      text = npcDialogueContext(speaker, "trainerQuestActive", "Bring me 4 Ether harvested from Elementals. Without Ether, Ethereal magic is only an idea without a body.");
    } else {
      text = npcDialogueContext(speaker, "trainerQuestOffer", "Ether is the essential substance of the Ethereal Realm. Without it, Ethereal magic would not exist. It is harvested from Elementals, and the real lessons can begin as soon as you bring me 4 Ether.");
      const offer = receiveQuestIfEligible(introductionToEtherQuest(), speaker);
      if (offer.received) markUIDirty();
      else text = offer.blockedText;
    }
    openDialogue("Magister Maimon", text, speaker);
    renderQuestLog();
    renderUI();
  }

  function startSierraDialogue(sierra = null) {
    const speaker = sierra
      || game.map?.highPriestessSierra
      || (game.map?.configuredNpcs || []).find(npc => npc.id === "high-priestess-sierra" || npc.name === "High Priestess Sierra");
    if (!speaker) return;
    if (!allowNpcInteraction(speaker)) return;
    const mercyQuest = game.quests.find(candidate => candidate.id === "introduction-to-celestial-mercy");
    const roadQuest = game.quests.find(candidate => candidate.id === "blessing-of-the-road");
    const shieldQuest = game.quests.find(candidate => candidate.id === "a-shield-of-faith");
    const janglebonesQuest = game.quests.find(candidate => candidate.id === "janglebones-in-the-fen");
    let text = "";
    if (game.completedQuests.includes("janglebones-in-the-fen")) {
      text = npcDialogueContext(speaker, "trainerQuestAfterComplete", "You have learned speed, protection, mercy, and judgment. Carry the light into dark places, and let the dead remember dawn.");
    } else if (janglebonesQuest && Number(janglebonesQuest.kills?.Janglebones || 0) >= 1) {
      text = npcDialogueContext(speaker, "questJanglebonesReady", "Janglebones is scattered at last. Even old bones must answer when the light names them.");
      completeQuest(janglebonesQuest);
      markUIDirty();
    } else if (janglebonesQuest) {
      text = npcDialogueContext(speaker, "questJanglebonesActive", "Defeat Janglebones, the skeleton stalking the graveyard in Ganderswood Fen, then return to me.");
    } else if (game.completedQuests.includes("introduction-to-celestial-mercy")) {
      text = npcDialogueContext(speaker, "questJanglebonesOffer", "You have seen how prayer harms the restless dead. Now go to the graveyard in Ganderswood Fen and defeat Janglebones, whose bones still clatter with malice.");
      const offer = receiveQuestIfEligible(janglebonesInTheFenQuest(), speaker);
      if (offer.received) markUIDirty();
      else text = offer.blockedText;
    } else if (mercyQuest?.phase === "return-to-sierra") {
      text = npcDialogueContext(speaker, "questMercyReady", "Good. Celestial mercy restores the living, but it burns what should have stayed buried. Remember this when the dead rise hungry.");
      completeQuest(mercyQuest);
      markUIDirty();
    } else if (mercyQuest) {
      text = npcDialogueContext(speaker, "questMercyActive", "Use Basic Prayer or Heavenly Light against a Skeleton, then return to me.");
    } else if (game.completedQuests.includes("a-shield-of-faith")) {
      text = npcDialogueContext(speaker, "questMercyOffer", "Now you must learn that mercy is not weakness. Against Umbral Revenants, Celestial healing becomes judgment. Use Basic Prayer or Heavenly Light against a Skeleton, then return to me.");
      const offer = receiveQuestIfEligible(introductionToCelestialMercyQuest(), speaker);
      if (offer.received) markUIDirty();
      else text = offer.blockedText;
    } else if (shieldQuest?.phase === "return-to-sierra") {
      text = npcDialogueContext(speaker, "trainerQuestReady", "You have felt the shield answer harm with mercy. Remember that protection is not passivity; it is the courage to preserve what darkness would break.");
      completeQuest(shieldQuest);
      markUIDirty();
    } else if (shieldQuest) {
      text = npcDialogueContext(speaker, "questShieldActive", "Cast Divine Shield and let it absorb real harm. When it has turned aside a blow, return to me.");
    } else if (game.completedQuests.includes("blessing-of-the-road")) {
      text = npcDialogueContext(speaker, "questShieldOffer", "Now you must learn protection. A faithful hand does not merely heal after the wound; it sometimes prevents the wound entirely. Use Divine Shield and let it absorb damage, then return to me.");
      const offer = receiveQuestIfEligible(aShieldOfFaithQuest(), speaker);
      if (offer.received) {
        giveQuestScrollIfNeeded("Scroll of Divine Shield", "Divine Shield");
        markUIDirty();
      }
      else text = offer.blockedText;
    } else if (roadQuest?.phase === "return-to-sierra") {
      text = npcDialogueContext(speaker, "questRoadReady", "Good. Speed is a mercy too, when it carries aid where it is needed. Let your blessings move with purpose.");
      completeQuest(roadQuest);
      markUIDirty();
    } else if (roadQuest) {
      text = npcDialogueContext(speaker, "questRoadActive", "Cast Godspeed on yourself or an ally, then return to me.");
    } else {
      text = npcDialogueContext(speaker, "questRoadOffer", "You have touched the Celestial Realm deeply enough to begin proper instruction. Celestial magic first teaches swiftness in service of mercy. Take Godspeed, cast it on yourself or an ally, then return to me.");
      const offer = receiveQuestIfEligible(blessingOfTheRoadQuest(), speaker);
      if (offer.received) {
        giveQuestScrollIfNeeded("Scroll of Godspeed", "Godspeed");
        markUIDirty();
      }
      else text = offer.blockedText;
    }
    openDialogue("High Priestess Sierra", text, speaker);
    renderQuestLog();
    renderUI();
  }

  function startYantosDialogue(yantos = null) {
    const speaker = yantos
      || game.map?.lordYantos
      || (game.map?.configuredNpcs || []).find(npc => npc.id === "lord-yantos" || npc.name === "Lord Yantos");
    if (!speaker) return;
    if (!allowNpcInteraction(speaker)) return;
    const quest = game.quests.find(candidate => candidate.id === "joining-the-gandersguard");
    let text = "";
    if (game.completedQuests.includes("joining-the-gandersguard")) {
      text = npcDialogueContext(speaker, "questAfterComplete", "You have proven your mettle. Wear the Gandersguard Sigil with the dignity it deserves.");
    } else if (quest && inventoryItemCount("Goblin Head") >= 6) {
      removeInventoryStack("Goblin Head", 6);
      text = npcDialogueContext(speaker, "questComplete", "Six Goblin Heads. Grim work, but necessary. The Gandersguard has need of people with your resolve.");
      addLog("<b>Joining the Gandersguard</b>: delivered 6 Goblin Heads to Lord Yantos.");
      completeQuest(quest);
      markUIDirty();
    } else if (quest) {
      text = npcDialogueContext(speaker, "questActive", "Bring me six Goblin Heads. The Goblins need to be reminded who is in control of the Ganderswoods.");
    } else {
      text = npcDialogueContext(speaker, "questOffer", "If you are interested in joining the Gandersguard, you will need to prove your mettle. The Goblins need to be reminded who is in control of the Ganderswoods. Bring me six Goblin Heads; that should be enough to prove your merit.");
      const offer = receiveQuestIfEligible(joiningTheGandersguardQuest(), speaker);
      if (offer.received) markUIDirty();
      else text = offer.blockedText;
    }
    openDialogue("Lord Yantos", text, speaker);
    renderQuestLog();
    renderUI();
  }

  function startRaufDialogue(rauf = null) {
    const speaker = rauf
      || (game.map?.configuredNpcs || []).find(npc => npc.id === "lord-rauf" || npc.name === "Lord Rauf");
    if (!speaker) return;
    if (!allowNpcInteraction(speaker)) return;
    const joiningQuest = game.quests.find(candidate => candidate.id === "joining-the-fenguard");
    const raidQuest = game.quests.find(candidate => candidate.id === "gandersville-raid");
    let text = "";
    if (game.completedQuests.includes("gandersville-raid")) {
      text = npcDialogueContext(speaker, "questFollowupAfterComplete", "Gandersville will remember this lesson. The Fenguard remembers its own.");
    } else if (raidQuest && inventoryItemCount("Gandersguard Insignia") >= 4) {
      removeInventoryStack("Gandersguard Insignia", 4);
      text = npcDialogueContext(speaker, "questFollowupComplete", "Four Gandersguard Insignias. Good. Yantos may dress his levy in bright colors, but their courage tears loose easily enough.");
      addLog("<b>Gandersville Raid</b>: delivered 4 Gandersguard Insignias to Lord Rauf.");
      completeQuest(raidQuest);
      markUIDirty();
    } else if (raidQuest) {
      text = npcDialogueContext(speaker, "questFollowupActive", "Invade Gandersville and kill the Gandersguard Footmen who patrol the town. Bring me four Gandersguard Insignias as proof.");
    } else if (game.completedQuests.includes("joining-the-fenguard")) {
      text = npcDialogueContext(speaker, "questFollowupOffer", "You have done well enough to be useful. Now remind Gandersville who holds power in these woods. Kill the Gandersguard Footmen who patrol that hamlet and bring me four Gandersguard Insignias.");
      const offer = receiveQuestIfEligible(gandersvilleRaidQuest(), speaker);
      if (offer.received) markUIDirty();
      else text = offer.blockedText;
    } else if (joiningQuest && inventoryItemCount("Dorin's Shield") >= 1) {
      removeInventoryItemByName("Dorin's Shield");
      text = npcDialogueContext(speaker, "questComplete", "Dorin's Shield. So the old thorn is finally pulled from Fenhold's side. You have spared me a long irritation, and I will not forget it.");
      addLog("<b>Joining the Fenguard</b>: delivered Dorin's Shield to Lord Rauf.");
      completeQuest(joiningQuest);
      markUIDirty();
    } else if (joiningQuest) {
      text = npcDialogueContext(speaker, "questActive", "Kill Guard Dorin and bring me Dorin's Shield. Do this, and I will fast-track you into the Fenguard.");
    } else {
      text = npcDialogueContext(speaker, "questOffer", "Gandersville postures as if it were the heart of these woods, but Yantos is a soft-handed lord fattened on borrowed peace. Fenhold has held back worse things than his little hamlet will ever understand. Guard Dorin has been a thorn in our side for too long. Kill him and bring me Dorin's Shield, and I will fast-track you into the Fenguard.");
      const offer = receiveQuestIfEligible(joiningTheFenguardQuest(), speaker);
      if (offer.received) markUIDirty();
      else text = offer.blockedText;
    }
    openDialogue("Lord Rauf", text, speaker);
    renderQuestLog();
    renderUI();
  }

  function startSkjoldmaDialogue(skjoldma = null) {
    const speaker = skjoldma
      || game.map?.barbarianessSkjoldma
      || (game.map?.configuredNpcs || []).find(npc => npc.id === "barbarianess-skjoldma" || npc.name === "Barbarianess Skjoldma");
    if (!speaker) return;
    if (!allowNpcInteraction(speaker)) return;
    const weaponsQuest = game.quests.find(candidate => candidate.id === "introduction-to-weapons-mastery");
    const shieldsQuest = game.quests.find(candidate => candidate.id === "introduction-to-shields");
    let text = "";
    if (shieldsQuest?.phase === "return-to-skjoldma") {
      text = npcDialogueContext(speaker, "trainerQuestReady", "There. A shield is not a wall you hide behind. It is a weapon that denies your enemy their moment. Keep it close when the fight turns ugly.");
      completeQuest(shieldsQuest);
      markUIDirty();
    } else if (shieldsQuest) {
      text = npcDialogueContext(speaker, "questFollowupActive", "Equip a shield, let an enemy take a swing, and come back after you have blocked the blow.");
    } else if (game.completedQuests.includes("introduction-to-weapons-mastery") && !game.completedQuests.includes("introduction-to-shields")) {
      text = npcDialogueContext(speaker, "questFollowupOffer", "Now we speak of shields. BLOCK is your chance to turn a hit aside before it bites. A proper shield makes that chance better, and Shield Mastery sharpens it further. Equip a shield, block an attack with it, then return to me.");
      const offer = receiveQuestIfEligible(introductionToShieldsQuest(), speaker);
      if (offer.received) markUIDirty();
      else text = offer.blockedText;
    } else if (game.completedQuests.includes("introduction-to-shields")) {
      text = npcDialogueContext(speaker, "trainerQuestAfterComplete", "Weapons choose their lessons. Bows teach patience, axes teach force, maces teach interruption, daggers teach precision, and shields teach survival.");
    } else if (weaponsQuest?.phase === "return-to-skjoldma") {
      text = npcDialogueContext(speaker, "trainerQuestReady", "Good. You felt it, then. FOCUS is not luck; it is the eye finding a weak place. With Dagger Mastery, a stabbing weapon makes that eye keener, and a critical hit feeds your Mortal training.");
      completeQuest(weaponsQuest);
      markUIDirty();
    } else if (weaponsQuest) {
      text = npcDialogueContext(speaker, "trainerQuestActive", "Use a stabbing weapon. A dagger, spear, anything with a proper thrust. Land a Critical Hit with it, then come back and tell me what you learned.");
    } else {
      text = npcDialogueContext(speaker, "trainerQuestOffer", "Weapon mastery is not one lesson, but many. Bows reward clean shots, axes reward heavy hands, maces reward stunning blows, dual wielding rewards off-hand strikes, and daggers reward precision. FOCUS is your chance to land a Critical Hit. Take this Scroll of Dagger Mastery, learn it, equip a stabbing weapon, and return after you have landed a Critical Hit.");
      const offer = receiveQuestIfEligible(introductionToWeaponsMasteryQuest(), speaker);
      if (offer.received) {
        const scroll = cloneItem("Scroll of Dagger Mastery");
        if (scroll && !addInventoryItem(scroll)) {
          const point = playerDropPoint();
          dropGroundItem(scroll, point.x, point.y);
          addLog("Inventory full. <b>Scroll of Dagger Mastery</b> was dropped.");
        }
        markUIDirty();
      } else {
        text = offer.blockedText;
      }
    }
    openDialogue("Barbarianess Skjoldma", text, speaker);
    renderQuestLog();
    renderUI();
  }
  
  function startGuardDialogue(guard) {
    if (!guard || !allowNpcInteraction(guard)) return;
    openDialogue(guard.name || "Guard Dorin", `Hail, ${game.player.name || "Soulreaper"}.`, guard);
  }
  
  function completeGvadaScrollObjective() {
    return false;
  }

  function updateGvadaRealmObjective(realm) {
    const quest = gvadaQuestByPlayer();
    if (!quest || quest.phase !== "practice-spell") return false;
    if (normalizeRealm(quest.starterRealm || game.player.gvadaStarterMagic?.realm) !== normalizeRealm(realm)) return false;
    const progress = realmProgress(realm);
    const targetLevel = Number(quest.targetRealmLevel || game.player.gvadaStarterMagic?.targetRealmLevel || 1);
    if ((progress.level || 0) < targetLevel) return false;
    quest.phase = "return-to-gvada";
    quest.description = gvadaQuestDescription(normalizeRealm(realm), targetLevel, "return-to-gvada");
    quest.new = true;
    game.player.gvadaStarterMagic = {
      ...(game.player.gvadaStarterMagic || {}),
      realm: normalizeRealm(realm),
      targetRealmLevel: targetLevel,
      phase: "return-to-gvada"
    };
    game.questLogAlert = true;
    addLog("Gvada's Lesson updated: return to <b>Gvada</b> for further guidance.");
    renderQuestLog();
    return true;
  }

  function updateCrowdControlObjective(spellName, target = null) {
    if (spellName !== "Pacify" && spellName !== "Banish") return false;
    if (!target || !game.enemies.includes(target)) return false;
    const quest = game.quests.find(candidate => candidate.id === "introduction-to-crowd-control");
    if (!quest || quest.phase !== "cast-spell") return false;
    quest.phase = "return-to-maimon";
    quest.description = "You have used Pacify or Banish in battle. Return to Magister Maimon for further training.";
    quest.new = true;
    game.questLogAlert = true;
    addLog("<b>Introduction to Crowd Control</b> updated: return to Magister Maimon.");
    renderQuestLog();
    return true;
  }

  function updateBoneRitualObjective() {
    const quest = game.quests.find(candidate => candidate.id === "bone-ritual");
    if (!quest || quest.phase !== "cast-bone-ritual") return false;
    quest.phase = "return-to-slayleigh";
    quest.description = "You have used Bone Ritual. Return to Heretic Slayleigh.";
    quest.new = true;
    game.questLogAlert = true;
    addLog("<b>Bone Ritual</b> updated: return to Heretic Slayleigh.");
    renderQuestLog();
    return true;
  }

  function updateFirstFlameObjective(target = null) {
    if (!target) return false;
    const resolvedTarget = target.id
      ? (game.enemies || []).find(enemy => enemy.id === target.id) || target
      : target;
    if (normalizeRealm(resolvedTarget.realm || target.realm || "Mortal") !== "Sylvan") return false;
    const quest = game.quests.find(candidate => candidate.id === "first-flame");
    if (!quest || quest.phase !== "burn-sylvan-mobs") return false;
    const id = resolvedTarget.id || target.id || `${resolvedTarget.name || target.name || "Sylvan"}:${Math.round(resolvedTarget.x || target.x || 0)}:${Math.round(resolvedTarget.y || target.y || 0)}`;
    quest.burnedSylvanMobIds = Array.isArray(quest.burnedSylvanMobIds) ? quest.burnedSylvanMobIds : [];
    if (quest.burnedSylvanMobIds.includes(id)) return false;
    quest.burnedSylvanMobIds.push(id);
    setQuestObjectiveProgress(quest, "Sylvan Mobs Burned", quest.burnedSylvanMobIds.length);
    if (quest.burnedSylvanMobIds.length >= 4) {
      quest.phase = "return-to-slayleigh";
      quest.description = "You have burned four different Sylvan mobs with Fireball. Return to Heretic Slayleigh.";
      addLog("<b>First Flame</b> updated: return to Heretic Slayleigh.");
    } else {
      addLog(`<b>First Flame</b> updated: ${quest.burnedSylvanMobIds.length}/4 Sylvan mobs burned.`);
    }
    renderQuestLog();
    return true;
  }

  function updateControlledBurnObjective(castId, target = null) {
    if (!castId || !target) return false;
    const quest = game.quests.find(candidate => candidate.id === "controlled-burn");
    if (!quest || quest.phase !== "multi-mob-fireblast") return false;
    const targetId = target.id || `${target.name || "Mob"}:${Math.round(target.x || 0)}:${Math.round(target.y || 0)}`;
    quest.fireblastHitsByCast ||= {};
    quest.fireblastHitsByCast[castId] = Array.isArray(quest.fireblastHitsByCast[castId]) ? quest.fireblastHitsByCast[castId] : [];
    if (!quest.fireblastHitsByCast[castId].includes(targetId)) quest.fireblastHitsByCast[castId].push(targetId);
    setQuestObjectiveProgress(quest, "Multi-Mob Fireblast", quest.fireblastHitsByCast[castId].length >= 2 ? 1 : 0);
    if (quest.fireblastHitsByCast[castId].length < 2) return false;
    quest.phase = "return-to-slayleigh";
    quest.description = "You have caught more than one mob in the same Fireblast. Return to Heretic Slayleigh.";
    addLog("<b>Controlled Burn</b> updated: return to Heretic Slayleigh.");
    renderQuestLog();
    return true;
  }

  function updateTooCloseToTheFireObjective(target = null) {
    if (!target || String(target.name || "") !== "Brownie Gladekeeper") return false;
    const quest = game.quests.find(candidate => candidate.id === "too-close-to-the-fire");
    if (!quest || quest.phase !== "ring-brownie-gladekeeper") return false;
    if (quest.ringOfFireBrownieGladekeeper) return false;
    setQuestFlagObjective(quest, "ringOfFireBrownieGladekeeper", true);
    setQuestObjectiveProgress(quest, "Brownie Gladekeeper Burned", 1);
    quest.description = "You have damaged a Brownie Gladekeeper with Ring of Fire. Bring Heretic Slayleigh a Gladekeeper Brooch.";
    addLog("<b>Too Close to the Fire</b> updated: bring Heretic Slayleigh a Gladekeeper Brooch.");
    renderQuestLog();
    return true;
  }

  function updateUnholyDominionObjective(target = null) {
    if (!target || String(target.name || "") !== "Incubus") return false;
    const quest = game.quests.find(candidate => candidate.id === "unholy-dominion");
    if (!quest || quest.phase !== "dominate-incubus") return false;
    quest.phase = "return-to-slayleigh";
    quest.description = "You have used Unholy Dominion on an Incubus. Return to Heretic Slayleigh.";
    quest.new = true;
    game.questLogAlert = true;
    addLog("<b>Unholy Dominion</b> updated: return to Heretic Slayleigh.");
    renderQuestLog();
    return true;
  }

  function phaseQuestProgress(questId, expectedPhase, label, completeDescription, logText) {
    const quest = game.quests.find(candidate => candidate.id === questId);
    if (!quest || quest.phase !== expectedPhase) return false;
    setQuestObjectiveProgress(quest, label, 1);
    quest.phase = "return-to-walden";
    quest.description = completeDescription;
    addLog(logText);
    renderQuestLog();
    return true;
  }

  function hostileQuestTarget(target) {
    return Boolean(target && game.enemies.includes(target) && !target.pet && target !== game.player);
  }

  function updateFaerieFireObjective(target = null) {
    if (!hostileQuestTarget(target)) return false;
    const quest = game.quests.find(candidate => candidate.id === "the-glow-of-the-glade");
    if (!quest || quest.phase !== "mark-with-faerie-fire") return false;
    const targetId = target.id || `${target.name || "Mob"}:${Math.round(target.x || 0)}:${Math.round(target.y || 0)}`;
    quest.faerieFireTargetIds = Array.isArray(quest.faerieFireTargetIds) ? quest.faerieFireTargetIds : [];
    if (quest.faerieFireTargetIds.includes(targetId)) return false;
    quest.faerieFireTargetIds.push(targetId);
    quest.objectiveProgress ||= {};
    quest.objectiveProgress["Mobs Marked With Faerie Fire"] = quest.faerieFireTargetIds.length;
    if (quest.faerieFireTargetIds.length >= 3) {
      quest.phase = "return-to-walden";
      quest.description = "You have marked 3 hostile mobs with Faerie Fire. Return to Naturalist Walden.";
      addLog("<b>The Glow of the Glade</b> updated: return to Naturalist Walden.");
    } else {
      addLog(`<b>The Glow of the Glade</b> updated: ${quest.faerieFireTargetIds.length}/3 mobs marked.`);
    }
    quest.new = true;
    game.questLogAlert = true;
    renderQuestLog();
    return true;
  }

  function updateTameBeastObjective(beast = null) {
    if (!beast || String(beast.type || "") !== "Beast") return false;
    return phaseQuestProgress(
      "a-gentle-leash",
      "tame-beast",
      "Beast Tamed",
      "You have tamed a Beast. Return to Naturalist Walden while the lesson is still fresh.",
      "<b>A Gentle Leash</b> updated: return to Naturalist Walden."
    );
  }

  function updateThornShieldObjective(enemy = null) {
    if (!hostileQuestTarget(enemy)) return false;
    return phaseQuestProgress(
      "thorns-remember",
      "thorn-shield-retaliation",
      "Enemy Wounded by Thorn Shield",
      "Thorn Shield has wounded an enemy that struck you. Return to Naturalist Walden.",
      "<b>Thorns Remember</b> updated: return to Naturalist Walden."
    );
  }

  function updateFaerieDustObjective(target = null, wasIncorporeal = false) {
    if (!hostileQuestTarget(target)) return false;
    if (!wasIncorporeal && !target.incorporeal) return false;
    return phaseQuestProgress(
      "dust-of-the-hidden-folk",
      "dust-incorporeal-enemy",
      "Incorporeal Enemy Revealed",
      "You have used Faerie Dust on an incorporeal enemy. Return to Naturalist Walden.",
      "<b>Dust of the Hidden Folk</b> updated: return to Naturalist Walden."
    );
  }

  function updateTreantDamageObjective(source = null, target = null) {
    const name = String(source?.name || source?.type || "");
    if (!/treant/i.test(name)) return false;
    if (target && !hostileQuestTarget(target)) return false;
    return phaseQuestProgress(
      "roots-that-walk",
      "treant-damage",
      "Enemy Damaged by Treant",
      "Your summoned Treant has damaged an enemy. Return to Naturalist Walden.",
      "<b>Roots That Walk</b> updated: return to Naturalist Walden."
    );
  }

  function updateCelestialMercyObjective(spellName, healed = 0) {
    if (spellName !== "Basic Prayer" && spellName !== "Heavenly Light") return false;
    if ((Number(healed) || 0) <= 0) return false;
    const quest = game.quests.find(candidate => candidate.id === "introduction-to-celestial-mercy");
    if (!quest || quest.phase !== "heal-with-celestial-spell") return false;
    quest.phase = "return-to-sierra";
    quest.description = "You have restored HP with Celestial magic. Return to High Priestess Sierra.";
    quest.new = true;
    game.questLogAlert = true;
    addLog("<b>Introduction to Celestial Mercy</b> updated: return to High Priestess Sierra.");
    renderQuestLog();
    return true;
  }

  function updateCelestialUndeadPrayerObjective(spellName, target = null, damage = 0) {
    if (spellName !== "Basic Prayer" && spellName !== "Heavenly Light") return false;
    if ((Number(damage) || 0) <= 0) return false;
    if (!target || String(target.name || "") !== "Skeleton") return false;
    const quest = game.quests.find(candidate => candidate.id === "introduction-to-celestial-mercy");
    if (!quest || quest.phase !== "use-celestial-heal-on-skeleton") return false;
    quest.phase = "return-to-sierra";
    quest.description = "You have used Celestial healing magic against a Skeleton. Return to High Priestess Sierra.";
    quest.new = true;
    game.questLogAlert = true;
    addLog("<b>Introduction to Celestial Mercy</b> updated: return to High Priestess Sierra.");
    renderQuestLog();
    return true;
  }

  function updateGodspeedObjective() {
    const quest = game.quests.find(candidate => candidate.id === "blessing-of-the-road");
    if (!quest || quest.phase !== "cast-godspeed") return false;
    quest.phase = "return-to-sierra";
    quest.description = "You have cast Godspeed. Return to High Priestess Sierra.";
    quest.new = true;
    game.questLogAlert = true;
    addLog("<b>Blessing of the Road</b> updated: return to High Priestess Sierra.");
    renderQuestLog();
    return true;
  }

  function updateDivineShieldObjective(absorbed = 0) {
    if ((Number(absorbed) || 0) <= 0) return false;
    const quest = game.quests.find(candidate => candidate.id === "a-shield-of-faith");
    if (!quest || quest.phase !== "absorb-with-divine-shield") return false;
    quest.phase = "return-to-sierra";
    quest.description = "Your Divine Shield has absorbed damage. Return to High Priestess Sierra.";
    quest.new = true;
    game.questLogAlert = true;
    addLog("<b>A Shield of Faith</b> updated: return to High Priestess Sierra.");
    renderQuestLog();
    return true;
  }

  function updateWeaponsMasteryObjective(weapon, target = null) {
    if (!weaponHasType?.(weapon, "stabbing") && String(weapon?.animation || "").toLowerCase() !== "stab") return false;
    if (!activeSpellByName?.("Dagger Mastery")) return false;
    if (target && !game.enemies.includes(target)) return false;
    const quest = game.quests.find(candidate => candidate.id === "introduction-to-weapons-mastery");
    if (!quest || quest.phase !== "land-critical-hit") return false;
    quest.phase = "return-to-skjoldma";
    quest.description = "You have landed a Critical Hit with a stabbing weapon. Return to Barbarianess Skjoldma.";
    quest.new = true;
    game.questLogAlert = true;
    addLog("<b>Introduction to Weapons Mastery</b> updated: return to Barbarianess Skjoldma.");
    renderQuestLog();
    return true;
  }

  function updateShieldMasteryObjective() {
    const quest = game.quests.find(candidate => candidate.id === "introduction-to-shields");
    if (!quest || quest.phase !== "block-attack") return false;
    quest.phase = "return-to-skjoldma";
    quest.description = "You have blocked an attack with a shield equipped. Return to Barbarianess Skjoldma.";
    quest.new = true;
    game.questLogAlert = true;
    addLog("<b>Introduction to Shields</b> updated: return to Barbarianess Skjoldma.");
    renderQuestLog();
    return true;
  }

  function updateKillQuestObjectives(enemy) {
    if (!enemy?.name) return false;
    let changed = false;
    for (const quest of game.quests || []) {
      const objectives = questObjectivesFor(quest);
      for (const objective of objectives) {
        if (objective.type !== "kill") continue;
        if (String(objective.enemy || "") !== String(enemy.name || "")) continue;
        const required = Math.max(1, Math.floor(Number(objective.required ?? objective.count ?? 1) || 1));
        quest.kills ||= {};
        const current = Math.max(0, Math.floor(Number(quest.kills[objective.enemy]) || 0));
        if (current >= required) continue;
        quest.kills[objective.enemy] = current + 1;
        changed = true;
      }
    }
    if (!changed) return false;
    game.questLogAlert = true;
    renderQuestLog();
    return true;
  }

  window.SoulreaperQuestUI = {
    normalizeQuestState,
    renderQuestLog,
    questRewardHtml,
    openQuestLog,
    closeQuestLog,
    markQuestHovered,
    positionQuestTooltip,
    abandonQuest,
    completeQuest,
    configuredQuest,
    questById,
    questMinimumLevel,
    playerMeetsQuestMinimumLevel,
    receiveQuestIfEligible,
    questChainQuestIdForNpc,
    gvadaQuest,
    ratInfestationQuest,
    investigateRatWarrenQuest,
    ratkinMenaceQuest,
    pantryPestsQuest,
    fenPatrolQuest,
    flowersForTheGraveQuest,
    sharleneParcelQuest,
    renderDialoguePage,
    realmNameHtml,
    dialoguePageText,
    dialogueSpeakerByTitle,
    openDialogue,
    closeDialogue,
    napaeaSkullQuest,
    fenholdQuest,
    morganesReagentsQuest,
    removeGoblinMenaceQuest,
    warWithGoblinsQuest,
    antidoteForThePlagueQuest,
    morePlagueResearchQuest,
    boneCollectorQuest,
    onlyYouCanPreventForestFiresQuest,
    glowOfTheGladeQuest,
    gentleLeashQuest,
    thornsRememberQuest,
    dustOfTheHiddenFolkQuest,
    rootsThatWalkQuest,
    boneRitualQuest,
    introductionToEtherQuest,
    introductionToCrowdControlQuest,
    introductionToCelestialMercyQuest,
    blessingOfTheRoadQuest,
    aShieldOfFaithQuest,
    janglebonesInTheFenQuest,
    introductionToWeaponsMasteryQuest,
    introductionToShieldsQuest,
    joiningTheGandersguardQuest,
    joiningTheFenguardQuest,
    gandersvilleRaidQuest,
    whiteStagQuest,
    startGvadaDialogue,
    startPleezixDialogue,
    startSharleneDialogue,
    startMordrenDialogue,
    startMorganeDialogue,
    startCecilDialogue,
    startQuigleyDialogue,
    startHappieDialogue,
    startTheodoraDialogue,
    startSlayleighDialogue,
    startJuanTaboDialogue,
    startWaldenDialogue,
    startMaimonDialogue,
    startSierraDialogue,
    startSkjoldmaDialogue,
    startYantosDialogue,
    startRaufDialogue,
    startConfiguredQuestDialogue,
    handleInventoryItemDropped,
    startGuardDialogue,
    completeGvadaScrollObjective,
    updateGvadaRealmObjective,
    updateCrowdControlObjective,
    updateBoneRitualObjective,
    updateFirstFlameObjective,
    updateControlledBurnObjective,
    updateTooCloseToTheFireObjective,
    updateUnholyDominionObjective,
    updateFaerieFireObjective,
    updateTameBeastObjective,
    updateThornShieldObjective,
    updateFaerieDustObjective,
    updateTreantDamageObjective,
    updateCelestialMercyObjective,
    updateCelestialUndeadPrayerObjective,
    updateGodspeedObjective,
    updateDivineShieldObjective,
    updateWeaponsMasteryObjective,
    updateShieldMasteryObjective,
    updateKillQuestObjectives,
    startGvadaStarterQuest
  };
})();
