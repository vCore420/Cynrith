// Notification system
function notify(text, time = 2000) {
    const el = document.getElementById('notification');
    el.textContent = text;
    el.classList.add('show');
    clearTimeout(el._timeout);
    el._timeout = setTimeout(() => {
        el.classList.remove('show');
    }, time);
}

// Dialogue system
let _dialogueQueue = [];
let _dialogueActive = false;

function dialogue(...lines) {
    if (!lines.length) return;
    _dialogueQueue = Array.isArray(lines[0]) ? lines[0] : lines;
    _dialogueActive = true;
    controlsEnabled = false;
    showDialogueLine(0);
}

function showDialogueLine(idx) {
    const block = document.getElementById('dialogue-block');
    const text = document.getElementById('dialogue-text');
    const footer = document.getElementById('dialogue-footer');
    const nameDiv = document.getElementById('dialogue-npc-name');
    // Find the interacting NPC
    let npc = characters.find(c => c.isInteracting);
    if (npc && nameDiv) {
        nameDiv.textContent = npc.name || "";
        nameDiv.style.display = "";
    } else if (nameDiv) {
        nameDiv.textContent = "";
        nameDiv.style.display = "none";
    }
    if (idx < _dialogueQueue.length) {
        text.textContent = _dialogueQueue[idx];
        block.classList.remove('hidden');
        footer.textContent = "Press A to continue";
        block.onclick = null;
        block.dataset.dialogueIdx = idx;
    } else {
        block.classList.add('hidden');
        block.onclick = null;
        footer.textContent = "";
        _dialogueActive = false;
        controlsEnabled = true;
        player.frozen = false; 
        clearAllMovementKeys(); 
        block.dataset.dialogueType = "";
        if (nameDiv) nameDiv.textContent = "";
    }
}
