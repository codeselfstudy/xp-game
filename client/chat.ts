import { sendChatMessage } from './server.js';

// Represents a chat message
interface Message {
    id: string;
    body: string;
}

// If we need to pre-populate the chat with previous messages, they get
// loaded from here.
const chatData: Message[] = [];

/**
 * Take in a `Message` object and return an HTML element with the chat
 * message.
 */
const formatMessage = (data: Message): HTMLElement => {
    const div = document.createElement('div');
    div.classList.add('message');
    // TODO: the username should eventually be better than a sliced random ID.
    div.innerHTML = `
        <span class="username">${data.id.slice(
            -5
        )}</span> <span class="message-body">${data.body}</span>
    `;
    return div;
};

/**
 * Take in a message's HTML element and append it to the DOM.
 */
const printMessage = (message): void => {
    const messageOutputArea = document.getElementById('messages');
    messageOutputArea.appendChild(message);
};

/**
 * Send new messages
 */
const initializeChatListener = (socket): void => {
    const chatForm: HTMLElement = document.getElementById('chatForm');

    chatForm.addEventListener('submit', (e): void => {
        e.preventDefault();
        const chatMessageInput = <HTMLInputElement>(
            document.getElementById('chatMessageInput')
        );
        const chatMessage: string = chatMessageInput.value.trim();
        chatMessageInput.value = '';
        console.log('from form:', chatMessage);
        sendChatMessage(socket, chatMessage);
    });

    socket.on('chat', (message): void => {
        console.log('from server:', message);
        const messageHtml = formatMessage(message);
        printMessage(messageHtml);
    });
};

export { chatData, formatMessage, printMessage, initializeChatListener };
