const ITEM_EFFECTS = {
    health_buff_small: function(player, amount = 1) {
        const heal = 10 * amount;
        const before = player.health;
        player.setHealth(player.health + heal);
        notify(`Restored ${player.health - before} health!`, 1800);
    },
    atk_buff_small: function(player, amount = 1) {
        player.addAttack(3 * amount);
        notify(`Attack increased by ${3 * amount}!`, 1800);
    },
    def_buff_small: function(player, amount = 1) {
        player.addDefence(3 * amount);
        notify(`Defence increased by ${3 * amount}!`, 1800);
    },
    maxHealth_buff_small: function(player, amount = 1) {
        player.addMaxHealth(10 * amount);
        notify(`Max Health increased by ${10 * amount}!`, 1800);
    },
    atkSpeed_buff_small: function(player, amount = 1) {
        player.addAttackSpeed(10 * amount);
        notify(`Attack Speed increased by ${10 * amount}!`, 1800);
    },
    health_buff_large: function(player, amount = 1) {
        const heal = 30 * amount;
        const before = player.health;
        player.setHealth(player.health + heal);
        notify(`Restored ${player.health - before} health!`, 1800);
    },
    atk_buff_large: function(player, amount = 1) {
        player.addAttack(18 * amount);
        notify(`Attack increased by ${18 * amount}!`, 1800);
    },
    def_buff_large: function(player, amount = 1) {
        player.addDefence(15 * amount);
        notify(`Defence increased by ${15 * amount}!`, 1800);
    },
    maxHealth_buff_large: function(player, amount = 1) {
        player.addMaxHealth(30 * amount);
        notify(`Max Health increased by ${30 * amount}!`, 1800);
    },
    atkSpeed_buff_large: function(player, amount = 1) {
        player.addAttackSpeed(20 * amount);
        notify(`Attack Speed increased by ${20 * amount}!`, 1800);
    },
    glassberry_tea: function(player, amount = 1) {
        const before = player.health;
        player.setHealth(player.maxHealth);
        notify(`You feel restored! Health fully regenerated (${player.maxHealth - before}).`, 1800);
    },
    umbra_tonic: function(player, amount = 1) {
        const boost = 8 * amount;
        player.addDefence(boost);
        notify(`Defence increased by ${boost}!`, 1800);
    },
    clarity_tincture: function(player, amount = 1) {
        const heal = 30 * amount;
        const before = player.health;
        player.setHealth(player.health + heal);
        notify(`Restored ${player.health - before} health!`, 1800);
    },
    mirror_tonic: function(player, amount = 1) {
        const boost = 15 * amount;
        player.addAttackSpeed(boost);
        notify(`Attack Speed increased by ${boost}!`, 1800);
    },
    fresh_fish: function(player, amount = 1) {
        const heal = 50 * amount;
        const before = player.health;
        player.setHealth(player.health + heal);
        notify(`Restored ${player.health - before} health!`, 1800);
    },
    inventory_page: function(player, amount = 1) {
        unlockInventoryPage(amount);
    },
    key_without_a_door: function(player, amount = 1) {
        if (typeof warpToMap !== "function") return;
        if (typeof currentMapIndex !== "undefined" && String(currentMapIndex) === "home_plot0") {
            notify("You are already at your Home Plot.", 1800);
            return;
        }

        // Close player menu only for this special item
        if (typeof closeMenu === "function") {
            closeMenu();
        } else {
            // Fallback if menu function isn't loaded for some reason
            const playerMenu = document.getElementById("player-menu");
            if (playerMenu) playerMenu.classList.add("hidden");
            controlsEnabled = true;
        }

        window.homePlotReturnMap = currentMapIndex;
        warpToMap("home_plot0", "spawn");
        notify("This place feels... yours.", 2200);
    },
    // Add more item effects here...
};

function useItem(itemId, amount = 1) {
    const def = ITEM_DEFINITIONS[itemId];
    if (!def || !def.useable) return false;
    if (!hasItem(itemId, amount)) return false;

    if (window.SoundManager && def.sound) {
        SoundManager.playEffect("assets/sound/sfx/items/" + def.sound);
    }

    if (ITEM_EFFECTS[itemId]) {
        ITEM_EFFECTS[itemId](player, amount);

        const consumeOnUse = def.consumeOnUse !== false;
        if (consumeOnUse) {
            removeItem(itemId, amount);
        }

        updateInventoryUI();
        if (typeof updateQuestHUD === "function") updateQuestHUD();
        return true;
    }
    return false;
}