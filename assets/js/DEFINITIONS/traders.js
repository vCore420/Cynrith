const TRADER_DEFINITIONS = {
    trader1: {
        buy: [
            { id: "health_buff_small", price: 10 },
            { id: "atk_buff_small", price: 15 }
        ],
        sell: [
            { id: "slime_ball", price: 3 },
            { id: "dewleaf", price: 5 }
        ]
    }
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