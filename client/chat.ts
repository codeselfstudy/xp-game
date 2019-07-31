import { sendChatMessage } from './server';

interface Message {
    id: string;
    body: string;
}

const chatData: Message[] = [];

/**
 * Take in a `Message` object and return an HTML string.
 */
const formatMessage = (data: Message): HTMLElement => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
        <span class="username">${data.id.slice(
            -5
        )}</span> <span class="message-body">${data.body}</span>
    `;
    return div;
};

/**
 * Take in a message string and append to the DOM.
 */
const printMessage = (message): void => {
    const messageOutputArea = document.getElementById('messages');
    messageOutputArea.appendChild(message);
};


export { chatData, formatMessage, printMessage };
