import React, { useRef } from 'react'
import styles from './Image.module.css'

export function Image() {
    return (
        <div>
            <div className={styles.header}>Image Manager</div>
            <label htmlFor="file" className={styles.button}>
                <div className={styles.text}>Computer</div>
            </label>
            <input id="file" type="file" className={styles.input} accept=".jpg,.jpeg,.png"/>
            <div className={styles.button}>
                <div className={styles.text}>Pixels</div>
            </div>
        </div>
    )
}