export function sendMessage(socket: any, message: string){
    socket.emit('action', {action: message});
}
