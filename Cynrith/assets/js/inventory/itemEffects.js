const ITEM_EFFECTS = {
    health_buff_small: function(player) {
        const heal = 10;
        const before = player.health;
        player.setHealth(player.health + heal);
        notify(`Restored ${player.health - before} health!`, 1500);
    },
    atk_buff_small: function(player) {
        player.addAttack(3);
        notify("Attack increased by 3!", 1500);
    }
    // Add more item effects here...
};

function useItem(itemId) {
    const def = ITEM_DEFINITIONS[itemId];
    if (!def || !def.useable) return false;
    if (!hasItem(itemId, 1)) return false;

    if (ITEM_EFFECTS[itemId]) {
        ITEM_EFFECTS[itemId](player);
        removeItem(itemId, 1);
        updateInventoryUI();
        if (typeof updateQuestHUD === "function") updateQuestHUD();
        return true;
    }
    return false;
}