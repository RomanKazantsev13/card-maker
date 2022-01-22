import React, { MutableRefObject, useRef } from 'react'
import { setFontText } from '../../../store/actionCreators/TextActionCreators'
import { store } from '../../../store/store'
import { Element } from '../../../utils/types'
import styles from './ButtonFont.module.css'

interface ButtonFontPropsType {
    selectElement: Element | null,
    font: string,
    selectFont: string;
    setFont: (font: string) => void,
}

export function ButtonFont(props: ButtonFontPropsType) {
    const ref: MutableRefObject<HTMLDivElement | null> = useRef(null)
    const style = () => { return props.font == props.selectFont ? styles.selected : '' }
    return (
        <div ref={ref} className={styles.wrap + ' ' + style()} style={{ fontFamily: props.font }} onClick={() => {
            store.dispatch(setFontText(props.font))
        }}
        >
            <div className={styles.text} >{props.font}</div>
        </div>
    )
}