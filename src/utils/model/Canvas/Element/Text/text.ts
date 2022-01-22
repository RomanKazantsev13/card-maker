import { madeChange } from "../../../Card/History/history"
import { getSelectElement } from "../element"
import { uuid } from 'uuidv4';
import { Card, Element } from "../../../../types";

export function addText(card: Card): Card {
    const newCard: Card = {
        ...card,
        canvas: {
            ...card.canvas,
            selectElement: null,
            elements: [
                ...card.canvas.elements,
                {
                    centre: { x: 30, y: 350 },
                    id: uuid(),
                    object: {
                        fontSize: 20,
                        font: 'TimeNewRoman',
                        color: '#000',
                        str: 'Введите свой текст'
                    }
                }
            ]
        }
    }
    madeChange(newCard, 'New Text', 'images/text__hover.png')
    return newCard
}

export function setSizeText(card: Card, newSize: number): Card {
    const oldElement: Element | null = getSelectElement(card)
    const changeCard: Card = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if (element === oldElement) {
                    return {
                        ...element,
                        object: {
                            ...element.object,
                            fontSize: newSize
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
    madeChange(newCard, 'Font Size', 'images/text__hover.png')
    return newCard
}

export function setFontText(card: Card, newFont: string): Card {
    const oldElement: Element | null = getSelectElement(card)
    const changeCard: Card = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if (element === oldElement) {
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
    const newCard: Card = {
        ...changeCard,
        canvas: {
            ...changeCard.canvas,
            selectElement: getSelectElement(changeCard)
        }
    }
    madeChange(newCard, 'Font Family', 'images/text__hover.png')
    return newCard
}

export function setColorText(card: Card, newColor: string): Card {
    const oldElement: Element | null = getSelectElement(card)
    const changeCard: Card = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if (element === oldElement) {
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
    const newCard: Card = {
        ...changeCard,
        canvas: {
            ...changeCard.canvas,
            selectElement: getSelectElement(changeCard)
        }
    }
    madeChange(newCard, 'Text Color', 'images/text__hover.png')
    return newCard
}

export function changeText(card: Card, newText: string): Card {
    const oldElement: Element | null = getSelectElement(card)
    const changeCard: Card = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if (element === oldElement) {
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
    const newCard: Card = {
        ...changeCard,
        canvas: {
            ...changeCard.canvas,
            selectElement: getSelectElement(changeCard)
        }
    }
    madeChange(newCard, 'Edit Text', 'images/text__hover.png')
    return newCard
}