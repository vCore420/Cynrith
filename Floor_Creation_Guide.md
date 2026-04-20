# Cynrith Floor Creation Guide

This guide explains the current floor-building workflow for Cynrith.

Use it when adding:

- a full numbered floor
- a named side map or interior
- a new trader hub or revisit space
- floor-specific quests, rewards, and story beats

The engine is modular, but floors are not just map files. A finished floor usually touches maps, NPC data, quests, interactables, items, sounds, and sometimes Home Plot content.

---

## Table of Contents

1. Overview and workflow
2. Planning the floor
3. Building maps
4. Adding tiles, sprites, and sounds
5. Defining NPCs, enemies, and traders
6. Building quests, interactables, and triggers
7. Designing floor rewards and revisit value
8. Home Plot integration
9. Testing checklist
10. Supporting docs

---

## 1. Overview and Workflow

Typical workflow:

1. Decide what the floor is about.
2. Decide whether it is a numbered floor, a named side map, or both.
3. Build the map JSON with the Cynrith Toolkit or Tiled and add asset metadata.
4. Add NPCs, enemies, world sprites, interactables, and triggers.
5. Add quests, rewards, trader stock, and story text.
6. Decide whether the floor adds Home Plot items, revisit reasons, or travel hooks.
7. Test map flow, rewards, collisions, dialogue, and save behavior.

Use the story canon in [./Cynrith_Story_Core.md](./Cynrith_Story_Core.md) first.

Use [./docs/world_Building.md](./docs/world_Building.md) and [./docs/world_Building_F6-10.md](./docs/world_Building_F6-10.md) as brainstorming support, not as stricter canon than the story core.

---

## 2. Planning the Floor

Before building anything, define these clearly:

- floor identity
- local story
- revisit reason
- lore seep points
- key NPCs and enemies
- trader role, if any
- items or decor introduced here

Each floor should ideally have:

- one small self-contained story
- one practical reason to return later
- one or two points where the larger truth of Cynrith leaks through

For reusable content ideas, check [./docs/content_tracker.md](./docs/content_tracker.md).

---

## 3. Building Maps

### Numbered and named maps

The engine supports both numbered floor maps and named maps.

- Standard floors usually use files like `map0.json`, `map1.json`, and so on.
- Named maps are also supported, such as `castle0.json`, `portal_island0.json`, and `home_plot0.json`.

Named maps can still belong to a floor for progression and UI purposes.

### Tiled workflow

1. Build the layout in Tiled.
2. Export JSON into `assets/json/`.
3. Add or verify the `assets` metadata block in the JSON.
4. Add `spawn` and `teleport` objects where needed.
5. Test collision and movement flow.

See [./docs/maps_tiles.md](./docs/maps_tiles.md) for the map format.

### Important map authoring notes

- Large decorative objects should usually be handled as world sprites, not base map tiles.
- Teleport progression is not only about moving forward. Backward travel and Home Plot travel matter too.
- A floor can include supporting named maps such as interiors or branch spaces.

---

## 4. Adding Tiles, Sprites, and Sounds

### Tiles

- Base map tiles go in `assets/img/tile/`.
- Tile asset metadata lives in the map JSON `assets` array.
- Footstep sounds can be assigned per tile asset.

### World sprites

- Large or layered objects usually belong in `assets/js/DEFINITIONS/worldSprites.js`.
- Use world sprites for oversized structures, statues, signs, banners, bones, trees, and other objects that should not be baked into the tile grid alone.

### Sounds

You can wire sounds from several places:

- map tile footsteps
- background music per map
- NPC and enemy behavior
- interactable and trigger tiles
- item use

See [./docs/sound_system.md](./docs/sound_system.md) for folder structure and sound hooks.

---

## 5. Defining NPCs, Enemies, and Traders

### NPCs and enemies

Add these in `assets/js/DEFINITIONS/charactersData.js`.

For floor authors, the important pieces are:

