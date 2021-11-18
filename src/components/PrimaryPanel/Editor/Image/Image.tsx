import React, { useRef } from 'react'
import styles from './Image.module.css'

export function Image() {
    return (
        <div>
            <div className={styles.header}>Image Manager</div>
            <div className={styles.button}>
                <div className={styles.text}>Computer</div>
            </div>
            <input
                id="file"
                style={{ display: 'none' }}
            />
            <div className={styles.button}>
                <div className={styles.text}>Pixels</div>
            </div>
        </div>
    )
}