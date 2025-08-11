// List of Sprites for the game world

const WORLD_SPRITES = [

    // Small Animated Cat Sprite
    {
        id: "cat_animation",   
        positions: [
            { map: "title0", x: 17, y: 5 }, 
            { map: 0, x: 28, y: 39 },  
            { map: 0, x: 31, y: 45 }
        ],
        spriteSheet: "assets/img/worldSprites/cat.png",  
        imageW: 96,      
        imageH: 576,    
        rows: 18,         
        cols: 3,         
        animSpeed: 6,    
        zIndex: 0,         
        collision: false  
    },


    // Deer Statue Tile
    {
        id: "deer_statue",    
        positions: [
            { map: 1, x: 37, y: 13 }, 
            { map: 1, x: 26, y: 39 },
            { map: 1, x: 5, y: 5 }, 
            { map: 1, x: 40, y: 3 },
            { map: 1, x: 7, y: 16 },
            { map: 1, x: 25, y: 19 },
            { map: 1, x: 6, y: 43 },
            { map: 1, x: 46, y: 31 },
        ],
        spriteSheet: "assets/img/worldSprites/deer_statue.png",  
        imageW: 128,     
        imageH: 128,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 0,        
        collision: true   
    },


    // Old Man Statue Tile
    {
        id: "oldman_statue",    
        positions: [
            { map: 1, x: 35, y: 26 }, 
            { map: 1, x: 47, y: 47 },
            { map: 1, x: 3, y: 32 }, 
            { map: 1, x: 23, y: 11 },
            { map: 1, x: 16, y: 21 },
            { map: 1, x: 47, y: 15 },
            { map: 1, x: 14, y: 2 },
            { map: 1, x: 23, y: 32 }, 
        ],
        spriteSheet: "assets/img/worldSprites/oldman_statue.png",  
        imageW: 128,     
        imageH: 128,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 0,        
        collision: true   
    },


    // Dragon Bones Tile
    {
        id: "dragon_bones",    
        positions: [
            { map: "title0", x: 3, y: 6 },
            { map: 1, x: 6, y: 23 }, 
            { map: 1, x: 28, y: 4 }, 
            { map: 1, x: 24, y: 43 }, 
            { map: 1, x: 17, y: 16 }, 
        ],
        spriteSheet: "assets/img/worldSprites/dragon_bones.png",  
        imageW: 256,     
        imageH: 256,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 0,        
        collision: true   
    } 
    
];


/*
// Sprite loader, this is to load sprtie sheets of any size and frames at definded locations in the game world
// Can load sprite sheets or single tiles (best way to load a over sized tiles and advanced sprite sheets into this 64x64 world)
// Define all the properties of the sprite sheet/imnage to be used in game and they will load into each map as they are meant to when that map loads in to the game
// Script dynamically works out the diference in size and postions the sprite nice and evenly in the world  
// Works with any sized image and any amount of fames
// Each sprite can have an unlimited amount of locations it spawns at

// Template
---

{
    id: "",                                             // Unique id for this sprite
    positions: [
        // { map: 0, x: 0, y: 0 },                      // Map index and tile coordinates
    ],
    spriteSheet: ""assets/img/worldSprites/.png",       // Path to sprite sheet image
    imageW: 0,                                          // Image width in px
    imageH: 0,                                          // Image height in px
    rows: 1,                                            // Number of rows in the sheet
    cols: 1,                                            // Number of columns (frames per row)
    animSpeed: 0,                                       // Ticks per frame (0 for no animation, still image or display 1st frame only)
    zIndex: 0,                                          // 0 for sprite to sit below player, 1 for above
    collision: false                                    // true or false, if true and sprite is above player then player will collide with bottom tiles of image and walk behind the rest, if sprite is below player the whole image has collisions
}

---
*/