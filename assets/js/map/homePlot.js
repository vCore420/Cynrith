// Home Plot System

const HOME_PLOT_KEY = "home_plot0";

window.homePlot = window.homePlot || {
    version: 1,
    mapKey: HOME_PLOT_KEY,
    mode: "none", // "none" | "place" | "edit"
    selectedItemId: null,
    inventory: {}, // { itemId: count }
    placed: [], // [{ id, itemId, map, x, y, zIndex, _frame, _animTick }]
    preview: {
        tileX: null,
        tileY: null,
        valid: false,
        pointerInside: false,
        lastTouchTileKey: null
    },
    uiOpen: false
};

let homePlotActivePlaced = [];
let homePlotPointerBound = false;
const homePlotImageCache = {}; // spriteSheet -> Image

function isHomePlotMap(mapIndex = currentMapIndex) {
    return String(mapIndex) === HOME_PLOT_KEY;
}

function getHomePlaceableDefs() {
    if (typeof ITEM_DEFINITIONS === "undefined") return [];
    return Object.values(ITEM_DEFINITIONS).filter(def => def && def.homePlaceable && def.homeDef);
}

function getHomeItemDef(itemId) {
    const def = ITEM_DEFINITIONS && ITEM_DEFINITIONS[itemId];
    if (!def || !def.homePlaceable || !def.homeDef) return null;
    return def;
}

function getHomeItemCount(itemId) {
    return Number(window.homePlot.inventory[itemId] || 0);
}

function addHomePlotItem(itemId, amount = 1) {
    if (!getHomeItemDef(itemId)) return false;
    const current = getHomeItemCount(itemId);
    window.homePlot.inventory[itemId] = current + Math.max(1, amount);
    return true;
}

function removeHomePlotItem(itemId, amount = 1) {
    const current = getHomeItemCount(itemId);
    if (current < amount) return false;
    window.homePlot.inventory[itemId] = current - amount;
    if (window.homePlot.inventory[itemId] <= 0) delete window.homePlot.inventory[itemId];
    return true;
}

function buildHomePlacement(itemId, x, y) {
    const def = getHomeItemDef(itemId);
    if (!def) return null;

    return {
        id: "hp_" + Date.now() + "_" + Math.floor(Math.random() * 9999),
        itemId,
        map: HOME_PLOT_KEY,
        x,
        y,
        zIndex: Number(def.homeDef.zIndex || 0),
        _frame: 0,
        _animTick: 0
    };
}

function spawnHomePlacementsForMap(mapIndex) {
    if (!isHomePlotMap(mapIndex)) {
        homePlotActivePlaced = [];
        updateHomePlotHudButtonVisibility();
        return;
    }
    homePlotActivePlaced = window.homePlot.placed.filter(p => String(p.map) === HOME_PLOT_KEY);
    updateHomePlotHudButtonVisibility();
}

function getHomeFootprintTiles(itemDef, x, y) {
    const hw = Number(itemDef.homeDef.footprintW || 1);
    const hh = Number(itemDef.homeDef.footprintH || 1);
    const tiles = [];
    for (let dx = 0; dx < hw; dx++) {
        for (let dy = 0; dy < hh; dy++) {
            tiles.push({ x: x + dx, y: y - dy });
        }
    }
    return tiles;
}

function isTileBlockedByHomePlacement(tileX, tileY) {
    for (let i = 0; i < homePlotActivePlaced.length; i++) {
        const p = homePlotActivePlaced[i];
        const def = getHomeItemDef(p.itemId);
        if (!def || !def.homeDef.collision) continue;

        const fp = getHomeFootprintTiles(def, p.x, p.y);
        if (fp.some(t => t.x === tileX && t.y === tileY)) {
            return true;
        }
    }
    return false;
}

function isMapCollisionTile(tileX, tileY) {
    if (!map || !map.data || !map.data.assets) return false;

    if (map.data._layers) {
        for (let l = 0; l < map.data._layers.length; l++) {
            const layer = map.data._layers[l];
            if (!layer || !layer[tileY] || typeof layer[tileY][tileX] === "undefined") continue;

            const gid = layer[tileY][tileX];
            if (gid <= 0) continue;

            const tileIndex = map.data._gidMap ? map.data._gidMap[gid] : (gid - 1);
            if (tileIndex !== null && map.data.assets[tileIndex] && map.data.assets[tileIndex].collision) {
                return true;
            }
        }
        return false;
    }

    // Legacy single-layer map support
    if (!map.data.layout || !map.data.layout[tileY] || typeof map.data.layout[tileY][tileX] === "undefined") {
        return true;
    }
    const gid = map.data.layout[tileY][tileX];
    const tileIndex = gid > 0 ? gid - 1 : null;
    return tileIndex !== null && map.data.assets[tileIndex] && map.data.assets[tileIndex].collision;
}

