import React from 'react'
import { setBackgroundColor } from '../../../store/actionCreators/CanvasActionCreators'
import { store } from '../../../store/store'
import styles from './ButtonColor.module.css'

interface ButtonColorPropsType {
    color: string,
}

export function ButtonColor(props: ButtonColorPropsType) {
    return (
        <div 
            className={styles.color}
            style={{ backgroundColor: props.color }}
            onClick={() => {
                store.dispatch(setBackgroundColor(props.color))
            }}
        >
        </div>
    )
}