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
                "Ah, there you are. Easy now, traveler, Verdant Rise has a gentle way of meeting new feet.",
                "Most who arrive stand still a moment. The wind, the stones, the grass, they all seem eager to be noticed here.",
                "This floor is kind, but not harmless. Take this weapon and keep it close. Out here, even simple things ask to be respected.",
                "Walk a little. Speak to the people scattered through the fields. Verdant Rise is where many begin, but it is not only a beginning."
            ],
            questComplete: [
                "That sits better in your hands already.",
                "If you feel unsure, do not rush upward. Learn the shape of this place first. A floor that welcomes you is worth remembering.",
                "**Press the B Button (Spacebar) to use your Weapon!**"
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
                "So, you've made your way to the old stone. Most do, sooner or later.",
                "People think these ruins are only for leaving, but that is not quite right. They are for remembering where you stood before you chose to go.",
                "The Firstfolk raised stones like these between lives, roads, and partings. Step close enough, and it listens for your intent.",
                "Take these. A traveler should never leave a quiet floor empty-handed, especially one that bothered to welcome them."
            ],
            questComplete: [
                "Hear that hum? It is not urging you onward. It is asking whether you are ready to leave well.",
                "Go if you must, traveler. Verdant Rise will still remember the shape of your steps."
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
                "Oh, hello there. You're newly arrived, aren't you? Verdant Rise always looks brighter when someone is seeing it for the first time.",
                "I'm gathering Dewleaf for the healers and cooks near the stones. The Vicious Plants cling to it like misers.",
                "If you're heading through the grass anyway, would you bring me a few? It helps to do something useful while you learn the lay of the land."
            ],
            questGiven: [
                "Bring me 3 Dewleaf from the Vicious Plants. Watch the tall grass, those snapping weeds like to pretend they're part of the scenery."
            ],
            questIncomplete: [
                "No rush. Verdant Rise teaches best when you walk it slowly, just keep your eyes open in the grass."
            ],
            questComplete: [
                "You found them, thank you. These will go to good use.",
                "That is the way of this floor, really. Small help, small kindness, and before long the place starts feeling familiar.",
                "Sometimes I think the world remembers those little acts better than the grand ones."
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
                "You're the newcomer Eldrin mentioned, right? Good, I was hoping you'd come this way.",
                "The Groovy Slimes up ahead keep drifting into the walking paths. They're not the worst thing in Cynrith, but they make folk nervous.",
                "If you can handle a few of them, you'll learn the rhythm of a real fight and do the floor a favor at the same time.",
                "Come back after, I want to hear how Verdant Rise feels when it starts pushing back."
            ],
            questGiven: [
                "Defeat 5 Groovy Slimes. Keep moving, don't crowd them, and don't let their wobbling fool you."
            ],
            questIncomplete: [
                "Still at it? That's fine. First fights are less about winning quickly and more about finding your footing."
            ],
            questComplete: [
                "Nicely done. See? The fields feel a little safer, and you look a little steadier.",
                "That's how it starts here. You help the place, and somehow it helps shape you back."
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
                "Verdant Rise likes attentive travelers. Flowers bend, stones hum, and odd little corners seem to wait for someone to notice them.",
                "If something glows, shivers, or simply feels placed with care, step close and press A. The world speaks softly before it speaks loud.",
                "Even in battle, that still matters. Move, watch, strike when it makes sense. Panic is what turns gentle places cruel.",
                "People call this the first floor as if that explains it. I think of it as the floor that teaches you how to pay attention."
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
                "Sometimes when the sky shifts, I feel as though I've stood here before, waiting for someone I have not met yet.",
                "Talk to the people you find. Cynrith opens more through conversation than force, especially in places like this.",
                "If you lose your sense of direction, check your quest notes and map, then slow down. Floors make more sense when you stop treating them like obstacles.",
                "And save often. Memory slips easily in Cynrith, but that doesn't mean your journey has to."
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
                "Welcome to Stonewake, traveler. Verdant Rise receives people. Stonewake tests what remains once the welcome has passed.",
                "These stones have outlived roads, homes, and whole names. When the Fractures came, this floor lost pieces of itself and learned to keep standing anyway.",
                "Many think strength is only what lets you climb. Here, strength is what lets you hold your shape when the world shifts around you."
            ],
            questGiven: [
                "The way forward does not open for the merely eager. Return to me when you have increased your maximum health by 20.",
                "Let Stonewake feel your resilience. Potions, relics, battle, whatever path you choose, the floor will know when you have grown into yourself."
            ],
            questIncomplete: [
                "Not yet. Stonewake is old enough to tell the difference between borrowed courage and true endurance."
            ],
            questComplete: [
                "There. The stones answer you now.",
                "Remember this: ascent is not only about becoming greater. Sometimes it is about remaining yourself while everything around you changes."
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
                "Every cycle, the forum gathers whatever memory the floor has not yet dropped.",
                "Stonewake forgets in patches. A page vanishes, a name slips, a wall stands where a doorway used to be. Writing things down is how we resist."
            ],
            questGiven: [
                "Please, gather 3 Lost Pages from the ruins. Echo Wisps tend to gather near what the floor is struggling to hold onto.",
                "Bring them back and I will read what Stonewake almost failed to keep."
            ],
            questIncomplete: [
                "Still searching? Look near old statues and broken pillars. Memory likes to cling to places that once mattered."
            ],
            questComplete: [
                "Yes... these are still legible. Listen:",
                "\"Long ago, the world was broken and laid into layers, each one carrying only part of what came before.\"",
                "\"Some losses were sudden. Others came slowly, as if the world were being rewritten while people were still living in it.\"",
                "\"What survives does so because someone, or something, keeps trying to carry it forward.\"",
                "That is enough for now. A history does not need to be whole to be worth protecting."
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
                "Stonewake looks harsh until you notice how hard life keeps trying here.",
                "Dustroot pushes up through cracks no one would call soil. I think that is why I love it.",
                "The Dustback Beetles love it too, unfortunately."
            ],
            questGiven: [
                "Could you gather 10 Dustroot for me? The beetles get to most of it before I do.",
                "I make remedies with it, not just for wounds, but for travelers who have started feeling worn thin by the climb."
            ],
            questIncomplete: [
                "No luck yet? Look near the old stones. Even damaged floors leave little pockets where life insists on returning."
            ],
            questComplete: [
                "Wonderful. This will keep a good few people on their feet.",
                "That is what I admire most in this world. Things break, yes, but they also persist in forms no one expected."
            ]
        },
        questId: "liraels_dustroot",
        questRedo: true
    },


    // Mordis - Quest Giver
    mordis_relic_seeker: {
        id: "mordis_relic_seeker",
        name: "Mordis the Relic-Seeker",
        sprite: "assets/img/npc/npc_m_4.png",       
        interactive: true,
        spawns: [
            { map: 1, x: 34, y: 21, wanderArea: { x1: 32, y1: 14, x2: 37, y2: 25 } }
        ],
        dialogue: {
            default: [
                "Old floors bury strange things. Not treasure, usually. More like leftovers from versions of the world that did not quite survive.",
                "Relics interest me because they stay consistent. In a place this weathered, consistency is worth coin."
            ],
            questGiven: [
                "There is a Fractured Relic somewhere in the caves, watched over by Echo Wisps. Bring it to me and I will make the trade worth your time.",
                "Those little scraps tell you where the world is still trying to stitch itself together."
            ],
            questIncomplete: [
                "Nothing yet? The caves are stubborn places. Keep at them. The oldest truths rarely sit near the surface."
            ],
            questComplete: [
                "A real Fractured Relic. Good. Heavy with memory, this one.",
                "Never mistake damage for uselessness, traveler. Some things only become valuable after the break."
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
                "That stone has been humming all morning. Some days it is quiet as dust, and some days it sounds as though it remembers something important.",
                "I have seen travelers touch old things here and get more than they expected. Light, sound, a pull in the chest, as if the floor noticed them back.",
                "If you're curious, stand close. Stonewake answers slowly, but it does answer."
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
                "Welcome to the Forgotten Forum. People call it a rest stop, but that makes it sound smaller than it is.",
                "When the Fractures tore through the lower floors, places like this survived by holding onto a clear shape of themselves. Anchors, some call them.",
                "A floor can lose detail, paths, even whole stories, but an anchor resists. It reminds the world what is meant to remain.",
                "That is why people gather here. In Cynrith, being remembered is not comfort alone. Sometimes it is protection."
            ]
        }
    },


    // Bram - Lore Building
    bram_the_lorekeeper: {
        id: "bram_the_lorekeeper",
        name: "Bram the Lorekeeper",
        sprite: "assets/img/npc/npc_m_5.png",
        interactive: true,
        spawns: [
            { map: 1, x: 23, y: 18, wanderArea: { x1: 13, y1: 10, x2: 28, y2: 28 } }
        ],
        dialogue: {
            default: [
                "Stonewake Expanse is a graveyard of old foundations. These monoliths are not monuments, they are memory locks.",
                "The Firstfolk carved names, routes, and warnings into them so the world would have to work harder to erase them.",
                "After the Fractures, whole settlements were reduced to fragments. The stones kept what they could, though never quite perfectly.",
                "That is the shape of lower Cynrith: worn, incomplete, but still trying very hard to remain itself."
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
                "Cynrith is layered like a buried archive. The farther you climb, the cleaner the record feels, but nothing is ever truly separate from what came before.",
                "People curse the Architect often enough, and perhaps fairly. But I am no longer convinced every change is cruelty just because it arrives through loss.",
                "Some layers fail. Some are repaired badly. Some open into stranger, better shapes than the old world knew how to hold.",
                "If you keep climbing, hold onto this: survival is not becoming someone else. It is learning how to stay yourself in a world that keeps rewriting the scenery."
            ]
        }
    },

    sella_anchorkeeper: {
        id: "sella_anchorkeeper",
        name: "Sella the Anchorkeeper",
        sprite: "assets/img/npc/npc_f_4.png",
        interactive: true, 
        spawns: [
            { map: 1,  x: 21, y: 11, wanderArea: { x1: 11, y1: 10, x2: 30, y2: 13 } }
        ],
        dialogue: {
            default: [
                "Anchors are rare things in Cynrith. Most places bend when the world shifts, but a few remember themselves well enough to remain.",
                "The Forum is one such place. It survives because people gather here, speak here, and leave pieces of themselves here.",
                "If you keep climbing, remember this: not everything worth finding lies ahead of you. Some things matter because they give you somewhere to return to."
            ],
            questComplete: [
                "You have carried yourself well through Stonewake. Better than most.",
                "Take this key. It does not belong to any door made by hands, yet it answers to a place that has endured every Fracture so far.",
                "It is an anchor, of a kind. A quiet place outside the usual wearing-down of these lower floors.",
                "Use it when you are ready. What waits there will not ask you to become someone new, only to make room for who you already are."
            ]
        },
        questId: "homeplot_key_gift",
        questRedo: false,
        forcedEncounter: {
            enabled: true,
            triggerTiles: [
                { x: 29, y: 10 },
                { x: 29, y: 11 },
                { x: 29, y: 12 },
                { x: 29, y: 13 },
                { x: 12, y: 10 },
                { x: 12, y: 11 },
                { x: 12, y: 12 },
                { x: 12, y: 13 }
            ],
            triggered: false
        }
    },
    

    // -------- FLOOR 3 --------   


    // Fernix - First Trader shop
    fernix_trader: {
        id: "fernix_trader",
        name: "Fernix the Barterer",
        sprite: "assets/img/npc/npc_m_6.png",
        interactive: true,
        spawns: [
            { map: 2, x: 20, y: 6, wanderArea: { x1: 18, y1: 4, x2: 24, y2: 7 } }
        ],
        dialogue: {
            default: [
                "Trade keeps people steady in a place like this. The Thicket takes more than blood if you let it.",
                "I buy what you carry out of the dark and sell what helps you come back with your name still in one piece.",
                "Nothing here stays simple for long. Best to prepare before the forest decides it has noticed you."
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
                "Stonewake remembered what was broken. Gloomroot remembers what was changed.",
                "The air here catches on old versions of things. Sometimes a branch, a voice, or a face lingers half a step behind itself.",
                "Glitch Fragments gather where the Thicket is failing to decide which memory to keep.",
                "Bring me a few. I want to know whether this floor is unraveling... or trying to repair itself."
            ],
            questGiven: [
                "Collect 5 Glitch Fragments from the echoes in the Thicket.",
                "Do not treat them like scraps. Hold one too long and you may feel a life that was never fully yours."
            ],
            questIncomplete: [
                "Not enough yet? Follow the places where the forest flickers or sounds too crowded for the space you are in.",
                "The Thicket hides its fractures under beauty, but not perfectly."
            ],
            questComplete: [
                "Yes... these are strong with residue.",
                "The Architect's hand is all over them, though not in the way the old stories warned us.",
                "I do not think this floor is simply corrupted. I think it is struggling to carry too much memory at once."
            ]
        },
        questId: "eira_echo_fragments",
        questRedo: true
    },


    // The Whispering Shade - Echo NPC - Quest Giver (need asset for this npc made)
    whispering_shade: {
        id: "whispering_shade",
        name: "The Whispering Shade",
        sprite: "assets/img/npc/npc_m_7.png",
        interactive: true,
        spawns: [
            { map: 2, x: 26, y: 17, wanderArea: { x1: 21, y1: 13, x2: 29, y2: 19 } }
        ],
        dialogue: {
            default: [
                "You walk where roots remember more than stone ever could.",
                "The statues are not broken. They are waiting for someone the cycle has not worn thin.",
                "{ERROR: MEMORY MISALIGNED}",
                "Wake them, traveler. Let the buried voices choose what remains."
            ],
            questGiven: [
                "Activate the 3 glitching statues hidden in the Thicket.",
                "Each one holds a memory the floor refused to lose, even after the change."
            ],
            questIncomplete: [
                "Not all are awake yet.",
                "Listen for the places where the forest hums in the wrong rhythm. That is where memory is pushing through."
            ],
            questComplete: [
                "The old signals answer again.",
                "Good. You have reminded the Thicket that forgetting is not the same as mercy."
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
                "This grove feels gentler than the rest of the Thicket, but not safer. Dreams settle here and refuse to leave.",
                "Sometimes the petals fall in patterns I almost understand, as if they are spelling out a memory just beyond recall.",
                "If you find a Memory Fragment, bring it to me. I want to know whether these dreams belonged to me... or to this place."
            ],
            questGiven: [
                "Find a Memory Fragment somewhere within the Cherry Grove.",
                "Look where the petals gather and the air feels briefly warmer, as though something is trying to be remembered kindly."
            ],
            questIncomplete: [
                "Nothing yet? That is all right. Some memories do not reveal themselves to those who rush them.",
                "The grove keeps what matters close."
            ],
            questComplete: [
                "This is it... I can feel the shape of something returning.",
                "Not the whole memory, only its outline, but that is enough to know it was real.",
                "Thank you. Sometimes being given back even a fragment is enough to keep going."
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
                "The others call this forest holy. I call it hungry.",
                "Mistbound orks do not all begin cruel. Stay in the Thicket long enough and it starts speaking louder than your own thoughts.",
                "I left before it could finish that work on me.",
                "Help me thin their number and recover my totem. I would rather not let the forest keep every piece of who I was."
            ],
            questGiven: [
                "Defeat 25 Mistbound Orks and recover my lost totem.",
                "Be careful. Some of them still sound like people right up until they swing."
            ],
            questIncomplete: [
                "Still at it? Good.",
                "Do not mistake hesitation for safety here. The Thicket exploits both fear and pity if you give it room."
            ],
            questComplete: [
                "You did it. Fewer of them roaming, and my totem back in hand.",
                "This will not undo what the Thicket took, but it helps.",
                "That matters more than people think. Some victories are only about keeping one true thing from being swallowed."
            ]
        },
        questId: "bruk_sabotage",
        questRedo: false
    },

    // Myco the Luminous - Quest Giver (Flickering Forest Core)
    myco_luminous: {
        id: "myco_luminous",
        name: "Myco the Luminous",
        sprite: "assets/img/npc/npc_m_2.png",
        interactive: true,
        spawns: [
            { map: 2, x: 33, y: 49, wanderArea: { x1: 29, y1: 40, x2: 40, y2: 56 } }
        ],
        dialogue: {
            default: [
                "These glowing caps do more than light the dark. They react to what the forest is trying to hide.",
                "Brewed correctly, they can make false paths stutter and hidden things confess themselves for a moment.",
                "Bring me enough bioluminescent mushrooms and I will make something useful of them."
            ],
            questGiven: [
                "Collect 6 bioluminescent mushrooms from the deeper Thicket.",
                "Choose carefully. The brightest ones are usually the ones growing closest to unstable places."
            ],
            questIncomplete: [
                "Need more? Then go where the light feels almost deliberate.",
                "The Thicket grows lanterns in the same places it grows lies."
            ],
            questComplete: [
                "Perfect. These will brew well.",
                "There. Take the potion when you are ready to see more than the floor usually allows.",
                "Just remember: revelation is not always comfort."
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
                "I have walked this forest in dreams, in waking, and perhaps in lives that no longer belong to me.",
                "That is what makes Gloomroot different. It does not only surround you, it overlaps you.",
                "The Architect feels closer here, though I cannot tell whether that is guidance, maintenance, or regret."
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
                "The ones wandering here with hollow eyes are not all dead, and not all alive in the usual sense.",
                "Some were worn thin by the cycles. Some were caught in revisions of the world that did not settle cleanly.",
                "I write them down because names are anchors. If the world insists on changing, then records become a form of mercy.",
                "Remember that as you climb. Forgetting is sometimes an accident, but sometimes it is a second death."
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
                "You have come far enough now to feel the pattern, haven't you?",
                "The lower floors endure. This one questions. By the time you leave Gloomroot, Cynrith should feel less like a place built for you and more like a place still being decided around you.",
                "Go carefully. The next steps upward are not only harder, they are stranger."
            ]
        }
    },


    // Brain Dead/Glitching NPCs 
    ork_wanderer: {
        id: "ork_wanderer",
        name: "Ork Wanderer",
        sprite: "assets/img/npc/npc_m_4.png",
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
        sprite: "assets/img/npc/npc_m_5.png",
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
                "These flowers bloom where the forest is trying to repair a memory."
            ]
        }
    },

    mistbound_shade: {
        id: "mistbound_shade",
        name: "Mistbound Shade",
        sprite: "assets/img/npc/npc_m_6.png",
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
                "Petals fall the same way every cycle. I think that is how this place comforts itself."
            ]
        }
    },

    mushroom_echoer: {
        id: "mushroom_echoer",
        name: "Mushroom Echoer",
        sprite: "assets/img/npc/npc_m_7.png",
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
        sprite: "assets/img/npc/npc_m_1.png",
        interactive: true,
        spawns: [
            { map: 2, x: 9, y: 59, wanderArea: { x1: 5, y1: 56, x2: 12, y2: 62 } }
        ],
        dialogue: {
            default: [
                "The Architect watches, yes... but lately it feels more like listening."
            ]
        }
    },


    // -------- Floor 4 --------


    // Trader near spawn point (limited range, buys only items from previous floors)
    glass_isle_vendor: {
        id: "glass_isle_vendor",
        name: "Vessel the Glass Isle Vendor",
        sprite: "assets/img/npc/npc_m_2.png",
        interactive: true,
        spawns: [
            { map: 3, x: 68, y: 77, wanderArea: { x1: 65, y1: 74, x2: 74, y2: 78 } }
        ],
        dialogue: {
            default: [
                "The Shattered Spires look delicate from a distance. Do not trust that. This floor breaks the careless and preserves the prepared.",
                "I buy what the lower floors still make reliably. Roots, leaves, relic scraps, anything with enough steadiness left in it to matter.",
                "Take healing before pride. Bridges fail, glass cuts, and the old systems here rarely break in ways that are fair.",
                "Out here, you do not pack for the path ahead alone. You pack for the path that changes behind you."
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
                "You reached the gate market. Good. That usually means you learned the Spires are not ruins in the simple sense. They still sort people.",
                "What I sell is for unstable country: recovery, steadiness, and enough force to end a bad encounter before the floor has time to complicate it.",
                "Shardlings are worst when they make you hold your ground too long. Reset often. Let the terrain belong to you, not to them.",
                "If you mean to press on toward Floor 5, carry something that buys time. Higher layers punish panic more cleanly than these ones do."
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
                "Stop a moment. If you walk these bridges as though they are only broken stone, the Spires will confuse you on purpose.",
                "This floor was built to preserve accord. Song, memory, record, intention. When that accord failed, the structure remained, but the harmony did not.",
                "I am trying to gather what is left of the Choir's fragments. Not to make the old order whole again, only to understand what it was trying to hold.",
                "Help me collect them. The Spires may never sing cleanly again, but they might still remember why they were made."
            ],
            questGiven: [
                "Search the islands and broken routes for 8 Choir Fragments.",
                "Each one is less a note than a surviving instruction. Gather enough, and the floor may begin to speak in something closer to its true voice."
            ],
            questIncomplete: [
                "There are more fragments still. Listen where the glass hums under your feet or where the air seems to answer itself.",
                "The Shardlings gather near them because even broken things can sense what the floor is trying to keep."
            ],
            questComplete: [
                "You brought them back... yes, I can hear the shape of it now.",
                "Not a song of perfection. A song of keeping. Of holding many parts together long enough for meaning to survive.",
                "That matters. The Choir did not fail because it cared too much. It failed because even care can split when the world changes too hard.",
                "Take this gratitude with you, traveler. The Spires remember you more clearly now."
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
        sprite: "assets/img/npc/npc_m_3.png",
        interactive: true,
        spawns: [
            { map: 3, x: 3, y: 3, wanderArea: { x1: 1, y1: 1, x2: 5, y2: 7 } }
        ],
        dialogue: {
            default: [
                "I remember the Architect here, though memory is too whole a word for what remains of me.",
                "This floor was trying to preserve too much at once. Some voices were stored. Some were stretched. Some were left walking after the moment they belonged to had already passed.",
                "The Displaced Shadows are not merely trapped. They are unfinished. Free them from the echo points and some of my own record may settle with theirs."
            ],
            questGiven: [
                "Find and activate the 3 Echo Tiles scattered through the Spires.",
                "Each release loosens one knot in the floor's memory. Return when the trapped voices have been given room to end properly."
            ],
            questIncomplete: [
                "Not all of them are free yet.",
                "You will know an echo point by the way the air seems to repeat your presence a heartbeat too late."
            ],
            questComplete: [
                "Yes... the pressure eases. Their voices are no longer caught in the same turn.",
                "\"The world was not shattered only by hatred or ruin, but by too many attempts to carry everything forward at once.\"",
                "\"The Architect did not spare us pain. It may not have known how.\"",
                "Take what meaning you can from that. The Spires were never empty. Only overburdened."
            ]
        },
        questId: "sundered_echo_release",
        questRedo: false
    },


    // Archivist Venn - Floor 4 Quest NPC
    archivist_venn: {
        id: "archivist_venn",
        name: "Archivist Venn",
        sprite: "assets/img/npc/npc_m_4.png",
        interactive: true,
        spawns: [
            { map: 3, x: 73, y: 5, wanderArea: { x1: 67, y1: 2, x2: 77, y2: 10 } }
        ],
        dialogue: {
            default: [
                "Welcome to the Grand Hall, traveler. Once this place received choirs, envoys, caretakers. Now it mostly receives dust and whoever still values memory enough to enter quietly.",
                "I keep records where I can. Not grand revelations, usually. Lists, names, recipes, seating orders, small comforts. Civilizations survive through details more often than through monuments.",
                "I have been trying to remake an old Glassberry Tea, the sort we served when the Hall still believed it had a future. The leaves were scattered across the islands when the bridges failed.",
                "Bring me what remains of them. I would like to prove this place can still offer welcome without pretending it is unbroken."
            ],
            questGiven: [
                "Gather 5 Glassberry Leaves from the Spires and return them to me.",
                "Preservation is not only archives and warnings. Sometimes it is the simple work of making one remembered thing well."
            ],
            questIncomplete: [
                "Still looking? That is fine. The Spires hide gentle things badly, but widely.",
                "Check the quieter routes and the edges of old gathering spaces. Comfort rarely blows far from where it was once needed."
            ],
            questComplete: [
                "You found them. Good. Let us see whether the Hall remembers this much, at least.",
                "There... the scent is right. Not perfect, but true enough.",
                "\"People endure by keeping rituals small enough to carry and meaningful enough to repeat.\"",
                "Sit as long as you like, traveler. A place does not have to be whole to still offer shelter."
            ]
        },
        questId: "venn_glassberry_tea",
        questRedo: false
    },


    // Spires Sentinel - Floor 4 Quest Npc
    spires_sentinel: {
        id: "spires_sentinel",
        name: "Sentinel of the Spires",
        sprite: "assets/img/npc/npc_m_5.png",
        interactive: true,
        spawns: [
            { map: 3, x: 69, y: 54, wanderArea: { x1: 66, y1: 53, x2: 71, y2: 56 } }
        ],
        dialogue: {
            default: [
                "You feel it, don't you? The tension in the glass. The structure is still holding, but not comfortably.",
                "Shardlings are what happens when maintenance outlives meaning. They keep cutting, gathering, reforming, long after anyone remembers the original command.",
                "We thin them not for glory, and not as ceremony. We do it so paths remain passable and the next traveler is not greeted by a swarm."
            ],
            questGiven: [
                "Defeat 40 Shardlings across the bridges and islands, then return to me.",
                "Let the Spires see that strength can still serve preservation instead of simple conquest."
            ],
            questIncomplete: [
                "There are still too many moving through the routes.",
                "Keep at it. Every cleared path is one more act of care in a floor that has forgotten how to care gently."
            ],
            questComplete: [
                "Good work. The routes are quieter now, and the glass has stopped ringing with constant impact.",
                "\"Not every defense looks noble. Sometimes it is only the repeated labor that keeps a place livable.\"",
                "Go on when you are ready. You have earned more than passage. You have earned trust."
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
                "A visitor. Good. The Hall prefers that people announce themselves by arriving rather than by trespassing in silence.",
                "Do not mistake this place for a corpse of splendor. It is still doing the work it was made for, only imperfectly now.",
                "These rooms once held agreement. Records were sung here. Decisions were harmonized here. When that harmony broke, the Hall kept the shape of welcome even after it lost certainty.",
                "Stay a moment if you wish. Presence matters in the Spires. Some structures remain standing because they are still inhabited, witnessed, and remembered.",
                "Carry that thought upward: a beautiful failure is still a form of survival."
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
                "The Choir did not use song for ornament. It was how they indexed memory, aligned intent, and taught the architecture what mattered.",
                "Now the notes return in fragments. A hall remembers a threshold. A bridge remembers a procession. A shard remembers only impact.",
                "That is why records matter. Broken harmony still leaves patterns, and patterns can be read if someone is patient enough.",
                "Look closely as you move. The Spires still explain themselves. They are simply no longer kind enough to explain twice."
            ]
        }
    },


    // Great Hall Reflector - Lore Npc
    great_hall_reflector: {
        id: "great_hall_reflector",
        name: "The Hall's Reflector",
        sprite: "assets/img/npc/npc_m_6.png",
        interactive: true,
        spawns: [
            { map: 3, x: 69, y: 9, wanderArea: { x1: 65, y1: 5, x2: 72, y2: 11 } }
        ],
        dialogue: {
            default: [
                "These mirrors were never meant to flatter. They were made to prioritize. To show the Hall what required attention, correction, or care.",
                "That is why reflections here can feel wrong. You are not always seeing yourself as you are. Sometimes you are seeing what the floor thinks you are carrying.",
                "I find that comforting, in an austere sort of way. Even damaged systems can still reveal truth, provided you stop demanding gentleness from them.",
                "If the Architect touched this place in grief, then the mirrors are grief made orderly: sharp, selective, and difficult to argue with."
            ]
        }
    },

    // ----- Floor 5 ----

    veyra_the_pale_archivist: {
        id: "veyra_the_pale_archivist",
        name: "Veyra the Pale Archivist",
        sprite: "assets/img/npc/npc_f_7.png",
        interactive: true,
        spawns: [ { map: 4, x: 42, y: 71, wanderArea: { x1: 35, y1: 69, x2: 49, y2: 74 } } ],
        dialogue: {
        default: [
            "Welcome to Umbracourt, traveler. The halls have been expecting someone in your shape.",
            "Do not trust every reflection here. Some mirrors show routes. Some show wishes. Some show the versions of you that never left.",
            "This floor keeps records in glass. Not only where you walked, but how you hesitated, what you feared, what you were willing to become."
        ],
        questGiven: [
            "Three Marked Mirrors still answer clearly. Find and touch them, then return to me.",
            "Each one holds a truer reflection than the rest. If the halls are willing to recognize you, the way forward will loosen."
        ],
        questIncomplete: [
            "Not all three yet. That is fine.",
            "Umbracourt does not test speed. It tests whether you can keep your sense of self while the world offers you cleaner, easier lies."
        ],
        questComplete: [
            "Yes... the halls know your outline now.",
            "Take this. Not as a prize, but as proof that you passed through reflection without surrendering yourself to it."
        ]
        },
        questId: "veyras_mirrors",
        questRedo: false,
        forcedEncounter: {
            enabled: true,
            triggerTiles: [
            { x: 37, y: 75 },
            { x: 37, y: 76 },
            { x: 37, y: 74 },
            { x: 38, y: 74 },
            { x: 39, y: 74 },
            { x: 39, y: 75 },
            { x: 39, y: 76 },
            { x: 38, y: 76 }
            ],
            triggered: false
        },
    },

    kael_mirrorscar: {
        id: "kael_mirrorscar",
        name: "Kael the Mirrorscarred",
        sprite: "assets/img/npc/npc_m_7.png",
        interactive: true,
        spawns: [
            { map: 4, x: 48, y: 75, wanderArea: { x1: 35, y1: 61, x2: 49, y2: 78 } }
        ],
        dialogue: {
            default: [
                "Careful where you look. These halls do not always reflect what is there. Sometimes they reflect what the floor thinks should be there.",
                "I once watched myself walk ahead of me, calm as anything, taking a turn I never chose. I still do not know which of us was real in that moment.",
                "If your reflection moves with too much confidence, do not follow it. Umbracourt loves a traveler who mistakes recognition for truth."
            ]
        }
    },

    sura_candlewright: {
        id: "sura_candlewright",
        name: "Sura the Candlewright",
        sprite: "assets/img/npc/npc_f_4.png",
        interactive: true,
        spawns: [
            { map: 4, x: 46, y: 65, wanderArea: { x1: 35, y1: 61, x2: 49, y2: 78 } }
        ],
        dialogue: {
            default: [
                "I make candles for people who need one steady thing in a hall full of revisions.",
                "The flames burn cold because heat would make the reflections dance too much. Here, clarity matters more than comfort.",
                "Each wick is tied to a name. If the candle gutters when you pass, it means the hall is trying to remember someone through you."
            ]
        }
    },

    dorian_gatewatch: {
        id: "dorian_gatewatch",
        name: "Dorian the Gatewatch",
        sprite: "assets/img/npc/npc_m_1.png",
        interactive: true,
        spawns: [
            { map: 4, x: 37, y: 64, wanderArea: { x1: 35, y1: 61, x2: 49, y2: 78 } }
        ],
        dialogue: {
            default: [
                "You are not the first to arrive here carrying resolve like armor.",
                "The Shadowed Hand used to speak as though these halls could be mastered. Now their certainty lingers longer than they do.",
                "Climb if you must. Just understand this floor keeps count, and it counts more than victories."
            ]
        }
    },

    umbra_quartermaster: {
        id: "umbra_quartermaster",
        name: "Rylin the Quartermaster",
        sprite: "assets/img/npc/npc_m_2.png",
        interactive: true,
        spawns: [
            { map: 4, x: 75, y: 68, wanderArea: { x1: 71, y1: 69, x2: 77, y2: 69 } }
        ],
        dialogue: {
            default: [
                "Supplies for mirror-country. I sell what helps you stay alive long enough to doubt the right things.",
                "Out there, brute force works until a reflection hands it back to you. Carry tonics, carry patience, and never trust a corridor simply because it was kind once.",
                "If the halls start feeling familiar, resupply before you feel relieved. Familiarity is one of Umbracourt's better traps."
            ]
        },
        trader: "trader4"
    },

    serin_mirror_warden: {
        id: "serin_mirror_warden",
        name: "Serin of the Warded Path",
        sprite: "assets/img/npc/npc_f_6.png",
        interactive: true,
        spawns: [
            { map: 4, x: 42, y: 28, wanderArea: { x1: 41, y1: 26, x2: 43, y2: 29 } } 
        ],
        dialogue: {
            default: [
                "Stop here. The chamber ahead does not merely test strength. It reflects habits, punishments, and certainties you have leaned on too heavily.",
                "Its keeper is a warden of recurrence. Strike without reading it, and you will spend the whole battle answering yourself.",
                "Speak to the others if you need to. In Umbracourt, surviving the truth of a place matters as much as surviving its blade."
            ]
        },
        forcedEncounter: {
            enabled: true,
            triggerTiles: [
                { x: 41, y: 29 }, 
                { x: 42, y: 29 }, 
                { x: 43, y: 29 }
            ],
            triggered: false
        }
    },

    lysa_mirror_scribe: {
        id: "lysa_mirror_scribe",
        name: "Lysa the Mirror Scribe",
        sprite: "assets/img/npc/npc_f_4.png",
        interactive: true,
        spawns: [
            { map: 4, x: 64, y: 72, wanderArea: { x1: 51, y1: 70, x2: 77, y2: 78 } }
        ],
        dialogue: {
            default: [
                "These halls record more than footsteps. They keep copies of choices, pauses, and the little turns a life might have taken.",
                "Echo Fragments are pieces of those discarded records. Bring me a few and I will show you how Umbracourt has begun writing you in among them."
            ],
            questGiven: [
                "Find 4 Echo Fragments in the halls and return them to me.",
                "Listen before you pocket them. If one hums in a pattern you almost recognize, that is the hall deciding you are part of its archive."
            ],
            questIncomplete: [
                "Not enough yet.",
                "They gather near patrol routes, dead ends, and places where a mirror offers more than one honest answer."
            ],
            questComplete: [
                "Yes, these are strong with residue.",
                "Do you hear it? The fragments are not only remembering older travelers anymore. Some of them are beginning to remember you.",
                "Take this and walk carefully. Being recorded is not the same thing as being understood."
            ]
        },
        questId: "umbrafloor_echoes",
        questRedo: true
    },

    naera_sigilbinder: {
        id: "naera_sigilbinder",
        name: "Naera the Sigilbinder",
        sprite: "assets/img/npc/npc_f_5.png",
        interactive: true,
        spawns: [
            { map: 4, x: 42, y: 54, wanderArea: { x1: 41, y1: 50, x2: 44, y2: 56 } }
        ],
        dialogue: {
            default: [
                "The Shadowed Hand left one remnant active in a side chamber ahead. It still clutches a Command Sigil and still believes order can be forced into obedience.",
                "Take the sigil if you can. Tools like that were made to quiet reflections, bind echoes, and make unstable things behave long enough to be useful."
            ],
            questGiven: [
                "Face the remnant in the side chamber and bring me its Command Sigil.",
                "If the Hand could not control Umbracourt in its fullness, I would at least like to see one of their symbols carried by someone less deluded."
            ],
            questIncomplete: [
                "The remnant still stands, then.",
                "Be careful. Old authority tends to become cruel after it outlives its purpose."
            ],
            questComplete: [
                "Good. The sigil is quieter already.",
                "Remember this when you carry it: control is not the same thing as understanding, no matter how often the Hand confused the two."
            ]
        },
        questId: "sigil_of_the_hand",
        questRedo: false
    },

    pale_archivist_echo: {
        id: "pale_archivist_echo",
        name: "Pale Archivist (Echo)",
        sprite: "assets/img/npc/npc_f_7.png",
        interactive: true,
        spawns: [
            { map: 4, x: 69, y: 12, wanderArea: { x1: 68, y1: 10, x2: 77, y2: 18 } }
        ],
        dialogue: {
            default: [
                "An echo of Veyra watches you with the calm of someone who has seen this moment many times before.",
                "\"You have met one remnant of the Hand. There were others once. Certainty ruined them more efficiently than fear ever could.\"",
                "\"Keep your name close. Umbracourt does not always steal it outright. Sometimes it only asks you to loosen your grip.\""
            ]
        }
    },

    orrin_lost_cartographer: {
        id: "orrin_lost_cartographer",
        name: "Orrin the Lost Cartographer",
        sprite: "assets/img/npc/npc_m_3.png",
        interactive: true,
        spawns: [
            { map: 4, x: 20, y: 65, wanderArea: { x1: 17, y1: 64, x2: 24, y2: 66 } }
        ],
        dialogue: {
            default: [
                "I mapped these halls once. Then I learned the mistake: Umbracourt is not interested in where you can go, only in which version of you arrives there.",
                "My paper became useless. The routes were right, but the mirrors kept changing what it meant to take them.",
                "If you get lost, listen before you move. A mirror that is eager to help you is usually hoping you will stop asking what it wants in return."
            ]
        }
    },

    isolde_gatebound: {
        id: "isolde_gatebound",
        name: "Isolde the Gatebound",
        sprite: "assets/img/npc/npc_f_6.png",
        interactive: true,
        spawns: [
            { map: 4, x: 6, y: 5, wanderArea: { x1: 2, y1: 2, x2: 11, y2: 7 } } 
        ],
        dialogue: {
            default: [
                "The portal ahead hums like a promise, but not a simple one.",
                "I watched the Shadowed Hand step through these thresholds believing they could command what came next. The halls let them think so for longer than was kind.",
                "If you go on, carry one memory you refuse to negotiate away. Higher floors do not always take from the body first."
            ]
        }
    },

    // Floor 6 

    cat_1: {            // Not sure why i hadnt thought of this until now.
        id: "Cat_1",
        name: "Wandering Cat",
        sprite: "assets/img/npc/cat_1.png",
        spriteWidth: 64,
        spriteHeight: 64,
        interactive: true,
        spawns: [
            { map: 5, x: 11, y: 28, wanderArea: { x1: 5, y1: 26, x2: 14, y2: 30 } },
            { map: "castle0", x: 9, y: 5, wanderArea: { x1: 1, y1: 3, x2: 12, y2: 8 } },
            { map: 5, x: 11, y: 5, wanderArea: { x1: 3, y1: 3, x2: 17, y2: 10 } },
        ],
        dialogue: {
            default: [
                "Mrrp.",
                "The cat circles your ankles once, then settles as if it has already decided you belong here.",
                "Prrrp."
            ]
        }
    },

    cat_2: {       
        id: "Cat_2",
        name: "Wandering Cat",
        sprite: "assets/img/npc/cat_2.png",
        spriteWidth: 64,
        spriteHeight: 64,
        interactive: true,
        spawns: [
            { map: 5, x: 7, y: 30, wanderArea: { x1: 5, y1: 26, x2: 14, y2: 30 } },
            { map: 5, x: 5, y: 6, wanderArea: { x1: 3, y1: 3, x2: 17, y2: 10 } },
            { map: 5, x: 12, y: 8, wanderArea: { x1: 3, y1: 3, x2: 17, y2: 10 } },
            { map: "title3", x: 19, y: 6, wanderArea: { x1: 2, y1: 2, x2: 23, y2: 10 } }
        ],
        dialogue: {
            default: [
                "Meow.",
                "It watches you with the calm certainty of a creature that has never once doubted this floor would remain kind.",
                "Mrrrow."
            ]
        }
    },

    cat_3: {       
        id: "Cat_3",
        name: "Wandering Cat",
        sprite: "assets/img/npc/cat_3.png",
        spriteWidth: 64,
        spriteHeight: 64,
        interactive: true,
        spawns: [
            { map: 5, x: 13, y: 30, wanderArea: { x1: 5, y1: 26, x2: 14, y2: 30 } },
            { map: "castle0", x: 4, y: 7, wanderArea: { x1: 1, y1: 3, x2: 12, y2: 8 } },
            { map: 5, x: 3, y: 3, wanderArea: { x1: 3, y1: 3, x2: 17, y2: 10 } },
            { map: 5, x: 15, y: 6, wanderArea: { x1: 3, y1: 3, x2: 17, y2: 10 } },
            { map: 5, x: 28, y: 17, wanderArea: { x1: 26, y1: 13, x2: 33, y2: 19 } },
            { map: "title3", x: 5, y: 7, wanderArea: { x1: 2, y1: 2, x2: 23, y2: 10 } }
        ],
        dialogue: {
            default: [
                "Mew.",
                "The cat stretches in a warm patch of grass and blinks up at you as though rest were a lesson you have been too slow to learn.",
                "Prrr."
            ]
        }
    },

    eldrin_steward_f6: {
        id: "eldrin_steward_f6",
        name: "Eldrin the Steward",
        sprite: "assets/img/npc/eldrin.png",
        interactive: true, 
        spawns: [
            { map: 5,  x: 16, y: 34, wanderArea: { x1: 13, y1: 30, x2: 24, y2: 37 } }
        ],
        dialogue: {
            default: [
                "There you are. Come, breathe a little. The Waystation Veil was made for that.",
                "After Umbracourt, people often arrive here carrying themselves too tightly, as if the mirrors might still be watching.",
                "This floor asks less of you. It is not empty, and it is not innocent, but it has kept hold of gentleness better than most places in Cynrith.",
                "The old castle nearby still keeps a few things worth remembering."
            ],
            questGiven: [
                "Please, bring me the old parcel from the chest in the castle.",
                "You will know it when you see it. I kept it because some tools should only be given to travelers who have learned the difference between force and care."
            ],
            questIncomplete: [
                "No hurry, but do not leave it too long either.",
                "The Veil is restful, yes, though rest is best when it still remembers what waits beyond it."
            ],
            questComplete: [
                "Thank you. Yes... this is the one.",
                "Inside is a better weapon than the sort I trusted you with at the beginning. Not because the old one failed you, but because you have changed since then.",
                "That is the truth of climbing through Cynrith. You do not outgrow what came before. You carry it, and then you learn what must be added.",
                "Keep this well. The higher floors ask sharper questions, and sometimes they only listen to answers given with steady hands.",
                "Remember the path behind you, but do not live facing backward. The Fracture is not avoided by fear alone. It is avoided by people who remember, choose carefully, and keep walking."
            ]
        },
        questId: "eldrin_f6",
        questRedo: false,
        forcedEncounter: {
            enabled: true,
            triggerTiles: [
                { x: 13, y: 30 },
                { x: 13, y: 31 },
                { x: 13, y: 32 },
                { x: 13, y: 33 },
                { x: 13, y: 34 },
                { x: 13, y: 35 },
                { x: 13, y: 36 },
                { x: 13, y: 37 }
            ],
            triggered: false
        }
    },

    waystation_trader: {
        id: "waystation_trader",
        name: "Jorin the Waystation Trader",
        sprite: "assets/img/npc/npc_m_6.png",
        interactive: true,
        spawns: [
            { map: 5, x: 21, y: 8, wanderArea: { x1: 18, y1: 5, x2: 28, y2: 9 } }
        ],
        dialogue: {
            default: [
                "Welcome to the Waystation. I trade in the sort of things people realize they needed only after surviving the previous floor.",
                "Tonics, steadier tools, a little insurance against bad judgment. Nothing flashy, just reliable.",
                "Do not let the grass and cats fool you into thinking this is an ending. It is only a pause with good manners.",
                "Take your time looking. A traveler chooses better when they are not being hunted."
            ]
        },
        trader: "trader5"
    },

    lelien_the_grass_keeper: {
        id: "lelien_the_grass_keeper",
        name: "Lelien the Grass Keeper",
        sprite: "assets/img/npc/npc_f_2.png",
        interactive: true,
        spawns: [
            { map: 5, x: 31, y: 30, wanderArea: { x1: 27, y1: 26, x2: 35, y2: 36 } }
        ],
        dialogue: {
            default: [
                "Soft, isn't it? Most people step onto the Veil and only then realize how long they have been bracing for impact.",
                "The grass stays green because this floor is tended carefully, not because the world forgot to wound it.",
                "That matters to me. Kindness kept alive on purpose is stronger than comfort that never had to defend itself.",
                "Walk slowly if you can. The meadow has a way of returning people to themselves."
            ]
        },
    },

    finik_the_fisherman: {
        id: "finik_the_fisherman",
        name: "Finik the Fisherman",
        sprite: "assets/img/npc/npc_m_7.png",
        interactive: true,
        spawns: [
            { map: 5, x: 32, y: 16, wanderArea: { x1: 31, y1: 16, x2: 33, y2: 18 } },
            { map: "title3", x: 15, y: 3, wanderArea: { x1: 2, y1: 2, x2: 23, y2: 10 } }
        ],
        dialogue: {
            default: [
                "Ah, another quiet soul by the water. Good. This floor improves when people stop hurrying through it.",
                "The pools here are shallow, but they are full of small life. Fish, reeds, bright little ripples, and cats convinced every catch belongs to them by right.",
                "I do not mind. Feeding them gives the place a rhythm. Cast, wait, share, laugh, repeat. Not every ritual in Cynrith has to be solemn to matter.",
                "Stay a while if you like. The Veil is one of the few floors where listening to water feels wiser than listening to worry."
            ],
            questComplete: [
                "Here, take some fresh fish with you.",
                "Enough for a meal, and enough to make you very popular with the local cats if you feel generous.",
                "Come back whenever you like. A good floor should have at least one person willing to ramble at you peacefully."
            ]
        },
        questId: "finiks_fish",
        questRedo: false,
    },

    valkyrie_the_catfolk: {
        id: "valkyrie_the_catfolk",
        name: "Valkyrie the Catfolk",
        sprite: "assets/img/npc/npc_f_5.png",
        interactive: true,
        spawns: [
            { map: "castle0", x: 3, y: 3, wanderArea: { x1: 3, y1: 3, x2: 4, y2: 4 } },
            { map: "title3", x: 7, y: 3, wanderArea: { x1: 2, y1: 2, x2: 23, y2: 10 } }
        ],
        dialogue: {
            default: [
                "Welcome to the Waystation Veil, traveler. You have reached a floor that prefers mending to testing.",
                "I am Valkyrie. I keep watch here, and I keep company with the cats, though truthfully they need far less guidance than most people do.",
                "Many arrive from harsher places carrying too much noise inside them. The Veil helps with that. A little food, a little grass, a little quiet, and the world sits more gently on the shoulders.",
                "Even some echoes find their way here. I think the floor gives them room to loosen, the way a tired hand finally unclenches.",
                "Rest as long as you need. Peace is not weakness in Cynrith. Sometimes it is the only reason the climb remains worth continuing."
            ]
        },
    },


    // ---------- Floor 7 ----------

    // Wharf Market NPCs

    wharf_market_trader1: {
        id: "wharf_market_trader1",
        name: "Rein, A Wharf Market Trader",
        sprite: "assets/img/npc/npc_f_6.png",
        interactive: true,
        spawns: [
            { map: 6, x: 54, y: 20, wanderArea: { x1: 52, y1: 19, x2: 55, y2: 21 } }
        ],
        dialogue: {
            default: [
                "Come to see the Great Whalf Market ae?",
                "Well you've come to no better trader than I!"
            ]
        },
        trader: "trader6"
    },

    wharf_market_trader2: {
        id: "wharf_market_trader2",
        name: "Freya, Wharf Markets Grasskeeper",
        sprite: "assets/img/npc/npc_f_2.png",
        interactive: true,
        spawns: [
            { map: 6, x: 54, y: 29, wanderArea: { x1: 53, y1: 24, x2: 57, y2: 31 } }
        ],
        dialogue: {
            default: [
                "Grass, Dirt, Stone, I have what you need to do some landscaping, traveler!",  
            ]
        },
        trader: "trader7"
    },

    wharf_market_trader3: {
        id: "wharf_market_trader3",
        name: "Link, Wharf Markets Gemstone Vendor",
        sprite: "assets/img/npc/npc_m_4.png",
        interactive: true,
        spawns: [
            { map: 6, x: 54, y: 8, wanderArea: { x1: 52, y1: 5, x2: 57, y2: 11 } }
        ],
        dialogue: {
            default: [
                "Gems, Crystals, and more! I have what you need to make your gear shine!",  
            ]
        },
        trader: "trader8"
    },

    
};


/*
// NPC Template Example

const npc_template = {
    id: "unique_npc_id", // Unique string ID for this NPC
    name: "NPC Name",
    sprite: "assets/img/npc/npc_m_1.png", // Path to NPC sprite image
    spriteWidth: 128,   // source frame width
    spriteHeight: 128,  // source frame height
    drawScale: 1.6,     // render bigger on the map
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
            { item: "choir_fragment", chance: 17, amount: 1 },
            { item: "glass_shard", chance: 24, amount: 1 },
            { item: "money", chance: 32, amount: [5, 10] }
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
        maxHealth: 115,
        attack: 38,
        defense: 12,
        speed: 1.1,
        xpGain: 25,
        loot: [
            { item: "echo_fragment", chance: 15, amount: 1 },
            { item: "memory_shard", chance: 15, amount: 1 },
            { item: "money", chance: 30, amount: [5, 10] }
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
 
    // -------- Floor 5 ---------

    umbral_slime: {
        id: "umbral_slime",
        name: "Umbral Slime",
        sprite: "assets/img/enemy/slime_03.png",
        moveSpeed: 0.9,
        distance: 3 ,
        maxHealth: 120,
        attack: 46,
        defense: 34,
        speed: 1.1,
        xpGain: 40,
        loot: [
            { item: "maxHealth_buff_small",   chance: 10, amount: 1 },
            { item: "f5_shadow_decanter", chance: 2, amount: 1 },
            { item: "money",          chance: 30, amount: [6, 12] }
        ],
        spawns: [
            { map: 4, x: 60, y: 36, wanderArea: { x1: 47, y1: 30, x2: 77, y2: 43 } },
            { map: 4, x: 56, y: 32, wanderArea: { x1: 47, y1: 30, x2: 77, y2: 43 } },
            { map: 4, x: 54, y: 38, wanderArea: { x1: 47, y1: 30, x2: 77, y2: 43 } },
            { map: 4, x: 48, y: 40, wanderArea: { x1: 47, y1: 30, x2: 77, y2: 43 } },
            { map: 4, x: 48, y: 30, wanderArea: { x1: 47, y1: 30, x2: 77, y2: 43 } },
            { map: 4, x: 59, y: 19,  wanderArea: { x1: 58, y1: 18,  x2: 64, y2: 23 } },
            { map: 4, x: 16, y: 73,  wanderArea: { x1: 1, y1: 53,  x2: 18, y2: 77 } },
            { map: 4, x: 5, y: 60,  wanderArea: { x1: 1, y1: 53,  x2: 18, y2: 77 } },
            { map: 4, x: 9, y: 54,  wanderArea: { x1: 1, y1: 53,  x2: 18, y2: 77 } },
            { map: 4, x: 7, y: 69,  wanderArea: { x1: 1, y1: 53,  x2: 18, y2: 77 } }, 
            { map: 4, x: 10, y: 76,  wanderArea: { x1: 1, y1: 53,  x2: 18, y2: 77 } },
        ]
    },

    // Floor 5 Boss
    obsidian_mirror_warden: {
        id: "obsidian_mirror_warden",
        name: "Obsidian Mirror Warden",
        sprite: "assets/img/enemy/obsidian_mirror_warden.png",
        spriteWidth: 128,
        spriteHeight: 128,
        drawScale: 2, 
        isBoss: true,
        moveSpeed: 0.7,
        distance: 4.5,
        maxHealth: 860,
        attack: 148,
        defense: 74,
        speed: 1.4,
        xpGain: 840,
        loot: [
            { item: "glass_shard",    chance: 40, amount: [2, 3] },
            { item: "echo_fragment",  chance: 40, amount: [1, 2] },
            { item: "memory_shard",   chance: 22, amount: 1 },
            { item: "f5_marked_mirror", chance: 20, amount: 1 },
            { item: "money",          chance: 100, amount: [60, 120] }
        ],
        spawns: [
            { map: 4, x: 38, y: 14, wanderArea: { x1: 25, y1: 2, x2: 51, y2: 19 } }
        ]
    },

    warden_phantom: {
        id: "warden_phantom",
        name: "Warden Phantom",
        sprite: "assets/img/enemy/vampire_01.png",
        moveSpeed: 1.1,
        distance: 4.5,
        maxHealth: 145,
        attack: 48,
        defense: 34,
        speed: 1.4,
        xpGain: 75,
        loot: [
            { item: "umbra_tonic",   chance: 10, amount: 1 },
            { item: "maxHealth_buff_small", chance: 10, amount: 1 },
            { item: "f5_umbra_candle", chance: 2, amount: 1 },
            { item: "money",         chance: 60, amount: [6, 10] }
        ],
        spawns: [
            // Upper corridor to boss hall (map 4)
            { map: 4, x: 42, y: 41, wanderArea: { x1: 41, y1: 39, x2: 43, y2: 49 } },
            { map: 4, x: 42, y: 43, wanderArea: { x1: 41, y1: 39, x2: 43, y2: 49 } },
            { map: 4, x: 41,  y: 47,  wanderArea: { x1: 41, y1: 39, x2: 43, y2: 49 } },
            { map: 4, x: 37, y: 57,  wanderArea: { x1: 30, y1: 57,  x2: 39, y2: 62 } },
            { map: 4, x: 31, y: 60,  wanderArea: { x1: 30, y1: 57,  x2: 39, y2: 62 } },
            { map: 4, x: 15, y: 46,  wanderArea: { x1: 1, y1: 31,  x2: 17, y2: 47 } }, 
            { map: 4, x: 9, y: 44,  wanderArea: { x1: 1, y1: 31,  x2: 17, y2: 47 } }, 
            { map: 4, x: 4, y: 45,  wanderArea: { x1: 1, y1: 31,  x2: 17, y2: 47 } }, 
            { map: 4, x: 8, y: 41,  wanderArea: { x1: 1, y1: 31,  x2: 17, y2: 47 } }, 
            { map: 4, x: 2, y: 38,  wanderArea: { x1: 1, y1: 31,  x2: 17, y2: 47 } }, 
            { map: 4, x: 14, y: 40,  wanderArea: { x1: 1, y1: 31,  x2: 17, y2: 47 } }, 
            { map: 4, x: 15, y: 34,  wanderArea: { x1: 1, y1: 31,  x2: 17, y2: 47 } }, 
            { map: 4, x: 10, y: 32,  wanderArea: { x1: 1, y1: 31,  x2: 17, y2: 47 } }, 
            { map: 4, x: 6, y: 35,  wanderArea: { x1: 1, y1: 31,  x2: 17, y2: 47 } }, 
            { map: 4, x: 2, y: 32,  wanderArea: { x1: 1, y1: 31,  x2: 17, y2: 47 } }, 
            { map: 4, x: 75, y: 14,  wanderArea: { x1: 68, y1: 9,  x2: 77, y2: 18 } }, 
            { map: 4, x: 2, y: 32,  wanderArea: { x1: 1, y1: 31,  x2: 17, y2: 47 } }, 
            { map: 4, x: 74, y: 50,  wanderArea: { x1: 54, y1: 45,  x2: 77, y2: 53 } }, 
            { map: 4, x: 72, y: 46,  wanderArea: { x1: 54, y1: 45,  x2: 77, y2: 53 } }, 
            { map: 4, x: 65, y: 48,  wanderArea: { x1: 54, y1: 45,  x2: 77, y2: 53 } }, 
            { map: 4, x: 57, y: 47,  wanderArea: { x1: 54, y1: 45,  x2: 77, y2: 53 } },
            { map: 4, x: 3, y: 22,  wanderArea: { x1: 2, y1: 20,  x2: 9, y2: 24 } },  
        ]
    },

    shadowed_hand_remnant: {
        id: "shadowed_hand_remnant",
        name: "Shadowed Hand Remnant",
        sprite: "assets/img/enemy/shadow_hand.png",
        spriteWidth: 128,
        spriteHeight: 128,
        drawScale: 1.5,
        isBoss: true,
        moveSpeed: 0.9,
        distance: 4,
        maxHealth: 685,
        attack: 124,
        defense: 55,
        speed: 1.2,
        xpGain: 200,
        loot: [
            { item: "command_sigil", chance: 100, amount: 1 },
            { item: "f5_shadow_sigil", chance: 10, amount: 1 },
            { item: "money", chance: 80, amount: [15, 35] }
        ],
        spawns: [
            { map: 4, x: 72, y: 36, wanderArea: { x1: 66, y1: 30, x2: 77, y2: 43 } } // side room off main hall
        ]
    },

    hallbound_brute: {
        id: "hallbound_brute",
        name: "Hallbound Brute",
        sprite: "assets/img/enemy/orc_02.png",
        moveSpeed: 0.9,
        distance: 3.5,
        maxHealth: 160,
        attack: 52,
        defense: 38,
        speed: 1.0,
        xpGain: 85,
        loot: [
            { item: "umbra_tonic",        chance: 10, amount: 1 },
            { item: "def_buff_small",     chance: 10, amount: 1 },
            { item: "f5_umbra_banner",    chance: 3, amount: 1 },
            { item: "money",              chance: 60, amount: [12, 22] }
        ],
        spawns: [
            { map: 4, x: 77, y: 74, wanderArea: { x1: 50, y1: 55, x2: 77, y2: 78 } },
            { map: 4, x: 57, y: 70, wanderArea: { x1: 50, y1: 55, x2: 77, y2: 78 } },
            { map: 4, x: 56, y: 59, wanderArea: { x1: 50, y1: 55, x2: 77, y2: 78 } },
            { map: 4, x: 63, y: 66, wanderArea: { x1: 50, y1: 55, x2: 77, y2: 78 } },
            { map: 4, x: 68, y: 65, wanderArea: { x1: 50, y1: 55, x2: 77, y2: 78 } },
            { map: 4, x: 65, y: 56, wanderArea: { x1: 50, y1: 55, x2: 77, y2: 78 } },
            { map: 4, x: 66, y: 63, wanderArea: { x1: 50, y1: 55, x2: 77, y2: 78 } },
            { map: 4, x: 51, y: 68, wanderArea: { x1: 50, y1: 55, x2: 77, y2: 78 } },
            { map: 4, x: 48, y: 16, wanderArea: { x1: 25, y1: 2, x2: 51, y2: 18 } },
            { map: 4, x: 39, y: 17, wanderArea: { x1: 25, y1: 2, x2: 51, y2: 18 } },
            { map: 4, x: 38, y: 11, wanderArea: { x1: 25, y1: 2, x2: 51, y2: 18 } },
            { map: 4, x: 44, y: 5, wanderArea: { x1: 25, y1: 2, x2: 51, y2: 18 } },
            { map: 4, x: 37, y: 7, wanderArea: { x1: 25, y1: 2, x2: 51, y2: 18 } },
            { map: 4, x: 31, y: 11, wanderArea: { x1: 25, y1: 2, x2: 51, y2: 18 } },
            { map: 4, x: 27, y: 4, wanderArea: { x1: 25, y1: 2, x2: 51, y2: 18 } },
        ]
    },
};

/*
// Enemy Type Template Example

const enemy_template = {
    id: "unique_enemy_id", // Unique string ID for this enemy
    name: "Enemy Name",
    sprite: "assets/img/enemy/enemy_01.png", // Path to enemy sprite image
    spriteWidth: 128,   // source frame width
    spriteHeight: 128,  // source frame height
    drawScale: 1.6,     // render bigger on the map
    isBoss: true,    // wont repsawn after death if boss true, only on map loads
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