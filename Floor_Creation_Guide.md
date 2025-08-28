# Cynrith Floor Creation Guide

Welcome to the **Cynrith Floor Creation Guide**!  
This document will walk you through the process of adding new floors (maps) to the game, from simple asset additions (sprites, tiles, sounds) to building full story arcs, quests, and branching lore.  
Whether you're a contributor looking to add a new sound, sprite, or tile, or a designer aiming to create an entire new floor with quests and lore, this guide will help you get started.

---

## 📚 Table of Contents

1. [Overview & Workflow](#overview--workflow)
2. [Step-by-Step Floor Creation](#step-by-step-floor-creation)
    - [1. Planning Your Floor](#1-planning-your-floor)
    - [2. Creating Map Layers in Tiled](#2-creating-map-layers-in-tiled)
    - [3. Adding Tiles & Sprites](#3-adding-tiles--sprites)
    - [4. Adding Sounds](#4-adding-sounds)
    - [5. Defining NPCs & Enemies](#5-defining-npcs--enemies)
    - [6. Creating Interactable & Trigger Tiles](#6-creating-interactable--trigger-tiles)
    - [7. Building Quests](#7-building-quests)
    - [8. Expanding Lore & Story](#8-expanding-lore--story)
    - [9. Testing & Debugging](#9-testing--debugging)
3. [Department Overviews & Links](#department-overviews--links)
4. [Advanced: Branching Journeys & Worldbuilding](#advanced-branching-journeys--worldbuilding)
5. [Resources & Expanded Docs](#resources--expanded-docs)

---

## Overview & Workflow

Adding a new floor to Cynrith involves several modular steps.  
You can contribute at any level, from adding a single sound or sprite, to designing a full map with quests and lore.

**Typical Workflow:**
1. Plan your floor: theme, story, key NPCs, and gameplay goals.
2. Create your map in [Tiled](https://www.mapeditor.org/), using layers for ground, objects, and interactables.
3. Add new tiles, sprites, and sounds to the asset folders.
4. Define NPCs, enemies, interactable tiles, and triggers in the relevant definition files.
5. Write quests and dialogue, referencing key items and lore objects.
6. Test your floor in-game, debug, and polish.

---

## Step-by-Step Floor Creation

### 1. Planning Your Floor

- Decide on the **theme** (e.g. forest, ruins, cave).
- Outline the **story arc** and how it fits into Cynrith's lore.
- List **key NPCs, enemies, items, and lore objects** (see [Content Tracker](./docs/content_tracker.md)).
- Sketch out **quests** and player progression.

### 2. Creating Map Layers in Tiled

- Use [Tiled Map Editor](https://www.mapeditor.org/) to design your floor.
- Create multiple layers: ground, objects.
- Export your map as JSON and place it in `assets/json/mapX.json` (where X is your floor index).
- Add tile definitions into newly created mapX.json
- For animated sprites, define frame counts and animation speed.

**See:** [Maps & Tiles Documentation](./docs/maps_tiles.md)

### 3. Adding Tiles & Sprites

- Add new tile images to `assets/img/tile/`.
- Add new world sprites (used for worldSprites.js) to `assets/img/worldSprites/`.
- Use these in Tiled for your map's JSON to reference new tiles and sprites.

**See:** [Maps & Tiles Documentation](./docs/maps_tiles.md)  
**See:** [World Sprites Documentation](./docs/worldSprites.md)

### 4. Adding Sounds

- Place new sound files in the appropriate folder:
    - Background music: `assets/sound/`
    - SFX: `assets/sound/sfx/` (subfolders for `world`, `items`, `player`, `enemy`, `interactions`)
- Reference sounds in your map JSON, interactable/trigger tile definitions, NPC/enemy definitions, or item definitions.
- For ambient or looped sounds, set the correct type in the definition.

**See:** [Sound System Documentation](./docs/sound_system.md)

### 5. Defining NPCs & Enemies

- Add new NPCs and enemies to `assets/js/DEFINITIONS/charactersData.js`.
- Define spawn locations, stats, dialogue, and sound files.
- For enemies, add ambient sound logic and combat sounds as needed.

**See:** [NPC & Enemy System Documentation](./docs/npc_enemy_system.md)


### 6. Building Quests

- Add new quests to `assets/js/DEFINITIONS/quests.js`.
- Reference required items, enemies, interactable tiles, and rewards.
- Write quest dialogue and completion logic.
- Use things like enemys, loot drops, trigger tiles and interactable tiles for quests

**See:** [Quest System Documentation](./docs/quest_system.md)

### 7. Creating Interactable & Trigger Tiles

- Define interactable tiles in `assets/js/DEFINITIONS/interactTiles.js`.
- Define trigger tiles in `assets/js/DEFINITIONS/triggerTiles.js`.
- Set up rewards, dialogue, sound options (`loop`, `ambient`, `trigger`), and animation triggers.

**See:** [Maps & Tiles Documentation](./docs/interactions_triggers.md)

### 8. Expanding Lore & Story

- Reference key NPCs, items, and lore objects from [Content Tracker](./docs/content_tracker.md).
- Expand world concepts and story arcs in [World Building](./docs/world_building.md).
- Use dialogue and quest rewards to deepen the lore.

**See:** [World Building Documentation](./docs/world_building.md)  
**See:** [Content Tracker](./docs/content_tracker.md)

### 9. Testing & Debugging

- Load your new floor in-game and test all features.
- Check for missing assets, broken links, or logic errors.
- Use the debug log and notifications to track issues.
- Polish visuals, sounds, and gameplay for a seamless experience.

---

### 10. Submitting Your Floor for Review

Once you have completed your new floor and tested all features:

1. **Commit your changes** to a new branch (e.g. `feature/new-floor-forest`).
2. **Push your branch** to the remote repository (GitHub).
    ```bash
    git checkout -b feature/new-floor-forest
    git add .
    git commit -m "Add new forest floor with assets, quests, and NPCs"
    git push origin feature/new-floor-forest
    ```
3. **Open a Pull Request (PR)** on GitHub targeting the `main` branch.
4. **Describe your changes** in the PR, including:
    - Floor theme and features
    - New assets (tiles, sprites, sounds)
    - Quests, NPCs, and lore additions
    - Any special notes or testing instructions
5. **Wait for review and feedback.**
    - The project maintainer will review, request changes if needed, and merge when ready.

---

## Department Overviews & Links

- **Maps & Tiles:** [./docs/maps_tiles.md](./docs/maps_tiles.md)
- **World Sprites:** [./docs/worldSprites.md](./docs/worldSprites.md)
- **Sound System:** [./docs/sound_system.md](./docs/sound_system.md)
- **NPCs & Enemies:** [./docs/npc_enemy_system.md](./docs/npc_enemy_system.md)
- **Quests:** [./docs/quest_system.md](./docs/quest_system.md)
- **Inventory & Items:** [./docs/inventory_items.md](./docs/inventory_items.md)
- **Trader Npc's** [./docs/traders.md](./docs/traders.md)
- **World Building & Lore:** [./docs/world_building.md](./docs/world_building.md)
- **Content Tracker:** [./docs/content_tracker.md](./docs/content_tracker.md)

---

## Advanced: Branching Journeys & Worldbuilding

- Use [World Building](./docs/world_building.md) and [Content Tracker](./docs/content_tracker.md) to design floors that branch the player's journey.
- Reuse key NPCs, items, and lore objects for continuity.
- Create quests and triggers that unlock new storylines, floors, or world events.
- Expand factions, recurring themes, and world objects for deeper immersion.

---

## Resources & Expanded Docs

- [Function Library](./docs/function_libary.md): All core functions explained.
- [Roadmap](./docs/roadmap.md): Current goals and development plans.

---

> For more details, follow the links above or browse the `/docs` folder.  