import { Canvas, Size } from "../../utils/types"

export function setSizeCanvas(size: Size) {
    return {
        type: 'SET_SIZE_CANVAS',
        size: size
    }
}

export function setBackgroundColor(color: string) {
    return {
        type: 'SET_BACKGROUND_COLOR',
        color: color
    }
}

export function addCanvasFromJSON(canvas: Canvas) {
    return {
        type: 'ADD_JSON',
        canvas: canvas
    }
}
