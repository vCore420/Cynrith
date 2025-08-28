let triggeredInteractableTiles = {};
let triggeredTriggerTiles = {};

// Track looped sounds for interactable/trigger tiles
let activeLoopedInteractionSounds = {};

// Track triggered loop sounds (persisted in save/load)
let triggeredLoopedSounds = {}; // { tileId: true }

function spawnInteractableTilesForMap(mapIndex) {
    window.activeInteractableTiles = INTERACTABLE_TILES
        .filter(tile =>
            tile.map === mapIndex &&
            (
                !triggeredInteractableTiles[tile.id] ||
                (tile.animOnTrigger === true) // Always include animOnTrigger tiles
            )
        )
        .map(tile => ({ ...tile }));
}

function drawInteractableTiles(zIndex) {
    if (!window.activeInteractableTiles) return;
    window.activeInteractableTiles
        .filter(tile => typeof zIndex === "undefined" ? true : tile.zIndex === zIndex)
        .forEach(tile => drawSingleInteractableTile(tile));
}


function drawSingleInteractableTile(tile) {
    if (tile.spriteSheet) {
        if (!_worldSpriteImages[tile.spriteSheet]) {
            const img = new Image();
            img.src = tile.spriteSheet;
            _worldSpriteImages[tile.spriteSheet] = img;
        }
        const img = _worldSpriteImages[tile.spriteSheet];
        if (!img || !img.complete) return;

        let frameIndex = 0;
        if (tile.animOnTrigger) {
            if (triggeredInteractableTiles[tile.id]) {
                tile._frame = tile._frame || 0;
                tile._animTick = (tile._animTick || 0) + 1;
                const frames = (tile.rows || 1) * (tile.cols || 1);
                if (frames > 1 && tile.animSpeed > 0) {
                    if (tile._animTick % tile.animSpeed === 0) {
                        tile._frame = ((tile._frame || 0) + 1) % frames;
                    }
                } else {
                    tile._frame = 0;
                }
                frameIndex = tile._frame || 0;
            } else {
                frameIndex = 0;
            }
        } else {
            tile._frame = tile._frame || 0;
            tile._animTick = (tile._animTick || 0) + 1;
            const frames = (tile.rows || 1) * (tile.cols || 1);
            if (frames > 1 && tile.animSpeed > 0) {
                if (tile._animTick % tile.animSpeed === 0) {
                    tile._frame = ((tile._frame || 0) + 1) % frames;
                }
            } else {
                tile._frame = 0;
            }
            frameIndex = tile._frame || 0;
        }
        const col = frameIndex % tile.cols;
        const row = Math.floor(frameIndex / tile.cols);
        const sx = col * (tile.imageW / tile.cols);
        const sy = row * (tile.imageH / tile.rows);
        const px = Math.round(tile.x * config.size.tile - viewport.x);
        const py = Math.round(tile.y * config.size.tile - viewport.y - ((tile.imageH / tile.rows) - config.size.tile));
        context.drawImage(
            img,
            sx, sy, (tile.imageW / tile.cols), (tile.imageH / tile.rows),
            px, py, (tile.imageW / tile.cols), (tile.imageH / tile.rows)
        );
    } else {
        const img = new Image();
        img.src = tile.image;
        let px = Math.round(tile.x * config.size.tile - viewport.x);
        let py = Math.round(tile.y * config.size.tile - viewport.y);
        context.drawImage(img, px, py, config.size.tile, config.size.tile);
    }
}

