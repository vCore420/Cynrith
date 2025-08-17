// Screen Effects

// Fade overlay (used for npc interaction) - move to css 
let fadeOverlayAlpha = 0;

function updateScreenFadeOverlay() {
    const forcedActive = characters.some(npc => npc.forcedEncounterInProgress);
    const shouldShow = _dialogueActive || forcedActive;
    const target = shouldShow ? 1 : 0;
    const speed = 0.08;

    if (fadeOverlayAlpha < target) {
        fadeOverlayAlpha = Math.min(target, fadeOverlayAlpha + speed);
    } else if (fadeOverlayAlpha > target) {
        fadeOverlayAlpha = Math.max(target, fadeOverlayAlpha - speed);
    }
}

function drawScreenFadeOverlay() {
    if (fadeOverlayAlpha <= 0.01) return;

    context.save();
    let w = config.win.width;
    let h = config.win.height;
    let cx = w / 2;
    let cy = h / 2;
    let radius = Math.max(w, h) * 0.65;

    let grad = context.createRadialGradient(cx, cy, radius * 0.45, cx, cy, radius);
    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(0.6, "rgba(0,0,0,0.45)");
    grad.addColorStop(1, "rgba(0,0,0,0.92)");

    context.globalAlpha = fadeOverlayAlpha;
    context.fillStyle = grad;
    context.fillRect(0, 0, w, h);
    context.restore();
}
