// Notifcation and Dialogue system

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
let onDialogueClosed = null;


// Show Dialogue by Defining Lines 
function dialogue(...lines) {
    let name = "";
    if (typeof lines[0] === "object" && lines[0].name) {
        name = lines[0].name;
        lines = lines[0].lines;
    }
    if (!lines.length) return;
    _dialogueQueue = Array.isArray(lines[0]) ? lines[0] : lines;
    _dialogueActive = true;
    controlsEnabled = false;
    // Fade background music volume to half when dialogue starts
    if (window.SoundManager && SoundManager.bgMusic) {
        SoundManager.fadeBgMusicVolume(SoundManager.bgMusicVolume * 0.5, 400);
    }
    if (window.SoundManager) {
        SoundManager.playEffect("assets/sound/sfx/ui/dialogue.wav");
    }
    showDialogueLine(0, name);
}


// Show Dialogue from idx (Npc dialogue/quest lines)
function showDialogueLine(idx, customName = "") {
    const block = document.getElementById('dialogue-block');
    const text = document.getElementById('dialogue-text');
    const footer = document.getElementById('dialogue-footer');
    const nameDiv = document.getElementById('dialogue-npc-name');
    let npc = characters.find(c => c.isInteracting);

    // Show name for NPC or custom source
    if ((npc && nameDiv && npc.name) || customName) {
        nameDiv.textContent = customName || npc.name || "";
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
        console.log("[Dialogue] Dialogue ended, player unfrozen");
        clearAllMovementKeys(); 
        block.dataset.dialogueType = "";
        if (nameDiv) nameDiv.textContent = "";
    }
}


// Adavce through Dialogue Box - for Quests or skip to close if just default dialouge
function advanceDialogue() {
    const block = document.getElementById('dialogue-block');
    let idx = parseInt(block.dataset.dialogueIdx || "0", 10);
    let type = block.dataset.dialogueType || "";

    // Play dialogue sound effect on each advance
    if (window.SoundManager) {
        SoundManager.playEffect("assets/sound/sfx/ui/dialogue.wav");
    }

    // Quest Given Dialogue
    if (type === "questGiven") {
        if (idx < _dialogueQueue.length - 1) {
            showDialogueLine(idx + 1);
        } else {
            closeDialogue();
        }
        return;
    }

    // Quest Complete Dialogue
    if (type === "questComplete") {
        if (idx < _dialogueQueue.length - 1) {
            showDialogueLine(idx + 1);
        } else {
            closeDialogue();
        }
        return;
    }

    // Default dialogue logic (including quest checks)
    if (idx < _dialogueQueue.length - 1) {
        showDialogueLine(idx + 1);
    } else {

        // After last line of default dialogue, check for quest
        let npc = characters.find(c => c.isInteracting);
        if (npc && npc.questId && QUEST_DEFINITIONS[npc.questId]) {
            const questDef = QUEST_DEFINITIONS[npc.questId];

            // If quest is active, check completion
            if (playerQuests.active.includes(npc.questId)) {
                let result = tryCompleteQuest(npc.questId);
                if (result === "complete") {
                    notify("Quest complete! Rewards added.", 2000); 
                    dialogue(...npc.dialogue.questComplete);
                    block.dataset.dialogueType = "questComplete";
                } else if (result === "incomplete") {
                    notify("You haven't finished this quest yet.", 2000); 
                    dialogue(...npc.dialogue.questIncomplete);
                    block.dataset.dialogueType = "questGiven";
                }
                return;
            }

            // Start quest if not completed or redoable
            if (!isQuestCompleted(npc.questId) || questDef.redoable) {
                if (questDef.type === "gift") {
                    let result = tryCompleteQuest(npc.questId);
                    notify("Quest complete! Rewards added.", 2000); 
                    dialogue(...npc.dialogue.questComplete);
                    block.dataset.dialogueType = "questComplete";
                } else {
                    startQuest(npc.questId);
                    notify(`Quest started: ${questDef.name}`, 2000);
                    dialogue(...npc.dialogue.questGiven);
                    block.dataset.dialogueType = "questGiven";
                }
                return;
            }
        }

        // If no quest, just close dialogue
        closeDialogue();
    }
}


// Close Dialogue Box
function closeDialogue() {
    const block = document.getElementById('dialogue-block');
    const footer = document.getElementById('dialogue-footer');
    const nameDiv = document.getElementById('dialogue-npc-name');
    block.classList.add('hidden');
    block.onclick = null;
    if (footer) footer.textContent = "";
    _dialogueActive = false;
    controlsEnabled = true;
    player.frozen = false;
    block.dataset.dialogueType = "";
    if (nameDiv) nameDiv.textContent = "";
    clearAllMovementKeys();
    console.log("[Dialogue] Dialogue ended, player unfrozen (notify.js)");
    if (typeof player !== "undefined") {
        player.lastNpcInteractionTime = Date.now();
    }
    if (typeof onDialogueClosed === "function") {
        onDialogueClosed();
        onDialogueClosed = null;
    }

    // Restore background music volume when dialogue closes
    if (window.SoundManager && SoundManager.bgMusic) {
        SoundManager.fadeBgMusicVolume(SoundManager.bgMusicVolume, 400);
    }
}

