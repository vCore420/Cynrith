## Combat System

- showDamagePopup(x, y, dmg, type) — Displays a damage popup above the target (enemy or player) with animated slide and fade.
- handleEnemyDeath(enemy) — Handles enemy defeat, fade-out animation, loot/XP drop, and respawn logic.
- handlePlayerDeath() — Triggers player death sequence, fade-out, and shows respawn menu.
- respawnPlayer() — Respawns the player at the map’s spawn position with half health and resets death screen.
- getDirectionToFace(npc, player) — Returns the direction key for an NPC/enemy to face the player.
- moveEnemyTowardPlayer(char) — Moves an enemy toward the player, sets facing direction, and triggers hostile state.
- drawDamagePopups() — Renders all active damage popups above characters.
- drawCharacters() — Draws all NPCs and enemies, including health bars, names, and animation frames.


## Stat Getters/Setters:
- getHealth(), setHealth(val), addHealth(val)
- getMaxHealth(), setMaxHealth(val), addMaxHealth(val)
- getXP(), addXP(val)
- getAttack(), setAttack(val), addAttack(val)
- getDefence(), setDefence(val), addDefence(val)

## Flags
- controlsEnabled — flag for enabling/disabling input (used by menu).
- actionButtonAPressed, actionButtonBPressed — flags for A/B button presses (used for interactions).

## Character System
- Character(x, y, spriteSrc, type, customData) — Base class for NPCs and enemies, supports custom data and unique IDs.
- NPC(...), Enemy(...) — Friendly and hostile character constructors.

## Spawning Helpers
- spawnNPC(npcId, x, y) — Spawns an NPC from NPC_DEFINITIONS at a location.
- spawnEnemy(typeId, x, y) — Spawns an enemy from ENEMY_TYPES at a location.
- spawnCharactersForMap(mapIndex) — Spawns all NPCs and enemies for a given map based on their definitions.

## Data Definitions
- NPC_DEFINITIONS — Object mapping NPC IDs to their data (name, sprite, wander area, dialogue, quests, etc).
- ENEMY_TYPES — Object mapping enemy type IDs to their data (name, sprite, stats, wander area, etc).
- ITEM_DEFINITIONS — Object mapping item IDs to their data (name, description, image, stackable, useable, etc).

## Warping/Teleportation
- warpToMap(mapIndex, spawnType) — Warp player to a map and spawn NPCs/enemies.
- tryWarpToMap(targetMapIndex, spawnType, requiredXP) — Warp if player has enough XP.
- checkTeleport() — Handles teleport tile logic and notifications.
- checkBackTeleport() — Handles back-teleport tile logic and notifications.

## Notification & Dialogue System
- notify(text, time) — Show a notification at the top of the screen for a set time.
- dialogue(...lines) — Show a dialogue block at the bottom of the screen, disables player movement, advances on click.
- showDialogueLine(idx) — Internal: advances dialogue lines.

## NPC Interaction
- checkNpcInteraction() — Checks if player is in range of an interactive NPC, shows notification, starts dialogue, and handles NPC facing/stop movement during interaction.
- getDirectionToFace(npc, player) — Helper: returns direction key for NPC to face the player.

## Inventory System
- addItem(itemId, amount) — Add an item to the inventory (stacks if possible).
- removeItem(itemId, amount) — Remove an item from the inventory, shifts items to fill empty slots.
- hasItem(itemId, amount) — Returns true if player has at least `amount` of the item.
- updateInventoryUI() — Renders the inventory grid.
- showItemDropdown(index, slot, def) — Shows dropdown menu for inventory item actions.
- showRemoveAmountPrompt(slot, def) — Shows prompt to remove a specific amount of an item.

## Player Menu Navigation
- openMenu(), closeMenu() — Show/hide the player menu, disables/enables controls, starts/stops stat refresh.
- showInventoryMenu() — Shows the inventory page in the player menu.
- showPlayerMenuMain() — Returns to the main player menu page.
- updatePlayerMenuSprite() — Draws the player sprite in the menu preview.
- updatePlayerMenuStats() — Displays player stats (health, XP, attack, defence) in the menu, updates regularly.

## Drawing & Updating
- updateCharacters() — Updates all NPCs and enemies (AI, movement).
- drawCharacters() — Draws all NPCs and enemies.
- wanderAI(char) — Handles wandering AI for NPCs/enemies (respects isInteracting flag).

## Utility
- Log(type, text) — Log data to screen (e.g. FPS, coords).
- LoadURL(url, callback) — AJAX call for loading map and other data.

## Quest System
- startQuest(questId) — Adds a quest to the player's active quests (except for gift quests).
- completeQuest(questId) — Moves a quest from active to completed and updates quest state.
- tryCompleteQuest(questId) — Checks quest requirements and, if met, completes the quest and gives rewards.
- giveQuestRewards(rewards) — Gives items and XP to the player based on the quest's rewards array.
- updateQuestsUI(tab) — Updates the quest menu UI for active/completed quests.

## Dialogue & Quest Integration
- dialogue(...lines) — Shows a dialogue block at the bottom of the screen, disables player movement, advances on B/A button.
- showDialogueLine(idx) — Advances dialogue lines and updates footer hints based on quest/dialogue type.

## Inventory & XP Helpers (for quests)
- hasItem(itemId, amount) — Returns true if player has at least `amount` of the item (used for itemCollect quests).
- addItem(itemId, amount) — Adds an item to the inventory (used for quest rewards).
- removeItem(itemId, amount) — Removes an item from the inventory (used for quest completion).
- player.addXP(amount) — Adds XP to the player (used for quest rewards).

## NPC Quest Data
- NPC_DEFINITIONS — NPCs can have questId, quest type, dialogue for quest start/incomplete/complete, and questRedo flag.

## Quest Menu Navigation
- showQuestsMenu() — Opens the quest menu with tabs for active/completed quests.
- updateQuestsUI(tab) — Renders the quest list and updates on quest changes.

---