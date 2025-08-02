# vTile Game Workflow

## NPC Logic

## Combat System
- [ ] Fix respawn of enemies, add IDs to enemies and make respawn at individual spawn points
- [ ] Increase cooldown for enemy respawns
- [ ] Add/fix death fade out for sprites

## Quest Logic
- [ ] Add enemy defeat quests

## Player Logic
- [ ] Joystick instead of touch buttons?
- [ ] Keyboard support - WASD for movement, left mouse for B button, right mouse for A button

## Skills Menu
- [ ] Recycle skill menu used for FiveM to suit the style of this game and expand/adapt the system to work with our tile game
- [ ] Allow for 3 skills to be used to add player buffs/debuffs

## Title Menu
- [x] Menu that loads before the game starts giving the user a new game and load game button
- [ ] New game changes menu to give the player options of the character they want to be and what their player's name is (which will also be the saveId)
- [ ] Load game changes menu to show list of game saves, selecting one will load the game 

## New Game
- [x] On load of a new game, play a full screen text sequence displaying background lore then fade in to the start of the game
- [x] On load, the player will be standing on their spawn tile; make all tiles around this one trigger the first NPC to give you a sword before you start 

## Save System
- [ ] Need to save all data of the game: player stats, inventory items, amounts, slots, player map and position, active and completed quests, skill inventory and skill sets
- [ ] Load system to reload all these attributes when a game save is loaded

## Item System
- [ ] Usable items, functionality for different item uses 
- [ ] Buyable items? (shop/traders system?) 
- [ ] Lootable nodes?

## Maps and Dialogue
- [ ] Create at least 5 floors to start with before first bete release of the game 
    - Floor 1: "Tutorial" style floor where the story will start to unfold and the player will be guided into knowing how to play
    - Floor 2: The first "true" floor, fully laid out with quests, enemy battles, boss fight, most things available to the player, but NPCs continue to guide the player
    - Floors 3-5: Full set standard floors where the NPCs give quests and build story but stop trying to guide the player so much and focus more on story building
- [ ] Add transition for teleporting between maps so we don't see the maps unload and load 
- [ ] Tile-activated teleports for caves, interiors
- [ ] Trigger tiles for tile frames for things like doors opening and closing 
- [ ] Add character name the top of the dialogue box

---

## **New Since Last Commit*
- 

---
