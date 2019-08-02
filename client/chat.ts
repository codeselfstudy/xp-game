import { sendChatMessage } from "./server.js";

// Represents a chat message
interface Message {
    id: string;
    body: string;
}

// If we need to pre-populate the chat with previous messages, they get
// loaded from here.
export const chatData: Message[] = [
    // TODO change or remove this initial chat message
    {
        id: 'system',
        body: 'welcome'
    }
];

/**
 * Take in a `Message` object and return an HTML element with the chat
 * message.
 */
export function formatMessage(data: Message): HTMLElement {
    const div = document.createElement("div");
    div.classList.add("message");
    // TODO: a username or user ID would be better than a sliced random
    // ID here.
    div.innerHTML = `
        <span class="username">${data.id.slice(
            -7
        )}</span> <span class="message-body">${data.body}</span>
    `;
    return div;
}

/**
 * Take in a message's HTML element and append it to the DOM.
 */
export function printMessage(message): void {
    const messageOutputArea = document.getElementById("messages");
    messageOutputArea.appendChild(message);
}

/**
 * Send new messages
 */
export function initializeChatListener(socket): void {
    const chatForm: HTMLElement = document.getElementById("chatForm");

    chatForm.addEventListener("submit", (e): void => {
        e.preventDefault();
        const chatMessageInput = <HTMLInputElement>(
            document.getElementById("chatMessageInput")
        );
        const chatMessage: string = chatMessageInput.value.trim();
        chatMessageInput.value = "";
        console.log("from form:", chatMessage);
        sendChatMessage(socket, chatMessage);
    });

    socket.on("chat", (message): void => {
        console.log("from server:", message);
        const messageHtml = formatMessage(message);
        printMessage(messageHtml);
    });
}
