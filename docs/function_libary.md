
## Player Stat Getters/Setters
- getHealth(), setHealth(val), addHealth(val)
- getMaxHealth(), setMaxHealth(val), addMaxHealth(val)
- getXP(), addXP(val)
- getAttack(), setAttack(val), addAttack(val)
- getDefence(), setDefence(val), addDefence(val)
- getAttackSpeed(), setAttackSpeed(val), addAttackSpeed(val)
- getAttacksPerSecond() — Returns the player's actual attacks per second.
- getTotalXpGainModifier() — Returns the player’s total XP gain modifier from equipped skills or future systems.
- getEquippedWeaponDef() — Returns the definition for the currently equipped weapon, if valid.
- ensureValidEquippedWeapon() — Ensures the player still has a valid equipped weapon and falls back to the first available one if needed.


## Save & Load System
- getCurrentSaveData() — Returns an object representing the current game state for saving.
- saveGame() — Saves the current game state to localStorage under the player’s name.
- getAllSaves() — Returns an array of all saved games found in localStorage.
- applySaveData(data) — Applies loaded save data to the current game state.
- loadGame(playerName, onLoaded) — Loads a saved game by player name and warps the player to the correct map and position.
- patchForcedEncounters() — Patches forced encounter flags for NPCs after loading a save.
- sanitizeSaveFileName(name) — Cleans a save name for export-safe filenames.
- buildSaveExportPayload(save) — Wraps a save in the project’s export format.
- downloadJsonFile(data, fileName) — Downloads save/export data as JSON.
- normalizeImportedSave(raw) — Normalizes imported save data into the current expected format.
- importSaveFromFile(file) — Imports a save from a JSON file and writes it to localStorage.
- showLoadGameMenu() — Builds and opens the load/save management UI.
- fadeOutTitleAndLoadGame(playerName) — Handles title fade-out and load transition.
- showLoadingScreen(onLoaded), hideLoadingScreen() — Controls the loading screen UI.


## Data Definitions
- NPC_DEFINITIONS — NPC data definitions.
- ENEMY_TYPES — Enemy data definitions.
- ITEM_DEFINITIONS — Item data definitions.
- QUEST_DEFINITIONS — Quest data definitions.
- INTERACTABLE_TILES — Interactable tile definitions.
- TRIGGER_TILES — Trigger tile definitions.
- WORLD_SPRITES — World sprite definitions.
- FLOOR_NAMES — Floor names mapped to map indices.
- NAMED_MAP_INFO — Named map metadata such as `castle0`.
- INVENTORY_SIZE — Inventory page size.
- INVENTORY_MAX_PAGES — Maximum number of unlockable inventory pages.


## Core Runtime / Progression Helpers
- Setup(playerName, mapIndex, spriteFile) — Initializes the main game state and starts the runtime.
- Loop() — Main game loop.
- Sizing() — Recalculates canvas sizing and viewport dimensions.
- Log(type, text) — Writes runtime data to the on-screen log.
- LoadURL(url, callback) — Loads map/data assets.
- getFloorNumberFromMap(mapIndex) — Resolves a floor number from a map index or named map.
- markFloorVisited(mapIndex) — Marks a floor as visited for return travel or progression logic.
- pressA(e), pressB(e) — Set action-button flags.


## Control Flags
- controlsEnabled — Global flag for enabling/disabling input.
- actionButtonAPressed, actionButtonBPressed — A/B button press flags.
- playerAnimating — Controls player animation lock and viewport freeze during combat/knockback.
- deathScreenShown — Controls death overlay state.
- player.frozen — Freezes player movement.
- homePlotTravelMenuOpen — Tracks whether the Home Plot travel selector is open.


