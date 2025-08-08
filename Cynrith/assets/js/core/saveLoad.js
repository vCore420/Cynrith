// Save and Load Game Logic
let isLoadingSave = false;

// Get current save data as an object
function getCurrentSaveData() {
    return {
        playerName: player.playerName || player.name || "",
        sprite: player.sprite?.src || "",
        stats: {
            health: player.health,
            maxHealth: player.maxHealth,
            xp: player.xp,
            attack: player.attack,
            defence: player.defence,
            attackSpeed: player.attackSpeed
        },
        mapIndex: typeof currentMapIndex !== "undefined" ? currentMapIndex : 0,
        tile: { ...player.tile },
        pos: { ...player.pos },
        inventory: inventory.map((slot, i) => slot ? { ...slot, slot: i } : null),
        quests: {
            active: [...playerQuests.active],
            completed: [...playerQuests.completed],
            progress: { ...playerQuestProgress },
            statBuildStart: { ...statBuildQuestStart }
        },
        forcedEncounters: characters
            .filter(npc => npc.forcedEncounter && npc.forcedEncounter.triggered)
            .map(npc => npc.id)
    };
}


// Save game to localStorage (overwrites by playerName)
function saveGame() {
    const data = getCurrentSaveData();
    if (!data.playerName) {
        notify("Cannot save: Player name missing.", 2000);
        return;
    }
    localStorage.setItem("cynrith_save_" + data.playerName, JSON.stringify(data));
    notify("Game saved!", 1800);
}


// Load all saves (returns array of {playerName, stats, ...})
function getAllSaves() {
    const saves = [];
    for (let key in localStorage) {
        if (key.startsWith("cynrith_save_")) {
            try {
                const data = JSON.parse(localStorage.getItem(key));
                saves.push(data);
            } catch (e) {}
        }
    }
    return saves;
}


// Apply save data to the player
function applySaveData(data) {
    console.log("[Load] Applying save data:", data);

    // Patch player
    if (typeof player !== "undefined" && player) {
        player.playerName = data.playerName;
        player.sprite.src = data.sprite;
        Object.assign(player, data.stats);
        console.log("[Load] Player patched:", player);
    }

    // Patch inventory
    if (typeof inventory !== "undefined" && inventory) {
        inventory.length = 0;
        data.inventory.forEach((slot, i) => {
            if (slot) inventory[i] = { id: slot.id, amount: slot.amount };
        });
        console.log("[Load] Inventory patched:", inventory);
    }

    // Patch quests
    if (typeof playerQuests !== "undefined" && playerQuests) {
        playerQuests.active = [...data.quests.active];
        playerQuests.completed = [...data.quests.completed];
        // Restore quest progress and statBuild start values
        if (typeof playerQuestProgress !== "undefined" && data.quests.progress) {
            Object.assign(playerQuestProgress, data.quests.progress);
        }
        if (typeof statBuildQuestStart !== "undefined" && data.quests.statBuildStart) {
            Object.assign(statBuildQuestStart, data.quests.statBuildStart);
        }
        console.log("[Load] Quests patched:", playerQuests, playerQuestProgress, statBuildQuestStart);
    }

}


function patchForcedEncounters(data) {
    if (typeof characters !== "undefined" && characters) {
        characters.forEach(npc => {
            if (npc.forcedEncounter) {
                npc.forcedEncounter.triggered = data.forcedEncounters.includes(npc.id);
                console.log(`[Patch] NPC ${npc.id} forcedEncounter.triggered:`, npc.forcedEncounter.triggered);
            }
        });
        console.log("[Load] Forced encounters patched.");
    }
}


// Load a save by playerName
function loadGame(playerName, onLoaded) {
    console.log("[Load] loadGame called for:", playerName);
    const data = JSON.parse(localStorage.getItem("cynrith_save_" + playerName));
    if (!data) {
        notify("Save not found!", 2000);
        if (typeof onLoaded === "function") onLoaded();
        return false;
    }

    console.log("[Load] Raw save data:", localStorage.getItem("cynrith_save_" + playerName));
    console.log("[Load] Parsed save data:", data);

    isLoadingSave = true;
    window._pendingSaveData = data;

    // Setup the game world
    if (typeof Setup === "function") {
        console.log("[Load] Calling Setup...");
        Setup(data.playerName, data.mapIndex, data.sprite);
    }

    // Wait for map to be ready, then patch and warp
    let checkMap = setInterval(() => {
        console.log("[Load] Polling for map...", typeof map, map && map.data, map && map.data && map.data.layout);
        if (typeof map !== "undefined" && map && map.data && map.data.layout) {
            clearInterval(checkMap);
            console.log("[Load] Map loaded, applying save data...");
            applySaveData(data);
            patchForcedEncounters(data);

            // Set player position from save
            if (isLoadingSave) {
                player.tile.x = data.tile.x;
                player.tile.y = data.tile.y;
                player.pos.x = data.pos.x;
                player.pos.y = data.pos.y;
                isLoadingSave = false;
            }

            if (typeof updatePlayerMenuStats === "function") updatePlayerMenuStats();
            if (typeof updateInventoryUI === "function") updateInventoryUI();
            if (typeof updateQuestsUI === "function") updateQuestsUI("active");
            if (typeof updateQuestHUD === "function") updateQuestHUD();
            notify("Game loaded!", 1800);
            if (typeof onLoaded === "function") onLoaded();
        }
    }, 100);
}