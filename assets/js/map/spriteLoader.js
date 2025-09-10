//Modular Sprite Sheet Loader

const _worldSpriteImages = {};
let activeWorldSprites = [];


function isTileBlockedByWorldSprite(tileX, tileY) {
    return activeWorldSprites.some(s => {
        if (!s.collision) return false;
        const tilesWide = Math.ceil(s.frameW / config.size.tile);
        const tilesTall = Math.ceil(s.frameH / config.size.tile);

        if (s.zIndex === 0) {
            // Anchor collision to the bottom of the sprite (base at s.x, s.y)
            for (let dx = 0; dx < tilesWide; dx++) {
                for (let dy = 0; dy < tilesTall; dy++) {
                    // dy = 0 is the bottom row, dy = tilesTall-1 is the top
                    if (tileX === s.x + dx && tileY === s.y - dy) {
                        return true;
                    }
                }
            }
        } else {
            // Above player: block only the bottom row
            if (tileY === s.y) {
                for (let dx = 0; dx < tilesWide; dx++) {
                    if (tileX === s.x + dx) {
                        return true;
                    }
                }
            }
        }
        return false;
    });
}


function spawnWorldSpritesForMap(mapIndex) {
    activeWorldSprites = [];
    WORLD_SPRITES.forEach(s => {
        const positions = s.positions || [];
        positions.forEach(pos => {
            if (pos.map === mapIndex) {
                let sprite = Object.assign({}, s, pos);
                if (!_worldSpriteImages[s.spriteSheet]) {
                    const img = new Image();
                    img.src = s.spriteSheet;
                    _worldSpriteImages[s.spriteSheet] = img;
                }
                sprite._frame = 0;
                sprite._animTick = 0;
                sprite.frameW = Math.floor(s.imageW / s.cols);
                sprite.frameH = Math.floor(s.imageH / s.rows);
                sprite.frames = s.cols * s.rows;
                activeWorldSprites.push(sprite);
            }
        });
    });
}

function drawWorldSprites(zIndex) {
    activeWorldSprites.forEach(s => {
        if (typeof zIndex !== "undefined" && s.zIndex !== zIndex) return;

        // Animate frame only if more than one frame
        if (s.frames > 1) {
            s._animTick = (s._animTick || 0) + 1;
            if (s._animTick % (s.animSpeed || 8) === 0) {
                s._frame = ((s._frame || 0) + 1) % s.frames;
            }
        } else {
            s._frame = 0;
        }

        const img = _worldSpriteImages[s.spriteSheet];
        if (!img || !img.complete) return;

        // Calculate frame position in sheet (supports single frame)
        const frameIndex = s._frame || 0;
        const col = s.frames > 1 ? frameIndex % s.cols : 0;
        const row = s.frames > 1 ? Math.floor(frameIndex / s.cols) : 0;

        const sx = col * s.frameW;
        const sy = row * s.frameH;

        // Align base of sprite to (x, y) tile
        const px = Math.floor(s.x * config.size.tile - viewport.x);
        const py = Math.floor(s.y * config.size.tile - viewport.y - (s.frameH - config.size.tile));

        context.drawImage(
            img,
            sx, sy, s.frameW, s.frameH,
            px, py, s.frameW, s.frameH
        );
    });
}