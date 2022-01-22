import { Card, Size } from '../../types'
import { initializationCard } from '../Card/card'
import { madeChange } from '../Card/History/history'

export function setSizeCanvas(card: Card, newSize: Size): Card {
    const newCard: Card = {
        ...card,
        canvas: {
            ...card.canvas,
            size: newSize
        }
    }
    madeChange(newCard, 'Resize Template', 'images/square.png')
    return newCard
}

export function resetCanvas(): Card {
    return initializationCard()
}

export function setBackgroundColor(card: Card, color: string): Card {
    const newCard: Card = {
        ...card,
        canvas: {
            ...card.canvas,
            background: color
        }
    }
    madeChange(newCard, 'Background Color', 'images/square.png')
    return newCard
}

export function setBackgroundImage(card: Card, url: string): Card {
    const newCard: Card = {
        ...card,
        canvas: {
            ...card.canvas,
            background: url
        }
    }
    madeChange(newCard, 'Background Image', 'images/image.png')
    return newCard
}