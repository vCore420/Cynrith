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
        redoable: true
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

    homeplot_key_gift: {
        id: "homeplot_key_gift",
        name: "A Key without a Door",
        description: "A strange key has been entrusted to you.",
        type: "gift",
        requiredItems: [],
        rewards: [{ id: "key_without_a_door", amount: 1 }, { xp: 120 }],
        redoable: false
    },
    

    // ---------- Floor 3 -----------


    // Eira of the Veil 
    eira_echo_fragments: {
        id: "eira_echo_fragments",
        name: "Echo Fragments",
        description: "Gather 5 Glitch Fragments from unstable echoes in Gloomroot Thicket for Eira.",
        type: "itemCollect",
        requiredItems: [{ id: "glitch_fragment", amount: 5 }],
        rewards: [{ id: "health_buff_small", amount: 3 }, { xp: 35 }],
        redoable: true
    },

    // Whispering Shade 
    shade_statue_echoes: {
        id: "shade_statue_echoes",
        name: "Statue Echoes",
        description: "Wake the 3 glitching statues hidden in the Thicket and restore the memories sealed inside them.",
        type: "interactTiles",
        interactTileIds: ["statue_f3_1", "statue_f3_2", "statue_f3_3"], 
        requiredAmount: 3,
        rewards: [{ id: "atk_buff_small", amount: 2 }, { xp: 45 }],
        icon: "statue_01",
        redoable: false
    },

    // Sakura the Dreamer
    sakura_lost_blossom: {
        id: "sakura_lost_blossom",
        name: "Lost Blossom",
        description: "Find the Memory Fragment hidden in the Cherry Grove and return it to Sakura.",
        type: "itemCollect",
        requiredItems: [{ id: "memory_fragment", amount: 1 }],
        rewards: [{ id: "def_buff_small", amount: 2 }, { xp: 50 }],
        redoable: false
    },

    // Bruk the Outcast
    bruk_sabotage: {
        id: "bruk_sabotage",
        name: "Sabotage the Orks",
        description: "Defeat 25 Mistbound Orks and recover Bruk's lost totem before the Thicket swallows it for good.",
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
        description: "Collect 6 bioluminescent mushrooms from the deeper Thicket so Myco can brew a truth-revealing potion.",
        type: "itemCollect",
        requiredItems: [{ id: "bioluminescent_mushroom", amount: 6 }],
        rewards: [{ id: "maxHealth_buff_small", amount: 3 }, { xp: 50 }],
        redoable: true
    },

    // -------- Floor 4 -----------

    // Lyra the Lost Chorister
    choir_fragments: {
        id: "choir_fragments",
        name: "Reconstruct the Choir",
        description: "Collect 8 Choir Fragments for Lyra so the Shattered Spires can recover part of their lost harmony and remember what they were meant to preserve.",
        type: "itemCollect",
        requiredItems: [{ id: "choir_fragment", amount: 8 }],
        rewards: [{ id: "maxHealth_buff_small", amount: 10 }, { xp: 120 }],
        redoable: false
    },

    sundered_echo_release: {
        id: "sundered_echo_release",
        name: "Release the Sundered Echoes",
        description: "Activate the 3 Echo Tiles scattered through the Spires and free the trapped voices caught in the floor's unfinished memory.",
        type: "interactTiles",
        interactTileIds: ["echo_tile_1", "echo_tile_2", "echo_tile_3"],
        requiredAmount: 3,
        rewards: [{ id: "atk_buff_small", amount: 10 }, { xp: 160 }],
        redoable: false
    },

    venn_glassberry_tea: {
        id: "venn_glassberry_tea",
        name: "Restoring the Old Record",
        description: "Gather 5 Glassberry Leaves for Archivist Venn so he can restore one small ritual of welcome within the broken Grand Hall.",
        type: "itemCollect",
        requiredItems: [
            { id: "glassberry_leaf", amount: 5 }
        ],
        rewards: [
            { id: "maxHealth_buff_small", amount: 3 },
            { id: "def_buff_small", amount: 4 },
            { id: "glassberry_tea", amount: 1 },
            { xp: 80 }
        ],
        redoable: false
    },

    sentinel_shardling_cull: {
        id: "sentinel_shardling_cull",
        name: "Shardling Cull",
        description: "Defeat 40 Shardlings for the Sentinel of the Spires and help keep the fractured routes passable for those who come after you.",
        type: "enemyDefeat",
        enemyId: "shardling",
        requiredAmount: 40,
        rewards: [
            { id: "maxHealth_buff_small", amount: 5 },
            { id: "atk_buff_small", amount: 5 },
            { xp: 200 }
        ],
        redoable: true
    },

    // ---------- Floor 5 -----------

    // Veyra the Pale Archivist
    veyras_mirrors: {
        id: "veyras_mirrors",
        name: "Veyra's Mirrors",
        description: "Touch the 3 Marked Mirrors of Umbracourt and let the halls decide whether they recognize the self you have carried this far.",
        type: "interactTiles",
        requiredAmount: 3,
        interactTileIds: ["cracked_mirror_1", "cracked_mirror_2", "cracked_mirror_3"],
        rewards: [{ xp: 250 }, { id: "blue_gem", amount: 1 }],
        redoable: false
    },

    umbrafloor_echoes: {
        id: "umbrafloor_echoes",
        name: "Echoes in the Glass",
        description: "Gather 4 Echo Fragments from Umbracourt so Lysa can read the copies, pauses, and discarded turns the halls have begun recording.",
        type: "itemCollect",
        requiredItems: [{ id: "echo_fragment", amount: 4 }],
        rewards: [
            { id: "mirror_tonic", amount: 3 },
            { xp: 140 }
        ],
        redoable: true
    },

    sigil_of_the_hand: {
        id: "sigil_of_the_hand",
        name: "Sigil of the Hand",
        description: "Defeat the Shadowed Hand Remnant and claim its Command Sigil, a relic of old authority that once tried to force order onto Umbracourt.",
        type: "enemyDefeat",
        enemyId: "shadowed_hand_remnant",
        requiredAmount: 1,
        rewards: [
            { id: "command_sigil", amount: 1 },
            { id: "umbra_tonic", amount: 4 },
            { xp: 220 }
        ],
        redoable: false
    },

    // ----------- Floor 6 -----------

    eldrin_f6: {
        id: "eldrin_f6",
        name: "Eldrin's Request",
        description: "Retrieve Eldrin's parcel from the castle.",
        type: "itemCollect",
        requiredItems: [{ id: "old_parcel", amount: 1 }],
        rewards: [
            { id: "blue_gem", amount: 1 },
            { id: "mirror_sword", amount: 1 },
            { xp: 200 }
        ],
        redoable: false
    },

    finiks_fish: {
        id: "finiks_fish",
        name: "Finiks Fish",
        description: "Some Fresh Fish to Share.",
        type: "gift",
        requiredItems: [],
        rewards: [
            { id: "fresh_fish", amount: 3 },
            { xp: 100 }
        ],
        redoable: false
    },
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