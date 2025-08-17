// Inventory logic and Ui

const INVENTORY_SIZE = 9; // 3x3 grid
let inventory = []; // Array of { id, amount }


// Add item to players inventory
function addItem(itemId, amount = 1) {
    const def = ITEM_DEFINITIONS[itemId];
    if (!def) return false;

    // Try to stack first
    let slot = inventory.find(i => i.id === itemId && def.stackable);
    if (slot) {
        slot.amount += amount;
    } else if (inventory.length < INVENTORY_SIZE) {
        inventory.push({ id: itemId, amount });
        console.log(`[Inventory] Added ${amount}x ${def.name} to inventory`); 
    } else {
        notify("Inventory full!", 2000);
        return false;
    }
    updateInventoryUI();
    if (typeof updateQuestHUD === "function") updateQuestHUD();
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
    for (let i = 0; i < INVENTORY_SIZE; i++) {
        const slot = inventory[i];
        const div = document.createElement('div');
        div.className = "inventory-slot";
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

            div.onclick = (e) => showItemDropdown(i, slot, def, e);
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

    // Use button
    if (def.useable) {
        const useBtn = document.createElement('button');
        useBtn.textContent = "Use Item";
        useBtn.className = "dropdown-btn use";
        useBtn.onclick = () => {
            if (useItem(slot.id)) {
                dropdown.remove();
                overlay.remove();
                console.log(`[Inventory] Used item ${def.name} (ID: ${slot.id})`);
            }
        };
        dropdown.appendChild(useBtn);
    }

    // Remove button
    if (def.removeable !== false) {
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove Item";
        removeBtn.className = "dropdown-btn remove";
        removeBtn.onclick = () => {
            // Show amount selector below this button
            if (dropdown.querySelector('.remove-amount-block')) return;
            const amtBlock = document.createElement('div');
            amtBlock.className = "remove-amount-block";

            let amt = 1;

            const minusBtn = document.createElement('button');
            minusBtn.textContent = "−";
            minusBtn.className = "remove-amount-btn";
            minusBtn.onclick = () => {
                if (amt > 1) {
                    amt--;
                    amtNum.textContent = amt;
                }
            };

            const amtNum = document.createElement('span');
            amtNum.textContent = amt;
            amtNum.className = "remove-amount-num";

            const plusBtn = document.createElement('button');
            plusBtn.textContent = "+";
            plusBtn.className = "remove-amount-btn";
            plusBtn.onclick = () => {
                if (amt < slot.amount) {
                    amt++;
                    amtNum.textContent = amt;
                }
            };

            const okBtn = document.createElement('button');
            okBtn.textContent = "OK";
            okBtn.className = "remove-amount-ok";
            okBtn.onclick = () => {
                removeItem(slot.id, amt);
                dropdown.remove();
                overlay.remove();
            };

            amtBlock.appendChild(minusBtn);
            amtBlock.appendChild(amtNum);
            amtBlock.appendChild(plusBtn);
            amtBlock.appendChild(okBtn);

            dropdown.appendChild(amtBlock);
        };
        dropdown.appendChild(removeBtn);
    }

    document.body.appendChild(overlay);
    document.body.appendChild(dropdown);
}
