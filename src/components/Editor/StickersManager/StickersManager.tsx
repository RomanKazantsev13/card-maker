import React from 'react'
import { Stickers } from './Stickers'
import styles from './StickersManager.module.css'

const stickersName = ['Christmas', 'CuteAxolotl', 'SantaClaus']

export function StickersManager() {
    const stickers = []
    for (let i = 0; i < stickersName.length; i++) {
        stickers.push(
            <Stickers stickersName={stickersName[i]} />
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