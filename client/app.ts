interface Canvas {
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
}

type Action = "Up" | "Down" | "Left" | "Right";

interface World {
    scale: number;
    entities: Entity[];
    input?: Action;
}

interface Entity {
    x: number,
    y: number,
    color?: string
    controlled?: boolean
}

export function initialize(){
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const world: World = {
        scale: 50,
        entities: [
            {x: 0, y: 0, color: "blue", controlled: true},
            {x: 2, y: 5},
            {x: 10, y: 10},
        ]
    };

    document.addEventListener("keydown", (e) => { world.input = handleInput(e) }, false);
    setInterval(() => update({canvas, ctx}, world), 200);
}

function update(c: Canvas, world: World) {
    c.ctx.clearRect(0,0, c.canvas.width, c.canvas.height);
    drawGrid(c, world.scale);
    world.entities.forEach((e) => {
        draw(c, e, world.scale);
        if(e.controlled){
            move(e, world.input)
        }
    })
    world.input = undefined;
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

function move(transform: Entity, action: Action){
    switch(action){
        case "Left":
            transform.x--;
            break;
        case "Right":
            transform.x++;
            break;
        case "Up":
            transform.y--;
            break;
        case "Down":
            transform.y++;
            break;
        default:
            break;
    }
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
