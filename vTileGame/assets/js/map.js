// map:
let mapFrameInterval = null;
let currentMapIndex = 0; 

const Map = function(title) {
    this.data = {};
    this.tiles = [];

    // Clear any previous interval before starting a new one
    if (mapFrameInterval) clearInterval(mapFrameInterval);
    mapFrameInterval = setInterval(() => this.frame(), 750);

    this.load(title);
};

Map.prototype = {
    load: function(title) {
        LoadURL("assets/json/" + title.toString().toLowerCase() + ".json", (result) => {
            this.data = JSON.parse(result);
            this.data.frame = 0;
            this.tiles = []; // Clear previous tiles

            let loaded = 0;
            for (let i = 0; i < this.data.assets.length; i++) {
                this.tiles.push(new Image());
                this.tiles[i].src = "assets/img/tile/" + this.data.assets[i].file_name + ".png?v=" + new Date().getTime();
                this.tiles[i].onload = () => {
                    loaded++;
                    // Only call the callback when all tiles are loaded
                    if (loaded === this.data.assets.length && typeof this.onLoad === "function") {
                        this.onLoad();
                    }
                };
            }
        });
    },
    draw: function() {
        if (!this.data.layout || !this.data.layout[0]) return;

        let x_min = Math.floor(viewport.x / config.size.tile);
        let y_min = Math.floor(viewport.y / config.size.tile);
        let x_max = Math.ceil((viewport.x + viewport.w) / config.size.tile);
        let y_max = Math.ceil((viewport.y + viewport.h) / config.size.tile);

        if (x_min < 0) { x_min = 0; }
        if (y_min < 0) { y_min = 0; }
        if (x_max > map.width) { x_max = map.width; }
        if (y_max > map.height) { y_max = map.height; }

        for (let y = y_min; y < y_max; y++) {
            for (let x = x_min; x < x_max; x++) {
                let value  = this.data.layout[y][x] - 1;
                let tile_x = Math.floor((x * config.size.tile) - viewport.x + (config.win.width / 2) - (viewport.w / 2));
                let tile_y = Math.floor((y * config.size.tile) - viewport.y + (config.win.height / 2) - (viewport.h / 2));

                if (value > -1) {
                    let frame = this.data.frame;

                    if (frame > this.data.assets[value].frames) {
                        frame = 0;
                    }

                    context.drawImage(
                        map.tiles[value],
                        frame * config.size.tile,
                        0,
                        config.size.tile,
                        config.size.tile,
                        tile_x,
                        tile_y,
                        config.size.tile,
                        config.size.tile
                    );
                }
            }
        }
    },
    frame: function() {
        this.data.frame = (this.data.frame == 0) ? 1 : 0;
    }
};

// Helper: Try to warp to a map if player has enough XP
function tryWarpToMap(targetMapIndex, spawnType, requiredXP) {
    if (player.xp >= (requiredXP || 0)) {
        warpToMap(targetMapIndex, spawnType);
    } else {
        Log("coords", "You need " + requiredXP + " XP to enter this area!");
    }
}

// Warp to a map by index, placing player at a given location
function warpToMap(mapIndex, spawnType = "spawn") {
    currentMapIndex = mapIndex;
    map.onLoad = function() {
        const spawn = map.data[spawnType];
        if (spawn) {
            player.pos.x = spawn.x * config.size.tile;
            player.pos.y = spawn.y * config.size.tile;
            player.tile.x = spawn.x;
            player.tile.y = spawn.y;
        }
        // Spawn NPCs and Enemies for this map
        if (typeof spawnCharactersForMap === "function") {
            spawnCharactersForMap(currentMapIndex);
        }
    };
    map.load("map" + mapIndex);
}

// Teleport forward if on teleport tile and XP is enough
function checkTeleport() {
    if (!map.data.teleport) return;
    const t = map.data.teleport;
    if (player.tile.x === t.x && player.tile.y === t.y && actionButtonBPressed) {
        tryWarpToMap(currentMapIndex + 1, "spawn", t.xpRequired || 0);
    }
}

// Teleport back if on spawn tile and not on first map
function checkBackTeleport() {
    if (!map.data.spawn) return;
    const s = map.data.spawn;
    if (player.tile.x === s.x && player.tile.y === s.y && actionButtonBPressed && currentMapIndex > 0) {
        warpToMap(currentMapIndex - 1, "teleport");
    }
}