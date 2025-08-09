//Modular Sprite Sheet Loader

const _worldSpriteImages = {};
let activeWorldSprites = [];


function isTileBlockedByWorldSprite(tileX, tileY) {
    return activeWorldSprites.some(s => {
        if (!s.collision) return false;
        // Calculate how many tiles wide the sprite is
        const tilesWide = Math.ceil(s.frameW / config.size.tile);
        // The bottom row of the sprite starts at s.y and spans tilesWide
        for (let dx = 0; dx < tilesWide; dx++) {
            if (tileX === s.x + dx && tileY === s.y) {
                return true;
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

        // Animate frame
        s._animTick = (s._animTick || 0) + 1;
        if (s._animTick % (s.animSpeed || 8) === 0) {
            s._frame = ((s._frame || 0) + 1) % s.frames;
        }

        const img = _worldSpriteImages[s.spriteSheet];
        if (!img || !img.complete) return;

        // Calculate frame position in sheet (supports vertical or horizontal)
        const frameIndex = s._frame;
        const col = frameIndex % s.cols;
        const row = Math.floor(frameIndex / s.cols);

        const sx = col * s.frameW;
        const sy = row * s.frameH;

        // How many tiles does this frame cover?
        const tilesWide = Math.ceil(s.frameW / config.size.tile);
        const tilesTall = Math.ceil(s.frameH / config.size.tile);

        // Align base of sprite to (x, y) tile
        const px = Math.round(
            s.x * config.size.tile
            - viewport.x
            + (config.win.width / 2)
            - (viewport.w / 2)
        );
        const py = Math.round(
            (s.y * config.size.tile)
            - viewport.y
            + (config.win.height / 2)
            - (viewport.h / 2)
            - (s.frameH - config.size.tile)
        );

        context.drawImage(
            img,
            sx, sy, s.frameW, s.frameH,
            px, py, s.frameW, s.frameH
        );
    });
}