function canPlaceHomeItem(itemId, x, y) {
    if (!isHomePlotMap()) return false;
    const def = getHomeItemDef(itemId);
    if (!def) return false;
    if (getHomeItemCount(itemId) < 1) return false;

    if (!map || !map.data || !map.data.layout) return false;
    if (x < 0 || y < 0 || !map.data.layout[y] || typeof map.data.layout[y][x] === "undefined") return false;

    // Do not allow placement on teleport stones
    if (typeof activeTeleportStones !== "undefined" && activeTeleportStones.some(s => s.x === x && s.y === y)) {
        return false;
    }

    const footprint = getHomeFootprintTiles(def, x, y);
    for (let i = 0; i < footprint.length; i++) {
        const t = footprint[i];
        if (t.x < 0 || t.y < 0 || !map.data.layout[t.y] || typeof map.data.layout[t.y][t.x] === "undefined") {
            return false;
        }

        // Blocked by map/world/interactable/home placement
        if (player && player.tile && player.tile.x === t.x && player.tile.y === t.y) return false;
        if (isMapCollisionTile(t.x, t.y)) return false;
        if (typeof isTileBlockedByWorldSprite === "function" && isTileBlockedByWorldSprite(t.x, t.y)) return false;
        if (typeof isTileBlockedByInteractable === "function" && isTileBlockedByInteractable(t.x, t.y)) return false;
        if (isTileBlockedByHomePlacement(t.x, t.y) && !def.homeDef.canStackOnPlaced) return false;
    }

    return true;
}

function placeHomeItemAt(itemId, x, y) {
    if (!canPlaceHomeItem(itemId, x, y)) return false;
    if (!removeHomePlotItem(itemId, 1)) return false;

    const placement = buildHomePlacement(itemId, x, y);
    if (!placement) return false;

    window.homePlot.placed.push(placement);
    spawnHomePlacementsForMap(currentMapIndex);

    // Keep menu in sync without reopen
    if (window.homePlot.uiOpen && typeof renderHomePlotMenuItems === "function") {
        // If selected item is now 0, clear selection
        if (getHomeItemCount(itemId) <= 0) {
            window.homePlot.selectedItemId = null;
        }
        renderHomePlotMenuItems();
    }

    if (typeof notify === "function") notify("Placed item.", 1200);
    return true;
}

function getPlacementAtTile(x, y) {
    for (let i = homePlotActivePlaced.length - 1; i >= 0; i--) {
        const p = homePlotActivePlaced[i];
        const def = getHomeItemDef(p.itemId);
        if (!def) continue;
        const fp = getHomeFootprintTiles(def, p.x, p.y);
        if (fp.some(t => t.x === x && t.y === y)) return p;
    }
    return null;
}

function removePlacedHomeItemAt(x, y) {
    const found = getPlacementAtTile(x, y);
    if (!found) return false;

    const idx = window.homePlot.placed.findIndex(p => p.id === found.id);
    if (idx === -1) return false;

    window.homePlot.placed.splice(idx, 1);
    addHomePlotItem(found.itemId, 1);
    spawnHomePlacementsForMap(currentMapIndex);

    // Keep menu in sync without reopen
    if (window.homePlot.uiOpen && typeof renderHomePlotMenuItems === "function") {
        renderHomePlotMenuItems();
    }

    if (typeof notify === "function") notify("Item returned to Home inventory.", 1400);
    return true;
}

