import React from 'react'
import styles from './ButtonFont.module.css'

interface ButtonFontPropsType {
    font: string,
    selectFont: string;
    setFont: (font: string) => void,
}

export function ButtonFont(props: ButtonFontPropsType) {
    const style = () => { return props.font == props.selectFont ? styles.selected : '' }
    return (
        <div onClick={() => { props.setFont(props.font) }} className={styles.wrap + ' ' + style()} style={{ fontFamily: props.font }}>
            <div className={styles.text} >{props.font}</div>
        </div>
    )
}