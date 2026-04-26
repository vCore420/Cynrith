// Map Warping Logic

const teleportStoneSprite = new Image();
teleportStoneSprite.src = "assets/img/tile/teleport_stone.png"; // update path as needed

let activeTeleportStones = [];
let teleportStoneFrame = 0;
let teleportStoneAnimTick = 0;
let backTeleportNotifShown = false;
let homePlotTravelMenuOpen = false;


// Spawn Teleport stone sprite sheet at spawn and teleport loctions in each maps json
function spawnTeleportStonesForMap(mapIndex) {
    activeTeleportStones = [];
    if (!map.data) return;

    // Home Plot: only spawn stone should appear
    if (String(mapIndex) === HOME_PLOT_MAP_KEY) {
        if (map.data.spawn) {
            activeTeleportStones.push({
                x: map.data.spawn.x,
                y: map.data.spawn.y,
                mapIndex,
                type: "spawn"
            });
        }
        return;
    }

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
    const totalFrames = 38; 
    if (teleportStoneAnimTick % 5 === 0) { 
        teleportStoneFrame = (teleportStoneFrame + 1) % totalFrames;
    }
    activeTeleportStones.forEach(stone => {
        let frameW = 64;
        let frameH = 320;
        let col = teleportStoneFrame % 13;
        let row = Math.floor(teleportStoneFrame / 13);

        let sx = col * frameW;
        let sy = row * frameH;

        let px = Math.round(stone.x * config.size.tile - viewport.x);
        let py = Math.round(stone.y * config.size.tile - viewport.y - (frameH - config.size.tile));

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
function warpToMap(mapIndex, spawnType = "spawn", targetPos = null, onWarped) {
    // Accept numeric (0,1,2...) or string ("title1","dungeon1")
    const isNumericMap = (typeof mapIndex === "number") ||
        (mapIndex !== null && mapIndex !== "" && !isNaN(mapIndex) && isFinite(Number(mapIndex)));
    const rawMapKey = isNumericMap ? `map${mapIndex}` : String(mapIndex);
    const resolvedMapKey = (typeof resolveHomeMapKeyForLoad === "function")
        ? (resolveHomeMapKeyForLoad(rawMapKey) || rawMapKey)
        : rawMapKey;

    showScreenTransition(() => {
        currentMapIndex = mapIndex; // keep existing variable for the rest of the game

        map.onLoad = function() {
            const spawn = map.data[spawnType];

            let spawnX, spawnY;
            if (targetPos && typeof targetPos.x === "number" && typeof targetPos.y === "number") {
                spawnX = targetPos.x;
                spawnY = targetPos.y;
            } else if (spawn) {
                spawnX = spawn.x;
                spawnY = spawn.y;
                if (spawnType === "teleport" || spawnType === "spawn") {
                    spawnY += 1; // Move player to the tile under the stone
                }
            }

            if (typeof spawnX === "number" && typeof spawnY === "number") {
                console.log("[WarpToMap] Setting player position to:", spawnX, spawnY, "for spawnType:", spawnType);
                player.pos.x = spawnX * config.size.tile;
                player.pos.y = spawnY * config.size.tile;
                player.tile.x = spawnX;
                player.tile.y = spawnY;
            }

            if (typeof markFloorVisited === "function") { markFloorVisited(currentMapIndex); }
            if (typeof spawnCharactersForMap === "function") spawnCharactersForMap(currentMapIndex);
            if (typeof spawnInteractableTilesForMap === "function") spawnInteractableTilesForMap(currentMapIndex);
            if (typeof spawnTriggerTilesForMap === "function") spawnTriggerTilesForMap(currentMapIndex);
            if (typeof spawnTeleportStonesForMap === "function") spawnTeleportStonesForMap(currentMapIndex);
            if (typeof spawnWorldSpritesForMap === "function") spawnWorldSpritesForMap(currentMapIndex);
            if (typeof spawnHomePlacementsForMap === "function") spawnHomePlacementsForMap(currentMapIndex);

            // Fade out current music and fade in new map music
            if (window.SoundManager) {
                SoundManager.fadeBgMusicVolume(0, 700);
                setTimeout(() => {
                    SoundManager.stopBgMusic();
                    // Check for custom bgMusic in map data, fallback to auto-naming
                    const bgMusicFile = map.data && map.data.bgMusic ? map.data.bgMusic : `bg_${resolvedMapKey}.mp3`;
                    const bgMusicSrc = `assets/sound/${bgMusicFile}`;
                    SoundManager.playBgMusic(bgMusicSrc);
                    SoundManager.fadeBgMusicVolume(SoundManager.bgMusicVolume, 900);
                }, 750);
            }

            hideScreenTransition();
            if (typeof onWarped === "function") onWarped();
            console.log("[WarpToMap] Map loaded successfully:", mapIndex);
        };

        map.load(resolvedMapKey);
    });
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
                // Play Warp Sound
                if (window.SoundManager) {
                    SoundManager.playEffect("assets/sound/sfx/world/warp.mp3");
                }
                // Warp Player to Map
                warpToMap(currentMapIndex + 1, "spawn");
            } else {
                // Else notify player of insufficient XP
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
    const adjacent = isPlayerAdjacentToTile(s.x, s.y);

    // Home Plot behavior: open floor selector at spawn stone
    if (isHomePlotMap()) {
        if (adjacent) {
            if (!backTeleportNotifShown) {
                notify("Press the A button to choose a discovered floor", 2500);
                backTeleportNotifShown = true;
            }
            if (actionButtonAPressed && !homePlotTravelMenuOpen) {
                openHomePlotTravelMenu();
                actionButtonAPressed = false;
            }
        } else {
            backTeleportNotifShown = false;
        }
        return;
    }

    // Existing behavior for normal maps
    const normalAdjacent = adjacent && currentMapIndex > 0;
    if (normalAdjacent) {
        if (!backTeleportNotifShown) {
            notify(`Press the A button to move to Floor ${currentMapIndex}`, 3000);
            backTeleportNotifShown = true;
        }
        if (actionButtonAPressed) {
            if (window.SoundManager) {
                SoundManager.playEffect("assets/sound/sfx/world/warp.mp3");
            }
            warpToMap(currentMapIndex - 1, "teleport");
        }
    } else {
        backTeleportNotifShown = false;
    }
}

function isHomePlotMap() {
    return String(currentMapIndex) === HOME_PLOT_MAP_KEY;
}

function getVisitedFloorsForTravel() {
    const visited = Array.isArray(window.progression?.visitedFloors)
        ? window.progression.visitedFloors
        : [1];

    return [...new Set(visited)]
        .filter(n => Number.isFinite(n) && n >= 1 && n <= FLOOR_NAMES.length)
        .sort((a, b) => a - b);
}

function closeHomePlotTravelMenu() {
    const overlay = document.getElementById("homeplot-travel-overlay");
    if (overlay) overlay.remove();
    homePlotTravelMenuOpen = false;
    player.frozen = false;
    controlsEnabled = true;
}

function openHomePlotTravelMenu() {
    if (homePlotTravelMenuOpen) return;
    homePlotTravelMenuOpen = true;
    player.frozen = true;
    controlsEnabled = false;

    const visitedFloors = getVisitedFloorsForTravel();

    const overlay = document.createElement("div");
    overlay.id = "homeplot-travel-overlay";
    overlay.className = "homeplot-travel-overlay";

    const panel = document.createElement("div");
    panel.className = "homeplot-travel-panel";

    const title = document.createElement("h3");
    title.textContent = "Home Plot Travel";
    panel.appendChild(title);

    const subtitle = document.createElement("p");
    subtitle.textContent = "Choose a discovered floor";
    panel.appendChild(subtitle);

    const list = document.createElement("div");
    list.className = "homeplot-travel-list";

    visitedFloors.forEach(floorNum => {
        const btn = document.createElement("button");
        btn.className = "homeplot-travel-btn";
        btn.textContent = `Floor ${floorNum} - ${FLOOR_NAMES[floorNum - 1] || "Unknown"}`;
        btn.onclick = () => {
            closeHomePlotTravelMenu();
            if (window.SoundManager) {
                SoundManager.playEffect("assets/sound/sfx/world/warp.mp3");
            }
            warpToMap(floorNum - 1, "spawn");
        };
        list.appendChild(btn);
    });

    const closeBtn = document.createElement("button");
    closeBtn.className = "homeplot-travel-close";
    closeBtn.textContent = "Cancel";
    closeBtn.onclick = closeHomePlotTravelMenu;

    panel.appendChild(list);
    panel.appendChild(closeBtn);
    overlay.appendChild(panel);

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeHomePlotTravelMenu();
    });

    document.body.appendChild(overlay);
}
