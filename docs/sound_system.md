# Sound System Guide

This guide explains how to add, define, and use sounds throughout Cynrith.  
Sounds are a key part of the game’s atmosphere, feedback, and immersion.  
You can add background music, ambient sounds, interaction effects, combat sounds, and more.

---

## 1. Sound Asset Organization

- **Background Music:**  
  Place `.mp3` files in `assets/sound/`  
  Used for title screen and floors Background tracks.

- **Sound Effects (SFX):**  
  Place `.wav` files in `assets/sound/sfx/`  
  Organized by subfolders:
    - `world/` (tile footsteps, warps, ambient world sounds)
    - `items/` (item pickup, usage, rarity)
    - `player/` (player attack, hit, death)
    - `enemy/` (enemy ambient, attack, death)
    - `interactions/` (interactable/trigger tiles)
    - `ui/` (dialogue, menu, notifications)

---

## 2. Where Sounds Can Be Defined

### **A. Map JSON (assets/json/mapX.json)**
- **Background Music:**  
  Automatically loaded per map (e.g. `assets/sound/bg_map1.mp3`) naming your background music the same as your map
- **Tile Footsteps:**  
  In the `assets` array, set the `footsteps` property:
  ```json
  {"file_name":"grass-2","collision":0,"frames":0, "footsteps": "grass.wav"}
  ```

### **B. Tile Definitions**
- **Interactable/Trigger Tiles:**  
  In `interactTiles.js` and `triggerTiles.js`, add a `sound` object:
  ```javascript
  sound: {
      enabled: true,
      file: "statue_activate.wav",
      type: "trigger" // "loop", "ambient", or "trigger"
  }
  ```
  - `loop`: plays continuously when player is nearby
  - `ambient`: plays randomly when player is nearby
  - `trigger`: plays once when tile is triggered/interacted with

### **C. World Sprites**
- Yet to come 

### **D. NPCs & Enemies**
- **Ambient Sounds:**  
  Each enemy can have a sound file named after its ID in `assets/sound/sfx/enemy/`.  
  Played randomly when player is nearby.

### **E. Items**
- **Usage Sounds:**  
  Defined in item definition (`sound: 'health.wav'`), played when item is used.


---

## 3. How to Add a New Sound

1. **Place your sound file** in the correct folder (`assets/sound/` or `assets/sound/sfx/[type]/`).
2. **Reference the sound** in the relevant definition:
    - Map asset (`footsteps`)
    - Interactable/trigger tile (`sound` object)
    - Item (`sound` property)
    - Enemy (ambient sound by ID)
3. **Test in-game** to ensure the sound plays as expected.

---

## 4. SoundManager Usage

- **Play background music:**  
  ```javascript
  SoundManager.playBgMusic("assets/sound/bg_map1.mp3");
  ```
- **Play sound effect:**  
  ```javascript
  SoundManager.playEffect("assets/sound/sfx/items/rare.wav");
  ```
- **Fade music volume:**  
  ```javascript
  SoundManager.fadeBgMusicVolume(0.5, 800);
  ```
- **Mute/unmute:**  
  ```javascript
  SoundManager.muteAll(true); // mute
  SoundManager.muteAll(false); // unmute
  ```

---

## 5. Best Practices

- Use `.wav` for SFX and `.mp3` for music.
- Keep sound file names descriptive and organized.
- Test volume levels for each sound type.
- Avoid overlapping or looping sounds that clash with background music.
- Use ambient and trigger sounds for atmosphere, not constant repetition.

---

