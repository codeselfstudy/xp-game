export function sendAction(socket: any, message: string){
    socket.emit("action", { action: message });
}

export function sendChatMessage(socket: any, message: string){
    socket.emit("chat", {
        body: message,
    });
}
