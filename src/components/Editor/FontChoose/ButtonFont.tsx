import React, { MutableRefObject, useRef, useState } from 'react'
import { dispatch } from '../../../editor'
import { Element } from '../../../model/Canvas/Element/element'
import { isText, setFontText } from '../../../model/Canvas/Element/Text/text'
import { getCentreAndSizeOfElement } from '../../Workspace/Canvas/SelectElement/SelectElementFunction'
import styles from './ButtonFont.module.css'

interface ButtonFontPropsType {
    selectElement: Element,
    font: string,
    selectFont: string;
    setFont: (font: string) => void,
    setSizeSelectElement: (size: {width: number, height: number}) => void,
    refText: MutableRefObject<SVGTextElement | null>,
}

export function ButtonFont(props: ButtonFontPropsType) {
    const ref: MutableRefObject<HTMLDivElement | null> = useRef(null)
    const style = () => { return props.font == props.selectFont ? styles.selected : '' }
    return (
        <div ref={ref} className={styles.wrap + ' ' + style()} style={{ fontFamily: props.font }} onClick={() => {
            dispatch(setFontText, props.font)
        }}
        >
            <div className={styles.text} >{props.font}</div>
        </div>
    )
}