import type { Card, Point } from "../../../../Card/card"
import { madeChange } from "../../../../Card/History/history"
import { getSelectElement } from "../../element"
import { isFigure } from "../figure"
import { uuid } from 'uuidv4';

export function addEllipse(card: Card): Card {
    const newCard = {
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
                        figure: {
                            rx: 30,
                            ry: 50
                        }
                    }
                }
            ]
        }
    }
    madeChange(newCard, 'New Shape', 'images/circle.png')
    return newCard
}

export function setEllipseRx(card: Card, mousePoint: Point): Card {
    const oldElement = getSelectElement(card)
    const changeCard = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if ((element === oldElement) && (isFigure(element.object)) && (isEllipse(element.object.figure))) {
                    return {
                        ...element,
                        object: {
                            ...element.object,
                            figure: {
                                ...element.object.figure,
                                rx: element.object.figure.rx + mousePoint.x
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
    madeChange(newCard, 'Resize Graphic', 'images/circle.png')
    return newCard
}

export function setEllipseRy(card: Card, mousePoint: Point): Card {
    const oldElement = getSelectElement(card)
    const changeCard = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if ((element === oldElement) && (isFigure(element.object)) && (isEllipse(element.object.figure))) {
                    return {
                        ...element,
                        object: {
                            ...element.object,
                            figure: {
                                ...element.object.figure,
                                ry: element.object.figure.ry + mousePoint.y
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
    madeChange(newCard, 'Resize Graphic', 'images/circle.png')
    return newCard
}

export function isEllipse(object: any): object is Ellipse {
    return (object.figure as Ellipse).rx !== undefined && (object.figure as Ellipse).ry !== undefined
}

export type Ellipse = {
    rx: number,
    ry: number
}