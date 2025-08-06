
## Player Stat Getters/Setters:
- getHealth(), setHealth(val), addHealth(val)
- getMaxHealth(), setMaxHealth(val), addMaxHealth(val)
- getXP(), addXP(val)
- getAttack(), setAttack(val), addAttack(val)
- getDefence(), setDefence(val), addDefence(val)
- getAttackSpeed(), setAttackSpeed(val), addAttackSpeed(val) — Gets/sets/adds to the player's attack speed stat (raw value, e.g. 0–5000).
- getAttacksPerSecond() — Returns the player's actual attacks per second (1 + attackSpeed * 0.002, capped at 10).

## Save & Load System
- getCurrentSaveData() — Returns an object representing the current game state (player stats, inventory, map, quests, etc.) for saving.
- saveGame() — Saves the current game state to localStorage under the player's name.
- getAllSaves() — Returns an array of all saved games found in localStorage.
- applySaveData(data) — Applies loaded save data to the current game state (player, inventory, quests, etc.).
- loadGame(playerName, onLoaded) — Loads a saved game by player name, applies the data, and warps the player to the correct map and position.


## Data Definitions
- NPC_DEFINITIONS — Object mapping NPC IDs to their data (name, sprite, wander area, dialogue, quests, etc).
- ENEMY_TYPES — Object mapping enemy type IDs to their data (name, sprite, stats, wander area, etc).
- ITEM_DEFINITIONS — Object mapping item IDs to their data (name, description, image, stackable, useable, etc).
- FLOOR_NAMES - Holds all floor names to their matching map indexs (Used in the UI).

## Control flags
- controlsEnabled — flag for enabling/disabling input (used by menu).
- actionButtonAPressed, actionButtonBPressed — flags for A/B button presses (used for interactions).

## Collision & Movement
- isTileBlockedAtPixel(px, py, direction) — Checks if a pixel position (with direction) is blocked by a collision tile, using a centered 64x64 collision box for 96x96 sprites.
- isNpcTileBlockedAtPixel(px, py, direction) — Checks collision for NPCs/enemies at a pixel position, using the same logic as the player.

## Character System
- Character(x, y, spriteSrc, type, customData) — Base class for NPCs and enemies, supports custom data and unique IDs.
- NPC(...), Enemy(...) — Friendly and hostile character constructors.

## Spawning Helpers
- spawnNPC(npcId, x, y) — Spawns an NPC from NPC_DEFINITIONS at a location.
- spawnEnemy(typeId, x, y) — Spawns an enemy from ENEMY_TYPES at a location.
- spawnCharactersForMap(mapIndex) — Spawns all NPCs and enemies for a given map based on their definitions.

## Npc Logic
- updateCharacters() — Updates all NPCs and enemies (AI, movement).
- drawCharacters() — Draws all NPCs and enemies.
- wanderAI(char) — Handles wandering AI for NPCs/enemies (respects isInteracting flag).
- checkNpcInteraction() — Checks if player is in range of an interactive NPC, shows notification, starts dialogue, and handles NPC facing/stop movement during interaction.

## Warping/Teleportation
- warpToMap(mapIndex, spawnType) — Warp player to a map and spawn NPCs/enemies.
- tryWarpToMap(targetMapIndex, spawnType, requiredXP) — Warp if player has enough XP.
- checkTeleport() — Handles teleport tile logic and notifications.
- checkBackTeleport() — Handles back-teleport tile logic and notifications.

## Combat System
- showDamagePopup(x, y, dmg, type) — Displays a damage popup above the target (enemy or player) with animated slide and fade.
- handleEnemyDeath(enemy) — Handles enemy defeat, fade-out animation, loot/XP drop, quest progress (for enemyDefeat quests), and respawn logic.
- handlePlayerDeath() — Triggers player death sequence, fade-out, and shows respawn menu.
- respawnPlayer() — Respawns the player at the map’s spawn position with half health and resets death screen.
- getDirectionToFace(npc, player) — Returns the direction key for an NPC/enemy to face the player.
- moveEnemyTowardPlayer(char) — Moves an enemy toward the player, sets facing direction, and triggers hostile state.
- drawDamagePopups() — Renders all active damage popups above characters.
- attackEnemy() — Handles player attack logic, enforces attack speed cooldown, and applies damage to enemies.
- quickAttackAnim() — Animates the player's attack lunge.
- knockbackAnim() — Animates the player being knocked back.

## Menu/UI
- openMenu(), closeMenu() — Show/hide the player menu, disables/enables controls, starts/stops stat refresh.
- showInventoryMenu() — Shows the inventory page in the player menu.
- showPlayerMenuMain() — Returns to the main player menu page.
- updatePlayerMenuSprite() — Draws the player sprite in the menu preview.
- updatePlayerMenuStats() — Displays player stats (health, XP, attack, defence) in the menu, updates regularly.
- charPreviewCanvas mouseenter/mouseleave — Handles sprite preview animation on hover in the character selection screen.

## Notification & Dialogue System
- notify(text, time) — Show a notification at the top of the screen for a set time.
- dialogue(...lines) — Shows a dialogue block at the bottom of the screen, disables player movement, advances on B/A button.
- showDialogueLine(idx) — Advances dialogue lines and updates footer hints based on quest/dialogue type.

## Inventory System
- addItem(itemId, amount) — Add an item to the inventory (stacks if possible).
- removeItem(itemId, amount) — Remove an item from the inventory, shifts items to fill empty slots.
- hasItem(itemId, amount) — Returns true if player has at least `amount` of the item.
- updateInventoryUI() — Renders the inventory grid.
- showItemDropdown(index, slot, def) — Shows dropdown menu for inventory item actions.
- showRemoveAmountPrompt(slot, def) — Shows prompt to remove a specific amount of an item.
- getItemCount(itemId) — Returns the count of a specific item in the player's inventory (used for itemCollect quests).

## Quest System
- showQuestsMenu() — Opens the quest menu with tabs for active/completed quests.
- startQuest(questId) — Adds a quest to the player's active quests (except for gift quests).
- completeQuest(questId) — Moves a quest from active to completed and updates quest state.
- tryCompleteQuest(questId) — Checks quest requirements and, if met, completes the quest and gives rewards.
- giveQuestRewards(rewards) — Gives items and XP to the player based on the quest's rewards array.
- updateQuestsUI(tab) — Updates the quest menu UI for active/completed quests.
- updateQuestHUD() — Updates the on-screen quest HUD to show current active quests and their progress.
- getItemCount(itemId) — Returns the number of a specific item in the player's inventory.

## Screen Effects
- updateScreenFadeOverlay() — Animates and updates the screen fade overlay for cutscenes/dialogue.
- drawScreenFadeOverlay() — Draws the current screen fade overlay.

## Lore Intro
- playLoreIntro() — Plays the lore intro text sequence on new game.
- endLoreAndStartGame() — Skips the lore intro and starts the game.
- showSkipBtn() — Shows the skip button for the lore intro after first tap/click.

## Character Selection
- showCharacterSelect() — Displays the character selection screen, populates the character list, and sets up the preview and name input.
- selectCharacter(idx) — Highlights the selected character and updates the preview sprite.
- drawPreviewSprite(idx, frame) — Draws a specific animation frame from the selected character's sprite sheet onto the preview canvas.


## Utility
- Log(type, text) — Log data to screen (e.g. FPS, coords).
- LoadURL(url, callback) — AJAX call for loading map and other data.
- clearAllMovementKeys() — Sets all movement key flags to false (used to stop player movement instantly).

---
