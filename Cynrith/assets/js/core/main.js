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
    speed: 4
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


// Initial Setup:
function Setup(playerName, mapIndex = 0, spriteFile = "assets/img/char/hero.png") {
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
        if (typeof spawnCharactersForMap === "function") {
            spawnCharactersForMap(mapIndex);
            if (window._pendingSaveData) {
                if (typeof patchForcedEncounters === "function") {
                    patchForcedEncounters(window._pendingSaveData);
                }
                window._pendingSaveData = null;
            }
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
        width:  window.innerWidth,
        height: window.innerHeight
    };

    config.tiles = {
        x: Math.ceil(config.win.width / config.size.tile),
        y: Math.ceil(config.win.height / config.size.tile)
    }

    config.center = {
        x: Math.round(config.tiles.x / 2),
        y: Math.round(config.tiles.y / 2)
    }

    // Only update viewport if it exists
    if (typeof viewport !== "undefined" && viewport) {
        if (!playerAnimating) {
            viewport.x = 0;
            viewport.y = 0;
        }
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

    Sizing();

    viewport.center();

    map.draw();

    if (typeof updateCharacters === "function") updateCharacters(); 
    if (typeof drawCharacters === "function") drawCharacters();
    player.draw();

    if (typeof updateScreenFadeOverlay === "function") updateScreenFadeOverlay();
    if (typeof drawScreenFadeOverlay === "function") drawScreenFadeOverlay();
    if (typeof drawPlayerHealthHUD === "function") drawPlayerHealthHUD();

    if (_dialogueActive) {
        const block = document.getElementById('dialogue-block');
        let idx = parseInt(block.dataset.dialogueIdx || "0", 10);

        // Quest Given Dialogue
        if (block.dataset.dialogueType === "questGiven") {
            if (actionButtonAPressed) {
                showDialogueLine(idx + 1);
                actionButtonAPressed = false;
            }
            if (idx === _dialogueQueue.length - 1 && actionButtonAPressed) {
                block.classList.add('hidden');
                _dialogueActive = false;
                controlsEnabled = true;
                actionButtonAPressed = false;
                block.dataset.dialogueType = "";
            }
            return;
        }

        // Quest Complete Dialogue
        if (block.dataset.dialogueType === "questComplete") {
            if (actionButtonAPressed) {
                showDialogueLine(idx + 1);
                actionButtonAPressed = false;
            }
            if (idx === _dialogueQueue.length - 1 && actionButtonAPressed) {
                block.classList.add('hidden');
                _dialogueActive = false;
                controlsEnabled = true;
                actionButtonAPressed = false;
                block.dataset.dialogueType = "";
            }
            return;
        }

        // Normal dialogue logic (default dialogue)
        if (actionButtonAPressed) {
            if (idx < _dialogueQueue.length - 1) {
                showDialogueLine(idx + 1);
                actionButtonAPressed = false;
            } else {

                // After last line of default dialogue, check for quest
                let npc = characters.find(c => c.isInteracting);
                if (npc && npc.questId && QUEST_DEFINITIONS[npc.questId]) {
                    const questDef = QUEST_DEFINITIONS[npc.questId];

                    // If quest is active, check completion
                    if (playerQuests.active.includes(npc.questId)) {
                        let result = tryCompleteQuest(npc.questId);
                        if (result === "complete") {
                            notify("Quest complete! Rewards added.", 2000); 
                            dialogue(...npc.dialogue.questComplete);
                            block.dataset.dialogueType = "questComplete";
                        } else if (result === "incomplete") {
                            notify("You haven't finished this quest yet.", 2000); 
                            dialogue(...npc.dialogue.questIncomplete);
                            block.dataset.dialogueType = "questGiven";
                        }
                        actionButtonAPressed = false;
                        return;
                    }

                    // Start quest if not completed or redoable
                    if (!isQuestCompleted(npc.questId) || questDef.redoable) {
                        if (questDef.type === "gift") {
                            let result = tryCompleteQuest(npc.questId);
                            notify("Quest complete! Rewards added.", 2000); 
                            dialogue(...npc.dialogue.questComplete);
                            block.dataset.dialogueType = "questComplete";
                        } else {
                            startQuest(npc.questId);
                            notify(`Quest started: ${questDef.name}`, 2000);
                            dialogue(...npc.dialogue.questGiven);
                            block.dataset.dialogueType = "questGiven";
                        }
                        actionButtonAPressed = false;
                        return;
                    }
                }

                // If no quest, just close dialogue
                block.classList.add('hidden');
                _dialogueActive = false;
                controlsEnabled = true;
                actionButtonAPressed = false;
            }
        }
    }

    if (actionButtonBPressed && typeof player.attackEnemy === "function") {
        player.attackEnemy();
    }
    
    checkTeleport();
    checkBackTeleport();
    checkNpcInteraction();
    checkForcedEncounters();

    actionButtonAPressed = false;
    actionButtonBPressed = false;

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