- spawn maps and coordinates
- wander areas
- dialogue state blocks
- quest links
- forced encounters
- trader links

Forced encounters are a real authored system now, not just a note in the data. Use them when a character should intercept the player through position-based story beats.

See [./docs/npc_enemy_system.md](./docs/npc_enemy_system.md).

### Traders

Trader stock is defined separately in `assets/js/DEFINITIONS/traders.js` and linked back to NPCs.

A floor trader can sell more than healing items. Current trader roles include:

- consumables
- gems for the skill system
- Home Plot decor
- inventory expansion items

See [./docs/traders.md](./docs/traders.md).

---

## 6. Building Quests, Interactables, and Triggers

### Quests

Add quests in `assets/js/DEFINITIONS/quests.js`.

Current quest types include:

- `gift`
- `itemCollect`
- `enemyDefeat`
- `statBuild`
- `interactTiles`

Quest rewards can include:

- items
- XP
- direct stat increases

See [./docs/quest_system.md](./docs/quest_system.md).

### Interactable tiles

Use interactable tiles when the player should intentionally activate something.

They currently support:

- dialogue
- rewards
- collision
- trigger-only sound playback
- looped or ambient nearby sound behavior
- optional teleport after interaction
- optional repeat behavior
- optional persistence after trigger

### Trigger tiles

Use trigger tiles when the player should activate something by stepping on it.

They currently support:

- dialogue
- one-time story beats
- rewards
- trigger sounds
- nearby ambient or loop sounds

See [./docs/interactions_triggers.md](./docs/interactions_triggers.md).

---

## 7. Designing Floor Rewards and Revisit Value

Do not treat rewards as only stat buffs or coins.

A floor can reward the player with:

- consumables
- weapons
- quest items
- gems
- utility items
- Home Plot decor or structures

Think about revisit value while you design rewards.

Good revisit hooks include:

- a floor-specific trader
- unique resources
- a calm or useful travel stop
- Home Plot rewards tied to the floor's identity
- named submaps or optional side spaces

---

## 8. Home Plot Integration

If the floor gives the player something they should bring home, document that in the floor plan early.

Important Home Plot facts:

- Home items are defined in `items.js` but stored separately from normal inventory.
- Rewards can route into Home storage automatically.
- Houses and structures can create generated interiors.
- The Home Plot also acts as a revisit and travel hub.

Use [./docs/homePlot.md](./docs/homePlot.md) for the full workflow.

---

## 9. Testing Checklist

Before considering a floor finished, test these:

- [ ] map loads correctly
- [ ] tile metadata and collisions behave correctly
- [ ] teleports work in both intended directions
- [ ] NPCs spawn, face, wander, and interact correctly
- [ ] forced encounters do not get stuck
- [ ] traders open and stock the right items
- [ ] quests progress and complete correctly
- [ ] interactables and triggers award the right items and sounds
- [ ] Home Plot rewards route correctly if used
- [ ] named side maps resolve correctly
- [ ] save and load preserve quest and floor state

---

## 10. Supporting Docs

- [./docs/maps_tiles.md](./docs/maps_tiles.md)
- [./docs/worldSprites.md](./docs/worldSprites.md)
- [./docs/sound_system.md](./docs/sound_system.md)
- [./docs/npc_enemy_system.md](./docs/npc_enemy_system.md)
- [./docs/quest_system.md](./docs/quest_system.md)
- [./docs/interactions_triggers.md](./docs/interactions_triggers.md)
- [./docs/inventory_items.md](./docs/inventory_items.md)
- [./docs/traders.md](./docs/traders.md)
- [./docs/skills_creation.md](./docs/skills_creation.md)
- [./docs/homePlot.md](./docs/homePlot.md)
- [./docs/function_libary.md](./docs/function_libary.md)
- [./docs/content_tracker.md](./docs/content_tracker.md)
- [./Cynrith_Story_Core.md](./Cynrith_Story_Core.md)