## Collision & Movement
- isTileBlockedAtPixel(px, py, direction) — Checks player collision against tiles/world.
- isNpcTileBlockedAtPixel(px, py, direction, npcObj) — Checks NPC/enemy collision.
- isTileBlockedByWorldSprite(tileX, tileY) — Checks if a tile is blocked by a world sprite.
- isTileBlockedByInteractable(tileX, tileY) — Checks if a tile is blocked by an interactable tile.
- isTileBlockedByHomePlacement(tileX, tileY) — Checks if a tile is blocked by a Home Plot placement.
- isMapCollisionTile(tileX, tileY) — Checks whether a tile is inherently collidable in the map data.
- isPlayerAdjacentToTeleportStone() — Checks if the player is adjacent to a teleport stone.
- isPlayerAdjacentToTile(x, y) — Checks if the player is adjacent to a specific tile.
- isNpcPixelCollision(npc, px, py) — Checks pixel collision between the player and a specific NPC.
- isPlayerPixelCollision(npcPx, npcPy, npcObj) — Checks whether an NPC/enemy would collide with the player.
- isNpcCharacterCollisionAtPixel(px, py, npcObj) — Checks pixel collision between NPCs/enemies.
- isWalkable(tileX, tileY) — A reusable walkability test used by AI/pathfinding.
- worldTileFromClientPoint(clientX, clientY) — Converts pointer position to a world tile in Home Plot mode.


## Character System
- Player(tile_x, tile_y, spriteFile) — Player constructor.
- player.move(x, y) — Moves the player by x/y pixels and updates tile position.
- player.frame() — Advances player animation frame.
- player.attackEnemy() — Handles player combat attack logic.
- player.quickAttackAnim() — Attack-lunge animation.
- player.knockbackAnim() — Knockback animation.
- Character(x, y, spriteSrc, type, customData) — Base class for NPCs and enemies.
- NPC(...), Enemy(...) — Friendly and hostile character constructors.
- getCharDimensions(char) — Returns runtime dimensions for a character.
- getCharBounds(char, overridePx, overridePy) — Returns runtime bounds for collision checks.
- respawnEnemy(enemyId, spawnIdx) — Respawns an enemy at its original spawn location.


## Spawning Helpers
- spawnNPC(npcId, x, y) — Spawns an NPC from NPC_DEFINITIONS.
- spawnEnemy(typeId, x, y) — Spawns an enemy from ENEMY_TYPES.
- spawnCharactersForMap(mapIndex) — Spawns all NPCs and enemies for the current map.
- spawnTeleportStonesForMap(mapIndex) — Spawns teleport stones for the current map.
- drawTeleportStones() — Draws teleport stones.
- spawnWorldSpritesForMap(mapIndex) — Spawns world sprites for the current map.
- spawnInteractableTilesForMap(mapIndex) — Spawns interactable tiles for the current map.
- spawnTriggerTilesForMap(mapIndex) — Spawns trigger tiles for the current map.
- spawnHomePlacementsForMap(mapIndex) — Spawns Home Plot placements for the current map.
- spawnTitleScreenNPCs(mapName) — Spawns NPCs for the title screen map.
- spawnTitleWorldSpritesForMap(mapName) — Spawns world sprites for the title screen map.


## NPC Logic
- updateCharacters() — Updates all NPCs and enemies.
- drawCharacters() — Draws all NPCs and enemies.
- wanderAI(char) — Wander logic for NPCs/enemies.
- randomDirection() — Returns a random facing/movement direction.
- getDirectionKey(fromX, fromY, toX, toY) — Returns the basic direction key between two points.
- getDirectionKeyFromName(direction) — Converts direction name to direction key.
- getDirectionToFace(npc, player) — Returns the direction an NPC/enemy should face.
- tryMoveNpcStep(char, stepX, stepY, direction) — Attempts a single NPC movement step.
- moveEnemyTowardPlayer(char) — Moves an enemy toward the player.
- moveEnemyTowardTile(char, tx, ty) — Moves an enemy toward a specific tile.
- findPathAStar(start, goal, isWalkable) — Finds a path using A*.
- isAdjacentToPlayer(char) — Checks whether a character is adjacent to the player.
- hasPendingForcedEncounter(npc) — Checks whether an NPC still has an untriggered forced encounter.
- checkNpcInteraction() — Handles NPC interaction checks and dialogue start.
- checkForcedEncounters() — Handles forced NPC encounters triggered by player position.
- playEnemyAmbientSounds() — Plays ambient enemy sounds for nearby hostile units.


## Warping / Teleportation
- warpToMap(mapIndex, spawnType, targetPos, onWarped) — Warps the player to a map and respawns runtime content.
- checkTeleport() — Handles forward-teleport logic and notifications.
- checkBackTeleport() — Handles back-teleport logic and Home Plot travel interaction.
- isHomePlotMap() — Checks whether the current map is the Home Plot.
- getVisitedFloorsForTravel() — Returns discovered floors for travel UI.
- openHomePlotTravelMenu() — Opens the Home Plot floor selector.
- closeHomePlotTravelMenu() — Closes the Home Plot floor selector.


