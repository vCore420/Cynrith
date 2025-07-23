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
            //questGiven: [
            //    "Can you bring me 3 mushrooms?",
            //    "They're in the forest nearby."
            //],
            //questComplete: [
            //    "Thank you for the mushrooms!",
            //    "Here is your reward."
            //]
        },
        questId: "mushroom_quest"
    },
    // Add more NPCs here...
};

// Enemy type definitions
const ENEMY_TYPES = {
    slime: {
        id: "slime",
        name: "Slime",
        sprite: "assets/img/enemy/slime.png",
        maxHealth: 10,
        attack: 2,
        defense: 1,
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
    // Add more enemy types here...
};