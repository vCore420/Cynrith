// Preload logic for Cynrith

let sfxCache = {};
let loadedCount = 0;
let totalToLoad = 0;
let preloadStarted = false;

const SFX_FILES = [
  "player/lvl_up.wav",
  "player/player_death.wav",
  "player/player_hit.wav",
  "player/sword_hit.wav",
  "player/sword_slash.wav",

  "ui/dialogue.wav",
  "ui/ui_open.wav",
  "ui/ui_close.wav",

  "items/atk.wav",
  "items/atkSpeed.wav",
  "items/common.wav",
  "items/def.wav",
  "items/epic.wav",
  "items/health.wav",
  "items/legendary.wav",
  "items/maxHealth.wav",
  "items/rare.wav",

  "world/concrete.wav",
  "world/dirt.wav",
  "world/glass-tile.wav",
  "world/grass.wav",
  "world/gravel.wav",
  "world/sand.wav",
  "world/warp.wav",
  "world/wood.wav",

  "enemy/plant_01.wav",
  "enemy/slime_01.wav",
  "enemy/dustback_beetle.wav",
  "enemy/echo_wisps.wav",
  "enemy/mistbound_ork.wav",
  "enemy/shardling.wav",
  "enemy/displaced_shadow.wav", 

  "interactions/buff_pickup.wav",   
  "interactions/echo.wav",    
  "interactions/glitching_statue.wav",     
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
    const btn = document.getElementById('enter-cynrith-btn');
    btn.textContent = "Welcome to Cynrith";
    setTimeout(() => {
      document.getElementById('preload-screen').style.display = "none";
      console.log("[PRELOADER] Entering Cynrith. Starting title screen music.");
      if (window.SoundManager) {
        SoundManager.playBgMusic("assets/sound/bg_title.mp3");
      }
    }, 1200); // Show "Welcome to Cynrith" for 1.2 seconds
  }
}

window.addEventListener("DOMContentLoaded", function() {
  const btn = document.getElementById('enter-cynrith-btn');
  btn.textContent = "Enter";
  btn.style.display = "block";

  btn.onclick = function() {
    if (preloadStarted) return;
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