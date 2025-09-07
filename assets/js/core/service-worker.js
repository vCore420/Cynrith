const CACHE_NAME = "cynrith-cache-v1.02"; // Update this on bigger game updateds
const urlsToCache = [
  "/",
  "/index.html",
  "/assets/css/root.css",
  "/assets/css/hud.css",
  "/assets/css/dialogue.css",
  "/assets/css/playerMenu.css",
  "/assets/css/traderMenu.css",
  "/assets/css/titleScreen.css",
  "/assets/js/core/main.js",
  "/assets/js/core/preload.js",
  "/assets/js/core/saveLoad.js",
  "/assets/js/core/soundManager.js",
  "/assets/js/core/viewport.js",
  "/assets/js/DEFINITIONS/charactersData.js",
  "/assets/js/DEFINITIONS/interactTiles.js",
  "/assets/js/DEFINITIONS/items.js",
  "/assets/js/DEFINITIONS/quests.js",
  "/assets/js/DEFINITIONS/skills.js",
  "/assets/js/DEFINITIONS/traders.js",
  "/assets/js/DEFINITIONS/triggerTiles.js",
  "/assets/js/DEFINITIONS/worldSprites.js",
  "/assets/js/inventory/inventory.js",
  "/assets/js/inventory/itemEffects.js",
  "/assets/js/map/map.js",
  "/assets/js/map/mapInteractions.js",
  "/assets/js/map/mapWarping.js",
  "/assets/js/map/spriteLoader.js",
  "/assets/js/map/titleMap.js",
  "/assets/js/npc/interactions.js",
  "/assets/js/npc/movement.js",
  "/assets/js/npc/npc.js",
  "/assets/js/npc/npcTraders.js",
  "/assets/js/player/player.js",
  "/assets/js/player/playerControls.js",
  "/assets/js/player/playerDeath.js",
  "/assets/js/quest/questHandlers.js",
  "/assets/js/quest/questUi.js",
  "/assets/js/ui/combatUi.js",
  "/assets/js/ui/effects.js",
  "/assets/js/ui/menu.js",
  "/assets/js/ui/notify.js",
  "/assets/js/ui/titleScreen.js"
  
  // Only shell files here!
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached response if found
      if (response) return response;
      // Otherwise, fetch from network and cache it
      return fetch(event.request).then(networkResponse => {
        // Only cache GET requests and successful responses
        if (
          event.request.method === "GET" &&
          networkResponse &&
          networkResponse.status === 200 &&
          networkResponse.type === "basic"
        ) {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
          });
        }
        return networkResponse;
      });
    })
  );
});