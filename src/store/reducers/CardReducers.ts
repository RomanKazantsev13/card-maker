import { Canvas, Card, Stack } from "../../utils/types"
import canvasReducers from "./CanvasReducers"



export default function cardReducers(state = {} as Card, action: any): Card {
    const history = state.history
    let stack: Stack | undefined
    let canvas: Canvas
    switch (action.type) {
        case 'UNDO':
            stack = history.undo.pop()
            { stack !== undefined && pushStack(history.redo, stack) }
            canvas = history.undo[history.undo.length - 1].canvas
            return {
                canvas: {
                    ...canvas,
                    selectElement: null
                },
                history: history
            }
        case 'REDO':
            stack = history.redo.pop()
            { stack !== undefined && pushStack(history.undo, stack) }
            canvas = history.undo[history.undo.length - 1].canvas
            return {
                canvas: {
                    ...canvas,
                    selectElement: null
                },
                history: history
            }
        case 'INITIAL_CARD': {
            return {
                canvas: {
                    size: { width: 800, height: 600 },
                    selectElement: null,
                    background: '#FFF',
                    elements: []
                },
                history: {
                    undo: [],
                    redo: []
            
                }
            }
        }
        default: {
            canvas = canvasReducers(state.canvas, action)
            if (action.type !== 'SET_SELECT_ELEMENT' && action.type !== 'DELETE_SELECT_ELEMENT') {
                pushStack(history.undo, {
                    canvas: canvas,
                    name: getNameAndImageAction(action.type).name,
                    image: getNameAndImageAction(action.type).imageUrl
                })
            }
            return {
                canvas: canvas,
                history: history
            }
        }
    }
}

const maxStackValue: number = 500

function pushStack(stack: Array<Stack>, data: { canvas: Canvas, name: string, image: string }): void {
    if (stack.length > maxStackValue) {
        stack.shift()
    }
    stack.push({
        canvas: data.canvas,
        name: data.name,
        image: data.image,
    })
}

function getNameAndImageAction(actionName: string): { name: string, imageUrl: string } {
    switch (actionName) {
        case 'INITIAL_CARD': {
            return { name: 'New Template', imageUrl: 'images/square.png' }
        }
        case 'SET_SIZE_CANVAS': {
            return { name: 'Resize Template', imageUrl: 'images/square.png' }
        }
        case 'SET_BACKGROUND_COLOR': {
            return { name: 'Background Color', imageUrl: 'images/square.png' }
        }
        case 'SET_CENTRE_ELEMENT': {
            return { name: 'Change Position', imageUrl: 'images/move.png' }
        }
        case 'DELETE_SELECT_ELEMENT': {
            return { name: 'Delete Element', imageUrl: 'images/square.png' }
        }
        case 'SET_COLOR_FIGURE': {
            return { name: 'Fill Color', imageUrl: 'images/square.png' }
        }
        case 'ADD_TRIANGLE': {
            return { name: 'New Shape', imageUrl: 'images/triangle.png' }
        }
        case 'RESIZE_TRIANGLE': {
            return { name: 'Resize Graphic', imageUrl: 'images/triangle.png' }
        }
        case 'ADD_RECTANGLE': {
            return { name: 'New Shape', imageUrl: 'images/square.png' }
        }
        case 'RESIZE_RECTANGLE': {
            return { name: 'Resize Graphic', imageUrl: 'images/square.png' }
        }
        case 'ADD_ELLIPSE': {
            return { name: 'New Shape', imageUrl: 'images/circle.png' }
        }
        case 'RESIZE_ELLIPSE': {
            return { name: 'Resize Graphic', imageUrl: 'images/circle.png' }
        }
        case 'ADD_IMAGE': {
            return { name: 'Add Image', imageUrl: 'images/image.png' }
        }
        case 'RESIZE_IMAGE': {
            return { name: 'Resize Image', imageUrl: 'images/image.png' }
        }
        case 'ADD_TEXT': {
            return { name: 'New Text', imageUrl: 'images/text__hover.png' }
        }
        case 'SET_FONT_TEXT': {
            return { name: 'Font Family', imageUrl: 'images/text__hover.png' }
        }
        case 'SET_COLOR_TEXT': {
            return { name: 'Text Color', imageUrl: 'images/text__hover.png' }
        }
        case 'CHANGE_TEXT': {
            return { name: 'Edit Text', imageUrl: 'images/text__hover.png' }
        }
        case 'SET_SIZE_TEXT': {
            return { name: 'Font Size', imageUrl: 'images/text__hover.png' }
        }
        default: {
            return { name: 'New Template', imageUrl: 'images/square.png' }
        }
    }
}