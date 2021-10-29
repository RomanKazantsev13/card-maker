import type { Canvas } from './../../Canvas/canvas'
import type { Card } from '../card'

const maxStackValue = 20

function pushStack(stack: Array<Canvas>, canvas: Canvas): void {
    if (stack.length > maxStackValue) {
        stack.pop()
    }
    stack.unshift(canvas)
}

function popStack(stack: Array<Canvas>, card: Card): Card {
    return {
        ...card,
        canvas: stack.shift() || card.canvas
    }
}



export function madeChange(card: Card): void {
    pushStack(card.history.undo, card.canvas)
    card.history.redo = [] as Canvas[]
}

export function redoRollback(card: Card): Card {
    pushStack(card.history.redo, card.canvas)
    return popStack(card.history.undo, card)
}

export function undoRollback(card: Card): Card {
    pushStack(card.history.undo, card.canvas)
    return popStack(card.history.redo, card)
}

