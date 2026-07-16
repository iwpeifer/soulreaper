// Trainer, Spellbook, and Realm window helpers for Soulreaper.
(function () {
  function openTrainer(trainer = game.map?.trainer, options = {}) {
    if (!trainer) return;
    if (!options.skipInteraction && !allowNpcInteraction(trainer)) return;
    hideItemActionMenu();
    game.activeTrainer = trainer;
    trainerWindow.classList.add("hidden");
    spellHudSignature = "";
    syncPointerPause();
    renderUI();
  }
  
  function mapTrainers() {
    const trainers = [];
    const seen = new Set();
    const addTrainer = candidate => {
      if (!candidate || typeof candidate !== "object" || !candidate.trainer) return;
      if (!Number.isFinite(Number(candidate.x)) || !Number.isFinite(Number(candidate.y))) return;
      const key = candidate.id || candidate.name || `${candidate.x},${candidate.y}`;
      if (seen.has(key)) return;
      seen.add(key);
      trainers.push(candidate);
    };
    for (const value of Object.values(game.map || {})) {
      if (Array.isArray(value)) value.forEach(addTrainer);
      else addTrainer(value);
    }
    for (const enemy of game.enemies || []) addTrainer(enemy);
    return trainers;
  }

  function handleTrainerQuestContact(trainer) {
    if (!trainer?.startsQuest || !trainer.questId) return false;
    const questUi = window.SoulreaperQuestUI || {};
    if (trainer.questId === "bone-collector") {
      if (!questUi.startSlayleighDialogue) return false;
      questUi.startSlayleighDialogue();
      return true;
    }
    if (trainer.questId === "introduction-to-ether") {
      if (!questUi.startMaimonDialogue) return false;
      questUi.startMaimonDialogue(trainer);
      return true;
    }
    if (trainer.questId === "only-you-can-prevent-forest-fires") {
      if (!questUi.startWaldenDialogue) return false;
      questUi.startWaldenDialogue(trainer);
      return true;
    }
    if (game.completedQuests.includes(trainer.questId)) return false;
    switch (trainer.questId) {
      case "the-white-stag":
        if (!questUi.startJuanTaboDialogue) return false;
        questUi.startJuanTaboDialogue();
        return true;
      case "morganes-reagents":
        if (!questUi.startMorganeDialogue) return false;
        questUi.startMorganeDialogue(trainer);
        return true;
      default:
        if (!trainer.dialogue && !trainer.dialogueContexts?.questOffer) return false;
        if (!allowNpcInteraction(trainer)) return true;
        const quest = questUi.questById?.(trainer.questId);
        const offer = questUi.receiveQuestIfEligible?.(quest, trainer);
        const contextText = trainer.dialogueContexts?.questOffer || trainer.dialogue;
        questUi.openDialogue?.(trainer.name || "NPC", offer?.blockedText || contextText, trainer);
        if (offer?.received) {
          markUIDirty();
          questUi.renderQuestLog?.();
          renderUI();
        }
        return true;
    }
  }
  
  function handleTrainerContact(trainer) {
    if (!allowNpcInteraction(trainer)) return;
    handleTrainerQuestContact(trainer);
    openTrainer(trainer, { skipInteraction: true });
  }
  
  function closeTrainer() {
    trainerWindow.classList.add("hidden");
    game.activeTrainer = null;
    spellHudSignature = "";
    updateChronicleInlineMode();
    syncPointerPause();
    renderUI();
  }
  
  function nextSpellSlotUnlock() {
    return spellSlotUnlocks.find(unlock => game.player.spellSlotsActive < unlock.slots) || null;
  }

  function trainerRealms(trainer = game.activeTrainer) {
    const realms = trainer?.trainerRealms || trainer?.realms || trainer?.trainerRealm;
    if (!realms) return Object.keys(realmInfo);
    const list = Array.isArray(realms) ? realms : [realms];
    const allowed = list.filter(realm => realmInfo[realm]);
    return allowed.length ? allowed : Object.keys(realmInfo);
  }

  function trainerCanTrainSpell(spell, trainer = game.activeTrainer) {
    return trainerRealms(trainer).includes(spell?.realm || "Mortal")
      && trainerCanTrainSpellLevel(spell, trainer);
  }

  function trainerMaxSpellLevel(trainer = game.activeTrainer) {
    const cap = Number(trainer?.trainerMaxSpellLevel);
    return Number.isFinite(cap) && cap > 0 ? Math.floor(cap) : Infinity;
  }

  function trainerCanTrainSpellLevel(spell, trainer = game.activeTrainer) {
    return spellLevel(spell) < trainerMaxSpellLevel(trainer);
  }
  
  function renderTrainerWindow() {
    const trainer = game.activeTrainer || game.map?.trainer;
    const titleEl = document.querySelector("#trainerTitle");
    if (titleEl) titleEl.textContent = trainer?.name || "Soulreaper Trainer";
    const allowedRealms = trainerRealms(trainer);
    const available = game.player.spells
      .map((spell, index) => ({ spell, index, cost: spellLevel(spell) * 5 }))
      .filter(entry => !entry.spell.static && spellLevel(entry.spell) < game.player.level && trainerCanTrainSpell(entry.spell, trainer));
    const nextUnlock = nextSpellSlotUnlock();
    const canUnlockSpellSlot = nextUnlock && game.player.level >= nextUnlock.level;
    const slotUnlockHtml = nextUnlock ? `
      <button class="spellbook-spell-button" type="button" data-unlock-spell-slot ${canUnlockSpellSlot && game.player.gold >= nextUnlock.cost ? "" : "disabled"}>
        <strong>Unlock Spell Slot</strong>
        <span>${game.player.spellSlotsActive} to ${nextUnlock.slots} / ${nextUnlock.cost} gold</span>
        <small>${canUnlockSpellSlot
          ? game.player.gold >= nextUnlock.cost
            ? "Unlocks one additional active Spell Slot."
            : "Not enough gold."
          : `Requires LVL ${nextUnlock.level}.`}</small>
      </button>
    ` : "";
    const spellTrainingHtml = available.map(({ spell, index, cost }) => {
        const realmColor = realmInfo[spell.realm]?.color || "#f2ede3";
        const shadowClass = spell.realm === "Umbral" ? " shadow-text" : "";
        const affordable = game.player.gold >= cost;
        return `
          <button class="spellbook-spell-button" type="button" data-train-spell-index="${index}" ${affordable ? "" : "disabled"}>
            <strong class="${shadowClass}" style="color:${realmColor}">${escapeHtml(spell.name)}</strong>
            <span>LVL ${spellLevel(spell)} to ${spellLevel(spell) + 1} / ${cost} gold</span>
            <small>${affordable ? escapeHtml(spellDescription({ ...spell, lvl: spellLevel(spell) + 1 })) : "Not enough gold."}</small>
          </button>
        `;
      }).join("");
    const realmNote = allowedRealms.length < Object.keys(realmInfo).length
      ? `<div class="level-note">Training: ${allowedRealms.map(realm => `<span class="${realm === "Umbral" ? "shadow-text" : ""}" style="color:${realmInfo[realm].color}">${escapeHtml(realm)}</span>`).join(", ")}</div>`
      : "";
    const levelCap = trainerMaxSpellLevel(trainer);
    const capNote = Number.isFinite(levelCap) ? `<div class="level-note">Max Spell LVL: ${levelCap}</div>` : "";
    updateHtmlIfChanged(trainerSpellList, slotUnlockHtml || spellTrainingHtml
      ? `${realmNote}${capNote}${slotUnlockHtml}${spellTrainingHtml}`
      : `<div class="level-note">No active spells can be trained right now.</div>`);
  }
  
  function trainActiveSpell(index) {
    const spell = game.player.spells[index];
    if (!spell || spell.static || spellLevel(spell) >= game.player.level) return;
    if (!trainerCanTrainSpell(spell)) {
      const cap = trainerMaxSpellLevel();
      const reason = Number.isFinite(cap) && spellLevel(spell) >= cap
        ? `past LVL ${cap}`
        : `${spell.realm} spells`;
      addLog(`<b>${game.activeTrainer?.name || "This trainer"}</b> cannot train ${reason}.`);
      renderTrainerWindow();
      return;
    }
    const cost = spellLevel(spell) * 5;
    if (game.player.gold < cost) {
      addLog("Not enough gold for training.");
      renderTrainerWindow();
      return;
    }
    game.player.gold -= cost;
    spell.lvl = spellLevel(spell) + 1;
    saveSpellLevel(spell);
    spellHudSignature = "";
    addLog(`Trained <b>${spell.name}</b> to <b>LVL ${spellLevel(spell)}</b> for <b>${cost} gold</b>.`);
    markUIDirty();
    renderTrainerWindow();
    renderUI();
  }
  
  function unlockTrainerSpellSlot() {
    const nextUnlock = nextSpellSlotUnlock();
    if (!nextUnlock || game.player.level < nextUnlock.level) return;
    if (game.player.gold < nextUnlock.cost) {
      addLog("Not enough gold to unlock a Spell Slot.");
      renderTrainerWindow();
      return;
    }
    game.player.gold -= nextUnlock.cost;
    game.player.spellSlotsActive = nextUnlock.slots;
    spellHudSignature = "";
    addLog(`Unlocked an additional <b>Spell Slot</b> for <b>${nextUnlock.cost} gold</b>.`);
    markUIDirty();
    renderTrainerWindow();
    renderSpellbookWindow();
    renderUI();
  }
  
  function openSpellbookWindow() {
    game.spellbookTab = game.spellbookTab === "lineups" ? "all" : (game.spellbookTab || "all");
    renderSpellbookWindow();
    spellbookWindow.classList.remove("hidden");
    syncPointerPause();
  }

  function openSpellLineupsWindow() {
    game.spellbookTab = "lineups";
    renderSpellbookWindow();
    spellbookWindow.classList.remove("hidden");
    syncPointerPause();
  }
  
  function closeSpellbookWindow() {
    window.hideLearnedSpellTooltip?.();
    spellbookWindow.classList.add("hidden");
    syncPointerPause();
  }
  
  function openSoulCrystalsWindow() {
    game.realmTabAlert = false;
    renderSoulCrystalsWindow();
    soulCrystalsWindow.classList.remove("hidden");
    syncPointerPause();
  }
  
  function closeSoulCrystalsWindow() {
    soulCrystalsWindow.classList.add("hidden");
    syncPointerPause();
  }
  
  function chronicleWindows() {
    return [spellbookWindow, soulCrystalsWindow, questLogWindow, trainerWindow, craftingWindow].filter(Boolean);
  }
  
  function closeChronicleWindows(except = null) {
    updateChronicleInlineMode();
  }
  
  function updateChronicleInlineMode() {
    const hasInlineWindow = chronicleWindows().some(windowEl => !windowEl.classList.contains("hidden"));
    logPanel?.classList.toggle("chronicle-window-active", hasInlineWindow);
  }
  
  function renderSoulCrystalsWindow() {
    if (!soulCrystalsList) return;
    game.skillsTab ||= "Realms";
    if (craftingSkills.includes(game.skillsTab)) game.skillsTab = "Crafting";
    if (!["Realms", "Crafting", "Factions"].includes(game.skillsTab)) game.skillsTab = "Realms";
    if (openSoulCrystalsButton) {
      openSoulCrystalsButton.classList.toggle("gold-orbit", Boolean(game.realmTabAlert));
      if (game.realmTabAlert && !openSoulCrystalsButton.querySelector(":scope > .attention-spark")) {
        openSoulCrystalsButton.insertAdjacentHTML("afterbegin", `<span class="attention-spark" aria-hidden="true"></span>`);
      } else if (!game.realmTabAlert) {
        openSoulCrystalsButton.querySelector(":scope > .attention-spark")?.remove();
      }
    }
    if (skillsTabs) {
      const tabs = ["Realms", "Crafting", "Factions"];
      updateHtmlIfChanged(skillsTabs, tabs.map(tab => `
        <button type="button" class="shop-tab${game.skillsTab === tab ? " active" : ""}" data-skills-tab="${escapeHtml(tab)}">${escapeHtml(tab)}</button>
      `).join(""));
    }
    if (game.skillsTab === "Factions") {
      const factionConfigs = window.SoulreaperWorldData?.devFactionConfigs || [];
      const standings = game.player.factionStandings || {};
      const encountered = Object.entries(standings)
        .map(([id, standing]) => {
          const faction = factionConfigs.find(config => config.id === id || String(config.name || "").toLowerCase() === id);
          return { id, name: faction?.name || id, standing: Number(standing) || 0 };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
      updateHtmlIfChanged(soulCrystalsList, encountered.length ? encountered.map(({ name, standing }) => {
        const status = standing < -10 ? "Enemy" : standing > 10 ? "Ally" : "Neutral";
        const color = status === "Enemy" ? "#d84e42" : status === "Ally" ? "#68a85e" : "#f2ede3";
        return `
          <div class="realm-progress-row" style="--realm-color:${color}">
            <strong style="color:${color}">${escapeHtml(name)}</strong>
            <div class="realm-progress-bar" aria-label="${escapeHtml(name)} standing">
              <i style="width:${Math.max(0, Math.min(100, 50 + standing * 2))}%"></i>
              <span>${escapeHtml(status)}</span>
            </div>
            <em>${standing > 0 ? "+" : ""}${formatNumber(standing)}</em>
          </div>
        `;
      }).join("") : `<div class="empty-state">No faction standing recorded.</div>`);
      return;
    }
    if (game.skillsTab === "Crafting") {
      updateHtmlIfChanged(soulCrystalsList, craftingSkills.map(skill => {
        const progress = craftingProgress(skill);
        const pct = progress.nextXp > 0 ? Math.max(0, Math.min(100, (progress.xp / progress.nextXp) * 100)) : 0;
        return `
          <div class="realm-progress-row" style="--realm-color:#d8b46a">
            <strong style="color:#d8b46a">${escapeHtml(skill)}</strong>
            <div class="realm-progress-bar" aria-label="${escapeHtml(skill)} XP">
              <i style="width:${pct}%"></i>
              <span>${formatNumber(progress.xp)} / ${formatNumber(progress.nextXp)}</span>
            </div>
            <em>LVL ${progress.level + 1}</em>
          </div>
        `;
      }).join(""));
      return;
    }
    updateHtmlIfChanged(soulCrystalsList, realmProgressRealms.map(realm => {
      const progress = realmProgress(realm);
      const color = realmUiColor(realm);
      const pct = progress.nextXp > 0 ? Math.max(0, Math.min(100, (progress.xp / progress.nextXp) * 100)) : 0;
      const shadowClass = realm === "Umbral" ? " shadow-text" : "";
      return `
        <div class="realm-progress-row" style="--realm-color:${color}">
          <strong class="${shadowClass}" style="color:${color}">${escapeHtml(realm)}</strong>
          <div class="realm-progress-bar" aria-label="${escapeHtml(realm)} Realm XP">
            <i style="width:${pct}%"></i>
            <span>${formatNumber(progress.xp)} / ${formatNumber(progress.nextXp)}</span>
          </div>
          <em>LVL ${progress.level + 1}</em>
        </div>
      `;
    }).join(""));
  }
  
  function renderSpellbookWindow() {
    if (!spellbookWindow) return;
    window.hideLearnedSpellTooltip?.();
    enforceSinglePassiveSpell?.();
    ensureSpellLineups();
    game.player.newSpellAlerts ||= [];
    syncSpellbookAttention();
    const title = document.querySelector("#spellbookTitle");
    if (!game.spellbookTab || !["all", "lineups", ...realms].includes(game.spellbookTab)) game.spellbookTab = "all";
    if (title) title.textContent = game.spellbookTab === "lineups" ? "Spell Lineups" : "Spellbook";
    document.querySelectorAll("[data-spellbook-mode]").forEach(button => {
      button.classList.toggle("active", button.dataset.spellbookMode === (game.spellbookTab === "lineups" ? "lineups" : "spells"));
    });
    updateHtmlIfChanged(spellbookSlotsReadout, "");
    spellbookRealmTabs?.classList.toggle("hidden", game.spellbookTab === "lineups");
    updateHtmlIfChanged(spellbookRealmTabs, [
      `<button class="shop-tab${game.spellbookTab === "all" ? " active" : ""}" type="button" data-realm-tab="all">All</button>`,
      ...realms.map(realm => {
      const color = realmInfo[realm]?.color || "#f2ede3";
      const shadowClass = realm === "Umbral" ? " shadow-text" : "";
      const hasRealmAlert = game.player.newSpellAlerts.some(name => spellTemplateByName(name)?.realm === realm);
      return `<button class="shop-tab${game.spellbookTab === realm ? " active" : ""}${hasRealmAlert ? " gold-orbit" : ""}${shadowClass}" type="button" data-realm-tab="${realm}" style="color:${color}">${hasRealmAlert ? `<span class="attention-spark" aria-hidden="true"></span>` : ""}${realm}</button>`;
    })].join(""));
    if (game.spellbookTab === "lineups") {
      renderSpellLineupsTab();
      window.markFloatingFitContentChanged?.("spellbook");
      return;
    }
    const alertedSpells = new Set(game.player.newSpellAlerts);
    const learned = game.player.learnedSpells
      .map(name => makePlayerSpell(name))
      .filter(spell => spell && (game.spellbookTab === "all" || spell.realm === game.spellbookTab));
    updateHtmlIfChanged(spellbookSpellList, learned.length
      ? learned.map(spell => {
        const isNewSpell = alertedSpells.has(spell.name);
        return `
        <button class="spellbook-spell-button learned-spell-icon-button${isNewSpell ? " gold-orbit" : ""}" type="button" data-learned-spell="${escapeHtml(spell.name)}" aria-label="${escapeHtml(spell.name)}">
          ${isNewSpell ? `<span class="attention-spark" aria-hidden="true"></span>` : ""}
          ${spellIconHtml(spell, "spellbook-spell-icon")}
          <span class="spellbook-spell-copy spellbook-spell-tooltip" role="tooltip">
              <strong style="color:${realmInfo[spell.realm]?.color || "#f2ede3"}" class="${spell.realm === "Umbral" ? "shadow-text" : ""}">${escapeHtml(spell.name)}</strong>
              <span>${spell.static ? "Static" : `LVL ${spellLevel(spell)}`} / ${formatNumber(spellCooldown(spell))}s${spell.range ? ` / Range ${formatNumber(spell.range)}` : ""}</span>
              <small>${escapeHtml(spellDescription(spell))}</small>
          </span>
        </button>
      `;
      }).join("")
      : `<div class="level-note">No learned ${game.spellbookTab === "all" ? "" : `${game.spellbookTab} `}spells.</div>`);
    window.markFloatingFitContentChanged?.("spellbook");
  }

  function ensureSpellLineups() {
    game.player.spellLineups = Array.isArray(game.player.spellLineups) ? game.player.spellLineups.slice(0, 6) : [];
    while (game.player.spellLineups.length < 6) game.player.spellLineups.push(null);
  }

  function currentSpellLineupSnapshot() {
    const active = (preparedActiveSpellEntries?.() || [])
      .map(({ spell }) => spell?.name)
      .filter(Boolean)
      .slice(0, game.player.spellSlotsActive || 1);
    const passive = preparedPassiveSpellEntry?.()?.spell?.name || "";
    return { active, passive };
  }

  function lineupSpellNames(lineup) {
    return [
      lineup?.passive,
      ...(Array.isArray(lineup?.active) ? lineup.active : [])
    ].filter(Boolean);
  }

  function lineupHasSpells(lineup) {
    return lineupSpellNames(lineup).length > 0;
  }

  function miniSpellIconHtml(name, extraClass = "") {
    const spell = makePlayerSpell(name) || spellTemplateByName(name);
    if (!spell) return `<span class="spell-lineup-empty-icon"></span>`;
    return spellIconHtml(spell, `spell-lineup-mini-icon ${extraClass}`.trim());
  }

  function renderSpellLineupsTab() {
    ensureSpellLineups();
    updateHtmlIfChanged(spellbookSpellList, `
      <div class="spell-lineups-panel">
        ${game.player.spellLineups.map((lineup, index) => {
          const filled = lineupHasSpells(lineup);
          const active = Array.isArray(lineup?.active) ? lineup.active : [];
          const passive = lineup?.passive || "";
          return `
            <section class="spell-lineup-card${filled ? "" : " empty"}" data-lineup-card="${index}">
              <span class="spell-lineup-number" aria-hidden="true">${index + 1}</span>
              <button class="spell-lineup-preview" type="button" data-apply-spell-lineup="${index}" ${filled ? "" : "disabled"}>
                <span class="spell-lineup-icons">
                  <span class="spell-lineup-icon-group">
                    ${passive ? miniSpellIconHtml(passive, "passive") : `<span class="spell-lineup-empty-icon"></span>`}
                  </span>
                  <span class="spell-lineup-icon-group">
                    ${active.length ? active.map(name => miniSpellIconHtml(name)).join("") : `<span class="spell-lineup-empty-icon"></span>`}
                  </span>
                </span>
              </button>
              <div class="spell-lineup-actions">
                <button class="spell-lineup-save-button" type="button" data-save-spell-lineup="${index}" aria-label="Save current spells to Lineup ${index + 1}">Save</button>
                <button class="spell-lineup-delete-button" type="button" data-delete-spell-lineup="${index}" ${filled ? "" : "disabled"} aria-label="Delete Lineup ${index + 1}">X</button>
              </div>
            </section>
          `;
        }).join("")}
      </div>
    `);
    window.markFloatingFitContentChanged?.("spellbook");
  }

  function saveSpellLineup(index) {
    ensureSpellLineups();
    if (!Number.isInteger(index) || index < 0 || index >= 6) return;
    const snapshot = currentSpellLineupSnapshot();
    if (!lineupHasSpells(snapshot)) {
      addLog("No prepared spells to save.");
      return;
    }
    game.player.spellLineups[index] = snapshot;
    markUIDirty();
    renderSpellbookWindow();
    addLog(`Spell Lineup ${index + 1} saved.`);
  }

  function deleteSpellLineup(index) {
    ensureSpellLineups();
    if (!Number.isInteger(index) || index < 0 || index >= 6) return;
    game.player.spellLineups[index] = null;
    markUIDirty();
    renderSpellbookWindow();
    addLog(`Spell Lineup ${index + 1} deleted.`);
  }

  function applySpellLineup(index) {
    ensureSpellLineups();
    const lineup = game.player.spellLineups[index];
    if (!lineupHasSpells(lineup)) return false;
    const known = new Set(game.player.learnedSpells || []);
    const hadDualWield = game.player.spells.some(spell => spell?.name === "Dual Wield");
    const nextSpells = [];
    if (lineup.passive && known.has(lineup.passive)) {
      const passive = makePlayerSpell(lineup.passive);
      if (passive?.passive) nextSpells.push(passive);
    }
    for (const name of Array.isArray(lineup.active) ? lineup.active : []) {
      if (nextSpells.filter(spell => !spell?.passive).length >= (game.player.spellSlotsActive || 1)) break;
      if (!known.has(name)) continue;
      const spell = makePlayerSpell(name);
      if (spell && !spell.passive) nextSpells.push(spell);
    }
    if (!nextSpells.length) {
      addLog(`Spell Lineup ${index + 1} has no spells you can currently prepare.`);
      return false;
    }
    for (const spell of game.player.spells || []) saveSpellLevel(spell);
    game.player.spells = nextSpells;
    enforceSinglePassiveSpell?.();
    if (hadDualWield && !game.player.spells.some(spell => spell?.name === "Dual Wield") && typeof window.unequipItem === "function") {
      window.unequipItem("Off-Hand");
    }
    game.activeSpellLineupIndex = index;
    game.pendingSpellAssignment = null;
    replaceSpellWindow?.classList.add("hidden");
    spellHudSignature = "";
    markUIDirty();
    renderSpellbookWindow();
    renderUI();
    addLog(`Spell Lineup ${index + 1} prepared.`);
    return true;
  }

  function cycleSpellLineup(direction = 1) {
    ensureSpellLineups();
    const filled = game.player.spellLineups
      .map((lineup, index) => ({ lineup, index }))
      .filter(({ lineup }) => lineupHasSpells(lineup))
      .map(({ index }) => index);
    if (!filled.length) {
      addLog("No saved Spell Lineups.");
      return false;
    }
    const current = Number.isInteger(game.activeSpellLineupIndex) && filled.includes(game.activeSpellLineupIndex)
      ? filled.indexOf(game.activeSpellLineupIndex)
      : -1;
    const next = direction < 0
      ? filled[(current <= 0 ? filled.length : current) - 1]
      : filled[(current + 1) % filled.length];
    return applySpellLineup(next);
  }
  
  function syncSpellbookAttention() {
    game.player.newSpellAlerts ||= [];
    const hasSpellbookAlert = game.player.newSpellAlerts.length > 0;
    openSpellbookButton.classList.toggle("gold-orbit", hasSpellbookAlert);
    if (hasSpellbookAlert && !openSpellbookButton.querySelector(":scope > .attention-spark")) {
      openSpellbookButton.insertAdjacentHTML("afterbegin", `<span class="attention-spark" aria-hidden="true"></span>`);
    } else if (!hasSpellbookAlert) {
      openSpellbookButton.querySelector(":scope > .attention-spark")?.remove();
    }
    document.querySelector("[data-window-toggle='spellbook']")?.classList.toggle("gold-orbit", hasSpellbookAlert);
  }
  
  function clearNewSpellAlert(name) {
    game.player.newSpellAlerts ||= [];
    const before = game.player.newSpellAlerts.length;
    game.player.newSpellAlerts = game.player.newSpellAlerts.filter(spellName => spellName !== name);
    if (game.player.newSpellAlerts.length !== before) renderSpellbookWindow();
  }
  
  function assignLearnedSpell(name) {
    if (!game.player.learnedSpells.includes(name)) return;
    if (game.player.spells.some(spell => spell.name === name)) {
      addLog(`<b>${name}</b> is already active.`);
      return;
    }
    const spell = makePlayerSpell(name);
    if (!spell) return;
    if (spell.passive) {
      const passiveEntry = preparedPassiveSpellEntry?.();
      if (passiveEntry) {
        saveSpellLevel(passiveEntry.spell);
        game.player.spells[passiveEntry.index] = spell;
        unequipOffHandWeaponWithoutDualWield(passiveEntry.spell);
        addLog(`<b>${spell.name}</b> is prepared in the Passive Spell Slot.`);
      } else {
        game.player.spells.push(spell);
        addLog(`<b>${spell.name}</b> is prepared in the Passive Spell Slot.`);
      }
      enforceSinglePassiveSpell?.();
      clearNewSpellAlert(name);
      game.pendingSpellAssignment = null;
      spellHudSignature = "";
      markUIDirty();
      renderSpellbookWindow();
      renderUI();
      return;
    }
    const activeEntries = preparedActiveSpellEntries?.() || game.player.spells.map((candidate, index) => ({ spell: candidate, index })).filter(({ spell: candidate }) => !candidate?.passive);
    if (activeEntries.length < game.player.spellSlotsActive) {
      game.player.spells.push(spell);
      clearNewSpellAlert(name);
      spellHudSignature = "";
      markUIDirty();
      renderSpellbookWindow();
      renderUI();
      addLog(`<b>${name}</b> is prepared.`);
      return;
    }
    if (activeEntries.length === 1 || game.player.spellSlotsActive <= 1) {
      game.pendingSpellAssignment = name;
      replaceActiveSpell(activeEntries[0]?.index ?? 0);
      return;
    }
    game.pendingSpellAssignment = name;
    game.pendingSpellAssignmentArmedAt = performance.now();
    spellHudSignature = "";
    renderUI();
    addLog(`Choose an active spell slot to replace with <b>${name}</b>.`);
  }
  
  function renderReplaceSpellWindow() {
    const activeEntries = preparedActiveSpellEntries?.() || game.player.spells.map((spell, index) => ({ spell, index })).filter(({ spell }) => !spell?.passive);
    updateHtmlIfChanged(replaceSpellOptions, activeEntries.map(({ spell, index }) => `
      <button class="level-button" type="button" data-replace-spell-index="${index}">
        <strong>${escapeHtml(spell.name)}</strong>
        <span>Replace with ${escapeHtml(game.pendingSpellAssignment || "")}</span>
      </button>
    `).join(""));
  }

  function unequipOffHandWeaponWithoutDualWield(replacedSpell) {
    if (replacedSpell?.name !== "Dual Wield") return;
    if (game.player.spells.some(spell => spell.name === "Dual Wield")) return;
    const offHandItem = game.player.equippedItems?.["Off-Hand"];
    if (!offHandItem?.weapon) return;
    if (typeof window.unequipItem === "function") {
      window.unequipItem("Off-Hand");
    }
  }
  
  function replaceActiveSpell(index) {
    const name = game.pendingSpellAssignment;
    const previousSpell = game.player.spells[index];
    if (previousSpell?.passive) return;
    saveSpellLevel(previousSpell);
    const spell = makePlayerSpell(name);
    if (!spell) return;
    if (spell.passive) {
      assignLearnedSpell(name);
      return;
    }
    spell.timer = playerSpellTimer(spell);
    game.player.spells[index] = spell;
    unequipOffHandWeaponWithoutDualWield(previousSpell);
    clearNewSpellAlert(name);
    game.pendingSpellAssignment = null;
    replaceSpellWindow.classList.add("hidden");
    spellHudSignature = "";
    markUIDirty();
    renderSpellbookWindow();
    renderUI();
    syncPointerPause();
    addLog(`<b>${name}</b> is prepared.`);
  }

  window.SoulreaperSpellUI = {
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
    saveSpellLineup,
    deleteSpellLineup,
    applySpellLineup,
    cycleSpellLineup,
    renderReplaceSpellWindow,
    replaceActiveSpell
  };
})();
