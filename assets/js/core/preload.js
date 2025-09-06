// Preload logic for Cynrith

let sfxCache = {};
let loadedCount = 0;
let totalToLoad = 0;
let preloadStarted = false;

const SFX_FILES = [
  "player/lvl_up.mp3",
  "player/player_death.mp3",
  "player/player_hit.mp3",
  "player/sword_hit.mp3",
  "player/sword_slash.mp3",

  "ui/dialogue.mp3",
  "ui/ui_open.mp3",
  "ui/ui_close.mp3",

  "items/atk.mp3",
  "items/atkSpeed.mp3",
  "items/common.mp3",
  "items/def.mp3",
  "items/epic.mp3",
  "items/health.mp3",
  "items/legendary.mp3",
  "items/maxHealth.mp3",
  "items/rare.mp3",
  "items/remove.mp3",

  "world/concrete.mp3",
  "world/dirt.mp3",
  "world/glass-tile.mp3",
  "world/grass.mp3",
  "world/gravel.mp3",
  "world/sand.mp3",
  "world/warp.mp3",
  "world/wood.mp3",

  "enemy/plant_01.mp3",
  "enemy/slime_01.mp3",
  "enemy/dustback_beetle.mp3",
  "enemy/echo_wisps.mp3",
  "enemy/mistbound_ork.mp3",
  "enemy/shardling.mp3",
  "enemy/displaced_shadow.mp3", 

  "interactions/buff_pickup.mp3",   
  "interactions/echo.mp3",    
  "interactions/glitching_statue.mp3",     
];

function updatePreloadBar() {
  const bar = document.getElementById('preload-bar');
  bar.style.width = Math.round((loadedCount / totalToLoad) * 100) + "%";
}

function preloadSFX() {
  SFX_FILES.forEach(file => {
    const audio = new Audio("assets/sound/sfx/" + file);
    audio.preload = "auto";
    audio.oncanplaythrough = () => {
      loadedCount++;
      updatePreloadBar();
      sfxCache[file] = audio;
      console.log(`[Preloader - SFX] Loaded: ${file}`);
      checkPreloadComplete();
    };
    audio.onerror = () => {
      loadedCount++;
      updatePreloadBar();
      console.warn(`[Preloader - SFX] Failed to load: ${file}`);
      checkPreloadComplete();
    };
    console.log(`[Preloader - SFX] Started loading: ${file}`);
  });
}

function preloadTitleMap() {
  // Simulate map loading (replace with actual map load logic if needed)
  console.log("[Preloader - MAP] Started loading title map...");
  setTimeout(() => {
    loadedCount++;
    updatePreloadBar();
    console.log("[Preloader - MAP] Finished loading title map.");
    checkPreloadComplete();
  }, 800); // Simulate delay
}

function checkPreloadComplete() {
  if (loadedCount >= totalToLoad) {
    window.sfxCache = sfxCache;
    const btn = document.getElementById('enter-cynrith-btn');
    btn.textContent = "Welcome!";
    setTimeout(() => {
      document.getElementById('preload-screen').style.display = "none";
      console.log("[PRELOADER] Entering Cynrith. Starting title screen music.");
      if (window.SoundManager) {
        SoundManager.playBgMusic("assets/sound/bg_title.mp3");
      }
    }, 1200); // Show "Welcome" for 1.2 seconds
  }
}

window.addEventListener("DOMContentLoaded", function() {
  const btn = document.getElementById('enter-cynrith-btn');
  btn.textContent = "Enter";
  btn.style.display = "block";

  btn.onclick = function() {
    if (preloadStarted) return;

    // Unlock audio context for iOS/Safari
    try {
      const unlockAudio = new Audio("assets/sound/sfx/ui/click.mp3");
      unlockAudio.volume = 0.01;
      unlockAudio.play().catch(() => {});
    } catch (e) {
      // Ignore errors
    }

    preloadStarted = true;
    btn.textContent = "Loading...";
    btn.disabled = true;
    loadedCount = 0;
    totalToLoad = SFX_FILES.length + 1;
    updatePreloadBar();
    preloadSFX();
    preloadTitleMap();
  };
});