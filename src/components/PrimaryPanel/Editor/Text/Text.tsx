import React from 'react'
import { dispatch } from '../../../../editor'
import { addText } from '../../../../model/Canvas/Element/Text/text'
import styles from './Text.module.css'

export function Text(props: {
    setViewEditor: (viewEditor: {view: boolean, state: string}) => void,
}) {
    return (
        <div>
            <div className={styles.header}>Text</div>
            <div className={styles.button} onClick={() => {
                props.setViewEditor({view: true, state: 'Text Properties'})
                dispatch(addText)
            }}>
                <div className={styles.text}>Add Text</div>
            </div>
        </div>
    )
}