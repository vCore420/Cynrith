// All quest definitions
const QUEST_DEFINITIONS = {


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
    
    
    get_stronger: {
        id: "get_stronger",
        name: "Get Stronger!",
        description: "Gain 10 Attack.",
        type: "statBuild",
        stat: "attack",
        requiredAmount: 10,
        rewards: [{ id: "atk_buff_small", amount: 1 }, { xp: 40 }],
        redoable: false
    },
    
    
    // Add more quests here...
};
