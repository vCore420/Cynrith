# vTile Game Workflow
- Tasks get added when issues arrise or the project moves foward with the next steps/ideas.
- Tasks get ticked off when completed, working and pushed to github.
- Tasks get removed after 2 - 3 days after they are pushed to github.

## NPC Logic
- [ ] Fix npc getting stuck on spawn - believe its because thir spawns are too close to a collision

## Combat System
- [ ] Fix respawn of enemies, add IDs to enemies and make respawn at individual spawn points
- [ ] Increase cooldown for enemy respawns
- [ ] Add/fix death fade out for sprites
- [x] Add new player stat for attack speed

## Quest Logic
- [ ] Add enemy defeat quests, required stat amount quests,
- [ ] Allow for other player stat incresses to be used as quest rewards

## Player Logic
- [ ] Joystick instead of touch buttons?
- [ ] Keyboard support - WASD for movement, left mouse for B button, right mouse for A button
- [ ] Add collision logic between Player and Npc
- [x] Fix collision issue with sprites and collision tiles not lining up right

## Inventory 
- [x] Design dropdown menu for items, display item name, rarity and description, use and remove buttons
- [ ] Allow for pages in the invenotry grid so the player can have up to 4 pages of inventory (36 total items) which we will make expandable from in game
      
## Skills Menu
- [ ] Recycle my skill menu used for FiveM to suit the style of this game and expand/adapt the system to work with our tile game
- [ ] Allow for 3 skills to be used to add player buffs/debuffs

## Title Menu
- [x] Menu that loads before the game starts giving the user a new game and load game button
- [x] Use concetpt art with small effects for background of title screen
- [x] Design main Title
- [x] New game changes menu to give the player options of the character they want to be and what their player's name is (which will also be the saveId)
- [ ] Load game changes menu to show list of game saves, selecting one will load the game 
- [ ] Add more logic for player name input to ensure name is at least 4 charaters long and no larger 16 charaters

## New Game
- [x] On load of a new game, play a full screen text sequence displaying background lore then fade in to the start of the game
- [x] On load, the player will be standing on their spawn tile; make all tiles around this one trigger the first NPC to give you a sword before you start 

## Save System
- [x] Need to save all data of the game: player stats, inventory items, amounts, slots, player map and position, active and completed quests, skill inventory and skill sets
- [x] Load system to reload all these attributes when a game save is loaded

## Item System
- [ ] Add logic to allow for a non-removable value on items
- [ ] Usable items, functionality for different item uses 
- [ ] Buyable items? (shop/traders system?) 
- [ ] Lootable tiles?

## Settings Menu
- [ ] Desgin and create the settings menu 
- [ ] Setting will include, touch controls toggle, sound toggle (sounds to come), log toggle 

## Maps and Dialogue
- [ ] Create at least 5 floors to start with before first bete release of the game 
    - Floor 1: "Tutorial" style floor where the story will start to unfold and the player will be guided into knowing how to play
    - Floor 2: The first "true" floor, fully laid out with quests, enemy battles, boss fight, most things available to the player, but NPCs continue to guide the player
    - Floors 3-5: Full set standard floors where the NPCs give quests and build story but stop trying to guide the player so much and focus more on story building
- [ ] Add transition for teleporting between maps so we don't see the maps unload and load 
- [ ] Tile-activated teleports for caves, interiors
- [ ] Trigger tiles for tile frames for things like doors opening and closing 
- [x] Add character name the top of the dialogue box

---

## **New Since Last Commit*

- Created save and load system 

---
