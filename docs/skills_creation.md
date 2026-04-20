# Cynrith Skills Creation Guide

This guide explains the current skill definition format and what floor authors should keep in mind when adding skills, gems, or trader support for the skill system.

---

## 1. Skill Definition Format

Skills are defined in `assets/js/DEFINITIONS/skills.js`.

Current template:

```javascript
{
    id: "skill_id",
    name: "Skill Name",
    img: "assets/img/skills/skill_image.png",
    description: "Describe what the skill does.",
    pool: "blue",
    chance: 1.0,
    buffs: { attack: 10, regen: 2 },
    drawbacks: { defence: -5 },
    maxLevel: 20,
    rarity: "common"
}
```

Important fields:

- `id`
- `name`
- `img`
- `description`
- `pool`
- `chance`
- `buffs`
- `drawbacks`
- `maxLevel`
- `rarity`

---

## 2. Supported Stat Patterns

Current skills already use effects such as:

- `attack`
- `defence`
- `speed`
- `maxHealth`
- `regen`
- `xpGain`
- `resistance`

Use the existing stat language where possible instead of inventing new keys casually.

---

## 3. Pools and Gems

Current pools:

- `blue`
- `red`
- `pink`
- `all`

Current rarity-to-gem expectations:

- `common` -> blue gem upgrades
- `rare` -> red gem upgrades
- `epic` -> pink gem upgrades
- `legendary` -> high-cost late-game upgrades

This matters for floors because traders and rewards can feed gem progression directly.

---

## 4. Advanced Logic

Most skills work through additive buffs and drawbacks.

Some effects require runtime support beyond raw numbers.

Examples:

- regen-based passive effects
- xp gain modifiers
- resistance interactions
- special-case skills whose main logic is handled in code rather than raw numeric buffs

If you add a skill that needs special runtime handling, document that clearly in the skill comments or the related gameplay docs.

---

## 5. Floor Authoring Notes

Even if you are not adding new skills, the skill system affects floor design.

Floors can support the system through:

- gem rewards
- trader stock
- quests tied to progression pacing
- late-floor reward structure

Do not design skill-related rewards in isolation from the trader and item economy.

---

## 6. Testing

- test skill acquisition
- test gacha pool availability
- test upgrade costs
- test stat application and removal on equip changes
- test any new special logic in active gameplay

