import { Card } from "../utils/types";

export const initialState: Card = {
    canvas: {
        size: { width: 800, height: 600 },
        selectElement: null,
        background: '#FFF',
        elements: []
    },
    history: {
        undo: [],
        redo: []

    }
}