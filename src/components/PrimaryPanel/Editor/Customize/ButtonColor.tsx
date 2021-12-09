import React from 'react'
import { dispatch } from '../../../../editor'
import { setBackgroundColor } from '../../../../model/Canvas/canvas'
import styles from './ButtonColor.module.css'

export function ButtonColor(props: {
    color: string,
}) {
    return (
        <div 
            className={styles.color}
            style={{ backgroundColor: props.color }}
            onClick={() => {
                dispatch(setBackgroundColor, props.color)
            }}
        >
        </div>
    )
}