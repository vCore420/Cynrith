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
            completed: [...playerQuests.completed]
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
        player.tile = { ...data.tile };
        player.pos = { ...data.pos };
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
        console.log("[Load] Quests patched:", playerQuests);
    }

    // Patch forced encounters
    if (typeof characters !== "undefined" && characters) {
        characters.forEach(npc => {
            if (npc.forcedEncounter) {
                npc.forcedEncounter.triggered = data.forcedEncounters.includes(npc.id);
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

    // Setup the game world
    if (typeof Setup === "function") {
        console.log("[Load] Calling Setup...");
        Setup(data.playerName, data.mapIndex); 
    }

    // Wait for map to be ready, then patch and warp
    let checkMap = setInterval(() => {
        console.log("[Load] Polling for map...", typeof map, map && map.data, map && map.data && map.data.layout);
        if (typeof map !== "undefined" && map && map.data && map.data.layout) {
            clearInterval(checkMap);
            console.log("[Load] Map loaded, applying save data...");
            applySaveData(data);

            // Warp to correct map and position
            if (typeof warpToMap === "function") {
                console.log("[Load] Warping to map:", data.mapIndex, "at", data.tile);
                warpToMap(data.mapIndex, "spawn");
                // After warp, set player position again in case spawn is not exact
                setTimeout(() => {
                    player.tile = { ...data.tile };
                    player.pos = { ...data.pos };
                    if (typeof updatePlayerMenuStats === "function") updatePlayerMenuStats();
                    if (typeof updateInventoryUI === "function") updateInventoryUI();
                    if (typeof updateQuestsUI === "function") updateQuestsUI("active");
                    notify("Game loaded!", 1800);
                    if (typeof onLoaded === "function") onLoaded();
                }, 400);
            }
        }
    }, 100);
}