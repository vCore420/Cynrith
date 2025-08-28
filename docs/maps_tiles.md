# Maps & Tiles Guide

This guide explains how to create a layered map for Cynrith using [Tiled Map Editor](https://www.mapeditor.org/), export it as JSON, add tile definitions, set up spawn/teleport/xp requirements, and theme your map. It also covers best practices for animation, collision, and pathfinding.

---

## 1. Designing Your Map in Tiled

### **A. Setting Up Your Project**
- Open Tiled and create a new map (choose "orthogonal" for Cynrith).
- Set the map size (width/height in tiles) and tile size (64x64 pixels).
- Name your layers (e.g. "Ground", "Objects").
- Make animation tiles from sprite sheets

### **B. Adding Layers**
- **Ground Layer:** Base terrain (grass, dirt, stone, etc.).
- **Object Layers:** Trees, rocks, water, buildings, etc, the games base map loader only loads 64 x 64px tiles, bigger tiles need to be added onto the base map in the worldSprites.js.
- **Collision Layer:** You choose where the collsions go so pick something to use as a base like a bush or wall to set it above the ground layer, you can then make other object tiles likes tress and rocks have collisons too, these are set when making the maps json so just keep them in mind here
- **Interactable/Trigger/World Sprite Layers:** These tiles are all add in javescript definitons, when using tiles you just need to focus on making a base map for your floor

### **C. Importing Tilesets**
- Add your tileset images to `assets/img/tile/`.
- In Tiled, create a new tileset for each image and assign the name the asset is.
- Use these tilesets to paint your map.

---

## 2. Exporting Your Map as JSON

- When your map is ready, go to **File > Export As** and choose JSON format.
- Save the file as `mapX.json` in `assets/json/` (replace X with your floor number).

---

## 3. Adding Tile Definitions

- In your exported JSON, add an `"assets"` array at the top of the json listing each tile used:
    ```json
    "assets": [
      {"file_name":"grass-2a","collision":0,"frames":0, "footsteps": "sand.wav"},
      {"file_name":"rock-1","collision":1,"frames":0},
      {"file_name":"water-1","collision":1,"frames":4}
    ]
    ```
    - `file_name`: matches the tileset image name (without extension).
    - `collision`: `1` for blocking, `0` for walkable.
    - `frames`: number of animation frames (0 for static).
    - `footsteps`: optional, sound file for player movement.

- **Tip:** Animated tiles need multiple frames in their asset definition and a matching sprite sheet.
- The order of the tiles you list as assets here must be the same order as seen at the bottom of your json file, refer to current maps in assets/json

---

## 4. Setting Spawn, Teleport, and XP Requirements

- Add a `"spawn"` object for player start position:
    ```json
    "spawn": { "x": 35, "y": 42 }
    ```
- Add a `"teleport"` object for map exits or warps:
    ```json
    "teleport": { "x": 21, "y": 25, "xpRequired": 600 }
    ```
    - `x`, `y`: tile coordinates for teleport.
    - `xpRequired`: XP needed to use the teleport.


---

## 5. Theming Your Map

- Choose a consistent visual theme (e.g. forest, ruins, cave).
- Use color, tile selection, and object placement to reinforce the theme.
- Add ambient sounds to be used with npcs, trigger tiles, interactions etc
- Add background music in assets/sound named to match your map JSON for immersion.

---

## 6. Animation & Collision Considerations

### **A. Animation**
- Set the `frames` property for animated tiles.
- Ensure sprite sheets are correctly formatted (frame width = tile size).
- Use animation for water, torches, magical effects, etc.

### **B. Collision**
- Mark blocking tiles with `collision: 1` in the asset definition.
- Avoid placing collision tiles where the player could get stuck (tight corners, narrow passages).
- Test player movement and enemy pathfinding to ensure smooth navigation.

### **C. Pathfinding**
- Ensure collision areas do not block critical paths or quest locations.
- For enemies, leave enough open space for wandering and chasing the player.
- Use the collision layer to guide both player and enemy movement.

---

## 7. Final Checklist

- [ ] Map exported as JSON and placed in `assets/json/`.
- [ ] All tile images in `assets/img/tile/`.
- [ ] Asset definitions updated in map JSON.
- [ ] Spawn and teleport points set.
- [ ] Collision and animation frames defined.
- [ ] Map tested for stuck spots and pathfinding issues.
- [ ] Theme, sounds, and music added for atmosphere.

---
