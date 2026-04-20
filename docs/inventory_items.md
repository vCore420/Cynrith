# Inventory & Items Guide

This guide explains the current item model in Cynrith.

Items are no longer just simple consumables. They can also act as:

- weapons
- utility items
- quest requirements
- trader economy anchors
- Home Plot rewards and placeables

---

## 1. Where to Define Items

Items live in `assets/js/DEFINITIONS/items.js` under `ITEM_DEFINITIONS`.

Use `assets/js/inventory/itemEffects.js` when an item needs custom on-use behavior.

---

## 2. Basic Item Structure

Example:

```javascript
{
    id: "health_buff_small",
    name: "Health Buff - Small",
    description: "Restores 10 health.",
    image: "assets/img/items/health_buff_small.png",
    rarity: "common",
    stackable: true,
    useable: true,
    removeable: true,
    sound: "health.mp3"
}
```

Common fields:

- `id`
- `name`
- `description`
- `image`
- `rarity`
- `stackable`
- `useable`
- `removeable`
- `sound`

---

## 3. Current Item Categories

### Consumables

Typical stat or healing items.

### Weapons

Weapons are real item definitions and use `itemType: "weapon"`.

Weapon-specific fields can include:

- `attackBonus`
- `rangeTiles`
- `slashSfx`
- `hitSfx`

### Currency and gems

Currency and gem items help drive traders and the skill system.

### Quest items and loot

These support floor quests, enemy drops, and story progression.

### Home Plot items

These are special items that use `homePlaceable: true` and a `homeDef` block.

See `docs/homePlot.md` for the full Home item workflow.

### Utility items

Some items trigger systems instead of acting like normal consumables.

Current examples include:

- inventory expansion items
- the Home Plot key item

---

## 4. On-Use Effects

If an item should do something when used, define its behavior in `assets/js/inventory/itemEffects.js`.

Example:

```javascript
ITEM_EFFECTS.health_buff_small = function(player, amount = 1) {
    const heal = 10 * amount;
    player.setHealth(player.health + heal);
    notify(`Restored ${heal} health!`, 1800);
};
```

Important note:

- `useItem(itemId, amount)` checks `ITEM_EFFECTS`
- items can opt out of being consumed by setting `consumeOnUse: false`

---

## 5. Special Utility Items

Not all usable items are stat consumables.

Current important patterns:

- `inventory_page` expands the inventory instead of healing or buffing
- `key_without_a_door` warps the player to the Home Plot and is not consumed

This pattern can be reused for future authored utility items.

---

## 6. Home Plot Item Routing

Home Plot items do not enter the normal inventory.

If an item has `homePlaceable: true`:

- `addItem` routes it to Home storage
- `removeItem` and `hasItem` also use the Home storage path
- rewards from quests, tiles, and traders can still use normal item reward flows

This makes Home rewards easy to author without separate reward code.

---

## 7. Sounds and Pickup Behavior

- item use sounds come from the item's `sound` field
- pickup sounds are driven automatically from item rarity

If an item is meant to feel important, its rarity matters for both economy and feedback.

---

## 8. Example: Adding a New Home Reward Item

If you want a floor to reward a decoration:

1. Add the item definition in `items.js`.
2. Set `homePlaceable: true`.
3. Add a valid `homeDef` block.
4. Give it through a quest, interactable, NPC, or trader.
5. Test that it routes to Home storage and places correctly.

---

## 9. Best Practices

- use unique IDs
- keep names and descriptions floor-specific where needed
- treat weapons and utility items as real authored systems, not edge cases
- test use behavior, consumption behavior, and sound behavior
- if an item is meant for the Home Plot, test routing and placement too
