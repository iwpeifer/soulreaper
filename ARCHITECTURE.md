# Soulreaper Organization Notes

## Current Shape

- `index.html` wires the game UI and loads data files before `game.js`.
- `game.js` is still the main runtime. It currently contains rendering, map generation, combat, UI behavior, multiplayer client logic, and non-extracted game data.
- `data/items.js` contains weapon templates, item templates, and the base shop stock.
- `data/item-art.js` contains item icon lookup, tint, and fallback graphic data extracted from `game.js`.
- `data/monsters.js` contains monster templates and monster loot tables.
- `data/world.js` contains area spawn tables, area config, spell override config, quest config, and NPC config.
- `data/spells.js` contains spell templates, spell behavior functions, and spell icon lookup data.
- `npc-interactions.js` contains NPC config lookup/application, NPC shop setup, alignment-gated interaction checks, and named NPC contact helpers.
- `map-generation.js` contains world/area construction, house/building factories, map NPC placement, map geometry helpers, collision helpers, and line-of-sight helpers.
- `spell-runtime.js` contains spell formula math, spell description, spell text interpolation, and spell icon rendering helpers.
- `inventory-ui.js` contains equipment actions, inventory action popups, shop rendering, shop buying/selling, and shop window open/close helpers.
- `spell-ui.js` contains Soulreaper trainer windows, Spellbook windows, Realm progress windows, and active spell replacement helpers.
- `quest-ui.js` contains Quest Log rendering, quest completion/rewards, quest factories, and NPC dialogue starters.
- `.backup-archive/game-js/` contains old `game.js` backup and rollback files. It is hidden so normal searches stay focused on live code.
- `dev-interface/` contains the local content editor.
- `multiplayer-server.js` contains the shared-world server.

## Extraction Pattern

Data modules should attach one namespace to `window` and be loaded before `game.js`.

Example:

```html
<script src="./data/items.js"></script>
<script src="./data/item-art.js"></script>
<script src="./data/monsters.js"></script>
<script src="./data/world.js"></script>
<script src="./data/spells.js"></script>
<script src="./npc-interactions.js"></script>
<script src="./map-generation.js"></script>
<script src="./spell-runtime.js"></script>
<script src="./inventory-ui.js"></script>
<script src="./spell-ui.js"></script>
<script src="./quest-ui.js"></script>
<script src="./game.js"></script>
```

Then `game.js` reads it with a safe fallback:

```js
const itemGraphics = window.SoulreaperItemArt?.graphics || {};
```

## Good Next Targets

1. Spell casting helper functions and effect rendering
2. Combat and enemy AI helpers
3. Drawing helpers and effect rendering

Keep each extraction small and verify after each one.
