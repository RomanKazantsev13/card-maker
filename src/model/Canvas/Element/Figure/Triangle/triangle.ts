import type { Card, Point } from '../../../../Card/card'
import { updateSelectElement } from '../../element'
import { isFigure } from '../figure'

export function addTriangle(card: Card): Card {
    return {
        ...card,
        canvas: {
            ...card.canvas,
            currentId: card.canvas.currentId + 1,
            elements: [
                ...card.canvas.elements,
                {
                    centre: { x: 50, y: 50 },
                    id: card.canvas.currentId,
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
    const oldElement = card.canvas.elements.find(element => card.canvas.selectElement?.id == element.id)
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
            selectElement: updateSelectElement(oldElement?.id, card)
        }
    }
}

export function changeSecondPoint(mousePoint: Point, card: Card): Card {
    const oldElement = card.canvas.elements.find(element => card.canvas.selectElement?.id == element.id)
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
            selectElement: updateSelectElement(oldElement?.id, card)
        }
    }
}

export function changeThirdPoint(mousePoint: Point, card: Card): Card {
    const oldElement = card.canvas.elements.find(element => card.canvas.selectElement?.id == element.id)
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
            selectElement: updateSelectElement(oldElement?.id, card)
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

