// All quest definitions
const QUEST_DEFINITIONS = {

    // ---------- Floor 1 -----------


    eldrin_intro: {
        id: "eldrin_intro",
        name: "Eldrin's Introduction",
        description: "A Gift from the dearest Eldrin.",
        type: "gift",
        requiredItems: [],
        rewards: [{ id: "basic_sword", amount: 1 }, { xp: 20 }],
        redoable: false
    },
    
    
    dewleaf_gather: {
        id: "dewleaf_gather",
        name: "Dewleaf Gathering",
        description: "Collect 3 Dewleaf from Vicious Plants.",
        type: "itemCollect",
        requiredItems: [{ id: "dewleaf", amount: 3 }],
        rewards: [{ id: "health_buff_small", amount: 2 }, { xp: 20 }],
        redoable: true
    },
    
    
    slime_cull: {
        id: "slime_cull",
        name: "Slime Slayer",
        description: "Defeat 5 Groovy Slimes.",
        type: "enemyDefeat",
        enemyId: "slime_01",
        requiredAmount: 5,
        rewards: [{ id: "health_buff_small", amount: 2 }, { xp: 30 }],
        redoable: false
    },
    
    
    rook_gift: {
        id: "rook_gift",
        name: "Rook's Gift",
        description: "A Gift from the wise Old Rook.",
        type: "gift",
        requiredItems: [],
        rewards: [{ id: "atk_buff_small", amount: 1 }, { xp: 20 }],
        redoable: false
    },
    

    // ---------- Floor 2 -----------

    
    tharion_echoes: {
        id: "tharion_echoes",
        name: "Tharion's Echoes",
        description: "Gain 20 Max Health.",
        type: "statBuild",
        stat: "maxHealth",
        requiredAmount: 20,
        rewards: [{ id: "atk_buff_small", amount: 3 }, { xp: 60 }],
        redoable: false
    },

    forum_pages: {
        id: "forum_pages",
        name: "Forum Pages",
        description: "Collect all 'lost' pages.",
        type: "itemCollect",
        requiredItems: [{ id: "lost_pages", amount: 3 }],
        rewards: [{ id: "health_buff_small", amount: 3 }, { xp: 50 }],
        redoable: false
    },
    
    
    liraels_dustroot: {
        id: "liraels_dustroot",
        name: "Lirael's Dustroot",
        description: "Collect 10 Dustroot from the Dustback Beetles.",
        type: "itemCollect",
        requiredItems: [{ id: "dustroot", amount: 10 }],
        rewards: [{ id: "def_buff_small", amount: 1 }, { xp: 40 }],
        redoable: true
    },
    
    
    mordis_relic: {
        id: "mordis_relic",
        name: "Mordis' Relic",
        description: "Retrieve the Fractured Relic.",
        type: "itemCollect",
        requiredItems: [{ id: "fractured_relic_1", amount: 1 }],
        rewards: [{ id: "maxHealth_buff_small", amount: 1 }, { xp: 40, attackSpeed: 20 }],
        redoable: true
    },
    

    // ---------- Floor 3 -----------


    // Eira of the Veil 
    eira_echo_fragments: {
        id: "eira_echo_fragments",
        name: "Echo Fragments",
        description: "Collect 5 Glitch Fragments from Echoes for Eira.",
        type: "itemCollect",
        requiredItems: [{ id: "glitch_fragment", amount: 5 }],
        rewards: [{ id: "health_buff_small", amount: 3 }, { xp: 35 }],
        redoable: true
    },

    // Whispering Shade 
    shade_statue_echoes: {
        id: "shade_statue_echoes",
        name: "Statue Echoes",
        description: "Activate 3 glitching statues in the Thicket for the Whispering Shade.",
        type: "interactTiles",
        interactTileIds: ["statue_f3_1", "statue_f3_2", "statue_f3_3"], 
        requiredAmount: 3,
        rewards: [{ id: "atk_buff_small", amount: 2 }, { xp: 45 }],
        redoable: false
    },

    // Sakura the Dreamer
    sakura_lost_blossom: {
        id: "sakura_lost_blossom",
        name: "Lost Blossom",
        description: "Find a Memory Fragment within Cherry Grove for Sakura.",
        type: "itemCollect",
        requiredItems: [{ id: "memory_fragment", amount: 1 }],
        rewards: [{ id: "def_buff_small", amount: 2 }, { xp: 50 }],
        redoable: false
    },

    // Bruk the Outcast
    bruk_sabotage: {
        id: "bruk_sabotage",
        name: "Sabotage the Orks",
        description: "Defeat 25 Mistbound Orks and recover Bruk's lost totem.",
        type: "enemyDefeat",
        enemyId: "mistbound_ork",
        requiredAmount: 25,
        rewards: [{ id: "atkSpeed_buff_small", amount: 3 }, { xp: 60 }],
        redoable: false
    },

    // Myco the Luminous
    myco_mushroom_potion: {
        id: "myco_mushroom_potion",
        name: "Luminous Brew",
        description: "Collect 6 bioluminescent mushrooms for Myco to brew a potion.",
        type: "itemCollect",
        requiredItems: [{ id: "bioluminescent_mushroom", amount: 6 }],
        rewards: [{ id: "maxHealth_buff_small", amount: 3 }, { xp: 50 }],
        redoable: true
    },

    // -------- Floor 4 -----------


};


/*
    QUEST DEFINITION TEMPLATE

    id:             // Unique string identifier for the quest
    name:           // Display name of the quest
    description:    // Description shown to the player
    type:           // "gift" | "itemCollect" | "enemyDefeat" | "statBuild" | "interactTiles"
    requiredItems:  // Array of { id: "item_id", amount: n } (for itemCollect/gift)
    enemyId:        // Enemy ID to defeat (for enemyDefeat)
    requiredAmount: // Number required (for itemCollect, enemyDefeat, statBuild, interactTiles)
    stat:           // Stat key to build (for statBuild)
    interactTileIds:// Array of interactable tile IDs (for interactTiles)
    rewards:        // Array of { id: "item_id", amount: n } or { xp: n, attack: n, defence: n, maxHealth: n, attackSpeed: n }
    redoable:       // true/false (can be repeated)

    // Example:
    {
        id: "example_quest",
        name: "Example Quest",
        description: "Complete the example quest.",
        type: "itemCollect", // or "gift", "enemyDefeat", "statBuild", "interactTiles"
        requiredItems: [{ id: "example_item", amount: 3 }],
        enemyId: "example_enemy", // for enemyDefeat
        requiredAmount: 5,        // for itemCollect, enemyDefeat, statBuild, interactTiles
        stat: "maxHealth",        // for statBuild
        interactTileIds: ["example_tile_1", "example_tile_2"], // for interactTiles
        rewards: [
            { id: "example_reward_item", amount: 1 },
            { xp: 50 },
            { attack: 2 },
            { defence: 1 },
            { maxHealth: 10 },
            { attackSpeed: 5 }
        ],
        redoable: false
    }
*/