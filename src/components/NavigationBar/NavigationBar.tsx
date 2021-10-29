import React from 'react'
import { Canvas } from '../../model/Canvas/canvas'
import styles from './NavigationBar.module.css'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Tools {
    history: Array<Canvas>,
    canvas: Canvas
}

export function NavigationBar() {
    return (
        <div className={styles.navbar}>
        </div>
    )
}