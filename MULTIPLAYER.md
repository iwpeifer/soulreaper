# Soulreaper Multiplayer Prototype

This is the shared-world foundation. The server owns the accepted world-state revision and rejects stale client snapshots, which prevents older browser states from resurrecting enemies, drops, and projectiles. Combat math and enemy AI are now mostly server-side, with remaining character progression and quest validation still being hardened.

## Run Locally

From this folder:

```bash
node multiplayer-server.js
```

Then open:

```text
http://127.0.0.1:4173/
```

On the start screen, one player enters a world name and clicks `Start New World`.
Other players enter the same world name and click `Join World`.

## Current Scope

- Serves the existing Soulreaper files.
- Opens a WebSocket at `/soulreaper-ws`.
- Keeps named multiplayer worlds on the server.
- Gives each named world a shared map seed, so all players in that world generate the same map layout.
- Stores the authoritative shared-world snapshot with a server revision number.
- Accepts world-state proposals only when they are based on the current server revision.
- Gives shared enemies and ground drops stable IDs.
- Handles ground pickups as server actions: the server removes the drop once, then confirms the reward to the player who picked it up.
- Handles enemy HP/death/drop updates as targeted server actions against a specific enemy ID.
- Runs a server tick for enemy spawning, collision-aware idle wandering and movement, hostility checks, mob-vs-mob alignment targeting, enemy spells, attack timers, normal enemy weapon hits, and enemy projectile weapon attacks against players or other enemies.
- Sends enemy damage to the affected player from the server.
- Validates direct player weapon attacks on the server, including range, cooldown, damage roll, crit chance, realm modifier, and mitigation.
- Creates and advances player projectile weapon attacks on the server, applying damage when the server projectile hits.
- Creates and advances Magic Missile and Fireball spell projectiles on the server.
- Applies server-owned direct spell effects for Curse of Disdain, Tangle Vine, Pacify, Lifesteal, and Faerie Dust.
- Applies server-owned area spell effects for Ring of Fire, Fireblast, and Faerie Fire.
- Applies server-owned Thorn Shield retaliation when enemies land close-range attacks.
- Ticks enemy damage-over-time effects on the server when those effects are stored on shared enemies.
- Awards XP/Virtue and creates shared gold, heart, and item drops from server-validated player kills.
- Ages temporary shared drops on the server so dropped loot expires consistently.
- Schedules elite respawns on the server after elite units are killed.
- Preserves key multiplayer quest drops for Napaea's Skull and Sharlene's Parcel.
- Shares player name, avatar, position, HP, level, area, alignment, status buffs, active spell summaries, and speech text.
- Respawns defeated players in their starting house with full HP.
- Draws other connected players when they are in the same area.

## Later Steps

- Move remaining multiplayer player buff/aura stat math and quest-state validation fully into the server tick.
- Move map seed/world generation to the server.
- Add accounts and persistent character saves.
- Add party/chat systems and rules for interacting with other players.
