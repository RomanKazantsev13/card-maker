import React from 'react'
import styles from './Text.module.css'

export function Text() {
    return (
        <div>
            <div className={styles.header}>Text</div>
            <div className={styles.button}>
                <div className={styles.text}>Add Text</div>
            </div>
        </div>
    )
}