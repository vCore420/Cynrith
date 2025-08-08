// NPC Interaction Logic

// Check for NPC interactions
function checkNpcInteraction() {
    characters.forEach(char => {
        if (char.type === "npc" && char.interactive) {
            const inRange =
                Math.abs(player.tile.x - char.x) <= 2 &&
                Math.abs(player.tile.y - char.y) <= 2;

            if (inRange) {
                if (!char.notifShown) {
                    notify(`Press the A button to talk to ${char.name}`, 2500);
                    char.notifShown = true;
                }
                if (actionButtonAPressed && char.dialogue && char.dialogue.default) {
                    // Stop wandering and face player
                    char.isInteracting = true;
                    char.movement.key = getDirectionKey(char.x, char.y, player.tile.x, player.tile.y);

                    // Start dialogue and resume wandering after
                    dialogue(...char.dialogue.default);
                    // Wait for dialogue to finish, then resume wandering
                    const block = document.getElementById('dialogue-block');
                    const resumeWander = () => {
                        char.isInteracting = false;
                        block.removeEventListener('transitionend', resumeWander);
                    };
                    // Listen for dialogue block hiding (when interaction ends)
                    block.addEventListener('transitionend', resumeWander);
                }
            } else {
                char.notifShown = false;
                char.isInteracting = false;
            }
        }
        // Add more interaction logic here next for quests, etc.
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
                controlsEnabled = false;
                npc.isInteracting = true;
                player.frozen = true;
                clearAllMovementKeys(); 
 
                npc._forcedEncounterInterval = setInterval(() => {
                    let dx = player.tile.x - Math.round(npc.x);
                    let dy = player.tile.y - Math.round(npc.y);

                    if (Math.abs(dx) + Math.abs(dy) > 1) {
                        npc.movement.key = getDirectionToFace(npc, player);
                        moveEnemyTowardPlayer(npc);
                        npc.movement.moving = true;
                    } else {
                        clearInterval(npc._forcedEncounterInterval);
                        npc._forcedEncounterInterval = null;
                        npc.forcedEncounter.triggered = true;
                        npc.forcedEncounterInProgress = false;
                        npc.forcedWalking = false; 
                        npc.isInteracting = true;
                        npc.movement.moving = false;
                        npc.movement.key = getDirectionToFace(npc, player);

                        dialogue(...npc.dialogue.default);
                    }
                }, 30);
            }
        }
    });
}
