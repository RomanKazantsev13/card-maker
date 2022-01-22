import { Element } from "../../utils/types"

export interface SetElementAction {
    type: string,
    element: Element
}

export default function elementReducers(state = {} as Element | null, action: SetElementAction): Element | null {
    switch (action.type) {
        case 'SET_SELECT_ELEMENT': {
            return action.element
        } 
        default: {
            return state
        }
    }
}