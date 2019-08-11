/**
 * This module handles key presses.
 */
import { Action, ActionKind } from "./domain.js";

let ATK_PRESSED = false;

export function handleKeyPress(event: KeyboardEvent){
    switch (event.key){
        case "a":
        case "A":
            ATK_PRESSED = true;
            break;
    }
}

export function handleKeyDown(event: KeyboardEvent): Action | undefined {
    // if the attack button has been pressed, set the action to Attack
    // and clear the ATK_PRESSED input state
    let action: ActionKind = ATK_PRESSED ? "Attack" : "Move";
    ATK_PRESSED = false;

    switch (event.key) {
        case "ArrowLeft":
            event.preventDefault();
            return { direction: "West", kind: action };
        case "ArrowRight":
            event.preventDefault();
            return { direction: "East", kind: action };
        case "ArrowUp":
            event.preventDefault();
            return { direction: "North", kind: action };
        case "ArrowDown":
            event.preventDefault();
            return { direction: "South", kind: action };
    }
    return undefined;
}

export function handleKeyUp(event: KeyboardEvent): void {
    switch (event.key) {
        case "Enter":
            event.preventDefault();
            const chatMessageInput = <HTMLInputElement>(
                document.getElementById("chatMessageInput")
            );

            if (chatMessageInput === document.activeElement) {
                chatMessageInput.blur();
            } else {
                chatMessageInput.focus();
            }
    }
}
