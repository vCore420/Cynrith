# Cynrith by vCore Roadmap
- Tasks get added when issues arrise or the project moves foward with the next steps/ideas.
- Tasks get ticked off when completed, working and pushed to github.
- Tasks get removed after 2 - 3 days after they are pushed to github.
- This will be intergrated into githubs issues and requests once the first beta is Released

## World Logic
- [x] Forced encounter for just dialouge with no npc, triggers once, used for story building and events
- [ ] Allow for multi location tiles for trigger tiles

## NPC Logic 
- [ ] Stop npc walking animation when being interacting with 
- [ ] Boss battles - that are required to be done to unlock the teleport stone

## Combat System
- [ ] Add/fix death fade out for sprites

## Quest Logic
- [ ] quest menu has some overflow on lists and scroll bar needs removing
- [x] Fix stat quests
- [x] Fix redoable quests not removing from active list after repeat completion
- [x] Add new quest type "interactTiles" for quests requiring specific interactable tiles to be triggered
- [x] Quest HUD shows correct icons and progress for interactTiles and statBuild quests
 
## Player Logic
- [ ] Joystick instead of touch buttons?
- [ ] Keyboard support - WASD for movement, left mouse for B button, right mouse for A button
- [ ] Add collision logic between Player and Npc
- [ ] Add more logic to player health, regen when below 50% up to 50%

## Inventory 
- [ ] Allow for pages in the invenotry grid so the player can have up to 4 pages of inventory (36 total items) which we will make expandable from in game
      
## Skills Menu
- [ ] Recycle my skill menu used for FiveM to suit the style of this game and expand/adapt the system to work with our tile game
- [ ] Allow for 3 skills to be used to add player buffs/debuffs

## Title Menu
- [ ] Add more logic for player name input to ensure name is at least 4 charaters long and give overwrite warner if name matches a save file
- [ ] Add loading screen on window load to hide title screen loading 
- [ ] Ensure player name input validates minimum length and warns if overwriting a save

## General Ui
- [ ] Stop text being allowed to be selected in player menus
- [x] Make all ui more structured and modular for multi device displays
- [ ] Red text for required xp notifications - teleport stone 
- [ ] Sort out css styling and clean it up
- [x] Make player stat icons

## New Game


## Save System
- [ ] Style load menu scroll bar
 
## Item System
- [x] Buyable items (shop/traders system?) 

## Settings Menu
- [ ] Design and create the settings menu
- [ ] Setting will include, touch controls toggle, sound toggle, log toggle

## Maps and Dialogue
- [x] Create at least 3 floors to start with before first beta release of the game
    - [x] Floor 1: "Tutorial" style floor where the story will start to unfold and the player will be guided into knowing how to play
    - [x] Floor 2: The first "true" floor, fully laid out with quests, enemy battles, boss fight, most things available to the player, but NPCs continue to guide the player
    - [x] Floors 3: Full set standard floor where the NPCs give quests and build story but stop trying to guide the player so much and focus more on story building and the real feel for what the game has to offer
- [ ] Add transition for teleporting between maps so we don't see the maps unload and load 
- [ ] Tile-activated teleports for caves, interiors
- [ ] Trigger tiles for tile frames for things like doors opening and closing as well as map warping triggers
- [ ] Mini map in the player menu, display the floor as a small picture with player location

## Sounds
- [x] Stop forgetting that sounds exist
- [x] Add sound functions to call when sounds need to be played
- [x] Create sound assets
- [x] Background music for each map
- [x] Ground Tile sounds for player movement
- [x] Player Combat sounds
- [x] Player Death sounds
- [x] Npc Combat sounds
- [x] Npc Dialogue interaction sounds
- [x] Enemy ambient Sounds
- [ ] Title Menu sounds
- [ ] Player Menu Sounds
- [x] Item Collection sounds
- [x] Item Usage sounds
- [x] Teleport Stone Interactions and ambient sounds
- [x] Interaction and Trigger Tile sound options
- [ ] World Sprite sound options

## Docs & Dev work
- [x] Expand supporting docs, breakdown function libary more, add contributor guide explaining how to create new floors, quests and expand the lore of cynrith
- [ ] Add unit test scripts 
- [ ] Optimize main game loop for mobile performance (reduce DOM updates, avoid resizing canvas every frame, batch sprite/frame updates)
- [x] Create templates for all Definitions
- [x] Create reusable content tracker for key NPCs, items, and lore objects
- [x] Create easy to follow plans for adding new floors (docs) to make tracking of new floor aspects easier 

---


## **New Since Last Commit*

- Added new assets for floor 4 
  - New floor map and tile assets
  - New enemy assets and definiens
  - New Items/loot for F4
  - Start Npc's and Trader
  - Started Quests and story hooks
  - Created finer details about F4 in World Building

- Performance improvements -
  - Created new Welcome screen to pre load the game assets 
  - Preload and cache all sfx sounds
  - Preload title map 
  - Forces user page interaction before loading sounds
  - Throttled combat sfx
  - Stopped sfx clashing with each other
  - Improved ambient enemy sound logic 

---
