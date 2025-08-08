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
        if (typeof updateQuestHUD === "function") updateQuestHUD();
    }
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
            if (statValue >= quest.requiredAmount) {
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
        }
        // Add more quest types here as required
    };

    return handlers[quest.type] ? handlers[quest.type]() : false;
}


// Complete a quest, moving it to completed state
function completeQuest(questId) {
    if (!playerQuests.completed.includes(questId)) {
        playerQuests.completed.push(questId);
        playerQuests.active = playerQuests.active.filter(id => id !== questId);
        if (typeof updateQuestHUD === "function") updateQuestHUD();
    }
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

