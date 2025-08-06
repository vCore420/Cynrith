// Player Controls

// Touch Controls 

// Global flag to enable/disable controls (set by menu.js)
let controlsEnabled = true;

// player movement start:
document.addEventListener("keydown", function(event) {
    if (typeof player === "undefined" || !player) return;
    if (!controlsEnabled || player.frozen) return;

    if (event.keyCode >= 37 && event.keyCode <= 40) {
        player.movement.moving = true;
        player.movement.key = event.keyCode;

        for (let key in keys) {
            if (key == event.keyCode) {
                keys[key].a = true;
            }
        }
    }
    else {
        switch (event.keyCode) {
            case 84: 
                player.torch.lit = (player.torch.lit) ? false : true;
                break;
        }
    }
});

// player movement end:
document.addEventListener("keyup", function(event) {
    if (typeof player === "undefined" || !player) return;
    if (!controlsEnabled || player.frozen) return;

    let found = false;

    for (let key in keys) {
        if (key == event.keyCode) {
            keys[key].a = false;
        }
    }

    for (let key in keys) {
        if (keys[key].a) {
            player.movement.key = key;
            found = true;
        }
    }

    if (!found) {
        player.movement.moving = false;
    }
});

// Touch and mouse controls for mobile/desktop
function simulateKey(keyCode, isDown) {
    if (!controlsEnabled) return;
    if (isDown) {
        document.dispatchEvent(new KeyboardEvent('keydown', {keyCode, which: keyCode}));
    } else {
        document.dispatchEvent(new KeyboardEvent('keyup', {keyCode, which: keyCode}));
    }
}

['up', 'down', 'left', 'right'].forEach(direction => {
    const btn = document.getElementById('btn-' + direction);
    let keyCode;
    switch (direction) {
        case 'up': keyCode = 38; break;
        case 'down': keyCode = 40; break;
        case 'left': keyCode = 37; break;
        case 'right': keyCode = 39; break;
    }
    btn.addEventListener('touchstart', e => {
        if (e.cancelable) e.preventDefault();
        simulateKey(keyCode, true);
    });
    btn.addEventListener('touchend', e => {
        if (e.cancelable) e.preventDefault();
        simulateKey(keyCode, false);
    });
    
    btn.addEventListener('mousedown', e => simulateKey(keyCode, true));
    btn.addEventListener('mouseup', e => simulateKey(keyCode, false));
    btn.addEventListener('mouseleave', e => simulateKey(keyCode, false));
});
