import { getSelectElement } from '../element'
import { madeChange } from '../../../Card/History/history'
import { Card, Element } from '../../../../types'

export function setColorFigure(card: Card, newColor: string): Card {
    const oldElement: Element | null = getSelectElement(card)
    const changeCard: Card = { 
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
    const newCard: Card = {
        ...changeCard,
        canvas: {
            ...changeCard.canvas,
            selectElement: getSelectElement(changeCard)
        }
    }
    madeChange(newCard, 'Fill Color', 'images/square.png')
    return newCard
}