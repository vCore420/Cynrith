// NPC and Enemy system

let deathScreenShown = false;
// Unique ID counter for all characters
let characterIdCounter = 1;

setInterval(() => {
    characters.forEach(char => {
        if (char.movement.moving || char.forcedWalking) {
            const dir = char.movement.key;
            const frames = keys[dir]?.f || [1, 1, 1, 1];
            if (typeof char.movement.animIndex === "undefined") char.movement.animIndex = 0;
            char.movement.animIndex = (char.movement.animIndex + 1) % frames.length;
            char.movement.frame = char.movement.animIndex;
        } else {
            char.movement.animIndex = 0;
            char.movement.frame = 1;
        }
    });
}, 125);

// Base class for both NPC and Enemy
function Character(x, y, spriteSrc, type = "npc", customData = {}) {
    this.uid = characterIdCounter++; 
    this.id = customData.id || null; 
    this.x = x;
    this.y = y;
    this.type = type;
    this.sprite = new Image();
    this.sprite.src = spriteSrc || customData.sprite; 
    this.frame = 0;
    this.state = "wander";
    this.movement = { moving: false, key: 40, frame: 1 };
    this.stepsRemaining = 0;
    this.wanderArea = null;

    const { sprite, ...rest } = customData;
    Object.assign(this, rest); 
}

// Friendly NPC
function NPC(x, y, spriteSrc, customData = {}) {
    Character.call(this, x, y, spriteSrc, "npc", customData);
}
NPC.prototype = Object.create(Character.prototype);

// Hostile Enemy
function Enemy(x, y, spriteSrc, customData = {}) {
    Character.call(this, x, y, spriteSrc, "enemy", customData);
}
Enemy.prototype = Object.create(Character.prototype);

// Get random direction
function randomDirection() {
    const dirs = [37, 38, 39, 40];
    return dirs[Math.floor(Math.random() * dirs.length)];
}

// Helper to get direction key to face the player
function getDirectionToFace(npc, player) {
    const dx = player.tile.x - npc.x;
    const dy = player.tile.y - npc.y;
    if (Math.abs(dx) > Math.abs(dy)) {
        return dx > 0 ? 39 : 37; // right : left
    } else if (dy !== 0) {
        return dy > 0 ? 40 : 38; // down : up
    }
    return 40; // default down
}

// Helper to check collision at a pixel position for NPCs/Enemies
function isNpcTileBlockedAtPixel(px, py, direction) {
    const tileSize = config.size.tile;
    const spriteSize = config.size.char;
    const offset = (spriteSize - tileSize) / 2;

    const tileX = Math.floor((px + offset + tileSize / 2) / tileSize);
    let tileY;
    if (direction === "up") {
        tileY = Math.floor((py + offset) / tileSize);
    } else {
        // down or default: triggers a bit sooner for bottom collision
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
        const tileGid = map.data.layout[tileY][tileX];
        let tileIndex = tileGid > 0 ? tileGid - 1 : null;
        return tileIndex !== null && map.data.assets[tileIndex] && map.data.assets[tileIndex].collision;
    }
}

// Check collision for a tile position
function isWalkable(tileX, tileY) {
    if (map.data._layers) {
        // Check all layers for collision
        for (let l = 0; l < map.data._layers.length; l++) {
            let gid = map.data._layers[l][tileY][tileX];
            if (gid > 0) {
                let tileIndex = map.data._gidMap ? map.data._gidMap[gid] : gid - 1;
                if (tileIndex !== null && map.data.assets[tileIndex] && map.data.assets[tileIndex].collision) {
                    return false;
                }
            }
        }
        return true;
    } else {
        // Legacy
        const tileGid = map.data.layout[tileY][tileX];
        let tileIndex = tileGid > 0 ? tileGid - 1 : null;
        return tileIndex === null || !map.data.assets[tileIndex].collision;
    }
}

