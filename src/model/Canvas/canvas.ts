import type { Element } from './Element/element'
import { Card, initializationCard } from '../Card/card'
import { templates } from '../Card/Templates/templates'

export function setSizeCanvas(newSize: Size, card: Card): Card {
    return {
        ...card,
        canvas: {
            ...card.canvas,
            size: newSize
        }
    }
}

export function deleteCanvas(): Card {
    //уточнить у пользователя действительно ли он хочет удалить Canvas
    return initializationCard(templates)
}

export function setBackgroundColor(color: string, card: Card): Card {
    return {
        ...card,
        canvas: {
            ...card.canvas,
            background: color
        }
    }
}

export function setBackgroundImage(url: string, card: Card): Card {
    return {
        ...card,
        canvas: {
            ...card.canvas,
            background: url
        }
    }
}


export type Canvas = {
    currentId: number,
    size: Size,
    selectElement: Element | null,
    background: string,
    elements: Array<Element>
}

type Size = {
    height: number,
    width: number
}