## Interactable / Trigger Tile System
- drawInteractableTiles(zIndex) — Draws interactable tiles, optionally filtered by zIndex.
- drawSingleInteractableTile(tile) — Draws one interactable tile.
- checkInteractableTileInteraction() — Handles interactable tile interaction, dialogue, rewards, and optional teleport.
- checkTriggerTileActivation() — Handles trigger tile activation and rewards.
- playInteractionTileSounds() — Drives looped and ambient interaction sounds for active tiles.
- playTriggerTileSound(tile) — Plays trigger SFX when a tile is activated.


## Combat System
- showDamagePopup(x, y, dmg, type) — Displays a damage popup.
- drawDamagePopups() — Draws all active damage popups.
- drawPlayerHealthHUD() — Draws the player health HUD.
- handleEnemyDeath(enemy) — Handles enemy defeat, drops, respawn logic, and quest progress.
- handlePlayerDeath() — Triggers player death sequence.
- showDeathScreen() — Shows the death screen overlay.
- respawnPlayer() — Respawns the player and restores partial health.


## Sound System
- SoundManager.playBgMusic(src, loop) — Starts background music.
- SoundManager.stopBgMusic() — Stops background music.
- SoundManager.setBgMusicVolume(vol) — Sets background music volume.
- SoundManager.fadeBgMusicVolume(targetVol, duration) — Fades background music over time.
- SoundManager.playEffect(src) — Plays a one-shot sound effect.
- SoundManager.setEffectVolume(vol) — Sets effect volume.
- SoundManager.muteAll(mute) — Mutes/unmutes all managed sound.
- playFootstepSoundForCurrentTile() — Plays floor-specific footstep SFX based on tile data.


## Menu / UI
- openMenu(), closeMenu() — Opens/closes the player menu.
- updatePlayerMenuSprite() — Draws the player preview sprite in the menu.
- updatePlayerMenuStats() — Updates the compact player stat UI.
- showPlayerMenuMain() — Returns to the main player menu page.
- showInventoryMenu() — Opens the inventory page.
- showStatsMenu() — Opens the full stats page.
- renderFullStatsPage() — Renders the extended stats page.
- showQuestsMenu() — Opens the quests page.
- showSettingsMenu() — Opens the settings page.
- patchSettingsFromSave(data) — Applies saved settings to runtime/UI.
- showMapMenu() — Opens the map preview page.
- drawMapPreview() — Draws the current map preview, including NPC/enemy/player markers.
- showSkillsMenu() — Opens the skills page.
- showSkillsGachaScreen(), hideSkillsGachaScreen() — Toggles the skill gacha screen.
- renderSkillsMenu() — Renders equipped and owned skills.
- showSkillDropdown(skillId, anchorEl) — Opens the skill action/details dropdown.
- hideGameUI(), showGameUI() — Hides/shows game HUD and controls.


## Skill / Stat Extension Helpers
- ensureExtendedPlayerStats() — Ensures newer secondary stats exist on the player.
- ensurePlayerBaseStats() — Ensures the cached base-stat structure exists.
- updatePlayerBaseStats() — Updates cached base stats after stat changes.
- getEquippedSkillResistanceTotal() — Returns resistance granted by equipped skills.
- getEquippedSkillStatDelta(stat) — Returns the total delta a skill loadout applies to a stat.
- applySkillEffect(skillId, direction) — Applies or removes a skill’s stat effects.
- getTotalResistance() — Returns total current skill resistance.
- updateRegenEffect() — Applies/removes passive regen or degeneration from equipped skills.
- equipSkill(skillId), unequipSkill(slotIndex) — Equip/unequip a skill.
- getUpgradeCost(pool, level, rarity) — Returns gem cost and type for a skill upgrade.
- isMaxLevel(level, maxLevel) — Checks if a skill is maxed out.
- upgradeSkill(skillId) — Upgrades a skill if resources allow.
- getSkillDef(id) — Returns a skill definition.
- getPlayerSkill(id) — Returns the player’s owned skill entry.
- addOrUpgradeSkill(skillId) — Adds a new skill or upgrades it if already owned.
- spendGem(gemId) — Consumes a gem for gacha/upgrade use.
- weightedRandomSkill(pool) — Picks a skill from a weighted pool.
- spinGachaReel(pool, callback) — Runs the gacha reel animation.
- disableGachaButtons(), enableGachaButtons() — Protects the gacha UI during spin animations.


