// Player menu

let statsInterval = null;

// open menu
function openMenu() {
    document.getElementById('player-menu').classList.remove('hidden');
    controlsEnabled = false;
    updatePlayerMenuSprite();
    updatePlayerMenuStats();
    statsInterval = setInterval(updatePlayerMenuStats, 300); // Refresh stats every 300ms
    if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
}

// close menu 
function closeMenu() {
    document.getElementById('player-menu').classList.add('hidden');
    controlsEnabled = true;
    if (statsInterval) {
        clearInterval(statsInterval);
        statsInterval = null;
    }
}

document.getElementById('menu-btn').addEventListener('click', openMenu);
document.getElementById('close-menu').addEventListener('click', closeMenu);

// Display Player Sprite in menu
function updatePlayerMenuSprite() {
    const preview = document.getElementById('player-sprite-preview');
    preview.innerHTML = ""; 

    if (typeof player === "undefined" || !player.sprite.complete) return;

    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");

    let frame = keys[player.movement.key]?.f[1] ?? 1;
    ctx.drawImage(
        player.sprite,
        frame * config.size.char, 0, config.size.char, config.size.char,
        0, 0, 128, 128
    );

    preview.appendChild(canvas);
}

// Display Player Stats in menu
function updatePlayerMenuStats() {
    const stats = document.getElementById('player-stats-preview');
    if (!stats || typeof player === "undefined") return;

    stats.innerHTML = `
        <div>
            <div><b>Health:</b> ${player.health}</div>
            <div><b>XP:</b> ${player.xp}</div>
            <div><b>Attack:</b> ${player.attack}</div>
            <div><b>Defence:</b> ${player.defence}</div>
        </div>
    `;
}

function showInventoryMenu() {
    document.querySelectorAll('.player-menu-pages .menu-page').forEach(el => el.classList.remove('active'));
    document.getElementById('inventory-menu').classList.add('active');
    updateInventoryUI && updateInventoryUI();
}

function showPlayerMenuMain() {
    document.querySelectorAll('.player-menu-pages .menu-page').forEach(el => el.classList.remove('active'));
    document.querySelector('.player-menu-inner').classList.add('active');
}

function showQuestsMenu() {
    document.querySelectorAll('.player-menu-pages .menu-page').forEach(el => el.classList.remove('active'));
    let questsPage = document.getElementById('quests-menu');
    if (!questsPage) {
        questsPage = document.createElement('div');
        questsPage.id = "quests-menu";
        questsPage.className = "menu-page active";
        questsPage.innerHTML = `
            <button class="close-btn" onclick="showPlayerMenuMain()">✕</button>
            <h2>Quests</h2>
            <div id="quests-tabs" style="display:flex;gap:12px;justify-content:center;margin-bottom:12px;">
                <button id="tab-active" class="quest-tab active">Active Quests</button>
                <button id="tab-completed" class="quest-tab">Completed Quests</button>
            </div>
            <div id="quests-list" class="quests-list"></div>
        `;
        document.querySelector('.player-menu-pages').appendChild(questsPage);

        // Tab switching logic
        document.getElementById('tab-active').onclick = function() {
            document.getElementById('tab-active').classList.add('active');
            document.getElementById('tab-completed').classList.remove('active');
            updateQuestsUI("active");
        };
        document.getElementById('tab-completed').onclick = function() {
            document.getElementById('tab-completed').classList.add('active');
            document.getElementById('tab-active').classList.remove('active');
            updateQuestsUI("completed");
        };
    } else {
        questsPage.classList.add('active');
    }
    updateQuestsUI("active");
}

function updateQuestsUI(tab = "active") {
    const list = document.getElementById('quests-list');
    if (!list) return;
    list.innerHTML = "";
    let questsArr = tab === "active" ? playerQuests.active : playerQuests.completed;
    if (questsArr.length === 0) {
        list.innerHTML = `<div style="color:#aaa;text-align:center;margin-top:24px;">No quests found.</div>`;
        return;
    }
    questsArr.forEach((qid, i) => {
        const quest = QUEST_DEFINITIONS[qid];
        if (!quest) return;
        const div = document.createElement('div');
        div.className = "quest-list-item";
        
        // Format rewards
        let rewardsHtml = "";
        if (quest.rewards && quest.rewards.length) {
            rewardsHtml = `<div style="font-size:0.95em;color:#9f9;margin-top:4px;"><b>Rewards:</b> `;
            rewardsHtml += quest.rewards.map(r => {
                if (r.id && ITEM_DEFINITIONS[r.id]) {
                    return `${r.amount || 1} ${ITEM_DEFINITIONS[r.id].name} <img src="${ITEM_DEFINITIONS[r.id].image}" alt="${ITEM_DEFINITIONS[r.id].name}" style="width:18px;vertical-align:middle;margin:0 2px 0 2px;">`;
                } else if (typeof r.xp === "number") {
                    return `${r.xp} XP`;
                }
                return "";
            }).join(", ");
            rewardsHtml += `</div>`;
        }

        div.innerHTML = `
            <div><b>${quest.name}</b></div>
            <div style="font-size:0.95em;color:#ccc;margin-bottom:4px;">${quest.description}</div>
            ${rewardsHtml}
            ${tab === "completed" ? `<div style="font-size:0.85em;color:#6f6;">(Completed)</div>` : ""}
        `;
        list.appendChild(div);
        // Divider except after last item
        if (i < questsArr.length - 1) {
            const hr = document.createElement('hr');
            hr.className = "quest-divider";
            list.appendChild(hr);
        }
    });
}

// Attach event listener
document.getElementById('btn-inventory').addEventListener('click', showInventoryMenu);
document.getElementById('btn-quests').addEventListener('click', showQuestsMenu);
