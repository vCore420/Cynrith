// local variables:
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
    speed: 5
};

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
var map;
var context;

var fps = {
    count: 0,
    shown: 0,
    last:  0
};

let actionButtonBPressed = false;

document.getElementById('btn-b').addEventListener('click', function() {
    actionButtonBPressed = true;
});

let actionButtonAPressed = false;

document.getElementById('btn-a').addEventListener('click', function() {
    actionButtonAPressed = true;
});

// setup game:
function Setup() {
    context = document.getElementById("game").getContext("2d");
    viewport = new Viewport(0, 0, config.win.width, config.win.height);
    player = new Player(45, 47);

    // Ensure NPCs/enemies spawn on first map load
    map = new Map("map0");
    map.onLoad = function() {
        if (typeof spawnCharactersForMap === "function") {
            spawnCharactersForMap(0);
        }
    };

    Loop();
    Sizing();

    setInterval(function() {
        fps.shown = fps.count;
    }, 1000);
}


// window and canvas sizing:
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

    if (!playerAnimating) {
        viewport.x = 0;
        viewport.y = 0;
    }
    viewport.w = config.win.width;
    viewport.h = config.win.height;

    context.canvas.width = config.win.width;
    context.canvas.height = config.win.height;
}


// log data to screen:
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

// game loop:
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

setInterval(function() {
    Log("fps", "FPS: " + fps.count);
}, 1000);

// on window load:
window.onload = function() {
    Setup();
};


// on window resize:
window.onresize = function() {
    Sizing();
};
