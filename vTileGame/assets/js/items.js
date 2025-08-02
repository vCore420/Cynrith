const ITEM_DEFINITIONS = {
    potion: {
        id: "potion",
        name: "Health Potion",
        description: "Restores 20 health.",
        image: "assets/img/items/potion.png",
        stackable: true,
        useable: true
    },
    slime_ball: {
        id: "slime_ball",
        name: "Slime Ball",
        description: "A gooey ball of slime. Might be useful for a quest.",
        image: "assets/img/items/slime_ball.png",
        stackable: true,
        useable: false
    },
    dewleaf: {
        id: "dewleaf",
        name: "Dewleaf",
        description: "A delicate leaf that glistens with morning dew. Prized by herbalists.",
        image: "assets/img/items/dewleaf.png",
        stackable: true,
        useable: false
    },
    sword: {
        id: "sword",
        name: "Sword",
        description: "A sharp blade. Deals extra damage.",
        image: "assets/img/items/sword.png",
        stackable: false,
        useable: false
    },
    atk_buff: {
        id: "atk_buff",
        name: "Attack Buff",
        description: "Increases attack damage.",
        image: "assets/img/items/atk_buff.png",
        stackable: true,
        useable: true
    },
    // Add more items here...
};