// NPC definitions
const NPC_DEFINITIONS = {
    villager_bob: {
        id: "villager_bob",
        name: "Villager Bob",
        sprite: "assets/img/char/hero.png",
        interactive: true, 
        spawns: [
            {
                map: 0, 
                x: 2,
                y: 6,
                wanderArea: { x1: 2, y1: 6, x2: 4, y2: 9 }
            }
        ],
        dialogue: {
            default: [
                "Hello, traveler!",
                "The forest is dangerous at night."
            ],
            questGiven: [
                "Can you bring me 3 mushrooms?",
                "They're in the forest nearby."
            ],
            questComplete: [
                "Thank you for the mushrooms!",
                "Here is your reward."
            ]
        },
        questId: "mushroom_quest"
    },
    
    villager_jim: {
        id: "villager_jim",
        name: "Villager Jim",
        sprite: "assets/img/char/hero.png",
        interactive: true, 
        spawns: [
            {
                map: 0, 
                x: 26,
                y: 1,
                wanderArea: { x1: 26, y1: 1, x2: 28, y2: 3 }
            }
        ],
        dialogue: {
            default: [
                "Here you can use the Teleport stone to move to the next floor!"
            ],
            questGiven: [
                "Can you bring me 3 mushrooms?",
                "They're in the forest nearby."
            ],
            questComplete: [
                "Thank you for the mushrooms!",
                "Here is your reward."
            ]
        },
        questId: "first_floor"
    },
    // Add more NPCs here...
};

// Enemy type definitions
const ENEMY_TYPES = {
    slime: {
        id: "slime",
        name: "Slime",
        sprite: "assets/img/enemy/slime.png",
        moveSpeed: 2,                  // Speed at which the enemy moves
        distance: 3,                   // Distance the enemy will become hostile to player
        maxHealth: 10,                 // Max health
        attack: 3,                     // Attack damage
        defense: 1,                    // Defense amount
        speed: 1,                      // Attack speed
        xpGain: 5,                     // Experience points gained when defeated
        loot: [                        // Loot items dropped by the enemy
            { item: "potion", chance: 50, amount: [1, 3] }
        ],
        spawns: [
            {
                map: 0, 
                x: 2,
                y: 16,
                wanderArea: { x1: 2, y1: 16, x2: 6, y2: 19 }
            },
            {
                map: 1, 
                x: 3,
                y: 8,
                wanderArea: { x1: 3, y1: 8, x2: 5, y2: 13 }
            }
        ]
    },
    // Add more enemies here...
};
