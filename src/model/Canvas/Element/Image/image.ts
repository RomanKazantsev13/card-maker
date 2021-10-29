import type { Card, Size } from '../../../Card/card'
import { madeChange } from '../../../Card/History/history'
import { getSelectElement } from '../element'
import { uuid } from 'uuidv4';

export function addImage(card: Card): Card {
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
                        // узнать о размере, если размер больше холста, вывести сообщение:
                        // увеличить холст
                        // показать часть картинки
                        // отмена
                        size: { width: 200, height: 350 },
                        url: 'Тут надо как-то импортить картинку уже!'
                    }
                }
            ]
        }
    }
}

export function resizeImage(newSize: Size, card: Card): Card {
    madeChange(card)
    const oldElement = getSelectElement(card)
    const newCard = {
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
    return {
        ...newCard,
        canvas: {
            ...newCard.canvas,
            selectElement: getSelectElement(card)
        }
    }
}

export type Image = {
    size: Size,
    url: string
}
