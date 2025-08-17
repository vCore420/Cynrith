let traderShopOpen = false;
let currentTrader = null;

function openTraderShop(traderId) {
    traderShopOpen = true;
    controlsEnabled = false;
    currentTrader = TRADER_DEFINITIONS[traderId];
    document.getElementById('trader-shop-menu').classList.remove('hidden');
    updateTraderShopUI();
}

function closeTraderShop() {
    traderShopOpen = false;
    controlsEnabled = true;
    currentTrader = null;
    document.getElementById('trader-shop-menu').classList.add('hidden');
}

function openTraderShop(traderId) {
    traderShopOpen = true;
    controlsEnabled = false;
    currentTrader = TRADER_DEFINITIONS[traderId];
    document.getElementById('trader-shop-menu').classList.remove('hidden');
    updateTraderShopUI();
}

function closeTraderShop() {
    traderShopOpen = false;
    controlsEnabled = true;
    currentTrader = null;
    document.getElementById('trader-shop-menu').classList.add('hidden');
}

document.getElementById('trader-shop-close').onclick = closeTraderShop;

document.getElementById('tab-buy').onclick = function() {
    document.getElementById('tab-buy').classList.add('active');
    document.getElementById('tab-sell').classList.remove('active');
    document.getElementById('trader-shop-buy').classList.add('active');
    document.getElementById('trader-shop-sell').classList.remove('active');
};
document.getElementById('tab-sell').onclick = function() {
    document.getElementById('tab-sell').classList.add('active');
    document.getElementById('tab-buy').classList.remove('active');
    document.getElementById('trader-shop-sell').classList.add('active');
    document.getElementById('trader-shop-buy').classList.remove('active');
};

function updateTraderShopUI() {
    // Coins
    document.getElementById('trader-shop-coins-amount').textContent = getItemCount("money");

    // Buy page
    const buyDiv = document.getElementById('trader-shop-buy');
    buyDiv.innerHTML = "";
    currentTrader.buy.forEach(item => {
        const def = ITEM_DEFINITIONS[item.id];
        const div = document.createElement('div');
        div.className = "trader-shop-item";
        div.innerHTML = `
            <img src="${def.image}" alt="${def.name}">
            <span>${def.name}</span>
            <span style="color:#ffe082;">${item.price} <img src="assets/img/items/coin.png" style="width:18px;vertical-align:middle;"></span>
            <button class="trader-shop-btn" ${getItemCount("money") < item.price ? "disabled" : ""}>Buy</button>
        `;
        div.querySelector('.trader-shop-btn').onclick = function() {
            buyItem(item.id, item.price);
            updateTraderShopUI();
        };
        buyDiv.appendChild(div);
    });

    // Sell page
    const sellDiv = document.getElementById('trader-shop-sell');
    sellDiv.innerHTML = "";
    currentTrader.sell.forEach(item => {
        const def = ITEM_DEFINITIONS[item.id];
        const have = getItemCount(item.id);
        const div = document.createElement('div');
        div.className = "trader-shop-item";
        div.innerHTML = `
            <img src="${def.image}" alt="${def.name}">
            <span>${def.name}</span>
            <span style="color:#3af0ff;">${item.price} <img src="assets/img/items/coin.png" style="width:18px;vertical-align:middle;"></span>
            <button class="trader-shop-btn" ${have < 1 ? "disabled" : ""}>Sell</button>
        `;
        div.querySelector('.trader-shop-btn').onclick = function() {
            sellItem(item.id, item.price);
            updateTraderShopUI();
        };
        sellDiv.appendChild(div);
    });
}

// Buy item
function buyItem(itemId, price) {
    if (getItemCount("money") >= price) {
        removeItem("money", price);
        addItem(itemId, 1);
        notify(`Bought ${ITEM_DEFINITIONS[itemId].name} for ${price} coins.`, 1800);
    } else {
        notify("Not enough coins!", 1800);
    }
}

// Sell item
function sellItem(itemId, price) {
    if (hasItem(itemId, 1)) {
        removeItem(itemId, 1);
        addItem("money", price);
        notify(`Sold ${ITEM_DEFINITIONS[itemId].name} for ${price} coins.`, 1800);
    } else {
        notify("You don't have that item!", 1800);
    }
}
