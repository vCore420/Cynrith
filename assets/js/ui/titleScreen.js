let selectedPlayerName = "";
let selectedPlayerSprite = ""; 

window.addEventListener("DOMContentLoaded", function() {
    const loreIntro = document.getElementById("lore-intro");
    const loreText = document.getElementById("lore-text");
    const btnNewGame = document.getElementById("btn-newgame");
    const skipBtn = document.getElementById("lore-skip-btn");

    loadTitleMap();
    hideGameUI();

    const overlay = document.createElement("div");
    overlay.id = "title-map-overlay";
    document.body.appendChild(overlay);

    // Sparkle effect
    const sparkles = document.getElementById("title-sparkles");
    function spawnSparkle() {
        if (!sparkles) return;
        const s = document.createElement("div");
        s.className = "sparkle";
        s.style.left = Math.random() * 100 + "vw";
        s.style.top = Math.random() * 100 + "vh";
        s.style.animationDuration = (2 + Math.random() * 2) + "s";
        sparkles.appendChild(s);
        setTimeout(() => sparkles.removeChild(s), 2500);
    }
    setInterval(spawnSparkle, 350);

    let gameStarted = false;
    let originalSetup = window.Setup;
    window.Setup = function(...args) {
        if (gameStarted || args[1] !== undefined) { 
            originalSetup(...args);
        }
    };

    // Character select elements
    const characterSelect = document.getElementById('character-select');
    const charList = document.getElementById('char-list');
    const charPreviewCanvas = document.getElementById('char-preview-canvas');
    const ctx = charPreviewCanvas.getContext('2d');
    const playerNameInput = document.getElementById('player-name-input');
    const charConfirmBtn = document.getElementById('char-confirm-btn');
    const charSelectClose = document.getElementById('char-select-close');
    const titleContent = document.querySelector('.title-content');

    // Sprite list (replace with actual sprite data, currently beta sprites are used)
    const sprites = [
      { name: "Hero", file: "assets/img/char/hero.png" },
      { name: "Mage", file: "assets/img/char/mage.png" },
      { name: "Rogue", file: "assets/img/char/rogue.png" }
    ];

    selectedPlayerSprite = sprites[0].file;
    
    // Sprite preview animation logic
    let selectedCharIdx = 0;
    let previewSprite = new Image();
    let previewAnimInterval = null;
    let previewMoving = false;
    const previewFrames = [0, 1, 2, 1]; 
    const frameWidth = 96;

    function drawPreviewSprite(idx, frame = 1) {
        ctx.clearRect(0, 0, charPreviewCanvas.width, charPreviewCanvas.height);
        previewSprite.src = sprites[idx].file;
        previewSprite.onload = function() {
            ctx.drawImage(
                previewSprite,
                frame * frameWidth, 0, frameWidth, frameWidth, 
                0, 0, frameWidth, frameWidth                   
            );
        };
       
        if (previewSprite.complete) {
            ctx.drawImage(
                previewSprite,
                frame * frameWidth, 0, frameWidth, frameWidth,
                0, 0, frameWidth, frameWidth
            );
        }
    }

    function selectCharacter(idx) {
        selectedCharIdx = idx;
        selectedPlayerSprite = sprites[idx].file;
        [...charList.children].forEach((li, i) => li.classList.toggle("selected", i === idx));
        drawPreviewSprite(idx, 1); 
    }

    // Animate on hover
    charPreviewCanvas.addEventListener('mouseenter', function() {
        if (previewAnimInterval) clearInterval(previewAnimInterval);
        let frameIdx = 0;
        previewMoving = true;
        previewAnimInterval = setInterval(() => {
            if (!previewMoving) return;
            drawPreviewSprite(selectedCharIdx, previewFrames[frameIdx]);
            frameIdx = (frameIdx + 1) % previewFrames.length;
        }, 160);
    });
    charPreviewCanvas.addEventListener('mouseleave', function() {
        previewMoving = false;
        if (previewAnimInterval) clearInterval(previewAnimInterval);
        drawPreviewSprite(selectedCharIdx, 1);
    });

    // Show character select when New Game is clicked
    btnNewGame.onclick = function() {
        titleContent.style.display = "none";
        characterSelect.classList.remove("hidden");
        // Populate list
        charList.innerHTML = "";
        sprites.forEach((sprite, idx) => {
            const li = document.createElement("li");
            li.textContent = sprite.name;
            li.dataset.idx = idx;
            if (idx === 0) li.classList.add("selected");
            li.onclick = () => selectCharacter(idx);
            charList.appendChild(li);
        });
        selectCharacter(0);
        playerNameInput.value = "";
    };

    // Confirm selection
    charConfirmBtn.onclick = function() {
        const playerName = playerNameInput.value.trim();
        if (!playerName) {
            playerNameInput.focus();
            playerNameInput.placeholder = "Please enter a name!";
            return;
        }
        selectedPlayerName = playerName;
        characterSelect.classList.add("hidden");
        // Fade out and continue to lore screen
        document.getElementById("title-fade").style.opacity = "1";
        if (window.SoundManager) {
            SoundManager.fadeBgMusicVolume(0, 800);
            setTimeout(() => SoundManager.stopBgMusic(), 900);
        }
        setTimeout(() => {
            document.getElementById("title-screen").style.display = "none";
            playLoreIntro();
            document.getElementById("title-fade").style.opacity = "0";
        }, 850);
    };

    // Close character select
    charSelectClose.onclick = function() {
        characterSelect.classList.add("hidden");
        titleContent.style.display = "";
    };

    // Load Game button
    const btnLoadGame = document.getElementById("btn-loadgame");

    btnLoadGame.onclick = function() {
        showLoadGameMenu();
    };

    let skipLore = false;
    let skipBtnShown = false;

    function endLoreAndStartGame() {
        if (skipLore) return;
        skipLore = true;
        loreText.style.opacity = 0;
        skipBtn.classList.remove("visible");
        setTimeout(() => {
            loreIntro.style.transition = "opacity 1.2s";
            loreIntro.style.opacity = 0;
            setTimeout(() => {
                loreIntro.style.display = "none";
                loreIntro.style.opacity = 1;
                gameStarted = true;
                showGameUI();
                window.Setup(selectedPlayerName, 0, selectedPlayerSprite); 
                console.log("[titleScreen] Game starting with player:", selectedPlayerName, selectedPlayerSprite);
            }, 1200);
        }, 200);
    }

    // Show skip button after first click/tap
    function showSkipBtn() {
        if (skipBtnShown) return;
        skipBtnShown = true;
        skipBtn.style.display = "block";
        setTimeout(() => skipBtn.classList.add("visible"), 50);
    }

    loreIntro.addEventListener("mousedown", showSkipBtn, { once: true });
    loreIntro.addEventListener("touchstart", showSkipBtn, { once: true });
    skipBtn.addEventListener("click", endLoreAndStartGame);

    function playLoreIntro() {
        unloadTitleMap();
        console.log("[titleScreen] New game started, Starting lore intro");
        loreIntro.style.display = "flex";
        skipLore = false;
        skipBtnShown = false;
        skipBtn.style.display = "none";
        skipBtn.classList.remove("visible");
        const lines = [
            "Cynrith is a vast, mystical world forged by the enigmatic and ever-watchful Architect, layered into vertically ascending “floors.”",
            "Each floor is a unique realm, shaped from fragments of lost worlds; with its own climate, culture, creatures, and secrets.",
            "Ancient magic courses through the land, but faint echoes of a deeper, unsettling design persist.",
            "Inhabitants speak naturally of quests, skills, and leveling as an accepted part of reality, hinting that Cynrith is more than just legend.",
            "Every step upward draws adventurers deeper into the Architect’s hidden game, where power is earned, but the true cost remains unknown..."
        ];
        let idx = 0;

        function showNextLine() {
            if (skipLore) return;
            if (idx >= lines.length) {
                endLoreAndStartGame();
                return;
            }
            loreText.textContent = lines[idx];
            loreText.style.opacity = 0;
            setTimeout(() => {
                loreText.style.opacity = 1;
                setTimeout(() => {
                    loreText.style.opacity = 0;
                    idx++;
                    setTimeout(showNextLine, 1800);
                }, 4800);
            }, 100);
        }
        showNextLine();
    }
});