function drawSingleHomePlacement(p) {
    const def = getHomeItemDef(p.itemId);
    if (!def) return;

    const hd = def.homeDef;
    const imgPath = hd.spriteSheet;
    if (!homePlotImageCache[imgPath]) {
        const img = new Image();
        img.src = imgPath;
        homePlotImageCache[imgPath] = img;
    }

    const img = homePlotImageCache[imgPath];
    if (!img || !img.complete) return;

    const rows = Number(hd.rows || 1);
    const cols = Number(hd.cols || 1);
    const imageW = Number(hd.imageW || config.size.tile);
    const imageH = Number(hd.imageH || config.size.tile);
    const frameW = Math.floor(imageW / cols);
    const frameH = Math.floor(imageH / rows);
    const frames = rows * cols;

    if (frames > 1) {
        p._animTick = (p._animTick || 0) + 1;
        const speed = Number(hd.animSpeed || 8);
        if (speed > 0 && p._animTick % speed === 0) {
            p._frame = ((p._frame || 0) + 1) % frames;
        }
    } else {
        p._frame = 0;
    }

    const frameIndex = p._frame || 0;
    const col = frameIndex % cols;
    const row = Math.floor(frameIndex / cols);

    const sx = col * frameW;
    const sy = row * frameH;

    const px = Math.floor(p.x * config.size.tile - viewport.x);
    const py = Math.floor(p.y * config.size.tile - viewport.y - (frameH - config.size.tile));

    context.drawImage(img, sx, sy, frameW, frameH, px, py, frameW, frameH);
}

function drawHomePlotItems(zIndex) {
    if (!isHomePlotMap()) return;
    for (let i = 0; i < homePlotActivePlaced.length; i++) {
        const p = homePlotActivePlaced[i];
        if (typeof zIndex !== "undefined" && Number(p.zIndex || 0) !== zIndex) continue;
        drawSingleHomePlacement(p);
    }

    // Draw preview overlay while in place mode
    if (window.homePlot.mode === "place" && window.homePlot.preview.pointerInside) {
        drawHomePlotPreview();
    }
}

function drawHomePlotPreview() {
    const itemId = window.homePlot.selectedItemId;
    const tx = window.homePlot.preview.tileX;
    const ty = window.homePlot.preview.tileY;
    if (!itemId || tx === null || ty === null) return;

    const def = getHomeItemDef(itemId);
    if (!def) return;

    const hd = def.homeDef;
    const rows = Number(hd.rows || 1);
    const cols = Number(hd.cols || 1);
    const imageW = Number(hd.imageW || config.size.tile);
    const imageH = Number(hd.imageH || config.size.tile);
    const frameW = Math.floor(imageW / cols);
    const frameH = Math.floor(imageH / rows);

    const px = Math.floor(tx * config.size.tile - viewport.x);
    const py = Math.floor(ty * config.size.tile - viewport.y - (frameH - config.size.tile));

    const valid = canPlaceHomeItem(itemId, tx, ty);
    window.homePlot.preview.valid = valid;

    context.save();
    context.globalAlpha = valid ? 0.7 : 0.4;

    const imgPath = hd.spriteSheet;
    if (!homePlotImageCache[imgPath]) {
        const img = new Image();
        img.src = imgPath;
        homePlotImageCache[imgPath] = img;
    }
    const img = homePlotImageCache[imgPath];

    if (img && img.complete) {
        context.drawImage(img, 0, 0, frameW, frameH, px, py, frameW, frameH);
    } else {
        context.fillStyle = valid ? "rgba(58,240,122,0.45)" : "rgba(255,80,80,0.45)";
        context.fillRect(px, py, frameW, frameH);
    }

    context.strokeStyle = valid ? "#3af07a" : "#ff5252";
    context.lineWidth = 2;
    context.strokeRect(px, py, frameW, frameH);
    context.restore();
}

function worldTileFromClientPoint(clientX, clientY) {
    const rect = context.canvas.getBoundingClientRect();
    const zoom = (typeof getZoom === "function") ? getZoom() : 1;
    const localX = (clientX - rect.left) / zoom;
    const localY = (clientY - rect.top) / zoom;
    const worldX = localX + viewport.x;
    const worldY = localY + viewport.y;
    const tileX = Math.floor(worldX / config.size.tile);
    const tileY = Math.floor(worldY / config.size.tile);
    return { tileX, tileY };
}

