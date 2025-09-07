# Cynrith by vCore Roadmap
- Tasks get added when issues arrise or the project moves foward with the next steps/ideas.
- Tasks get ticked off when completed, working and pushed to github.
- Tasks get removed after 2 - 3 days after they are pushed to github.
- This will be intergrated into githubs issues and requests once the first beta is Released

## World Logic
- [ ] Allow for multi location tiles for trigger tiles

## NPC Logic 
- [ ] Stop npc walking animation when being interacting with 
- [ ] Boss battles - that are required to be done to unlock the teleport stone

## Combat System
- [ ] Add/fix death fade out for player and enemies

## Quest Logic
- [x] Add a '!' above npcs whos quests are ready to be completed
 
## Player Logic
- [x] Joystick instead of D Pad For smoother movement on touch devices
- [x] Keyboard support - WASD for movement, enter key for interaction, space bar for combat
- [x] Add collision logic between Player and Npc
- [ ] Change initial player weapon system to use different weapons for different player character choice

## Inventory


## Skills Menu
- [X] Recycle my skill menu used for FiveM to suit the style of this game and expand/adapt the system to work with our tile game
- [X] Allow for 3 skills to be used to add player buffs/debuffs

## Title Menu
- [ ] Add more logic for player name input to ensure name is at least 4 charaters long and give overwrite warner if name matches a save file

## General Ui
- [ ] Stop text being allowed to be selected in player menus
- [ ] Red text for required xp notifications - teleport stone 
- [ ] Sort out css styling and clean it up, one day

## New Game


## Save System
- [ ] Style load menu scroll bar
 
## Item System
 

## Settings Menu
- [x] Design and create the settings menu
- [x] Setting will include, touch controls toggle, sound toggle, log toggle

## Maps and Dialogue
- [ ] Floor 4 - Just needs some world sprites for more depth
- [ ] Add transition for teleporting between maps so we don't see the maps unload and load 
- [ ] Tile-activated teleports for caves, interiors
- [ ] Trigger tiles for tile frames for things like doors opening and closing
- [x] Mini map in the player menu, display the floor as a small picture with player location

## Sounds
- [ ] Title Menu sounds
- [ ] Player Menu Sounds
- [ ] World Sprite sound options

## Docs & Dev work
- [ ] Add unit test scripts 
- [x] Optimize main game loop for mobile performance (reduce DOM updates, avoid resizing canvas every frame, batch sprite/frame updates)
- [x] Make Installable for mobile devices

---

- updated function library
- fine tune skills and balance

## *New Since Last Release*

- Fixed Sound issue with iOS/Safari
- Converted all sfx sounds from .wav to .mp3
- Added fall back if audio cant load on some devices - until i work out why they wont laod on iphone
- Improved title screen Ui
- Added Map menu to player Menu, view a preview of the map with npc, enemy and player markers
- Skill menu created and integrated into player menu
- 3 skill slots for player to equip skills to gain buffs and drawbacks
- Skill inventory system
- Gacha system for acquiring skills
- New skill assets
- New Currency items for acquiring and upgrading skills
- Created new Documentation for how to add new skills to the game
- Touch controls changed from Dpad to joystick
- Player - Npc collision logic finally created

---
