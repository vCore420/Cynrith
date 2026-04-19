// NPC Interaction Logic

let triggeredForcedEncounters = {};
const NPC_INTERACTION_COOLDOWN = 800; // Cooldown between Interactions in milliseconds

function hasPendingForcedEncounter(npc) {
    return !!(
        npc &&
        npc.forcedEncounter &&
        npc.forcedEncounter.enabled &&
        !npc.forcedEncounter.triggered
    );
}

// Check for NPC interactions
function checkNpcInteraction() {
    if (_dialogueActive) {
        characters.forEach(char => {
            if (char.type === "npc") {
                char.notifShown = false;
            }
        });

        if (typeof hideNotification === "function") {
            hideNotification();
        }

        return;
    }
    
    const now = Date.now();

    characters.forEach(char => {
        if (char.type !== "npc" || !char.interactive) return;

        const inRange =
            Math.abs(player.tile.x - char.x) <= 2 &&
            Math.abs(player.tile.y - char.y) <= 2;

        const blockedFromManualInteraction =
            hasPendingForcedEncounter(char) || char.forcedEncounterInProgress;

        if (blockedFromManualInteraction) {
            char.notifShown = false;
            return;
        }

        if (inRange) {
            if (!char.notifShown) {
                notify(`Press the A button (Keyboard E) to talk to ${char.name}`, 2500);
                char.notifShown = true;
            }

            if (
                actionButtonAPressed &&
                char.dialogue &&
                char.dialogue.default &&
                (!player.lastNpcInteractionTime ||
                    now - player.lastNpcInteractionTime > NPC_INTERACTION_COOLDOWN)
            ) {
                console.log(`[NPC Interaction] Talking to ${char.name}`);

                char.isInteracting = true;
                char.movement.key = getDirectionKey(char.x, char.y, player.tile.x, player.tile.y);

                if (char.trader && typeof openTraderShop === "function") {
                    onDialogueClosed = () => openTraderShop(char.trader);
                }

                dialogue(...char.dialogue.default);

                const block = document.getElementById("dialogue-block");
                const resumeWander = () => {
                    char.isInteracting = false;
                    block.removeEventListener("transitionend", resumeWander);
                    console.log(`[NPC Interaction] Dialogue ended for ${char.name}, Npc resuming wander`);
                };

                block.addEventListener("transitionend", resumeWander);
            }
        } else {
            char.notifShown = false;
            char.isInteracting = false;
        }
    });
}

// Forced npc encounter logic
function checkForcedEncounters() {
    characters.forEach(npc => {
        if (
            npc.type === "npc" &&
            npc.forcedEncounter &&
            npc.forcedEncounter.enabled &&
            !npc.forcedEncounter.triggered &&
            !npc.forcedEncounterInProgress
        ) {
            const onTrigger = npc.forcedEncounter.triggerTiles.some(
                t => player.tile.x === t.x && player.tile.y === t.y
            );

            if (onTrigger) {
                npc.forcedEncounterInProgress = true;
                npc.forcedWalking = true;
                npc.notifShown = false;

                if (typeof hideNotification === "function") {
                    hideNotification();
                }

                controlsEnabled = false;
                npc.isInteracting = true;
                player.frozen = true;
                clearAllMovementKeys();

                console.log(`[ForcedEncounter] NPC ${npc.id} forced encounter triggered`);

                npc._forcedEncounterInterval = setInterval(() => {
                    const dx = player.tile.x - Math.round(npc.x);
                    const dy = player.tile.y - Math.round(npc.y);

                    if (Math.abs(dx) + Math.abs(dy) > 1) {
                        npc.movement.key = getDirectionToFace(npc, player);
                        moveEnemyTowardPlayer(npc);
                    } else {
                        clearInterval(npc._forcedEncounterInterval);

                        npc.forcedEncounter.triggered = true;
                        triggeredForcedEncounters[npc.id] = true;
                        npc.forcedEncounterInProgress = false;
                        npc.forcedWalking = false;
                        npc.isInteracting = true;
                        npc.movement.moving = false;
                        npc.movement.key = getDirectionToFace(npc, player);

                        dialogue(...npc.dialogue.default);
                        console.log(`[ForcedEncounter] NPC ${npc.id} forced encounter completed`);
                    }
                }, 30);
            }
        }
    });
}