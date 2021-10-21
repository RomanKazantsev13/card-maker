import type { Canvas } from '../../Canvas/canvas'
import type { Card } from './../card'

export let templates: Array<Template>

export function applyTemplate(templateName: string, card: Card): Card {
    let newCanvas: Canvas = card.canvas
    for (let i = 0; i < (card.allTemplates.customTemplates).length - 1; i++) {
        if (card.allTemplates.customTemplates[i].name == templateName) {
            newCanvas = card.allTemplates.customTemplates[i].canvas
        }
    }
    for (let i = 0; i < (card.allTemplates.templates).length - 1; i++) {
        if (card.allTemplates.templates[i].name == templateName) {
            newCanvas = card.allTemplates.templates[i].canvas
        }
    }
    return {
        ...card,
        canvas: newCanvas
    }
}

export function addTemplate(newCanvas: Canvas, templateName: string, card: Card): Card {
    // добавить проверку на пустой холст  
    return {
        ...card,
        allTemplates: {
            ...card.allTemplates,
            customTemplates: [
                ...card.allTemplates.customTemplates,
                {
                    name: templateName,
                    canvas: newCanvas
                }
            ]

        }
    }
}

export function deleteTemplate(templateName: string, card: Card): Card {
    const newCustomTemplate = card.allTemplates.customTemplates.filter(template => {
        if (template.name !== templateName) {
            return template
        }
    })
    return {
        ...card,
        allTemplates: {
            ...card.allTemplates,
            customTemplates: newCustomTemplate
        }
    }
}

export type Template = {
    name: string,
    canvas: Canvas
}