// AI: Wander within a defined area
function wanderAI(char) {
    if (char.forcedEncounterInProgress || char.forcedWalking) return;
    if (char.isInteracting) return;
    if (!char.wanderArea) return;

    // Initialize wander state
    if (!char.wanderState) {
        char.wanderState = {
            destX: null,
            destY: null,
            moving: false,
            pauseTimer: 0
        };
    }

    // If currently moving to a tile, continue moving
    if (char.wanderState.moving) {
        const speed = (char.moveSpeed || 1) / 2.5; 
        let dx = char.wanderState.destX - char.x;
        let dy = char.wanderState.destY - char.y;

        // Move towards destination
        if (Math.abs(dx) > 0.01) {
            // Pixel-based collision check for X movement
            let tryMoveX = char.x + Math.sign(dx) * Math.min(Math.abs(dx), speed / config.size.tile);
            let px = tryMoveX * config.size.tile;
            let py = char.y * config.size.tile;
            if (!isNpcTileBlockedAtPixel(px, py, dx > 0 ? "right" : dx < 0 ? "left" : "down")) {
                char.x = tryMoveX;
            }
        }
        if (Math.abs(dy) > 0.01) {
            // Pixel-based collision check for Y movement
            let tryMoveY = char.y + Math.sign(dy) * Math.min(Math.abs(dy), speed / config.size.tile);
            let px = char.x * config.size.tile;
            let py = tryMoveY * config.size.tile;
            if (!isNpcTileBlockedAtPixel(px, py, dy < 0 ? "up" : "down")) {
                char.y = tryMoveY;
            }
        }

        char.movement.moving = true;

        // Arrived at destination tile
        if (Math.abs(dx) <= 0.01 && Math.abs(dy) <= 0.01) {
            char.x = char.wanderState.destX;
            char.y = char.wanderState.destY;
            char.wanderState.moving = false;
            char.movement.moving = false;
            char.wanderState.pauseTimer = Math.floor(Math.random() * 20) + 10; // Pause before next move
        }
        return;
    }

    // If pausing, count down
    if (char.wanderState.pauseTimer > 0) {
        char.movement.moving = false;
        char.wanderState.pauseTimer--;
        return;
    }

    // Pick a new direction and destination tile
    if (Math.random() < 0.04) { // Chance to start wandering
        const dir = randomDirection();
        const move = keys[dir];
        const destX = Math.round(char.x) + Math.sign(move.x);
        const destY = Math.round(char.y) + Math.sign(move.y);

        if (
            destX >= char.wanderArea.x1 && destX <= char.wanderArea.x2 &&
            destY >= char.wanderArea.y1 && destY <= char.wanderArea.y2 &&
            isWalkable(destX, destY)
        ) {
            char.movement.key = dir;
            char.wanderState.destX = destX;
            char.wanderState.destY = destY;
            char.wanderState.moving = true;
            char.movement.moving = true;
        }
    } else {
        char.movement.moving = false;
    }
}

// Update all NPCs and Enemies
function updateCharacters() {
    characters.forEach(char => {
        if (char.type === "enemy") {
            const dist = Math.abs(player.tile.x - char.x) + Math.abs(player.tile.y - char.y);
            if (dist <= char.distance) {
                char.state = "hostile";
                moveEnemyTowardPlayer(char);
                // Attack if on same tile
                if (player.tile.x === Math.round(char.x) && player.tile.y === Math.round(char.y)) {
                    if (!char._attackTimer || Date.now() - char._attackTimer > 1000 / char.speed) {
                        char._attackTimer = Date.now();
                        let dmg = Math.max(1, char.attack - player.getDefence());
                        player.addHealth(-dmg);
                        showDamagePopup(player.tile.x, player.tile.y, dmg, "player");
                        if (player.getHealth() <= 0) handlePlayerDeath();
                        else player.knockbackAnim();
                    }
                }
            } else {
                // Go back to wandering
                char.state = "wander";
                wanderAI(char);
            }
        } else {
            wanderAI(char);
        }
    });
}

function checkForcedEncounters() {
    characters.forEach(npc => {
        if (
            npc.type === "npc" &&
            npc.forcedEncounter &&
            npc.forcedEncounter.enabled &&
            !npc.forcedEncounter.triggered &&
            !npc.forcedEncounterInProgress
        ) {
            const onTrigger = npc.forcedEncounter.triggerTiles.some(
                t => player.tile.x === t.x && player.tile.y === t.y
            );
            if (onTrigger) {
                npc.forcedEncounterInProgress = true;
                npc.forcedWalking = true;
                controlsEnabled = false;
                npc.isInteracting = true;
                player.frozen = true;
                clearAllMovementKeys(); 
 
                npc._forcedEncounterInterval = setInterval(() => {
                    let dx = player.tile.x - Math.round(npc.x);
                    let dy = player.tile.y - Math.round(npc.y);

                    if (Math.abs(dx) + Math.abs(dy) > 1) {
                        npc.movement.key = getDirectionToFace(npc, player);
                        moveEnemyTowardPlayer(npc);
                        npc.movement.moving = true;
                    } else {
                        clearInterval(npc._forcedEncounterInterval);
                        npc._forcedEncounterInterval = null;
                        npc.forcedEncounter.triggered = true;
                        npc.forcedEncounterInProgress = false;
                        npc.forcedWalking = false; 
                        npc.isInteracting = true;
                        npc.movement.moving = false;
                        npc.movement.key = getDirectionToFace(npc, player);

                        dialogue(...npc.dialogue.default);
                    }
                }, 30);
            }
        }
    });
}

