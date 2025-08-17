// Player death
function handlePlayerDeath() {
    if (deathScreenShown) return; 
    deathScreenShown = true;

    let fadeFrames = 12;
    let frame = 0;
    let fadeInterval = setInterval(() => {
        player.sprite.opacity = 1 - frame / fadeFrames;
        frame++;
        if (frame >= fadeFrames) {
            clearInterval(fadeInterval);
            showDeathScreen();
            console.log("[Player] Player has died");
        }
    }, 40);
}


// Show player death screen
function showDeathScreen() {
    let overlay = document.createElement('div');
    overlay.id = "death-overlay";
    overlay.className = "death-overlay";
    overlay.innerHTML = `
        <h1>You Died</h1>
        <button id="respawn-btn">Respawn</button>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.style.opacity = "1";
    }, 10);

    document.getElementById("respawn-btn").onclick = function() {
        respawnPlayer();
        document.body.removeChild(overlay);
    };
}


// Respawn Player
function respawnPlayer() {
    // Restore half health
    player.setHealth(Math.ceil(player.getMaxHealth() / 2));
    // Place at map spawn
    if (map.data && map.data.spawn) {
        player.tile.x = map.data.spawn.x;
        player.tile.y = map.data.spawn.y;
        player.pos.x = map.data.spawn.x * config.size.tile;
        player.pos.y = map.data.spawn.y * config.size.tile;
    }
    player.sprite.opacity = 1;
    playerAnimating = false;
    frozenViewportX = null;
    frozenViewportY = null;
    deathScreenShown = false;
    console.log("[Player] Player respawned at spawn point:", map.data.spawn);
}
