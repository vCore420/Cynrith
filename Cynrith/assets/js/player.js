let playerAnimating = false;

// Helper to check collision at a tile (for all layers)
function isTileBlockedAtPixel(px, py, direction) {
    const tileSize = config.size.tile;
    const spriteSize = config.size.char;
    const offset = (spriteSize - tileSize) / 2;

    const tileX = Math.floor((px + offset + tileSize / 2) / tileSize);
    let tileY;
    if (direction === "up") {
        tileY = Math.floor((py + offset) / tileSize);
    } else {
        tileY = Math.floor((py + offset + tileSize - 9) / tileSize);
    }

    if (map.data._layers) {
        for (let l = 0; l < map.data._layers.length; l++) {
            let gid = map.data._layers[l][tileY][tileX];
            if (gid > 0) {
                let tileIndex = map.data._gidMap ? map.data._gidMap[gid] : gid - 1;
                if (tileIndex !== null && map.data.assets[tileIndex] && map.data.assets[tileIndex].collision) {
                    return true;
                }
            }
        }
        return false;
    } else {
        let tileGid = map.data.layout[tileY][tileX];
        let tileIndex = tileGid > 0 ? tileGid - 1 : null;
        return tileIndex !== null && map.data.assets[tileIndex] && map.data.assets[tileIndex].collision;
    }
}

function clearAllMovementKeys() {
    for (let key in keys) {
        if (keys.hasOwnProperty(key)) {
            keys[key].a = false;
        }
    }
}

// player:
const Player = function(tile_x, tile_y) {
    this.timer = setInterval(() => player.frame(), 125);
    this.frames = [0.40, 0.42, 0.44, 0.46, 0.48, 0.50, 0.48, 0.46, 0.44, 0.42, 0.40];
    this.frozen = false;

    this.sprite = new Image();
    this.sprite.src = "assets/img/char/hero.png";

    // Base Player stats
    this.maxHealth = 100;
    this.health = 100;
    this.xp = 0;
    this.attack = 1;
    this.defence = 1;
    this.attackSpeed = 0;
    this.lastAttackTime = 0;
   
    // Helper to get attacks per second from stat
    Player.prototype.getAttacksPerSecond = function() {
        // Capped at 10 attacks per second
        return Math.min(1 + this.attackSpeed * 0.002, 10);
    };

    Player.prototype.getAttackSpeed = function() { return this.attackSpeed; };
    Player.prototype.setAttackSpeed = function(val) {
        const max = 5000;
        if (val > max) {
            notify("Attack Speed is Maxed Out!", 2000);
            this.attackSpeed = max;
        } else {
            this.attackSpeed = Math.max(0, val);
        }
    };
    Player.prototype.addAttackSpeed = function(val) {
        this.setAttackSpeed(this.attackSpeed + val);
    };

    this.movement = {
        moving: false,
        key: 40,
        frame: 1
    };
    this.pos = {
        x: config.size.tile * tile_x,
        y: config.size.tile * tile_y
    };
    this.tile = {
        x: tile_x,
        y: tile_y
    };
    this.torch = {
        lit: false,
        frame: 0
    };
};

