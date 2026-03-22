// Quest Ui on Hud


// Update quests shown on the hud
function updateQuestHUD() {
    const hud = document.getElementById("quest-hud");
    if (!hud) return;
    hud.innerHTML = "";
    let shown = 0;
    playerQuests.active.forEach(qid => {
        const quest = QUEST_DEFINITIONS[qid];
        if (!quest) return;
        let entry = document.createElement("div");
        entry.className = "quest-hud-entry";
        let counter = document.createElement("span");
        counter.className = "counter";
        if (quest.type === "enemyDefeat") {
            let canvas = document.createElement("canvas");
            canvas.width = 28;
            canvas.height = 28;
            canvas.className = "enemy-icon-canvas";
            let sprite = new window.Image();
            sprite.src = ENEMY_TYPES[quest.enemyId]?.sprite || "";
            sprite.onload = function() {
                let ctx = canvas.getContext("2d");
                ctx.clearRect(0, 0, 28, 28);
                ctx.drawImage(sprite, 96, 0, 96, 96, 0, 0, 28, 28);
            };
            entry.appendChild(canvas);
            let count = playerQuestProgress[qid] || 0;
            counter.textContent = `${count} / ${quest.requiredAmount}`;
            if (count >= quest.requiredAmount) counter.classList.add("complete");
        } else if (quest.type === "statBuild") {
            let icon = document.createElement("img");
            icon.src = `assets/img/icons/${quest.stat}.png`;
            entry.appendChild(icon);
            let startValue = statBuildQuestStart[qid] || 0;
            let statValue = player[quest.stat] || 0;
            let gained = statValue - startValue;
            counter.textContent = `${gained} / ${quest.requiredAmount}`;
            if (gained >= quest.requiredAmount) counter.classList.add("complete");
        } else if (quest.type === "itemCollect") {
            let icon = document.createElement("img");
            icon.src = ITEM_DEFINITIONS[quest.requiredItems[0].id]?.image || "";
            entry.appendChild(icon);
            let have = getItemCount(quest.requiredItems[0].id);
            let need = quest.requiredItems[0].amount;
            counter.textContent = `${have} / ${need}`;
            if (have >= need) counter.classList.add("complete");
        } else if (quest.type === "interactTiles") {
            // Load quest icon from assets/img/quests/
            let icon = document.createElement("img");
            icon.width = 32;
            icon.height = 32;
            // Use quest.icon if defined, otherwise fallback to first interact tile id
            let iconName = quest.icon || quest.interactTileIds?.[0] || "default";
            icon.src = `assets/img/quests/${iconName}.png`;
            entry.appendChild(icon);

            // Progress counter
            let triggered = quest.interactTileIds.filter(id => triggeredInteractableTiles[id]).length;
            counter.textContent = `${triggered} / ${quest.requiredAmount}`;
            if (triggered >= quest.requiredAmount) counter.classList.add("complete");
        }
        entry.appendChild(document.createTextNode(quest.name));
        entry.appendChild(counter);
        hud.appendChild(entry);
        shown++;
    });
    hud.style.overflowY = shown > 3 ? "auto" : "hidden";
}
