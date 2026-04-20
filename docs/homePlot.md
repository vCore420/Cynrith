# Home Plot Guide

This guide explains how the Home Plot works in Cynrith and what floor authors need to know when designing rewards, traders, travel loops, and placeable content.

The Home Plot is not just a story location. It is a live engine system with its own inventory, placement rules, generated interiors, travel UI, and save data.

---

## 1. What the Home Plot Is

- The main Home Plot map is `home_plot0`.
- The engine also supports generated Home interior maps for placed houses.
- Home Plot data is stored separately from normal inventory and map content.
- Floors can feed the Home Plot through quest rewards, hidden loot, trader stock, and special utility items.

Use the Home Plot when a floor should leave something behind in the player's world, not just in their stats or inventory.

---

## 2. Core Engine Concepts

The Home Plot system is driven by `assets/js/map/homePlot.js`.

Important concepts:

- `isHomePlotBaseMap(mapIndex)` checks if the current map is the main Home Plot map.
- `isHomeInteriorMap(mapIndex)` checks if the player is inside a generated house interior.
- `isHomeBuildRealm(mapIndex)` is the broad check used for Home Plot build logic.
- `window.homePlot.inventory` stores placeable items separately from the normal inventory.
- `window.homePlot.placed` stores placed objects across the Home Plot and generated interiors.
- `window.homePlot.interiorInstances` stores generated house interior data.

---

## 3. Home Plot Item Definitions

Home Plot items are still defined in `assets/js/DEFINITIONS/items.js`, but they must include Home-specific fields.

Example shape:

```javascript
home_chair_oak: {
    id: "home_chair_oak",
    name: "Oak Chair",
    description: "A sturdy oak chair for your Home Plot.",
    image: "assets/img/tile/chair_1.png",
    rarity: "common",
    stackable: true,
    useable: false,
    removeable: false,
    homePlaceable: true,
    homeDef: {
        spriteSheet: "assets/img/tile/chair_1.png",
        imageW: 64,
        imageH: 64,
        rows: 1,
        cols: 1,
        animSpeed: 0,
        zIndex: 0,
        collision: true,
        canStackOnPlaced: false,
        footprintW: 1,
        footprintH: 1
    }
}
```

Required Home fields:

- `homePlaceable: true`
- `homeDef: { ... }`

Important `homeDef` fields:

- `spriteSheet`, `imageW`, `imageH`, `rows`, `cols`, `animSpeed`
- `zIndex`
- `collision`
- `footprintW`, `footprintH`
- `canStackOnPlaced`

Optional house-specific fields may also be used for placeable buildings, such as door offsets and house interior behavior.

---

## 4. How Home Plot Rewards Work

Home Plot items do not go into the normal player inventory.

When a Home item is awarded through `addItem(itemId, amount)`:

- the engine detects `homePlaceable: true`
- the item is routed into Home storage
- the player gets a Home storage notification instead of a normal inventory update

This means floor authors can give Home rewards using the same reward flow as normal items.

Good sources for Home Plot rewards:

- quest rewards
- hidden chests
- interactable tiles
- trigger tiles
- traders
- one-off NPC gifts

---

## 5. Placement Rules

Placement is handled by the Home Plot customizer and the placement logic in `assets/js/map/homePlot.js`.

Important behavior:

- items can only be placed where `canPlaceHomeItem(itemId, x, y)` returns true
- collision checks include map collision, world sprites, interactable collision, and other placed Home objects
- placeable houses are restricted to the main Home Plot map
- interiors can contain furniture, but not more house exteriors

If a placeable item should be decorative only, give it a small footprint and no unusual interaction rules.

If it should shape the layout of the Home Plot, define its footprint carefully.

---

## 6. Houses and Interiors

Placed houses can generate their own interior map instances.

Key behavior:

- placing a house can create an interior instance automatically
- entering a house is handled by door-tile interaction
- leaving an interior returns the player to the parent placement's exterior door position
- removing a placed house can reclaim interior items before the exterior is removed

This allows floors to reward permanent structures, not just decorations.

---

## 7. Travel and Revisit Flow

The Home Plot also acts as a revisit hub.

At the Home Plot spawn stone:

- the player can open the Home Plot travel menu
- the menu is populated from discovered floors
- discovered floors come from `window.progression.visitedFloors`

This means a floor's revisit value matters. A floor can stay relevant because it has:

- a trader worth returning to
- a calm atmosphere
- unique loot or crafting-style rewards
- new decor families for the Home Plot
- a side location or named-map branch

---

## 8. The Key Without a Door

`key_without_a_door` is a special utility item.

It does not behave like a normal consumable.

When used:

- it can warp the player directly to `home_plot0`
- it does not consume itself
- it stores the return context for broader Home Plot flow

Use this as a reference when creating future utility items that trigger world behavior rather than pure stat changes.

---

## 9. How Floor Authors Should Use the Home Plot

When designing a new floor, ask:

- Does this floor give the player something to bring home?
- Does this floor introduce a decor family, furnishing style, or small structure?
- Does this floor support a trader who sells Home items later?
- Does this floor become worth revisiting because of its Home connection?

Good Home Plot content examples:

- small decorative flora
- floor-specific relic shelves or jars
- statues tied to floor themes
- fences, signs, gazebos, and houses
- unique quest gifts that feel personal rather than economic

---

## 10. Save and Import Behavior

Home Plot state is saved separately from normal map state.

Important behavior:

- placed items persist through saves
- Home storage persists through saves
- generated interiors persist through saves
- Home Plot state is exported and imported with the rest of the save data

If you add Home Plot content, test it across:

- normal save/load
- export/import
- warping between standard floors and Home Plot maps

---

## 11. Checklist for Adding Home Plot Content

- [ ] Item added to `ITEM_DEFINITIONS`
- [ ] `homePlaceable: true` set
- [ ] `homeDef` configured correctly
- [ ] image path points to the correct tile or world sprite asset
- [ ] footprint and collision tested
- [ ] reward source added to a floor, quest, tile, or trader
- [ ] placement tested on the Home Plot
- [ ] save/load tested

---

## 12. Related Docs

- `Floor_Creation_Guide.md`
- `docs/inventory_items.md`
- `docs/traders.md`
- `docs/maps_tiles.md`
- `Cynrith_Story_Core.md`