import { Canvas, Card, Stack } from '../../../types'

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


export function madeChange(card: Card, name: string, image: string): void {
    pushStack(card.history.undo, { canvas: card.canvas, name: name, image: image })
    card.history.redo = []
}

export function undo(card: Card): Card {
    const data: Stack | undefined = card.history.undo.pop()
    if (data !== undefined) {
        pushStack(card.history.redo, data)
    }
    const newCanvas: Canvas = card.history.undo[card.history.undo.length - 1].canvas
    return {
        ...card,
        canvas: {
            ...newCanvas,
            selectElement: null
        }
    }
}

export function redo(card: Card): Card {
    const data: Stack | undefined = card.history.redo.pop()
    if (data !== undefined) {
        pushStack(card.history.undo, data)
    }
    const newCanvas: Canvas = card.history.undo[card.history.undo.length - 1].canvas
    return {
        ...card,
        canvas: {
            ...newCanvas,
            selectElement: null
        }
    }
}
