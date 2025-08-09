// Inventory item definitions

const ITEM_DEFINITIONS = {

    health_buff_small: {
        id: "health_buff_small",
        name: "Health health_buff_small",
        description: "Restores 10 health.",
        image: "assets/img/items/health_buff_small.png",
        rarity: "common",
        stackable: true,
        useable: true,
        removeable: true
    },


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
    // Add more items here...
};
