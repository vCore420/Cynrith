// NPC and Enemy system

// Unique ID counter for all characters
let characterIdCounter = 1;

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

    // Prevent sprite property from being overwritten by customData
    const { sprite, ...rest } = customData;
    Object.assign(this, rest); // Attach custom data (dialogue, stats, etc.)
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
    if (
        tileY < 0 || tileY >= map.data.layout.length ||
        tileX < 0 || tileX >= map.data.layout[0].length
    ) return false;
    const tileIndex = map.data.layout[tileY][tileX] - 1;
    return !map.data.assets[tileIndex].collision;
}

// AI: Wander within a defined area
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
            char.movement.frame = (char.movement.frame + 1) % 4;
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
        if (!char.movement) {
            // Default facing down, standing
            char.movement = { moving: false, key: 40, frame: 1 };
        }
        wanderAI(char);
    });
}

// List to hold all characters
const characters = [];

// Draw all NPCs and Enemies
function drawCharacters() {
    characters.forEach(char => {
        // Use the same frame logic as the player
        let frame = 1; // Default to standing frame
        if (char.movement && char.movement.moving && char.movement.key && keys[char.movement.key]) {
            frame = keys[char.movement.key].f[char.movement.frame || 1];
        } else if (char.movement && char.movement.key && keys[char.movement.key]) {
            frame = keys[char.movement.key].f[1];
        }

        let px = Math.round(char.x * config.size.tile - viewport.x + (config.win.width / 2) - (viewport.w / 2));
        let py = Math.round(char.y * config.size.tile - viewport.y + (config.win.height / 2) - (viewport.h / 2));
        context.drawImage(
            char.sprite,
            frame * config.size.char, // Use same frame width as player
            0,
            config.size.char,
            config.size.char,
            px,
            py,
            config.size.char,
            config.size.char
        );
    });
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