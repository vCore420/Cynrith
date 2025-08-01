// All quest definitions
const QUEST_DEFINITIONS = {
    bobs_gift: {
        id: "bobs_gift",
        name: "Bob's Gift",
        description: "A Gift from the dearest Bob.",
        type: "gift",
        requiredItems: [],
        rewards: [{ id: "sword", amount: 1 }, { xp: 20 }],
        redoable: false
    },
    slime_quest: {
        id: "slime_quest",
        name: "Slime Collection",
        description: "Defeat 3 slimes for Villager Jim.",
        type: "enemyDefeat",
        requiredEnemies: [{ id: "slime", amount: 3 }],
        rewards: [{ id: "potion", amount: 5 }, { xp: 20 }],
        redoable: true
    }
    // Add more quests here...
};

// Player quest state
let playerQuests = {
    active: [],      // Array of quest IDs
    completed: []    // Array of quest IDs
};

// Helper: Check if quest is completed
function isQuestCompleted(questId) {
    return playerQuests.completed.includes(questId);
}

// Helper: Start a quest
function startQuest(questId) {
    const quest = QUEST_DEFINITIONS[questId];
    if (!quest) return;
    // Only add non-gift quests to active
    if (quest.type !== "gift" && !playerQuests.active.includes(questId)) {
        playerQuests.active.push(questId);
    }
}

// Helper: Complete a quest
function completeQuest(questId) {
    if (!playerQuests.completed.includes(questId)) {
        playerQuests.completed.push(questId);
        // Remove from active if present
        playerQuests.active = playerQuests.active.filter(id => id !== questId);
    }
}

function giveQuestRewards(rewards) {
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
    });
}

function tryCompleteQuest(questId) {
    const quest = QUEST_DEFINITIONS[questId];
    if (!quest) return false;

    if (quest.type === "itemCollect") {
        let hasAll = quest.requiredItems.every(req =>
            hasItem(req.id, req.amount)
        );
        if (hasAll) {
            quest.requiredItems.forEach(req => removeItem(req.id, req.amount));
            giveQuestRewards(quest.rewards);
            completeQuest(questId);
            return "complete";
        } else {
            return "incomplete";
        }
    }

    if (quest.type === "gift") {
        giveQuestRewards(quest.rewards);
        completeQuest(questId);
        return "complete";
    }

    // Add other quest types here later
    return false;
}