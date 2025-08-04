// NPC definitions
const NPC_DEFINITIONS = {
    eldrin_steward: {
        id: "eldrin_steward",
        name: "Eldrin the Steward",
        sprite: "assets/img/npc/eldrin.png",
        interactive: true, 
        spawns: [
            {
                map: 0, 
                x: 44,
                y: 43,
                wanderArea: { x1: 44, y1: 42, x2: 47, y2: 48 }
            }
        ],
        dialogue: {
            default: [
                "Ah, another soul steps into the green! Welcome, traveler, to Verdant Rise, the first of many floors beneath the Architect’s gaze.",
                "Here, every blade of grass and whisper of wind is shaped by laws both seen and unseen.",
                "Take up this sword—it is both tool and teacher. Swing it with purpose, and you’ll soon find that strength grows with every challenge.",
                "Seek out others like myself; we are here to guide, not command. Your journey is your own, but remember: wisdom is often found in simple beginnings."
            ],
            questComplete: [
                "May the Architect watch over you. The world is wide, and your story has only just begun.",
                "If you ever feel lost, listen to the wind—or seek out the stones. They remember more than you might think.",
                "**Press the B Button to use your Sword!**"
            ]
        },
        questId: "eldrin_intro",
        questRedo: false,
        forcedEncounter: {
            enabled: true,
            triggerTiles: [
                { x: 44, y: 46 },
                { x: 45, y: 46 },
                { x: 46, y: 46 },
                { x: 46, y: 47 },
                { x: 46, y: 48 },
                { x: 45, y: 48 },
                { x: 44, y: 48 },
                { x: 44, y: 47 }
            ],
            triggered: false // runtime flag, not persisted
        }
    },
    
    mira_gatherer: {
        id: "mira_gatherer",
        name: "Mira the Gatherer",
        sprite: "assets/img/npc/npc_f_3.png", 
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
                "Oh! A new face among the stones. Welcome to Verdant Rise, traveler.",
                "If you’re looking to prove your mettle, the Vicious Plants around here drop something called Dewleaf. It’s prized by healers and cooks alike.",
                "Would you mind gathering a few for me? The plants can be tricky—watch for their snapping jaws in the tall grass.",
                "Strange, isn’t it, how the world seems to remember us? Sometimes I find echoes—shimmers in the air, like memories left behind."
            ],
            questGiven: [
                "Bring me 3 Dewleaf from the Vicious Plants. You’ll find them lurking in the grass. Good luck!"
            ],
            questIncomplete: [
                "Still searching? Take your time—the plants aren’t going anywhere. Just be careful out there."
            ],
            questComplete: [
                "You found them! Thank you, traveler. The healers will be grateful.",
                "If you ever find more Dewleaf, I’ll always have a reward for you."
            ]
        },
        questId: "dewleaf_gather",
        questRedo: true // Repeatable quest
    },
    finn_apprentice: {
        id: "finn_apprentice",
        name: "Finn the Apprentice",
        sprite: "assets/img/npc/npc_m_1.png",
        interactive: true,
        spawns: [
            {
                map: 0,
                x: 34,
                y: 3,
                wanderArea: { x1: 30, y1: 1, x2: 36, y2: 5 }
            }
        ],
        dialogue: {
            default: [
                "Hey there! You’re new, right? Don’t worry, everyone starts somewhere.",
                "Eldrin says the best way to learn is by doing. Around here, that means facing a few Groovy Slimes.",
                "They look harmless, but they’ll keep you on your toes. Defeat a few and you’ll feel your skills sharpening already!",
                "Come back and tell me how it went—I’m always curious to see how newcomers handle their first challenge."
            ],
            questGiven: [
                "Defeat 3 Groovy Slimes. They bounce all over the fields—just watch out for their surprise attacks!"
            ],
            questIncomplete: [
                "Still working on those slimes? Take your time. Every battle is a lesson."
            ],
            questComplete: [
                "You did it! See? You’re already getting stronger. The Architect must have an eye on you.",
                "If you want more practice, I’m always happy to set another challenge."
            ]
        },
        questId: "slime_cull",
        questRedo: true // Repeatable quest
    },
    old_rook: {
        id: "old_rook",
        name: "Old Rook",
        sprite: "assets/img/npc/npc_m_1.png", 
        interactive: true,
        spawns: [
            {
                map: 0,
                x: 42,
                y: 24,
                wanderArea: { x1: 41, y1: 23, x2: 43, y2: 25 }
            }
        ],
        dialogue: {
            default: [
                "Ah, the Teleport Stone draws another wanderer. These ruins have seen more cycles than I can count.",
                "Long ago, the Firstfolk built these stones to mark the path between worlds. Now, only the brave—or the curious—dare use them.",
                "To travel, simply step close and let your intent guide you. The glyphs will answer, if you’re ready.",
                "Take these—old traveler’s tricks. A few potions and a charm for luck. The next floor is never quite what you expect."
            ],
            questComplete: [
                "The stone hums when you approach. That’s a good sign. Remember: every floor has its own rules, but the Architect is always watching.",
                "Safe travels, adventurer. May the echoes be kind."
            ]
        },
        questId: "rook_gift",
        questRedo: false, // One-time gift
        forcedEncounter: {
            enabled: true,
            triggerTiles: [
                { x: 35, y: 24 },
                { x: 35, y: 25 }
            ],
            triggered: false // runtime flag, not persisted
        }
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
            { item: "slime_ball", chance: 50, amount: [1, 2] }
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
            { item: "dewleaf", chance: 50, amount: [1, 2] }
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
                wanderArea: { x1: 24, y1: 1, x2: 31, y2: 5 } 
            },
            {
                map: 0, 
                x: 25,
                y: 3,
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
                x: 14,
                y: 28,
                wanderArea: { x1: 6, y1: 25, x2: 10, y2: 27 } 
            }
        ]
    },
    // Add more enemies here...
};
