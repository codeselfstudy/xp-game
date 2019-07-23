export function sendMessage(socket: any, message: string){
    socket.emit('json', {action: message});
}
