// Combat Ui

// Damage popups queue
let damagePopups = [];


// Damage popup
function showDamagePopup(x, y, dmg, type = "enemy") {
    damagePopups.push({
        x, y, dmg,
        type,
        time: Date.now(),
        duration: 700, // ms
        startY: y,
        opacity: 0
    });
}


// Draw popups 
function drawDamagePopups() {
    const now = Date.now();
    const rootStyles = getComputedStyle(document.documentElement);
    for (let i = damagePopups.length - 1; i >= 0; i--) {
        const popup = damagePopups[i];
        const elapsed = now - popup.time;
        if (elapsed > popup.duration) {
            damagePopups.splice(i, 1);
            continue;
        }
        const progress = elapsed / popup.duration;
        const fade = progress < 0.2 ? progress * 5 : (1 - progress) * 1.2;
        popup.opacity = Math.max(0, Math.min(1, fade));
        const slide = -24 * progress;

        let px = Math.round(popup.x * config.size.tile - viewport.x + (config.win.width / 2) - (viewport.w / 2));
        let py = Math.round(popup.y * config.size.tile - viewport.y + (config.win.height / 2) - (viewport.h / 2));
        py -= 22 + slide;

        // Use CSS variables for colors
        const colorEnemy = rootStyles.getPropertyValue('--danger-red') || '#e33';
        const colorPlayer = rootStyles.getPropertyValue('--dropdown-btn-use-bg') || '#3af0ff';

        context.save();
        context.globalAlpha = popup.opacity;
        context.font = "bold 22px " + (rootStyles.getPropertyValue('--font-playermenu') || 'Arial, sans-serif');
        context.textAlign = "center";
        context.fillStyle = popup.type === "enemy" ? colorEnemy : colorPlayer;
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
        context.strokeText("-" + popup.dmg, px + config.size.char / 2, py);
        context.fillText("-" + popup.dmg, px + config.size.char / 2, py);
        context.restore();
    }
}


// Player Health Bar
function drawPlayerHealthHUD() {
    // Only show if any enemy is hostile
    const anyHostile = characters.some(char => char.type === "enemy" && char.state === "hostile");
   
    // Remove any existing SVG if not needed
    let old = document.getElementById('player-health-bar-svg');
    if (!anyHostile) {
        if (old) old.remove();
        return;
    }
    if (old) old.remove();

    const barWidth = Math.min(420, Math.floor(config.win.width * 0.45));
    const barHeight = 18;
    const x = Math.floor((config.win.width - barWidth) / 2);
    const y = 24;
    const healthRatio = Math.max(0, player.health / player.maxHealth);

    // Create SVG
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", "player-health-bar-svg");
    svg.setAttribute("width", barWidth);
    svg.setAttribute("height", barHeight + 8);
    svg.style.position = "fixed";
    svg.style.left = x + "px";
    svg.style.top = y + "px";
    svg.style.zIndex = 1000;
    svg.style.pointerEvents = "none";

    // Background
    const bg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bg.setAttribute("class", "player-health-bar-bg");
    bg.setAttribute("x", 0);
    bg.setAttribute("y", 0);
    bg.setAttribute("width", barWidth);
    bg.setAttribute("height", barHeight);
    svg.appendChild(bg);

    // Health
    const fg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    fg.setAttribute("class", "player-health-bar");
    fg.setAttribute("x", 0);
    fg.setAttribute("y", 0);
    fg.setAttribute("width", barWidth * healthRatio);
    fg.setAttribute("height", barHeight);
    svg.appendChild(fg);

    // Border
    const border = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    border.setAttribute("class", "player-health-bar-border");
    border.setAttribute("x", 0);
    border.setAttribute("y", 0);
    border.setAttribute("width", barWidth);
    border.setAttribute("height", barHeight);
    svg.appendChild(border);

    // Text
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("class", "player-health-bar-text");
    text.setAttribute("x", barWidth / 2);
    text.setAttribute("y", barHeight / 2 + 5);
    text.textContent = `Player Health: ${player.health} / ${player.maxHealth}`;
    svg.appendChild(text);

    document.body.appendChild(svg);
}
