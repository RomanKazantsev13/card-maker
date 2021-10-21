import type { Card, Point, Size } from '../../../../Card/card'
import { updateSelectElement } from '../../element'
import { isFigure } from '../figure'

export function addRectangle(card: Card): Card {
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
    const oldElement = card.canvas.elements.find(element => card.canvas.selectElement?.id == element.id)
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
            selectElement: updateSelectElement(oldElement?.id, card)
        }
    }
}

export function setWidthRectangle(mousePoint: Point, card: Card): Card {
    const oldElement = card.canvas.elements.find(element => card.canvas.selectElement?.id == element.id)
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
            selectElement: updateSelectElement(oldElement?.id, card)
        }
    }
}

export function setHeightRectangle(mousePoint: Point, card: Card): Card {
    const oldElement = card.canvas.elements.find(element => card.canvas.selectElement?.id == element.id)
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
            selectElement: updateSelectElement(oldElement?.id, card)
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

