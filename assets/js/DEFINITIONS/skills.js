const Skills = [
    // Blue Gem Pool
    {
        id: "verdant_focus",
        name: "Verdant Focus",
        img: "assets/img/skills/verdant_focus.png",
        description: "A gentle attunement to the land. Slightly increases max health and defense.",
        pool: "blue",
        chance: 1.2,
        buffs: { maxHealth: 8, defence: 2 },
        drawbacks: {},
        maxLevel: 20,
        rarity: "common"
    },
    {
        id: "firstfolk_agility",
        name: "Firstfolk Agility",
        img: "assets/img/skills/firstfolk_agility.png",
        description: "The nimbleness of the Firstfolk. Slightly increases movement speed.",
        pool: "blue",
        chance: 1.0,
        buffs: { speed: 4 },
        drawbacks: {},
        maxLevel: 20,
        rarity: "common"
    },
    {
        id: "echo_guard",
        name: "Echo Guard",
        img: "assets/img/skills/echo_guard.png",
        description: "A faint echo of ancient protection. Slightly increases defense, but lowers attack.",
        pool: "blue",
        chance: 1.0,
        buffs: { defence: 5 },
        drawbacks: { attack: -2 },
        maxLevel: 20,
        rarity: "rare"
    },
    {
        id: "dewleaf_resilience",
        name: "Dewleaf Resilience",
        img: "assets/img/skills/dewleaf_resilience.png",
        description: "The healing power of dewleaf. Slightly increases health regeneration.",
        pool: "blue",
        chance: 1.0,
        buffs: { regen: 2 },
        drawbacks: {},
        maxLevel: 20,
        rarity: "rare"
    },

    // Red Gem Pool
    {
        id: "stonewake_fury",
        name: "Stonewake Fury",
        img: "assets/img/skills/stonewake_fury.png",
        description: "Unleash the fury of the Stonewake Expanse. Greatly increases attack, but lowers defense.",
        pool: "red",
        chance: 0.7,
        buffs: { attack: 18 },
        drawbacks: { defence: -8 },
        maxLevel: 20,
        rarity: "rare"
    },
    {
        id: "fracture_speed",
        name: "Fracture Speed",
        img: "assets/img/skills/fracture_speed.png",
        description: "Move like a glitch in the world. Greatly increases movement speed, but lowers max health.",
        pool: "red",
        chance: 0.5,
        buffs: { speed: 12 },
        drawbacks: { maxHealth: -10 },
        maxLevel: 20,
        rarity: "epic"
    },
    {
        id: "echo_wisdom",
        name: "Echo Wisdom",
        img: "assets/img/skills/echo_wisdom.png",
        description: "Gain insight from the echoes. Slightly increases experience gain.",
        pool: "red",
        chance: 0.8,
        buffs: { xpGain: 10 },
        drawbacks: {},
        maxLevel: 20,
        rarity: "rare"
    },

    // Pink Gem Pool (Late Game)
    {
        id: "architects_blessing",
        name: "Architect's Blessing",
        img: "assets/img/skills/architects_blessing.png",
        description: "A rare gift from the Architect. Greatly increases all stats, but at a cost.",
        pool: "pink",
        chance: 0.5,
        buffs: { attack: 20, defence: 20, speed: 10, maxHealth: 30 },
        drawbacks: { regen: -5 },
        maxLevel: 20,
        rarity: "legendary"
    },
    {
        id: "towerheart_resonance",
        name: "Towerheart Resonance",
        img: "assets/img/skills/towerheart_resonance.png",
        description: "Resonate with the Towerheart. Greatly increases skill effectiveness and experience gain.",
        pool: "pink",
        chance: 0.5,
        buffs: { xpGain: 25, attack: 10, defence: 10 },
        drawbacks: { speed: -5 },
        maxLevel: 20,
        rarity: "legendary"
    },
    {
        id: "fracture_echo",
        name: "Fracture Echo",
        img: "assets/img/skills/fracture_echo.png",
        description: "Harness the power of the Fracture. Randomly boosts one stat each battle.",
        pool: "pink",
        chance: 0.15,
        buffs: {}, // Logic for random stat boost handled in code
        drawbacks: {},
        maxLevel: 20,
        rarity: "epic"
    },

    // All Gem Pools
    {
        id: "quick_learner",
        name: "Quick Learner",
        img: "assets/img/skills/quick_learner.png",
        description: "You pick up new tricks faster. Slightly increases experience gain.",
        pool: "all",
        chance: 1.5,
        buffs: { xpGain: 5 },
        drawbacks: {},
        maxLevel: 20,
        rarity: "common"
    },
    {
        id: "iron_will",
        name: "Iron Will",
        img: "assets/img/skills/iron_will.png",
        description: "Your resolve is unbreakable. Slightly increases resistance to debuffs.",
        pool: "all",
        chance: 1.5,
        buffs: { resistance: 5 },
        drawbacks: {},
        maxLevel: 20,
        rarity: "common"
    },
    {
        id: "fleetfoot",
        name: "Fleetfoot",
        img: "assets/img/skills/fleetfoot.png",
        description: "You move with purpose. Slightly increases movement speed.",
        pool: "all",
        chance: 1.5,
        buffs: { speed: 3 },
        drawbacks: {},
        maxLevel: 20,
        rarity: "common"
    },
    {
        id: "gentle_touch",
        name: "Gentle Touch",
        img: "assets/img/skills/gentle_touch.png",
        description: "Your healing touch soothes wounds. Slightly increases health regeneration.",
        pool: "all",
        chance: 1.5,
        buffs: { regen: 1 },
        drawbacks: {},
        maxLevel: 20,
        rarity: "common"
    },

];


// Skill Definition Template

/*
{
    id: "unique_skill_id",
    name: "Skill Name",
    img: "assets/img/skills/skill_image.png",
    description: "Describe what the skill does.",
    pool: "blue", // "blue", "red", "pink", or "all"
    chance: 1.0, // Higher = more common
    buffs: { attack: 10, regen: 2 }, // Stat increases
    drawbacks: { defence: -5 }, // Stat decreases
    rarity: "common" // "common", "rare", "epic", "legendary"
},
*/