/* eslint-disable array-callback-return */
import type { Canvas } from '../../Canvas/canvas'
import type { Card } from './../card'

export let templates: Array<Template>

export function applyTemplate(card: Card, templateName: string): Card {
    const newCanvas: Canvas | undefined = card.allTemplates.customTemplates.find(template => template.name === templateName)?.canvas
        || card.allTemplates.templates.find(template => template.name === templateName)?.canvas
        || undefined
    return {
        ...card,
        canvas: newCanvas || card.canvas
    }
}

export function addTemplate(card: Card, template: {newCanvas: Canvas, templateName: string}): Card {
    // добавить проверку на пустой холст  
    return {
        ...card,
        allTemplates: {
            ...card.allTemplates,
            customTemplates: [
                ...card.allTemplates.customTemplates,
                {
                    name: template.templateName,
                    canvas: template.newCanvas
                }
            ]

        }
    }
}

export function deleteTemplate(card: Card, templateName: string): Card {
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