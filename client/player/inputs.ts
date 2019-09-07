/**
 * This module handles key presses.
 */
import { Action, ActionKind } from "../common/domain.js";

let KeyBindings = new Map<string, ActionKind>([
    ["a", "Attack"],
    ["q", "Dash"],
    ["w", "Aimed Shot"]
]);

export function initializeInputListeners(keyDownCallback: (arg: Action) => void) {
    let secondaryInput: { key: ActionKind | undefined } = { key: undefined };

    // These are extracted so that removeEventListener shape matches
    // addEventListener.
    function _handleKeydown(e) {
        if (isChatFocused()) { return; }
        let input = handleKeyDown(e, secondaryInput);
        if(input){ keyDownCallback(input); }
    }

    function _handleKeypress(e) {
        if (isChatFocused()) { return; }
        secondaryInput.key = handleKeyPress(e);
    }

    function subscribeInputListeners() {
        console.log('subscribeInputListners');
        document.addEventListener("keydown", _handleKeydown, false);
        document.addEventListener("keypress", _handleKeypress, false);
        document.addEventListener("keyup", focusChat);
    }

    function unsubscribeInputListeners() {
        console.log('unsubscribeInputListeners');
        document.removeEventListener("keydown", _handleKeydown, false);
        document.removeEventListener("keypress", _handleKeypress, false);
        document.removeEventListener("keyup", focusChat);
    }

    return [
        subscribeInputListeners,
        unsubscribeInputListeners,
    ];
}

function isChatFocused() {
    return document.activeElement.id === 'chatMessageInput';
}

function handleKeyPress(event: KeyboardEvent): ActionKind | undefined {
    return KeyBindings.get(event.key);
}

function handleKeyDown(event: KeyboardEvent, secondaryInput?: { key: ActionKind }): Action | undefined {
    // if a secondary input is set, perform that action and then clear the secondary input state
    let action: ActionKind = secondaryInput.key || "Move";
    secondaryInput.key = undefined;

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

function focusChat(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
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
