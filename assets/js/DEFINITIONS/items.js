// Inventory item definitions

const ITEM_DEFINITIONS = {

    // --------------- Buffs ---------------


    health_buff_small: {
        id: "health_buff_small",
        name: "Health Buff - Small",
        description: "Restores 10 health.",
        image: "assets/img/items/health_buff_small.png",
        rarity: "common",
        stackable: true,
        useable: true,
        removeable: true,
        sound: 'health.mp3'
    },


    atk_buff_small: {
        id: "atk_buff_small",
        name: "Attack Buff - Small",
        description: "Increases attack damage by 3.",
        image: "assets/img/items/atk_buff_small.png",
        rarity: "Rare",
        stackable: true,
        useable: true,
        removeable: true,
        sound: 'atk.mp3'
    },


    def_buff_small: {
        id: "def_buff_small",
        name: "Defence Buff - Small",
        description: "Increases Defence by 3.",
        image: "assets/img/items/def_buff_small.png",
        rarity: "Rare",
        stackable: true,
        useable: true,
        removeable: true,
        sound: 'def.mp3'
    },


    maxHealth_buff_small: {
        id: "maxHealth_buff_small",
        name: "Max Health Buff - Small",
        description: "Increases Max Health by 10.",
        image: "assets/img/items/maxHealth_buff_small.png",
        rarity: "Rare",
        stackable: true,
        useable: true,
        removeable: true,
        sound: 'maxHealth.mp3'
    },

    atkSpeed_buff_small: {
        id: "atkSpeed_buff_small",
        name: "Attack Speed Buff - Small",
        description: "Increases attack speed by 10.",
        image: "assets/img/items/atkSpeed_buff_small.png",
        rarity: "Rare",
        stackable: true,
        useable: true,
        removeable: true,
        sound: 'atkSpeed.mp3'
    },

    
    // --------------- Weapons ---------------


    basic_sword: {
        id: "basic_sword",
        name: "Basic Sword",
        description: "A sharp blade. Deals good damage.",
        image: "assets/img/items/basic_sword.png",
        rarity: "common",
        stackable: false,
        useable: false,
        removeable: false 
    },


    // --------------- Currency ---------------

    money: {
        id: "money",
        name: "Coin",
        description: "Currency used for trading.",
        image: "assets/img/items/coin.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false
    },
    
    // --------------- loot, Drops, Quest Items ---------------


    slime_ball: {
        id: "slime_ball",
        name: "Slime Ball",
        description: "A gooey ball of slime. Might be useful for a quest.",
        image: "assets/img/items/slime_ball.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: true
    },
    

    dewleaf: {
        id: "dewleaf",
        name: "Dewleaf",
        description: "A delicate leaf that glistens with morning dew. Prized by herbalists.",
        image: "assets/img/items/dewleaf.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: true
    },


    dustroot: {
        id: "dustroot",
        name: "Dustroot",
        description: "A root that thrives in dusty environments. Used in various potions.",
        image: "assets/img/items/dustroot.png",
        rarity: "Common",
        stackable: true,
        useable: false,
        removeable: true
    },

    
    fractured_relic_1: {
        id: "fractured_relic_1",
        name: "Fractured Relic",
        description: "A fragment of a once-mighty artifact. Holds mysterious power.",
        image: "assets/img/items/fractured_relic_1.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: true
    },


    twilight_totem: {
        id: "twilight_totem",
        name: "Twilight Totem",
        description: "A mysterious totem that pulses with a soft light. Said to guide lost souls.",
        image: "assets/img/items/twilight_totem.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: true
    },

    

    lost_pages: {
        id: "lost_pages",
        name: "Lost Pages",
        description: "Pages torn from a forgotten time. Contains ancient knowledge.",
        image: "assets/img/items/lost_pages.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: false
    },

    
    bioluminescent_mushroom: {
        id: "bioluminescent_mushroom",
        name: "Bioluminescent Mushroom",
        description: "A glowing mushroom found deep in the Thicket. Used in potions and quests.",
        image: "assets/img/items/bioluminescent_mushroom.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: true
    },


    memory_fragment: {
        id: "memory_fragment",
        name: "Memory Fragment",
        description: "A fragment of lost memory. Sought by lorekeepers and chroniclers.",
        image: "assets/img/items/memory_fragment.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: true
    },


    glitch_fragment: {
        id: "glitch_fragment",
        name: "Glitch Fragment",
        description: "A fragment of digital distortion, pulsing with strange energy.",
        image: "assets/img/items/glitch_fragment.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: true
    },

    
    memory_shard: {
        id: "memory_shard",
        name: "Memory Shard",
        description: "A crystalline shard containing echoes of lost memories. Valuable to lorekeepers.",
        image: "assets/img/items/memory_shard.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: true
    },


    echo_fragment: {
        id: "echo_fragment",
        name: "Echo Fragment",
        description: "A fragment of a lingering echo, pulsing with spectral energy.",
        image: "assets/img/items/echo_fragment.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: true
    },


    glass_shard: {
        id: "glass_shard",
        name: "Glass Shard",
        description: "A sharp piece of fractured glass, shimmering with circuit-like patterns.",
        image: "assets/img/items/glass_shard.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: true
    },


    choir_fragment: {
        id: "choir_fragment",
        name: "Choir Fragment",
        description: "A fragment of the Architect's Choir, resonating with lost harmony.",
        image: "assets/img/items/choir_fragment.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: true
    },

    glassberry_leaf: {
        id: "glassberry_leaf",
        name: "Glassberry Leaf",
        description: "A vibrant leaf from the Glassberry plant, known for its comforting properties and rich aroma.",
        image: "assets/img/items/glassberry_leaf.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: true
    },

    glassberry_tea: {
        id: "glassberry_tea",
        name: "Glassberry Tea",
        description: "A soothing tea made from Glassberry Leaves, its said that those who drink it feel a calming sensation that regenerates their health fully.",
        image: "assets/img/items/glassberry_tea.png",
        rarity: "legendary",
        stackable: true,
        useable: true,
        removeable: true
    }


};


/*
// Item Definition Template Example

const item_template = {
    id: "unique_item_id", // Unique string ID for this item
    name: "Item Name",
    description: "Description of the item.",
    image: "assets/img/items/item_image.png", // Path to item image
    rarity: "common", // common, rare, epic, etc.
    stackable: true, // Can stack in inventory
    useable: false, // Can be used (consumed/equipped)
    removeable: true, // Can be removed from inventory
    sound: 'item_use.mp3' // Sound effect played when item is used
};

*/