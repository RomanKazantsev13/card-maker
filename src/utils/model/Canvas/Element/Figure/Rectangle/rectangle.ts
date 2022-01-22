import { madeChange } from '../../../../Card/History/history'
import { getSelectElement } from '../../element'
import { uuid } from 'uuidv4';
import { Card, Element, Point, Size } from '../../../../../types';
import { isFigure, isRectangle } from '../../../../../typeGuards';

export function addRectangle(card: Card): Card {
    const newCard: Card = {
        ...card,
        canvas: {
            ...card.canvas,
            selectElement: null,
            elements: [
                ...card.canvas.elements,
                {
                    centre: { x: 50, y: 50 },
                    id: uuid(),
                    object: {
                        color: '#888',
                        figure: {
                            size: {
                                width: 100,
                                height: 75
                            }
                        }
                    }
                }
            ]
        }
    }
    madeChange(newCard, 'New Shape', 'images/square.png')
    return newCard
}

export function resizeRectangle(card: Card, rectangle: {newSize: Size, newCentre: Point}): Card {
    const oldElement: Element | null = getSelectElement(card)
    const changeCard: Card = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if ((element === oldElement) && (isFigure(element.object)) && (isRectangle(element.object.figure))) {
                    return {
                        ...element,
                        centre: rectangle.newCentre,
                        object: {
                            ...element.object,
                            figure: {
                                size: rectangle.newSize
                            }
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
    madeChange(newCard, 'Resize Graphic', 'images/square.png')
    return newCard
}

