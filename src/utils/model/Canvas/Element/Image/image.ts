import { madeChange } from '../../../Card/History/history'
import { getSelectElement } from '../element'
import { uuid } from 'uuidv4';
import { Card, Element, Point, Size } from '../../../../types';
import { isImage } from '../../../../typeGuards';

export function addImage(card: Card, image: { url: string, size: Size }): Card {
    const newCard: Card = {
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
    const oldElement: Element | null = getSelectElement(card)
    const changeCard: Card = {
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
    const newCard: Card = {
        ...changeCard,
        canvas: {
            ...changeCard.canvas,
            selectElement: getSelectElement(changeCard)
        }
    }
    madeChange(newCard, 'Resize Image', 'images/image.png')
    return newCard
}