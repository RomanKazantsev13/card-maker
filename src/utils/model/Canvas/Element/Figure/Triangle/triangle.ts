import { madeChange } from '../../../../Card/History/history'
import { getSelectElement } from '../../element'
import { uuid } from 'uuidv4';
import { Card, Element, Point } from '../../../../../types';
import { isFigure } from '../../../../../typeGuards';

export function addTriangle(card: Card): Card {
    const newCard: Card = {
        ...card,
        canvas: {
            ...card.canvas,
            selectElement: null,
            elements: [
                ...card.canvas.elements,
                {
                    centre: { x: 100, y: 100 },
                    id: uuid(),
                    object: {
                        color: '#888',
                        figure: {
                            firstPoint: { x: 100, y: 200 },
                            secondPoint: { x: 150, y: 100 },
                            thirdPoint: { x: 200, y: 200 }
                        }
                    }
                }
            ]
        }
    }
    madeChange(newCard, 'New Shape', 'images/triangle.png')
    return newCard
}

export function resizeTriangle(card: Card, triangle: {points: {firstPoint: Point, secondPoint: Point, thirdPoint: Point}, centre: Point}): Card {
    const oldElement: Element | null = getSelectElement(card)
    const changeCard: Card = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if ((element === oldElement) && (isFigure(element.object))) {
                    return {
                        ...element,
                        centre: triangle.centre,
                        object: {
                            ...element.object,
                            figure: {
                                firstPoint: triangle.points.firstPoint, 
                                secondPoint: triangle.points.secondPoint, 
                                thirdPoint: triangle.points.thirdPoint
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
    madeChange(newCard, 'Resize Graphic', 'images/triangle.png')
    return newCard
}