function handleHomePlacementPointer(clientX, clientY, isTouchTap = false) {
    if (!isHomePlotMap()) return;
    if (window.homePlot.mode === "none") return;
    if (!context || !context.canvas) return;

    const t = worldTileFromClientPoint(clientX, clientY);
    window.homePlot.preview.tileX = t.tileX;
    window.homePlot.preview.tileY = t.tileY;
    window.homePlot.preview.pointerInside = true;

    if (window.homePlot.mode === "edit") {
        removePlacedHomeItemAt(t.tileX, t.tileY);
        return;
    }

    if (window.homePlot.mode === "place") {
        if (!window.homePlot.selectedItemId) return;

        if (!isTouchTap) {
            // Mouse click: place immediately
            placeHomeItemAt(window.homePlot.selectedItemId, t.tileX, t.tileY);
            return;
        }

        // Touch flow: first tap preview, second tap same tile places.
        const key = t.tileX + ":" + t.tileY;
        if (window.homePlot.preview.lastTouchTileKey === key) {
            placeHomeItemAt(window.homePlot.selectedItemId, t.tileX, t.tileY);
            window.homePlot.preview.lastTouchTileKey = null;
        } else {
            window.homePlot.preview.lastTouchTileKey = key;
        }
    }
}

function bindHomePlotPointerHandlers() {
    if (homePlotPointerBound || !context || !context.canvas) return;
    homePlotPointerBound = true;

    const canvas = context.canvas;

    canvas.addEventListener("mousemove", (e) => {
        if (!isHomePlotMap() || window.homePlot.mode !== "place") return;
        const t = worldTileFromClientPoint(e.clientX, e.clientY);
        window.homePlot.preview.tileX = t.tileX;
        window.homePlot.preview.tileY = t.tileY;
        window.homePlot.preview.pointerInside = true;
    });

    canvas.addEventListener("mouseleave", () => {
        window.homePlot.preview.pointerInside = false;
    });

    canvas.addEventListener("mousedown", (e) => {
        if (!window.homePlot.uiOpen) return;
        handleHomePlacementPointer(e.clientX, e.clientY, false);
    });

    canvas.addEventListener("touchstart", (e) => {
        if (!window.homePlot.uiOpen) return;
        const touch = e.changedTouches && e.changedTouches[0];
        if (!touch) return;
        handleHomePlacementPointer(touch.clientX, touch.clientY, true);
        e.preventDefault();
    }, { passive: false });
}

function ensureHomePlotMenuDom() {
    let wrap = document.getElementById("homeplot-customizer");
    if (wrap) return wrap;

    wrap = document.createElement("div");
    wrap.id = "homeplot-customizer";
    wrap.style.position = "fixed";
    wrap.style.right = "18px";
    wrap.style.top = "72px";
    wrap.style.width = "280px";
    wrap.style.maxHeight = "62vh";
    wrap.style.overflowY = "auto";
    wrap.style.padding = "10px";
    wrap.style.borderRadius = "8px";
    wrap.style.background = "linear-gradient(120deg, #22252c 80%, #222335 100%)";
    wrap.style.border = "1px solid #3af0ff";
    wrap.style.zIndex = "12001";
    wrap.style.display = "none";
    wrap.style.color = "#eef6ff";
    wrap.style.fontFamily = "var(--font-playermenu)";

    const title = document.createElement("h3");
    title.textContent = "Home Plot";
    title.style.margin = "0 0 8px 0";
    wrap.appendChild(title);

    const buttons = document.createElement("div");
    buttons.style.display = "flex";
    buttons.style.gap = "8px";
    buttons.style.marginBottom = "8px";

    const placeBtn = document.createElement("button");
    placeBtn.textContent = "Place";
    placeBtn.onclick = () => {
        window.homePlot.mode = "place";
        renderHomePlotMenuItems();
    };

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
        window.homePlot.mode = "edit";
        window.homePlot.selectedItemId = null;
        renderHomePlotMenuItems();
    };

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    closeBtn.onclick = closeHomePlotCustomizer;

    [placeBtn, editBtn, closeBtn].forEach(btn => {
        btn.style.border = "1px solid #3af0ff";
        btn.style.background = "#1d2530";
        btn.style.color = "#eef6ff";
        btn.style.borderRadius = "6px";
        btn.style.padding = "6px 8px";
        btn.style.cursor = "pointer";
        buttons.appendChild(btn);
    });

    wrap.appendChild(buttons);

    const list = document.createElement("div");
    list.id = "homeplot-item-list";
    list.style.display = "flex";
    list.style.flexDirection = "column";
    list.style.gap = "6px";
    wrap.appendChild(list);

    document.body.appendChild(wrap);
    return wrap;
}

