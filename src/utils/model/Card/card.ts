import { Card } from '../../types'
import { madeChange } from './History/history'

export function initializationCard(): Card {
    const card: Card = {
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
    madeChange(card, 'New Template', 'images/square.png')
    return card
}