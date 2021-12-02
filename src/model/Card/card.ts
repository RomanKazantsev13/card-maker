import type { Canvas } from '../Canvas/canvas'
import type { Template } from './Templates/templates'
import type { Element } from './../Canvas/Element/element'
import { madeChange, Stack } from './History/history'

export function initializationCard(newTemplates: Array<Template>): Card {
    const card = {
        allTemplates: {
            templates: newTemplates,
            customTemplates: []
        },
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
    madeChange(card, 'New Template', 'images/square.png')
    return card
}


export type Card = {
    allTemplates: {
        templates: Array<Template>,
        customTemplates: Array<Template>
    },
    canvas: Canvas,
    history: {
        undo: Array<Stack>,
        redo: Array<Stack>
    }
}


export type Point = {
    x: number,
    y: number
}

export type Size = {
    height: number,
    width: number
}
