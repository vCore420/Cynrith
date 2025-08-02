// All quest definitions
const QUEST_DEFINITIONS = {
    eldrin_intro: {
        id: "eldrin_intro",
        name: "Eldrin's Introduction",
        description: "A Gift from the dearest Eldrin.",
        type: "gift",
        requiredItems: [],
        rewards: [{ id: "sword", amount: 1 }, { xp: 20 }],
        redoable: false
    },
    dewleaf_gather: {
        id: "dewleaf_gather",
        name: "Dewleaf Gathering",
        description: "Collect 3 Dewleaf from Vicious Plants.",
        type: "itemCollect",
        requiredItems: [{ id: "dewleaf", amount: 3 }],
        rewards: [{ id: "potion", amount: 2 }, { xp: 20 }],
        redoable: true
    },
    slime_cull: {
        id: "slime_cull",
        name: "Slime Cull",
        description: "Defeat 3 Groovy Slimes.",
        type: "itemCollect",
        requiredItems: [{ id: "slime_balls", amount: 3 }],
        rewards: [{ id: "potion", amount: 2 }, { xp: 20 }],
        redoable: true
    },
    rook_gift: {
        id: "rook_gift",
        name: "Rook's Gift",
        description: "A Gift from the wise Old Rook.",
        type: "gift",
        requiredItems: [],
        rewards: [{ id: "atk_buff", amount: 1 }, { xp: 20 }],
        redoable: false
    },
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