// NPC definitions

const NPC_DEFINITIONS = {

    // -------- FLOOR 1 --------

    // Eldrin - First npc encounter
    eldrin_steward: {
        id: "eldrin_steward",
        name: "Eldrin the Steward",
        sprite: "assets/img/npc/eldrin.png",
        interactive: true, 
        spawns: [
            { map: 0,  x: 44, y: 43, wanderArea: { x1: 44, y1: 42, x2: 47, y2: 48 } }
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
            triggered: false
        }
    },

    
    // Old Rook - First encounter with the Teleport Stone
    old_rook: {
        id: "old_rook",
        name: "Old Rook",
        sprite: "assets/img/npc/npc_m_1.png", 
        interactive: true,
        spawns: [
            { map: 0, x: 42, y: 24, wanderArea: { x1: 41, y1: 23, x2: 43, y2: 25 } }
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
        questRedo: false, 
        forcedEncounter: {
            enabled: true,
            triggerTiles: [
                { x: 35, y: 24 },
                { x: 35, y: 25 }
            ],
            triggered: false 
        }
    },

    
    // Quest Giver
    mira_gatherer: {
        id: "mira_gatherer",
        name: "Mira the Gatherer",
        sprite: "assets/img/npc/npc_f_3.png", 
        interactive: true,
        spawns: [
            { map: 0, x: 2, y: 27, wanderArea: { x1: 1, y1: 25, x2: 4, y2: 28 } }
        ],
        dialogue: {
            default: [
                "Oh! A new face among the stones. Welcome to Verdant Rise, traveler.",
                "If you’re looking to prove your mettle, the Vicious Plants around here drop something called Dewleaf. It’s prized by healers and cooks alike.",
                "Would you mind gathering a few for me? The plants can be tricky—watch for their snapping jaws in the tall grass."
            ],
            questGiven: [
                "Bring me 3 Dewleaf from the Vicious Plants. You’ll find them lurking in the grass. Good luck!"
            ],
            questIncomplete: [
                "Still searching? Take your time—the plants aren’t going anywhere. Just be careful out there."
            ],
            questComplete: [
                "You found them! Thank you, traveler. The healers will be grateful.",
                "If you ever find more Dewleaf, I’ll always have a reward for you.",
                "Strange, isn’t it, how the world seems to remember us? Sometimes I find echoes—shimmers in the air, like memories left behind."
            ]
        },
        questId: "dewleaf_gather",
        questRedo: true // Repeatable quest
    },


    // Quest Giver
    finn_apprentice: {
        id: "finn_apprentice",
        name: "Finn the Apprentice",
        sprite: "assets/img/npc/npc_m_2.png",
        interactive: true,
        spawns: [
            { map: 0, x: 25, y: 8, wanderArea: { x1: 18, y1: 7, x2: 26, y2: 9 } }
        ],
        dialogue: {
            default: [
                "Hey there! You’re new, right? Don’t worry, everyone starts somewhere.",
                "Eldrin says the best way to learn is by doing. Around here, that means facing a few Groovy Slimes.",
                "They look harmless, but they’ll keep you on your toes. Defeat a few and you’ll feel your skills sharpening already!",
                "Come back and tell me how it went—I’m always curious to see how newcomers handle their first challenge."
            ],
            questGiven: [
                "Defeat 5 Groovy Slimes. They bounce all over the fields—just watch out for their surprise attacks!"
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


    // Lore Building
    lira_botanist: {
        id: "lira_botanist",
        name: "Lira the Botanist",
        sprite: "assets/img/npc/npc_f_2.png",
        interactive: true,
        spawns: [
            { map: 0, x: 30, y: 41, wanderArea: { x1: 28, y1: 37, x2: 41, y2: 48 } }
        ],
        dialogue: {
            default: [
                "Have you ever noticed how the flowers here bloom in patterns? Some say the Architect weaves messages into their petals.",
                "If you listen closely, you might hear the grass whisper old secrets. This land remembers more than it reveals."
            ]
        }
    },


    // Lore Building
    mirae_dreamer: {
        id: "mirae_dreamer",
        name: "Mirae the Dreamer",
        sprite: "assets/img/npc/npc_f_1.png",
        interactive: true,
        spawns: [
            { map: 0, x: 26, y: 24, wanderArea: { x1: 21, y1: 19, x2: 33, y2: 30 } }
        ],
        dialogue: {
            default: [
                "Sometimes, when I close my eyes, I see glimpses of other places; towers in the clouds, forests made of crystal. Do you ever dream of somewhere else?",
                "I like to watch the sky change. Here, every dawn feels like a new chance, don’t you think?"
            ]
        }
    },

    // -------- FLOOR 2 --------
    
};

// Enemy type definitions
const ENEMY_TYPES = {

    // -------- FLOOR 1 --------

    // Groovy Slime
    slime_01: {
        id: "slime_01",
        name: "Groovy Slime",
        sprite: "assets/img/enemy/slime_01.png",
        moveSpeed: 0.7,                  // Speed at which the enemy moves
        distance: 3,                   // Distance the enemy will become hostile to player
        maxHealth: 10,                 // Max health
        attack: 2,                     // Attack damage
        defense: 1,                    // Defense amount
        speed: 1,                      // Attack speed
        xpGain: 5,                     // Experience points gained when defeated
        loot: [                        // Loot items dropped by the enemy
            { item: "slime_ball", chance: 50, amount: [1, 2] }
        ],
        spawns: [
            { map: 0,  x: 30, y: 2, wanderArea: { x1: 24, y1: 0, x2: 36, y2: 5 } },
            { map: 0,  x: 35, y: 3, wanderArea: { x1: 24, y1: 0, x2: 36, y2: 5 } },
            { map: 0,  x: 26, y: 2, wanderArea: { x1: 24, y1: 0, x2: 36, y2: 5 } },
            { map: 0,  x: 41, y: 10, wanderArea: { x1: 39, y1: 0, x2: 48, y2: 12 } },
            { map: 0,  x: 46, y: 1, wanderArea: { x1: 39, y1: 0, x2: 48, y2: 12 } },
            { map: 0,  x: 41, y: 7, wanderArea: { x1: 39, y1: 0, x2: 48, y2: 12 } },
            { map: 0,  x: 48, y: 5, wanderArea: { x1: 39, y1: 0, x2: 48, y2: 12 } },
            { map: 0,  x: 46, y: 10, wanderArea: { x1: 39, y1: 0, x2: 48, y2: 12 } },
            { map: 0,  x: 16, y: 31, wanderArea: { x1: 15, y1: 27, x2: 17, y2: 35 } },
        ]
    },

    // Vicious Plant
    plant_01: {
        id: "plant_01",
        name: "Viscous Plant",
        sprite: "assets/img/enemy/plant_01.png",
        moveSpeed: 0.7,                  // Speed at which the enemy moves
        distance: 3,                   // Distance the enemy will become hostile to player
        maxHealth: 15,                 // Max health
        attack: 4,                     // Attack damage
        defense: 1,                    // Defense amount
        speed: 1,                      // Attack speed
        xpGain: 6,                     // Experience points gained when defeated
        loot: [                        // Loot items dropped by the enemy
            { item: "dewleaf", chance: 50, amount: [1, 2] }
        ],
        spawns: [
            { map: 0, x: 3, y: 5, wanderArea: { x1: 1, y1: 1, x2: 10, y2: 18 } },
            { map: 0, x: 9, y: 2, wanderArea: { x1: 1, y1: 1, x2: 10, y2: 18 } },
            { map: 0, x: 10, y: 15, wanderArea: { x1: 1, y1: 1, x2: 10, y2: 18 } },
            { map: 0, x: 4, y: 14, wanderArea: { x1: 1, y1: 1, x2: 10, y2: 18 } },
            { map: 0, x: 16, y: 40, wanderArea: { x1: 10, y1: 40, x2: 19, y2: 48 } },
            { map: 0, x: 11, y: 47, wanderArea: { x1: 10, y1: 40, x2: 19, y2: 48 } },
            { map: 0, x: 13, y: 41, wanderArea: { x1: 10, y1: 40, x2: 19, y2: 48 } },
            { map: 0, x: 16, y: 46, wanderArea: { x1: 10, y1: 40, x2: 19, y2: 48 } },
            { map: 0, x: 14, y: 23, wanderArea: { x1: 8, y1: 21, x2: 20, y2: 24 } },
        ]
    },

    // -------- FLOOR 2 --------

};