function renderHomePlotMenuItems() {
    const list = document.getElementById("homeplot-item-list");
    if (!list) return;
    list.innerHTML = "";

    if (window.homePlot.mode === "edit") {
        const msg = document.createElement("div");
        msg.textContent = "Edit mode: tap/click placed item to remove and return it.";
        msg.style.opacity = "0.9";
        list.appendChild(msg);
        return;
    }

    const defs = getHomePlaceableDefs();
    defs.forEach(def => {
        const count = getHomeItemCount(def.id);
        if (count < 1) return;

        const row = document.createElement("button");
        row.style.display = "flex";
        row.style.alignItems = "center";
        row.style.gap = "8px";
        row.style.textAlign = "left";
        row.style.border = "1px solid #3af0ff";
        row.style.background = (window.homePlot.selectedItemId === def.id) ? "#2f4664" : "#1d2530";
        row.style.color = "#eef6ff";
        row.style.borderRadius = "6px";
        row.style.padding = "8px";
        row.style.cursor = "pointer";

        const icon = document.createElement("img");
        icon.src = def.image;
        icon.alt = def.name;
        icon.style.width = "24px";
        icon.style.height = "24px";
        icon.style.objectFit = "contain";
        icon.style.flexShrink = "0";

        const text = document.createElement("span");
        text.textContent = `${def.name} x${count}`;
        text.style.flex = "1";

        row.appendChild(icon);
        row.appendChild(text);

        row.onclick = () => {
            window.homePlot.mode = "place";
            window.homePlot.selectedItemId = def.id;
            renderHomePlotMenuItems();
        };

        list.appendChild(row);
    });

    if (!list.children.length) {
        const empty = document.createElement("div");
        empty.textContent = "No home items owned yet.";
        empty.style.opacity = "0.8";
        list.appendChild(empty);
    }
}

function openHomePlotCustomizer() {
    if (!isHomePlotMap()) {
        if (typeof notify === "function") notify("Home customizer is only available on your Home Plot.", 1700);
        return;
    }

    const wrap = ensureHomePlotMenuDom();
    wrap.style.display = "block";
    window.homePlot.uiOpen = true;
    window.homePlot.mode = "place";
    renderHomePlotMenuItems();
    bindHomePlotPointerHandlers();
}

function closeHomePlotCustomizer() {
    const wrap = document.getElementById("homeplot-customizer");
    if (wrap) wrap.style.display = "none";

    window.homePlot.uiOpen = false;
    window.homePlot.mode = "none";
    window.homePlot.selectedItemId = null;
    window.homePlot.preview.pointerInside = false;
    window.homePlot.preview.lastTouchTileKey = null;
}

function toggleHomePlotCustomizer() {
    if (window.homePlot.uiOpen) closeHomePlotCustomizer();
    else openHomePlotCustomizer();
}

function exportHomePlotState() {
    return {
        version: window.homePlot.version,
        inventory: { ...window.homePlot.inventory },
        placed: window.homePlot.placed.map(p => ({
            id: p.id,
            itemId: p.itemId,
            map: p.map,
            x: p.x,
            y: p.y,
            zIndex: p.zIndex
        }))
    };
}

function importHomePlotState(data) {
    window.homePlot.version = Number(data?.version || 1);
    window.homePlot.inventory = (data && data.inventory && typeof data.inventory === "object")
        ? { ...data.inventory }
        : {};
    window.homePlot.placed = Array.isArray(data?.placed)
        ? data.placed.map(p => ({
            ...p,
            _frame: 0,
            _animTick: 0
        }))
        : [];
    spawnHomePlacementsForMap(currentMapIndex);
}

function ensureHomePlotHudButton() {
    let btn = document.getElementById("homeplot-btn");
    if (!btn) return null;

    if (!btn.dataset.boundHomeplot) {
        btn.addEventListener("click", () => {
            if (!isHomePlotMap()) return;
            toggleHomePlotCustomizer();
        });
        btn.dataset.boundHomeplot = "1";
    }

    return btn;
}

function updateHomePlotHudButtonVisibility() {
    const btn = ensureHomePlotHudButton();
    if (!btn) return;

    const shouldShow = isHomePlotMap() && !_dialogueActive;
    btn.style.display = shouldShow ? "" : "none";

    if (!shouldShow && window.homePlot.uiOpen) {
        closeHomePlotCustomizer();
    }
}