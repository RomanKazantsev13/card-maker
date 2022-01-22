import { Canvas, Element, Size } from "../../utils/types"
import elementReducers, { SetElementAction } from "./ElementReducers"
import elementsReducers, { elementsActions } from "./ElementsRedusers"

interface SetSize {
    type: string,
    size: Size
}
interface SetColor {
    type: string,
    color: string
}
interface AddImage {
    type: string,
    url: string,
    size: Size
}

export default function canvasReducers(state = {} as Canvas, action: elementsActions): Canvas {
    const arrayElement: Array<Element> = elementsReducers(state, action as elementsActions)
    return {
        size: sizeCanvas(state.size, action as (SetSize | AddImage)),
        selectElement: isSetElementAction(action) ? elementReducers(state.selectElement, action as SetElementAction) : getSelectElement(arrayElement, state.selectElement),
        background: backgroundCanvas(state.background, action as SetColor),
        elements: arrayElement
    }
}

const sizeCanvas = (state: Size, action: SetSize | AddImage): Size => {
    switch (action.type) {
        case 'SET_SIZE_CANVAS':
            return action.size  
        default:
            return state
    }
}

const backgroundCanvas = (state: string, action: SetColor): string => {
    switch (action.type) {
        case 'SET_BACKGROUND_COLOR':
            return action.color
        default:
            return state
    }
}

function isSetElementAction(action: any): action is SetElementAction {
    return action.type !== undefined && action.element !== undefined
}

export function getSelectElement(elements: Array<Element>, selectElement: Element | null): Element | null {
    const newSelectElement: Element | undefined = elements.find(element => 
        (selectElement !== null && selectElement.id == element.id)
    )
    return newSelectElement || null
}