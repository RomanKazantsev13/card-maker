import type { Card, Size } from "../../../Card/card"
import { updateSelectElement } from "../element"

export function addText(card: Card): Card {
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
                        size: { width: 75, height: 40 },
                        sizeText: 10,
                        font: 'TimeNewRoman',
                        color: '#000',
                        str: 'Введите свой текст'
                    }
                }
            ]
        }
    }
}

export function resizeText(newSize: Size, card: Card): Card {
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

export function setSizeText(newSize: number, card: Card): Card {
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
                            sizeText: newSize
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

export function setFontText(newFont: string, card: Card): Card {
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
                            font: newFont
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

export function setColorText(newColor: string, card: Card): Card {
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
                            color: newColor
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

export function changeText(newText: string, card: Card): Card {
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
                            str: newText
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

export type Text = {
    size: Size,
    sizeText: number,
    font: string,
    color: string,
    str: string
}
