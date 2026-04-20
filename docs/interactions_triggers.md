# Interactable & Trigger Tiles Guide

This guide explains the current authored behavior for interactable and trigger tiles in Cynrith.

Use these systems for:

- lore moments
- rewards and chests
- world flavor text
- quest objectives
- sound zones
- one-off scripted movement between spaces

---

## 1. Interactable Tiles Versus Trigger Tiles

### Interactable tiles

Interactable tiles are player-activated.

Current behavior:

- the player can activate them while adjacent or standing on them
- they can show notifications
- they can play dialogue
- they can grant rewards
- they can play trigger, loop, or ambient sounds
- they can optionally teleport the player after interaction

### Trigger tiles

Trigger tiles activate when the player steps directly on them.

Current behavior:

- dialogue trigger support is live
- rewards are live
- one-time removal is live
- trigger sound playback is live
- nearby ambient and loop sound behavior is live

Do not treat trigger warp or frame-change behavior as standard documented runtime behavior yet unless you have also added the required engine support.

---

## 2. Interactable Tile Definition

Define interactables in `assets/js/DEFINITIONS/interactTiles.js`.

Example:

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
        file: "statue_activate.mp3",
        type: "trigger"
    }
}
```

Important fields:

- `id`
- `map`, `x`, `y`
- `image` or `spriteSheet`
- `imageW`, `imageH`, `rows`, `cols`, `animSpeed`
- `zIndex`
- `collision`
- `notification`
- `dialogue`
- `rewards`
- `sound`

Important optional behavior fields:

- `allowRepeat`
- `persistAfterTrigger`
- `teleport`
- `animOnTrigger`

---

## 3. Trigger Tile Definition

Define trigger tiles in `assets/js/DEFINITIONS/triggerTiles.js`.

Example:

```javascript
{
    id: "echo_f3_1",
    map: 2,
    x: 14,
    y: 11,
    type: "dialogue",
    sound: { enabled: true, file: "echo.mp3", type: "ambient" },
    dialogue: [
        "An echo flickers: 'Not all who climb return.'"
    ],
    oneTime: true,
    rewards: [
        { id: "glitch_fragment", amount: 1 }
    ]
}
```

Important fields:

- `id`
- `map`, `x`, `y`
- `type`
- `dialogue`
- `rewards`
- `oneTime`
- `sound`

At the moment, a floor author should treat `type: "dialogue"` as the stable documented use unless they also confirm the runtime supports more.

---

## 4. Rewards and Repeat Behavior

Interactables and triggers can grant normal items and Home Plot items through the same reward flow.

That means a tile reward can:

- add a consumable
- add a quest item
- add a utility item
- route a Home item into Home storage automatically

Repeat and persistence notes:

- use `oneTime: true` on trigger tiles for single-use events
- use `allowRepeat: true` on interactables if they should remain reusable
- use `persistAfterTrigger: true` if an interactable should stay visible after being used

---

## 5. Collision and Layering

Interactables can block movement.

Collision behavior depends on:

- the tile's `collision` value
- the tile's `zIndex`
- the size of the image or sprite sheet frame

Practical rule:

- if it should feel like scenery the player walks behind, use `zIndex: 1`
- if it should occupy the ground and fully block, use `zIndex: 0`

Always test oversized interactables after placing them.

---

## 6. Sound Behavior

Interactables and triggers support three sound modes:

- `trigger`
- `ambient`
- `loop`

Current behavior:

- `trigger` plays once when the tile is activated
- `ambient` can play randomly while the player is nearby
- `loop` can fade in and out through distance-based nearby playback behavior

This makes tiles useful as both interaction objects and atmosphere anchors.

---

## 7. Teleporting Through Interactables

Interactable tiles can optionally teleport the player after interaction.

Use this for:

- mirrors
- special doors
- ritual spaces
- side-room access
- authored story transitions

If using teleports, test both the dialogue flow and the player's post-warp state.

---

## 8. Quest Integration

Interactable tiles can be used directly by `interactTiles` quest types.

Good uses:

- statue sequences
- shrine activation
- scattered memory objects
- search tasks

Trigger tiles are better for one-step story beats and automatic environmental encounters.

---

## 9. Best Practices

- use unique IDs
- place tiles where the player can actually reach them
- keep notifications short and readable
- test collision on large sprites
- test repeat behavior and one-time behavior separately
- use sound intentionally, not on every object
- use interactables for deliberate action and triggers for inevitable movement-based events

