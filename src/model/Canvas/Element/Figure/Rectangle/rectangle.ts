import type { Card, Point, Size } from '../../../../Card/card'
import { madeChange } from '../../../../Card/History/history'
import { Element, getSelectElement } from '../../element'
import { isFigure } from '../figure'
import { uuid } from 'uuidv4';

export function addRectangle(card: Card): Card {
    const newCard = {
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

export function setWidthRectangle(card: Card, mousePoint: Point): Card {
    const oldElement = getSelectElement(card)
    const changeCard = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if ((element === oldElement) && (isFigure(element.object)) && (isRectangle(element.object.figure))) {
                    return {
                        ...element,
                        object: {
                            ...element.object,
                            figure: {
                                size: {
                                    ...element.object.figure.size,
                                    width: element.object.figure.size.width + mousePoint.x
                                }
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
    madeChange(newCard, 'Resize Graphic', 'images/square.png')
    return newCard
}

export function setHeightRectangle(card: Card, mousePoint: Point): Card {
    const oldElement = getSelectElement(card)
    const changeCard = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if ((element === oldElement) && (isFigure(element.object)) && (isRectangle(element.object.figure))) {
                    return {
                        ...element,
                        object: {
                            ...element.object,
                            figure: {
                                size: {
                                    ...element.object.figure.size,
                                    height: element.object.figure.size.height + mousePoint.y
                                }
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
    madeChange(newCard, 'Resize Graphic', 'images/square.png')
    return newCard
}

export function isRectangle(object: any): object is Rectangle {
     return (object as Rectangle).size !== undefined
}

export type Rectangle = {
    size: Size
}

