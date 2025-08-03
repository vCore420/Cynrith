const INVENTORY_SIZE = 9; // 3x3 grid

let inventory = []; // Array of { id, amount }

function addItem(itemId, amount = 1) {
    const def = ITEM_DEFINITIONS[itemId];
    if (!def) return false;

    // Try to stack first
    let slot = inventory.find(i => i.id === itemId && def.stackable);
    if (slot) {
        slot.amount += amount;
    } else if (inventory.length < INVENTORY_SIZE) {
        inventory.push({ id: itemId, amount });
    } else {
        notify("Inventory full!", 2000);
        return false;
    }
    updateInventoryUI();
    return true;
}

function removeItem(itemId, amount = 1) {
    let idx = inventory.findIndex(i => i.id === itemId);
    if (idx === -1) return false;
    let slot = inventory[idx];
    if (slot.amount < amount) return false;
    slot.amount -= amount;
    if (slot.amount <= 0) {
        inventory.splice(idx, 1);
    }
    // Shift items to fill empty slots
    inventory = inventory.filter(i => i.amount > 0);
    updateInventoryUI();
    return true;
}

function hasItem(itemId, amount = 1) {
    let slot = inventory.find(i => i.id === itemId);
    return slot && slot.amount >= amount;
}

// UI rendering
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

            div.onclick = () => showItemDropdown(i, slot, def);
        }
        grid.appendChild(div);
    }
}

// Dropdown for item actions
function showItemDropdown(index, slot, def) {
    // Remove any existing dropdown
    let old = document.getElementById('item-dropdown');
    if (old) old.remove();

    const div = document.createElement('div');
    div.id = "item-dropdown";
    div.style.position = "fixed";
    div.style.left = (window.innerWidth / 2 - 80) + "px";
    div.style.top = (window.innerHeight / 2 - 40) + "px";
    div.style.background = "#222";
    div.style.color = "#fff";
    div.style.padding = "12px";
    div.style.borderRadius = "10px";
    div.style.zIndex = 2000;
    div.style.boxShadow = "0 2px 12px rgba(0,0,0,0.18)";

    if (def.useable) {
        const useBtn = document.createElement('button');
        useBtn.textContent = "Use Item";
        useBtn.onclick = () => {
            // Placeholder for use logic
            notify(`Used ${def.name}!`, 1500);
            div.remove();
        };
        div.appendChild(useBtn);
    }

    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove Item";
    removeBtn.style.marginLeft = "12px";
    removeBtn.onclick = () => {
        div.remove();
        showRemoveAmountPrompt(slot, def);
    };
    div.appendChild(removeBtn);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = "Cancel";
    closeBtn.style.marginLeft = "12px";
    closeBtn.onclick = () => div.remove();
    div.appendChild(closeBtn);

    document.body.appendChild(div);
}

// Prompt for remove amount
function showRemoveAmountPrompt(slot, def) {
    let old = document.getElementById('item-dropdown');
    if (old) old.remove();

    const div = document.createElement('div');
    div.id = "item-dropdown";
    div.style.position = "fixed";
    div.style.left = (window.innerWidth / 2 - 80) + "px";
    div.style.top = (window.innerHeight / 2 - 40) + "px";
    div.style.background = "#222";
    div.style.color = "#fff";
    div.style.padding = "12px";
    div.style.borderRadius = "10px";
    div.style.zIndex = 2000;
    div.style.boxShadow = "0 2px 12px rgba(0,0,0,0.18)";

    const label = document.createElement('label');
    label.textContent = `Remove how many (${slot.amount} max): `;
    div.appendChild(label);

    const input = document.createElement('input');
    input.type = "number";
    input.min = 1;
    input.max = slot.amount;
    input.value = 1;
    input.style.width = "40px";
    div.appendChild(input);

    const okBtn = document.createElement('button');
    okBtn.textContent = "OK";
    okBtn.onclick = () => {
        const amt = parseInt(input.value, 10);
        if (amt >= 1 && amt <= slot.amount) {
            removeItem(slot.id, amt);
            div.remove();
        }
    };
    div.appendChild(okBtn);

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = "Cancel";
    cancelBtn.style.marginLeft = "12px";
    cancelBtn.onclick = () => div.remove();
    div.appendChild(cancelBtn);

    document.body.appendChild(div);
}
