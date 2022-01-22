export type Card = {
    canvas: Canvas,
    history: {
        undo: Array<Stack>,
        redo: Array<Stack>
    }
}

export type Canvas = {
    size: Size,
    selectElement: Element | null,
    background: string,
    elements: Array<Element>
}

export type Stack = {
    canvas: Canvas,
    name: string,
    image: string,
}

export type Element = {
    centre: Point,
    id: string,
    object: Text | Image | Figure
}

export type Figure = {
    color: string,
    figure: Triangle | Rectangle | Ellipse
}

export type Triangle = {
    firstPoint: Point,
    secondPoint: Point,
    thirdPoint: Point
}

export type Rectangle = {
    size: Size
}

export type Ellipse = {
    rx: number,
    ry: number
}

export type Image = {
    size: Size,
    url: string
}

export type Text = {
    fontSize: number,
    font: string,
    color: string,
    str: string
}


export type Point = {
    x: number,
    y: number
}

export type Size = {
    height: number,
    width: number
}