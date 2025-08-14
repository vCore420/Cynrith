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
            { map: "title1",  x: 6, y: 6, wanderArea: { x1: 1, y1: 1, x2: 22, y2: 12 } },
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
        questRedo: true 
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
        questRedo: true 
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


    // Tharion - First encounter on floor 2
    tharion_waykeeper: {
        id: "tharion_waykeeper",
        name: "Tharion the Waykeeper",
        sprite: "assets/img/npc/npc_m_3.png",
        interactive: true,
        spawns: [
            { map: "title0",  x: 16, y: 9, wanderArea: { x1: 1, y1: 1, x2: 22, y2: 12 } },
            { map: 1, x: 39, y: 39, wanderArea: { x1: 36, y1: 38, x2: 40, y2: 41 } }
        ],
        dialogue: {
            default: [
                "Welcome to Stonewake, traveler. The land remembers more than it reveals.",
                "These stones once marked the path for pilgrims and dreamers; now, they test the resolve of those who would climb higher.",
                "Strength is not just in the arm, but in the spirit. To ascend, you must prove your resilience."
            ],
            questGiven: [
                "Stonewake’s trials demand endurance. Return to me when you have increased your maximum health by 20.",
                "The stones will sense your growth. Seek out relics, potions, or face the dangers of this floor to become stronger."
            ],
            questIncomplete: [
                "You have not yet grown strong enough. The stones await your proof—return when your maximum health has increased by 20."
            ],
            questComplete: [
                "You have proven your resilience. The stones hum in recognition, and the echoes of past pilgrims whisper their approval.",
                "With greater strength, new paths will open to you. Remember: every ascent is both a test and a blessing."
            ]
        },
        questId: "tharion_echoes",
        questRedo: false,
        forcedEncounter: {
            enabled: true,
            triggerTiles: [
                { x: 36, y: 42 },
                { x: 35, y: 43 },
                { x: 36, y: 43 },
                { x: 35, y: 41 }
            ],
            triggered: false
        }
    },


    // Detna - Lore Building Quest
    deyna_the_chronicler: {
        id: "deyna_the_chronicler",
        name: "Deyna the Chronicler",
        sprite: "assets/img/npc/npc_f_3.png",
        interactive: true,
        spawns: [
            { map: 1, x: 16, y: 18, wanderArea: { x1: 13, y1: 10, x2: 28, y2: 28 } }
        ],
        dialogue: {
            default: [
                "Every cycle, the forum fills with new voices and old stories. I record what I can, but much is lost to the Fracture.",
                "If you find any pages scattered in the expanse, bring them here. Every fragment helps us remember."
            ],
            questGiven: [
                "Please, gather 3 Lost Pages from the ruins. They're fragile, and often guarded by Echo Wisps.",
                "Bring them here, and I'll share some history with you."
            ],
            questIncomplete: [
                "Still searching? The pages are easily overlooked. Try near the old statues and broken pillars."
            ],
            questComplete: [
                "With these pages, the forum’s record grows. Let me read you what they reveal:",
                "\"Long ago, the world was shattered and rebuilt in layers by an unknown force. Each floor holds a fragment of the old world’s truth.\"",
                "\"Occasional flickers of digital distortion are seen as omens or spirits by many, but only a few sense their true meaning.\"",
                "\"Some say the Towerheart resides on the highest floor, a mythical source of power that can reshape Cynrith itself.\"",
                "Take this as you will. May your own story be remembered, traveler."
            ]
        },
        questId: "forum_pages",
        questRedo: false
    },


    // Lirael - Quest Giver
    lirael_herbalist: {
        id: "lirael_herbalist",
        name: "Lirael the Herbalist",
        sprite: "assets/img/npc/npc_f_2.png",
        interactive: true,
        spawns: [
            { map: "title0",  x: 13, y: 3, wanderArea: { x1: 1, y1: 1, x2: 22, y2: 12 } },
            { map: 1, x: 36, y: 47, wanderArea: { x1: 31, y1: 46, x2: 45, y2: 48 } }
        ],
        dialogue: {
            default: [
                "The earth here is stubborn, but life finds a way. I’ve seen flowers bloom from cracks in the ancient stones; each one a small miracle.",
                "But the Dustback Beetles make for a challenging harvest!",

            ],
            questGiven: [
                "Could you gather 10 Dustroot for me? Dustback Beetles seem to favor them as well.",
                "Be careful, they don't like sharing!"
            ],
            questIncomplete: [
                "No luck yet? Dustroot is rare, but look where the ancient stones stand."
            ],
            questComplete: [
                "Wonderful! With these, I can brew a remedy strong enough for even the toughest wounds.",
                "Here, take this potion. And if you ever need another, come find me."
            ]
        },
        questId: "liraels_dustroot",
        questRedo: true
    },


    // Mordis - Quest Giver
    mordis_relic_seeker: {
        id: "mordis_relic_seeker",
        name: "Mordis the Relic-Seeker",
        sprite: "assets/img/npc/npc_m_1.png",
        interactive: true,
        spawns: [
            { map: 1, x: 34, y: 21, wanderArea: { x1: 32, y1: 14, x2: 37, y2: 25 } }
        ],
        dialogue: {
            default: [
                "You’d be surprised what the earth gives up if you know where to look.",
                "Some say the best treasures are hidden by the Architect itself; reset, reshuffled, waiting for the right hands."
            ],
            questGiven: [
                "There's a relic deep in the caves, guarded by Echo Wisps. If you can bring me a Fractured Relic, I'll trade you something rare.",
                "And if you find any Glitch Fragments from Echo Wisps, I'll make it extra worthwhile."
            ],
            questIncomplete: [
                "No sign of the relic yet? The caves are tricky, but persistence pays off.",
                "Glitch Fragments are always welcome, too."
            ],
            questComplete: [
                "A real Fractured Relic! Impressive. Here’s your reward, may it serve you well.",
                "If you find more fragments or relics, come back. The Architect’s secrets are never truly lost."
            ]
        },
        questId: "mordis_relic",
        questRedo: true
    },


    // Mynel - Hint Giver
    mynel_resonant: {
    id: "mynel_resonant",
    name: "Mynel the Resonant",
        sprite: "assets/img/npc/npc_f_1.png",
        interactive: true,
        spawns: [
            { map: 1, x: 34, y: 6, wanderArea: { x1: 32, y1: 4, x2: 35, y2: 7 } }
        ],
        dialogue: {
            default: [
            "That stone over there has been humming all morning. Sometimes it gets so loud, I wonder if it's trying to say something.",
            "I've seen travelers touch it and strange things happen! Lights, sounds, even a feeling like the world shifts a little.",
            "If you're curious, maybe try standing close. Around here, you never know what might respond to a little attention."
        ]
        },
        forcedEncounter: {
            enabled: true,
            triggerTiles: [
                { x: 32, y: 9 },
                { x: 33, y: 9 },
                { x: 34, y: 9 },
                { x: 35, y: 9 }
            ],
            triggered: false
        }
    },


    // Sella - Lore Building
    sella_the_guide: {
        id: "sella_the_guide",
        name: "Sella the Guide",
        sprite: "assets/img/npc/npc_f_1.png",
        interactive: true,
        spawns: [
            { map: 1, x: 19, y: 12, wanderArea: { x1: 13, y1: 10, x2: 28, y2: 28 } }
        ],
        dialogue: {
            default: [
                "Welcome to the Forgotten Forum. Travelers gather here between journeys—some to trade, some to share stories, some just to remember.",
                "They say the forum returns with every cycle, no matter how the world changes. If you listen, you might hear echoes of old voices in the pillars."
            ]
        }
    },


    // Bram - Lore Building
    bram_the_lorekeeper: {
        id: "bram_the_lorekeeper",
        name: "Bram the Lorekeeper",
        sprite: "assets/img/npc/npc_m_3.png",
        interactive: true,
        spawns: [
            { map: 1, x: 23, y: 18, wanderArea: { x1: 13, y1: 10, x2: 28, y2: 28 } }
        ],
        dialogue: {
            default: [
                "Stonewake Expanse is older than most remember. The monoliths are memory anchors, left by the Firstfolk to keep the past from fading.",
                "When the Fracture came, whole towns vanished. Now, only the bravest seek out the lost places and the stories they hold."
            ]
        }
    },


    // Elynn - Lore Building
    elynn_the_wanderer: {
        id: "elynn_the_wanderer",
        name: "Elynn the Wanderer",
        sprite: "assets/img/npc/npc_f_2.png",
        interactive: true,
        spawns: [
            { map: 1, x: 16, y: 25, wanderArea: { x1: 13, y1: 10, x2: 28, y2: 28 } }
        ],
        dialogue: {
            default: [
                "Cynrith is a world of cycles; layers built on memories and magic. Some say the Architect watches every step, waiting to see who will ascend.",
                "If you find relics, look closely. Sometimes they whisper secrets from worlds that came before."
            ]
        }
    },
    
    // -------- FLOOR 3 --------   

    // Fernix - First Trader shop
    fernix_trader: {
        id: "fernix_trader",
        name: "Fernix the Barterer",
        sprite: "assets/img/npc/npc_m_3.png",
        interactive: true,
        spawns: [
            { map: 2, x: 20, y: 6, wanderArea: { x1: 18, y1: 4, x2: 24, y2: 7 } }
        ],
        dialogue: {
            default: [
                "Looking to trade? I deal in coin and curiosities from your travels for something useful.",
                "Show me what you’ve found, and I’ll show you what’s for sale. Simple as that."
            ]
        },
        trader: "trader1"
    },


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
        moveSpeed: 0.7,                 
        distance: 3,                 
        maxHealth: 15,              
        attack: 4,                
        defense: 1,             
        speed: 1,                 
        xpGain: 6,                   
        loot: [                     
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

    dustback_beetle: {
        id: "dustback_beetle",
        name: "Dustback Beetle",
        sprite: "assets/img/enemy/dustback_beetle.png",
        moveSpeed: 0.6,                
        distance: 3,                   
        maxHealth: 20,                 
        attack: 6,                     
        defense: 2,                    
        speed: 1,                      
        xpGain: 10,                     
        loot: [                        
            { item: "dustroot", chance: 40, amount: [1, 2] }
        ],
        spawns: [
            { map: 1, x: 24, y: 39, wanderArea: { x1: 18, y1: 37, x2: 31, y2: 48 } },
            { map: 1, x: 21, y: 44, wanderArea: { x1: 18, y1: 37, x2: 31, y2: 48 } },
            { map: 1, x: 29, y: 38, wanderArea: { x1: 18, y1: 37, x2: 31, y2: 48 } },
            { map: 1, x: 29, y: 31, wanderArea: { x1: 18, y1: 37, x2: 31, y2: 48 } },
            { map: 1, x: 5, y: 2, wanderArea: { x1: 1, y1: 1, x2: 14, y2: 7 } },
            { map: 1, x: 13, y: 6, wanderArea: { x1: 1, y1: 1, x2: 14, y2: 7 } },
            { map: 1, x: 4, y: 6, wanderArea: { x1: 1, y1: 1, x2: 14, y2: 7 } },
            { map: 1, x: 2, y: 43, wanderArea: { x1: 1, y1: 12, x2: 7, y2: 48 } },
            { map: 1, x: 5, y: 26, wanderArea: { x1: 1, y1: 12, x2: 7, y2: 48 } },
            { map: 1, x: 4, y: 17, wanderArea: { x1: 1, y1: 12, x2: 7, y2: 48 } },
            { map: 1, x: 5, y: 37, wanderArea: { x1: 1, y1: 12, x2: 7, y2: 48 } },
            { map: 1, x: 6, y: 18, wanderArea: { x1: 1, y1: 12, x2: 7, y2: 48 } },
        ]
    },


    echo_wisps: {
        id: "echo_wisps",
        name: "Echo Wisps",
        sprite: "assets/img/enemy/echo_wisps.png",
        moveSpeed: 0.8,
        distance: 4,
        maxHealth: 18,
        attack: 8,
        defense: 3,
        speed: 1.2,
        xpGain: 10,
        loot: [
            { item: "fractured_relic_1", chance: 10, amount: 1 }
        ],
        spawns: [
            { map: 1, x: 42, y: 10, wanderArea: { x1: 40, y1: 8, x2: 48, y2: 17 } },
            { map: 1, x: 46, y: 13, wanderArea: { x1: 40, y1: 8, x2: 48, y2: 17 } },
            { map: 1, x: 42, y: 10, wanderArea: { x1: 40, y1: 8, x2: 48, y2: 17 } },
            { map: 1, x: 35, y: 4, wanderArea: { x1: 23, y1: 1, x2: 43, y2: 4 } },
            { map: 1, x: 24, y: 2, wanderArea: { x1: 23, y1: 1, x2: 43, y2: 4 } },
            { map: 1, x: 39, y: 2, wanderArea: { x1: 23, y1: 1, x2: 43, y2: 4 } },
            { map: 1, x: 2, y: 27, wanderArea: { x1: 1, y1: 12, x2: 7, y2: 48 } },
        ]
    },


};