## Notification & Dialogue System
- notify(text, time) — Show a notification at the top of the screen for a set time.
- dialogue(...lines) — Shows a dialogue block at the bottom of the screen, disables player movement, advances on B/A button.
- showDialogueLine(idx) — Advances dialogue lines and updates footer hints based on quest/dialogue type.
- advanceDialogue() — Advances through dialogue box.
- closeDialogue() — Closes the dialogue box.


## Inventory System
- addItem(itemId, amount) — Adds an item to inventory or routes Home Plot items to Home storage.
- removeItem(itemId, amount) — Removes an item from inventory or Home storage.
- hasItem(itemId, amount) — Checks whether the player has a given item.
- getItemCount(itemId) — Returns the total count of an item.
- updateInventoryUI() — Renders the inventory grid.
- showItemDropdown(index, slot, def, event) — Opens the inventory item dropdown.
- unlockInventoryPage() — Unlocks another inventory page.
- useItem(itemId, amount) — Applies item effects and consumes the item if appropriate.
- ITEM_EFFECTS — Object mapping item IDs to effect functions.


## Quest System
- showQuestsMenu() — Opens the quest menu.
- startQuest(questId) — Starts a quest.
- tryCompleteQuest(questId) — Attempts to complete a quest if conditions are met.
- completeQuest(questId) — Marks a quest completed.
- giveQuestRewards(rewards) — Gives quest rewards.
- isQuestCompleted(questId) — Checks if a quest has been completed.
- isQuestReadyToComplete(questId) — Checks if a quest can currently be turned in.
- npcHasReadyQuest(npc) — Checks whether an NPC has a quest ready for turn-in.
- updateQuestsUI(tab) — Updates the quest menu UI.
- updateQuestHUD() — Updates the on-screen quest HUD.
- playerQuests — Object holding active and completed quests.
- playerQuestProgress — Object holding per-quest progress.
- statBuildQuestStart — Object holding baseline values for stat-build quests.


## Home Plot System
- isHomePlotBaseMap(mapIndex) — Checks if a map is the main Home Plot map.
- isHomeInteriorMap(mapIndex) — Checks if a map is a generated Home interior instance.
- isHomeBuildRealm(mapIndex) — Checks whether Home Plot placement/build logic should be active.
- getCurrentHomeMapKey() — Returns the current Home Plot map key.
- ensureHomePlotSchema() — Ensures `window.homePlot` has the current expected structure.
- getHomePlaceableDefs() — Returns all placeable Home Plot item definitions.
- getHomeItemDef(itemId) — Returns a Home Plot item definition.
- getHomeItemCount(itemId) — Returns the count of a Home Plot item in Home storage.
- addHomePlotItem(itemId, amount) — Adds an item to Home storage.
- removeHomePlotItem(itemId, amount) — Removes an item from Home storage.
- buildHomePlacement(itemId, x, y) — Builds a placement record for a Home Plot item.
- getHomeFootprintTiles(itemDef, x, y) — Returns all tiles occupied by a placement.
- canPlaceHomeItem(itemId, x, y) — Checks whether an item can be placed at a location.
- createHouseInteriorInstance(placement) — Creates an interior-instance map for a placed house.
- reclaimInteriorItemsForHousePlacement(placement) — Reclaims items from an interior before removing its parent house.
- placeHomeItemAt(itemId, x, y) — Places a Home Plot item into the world.
- getPlacementAtTile(x, y) — Returns the placement at a tile, if any.
- removePlacedHomeItemAt(x, y) — Removes a placed Home Plot item.
- drawSingleHomePlacement(p) — Draws a single Home placement.
- drawHomePlotItems(zIndex) — Draws Home Plot placements by layer.
- drawHomePlotPreview() — Draws the Home Plot placement preview.
- handleHomePlacementPointer(clientX, clientY, isTouchTap) — Handles pointer/touch placement input.
- bindHomePlotPointerHandlers() — Binds Home Plot placement pointer handlers.
- ensureHomePlotMenuDom() — Builds the Home Plot customizer DOM if missing.
- renderHomePlotMenuItems() — Renders the Home Plot item list.
- openHomePlotCustomizer() — Opens the Home Plot customizer.
- closeHomePlotCustomizer() — Closes the Home Plot customizer.
- toggleHomePlotCustomizer() — Toggles the Home Plot customizer.
- getHouseDoorTiles(placement) — Returns door tiles for a placed house.
- checkHomePlotHouseInteractions() — Checks for house-door interaction.
- resolveHomeMapKeyForLoad(mapKey) — Resolves dynamic Home interior map keys when loading.
- exportHomePlotState() — Exports Home Plot data for save serialization.
- importHomePlotState(data) — Imports Home Plot data from a save.
- ensureHomePlotHudButton() — Ensures the Home Plot HUD button exists.
- updateHomePlotHudButtonVisibility() — Updates the HUD button visibility for Home Plot mode.