function checkInteractableTileInteraction() {
    if (!window.activeInteractableTiles) return;
    window.activeInteractableTiles.forEach(tile => {
        // Check if player is on the tile OR one of the 4 adjacent tiles
        const adjacentOrOn =
            (player.tile.x === tile.x && player.tile.y === tile.y) || // On the tile
            (player.tile.x === tile.x && Math.abs(player.tile.y - tile.y) === 1) ||
            (player.tile.y === tile.y && Math.abs(player.tile.x - tile.x) === 1);

        // Only show notification if tile has NOT been triggered
        if (adjacentOrOn && !tile.notifShown && !triggeredInteractableTiles[tile.id]) {
            notify(tile.notification, 2500);
            tile.notifShown = true;
        } else if (!adjacentOrOn || triggeredInteractableTiles[tile.id]) {
            tile.notifShown = false;
        }

        if (adjacentOrOn && actionButtonAPressed && !triggeredInteractableTiles[tile.id]) {
            controlsEnabled = false;
            player.frozen = true;
            dialogue(...tile.dialogue);
            triggeredInteractableTiles[tile.id] = true; // <--- Mark as triggered
            playTriggerTileSound(tile);
            // Give rewards
            tile.rewards.forEach(r => {
                    addItem(r.id, r.amount);
                    // Show notification for each item added
                    const def = ITEM_DEFINITIONS[r.id];
                    if (def) notify(`Added ${r.amount}x ${def.name} to inventory`, 3500);
                });
            // Only remove from active list if NOT animOnTrigger
            if (!tile.animOnTrigger) {
                window.activeInteractableTiles = window.activeInteractableTiles.filter(t => t.id !== tile.id);
            }
            actionButtonAPressed = false; 
            console.log(`[InteractableTile] Interacted with tile ${tile.id} at (${tile.x}, ${tile.y})`);
        }
    });
}

function isTileBlockedByInteractable(tileX, tileY) {
    if (!window.activeInteractableTiles) return false;
    return window.activeInteractableTiles.some(tile => {
        if (!tile.collision) return false;
        const frameW = tile.spriteSheet ? (tile.imageW / tile.cols) : (tile.imageW || config.size.tile);
        const frameH = tile.spriteSheet ? (tile.imageH / tile.rows) : (tile.imageH || config.size.tile);
        const tilesWide = Math.ceil(frameW / config.size.tile);
        const tilesTall = Math.ceil(frameH / config.size.tile);

        if (tile.zIndex === 0) {
            // Anchor collision to the bottom of the sprite (base at tile.x, tile.y)
            for (let dx = 0; dx < tilesWide; dx++) {
                for (let dy = 0; dy < tilesTall; dy++) {
                    // dy = 0 is the bottom row, dy = tilesTall-1 is the top
                    if (tileX === tile.x + dx && tileY === tile.y - dy) {
                        return true;
                    }
                }
            }
        } else {
            // Above player: block only the bottom row
            if (tile.y === tileY) {
                for (let dx = 0; dx < tilesWide; dx++) {
                    if (tileX === tile.x + dx) {
                        return true;
                    }
                }
            }
        }
        return false;
    });
}

function spawnTriggerTilesForMap(mapIndex) {
    window.activeTriggerTiles = TRIGGER_TILES
        .filter(tile => tile.map === mapIndex && (!tile.oneTime || !triggeredTriggerTiles[tile.id]))
        .map(tile => ({ ...tile }));
}

function checkTriggerTileActivation() {
    if (!window.activeTriggerTiles) return;
    window.activeTriggerTiles.forEach(tile => {
        // Player must be exactly on the tile
        const onTile = player.tile.x === tile.x && player.tile.y === tile.y;

        if (onTile && !tile.triggered) {
            if (tile.type === "dialogue" && tile.dialogue) {
                controlsEnabled = false;
                player.frozen = true;
                clearAllMovementKeys(); 
                player.movement.moving = false; 
                dialogue(...tile.dialogue);
            }
            // Give rewards if defined
            if (tile.rewards && Array.isArray(tile.rewards)) {
                tile.rewards.forEach(r => {
                    addItem(r.id, r.amount);
                    // Show notification for each item added
                    const def = ITEM_DEFINITIONS[r.id];
                    if (def) notify(`Added ${r.amount}x ${def.name} to inventory`, 3500);
                });
            }
            // Mark as triggered if oneTime
            if (tile.oneTime) {
                triggeredTriggerTiles[tile.id] = true;
                tile.triggered = true;
                playTriggerTileSound(tile);
                // Remove from active list
                window.activeTriggerTiles = window.activeTriggerTiles.filter(t => t.id !== tile.id);
            }
            // Future: handle other types (warp, frameChange, etc.)
            console.log(`[TriggerTile] Triggered tile ${tile.id} at (${tile.x}, ${tile.y})`);
        }
    });
}

