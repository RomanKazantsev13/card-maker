/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import type { Card, Point } from '../../Card/card'
import type { Text } from './Text/text'
import type { Image } from './Image/image'
import type { Figure } from './Figure/figure'
import { madeChange } from '../../Card/History/history'

// export function selectElement(card: Card): Card {}
// let mousePoint: Point
// получить координаты мыши
// делаем цикл перебора всех элементов, начиная с последнего
// функции => получаем площадь круга/прямоугольника/треугольника
// если координаты мыши входят в полученную площадь, возвращаем элемент
// иначе проходимся дальше по массиву

export function moveSelectElement(mousePoint: Point, card: Card): Card {
    madeChange(card)
    return {
        ...card,
        canvas: {
            ...card.canvas,
            selectElement: card.canvas.selectElement !== null
            ? {
                ...card.canvas.selectElement,
                centre: mousePoint
            }
            : null
        }
    }
}

export function deleteSelectElement(oldElement: Element, card: Card): Card {
    madeChange(card)
    const newElements = card.canvas.elements.filter(element => {
        if (element !== oldElement) {
            return element
        }
    })
    return {
        ...card,
        canvas: {
            ...card.canvas,
            elements: newElements
        }
    }
}

export function getSelectElement(card: Card): Element | null {
    madeChange(card)
    const newSelectElement: Element | undefined = 
        card.canvas.selectElement !== null
            ? card.canvas.elements.find(element => {
                element.id === card.canvas.selectElement?.id
            })
            : undefined
    return newSelectElement ||  null
}

export type Element = {
    centre: Point,
    id: string,
    object: Text | Image | Figure
}

