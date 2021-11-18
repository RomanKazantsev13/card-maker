import React, { useState } from 'react'
import useComponentVisible from '../../../../customHooks/useComponentVisible';
import { ColorPicker } from '../../../Workspace/ColorPicker/ColorPicker'
import styles from './Customize.module.css'

export function Customize(props: {
    backPicker: {
        color: string,
        setColor: (color: string) => void
    },
}) {
    const { ref, isComponentVisible } = useComponentVisible(false);

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
                    <div className={styles.color} style={{ backgroundColor: 'rgb(255, 255, 255', position: 'relative' }} onClick={() => {
                        useComponentVisible(true)
                    }}>
                        <span className={styles.color_triangle}></span>
                    </div>
                    <div
                        className={styles.color}
                        style={{ backgroundColor: 'rgb(255, 255, 255)' }}
                        onClick={() => props.backPicker.setColor('rgb(255, 255, 255)')}></div>
                    <div
                        className={styles.color}
                        style={{ backgroundColor: 'rgb(155, 155, 155)' }}
                        onClick={() => props.backPicker.setColor('rgb(155, 155, 155)')}></div>
                    <div
                        className={styles.color}
                        style={{ backgroundColor: 'rgb(74, 74, 74)' }}
                        onClick={() => props.backPicker.setColor('rgb(74, 74, 74)')}></div>
                    <div
                        className={styles.color}
                        style={{ backgroundColor: 'rgb(0, 0, 0)' }}
                        onClick={() => props.backPicker.setColor('rgb(0, 0, 0)')}></div>
                    <div
                        className={styles.color}
                        style={{ backgroundColor: 'rgb(167, 12, 44)' }}
                        onClick={() => props.backPicker.setColor('rgb(167, 12, 44)')}></div>
                    <div
                        className={styles.color}
                        style={{ backgroundColor: 'rgb(218, 154, 21)' }}
                        onClick={() => props.backPicker.setColor('rgb(218, 154, 21)')}></div>
                    <div
                        className={styles.color}
                        style={{ backgroundColor: 'rgb(248, 231, 29)' }}
                        onClick={() => props.backPicker.setColor('rgb(248, 231, 29)')}></div>
                    <div
                        className={styles.color}
                        style={{ backgroundColor: 'rgb(71, 130, 26)' }}
                        onClick={() => props.backPicker.setColor('rgb(71, 130, 26)')}></div>
                    <div
                        className={styles.color}
                        style={{ backgroundColor: 'rgb(73, 144, 226)' }}
                        onClick={() => props.backPicker.setColor('rgb(73, 144, 226)')}></div>
                </div>
                <div ref={ref}>
                    {isComponentVisible && <ColorPicker backPicker={{ color: props.backPicker.color, setColor: props.backPicker.setColor }} />}
                </div>
            </div>
        </div>
    )
}