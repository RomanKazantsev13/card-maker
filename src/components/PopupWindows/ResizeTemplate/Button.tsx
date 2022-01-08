import React from 'react'
import styles from './Button.module.css'

interface ButtonPropsType {
    name: string,
    width: number,
    height: number,
    setSize: {
        setWidth: (width: number) => void,
        setHeight: (heigth: number) => void,
    },
    setViewList: (view: string) => void,
}

export function Button(props: ButtonPropsType) {
    return (
        <div className={styles.wrap} onClick={() => {
            props.setSize.setWidth(props.width)
            props.setSize.setHeight(props.height)
            props.setViewList(styles.viewOff)
        }}>
            <div className={styles.name}>{props.name}</div>
            <div className={styles.size}>{props.width} × {props.height}px</div>
        </div>
    )
}