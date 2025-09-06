// Player Controls

// Touch Controls 

// Global flag to enable/disable controls (set by menu.js)
let controlsEnabled = true;

const heldMovementKeys = [];

// Movement keys for WASD
const wasdDirections = {
    "KeyW": { x: 0, y: -1 }, // Up
    "KeyA": { x: -1, y: 0 }, // Left
    "KeyS": { x: 0, y: 1 },  // Down
    "KeyD": { x: 1, y: 0 }   // Right
};

// Action button key mapping
const actionKeyMap = {
    "Enter": "A",        // Action Button A (interact)
    "Space": "B"         // Action Button B (combat)
};

function canUseActionButtons() {
    return _dialogueActive;
}

// Helper to update player movement direction based on held keys
function updatePlayerMovementDirection() {
    let dx = 0, dy = 0;
    heldMovementKeys.forEach(code => {
        dx += wasdDirections[code].x;
        dy += wasdDirections[code].y;
    });

    // Normalize diagonal movement
    if (dx !== 0 && dy !== 0) {
        const norm = Math.sqrt(dx * dx + dy * dy);
        dx = dx / norm;
        dy = dy / norm;
    }

    // Determine facing direction for animation (last key pressed)
    let facingKey = heldMovementKeys.length > 0 ? heldMovementKeys[heldMovementKeys.length - 1] : null;
    let keyCode = 40; // Default down
    if (facingKey) {
        const dir = wasdDirections[facingKey];
        if (dir.x === -1 && dir.y === 0) keyCode = 37; // Left
        else if (dir.x === 1 && dir.y === 0) keyCode = 39; // Right
        else if (dir.x === 0 && dir.y === -1) keyCode = 38; // Up
        else if (dir.x === 0 && dir.y === 1) keyCode = 40; // Down
        else if (dir.x !== 0 && dir.y !== 0) keyCode = dir.y < 0 ? 38 : 40; // Diagonal: prefer vertical anim
    }

    if (dx !== 0 || dy !== 0) {
        player.movement.moving = true;
        player.movement.key = keyCode;
        player.movement.dx = dx;
        player.movement.dy = dy;
    } else {
        player.movement.moving = false;
        player.movement.dx = 0;
        player.movement.dy = 0;
    }
}

// Keydown: WASD movement and action buttons
document.addEventListener("keydown", function(event) {
    if (typeof player === "undefined" || !player) return;

    // ESC key toggles player menu
    if (event.code === "Escape") {
        const menu = document.getElementById('player-menu');
        const menuIsOpen = menu && !menu.classList.contains('hidden');
        // Only allow toggle if main game is running (not during dialogue)
        if (!_dialogueActive) {
            if (!menuIsOpen) {
                openMenu();
            } else {
                closeMenu();
            }
        }
        return;
    }

    if (!controlsEnabled || player.frozen) {
        if (canUseActionButtons() && actionKeyMap.hasOwnProperty(event.code)) {
            if (actionKeyMap[event.code] === "A") actionButtonAPressed = true;
            if (actionKeyMap[event.code] === "B") actionButtonBPressed = true;
        }
        return;
    }

    // WASD movement
    if (wasdDirections.hasOwnProperty(event.code)) {
        if (!heldMovementKeys.includes(event.code)) {
            heldMovementKeys.push(event.code);
            updatePlayerMovementDirection();
        }
    }

    // Action buttons
    else if (actionKeyMap.hasOwnProperty(event.code)) {
        if (actionKeyMap[event.code] === "A") actionButtonAPressed = true;
        if (actionKeyMap[event.code] === "B") actionButtonBPressed = true;
    }

    // Other controls (e.g. torch toggle)
    else if (event.code === "KeyT") {
        player.torch.lit = !player.torch.lit;
    }
});

// Keyup: WASD movement and action buttons
document.addEventListener("keyup", function(event) {
    if (typeof player === "undefined" || !player) return;

    // Action buttons
    if (actionKeyMap.hasOwnProperty(event.code)) {
        if (actionKeyMap[event.code] === "A") actionButtonAPressed = false;
        if (actionKeyMap[event.code] === "B") actionButtonBPressed = false;
    }

    if (!controlsEnabled || player.frozen) return;

    // WASD movement
    if (wasdDirections.hasOwnProperty(event.code)) {
        const idx = heldMovementKeys.indexOf(event.code);
        if (idx !== -1) {
            heldMovementKeys.splice(idx, 1);
            updatePlayerMovementDirection();
        }
    }
});

// Utility for clearing movement keys (e.g. after dialogue/menu)
function clearAllMovementKeys() {
    heldMovementKeys.length = 0;
    player.movement.moving = false;
    player.movement.dx = 0;
    player.movement.dy = 0;
}

// Touch and mouse controls for mobile/desktop
function simulateKey(code, isDown) {
    if (!controlsEnabled) return;
    const eventType = isDown ? 'keydown' : 'keyup';
    document.dispatchEvent(new KeyboardEvent(eventType, { code }));
}

// Map D-Pad buttons to WASD codes
const dpadMap = {
    up: "KeyW",
    down: "KeyS",
    left: "KeyA",
    right: "KeyD"
};

['up', 'down', 'left', 'right'].forEach(direction => {
    const btn = document.getElementById('btn-' + direction);
    const code = dpadMap[direction];
    btn.addEventListener('touchstart', e => {
        if (e.cancelable) e.preventDefault();
        simulateKey(code, true);
    });
    btn.addEventListener('touchend', e => {
        if (e.cancelable) e.preventDefault();
        simulateKey(code, false);
    });
    btn.addEventListener('mousedown', e => simulateKey(code, true));
    btn.addEventListener('mouseup', e => simulateKey(code, false));
    btn.addEventListener('mouseleave', e => simulateKey(code, false));
});
