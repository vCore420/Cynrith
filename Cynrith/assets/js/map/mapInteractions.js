let triggeredInteractableTiles = {}; // { [tileId]: true }

function spawnInteractableTilesForMap(mapIndex) {
    window.activeInteractableTiles = INTERACTABLE_TILES
        .filter(tile => tile.map === mapIndex && !triggeredInteractableTiles[tile.id])
        .map(tile => ({ ...tile }));
}

function drawInteractableTiles() {
    if (!window.activeInteractableTiles) return;
    window.activeInteractableTiles.forEach(tile => {
        const img = new Image();
        img.src = tile.image;
        let px = Math.round(tile.x * config.size.tile - viewport.x + (config.win.width / 2) - (viewport.w / 2));
        let py = Math.round(tile.y * config.size.tile - viewport.y + (config.win.height / 2) - (viewport.h / 2));
        context.drawImage(img, px, py, config.size.tile, config.size.tile);
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
        }
    });
}