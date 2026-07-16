// Spell templates and spell icon lookup extracted from game.js. Spell behavior functions are intentionally kept with the templates.
(function () {
function summonPetSpell({ name, realm, templateName, iconText }) {
  return {
    name,
    realm,
    summonTemplate: templateName,
    lvl: 1,
    cooldown: 30,
    range: 0,
    manualCast: true,
    autocast: false,
    autocastAvailable: false,
    text: `${iconText || name} summons a level [LVL] ${templateName} pet. Requires [LVL] Ether.`,
    formulas: {
      etherCost: { type: "cost", base: 0, perLevel: 1 },
      summonLevel: { type: "level", base: 0, perLevel: 1 }
    },
    cast(game) {
      const lvl = spellLevel(this);
      const cost = lvl;
      if (inventoryItemCount("Ether") < cost) {
        addThrottledLog(`<b>${this.name}</b> needs ${formatNumber(cost)} Ether.`, null, "chronicle", `spell-reagent:${this.name}:Ether:${cost}`);
        spawnFloatingText(game.player, "Need Ether", realmInfo[this.realm]?.color || "#d9c7ff", "#d9c7ff");
        return false;
      }
      removeInventoryStack("Ether", cost);
      markUIDirty();
      removeInvisibility(game.player);
      const point = randomWalkablePointNear(game.player.x, game.player.y, game.player.radius + 36, game.player.radius + 96)
        || { x: game.player.x + game.player.radius + 46, y: game.player.y };
      spawnRaiseSkeletonSmoke(point.x, point.y);
      if (game.mode === "multiplayer" && game.multiplayer.connected) {
        sendMultiplayerAction({
          action: "spell:summon",
          spellName: this.name,
          templateName,
          lvl,
          x: point.x,
          y: point.y
        });
        return true;
      }
      summonPetByTemplate(templateName, lvl, point.x, point.y, {
        masterId: "player",
        masterName: game.player.name || "Soulreaper"
      });
      return true;
    }
  };
}

function hypnotizeDuration(spell, target) {
  const maxDuration = Math.max(0, spellValue(spell, "duration", 0, 0.5));
  if (maxDuration <= 0) return 0;
  const rolled = randomBetween(Math.max(0.2, maxDuration * 0.35), maxDuration);
  const resist = Math.max(0, realmResist(target, "Ethereal"));
  const multiplier = Math.max(0.1, 1 - resist * 0.1);
  return roundUpTenth(Math.max(0.1, rolled * multiplier));
}

const starterSpells = [
  {
    name: "Magic Missile",
    realm: "Ethereal",
    lvl: 1,
    cooldown: 4,
    range: 10,
    manualTarget: true,
    autocast: true,
    text: "Fires a projectile at the nearest enemy, dealing 7 Ethereal damage.",
    formulas: {
      damage: { type: "damage", base: 6, perLevel: 1, stat: "INT", statScale: 1 }
    },
    cast(game, target) {
      if (!target) return false;
      const damage = spellDamageValue(this, "damage", 6, 1);
      removeInvisibility(game.player);
      if (game.mode === "multiplayer" && target.id) {
        sendMultiplayerAction({
          action: "spell:projectile",
          spellName: "Magic Missile",
          enemyId: target.id,
          damage,
          realm: "Ethereal",
          color: "#8db8ff",
          label: "Magic Missile",
          radius: 5,
          speed: 360,
          trail: "#4068a8",
          dmgType: "Magical",
          range: this.range,
          projectileAnimation: "magic missile",
          realmXp: true
        });
        return true;
      }
      game.projectiles.push(makeProjectile({
        source: game.player,
        target,
        damage,
        realm: "Ethereal",
        color: "#8db8ff",
        label: "Magic Missile",
        radius: 5,
        speed: 360,
        trail: "#4068a8",
        dmgType: "Magical",
        projectileAnimation: "magic missile",
        realmXp: true
      }));
      return true;
    }
  },
  {
    name: "Rage",
    realm: "Mortal",
    lvl: 1,
    cooldown: 30,
    range: 0,
    manualCast: true,
    autocast: true,
    text: "Increases ATK, DEF, and AGL for 8 seconds. Mortal damage dealt while enraged grants Mortal Realm XP.",
    duration: 8,
    formulas: {
      attackBonus: { type: "stat", base: 0, perLevel: 0.5 },
      defenseBonus: { type: "stat", base: 0, perLevel: 1 },
      agilityBonus: { type: "stat", base: 0, perLevel: 1 }
    },
    cast(game) {
      const duration = Number(this.duration ?? 8);
      const attackBonus = spellValue(this, "attackBonus", 0, 0.5);
      const defenseBonus = spellValue(this, "defenseBonus", 0, 1);
      const agilityBonus = spellValue(this, "agilityBonus", 0, 1);
      applyUnitStatMod(game.player, {
        name: "Rage",
        remaining: duration,
        addStats: { ATK: attackBonus, DEF: defenseBonus, AGL: agilityBonus }
      });
      spawnFloatingText(game.player, "RAGE", realmInfo.Mortal.color);
      return true;
    }
  },
  {
    name: "Archery Mastery",
    realm: "Mortal",
    lvl: 1,
    cooldown: 0,
    range: 0,
    passive: true,
    text: "Decreases Delay of equipped bows by 3 per LVL.",
    formulas: {
      bowDelayReduction: { type: "stat", base: 0, perLevel: 3 }
    },
    cast() {
      return false;
    }
  },
  {
    name: "Axe Mastery",
    realm: "Mortal",
    lvl: 1,
    cooldown: 0,
    range: 0,
    passive: true,
    text: "Decreases Delay of wielded axes by 3 per LVL.",
    formulas: {
      axeDelayReduction: { type: "stat", base: 0, perLevel: 3 }
    },
    cast() {
      return false;
    }
  },
  {
    name: "Mace Mastery",
    realm: "Mortal",
    lvl: 1,
    cooldown: 0,
    range: 0,
    passive: true,
    text: "Increases the stun chance of wielded maces by 1% per LVL.",
    formulas: {
      stunChanceBonus: { type: "stat", base: 0, perLevel: 1 }
    },
    cast() {
      return false;
    }
  },
  {
    name: "Dagger Mastery",
    realm: "Mortal",
    lvl: 1,
    cooldown: 0,
    range: 0,
    passive: true,
    text: "Increases FOCUS by 4 plus 1 per LVL while a Stab weapon is equipped. Critical hits with Stab weapons grant Mortal Realm XP equal to damage dealt.",
    formulas: {
      focusBonus: { type: "stat", base: 4, perLevel: 1 }
    },
    cast() {
      return false;
    }
  },
  {
    name: "Shield Mastery",
    realm: "Mortal",
    lvl: 1,
    cooldown: 0,
    range: 0,
    passive: true,
    text: "Increases BLOCK by 1 per LVL while a Shield is equipped. Successful blocks with a Shield grant Mortal Realm XP equal to the blocked damage.",
    formulas: {
      blockBonus: { type: "stat", base: 0, perLevel: 1 }
    },
    cast() {
      return false;
    }
  },
  {
    name: "Shield Bash",
    realm: "Mortal",
    lvl: 1,
    cooldown: 6,
    range: 2,
    manualCast: true,
    autocast: true,
    requiresShield: true,
    text: "Requires an equipped shield. Bashes the enemy currently engaged in melee combat for [LVL] Mortal physical damage and stuns it for 2 seconds.",
    duration: 2,
    formulas: {
      damage: { type: "damage", base: 0, perLevel: 1, stat: null, statScale: 0 }
    },
    cast(game) {
      if (!playerHasEquippedShield()) {
        addThrottledLog("<b>Shield Bash</b> requires an equipped shield.", null, "chronicle", "spell-requirement:Shield Bash:shield");
        spawnFloatingText(game.player, "Need Shield", realmInfo.Mortal?.color || "#d9b95f", "rgba(0, 0, 0, 0.82)");
        return false;
      }
      const target = nearestEnemy(this.range || 2);
      if (!target) return false;
      const damage = spellDamageValue(this, "damage", 0, 1);
      const duration = Number(this.duration ?? 2);
      removeInvisibility(game.player);
      if (game.mode === "multiplayer" && target.id) {
        sendMultiplayerAction({
          action: "spell:direct",
          spellName: "Shield Bash",
          enemyId: target.id,
          damage,
          realm: "Mortal",
          range: this.range,
          dmgType: "Physical",
          stunned: duration,
          requiresShield: true,
          realmXp: true
        });
        target.stunned = Math.max(target.stunned || 0, duration);
        spawnFloatingText(target, "STUN", "#f0a348", "rgba(0, 0, 0, 0.8)");
        playSoundEffect("poison");
        return true;
      }
      const hit = applyDamage(target, damage, "Mortal", "Shield Bash", "Physical", { realmXp: true, realmXpRealm: "Mortal" });
      if (hit && target.hp > 0) applyStun(target, duration);
      return hit;
    }
  },
  {
    name: "Battle Cry",
    realm: "Mortal",
    lvl: 1,
    cooldown: 18,
    range: 4,
    manualCast: true,
    autocast: false,
    text: "Instantly stuns all enemies within Range 4 of the caster for {duration} seconds.",
    formulas: {
      duration: { type: "duration", base: 0, perLevel: 0.5 }
    },
    cast(game) {
      const duration = spellValue(this, "duration", 0, 0.5);
      const range = (this.range || 4) * RANGE_UNIT;
      const targets = nearbyEnemies(game.player, range + 160)
        .filter(enemy => enemyHostileToPlayer(enemy))
        .filter(enemy => distance(game.player, enemy) <= range + (enemy.radius || 0))
        .filter(enemy => hasLineOfSight(game.player, enemy));
      if (!targets.length) return false;
      removeInvisibility(game.player);
      let affected = 0;
      for (const enemy of targets) {
        if (game.mode === "multiplayer" && enemy.id) {
          enemy.stunned = Math.max(enemy.stunned || 0, duration);
          spawnFloatingText(enemy, "STUN", "#f0a348", "rgba(0, 0, 0, 0.8)");
          sendMultiplayerAction({
            action: "spell:direct",
            spellName: "Battle Cry",
            enemyId: enemy.id,
            damage: 0,
            realm: "Mortal",
            range: this.range,
            dmgType: "Status",
            stunned: duration,
            realmXp: false
          });
          affected += 1;
        } else if (applyStun(enemy, duration)) {
          affected += 1;
        }
      }
      if (affected > 0) {
        spawnFloatingText(game.player, "BATTLE CRY", realmInfo.Mortal?.color || "#d9b95f", "rgba(0, 0, 0, 0.8)");
        playSoundEffect("poison");
      }
      return affected > 0;
    }
  },
  {
    name: "Dual Wield",
    realm: "Mortal",
    lvl: 1,
    cooldown: 0,
    range: 0,
    passive: true,
    text: "Allows a One-Handed weapon in the Off-Hand slot. Off-Hand attacks deal 10% damage, plus 2% per LVL.",
    formulas: {
      offHandDamagePercent: { type: "stat", base: 8, perLevel: 2 }
    },
    cast() {
      return false;
    }
  },
  {
    name: "War Drums",
    realm: "Mortal",
    lvl: 1,
    cooldown: 0,
    range: 9,
    passive: true,
    aura: true,
    text: "Increases AGL of the Soulreaper and allies within range.",
    formulas: {
      agilityBonus: { type: "stat", base: 0, perLevel: 2.5 }
    },
    cast() {
      return false;
    }
  },
  {
    name: "Bloodthirsty Aura",
    realm: "Infernal",
    lvl: 1,
    cooldown: 0,
    range: 6,
    passive: true,
    aura: true,
    text: "Increases FOCUS of the Soulreaper and allies within range.",
    formulas: {
      focusBonus: { type: "stat", base: 0, perLevel: 1 }
    },
    cast() {
      return false;
    }
  },
  {
    name: "Ring of Fire",
    realm: "Infernal",
    lvl: 1,
    cooldown: 9,
    range: 0,
    manualCast: true,
    autocast: true,
    text: "Creates a large ring for 3 seconds. Units touching it take Infernal damage every 0.25 seconds.",
    duration: 3,
    tick: 0.25,
    formulas: {
      damage: { type: "damage", base: 0.5, perLevel: 0.5, stat: "INT", statScale: 1 }
    },
    cast(game) {
      removeInvisibility(game.player);
      const duration = Number(this.duration ?? 3);
      const tick = Number(this.tick ?? 0.25);
      if (game.mode === "multiplayer") {
        sendMultiplayerAction({
          action: "spell:effect",
          spellName: "Ring of Fire",
          effectType: "ring",
          realm: "Infernal",
          damage: spellDamageValue(this, "damage", 0.5, 0.5),
          duration,
          tick,
          radius: 96,
          realmXp: true
        });
        return true;
      }
      game.effects.push({ type: "ring", realm: "Infernal", damage: spellDamageValue(this, "damage", 0.5, 0.5), age: 0, duration, tick, tickTimer: 0, radius: 96, realmXp: true });
      return true;
    }
  },
  {
    name: "Basic Prayer",
    realm: "Celestial",
    lvl: 1,
    cooldown: 5,
    range: 8,
    manualTarget: true,
    autocast: true,
    text: "Restores 3 HP to the Soulreaper.",
    formulas: {
      heal: { type: "heal", base: 2.5, perLevel: 0.5 }
    },
    cast(game, target = game.player) {
      if (!canCastFriendlySpellOn(this, target)) return false;
      const healAmount = spellValue(this, "heal", 2.5, 0.5);
      if (celestialHealingDamagesTarget(this, target)) {
        const label = `<b>Basic Prayer</b>`;
        if (game.mode === "multiplayer" && target.id) {
          sendMultiplayerAction({
            action: "spell:direct",
            spellName: "Basic Prayer",
            enemyId: target.id,
            realm: "Celestial",
            damage: healAmount,
            dmgType: "Magical",
            range: this.range || 8,
            realmXp: true
          });
          window.SoulreaperQuestUI?.updateCelestialUndeadPrayerObjective?.("Basic Prayer", target, healAmount);
          spawnPrayerSparkles(target);
          return true;
        }
        const damaged = applyDamage(target, healAmount, "Celestial", label, "Magical", { source: game.player, realmXp: true });
        if (damaged) {
          window.SoulreaperQuestUI?.updateCelestialUndeadPrayerObjective?.("Basic Prayer", target, healAmount);
          spawnPrayerSparkles(target);
        }
        return Boolean(damaged);
      }
      const targetIsEnemy = game.enemies.includes(target);
      if (targetIsEnemy && game.mode === "multiplayer" && target.id) {
        const healed = roundUpTenth(Math.max(0, Math.min(healAmount, (target.maxHp || healAmount) - (target.hp || 0))));
        sendMultiplayerAction({
          action: "spell:unit-heal",
          spellName: "Basic Prayer",
          enemyId: target.id,
          heal: healAmount
        });
        grantRealmXP("Celestial", healed);
        if (healed > 0) window.SoulreaperQuestUI?.updateCelestialMercyObjective?.("Basic Prayer", healed);
        spawnFloatingText(target, `+${formatNumber(healed)}`, "#61d66f");
        spawnPrayerSparkles(target);
        return true;
      }
      if (target !== game.player && game.mode === "multiplayer" && target.id) {
        const healed = roundUpTenth(Math.max(0, Math.min(healAmount, (target.maxHp || healAmount) - (target.hp || 0))));
        sendMultiplayerAction({
          action: "spell:player",
          spellName: "Basic Prayer",
          targetPlayerId: target.id,
          heal: healAmount
        });
        grantRealmXP("Celestial", healed);
        if (healed > 0) window.SoulreaperQuestUI?.updateCelestialMercyObjective?.("Basic Prayer", healed);
        spawnPrayerSparkles(target);
        return true;
      }
      const healed = roundUpTenth(Math.min(healAmount, target.maxHp - target.hp));
      if (healed <= 0) return false;
      target.hp += healed;
      grantRealmXP("Celestial", healed);
      window.SoulreaperQuestUI?.updateCelestialMercyObjective?.("Basic Prayer", healed);
      spawnFloatingText(target, `+${formatNumber(healed)}`, "#61d66f");
      spawnPrayerSparkles(target);
      addLog(`Basic Prayer restores <b>${formatNumber(healed)} HP</b>.`, target);
      return true;
    }
  },
  {
    name: "Heavenly Light",
    realm: "Celestial",
    lvl: 1,
    cooldown: 6,
    range: 8,
    manualTarget: true,
    autocast: true,
    icon: "./assets/spells/heavenly-light.png",
    text: "Restores 5 + 2 HP per LVL to the Soulreaper or an ally.",
    formulas: {
      heal: { type: "heal", base: 5, perLevel: 2 }
    },
    cast(game, target = game.player) {
      if (!canCastFriendlySpellOn(this, target)) return false;
      const healAmount = spellValue(this, "heal", 5, 2);
      if (celestialHealingDamagesTarget(this, target)) {
        const label = `<b>Heavenly Light</b>`;
        if (game.mode === "multiplayer" && target.id) {
          sendMultiplayerAction({
            action: "spell:direct",
            spellName: "Heavenly Light",
            enemyId: target.id,
            realm: "Celestial",
            damage: healAmount,
            dmgType: "Magical",
            range: this.range || 8,
            realmXp: true
          });
          window.SoulreaperQuestUI?.updateCelestialUndeadPrayerObjective?.("Heavenly Light", target, healAmount);
          spawnPrayerSparkles(target);
          return true;
        }
        const damaged = applyDamage(target, healAmount, "Celestial", label, "Magical", { source: game.player, realmXp: true });
        if (damaged) {
          window.SoulreaperQuestUI?.updateCelestialUndeadPrayerObjective?.("Heavenly Light", target, healAmount);
          spawnPrayerSparkles(target);
        }
        return Boolean(damaged);
      }
      const targetIsEnemy = game.enemies.includes(target);
      if (targetIsEnemy && game.mode === "multiplayer" && target.id) {
        const healed = roundUpTenth(Math.max(0, Math.min(healAmount, (target.maxHp || healAmount) - (target.hp || 0))));
        sendMultiplayerAction({
          action: "spell:unit-heal",
          spellName: "Heavenly Light",
          enemyId: target.id,
          heal: healAmount
        });
        grantRealmXP("Celestial", healed);
        if (healed > 0) window.SoulreaperQuestUI?.updateCelestialMercyObjective?.("Heavenly Light", healed);
        spawnFloatingText(target, `+${formatNumber(healed)}`, "#f0cf63");
        spawnPrayerSparkles(target);
        return true;
      }
      if (target !== game.player && game.mode === "multiplayer" && target.id) {
        const healed = roundUpTenth(Math.max(0, Math.min(healAmount, (target.maxHp || healAmount) - (target.hp || 0))));
        sendMultiplayerAction({
          action: "spell:player",
          spellName: "Heavenly Light",
          targetPlayerId: target.id,
          heal: healAmount
        });
        grantRealmXP("Celestial", healed);
        if (healed > 0) window.SoulreaperQuestUI?.updateCelestialMercyObjective?.("Heavenly Light", healed);
        spawnPrayerSparkles(target);
        return true;
      }
      const healed = roundUpTenth(Math.min(healAmount, target.maxHp - target.hp));
      if (healed <= 0) return false;
      target.hp += healed;
      grantRealmXP("Celestial", healed);
      window.SoulreaperQuestUI?.updateCelestialMercyObjective?.("Heavenly Light", healed);
      spawnFloatingText(target, `+${formatNumber(healed)}`, "#f0cf63");
      spawnPrayerSparkles(target);
      addLog(`Heavenly Light restores <b>${formatNumber(healed)} HP</b>.`, target);
      return true;
    }
  },
  {
    name: "Godspeed",
    realm: "Celestial",
    lvl: 1,
    cooldown: 60,
    range: 0,
    manualTarget: true,
    autocast: false,
    icon: "./assets/spells/godspeed.png",
    text: "Increases SPD by 0.25 per LVL for 60 seconds.",
    duration: 60,
    formulas: {
      speedBonus: { type: "stat", base: 0, perLevel: 0.25 }
    },
    cast(game, target = game.player) {
      if (!canCastFriendlySpellOn(this, target)) return false;
      const duration = Number(this.duration ?? 60);
      const speedBonus = spellValue(this, "speedBonus", 0, 0.25);
      const statMod = {
        name: "Godspeed",
        remaining: duration,
        addStats: { SPD: speedBonus },
        godspeed: true
      };
      if (target !== game.player && game.mode === "multiplayer" && target.id) {
        sendMultiplayerAction({
          action: "spell:player",
          spellName: "Godspeed",
          targetPlayerId: target.id,
          statMod
        });
        window.SoulreaperQuestUI?.updateGodspeedObjective?.();
        spawnFloatingText(target, "GODSPEED", realmInfo.Celestial.color);
        return true;
      }
      const existing = target.statMods.find(mod => mod.name === "Godspeed");
      if (existing) Object.assign(existing, statMod);
      else target.statMods.push(statMod);
      markUIDirty();
      window.SoulreaperQuestUI?.updateGodspeedObjective?.();
      spawnFloatingText(target, "GODSPEED", realmInfo.Celestial.color);
      return true;
    }
  },
  {
    name: "Curse of Disdain",
    realm: "Umbral",
    lvl: 1,
    cooldown: 4,
    range: 9,
    manualTarget: true,
    autocast: true,
    text: "Curses the nearest enemy for 1 Umbral damage per second for 8 seconds.",
    duration: 8,
    tick: 1,
    formulas: {
      dotDamage: { type: "damage", base: 0.5, perLevel: 0.5, stat: "INT", statScale: 1 }
    },
    cast(game, target) {
      if (!target) return false;
      if (protectedFromPlayerEffects(target)) {
        spawnFloatingText(target, "Protected", "#68a85e", "rgba(0, 0, 0, 0.75)");
        return false;
      }
      const duration = Number(this.duration ?? 8);
      const tick = Number(this.tick ?? 1);
      removeInvisibility(game.player);
      if (game.mode === "multiplayer" && target.id) {
        sendMultiplayerAction({
          action: "spell:direct",
          spellName: "Curse of Disdain",
          enemyId: target.id,
          realm: "Umbral",
          range: this.range,
          dot: { name: "Curse of Disdain", realm: "Umbral", damage: spellDamageValue(this, "dotDamage", 0.5, 0.5), tick, timer: tick, remaining: duration, dmgType: "Magical", realmXp: true },
          realmXp: true
        });
        addLog(`<b>${target.name}</b> is marked by disdain.`);
        return true;
      }
      target.dots.push({ name: "Curse of Disdain", realm: "Umbral", damage: spellDamageValue(this, "dotDamage", 0.5, 0.5), tick, timer: tick, remaining: duration, realmXp: true });
      addLog(`<b>${target.name}</b> is marked by disdain.`);
      return true;
    }
  },
  {
    name: "Virulent Plague",
    realm: "Umbral",
    lvl: 1,
    cooldown: 15,
    range: 9,
    manualTarget: true,
    autocast: false,
    text: "Infects a target with a contagious plague that deals [LVL / 2] Umbral damage every second for 15 seconds. Requires ceiling([LVL / 2]) Bones.",
    duration: 15,
    tick: 1,
    spreadRange: 3,
    formulas: {
      dotDamage: { type: "damage", base: 0, perLevel: 0.5, stat: null, statScale: 0 },
      boneCost: { type: "cost", base: 0, perLevel: 0.5, round: "ceil" }
    },
    cast(game, target) {
      if (!target) return false;
      if (protectedFromPlayerEffects(target)) {
        spawnFloatingText(target, "Protected", "#68a85e", "rgba(0, 0, 0, 0.75)");
        return false;
      }
      const lvl = spellLevel(this);
      const cost = Math.ceil(lvl / 2);
      if (inventoryItemCount("Bone") < cost) {
        addThrottledLog(`<b>${this.name}</b> needs ${formatNumber(cost)} Bone${cost === 1 ? "" : "s"}.`, null, "chronicle", `spell-reagent:${this.name}:Bone:${cost}`);
        spawnFloatingText(game.player, "Need Bones", realmInfo[this.realm]?.color || "#8b52ba", "#8b52ba");
        return false;
      }
      removeInventoryStack("Bone", cost);
      markUIDirty();
      removeInvisibility(game.player);
      const duration = Number(this.duration ?? 15);
      const tick = 1;
      const dot = {
        name: "Virulent Plague",
        realm: "Umbral",
        damage: spellDamageValue(this, "dotDamage", 0, 0.5),
        tick,
        timer: tick,
        remaining: duration,
        duration,
        dmgType: "Magical",
        realmXp: true,
        realmXpRealm: "Umbral",
        spreadRange: Number(this.spreadRange ?? 3)
      };
      if (game.mode === "multiplayer" && target.id) {
        sendMultiplayerAction({
          action: "spell:direct",
          spellName: "Virulent Plague",
          enemyId: target.id,
          realm: "Umbral",
          range: this.range,
          dot,
          realmXp: true
        });
        addLog(`<b>${target.name}</b> is infected with virulent plague.`);
        return true;
      }
      if (typeof applyVirulentPlagueDot === "function") applyVirulentPlagueDot(target, dot);
      else target.dots.push(dot);
      addLog(`<b>${target.name}</b> is infected with virulent plague.`);
      return true;
    }
  },
  {
    name: "Tangle Vine",
    realm: "Sylvan",
    lvl: 1,
    cooldown: 2,
    range: 9,
    manualTarget: true,
    autocast: true,
    text: "Deals 3 Sylvan damage and roots the nearest enemy for 2 seconds.",
    formulas: {
      damage: { type: "damage", base: 2.5, perLevel: 0.5, stat: "INT", statScale: 1 },
      rootDuration: { type: "duration", base: 1.5, perLevel: 0.5 }
    },
    cast(game, target) {
      if (!target) return false;
      const damage = spellDamageValue(this, "damage", 2.5, 0.5);
      const baseDuration = spellValue(this, "rootDuration", 1.5, 0.5);
      removeInvisibility(game.player);
      if (game.mode === "multiplayer" && target.id) {
        sendMultiplayerAction({
          action: "spell:direct",
          spellName: "Tangle Vine",
          enemyId: target.id,
          damage,
          realm: "Sylvan",
          range: this.range,
          rooted: baseDuration,
          dmgType: "Magical",
          realmXp: true
        });
        addLog(`<b>${target.name}</b> is held by Tangle Vine.`);
        return true;
      }
      const landed = applyDamage(target, damage, "Sylvan", "Tangle Vine", "Magical", { realmXp: true });
      if (!landed) return false;
      const duration = freezeDurationFor(target, baseDuration);
      if (game.enemies.includes(target)) {
        target.rooted = Math.max(target.rooted, duration);
        target.rootVisual = "tangle-vine";
      }
      addLog(`<b>${target.name}</b> is held by Tangle Vine.`);
      return true;
    }
  },
  {
    name: "Briar Lash",
    realm: "Sylvan",
    lvl: 1,
    cooldown: 5,
    range: 8,
    manualTarget: true,
    autocast: true,
    text: "Whips a target with thorny vines, dealing Sylvan damage and briefly slowing it.",
    duration: 3,
    formulas: {
      damage: { type: "damage", base: 4, perLevel: 1, stat: "INT", statScale: 1 },
      speedPenalty: { type: "stat", base: -1.5, perLevel: -0.5 }
    },
    cast(game, target) {
      if (!target || protectedFromPlayerEffects(target)) return false;
      const damage = spellDamageValue(this, "damage", 4, 1);
      const duration = Number(this.duration ?? 3);
      const speedPenalty = spellValue(this, "speedPenalty", -1.5, -0.5);
      const statMod = { name: "Briar Lash", remaining: duration, addStats: { SPD: speedPenalty } };
      removeInvisibility(game.player);
      game.effects.push({
        type: "briarLash",
        source: game.player,
        target,
        sourceX: game.player.x,
        sourceY: game.player.y,
        targetX: target.x,
        targetY: target.y,
        x: (game.player.x + target.x) / 2,
        y: (game.player.y + target.y) / 2,
        radius: Math.max(80, distance(game.player, target) / 2),
        realm: "Sylvan",
        age: 0,
        duration: 0.38,
        localOnly: game.mode === "multiplayer"
      });
      if (game.mode === "multiplayer" && target.id) {
        sendMultiplayerAction({
          action: "spell:direct",
          spellName: "Briar Lash",
          enemyId: target.id,
          damage,
          realm: "Sylvan",
          range: this.range,
          dmgType: "Magical",
          statMod,
          effectType: "briarLash",
          sourceX: game.player.x,
          sourceY: game.player.y,
          targetX: target.x,
          targetY: target.y,
          realmXp: true
        });
        addLog(`<b>${target.name}</b> is lashed by briars.`);
        return true;
      }
      const landed = applyDamage(target, damage, "Sylvan", "Briar Lash", "Magical", { realmXp: true });
      if (!landed) return false;
      applyUnitStatMod(target, statMod);
      addLog(`<b>${target.name}</b> is lashed by briars.`);
      return true;
    }
  },
  {
    name: "Chlorophyll",
    realm: "Sylvan",
    lvl: 1,
    cooldown: 8,
    range: 8,
    manualTarget: true,
    autocast: true,
    text: "Infuses a friendly target with green life magic, healing {heal} HP every second for {duration} seconds.",
    duration: 30,
    tick: 1,
    formulas: {
      heal: { type: "heal", base: 0, perLevel: 0.5, stat: null, statScale: 0 }
    },
    cast(game, target = game.player) {
      if (!canCastFriendlySpellOn(this, target)) return false;
      const duration = Number(this.duration ?? 30);
      const tick = Number(this.tick ?? 1);
      const heal = spellValue(this, "heal", 0, 0.5);
      const statMod = {
        name: "Chlorophyll",
        remaining: duration,
        healPerTick: heal,
        tick,
        tickTimer: tick,
        chlorophyll: true,
        realmXpRealm: "Sylvan"
      };
      removeInvisibility(game.player);
      if (game.mode === "multiplayer" && target.id) {
        const action = game.enemies.includes(target) ? "spell:unit-heal" : "spell:player";
        sendMultiplayerAction({
          action,
          spellName: "Chlorophyll",
          targetPlayerId: action === "spell:player" ? target.id : undefined,
          enemyId: action === "spell:unit-heal" ? target.id : undefined,
          statMod,
          heal: 0
        });
        applyUnitStatMod(target, statMod);
        spawnFloatingText(target, "CHLOROPHYLL", realmInfo.Sylvan.color);
        spawnChlorophyllSparkles(target);
        return true;
      }
      applyUnitStatMod(target, statMod);
      spawnFloatingText(target, "CHLOROPHYLL", realmInfo.Sylvan.color);
      spawnChlorophyllSparkles(target);
      return true;
    }
  },
  {
    name: "Wooden Skin",
    realm: "Sylvan",
    lvl: 1,
    cooldown: 12,
    range: 8,
    manualTarget: true,
    autocast: true,
    text: "Hardens a friendly target's skin like bark, increasing DEF by {defenseBonus} for {duration} seconds.",
    duration: 30,
    formulas: {
      defenseBonus: { type: "stat", base: 0, perLevel: 0.5 }
    },
    cast(game, target = game.player) {
      if (!canCastFriendlySpellOn(this, target)) return false;
      const duration = Number(this.duration ?? 30);
      const defenseBonus = spellValue(this, "defenseBonus", 0, 0.5);
      const statMod = {
        name: "Wooden Skin",
        remaining: duration,
        addStats: { DEF: defenseBonus },
        woodenSkin: true
      };
      removeInvisibility(game.player);
      if (game.mode === "multiplayer" && target.id) {
        const action = game.enemies.includes(target) ? "spell:unit-heal" : "spell:player";
        sendMultiplayerAction({
          action,
          spellName: "Wooden Skin",
          targetPlayerId: action === "spell:player" ? target.id : undefined,
          enemyId: action === "spell:unit-heal" ? target.id : undefined,
          statMod,
          heal: 0
        });
        applyUnitStatMod(target, statMod);
        spawnFloatingText(target, "WOODEN SKIN", realmInfo.Sylvan.color);
        return true;
      }
      applyUnitStatMod(target, statMod);
      spawnFloatingText(target, "WOODEN SKIN", realmInfo.Sylvan.color);
      return true;
    }
  },
  {
    name: "Sacred Grove",
    realm: "Sylvan",
    lvl: 1,
    cooldown: 24,
    range: 6,
    manualCast: true,
    autocast: false,
    autocastAvailable: false,
    soundEffect: "./assets/audio/generic-sylvan-buff.wav",
    text: "Creates a ring of enchanted trees around the Soulreaper for {duration} seconds. Enemies outside the grove cannot enter it or target anything inside.",
    formulas: {
      duration: { type: "duration", base: 4, perLevel: 2 }
    },
    cast(game) {
      const duration = spellValue(this, "duration", 4, 2);
      const radius = (this.range || 6) * RANGE_UNIT;
      removeInvisibility(game.player);
      if (game.mode === "multiplayer") {
        sendMultiplayerAction({
          action: "spell:effect",
          spellName: "Sacred Grove",
          effectType: "sacredGrove",
          x: game.player.x,
          y: game.player.y,
          realm: "Sylvan",
          duration,
          tick: 1,
          radius,
          range: 0
        });
        return true;
      }
      game.effects.push({
        type: "sacredGrove",
        x: game.player.x,
        y: game.player.y,
        realm: "Sylvan",
        age: 0,
        duration,
        tick: 1,
        tickTimer: 0,
        radius
      });
      return true;
    }
  },
  {
    name: "Spiderweb",
    realm: "Mortal",
    lvl: 1,
    cooldown: 2,
    range: 9,
    manualTarget: true,
    autocast: true,
    autocastAvailable: true,
    text: "Roots the nearest enemy for 2 seconds.",
    formulas: {
      rootDuration: { type: "duration", base: 1.5, perLevel: 0.5 }
    },
    cast(game, target) {
      if (!target) return false;
      const baseDuration = spellValue(this, "rootDuration", 1.5, 0.5);
      removeInvisibility(game.player);
      if (game.mode === "multiplayer" && target.id) {
        sendMultiplayerAction({
          action: "spell:direct",
          spellName: "Spiderweb",
          enemyId: target.id,
          realm: "Mortal",
          range: this.range,
          rooted: baseDuration,
          rootVisual: "spiderweb",
          dmgType: "Physical"
        });
        addLog(`<b>${target.name}</b> is caught in Spiderweb.`);
        return true;
      }
      const duration = freezeDurationFor(target, baseDuration);
      if (game.enemies.includes(target)) {
        target.rooted = Math.max(target.rooted, duration);
        target.rootVisual = "spiderweb";
      }
      spawnFloatingText(target, "WEBBED", realmInfo.Mortal.color);
      addLog(`<b>${target.name}</b> is caught in Spiderweb.`);
      return true;
    }
  },
  {
    name: "Pacify",
    realm: "Ethereal",
    lvl: 1,
    cooldown: 8,
    range: 10,
    manualTarget: true,
    autocast: true,
    text: "Removes aggression from a hostile enemy for 1.5 seconds.",
    formulas: {
      pacifyDuration: { type: "duration", base: 1, perLevel: 0.5 }
    },
    cast(game, target) {
      if (!target || !enemyHostileToPlayer(target)) return false;
      if (game.mode === "multiplayer" && target.id) {
        sendMultiplayerAction({
          action: "spell:direct",
          spellName: "Pacify",
          enemyId: target.id,
          realm: "Ethereal",
          range: this.range,
          pacified: spellValue(this, "pacifyDuration", 1, 0.5)
        });
        spawnFloatingText(target, "PACIFIED", realmInfo.Ethereal.color);
        addLog(`<b>${target.name}</b> is pacified.`);
        return true;
      }
      target.hostileToPlayer = false;
      target.hostileTarget = null;
      target.pacified = Math.max(target.pacified || 0, spellValue(this, "pacifyDuration", 1, 0.5));
      spawnFloatingText(target, "PACIFIED", realmInfo.Ethereal.color);
      addLog(`<b>${target.name}</b> is pacified.`);
      return true;
    }
  },
  {
    name: "Hypnotize",
    realm: "Ethereal",
    lvl: 1,
    cooldown: 10,
    range: 8,
    manualTarget: true,
    autocast: false,
    text: "Stuns a single target for a random duration up to {duration} seconds. Duration is reduced by the target's Ethereal resistance.",
    formulas: {
      duration: { type: "duration", base: 0, perLevel: 0.5 }
    },
    cast(game, target) {
      if (!target || protectedFromPlayerEffects(target)) return false;
      const duration = hypnotizeDuration(this, target);
      if (duration <= 0) return false;
      removeInvisibility(game.player);
      if (game.mode === "multiplayer" && target.id) {
        target.stunned = Math.max(target.stunned || 0, duration);
        spawnFloatingText(target, "HYPNOTIZED", realmInfo.Ethereal.color, "rgba(0, 20, 70, 0.9)");
        sendMultiplayerAction({
          action: "spell:direct",
          spellName: "Hypnotize",
          enemyId: target.id,
          damage: 0,
          realm: "Ethereal",
          range: this.range,
          dmgType: "Status",
          stunned: duration,
          realmXp: false
        });
        return true;
      }
      target.stunned = Math.max(target.stunned || 0, duration);
      spawnFloatingText(target, "HYPNOTIZED", realmInfo.Ethereal.color, "rgba(0, 20, 70, 0.9)");
      playSoundEffect("poison");
      if (game.mode === "multiplayer") sendMultiplayerEnemyUpdate(target);
      return true;
    }
  },
  {
    name: "Invisibility",
    realm: "Ethereal",
    lvl: 1,
    cooldown: 12,
    range: 9,
    manualTarget: true,
    autocast: false,
    autocastAvailable: false,
    autocastAvailable: false,
    text: "Turns self or ally invisible to enemies.",
    formulas: {
      duration: { type: "duration", base: 0, perLevel: 1 }
    },
    cast(game, target = game.player) {
      if (!canCastFriendlySpellOn(this, target)) return false;
      const mod = { name: "Invisibility", remaining: spellValue(this, "duration", 0, 1), invisible: true };
      if (target !== game.player && game.mode === "multiplayer" && target.id) {
        sendMultiplayerAction({
          action: "spell:player",
          spellName: "Invisibility",
          targetPlayerId: target.id,
          statMod: mod
        });
        spawnFloatingText(target, "INVISIBLE", realmInfo.Ethereal.color);
        return true;
      }
      applyUnitStatMod(target, mod);
      spawnFloatingText(target, "INVISIBLE", realmInfo.Ethereal.color);
      return true;
    }
  },
  {
    name: "Banish",
    realm: "Ethereal",
    lvl: 1,
    cooldown: 12,
    range: 6,
    manualTarget: true,
    autocast: false,
    autocastAvailable: false,
    text: "Turns self, ally, or enemy incorporeal.",
    formulas: {
      duration: { type: "duration", base: 0, perLevel: 1 }
    },
    cast(game, target = game.player) {
      if (!target) return false;
      const mod = { name: "Banish", remaining: spellValue(this, "duration", 0, 1), incorporeal: true };
      const targetIsPlayer = target === game.player || !game.enemies.includes(target);
      if (targetIsPlayer) {
        if (!canCastFriendlySpellOn(this, target)) return false;
        if (target !== game.player && game.mode === "multiplayer" && target.id) {
          sendMultiplayerAction({
            action: "spell:player",
            spellName: "Banish",
            targetPlayerId: target.id,
            statMod: mod
          });
          spawnFloatingText(target, "INCORPOREAL", realmInfo.Ethereal.color);
          return true;
        }
        applyUnitStatMod(target, mod);
        spawnFloatingText(target, "INCORPOREAL", realmInfo.Ethereal.color);
        return true;
      }
      if (protectedFromPlayerEffects(target)) {
        spawnFloatingText(target, "Protected", "#68a85e", "rgba(0, 0, 0, 0.75)");
        return false;
      }
      removeInvisibility(game.player);
      if (game.mode === "multiplayer" && target.id) {
        sendMultiplayerAction({
          action: "spell:direct",
          spellName: "Banish",
          enemyId: target.id,
          realm: "Ethereal",
          range: this.range,
          statMod: mod
        });
        spawnFloatingText(target, "INCORPOREAL", realmInfo.Ethereal.color);
        return true;
      }
      provokeEnemy(target);
      applyUnitStatMod(target, mod);
      spawnFloatingText(target, "INCORPOREAL", realmInfo.Ethereal.color);
      return true;
    }
  },
  {
    name: "Summon Portal",
    realm: "Ethereal",
    lvl: 1,
    static: true,
    cooldown: 150,
    range: 6,
    manualTarget: true,
    autocast: false,
    autocastAvailable: false,
    text: "Creates a portal that can be used to teleport to another portal.",
    async castAt(x, y) {
      const ownerId = game.mode === "multiplayer" && game.multiplayer.connected ? game.multiplayer.id : "player";
      const replace = typeof portalReplacementChoice === "function" ? await portalReplacementChoice(ownerId) : "";
      if (replace === null || replace === false) return false;
      const existingPortals = typeof portalEffects === "function"
        ? portalEffects(ownerId).filter(effect => effect.type === "portal")
        : [];
      if (existingPortals.length >= 2 && !replace) return false;
      if (game.mode === "multiplayer" && game.multiplayer.connected) {
        sendMultiplayerAction({
          action: "spell:portal",
          spellName: "Summon Portal",
          x,
          y,
          range: this.range,
          areaName: (typeof spawnAreaAt === "function" ? spawnAreaAt(x, y) : areaAt(x, y)?.name) || "The Black Wilds",
          replace
        });
        return true;
      }
      summonPortalAt(x, y, {
        ownerId,
        ownerName: game.player.name || "Soulreaper",
        replace
      });
      return true;
    }
  },
  {
    name: "Clarity",
    realm: "Ethereal",
    lvl: 1,
    cooldown: 5,
    range: 6,
    manualTarget: true,
    autocast: false,
    text: "Target gains INT for 15 seconds.",
    duration: 15,
    formulas: {
      intelligenceBonus: { type: "stat", base: 0, perLevel: 1 }
    },
    cast(game, target = game.player) {
      if (!canCastFriendlySpellOn(this, target)) return false;
      const mod = { name: "Clarity", remaining: Number(this.duration ?? 15), addStats: { INT: spellValue(this, "intelligenceBonus", 0, 1) } };
      if (target !== game.player && game.mode === "multiplayer" && target.id) {
        sendMultiplayerAction({ action: "spell:player", spellName: "Clarity", targetPlayerId: target.id, statMod: mod });
        spawnFloatingText(target, "CLARITY", realmInfo.Ethereal.color);
        spawnClarityFlash(target);
        return true;
      }
      applyUnitStatMod(target, mod);
      spawnFloatingText(target, "CLARITY", realmInfo.Ethereal.color);
      spawnClarityFlash(target);
      return true;
    }
  },
  {
    name: "Ice Bolt",
    realm: "Ethereal",
    lvl: 1,
    cooldown: 6,
    range: 10,
    manualTarget: true,
    autocast: true,
    text: "Deals Ethereal damage and Freezes the target for 4 seconds.",
    duration: 4,
    formulas: {
      damage: { type: "damage", base: 4, perLevel: 1, stat: "INT", statScale: 1 }
    },
    cast(game, target) {
      if (!target) return false;
      const damage = spellDamageValue(this, "damage", 4, 1);
      removeInvisibility(game.player);
      const baseDuration = Number(this.duration ?? 4);
      const freeze = { name: "Freeze", remaining: game.mode === "multiplayer" ? baseDuration : freezeDurationFor(target, baseDuration), freeze: true };
      if (game.mode === "multiplayer" && target.id) {
        sendMultiplayerAction({
          action: "spell:projectile",
          spellName: "Ice Bolt",
          enemyId: target.id,
          damage,
          realm: "Ethereal",
          color: "#bde7ff",
          label: "Ice Bolt",
          radius: 6,
          speed: 360,
          trail: "#5f94d9",
          dmgType: "Magical",
          range: this.range,
          statMod: freeze,
          projectileAnimation: "ice bolt",
          realmXp: true
        });
        return true;
      }
      game.projectiles.push(makeProjectile({
        source: game.player,
        target,
        damage,
        realm: "Ethereal",
        color: "#bde7ff",
        label: "Ice Bolt",
        radius: 6,
        speed: 360,
        trail: "#5f94d9",
        dmgType: "Magical",
        statMod: freeze,
        projectileAnimation: "ice bolt",
        realmXp: true
      }));
      return true;
    }
  },
  {
    name: "Ice Storm",
    realm: "Ethereal",
    lvl: 1,
    cooldown: 10,
    range: 10,
    aoeRadius: 5,
    duration: 4,
    manualTarget: true,
    text: "Rains ice down on an area, dealing Ethereal damage and Freezing enemies.",
    formulas: {
      damage: { type: "damage", base: 0, perLevel: 0.5, stat: "INT", statScale: 1 }
    },
    castAt(x, y) {
      removeInvisibility(game.player);
      const duration = Number(this.duration ?? 4);
      const tick = Number(this.tick ?? 1);
      if (game.mode === "multiplayer") {
        sendMultiplayerAction({
          action: "spell:effect",
          spellName: "Ice Storm",
          effectType: "iceStorm",
          x,
          y,
          realm: "Ethereal",
          damage: spellDamageValue(this, "damage", 0, 0.5),
          duration,
          tick,
          radius: this.aoeRadius * RANGE_UNIT,
          range: this.range,
          statMod: { name: "Freeze", remaining: duration, freeze: true },
          realmXp: true
        });
        return true;
      }
      game.effects.push({
        type: "iceStorm",
        x,
        y,
        realm: "Ethereal",
        damage: spellDamageValue(this, "damage", 0, 0.5),
        age: 0,
        duration,
        tick,
        tickTimer: 0,
        radius: this.aoeRadius * RANGE_UNIT,
        statMod: { name: "Freeze", remaining: duration, freeze: true },
        realmXp: true
      });
      return true;
    }
  },
  {
    name: "Chain Lightning",
    realm: "Celestial",
    lvl: 1,
    cooldown: 6,
    range: 8,
    manualTarget: true,
    autocast: true,
    text: "Deals Celestial damage and jumps to nearby enemies.",
    formulas: {
      damage: { type: "damage", base: 0, perLevel: 1.25, stat: "INT", statScale: 1 },
      jumpDamageMultiplier: { type: "multiplier", base: 0.75, perLevel: 0 }
    },
    cast(game, target) {
      if (!target) return false;
      removeInvisibility(game.player);
      const firstDamage = spellDamageValue(this, "damage", 0, 1.25);
      if (game.mode === "multiplayer" && target.id) {
        sendMultiplayerAction({
          action: "spell:chain",
          spellName: "Chain Lightning",
          enemyId: target.id,
          damage: firstDamage,
          jumps: 3,
          jumpDamageMultiplier: spellValue(this, "jumpDamageMultiplier", 0.75, 0),
          realm: "Celestial",
          range: this.range,
          dmgType: "Magical",
          realmXp: true
        });
        return true;
      }
      const hit = [];
      const links = [];
      let current = target;
      let previous = game.player;
      const casterAlignment = playerAlignment();
      const jumpMultiplier = spellValue(this, "jumpDamageMultiplier", 0.75, 0);
      for (let i = 0; i < 4 && current; i += 1) {
        hit.push(current);
        const damage = roundUpTenth(firstDamage * (i === 0 ? 1 : jumpMultiplier ** i));
        links.push({ sourceX: previous.x, sourceY: previous.y, targetX: current.x, targetY: current.y });
        applyDamage(current, damage, "Celestial", "Chain Lightning", "Magical", { realmXp: true, source: game.player });
        previous = current;
        current = nearestEnemyFrom(current, this.range, hit, casterAlignment);
      }
      spawnChainLightningLinks(links, "Celestial");
      return true;
    }
  },
  {
    name: "Grace from Above",
    realm: "Celestial",
    lvl: 1,
    cooldown: 16,
    range: 8,
    aoeRadius: 5,
    duration: 8,
    tick: 1,
    manualTarget: true,
    text: "Creates a radiant circle that heals friendly units inside every second.",
    formulas: {
      heal: { type: "heal", base: 0, perLevel: 0.5 }
    },
    castAt(x, y) {
      const duration = Number(this.duration ?? 8);
      const tick = Number(this.tick ?? 1);
      const heal = spellDamageValue(this, "heal", 0, 0.5);
      if (game.mode === "multiplayer") {
        sendMultiplayerAction({
          action: "spell:effect",
          spellName: "Grace from Above",
          effectType: "graceFromAbove",
          x,
          y,
          realm: "Celestial",
          duration,
          tick,
          radius: this.aoeRadius * RANGE_UNIT,
          range: this.range,
          heal
        });
        return true;
      }
      game.effects.push({
        type: "graceFromAbove",
        x,
        y,
        realm: "Celestial",
        age: 0,
        duration,
        tick,
        tickTimer: 0,
        radius: this.aoeRadius * RANGE_UNIT,
        heal
      });
      return true;
    }
  },
  {
    name: "Raise Skeleton",
    realm: "Umbral",
    summonTemplate: "Skeleton",
    lvl: 1,
    cooldown: 30,
    range: 0,
    manualCast: true,
    autocast: false,
    autocastAvailable: false,
    text: "Raises a Skeleton companion from Bones.",
    formulas: {
      boneCost: { type: "cost", base: 0, perLevel: 1 }
    },
    cast(game) {
      const lvl = spellLevel(this);
      const cost = lvl;
      if (inventoryItemCount("Bone") < cost) {
        addThrottledLog(`<b>Raise Skeleton</b> needs ${formatNumber(cost)} Bone${cost === 1 ? "" : "s"}.`, null, "chronicle", `spell-reagent:Raise Skeleton:Bone:${cost}`);
        spawnFloatingText(game.player, "Need Bones", realmInfo.Umbral.color, "#d9c7ff");
        return false;
      }
      removeInventoryStack("Bone", cost);
      markUIDirty();
      removeInvisibility(game.player);
      const point = randomWalkablePointNear(game.player.x, game.player.y, game.player.radius + 36, game.player.radius + 96)
        || { x: game.player.x + game.player.radius + 46, y: game.player.y };
      spawnRaiseSkeletonSmoke(point.x, point.y);
      if (game.mode === "multiplayer" && game.multiplayer.connected) {
        sendMultiplayerAction({
          action: "spell:summon",
          spellName: "Raise Skeleton",
          templateName: "Skeleton",
          lvl,
          x: point.x,
          y: point.y
        });
        return true;
      }
      summonPetSkeleton(lvl, point.x, point.y, {
        masterId: "player",
        masterName: game.player.name || "Soulreaper"
      });
      return true;
    }
  },
  {
    name: "Summon Water Elemental",
    realm: "Ethereal",
    summonTemplate: "Water Elemental",
    lvl: 1,
    cooldown: 30,
    range: 0,
    manualCast: true,
    autocast: false,
    autocastAvailable: false,
    text: "Summon Water Elemental summons a level [LVL] Water Elemental pet. Requires [LVL] Ether.",
    formulas: {
      etherCost: { type: "cost", base: 0, perLevel: 1 },
      summonLevel: { type: "level", base: 0, perLevel: 1 }
    },
    cast(game) {
      const lvl = spellLevel(this);
      const cost = lvl;
      if (inventoryItemCount("Ether") < cost) {
        addThrottledLog(`<b>${this.name}</b> needs ${formatNumber(cost)} Ether.`, null, "chronicle", `spell-reagent:${this.name}:Ether:${cost}`);
        spawnFloatingText(game.player, "Need Ether", realmInfo[this.realm]?.color || "#d9c7ff", "#d9c7ff");
        return false;
      }
      removeInventoryStack("Ether", cost);
      markUIDirty();
      removeInvisibility(game.player);
      const point = randomWalkablePointNear(game.player.x, game.player.y, game.player.radius + 36, game.player.radius + 96)
        || { x: game.player.x + game.player.radius + 46, y: game.player.y };
      spawnRaiseSkeletonSmoke(point.x, point.y);
      if (game.mode === "multiplayer" && game.multiplayer.connected) {
        sendMultiplayerAction({
          action: "spell:summon",
          spellName: this.name,
          templateName: "Water Elemental",
          lvl,
          x: point.x,
          y: point.y
        });
        return true;
      }
      summonPetByTemplate("Water Elemental", lvl, point.x, point.y, {
        masterId: "player",
        masterName: game.player.name || "Soulreaper"
      });
      return true;
    }
  },
  {
    name: "Summon Earth Elemental",
    realm: "Ethereal",
    summonTemplate: "Earth Elemental",
    lvl: 1,
    cooldown: 30,
    range: 0,
    manualCast: true,
    autocast: false,
    autocastAvailable: false,
    text: "Summon Earth Elemental summons a level [LVL] Earth Elemental pet. Requires [LVL] Ether.",
    formulas: {
      etherCost: { type: "cost", base: 0, perLevel: 1 },
      summonLevel: { type: "level", base: 0, perLevel: 1 }
    },
    cast(game) {
      const lvl = spellLevel(this);
      const cost = lvl;
      if (inventoryItemCount("Ether") < cost) {
        addThrottledLog(`<b>${this.name}</b> needs ${formatNumber(cost)} Ether.`, null, "chronicle", `spell-reagent:${this.name}:Ether:${cost}`);
        spawnFloatingText(game.player, "Need Ether", realmInfo[this.realm]?.color || "#d9c7ff", "#d9c7ff");
        return false;
      }
      removeInventoryStack("Ether", cost);
      markUIDirty();
      removeInvisibility(game.player);
      const point = randomWalkablePointNear(game.player.x, game.player.y, game.player.radius + 36, game.player.radius + 96)
        || { x: game.player.x + game.player.radius + 46, y: game.player.y };
      spawnRaiseSkeletonSmoke(point.x, point.y);
      if (game.mode === "multiplayer" && game.multiplayer.connected) {
        sendMultiplayerAction({
          action: "spell:summon",
          spellName: this.name,
          templateName: "Earth Elemental",
          lvl,
          x: point.x,
          y: point.y
        });
        return true;
      }
      summonPetByTemplate("Earth Elemental", lvl, point.x, point.y, {
        masterId: "player",
        masterName: game.player.name || "Soulreaper"
      });
      return true;
    }
  },
  {
    name: "Summon Fire Elemental",
    realm: "Infernal",
    summonTemplate: "Fire Elemental",
    lvl: 1,
    cooldown: 30,
    range: 0,
    manualCast: true,
    autocast: false,
    autocastAvailable: false,
    text: "Summon Fire Elemental summons a level [LVL] Fire Elemental pet. Requires [LVL] Ether.",
    formulas: {
      etherCost: { type: "cost", base: 0, perLevel: 1 },
      summonLevel: { type: "level", base: 0, perLevel: 1 }
    },
    cast(game) {
      const lvl = spellLevel(this);
      const cost = lvl;
      if (inventoryItemCount("Ether") < cost) {
        addThrottledLog(`<b>${this.name}</b> needs ${formatNumber(cost)} Ether.`, null, "chronicle", `spell-reagent:${this.name}:Ether:${cost}`);
        spawnFloatingText(game.player, "Need Ether", realmInfo[this.realm]?.color || "#d9c7ff", "#d9c7ff");
        return false;
      }
      removeInventoryStack("Ether", cost);
      markUIDirty();
      removeInvisibility(game.player);
      const point = randomWalkablePointNear(game.player.x, game.player.y, game.player.radius + 36, game.player.radius + 96)
        || { x: game.player.x + game.player.radius + 46, y: game.player.y };
      spawnRaiseSkeletonSmoke(point.x, point.y);
      if (game.mode === "multiplayer" && game.multiplayer.connected) {
        sendMultiplayerAction({
          action: "spell:summon",
          spellName: this.name,
          templateName: "Fire Elemental",
          lvl,
          x: point.x,
          y: point.y
        });
        return true;
      }
      summonPetByTemplate("Fire Elemental", lvl, point.x, point.y, {
        masterId: "player",
        masterName: game.player.name || "Soulreaper"
      });
      return true;
    }
  },
  {
    name: "Summon Shade",
    realm: "Umbral",
    summonTemplate: "Shade",
    lvl: 1,
    cooldown: 30,
    range: 0,
    manualCast: true,
    autocast: false,
    autocastAvailable: false,
    text: "Summon Shade summons a level [LVL] Shade pet. Requires [LVL] Ether.",
    formulas: {
      etherCost: { type: "cost", base: 0, perLevel: 1 },
      summonLevel: { type: "level", base: 0, perLevel: 1 }
    },
    cast(game) {
      const lvl = spellLevel(this);
      const cost = lvl;
      if (inventoryItemCount("Ether") < cost) {
        addThrottledLog(`<b>${this.name}</b> needs ${formatNumber(cost)} Ether.`, null, "chronicle", `spell-reagent:${this.name}:Ether:${cost}`);
        spawnFloatingText(game.player, "Need Ether", realmInfo[this.realm]?.color || "#d9c7ff", "#d9c7ff");
        return false;
      }
      removeInventoryStack("Ether", cost);
      markUIDirty();
      removeInvisibility(game.player);
      const point = randomWalkablePointNear(game.player.x, game.player.y, game.player.radius + 36, game.player.radius + 96)
        || { x: game.player.x + game.player.radius + 46, y: game.player.y };
      spawnRaiseSkeletonSmoke(point.x, point.y);
      if (game.mode === "multiplayer" && game.multiplayer.connected) {
        sendMultiplayerAction({
          action: "spell:summon",
          spellName: this.name,
          templateName: "Shade",
          lvl,
          x: point.x,
          y: point.y
        });
        return true;
      }
      summonPetByTemplate("Shade", lvl, point.x, point.y, {
        masterId: "player",
        masterName: game.player.name || "Soulreaper"
      });
      return true;
    }
  },
  {
    name: "Summon Treant",
    realm: "Sylvan",
    summonTemplate: "Treant",
    lvl: 1,
    cooldown: 30,
    range: 0,
    manualCast: true,
    autocast: false,
    autocastAvailable: false,
    text: "Summon Treant summons a level [LVL] Treant pet. Requires [LVL] Ether.",
    formulas: {
      etherCost: { type: "cost", base: 0, perLevel: 1 },
      summonLevel: { type: "level", base: 0, perLevel: 1 }
    },
    cast(game) {
      const lvl = spellLevel(this);
      const cost = lvl;
      if (inventoryItemCount("Ether") < cost) {
        addThrottledLog(`<b>${this.name}</b> needs ${formatNumber(cost)} Ether.`, null, "chronicle", `spell-reagent:${this.name}:Ether:${cost}`);
        spawnFloatingText(game.player, "Need Ether", realmInfo[this.realm]?.color || "#d9c7ff", "#d9c7ff");
        return false;
      }
      removeInventoryStack("Ether", cost);
      markUIDirty();
      removeInvisibility(game.player);
      const point = randomWalkablePointNear(game.player.x, game.player.y, game.player.radius + 36, game.player.radius + 96)
        || { x: game.player.x + game.player.radius + 46, y: game.player.y };
      spawnRaiseSkeletonSmoke(point.x, point.y);
      if (game.mode === "multiplayer" && game.multiplayer.connected) {
        sendMultiplayerAction({
          action: "spell:summon",
          spellName: this.name,
          templateName: "Treant",
          lvl,
          x: point.x,
          y: point.y
        });
        return true;
      }
      summonPetByTemplate("Treant", lvl, point.x, point.y, {
        masterId: "player",
        masterName: game.player.name || "Soulreaper"
      });
      return true;
    }
  },
  {
    name: "Tame Beast",
    realm: "Sylvan",
    lvl: 1,
    cooldown: 150,
    range: 6,
    manualTarget: true,
    autocast: false,
    autocastAvailable: false,
    text: "Tames any Beast up to level 3 for 150 seconds.",
    duration: 150,
    formulas: {
      tameLevel: { type: "level", base: 2, perLevel: 1 }
    },
    cast(game, target) {
      if (!target) return false;
      const maxLevel = spellValue(this, "tameLevel", 2, 1);
      if (target.type !== "Beast") {
        spawnFloatingText(target, "Not a Beast", realmInfo.Sylvan.color, "rgba(0, 0, 0, 0.75)");
        addLog(`<b>Tame Beast</b> can only target Beasts.`);
        return false;
      }
      if (target.pet) {
        spawnFloatingText(target, "Already Tame", realmInfo.Sylvan.color, "rgba(0, 0, 0, 0.75)");
        return false;
      }
      if ((target.lvl || 1) > maxLevel) {
        spawnFloatingText(target, "Too Strong", realmInfo.Sylvan.color, "rgba(0, 0, 0, 0.75)");
        addLog(`<b>${target.name}</b> is too strong to tame.`);
        return false;
      }
      if (protectedFromPlayerEffects(target)) {
        spawnFloatingText(target, "Protected", "#68a85e", "rgba(0, 0, 0, 0.75)");
        return false;
      }
      removeInvisibility(game.player);
      if (game.mode === "multiplayer" && target.id) {
        sendMultiplayerAction({
          action: "spell:direct",
          spellName: "Tame Beast",
          enemyId: target.id,
          realm: "Sylvan",
          range: this.range,
          tameBeast: true,
          maxLevel,
          duration: Number(this.duration ?? 150)
        });
        return true;
      }
      const tamed = tameBeast(target, {
        masterId: "player",
        masterName: game.player.name || "Soulreaper",
        duration: Number(this.duration ?? 150)
      });
      if (tamed) window.SoulreaperQuestUI?.updateTameBeastObjective?.(target);
      return tamed;
    }
  },
  {
    name: "Unholy Dominion",
    realm: "Infernal",
    lvl: 1,
    cooldown: 60,
    range: 6,
    manualTarget: true,
    autocast: false,
    autocastAvailable: false,
    text: "Dominates any Daemon up to level [2 + LVL] for 300 seconds. Successful use lowers Virtue by 1.",
    duration: 300,
    formulas: {
      tameLevel: { type: "level", base: 2, perLevel: 1 }
    },
    cast(game, target) {
      if (!target) return false;
      const maxLevel = spellValue(this, "tameLevel", 2, 1);
      if (!unitTypeIsDaemon(target)) {
        spawnFloatingText(target, "Not a Daemon", realmInfo.Infernal.color, "rgba(0, 0, 0, 0.75)");
        addLog(`<b>Unholy Dominion</b> can only target Daemons.`);
        return false;
      }
      if (target.pet) {
        spawnFloatingText(target, "Already Bound", realmInfo.Infernal.color, "rgba(0, 0, 0, 0.75)");
        return false;
      }
      if ((target.lvl || 1) > maxLevel) {
        spawnFloatingText(target, "Too Strong", realmInfo.Infernal.color, "rgba(0, 0, 0, 0.75)");
        addLog(`<b>${target.name}</b> is too strong to dominate.`);
        return false;
      }
      if (protectedFromPlayerEffects(target)) {
        spawnFloatingText(target, "Protected", realmInfo.Infernal.color, "rgba(0, 0, 0, 0.75)");
        return false;
      }
      removeInvisibility(game.player);
      if (game.mode === "multiplayer" && target.id) {
        const dominated = dominateDaemon(target, {
          masterId: game.multiplayer?.id || "player",
          masterName: game.player.name || "Soulreaper",
          duration: Number(this.duration ?? 300)
        });
        if (!dominated) return false;
        sendMultiplayerAction({
          action: "spell:direct",
          spellName: "Unholy Dominion",
          enemyId: target.id,
          realm: "Infernal",
          range: this.range,
          unholyDominion: true,
          maxLevel,
          duration: Number(this.duration ?? 300)
        });
        window.SoulreaperQuestUI?.updateUnholyDominionObjective?.(target);
        return true;
      }
      const dominated = dominateDaemon(target, {
        masterId: "player",
        masterName: game.player.name || "Soulreaper",
        duration: Number(this.duration ?? 300)
      });
      if (dominated) {
        adjustVirtue(-1);
        window.SoulreaperQuestUI?.updateUnholyDominionObjective?.(target);
      }
      return dominated;
    }
  },
  {
    name: "Divine Shield",
    realm: "Celestial",
    lvl: 1,
    cooldown: 12,
    range: 8,
    manualTarget: true,
    autocast: false,
    autocastAvailable: true,
    text: "Creates a shield around a target that absorbs damage.",
    duration: 8,
    formulas: {
      shield: { type: "shield", base: 0, perLevel: 3 }
    },
    cast(game, target = game.player) {
      if (!canCastFriendlySpellOn(this, target)) return false;
      const duration = Number(this.duration ?? 8);
      const shieldAmount = spellValue(this, "shield", 0, 3);
      const mod = { name: "Divine Shield", remaining: duration, shieldAmount, shieldDamageType: "Physical", shieldColor: realmInfo.Celestial.color, realmXpRealm: "Celestial" };
      if (target !== game.player && game.mode === "multiplayer" && target.id) {
        sendMultiplayerAction({ action: "spell:player", spellName: "Divine Shield", targetPlayerId: target.id, statMod: mod });
        spawnFloatingText(target, "SHIELDED", realmInfo.Celestial.color);
        return true;
      }
      applyDivineShield(target, shieldAmount, duration);
      return true;
    }
  },
  {
    name: "Arcane Shield",
    realm: "Ethereal",
    lvl: 1,
    cooldown: 12,
    range: 8,
    manualTarget: true,
    autocast: false,
    autocastAvailable: true,
    text: "Creates a shield around a target that absorbs magic damage.",
    duration: 8,
    formulas: {
      shield: { type: "shield", base: 0, perLevel: 3 }
    },
    cast(game, target = game.player) {
      if (!canCastFriendlySpellOn(this, target)) return false;
      const duration = Number(this.duration ?? 8);
      const shieldAmount = spellValue(this, "shield", 0, 3);
      const mod = { name: "Arcane Shield", remaining: duration, shieldAmount, shieldDamageType: "Magical", shieldColor: realmInfo.Ethereal.color, realmXpRealm: "Ethereal" };
      if (target !== game.player && game.mode === "multiplayer" && target.id) {
        sendMultiplayerAction({ action: "spell:player", spellName: "Arcane Shield", targetPlayerId: target.id, statMod: mod });
        spawnFloatingText(target, "ARCANE SHIELD", realmInfo.Ethereal.color);
        return true;
      }
      applyArcaneProtection(target, shieldAmount, duration);
      return true;
    }
  },
  {
    name: "Fireblast",
    realm: "Infernal",
    lvl: 1,
    cooldown: 10,
    range: 10,
    aoeRadius: 4,
    duration: 4,
    tick: 1,
    manualTarget: true,
    text: "Ignites an area, dealing Infernal damage every second for 4 seconds.",
    formulas: {
      damage: { type: "damage", base: 0, perLevel: 0.5, stat: "INT", statScale: 1 }
    },
    castAt(x, y) {
      removeInvisibility(game.player);
      const duration = Number(this.duration ?? 4);
      const tick = Number(this.tick ?? 1);
      const castId = typeof sharedEntityId === "function" ? sharedEntityId("fireblast") : `fireblast-${Date.now()}-${Math.random()}`;
      if (game.mode === "multiplayer") {
        sendMultiplayerAction({
          action: "spell:effect",
          spellName: "Fireblast",
          effectType: "fireblast",
          castId,
          x,
          y,
          realm: "Infernal",
          damage: spellDamageValue(this, "damage", 0, 0.5),
          duration,
          tick,
          radius: this.aoeRadius * RANGE_UNIT,
          range: this.range,
          realmXp: true
        });
        return true;
      }
      game.effects.push({
        type: "fireblast",
        x,
        y,
        realm: "Infernal",
        damage: spellDamageValue(this, "damage", 0, 0.5),
        age: 0,
        duration,
        tick,
        tickTimer: 0,
        radius: this.aoeRadius * RANGE_UNIT,
        castId,
        realmXp: true
      });
      return true;
    }
  },
  {
    name: "Fireball",
    realm: "Infernal",
    lvl: 1,
    cooldown: 6,
    range: 10,
    manualTarget: true,
    autocast: true,
    text: "Fires a flaming projectile at the nearest enemy, dealing Infernal damage and burning it over 4 seconds.",
    duration: 4,
    tick: 1,
    formulas: {
      damage: { type: "damage", base: 4, perLevel: 1, stat: "INT", statScale: 1 },
      dotDamageMultiplier: { type: "multiplier", base: 0.25, perLevel: 0 }
    },
    cast(game, target) {
      if (!target) return false;
      const damage = spellDamageValue(this, "damage", 4, 1);
      const duration = Number(this.duration ?? 4);
      const tick = Number(this.tick ?? 1);
      const dotDamage = roundUpTenth(damage * spellValue(this, "dotDamageMultiplier", 0.25, 0));
      removeInvisibility(game.player);
      if (game.mode === "multiplayer" && target.id) {
        sendMultiplayerAction({
          action: "spell:projectile",
          spellName: "Fireball",
          enemyId: target.id,
          damage,
          realm: "Infernal",
          color: realmInfo.Infernal.color,
          label: "Fireball",
          radius: 7,
          speed: 330,
          trail: "#f0cf63",
          dmgType: "Magical",
          range: this.range,
          dot: { name: "Fireball", realm: "Infernal", damage: dotDamage, tick, timer: tick, remaining: duration, dmgType: "Magical", realmXp: true },
          projectileAnimation: "fireball",
          realmXp: true
        });
        return true;
      }
      game.projectiles.push(makeProjectile({
        source: game.player,
        target,
        damage,
        realm: "Infernal",
        color: realmInfo.Infernal.color,
        label: "Fireball",
        radius: 7,
        speed: 330,
        trail: "#f0cf63",
        dmgType: "Magical",
        dot: { name: "Fireball", realm: "Infernal", damage: dotDamage, tick, duration, dmgType: "Magical", realmXp: true },
        projectileAnimation: "fireball",
        realmXp: true
      }));
      window.SoulreaperQuestUI?.updateFirstFlameObjective?.(target);
      return true;
    }
  },
  {
    name: "Aura of Protection",
    realm: "Celestial",
    lvl: 1,
    cooldown: 0,
    range: 6,
    passive: true,
    aura: true,
    text: "Increases DEF of the Soulreaper and allies within range.",
    formulas: {
      defenseBonus: { type: "stat", base: 0, perLevel: 0.25 }
    },
    cast() {
      return false;
    }
  },
  {
    name: "Etherwind Aura",
    realm: "Ethereal",
    lvl: 1,
    cooldown: 0,
    range: 9,
    passive: true,
    aura: true,
    text: "Increases INT and RESIST of the Soulreaper and allies within range.",
    formulas: {
      intelligenceBonus: { type: "stat", base: 0, perLevel: 0.5 },
      resistBonus: { type: "stat", base: 0, perLevel: 0.5 }
    },
    cast() {
      return false;
    }
  },
  {
    name: "Dark Circle",
    realm: "Infernal",
    lvl: 1,
    cooldown: 18,
    range: 8,
    aoeRadius: 5,
    duration: 12,
    tick: 0.5,
    manualTarget: true,
    text: "Creates a glowing red pentagram. Friendly units inside gain ATK.",
    formulas: {
      attackBonus: { type: "stat", base: 0, perLevel: 0.5 }
    },
    castAt(x, y) {
      const duration = Number(this.duration ?? 12);
      const tick = Number(this.tick ?? 0.5);
      const attackBonus = spellValue(this, "attackBonus", 0, 0.5);
      const statMod = { name: "Dark Circle", remaining: 0.8, addStats: { ATK: attackBonus } };
      if (game.mode === "multiplayer") {
        sendMultiplayerAction({
          action: "spell:effect",
          spellName: "Dark Circle",
          effectType: "darkCircle",
          x,
          y,
          realm: "Infernal",
          duration,
          tick,
          radius: this.aoeRadius * RANGE_UNIT,
          range: this.range,
          statMod
        });
        return true;
      }
      game.effects.push({
        type: "darkCircle",
        x,
        y,
        realm: "Infernal",
        age: 0,
        duration,
        tick,
        tickTimer: 0,
        radius: this.aoeRadius * RANGE_UNIT,
        statMod
      });
      return true;
    }
  },
  {
    name: "Song of White Stag",
    realm: "Sylvan",
    lvl: 1,
    cooldown: 0,
    range: 6,
    passive: true,
    aura: true,
    text: "Increases REGEN of the Soulreaper and allies within range.",
    formulas: {
      regenBonus: { type: "stat", base: 0, perLevel: 0.5 }
    },
    cast() {
      return false;
    }
  },
  {
    name: "Lifesteal",
    realm: "Umbral",
    lvl: 1,
    cooldown: 8,
    range: 6,
    manualTarget: true,
    autocast: true,
    text: "Deals Umbral damage to an enemy and returns half of it to the Soulreaper.",
    formulas: {
      damage: { type: "damage", base: 6, perLevel: 1, stat: "INT", statScale: 1 },
      healMultiplier: { type: "multiplier", base: 0.5, perLevel: 0 }
    },
    cast(game, target) {
      if (!target) return false;
      const damage = spellDamageValue(this, "damage", 6, 1);
      removeInvisibility(game.player);
      if (game.mode === "multiplayer" && target.id) {
        sendMultiplayerAction({
          action: "spell:direct",
          spellName: "Lifesteal",
          enemyId: target.id,
          damage,
          realm: "Umbral",
          range: this.range,
          dmgType: "Magical",
          realmXp: true,
          healFraction: spellValue(this, "healMultiplier", 0.5, 0)
        });
        game.effects.push({ type: "lifesteal", source: game.player, targetX: target.x, targetY: target.y, age: 0, duration: 0.22, localOnly: true });
        return true;
      }
      const hpBefore = target.hp;
      applyDamage(target, damage, "Umbral", "Lifesteal", "Magical");
      grantRealmXP("Umbral", Math.max(0, hpBefore - Math.max(0, target.hp)));
      const dealt = Math.max(0, hpBefore - Math.max(0, target.hp));
      const healed = roundUpTenth(Math.min(roundUpTenth(dealt * spellValue(this, "healMultiplier", 0.5, 0)), game.player.maxHp - game.player.hp));
      if (healed > 0) {
        game.player.hp += healed;
        spawnFloatingText(game.player, `+${formatNumber(healed)}`, "#61d66f");
      }
      game.effects.push({ type: "lifesteal", source: game.player, targetX: target.x, targetY: target.y, age: 0, duration: 0.22, localOnly: true });
      addLog(`Lifesteal restores <b>${formatNumber(healed)}</b> HP.`);
      return true;
    }
  },
  {
    name: "Mortify",
    realm: "Umbral",
    lvl: 1,
    cooldown: 14,
    range: 6,
    manualTarget: true,
    autocast: false,
    text: "Forces the targeted unit to flee away from the caster for {duration} seconds.",
    formulas: {
      duration: { type: "duration", base: 0, perLevel: 0.5 }
    },
    cast(game, target) {
      if (!target) return false;
      const duration = spellValue(this, "duration", 0, 0.5);
      removeInvisibility(game.player);
      if (game.mode === "multiplayer" && target.id && game.enemies.includes(target)) {
        target.mortified = Math.max(target.mortified || 0, duration);
        target.mortifySourceX = game.player.x;
        target.mortifySourceY = game.player.y;
        clearEnemyCombat(target);
        target.leashState = "idle";
        spawnFloatingText(target, "MORTIFY", realmInfo.Umbral?.color || "#9b5cff", "rgba(0, 0, 0, 0.8)");
        sendMultiplayerAction({
          action: "spell:direct",
          spellName: "Mortify",
          enemyId: target.id,
          damage: 0,
          realm: "Umbral",
          range: this.range,
          dmgType: "Status",
          mortified: duration,
          mortifySourceX: game.player.x,
          mortifySourceY: game.player.y,
          realmXp: false
        });
        return true;
      }
      return applyMortify(target, game.player, duration);
    }
  },
  {
    name: "Spirit of Avia",
    realm: "Sylvan",
    lvl: 1,
    cooldown: 24,
    range: 0,
    manualTarget: true,
    autocast: false,
    text: "Increases SPD and AGL, and grants Flying for 8 seconds.",
    duration: 8,
    formulas: {
      speedBonus: { type: "stat", base: 0, perLevel: 0.5 },
      agilityBonus: { type: "stat", base: 0, perLevel: 1 }
    },
    cast(game, target = game.player) {
      if (!canCastFriendlySpellOn(this, target)) return false;
      const duration = Number(this.duration ?? 8);
      const speedBonus = spellValue(this, "speedBonus", 0, 0.5);
      const agilityBonus = spellValue(this, "agilityBonus", 0, 1);
      if (target !== game.player && game.mode === "multiplayer" && target.id) {
        sendMultiplayerAction({
          action: "spell:player",
          spellName: "Spirit of Avia",
          targetPlayerId: target.id,
          statMod: {
            name: "Spirit of Avia",
            remaining: duration,
            addStats: { SPD: speedBonus, AGL: agilityBonus },
            flying: true
          }
        });
        spawnFloatingText(target, "AVIA", realmInfo.Sylvan.color);
        return true;
      }
      const existing = target.statMods.find(mod => mod.name === "Spirit of Avia");
      if (existing) existing.remaining = duration;
      else target.statMods.push({
        name: "Spirit of Avia",
        remaining: duration,
        addStats: { SPD: speedBonus, AGL: agilityBonus },
        flying: true
      });
      markUIDirty();
      spawnFloatingText(target, "AVIA", realmInfo.Sylvan.color);
      return true;
    }
  },
  {
    name: "Thorn Shield",
    realm: "Sylvan",
    lvl: 1,
    cooldown: 24,
    range: 0,
    manualCast: true,
    text: "Enemies with close-range weapons take Sylvan damage when they hit the Soulreaper.",
    duration: 8,
    formulas: {
      damage: { type: "damage", base: 0, perLevel: 0.5, stat: "INT", statScale: 1 }
    },
    cast(game) {
      const damage = spellDamageValue(this, "damage", 0, 0.5);
      const duration = Number(this.duration ?? 8);
      const existing = game.player.statMods.find(mod => mod.name === "Thorn Shield");
      if (existing) {
        existing.remaining = duration;
        existing.damage = damage;
        existing.lvl = spellLevel(this);
      } else {
        game.player.statMods.push({
          name: "Thorn Shield",
          remaining: duration,
          damage,
          lvl: spellLevel(this),
          thornShield: true
        });
      }
      spawnFloatingText(game.player, "THORNS", realmInfo.Sylvan.color);
      addLog("<b>Thorn Shield</b> surrounds you.");
      return true;
    }
  },
  {
    name: "Burning Skin",
    realm: "Infernal",
    lvl: 1,
    cooldown: 0,
    range: 0,
    passive: true,
    text: "A passive Infernal shield. Enemies with close-range weapons take Infernal damage when they hit the Soulreaper.",
    formulas: {
      damage: { type: "damage", base: 0, perLevel: 0.5, stat: "INT", statScale: 1 }
    }
  },
  {
    name: "Faerie Fire",
    realm: "Sylvan",
    lvl: 1,
    cooldown: 8,
    range: 8,
    aoeRadius: 4,
    duration: 1.2,
    manualTarget: true,
    text: "Afflicts enemies in the target area, reducing DEF and making them glow green.",
    formulas: {
      defensePenalty: { type: "stat", base: 0, perLevel: -0.5 }
    },
    castAt(x, y) {
      const duration = Number(this.duration ?? 1.2);
      const defensePenalty = spellValue(this, "defensePenalty", 0, -0.5);
      if (game.mode === "multiplayer") {
        game.effects.push({ type: "faerieFire", x, y, age: 0, duration, radius: this.aoeRadius * RANGE_UNIT });
        for (const enemy of [...game.enemies]) {
          if (distance({ x, y }, enemy) > this.aoeRadius * RANGE_UNIT + enemy.radius) continue;
          if (protectedFromPlayerEffects(enemy)) continue;
          window.SoulreaperQuestUI?.updateFaerieFireObjective?.(enemy);
        }
        sendMultiplayerAction({
          action: "spell:effect",
          spellName: "Faerie Fire",
          effectType: "faerieFire",
          x,
          y,
          realm: "Sylvan",
          duration,
          radius: this.aoeRadius * RANGE_UNIT,
          range: this.range,
          statMod: { name: "Faerie Fire", remaining: 6, addStats: { DEF: defensePenalty } }
        });
        return true;
      }
      game.effects.push({
        type: "faerieFire",
        x,
        y,
        age: 0,
        duration,
        radius: this.aoeRadius * RANGE_UNIT
      });
      for (const enemy of [...game.enemies]) {
        if (distance({ x, y }, enemy) > this.aoeRadius * RANGE_UNIT + enemy.radius) continue;
        if (protectedFromPlayerEffects(enemy)) {
          spawnFloatingText(enemy, "Protected", "#68a85e", "rgba(0, 0, 0, 0.75)");
          continue;
        }
        provokeEnemy(enemy);
        applyFaerieFire(enemy, spellLevel(this), 6, defensePenalty);
        window.SoulreaperQuestUI?.updateFaerieFireObjective?.(enemy);
      }
      return true;
    }
  },
  {
    name: "Faerie Circle",
    realm: "Sylvan",
    lvl: 1,
    cooldown: 18,
    range: 8,
    aoeRadius: 5,
    duration: 12,
    tick: 0.5,
    manualTarget: true,
    text: "Creates a pink glittering circle. Friendly units inside gain RESIST.",
    formulas: {
      resistBonus: { type: "stat", base: 0, perLevel: 1 }
    },
    castAt(x, y) {
      const duration = Number(this.duration ?? 12);
      const tick = Number(this.tick ?? 0.5);
      const resistBonus = spellValue(this, "resistBonus", 0, 1);
      const statMod = { name: "Faerie Circle", remaining: 0.8, addStats: { RESIST: resistBonus } };
      if (game.mode === "multiplayer") {
        sendMultiplayerAction({
          action: "spell:effect",
          spellName: "Faerie Circle",
          effectType: "faerieCircle",
          x,
          y,
          realm: "Sylvan",
          duration,
          tick,
          radius: this.aoeRadius * RANGE_UNIT,
          range: this.range,
          statMod
        });
        return true;
      }
      game.effects.push({
        type: "faerieCircle",
        x,
        y,
        realm: "Sylvan",
        age: 0,
        duration,
        tick,
        tickTimer: 0,
        radius: this.aoeRadius * RANGE_UNIT,
        statMod
      });
      return true;
    }
  },
  {
    name: "Faerie Dust",
    realm: "Sylvan",
    lvl: 1,
    cooldown: 4,
    range: 5,
    manualTarget: true,
    autocast: true,
    text: "Afflicts the target with pink sparkles, reducing SPD, AGL, and Sylvan RESIST.",
    duration: 6,
    formulas: {
      speedPenalty: { type: "stat", base: 0, perLevel: -2 },
      agilityPenalty: { type: "stat", base: 0, perLevel: -2 },
      sylvanResistPenalty: { type: "resistance", base: 0, perLevel: -1 }
    },
    cast(game, target) {
      if (!target) return false;
      if (protectedFromPlayerEffects(target)) {
        spawnFloatingText(target, "Protected", "#68a85e", "rgba(0, 0, 0, 0.75)");
        return false;
      }
      const duration = Number(this.duration ?? 6);
      const wasIncorporeal = Boolean(target.incorporeal);
      const speedPenalty = spellValue(this, "speedPenalty", 0, -2);
      const agilityPenalty = spellValue(this, "agilityPenalty", 0, -2);
      const sylvanResistPenalty = spellValue(this, "sylvanResistPenalty", 0, -1);
      if (game.mode === "multiplayer" && target.id) {
        sendMultiplayerAction({
          action: "spell:direct",
          spellName: "Faerie Dust",
          enemyId: target.id,
          realm: "Sylvan",
          range: this.range,
          statMod: {
            name: "Faerie Dust",
            remaining: duration,
            addStats: { SPD: speedPenalty, AGL: agilityPenalty },
            addResistances: { Sylvan: sylvanResistPenalty },
            corporeal: true
          }
        });
        spawnFloatingText(target, "DUST", "#ff9bdc", "rgba(65, 0, 45, 0.85)");
        window.SoulreaperQuestUI?.updateFaerieDustObjective?.(target, wasIncorporeal);
        return true;
      }
      provokeEnemy(target);
      applyFaerieDust(target, spellLevel(this), duration, { SPD: speedPenalty, AGL: agilityPenalty }, { Sylvan: sylvanResistPenalty });
      window.SoulreaperQuestUI?.updateFaerieDustObjective?.(target, wasIncorporeal);
      return true;
    }
  },
  {
    name: "Bone Ritual",
    realm: "Umbral",
    lvl: 1,
    cooldown: 4,
    range: 8,
    manualTarget: true,
    autocast: true,
    text: "Consumes a Bone to restore 1.5 HP per LVL to a friendly target.",
    formulas: {
      heal: { type: "heal", base: 0, perLevel: 1.5 }
    },
    cast(game, target = game.player) {
      if (!canCastFriendlySpellOn(this, target)) return false;
      if (inventoryItemCount("Bone") < 1) {
        addThrottledLog("<b>Bone Ritual</b> requires <b>1 Bone</b>.", null, "chronicle", "spell-reagent:Bone Ritual:Bone:1");
        return false;
      }
      const healAmount = spellValue(this, "heal", 0, 1.5);
      const targetIsEnemy = game.enemies.includes(target);
      const palette = { stroke: "#d9a8ff", fill: "rgba(125, 54, 178, 0.32)", moteA: "#f0d0ff", moteB: realmInfo.Umbral.color };
      if (targetIsEnemy && game.mode === "multiplayer" && target.id) {
        const healed = roundUpTenth(Math.max(0, Math.min(healAmount, (target.maxHp || healAmount) - (target.hp || 0))));
        if (healed <= 0) return false;
        removeInventoryStack("Bone", 1);
        sendMultiplayerAction({
          action: "spell:unit-heal",
          spellName: "Bone Ritual",
          enemyId: target.id,
          heal: healAmount,
          palette
        });
        grantRealmXP("Umbral", healed);
        spawnFloatingText(target, `+${formatNumber(healed)}`, realmInfo.Umbral.color);
        spawnPrayerSparkles(target, palette);
        window.SoulreaperQuestUI?.updateBoneRitualObjective?.();
        return true;
      }
      if (target !== game.player && game.mode === "multiplayer" && target.id) {
        const healed = roundUpTenth(Math.max(0, Math.min(healAmount, (target.maxHp || healAmount) - (target.hp || 0))));
        if (healed <= 0) return false;
        removeInventoryStack("Bone", 1);
        sendMultiplayerAction({
          action: "spell:player",
          spellName: "Bone Ritual",
          targetPlayerId: target.id,
          heal: healAmount,
          palette
        });
        grantRealmXP("Umbral", healed);
        spawnPrayerSparkles(target, palette);
        window.SoulreaperQuestUI?.updateBoneRitualObjective?.();
        return true;
      }
      const healed = roundUpTenth(Math.min(healAmount, target.maxHp - target.hp));
      if (healed <= 0) return false;
      removeInventoryStack("Bone", 1);
      target.hp += healed;
      grantRealmXP("Umbral", healed);
      spawnFloatingText(target, `+${formatNumber(healed)}`, realmInfo.Umbral.color);
      spawnPrayerSparkles(target, palette);
      addLog(`Bone Ritual restores <b>${formatNumber(healed)} HP</b>.`, target);
      window.SoulreaperQuestUI?.updateBoneRitualObjective?.();
      return true;
    }
  },
  {
    name: "Pestilent Aura",
    realm: "Umbral",
    lvl: 1,
    cooldown: 0,
    range: 6,
    passive: true,
    aura: true,
    text: "Deals LVL/5 Umbral damage every second to non-Umbral enemies within range. REGEN is 0 while active.",
    tick: 1,
    formulas: {
      damage: { type: "damage", base: 0, perLevel: 0.2, stat: null, statScale: 0 }
    },
    cast() {
      return false;
    }
  },
  {
    name: "Poison",
    realm: "Mortal",
    lvl: 1,
    cooldown: 0,
    range: 0,
    passive: true,
    text: "Weapon attacks have a 50% chance to poison an enemy.",
    duration: 4,
    tick: 1,
    formulas: {
      totalDamage: { type: "damage", base: 0, perLevel: 1, stat: null, statScale: 0 }
    },
    cast() {
      return false;
    }
  }
];

const spellIconFiles = {
  "Magic Missile": "magic-missile.png",
  Rage: "rage.png",
  "Archery Mastery": "archery-mastery.png",
  "Axe Mastery": "axe-mastery.png",
  "Mace Mastery": "mace-mastery.png",
  "Dagger Mastery": "dagger-mastery.png",
  "Shield Mastery": "shield-mastery.png",
  "Shield Bash": "shield-bash.png",
  "Battle Cry": "battle-cry.png",
  "Dual Wield": "dual-wield.png",
  "War Drums": "war-drums.png",
  "Bloodthirsty Aura": "bloodthirsty-aura.png",
  "Ring of Fire": "ring-of-fire.png",
  "Basic Prayer": "basic-prayer.png",
  "Heavenly Light": "heavenly-light.png",
  Godspeed: "godspeed.png",
  "Curse of Disdain": "curse-of-disdain.png",
  "Tangle Vine": "tangle-vine.png",
  "Briar Lash": "briar-lash.png",
  Chlorophyll: "chlorophyll.png",
  "Wooden Skin": "wooden-skin.png",
  "Sacred Grove": "sacred-grove.png",
  Spiderweb: "spiderweb.png",
  Pacify: "pacify.png",
  Hypnotize: "hypnotize.png",
  Invisibility: "invisibility.png",
  Banish: "banish.png",
  Clarity: "clarity.png",
  "Summon Portal": "summon-portal.png",
  "Ice Bolt": "ice-bolt.png",
  "Ice Storm": "ice-storm.png",
  "Chain Lightning": "chain-lightning.png",
  "Grace from Above": "grace-from-above.png",
  "Divine Shield": "divine-shield.png",
  "Arcane Shield": "arcane-protection.png",
  "Raise Skeleton": "raise-skeleton.png",
  "Summon Water Elemental": "summon-water-elemental.png",
  "Summon Earth Elemental": "summon-earth-elemental.png",
  "Summon Fire Elemental": "summon-fire-elemental.png",
  "Summon Shade": "summon-shade.png",
  "Summon Treant": "summon-treant.png",
  "Tame Beast": "tame-beast.png",
  "Unholy Dominion": "unholy-dominion.png",
  Fireblast: "fireblast.png",
  Fireball: "fireball.png",
  "Aura of Protection": "aura-of-protection.png",
  "Etherwind Aura": "etherwind-aura.png",
  "Dark Circle": "dark-circle.png",
  "Song of White Stag": "song-of-white-stag.png",
  Lifesteal: "lifesteal.png",
  Mortify: "mortify.png",
  "Bone Ritual": "bone-ritual.png",
  "Pestilent Aura": "pestilent-aura.png",
  "Virulent Plague": "virulent-plague.png",
  "Spirit of Avia": "spirit-of-avia.png",
  "Thorn Shield": "thorn-shield.png",
  "Burning Skin": "burning-skin.png",
  "Faerie Fire": "faerie-fire.png",
  "Faerie Circle": "faerie-circle.png",
  "Faerie Dust": "faerie-dust.png",
  Poison: "poison.png"
};

window.SoulreaperSpells = {
  starterSpells,
  spellIconFiles
};
})();
