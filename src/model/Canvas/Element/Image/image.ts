import type { Card, Size } from '../../../Card/card'
import { updateSelectElement } from '../element'

export function addImage(card: Card): Card {
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
    const oldElement = card.canvas.elements.find(element => card.canvas.selectElement?.id == element.id)
    const newCard = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if (element == oldElement) {
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
            selectElement: updateSelectElement(oldElement?.id, card)
        }
    }
}

export type Image = {
    size: Size,
    url: string
}
