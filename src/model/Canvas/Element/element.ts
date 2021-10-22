import type { Card, Point } from '../../Card/card'
import type { Text } from './Text/text'
import type { Image } from './Image/image'
import type { Figure } from './Figure/figure'

// export function selectElement(card: Card): Card {}
// let mousePoint: Point
// получить координаты мыши
// делаем цикл перебора всех элементов, начиная с последнего
// функции => получаем площадь круга/прямоугольника/треугольника
// если координаты мыши входят в полученную площадь, возвращаем элемент
// иначе проходимся дальше по массиву

export function moveSelectElement(mousePoint: Point, card: Card): Card {
    let element: Element | null = card.canvas.selectElement

    if (card.canvas.selectElement !== null) {
        element = {
            ...card.canvas.selectElement,
            centre: mousePoint
        }
    }
    return {
        ...card,
        canvas: {
            ...card.canvas,
            selectElement: element
        }
    }
}

export function deleteSelectElement(oldElement: Element, card: Card): Card {
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
    const newSelectElement: Element | undefined = card.canvas.elements.find(element => {
        element.id === card.canvas.selectElement?.id
    })
    if (newSelectElement !== undefined) {
        return newSelectElement
    } else {
        return null
    }

}

export type Element = {
    centre: Point,
    id: number,
    object: Text | Image | Figure
}

