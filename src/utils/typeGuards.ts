import { Ellipse, Figure, Image, Rectangle, Text, Triangle } from "./types"

export function isImage(element: any): element is Image {
    return (element as Image).url !== undefined && (element as Image).size !== undefined
}

export function isText(element: any): element is Text {
    return (element as Text).font !== undefined && (element as Text).color !== undefined && (element as Text).str !== undefined && (element as Text).fontSize !== undefined
}

export function isFigure(element: any): element is Figure {
    return (element as Figure).color !== undefined && (element as Figure).figure !== undefined
}

export function isTriangle(figure: any): figure is Triangle {
    return (figure as Triangle).firstPoint !== undefined && (figure as Triangle).secondPoint !== undefined && (figure as Triangle).thirdPoint !== undefined
}

export function isRectangle(figure: any): figure is Rectangle {
    return (figure as Rectangle).size !== undefined
}

export function isEllipse(figure: any): figure is Ellipse {
    return (figure as Ellipse).rx !== undefined && (figure as Ellipse).ry !== undefined
}
