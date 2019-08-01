import { sendAction, sendChatMessage } from "./server.js";
import {
    chatData,
    formatMessage,
    printMessage,
    initializeChatListener,
} from "./chat.js";
import { Vector, vector } from "./vectors.js"
import * as Vec from "./vectors.js"

declare var io: any;

type Canvas = {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
}

type Action = "Up" | "Down" | "Left" | "Right";


type World = {
    width: number;
    height: number;
    entities: Entity[];
}

type Entity = {
    position: Vector;
    client_id: string;
}

export function initialize(){
    var socket = io("http://localhost:5000");
    socket.on("connect", () => {sendAction(socket, "connected");});
    let scale = 50;
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let world: World = {
        width: 100,
        height: 100,
        entities: []
    };

    document.addEventListener("keydown", (e) => { sendAction(socket, handleInput(e)); }, false);
    socket.on("world", (state: World) => {
        world = state;
        update({canvas, ctx}, world, scale, socket.id);
    });

    // Load chat messages from the initial data (if any)
    const chatMessages: HTMLElement[] = chatData.map(msg => formatMessage(msg));
    chatMessages.forEach(msg => printMessage(msg));

    // Boot the chat system
    initializeChatListener(socket);
}

function update(c: Canvas, world: World, scale: number, clientId?: string) {
    c.ctx.clearRect(0,0, c.canvas.width, c.canvas.height);
    let player = world.entities.find(e=> e.client_id == clientId);
    let viewCenter = vector(4,3);
    let cameraWorld = player ? player.position : viewCenter;
    let viewOffset = Vec.subtract(cameraWorld, viewCenter);
    drawGrid(c, viewOffset, world.width, world.height, scale);
    world.entities.forEach((e) => {
        let localPos = Vec.subtract(e.position, viewOffset);
        let color = clientId == e.client_id ? "blue" : "red";
        draw(c, localPos, color, scale);
    });
}


function drawGrid(c: Canvas, viewOffset: Vector, width: number, height: number,  scale: number){
    function drawGridline(x1: number, y1: number, x2: number, y2: number){
        c.ctx.beginPath();
        c.ctx.moveTo(x1, y1);
        c.ctx.lineTo(x2, y2);
        c.ctx.stroke();
        c.ctx.closePath();
    }

    function drawBounds(x1: number, y1: number, width: number, height: number){
        c.ctx.beginPath();
        c.ctx.rect(x1, y1, width, height);
        c.ctx.fillStyle = "black";
        c.ctx.fill();
        c.ctx.closePath();
    }

    var n = scale;
    while(true){
        if(n > c.canvas.width+scale && n > c.canvas.height+scale){
            break;
        }
        if(scale < c.canvas.width){
            drawGridline(n, 0, n, c.canvas.height);
        }
        if(scale < c.canvas.height){
            drawGridline(0, n, c.canvas.width, n);
        }
        let localN = Vec.add(vector((n/scale)-1, (n/scale)-1), viewOffset);
        if(localN.x < 0 || localN.x >= width){
            drawBounds(n-scale, 0, scale, c.canvas.height);
        }
        if(localN.y < 0 || localN.y >= height){
            drawBounds(0, n-scale, c.canvas.width, scale);
        }
        n += scale;
    }
}

function draw(c: Canvas, position: Vector, color: string, scale: number){
    c.ctx.beginPath()
    c.ctx.rect(position.x*scale, position.y*scale,
               scale, scale);
    c.ctx.fillStyle = color;
    c.ctx.fill();
    c.ctx.closePath();
}

function handleInput(event: KeyboardEvent): Action | undefined {
    switch (event.key) {
        case "ArrowLeft":
            return "Left";
        case "ArrowRight":
            return "Right";
        case "ArrowUp":
            return "Up";
        case "ArrowDown":
            return "Down";
    }
    return undefined;
}

window.addEventListener("load", () => initialize());
