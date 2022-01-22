import { Card, Element, Point } from '../../../types'
import { madeChange } from '../../Card/History/history'

export function setCentre(card: Card, position: Point): Card {
    const selectElement: Element | null = getSelectElement(card)
    const changeCard: Card = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if (element == selectElement) {
                    return {
                        ...element,
                        centre: position
                    }
                }
                return element
            })
        }
    }
    const newCard: Card = {
        ...changeCard,
        canvas: {
            ...changeCard.canvas,
            selectElement: getSelectElement(changeCard)
        }
    }
    madeChange(newCard, 'Change Position', 'images/move.png')
    return newCard
}

export function deleteSelectElement(card: Card): Card {
    const newElements: Array<Element> = card.canvas.elements.filter(element => {
        if (element !== card.canvas.selectElement) {
            return element
        }
    })
    const newCard: Card = {
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