function showLoadGameMenu() {
    const loadMenu = document.getElementById('load-game-menu');
    const saveList = document.getElementById('save-list');
    const confirmBtn = document.getElementById('loadgame-confirm-btn');
    const deleteBtn = document.getElementById('loadgame-delete-btn');
    const closeBtn = document.getElementById('loadgame-close');

    const saves = getAllSaves();

    loadMenu.classList.remove('hidden');
    saveList.innerHTML = "";
    confirmBtn.disabled = true;
    deleteBtn.disabled = true;

    let selectedIdx = null;

    saves.forEach((save, idx) => {
        const li = document.createElement('li');
        li.className = "save-list-item";

        // Floor info
        const floorNum = (save.mapIndex || 0) + 1;
        const floorName = FLOOR_NAMES[save.mapIndex] || "Unknown";

        // Sprite preview
        const spriteCanvas = document.createElement("canvas");
        spriteCanvas.width = 48;
        spriteCanvas.height = 48;
        spriteCanvas.style.verticalAlign = "middle";
        spriteCanvas.style.marginLeft = "auto";
        spriteCanvas.style.display = "block";

        const img = new window.Image();
        img.src = save.sprite;
        img.onload = function() {
            const ctx = spriteCanvas.getContext("2d");
            ctx.clearRect(0, 0, 48, 48);
            ctx.drawImage(img, 96, 0, 96, 96, 0, 0, 48, 48);
        };

        // Info container (left)
        const infoDiv = document.createElement("div");
        infoDiv.style.display = "flex";
        infoDiv.style.flexDirection = "column";
        infoDiv.style.gap = "2px";

        infoDiv.innerHTML = `
            <span style="font-size:1.15em;font-weight:700;">${save.playerName}</span>
            <span style="font-size:0.98em;color:#ffe082;">XP: ${save.stats.xp}</span>
            <span style="font-size:0.98em;color:#3af0ff;">Floor ${floorNum} <span style="color:#fff;">${floorName}</span></span>
        `;

        // Layout: info left, sprite right
        li.style.display = "flex";
        li.style.alignItems = "center";
        li.style.justifyContent = "space-between";
        li.appendChild(infoDiv);
        li.appendChild(spriteCanvas);

        li.onclick = () => {
            [...saveList.children].forEach(el => el.classList.remove('selected'));
            li.classList.add('selected');
            selectedIdx = idx;
            confirmBtn.disabled = false;
            deleteBtn.disabled = false;
        };
        saveList.appendChild(li);
    });

    confirmBtn.onclick = function() {
        if (selectedIdx === null) return;
        const save = saves[selectedIdx];
        loadMenu.classList.add('hidden');
        fadeOutTitleAndLoadGame(save.playerName);
        console.log(`[titleScreen] Loading game for ${save.playerName} on floor ${save.mapIndex + 1}`);
    };

    deleteBtn.onclick = function() {
        if (selectedIdx === null) return;
        const save = saves[selectedIdx];
        if (confirm(`Are you sure you want to delete the save for "${save.playerName}"? This cannot be undone.`)) {
            localStorage.removeItem("cynrith_save_" + save.playerName);
            console.log(`[titleScreen] Deleted save for ${save.playerName}`);
            showLoadGameMenu();
        }
    };

    closeBtn.onclick = function() {
        loadMenu.classList.add('hidden');
    };
}

