# Inventory & Items Guide

This guide explains how to add new items to Cynrith, including their assets, definitions, usage effects, and sound options.  
Items are central to gameplay, progression, and quest rewards. You’ll learn how to create consumables, equipment, quest items, and more.

---

## 1. Where to Define Items

- All items are defined in `assets/js/DEFINITIONS/items.js` in the `ITEM_DEFINITIONS` object.
- Each item is an object with properties for ID, name, description, image, rarity, stackability, usage, and sound.

---

## 2. Item Definition Structure

**Template Example:**
```javascript
{
    id: "health_buff_small",
    name: "Health Buff - Small",
    description: "Restores 10 health.",
    image: "assets/img/items/health_buff_small.png",
    rarity: "common", // common, rare, epic, legendary
    stackable: true,
    useable: true,
    removeable: true,
    sound: "health.wav" // Sound played when used (optional)
}
```

**Key Properties:**
- `id`: Unique string identifier.
- `name`: Display name.
- `description`: Shown to the player.
- `image`: Path to item image in `assets/img/items/`.
- `rarity`: Item rarity (affects pickup sound).
- `stackable`: Can stack in inventory.
- `useable`: Can be used (consumed/equipped).
- `removeable`: Can be removed from inventory.
- `sound`: Sound file played when used (optional).

---

## 3. Adding Item Assets

- Place item images in `assets/img/items/`.
- Use clear, descriptive file names matching the item’s `id`.
- For new sounds, place `.wav` files in `assets/sound/sfx/items/`.

---

## 4. Making Items Usable

- Set `useable: true` in the item definition.
- Add an effect function in `assets/js/inventory/itemEffects.js`:
    ```javascript
    ITEM_EFFECTS.health_buff_small = function(player) {
        player.setHealth(player.health + 10);
        notify("Restored 10 health!", 1500);
    };
    ```
- The effect function is called when the item is used from the inventory menu.

---

## 5. Adding Item Sounds

- Set the `sound` property in the item definition (e.g. `"health.wav"`).
- The sound will play when the item is used.
- Pickup sounds are played automatically based on item rarity (`common.wav`, `rare.wav`, etc.).

---

## 6. Item Types & Uses

- **Consumables:**  
  Buffs, potions, stat upgrades. Useable and often stackable.
- **Equipment:**  
  Weapons, armor. Usually not stackable, may not be useable.
- **Quest Items:**  
  Items required for quests. May be stackable or not, usually not useable.
- **Currency:**  
  Coins, trade items. Stackable, not useable.
- **Loot:**  
  Drops from enemies, used for quests or trading.

---

## 7. Example: Adding a New Item

1. **Create the image:**  
   Place `my_new_item.png` in `assets/img/items/`.
2. **Add the definition:**
    ```javascript
    my_new_item: {
        id: "my_new_item",
        name: "My New Item",
        description: "A mysterious artifact.",
        image: "assets/img/items/my_new_item.png",
        rarity: "epic",
        stackable: false,
        useable: true,
        removeable: true,
        sound: "artifact.wav"
    }
    ```
3. **Add the effect (if useable):**
    ```javascript
    ITEM_EFFECTS.my_new_item = function(player) {
        player.addAttack(5);
        notify("Attack increased by 5!", 1500);
    };
    ```
4. **Add the sound file:**  
   Place `artifact.wav` in `assets/sound/sfx/items/`.

---

## 8. Best Practices

- Use unique IDs for all items.
- Keep image and sound file names consistent with IDs.
- Test item pickup, usage, and removal in-game.
- For quest items, reference the item ID in your quest definitions.
- For trader/shop items, add them to `traders.js` for buy/sell options.

---