// Move enemy toward player
function moveEnemyTowardPlayer(char) {
    const speed = char.moveSpeed || 2;
    let dx = player.tile.x - Math.round(char.x);
    let dy = player.tile.y - Math.round(char.y);

    char.movement.key = getDirectionToFace(char, player);

    let moved = false;

    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx !== 0) {
            // Pixel-based collision check for X movement
            let tryMoveX = char.x + Math.sign(dx) * speed / config.size.tile;
            let px = tryMoveX * config.size.tile;
            let py = char.y * config.size.tile;
            if (!isNpcTileBlockedAtPixel(px, py, dx > 0 ? "right" : dx < 0 ? "left" : "down")) {
                char.x = tryMoveX;
                moved = true;
            }
        }
    } else if (dy !== 0) {
        // Pixel-based collision check for Y movement
        let tryMoveY = char.y + Math.sign(dy) * speed / config.size.tile;
        let px = char.x * config.size.tile;
        let py = tryMoveY * config.size.tile;
        if (!isNpcTileBlockedAtPixel(px, py, dy < 0 ? "up" : "down")) {
            char.y = tryMoveY;
            moved = true;
        }
    }

    if (moved) {
        char.movement.moving = true;
    } else {
        char.movement.moving = false;
    }
}

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
        }
    }, 40);
}

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
}

// Handle enemy death, clean this up a bit to have a better looking animation and dynamic cooldown times and proper respawn locations
function handleEnemyDeath(enemy) {
    let fadeFrames = 12;
    let frame = 0;
    let fadeInterval = setInterval(() => {
        enemy.sprite.opacity = 1 - frame / fadeFrames;
        frame++;
        if (frame >= fadeFrames) {
            clearInterval(fadeInterval);
            // Remove enemy from characters array
            const idx = characters.indexOf(enemy);
            if (idx !== -1) characters.splice(idx, 1);

            // Give XP
            if (enemy.xpGain) player.addXP(enemy.xpGain);

            // Give loot
            if (enemy.loot) {
                enemy.loot.forEach(drop => {
                    if (Math.random() * 100 < drop.chance) {
                        let amt = Array.isArray(drop.amount)
                            ? Math.floor(Math.random() * (drop.amount[1] - drop.amount[0] + 1)) + drop.amount[0]
                            : drop.amount;
                        addItem(drop.item, amt);
                        notify(`You found ${amt} ${ITEM_DEFINITIONS[drop.item].name}!`, 2000);
                    }
                });
            }

            // Respawn enemy after cooldown
            setTimeout(() => {
                respawnEnemy(ENEMY_TYPES[enemy.id]); 
            }, 4000); // 4 seconds respawn, extend this 
        }
    }, 40);
}

function respawnEnemy(enemyDef) {
    let spawnInfo = enemyDef.spawns?.find(s => s.map === currentMapIndex);
    if (!spawnInfo) return;
    const newEnemy = new Enemy(
        spawnInfo.x,
        spawnInfo.y,
        enemyDef.sprite,
        enemyDef
    );
    newEnemy.wanderArea = spawnInfo.wanderArea;
    newEnemy.health = enemyDef.maxHealth;
    characters.push(newEnemy);
}

// List to hold all characters
const characters = [];

