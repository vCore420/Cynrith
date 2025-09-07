# Cynrith Skills Creation Guide

This guide explains how to add new skills to Cynrith, define their effects, pools, rarity, and advanced logic.

---

## 1. Skill Definition Format

Add new skills to `assets/js/DEFINITIONS/skills.js` using this template:

```javascript
{
    id: "skill_id",
    name: "Skill Name",
    img: "assets/img/skills/skill_image.png",
    description: "Describe what the skill does.",
    pool: "blue", // "blue", "red", "pink", or "all"
    chance: 1.0, // Higher = more common
    buffs: { attack: 10, regen: 2 }, // Stat increases
    drawbacks: { defence: -5 }, // Stat decreases
    rarity: "common" // "common", "rare", "epic", "legendary"
}
```

- **id:** Unique string identifier.
- **name:** Display name.
- **img:** Path to skill image.
- **description:** What the skill does.
- **pool:** Which gacha pool(s) the skill appears in.
- **chance:** Drop rate weight.
- **buffs:** Stat increases (health, attack, speed, etc.).
- **drawbacks:** Stat decreases.
- **rarity:** Determines upgrade cost and gem type.

---

## 2. Skill Effects

- **Buffs** and **drawbacks** are applied when the skill is equipped.
- Effects stack additively.
- Upgrading a skill increases its effects.

### Special Effects

- **regen:** Regenerates or drains health per second.
- **xpGain:** Adds or subtracts XP from all XP gained.
- **resistance:** Reduces the negative effects of other equipped skills.

For custom logic, coordinate with the game’s skill system in `menu.js`.

---

## 3. Skill Pools & Rarity

- **blue:** Early game, common skills.
- **red:** Mid game, rare/epic skills.
- **pink:** Late game, epic/legendary skills.
- **all:** Appears in every pool.

- **common:** Upgrades with blue gems.
- **rare:** Upgrades with red gems.
- **epic:** Upgrades with pink gems.
- **legendary:** Upgrades with double pink gems.

---

## 4. Adding Skill Images

- Place skill images in `assets/img/skills/`.
- Use PNG format, 64x64px recommended.

---

## 5. Advanced Skill Logic

- For skills requiring special logic (e.g. random stat boosts, conditional effects), add handling in `menu.js` or a dedicated skill logic file.
- Document any new stat types or effects in this guide for future contributors.

---

## 6. Testing & Balancing

- Test new skills in-game to ensure effects and upgrade costs work as intended.
- Adjust `chance` and stat values for game balance.

---

## 7. Submitting New Skills

- Add your skill definition to `skills.js`.
- Add the skill image to `assets/img/skills/`.
- Commit and push your changes, then open a Pull Request describing your new skill.

