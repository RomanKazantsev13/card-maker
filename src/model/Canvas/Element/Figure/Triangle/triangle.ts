import type { Card, Point } from '../../../../Card/card'
import { madeChange } from '../../../../Card/History/history'
import { Element, getSelectElement } from '../../element'
import { isFigure } from '../figure'
import { uuid } from 'uuidv4';

export function addTriangle(card: Card): Card {
    const newCard = {
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
    const oldElement = getSelectElement(card)
    const changeCard = {
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
    const newCard = {
        ...changeCard,
        canvas: {
            ...changeCard.canvas,
            selectElement: getSelectElement(changeCard)
        }
    }
    madeChange(newCard, 'Resize Graphic', 'images/triangle.png')
    return newCard
}

export function isTriangle(object: any): object is Triangle {
    return (object as Triangle).firstPoint !== undefined && (object as Triangle).secondPoint !== undefined && (object as Triangle).thirdPoint !== undefined
}

export type Triangle = {
    firstPoint: Point,
    secondPoint: Point,
    thirdPoint: Point
}

