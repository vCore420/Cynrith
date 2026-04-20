# Trader System Guide

This guide explains how traders work in Cynrith.

Traders are part of floor identity. They are not only generic shops.

Current trader roles include:

- floor-specific consumables
- gems for the skill system
- Home Plot decor
- inventory expansion items

---

## 1. Where to Define Traders

Traders live in `assets/js/DEFINITIONS/traders.js` under `TRADER_DEFINITIONS`.

Each trader has:

- `buy`: items sold to the player
- `sell`: items the trader buys from the player

---

## 2. Trader Definition Structure

Example:

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

---

## 3. Linking Traders to NPCs

Link the trader ID from an NPC definition in `charactersData.js`.

Example:

```javascript
mordis_the_relic_seeker: {
    id: "mordis_the_relic_seeker",
    name: "Mordis the Relic-Seeker",
    sprite: "assets/img/npc/mordis.png",
    trader: "trader2"
}
```

When the player interacts with that NPC, the trader UI opens.

---

## 4. Current Economy Expectations

The current trader system uses the `money` item as currency.

Trader stock can include more than regular inventory items.

Live examples already include:

- blue, red, and pink gems
- `inventory_page`
- Home Plot furniture and structures

That means traders can support progression loops, build loops, and revisit loops, not just healing.

---

## 5. Stock Design by Floor Role

When designing a new trader, decide what role they serve:

- progression support
- rare resource exchange
- Home Plot furnishing
- floor-specific flavor merchant
- revisit incentive

Examples:

- a deeper floor trader may sell gems
- a calm hub trader may sell decor and expansion items
- a faction or archive trader may buy lore-heavy drops at better prices

---

## 6. Shop Behavior Notes

Current UI behavior:

- the UI shows current coin count using the `money` item
- buy buttons disable when the player cannot afford the item
- buying removes money and adds the item
- selling removes the item and adds money

If a trader sells Home Plot items, those rewards will still route correctly into Home storage because that logic lives in the item and inventory system.

---

## 7. Best Practices

- make stock reflect the floor's identity
- do not make every trader interchangeable
- use traders as revisit anchors when helpful
- test both buy and sell flows
- test Home item stock if the trader sells decor or buildings
