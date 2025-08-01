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
    if (idx < _dialogueQueue.length) {
        text.textContent = _dialogueQueue[idx];
        block.classList.remove('hidden');
        // Show hint for next line
        if (block.dataset.dialogueType === "questGiven") {
            footer.textContent = "Press B to close";
        } else if (block.dataset.dialogueType === "questComplete") {
            footer.textContent = "Press B to close";
        } else if (idx === _dialogueQueue.length - 1) {
            footer.textContent = "Press B to close or A to start quest";
        } else {
            footer.textContent = "Press B to continue";
        }
        block.onclick = null;
        block.dataset.dialogueIdx = idx;
    } else {
        block.classList.add('hidden');
        block.onclick = null;
        footer.textContent = "";
        _dialogueActive = false;
        controlsEnabled = true;
        block.dataset.dialogueType = "";
    }
}