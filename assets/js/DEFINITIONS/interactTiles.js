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
        collision: true, 
        zIndex: 0,
        animOnTrigger: false,
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
        collision: true, 
        zIndex: 0,
        animOnTrigger: false,
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
        collision: true, 
        zIndex: 0,
        animOnTrigger: false,
        dialogue: [
            "You feel a faint vibration from the stone.",
            "As you brush away some moss, a weathered page slips free from a crack.",
            "You found a Lost Page, its surface shimmers with strange symbols."
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
        collision: true, 
        zIndex: 0,
        animOnTrigger: false,
        dialogue: [
        "A flicker of light catches your eye near the stone.",
        "You investigate and discover a Lost Page wedged between the rocks.",
        "You found a Lost Page, echoes of old stories seem to linger on its surface."
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
        collision: true, 
        zIndex: 0,
        animOnTrigger: false,
        dialogue: [
            "Hidden among the tangled roots, you spot something unusual.",
            "You reach in and pull out a fragment of parchment, humming softly in your hand.",
            "You found a Lost Page, its writing shifts as you look at it."
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
        collision: true, 
        zIndex: 0,
        animOnTrigger: false,
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
        collision: true, 
        zIndex: 0,
        animOnTrigger: false,
        animSpeed: 6,
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

    {
        id: "bio_mushroom_1",
        map: 2,
        x: 35,
        y: 47,
        spriteSheet: "assets/img/tile/mushroom-flash-1.png",
        imageW: 128, 
        imageH: 64, 
        rows: 1,
        cols: 2,
        animSpeed: 10,
        collision: false, 
        zIndex: 0,
        animOnTrigger: false,
        notification: "Press A to Inspect Mushroom.",
        dialogue: [
            "You find a bioluminescent mushroom glowing softly in the shadows.",
        ],
        rewards: [{ id: "bioluminescent_mushroom", amount: 1 }],
    },

    {
        id: "bio_mushroom_2",
        map: 2,
        x: 30,
        y: 37,
        spriteSheet: "assets/img/tile/mushroom-flash-1.png",
        imageW: 128, 
        imageH: 64, 
        rows: 1,
        cols: 2,
        animSpeed: 10,
        collision: false, 
        zIndex: 0,
        animOnTrigger: false,
        notification: "Press A to Inspect Mushroom.",
        dialogue: [
            "You find a bioluminescent mushroom glowing softly in the shadows.",
        ],
        rewards: [{ id: "bioluminescent_mushroom", amount: 1 }],
    },

    {
        id: "bio_mushroom_3",
        map: 2,
        x: 42,
        y: 47,
        spriteSheet: "assets/img/tile/mushroom-flash-1.png",
        imageW: 128, 
        imageH: 64, 
        rows: 1,
        cols: 2,
        animSpeed: 10,
        collision: false, 
        zIndex: 0,
        animOnTrigger: false,
        notification: "Press A to Inspect Mushroom.",
        dialogue: [
            "You find a bioluminescent mushroom glowing softly in the shadows.",
        ],
        rewards: [{ id: "bioluminescent_mushroom", amount: 1 }],
    },
    
    {
        id: "bio_mushroom_4",
        map: 2,
        x: 17,
        y: 51,
        spriteSheet: "assets/img/tile/mushroom-flash-1.png",
        imageW: 128, 
        imageH: 64, 
        rows: 1,
        cols: 2,
        animSpeed: 10,
        collision: false, 
        zIndex: 0,
        animOnTrigger: false,
        notification: "Press A to Inspect Mushroom.",
        dialogue: [
            "You find a bioluminescent mushroom glowing softly in the shadows.",
        ],
        rewards: [{ id: "bioluminescent_mushroom", amount: 1 }],
    },

    {
        id: "bio_mushroom_5",
        map: 2,
        x: 16,
        y: 57,
        spriteSheet: "assets/img/tile/mushroom-flash-1.png",
        imageW: 128, 
        imageH: 64, 
        rows: 1,
        cols: 2,
        animSpeed: 10,
        collision: false, 
        zIndex: 0,
        animOnTrigger: false,
        notification: "Press A to Inspect Mushroom.",
        dialogue: [
            "You find a bioluminescent mushroom glowing softly in the shadows.",
        ],
        rewards: [{ id: "bioluminescent_mushroom", amount: 1 }],
    },

    {
        id: "bio_mushroom_6",
        map: 2,
        x: 22,
        y: 41,
        spriteSheet: "assets/img/tile/mushroom-flash-1.png",
        imageW: 128, 
        imageH: 64, 
        rows: 1,
        cols: 2,
        animSpeed: 10,
        collision: false, 
        zIndex: 0,
        animOnTrigger: false,
        notification: "Press A to Inspect Mushroom.",
        dialogue: [
            "You find a bioluminescent mushroom glowing softly in the shadows.",
        ],
        rewards: [{ id: "bioluminescent_mushroom", amount: 1 }],
    },

    {
        id: "lost_memory_1",
        map: 2,
        x: 27,
        y: 8,
        image: "assets/img/tile/rock-1.png",
        notification: "Press A to examine this Humming Rock.",
        collision: true, 
        zIndex: 0,
        animOnTrigger: false,
        dialogue: [
            "You hear a soft humming sound emanating from the rock.",
            "As you get closer, the humming grows louder, resonating with a strange energy.",
            "You found a Lost Memory Fragment, its whispers fill your mind."
        ],
        rewards: [{ id: "memory_fragment", amount: 1 }],
    },

    {
        id: "statue_f3_1",
        map: 2,
        x: 15,
        y: 16,
        spriteSheet: "assets/img/worldSprites/statue_01.png",
        imageW: 512,
        imageH: 480,
        rows: 3,
        cols: 8,
        animSpeed: 6,
        collision: true, 
        zIndex: 1,
        animOnTrigger: true,
        sound: { enabled: true, file: "glitching_statue.mp3", type: "trigger" },
        notification: "Press A to activate the statue.",
        dialogue: [
            "You touch the statue. It begins to glow and shift, revealing hidden glyphs."
        ],
        rewards: [{ id: "money", amount: 10 }],
    },

    {
        id: "statue_f3_2",
        map: 2,
        x: 5,
        y: 34,
        spriteSheet: "assets/img/worldSprites/statue_01.png",
        imageW: 512,
        imageH: 480,
        rows: 3,
        cols: 8,
        animSpeed: 6,
        collision: true, 
        zIndex: 1,
        animOnTrigger: true,
        sound: { enabled: true, file: "glitching_statue.mp3", type: "trigger" },
        notification: "Press A to activate the statue.",
        dialogue: [
            "You touch the statue. It begins to glow and shift, revealing hidden glyphs."
        ],
        rewards: [{ id: "money", amount: 10 }],
    },

    {
        id: "statue_f3_3",
        map: 2,
        x: 61,
        y: 24,
        spriteSheet: "assets/img/worldSprites/statue_01.png",
        imageW: 512,
        imageH: 480,
        rows: 3,
        cols: 8,
        animSpeed: 6,
        collision: true, 
        zIndex: 1,
        animOnTrigger: true,
        sound: { enabled: true, file: "glitching_statue.mp3", type: "trigger" },
        notification: "Press A to activate the statue.",
        dialogue: [
            "You touch the statue. It begins to glow and shift, revealing hidden glyphs."
        ],
        rewards: [{ id: "money", amount: 10 }],
    },

    // -------- Floor 4 --------

    {
        id: "shelf_f4_1",
        map: 3,
        x: 67,
        y: 52,
        image: "assets/img/tile/shelf-4.png",
        collision: true, 
        zIndex: 1,
        animOnTrigger: false,
        notification: "Press A to search this shelf.",
        dialogue: [
            "You rummage through the shelf, finding a Choir Fragment."
        ],
        rewards: [{ id: "choir_fragment", amount: 1 }],
    },

    {
        id: "shelf_f4_2",
        map: 3,
        x: 24,
        y: 10,
        image: "assets/img/tile/shelf-4.png",
        collision: true, 
        zIndex: 1,
        animOnTrigger: false,
        notification: "Press A to search this shelf.",
        dialogue: [
            "You search the shelf, finding a Choir Fragment."
        ],
        rewards: [{ id: "choir_fragment", amount: 1 }],
    },
    

    {
        id: "echo_tile_1",
        map: 3,
        x: 30,
        y: 11,
        image: "assets/img/tile/shelf-4.png",
        collision: true, 
        zIndex: 1,
        animOnTrigger: false,
        notification: "Press A to Activate this Echo.",
        dialogue: [
            "You activate the Tile,",
            "I remember when the world spun slower, each cycle etched in glass and stone.",
            "The old drives hummed with stories, but now their voices flicker and fade."
        ],
        rewards: [{ id: "echo_fragment", amount: 2 }],
    },


    {
        id: "echo_tile_2",
        map: 3,
        x: 17,
        y: 72,
        image: "assets/img/tile/shelf-4.png",
        collision: true, 
        zIndex: 1,
        animOnTrigger: false,
        notification: "Press A to Activate this Echo.",
        dialogue: [
            "You activate the Tile,",
            "Fragments of memory drift through the Spires; lost names, broken codes.",
            "We cling to what remains, but the Architect’s hand grows restless, rewriting what was once known."
        ],
        rewards: [{ id: "echo_fragment", amount: 2 }],
    },
    

    {
        id: "echo_tile_3",
        map: 3,
        x: 65,
        y: 12,
        image: "assets/img/tile/shelf-4.png",
        collision: true, 
        zIndex: 1,
        animOnTrigger: false,
        notification: "Press A to Activate this Echo.",
        dialogue: [
            "You activate the Tile,",
            "The cycles repeat, but each time, more is forgotten.",
            "New layers rise, old ones crumble."
        ],
        rewards: [{ id: "echo_fragment", amount: 2 }],
    },
    

    {
        id: "glass_tree_1",
        map: 3,
        x: 21,
        y: 10,
        image: "assets/img/tile/glass-tree.png",
        collision: true, 
        zIndex: 1,
        animOnTrigger: false,
        notification: "Press A to Search this Glassberry Tree.",
        dialogue: [
            "You search the Glassberry Tree,",
            "Its crystalline leaves shimmer with an inner light.",
            "A Leaf falls into your hands."
        ],
        rewards: [{ id: "glassberry_leaf", amount: 1 }],
    },
    

    {
        id: "glass_tree_2",
        map: 3,
        x: 7,
        y: 73,
        image: "assets/img/tile/rock-3.png",
        collision: true, 
        zIndex: 1,
        animOnTrigger: false,
        notification: "Press A to Search this Glassberry Tree.",
        dialogue: [
            "You search the Glassberry Tree,",
            "Its crystalline leaves shimmer with an inner light.",
            "A Leaf falls into your hands."
        ],
        rewards: [{ id: "glassberry_leaf", amount: 1 }],
    },
    

    {
        id: "glass_tree_3",
        map: 3,
        x: 68,
        y: 59,
        image: "assets/img/tile/glass-tree.png",
        collision: true, 
        zIndex: 1,
        animOnTrigger: false,
        notification: "Press A to Search this Glassberry Tree.",
        dialogue: [
            "You search the Glassberry Tree,",
            "Its crystalline leaves shimmer with an inner light.",
            "A Leaf falls into your hands."
        ],
        rewards: [{ id: "glassberry_leaf", amount: 1 }],
    },
    

    {
        id: "glass_tree_4",
        map: 3,
        x: 49,
        y: 49,
        image: "assets/img/tile/glass-tree.png",
        collision: true, 
        zIndex: 1,
        animOnTrigger: false,
        notification: "Press A to Search this Glassberry Tree.",
        dialogue: [
            "You search the Glassberry Tree,",
            "Its crystalline leaves shimmer with an inner light.",
            "A Leaf falls into your hands."
        ],
        rewards: [{ id: "glassberry_leaf", amount: 1 }],
    },
    

    {
        id: "glass_tree_5",
        map: 3,
        x: 46,
        y: 19,
        image: "assets/img/tile/glass-tree.png",
        collision: true, 
        zIndex: 1,
        animOnTrigger: false,
        notification: "Press A to Search this Glassberry Tree.",
        dialogue: [
            "You search the Glassberry Tree,",
            "Its crystalline leaves shimmer with an inner light.",
            "A Leaf falls into your hands."
        ],
        rewards: [{ id: "glassberry_leaf", amount: 1 }],
    },
    

    {
        id: "glass_tree_6",
        map: 3,
        x: 10,
        y: 46,
        image: "assets/img/tile/glass-tree.png",
        collision: true, 
        zIndex: 1,
        animOnTrigger: false,
        notification: "Press A to Search this Glassberry Tree.",
        dialogue: [
            "You search the Glassberry Tree,",
            "Its crystalline leaves shimmer with an inner light.",
            "You unfortunately find nothing."
        ],
    },
    

    {
        id: "glass_tree_6",
        map: 3,
        x: 3,
        y: 1,
        image: "assets/img/tile/glass-tree.png",
        collision: true, 
        zIndex: 1,
        animOnTrigger: false,
        notification: "Press A to Search this Glassberry Tree.",
        dialogue: [
            "You search the Glassberry Tree,",
            "Its crystalline leaves shimmer with an inner light.",
            "You unfortunately find nothing."
        ],
    },

    // ----------- Floor 5

    {
        id: "cracked_mirror_1",
        map: 4,
        x: 5,
        y: 19,
        image: "assets/img/quests/cracked_mirror.png",
        collision: false,
        zIndex: 0,
        animOnTrigger: false,
        notification: "Press A to interact with this Cracked Mirror",
        dialogue: [
            "You reach out, your hand passes through the glass, and the world shifts around you."
        ],
        rewards: [{ id: "maxHealth_buff_small", amount: 2 }]
    },

    {
        id: "cracked_mirror_2",
        map: 4,
        x: 61,
        y: 17,
        image: "assets/img/quests/cracked_mirror.png",
        collision: false,
        zIndex: 0,
        animOnTrigger: false,
        notification: "Press A to interact with this Cracked Mirror",
        dialogue: [
            "The mirror’s surface ripples. For a moment, you see a path that wasn’t there before."
        ],
        rewards: [{ id: "atkSpeed_buff_small", amount: 2 }]
    },

    {
        id: "cracked_mirror_3",
        map: 4,
        x: 60,
        y: 2,
        image: "assets/img/quests/cracked_mirror.png",
        collision: false,
        zIndex: 0,
        animOnTrigger: false,
        notification: "Press A to interact with this Cracked Mirror",
        dialogue: [
            "A chill runs through you as your reflection flickers, then vanishes."
        ],
        rewards: [{ id: "health_buff_small", amount: 10 }]
    },

    {
        id: "mirror_1",
        map: 4,
        x: 22,
        y: 28,
        image: "assets/img/quests/cracked_mirror.png",
        collision: false,
        zIndex: 0,
        animOnTrigger: false,
        teleport: { map: 4, x: 18, y: 19 },
        allowRepeat: true,   
        persistAfterTrigger: true,
        notification: "Press A to interact with this Mirror",
        dialogue: [
            "This Mirror seems to be showing you a different room!"
        ],
        rewards: [],
    },

    {
        id: "mirror_2",
        map: 4,
        x: 26,
        y: 59,
        image: "assets/img/quests/cracked_mirror.png",
        collision: false,
        zIndex: 0,
        animOnTrigger: false,
        notification: "Press A to interact with this Mirror",
        dialogue: [
            "You reach into the mirror and grab a small vial!"
        ],
        rewards: [{ id: "health_buff_small", amount: 5 }],
    },
];

/*
    INTERACTABLE TILE TEMPLATE

    id:                  // Unique string identifier
    map:                 // Map index or name (number or string)
    x:                   // Tile X coordinate (number)
    y:                   // Tile Y coordinate (number)
    image:               // Path to static image (optional, if not using spriteSheet)
    spriteSheet:         // Path to sprite sheet (optional, for animated tiles)
    imageW:              // Width of the sprite/sheet in pixels (optional, for spriteSheet)
    imageH:              // Height of the sprite/sheet in pixels (optional, for spriteSheet)
    rows:                // Number of rows in sprite sheet (optional, for spriteSheet)
    cols:                // Number of columns in sprite sheet (optional, for spriteSheet)
    animSpeed:           // Animation speed (frames per update, optional, for spriteSheet)
    animOnTrigger:       // true/false (optional, if animation starts only after interaction)
    zIndex:              // 0 (below player) or 1 (above player), optional
    collision:           // true/false (optional, blocks movement if true)
    teleport:            // optional: { map: n, x: n, y: n } to teleport player on interaction
    allowRepeat:         // optional: allow multiple interactions (no one-time lock)
    persistAfterTrigger: // optional: keep tile spawned after interaction (even if static image)
    notification:        // Text to show when player is adjacent/on tile (optional)
    dialogue:            // Array of dialogue lines shown on interaction (required)
    rewards:             // Array of { id: "item_id", amount: n } (optional, items given on interaction)
    sound: {             // Sound options for this tile (optional)
        enabled: true,                // true/false, whether sound should play
        file: "sound_file.mp3",       // sound file name in assets/sound/sfx/interactions/
        type: "loop"|"ambient"|"trigger" // sound type: loop (continuous), ambient (random), trigger (play once on interaction)
    }

    // Example:
    {
        id: "example_interact_tile",
        map: 1,
        x: 10,
        y: 15,
        image: "assets/img/tile/rock-1.png",
        spriteSheet: "assets/img/worldSprites/statue_01.png",
        imageW: 512,
        imageH: 480,
        rows: 3,
        cols: 8,
        animSpeed: 6,
        animOnTrigger: true,
        zIndex: 1,
        collision: true,
        teleport: { map: 2, x: 5, y: 5 },
        allowRepeat: false,
        persistAfterTrigger: false,
        notification: "Press A to activate the statue.",
        dialogue: [
            "You touch the statue. It begins to glow and shift, revealing hidden glyphs."
        ],
        rewards: [
            { id: "memory_fragment", amount: 1 }
        ],
        sound: {
            enabled: true,
            file: "statue_activate.mp3",
            type: "trigger"
        }
    }
*/