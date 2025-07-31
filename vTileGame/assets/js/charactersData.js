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
                x: 2,
                y: 27,
                wanderArea: { x1: 1, y1: 25, x2: 4, y2: 28 }
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
    slime_01: {
        id: "slime_01",
        name: "Groovy Slime",
        sprite: "assets/img/enemy/slime_01.png",
        moveSpeed: 1,                  // Speed at which the enemy moves
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
                wanderArea: { x1: 1, y1: 15, x2: 11, y2: 22 }
            },
            {
                map: 0, 
                x: 3,
                y: 20,
                wanderArea: { x1: 1, y1: 15, x2: 11, y2: 22 }
            },
            {
                map: 0, 
                x: 9,
                y: 17,
                wanderArea: { x1: 1, y1: 15, x2: 11, y2: 22 }
            },
            {
                map: 0, 
                x: 24,
                y: 15,
                wanderArea: { x1: 22, y1: 12, x2: 28, y2: 28 }
            },
            {
                map: 0, 
                x: 27,
                y: 20,
                wanderArea: { x1: 22, y1: 12, x2: 28, y2: 28 }
            },
            {
                map: 0, 
                x: 25,
                y: 27,
                wanderArea: { x1: 22, y1: 12, x2: 28, y2: 28 }
            }
        ]
    },
    plant_01: {
        id: "plant_01",
        name: "Viscous Plant",
        sprite: "assets/img/enemy/plant_01.png",
        moveSpeed: 1,                  // Speed at which the enemy moves
        distance: 3,                   // Distance the enemy will become hostile to player
        maxHealth: 15,                 // Max health
        attack: 4,                     // Attack damage
        defense: 1,                    // Defense amount
        speed: 1,                      // Attack speed
        xpGain: 5,                     // Experience points gained when defeated
        loot: [                        // Loot items dropped by the enemy
            { item: "potion", chance: 1, amount: [1, 3] }
        ],
        spawns: [
            {
                map: 0, 
                x: 17,
                y: 7,
                wanderArea: { x1: 8, y1: 1, x2: 24, y2: 10 }
            },
            {
                map: 0, 
                x: 14,
                y: 3,
                wanderArea: { x1: 8, y1: 1, x2: 24, y2: 10 } 
            },
            {
                map: 0, 
                x: 9,
                y: 6,
                wanderArea: { x1: 8, y1: 1, x2: 24, y2: 10 } 
            },
            {
                map: 0, 
                x: 20,
                y: 2,
                wanderArea: { x1: 8, y1: 1, x2: 24, y2: 10 } 
            },
            {
                map: 0, 
                x: 21,
                y: 27,
                wanderArea: { x1: 6, y1: 25, x2: 24, y2: 28 } 
            },
            {
                map: 0, 
                x: 11,
                y: 25,
                wanderArea: { x1: 6, y1: 25, x2: 24, y2: 28 } 
            }
        ]
    },
    // Add more enemies here...
};
