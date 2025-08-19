// Viewport Management

let frozenViewportX = null;
let frozenViewportY = null;

// Viewport definition
const Viewport = function(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
};

// Draw Viewport
Viewport.prototype = {
    center: function() {
        if (typeof playerAnimating !== "undefined" && playerAnimating) {
            // Keep viewport at frozen position, used for player combat animations
            if (frozenViewportX !== null && frozenViewportY !== null) {
                viewport.x = frozenViewportX;
                viewport.y = frozenViewportY;
            }
            return;
        }
        
        let move_x = 0;
        let move_y = 0;

        let center_x = player.pos.x + (config.size.char / 2);
        let center_y = player.pos.y + (config.size.char / 2);

        for (let key in keys) {
            if (keys[key].a) {
                if (keys[key].x != 0) {
                    move_x = keys[key].x;
                }

                if (keys[key].y != 0) {
                    move_y = keys[key].y;
                }
            }
        }

        player.move(move_x, move_y);
        viewport.scroll(center_x, center_y);
    },
    scroll: function(x, y) {
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        this.x = x - (screenW / 2);
        this.y = y - (screenH / 2);
    }
};
