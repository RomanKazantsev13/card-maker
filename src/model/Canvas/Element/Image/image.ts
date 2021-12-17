import type { Card, Size } from '../../../Card/card'
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
                    centre: { x: 50, y: 50 },
                    id: uuid(),
                    object: {
                        size: { width: image.size.width, height: image.size.height },
                        url: image.url
                    }
                }
            ]
        }
    }
    madeChange(newCard, 'Add Image', 'images/image.png')
    return newCard
}

export function resizeImage(card: Card, newSize: Size): Card {
    const oldElement = getSelectElement(card)
    const changeCard = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if (element === oldElement) {
                    return {
                        ...element,
                        object: {
                            ...element.object,
                            size: newSize
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
