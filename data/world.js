// Area, spawn, quest, NPC, and editor override data extracted from game.js.
(function () {
const areaSpawnTables = {
  "The Ganderswood": [
    {
      "name": "Giant Rat",
      "frequency": 100
    },
    {
      "name": "Goblin",
      "frequency": 50
    },
    {
      "name": "Wolf",
      "frequency": 20
    },
    {
      "name": "Brownie Scout",
      "frequency": 25
    },
    {
      "name": "Pixie",
      "frequency": 25
    },
    {
      "name": "Imp",
      "frequency": 15
    },
    {
      "name": "Stag",
      "frequency": 10
    },
    {
      "name": "Giant Spider",
      "frequency": 15
    },
    {
      "name": "Goblin Archer",
      "frequency": 25
    }
  ],
  "Gandersville": [],
  "Ganderswood Fen": [
    {
      "name": "Plague Rat",
      "frequency": 50
    },
    {
      "name": "Goblin Thug",
      "frequency": 30
    },
    {
      "name": "Imp",
      "frequency": 30
    },
    {
      "name": "Will-o-Wisp",
      "frequency": 20
    },
    {
      "name": "Goblin Shaman",
      "frequency": 15
    },
    {
      "name": "Bog Witch",
      "frequency": 15
    },
    {
      "name": "Plague Wolf",
      "frequency": 15
    },
    {
      "name": "Skeleton",
      "frequency": 30
    },
    {
      "name": "Mushroom Man",
      "frequency": 25
    },
    {
      "name": "Giant Spider",
      "frequency": 30
    }
  ],
  "Fenhold": [],
  "Rat Den": [
    {
      "name": "Giant Rat",
      "frequency": 100
    },
    {
      "name": "Plague Rat",
      "frequency": 50
    },
    {
      "name": "Earth Elemental",
      "frequency": 20
    },
    {
      "name": "Giant Spider",
      "frequency": 20
    }
  ],
  "Rat Warren": [
    {
      "name": "Giant Rat",
      "frequency": 100
    },
    {
      "name": "Plague Rat",
      "frequency": 50
    },
    {
      "name": "Ratkin Rogue",
      "frequency": 15,
      "minLvl": 5,
      "maxLvl": 6
    },
    {
      "name": "Vampire Bat",
      "frequency": 15
    },
    {
      "name": "Giant Spider",
      "frequency": 15
    }
  ],
  "Ratzkhan": [
    {
      "name": "Plague Rat",
      "frequency": 85
    },
    {
      "name": "Vampire Bat",
      "frequency": 25
    },
    {
      "name": "Earth Elemental",
      "frequency": 25
    },
    {
      "name": "Ratkin Rogue",
      "frequency": 25
    },
    {
      "name": "Ratkin Fanatic",
      "frequency": 25
    },
    {
      "name": "Gelatinous Cube",
      "frequency": 20
    },
    {
      "name": "Diarrhea Monster",
      "frequency": 10
    },
    {
      "name": "Giant Spider",
      "frequency": 10
    }
  ],
  "Diarrh Realm": [
    {
      "name": "Diarrhea Monster",
      "frequency": 100
    },
    {
      "name": "Plague Rat",
      "frequency": 45
    },
    {
      "name": "Vampire Bat",
      "frequency": 20
    }
  ],
  "Ganderswood Glade": [
    {
      "name": "Goblin",
      "frequency": 30
    },
    {
      "name": "Wolf",
      "frequency": 20
    },
    {
      "name": "Brownie Scout",
      "frequency": 15
    },
    {
      "name": "Pixie",
      "frequency": 15
    },
    {
      "name": "White Stag",
      "frequency": 2
    },
    {
      "name": "Brownie Archer",
      "frequency": 10
    },
    {
      "name": "Stag",
      "frequency": 10
    },
    {
      "name": "Brownie Gladekeeper",
      "frequency": 5
    }
  ],
  "Whisperspring": [
    {
      "name": "Will-o-Wisp",
      "frequency": 5
    }
  ],
  "Grimswood Pass": [
    {
      "name": "Skeleton",
      "frequency": 75
    },
    {
      "name": "Imp",
      "frequency": 50
    },
    {
      "name": "Plague Wolf",
      "frequency": 30
    },
    {
      "name": "Bog Witch",
      "frequency": 15
    },
    {
      "name": "Vampire Bat",
      "frequency": 30
    },
    {
      "name": "Incubus",
      "frequency": 6
    },
    {
      "name": "Giant Spider",
      "frequency": 30
    }
  ],
  "Wyndhelm": [],
  "The Crowing Fields": [
    {
      "name": "Bear",
      "frequency": 10
    },
    {
      "name": "Stag",
      "frequency": 20
    },
    {
      "name": "Wolf",
      "frequency": 30
    },
    {
      "name": "Will-o-Wisp",
      "frequency": 20
    },
    {
      "name": "Goblin Thug",
      "frequency": 30
    },
    {
      "name": "Goblin Wolf Rider",
      "frequency": 15
    },
    {
      "name": "Earth Elemental",
      "frequency": 20
    },
    {
      "name": "Corvari Archer",
      "frequency": 30
    },
    {
      "name": "Corvari Spearman",
      "frequency": 30
    },
    {
      "name": "Corvari Wisecrow",
      "frequency": 20
    },
    {
      "name": "Goblin",
      "frequency": 30
    },
    {
      "name": "Goblin Shaman",
      "frequency": 15
    },
    {
      "name": "Bisonar",
      "frequency": 5
    },
    {
      "name": "Tellursa",
      "frequency": 5
    },
    {
      "name": "Griffin",
      "frequency": 2,
      "minLvl": 15,
      "maxLvl": 17
    }
  ],
  "Gobba": [],
  "Harkhar Highlands": [
    {
      "name": "Corvari Archer",
      "frequency": 30
    },
    {
      "name": "Corvari Spearman",
      "frequency": 30
    },
    {
      "name": "Corvari Wisecrow",
      "frequency": 15
    },
    {
      "name": "Bear",
      "frequency": 10
    },
    {
      "name": "Wolf",
      "frequency": 10
    },
    {
      "name": "Goblin",
      "frequency": 20
    },
    {
      "name": "Goblin Archer",
      "frequency": 20
    },
    {
      "name": "Goblin Shaman",
      "frequency": 15
    },
    {
      "name": "Goblin Thug",
      "frequency": 10
    },
    {
      "name": "Goblin Wolf Rider",
      "frequency": 10
    },
    {
      "name": "Tellursa",
      "frequency": 5,
      "minLvl": 10,
      "maxLvl": 11
    },
    {
      "name": "Bisonar",
      "frequency": 5
    },
    {
      "name": "Griffin",
      "frequency": 5,
      "minLvl": 15,
      "maxLvl": 17
    }
  ],
  "Harmush Lagh": [
    {
      "name": "Badgeri",
      "frequency": 20
    },
    {
      "name": "Badgeri Bruiser",
      "frequency": 10,
      "minLvl": 4,
      "maxLvl": 6
    },
    {
      "name": "Badgeri Shaman",
      "frequency": 10,
      "minLvl": 3,
      "maxLvl": 5
    },
    {
      "name": "Wolf",
      "frequency": 20
    },
    {
      "name": "Earth Elemental",
      "frequency": 20,
      "minLvl": 3,
      "maxLvl": 5
    },
    {
      "name": "Goblin",
      "frequency": 40
    },
    {
      "name": "Goblin Archer",
      "frequency": 30
    },
    {
      "name": "Imp",
      "frequency": 10
    },
    {
      "name": "Woolly Spider",
      "frequency": 20
    },
    {
      "name": "Snow Weasel",
      "frequency": 50
    },
    {
      "name": "Stag",
      "frequency": 20
    }
  ],
  "Highstone Pass": [
    {
      "name": "Earth Elemental",
      "frequency": 10
    },
    {
      "name": "Snow Leopard",
      "frequency": 5
    },
    {
      "name": "Arctic Wolf",
      "frequency": 5
    },
    {
      "name": "Wolf",
      "frequency": 5
    }
  ],
  "Harga Voagh": [],
  "Firecry Peak": [],
  "Evermist Glade": [
    {
      "name": "Black Panther",
      "frequency": 25
    },
    {
      "name": "Brownie Druid",
      "frequency": 50
    },
    {
      "name": "Brownie Scout",
      "frequency": 25
    },
    {
      "name": "Pixie",
      "frequency": 50
    },
    {
      "name": "Will-o-Wisp",
      "frequency": 50
    },
    {
      "name": "Mushroom Man",
      "frequency": 25
    },
    {
      "name": "Stag",
      "frequency": 25
    },
    {
      "name": "Brownie Archer",
      "frequency": 10
    }
  ],
  "Lake Roga": [
    {
      "name": "Cherub",
      "frequency": 10
    },
    {
      "name": "Ki-Rin",
      "frequency": 1
    },
    {
      "name": "Stag",
      "frequency": 10
    },
    {
      "name": "Naiad",
      "frequency": 10
    },
    {
      "name": "Satyr",
      "frequency": 10
    },
    {
      "name": "Water Elemental",
      "frequency": 10
    },
    {
      "name": "Earth Elemental",
      "frequency": 10
    },
    {
      "name": "Froglin",
      "frequency": 25
    },
    {
      "name": "Grindylow",
      "frequency": 10
    },
    {
      "name": "Froglin Bogseer",
      "frequency": 15
    },
    {
      "name": "Giant Toad",
      "frequency": 15
    },
    {
      "name": "Hypnotoad",
      "frequency": 5
    }
  ],
  "Wastes of Kebaan": [],
  "Kebaan Oasis": [],
  "Ruins of Kebaan": [],
  "Wyndhelm Cathedral": [],
  "Bear Cave": []
};

const devAreaConfigs = {
  "The Ganderswood": {
    "levelRange": {
      "min": 1,
      "max": 3
    },
    "connectsTo": [
      "Ganderswood Fen",
      "Rat Den",
      "Gandersville"
    ],
    "environment": {
      "groundTexture": "./assets/ground/ganderswood.png",
      "features": []
    }
  },
  "Gandersville": {
    "levelRange": {
      "min": 1,
      "max": 1
    },
    "connectsTo": [
      "The Ganderswood",
      "Lake Roga"
    ],
    "environment": {
      "groundTexture": "./assets/ground/wyndhelm.png",
      "features": []
    }
  },
  "Ganderswood Fen": {
    "levelRange": {
      "min": 7,
      "max": 8
    },
    "connectsTo": [
      "The Ganderswood",
      "Grimswood Pass",
      "Fenhold"
    ],
    "environment": {
      "groundTexture": "./assets/ground/muddyfield.png",
      "features": []
    },
    "spawnAmount": "Moderate"
  },
  "Fenhold": {
    "levelRange": {
      "min": 7,
      "max": 8
    },
    "connectsTo": [
      "Ganderswood Fen"
    ],
    "environment": {
      "groundTexture": "./assets/ground/muddyfield.png",
      "features": []
    }
  },
  "Rat Den": {
    "levelRange": {
      "min": 3,
      "max": 5
    },
    "connectsTo": [
      "The Ganderswood",
      "Ganderswood Glade",
      "Ratzkhan"
    ],
    "environment": {
      "groundTexture": "./assets/ground/rat-den.png",
      "features": []
    }
  },
  "Rat Warren": {
    "levelRange": {
      "min": 3,
      "max": 5
    },
    "connectsTo": [
      "Rat Den"
    ],
    "environment": {
      "groundTexture": "./assets/ground/rat-den.png",
      "features": []
    }
  },
  "Ratzkhan": {
    "levelRange": {
      "min": 5,
      "max": 8
    },
    "connectsTo": [
      "Rat Den",
      "Diarrh Realm"
    ],
    "environment": {
      "groundTexture": "./assets/ground/rat-den.png",
      "features": []
    }
  },
  "Diarrh Realm": {
    "levelRange": {
      "min": 8,
      "max": 10
    },
    "connectsTo": [
      "Ratzkhan"
    ],
    "environment": {
      "groundTexture": "./assets/ground/ratzkhan-chamber.png",
      "features": []
    }
  },
  "Ganderswood Glade": {
    "levelRange": {
      "min": 5,
      "max": 8
    },
    "connectsTo": [
      "Rat Den",
      "Whisperspring"
    ],
    "environment": {
      "groundTexture": "./assets/ground/ganderswood-glade.png",
      "features": []
    }
  },
  "Whisperspring": {
    "levelRange": {
      "min": 6,
      "max": 8
    },
    "connectsTo": [
      "Ganderswood Glade"
    ],
    "environment": {
      "groundTexture": "./assets/ground/whisperspring.png",
      "features": []
    },
    "spawnAmount": "Low"
  },
  "Grimswood Pass": {
    "levelRange": {
      "min": 8,
      "max": 9
    },
    "connectsTo": [
      "Ganderswood Fen",
      "Wyndhelm",
      "The Crowing Fields"
    ],
    "environment": {
      "groundTexture": "./assets/ground/grimswood-pass.png",
      "features": []
    }
  },
  "Wyndhelm": {
    "levelRange": {
      "min": 1,
      "max": 1
    },
    "connectsTo": [
      "Grimswood Pass"
    ],
    "environment": {
      "groundTexture": "./assets/ground/wyndhelm.png",
      "features": []
    }
  },
  "The Crowing Fields": {
    "levelRange": {
      "min": 9,
      "max": 11
    },
    "connectsTo": [
      "Grimswood Pass",
      "Harkhar Highlands",
      "Gobba"
    ],
    "environment": {
      "groundTexture": "./assets/ground/crowing-fields.png",
      "features": []
    }
  },
  "Gobba": {
    "levelRange": {
      "min": 9,
      "max": 11
    },
    "connectsTo": [
      "The Crowing Fields"
    ],
    "environment": {
      "groundTexture": "./assets/ground/gobba.png",
      "features": []
    }
  },
  "Harkhar Highlands": {
    "levelRange": {
      "min": 7,
      "max": 9
    },
    "connectsTo": [
      "The Crowing Fields",
      "Harmush Lagh"
    ],
    "environment": {
      "groundTexture": "./assets/ground/snow-grass.png",
      "features": []
    }
  },
  "Harmush Lagh": {
    "levelRange": {
      "min": 1,
      "max": 3
    },
    "connectsTo": [
      "Harkhar Highlands",
      "Highstone Pass"
    ],
    "environment": {
      "groundTexture": "./assets/ground/mountain.png",
      "features": []
    }
  },
  "Highstone Pass": {
    "levelRange": {
      "min": 4,
      "max": 6
    },
    "connectsTo": [
      "Harmush Lagh",
      "Harga Voagh"
    ],
    "environment": {
      "groundTexture": "./assets/ground/mountain.png",
      "features": []
    }
  },
  "Harga Voagh": {
    "levelRange": {
      "min": 17,
      "max": 19
    },
    "connectsTo": [
      "Highstone Pass"
    ],
    "environment": {
      "groundTexture": "./assets/ground/snow.png",
      "features": []
    }
  },
  "Firecry Peak": {
    "levelRange": {
      "min": 19,
      "max": 21
    },
    "connectsTo": [
      "Harga Voagh"
    ],
    "environment": {
      "groundTexture": "./assets/ground/ash.png",
      "features": [
        {
          "name": "Dead Trees",
          "sprite": "./assets/sprites/props/dead-tree.png",
          "minRadius": 18,
          "maxRadius": 40,
          "obstacle": true,
          "minCount": 32,
          "maxCount": 56
        }
      ]
    }
  },
  "Evermist Glade": {
    "levelRange": {
      "min": 20,
      "max": 23
    },
    "connectsTo": [
      "Ganderswood Glade"
    ],
    "environment": {
      "groundTexture": "./assets/ground/evermist-glade.png",
      "features": []
    }
  },
  "Lake Roga": {
    "levelRange": {
      "min": 10,
      "max": 12
    },
    "connectsTo": [
      "Gandersville"
    ],
    "environment": {
      "groundTexture": "./assets/ground/ganderswood.png",
      "features": [
        {
          "name": "Weeping Willows",
          "sprite": "./assets/sprites/props/weeping-willow.png",
          "minRadius": 22,
          "maxRadius": 42,
          "obstacle": true,
          "minCount": 10,
          "maxCount": 18
        },
        {
          "name": "Summer Bushes",
          "sprite": "./assets/sprites/props/summer-bush.png",
          "minRadius": 12,
          "maxRadius": 24,
          "obstacle": true,
          "minCount": 14,
          "maxCount": 24
        },
        {
          "name": "Summer Trees",
          "sprite": "./assets/sprites/props/summer-tree.png",
          "minRadius": 18,
          "maxRadius": 36,
          "obstacle": true,
          "minCount": 12,
          "maxCount": 22
        },
        {
          "name": "Plum Trees",
          "sprite": "./assets/sprites/props/plum-tree.png",
          "minRadius": 18,
          "maxRadius": 34,
          "obstacle": true,
          "minCount": 8,
          "maxCount": 16
        }
      ]
    },
    "spawnRate": "Normal",
    "spawnAmount": "Low"
  },
  "Wastes of Kebaan": {
    "levelRange": {
      "min": 12,
      "max": 15
    },
    "connectsTo": [
      "Gobba",
      "Kebaan Oasis",
      "Ruins of Kebaan"
    ],
    "environment": {
      "groundTexture": "./assets/ground/sand.png",
      "features": []
    }
  },
  "Kebaan Oasis": {
    "levelRange": {
      "min": 12,
      "max": 15
    },
    "connectsTo": [
      "Wastes of Kebaan"
    ],
    "environment": {
      "groundTexture": "./assets/ground/oasis.png",
      "features": []
    }
  },
  "Ruins of Kebaan": {
    "levelRange": {
      "min": 12,
      "max": 15
    },
    "connectsTo": [
      "Wastes of Kebaan"
    ],
    "environment": {
      "groundTexture": "./assets/ground/desert-ruins-floor.png",
      "features": []
    }
  },
  "Wyndhelm Cathedral": {
    "levelRange": {
      "min": 1,
      "max": 1
    },
    "connectsTo": [
      "Wyndhelm"
    ],
    "environment": {
      "groundTexture": "./assets/ground/cath_floor.png",
      "features": []
    }
  },
  "Bear Cave": {
    "levelRange": {
      "min": 8,
      "max": 10
    },
    "connectsTo": [
      "Ganderswood Fen"
    ],
    "environment": {
      "groundTexture": "./assets/ground/rat-den.png",
      "features": []
    }
  }
};

const devQuestConfigs = {
  "roga-reconnaissance": {
    "id": "roga-reconnaissance",
    "name": "Roga Reconnaissance",
    "description": "Reeve Marlowe wants a first report from Lake Roga. Thin the Froglins and Giant Toads around the lake, then return to Gandersville Town Hall.",
    "minimumLevel": 10,
    "rewardXp": 350,
    "rewardGold": 90,
    "objectives": [
      {
        "type": "kill",
        "label": "Froglins Slain",
        "required": 5,
        "enemy": "Froglin"
      },
      {
        "type": "kill",
        "label": "Giant Toads Slain",
        "required": 3,
        "enemy": "Giant Toad"
      }
    ],
    "new": true
  },
  "grindylow-problem": {
    "id": "grindylow-problem",
    "name": "The Grindylow Problem",
    "description": "Reeve Marlowe says Lake Roga's shallows have become dangerous. Slay Grindylows near the water and report back to Town Hall.",
    "minimumLevel": 10,
    "rewardXp": 425,
    "rewardGold": 120,
    "objectives": [
      {
        "type": "kill",
        "enemy": "Grindylow",
        "label": "Grindylows Slain",
        "required": 4
      }
    ],
    "new": true
  },
  "bogseer-signs": {
    "id": "bogseer-signs",
    "name": "Bogseer Signs",
    "description": "Reeve Marlowe believes the Froglin Bogseers are stirring up Lake Roga's stranger beasts. Defeat the Bogseers and Hypnotoads, then return to Town Hall.",
    "minimumLevel": 10,
    "rewardXp": 525,
    "rewardGold": 150,
    "objectives": [
      {
        "type": "kill",
        "enemy": "Froglin Bogseer",
        "label": "Froglin Bogseers Slain",
        "required": 4
      },
      {
        "type": "kill",
        "enemy": "Hypnotoad",
        "label": "Hypnotoads Slain",
        "required": 2
      }
    ],
    "new": true
  },
  "gvada-starter-magic": {
    "id": "gvada-starter-magic",
    "new": true,
    "name": "Gvada's Lesson",
    "description": "Gvada has given you a starter spell scroll. Learn it, practice with it, and return to her after your matching Realm LVL increases.",
    "rewardXp": 100,
    "rewardGold": 50
  },
  "sybil-starter-magic": {
    "id": "sybil-starter-magic",
    "new": true,
    "name": "Sybil's Lesson",
    "description": "Sybil Ladybeard has given you a starter spell scroll and a dwarf's warning: practice until your matching Realm LVL increases, then return to her.",
    "rewardXp": 100,
    "rewardGold": 50
  },
  "rat-infestation": {
    "id": "rat-infestation",
    "name": "Rat Infestation",
    "description": "Prove you've helped Pleezix with the rat problem by bringing him seven rat pelts.",
    "rewardXp": 35,
    "rewardGold": 20,
    "rewardItem": "Rat-Skin Shawl",
    "new": true
  },
  "sharlene-parcel": {
    "id": "sharlene-parcel",
    "phase": "find-parcel",
    "parcelDropped": false,
    "firstRewardGranted": false,
    "new": true,
    "name": "Sharlene's Parcel",
    "description": "Sharlene was chased out of Ganderswood Fen by Bog Witch and dropped a parcel she had been meaning to deliver to Bumsfork. She would be very grateful if you would return it to her.",
    "minimumLevel": 6,
    "rewardXp": 100,
    "rewardGold": 25
  },
  "napaea-skull": {
    "id": "napaea-skull",
    "skullDropped": false,
    "new": true,
    "name": "Napaea's Skull",
    "description": "Mordren wants you to kill Napaea in Ganderswood Glade and bring back her skull.",
    "rewardXp": 100,
    "rewardVirtue": -25,
    "rewardItem": "Onyx Bracelet",
    "rewardRealmXp": {
      "Umbral": 50,
      "Infernal": 50
    }
  },
  "fenhold": {
    "id": "fenhold",
    "new": true,
    "name": "Fenhold",
    "description": "Mordren says his mistress Morgane in Fenhold Keep will be pleased to know Napaea's life has been snuffed out. Speak with Necromancer Morgane in Fenhold Keep."
  },
  "morganes-reagents": {
    "id": "morganes-reagents",
    "new": true,
    "name": "Morgane's Reagents",
    "description": "Necromancer Morgane needs magical reagents from the ancient forest temple of Whisperspring: a Dryad Horn, a Vial of Naiad Water, and a Nymph Floret.",
    "rewardXp": 300,
    "rewardGold": 100,
    "rewardRealmXp": {
      "Umbral": 300
    }
  },
  "remove-goblin-menace": {
    "id": "remove-goblin-menace",
    "new": true,
    "name": "Remove the Goblin Menace",
    "description": "Quigley Thistleberry has asked you to defeat Mukluk the Deceiver and bring back proof that the goblins no longer hold the eastern ruins of Whisperspring.",
    "rewardXp": 500,
    "rewardGold": 100,
    "rewardItem": "Tabard of Whisperspring",
    "rewardRealmXp": {
      "Sylvan": 500
    }
  },
  "war-with-goblins": {
    "id": "war-with-goblins",
    "new": true,
    "name": "War with Goblins",
    "description": "Happie Filmore has asked you to prove your allegiance to Faekind by bringing him six Goblin Fangs from the war against the goblins.",
    "rewardXp": 100,
    "rewardGold": 30,
    "rewardItem": "Faerie Sigil",
    "rewardRealmXp": {
      "Sylvan": 100
    }
  },
  "antidote-for-the-plague": {
    "id": "antidote-for-the-plague",
    "new": true,
    "name": "Antidote for the Plague",
    "description": "Theodora is working on an antidote for whatever has been plaguing the animals of Ganderswood. She needs one rare Purple Mushroom, said to grow somewhere in Ganderswood Fen.",
    "minimumLevel": 6,
    "rewardXp": 300,
    "rewardGold": 40,
    "rewardItem": "Theodora's Opal Earring",
    "rewardItems": [
      "Soothing Potion"
    ]
  },
  "bone-collector": {
    "id": "bone-collector",
    "name": "Bone Collector",
    "description": "Heretic Slayleigh wants a stack of 20 Bones. She insists this is a perfectly normal thing to be looking for.",
    "rewardXp": 50,
    "rewardGold": 40,
    "rewardRealmXp": {
      "Umbral": 50,
      "Infernal": 50
    },
    "new": true
  },
  "the-white-stag": {
    "id": "the-white-stag",
    "name": "The White Stag",
    "description": "Juan Tabo wants to study the mythical White Stag that roams the glades of the Ganderswood. Tame one and bring it into Gandersville Town Hall.",
    "rewardXp": 500,
    "rewardItem": "Scroll of Song of White Stag",
    "rewardRealmXp": {
      "Sylvan": 500
    },
    "new": true
  },
  "introduction-to-celestial-mercy": {
    "id": "introduction-to-celestial-mercy",
    "phase": "heal-with-celestial-spell",
    "new": true,
    "name": "Introduction to Celestial Mercy",
    "description": "High Priestess Sierra says Celestial magic preserves life before it judges evil. Restore HP with Basic Prayer or Heavenly Light, then return to her.",
    "minimumRealm": "Celestial",
    "minimumRealmLevel": 1,
    "rewardXp": 40,
    "rewardGold": 40,
    "rewardItem": "Scroll of Heavenly Light"
  },
  "blessing-of-the-road": {
    "id": "blessing-of-the-road",
    "name": "Blessing of the Road",
    "description": "High Priestess Sierra wants you to learn how Celestial blessings guide and hasten the faithful. Cast Godspeed on yourself or an ally, then return to her.",
    "phase": "cast-godspeed",
    "rewardXp": 50,
    "rewardGold": 50,
    "rewardItem": "Scroll of Godspeed",
    "new": true
  },
  "a-shield-of-faith": {
    "id": "a-shield-of-faith",
    "name": "A Shield of Faith",
    "description": "High Priestess Sierra wants you to learn protective Celestial magic. Let Divine Shield absorb damage, then return to her.",
    "phase": "absorb-with-divine-shield",
    "rewardXp": 75,
    "rewardGold": 75,
    "rewardItem": "Scroll of Grace from Above",
    "new": true
  }
};

const devNpcConfigs = [
  {
    "id": "gvada",
    "name": "Gvada",
    "area": "The Ganderswood",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/gvada-v2.png",
    "startsQuest": true,
    "questId": "gvada-starter-magic"
  },
  {
    "id": "shopkeeper-billiam",
    "name": "Shopkeeper Billiam",
    "area": "The Ganderswood",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/shopkeeper.png",
    "shopkeeper": true,
    "shop": {
      "weapons": [
        "Bronze Dagger",
        "Bronze Shortsword",
        "Shortbow",
        "Wooden Staff"
      ],
      "equipment": [
        "Leather Breastplate",
        "Leather Hood",
        "Leather Gloves",
        "Leather Pants",
        "Leather Boots",
        "Leather Pauldrons",
        "Wooden Shield",
        "Leather Bracer",
        "Leather Belt"
      ],
      "bags": [
        "Small Bag"
      ],
      "consumables": [
        {
          "name": "Clarity Potion",
          "quantity": 3
        },
        {
          "name": "Agility Potion",
          "quantity": 3
        },
        {
          "name": "Soothing Potion",
          "quantity": 3
        },
        {
          "name": "Energy Potion",
          "quantity": 3
        },
        {
          "name": "Healing Potion",
          "quantity": 3
        },
        {
          "name": "Potion of Resist Magic",
          "quantity": 3
        },
        {
          "name": "Bronze Arrow",
          "quantity": 99
        },
        {
          "name": "Bronze Arrow",
          "quantity": 99
        },
        {
          "name": "Bronze Arrow",
          "quantity": 99
        }
      ]
    }
  },
  {
    "id": "pleezix",
    "name": "Pleezix",
    "area": "The Ganderswood",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/old-man.png",
    "startsQuest": true,
    "questId": "rat-infestation"
  },
  {
    "id": "sharlene",
    "name": "Sharlene",
    "area": "Ganderswood Fen",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/villager-female.png",
    "startsQuest": true,
    "questId": "sharlene-parcel"
  },
  {
    "id": "mordren",
    "name": "Mordren",
    "area": "Rat Den",
    "alignment": "Neutral Evil",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/witchy-villager-male.png",
    "startsQuest": true,
    "questId": "napaea-skull",
    "refusalText": "How about you mind your own business?"
  },
  {
    "id": "cecil-paddywagon",
    "name": "Cecil Paddywagon",
    "area": "Grimswood Pass",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/villager-male-2.png"
  },
  {
    "id": "theodora",
    "name": "Theodora",
    "area": "Ganderswood Fen",
    "alignment": "Neutral Good",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/old-woman.png",
    "startsQuest": true,
    "questId": "antidote-for-the-plague",
    "refusalText": "Please leave my house."
  },
  {
    "id": "quigley-thistleberry",
    "name": "Quigley Thistleberry",
    "area": "Whisperspring",
    "alignment": "Good",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/guard.png",
    "startsQuest": true,
    "questId": "remove-goblin-menace"
  },
  {
    "id": "happie-filmore",
    "name": "Happie Filmore",
    "area": "Whisperspring",
    "alignment": "Neutral Good",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/sylvan-soulreaper-male.png",
    "startsQuest": true,
    "questId": "war-with-goblins"
  },
  {
    "id": "guard-dorin",
    "name": "Guard Dorin",
    "area": "Whisperspring",
    "alignment": "Neutral Good",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/guard.png"
  },
  {
    "id": "druidess-dyaria",
    "name": "Druidess Dyaria",
    "area": "Ganderswood Glade",
    "alignment": "Neutral Good",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/sylvan-soulreaper-female.png",
    "trainer": true,
    "shopkeeper": true,
    "trainerRealms": [
      "Sylvan"
    ],
    "trainerMaxSpellLevel": 18,
    "refusalText": "You disgrace the sanctity of this hallowed glade. Begone.",
    "shop": {
      "scrolls": [
        "Scroll of Faerie Dust",
        "Scroll of Tangle Vine",
        "Scroll of Faerie Fire",
        "Scroll of Spirit of Avia",
        "Scroll of Faerie Circle",
        "Scroll of Tame Beast",
        "Scroll of Thorn Shield",
        "Scroll of Summon Treant",
        "Scroll of Sacred Grove",
        "Scroll of Wooden Skin"
      ]
    }
  },
  {
    "id": "mira-kettlewick",
    "name": "Mira Kettlewick",
    "area": "Gandersville",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/villager-female.png",
    "startsQuest": true,
    "questId": "pantry-pests",
    "dialogueContexts": {
      "questOffer": "My pantry is crawling with rats. I cannot cook, I cannot sleep, and I will not open another cupboard until someone clears them out.",
      "questAccepted": "Thank you. The pantry is through the back. Please be quick.",
      "questActive": "The rats are still in there. I can hear them chewing.",
      "questReady": "Quiet at last. You have saved my stores and what remained of my patience.",
      "questAfterComplete": "My pantry is peaceful again. I still check the corners twice."
    }
  },
  {
    "id": "sergeant-bram",
    "name": "Sergeant Bram",
    "area": "Gandersville",
    "alignment": "Neutral Good",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/guard.png",
    "startsQuest": true,
    "questId": "fen-patrol",
    "questMinimumLevelText": "The Fen patrol is not work for a green recruit. Come back when you are LVL {level}.",
    "dialogueContexts": {
      "questOffer": "The road by Ganderswood Fen has been too quiet, which usually means trouble is choosing where to strike. Thin the Goblin Thugs and Goblin Shamans out there, then report back.",
      "questActive": "Finish the Fen patrol. Goblins do not stop being a problem because we stop counting them.",
      "questReady": "Good work. The road will breathe easier for a while.",
      "questAfterComplete": "Keep your eyes on the Fen. It has a habit of growing new problems."
    }
  },
  {
    "id": "widow-elowen",
    "name": "Widow Elowen",
    "area": "Gandersville",
    "alignment": "Neutral Good",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/old-woman.png",
    "startsQuest": true,
    "questId": "flowers-for-the-grave",
    "questMinimumLevelText": "The graveyard is no place for you yet. Return when you are LVL {level}.",
    "dialogueContexts": {
      "questOffer": "My husband rests in the Fen graveyard, and I have not had the courage to go. Please take these Mourning Flowers to his grave.",
      "questActive": "Please place the Mourning Flowers at my husband's grave in the Fen.",
      "questReady": "You placed them? Thank you. Some debts of the heart can only be carried by another.",
      "questAfterComplete": "You gave an old grief a little peace.",
      "letterRead": "This letter... I thought his last words were lost. You have returned more than flowers to me."
    }
  },
  {
    "id": "reeve-marlowe",
    "name": "Reeve Marlowe",
    "area": "Gandersville",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/mayor.png",
    "startsQuest": true,
    "questId": "roga-reconnaissance",
    "questChain": [
      "roga-reconnaissance",
      "grindylow-problem",
      "bogseer-signs"
    ],
    "questMinimumLevelText": "Lake Roga is no errand for an untested soulreaper. Return when you are LVL {level}.",
    "dialogueContexts": {
      "questOffer": "Gandersville has need of eyes on Lake Roga. The waterline has grown restless, and the first task is simple: clear enough of the smaller threats that folk can approach the shore again.",
      "questActive": "Lake Roga still needs your attention. Finish the work marked in your Chronicle and report back here.",
      "questReady": "Good. A report backed by action is worth more than a stack of frightened rumors.",
      "questAfterComplete": "For now, Town Hall has what it needs from Lake Roga. If the lake stirs again, I will know where to look."
    }
  },
  {
    "id": "soulreaper-trainer-dyaria",
    "name": "Soulreaper Trainer Dyaria",
    "area": "Ganderswood Glade",
    "alignment": "Neutral Good",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/sylvan-soulreaper-female.png",
    "trainer": true,
    "refusalText": "A soulreaper as disreputable as you disgraces the sanctity of this hallowed glade. Be gone."
  },
  {
    "id": "soulreaper-trainer",
    "name": "Soulreaper Trainer",
    "area": "The Ganderswood",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/ethereal-soulreaper-male.png",
    "trainer": true,
    "banker": true
  },
  {
    "advanced": {},
    "id": "huntsman-robb",
    "name": "Huntsman Robb",
    "area": "Gandersville",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/ranger.png",
    "shopkeeper": true,
    "shop": {
      "weapons": [
        "Bronze Dagger",
        "Shortbow",
        "Longbow"
      ],
      "equipment": [
        "Leather Boots",
        "Leather Gloves",
        "Leather Bracer",
        "Leather Hood",
        "Leather Breastplate",
        "Leather Pants",
        "Leather Pauldrons"
      ],
      "consumables": [
        {
          "name": "Bronze Arrow",
          "quantity": 99
        },
        {
          "name": "Bronze Arrow",
          "quantity": 99
        },
        {
          "name": "Bronze Arrow",
          "quantity": 99
        },
        {
          "name": "Bronze Arrow",
          "quantity": 99
        },
        {
          "name": "Bronze Arrow",
          "quantity": 99
        },
        {
          "name": "Bronze Arrow",
          "quantity": 99
        }
      ],
      "scrolls": [
        "Scroll of Poison",
        "Scroll of Spirit of Avia",
        "Scroll of Tame Beast",
        "Scroll of Archery Mastery",
        "Scroll of Axe Mastery",
        "Scroll of Mace Mastery",
        "Scroll of Dual Wield",
        "Scroll of War Drums"
      ]
    }
  },
  {
    "advanced": {},
    "id": "huntsman-flintstein",
    "name": "Huntsman Flintstein",
    "area": "Gandersville",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/dwarf-leather-full.png",
    "faction": "whiterock-dwarves",
    "shopkeeper": true,
    "shop": {
      "weapons": [
        "Bronze Dagger",
        "Shortbow",
        "Longbow"
      ],
      "equipment": [
        "Leather Boots",
        "Leather Gloves",
        "Leather Bracer",
        "Leather Hood",
        "Leather Breastplate",
        "Leather Pants",
        "Leather Pauldrons"
      ],
      "consumables": [
        {
          "name": "Bronze Arrow",
          "quantity": 99
        },
        {
          "name": "Bronze Arrow",
          "quantity": 99
        },
        {
          "name": "Bronze Arrow",
          "quantity": 99
        },
        {
          "name": "Bronze Arrow",
          "quantity": 99
        },
        {
          "name": "Bronze Arrow",
          "quantity": 99
        },
        {
          "name": "Bronze Arrow",
          "quantity": 99
        }
      ],
      "scrolls": [
        "Scroll of Poison",
        "Scroll of Spirit of Avia",
        "Scroll of Tame Beast",
        "Scroll of Archery Mastery",
        "Scroll of Axe Mastery",
        "Scroll of Mace Mastery",
        "Scroll of Dual Wield",
        "Scroll of War Drums"
      ]
    }
  },
  {
    "advanced": {},
    "id": "blacksmith-fredward",
    "name": "Blacksmith Fredward",
    "area": "Gandersville",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/villager-male-2.png",
    "shopkeeper": true,
    "shop": {
      "weapons": [
        "Bronze Dagger",
        "Bronze Shortsword",
        "Bronze Longsword",
        "Bronze Mace",
        "Bronze Battleaxe"
      ],
      "equipment": [
        "Bronze Chainmail Boots",
        "Bronze Shield",
        "Bronze Spangenhelm",
        "Wooden Shield",
        "Bronze Plate Bracer",
        "Bronze Plate Cuirass",
        "Bronze Plate Gauntlets",
        "Bronze Plate Greaves",
        "Bronze Plate Pauldrons",
        "Bronze Plate Sabatons",
        "Bronze Chainmail Bracer",
        "Bronze Spangenhelm",
        "Bronze Chainmail Boots",
        "Bronze Chainmail Bracer",
        "Bronze Chainmail Coif",
        "Bronze Chainmail Gloves",
        "Bronze Chainmail Pants",
        "Bronze Chainmail Pauldrons",
        "Bronze Chainmail Vest"
      ],
      "consumables": [
        {
          "name": "Bronze Arrow",
          "quantity": 99
        },
        {
          "name": "Bronze Arrow",
          "quantity": 99
        },
        {
          "name": "Bronze Arrow",
          "quantity": 99
        }
      ]
    }
  },
  {
    "advanced": {},
    "id": "chaplain-sonsam",
    "name": "Chaplain Sonsam",
    "area": "The Ganderswood",
    "alignment": "Neutral Good",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/priest.png",
    "refusalText": "I can sense a darkness in your soul.",
    "shopkeeper": true,
    "shop": {
      "weapons": [
        "Wooden Staff",
        "Bronze Mace"
      ],
      "scrolls": [
        "Scroll of Basic Prayer",
        "Scroll of Aura of Protection",
        "Scroll of Chain Lightning",
        "Scroll of Divine Shield",
        "Scroll of Godspeed",
        "Scroll of Heavenly Light"
      ]
    }
  },
  {
    "advanced": {},
    "id": "alchemist-claristra",
    "name": "Alchemist Claristra",
    "area": "Gandersville",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/ethereal-soulreaper-female.png",
    "trainerRealms": [
      "Ethereal"
    ],
    "shopkeeper": true,
    "shop": {
      "weapons": [
        "Wooden Staff",
        "Willow Branch"
      ],
      "equipment": [
        "Spidersilk Cowl",
        "Spidersilk Gloves",
        "Spidersilk Pants",
        "Spidersilk Shirt",
        "Spidersilk Slippers",
        "Spidersilk Shoulderpads"
      ],
      "consumables": [
        {
          "name": "Agility Potion",
          "quantity": 5
        },
        {
          "name": "Clarity Potion",
          "quantity": 5
        },
        {
          "name": "Energy Potion",
          "quantity": 5
        },
        {
          "name": "Healing Potion",
          "quantity": 5
        },
        {
          "name": "Soothing Potion",
          "quantity": 5
        },
        {
          "name": "Potion of Resist Magic",
          "quantity": 5
        }
      ],
      "scrolls": [
        "Scroll of Banish",
        "Scroll of Chain Lightning",
        "Scroll of Clarity",
        "Scroll of Fireball",
        "Scroll of Fireblast",
        "Scroll of Ice Bolt",
        "Scroll of Ice Storm",
        "Scroll of Frozen Touch",
        "Scroll of Invisibility",
        "Scroll of Magic Missile",
        "Scroll of Pacify",
        "Scroll of Summon Portal",
        "Scroll of Arcane Shield",
        "Scroll of Etherwind Aura"
      ]
    }
  },
  {
    "advanced": {},
    "id": "heretic-oswaldo",
    "name": "Heretic Oswaldo",
    "area": "The Ganderswood",
    "alignment": "Neutral Evil",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/mordred.png",
    "refusalText": "I suppose you're here to give me a lecture about \"the Light\" or something?",
    "shopkeeper": true,
    "shop": {
      "weapons": [
        "Willow Branch",
        "Bone Wand",
        "Wooden Staff",
        "Bronze Dagger",
        "Wooden Knife"
      ],
      "equipment": [
        "Leather Breastplate",
        "Spidersilk Cowl",
        "Spidersilk Gloves",
        "Spidersilk Pants",
        "Spidersilk Shirt",
        "Spidersilk Slippers"
      ],
      "bags": [
        "Small Bag"
      ],
      "consumables": [
        {
          "name": "Agility Potion",
          "quantity": 5
        },
        {
          "name": "Clarity Potion",
          "quantity": 5
        },
        {
          "name": "Energy Potion",
          "quantity": 5
        },
        {
          "name": "Healing Potion",
          "quantity": 5
        },
        {
          "name": "Soothing Potion",
          "quantity": 5
        },
        {
          "name": "Potion of Resist Magic",
          "quantity": 1
        }
      ],
      "scrolls": [
        "Scroll of Banish",
        "Scroll of Curse of Disdain",
        "Scroll of Fireball",
        "Scroll of Fireblast",
        "Scroll of Lifesteal",
        "Scroll of Poison",
        "Scroll of Raise Skeleton",
        "Scroll of Ring of Fire",
        "Scroll of Arcane Shield",
        "Scroll of Chain Lightning",
        "Scroll of Clarity",
        "Scroll of Dark Circle",
        "Scroll of Invisibility",
        "Scroll of Rage",
        "Scroll of Summon Portal"
      ]
    }
  },
  {
    "advanced": {},
    "id": "high-priestess-sierra",
    "name": "High Priestess Sierra",
    "area": "Gandersville",
    "alignment": "Neutral Good",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/priestess.png",
    "trainerRealms": [
      "Celestial"
    ],
    "trainerMaxSpellLevel": 10,
    "trainer": true,
    "startsQuest": true,
    "questId": "introduction-to-celestial-mercy",
    "questMinimumLevelText": "Come back when your {realm} Realm LVL is {realmLevel}. The first lessons of Celestial discipline require a steadier hand.",
    "dialogueContexts": {
      "questMercyOffer": "You have touched the Celestial Realm deeply enough to begin proper instruction. Celestial magic preserves life before it judges evil. Restore HP with Basic Prayer or Heavenly Light, then return to me.",
      "questMercyActive": "Restore HP with Basic Prayer or Heavenly Light, then return to me.",
      "questMercyReady": "You have restored life by prayer. That is where Celestial discipline begins: not with wrath, but with the refusal to let hope die quietly.",
      "questRoadOffer": "Celestial magic does not only mend the fallen. It guides the living. Cast Godspeed on yourself or an ally, and learn how blessing can become motion.",
      "questRoadActive": "Cast Godspeed on yourself or an ally, then return to me.",
      "questRoadReady": "Good. Speed is a mercy too, when it carries aid where it is needed. Let your blessings move with purpose.",
      "questShieldOffer": "Now you must learn protection. A faithful hand does not merely heal after the wound; it sometimes prevents the wound entirely. Use Divine Shield and let it absorb damage, then return to me.",
      "questShieldActive": "Cast Divine Shield and let it absorb real harm. When it has turned aside a blow, return to me.",
      "trainerQuestReady": "You have felt the shield answer harm with mercy. Remember that protection is not passivity; it is the courage to preserve what darkness would break.",
      "trainerQuestAfterComplete": "Mercy, guidance, and protection: these are the first pillars of Celestial practice. Train them well, and the light will answer."
    }
  },
  {
    "advanced": {},
    "id": "heretic-slayleigh",
    "name": "Heretic Slayleigh",
    "area": "The Ganderswood",
    "alignment": "Neutral Evil",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/infernal-soulreaper-female.png",
    "trainerRealms": [
      "Infernal",
      "Umbral"
    ],
    "trainerMaxSpellLevel": 10,
    "refusalText": "You think you're better than us warlocks, don't you? Get out of my face.",
    "dialogueContexts": {
      "questOffer": "I'm looking for bones. Which is... a strange thing to say out loud, isn't it? Not strange, actually. Normal. People need bones. For crafts. Research. Very normal errands. Bring me a stack of 20 Bones and I'll pay you for them.",
      "questActive": "Still looking for that stack of 20 bones. For ordinary bone-related purposes. Perfectly mundane.",
      "questComplete": "Ah, excellent. A proper stack of bones. Here, take your payment, and let's both pretend this was a normal transaction.",
      "questFollowupOffer": "Practitioners of the Umbral Arts often need Bones to cast certain spells. For example, a spell called Bone Ritual. Here, take the scroll. Use Bone Ritual once and return to me.",
      "questFollowupActive": "Use Bone Ritual once, then return. Bring bones, obviously. The spell is not named metaphorically.",
      "questAfterComplete": "Remember: every bone has a memory, and every memory has a use."
    },
    "trainer": true,
    "startsQuest": true,
    "questId": "bone-collector"
  },
  {
    "advanced": {},
    "id": "heretic-nast",
    "name": "Heretic Nast",
    "area": "Fenhold",
    "alignment": "Evil",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/infernal-soulreaper-male.png",
    "trainerRealms": [
      "Ethereal",
      "Infernal"
    ],
    "trainerMaxSpellLevel": 20,
    "refusalText": "Who let scum like you into Fenhold?",
    "trainer": true,
    "shopkeeper": true,
    "shop": {
      "scrolls": [
        "Scroll of Arcane Shield",
        "Scroll of Banish",
        "Scroll of Clarity",
        "Scroll of Fireball",
        "Scroll of Fireblast",
        "Scroll of Ice Bolt",
        "Scroll of Ice Storm",
        "Scroll of Frozen Touch",
        "Scroll of Invisibility",
        "Scroll of Magic Missile",
        "Scroll of Pacify",
        "Scroll of Ring of Fire",
        "Scroll of Summon Portal",
        "Scroll of Dark Circle",
        "Scroll of Etherwind Aura",
        "Scroll of Summon Fire Elemental",
        "Scroll of Summon Water Elemental",
        "Scroll of Bloodthirsty Aura",
        "Scroll of Burning Skin"
      ]
    }
  },
  {
    "advanced": {},
    "id": "necromancer-morgane",
    "name": "Necromancer Morgane",
    "area": "Fenhold",
    "alignment": "Evil",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/shadow-soulreaper-female.png",
    "trainerRealms": [
      "Umbral"
    ],
    "trainerMaxSpellLevel": 20,
    "refusalText": "May you rot forever in the dirt.",
    "trainer": true,
    "shopkeeper": true,
    "shop": {
      "scrolls": [
        "Scroll of Curse of Disdain",
        "Scroll of Invisibility",
        "Scroll of Lifesteal",
        "Scroll of Pestilent Aura",
        "Scroll of Raise Skeleton",
        "Scroll of Bone Ritual",
        "Scroll of Summon Shade",
        "Scroll of Virulent Plague",
        "Scroll of Mortify"
      ]
    },
    "startsQuest": true,
    "questId": "morganes-reagents"
  },
  {
    "advanced": {},
    "id": "magister-ndora",
    "name": "Magister Ndora",
    "area": "Grimswood Pass",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/gvada-v2.png",
    "trainerRealms": [
      "Ethereal",
      "Infernal"
    ],
    "trainerMaxSpellLevel": 20,
    "refusalText": "Go away.",
    "trainer": true,
    "shopkeeper": true,
    "shop": {
      "scrolls": [
        "Scroll of Arcane Shield",
        "Scroll of Banish",
        "Scroll of Chain Lightning",
        "Scroll of Clarity",
        "Scroll of Fireball",
        "Scroll of Fireblast",
        "Scroll of Ice Bolt",
        "Scroll of Ice Storm",
        "Scroll of Frozen Touch",
        "Scroll of Invisibility",
        "Scroll of Magic Missile",
        "Scroll of Pacify",
        "Scroll of Summon Portal",
        "Scroll of Etherwind Aura",
        "Scroll of Summon Water Elemental",
        "Scroll of Summon Earth Elemental",
        "Scroll of Hypnotize"
      ]
    }
  },
  {
    "advanced": {},
    "id": "magister-maimon",
    "name": "Magister Maimon",
    "area": "Gandersville",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/ethereal-soulreaper-male.png",
    "trainerRealms": [
      "Ethereal"
    ],
    "trainerMaxSpellLevel": 10,
    "trainer": true
  },
  {
    "advanced": {},
    "id": "juan-tabo",
    "name": "Juan Tabo",
    "area": "Gandersville",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/villager-flamboyant.png",
    "trainerRealms": [
      "Sylvan"
    ],
    "trainerMaxSpellLevel": 10,
    "dialogueContexts": {
      "questOffer": "Within these woods there walks a milk-white stag, / A myth made flesh beneath the Ganders leaves. / I touch the Sylvan art with novice hands, / And yearn to learn what secret grace it bears. / If thou canst tame the creature, bring it here; / This hall shall witness wonder, and reward.",
      "questActive": "Seek yet the glades where moonlit branches lean; / Then tame the stag and lead it to this hall.",
      "questComplete": "O blessed sight, pale monarch of the green! / My Sylvan heart shall ponder what thou art.",
      "questAfterComplete": "The white stag's song still stirs the leaves for me; / I thank thee, friend, for wonder brought to hall."
    },
    "wandering": true,
    "startsQuest": true,
    "questId": "the-white-stag"
  },
  {
    "advanced": {},
    "id": "barbarianess-skjoldma",
    "name": "Barbarianess Skjoldma",
    "area": "Gandersville",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/barbarian-female.png",
    "trainerRealms": [
      "Mortal"
    ],
    "trainerMaxSpellLevel": 10,
    "dialogueContexts": {
      "trainerQuestOffer": "Weapon mastery is not one lesson, but many. Bows reward clean shots, axes reward heavy hands, maces reward stunning blows, dual wielding rewards off-hand strikes, and daggers reward precision. FOCUS is your chance to land a Critical Hit. Take this Scroll of Dagger Mastery, learn it, equip a stabbing weapon, and return after you have landed a Critical Hit.",
      "trainerQuestActive": "Use a stabbing weapon. A dagger, spear, anything with a proper thrust. Land a Critical Hit with it, then come back and tell me what you learned.",
      "trainerQuestReady": "Good. You felt it, then. FOCUS is not luck; it is the eye finding a weak place. With Dagger Mastery, a stabbing weapon makes that eye keener, and a critical hit feeds your Mortal training.",
      "questFollowupOffer": "Now we speak of shields. BLOCK is your chance to turn a hit aside before it bites. A proper shield makes that chance better, and Shield Mastery sharpens it further. Equip a shield, block an attack with it, then return to me.",
      "questFollowupActive": "Equip a shield, let an enemy take a swing, and come back after you have blocked the blow.",
      "trainerQuestAfterComplete": "Weapons choose their lessons. Bows teach patience, axes teach force, maces teach interruption, daggers teach precision, and shields teach survival."
    },
    "faction": "barbarian",
    "trainer": true,
    "shopkeeper": true,
    "shop": {
      "scrolls": [
        "Scroll of Rage",
        "Scroll of Mace Mastery",
        "Scroll of Axe Mastery",
        "Scroll of Dual Wield",
        "Scroll of War Drums",
        "Scroll of Dagger Mastery",
        "Scroll of Shield Bash",
        "Scroll of Battle Cry",
        "Scroll of Shield Mastery"
      ]
    }
  },
  {
    "advanced": {},
    "id": "tailor-antonia",
    "name": "Tailor Antonia",
    "area": "Gandersville",
    "alignment": "Neutral Good",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/villager-female.png",
    "refusalText": "I don't do business with scoundrels.",
    "shopkeeper": true,
    "shop": {
      "equipment": [
        "Spidersilk Cowl",
        "Spidersilk Gloves",
        "Spidersilk Pants",
        "Spidersilk Shirt",
        "Spidersilk Shoulderpads",
        "Spidersilk Slippers",
        "Black Linen Shirt",
        "Red Linen Shirt",
        "White Linen Shirt",
        "Denim Shirt",
        "Denim Pants",
        "Black Linen Pants",
        "White Linen Pants",
        "Linen Pants",
        "Linen Shirt",
        "Straw Hat"
      ],
      "bags": [
        "Small Bag"
      ]
    }
  },
  {
    "advanced": {},
    "id": "tailor-fullbush",
    "name": "Tailor Fullbush",
    "area": "Harmush Lagh",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/dwarf-villager-female-1.png",
    "refusalText": "I don't do business with scoundrels.",
    "faction": "whiterock-dwarves",
    "shopkeeper": true,
    "shop": {
      "equipment": [
        "Spidersilk Cowl",
        "Spidersilk Gloves",
        "Spidersilk Pants",
        "Spidersilk Shirt",
        "Spidersilk Shoulderpads",
        "Spidersilk Slippers",
        "Black Linen Shirt",
        "Red Linen Shirt",
        "White Linen Shirt",
        "Denim Shirt",
        "Denim Pants",
        "Black Linen Pants",
        "White Linen Pants",
        "Linen Pants",
        "Linen Shirt",
        "Straw Hat",
        "Leather Belt"
      ],
      "bags": [
        "Small Bag"
      ]
    }
  },
  {
    "advanced": {},
    "id": "dark-priest-zayn",
    "name": "Dark Priest Zayn",
    "area": "Ganderswood Fen",
    "alignment": "Evil",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/dark-priest.png",
    "trainerRealms": [
      "Celestial"
    ],
    "trainerMaxSpellLevel": 20,
    "refusalText": "Light should only be used in service of the Darkness.",
    "trainer": true,
    "shopkeeper": true,
    "shop": {
      "scrolls": [
        "Scroll of Arcane Shield",
        "Scroll of Aura of Protection",
        "Scroll of Basic Prayer",
        "Scroll of Chain Lightning",
        "Scroll of Divine Shield",
        "Scroll of Godspeed",
        "Scroll of Heavenly Light",
        "Scroll of Grace from Above"
      ]
    }
  },
  {
    "advanced": {},
    "id": "master-of-arms-lenn",
    "name": "Master of Arms Lenn",
    "area": "Fenhold",
    "alignment": "Evil",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/dark-guard.png",
    "trainerRealms": [
      "Mortal"
    ],
    "trainerMaxSpellLevel": 20,
    "refusalText": "You're lucky I don't have my weapon on me, worm.",
    "trainer": true,
    "shopkeeper": true,
    "shop": {
      "weapons": [
        "Bronze Battleaxe",
        "Bronze Dagger",
        "Bronze Longsword",
        "Bronze Mace",
        "Bronze Shortsword"
      ],
      "equipment": [
        "Bronze Chainmail Boots",
        "Bronze Chainmail Bracer",
        "Bronze Chainmail Coif",
        "Bronze Chainmail Gloves",
        "Bronze Chainmail Pants",
        "Bronze Chainmail Pauldrons",
        "Bronze Chainmail Vest",
        "Bronze Plate Bracer",
        "Bronze Plate Cuirass",
        "Bronze Plate Gauntlets",
        "Bronze Plate Greaves",
        "Bronze Plate Pauldrons",
        "Bronze Plate Sabatons",
        "Bronze Spangenhelm",
        "Bronze Chainmail Pauldrons",
        "Iron Plate Bracer",
        "Iron Plate Cuirass",
        "Iron Plate Gauntlets",
        "Iron Plate Greaves",
        "Iron Plate Sabatons",
        "Iron Sabatons",
        "Iron Shield",
        "Bronze Spangenhelm",
        "Wooden Shield",
        "Iron Plate Pauldrons",
        "Iron Plate Spangenhelm",
        "Bronze Shield"
      ],
      "scrolls": [
        "Scroll of Rage",
        "Scroll of Mace Mastery",
        "Scroll of Axe Mastery",
        "Scroll of Dual Wield",
        "Scroll of Archery Mastery",
        "Scroll of War Drums",
        "Scroll of Poison",
        "Scroll of Dagger Mastery"
      ]
    }
  },
  {
    "advanced": {},
    "id": "banker-argento",
    "name": "Banker Argento",
    "area": "Gandersville",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/mayor.png",
    "banker": true
  },
  {
    "advanced": {},
    "id": "banker-smeraldo",
    "name": "Banker Smeraldo",
    "area": "Fenhold",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/mayor.png",
    "banker": true
  },
  {
    "advanced": {},
    "id": "banker-goldbeard",
    "name": "Banker Goldbeard",
    "area": "Harmush Lagh",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/dwarf-nobleman.png",
    "faction": "whiterock-dwarves",
    "banker": true
  },
  {
    "advanced": {},
    "id": "naturalist-walden",
    "name": "Naturalist Walden",
    "area": "The Ganderswood",
    "alignment": "Neutral Good",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/child-male.png",
    "trainerRealms": [
      "Sylvan"
    ],
    "trainerMaxSpellLevel": 10,
    "refusalText": "You really ought to treat the world's creatures nicer...",
    "dialogueContexts": {
      "questOffer": "Imps are wreaking havoc on the ecosystem. Their Infernal magic is especially cruel to Sylvan creatures, who take extra damage from it. Get rid of 4 Imps, then return to me and tell me the woods can breathe easier.",
      "questActive": "The Imps are still loose. You have dealt with {count}/4 of them. Keep them away from the old growth.",
      "questComplete": "Four Imps gone. Good. The forest is resilient, but not invulnerable, especially when Infernal fire turns on Sylvan life. Take this as thanks.",
      "questAfterComplete": "The woods breathe easier with fewer Imps setting every root and burrow aflame. Keep watch for smoke.",
      "questGlowOffer": "The woods breathe easier with fewer Imps setting every root and burrow aflame. Now learn to reveal what threatens them. Take Faerie Fire and mark 3 hostile mobs.",
      "questGlowActive": "Mark 3 hostile mobs with Faerie Fire, then return.",
      "questGlowReady": "You marked them well. Faerie Fire does not merely shine; it tells the forest where weakness hides.",
      "questLeashOffer": "Now learn the gentler bond. Take Tame Beast, befriend a Beast, and return while it still follows your call.",
      "questLeashActive": "Tame any Beast and return while it is still with you.",
      "questLeashReady": "A beast walked beside you by choice of magic and instinct. Remember the difference between companionship and command.",
      "questThornsOffer": "Mercy does not mean softness. Take Thorn Shield. Let an enemy strike you, and let the living world answer through you.",
      "questThornsActive": "Let Thorn Shield wound an enemy that strikes you. Do not seek harm, but do not waste it either.",
      "questThornsReady": "You felt the lesson. The forest does not need to chase every axe; sometimes the wound comes to the thorn.",
      "questDustOffer": "Some threats do not stand fully in the world. Faerie Dust can pull the strange and hidden back toward leaf and soil. Use it on an incorporeal enemy.",
      "questDustActive": "Use Faerie Dust on an incorporeal enemy, then return to me.",
      "questDustReady": "Good. Faerie Dust reminds even the half-present that the living world has claims on them.",
      "questRootsOffer": "One last beginning remains. The forest is not only a place; it is an ally. Take Summon Treant, call one forth, and let it strike an enemy.",
      "questRootsActive": "Summon a Treant and let it strike an enemy. The forest should not be ornamental.",
      "questRootsReady": "You heard it answer, then. Root, bark, and old patience can walk when the woods decide movement is needed."
    },
    "trainer": true,
    "wandering": true,
    "shopkeeper": true,
    "shop": {
      "scrolls": [
        "Scroll of Faerie Dust",
        "Scroll of Faerie Fire",
        "Scroll of Spirit of Avia",
        "Scroll of Tame Beast",
        "Scroll of Tangle Vine",
        "Scroll of Thorn Shield",
        "Scroll of Chlorophyll",
        "Scroll of Briar Lash",
        "Scroll of Wooden Skin"
      ]
    }
  },
  {
    "advanced": {},
    "id": "lord-yantos",
    "name": "Lord Yantos",
    "area": "Gandersville",
    "alignment": "Neutral Good",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/baron.png",
    "startsQuest": true,
    "questId": "joining-the-gandersguard",
    "dialogue": "It's a lovely day in Gandersville, wouldn't you say?",
    "refusalText": "Gandersville is a peaceful hamlet. You should leave and take all your troublemaking with you."
  },
  {
    "advanced": {},
    "id": "lord-rauf",
    "name": "Lord Rauf",
    "area": "Fenhold",
    "alignment": "Evil",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/dark-king.png",
    "startsQuest": true,
    "questId": "joining-the-fenguard",
    "questChain": [
      "joining-the-fenguard",
      "gandersville-raid"
    ],
    "dialogue": "Lord Yantos's days are numbered. Fenhold's power over the Ganderswood shall not be threatened.",
    "refusalText": "Run back to Gandersville, dog, and tell your master Yantos that the Fenguard are ready for him."
  },
  {
    "advanced": {},
    "id": "paladin-curli",
    "name": "Paladin Curli",
    "area": "Harmush Lagh",
    "alignment": "Neutral Good",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/dwarf-paladin-female.png",
    "trainerRealms": [
      "Mortal",
      "Celestial"
    ],
    "trainerMaxSpellLevel": 10,
    "refusalText": "A Dwarf who doesn't follow Orox the Lightbringer is no Dwarves at all.",
    "faction": "whiterock-dwarves",
    "trainer": true,
    "shopkeeper": true,
    "shop": {
      "scrolls": [
        "Scroll of Aura of Protection",
        "Scroll of Basic Prayer",
        "Scroll of Chain Lightning",
        "Scroll of Divine Shield",
        "Scroll of Godspeed",
        "Scroll of Grace from Above",
        "Scroll of Heavenly Light",
        "Scroll of Mace Mastery",
        "Scroll of Pacify",
        "Scroll of Shield Bash",
        "Scroll of Shield Mastery",
        "Scroll of Spirit of Avia",
        "Scroll of Axe Mastery",
        "Scroll of Battle Cry",
        "Scroll of Dagger Mastery",
        "Scroll of Dual Wield",
        "Scroll of Rage",
        "Scroll of War Drums"
      ]
    }
  },
  {
    "advanced": {},
    "id": "wizard-greylock",
    "name": "Wizard Greylock",
    "area": "The Ganderswood",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/dwarf-mage-male.png",
    "trainerRealms": [
      "Ethereal",
      "Infernal"
    ],
    "faction": "whiterock-dwarves",
    "trainer": true,
    "shopkeeper": true,
    "shop": {
      "consumables": [
        {
          "name": "Clarity Potion",
          "quantity": 5
        },
        {
          "name": "Agility Potion",
          "quantity": 5
        },
        {
          "name": "Energy Potion",
          "quantity": 5
        },
        {
          "name": "Greater Healing Potion",
          "quantity": 5
        },
        {
          "name": "Healing Potion",
          "quantity": 5
        },
        {
          "name": "Potion of Resist Magic",
          "quantity": 5
        },
        {
          "name": "Soothing Potion",
          "quantity": 5
        }
      ],
      "scrolls": [
        "Scroll of Arcane Shield",
        "Scroll of Banish",
        "Scroll of Chain Lightning",
        "Scroll of Clarity",
        "Scroll of Etherwind Aura",
        "Scroll of Fireball",
        "Scroll of Fireblast",
        "Scroll of Hypnotize",
        "Scroll of Ice Bolt",
        "Scroll of Ice Storm",
        "Scroll of Frozen Touch",
        "Scroll of Invisibility",
        "Scroll of Magic Missile",
        "Scroll of Pacify",
        "Scroll of Ring of Fire",
        "Scroll of Summon Earth Elemental",
        "Scroll of Summon Fire Elemental",
        "Scroll of Summon Portal",
        "Scroll of Summon Water Elemental"
      ]
    }
  },
  {
    "advanced": {},
    "id": "pariah-blackbraid",
    "name": "Pariah Blackbraid",
    "area": "Harmush Lagh",
    "alignment": "Neutral Evil",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/dwarf-necromancer-male.png",
    "trainerRealms": [
      "Infernal",
      "Umbral"
    ],
    "trainerMaxSpellLevel": 10,
    "trainer": true,
    "shopkeeper": true,
    "shop": {
      "consumables": [
        {
          "name": "Clarity Potion",
          "quantity": 5
        },
        {
          "name": "Agility Potion",
          "quantity": 5
        },
        {
          "name": "Energy Potion",
          "quantity": 5
        },
        {
          "name": "Greater Healing Potion",
          "quantity": 5
        },
        {
          "name": "Healing Potion",
          "quantity": 5
        },
        {
          "name": "Potion of Resist Magic",
          "quantity": 5
        },
        {
          "name": "Soothing Potion",
          "quantity": 5
        }
      ],
      "scrolls": [
        "Scroll of Magic Missile",
        "Scroll of Banish",
        "Scroll of Bloodthirsty Aura",
        "Scroll of Bone Ritual",
        "Scroll of Briar Lash",
        "Scroll of Curse of Disdain",
        "Scroll of Dark Circle",
        "Scroll of Hypnotize",
        "Scroll of Invisibility",
        "Scroll of Lifesteal",
        "Scroll of Mortify",
        "Scroll of Pestilent Aura",
        "Scroll of Poison",
        "Scroll of Raise Skeleton",
        "Scroll of Summon Portal",
        "Scroll of Summon Shade",
        "Scroll of Unholy Dominion",
        "Scroll of Virulent Plague"
      ]
    }
  },
  {
    "advanced": {},
    "id": "apprentice-chinstubble",
    "name": "Apprentice Chinstubble",
    "area": "Harmush Lagh",
    "alignment": "Neutral Evil",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/dwarf-child.png"
  },
  {
    "advanced": {},
    "id": "blacksmith-rockstone",
    "name": "Blacksmith Rockstone",
    "area": "Harmush Lagh",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/dwarf-villager-male-2.png",
    "faction": "whiterock-dwarves",
    "shopkeeper": true,
    "shop": {
      "weapons": [
        "Bronze Battleaxe",
        "Bronze Dagger",
        "Bronze Longsword",
        "Bronze Mace",
        "Bronze Shortsword",
        "Bronze Spear",
        "Longbow",
        "Shortbow"
      ],
      "equipment": [
        "Bronze Chainmail Boots",
        "Bronze Chainmail Bracer",
        "Bronze Chainmail Coif",
        "Bronze Chainmail Gloves",
        "Bronze Chainmail Pants",
        "Bronze Chainmail Pauldrons",
        "Bronze Chainmail Vest",
        "Bronze Plate Bracer",
        "Bronze Plate Cuirass",
        "Bronze Plate Gauntlets",
        "Bronze Plate Greaves",
        "Bronze Plate Pauldrons",
        "Bronze Plate Sabatons",
        "Bronze Spangenhelm",
        "Bronze Shield",
        "Wooden Shield",
        "Leather Belt",
        "Leather Bracer",
        "Leather Breastplate",
        "Leather Gloves",
        "Leather Hood",
        "Leather Pants",
        "Leather Pauldrons"
      ],
      "consumables": [
        {
          "name": "Bronze Arrow",
          "quantity": 99
        },
        {
          "name": "Bronze Arrow",
          "quantity": 99
        },
        {
          "name": "Bronze Arrow",
          "quantity": 99
        }
      ]
    }
  },
  {
    "advanced": {},
    "id": "thane-whiterock",
    "name": "Thane Whiterock",
    "area": "Harmush Lagh",
    "alignment": "Neutral Good",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/dwarf-thane.png",
    "dialogue": "You dare interrupt your thane?",
    "refusalText": "You dare interrupt your thane?",
    "factionNotAllyText": "You dare interrupt your thane?",
    "factionEnemyText": "My thaneguards will have your head.",
    "faction": "whiterock-dwarves",
    "mustBeFactionAlly": true
  },
  {
    "advanced": {},
    "id": "thanes-hand-ironsteel",
    "name": "Thane's Hand Ironsteel",
    "area": "Harmush Lagh",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/dwarf-paladin.png",
    "trainerMaxSpellLevel": 10,
    "faction": "whiterock-dwarves"
  },
  {
    "advanced": {},
    "id": "mistress-of-whispers-firecrotch",
    "name": "Mistress of Whispers Firecrotch",
    "area": "Harmush Lagh",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/dwarf-warlock-female.png",
    "faction": "whiterock-dwarves",
    "mustBeFactionAlly": true
  },
  {
    "advanced": {},
    "id": "ambassador-dichard",
    "name": "Ambassador Dichard",
    "area": "Harmush Lagh",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/mayor.png",
    "faction": "gandersguard"
  },
  {
    "advanced": {},
    "id": "sybil-ladybeard",
    "name": "Sybil Ladybeard",
    "area": "Harmush Lagh",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/dwarf-mage-female.png",
    "startsQuest": true,
    "questId": "sybil-starter-magic",
    "faction": "whiterock-dwarves"
  },
  {
    "advanced": {},
    "id": "herbalist-hollyhock",
    "name": "Herbalist Hollyhock",
    "area": "Harmush Lagh",
    "alignment": "Neutral Good",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/dwarf-villager-female-1.png",
    "trainerRealms": [
      "Sylvan"
    ],
    "trainerMaxSpellLevel": 10,
    "trainer": true,
    "startsQuest": true,
    "questChain": [
      "hollyhocks-mossy-errand",
      "hollyhocks-lake-offering",
      "hollyhocks-green-touch"
    ],
    "dialogueContexts": {
      "questOffer": "Aye, I can feel a shy bit of green waking in you. If you want my teaching, start with a patient errand: find me a Moss-Covered Stone out in Harmush Lagh. The old stones here drink root-whispers better than any bottle I own, but they do not sit politely beside the road.",
      "questActive": "Still hunting the stone, are you? Keep your eyes low and your boots steady. Moss loves the quiet places, away from shouting halls and hot forge smoke.",
      "questReady": "There it is. Do not hand it over. Keep it close. A stone that has listened this long should hear what the lake has to say next.",
      "questLakeOffer": "Now take that Moss-Covered Stone to the lake and drop it in. Do not toss it like rubbish. Offer it. If something answers with teeth, keep your wits and show me you can survive the bargain.",
      "questLakeActive": "The lake has not had your offering yet. Stand near the water and drop the Moss-Covered Stone in. If the water spits trouble back, put it down cleanly.",
      "questLakeReady": "Good. The lake answered, and you answered louder. That is how a dwarf learns Sylvan work: not by pretty words, but by standing firm when the deep places blink back.",
      "questTellursaOffer": "One more lesson, and this one needs a gentler hand. A rare Tellursa wanders the Harkhar Highlands. Find it, do not butcher it, and cast Chlorophyll on it. I want to know you can mend a living thing when the mountains are trying to harden your heart.",
      "questTellursaActive": "Find the Tellursa in Harkhar Highlands and lay Chlorophyll on it. If it bolts, let it breathe and try again. Sylvan magic is not a hammer, no matter what our kin say.",
      "questTellursaReady": "Aye, that will do. You have listened to stone, water, tooth, and beast. Take this trinket. It is not fancy, but it remembers the lake better than most people do.",
      "questAfterComplete": "Keep your roots deep and your axe sharper than your pride. Harmush Lagh has more to teach, if you keep listening."
    },
    "shopkeeper": true,
    "shop": {
      "scrolls": [
        "Scroll of Briar Lash",
        "Scroll of Chlorophyll",
        "Scroll of Faerie Circle",
        "Scroll of Faerie Dust",
        "Scroll of Faerie Fire",
        "Scroll of Poison",
        "Scroll of Sacred Grove",
        "Scroll of Spirit of Avia",
        "Scroll of Summon Treant",
        "Scroll of Tame Beast",
        "Scroll of Tangle Vine",
        "Scroll of Thorn Shield",
        "Scroll of Wooden Skin"
      ],
      "misc": [
        {
          "name": "Houndstongue",
          "quantity": 5
        },
        {
          "name": "Purple Mushroom",
          "quantity": 5
        },
        {
          "name": "Bloodroot",
          "quantity": 5
        },
        {
          "name": "Blue Lotus",
          "quantity": 5
        },
        {
          "name": "Mandrake Root",
          "quantity": 5
        },
        {
          "name": "Crimson Nettle",
          "quantity": 5
        },
        {
          "name": "Nightshade",
          "quantity": 5
        },
        {
          "name": "Silverleaf",
          "quantity": 5
        }
      ]
    }
  },
  {
    "advanced": {},
    "id": "fenrir",
    "name": "Fenrir",
    "area": "Harmush Lagh",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/barbarian-male.png",
    "trainerRealms": [
      "Mortal"
    ],
    "trainerMaxSpellLevel": 10,
    "faction": "barbarian",
    "trainer": true
  },
  {
    "advanced": {},
    "id": "sigrid",
    "name": "Sigrid",
    "area": "Harmush Lagh",
    "alignment": "Neutral",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/barbarian-female.png",
    "trainerRealms": [
      "Mortal"
    ],
    "factionNotAllyText": "I only do business with those who prove themselves allies to the Barbarians.",
    "faction": "barbarian",
    "mustBeFactionAlly": true,
    "shopkeeper": true,
    "shop": {
      "weapons": [
        "Bronze Longsword",
        "Bronze Mace",
        "Bronze Shortsword",
        "Bronze Spear",
        "Longbow",
        "Shortbow",
        "Willow Branch",
        "Wooden Staff"
      ],
      "equipment": [
        "Leather Breastplate",
        "Leather Boots",
        "Leather Bracer",
        "Leather Gloves",
        "Leather Hood",
        "Leather Pants",
        "Leather Pauldrons",
        "Bronze Shield",
        "Wooden Shield"
      ],
      "bags": [
        "Small Bag"
      ],
      "consumables": [
        {
          "name": "Agility Potion",
          "quantity": 3
        },
        {
          "name": "Clarity Potion",
          "quantity": 3
        },
        {
          "name": "Energy Potion",
          "quantity": 3
        },
        {
          "name": "Focus Potion",
          "quantity": 3
        },
        {
          "name": "Greater Healing Potion",
          "quantity": 3
        },
        {
          "name": "Healing Potion",
          "quantity": 3
        },
        {
          "name": "Potion of Resist Magic",
          "quantity": 3
        },
        {
          "name": "Soothing Potion",
          "quantity": 3
        },
        {
          "name": "Strength Potion",
          "quantity": 3
        },
        {
          "name": "Bronze Arrow",
          "quantity": 99
        },
        {
          "name": "Bronze Arrow",
          "quantity": 99
        },
        {
          "name": "Bronze Arrow",
          "quantity": 99
        }
      ]
    }
  },
  {
    "advanced": {},
    "id": "snuffkie",
    "name": "Snuffkie",
    "area": "Harmush Lagh",
    "alignment": "Neutral Good",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/badgeri-villager-female.png",
    "faction": "badgeri",
    "mustBeFactionAlly": true
  },
  {
    "advanced": {},
    "id": "otachi",
    "name": "Otachi",
    "area": "Harmush Lagh",
    "alignment": "Neutral Good",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/badgeri-villager-male.png",
    "faction": "badgeri",
    "mustBeFactionAlly": true
  },
  {
    "advanced": {},
    "id": "chief-snautch",
    "name": "Chief Snautch",
    "area": "Harmush Lagh",
    "alignment": "Neutral Good",
    "radius": 16,
    "sprite": "./assets/sprites/npcs/badgeri-chief.png",
    "faction": "badgeri",
    "mustBeFactionAlly": true
  }
];

const devSpellConfigs = {
  "Magic Missile": {
    "name": "Magic Missile",
    "realm": "Ethereal",
    "lvl": 1,
    "cooldown": 4,
    "range": 10,
    "text": "Fires a projectile at the nearest enemy, dealing 7 Ethereal damage.",
    "manualTarget": true,
    "autocast": true,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/magic-missile.png",
    "formulas": {
      "damage": {
        "type": "damage",
        "base": 6,
        "perLevel": 1,
        "stat": "INT",
        "statScale": 1
      }
    },
    "soundEffect": "./assets/audio/generic-shadow-offensive-spell.wav"
  },
  "Rage": {
    "name": "Rage",
    "realm": "Mortal",
    "lvl": 1,
    "cooldown": 16,
    "range": 0,
    "text": "Increases ATK, DEF, and AGL by {attackBonus} for 8 seconds",
    "manualTarget": false,
    "autocast": true,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/rage.png",
    "duration": 8,
    "formulas": {
      "attackBonus": {
        "type": "stat",
        "base": 4,
        "perLevel": 1
      },
      "agilityBonus": {
        "type": "stat",
        "base": 4,
        "perLevel": 1
      }
    },
    "soundEffect": "./assets/audio/lightning.wav"
  },
  "Archery Mastery": {
    "name": "Archery Mastery",
    "realm": "Mortal",
    "lvl": 1,
    "cooldown": 0,
    "range": 0,
    "text": "Decreases Delay of equipped bows by 5 per LVL.",
    "manualTarget": false,
    "autocast": false,
    "passive": true,
    "aura": false,
    "icon": "./assets/spells/archery-mastery.png",
    "formulas": {
      "bowDelayReduction": {
        "type": "stat",
        "base": 0,
        "perLevel": 5
      }
    },
    "soundEffect": ""
  },
  "Axe Mastery": {
    "name": "Axe Mastery",
    "realm": "Mortal",
    "lvl": 1,
    "cooldown": 0,
    "range": 0,
    "text": "Decreases Delay of wielded axes by 5 per LVL.",
    "manualTarget": false,
    "autocast": false,
    "passive": true,
    "aura": false,
    "icon": "./assets/spells/axe-mastery.png",
    "formulas": {
      "axeDelayReduction": {
        "type": "stat",
        "base": 0,
        "perLevel": 5
      }
    },
    "soundEffect": ""
  },
  "Mace Mastery": {
    "name": "Mace Mastery",
    "realm": "Mortal",
    "lvl": 1,
    "cooldown": 0,
    "range": 0,
    "text": "Increases the stun chance of wielded maces by 1% per LVL.",
    "manualTarget": false,
    "autocast": false,
    "passive": true,
    "aura": false,
    "icon": "./assets/spells/mace-mastery.png",
    "formulas": {
      "stunChanceBonus": {
        "type": "stat",
        "base": 0,
        "perLevel": 1
      }
    },
    "soundEffect": ""
  },
  "Dagger Mastery": {
    "name": "Dagger Mastery",
    "realm": "Mortal",
    "lvl": 1,
    "cooldown": 0,
    "range": 0,
    "text": "Increases FOCUS by 4 plus 1 per LVL while a Stab weapon is equipped. Critical hits with Stab weapons grant Mortal Realm XP equal to damage dealt.",
    "manualTarget": false,
    "autocast": false,
    "passive": true,
    "aura": false,
    "icon": "",
    "formulas": {
      "focusBonus": {
        "type": "stat",
        "base": 4,
        "perLevel": 1
      }
    },
    "soundEffect": ""
  },
  "Shield Mastery": {
    "name": "Shield Mastery",
    "realm": "Mortal",
    "lvl": 1,
    "cooldown": 0,
    "range": 0,
    "text": "Increases BLOCK by 1 per LVL while a Shield is equipped. Successful blocks with a Shield grant Mortal Realm XP equal to the blocked damage.",
    "manualTarget": false,
    "autocast": false,
    "passive": true,
    "aura": false,
    "icon": "",
    "formulas": {
      "blockBonus": {
        "type": "stat",
        "base": 0,
        "perLevel": 1
      }
    },
    "soundEffect": ""
  },
  "Shield Bash": {
    "name": "Shield Bash",
    "realm": "Mortal",
    "lvl": 1,
    "cooldown": 8,
    "range": 2.5,
    "text": "Requires an equipped shield. Bashes the enemy currently engaged in melee combat for {damage} Mortal physical damage and stuns it for 2 seconds.",
    "manualTarget": false,
    "autocast": true,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/shield-bash.png",
    "manualCast": true,
    "duration": 2,
    "requiresShield": true,
    "formulas": {
      "damage": {
        "type": "damage",
        "base": 0,
        "perLevel": 1,
        "stat": null,
        "statScale": 0
      }
    },
    "soundEffect": "./assets/audio/poison.wav"
  },
  "Battle Cry": {
    "name": "Battle Cry",
    "realm": "Mortal",
    "lvl": 1,
    "cooldown": 18,
    "range": 4,
    "text": "Instantly stuns all enemies within Range 4 of the caster for {duration} seconds.",
    "manualTarget": false,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "",
    "formulas": {
      "duration": {
        "type": "duration",
        "base": 0,
        "perLevel": 0.5
      }
    },
    "soundEffect": ""
  },
  "Dual Wield": {
    "name": "Dual Wield",
    "realm": "Mortal",
    "lvl": 1,
    "cooldown": 0,
    "range": 0,
    "text": "Allows a One-Handed weapon in the Off-Hand slot. Off-Hand attacks deal 20% of it's normal damage, plus 2% per LVL.",
    "manualTarget": false,
    "autocast": false,
    "passive": true,
    "aura": false,
    "icon": "./assets/spells/dual-wield.png",
    "formulas": {
      "offHandDamagePercent": {
        "type": "stat",
        "base": 18,
        "perLevel": 2
      }
    },
    "soundEffect": ""
  },
  "War Drums": {
    "name": "War Drums",
    "realm": "Mortal",
    "lvl": 1,
    "cooldown": 0,
    "range": 6,
    "text": "Increases AGL of the caster and allies within range by {agilityBonus}",
    "manualTarget": false,
    "autocast": false,
    "passive": true,
    "aura": true,
    "icon": "./assets/spells/war-drums.png",
    "formulas": {
      "agilityBonus": {
        "type": "stat",
        "base": 0,
        "perLevel": 2
      }
    },
    "soundEffect": ""
  },
  "Bloodthirsty Aura": {
    "name": "Bloodthirsty Aura",
    "realm": "Infernal",
    "lvl": 1,
    "cooldown": 0,
    "range": 6,
    "text": "Increases FOCUS of the caster and allies within range by {focusBonus}",
    "manualTarget": false,
    "autocast": false,
    "passive": true,
    "aura": true,
    "icon": "./assets/spells/bloodthirsty-aura.png",
    "formulas": {
      "focusBonus": {
        "type": "stat",
        "base": 0,
        "perLevel": 1
      }
    },
    "soundEffect": ""
  },
  "Ring of Fire": {
    "name": "Ring of Fire",
    "realm": "Infernal",
    "lvl": 1,
    "cooldown": 9,
    "range": 0,
    "text": "Surrounds the caster with a flaming ring for 4 seconds. Enemies touching it take {damage} Infernal damage every 0.5 seconds.",
    "manualTarget": false,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/ring-of-fire.png",
    "duration": 4,
    "tick": 0.5,
    "formulas": {
      "damage": {
        "type": "damage",
        "base": 0,
        "perLevel": 0.5,
        "stat": "INT",
        "statScale": 1
      }
    },
    "soundEffect": "./assets/audio/fireball.wav"
  },
  "Basic Prayer": {
    "name": "Basic Prayer",
    "realm": "Celestial",
    "lvl": 1,
    "cooldown": 4,
    "range": 8,
    "text": "A basic prayer that heals {heal} health",
    "manualTarget": true,
    "autocast": true,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/basic-prayer.png",
    "formulas": {
      "heal": {
        "type": "heal",
        "base": 3,
        "perLevel": 1
      }
    },
    "soundEffect": "./assets/audio/pacify.wav"
  },
  "Heavenly Light": {
    "name": "Heavenly Light",
    "realm": "Celestial",
    "lvl": 1,
    "cooldown": 8,
    "range": 7,
    "text": "Restores {heal} HP to the Soulreaper or an ally.",
    "manualTarget": true,
    "autocast": true,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/heavenly-light.png",
    "formulas": {
      "heal": {
        "type": "heal",
        "base": 5,
        "perLevel": 2
      }
    },
    "soundEffect": "./assets/audio/pacify.wav"
  },
  "Godspeed": {
    "name": "Godspeed",
    "realm": "Celestial",
    "lvl": 1,
    "cooldown": 6,
    "range": 8,
    "text": "Increases SPD by {speedBonus} for 5 minutes.",
    "manualTarget": true,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/godspeed.png",
    "duration": 300,
    "formulas": {
      "speedBonus": {
        "type": "stat",
        "base": 0,
        "perLevel": 0.5
      }
    },
    "soundEffect": "./assets/audio/generic-celestial-offensive-spell.wav"
  },
  "Curse of Disdain": {
    "name": "Curse of Disdain",
    "realm": "Umbral",
    "lvl": 1,
    "cooldown": 5,
    "range": 8,
    "text": "Curses the nearest enemy for 1 Umbral damage per second for 8 seconds.",
    "manualTarget": true,
    "autocast": true,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/curse-of-disdain.png",
    "duration": 8,
    "tick": 1,
    "formulas": {
      "dotDamage": {
        "type": "damage",
        "base": 0.5,
        "perLevel": 0.5,
        "stat": "INT",
        "statScale": 1
      }
    },
    "soundEffect": "./assets/audio/curse.wav"
  },
  "Virulent Plague": {
    "name": "Virulent Plague",
    "realm": "Umbral",
    "lvl": 1,
    "cooldown": 15,
    "range": 9,
    "text": "Infects a target with a contagious plague that deals {dotDamage} Umbral damage every second for 15 seconds. Requires ceiling {lvl} Bones.",
    "manualTarget": true,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/virulent-plague.png",
    "duration": 15,
    "tick": 1,
    "formulas": {
      "dotDamage": {
        "type": "damage",
        "base": 0,
        "perLevel": 0.5,
        "stat": null,
        "statScale": 0
      },
      "boneCost": {
        "type": "cost",
        "base": 0,
        "perLevel": 0.5,
        "round": "ceil"
      }
    },
    "soundEffect": "./assets/audio/poison.wav"
  },
  "Tangle Vine": {
    "name": "Tangle Vine",
    "realm": "Sylvan",
    "lvl": 1,
    "cooldown": 6,
    "range": 6,
    "text": "Deals 3 Sylvan damage and roots the nearest enemy for 2 seconds.",
    "manualTarget": true,
    "autocast": true,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/tangle-vine.png",
    "formulas": {
      "damage": {
        "type": "damage",
        "base": 2.5,
        "perLevel": 0.5,
        "stat": "INT",
        "statScale": 1
      },
      "rootDuration": {
        "type": "duration",
        "base": 1.5,
        "perLevel": 0.5
      }
    },
    "soundEffect": "./assets/audio/tangle-vines.wav"
  },
  "Briar Lash": {
    "name": "Briar Lash",
    "realm": "Sylvan",
    "lvl": 1,
    "cooldown": 5,
    "range": 8,
    "text": "Whips a target with thorny vines, dealing {damage} Sylvan damage and briefly slowing it.",
    "manualTarget": true,
    "autocast": true,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/briar-lash.png",
    "duration": 3,
    "formulas": {
      "damage": {
        "type": "damage",
        "base": 4,
        "perLevel": 1,
        "stat": "INT",
        "statScale": 1
      },
      "speedPenalty": {
        "type": "stat",
        "base": -1.5,
        "perLevel": -0.5
      }
    },
    "soundEffect": "./assets/audio/tangle-vines.wav"
  },
  "Chlorophyll": {
    "name": "Chlorophyll",
    "realm": "Sylvan",
    "lvl": 1,
    "cooldown": 8,
    "range": 8,
    "text": "Infuses a friendly target with green life magic, healing {heal} HP every second for {duration} seconds.",
    "manualTarget": true,
    "autocast": true,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/chlorophyll.png",
    "duration": 30,
    "tick": 1,
    "formulas": {
      "heal": {
        "type": "heal",
        "base": 0,
        "perLevel": 0.5,
        "stat": null,
        "statScale": 0
      }
    },
    "soundEffect": "./assets/audio/generic-sylvan-buff.wav"
  },
  "Wooden Skin": {
    "name": "Wooden Skin",
    "realm": "Sylvan",
    "lvl": 1,
    "cooldown": 12,
    "range": 8,
    "text": "Hardens a friendly target's skin like bark, increasing DEF by {defenseBonus} for {duration} seconds.",
    "manualTarget": true,
    "autocast": true,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/wooden-skin.png",
    "duration": 30,
    "formulas": {
      "defenseBonus": {
        "type": "stat",
        "base": 0,
        "perLevel": 0.5
      }
    },
    "soundEffect": "./assets/audio/generic-sylvan-buff.wav"
  },
  "Sacred Grove": {
    "name": "Sacred Grove",
    "realm": "Sylvan",
    "lvl": 1,
    "cooldown": 24,
    "range": 6,
    "text": "Creates a ring of enchanted trees around the Soulreaper for {duration} seconds. Enemies outside the grove cannot enter it or target anything inside.",
    "manualTarget": false,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/sacred-grove.png",
    "manualCast": true,
    "autocastAvailable": false,
    "formulas": {
      "duration": {
        "type": "duration",
        "base": 4,
        "perLevel": 2
      }
    },
    "soundEffect": "./assets/audio/generic-sylvan-buff.wav"
  },
  "Spiderweb": {
    "name": "Spiderweb",
    "realm": "Mortal",
    "lvl": 1,
    "cooldown": 6,
    "range": 9,
    "text": "Roots the nearest enemy for 2 seconds.",
    "manualTarget": true,
    "autocast": true,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/spiderweb.png",
    "formulas": {
      "rootDuration": {
        "type": "duration",
        "base": 1.5,
        "perLevel": 0.5
      }
    },
    "soundEffect": "./assets/audio/tangle-vines.wav"
  },
  "Pacify": {
    "name": "Pacify",
    "realm": "Ethereal",
    "lvl": 1,
    "cooldown": 8,
    "range": 10,
    "text": "Removes aggression from a hostile enemy for 1.5 seconds.",
    "manualTarget": true,
    "autocast": true,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/pacify.png",
    "formulas": {
      "pacifyDuration": {
        "type": "duration",
        "base": 1,
        "perLevel": 0.5
      }
    },
    "soundEffect": "./assets/audio/generic-ethereal-offensive-spell.wav"
  },
  "Hypnotize": {
    "name": "Hypnotize",
    "realm": "Ethereal",
    "lvl": 1,
    "cooldown": 10,
    "range": 8,
    "text": "Stuns a single target for a random duration up to {duration} seconds. Duration is reduced by the target's Ethereal resistance.",
    "manualTarget": true,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/hypnotize.png",
    "formulas": {
      "duration": {
        "type": "duration",
        "base": 0,
        "perLevel": 0.5
      }
    },
    "soundEffect": "./assets/audio/generic-shadow-buff.wav"
  },
  "Invisibility": {
    "name": "Invisibility",
    "realm": "Ethereal",
    "lvl": 1,
    "cooldown": 12,
    "range": 6,
    "text": "Turns self or ally invisible to enemies.",
    "manualTarget": true,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/invisibility.png",
    "formulas": {
      "duration": {
        "type": "duration",
        "base": 0,
        "perLevel": 6
      }
    },
    "soundEffect": "./assets/audio/invisible.wav"
  },
  "Banish": {
    "name": "Banish",
    "realm": "Ethereal",
    "lvl": 1,
    "cooldown": 12,
    "range": 10,
    "text": "Turns self, ally, or enemy incorporeal.",
    "manualTarget": true,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/banish.png",
    "formulas": {
      "duration": {
        "type": "duration",
        "base": 0,
        "perLevel": 1
      }
    },
    "soundEffect": "./assets/audio/banish.wav"
  },
  "Summon Portal": {
    "name": "Summon Portal",
    "realm": "Ethereal",
    "lvl": 1,
    "cooldown": 8,
    "range": 6,
    "text": "Creates a portal that can be used to teleport to another portal.",
    "manualTarget": true,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/summon-portal.png",
    "soundEffect": "./assets/audio/generic-shadow-buff.wav",
    "formulas": {}
  },
  "Clarity": {
    "name": "Clarity",
    "realm": "Ethereal",
    "lvl": 1,
    "cooldown": 5,
    "range": 8,
    "text": "Target gains INT for 15 seconds.",
    "manualTarget": true,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/clarity.png",
    "duration": 60,
    "formulas": {
      "intelligenceBonus": {
        "type": "stat",
        "base": 0,
        "perLevel": 1
      }
    },
    "soundEffect": "./assets/audio/generic-sylvan-offensive-spell.wav"
  },
  "Ice Bolt": {
    "name": "Ice Bolt",
    "realm": "Ethereal",
    "lvl": 1,
    "cooldown": 6,
    "range": 10,
    "text": "Deals Ethereal damage and Freezes the target for 4 seconds.",
    "manualTarget": true,
    "autocast": true,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/ice-bolt.png",
    "duration": 4,
    "formulas": {
      "damage": {
        "type": "damage",
        "base": 4,
        "perLevel": 1,
        "stat": "INT",
        "statScale": 1
      }
    },
    "soundEffect": "./assets/audio/generic-shadow-offensive-spell.wav"
  },
  "Ice Storm": {
    "name": "Ice Storm",
    "realm": "Ethereal",
    "lvl": 1,
    "cooldown": 10,
    "range": 10,
    "text": "Rains ice down on an area, dealing Ethereal damage and Freezing enemies.",
    "manualTarget": true,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/ice-storm.png",
    "duration": 4,
    "aoeRadius": 4.5,
    "formulas": {
      "damage": {
        "type": "damage",
        "base": 0,
        "perLevel": 0.5,
        "stat": "INT",
        "statScale": 1
      }
    },
    "soundEffect": "./assets/audio/ice-storm.wav"
  },
  "Frozen Touch": {
    "name": "Frozen Touch",
    "realm": "Ethereal",
    "lvl": 1,
    "cooldown": 0,
    "range": 0,
    "text": "Melee weapon hits have a {freezeChance}% chance to make an enemy Frozen for 4 seconds.",
    "manualTarget": false,
    "autocast": false,
    "passive": true,
    "aura": false,
    "icon": "./assets/spells/frozen-touch.png",
    "duration": 4,
    "formulas": {
      "freezeChance": {
        "type": "stat",
        "base": 0,
        "perLevel": 2
      }
    },
    "soundEffect": "./assets/audio/generic-ethereal-offensive-spell.wav"
  },
  "Chain Lightning": {
    "name": "Chain Lightning",
    "realm": "Celestial",
    "lvl": 1,
    "cooldown": 6,
    "range": 8,
    "text": "Deals Celestial damage and jumps to nearby enemies.",
    "manualTarget": true,
    "autocast": true,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/chain-lightning.png",
    "formulas": {
      "damage": {
        "type": "damage",
        "base": 0,
        "perLevel": 1.25,
        "stat": "INT",
        "statScale": 1
      },
      "jumpDamageMultiplier": {
        "type": "multiplier",
        "base": 0.75,
        "perLevel": 0
      }
    },
    "soundEffect": "./assets/audio/fireblast.wav"
  },
  "Grace from Above": {
    "name": "Grace from Above",
    "realm": "Celestial",
    "lvl": 1,
    "cooldown": 16,
    "range": 8,
    "text": "Creates a radiant circle that heals friendly units inside every second.",
    "manualTarget": true,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/grace-from-above.png",
    "aoeRadius": 5,
    "duration": 8,
    "tick": 1,
    "formulas": {
      "heal": {
        "type": "heal",
        "base": 0,
        "perLevel": 0.5
      }
    },
    "soundEffect": "./assets/audio/generic-celestial-buff.wav"
  },
  "Raise Skeleton": {
    "name": "Raise Skeleton",
    "realm": "Umbral",
    "lvl": 1,
    "cooldown": 30,
    "range": 0,
    "text": "Raises a Skeleton companion from Bones.",
    "manualTarget": false,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/raise-skeleton.png",
    "formulas": {
      "boneCost": {
        "type": "cost",
        "base": 0,
        "perLevel": 1
      }
    },
    "soundEffect": "./assets/audio/generic-shadow-buff.wav"
  },
  "Summon Water Elemental": {
    "name": "Summon Water Elemental",
    "realm": "Ethereal",
    "lvl": 1,
    "cooldown": 30,
    "range": 0,
    "text": "Summon Water Elemental summons a level {lvl} Water Elemental pet. Requires {lvl} Ether.",
    "manualTarget": false,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/summon-water-elemental.png",
    "formulas": {
      "etherCost": {
        "type": "cost",
        "base": 0,
        "perLevel": 1
      },
      "summonLevel": {
        "type": "level",
        "base": 0,
        "perLevel": 1
      }
    },
    "soundEffect": ""
  },
  "Summon Earth Elemental": {
    "name": "Summon Earth Elemental",
    "realm": "Ethereal",
    "lvl": 1,
    "cooldown": 30,
    "range": 0,
    "text": "Summon Earth Elemental summons a level {lvl} Earth Elemental pet. Requires {lvl} Ether.",
    "manualTarget": false,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/summon-earth-elemental.png",
    "formulas": {
      "etherCost": {
        "type": "cost",
        "base": 0,
        "perLevel": 1
      },
      "summonLevel": {
        "type": "level",
        "base": 0,
        "perLevel": 1
      }
    },
    "soundEffect": ""
  },
  "Summon Fire Elemental": {
    "name": "Summon Fire Elemental",
    "realm": "Infernal",
    "lvl": 1,
    "cooldown": 30,
    "range": 0,
    "text": "Summon Fire Elemental summons a level {lvl} Fire Elemental pet. Requires {lvl} Ether.",
    "manualTarget": false,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/summon-fire-elemental.png",
    "formulas": {
      "etherCost": {
        "type": "cost",
        "base": 0,
        "perLevel": 1
      },
      "summonLevel": {
        "type": "level",
        "base": 0,
        "perLevel": 1
      }
    },
    "soundEffect": ""
  },
  "Summon Shade": {
    "name": "Summon Shade",
    "realm": "Umbral",
    "lvl": 1,
    "cooldown": 30,
    "range": 0,
    "text": "Summon Shade summons a level {lvl} Shade pet. Requires {lvl} Ether.",
    "manualTarget": false,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/summon-shade.png",
    "formulas": {
      "etherCost": {
        "type": "cost",
        "base": 0,
        "perLevel": 1
      },
      "summonLevel": {
        "type": "level",
        "base": 0,
        "perLevel": 1
      }
    },
    "soundEffect": ""
  },
  "Summon Treant": {
    "name": "Summon Treant",
    "realm": "Sylvan",
    "lvl": 1,
    "cooldown": 30,
    "range": 0,
    "text": "Summon Treant summons a level {lvl} Treant pet. Requires {lvl} Ether.",
    "manualTarget": false,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/summon-treant.png",
    "formulas": {
      "etherCost": {
        "type": "cost",
        "base": 0,
        "perLevel": 1
      },
      "summonLevel": {
        "type": "level",
        "base": 0,
        "perLevel": 1
      }
    },
    "soundEffect": ""
  },
  "Tame Beast": {
    "name": "Tame Beast",
    "realm": "Sylvan",
    "lvl": 1,
    "cooldown": 60,
    "range": 6,
    "text": "Tames any Beast up to {tameLevel} for 300 seconds.",
    "manualTarget": true,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/tame-beast.png",
    "duration": 300,
    "formulas": {
      "tameLevel": {
        "type": "level",
        "base": 2,
        "perLevel": 1
      }
    },
    "soundEffect": "./assets/audio/tangle-vines.wav"
  },
  "Unholy Dominion": {
    "name": "Unholy Dominion",
    "realm": "Infernal",
    "lvl": 1,
    "cooldown": 60,
    "range": 6,
    "text": "Dominates any Demon up to level {tameLevel} for 300 seconds, at the cost of 1 Virtue",
    "manualTarget": true,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/unholy-dominion.png",
    "duration": 300,
    "formulas": {
      "tameLevel": {
        "type": "level",
        "base": 2,
        "perLevel": 1
      }
    },
    "soundEffect": ""
  },
  "Divine Shield": {
    "name": "Divine Shield",
    "realm": "Celestial",
    "lvl": 1,
    "cooldown": 12,
    "range": 8,
    "text": "Creates a shield around a target that absorbs up to {shield} damage for {duration} seconds.",
    "manualTarget": true,
    "autocast": true,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/divine-shield.png",
    "duration": 30,
    "formulas": {
      "shield": {
        "type": "shield",
        "base": 0,
        "perLevel": 5
      }
    },
    "soundEffect": "./assets/audio/generic-celestial-buff.wav"
  },
  "Arcane Shield": {
    "name": "Arcane Shield",
    "realm": "Ethereal",
    "lvl": 1,
    "cooldown": 12,
    "range": 8,
    "text": "Creates a shield around a target that absorbs up to {shield} magic damage for {duration} seconds.",
    "manualTarget": true,
    "autocast": true,
    "passive": false,
    "aura": false,
    "icon": "",
    "duration": 30,
    "formulas": {
      "shield": {
        "type": "shield",
        "base": 0,
        "perLevel": 3
      }
    },
    "soundEffect": ""
  },
  "Fireblast": {
    "name": "Fireblast",
    "realm": "Infernal",
    "lvl": 1,
    "cooldown": 10,
    "range": 10,
    "text": "Ignites an area, dealing Infernal damage every second for 4 seconds.",
    "manualTarget": true,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/fireblast.png",
    "duration": 4,
    "tick": 1,
    "aoeRadius": 4.5,
    "formulas": {
      "damage": {
        "type": "damage",
        "base": 0,
        "perLevel": 0.5,
        "stat": "INT",
        "statScale": 1
      }
    },
    "soundEffect": "./assets/audio/fireblast.wav"
  },
  "Fireball": {
    "name": "Fireball",
    "realm": "Infernal",
    "lvl": 1,
    "cooldown": 6,
    "range": 10,
    "text": "Fires a flaming projectile at the nearest enemy, dealing Infernal damage and burning it over 4 seconds.",
    "manualTarget": true,
    "autocast": true,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/fireball.png",
    "duration": 4,
    "tick": 1,
    "formulas": {
      "damage": {
        "type": "damage",
        "base": 4,
        "perLevel": 1,
        "stat": "INT",
        "statScale": 1
      },
      "dotDamageMultiplier": {
        "type": "multiplier",
        "base": 0.25,
        "perLevel": 0
      }
    },
    "soundEffect": "./assets/audio/fireball.wav"
  },
  "Aura of Protection": {
    "name": "Aura of Protection",
    "realm": "Celestial",
    "lvl": 1,
    "cooldown": 0,
    "range": 6,
    "text": "Increases DEF of the Soulreaper and allies within range.",
    "manualTarget": false,
    "autocast": false,
    "passive": true,
    "aura": true,
    "icon": "./assets/spells/aura-of-protection.png",
    "formulas": {
      "defenseBonus": {
        "type": "stat",
        "base": 0,
        "perLevel": 0.25
      }
    },
    "soundEffect": "./assets/audio/heal-spell.wav"
  },
  "Etherwind Aura": {
    "name": "Etherwind Aura",
    "realm": "Ethereal",
    "lvl": 1,
    "cooldown": 0,
    "range": 9,
    "text": "Increases INT and RESIST of the Soulreaper and allies within range.",
    "manualTarget": false,
    "autocast": false,
    "passive": true,
    "aura": true,
    "icon": "",
    "formulas": {
      "intelligenceBonus": {
        "type": "stat",
        "base": 0,
        "perLevel": 0.5
      },
      "resistBonus": {
        "type": "stat",
        "base": 0,
        "perLevel": 0.5
      }
    },
    "soundEffect": ""
  },
  "Dark Circle": {
    "name": "Dark Circle",
    "realm": "Infernal",
    "lvl": 1,
    "cooldown": 18,
    "range": 8,
    "text": "Creates a glowing red pentagram for 12 seconds. Friendly units inside gain {attackBonus} ATK.",
    "manualTarget": true,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/dark-circle.png",
    "aoeRadius": 5,
    "duration": 12,
    "tick": 0.5,
    "formulas": {
      "attackBonus": {
        "type": "stat",
        "base": 0,
        "perLevel": 1
      }
    },
    "soundEffect": "./assets/audio/generic-shadow-buff.wav"
  },
  "Song of White Stag": {
    "name": "Song of White Stag",
    "realm": "Sylvan",
    "lvl": 1,
    "cooldown": 0,
    "range": 6,
    "text": "Increases REGEN of the Soulreaper and allies within range.",
    "manualTarget": false,
    "autocast": false,
    "passive": true,
    "aura": true,
    "icon": "./assets/spells/song-of-white-stag.png",
    "formulas": {
      "regenBonus": {
        "type": "stat",
        "base": 0,
        "perLevel": 0.5
      }
    },
    "soundEffect": "./assets/audio/heal-spell.wav"
  },
  "Lifesteal": {
    "name": "Lifesteal",
    "realm": "Umbral",
    "lvl": 1,
    "cooldown": 8,
    "range": 6,
    "text": "Deals Umbral damage to an enemy and returns half of it to the Soulreaper.",
    "manualTarget": true,
    "autocast": true,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/lifesteal.png",
    "formulas": {
      "damage": {
        "type": "damage",
        "base": 6,
        "perLevel": 1,
        "stat": "INT",
        "statScale": 1
      },
      "healMultiplier": {
        "type": "multiplier",
        "base": 0.5,
        "perLevel": 0
      }
    },
    "soundEffect": "./assets/audio/generic-shadow-offensive-spell.wav"
  },
  "Mortify": {
    "name": "Mortify",
    "realm": "Umbral",
    "lvl": 1,
    "cooldown": 14,
    "range": 6,
    "text": "Forces the targeted unit to flee away from the caster for {duration} seconds.",
    "manualTarget": true,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/mortify.png",
    "formulas": {
      "duration": {
        "type": "duration",
        "base": 0,
        "perLevel": 0.5
      }
    },
    "soundEffect": "./assets/audio/generic-shadow-buff.wav"
  },
  "Spirit of Avia": {
    "name": "Spirit of Avia",
    "realm": "Sylvan",
    "lvl": 1,
    "cooldown": 24,
    "range": 0,
    "text": "Increases SPD and AGL by {speedBonus}, and grants Flying for 16 seconds.",
    "manualTarget": true,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/spirit-of-avia.png",
    "duration": 16,
    "formulas": {
      "speedBonus": {
        "type": "stat",
        "base": 0,
        "perLevel": 1
      },
      "agilityBonus": {
        "type": "stat",
        "base": 0,
        "perLevel": 1
      }
    },
    "soundEffect": "./assets/audio/generic-sylvan-offensive-spell.wav"
  },
  "Thorn Shield": {
    "name": "Thorn Shield",
    "realm": "Sylvan",
    "lvl": 1,
    "cooldown": 24,
    "range": 0,
    "text": "Enemies with close-range weapons take {damage} Sylvan damage when they land a hit. Lasts {duration} seconds.",
    "manualTarget": false,
    "autocast": true,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/thorn-shield.png",
    "duration": 16,
    "formulas": {
      "damage": {
        "type": "damage",
        "base": 0,
        "perLevel": 1,
        "stat": "INT",
        "statScale": 1
      }
    },
    "soundEffect": "./assets/audio/tangle-vines.wav"
  },
  "Burning Skin": {
    "name": "Burning Skin",
    "realm": "Infernal",
    "lvl": 1,
    "cooldown": 0,
    "range": 0,
    "text": "A passive Infernal shield. Enemies with close-range weapons take Infernal damage when they hit the Soulreaper.",
    "manualTarget": false,
    "autocast": false,
    "passive": true,
    "aura": false,
    "icon": "",
    "formulas": {
      "damage": {
        "type": "damage",
        "base": 0,
        "perLevel": 0.5,
        "stat": "INT",
        "statScale": 1
      }
    },
    "soundEffect": ""
  },
  "Faerie Fire": {
    "name": "Faerie Fire",
    "realm": "Sylvan",
    "lvl": 1,
    "cooldown": 8,
    "range": 8,
    "text": "Afflicts enemies in the target area, reducing DEF by {defensePenalty} for {duration} seconds.",
    "manualTarget": true,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/faerie-fire.png",
    "aoeRadius": 4,
    "duration": 8,
    "formulas": {
      "defensePenalty": {
        "type": "stat",
        "base": 0,
        "perLevel": -0.5
      }
    },
    "soundEffect": "./assets/audio/handle-money.wav"
  },
  "Faerie Circle": {
    "name": "Faerie Circle",
    "realm": "Sylvan",
    "lvl": 1,
    "cooldown": 18,
    "range": 8,
    "text": "Creates an area on the ground for 12 seconds that grants friendly units {resistBonus} magic resistance.",
    "manualTarget": true,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/faerie-circle.png",
    "aoeRadius": 5,
    "duration": 12,
    "tick": 0.5,
    "formulas": {
      "resistBonus": {
        "type": "stat",
        "base": 0,
        "perLevel": 1
      }
    },
    "soundEffect": "./assets/audio/fairy-dust.wav"
  },
  "Faerie Dust": {
    "name": "Faerie Dust",
    "realm": "Sylvan",
    "lvl": 1,
    "cooldown": 4,
    "range": 5,
    "text": "Afflicts the target with pink sparkles, reducing SPD, AGL, and Sylvan RESIST.",
    "manualTarget": true,
    "autocast": true,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/faerie-dust.png",
    "duration": 6,
    "formulas": {
      "speedPenalty": {
        "type": "stat",
        "base": 0,
        "perLevel": -2
      },
      "agilityPenalty": {
        "type": "stat",
        "base": 0,
        "perLevel": -2
      },
      "sylvanResistPenalty": {
        "type": "resistance",
        "base": 0,
        "perLevel": -1
      }
    },
    "soundEffect": "./assets/audio/fairy-dust.wav"
  },
  "Bone Ritual": {
    "name": "Bone Ritual",
    "realm": "Umbral",
    "lvl": 1,
    "cooldown": 4,
    "range": 8,
    "text": "Consumes a Bone to restore 1.5 HP per LVL to a friendly target.",
    "manualTarget": true,
    "autocast": true,
    "passive": false,
    "aura": false,
    "icon": "./assets/spells/bone-ritual.png",
    "formulas": {
      "heal": {
        "type": "heal",
        "base": 0,
        "perLevel": 1.5
      }
    },
    "soundEffect": ""
  },
  "Pestilent Aura": {
    "name": "Pestilent Aura",
    "realm": "Umbral",
    "lvl": 1,
    "cooldown": 0,
    "range": 6,
    "text": "Deals {damage} Umbral damage every second to everything except Umbral. Caster's REGEN is 0 while active.",
    "manualTarget": false,
    "autocast": false,
    "passive": true,
    "aura": true,
    "icon": "./assets/spells/pestilent-aura.png",
    "tick": 1,
    "formulas": {
      "damage": {
        "type": "damage",
        "base": 0,
        "perLevel": 0.33,
        "stat": null,
        "statScale": 0
      }
    },
    "soundEffect": ""
  },
  "Poison": {
    "name": "Poison",
    "realm": "Mortal",
    "lvl": 1,
    "cooldown": 0,
    "range": 0,
    "text": "Weapon attacks have a 50% chance to poison an enemy.",
    "manualTarget": false,
    "autocast": false,
    "passive": true,
    "aura": false,
    "icon": "./assets/spells/poison.png",
    "duration": 4,
    "tick": 1,
    "formulas": {
      "totalDamage": {
        "type": "damage",
        "base": 0,
        "perLevel": 1,
        "stat": null,
        "statScale": 0
      }
    },
    "soundEffect": "./assets/audio/poison.wav"
  },
  "Arcane Protection": {
    "name": "Arcane Protection",
    "realm": "Ethereal",
    "lvl": 1,
    "cooldown": 12,
    "range": 8,
    "text": "Creates a shield around a target that absorbs magic damage.",
    "manualTarget": true,
    "autocast": false,
    "passive": false,
    "aura": false,
    "icon": "",
    "duration": 8,
    "formulas": {
      "shield": {
        "type": "shield",
        "base": 0,
        "perLevel": 3
      }
    },
    "soundEffect": ""
  }
};

const devDungeonConfigs = [
  {
    "id": "bear-cave",
    "name": "Bear Cave",
    "cellSize": 128,
    "width": 8,
    "height": 8,
    "wallTexture": "./assets/ground/rat-den.png",
    "entrance": {
      "x": 3,
      "y": 7
    },
    "cells": [
      {
        "x": 1,
        "y": 1,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-se"
      },
      {
        "x": 2,
        "y": 1,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 3,
        "y": 1,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 4,
        "y": 1,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 1,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-sw"
      },
      {
        "x": 1,
        "y": 2,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 2,
        "y": 2,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 3,
        "y": 2,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 4,
        "y": 2,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 2,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 1,
        "y": 3,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 2,
        "y": 3,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 3,
        "y": 3,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 4,
        "y": 3,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 3,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 1,
        "y": 4,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-ne"
      },
      {
        "x": 2,
        "y": 4,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 3,
        "y": 4,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 4,
        "y": 4,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 4,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-nw"
      },
      {
        "x": 3,
        "y": 5,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 3,
        "y": 6,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 3,
        "y": 7,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      }
    ],
    "water": [],
    "lava": [],
    "units": [
      {
        "name": "Plague Bear",
        "x": 3,
        "y": 2,
        "level": 8,
        "elite": false,
        "boss": true
      }
    ],
    "npcs": [],
    "features": [],
    "spawnTable": []
  },
  {
    "id": "rogabogu",
    "name": "Rogabogu",
    "cellSize": 128,
    "width": 30,
    "height": 30,
    "wallTexture": "./assets/ground/jungle-wall.png",
    "entrance": {
      "x": 13,
      "y": 29
    },
    "cells": [
      {
        "x": 3,
        "y": 0,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 4,
        "y": 0,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 0,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 0,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 0,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-se"
      },
      {
        "x": 11,
        "y": 0,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 12,
        "y": 0,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 0,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 0,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 0,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 0,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "curve-sw"
      },
      {
        "x": 3,
        "y": 1,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 4,
        "y": 1,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 1,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 1,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 1,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 1,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 12,
        "y": 1,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 1,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 1,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 1,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 1,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 17,
        "y": 1,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 1,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 1,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 1,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 21,
        "y": 1,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 22,
        "y": 1,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 23,
        "y": 1,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 24,
        "y": 1,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "diag-sw"
      },
      {
        "x": 3,
        "y": 2,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 4,
        "y": 2,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 2,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 2,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 2,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 2,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 12,
        "y": 2,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 2,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 2,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 2,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 2,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 17,
        "y": 2,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 2,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 2,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 2,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 21,
        "y": 2,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 22,
        "y": 2,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 23,
        "y": 2,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 24,
        "y": 2,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 25,
        "y": 2,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "diag-sw"
      },
      {
        "x": 3,
        "y": 3,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 4,
        "y": 3,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 3,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 3,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 3,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-ne"
      },
      {
        "x": 11,
        "y": 3,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 12,
        "y": 3,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 3,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 3,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 3,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 3,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "curve-nw"
      },
      {
        "x": 24,
        "y": 3,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "diag-ne"
      },
      {
        "x": 25,
        "y": 3,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 26,
        "y": 3,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "diag-sw"
      },
      {
        "x": 4,
        "y": 4,
        "texture": "./assets/ground/woodenposts.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 4,
        "texture": "./assets/ground/woodenposts.png",
        "brush": "square"
      },
      {
        "x": 25,
        "y": 4,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "diag-ne"
      },
      {
        "x": 26,
        "y": 4,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 27,
        "y": 4,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "diag-sw"
      },
      {
        "x": 4,
        "y": 5,
        "texture": "./assets/ground/woodenposts.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 5,
        "texture": "./assets/ground/woodenposts.png",
        "brush": "square"
      },
      {
        "x": 26,
        "y": 5,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 27,
        "y": 5,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 4,
        "y": 6,
        "texture": "./assets/ground/woodenposts.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 6,
        "texture": "./assets/ground/woodenposts.png",
        "brush": "square"
      },
      {
        "x": 26,
        "y": 6,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 27,
        "y": 6,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 4,
        "y": 7,
        "texture": "./assets/ground/woodenposts.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 7,
        "texture": "./assets/ground/woodenposts.png",
        "brush": "square"
      },
      {
        "x": 26,
        "y": 7,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 27,
        "y": 7,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 4,
        "y": 8,
        "texture": "./assets/ground/woodenposts.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 8,
        "texture": "./assets/ground/woodenposts.png",
        "brush": "square"
      },
      {
        "x": 26,
        "y": 8,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 27,
        "y": 8,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 4,
        "y": 9,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 9,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 9,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-sw"
      },
      {
        "x": 17,
        "y": 9,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 9,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 9,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 9,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 26,
        "y": 9,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 27,
        "y": 9,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 4,
        "y": 10,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 10,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 10,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 7,
        "y": 10,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 8,
        "y": 10,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 9,
        "y": 10,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 10,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 10,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 12,
        "y": 10,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 10,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 10,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 10,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 10,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 17,
        "y": 10,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 10,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 10,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 10,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 21,
        "y": 10,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 22,
        "y": 10,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 23,
        "y": 10,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 24,
        "y": 10,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 25,
        "y": 10,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 26,
        "y": 10,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 27,
        "y": 10,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 4,
        "y": 11,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-ne"
      },
      {
        "x": 5,
        "y": 11,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 11,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 7,
        "y": 11,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 8,
        "y": 11,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 9,
        "y": 11,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 11,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 11,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 12,
        "y": 11,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 11,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 11,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 11,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 11,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 17,
        "y": 11,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 11,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 11,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 11,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 21,
        "y": 11,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 22,
        "y": 11,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 23,
        "y": 11,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 24,
        "y": 11,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 25,
        "y": 11,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 26,
        "y": 11,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 27,
        "y": 11,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 17,
        "y": 12,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 12,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 12,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 12,
        "texture": "./assets/ground/jungle-floor.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 13,
        "texture": "./assets/ground/woodenposts.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 13,
        "texture": "./assets/ground/woodenposts.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 14,
        "texture": "./assets/ground/woodenposts.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 14,
        "texture": "./assets/ground/woodenposts.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 15,
        "texture": "./assets/ground/woodenposts.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 15,
        "texture": "./assets/ground/woodenposts.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 16,
        "texture": "./assets/ground/woodenposts.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 16,
        "texture": "./assets/ground/woodenposts.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 17,
        "texture": "./assets/ground/woodenposts.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 17,
        "texture": "./assets/ground/woodenposts.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 18,
        "texture": "./assets/ground/woodenposts.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 18,
        "texture": "./assets/ground/woodenposts.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 19,
        "texture": "./assets/ground/woodenposts.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 19,
        "texture": "./assets/ground/woodenposts.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 20,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 17,
        "y": 20,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 20,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 20,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 20,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 21,
        "y": 20,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 21,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 17,
        "y": 21,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 21,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 21,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 21,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 21,
        "y": 21,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 22,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-se"
      },
      {
        "x": 12,
        "y": 22,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 22,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 22,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 22,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 22,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 17,
        "y": 22,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 22,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 22,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 22,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 21,
        "y": 22,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 23,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 23,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 17,
        "y": 23,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 23,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 23,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 23,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 21,
        "y": 23,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 24,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 24,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 17,
        "y": 24,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 24,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 24,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 24,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 21,
        "y": 24,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 25,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 26,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-ne"
      },
      {
        "x": 12,
        "y": 26,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-sw"
      },
      {
        "x": 12,
        "y": 27,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-ne"
      },
      {
        "x": 13,
        "y": 27,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-sw"
      },
      {
        "x": 13,
        "y": 28,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 29,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      }
    ],
    "water": [
      {
        "x": 10,
        "y": 0
      },
      {
        "x": 11,
        "y": 0
      },
      {
        "x": 12,
        "y": 0
      },
      {
        "x": 13,
        "y": 0
      },
      {
        "x": 14,
        "y": 0
      },
      {
        "x": 15,
        "y": 0
      },
      {
        "x": 10,
        "y": 1
      },
      {
        "x": 11,
        "y": 1
      },
      {
        "x": 12,
        "y": 1
      },
      {
        "x": 13,
        "y": 1
      },
      {
        "x": 14,
        "y": 1
      },
      {
        "x": 15,
        "y": 1
      },
      {
        "x": 10,
        "y": 2
      },
      {
        "x": 11,
        "y": 2
      },
      {
        "x": 12,
        "y": 2
      },
      {
        "x": 13,
        "y": 2
      },
      {
        "x": 14,
        "y": 2
      },
      {
        "x": 15,
        "y": 2
      },
      {
        "x": 10,
        "y": 3
      },
      {
        "x": 11,
        "y": 3
      },
      {
        "x": 12,
        "y": 3
      },
      {
        "x": 13,
        "y": 3
      },
      {
        "x": 14,
        "y": 3
      },
      {
        "x": 15,
        "y": 3
      },
      {
        "x": 4,
        "y": 9
      },
      {
        "x": 5,
        "y": 9
      },
      {
        "x": 6,
        "y": 9
      },
      {
        "x": 4,
        "y": 10
      },
      {
        "x": 5,
        "y": 10
      },
      {
        "x": 6,
        "y": 10
      },
      {
        "x": 7,
        "y": 10
      },
      {
        "x": 8,
        "y": 10
      },
      {
        "x": 9,
        "y": 10
      },
      {
        "x": 10,
        "y": 10
      },
      {
        "x": 11,
        "y": 10
      },
      {
        "x": 12,
        "y": 10
      },
      {
        "x": 13,
        "y": 10
      },
      {
        "x": 14,
        "y": 10
      },
      {
        "x": 15,
        "y": 10
      },
      {
        "x": 16,
        "y": 10
      },
      {
        "x": 4,
        "y": 11
      },
      {
        "x": 5,
        "y": 11
      },
      {
        "x": 6,
        "y": 11
      },
      {
        "x": 7,
        "y": 11
      },
      {
        "x": 8,
        "y": 11
      },
      {
        "x": 9,
        "y": 11
      },
      {
        "x": 10,
        "y": 11
      },
      {
        "x": 11,
        "y": 11
      },
      {
        "x": 12,
        "y": 11
      },
      {
        "x": 13,
        "y": 11
      },
      {
        "x": 14,
        "y": 11
      },
      {
        "x": 15,
        "y": 11
      },
      {
        "x": 16,
        "y": 11
      },
      {
        "x": 16,
        "y": 20
      },
      {
        "x": 17,
        "y": 20
      },
      {
        "x": 18,
        "y": 20
      },
      {
        "x": 19,
        "y": 20
      },
      {
        "x": 20,
        "y": 20
      },
      {
        "x": 21,
        "y": 20
      },
      {
        "x": 16,
        "y": 21
      },
      {
        "x": 17,
        "y": 21
      },
      {
        "x": 18,
        "y": 21
      },
      {
        "x": 19,
        "y": 21
      },
      {
        "x": 20,
        "y": 21
      },
      {
        "x": 21,
        "y": 21
      },
      {
        "x": 11,
        "y": 22
      },
      {
        "x": 12,
        "y": 22
      },
      {
        "x": 13,
        "y": 22
      },
      {
        "x": 14,
        "y": 22
      },
      {
        "x": 15,
        "y": 22
      },
      {
        "x": 16,
        "y": 22
      },
      {
        "x": 17,
        "y": 22
      },
      {
        "x": 18,
        "y": 22
      },
      {
        "x": 19,
        "y": 22
      },
      {
        "x": 20,
        "y": 22
      },
      {
        "x": 21,
        "y": 22
      },
      {
        "x": 11,
        "y": 23
      },
      {
        "x": 16,
        "y": 23
      },
      {
        "x": 17,
        "y": 23
      },
      {
        "x": 18,
        "y": 23
      },
      {
        "x": 19,
        "y": 23
      },
      {
        "x": 20,
        "y": 23
      },
      {
        "x": 21,
        "y": 23
      },
      {
        "x": 11,
        "y": 24
      },
      {
        "x": 16,
        "y": 24
      },
      {
        "x": 17,
        "y": 24
      },
      {
        "x": 18,
        "y": 24
      },
      {
        "x": 19,
        "y": 24
      },
      {
        "x": 20,
        "y": 24
      },
      {
        "x": 21,
        "y": 24
      },
      {
        "x": 11,
        "y": 25
      },
      {
        "x": 11,
        "y": 26
      },
      {
        "x": 12,
        "y": 26
      },
      {
        "x": 12,
        "y": 27
      },
      {
        "x": 13,
        "y": 27
      },
      {
        "x": 13,
        "y": 28
      },
      {
        "x": 13,
        "y": 29
      }
    ],
    "lava": [],
    "units": [
      {
        "name": "Froglin Mucketeer",
        "x": 17,
        "y": 21,
        "level": 10,
        "elite": true,
        "boss": false
      },
      {
        "name": "Froglin Mucketeer",
        "x": 17,
        "y": 23,
        "level": 10,
        "elite": true,
        "boss": false
      },
      {
        "name": "Froglin Mucketeer",
        "x": 20,
        "y": 21,
        "level": 10,
        "elite": true,
        "boss": false
      },
      {
        "name": "Froglin Mucketeer",
        "x": 20,
        "y": 23,
        "level": 10,
        "elite": true,
        "boss": false
      },
      {
        "name": "Froglin Diviner",
        "x": 19,
        "y": 22,
        "level": 10,
        "elite": true,
        "boss": false
      },
      {
        "name": "Froglin Diviner",
        "x": 18,
        "y": 11,
        "level": 10,
        "elite": true,
        "boss": false
      },
      {
        "name": "Froglin Diviner",
        "x": 19,
        "y": 11,
        "level": 10,
        "elite": true,
        "boss": false
      },
      {
        "name": "Hypnotoad",
        "x": 5,
        "y": 10,
        "level": 11,
        "elite": true,
        "boss": false
      },
      {
        "name": "Hypnotoad",
        "x": 26,
        "y": 10,
        "level": 11,
        "elite": true,
        "boss": false
      },
      {
        "name": "Bogchieftan Squeech",
        "x": 12,
        "y": 1,
        "level": 12,
        "elite": true,
        "boss": true
      },
      {
        "name": "High Muckromancer K'Rawk",
        "x": 4,
        "y": 1,
        "level": 12,
        "elite": true,
        "boss": true
      },
      {
        "name": "Froglin Zombie",
        "x": 3,
        "y": 2,
        "level": 11,
        "elite": true,
        "boss": false
      },
      {
        "name": "Froglin Zombie",
        "x": 3,
        "y": 0,
        "level": 11,
        "elite": true,
        "boss": false
      },
      {
        "name": "Froglin Zombie",
        "x": 5,
        "y": 0,
        "level": 11,
        "elite": true,
        "boss": false
      },
      {
        "name": "Froglin Zombie",
        "x": 5,
        "y": 2,
        "level": 11,
        "elite": true,
        "boss": false
      },
      {
        "name": "Froglin Mucketeer",
        "x": 11,
        "y": 1,
        "level": 11,
        "elite": true,
        "boss": false
      },
      {
        "name": "Froglin Mucketeer",
        "x": 12,
        "y": 0,
        "level": 11,
        "elite": true,
        "boss": false
      },
      {
        "name": "Froglin Mucketeer",
        "x": 13,
        "y": 1,
        "level": 11,
        "elite": true,
        "boss": false
      },
      {
        "name": "Froglin Mucketeer",
        "x": 12,
        "y": 2,
        "level": 11,
        "elite": true,
        "boss": false
      },
      {
        "name": "Froglin Mucketeer",
        "x": 18,
        "y": 12,
        "level": 10,
        "elite": true,
        "boss": false
      },
      {
        "name": "Froglin Mucketeer",
        "x": 19,
        "y": 12,
        "level": 10,
        "elite": true,
        "boss": false
      }
    ],
    "npcs": [],
    "features": [],
    "spawnTable": [
      {
        "name": "Giant Toad",
        "frequency": 20,
        "minLvl": 10
      },
      {
        "name": "Froglin",
        "frequency": 20,
        "minLvl": 10
      },
      {
        "name": "Gelatinous Cube",
        "frequency": 10,
        "minLvl": 10
      },
      {
        "name": "Grindylow",
        "frequency": 10,
        "minLvl": 10
      },
      {
        "name": "Swamp Thing",
        "frequency": 5,
        "minLvl": 10,
        "maxLvl": 12
      }
    ]
  },
  {
    "id": "yrgma-dim",
    "name": "Yrgma Dim",
    "cellSize": 128,
    "width": 32,
    "height": 32,
    "wallTexture": "./assets/ground/house-wall.png",
    "entrance": {
      "x": 15,
      "y": 31
    },
    "cells": [
      {
        "x": 10,
        "y": 0,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 0,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 0,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 1,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 1,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 1,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 1,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 1,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 2,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 2,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 2,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 2,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-sw"
      },
      {
        "x": 15,
        "y": 2,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 2,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 3,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 3,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 3,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-ne"
      },
      {
        "x": 11,
        "y": 3,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 12,
        "y": 3,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-sw"
      },
      {
        "x": 15,
        "y": 3,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 3,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 4,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 4,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 4,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-ne"
      },
      {
        "x": 12,
        "y": 4,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 4,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-sw"
      },
      {
        "x": 15,
        "y": 4,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 4,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 5,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 5,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 12,
        "y": 5,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-ne"
      },
      {
        "x": 13,
        "y": 5,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 5,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 5,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 5,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 17,
        "y": 5,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 5,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 5,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 5,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-sw"
      },
      {
        "x": 5,
        "y": 6,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 6,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 6,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 6,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 6,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-ne"
      },
      {
        "x": 20,
        "y": 6,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 21,
        "y": 6,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-sw"
      },
      {
        "x": 5,
        "y": 7,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 7,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 7,
        "y": 7,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 8,
        "y": 7,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 9,
        "y": 7,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 7,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 7,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 12,
        "y": 7,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 7,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 7,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 7,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 7,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 7,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-ne"
      },
      {
        "x": 21,
        "y": 7,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 22,
        "y": 7,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-sw"
      },
      {
        "x": 5,
        "y": 8,
        "texture": "./assets/ground/ash.png",
        "brush": "curve-ne"
      },
      {
        "x": 6,
        "y": 8,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 7,
        "y": 8,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 8,
        "y": 8,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 9,
        "y": 8,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 8,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 8,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 12,
        "y": 8,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 8,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 8,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 8,
        "texture": "./assets/ground/ash.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 8,
        "texture": "./assets/ground/ash.png",
        "brush": "curve-nw"
      },
      {
        "x": 21,
        "y": 8,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-ne"
      },
      {
        "x": 22,
        "y": 8,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 23,
        "y": 8,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-sw"
      },
      {
        "x": 9,
        "y": 9,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 9,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 9,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 22,
        "y": 9,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-ne"
      },
      {
        "x": 23,
        "y": 9,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 24,
        "y": 9,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 25,
        "y": 9,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 9,
        "y": 10,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 10,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 10,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 10,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 10,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 10,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 25,
        "y": 10,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 9,
        "y": 11,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 11,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 11,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 11,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 11,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 11,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 25,
        "y": 11,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 9,
        "y": 12,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 12,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 12,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 12,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 25,
        "y": 12,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 13,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 13,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 13,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 13,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 13,
        "texture": "./assets/ground/cath_floor.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 13,
        "texture": "./assets/ground/cath_floor.png",
        "brush": "square"
      },
      {
        "x": 24,
        "y": 13,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 25,
        "y": 13,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 26,
        "y": 13,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 14,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 14,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 14,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 14,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 14,
        "texture": "./assets/ground/cath_floor.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 14,
        "texture": "./assets/ground/cath_floor.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 14,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 21,
        "y": 14,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 22,
        "y": 14,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 23,
        "y": 14,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 24,
        "y": 14,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 25,
        "y": 14,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 26,
        "y": 14,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 27,
        "y": 14,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 28,
        "y": 14,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 29,
        "y": 14,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "curve-sw"
      },
      {
        "x": 5,
        "y": 15,
        "texture": "./assets/ground/stone-tiles.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 15,
        "texture": "./assets/ground/stone-tiles.png",
        "brush": "square"
      },
      {
        "x": 7,
        "y": 15,
        "texture": "./assets/ground/stone-tiles.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 15,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 15,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 12,
        "y": 15,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 15,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 15,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 15,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 15,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 15,
        "texture": "./assets/ground/cath_floor.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 15,
        "texture": "./assets/ground/cath_floor.png",
        "brush": "square"
      },
      {
        "x": 24,
        "y": 15,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 25,
        "y": 15,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 26,
        "y": 15,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 28,
        "y": 15,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 29,
        "y": 15,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 16,
        "texture": "./assets/ground/stone-tiles.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 16,
        "texture": "./assets/ground/stone-tiles.png",
        "brush": "square"
      },
      {
        "x": 7,
        "y": 16,
        "texture": "./assets/ground/stone-tiles.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 16,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 16,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 16,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 28,
        "y": 16,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 29,
        "y": 16,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 17,
        "texture": "./assets/ground/stone-tiles.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 17,
        "texture": "./assets/ground/stone-tiles.png",
        "brush": "square"
      },
      {
        "x": 7,
        "y": 17,
        "texture": "./assets/ground/stone-tiles.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 17,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 17,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 17,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 28,
        "y": 17,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 29,
        "y": 17,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 18,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 18,
        "texture": "./assets/ground/ice-tiles.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 18,
        "texture": "./assets/ground/ice-tiles.png",
        "brush": "square"
      },
      {
        "x": 12,
        "y": 18,
        "texture": "./assets/ground/ice-tiles.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 18,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 18,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 18,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 18,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 21,
        "y": 18,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 22,
        "y": 18,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 24,
        "y": 18,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 25,
        "y": 18,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 26,
        "y": 18,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 28,
        "y": 18,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 29,
        "y": 18,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 19,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 19,
        "texture": "./assets/ground/ice-tiles.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 19,
        "texture": "./assets/ground/ice-tiles.png",
        "brush": "square"
      },
      {
        "x": 12,
        "y": 19,
        "texture": "./assets/ground/ice-tiles.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 19,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 19,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 19,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 19,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 21,
        "y": 19,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 22,
        "y": 19,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 24,
        "y": 19,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 25,
        "y": 19,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 26,
        "y": 19,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 28,
        "y": 19,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 29,
        "y": 19,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 20,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 7,
        "y": 20,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "diag-sw"
      },
      {
        "x": 11,
        "y": 20,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 20,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 20,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 25,
        "y": 20,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 28,
        "y": 20,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 29,
        "y": 20,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 21,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "diag-ne"
      },
      {
        "x": 7,
        "y": 21,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 8,
        "y": 21,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "diag-sw"
      },
      {
        "x": 11,
        "y": 21,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 21,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 21,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 21,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 21,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 17,
        "y": 21,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 21,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 25,
        "y": 21,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 27,
        "y": 21,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "diag-se"
      },
      {
        "x": 28,
        "y": 21,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 29,
        "y": 21,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 7,
        "y": 22,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "diag-ne"
      },
      {
        "x": 8,
        "y": 22,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 9,
        "y": 22,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 22,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 22,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 12,
        "y": 22,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 22,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 22,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 22,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 22,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 17,
        "y": 22,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 22,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 22,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 22,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 21,
        "y": 22,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 22,
        "y": 22,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 23,
        "y": 22,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 24,
        "y": 22,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 25,
        "y": 22,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 26,
        "y": 22,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 27,
        "y": 22,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 28,
        "y": 22,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 29,
        "y": 22,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "diag-nw"
      },
      {
        "x": 8,
        "y": 23,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "diag-ne"
      },
      {
        "x": 9,
        "y": 23,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 23,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 23,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 12,
        "y": 23,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 23,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 23,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 23,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 23,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 17,
        "y": 23,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 23,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 23,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 23,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 21,
        "y": 23,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 22,
        "y": 23,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 23,
        "y": 23,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 24,
        "y": 23,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 25,
        "y": 23,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 26,
        "y": 23,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 27,
        "y": 23,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 28,
        "y": 23,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "diag-nw"
      },
      {
        "x": 29,
        "y": 23,
        "texture": "./assets/ground/dwarf-floor.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 24,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 24,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 24,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 24,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 17,
        "y": 24,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 24,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 25,
        "y": 24,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 25,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 25,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 25,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 25,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 17,
        "y": 25,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 25,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 25,
        "y": 25,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 26,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "diag-ne"
      },
      {
        "x": 14,
        "y": 26,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 26,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 26,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 17,
        "y": 26,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "diag-nw"
      },
      {
        "x": 19,
        "y": 26,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 26,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 21,
        "y": 26,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 24,
        "y": 26,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 25,
        "y": 26,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 26,
        "y": 26,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 27,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "diag-ne"
      },
      {
        "x": 15,
        "y": 27,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 27,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "diag-nw"
      },
      {
        "x": 19,
        "y": 27,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 27,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 21,
        "y": 27,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 24,
        "y": 27,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 25,
        "y": 27,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 26,
        "y": 27,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 28,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 29,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 30,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 31,
        "texture": "./assets/ground/dwarf-tile.png",
        "brush": "square"
      }
    ],
    "water": [],
    "lava": [
      {
        "x": 15,
        "y": 0
      },
      {
        "x": 16,
        "y": 0
      },
      {
        "x": 15,
        "y": 1
      },
      {
        "x": 16,
        "y": 1
      },
      {
        "x": 15,
        "y": 2
      },
      {
        "x": 16,
        "y": 2
      },
      {
        "x": 5,
        "y": 3
      },
      {
        "x": 6,
        "y": 3
      },
      {
        "x": 15,
        "y": 3
      },
      {
        "x": 16,
        "y": 3
      },
      {
        "x": 5,
        "y": 4
      },
      {
        "x": 6,
        "y": 4
      },
      {
        "x": 15,
        "y": 4
      },
      {
        "x": 16,
        "y": 4
      },
      {
        "x": 5,
        "y": 5
      },
      {
        "x": 6,
        "y": 5
      },
      {
        "x": 5,
        "y": 6
      },
      {
        "x": 6,
        "y": 6
      },
      {
        "x": 15,
        "y": 6
      },
      {
        "x": 16,
        "y": 6
      },
      {
        "x": 5,
        "y": 7
      },
      {
        "x": 6,
        "y": 7
      },
      {
        "x": 7,
        "y": 7
      },
      {
        "x": 8,
        "y": 7
      },
      {
        "x": 9,
        "y": 7
      },
      {
        "x": 10,
        "y": 7
      },
      {
        "x": 11,
        "y": 7
      },
      {
        "x": 12,
        "y": 7
      },
      {
        "x": 13,
        "y": 7
      },
      {
        "x": 14,
        "y": 7
      },
      {
        "x": 15,
        "y": 7
      },
      {
        "x": 16,
        "y": 7
      },
      {
        "x": 5,
        "y": 8
      },
      {
        "x": 6,
        "y": 8
      },
      {
        "x": 7,
        "y": 8
      },
      {
        "x": 8,
        "y": 8
      },
      {
        "x": 9,
        "y": 8
      },
      {
        "x": 10,
        "y": 8
      },
      {
        "x": 11,
        "y": 8
      },
      {
        "x": 12,
        "y": 8
      },
      {
        "x": 13,
        "y": 8
      },
      {
        "x": 14,
        "y": 8
      },
      {
        "x": 15,
        "y": 8
      },
      {
        "x": 16,
        "y": 8
      }
    ],
    "units": [],
    "npcs": [
      {
        "id": "Paladin Curli",
        "x": 6,
        "y": 15
      },
      {
        "id": "banker-goldbeard",
        "x": 15,
        "y": 10
      },
      {
        "id": "wizard-greylock",
        "x": 11,
        "y": 18
      },
      {
        "id": "pariah-blackbraid",
        "x": 18,
        "y": 14
      },
      {
        "id": "apprentice-chinstubble",
        "x": 19,
        "y": 13
      },
      {
        "id": "blacksmith-rockstone",
        "x": 19,
        "y": 18
      },
      {
        "id": "tailor-fullbush",
        "x": 25,
        "y": 18
      },
      {
        "id": "thane-whiterock",
        "x": 10,
        "y": 9
      },
      {
        "id": "thanes-hand-ironsteel",
        "x": 11,
        "y": 10
      },
      {
        "id": "mistress-of-whispers-firecrotch",
        "x": 9,
        "y": 10
      },
      {
        "id": "ambassador-dichard",
        "x": 9,
        "y": 12
      },
      {
        "id": "huntsman-flintstein",
        "x": 20,
        "y": 27
      },
      {
        "id": "sybil-ladybeard",
        "x": 16,
        "y": 21
      }
    ],
    "features": [
      {
        "sprite": "./assets/sprites/props/anvil.png",
        "x": 22,
        "y": 18,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/smelting-furnace.png",
        "x": 18,
        "y": 18,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/bed.png",
        "x": 24,
        "y": 27,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/crafting-table.png",
        "x": 19,
        "y": 26,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/dress-form-mannequin.png",
        "x": 26,
        "y": 18,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/loom.png",
        "x": 24,
        "y": 18,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/table.png",
        "x": 26,
        "y": 27,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/potionmaking-table.png",
        "x": 10,
        "y": 18,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/tanning-drum.png",
        "x": 21,
        "y": 26,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/anvil.png",
        "x": 22,
        "y": 19,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/art-deco-stone-column.png",
        "x": 13,
        "y": 21,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/art-deco-stone-column.png",
        "x": 17,
        "y": 21,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/art-deco-stone-column.png",
        "x": 14,
        "y": 17,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/art-deco-stone-column.png",
        "x": 16,
        "y": 17,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/art-deco-stone-column.png",
        "x": 14,
        "y": 13,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/art-deco-stone-column.png",
        "x": 16,
        "y": 13,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/art-deco-stone-column.png",
        "x": 24,
        "y": 13,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/art-deco-stone-column.png",
        "x": 26,
        "y": 13,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/art-deco-stone-column.png",
        "x": 24,
        "y": 15,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/art-deco-stone-column.png",
        "x": 26,
        "y": 15,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/art-deco-stone-column.png",
        "x": 14,
        "y": 10,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/art-deco-stone-column.png",
        "x": 16,
        "y": 10,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/art-deco-stone-column.png",
        "x": 14,
        "y": 11,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/art-deco-stone-column.png",
        "x": 16,
        "y": 11,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/art-deco-stone-column.png",
        "x": 14,
        "y": 14,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/art-deco-stone-column.png",
        "x": 16,
        "y": 14,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/art-deco-stone-column.png",
        "x": 14,
        "y": 16,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/art-deco-stone-column.png",
        "x": 16,
        "y": 16,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/art-deco-stone-column.png",
        "x": 16,
        "y": 15,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/dwarf-statue.png",
        "x": 14,
        "y": 22,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/dwarf-statue.png",
        "x": 16,
        "y": 22,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/dwarf-statue.png",
        "x": 5,
        "y": 15,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/dwarf-statue.png",
        "x": 7,
        "y": 15,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/dwarf-statue.png",
        "x": 5,
        "y": 17,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/dwarf-statue.png",
        "x": 7,
        "y": 17,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/ice-crystal-outcrop.png",
        "x": 12,
        "y": 18,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/potionmaking-table.png",
        "x": 18,
        "y": 13,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/dwarf-statue.png",
        "x": 9,
        "y": 9,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/dwarf-statue.png",
        "x": 11,
        "y": 9,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/art-deco-stone-column.png",
        "x": 9,
        "y": 11,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/art-deco-stone-column.png",
        "x": 11,
        "y": 11,
        "size": 96,
        "obstacle": true
      }
    ],
    "spawnTable": []
  },
  {
    "id": "ashmyr-khazit",
    "name": "Ashmyr Khazit",
    "cellSize": 128,
    "width": 40,
    "height": 40,
    "wallTexture": "./assets/ground/whisperspring-wall.png",
    "entrance": {
      "x": 0,
      "y": 0
    },
    "cells": [
      {
        "x": 18,
        "y": 28,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-se"
      },
      {
        "x": 19,
        "y": 28,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 28,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-sw"
      },
      {
        "x": 17,
        "y": 29,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-se"
      },
      {
        "x": 18,
        "y": 29,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 29,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 29,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 21,
        "y": 29,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-sw"
      },
      {
        "x": 16,
        "y": 30,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-se"
      },
      {
        "x": 17,
        "y": 30,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 30,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 30,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 30,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 21,
        "y": 30,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 22,
        "y": 30,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-sw"
      },
      {
        "x": 15,
        "y": 31,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-se"
      },
      {
        "x": 16,
        "y": 31,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 17,
        "y": 31,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 31,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 31,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 31,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 21,
        "y": 31,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 22,
        "y": 31,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 23,
        "y": 31,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-sw"
      },
      {
        "x": 15,
        "y": 32,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 16,
        "y": 32,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 17,
        "y": 32,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 32,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 32,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 32,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 21,
        "y": 32,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 22,
        "y": 32,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 23,
        "y": 32,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 15,
        "y": 33,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-ne"
      },
      {
        "x": 16,
        "y": 33,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 17,
        "y": 33,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 33,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 33,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 33,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 21,
        "y": 33,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 22,
        "y": 33,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 23,
        "y": 33,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-nw"
      },
      {
        "x": 16,
        "y": 34,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-ne"
      },
      {
        "x": 17,
        "y": 34,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 18,
        "y": 34,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 34,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 34,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 21,
        "y": 34,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 22,
        "y": 34,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-nw"
      },
      {
        "x": 17,
        "y": 35,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-ne"
      },
      {
        "x": 18,
        "y": 35,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 35,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 20,
        "y": 35,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 21,
        "y": 35,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "diag-nw"
      },
      {
        "x": 19,
        "y": 36,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 37,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 38,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      },
      {
        "x": 19,
        "y": 39,
        "texture": "./assets/ground/grey-tiles.png",
        "brush": "square"
      }
    ],
    "water": [],
    "lava": [
      {
        "x": 19,
        "y": 30
      },
      {
        "x": 18,
        "y": 31
      },
      {
        "x": 19,
        "y": 31
      },
      {
        "x": 20,
        "y": 31
      },
      {
        "x": 17,
        "y": 32
      },
      {
        "x": 18,
        "y": 32
      },
      {
        "x": 19,
        "y": 32
      },
      {
        "x": 20,
        "y": 32
      },
      {
        "x": 21,
        "y": 32
      },
      {
        "x": 18,
        "y": 33
      },
      {
        "x": 19,
        "y": 33
      },
      {
        "x": 20,
        "y": 33
      },
      {
        "x": 19,
        "y": 34
      }
    ],
    "units": [],
    "npcs": [],
    "features": [],
    "spawnTable": []
  },
  {
    "id": "badgeria",
    "name": "Badgeria",
    "cellSize": 128,
    "width": 16,
    "height": 32,
    "wallTexture": "./assets/ground/rat-den.png",
    "entrance": {
      "x": 7,
      "y": 31
    },
    "cells": [
      {
        "x": 3,
        "y": 0,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-se"
      },
      {
        "x": 4,
        "y": 0,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 0,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-sw"
      },
      {
        "x": 3,
        "y": 1,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 4,
        "y": 1,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 1,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 3,
        "y": 2,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 4,
        "y": 2,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 2,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 3,
        "y": 3,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-ne"
      },
      {
        "x": 4,
        "y": 3,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 3,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-nw"
      },
      {
        "x": 4,
        "y": 4,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 9,
        "y": 4,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-se"
      },
      {
        "x": 10,
        "y": 4,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 4,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-sw"
      },
      {
        "x": 4,
        "y": 5,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 8,
        "y": 5,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-se"
      },
      {
        "x": 9,
        "y": 5,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 5,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 5,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 12,
        "y": 5,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-sw"
      },
      {
        "x": 4,
        "y": 6,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 7,
        "y": 6,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-se"
      },
      {
        "x": 8,
        "y": 6,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 9,
        "y": 6,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 6,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 6,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 12,
        "y": 6,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 6,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-sw"
      },
      {
        "x": 2,
        "y": 7,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-se"
      },
      {
        "x": 3,
        "y": 7,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 4,
        "y": 7,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 7,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 7,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 7,
        "y": 7,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 8,
        "y": 7,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 9,
        "y": 7,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 7,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 7,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 12,
        "y": 7,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 7,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 2,
        "y": 8,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 7,
        "y": 8,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-ne"
      },
      {
        "x": 8,
        "y": 8,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 9,
        "y": 8,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 8,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 8,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 12,
        "y": 8,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 8,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-nw"
      },
      {
        "x": 2,
        "y": 9,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 8,
        "y": 9,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-ne"
      },
      {
        "x": 9,
        "y": 9,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 9,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 9,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 12,
        "y": 9,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-nw"
      },
      {
        "x": 2,
        "y": 10,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 9,
        "y": 10,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-ne"
      },
      {
        "x": 10,
        "y": 10,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 10,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-nw"
      },
      {
        "x": 2,
        "y": 11,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 11,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-se"
      },
      {
        "x": 6,
        "y": 11,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 7,
        "y": 11,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-sw"
      },
      {
        "x": 10,
        "y": 11,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 11,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-se"
      },
      {
        "x": 14,
        "y": 11,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-sw"
      },
      {
        "x": 2,
        "y": 12,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-ne"
      },
      {
        "x": 3,
        "y": 12,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 4,
        "y": 12,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 12,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 12,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 7,
        "y": 12,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 12,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 12,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 12,
        "y": 12,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 12,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 12,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 13,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-ne"
      },
      {
        "x": 6,
        "y": 13,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 7,
        "y": 13,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-nw"
      },
      {
        "x": 10,
        "y": 13,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 13,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-ne"
      },
      {
        "x": 14,
        "y": 13,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-nw"
      },
      {
        "x": 10,
        "y": 14,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 15,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-se"
      },
      {
        "x": 7,
        "y": 15,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 8,
        "y": 15,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 9,
        "y": 15,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 15,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-nw"
      },
      {
        "x": 12,
        "y": 15,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-se"
      },
      {
        "x": 13,
        "y": 15,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-sw"
      },
      {
        "x": 1,
        "y": 16,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 2,
        "y": 16,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 16,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 16,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-se"
      },
      {
        "x": 12,
        "y": 16,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 16,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 16,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-sw"
      },
      {
        "x": 1,
        "y": 17,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 2,
        "y": 17,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 3,
        "y": 17,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 4,
        "y": 17,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 17,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 17,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 17,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-ne"
      },
      {
        "x": 12,
        "y": 17,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 17,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 17,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-nw"
      },
      {
        "x": 1,
        "y": 18,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 2,
        "y": 18,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 18,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 12,
        "y": 18,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 18,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 19,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 12,
        "y": 19,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 19,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 20,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-se"
      },
      {
        "x": 6,
        "y": 20,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 7,
        "y": 20,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-sw"
      },
      {
        "x": 11,
        "y": 20,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-se"
      },
      {
        "x": 12,
        "y": 20,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 20,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 20,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-sw"
      },
      {
        "x": 2,
        "y": 21,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-se"
      },
      {
        "x": 3,
        "y": 21,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 4,
        "y": 21,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 21,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 21,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 7,
        "y": 21,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 8,
        "y": 21,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 9,
        "y": 21,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 21,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 11,
        "y": 21,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 12,
        "y": 21,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 21,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 21,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 2,
        "y": 22,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 22,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-ne"
      },
      {
        "x": 6,
        "y": 22,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 7,
        "y": 22,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-nw"
      },
      {
        "x": 11,
        "y": 22,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-ne"
      },
      {
        "x": 12,
        "y": 22,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 13,
        "y": 22,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 14,
        "y": 22,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-nw"
      },
      {
        "x": 2,
        "y": 23,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 1,
        "y": 24,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-se"
      },
      {
        "x": 2,
        "y": 24,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 3,
        "y": 24,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-sw"
      },
      {
        "x": 1,
        "y": 25,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 2,
        "y": 25,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 3,
        "y": 25,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 4,
        "y": 25,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 5,
        "y": 25,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 6,
        "y": 25,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 7,
        "y": 25,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 8,
        "y": 25,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 9,
        "y": 25,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 25,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-sw"
      },
      {
        "x": 1,
        "y": 26,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-ne"
      },
      {
        "x": 2,
        "y": 26,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 3,
        "y": 26,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-nw"
      },
      {
        "x": 10,
        "y": 26,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 27,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 7,
        "y": 28,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-se"
      },
      {
        "x": 8,
        "y": 28,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 9,
        "y": 28,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 10,
        "y": 28,
        "texture": "./assets/ground/rat-den.png",
        "brush": "curve-nw"
      },
      {
        "x": 7,
        "y": 29,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 7,
        "y": 30,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      },
      {
        "x": 7,
        "y": 31,
        "texture": "./assets/ground/rat-den.png",
        "brush": "square"
      }
    ],
    "water": [
      {
        "x": 9,
        "y": 6
      },
      {
        "x": 10,
        "y": 6
      },
      {
        "x": 11,
        "y": 6
      },
      {
        "x": 9,
        "y": 7
      },
      {
        "x": 10,
        "y": 7
      },
      {
        "x": 11,
        "y": 7
      },
      {
        "x": 9,
        "y": 8
      },
      {
        "x": 10,
        "y": 8
      },
      {
        "x": 11,
        "y": 8
      }
    ],
    "lava": [],
    "units": [
      {
        "name": "Badgeri",
        "x": 5,
        "y": 20,
        "level": 1,
        "elite": false,
        "boss": false
      },
      {
        "name": "Badgeri",
        "x": 5,
        "y": 22,
        "level": 1,
        "elite": false,
        "boss": false
      },
      {
        "name": "Badgeri",
        "x": 7,
        "y": 20,
        "level": 1,
        "elite": false,
        "boss": false
      },
      {
        "name": "Badgeri",
        "x": 7,
        "y": 22,
        "level": 1,
        "elite": false,
        "boss": false
      },
      {
        "name": "Badgeri Bruiser",
        "x": 12,
        "y": 20,
        "level": 1,
        "elite": false,
        "boss": false
      },
      {
        "name": "Badgeri Bruiser",
        "x": 12,
        "y": 22,
        "level": 1,
        "elite": false,
        "boss": false
      },
      {
        "name": "Badgeri Bruiser",
        "x": 13,
        "y": 21,
        "level": 1,
        "elite": false,
        "boss": false
      },
      {
        "name": "Badgeri",
        "x": 12,
        "y": 17,
        "level": 1,
        "elite": false,
        "boss": false
      },
      {
        "name": "Badgeri",
        "x": 13,
        "y": 17,
        "level": 1,
        "elite": false,
        "boss": false
      },
      {
        "name": "Badgeri Shaman",
        "x": 12,
        "y": 16,
        "level": 1,
        "elite": false,
        "boss": false
      },
      {
        "name": "Badgeri Shaman",
        "x": 13,
        "y": 16,
        "level": 1,
        "elite": false,
        "boss": false
      },
      {
        "name": "Badgeri Shaman",
        "x": 10,
        "y": 9,
        "level": 1,
        "elite": false,
        "boss": false
      },
      {
        "name": "Badgeri Shaman",
        "x": 8,
        "y": 7,
        "level": 1,
        "elite": false,
        "boss": false
      },
      {
        "name": "Badgeri Shaman",
        "x": 12,
        "y": 7,
        "level": 1,
        "elite": false,
        "boss": false
      },
      {
        "name": "Badgeri Shaman",
        "x": 10,
        "y": 5,
        "level": 1,
        "elite": false,
        "boss": false
      },
      {
        "name": "Badgeri Bruiser",
        "x": 11,
        "y": 9,
        "level": 1,
        "elite": false,
        "boss": false
      },
      {
        "name": "Badgeri Bruiser",
        "x": 12,
        "y": 6,
        "level": 1,
        "elite": false,
        "boss": false
      },
      {
        "name": "Badgeri Bruiser",
        "x": 8,
        "y": 8,
        "level": 1,
        "elite": false,
        "boss": false
      },
      {
        "name": "Badgeri Bruiser",
        "x": 9,
        "y": 5,
        "level": 1,
        "elite": false,
        "boss": false
      },
      {
        "name": "Badgeri Bruiser",
        "x": 3,
        "y": 2,
        "level": 1,
        "elite": false,
        "boss": false
      },
      {
        "name": "Badgeri Bruiser",
        "x": 5,
        "y": 2,
        "level": 1,
        "elite": false,
        "boss": false
      },
      {
        "name": "Badgeri Bruiser",
        "x": 3,
        "y": 1,
        "level": 1,
        "elite": false,
        "boss": false
      },
      {
        "name": "Badgeri Shaman",
        "x": 5,
        "y": 1,
        "level": 1,
        "elite": false,
        "boss": false
      }
    ],
    "npcs": [
      {
        "id": "chief-snautch",
        "x": 4,
        "y": 1
      },
      {
        "id": "snuffkie",
        "x": 1,
        "y": 17
      },
      {
        "id": "otachi",
        "x": 2,
        "y": 25
      }
    ],
    "features": [
      {
        "sprite": "./assets/sprites/props/bed.png",
        "x": 2,
        "y": 26,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/bed.png",
        "x": 14,
        "y": 12,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/bed.png",
        "x": 1,
        "y": 18,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/bed.png",
        "x": 6,
        "y": 11,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/table.png",
        "x": 1,
        "y": 16,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/table.png",
        "x": 1,
        "y": 25,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/table.png",
        "x": 6,
        "y": 13,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/table.png",
        "x": 14,
        "y": 11,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/red-boulder.png",
        "x": 6,
        "y": 21,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/red-boulder.png",
        "x": 10,
        "y": 7,
        "size": 96,
        "obstacle": true
      },
      {
        "sprite": "./assets/sprites/props/ancient-tree.png",
        "x": 4,
        "y": 0,
        "size": 96,
        "obstacle": true
      }
    ],
    "spawnTable": [
      {
        "name": "Badgeri",
        "frequency": 12,
        "minLvl": 6
      },
      {
        "name": "Badgeri Bruiser",
        "frequency": 6,
        "minLvl": 7
      },
      {
        "name": "Badgeri Shaman",
        "frequency": 4,
        "minLvl": 6
      }
    ]
  }
];

const devCraftingRecipes = {
  "Smithing": [
    {
      "name": "Bronze Ingot",
      "station": "Smelting",
      "output": "Bronze Ingot",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Copper Ore",
          "quantity": 2
        }
      ],
      "level": 1,
      "xp": 10,
      "soundEffect": "./assets/audio/slash.wav"
    },
    {
      "name": "Iron Ingot",
      "station": "Smelting",
      "output": "Iron Ingot",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Iron Ore",
          "quantity": 2
        }
      ],
      "level": 3,
      "xp": 30,
      "soundEffect": "./assets/audio/slash.wav"
    },
    {
      "name": "Silver Ingot",
      "station": "Smelting",
      "output": "Silver Ingot",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Nugget",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 10,
      "soundEffect": "./assets/audio/slash.wav"
    },
    {
      "name": "Gold Ingot",
      "station": "Smelting",
      "output": "Gold Ingot",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Nugget",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 10,
      "soundEffect": "./assets/audio/slash.wav"
    },
    {
      "name": "Bronze Chainmail Boots",
      "station": "Smithing",
      "output": "Bronze Chainmail Boots",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Bronze Ingot",
          "quantity": 2
        }
      ],
      "level": 2,
      "xp": 60,
      "soundEffect": "./assets/audio/slash.wav"
    },
    {
      "name": "Bronze Chainmail Coif",
      "station": "Smithing",
      "output": "Bronze Chainmail Coif",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Bronze Ingot",
          "quantity": 2
        }
      ],
      "level": 2,
      "xp": 60,
      "soundEffect": "./assets/audio/slash.wav"
    },
    {
      "name": "Bronze Chainmail Pauldrons",
      "station": "Smithing",
      "output": "Bronze Chainmail Pauldrons",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Bronze Ingot",
          "quantity": 2
        }
      ],
      "level": 2,
      "xp": 60,
      "soundEffect": "./assets/audio/slash.wav"
    },
    {
      "name": "Bronze Mace",
      "station": "Smithing",
      "output": "Bronze Mace",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Bronze Ingot",
          "quantity": 2
        }
      ],
      "level": 2,
      "xp": 60,
      "soundEffect": "./assets/audio/slash.wav"
    },
    {
      "name": "Bronze Shortsword",
      "station": "Smithing",
      "output": "Bronze Shortsword",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Bronze Ingot",
          "quantity": 2
        }
      ],
      "level": 2,
      "xp": 60,
      "soundEffect": "./assets/audio/slash.wav"
    },
    {
      "name": "Bronze Battleaxe",
      "station": "Smithing",
      "output": "Bronze Battleaxe",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Bronze Ingot",
          "quantity": 2
        }
      ],
      "level": 2,
      "xp": 60,
      "soundEffect": "./assets/audio/slash.wav"
    },
    {
      "name": "Bronze Spear",
      "station": "Smithing",
      "output": "Bronze Spear",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Bronze Ingot",
          "quantity": 2
        }
      ],
      "level": 2,
      "xp": 60,
      "soundEffect": "./assets/audio/slash.wav"
    },
    {
      "name": "Bronze Longsword",
      "station": "Smithing",
      "output": "Bronze Longsword",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Bronze Ingot",
          "quantity": 3
        }
      ],
      "level": 3,
      "xp": 80,
      "soundEffect": "./assets/audio/slash.wav"
    },
    {
      "name": "Bronze Shield",
      "station": "Smithing",
      "output": "Bronze Shield",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Bronze Ingot",
          "quantity": 3
        }
      ],
      "level": 3,
      "xp": 80,
      "soundEffect": "./assets/audio/slash.wav"
    },
    {
      "name": "Bronze Chainmail Vest",
      "station": "Smithing",
      "output": "Bronze Chainmail Vest",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Bronze Ingot",
          "quantity": 3
        }
      ],
      "level": 3,
      "xp": 80,
      "soundEffect": "./assets/audio/slash.wav"
    },
    {
      "name": "Bronze Chainmail Pants",
      "station": "Smithing",
      "output": "Bronze Chainmail Pants",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Bronze Ingot",
          "quantity": 3
        }
      ],
      "level": 3,
      "xp": 80,
      "soundEffect": "./assets/audio/slash.wav"
    },
    {
      "name": "Bronze Chainmail Gloves",
      "station": "Smithing",
      "output": "Bronze Chainmail Gloves",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Bronze Ingot",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 30,
      "soundEffect": "./assets/audio/slash.wav"
    },
    {
      "name": "Bronze Chainmail Bracer",
      "station": "Smithing",
      "output": "Bronze Chainmail Bracer",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Bronze Ingot",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 30,
      "soundEffect": "./assets/audio/slash.wav"
    },
    {
      "name": "Bronze Dagger",
      "station": "Smithing",
      "output": "Bronze Dagger",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Bronze Ingot",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 30,
      "soundEffect": "./assets/audio/slash.wav"
    }
  ],
  "Leatherworking": [
    {
      "name": "Rat Leather",
      "station": "Tanning",
      "output": "Tanned Leather",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Rat Pelt",
          "quantity": 6
        }
      ],
      "level": 1,
      "xp": 10,
      "soundEffect": "./assets/audio/turn-page.wav"
    },
    {
      "name": "Mustelid Leather",
      "station": "Tanning",
      "output": "Tanned Leather",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Mustelid Pelt",
          "quantity": 4
        }
      ],
      "level": 1,
      "xp": 10,
      "soundEffect": "./assets/audio/turn-page.wav"
    },
    {
      "name": "Wolf Leather",
      "station": "Tanning",
      "output": "Tanned Leather",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Wolf Pelt",
          "quantity": 2
        }
      ],
      "level": 1,
      "xp": 10,
      "soundEffect": "./assets/audio/turn-page.wav"
    },
    {
      "name": "Snow Leopard Leather",
      "station": "Tanning",
      "output": "Tanned Leather",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Snow Leopard Pelt",
          "quantity": 2
        }
      ],
      "level": 1,
      "xp": 10,
      "soundEffect": "./assets/audio/turn-page.wav"
    },
    {
      "name": "Bear Leather",
      "station": "Tanning",
      "output": "Tanned Leather",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Bear Pelt",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 10,
      "soundEffect": "./assets/audio/turn-page.wav"
    },
    {
      "name": "Buckskin Leather",
      "station": "Tanning",
      "output": "Tanned Leather",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Deer Hide",
          "quantity": 4
        }
      ],
      "level": 1,
      "xp": 10,
      "soundEffect": "./assets/audio/turn-page.wav"
    },
    {
      "name": "White Stag Leather",
      "station": "Tanning",
      "output": "Mystic White Leather",
      "quantity": 1,
      "ingredients": [
        {
          "item": "White Deer Hide",
          "quantity": 2
        }
      ],
      "level": 5,
      "xp": 50,
      "soundEffect": "./assets/audio/turn-page.wav"
    },
    {
      "name": "Leather Gloves",
      "station": "Crafting Table",
      "output": "Leather Gloves",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Tanned Leather",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 30,
      "soundEffect": "./assets/audio/slash.wav"
    },
    {
      "name": "Leather Belt",
      "station": "Crafting Table",
      "output": "Leather Belt",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Tanned Leather",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 30,
      "soundEffect": "./assets/audio/slash.wav"
    },
    {
      "name": "Leather Bracer",
      "station": "Crafting Table",
      "output": "Leather Bracer",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Tanned Leather",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 30,
      "soundEffect": "./assets/audio/slash.wav"
    },
    {
      "name": "Leather Boots",
      "station": "Crafting Table",
      "output": "Leather Boots",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Tanned Leather",
          "quantity": 2
        }
      ],
      "level": 2,
      "xp": 60,
      "soundEffect": "./assets/audio/slash.wav"
    },
    {
      "name": "Leather Hood",
      "station": "Crafting Table",
      "output": "Leather Hood",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Tanned Leather",
          "quantity": 2
        }
      ],
      "level": 2,
      "xp": 60,
      "soundEffect": "./assets/audio/slash.wav"
    },
    {
      "name": "Leather Pauldrons",
      "station": "Crafting Table",
      "output": "Leather Pauldrons",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Tanned Leather",
          "quantity": 2
        }
      ],
      "level": 2,
      "xp": 60,
      "soundEffect": "./assets/audio/slash.wav"
    },
    {
      "name": "Leather Pants",
      "station": "Crafting Table",
      "output": "Leather Pants",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Tanned Leather",
          "quantity": 3
        }
      ],
      "level": 3,
      "xp": 80,
      "soundEffect": "./assets/audio/slash.wav"
    },
    {
      "name": "Leather Breastplate",
      "station": "Crafting Table",
      "output": "Leather Breastplate",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Tanned Leather",
          "quantity": 3
        }
      ],
      "level": 3,
      "xp": 80,
      "soundEffect": "./assets/audio/slash.wav"
    }
  ],
  "Tailoring": [
    {
      "name": "Bolt of Spidersilk Cloth",
      "station": "Loom",
      "output": "Bolt of Spidersilk Cloth",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Spider Silk",
          "quantity": 2
        }
      ],
      "level": 1,
      "xp": 10,
      "soundEffect": "./assets/audio/tangle-vines.wav"
    },
    {
      "name": "Bolt of Eldweave Cloth",
      "station": "Loom",
      "output": "Bolt of Eldweave Cloth",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Eldweave Fiber",
          "quantity": 2
        }
      ],
      "level": 1,
      "xp": 50,
      "soundEffect": "./assets/audio/tangle-vines.wav"
    },
    {
      "name": "Spidersilk Shoulderpads",
      "station": "Dress Form Mannequin",
      "output": "Spidersilk Shoulderpads",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Bolt of Spidersilk Cloth",
          "quantity": 2
        }
      ],
      "level": 2,
      "xp": 60,
      "soundEffect": "./assets/audio/tangle-vines.wav"
    },
    {
      "name": "Spidersilk Cowl",
      "station": "Dress Form Mannequin",
      "output": "Spidersilk Cowl",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Bolt of Spidersilk Cloth",
          "quantity": 2
        }
      ],
      "level": 2,
      "xp": 60,
      "soundEffect": "./assets/audio/tangle-vines.wav"
    },
    {
      "name": "Spidersilk Pants",
      "station": "Dress Form Mannequin",
      "output": "Spidersilk Pants",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Bolt of Spidersilk Cloth",
          "quantity": 3
        }
      ],
      "level": 3,
      "xp": 80,
      "soundEffect": "./assets/audio/tangle-vines.wav"
    },
    {
      "name": "Spidersilk Shirt",
      "station": "Dress Form Mannequin",
      "output": "Spidersilk Shirt",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Bolt of Spidersilk Cloth",
          "quantity": 3
        }
      ],
      "level": 3,
      "xp": 80,
      "soundEffect": "./assets/audio/tangle-vines.wav"
    },
    {
      "name": "Spidersilk Robe",
      "station": "Dress Form Mannequin",
      "output": "Spidersilk Robe",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Bolt of Spidersilk Cloth",
          "quantity": 4
        }
      ],
      "level": 4,
      "xp": 100,
      "soundEffect": "./assets/audio/tangle-vines.wav"
    },
    {
      "name": "Spidersilk Gloves",
      "station": "Dress Form Mannequin",
      "output": "Spidersilk Gloves",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Bolt of Spidersilk Cloth",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 30,
      "soundEffect": "./assets/audio/tangle-vines.wav"
    },
    {
      "name": "Spidersilk Slippers",
      "station": "Dress Form Mannequin",
      "output": "Spidersilk Slippers",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Bolt of Spidersilk Cloth",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 30,
      "soundEffect": "./assets/audio/tangle-vines.wav"
    },
    {
      "name": "Spidersilk Belt",
      "station": "Dress Form Mannequin",
      "output": "Spidersilk Belt",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Bolt of Spidersilk Cloth",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 30,
      "soundEffect": "./assets/audio/tangle-vines.wav"
    },
    {
      "name": "Small Bag",
      "station": "Dress Form Mannequin",
      "output": "Small Bag",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Bolt of Spidersilk Cloth",
          "quantity": 2
        }
      ],
      "level": 3,
      "xp": 0,
      "soundEffect": "./assets/audio/tangle-vines.wav"
    }
  ],
  "Alchemy": [
    {
      "name": "Healing Compound",
      "station": "Alchemy",
      "output": "Healing Compound",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Houndstongue",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 0,
      "soundEffect": ""
    }
  ],
  "Jewelry": [
    {
      "name": "Silver Ring",
      "station": "Crafting Table",
      "output": "Silver Ring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Ingot",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 30,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Silver Earring",
      "station": "Crafting Table",
      "output": "Silver Earring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Ingot",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 30,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Silver Necklace",
      "station": "Crafting Table",
      "output": "Silver Necklace",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Ingot",
          "quantity": 2
        }
      ],
      "level": 2,
      "xp": 60,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Silver Bracelet",
      "station": "Crafting Table",
      "output": "Silver Bracelet",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Ingot",
          "quantity": 2
        }
      ],
      "level": 2,
      "xp": 60,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Diamond Necklace",
      "station": "Crafting Table",
      "output": "Diamond Necklace",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Necklace",
          "quantity": 1
        },
        {
          "item": "Diamond",
          "quantity": 1
        }
      ],
      "level": 2,
      "xp": 120,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Gold Diamond Necklace",
      "station": "Crafting Table",
      "output": "Gold Diamond Necklace",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Necklace",
          "quantity": 1
        },
        {
          "item": "Diamond",
          "quantity": 1
        }
      ],
      "level": 5,
      "xp": 240,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Ruby Necklace",
      "station": "Crafting Table",
      "output": "Ruby Necklace",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Necklace",
          "quantity": 1
        },
        {
          "item": "Ruby",
          "quantity": 1
        }
      ],
      "level": 2,
      "xp": 120,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Gold Ruby Necklace",
      "station": "Crafting Table",
      "output": "Gold Ruby Necklace",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Necklace",
          "quantity": 1
        },
        {
          "item": "Ruby",
          "quantity": 1
        }
      ],
      "level": 5,
      "xp": 240,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Sapphire Necklace",
      "station": "Crafting Table",
      "output": "Sapphire Necklace",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Necklace",
          "quantity": 1
        },
        {
          "item": "Sapphire",
          "quantity": 1
        }
      ],
      "level": 2,
      "xp": 120,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Gold Sapphire Necklace",
      "station": "Crafting Table",
      "output": "Gold Sapphire Necklace",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Necklace",
          "quantity": 1
        },
        {
          "item": "Sapphire",
          "quantity": 1
        }
      ],
      "level": 5,
      "xp": 240,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Emerald Necklace",
      "station": "Crafting Table",
      "output": "Emerald Necklace",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Necklace",
          "quantity": 1
        },
        {
          "item": "Emerald",
          "quantity": 1
        }
      ],
      "level": 2,
      "xp": 120,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Gold Emerald Necklace",
      "station": "Crafting Table",
      "output": "Gold Emerald Necklace",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Necklace",
          "quantity": 1
        },
        {
          "item": "Emerald",
          "quantity": 1
        }
      ],
      "level": 5,
      "xp": 240,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Amethyst Necklace",
      "station": "Crafting Table",
      "output": "Amethyst Necklace",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Necklace",
          "quantity": 1
        },
        {
          "item": "Amethyst",
          "quantity": 1
        }
      ],
      "level": 2,
      "xp": 120,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Gold Amethyst Necklace",
      "station": "Crafting Table",
      "output": "Gold Amethyst Necklace",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Necklace",
          "quantity": 1
        },
        {
          "item": "Amethyst",
          "quantity": 1
        }
      ],
      "level": 5,
      "xp": 240,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Opal Necklace",
      "station": "Crafting Table",
      "output": "Opal Necklace",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Necklace",
          "quantity": 1
        },
        {
          "item": "Opal",
          "quantity": 1
        }
      ],
      "level": 2,
      "xp": 120,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Gold Opal Necklace",
      "station": "Crafting Table",
      "output": "Gold Opal Necklace",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Necklace",
          "quantity": 1
        },
        {
          "item": "Opal",
          "quantity": 1
        }
      ],
      "level": 5,
      "xp": 240,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Onyx Necklace",
      "station": "Crafting Table",
      "output": "Onyx Necklace",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Necklace",
          "quantity": 1
        },
        {
          "item": "Onyx",
          "quantity": 1
        }
      ],
      "level": 2,
      "xp": 120,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Gold Onyx Necklace",
      "station": "Crafting Table",
      "output": "Gold Onyx Necklace",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Necklace",
          "quantity": 1
        },
        {
          "item": "Onyx",
          "quantity": 1
        }
      ],
      "level": 5,
      "xp": 240,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Aquamarine Necklace",
      "station": "Crafting Table",
      "output": "Aquamarine Necklace",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Necklace",
          "quantity": 1
        },
        {
          "item": "Aquamarine",
          "quantity": 1
        }
      ],
      "level": 2,
      "xp": 120,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Gold Aquamarine Necklace",
      "station": "Crafting Table",
      "output": "Gold Aquamarine Necklace",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Necklace",
          "quantity": 1
        },
        {
          "item": "Aquamarine",
          "quantity": 1
        }
      ],
      "level": 5,
      "xp": 240,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Aquamarine Bracelet",
      "station": "Crafting Table",
      "output": "Aquamarine Bracelet",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Bracelet",
          "quantity": 1
        },
        {
          "item": "Aquamarine",
          "quantity": 1
        }
      ],
      "level": 2,
      "xp": 120,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Gold Aquamarine Bracelet",
      "station": "Crafting Table",
      "output": "Gold Aquamarine Bracelet",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Bracelet",
          "quantity": 1
        },
        {
          "item": "Aquamarine",
          "quantity": 1
        }
      ],
      "level": 5,
      "xp": 240,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Diamond Bracelet",
      "station": "Crafting Table",
      "output": "Diamond Bracelet",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Bracelet",
          "quantity": 1
        },
        {
          "item": "Diamond",
          "quantity": 1
        }
      ],
      "level": 2,
      "xp": 120,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Gold Diamond Bracelet",
      "station": "Crafting Table",
      "output": "Gold Diamond Bracelet",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Bracelet",
          "quantity": 1
        },
        {
          "item": "Diamond",
          "quantity": 1
        }
      ],
      "level": 5,
      "xp": 240,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Ruby Bracelet",
      "station": "Crafting Table",
      "output": "Ruby Bracelet",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Bracelet",
          "quantity": 1
        },
        {
          "item": "Ruby",
          "quantity": 1
        }
      ],
      "level": 2,
      "xp": 120,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Gold Ruby Bracelet",
      "station": "Crafting Table",
      "output": "Gold Ruby Bracelet",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Bracelet",
          "quantity": 1
        },
        {
          "item": "Ruby",
          "quantity": 1
        }
      ],
      "level": 5,
      "xp": 240,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Sapphire Bracelet",
      "station": "Crafting Table",
      "output": "Sapphire Bracelet",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Bracelet",
          "quantity": 1
        },
        {
          "item": "Sapphire",
          "quantity": 1
        }
      ],
      "level": 2,
      "xp": 120,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Gold Sapphire Bracelet",
      "station": "Crafting Table",
      "output": "Gold Sapphire Bracelet",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Bracelet",
          "quantity": 1
        },
        {
          "item": "Sapphire",
          "quantity": 1
        }
      ],
      "level": 5,
      "xp": 240,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Emerald Bracelet",
      "station": "Crafting Table",
      "output": "Emerald Bracelet",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Bracelet",
          "quantity": 1
        },
        {
          "item": "Emerald",
          "quantity": 1
        }
      ],
      "level": 2,
      "xp": 120,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Gold Emerald Bracelet",
      "station": "Crafting Table",
      "output": "Gold Emerald Bracelet",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Bracelet",
          "quantity": 1
        },
        {
          "item": "Emerald",
          "quantity": 1
        }
      ],
      "level": 5,
      "xp": 240,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Amethyst Bracelet",
      "station": "Crafting Table",
      "output": "Amethyst Bracelet",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Bracelet",
          "quantity": 1
        },
        {
          "item": "Amethyst",
          "quantity": 1
        }
      ],
      "level": 2,
      "xp": 120,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Gold Amethyst Bracelet",
      "station": "Crafting Table",
      "output": "Gold Amethyst Bracelet",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Bracelet",
          "quantity": 1
        },
        {
          "item": "Amethyst",
          "quantity": 1
        }
      ],
      "level": 5,
      "xp": 240,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Onyx Bracelet",
      "station": "Crafting Table",
      "output": "Onyx Bracelet",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Bracelet",
          "quantity": 1
        },
        {
          "item": "Onyx",
          "quantity": 1
        }
      ],
      "level": 2,
      "xp": 120,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Gold Onyx Bracelet",
      "station": "Crafting Table",
      "output": "Gold Onyx Bracelet",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Bracelet",
          "quantity": 1
        },
        {
          "item": "Onyx",
          "quantity": 1
        }
      ],
      "level": 5,
      "xp": 240,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Opal Bracelet",
      "station": "Crafting Table",
      "output": "Opal Bracelet",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Bracelet",
          "quantity": 1
        },
        {
          "item": "Opal",
          "quantity": 1
        }
      ],
      "level": 2,
      "xp": 120,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Gold Opal Bracelet",
      "station": "Crafting Table",
      "output": "Gold Opal Bracelet",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Bracelet",
          "quantity": 1
        },
        {
          "item": "Opal",
          "quantity": 1
        }
      ],
      "level": 5,
      "xp": 240,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Gold Ring",
      "station": "Crafting Table",
      "output": "Gold Ring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Ingot",
          "quantity": 1
        }
      ],
      "level": 5,
      "xp": 90,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Gold Earring",
      "station": "Crafting Table",
      "output": "Gold Earring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Ingot",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 30,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Gold Necklace",
      "station": "Crafting Table",
      "output": "Gold Necklace",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Ingot",
          "quantity": 2
        }
      ],
      "level": 2,
      "xp": 60,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Gold Bracelet",
      "station": "Crafting Table",
      "output": "Gold Bracelet",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Ingot",
          "quantity": 2
        }
      ],
      "level": 2,
      "xp": 60,
      "soundEffect": "./assets/audio/stab.wav"
    },
    {
      "name": "Cut Diamond",
      "station": "Crafting Table",
      "output": "Diamond",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Uncut Diamond",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 30,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Cut Ruby",
      "station": "Crafting Table",
      "output": "Ruby",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Uncut Ruby",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 30,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Cut Sapphire",
      "station": "Crafting Table",
      "output": "Sapphire",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Uncut Sapphire",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 30,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Cut Emerald",
      "station": "Crafting Table",
      "output": "Emerald",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Uncut Emerald",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 30,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Cut Amethyst",
      "station": "Crafting Table",
      "output": "Amethyst",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Uncut Amethyst",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 30,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Cut Aquamarine",
      "station": "Crafting Table",
      "output": "Aquamarine",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Uncut Aquamarine",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 30,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Cut Onyx",
      "station": "Crafting Table",
      "output": "Onyx",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Uncut Onyx",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 30,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Cut Opal",
      "station": "Crafting Table",
      "output": "Opal",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Uncut Opal",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 30,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Diamond Ring",
      "station": "Crafting Table",
      "output": "Diamond Ring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Ring",
          "quantity": 1
        },
        {
          "item": "Diamond",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 60,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Gold Diamond Ring",
      "station": "Crafting Table",
      "output": "Gold Diamond Ring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Ring",
          "quantity": 1
        },
        {
          "item": "Diamond",
          "quantity": 1
        }
      ],
      "level": 4,
      "xp": 120,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Diamond Earring",
      "station": "Crafting Table",
      "output": "Diamond Earring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Earring",
          "quantity": 1
        },
        {
          "item": "Diamond",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 60,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Gold Diamond Earring",
      "station": "Crafting Table",
      "output": "Gold Diamond Earring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Earring",
          "quantity": 1
        },
        {
          "item": "Diamond",
          "quantity": 1
        }
      ],
      "level": 4,
      "xp": 120,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Ruby Ring",
      "station": "Crafting Table",
      "output": "Ruby Ring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Ring",
          "quantity": 1
        },
        {
          "item": "Ruby",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 60,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Gold Ruby Ring",
      "station": "Crafting Table",
      "output": "Gold Ruby Ring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Ring",
          "quantity": 1
        },
        {
          "item": "Ruby",
          "quantity": 1
        }
      ],
      "level": 4,
      "xp": 120,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Ruby Earring",
      "station": "Crafting Table",
      "output": "Ruby Earring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Earring",
          "quantity": 1
        },
        {
          "item": "Ruby",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 60,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Gold Ruby Earring",
      "station": "Crafting Table",
      "output": "Gold Ruby Earring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Earring",
          "quantity": 1
        },
        {
          "item": "Ruby",
          "quantity": 1
        }
      ],
      "level": 4,
      "xp": 120,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Emerald Earring",
      "station": "Crafting Table",
      "output": "Emerald Earring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Earring",
          "quantity": 1
        },
        {
          "item": "Emerald",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 60,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Gold Emerald Earring",
      "station": "Crafting Table",
      "output": "Gold Emerald Earring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Earring",
          "quantity": 1
        },
        {
          "item": "Emerald",
          "quantity": 1
        }
      ],
      "level": 4,
      "xp": 120,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Sapphire Earring",
      "station": "Crafting Table",
      "output": "Sapphire Earring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Earring",
          "quantity": 1
        },
        {
          "item": "Sapphire",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 60,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Gold Sapphire Earring",
      "station": "Crafting Table",
      "output": "Gold Sapphire Earring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Earring",
          "quantity": 1
        },
        {
          "item": "Sapphire",
          "quantity": 1
        }
      ],
      "level": 4,
      "xp": 120,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Amethyst Earring",
      "station": "Crafting Table",
      "output": "Amethyst Earring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Earring",
          "quantity": 1
        },
        {
          "item": "Amethyst",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 60,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Gold Amethyst Earring",
      "station": "Crafting Table",
      "output": "Gold Amethyst Earring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Earring",
          "quantity": 1
        },
        {
          "item": "Amethyst",
          "quantity": 1
        }
      ],
      "level": 4,
      "xp": 120,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Aquamarine Earring",
      "station": "Crafting Table",
      "output": "Aquamarine Earring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Earring",
          "quantity": 1
        },
        {
          "item": "Aquamarine",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 60,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Gold Aquamarine Earring",
      "station": "Crafting Table",
      "output": "Gold Aquamarine Earring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Earring",
          "quantity": 1
        },
        {
          "item": "Aquamarine",
          "quantity": 1
        }
      ],
      "level": 4,
      "xp": 120,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Onyx Earring",
      "station": "Crafting Table",
      "output": "Onyx Earring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Earring",
          "quantity": 1
        },
        {
          "item": "Onyx",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 60,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Gold Onyx Earring",
      "station": "Crafting Table",
      "output": "Gold Onyx Earring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Earring",
          "quantity": 1
        },
        {
          "item": "Onyx",
          "quantity": 1
        }
      ],
      "level": 4,
      "xp": 120,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Opal Earring",
      "station": "Crafting Table",
      "output": "Opal Earring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Earring",
          "quantity": 1
        },
        {
          "item": "Opal",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 60,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Gold Opal Earring",
      "station": "Crafting Table",
      "output": "Gold Opal Earring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Earring",
          "quantity": 1
        },
        {
          "item": "Opal",
          "quantity": 1
        }
      ],
      "level": 4,
      "xp": 120,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Sapphire Ring",
      "station": "Crafting Table",
      "output": "Sapphire Ring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Ring",
          "quantity": 1
        },
        {
          "item": "Sapphire",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 60,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Gold Sapphire Ring",
      "station": "Crafting Table",
      "output": "Gold Sapphire Ring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Ring",
          "quantity": 1
        },
        {
          "item": "Sapphire",
          "quantity": 1
        }
      ],
      "level": 4,
      "xp": 120,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Aquamarine Ring",
      "station": "Crafting Table",
      "output": "Aquamarine Ring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Ring",
          "quantity": 1
        },
        {
          "item": "Aquamarine",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 60,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Gold Aquamarine Ring",
      "station": "Crafting Table",
      "output": "Gold Aquamarine Ring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Ring",
          "quantity": 1
        },
        {
          "item": "Aquamarine",
          "quantity": 1
        }
      ],
      "level": 4,
      "xp": 120,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Emerald Ring",
      "station": "Crafting Table",
      "output": "Emerald Ring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Ring",
          "quantity": 1
        },
        {
          "item": "Emerald",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 60,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Gold Emerald Ring",
      "station": "Crafting Table",
      "output": "Gold Emerald Ring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Ring",
          "quantity": 1
        },
        {
          "item": "Emerald",
          "quantity": 1
        }
      ],
      "level": 4,
      "xp": 120,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Amethyst Ring",
      "station": "Crafting Table",
      "output": "Amethyst Ring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Ring",
          "quantity": 1
        },
        {
          "item": "Amethyst",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 60,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Gold Amethyst Ring",
      "station": "Crafting Table",
      "output": "Gold Amethyst Ring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Ring",
          "quantity": 1
        },
        {
          "item": "Amethyst",
          "quantity": 1
        }
      ],
      "level": 4,
      "xp": 120,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Onyx Ring",
      "station": "Crafting Table",
      "output": "Onyx Ring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Ring",
          "quantity": 1
        },
        {
          "item": "Onyx",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 60,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Gold Onyx Ring",
      "station": "Crafting Table",
      "output": "Gold Onyx Ring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Ring",
          "quantity": 1
        },
        {
          "item": "Onyx",
          "quantity": 1
        }
      ],
      "level": 4,
      "xp": 120,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Opal Ring",
      "station": "Crafting Table",
      "output": "Opal Ring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Silver Ring",
          "quantity": 1
        },
        {
          "item": "Opal",
          "quantity": 1
        }
      ],
      "level": 1,
      "xp": 60,
      "soundEffect": "./assets/audio/autocast-on.wav"
    },
    {
      "name": "Gold Opal Ring",
      "station": "Crafting Table",
      "output": "Gold Opal Ring",
      "quantity": 1,
      "ingredients": [
        {
          "item": "Gold Ring",
          "quantity": 1
        },
        {
          "item": "Opal",
          "quantity": 1
        }
      ],
      "level": 4,
      "xp": 120,
      "soundEffect": "./assets/audio/autocast-on.wav"
    }
  ]
};

