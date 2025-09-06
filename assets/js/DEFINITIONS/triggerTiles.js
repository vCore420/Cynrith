const TRIGGER_TILES = [

    // -------- Floor 3 --------

    {
        id: "echo_f3_1",
        map: 2,
        x: 14,
        y: 11,
        type: "dialogue",
        sound: { enabled: true, file: "echo.mp3", type: "ambient" },
        dialogue: [
            "A Echo Flickers: 'Not all who climb return.'"
        ],
        oneTime: true // cant be triggered multiple times
    },

    {
        id: "echo_f3_2",
        map: 2,
        x: 11,
        y: 18,
        type: "dialogue",
        sound: { enabled: true, file: "echo.mp3", type: "ambient" },
        dialogue: [
            "A Echo Whispers: 'The sound of silence beckons, the architect awaits.'"
        ],
        oneTime: true,
        rewards: [
            { id: "glitch_fragment", amount: 1 }
        ]
    },

    {
        id: "echo_f3_3",
        map: 2,
        x: 8,
        y: 50,
        type: "dialogue",
        sound: { enabled: true, file: "echo.mp3", type: "ambient" },
        dialogue: [
            "A Echo Murmurs: 'Cycles repeat, but each step is yours alone.'"
        ],
        oneTime: true,
        rewards: [
            { id: "glitch_fragment", amount: 2 }
        ]
    },

    {
        id: "echo_f3_4",
        map: 2,
        x: 3,
        y: 59,
        type: "dialogue",
        sound: { enabled: true, file: "echo.mp3", type: "ambient" },
        dialogue: [
            "A Echo Glitches: 'Some fragments remember you, even if you forget them.'"
        ],
        oneTime: true,
        rewards: [
            { id: "glitch_fragment", amount: 1 }
        ]
    },

    {
        id: "echo_f3_5",
        map: 2,
        x: 36,
        y: 27,
        type: "dialogue",
        sound: { enabled: true, file: "echo.mp3", type: "ambient" },
        dialogue: [
            "A Echo Sings: 'Light flickers, roots entwine. The Thicket keeps its secrets aligned.'"
        ],
        oneTime: true,
        rewards: [
            { id: "glitch_fragment", amount: 1 }
        ]
    },
    // To Add: { type: "warp", ... }, { type: "frameChange", ... }
];


/*
    TRIGGER TILE TEMPLATE 

    id:           // Unique string identifier
    map:          // Map index 
    x:            // Tile X coordinate 
    y:            // Tile Y coordinate
    type:         // "dialogue"
    dialogue:     // Array of dialogue lines (required if type is "dialogue")
    rewards:      // Array of { id: "item_id", amount: n } (optional)
    oneTime:      // true/false (optional, default: false)
    sound: {      // Sound options for this tile (optional)
        enabled: true,                // true/false, whether sound should play
        file: "sound_file.mp3",       // sound file name in assets/sound/sfx/interactions/
        type: "loop"|"ambient"|"trigger" // sound type: loop (continuous), ambient (random), trigger (play once on trigger)
    }

    // Example:
    {
        id: "example_trigger_tile",
        map: 2,
        x: 5,
        y: 8,
        type: "dialogue",
        dialogue: [
            "A mysterious force echoes here."
        ],
        rewards: [
            { id: "glitch_fragment", amount: 2 }
        ],
        oneTime: true,
        sound: {
            enabled: true,
            file: "echo.mp3",
            type: "ambient"
        }
    }
*/