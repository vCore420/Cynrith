// Map Warping Logic

const teleportStoneSprite = new Image();
teleportStoneSprite.src = "assets/img/tile/teleport_stone.png"; // update path as needed

let activeTeleportStones = [];
let teleportStoneFrame = 0;
let teleportStoneAnimTick = 0;


// Spawn Teleport stone sprite sheet at spawn and teleport loctions in each maps json
function spawnTeleportStonesForMap(mapIndex) {
    activeTeleportStones = [];
    if (!map.data) return;

    // On map 0, only spawn at teleport location
    if (mapIndex === 0) {
        if (map.data.teleport) {
            activeTeleportStones.push({
                x: map.data.teleport.x,
                y: map.data.teleport.y,
                mapIndex,
                type: "teleport"
            });
        }
    } else {
        // On all other maps, spawn at both spawn and teleport locations
        if (map.data.spawn) {
            activeTeleportStones.push({
                x: map.data.spawn.x,
                y: map.data.spawn.y,
                mapIndex,
                type: "spawn"
            });
        }
        if (map.data.teleport) {
            activeTeleportStones.push({
                x: map.data.teleport.x,
                y: map.data.teleport.y,
                mapIndex,
                type: "teleport"
            });
        }
    }
}


// Draw Teleport stone and play frames
function drawTeleportStones() {
    if (!activeTeleportStones.length) return;
    teleportStoneAnimTick++;
    if (teleportStoneAnimTick % 8 === 0) {
        teleportStoneFrame = (teleportStoneFrame + 1) % 13;
    }
    activeTeleportStones.forEach(stone => {
        let row = stone.type === "spawn" ? 0 : 1;
        let frameW = 64;
        let frameH = 320;
        let sx = teleportStoneFrame * frameW;
        let sy = row * frameH;

        // Position so base aligns with tile
        let px = Math.round(
            stone.x * config.size.tile
            - viewport.x
            + (config.win.width / 2)
            - (viewport.w / 2)
        );
        let py = Math.round(
            (stone.y * config.size.tile)
            - viewport.y
            + (config.win.height / 2)
            - (viewport.h / 2)
            - (frameH - config.size.tile)
        );

        context.drawImage(
            teleportStoneSprite,
            sx, sy, frameW, frameH,
            px, py, frameW, frameH
        );
    });
}


// Check if player is adjacent to a specific tile
function isPlayerAdjacentToTile(x, y) {
    return (
        (Math.abs(player.tile.x - x) === 1 && player.tile.y === y) ||
        (Math.abs(player.tile.y - y) === 1 && player.tile.x === x)
    );
}


// Warp to a map by index, placing player at a given location
function warpToMap(mapIndex, spawnType = "spawn", onWarped) {
    currentMapIndex = mapIndex;
    map.onLoad = function() {
        const spawn = map.data[spawnType];

        if (spawn) {
            console.log("[WarpToMap] Setting player position to:", spawn.x, spawn.y, "for spawnType:", spawnType);
            console.log("[WarpToMap] CurrentMapIndex:", currentMapIndex);
            player.pos.x = spawn.x * config.size.tile;
            player.pos.y = spawn.y * config.size.tile;
            player.tile.x = spawn.x;
            player.tile.y = spawn.y;
        }

        if (typeof spawnCharactersForMap === "function") {
            spawnCharactersForMap(currentMapIndex);
        }

        if (typeof spawnInteractableTilesForMap === "function") {
            spawnInteractableTilesForMap(currentMapIndex);
            console.log("[WarpToMap] Interactable tiles spawned for map index:", currentMapIndex);
        }

        if (typeof spawnTeleportStonesForMap === "function") {
            spawnTeleportStonesForMap(currentMapIndex);
        }

        if (typeof spawnWorldSpritesForMap === "function") {
            spawnWorldSpritesForMap(mapIndex);
        }

        if (typeof onWarped === "function") onWarped();
        console.log("[WarpToMap] Map loaded successfully:", mapIndex);
    };
    map.load("map" + mapIndex);
}


// Warp forward to the next floor if the player has required xp
function checkTeleport() {
    if (!map.data.teleport) return;
    const t = map.data.teleport;
    const adjacent = isPlayerAdjacentToTile(t.x, t.y);

    if (adjacent) {
        if (!teleportNotifShown) {
            const nextFloor = currentMapIndex + 2;
            const xpRequired = t.xpRequired || 0;
            notify(`Press the A button to move to Floor ${nextFloor} (requires ${xpRequired} XP)`, 3500);
            teleportNotifShown = true;
        }
        if (actionButtonAPressed) {
            const xpRequired = t.xpRequired || 0;
            if (player.xp >= xpRequired) {
                warpToMap(currentMapIndex + 1, "spawn");
            } else {
                notify(`You need ${xpRequired} XP to move to this Floor!`, 3000);
            }
        }
    } else {
        teleportNotifShown = false;
    }
}


// Warp back to the previous floor
function checkBackTeleport() {
    if (!map.data.spawn) return;
    const s = map.data.spawn;
    const adjacent = isPlayerAdjacentToTile(s.x, s.y) && currentMapIndex > 0;

    if (adjacent) {
        if (!backTeleportNotifShown) {
            notify(`Press the A button to move to Floor ${currentMapIndex}`, 3000);
            backTeleportNotifShown = true;
        }
        if (actionButtonAPressed) {
            warpToMap(currentMapIndex - 1, "teleport");
        }
    } else {
        backTeleportNotifShown = false;
    }
}

