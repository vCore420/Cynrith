// NPC definitions
const NPC_DEFINITIONS = {
    villager_bob: {
        id: "villager_bob",
        name: "Villager Bob",
        sprite: "assets/img/char/hero.png",
        wanderArea: { x1: 5, y1: 3, x2: 8, y2: 4 },
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
        wanderArea: { x1: 3, y1: 10, x2: 5, y2: 13 }
    },
    // Add more enemy types here...
};