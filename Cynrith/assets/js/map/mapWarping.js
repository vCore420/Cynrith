// Map Warping Logic

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
            if (typeof patchForcedEncounters === "function") {
                patchForcedEncounters(); 
                console.log("[WarpToMap] Patching forced encounters for map index:", currentMapIndex);
            }
        }

        if (typeof spawnInteractableTilesForMap === "function") {
            spawnInteractableTilesForMap(currentMapIndex);
            console.log("[WarpToMap] Interactable tiles spawned for map index:", currentMapIndex);
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
    const onTile = player.tile.x === t.x && player.tile.y === t.y;

    if (onTile) {
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
    const onTile = player.tile.x === s.x && player.tile.y === s.y && currentMapIndex > 0;

    if (onTile) {
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

// Somethings happening here causing a save from a floor above 1 to not allow the teleport