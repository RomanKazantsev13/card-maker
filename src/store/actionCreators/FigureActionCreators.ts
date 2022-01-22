import { Point, Size } from "../../utils/types"

export function setColorFigure(color: string) {
    return {
        type: 'SET_COLOR_FIGURE',
        color: color
    }
}

export function addTriangle() {
    return {
        type: 'ADD_TRIANGLE'
    }
}

export function resizeTriangle(points: { firstPoint: Point, secondPoint: Point, thirdPoint: Point }, centre: Point) {
    return {
        type: 'RESIZE_TRIANGLE',
        points: points,
        centre: centre
    }
}

export function addRectangle() {
    return {
        type: 'ADD_RECTANGLE'
    }
}

export function resizeRectangle(size: Size, centre: Point) {
    return {
        type: 'RESIZE_RECTANGLE',
        size: size,
        centre: centre
    }
}

export function addEllipse() {
    return {
        type: 'ADD_ELLIPSE'
    }
}

export function resizeEllipse(size: Size, centre: Point) {
    return {
        type: 'RESIZE_ELLIPSE',
        size: size,
        centre: centre
    }
}