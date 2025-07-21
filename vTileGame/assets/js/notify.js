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
    if (idx < _dialogueQueue.length) {
        text.textContent = _dialogueQueue[idx];
        block.classList.remove('hidden');
        block.onclick = () => showDialogueLine(idx + 1);
    } else {
        block.classList.add('hidden');
        block.onclick = null;
        _dialogueActive = false;
        controlsEnabled = true;
    }
}