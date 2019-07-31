interface Message {
    id: string;
    text: string;
}
console.log('here');
const dummyData: Message[] = [
    {
        id: 'Frodo',
        text:
            'Ipsum iure laboriosam necessitatibus accusantium dolorum vero. Tempora repudiandae fugiat itaque temporibus sapiente. Iusto libero sapiente iste minima provident Dolore quis quia qui eveniet aliquid Totam quo debitis saepe harum?',
    },
    {
        id: 'Bilbo',
        text:
            'Ipsum iure laboriosam necessitatibus accusantium dolorum vero. Tempora repudiandae fugiat itaque temporibus sapiente. Iusto libero sapiente iste minima provident Dolore quis quia qui eveniet aliquid Totam quo debitis saepe harum?',
    },
    {
        id: 'Frodo',
        text:
            'Ipsum iure laboriosam necessitatibus accusantium dolorum vero. Tempora repudiandae fugiat itaque temporibus sapiente. Iusto libero sapiente iste minima provident Dolore quis quia qui eveniet aliquid Totam quo debitis saepe harum?',
    },
    {
        id: 'Bilbo',
        text:
            'Ipsum iure laboriosam necessitatibus accusantium dolorum vero. Tempora repudiandae fugiat itaque temporibus sapiente. Iusto libero sapiente iste minima provident Dolore quis quia qui eveniet aliquid Totam quo debitis saepe harum?',
    },
    {
        id: 'Frodo',
        text:
            'Ipsum iure laboriosam necessitatibus accusantium dolorum vero. Tempora repudiandae fugiat itaque temporibus sapiente. Iusto libero sapiente iste minima provident Dolore quis quia qui eveniet aliquid Totam quo debitis saepe harum?',
    },
    {
        id: 'Bilbo',
        text:
            'Ipsum iure laboriosam necessitatibus accusantium dolorum vero. Tempora repudiandae fugiat itaque temporibus sapiente. Iusto libero sapiente iste minima provident Dolore quis quia qui eveniet aliquid Totam quo debitis saepe harum?',
    },
];

/**
 * Take in a `Message` object and return an HTML string.
 */
const formatMessage = (data: Message): HTMLElement => {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
        <span class="username">${data.id.slice(
            -5
        )}</span> <span class="message-text">${data.text}</span>
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

export { dummyData, formatMessage, printMessage };