## Title Screen / Intro System
- formatPlayTime(seconds) — Formats playtime for save/load UI.
- loadTitleMap() — Loads the title screen map.
- centerTitleViewport() — Centers the title screen viewport.
- startTitleScreenLoop() — Starts the title map animation loop.
- drawTitleMap() — Draws the title map.
- updateTitleScreenNPCs() — Updates title screen NPC movement.
- drawTitleScreenNPCs() — Draws title screen NPCs.
- drawTitleWorldSprites(zIndex) — Draws title-screen world sprites.
- unloadTitleMap() — Unloads the title map.
- resizeTitleMapCanvasAndViewport() — Resizes title map canvas and viewport.
- getTitleZoom() — Returns title map zoom level.


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
- clearAllMovementKeys() — Clears all movement key states.
- simulateKey(keyCode, isDown) — Simulates movement/action keys.
- canUseActionButtons() — Checks whether action buttons are currently allowed.
- updatePlayerMovementDirection() — Updates player movement direction state.
- setPlayerJoystickMovement(dx, dy) — Applies joystick movement.
- resetJoystick() — Resets joystick state.
- handleJoystickMove(clientX, clientY) — Updates joystick movement from pointer input.
- isPortraitZoomed() — Returns true if device is portrait and zoomed.
- getZoom() — Returns current zoom factor.


## World Sprite System
- drawWorldSprites(zIndex) — Draws all active world sprites, optionally filtered by zIndex (layer).


## Reusable / Broader-Than-Intended Uses

- warpToMap(...) — Not just for teleport stones. Can be used for special items, cutscenes, dream sequences, Home Plot returns, boss-room sends, or one-off story events.
- dialogue(...lines) — Not just for NPCs. Useful for environmental text, echo events, item memories, floor-entry flavor, and hidden lore discoveries.
- notify(text, time) — Can be used as a lightweight feedback layer for systems that do not need a full UI panel.
- addItem(itemId, amount) — Because it routes `homePlaceable` items to Home storage, it can be used as a generic reward function for both normal loot and housing/decor systems.
- updateQuestHUD() — Useful as a general “refresh player-facing progression state” call after systems beyond quests, such as Home Plot rewards or item use.
- npcHasReadyQuest(npc) — Useful outside direct NPC interaction, such as map previews, marker systems, or future quest-highlighting logic.
- isWalkable(tileX, tileY) / findPathAStar(...) — Can be reused for escort logic, scripted NPC movement, puzzle entities, or non-enemy moving hazards.
- SoundManager.fadeBgMusicVolume(...) — Useful for scene transitions, interludes, forced encounters, dreamlike moments, or floor-entry pacing shifts.
- playInteractionTileSounds() — Can support ambient “sound zones” and nearby environmental storytelling, not just obvious interactables.
- markFloorVisited(mapIndex) / getVisitedFloorsForTravel() — Useful for revisit systems, descent systems, trader unlock logic, or future floor-based achievements.
- buildSaveExportPayload(...) / normalizeImportedSave(...) — Useful for any future backup, migration, or version-patching tools.
- drawMapPreview() — Already works as more than a static map; it can support quest markers, trader markers, danger markers, and route planning.
- applySkillEffect(...) — Can be repurposed for temporary blessings, curses, floor modifiers, or boss-debuff systems if those follow the same stat model.
- useItem(itemId, amount) — Useful for special utility items that trigger world behavior, not just consumables, as shown by `key_without_a_door`.

---
