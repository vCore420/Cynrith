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
                "Take up this sword, it is both tool and teacher. Swing it with purpose, and you’ll soon find that strength grows with every challenge.",
                "Seek out others like myself, we are here to guide, not command. Your journey is your own, but remember, wisdom is often found in simple beginnings."
            ],
            questComplete: [
                "May the Architect watch over you. The world is wide, and your story has only just begun.",
                "If you ever feel lost, listen to the wind, or seek out the stones. They remember more than you might think.",
                "**Press the B Button (Spacebar) to use your Sword!**"
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
            { map: 0, x: 38, y: 24, wanderArea: { x1: 37, y1: 20, x2: 39, y2: 27 } }
        ],
        dialogue: {
            default: [
                "Ah, the Teleport Stone draws another wanderer. These ruins have seen more cycles than I can count.",
                "Long ago, the Firstfolk built these stones to mark the path between worlds. Now, only the brave, or the curious, dare use them.",
                "To travel, simply step close and let your intent guide you. The glyphs will answer, if you’re ready.",
                "Take these, an old traveler’s tricks. A few potions and a charm for luck. The next floor is never quite what you expect."
            ],
            questComplete: [
                "The stone hums when you approach. That’s a good sign. Remember, every floor has its own rules, but the Architect is always watching.",
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
                "Would you mind gathering a few for me? The plants can be tricky, watch for their snapping jaws in the tall grass."
            ],
            questGiven: [
                "Bring me 3 Dewleaf from the Vicious Plants. You’ll find them lurking in the grass. Good luck!"
            ],
            questIncomplete: [
                "Still searching? Take your time, the plants aren’t going anywhere. Just be careful out there."
            ],
            questComplete: [
                "You found them! Thank you, traveler. The healers will be grateful.",
                "If you ever find more Dewleaf, I’ll always have a reward for you.",
                "Strange, isn’t it, how the world seems to remember us? Sometimes I find echoes, shimmers in the air, like memories left behind."
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
                "Come back and tell me how it went, I’m always curious to see how newcomers handle their first challenge."
            ],
            questGiven: [
                "Defeat 5 Groovy Slimes. They bounce all over the fields, just watch out for their surprise attacks!"
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
            { map: "title2",  x: 19, y: 9, wanderArea: { x1: 1, y1: 1, x2: 25, y2: 25 } },
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
            { map: "title2",  x: 7, y: 14, wanderArea: { x1: 1, y1: 1, x2: 25, y2: 25 } },
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
                "Welcome to the Forgotten Forum. Travelers gather here between journeys, some to trade, some to share stories, some just to remember.",
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


    // Eira of the Veil - Quest Giver 
    eira_veil: {
        id: "eira_veil",
        name: "Eira of the Veil",
        sprite: "assets/img/npc/npc_f_2.png",
        interactive: true,
        spawns: [
            { map: 2, x: 8, y: 10, wanderArea: { x1: 5, y1: 9, x2: 11, y2: 13 } }
        ],
        dialogue: {
            default: [
                "You feel it, don’t you? The air here is thick with memory. The Architect’s hand lingers in every shadow.",
                "If you see a shimmer, follow it. Echoes hold secrets, sometimes warnings, sometimes gifts.",
                "Bring me any Glitch Fragments you find. I’m close to understanding the Thicket’s true nature."
            ],
            questGiven: [
                "Collect Glitch Fragments from echoes in the Thicket. Each one brings us closer to the truth."
            ],
            questIncomplete: [
                "Have you found any Glitch Fragments yet? The echoes are strongest near the mushrooms and flickering trees.",
                "The Thicket hides its secrets well. Keep searching, every fragment brings us closer to understanding."
            ],
            questComplete: [
                "These fragments pulse with old power. Thank you, traveler. The Thicket remembers your kindness."
            ]
        },
        questId: "eira_echo_fragments",
        questRedo: true
    },


    // The Whispering Shade - Echo NPC - Quest Giver (need asset for this npc made)
    whispering_shade: {
        id: "whispering_shade",
        name: "The Whispering Shade",
        sprite: "assets/img/npc/npc_m_2.png",
        interactive: true,
        spawns: [
            { map: 2, x: 26, y: 17, wanderArea: { x1: 21, y1: 13, x2: 29, y2: 19 } }
        ],
        dialogue: {
            default: [
                "You walk in two worlds, traveler. One remembers, one forgets.",
                "The Fracture is not a wound, but a door. Will you open it, or pass by?",
                "{ERROR: MEMORY NOT FOUND}",
                "The Architect watches. The cycle repeats."
            ],
            questGiven: [
                "Activate three glitching statues in the forest. Each holds lost memories."
            ],
            questIncomplete: [
                "The statues remain silent. Their memories are locked away until you activate them.",
                "Listen for the glitches in the forest. Only then will the echoes reveal their stories."
            ],
            questComplete: [
                "The echoes grow clearer. You have seen what others have missed."
            ]
        },
        questId: "shade_statue_echoes",
        questRedo: false
    },

 
    // Sakura the Dreamer - Quest Giver (Cherry Tree Grove)
    sakura_dreamer: {
        id: "sakura_dreamer",
        name: "Sakura the Dreamer",
        sprite: "assets/img/npc/npc_f_1.png",
        interactive: true,
        spawns: [
            { map: 2, x: 38, y: 8, wanderArea: { x1: 34, y1: 3, x2: 41, y2: 11 } }
        ],
        dialogue: {
            default: [
                "The pink blossoms remind me of a world I’ve never seen. Do you ever dream of places beyond the Thicket?",
                "Sometimes, the trees whisper names I don’t remember. Are they yours, or mine?"
            ],
            questGiven: [
                "Find a lost memory fragment. It may help me remember my dreams."
            ],
            questIncomplete: [
                "No sign of the lost memory yet? The cherry grove is full of memories, look where the petals gather.",
                "Sometimes, the wind carries fragments far from home. Keep searching, traveler."
            ],
            questComplete: [
                "Thank you. This memory feels familiar, somehow. Perhaps in another cycle, I knew its name."
            ]
        },
        questId: "sakura_lost_blossom",
        questRedo: false
    },

    // Bruk the Outcast - Quest Giver (Orc Patch)
    bruk_outcast: {
        id: "bruk_outcast",
        name: "Bruk the Outcast",
        sprite: "assets/img/npc/npc_m_1.png",
        interactive: true,
        spawns: [
            { map: 2, x: 4, y: 17, wanderArea: { x1: 1, y1: 15, x2: 6, y2: 19 } }
        ],
        dialogue: {
            default: [
                "Most orks here serve the Thicket’s will. I chose another path."
            ],
            questGiven: [
                "Help me sabotage these orcs, and I’ll share what I have of the old pacts.",
                "Defeat 25 orks to recover my lost totem. The forest hides many dangers."
            ],
            questIncomplete: [
                "The orks still hold their ground. Sabotage their traps and recover my totem if you can.",
                "Be careful—the Thicket twists even the bravest. My totem is the key to our old pacts."
            ],
            questComplete: [
                "You’ve done it! The old pacts are safe, for now. Take this as thanks."
            ]
        },
        questId: "bruk_sabotage",
        questRedo: false
    },

    // Myco the Luminous - Quest Giver (Flickering Forest Core)
    myco_luminous: {
        id: "myco_luminous",
        name: "Myco the Luminous",
        sprite: "assets/img/npc/npc_m_1.png",
        interactive: true,
        spawns: [
            { map: 2, x: 33, y: 49, wanderArea: { x1: 29, y1: 40, x2: 40, y2: 56 } }
        ],
        dialogue: {
            default: [
                "The mushrooms here pulse with memory. Some say they’re the Architect’s eyes.",
                "If you gather enough glowing caps, I can brew a potion to reveal hidden paths."
            ],
            questGiven: [
                "Collect bioluminescent mushrooms. With enough, I’ll make a potion to show you secrets."
            ],
            questIncomplete: [
                "Not enough glowing mushrooms yet? The brightest caps grow near the flickering lights.",
                "The potion needs more ingredients. Search deeper in the forest and bring me what you find."
            ],
            questComplete: [
                "Here is the potion. Drink it near the flickering trees where the light is strongest."
            ]
        },
        questId: "myco_mushroom_potion",
        questRedo: true
    },


    // Lirael the Rememberer - Lore 
    lirael_rememberer: {
        id: "lirael_rememberer",
        name: "Lirael the Rememberer",
        sprite: "assets/img/npc/npc_f_2.png",
        interactive: true,
        spawns: [
            { map: 2, x: 52, y: 22, wanderArea: { x1: 46, y1: 19, x2: 59, y2: 26 } }
        ],
        dialogue: {
            default: [
                "I’ve seen this forest before, in dreams and in waking. Each time, it changes and yet, it stays the same.",
                "The Architect’s game is older than any of us. We are pieces, but sometimes, pieces change the board."
            ]
        }
    },


    // Venn the Chronicler - Lore 
    venn_chronicler: {
        id: "venn_chronicler",
        name: "Venn the Chronicler",
        sprite: "assets/img/npc/npc_m_3.png",
        interactive: true,
        spawns: [
            { map: 2, x: 58, y: 10, wanderArea: { x1: 52, y1: 4, x2: 62, y2: 15 } }
        ],
        dialogue: {
            default: [
                "Have you seen them, traveler? The ones who wander with empty eyes, lost in the mist. Some say their minds were claimed by the Thicket itself.",
                "Others flicker and stutter, caught between moments, glitching, as if the world forgot how to remember them.",
                "I record their stories, even if they cannot speak. Every broken memory is a clue to the Architect’s design.",
                "Sometimes, I wonder if we are all just echoes, waiting for the cycle to reset."
            ]
        }
    },


    // Astra the Guide - Lore 
    astra_guide: {
        id: "astra_guide",
        name: "Astra the Guide",
        sprite: "assets/img/npc/npc_f_1.png",
        interactive: true,
        spawns: [
            { map: 2, x: 51, y: 54, wanderArea: { x1: 50, y1: 52, x2: 52, y2: 59 } }
        ],
        dialogue: {
            default: [
                "You’ve come far, traveler. The Thicket remembers you, even if you do not remember it.",
                "Beyond this stone, the world grows stranger. The Architect’s gaze sharpens."
            ]
        }
    },


    // Brain Dead/Glitching NPCs 
    ork_wanderer: {
        id: "ork_wanderer",
        name: "Ork Wanderer",
        sprite: "assets/img/npc/npc_m_1.png",
        interactive: true,
        spawns: [
            { map: 2, x: 14, y: 37, wanderArea: { x1: 10, y1: 25, x2: 16, y2: 40 } }
        ],
        dialogue: {
            default: [
                "...must find... the totem..."
            ]
        }
    },

    lost_adventurer: {
        id: "lost_adventurer",
        name: "Lost Adventurer",
        sprite: "assets/img/npc/npc_m_2.png",
        interactive: true,
        spawns: [
            { map: 2, x: 45, y: 27, wanderArea: { x1: 41, y1: 26, x2: 49, y2: 29 } }
        ],
        dialogue: {
            default: [
                "I was looking for the light. Did you see it?"
            ]
        }
    },

    fragment_searcher: {
        id: "fragment_searcher",
        name: "Fragment Searcher",
        sprite: "assets/img/npc/npc_f_1.png",
        interactive: true,
        spawns: [
            { map: 2, x: 59, y: 32, wanderArea: { x1: 56, y1: 27, x2: 60, y2: 38 } }
        ],
        dialogue: {
            default: [
                "{GLITCH} The cycle repeats. The cycle repeats."
            ]
        }
    },

    faded_botanist: {
        id: "faded_botanist",
        name: "Faded Botanist",
        sprite: "assets/img/npc/npc_f_2.png",
        interactive: true,
        spawns: [
            { map: 2, x: 37, y: 42, wanderArea: { x1: 35, y1: 38, x2: 39, y2: 44 } }
        ],
        dialogue: {
            default: [
                "Flowers bloom, then fade. I remember... nothing."
            ]
        }
    },

    mistbound_shade: {
        id: "mistbound_shade",
        name: "Mistbound Shade",
        sprite: "assets/img/npc/npc_m_2.png",
        interactive: true,
        spawns: [
            { map: 2, x: 22, y: 22, wanderArea: { x1: 18, y1: 22, x2: 25, y2: 23 } }
        ],
        dialogue: {
            default: [
                "I am... not myself. Are you?"
            ]
        }
    },

    cherry_grove_ghost: {
        id: "cherry_grove_ghost",
        name: "Cherry Grove Ghost",
        sprite: "assets/img/npc/npc_f_1.png",
        interactive: true,
        spawns: [
            { map: 2, x: 36, y: 18, wanderArea: { x1: 32, y1: 13, x2: 38, y2: 21 } }
        ],
        dialogue: {
            default: [
                "Pink petals fall, blue leaves flicker. Is this real?"
            ]
        }
    },

    mushroom_echoer: {
        id: "mushroom_echoer",
        name: "Mushroom Echoer",
        sprite: "assets/img/npc/npc_m_1.png",
        interactive: true,
        spawns: [
            { map: 2, x: 21, y: 52, wanderArea: { x1: 18, y1: 50, x2: 24, y2: 55 } }
        ],
        dialogue: {
            default: [
                "The lights... they blink out, then return. Why?"
            ]
        }
    },

    forest_watcher: {
        id: "forest_watcher",
        name: "Forest Watcher",
        sprite: "assets/img/npc/npc_m_3.png",
        interactive: true,
        spawns: [
            { map: 2, x: 9, y: 59, wanderArea: { x1: 5, y1: 56, x2: 12, y2: 62 } }
        ],
        dialogue: {
            default: [
                "The Architect... watches... always."
            ]
        }
    },


    // -------- Floor 4 --------


    // Trader near spawn point (limited range, buys only items from previous floors)
    glass_isle_vendor: {
        id: "glass_isle_vendor",
        name: "Vessel the Glass Isle Vendor",
        sprite: "assets/img/npc/npc_m_1.png",
        interactive: true,
        spawns: [
            { map: 3, x: 68, y: 77, wanderArea: { x1: 65, y1: 74, x2: 74, y2: 78 } }
        ],
        dialogue: {
            default: [
                "Welcome to the Shattered Spires, traveler. My wares are simple, but they may help you survive the glass and echoes.",
                "I only deal in goods from the lower floors, old roots, dewleaf, and fragments. If you have something from before, I’ll take it off your hands."
            ],
        },
        trader: "trader2"
    },


    // Trader near teleport stone (expanded range, sells advanced items, buys floor 4 loot)
    spire_gate_merchant: {
        id: "spire_gate_merchant",
        name: "Calyx the Spire Gate Merchant",
        sprite: "assets/img/npc/npc_f_3.png",
        interactive: true,
        spawns: [
            { map: 3, x: 36, y: 31, wanderArea: { x1: 34, y1: 28, x2: 38, y2: 33 } }
        ],
        dialogue: {
            default: [
                "You’ve come far, traveler. The Spires reward those who endure.",
                "Here you’ll find rare items, shards, fragments, and relics only found in this fractured place. I’ll buy what you’ve gathered from the Spires, if you’re willing to part with them."
            ],
        },
        trader: "trader3"
    },


    // First Main Npc for F4 - Forced Interaction & Story Quest
    lyra_lost_chorister: {
        id: "lyra_lost_chorister",
        name: "Lyra the Lost Chorister",
        sprite: "assets/img/npc/npc_f_1.png",
        interactive: true,
        spawns: [
            { map: 3, x: 55, y: 75, wanderArea: { x1: 53, y1: 74, x2: 59, y2: 77 } }
        ],
        dialogue: {
            default: [
                "Wait! Before you go further, listen: The Spires are not as they seem. Glass and song can shatter, and echoes here do not always return. Beware the broken bridges and the shadows that linger, they remember every mistake.",
                "If you lose your way, follow the melody. It may guide you through the chaos."
            ],
            questGiven: [
                "I am searching for the fragments of the Choir’s song. They are scattered across these islands, hidden among the glass and ruins. Will you help me gather them?",
                "Each fragment you find will restore a piece of harmony to this place. The Spires may remember their purpose if the song is made whole."
            ],
            questIncomplete: [
                "The song is still broken. There are more fragments out there, lost among the Shardlings and the shattered bridges.",
                "Listen for the melody, it grows stronger with each piece you recover."
            ],
            questComplete: [
                "You found them! The Choir’s song is clearer now, and the Spires seem to hum in gratitude.",
                "Thank you, traveler. With harmony returning, perhaps the Architect will show mercy to those who climb."
            ]
        },
        questId: "choir_fragments",
        questRedo: false,
        forcedEncounter: {
            enabled: true,
            triggerTiles: [
                { x: 61, y: 77 },
                { x: 61, y: 78 },
                { x: 61, y: 79 },
            ],
            triggered: false
        }
    },


    // The Sundered Echo - Floor 4 Quest NPC
    sundered_echo: {
        id: "sundered_echo",
        name: "The Sundered Echo",
        sprite: "assets/img/npc/npc_m_2.png",
        interactive: true,
        spawns: [
            { map: 3, x: 3, y: 3, wanderArea: { x1: 1, y1: 1, x2: 5, y2: 7 } }
        ],
        dialogue: {
            default: [
                "I saw the Architect here, once. My memories are scattered, find the lost echoes, and I may remember what was said.",
                "The Displaced Shadows linger, trapped by cycles and sorrow. Only by freeing them can the Spires move forward."
            ],
            questGiven: [
                "Activate 3 Echo Tiles on the side islands to release the Displaced Shadows. Each freed echo will reveal a line about the cycles of Cynrith.",
                "Return when you have set them free, and I will share what I remember."
            ],
            questIncomplete: [
                "Some Displaced Shadows remain trapped. The Echo Tiles are hidden among the islands.",
                "Only when all are freed will my memories return."
            ],
            questComplete: [
                "You have freed the Displaced Shadows. Their voices return, and so do my memories.",
                "\"We are built on cycles and fragments, each layer holding echoes of what came before.\"",
                "\"The Architect shapes us, but even it cannot remember everything.\"",
                "Thank you, traveler. The Spires feel less empty now."
            ]
        },
        questId: "sundered_echo_release",
        questRedo: false
    },


    // Archivist Venn - Floor 4 Quest NPC
    archivist_venn: {
        id: "archivist_venn",
        name: "Archivist Venn",
        sprite: "assets/img/npc/npc_m_3.png",
        interactive: true,
        spawns: [
            { map: 3, x: 73, y: 5, wanderArea: { x1: 67, y1: 2, x2: 77, y2: 10 } }
        ],
        dialogue: {
            default: [
                "Welcome, traveler. The Grand Hall used to be full of laughter and stories, but lately, it feels a bit empty.",
                "I once brewed Glassberry Tea for guests, sweet, warm, and a little tart. The recipe was stored on my favorite Glassberry Leaves, but now they're scattered into the winds.",
                "If you find any Glassberry Leaves, bring them here. Maybe together, we can restore a little comfort to these halls."
            ],
            questGiven: [
                "Gather 5 Glassberry Leaves from the islands. Each one is a piece of the old recipe and a memory worth saving."
            ],
            questIncomplete: [
                "Still searching? Take your time. The best tea is brewed with patience.",
                "Glassberry Leaves blew across the bridges."
            ],
            questComplete: [
                "You found them all! Let me brew us a cup...",
                "The aroma fills the hall, and for a moment, it feels like old times.",
                "\"In a world of broken glass and fading echoes, it's the small comforts that help us remember who we are.\"",
                "Thank you, traveler. You're always welcome here."
            ]
        },
        questId: "venn_glassberry_tea",
        questRedo: false
    },


    // Spires Sentinel - Flor 4 Quest Npc
    spires_sentinel: {
        id: "spires_sentinel",
        name: "Sentinel of the Spires",
        sprite: "assets/img/npc/npc_m_3.png",
        interactive: true,
        spawns: [
            { map: 3, x: 69, y: 54, wanderArea: { x1: 66, y1: 53, x2: 71, y2: 56 } }
        ],
        dialogue: {
            default: [
                "You feel the tension in the glass, don't you? The Spires are restless, and the Shardlings grow bold.",
                "Before anyone can ascend to the next floor, we must thin their numbers. It's not just safety, it's tradition.",
                "Prove your resolve: defeat 40 Shardlings. Only then will the way forward be clear."
            ],
            questGiven: [
                "The Shardlings swarm across the islands and bridges. Defeat 40 of them, and return to me. The Spires will know your strength."
            ],
            questIncomplete: [
                "The Shardlings still linger. Keep going, every one you defeat brings us closer to peace.",
                "Remember, the Spires watch those who prepare for what comes next."
            ],
            questComplete: [
                "You have done it! The Spires are quieter now, and the path to the next floor feels less uncertain.",
                "\"Strength is not just in the climb, but in the care for those who follow.\"",
                "Go on, traveler. The fifth floor awaits, and you have earned your place."
            ]
        },
        questId: "sentinel_shardling_cull",
        questRedo: true
    },


    // Great Hall Welcomer - Forced Encounter, Lore Npc
    great_hall_welcomer: {
        id: "great_hall_welcomer",
        name: "Keeper of the Hall",
        sprite: "assets/img/npc/npc_f_5.png",
        interactive: true,
        spawns: [
            { map: 3, x: 65, y: 3, wanderArea: { x1: 63, y1: 2, x2: 66, y2: 5 } }
        ],
        dialogue: {
            default: [
                "Ah, you’ve arrived. Welcome to the Great Hall, where the glass remembers every footstep and laughter once echoed from wall to wall.",
                "I’ve tended these halls for longer than I can recall. Some days, the memories are sharp as crystal; other days, they slip away like mist.",
                "Sit with me a moment. The Spires are not just stone and glass, they’re a patchwork of stories, old joys, and quiet heartbreaks.",
                "If you listen closely, you’ll hear the faint hum of the Choir’s song, and maybe, just maybe, a whisper of hope for what’s yet to come.",
                "You’re part of this place now, traveler. The Hall welcomes you, not just as a guest, but as a new memory worth keeping."
            ]
        },
        forcedEncounter: {
            enabled: true,
            triggerTiles: [
                { x: 62, y: 2 },
                { x: 62, y: 3 },
                { x: 62, y: 4 },
                { x: 62, y: 5 }
            ],
            triggered: false
        }
    },


    // Great Hall Scribe - Lore Npc
    great_hall_scribe: {
        id: "great_hall_scribe",
        name: "Scribe of the Hall",
        sprite: "assets/img/npc/npc_f_6.png",
        interactive: true,
        spawns: [
            { map: 3, x: 71, y: 11, wanderArea: { x1: 65, y1: 5, x2: 72, y2: 11 } }
        ],
        dialogue: {
            default: [
                "Long ago, the Spires rang with the voices of the Choir. Now, only echoes drift through these halls.",
                "I record what remains, a tale here, a fragment there. Sometimes, the glass remembers more than we do.",
                "They say the Architect once walked this floor, but left only riddles and reflections behind."
            ]
        }
    },


    // Great Hall Reflector - Lore Npc
    great_hall_reflector: {
        id: "great_hall_reflector",
        name: "The Hall’s Reflector",
        sprite: "assets/img/npc/npc_m_2.png",
        interactive: true,
        spawns: [
            { map: 3, x: 69, y: 9, wanderArea: { x1: 65, y1: 5, x2: 72, y2: 11 } }
        ],
        dialogue: {
            default: [
                "The glass in this hall once showed every memory, every hope. Now, it flickers with stories half-told.",
                "I watch the patterns in the light, sometimes they form faces, sometimes just lines. All are pieces of the Spires’ story.",
                "If you listen closely, you might hear the song that once held this place together."
            ]
        }
    },


};


/*
// NPC Template Example

const npc_template = {
    id: "unique_npc_id", // Unique string ID for this NPC
    name: "NPC Name",
    sprite: "assets/img/npc/npc_m_1.png", // Path to NPC sprite image
    interactive: true, // Can the player interact with this NPC?
    spawns: [
        { map: 0, x: 10, y: 10, wanderArea: { x1: 8, y1: 8, x2: 12, y2: 12 } }
        // Add more spawn locations as needed
    ],
    dialogue: {
        default: [
            "Default dialogue line 1.",
            "Default dialogue line 2."
        ],
        questGiven: [
            "Dialogue when quest is given."
        ],
        questIncomplete: [
            "Dialogue when quest is incomplete."
        ],
        questComplete: [
            "Dialogue when quest is complete."
        ]
        // Add/remove dialogue sections as needed
    },
    questId: "optional_quest_id", // Link to quest definition (if any)
    questRedo: false, // Can the quest be repeated?
    forcedEncounter: {
        enabled: false, // Set true for forced encounter
        triggerTiles: [
            // { x: 10, y: 10 }
        ],
        triggered: false
    },
    trader: null // Set trader ID if NPC is a shop/trader
};

*/


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
            { item: "dustroot", chance: 45, amount: [1, 2] }
        ],
        spawns: [
            { map: 1, x: 24, y: 39, wanderArea: { x1: 18, y1: 37, x2: 31, y2: 48 } },
            { map: 1, x: 21, y: 44, wanderArea: { x1: 18, y1: 37, x2: 31, y2: 48 } },
            { map: 1, x: 29, y: 38, wanderArea: { x1: 18, y1: 37, x2: 31, y2: 48 } },
            { map: 1, x: 29, y: 32, wanderArea: { x1: 27, y1: 31, x2: 34, y2: 34 } },
            { map: 1, x: 5, y: 2,  wanderArea: { x1: 1, y1: 1, x2: 14, y2: 7 } },
            { map: 1, x: 13, y: 6, wanderArea: { x1: 1, y1: 1, x2: 14, y2: 7 } },
            { map: 1, x: 4, y: 6,  wanderArea: { x1: 1, y1: 1, x2: 14, y2: 7 } },
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

    // -------- Floor 3 --------

    mistbound_ork: {
        id: "mistbound_ork",
        name: "Mistbound Ork",
        sprite: "assets/img/enemy/orc_01.png",
        moveSpeed: 0.7,
        distance: 3,
        maxHealth: 40,
        attack: 25,
        defense: 6,
        speed: 1.2,
        xpGain: 15,
        loot: [
            { item: "twilight_totem", chance: 10, amount: 1 },
            { item: "money", chance: 30, amount: [3, 5] }
        ],
        spawns: [
            { map: 2, x: 8, y: 24, wanderArea: { x1: 2, y1: 22, x2: 18, y2: 40 } },
            { map: 2, x: 13, y: 28, wanderArea: { x1: 2, y1: 22, x2: 18, y2: 40 } },
            { map: 2, x: 8, y: 32, wanderArea: { x1: 2, y1: 22, x2: 18, y2: 40 } },
            { map: 2, x: 13, y: 33, wanderArea: { x1: 2, y1: 22, x2: 18, y2: 40 } },
            { map: 2, x: 11, y: 37, wanderArea: { x1: 2, y1: 22, x2: 18, y2: 40 } },
            { map: 2, x: 16, y: 39, wanderArea: { x1: 2, y1: 22, x2: 18, y2: 40 } },
            { map: 2, x: 43, y: 11, wanderArea: { x1: 34, y1: 4, x2: 46, y2: 13 } },
            { map: 2, x: 40, y: 8, wanderArea: { x1: 34, y1: 4, x2: 46, y2: 13 } },
            { map: 2, x: 39, y: 11, wanderArea: { x1: 34, y1: 4, x2: 46, y2: 13 } },
            { map: 2, x: 25, y: 35, wanderArea: { x1: 20, y1: 25, x2: 26, y2: 38 } },
            { map: 2, x: 24, y: 30, wanderArea: { x1: 20, y1: 25, x2: 26, y2: 38 } },
            { map: 2, x: 22, y: 26, wanderArea: { x1: 20, y1: 25, x2: 26, y2: 38 } },
            { map: 2, x: 13, y: 46, wanderArea: { x1: 11, y1: 42, x2: 16, y2: 48 } },
            { map: 2, x: 32, y: 34, wanderArea: { x1: 30, y1: 22, x2: 33, y2: 36 } },
            { map: 2, x: 32, y: 34, wanderArea: { x1: 30, y1: 22, x2: 33, y2: 36 } },
            { map: 2, x: 31, y: 24, wanderArea: { x1: 30, y1: 22, x2: 33, y2: 36 } },
        ]
    },


    //-------- Floor 4 ---------

    shardling: {
        id: "shardling",
        name: "Shardling",
        sprite: "assets/img/enemy/shardling.png",
        moveSpeed: 1.1,
        distance: 3,
        maxHealth: 85,
        attack: 30,
        defense: 8,
        speed: 1.5,
        xpGain: 20,
        loot: [
            { item: "choir_fragment", chance: 20, amount: [1, 1] },
            { item: "glass_shard", chance: 60, amount: [1, 3] },
            { item: "money", chance: 40, amount: [5, 10] }
        ],
        spawns: [
            { map: 3, x: 23, y: 66, wanderArea: { x1: 4, y1: 60, x2: 29, y2: 77 } },
            { map: 3, x: 21, y: 72, wanderArea: { x1: 4, y1: 60, x2: 29, y2: 77 } },
            { map: 3, x: 14, y: 74, wanderArea: { x1: 4, y1: 60, x2: 29, y2: 77 } },
            { map: 3, x: 14, y: 69, wanderArea: { x1: 4, y1: 60, x2: 29, y2: 77 } },
            { map: 3, x: 9, y: 64,  wanderArea: { x1: 4, y1: 60, x2: 29, y2: 77 } },
            { map: 3, x: 6, y: 69,  wanderArea: { x1: 4, y1: 60, x2: 29, y2: 77 } },
            { map: 3, x: 27, y: 53, wanderArea: { x1: 19, y1: 48, x2: 31, y2: 56 } },
            { map: 3, x: 24, y: 51, wanderArea: { x1: 19, y1: 48, x2: 31, y2: 56 } },
            { map: 3, x: 22, y: 49, wanderArea: { x1: 19, y1: 48, x2: 31, y2: 56 } },
            { map: 3, x: 51, y: 61, wanderArea: { x1: 48, y1: 59, x2: 56, y2: 66 } },
            { map: 3, x: 24, y: 16, wanderArea: { x1: 14, y1: 9, x2: 30, y2: 31 } },
            { map: 3, x: 23, y: 22, wanderArea: { x1: 14, y1: 9, x2: 30, y2: 31 } },
            { map: 3, x: 17, y: 29, wanderArea: { x1: 14, y1: 9, x2: 30, y2: 31 } },
            { map: 3, x: 12, y: 3,  wanderArea: { x1: 6, y1: 0, x2: 40, y2: 7 } },
            { map: 3, x: 20, y: 2,  wanderArea: { x1: 6, y1: 0, x2: 40, y2: 7 } },
            { map: 3, x: 28, y: 2,  wanderArea: { x1: 6, y1: 0, x2: 40, y2: 7 } },
            { map: 3, x: 35, y: 4,  wanderArea: { x1: 6, y1: 0, x2: 40, y2: 7 } },
            { map: 3, x: 69, y: 16, wanderArea: { x1: 65, y1: 14, x2: 78, y2: 49 } },
            { map: 3, x: 75, y: 18, wanderArea: { x1: 65, y1: 14, x2: 78, y2: 49 } },
            { map: 3, x: 73, y: 21, wanderArea: { x1: 65, y1: 14, x2: 78, y2: 49 } },
            { map: 3, x: 74, y: 29, wanderArea: { x1: 65, y1: 14, x2: 78, y2: 49 } },
            { map: 3, x: 71, y: 34, wanderArea: { x1: 65, y1: 14, x2: 78, y2: 49 } },
            { map: 3, x: 72, y: 43, wanderArea: { x1: 65, y1: 14, x2: 78, y2: 49 } },
            { map: 3, x: 68, y: 48, wanderArea: { x1: 65, y1: 14, x2: 78, y2: 49 } },
            { map: 3, x: 50, y: 44, wanderArea: { x1: 40, y1: 28, x2: 52, y2: 46 } },
            { map: 3, x: 43, y: 42, wanderArea: { x1: 40, y1: 28, x2: 52, y2: 46 } },
            { map: 3, x: 46, y: 40, wanderArea: { x1: 40, y1: 28, x2: 52, y2: 46 } },
            { map: 3, x: 47, y: 37, wanderArea: { x1: 40, y1: 28, x2: 52, y2: 46 } },
            { map: 3, x: 42, y: 36, wanderArea: { x1: 40, y1: 28, x2: 52, y2: 46 } },
            { map: 3, x: 41, y: 32, wanderArea: { x1: 40, y1: 28, x2: 52, y2: 46 } },
        ]
    },

    displaced_shadow: {
        id: "displaced_shadow",
        name: "Displaced Shadow",
        sprite: "assets/img/enemy/displaced_shadow.png",
        moveSpeed: 0.8,
        distance: 2.5,
        maxHealth: 95,
        attack: 26,
        defense: 8,
        speed: 1.1,
        xpGain: 25,
        loot: [
            { item: "echo_fragment", chance: 40, amount: [1, 2] },
            { item: "memory_shard", chance: 25, amount: [1, 1] },
            { item: "money", chance: 40, amount: [5, 10] }
        ],
        spawns: [
            { map: 3, x: 10, y: 27, wanderArea: { x1: 4, y1: 15, x2: 14, y2: 31 } },
            { map: 3, x: 6, y: 22,  wanderArea: { x1: 4, y1: 15, x2: 14, y2: 31 } },
            { map: 3, x: 10, y: 17, wanderArea: { x1: 4, y1: 15, x2: 14, y2: 31 } },
            { map: 3, x: 40, y: 3,  wanderArea: { x1: 37, y1: 2, x2: 58, y2: 11 } },
            { map: 3, x: 46, y: 6,  wanderArea: { x1: 37, y1: 2, x2: 58, y2: 11 } },
            { map: 3, x: 52, y: 10, wanderArea: { x1: 37, y1: 2, x2: 58, y2: 11 } },
            { map: 3, x: 51, y: 27, wanderArea: { x1: 46, y1: 26, x2: 60, y2: 36 } },
            { map: 3, x: 56, y: 31, wanderArea: { x1: 46, y1: 26, x2: 60, y2: 36 } },
            { map: 3, x: 52, y: 35, wanderArea: { x1: 46, y1: 26, x2: 60, y2: 36 } },
            { map: 3, x: 58, y: 37, wanderArea: { x1: 46, y1: 26, x2: 60, y2: 36 } },
        ]
    },


};

/*
// Enemy Type Template Example

const enemy_template = {
    id: "unique_enemy_id", // Unique string ID for this enemy
    name: "Enemy Name",
    sprite: "assets/img/enemy/enemy_01.png", // Path to enemy sprite image
    moveSpeed: 1.0, // Movement speed
    distance: 3, // Hostile distance to player
    maxHealth: 20, // Maximum health
    attack: 5, // Attack damage
    defense: 2, // Defense value
    speed: 1, // Attack speed
    xpGain: 10, // XP gained when defeated
    loot: [ // Array of loot drops
        { item: "item_id", chance: 50, amount: [1, 2] }
        // Add more loot items as needed
    ],
    spawns: [
        { map: 0, x: 10, y: 10, wanderArea: { x1: 8, y1: 8, x2: 12, y2: 12 } }
        // Add more spawn locations as needed
    ]
};

*/