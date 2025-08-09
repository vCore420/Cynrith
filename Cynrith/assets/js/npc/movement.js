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


// Check collision at a pixel position for NPCs/Enemies
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

    if (activeTeleportStones.some(stone => stone.x === tileX && stone.y === tileY)) {
        return true; 
    }

    if (typeof isTileBlockedByWorldSprite === "function" && isTileBlockedByWorldSprite(tileX, tileY)) {
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


// Check collision for a tile position
function isWalkable(tileX, tileY) {
    
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

        let movedX = false, movedY = false;

        // Move towards destination
        if (Math.abs(dx) > 0.01) {
            let tryMoveX = char.x + Math.sign(dx) * Math.min(Math.abs(dx), speed / config.size.tile);
            let px = tryMoveX * config.size.tile;
            let py = char.y * config.size.tile;
            if (!isNpcTileBlockedAtPixel(px, py, dx > 0 ? "right" : dx < 0 ? "left" : "down")) {
                char.x = tryMoveX;
                movedX = true;
            }
        }
        if (Math.abs(dy) > 0.01) {
            let tryMoveY = char.y + Math.sign(dy) * Math.min(Math.abs(dy), speed / config.size.tile);
            let px = char.x * config.size.tile;
            let py = tryMoveY * config.size.tile;
            if (!isNpcTileBlockedAtPixel(px, py, dy < 0 ? "up" : "down")) {
                char.y = tryMoveY;
                movedY = true;
            }
        }

        char.movement.moving = movedX || movedY;

        // If stuck (can't move in either direction), cancel wander and pause
        if ((!movedX && Math.abs(dx) > 0.01) || (!movedY && Math.abs(dy) > 0.01)) {
            char.wanderState.moving = false;
            char.movement.moving = false;
            char.wanderState.pauseTimer = Math.floor(Math.random() * 20) + 10; // Pause before next move
            return;
        }

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


// Update all NPCs and Enemies
function updateCharacters() {
    characters.forEach(char => {
        if (char.type === "enemy") {
            const dist = Math.abs(player.tile.x - char.x) + Math.abs(player.tile.y - char.y);
            if (dist <= char.distance) {
                char.state = "hostile";
                // Pathfinding logic
                if (!char.path || char.path.length === 0 || char._lastPlayerTile?.x !== player.tile.x || char._lastPlayerTile?.y !== player.tile.y) {
                    char.path = findPathAStar(
                        {x: Math.round(char.x), y: Math.round(char.y)},
                        {x: player.tile.x, y: player.tile.y},
                        isWalkable
                    );
                    char._lastPlayerTile = {x: player.tile.x, y: player.tile.y};
                }
                if (char.path && char.path.length > 1) {
                    const next = char.path[1];
                    const dx = next.x - char.x;
                    const dy = next.y - char.y;
                    
                    if (dx !== 0 && dy !== 0) {
                        char.movement.key = dx > 0 ? 39 : 37; 
                    } else {
                        char.movement.key = getDirectionKey(char.x, char.y, next.x, next.y);
                    }
                    moveEnemyTowardTile(char, next.x, next.y);
                    if (Math.abs(char.x - next.x) < 0.1 && Math.abs(char.y - next.y) < 0.1) {
                        char.path.shift();
                    }
                }
                // Attack if on same tile - add a very short delay before their attack on the player
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
    if (dx !== 0 && dy !== 0) {
        if (isWalkable(Math.round(char.x + Math.sign(dx)), Math.round(char.y + Math.sign(dy)))) {
            char.x += stepX;
            char.y += stepY;
        } else if (isWalkable(Math.round(char.x + Math.sign(dx)), Math.round(char.y))) {
            char.x += stepX;
        } else if (isWalkable(Math.round(char.x), Math.round(char.y + Math.sign(dy)))) {
            char.y += stepY;
        }
    } else if (dx !== 0 && isWalkable(Math.round(char.x + Math.sign(dx)), Math.round(char.y))) {
        char.x += stepX;
    } else if (dy !== 0 && isWalkable(Math.round(char.x), Math.round(char.y + Math.sign(dy)))) {
        char.y += stepY;
    }
    char.movement.moving = true;
}
