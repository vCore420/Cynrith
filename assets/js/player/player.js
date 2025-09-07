// Main player logic

let playerAnimating = false;
let footstepToggle = false;


// Check for Player at the teleport stones
function isPlayerAdjacentToTeleportStone() {
    return activeTeleportStones.some(stone =>
        (Math.abs(player.tile.x - stone.x) === 1 && player.tile.y === stone.y) ||
        (Math.abs(player.tile.y - stone.y) === 1 && player.tile.x === stone.x)
    );
}

function getTotalXpGainModifier() {
    let modifier = 0;
    equippedSkills.forEach(skillId => {
        if (!skillId) return;
        const skillDef = getSkillDef(skillId);
        const playerSkill = getPlayerSkill(skillId);
        if (!skillDef || !playerSkill) return;
        modifier += (skillDef.buffs.xpGain || 0) + (playerSkill.level * 2);
        modifier += (skillDef.drawbacks.xpGain || 0) - playerSkill.level;
    });
    return modifier;
}

function isNpcPixelCollision(npc, px, py) {
    // px, py = player's pixel position
    const npcPx = npc.x * config.size.tile;
    const npcPy = npc.y * config.size.tile;
    const npcSize = config.size.char;
    const playerSize = config.size.char;

    // Add padding to shrink the collision area
    const padding = 18; // Try 8, 12, or 16 pixels for best feel

    return (
        px + playerSize - padding > npcPx + padding &&
        px + padding < npcPx + npcSize - padding &&
        py + playerSize - padding > npcPy + padding &&
        py + padding < npcPy + npcSize - padding
    );
}

