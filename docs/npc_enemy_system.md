# NPC & Enemy Definitions Guide

This guide explains how to define, configure, and expand NPCs and enemies in Cynrith.  
NPCs and enemies are central to gameplay, quest progression, worldbuilding, and combat.  
You’ll learn how to add new characters, set their spawn locations, dialogue, stats, loot, and sounds.

---

## 1. Where to Define NPCs & Enemies

- **NPCs:**  
  Defined in `assets/js/DEFINITIONS/charactersData.js` under `NPC_DEFINITIONS`.
- **Enemies:**  
  Defined in the same file under `ENEMY_TYPES`.

---

## 2. NPC Definition Structure

Each NPC is an object with properties for ID, name, sprite, spawn locations, dialogue, quests, and more.

**Example:**
```javascript
eldrin_steward: {
    id: "eldrin_steward",
    name: "Eldrin the Steward",
    sprite: "assets/img/npc/eldrin.png",
    interactive: true,
    spawns: [
        { map: 0, x: 44, y: 43, wanderArea: { x1: 44, y1: 42, x2: 47, y2: 48 } }
    ],
    dialogue: {
        default: [
            "Welcome to Verdant Rise, traveler.",
            "Take up this sword, it is both tool and teacher."
        ],
        questGiven: ["Please Collect 3 DewLeaf"],
        questIncomplete: ["Keep looking you don't quite have enough!"]
        questComplete: ["May the Architect watch over you."]
    },
    questId: "eldrin_intro",
    questRedo: false,
    forcedEncounter: {
        enabled: true,
        triggerTiles: [
            { x: 44, y: 46 },
            { x: 45, y: 46 }
        ],
        triggered: false
    },
    trader: null // Set trader ID if NPC is a shop/trader
}
```

**Key Properties:**
- `id`: Unique string identifier.
- `name`: Display name.
- `sprite`: Path to NPC image.
- `interactive`: Can the player interact?
- `spawns`: Array of spawn locations and wander areas.
- `dialogue`: Object with dialogue arrays for different states.
- `questId`: Linked quest (if any).
- `questRedo`: Can quest be repeated?
- `forcedEncounter`: Optional forced interaction logic.
- `trader`: Trader/shop ID (if applicable).

---

## 3. Enemy Definition Structure

Each enemy is an object with properties for ID, name, sprite, stats, loot, spawn locations, and sounds.

**Example:**
```javascript
slime_01: {
    id: "slime_01",
    name: "Groovy Slime",
    sprite: "assets/img/enemy/slime_01.png",
    moveSpeed: 0.7,
    distance: 3,
    maxHealth: 10,
    attack: 2,
    defense: 1,
    speed: 1,
    xpGain: 5,
    loot: [
        { item: "slime_ball", chance: 50, amount: [1, 2] }
    ],
    spawns: [
        { map: 0, x: 30, y: 2, wanderArea: { x1: 24, y1: 0, x2: 36, y2: 5 } }
    ]
}
```

**Key Properties:**
- `id`: Unique string identifier.
- `name`: Display name.
- `sprite`: Path to enemy image.
- `moveSpeed`: Movement speed.
- `distance`: Hostile distance to player.
- `maxHealth`, `attack`, `defense`, `speed`: Combat stats.
- `xpGain`: XP awarded on defeat.
- `loot`: Array of item drops with chance and amount.
- `spawns`: Array of spawn locations and wander areas.

---

## 4. Adding Sounds to NPCs & Enemies

- **Ambient Enemy Sounds:**  
  Place a `.wav` file in `assets/sound/sfx/enemy/` named after the enemy’s `id` (e.g. `slime_01.wav`).  
  The game will play this sound randomly when the player is near the enemy.

---

## 5. Advanced Features

- **Forced Encounters:**  
  Use the `forcedEncounter` property to trigger dialogue or events when the player steps on specific tiles.
- **Trader NPCs:**  
  Set the `trader` property to link an NPC to a shop/trader definition.
- **Quest Givers:**  
  Link NPCs to quests using `questId` and provide quest-specific dialogue.

---

## 6. Best Practices

- Use unique IDs for all NPCs and enemies.
- Keep sprite and sound file names consistent with IDs.
- Test spawn locations and wander areas to avoid overlap or stuck NPCs.
- Write clear, lore-friendly dialogue for each NPC.
- Balance enemy stats and loot for fair gameplay.

---
