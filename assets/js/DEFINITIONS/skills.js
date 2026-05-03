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
        maxLevel: 99,
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
        maxLevel: 99,
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
        maxLevel: 99,
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
        maxLevel: 99,
        rarity: "rare"
    },

    // Red Gem Pool
    {
        id: "stonewake_fury",
        name: "Stonewake Fury",
        img: "assets/img/skills/stonewake_fury.png",
        description: "Unleash the fury of the Stonewake Expanse. Greatly increases attack, but lowers defense. Increases Health on Successful Defeat.",
        pool: "red",
        chance: 0.7,
        buffs: { attack: 18 },
        drawbacks: { defence: -8 },
        maxLevel: 99,
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
        maxLevel: 99,
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
        maxLevel: 99,
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
        maxLevel: 99,
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
        maxLevel: 99,
        rarity: "common"
    },
    {
        id: "echoes",
        name: "Echoes",
        img: "assets/img/skills/echoes.png",
        description: "The fallen linger. Next enemy inherits a portion of the defeated enemy's power.",
        pool: "pink",
        chance: 0.5,
        buffs: {},
        drawbacks: {},
        maxLevel: 20,
        rarity: "legendary"
    },
    {
        id: "bloodthirst",
        name: "Bloodthirst",
        img: "assets/img/skills/bloodthirst.png",
        description: "A hunger for combat. Chain hits to stack attack power. Gaps in combat reset your stacks.",
        pool: "red",
        chance: 0.7,
        buffs: { attack: 5 },
        drawbacks: {},
        maxLevel: 99,
        rarity: "rare"
    },
    {
        id: "hoarder",
        name: "Hoarder",
        img: "assets/img/skills/hoarder.png",
        description: "An eye for treasure. Defeat enemies to find items.",
        pool: "blue",
        chance: 1.0,
        buffs: {},
        drawbacks: {},
        maxLevel: 99,
        rarity: "common"
    },
    {
        id: "counter_strike",
        name: "Counter Strike",
        img: "assets/img/skills/counter_strike.png",
        description: "When hit, you have a chance to return half of that damage back at the attacker.",
        pool: "red",
        chance: 0.7,
        buffs: {},
        drawbacks: {},
        maxLevel: 99,
        rarity: "epic"
    },
    {
        id: "shattering_wave",
        name: "Shattering Wave",
        img: "assets/img/skills/shattering_wave.png",
        description: "When you hit an enemy, nearby foes may shatter from the impact for smaller damage.",
        pool: "red",
        chance: 0.6,
        buffs: {},
        drawbacks: {},
        maxLevel: 20,
        rarity: "epic"
    },
    {
        id: "rootbound",
        name: "Rootbound",
        img: "assets/img/skills/rootbound.png",
        description: "When you defeat an enemy, thorny vines erupt from their corpse, slowing nearby enemies.",
        pool: "blue",
        chance: 0.8,
        buffs: {},
        drawbacks: {},
        maxLevel: 99,
        rarity: "epic"
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

const HOARDER_LOOT_TABLE = [
    { itemId: "health_buff_small", weight: 0.30 },
    { itemId: "atk_buff_small", weight: 0.20 },
    { itemId: "def_buff_small", weight: 0.20 },
    { itemId: "maxHealth_buff_small", weight: 0.15 },
    { itemId: "atkSpeed_buff_small", weight: 0.10 },
    { itemId: "clarity_tincture", weight: 0.05 }
];



const SKILL_EFFECTS = {
    stonewake_fury: function(event, data, skillLevel) {
        if (event === 'onEnemyDefeated') {
            const healAmount = 5 * skillLevel;
            showDamagePopup(player.tile.x, player.tile.y, healAmount, "heal");
        }
    },

    fracture_echo: function(event, data, skillLevel) {
        if (event === 'onEquip') {
            // Example: Start a random stat boost interval (simulating "battle" effects)
            this.boostInterval = setInterval(() => {
                const stats = ["attack", "defence", "speed"];
                const randomStat = stats[Math.floor(Math.random() * stats.length)];
                const boost = 1 * skillLevel;
                player[randomStat] += boost;
                notify(`Fracture Echo: +${boost} ${randomStat} boost!`, 1200);
            }, 30000);  // Every 30 seconds
        } else if (event === 'onUnequip') {
            // Clean up the interval
            if (this.boostInterval) {
                clearInterval(this.boostInterval);
                this.boostInterval = null;
            }
        }
    },

    echoes: function(event, data, skillLevel) {
        if (event === 'onEnemyDefeated') {
            const enemy = data.enemy;
            // Store the defeated enemy's stats scaled by skill level
            window.echoesStoredStats = {
                attack: Math.floor(enemy.attack * (skillLevel * 0.1)),
                defence: Math.floor(enemy.defense * (skillLevel * 0.1)),
                health: Math.floor(enemy.maxHealth * (skillLevel * 0.1))
            };
            notify(`Echoes: A memory lingers...`, 1200);
            console.log(`[Echoes] Stored enemy stats:`, window.echoesStoredStats);
        } else if (event === 'onPlayerAttack') {
            // Apply stored stats as a temporary boost on next attack
            if (window.echoesStoredStats && !window.echoesApplied) {
                const statsToApply = window.echoesStoredStats;
                if (statsToApply && Number.isFinite(statsToApply.attack) && Number.isFinite(statsToApply.defence)) {
                    player.attack += statsToApply.attack;
                    player.defence += statsToApply.defence;
                }
                
                showDamagePopup(player.tile.x, player.tile.y, statsToApply.attack, "player");
                notify(`Echoes: +${statsToApply.attack} ATK, +${statsToApply.defence} DEF!`, 1000);
                
                window.echoesApplied = true;
                
                // Revert after 1 attack cycle
                setTimeout(() => {
                    player.attack -= statsToApply.attack;
                    player.defence -= statsToApply.defence;
                    window.echoesApplied = false;
                    window.echoesStoredStats = null;
                }, 2000);
            }
        }
    },

    bloodthirst: function(event, data, skillLevel) {
        if (event === 'onPlayerAttack') {
            // Initialize stacks if not present
            if (!this.stacks) this.stacks = 0;
            if (!this.stackBonus) this.stackBonus = 0;
            
            // Increment stacks (max 10)
            this.stacks = Math.min(10, this.stacks + 1);
            
            // Calculate bonus: +1 attack per stack + (skillLevel * 0.5) per stack
            const bonusPerStack = 1 + (skillLevel * 0.5);
            const newBonus = this.stacks * bonusPerStack;
            const bonusDifference = newBonus - this.stackBonus;
            
            // Apply bonus to player
            player.attack += bonusDifference;
            this.stackBonus = newBonus;
            
            notify(`Bloodthirst: ${this.stacks} stack(s)! +${Math.floor(this.stackBonus)} ATK`, 800);
            
            // Reset timer
            if (this.stackTimer) clearTimeout(this.stackTimer);
            this.stackTimer = setTimeout(() => {
                if (this.stacks && this.stackBonus) {
                    player.attack -= this.stackBonus;
                    notify(`Bloodthirst stacks faded...`, 1000);
                }
                this.stacks = 0;
                this.stackBonus = 0;
            }, 5000);
        } else if (event === 'onEquip') {
            this.stacks = 0;
            this.stackBonus = 0;
        } else if (event === 'onUnequip') {
            // Clean up on unequip
            if (this.stackBonus) {
                player.attack -= this.stackBonus;
            }
            if (this.stackTimer) clearTimeout(this.stackTimer);
            this.stacks = 0;
            this.stackBonus = 0;
        }
    },

    hoarder: function(event, data, skillLevel) {
        if (event === 'onEnemyDefeated') {
            const dropChance = Math.min(0.95, 0.10 + (skillLevel * 0.05));
            
            if (Math.random() < dropChance) {
                const totalWeight = HOARDER_LOOT_TABLE.reduce((sum, item) => sum + item.weight, 0);
                let roll = Math.random() * totalWeight;
                let selectedItem = null;
                
                for (const item of HOARDER_LOOT_TABLE) {
                    roll -= item.weight;
                    if (roll <= 0) {
                        selectedItem = item.itemId;
                        break;
                    }
                }
                
                if (selectedItem && ITEM_DEFINITIONS[selectedItem]) {
                    addItem(selectedItem, 1);
                    const itemName = ITEM_DEFINITIONS[selectedItem].name;
                    notify(`Hoarder: Found ${itemName}!`, 1200);
                    console.log(`[Hoarder] Dropped: ${itemName}`);
                }
            }
        }
    },

    counter_strike: function(event, data, skillLevel) {
        if (event !== "onPlayerTakeDamage") return;
        const enemy = data.enemy;
        const damageTaken = data.damage;
        if (!enemy || enemy.health <= 0) return;

        const chance = Math.min(0.95, skillLevel * 0.01);
        if (Math.random() >= chance) return;

        const reflected = Math.max(1, Math.floor(damageTaken * 0.5));
        enemy.health -= reflected;

        showDamagePopup(Math.round(enemy.x), Math.round(enemy.y), -reflected, "enemy");
        notify(`Counter Strike: Reflected ${reflected} damage!`, 1200);

        if (enemy.health <= 0) {
            handleEnemyDeath(enemy);
        }
    },

    shattering_wave: function(event, data, skillLevel) {
        if (event !== "onPlayerAttack") return;
        const mainEnemy = data.enemy;
        const mainDamage = data.damage;
        if (!mainEnemy) return;  // Only check if enemy exists, not health

        const procChance = Math.min(0.95, skillLevel * 0.05);
        if (Math.random() >= procChance) return;

        const splashDamage = Math.max(1, Math.floor(mainDamage * 0.35));
        const maxRange = 4;

        characters.forEach(char => {
            if (char.type !== "enemy" || char === mainEnemy || char.health <= 0) return;
            const dx = Math.abs(Math.round(char.x) - Math.round(mainEnemy.x));
            const dy = Math.abs(Math.round(char.y) - Math.round(mainEnemy.y));
            if (dx <= maxRange && dy <= maxRange) {
                char.health -= splashDamage;
                showDamagePopup(Math.round(char.x), Math.round(char.y), -splashDamage, "enemy");
                if (char.health <= 0) handleEnemyDeath(char);
            }
        });

        notify(`Shattering Wave: nearby enemies take ${splashDamage} damage!`, 1200);
    },

    rootbound: function(event, data, skillLevel) {
    if (event !== "onEnemyDefeated") return;
    const enemy = data.enemy;
    if (!enemy) return;

    const slowRadius = 3 + Math.floor(skillLevel * 0.15);
    const slowDuration = 5000 + (skillLevel * 300);  // 5s + scales to ~11s at level 20
    const slowAmount = 0.5 - (skillLevel * 0.015);   // 0.5x speed down to ~0.2x at level 20

    characters.forEach(char => {
        if (char.type !== "enemy" || char === enemy || char.health <= 0) return;
        const dx = Math.abs(Math.round(char.x) - Math.round(enemy.x));
        const dy = Math.abs(Math.round(char.y) - Math.round(enemy.y));
        if (dx <= slowRadius && dy <= slowRadius) {
            // Store original moveSpeed if not already slowed
            if (!char._rootboundOriginalSpeed) {
                char._rootboundOriginalSpeed = char.moveSpeed || 2;
            }
            // Apply slow
            char.moveSpeed = char._rootboundOriginalSpeed * slowAmount;
            
            // Clear slow after duration
            setTimeout(() => {
                char.moveSpeed = char._rootboundOriginalSpeed;
                char._rootboundOriginalSpeed = null;
            }, slowDuration);
        }
    });

    notify(`Rootbound: vines entangle nearby enemies!`, 1200);
}
    // Add more skills here...
};