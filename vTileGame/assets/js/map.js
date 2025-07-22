// map:
let mapFrameInterval = null;
let currentMapIndex = 0; 
let lastTeleportTile = { x: null, y: null };
let teleportNotifShown = false;

function buildGidToAssetIndexMap(mapData) {
    // Build a flat array where gidMap[gid] = asset index
    const gidMap = [];
    const tilesets = mapData.tilesets;
    const assets = mapData.assets;

    for (let i = 0; i < tilesets.length; i++) {
        const ts = tilesets[i];
        const firstgid = ts.firstgid;
        let assetName = ts.source.replace('.tsx', '');
        let idx = assets.findIndex(a => a.file_name === assetName);
        if (idx === -1) continue;

        // Determine the range for this tileset
        const nextFirstgid = (i + 1 < tilesets.length) ? tilesets[i + 1].firstgid : firstgid + 1;
        for (let gid = firstgid; gid < nextFirstgid; gid++) {
            gidMap[gid] = idx;
        }
    }
    return gidMap;
}

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
            this.tiles = [];

            // Support for Tiled multi-layer maps
            if (this.data.layers) {
                // Build GID map
                this.data._gidMap = buildGidToAssetIndexMap(this.data);

                // Convert Tiled layers to a 3D array: layers[layer][y][x]
                this.data._layers = this.data.layers.map(layer => {
                    let arr = [];
                    for (let y = 0; y < layer.height; y++) {
                        arr[y] = [];
                        for (let x = 0; x < layer.width; x++) {
                            arr[y][x] = layer.data[y * layer.width + x];
                        }
                    }
                    return arr;
                });
                // For compatibility, set layout to the bottom layer
                this.data.layout = this.data._layers[0];
                this.width = this.data.layers[0].width;
                this.height = this.data.layers[0].height;
            } else {
                // Legacy map
                this.width = this.data.width;
                this.height = this.data.height;
            }

            // Load tiles as before
            let loaded = 0;
            for (let i = 0; i < this.data.assets.length; i++) {
                this.tiles.push(new Image());
                this.tiles[i].src = "assets/img/tile/" + this.data.assets[i].file_name + ".png?v=" + new Date().getTime();
                this.tiles[i].onload = () => {
                    loaded++;
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

        if (this.data._layers) {
            // Tiled multi-layer rendering
            for (let l = 0; l < this.data._layers.length; l++) {
                let layer = this.data._layers[l];
                for (let y = y_min; y < y_max; y++) {
                    for (let x = x_min; x < x_max; x++) {
                        let gid = layer[y][x];
                        if (gid > 0) {
                            // FAST: direct lookup, no loop!
                            let assetIdx = this.data._gidMap[gid];
                            if (typeof assetIdx === "undefined") continue;
                            let frame = this.data.frame;
                            if (frame > this.data.assets[assetIdx].frames) frame = 0;
                            let tile_x = Math.floor((x * config.size.tile) - viewport.x + (config.win.width / 2) - (viewport.w / 2));
                            let tile_y = Math.floor((y * config.size.tile) - viewport.y + (config.win.height / 2) - (viewport.h / 2));
                            context.drawImage(
                                map.tiles[assetIdx],
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
            }
        } else {
            // Legacy single-layer rendering
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
// ...existing code...

function checkTeleport() {
    if (!map.data.teleport) return;
    const t = map.data.teleport;
    const onTile = player.tile.x === t.x && player.tile.y === t.y;

    if (onTile) {
        if (!teleportNotifShown) {
            const nextFloor = currentMapIndex + 2;
            const xpRequired = t.xpRequired || 0;
            notify(`Press the B button to move to Floor ${nextFloor} (requires ${xpRequired} XP)`, 3500);
            teleportNotifShown = true;
        }
        if (actionButtonBPressed) {
            const xpRequired = t.xpRequired || 0;
            if (player.xp >= xpRequired) {
                tryWarpToMap(currentMapIndex + 1, "spawn", xpRequired);
            } else {
                notify(`You need ${xpRequired} XP to move to this Floor!`, 3000);
            }
        }
    } else {
        teleportNotifShown = false;
    }
}

function checkBackTeleport() {
    if (!map.data.spawn) return;
    const s = map.data.spawn;
    const onTile = player.tile.x === s.x && player.tile.y === s.y && currentMapIndex > 0;

    if (onTile) {
        if (!backTeleportNotifShown) {
            notify(`Press the B button to move to Floor ${currentMapIndex}`, 3000);
            backTeleportNotifShown = true;
        }
        if (actionButtonBPressed) {
            warpToMap(currentMapIndex - 1, "teleport");
        }
    } else {
        backTeleportNotifShown = false;
    }
}
