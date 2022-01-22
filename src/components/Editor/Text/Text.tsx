import React from 'react'
import { addText } from '../../../store/actionCreators/TextActionCreators'
import { store } from '../../../store/store'
import styles from './Text.module.css'

export function Text() {
    return (
        <div>
            <div className={styles.header}>Text</div>
            <div className={styles.button} onClick={() => {
                store.dispatch(addText())
            }}>
                <div className={styles.text}>Add Text</div>
            </div>
        </div>
    )
}