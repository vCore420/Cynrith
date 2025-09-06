// Main Quest logic

// Player quest state
let playerQuests = {
    active: [],
    completed: []
};
let playerQuestProgress = {};
let statBuildQuestStart = {};


// Start a quest
function startQuest(questId) {
    const quest = QUEST_DEFINITIONS[questId];
    if (!quest) return;
    if (quest.type !== "gift" && !playerQuests.active.includes(questId)) {
        playerQuests.active.push(questId);
        if (quest.type === "enemyDefeat") {
            playerQuestProgress[questId] = 0;
        }
        if (quest.type === "statBuild") {
            statBuildQuestStart[questId] = player[quest.stat] || 0;
            playerQuestProgress[questId] = 0;
        }
        if (quest.type === "itemCollect") {
            playerQuestProgress[questId] = 0; 
        }
        if (quest.type === "interactTiles") {
            playerQuestProgress[questId] = 0;
        }
        if (typeof updateQuestHUD === "function") updateQuestHUD();
    }
    console.log(`[Quest] Started quest ${questId}:`, quest);
}


// Check if quest is complete
function tryCompleteQuest(questId) {
    const quest = QUEST_DEFINITIONS[questId];
    if (!quest) return false;

    const handlers = {
        itemCollect: () => {
            let hasAll = quest.requiredItems.every(req =>
                hasItem(req.id, req.amount)
            );
            if (hasAll) {
                quest.requiredItems.forEach(req => removeItem(req.id, req.amount));
                giveQuestRewards(quest.rewards);
                completeQuest(questId);
                return "complete";
            }
            return "incomplete";
        },
        enemyDefeat: () => {
            let count = playerQuestProgress[questId] || 0;
            if (count >= quest.requiredAmount) {
                giveQuestRewards(quest.rewards);
                completeQuest(questId);
                return "complete";
            }
            return "incomplete";
        },
        statBuild: () => {
            let statValue = player[quest.stat] || 0;
            let startValue = statBuildQuestStart[questId] || 0;
            if ((statValue - startValue) >= quest.requiredAmount) {
                giveQuestRewards(quest.rewards);
                completeQuest(questId);
                return "complete";
            }
            return "incomplete";
        },
        gift: () => {
            giveQuestRewards(quest.rewards);
            completeQuest(questId);
            return "complete";
        },
        interactTiles: () => {
            // Count triggered interactable tiles matching quest.interactTileIds
            let triggeredCount = quest.interactTileIds.filter(id => triggeredInteractableTiles[id]).length;
            if (triggeredCount >= quest.requiredAmount) {
                giveQuestRewards(quest.rewards);
                completeQuest(questId);
                return "complete";
            }
            return "incomplete";
        }
        // Add more quest types here as required
    };

    return handlers[quest.type] ? handlers[quest.type]() : false;
}


// Complete a quest, moving it to completed state
function completeQuest(questId) {
    const quest = QUEST_DEFINITIONS[questId];
    playerQuests.active = playerQuests.active.filter(id => id !== questId);

    if (quest && !quest.redoable && !playerQuests.completed.includes(questId)) {
        playerQuests.completed.push(questId);
    }

    if (typeof updateQuestHUD === "function") updateQuestHUD();

    console.log(`[Quest] Completed quest ${questId}`);
}


// Give quest rewards to player 
function giveQuestRewards(rewards) {
    // List of stat keys you want to support
    const statKeys = ["attack", "defence", "maxHealth", "attackSpeed"];
    rewards.forEach(reward => {
        if (reward.id) {
            addItem(reward.id, reward.amount || 1);
        } else if (typeof reward.xp === "number") {
            if (typeof player.addXP === "function") {
                player.addXP(reward.xp);
            } else if (typeof player.xp === "number") {
                player.xp += reward.xp;
            }
        }
        statKeys.forEach(stat => {
            if (typeof reward[stat] === "number") {
                const addFunc = player["add" + stat.charAt(0).toUpperCase() + stat.slice(1)];
                if (typeof addFunc === "function") {
                    addFunc.call(player, reward[stat]);
                } else if (typeof player[stat] === "number") {
                    player[stat] += reward[stat];
                }
            }
        });
    });
}


// Check if quest has been moved to completed state
function isQuestCompleted(questId) {
    return playerQuests.completed.includes(questId);
}

function isQuestReadyToComplete(questId) {
    const quest = QUEST_DEFINITIONS[questId];
    if (!quest) return false;
    if (!playerQuests.active.includes(questId)) return false;

    if (quest.type === "itemCollect") {
        return quest.requiredItems.every(req => hasItem(req.id, req.amount));
    }
    if (quest.type === "enemyDefeat") {
        return (playerQuestProgress[questId] || 0) >= quest.requiredAmount;
    }
    if (quest.type === "statBuild") {
        let statValue = player[quest.stat] || 0;
        let startValue = statBuildQuestStart[questId] || 0;
        return (statValue - startValue) >= quest.requiredAmount;
    }
    if (quest.type === "interactTiles") {
        let triggeredCount = quest.interactTileIds.filter(id => triggeredInteractableTiles[id]).length;
        return triggeredCount >= quest.requiredAmount;
    }
    return false;
}

function npcHasReadyQuest(npc) {
    if (!npc.questId) return false;
    return isQuestReadyToComplete(npc.questId);
}
