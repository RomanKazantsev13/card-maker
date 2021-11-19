import React, { ReactElement, useEffect, useRef, useState } from 'react'
import useComponentVisible from '../../../../customHooks/useComponentVisible';
import { ColorPicker } from '../../../Workspace/ColorPicker/ColorPicker'
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

export function Customize(props: {
    backPicker: {
        color: string,
        setColor: (color: string) => void
    },
}) {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

    let ButtonsColor: Array<ReactElement> = []

    for (let i = 0; i < colors.length; i++) {
        ButtonsColor.push(
            <ButtonColor color={colors[i]} setColor={props.backPicker.setColor} />
        )
    }

    return (
        <div>
            <div className={styles.header}>Cuztomize</div>
            <div className={styles.button}>
                <div className={styles.text}>Resize Template</div>
            </div>
            <div className={styles.size}>width × height px</div>
            <div className={styles.colors}>
                <div className={styles.color_text}>Background Color</div>
                <div className={styles.colors__layout}>
                    <div
                        className={styles.color}
                        style={{ backgroundColor: props.backPicker.color, position: 'relative' }}
                        onClick={() => { setIsComponentVisible(true) }} 
                    >
                        <span className={styles.color_triangle}></span>
                    </div>
                    {ButtonsColor}
                </div>
                <div ref={ref} className={(() => {
                    if (isComponentVisible) {
                        return styles.pickerWrap
                    }
                    return
                })()} >
                    {isComponentVisible && <ColorPicker backPicker={{ color: props.backPicker.color, setColor: props.backPicker.setColor }} />}
                </div>
            </div>
        </div>
    )
}