// Player collision Logic, check collision at a tile (for all layers)
function isTileBlockedAtPixel(px, py, direction) {
    const tileSize = config.size.tile;
    const spriteSize = config.size.char;
    const offset = (spriteSize - tileSize) / 2;

    const tileX = Math.floor((px + offset + tileSize / 2) / tileSize);
    let tileY;
    
    if (direction === "up") {
        tileY = Math.floor((py + offset + 32) / tileSize);
    } else if (direction === "down") {
        tileY = Math.floor((py + offset + tileSize - 2) / tileSize);
    } else {
        tileY = Math.floor((py + offset + tileSize / 2) / tileSize);
    }

    if (
        tileY < 0 || tileX < 0 ||
        !map.data.layout ||
        !map.data.layout[tileY] ||
        typeof map.data.layout[tileY][tileX] === "undefined"
    ) {
        return true;
    }

    if (typeof characters !== "undefined") {
        if (characters.some(char =>
            char.type !== "player" &&
            isNpcPixelCollision(char, px, py)
        )) {
            return true;
        }
    }

    if (activeTeleportStones.some(stone => stone.x === tileX && stone.y === tileY)) {
        return true; 
    }

    if (typeof isTileBlockedByWorldSprite === "function" && isTileBlockedByWorldSprite(tileX, tileY)) {
        return true;
    }

    if (typeof isTileBlockedByInteractable === "function" && isTileBlockedByInteractable(tileX, tileY)) {
        return true;
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

// Stops movement controls for player
// function clearAllMovementKeys() {
//    for (let key in keys) {
//        if (keys.hasOwnProperty(key)) {
//            keys[key].a = false;
//       }
//    }
//}

// Player definition 
const Player = function(tile_x, tile_y, spriteFile = "assets/img/char/hero.png") {
    this.timer = setInterval(() => player.frame(), 125);
    this.frames = [0.40, 0.42, 0.44, 0.46, 0.48, 0.50, 0.48, 0.46, 0.44, 0.42, 0.40];
    this.frozen = false;

    this.sprite = new Image();
    this.sprite.src = spriteFile;

    // Base Player stats
    this.maxHealth = 100;
    this.health = 100;
    this.xp = 0;
    this.attack = 5;
    this.defence = 5;
    this.attackSpeed = 5;
    this.lastAttackTime = 0;
   
    // Helper to get attacks per second from attackSpeed stat
    Player.prototype.getAttacksPerSecond = function() {
        // Capped at 10 attacks per second
        return Math.min(1 + this.attackSpeed * 0.002, 10);
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

// Draw Player
Player.prototype = {
    draw: function() {
        let frame = (player.movement.moving) ? keys[player.movement.key].f[player.movement.frame] : keys[player.movement.key].f[1];
        let pos_x = Math.round(player.pos.x - viewport.x);
        let pos_y = Math.round(player.pos.y - viewport.y);

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

        // Play footstep sound every 3rd frame for a quicker, but not too fast, rhythm
        if (this.movement.moving) {
            footstepFrameCounter++;
            // Play on frames 0 and 2 of every 3-frame cycle (e.g. frames 0, 3, 6, ...)
            if (footstepFrameCounter % 3 === 0) {
                playFootstepSoundForCurrentTile();
            }
            if (footstepFrameCounter > 1000) footstepFrameCounter = 0; // Prevent overflow
        } else {
            footstepFrameCounter = 0; // Reset when not moving
        }

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

        // Calculate new pixel positions
        let newPosX = this.pos.x + x;
        let newPosY = this.pos.y + y;

        // Determine direction for X and Y movement
        let directionX = x < 0 ? "left" : x > 0 ? "right" : null;
        let directionY = y < 0 ? "up" : y > 0 ? "down" : null;

        // X movement
        // Only move if the new position's collision box is not blocked
        if (directionX && !isTileBlockedAtPixel(newPosX, this.pos.y, directionX)) {
            this.pos.x = newPosX;
            const tileSize = config.size.tile;
            const spriteSize = config.size.char;
            const offset = (spriteSize - tileSize) / 2;
            this.tile.x = Math.floor((this.pos.x + offset + tileSize / 2) / tileSize);
        }

        // Y movement
        if (directionY && !isTileBlockedAtPixel(this.pos.x, newPosY, directionY)) {
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
        updatePlayerBaseStats();
    },
    addAttackSpeed: function(val) {
        this.setAttackSpeed(this.attackSpeed + val);
        updatePlayerBaseStats();
    },
    attackEnemy: function() {
        const now = Date.now();
        const attacksPerSecond = this.getAttacksPerSecond();
        const cooldown = 1000 / attacksPerSecond;
        if (now - this.lastAttackTime < cooldown) return; 

        this.lastAttackTime = now;

        // Only allow attack if player has a basic sword
        const hasSword = inventory.some(item => item && typeof item.id === "string" && item.id.endsWith("_sword"));
        if (!hasSword) return;

        // Play sword slash sound effect
        if (window.SoundManager) {
            SoundManager.playEffect("assets/sound/sfx/player/sword_slash.mp3");
        }

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

        let hitEnemy = false;

        // Attack any enemy on target tiles
        characters.forEach(char => {
            if (char.type === "enemy" && char.health > 0) {
                let isTarget = targetTiles.some(t =>
                    Math.round(char.x) === t.x && Math.round(char.y) === t.y
                );
                if (isTarget) {
                    hitEnemy = true;
                    let dmg = Math.max(1, this.attack - char.defense);
                    char.health -= dmg;
                    showDamagePopup(Math.round(char.x), Math.round(char.y), dmg, "enemy");
                    if (char.health <= 0) {
                        handleEnemyDeath(char);
                    }
                }
            }
        });

        // Play sword hit sound if an enemy was hit
        if (hitEnemy && window.SoundManager) {
            SoundManager.playEffect("assets/sound/sfx/player/sword_hit.mp3");
        }
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
    setHealth: function(val) { this.health = Math.max(0, Math.min(val, this.maxHealth)); updatePlayerBaseStats(); },
    
    addHealth: function(val) { this.setHealth(this.health + val); updatePlayerBaseStats(); },

    getMaxHealth: function() { return this.maxHealth; },
    setMaxHealth: function(val) { this.maxHealth = Math.max(1, val); updatePlayerBaseStats(); },
    addMaxHealth: function(val) { this.setMaxHealth(this.maxHealth + val); updatePlayerBaseStats(); },

    getXP: function() { return this.xp; },
    addXP: function(val) {
        let xpModifier = getTotalXpGainModifier();
        let finalXP = val + xpModifier;
        this.xp += Math.max(0, finalXP);
        console.log(`[Player] Player gained ${val} XP, total: ${this.xp}`);
        if (typeof QUEST_DEFINITIONS !== "undefined" && typeof playerQuests !== "undefined") {
            Object.values(QUEST_DEFINITIONS).forEach(q => {
                if (q.type === "statBuild" && q.stat === "xp" && playerQuests.active.includes(q.id)) {
                    if (typeof statBuildQuestStart !== "undefined") {
                        const gained = this.xp - (statBuildQuestStart[q.id] || 0);
                        playerQuestProgress[q.id] = Math.max(0, gained);
                        if (typeof updateQuestHUD === "function") updateQuestHUD();
                    }
                }
            });
        }
        updatePlayerBaseStats();
    },

    getAttack: function() { return this.attack; },
    setAttack: function(val) { this.attack = val; updatePlayerBaseStats(); },
    addAttack: function(val) {
        this.attack += val;
        console.log(`[Player] Player attack increased by ${val}, total: ${this.attack}`);
        if (typeof QUEST_DEFINITIONS !== "undefined" && typeof playerQuests !== "undefined") {
            Object.values(QUEST_DEFINITIONS).forEach(q => {
                if (q.type === "statBuild" && q.stat === "attack" && playerQuests.active.includes(q.id)) {
                    if (typeof statBuildQuestStart !== "undefined") {
                        const gained = this.attack - (statBuildQuestStart[q.id] || 0);
                        playerQuestProgress[q.id] = Math.max(0, gained);
                        if (typeof updateQuestHUD === "function") updateQuestHUD();
                    }
                }
            });
        }
        updatePlayerBaseStats();
    },

    getDefence: function() { return this.defence; },
    setDefence: function(val) { this.defence = val; updatePlayerBaseStats(); },
    addDefence: function(val) {
        this.defence += val;
        console.log(`[Player] Player defence increased by ${val}, total: ${this.defence}`);
        if (typeof QUEST_DEFINITIONS !== "undefined" && typeof playerQuests !== "undefined") {
            Object.values(QUEST_DEFINITIONS).forEach(q => {
                if (q.type === "statBuild" && q.stat === "defence" && playerQuests.active.includes(q.id)) {
                    if (typeof statBuildQuestStart !== "undefined") {
                        const gained = this.defence - (statBuildQuestStart[q.id] || 0);
                        playerQuestProgress[q.id] = Math.max(0, gained);
                        if (typeof updateQuestHUD === "function") updateQuestHUD();
                    }
                }
            });
        }
        updatePlayerBaseStats();
    },
    
    getAttackSpeed: function() { return this.attackSpeed; },
    setAttackSpeed: function(val) {
        const max = 5000;
        if (val > max) {
            notify("Attack Speed is Maxed Out!", 2000);
            this.attackSpeed = max;
        } else {
            this.attackSpeed = Math.max(0, val);
        }
        updatePlayerBaseStats();
    },
    addAttackSpeed: function(val) {
        this.setAttackSpeed(this.attackSpeed + val);
        console.log(`[Player] Player attack speed increased by ${val}, total: ${this.attackSpeed}`);
        // StatBuild quest progress update
        if (typeof QUEST_DEFINITIONS !== "undefined" && typeof playerQuests !== "undefined") {
            Object.values(QUEST_DEFINITIONS).forEach(q => {
                if (q.type === "statBuild" && q.stat === "attackSpeed" && playerQuests.active.includes(q.id)) {
                    if (typeof statBuildQuestStart !== "undefined") {
                        const gained = this.attackSpeed - (statBuildQuestStart[q.id] || 0);
                        playerQuestProgress[q.id] = Math.max(0, gained);
                        if (typeof updateQuestHUD === "function") updateQuestHUD();
                    }
                }
            });
        }
        updatePlayerBaseStats();
    }
};