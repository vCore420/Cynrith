// Npc Movement and Collision logic

// Get random direction
function randomDirection() {
    const dirs = [37, 38, 39, 40];
    return dirs[Math.floor(Math.random() * dirs.length)];
}


// Helper to get direction key to face the player
function getDirectionKey(fromX, fromY, toX, toY) {
    const dx = toX - fromX;
    const dy = toY - fromY;
    if (Math.abs(dx) > Math.abs(dy)) {
        return dx > 0 ? 39 : 37; // right : left
    } else if (Math.abs(dy) > 0) {
        return dy > 0 ? 40 : 38; // down : up
    }
    return 40; // default down
}


// Get direction key to face the player
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

function getDirectionKeyFromName(direction) {
    switch (direction) {
        case "left": return 37;
        case "up": return 38;
        case "right": return 39;
        case "down": return 40;
        default: return 40;
    }
}

function isNpcCharacterCollisionAtPixel(px, py, npcObj) {
    if (typeof characters === "undefined") return false;

    const npcBounds = getCharBounds(npcObj || {}, px, py);

    return characters.some(char => {
        if (!char || char === npcObj) return false;

        const otherBounds = getCharBounds(char);
        const pad = Math.max(npcBounds.padding, otherBounds.padding);

        return (
            otherBounds.right - pad > npcBounds.left + pad &&
            otherBounds.left + pad < npcBounds.right - pad &&
            otherBounds.bottom - pad > npcBounds.top + pad &&
            otherBounds.top + pad < npcBounds.bottom - pad
        );
    });
}

function tryMoveNpcStep(char, stepX, stepY, direction) {
    const nextX = char.x + stepX;
    const nextY = char.y + stepY;
    const px = nextX * config.size.tile;
    const py = nextY * config.size.tile;

    if (isNpcTileBlockedAtPixel(px, py, direction, char)) {
        return false;
    }

    char.x = nextX;
    char.y = nextY;
    char.movement.key = getDirectionKeyFromName(direction);
    return true;
}


// Move enemy toward player
function moveEnemyTowardPlayer(char) {
    const speed = char.moveSpeed || 2;
    const step = speed / config.size.tile;

    const dx = player.tile.x - Math.round(char.x);
    const dy = player.tile.y - Math.round(char.y);

    let moved = false;
    const attempts = [];

    if (Math.abs(dx) >= Math.abs(dy)) {
        if (dx !== 0) {
            attempts.push({
                stepX: Math.sign(dx) * step,
                stepY: 0,
                direction: dx > 0 ? "right" : "left"
            });
        }

        if (dy !== 0) {
            attempts.push({
                stepX: 0,
                stepY: Math.sign(dy) * step,
                direction: dy > 0 ? "down" : "up"
            });
        }

        attempts.push({ stepX: 0, stepY: -step, direction: "up" });
        attempts.push({ stepX: 0, stepY: step, direction: "down" });
    } else {
        if (dy !== 0) {
            attempts.push({
                stepX: 0,
                stepY: Math.sign(dy) * step,
                direction: dy > 0 ? "down" : "up"
            });
        }

        if (dx !== 0) {
            attempts.push({
                stepX: Math.sign(dx) * step,
                stepY: 0,
                direction: dx > 0 ? "right" : "left"
            });
        }

        attempts.push({ stepX: -step, stepY: 0, direction: "left" });
        attempts.push({ stepX: step, stepY: 0, direction: "right" });
    }

    for (const attempt of attempts) {
        if (tryMoveNpcStep(char, attempt.stepX, attempt.stepY, attempt.direction)) {
            moved = true;
            break;
        }
    }

    if (!moved) {
        char.movement.key = getDirectionToFace(char, player);
    }

    char.movement.moving = moved;
}


