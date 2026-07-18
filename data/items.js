// Item and weapon data extracted from game.js so content edits stay out of the main runtime.
(function () {
const weaponTemplates = {
  "Rat Claw": {
    "name": "Rat Claw",
    "realm": "Mortal",
    "hands": "One-Handed",
    "dmgType": "Physical",
    "dice": "1D4",
    "speed": 100,
    "range": 1.5,
    "animation": "claw",
    "graphic": "./assets/items/rat-claw.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-claw.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-claw.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-claw.png",
    "soundEffect": "./assets/audio/claw.wav",
    "weaponTypes": [
      "Slashing"
    ],
    "goldValue": 10
  },
  "Plague Bear Claw": {
    "name": "Plague Bear Claw",
    "realm": "Mortal",
    "hands": "One-Handed",
    "dmgType": "Physical",
    "dice": "2D3",
    "speed": 100,
    "range": 3,
    "animation": "claw",
    "graphic": "./assets/items/rat-claw.png",
    "graphicSize": 30,
    "graphicTint": "#764141",
    "graphicChannels": {
      "metal": "#669118"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-claw.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-claw.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-claw.png",
    "soundEffect": "./assets/audio/claw.wav",
    "weaponTypes": [
      "Slashing"
    ],
    "goldValue": 40,
    "statBuffs": {
      "ATK": 1,
      "AGL": 1,
      "FOCUS": 1,
      "BLOCK": 1
    }
  },
  "Shadow Claw": {
    "name": "Shadow Claw",
    "realm": "Umbral",
    "hands": "One-Handed",
    "dmgType": "Magical",
    "dice": "1D4",
    "speed": 100,
    "range": 3,
    "animation": "claw",
    "graphic": "./assets/items/severed-gnarled-claw.png",
    "graphicSize": 30,
    "graphicTint": "#000000",
    "graphicChannels": {
      "metal": "#a600ff"
    },
    "maleAvatarSprite": "./assets/items/severed-gnarled-claw.png",
    "femaleAvatarSprite": "./assets/items/severed-gnarled-claw.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-claw.png",
    "avatarSpriteTint": "#000000",
    "avatarSpriteChannels": {
      "metal": "#a600ff"
    },
    "soundEffect": "./assets/audio/claw.wav",
    "weaponTypes": [
      "Slashing"
    ],
    "goldValue": 40,
    "resistances": {
      "Sylvan": 1,
      "Umbral": 1
    }
  },
  "Mutant Claw": {
    "name": "Mutant Claw",
    "realm": "Infernal",
    "hands": "One-Handed",
    "dmgType": "Magical",
    "dice": "1D6",
    "speed": 85,
    "range": 3,
    "animation": "claw",
    "graphic": "./assets/items/severed-gnarled-claw.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/items/severed-gnarled-claw.png",
    "femaleAvatarSprite": "./assets/items/severed-gnarled-claw.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-claw.png",
    "soundEffect": "./assets/audio/claw.wav",
    "weaponTypes": [
      "Slashing"
    ],
    "goldValue": 40,
    "statBuffs": {
      "ATK": 1,
      "AGL": 5,
      "FOCUS": 5,
      "RESIST": 1
    }
  },
  "Rusty Dagger": {
    "name": "Rusty Dagger",
    "realm": "Mortal",
    "hands": "One-Handed",
    "dmgType": "Physical",
    "dice": "1D4",
    "speed": 75,
    "range": 2,
    "animation": "stab",
    "graphic": "./assets/items/iron-dagger.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rusty-dagger.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rusty-dagger.png",
    "avatarSprite": "./assets/sprites/player-equipment/rusty-dagger.png",
    "soundEffect": "./assets/audio/bite.wav",
    "weaponTypes": [
      "Stabbing"
    ],
    "goldValue": 16
  },
  "Goblin Spear": {
    "name": "Goblin Spear",
    "realm": "Mortal",
    "hands": "One-Handed",
    "dmgType": "Physical",
    "dice": "1D4",
    "speed": 150,
    "range": 4,
    "animation": "stab",
    "graphic": "./assets/items/spear.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/items/spear.png",
    "femaleAvatarSprite": "./assets/items/spear.png",
    "avatarSprite": "./assets/sprites/player-equipment/rusty-dagger.png",
    "soundEffect": "./assets/audio/bite.wav",
    "weaponTypes": [
      "Stabbing"
    ],
    "goldValue": 30
  },
  "Bronze Spear": {
    "name": "Bronze Spear",
    "realm": "Mortal",
    "hands": "One-Handed",
    "dmgType": "Physical",
    "dice": "1D6",
    "speed": 150,
    "range": 4,
    "animation": "stab",
    "graphic": "./assets/items/spear.png",
    "graphicSize": 30,
    "graphicTint": "#63380d",
    "graphicChannels": {
      "metal": "#c06e1b"
    },
    "maleAvatarSprite": "./assets/items/spear.png",
    "femaleAvatarSprite": "./assets/items/spear.png",
    "avatarSprite": "./assets/sprites/player-equipment/rusty-dagger.png",
    "avatarSpriteTint": "#63380d",
    "avatarSpriteChannels": {
      "metal": "#c06e1b"
    },
    "soundEffect": "./assets/audio/bite.wav",
    "weaponTypes": [
      "Stabbing"
    ],
    "goldValue": 50
  },
  "Ivory Wand": {
    "name": "Ivory Wand",
    "realm": "Sylvan",
    "hands": "One-Handed",
    "dmgType": "Magical",
    "dice": "1D6",
    "speed": 100,
    "range": 5,
    "animation": "projectile",
    "graphic": "./assets/items/ivory-wand.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/ivory-wand.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/ivory-wand.png",
    "avatarSprite": "./assets/sprites/player-equipment/ivory-wand.png",
    "projectileSprite": "./assets/projectiles/magic-missile.png",
    "projectileTint": "#37ff00",
    "projectileGlow": true,
    "projectileGlowColor": "#11ff00",
    "soundEffect": "./assets/audio/receive-magic-damage.wav",
    "projectileSpeed": 2,
    "goldValue": 105
  },
  "Coral Wand": {
    "name": "Coral Wand",
    "realm": "Ethereal",
    "hands": "One-Handed",
    "dmgType": "Magical",
    "dice": "1D6",
    "speed": 100,
    "range": 5,
    "animation": "projectile",
    "graphic": "./assets/items/ivory-wand.png",
    "graphicSize": 30,
    "graphicTint": "#c3509f",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/ivory-wand.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/ivory-wand.png",
    "avatarSprite": "./assets/sprites/player-equipment/ivory-wand.png",
    "avatarSpriteTint": "#c3509f",
    "projectileSprite": "./assets/projectiles/magic-missile.png",
    "projectileTint": "#0062ff",
    "projectileGlow": true,
    "projectileGlowColor": "#009dff",
    "soundEffect": "./assets/audio/receive-magic-damage.wav",
    "projectileSpeed": 2,
    "goldValue": 105
  },
  "Bite": {
    "name": "Bite",
    "realm": "Mortal",
    "hands": "One-Handed",
    "dmgType": "Physical",
    "dice": "1D6",
    "speed": 100,
    "range": 2,
    "animation": "claw",
    "graphic": "./assets/items/rat-claw.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/items/fang.png",
    "femaleAvatarSprite": "./assets/items/fang.png",
    "avatarSprite": "./assets/sprites/player-equipment/bite.png",
    "soundEffect": "./assets/audio/claw.wav",
    "weaponTypes": [
      "Stabbing"
    ],
    "goldValue": 55
  },
  "Claw": {
    "name": "Claw",
    "realm": "Mortal",
    "hands": "One-Handed",
    "dmgType": "Physical",
    "dice": "1D6",
    "speed": 100,
    "range": 2,
    "animation": "claw",
    "graphic": "./assets/items/rat-claw.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/items/fang.png",
    "femaleAvatarSprite": "./assets/items/fang.png",
    "avatarSprite": "./assets/sprites/player-equipment/bite.png",
    "soundEffect": "./assets/audio/claw.wav",
    "weaponTypes": [
      "Slashing"
    ],
    "goldValue": 55
  },
  "Willow Branch": {
    "name": "Willow Branch",
    "realm": "Ethereal",
    "hands": "One-Handed",
    "dmgType": "Magical",
    "dice": "1D4",
    "speed": 100,
    "range": 4,
    "animation": "projectile",
    "graphic": "./assets/items/willow-branch.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/willow-branch.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/willow-branch.png",
    "avatarSprite": "./assets/sprites/player-equipment/willow-branch.png",
    "projectileSprite": "./assets/projectiles/magic-missile.png",
    "projectileTint": "#3df2ff",
    "soundEffect": "./assets/audio/receive-magic-damage.wav",
    "projectileSpeed": 3,
    "goldValue": 75
  },
  "Spark": {
    "name": "Spark",
    "realm": "Ethereal",
    "hands": "One-Handed",
    "dmgType": "Magical",
    "dice": "1D6",
    "speed": 100,
    "range": 4,
    "animation": "projectile",
    "graphic": "question mark",
    "graphicSize": 30,
    "soundEffect": "./assets/audio/generic-celestial-offensive-spell.wav",
    "projectileSpeed": 3,
    "goldValue": 95
  },
  "Fetid Splash": {
    "name": "Fetid Splash",
    "realm": "Mortal",
    "hands": "One-Handed",
    "dmgType": "Magical",
    "dice": "1D6",
    "speed": 50,
    "range": 4,
    "animation": "projectile",
    "graphic": "question mark",
    "graphicSize": 30,
    "soundEffect": "./assets/audio/generic-shadow-offensive-spell.wav",
    "projectileSpeed": 1.2,
    "goldValue": 130
  },
  "Wooden Knife": {
    "name": "Wooden Knife",
    "realm": "Mortal",
    "hands": "One-Handed",
    "dmgType": "Physical",
    "dice": "1D4",
    "speed": 100,
    "range": 3,
    "animation": "stab",
    "graphic": "./assets/items/wooden-knife.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/wooden-knife.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/wooden-knife.png",
    "avatarSprite": "./assets/sprites/player-equipment/wooden-knife.png",
    "soundEffect": "./assets/audio/bite.wav",
    "weaponTypes": [
      "Stabbing"
    ],
    "goldValue": 5
  },
  "Bronze Dagger": {
    "name": "Bronze Dagger",
    "realm": "Mortal",
    "hands": "One-Handed",
    "dmgType": "Physical",
    "dice": "1D4",
    "speed": 75,
    "range": 3,
    "animation": "stab",
    "graphic": "./assets/items/iron-dagger.png",
    "graphicSize": 30,
    "graphicTint": "#5f4225",
    "graphicChannels": {
      "metal": "#c06e1b"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/iron-dagger.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/iron-dagger.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-dagger.png",
    "avatarSpriteChannels": {
      "metal": "#c06e1b"
    },
    "soundEffect": "./assets/audio/bite.wav",
    "weaponTypes": [
      "Stabbing"
    ],
    "goldValue": 80
  },
  "Obsidian Dagger": {
    "name": "Obsidian Dagger",
    "realm": "Umbral",
    "hands": "One-Handed",
    "dmgType": "Physical",
    "dice": "1D4",
    "speed": 75,
    "range": 3,
    "animation": "stab",
    "graphic": "./assets/sprites/player-equipment/male/wooden-knife.png",
    "graphicSize": 30,
    "graphicTint": "#000000",
    "graphicChannels": {
      "gem": "#c72eff"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/iron-dagger.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/iron-dagger.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-dagger.png",
    "avatarSpriteTint": "#000000",
    "avatarSpriteChannels": {
      "gem": "#c72eff"
    },
    "soundEffect": "./assets/audio/bite.wav",
    "weaponTypes": [
      "Stabbing"
    ],
    "goldValue": 100,
    "statBuffs": {
      "AGL": 2,
      "FOCUS": 2
    },
    "resistances": {
      "Sylvan": 3,
      "Umbral": 3
    }
  },
  "Bronze Shortsword": {
    "name": "Bronze Shortsword",
    "realm": "Mortal",
    "hands": "One-Handed",
    "dmgType": "Physical",
    "dice": "1D6",
    "speed": 100,
    "range": 3,
    "animation": "slash",
    "graphic": "./assets/items/iron-shortsword.png",
    "graphicSize": 30,
    "graphicTint": "#65472f",
    "graphicChannels": {
      "metal": "#c06e1b"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/iron-shortsword.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/iron-shortsword.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-shortsword.png",
    "avatarSpriteChannels": {
      "metal": "#c06e1b"
    },
    "soundEffect": "./assets/audio/whack.wav",
    "weaponTypes": [
      "Slashing"
    ],
    "goldValue": 80
  },
  "Bronze Longsword": {
    "name": "Bronze Longsword",
    "realm": "Mortal",
    "hands": "Two-Handed",
    "dmgType": "Physical",
    "dice": "2D6",
    "speed": 150,
    "range": 3.5,
    "animation": "slash",
    "graphic": "./assets/items/iron-longsword.png",
    "graphicSize": 30,
    "graphicTint": "#492b12",
    "graphicChannels": {
      "metal": "#c06e1b"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/iron-longsword.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/iron-longsword.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-longsword.png",
    "avatarSpriteChannels": {
      "metal": "#c06e1b"
    },
    "soundEffect": "./assets/audio/whack.wav",
    "category": "Melee",
    "weaponTypes": [
      "Slashing"
    ],
    "goldValue": 95
  },
  "Wooden Staff": {
    "name": "Wooden Staff",
    "realm": "Mortal",
    "hands": "Two-Handed",
    "dmgType": "Magical",
    "dice": "1D6",
    "speed": 100,
    "range": 5,
    "animation": "projectile",
    "graphic": "./assets/items/wooden-staff.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/wooden-staff.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/wooden-staff.png",
    "avatarSprite": "./assets/sprites/player-equipment/wooden-staff.png",
    "projectileSprite": "./assets/projectiles/magic-missile.png",
    "projectileTint": "#993d00",
    "soundEffect": "./assets/audio/receive-magic-damage.wav",
    "projectileSpeed": 2,
    "goldValue": 90
  },
  "Muckromancer Staff": {
    "name": "Muckromancer Staff",
    "realm": "Mortal",
    "hands": "Two-Handed",
    "dmgType": "Magical",
    "dice": "1D8",
    "speed": 100,
    "range": 5,
    "animation": "projectile",
    "graphic": "./assets/items/froglin-staff.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/items/froglin-staff.png",
    "femaleAvatarSprite": "./assets/items/froglin-staff.png",
    "avatarSprite": "./assets/sprites/player-equipment/wooden-staff.png",
    "projectileSprite": "./assets/projectiles/magic-missile.png",
    "projectileTint": "#993d00",
    "soundEffect": "./assets/audio/receive-magic-damage.wav",
    "projectileSpeed": 2,
    "goldValue": 90,
    "statBuffs": {
      "INT": 1,
      "RESIST": 1
    }
  },
  "Ebony Wand": {
    "name": "Ebony Wand",
    "realm": "Infernal",
    "hands": "One-Handed",
    "dmgType": "Magical",
    "dice": "1D6",
    "speed": 100,
    "range": 5,
    "animation": "projectile",
    "graphic": "./assets/items/ebony-wand.png",
    "graphicSize": 30,
    "graphicTint": "#a30000",
    "graphicChannels": {
      "metal": "#302c2c"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/ebony-wand.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/ebony-wand.png",
    "avatarSprite": "./assets/sprites/player-equipment/ebony-wand.png",
    "avatarSpriteTint": "#a30000",
    "avatarSpriteChannels": {
      "metal": "#302c2c",
      "gem": "#ff0000"
    },
    "projectileSprite": "./assets/projectiles/magic-missile.png",
    "projectileTint": "#ff4d00",
    "projectileGlow": true,
    "projectileGlowColor": "#ff0000",
    "soundEffect": "./assets/audio/receive-magic-damage.wav",
    "projectileSpeed": 2,
    "goldValue": 105
  },
  "Sunstone Wand": {
    "name": "Sunstone Wand",
    "realm": "Celestial",
    "hands": "One-Handed",
    "dmgType": "Magical",
    "dice": "1D6",
    "speed": 100,
    "range": 5,
    "animation": "projectile",
    "graphic": "./assets/items/ebony-wand.png",
    "graphicSize": 30,
    "graphicTint": "#ff6524",
    "graphicChannels": {
      "metal": "#ffc800"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/ebony-wand.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/ebony-wand.png",
    "avatarSprite": "./assets/sprites/player-equipment/ebony-wand.png",
    "avatarSpriteTint": "#ff6524",
    "avatarSpriteChannels": {
      "metal": "#ffc800",
      "gem": "#ff0000"
    },
    "projectileSprite": "./assets/projectiles/ice-bolt.png",
    "projectileTint": "#fff585",
    "projectileGlow": true,
    "projectileGlowColor": "#fff700",
    "soundEffect": "./assets/audio/receive-magic-damage.wav",
    "projectileSpeed": 2,
    "goldValue": 105
  },
  "Bone Wand": {
    "name": "Bone Wand",
    "realm": "Umbral",
    "hands": "One-Handed",
    "dmgType": "Magical",
    "dice": "1D6",
    "speed": 100,
    "range": 5,
    "animation": "projectile",
    "graphic": "./assets/items/bone-staff.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/bone-staff.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/bone-staff.png",
    "avatarSprite": "./assets/sprites/player-equipment/bone-staff.png",
    "projectileSprite": "./assets/projectiles/magic-missile.png",
    "projectileTint": "#510094",
    "projectileGlow": true,
    "projectileGlowColor": "#000000",
    "soundEffect": "./assets/audio/receive-magic-damage.wav",
    "projectileSpeed": 2,
    "goldValue": 105
  },
  "Shortbow": {
    "name": "Shortbow",
    "realm": "Mortal",
    "hands": "Two-Handed",
    "dmgType": "Physical",
    "dice": "1D4",
    "speed": 200,
    "range": 6,
    "animation": "projectile",
    "graphic": "./assets/items/shortbow.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/shortbow.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/shortbow.png",
    "avatarSprite": "./assets/sprites/player-equipment/shortbow.png",
    "soundEffect": "./assets/audio/turn-page.wav",
    "category": "Bow",
    "weaponTypes": [
      "Bow"
    ],
    "projectileAnimation": "Arrow",
    "projectileSpeed": 8,
    "ammo": "Bronze Arrow",
    "goldValue": 70
  },
  "Longbow": {
    "name": "Longbow",
    "realm": "Mortal",
    "hands": "Two-Handed",
    "dmgType": "Physical",
    "dice": "1D6",
    "speed": 300,
    "range": 8,
    "animation": "projectile",
    "graphic": "./assets/items/longbow.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/longbow.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/longbow.png",
    "avatarSprite": "./assets/sprites/player-equipment/longbow.png",
    "soundEffect": "./assets/audio/turn-page.wav",
    "category": "Bow",
    "weaponTypes": [
      "Bow"
    ],
    "projectileAnimation": "Arrow",
    "projectileSpeed": 8,
    "ammo": "Bronze Arrow",
    "goldValue": 90
  },
  "Eldwood Shortbow": {
    "name": "Eldwood Shortbow",
    "realm": "Sylvan",
    "hands": "Two-Handed",
    "dmgType": "Physical",
    "dice": "1D4 + 2",
    "speed": 150,
    "range": 6,
    "animation": "projectile",
    "graphic": "./assets/items/shortbow.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/eldwood-shortbow.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/eldwood-shortbow.png",
    "avatarSprite": "./assets/sprites/player-equipment/eldwood-shortbow.png",
    "soundEffect": "./assets/audio/turn-page.wav",
    "category": "Bow",
    "weaponTypes": [
      "Bow"
    ],
    "projectileAnimation": "Arrow",
    "projectileSpeed": 8,
    "ammo": "Bronze Arrow",
    "goldValue": 125,
    "statBuffs": {
      "FOCUS": 1
    }
  },
  "Bronze Battleaxe": {
    "name": "Bronze Battleaxe",
    "realm": "Mortal",
    "hands": "One-Handed",
    "dmgType": "Physical",
    "dice": "2D4",
    "speed": 200,
    "range": 3.5,
    "animation": "slash",
    "graphic": "./assets/items/iron-battleaxe.png",
    "graphicSize": 30,
    "graphicTint": "#5d3727",
    "graphicChannels": {
      "metal": "#c06e1b"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/iron-battleaxe.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/iron-battleaxe.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-battleaxe.png",
    "avatarSpriteChannels": {
      "metal": "#c06e1b"
    },
    "soundEffect": "./assets/audio/turn-page.wav",
    "category": "Melee",
    "weaponTypes": [
      "Slashing",
      "Axe"
    ],
    "goldValue": 90
  },
  "Bogchieftan Tomahawk": {
    "name": "Bogchieftan Tomahawk",
    "realm": "Mortal",
    "hands": "One-Handed",
    "dmgType": "Physical",
    "dice": "2D5",
    "speed": 185,
    "range": 3.5,
    "animation": "slash",
    "graphic": "./assets/items/froglin-tomahawk.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/items/froglin-tomahawk.png",
    "femaleAvatarSprite": "./assets/items/froglin-tomahawk.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-battleaxe.png",
    "soundEffect": "./assets/audio/turn-page.wav",
    "category": "Melee",
    "weaponTypes": [
      "Slashing",
      "Axe"
    ],
    "goldValue": 90,
    "statBuffs": {
      "HP": 4,
      "ATK": 1,
      "FOCUS": 1
    }
  },
  "Nurdine's Whip": {
    "name": "Nurdine's Whip",
    "realm": "Infernal",
    "hands": "One-Handed",
    "dmgType": "Physical",
    "dice": "2D4",
    "speed": 150,
    "range": 3.5,
    "animation": "slash",
    "lore": "\"Made from the tail of her brother-husband who displeased her\"",
    "graphic": "./assets/items/leather-whip.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/items/leather-whip.png",
    "femaleAvatarSprite": "./assets/items/leather-whip.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-battleaxe.png",
    "soundEffect": "./assets/audio/turn-page.wav",
    "category": "Melee",
    "weaponTypes": [
      "Slashing"
    ],
    "goldValue": 300,
    "statBuffs": {
      "AGL": 2,
      "FOCUS": 1,
      "RESIST": 1
    },
    "effects": {
      "stun": {
        "enabled": true,
        "chance": 5,
        "duration": 2
      }
    }
  },
  "Bronze Mace": {
    "name": "Bronze Mace",
    "realm": "Mortal",
    "hands": "One-Handed",
    "dmgType": "Physical",
    "dice": "1D6",
    "speed": 100,
    "range": 3,
    "animation": "whack",
    "graphic": "./assets/items/iron-mace.png",
    "graphicSize": 30,
    "graphicTint": "#462911",
    "graphicChannels": {
      "metal": "#c06e1b"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/iron-mace.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/iron-mace.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-mace.png",
    "avatarSpriteChannels": {
      "metal": "#c06e1b"
    },
    "soundEffect": "./assets/audio/stab.wav",
    "category": "Melee",
    "weaponTypes": [
      "Blunt"
    ],
    "goldValue": 80,
    "effects": {
      "stun": {
        "enabled": true,
        "chance": 5,
        "duration": 2
      }
    }
  },
  "Fist of the Whisperer": {
    "name": "Fist of the Whisperer",
    "realm": "Ethereal",
    "hands": "One-Handed",
    "dmgType": "Physical",
    "dice": "1D8",
    "speed": 100,
    "range": 3,
    "animation": "whack",
    "graphic": "./assets/items/waterfall-hammer.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/items/waterfall-hammer.png",
    "femaleAvatarSprite": "./assets/items/waterfall-hammer.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-mace.png",
    "soundEffect": "./assets/audio/stab.wav",
    "category": "Melee",
    "weaponTypes": [
      "Blunt"
    ],
    "goldValue": 160,
    "statBuffs": {
      "ATK": 1,
      "INT": 1,
      "FOCUS": 1,
      "RESIST": 1,
      "REGEN": 1
    },
    "effects": {
      "stun": {
        "enabled": true,
        "chance": 5,
        "duration": 2
      }
    }
  },
  "Rock Fist": {
    "name": "Rock Fist",
    "realm": "Mortal",
    "hands": "One-Handed",
    "dmgType": "Physical",
    "dice": "1D6",
    "speed": 100,
    "range": 3,
    "animation": "whack",
    "graphic": "./assets/sprites/rock.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/rock.png",
    "femaleAvatarSprite": "./assets/sprites/rock.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-mace.png",
    "soundEffect": "./assets/audio/stab.wav",
    "category": "Melee",
    "weaponTypes": [
      "Blunt"
    ],
    "goldValue": 80,
    "effects": {
      "stun": {
        "enabled": true,
        "chance": 5,
        "duration": 2
      }
    }
  },
  "Ice Fist": {
    "name": "Ice Fist",
    "realm": "Ethereal",
    "hands": "One-Handed",
    "dmgType": "Physical",
    "dice": "1D6",
    "speed": 100,
    "range": 3,
    "animation": "whack",
    "graphic": "./assets/sprites/rock.png",
    "graphicSize": 30,
    "graphicTint": "#67bdda",
    "maleAvatarSprite": "./assets/sprites/rock.png",
    "femaleAvatarSprite": "./assets/sprites/rock.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-mace.png",
    "avatarSpriteTint": "#67bdda",
    "soundEffect": "./assets/audio/stab.wav",
    "category": "Melee",
    "weaponTypes": [
      "Blunt"
    ],
    "goldValue": 80,
    "effects": {
      "stun": {
        "enabled": true,
        "chance": 5,
        "duration": 2
      }
    }
  },
  "Granite Fist": {
    "name": "Granite Fist",
    "realm": "Mortal",
    "hands": "One-Handed",
    "dmgType": "Physical",
    "dice": "1D6",
    "speed": 100,
    "range": 3,
    "animation": "whack",
    "graphic": "./assets/sprites/rock-64.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/rock.png",
    "femaleAvatarSprite": "./assets/sprites/rock.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-mace.png",
    "soundEffect": "./assets/audio/stab.wav",
    "category": "Melee",
    "weaponTypes": [
      "Blunt"
    ],
    "goldValue": 80,
    "effects": {
      "stun": {
        "enabled": true,
        "chance": 5,
        "duration": 2
      }
    }
  }
};

const shopkeeperStartingInventory = [
  "Leather Breastplate",
  "Leather Hood",
  "Leather Gloves",
  "Leather Pants",
  "Leather Boots",
  "Leather Pauldrons",
  "Spidersilk Cowl",
  "Spidersilk Shirt",
  "Spidersilk Gloves",
  "Spidersilk Pants",
  "Spidersilk Slippers",
  "Bronze Dagger",
  "Bronze Shortsword",
  "Shortbow",
  "Longbow",
  "Wooden Staff",
  "Wooden Shield"
];

const shopkeeperStartingConsumables = [
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
];

const shopkeeperStartingScrolls = [
  "Scroll of Rage",
  "Scroll of Magic Missile",
  "Scroll of Archery Mastery",
  "Scroll of Axe Mastery",
  "Scroll of Mace Mastery",
  "Scroll of Dagger Mastery",
  "Scroll of Shield Mastery",
  "Scroll of Shield Bash",
  "Scroll of Battle Cry",
  "Scroll of Dual Wield",
  "Scroll of War Drums",
  "Scroll of Bloodthirsty Aura",
  "Scroll of Ring of Fire",
  "Scroll of Basic Prayer",
  "Scroll of Heavenly Light",
  "Scroll of Godspeed",
  "Scroll of Curse of Disdain",
  "Scroll of Tangle Vine",
  "Scroll of Briar Lash",
  "Scroll of Chlorophyll",
  "Scroll of Wooden Skin",
  "Scroll of Sacred Grove",
  "Scroll of Spiderweb",
  "Scroll of Pacify",
  "Scroll of Hypnotize",
  "Scroll of Fireblast",
  "Scroll of Fireball",
  "Scroll of Dark Circle",
  "Scroll of Aura of Protection",
  "Scroll of Lifesteal",
  "Scroll of Mortify",
  "Scroll of Bone Ritual",
  "Scroll of Spirit of Avia",
  "Scroll of Poison",
  "Scroll of Invisibility",
  "Scroll of Banish",
  "Scroll of Clarity",
  "Scroll of Ice Bolt",
  "Scroll of Ice Storm",
  "Scroll of Frozen Touch",
  "Scroll of Chain Lightning",
  "Scroll of Grace from Above",
  "Scroll of Divine Shield",
  "Scroll of Arcane Shield",
  "Scroll of Pestilent Aura",
  "Scroll of Virulent Plague",
  "Scroll of Etherwind Aura",
  "Scroll of Raise Skeleton",
  "Scroll of Tame Beast",
  "Scroll of Unholy Dominion",
  "Scroll of Faerie Circle",
  "Scroll of Summon Water Elemental",
  "Scroll of Summon Earth Elemental",
  "Scroll of Summon Fire Elemental",
  "Scroll of Summon Shade",
  "Scroll of Summon Treant",
  "Scroll of Summon Portal"
];

const itemTemplates = {
  "Rat Claw": {
    "name": "Rat Claw",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 10,
    "lore": "",
    "soundEffect": "./assets/audio/claw.wav",
    "graphic": "./assets/items/rat-claw.png",
    "graphicSize": 30,
    "graphicTint": "",
    "resistances": {},
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-claw.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-claw.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-claw.png",
    "weapon": {
      "name": "Rat Claw",
      "realm": "Mortal",
      "hands": "One-Handed",
      "dmgType": "Physical",
      "dice": "1D4",
      "speed": 100,
      "range": 1.5,
      "animation": "claw",
      "soundEffect": "./assets/audio/claw.wav",
      "weaponTypes": [
        "Slashing"
      ],
      "goldValue": 10,
      "graphic": "./assets/items/rat-claw.png",
      "graphicSize": 30,
      "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-claw.png",
      "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-claw.png",
      "avatarSprite": "./assets/sprites/player-equipment/rat-claw.png",
      "statBuffs": {}
    }
  },
  "Plague Bear Claw": {
    "name": "Plague Bear Claw",
    "rarity": "rare",
    "slot": "Main Hand",
    "stats": {
      "ATK": 1,
      "AGL": 1,
      "FOCUS": 1,
      "BLOCK": 1
    },
    "goldValue": 40,
    "lore": "",
    "soundEffect": "./assets/audio/claw.wav",
    "graphic": "./assets/items/rat-claw.png",
    "graphicSize": 30,
    "graphicTint": "#764141",
    "graphicChannels": {
      "metal": "#669118"
    },
    "resistances": {},
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-claw.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-claw.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-claw.png",
    "weapon": {
      "name": "Plague Bear Claw",
      "realm": "Mortal",
      "hands": "One-Handed",
      "dmgType": "Physical",
      "dice": "2D3",
      "speed": 100,
      "range": 3,
      "animation": "claw",
      "soundEffect": "./assets/audio/claw.wav",
      "weaponTypes": [
        "Slashing"
      ],
      "goldValue": 40,
      "graphic": "./assets/items/rat-claw.png",
      "graphicSize": 30,
      "graphicTint": "#764141",
      "graphicChannels": {
        "metal": "#669118"
      },
      "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-claw.png",
      "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-claw.png",
      "avatarSprite": "./assets/sprites/player-equipment/rat-claw.png",
      "statBuffs": {
        "ATK": 1,
        "AGL": 1,
        "FOCUS": 1,
        "BLOCK": 1
      }
    }
  },
  "Shadow Claw": {
    "name": "Shadow Claw",
    "rarity": "uncommon",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 40,
    "lore": "",
    "soundEffect": "./assets/audio/claw.wav",
    "graphic": "./assets/items/severed-gnarled-claw.png",
    "graphicSize": 30,
    "graphicTint": "#000000",
    "graphicChannels": {
      "metal": "#a600ff"
    },
    "resistances": {
      "Sylvan": 1,
      "Umbral": 1
    },
    "maleAvatarSprite": "./assets/items/severed-gnarled-claw.png",
    "femaleAvatarSprite": "./assets/items/severed-gnarled-claw.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-claw.png",
    "avatarSpriteTint": "#000000",
    "avatarSpriteChannels": {
      "metal": "#a600ff"
    },
    "weapon": {
      "name": "Shadow Claw",
      "realm": "Umbral",
      "hands": "One-Handed",
      "dmgType": "Magical",
      "dice": "1D4",
      "speed": 100,
      "range": 3,
      "animation": "claw",
      "soundEffect": "./assets/audio/claw.wav",
      "weaponTypes": [
        "Slashing"
      ],
      "goldValue": 40,
      "graphic": "./assets/items/severed-gnarled-claw.png",
      "graphicSize": 30,
      "graphicTint": "#000000",
      "graphicChannels": {
        "metal": "#a600ff"
      },
      "resistances": {
        "Sylvan": 1,
        "Umbral": 1
      },
      "maleAvatarSprite": "./assets/items/severed-gnarled-claw.png",
      "femaleAvatarSprite": "./assets/items/severed-gnarled-claw.png",
      "avatarSprite": "./assets/sprites/player-equipment/rat-claw.png",
      "avatarSpriteTint": "#000000",
      "avatarSpriteChannels": {
        "metal": "#a600ff"
      },
      "statBuffs": {}
    }
  },
  "Mutant Claw": {
    "name": "Mutant Claw",
    "rarity": "rare",
    "slot": "Main Hand",
    "stats": {
      "ATK": 1,
      "AGL": 5,
      "FOCUS": 5,
      "RESIST": 1
    },
    "goldValue": 40,
    "lore": "",
    "soundEffect": "./assets/audio/claw.wav",
    "graphic": "./assets/items/severed-gnarled-claw.png",
    "graphicSize": 30,
    "graphicTint": "",
    "resistances": {},
    "maleAvatarSprite": "./assets/items/severed-gnarled-claw.png",
    "femaleAvatarSprite": "./assets/items/severed-gnarled-claw.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-claw.png",
    "weapon": {
      "name": "Mutant Claw",
      "realm": "Infernal",
      "hands": "One-Handed",
      "dmgType": "Magical",
      "dice": "1D6",
      "speed": 85,
      "range": 3,
      "animation": "claw",
      "soundEffect": "./assets/audio/claw.wav",
      "weaponTypes": [
        "Slashing"
      ],
      "goldValue": 40,
      "graphic": "./assets/items/severed-gnarled-claw.png",
      "graphicSize": 30,
      "maleAvatarSprite": "./assets/items/severed-gnarled-claw.png",
      "femaleAvatarSprite": "./assets/items/severed-gnarled-claw.png",
      "avatarSprite": "./assets/sprites/player-equipment/rat-claw.png",
      "statBuffs": {
        "ATK": 1,
        "AGL": 5,
        "FOCUS": 5,
        "RESIST": 1
      }
    }
  },
  "Rusty Dagger": {
    "name": "Rusty Dagger",
    "rarity": "poor",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 16,
    "lore": "",
    "soundEffect": "./assets/audio/bite.wav",
    "graphic": "./assets/items/iron-dagger.png",
    "graphicSize": 30,
    "graphicTint": "",
    "resistances": {},
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rusty-dagger.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rusty-dagger.png",
    "avatarSprite": "./assets/sprites/player-equipment/rusty-dagger.png",
    "weapon": {
      "name": "Rusty Dagger",
      "realm": "Mortal",
      "hands": "One-Handed",
      "dmgType": "Physical",
      "dice": "1D4",
      "speed": 75,
      "range": 2,
      "animation": "stab",
      "soundEffect": "./assets/audio/bite.wav",
      "weaponTypes": [
        "Stabbing"
      ],
      "goldValue": 16,
      "graphic": "./assets/items/iron-dagger.png",
      "graphicSize": 30,
      "maleAvatarSprite": "./assets/sprites/player-equipment/male/rusty-dagger.png",
      "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rusty-dagger.png",
      "avatarSprite": "./assets/sprites/player-equipment/rusty-dagger.png",
      "statBuffs": {}
    }
  },
  "Goblin Spear": {
    "name": "Goblin Spear",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 30,
    "lore": "",
    "soundEffect": "./assets/audio/bite.wav",
    "graphic": "./assets/items/spear.png",
    "graphicSize": 30,
    "graphicTint": "",
    "resistances": {},
    "maleAvatarSprite": "./assets/items/spear.png",
    "femaleAvatarSprite": "./assets/items/spear.png",
    "avatarSprite": "./assets/sprites/player-equipment/rusty-dagger.png",
    "weapon": {
      "name": "Goblin Spear",
      "realm": "Mortal",
      "hands": "One-Handed",
      "dmgType": "Physical",
      "dice": "1D4",
      "speed": 150,
      "range": 4,
      "animation": "stab",
      "soundEffect": "./assets/audio/bite.wav",
      "weaponTypes": [
        "Stabbing"
      ],
      "goldValue": 30,
      "graphic": "./assets/items/spear.png",
      "graphicSize": 30,
      "maleAvatarSprite": "./assets/items/spear.png",
      "femaleAvatarSprite": "./assets/items/spear.png",
      "avatarSprite": "./assets/sprites/player-equipment/rusty-dagger.png",
      "statBuffs": {}
    }
  },
  "Bronze Spear": {
    "name": "Bronze Spear",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 50,
    "lore": "",
    "soundEffect": "./assets/audio/bite.wav",
    "graphic": "./assets/items/spear.png",
    "graphicSize": 30,
    "graphicTint": "#63380d",
    "graphicChannels": {
      "metal": "#c06e1b"
    },
    "resistances": {},
    "maleAvatarSprite": "./assets/items/spear.png",
    "femaleAvatarSprite": "./assets/items/spear.png",
    "avatarSprite": "./assets/sprites/player-equipment/rusty-dagger.png",
    "avatarSpriteTint": "#63380d",
    "avatarSpriteChannels": {
      "metal": "#c06e1b"
    },
    "weapon": {
      "name": "Bronze Spear",
      "realm": "Mortal",
      "hands": "One-Handed",
      "dmgType": "Physical",
      "dice": "1D6",
      "speed": 150,
      "range": 4,
      "animation": "stab",
      "soundEffect": "./assets/audio/bite.wav",
      "weaponTypes": [
        "Stabbing"
      ],
      "goldValue": 50,
      "graphic": "./assets/items/spear.png",
      "graphicSize": 30,
      "graphicTint": "#63380d",
      "graphicChannels": {
        "metal": "#c06e1b"
      },
      "maleAvatarSprite": "./assets/items/spear.png",
      "femaleAvatarSprite": "./assets/items/spear.png",
      "avatarSprite": "./assets/sprites/player-equipment/rusty-dagger.png",
      "avatarSpriteTint": "#63380d",
      "avatarSpriteChannels": {
        "metal": "#c06e1b"
      },
      "statBuffs": {}
    }
  },
  "Ivory Wand": {
    "name": "Ivory Wand",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 105,
    "lore": "",
    "soundEffect": "./assets/audio/receive-magic-damage.wav",
    "graphic": "./assets/items/ivory-wand.png",
    "graphicSize": 30,
    "graphicTint": "",
    "resistances": {},
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/ivory-wand.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/ivory-wand.png",
    "avatarSprite": "./assets/sprites/player-equipment/ivory-wand.png",
    "projectileSprite": "./assets/projectiles/magic-missile.png",
    "projectileTint": "#37ff00",
    "projectileGlow": true,
    "projectileGlowColor": "#11ff00",
    "weapon": {
      "name": "Ivory Wand",
      "realm": "Sylvan",
      "hands": "One-Handed",
      "dmgType": "Magical",
      "dice": "1D6",
      "speed": 100,
      "range": 5,
      "animation": "projectile",
      "soundEffect": "./assets/audio/receive-magic-damage.wav",
      "projectileSpeed": 2,
      "goldValue": 105,
      "graphic": "./assets/items/ivory-wand.png",
      "graphicSize": 30,
      "maleAvatarSprite": "./assets/sprites/player-equipment/male/ivory-wand.png",
      "femaleAvatarSprite": "./assets/sprites/player-equipment/female/ivory-wand.png",
      "avatarSprite": "./assets/sprites/player-equipment/ivory-wand.png",
      "projectileSprite": "./assets/projectiles/magic-missile.png",
      "projectileTint": "#37ff00",
      "projectileGlow": true,
      "projectileGlowColor": "#11ff00",
      "statBuffs": {}
    }
  },
  "Coral Wand": {
    "name": "Coral Wand",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 105,
    "lore": "",
    "soundEffect": "./assets/audio/receive-magic-damage.wav",
    "graphic": "./assets/items/ivory-wand.png",
    "graphicSize": 30,
    "graphicTint": "#c3509f",
    "resistances": {},
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/ivory-wand.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/ivory-wand.png",
    "avatarSprite": "./assets/sprites/player-equipment/ivory-wand.png",
    "avatarSpriteTint": "#c3509f",
    "projectileSprite": "./assets/projectiles/magic-missile.png",
    "projectileTint": "#0062ff",
    "projectileGlow": true,
    "projectileGlowColor": "#009dff",
    "weapon": {
      "name": "Coral Wand",
      "realm": "Ethereal",
      "hands": "One-Handed",
      "dmgType": "Magical",
      "dice": "1D6",
      "speed": 100,
      "range": 5,
      "animation": "projectile",
      "soundEffect": "./assets/audio/receive-magic-damage.wav",
      "projectileSpeed": 2,
      "goldValue": 105,
      "graphic": "./assets/items/ivory-wand.png",
      "graphicSize": 30,
      "graphicTint": "#c3509f",
      "maleAvatarSprite": "./assets/sprites/player-equipment/male/ivory-wand.png",
      "femaleAvatarSprite": "./assets/sprites/player-equipment/female/ivory-wand.png",
      "avatarSprite": "./assets/sprites/player-equipment/ivory-wand.png",
      "avatarSpriteTint": "#c3509f",
      "projectileSprite": "./assets/projectiles/magic-missile.png",
      "projectileTint": "#0062ff",
      "projectileGlow": true,
      "projectileGlowColor": "#009dff",
      "statBuffs": {}
    }
  },
  "Bite": {
    "name": "Bite",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 55,
    "lore": "",
    "soundEffect": "./assets/audio/claw.wav",
    "graphic": "./assets/items/rat-claw.png",
    "graphicSize": 30,
    "graphicTint": "",
    "resistances": {},
    "maleAvatarSprite": "./assets/items/fang.png",
    "femaleAvatarSprite": "./assets/items/fang.png",
    "avatarSprite": "./assets/sprites/player-equipment/bite.png",
    "weapon": {
      "name": "Bite",
      "realm": "Mortal",
      "hands": "One-Handed",
      "dmgType": "Physical",
      "dice": "1D6",
      "speed": 100,
      "range": 2,
      "animation": "claw",
      "soundEffect": "./assets/audio/claw.wav",
      "weaponTypes": [
        "Stabbing"
      ],
      "goldValue": 55,
      "graphic": "./assets/items/rat-claw.png",
      "graphicSize": 30,
      "maleAvatarSprite": "./assets/items/fang.png",
      "femaleAvatarSprite": "./assets/items/fang.png",
      "avatarSprite": "./assets/sprites/player-equipment/bite.png",
      "statBuffs": {}
    }
  },
  "Claw": {
    "name": "Claw",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 55,
    "lore": "",
    "soundEffect": "./assets/audio/claw.wav",
    "graphic": "./assets/items/rat-claw.png",
    "graphicSize": 30,
    "graphicTint": "",
    "resistances": {},
    "maleAvatarSprite": "./assets/items/fang.png",
    "femaleAvatarSprite": "./assets/items/fang.png",
    "avatarSprite": "./assets/sprites/player-equipment/bite.png",
    "weapon": {
      "name": "Claw",
      "realm": "Mortal",
      "hands": "One-Handed",
      "dmgType": "Physical",
      "dice": "1D6",
      "speed": 100,
      "range": 2,
      "animation": "claw",
      "soundEffect": "./assets/audio/claw.wav",
      "weaponTypes": [
        "Slashing"
      ],
      "goldValue": 55,
      "graphic": "./assets/items/rat-claw.png",
      "graphicSize": 30,
      "maleAvatarSprite": "./assets/items/fang.png",
      "femaleAvatarSprite": "./assets/items/fang.png",
      "avatarSprite": "./assets/sprites/player-equipment/bite.png",
      "statBuffs": {}
    }
  },
  "Willow Branch": {
    "name": "Willow Branch",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 75,
    "lore": "",
    "soundEffect": "./assets/audio/receive-magic-damage.wav",
    "graphic": "./assets/items/willow-branch.png",
    "graphicSize": 30,
    "graphicTint": "",
    "resistances": {},
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/willow-branch.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/willow-branch.png",
    "avatarSprite": "./assets/sprites/player-equipment/willow-branch.png",
    "projectileSprite": "./assets/projectiles/magic-missile.png",
    "projectileTint": "#3df2ff",
    "weapon": {
      "name": "Willow Branch",
      "realm": "Ethereal",
      "hands": "One-Handed",
      "dmgType": "Magical",
      "dice": "1D4",
      "speed": 100,
      "range": 4,
      "animation": "projectile",
      "soundEffect": "./assets/audio/receive-magic-damage.wav",
      "projectileSpeed": 3,
      "goldValue": 75,
      "graphic": "./assets/items/willow-branch.png",
      "graphicSize": 30,
      "maleAvatarSprite": "./assets/sprites/player-equipment/male/willow-branch.png",
      "femaleAvatarSprite": "./assets/sprites/player-equipment/female/willow-branch.png",
      "avatarSprite": "./assets/sprites/player-equipment/willow-branch.png",
      "projectileSprite": "./assets/projectiles/magic-missile.png",
      "projectileTint": "#3df2ff",
      "statBuffs": {}
    }
  },
  "Spark": {
    "name": "Spark",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 95,
    "lore": "",
    "soundEffect": "./assets/audio/generic-celestial-offensive-spell.wav",
    "graphic": "question mark",
    "graphicSize": 30,
    "graphicTint": "",
    "resistances": {},
    "weapon": {
      "name": "Spark",
      "realm": "Ethereal",
      "hands": "One-Handed",
      "dmgType": "Magical",
      "dice": "1D6",
      "speed": 100,
      "range": 4,
      "animation": "projectile",
      "soundEffect": "./assets/audio/generic-celestial-offensive-spell.wav",
      "projectileSpeed": 3,
      "goldValue": 95,
      "graphic": "question mark",
      "graphicSize": 30,
      "statBuffs": {}
    }
  },
  "Fetid Splash": {
    "name": "Fetid Splash",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 130,
    "lore": "",
    "soundEffect": "./assets/audio/generic-shadow-offensive-spell.wav",
    "graphic": "question mark",
    "graphicSize": 30,
    "graphicTint": "",
    "resistances": {},
    "weapon": {
      "name": "Fetid Splash",
      "realm": "Mortal",
      "hands": "One-Handed",
      "dmgType": "Magical",
      "dice": "1D6",
      "speed": 50,
      "range": 4,
      "animation": "projectile",
      "soundEffect": "./assets/audio/generic-shadow-offensive-spell.wav",
      "projectileSpeed": 1.2,
      "goldValue": 130,
      "graphic": "question mark",
      "graphicSize": 30,
      "statBuffs": {}
    }
  },
  "Wooden Knife": {
    "name": "Wooden Knife",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 5,
    "lore": "",
    "soundEffect": "./assets/audio/bite.wav",
    "graphic": "./assets/items/wooden-knife.png",
    "graphicSize": 30,
    "graphicTint": "",
    "resistances": {},
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/wooden-knife.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/wooden-knife.png",
    "avatarSprite": "./assets/sprites/player-equipment/wooden-knife.png",
    "weapon": {
      "name": "Wooden Knife",
      "realm": "Mortal",
      "hands": "One-Handed",
      "dmgType": "Physical",
      "dice": "1D4",
      "speed": 100,
      "range": 3,
      "animation": "stab",
      "soundEffect": "./assets/audio/bite.wav",
      "weaponTypes": [
        "Stabbing"
      ],
      "goldValue": 5,
      "graphic": "./assets/items/wooden-knife.png",
      "graphicSize": 30,
      "maleAvatarSprite": "./assets/sprites/player-equipment/male/wooden-knife.png",
      "femaleAvatarSprite": "./assets/sprites/player-equipment/female/wooden-knife.png",
      "avatarSprite": "./assets/sprites/player-equipment/wooden-knife.png",
      "statBuffs": {}
    }
  },
  "Bronze Dagger": {
    "name": "Bronze Dagger",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 80,
    "lore": "",
    "soundEffect": "./assets/audio/bite.wav",
    "graphic": "./assets/items/iron-dagger.png",
    "graphicSize": 30,
    "graphicTint": "#5f4225",
    "graphicChannels": {
      "metal": "#c06e1b"
    },
    "resistances": {},
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/iron-dagger.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/iron-dagger.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-dagger.png",
    "avatarSpriteChannels": {
      "metal": "#c06e1b"
    },
    "weapon": {
      "name": "Bronze Dagger",
      "realm": "Mortal",
      "hands": "One-Handed",
      "dmgType": "Physical",
      "dice": "1D4",
      "speed": 75,
      "range": 3,
      "animation": "stab",
      "soundEffect": "./assets/audio/bite.wav",
      "weaponTypes": [
        "Stabbing"
      ],
      "goldValue": 80,
      "graphic": "./assets/items/iron-dagger.png",
      "graphicSize": 30,
      "graphicTint": "#5f4225",
      "graphicChannels": {
        "metal": "#c06e1b"
      },
      "maleAvatarSprite": "./assets/sprites/player-equipment/male/iron-dagger.png",
      "femaleAvatarSprite": "./assets/sprites/player-equipment/female/iron-dagger.png",
      "avatarSprite": "./assets/sprites/player-equipment/iron-dagger.png",
      "avatarSpriteChannels": {
        "metal": "#c06e1b"
      },
      "statBuffs": {}
    }
  },
  "Obsidian Dagger": {
    "name": "Obsidian Dagger",
    "rarity": "rare",
    "slot": "Main Hand",
    "stats": {
      "AGL": 2,
      "FOCUS": 2
    },
    "goldValue": 100,
    "lore": "",
    "soundEffect": "./assets/audio/bite.wav",
    "graphic": "./assets/sprites/player-equipment/male/wooden-knife.png",
    "graphicSize": 30,
    "graphicTint": "#000000",
    "graphicChannels": {
      "gem": "#c72eff"
    },
    "resistances": {
      "Sylvan": 3,
      "Umbral": 3
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/iron-dagger.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/iron-dagger.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-dagger.png",
    "avatarSpriteTint": "#000000",
    "avatarSpriteChannels": {
      "gem": "#c72eff"
    },
    "weapon": {
      "name": "Obsidian Dagger",
      "realm": "Umbral",
      "hands": "One-Handed",
      "dmgType": "Physical",
      "dice": "1D4",
      "speed": 75,
      "range": 3,
      "animation": "stab",
      "soundEffect": "./assets/audio/bite.wav",
      "weaponTypes": [
        "Stabbing"
      ],
      "goldValue": 100,
      "graphic": "./assets/sprites/player-equipment/male/wooden-knife.png",
      "graphicSize": 30,
      "graphicTint": "#000000",
      "graphicChannels": {
        "gem": "#c72eff"
      },
      "resistances": {
        "Sylvan": 3,
        "Umbral": 3
      },
      "maleAvatarSprite": "./assets/sprites/player-equipment/male/iron-dagger.png",
      "femaleAvatarSprite": "./assets/sprites/player-equipment/female/iron-dagger.png",
      "avatarSprite": "./assets/sprites/player-equipment/iron-dagger.png",
      "avatarSpriteTint": "#000000",
      "avatarSpriteChannels": {
        "gem": "#c72eff"
      },
      "statBuffs": {
        "AGL": 2,
        "FOCUS": 2
      }
    }
  },
  "Bronze Shortsword": {
    "name": "Bronze Shortsword",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 80,
    "lore": "",
    "soundEffect": "./assets/audio/whack.wav",
    "graphic": "./assets/items/iron-shortsword.png",
    "graphicSize": 30,
    "graphicTint": "#65472f",
    "graphicChannels": {
      "metal": "#c06e1b"
    },
    "resistances": {},
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/iron-shortsword.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/iron-shortsword.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-shortsword.png",
    "avatarSpriteChannels": {
      "metal": "#c06e1b"
    },
    "weapon": {
      "name": "Bronze Shortsword",
      "realm": "Mortal",
      "hands": "One-Handed",
      "dmgType": "Physical",
      "dice": "1D6",
      "speed": 100,
      "range": 3,
      "animation": "slash",
      "soundEffect": "./assets/audio/whack.wav",
      "weaponTypes": [
        "Slashing"
      ],
      "goldValue": 80,
      "graphic": "./assets/items/iron-shortsword.png",
      "graphicSize": 30,
      "graphicTint": "#65472f",
      "graphicChannels": {
        "metal": "#c06e1b"
      },
      "maleAvatarSprite": "./assets/sprites/player-equipment/male/iron-shortsword.png",
      "femaleAvatarSprite": "./assets/sprites/player-equipment/female/iron-shortsword.png",
      "avatarSprite": "./assets/sprites/player-equipment/iron-shortsword.png",
      "avatarSpriteChannels": {
        "metal": "#c06e1b"
      },
      "statBuffs": {}
    }
  },
  "Bronze Longsword": {
    "name": "Bronze Longsword",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 95,
    "lore": "",
    "soundEffect": "./assets/audio/whack.wav",
    "graphic": "./assets/items/iron-longsword.png",
    "graphicSize": 30,
    "graphicTint": "#492b12",
    "graphicChannels": {
      "metal": "#c06e1b"
    },
    "resistances": {},
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/iron-longsword.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/iron-longsword.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-longsword.png",
    "avatarSpriteChannels": {
      "metal": "#c06e1b"
    },
    "weapon": {
      "name": "Bronze Longsword",
      "realm": "Mortal",
      "hands": "Two-Handed",
      "dmgType": "Physical",
      "dice": "2D6",
      "speed": 150,
      "range": 3.5,
      "animation": "slash",
      "soundEffect": "./assets/audio/whack.wav",
      "category": "Melee",
      "weaponTypes": [
        "Slashing"
      ],
      "goldValue": 95,
      "graphic": "./assets/items/iron-longsword.png",
      "graphicSize": 30,
      "graphicTint": "#492b12",
      "graphicChannels": {
        "metal": "#c06e1b"
      },
      "maleAvatarSprite": "./assets/sprites/player-equipment/male/iron-longsword.png",
      "femaleAvatarSprite": "./assets/sprites/player-equipment/female/iron-longsword.png",
      "avatarSprite": "./assets/sprites/player-equipment/iron-longsword.png",
      "avatarSpriteChannels": {
        "metal": "#c06e1b"
      },
      "statBuffs": {}
    }
  },
  "Wooden Staff": {
    "name": "Wooden Staff",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 90,
    "lore": "",
    "soundEffect": "./assets/audio/receive-magic-damage.wav",
    "graphic": "./assets/items/wooden-staff.png",
    "graphicSize": 30,
    "graphicTint": "",
    "resistances": {},
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/wooden-staff.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/wooden-staff.png",
    "avatarSprite": "./assets/sprites/player-equipment/wooden-staff.png",
    "projectileSprite": "./assets/projectiles/magic-missile.png",
    "projectileTint": "#993d00",
    "weapon": {
      "name": "Wooden Staff",
      "realm": "Mortal",
      "hands": "Two-Handed",
      "dmgType": "Magical",
      "dice": "1D6",
      "speed": 100,
      "range": 5,
      "animation": "projectile",
      "soundEffect": "./assets/audio/receive-magic-damage.wav",
      "projectileSpeed": 2,
      "goldValue": 90,
      "graphic": "./assets/items/wooden-staff.png",
      "graphicSize": 30,
      "maleAvatarSprite": "./assets/sprites/player-equipment/male/wooden-staff.png",
      "femaleAvatarSprite": "./assets/sprites/player-equipment/female/wooden-staff.png",
      "avatarSprite": "./assets/sprites/player-equipment/wooden-staff.png",
      "projectileSprite": "./assets/projectiles/magic-missile.png",
      "projectileTint": "#993d00",
      "statBuffs": {}
    }
  },
  "Muckromancer Staff": {
    "name": "Muckromancer Staff",
    "rarity": "rare",
    "slot": "Main Hand",
    "stats": {
      "INT": 1,
      "RESIST": 1
    },
    "goldValue": 90,
    "lore": "",
    "soundEffect": "./assets/audio/receive-magic-damage.wav",
    "graphic": "./assets/items/froglin-staff.png",
    "graphicSize": 30,
    "graphicTint": "",
    "resistances": {},
    "maleAvatarSprite": "./assets/items/froglin-staff.png",
    "femaleAvatarSprite": "./assets/items/froglin-staff.png",
    "avatarSprite": "./assets/sprites/player-equipment/wooden-staff.png",
    "projectileSprite": "./assets/projectiles/magic-missile.png",
    "projectileTint": "#993d00",
    "weapon": {
      "name": "Muckromancer Staff",
      "realm": "Mortal",
      "hands": "Two-Handed",
      "dmgType": "Magical",
      "dice": "1D8",
      "speed": 100,
      "range": 5,
      "animation": "projectile",
      "soundEffect": "./assets/audio/receive-magic-damage.wav",
      "projectileSpeed": 2,
      "goldValue": 90,
      "graphic": "./assets/items/froglin-staff.png",
      "graphicSize": 30,
      "maleAvatarSprite": "./assets/items/froglin-staff.png",
      "femaleAvatarSprite": "./assets/items/froglin-staff.png",
      "avatarSprite": "./assets/sprites/player-equipment/wooden-staff.png",
      "projectileSprite": "./assets/projectiles/magic-missile.png",
      "projectileTint": "#993d00",
      "statBuffs": {
        "INT": 1,
        "RESIST": 1
      }
    }
  },
  "Ebony Wand": {
    "name": "Ebony Wand",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 105,
    "lore": "",
    "soundEffect": "./assets/audio/receive-magic-damage.wav",
    "graphic": "./assets/items/ebony-wand.png",
    "graphicSize": 30,
    "graphicTint": "#a30000",
    "graphicChannels": {
      "metal": "#302c2c"
    },
    "resistances": {},
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/ebony-wand.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/ebony-wand.png",
    "avatarSprite": "./assets/sprites/player-equipment/ebony-wand.png",
    "avatarSpriteTint": "#a30000",
    "avatarSpriteChannels": {
      "metal": "#302c2c",
      "gem": "#ff0000"
    },
    "projectileSprite": "./assets/projectiles/magic-missile.png",
    "projectileTint": "#ff4d00",
    "projectileGlow": true,
    "projectileGlowColor": "#ff0000",
    "weapon": {
      "name": "Ebony Wand",
      "realm": "Infernal",
      "hands": "One-Handed",
      "dmgType": "Magical",
      "dice": "1D6",
      "speed": 100,
      "range": 5,
      "animation": "projectile",
      "soundEffect": "./assets/audio/receive-magic-damage.wav",
      "projectileSpeed": 2,
      "goldValue": 105,
      "graphic": "./assets/items/ebony-wand.png",
      "graphicSize": 30,
      "graphicTint": "#a30000",
      "graphicChannels": {
        "metal": "#302c2c"
      },
      "maleAvatarSprite": "./assets/sprites/player-equipment/male/ebony-wand.png",
      "femaleAvatarSprite": "./assets/sprites/player-equipment/female/ebony-wand.png",
      "avatarSprite": "./assets/sprites/player-equipment/ebony-wand.png",
      "avatarSpriteTint": "#a30000",
      "avatarSpriteChannels": {
        "metal": "#302c2c",
        "gem": "#ff0000"
      },
      "projectileSprite": "./assets/projectiles/magic-missile.png",
      "projectileTint": "#ff4d00",
      "projectileGlow": true,
      "projectileGlowColor": "#ff0000",
      "statBuffs": {}
    }
  },
  "Sunstone Wand": {
    "name": "Sunstone Wand",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 105,
    "lore": "",
    "soundEffect": "./assets/audio/receive-magic-damage.wav",
    "graphic": "./assets/items/ebony-wand.png",
    "graphicSize": 30,
    "graphicTint": "#ff6524",
    "graphicChannels": {
      "metal": "#ffc800"
    },
    "resistances": {},
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/ebony-wand.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/ebony-wand.png",
    "avatarSprite": "./assets/sprites/player-equipment/ebony-wand.png",
    "avatarSpriteTint": "#ff6524",
    "avatarSpriteChannels": {
      "metal": "#ffc800",
      "gem": "#ff0000"
    },
    "projectileSprite": "./assets/projectiles/ice-bolt.png",
    "projectileTint": "#fff585",
    "projectileGlow": true,
    "projectileGlowColor": "#fff700",
    "weapon": {
      "name": "Sunstone Wand",
      "realm": "Celestial",
      "hands": "One-Handed",
      "dmgType": "Magical",
      "dice": "1D6",
      "speed": 100,
      "range": 5,
      "animation": "projectile",
      "soundEffect": "./assets/audio/receive-magic-damage.wav",
      "projectileSpeed": 2,
      "goldValue": 105,
      "graphic": "./assets/items/ebony-wand.png",
      "graphicSize": 30,
      "graphicTint": "#ff6524",
      "graphicChannels": {
        "metal": "#ffc800"
      },
      "maleAvatarSprite": "./assets/sprites/player-equipment/male/ebony-wand.png",
      "femaleAvatarSprite": "./assets/sprites/player-equipment/female/ebony-wand.png",
      "avatarSprite": "./assets/sprites/player-equipment/ebony-wand.png",
      "avatarSpriteTint": "#ff6524",
      "avatarSpriteChannels": {
        "metal": "#ffc800",
        "gem": "#ff0000"
      },
      "projectileSprite": "./assets/projectiles/ice-bolt.png",
      "projectileTint": "#fff585",
      "projectileGlow": true,
      "projectileGlowColor": "#fff700",
      "statBuffs": {}
    }
  },
  "Bone Wand": {
    "name": "Bone Wand",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 105,
    "lore": "",
    "soundEffect": "./assets/audio/receive-magic-damage.wav",
    "graphic": "./assets/items/bone-staff.png",
    "graphicSize": 30,
    "graphicTint": "",
    "resistances": {},
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/bone-staff.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/bone-staff.png",
    "avatarSprite": "./assets/sprites/player-equipment/bone-staff.png",
    "projectileSprite": "./assets/projectiles/magic-missile.png",
    "projectileTint": "#510094",
    "projectileGlow": true,
    "projectileGlowColor": "#000000",
    "weapon": {
      "name": "Bone Wand",
      "realm": "Umbral",
      "hands": "One-Handed",
      "dmgType": "Magical",
      "dice": "1D6",
      "speed": 100,
      "range": 5,
      "animation": "projectile",
      "soundEffect": "./assets/audio/receive-magic-damage.wav",
      "projectileSpeed": 2,
      "goldValue": 105,
      "graphic": "./assets/items/bone-staff.png",
      "graphicSize": 30,
      "maleAvatarSprite": "./assets/sprites/player-equipment/male/bone-staff.png",
      "femaleAvatarSprite": "./assets/sprites/player-equipment/female/bone-staff.png",
      "avatarSprite": "./assets/sprites/player-equipment/bone-staff.png",
      "projectileSprite": "./assets/projectiles/magic-missile.png",
      "projectileTint": "#510094",
      "projectileGlow": true,
      "projectileGlowColor": "#000000",
      "statBuffs": {}
    }
  },
  "Shortbow": {
    "name": "Shortbow",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 70,
    "lore": "",
    "soundEffect": "./assets/audio/turn-page.wav",
    "graphic": "./assets/items/shortbow.png",
    "graphicSize": 30,
    "graphicTint": "",
    "resistances": {},
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/shortbow.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/shortbow.png",
    "avatarSprite": "./assets/sprites/player-equipment/shortbow.png",
    "weapon": {
      "name": "Shortbow",
      "realm": "Mortal",
      "hands": "Two-Handed",
      "dmgType": "Physical",
      "dice": "1D4",
      "speed": 200,
      "range": 6,
      "animation": "projectile",
      "soundEffect": "./assets/audio/turn-page.wav",
      "projectileAnimation": "Arrow",
      "projectileSpeed": 8,
      "ammo": "Bronze Arrow",
      "category": "Bow",
      "weaponTypes": [
        "Bow"
      ],
      "goldValue": 70,
      "graphic": "./assets/items/shortbow.png",
      "graphicSize": 30,
      "maleAvatarSprite": "./assets/sprites/player-equipment/male/shortbow.png",
      "femaleAvatarSprite": "./assets/sprites/player-equipment/female/shortbow.png",
      "avatarSprite": "./assets/sprites/player-equipment/shortbow.png",
      "statBuffs": {}
    }
  },
  "Longbow": {
    "name": "Longbow",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 90,
    "lore": "",
    "soundEffect": "./assets/audio/turn-page.wav",
    "graphic": "./assets/items/longbow.png",
    "graphicSize": 30,
    "graphicTint": "",
    "resistances": {},
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/longbow.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/longbow.png",
    "avatarSprite": "./assets/sprites/player-equipment/longbow.png",
    "weapon": {
      "name": "Longbow",
      "realm": "Mortal",
      "hands": "Two-Handed",
      "dmgType": "Physical",
      "dice": "1D6",
      "speed": 300,
      "range": 8,
      "animation": "projectile",
      "soundEffect": "./assets/audio/turn-page.wav",
      "projectileAnimation": "Arrow",
      "projectileSpeed": 8,
      "ammo": "Bronze Arrow",
      "category": "Bow",
      "weaponTypes": [
        "Bow"
      ],
      "goldValue": 90,
      "graphic": "./assets/items/longbow.png",
      "graphicSize": 30,
      "maleAvatarSprite": "./assets/sprites/player-equipment/male/longbow.png",
      "femaleAvatarSprite": "./assets/sprites/player-equipment/female/longbow.png",
      "avatarSprite": "./assets/sprites/player-equipment/longbow.png",
      "statBuffs": {}
    }
  },
  "Eldwood Shortbow": {
    "name": "Eldwood Shortbow",
    "rarity": "rare",
    "slot": "Main Hand",
    "stats": {
      "FOCUS": 1
    },
    "goldValue": 125,
    "lore": "",
    "soundEffect": "./assets/audio/turn-page.wav",
    "graphic": "./assets/items/shortbow.png",
    "graphicSize": 30,
    "graphicTint": "",
    "resistances": {},
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/eldwood-shortbow.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/eldwood-shortbow.png",
    "avatarSprite": "./assets/sprites/player-equipment/eldwood-shortbow.png",
    "weapon": {
      "name": "Eldwood Shortbow",
      "realm": "Sylvan",
      "hands": "Two-Handed",
      "dmgType": "Physical",
      "dice": "1D4 + 2",
      "speed": 150,
      "range": 6,
      "animation": "projectile",
      "soundEffect": "./assets/audio/turn-page.wav",
      "projectileAnimation": "Arrow",
      "projectileSpeed": 8,
      "ammo": "Bronze Arrow",
      "category": "Bow",
      "weaponTypes": [
        "Bow"
      ],
      "goldValue": 125,
      "graphic": "./assets/items/shortbow.png",
      "graphicSize": 30,
      "maleAvatarSprite": "./assets/sprites/player-equipment/male/eldwood-shortbow.png",
      "femaleAvatarSprite": "./assets/sprites/player-equipment/female/eldwood-shortbow.png",
      "avatarSprite": "./assets/sprites/player-equipment/eldwood-shortbow.png",
      "statBuffs": {
        "FOCUS": 1
      }
    }
  },
  "Bronze Battleaxe": {
    "name": "Bronze Battleaxe",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 90,
    "lore": "",
    "soundEffect": "./assets/audio/turn-page.wav",
    "graphic": "./assets/items/iron-battleaxe.png",
    "graphicSize": 30,
    "graphicTint": "#5d3727",
    "graphicChannels": {
      "metal": "#c06e1b"
    },
    "resistances": {},
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/iron-battleaxe.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/iron-battleaxe.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-battleaxe.png",
    "avatarSpriteChannels": {
      "metal": "#c06e1b"
    },
    "weapon": {
      "name": "Bronze Battleaxe",
      "realm": "Mortal",
      "hands": "One-Handed",
      "dmgType": "Physical",
      "dice": "2D4",
      "speed": 200,
      "range": 3.5,
      "animation": "slash",
      "soundEffect": "./assets/audio/turn-page.wav",
      "category": "Melee",
      "weaponTypes": [
        "Slashing",
        "Axe"
      ],
      "goldValue": 90,
      "graphic": "./assets/items/iron-battleaxe.png",
      "graphicSize": 30,
      "graphicTint": "#5d3727",
      "graphicChannels": {
        "metal": "#c06e1b"
      },
      "maleAvatarSprite": "./assets/sprites/player-equipment/male/iron-battleaxe.png",
      "femaleAvatarSprite": "./assets/sprites/player-equipment/female/iron-battleaxe.png",
      "avatarSprite": "./assets/sprites/player-equipment/iron-battleaxe.png",
      "avatarSpriteChannels": {
        "metal": "#c06e1b"
      },
      "statBuffs": {}
    }
  },
  "Bogchieftan Tomahawk": {
    "name": "Bogchieftan Tomahawk",
    "rarity": "rare",
    "slot": "Main Hand",
    "stats": {
      "HP": 4,
      "ATK": 1,
      "FOCUS": 1
    },
    "goldValue": 90,
    "lore": "",
    "soundEffect": "./assets/audio/turn-page.wav",
    "graphic": "./assets/items/froglin-tomahawk.png",
    "graphicSize": 30,
    "graphicTint": "",
    "resistances": {},
    "maleAvatarSprite": "./assets/items/froglin-tomahawk.png",
    "femaleAvatarSprite": "./assets/items/froglin-tomahawk.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-battleaxe.png",
    "weapon": {
      "name": "Bogchieftan Tomahawk",
      "realm": "Mortal",
      "hands": "One-Handed",
      "dmgType": "Physical",
      "dice": "2D5",
      "speed": 185,
      "range": 3.5,
      "animation": "slash",
      "soundEffect": "./assets/audio/turn-page.wav",
      "category": "Melee",
      "weaponTypes": [
        "Slashing",
        "Axe"
      ],
      "goldValue": 90,
      "graphic": "./assets/items/froglin-tomahawk.png",
      "graphicSize": 30,
      "maleAvatarSprite": "./assets/items/froglin-tomahawk.png",
      "femaleAvatarSprite": "./assets/items/froglin-tomahawk.png",
      "avatarSprite": "./assets/sprites/player-equipment/iron-battleaxe.png",
      "statBuffs": {
        "HP": 4,
        "ATK": 1,
        "FOCUS": 1
      }
    }
  },
  "Nurdine's Whip": {
    "name": "Nurdine's Whip",
    "rarity": "rare",
    "slot": "Main Hand",
    "stats": {
      "AGL": 2,
      "FOCUS": 1,
      "RESIST": 1
    },
    "goldValue": 300,
    "lore": "\"Made from the tail of her brother-husband who displeased her\"",
    "soundEffect": "./assets/audio/turn-page.wav",
    "graphic": "./assets/items/leather-whip.png",
    "graphicSize": 30,
    "graphicTint": "",
    "resistances": {},
    "maleAvatarSprite": "./assets/items/leather-whip.png",
    "femaleAvatarSprite": "./assets/items/leather-whip.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-battleaxe.png",
    "weapon": {
      "name": "Nurdine's Whip",
      "realm": "Infernal",
      "hands": "One-Handed",
      "dmgType": "Physical",
      "dice": "2D4",
      "speed": 150,
      "range": 3.5,
      "animation": "slash",
      "soundEffect": "./assets/audio/turn-page.wav",
      "category": "Melee",
      "weaponTypes": [
        "Slashing"
      ],
      "effects": {
        "stun": {
          "enabled": true,
          "chance": 5,
          "duration": 2
        }
      },
      "goldValue": 300,
      "lore": "\"Made from the tail of her brother-husband who displeased her\"",
      "graphic": "./assets/items/leather-whip.png",
      "graphicSize": 30,
      "maleAvatarSprite": "./assets/items/leather-whip.png",
      "femaleAvatarSprite": "./assets/items/leather-whip.png",
      "avatarSprite": "./assets/sprites/player-equipment/iron-battleaxe.png",
      "statBuffs": {
        "AGL": 2,
        "FOCUS": 1,
        "RESIST": 1
      }
    }
  },
  "Bronze Mace": {
    "name": "Bronze Mace",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 80,
    "lore": "",
    "soundEffect": "./assets/audio/stab.wav",
    "graphic": "./assets/items/iron-mace.png",
    "graphicSize": 30,
    "graphicTint": "#462911",
    "graphicChannels": {
      "metal": "#c06e1b"
    },
    "resistances": {},
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/iron-mace.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/iron-mace.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-mace.png",
    "avatarSpriteChannels": {
      "metal": "#c06e1b"
    },
    "weapon": {
      "name": "Bronze Mace",
      "realm": "Mortal",
      "hands": "One-Handed",
      "dmgType": "Physical",
      "dice": "1D6",
      "speed": 100,
      "range": 3,
      "animation": "whack",
      "soundEffect": "./assets/audio/stab.wav",
      "category": "Melee",
      "weaponTypes": [
        "Blunt"
      ],
      "effects": {
        "stun": {
          "enabled": true,
          "chance": 5,
          "duration": 2
        }
      },
      "goldValue": 80,
      "graphic": "./assets/items/iron-mace.png",
      "graphicSize": 30,
      "graphicTint": "#462911",
      "graphicChannels": {
        "metal": "#c06e1b"
      },
      "maleAvatarSprite": "./assets/sprites/player-equipment/male/iron-mace.png",
      "femaleAvatarSprite": "./assets/sprites/player-equipment/female/iron-mace.png",
      "avatarSprite": "./assets/sprites/player-equipment/iron-mace.png",
      "avatarSpriteChannels": {
        "metal": "#c06e1b"
      },
      "statBuffs": {}
    }
  },
  "Fist of the Whisperer": {
    "name": "Fist of the Whisperer",
    "rarity": "rare",
    "slot": "Main Hand",
    "stats": {
      "ATK": 1,
      "INT": 1,
      "FOCUS": 1,
      "RESIST": 1,
      "REGEN": 1
    },
    "goldValue": 160,
    "lore": "",
    "soundEffect": "./assets/audio/stab.wav",
    "graphic": "./assets/items/waterfall-hammer.png",
    "graphicSize": 30,
    "graphicTint": "",
    "resistances": {},
    "maleAvatarSprite": "./assets/items/waterfall-hammer.png",
    "femaleAvatarSprite": "./assets/items/waterfall-hammer.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-mace.png",
    "weapon": {
      "name": "Fist of the Whisperer",
      "realm": "Ethereal",
      "hands": "One-Handed",
      "dmgType": "Physical",
      "dice": "1D8",
      "speed": 100,
      "range": 3,
      "animation": "whack",
      "soundEffect": "./assets/audio/stab.wav",
      "category": "Melee",
      "weaponTypes": [
        "Blunt"
      ],
      "effects": {
        "stun": {
          "enabled": true,
          "chance": 5,
          "duration": 2
        }
      },
      "goldValue": 160,
      "graphic": "./assets/items/waterfall-hammer.png",
      "graphicSize": 30,
      "maleAvatarSprite": "./assets/items/waterfall-hammer.png",
      "femaleAvatarSprite": "./assets/items/waterfall-hammer.png",
      "avatarSprite": "./assets/sprites/player-equipment/iron-mace.png",
      "statBuffs": {
        "ATK": 1,
        "INT": 1,
        "FOCUS": 1,
        "RESIST": 1,
        "REGEN": 1
      }
    }
  },
  "Rock Fist": {
    "name": "Rock Fist",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 80,
    "lore": "",
    "soundEffect": "./assets/audio/stab.wav",
    "graphic": "./assets/sprites/rock.png",
    "graphicSize": 30,
    "graphicTint": "",
    "resistances": {},
    "maleAvatarSprite": "./assets/sprites/rock.png",
    "femaleAvatarSprite": "./assets/sprites/rock.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-mace.png",
    "weapon": {
      "name": "Rock Fist",
      "realm": "Mortal",
      "hands": "One-Handed",
      "dmgType": "Physical",
      "dice": "1D6",
      "speed": 100,
      "range": 3,
      "animation": "whack",
      "soundEffect": "./assets/audio/stab.wav",
      "category": "Melee",
      "weaponTypes": [
        "Blunt"
      ],
      "effects": {
        "stun": {
          "enabled": true,
          "chance": 5,
          "duration": 2
        }
      },
      "goldValue": 80,
      "graphic": "./assets/sprites/rock.png",
      "graphicSize": 30,
      "maleAvatarSprite": "./assets/sprites/rock.png",
      "femaleAvatarSprite": "./assets/sprites/rock.png",
      "avatarSprite": "./assets/sprites/player-equipment/iron-mace.png",
      "statBuffs": {}
    }
  },
  "Ice Fist": {
    "name": "Ice Fist",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 80,
    "lore": "",
    "soundEffect": "./assets/audio/stab.wav",
    "graphic": "./assets/sprites/rock.png",
    "graphicSize": 30,
    "graphicTint": "#67bdda",
    "resistances": {},
    "maleAvatarSprite": "./assets/sprites/rock.png",
    "femaleAvatarSprite": "./assets/sprites/rock.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-mace.png",
    "avatarSpriteTint": "#67bdda",
    "weapon": {
      "name": "Ice Fist",
      "realm": "Ethereal",
      "hands": "One-Handed",
      "dmgType": "Physical",
      "dice": "1D6",
      "speed": 100,
      "range": 3,
      "animation": "whack",
      "soundEffect": "./assets/audio/stab.wav",
      "category": "Melee",
      "weaponTypes": [
        "Blunt"
      ],
      "effects": {
        "stun": {
          "enabled": true,
          "chance": 5,
          "duration": 2
        }
      },
      "goldValue": 80,
      "graphic": "./assets/sprites/rock.png",
      "graphicSize": 30,
      "graphicTint": "#67bdda",
      "maleAvatarSprite": "./assets/sprites/rock.png",
      "femaleAvatarSprite": "./assets/sprites/rock.png",
      "avatarSprite": "./assets/sprites/player-equipment/iron-mace.png",
      "avatarSpriteTint": "#67bdda",
      "statBuffs": {}
    }
  },
  "Granite Fist": {
    "name": "Granite Fist",
    "rarity": "common",
    "slot": "Main Hand",
    "stats": {},
    "goldValue": 80,
    "lore": "",
    "soundEffect": "./assets/audio/stab.wav",
    "graphic": "./assets/sprites/rock-64.png",
    "graphicSize": 30,
    "graphicTint": "",
    "resistances": {},
    "maleAvatarSprite": "./assets/sprites/rock.png",
    "femaleAvatarSprite": "./assets/sprites/rock.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-mace.png",
    "weapon": {
      "name": "Granite Fist",
      "realm": "Mortal",
      "hands": "One-Handed",
      "dmgType": "Physical",
      "dice": "1D6",
      "speed": 100,
      "range": 3,
      "animation": "whack",
      "soundEffect": "./assets/audio/stab.wav",
      "category": "Melee",
      "weaponTypes": [
        "Blunt"
      ],
      "effects": {
        "stun": {
          "enabled": true,
          "chance": 5,
          "duration": 2
        }
      },
      "goldValue": 80,
      "graphic": "./assets/sprites/rock-64.png",
      "graphicSize": 30,
      "maleAvatarSprite": "./assets/sprites/rock.png",
      "femaleAvatarSprite": "./assets/sprites/rock.png",
      "avatarSprite": "./assets/sprites/player-equipment/iron-mace.png",
      "statBuffs": {}
    }
  },
  "Leather Breastplate": {
    "name": "Leather Breastplate",
    "rarity": "common",
    "slot": "Chest",
    "stats": {
      "DEF": 1,
      "BLOCK": 1
    },
    "lore": "",
    "graphic": "./assets/items/leather-chest-armor.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/leather-chest.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/leather-chest.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/leather-chest.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/leather-chest.png",
    "avatarSprite": "./assets/sprites/player-equipment/leather-breastplate.png",
    "goldValue": 60,
    "graphicTint": ""
  },
  "Leather Hood": {
    "name": "Leather Hood",
    "rarity": "common",
    "slot": "Head",
    "stats": {
      "DEF": 0.5,
      "BLOCK": 1
    },
    "lore": "",
    "graphic": "./assets/items/cloth-hood.png",
    "graphicSize": 30,
    "graphicTint": "#3f2213",
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/cloth-head.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/cloth-head.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/leather-hood.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/leather-hood.png",
    "avatarSprite": "./assets/sprites/player-equipment/leather-hood.png",
    "avatarSpriteTint": "#3f2213",
    "goldValue": 45
  },
  "Leather Gloves": {
    "name": "Leather Gloves",
    "rarity": "common",
    "slot": "Hands",
    "stats": {
      "DEF": 0.5,
      "BLOCK": 1
    },
    "lore": "",
    "graphic": "./assets/items/leather-gloves.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/gloves.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/gloves.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/leather-gloves.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/leather-gloves.png",
    "avatarSprite": "./assets/sprites/player-equipment/leather-gloves.png",
    "avatarSpriteTint": "#553f25",
    "goldValue": 45,
    "graphicTint": ""
  },
  "Leather Belt": {
    "name": "Leather Belt",
    "rarity": "common",
    "slot": "Waist",
    "stats": {
      "DEF": 0.5,
      "BLOCK": 1
    },
    "lore": "",
    "graphic": "./assets/items/leather-belt.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/belt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/belt.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/leather-belt.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/leather-belt.png",
    "avatarSprite": "./assets/sprites/player-equipment/leather-gloves.png",
    "goldValue": 45,
    "graphicTint": ""
  },
  "Leather Bracer": {
    "name": "Leather Bracer",
    "rarity": "common",
    "slot": "Wrist",
    "stats": {
      "DEF": 0.5,
      "BLOCK": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/leather-bracer.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/leather-bracer.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/leather-wrist-right.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/leather-bracer-left.png",
    "maleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/male/leather-bracer-left.png",
    "femaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/female/leather-wrist-left.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/leather-bracer-left.png",
    "dwarfFemaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/leather-bracer-left.png",
    "maleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/male/leather-bracer-right.png",
    "femaleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/female/leather-wrist-right.png",
    "dwarfMaleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/leather-bracer-right.png",
    "dwarfFemaleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/leather-bracer-right.png",
    "avatarSprite": "./assets/sprites/player-equipment/leather-bracer.png",
    "goldValue": 25,
    "graphicTint": ""
  },
  "Bronze Chainmail Bracer": {
    "name": "Bronze Chainmail Bracer",
    "rarity": "common",
    "slot": "Wrist",
    "stats": {
      "DEF": 1,
      "AGL": -0.5,
      "BLOCK": 1
    },
    "lore": "",
    "graphic": "./assets/items/chainmail-bracer.png",
    "graphicSize": 30,
    "graphicTint": "#47290a",
    "graphicChannels": {
      "metal": "#c06e1b"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/plate-bracer-left.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/chainmail-wrist-left.png",
    "femaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/female/chainmail-wrist-left.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/chainmail-bracer-left.png",
    "dwarfFemaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/chainmail-bracer-left.png",
    "maleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/male/plate-bracer-right.png",
    "femaleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/female/chainmail-wrist-right.png",
    "dwarfMaleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/chainmail-bracer-right.png",
    "dwarfFemaleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/chainmail-bracer-right.png",
    "avatarSprite": "./assets/sprites/player-equipment/leather-bracer.png",
    "avatarSpriteTint": "#c06e1b",
    "goldValue": 55
  },
  "Ratzkhanite Leather Bracer": {
    "name": "Ratzkhanite Leather Bracer",
    "rarity": "rare",
    "slot": "Wrist",
    "stats": {
      "DEF": 2,
      "AGL": 1,
      "INT": 1,
      "BLOCK": 2,
      "RESIST": 1,
      "REGEN": 1
    },
    "lore": "",
    "graphic": "./assets/items/spiked-bracer.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/dominatrix-bracer-left.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/leather-bracer.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/ratzkhanite-bracer-left.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/ratzkhanite-bracer-left.png",
    "maleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/male/dominatrix-bracer-left.png",
    "femaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/female/dominatrix-bracer-left.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/ratzkhanite-bracer-left.png",
    "dwarfFemaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/ratzkhanite-bracer-left.png",
    "maleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/male/dominatrix-bracer-right.png",
    "femaleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/female/dominatrix-bracer-right.png",
    "dwarfMaleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/ratzkhanite-bracer-right.png",
    "dwarfFemaleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/ratzkhanite-bracer-right.png",
    "avatarSprite": "./assets/sprites/player-equipment/leather-bracer.png",
    "goldValue": 120,
    "graphicTint": ""
  },
  "Bronze Plate Bracer": {
    "name": "Bronze Plate Bracer",
    "rarity": "common",
    "slot": "Wrist",
    "stats": {
      "DEF": 1.5,
      "AGL": -1,
      "BLOCK": 1.5
    },
    "lore": "",
    "graphic": "./assets/items/platemail-bracer.png",
    "graphicSize": 30,
    "graphicTint": "#c06e1b",
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/plate-bracer-left.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/leather-bracer.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-bracer-left.png",
    "maleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/male/plate-bracer-left.png",
    "femaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/female/plate-wrist-left.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-bracer-left.png",
    "dwarfFemaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/plate-bracer-left.png",
    "maleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/male/plate-bracer-right.png",
    "femaleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/female/plate-wrist-right.png",
    "dwarfMaleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-bracer-right.png",
    "dwarfFemaleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/plate-bracer-right.png",
    "avatarSprite": "./assets/sprites/player-equipment/leather-bracer.png",
    "avatarSpriteTint": "#c06e1b",
    "goldValue": 85
  },
  "Iron Plate Bracer": {
    "name": "Iron Plate Bracer",
    "rarity": "common",
    "slot": "Wrist",
    "stats": {
      "DEF": 2,
      "AGL": -1.5,
      "BLOCK": 2
    },
    "lore": "",
    "graphic": "./assets/items/platemail-bracer.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/plate-bracer-left.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/plate-wrist-left.png",
    "maleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/male/plate-bracer-left.png",
    "femaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/female/plate-wrist-left.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-bracer-left.png",
    "dwarfFemaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/plate-bracer-left.png",
    "maleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/male/plate-bracer-right.png",
    "femaleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/female/plate-wrist-right.png",
    "dwarfMaleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-bracer-right.png",
    "dwarfFemaleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/plate-bracer-right.png",
    "avatarSprite": "./assets/sprites/player-equipment/leather-bracer.png",
    "goldValue": 115,
    "graphicTint": ""
  },
  "Leather Pants": {
    "name": "Leather Pants",
    "rarity": "common",
    "slot": "Legs",
    "stats": {
      "DEF": 1,
      "BLOCK": 1
    },
    "lore": "",
    "graphic": "./assets/items/leather-pants.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/leather-legs.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/leather-legs.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/leather-pants.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/leather-pants.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/leather-pants.png",
    "avatarSprite": "./assets/sprites/player-equipment/leather-pants.png",
    "goldValue": 60,
    "graphicTint": ""
  },
  "Ratzkhanite Leather Garter": {
    "name": "Ratzkhanite Leather Garter",
    "rarity": "rare",
    "slot": "Legs",
    "stats": {
      "ATK": 1,
      "DEF": 2,
      "AGL": 2,
      "INT": 2,
      "BLOCK": 2,
      "RESIST": 1
    },
    "lore": "",
    "graphic": "./assets/items/leather-pants.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/dominatrix-legs.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/dominatrix-legs.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/ratzkhanite-legs.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/ratzkhanite-legs.png",
    "avatarSprite": "./assets/sprites/player-equipment/leather-pants.png",
    "goldValue": 200,
    "graphicTint": ""
  },
  "Ratzkhanite Leather Boots": {
    "name": "Ratzkhanite Leather Boots",
    "rarity": "rare",
    "slot": "Feet",
    "stats": {
      "ATK": 1,
      "DEF": 2,
      "AGL": 2,
      "INT": 2,
      "BLOCK": 2,
      "RESIST": 1
    },
    "lore": "",
    "graphic": "./assets/items/leather-boots.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/leather-feet.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/dominatrix-boots.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/chainmail-boots.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/chainmail-boots.png",
    "maleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/male/leather-feet.png",
    "femaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/female/dominatrix-boots.png",
    "avatarSprite": "./assets/sprites/player-equipment/leather-pants.png",
    "goldValue": 200,
    "graphicTint": ""
  },
  "Ratzkhanite Leather Corset": {
    "name": "Ratzkhanite Leather Corset",
    "rarity": "rare",
    "slot": "Chest",
    "stats": {
      "ATK": 1,
      "DEF": 2,
      "AGL": 2,
      "INT": 2,
      "BLOCK": 2,
      "RESIST": 1
    },
    "lore": "",
    "graphic": "./assets/items/leather-chest-armor.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/dominatrix-chest.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/dominatrix-chest.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/ratzkhanite-chest.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/ratzkhanite-chest.png",
    "avatarSprite": "./assets/sprites/player-equipment/leather-pants.png",
    "goldValue": 200,
    "graphicTint": ""
  },
  "Sylvarweave Robe": {
    "name": "Sylvarweave Robe",
    "rarity": "rare",
    "slot": "Chest",
    "stats": {
      "ATK": 1,
      "DEF": 1,
      "AGL": 1,
      "INT": 2,
      "FOCUS": 1,
      "RESIST": 2,
      "REGEN": 2
    },
    "lore": "\"Legend holds that Queen Mab herself wore only Sylvarweave. Could this be one of her relics?\"",
    "graphic": "./assets/items/elaborate-robe.png",
    "graphicSize": 30,
    "graphicTint": "#ff9500",
    "graphicChannels": {
      "metal": "#10651a"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/druid-chest.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/sylvarweave-robe.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/druid-robe.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/druid-robe.png",
    "avatarSprite": "./assets/sprites/player-equipment/leather-pants.png",
    "goldValue": 200
  },
  "Ancient Treantwood Bracer": {
    "name": "Ancient Treantwood Bracer",
    "rarity": "rare",
    "slot": "Wrist",
    "stats": {
      "HP": 3,
      "ATK": 2,
      "DEF": 2,
      "AGL": 2,
      "BLOCK": 2,
      "RESIST": 2,
      "REGEN": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/platemail-bracer.png",
    "graphicSize": 30,
    "graphicTint": "#ff9500",
    "graphicChannels": {
      "metal": "#10651a"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/druid-wrist-left.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/ancient-treantwood-bracer-left.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/druid-bracer-left.png",
    "maleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/male/druid-wrist-left.png",
    "femaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/female/ancient-treantwood-bracer-left.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/druid-bracer-left.png",
    "dwarfFemaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/druid-bracer-left.png",
    "maleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/male/druid-wrist-right.png",
    "femaleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/female/ancient-treantwood-bracer-right.png",
    "dwarfMaleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/druid-bracer-right.png",
    "dwarfFemaleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/druid-bracer-right.png",
    "avatarSprite": "./assets/sprites/player-equipment/templates/male/druid-wrist-left.png",
    "goldValue": 140
  },
  "Cat Eye Agate Belt": {
    "name": "Cat Eye Agate Belt",
    "rarity": "rare",
    "slot": "Waist",
    "stats": {
      "HP": 5,
      "ATK": 1.5,
      "DEF": 1.5,
      "AGL": 1.5,
      "INT": 1.5,
      "FOCUS": 1.5,
      "BLOCK": 1.5,
      "RESIST": 1.5,
      "REGEN": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/gem-studded-belt.png",
    "graphicSize": 30,
    "graphicTint": "#835a20",
    "graphicChannels": {
      "metal": "#582222",
      "gem": "#b5a121"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/druid-belt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/cat-eye-agate-belt.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/druid-belt.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/druid-belt.png",
    "maleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/male/druid-belt.png",
    "femaleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/female/cat-eye-agate-belt.png",
    "avatarSprite": "./assets/sprites/player-equipment/leather-pants.png",
    "goldValue": 120
  },
  "Canopy Epaulets": {
    "name": "Canopy Epaulets",
    "rarity": "rare",
    "slot": "Shoulders",
    "stats": {
      "DEF": 2,
      "INT": 1.5,
      "FOCUS": 1,
      "BLOCK": 1,
      "RESIST": 1.5,
      "REGEN": 1.5
    },
    "lore": "",
    "graphic": "./assets/items/cloth-epaulettes.png",
    "graphicSize": 30,
    "graphicTint": "#ff9500",
    "graphicChannels": {
      "metal": "#10651a"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/druid-shoulders.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/male/druid-shoulders.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/druid-shoulders.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/druid-shoulders.png",
    "avatarSprite": "./assets/sprites/player-equipment/leather-pants.png",
    "goldValue": 150
  },
  "Ratzkhanite Leather Spaulder": {
    "name": "Ratzkhanite Leather Spaulder",
    "rarity": "rare",
    "slot": "Shoulders",
    "stats": {
      "ATK": 1,
      "DEF": 2,
      "AGL": 2,
      "INT": 2,
      "BLOCK": 2,
      "RESIST": 1
    },
    "lore": "",
    "graphic": "./assets/items/leather-pauldrons.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/dominatrix-shoulders.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/dominatrix-shoulders.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/ratzkhanite-shoulder.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/ratzkhanite-shoulder.png",
    "avatarSprite": "./assets/sprites/player-equipment/leather-pants.png",
    "goldValue": 200,
    "graphicTint": ""
  },
  "Leather Boots": {
    "name": "Leather Boots",
    "rarity": "common",
    "slot": "Feet",
    "stats": {
      "DEF": 0.5,
      "BLOCK": 1
    },
    "lore": "",
    "graphic": "./assets/items/leather-boots.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/leather-feet.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/leather-feet.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/leather-boots.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/leather-boots.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/leather-boots.png",
    "avatarSprite": "./assets/sprites/player-equipment/leather-boots.png",
    "goldValue": 45,
    "graphicTint": ""
  },
  "Leather Pauldrons": {
    "name": "Leather Pauldrons",
    "rarity": "common",
    "slot": "Shoulders",
    "stats": {
      "DEF": 0.5,
      "BLOCK": 1
    },
    "lore": "",
    "graphic": "./assets/items/leather-pauldrons.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/leather-shoulders.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/leather-shoulders.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/leather-shoulders.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/leather-shoulders.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/leather-shoulders.png",
    "avatarSprite": "./assets/sprites/player-equipment/leather-pauldrons.png",
    "goldValue": 45,
    "graphicTint": ""
  },
  "Froglin Pauldron": {
    "name": "Froglin Pauldron",
    "rarity": "uncommon",
    "slot": "Shoulders",
    "stats": {
      "DEF": 0.5,
      "BLOCK": 1,
      "RESIST": 1
    },
    "lore": "",
    "graphic": "./assets/items/leather-pauldrons.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/dominatrix-shoulders.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/dominatrix-shoulders.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/ratzkhanite-shoulder.png",
    "avatarSprite": "./assets/sprites/player-equipment/leather-pauldrons.png",
    "goldValue": 45,
    "graphicTint": ""
  },
  "Bronze Plate Pauldrons": {
    "name": "Bronze Plate Pauldrons",
    "rarity": "common",
    "slot": "Shoulders",
    "stats": {
      "DEF": 1.5,
      "AGL": -1,
      "BLOCK": 1.5
    },
    "lore": "",
    "graphic": "./assets/items/platemail-pauldrons.png",
    "graphicSize": 30,
    "graphicTint": "#c06e1b",
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/plate-shoulders.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/plate-shoulders.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-shoulders.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/plate-shoulders.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-shoulders.png",
    "dwarfMaleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-shoulders.png",
    "avatarSprite": "./assets/sprites/player-equipment/leather-pauldrons.png",
    "avatarSpriteTint": "#c06e1b",
    "goldValue": 105
  },
  "Spidersilk Cowl": {
    "name": "Spidersilk Cowl",
    "rarity": "common",
    "slot": "Head",
    "stats": {
      "INT": 1,
      "RESIST": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/cloth-hood.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/cloth-head.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/cloth-head.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/cloth-hood.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/cloth-hood.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/cloth-hood.png",
    "avatarSprite": "./assets/sprites/player-equipment/spidersilk-cowl.png",
    "goldValue": 40,
    "graphicTint": ""
  },
  "Spidersilk Shirt": {
    "name": "Spidersilk Shirt",
    "rarity": "common",
    "slot": "Chest",
    "stats": {
      "INT": 1,
      "RESIST": 1
    },
    "lore": "",
    "graphic": "./assets/items/cloth-shirt.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/cloth-chest.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/cloth-chest.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/cloth-chest.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/cloth-chest.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/cloth-chest.png",
    "avatarSprite": "./assets/sprites/player-equipment/spidersilk-shirt.png",
    "goldValue": 50,
    "graphicTint": ""
  },
  "Spidersilk Robe": {
    "name": "Spidersilk Robe",
    "rarity": "common",
    "slot": "Chest",
    "stats": {
      "INT": 2,
      "RESIST": 2
    },
    "lore": "",
    "graphic": "./assets/items/cloth-robe.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/wizard-robe.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/wizard-robe.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/robe.png",
    "avatarSprite": "./assets/sprites/player-equipment/spidersilk-shirt.png",
    "goldValue": 50,
    "graphicTint": ""
  },
  "Alchemist's Robe": {
    "name": "Alchemist's Robe",
    "rarity": "rare",
    "slot": "Chest",
    "stats": {
      "DEF": 1,
      "AGL": 2,
      "INT": 3,
      "FOCUS": 1,
      "REGEN": 1
    },
    "lore": "",
    "graphic": "./assets/items/cloth-robe.png",
    "graphicSize": 30,
    "graphicTint": "#d09849",
    "resistances": {
      "Ethereal": 1,
      "Celestial": 1,
      "Infernal": 2,
      "Sylvan": 1,
      "Umbral": 2
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/wizard-robe.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/wizard-robe.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/robe.png",
    "avatarSprite": "./assets/sprites/player-equipment/spidersilk-shirt.png",
    "avatarSpriteTint": "#d09849",
    "goldValue": 50
  },
  "Alchemist's Pants": {
    "name": "Alchemist's Pants",
    "rarity": "rare",
    "slot": "Legs",
    "stats": {
      "DEF": 1,
      "AGL": 2,
      "INT": 3,
      "FOCUS": 1,
      "REGEN": 1
    },
    "lore": "",
    "graphic": "./assets/items/cloth-pants.png",
    "graphicSize": 30,
    "graphicTint": "#d09849",
    "resistances": {
      "Ethereal": 1,
      "Celestial": 1,
      "Infernal": 2,
      "Sylvan": 1,
      "Umbral": 2
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/cloth-legs.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/cloth-legs.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/cloth-pants.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/pants.png",
    "avatarSprite": "./assets/sprites/player-equipment/spidersilk-shirt.png",
    "avatarSpriteTint": "#d09849",
    "goldValue": 50
  },
  "Spidersilk Gloves": {
    "name": "Spidersilk Gloves",
    "rarity": "common",
    "slot": "Hands",
    "stats": {
      "INT": 1,
      "RESIST": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/cloth-gloves.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/gloves.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/gloves.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/leather-gloves.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/leather-gloves.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/leather-gloves.png",
    "avatarSprite": "./assets/sprites/player-equipment/spidersilk-gloves.png",
    "avatarSpriteTint": "#acae93",
    "goldValue": 40,
    "graphicTint": ""
  },
  "Spidersilk Belt": {
    "name": "Spidersilk Belt",
    "rarity": "common",
    "slot": "Waist",
    "stats": {
      "INT": 1,
      "RESIST": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/sash-belt.png",
    "graphicSize": 30,
    "graphicTint": "#a3a3a3",
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/belt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/belt.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/cloth-belt.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/robe-belt.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/cloth-belt.png",
    "avatarSprite": "./assets/sprites/player-equipment/spidersilk-gloves.png",
    "avatarSpriteTint": "#acae93",
    "goldValue": 40
  },
  "Rope Belt": {
    "name": "Rope Belt",
    "rarity": "common",
    "slot": "Waist",
    "stats": {
      "SPD": 0.5,
      "AGL": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/rope-belt.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/belt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/belt.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/cloth-belt.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/robe-belt.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/cloth-belt.png",
    "avatarSprite": "./assets/sprites/player-equipment/spidersilk-gloves.png",
    "goldValue": 25,
    "graphicTint": ""
  },
  "Spidersilk Pants": {
    "name": "Spidersilk Pants",
    "rarity": "common",
    "slot": "Legs",
    "stats": {
      "INT": 1,
      "RESIST": 1
    },
    "lore": "",
    "graphic": "./assets/items/cloth-pants.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/cloth-legs.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/cloth-legs.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/cloth-pants.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/pants.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/cloth-pants.png",
    "avatarSprite": "./assets/sprites/player-equipment/spidersilk-pants.png",
    "goldValue": 40,
    "graphicTint": ""
  },
  "Spidersilk Slippers": {
    "name": "Spidersilk Slippers",
    "rarity": "common",
    "slot": "Feet",
    "stats": {
      "INT": 1,
      "RESIST": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/cloth-slippers.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/shoes.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/shoes.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/shoes.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/shoes.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/male/shoes.png",
    "avatarSprite": "./assets/sprites/player-equipment/spidersilk-slippers.png",
    "goldValue": 40,
    "graphicTint": ""
  },
  "Spidersilk Shoulderpads": {
    "name": "Spidersilk Shoulderpads",
    "rarity": "common",
    "slot": "Shoulders",
    "stats": {
      "INT": 1,
      "RESIST": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/cloth-epaulettes.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/cloth-shoulders.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/cloth-shoulders.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/cloth-shoulders.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/cloth-shoulders.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/cloth-shoulders.png",
    "avatarSprite": "./assets/sprites/player-equipment/spidersilk-slippers.png",
    "goldValue": 40,
    "graphicTint": ""
  },
  "Eldweave Shirt": {
    "name": "Eldweave Shirt",
    "rarity": "rare",
    "slot": "Chest",
    "stats": {
      "DEF": 1,
      "AGL": 1,
      "INT": 1,
      "RESIST": 1,
      "REGEN": 1
    },
    "lore": "",
    "graphic": "./assets/items/cloth-shirt.png",
    "graphicSize": 30,
    "graphicTint": "#176b0a",
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/cloth-chest.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/cloth-chest.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/cloth-chest.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/cloth-chest.png",
    "avatarSprite": "./assets/sprites/player-equipment/eldweave-shirt.png",
    "avatarSpriteTint": "#176b0a",
    "goldValue": 140
  },
  "Eldweave Hood": {
    "name": "Eldweave Hood",
    "rarity": "rare",
    "slot": "Head",
    "stats": {
      "DEF": 1,
      "AGL": 1,
      "INT": 1,
      "RESIST": 1,
      "REGEN": 1
    },
    "lore": "",
    "graphic": "./assets/items/cloth-hood.png",
    "graphicSize": 30,
    "graphicTint": "#176b0a",
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/cloth-head.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/cloth-head.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/cloth-hood.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/cloth-hood.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/cloth-hood.png",
    "avatarSprite": "./assets/sprites/player-equipment/eldweave-hood.png",
    "avatarSpriteTint": "#176b0a",
    "goldValue": 115
  },
  "Eldweave Gloves": {
    "name": "Eldweave Gloves",
    "rarity": "rare",
    "slot": "Hands",
    "stats": {
      "DEF": 1,
      "AGL": 1,
      "INT": 1,
      "RESIST": 1,
      "REGEN": 1
    },
    "lore": "",
    "graphic": "./assets/items/cloth-gloves.png",
    "graphicSize": 30,
    "graphicTint": "#176b0a",
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/gloves.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/gloves.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/leather-gloves.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/leather-gloves.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/leather-gloves.png",
    "avatarSprite": "./assets/sprites/player-equipment/eldweave-gloves.png",
    "avatarSpriteTint": "#176b0a",
    "goldValue": 105
  },
  "Eldweave Pants": {
    "name": "Eldweave Pants",
    "rarity": "rare",
    "slot": "Legs",
    "stats": {
      "DEF": 1,
      "AGL": 1,
      "INT": 1,
      "RESIST": 1,
      "REGEN": 1
    },
    "lore": "",
    "graphic": "./assets/items/cloth-pants.png",
    "graphicSize": 30,
    "graphicTint": "#176b0a",
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/cloth-legs.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/cloth-legs.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/cloth-pants.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/pants.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/cloth-pants.png",
    "avatarSprite": "./assets/sprites/player-equipment/eldweave-pants.png",
    "avatarSpriteTint": "#176b0a",
    "goldValue": 115
  },
  "Eldweave Boots": {
    "name": "Eldweave Boots",
    "rarity": "rare",
    "slot": "Feet",
    "stats": {
      "DEF": 1,
      "AGL": 1,
      "INT": 1,
      "RESIST": 1,
      "REGEN": 1
    },
    "lore": "",
    "graphic": "./assets/items/leather-boots.png",
    "graphicSize": 30,
    "graphicTint": "#176b0a",
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/leather-feet.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/leather-feet.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/leather-boots.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/leather-boots.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/leather-boots.png",
    "avatarSprite": "./assets/sprites/player-equipment/eldweave-boots.png",
    "avatarSpriteTint": "#176b0a",
    "goldValue": 105
  },
  "Eldweave Shoulderpads": {
    "name": "Eldweave Shoulderpads",
    "rarity": "rare",
    "slot": "Shoulders",
    "stats": {
      "DEF": 1,
      "AGL": 1,
      "INT": 1,
      "RESIST": 1,
      "REGEN": 1
    },
    "lore": "",
    "graphic": "./assets/items/cloth-epaulettes.png",
    "graphicSize": 30,
    "graphicTint": "#176b0a",
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/cloth-shoulders.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/cloth-shoulders.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/cloth-shoulders.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/cloth-shoulders.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/cloth-shoulders.png",
    "avatarSprite": "./assets/sprites/player-equipment/eldweave-shoulderpads.png",
    "avatarSpriteTint": "#176b0a",
    "goldValue": 100
  },
  "Bronze Chainmail Vest": {
    "name": "Bronze Chainmail Vest",
    "rarity": "common",
    "slot": "Chest",
    "stats": {
      "DEF": 1.5,
      "AGL": -0.5,
      "BLOCK": 1
    },
    "lore": "",
    "graphic": "./assets/items/chainmail-shirt.png",
    "graphicSize": 30,
    "graphicTint": "#47290a",
    "graphicChannels": {
      "metal": "#c06e1b"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/chainmail-chest.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/chainmail-chest.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/chainmail-chest.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/chainmail-chest.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-chainmail-vest.png",
    "avatarSpriteTint": "#c06e1b",
    "goldValue": 95
  },
  "Bronze Plate Cuirass": {
    "name": "Bronze Plate Cuirass",
    "rarity": "common",
    "slot": "Chest",
    "stats": {
      "DEF": 2,
      "AGL": -1,
      "BLOCK": 1.5
    },
    "lore": "",
    "graphic": "./assets/items/platemail-breastplate.png",
    "graphicSize": 30,
    "graphicTint": "#c06e1b",
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/plate-chest.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/plate-chest.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-chest.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/plate-chest.png",
    "dwarfMaleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-chest.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-chainmail-vest.png",
    "avatarSpriteTint": "#c06e1b",
    "goldValue": 130
  },
  "Iron Plate Cuirass": {
    "name": "Iron Plate Cuirass",
    "rarity": "common",
    "slot": "Chest",
    "stats": {
      "DEF": 2.5,
      "AGL": -1.5,
      "BLOCK": 2
    },
    "lore": "",
    "graphic": "./assets/items/platemail-breastplate.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/plate-chest.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/plate-chest.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-chest.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/plate-chest.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-chainmail-vest.png",
    "goldValue": 175,
    "graphicTint": ""
  },
  "Bronze Spangenhelm": {
    "name": "Bronze Spangenhelm",
    "rarity": "common",
    "slot": "Head",
    "stats": {
      "DEF": 1.5,
      "AGL": -1,
      "BLOCK": 1.5
    },
    "lore": "",
    "graphic": "./assets/items/spangenhelm.png",
    "graphicSize": 30,
    "graphicTint": "#c06e1b",
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/plate-head.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/plate-head.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-helmet.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/plate-head.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-helmet.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-spangenhelm.png",
    "avatarSpriteTint": "#c06e1b",
    "goldValue": 105
  },
  "Iron Plate Spangenhelm": {
    "name": "Iron Plate Spangenhelm",
    "rarity": "common",
    "slot": "Head",
    "stats": {
      "DEF": 2,
      "AGL": -1.5,
      "BLOCK": 2
    },
    "lore": "",
    "graphic": "./assets/items/spangenhelm.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/plate-head.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/plate-head.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-helmet.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/plate-head.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-helmet.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-spangenhelm.png",
    "goldValue": 140,
    "graphicTint": ""
  },
  "Bronze Chainmail Coif": {
    "name": "Bronze Chainmail Coif",
    "rarity": "common",
    "slot": "Head",
    "stats": {
      "DEF": 1,
      "AGL": -0.5,
      "BLOCK": 1
    },
    "lore": "",
    "graphic": "./assets/items/chainmail-coif.png",
    "graphicSize": 30,
    "graphicTint": "#c06e1b",
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/chainmail-hood.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/chainmail-head.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/chainmail-coif.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/chainmail-head.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-spangenhelm.png",
    "avatarSpriteTint": "#c06e1b",
    "goldValue": 75
  },
  "Bronze Chainmail Pants": {
    "name": "Bronze Chainmail Pants",
    "rarity": "common",
    "slot": "Legs",
    "stats": {
      "DEF": 1.5,
      "AGL": -0.5,
      "BLOCK": 1
    },
    "lore": "",
    "graphic": "./assets/items/chainmail-chausses.png",
    "graphicSize": 30,
    "graphicTint": "#47290a",
    "graphicChannels": {
      "metal": "#c06e1b"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/chainmail-legs.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/chainmail-legs.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/chainmail-legs.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/chainmail-legst.png",
    "avatarSprite": "./assets/sprites/player-equipment/chainmail-pants.png",
    "avatarSpriteTint": "#5b3815",
    "avatarSpriteChannels": {
      "metal": "#c06e1b"
    },
    "goldValue": 95
  },
  "Bronze Plate Greaves": {
    "name": "Bronze Plate Greaves",
    "rarity": "common",
    "slot": "Legs",
    "stats": {
      "DEF": 2,
      "AGL": -1,
      "BLOCK": 1.5
    },
    "lore": "",
    "graphic": "./assets/items/platemail-greaves.png",
    "graphicSize": 30,
    "graphicTint": "#c06e1b",
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/plate-legs.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/plate-legs.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-legs.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/plate-legs.png",
    "dwarfMaleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-legs.png",
    "avatarSprite": "./assets/sprites/player-equipment/chainmail-pants.png",
    "avatarSpriteTint": "#c06e1b",
    "goldValue": 130
  },
  "Iron Plate Greaves": {
    "name": "Iron Plate Greaves",
    "rarity": "common",
    "slot": "Legs",
    "stats": {
      "DEF": 2.5,
      "AGL": -1.5,
      "BLOCK": 2
    },
    "lore": "",
    "graphic": "./assets/items/platemail-greaves.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/plate-legs.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/plate-legs.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-legs.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/plate-legs.png",
    "avatarSprite": "./assets/sprites/player-equipment/chainmail-pants.png",
    "goldValue": 175,
    "graphicTint": ""
  },
  "Bronze Chainmail Gloves": {
    "name": "Bronze Chainmail Gloves",
    "rarity": "common",
    "slot": "Hands",
    "stats": {
      "DEF": 1,
      "AGL": -0.5,
      "BLOCK": 1
    },
    "lore": "",
    "graphic": "./assets/items/chainmail-gloves.png",
    "graphicSize": 30,
    "graphicTint": "#47290a",
    "graphicChannels": {
      "metal": "#c06e1b"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/gloves.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/gloves.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/leather-gloves.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/plate-gloves.png",
    "avatarSprite": "./assets/sprites/player-equipment/chainmail-gloves.png",
    "avatarSpriteTint": "#c06e1b",
    "goldValue": 75
  },
  "Bronze Plate Gauntlets": {
    "name": "Bronze Plate Gauntlets",
    "rarity": "common",
    "slot": "Hands",
    "stats": {
      "DEF": 1.5,
      "AGL": -1,
      "BLOCK": 1.5
    },
    "lore": "",
    "graphic": "./assets/items/platemail-gloves.png",
    "graphicSize": 30,
    "graphicTint": "#c06e1b",
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/gloves.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/gloves.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-gloves.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/plate-gloves.png",
    "dwarfMaleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-gloves.png",
    "avatarSprite": "./assets/sprites/player-equipment/chainmail-gloves.png",
    "avatarSpriteTint": "#c06e1b",
    "goldValue": 105
  },
  "Iron Plate Gauntlets": {
    "name": "Iron Plate Gauntlets",
    "rarity": "common",
    "slot": "Hands",
    "stats": {
      "DEF": 2,
      "AGL": -1.5,
      "BLOCK": 2
    },
    "lore": "",
    "graphic": "./assets/items/platemail-gloves.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/gloves.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/gloves.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-gloves.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/plate-gloves.png",
    "avatarSprite": "./assets/sprites/player-equipment/chainmail-gloves.png",
    "goldValue": 140,
    "graphicTint": ""
  },
  "Iron Plate Pauldrons": {
    "name": "Iron Plate Pauldrons",
    "rarity": "common",
    "slot": "Shoulders",
    "stats": {
      "DEF": 2,
      "AGL": -1.5,
      "BLOCK": 2
    },
    "lore": "",
    "graphic": "./assets/items/platemail-pauldrons.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/iron-pauldrons.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/iron-pauldrons.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-shoulders.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/plate-shoulders.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-pauldrons.png",
    "goldValue": 140,
    "graphicTint": ""
  },
  "Bronze Chainmail Pauldrons": {
    "name": "Bronze Chainmail Pauldrons",
    "rarity": "common",
    "slot": "Shoulders",
    "stats": {
      "DEF": 1,
      "AGL": -0.5,
      "BLOCK": 1
    },
    "lore": "",
    "graphic": "./assets/items/chainmail-shoulders.png",
    "graphicSize": 30,
    "graphicTint": "#47290a",
    "graphicChannels": {
      "metal": "#c06e1b"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/chainmail-shoulders.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/chainmail-shoulders.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/chainmail-shoulders.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/chainmail-shoulders.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-pauldrons.png",
    "avatarSpriteTint": "#c06e1b",
    "goldValue": 75
  },
  "Iron Sabatons": {
    "name": "Iron Sabatons",
    "rarity": "common",
    "slot": "Feet",
    "stats": {
      "DEF": 2,
      "AGL": -1.5,
      "BLOCK": 2
    },
    "lore": "",
    "graphic": "./assets/items/platemail-boots.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/iron-boots.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/iron-boots.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-boots.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/plate-boots.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-boots.png",
    "goldValue": 30,
    "graphicTint": ""
  },
  "Bronze Chainmail Boots": {
    "name": "Bronze Chainmail Boots",
    "rarity": "common",
    "slot": "Feet",
    "stats": {
      "DEF": 1,
      "AGL": -0.5,
      "BLOCK": 1
    },
    "lore": "",
    "graphic": "./assets/items/chainmail-boots.png",
    "graphicSize": 30,
    "graphicTint": "#47290a",
    "graphicChannels": {
      "metal": "#c06e1b"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/leather-feet.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/leather-feet.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/chainmail-boots.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/chainmail-boots.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-boots.png",
    "avatarSpriteChannels": {
      "metal": "#c06e1b"
    },
    "goldValue": 75
  },
  "Bronze Plate Sabatons": {
    "name": "Bronze Plate Sabatons",
    "rarity": "common",
    "slot": "Feet",
    "stats": {
      "DEF": 1.5,
      "AGL": -1,
      "BLOCK": 1.5
    },
    "lore": "",
    "graphic": "./assets/items/platemail-boots.png",
    "graphicSize": 30,
    "graphicTint": "#c06e1b",
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/plate-feet.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/plate-feet.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-boots.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/plate-boots.png",
    "dwarfMaleRightWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-boots.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-boots.png",
    "avatarSpriteTint": "#c06e1b",
    "goldValue": 105
  },
  "Iron Plate Sabatons": {
    "name": "Iron Plate Sabatons",
    "rarity": "common",
    "slot": "Feet",
    "stats": {
      "DEF": 2,
      "AGL": -1.5,
      "BLOCK": 2
    },
    "lore": "",
    "graphic": "./assets/items/platemail-boots.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/plate-feet.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/plate-feet.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/plate-boots.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/plate-boots.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-boots.png",
    "goldValue": 140,
    "graphicTint": ""
  },
  "Bone Necklace": {
    "name": "Bone Necklace",
    "rarity": "uncommon",
    "slot": "Neck",
    "stats": {
      "AGL": 1
    },
    "lore": "",
    "graphic": "./assets/items/bone-necklace.png",
    "graphicSize": 30,
    "resistances": {
      "Umbral": 1
    },
    "goldValue": 75,
    "graphicTint": ""
  },
  "Emerald Ring": {
    "name": "Emerald Ring",
    "rarity": "uncommon",
    "slot": "Finger",
    "stats": {
      "SPD": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/ring-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#17ad00"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/emerald-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/emerald-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/emerald-ring.png",
    "avatarSpriteChannels": {
      "gem": "#17ad00"
    },
    "goldValue": 100,
    "graphicTint": ""
  },
  "Emerald Earring": {
    "name": "Emerald Earring",
    "rarity": "uncommon",
    "slot": "Ear",
    "stats": {
      "SPD": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/gem-earring.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#17ad00"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/emerald-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/emerald-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/emerald-ring.png",
    "avatarSpriteChannels": {
      "gem": "#17ad00"
    },
    "goldValue": 100,
    "graphicTint": ""
  },
  "Ruby Earring": {
    "name": "Ruby Earring",
    "rarity": "uncommon",
    "slot": "Ear",
    "stats": {
      "ATK": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/gem-earring.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#d60000"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/emerald-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/emerald-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/emerald-ring.png",
    "avatarSpriteChannels": {
      "gem": "#17ad00"
    },
    "goldValue": 100,
    "graphicTint": ""
  },
  "Sapphire Earring": {
    "name": "Sapphire Earring",
    "rarity": "uncommon",
    "slot": "Ear",
    "stats": {
      "INT": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/gem-earring.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#0400ff"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/emerald-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/emerald-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/emerald-ring.png",
    "avatarSpriteChannels": {
      "gem": "#17ad00"
    },
    "goldValue": 100,
    "graphicTint": ""
  },
  "Diamond Earring": {
    "name": "Diamond Earring",
    "rarity": "uncommon",
    "slot": "Ear",
    "stats": {
      "RESIST": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/gem-earring.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#ffffff"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/emerald-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/emerald-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/emerald-ring.png",
    "avatarSpriteChannels": {
      "gem": "#17ad00"
    },
    "goldValue": 100,
    "graphicTint": ""
  },
  "Opal Earring": {
    "name": "Opal Earring",
    "rarity": "uncommon",
    "slot": "Ear",
    "stats": {
      "REGEN": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/gem-earring.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#f88fff"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/emerald-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/emerald-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/emerald-ring.png",
    "avatarSpriteChannels": {
      "gem": "#17ad00"
    },
    "goldValue": 100,
    "graphicTint": ""
  },
  "Onyx Earring": {
    "name": "Onyx Earring",
    "rarity": "uncommon",
    "slot": "Ear",
    "stats": {
      "BLOCK": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/gem-earring.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#000000"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/emerald-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/emerald-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/emerald-ring.png",
    "avatarSpriteChannels": {
      "gem": "#17ad00"
    },
    "goldValue": 100,
    "graphicTint": ""
  },
  "Aquamarine Earring": {
    "name": "Aquamarine Earring",
    "rarity": "uncommon",
    "slot": "Ear",
    "stats": {
      "FOCUS": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/gem-earring.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#00ffbf"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/emerald-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/emerald-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/emerald-ring.png",
    "avatarSpriteChannels": {
      "gem": "#17ad00"
    },
    "goldValue": 100,
    "graphicTint": ""
  },
  "Amethyst Earring": {
    "name": "Amethyst Earring",
    "rarity": "uncommon",
    "slot": "Ear",
    "stats": {
      "AGL": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/gem-earring.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#8000ff"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/emerald-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/emerald-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/emerald-ring.png",
    "avatarSpriteChannels": {
      "gem": "#17ad00"
    },
    "goldValue": 100,
    "graphicTint": ""
  },
  "Silver Ring": {
    "name": "Silver Ring",
    "rarity": "common",
    "slot": "Finger",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/silver-ring-without-gemstone.png",
    "graphicSize": 30,
    "graphicTint": "#787878",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/emerald-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/emerald-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/emerald-ring.png",
    "avatarSpriteChannels": {
      "gem": "#17ad00"
    },
    "goldValue": 30
  },
  "Silver Earring": {
    "name": "Silver Earring",
    "rarity": "common",
    "slot": "Finger",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/silver-earring-without-gemstone.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/emerald-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/emerald-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/emerald-ring.png",
    "avatarSpriteChannels": {
      "gem": "#17ad00"
    },
    "goldValue": 30,
    "graphicTint": ""
  },
  "Gold Earring": {
    "name": "Gold Earring",
    "rarity": "common",
    "slot": "Finger",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/silver-earring-without-gemstone.png",
    "graphicSize": 30,
    "graphicTint": "#e3b51c",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/emerald-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/emerald-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/emerald-ring.png",
    "avatarSpriteChannels": {
      "gem": "#17ad00"
    },
    "goldValue": 60
  },
  "Gold Ring": {
    "name": "Gold Ring",
    "rarity": "uncommon",
    "slot": "Finger",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/silver-ring-without-gemstone.png",
    "graphicSize": 30,
    "graphicTint": "#e3b51c",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/emerald-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/emerald-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/emerald-ring.png",
    "avatarSpriteChannels": {
      "gem": "#17ad00"
    },
    "goldValue": 60
  },
  "Platinum Ring": {
    "name": "Platinum Ring",
    "rarity": "uncommon",
    "slot": "Finger",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/silver-ring-without-gemstone.png",
    "graphicSize": 30,
    "graphicTint": "#e0e0e0",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/emerald-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/emerald-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/emerald-ring.png",
    "avatarSpriteChannels": {
      "gem": "#17ad00"
    },
    "goldValue": 80
  },
  "Ruby Ring": {
    "name": "Ruby Ring",
    "rarity": "uncommon",
    "slot": "Finger",
    "stats": {
      "ATK": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/ring-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#d60000"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/ruby-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/ruby-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/ruby-ring.png",
    "avatarSpriteChannels": {
      "gem": "#d60000"
    },
    "goldValue": 100,
    "graphicTint": ""
  },
  "Diamond Ring": {
    "name": "Diamond Ring",
    "rarity": "uncommon",
    "slot": "Finger",
    "stats": {
      "RESIST": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/ring-with-one-gem.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#ffffff"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/ruby-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/ruby-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/ruby-ring.png",
    "avatarSpriteChannels": {
      "gem": "#d60000"
    },
    "goldValue": 100,
    "graphicTint": ""
  },
  "Fenguard Ring": {
    "name": "Fenguard Ring",
    "rarity": "rare",
    "slot": "Finger",
    "stats": {
      "ATK": 1,
      "INT": 1,
      "FOCUS": 1
    },
    "lore": "\"They say a man who wears the red-skulled ring can get away with murder, and likely already has many times over.\"",
    "graphic": "./assets/items/ring-with-skull.png",
    "graphicSize": 30,
    "graphicTint": "#8e1f1f",
    "graphicChannels": {
      "metal": "#707070"
    },
    "resistances": {
      "Infernal": 1,
      "Umbral": 1
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/ruby-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/ruby-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/ruby-ring.png",
    "avatarSpriteTint": "#8e1f1f",
    "avatarSpriteChannels": {
      "metal": "#707070",
      "gem": "#d60000"
    },
    "goldValue": 100
  },
  "Onyx Ring": {
    "name": "Onyx Ring",
    "rarity": "uncommon",
    "slot": "Finger",
    "stats": {
      "BLOCK": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/ring-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#000000"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/onyx-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/onyx-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/onyx-ring.png",
    "avatarSpriteChannels": {
      "gem": "#000000"
    },
    "goldValue": 100,
    "graphicTint": ""
  },
  "Onyx Bracelet": {
    "name": "Onyx Bracelet",
    "rarity": "uncommon",
    "slot": "Wrist",
    "stats": {
      "BLOCK": 1
    },
    "lore": "",
    "graphic": "./assets/items/bracelet-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#000000"
    },
    "avatarSpriteChannels": {
      "gem": "#000000"
    },
    "goldValue": 120,
    "graphicTint": ""
  },
  "Diamond Bracelet": {
    "name": "Diamond Bracelet",
    "rarity": "uncommon",
    "slot": "Wrist",
    "stats": {
      "RESIST": 1
    },
    "lore": "",
    "graphic": "./assets/items/bracelet-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#ffffff"
    },
    "avatarSpriteChannels": {
      "gem": "#000000"
    },
    "goldValue": 120,
    "graphicTint": ""
  },
  "Ruby Bracelet": {
    "name": "Ruby Bracelet",
    "rarity": "uncommon",
    "slot": "Wrist",
    "stats": {
      "ATK": 1
    },
    "lore": "",
    "graphic": "./assets/items/bracelet-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#d60000"
    },
    "avatarSpriteChannels": {
      "gem": "#000000"
    },
    "goldValue": 120,
    "graphicTint": ""
  },
  "Emerald Bracelet": {
    "name": "Emerald Bracelet",
    "rarity": "uncommon",
    "slot": "Wrist",
    "stats": {
      "SPD": 1
    },
    "lore": "",
    "graphic": "./assets/items/bracelet-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#17ad00"
    },
    "avatarSpriteChannels": {
      "gem": "#000000"
    },
    "goldValue": 120,
    "graphicTint": ""
  },
  "Opal Bracelet": {
    "name": "Opal Bracelet",
    "rarity": "uncommon",
    "slot": "Wrist",
    "stats": {
      "REGEN": 1
    },
    "lore": "",
    "graphic": "./assets/items/bracelet-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#ff7afb"
    },
    "avatarSpriteChannels": {
      "gem": "#000000"
    },
    "goldValue": 35,
    "graphicTint": ""
  },
  "Aquamarine Bracelet": {
    "name": "Aquamarine Bracelet",
    "rarity": "uncommon",
    "slot": "Wrist",
    "stats": {
      "FOCUS": 1
    },
    "lore": "",
    "graphic": "./assets/items/bracelet-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#00ffbf"
    },
    "avatarSpriteChannels": {
      "gem": "#000000"
    },
    "goldValue": 120,
    "graphicTint": ""
  },
  "Amethyst Bracelet": {
    "name": "Amethyst Bracelet",
    "rarity": "uncommon",
    "slot": "Wrist",
    "stats": {
      "AGL": 1
    },
    "lore": "",
    "graphic": "./assets/items/bracelet-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#8000ff"
    },
    "avatarSpriteChannels": {
      "gem": "#000000"
    },
    "goldValue": 120,
    "graphicTint": ""
  },
  "Sapphire Bracelet": {
    "name": "Sapphire Bracelet",
    "rarity": "uncommon",
    "slot": "Wrist",
    "stats": {
      "INT": 1
    },
    "lore": "",
    "graphic": "./assets/items/bracelet-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#0400ff"
    },
    "avatarSpriteChannels": {
      "gem": "#000000"
    },
    "goldValue": 120,
    "graphicTint": ""
  },
  "Silver Bracelet": {
    "name": "Silver Bracelet",
    "rarity": "common",
    "slot": "Wrist",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/silver-bracelet-without-gemstone.png",
    "graphicSize": 30,
    "avatarSpriteChannels": {
      "gem": "#000000"
    },
    "goldValue": 50,
    "graphicTint": ""
  },
  "Gold Bracelet": {
    "name": "Gold Bracelet",
    "rarity": "common",
    "slot": "Wrist",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/silver-bracelet-without-gemstone.png",
    "graphicSize": 30,
    "graphicTint": "#e3b51c",
    "avatarSpriteChannels": {
      "gem": "#000000"
    },
    "goldValue": 100
  },
  "Opal Ring": {
    "name": "Opal Ring",
    "rarity": "uncommon",
    "slot": "Finger",
    "stats": {
      "REGEN": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/ring-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#f88fff"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/opal-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/opal-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/opal-ring.png",
    "avatarSpriteChannels": {
      "gem": "#f88fff"
    },
    "goldValue": 100,
    "graphicTint": ""
  },
  "Amethyst Ring": {
    "name": "Amethyst Ring",
    "rarity": "uncommon",
    "slot": "Finger",
    "stats": {
      "AGL": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/ring-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#8000ff"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/opal-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/opal-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/opal-ring.png",
    "avatarSpriteChannels": {
      "gem": "#f88fff"
    },
    "goldValue": 100,
    "graphicTint": ""
  },
  "Theodora's Opal Earring": {
    "name": "Theodora's Opal Earring",
    "rarity": "uncommon",
    "slot": "Ear",
    "stats": {
      "REGEN": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/gem-earring.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#f88fff"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/opal-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/opal-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/opal-ring.png",
    "avatarSpriteChannels": {
      "gem": "#f88fff"
    },
    "goldValue": 65,
    "graphicTint": ""
  },
  "Sapphire Ring": {
    "name": "Sapphire Ring",
    "rarity": "uncommon",
    "slot": "Finger",
    "stats": {
      "INT": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/ring-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#0400ff"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/sapphire-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/sapphire-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/sapphire-ring.png",
    "goldValue": 100,
    "graphicTint": ""
  },
  "Aquamarine Ring": {
    "name": "Aquamarine Ring",
    "rarity": "uncommon",
    "slot": "Finger",
    "stats": {
      "FOCUS": 0.5
    },
    "lore": "",
    "graphic": "./assets/items/ring-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#00ffbf"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/sapphire-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/sapphire-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/sapphire-ring.png",
    "goldValue": 100,
    "graphicTint": ""
  },
  "Emerald Necklace": {
    "name": "Emerald Necklace",
    "rarity": "uncommon",
    "slot": "Neck",
    "stats": {
      "SPD": 1
    },
    "lore": "",
    "graphic": "./assets/items/necklace-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#18b300"
    },
    "goldValue": 120,
    "graphicTint": ""
  },
  "Amethyst Necklace": {
    "name": "Amethyst Necklace",
    "rarity": "uncommon",
    "slot": "Neck",
    "stats": {
      "AGL": 1
    },
    "lore": "",
    "graphic": "./assets/items/necklace-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#a600ff"
    },
    "goldValue": 120,
    "graphicTint": ""
  },
  "Ruby Necklace": {
    "name": "Ruby Necklace",
    "rarity": "uncommon",
    "slot": "Neck",
    "stats": {
      "ATK": 1
    },
    "lore": "",
    "graphic": "./assets/items/necklace-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#9e0000"
    },
    "goldValue": 120,
    "graphicTint": ""
  },
  "Onyx Necklace": {
    "name": "Onyx Necklace",
    "rarity": "uncommon",
    "slot": "Neck",
    "stats": {
      "BLOCK": 1
    },
    "lore": "",
    "graphic": "./assets/items/necklace-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#000000"
    },
    "avatarSpriteChannels": {
      "gem": "#000000"
    },
    "goldValue": 120,
    "graphicTint": ""
  },
  "Bubonic Necklace": {
    "name": "Bubonic Necklace",
    "rarity": "rare",
    "slot": "Neck",
    "stats": {
      "INT": 1,
      "FOCUS": 2,
      "BLOCK": 2
    },
    "lore": "",
    "graphic": "./assets/items/skull-pendant.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#000000"
    },
    "resistances": {
      "Infernal": 2,
      "Umbral": 2
    },
    "avatarSpriteChannels": {
      "gem": "#000000"
    },
    "goldValue": 180,
    "graphicTint": ""
  },
  "Opal Necklace": {
    "name": "Opal Necklace",
    "rarity": "uncommon",
    "slot": "Neck",
    "stats": {
      "REGEN": 1
    },
    "lore": "",
    "graphic": "./assets/items/necklace-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#f88fff"
    },
    "goldValue": 120,
    "graphicTint": ""
  },
  "Sapphire Necklace": {
    "name": "Sapphire Necklace",
    "rarity": "uncommon",
    "slot": "Neck",
    "stats": {
      "INT": 1
    },
    "lore": "",
    "graphic": "./assets/items/necklace-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#0011ff"
    },
    "goldValue": 120,
    "graphicTint": ""
  },
  "Aquamarine Necklace": {
    "name": "Aquamarine Necklace",
    "rarity": "uncommon",
    "slot": "Neck",
    "stats": {
      "FOCUS": 1
    },
    "lore": "",
    "graphic": "./assets/items/necklace-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#00fffb"
    },
    "goldValue": 120,
    "graphicTint": ""
  },
  "Diamond Necklace": {
    "name": "Diamond Necklace",
    "rarity": "uncommon",
    "slot": "Neck",
    "stats": {
      "RESIST": 1
    },
    "lore": "",
    "graphic": "./assets/items/necklace-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#b8b8b8"
    },
    "goldValue": 120,
    "graphicTint": ""
  },
  "Silver Necklace": {
    "name": "Silver Necklace",
    "rarity": "common",
    "slot": "Neck",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/silver-necklace-without-gemstone.png",
    "graphicSize": 30,
    "goldValue": 40,
    "graphicTint": ""
  },
  "Gold Necklace": {
    "name": "Gold Necklace",
    "rarity": "common",
    "slot": "Neck",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/silver-necklace-without-gemstone.png",
    "graphicSize": 30,
    "graphicTint": "#e3b51c",
    "goldValue": 80
  },
  "Magic Mushroom": {
    "name": "Magic Mushroom",
    "rarity": "uncommon",
    "slot": "Off-Hand",
    "stats": {
      "REGEN": 1
    },
    "lore": "",
    "graphic": "./assets/items/red-mushroom.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/items/red-mushroom.png",
    "femaleAvatarSprite": "./assets/items/red-mushroom.png",
    "avatarSprite": "./assets/sprites/player-equipment/magic-mushroom.png",
    "goldValue": 45,
    "graphicTint": ""
  },
  "Bloody Emblem": {
    "name": "Bloody Emblem",
    "rarity": "uncommon",
    "slot": "Off-Hand",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/medallion-with-glowing-rune.png",
    "graphicSize": 30,
    "graphicChannels": {
      "metal": "#3e0404",
      "gem": "#9d0101"
    },
    "resistances": {
      "Celestial": 5,
      "Infernal": 5
    },
    "maleAvatarSprite": "./assets/items/medallion-with-glowing-rune.png",
    "femaleAvatarSprite": "./assets/items/medallion-with-glowing-rune.png",
    "avatarSprite": "./assets/sprites/player-equipment/bloody-emblem.png",
    "avatarSpriteChannels": {
      "metal": "#3e0404",
      "gem": "#9d0101"
    },
    "goldValue": 75,
    "graphicTint": ""
  },
  "Wooden Shield": {
    "name": "Wooden Shield",
    "rarity": "common",
    "slot": "Off-Hand",
    "stats": {
      "BLOCK": 5
    },
    "lore": "",
    "graphic": "./assets/items/wooden-shield.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/wooden-shield.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/wooden-shield.png",
    "avatarSprite": "./assets/sprites/player-equipment/wooden-shield.png",
    "goldValue": 70,
    "shield": true,
    "graphicTint": ""
  },
  "Dorin's Shield": {
    "name": "Dorin's Shield",
    "rarity": "common",
    "slot": "Off-Hand",
    "stats": {
      "BLOCK": 5
    },
    "lore": "\"If the venerable Guard Dorin's shield is here... where's Guard Dorin?\"",
    "graphic": "./assets/items/wooden-shield.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/wooden-shield.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/wooden-shield.png",
    "avatarSprite": "./assets/sprites/player-equipment/wooden-shield.png",
    "goldValue": 70,
    "shield": true,
    "graphicTint": ""
  },
  "Iron Shield": {
    "name": "Iron Shield",
    "rarity": "common",
    "slot": "Off-Hand",
    "stats": {
      "SPD": -1.5,
      "AGL": -1.5,
      "BLOCK": 15
    },
    "lore": "",
    "graphic": "./assets/items/iron-shield.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/iron-shield.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/iron-shield.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-shield.png",
    "goldValue": 165,
    "shield": true,
    "graphicTint": ""
  },
  "Bronze Shield": {
    "name": "Bronze Shield",
    "rarity": "common",
    "slot": "Off-Hand",
    "stats": {
      "SPD": -1,
      "AGL": -1,
      "BLOCK": 10
    },
    "lore": "",
    "graphic": "./assets/items/iron-shield.png",
    "graphicSize": 30,
    "graphicTint": "#c06e1b",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/iron-shield.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/iron-shield.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-shield.png",
    "goldValue": 115,
    "shield": true
  },
  "Kneecap of the Whisperer": {
    "name": "Kneecap of the Whisperer",
    "rarity": "rare",
    "slot": "Off-Hand",
    "stats": {
      "ATK": 1,
      "DEF": 1,
      "SPD": -0.5,
      "AGL": 1,
      "INT": 1,
      "FOCUS": 1,
      "BLOCK": 12,
      "REGEN": 1
    },
    "lore": "\"Legend states that the low, rumbling whispers coming from Whisperspring what brings forth the waters from the Ethereal Realm\"",
    "graphic": "./assets/items/cogars-kneecap.png",
    "graphicSize": 30,
    "resistances": {
      "Infernal": 5
    },
    "maleAvatarSprite": "./assets/items/cogars-kneecap.png",
    "femaleAvatarSprite": "./assets/items/cogars-kneecap.png",
    "avatarSprite": "./assets/sprites/player-equipment/iron-shield.png",
    "goldValue": 300,
    "shield": true,
    "graphicTint": ""
  },
  "Rat-Skin Shawl": {
    "name": "Rat-Skin Shawl",
    "rarity": "common",
    "slot": "Cape",
    "stats": {
      "SPD": 1,
      "BLOCK": 1
    },
    "lore": "",
    "graphic": "./assets/items/capelet.png",
    "graphicSize": 30,
    "graphicTint": "#3b1c07",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-skin-shawl.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-skin-shawl.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-skin-shawl.png",
    "avatarSpriteTint": "#3b1c07",
    "goldValue": 30
  },
  "Nurdine's Cape": {
    "name": "Nurdine's Cape",
    "rarity": "rare",
    "slot": "Cape",
    "stats": {
      "SPD": 2,
      "AGL": 2,
      "INT": 2,
      "FOCUS": 2,
      "BLOCK": 2,
      "RESIST": 1
    },
    "lore": "",
    "graphic": "./assets/items/cape-dark.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-skin-shawl.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-skin-shawl.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-skin-shawl.png",
    "avatarSpriteTint": "#3b0707",
    "goldValue": 30,
    "graphicTint": ""
  },
  "Tabard of Whisperspring": {
    "name": "Tabard of Whisperspring",
    "rarity": "rare",
    "slot": "Cape",
    "stats": {
      "SPD": 1,
      "AGL": 5,
      "INT": 4,
      "FOCUS": 3,
      "BLOCK": 5,
      "REGEN": 4
    },
    "lore": "",
    "graphic": "./assets/items/tabard.png",
    "graphicSize": 30,
    "graphicTint": "#469f2d",
    "resistances": {
      "Sylvan": 5
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/tabard-of-whisperspring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/tabard-of-whisperspring.png",
    "avatarSprite": "./assets/sprites/player-equipment/tabard-of-whisperspring.png",
    "avatarSpriteTint": "#469f2d",
    "goldValue": 410
  },
  "Linen Shirt": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Linen Shirt",
    "rarity": "poor",
    "slot": "Chest",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/cloth-shirt.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/shirt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/shirt.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/shirt.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/shirt.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 10,
    "graphicTint": ""
  },
  "Red Linen Shirt": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Red Linen Shirt",
    "rarity": "common",
    "slot": "Chest",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/cloth-shirt.png",
    "graphicSize": 30,
    "graphicTint": "#b80000",
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/shirt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/shirt.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/shirt.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/shirt.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "avatarSpriteTint": "#b80000",
    "goldValue": 15
  },
  "White Linen Shirt": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "White Linen Shirt",
    "rarity": "common",
    "slot": "Chest",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/cloth-shirt.png",
    "graphicSize": 30,
    "graphicTint": "#e8e8e8",
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/shirt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/shirt.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/shirt.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/shirt.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "avatarSpriteTint": "#e8e8e8",
    "goldValue": 15
  },
  "Black Linen Shirt": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Black Linen Shirt",
    "rarity": "common",
    "slot": "Chest",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/cloth-shirt.png",
    "graphicSize": 30,
    "graphicTint": "#000000",
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/shirt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/shirt.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/shirt.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/shirt.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "avatarSpriteTint": "#000000",
    "goldValue": 15
  },
  "Denim Shirt": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Denim Shirt",
    "rarity": "common",
    "slot": "Chest",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/cloth-shirt.png",
    "graphicSize": 30,
    "graphicTint": "#4d6680",
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/shirt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/shirt.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/shirt.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/shirt.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "avatarSpriteTint": "#4d6680",
    "goldValue": 15
  },
  "Linen Pants": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Linen Pants",
    "rarity": "poor",
    "slot": "Legs",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/cloth-pants.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/pants.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/pants.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/pants.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/pants.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 10,
    "graphicTint": ""
  },
  "Denim Pants": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Denim Pants",
    "rarity": "common",
    "slot": "Legs",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/cloth-pants.png",
    "graphicSize": 30,
    "graphicTint": "#4d6680",
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/pants.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/pants.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/pants.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/pants.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "avatarSpriteTint": "#4d6680",
    "goldValue": 15
  },
  "White Linen Pants": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "White Linen Pants",
    "rarity": "common",
    "slot": "Legs",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/cloth-pants.png",
    "graphicSize": 30,
    "graphicTint": "#e8e8e8",
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/pants.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/pants.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/pants.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/pants.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "avatarSpriteTint": "#e8e8e8",
    "goldValue": 15
  },
  "Black Linen Pants": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Black Linen Pants",
    "rarity": "common",
    "slot": "Legs",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/cloth-pants.png",
    "graphicSize": 30,
    "graphicTint": "#000000",
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/pants.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/pants.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/pants.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/pants.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "avatarSpriteTint": "#000000",
    "goldValue": 15
  },
  "Goblin Head": {
    "name": "Goblin Head",
    "rarity": "poor",
    "slot": "Off-Hand",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/severed-goblin-head.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/items/severed-goblin-head.png",
    "femaleAvatarSprite": "./assets/items/severed-goblin-head.png",
    "avatarSprite": "./assets/sprites/player-equipment/goblin-fang.png",
    "goldValue": 10,
    "graphicTint": ""
  },
  "Bisonar Head": {
    "name": "Bisonar Head",
    "rarity": "common",
    "slot": "Off-Hand",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/bisonar-head.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/items/severed-goblin-head.png",
    "femaleAvatarSprite": "./assets/items/severed-goblin-head.png",
    "avatarSprite": "./assets/sprites/player-equipment/goblin-fang.png",
    "goldValue": 35,
    "graphicTint": ""
  },
  "Alchemist's Belt": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Alchemist's Belt",
    "rarity": "rare",
    "slot": "Waist",
    "stats": {
      "HP": 5,
      "ATK": 1,
      "DEF": 1,
      "INT": 1,
      "RESIST": 1,
      "REGEN": 2
    },
    "lore": "",
    "graphic": "./assets/items/potion-belt.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/belt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/belt.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/leather-belt.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/leather-belt.png",
    "dwarfMaleLeftWristAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/leather-belt.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "graphicTint": ""
  },
  "Straw Hat": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Straw Hat",
    "rarity": "common",
    "slot": "Head",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/straw-hat.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/straw-hat.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/straw-hat.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/straw-hat.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/straw-hat.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 15,
    "graphicTint": ""
  },
  "Strange Water Dish": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Strange Water Dish",
    "rarity": "uncommon",
    "slot": "Head",
    "stats": {
      "RESIST": 0.5,
      "REGEN": 1
    },
    "lore": "\"The water in this dish seemed to be the source of power for the creature it once belonged to\"",
    "graphic": "./assets/items/water-dish.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/water-dish.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/water-dish.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/water-dish.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/water-dish.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 20,
    "graphicTint": ""
  },
  "Crown of the Glade Mother": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Crown of the Glade Mother",
    "rarity": "rare",
    "slot": "Head",
    "stats": {
      "HP": 5,
      "ATK": 1,
      "DEF": 1.5,
      "SPD": 1,
      "AGL": 1,
      "INT": 2,
      "FOCUS": 1,
      "RESIST": 1,
      "REGEN": 2
    },
    "lore": "\"In the faerie tales, she is called Leshachikha. Nobody knows what she calls herself.\"",
    "graphic": "./assets/items/dryad-antler.png",
    "graphicSize": 30,
    "resistances": {
      "Ethereal": 1,
      "Sylvan": 2
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/templates/male/druid-head.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/templates/female/crown-of-the-glade-mother.png",
    "dwarfMaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-male/druid-head.png",
    "dwarfFemaleAvatarSprite": "./assets/sprites/player-equipment/templates/dwarf-female/druid-head.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 200,
    "graphicTint": ""
  },
  "Gold Emerald Ring": {
    "name": "Gold Emerald Ring",
    "rarity": "uncommon",
    "slot": "Finger",
    "stats": {
      "SPD": 1
    },
    "lore": "",
    "graphic": "./assets/items/ring-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#17ad00",
      "metal": "#e3b51c"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/emerald-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/emerald-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/emerald-ring.png",
    "avatarSpriteChannels": {
      "gem": "#17ad00",
      "metal": "#e3b51c"
    },
    "goldValue": 200,
    "graphicTint": ""
  },
  "Gold Emerald Earring": {
    "name": "Gold Emerald Earring",
    "rarity": "uncommon",
    "slot": "Ear",
    "stats": {
      "SPD": 1
    },
    "lore": "",
    "graphic": "./assets/items/gem-earring.png",
    "graphicSize": 30,
    "graphicChannels": {
      "metal": "#e3b51c",
      "gem": "#17ad00"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/emerald-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/emerald-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/emerald-ring.png",
    "avatarSpriteChannels": {
      "metal": "#e3b51c",
      "gem": "#17ad00"
    },
    "goldValue": 200,
    "graphicTint": ""
  },
  "Gold Emerald Necklace": {
    "name": "Gold Emerald Necklace",
    "rarity": "uncommon",
    "slot": "Neck",
    "stats": {
      "SPD": 2
    },
    "lore": "",
    "graphic": "./assets/items/necklace-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#18b300",
      "metal": "#e3b51c"
    },
    "goldValue": 240,
    "graphicTint": "",
    "avatarSpriteChannels": {
      "gem": "#18b300",
      "metal": "#e3b51c"
    }
  },
  "Gold Emerald Bracelet": {
    "name": "Gold Emerald Bracelet",
    "rarity": "uncommon",
    "slot": "Wrist",
    "stats": {
      "SPD": 2
    },
    "lore": "",
    "graphic": "./assets/items/bracelet-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#17ad00",
      "metal": "#e3b51c"
    },
    "avatarSpriteChannels": {
      "gem": "#000000",
      "metal": "#e3b51c"
    },
    "goldValue": 240,
    "graphicTint": ""
  },
  "Gold Ruby Ring": {
    "name": "Gold Ruby Ring",
    "rarity": "uncommon",
    "slot": "Finger",
    "stats": {
      "ATK": 1
    },
    "lore": "",
    "graphic": "./assets/items/ring-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#d60000",
      "metal": "#e3b51c"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/ruby-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/ruby-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/ruby-ring.png",
    "avatarSpriteChannels": {
      "gem": "#d60000",
      "metal": "#e3b51c"
    },
    "goldValue": 200,
    "graphicTint": ""
  },
  "Gold Ruby Earring": {
    "name": "Gold Ruby Earring",
    "rarity": "uncommon",
    "slot": "Ear",
    "stats": {
      "ATK": 1
    },
    "lore": "",
    "graphic": "./assets/items/gem-earring.png",
    "graphicSize": 30,
    "graphicChannels": {
      "metal": "#e3b51c",
      "gem": "#d60000"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/emerald-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/emerald-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/emerald-ring.png",
    "avatarSpriteChannels": {
      "metal": "#e3b51c",
      "gem": "#17ad00"
    },
    "goldValue": 200,
    "graphicTint": ""
  },
  "Gold Ruby Necklace": {
    "name": "Gold Ruby Necklace",
    "rarity": "uncommon",
    "slot": "Neck",
    "stats": {
      "ATK": 2
    },
    "lore": "",
    "graphic": "./assets/items/necklace-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "metal": "#e3b51c",
      "gem": "#9e0000"
    },
    "avatarSpriteChannels": {
      "metal": "#e3b51c",
      "gem": "#9e0000"
    },
    "goldValue": 240,
    "graphicTint": ""
  },
  "Gold Ruby Bracelet": {
    "name": "Gold Ruby Bracelet",
    "rarity": "uncommon",
    "slot": "Wrist",
    "stats": {
      "ATK": 2
    },
    "lore": "",
    "graphic": "./assets/items/bracelet-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#d60000",
      "metal": "#e3b51c"
    },
    "avatarSpriteChannels": {
      "gem": "#000000",
      "metal": "#e3b51c"
    },
    "goldValue": 240,
    "graphicTint": ""
  },
  "Gold Sapphire Ring": {
    "name": "Gold Sapphire Ring",
    "rarity": "uncommon",
    "slot": "Finger",
    "stats": {
      "INT": 1
    },
    "lore": "",
    "graphic": "./assets/items/ring-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#0400ff",
      "metal": "#e3b51c"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/sapphire-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/sapphire-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/sapphire-ring.png",
    "goldValue": 200,
    "graphicTint": "",
    "avatarSpriteChannels": {
      "gem": "#0400ff",
      "metal": "#e3b51c"
    }
  },
  "Gold Sapphire Earring": {
    "name": "Gold Sapphire Earring",
    "rarity": "uncommon",
    "slot": "Ear",
    "stats": {
      "INT": 1
    },
    "lore": "",
    "graphic": "./assets/items/gem-earring.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#0400ff",
      "metal": "#e3b51c"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/emerald-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/emerald-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/emerald-ring.png",
    "avatarSpriteChannels": {
      "gem": "#17ad00",
      "metal": "#e3b51c"
    },
    "goldValue": 200,
    "graphicTint": ""
  },
  "Gold Sapphire Necklace": {
    "name": "Gold Sapphire Necklace",
    "rarity": "uncommon",
    "slot": "Neck",
    "stats": {
      "INT": 2
    },
    "lore": "",
    "graphic": "./assets/items/necklace-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#0011ff",
      "metal": "#e3b51c"
    },
    "goldValue": 240,
    "graphicTint": "",
    "avatarSpriteChannels": {
      "gem": "#0011ff",
      "metal": "#e3b51c"
    }
  },
  "Gold Sapphire Bracelet": {
    "name": "Gold Sapphire Bracelet",
    "rarity": "uncommon",
    "slot": "Wrist",
    "stats": {
      "INT": 2
    },
    "lore": "",
    "graphic": "./assets/items/bracelet-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#0400ff",
      "metal": "#e3b51c"
    },
    "avatarSpriteChannels": {
      "gem": "#000000",
      "metal": "#e3b51c"
    },
    "goldValue": 240,
    "graphicTint": ""
  },
  "Gold Diamond Ring": {
    "name": "Gold Diamond Ring",
    "rarity": "uncommon",
    "slot": "Finger",
    "stats": {
      "RESIST": 1
    },
    "lore": "",
    "graphic": "./assets/items/ring-with-one-gem.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#ffffff",
      "metal": "#e3b51c"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/ruby-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/ruby-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/ruby-ring.png",
    "avatarSpriteChannels": {
      "gem": "#d60000",
      "metal": "#e3b51c"
    },
    "goldValue": 200,
    "graphicTint": ""
  },
  "Gold Diamond Earring": {
    "name": "Gold Diamond Earring",
    "rarity": "uncommon",
    "slot": "Ear",
    "stats": {
      "RESIST": 1
    },
    "lore": "",
    "graphic": "./assets/items/gem-earring.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#ffffff",
      "metal": "#e3b51c"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/emerald-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/emerald-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/emerald-ring.png",
    "avatarSpriteChannels": {
      "gem": "#17ad00",
      "metal": "#e3b51c"
    },
    "goldValue": 200,
    "graphicTint": ""
  },
  "Gold Diamond Necklace": {
    "name": "Gold Diamond Necklace",
    "rarity": "uncommon",
    "slot": "Neck",
    "stats": {
      "RESIST": 2
    },
    "lore": "",
    "graphic": "./assets/items/necklace-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#b8b8b8",
      "metal": "#e3b51c"
    },
    "goldValue": 240,
    "graphicTint": "",
    "avatarSpriteChannels": {
      "gem": "#b8b8b8",
      "metal": "#e3b51c"
    }
  },
  "Gold Diamond Bracelet": {
    "name": "Gold Diamond Bracelet",
    "rarity": "uncommon",
    "slot": "Wrist",
    "stats": {
      "RESIST": 2
    },
    "lore": "",
    "graphic": "./assets/items/bracelet-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#ffffff",
      "metal": "#e3b51c"
    },
    "avatarSpriteChannels": {
      "gem": "#000000",
      "metal": "#e3b51c"
    },
    "goldValue": 240,
    "graphicTint": ""
  },
  "Gold Opal Ring": {
    "name": "Gold Opal Ring",
    "rarity": "uncommon",
    "slot": "Finger",
    "stats": {
      "REGEN": 1
    },
    "lore": "",
    "graphic": "./assets/items/ring-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#f88fff",
      "metal": "#e3b51c"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/opal-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/opal-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/opal-ring.png",
    "avatarSpriteChannels": {
      "gem": "#f88fff",
      "metal": "#e3b51c"
    },
    "goldValue": 200,
    "graphicTint": ""
  },
  "Gold Opal Earring": {
    "name": "Gold Opal Earring",
    "rarity": "uncommon",
    "slot": "Ear",
    "stats": {
      "REGEN": 1
    },
    "lore": "",
    "graphic": "./assets/items/gem-earring.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#f88fff",
      "metal": "#e3b51c"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/emerald-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/emerald-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/emerald-ring.png",
    "avatarSpriteChannels": {
      "gem": "#17ad00",
      "metal": "#e3b51c"
    },
    "goldValue": 200,
    "graphicTint": ""
  },
  "Gold Opal Necklace": {
    "name": "Gold Opal Necklace",
    "rarity": "uncommon",
    "slot": "Neck",
    "stats": {
      "REGEN": 2
    },
    "lore": "",
    "graphic": "./assets/items/necklace-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#f88fff",
      "metal": "#e3b51c"
    },
    "goldValue": 240,
    "graphicTint": "",
    "avatarSpriteChannels": {
      "gem": "#f88fff",
      "metal": "#e3b51c"
    }
  },
  "Gold Opal Bracelet": {
    "name": "Gold Opal Bracelet",
    "rarity": "uncommon",
    "slot": "Wrist",
    "stats": {
      "REGEN": 2
    },
    "lore": "",
    "graphic": "./assets/items/bracelet-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#ff7afb",
      "metal": "#e3b51c"
    },
    "avatarSpriteChannels": {
      "gem": "#000000",
      "metal": "#e3b51c"
    },
    "goldValue": 70,
    "graphicTint": ""
  },
  "Gold Onyx Ring": {
    "name": "Gold Onyx Ring",
    "rarity": "uncommon",
    "slot": "Finger",
    "stats": {
      "BLOCK": 1
    },
    "lore": "",
    "graphic": "./assets/items/ring-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#000000",
      "metal": "#e3b51c"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/onyx-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/onyx-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/onyx-ring.png",
    "avatarSpriteChannels": {
      "gem": "#000000",
      "metal": "#e3b51c"
    },
    "goldValue": 200,
    "graphicTint": ""
  },
  "Gold Onyx Earring": {
    "name": "Gold Onyx Earring",
    "rarity": "uncommon",
    "slot": "Ear",
    "stats": {
      "BLOCK": 1
    },
    "lore": "",
    "graphic": "./assets/items/gem-earring.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#000000",
      "metal": "#e3b51c"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/emerald-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/emerald-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/emerald-ring.png",
    "avatarSpriteChannels": {
      "gem": "#17ad00",
      "metal": "#e3b51c"
    },
    "goldValue": 200,
    "graphicTint": ""
  },
  "Gold Onyx Necklace": {
    "name": "Gold Onyx Necklace",
    "rarity": "uncommon",
    "slot": "Neck",
    "stats": {
      "BLOCK": 2
    },
    "lore": "",
    "graphic": "./assets/items/necklace-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#000000",
      "metal": "#e3b51c"
    },
    "avatarSpriteChannels": {
      "gem": "#000000",
      "metal": "#e3b51c"
    },
    "goldValue": 240,
    "graphicTint": ""
  },
  "Gold Onyx Bracelet": {
    "name": "Gold Onyx Bracelet",
    "rarity": "uncommon",
    "slot": "Wrist",
    "stats": {
      "BLOCK": 2
    },
    "lore": "",
    "graphic": "./assets/items/bracelet-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#000000",
      "metal": "#e3b51c"
    },
    "avatarSpriteChannels": {
      "gem": "#000000",
      "metal": "#e3b51c"
    },
    "goldValue": 240,
    "graphicTint": ""
  },
  "Gold Aquamarine Ring": {
    "name": "Gold Aquamarine Ring",
    "rarity": "uncommon",
    "slot": "Finger",
    "stats": {
      "FOCUS": 1
    },
    "lore": "",
    "graphic": "./assets/items/ring-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#00ffbf",
      "metal": "#e3b51c"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/sapphire-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/sapphire-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/sapphire-ring.png",
    "goldValue": 200,
    "graphicTint": "",
    "avatarSpriteChannels": {
      "gem": "#00ffbf",
      "metal": "#e3b51c"
    }
  },
  "Gold Aquamarine Earring": {
    "name": "Gold Aquamarine Earring",
    "rarity": "uncommon",
    "slot": "Ear",
    "stats": {
      "FOCUS": 1
    },
    "lore": "",
    "graphic": "./assets/items/gem-earring.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#00ffbf",
      "metal": "#e3b51c"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/emerald-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/emerald-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/emerald-ring.png",
    "avatarSpriteChannels": {
      "gem": "#17ad00",
      "metal": "#e3b51c"
    },
    "goldValue": 200,
    "graphicTint": ""
  },
  "Gold Aquamarine Necklace": {
    "name": "Gold Aquamarine Necklace",
    "rarity": "uncommon",
    "slot": "Neck",
    "stats": {
      "FOCUS": 2
    },
    "lore": "",
    "graphic": "./assets/items/necklace-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#00fffb",
      "metal": "#e3b51c"
    },
    "goldValue": 240,
    "graphicTint": "",
    "avatarSpriteChannels": {
      "gem": "#00fffb",
      "metal": "#e3b51c"
    }
  },
  "Gold Aquamarine Bracelet": {
    "name": "Gold Aquamarine Bracelet",
    "rarity": "uncommon",
    "slot": "Wrist",
    "stats": {
      "FOCUS": 2
    },
    "lore": "",
    "graphic": "./assets/items/bracelet-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#00ffbf",
      "metal": "#e3b51c"
    },
    "avatarSpriteChannels": {
      "gem": "#000000",
      "metal": "#e3b51c"
    },
    "goldValue": 240,
    "graphicTint": ""
  },
  "Gold Amethyst Ring": {
    "name": "Gold Amethyst Ring",
    "rarity": "uncommon",
    "slot": "Finger",
    "stats": {
      "AGL": 1
    },
    "lore": "",
    "graphic": "./assets/items/ring-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#8000ff",
      "metal": "#e3b51c"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/opal-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/opal-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/opal-ring.png",
    "avatarSpriteChannels": {
      "gem": "#f88fff",
      "metal": "#e3b51c"
    },
    "goldValue": 200,
    "graphicTint": ""
  },
  "Gold Amethyst Earring": {
    "name": "Gold Amethyst Earring",
    "rarity": "uncommon",
    "slot": "Ear",
    "stats": {
      "AGL": 1
    },
    "lore": "",
    "graphic": "./assets/items/gem-earring.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#8000ff",
      "metal": "#e3b51c"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/emerald-ring.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/emerald-ring.png",
    "avatarSprite": "./assets/sprites/player-equipment/emerald-ring.png",
    "avatarSpriteChannels": {
      "gem": "#17ad00",
      "metal": "#e3b51c"
    },
    "goldValue": 200,
    "graphicTint": ""
  },
  "Gold Amethyst Necklace": {
    "name": "Gold Amethyst Necklace",
    "rarity": "uncommon",
    "slot": "Neck",
    "stats": {
      "AGL": 2
    },
    "lore": "",
    "graphic": "./assets/items/necklace-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#a600ff",
      "metal": "#e3b51c"
    },
    "goldValue": 240,
    "graphicTint": "",
    "avatarSpriteChannels": {
      "gem": "#a600ff",
      "metal": "#e3b51c"
    }
  },
  "Gold Amethyst Bracelet": {
    "name": "Gold Amethyst Bracelet",
    "rarity": "uncommon",
    "slot": "Wrist",
    "stats": {
      "AGL": 2
    },
    "lore": "",
    "graphic": "./assets/items/bracelet-with-little-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#8000ff",
      "metal": "#e3b51c"
    },
    "avatarSpriteChannels": {
      "gem": "#000000",
      "metal": "#e3b51c"
    },
    "goldValue": 240,
    "graphicTint": ""
  },
  "Small Bag": {
    "bag": {
      "slots": 6
    },
    "bagInventory": [],
    "name": "Small Bag",
    "rarity": "common",
    "slot": "Bag",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/bag.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/small-bag.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/small-bag.png",
    "avatarSprite": "./assets/sprites/player-equipment/small-bag.png",
    "goldValue": 40,
    "graphicTint": ""
  },
  "Clarity Potion": {
    "consumable": {
      "color": "blue",
      "label": "blue bottle",
      "duration": 60,
      "addStats": {
        "INT": 15
      },
      "text": "+15 INT for 60 seconds"
    },
    "name": "Clarity Potion",
    "rarity": "common",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/ether.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/clarity-potion.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/clarity-potion.png",
    "avatarSprite": "./assets/sprites/player-equipment/clarity-potion.png",
    "soundEffect": "./assets/audio/generic-celestial-offensive-spell.wav",
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Potion of Resist Magic": {
    "consumable": {
      "color": "purple",
      "label": "purple bottle",
      "duration": 60,
      "addStats": {
        "RESIST": 5
      },
      "text": "+5 Magic Resistance for 60 seconds"
    },
    "name": "Potion of Resist Magic",
    "rarity": "common",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/ether.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#ae00ff"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/clarity-potion.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/clarity-potion.png",
    "avatarSprite": "./assets/sprites/player-equipment/clarity-potion.png",
    "avatarSpriteChannels": {
      "gem": "#ae00ff"
    },
    "soundEffect": "./assets/audio/generic-celestial-offensive-spell.wav",
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Agility Potion": {
    "consumable": {
      "color": "orange",
      "label": "orange bottle",
      "duration": 60,
      "addStats": {
        "AGL": 15
      },
      "text": "+15 AGL for 60 seconds"
    },
    "name": "Agility Potion",
    "rarity": "common",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/ether.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#b35c09"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/agility-potion.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/agility-potion.png",
    "avatarSprite": "./assets/sprites/player-equipment/agility-potion.png",
    "avatarSpriteChannels": {
      "gem": "#b35c09"
    },
    "soundEffect": "./assets/audio/generic-celestial-offensive-spell.wav",
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Strength Potion": {
    "consumable": {
      "color": "brown",
      "label": "brown bottle",
      "duration": 60,
      "addStats": {
        "ATK": 6
      },
      "text": "+6 ATK for 60 seconds"
    },
    "name": "Strength Potion",
    "rarity": "common",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/ether.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#5c0505"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/agility-potion.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/agility-potion.png",
    "avatarSprite": "./assets/sprites/player-equipment/agility-potion.png",
    "avatarSpriteChannels": {
      "gem": "#b35c09"
    },
    "soundEffect": "./assets/audio/generic-celestial-offensive-spell.wav",
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Focus Potion": {
    "consumable": {
      "color": "yellow",
      "label": "yellow bottle",
      "duration": 60,
      "addStats": {
        "FOCUS": 15
      },
      "text": "+15 FOCUS for 60 seconds"
    },
    "name": "Focus Potion",
    "rarity": "common",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/ether.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#ffbb00"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/agility-potion.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/agility-potion.png",
    "avatarSprite": "./assets/sprites/player-equipment/agility-potion.png",
    "avatarSpriteChannels": {
      "gem": "#b35c09"
    },
    "soundEffect": "./assets/audio/generic-celestial-offensive-spell.wav",
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Soothing Potion": {
    "consumable": {
      "color": "green",
      "label": "green bottle",
      "duration": 60,
      "addStats": {
        "REGEN": 10
      },
      "text": "+10 REGEN for 60 seconds"
    },
    "name": "Soothing Potion",
    "rarity": "common",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/ether.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#18b300"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/soothing-potion.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/soothing-potion.png",
    "avatarSprite": "./assets/sprites/player-equipment/soothing-potion.png",
    "avatarSpriteChannels": {
      "gem": "#18b300"
    },
    "soundEffect": "./assets/audio/generic-celestial-offensive-spell.wav",
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Energy Potion": {
    "consumable": {
      "color": "white",
      "label": "white bottle",
      "duration": 60,
      "addStats": {
        "SPD": 6
      },
      "text": "+6 SPD for 60 seconds"
    },
    "name": "Energy Potion",
    "rarity": "common",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/ether.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#ffffff"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/energy-potion.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/energy-potion.png",
    "avatarSprite": "./assets/sprites/player-equipment/energy-potion.png",
    "avatarSpriteChannels": {
      "gem": "#ffffff"
    },
    "soundEffect": "./assets/audio/generic-celestial-offensive-spell.wav",
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Healing Potion": {
    "consumable": {
      "color": "red",
      "label": "red bottle",
      "heal": 15,
      "text": "Heals 15 HP"
    },
    "name": "Healing Potion",
    "rarity": "common",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/ether.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#a30505"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/healing-potion.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/healing-potion.png",
    "avatarSprite": "./assets/sprites/player-equipment/healing-potion.png",
    "avatarSpriteChannels": {
      "gem": "#a30505"
    },
    "soundEffect": "./assets/audio/generic-celestial-offensive-spell.wav",
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Greater Healing Potion": {
    "consumable": {
      "color": "red",
      "label": "red bottle",
      "heal": 30,
      "text": "Heals 30 HP"
    },
    "name": "Greater Healing Potion",
    "rarity": "common",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/ether.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#a30505"
    },
    "glow": true,
    "glowColor": "#990000",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/healing-potion.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/healing-potion.png",
    "avatarSprite": "./assets/sprites/player-equipment/healing-potion.png",
    "avatarSpriteChannels": {
      "gem": "#a30505"
    },
    "soundEffect": "./assets/audio/generic-celestial-offensive-spell.wav",
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Bronze Arrow": {
    "name": "Bronze Arrow",
    "rarity": "common",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/arrow.png",
    "graphicSize": 30,
    "graphicChannels": {
      "metal": "#c06e1b"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/arrow.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/arrow.png",
    "avatarSprite": "./assets/sprites/player-equipment/arrow.png",
    "goldValue": 1,
    "maxStack": 99,
    "stackable": true,
    "graphicTint": ""
  },
  "Faerie Sigil": {
    "consumable": {
      "enchantment": "Faerie Sigil",
      "text": "Permanently imbues a weapon or piece of wearable equipment with the Faerie Sigil Enchantment: +1 REGEN and +1 FOCUS."
    },
    "name": "Faerie Sigil",
    "rarity": "uncommon",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/medallion-with-glowing-rune.png",
    "graphicSize": 30,
    "graphicChannels": {
      "metal": "#bb5cc1",
      "gem": "#16a800"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/faerie-sigil.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/faerie-sigil.png",
    "avatarSprite": "./assets/sprites/player-equipment/faerie-sigil.png",
    "avatarSpriteChannels": {
      "metal": "#bb5cc1",
      "gem": "#16a800"
    },
    "goldValue": 0,
    "soundEffect": "./assets/audio/generic-celestial-buff.wav",
    "graphicTint": ""
  },
  "Blue Hydra Scale": {
    "consumable": {
      "enchantment": "Blue Hydra Scale",
      "text": "Permanently imbues a piece of chainmail armor with the Blue Hydra Scale Enchantment: +1 DEF, +1 INT, +1 BLOCK, +1 REGEN, +1 FOCUS, +1 RESIST"
    },
    "name": "Blue Hydra Scale",
    "rarity": "rare",
    "slot": "Supply",
    "stats": {},
    "lore": "\"Scylox the Many is now Scylox the None\"",
    "graphic": "./assets/items/dragon-scale.png",
    "graphicSize": 30,
    "graphicTint": "#9398e1",
    "graphicChannels": {
      "metal": "#404ace",
      "gem": "#2258c3"
    },
    "glow": true,
    "glowColor": "#0055ff",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/faerie-sigil.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/faerie-sigil.png",
    "avatarSprite": "./assets/sprites/player-equipment/faerie-sigil.png",
    "avatarSpriteChannels": {
      "metal": "#bb5cc1",
      "gem": "#16a800"
    },
    "goldValue": 100,
    "soundEffect": "./assets/audio/generic-celestial-buff.wav"
  },
  "Gvada's Blessing": {
    "consumable": {
      "enchantment": "Gvada's Blessing",
      "text": "Permanently imbues a weapon or piece of wearable equipment with the Gvada's Blessing Enchantment: +1 RESIST."
    },
    "name": "Gvada's Blessing",
    "rarity": "uncommon",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/medallion-with-glowing-rune.png",
    "graphicSize": 30,
    "graphicChannels": {
      "metal": "#4e54fd",
      "gem": "#f566ff"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/faerie-sigil.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/faerie-sigil.png",
    "avatarSprite": "./assets/sprites/player-equipment/faerie-sigil.png",
    "avatarSpriteChannels": {
      "metal": "#bb5cc1",
      "gem": "#16a800"
    },
    "goldValue": 0,
    "soundEffect": "./assets/audio/generic-celestial-buff.wav",
    "graphicTint": ""
  },
  "Neophyte Badge": {
    "consumable": {
      "enchantment": "Neophyte Badge",
      "text": "Permanently imbues a weapon or piece of wearable equipment with the Neophyte Badge Enchantment: +1 INT."
    },
    "name": "Neophyte Badge",
    "rarity": "uncommon",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/medallion-with-glowing-rune.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#0f97ff"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/faerie-sigil.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/faerie-sigil.png",
    "avatarSprite": "./assets/sprites/player-equipment/faerie-sigil.png",
    "avatarSpriteChannels": {
      "metal": "#bb5cc1",
      "gem": "#16a800"
    },
    "goldValue": 0,
    "soundEffect": "./assets/audio/generic-celestial-buff.wav",
    "graphicTint": ""
  },
  "Badge of Light": {
    "consumable": {
      "enchantment": "Badge of Light",
      "text": "Permanently imbues a weapon or piece of wearable equipment with the Badge of Light Enchantment: +1 INT."
    },
    "name": "Badge of Light",
    "rarity": "uncommon",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/medallion-with-glowing-rune.png",
    "graphicSize": 30,
    "graphicChannels": {
      "metal": "#ffbb00",
      "gem": "#ffdd00"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/faerie-sigil.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/faerie-sigil.png",
    "avatarSprite": "./assets/sprites/player-equipment/faerie-sigil.png",
    "avatarSpriteChannels": {
      "metal": "#bb5cc1",
      "gem": "#16a800"
    },
    "goldValue": 0,
    "soundEffect": "./assets/audio/generic-celestial-buff.wav",
    "graphicTint": ""
  },
  "Acolyte Badge": {
    "consumable": {
      "enchantment": "Acolyte Badge",
      "text": "Permanently imbues a weapon or piece of wearable equipment with the Acolyte Badge Enchantment: +1 INT."
    },
    "name": "Acolyte Badge",
    "rarity": "uncommon",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/medallion-with-glowing-rune.png",
    "graphicSize": 30,
    "graphicChannels": {
      "metal": "#3e3e3c",
      "gem": "#7300ff"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/faerie-sigil.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/faerie-sigil.png",
    "avatarSprite": "./assets/sprites/player-equipment/faerie-sigil.png",
    "avatarSpriteChannels": {
      "metal": "#bb5cc1",
      "gem": "#16a800"
    },
    "goldValue": 0,
    "soundEffect": "./assets/audio/generic-celestial-buff.wav",
    "graphicTint": ""
  },
  "Smokey Badge": {
    "consumable": {
      "enchantment": "Smokey Badge",
      "text": "Permanently imbues a weapon or piece of wearable equipment with the Smokey Badge Enchantment: +1 REGEN."
    },
    "name": "Smokey Badge",
    "rarity": "uncommon",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/medallion-with-glowing-rune.png",
    "graphicSize": 30,
    "graphicChannels": {
      "metal": "#166b0b",
      "gem": "#990a0a"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/faerie-sigil.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/faerie-sigil.png",
    "avatarSprite": "./assets/sprites/player-equipment/faerie-sigil.png",
    "avatarSpriteChannels": {
      "metal": "#bb5cc1",
      "gem": "#16a800"
    },
    "goldValue": 0,
    "soundEffect": "./assets/audio/generic-celestial-buff.wav",
    "graphicTint": ""
  },
  "Ember Badge": {
    "consumable": {
      "enchantment": "Ember Badge",
      "text": "Permanently imbues a weapon or piece of wearable equipment with the Ember Badge Enchantment: +1 ATK."
    },
    "name": "Ember Badge",
    "rarity": "uncommon",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/medallion-with-glowing-rune.png",
    "graphicSize": 30,
    "graphicChannels": {
      "metal": "#691b1b",
      "gem": "#ff7a18"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/faerie-sigil.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/faerie-sigil.png",
    "avatarSprite": "./assets/sprites/player-equipment/faerie-sigil.png",
    "avatarSpriteChannels": {
      "metal": "#691b1b",
      "gem": "#ff7a18"
    },
    "goldValue": 0,
    "soundEffect": "./assets/audio/generic-celestial-buff.wav",
    "graphicTint": ""
  },
  "Warden Badge": {
    "consumable": {
      "enchantment": "Warden Badge",
      "text": "Permanently imbues a weapon or piece of wearable equipment with the Warden Badge Enchantment: +1 RESIST."
    },
    "name": "Warden Badge",
    "rarity": "uncommon",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/medallion-with-glowing-rune.png",
    "graphicSize": 30,
    "graphicChannels": {
      "metal": "#2f5f25",
      "gem": "#7dff68"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/faerie-sigil.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/faerie-sigil.png",
    "avatarSprite": "./assets/sprites/player-equipment/faerie-sigil.png",
    "avatarSpriteChannels": {
      "metal": "#2f5f25",
      "gem": "#7dff68"
    },
    "goldValue": 0,
    "soundEffect": "./assets/audio/generic-celestial-buff.wav",
    "graphicTint": ""
  },
  "Weapons Training Badge": {
    "consumable": {
      "enchantment": "Weapons Training Badge",
      "text": "Permanently imbues a weapon or piece of wearable equipment with the Weapons Training Badge Enchantment: +1 ATK."
    },
    "name": "Weapons Training Badge",
    "rarity": "uncommon",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/platinum-coin.png",
    "graphicSize": 30,
    "graphicChannels": {
      "metal": "#691b1b"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/faerie-sigil.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/faerie-sigil.png",
    "avatarSprite": "./assets/sprites/player-equipment/faerie-sigil.png",
    "avatarSpriteChannels": {
      "metal": "#bb5cc1",
      "gem": "#16a800"
    },
    "goldValue": 0,
    "soundEffect": "./assets/audio/generic-celestial-buff.wav",
    "graphicTint": ""
  },
  "Shield Training Badge": {
    "consumable": {
      "enchantment": "Shield Training Badge",
      "text": "Permanently imbues a weapon or piece of wearable equipment with the Shield Training Badge Enchantment: +1 BLOCK."
    },
    "name": "Shield Training Badge",
    "rarity": "uncommon",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/platinum-coin.png",
    "graphicSize": 30,
    "graphicChannels": {
      "metal": "#691b1b"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/faerie-sigil.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/faerie-sigil.png",
    "avatarSprite": "./assets/sprites/player-equipment/faerie-sigil.png",
    "avatarSpriteChannels": {
      "metal": "#bb5cc1",
      "gem": "#16a800"
    },
    "goldValue": 0,
    "soundEffect": "./assets/audio/generic-celestial-buff.wav",
    "graphicTint": ""
  },
  "Gandersguard Sigil": {
    "consumable": {
      "enchantment": "Gandersguard Sigil",
      "text": "Permanently imbues a weapon or piece of wearable equipment with the Gandersguard Sigil Enchantment: +5 HP, +1 RESIST."
    },
    "name": "Gandersguard Sigil",
    "rarity": "uncommon",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/medallion-with-glowing-rune.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#11b056"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/faerie-sigil.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/faerie-sigil.png",
    "avatarSprite": "./assets/sprites/player-equipment/faerie-sigil.png",
    "avatarSpriteChannels": {
      "metal": "#bb5cc1",
      "gem": "#16a800"
    },
    "goldValue": 0,
    "soundEffect": "./assets/audio/generic-celestial-buff.wav",
    "graphicTint": ""
  },
  "Rune of Goblin Slaying": {
    "consumable": {
      "enchantment": "Goblin Slayer",
      "text": "Permanently imbues a weapon with the Goblin Slayer Enchantment: +5 HP, +1 RESIST."
    },
    "name": "Rune of Goblin Slaying",
    "rarity": "uncommon",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/medallion-with-glowing-rune.png",
    "graphicSize": 30,
    "graphicChannels": {
      "metal": "#624122",
      "gem": "#000000"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/faerie-sigil.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/faerie-sigil.png",
    "avatarSprite": "./assets/sprites/player-equipment/faerie-sigil.png",
    "avatarSpriteChannels": {
      "metal": "#bb5cc1",
      "gem": "#16a800"
    },
    "goldValue": 0,
    "soundEffect": "./assets/audio/generic-celestial-buff.wav",
    "graphicTint": ""
  },
  "Fenguard Sigil": {
    "consumable": {
      "enchantment": "Fenguard Sigil",
      "text": "Permanently imbues a weapon or piece of wearable equipment with the Fenguard Sigil Enchantment: +5 HP, +1 ATK, +2 AGL, +2 RESIST."
    },
    "name": "Fenguard Sigil",
    "rarity": "uncommon",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/medallion-with-glowing-rune.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#920707"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/faerie-sigil.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/faerie-sigil.png",
    "avatarSprite": "./assets/sprites/player-equipment/faerie-sigil.png",
    "avatarSpriteChannels": {
      "metal": "#bb5cc1",
      "gem": "#16a800"
    },
    "goldValue": 0,
    "soundEffect": "./assets/audio/generic-celestial-buff.wav",
    "graphicTint": ""
  },
  "Necromagister's Sigil": {
    "consumable": {
      "enchantment": "Fenguard Sigil",
      "text": "Permanently imbues a weapon or piece of wearable equipment with the Necromagister's Sigil Enchantment: +2 Int, +1 RESIST."
    },
    "name": "Necromagister's Sigil",
    "rarity": "uncommon",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/medallion-with-glowing-rune.png",
    "graphicSize": 30,
    "graphicTint": "#1c1c1c",
    "graphicChannels": {
      "gem": "#5900b3"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/faerie-sigil.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/faerie-sigil.png",
    "avatarSprite": "./assets/sprites/player-equipment/faerie-sigil.png",
    "avatarSpriteTint": "#1c1c1c",
    "avatarSpriteChannels": {
      "metal": "#bb5cc1",
      "gem": "#16a800"
    },
    "goldValue": 0,
    "soundEffect": "./assets/audio/generic-celestial-buff.wav"
  },
  "Mortal Stone": {
    "consumable": {
      "realmStone": "Mortal",
      "text": "Permanently lowers the cooldown of a Mortal spell in your Spell Book by 15%"
    },
    "name": "Mortal Stone",
    "rarity": "uncommon",
    "slot": "Consumable",
    "stats": {},
    "lore": "",
    "graphic": "mortal stone",
    "graphicSize": 30,
    "goldValue": 50,
    "graphicTint": ""
  },
  "Ethereal Stone": {
    "name": "Ethereal Stone",
    "rarity": "uncommon",
    "slot": "Consumable",
    "stats": {},
    "goldValue": 50,
    "consumable": {
      "realmStone": "Ethereal",
      "text": "Permanently lowers the cooldown of an Ethereal spell in your Spell Book by 15%"
    },
    "graphic": "ethereal stone",
    "graphicTint": ""
  },
  "Celestial Stone": {
    "consumable": {
      "realmStone": "Celestial",
      "text": "Permanently lowers the cooldown of a Celestial spell in your Spell Book by 15%"
    },
    "name": "Celestial Stone",
    "rarity": "uncommon",
    "slot": "Consumable",
    "stats": {},
    "lore": "",
    "graphic": "celestial stone",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/celestial-stone.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/celestial-stone.png",
    "avatarSprite": "./assets/sprites/player-equipment/celestial-stone.png",
    "goldValue": 50,
    "graphicTint": ""
  },
  "Infernal Stone": {
    "name": "Infernal Stone",
    "rarity": "uncommon",
    "slot": "Consumable",
    "stats": {},
    "goldValue": 50,
    "consumable": {
      "realmStone": "Infernal",
      "text": "Permanently lowers the cooldown of an Infernal spell in your Spell Book by 15%"
    },
    "graphic": "infernal stone",
    "graphicTint": ""
  },
  "Sylvan Stone": {
    "name": "Sylvan Stone",
    "rarity": "uncommon",
    "slot": "Consumable",
    "stats": {},
    "goldValue": 50,
    "consumable": {
      "realmStone": "Sylvan",
      "text": "Permanently lowers the cooldown of a Sylvan spell in your Spell Book by 15%"
    },
    "graphic": "sylvan stone",
    "graphicTint": ""
  },
  "Shadow Stone": {
    "name": "Shadow Stone",
    "rarity": "uncommon",
    "slot": "Consumable",
    "stats": {},
    "goldValue": 50,
    "consumable": {
      "realmStone": "Umbral",
      "text": "Permanently lowers the cooldown of a Umbral spell in your Spell Book by 15%"
    },
    "graphic": "shadow stone",
    "graphicTint": ""
  },
  "Vial of Diarrhea": {
    "consumable": {
      "color": "brown",
      "label": "brown bottle",
      "heal": -15,
      "text": "Probably shouldn't drink this"
    },
    "name": "Vial of Diarrhea",
    "rarity": "common",
    "slot": "Supply",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/ether.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#484414"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "avatarSpriteChannels": {
      "gem": "#484414"
    },
    "goldValue": 0,
    "soundEffect": "./assets/audio/poison.wav",
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Lake Yarrow": {
    "consumable": {
      "enchantment": "Lake Yarrow",
      "text": "Permanently imbues a weapon or piece of wearable equipment with the Lake Yarrow Enchantment: +5 HP, +1 RESIST, +1 AGL"
    },
    "name": "Lake Yarrow",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/sprig-of-houndstongue.png",
    "graphicSize": 30,
    "glow": true,
    "glowColor": "#68a85e",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "graphicTint": ""
  },
  "Scroll of Magic Missile": {
    "scroll": {
      "spellName": "Magic Missile"
    },
    "name": "Scroll of Magic Missile",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "lore": "",
    "graphic": "",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/scroll-of-magic-missile.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/scroll-of-magic-missile.png",
    "avatarSprite": "./assets/sprites/player-equipment/scroll-of-magic-missile.png",
    "goldValue": 35,
    "graphicTint": ""
  },
  "Scroll of Rage": {
    "scroll": {
      "spellName": "Rage"
    },
    "name": "Scroll of Rage",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "lore": "",
    "graphic": "",
    "graphicSize": 30,
    "goldValue": 45,
    "graphicTint": ""
  },
  "Scroll of Archery Mastery": {
    "scroll": {
      "spellName": "Archery Mastery"
    },
    "name": "Scroll of Archery Mastery",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "lore": "",
    "graphic": "",
    "graphicSize": 30,
    "goldValue": 60,
    "graphicTint": ""
  },
  "Scroll of Axe Mastery": {
    "scroll": {
      "spellName": "Axe Mastery"
    },
    "name": "Scroll of Axe Mastery",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "lore": "",
    "graphic": "",
    "graphicSize": 30,
    "goldValue": 60,
    "graphicTint": ""
  },
  "Scroll of Mace Mastery": {
    "scroll": {
      "spellName": "Mace Mastery"
    },
    "name": "Scroll of Mace Mastery",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "lore": "",
    "graphic": "",
    "graphicSize": 30,
    "goldValue": 60,
    "graphicTint": ""
  },
  "Scroll of Dual Wield": {
    "scroll": {
      "spellName": "Dual Wield"
    },
    "name": "Scroll of Dual Wield",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "lore": "",
    "graphic": "",
    "graphicSize": 30,
    "goldValue": 75,
    "graphicTint": ""
  },
  "Scroll of War Drums": {
    "scroll": {
      "spellName": "War Drums"
    },
    "name": "Scroll of War Drums",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "lore": "",
    "graphic": "",
    "graphicSize": 30,
    "goldValue": 70,
    "graphicTint": ""
  },
  "Scroll of Bloodthirsty Aura": {
    "scroll": {
      "spellName": "Bloodthirsty Aura"
    },
    "name": "Scroll of Bloodthirsty Aura",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "lore": "",
    "graphic": "",
    "graphicSize": 30,
    "goldValue": 85,
    "graphicTint": ""
  },
  "Scroll of Ring of Fire": {
    "name": "Scroll of Ring of Fire",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 45,
    "scroll": {
      "spellName": "Ring of Fire"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Basic Prayer": {
    "name": "Scroll of Basic Prayer",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 30,
    "scroll": {
      "spellName": "Basic Prayer"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Curse of Disdain": {
    "name": "Scroll of Curse of Disdain",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 40,
    "scroll": {
      "spellName": "Curse of Disdain"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Tangle Vine": {
    "name": "Scroll of Tangle Vine",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 55,
    "scroll": {
      "spellName": "Tangle Vine"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Pacify": {
    "name": "Scroll of Pacify",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 45,
    "scroll": {
      "spellName": "Pacify"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Fireblast": {
    "name": "Scroll of Fireblast",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 55,
    "scroll": {
      "spellName": "Fireblast"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Fireball": {
    "name": "Scroll of Fireball",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 65,
    "scroll": {
      "spellName": "Fireball"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Aura of Protection": {
    "name": "Scroll of Aura of Protection",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 50,
    "scroll": {
      "spellName": "Aura of Protection"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Song of White Stag": {
    "name": "Scroll of Song of White Stag",
    "rarity": "rare",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 150,
    "scroll": {
      "spellName": "Song of White Stag"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Lifesteal": {
    "name": "Scroll of Lifesteal",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 80,
    "scroll": {
      "spellName": "Lifesteal"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Spirit of Avia": {
    "name": "Scroll of Spirit of Avia",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 85,
    "scroll": {
      "spellName": "Spirit of Avia"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Thorn Shield": {
    "name": "Scroll of Thorn Shield",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 65,
    "scroll": {
      "spellName": "Thorn Shield"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Burning Skin": {
    "name": "Scroll of Burning Skin",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 80,
    "scroll": {
      "spellName": "Burning Skin"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Faerie Circle": {
    "name": "Scroll of Faerie Circle",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 95,
    "scroll": {
      "spellName": "Faerie Circle"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Faerie Fire": {
    "name": "Scroll of Faerie Fire",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 50,
    "scroll": {
      "spellName": "Faerie Fire"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Faerie Dust": {
    "name": "Scroll of Faerie Dust",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 60,
    "scroll": {
      "spellName": "Faerie Dust"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Poison": {
    "name": "Scroll of Poison",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 90,
    "scroll": {
      "spellName": "Poison"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Dark Circle": {
    "name": "Scroll of Dark Circle",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 95,
    "scroll": {
      "spellName": "Dark Circle"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Invisibility": {
    "name": "Scroll of Invisibility",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 75,
    "scroll": {
      "spellName": "Invisibility"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Banish": {
    "name": "Scroll of Banish",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 70,
    "scroll": {
      "spellName": "Banish"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Summon Portal": {
    "name": "Scroll of Summon Portal",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 150,
    "scroll": {
      "spellName": "Summon Portal"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Clarity": {
    "name": "Scroll of Clarity",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 60,
    "scroll": {
      "spellName": "Clarity"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Ice Bolt": {
    "name": "Scroll of Ice Bolt",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 95,
    "scroll": {
      "spellName": "Ice Bolt"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Ice Storm": {
    "name": "Scroll of Ice Storm",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 115,
    "scroll": {
      "spellName": "Ice Storm"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Frozen Touch": {
    "name": "Scroll of Frozen Touch",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 75,
    "scroll": {
      "spellName": "Frozen Touch"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Chain Lightning": {
    "name": "Scroll of Chain Lightning",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 105,
    "scroll": {
      "spellName": "Chain Lightning"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Divine Shield": {
    "name": "Scroll of Divine Shield",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 95,
    "scroll": {
      "spellName": "Divine Shield"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Raise Skeleton": {
    "name": "Scroll of Raise Skeleton",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 100,
    "scroll": {
      "spellName": "Raise Skeleton"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Tame Beast": {
    "name": "Scroll of Tame Beast",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 125,
    "scroll": {
      "spellName": "Tame Beast"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Heavenly Light": {
    "name": "Scroll of Heavenly Light",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 80,
    "scroll": {
      "spellName": "Heavenly Light"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Godspeed": {
    "name": "Scroll of Godspeed",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 100,
    "scroll": {
      "spellName": "Godspeed"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Arcane Shield": {
    "name": "Scroll of Arcane Shield",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 95,
    "scroll": {
      "spellName": "Arcane Shield"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Pestilent Aura": {
    "name": "Scroll of Pestilent Aura",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 105,
    "scroll": {
      "spellName": "Pestilent Aura"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Summon Treant": {
    "name": "Scroll of Summon Treant",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 125,
    "scroll": {
      "spellName": "Summon Treant"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Virulent Plague": {
    "name": "Scroll of Virulent Plague",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 115,
    "scroll": {
      "spellName": "Virulent Plague"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Summon Earth Elemental": {
    "name": "Scroll of Summon Earth Elemental",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 125,
    "scroll": {
      "spellName": "Summon Earth Elemental"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Summon Water Elemental": {
    "name": "Scroll of Summon Water Elemental",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 125,
    "scroll": {
      "spellName": "Summon Water Elemental"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Summon Fire Elemental": {
    "name": "Scroll of Summon Fire Elemental",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 125,
    "scroll": {
      "spellName": "Summon Fire Elemental"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Summon Shade": {
    "name": "Scroll of Summon Shade",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 125,
    "scroll": {
      "spellName": "Summon Shade"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Grace from Above": {
    "name": "Scroll of Grace from Above",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 110,
    "scroll": {
      "spellName": "Grace from Above"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Etherwind Aura": {
    "name": "Scroll of Etherwind Aura",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 95,
    "scroll": {
      "spellName": "Etherwind Aura"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Dagger Mastery": {
    "scroll": {
      "spellName": "Dagger Mastery"
    },
    "name": "Scroll of Dagger Mastery",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "lore": "",
    "graphic": "",
    "graphicSize": 30,
    "goldValue": 60,
    "graphicTint": ""
  },
  "Scroll of Shield Mastery": {
    "scroll": {
      "spellName": "Shield Mastery"
    },
    "name": "Scroll of Shield Mastery",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "lore": "",
    "graphic": "",
    "graphicSize": 30,
    "goldValue": 60,
    "graphicTint": ""
  },
  "Scroll of Shield Bash": {
    "scroll": {
      "spellName": "Shield Bash"
    },
    "name": "Scroll of Shield Bash",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "lore": "",
    "graphic": "",
    "graphicSize": 30,
    "goldValue": 65,
    "graphicTint": ""
  },
  "Scroll of Bone Ritual": {
    "name": "Scroll of Bone Ritual",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 75,
    "scroll": {
      "spellName": "Bone Ritual"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Spiderweb": {
    "name": "Scroll of Spiderweb",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 45,
    "scroll": {
      "spellName": "Spiderweb"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Unholy Dominion": {
    "name": "Scroll of Unholy Dominion",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 125,
    "scroll": {
      "spellName": "Unholy Dominion"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Battle Cry": {
    "name": "Scroll of Battle Cry",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 60,
    "scroll": {
      "spellName": "Battle Cry"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Briar Lash": {
    "name": "Scroll of Briar Lash",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 60,
    "scroll": {
      "spellName": "Briar Lash"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Sacred Grove": {
    "name": "Scroll of Sacred Grove",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 70,
    "scroll": {
      "spellName": "Sacred Grove"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Hypnotize": {
    "name": "Scroll of Hypnotize",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 65,
    "scroll": {
      "spellName": "Hypnotize"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Mortify": {
    "name": "Scroll of Mortify",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 75,
    "scroll": {
      "spellName": "Mortify"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Chlorophyll": {
    "name": "Scroll of Chlorophyll",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 65,
    "scroll": {
      "spellName": "Chlorophyll"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Scroll of Wooden Skin": {
    "name": "Scroll of Wooden Skin",
    "rarity": "common",
    "slot": "Scroll",
    "stats": {},
    "goldValue": 65,
    "scroll": {
      "spellName": "Wooden Skin"
    },
    "graphic": "",
    "graphicTint": ""
  },
  "Purple Mushroom": {
    "name": "Purple Mushroom",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/purple-mushroom.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/purple-mushroom.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/purple-mushroom.png",
    "avatarSprite": "./assets/sprites/player-equipment/purple-mushroom.png",
    "goldValue": 0,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Rat Pelt": {
    "name": "Rat Pelt",
    "rarity": "poor",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/brown-pelt.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 2,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Mustelid Pelt": {
    "name": "Mustelid Pelt",
    "rarity": "poor",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/brown-pelt.png",
    "graphicSize": 30,
    "graphicTint": "#e3e3e3",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 2,
    "maxStack": 20,
    "stackable": true
  },
  "Spider Silk": {
    "name": "Spider Silk",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/pile-of-raw-silk.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 8,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Eldweave Fiber": {
    "name": "Eldweave Fiber",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/pile-of-raw-silk.png",
    "graphicSize": 30,
    "graphicTint": "#16550c",
    "graphicChannels": {
      "metal": "#00ff1e"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 8,
    "maxStack": 20,
    "stackable": true
  },
  "Bolt of Spidersilk Cloth": {
    "name": "Bolt of Spidersilk Cloth",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/bolt-of-cloth.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 20,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Bolt of Eldweave Cloth": {
    "name": "Bolt of Eldweave Cloth",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/bolt-of-cloth.png",
    "graphicSize": 30,
    "graphicTint": "#6cdb4d",
    "graphicChannels": {
      "metal": "#189707"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 60,
    "maxStack": 20,
    "stackable": true
  },
  "Spider Leg": {
    "name": "Spider Leg",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/spider-leg.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 8,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Eye of Frog": {
    "name": "Eye of Frog",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/eye-of-newt.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 8,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Crimson Nettle": {
    "name": "Crimson Nettle",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/crimson-nettle.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 10,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Datura Pod": {
    "name": "Datura Pod",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/datura-seed-pod.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 12,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Silverleaf": {
    "name": "Silverleaf",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/silverleaf.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 12,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Bloodroot": {
    "name": "Bloodroot",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/bloodroot.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 10,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Blue Lotus": {
    "name": "Blue Lotus",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/blue-lotus.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 10,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Blue Lotus Copy": {
    "name": "Blue Lotus Copy",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/blue-lotus.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 10,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Pixie Wing": {
    "name": "Pixie Wing",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/pixie-wing.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 8,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Cherub Wing": {
    "name": "Cherub Wing",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/angel-wing.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 8,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Corvari Wing": {
    "name": "Corvari Wing",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/angel-wing.png",
    "graphicSize": 30,
    "graphicTint": "#04021d",
    "graphicChannels": {
      "metal": "#000000",
      "gem": "#000000"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 16,
    "maxStack": 20,
    "stackable": true
  },
  "Ratkin Tail": {
    "name": "Ratkin Tail",
    "rarity": "poor",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/rat-tail.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 8,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Dryad Horn": {
    "name": "Dryad Horn",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/dryad-antler.png",
    "graphicSize": 30,
    "glow": true,
    "glowColor": "#4d8844",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 12,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Vial of Naiad Water": {
    "name": "Vial of Naiad Water",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/vial-of-blood.png",
    "graphicSize": 30,
    "graphicTint": "#74c9ff",
    "glow": true,
    "glowColor": "#2e6eb2",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "avatarSpriteTint": "#74c9ff",
    "goldValue": 12,
    "maxStack": 20,
    "stackable": true
  },
  "Nymph Floret": {
    "name": "Nymph Floret",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/magical-flower.png",
    "graphicSize": 30,
    "glow": true,
    "glowColor": "#a442b8",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 12,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Spider Venom Sack": {
    "name": "Spider Venom Sack",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/venom-sac.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 8,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Musk Gland": {
    "name": "Musk Gland",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/venom-sac.png",
    "graphicSize": 30,
    "graphicTint": "#693e1b",
    "graphicChannels": {
      "metal": "#ff8800"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 10,
    "maxStack": 20,
    "stackable": true
  },
  "Toad Venom Sack": {
    "name": "Toad Venom Sack",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/venom-sac.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 16,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Plague Bear Adrenal Gland": {
    "name": "Plague Bear Adrenal Gland",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/venom-sac.png",
    "graphicSize": 30,
    "graphicTint": "#6b1f1f",
    "graphicChannels": {
      "metal": "#44ff00"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 0,
    "maxStack": 1,
    "noDrop": true,
    "noSell": true
  },
  "Bat Wing": {
    "name": "Bat Wing",
    "rarity": "poor",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/bat-wing.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 6,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Imp Wing": {
    "name": "Imp Wing",
    "rarity": "poor",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/bat-wing.png",
    "graphicSize": 30,
    "graphicTint": "#771818",
    "graphicChannels": {
      "metal": "#ff0000"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "goldValue": 10,
    "maxStack": 20,
    "stackable": true
  },
  "Drake Wing": {
    "name": "Drake Wing",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/bat-wing.png",
    "graphicSize": 30,
    "graphicTint": "#128a00",
    "graphicChannels": {
      "metal": "#a6ff00"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/rat-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/rat-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/rat-pelt.png",
    "avatarSpriteTint": "#128a00",
    "avatarSpriteChannels": {
      "metal": "#ffffff"
    },
    "goldValue": 14,
    "maxStack": 20,
    "stackable": true
  },
  "Wolf Pelt": {
    "name": "Wolf Pelt",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/grey-pelt.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/wolf-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/wolf-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/wolf-pelt.png",
    "goldValue": 20,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Snow Leopard Pelt": {
    "name": "Snow Leopard Pelt",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/grey-pelt.png",
    "graphicSize": 30,
    "graphicTint": "#d6d6d6",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/wolf-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/wolf-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/wolf-pelt.png",
    "goldValue": 20,
    "maxStack": 20,
    "stackable": true
  },
  "Bear Pelt": {
    "name": "Bear Pelt",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/grey-pelt.png",
    "graphicSize": 30,
    "graphicTint": "#291d0f",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/wolf-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/wolf-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/wolf-pelt.png",
    "goldValue": 30,
    "maxStack": 20,
    "stackable": true
  },
  "Deer Hide": {
    "name": "Deer Hide",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/grey-pelt.png",
    "graphicSize": 30,
    "graphicTint": "#503121",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/wolf-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/wolf-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/wolf-pelt.png",
    "avatarSpriteTint": "#503121",
    "goldValue": 20,
    "maxStack": 20,
    "stackable": true
  },
  "White Deer Hide": {
    "name": "White Deer Hide",
    "rarity": "rare",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/grey-pelt.png",
    "graphicSize": 30,
    "graphicTint": "#ffffff",
    "glow": true,
    "glowColor": "#ffffff",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/wolf-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/wolf-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/wolf-pelt.png",
    "avatarSpriteTint": "#503121",
    "goldValue": 60,
    "maxStack": 20,
    "stackable": true
  },
  "Ki-Rin Scale": {
    "name": "Ki-Rin Scale",
    "rarity": "rare",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/dragon-scale.png",
    "graphicSize": 30,
    "graphicTint": "#ffca38",
    "graphicChannels": {
      "metal": "#5f9b63"
    },
    "glow": true,
    "glowColor": "#979843",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/wolf-pelt.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/wolf-pelt.png",
    "avatarSprite": "./assets/sprites/player-equipment/wolf-pelt.png",
    "avatarSpriteTint": "#503121",
    "goldValue": 80,
    "maxStack": 20,
    "stackable": true
  },
  "Goblin Fang": {
    "name": "Goblin Fang",
    "rarity": "poor",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/fang.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/goblin-fang.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/goblin-fang.png",
    "avatarSprite": "./assets/sprites/player-equipment/goblin-fang.png",
    "goldValue": 6,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Bone": {
    "sellValue": 1,
    "name": "Bone",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "graphic": "./assets/items/bone.png",
    "graphicSize": 30,
    "goldValue": 2,
    "maxStack": 99,
    "stackable": true,
    "graphicTint": ""
  },
  "Snapdragon Frond": {
    "name": "Snapdragon Frond",
    "rarity": "poor",
    "slot": "Material",
    "stats": {},
    "graphic": "./assets/items/frond.png",
    "graphicSize": 30,
    "goldValue": 30,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Emerald": {
    "name": "Emerald",
    "rarity": "uncommon",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/neutral-gem.png",
    "graphicSize": 30,
    "graphicTint": "#007514",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/emerald.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/emerald.png",
    "avatarSprite": "./assets/sprites/player-equipment/emerald.png",
    "avatarSpriteTint": "#007514",
    "goldValue": 50,
    "maxStack": 20,
    "stackable": true
  },
  "Opal": {
    "name": "Opal",
    "rarity": "uncommon",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/neutral-gem.png",
    "graphicSize": 30,
    "graphicTint": "#f2a9d0",
    "goldValue": 50,
    "maxStack": 20,
    "stackable": true
  },
  "Ruby": {
    "name": "Ruby",
    "rarity": "uncommon",
    "slot": "Material",
    "stats": {},
    "graphic": "./assets/items/neutral-gem.png",
    "graphicSize": 30,
    "graphicTint": "#a20726",
    "goldValue": 50,
    "maxStack": 20,
    "stackable": true
  },
  "Sapphire": {
    "name": "Sapphire",
    "rarity": "uncommon",
    "slot": "Material",
    "stats": {},
    "graphic": "./assets/items/neutral-gem.png",
    "graphicSize": 30,
    "graphicTint": "#001ae0",
    "goldValue": 50,
    "maxStack": 20,
    "stackable": true
  },
  "Amethyst": {
    "name": "Amethyst",
    "rarity": "uncommon",
    "slot": "Material",
    "stats": {},
    "graphic": "./assets/items/neutral-gem.png",
    "graphicSize": 30,
    "graphicTint": "#7f4bce",
    "goldValue": 50,
    "maxStack": 20,
    "stackable": true
  },
  "Aquamarine": {
    "name": "Aquamarine",
    "rarity": "uncommon",
    "slot": "Material",
    "stats": {},
    "graphic": "./assets/items/neutral-gem.png",
    "graphicSize": 30,
    "graphicTint": "#3ccadd",
    "goldValue": 50,
    "maxStack": 20,
    "stackable": true
  },
  "Diamond": {
    "name": "Diamond",
    "rarity": "uncommon",
    "slot": "Material",
    "stats": {},
    "graphic": "./assets/items/neutral-gem.png",
    "graphicSize": 30,
    "graphicTint": "#d1d1d1",
    "goldValue": 100,
    "maxStack": 20,
    "stackable": true
  },
  "Onyx": {
    "name": "Onyx",
    "rarity": "uncommon",
    "slot": "Material",
    "stats": {},
    "graphic": "./assets/items/neutral-gem.png",
    "graphicSize": 30,
    "graphicTint": "#000000",
    "goldValue": 50,
    "maxStack": 20,
    "stackable": true
  },
  "Ether": {
    "name": "Ether",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/sprites/player-equipment/ether.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/ether.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/ether.png",
    "avatarSprite": "./assets/sprites/player-equipment/ether.png",
    "goldValue": 2,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Essense of Fire": {
    "name": "Essense of Fire",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/sprites/player-equipment/ether.png",
    "graphicSize": 30,
    "graphicTint": "#ff0000",
    "graphicChannels": {
      "gem": "#ff4d00"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/ether.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/ether.png",
    "avatarSprite": "./assets/sprites/player-equipment/ether.png",
    "goldValue": 2,
    "maxStack": 20,
    "stackable": true
  },
  "Sharlene's Parcel": {
    "name": "Sharlene's Parcel",
    "rarity": "common",
    "slot": "Quest",
    "stats": {},
    "graphic": "./assets/items/parcel.png",
    "graphicSize": 30,
    "noDrop": true,
    "noSell": true,
    "graphicTint": ""
  },
  "Napaea's Skull": {
    "name": "Napaea's Skull",
    "rarity": "common",
    "slot": "Quest",
    "stats": {},
    "graphic": "./assets/items/skull.png",
    "graphicSize": 30,
    "noDrop": true,
    "noSell": true,
    "graphicTint": ""
  },
  "Copper Ore": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Copper Ore",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/sprites/rock-64.png",
    "graphicSize": 30,
    "graphicTint": "#8a480a",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "avatarSpriteTint": "#8a480a",
    "goldValue": 20,
    "maxStack": 20,
    "stackable": true
  },
  "Iron Ore": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Iron Ore",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/sprites/rock-64.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "avatarSpriteTint": "#8a480a",
    "goldValue": 20,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Flint": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Flint",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/sprites/rock-64.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "avatarSpriteTint": "#8a480a",
    "goldValue": 20,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Uncut Diamond": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Uncut Diamond",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/uncut-gem.png",
    "graphicSize": 30,
    "graphicTint": "#ffffff",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 20
  },
  "Silver Nugget": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Silver Nugget",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/silver-nugget.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 20,
    "graphicTint": ""
  },
  "Gold Nugget": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Gold Nugget",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/silver-nugget.png",
    "graphicSize": 30,
    "graphicChannels": {
      "metal": "#c18606"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 40,
    "graphicTint": ""
  },
  "Uncut Ruby": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Uncut Ruby",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/uncut-gem.png",
    "graphicSize": 30,
    "graphicTint": "#7a1538",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "avatarSpriteTint": "#ffffff",
    "goldValue": 20
  },
  "Uncut Sapphire": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Uncut Sapphire",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/uncut-gem.png",
    "graphicSize": 30,
    "graphicTint": "#2e1fff",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "avatarSpriteTint": "#ffffff",
    "goldValue": 20
  },
  "Uncut Emerald": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Uncut Emerald",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/uncut-gem.png",
    "graphicSize": 30,
    "graphicTint": "#1b8327",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "avatarSpriteTint": "#ffffff",
    "goldValue": 20
  },
  "Uncut Onyx": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Uncut Onyx",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/uncut-gem.png",
    "graphicSize": 30,
    "graphicTint": "#000000",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "avatarSpriteTint": "#ffffff",
    "goldValue": 20
  },
  "Uncut Opal": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Uncut Opal",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/uncut-gem.png",
    "graphicSize": 30,
    "graphicTint": "#ff9eed",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "avatarSpriteTint": "#ffffff",
    "goldValue": 20
  },
  "Uncut Amethyst": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Uncut Amethyst",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/uncut-gem.png",
    "graphicSize": 30,
    "graphicTint": "#9238ff",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "avatarSpriteTint": "#ffffff",
    "goldValue": 20
  },
  "Uncut Aquamarine": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Uncut Aquamarine",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/uncut-gem.png",
    "graphicSize": 30,
    "graphicTint": "#81dddf",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "avatarSpriteTint": "#ffffff",
    "goldValue": 20
  },
  "Mandrake Root": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Mandrake Root",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/mandrake-root.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 10,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Houndstongue": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Houndstongue",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/sprig-of-houndstongue.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Nightshade": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Nightshade",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/nightshade.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Gandersguard Insignia": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Gandersguard Insignia",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/amulet-with-gems.png",
    "graphicSize": 30,
    "graphicChannels": {
      "gem": "#15511f"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "avatarSpriteChannels": {
      "gem": "#15511f"
    },
    "goldValue": 30,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Sticky Ichor": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Sticky Ichor",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/vial-of-blood.png",
    "graphicSize": 30,
    "graphicTint": "#22ff00",
    "graphicChannels": {
      "metal": "#ababab"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "maxStack": 20,
    "stackable": true
  },
  "Bronze Ingot": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Bronze Ingot",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/silver-ingot.png",
    "graphicSize": 30,
    "graphicTint": "#c06e1b",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 20,
    "soundEffect": "./assets/audio/slash.wav",
    "maxStack": 20,
    "stackable": true
  },
  "Silver Ingot": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Silver Ingot",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/silver-ingot.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 20,
    "soundEffect": "./assets/audio/slash.wav",
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Gold Ingot": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Gold Ingot",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/silver-ingot.png",
    "graphicSize": 30,
    "graphicTint": "#ebb400",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 30,
    "soundEffect": "./assets/audio/slash.wav",
    "maxStack": 20,
    "stackable": true
  },
  "Iron Ingot": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Iron Ingot",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/silver-ingot.png",
    "graphicSize": 30,
    "graphicTint": "#616161",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 40,
    "soundEffect": "./assets/audio/slash.wav",
    "maxStack": 20,
    "stackable": true
  },
  "Platinum Ingot": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Platinum Ingot",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/silver-ingot.png",
    "graphicSize": 30,
    "graphicTint": "#d9d9d9",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 50,
    "soundEffect": "./assets/audio/slash.wav",
    "maxStack": 20,
    "stackable": true
  },
  "Gladekeeper Brooch": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Gladekeeper Brooch",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/frond.png",
    "graphicSize": 30,
    "graphicTint": "#b4872d",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 16
  },
  "Forgotten Letter": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Forgotten Letter",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/bolt-of-cloth.png",
    "graphicSize": 30,
    "graphicTint": "#544740",
    "graphicChannels": {
      "metal": "#d1d1d1"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 0,
    "noDrop": true,
    "noSell": true
  },
  "Zombie Brains": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Zombie Brains",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/zombie-brains.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 10,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Tanned Leather": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Tanned Leather",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/tanned-leather.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 20,
    "maxStack": 20,
    "stackable": true,
    "graphicTint": ""
  },
  "Mystic White Leather": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Mystic White Leather",
    "rarity": "rare",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/tanned-leather.png",
    "graphicSize": 30,
    "graphicTint": "#ffffff",
    "glow": true,
    "glowColor": "#ffffff",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 60,
    "maxStack": 20,
    "stackable": true
  },
  "Healing Compound": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Healing Compound",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/powder.png",
    "graphicSize": 30,
    "graphicChannels": {
      "metal": "#a81a1a"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 20,
    "graphicTint": ""
  },
  "Strengthening Compound": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Strengthening Compound",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/powder.png",
    "graphicSize": 30,
    "graphicChannels": {
      "metal": "#64311b"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 20,
    "graphicTint": ""
  },
  "Soothing Compound": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Soothing Compound",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/powder.png",
    "graphicSize": 30,
    "graphicChannels": {
      "metal": "#028000"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 20,
    "graphicTint": ""
  },
  "Energizing Compound": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Energizing Compound",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/powder.png",
    "graphicSize": 30,
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 20,
    "graphicTint": ""
  },
  "Magic Resistant Compound": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Magic Resistant Compound",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/powder.png",
    "graphicSize": 30,
    "graphicChannels": {
      "metal": "#501c69"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 20,
    "graphicTint": ""
  },
  "Concentration Compound": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Concentration Compound",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/powder.png",
    "graphicSize": 30,
    "graphicChannels": {
      "metal": "#998c00"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 20,
    "graphicTint": ""
  },
  "Agility Compound": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Agility Compound",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/powder.png",
    "graphicSize": 30,
    "graphicChannels": {
      "metal": "#ce6a0d"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 20,
    "graphicTint": ""
  },
  "Relaxing Compound": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Relaxing Compound",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/items/powder.png",
    "graphicSize": 30,
    "graphicChannels": {
      "metal": "#374fc8"
    },
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "goldValue": 20,
    "graphicTint": ""
  },
  "Moss-Covered Rock": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Moss-Covered Rock",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/sprites/rock.png",
    "graphicSize": 30,
    "graphicTint": "#0a4700",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "noDrop": true,
    "noSell": true
  },
  "Moss-Covered Stone": {
    "stunEnabled": false,
    "stunChance": 0,
    "stunDuration": 2,
    "advanced": {},
    "name": "Moss-Covered Stone",
    "rarity": "common",
    "slot": "Material",
    "stats": {},
    "lore": "",
    "graphic": "./assets/sprites/rock.png",
    "graphicSize": 30,
    "graphicTint": "#0a4700",
    "maleAvatarSprite": "./assets/sprites/player-equipment/male/new-item.png",
    "femaleAvatarSprite": "./assets/sprites/player-equipment/female/new-item.png",
    "avatarSprite": "./assets/sprites/player-equipment/new-item.png",
    "noDrop": true,
    "noSell": true
  }
};

window.SoulreaperItems = {
  weaponTemplates,
  shopkeeperStartingInventory,
  shopkeeperStartingConsumables,
  shopkeeperStartingScrolls,
  itemTemplates
};
})();
