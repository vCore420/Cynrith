// Title Screen map Logic

// Map flags
let titleMap = null;
let titleMapReady = false;
const TITLE_MAP_COUNT = 2; // Amount of Title Maps - Update if you add more
const chosenTitleMapIdx = Math.floor(Math.random() * TITLE_MAP_COUNT);
const chosenTitleMapName = "title" + chosenTitleMapIdx;

// NPC flags
let lastNpcAnimTime = 0;
const MAP_FRAME_INTERVAL = 1000;   // World frame rate
const NPC_ANIM_INTERVAL = 125;    // NPC animation speed
let titleScreenNPCs = [];

//Sprite flags
let activeTitleWorldSprites = [];


// Canvas for the title map 
const titleMapCanvas = document.createElement("canvas");
titleMapCanvas.id = "title-map-canvas";
titleMapCanvas.style.position = "fixed";
titleMapCanvas.style.top = "0";
titleMapCanvas.style.left = "0";
titleMapCanvas.style.width = "100vw";
titleMapCanvas.style.height = "100vh";
titleMapCanvas.style.zIndex = "1";
titleMapCanvas.style.pointerEvents = "none";
document.body.prepend(titleMapCanvas);

let titleMapContext = titleMapCanvas.getContext("2d");
let titleViewport = new Viewport(0, 0, titleMapCanvas.width, titleMapCanvas.height);


