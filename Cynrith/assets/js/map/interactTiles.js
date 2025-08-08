// Interactable tile definitions

const INTERACTABLE_TILES = [
    {
        id: "ancient_altar_1",
        map: 0,
        x: 41,
        y: 38,
        image: "assets/img/interactTiles/mushroom-2.png",
        notification: "Press A to examine the Ancient Mushroom.",
        dialogue: [
            "You feel a strange energy as you touch the mushroom.",
            "A hidden compartment opens, revealing a potion!"
        ],
        rewards: [{ id: "potion", amount: 1 }],
    },
    // Add more interactable tiles here...
];