import type { Card, Point, Size } from '../../../Card/card'
import { madeChange } from '../../../Card/History/history'
import { Element, getSelectElement } from '../element'
import { uuid } from 'uuidv4';

export function addImage(card: Card, image: { url: string, size: Size }): Card {
    const newCard = {
        ...card,
        canvas: {
            ...card.canvas,
            selectElement: null,
            elements: [
                ...card.canvas.elements,
                {
                    centre: { x: 0, y: 0 },
                    id: uuid(),
                    object: {
                        size: image.size,
                        url: image.url
                    }
                }
            ]
        }
    }
    madeChange(newCard, 'Add Image', 'images/image.png')
    return newCard
}

export function resizeImage(card: Card, image: {newSize: Size, newCentre: Point}): Card {
    const oldElement = getSelectElement(card)
    const changeCard = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if (element === oldElement) {
                    return {
                        ...element,
                        centre: image.newCentre,
                        object: {
                            ...element.object,
                            size: image.newSize
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
    madeChange(newCard, 'Resize Image', 'images/image.png')
    return newCard
}

export function isImage(element: any): element is Image {
    return (element as Image).url !== undefined && (element as Image).size.width !== undefined && (element as Image).size.height !== undefined
}

export type Image = {
    size: Size,
    url: string
}
