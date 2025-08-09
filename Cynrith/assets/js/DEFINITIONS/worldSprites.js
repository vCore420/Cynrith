// List of Sprite sprites for the game world
// Each Sprite sheet is loaded dynamically based on the overall size of the image and the row and columns it has
// Define their locations in the world and theyll load as you have set them to as each map loads


const WORLD_SPRITES = [
    {
        id: "cat_animation",    // Unique id per sprite sheet 
        positions: [
            { map: 0, x: 28, y: 39 },  // map id and coords, add as many locations as you would like
            { map: 0, x: 31, y: 45 }
        ],
        spriteSheet: "assets/img/worldSprites/cat.png",  // Sprite Sheet to load
        imageW: 96,      // overall image width in px
        imageH: 576,      // overall image height in px
        rows: 18,          // number of rows in the sheet
        cols: 3,          // number of columns (frames per row)
        row: 1,           // which row to animate (0-based)
        animSpeed: 6,    // ticks per frame
        zIndex: 0,         // for layering, 0 for below player, 1 for above
        collision: false   // if the tile has collisions (applies to bottom tile/s)
    } 
    
    // Add more sprites here
];
