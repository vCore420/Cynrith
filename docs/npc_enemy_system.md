# NPC & Enemy Definitions Guide

This guide explains the current NPC and enemy authoring model in Cynrith.

NPCs are not just dialogue holders. They can also act as:

- quest givers
- forced story encounters
- traders
- recurring floor anchors

Enemies are also part of floor feel, not only combat balance.

---

## 1. Where to Define Them

- NPCs live in `assets/js/DEFINITIONS/charactersData.js` under `NPC_DEFINITIONS`.
- Enemies live in the same file under `ENEMY_TYPES`.

---

## 2. NPC Definition Structure

Example:

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
    default: ["Welcome to Verdant Rise, traveler."],
    questGiven: ["Please collect 3 Dewleaf."],
    questIncomplete: ["Keep looking."],
    questComplete: ["Thank you."]
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
  trader: null
}
```

Important authored fields:

- `id`
- `name`
- `sprite`
- `interactive`
- `spawns`
- `dialogue`
- `questId`
- `questRedo`
- `forcedEncounter`
- `trader`

---

## 3. Dialogue States

Most quest NPCs use dialogue state blocks such as:

- `default`
- `questGiven`
- `questIncomplete`
- `questComplete`

Some NPCs only need a smaller structure.

For example, gift-style or one-off NPCs can work well with just:

- `default`
- `questComplete`

The right structure depends on the quest and scene, not on a single rigid format.

---

## 4. Spawns and Wander Areas

Each NPC or enemy can spawn on one or more maps.

Use `wanderArea` when a character should patrol or drift within a limited part of the map.

Practical notes:

- give characters enough room to move without colliding constantly
- avoid placing wander zones across important choke points
- test authored spaces with all nearby collision sources active

---

## 5. Forced Encounters

Forced encounters are a live authored system and should be documented as such when building story floors.

Current behavior:

- the player triggers them by stepping on specified trigger tiles
- the NPC can move into position automatically
- interaction prompts are suppressed while the forced encounter is in progress
- the encounter state is saved and loaded

Use forced encounters when:

- an NPC must stop the player once
- an introduction should happen at a specific space
- a narrative beat depends on movement through the room

Do not use them for every important NPC. They work best when they feel deliberate.

---

## 6. Trader NPCs

NPCs can open a trader menu by linking to a trader definition through the `trader` field.

A trader NPC is still a story character first. Their stock should reflect the floor's role.

Examples of current trader roles include:

- normal consumables
- gems for the skill system
- Home Plot decor
- inventory expansion items

See `docs/traders.md` for the stock format.

---

## 7. Enemy Definition Structure

Example:

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

Important enemy fields:

- `id`
- `name`
- `sprite`
- `moveSpeed`
- `distance`
- `maxHealth`, `attack`, `defense`, `speed`
- `xpGain`
- `loot`
- `spawns`

---

## 8. Enemy Sounds and Drops

Ambient enemy sounds are currently driven by naming conventions in `assets/sound/sfx/enemy/`.

Enemy defeat can contribute to:

- item economy
- quest progress
- floor identity through loot tables

When designing a floor, enemy drops should reinforce the floor's resources, not just fill inventory slots.

---

## 9. Best Practices

- use unique IDs
- keep dialogue blocks readable and state-based
- use forced encounters sparingly and intentionally
- test wander areas in the real finished room
- make traders feel specific to their floor
- keep enemy drops and ambient sounds tied to the space's identity
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
