// NPC and Enemy logic

let deathScreenShown = false; // move to player death ui
// Unique ID counter for all characters
let characterIdCounter = 1;
// List to hold all characters
const characters = [];


// Set frame rate for character animations
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

        let px = Math.round(char.x * config.size.tile - viewport.x);
        let py = Math.round(char.y * config.size.tile - viewport.y);
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
            char._lastAmbientSound = char._lastAmbientSound || 0;
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


// Spawn characters for the current map
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
            def.spawns.forEach((spawn, spawnIdx) => {
                if (spawn.map === mapIndex) {
                    const enemy = new Enemy(
                        spawn.x,
                        spawn.y,
                        def.sprite,
                        def
                    );
                    enemy.typeId = def.id;
                    enemy.wanderArea = spawn.wanderArea;
                    enemy.health = def.maxHealth;
                    enemy._spawnIndex = spawnIdx;
                    enemy._spawnInfo = spawn;
                    characters.push(enemy);
                }
            });
        }
    });
    // Patch forced encounters for all NPCs just spawned
    if (typeof patchForcedEncounters === "function") {
        patchForcedEncounters();
    }
}


// Ambient enemy sound system
function playEnemyAmbientSounds() {
    const now = Date.now();
    const playerX = player.tile.x;
    const playerY = player.tile.y;
    const AMBIENT_RADIUS = 5;
    const MIN_INTERVAL = 10000;
    const CHANCE_PER_TICK = 0.08;

    let nearbyEnemies = characters.filter(char =>
        char.type === "enemy" &&
        Math.abs(char.x - playerX) <= AMBIENT_RADIUS &&
        Math.abs(char.y - playerY) <= AMBIENT_RADIUS
    );

    let maxSounds = Math.max(1, Math.floor(nearbyEnemies.length / 2));
    let soundsPlayed = 0;

    nearbyEnemies.forEach(char => {
        if (soundsPlayed >= maxSounds) return;
        if (now - (char._lastAmbientSound || 0) < MIN_INTERVAL) return;
        if (Math.random() < CHANCE_PER_TICK) {
            const dx = char.x - playerX;
            const dy = char.y - playerY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minVol = 0.2;
            const maxVol = 1.0;
            let volume = maxVol - ((dist / AMBIENT_RADIUS) * (maxVol - minVol));
            volume = Math.max(minVol, Math.min(maxVol, volume));

            // Use cached audio and clone for playback
            const cacheKey = `enemy/${char.typeId}.wav`;
            if (window.sfxCache && window.sfxCache[cacheKey]) {
                const effect = window.sfxCache[cacheKey].cloneNode();
                effect.volume = volume;
                effect.play();
            }
            char._lastAmbientSound = now;
            soundsPlayed++;
        }
    });
}


// Handle enemy death
function handleEnemyDeath(enemy) {
    console.log(`[Npc] ${enemy.typeId} died at (${enemy.x}, ${enemy.y})`);

    // Remove enemy from characters array immediately
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
                console.log(`[Npc] ${amt}x ${ITEM_DEFINITIONS[drop.item].name} Rewarded to player`);
            }
        });
    }

    // Quest progress
    if (typeof QUEST_DEFINITIONS !== "undefined" && typeof playerQuests !== "undefined") {
        Object.values(QUEST_DEFINITIONS).forEach(q => {
            if (
                q.type === "enemyDefeat" &&
                q.enemyId === enemy.typeId &&
                playerQuests.active.includes(q.id)
            ) {
                playerQuestProgress[q.id] = (playerQuestProgress[q.id] || 0) + 1;
                console.log(`[Quest] EnemyDefeat: Matched quest ${q.id}, enemy.typeId=${enemy.typeId}, progress=${playerQuestProgress[q.id]}`);
                if (typeof updateQuestHUD === "function") updateQuestHUD();
            }
        });
    }

    // Respawn enemy after cooldown at its original spawn
    setTimeout(() => {
        respawnEnemy(enemy.id, enemy._spawnIndex);
    }, 8000); // 8 seconds respawn
}


// Respawn enemy at its original spawn point
function respawnEnemy(enemyId, spawnIdx) {
    const def = ENEMY_TYPES[enemyId];
    if (!def || !def.spawns || spawnIdx == null) return;
    const spawnInfo = def.spawns[spawnIdx];
    if (!spawnInfo) return;
    const newEnemy = new Enemy(
        spawnInfo.x,
        spawnInfo.y,
        def.sprite,
        def
    );
    newEnemy.typeId = def.id; 
    newEnemy.wanderArea = spawnInfo.wanderArea;
    newEnemy.health = def.maxHealth;
    newEnemy._spawnIndex = spawnIdx;
    newEnemy._spawnInfo = spawnInfo;
    characters.push(newEnemy);
    console.log(`[Enemy Respawn] ${def.name} respawned at (${spawnInfo.x}, ${spawnInfo.y})`);
    console.log("Characters count:", characters.length);
}