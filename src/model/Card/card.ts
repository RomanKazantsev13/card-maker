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
            size: { width: 800, height: 600 },
            selectElement: null,
            background: '#FFF',
            elements: [] as Element[]
        },
        history: {
            undo: [] as Canvas[],
            redo: [] as Canvas[]

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
        undo: Array<Canvas>,
        redo: Array<Canvas>
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
