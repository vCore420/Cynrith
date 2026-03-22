// List of Sprites for the game world

const WORLD_SPRITES = [

    // Small Animated Cat Sprite
    {
        id: "cat_animation",   
        positions: [
            { map: "title0", x: 17, y: 5 }, 
            { map: 0, x: 28, y: 39 },  
            { map: 0, x: 31, y: 45 },
            { map: 2, x: 29, y: 2 },
            { map: 2, x: 53, y: 24 },
            { map: 2, x: 11, y: 55 },
            { map: 2, x: 55, y: 44 },
            { map: 2, x: 12, y: 19 },
        ],
        spriteSheet: "assets/img/worldSprites/cat.png",  
        imageW: 96,      
        imageH: 576,    
        rows: 18,         
        cols: 3,         
        animSpeed: 4,    
        zIndex: 0,         
        collision: false  
    },


    // Teleport stone, for title maps
    {
        id: "teleport_stone",   
        positions: [
            { map: "title1", x: 19, y: 5 }
        ],
        spriteSheet: "assets/img/tile/teleport_stone.png",  
        imageW: 832,      
        imageH: 960,    
        rows: 3,         
        cols: 13,         
        animSpeed: 4,    
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
            { map: 2, x: 48, y: 60 },
            { map: 2, x: 24, y: 22 },
            { map: 6, x: 20, y: 36 },
        ],
        spriteSheet: "assets/img/worldSprites/deer_statue.png",  
        imageW: 128,     
        imageH: 128,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 1,        
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
            { map: 2, x: 59, y: 50 },
            { map: 2, x: 11, y: 61 },
            { map: 6, x: 10, y: 43 },
        ],
        spriteSheet: "assets/img/worldSprites/oldman_statue.png",  
        imageW: 128,     
        imageH: 128,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 1,        
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
            { map: 2, x: 43, y: 9 },  
            { map: 2, x: 9, y: 26 },
            { map: 6, x: 35, y: 28 },
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
    },

    {
        id: "umbra_candle",    
        positions: [
            { map: 4, x: 35, y: 61 },
            { map: 4, x: 35, y: 61 },
            { map: 4, x: 48, y: 61 },
            { map: 4, x: 48, y: 77 },
            { map: 4, x: 35, y: 77 },
            { map: 4, x: 38, y: 69 },
            { map: 4, x: 46, y: 69 },
            { map: 4, x: 19, y: 40 },
            { map: 4, x: 1, y: 49 },
            { map: 4, x: 39, y: 24 },
            { map: 4, x: 17, y: 61 },
            { map: 4, x: 19, y: 69 },
            { map: 4, x: 11, y: 66 },
            { map: 4, x: 54, y: 45 },
            { map: 4, x: 77, y: 45 },
            { map: 4, x: 72, y: 53 },
            { map: 4, x: 77, y: 55 },
            { map: 4, x: 68, y: 65 },
            { map: 4, x: 64, y: 65 },
            { map: 4, x: 77, y: 71 },
            { map: 4, x: 77, y: 78 },
            { map: 4, x: 57, y: 58 },
            { map: 4, x: 45, y: 59 },
            { map: 4, x: 52, y: 39 },
            { map: 4, x: 52, y: 34 },
            { map: 4, x: 62, y: 39 },
            { map: 4, x: 62, y: 34 },
            { map: 4, x: 71, y: 34 },
            { map: 4, x: 71, y: 39 }

        ],
        spriteSheet: "assets/img/worldSprites/umbra_candle.png",  
        imageW: 768,     
        imageH: 64,      
        rows: 1,        
        cols: 12,         
        animSpeed: 4,     
        zIndex: 0,        
        collision: true   
    },

    // ---------- Floor 5 ----------

    {
        id: "umbra_banner",    
        positions: [
            { map: 4, x: 52, y: 29 },
            { map: 4, x: 62, y: 29 },
            { map: 4, x: 71, y: 29 },
            { map: 4, x: 39, y: 60 },
            { map: 4, x: 45, y: 60 },
            { map: 4, x: 59, y: 54 },
            { map: 4, x: 65, y: 54 },
            { map: 4, x: 70, y: 54 },
            { map: 4, x: 53, y: 61 },
            { map: 4, x: 21, y: 52 },
            { map: 4, x: 13, y: 52 },
            { map: 4, x: 7, y: 52 },
            { map: 4, x: 2, y: 52 },
            { map: 4, x: 14, y: 65 },
            { map: 4, x: 4, y: 73 },
            { map: 4, x: 28, y: 60 },
            { map: 4, x: 25, y: 75 },
            { map: 4, x: 58, y: 2 },
            { map: 4, x: 6, y: 2 },
            { map: 4, x: 28, y: 72 },
            { map: 4, x: 76, y: 8 },
            { map: 4, x: 65, y: 61 },

        ],
        spriteSheet: "assets/img/worldSprites/umbra_banner.png",  
        imageW: 64,     
        imageH: 64,      
        rows: 1,        
        cols: 1,         
        animSpeed: 0,     
        zIndex: 0,        
        collision: true   
    },
    
    // ----------- Floor 6 -----------

    {
        id: "castle_small",    
        positions: [
            { map: 5, x: 8, y: 4 }, 
            { map: 6, x: 37, y: 33 },
            { map: 6, x: 44, y: 54 }, 
            { map: 6, x: 61, y: 40 },
        ],
        spriteSheet: "assets/img/worldSprites/castle.png",  
        imageW: 128,     
        imageH: 256,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 1,        
        collision: true   
    },

    {
        id: "castle_big",    
        positions: [
            { map: 5, x: 7, y: 25 }, 
            { map: 6, x: 18, y: 56 },
        ],
        spriteSheet: "assets/img/worldSprites/castle2.png",  
        imageW: 320,     
        imageH: 256,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 1,        
        collision: true   
    },

    {
        id: "house_1",    
        positions: [
            { map: 5, x: 33, y: 31 }, 
            { map: 6, x: 61, y: 60 },
        ],
        spriteSheet: "assets/img/worldSprites/house_1.png",  
        imageW: 128,     
        imageH: 192,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 1,        
        collision: true   
    },

    {
        id: "house_2",    
        positions: [
            { map: 5, x: 18, y: 8 }, 
        ],
        spriteSheet: "assets/img/worldSprites/house_2.png",  
        imageW: 128,     
        imageH: 192,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 1,        
        collision: true   
    },

    {
        id: "sign_1",    
        positions: [
            { map: 5, x: 6, y: 4 }, 
        ],
        spriteSheet: "assets/img/worldSprites/sign_1.png",  
        imageW: 64,     
        imageH: 128,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 1,        
        collision: true   
    },

    {
        id: "sign_2",    
        positions: [
            { map: 5, x: 27, y: 16 }, 
        ],
        spriteSheet: "assets/img/worldSprites/sign_2.png",  
        imageW: 64,     
        imageH: 128,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 1,        
        collision: true   
    },

    {
        id: "sign_3",    
        positions: [
            { map: 6, x: 51, y: 7 }, 
            { map: 6, x: 58, y: 28 }, 
            { map: 6, x: 58, y: 10 },
            { map: 6, x: 51, y: 19 }, 
        ],
        spriteSheet: "assets/img/worldSprites/sign_3.png",  
        imageW: 64,     
        imageH: 128,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 1,        
        collision: true   
    },

    {
        id: "sign_4",    
        positions: [
            { map: 6, x: 58, y: 19 },  
            { map: 6, x: 51, y: 13 }, 
            { map: 6, x: 58, y: 7 }, 
            
        ],
        spriteSheet: "assets/img/worldSprites/sign_4.png",  
        imageW: 64,     
        imageH: 128,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 1,        
        collision: true   
    },

    {
        id: "tree_1",    
        positions: [
            { map: 5, x: 22, y: 25 }, 
            { map: 5, x: 32, y: 34 },
            { map: 5, x: 31, y: 15 },
            { map: 5, x: 13, y: 5 },
            { map: 5, x: 4, y: 22 },
            { map: 6, x: 28, y: 32 },
            { map: 6, x: 40, y: 45 },
            { map: 6, x: 62, y: 49 },
            { map: 6, x: 16, y: 60 },
        ],
        spriteSheet: "assets/img/worldSprites/tree_1.png",  
        imageW: 128,     
        imageH: 192,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 1,        
        collision: true   
    },

    {
        id: "tree_2",    
        positions: [
            { map: 5, x: 14, y: 26 }, 
            { map: 5, x: 35, y: 26 },
            { map: 5, x: 7, y: 16 },
            { map: 5, x: 28, y: 8 },
            { map: 5, x: 24, y: 36 },
            { map: 6, x: 35, y: 56 },
            { map: 6, x: 53, y: 56 },
            { map: 6, x: 11, y: 46 },
            { map: 6, x: 22, y: 60 },
        ],
        spriteSheet: "assets/img/worldSprites/tree_2.png",  
        imageW: 128,     
        imageH: 192,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 1,        
        collision: true   
    },

    {
        id: "bush2",    
        positions: [
            { map: 5, x: 4, y: 34 }, 
            { map: 5, x: 27, y: 26 },
            { map: 5, x: 10, y: 4 },
        ],
        spriteSheet: "assets/img/tile/bush2.png",  
        imageW: 64,     
        imageH: 64,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 0,        
        collision: true   
    },

    {
        id: "bush3",    
        positions: [
            { map: 5, x: 11, y: 29 }, 
            { map: 5, x: 12, y: 13 },
            { map: 5, x: 20, y: 8 },
        ],
        spriteSheet: "assets/img/tile/bush3.png",  
        imageW: 64,     
        imageH: 64,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 0,        
        collision: true   
    },

    {
        id: "bush4",    
        positions: [
            { map: 5, x: 23, y: 31 }, 
            { map: 5, x: 7, y: 10 },
            { map: 5, x: 7, y: 16 },
            { map: 5, x: 28, y: 4 },
        ],
        spriteSheet: "assets/img/tile/bush4.png",  
        imageW: 64,     
        imageH: 64,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 0,        
        collision: true   
    },

    {
        id: "water_rock1",    
        positions: [
            { map: 5, x: 18, y: 27 }, 
            { map: 5, x: 35, y: 21 },
            { map: 5, x: 2, y: 19 },
        ],
        spriteSheet: "assets/img/tile/water_rock1.png",  
        imageW: 128,     
        imageH: 128,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 0,        
        collision: true   
    },

    {
        id: "water_rock2",    
        positions: [
            { map: 5, x: 28, y: 23 }, 
            { map: 5, x: 18, y: 24 },
            { map: 5, x: 17, y: 2 },
        ],
        spriteSheet: "assets/img/tile/water_rock2.png",  
        imageW: 128,     
        imageH: 128,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 0,        
        collision: true   
    },

    // ---------- Floor 7 ----------

    {
        id: "wharf_market_1",    
        positions: [
            { map: 6, x: 58, y: 30 }, 
            { map: 6, x: 58, y: 12 },
        ],
        spriteSheet: "assets/img/worldSprites/house_1.png",  
        imageW: 128,     
        imageH: 192,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 0,        
        collision: true   
    },

    {
        id: "wharf_market_2",    
        positions: [
            { map: 6, x: 58, y: 27 }, 
            { map: 6, x: 58, y: 15 }, 
            { map: 6, x: 50, y: 9 },
        ],
        spriteSheet: "assets/img/worldSprites/house_2.png",  
        imageW: 128,     
        imageH: 192,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 0,        
        collision: true   
    },

    {
        id: "wharf_market_3",    
        positions: [
            { map: 6, x: 58, y: 24 }, 
            { map: 6, x: 58, y: 9 }, 
            { map: 6, x: 50, y: 18 }, 
        ],
        spriteSheet: "assets/img/worldSprites/house_3.png",  
        imageW: 128,     
        imageH: 192,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 0,        
        collision: true   
    },

    {
        id: "wharf_market_4",    
        positions: [
            { map: 6, x: 58, y: 21 }, 
            { map: 6, x: 50, y: 15 }, 
        ],
        spriteSheet: "assets/img/worldSprites/house_4.png",  
        imageW: 128,     
        imageH: 192,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 0,        
        collision: true   
    },

    {
        id: "wharf_market_5",    
        positions: [
            { map: 6, x: 58, y: 18 }, 
            { map: 6, x: 50, y: 6 },
        ],
        spriteSheet: "assets/img/worldSprites/house_5.png",  
        imageW: 128,     
        imageH: 192,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 0,        
        collision: true   
    },

    {
        id: "wharf_market_6",    
        positions: [
            { map: 6, x: 58, y: 6 }, 
            { map: 6, x: 50, y: 21 }, 
        ],
        spriteSheet: "assets/img/worldSprites/house_6.png",  
        imageW: 128,     
        imageH: 192,      
        rows: 1,        
        cols: 1,          
        row: 0,           
        animSpeed: 0,     
        zIndex: 0,        
        collision: true   
    },



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