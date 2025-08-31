// Inventory logic and Ui

const INVENTORY_SIZE = 9; // 3x3 grid
const INVENTORY_MAX_PAGES = 10; // Max Inventory pages a player can have (90 slots)
let inventoryPagesUnlocked = 2; // Starting pages for new players
let inventory = []; // Array of { id, amount }
let currentInventoryPage = 1;


// Add item to players inventory
function addItem(itemId, amount = 1) {
    const def = ITEM_DEFINITIONS[itemId];
    if (!def) return false;

    // Try to stack first
    let slot = inventory.find(i => i.id === itemId && def.stackable);
    if (slot) {
        slot.amount += amount;
    } else if (inventory.length < INVENTORY_SIZE * inventoryPagesUnlocked) {
        inventory.push({ id: itemId, amount });
        console.log(`[Inventory] Added ${amount}x ${def.name} to inventory`);
    } else {
        notify("Inventory full!", 2000);
        return false;
    }
    updateInventoryUI();
    if (typeof updateQuestHUD === "function") updateQuestHUD();

    // Play item pickup sound based on rarity
    if (window.SoundManager && def.rarity) {
        const rarity = def.rarity.toLowerCase();
        SoundManager.playEffect(`assets/sound/sfx/items/${rarity}.wav`);
    }

    return true;
}


// Remove item from players inventory
function removeItem(itemId, amount = 1) {
    let idx = inventory.findIndex(i => i.id === itemId);
    if (idx === -1) return false;
    let slot = inventory[idx];
    if (slot.amount < amount) return false;
    slot.amount -= amount;
    if (slot.amount <= 0) {
        inventory.splice(idx, 1);
    }
    console.log(`[Inventory] Removed ${amount}x ${ITEM_DEFINITIONS[itemId].name} from inventory`);
    // Shift items to fill empty slots
    inventory = inventory.filter(i => i.amount > 0);
    updateInventoryUI();
    if (typeof updateQuestHUD === "function") updateQuestHUD();
    notify(`Removed ${amount}x ${ITEM_DEFINITIONS[itemId].name} from inventory.`, 1800);
    return true;
}


// Check if player has item in their inventory
function hasItem(itemId, amount = 1) {
    let slot = inventory.find(i => i.id === itemId);
    return slot && slot.amount >= amount;
}


// Get current count of item in player inventory
function getItemCount(itemId) {
    return inventory
        .filter(i => i && i.id === itemId)
        .reduce((sum, i) => sum + (i.amount || 0), 0);
}


// Inventory Ui
function updateInventoryUI() {
    const grid = document.getElementById('inventory-grid');
    grid.innerHTML = "";

    // Add navigation controls
    let navDiv = document.getElementById('inventory-nav');
    if (!navDiv) {
        navDiv = document.createElement('div');
        navDiv.id = 'inventory-nav';
        navDiv.style.display = 'flex';
        navDiv.style.justifyContent = 'center';
        navDiv.style.alignItems = 'center';
        navDiv.style.marginBottom = '12px';
        grid.parentNode.insertBefore(navDiv, grid);
    }
    navDiv.innerHTML = "";

    const leftBtn = document.createElement('button');
    leftBtn.textContent = "◀";
    leftBtn.className = "inventory-nav-btn";
    leftBtn.disabled = currentInventoryPage === 1;
    leftBtn.onclick = () => {
        if (currentInventoryPage > 1) {
            currentInventoryPage--;
            updateInventoryUI();
        }
    };

    const rightBtn = document.createElement('button');
    rightBtn.textContent = "▶";
    rightBtn.className = "inventory-nav-btn";
    rightBtn.disabled = currentInventoryPage === inventoryPagesUnlocked;
    rightBtn.onclick = () => {
        if (currentInventoryPage < inventoryPagesUnlocked) {
            currentInventoryPage++;
            updateInventoryUI();
        }
    };

    const pageNum = document.createElement('span');
    pageNum.textContent = `Page ${currentInventoryPage} / ${inventoryPagesUnlocked}`;
    pageNum.className = "inventory-page-num";
    pageNum.style.margin = "0 16px";

    navDiv.appendChild(leftBtn);
    navDiv.appendChild(pageNum);
    navDiv.appendChild(rightBtn);

    // Show slots for current page
    const startIdx = (currentInventoryPage - 1) * INVENTORY_SIZE;
    for (let i = 0; i < INVENTORY_SIZE; i++) {
        const slotIdx = startIdx + i;
        const slot = inventory[slotIdx];
        const div = document.createElement('div');
        div.className = "inventory-slot";
        div.dataset.slotNum = slotIdx + 1; // For reference
        if (slot) {
            const def = ITEM_DEFINITIONS[slot.id];
            const img = document.createElement('img');
            img.src = def.image;
            img.alt = def.name;
            div.appendChild(img);

            if (def.stackable && slot.amount > 1) {
                const amt = document.createElement('span');
                amt.className = "inventory-amount";
                amt.textContent = slot.amount;
                div.appendChild(amt);
            }

            div.onclick = (e) => showItemDropdown(slotIdx, slot, def, e);
        }
        grid.appendChild(div);
    }
}


