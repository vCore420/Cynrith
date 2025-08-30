const TRADER_DEFINITIONS = {

    // -------- Floor 3 --------

    trader1: {
        buy: [
            { id: "health_buff_small", price: 10 },
            { id: "atk_buff_small", price: 15 }
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
            { id: "atk_buff_small", price: 15 },
            { id: "def_buff_small", price: 15 }
        ],
        sell: [
            { id: "dewleaf", price: 6 },
            { id: "dustroot", price: 7 },
            { id: "slime_ball", price: 4 },
            { id: "fractured_relic_1", price: 15 }
        ]
    },

    trader3: {
        buy: [
            { id: "health_buff_small", price: 8 },
            { id: "atk_buff_small", price: 12 },
            { id: "def_buff_small", price: 12 },
            { id: "maxHealth_buff_small", price: 30 },
            { id: "atkSpeed_buff_small", price: 25 },
        ],
        sell: [
            { id: "glass_shard", price: 15 },
            { id: "choir_fragment", price: 25 },
            { id: "memory_shard", price: 20 },
            { id: "echo_fragment", price: 20 },
            { id: "dewleaf", price: 10 },
            { id: "dustroot", price: 12 },
            { id: "slime_ball", price: 10 },
            { id: "fractured_relic_1", price: 25 }

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