// Main animation loop for title screen
function startTitleScreenLoop() {
    let lastNpcAnimTime = 0;
    function loop(now) {

        // Advance NPC animation frames and movement
        if (now - lastNpcAnimTime >= NPC_ANIM_INTERVAL) {
            updateTitleScreenNPCs();
            titleScreenNPCs.forEach(char => {
                const dir = char.movement.key || 40;
                const frames = keys[dir]?.f || [1, 0, 1, 2];
                if (typeof char.movement.animIndex === "undefined") char.movement.animIndex = 0;
                if (char.movement.moving || char.forcedWalking) {
                    char.movement.animIndex = (char.movement.animIndex + 1) % frames.length;
                    char.movement.frame = char.movement.animIndex;
                } else {
                    char.movement.animIndex = 0;
                    char.movement.frame = 1; 
                }
            });
            lastNpcAnimTime = now;
        }

        // Clear and redraw the title map and NPCs
        titleMapContext.clearRect(0, 0, titleMapCanvas.width, titleMapCanvas.height);
        drawTitleMap();
        drawTitleWorldSprites(0);
        drawTitleScreenNPCs();
        drawTitleWorldSprites(1);
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
}

// Center Viewport with center of title map
function centerTitleViewport() {
    if (!titleMap) return;
    let mapPixelWidth = titleMap.width * config.size.tile;
    let mapPixelHeight = titleMap.height * config.size.tile;
    let viewportWidth = titleViewport.w;
    let viewportHeight = titleViewport.h;
    let scrollX = Math.floor((mapPixelWidth - viewportWidth) / 4);
    let scrollY = Math.floor((mapPixelHeight - viewportHeight) / 4);
    scrollX = Math.max(0, scrollX);
    scrollY = Math.max(0, scrollY);
    titleViewport.scroll(scrollX, scrollY);
}

// Load title map
function loadTitleMap() {
    titleMapCanvas.width = window.innerWidth;
    titleMapCanvas.height = window.innerHeight;
    titleMap = new Map(chosenTitleMapName);
    titleMap.onLoad = function() {
        titleMapReady = true;
        spawnTitleScreenNPCs(chosenTitleMapName);
        spawnTitleWorldSpritesForMap(chosenTitleMapName);
        centerTitleViewport();
        startTitleScreenLoop();
    };
}

// Draw the title map to fill the viewport
function drawTitleMap() {
    if (!titleMapReady || !titleMap || !titleMap.data._layers) return;

    let tileSize = config.size.tile;
    let mapWidth = titleMap.width;
    let mapHeight = titleMap.height;

    for (let l = 0; l < titleMap.data._layers.length; l++) {
        let layer = titleMap.data._layers[l];
        for (let y = 0; y < mapHeight; y++) {
            for (let x = 0; x < mapWidth; x++) {
                let gid = layer[y][x];
                if (gid > 0) {
                    let assetIdx = titleMap.data._gidMap[gid];
                    if (typeof assetIdx === "undefined") continue;
                    let frame = titleMap.data.frame;
                    if (frame > titleMap.data.assets[assetIdx].frames) frame = 0;
                    let px = x * tileSize - titleViewport.x;
                    let py = y * tileSize - titleViewport.y;
                    titleMapContext.drawImage(
                        titleMap.tiles[assetIdx],
                        frame * tileSize,
                        0,
                        tileSize,
                        tileSize,
                        px,
                        py,
                        tileSize,
                        tileSize
                    );
                }
            }
        }
    }
}

// Spawn NPCs for the title map
function spawnTitleScreenNPCs(mapName) {
    titleScreenNPCs.length = 0;
    Object.values(NPC_DEFINITIONS).forEach(def => {
        if (def.spawns) {
            def.spawns.forEach(spawn => {
                if (spawn.map === mapName) {
                    const npc = new NPC(
                        spawn.x,
                        spawn.y,
                        def.sprite,
                        def
                    );
                    npc.wanderArea = spawn.wanderArea;
                    npc.state = "wander";
                    npc.movement = { moving: false, key: null, frame: 1 };
                    npc.wanderState = null; 
                    npc.moveSpeed = def.moveSpeed || 2;
                    titleScreenNPCs.push(npc);
                }
            });
        }
    });
}

// Update NPC movement logic
function updateTitleScreenNPCs() {
    const prevMap = window.map;
    window.map = titleMap;
    titleScreenNPCs.forEach(npc => {
        wanderAI(npc);
    });
    window.map = prevMap;
}

// Draw NPCs on top of the map
function drawTitleScreenNPCs() {
    titleScreenNPCs.forEach(npc => {
        if (!npc.sprite || !npc.sprite.complete || npc.sprite.naturalWidth === 0) return;
        let frame = 1;
        if (npc.movement && npc.movement.key && keys[npc.movement.key]) {
            const frames = keys[npc.movement.key].f;
            frame = frames[npc.movement.frame || 0] || frames[0];
        }
        let px = npc.x * config.size.tile - titleViewport.x;
        let py = npc.y * config.size.tile - titleViewport.y;
        titleMapContext.drawImage(
            npc.sprite,
            frame * config.size.char,
            0,
            config.size.char,
            config.size.char,
            px,
            py,
            config.size.char,
            config.size.char
        );
    });
}

function spawnTitleWorldSpritesForMap(mapName) {
    activeTitleWorldSprites = [];
    WORLD_SPRITES.forEach(s => {
        const positions = s.positions || [];
        positions.forEach(pos => {
            if (pos.map === mapName) {
                let sprite = Object.assign({}, s, pos);
                if (!_worldSpriteImages[s.spriteSheet]) {
                    const img = new Image();
                    img.src = s.spriteSheet;
                    _worldSpriteImages[s.spriteSheet] = img;
                }
                sprite._frame = 0;
                sprite._animTick = 0;
                sprite.frameW = Math.floor(s.imageW / s.cols);
                sprite.frameH = Math.floor(s.imageH / s.rows);
                sprite.frames = s.cols * s.rows;
                activeTitleWorldSprites.push(sprite);
            }
        });
    });
}

function drawTitleWorldSprites(zIndex) {
    activeTitleWorldSprites.forEach(s => {
        if (typeof zIndex !== "undefined" && s.zIndex !== zIndex) return;

        // Animate frame only if more than one frame
        if (s.frames > 1) {
            s._animTick = (s._animTick || 0) + 1;
            if (s._animTick % (s.animSpeed || 8) === 0) {
                s._frame = ((s._frame || 0) + 1) % s.frames;
            }
        } else {
            s._frame = 0;
        }

        const img = _worldSpriteImages[s.spriteSheet];
        if (!img || !img.complete) return;

        // Calculate frame position in sheet
        const frameIndex = s._frame || 0;
        const col = s.frames > 1 ? frameIndex % s.cols : 0;
        const row = s.frames > 1 ? Math.floor(frameIndex / s.cols) : 0;

        const sx = col * s.frameW;
        const sy = row * s.frameH;

        // Align base of sprite to (x, y) tile
        const px = Math.round(s.x * config.size.tile - titleViewport.x);
        const py = Math.round(s.y * config.size.tile - titleViewport.y - (s.frameH - config.size.tile));

        titleMapContext.drawImage(
            img,
            sx, sy, s.frameW, s.frameH,
            px, py, s.frameW, s.frameH
        );
    });
}

// Unload title map and clean up
function unloadTitleMap() {
    if (titleMapCanvas && titleMapCanvas.parentNode) {
        titleMapCanvas.parentNode.removeChild(titleMapCanvas);
    }
    titleMap = null;
    titleMapReady = false;
    titleScreenNPCs.length = 0;
    activeTitleWorldSprites = [];
}

// Redraw on resize
window.addEventListener("resize", () => {
    titleMapCanvas.width = window.innerWidth;
    titleMapCanvas.height = window.innerHeight;
    titleViewport.w = titleMapCanvas.width;
    titleViewport.h = titleMapCanvas.height;
});