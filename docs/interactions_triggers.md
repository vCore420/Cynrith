# Interactable & Trigger Tiles Guide

This guide explains how to add **interactable tiles** and **trigger tiles** to your Cynrith maps.  
These tiles are used for events, story moments, rewards, puzzles, and quest objectives.  
You’ll learn how to define them, place them on your map, and use them for a variety of gameplay features.

---

## 1. What Are Interactable & Trigger Tiles?

- **Interactable Tiles:**  
  Tiles the player can interact with (by pressing the A button when adjacent or on the tile).  
  Used for dialogue, rewards, lore objects, activating animations, and quest progression.
  the player will get a notifaction when near these tiles

- **Trigger Tiles:**  
  Tiles that automatically trigger an event when the player steps on them.  
  Used for story events, dialogue, warps (wip), frame changes (wip), or quest objectives.

---

## 2. How to Add Interactable Tiles

### **A. Define in `interactTiles.js`**

Add a new object to the `INTERACTABLE_TILES` array:

```javascript
{
    id: "statue_f3_1",
    map: 2,
    x: 14,
    y: 11,
    image: "assets/img/worldSprites/statue_01.png",
    spriteSheet: "assets/img/worldSprites/statue_01.png",
    imageW: 512,
    imageH: 480,
    rows: 3,
    cols: 8,
    animSpeed: 6,
    animOnTrigger: true,
    zIndex: 1,
    collision: true,
    notification: "Press A to activate the statue.",
    dialogue: [
        "The statue glows with a strange energy.",
        "You feel a memory echo through the stone."
    ],
    rewards: [
        { id: "memory_fragment", amount: 1 }
    ],
    sound: {
        enabled: true,
        file: "statue_activate.wav",
        type: "trigger"
    }
}
```

**Key Properties:**
- `id`: Unique identifier.
- `map`, `x`, `y`: Location on the map.
- `image`/`spriteSheet`: Path to image or sprite sheet.
- `rows`, `cols`, `animSpeed`, `animOnTrigger`: Animation settings.
- `zIndex`: 0 (below player), 1 (above player).
- `collision`: true/false.
- `notification`: Text shown when adjacent.
- `dialogue`: Array of dialogue lines.
- `rewards`: Items given on interaction.
- `sound`: Sound options (`loop`, `ambient`, `trigger`).

---

## 3. How to Add Trigger Tiles

### **A. Define in `triggerTiles.js`**

Add a new object to the `TRIGGER_TILES` array:

```javascript
{
    id: "echo_f3_1",
    map: 2,
    x: 14,
    y: 11,
    type: "dialogue",
    sound: { enabled: true, file: "echo.wav", type: "ambient" },
    dialogue: [
        "A Echo Flickers: 'Not all who climb return.'"
    ],
    oneTime: true, // Only triggers once
    rewards: [
        { id: "glitch_fragment", amount: 1 }
    ]
}
```

**Key Properties:**
- `id`: Unique identifier.
- `map`, `x`, `y`: Location on the map.
- `type`: "dialogue", "warp", "frameChange", etc.
- `dialogue`: Array of dialogue lines (for dialogue triggers).
- `rewards`: Items given when triggered.
- `oneTime`: true/false (if only triggers once).
- `sound`: Sound options (`loop`, `ambient`, `trigger`).

---

## 4. Examples of Uses

### **Interactable Tiles**
- **Lore Statues:**  
  Player presses A to read lore and receive a memory fragment.
- **Hidden Chests:**  
  Player interacts to receive loot and play a sound.
- **Animated Objects:**  
  Player triggers animation and sound (e.g. glowing runes, opening doors).

### **Trigger Tiles**
- **Echoes/Glitches:**  
  Stepping on tile triggers dialogue and gives a glitch fragment.
- **Warp Tiles (wip):**  
  Automatically teleport player to another map or location.
- **Puzzle Tiles (wip):**  
  Trigger frame changes, open doors, or activate world events.

---

## 5. Best Practices

- Use unique IDs for all tiles.
- Place interactable tiles at accessible locations (not blocked by collision).
- Use `oneTime: true` for single-use story events.
- Test notifications, dialogue, rewards, and sounds in-game.
- For quest objectives, reference tile IDs in your quest definitions.

---

