import React from 'react'
import styles from './ButtonFont.module.css'

export function ButtonFont(props: {
    font: string,
    selectFont: string;
    setFont: (font: string) => void,
}) {
    const style = () => {
        if (props.font == props.selectFont) {
            return styles.selected
        }
        return
    }
    return (
        <div onClick={() => {props.setFont(props.font)}} className={styles.wrap + ' ' + style()} style={{fontFamily: props.font}}>
            <div className={styles.text} >{props.font}</div>
        </div>
    )
}