// Check collision at a pixel position for NPCs/Enemies
function isNpcTileBlockedAtPixel(px, py, direction, npcObj = null) {
    const tileSize = config.size.tile;
    const spriteSize = config.size.char;
    const offset = (spriteSize - tileSize) / 2;

    const tileX = Math.floor((px + offset + tileSize / 2) / tileSize);
    let tileY;

    if (direction === "up") {
        tileY = Math.floor((py + offset) / tileSize);
    } else if (direction === "down") {
        tileY = Math.floor((py + offset + tileSize - 2) / tileSize);
    } else {
        tileY = Math.floor((py + offset + tileSize / 2) / tileSize);
    }

    if (
        tileX < 0 || tileY < 0 ||
        tileY >= map.height || tileX >= map.width ||
        !map.data.layout ||
        !map.data.layout[tileY] ||
        typeof map.data.layout[tileY][tileX] === "undefined"
    ) {
        return true;
    }

    if (typeof player !== "undefined") {
        if (isPlayerPixelCollision(px, py, npcObj || {})) {
            return true;
        }
    }

    if (isNpcCharacterCollisionAtPixel(px, py, npcObj || {})) {
        return true;
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

    if (typeof isTileBlockedByHomePlacement === "function" && isTileBlockedByHomePlacement(tileX, tileY)) {
        return true;
    }

    if (map.data._layers) {
        for (let l = 0; l < map.data._layers.length; l++) {
            const gid = map.data._layers[l][tileY][tileX];
            if (gid > 0) {
                const tileIndex = map.data._gidMap ? map.data._gidMap[gid] : gid - 1;
                if (tileIndex !== null && map.data.assets[tileIndex] && map.data.assets[tileIndex].collision) {
                    return true;
                }
            }
        }
        return false;
    } else {
        const tileGid = map.data.layout[tileY][tileX];
        const tileIndex = tileGid > 0 ? tileGid - 1 : null;
        return tileIndex !== null && map.data.assets[tileIndex] && map.data.assets[tileIndex].collision;
    }
}

function isPlayerPixelCollision(npcPx, npcPy, npcObj) {
    const npcBounds = getCharBounds(npcObj || {}, npcPx, npcPy);
    const playerBounds = {
        left: player.pos.x,
        right: player.pos.x + config.size.char,
        top: player.pos.y,
        bottom: player.pos.y + config.size.char
    };
    const pad = npcBounds.padding;
    return (
        playerBounds.right - pad > npcBounds.left + pad &&
        playerBounds.left + pad < npcBounds.right - pad &&
        playerBounds.bottom - pad > npcBounds.top + pad &&
        playerBounds.top + pad < npcBounds.bottom - pad
    );
}


// Check collision for a tile position
function isWalkable(tileX, tileY) {
    // Prevent out-of-bounds errors
    if (
        tileX < 0 || tileY < 0 ||
        !map || !map.data || !map.data.layout ||
        tileY >= map.height || tileX >= map.width ||
        !map.data.layout[tileY] ||
        typeof map.data.layout[tileY][tileX] === "undefined"
    ) {
        return false;
    }

    // Block if world sprite collision
    if (typeof isTileBlockedByWorldSprite === "function" && isTileBlockedByWorldSprite(tileX, tileY)) {
        return false;
    }
    
    // Block if teleport stone collision
    if (activeTeleportStones && activeTeleportStones.some(stone => stone.x === tileX && stone.y === tileY)) {
        return false;
    }

    // Layered map collision check
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
        // Legacy map collision check
        const tileGid = map.data.layout[tileY][tileX];
        let tileIndex = tileGid > 0 ? tileGid - 1 : null;
        return tileIndex === null || !map.data.assets[tileIndex].collision;
    }
}


