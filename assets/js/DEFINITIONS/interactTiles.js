// Interactable Tile Definitions

const INTERACTABLE_TILES = [

    // ---------- Floor 1 ----------


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


    // ----------- Floor 2 ----------


    {
        id: "lost_page_1",
        map: 1,
        x: 26,
        y: 1,
        image: "assets/img/tile/rock-2.png",
        notification: "Press A to examine this Humming Rock.",
        dialogue: [
            "You feel a faint vibration from the stone.",
            "As you brush away some moss, a weathered page slips free from a crack.",
            "You found a Lost Page—its surface shimmers with strange symbols."
        ],
        rewards: [{ id: "lost_pages", amount: 1 }],
    },

    {
        id: "lost_page_2",
        map: 1,
        x: 1,
        y: 38,
        image: "assets/img/tile/rock-2.png",
        notification: "Press A to examine this Humming Rock.",
        dialogue: [
        "A flicker of light catches your eye near the stone.",
        "You investigate and discover a Lost Page wedged between the rocks.",
        "You found a Lost Page—echoes of old stories seem to linger on its surface."
        ],
        rewards: [{ id: "lost_pages", amount: 1 }],
    },

    {
        id: "lost_page_3",
        map: 1,
        x: 46,
        y: 9,
        image: "assets/img/tile/rock-1.png",
        notification: "Press A to examine this Humming Rock.",
        dialogue: [
            "Hidden among the tangled roots, you spot something unusual.",
            "You reach in and pull out a fragment of parchment, humming softly in your hand.",
            "You found a Lost Page—its writing shifts as you look at it."
        ],
        rewards: [{ id: "lost_pages", amount: 1 }],
    },

    {
        id: "hidden_buff_3",
        map: 1,
        x: 14,
        y: 45,
        image: "assets/img/tile/rock-1.png",
        notification: "Press A to examine this Humming Rock.",
        dialogue: [
            "You kneel beside the humming stone, feeling a gentle pulse beneath your hand.",
            "As you search the tangled roots, you uncover a small vial wrapped in faded cloth.",
            "You found a Small Defense Buff! The stone's energy lingers around it."
        ],
        rewards: [{ id: "def_buff_small", amount: 1 }],
    },

    {
        id: "sunny_1",
        map: 1,
        x: 22,
        y: 32,
        spriteSheet: "assets/img/worldSprites/sunny_man.png",
        imageW: 1152, 
        imageH: 96, 
        rows: 1,
        cols: 12,
        animSpeed: 6,
        zIndex: 0,
        notification: "Press A to Speak with the Wise Sunny Man.",
        dialogue: [
            "A grey cat sits next to this humming stone, tail flicking in rhythm with the pulse.",
            "\"Many paths lead upward, but only those who grow stronger can climb. Seek out hidden stones and curious creatures; some hold power, some hold secrets.\"",
            "Sunny purrs and nudges a small charm toward you. You feel your strength grow.",
            "As you gaze at the charm, Sunny Man vanishes, leaving behind a faint trail of light.",
        ],
        rewards: [{ id: "maxHealth_buff_small", amount: 1 }],
    },

    // ----------- Floor 3 ----------

];
