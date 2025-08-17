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
        removeable: true
    },


    atk_buff_small: {
        id: "atk_buff_small",
        name: "Attack Buff - Small",
        description: "Increases attack damage by 3.",
        image: "assets/img/items/atk_buff_small.png",
        rarity: "Rare",
        stackable: true,
        useable: true,
        removeable: true
    },


    def_buff_small: {
        id: "def_buff_small",
        name: "Defence Buff - Small",
        description: "Increases Defence by 3.",
        image: "assets/img/items/def_buff_small.png",
        rarity: "Rare",
        stackable: true,
        useable: true,
        removeable: true
    },


    maxHealth_buff_small: {
        id: "maxHealth_buff_small",
        name: "Max Health Buff - Small",
        description: "Increases Max Health by 5.",
        image: "assets/img/items/maxHealth_buff_small.png",
        rarity: "Rare",
        stackable: true,
        useable: true,
        removeable: true
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
    
    // --------------- Enemy Drops ---------------


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


    // --------------- Miscellaneous ---------------


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
    

};
