const TRADER_DEFINITIONS = {

    // -------- Floor 3 --------

    trader1: {
        buy: [
            { id: "health_buff_small", price: 10 },
            { id: "atk_buff_small", price: 20 },
            { id: "f3_glowcap_cluster", price: 45 }
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
            { id: "def_buff_small", price: 24 },
            { id: "f4_resonance_glass", price: 40 }
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
            { id: "f4_glassberry_sapling", price: 65 },
            { id: "f4_archive_shelf", price: 90 },
            { id: "f4_jar", price: 55 }
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
            { id: "blue_gem",            price: 800 },
            { id: "f5_umbra_candle",     price: 35 },
            { id: "f5_umbra_banner",     price: 50 },
            { id: "f5_shadow_decanter",  price: 65 },
            { id: "f5_marked_mirror",    price: 90 },
            { id: "f5_shadow_sigil",     price: 110 },
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
            { id: "pink_gem",            price: 2850 },
            { id: "f6_veil_waymarker",   price: 22 },
            { id: "f6_traveler_signpost", price: 20 },
            { id: "f6_meadow_pine",      price: 26 },
            { id: "f6_shelter_pine",     price: 48 },
            { id: "f6_waystation_tower", price: 200 },
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
            { id: "home_chair_oak",   price: 100 },
            { id: "fence1",   price: 100 },
            { id: "gazebo1",   price: 100 },
            { id: "home_cabin_1",   price: 500 },
        ],
        sell: [
            { id: "umbra_tonic",         price: 35 }
        ]
    },

    trader7: {
        buy: [
            { id: "grass1",   price: 20 },
            { id: "grass2",   price: 20 },
            { id: "grass3",   price: 20 },
            { id: "grass4",   price: 20 },
            { id: "grass5",   price: 20 },
            { id: "grass6",   price: 20 },
            { id: "grass7",   price: 20 },
            { id: "grass8",   price: 20 },
            { id: "grass9",   price: 20 },
            { id: "cliff1",   price: 20 },
            { id: "cliff2",   price: 20 },
            { id: "cliff3",   price: 20 },
            { id: "steps1",   price: 20 },
            { id: "steps2",   price: 20 },
            { id: "steps3",   price: 20 }
        ],
        sell: [
            { id: "twilight_totem",    price: 50 },
            { id: "fractured_relic_1", price: 200 },
            { id: "glassberry_tea",    price: 150 }
        ]
    },

    trader8: {
        buy: [
            { id: "blue_gem",            price: 700 },
            { id: "red_gem",             price: 1400 },
            { id: "pink_gem",            price: 2500 },
        ],
        sell: [
            { id: "glass_shard",     price: 18 },
            { id: "echo_fragment",   price: 18 },
            { id: "memory_shard",    price: 18 },
            { id: "choir_fragment",  price: 20 },
            { id: "slime_ball",      price: 16 },
            { id: "dewleaf",         price: 24 },
            { id: "dustroot",        price: 20 }
        ]
    },

    trader9: {
        buy: [
            { id: "mirror_tonic",         price: 30 },
            { id: "clarity_tincture",     price: 50 },
            { id: "umbra_tonic",          price: 50 },
            { id: "health_buff_small",    price: 5 },
            { id: "health_buff_large",    price: 35 },
            { id: "atk_buff_small",       price: 16 },
            { id: "atk_buff_large",       price: 42 },
            { id: "def_buff_small",       price: 16 },
            { id: "def_buff_large",       price: 40 },
            { id: "atkSpeed_buff_small",  price: 12 },
            { id: "atkSpeed_buff_large",  price: 38 },
            { id: "maxHealth_buff_small", price: 15 },
            { id: "maxHealth_buff_large", price: 45 },
        ],
        sell: [
            { id: "lost_pages",     price: 100 },
            { id: "bioluminescent_mushroom", price: 60 },
            { id: "memory_fragment",    price: 40 },
            { id: "glitch_fragment",  price: 80 },
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