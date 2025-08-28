# Quest System Guide

This guide explains how to create, configure, and expand quests in Cynrith.  
Quests are a core part of the game, driving story progression, rewarding exploration, and connecting NPCs, enemies, interactable tiles, and world lore.

---

## 1. Where to Define Quests

- All quests are defined in `assets/js/DEFINITIONS/quests.js` in the `QUEST_DEFINITIONS` object.
- Each quest is an object with properties for type, requirements, rewards, and links to NPCs or world events.

---

## 2. Quest Definition Structure

**Template Example:**
```javascript
{
    id: "dewleaf_gather",
    name: "Dewleaf Gathering",
    description: "Collect 3 Dewleaf from Vicious Plants.",
    type: "itemCollect", // "gift", "itemCollect", "enemyDefeat", "statBuild", "interactTiles"
    requiredItems: [{ id: "dewleaf", amount: 3 }],
    rewards: [{ id: "health_buff_small", amount: 2 }, { xp: 20 }],
    redoable: true
}
```

**Key Properties:**
- `id`: Unique string identifier.
- `name`: Display name.
- `description`: Shown to the player.
- `type`: Quest type (see below).
- `requiredItems`: Array of items to collect (for `itemCollect`).
- `enemyId`: Enemy to defeat (for `enemyDefeat`).
- `requiredAmount`: Number required (for `itemCollect`, `enemyDefeat`, `statBuild`, `interactTiles`).
- `stat`: Stat to build (for `statBuild`).
- `interactTileIds`: Array of interactable tile IDs (for `interactTiles`).
- `rewards`: Array of rewards (items, XP, stats).
- `redoable`: Can quest be repeated?

---

## 3. Quest Types

- **gift**: Immediate reward quests, often given by NPCs.
- **itemCollect**: Collect specific items.
- **enemyDefeat**: Defeat a set number of a specific enemy.
- **statBuild**: Increase a player stat by a set amount.
- **interactTiles**: Trigger specific interactable tiles (e.g. statues, switches).

---

## 4. Tying Quests to NPCs & Dialogue

- Link a quest to an NPC by setting the NPC’s `questId` property in `charactersData.js`.
- Add quest-specific dialogue in the NPC’s `dialogue` object:
    ```javascript
    dialogue: {
        default: ["Welcome, adventurer!"],
        questGiven: ["Please collect 3 Dewleaf."],
        questIncomplete: ["Keep looking, you don't have enough yet!"],
        questComplete: ["Thank you! Here is your reward."]
    }
    ```
- When the player interacts with the NPC, the quest will be started, checked, or completed based on progress.

---

## 5. Using Enemies for Enemy Defeat Quests

- Set `type: "enemyDefeat"` and specify `enemyId` and `requiredAmount` in the quest definition.
- Example:
    ```javascript
    {
        id: "slime_cull",
        name: "Slime Slayer",
        type: "enemyDefeat",
        enemyId: "slime_01",
        requiredAmount: 5,
        rewards: [{ id: "health_buff_small", amount: 2 }, { xp: 30 }]
    }
    ```
- The quest HUD will track progress as the player defeats the required enemies.

---

## 6. Using Trigger Tiles & Interactable Tiles

- For quests requiring the player to activate tiles (statues, switches, etc.), use `type: "interactTiles"` and specify `interactTileIds` and `requiredAmount`.
- Example:
    ```javascript
    {
        id: "shade_statue_echoes",
        name: "Statue Echoes",
        type: "interactTiles",
        interactTileIds: ["statue_f3_1", "statue_f3_2", "statue_f3_3"],
        requiredAmount: 3,
        rewards: [{ id: "atk_buff_small", amount: 2 }, { xp: 45 }]
    }
    ```
- The quest will update as the player triggers each tile.

---

## 7. Stat Build & Loot Finding Quests

- **Stat Build:**  
  Use `type: "statBuild"`, set `stat` and `requiredAmount`.
    ```javascript
    {
        id: "tharion_echoes",
        name: "Tharion's Echoes",
        type: "statBuild",
        stat: "maxHealth",
        requiredAmount: 20,
        rewards: [{ id: "atk_buff_small", amount: 3 }, { xp: 60 }]
    }
    ```
- **Loot Finding:**  
  Use `type: "itemCollect"` and specify the item(s) and amount.

---

## 8. Giving Depth & Challenge

- Combine quest types for multi-step objectives (e.g. collect items, defeat enemies, trigger tiles).
- Use rewards to encourage exploration and progression (items, XP, stat boosts).
- Write engaging dialogue and lore for quest givers.
- Reference key NPCs, items, and lore objects from [Content Tracker](content_tracker.md) and [World Building](world_building.md).

---

## 9. Testing Quests

- Start the game and interact with the NPC or trigger tile to begin the quest.
- Track progress in the quest HUD and player menu.
- Ensure rewards are given and quest completion is logged.

---
