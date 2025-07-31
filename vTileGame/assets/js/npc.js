// NPC and Enemy system

let deathScreenShown = false;
// Unique ID counter for all characters
let characterIdCounter = 1;

setInterval(() => {
    characters.forEach(char => {
        if (char.movement.moving) {
            char.movement.frame = (char.movement.frame + 1) % 4;
        } else {
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
// currently doesnt play frames for walking when wondering, sprite just faces the direction they are moving
function wanderAI(char) {
    if (char.isInteracting) return;
    if (!char.wanderArea) return;

    if (typeof char.stepsRemaining !== "number") char.stepsRemaining = 0;

    if (!char.movement.moving && char.stepsRemaining <= 0) {
        if (Math.random() < 0.02) {
            const dir = randomDirection();
            const move = keys[dir];
            const newX = char.x + (move.x / config.size.tile);
            const newY = char.y + (move.y / config.size.tile);

            if (
                newX >= char.wanderArea.x1 && newX <= char.wanderArea.x2 &&
                newY >= char.wanderArea.y1 && newY <= char.wanderArea.y2 &&
                isWalkable(Math.round(newX), Math.round(newY))
            ) {
                char.movement.key = dir;
                char.movement.moving = true;
                char.stepsRemaining = Math.floor(Math.random() * 3) + 2;
            }
        }
    } else if (char.stepsRemaining > 0) {
        const move = keys[char.movement.key];
        const nextX = char.x + (move.x / config.size.tile);
        const nextY = char.y + (move.y / config.size.tile);

        if (
            nextX >= char.wanderArea.x1 && nextX <= char.wanderArea.x2 &&
            nextY >= char.wanderArea.y1 && nextY <= char.wanderArea.y2 &&
            isWalkable(Math.round(nextX), Math.round(nextY))
        ) {
            char.x = nextX;
            char.y = nextY;
            char.movement.moving = true;
            char.stepsRemaining--;
        } else {
            char.stepsRemaining = 0;
            char.movement.moving = false;
        }
    } else {
        char.movement.moving = false;
    }
}

// Update all NPCs and Enemies (call in game loop)
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
                // Go back to wandering, need to make this work for situations wherew the npc leaves thair walkable box
                char.state = "wander";
                wanderAI(char);
            }
        } else {
            wanderAI(char);
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
            char.x += Math.sign(dx) * speed / config.size.tile;
            moved = true;
        }
    } else if (dy !== 0) {
        char.y += Math.sign(dy) * speed / config.size.tile;
        moved = true;
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

        context.save();
        context.globalAlpha = popup.opacity;
        context.font = "bold 22px Arial";
        context.textAlign = "center";
        context.fillStyle = popup.type === "enemy" ? "#e33" : "#33e";
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
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,1)";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "9999";
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 0.6s";
    overlay.innerHTML = `
        <h1 style="color:#fff;font-size:3em;margin-bottom:1em;">You Died</h1>
        <button id="respawn-btn" style="font-size:1.5em;padding:0.5em 2em;">Respawn</button>
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

// Handle enemy death, clean this up a bit to have a better looking animation and dynamic cooldown times
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
            }, 4000); // 4 seconds respawn
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
    characters.forEach(char => {
        if (!char.sprite || !char.sprite.complete || char.sprite.naturalWidth === 0) return;

        let frame = 1;
        if (char.movement && char.movement.moving && char.movement.key && keys[char.movement.key]) {
            frame = keys[char.movement.key].f[char.movement.frame || 1];
        } else if (char.movement && char.movement.key && keys[char.movement.key]) {
            frame = keys[char.movement.key].f[1];
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
            let barWidth = config.size.char * 0.8;
            let barHeight = 8;
            let healthRatio = Math.max(0, char.health / char.maxHealth);

            // Draw enemy name above health bar
            context.save();
            context.font = "bold 16px Arial";
            context.textAlign = "center";
            context.fillStyle = "#fff";
            context.strokeStyle = "#222";
            context.lineWidth = 3;
            let nameY = py - barHeight - 18;
            context.strokeText(char.name || "Enemy", px + config.size.char / 2, nameY);
            context.fillText(char.name || "Enemy", px + config.size.char / 2, nameY);
            context.restore();
            context.fillStyle = "#222";
            context.fillRect(px + (config.size.char - barWidth) / 2, py - barHeight - 6, barWidth, barHeight);
            context.fillStyle = "#e33";
            context.fillRect(px + (config.size.char - barWidth) / 2, py - barHeight - 6, barWidth * healthRatio, barHeight);
            context.strokeStyle = "#fff";
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
                Math.abs(player.tile.x - char.x) <= 1 &&
                Math.abs(player.tile.y - char.y) <= 1;

            if (inRange) {
                if (!char.notifShown) {
                    notify(`Press the B button to talk to ${char.name}`, 2500);
                    char.notifShown = true;
                }
                if (actionButtonBPressed && char.dialogue && char.dialogue.default) {
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