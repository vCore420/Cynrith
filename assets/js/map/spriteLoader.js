//Modular Sprite Sheet Loader

const _worldSpriteImages = {};
window._worldSpriteImages = _worldSpriteImages;
var activeWorldSprites = [];
window.activeWorldSprites = activeWorldSprites;


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
        if (!img) return;

        // Calculate frame position in sheet (supports single frame)
        const frameIndex = s._frame || 0;
        const col = s.frames > 1 ? frameIndex % s.cols : 0;
        const row = s.frames > 1 ? Math.floor(frameIndex / s.cols) : 0;

        const sx = col * s.frameW;
        const sy = row * s.frameH;

        // Align base of sprite to (x, y) tile
        const px = Math.floor(s.x * config.size.tile - viewport.x);
        const offsetY = s.zIndex === 1 ? -16 : 0;
        const py = Math.floor(s.y * config.size.tile - viewport.y - (s.frameH - config.size.tile) + offsetY);

        const scaledW = s.frameW * (s.scale || 1);
        const scaledH = s.frameH * (s.scale || 1);
        const centerOffsetX = (s.frameW - scaledW) / 2;
        const centerOffsetY = (s.frameH - scaledH) / 2;

        context.globalAlpha = s.opacity || 1;
        context.drawImage(
            img,
            sx, sy, s.frameW, s.frameH,
            px + centerOffsetX, py + centerOffsetY, scaledW, scaledH
        );
        context.globalAlpha = 1;
    });
}

function updateTemporarySprites() {
    for (let i = activeWorldSprites.length - 1; i >= 0; i--) {
        const s = activeWorldSprites[i];
        if (s.temporary) {
            s.duration--;
            if (s.duration <= 0) {
                activeWorldSprites.splice(i, 1);
                continue;
            }
            // Update scale and opacity
            const progress = 1 - (s.duration / s.totalDuration);
            s.scale = 0.5 + progress * 0.5;
            s.opacity = 1 - progress; // fade from 1 to 0
        }
    }
}