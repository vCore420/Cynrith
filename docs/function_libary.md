
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
- patchForcedEncounters() — Patches forced encounter flags for NPCs after loading a save.


## Data Definitions
- NPC_DEFINITIONS — Object mapping NPC IDs to their data (name, sprite, wander area, dialogue, quests, etc).
- ENEMY_TYPES — Object mapping enemy type IDs to their data (name, sprite, stats, wander area, etc).
- ITEM_DEFINITIONS — Object mapping item IDs to their data (name, description, image, stackable, useable, etc).
- FLOOR_NAMES - Holds all floor names to their matching map indexs (Used in the UI).
- WORLD_SPRITES — Array of world sprite definitions for modular animated objects (id, positions, spriteSheet, imageW, imageH, rows, cols, animSpeed, zIndex, collision).
- INTERACTABLE_TILES — Array of interactable tile definitions (id, map, x, y, image, notification, dialogue, rewards).
- INVENTORY_SIZE — Constant for inventory grid size.
- QUEST_DEFINITIONS — Object mapping quest IDs to their data.


## Control flags
- controlsEnabled — flag for enabling/disabling input (used by menu).
- actionButtonAPressed, actionButtonBPressed — flags for A/B button presses (used for interactions).
- playerAnimating — Flag for controlling player animation and viewport freeze during combat/knockback.
- deathScreenShown — Flag for showing/hiding the player death overlay.
- player.frozen — Flag for freezing player movement (used in dialogue, combat, etc.).


## Collision & Movement
- isTileBlockedAtPixel(px, py, direction) — Checks if a pixel position (with direction) is blocked by a collision tile, using a centered 64x64 collision box for 96x96 sprites.
- isNpcTileBlockedAtPixel(px, py, direction) — Checks collision for NPCs/enemies at a pixel position, using the same logic as the player.
- isTileBlockedByWorldSprite(tileX, tileY) — Checks if a tile is blocked by a world sprite with collision enabled.
- isPlayerAdjacentToTeleportStone() — Checks if the player is adjacent to any teleport stone.
- isPlayerAdjacentToTile(x, y) — Checks if the player is adjacent to a specific tile (used for teleport/interaction logic).


## Character System
- Player(tile_x, tile_y, spriteFile) — Player constructor.
- player.move(x, y) — Moves the player by x/y pixels, updates tile position.
- player.frame() — Advances player animation frame.
- Character(x, y, spriteSrc, type, customData) — Base class for NPCs and enemies, supports custom data and unique IDs.
- NPC(...), Enemy(...) — Friendly and hostile character constructors.
- respawnEnemy(enemyId, spawnIdx) — Respawns an enemy at its original spawn location after death.


## Spawning Helpers
- spawnNPC(npcId, x, y) — Spawns an NPC from NPC_DEFINITIONS at a location.
- spawnEnemy(typeId, x, y) — Spawns an enemy from ENEMY_TYPES at a location.
- spawnCharactersForMap(mapIndex) — Spawns all NPCs and enemies for a given map based on their definitions.
- spawnTeleportStonesForMap(mapIndex) — Spawns teleport stones at defined locations for the current map.
- drawTeleportStones() — Draws teleport stones.
- spawnWorldSpritesForMap(mapIndex) — Spawns world sprites for the current map based on their definitions.
- spawnTitleScreenNPCs(mapName) — Spawns NPCs for the title screen map.
- spawnTitleWorldSpritesForMap(mapName) — Spawns world sprites for the title screen map.


## Npc Logic
- updateCharacters() — Updates all NPCs and enemies (AI, movement).
- drawCharacters() — Draws all NPCs and enemies.
- wanderAI(char) — Handles wandering AI for NPCs/enemies (respects isInteracting flag).
- checkNpcInteraction() — Checks if player is in range of an interactive NPC, shows notification, starts dialogue, and handles NPC facing/stop movement during interaction.
- checkNpcInteraction() — Checks for NPC interactions and handles dialogue and facing logic.
- checkForcedEncounters() — Handles forced NPC encounters triggered by player position.


## Warping/Teleportation
- warpToMap(mapIndex, spawnType) — Warp player to a map and spawn NPCs/enemies.
- tryWarpToMap(targetMapIndex, spawnType, requiredXP) — Warp if player has enough XP.
- checkTeleport() — Handles teleport tile logic and notifications.
- checkBackTeleport() — Handles back-teleport tile logic and notifications.

