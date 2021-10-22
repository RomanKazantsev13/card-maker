import type { Card, Point } from '../../../../Card/card'
import { madeChange } from '../../../../Card/History/history'
import { getSelectElement } from '../../element'
import { isFigure } from '../figure'
import { uuid } from 'uuidv4';

export function addTriangle(card: Card): Card {
    madeChange(card)
    return {
        ...card,
        canvas: {
            ...card.canvas,
            elements: [
                ...card.canvas.elements,
                {
                    centre: { x: 50, y: 50 },
                    id: uuid(),
                    object: {
                        color: '#888',
                        object: {
                            firstPoint: { x: 50, y: 50 },
                            secondPoint: { x: 50, y: 150 },
                            thirdPoint: { x: 200, y: 150 }
                        }
                    }
                }
            ]
        }
    }
}

export function changeFirstPoint(mousePoint: Point, card: Card): Card {
    madeChange(card)
    const oldElement =getSelectElement(card)
    const newCard = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if ((element == oldElement) && (isFigure(element.object))) {
                    return {
                        ...element,
                        object: {
                            ...element.object,
                            object: {
                                ...element.object.object,
                                firstPoint: mousePoint
                            }
                        }
                    }
                }
                return element
            })
        }
    }
    return {
        ...newCard,
        canvas: {
            ...newCard.canvas,
            selectElement: getSelectElement(card)
        }
    }
}

export function changeSecondPoint(mousePoint: Point, card: Card): Card {
    madeChange(card)
    const oldElement = getSelectElement(card)
    const newCard = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if ((element == oldElement) && (isFigure(element.object))) {
                    return {
                        ...element,
                        object: {
                            ...element.object,
                            object: {
                                ...element.object.object,
                                secondPoint: mousePoint
                            }
                        }
                    }
                }
                return element
            })
        }
    }
    return {
        ...newCard,
        canvas: {
            ...newCard.canvas,
            selectElement: getSelectElement(card)
        }
    }
}

export function changeThirdPoint(mousePoint: Point, card: Card): Card {
    madeChange(card)
    const oldElement = getSelectElement(card)
    const newCard = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if ((element == oldElement) && (isFigure(element.object))) {
                    return {
                        ...element,
                        object: {
                            ...element.object,
                            object: {
                                ...element.object.object,
                                thirdPoint: mousePoint
                            }
                        }
                    }
                }
                return element
            })
        }
    }
    return {
        ...newCard,
        canvas: {
            ...newCard.canvas,
            selectElement: getSelectElement(card)
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isTriangle(element: any): element is Triangle {
    return element.object.object.firstPoint !== undefined && element.object.object.secondPoint !== undefined && element.object.object.thirdPoint
}

export type Triangle = {
    firstPoint: Point,
    secondPoint: Point,
    thirdPoint: Point
}

