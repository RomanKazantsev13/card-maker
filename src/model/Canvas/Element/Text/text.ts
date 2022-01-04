import type { Card, Size } from "../../../Card/card"
import { madeChange } from "../../../Card/History/history"
import { Element, getSelectElement } from "../element"
import { uuid } from 'uuidv4';

export function addText(card: Card): Card {
    const newCard = {
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
                        size: { width: 75, height: 20 },
                        sizeText: 20,
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

export function resizeText(card: Card, newSize: Size): Card {
    const selectElement = getSelectElement(card)
    const changeCard = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if (element === selectElement) {
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
    madeChange(newCard, 'Font Size', 'images/text__hover.png')
    return newCard
}

export function setSizeText(card: Card, newSize: number): Card {
    const oldElement = getSelectElement(card)
    let newElement = oldElement
    const changeCard = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if (element === oldElement) {
                    newElement = {
                        ...element,
                        object: {
                            ...element.object,
                            sizeText: newSize
                        }
                    }
                    return newElement
                }
                return element
            })
        }
    }
    const newCard = {
        ...changeCard,
        canvas: {
            ...changeCard.canvas,
            selectElement: newElement
        }
    }
    madeChange(newCard, 'Font Size', 'images/text__hover.png')
    return newCard
}

export function setFontText(card: Card, newFont: string): Card {
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
                            font: newFont
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
    madeChange(newCard, 'Font Family', 'images/text__hover.png')
    return newCard
}

export function setColorText(card: Card, newColor: string): Card {
    const oldElement = getSelectElement(card)
    let newElement = oldElement
    const changeCard = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if (element === oldElement) {
                    newElement = {
                        ...element,
                        object: {
                            ...element.object,
                            color: newColor
                        }
                    }
                    return newElement
                }
                return element
            })
        }
    }
    const newCard = {
        ...changeCard,
        canvas: {
            ...changeCard.canvas,
            selectElement: newElement
        }
    }
    madeChange(newCard, 'Text Color', 'images/text__hover.png')
    return newCard
}

export function changeText(card: Card, newText: string): Card {
    const oldElement = getSelectElement(card)
    let newElement = oldElement
    const changeCard = {
        ...card,
        canvas: {
            ...card.canvas,
            elements: card.canvas.elements.map(element => {
                if (element === oldElement) {
                    newElement = {
                        ...element,
                        object: {
                            ...element.object,
                            str: newText
                        }
                    }
                    return newElement
                }
                return element
            })
        }
    }
    const newCard = {
        ...changeCard,
        canvas: {
            ...changeCard.canvas,
            selectElement: newElement
        }
    }
    madeChange(newCard, 'Edit Text', 'images/text__hover.png')
    return newCard
}

export function isText(element: any): element is Text {
    return (element as Text).sizeText !== undefined && (element as Text).font !== undefined && (element as Text).color !== undefined && (element as Text).str !== undefined && (element as Text).size.width !== undefined && (element as Text).size.height !== undefined
}

export type Text = {
    size: Size,
    sizeText: number,
    font: string,
    color: string,
    str: string
}