Player.prototype = {
    draw: function() {
        let frame = (player.movement.moving) ? keys[player.movement.key].f[player.movement.frame] : keys[player.movement.key].f[1];
        let pos_x = Math.round(player.pos.x - viewport.x + (config.win.width / 2) - (viewport.w / 2));
        let pos_y = Math.round(player.pos.y - viewport.y + (config.win.height / 2) - (viewport.h / 2));

        this.light(pos_x, pos_y);
        this.torch_func(pos_x, pos_y);
        
        context.drawImage(
            this.sprite,
            frame * config.size.char,
            0,
            config.size.char,
            config.size.char,
            pos_x,
            pos_y,
            config.size.char,
            config.size.char
        );
    },
    light: function(pos_x, pos_y) {
        let light_x = pos_x + (config.size.tile / 2);
        let light_y = pos_y + (config.size.tile / 2);

        let radius = 100;
        let radialGradient = context.createRadialGradient(light_x, light_y, 0, light_x, light_y, radius);

        radialGradient.addColorStop(0, "rgba(238, 229, 171, 0.325)");
        radialGradient.addColorStop(1, "rgba(238, 229, 171, 0)");

        context.fillStyle = radialGradient;
        context.beginPath();
        context.arc(light_x, light_y, radius, 0, Math.PI * 2);
        context.fill();
    },
    torch_func: function(pos_x, pos_y) {
        if (this.torch.lit) {
            for (let y = 0; y < config.tiles.y; y++) {
                for (let x = 0; x < config.tiles.x; x++) {
                    let distance = Math.sqrt((Math.pow(x - config.center.x, 2)) + (Math.pow(y - config.center.y, 2)));
                    let opacity = (distance / 4) - this.frames[this.torch.frame];

                    context.fillStyle = "rgba(0, 0, 0, " + opacity + ")";
                    context.fillRect((x * config.size.tile) - (config.size.tile / 2), (y * config.size.tile) - (config.size.tile / 2), config.size.tile, config.size.tile);
                }
            }
        }
    },
    frame: function() {
        if (this.frozen) return;

        this.movement.frame++;

        if (this.movement.frame == 4) {
            this.movement.frame = 0;
        }

        this.torch.frame++;

        if (this.torch.frame == this.frames.length) {
            this.torch.frame = 0;
        }

        player.movement.frame = this.movement.frame;
        player.torch = this.torch;
    },
    move: function(x, y) {
        let layout = map.data.layout;
        if (!layout || !layout[0]) return;

        let maxY = layout.length - 1;
        let maxX = layout[0].length - 1;

        // Calculate new pixel positions
        let newPosX = this.pos.x + x;
        let newPosY = this.pos.y + y;

        // X movement
        // Only move if the new position's collision box is not blocked
        if (!isTileBlockedAtPixel(newPosX, this.pos.y)) {
            this.pos.x = newPosX;
            // Update tile.x based on the center of the collision box
            const tileSize = config.size.tile;
            const spriteSize = config.size.char;
            const offset = (spriteSize - tileSize) / 2;
            this.tile.x = Math.floor((this.pos.x + offset + tileSize / 2) / tileSize);
        }

        // Y movement
        if (!isTileBlockedAtPixel(this.pos.x, newPosY)) {
            this.pos.y = newPosY;
            const tileSize = config.size.tile;
            const spriteSize = config.size.char;
            const offset = (spriteSize - tileSize) / 2;
            this.tile.y = Math.floor((this.pos.y + offset + tileSize / 2) / tileSize);
        }

        player = this;
        Log("coords", "Coords: " + this.tile.x + ", " + this.tile.y);
    },
    getAttackSpeed: function() { return this.attackSpeed; },
    setAttackSpeed: function(val) {
        const max = 5;
        if (val > max) {
            notify("Attack Speed is already maxed out!", 2000);
            this.attackSpeed = max;
        } else {
            this.attackSpeed = Math.max(1, val);
        }
    },
    addAttackSpeed: function(val) {
        this.setAttackSpeed(this.attackSpeed + val);
    },
    attackEnemy: function() {
        const now = Date.now();
        const attacksPerSecond = this.getAttacksPerSecond();
        const cooldown = 1000 / attacksPerSecond;
        if (now - this.lastAttackTime < cooldown) return; 

        this.lastAttackTime = now;

        // Only allow attack if player has a sword
        if (!hasItem("sword", 1)) return;

        // Play attack animation (jump forward and back)
        this.quickAttackAnim();

        // Determine attack direction
        let dir = this.movement.key;
        let dx = keys[dir]?.x ? Math.sign(keys[dir].x) : 0;
        let dy = keys[dir]?.y ? Math.sign(keys[dir].y) : 0;

        // Target tiles: in front of player and two tiles in front
        let targetTiles = [
            { x: this.tile.x + dx,     y: this.tile.y + dy },     // 1 tile ahead
            { x: this.tile.x + dx*2,   y: this.tile.y + dy*2 },   // 2 tiles ahead
            { x: this.tile.x,          y: this.tile.y }           // player's own tile
        ];

        // Attack any enemy on target tiles
        characters.forEach(char => {
            if (char.type === "enemy" && char.health > 0) {
                let isTarget = targetTiles.some(t =>
                    Math.round(char.x) === t.x && Math.round(char.y) === t.y
                );
                if (isTarget) {
                    let dmg = Math.max(1, this.attack - char.defense);
                    char.health -= dmg;
                    showDamagePopup(Math.round(char.x), Math.round(char.y), dmg, "enemy");
                    if (char.health <= 0) {
                        handleEnemyDeath(char);
                    }
                }
            }
        });
    },
    quickAttackAnim: function() {
        playerAnimating = true;
        frozenViewportX = viewport.x; 
        frozenViewportY = viewport.y;
        let dir = this.movement.key;
        let dx = keys[dir]?.x ? Math.sign(keys[dir].x) : 0;
        let dy = keys[dir]?.y ? Math.sign(keys[dir].y) : 0;
        let origX = this.pos.x;
        let origY = this.pos.y;
        let jumpDist = 16;

        this.pos.x += dx * jumpDist;
        this.pos.y += dy * jumpDist;
        setTimeout(() => {
            this.pos.x = origX;
            this.pos.y = origY;
            playerAnimating = false;
            frozenViewportX = null;
            frozenViewportY = null;
        }, 80);
    },
    knockbackAnim: function() {
        playerAnimating = true;
        frozenViewportX = viewport.x;
        frozenViewportY = viewport.y;
        let dir = this.movement.key;
        let dx = keys[dir]?.x ? Math.sign(keys[dir].x) : 0;
        let dy = keys[dir]?.y ? Math.sign(keys[dir].y) : 0;
        let origX = this.pos.x;
        let origY = this.pos.y;
        let knockDist = 16;

        // Move backward
        this.pos.x -= dx * knockDist;
        this.pos.y -= dy * knockDist;
        setTimeout(() => {
            // Move forward to original
            this.pos.x = origX;
            this.pos.y = origY;
            playerAnimating = false;
            frozenViewportX = null;
            frozenViewportY = null;
        }, 80);
    },
    getHealth: function() { return this.health; },
    setHealth: function(val) { this.health = Math.max(0, Math.min(val, this.maxHealth)); },
    addHealth: function(val) { this.setHealth(this.health + val); },

    getMaxHealth: function() { return this.maxHealth; },
    setMaxHealth: function(val) { this.maxHealth = Math.max(1, val); },
    addMaxHealth: function(val) { this.setMaxHealth(this.maxHealth + val); },

    getXP: function() { return this.xp; },
    addXP: function(val) { this.xp += val; },

    getAttack: function() { return this.attack; },
    setAttack: function(val) { this.attack = val; },
    addAttack: function(val) { this.attack += val; },

    getDefence: function() { return this.defence; },
    setDefence: function(val) { this.defence = val; },
    addDefence: function(val) { this.defence += val; }
};

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