// Dropdown for item actions
function showItemDropdown(index, slot, def, event) {
    // Remove any existing dropdown/overlay
    let old = document.getElementById('item-dropdown');
    if (old) old.remove();
    let oldOverlay = document.getElementById('item-dropdown-overlay');
    if (oldOverlay) oldOverlay.remove();

    // Overlay to close on click outside
    let overlay = document.createElement('div');
    overlay.id = "item-dropdown-overlay";
    overlay.onclick = () => {
        dropdown.remove();
        overlay.remove();
    };

    // Dropdown block
    const rarityClass = `rarity-${(def.rarity || "common").toLowerCase()}`;
    const dropdown = document.createElement('div');
    dropdown.id = "item-dropdown";
    dropdown.className = `item-dropdown ${rarityClass}`;
    dropdown.onclick = e => e.stopPropagation();

    // Position dropdown near mouse, but not overlapping the slot
    let mouseX = event?.clientX || window.innerWidth / 2;
    let mouseY = event?.clientY || window.innerHeight / 2;
    let dropdownWidth = 240;
    let dropdownHeight = 220; // Approximate, adjust if needed

    // Prefer to the right of the mouse, but if too close to edge, shift left
    let left = mouseX + 16;
    if (left + dropdownWidth > window.innerWidth) {
        left = mouseX - dropdownWidth - 16;
        if (left < 0) left = 8;
    }
    // Prefer above the mouse if too close to bottom
    let top = mouseY - dropdownHeight / 2;
    if (top + dropdownHeight > window.innerHeight) {
        top = window.innerHeight - dropdownHeight - 8;
    }
    if (top < 0) top = 8;

    dropdown.style.left = `${left}px`;
    dropdown.style.top = `${top}px`;

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = "✕";
    closeBtn.className = "dropdown-close-btn";
    closeBtn.onclick = () => {
        dropdown.remove();
        overlay.remove();
    };
    dropdown.appendChild(closeBtn);

    // Item name
    const nameDiv = document.createElement('div');
    nameDiv.textContent = def.name;
    nameDiv.className = "dropdown-name";
    dropdown.appendChild(nameDiv);

    // Description
    const descDiv = document.createElement('div');
    descDiv.textContent = def.description;
    descDiv.className = "dropdown-desc";
    dropdown.appendChild(descDiv);

    // Rarity
    const rarityDiv = document.createElement('div');
    rarityDiv.textContent = `Rarity: ${def.rarity || "Common"}`;
    rarityDiv.className = "dropdown-rarity";
    dropdown.appendChild(rarityDiv);

    // Shared amount selector logic
    function showAmountSelector(action) {
        // Remove any existing amount blocks
        const existing = dropdown.querySelector('.amount-block');
        if (existing) existing.remove();

        const amtBlock = document.createElement('div');
        amtBlock.className = "amount-block";

        let amt = 1;

        const minusBtn = document.createElement('button');
        minusBtn.textContent = "−";
        minusBtn.className = "amount-btn";
        minusBtn.onclick = () => {
            if (amt > 1) {
                amt--;
                amtNum.textContent = amt;
            }
        };

        const amtNum = document.createElement('span');
        amtNum.textContent = amt;
        amtNum.className = "amount-num";

        const plusBtn = document.createElement('button');
        plusBtn.textContent = "+";
        plusBtn.className = "amount-btn";
        plusBtn.onclick = () => {
            if (amt < slot.amount) {
                amt++;
                amtNum.textContent = amt;
            }
        };

        const okBtn = document.createElement('button');
        okBtn.textContent = "OK";
        okBtn.className = "amount-ok";
        okBtn.onclick = () => {
            if (action === "use") {
                if (useItem(slot.id, amt)) {
                    dropdown.remove();
                    overlay.remove();
                    console.log(`[Inventory] Used ${amt}x ${def.name} (ID: ${slot.id})`);
                }
            } else if (action === "remove") {
                // Play SFX for User item removal
                if (window.SoundManager) {
                    SoundManager.playEffect("assets/sound/sfx/items/remove.wav");
                }
                removeItem(slot.id, amt);
                dropdown.remove();
                overlay.remove();
            }
        };

        amtBlock.appendChild(minusBtn);
        amtBlock.appendChild(amtNum);
        amtBlock.appendChild(plusBtn);
        amtBlock.appendChild(okBtn);

        dropdown.appendChild(amtBlock);
    }

    // Use button
    if (def.useable) {
        const useBtn = document.createElement('button');
        useBtn.textContent = "Use Item";
        useBtn.className = "dropdown-btn use";
        useBtn.onclick = () => showAmountSelector("use");
        dropdown.appendChild(useBtn);
    }

    // Remove button
    if (def.removeable !== false) {
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove Item";
        removeBtn.className = "dropdown-btn remove";
        removeBtn.onclick = () => showAmountSelector("remove");
        dropdown.appendChild(removeBtn);
    }

    document.body.appendChild(overlay);
    document.body.appendChild(dropdown);
}


// Unlock more inventory pages (call this when player unlocks a new page)
function unlockInventoryPage() {
    if (inventoryPagesUnlocked < INVENTORY_MAX_PAGES) {
        inventoryPagesUnlocked++;
        updateInventoryUI();
        notify(`Inventory page ${inventoryPagesUnlocked} unlocked!`, 1800);
    }
}