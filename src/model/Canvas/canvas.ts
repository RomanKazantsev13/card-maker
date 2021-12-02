import type { Element } from './Element/element'
import { Card, initializationCard } from '../Card/card'
import { Template } from '../Card/Templates/templates'
import { madeChange } from '../Card/History/history'

export function setSizeCanvas(card: Card, newSize: Size): Card {
    const newCard = {
        ...card,
        canvas: {
            ...card.canvas,
            size: newSize
        }
    }
    madeChange(newCard, 'Resize Template', 'images/square.png')
    return newCard
}

export function resetCanvas(templates: Array<Template>): Card {
    return initializationCard(templates)
}

export function setBackgroundColor(card: Card, color: string): Card {
    const newCard = {
        ...card,
        canvas: {
            ...card.canvas,
            background: color
        }
    }
    madeChange(newCard, 'Background Color', 'images/square.png')
    return newCard
}

export function setBackgroundImage(card: Card, url: string): Card {
    const newCard = {
        ...card,
        canvas: {
            ...card.canvas,
            background: url
        }
    }
    madeChange(newCard, 'Background Image', 'images/image.png')
    return newCard
}


export type Canvas = {
    size: Size,
    selectElement: Element | null,
    background: string,
    elements: Array<Element>
}

type Size = {
    height: number,
    width: number
}