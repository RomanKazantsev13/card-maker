import type { Element } from './Element/element'
import { Card, initializationCard } from '../Card/card'
import { Template } from '../Card/Templates/templates'
import { madeChange } from '../Card/History/history'

export function setSizeCanvas(newSize: Size, card: Card): Card {
    madeChange(card)
    return {
        ...card,
        canvas: {
            ...card.canvas,
            size: newSize
        }
    }
}

export function resetCanvas(templates: Array<Template>, card: Card): Card {
    madeChange(card)
    //уточнить у пользователя действительно ли он хочет удалить Canvas
    return initializationCard(templates)
}

export function setBackgroundColor(color: string, card: Card): Card {
    madeChange(card)
    return {
        ...card,
        canvas: {
            ...card.canvas,
            background: color
        }
    }
}

export function setBackgroundImage(url: string, card: Card): Card {
    madeChange(card)
    return {
        ...card,
        canvas: {
            ...card.canvas,
            background: url
        }
    }
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