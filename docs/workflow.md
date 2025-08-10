# vTile Game Workflow
- Tasks get added when issues arrise or the project moves foward with the next steps/ideas.
- Tasks get ticked off when completed, working and pushed to github.
- Tasks get removed after 2 - 3 days after they are pushed to github.

## World Logic
- [ ] Forced encounter for just dialouge with no npc, triggers once, used for story building and events

## NPC Logic 
- [ ] Stop npc walking animation when being interacting with 

## Combat System
- [ ] Add/fix death fade out for sprites

## Quest Logic
- [x] Allow for other player stat incresses to be used as quest rewards (decided aginst doing this becuase we are going to have buff items and skills that will all buff stats)
- [ ] quest menu has some overlfow on lists and scroll bar needs removing

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

## General Ui
- [ ] Stop text being allowed to be selected in player menus
- [ ] Make all ui more structured and modular for multi device displays
- [ ] red text for required xp notifications - teleport stone 

## New Game


## Save System
- [x] Load system to reload all these attributes when a game save is loaded
- [ ] make system more modular to easily add more data in the future 
- [ ] Style load menu scroll bar
 
## Item System
- [x] Add logic to allow for a non-removable value on items
- [ ] Usable items, functionality for different item uses 
- [ ] Buyable items (shop/traders system?) 
- [x] Lootable tiles/ interactable tiles, ones to bring up dialouge /and give player item adn/or xp - then add to save and load, god forbid i have the same problem with the quest flags
- [ ] Add colisions to interatable tiles, trigger when on tile as well as ones around it

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
- [ ] Mini map in the player menu, display the floor as a small picture with player location
- [x] Create logic to dynamiclly import any sprite sheet of size to display in the world (houses and larger objects with more depth)

## Docs & Dev work
- [ ] Expand supporting docs, breakdown function libary more, add contributor guide explaining how to create new floors, quests and expand the lore of cynrith
- [ ] Add unit test scripts 

---


## **New Since Last Commit*

- Incorperated Sprite sheet loader into interactable tiles, can nowe load sprite sheets to interact with
- Completed floor 2, npcs, quests, interactable tiles, assest, design ect 
- Expanded useable items to allow for al player stat increases, will make this more modular at a later date to allow for other items to give the player how much they define 
- A bunch of new assests were added from sprites to tiles to inventory icons
- Fixed sprite loaded collisions not lining up correctly with different sized tiles

---
