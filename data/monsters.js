// Monster templates and loot data extracted from game.js so creature content stays out of the main runtime.
(function () {
const monsterTemplates = [
  {
    "name": "Giant Rat",
    "realm": "Mortal",
    "type": "Beast",
    "alignment": "Neutral",
    "faction": "",
    "radius": 9,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/giant-rat.png",
    "stats": {
      "HP": 4,
      "ATK": 1,
      "DEF": 0,
      "SPD": 1,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 0,
      "REGEN": 0
    },
    "weapon": {
      "name": "Rat Claw"
    },
    "foodchain": "Prey"
  },
  {
    "name": "Stag",
    "realm": "Mortal",
    "type": "Beast",
    "alignment": "Neutral",
    "radius": 13,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/stag.png",
    "stats": {
      "HP": 5,
      "ATK": 1,
      "DEF": 0,
      "SPD": 3,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 5,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bite"
    },
    "foodchain": "Prey"
  },
  {
    "name": "White Stag",
    "realm": "Sylvan",
    "type": "Beast",
    "alignment": "Good",
    "radius": 13,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/white-stag.png",
    "stats": {
      "HP": 6,
      "ATK": 1.5,
      "DEF": 1,
      "SPD": 3,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 5,
      "BLOCK": 5,
      "RESIST": 1,
      "REGEN": 2
    },
    "weapon": {
      "name": "Bite"
    },
    "foodchain": "Prey",
    "spells": [
      {
        "name": "Aura of Protection",
        "realm": "Celestial"
      }
    ]
  },
  {
    "name": "Ki-Rin",
    "realm": "Celestial",
    "type": "Beast",
    "alignment": "Good",
    "faction": "",
    "radius": 16,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/ki-rin.png",
    "stats": {
      "HP": 6,
      "ATK": 1.5,
      "DEF": 1,
      "SPD": 4,
      "AGL": 0,
      "INT": 10,
      "FOCUS": 5,
      "BLOCK": 5,
      "RESIST": 2,
      "REGEN": 2
    },
    "weapon": {
      "name": "Bite"
    },
    "foodchain": "Prey",
    "amphibious": true,
    "elite": true,
    "spells": [
      {
        "name": "Heavenly Light",
        "realm": "Celestial"
      },
      {
        "name": "Chain Lightning",
        "realm": "Celestial"
      }
    ]
  },
  {
    "name": "Wolf",
    "realm": "Mortal",
    "type": "Beast",
    "alignment": "Neutral",
    "radius": 14,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/wolf.png",
    "stats": {
      "HP": 7,
      "ATK": 2.5,
      "DEF": 0,
      "SPD": 3,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 5,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bite"
    },
    "foodchain": "Predator",
    "aggressive": true
  },
  {
    "name": "Green Drake",
    "realm": "Sylvan",
    "type": "Beast",
    "alignment": "Good",
    "radius": 24,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/green-drakeling.png",
    "stats": {
      "HP": 10,
      "ATK": 3,
      "DEF": 0,
      "SPD": 3,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 5,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bite"
    },
    "foodchain": "Predator",
    "elite": true,
    "spells": [
      {
        "name": "Fireball",
        "realm": "Infernal"
      }
    ]
  },
  {
    "name": "Black Panther",
    "realm": "Mortal",
    "type": "Beast",
    "alignment": "Neutral",
    "radius": 12,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/black-panther.png",
    "stats": {
      "HP": 7.5,
      "ATK": 3.5,
      "DEF": 1,
      "SPD": 4,
      "AGL": 20,
      "INT": 0,
      "FOCUS": 10,
      "BLOCK": 15,
      "RESIST": 1,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bite"
    },
    "foodchain": "Predator",
    "aggressive": true
  },
  {
    "name": "Bear",
    "realm": "Mortal",
    "type": "Beast",
    "alignment": "Neutral",
    "faction": "",
    "radius": 14,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/bear.png",
    "stats": {
      "HP": 11,
      "ATK": 2.5,
      "DEF": 1,
      "SPD": 3,
      "AGL": 30,
      "INT": 0,
      "FOCUS": 5,
      "BLOCK": 5,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bite"
    },
    "foodchain": "Predator",
    "aggressive": true
  },
  {
    "name": "Bisonar",
    "realm": "Mortal",
    "type": "Beast",
    "alignment": "Neutral",
    "faction": "",
    "radius": 20,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/bison-minotaur.png",
    "stats": {
      "HP": 11,
      "ATK": 2,
      "DEF": 1,
      "SPD": 4,
      "AGL": 30,
      "INT": 0,
      "FOCUS": 5,
      "BLOCK": 5,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bronze Battleaxe"
    },
    "aggressive": true,
    "elite": true
  },
  {
    "name": "Tellursa",
    "realm": "Sylvan",
    "type": "Beast",
    "alignment": "Neutral",
    "faction": "",
    "radius": 19,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/owlbear.png",
    "stats": {
      "HP": 11,
      "ATK": 2.5,
      "DEF": 1,
      "SPD": 3,
      "AGL": 30,
      "INT": 0,
      "FOCUS": 5,
      "BLOCK": 5,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bite"
    },
    "foodchain": "Predator",
    "elite": true,
    "spells": [
      {
        "name": "Chlorophyll",
        "realm": "Sylvan"
      },
      {
        "name": "Spirit of Avia",
        "realm": "Sylvan"
      },
      {
        "name": "Rage",
        "realm": "Mortal"
      }
    ]
  },
  {
    "name": "Griffin",
    "realm": "Sylvan",
    "type": "Beast",
    "alignment": "Good",
    "faction": "",
    "radius": 19,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/griffin.png",
    "stats": {
      "HP": 11,
      "ATK": 2,
      "DEF": 1,
      "SPD": 3,
      "AGL": 30,
      "INT": 0,
      "FOCUS": 5,
      "BLOCK": 5,
      "RESIST": 1,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bite"
    },
    "foodchain": "Predator",
    "flying": true,
    "elite": true,
    "spells": [
      {
        "name": "Aura of Protection",
        "realm": "Celestial"
      }
    ]
  },
  {
    "name": "Giant Toad",
    "realm": "Mortal",
    "type": "Beast",
    "alignment": "Neutral",
    "radius": 14,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/giant-toad.png",
    "stats": {
      "HP": 10,
      "ATK": 2,
      "DEF": 1,
      "SPD": 3,
      "AGL": 30,
      "INT": 0,
      "FOCUS": 5,
      "BLOCK": 5,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bite"
    },
    "foodchain": "Predator",
    "aggressive": true
  },
  {
    "name": "Hypnotoad",
    "realm": "Mortal",
    "type": "Beast",
    "alignment": "Neutral",
    "radius": 14,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/hypno-toad.png",
    "stats": {
      "HP": 10,
      "ATK": 2,
      "DEF": 1,
      "SPD": 3,
      "AGL": 30,
      "INT": 0,
      "FOCUS": 5,
      "BLOCK": 5,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bite"
    },
    "foodchain": "Predator",
    "aggressive": true,
    "amphibious": true,
    "elite": true,
    "spells": [
      {
        "name": "Mortify",
        "realm": "Umbral"
      }
    ]
  },
  {
    "name": "Goblin",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Evil",
    "faction": "",
    "radius": 11,
    "gold": "1D5",
    "sprite": "./assets/sprites/mobs/goblin-troublemaker.png",
    "stats": {
      "HP": 5,
      "ATK": 1,
      "DEF": 0.5,
      "SPD": 2,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Rusty Dagger"
    }
  },
  {
    "name": "Badgeri",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Good",
    "faction": "badgeri",
    "radius": 11,
    "gold": "1D5",
    "sprite": "./assets/sprites/mobs/badger-man-spearman.png",
    "stats": {
      "HP": 5,
      "ATK": 1,
      "DEF": 0.5,
      "SPD": 2,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bronze Spear"
    }
  },
  {
    "name": "Badgeri Shaman",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Good",
    "faction": "badgeri",
    "radius": 11,
    "gold": "1D5",
    "sprite": "./assets/sprites/mobs/badger-man-shaman.png",
    "stats": {
      "HP": 5,
      "ATK": 1,
      "DEF": 0.5,
      "SPD": 2,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Willow Branch"
    },
    "spells": [
      {
        "name": "Briar Lash",
        "realm": "Sylvan"
      },
      {
        "name": "Divine Shield",
        "realm": "Celestial"
      },
      {
        "name": "Faerie Fire",
        "realm": "Sylvan"
      },
      {
        "name": "Wooden Skin",
        "realm": "Sylvan"
      },
      {
        "name": "Magic Missile",
        "realm": "Ethereal"
      }
    ]
  },
  {
    "name": "Goblin Archer",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Evil",
    "faction": "",
    "radius": 12,
    "gold": "1D5",
    "sprite": "./assets/sprites/mobs/goblin-archer.png",
    "stats": {
      "HP": 5,
      "ATK": 1,
      "DEF": 0.5,
      "SPD": 2,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Shortbow"
    }
  },
  {
    "name": "Corvari Archer",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Neutral",
    "faction": "corvari",
    "radius": 14,
    "gold": "2D5",
    "sprite": "./assets/sprites/mobs/crow-man-archer.png",
    "stats": {
      "HP": 5,
      "ATK": 1,
      "DEF": 0.5,
      "SPD": 2,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Shortbow"
    },
    "flying": true
  },
  {
    "name": "Corvari Spearman",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Neutral",
    "faction": "corvari",
    "radius": 14,
    "gold": "2D5",
    "sprite": "./assets/sprites/mobs/crow-man-spearman.png",
    "stats": {
      "HP": 5,
      "ATK": 1,
      "DEF": 0.5,
      "SPD": 2,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bronze Spear"
    },
    "flying": true
  },
  {
    "name": "Corvari Wisecrow",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Neutral",
    "faction": "corvari",
    "radius": 14,
    "gold": "2D5",
    "sprite": "./assets/sprites/mobs/crow-man-shaman.png",
    "stats": {
      "HP": 5,
      "ATK": 1,
      "DEF": 0.5,
      "SPD": 2,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Willow Branch"
    },
    "flying": true,
    "spells": [
      {
        "name": "Spirit of Avia",
        "realm": "Sylvan"
      },
      {
        "name": "Magic Missile",
        "realm": "Ethereal"
      },
      {
        "name": "Ice Bolt",
        "realm": "Ethereal"
      }
    ]
  },
  {
    "name": "Froglin",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Neutral",
    "faction": "froglin",
    "radius": 11,
    "gold": "1D6",
    "sprite": "./assets/sprites/mobs/bullywug.png",
    "stats": {
      "HP": 5,
      "ATK": 1,
      "DEF": 0.5,
      "SPD": 4,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bronze Spear"
    },
    "amphibious": true,
    "spells": [
      {
        "name": "Poison",
        "realm": "Mortal"
      }
    ]
  },
  {
    "name": "Bogchieftan Squeech",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Neutral",
    "faction": "froglin",
    "radius": 18,
    "gold": "1D6",
    "sprite": "./assets/sprites/mobs/bullywug-war-chieftan.png",
    "stats": {
      "HP": 6,
      "ATK": 1,
      "DEF": 0.5,
      "SPD": 4,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bogchieftan Tomahawk"
    },
    "amphibious": true,
    "elite": true,
    "boss": true,
    "spells": [
      {
        "name": "War Drums",
        "realm": "Mortal"
      },
      {
        "name": "Battle Cry",
        "realm": "Mortal"
      },
      {
        "name": "Rage",
        "realm": "Mortal"
      }
    ]
  },
  {
    "name": "Froglin Mucketeer",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Neutral",
    "faction": "froglin",
    "radius": 11,
    "gold": "1D6",
    "sprite": "./assets/sprites/mobs/bullywug.png",
    "stats": {
      "HP": 5,
      "ATK": 1,
      "DEF": 0.5,
      "SPD": 4,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bronze Spear"
    },
    "amphibious": true,
    "elite": true,
    "spells": [
      {
        "name": "Poison",
        "realm": "Mortal"
      }
    ]
  },
  {
    "name": "Froglin Bogseer",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Neutral",
    "faction": "froglin",
    "radius": 11,
    "gold": "1D6",
    "sprite": "./assets/sprites/mobs/bullywug-shaman.png",
    "stats": {
      "HP": 5,
      "ATK": 1,
      "DEF": 0.5,
      "SPD": 4,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bone Wand"
    },
    "amphibious": true,
    "spells": [
      {
        "name": "Fireball",
        "realm": "Infernal"
      },
      {
        "name": "Briar Lash",
        "realm": "Sylvan"
      },
      {
        "name": "Chlorophyll",
        "realm": "Sylvan"
      }
    ]
  },
  {
    "name": "Froglin Diviner",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Neutral",
    "faction": "froglin",
    "radius": 11,
    "gold": "1D6",
    "sprite": "./assets/sprites/mobs/bullywug-shaman.png",
    "stats": {
      "HP": 5,
      "ATK": 1,
      "DEF": 0.5,
      "SPD": 4,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bone Wand"
    },
    "amphibious": true,
    "elite": true,
    "spells": [
      {
        "name": "Fireball",
        "realm": "Infernal"
      },
      {
        "name": "Briar Lash",
        "realm": "Sylvan"
      },
      {
        "name": "Chlorophyll",
        "realm": "Sylvan"
      },
      {
        "name": "Hypnotize",
        "realm": "Ethereal"
      }
    ]
  },
  {
    "name": "High Muckromancer K'Rawk",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Neutral",
    "faction": "froglin",
    "radius": 18,
    "gold": "1D6",
    "sprite": "./assets/sprites/mobs/bullywug-grand-warlock.png",
    "stats": {
      "HP": 4,
      "ATK": 1,
      "DEF": 0.5,
      "SPD": 4,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Muckromancer Staff"
    },
    "amphibious": true,
    "elite": true,
    "boss": true,
    "spells": [
      {
        "name": "Fireball",
        "realm": "Infernal"
      },
      {
        "name": "Virulent Plague",
        "realm": "Umbral"
      },
      {
        "name": "Chlorophyll",
        "realm": "Sylvan"
      },
      {
        "name": "Hypnotize",
        "realm": "Ethereal"
      },
      {
        "name": "Dark Circle",
        "realm": "Infernal"
      }
    ]
  },
  {
    "name": "Guard",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Good",
    "radius": 16,
    "gold": "4D4",
    "sprite": "./assets/sprites/npcs/guard.png",
    "stats": {
      "HP": 6,
      "ATK": 2,
      "DEF": 3,
      "SPD": 2,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 10,
      "BLOCK": 10,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bronze Shortsword"
    },
    "faction": "gandersguard"
  },
  {
    "name": "Shadow Guard",
    "realm": "Umbral",
    "type": "Humanoid",
    "alignment": "Evil",
    "radius": 16,
    "gold": "4D4",
    "sprite": "./assets/sprites/npcs/evil-guard.png",
    "stats": {
      "HP": 6,
      "ATK": 2,
      "DEF": 3,
      "SPD": 2,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 10,
      "BLOCK": 10,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bronze Shortsword"
    }
  },
  {
    "name": "Imp",
    "realm": "Infernal",
    "type": "Demon",
    "alignment": "Evil",
    "radius": 10,
    "gold": "1D5",
    "sprite": "./assets/sprites/mobs/imp.png",
    "stats": {
      "HP": 5,
      "ATK": 1,
      "DEF": 0,
      "SPD": 2,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 1,
      "REGEN": 1
    },
    "weapon": {
      "name": "Ebony Wand"
    },
    "spells": [
      {
        "name": "Fireball",
        "realm": "Infernal"
      }
    ]
  },
  {
    "name": "Incubus",
    "realm": "Infernal",
    "type": "Demon",
    "alignment": "Evil",
    "radius": 12,
    "gold": "3D5",
    "sprite": "./assets/sprites/mobs/incubus.png",
    "stats": {
      "HP": 5,
      "ATK": 1.5,
      "DEF": 1,
      "SPD": 3.5,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 5,
      "RESIST": 2,
      "REGEN": 1.5
    },
    "weapon": {
      "name": "Bronze Longsword"
    },
    "spells": [
      {
        "name": "Fireblast",
        "realm": "Infernal"
      },
      {
        "name": "Fireball",
        "realm": "Infernal"
      }
    ]
  },
  {
    "name": "Brownie Scout",
    "realm": "Sylvan",
    "type": "Faerie",
    "alignment": "Good",
    "faction": "",
    "radius": 8,
    "gold": "1D5",
    "sprite": "./assets/sprites/mobs/brownie-scout.png",
    "stats": {
      "HP": 4,
      "ATK": 1,
      "DEF": 0,
      "SPD": 2,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 1,
      "REGEN": 1
    },
    "weapon": {
      "name": "Rusty Dagger"
    },
    "spells": [
      {
        "name": "Tangle Vine",
        "realm": "Sylvan"
      }
    ]
  },
  {
    "name": "Brownie Gladekeeper",
    "realm": "Sylvan",
    "type": "Faerie",
    "alignment": "Good",
    "faction": "",
    "radius": 8,
    "gold": "1D5",
    "sprite": "./assets/sprites/mobs/brownie-scout.png",
    "stats": {
      "HP": 4,
      "ATK": 1,
      "DEF": 0,
      "SPD": 2,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 1,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bronze Dagger"
    },
    "elite": true,
    "spells": [
      {
        "name": "Tangle Vine",
        "realm": "Sylvan"
      },
      {
        "name": "Faerie Fire",
        "realm": "Sylvan"
      }
    ]
  },
  {
    "name": "Satyr",
    "realm": "Sylvan",
    "type": "Faerie",
    "alignment": "Good",
    "faction": "",
    "radius": 16,
    "gold": "1D6",
    "sprite": "./assets/sprites/mobs/satyr.png",
    "stats": {
      "HP": 6,
      "ATK": 1.5,
      "DEF": 0.5,
      "SPD": 4,
      "AGL": 5,
      "INT": 5,
      "FOCUS": 5,
      "BLOCK": 2,
      "RESIST": 1.5,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bronze Dagger"
    },
    "spells": [
      {
        "name": "Faerie Fire",
        "realm": "Sylvan"
      },
      {
        "name": "Song of White Stag",
        "realm": "Sylvan"
      }
    ]
  },
  {
    "name": "Brownie Archer",
    "realm": "Sylvan",
    "type": "Faerie",
    "alignment": "Good",
    "faction": "",
    "radius": 8,
    "gold": "2D8",
    "sprite": "./assets/sprites/mobs/brownie-archer.png",
    "stats": {
      "HP": 4,
      "ATK": 1,
      "DEF": 0,
      "SPD": 2,
      "AGL": 50,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 1,
      "REGEN": 1
    },
    "weapon": {
      "name": "Eldwood Shortbow"
    },
    "spells": [
      {
        "name": "Tangle Vine",
        "realm": "Sylvan"
      }
    ]
  },
  {
    "name": "Leprechaun",
    "realm": "Sylvan",
    "type": "Faerie",
    "alignment": "Good",
    "radius": 8,
    "gold": "2D5",
    "sprite": "./assets/sprites/mobs/leprechaun.png",
    "stats": {
      "HP": 5,
      "ATK": 1,
      "DEF": 0.5,
      "SPD": 3,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 0.5,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bronze Dagger"
    },
    "spells": [
      {
        "name": "Tangle Vine",
        "realm": "Sylvan"
      }
    ]
  },
  {
    "name": "Mushroom Man",
    "realm": "Sylvan",
    "type": "Elemental",
    "alignment": "Neutral",
    "radius": 13,
    "gold": "2D5",
    "sprite": "./assets/sprites/mobs/mushroom-man.png",
    "stats": {
      "HP": 6,
      "ATK": 1,
      "DEF": 0.5,
      "SPD": 3,
      "AGL": 0,
      "INT": 25,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 1.5,
      "REGEN": 2
    },
    "weapon": {
      "name": "Bronze Shortsword"
    },
    "spells": [
      {
        "name": "Faerie Dust",
        "realm": "Sylvan"
      },
      {
        "name": "Poison",
        "realm": "Mortal"
      }
    ]
  },
  {
    "name": "Brownie Druid",
    "realm": "Sylvan",
    "type": "Faerie",
    "alignment": "Good",
    "faction": "",
    "radius": 8,
    "gold": "2D5",
    "sprite": "./assets/sprites/mobs/brownie-druid.png",
    "stats": {
      "HP": 4,
      "ATK": 1,
      "DEF": 0.5,
      "SPD": 3,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 0.5,
      "REGEN": 2
    },
    "weapon": {
      "name": "Ivory Wand"
    },
    "spells": [
      {
        "name": "Tangle Vine",
        "realm": "Sylvan"
      },
      {
        "name": "Faerie Dust",
        "realm": "Sylvan"
      }
    ]
  },
  {
    "name": "Pixie",
    "realm": "Sylvan",
    "type": "Faerie",
    "alignment": "Good",
    "radius": 8,
    "gold": "1D5",
    "sprite": "./assets/sprites/mobs/pixie.png",
    "stats": {
      "HP": 3,
      "ATK": 1,
      "DEF": 0,
      "SPD": 3,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 1,
      "REGEN": 1
    },
    "weapon": {
      "name": "Ivory Wand"
    },
    "flying": true,
    "spells": [
      {
        "name": "Faerie Dust",
        "realm": "Sylvan"
      }
    ]
  },
  {
    "name": "Cherub",
    "realm": "Celestial",
    "type": "Angel",
    "alignment": "Good",
    "radius": 8,
    "gold": "1D5",
    "sprite": "./assets/sprites/mobs/cherub.png",
    "stats": {
      "HP": 4,
      "ATK": 1,
      "DEF": 0,
      "SPD": 3,
      "AGL": 50,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 1,
      "REGEN": 1
    },
    "weapon": {
      "name": "Shortbow"
    },
    "flying": true,
    "spells": [
      {
        "name": "Basic Prayer",
        "realm": "Celestial"
      }
    ]
  },
  {
    "name": "Napaea",
    "realm": "Sylvan",
    "type": "Faerie",
    "alignment": "Good",
    "radius": 8,
    "gold": "1D5",
    "sprite": "./assets/sprites/mobs/pixie.png",
    "stats": {
      "HP": 3,
      "ATK": 1,
      "DEF": 0,
      "SPD": 3,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 1,
      "REGEN": 1
    },
    "weapon": {
      "name": "Ivory Wand"
    },
    "flying": true,
    "spells": [
      {
        "name": "Faerie Dust",
        "realm": "Sylvan"
      }
    ]
  },
  {
    "name": "Dryad",
    "realm": "Sylvan",
    "type": "Faerie",
    "alignment": "Good",
    "faction": "",
    "radius": 12,
    "gold": "1D6",
    "sprite": "./assets/sprites/mobs/dryad.png",
    "stats": {
      "HP": 6,
      "ATK": 2,
      "DEF": 0.5,
      "SPD": 3,
      "AGL": 1,
      "INT": 10,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 1.5,
      "REGEN": 2
    },
    "weapon": {
      "name": "Ivory Wand"
    },
    "spells": [
      {
        "name": "Tangle Vine",
        "realm": "Sylvan"
      },
      {
        "name": "Summon Treant",
        "realm": "Sylvan"
      }
    ]
  },
  {
    "name": "Naiad",
    "realm": "Ethereal",
    "type": "Faerie",
    "alignment": "Good",
    "faction": "",
    "radius": 12,
    "gold": "1D6",
    "sprite": "./assets/sprites/mobs/naiad.png",
    "stats": {
      "HP": 5,
      "ATK": 1,
      "DEF": 0.5,
      "SPD": 3,
      "AGL": 1,
      "INT": 18,
      "FOCUS": 3,
      "BLOCK": 2,
      "RESIST": 2,
      "REGEN": 2
    },
    "weapon": {
      "name": "Coral Wand"
    },
    "aquatic": true,
    "spells": [
      {
        "name": "Summon Water Elemental",
        "realm": "Ethereal"
      },
      {
        "name": "Ice Bolt",
        "realm": "Ethereal"
      }
    ]
  },
  {
    "name": "Nymph",
    "realm": "Sylvan",
    "type": "Faerie",
    "alignment": "Good",
    "faction": "",
    "radius": 12,
    "gold": "1D6",
    "sprite": "./assets/sprites/mobs/nymph.png",
    "stats": {
      "HP": 5,
      "ATK": 1,
      "DEF": 0.5,
      "SPD": 3,
      "AGL": 1,
      "INT": 16,
      "FOCUS": 3,
      "BLOCK": 2,
      "RESIST": 1.5,
      "REGEN": 2
    },
    "weapon": {
      "name": "Ivory Wand"
    },
    "spells": [
      {
        "name": "Faerie Fire",
        "realm": "Sylvan"
      },
      {
        "name": "Faerie Dust",
        "realm": "Sylvan"
      }
    ]
  },
  {
    "name": "Snapdragon",
    "realm": "Sylvan",
    "type": "Elemental",
    "alignment": "Neutral",
    "radius": 14,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/carnivorous-plant.png",
    "stats": {
      "HP": 5,
      "ATK": 3,
      "DEF": 0.5,
      "SPD": 2,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 5,
      "BLOCK": 5,
      "RESIST": 0.5,
      "REGEN": 3
    },
    "weapon": {
      "name": "Bite"
    },
    "aggressive": true,
    "spells": [
      {
        "name": "Thorn Shield",
        "realm": "Sylvan"
      }
    ]
  },
  {
    "name": "Earth Elemental",
    "realm": "Ethereal",
    "type": "Elemental",
    "alignment": "Neutral",
    "faction": "",
    "radius": 12,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/rock-golem.png",
    "stats": {
      "HP": 5,
      "ATK": 1,
      "DEF": 2,
      "SPD": 1,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 0,
      "BLOCK": 5,
      "RESIST": 0,
      "REGEN": 0.5
    },
    "weapon": {
      "name": "Rock Fist"
    }
  },
  {
    "name": "Cogar the Whisperer",
    "realm": "Ethereal",
    "type": "Elemental",
    "alignment": "Good",
    "radius": 25,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/waterfall-golem.png",
    "stats": {
      "HP": 10,
      "ATK": 2.5,
      "DEF": 2.5,
      "SPD": 1,
      "AGL": 10,
      "INT": 0,
      "FOCUS": 0,
      "BLOCK": 5,
      "RESIST": 1,
      "REGEN": 0.5
    },
    "weapon": {
      "name": "Fist of the Whisperer"
    },
    "elite": true,
    "boss": true,
    "spells": [
      {
        "name": "War Drums",
        "realm": "Mortal"
      },
      {
        "name": "Mace Mastery",
        "realm": "Mortal"
      }
    ]
  },
  {
    "name": "Treant",
    "realm": "Sylvan",
    "type": "Elemental",
    "alignment": "Good",
    "radius": 12,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/treant.png",
    "stats": {
      "HP": 5,
      "ATK": 1,
      "DEF": 2,
      "SPD": 1,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 0,
      "BLOCK": 5,
      "RESIST": 0,
      "REGEN": 0.5
    },
    "weapon": {
      "name": "Bronze Mace"
    }
  },
  {
    "name": "Water Elemental",
    "realm": "Ethereal",
    "type": "Elemental",
    "alignment": "Neutral",
    "faction": "",
    "radius": 11,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/water-elemental.png",
    "stats": {
      "HP": 5,
      "ATK": 1.5,
      "DEF": 1,
      "SPD": 4,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 0,
      "BLOCK": 5,
      "RESIST": 1,
      "REGEN": 0.5
    },
    "weapon": {
      "name": "Coral Wand"
    },
    "aquatic": true
  },
  {
    "name": "Swamp Thing",
    "realm": "Ethereal",
    "type": "Elemental",
    "alignment": "Neutral",
    "faction": "",
    "radius": 11,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/swamp-elemental.png",
    "stats": {
      "HP": 5,
      "ATK": 1.5,
      "DEF": 1,
      "SPD": 4,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 0,
      "BLOCK": 5,
      "RESIST": 1,
      "REGEN": 0.5
    },
    "weapon": {
      "name": "Shadow Claw"
    },
    "aggressive": true,
    "aquatic": true,
    "elite": true
  },
  {
    "name": "Fire Elemental",
    "realm": "Infernal",
    "type": "Elemental",
    "alignment": "Neutral",
    "radius": 11,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/fire-elemental.png",
    "stats": {
      "HP": 5,
      "ATK": 2,
      "DEF": 1,
      "SPD": 4,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 0,
      "BLOCK": 5,
      "RESIST": 1,
      "REGEN": 0.5
    },
    "weapon": {
      "name": "Ebony Wand"
    },
    "spells": [
      {
        "name": "Burning Skin",
        "realm": "Infernal"
      }
    ]
  },
  {
    "name": "Gelatinous Cube",
    "realm": "Mortal",
    "type": "Beast",
    "alignment": "Neutral",
    "radius": 13,
    "gold": "2D5",
    "sprite": "./assets/sprites/mobs/green-gelatinous-cube.png",
    "stats": {
      "HP": 20,
      "ATK": 1,
      "DEF": 0,
      "SPD": 0,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 0,
      "BLOCK": 0,
      "RESIST": 0,
      "REGEN": 2
    },
    "weapon": {
      "name": "Bite"
    },
    "spells": [
      {
        "name": "Poison",
        "realm": "Mortal"
      }
    ]
  },
  {
    "name": "Scylox the Many",
    "realm": "Ethereal",
    "type": "Beast",
    "alignment": "Good",
    "radius": 25,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/blue-hydra.png",
    "stats": {
      "HP": 10,
      "ATK": 2,
      "DEF": 1.5,
      "SPD": 4,
      "AGL": 25,
      "INT": 0,
      "FOCUS": 5,
      "BLOCK": 5,
      "RESIST": 1.5,
      "REGEN": 1.5
    },
    "weapon": {
      "name": "Bite"
    },
    "elite": true,
    "boss": true,
    "spells": [
      {
        "name": "Chain Lightning",
        "realm": "Celestial"
      },
      {
        "name": "Ice Storm",
        "realm": "Ethereal"
      },
      {
        "name": "Fireball",
        "realm": "Infernal"
      },
      {
        "name": "Ice Bolt",
        "realm": "Ethereal"
      }
    ]
  }
];

const fenMonsterTemplates = [
  {
    "name": "Plague Rat",
    "realm": "Mortal",
    "type": "Beast",
    "alignment": "Neutral",
    "radius": 11,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/plague-rat.png",
    "stats": {
      "HP": 3,
      "ATK": 2,
      "DEF": 0,
      "SPD": 1,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bite"
    },
    "foodchain": "Prey",
    "aggressive": true,
    "spells": [
      {
        "name": "Poison",
        "realm": "Mortal"
      }
    ],
    "faction": "ratkin"
  },
  {
    "name": "Vampire Bat",
    "realm": "Mortal",
    "type": "Beast",
    "alignment": "Neutral",
    "radius": 11,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/bat.png",
    "stats": {
      "HP": 3,
      "ATK": 2,
      "DEF": 0,
      "SPD": 5,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bite"
    },
    "foodchain": "Predator",
    "aggressive": true,
    "flying": true,
    "spells": [
      {
        "name": "Lifesteal",
        "realm": "Umbral"
      }
    ]
  },
  {
    "name": "Goblin Thug",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Evil",
    "faction": "goblin",
    "radius": 13,
    "gold": "2D5",
    "sprite": "./assets/sprites/mobs/goblin-thug.png",
    "stats": {
      "HP": 5,
      "ATK": 2,
      "DEF": 1,
      "SPD": 2,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 5,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bronze Mace"
    }
  },
  {
    "name": "Badgeri Bruiser",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Good",
    "faction": "badgeri",
    "radius": 13,
    "gold": "2D5",
    "sprite": "./assets/sprites/mobs/badger-man-chieftan.png",
    "stats": {
      "HP": 5,
      "ATK": 2,
      "DEF": 1,
      "SPD": 2,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 5,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bronze Battleaxe"
    }
  },
  {
    "name": "Troll",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Evil",
    "radius": 20,
    "gold": "2D5",
    "sprite": "./assets/sprites/mobs/troll.png",
    "stats": {
      "HP": 8,
      "ATK": 2,
      "DEF": 1,
      "SPD": 3,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 5,
      "RESIST": 0,
      "REGEN": 2.5
    },
    "weapon": {
      "name": "Bronze Mace"
    }
  },
  {
    "name": "Ratfinkelstein's Ratstrocity",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Evil",
    "radius": 23,
    "gold": "2D5",
    "sprite": "./assets/sprites/mobs/skaven-monstrosity.png",
    "stats": {
      "HP": 8,
      "ATK": 2.5,
      "DEF": 1,
      "SPD": 3,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 5,
      "RESIST": 0,
      "REGEN": 2.5
    },
    "weapon": {
      "name": "Rat Claw"
    },
    "boss": true,
    "spells": [
      {
        "name": "Poison",
        "realm": "Mortal"
      }
    ]
  },
  {
    "name": "Ratkin Rogue",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Evil",
    "radius": 12,
    "gold": "1D8",
    "sprite": "./assets/sprites/mobs/skaven-rogue.png",
    "stats": {
      "HP": 5,
      "ATK": 1.5,
      "DEF": 0.5,
      "SPD": 3.5,
      "AGL": 5,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 5,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bronze Dagger"
    },
    "spells": [
      {
        "name": "Poison",
        "realm": "Mortal"
      }
    ],
    "faction": "ratkin"
  },
  {
    "name": "Narmon Ratfinkelstein",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Evil",
    "radius": 15,
    "gold": "2D6",
    "sprite": "./assets/sprites/mobs/skaven-mad-alchemist.png",
    "stats": {
      "HP": 5,
      "ATK": 1.5,
      "DEF": 0.5,
      "SPD": 3.5,
      "AGL": 5,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 5,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bronze Dagger"
    },
    "boss": true,
    "spells": [
      {
        "name": "Poison",
        "realm": "Mortal"
      },
      {
        "name": "Chain Lightning",
        "realm": "Celestial"
      },
      {
        "name": "Lifesteal",
        "realm": "Umbral"
      },
      {
        "name": "Song of White Stag",
        "realm": "Sylvan"
      }
    ]
  },
  {
    "name": "Ratkin Turdburglar",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Evil",
    "radius": 14.5,
    "gold": "2D8",
    "sprite": "./assets/sprites/mobs/skaven-burglar.png",
    "stats": {
      "HP": 5,
      "ATK": 1.5,
      "DEF": 0.5,
      "SPD": 3.5,
      "AGL": 5,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 5,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bronze Dagger"
    },
    "elite": true,
    "spells": [
      {
        "name": "Poison",
        "realm": "Mortal"
      }
    ],
    "faction": "ratkin"
  },
  {
    "name": "Goblin Wolf Rider",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Evil",
    "faction": "goblin",
    "radius": 16,
    "gold": "2D6",
    "sprite": "./assets/sprites/mobs/goblin-wolfrider.png",
    "stats": {
      "HP": 9,
      "ATK": 2.5,
      "DEF": 1,
      "SPD": 6,
      "AGL": 25,
      "INT": 0,
      "FOCUS": 5,
      "BLOCK": 5,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Shortbow"
    }
  },
  {
    "name": "Goblin Shaman",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Evil",
    "faction": "goblin",
    "radius": 12,
    "gold": "1D5",
    "sprite": "./assets/sprites/mobs/goblin-shaman.png",
    "stats": {
      "HP": 5,
      "ATK": 2,
      "DEF": 0.5,
      "SPD": 2,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 1,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bone Wand"
    },
    "spells": [
      {
        "name": "Magic Missile",
        "realm": "Ethereal"
      }
    ]
  },
  {
    "name": "Ratkin Fanatic",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Evil",
    "radius": 14,
    "gold": "2D6",
    "sprite": "./assets/sprites/mobs/skaven-warlock.png",
    "stats": {
      "HP": 5,
      "ATK": 1,
      "DEF": 0.5,
      "SPD": 4,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 1,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bone Wand"
    },
    "spells": [
      {
        "name": "Curse of Disdain",
        "realm": "Umbral"
      },
      {
        "name": "Faerie Fire",
        "realm": "Sylvan"
      },
      {
        "name": "Banish",
        "realm": "Ethereal"
      }
    ],
    "faction": "ratkin"
  },
  {
    "name": "Ratkin Warlock",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Evil",
    "radius": 14,
    "gold": "2D6",
    "sprite": "./assets/sprites/mobs/skaven-warlock.png",
    "stats": {
      "HP": 5,
      "ATK": 1,
      "DEF": 0.5,
      "SPD": 4,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 1,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bone Wand"
    },
    "spells": [
      {
        "name": "Curse of Disdain",
        "realm": "Umbral"
      },
      {
        "name": "Faerie Fire",
        "realm": "Sylvan"
      },
      {
        "name": "Banish",
        "realm": "Ethereal"
      }
    ],
    "faction": "ratkin"
  },
  {
    "name": "Bog Witch",
    "realm": "Umbral",
    "type": "Humanoid",
    "alignment": "Evil",
    "radius": 14,
    "gold": "2D5",
    "sprite": "./assets/sprites/mobs/bog-witch.png",
    "stats": {
      "HP": 5,
      "ATK": 2,
      "DEF": 0.5,
      "SPD": 3,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 1,
      "REGEN": 1
    },
    "weapon": {
      "name": "Willow Branch"
    },
    "spells": [
      {
        "name": "Curse of Disdain",
        "realm": "Umbral"
      }
    ]
  },
  {
    "name": "Grindylow",
    "realm": "Mortal",
    "type": "Humanoid",
    "alignment": "Evil",
    "faction": "",
    "radius": 14,
    "gold": "2D5",
    "sprite": "./assets/sprites/mobs/grindylow.png",
    "stats": {
      "HP": 5,
      "ATK": 2,
      "DEF": 0.5,
      "SPD": 3,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 1,
      "REGEN": 1
    },
    "weapon": {
      "name": "Shadow Claw"
    },
    "aquatic": true,
    "spells": [
      {
        "name": "Magic Missile",
        "realm": "Ethereal"
      }
    ]
  },
  {
    "name": "Princess Nurdine",
    "realm": "Infernal",
    "type": "Humanoid",
    "alignment": "Evil",
    "radius": 19,
    "gold": "2D5",
    "sprite": "./assets/sprites/mobs/skaven-dominatrix.png",
    "stats": {
      "HP": 7,
      "ATK": 2.5,
      "DEF": 1,
      "SPD": 5,
      "AGL": 15,
      "INT": 0,
      "FOCUS": 5,
      "BLOCK": 5,
      "RESIST": 1,
      "REGEN": 2
    },
    "weapon": {
      "name": "Bronze Battleaxe"
    },
    "boss": true,
    "spells": [
      {
        "name": "Basic Prayer",
        "realm": "Celestial"
      },
      {
        "name": "Ring of Fire",
        "realm": "Infernal"
      },
      {
        "name": "Axe Mastery",
        "realm": "Mortal"
      }
    ]
  },
  {
    "name": "Plague Wolf",
    "realm": "Mortal",
    "type": "Beast",
    "alignment": "Neutral",
    "radius": 15,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/plague-wolf.png",
    "stats": {
      "HP": 7,
      "ATK": 2.5,
      "DEF": 0,
      "SPD": 3,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 5,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bite"
    },
    "foodchain": "Predator",
    "aggressive": true,
    "spells": [
      {
        "name": "Poison",
        "realm": "Mortal"
      }
    ]
  },
  {
    "name": "Plague Bear",
    "realm": "Mortal",
    "type": "Beast",
    "alignment": "Neutral",
    "radius": 16,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/plague-bear.png",
    "stats": {
      "HP": 10,
      "ATK": 2.5,
      "DEF": 1,
      "SPD": 3.5,
      "AGL": 5,
      "INT": 0,
      "FOCUS": 5,
      "BLOCK": 5,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Plague Bear Claw"
    },
    "foodchain": "Predator",
    "aggressive": true,
    "spells": [
      {
        "name": "Poison",
        "realm": "Mortal"
      }
    ]
  },
  {
    "name": "Giant Spider",
    "realm": "Mortal",
    "type": "Beast",
    "alignment": "Evil",
    "radius": 13,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/giant-spider.png",
    "stats": {
      "HP": 6,
      "ATK": 2,
      "DEF": 0,
      "SPD": 4.5,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 5,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bite"
    },
    "foodchain": "Predator",
    "aggressive": true,
    "spells": [
      {
        "name": "Spiderweb",
        "realm": "Mortal"
      }
    ]
  },
  {
    "name": "Whisperspring Dryad",
    "realm": "Sylvan",
    "type": "Faerie",
    "alignment": "Good",
    "faction": "",
    "radius": 12,
    "gold": "1D6",
    "sprite": "./assets/sprites/mobs/dryad.png",
    "stats": {
      "HP": 6.5,
      "ATK": 2,
      "DEF": 0.75,
      "SPD": 3,
      "AGL": 1,
      "INT": 12,
      "FOCUS": 3,
      "BLOCK": 3,
      "RESIST": 2,
      "REGEN": 2
    },
    "weapon": {
      "name": "Ivory Wand"
    },
    "aggressive": true,
    "elite": true,
    "spells": [
      {
        "name": "Tangle Vine",
        "realm": "Sylvan"
      },
      {
        "name": "Summon Treant",
        "realm": "Sylvan"
      }
    ]
  },
  {
    "name": "Whisperspring Nymph",
    "realm": "Sylvan",
    "type": "Faerie",
    "alignment": "Good",
    "faction": "",
    "radius": 12,
    "gold": "1D6",
    "sprite": "./assets/sprites/mobs/nymph.png",
    "stats": {
      "HP": 5.5,
      "ATK": 1.5,
      "DEF": 0.75,
      "SPD": 3.5,
      "AGL": 2,
      "INT": 18,
      "FOCUS": 4,
      "BLOCK": 3,
      "RESIST": 2,
      "REGEN": 2
    },
    "weapon": {
      "name": "Ivory Wand"
    },
    "aggressive": true,
    "elite": true,
    "spells": [
      {
        "name": "Faerie Fire",
        "realm": "Sylvan"
      },
      {
        "name": "Faerie Dust",
        "realm": "Sylvan"
      }
    ]
  },
  {
    "name": "Whisperspring Elder Dryad",
    "realm": "Sylvan",
    "type": "Faerie",
    "alignment": "Good",
    "faction": "",
    "radius": 13,
    "gold": "2D6",
    "sprite": "./assets/sprites/mobs/dryad.png",
    "stats": {
      "HP": 7.5,
      "ATK": 2.5,
      "DEF": 1,
      "SPD": 3,
      "AGL": 2,
      "INT": 16,
      "FOCUS": 5,
      "BLOCK": 4,
      "RESIST": 2.5,
      "REGEN": 2.5
    },
    "weapon": {
      "name": "Ivory Wand"
    },
    "aggressive": true,
    "elite": true,
    "spells": [
      {
        "name": "Tangle Vine",
        "realm": "Sylvan"
      },
      {
        "name": "Summon Treant",
        "realm": "Sylvan"
      },
      {
        "name": "Song of White Stag",
        "realm": "Sylvan"
      }
    ]
  },
  {
    "name": "Whisperspring Elder Nymph",
    "realm": "Sylvan",
    "type": "Faerie",
    "alignment": "Good",
    "faction": "",
    "radius": 13,
    "gold": "2D6",
    "sprite": "./assets/sprites/mobs/nymph.png",
    "stats": {
      "HP": 6.5,
      "ATK": 2,
      "DEF": 0.75,
      "SPD": 4,
      "AGL": 3,
      "INT": 20,
      "FOCUS": 6,
      "BLOCK": 4,
      "RESIST": 2.5,
      "REGEN": 2.5
    },
    "weapon": {
      "name": "Ivory Wand"
    },
    "aggressive": true,
    "elite": true,
    "spells": [
      {
        "name": "Faerie Fire",
        "realm": "Sylvan"
      },
      {
        "name": "Faerie Dust",
        "realm": "Sylvan"
      },
      {
        "name": "Godspeed",
        "realm": "Celestial"
      }
    ]
  },
  {
    "name": "Tatzelwurm",
    "realm": "Sylvan",
    "type": "Beast",
    "alignment": "Good",
    "radius": 21,
    "gold": "3D8",
    "sprite": "./assets/sprites/mobs/tatzelwurm.png",
    "stats": {
      "HP": 7,
      "ATK": 3,
      "DEF": 1.25,
      "SPD": 3.5,
      "AGL": 8,
      "INT": 4,
      "FOCUS": 5,
      "BLOCK": 8,
      "RESIST": 1.5,
      "REGEN": 2
    },
    "weapon": {
      "name": "Bite"
    },
    "aggressive": true,
    "elite": true,
    "boss": true,
    "spells": [
      {
        "name": "Poison",
        "realm": "Mortal"
      },
      {
        "name": "Tangle Vine",
        "realm": "Sylvan"
      }
    ]
  },
  {
    "name": "Leshy",
    "realm": "Sylvan",
    "type": "Faerie",
    "alignment": "Good",
    "radius": 21,
    "gold": "3D8",
    "sprite": "./assets/sprites/mobs/leshy.png",
    "stats": {
      "HP": 7.5,
      "ATK": 2.5,
      "DEF": 1.25,
      "SPD": 3,
      "AGL": 6,
      "INT": 20,
      "FOCUS": 6,
      "BLOCK": 7,
      "RESIST": 2.5,
      "REGEN": 3
    },
    "weapon": {
      "name": "Willow Branch"
    },
    "aggressive": true,
    "elite": true,
    "boss": true,
    "spells": [
      {
        "name": "Tangle Vine",
        "realm": "Sylvan"
      },
      {
        "name": "Summon Treant",
        "realm": "Sylvan"
      },
      {
        "name": "Song of White Stag",
        "realm": "Sylvan"
      }
    ]
  },
  {
    "name": "Leshachikha",
    "realm": "Sylvan",
    "type": "Faerie",
    "alignment": "Good",
    "radius": 21,
    "gold": "3D8",
    "sprite": "./assets/sprites/mobs/leshachikha.png",
    "stats": {
      "HP": 7,
      "ATK": 2,
      "DEF": 1,
      "SPD": 3.5,
      "AGL": 8,
      "INT": 22,
      "FOCUS": 7,
      "BLOCK": 6,
      "RESIST": 3,
      "REGEN": 3
    },
    "weapon": {
      "name": "Ivory Wand"
    },
    "aggressive": true,
    "elite": true,
    "boss": true,
    "spells": [
      {
        "name": "Faerie Fire",
        "realm": "Sylvan"
      },
      {
        "name": "Faerie Dust",
        "realm": "Sylvan"
      },
      {
        "name": "Summon Treant",
        "realm": "Sylvan"
      }
    ]
  },
  {
    "name": "Yaar the Slumberer",
    "realm": "Sylvan",
    "type": "Dragon",
    "alignment": "Good",
    "radius": 24,
    "gold": "4D10",
    "sprite": "./assets/sprites/mobs/green-dragon.png",
    "stats": {
      "HP": 8.5,
      "ATK": 4,
      "DEF": 1.75,
      "SPD": 3,
      "AGL": 6,
      "INT": 14,
      "FOCUS": 6,
      "BLOCK": 10,
      "RESIST": 3,
      "REGEN": 3
    },
    "weapon": {
      "name": "Bite"
    },
    "aggressive": true,
    "elite": true,
    "boss": true,
    "spells": [
      {
        "name": "Fireblast",
        "realm": "Infernal"
      },
      {
        "name": "Faerie Fire",
        "realm": "Sylvan"
      },
      {
        "name": "Fireball",
        "realm": "Infernal"
      }
    ]
  },
  {
    "name": "Will-o-Wisp",
    "realm": "Ethereal",
    "type": "Entity",
    "alignment": "Neutral",
    "radius": 12,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/will-o-wisp.png",
    "stats": {
      "HP": 5,
      "ATK": 2,
      "DEF": 0,
      "SPD": 2,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Spark"
    },
    "flying": true,
    "incorporeal": true
  },
  {
    "name": "Shade",
    "realm": "Umbral",
    "type": "Elemental",
    "alignment": "Evil",
    "radius": 12,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/shadow-elemental.png",
    "stats": {
      "HP": 5,
      "ATK": 2,
      "DEF": 0,
      "SPD": 2,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 1,
      "REGEN": 1
    },
    "weapon": {
      "name": "Shadow Claw"
    },
    "incorporeal": true,
    "spells": [
      {
        "name": "Lifesteal",
        "realm": "Umbral"
      },
      {
        "name": "Invisibility",
        "realm": "Ethereal"
      }
    ]
  },
  {
    "name": "Skeleton",
    "realm": "Umbral",
    "type": "Revenant",
    "alignment": "Evil",
    "radius": 12,
    "gold": "2D5",
    "sprite": "./assets/sprites/mobs/decaying-skeleton.png",
    "stats": {
      "HP": 4,
      "ATK": 2,
      "DEF": 1,
      "SPD": 3,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 5,
      "RESIST": 0,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bronze Shortsword"
    }
  },
  {
    "name": "Zombie",
    "realm": "Umbral",
    "type": "Revenant",
    "alignment": "Evil",
    "faction": "",
    "radius": 12,
    "gold": "2D5",
    "sprite": "./assets/sprites/mobs/zombie.png",
    "stats": {
      "HP": 5,
      "ATK": 2,
      "DEF": 0.5,
      "SPD": 3,
      "AGL": 25,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 5,
      "RESIST": 0.5,
      "REGEN": 1
    },
    "weapon": {
      "name": "Bite"
    },
    "spells": [
      {
        "name": "Poison",
        "realm": "Mortal"
      },
      {
        "name": "Rage",
        "realm": "Mortal"
      }
    ]
  },
  {
    "name": "Froglin Zombie",
    "realm": "Umbral",
    "type": "Revenant",
    "alignment": "Neutral",
    "faction": "froglin",
    "radius": 12,
    "gold": "2D5",
    "sprite": "./assets/sprites/mobs/bullywug-zombie.png",
    "stats": {
      "HP": 5,
      "ATK": 2,
      "DEF": 0.5,
      "SPD": 3,
      "AGL": 25,
      "INT": 0,
      "FOCUS": 2,
      "BLOCK": 5,
      "RESIST": 0.5,
      "REGEN": 1
    },
    "weapon": {
      "name": "Shadow Claw"
    },
    "elite": true,
    "spells": [
      {
        "name": "Poison",
        "realm": "Mortal"
      },
      {
        "name": "Rage",
        "realm": "Mortal"
      }
    ]
  },
  {
    "name": "Diarrhea Monster",
    "realm": "Mortal",
    "type": "Elemental",
    "alignment": "Neutral",
    "radius": 12,
    "gold": "0",
    "sprite": "./assets/sprites/mobs/secret-diarrhea-monster.png",
    "stats": {
      "HP": 10,
      "ATK": 1.5,
      "DEF": 1,
      "SPD": 2,
      "AGL": 0,
      "INT": 0,
      "FOCUS": 5,
      "BLOCK": 5,
      "RESIST": 1,
      "REGEN": 1.5
    },
    "weapon": {
      "name": "Fetid Splash"
    },
    "aggressive": true,
    "spells": [
      {
        "name": "Poison",
        "realm": "Mortal"
      }
    ]
  }
];

const monsterLootTables = {
  "Giant Rat": {
    "tables": [
      {
        "entries": [
          {
            "name": "Rat Pelt",
            "chance": 0.5
          },
          {
            "name": "Rat Claw",
            "chance": 0.1
          },
          {
            "name": "Bone",
            "chance": 0.5
          }
        ]
      }
    ]
  },
  "Plague Rat": {
    "tables": [
      {
        "entries": [
          {
            "name": "Rat Pelt",
            "chance": 0.5
          },
          {
            "name": "Rat Claw",
            "chance": 0.1
          },
          {
            "name": "Bone",
            "chance": 0.5
          }
        ]
      }
    ]
  },
  "Wolf": {
    "tables": [
      {
        "entries": [
          {
            "name": "Wolf Pelt",
            "chance": 0.5
          }
        ]
      }
    ]
  },
  "Brownie Scout": {
    "tables": [
      {
        "entries": [
          {
            "name": "Magic Mushroom",
            "chance": 0.02
          },
          {
            "name": "Ivory Wand",
            "chance": 0.02
          },
          {
            "name": "Emerald",
            "chance": 0.005
          },
          {
            "name": "Uncut Emerald",
            "chance": 0.02
          },
          {
            "name": "Houndstongue",
            "chance": 0.02
          },
          {
            "name": "Nightshade",
            "chance": 0.02
          },
          {
            "name": "Bolt of Spidersilk Cloth",
            "chance": 0.02
          }
        ]
      }
    ]
  },
  "Pixie": {
    "tables": [
      {
        "entries": [
          {
            "name": "Magic Mushroom",
            "chance": 0.02
          },
          {
            "name": "Ivory Wand",
            "chance": 0.02
          },
          {
            "name": "Willow Branch",
            "chance": 0.03
          },
          {
            "name": "Emerald",
            "chance": 0.01
          },
          {
            "name": "Uncut Emerald",
            "chance": 0.02
          },
          {
            "name": "Pixie Wing",
            "chance": 0.33
          },
          {
            "name": "Houndstongue",
            "chance": 0.02
          },
          {
            "name": "Nightshade",
            "chance": 0.02
          },
          {
            "name": "Bolt of Spidersilk Cloth",
            "chance": 0.02
          }
        ]
      }
    ]
  },
  "Imp": {
    "tables": [
      {
        "entries": [
          {
            "name": "Bloody Emblem",
            "chance": 0.02
          },
          {
            "name": "Ebony Wand",
            "chance": 0.02
          },
          {
            "name": "Spidersilk Cowl",
            "chance": 0.01
          },
          {
            "name": "Spidersilk Shirt",
            "chance": 0.01
          },
          {
            "name": "Spidersilk Gloves",
            "chance": 0.01
          },
          {
            "name": "Spidersilk Pants",
            "chance": 0.01
          },
          {
            "name": "Spidersilk Slippers",
            "chance": 0.01
          },
          {
            "name": "Ruby",
            "chance": 0.01
          },
          {
            "name": "Ruby Necklace",
            "chance": 0.01
          },
          {
            "name": "Ruby Ring",
            "chance": 0.01
          },
          {
            "name": "Uncut Ruby",
            "chance": 0.01
          }
        ]
      }
    ]
  },
  "Snapdragon": {
    "tables": [
      {
        "entries": [
          {
            "name": "Snapdragon Frond",
            "chance": 1
          }
        ]
      }
    ]
  },
  "Guard": {
    "tables": [
      {
        "entries": [
          {
            "name": "Bronze Chainmail Vest",
            "chance": 0.05
          },
          {
            "name": "Bronze Spangenhelm",
            "chance": 0.05
          },
          {
            "name": "Bronze Chainmail Pants",
            "chance": 0.05
          },
          {
            "name": "Bronze Chainmail Gloves",
            "chance": 0.05
          },
          {
            "name": "Iron Shield",
            "chance": 0.05
          },
          {
            "name": "Bronze Chainmail Boots",
            "chance": 0.05
          },
          {
            "name": "Bronze Chainmail Bracer",
            "chance": 0.05
          },
          {
            "name": "Bronze Chainmail Coif",
            "chance": 0.05
          }
        ]
      },
      {
        "entries": [
          {
            "name": "Gandersguard Insignia",
            "chance": 1
          }
        ]
      }
    ]
  },
  "Goblin Shaman": {
    "tables": [
      {
        "entries": [
          {
            "name": "Bone Wand",
            "chance": 0.02
          },
          {
            "name": "Spidersilk Cowl",
            "chance": 0.03
          },
          {
            "name": "Spidersilk Shirt",
            "chance": 0.03
          },
          {
            "name": "Spidersilk Gloves",
            "chance": 0.03
          },
          {
            "name": "Spidersilk Pants",
            "chance": 0.03
          },
          {
            "name": "Spidersilk Slippers",
            "chance": 0.03
          },
          {
            "name": "Willow Branch",
            "chance": 0.03
          },
          {
            "name": "Wooden Staff",
            "chance": 0.03
          },
          {
            "name": "Bone",
            "chance": 0.5
          },
          {
            "name": "Bone Necklace",
            "chance": 0.03
          },
          {
            "name": "Goblin Head",
            "chance": 0.2
          }
        ]
      }
    ]
  },
  "Bog Witch": {
    "tables": [
      {
        "entries": [
          {
            "name": "Spidersilk Cowl",
            "chance": 0.03
          },
          {
            "name": "Spidersilk Shirt",
            "chance": 0.03
          },
          {
            "name": "Spidersilk Gloves",
            "chance": 0.03
          },
          {
            "name": "Spidersilk Pants",
            "chance": 0.03
          },
          {
            "name": "Spidersilk Slippers",
            "chance": 0.03
          },
          {
            "name": "Bone",
            "chance": 0.5
          }
        ],
        "minLvl": 1,
        "maxLvl": 10
      }
    ]
  },
  "Diarrhea Monster": {
    "tables": [
      {
        "entries": [
          {
            "name": "Vial of Diarrhea",
            "chance": 0.5
          }
        ]
      }
    ]
  },
  "Stag": {
    "tables": [
      {
        "entries": [
          {
            "name": "Deer Hide",
            "chance": 0.25
          }
        ]
      }
    ]
  },
  "Vampire Bat": {
    "tables": [
      {
        "entries": [
          {
            "name": "Bone",
            "chance": 0.5
          },
          {
            "name": "Bat Wing",
            "chance": 0.5
          }
        ]
      }
    ]
  },
  "Will-o-Wisp": {
    "tables": [
      {
        "entries": [
          {
            "name": "Ether",
            "chance": 1
          }
        ]
      }
    ]
  },
  "White Stag": {
    "tables": [
      {
        "entries": [
          {
            "name": "White Deer Hide",
            "chance": 0.1
          }
        ]
      }
    ]
  },
  "Incubus": {
    "tables": [
      {
        "entries": [
          {
            "name": "Bloody Emblem",
            "chance": 0.02
          }
        ]
      }
    ]
  },
  "Bear": {
    "tables": [
      {
        "entries": [
          {
            "name": "Bear Pelt",
            "chance": 0.5
          }
        ]
      }
    ]
  },
  "Goblin": {
    "tables": [
      {
        "entries": [
          {
            "name": "Goblin Fang",
            "chance": 0.2
          },
          {
            "name": "Goblin Fang",
            "chance": 0.2
          },
          {
            "name": "Rusty Dagger",
            "chance": 0.03
          },
          {
            "name": "Goblin Spear",
            "chance": 0.02
          },
          {
            "name": "Bone",
            "chance": 0.5
          },
          {
            "name": "Bone Necklace",
            "chance": 0.02
          },
          {
            "name": "Goblin Head",
            "chance": 0.2
          }
        ]
      }
    ]
  },
  "Leprechaun": [],
  "Brownie Druid": {
    "tables": [
      {
        "entries": [
          {
            "name": "Houndstongue",
            "chance": 0.02
          },
          {
            "name": "Nightshade",
            "chance": 0.02
          }
        ]
      }
    ]
  },
  "Goblin Thug": {
    "tables": [
      {
        "entries": [
          {
            "name": "Goblin Fang",
            "chance": 0.2
          },
          {
            "name": "Goblin Fang",
            "chance": 0.2
          },
          {
            "name": "Rusty Dagger",
            "chance": 0.03
          },
          {
            "name": "Goblin Spear",
            "chance": 0.02
          },
          {
            "name": "Bone",
            "chance": 0.5
          },
          {
            "name": "Bronze Mace",
            "chance": 0.02
          },
          {
            "name": "Bone Necklace",
            "chance": 0.02
          },
          {
            "name": "Goblin Head",
            "chance": 0.2
          }
        ]
      }
    ]
  },
  "Goblin Wolf Rider": {
    "tables": [
      {
        "entries": [
          {
            "name": "Wolf Pelt",
            "chance": 0.5
          },
          {
            "name": "Bone",
            "chance": 0.5
          },
          {
            "name": "Goblin Fang",
            "chance": 0.2
          },
          {
            "name": "Goblin Fang",
            "chance": 0.2
          },
          {
            "name": "Goblin Spear",
            "chance": 0.02
          },
          {
            "name": "Goblin Head",
            "chance": 0.2
          }
        ]
      }
    ]
  },
  "Mushroom Man": {
    "tables": [
      {
        "entries": [
          {
            "name": "Magic Mushroom",
            "chance": 0.1
          },
          {
            "name": "Purple Mushroom",
            "chance": 0.1
          }
        ]
      }
    ]
  },
  "Black Panther": [],
  "Brownie Archer": {
    "tables": [
      {
        "entries": [
          {
            "name": "Magic Mushroom",
            "chance": 0.02
          },
          {
            "name": "Eldwood Shortbow",
            "chance": 0.005
          },
          {
            "name": "Houndstongue",
            "chance": 0.02
          },
          {
            "name": "Nightshade",
            "chance": 0.02
          },
          {
            "name": "Bolt of Spidersilk Cloth",
            "chance": 0.02
          }
        ]
      }
    ]
  },
  "Skeleton": {
    "tables": [
      {
        "entries": [
          {
            "name": "Bronze Shortsword",
            "chance": 0.02
          },
          {
            "name": "Wooden Shield",
            "chance": 0.02
          },
          {
            "name": "Onyx",
            "chance": 0.01
          },
          {
            "name": "Onyx Necklace",
            "chance": 0.01
          },
          {
            "name": "Onyx Ring",
            "chance": 0.01
          },
          {
            "name": "Uncut Onyx",
            "chance": 0.01
          }
        ]
      }
    ]
  },
  "Plague Wolf": {
    "tables": [
      {
        "entries": [
          {
            "name": "Wolf Pelt",
            "chance": 0.5
          }
        ]
      }
    ]
  },
  "Earth Elemental": {
    "tables": [
      {
        "entries": [
          {
            "name": "Ether",
            "chance": 1
          },
          {
            "name": "Uncut Amethyst",
            "chance": 0.01
          },
          {
            "name": "Uncut Aquamarine",
            "chance": 0.01
          },
          {
            "name": "Uncut Diamond",
            "chance": 0.01
          },
          {
            "name": "Uncut Emerald",
            "chance": 0.01
          },
          {
            "name": "Uncut Onyx",
            "chance": 0.01
          },
          {
            "name": "Uncut Opal",
            "chance": 0.01
          },
          {
            "name": "Uncut Ruby",
            "chance": 0.01
          },
          {
            "name": "Uncut Sapphire",
            "chance": 0.01
          }
        ]
      },
      {
        "entries": [
          {
            "name": "Copper Ore",
            "chance": 0.33
          },
          {
            "name": "Silver Nugget",
            "chance": 0.02
          }
        ],
        "minLvl": 1,
        "maxLvl": 12
      },
      {
        "entries": [
          {
            "name": "Iron Ore",
            "chance": 0.33
          },
          {
            "name": "Gold Nugget",
            "chance": 0.02
          }
        ],
        "minLvl": 8
      }
    ]
  },
  "Ratkin Rogue": {
    "tables": [
      {
        "entries": [
          {
            "name": "Bone",
            "chance": 0.5
          },
          {
            "name": "Leather Boots",
            "chance": 0.01
          },
          {
            "name": "Leather Pants",
            "chance": 0.01
          },
          {
            "name": "Leather Bracer",
            "chance": 0.01
          },
          {
            "name": "Leather Breastplate",
            "chance": 0.01
          },
          {
            "name": "Leather Gloves",
            "chance": 0.01
          },
          {
            "name": "Leather Hood",
            "chance": 0.01
          },
          {
            "name": "Leather Pauldrons",
            "chance": 0.01
          },
          {
            "name": "Scroll of Poison",
            "chance": 0.01
          },
          {
            "name": "Healing Potion",
            "chance": 0.02
          },
          {
            "name": "Soothing Potion",
            "chance": 0.02
          },
          {
            "name": "Bronze Dagger",
            "chance": 0.01
          },
          {
            "name": "Mandrake Root",
            "chance": 0.1
          },
          {
            "name": "Ratkin Tail",
            "chance": 0.5
          }
        ]
      }
    ]
  },
  "Shade": {
    "tables": [
      {
        "entries": [
          {
            "name": "Shadow Claw",
            "chance": 0.2
          }
        ]
      }
    ]
  },
  "Ratkin Fanatic": {
    "tables": [
      {
        "entries": [
          {
            "name": "Bone",
            "chance": 0.5
          },
          {
            "name": "Scroll of Banish",
            "chance": 0.01
          },
          {
            "name": "Healing Potion",
            "chance": 0.02
          },
          {
            "name": "Soothing Potion",
            "chance": 0.02
          },
          {
            "name": "Bronze Dagger",
            "chance": 0.01
          },
          {
            "name": "Scroll of Curse of Disdain",
            "chance": 0.01
          },
          {
            "name": "Bone Wand",
            "chance": 0.02
          },
          {
            "name": "Bone Necklace",
            "chance": 0.02
          },
          {
            "name": "Willow Branch",
            "chance": 0.02
          },
          {
            "name": "Wooden Staff",
            "chance": 0.02
          },
          {
            "name": "Mandrake Root",
            "chance": 0.1
          },
          {
            "name": "Magic Mushroom",
            "chance": 0.02
          },
          {
            "name": "Ratkin Tail",
            "chance": 0.5
          }
        ]
      }
    ]
  },
  "Troll": [],
  "Ratkin Warlock": {
    "tables": [
      {
        "entries": [
          {
            "name": "Bone",
            "chance": 0.5
          },
          {
            "name": "Scroll of Banish",
            "chance": 0.01
          },
          {
            "name": "Healing Potion",
            "chance": 0.02
          },
          {
            "name": "Soothing Potion",
            "chance": 0.02
          },
          {
            "name": "Bronze Dagger",
            "chance": 0.01
          },
          {
            "name": "Scroll of Curse of Disdain",
            "chance": 0.01
          },
          {
            "name": "Bone Wand",
            "chance": 0.02
          },
          {
            "name": "Bone Necklace",
            "chance": 0.02
          },
          {
            "name": "Willow Branch",
            "chance": 0.02
          },
          {
            "name": "Wooden Staff",
            "chance": 0.02
          },
          {
            "name": "Mandrake Root",
            "chance": 0.1
          },
          {
            "name": "Magic Mushroom",
            "chance": 0.02
          },
          {
            "name": "Ratkin Tail",
            "chance": 0.5
          }
        ]
      }
    ]
  },
  "Gelatinous Cube": {
    "tables": [
      {
        "entries": [
          {
            "name": "Bone",
            "chance": 0.1
          },
          {
            "name": "Iron Shield",
            "chance": 0.01
          },
          {
            "name": "Leather Boots",
            "chance": 0.01
          },
          {
            "name": "Spidersilk Slippers",
            "chance": 0.01
          },
          {
            "name": "Wooden Shield",
            "chance": 0.01
          },
          {
            "name": "Sticky Ichor",
            "chance": 0.5
          }
        ]
      }
    ]
  },
  "Narmon Ratfinkelstein": {
    "tables": [
      {
        "entries": [
          {
            "name": "Obsidian Dagger",
            "chance": 0.33
          },
          {
            "name": "Alchemist's Belt",
            "chance": 0.33
          },
          {
            "name": "Alchemist's Pants",
            "chance": 0.33
          },
          {
            "name": "Alchemist's Robe",
            "chance": 0.33
          },
          {
            "name": "Bubonic Necklace",
            "chance": 0.33
          },
          {
            "name": "Bubonic Necklace",
            "chance": 0.33
          }
        ]
      }
    ]
  },
  "Ratfinkelstein's Ratstrocity": {
    "tables": [
      {
        "entries": [
          {
            "name": "Mutant Claw",
            "chance": 0.5
          },
          {
            "name": "Ratzkhanite Leather Bracer",
            "chance": 0.5
          },
          {
            "name": "Ratzkhanite Leather Bracer",
            "chance": 0.5
          }
        ]
      }
    ]
  },
  "Princess Nurdine": {
    "tables": [
      {
        "entries": [
          {
            "name": "Nurdine's Cape",
            "chance": 0.33
          },
          {
            "name": "Nurdine's Whip",
            "chance": 0.33
          },
          {
            "name": "Ratzkhanite Leather Corset",
            "chance": 0.33
          },
          {
            "name": "Ratzkhanite Leather Garter",
            "chance": 0.33
          },
          {
            "name": "Ratzkhanite Leather Spaulder",
            "chance": 0.33
          },
          {
            "name": "Obsidian Dagger",
            "chance": 0.33
          },
          {
            "name": "Ratzkhanite Leather Boots",
            "chance": 0.33
          }
        ]
      }
    ]
  },
  "Dryad": {
    "tables": [
      {
        "entries": [
          {
            "name": "Dryad Horn",
            "chance": 0.5
          },
          {
            "name": "Eldweave Boots",
            "chance": 0.01
          },
          {
            "name": "Nightshade",
            "chance": 0.05
          },
          {
            "name": "Houndstongue",
            "chance": 0.5
          },
          {
            "name": "Mandrake Root",
            "chance": 0.05
          },
          {
            "name": "Eldweave Fiber",
            "chance": 0.05
          }
        ]
      }
    ]
  },
  "Naiad": {
    "tables": [
      {
        "entries": [
          {
            "name": "Vial of Naiad Water",
            "chance": 0.5
          },
          {
            "name": "Nightshade",
            "chance": 0.05
          },
          {
            "name": "Houndstongue",
            "chance": 0.5
          },
          {
            "name": "Mandrake Root",
            "chance": 0.05
          },
          {
            "name": "Eldweave Fiber",
            "chance": 0.05
          }
        ]
      }
    ]
  },
  "Nymph": {
    "tables": [
      {
        "entries": [
          {
            "name": "Nymph Floret",
            "chance": 0.5
          },
          {
            "name": "Nightshade",
            "chance": 0.05
          },
          {
            "name": "Houndstongue",
            "chance": 0.5
          },
          {
            "name": "Mandrake Root",
            "chance": 0.05
          },
          {
            "name": "Eldweave Fiber",
            "chance": 0.05
          }
        ]
      }
    ]
  },
  "Whisperspring Goblin": {
    "tables": [
      {
        "minLvl": "",
        "maxLvl": "",
        "entries": [
          {
            "name": "Goblin Fang",
            "chance": 0.2
          },
          {
            "name": "Goblin Fang",
            "chance": 0.2
          },
          {
            "name": "Rusty Dagger",
            "chance": 0.03
          },
          {
            "name": "Goblin Spear",
            "chance": 0.02
          },
          {
            "name": "Bone",
            "chance": 0.5
          },
          {
            "name": "Bone Necklace",
            "chance": 0.02
          }
        ]
      }
    ]
  },
  "Ratkin Turdburglar": {
    "tables": [
      {
        "entries": [
          {
            "name": "Bone",
            "chance": 0.5
          },
          {
            "name": "Leather Boots",
            "chance": 0.01
          },
          {
            "name": "Leather Pants",
            "chance": 0.01
          },
          {
            "name": "Leather Bracer",
            "chance": 0.01
          },
          {
            "name": "Leather Breastplate",
            "chance": 0.01
          },
          {
            "name": "Leather Gloves",
            "chance": 0.01
          },
          {
            "name": "Leather Hood",
            "chance": 0.01
          },
          {
            "name": "Leather Pauldrons",
            "chance": 0.01
          },
          {
            "name": "Scroll of Poison",
            "chance": 0.01
          },
          {
            "name": "Healing Potion",
            "chance": 0.02
          },
          {
            "name": "Soothing Potion",
            "chance": 0.02
          },
          {
            "name": "Bronze Dagger",
            "chance": 0.01
          },
          {
            "name": "Mandrake Root",
            "chance": 0.1
          },
          {
            "name": "Ratkin Tail",
            "chance": 0.5
          }
        ]
      }
    ]
  },
  "Giant Spider": {
    "tables": [
      {
        "entries": [
          {
            "name": "Spider Leg",
            "chance": 0.2
          },
          {
            "name": "Spider Silk",
            "chance": 0.75
          },
          {
            "name": "Spider Venom Sack",
            "chance": 0.2
          },
          {
            "name": "Spider Silk",
            "chance": 0.75
          }
        ]
      }
    ]
  },
  "Shadow Guard": [],
  "Water Elemental": {
    "tables": [
      {
        "entries": [
          {
            "name": "Ether",
            "chance": 1
          }
        ]
      }
    ]
  },
  "Fire Elemental": {
    "tables": [
      {
        "entries": [
          {
            "name": "Ether",
            "chance": 1
          }
        ]
      }
    ]
  },
  "Treant": [],
  "Green Drake": {
    "tables": [
      {
        "entries": [
          {
            "name": "Drake Wing",
            "chance": 0.5
          },
          {
            "name": "Bone",
            "chance": 0.5
          }
        ]
      }
    ]
  },
  "Cogar the Whisperer": {
    "tables": [
      {
        "entries": [
          {
            "name": "Fist of the Whisperer",
            "chance": 0.5
          }
        ]
      }
    ]
  },
  "Scylox the Many": [],
  "Satyr": {
    "tables": [
      {
        "entries": [
          {
            "name": "Bone",
            "chance": 0.5
          },
          {
            "name": "Bronze Dagger",
            "chance": 0.02
          },
          {
            "name": "Eldweave Fiber",
            "chance": 0.02
          },
          {
            "name": "Houndstongue",
            "chance": 0.02
          },
          {
            "name": "Mandrake Root",
            "chance": 0.02
          },
          {
            "name": "Crimson Nettle",
            "chance": 0.02
          },
          {
            "name": "Blue Lotus",
            "chance": 0.02
          },
          {
            "name": "Nightshade",
            "chance": 0.02
          },
          {
            "name": "Datura Pod",
            "chance": 0.02
          },
          {
            "name": "Silverleaf",
            "chance": 0.02
          }
        ]
      }
    ]
  },
  "Guard Dorin": [],
  "Yaar the Slumberer": [],
  "Tatzelwurm": [],
  "Leshy": [],
  "Leshachikha": [],
  "Whisperspring Nymph": {
    "tables": [
      {
        "entries": [
          {
            "name": "Nymph Floret",
            "chance": 0.5
          },
          {
            "name": "Nightshade",
            "chance": 0.05
          },
          {
            "name": "Houndstongue",
            "chance": 0.5
          },
          {
            "name": "Mandrake Root",
            "chance": 0.05
          },
          {
            "name": "Eldweave Fiber",
            "chance": 0.05
          }
        ]
      }
    ]
  },
  "Whisperspring Elder Nymph": {
    "tables": [
      {
        "entries": [
          {
            "name": "Nymph Floret",
            "chance": 0.5
          },
          {
            "name": "Nightshade",
            "chance": 0.05
          },
          {
            "name": "Houndstongue",
            "chance": 0.5
          },
          {
            "name": "Mandrake Root",
            "chance": 0.05
          },
          {
            "name": "Eldweave Fiber",
            "chance": 0.1
          }
        ]
      }
    ]
  },
  "Whisperspring Naiad": {
    "tables": [
      {
        "entries": [
          {
            "name": "Vial of Naiad Water",
            "chance": 0.5
          },
          {
            "name": "Nightshade",
            "chance": 0.05
          },
          {
            "name": "Houndstongue",
            "chance": 0.5
          },
          {
            "name": "Mandrake Root",
            "chance": 0.05
          },
          {
            "name": "Eldweave Fiber",
            "chance": 0.1
          }
        ]
      }
    ]
  },
  "Whisperspring Dryad": {
    "tables": [
      {
        "entries": [
          {
            "name": "Dryad Horn",
            "chance": 0.5
          },
          {
            "name": "Eldweave Boots",
            "chance": 0.01
          },
          {
            "name": "Eldweave Gloves",
            "chance": 0.01
          },
          {
            "name": "Eldweave Hood",
            "chance": 0.01
          },
          {
            "name": "Eldweave Pants",
            "chance": 0.01
          },
          {
            "name": "Eldweave Shirt",
            "chance": 0.01
          },
          {
            "name": "Eldweave Shoulderpads",
            "chance": 0.01
          },
          {
            "name": "Nightshade",
            "chance": 0.05
          },
          {
            "name": "Houndstongue",
            "chance": 0.5
          },
          {
            "name": "Mandrake Root",
            "chance": 0.05
          },
          {
            "name": "Eldweave Fiber",
            "chance": 0.05
          }
        ]
      }
    ]
  },
  "Whisperspring Elder Dryad": {
    "tables": [
      {
        "entries": [
          {
            "name": "Dryad Horn",
            "chance": 0.5
          },
          {
            "name": "Eldweave Boots",
            "chance": 0.02
          },
          {
            "name": "Eldweave Gloves",
            "chance": 0.02
          },
          {
            "name": "Eldweave Hood",
            "chance": 0.02
          },
          {
            "name": "Eldweave Pants",
            "chance": 0.02
          },
          {
            "name": "Eldweave Shirt",
            "chance": 0.02
          },
          {
            "name": "Eldweave Shoulderpads",
            "chance": 0.02
          },
          {
            "name": "Nightshade",
            "chance": 0.05
          },
          {
            "name": "Houndstongue",
            "chance": 0.5
          },
          {
            "name": "Mandrake Root",
            "chance": 0.05
          },
          {
            "name": "Eldweave Fiber",
            "chance": 0.1
          }
        ]
      }
    ]
  },
  "Plague Bear": {
    "tables": [
      {
        "entries": [
          {
            "name": "Bear Pelt",
            "chance": 1
          },
          {
            "name": "Plague Bear Claw",
            "chance": 0.5
          },
          {
            "name": "Plague Bear Adrenal Gland",
            "chance": 1
          }
        ]
      }
    ]
  },
  "Brownie Gladekeeper": {
    "tables": [
      {
        "entries": [
          {
            "name": "Magic Mushroom",
            "chance": 0.02
          },
          {
            "name": "Eldwood Shortbow",
            "chance": 0.005
          },
          {
            "name": "Houndstongue",
            "chance": 0.02
          },
          {
            "name": "Nightshade",
            "chance": 0.02
          },
          {
            "name": "Gladekeeper Brooch",
            "chance": 1
          },
          {
            "name": "Eldweave Fiber",
            "chance": 0.02
          }
        ]
      }
    ]
  },
  "Zombie": {
    "tables": [
      {
        "entries": [
          {
            "name": "Zombie Brains",
            "chance": 0.5
          },
          {
            "name": "Linen Pants",
            "chance": 0.25
          },
          {
            "name": "Linen Shirt",
            "chance": 0.25
          },
          {
            "name": "Rope Belt",
            "chance": 0.1
          }
        ]
      }
    ]
  },
  "Cherub": {
    "tables": [
      {
        "entries": [
          {
            "name": "Cherub Wing",
            "chance": 0.2
          },
          {
            "name": "Uncut Diamond",
            "chance": 0.02
          },
          {
            "name": "Uncut Opal",
            "chance": 0.02
          },
          {
            "name": "Bolt of Spidersilk Cloth",
            "chance": 0.02
          },
          {
            "name": "Shortbow",
            "chance": 0.02
          }
        ]
      }
    ]
  },
  "Ki-Rin": {
    "tables": [
      {
        "entries": [
          {
            "name": "Ki-Rin Scale",
            "chance": 0.33
          }
        ]
      }
    ]
  },
  "Froglin": {
    "tables": [
      {
        "entries": [
          {
            "name": "Bronze Spear",
            "chance": 0.05
          },
          {
            "name": "Froglin Pauldron",
            "chance": 0.02
          },
          {
            "name": "Eye of Frog",
            "chance": 0.1
          },
          {
            "name": "Bone",
            "chance": 0.5
          },
          {
            "name": "Bone Necklace",
            "chance": 0.02
          },
          {
            "name": "Toad Venom Sack",
            "chance": 0.1
          },
          {
            "name": "Bloodroot",
            "chance": 0.02
          },
          {
            "name": "Datura Pod",
            "chance": 0.02
          },
          {
            "name": "Blue Lotus",
            "chance": 0.02
          }
        ]
      }
    ]
  },
  "Grindylow": {
    "tables": [
      {
        "entries": [
          {
            "name": "Bone",
            "chance": 0.5
          },
          {
            "name": "Shadow Claw",
            "chance": 0.02
          }
        ]
      }
    ]
  },
  "Froglin Bogseer": {
    "tables": [
      {
        "entries": [
          {
            "name": "Bone Wand",
            "chance": 0.05
          },
          {
            "name": "Eye of Frog",
            "chance": 0.1
          },
          {
            "name": "Bone",
            "chance": 0.5
          },
          {
            "name": "Bone Necklace",
            "chance": 0.02
          },
          {
            "name": "Toad Venom Sack",
            "chance": 0.1
          },
          {
            "name": "Datura Pod",
            "chance": 0.02
          },
          {
            "name": "Blue Lotus",
            "chance": 0.02
          },
          {
            "name": "Bloodroot",
            "chance": 0.02
          }
        ]
      }
    ]
  },
  "Giant Toad": {
    "tables": [
      {
        "entries": [
          {
            "name": "Eye of Frog",
            "chance": 0.1
          },
          {
            "name": "Toad Venom Sack",
            "chance": 0.1
          }
        ]
      }
    ]
  },
  "Hypnotoad": [],
  "Froglin Mucketeer": {
    "tables": [
      {
        "entries": [
          {
            "name": "Bronze Spear",
            "chance": 0.05
          },
          {
            "name": "Froglin Pauldron",
            "chance": 0.02
          },
          {
            "name": "Eye of Frog",
            "chance": 0.1
          },
          {
            "name": "Bone",
            "chance": 0.5
          },
          {
            "name": "Bone Necklace",
            "chance": 0.02
          },
          {
            "name": "Toad Venom Sack",
            "chance": 0.1
          },
          {
            "name": "Bloodroot",
            "chance": 0.02
          },
          {
            "name": "Datura Pod",
            "chance": 0.02
          },
          {
            "name": "Blue Lotus",
            "chance": 0.02
          }
        ]
      }
    ]
  },
  "Froglin Diviner": {
    "tables": [
      {
        "entries": [
          {
            "name": "Bone Wand",
            "chance": 0.05
          },
          {
            "name": "Eye of Frog",
            "chance": 0.1
          },
          {
            "name": "Bone",
            "chance": 0.5
          },
          {
            "name": "Bone Necklace",
            "chance": 0.02
          },
          {
            "name": "Toad Venom Sack",
            "chance": 0.1
          },
          {
            "name": "Datura Pod",
            "chance": 0.02
          },
          {
            "name": "Blue Lotus",
            "chance": 0.02
          },
          {
            "name": "Bloodroot",
            "chance": 0.02
          }
        ]
      }
    ]
  },
  "High Muckromancer K'Rawk": {
    "tables": [
      {
        "entries": [
          {
            "name": "Muckromancer Staff",
            "chance": 0.5
          }
        ]
      }
    ]
  },
  "Bogchieftan Squeech": {
    "tables": [
      {
        "entries": [
          {
            "name": "Bogchieftan Tomahawk",
            "chance": 0.05
          }
        ]
      }
    ]
  },
  "Froglin Zombie": {
    "tables": [
      {
        "entries": [
          {
            "name": "Bronze Spear",
            "chance": 0.05
          },
          {
            "name": "Froglin Pauldron",
            "chance": 0.02
          },
          {
            "name": "Eye of Frog",
            "chance": 0.1
          },
          {
            "name": "Bone",
            "chance": 0.5
          },
          {
            "name": "Bone Necklace",
            "chance": 0.02
          },
          {
            "name": "Toad Venom Sack",
            "chance": 0.1
          },
          {
            "name": "Zombie Brains",
            "chance": 0.5
          },
          {
            "name": "Blue Lotus",
            "chance": 0.02
          },
          {
            "name": "Datura Pod",
            "chance": 0.02
          },
          {
            "name": "Bloodroot",
            "chance": 0.02
          }
        ]
      }
    ]
  },
  "Swamp Thing": {
    "tables": [
      {
        "entries": [
          {
            "name": "Ether",
            "chance": 1
          },
          {
            "name": "Shadow Claw",
            "chance": 0.01
          }
        ]
      }
    ]
  },
  "Zesty Satyr": {
    "tables": [
      {
        "minLvl": "",
        "maxLvl": "",
        "entries": [
          {
            "name": "Bone",
            "chance": 0.5
          },
          {
            "name": "Bronze Dagger",
            "chance": 0.02
          },
          {
            "name": "Eldweave Fiber",
            "chance": 0.02
          },
          {
            "name": "Houndstongue",
            "chance": 0.02
          },
          {
            "name": "Mandrake Root",
            "chance": 0.02
          },
          {
            "name": "Crimson Nettle",
            "chance": 0.02
          },
          {
            "name": "Blue Lotus",
            "chance": 0.02
          },
          {
            "name": "Nightshade",
            "chance": 0.02
          },
          {
            "name": "Datura Pod",
            "chance": 0.02
          },
          {
            "name": "Silverleaf",
            "chance": 0.02
          }
        ]
      }
    ]
  },
  "Goblin Archer": {
    "tables": [
      {
        "entries": [
          {
            "name": "Goblin Fang",
            "chance": 0.2
          },
          {
            "name": "Goblin Fang",
            "chance": 0.2
          },
          {
            "name": "Bone",
            "chance": 0.5
          },
          {
            "name": "Bone Necklace",
            "chance": 0.02
          },
          {
            "name": "Goblin Head",
            "chance": 0.2
          },
          {
            "name": "Shortbow",
            "chance": 0.01
          }
        ]
      }
    ]
  },
  "Corvari Archer": [],
  "Corvari Spearman": [],
  "Corvari Wisecrow": [],
  "Badgeri": [],
  "Badgeri Shaman": [],
  "Badgeri Bruiser": [],
  "Tellursa": {
    "tables": [
      {
        "entries": [
          {
            "name": "Nightshade",
            "chance": 0.05
          },
          {
            "name": "Houndstongue",
            "chance": 0.5
          },
          {
            "name": "Mandrake Root",
            "chance": 0.05
          },
          {
            "name": "Eldweave Fiber",
            "chance": 0.05
          },
          {
            "name": "Datura Pod",
            "chance": 0.05
          },
          {
            "name": "Crimson Nettle",
            "chance": 0.05
          },
          {
            "name": "Silverleaf",
            "chance": 0.05
          }
        ]
      }
    ]
  },
  "Bisonar": {
    "tables": [
      {
        "entries": [
          {
            "name": "Bronze Battleaxe",
            "chance": 0.02
          }
        ]
      }
    ]
  },
  "Griffin": []
};

window.SoulreaperMonsters = {
  monsterTemplates,
  fenMonsterTemplates,
  monsterLootTables
};
})();
