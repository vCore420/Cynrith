# Maps & Tiles Guide

This guide covers how Cynrith maps are authored and loaded.

It applies to:

- numbered floor maps such as `map0.json`
- named maps such as `castle0.json` or `home_plot0.json`
- supporting spaces such as interiors and side areas

---

## 1. Building Maps in Tiled

### Setup

- Use orthogonal maps.
- Use 64x64 tiles.
- Build the navigable base map first.
- Keep large decorative objects out of the base map if they should behave like layered sprites.

### Layers

The engine supports Tiled multi-layer JSON as well as older single-layer maps.

Typical layer use:

- ground and terrain layers
- object layers for normal tile-based structures
- visual detail layers

Important note:

- interactables, trigger tiles, NPCs, enemies, traders, and world sprites are not authored directly through Tiled placement logic in the main runtime system
- they are placed through JavaScript definitions and then spawned onto the map

---

## 2. File Naming and Map Types

### Numbered maps

Standard floors usually follow the `mapX.json` pattern.

### Named maps

The engine also supports named maps. Current examples include:

- `castle0`
- `portal_island0`
- `home_plot0`
- interior-style maps such as `map6_int1`

Named maps can still be associated with a floor through engine metadata.

Use named maps when a space is:

- an interior
- a branch location
- a narrative side space
- a hub such as the Home Plot

---

## 3. Exporting JSON

- Export the map as JSON.
- Place it in `assets/json/`.
- Make sure the file name matches the name you intend the engine to load.

For numbered floors, use the next available `mapX.json`.

For named spaces, use a stable descriptive name.

---

## 4. Tile Asset Metadata

Each map JSON must include an `assets` array describing the tiles used by the map.

Example:

```json
"assets": [
    {"file_name":"grass-2a","collision":0,"frames":0,"footsteps":"sand.mp3"},
    {"file_name":"rock-1","collision":1,"frames":0},
    {"file_name":"water-1","collision":1,"frames":4}
]
```

Important fields:

- `file_name`
- `collision`
- `frames`
- `footsteps`

Notes:

- `file_name` must match the tile image name without the extension.
- animated tiles need a matching sprite sheet layout and correct frame count.
- the asset order must still line up with the tileset order expected by the exported JSON.

---

## 5. Spawn and Teleport Data

### Spawn

Use a `spawn` object for the map's entry point.

```json
"spawn": { "x": 35, "y": 42 }
```

### Forward teleport

Use a `teleport` object for progression exits.

```json
"teleport": { "x": 21, "y": 25, "xpRequired": 600 }
```

Current forward teleport behavior:

- the player gets a notification when adjacent
- the player uses the A button
- the engine checks `xpRequired`
- success warps the player forward to the next floor map

### Backward travel and Home Plot travel

Backward travel is also part of the engine flow.

- on normal maps, the spawn stone can return the player to the previous floor
- on the Home Plot, the spawn stone opens the discovered-floor travel menu instead

When designing a map, think about how it fits into this travel loop.

---

## 6. World Sprites Versus Base Tiles

Use base tiles when something is part of the ground or standard tile structure.

Use world sprites when something is:

- larger than a normal tile
- layered above or below the player
- better handled as a reusable placed object
- easier to animate or collide as a sprite than as raw tile art

See `docs/worldSprites.md` for the sprite definition format.

---

## 7. Collision and Pathing

Collision comes from more than the base map.

During play, movement can be blocked by:

- collidable map tiles
- world sprites
- interactable tiles with collision
- Home Plot placements
- other characters

Because of that, a floor should be tested after all authored systems are present, not just after the map JSON loads.

---

## 8. Sound Hooks in Maps

Map-level sound hooks include:

- background music by map
- tile footstep sounds through asset metadata

Additional nearby ambience often comes from interactables, triggers, NPCs, and enemies instead of the map file itself.

---

## 9. Final Checklist

- [ ] JSON exported into `assets/json/`
- [ ] file naming matches intended runtime use
- [ ] `assets` metadata block added and checked
- [ ] spawn point added
- [ ] teleport point added if needed
- [ ] tile collisions tested
- [ ] pathing tested with NPCs and enemies present
- [ ] world sprites moved out of the base tile layer where appropriate
- [ ] footstep and map music behavior tested
