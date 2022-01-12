import React from 'react'
import { uuid } from 'uuidv4'
import { Stickers } from './Stickers'
import styles from './StickersManager.module.css'

const stickersName = [
    '4x4',
    'Birthday',
    'Christmas',
    'ChristmasAnimals',
    'CuteAxolotl',
    'Expressions',
    'Hallowen',
    'Numbers',
    'SantaClaus',
    'Universe'
]

export function StickersManager() {
    const stickers = []
    for (let i = 0; i < stickersName.length; i++) {
        stickers.push(
            <Stickers key={uuid()} stickersName={stickersName[i]} />
        )
    }
    return(
        <div>
            <div className={styles.header}>Stickers</div>
            <div className={styles.stickers}>
                {stickers}
            </div>
        </div>
    )
}