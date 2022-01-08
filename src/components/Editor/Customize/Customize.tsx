import React, { ReactElement, useEffect, useRef, useState } from 'react'
import useComponentVisible from '../../../customHooks/useComponentVisible';
import { setBackgroundColor } from '../../../model/Canvas/canvas';
import { ColorPicker } from '../../ColorPicker/ColorPicker'
import { ButtonColor } from './ButtonColor';
import styles from './Customize.module.css'

const colors: Array<string> = [
    'rgb(255, 255, 255)',
    'rgb(155, 155, 155)',
    'rgb(74, 74, 74)',
    'rgb(0, 0, 0)',
    'rgb(167, 12, 44)',
    'rgb(218, 154, 21)',
    'rgb(248, 231, 29)',
    'rgb(71, 130, 26)',
    'rgb(73, 144, 226)',
]

interface CustomizePropsType {
    setViewResize: (viewResize: boolean) => void,
    canvas: {
        size: {
            height: number,
            width: number,
        },
        background: string,
    },
}

export function Customize(props: CustomizePropsType) {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

    let ButtonsColor: Array<ReactElement> = colors.map(function (color, index) {
        return <ButtonColor key={index} color={color} />
    })

    return (
        <div>
            <div className={styles.header}>Cuztomize</div>
            <div className={styles.button} onClick={() => { props.setViewResize(true) }}>
                <div className={styles.text}>Resize Template</div>
            </div>
            <div className={styles.size}>{props.canvas.size.width} × {props.canvas.size.height} px</div>
            <div className={styles.colors}>
                <div className={styles.color_text}>Background Color</div>
                <div className={styles.colors__layout}>
                    <div
                        className={styles.color}
                        style={{ backgroundColor: props.canvas.background, position: 'relative' }}
                        onClick={() => { setIsComponentVisible(true) }}
                    >
                        <span className={styles.color_triangle}></span>
                    </div>
                    {ButtonsColor}
                </div>
                <div ref={ref} className={(() => { return isComponentVisible ? styles.pickerWrap : '' })()} >
                    {isComponentVisible && <ColorPicker color={props.canvas.background} function={setBackgroundColor} />}
                </div>
            </div>
        </div>
    )
}