## Interactable/Trigger Tiles
- spawnInteractableTilesForMap(mapIndex) — Spawns interactable tiles for the current map.
- drawInteractableTiles() — Draws interactable tiles.
- checkInteractableTileInteraction() — Checks for interactable tile interaction.
- spawnTriggerTilesForMap(mapIndex) — Spawns trigger tiles for the current map.
- checkTriggerTileActivation() — Checks for trigger tile activation.


## Combat System
- showDamagePopup(x, y, dmg, type) — Displays a damage popup above the target (enemy or player) with animated slide and fade.
- handleEnemyDeath(enemy) — Handles enemy defeat, fade-out animation, loot/XP drop, quest progress (for enemyDefeat quests), and respawn logic.
- handlePlayerDeath() — Triggers player death sequence, fade-out, and shows respawn menu.
- respawnPlayer() — Respawns the player at the map’s spawn position with half health and resets death screen.
- getDirectionToFace(npc, player) — Returns the direction key for an NPC/enemy to face the player.
- moveEnemyTowardPlayer(char) — Moves an enemy toward the player, sets facing direction, and triggers hostile state.
- drawDamagePopups() — Renders all active damage popups above characters.
- player.attackEnemy() — Handles player attack logic, enforces attack speed cooldown, and applies damage to enemies.
- player.quickAttackAnim() — Animates the player's attack lunge.
- player.knockbackAnim() — Animates the player being knocked back.
- moveEnemyTowardTile(char, tx, ty) — Moves an enemy toward a specific tile.
- findPathAStar(start, goal, isWalkable) — Finds a path using A* algorithm.


## Menu/UI
- openMenu(), closeMenu() — Show/hide the player menu, disables/enables controls, starts/stops stat refresh.
- showInventoryMenu() — Shows the inventory page in the player menu.
- showPlayerMenuMain() — Returns to the main player menu page.
- updatePlayerMenuSprite() — Draws the player sprite in the menu preview.
- updatePlayerMenuStats() — Displays player stats (health, XP, attack, defence) in the menu, updates regularly.
- charPreviewCanvas mouseenter/mouseleave — Handles sprite preview animation on hover in the character selection screen.
- hideGameUI() — Hides all game UI elements.
- showGameUI() — Shows all game UI elements.
- showDeathScreen() — Shows player death screen.


## Notification & Dialogue System
- notify(text, time) — Show a notification at the top of the screen for a set time.
- dialogue(...lines) — Shows a dialogue block at the bottom of the screen, disables player movement, advances on B/A button.
- showDialogueLine(idx) — Advances dialogue lines and updates footer hints based on quest/dialogue type.
- advanceDialogue() — Advances through dialogue box.
- closeDialogue() — Closes the dialogue box.


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
- playerQuests — Object holding active and completed quests.
- playerQuestProgress — Object holding quest progress.
- statBuildQuestStart — Object holding stat build quest start values.


## Title Screen Map System
- loadTitleMap() — Loads the title screen map.
- centerTitleViewport() — Centers the title screen viewport.
- startTitleScreenLoop() — Starts the animation loop for the title screen.
- drawTitleMap() — Draws the title screen map.
- drawTitleScreenNPCs() — Draws NPCs on the title screen map.
- drawTitleWorldSprites(zIndex) — Draws world sprites on the title screen map.
- unloadTitleMap() — Unloads the title screen map and cleans up.
- resizeTitleMapCanvasAndViewport() — Resizes the title map canvas and viewport.


## Trader Shop System
- openTraderShop(traderId) — Opens the trader shop menu.
- closeTraderShop() — Closes the trader shop menu.
- updateTraderShopUI() — Updates the trader shop UI.
- buyItem(itemId, price) — Buys an item from the trader.
- sellItem(itemId, price) — Sells an item to the trader.


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
- Sizing() — Updates window/canvas size and viewport dimensions.
- Log(type, text) — Log data to screen (e.g. FPS, coords).
- LoadURL(url, callback) — AJAX call for loading map and other data.
- clearAllMovementKeys() — Sets all movement key flags to false (used to stop player movement instantly).
- simulateKey(keyCode, isDown) — Simulates key events for touch controls.
- isPortraitZoomed() — Returns true if device is portrait and zoomed.
- getZoom() — Returns the current zoom factor.


## World Sprite System
- drawWorldSprites(zIndex) — Draws all active world sprites, optionally filtered by zIndex (layer).


---
