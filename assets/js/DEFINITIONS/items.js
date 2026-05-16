// Inventory item definitions

const ITEM_DEFINITIONS = {

    // --------------- Buffs ---------------


    health_buff_small: {
        id: "health_buff_small",
        name: "Health Buff - Small",
        description: "Restores 10 health.",
        image: "assets/img/items/health_buff_small.png",
        rarity: "common",
        stackable: true,
        useable: true,
        removeable: true,
        sound: 'health.mp3'
    },


    atk_buff_small: {
        id: "atk_buff_small",
        name: "Attack Buff - Small",
        description: "Increases attack damage by 3.",
        image: "assets/img/items/atk_buff_small.png",
        rarity: "Rare",
        stackable: true,
        useable: true,
        removeable: true,
        sound: 'atk.mp3'
    },


    def_buff_small: {
        id: "def_buff_small",
        name: "Defence Buff - Small",
        description: "Increases Defence by 3.",
        image: "assets/img/items/def_buff_small.png",
        rarity: "Rare",
        stackable: true,
        useable: true,
        removeable: true,
        sound: 'def.mp3'
    },

    maxHealth_buff_small: {
        id: "maxHealth_buff_small",
        name: "Max Health Buff - Small",
        description: "Increases Max Health by 10.",
        image: "assets/img/items/maxHealth_buff_small.png",
        rarity: "Rare",
        stackable: true,
        useable: true,
        removeable: true,
        sound: 'maxHealth.mp3'
    },

    atkSpeed_buff_small: {
        id: "atkSpeed_buff_small",
        name: "Attack Speed Buff - Small",
        description: "Increases attack speed by 10.",
        image: "assets/img/items/atkSpeed_buff_small.png",
        rarity: "Rare",
        stackable: true,
        useable: true,
        removeable: true,
        sound: 'atkSpeed.mp3'
    },

    health_buff_large: {
        id: "health_buff_large",
        name: "Health Buff - Large",
        description: "Restores 30 health.",
        image: "assets/img/items/health_buff_large.png",
        rarity: "rare",
        stackable: true,
        useable: true,
        removeable: true,
        sound: 'health.mp3'
    },


    atk_buff_large: {
        id: "atk_buff_large",
        name: "Attack Buff - Large",
        description: "Increases attack damage by 18.",
        image: "assets/img/items/atk_buff_large.png",
        rarity: "epic",
        stackable: true,
        useable: true,
        removeable: true,
        sound: 'atk.mp3'
    },


    def_buff_large: {
        id: "def_buff_large",
        name: "Defence Buff - Large",
        description: "Increases Defence by 15.",
        image: "assets/img/items/def_buff_large.png",
        rarity: "epic",
        stackable: true,
        useable: true,
        removeable: true,
        sound: 'def.mp3'
    },

    maxHealth_buff_large: {
        id: "maxHealth_buff_large",
        name: "Max Health Buff - Large",
        description: "Increases Max Health by 30.",
        image: "assets/img/items/maxHealth_buff_large.png",
        rarity: "epic",
        stackable: true,
        useable: true,
        removeable: true,
        sound: 'maxHealth.mp3'
    },

    atkSpeed_buff_large: {
        id: "atkSpeed_buff_large",
        name: "Attack Speed Buff - Large",
        description: "Increases attack speed by 20.",
        image: "assets/img/items/atkSpeed_buff_large.png",
        rarity: "epic",
        stackable: true,
        useable: true,
        removeable: true,
        sound: 'atkSpeed.mp3'
    },

    umbra_tonic: {
        id: "umbra_tonic",
        name: "Umbra Tonic",
        description: "A cold draught that hardens the skin. Boosts defence by 8.",
        image: "assets/img/items/umbra_tonic.png",
        rarity: "rare",
        stackable: true,
        useable: true,
        removeable: true,
        sound: "def.mp3"
    },

    clarity_tincture: {
        id: "clarity_tincture",
        name: "Clarity Tincture",
        description: "Cuts through lingering echoes. Cleanses player health by 30.",
        image: "assets/img/items/clarity_tincture.png",
        rarity: "epic",
        stackable: true,
        useable: true,
        removeable: true,
        sound: "health.mp3"
    },

    mirror_tonic: {
        id: "mirror_tonic",
        name: "Mirror Tonic",
        description: "Light-foot brew that heightens Atk Speed by 15, like slipping between reflections.",
        image: "assets/img/items/mirror_tonic.png",
        rarity: "epic",
        stackable: true,
        useable: true,
        removeable: true,
        sound: "atkSpeed.mp3"
    },

    
    // --------------- Weapons ---------------


    basic_sword: {
        id: "basic_sword",
        name: "Basic Sword",
        description: "A sharp blade. Deals good damage.",
        image: "assets/img/items/basic_sword.png",
        rarity: "common",
        stackable: false,
        useable: false,
        removeable: false,
        itemType: "weapon",
        attackBonus: 0,
        rangeTiles: 2,
        slashSfx: "player/sword_slash.mp3",
        hitSfx: "player/sword_hit.mp3"
    },

    mirror_sword: {
        id: "mirror_sword",
        name: "Mirror Sword",
        description: "A Mirror Blade, reflecting the light as it cuts.",
        image: "assets/img/items/mirror_sword.png",
        rarity: "common",
        stackable: false,
        useable: false,
        removeable: false,
        itemType: "weapon",
        attackBonus: 3,
        rangeTiles: 2,
        slashSfx: "player/sword_slash.mp3",
        hitSfx: "player/sword_hit.mp3" 
    },

    obsidian_sword: {
        id: "obsidian_sword",
        name: "Obsidian_Sword",
        description: "A Blade Forged from Obsidian, Pack a Strong Blow.",
        image: "assets/img/items/obsidian_sword.png",
        rarity: "rare",
        stackable: false,
        useable: false,
        removeable: false,
        itemType: "weapon",
        attackBonus: 20,
        rangeTiles: 3,
        slashSfx: "player/sword_slash.mp3",
        hitSfx: "player/sword_hit.mp3" 
    },


    // --------------- Currency ---------------

    money: {
        id: "money",
        name: "Coin",
        description: "Currency used for trading.",
        image: "assets/img/items/coin.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false
    },

    blue_gem: {
        id: "blue_gem",
        name: "Blue Skill Gem",
        description: "A gem infused with the essence of water. Unlocks new skills",
        image: "assets/img/items/blue_gem.png",
        rarity: "legendary",
        stackable: true,
        useable: false,
        removeable: true
    },

    red_gem: {
        id: "red_gem",
        name: "Red Skill Gem",
        description: "A gem infused with the essence of fire. Unlocks new skills",
        image: "assets/img/items/red_gem.png",
        rarity: "legendary",
        stackable: true,
        useable: false,
        removeable: true
    },

    pink_gem: {
        id: "pink_gem",
        name: "Pink Skill Gem",
        description: "A gem infused with the essence of love. Unlocks new skills",
        image: "assets/img/items/pink_gem.png",
        rarity: "legendary",
        stackable: true,
        useable: false,
        removeable: true
    },

    // --------------- Home Plot Items ---------------

    key_without_a_door: {
        id: "key_without_a_door",
        name: "Key without a Door",
        description: "A key that doesn't open doors.",
        image: "assets/img/items/key.png",
        rarity: "legendary",
        stackable: false,
        useable: true,
        removeable: false,
        consumeOnUse: false,
        sound: "legendary.mp3"
    },

    // test tiems

    home_chair_oak: {
        id: "home_chair_oak",
        name: "Oak Chair",
        description: "A sturdy oak chair for your Home Plot.",
        image: "assets/img/tile/chair_1.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/chair_1.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: true,
            canStackOnPlaced: false,
            footprintW: 1,
            footprintH: 1
        }
    },

    // floor 2 items

    f2_rock: {
        id: "f2_rock",
        name: "Humming Rock",
        description: "A rock that hums with a mysterious energy.",
        image: "assets/img/tile/rock-2.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/rock-2.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: true,
            canStackOnPlaced: false,
            footprintW: 1,
            footprintH: 1
        }
    },

    f2_mushroom: {
        id: "f2_mushroom",
        name: "Mushroom",
        description: "A mushroom that thrives in the cracks between old stones.",
        image: "assets/img/tile/mushroom-2.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/mushroom-2.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: true,
            canStackOnPlaced: false,
            footprintW: 1,
            footprintH: 1
        }
    },

    // floor 3 items

    f3_glowcap_cluster: {
        id: "f3_glowcap_cluster",
        name: "Glowcap Cluster",
        description: "A cluster of bioluminescent mushrooms gathered from the Gloomroot Thicket.",
        image: "assets/img/tile/mushroom-flash-1.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/mushroom-flash-1.png",
            imageW: 128,
            imageH: 64,
            rows: 1,
            cols: 2,
            animSpeed: 10,
            zIndex: 0,
            collision: false,
            canStackOnPlaced: false,
            footprintW: 1,
            footprintH: 1
        }
    },

    f3_memory_stone: {
        id: "f3_memory_stone",
        name: "Memory Stone",
        description: "A humming stone from the Thicket, faintly warm with held memory.",
        image: "assets/img/tile/rock-1.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/rock-1.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: true,
            canStackOnPlaced: false,
            footprintW: 1,
            footprintH: 1
        }
    },

    f3_deer_statue: {
        id: "f3_deer_statue",
        name: "Deer Statue",
        description: "A weathered deer statue like those half-buried through the Thicket.",
        image: "assets/img/worldSprites/deer_statue.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/worldSprites/deer_statue.png",
            imageW: 128,
            imageH: 128,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 1,
            collision: true,
            canStackOnPlaced: false,
            footprintW: 2,
            footprintH: 2
        }
    },

    f3_oldman_statue: {
        id: "f3_oldman_statue",
        name: "Old Watcher Statue",
        description: "A worn statue from an older memory of Cynrith, carried out of the Thicket.",
        image: "assets/img/worldSprites/oldman_statue.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/worldSprites/oldman_statue.png",
            imageW: 128,
            imageH: 128,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 1,
            collision: true,
            canStackOnPlaced: false,
            footprintW: 2,
            footprintH: 2
        }
    },

    // floor 4 items

    f4_glassberry_sapling: {
        id: "f4_glassberry_sapling",
        name: "Glassberry Sapling",
        description: "A small crystalline tree from the Shattered Spires, delicate but still holding its shape.",
        image: "assets/img/tile/glass-tree.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/glass-tree.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 1,
            collision: true,
            canStackOnPlaced: false,
            footprintW: 1,
            footprintH: 1
        }
    },

    f4_archive_shelf: {
        id: "f4_archive_shelf",
        name: "Archive Shelf",
        description: "A shelf recovered from the Grand Hall, still arranged as though the records matter.",
        image: "assets/img/tile/shelf-4.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/shelf-4.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 1,
            collision: true,
            canStackOnPlaced: false,
            footprintW: 1,
            footprintH: 1
        }
    },

    f4_jar: {
        id: "f4_jar",
        name: "Echo Jar",
        description: "A jar that softly vibrates with the echoes of the Spires. It seems to hum with quiet potential.",
        image: "assets/img/tile/jar-1.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/jar-1.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: false,
            canStackOnPlaced: false,
            footprintW: 1,
            footprintH: 1
        }
    },

    f4_resonance_glass: {
        id: "f4_resonance_glass",
        name: "Resonance Glass",
        description: "A cluster of cut glass from the Spires, sharp with old purpose and quiet vibration.",
        image: "assets/img/tile/glass-rock-2.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/glass-rock-2.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: false,
            canStackOnPlaced: false,
            footprintW: 1,
            footprintH: 1
        }
    },

    // floor 5 items

        f5_umbra_candle: {
        id: "f5_umbra_candle",
        name: "Umbral Candle",
        description: "A cold blue candle from Umbracourt. Its flame burns with the stillness of a hall that remembers too much.",
        image: "assets/img/worldSprites/umbra_candle.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/worldSprites/umbra_candle.png",
            imageW: 768,
            imageH: 64,
            rows: 1,
            cols: 12,
            animSpeed: 4,
            zIndex: 0,
            collision: false,
            canStackOnPlaced: false,
            footprintW: 1,
            footprintH: 1
        }
    },

    f5_umbra_banner: {
        id: "f5_umbra_banner",
        name: "Umbral Banner",
        description: "A dark hall-banner once hung in Umbracourt. It carries the severe elegance of a place built to judge and record.",
        image: "assets/img/worldSprites/umbra_banner.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/worldSprites/umbra_banner.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: false,
            canStackOnPlaced: false,
            footprintW: 1,
            footprintH: 1
        }
    },

    f5_marked_mirror: {
        id: "f5_marked_mirror",
        name: "Marked Mirror",
        description: "A mirror from Umbracourt, silvered with the uneasy sense that it is still deciding what to reflect.",
        image: "assets/img/quests/mirror.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/quests/mirror.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 1,
            collision: false,
            canStackOnPlaced: false,
            footprintW: 1,
            footprintH: 1
        }
    },

    f5_shadow_sigil: {
        id: "f5_shadow_sigil",
        name: "Shadow Sigil",
        description: "A display sigil patterned after the marks once carried by the Shadowed Hand. It looks orderly in a way that invites distrust.",
        image: "assets/img/items/command_sigil.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/items/command_sigil.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: false,
            canStackOnPlaced: false,
            footprintW: 1,
            footprintH: 1
        }
    },

    f5_shadow_decanter: {
        id: "f5_shadow_decanter",
        name: "Shadow Decanter",
        description: "A narrow glass vessel from Umbracourt, clouded with faint residue as though it once held something meant for ritual rather than comfort.",
        image: "assets/img/tile/jar-2.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/jar-2.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: false,
            canStackOnPlaced: false,
            footprintW: 1,
            footprintH: 1
        }
    },

    // floor 6 items

    f6_veil_waymarker: {
        id: "f6_veil_waymarker",
        name: "Veil Waymarker",
        description: "A weathered sign from the Waystation Veil. It gives even a small patch of ground the feeling of a road worth following.",
        image: "assets/img/worldSprites/sign_3.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/worldSprites/sign_3.png",
            imageW: 64,
            imageH: 128,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 1,
            collision: true,
            canStackOnPlaced: false,
            footprintW: 1,
            footprintH: 2
        }
    },

    f6_traveler_signpost: {
        id: "f6_traveler_signpost",
        name: "Traveler Signpost",
        description: "A taller signpost once used to guide tired travelers through the meadow paths of the Veil.",
        image: "assets/img/worldSprites/sign_4.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/worldSprites/sign_4.png",
            imageW: 64,
            imageH: 128,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 1,
            collision: true,
            canStackOnPlaced: false,
            footprintW: 1,
            footprintH: 2
        }
    },

    f6_meadow_pine: {
        id: "f6_meadow_pine",
        name: "Meadow Pine",
        description: "An evergreen from the quiet edge of the Waystation Veil, shaped by patient wind and dusklight.",
        image: "assets/img/worldSprites/tree_1.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/worldSprites/tree_1.png",
            imageW: 128,
            imageH: 192,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 1,
            collision: true,
            canStackOnPlaced: false,
            footprintW: 2,
            footprintH: 3
        }
    },

    f6_shelter_pine: {
        id: "f6_shelter_pine",
        name: "Shelter Pine",
        description: "A broader pine like those that stand watch over the Waystation paths, more sheltering than ornamental.",
        image: "assets/img/worldSprites/tree_2.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/worldSprites/tree_2.png",
            imageW: 128,
            imageH: 192,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 1,
            collision: true,
            canStackOnPlaced: false,
            footprintW: 2,
            footprintH: 3
        }
    },

    f6_waystation_tower: {
        id: "f6_waystation_tower",
        name: "Waystation Tower",
        description: "A small blue-stone tower modeled after the quiet keeps seen beyond the meadow. It makes a Home Plot feel watched over rather than walled in.",
        image: "assets/img/worldSprites/castle.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/worldSprites/castle.png",
            imageW: 128,
            imageH: 256,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 1,
            collision: true,
            canStackOnPlaced: false,
            footprintW: 2,
            footprintH: 4
        }
    },
    
    // floor 7 items
    
    fence1: {
        id: "fence1",
        name: "Oak Fence",
        description: "A sturdy fence for your Home Plot.",
        image: "assets/img/worldSprites/fence.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/worldSprites/fence.png",
            imageW: 96,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: true,
            canStackOnPlaced: false,
            footprintW: 2,
            footprintH: 1
        }
    },

    gazebo1: {
        id: "gazebo1",
        name: "Gazebo",
        description: "A beautiful gazebo for your Home Plot.",
        image: "assets/img/worldSprites/gazebo.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/worldSprites/gazebo.png",
            imageW: 144,
            imageH: 144,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: true,
            canStackOnPlaced: false,
            footprintW: 2,
            footprintH: 2
        }
    },
    
    home_cabin_1: {
        id: "home_cabin_1",
        name: "Cabin House",
        description: "A small cabin. Has a private interior.",
        image: "assets/img/worldSprites/house_3.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/worldSprites/house_3.png",
            imageW: 128,
            imageH: 192,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: true,
            canStackOnPlaced: false,
            footprintW: 2,
            footprintH: 3,
            isHouse: true,
            doorTiles: [{ x: 0, y: 0 }],
            interiorTemplateMap: "map6_int1",
            interiorExitTile: { x: 2, y: 6 }
        }
    },

    grass1: {
        id: "grass1",
        name: "Grass",
        description: "A patch of lush green grass.",
        image: "assets/img/tile/Gass1.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/Gass1.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: false,
            canStackOnPlaced: true,
            footprintW: 1,
            footprintH: 1
        }
    },

    grass2: {
        id: "grass2",
        name: "Grass",
        description: "A patch of lush green grass.",
        image: "assets/img/tile/Gass2.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/Gass2.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: true,
            canStackOnPlaced: true,
            footprintW: 1,
            footprintH: 1
        }
    },

    grass3: {
        id: "grass3",
        name: "Grass",
        description: "A patch of lush green grass.",
        image: "assets/img/tile/Gass3.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/Gass3.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: true,
            canStackOnPlaced: true,
            footprintW: 1,
            footprintH: 1
        }
    },

    grass4: {
        id: "grass4",
        name: "Grass",
        description: "A patch of lush green grass.",
        image: "assets/img/tile/Gass4.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/Gass4.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: true,
            canStackOnPlaced: true,
            footprintW: 1,
            footprintH: 1
        }
    },

    grass5: {
        id: "grass5",
        name: "Grass",
        description: "A patch of lush green grass.",
        image: "assets/img/tile/Gass5.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/Gass5.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: true,
            canStackOnPlaced: true,
            footprintW: 1,
            footprintH: 1
        }
    },

    grass6: {
        id: "grass6",
        name: "Grass",
        description: "A patch of lush green grass.",
        image: "assets/img/tile/Gass6.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/Gass6.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: true,
            canStackOnPlaced: true,
            footprintW: 1,
            footprintH: 1
        }
    },

    grass7: {
        id: "grass7",
        name: "Grass",
        description: "A patch of lush green grass.",
        image: "assets/img/tile/Gass7.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/Gass7.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: true,
            canStackOnPlaced: true,
            footprintW: 1,
            footprintH: 1
        }
    },

    grass8: {
        id: "grass8",
        name: "Grass",
        description: "A patch of lush green grass.",
        image: "assets/img/tile/Gass8.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/Gass8.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: true,
            canStackOnPlaced: true,
            footprintW: 1,
            footprintH: 1
        }
    },

    grass9: {
        id: "grass9",
        name: "Grass",
        description: "A patch of lush green grass.",
        image: "assets/img/tile/Gass9.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/Gass9.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: true,
            canStackOnPlaced: true,
            footprintW: 1,
            footprintH: 1
        }
    },

    cliff1: {
        id: "cliff1",
        name: "Cliff Right",
        description: "A steep cliff face.",
        image: "assets/img/tile/Cliff1.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/Cliff1.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: true,
            canStackOnPlaced: false,
            footprintW: 1,
            footprintH: 1
        }
    },

    cliff2: {
        id: "cliff2",
        name: "Cliff Middle",
        description: "A steep cliff face.",
        image: "assets/img/tile/Cliff2.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/Cliff2.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: true,
            canStackOnPlaced: false,
            footprintW: 1,
            footprintH: 1
        }
    },

    cliff3: {
        id: "cliff3",
        name: "Cliff Left",
        description: "A steep cliff face.",
        image: "assets/img/tile/Cliff3.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/Cliff3.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: true,
            canStackOnPlaced: false,
            footprintW: 1,
            footprintH: 1
        }
    },

    steps1: {
        id: "steps1",
        name: "Steps Left",
        description: "A set of stone steps.",
        image: "assets/img/tile/Steps1.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/Steps1.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: false,
            canStackOnPlaced: false,
            footprintW: 1,
            footprintH: 1
        }
    },

    steps2: {
        id: "steps2",
        name: "Steps Middle",
        description: "A set of stone steps.",
        image: "assets/img/tile/Steps2.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/Steps2.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: false,
            canStackOnPlaced: false,
            footprintW: 1,
            footprintH: 1
        }
    },

    steps3: {
        id: "steps3",
        name: "Steps Right",
        description: "A set of stone steps.",
        image: "assets/img/tile/Steps3.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false,
        homePlaceable: true,
        homeDef: {
            spriteSheet: "assets/img/tile/Steps3.png",
            imageW: 64,
            imageH: 64,
            rows: 1,
            cols: 1,
            animSpeed: 0,
            zIndex: 0,
            collision: false,
            canStackOnPlaced: false,
            footprintW: 1,
            footprintH: 1
        }
    },

    
    // --------------- loot, Drops, Quest Items ---------------


    slime_ball: {
        id: "slime_ball",
        name: "Slime Ball",
        description: "A gooey ball of slime. Might be useful for a quest.",
        image: "assets/img/items/slime_ball.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: true
    },
    

    dewleaf: {
        id: "dewleaf",
        name: "Dewleaf",
        description: "A delicate leaf that glistens with morning dew. Prized by herbalists.",
        image: "assets/img/items/dewleaf.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: true
    },


    dustroot: {
        id: "dustroot",
        name: "Dustroot",
        description: "A root that thrives in dusty environments. Used in various potions.",
        image: "assets/img/items/dustroot.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: true
    },

    
    fractured_relic_1: {
        id: "fractured_relic_1",
        name: "Fractured Relic",
        description: "A fragment of a once-mighty artifact. Holds mysterious power.",
        image: "assets/img/items/fractured_relic_1.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: true
    },


    twilight_totem: {
        id: "twilight_totem",
        name: "Twilight Totem",
        description: "A mysterious totem that pulses with a soft light. Said to guide lost souls.",
        image: "assets/img/items/twilight_totem.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: true
    },

    

    lost_pages: {
        id: "lost_pages",
        name: "Lost Pages",
        description: "Pages torn from a forgotten time. Contains ancient knowledge.",
        image: "assets/img/items/lost_pages.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: false
    },

    
    bioluminescent_mushroom: {
        id: "bioluminescent_mushroom",
        name: "Bioluminescent Mushroom",
        description: "A glowing mushroom found deep in the Thicket. Used in potions and quests.",
        image: "assets/img/items/bioluminescent_mushroom.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: false
    },


    memory_fragment: {
        id: "memory_fragment",
        name: "Memory Fragment",
        description: "A fragment of lost memory. Sought by lorekeepers and chroniclers.",
        image: "assets/img/items/memory_fragment.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: true
    },


    glitch_fragment: {
        id: "glitch_fragment",
        name: "Glitch Fragment",
        description: "A fragment of digital distortion, pulsing with strange energy.",
        image: "assets/img/items/glitch_fragment.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: true
    },

    
    memory_shard: {
        id: "memory_shard",
        name: "Memory Shard",
        description: "A crystalline shard containing echoes of lost memories. Valuable to lorekeepers.",
        image: "assets/img/items/memory_shard.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: true
    },


    echo_fragment: {
        id: "echo_fragment",
        name: "Echo Fragment",
        description: "A fragment of a lingering echo, pulsing with spectral energy.",
        image: "assets/img/items/echo_fragment.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: true
    },


    glass_shard: {
        id: "glass_shard",
        name: "Glass Shard",
        description: "A sharp piece of fractured glass, shimmering with circuit-like patterns.",
        image: "assets/img/items/glass_shard.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: true
    },


    choir_fragment: {
        id: "choir_fragment",
        name: "Choir Fragment",
        description: "A fragment of the Architect's Choir, resonating with lost harmony.",
        image: "assets/img/items/choir_fragment.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: true
    },

    glassberry_leaf: {
        id: "glassberry_leaf",
        name: "Glassberry Leaf",
        description: "A vibrant leaf from the Glassberry plant, known for its comforting properties and rich aroma.",
        image: "assets/img/items/glassberry_leaf.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: true
    },

    glassberry_tea: {
        id: "glassberry_tea",
        name: "Glassberry Tea",
        description: "A soothing tea made from Glassberry Leaves, its said that those who drink it feel a calming sensation that regenerates their health fully.",
        image: "assets/img/items/glassberry_tea.png",
        rarity: "legendary",
        stackable: true,
        useable: true,
        removeable: true
    },

    command_sigil: {
        id: "command_sigil",
        name: "Command Sigil",
        description: "An etched sigil once used by the Shadowed Hand to bind echoes.",
        image: "assets/img/items/command_sigil.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: true
    },

    old_parcel: {
        id: "old_parcel",
        name: "Old Parcel",
        description: "A weathered parcel, tied with a faded ribbon.",
        image: "assets/img/items/old_parcel.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: false
    },

    fresh_fish: {
        id: "fresh_fish",
        name: "Fresh Fish",
        description: "Fresh Fish, Recently caught, Restores Health by 50.",
        image: "assets/img/items/old_parcel.png",
        rarity: "rare",
        stackable: true,
        useable: true,
        removeable: true,
        sound: 'maxHealth.mp3'
    },

    inventory_page: {
        id: "inventory_page",
        name: "Inventory Page",
        description: "An additional page in your book.",
        image: "assets/img/items/inventory_page.png",
        rarity: "rare",
        stackable: true,
        useable: true,
        removeable: true,
        sound: 'maxHealth.mp3'
    },

    driftwood_binding: {
        id: "driftwood_binding",
        name: "Driftwood Binding",
        description: "Binding often found tangled around driftwood that washes up, the Ghouls tend to get to it first.",
        image: "assets/img/items/driftwood_binding.png",
        rarity: "common",
        stackable: true,
        useable: false,
        removeable: true,
    },

    saltbound_keepsake: {
        id: "saltbound_keepsake",
        name: "Saltbound Keepsake",
        description: "A lost Keepsake from a different time thats washed up on the eastern shore.",
        image: "assets/img/items/saltbound_keepsake.png",
        rarity: "rare",
        stackable: true,
        useable: false,
        removeable: false,
    }
};


/*
// Item Definition Template Example

const item_template = {
    id: "unique_item_id", // Unique string ID for this item
    name: "Item Name",
    description: "Description of the item.",
    image: "assets/img/items/item_image.png", // Path to item image
    rarity: "common", // common, rare, epic, etc.
    stackable: true, // Can stack in inventory
    useable: false, // Can be used (consumed/equipped)
    removeable: true, // Can be removed from inventory
    sound: 'item_use.mp3' // Sound effect played when item is used
};

*/