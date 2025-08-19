// Core Game Loop Logic

// Game Rendering Variables
var config = {
    win: {
        width: window.innerWidth,
        height: window.innerHeight
    },
    tiles: {
        x: Math.ceil(window.innerWidth / 64) + 2,
        y: Math.ceil(window.innerHeight / 64) + 2
    },
    center: {
        x: Math.round(window.innerWidth / 64) / 2,
        y: Math.round(window.innerHeight / 64) / 2
    },
    size: {
        tile: 64,
        char: 96
    },
    speed: 3
};

// Player Movement Keys
var keys = {
    // left:
    37: {
        x: -config.speed,
        y: 0,
        a: false,
        f: [6, 7, 8, 7]
    },
    // up:
    38: {
        x: 0,
        y: -config.speed,
        a: false,
        f: [3, 4, 5, 4]
    },
    // right:
    39: {
        x: config.speed,
        y: 0,
        a: false,
        f: [9, 10, 11, 10]
    },
    // down:
    40: {
        x: 0,
        y: config.speed,
        a: false,
        f: [0, 1, 2, 1]
    }
};

var viewport;
var player;
var map = null;
var context;

var fps = {
    count: 0,
    shown: 0,
    last:  0
};

// Player Action Buttons 
let actionButtonBPressed = false;
let actionButtonAPressed = false;

document.getElementById('btn-b').addEventListener('click', function() {
    actionButtonBPressed = true;
});

document.getElementById('btn-a').addEventListener('click', function() {
    actionButtonAPressed = true;
});

function isPortraitPhone() {
    return window.innerWidth < 600 && window.innerHeight > window.innerWidth;
}

function getTileSize() {
    if (isPortraitPhone()) return 96; // Large for phones
    return 64; // Default for desktop/tablet
}

function getCharSize() {
    if (isPortraitPhone()) return 128;
    return 96;
}

// Initial Setup:
function Setup(playerName, mapIndex = 0, spriteFile = "assets/img/char/hero.png") {

    Sizing();
    
    if (typeof characters !== "undefined") characters.length = 0;
    if (typeof inventory !== "undefined") inventory.length = 0;
    if (typeof playerQuests !== "undefined") {
        playerQuests.active = [];
        playerQuests.completed = [];
    }
    if (typeof playerQuestProgress !== "undefined") {
        for (let k in playerQuestProgress) delete playerQuestProgress[k];
    }
    if (typeof statBuildQuestStart !== "undefined") {
        for (let k in statBuildQuestStart) delete statBuildQuestStart[k];
    }
    
    context = document.getElementById("game").getContext("2d");
    viewport = new Viewport(0, 0, config.win.width, config.win.height);
    player = new Player(45, 47, spriteFile); 
    player.playerName = playerName; 

    // Load Map
    map = new Map("map" + mapIndex);

    // We'll wait for both map tiles and sprites before starting Loop
    let mapReady = false;
    let spritesReady = false;

    function tryStartLoop() {
        if (mapReady && spritesReady) {
            Loop();
        }
    }

    map.onLoad = function() {
        if (window._lastSaveData) {
            applySaveData(window._lastSaveData);
            window._lastSaveData = null;
        }
        if (typeof spawnCharactersForMap === "function") {
            spawnCharactersForMap(mapIndex);
        }
        if (typeof spawnInteractableTilesForMap === "function") {
            spawnInteractableTilesForMap(mapIndex);
        }
        if (typeof spawnTriggerTilesForMap === "function") {
            spawnTriggerTilesForMap(mapIndex);
        }
        if (typeof spawnTeleportStonesForMap === "function") {
            spawnTeleportStonesForMap(mapIndex);
        }
        if (typeof spawnWorldSpritesForMap === "function") {
            spawnWorldSpritesForMap(mapIndex);
        }
        mapReady = true;
        tryStartLoop();
    };

    // Wait for all sprites to load before starting Loop
    function waitForSprites() {
        let allSprites = [player.sprite];
        if (typeof characters !== "undefined" && characters.length) {
            characters.forEach(char => {
                if (char.sprite) allSprites.push(char.sprite);
            });
        }
        let checkLoaded = () => {
            let loaded = allSprites.every(img => img.complete && img.naturalWidth > 0);
            if (loaded) {
                spritesReady = true;
                tryStartLoop();
            } else {
                setTimeout(checkLoaded, 50);
            }
        };
        checkLoaded();
    }
    waitForSprites();

    Sizing();

    setInterval(function() {
        fps.shown = fps.count;
    }, 1000);
}


