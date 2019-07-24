import { sendMessage } from "./server.js";
declare var io: any;

type Canvas = {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
}

type Action = "Up" | "Down" | "Left" | "Right";

type World = {
    scale: number;
    entities: Entity[];
}

type Entity = {
    x: number,
    y: number,
    color?: string
}

export function initialize(){
    var socket = io('http://localhost:5000');
    socket.on('connect', () => sendMessage(socket, "connected"));
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const world: World = {
        scale: 50,
        entities: []
    };
    document.addEventListener("keydown", (e) => { sendMessage(socket, handleInput(e)) }, false);
    socket.on('world', (state) => {
        let entities = Object.keys(state.entities).map(e=> ({
            x: state.entities[e][0], y: state.entities[e][1],
            color: socket.id == e ? "blue" : undefined
        }));
        world.entities = entities;
    });
    setInterval(() => update({canvas, ctx}, world), 100);
}

function update(c: Canvas, world: World) {
    c.ctx.clearRect(0,0, c.canvas.width, c.canvas.height);
    drawGrid(c, world.scale);
    world.entities.forEach((e) => {
        draw(c, e, world.scale);
    })
}

function drawGrid(c: Canvas, scale: number){
    function drawGridline(x1: number, y1: number, x2: number, y2: number){
        c.ctx.beginPath();
        c.ctx.moveTo(x1, y1);
        c.ctx.lineTo(x2, y2);
        c.ctx.stroke();
        c.ctx.closePath();
    }
    
    var n = scale;
    while(true){
        if(n >= c.canvas.width && n >= c.canvas.height){
            break;
        }

        if(scale < c.canvas.width){ 
            drawGridline(n, 0, n, c.canvas.height);
        }
        if(scale < c.canvas.height){ 
            drawGridline(0, n, c.canvas.width, n);
        }
        n += scale;
    }
}

function draw(c: Canvas, thing: Entity, scale: number){
    c.ctx.beginPath()
    c.ctx.rect(thing.x*scale, thing.y*scale, scale, scale);
    c.ctx.fillStyle = thing.color || "red";
    c.ctx.fill();
    c.ctx.closePath();
}

function handleInput(event: KeyboardEvent): Action | undefined {
    switch (event.key) {
        case "ArrowLeft":
            return "Left";
        case "ArrowRight":
            return "Right"
        case "ArrowUp":
            return "Up";
        case "ArrowDown":
            return "Down";
    }
    return undefined;
};


window.addEventListener('load', () => initialize())