const devFactionConfigs = [
  {
    "id": "badgeri",
    "name": "Badgeri",
    "enemyFactionIds": [
      "goblin",
      "barbarian"
    ]
  },
  {
    "id": "barbarian",
    "name": "Barbarian",
    "enemyFactionIds": [
      "badgeri",
      "corvari",
      "goblin"
    ]
  },
  {
    "id": "corvari",
    "name": "Corvari",
    "enemyFactionIds": [
      "goblin",
      "barbarian"
    ]
  },
  {
    "id": "fenguard",
    "name": "Fenguard",
    "enemyFactionIds": [
      "gandersguard"
    ]
  },
  {
    "id": "froglin",
    "name": "Froglin",
    "enemyFactionIds": [
      "gandersguard"
    ]
  },
  {
    "id": "gandersguard",
    "name": "Gandersguard",
    "enemyFactionIds": [
      "fenguard",
      "froglin",
      "goblin"
    ]
  },
  {
    "id": "goblin",
    "name": "Goblin",
    "enemyFactionIds": [
      "corvari",
      "gandersguard",
      "badgeri",
      "whiterock-dwarves",
      "barbarian"
    ]
  },
  {
    "id": "ratkin",
    "name": "Ratkin",
    "enemyFactionIds": []
  },
  {
    "id": "whiterock-dwarves",
    "name": "Whiterock Dwarves",
    "enemyFactionIds": [
      "goblin"
    ]
  }
];

window.SoulreaperWorldData = {
  areaSpawnTables,
  devAreaConfigs,
  devQuestConfigs,
  devNpcConfigs,
  devDungeonConfigs,
  devSpellConfigs,
  devCraftingRecipes,
  devFactionConfigs
};
})();
