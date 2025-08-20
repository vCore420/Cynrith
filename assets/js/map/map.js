// Cynrith Game Map Engine

// Floor names to match floor index, used for ui purposes
const FLOOR_NAMES = [
    "Verdant Rise",  
    "Stonewake Expanse",
    "Gloomroot Thicket",
    "The Shattered Spires",
    "Umbracourt"
];


let mapFrameInterval = null;
let currentMapIndex = 0; 
let lastTeleportTile = { x: null, y: null };
let teleportNotifShown = false;


// Build GID to Asset Index Map
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


// Map Constructor
const Map = function(title) {
    console.log("[Map] Map constructor called with:", title);
    this.data = {};
    this.tiles = [];
    this.onLoad = null;
    this.frameIndices = [];
    
    // Clear any previous interval before starting a new one
    if (mapFrameInterval) clearInterval(mapFrameInterval);
    mapFrameInterval = setInterval(() => this.frame(), 750);

    this.load(title);
};


// Main Map Logic
Map.prototype = {
    load: function(title) {
        console.log("[Map] load called with:", title);

        LoadURL("assets/json/" + title.toString().toLowerCase() + ".json", (result) => {
            this.data = JSON.parse(result);
            this.data.frame = 0;
            this.tiles = [];
            console.log("[Map] Map data loaded:", this.data);


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

                // Legacy map (Single Layer maps)
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


    // Draw the map
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
                            let assetIdx = this.data._gidMap[gid];
                            if (typeof assetIdx === "undefined") continue;
                            let frame = this.frameIndices[assetIdx] || 0;
                            if (frame >= this.data.assets[assetIdx].frames) frame = 0;
                            let tile_x = Math.floor((x * config.size.tile) - viewport.x);
                            let tile_y = Math.floor((y * config.size.tile) - viewport.y);
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

            // Legacy (single-layer rendering)
            for (let y = y_min; y < y_max; y++) {
                for (let x = x_min; x < x_max; x++) {
                    let value  = this.data.layout[y][x] - 1;
                    let tile_x = Math.floor((x * config.size.tile) - viewport.x);
                    let tile_y = Math.floor((y * config.size.tile) - viewport.y);

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
    
    // Update the map frame for animations
    frame: function() {
        if (!this.data.assets) return;
        for (let i = 0; i < this.data.assets.length; i++) {
            const frames = this.data.assets[i].frames || 1;
            if (!this.frameIndices[i]) this.frameIndices[i] = 0;
            this.frameIndices[i] = (this.frameIndices[i] + 1) % frames;
        }
    }
};