// Play interaction/trigger tile sounds (call in main game loop)
function playInteractionTileSounds() {
    const playerX = player.tile.x;
    const playerY = player.tile.y;
    const RADIUS = 5;
    const MIN_AMBIENT_INTERVAL = 9000; // ms
    const AMBIENT_CHANCE = 0.08; // 8% chance per tick

    // Helper to play sound at volume based on distance
    function playInteractionSound(tile, soundFile, volume) {
        if (window.SoundManager) {
            const audio = new Audio(`assets/sound/sfx/interactions/${soundFile}`);
            audio.volume = volume;
            audio.play();
        }
    }

    // Helper to start looped sound
    function startLoopedSound(tile, soundFile, volume) {
        if (!activeLoopedInteractionSounds[tile.id]) {
            const audio = new Audio(`assets/sound/sfx/interactions/${soundFile}`);
            audio.loop = true;
            audio.volume = volume;
            audio.play();
            activeLoopedInteractionSounds[tile.id] = audio;
        } else {
            activeLoopedInteractionSounds[tile.id].volume = volume;
        }
    }

    // Helper to stop looped sound
    function stopLoopedSound(tile) {
        if (activeLoopedInteractionSounds[tile.id]) {
            activeLoopedInteractionSounds[tile.id].pause();
            activeLoopedInteractionSounds[tile.id] = null;
        }
    }

    // Handle interactable tiles
    if (window.activeInteractableTiles) {
        window.activeInteractableTiles.forEach(tile => {
            if (!tile.sound || !tile.sound.enabled) return;
            const dx = tile.x - playerX;
            const dy = tile.y - playerY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minVol = 0.2, maxVol = 1.0;
            let volume = maxVol - ((dist / RADIUS) * (maxVol - minVol));
            volume = Math.max(minVol, Math.min(maxVol, volume));

            if (dist > RADIUS) {
                if (tile.sound.type === "loop" && activeLoopedInteractionSounds[tile.id]) {
                    stopLoopedSound(tile);
                }
                return;
            }

            if (tile.sound.type === "loop") {
                startLoopedSound(tile, tile.sound.file, volume);
            } else if (tile.sound.type === "ambient") {
                tile._lastAmbientSound = tile._lastAmbientSound || 0;
                if (Date.now() - tile._lastAmbientSound > MIN_AMBIENT_INTERVAL && Math.random() < AMBIENT_CHANCE) {
                    playInteractionSound(tile, tile.sound.file, volume);
                    tile._lastAmbientSound = Date.now();
                }
            }
            // No trigger sound here; handled on interaction
        });
    }

    // Handle trigger tiles
    if (window.activeTriggerTiles) {
        window.activeTriggerTiles.forEach(tile => {
            if (!tile.sound || !tile.sound.enabled) return;
            const dx = tile.x - playerX;
            const dy = tile.y - playerY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minVol = 0.2, maxVol = 1.0;
            let volume = maxVol - ((dist / RADIUS) * (maxVol - minVol));
            volume = Math.max(minVol, Math.min(maxVol, volume));

            if (dist > RADIUS) {
                if (tile.sound.type === "loop" && activeLoopedInteractionSounds[tile.id]) {
                    stopLoopedSound(tile);
                }
                return;
            }

            if (tile.sound.type === "loop") {
                startLoopedSound(tile, tile.sound.file, volume);
            } else if (tile.sound.type === "ambient") {
                tile._lastAmbientSound = tile._lastAmbientSound || 0;
                if (Date.now() - tile._lastAmbientSound > MIN_AMBIENT_INTERVAL && Math.random() < AMBIENT_CHANCE) {
                    playInteractionSound(tile, tile.sound.file, volume);
                    tile._lastAmbientSound = Date.now();
                }
            }
            // No trigger sound here; handled on activation
        });
    }
}


// Play trigger sound ONCE at full volume when tile is triggered/interacted with
function playTriggerTileSound(tile) {
    if (tile.sound && tile.sound.enabled && tile.sound.type === "trigger") {
        if (window.SoundManager) {
            SoundManager.playEffect(`assets/sound/sfx/interactions/${tile.sound.file}`);
        }
    }
}