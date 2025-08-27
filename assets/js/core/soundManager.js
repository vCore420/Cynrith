// Cynrith Sound Manager - Handles background music and sound effects

const SoundManager = {
    bgMusic: null,
    bgMusicVolume: 0.1,
    effectVolume: 0.6,
    muted: false,

    playBgMusic(src, loop = true) {
        if (this.bgMusic) {
            this.bgMusic.pause();
            this.bgMusic = null;
        }
        this.bgMusic = new Audio(src);
        this.bgMusic.loop = loop;
        this.bgMusic.volume = this.muted ? 0 : this.bgMusicVolume;
        this.bgMusic.play();
    },

    stopBgMusic() {
        if (this.bgMusic) {
            this.bgMusic.pause();
            this.bgMusic.currentTime = 0;
        }
    },

    setBgMusicVolume(vol) {
        this.bgMusicVolume = vol;
        if (this.bgMusic) this.bgMusic.volume = this.muted ? 0 : vol;
    },

    fadeBgMusicVolume(targetVol, duration = 1000) {
        if (!this.bgMusic) return;
        clearTimeout(this.bgMusicFadeTimeout);
        const startVol = this.bgMusic.volume;
        const steps = 20;
        const stepTime = duration / steps;
        let currentStep = 0;
        const fadeStep = () => {
            currentStep++;
            const newVol = startVol + (targetVol - startVol) * (currentStep / steps);
            this.bgMusic.volume = this.muted ? 0 : newVol;
            if (currentStep < steps) {
                this.bgMusicFadeTimeout = setTimeout(fadeStep, stepTime);
            } else {
                this.bgMusic.volume = this.muted ? 0 : targetVol;
            }
        };
        fadeStep();
    },

    playEffect(src) {
        if (this.muted) return;
        const effect = new Audio(src);
        effect.volume = this.effectVolume;
        effect.play();
    },

    setEffectVolume(vol) {
        this.effectVolume = vol;
    },

    muteAll(mute) {
        this.muted = mute;
        if (this.bgMusic) this.bgMusic.volume = mute ? 0 : this.bgMusicVolume;
    }
};

function playFootstepSoundForCurrentTile() {
    if (!map || !map.data || !map.data.assets || !player || !player.tile) return;

    const tileX = player.tile.x;
    const tileY = player.tile.y;

    // Use all layers, topmost first
    let layers = map.data._layers || [map.data.layout];

    for (let l = layers.length - 1; l >= 0; l--) {
        const layer = layers[l];
        if (!layer || !layer[tileY] || typeof layer[tileY][tileX] === "undefined") continue;
        const gid = layer[tileY][tileX];
        let tileIndex = map.data._gidMap ? map.data._gidMap[gid] : gid - 1;
        if (tileIndex !== null && map.data.assets[tileIndex] && map.data.assets[tileIndex].footsteps) {
            SoundManager.playEffect(`assets/sound/sfx/world/${map.data.assets[tileIndex].footsteps}`);
            return; // Play only the first valid sound found
        }
    }
}

// Example usage:
// SoundManager.playBgMusic("assets/sound/bg_floor1.mp3");
// SoundManager.playEffect("assets/sound/item_pickup.mp3");
// SoundManager.muteAll(true);
// SoundManager.fadeBgMusicVolume(0.2, 1500); // Fade to 20% volume over 1.5s

window.SoundManager = SoundManager;