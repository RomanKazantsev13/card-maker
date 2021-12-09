import type { Card, Point } from '../../../../Card/card'
import { madeChange } from '../../../../Card/History/history'
import { Element, getSelectElement } from '../../element'
import { isFigure } from '../figure'
import { uuid } from 'uuidv4';

export function addTriangle(card: Card): Card {
    const element: Element = {
        centre: { x: 50, y: 50 },
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
    const newCard = {
        ...card,
        canvas: {
            ...card.canvas,
            selectElement: element,
            elements: [
                ...card.canvas.elements,
                element
            ]
        }
    }
    madeChange(newCard, 'New Shape', 'images/triangle.png')
    return newCard
}

export function changeFirstPoint(card: Card, mousePoint: Point): Card {
    const oldElement = getSelectElement(card)
    const changeCard = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if ((element === oldElement) && (isFigure(element.object))) {
                    return {
                        ...element,
                        object: {
                            ...element.object,
                            figure: {
                                ...element.object.figure,
                                firstPoint: mousePoint
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
            selectElement: getSelectElement(card)
        }
    }
    madeChange(newCard, 'Resize Graphic', 'images/triangle.png')
    return newCard
}

export function changeSecondPoint(card: Card, mousePoint: Point): Card {
    const oldElement = getSelectElement(card)
    const changeCard = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if ((element === oldElement) && (isFigure(element.object))) {
                    return {
                        ...element,
                        object: {
                            ...element.object,
                            figure: {
                                ...element.object.figure,
                                secondPoint: mousePoint
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
            selectElement: getSelectElement(card)
        }
    }
    madeChange(newCard, 'Resize Graphic', 'images/triangle.png')
    return newCard
}

export function changeThirdPoint(card: Card, mousePoint: Point): Card {
    const oldElement = getSelectElement(card)
    const changeCard = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if ((element === oldElement) && (isFigure(element.object))) {
                    return {
                        ...element,
                        object: {
                            ...element.object,
                            figure: {
                                ...element.object.figure,
                                thirdPoint: mousePoint
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
            selectElement: getSelectElement(card)
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

