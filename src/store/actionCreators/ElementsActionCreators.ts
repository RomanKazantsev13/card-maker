import { Element, Point } from "../../utils/types"

export function setCentreElement(centre: Point) {
    return {
        type: 'SET_CENTRE_ELEMENT',
        centre: centre
    }
}

export function setSelectElement(element: Element | null) {
    return {
        type: 'SET_SELECT_ELEMENT',
        element: element
    }
}

export function deleteSelectElement() {
    return {
        type: 'DELETE_SELECT_ELEMENT'
    }
}