// Npc Wondering Logic
function wanderAI(char) {
    if (char.forcedEncounterInProgress || char.forcedWalking) { console.log("Blocked: forced"); return; }
    if (char.isInteracting) { console.log("Blocked: interacting"); return; }
    if (!char.wanderArea) { console.log("Blocked: no wanderArea", char); return; }

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

        let movedX = false, movedY = false;

        if (Math.abs(dx) > 0.01) {
            let tryMoveX = char.x + Math.sign(dx) * Math.min(Math.abs(dx), speed / config.size.tile);
            let px = tryMoveX * config.size.tile;
            let py = char.y * config.size.tile;
            if (!isNpcTileBlockedAtPixel(px, py, dx > 0 ? "right" : "left", char)) {
                char.x = tryMoveX;
                movedX = true;
            }
        }
        if (Math.abs(dy) > 0.01) {
            let tryMoveY = char.y + Math.sign(dy) * Math.min(Math.abs(dy), speed / config.size.tile);
            let px = char.x * config.size.tile;
            let py = tryMoveY * config.size.tile;
            if (!isNpcTileBlockedAtPixel(px, py, dy < 0 ? "up" : "down", char)) {
                char.y = tryMoveY;
                movedY = true;
            }
        }

        char.movement.moving = movedX || movedY;

        if ((!movedX && Math.abs(dx) > 0.01) || (!movedY && Math.abs(dy) > 0.01)) {
            char.wanderState.moving = false;
            char.movement.moving = false;
            char.wanderState.pauseTimer = Math.floor(Math.random() * 20) + 10;
            return;
        }

        if (Math.abs(dx) <= 0.01 && Math.abs(dy) <= 0.01) {
            char.x = char.wanderState.destX;
            char.y = char.wanderState.destY;
            char.wanderState.moving = false;
            char.movement.moving = false;
            char.wanderState.pauseTimer = Math.floor(Math.random() * 20) + 10;
        }
        return;
    }

    if (char.wanderState.pauseTimer > 0) {
        char.movement.moving = false;
        char.wanderState.pauseTimer--;
        return;
    }

    if (Math.random() < 0.04) {
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


// Find path using A* algorithm
function findPathAStar(start, goal, isWalkable) {
    const openSet = [start];
    const cameFrom = {};
    const gScore = {};
    const fScore = {};
    const key = (x, y) => `${x},${y}`;

    gScore[key(start.x, start.y)] = 0;
    fScore[key(start.x, start.y)] = Math.abs(goal.x - start.x) + Math.abs(goal.y - start.y);

    while (openSet.length > 0) {
        // Get node with lowest fScore
        openSet.sort((a, b) => fScore[key(a.x, a.y)] - fScore[key(b.x, b.y)]);
        const current = openSet.shift();
        if (current.x === goal.x && current.y === goal.y) {
            // Reconstruct path
            let path = [current];
            let currKey = key(current.x, current.y);
            while (cameFrom[currKey]) {
                path.unshift(cameFrom[currKey]);
                currKey = key(cameFrom[currKey].x, cameFrom[currKey].y);
            }
            return path;
        }
        // Explore neighbors
        for (const [dx, dy] of [[0,1],[1,0],[0,-1],[-1,0]]) {
            const nx = current.x + dx, ny = current.y + dy;
            if (!isWalkable(nx, ny)) continue;
            const neighborKey = key(nx, ny);
            const tentativeG = gScore[key(current.x, current.y)] + 1;
            if (gScore[neighborKey] === undefined || tentativeG < gScore[neighborKey]) {
                cameFrom[neighborKey] = current;
                gScore[neighborKey] = tentativeG;
                fScore[neighborKey] = tentativeG + Math.abs(goal.x - nx) + Math.abs(goal.y - ny);
                if (!openSet.some(n => n.x === nx && n.y === ny)) {
                    openSet.push({x: nx, y: ny});
                }
            }
        }
    }
    return null; // No path found
}

function isAdjacentToPlayer(char) {
    const px = player.tile.x;
    const py = player.tile.y;
    const cx = Math.round(char.x);
    const cy = Math.round(char.y);
    // Adjacent horizontally or vertically (not diagonally)
    return (
        (Math.abs(px - cx) === 1 && py === cy) ||
        (Math.abs(py - cy) === 1 && px === cx)
    );
}

// Update all NPCs and Enemies
function updateCharacters() {
    characters.forEach(char => {
        if (char.type === "enemy") {
            const dist = Math.abs(player.tile.x - char.x) + Math.abs(player.tile.y - char.y);
            if (dist <= char.distance) {
                char.state = "hostile";
                // Pathfinding logic
                const now = Date.now();
                if (!char._lastPathUpdate || now - char._lastPathUpdate > 100) {
                    if (!char.path || char.path.length === 0 || char._lastPlayerTile?.x !== player.tile.x || char._lastPlayerTile?.y !== player.tile.y) {
                        char.path = findPathAStar(
                            {x: Math.round(char.x), y: Math.round(char.y)},
                            {x: player.tile.x, y: player.tile.y},
                            isWalkable
                        );
                        char._lastPlayerTile = {x: player.tile.x, y: player.tile.y};
                    }
                    char._lastPathUpdate = now;
                }

                // If adjacent, stop and attack
                if (isAdjacentToPlayer(char)) {
                    char.movement.moving = false;
                    // Face the player
                    char.movement.key = getDirectionToFace(char, player);
                    // Attack logic
                    if (!char._attackTimer || Date.now() - char._attackTimer > 1000 / (char.attackSpeed || 1)) {
                        char._attackTimer = Date.now();
                        let dmg = Math.max(1, char.attack - player.getDefence());
                        player.addHealth(-dmg);
                        showDamagePopup(player.tile.x, player.tile.y, dmg, "player");
                        if (window.SoundManager) {
                            SoundManager.playEffect("assets/sound/sfx/player/player_hit.mp3");
                        }
                        if (player.getHealth() <= 0) handlePlayerDeath();
                        else player.knockbackAnim();
                    }
                } else {
                    // Move toward next tile in path (but don't move onto player's tile)
                    if (char.path && char.path.length > 1) {
                        const next = char.path[1];
                        // Face the next tile
                        char.movement.key = getDirectionKey(char.x, char.y, next.x, next.y);
                        // If next tile is player's tile, don't move
                        if (next.x === player.tile.x && next.y === player.tile.y) {
                            char.movement.moving = false;
                        } else {
                            moveEnemyTowardTile(char, next.x, next.y);
                            if (Math.abs(char.x - next.x) < 0.1 && Math.abs(char.y - next.y) < 0.1) {
                                char.path.shift();
                            }
                        }
                    } else {
                        char.movement.moving = false;
                    }
                }
            } else {
                char.state = "wander";
                char.path = null;
                wanderAI(char);
            }
        } else {
            wanderAI(char);
        }
    });
}


// Move enemy toward player
function moveEnemyTowardTile(char, tx, ty) {
    const speed = char.moveSpeed || 2;
    let dx = tx - char.x;
    let dy = ty - char.y;

    // Normalize for diagonal movement
    let stepX = Math.sign(dx) * Math.min(Math.abs(dx), speed / config.size.tile);
    let stepY = Math.sign(dy) * Math.min(Math.abs(dy), speed / config.size.tile);

    // Try diagonal move first if both dx and dy are nonzero
    let newX = char.x + stepX;
    let newY = char.y + stepY;

    // Check pixel collision with player before moving
    let wouldCollide = isPlayerPixelCollision(newX * config.size.tile, newY * config.size.tile, char);

    if (!wouldCollide) {
        // Try diagonal move
        if (dx !== 0 && dy !== 0 && isWalkable(Math.round(newX), Math.round(newY))) {
            char.x = newX;
            char.y = newY;
        } else if (dx !== 0 && isWalkable(Math.round(newX), Math.round(char.y))) {
            if (!isPlayerPixelCollision(newX * config.size.tile, char.y * config.size.tile)) {
                char.x = newX;
            }
        } else if (dy !== 0 && isWalkable(Math.round(char.x), Math.round(newY))) {
            if (!isPlayerPixelCollision(char.x * config.size.tile, newY * config.size.tile)) {
                char.y = newY;
            }
        }
        char.movement.moving = true;
    } else {
        // Can't move into player, stop
        char.movement.moving = false;
    }
}
