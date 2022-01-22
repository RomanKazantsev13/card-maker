import { uuid } from "uuidv4"
import { isEllipse, isFigure, isImage, isRectangle, isText, isTriangle } from "../../utils/typeGuards"
import { Canvas, Element, Point, Size } from "../../utils/types"

interface AddAndDeleteElementAction {
    type: string
}
interface AddImage {
    type: string,
    size: Size,
    url: string
}
interface SetCentre {
    type: string,
    centre: Point
}
interface SetColor {
    type: string,
    color: string
}
interface ResizeTriangle {
    type: string,
    centre: Point,
    points: {
        firstPoint: Point,
        secondPoint: Point,
        thirdPoint: Point
    }
}
interface ResizeFigure {
    type: string,
    centre: Point,
    size: Size
}
interface SetFont {
    type: string,
    font: string
}
interface ChangeText {
    type: string,
    str: string
}
interface SetSize {
    type: string,
    size: number
}

export type elementsActions = AddAndDeleteElementAction | AddImage | SetCentre | SetColor | ResizeTriangle | ResizeFigure | SetFont | ChangeText | SetSize

export default function elementsReducers(state = {} as Canvas, action: any): Array<Element> {
    let elements = state.elements
    switch (action.type) {
        case 'DELETE_SELECT_ELEMENT': {
            return elements.filter(element => element !== state.selectElement)
        }
        case 'ADD_TRIANGLE': {
            return elements.concat({
                centre: { x: 100, y: 100 },
                id: uuid(),
                object: {
                    color: '#888',
                    figure: {
                        firstPoint: { x: 100, y: 200 },
                        secondPoint: { x: 150, y: 100 },
                        thirdPoint: { x: 200, y: 200 }
                    }
                }
            })
        }
        case 'ADD_RECTANGLE': {
            return elements.concat({
                centre: { x: 50, y: 50 },
                id: uuid(),
                object: {
                    color: '#888',
                    figure: {
                        size: {
                            width: 100,
                            height: 75
                        }
                    }
                }
            })
        }
        case 'ADD_ELLIPSE': {
            return elements.concat({
                centre: { x: 150, y: 150 },
                id: uuid(),
                object: {
                    color: '#888',
                    figure: {
                        rx: 50,
                        ry: 50
                    }
                }
            })
        }
        case 'ADD_IMAGE': {
            return elements.concat({
                centre: { x: 0, y: 0 },
                id: uuid(),
                object: {
                    size: action.size,
                    url: action.url
                }
            })
        }
        case 'ADD_TEXT': {
            return elements.concat({
                centre: { x: 30, y: 350 },
                id: uuid(),
                object: {
                    fontSize: 20,
                    font: 'Time New Roman',
                    color: '#000',
                    str: 'Введите свой текст'
                }
            })
        }
    }
    return elements.map(element => {
        if (element === state.selectElement) {
            switch (action.type) {
                case 'SET_CENTRE_ELEMENT': {
                    return {
                        ...element,
                        centre: action.centre
                    }
                }
                case 'SET_COLOR_FIGURE': {
                    if (isFigure(element.object)) {
                        return {
                            ...element,
                            object: {
                                ...element.object,
                                color: action.color
                            }
                        }
                    }
                    return element
                }
                case 'RESIZE_TRIANGLE': {
                    if (isFigure(element.object) && isTriangle(element.object.figure)) {
                        return {
                            ...element,
                            centre: action.centre,
                            object: {
                                ...element.object,
                                figure: {
                                    firstPoint: action.points.firstPoint, 
                                    secondPoint: action.points.secondPoint, 
                                    thirdPoint: action.points.thirdPoint
                                }
                            }
                        }
                    }
                    return element
                }
                case 'RESIZE_RECTANGLE': {
                    if (isFigure(element.object) && isRectangle(element.object.figure)) {
                        return {
                            ...element,
                            centre: action.centre,
                            object: {
                                ...element.object,
                                figure: {
                                    size: action.size
                                }
                            }
                        }
                    }
                    return element
                }
                case 'RESIZE_ELLIPSE': {
                    if (isFigure(element.object) && isEllipse(element.object.figure)) {
                        return {
                            ...element,
                            centre: action.centre,
                            object: {
                                ...element.object,
                                figure: {
                                    rx: action.size.width / 2,
                                    ry: action.size.height / 2,
                                }
                            }
                        }
                    }
                    return element
                }
                case 'RESIZE_IMAGE': {
                    if (isImage(element.object)) {
                        return {
                            ...element,
                            centre: action.centre,
                            object: {
                                ...element.object,
                                size: action.size
                            }
                        }
                    }
                    return element
                }
                case 'SET_FONT_TEXT': {
                    if (isText(element.object)) {
                        return {
                            ...element,
                            object: {
                                ...element.object,
                                font: action.font
                            }
                        }
                    }
                    return element
                }
                case 'SET_COLOR_TEXT': {
                    if (isText(element.object)) {
                        return {
                            ...element,
                            object: {
                                ...element.object,
                                color: action.color
                            }
                        }
                    }
                    return element
                }
                case 'CHANGE_TEXT': {
                    if (isText(element.object)) {
                        return {
                            ...element,
                            object: {
                                ...element.object,
                                str: action.str
                            }
                        }
                    }
                    return element
                }
                case 'SET_SIZE_TEXT': {
                    if (isText(element.object)) {
                        return {
                            ...element,
                            object: {
                                ...element.object,
                                fontSize: action.size
                            }
                        }
                    }
                    return element
                }
                default: {
                    return element
                }
            }
        }
        return element
    })
}