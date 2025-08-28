# Trader System Guide

This guide explains how to add and configure traders (shop NPCs) in Cynrith.  
Traders allow players to buy and sell items, providing a key source of progression, resource management, and quest rewards.

---

## 1. Where to Define Traders

- All traders are defined in `assets/js/DEFINITIONS/traders.js` in the `TRADER_DEFINITIONS` object.
- Each trader is an object with arrays for items they buy and sell, including prices.

---

## 2. Trader Definition Structure

**Template Example:**
```javascript
const TRADER_DEFINITIONS = {
    trader1: {
        buy: [
            { id: "health_buff_small", price: 10 },
            { id: "atk_buff_small", price: 15 }
        ],
        sell: [
            { id: "slime_ball", price: 3 },
            { id: "dewleaf", price: 5 }
        ]
    }
};
```

**Key Properties:**
- `buy`: Array of items the trader sells to the player, with prices.
- `sell`: Array of items the trader buys from the player, with prices.

---

## 3. Linking Traders to NPCs

- In your NPC definition (`charactersData.js`), set the `trader` property to the trader’s ID:
    ```javascript
    eldrin_steward: {
        id: "eldrin_steward",
        name: "Eldrin the Steward",
        sprite: "assets/img/npc/eldrin.png",
        trader: "trader1", // Links to trader definition
        // ...other NPC properties
    }
    ```
- When the player interacts with this NPC, the trader shop menu will open.

---

## 4. Adding Items to Traders

- Add new items to the `buy` or `sell` arrays in the trader definition.
- Make sure the item exists in `ITEM_DEFINITIONS` and has an image and description.

---

## 5. Trader Shop UI

- The trader shop menu displays buy and sell tabs.
- Players can purchase items if they have enough coins (`money` item).
- Players can sell items they own for coins.

---

## 6. Example: Adding a New Trader

1. **Define the trader:**
    ```javascript
    TRADER_DEFINITIONS.trader2 = {
        buy: [
            { id: "maxHealth_buff_small", price: 25 },
            { id: "def_buff_small", price: 18 }
        ],
        sell: [
            { id: "fractured_relic_1", price: 12 }
        ]
    };
    ```
2. **Link to an NPC:**
    ```javascript
    mordis_the_relic_seeker: {
        id: "mordis_the_relic_seeker",
        name: "Mordis the Relic-Seeker",
        sprite: "assets/img/npc/mordis.png",
        trader: "trader2",
        // ...other NPC properties
    }
    ```

---

## 7. Best Practices

- Use unique IDs for traders and items.
- Set fair prices for buying and selling.
- Test trader interactions and shop UI in-game.
- For quest rewards, consider giving coins or shop items.

---
