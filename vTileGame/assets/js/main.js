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
    player = new Player(4, 3);
    map = new Map("Map");
    
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

    viewport.x = 0;
    viewport.y = 0;
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

function warpToMap(mapIndex, spawnType = "spawn") {
    currentMapIndex = mapIndex;
    map.load("map" + mapIndex);
    setTimeout(() => {
        const spawn = map.data[spawnType];
        if (spawn) {
            player.pos.x = spawn.x * config.size.tile;
            player.pos.y = spawn.y * config.size.tile;
            player.tile.x = spawn.x;
            player.tile.y = spawn.y;
        }
    }, 100);
}

function checkTeleport() {
    if (!map.data.teleport) return;
    const t = map.data.teleport;
    if (player.tile.x === t.x && player.tile.y === t.y && actionButtonBPressed) {
        if (player.xp >= (t.xpRequired || 0)) {
            warpToMap(currentMapIndex + 1, "spawn");
        } else {
            Log("coords", "You need " + t.xpRequired + " XP to enter the next Floor!");
        }
    }
}

function checkBackTeleport() {
    if (!map.data.spawn) return;
    const s = map.data.spawn;
    if (player.tile.x === s.x && player.tile.y === s.y && actionButtonBPressed && currentMapIndex > 0) {
        warpToMap(currentMapIndex - 1, "teleport");
    }
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

    checkTeleport();
    checkBackTeleport();
    actionButtonAPressed = false;
    actionButtonBPressed = false;

    if (!fps.last) {
        fps.last = Date.now();
        fps.count = 0;
    }

    let delta = (Date.now() - fps.last) / 1000;
    fps.last  = Date.now();
    fps.count = Math.round(1 / delta);

    Log("fps", "FPS: " + fps.shown);
}


// on window load:
window.onload = function() {
    Setup();
};


// on window resize:
window.onresize = function() {
    Sizing();
};
