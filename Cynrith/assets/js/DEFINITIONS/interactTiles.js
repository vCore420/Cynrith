// Interactable tile definitions

const INTERACTABLE_TILES = [
    {
        id: "hidden_buff_1",
        map: 0,
        x: 5,
        y: 2,
        image: "assets/img/tile/rock-3.png",
        notification: "Press A to examine this Humming Rock.",
        dialogue: [
            "You feel a strange energy coming from this rock.",
            "you lean in for a better look...",
            "and find a Small Attack Buff tucked behind it!"
        ],
        rewards: [{ id: "atk_buff_small", amount: 1 }],
    },

    {
        id: "hidden_buff_2",
        map: 0,
        x: 47,
        y: 1,
        image: "assets/img/tile/fern.png",
        notification: "Press A to search this Bush.",
        dialogue: [
            "You hear a rustling from this bush.",
            "you reach in to have a look...",
            "and find a Small Attack Buff calling to you!"
        ],
        rewards: [{ id: "atk_buff_small", amount: 1 }],
    },
    // Add more interactable tiles here...
];
