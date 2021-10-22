import type { Card, Point, Size } from '../../../../Card/card'
import { madeChange } from '../../../../Card/History/history'
import { getSelectElement } from '../../element'
import { isFigure } from '../figure'
import { uuid } from 'uuidv4';

export function addRectangle(card: Card): Card {
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
}

export function resizeRectangle(mousePoint: Point, card: Card): Card {
    madeChange(card)
    const oldElement = getSelectElement(card)
    const newCard = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if ((element == oldElement) && (isFigure(element.object)) && (isRectangle(element.object.object))) {
                    return {
                        ...element,
                        object: {
                            ...element.object,
                            object: {
                                size: {
                                    width: element.object.object.size.width + mousePoint.x,
                                    height: element.object.object.size.height + mousePoint.y
                                }
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

export function setWidthRectangle(mousePoint: Point, card: Card): Card {
    madeChange(card)
    const oldElement = getSelectElement(card)
    const newCard = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if ((element == oldElement) && (isFigure(element.object)) && (isRectangle(element.object.object))) {
                    return {
                        ...element,
                        object: {
                            ...element.object,
                            object: {
                                size: {
                                    ...element.object.object.size,
                                    width: element.object.object.size.width + mousePoint.x
                                }
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

export function setHeightRectangle(mousePoint: Point, card: Card): Card {
    madeChange(card)
    const oldElement = getSelectElement(card)
    const newCard = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if ((element == oldElement) && (isFigure(element.object)) && (isRectangle(element.object.object))) {
                    return {
                        ...element,
                        object: {
                            ...element.object,
                            object: {
                                size: {
                                    ...element.object.object.size,
                                    height: element.object.object.size.height + mousePoint.x
                                }
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
function isRectangle(object: any): object is Rectangle {
    return object.size !== undefined
}

export type Rectangle = {
    size: Size
}