// Draw all NPCs and Enemies
function drawCharacters() {
    let anyHostile = false;
    characters.forEach(char => {
        if (!char.sprite || !char.sprite.complete || char.sprite.naturalWidth === 0) return;

        let frame = 1;
        if (char.movement && char.movement.key && keys[char.movement.key]) {
            const frames = keys[char.movement.key].f;
            frame = frames[char.movement.frame || 0] || frames[0];
        }

        let px = Math.round(char.x * config.size.tile - viewport.x + (config.win.width / 2) - (viewport.w / 2));
        let py = Math.round(char.y * config.size.tile - viewport.y + (config.win.height / 2) - (viewport.h / 2));
        context.drawImage(
            char.sprite,
            frame * config.size.char,
            0,
            config.size.char,
            config.size.char,
            px,
            py,
            config.size.char,
            config.size.char
        );
        // Draw health bar for hostile enemies
        if (char.type === "enemy" && char.state === "hostile" && typeof char.health === "number") {
            anyHostile = true;
            let barWidth = config.size.char * 0.8;
            let barHeight = 8;
            let healthRatio = Math.max(0, char.health / char.maxHealth);

            // Use CSS variables for styling
            const rootStyles = getComputedStyle(document.documentElement);
            const barBg = rootStyles.getPropertyValue('--enemy-health-bar-bg') || '#222';
            const barFg = rootStyles.getPropertyValue('--enemy-health-bar') || '#e33';
            const barBorder = rootStyles.getPropertyValue('--enemy-health-bar-border') || '#fff';
            const nameColor = rootStyles.getPropertyValue('--quest-text') || '#fff';
            const nameStroke = rootStyles.getPropertyValue('--enemy-health-bar-name-stroke') || '#222';

            // Draw enemy name above health bar
            context.save();
            context.font = "bold 16px " + (rootStyles.getPropertyValue('--font-playermenu') || 'Arial, sans-serif');
            context.textAlign = "center";
            context.fillStyle = nameColor;
            context.strokeStyle = nameStroke;
            context.lineWidth = 3;
            let nameY = py - barHeight - 18;
            context.strokeText(char.name || "Enemy", px + config.size.char / 2, nameY);
            context.fillText(char.name || "Enemy", px + config.size.char / 2, nameY);
            context.restore();

            // Draw health bar background
            context.fillStyle = barBg;
            context.globalAlpha = 0.92;
            context.fillRect(px + (config.size.char - barWidth) / 2, py - barHeight - 6, barWidth, barHeight);
            context.globalAlpha = 1;

            // Draw health bar foreground
            context.fillStyle = barFg;
            context.fillRect(px + (config.size.char - barWidth) / 2, py - barHeight - 6, barWidth * healthRatio, barHeight);

            // Draw border
            context.strokeStyle = barBorder;
            context.lineWidth = 1;
            context.strokeRect(px + (config.size.char - barWidth) / 2, py - barHeight - 6, barWidth, barHeight);
        }
    });
    
    drawDamagePopups();
}

function spawnCharactersForMap(mapIndex) {
    characters.length = 0; // Clear previous characters

    // Spawn NPCs
    Object.values(NPC_DEFINITIONS).forEach(def => {
        if (def.spawns) {
            def.spawns.forEach(spawn => {
                if (spawn.map === mapIndex) {
                    const npc = new NPC(
                        spawn.x,
                        spawn.y,
                        def.sprite,
                        def
                    );
                    npc.wanderArea = spawn.wanderArea;
                    characters.push(npc);
                    npc.forcedEncounterInProgress = false;
                }
            });
        }
    });

    // Spawn Enemies
    Object.values(ENEMY_TYPES).forEach(def => {
        if (def.spawns) {
            def.spawns.forEach(spawn => {
                if (spawn.map === mapIndex) {
                    const enemy = new Enemy(
                        spawn.x,
                        spawn.y,
                        def.sprite,
                        def
                    );
                    enemy.wanderArea = spawn.wanderArea;
                    enemy.health = def.maxHealth;
                    characters.push(enemy);
                }
            });
        }
    });
}

function checkNpcInteraction() {
    characters.forEach(char => {
        if (char.type === "npc" && char.interactive) {
            const inRange =
                Math.abs(player.tile.x - char.x) <= 2 &&
                Math.abs(player.tile.y - char.y) <= 2;

            if (inRange) {
                if (!char.notifShown) {
                    notify(`Press the A button to talk to ${char.name}`, 2500);
                    char.notifShown = true;
                }
                if (actionButtonAPressed && char.dialogue && char.dialogue.default) {
                    // Stop wandering and face player
                    char.isInteracting = true;
                    char.movement.key = getDirectionToFace(char, player);

                    // Start dialogue and resume wandering after
                    dialogue(...char.dialogue.default);
                    // Wait for dialogue to finish, then resume wandering
                    const block = document.getElementById('dialogue-block');
                    const resumeWander = () => {
                        char.isInteracting = false;
                        block.removeEventListener('transitionend', resumeWander);
                    };
                    // Listen for dialogue block hiding (when interaction ends)
                    block.addEventListener('transitionend', resumeWander);
                }
            } else {
                char.notifShown = false;
                char.isInteracting = false;
            }
        }
        // Add more interaction logic here next for quests, etc.
    });
}
