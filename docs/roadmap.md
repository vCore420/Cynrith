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
- [ ] Add/fix death fade out for sprites

## Quest Logic
- [ ] quest menu has some overflow on lists and scroll bar needs removing
- [x] Add a '!' above npcs whos quests are ready to be completed
 
## Player Logic
- [ ] Joystick instead of D Pad For smoother movement on touch devices
- [x] Keyboard support - WASD for movement, enter key for interaction, space bar for combat
- [ ] Add collision logic between Player and Npc
- [ ] Add more logic to player health, regen when below 50% up to 50%
- [ ] Change initial player weapon system to use different weapons for different player character choice

## Inventory


## Skills Menu
- [ ] Recycle my skill menu used for FiveM to suit the style of this game and expand/adapt the system to work with our tile game
- [ ] Allow for 3 skills to be used to add player buffs/debuffs

## Title Menu
- [ ] Add more logic for player name input to ensure name is at least 4 charaters long and give overwrite warner if name matches a save file


## General Ui
- [ ] Stop text being allowed to be selected in player menus
- [ ] Red text for required xp notifications - teleport stone 
- [ ] Sort out css styling and clean it up

## New Game


## Save System
- [ ] Style load menu scroll bar
 
## Item System
 

## Settings Menu
- [x] Design and create the settings menu
- [x] Setting will include, touch controls toggle, sound toggle, log toggle

## Maps and Dialogue

- [ ] Floor 4
- [ ] Add transition for teleporting between maps so we don't see the maps unload and load 
- [ ] Tile-activated teleports for caves, interiors
- [ ] Trigger tiles for tile frames for things like doors opening and closing as well as map warping triggers
- [ ] Mini map in the player menu, display the floor as a small picture with player location

## Sounds
- [ ] Title Menu sounds
- [ ] Player Menu Sounds
- [ ] World Sprite sound options

## Docs & Dev work
- [ ] Add unit test scripts 
- [ ] Optimize main game loop for mobile performance (reduce DOM updates, avoid resizing canvas every frame, batch sprite/frame updates)
- [x] Make Installable for mobile devices

---

## *New Since Last Release*

- Fixed minor asset loading issues when warping between maps
- fix minor collision and Npc logic loading issues when warping between maps
- Moved player spawn location from map warping to the tile below the teleport stone to prevent collision issues
- Added a '!' above Npcs whos quests are ready to complete 
- Player movement keys changed to W,S,A,D. Re-Wrote player movement logic to bring key mapping up to date
- Esc key opens player menu
- Settings menu Created with touch control toggle and volume sliders
- Made installable for devices

---
