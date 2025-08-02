window.addEventListener("DOMContentLoaded", function() {
    const titleScreen = document.getElementById("title-screen");
    const loreIntro = document.getElementById("lore-intro");
    const loreText = document.getElementById("lore-text");
    const btnNewGame = document.getElementById("btn-newgame");
    const skipBtn = document.getElementById("lore-skip-btn");

    let gameStarted = false;
    let originalSetup = window.Setup;
    window.Setup = function() {
        if (gameStarted) originalSetup();
    };

    btnNewGame.onclick = function() {
        titleScreen.style.display = "none";
        playLoreIntro();
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
            "Each floor is a unique realm—shaped from fragments of lost worlds—with its own climate, culture, creatures, and secrets.",
            "Ancient magic courses through the land, but faint echoes of a deeper, unsettling design persist.",
            "Inhabitants speak naturally of quests, skills, and leveling as an accepted part of reality, hinting that Cynrith is more than just legend.",
            "Every step upward draws adventurers deeper into the Architect’s hidden game, where power is earned, but the true cost remains unknown."
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