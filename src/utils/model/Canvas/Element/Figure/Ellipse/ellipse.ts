import { madeChange } from "../../../../Card/History/history"
import { getSelectElement } from "../../element"
import { uuid } from 'uuidv4';
import { Card, Element, Point, Size } from "../../../../../types";
import { isEllipse, isFigure } from "../../../../../typeGuards";

export function addEllipse(card: Card): Card {
    const newCard: Card = {
        ...card,
        canvas: {
            ...card.canvas,
            selectElement: null,
            elements: [
                ...card.canvas.elements,
                {
                    centre: { x: 150, y: 150 },
                    id: uuid(),
                    object: {
                        color: '#888',
                        figure: {
                            rx: 50,
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

export function resizeEllipse(card: Card, ellipse: {newSize: Size, newCentre: Point}): Card {
    const oldElement: Element | null = getSelectElement(card)
    const changeCard: Card = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if ((element === oldElement) && (isFigure(element.object)) && (isEllipse(element.object.figure))) {
                    return {
                        ...element,
                        centre: ellipse.newCentre,
                        object: {
                            ...element.object,
                            figure: {
                                rx: ellipse.newSize.width / 2,
                                ry: ellipse.newSize.height / 2,
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
    madeChange(newCard, 'Resize Graphic', 'images/circle.png')
    return newCard
}