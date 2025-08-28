# World Sprites & Sprite Loader Guide

This guide explains how to use the **World Sprite Loader** to add animated or static sprites to your Cynrith maps.  
World sprites are large or animated objects (statues, bones, animals, etc.) that are placed at specific locations and can have collision and animation properties.

---

## 1. What Are World Sprites?

World sprites are modular, reusable images or sprite sheets that can be placed anywhere in the game world.  
They can be static (single image) or animated (multiple frames), and can be larger than the standard tile size.

**Examples:** Statues, bones, animated animals, magical effects, oversized tiles.

---

## 2. How the Sprite Loader Works

- The loader reads the `WORLD_SPRITES` array from `assets/js/DEFINITIONS/worldSprites.js`.
- Each sprite definition includes its image/sprite sheet, frame details, animation speed, collision, and spawn positions.
- When a map loads, the loader spawns all sprites defined for that map at their specified coordinates.

---

## 3. How to Add a New World Sprite

### **A. Prepare Your Sprite Image**

- Place your sprite sheet or image in `assets/img/worldSprites/`.
- For animated sprites, arrange frames in a grid (rows x columns).

### **B. Define Your Sprite in `worldSprites.js`**

Add a new object to the `WORLD_SPRITES` array:

```javascript
{
    id: "dragon_statue", // Unique identifier
    positions: [
        { map: 1, x: 12, y: 8 }, // Map index and tile coordinates
        { map: 2, x: 5, y: 20 }
    ],
    spriteSheet: "assets/img/worldSprites/dragon_statue.png",
    imageW: 256,      // Total image width in pixels
    imageH: 256,      // Total image height in pixels
    rows: 1,          // Number of rows in the sheet
    cols: 1,          // Number of columns (frames per row)
    animSpeed: 0,     // Ticks per frame (0 for static image)
    zIndex: 0,        // 0 for below player, 1 for above
    collision: true   // true if sprite should block movement
}
```

### **C. Animation Settings**

- For animated sprites, set `rows` and `cols` to match your frame grid.
- Set `animSpeed` to the number of ticks per frame (lower = faster animation).
- For static images, use `rows: 1`, `cols: 1`, and `animSpeed: 0`.

### **D. Collision Settings**

- `collision: true` makes the sprite block movement.
    - If `zIndex: 0`, the whole image is collidable.
    - If `zIndex: 1`, only the bottom row of tiles is collidable (player walks behind the rest).

---

## 4. How to Place Sprites on Maps

- In the `positions` array, specify each map and tile coordinate where the sprite should appear.
    - Example: `{ map: 2, x: 10, y: 15 }`
- You can place the same sprite at multiple locations and on multiple maps.

---

## 5. Best Practices

- Use descriptive IDs for sprites.
- Keep sprite sheets organized in `assets/img/worldSprites/`.
- Test collision and animation in-game to ensure correct placement and behavior.
- For large sprites, check that they do not block critical paths or quest areas.

---

## 6. Example Sprite Definition

```javascript
{
    id: "magic_portal",
    positions: [
        { map: 0, x: 22, y: 5 },
        { map: 3, x: 14, y: 18 }
    ],
    spriteSheet: "assets/img/worldSprites/magic_portal.png",
    imageW: 128,
    imageH: 128,
    rows: 4,
    cols: 2,
    animSpeed: 6,
    zIndex: 1,
    collision: false
}
```

---

## 7. Troubleshooting

- If a sprite does not appear, check the image path and map index.
- If animation does not play, verify `rows`, `cols`, and `animSpeed`.
- For collision issues, test both `zIndex` settings and adjust as needed.

---

## 8. More Resources

- [Maps & Tiles Guide](maps_tiles.md)
- [Content Tracker](content_tracker.md)
- [World Building](world_building.md)

---

> For advanced sprite features or questions, see the expanded docs or ask in the contributor