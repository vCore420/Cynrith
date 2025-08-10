let triggeredInteractableTiles = {}; // { [tileId]: true }

function spawnInteractableTilesForMap(mapIndex) {
    window.activeInteractableTiles = INTERACTABLE_TILES
        .filter(tile => tile.map === mapIndex && !triggeredInteractableTiles[tile.id])
        .map(tile => ({ ...tile }));
}

function drawInteractableTiles() {
    if (!window.activeInteractableTiles) return;
    window.activeInteractableTiles.forEach(tile => {
        if (tile.spriteSheet) {
            // Use spriteLoader logic for sprite sheets
            if (!_worldSpriteImages[tile.spriteSheet]) {
                const img = new Image();
                img.src = tile.spriteSheet;
                _worldSpriteImages[tile.spriteSheet] = img;
            }
            const img = _worldSpriteImages[tile.spriteSheet];
            if (!img || !img.complete) return;

            // Support animation if needed
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
            const frameIndex = tile._frame || 0;
            const col = frames > 1 ? frameIndex % tile.cols : 0;
            const row = frames > 1 ? Math.floor(frameIndex / tile.cols) : 0;
            const sx = col * (tile.imageW / tile.cols);
            const sy = row * (tile.imageH / tile.rows);
            const px = Math.round(tile.x * config.size.tile - viewport.x + (config.win.width / 2) - (viewport.w / 2));
            const py = Math.round(tile.y * config.size.tile - viewport.y + (config.win.height / 2) - (viewport.h / 2) - ((tile.imageH / tile.rows) - config.size.tile));
            context.drawImage(
                img,
                sx, sy, (tile.imageW / tile.cols), (tile.imageH / tile.rows),
                px, py, (tile.imageW / tile.cols), (tile.imageH / tile.rows)
            );
        } else {
            // Default: use static image
            const img = new Image();
            img.src = tile.image;
            let px = Math.round(tile.x * config.size.tile - viewport.x + (config.win.width / 2) - (viewport.w / 2));
            let py = Math.round(tile.y * config.size.tile - viewport.y + (config.win.height / 2) - (viewport.h / 2));
            context.drawImage(img, px, py, config.size.tile, config.size.tile);
        }
    });
}

function checkInteractableTileInteraction() {
    if (!window.activeInteractableTiles) return;
    window.activeInteractableTiles.forEach(tile => {
        // Check if player is on one of the 4 adjacent tiles
        const adjacent =
            (player.tile.x === tile.x && Math.abs(player.tile.y - tile.y) === 1) ||
            (player.tile.y === tile.y && Math.abs(player.tile.x - tile.x) === 1);

        if (adjacent && !tile.notifShown) {
            notify(tile.notification, 2500);
            tile.notifShown = true;
        } else if (!adjacent) {
            tile.notifShown = false;
        }

        if (adjacent && actionButtonAPressed && !triggeredInteractableTiles[tile.id]) {
            controlsEnabled = false;
            player.frozen = true;
            dialogue(...tile.dialogue);
            triggeredInteractableTiles[tile.id] = true;
            // Give rewards
            tile.rewards.forEach(r => addItem(r.id, r.amount));
            // Remove tile from active list
            window.activeInteractableTiles = window.activeInteractableTiles.filter(t => t.id !== tile.id);
            actionButtonAPressed = false; 
            console.log(`[InteractableTile] Interacted with tile ${tile.id} at (${tile.x}, ${tile.y})`);
        }
    });
}