// Window and Canvas Sizing:
function Sizing() {
    config.win = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    config.size.tile = getTileSize();
    config.size.char = getCharSize();

    config.tiles = {
        x: Math.ceil(config.win.width / config.size.tile),
        y: Math.ceil(config.win.height / config.size.tile)
    };

    config.center = {
        x: Math.round(config.tiles.x / 2),
        y: Math.round(config.tiles.y / 2)
    };

    if (typeof viewport !== "undefined" && viewport) {
        viewport.w = config.win.width;
        viewport.h = config.win.height;
    }

    if (typeof context !== "undefined" && context && context.canvas) {
        context.canvas.width = config.win.width;
        context.canvas.height = config.win.height;
    }
}


// Display Log Data to Screen:
function Log(type, text) {
    document.getElementById(type).innerHTML = text;
}


// AJAX call:
function LoadURL(url, callback) {
    let http = new XMLHttpRequest();

    http.overrideMimeType("application/json");
    http.open("GET", url + "?v=" + new Date().getTime(), true);
    http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status == "200") {
            callback(http.responseText);
        }
    }
    http.send(null);
}


// Main Game Loop:
function Loop() {
    window.requestAnimationFrame(Loop);

    // Draw Map
    Sizing();
    viewport.center();
    map.draw();

    // Draw Interctable Tiles
    if (typeof drawInteractableTiles === "function") drawInteractableTiles();
    
    drawWorldSprites(0);

    // Update and Draw Npcs
    if (typeof updateCharacters === "function") updateCharacters(); 
    if (typeof drawCharacters === "function") drawCharacters();
    player.draw();
    
    //Draw Animated World Sprite Sheets
    drawTeleportStones();
    drawWorldSprites(1);

    // Update and Draw Screen Effects
    if (typeof updateScreenFadeOverlay === "function") updateScreenFadeOverlay();
    if (typeof drawScreenFadeOverlay === "function") drawScreenFadeOverlay();
    
    // Draw Player Health Bar on Hud
    if (typeof drawPlayerHealthHUD === "function") drawPlayerHealthHUD();

    // Dialogue handling
    if (_dialogueActive && actionButtonAPressed) {
        advanceDialogue();
        actionButtonAPressed = false;
    }

    // Combat handling
    if (actionButtonBPressed && typeof player.attackEnemy === "function") {
        player.attackEnemy();
    }
    
    // Teleport Checks
    checkTeleport();
    checkBackTeleport();

    // Npc Interaction Checks
    checkNpcInteraction();
    checkForcedEncounters();

    // Interactable Tile Check
    if (typeof checkInteractableTileInteraction === "function") checkInteractableTileInteraction();
    if (typeof checkTriggerTileActivation === "function") checkTriggerTileActivation();

    // Reset Action Buttons
    actionButtonAPressed = false;
    actionButtonBPressed = false;

    // Fps Count
    let now = Date.now();
    let delta = (now - fps.last) / 1000;
    fps.last = now;
    fps.count = Math.round(1 / delta);
}


// Log fps every second
setInterval(function() {
    Log("fps", "FPS: " + fps.count);
}, 1000);


// On Window Load
window.onload = function() {
    Setup();
};


// On Window Resize
window.onresize = function() {
    Sizing();
};

window.addEventListener("resize", Sizing);
window.addEventListener("orientationchange", Sizing);