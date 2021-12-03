import type { Card, Point } from '../../Card/card'
import type { Text } from './Text/text'
import type { Image } from './Image/image'
import type { Figure } from './Figure/figure'
import { madeChange } from '../../Card/History/history'

export function deleteSelectElement(card: Card): Card {
    const newElements = card.canvas.elements.filter(element => {
        if (element !== card.canvas.selectElement) {
            return element
        }
    })
    const newCard = {
        ...card,
        canvas: {
            ...card.canvas,
            selectElement: null,
            elements: newElements
        }
    }
    madeChange(newCard, 'Delete Element', 'images/square.png')
    return newCard
}

export function setSelectElement(card: Card, newElement: Element | null): Card {
    return {
        ...card,
        canvas: {
            ...card.canvas,
            selectElement: newElement
        }
    }
}

export function getSelectElement(card: Card): Element | null {
    const newSelectElement: Element | undefined = card.canvas.elements.find(element => 
        (card.canvas.selectElement !== null && card.canvas.selectElement.id == element.id)
    )
    return newSelectElement || null
}

export type Element = {
    centre: Point,
    id: string,
    object: Text | Image | Figure
}

