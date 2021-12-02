import type { Triangle } from './Triangle/triangle'
import type { Rectangle } from './Rectangle/rectangle'
import type { Ellipse } from './Ellipse/ellipse'
import type { Card } from '../../../Card/card'
import { getSelectElement } from '../element'
import { madeChange } from '../../../Card/History/history'

export function setColorFigure(card: Card, newColor: string): Card {
    const oldElement = getSelectElement(card)
    const changeCard = { 
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if (element === oldElement) {
                    return {
                        ...element,
                        object: {
                            ...element.object,
                            color: newColor
                        }
                    }
                }
                return element
            })
        }
    }
    const newCard = {
        ...changeCard,
        canvas: {
            ...changeCard.canvas,
            selectElement: getSelectElement(card)
        }
    }
    madeChange(newCard, 'Fill Color', 'images/square.png')
    return newCard
}

export function isFigure(element: any): element is Figure {
    return (element as Figure).color !== undefined && (element as Figure).figure !== undefined
}

export type Figure = {
    color: string,
    figure: Triangle | Rectangle | Ellipse
}