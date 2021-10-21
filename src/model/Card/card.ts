import type { Stack } from './History/history'
import type { Canvas } from '../Canvas/canvas'
import type { Template } from './Templates/templates'
import type { Element } from './../Canvas/Element/element'

export function initializationCard(newTemplates: Array<Template>): Card {
    return {
        allTemplates: {
            templates: newTemplates,
            customTemplates: [] as Template[]
        },
        canvas: {
            currentId: 0,
            size: { width: 800, height: 600 },
            selectElement: null,
            background: '#FFF',
            elements: [] as Element[]
        },
        history: {
            undo: {
                size: 0,
                maxSize: 20,
                storage: [] as Canvas[]
            },
            redo: {
                size: 0,
                maxSize: 20,
                storage: [] as Canvas[]
            }
        }
    }
}


export type Card = {
    allTemplates: {
        templates: Array<Template>,
        customTemplates: Array<Template>
    },
    canvas: Canvas,
    history: {
        undo: Stack,
        redo: Stack
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
