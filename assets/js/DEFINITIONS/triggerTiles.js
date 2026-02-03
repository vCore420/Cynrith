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

    // -------- Floor 5 --------

    {
        id: "echo_f5_1",
        map: 4,
        x: 10,
        y: 64, 
        type: "dialogue",
        sound: { enabled: true, file: "echo.mp3", type: "ambient" },
        dialogue: [
            "A whisper in the stone: \"Mirrors were built to remember the ones we lost. Sometimes they remember wrong.\""
        ],
        oneTime: true,
        rewards: [
            { id: "echo_fragment", amount: 1 }
        ]
    },

    {
        id: "echo_f5_2",
        map: 4,
        x: 32,
        y: 64, 
        type: "dialogue",
        sound: { enabled: true, file: "echo.mp3", type: "ambient" },
        dialogue: [
            "Faint humming: \"The Shadowed Hand met here, chanting over glass and blood. Their chairs are empty, their bargains linger.\""
        ],
        oneTime: true,
        rewards: [
            { id: "memory_shard", amount: 1 }
        ]
    },

    {
        id: "echo_f5_3",
        map: 4,
        x: 57,
        y: 66, 
        type: "dialogue",
        sound: { enabled: true, file: "echo.mp3", type: "ambient" },
        dialogue: [
            "A cold draft carries a voice: \"If a wall breathes near you, step aside. Some doors open for names you do not know.\""
        ],
        oneTime: true,
        rewards: [
            { id: "glass_shard", amount: 2 }
        ]
    },

    {
        id: "remnant_warn_1",
        map: 4,
        x: 46,
        y: 37, // corridor entry to side room
        type: "dialogue",
        sound: { enabled: true, file: "echo.mp3", type: "ambient" },
        dialogue: [
            "A cold whisper: \"A chair left waiting. A sigil left wanting.\"",
            "\"Step light; the Hand keeps count.\""
        ],
        oneTime: true,
        rewards: []
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