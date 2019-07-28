export type Vector = { x: number, y: number }
type V2 = Vector;

export function vector(x: number, y: number): Vector { return {x: x, y: y } }
export function zero(): V2 { return { x: 0, y: 0 }}
export function equals(a: V2, b: V2): boolean { return a.x == b.x && a.y == b.y; }
export function add(a: V2, b: V2): V2 {
    return {
        x: a.x + b.x,
        y: a.y + b.y
    }
}
export function subtract(a: V2, b: V2): V2 {
    return {
        x: a.x - b.x,
        y: a.y - b.y
    }
}
