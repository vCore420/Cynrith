const TRADER_DEFINITIONS = {

    // -------- Floor 3 --------

    trader1: {
        buy: [
            { id: "health_buff_small", price: 10 },
            { id: "atk_buff_small", price: 20 }
        ],
        sell: [
            { id: "slime_ball", price: 3 },
            { id: "dewleaf", price: 5 }
        ]
    },

    // -------- Floor 4 --------

    trader2: {
        buy: [
            { id: "health_buff_small", price: 10 },
            { id: "atk_buff_small", price: 22 },
            { id: "def_buff_small", price: 24 }
        ],
        sell: [
            { id: "dewleaf", price: 5 },
            { id: "dustroot", price: 6 },
            { id: "slime_ball", price: 4 },
            { id: "fractured_relic_1", price: 8 }
        ]
    },

    trader3: {
        buy: [
            { id: "health_buff_small", price: 9 },
            { id: "atk_buff_small", price: 20 },
            { id: "def_buff_small", price: 22 },
            { id: "maxHealth_buff_small", price: 16 },
            { id: "atkSpeed_buff_small", price: 18 },
        ],
        sell: [
            { id: "glass_shard", price: 7 },
            { id: "choir_fragment", price: 8 },
            { id: "memory_shard", price: 7 },
            { id: "echo_fragment", price: 6 },
            { id: "dewleaf", price: 7 },
            { id: "dustroot", price: 8 },
            { id: "slime_ball", price: 5 },
            { id: "fractured_relic_1", price: 10 }

        ]
    },

    // -------- Floor 5 --------

    trader4: {
        buy: [
            { id: "health_buff_small",   price: 8 },
            { id: "def_buff_small",      price: 20 },
            { id: "atk_buff_small",      price: 18 },
            { id: "maxHealth_buff_small", price: 16 },
            { id: "atkSpeed_buff_small", price: 16 },
            { id: "umbra_tonic",         price: 58 }, 
            { id: "clarity_tincture",    price: 60 }, 
            { id: "mirror_tonic",        price: 70 },
            { id: "blue_gem",            price: 800 }
        ],
        sell: [
            { id: "glass_shard",     price: 8 },
            { id: "echo_fragment",   price: 8 },
            { id: "memory_shard",    price: 8 },
            { id: "choir_fragment",  price: 10 },
            { id: "slime_ball",      price: 6 },
            { id: "dewleaf",         price: 10 },
            { id: "dustroot",        price: 10 }
        ]
    },

    // -------- Floor 6 --------

    trader5: {
        buy: [
            { id: "health_buff_small",   price: 7 },
            { id: "blue_gem",            price: 750 },
            { id: "red_gem",             price: 1650 },
            { id: "pink_gem",            price: 2850 }
        ],
        sell: [
            { id: "umbra_tonic",         price: 25 }, 
            { id: "clarity_tincture",    price: 25 }, 
            { id: "mirror_tonic",        price: 35 }
        ]
    },


    // -------- Floor 7 --------

    trader6: {
        buy: [
            { id: "inventory_page",   price: 3000 },
        ],
        sell: [
            { id: "umbra_tonic",         price: 35 }
        ]
    },

};


/*
// Trader Definition Template Example

const trader_template = {
    unique_trader_id: { // Unique string ID for this trader to match npc definition
        buy: [
            { id: "item_id_1", price: 10 },
            { id: "item_id_2", price: 25 }
            // Add more items the trader sells
        ],
        sell: [
            { id: "item_id_3", price: 5 },
            { id: "item_id_4", price: 8 }
            // Add more items the trader buys from player
        ]
    }
};
*/