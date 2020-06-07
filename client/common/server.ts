import { Action } from "./domain.js";

type EventType = "spawn" | "action" | "chat";

type ClientEvent = {
    event_type: EventType
    data:  {character_name: string} | Action
}

export function sendMessage(socket: any, eventType: EventType, message: Action | { character_name: string }){
    let event: ClientEvent = {
        event_type: eventType,
        data: message
    };
    socket.emit('event', event);
}

export function sendChatMessage(socket: any, message: string){
    socket.emit("chat", {
        body: message,
    });
}