function fadeOutTitleAndLoadGame(playerName) {
    document.getElementById("title-fade").style.opacity = "1";
    if (window.SoundManager) {
        SoundManager.fadeBgMusicVolume(0, 800);
        setTimeout(() => SoundManager.stopBgMusic(), 900);
    }
    setTimeout(() => {
        document.getElementById("title-screen").style.display = "none";
        showLoadingScreen(() => {
            loadGame(playerName, hideLoadingScreen);
            unloadTitleMap();
            showGameUI();
        });
    }, 850);
}

function showLoadingScreen(onLoaded) {
    const loadingScreen = document.getElementById('loading-screen');
    const carousel = document.getElementById('loading-carousel');
    const bar = document.getElementById('loading-bar');
    loadingScreen.classList.remove('hidden');

    // Carousel images
    const images = [
        "assets/img/mainMenu/img1.png",
        "assets/img/mainMenu/img2.png",
        "assets/img/mainMenu/img3.png"
    ];
    let idx = 0;
    carousel.style.backgroundImage = `url('${images[idx]}')`;
    let carouselInterval = setInterval(() => {
        idx = (idx + 1) % images.length;
        carousel.style.backgroundImage = `url('${images[idx]}')`;
    }, 1200);

    // Fake loading bar (Firm believer loading bars are full of it, so here's one that definitely is)
    console.log("[titleScreen] Playing time wasting loading bar");
    bar.style.width = "0%";
    let progress = 0;
    let barInterval = setInterval(() => {
        progress += Math.random() * 30 + 10;
        if (progress >= 100) progress = 100;
        bar.style.width = progress + "%";
        if (progress >= 100) {
            clearInterval(barInterval);
            clearInterval(carouselInterval);
            setTimeout(() => {
                onLoaded && onLoaded();
            }, 400);
        }
    }, 400);
}

function hideLoadingScreen() {
    document.getElementById('loading-screen').classList.add('hidden');
}