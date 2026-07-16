// Inventory, equipment, and shop UI helpers for Soulreaper.
(function () {
  function applyItemStats(item, direction) {
    for (const [stat, value] of Object.entries(item.stats || {})) {
      if (typeof game.player.stats[stat] !== "number") game.player.stats[stat] = 0;
      game.player.stats[stat] += value * direction;
    }
    for (const [stat, value] of Object.entries(itemEnchantmentStats(item))) {
      if (typeof game.player.stats[stat] !== "number") game.player.stats[stat] = 0;
      game.player.stats[stat] += value * direction;
    }
    for (const [realm, value] of Object.entries(item.resistances || {})) {
      game.player.resistances ||= {};
      if (typeof game.player.resistances[realm] !== "number") game.player.resistances[realm] = 0;
      game.player.resistances[realm] += value * direction;
    }
  }
  
  function resolveEquipmentSlot(item) {
    const rawSlot = String(item?.slot || "").trim();
    const normalizedSlot = rawSlot.toLowerCase();
    if (item.weapon && game.player.weapon && canDualWieldWeaponItem(item) && !game.player.equippedItems["Off-Hand"]) return "Off-Hand";
    if (normalizedSlot === "finger") {
      const ringSlots = ["Right Finger", "Left Finger"];
      return ringSlots.find(slot => !game.player.equippedItems[slot]) || ringSlots[0];
    }
    if (normalizedSlot === "wrist") {
      const wristSlots = ["Right Wrist", "Left Wrist"];
      return wristSlots.find(slot => !game.player.equippedItems[slot]) || wristSlots[0];
    }
    if (["ear", "e", "earring", "earrings"].includes(normalizedSlot)) {
      const earSlots = ["Right Ear", "Left Ear"];
      return earSlots.find(slot => !game.player.equippedItems[slot]) || earSlots[0];
    }
    if (normalizedSlot === "off-hand" || normalizedSlot === "offhand" || normalizedSlot === "off hand") return "Off-Hand";
    return item.slot;
  }
  
  function weaponFromItem(item) {
    const weapon = normalizeWeapon(item.weapon, item.name);
    return {
      name: item.name,
      ...weapon
    };
  }
  
  function positionEquipmentPopover() {
    if (!equipmentHover || !equipmentPopover) return;
    const triggerRect = equipmentHover.getBoundingClientRect();
    const width = Math.min(620, window.innerWidth - 28);
    const estimatedHeight = 170;
    const left = Math.max(10, Math.min(triggerRect.left, window.innerWidth - width - 10));
    const top = Math.max(10, Math.min(triggerRect.bottom, window.innerHeight - estimatedHeight - 10));
    equipmentPopover.style.setProperty("--equipment-popover-left", `${left}px`);
    equipmentPopover.style.setProperty("--equipment-popover-top", `${top}px`);
  }
  
  function equipInventoryItem(index) {
    const item = game.player.inventory[index];
    if (!item) return;
    const slot = resolveEquipmentSlot(item);
    if (!slot || !(slot in game.player.equipment)) {
      addLog(`<b>${item.name}</b> cannot be equipped.`);
      return;
    }
    if (slot === "Off-Hand" && isTwoHandedWeapon(game.player.weapon)) {
      addLog(`<b>${item.name}</b> cannot be equipped while using a two-handed weapon.`);
      return;
    }
    if (slot === "Off-Hand" && item.weapon && !canDualWieldWeaponItem(item)) {
      addLog(`<b>${item.name}</b> needs <b>Dual Wield</b>, must be One-Handed, and cannot be a wand to equip off-hand.`);
      return;
    }
    const oldItem = game.player.equippedItems[slot] || null;
    const offHandItem = game.player.equippedItems["Off-Hand"] || null;
    const needsOffHandSpace = slot === "Main Hand" && isTwoHandedWeapon(item.weapon) && offHandItem;
    const extraInventorySlot = game.player.inventory.findIndex((inventoryItem, slotIndex) => slotIndex !== index && inventoryItem === null);
    if (needsOffHandSpace && oldItem && extraInventorySlot < 0) {
      addLog(`<b>${item.name}</b> needs both hands. Make room in inventory before equipping it.`);
      return;
    }
  
    if (oldItem) applyItemStats(oldItem, -1);
    applyItemStats(item, 1);
  
    game.player.equippedItems[slot] = item;
    game.player.equipment[slot] = item.name;
    if (item.weapon && slot === "Main Hand") {
      game.player.weapon = weaponFromItem(item);
      game.player.attackTimer = 0;
    } else if (item.weapon && slot === "Off-Hand") {
      game.player.offHandAttackTimer = 0;
    }
    game.player.inventory[index] = oldItem;
  
    if (slot === "Main Hand" && isTwoHandedWeapon(item.weapon)) {
      if (offHandItem) {
        applyItemStats(offHandItem, -1);
        const destination = game.player.inventory[index] ? extraInventorySlot : index;
        game.player.inventory[destination] = offHandItem;
        delete game.player.equippedItems["Off-Hand"];
        game.player.equipment["Off-Hand"] = "Empty";
        addLog(`<b>${offHandItem.name}</b> moved to inventory because <b>${item.name}</b> is two-handed.`);
      }
    }
  
    addLog(oldItem
      ? `Equipped <b>${item.name}</b> to <b>${slot}</b> and moved <b>${oldItem.name}</b> to inventory.`
      : `Equipped <b>${item.name}</b> to <b>${slot}</b>.`);
    playSoundEffect("item-handle");
    markUIDirty();
    renderUI();
  }
  
  function hideItemActionMenu() {
    itemActionMenu.classList.add("hidden");
    floatingItemTooltip.classList.add("hidden");
    itemActionMenu.innerHTML = "";
    itemActionMenu.dataset.inventoryIndex = "";
    itemActionMenu.dataset.shopIndex = "";
    itemActionMenu.dataset.shopQuantity = "";
    itemActionMenu.dataset.bagSlotIndex = "";
  }
  
  function showItemActionMenu(index, event) {
    const item = game.player.inventory[index];
    if (!item) return;
    itemActionMenu.dataset.inventoryIndex = index;
    const shopOpen = !shopWindow.classList.contains("hidden") && !game.devItemShop;
    if (!shopOpen && isBagItem(item)) {
      const bagIsOpen = !bagTooltipElement().classList.contains("hidden") && openBagItem === item;
      itemActionMenu.innerHTML = `
        <div class="action-item-preview">${renderItemContents(item, true)}${itemTooltipHtml(item)}</div>
        <span>${bagSlotCount(item)} bag slots</span>
        <div class="item-actions">
          <button type="button" data-item-action="${bagIsOpen ? "close-bag" : "open-bag"}">${bagIsOpen ? "Close" : "Open"}</button>
          <button type="button" data-item-action="drop">Drop</button>
        </div>
      `;
    } else if (shopOpen && item.noSell) {
      itemActionMenu.innerHTML = `
        <div class="action-item-preview">${renderItemContents(item, true)}${itemTooltipHtml(item)}</div>
        <span>Cannot sell</span>
        <div class="item-actions single">
          <button type="button" data-item-action="cancel">Close</button>
        </div>
      `;
    } else if (shopOpen) {
      itemActionMenu.innerHTML = `
        <div class="action-item-preview">${renderItemContents(item, true)}${itemTooltipHtml(item)}</div>
        <span>Sell for ${itemSellValue(item)} gold</span>
        <div class="item-actions">
          <button type="button" data-item-action="sell">Sell</button>
          <button type="button" data-item-action="cancel">Cancel</button>
        </div>
      `;
    } else if (item.consumable) {
      itemActionMenu.innerHTML = `
          <div class="action-item-preview">${renderItemContents(item, true)}${itemTooltipHtml(item)}</div>
          ${item.stackable ? `<span>Qty ${itemQuantity(item)}</span>` : ""}
          <div class="item-actions">
            <button type="button" data-item-action="use">Use</button>
            <button type="button" data-item-action="drop">Drop</button>
          </div>
        `;
    } else if (item.stackable) {
      itemActionMenu.innerHTML = `
          <div class="action-item-preview">${renderItemContents(item, true)}${itemTooltipHtml(item)}</div>
          <span>${escapeHtml(item.slot)} / Qty ${itemQuantity(item)}</span>
          <div class="item-actions">
            <button type="button" data-item-action="drop">Drop</button>
            <button type="button" data-item-action="cancel">Cancel</button>
          </div>
        `;
    } else if (item.scroll) {
      itemActionMenu.innerHTML = `
          <div class="action-item-preview">${renderItemContents(item, true)}${itemTooltipHtml(item)}</div>
          <div class="item-actions">
            <button type="button" data-item-action="learn">Learn</button>
            <button type="button" data-item-action="drop">Drop</button>
          </div>
        `;
    } else if (item.noDrop) {
      itemActionMenu.innerHTML = `
          <div class="action-item-preview">${renderItemContents(item, true)}${itemTooltipHtml(item)}</div>
          <span>Quest item</span>
          <div class="item-actions">
            <button type="button" data-item-action="destroy">Destroy</button>
            <button type="button" data-item-action="cancel">Close</button>
          </div>
        `;
    } else {
      itemActionMenu.innerHTML = `
        <div class="action-item-preview">${renderItemContents(item, true)}${itemTooltipHtml(item)}</div>
        <span>${escapeHtml(item.slot)}</span>
        <div class="item-actions">
          <button type="button" data-item-action="equip">Equip</button>
          <button type="button" data-item-action="drop">Drop</button>
        </div>
      `;
    }
    itemActionMenu.classList.remove("hidden");
    const rect = itemActionMenu.getBoundingClientRect();
    const left = Math.min(event.clientX + 8, window.innerWidth - rect.width - 10);
    const top = Math.min(event.clientY + 8, window.innerHeight - rect.height - 10);
    itemActionMenu.style.left = `${Math.max(10, left)}px`;
    itemActionMenu.style.top = `${Math.max(10, top)}px`;
  }

  let openBagItem = null;
  let bagPanelDrag = null;

  function openedBagIndex() {
    if (openBagItem) {
      const currentIndex = game.player.inventory.findIndex(item => item === openBagItem);
      if (currentIndex >= 0) return currentIndex;
    }
    const tooltip = document.querySelector("#bagInventoryTooltip");
    const fallbackIndex = Number(tooltip?.dataset.inventoryIndex);
    return Number.isInteger(fallbackIndex) ? fallbackIndex : -1;
  }

  function closeBagInventory() {
    const tooltip = document.querySelector("#bagInventoryTooltip");
    if (tooltip) tooltip.classList.add("hidden");
    openBagItem = null;
    bagPanelDrag = null;
    window.removeEventListener("pointermove", handleBagPanelDragMove, true);
    window.removeEventListener("pointerup", finishBagPanelDrag, true);
    window.removeEventListener("pointercancel", finishBagPanelDrag, true);
  }

  function clampBagPanelPosition(tooltip, left, top) {
    const rect = tooltip.getBoundingClientRect();
    const maxLeft = Math.max(10, window.innerWidth - rect.width - 10);
    const maxTop = Math.max(10, window.innerHeight - rect.height - 10);
    tooltip.style.left = `${Math.max(10, Math.min(left, maxLeft))}px`;
    tooltip.style.top = `${Math.max(10, Math.min(top, maxTop))}px`;
  }

  function handleBagPanelDragMove(event) {
    if (!bagPanelDrag) return;
    const tooltip = bagPanelDrag.tooltip;
    clampBagPanelPosition(
      tooltip,
      event.clientX - bagPanelDrag.offsetX,
      event.clientY - bagPanelDrag.offsetY
    );
  }

  function finishBagPanelDrag() {
    bagPanelDrag = null;
    window.removeEventListener("pointermove", handleBagPanelDragMove, true);
    window.removeEventListener("pointerup", finishBagPanelDrag, true);
    window.removeEventListener("pointercancel", finishBagPanelDrag, true);
  }

  function startBagPanelDrag(event, tooltip) {
    const rect = tooltip.getBoundingClientRect();
    bagPanelDrag = {
      tooltip,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top
    };
    window.addEventListener("pointermove", handleBagPanelDragMove, true);
    window.addEventListener("pointerup", finishBagPanelDrag, true);
    window.addEventListener("pointercancel", finishBagPanelDrag, true);
  }

  function bagTooltipElement() {
    let tooltip = document.querySelector("#bagInventoryTooltip");
    if (!tooltip) {
      tooltip = document.createElement("div");
      tooltip.id = "bagInventoryTooltip";
      tooltip.className = "bag-inventory-tooltip hidden";
      tooltip.addEventListener("pointerdown", event => {
        event.preventDefault();
        event.stopPropagation();
        if (event.target.closest("[data-close-bag-panel]")) {
          closeBagInventory();
          return;
        }
        if (event.target.closest("[data-bag-panel-drag]")) {
          startBagPanelDrag(event, tooltip);
          return;
        }
        const slotButton = event.target.closest("[data-bag-slot-index]");
        if (!slotButton) return;
        const bagIndex = openedBagIndex();
        const slotIndex = Number(slotButton.dataset.bagSlotIndex);
        const bag = game.player.inventory[bagIndex];
        const item = ensureBagInventory(bag)[slotIndex];
        if (!item) return;
        showBagItemActionMenu(bagIndex, slotIndex, event);
      });
      tooltip.addEventListener("dblclick", event => {
        const slotButton = event.target.closest("[data-bag-slot-index]");
        if (!slotButton) return;
        event.preventDefault();
        event.stopPropagation();
        useBagItem(openedBagIndex(), Number(slotButton.dataset.bagSlotIndex));
      });
      document.body.appendChild(tooltip);
    }
    return tooltip;
  }

  function mainInventoryHasRoomFor(item) {
    if (!item) return true;
    if (!item.stackable) return game.player.inventory.some(inventoryItem => inventoryItem === null);
    const capacity = game.player.inventory.reduce((total, inventoryItem) => {
      if (!inventoryItem) return total + (item.maxStack || 20);
      if (sameStack(inventoryItem, item)) return total + Math.max(0, (inventoryItem.maxStack || 20) - itemQuantity(inventoryItem));
      return total;
    }, 0);
    return capacity >= itemQuantity(item);
  }

  function moveItemIntoMainInventory(item) {
    if (!item) return false;
    if (!mainInventoryHasRoomFor(item)) return false;
    if (item.stackable) {
      let remaining = itemQuantity(item);
      for (const stack of game.player.inventory) {
        if (!sameStack(stack, item)) continue;
        const space = (stack.maxStack || item.maxStack || 20) - itemQuantity(stack);
        if (space <= 0) continue;
        const moved = Math.min(space, remaining);
        stack.quantity = itemQuantity(stack) + moved;
        remaining -= moved;
        if (remaining <= 0) return true;
      }
      while (remaining > 0) {
        const slot = game.player.inventory.findIndex(inventoryItem => inventoryItem === null);
        if (slot < 0) return false;
        const moved = Math.min(item.maxStack || 20, remaining);
        game.player.inventory[slot] = cloneItemStack(item, moved);
        remaining -= moved;
      }
      return true;
    }
    const slot = game.player.inventory.findIndex(inventoryItem => inventoryItem === null);
    if (slot < 0) return false;
    game.player.inventory[slot] = item;
    return true;
  }

  function renderBagInventoryTooltip(index) {
    const bag = game.player.inventory[index];
    if (!isBagItem(bag)) {
      closeBagInventory();
      return;
    }
    openBagItem = bag;
    const bagInventory = ensureBagInventory(bag);
    const tooltip = bagTooltipElement();
    tooltip.dataset.inventoryIndex = index;
    tooltip.innerHTML = `
      <div class="bag-panel-header" data-bag-panel-drag>
        <strong>${escapeHtml(bag.name)}</strong>
        <button class="bag-panel-close" type="button" data-close-bag-panel aria-label="Close bag">x</button>
      </div>
      <div class="bag-slot-grid">
        ${bagInventory.map((item, slotIndex) => item ? `
          <button type="button" class="bag-slot filled" data-bag-slot-index="${slotIndex}" aria-label="${escapeHtml(item.name)}">
            ${renderItemContents(item, true)}
            ${itemTooltipHtml(item)}
          </button>
        ` : `
          <span class="bag-slot empty" data-bag-slot-index="${slotIndex}"></span>
        `).join("")}
      </div>
    `;
  }

  function showBagInventory(index, event) {
    const bag = game.player.inventory[index];
    if (!isBagItem(bag)) return;
    hideItemActionMenu();
    const wasHidden = bagTooltipElement().classList.contains("hidden");
    renderBagInventoryTooltip(index);
    const tooltip = bagTooltipElement();
    tooltip.classList.remove("hidden");
    if (wasHidden) clampBagPanelPosition(tooltip, event.clientX + 8, event.clientY + 8);
  }

  function toggleBagInventory(index, event) {
    const bag = game.player.inventory[index];
    if (!isBagItem(bag)) return;
    const tooltip = bagTooltipElement();
    const isOpen = !tooltip.classList.contains("hidden") && openBagItem === bag;
    if (isOpen) {
      closeBagInventory();
      return;
    }
    showBagInventory(index, event);
  }

  function moveBagItemToMainInventory(index, slotIndex) {
    const bag = game.player.inventory[index];
    const bagInventory = ensureBagInventory(bag);
    const item = bagInventory[slotIndex];
    if (!item) return;
    if (!moveItemIntoMainInventory(item)) {
      addLog("Make room in your main inventory first.");
      return;
    }
    bagInventory[slotIndex] = null;
    addLog(`Moved <b>${item.name}</b> from <b>${bag.name}</b> to inventory.`);
    markUIDirty();
    renderUI();
    renderBagInventoryTooltip(openedBagIndex());
  }

  function showBagItemActionMenu(bagIndex, slotIndex, event) {
    const bag = game.player.inventory[bagIndex];
    const item = ensureBagInventory(bag)[slotIndex];
    if (!isBagItem(bag) || !item) return;
    itemActionMenu.dataset.inventoryIndex = bagIndex;
    itemActionMenu.dataset.bagSlotIndex = slotIndex;
    const usablePotion = item.consumable && !item.consumable.realmStone && !item.consumable.enchantment;
    itemActionMenu.innerHTML = `
      <div class="action-item-preview">${renderItemContents(item, true)}${itemTooltipHtml(item)}</div>
      <span>${escapeHtml(bag.name)}</span>
      <div class="item-actions${usablePotion ? "" : " single"}">
        ${usablePotion ? `<button type="button" data-bag-item-action="use">Use</button>` : ""}
        <button type="button" data-bag-item-action="move">Move to Inventory</button>
      </div>
    `;
    itemActionMenu.classList.remove("hidden");
    const rect = itemActionMenu.getBoundingClientRect();
    const left = Math.min(event.clientX + 8, window.innerWidth - rect.width - 10);
    const top = Math.min(event.clientY + 8, window.innerHeight - rect.height - 10);
    itemActionMenu.style.left = `${Math.max(10, left)}px`;
    itemActionMenu.style.top = `${Math.max(10, top)}px`;
  }

  function moveInventoryItemToOpenBag(inventoryIndex, bagSlotIndex) {
    const bagIndex = openedBagIndex();
    const bag = game.player.inventory[bagIndex];
    const item = game.player.inventory[inventoryIndex];
    if (!isBagItem(bag) || !item) return false;
    if (inventoryIndex === bagIndex) {
      addLog("A bag cannot store itself.");
      return true;
    }
    if (isBagItem(item)) {
      addLog("Bags cannot store other bags.");
      return true;
    }
    const bagInventory = ensureBagInventory(bag);
    if (!Number.isInteger(bagSlotIndex) || bagSlotIndex < 0 || bagSlotIndex >= bagInventory.length) return false;
    const targetItem = bagInventory[bagSlotIndex] || null;
    if (targetItem && isBagItem(targetItem)) {
      addLog("Bags cannot store other bags.");
      return true;
    }
    bagInventory[bagSlotIndex] = item;
    game.player.inventory[inventoryIndex] = targetItem;
    addLog(targetItem
      ? `Swapped <b>${item.name}</b> into <b>${bag.name}</b>.`
      : `Moved <b>${item.name}</b> into <b>${bag.name}</b>.`);
    playSoundEffect("item-handle");
    markUIDirty();
    renderUI();
    renderBagInventoryTooltip(bagIndex);
    return true;
  }

  let inventoryDrag = null;

  function removeInventoryDragGhost() {
    document.querySelector("#inventoryDragGhost")?.remove();
  }

  function updateInventoryDragGhost(event) {
    if (!inventoryDrag?.ghost) return;
    inventoryDrag.ghost.style.left = `${event.clientX}px`;
    inventoryDrag.ghost.style.top = `${event.clientY}px`;
  }

  function inventoryDragItem(drag = inventoryDrag) {
    if (!drag) return null;
    if (drag.source === "shop") return activeShopInventory(currentShopkeeper())?.[drag.index] || null;
    if (drag.source === "bank") return ensureBankState().inventory[drag.index] || null;
    return game.player.inventory[drag.index] || null;
  }

  function beginInventoryDrag(event, source, index, button) {
    inventoryDrag = {
      source,
      index,
      startX: event.clientX,
      startY: event.clientY,
      dragging: false,
      sourceButton: button,
      ghost: null
    };
    button.setPointerCapture?.(event.pointerId);
    window.addEventListener("pointermove", handleInventoryDragMove, true);
    window.addEventListener("pointerup", handleInventoryDragUp, true);
    window.addEventListener("pointercancel", cancelInventoryDrag, true);
  }

  function startInventoryDrag(event) {
    if (!inventoryDrag || inventoryDrag.dragging) return;
    const dx = event.clientX - inventoryDrag.startX;
    const dy = event.clientY - inventoryDrag.startY;
    if (Math.hypot(dx, dy) < 6) return;
    const item = inventoryDragItem();
    if (!item) {
      cancelInventoryDrag();
      return;
    }
    hideItemActionMenu();
    floatingItemTooltip.classList.add("hidden");
    inventoryDrag.dragging = true;
    const ghost = document.createElement("div");
    ghost.id = "inventoryDragGhost";
    ghost.className = "inventory-drag-ghost";
    ghost.innerHTML = renderItemContents(item, true);
    document.body.appendChild(ghost);
    inventoryDrag.ghost = ghost;
    inventoryDrag.sourceButton?.classList.add("dragging");
    updateInventoryDragGhost(event);
  }

  function finishInventoryDrag(event) {
    if (!inventoryDrag) return;
    const drag = inventoryDrag;
    inventoryDrag = null;
    drag.sourceButton?.classList.remove("dragging");
    removeInventoryDragGhost();
    window.removeEventListener("pointermove", handleInventoryDragMove, true);
    window.removeEventListener("pointerup", handleInventoryDragUp, true);
    window.removeEventListener("pointercancel", cancelInventoryDrag, true);
    if (!drag.dragging) {
      const item = inventoryDragItem(drag);
      if (!item) return;
      if (drag.source === "shop") showShopBuyMenu(drag.index, event);
      else if (drag.source === "bank") return;
      else showItemActionMenu(drag.index, event);
      return;
    }
    const target = document.elementFromPoint(event.clientX, event.clientY);
    if (drag.source === "shop") {
      if (target?.closest?.("#inventoryGrid")) buyShopItem(drag.index);
      return;
    }
    if (drag.source === "bank") {
      const targetPlayerSlot = target?.closest?.("[data-inventory-index]");
      const targetIndex = targetPlayerSlot ? Number(targetPlayerSlot.dataset.inventoryIndex) : -1;
      if (Number.isInteger(targetIndex) && targetIndex >= 0 && targetIndex < game.player.inventory.length) {
        const bankInventory = ensureBankState().inventory;
        const moving = bankInventory[drag.index];
        bankInventory[drag.index] = game.player.inventory[targetIndex] || null;
        game.player.inventory[targetIndex] = moving || null;
        playSoundEffect("item-handle");
        markUIDirty();
        renderBank();
        renderUI();
      }
      return;
    }
    const targetBankSlot = target?.closest?.("[data-bank-index]");
    if (targetBankSlot && !bankWindow.classList.contains("hidden")) {
      const targetIndex = Number(targetBankSlot.dataset.bankIndex);
      const bankInventory = ensureBankState().inventory;
      if (Number.isInteger(targetIndex) && targetIndex >= 0 && targetIndex < bankInventory.length) {
        const moving = game.player.inventory[drag.index];
        game.player.inventory[drag.index] = bankInventory[targetIndex] || null;
        bankInventory[targetIndex] = moving || null;
        playSoundEffect("item-handle");
        markUIDirty();
        renderBank();
        renderUI();
      }
      return;
    }
    if (target?.closest?.("#shopInventory") && !shopWindow.classList.contains("hidden") && !game.devItemShop) {
      sellInventoryItem(drag.index);
      return;
    }
    const targetBagSlot = target?.closest?.("[data-bag-slot-index]");
    if (targetBagSlot) {
      if (moveInventoryItemToOpenBag(drag.index, Number(targetBagSlot.dataset.bagSlotIndex))) return;
    }
    const targetSlot = target?.closest?.("[data-inventory-index]");
    const targetIndex = targetSlot ? Number(targetSlot.dataset.inventoryIndex) : -1;
    if (Number.isInteger(targetIndex) && targetIndex >= 0 && targetIndex < game.player.inventory.length) {
      if (targetIndex !== drag.index) {
        const inventory = game.player.inventory;
        const moving = inventory[drag.index];
        inventory[drag.index] = inventory[targetIndex] || null;
        inventory[targetIndex] = moving || null;
        playSoundEffect("item-handle");
        markUIDirty();
        renderUI();
      }
      return;
    }
    const playCanvas = document.querySelector("#gameCanvas");
    if (playCanvas && target === playCanvas) {
      dropInventoryItem(drag.index);
    }
  }

  function cancelInventoryDrag() {
    if (!inventoryDrag) return;
    inventoryDrag.sourceButton?.classList.remove("dragging");
    inventoryDrag = null;
    removeInventoryDragGhost();
    window.removeEventListener("pointermove", handleInventoryDragMove, true);
    window.removeEventListener("pointerup", handleInventoryDragUp, true);
    window.removeEventListener("pointercancel", cancelInventoryDrag, true);
  }

  function handleInventoryDragMove(event) {
    startInventoryDrag(event);
    updateInventoryDragGhost(event);
  }

  function handleInventoryDragUp(event) {
    event.preventDefault();
    event.stopPropagation();
    finishInventoryDrag(event);
  }
  
  function showStackQuantityMenu(index, action, event) {
    const item = game.player.inventory[index];
    if (!item?.stackable) return;
    const max = itemQuantity(item);
    const label = action === "sell" ? "Sell" : "Drop";
    itemActionMenu.dataset.inventoryIndex = index;
    itemActionMenu.innerHTML = `
      <div class="action-item-preview">${renderItemContents(item, true)}${itemTooltipHtml(item)}</div>
      <span>${label} how many?</span>
      <input class="stack-slider" type="range" min="1" max="${max}" value="${max}" data-stack-slider>
      <span><b data-stack-amount>${max}</b> / ${max}${action === "sell" ? ` for <b data-stack-gold>${itemSellValue(item, max)}</b> gold` : ""}</span>
      <div class="item-actions">
        <button type="button" data-item-action="${action === "sell" ? "confirm-stack-sell" : "confirm-stack-drop"}">Confirm</button>
        <button type="button" data-item-action="cancel">Cancel</button>
      </div>
    `;
    itemActionMenu.classList.remove("hidden");
    const rect = itemActionMenu.getBoundingClientRect();
    const left = Math.min(event.clientX + 8, window.innerWidth - rect.width - 10);
    const top = Math.min(event.clientY + 8, window.innerHeight - rect.height - 10);
    itemActionMenu.style.left = `${Math.max(10, left)}px`;
    itemActionMenu.style.top = `${Math.max(10, top)}px`;
  }
  
  function showShopBuyMenu(index, event) {
    const shopkeeper = currentShopkeeper();
    const activeInventory = activeShopInventory(shopkeeper);
    const item = activeInventory?.[index];
    if (!item) return;
    const max = itemQuantity(item);
    const fullStackPrice = discountedPurchaseValue(item, shopkeeper);
    const discountNote = shopDiscountPercent(shopkeeper) ? " (discounted)" : "";
    itemActionMenu.dataset.shopIndex = index;
    itemActionMenu.dataset.shopQuantity = item.stackable ? max : 1;
    itemActionMenu.innerHTML = `
      <div class="action-item-preview">${renderItemContents(item, true)}${itemTooltipHtml(item)}</div>
      <span>${item.stackable ? "Buy how many?" : `Buy for ${fullStackPrice} gold${discountNote}`}</span>
      ${item.stackable && max > 1 ? `
        <input class="stack-slider" type="range" min="1" max="${max}" value="${max}" data-shop-stack-slider>
        <span><b data-shop-stack-amount>${max}</b> / ${max} for <b data-shop-stack-gold>${fullStackPrice}</b> gold${discountNote}</span>
      ` : ""}
      <div class="item-actions">
        <button type="button" data-item-action="buy">Buy</button>
        <button type="button" data-item-action="cancel">Cancel</button>
      </div>
    `;
    itemActionMenu.classList.remove("hidden");
    const rect = itemActionMenu.getBoundingClientRect();
    const left = Math.min(event.clientX + 8, window.innerWidth - rect.width - 10);
    const top = Math.min(event.clientY + 8, window.innerHeight - rect.height - 10);
    itemActionMenu.style.left = `${Math.max(10, left)}px`;
    itemActionMenu.style.top = `${Math.max(10, top)}px`;
  }
  
  function positionItemActionMenu(event) {
    itemActionMenu.classList.remove("hidden");
    const rect = itemActionMenu.getBoundingClientRect();
    const left = Math.min(event.clientX + 8, window.innerWidth - rect.width - 10);
    const top = Math.min(event.clientY + 8, window.innerHeight - rect.height - 10);
    itemActionMenu.style.left = `${Math.max(10, left)}px`;
    itemActionMenu.style.top = `${Math.max(10, top)}px`;
  }
  
  function showRealmStoneSpellMenu(index, event) {
    const item = game.player.inventory[index];
    const realm = item?.consumable?.realmStone;
    if (!realm) return;
    const learnedSpells = game.player.learnedSpells
      .map(name => makePlayerSpell(name))
      .filter(spell => spell?.realm === realm);
    itemActionMenu.dataset.inventoryIndex = index;
    const realmColor = realmInfo[realm]?.color || "#f2ede3";
    const shadowClass = realm === "Umbral" ? " shadow-text" : "";
    if (!learnedSpells.length) {
      itemActionMenu.innerHTML = `
        <div class="action-item-preview">${renderItemContents(item, true)}${itemTooltipHtml(item)}</div>
        <span>No learned <b class="${shadowClass.trim()}" style="color:${realmColor}">${realm}</b> spells in your Spell Book.</span>
        <div class="item-actions single">
          <button type="button" data-item-action="cancel">Close</button>
        </div>
      `;
      positionItemActionMenu(event);
      return;
    }
    itemActionMenu.innerHTML = `
      <div class="action-item-preview">${renderItemContents(item, true)}${itemTooltipHtml(item)}</div>
      <span>Lower which <b class="${shadowClass.trim()}" style="color:${realmColor}">${realm}</b> spell cooldown?</span>
      <div class="item-actions spell-target-actions">
        ${learnedSpells.map(spell => `
          <button type="button" data-item-action="apply-realm-stone" data-spell-name="${escapeHtml(spell.name)}">
            ${escapeHtml(spell.name)} (${formatNumber(spellCooldown(spell))}s)
          </button>
        `).join("")}
        <button type="button" data-item-action="cancel">Cancel</button>
      </div>
    `;
    positionItemActionMenu(event);
  }
  
  function listFromRequirement(value) {
    return Array.isArray(value) ? value.filter(Boolean) : [];
  }

  function enchantmentRequirements(enchantment) {
    const requirements = enchantment?.requirements || {};
    return {
      slots: listFromRequirement(enchantment?.requiredSlots || requirements.slots || requirements.requiredSlots),
      weaponTypes: listFromRequirement(enchantment?.requiredWeaponTypes || requirements.weaponTypes || requirements.requiredWeaponTypes),
      armorTypes: listFromRequirement(enchantment?.requiredArmorTypes || requirements.armorTypes || requirements.requiredArmorTypes)
    };
  }

  function normalizedRequirementText(value) {
    return String(value || "").trim().toLowerCase();
  }

  function candidateSlotsForItem(item, equippedSlot = "") {
    return [
      equippedSlot,
      item?.slot,
      resolveEquipmentSlot(item)
    ].filter(Boolean).map(normalizedRequirementText);
  }

  function itemWeaponForRequirement(item) {
    return item?.weapon || (item?.dmgType || item?.dice || item?.weaponTypes || item?.category ? item : null);
  }

  function itemHasWeaponRequirementType(item, type) {
    const weapon = itemWeaponForRequirement(item);
    if (!weapon) return false;
    if (typeof weaponHasType === "function") return weaponHasType(weapon, type);
    const target = normalizedRequirementText(type);
    const explicitTypes = Array.isArray(weapon.weaponTypes) ? weapon.weaponTypes : [];
    if (explicitTypes.some(candidate => normalizedRequirementText(candidate) === target)) return true;
    const text = [weapon.name, weapon.category, weapon.animation, weapon.ammo].filter(Boolean).join(" ").toLowerCase();
    if (target === "bow") return text.includes("bow") || text.includes("arrow");
    if (target === "axe") return text.includes("axe");
    if (target === "blunt") return text.includes("mace") || text.includes("club") || text.includes("hammer") || text.includes("blunt");
    if (target === "slashing") return text.includes("slash") || text.includes("sword");
    if (target === "stabbing") return text.includes("stab") || text.includes("dagger");
    if (target === "spear") return text.includes("spear");
    return false;
  }

  function itemArmorRequirementTypes(item) {
    const types = new Set((Array.isArray(item?.armorTypes) ? item.armorTypes : []).map(normalizedRequirementText));
    const text = [item?.name, item?.category, item?.slot].filter(Boolean).join(" ").toLowerCase();
    if (text.includes("shield")) types.add("shield");
    if (text.includes("cloth") || text.includes("linen") || text.includes("robe") || text.includes("spidersilk") || text.includes("sylvarweave") || text.includes("eldweave")) types.add("cloth");
    if (text.includes("leather") || text.includes("ratzkhanite")) types.add("leather");
    if (text.includes("chainmail")) types.add("chainmail");
    if (text.includes("plate") || text.includes("spangenhelm") || text.includes("cuirass") || text.includes("greaves") || text.includes("sabatons") || text.includes("gauntlets")) {
      types.add("plate mail");
    }
    return types;
  }

  function itemMatchesEnchantmentRequirements(item, enchantment, equippedSlot = "") {
    if (!item) return false;
    const requirements = enchantmentRequirements(enchantment);
    if (requirements.slots.length) {
      const slots = candidateSlotsForItem(item, equippedSlot);
      if (!requirements.slots.some(slot => slots.includes(normalizedRequirementText(slot)))) return false;
    }
    if (requirements.weaponTypes.length && !requirements.weaponTypes.some(type => itemHasWeaponRequirementType(item, type))) return false;
    if (requirements.armorTypes.length) {
      const armorTypes = itemArmorRequirementTypes(item);
      if (!requirements.armorTypes.some(type => armorTypes.has(normalizedRequirementText(type)))) return false;
    }
    return true;
  }

  function applyEnchantmentColorChannels(item, enchantment) {
    if (!item || !(enchantment?.changesColorChannels || enchantment?.applyColorChannels || enchantment?.tintItem)) return;
    const channels = enchantment.colorChannels || enchantment.graphicChannels || {};
    const normalized = Object.fromEntries(Object.entries({
      metal: channels.metal,
      gem: channels.gem,
      rune: channels.rune
    }).filter(([, value]) => value));
    if (!Object.keys(normalized).length) return;
    item.graphicChannels = { ...(item.graphicChannels || {}), ...normalized };
    item.avatarSpriteChannels = { ...(item.avatarSpriteChannels || {}), ...normalized };
    if (item.weapon) item.weapon.graphicChannels = { ...(item.weapon.graphicChannels || {}), ...normalized };
    if (item.weapon) item.weapon.avatarSpriteChannels = { ...(item.weapon.avatarSpriteChannels || {}), ...normalized };
  }

  function enchantableInventoryItems(enchantment = null) {
    return game.player.inventory
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item
        && !item.consumable
        && !item.scroll
        && item.slot
        && item.slot !== "Material"
        && item.slot !== "Quest"
        && (item.weapon || item.slot in game.player.equipment || resolveEquipmentSlot(item) in game.player.equipment)
        && (!enchantment || itemMatchesEnchantmentRequirements(item, enchantment)));
  }
  
  function enchantableEquippedItems(enchantment = null) {
    return Object.entries(game.player.equippedItems || {})
      .filter(([slot, item]) => item && (item.weapon || item.slot) && (!enchantment || itemMatchesEnchantmentRequirements(item, enchantment, slot)));
  }
  
  function showEnchantmentTargetMenu(index, event) {
    const item = game.player.inventory[index];
    const enchantmentName = item?.consumable?.enchantment;
    const enchantment = enchantmentTemplates[enchantmentName];
    if (!item || !enchantment) return;
    const inventoryTargets = enchantableInventoryItems(enchantment);
    const equippedTargets = enchantableEquippedItems(enchantment);
    const color = realmUiColor(enchantment.realm || "Mortal");
    itemActionMenu.dataset.inventoryIndex = index;
    if (!inventoryTargets.length && !equippedTargets.length) {
      itemActionMenu.innerHTML = `
        <div class="action-item-preview">${renderItemContents(item, true)}${itemTooltipHtml(item)}</div>
        <span>No eligible weapon or wearable equipment is available to enchant.</span>
        <div class="item-actions single">
          <button type="button" data-item-action="cancel">Close</button>
        </div>
      `;
      positionItemActionMenu(event);
      return;
    }
    const equippedHtml = equippedTargets.map(([slot, target]) => `
      <button type="button" data-item-action="apply-enchantment" data-enchant-target="equipped" data-enchant-slot="${escapeHtml(slot)}">
        ${itemDisplayNameHtml(target)} <small>(${escapeHtml(slot)})</small>
      </button>
    `).join("");
    const inventoryHtml = inventoryTargets.map(({ item: target, index: targetIndex }) => `
      <button type="button" data-item-action="apply-enchantment" data-enchant-target="inventory" data-enchant-index="${targetIndex}">
        ${itemDisplayNameHtml(target)} <small>(Inventory)</small>
      </button>
    `).join("");
    itemActionMenu.innerHTML = `
      <div class="action-item-preview">${renderItemContents(item, true)}${itemTooltipHtml(item)}</div>
      <span>Apply <b style="color:${color}">${escapeHtml(enchantment.name)}</b> to which item?</span>
      <div class="item-actions spell-target-actions">
        ${equippedHtml}
        ${inventoryHtml}
        <button type="button" data-item-action="cancel">Cancel</button>
      </div>
    `;
    positionItemActionMenu(event);
  }
  
  function applyEnchantmentFromInventory(index, button) {
    const sourceItem = game.player.inventory[index];
    const enchantmentName = sourceItem?.consumable?.enchantment;
    const enchantment = enchantmentTemplates[enchantmentName];
    if (!sourceItem || !enchantment) return;
    const targetType = button.dataset.enchantTarget;
    const slot = button.dataset.enchantSlot;
    const targetIndex = Number(button.dataset.enchantIndex);
    const targetItem = targetType === "equipped"
      ? game.player.equippedItems?.[slot]
      : game.player.inventory[targetIndex];
    if (!targetItem || targetItem === sourceItem) return;
    targetItem.enchantments ||= [];
    if (targetItem.enchantments.some(existing => (typeof existing === "string" ? existing : existing.name) === enchantment.name)) {
      addLog(`<b>${targetItem.name}</b> already bears <b>${enchantment.name}</b>.`);
      hideItemActionMenu();
      return;
    }
    if (!itemMatchesEnchantmentRequirements(targetItem, enchantment, targetType === "equipped" ? slot : "")) {
      addLog(`<b>${targetItem.name}</b> cannot receive <b>${enchantment.name}</b>.`);
      hideItemActionMenu();
      return;
    }
    if (targetType === "equipped") applyItemStats(targetItem, -1);
    targetItem.enchantments.push(structuredClone(enchantment));
    applyEnchantmentColorChannels(targetItem, enchantment);
    if (targetType === "equipped") applyItemStats(targetItem, 1);
    game.player.inventory[index] = null;
    addLog(`<b>${sourceItem.name}</b> imbued <b>${targetItem.name}</b> with <b>${enchantment.name}</b>.`);
    hideItemActionMenu();
    markUIDirty();
    renderShop();
    renderUI();
  }
  
  function showRewardItemPreview(name, event) {
    const item = cloneItem(name);
    if (!item) return;
    itemActionMenu.dataset.inventoryIndex = "";
    itemActionMenu.dataset.shopIndex = "";
    itemActionMenu.innerHTML = `
      <div class="action-item-preview">${renderItemContents(item, true)}${itemTooltipHtml(item)}</div>
      <div class="item-actions single">
        <button type="button" data-item-action="cancel">Close</button>
      </div>
    `;
    itemActionMenu.classList.remove("hidden");
    const rect = itemActionMenu.getBoundingClientRect();
    const left = Math.min(event.clientX + 8, window.innerWidth - rect.width - 10);
    const top = Math.min(event.clientY + 8, window.innerHeight - rect.height - 10);
    itemActionMenu.style.left = `${Math.max(10, left)}px`;
    itemActionMenu.style.top = `${Math.max(10, top)}px`;
  }
  
  function dropInventoryItem(index, quantity = null) {
    const item = game.player.inventory[index];
    if (!item) return;
    if (item.noDrop) {
      addLog(`<b>${item.name}</b> cannot be dropped.`);
      hideItemActionMenu();
      return;
    }
    const droppingOpenBag = isBagItem(item) && (item === openBagItem || index === openedBagIndex());
    const amount = item.stackable ? Math.min(quantity || itemQuantity(item), itemQuantity(item)) : 1;
    const droppedItem = item.stackable ? cloneItemStack(item, amount) : item;
    if (item.stackable && amount < itemQuantity(item)) {
      item.quantity = itemQuantity(item) - amount;
    } else {
      game.player.inventory[index] = null;
    }
    if (droppingOpenBag) closeBagInventory();
    const point = playerDropPoint();
    if (window.SoulreaperQuestUI?.handleInventoryItemDropped?.(droppedItem, point)) {
      addLog(`Placed <b>${item.name}</b>${item.stackable ? ` x${amount}` : ""}.`);
      hideItemActionMenu();
      markUIDirty();
      renderUI();
      return;
    }
    if (game.mode === "multiplayer") {
      sendMultiplayerAction({
        action: "drop:item",
        drop: serializeGroundItem({
          type: "item",
          item: droppedItem,
          x: point.x,
          y: point.y,
          radius: 14,
          age: 0,
          duration: droppedItem?.persistent ? null : 20
        })
      });
    } else {
      dropGroundItem(droppedItem, point.x, point.y);
    }
    addLog(`Dropped <b>${item.name}</b>${item.stackable ? ` x${amount}` : ""}.`);
    hideItemActionMenu();
    markUIDirty();
    renderUI();
  }

  async function destroyInventoryItem(index) {
    const item = game.player.inventory[index];
    if (!item) return;
    hideItemActionMenu();
    const confirmed = await showConfirmPrompt({
      title: "",
      text: `Are you sure you want to destroy ${item.name}?`
    });
    if (!confirmed) return;
    if (item === openBagItem) closeBagInventory();
    game.player.inventory[index] = null;
    addLog(`Destroyed <b>${item.name}</b>.`);
    markUIDirty();
    renderUI();
  }
  
  function useConsumableItem(item, removeOne) {
    if (!item?.consumable) return;
    const consumable = item.consumable;
    if (consumable.realmStone) return;
    playSoundEffect(consumable.soundEffect || item.soundEffect || "item-handle");
    removeOne();
    if (consumable.heal) {
      healPlayer(consumable.heal, item.name);
    }
    if (consumable.addStats) {
      const existing = game.player.statMods.find(mod => mod.potion && mod.color === consumable.color);
      if (existing) game.player.statMods.splice(game.player.statMods.indexOf(existing), 1);
      game.player.statMods.push({
        name: item.name,
        potion: true,
        color: consumable.color,
        remaining: consumable.duration,
        addStats: structuredClone(consumable.addStats),
        iconGraphic: item.graphic || item.name,
        iconItem: {
          name: item.name,
          graphic: item.graphic,
          graphicSize: item.graphicSize,
          graphicTint: item.graphicTint,
          graphicChannels: item.graphicChannels,
          glow: item.glow,
          glowColor: item.glowColor
        }
      });
      markUIDirty();
    }
    addLog(`Used <b>${item.name}</b>.`);
    hideItemActionMenu();
    markUIDirty();
    renderShop();
    renderUI();
  }

  function useInventoryItem(index) {
    const item = game.player.inventory[index];
    useConsumableItem(item, () => {
      if (item.stackable && itemQuantity(item) > 1) item.quantity = itemQuantity(item) - 1;
      else game.player.inventory[index] = null;
    });
  }

  function useBagItem(bagIndex, slotIndex) {
    const bag = game.player.inventory[bagIndex];
    const bagInventory = ensureBagInventory(bag);
    const item = bagInventory[slotIndex];
    if (!isBagItem(bag) || !item?.consumable || item.consumable.realmStone || item.consumable.enchantment) return;
    useConsumableItem(item, () => {
      if (item.stackable && itemQuantity(item) > 1) item.quantity = itemQuantity(item) - 1;
      else bagInventory[slotIndex] = null;
    });
    renderBagInventoryTooltip(bagIndex);
  }

  function syncOpenBagInventory() {
    if (!openBagItem) return;
    if (!game.player.inventory.includes(openBagItem)) closeBagInventory();
  }
  
  function applyRealmStone(index, spellName) {
    const item = game.player.inventory[index];
    const realm = item?.consumable?.realmStone;
    const spell = makeSpell(spellName);
    if (!item || !realm || !spell || spell.realm !== realm || !game.player.learnedSpells.includes(spellName)) return;
    game.player.inventory[index] = null;
    const current = game.player.spellCooldownMods[spellName] || 1;
    game.player.spellCooldownMods[spellName] = current * 0.85;
    for (const activeSpell of game.player.spells) {
      if (activeSpell.name === spellName) activeSpell.cooldownMultiplier = game.player.spellCooldownMods[spellName];
    }
    addLog(`<b>${item.name}</b> lowers <b>${spellName}</b> cooldown by <b>15%</b>.`);
    hideItemActionMenu();
    spellHudSignature = "";
    markUIDirty();
    renderShop();
    renderSpellbookWindow();
    renderUI();
  }
  
  function learnScroll(index) {
    const item = game.player.inventory[index];
    if (!item?.scroll) return;
    const spellName = item.scroll.spellName;
    if (game.player.learnedSpells.includes(spellName)) {
      addLog(`You already know <b>${spellName}</b>.`);
      hideItemActionMenu();
      return;
    }
    game.player.inventory[index] = null;
    game.player.learnedSpells.push(spellName);
    game.player.newSpellAlerts ||= [];
    if (!game.player.newSpellAlerts.includes(spellName)) game.player.newSpellAlerts.push(spellName);
    game.player.spellLevels ||= {};
    game.player.spellLevels[spellName] = savedSpellLevel(spellName);
    addLog(`Learned <b>${spellName}</b>.`);
    hideItemActionMenu();
    markUIDirty();
    renderShop();
    renderSpellbookWindow();
    renderUI();
  }
  
  function sellInventoryItem(index, quantity = null) {
    const item = game.player.inventory[index];
    const shopkeeper = currentShopkeeper();
    if (!item || !shopkeeper) return;
    if (item.noSell) {
      addLog(`<b>${item.name}</b> cannot be sold.`);
      hideItemActionMenu();
      return;
    }
    const amount = item.stackable ? Math.min(quantity || itemQuantity(item), itemQuantity(item)) : 1;
    const soldItem = item.stackable ? cloneItemStack(item, amount) : item;
    if (item.stackable && amount < itemQuantity(item)) {
      item.quantity = itemQuantity(item) - amount;
    } else {
      game.player.inventory[index] = null;
    }
    game.player.gold += itemSellValue(item, amount);
    if ((item.rarity || "common") !== "poor") {
      const destination = isBagItem(item)
        ? (shopkeeper.bags ||= [])
        : item.scroll
        ? shopkeeper.scrolls
        : item.consumable
          ? shopkeeper.consumables
          : isMiscItem(item)
            ? (shopkeeper.misc ||= [])
            : shopkeeper.inventory;
      addShopStack(destination, soldItem);
    }
    addLog(`Sold <b>${item.name}</b>${item.stackable ? ` x${amount}` : ""} for <b>${itemSellValue(item, amount)} gold</b>.`);
    playSoundEffect("summon-pet");
    hideItemActionMenu();
    markUIDirty();
    renderShop();
    renderUI();
  }
  
  function renderShop() {
    const shopkeeper = currentShopkeeper();
    if (!shopkeeper && !game.devItemShop) return;
    if (shopkeeper && !game.devItemShop) restockShopkeeper(shopkeeper);
    if (shopTitle) shopTitle.textContent = game.devItemShop ? "Dev Item Browser" : shopkeeper.name;
    if (shopSubtitle) shopSubtitle.textContent = game.devItemShop ? "Click any item to add it to your inventory." : "Buy supplies here. Sell items from your Inventory window.";
    if (shopGoldReadout) shopGoldReadout.textContent = game.devItemShop ? "DEV" : game.player.gold;
    const activeInventory = activeShopInventory(shopkeeper);
    shopEquipmentTab.classList.toggle("active", game.shopTab === "Equipment");
    shopConsumablesTab.classList.toggle("active", game.shopTab === "Consumables");
    shopScrollsTab.classList.toggle("active", game.shopTab === "Scrolls");
    shopMiscTab?.classList.toggle("active", game.shopTab === "Misc" || game.shopTab === "Materials");
    const emptyShopName = escapeHtml(shopkeeper?.name || "The shopkeeper");
    const shopHtml = activeInventory.length
      ? activeInventory.map((item, index) => `
        <button class="shop-item" type="button" data-shop-index="${index}">
          ${renderItemContents(item, true)}
          ${itemTooltipHtml(item)}
          ${game.devItemShop ? "" : `<span>${discountedPurchaseValue(item, shopkeeper)} gold${shopDiscountPercent(shopkeeper) ? " (-10%)" : ""}</span>`}
        </button>
      `).join("")
      : `<div class="shop-note">${game.devItemShop ? "No items in this section." : `${emptyShopName}'s pack is empty.`}</div>`;
    updateHtmlIfChanged(shopInventoryEl, shopHtml);
  }
  
  function openShop(shopkeeper = game.map?.shopkeeper) {
    if (!shopkeeper || !shopWindow.classList.contains("hidden")) return;
    if (!allowNpcInteraction(shopkeeper)) return;
    hideItemActionMenu();
    game.devItemShop = false;
    game.activeShopkeeper = shopkeeper;
    game.shopTab = defaultShopTab(shopkeeper);
    const shopFloatingState = game.floating?.shop;
    if (shopFloatingState && (shopFloatingState.width > 440 || shopFloatingState.height > 480)) {
      shopFloatingState.width = 380;
      shopFloatingState.height = 420;
      shopFloatingState.x = Math.max(8, Math.min(shopFloatingState.x || 82, window.innerWidth - shopFloatingState.width - 8));
      shopFloatingState.y = Math.max(8, Math.min(shopFloatingState.y || 82, window.innerHeight - shopFloatingState.height - 8));
    }
    renderShop();
    game.running = false;
    shopWindow.classList.remove("hidden");
    window.openInventoryWindow?.();
    syncPointerPause();
  }
  
  function closeShop() {
    hideItemActionMenu();
    shopWindow.classList.add("hidden");
    game.devItemShop = false;
    game.activeShopkeeper = null;
    syncPointerPause();
  }
  
  function openDevItemShop() {
    if (!shopWindow.classList.contains("hidden")) return;
    hideItemActionMenu();
    game.devItemShop = true;
    game.activeShopkeeper = null;
    game.shopTab = "Equipment";
    renderShop();
    game.running = false;
    shopWindow.classList.remove("hidden");
    syncPointerPause();
  }

  function buyShopItem(index, quantity = null) {
    if (game.devItemShop) {
      addDevShopItem(index);
      return;
    }
    const shopkeeper = currentShopkeeper();
    const activeInventory = activeShopInventory(shopkeeper);
    const item = activeInventory?.[index];
    if (!item) return;
    const amount = item.stackable ? Math.max(1, Math.min(Number(quantity) || itemQuantity(item), itemQuantity(item))) : 1;
    const purchaseItem = item.stackable ? cloneItemStack(item, amount) : item;
    const price = discountedPurchaseValue(purchaseItem, shopkeeper);
    if (!hasInventoryRoomFor(purchaseItem)) {
      addLog("Inventory is full.");
      return;
    }
    if (game.player.gold < price) {
      addLog(`Not enough gold for <b>${item.name}</b>.`);
      return;
    }
    game.player.gold -= price;
    addInventoryItem(purchaseItem);
    if (item.stackable && amount < itemQuantity(item)) item.quantity = itemQuantity(item) - amount;
    else activeInventory.splice(index, 1);
    if (item.scroll) completeGvadaScrollObjective();
    addLog(`Bought <b>${item.name}</b>${item.stackable ? ` x${amount}` : ""} for <b>${price} gold</b>.`);
    playSoundEffect("summon-pet");
    markUIDirty();
    renderShop();
    renderUI();
  }
  
  function currentShopkeeper() {
    return game.activeShopkeeper || game.map?.shopkeeper || null;
  }

  function shopDiscountPercent(shopkeeper = currentShopkeeper()) {
    if (!shopkeeper || game.devItemShop) return 0;
    const playerSide = typeof playerAlignment === "function" ? playerAlignment() : game.player?.alignment;
    const shopAlignment = String(shopkeeper.alignment || "Neutral").trim();
    if (playerSide === "Good" && (shopAlignment === "Good" || shopAlignment === "Neutral Good")) return 10;
    if (playerSide === "Evil" && (shopAlignment === "Evil" || shopAlignment === "Neutral Evil")) return 10;
    return 0;
  }

  function discountedPurchaseValue(item, shopkeeper = currentShopkeeper()) {
    const base = itemPurchaseValue(item);
    const discount = shopDiscountPercent(shopkeeper);
    return discount > 0 ? Math.max(1, Math.ceil(base * (100 - discount) / 100)) : base;
  }

  function moveShopBagsToEquipment(shopkeeper) {
    if (!shopkeeper?.bags?.length) return;
    shopkeeper.inventory ||= [];
    for (const bag of shopkeeper.bags) addShopStack(shopkeeper.inventory, bag);
    shopkeeper.bags.length = 0;
  }

  function defaultShopTab(shopkeeper) {
    if (!shopkeeper) return "Equipment";
    moveShopBagsToEquipment(shopkeeper);
    const tabs = [
      { name: "Equipment", items: shopkeeper.inventory || [] },
      { name: "Consumables", items: shopkeeper.consumables || [] },
      { name: "Scrolls", items: shopkeeper.scrolls || [] },
      { name: "Materials", items: shopkeeper.misc || [] }
    ];
    return tabs.reduce((best, tab) => (tab.items.length > best.items.length ? tab : best), tabs[0]).name;
  }
  
  function activeShopInventory(shopkeeper = currentShopkeeper()) {
    if (game.devItemShop) return devShopInventoryForTab(game.shopTab);
    if (!shopkeeper) return [];
    if (game.shopTab === "Consumables" || game.shopTab === "Supplies") return shopkeeper.consumables;
    if (game.shopTab === "Scrolls") return shopkeeper.scrolls;
    if (game.shopTab === "Misc" || game.shopTab === "Materials") return shopkeeper.misc ||= [];
    moveShopBagsToEquipment(shopkeeper);
    return shopkeeper.inventory ||= [];
  }
  
  function isMiscItem(item) {
    return item?.slot === "Material" || item?.category === "Material" || item?.shopTab === "Misc" || item?.shopTab === "Materials";
  }
  
  function devShopInventoryForTab(tab) {
    return Object.keys(itemTemplates)
      .map(name => cloneItem(name))
      .filter(Boolean)
      .filter(item => {
        if (tab === "Consumables" || tab === "Supplies") return Boolean(item.consumable) || item.slot === "Supply" || item.shopTab === "Supplies";
        if (tab === "Scrolls") return Boolean(item.scroll);
        if (tab === "Misc" || tab === "Materials") return isMiscItem(item);
        return !item.consumable && !item.scroll && !isMiscItem(item) && item.slot !== "Supply" && item.shopTab !== "Supplies";
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }
  
  function addDevShopItem(index) {
    const item = devShopInventoryForTab(game.shopTab)[index];
    if (!item) return;
    if (!addInventoryItem(item)) {
      addLog("Inventory is full.");
      return;
    }
    spawnFloatingText(game.player, `+${item.name}`, "#d9b95f", "rgba(0, 0, 0, 0.82)", 1.4);
    addLog(`<b>Devtools:</b> added <b>${escapeHtml(item.name)}</b> to inventory.`);
    markUIDirty();
    renderShop();
    renderUI();
  }

  function bindInventoryUIEvents() {
    inventoryGrid.addEventListener("pointerdown", event => {
      const button = event.target.closest("[data-inventory-index]");
      if (!button) return;
      event.preventDefault();
      event.stopPropagation();
      const index = Number(button.dataset.inventoryIndex);
      const item = game.player.inventory[index];
      if (!item) return;
      if (!shopWindow.classList.contains("hidden")) {
        showItemActionMenu(index, event);
        return;
      }
      if (!bankWindow.classList.contains("hidden")) {
        beginInventoryDrag(event, "inventory", index, button);
        return;
      }
      beginInventoryDrag(event, "inventory", index, button);
    });

    inventoryGrid.addEventListener("dblclick", event => {
      const button = event.target.closest("[data-inventory-index]");
      if (!button) return;
      const index = Number(button.dataset.inventoryIndex);
      const item = game.player.inventory[index];
      if (!item) return;
      event.preventDefault();
      event.stopPropagation();
      if (isBagItem(item)) toggleBagInventory(index, event);
      else if (item.scroll) {
        hideItemActionMenu();
        learnScroll(index);
      }
      else if (item.consumable && !item.consumable.realmStone && !item.consumable.enchantment) {
        hideItemActionMenu();
        useInventoryItem(index);
      }
      else if (item.slot && item.slot !== "Material" && !item.consumable && !item.scroll) {
        hideItemActionMenu();
        equipInventoryItem(index);
      }
    });
    
    equipmentGrid.addEventListener("pointerdown", event => {
      const button = event.target.closest("[data-equipment-slot]");
      if (!button) return;
      event.preventDefault();
      event.stopPropagation();
      unequipItem(button.dataset.equipmentSlot);
    });
    
    itemActionMenu.addEventListener("pointerdown", event => {
      const button = event.target.closest("[data-item-action]");
      const bagButton = event.target.closest("[data-bag-item-action]");
      if (bagButton) {
        event.preventDefault();
        event.stopPropagation();
        const bagIndex = Number(itemActionMenu.dataset.inventoryIndex);
        const slotIndex = Number(itemActionMenu.dataset.bagSlotIndex);
        hideItemActionMenu();
        if (bagButton.dataset.bagItemAction === "use") useBagItem(bagIndex, slotIndex);
        else if (bagButton.dataset.bagItemAction === "move") moveBagItemToMainInventory(bagIndex, slotIndex);
        return;
      }
      if (!button) return;
      event.preventDefault();
      event.stopPropagation();
      const index = Number(itemActionMenu.dataset.inventoryIndex);
      if (button.dataset.itemAction === "equip") {
        hideItemActionMenu();
        equipInventoryItem(index);
      } else if (button.dataset.itemAction === "open-bag") {
        showBagInventory(index, event);
      } else if (button.dataset.itemAction === "close-bag") {
        hideItemActionMenu();
        closeBagInventory();
      } else if (button.dataset.itemAction === "use") {
        const item = game.player.inventory[index];
        if (item?.consumable?.realmStone) showRealmStoneSpellMenu(index, event);
        else if (item?.consumable?.enchantment) showEnchantmentTargetMenu(index, event);
        else useInventoryItem(index);
      } else if (button.dataset.itemAction === "apply-realm-stone") {
        applyRealmStone(index, button.dataset.spellName);
      } else if (button.dataset.itemAction === "apply-enchantment") {
        applyEnchantmentFromInventory(index, button);
      } else if (button.dataset.itemAction === "learn") {
        learnScroll(index);
      } else if (button.dataset.itemAction === "drop") {
        const item = game.player.inventory[index];
        if (item?.stackable && itemQuantity(item) > 1) showStackQuantityMenu(index, "drop", event);
        else dropInventoryItem(index);
      } else if (button.dataset.itemAction === "destroy") {
        destroyInventoryItem(index);
      } else if (button.dataset.itemAction === "sell") {
        const item = game.player.inventory[index];
        if (item?.stackable && itemQuantity(item) > 1) showStackQuantityMenu(index, "sell", event);
        else sellInventoryItem(index);
      } else if (button.dataset.itemAction === "confirm-stack-drop") {
        const amount = Number(itemActionMenu.querySelector("[data-stack-slider]")?.value || 1);
        dropInventoryItem(index, amount);
      } else if (button.dataset.itemAction === "confirm-stack-sell") {
        const amount = Number(itemActionMenu.querySelector("[data-stack-slider]")?.value || 1);
        sellInventoryItem(index, amount);
      } else if (button.dataset.itemAction === "buy") {
        const shopIndex = Number(itemActionMenu.dataset.shopIndex);
        const quantity = Number(itemActionMenu.dataset.shopQuantity) || null;
        hideItemActionMenu();
        buyShopItem(shopIndex, quantity);
      } else if (button.dataset.itemAction === "cancel") {
        hideItemActionMenu();
      }
    });
    
    itemActionMenu.addEventListener("input", event => {
      const slider = event.target.closest("[data-stack-slider]");
      if (!slider) return;
      const index = Number(itemActionMenu.dataset.inventoryIndex);
      const item = game.player.inventory[index];
      const amount = Number(slider.value);
      const amountEl = itemActionMenu.querySelector("[data-stack-amount]");
      const goldEl = itemActionMenu.querySelector("[data-stack-gold]");
      if (amountEl) amountEl.textContent = amount;
      if (goldEl && item) goldEl.textContent = itemSellValue(item, amount);
    });
    
    itemActionMenu.addEventListener("input", event => {
      const slider = event.target.closest("[data-shop-stack-slider]");
      if (!slider) return;
      const shopkeeper = currentShopkeeper();
      const item = activeShopInventory(shopkeeper)?.[Number(itemActionMenu.dataset.shopIndex)];
      const amount = Number(slider.value) || 1;
      itemActionMenu.dataset.shopQuantity = amount;
      const amountEl = itemActionMenu.querySelector("[data-shop-stack-amount]");
      const goldEl = itemActionMenu.querySelector("[data-shop-stack-gold]");
      if (amountEl) amountEl.textContent = amount;
      if (goldEl && item) goldEl.textContent = discountedPurchaseValue(cloneItemStack(item, amount), shopkeeper);
    });
    
    petCommandMenu.addEventListener("pointerdown", event => {
      event.preventDefault();
      event.stopPropagation();
      const button = event.target.closest("[data-pet-action]");
      if (!button) return;
      const pet = game.enemies.find(enemy => enemy.id === game.activePetMenuId && isOwnPet(enemy));
      if (!pet) {
        hidePetCommandMenu();
        return;
      }
      if (button.dataset.petAction === "attack") {
        game.pendingPetAttackId = pet.id;
        updatePetTargetCursor();
        hidePetCommandMenu();
        addLog(`Choose a target for <b>${pet.name}</b>.`);
      } else if (button.dataset.petAction === "guard") {
        togglePetGuard(pet);
        hidePetCommandMenu();
      } else if (button.dataset.petAction === "release") {
        releasePet(pet);
        hidePetCommandMenu();
      }
    });
    
    shopInventoryEl.addEventListener("pointerdown", event => {
      const button = event.target.closest("[data-shop-index]");
      if (!button) return;
      event.preventDefault();
      event.stopPropagation();
      if (game.devItemShop) {
        buyShopItem(Number(button.dataset.shopIndex));
        return;
      }
      beginInventoryDrag(event, "shop", Number(button.dataset.shopIndex), button);
    });
    
    shopEquipmentTab.addEventListener("click", () => {
      game.shopTab = "Equipment";
      hideItemActionMenu();
      renderShop();
    });
    
    shopConsumablesTab.addEventListener("click", () => {
      game.shopTab = "Consumables";
      hideItemActionMenu();
      renderShop();
    });
    
    shopScrollsTab.addEventListener("click", () => {
      game.shopTab = "Scrolls";
      hideItemActionMenu();
      renderShop();
    });
    
    shopMiscTab?.addEventListener("click", () => {
      game.shopTab = "Materials";
      hideItemActionMenu();
      renderShop();
    });
    
    closeShopButton.addEventListener("click", closeShop);

    bankInventoryEl?.addEventListener("pointerdown", event => {
      const button = event.target.closest("[data-bank-index]");
      if (!button) return;
      event.preventDefault();
      event.stopPropagation();
      const index = Number(button.dataset.bankIndex);
      if (!ensureBankState().inventory[index]) return;
      beginInventoryDrag(event, "bank", index, button);
    });

  }

  window.SoulreaperInventoryUI = {
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
  };
})();
