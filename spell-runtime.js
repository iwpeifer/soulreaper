// Spell description and icon helpers extracted from game.js.
(function () {
  function spellLevel(spell) {
    if (spell?.static) return 1;
    return spell.lvl || 1;
  }
  
  function spellValue(spell, formulaKeyOrBase, baseOrPerLevel, maybePerLevel) {
    const keyed = typeof formulaKeyOrBase === "string";
    const formulaKey = keyed ? formulaKeyOrBase : null;
    const base = keyed ? baseOrPerLevel : formulaKeyOrBase;
    const perLevel = keyed ? maybePerLevel : baseOrPerLevel;
    const formula = spellFormulaFor(spell, formulaKey, base, perLevel, "value");
    const raw = spellFormulaBaseValue(spell, formula, base, perLevel);
    if (formula?.type === "heal") {
      const stat = formula.stat === undefined ? "INT" : formula.stat;
      const statScale = Number(formula.statScale ?? 1);
      const caster = formula.caster || game.player;
      const multiplier = stat ? 1 + (effectiveStat(caster, stat) * statScale) / 100 : 1;
      return roundUpTenth(raw * multiplier);
    }
    return roundUpTenth(raw);
  }
  
  function spellDamageValue(spell, formulaKeyOrBase, baseOrPerLevel, maybePerLevelOrCaster = game.player, maybeCaster = game.player) {
    const keyed = typeof formulaKeyOrBase === "string";
    const formulaKey = keyed ? formulaKeyOrBase : null;
    const base = keyed ? baseOrPerLevel : formulaKeyOrBase;
    const perLevel = keyed ? maybePerLevelOrCaster : baseOrPerLevel;
    const caster = keyed ? maybeCaster : maybePerLevelOrCaster;
    const formula = spellFormulaFor(spell, formulaKey, base, perLevel, "damage");
    const raw = spellFormulaBaseValue(spell, formula, base, perLevel);
    const stat = formula?.stat === undefined ? "INT" : formula.stat;
    const statScale = Number(formula?.statScale ?? 1);
    const multiplier = stat ? 1 + (effectiveStat(caster, stat) * statScale) / 100 : 1;
    return roundUpTenth(raw * multiplier);
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
  
  function poisonTotalDamage(spell) {
    return spellDamageValue(spell, "totalDamage", 0, 1);
  }
  
  function poisonTickDamage(spell) {
    const tick = Number(spell.tick ?? 1);
    const duration = Number(spell.duration ?? 4);
    const tickCount = Math.max(1, Math.ceil(duration / tick));
    return roundUpTenth(poisonTotalDamage(spell) / tickCount);
  }

  function spellFormulaValue(spell, key) {
    if (key === "lvl" || key === "level") return spellLevel(spell);
    if (key === "duration") return Number(spell.duration ?? 0);
    if (key === "tick") return Number(spell.tick ?? 0);
    if (key === "aoeRadius" || key === "aoe") return Number(spell.aoeRadius ?? 0);
    const formula = spell?.formulas?.[key];
    if (!formula || typeof formula !== "object") return null;
    const type = formula.type || "value";
    if (type === "damage") return spellDamageValue(spell, key, 0, 0);
    return spellValue(spell, key, 0, 0);
  }
  
  function renderSpellTextTemplate(text, spell) {
    return String(text || "").replace(/\{([A-Za-z][A-Za-z0-9_]*)\}/g, (match, key) => {
      const value = spellFormulaValue(spell, key);
      return value === null ? match : formatNumber(value);
    });
  }
  
  function spellDescription(spell) {
    const defaultTemplate = spellTemplateByName(spell.name);
    if (spell.text && (!defaultTemplate || spell.text !== defaultTemplate.text)) return renderSpellTextTemplate(spell.text, spell);
    if (spell.name === "Magic Missile") {
      return `Fires a projectile at the nearest enemy, dealing ${formatNumber(spellDamageValue(spell, "damage", 6, 1))} Ethereal damage.`;
    }
    if (spell.name === "Archery Mastery") {
      return `Decreases Delay of equipped bows by ${formatNumber(spellValue(spell, "bowDelayReduction", 0, 3))}.`;
    }
    if (spell.name === "Axe Mastery") {
      return `Decreases Delay of wielded axes by ${formatNumber(spellValue(spell, "axeDelayReduction", 0, 3))}.`;
    }
    if (spell.name === "Mace Mastery") {
      return `Increases mace stun chance by ${formatNumber(spellValue(spell, "stunChanceBonus", 0, 1))}%.`;
    }
    if (spell.name === "Dagger Mastery") {
      return `Increases FOCUS by ${formatNumber(spellValue(spell, "focusBonus", 4, 1))} while a Stab weapon is equipped. Critical hits with Stab weapons grant Mortal Realm XP.`;
    }
    if (spell.name === "Shield Mastery") {
      return `Increases BLOCK by ${formatNumber(spellValue(spell, "blockBonus", 0, 1))} while a Shield is equipped. Successful shield blocks grant Mortal Realm XP.`;
    }
    if (spell.name === "Dual Wield") {
      return `Allows a One-Handed weapon in the Off-Hand slot. Off-Hand attacks deal ${formatNumber(spellValue(spell, "offHandDamagePercent", 8, 2))}% damage.`;
    }
    if (spell.name === "War Drums") {
      return `Increases AGL of the Soulreaper and allies within range by ${formatNumber(spellValue(spell, "agilityBonus", 0, 2.5))}.`;
    }
    if (spell.name === "Bloodthirsty Aura") {
      return `Increases FOCUS of the Soulreaper and allies within range by ${formatNumber(spellValue(spell, "focusBonus", 0, 1))}.`;
    }
    if (spell.name === "Rage") {
      return `Increases ATK by ${formatNumber(spellValue(spell, "attackBonus", 0, 0.5))}, DEF by ${formatNumber(spellValue(spell, "defenseBonus", 0, 1))}, and AGL by ${formatNumber(spellValue(spell, "agilityBonus", 0, 1))} for ${formatNumber(spell.duration ?? 8)} seconds. Mortal damage dealt while enraged grants Mortal Realm XP.`;
    }
    if (spell.name === "Ring of Fire") {
      return `Creates a large ring for ${formatNumber(spell.duration ?? 3)} seconds. Enemies touching it take ${formatNumber(spellDamageValue(spell, "damage", 0.5, 0.5))} Infernal damage every ${formatNumber(spell.tick ?? 0.25)} seconds.`;
    }
    if (spell.name === "Basic Prayer") {
      return `Restores ${formatNumber(spellValue(spell, "heal", 2.5, 0.5))} HP, or deals that much Celestial damage to Umbral Revenants.`;
    }
    if (spell.name === "Heavenly Light") {
      return `Restores ${formatNumber(spellValue(spell, "heal", 5, 2))} HP to an ally, or deals that much Celestial damage to Umbral Revenants.`;
    }
    if (spell.name === "Godspeed") {
      return `Increases SPD by ${formatNumber(spellValue(spell, "speedBonus", 0, 0.25))} for ${formatNumber(spell.duration ?? 60)} seconds.`;
    }
    if (spell.name === "Curse of Disdain") {
      return `Curses the nearest enemy for ${formatNumber(spellDamageValue(spell, "dotDamage", 0.5, 0.5))} Umbral damage every ${formatNumber(spell.tick ?? 1)} seconds for ${formatNumber(spell.duration ?? 8)} seconds.`;
    }
    if (spell.name === "Tangle Vine") {
      return `Deals ${formatNumber(spellDamageValue(spell, "damage", 2.5, 0.5))} Sylvan damage and roots the nearest enemy for ${formatNumber(spellValue(spell, "rootDuration", 1.5, 0.5))} seconds.`;
    }
    if (spell.name === "Chlorophyll") {
      return `Heals a friendly target for ${formatNumber(spellValue(spell, "heal", 0, 0.5))} HP every ${formatNumber(spell.tick ?? 1)} second for ${formatNumber(spell.duration ?? 30)} seconds.`;
    }
    if (spell.name === "Wooden Skin") {
      return `Increases a friendly target's DEF by ${formatNumber(spellValue(spell, "defenseBonus", 0, 0.5))} for ${formatNumber(spell.duration ?? 30)} seconds.`;
    }
    if (spell.name === "Sacred Grove") {
      return `Creates a ring of enchanted trees around the Soulreaper for ${formatNumber(spellValue(spell, "duration", 4, 2))} seconds. Enemies outside the grove cannot enter it or target anything inside.`;
    }
    if (spell.name === "Pacify") {
      return `Removes aggression from a hostile enemy for ${formatNumber(spellValue(spell, "pacifyDuration", 1, 0.5))} seconds.`;
    }
    if (spell.name === "Hypnotize") {
      return `Stuns a single target for a random duration up to ${formatNumber(spellValue(spell, "duration", 0, 0.5))} seconds. Duration is reduced by the target's Ethereal resistance.`;
    }
    if (spell.name === "Invisibility") {
      return `Turns the Soulreaper or an ally invisible to enemies for ${formatNumber(spellValue(spell, "duration", 0, 1))} seconds.`;
    }
    if (spell.name === "Banish") {
      return `Turns the Soulreaper, an ally, or an enemy incorporeal for ${formatNumber(spellValue(spell, "duration", 0, 1))} seconds.`;
    }
    if (spell.name === "Summon Portal") {
      return "Places an Ethereal portal marker. Cast again to turn the marker and the new location into linked Portals any player can use.";
    }
    if (spell.name === "Clarity") {
      return `Target gains ${formatNumber(spellValue(spell, "intelligenceBonus", 0, 1))} INT for ${formatNumber(spell.duration ?? 15)} seconds.`;
    }
    if (spell.name === "Ice Bolt") {
      return `Deals ${formatNumber(spellDamageValue(spell, "damage", 4, 1))} Ethereal damage and Freezes the target for ${formatNumber(spell.duration ?? 4)} seconds.`;
    }
    if (spell.name === "Ice Storm") {
      return `Rains ice down on an area, dealing ${formatNumber(spellDamageValue(spell, "damage", 0, 0.5))} Ethereal damage every ${formatNumber(spell.tick ?? 1)} seconds for ${formatNumber(spell.duration ?? 4)} seconds and Freezing enemies.`;
    }
    if (spell.name === "Chain Lightning") {
      const damage = spellDamageValue(spell, "damage", 0, 1.25);
      return `Deals ${formatNumber(damage)} Celestial damage, then jumps to nearby enemies for ${formatNumber(roundUpTenth(damage * spellValue(spell, "jumpDamageMultiplier", 0.75, 0)))} Celestial damage.`;
    }
    if (spell.name === "Divine Shield") {
      return `Creates a shield around an ally that absorbs up to ${formatNumber(spellValue(spell, "shield", 0, 3))} damage for ${formatNumber(spell.duration ?? 8)} seconds.`;
    }
    if (spell.name === "Arcane Shield") {
      return `Creates a shield around an ally that absorbs up to ${formatNumber(spellValue(spell, "shield", 0, 3))} magic damage for ${formatNumber(spell.duration ?? 8)} seconds.`;
    }
    if (spell.name === "Fireblast") {
      return `Ignites an area, dealing ${formatNumber(spellDamageValue(spell, "damage", 0, 0.5))} Infernal damage every ${formatNumber(spell.tick ?? 1)} seconds for ${formatNumber(spell.duration ?? 4)} seconds.`;
    }
    if (spell.name === "Fireball") {
      const damage = spellDamageValue(spell, "damage", 4, 1);
      return `Fires a flaming projectile at the nearest enemy, dealing ${formatNumber(damage)} Infernal damage and ${formatNumber(roundUpTenth(damage * spellValue(spell, "dotDamageMultiplier", 0.25, 0)))} Infernal damage every ${formatNumber(spell.tick ?? 1)} seconds for ${formatNumber(spell.duration ?? 4)} seconds.`;
    }
    if (spell.name === "Aura of Protection") {
      return `Increases DEF of the Soulreaper and allies within range by ${formatNumber(spellValue(spell, "defenseBonus", 0, 0.25))}.`;
    }
    if (spell.name === "Song of White Stag") {
      return `Increases REGEN of the Soulreaper and allies within range by ${formatNumber(spellValue(spell, "regenBonus", 0, 0.5))}.`;
    }
    if (spell.name === "Pestilent Aura") {
      return `Deals ${formatNumber(spellDamageValue(spell, "damage", 0, 0.2))} Umbral damage every ${formatNumber(spell.tick ?? 1)} second to non-Umbral enemies within range. REGEN is 0 while active.`;
    }
    if (spell.name === "Lifesteal") {
      return `Deals ${formatNumber(spellDamageValue(spell, "damage", 6, 1))} Umbral damage to an enemy and restores ${formatNumber(spellValue(spell, "healMultiplier", 0.5, 0) * 100)}% of the damage to the Soulreaper.`;
    }
    if (spell.name === "Raise Skeleton") {
      return `Consumes ${formatNumber(spellLevel(spell))} Bones to raise a level ${formatNumber(spellLevel(spell))} Skeleton companion.`;
    }
    if (spell.name === "Tame Beast") {
      return `Tames any Beast up to level ${formatNumber(spellValue(spell, "tameLevel", 2, 1))} for ${formatNumber(spell.duration ?? 150)} seconds.`;
    }
    if (spell.name === "Spirit of Avia") {
      return `Increases Soulreaper SPD by ${formatNumber(spellValue(spell, "speedBonus", 0, 0.5))}, AGL by ${formatNumber(spellValue(spell, "agilityBonus", 0, 1))}, and grants Flying for ${formatNumber(spell.duration ?? 8)} seconds.`;
    }
    if (spell.name === "Thorn Shield") {
      return `Creates a thorny Sylvan aura for ${formatNumber(spell.duration ?? 8)} seconds. Enemies using close-range weapons take ${formatNumber(spellDamageValue(spell, "damage", 0, 0.5))} Sylvan damage whenever they land a hit.`;
    }
    if (spell.name === "Burning Skin") {
      return `Passive. Enemies using close-range weapons take ${formatNumber(spellDamageValue(spell, "damage", 0, 0.5))} Infernal damage whenever they land a hit.`;
    }
    if (spell.name === "Unholy Dominion") {
      return `Dominates any Daemon up to level ${formatNumber(spellValue(spell, "tameLevel", 2, 1))} for ${formatNumber(spell.duration ?? 150)} seconds. Successful use lowers Virtue by 1.`;
    }
    if (spell.name === "Faerie Fire") {
      return `Afflicts enemies in the target area, reducing DEF by ${formatNumber(Math.abs(spellValue(spell, "defensePenalty", 0, -0.5)))} and making them glow green for 6 seconds.`;
    }
    if (spell.name === "Faerie Dust") {
      return `Afflicts the target, reducing SPD by ${formatNumber(spellLevel(spell) * 2)}, AGL by ${formatNumber(spellLevel(spell) * 2)}, and Sylvan RESIST by ${formatNumber(spellLevel(spell))} for 6 seconds.`;
    }
    if (spell.name === "Poison") {
      return `Weapon attacks have a 50% chance to poison an enemy, dealing ${formatNumber(poisonTotalDamage(spell))} Mortal damage over ${formatNumber(spell.duration ?? 4)} seconds in ${formatNumber(spell.tick ?? 1)}-second ticks of ${formatNumber(poisonTickDamage(spell))}.`;
    }
    return spell.text;
  }

  const spellIconFiles = window.SoulreaperSpells?.spellIconFiles || {};

  function spellIconPath(spellOrName) {
    const name = typeof spellOrName === "string" ? spellOrName : spellOrName?.name;
    const file = spellIconFiles[name];
    return file ? `./assets/spells/${file}` : "";
  }

  function spellIconHtml(spell, className = "spell-icon") {
    const src = spellIconPath(spell);
    const label = escapeHtml(spell?.name || "Spell");
    if (!src) return `<span class="${className} spell-icon-fallback" aria-label="${label}">?</span>`;
    return `<img class="${className}" src="${src}" alt="${label}" loading="lazy" decoding="async">`;
  }

  window.SoulreaperSpellRuntime = {
    spellLevel,
    spellValue,
    spellDamageValue,
    spellFormulaFor,
    spellFormulaBaseValue,
    poisonTotalDamage,
    poisonTickDamage,
    spellFormulaValue,
    renderSpellTextTemplate,
    spellDescription,
    spellIconPath,
    spellIconHtml
  };

  window.spellLevel = spellLevel;
  window.spellValue = spellValue;
  window.spellDamageValue = spellDamageValue;
  window.spellFormulaFor = spellFormulaFor;
  window.spellFormulaBaseValue = spellFormulaBaseValue;
  window.poisonTotalDamage = poisonTotalDamage;
  window.poisonTickDamage = poisonTickDamage;
  window.spellFormulaValue = spellFormulaValue;
  window.renderSpellTextTemplate = renderSpellTextTemplate;
  window.spellDescription = spellDescription;
  window.spellIconPath = spellIconPath;
  window.spellIconHtml = spellIconHtml;
})();
