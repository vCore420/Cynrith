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


};
