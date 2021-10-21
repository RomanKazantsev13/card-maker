import type { Card, Point } from "../../../../Card/card"
import { updateSelectElement } from "../../element"
import { isFigure } from "../figure"

export function addCircle(card: Card): Card {
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
                            radius: 30
                        }
                    }
                }
            ]
        }
    }
}

export function setRadiusCircle(mousePoint: Point, card: Card): Card {
    const oldElement = card.canvas.elements.find(element => card.canvas.selectElement?.id == element.id)
    const newCard = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if ((element == oldElement) && (isFigure(element.object)) && (isCircle(element.object.object))) {
                    return {
                        ...element,
                        object: {
                            ...element.object,
                            object: {
                                radius: element.object.object.radius + mousePoint.x
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
function isCircle(object: any): object is Circle {
    return object.radius !== undefined
}

export type Circle = {
    radius: number
}