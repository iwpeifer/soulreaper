(() => {
  function npcSprite(name, src) {
    return {
      name,
      src
    };
  }

  const sprites = {
    gvada: npcSprite("Gvada", "./assets/sprites/npcs/gvada-v2.png"),
    wanderingSalesman: npcSprite("Wandering Salesman", "./assets/sprites/npcs/wandering-salesman.png"),
    shopkeeper: npcSprite("Shopkeeper", "./assets/sprites/npcs/shopkeeper.png"),
    soulreaperTrainer: npcSprite("Soulreaper Trainer", "./assets/sprites/npcs/soulreaper-trainer.png"),
    pleezix: npcSprite("Pleezix", "./assets/sprites/npcs/pleezix.png"),
    sharlene: npcSprite("Sharlene", "./assets/sprites/npcs/sharlene.png"),
    mordren: npcSprite("Mordren", "./assets/sprites/npcs/mordren.png"),
    cecilPaddywagon: npcSprite("Cecil Paddywagon", "./assets/sprites/npcs/cecil-paddywagon.png"),
    bumsforkLocal: npcSprite("Bumsfork Local", "./assets/sprites/npcs/bumsfork-local.png"),
    bumsforkWatcher: npcSprite("Bumsfork Watcher", "./assets/sprites/npcs/bumsfork-watcher.png"),
    quietVillager: npcSprite("Quiet Villager", "./assets/sprites/npcs/quiet-villager.png"),
    soulreaperMale: npcSprite("Soulreaper Male", "./assets/sprites/npcs/soulreaper-male.png"),
    soulreaperFemale: npcSprite("Soulreaper Female", "./assets/sprites/npcs/soulreaper-female.png"),
    shadowSoulreaperMale: npcSprite("Shadow Soulreaper Male", "./assets/sprites/npcs/shadow-soulreaper-male.png"),
    shadowSoulreaperFemale: npcSprite("Shadow Soulreaper Female", "./assets/sprites/npcs/shadow-soulreaper-female.png"),
    sylvanSoulreaperMale: npcSprite("Sylvan Soulreaper Male", "./assets/sprites/npcs/sylvan-soulreaper-male.png"),
    sylvanSoulreaperFemale: npcSprite("Sylvan Soulreaper Female", "./assets/sprites/npcs/sylvan-soulreaper-female.png"),
    infernalSoulreaperMale: npcSprite("Infernal Soulreaper Male", "./assets/sprites/npcs/infernal-soulreaper-male.png"),
    infernalSoulreaperFemale: npcSprite("Infernal Soulreaper Female", "./assets/sprites/npcs/infernal-soulreaper-female.png"),
    etherealSoulreaperMale: npcSprite("Ethereal Soulreaper Male", "./assets/sprites/npcs/ethereal-soulreaper-male.png"),
    etherealSoulreaperFemale: npcSprite("Ethereal Soulreaper Female", "./assets/sprites/npcs/ethereal-soulreaper-female.png"),
    celestialSoulreaperMale: npcSprite("Celestial Soulreaper Male", "./assets/sprites/npcs/celestial-soulreaper-male.png"),
    celestialSoulreaperFemale: npcSprite("Celestial Soulreaper Female", "./assets/sprites/npcs/celestial-soulreaper-female.png"),
    oldMan: npcSprite("Old Man", "./assets/sprites/npcs/old-man.png"),
    oldWoman: npcSprite("Old Woman", "./assets/sprites/npcs/old-woman.png"),
    villagerMale: npcSprite("Villager Male", "./assets/sprites/npcs/villager-male.png"),
    villagerFemale: npcSprite("Villager Female", "./assets/sprites/npcs/villager-female.png"),
    villagerMale2: npcSprite("Villager Male 2", "./assets/sprites/npcs/villager-male-2.png"),
    villagerFemale2: npcSprite("Villager Female 2", "./assets/sprites/npcs/villager-female-2.png"),
    dwarfVillagerMale1: npcSprite("Dwarf Villager Male 1", "./assets/sprites/npcs/dwarf-villager-male-1.png"),
    dwarfVillagerMale2: npcSprite("Dwarf Villager Male 2", "./assets/sprites/npcs/dwarf-villager-male-2.png"),
    dwarfVillagerFemale1: npcSprite("Dwarf Villager Female 1", "./assets/sprites/npcs/dwarf-villager-female-1.png"),
    dwarfVillagerFemale2: npcSprite("Dwarf Villager Female 2", "./assets/sprites/npcs/dwarf-villager-female-2.png"),
    dwarfThane: npcSprite("Dwarf Thane", "./assets/sprites/npcs/dwarf-thane.png"),
    dwarfPaladin: npcSprite("Dwarf Paladin", "./assets/sprites/npcs/dwarf-paladin.png"),
    dwarfPaladinFemale: npcSprite("Dwarf Paladin Female", "./assets/sprites/npcs/dwarf-paladin-female.png"),
    dwarfGuard: npcSprite("Dwarf Guard", "./assets/sprites/npcs/dwarf-guard.png"),
    dwarfMageMale: npcSprite("Dwarf Mage Male", "./assets/sprites/npcs/dwarf-mage-male.png"),
    dwarfMageFemale: npcSprite("Dwarf Mage Female", "./assets/sprites/npcs/dwarf-mage-female.png"),
    dwarfDruidMale: npcSprite("Dwarf Druid Male", "./assets/sprites/npcs/dwarf-druid-male.png"),
    dwarfDruidFemale: npcSprite("Dwarf Druid Female", "./assets/sprites/npcs/dwarf-druid-female.png"),
    dwarfNecromancerMale: npcSprite("Dwarf Necromancer Male", "./assets/sprites/npcs/dwarf-necromancer-male.png"),
    dwarfNecromancerFemale: npcSprite("Dwarf Necromancer Female", "./assets/sprites/npcs/dwarf-necromancer-female.png"),
    dwarfWarlockMale: npcSprite("Dwarf Warlock Male", "./assets/sprites/npcs/dwarf-warlock-male.png"),
    dwarfWarlockFemale: npcSprite("Dwarf Warlock Female", "./assets/sprites/npcs/dwarf-warlock-female.png"),
    dwarfChild: npcSprite("Dwarf Child", "./assets/sprites/npcs/dwarf-child.png"),
    dwarfNobleman: npcSprite("Dwarf Nobleman", "./assets/sprites/npcs/dwarf-nobleman.png"),
    childMale: npcSprite("Child Male", "./assets/sprites/npcs/child-male.png"),
    childFemale: npcSprite("Child Female", "./assets/sprites/npcs/child-female.png"),
    mordred: npcSprite("Mordred", "./assets/sprites/npcs/mordred.png"),
    guard: npcSprite("Guard", "./assets/sprites/npcs/guard.png"),

    priest: npcSprite("Priest", "./assets/sprites/npcs/priest.png"),
    priestess: npcSprite("Priestess", "./assets/sprites/npcs/priestess.png"),
    ranger: npcSprite("Ranger", "./assets/sprites/npcs/ranger.png"),
    villagerFlamboyant: npcSprite("Flamboyant Villager", "./assets/sprites/npcs/villager-flamboyant.png"),
    guardFemale: npcSprite("Female Guard", "./assets/sprites/npcs/guard-female.png"),
    barbarianMale: npcSprite("Barbarian Male", "./assets/sprites/npcs/barbarian-male.png"),
    barbarianFemale: npcSprite("Barbarian Female", "./assets/sprites/npcs/barbarian-female.png"),
    mayor: npcSprite("Mayor", "./assets/sprites/npcs/mayor.png"),
    baron: npcSprite("Baron", "./assets/sprites/npcs/baron.png"),
    baroness: npcSprite("Baroness", "./assets/sprites/npcs/baroness.png"),
    evilGuard: npcSprite("Evil Guard", "./assets/sprites/npcs/evil-guard.png"),
    darkGuard: npcSprite("Dark Guard", "./assets/sprites/npcs/dark-guard.png"),
    potionmaster: npcSprite("Potionmaster", "./assets/sprites/npcs/potionmaster.png"),
    witchyVillagerFemale: npcSprite("Witchy Villager Female", "./assets/sprites/npcs/witchy-villager-female.png"),
    witchyVillagerMale: npcSprite("Witchy Villager Male", "./assets/sprites/npcs/witchy-villager-male.png"),
    darkKing: npcSprite("Dark King", "./assets/sprites/npcs/dark-king.png"),
    darkPriest: npcSprite("Dark Priest", "./assets/sprites/npcs/dark-priest.png")
  };

  window.SoulreaperNpcSprites = {
    sprites
  };
})();
