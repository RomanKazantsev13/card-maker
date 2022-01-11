import React from 'react'
import { dispatch } from '../../../editor'
import { addText } from '../../../model/Canvas/Element/Text/text'
import styles from './Text.module.css'

export function Text() {
    return (
        <div>
            <div className={styles.header}>Text</div>
            <div className={styles.button} onClick={() => {
                dispatch(addText)
            }}>
                <div className={styles.text}>Add Text</div>
            </div>
        </div>
    )
}