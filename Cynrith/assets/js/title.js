window.addEventListener("DOMContentLoaded", function() {
    const loreIntro = document.getElementById("lore-intro");
    const loreText = document.getElementById("lore-text");
    const btnNewGame = document.getElementById("btn-newgame");
    const skipBtn = document.getElementById("lore-skip-btn");

    const titleScreen = document.getElementById("title-screen");
    const bgImages = [
        "assets/img/mainMenu/img1.jpg",
        "assets/img/mainMenu/img2.jpg",
        "assets/img/mainMenu/img3.jpg"
        // Add more player sprites here for full release
    ];
    const chosen = bgImages[Math.floor(Math.random() * bgImages.length)];
    titleScreen.style.background = `url('${chosen}') center center / cover no-repeat, #111`;
    titleScreen.style.transition = "background-image 1.2s cubic-bezier(.4,0,.2,1)";

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
    window.Setup = function() {
        if (gameStarted) originalSetup();
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

    // Example sprite list (replace with actual sprite data, currently beta sprites are used)
    const sprites = [
      { name: "Hero", file: "assets/img/char/hero.png" },
      { name: "Mage", file: "assets/img/char/mage.png" },
      { name: "Rogue", file: "assets/img/char/rogue.png" }
    ];

    // Sprite preview animation logic
    let selectedCharIdx = 0;
    let previewSprite = new Image();
    let previewAnimInterval = null;
    let previewMoving = false;
    const previewFrames = [0, 1, 2, 1]; // Walking animation frame indices
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
        // If already loaded, draw immediately
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
        [...charList.children].forEach((li, i) => li.classList.toggle("selected", i === idx));
        drawPreviewSprite(idx, 1); // Idle frame
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
        drawPreviewSprite(selectedCharIdx, 1); // Idle frame
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
        playerNameInput.focus();
    };

    // Confirm selection
    charConfirmBtn.onclick = function() {
        const playerName = playerNameInput.value.trim();
        if (!playerName) {
            playerNameInput.focus();
            playerNameInput.placeholder = "Please enter a name!";
            return;
        }
        // Save player name and sprite as needed here
        characterSelect.classList.add("hidden");
        // Fade out and continue to lore screen
        document.getElementById("title-fade").style.opacity = "1";
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
                window.Setup();
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
                    setTimeout(showNextLine, 900);
                }, 4200);
            }, 100);
        }
        showNextLine();
    }
});