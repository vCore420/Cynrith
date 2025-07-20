// Player menu

let statsInterval = null;

// open menu
function openMenu() {
    document.getElementById('player-menu').classList.remove('hidden');
    controlsEnabled = false;
    updatePlayerMenuSprite();
    updatePlayerMenuStats();
    statsInterval = setInterval(updatePlayerMenuStats, 300); // Refresh stats every 300ms
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
}

// close menu 
function closeMenu() {
    document.getElementById('player-menu').classList.add('hidden');
    controlsEnabled = true;
    if (statsInterval) {
        clearInterval(statsInterval);
        statsInterval = null;
    }
}

document.getElementById('menu-btn').addEventListener('click', openMenu);
document.getElementById('close-menu').addEventListener('click', closeMenu);

// Display Player Sprite in menu
function updatePlayerMenuSprite() {
    const preview = document.getElementById('player-sprite-preview');
    preview.innerHTML = ""; 

    if (typeof player === "undefined" || !player.sprite.complete) return;

    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");

    let frame = keys[player.movement.key]?.f[1] ?? 1;
    ctx.drawImage(
        player.sprite,
        frame * config.size.char, 0, config.size.char, config.size.char,
        0, 0, 128, 128
    );

    preview.appendChild(canvas);
}

// Display Player Stats in menu
function updatePlayerMenuStats() {
    const stats = document.getElementById('player-stats-preview');
    if (!stats || typeof player === "undefined") return;

    stats.innerHTML = `
        <div>
            <div><b>Health:</b> ${player.health}</div>
            <div><b>XP:</b> ${player.xp}</div>
            <div><b>Attack:</b> ${player.attack}</div>
            <div><b>Defence:</b> ${player.defence}</div>
        </div>
    `;
}