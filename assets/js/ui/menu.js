// Player menu

let statsInterval = null;
let mapPreviewInterval = null;

// Settings State
let gameSettings = {
    showTouchControls: true,
    showLog: true,
    bgMusicVolume: 0.7,
    sfxVolume: 0.8
};

// Player's skill inventory and equipped skills
let playerSkills = []; // Array of { id, level }
let equippedSkills = [null, null, null]; // For equipped slots

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
            <div><b>Attack Speed:</b> ${player.attackSpeed}</div>
        </div>
    `;
}


// Show Player Menu Main Page
function showPlayerMenuMain() {
    document.querySelectorAll('.player-menu-pages .menu-page').forEach(el => el.classList.remove('active'));
    document.querySelector('.player-menu-inner').classList.add('active');
    if (mapPreviewInterval) {
        clearInterval(mapPreviewInterval);
        mapPreviewInterval = null;
    }
}


// Show Inventory Menu
function showInventoryMenu() {
    document.querySelectorAll('.player-menu-pages .menu-page').forEach(el => el.classList.remove('active'));
    document.getElementById('inventory-menu').classList.add('active');
    updateInventoryUI && updateInventoryUI();
}


// Show Quest Menu - move styles to css
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


// Update Quest UI in Player menu
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

// --- Settings Menu ---
function showSettingsMenu() {
    document.querySelectorAll('.player-menu-pages .menu-page').forEach(el => el.classList.remove('active'));
    let settingsPage = document.getElementById('settings-menu');
    if (!settingsPage) {
        settingsPage = document.createElement('div');
        settingsPage.id = "settings-menu";
        settingsPage.className = "menu-page active";
        settingsPage.innerHTML = `
            <button class="close-btn" onclick="showPlayerMenuMain()">✕</button>
            <h2>Game Settings</h2>
            <div class="settings-options-row">
                <span class="settings-label">Show Touch Controls</span>
                <label class="settings-switch">
                    <input type="checkbox" id="toggle-touch-controls">
                    <span class="settings-slider-switch"></span>
                </label>
            </div>
            <div class="settings-options-row">
                <span class="settings-label">Show FPS & Coords Log</span>
                <label class="settings-switch">
                    <input type="checkbox" id="toggle-log">
                    <span class="settings-slider-switch"></span>
                </label>
            </div>
            <div class="settings-options-row">
                <span class="settings-label">Background Music Volume</span>
                <input type="range" id="slider-bg-music" min="0" max="1" step="0.01" class="settings-slider">
            </div>
            <div class="settings-options-row">
                <span class="settings-label">SFX Volume</span>
                <input type="range" id="slider-sfx" min="0" max="1" step="0.01" class="settings-slider">
            </div>
        `;
        document.querySelector('.player-menu-pages').appendChild(settingsPage);

        // Touch Controls Toggle
        document.getElementById('toggle-touch-controls').onchange = function() {
            gameSettings.showTouchControls = this.checked;

            const joystick = document.getElementById('touch-joystick');
            if (joystick) joystick.style.display = this.checked ? "" : "none";
            const actControls = document.getElementById('act-controls');
            if (actControls) actControls.style.display = this.checked ? "" : "none";
        };

        // Log Toggle
        document.getElementById('toggle-log').onchange = function() {
            gameSettings.showLog = this.checked;
            document.getElementById('log').style.display = this.checked ? "" : "none";
        };

        // BG Music Volume Slider
        document.getElementById('slider-bg-music').oninput = function() {
            gameSettings.bgMusicVolume = parseFloat(this.value);
            if (window.SoundManager) SoundManager.setBgMusicVolume(gameSettings.bgMusicVolume);
        };

        // SFX Volume Slider
        document.getElementById('slider-sfx').oninput = function() {
            gameSettings.sfxVolume = parseFloat(this.value);
            if (window.SoundManager) SoundManager.setSfxVolume(gameSettings.sfxVolume);
        };
    } else {
        settingsPage.classList.add('active');
    }

    // Set controls to current values
    document.getElementById('toggle-touch-controls').checked = !!gameSettings.showTouchControls;
    document.getElementById('toggle-log').checked = !!gameSettings.showLog;
    document.getElementById('slider-bg-music').value = gameSettings.bgMusicVolume;
    document.getElementById('slider-sfx').oninput = function() {
    gameSettings.sfxVolume = parseFloat(this.value);
        if (window.SoundManager) SoundManager.setEffectVolume(gameSettings.sfxVolume);
    };
}

function patchSettingsFromSave(data) {
    if (data.settings) {
        Object.assign(gameSettings, data.settings);

        // Apply settings to UI and sound
        document.getElementById('touch-controls').style.display = gameSettings.showTouchControls ? "" : "none";
        document.getElementById('act-controls').style.display = gameSettings.showTouchControls ? "" : "none";
        document.getElementById('log').style.display = gameSettings.showLog ? "" : "none";
        if (window.SoundManager) {
            SoundManager.setBgMusicVolume(gameSettings.bgMusicVolume);
            SoundManager.setEffectVolume(gameSettings.sfxVolume);
        }

        // --- Update settings menu controls if menu is present ---
        const touchToggle = document.getElementById('toggle-touch-controls');
        const logToggle = document.getElementById('toggle-log');
        const bgSlider = document.getElementById('slider-bg-music');
        const sfxSlider = document.getElementById('slider-sfx');
        if (touchToggle) touchToggle.checked = !!gameSettings.showTouchControls;
        if (logToggle) logToggle.checked = !!gameSettings.showLog;
        if (bgSlider) bgSlider.value = gameSettings.bgMusicVolume;
        if (sfxSlider) sfxSlider.value = gameSettings.sfxVolume;
    }
}

// Show Map Menu
function showMapMenu() {
    // Hide all menu pages, show map menu
    document.querySelectorAll('.player-menu-pages .menu-page').forEach(el => el.classList.remove('active'));
    const mapPage = document.getElementById('map-menu');
    mapPage.classList.add('active');

    // --- Dynamic canvas size ---
    const layout = map.data._layers ? map.data._layers[0] : map.data.layout;
    const width = layout[0].length;
    const height = layout.length;
    let previewW = Math.min(480, width * 16);
    let previewH = Math.min(320, height * 16);
    if (width > height) {
        previewH = Math.round(previewW * (height / width));
    } else {
        previewW = Math.round(previewH * (width / height));
    }
    const canvas = document.getElementById('map-preview-canvas');
    canvas.width = previewW;
    canvas.height = previewH;

    // --- Start live preview ---
    drawMapPreview();
    if (mapPreviewInterval) clearInterval(mapPreviewInterval);
    mapPreviewInterval = setInterval(drawMapPreview, 300);
}

// Draw the current map preview
function drawMapPreview() {
    const canvas = document.getElementById('map-preview-canvas');
    if (!canvas || !map || !map.data || !map.data.layout) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Use the bottom layer for preview
    const layout = map.data._layers ? map.data._layers[0] : map.data.layout;
    const gidMap = map.data._gidMap || [];
    const tileImages = map.tiles;
    const width = layout[0].length;
    const height = layout.length;
    const tileSize = Math.min(canvas.width / width, canvas.height / height);

    // Draw each tile
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let gid = layout[y][x];
            if (gid > 0) {
                let assetIdx = gidMap[gid];
                let img = tileImages[assetIdx];
                if (img && img.complete && img.naturalWidth > 0) {
                    ctx.drawImage(
                        img,
                        0, 0, img.width, img.height,
                        x * tileSize, y * tileSize, tileSize, tileSize
                    );
                } else {
                    ctx.fillStyle = "#23243a";
                    ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
                }
            } else {
                ctx.fillStyle = "#23243a";
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }
    }

    // Draw NPC markers (blue or gold if quest ready)
    if (typeof characters !== "undefined" && Array.isArray(characters)) {
        characters.forEach(char => {
            if (char.type === "npc") {
                ctx.save();
                // Gold if quest ready, else blue
                if (typeof npcHasReadyQuest === "function" && npcHasReadyQuest(char)) {
                    ctx.fillStyle = "#ffe082"; // gold
                } else {
                    ctx.fillStyle = "#3af0ff"; // blue
                }
                ctx.globalAlpha = 0.85;
                ctx.beginPath();
                ctx.arc(
                    char.x * tileSize + tileSize / 2,
                    char.y * tileSize + tileSize / 2,
                    Math.max(4, tileSize / 3),
                    0, 2 * Math.PI
                );
                ctx.fill();
                ctx.strokeStyle = "#fffbe6";
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.restore();
            }
        });
    }

    // Draw Enemy markers (red)
    if (typeof characters !== "undefined" && Array.isArray(characters)) {
        characters.forEach(char => {
            if (char.type === "enemy") {
                ctx.save();
                ctx.fillStyle = "#e33";
                ctx.globalAlpha = 0.85;
                ctx.beginPath();
                ctx.arc(
                    char.x * tileSize + tileSize / 2,
                    char.y * tileSize + tileSize / 2,
                    Math.max(4, tileSize / 3),
                    0, 2 * Math.PI
                );
                ctx.fill();
                ctx.strokeStyle = "#fffbe6";
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.restore();
            }
        });
    }

    // Draw player position (green)
    if (player && player.tile) {
        ctx.save();
        ctx.fillStyle = "#3af07a";
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(
            player.tile.x * tileSize + tileSize / 2,
            player.tile.y * tileSize + tileSize / 2,
            Math.max(5, tileSize / 2.5),
            0, 2 * Math.PI
        );
        ctx.fill();
        ctx.strokeStyle = "#fffbe6";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
    }
}

function showSkillsMenu() {
    document.querySelectorAll('.player-menu-pages .menu-page').forEach(el => el.classList.remove('active'));
    document.getElementById('skills-menu').classList.add('active');
    // Hide gacha screen if open
    document.getElementById('skills-gacha-screen').classList.add('hidden');
    // Show main skills blocks
    document.getElementById('equipped-skills-block').style.display = "";
    document.getElementById('skills-inventory-block').style.display = "";
    document.getElementById('spin-skills-btn').style.display = "";
    renderSkillsMenu();
}

// Show Gacha Spin Screen
function showSkillsGachaScreen() {
    // Hide main skills blocks
    document.getElementById('equipped-skills-block').style.display = "none";
    document.getElementById('skills-inventory-block').style.display = "none";
    document.getElementById('spin-skills-btn').style.display = "none";
    // Show gacha screen
    document.getElementById('skills-gacha-screen').classList.remove('hidden');
}

// Hide Gacha Spin Screen and return to skills menu
function hideSkillsGachaScreen() {
    document.getElementById('skills-gacha-screen').classList.add('hidden');
    document.getElementById('equipped-skills-block').style.display = "";
    document.getElementById('skills-inventory-block').style.display = "";
    document.getElementById('spin-skills-btn').style.display = "";
}

function renderSkillsMenu() {
    // Equipped Skills 
    const equippedDivs = document.querySelectorAll('#equipped-skills .skill-slot');
    equippedDivs.forEach((slotDiv, i) => {
        slotDiv.innerHTML = "";
        const skillId = equippedSkills[i];
        if (skillId) {
            const skillDef = getSkillDef(skillId);
            const playerSkill = getPlayerSkill(skillId);
            slotDiv.innerHTML = `
                <img src="${skillDef.img}" alt="${skillDef.name}" style="width:48px;height:48px;">
            `;
            slotDiv.className = `skill-slot rarity-${skillDef.rarity}`;
            // Add click to unequip
            slotDiv.onclick = () => unequipSkill(i);
        } else {
            slotDiv.className = "skill-slot";
            slotDiv.onclick = null;
        }
    });

    // Inventory Grid 
    const invDiv = document.getElementById('skills-inventory');
    invDiv.innerHTML = "";
    playerSkills.forEach(skill => {
        const skillDef = getSkillDef(skill.id);
        const card = document.createElement('div');
        card.className = `skill-card rarity-${skillDef.rarity}`;
        card.innerHTML = `
            <img src="${skillDef.img}" alt="${skillDef.name}" style="width:40px;height:40px;">
        `;
        card.onclick = () => showSkillDropdown(skill.id, card);
        invDiv.appendChild(card);
    });
}

// Skill Dropdown Logic
function showSkillDropdown(skillId, anchorEl) {
    const skill = getPlayerSkill(skillId);
    const skillDef = getSkillDef(skillId);
    if (!skill || !skillDef) return;

    // Remove any existing dropdown
    document.querySelectorAll('.skill-dropdown').forEach(el => el.remove());

    // Create dropdown
    const dropdown = document.createElement('div');
    dropdown.className = `item-dropdown skill-dropdown rarity-${skillDef.rarity}`;
    dropdown.innerHTML = `
        <button class="dropdown-close-btn" onclick="this.parentElement.remove()">✕</button>
        <div class="dropdown-name">${skillDef.name} <span style="color:#ffe082;">Lv${skill.level + 1}</span></div>
        <div class="dropdown-desc">${skillDef.description}</div>
        <div class="dropdown-rarity">${skillDef.rarity.charAt(0).toUpperCase() + skillDef.rarity.slice(1)}</div>
        <div><b>Buffs:</b> ${Object.entries(skillDef.buffs).map(([k, v]) => `${k}: +${v + skill.level * 2}`).join(', ')}</div>
        <div><b>Drawbacks:</b> ${Object.entries(skillDef.drawbacks).map(([k, v]) => `${k}: ${v - skill.level}`).join(', ')}</div>
        <button class="dropdown-btn use" onclick="equipSkill('${skillId}')">Equip</button>
        <button class="dropdown-btn upgrade" onclick="upgradeSkill('${skillId}')">
            Upgrade (${getUpgradeCost(skillDef.pool, skill.level, skillDef.rarity).cost}
            <img src="assets/img/items/${getUpgradeCost(skillDef.pool, skill.level, skillDef.rarity).gemId}.png" style="width:18px;vertical-align:middle;">)
        </button>
    `;

    // Position dropdown near the clicked card
    const rect = anchorEl.getBoundingClientRect();
    dropdown.style.position = "fixed";
    dropdown.style.left = `${rect.left + window.scrollX + 60}px`;
    dropdown.style.top = `${rect.top + window.scrollY - 80}px`;
    dropdown.style.zIndex = 2000;

    document.body.appendChild(dropdown);
}

// Track player's base stats and current stats without skills
function ensurePlayerBaseStats() {
    if (!player.baseStats) {
        player.baseStats = {
            maxHealth: player.maxHealth,
            health: player.health,
            xp: player.xp,
            attack: player.attack,
            defence: player.defence,
            attackSpeed: player.attackSpeed,
            xpGain: player.xpGain || 0,
            regen: player.regen || 0,
            speed: player.speed || 3,
            accuracy: player.accuracy || 0,
            resistance: player.resistance || 0
        };
    }
}

// Update baseStats if player stats change outside skills (e.g. leveling up)
function updatePlayerBaseStats() {
    ensurePlayerBaseStats();
    for (const stat in player.baseStats) {
        if (typeof player[stat] !== "undefined") {
            player.baseStats[stat] = player[stat];
        }
    }
}

// Apply a skill's effects to player stats
function applySkillEffect(skillId, direction = 1) {
    const skillDef = getSkillDef(skillId);
    const playerSkill = getPlayerSkill(skillId);
    if (!skillDef || !playerSkill) return;

    // Buffs
    for (const stat in skillDef.buffs) {
        let value = skillDef.buffs[stat] + playerSkill.level * 2;
        player[stat] = (player[stat] || 0) + direction * value;
    }
    // Drawbacks (reduced by resistance)
    let resistance = getTotalResistance();
    for (const stat in skillDef.drawbacks) {
        let value = skillDef.drawbacks[stat] - playerSkill.level;
        value += resistance; // Resistance reduces negative effect
        player[stat] = (player[stat] || 0) + direction * value;
    }
}

function getTotalResistance() {
    let resistance = 0;
    equippedSkills.forEach(skillId => {
        if (!skillId) return;
        const skillDef = getSkillDef(skillId);
        const playerSkill = getPlayerSkill(skillId);
        if (!skillDef || !playerSkill) return;
        resistance += (skillDef.buffs.resistance || 0) + (playerSkill.level * 2);
    });
    return resistance;
}

let regenInterval = null;

function updateRegenEffect() {
    // Clear previous interval
    if (regenInterval) {
        clearInterval(regenInterval);
        regenInterval = null;
    }

    // Calculate total regen from equipped skills
    let totalRegen = 0;
    equippedSkills.forEach(skillId => {
        if (!skillId) return;
        const skillDef = getSkillDef(skillId);
        const playerSkill = getPlayerSkill(skillId);
        if (!skillDef || !playerSkill) return;
        totalRegen += (skillDef.buffs.regen || 0) + (playerSkill.level * 2);
        totalRegen += (skillDef.drawbacks.regen || 0) - playerSkill.level;
    });

    if (totalRegen !== 0) {
        regenInterval = setInterval(() => {
            // Always show health bar while regen effect is active
            if (typeof drawPlayerHealthHUD === "function") drawPlayerHealthHUD();

            // Positive regen: heal until full
            if (totalRegen > 0 && player.health < player.maxHealth) {
                player.setHealth(player.health + totalRegen);
                // Hide health bar if full
                if (player.health >= player.maxHealth && typeof drawPlayerHealthHUD === "function") {
                    setTimeout(() => {
                        let bar = document.getElementById('player-health-bar-svg');
                        if (bar) bar.remove();
                    }, 1200);
                }
            }
            // Negative regen: drain health
            if (totalRegen < 0 && player.health > 0) {
                player.setHealth(player.health + totalRegen);
                // If health reaches 0, trigger death
                if (player.health <= 0 && typeof handlePlayerDeath === "function") {
                    handlePlayerDeath();
                }
            }
        }, 1000); // 1 second interval
    }
}

// Equip Skill Logic
function equipSkill(skillId) {
    if (equippedSkills.includes(skillId)) {
        notify(`That skill is already equipped!`, 1200);
        document.querySelectorAll('.skill-dropdown').forEach(el => el.remove());
        return;
    }
    const idx = equippedSkills.findIndex(s => !s);
    if (idx !== -1) {
        equippedSkills[idx] = skillId;
        applySkillEffect(skillId, 1);
        renderSkillsMenu();
        updateRegenEffect();
        updatePlayerMenuStats();
        document.querySelectorAll('.skill-dropdown').forEach(el => el.remove());
        notify(`Equipped ${getSkillDef(skillId).name}!`, 1200);
    }
}

// Unequip Skill Logic
function unequipSkill(slotIndex) {
    const skillId = equippedSkills[slotIndex];
    if (skillId) {
        applySkillEffect(skillId, -1);
        const skillDef = getSkillDef(skillId);
        equippedSkills[slotIndex] = null;
        renderSkillsMenu();
        updateRegenEffect();
        updatePlayerMenuStats();
        notify(`Unequipped ${skillDef.name}.`, 1200);
    }
}

// Upgrade Skill Logic
function getUpgradeCost(pool, level, rarity) {
    // Common: blue gem, Rare: red gem, Epic: pink gem, Legendary: double pink gem
    let cost = level + 1;
    let gemId = "blue_gem";
    if (rarity === "rare") {
        gemId = "red_gem";
    } else if (rarity === "epic") {
        gemId = "pink_gem";
    } else if (rarity === "legendary") {
        gemId = "pink_gem";
        cost *= 2; // Double cost for legendary
    }
    return { cost, gemId };
}

function isMaxLevel(level, maxLevel) { 
    if (level >= maxLevel) {
        return true;
    }
}

function upgradeSkill(skillId) {
    const skill = getPlayerSkill(skillId);
    const skillDef = getSkillDef(skillId);
    const { cost, gemId } = getUpgradeCost(skillDef.pool, skill.level, skillDef.rarity);
    const skillLevel = skill.level;
    const maxLevel = skillDef.maxLevel;
    if (!hasItem(gemId, cost)) {
        notify(`You need ${cost} ${ITEM_DEFINITIONS[gemId].name} to upgrade!`, 1800);
        return;
    }
    removeItem(gemId, cost);

    if (isMaxLevel(skillLevel, maxLevel - 1)) {
        notify("Max Level Reached");
        return;
    }

    if (equippedSkills.includes(skillId)) {
        applySkillEffect(skillId, -1);
    }

    skill.level += 1;
    notify(`Upgraded ${skillDef.name} to level ${skill.level + 1}!`, 1800);

    if (equippedSkills.includes(skillId)) {
        applySkillEffect(skillId, 1);
    }

    renderSkillsMenu();
    updateRegenEffect();
    updatePlayerMenuStats();
    document.querySelectorAll('.skill-dropdown').forEach(el => el.remove());
}

// Helper: Find skill definition by id
function getSkillDef(id) {
    return Skills.find(s => s.id === id);
}

// Helper: Get player's skill object by id
function getPlayerSkill(id) {
    return playerSkills.find(s => s.id === id);
}

// Helper: Add skill to inventory or upgrade if owned
function addOrUpgradeSkill(skillId) {
    let skill = getPlayerSkill(skillId);
    if (skill) {
        skill.level = (skill.level ?? 0) + 1;
        notify(`Upgraded ${getSkillDef(skillId).name} to level ${skill.level + 1}!`, 1800);
    } else {
        playerSkills.push({ id: skillId, level: 0 }); // Start at level 0
        notify(`Gained new skill: ${getSkillDef(skillId).name}!`, 1800);
    }
    renderSkillsMenu && renderSkillsMenu();
}

// Helper: Remove gem from inventory
function spendGem(gemId) {
    if (hasItem(gemId, 1)) {
        removeItem(gemId, 1);
        return true;
    } else {
        notify(`You need a ${ITEM_DEFINITIONS[gemId].name} to spin!`, 1800);
        return false;
    }
}

// Weighted random from pool
function weightedRandomSkill(pool) {
    // Include skills from the selected pool and from "all"
    const poolSkills = Skills.filter(s => s.pool === pool || s.pool === "all");
    const totalChance = poolSkills.reduce((sum, s) => sum + (s.chance || 1), 0);
    let rand = Math.random() * totalChance;
    for (const skill of poolSkills) {
        rand -= (skill.chance || 1);
        if (rand <= 0) return skill;
    }
    return poolSkills[poolSkills.length - 1];
}

// Spin animation logic
function spinGachaReel(pool, callback) {
    const reel = document.getElementById('skills-gacha-reel');
    // Include skills from the selected pool and from "all"
    const poolSkills = Skills.filter(s => s.pool === pool || s.pool === "all");
    let spinSequence = [];
    for (let i = 0; i < 18; i++) {
        spinSequence.push(poolSkills[Math.floor(Math.random() * poolSkills.length)]);
    }
    const winner = weightedRandomSkill(pool);
    spinSequence.push(winner);

    let idx = 0;
    function spinStep() {
        const skill = spinSequence[idx];
        reel.innerHTML = `<img src="${skill.img}" alt="${skill.name}" style="width:72px;height:72px;">`;
        idx++;
        if (idx < spinSequence.length) {
            let delay = 60 + Math.pow(idx, 1.5);
            setTimeout(spinStep, delay);
        } else {
            callback(winner);
        }
    }
    spinStep();
}


// Event listeners
document.getElementById('menu-btn').addEventListener('click', openMenu);
document.getElementById('close-menu').addEventListener('click', closeMenu);
document.getElementById('btn-inventory').addEventListener('click', showInventoryMenu);
document.getElementById('btn-quests').addEventListener('click', showQuestsMenu);
document.getElementById('btn-skills').addEventListener('click', showSkillsMenu);
document.getElementById('spin-skills-btn').addEventListener('click', showSkillsGachaScreen);
document.getElementById('btn-map').addEventListener('click', showMapMenu);
document.getElementById('btn-save').addEventListener('click', saveGame);
document.getElementById('btn-settings').addEventListener('click', showSettingsMenu);

// Gacha button event handlers
document.getElementById('skills-gacha-spin-blue').addEventListener('click', function() {
    if (!spendGem('blue_gem')) return;
    disableGachaButtons();
    spinGachaReel('blue', function(winner) {
        addOrUpgradeSkill(winner.id);
        enableGachaButtons();
    });
});
document.getElementById('skills-gacha-spin-red').addEventListener('click', function() {
    if (!spendGem('red_gem')) return;
    disableGachaButtons();
    spinGachaReel('red', function(winner) {
        addOrUpgradeSkill(winner.id);
        enableGachaButtons();
    });
});
document.getElementById('skills-gacha-spin-pink').addEventListener('click', function() {
    if (!spendGem('pink_gem')) return;
    disableGachaButtons();
    spinGachaReel('pink', function(winner) {
        addOrUpgradeSkill(winner.id);
        enableGachaButtons();
    });
});

// Remove dropdown on outside click
document.addEventListener('mousedown', function(e) {
    if (!e.target.closest('.skill-dropdown') && !e.target.closest('.skill-card')) {
        document.querySelectorAll('.skill-dropdown').forEach(el => el.remove());
    }
});

// Disable/enable gacha buttons during spin
function disableGachaButtons() {
    document.getElementById('skills-gacha-spin-blue').disabled = true;
    document.getElementById('skills-gacha-spin-red').disabled = true;
    document.getElementById('skills-gacha-spin-pink').disabled = true;
}
function enableGachaButtons() {
    document.getElementById('skills-gacha-spin-blue').disabled = false;
    document.getElementById('skills-gacha-spin-red').disabled = false;
    document.getElementById('skills-gacha-spin-pink').disabled = false;
}

function hideGameUI() {
    const ids = [
        "touch-controls",
        "act-controls",
        "menu-btn",
        "notification",
        "dialogue-block",
        "quest-hud",
        "player-menu"
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });
}

function showGameUI() {
    const ids = [
        "touch-controls",
        "act-controls",
        "menu-btn",
        "notification",
        "dialogue-block",
        "quest-hud",
        "player-menu"
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "";
    });
}