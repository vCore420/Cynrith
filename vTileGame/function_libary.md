## Stat Getters/Setters:
- getHealth(), setHealth(val), addHealth(val)
- getMaxHealth(), setMaxHealth(val), addMaxHealth(val)
- getXP(), addXP(val)
- getAttack(), setAttack(val), addAttack(val)
- getDefence(), setDefence(val), addDefence(val)

## flag for enabling/disabling input (used by menu).
- controlsEnabled 

## Character System
- Base class for NPCs and enemies, supports custom data and unique IDs.
Character(x, y, spriteSrc, type, customData)
- Friendly and hostile character constructors.
NPC(...), Enemy(...)

## Spawning Helpers
- Spawns an NPC from NPC_DEFINITIONS at a location.
spawnNPC(npcId, x, y)
- Spawns an enemy from ENEMY_TYPES at a location
spawnEnemy(typeId, x, y)


##  Data Definitions
- NPC_DEFINITIONS
Object mapping NPC IDs to their data (name, sprite, wander area, dialogue, quests, etc).
- ENEMY_TYPES
Object mapping enemy type IDs to their data (name, sprite, stats, wander area, etc).

- Warping/Teleportation
warpToMap(mapIndex, spawnType)

## Flags for A/B button presses (used for interactions).
- actionButtonAPressed, actionButtonBPressed

## Player Menu
- Show/hide the player menu, disable/enable controls, start/stop stat refresh.
openMenu(), closeMenu()
- Draws the player sprite in the menu preview.
updatePlayerMenuSprite()
- Displays player stats (health, XP, attack, defence) in the menu, updates regularly.
updatePlayerMenuStats()


