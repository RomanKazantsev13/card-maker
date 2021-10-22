import type { Canvas } from './../../Canvas/canvas'
import type { Card } from '../card'

const maxStackValue = 20

function pushStack(stack: Stack, card: Card): void {
    if (stack.size > maxStackValue) {
        delete stack.storage[0]
        for (let i = 1; i <= stack.size; i++) {
            stack.storage[i - 1] = stack.storage[i]
        }
    } else {
        stack.storage[stack.size] = card.canvas
        stack.size++
    }
}

function popStack(stack: Stack, card: Card): Card {
    if (stack.size == 0) {
        return card
    }
    stack.size--
    const elementStack: Canvas = stack.storage[stack.size]
    delete stack.storage[stack.size]
    return {
        ...card,
        canvas: elementStack
    }
}



export function madeChange(card: Card): void {
    pushStack(card.history.undo, card)
    card.history.redo = {
        size: 0,
        storage: [] as Canvas[]
    }
}

export function redoRollback(card: Card): Card {
    pushStack(card.history.redo, card)
    return popStack(card.history.undo, card)
}

export function undoRollback(card: Card): Card {
    pushStack(card.history.undo, card)
    return popStack(card.history.redo, card)
}

export type Stack = {
    size: number,
    storage: Array<Canvas>
}