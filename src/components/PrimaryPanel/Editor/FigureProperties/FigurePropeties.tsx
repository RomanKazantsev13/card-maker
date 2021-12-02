import React, { useState } from 'react'
import useComponentVisible from '../../../../customHooks/useComponentVisible'
import { Figure } from '../../../../model/Canvas/Element/Figure/figure'
import { ColorPicker } from '../../../ColorPicker/ColorPicker'
import styles from './FigureProperties.module.css'

export function FigureProperties(props: {
    setViewEditor: (viewEditor: {view: boolean, state: string}) => void,
    element: Figure,
}) {
    const [color, setColor] = useState(props.element.color)
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)
    return (
        <div>
            <div className={styles.header_layout}>
                <div className={styles.header}>Figure Properties</div>
                <div className={styles.image_wrap} onClick={() => {
                    props.setViewEditor({view: false, state: ''})
                }}>
                    <img className={styles.image} src="images/close.png" />
                </div>
            </div>
            <div className={styles.colors}>
                <div className={styles.text}>Color</div>
                <div className={styles.picker_layout}>
                    <div
                        className={styles.color}
                        style={{ backgroundColor: color, position: 'relative' }}
                        onClick={() => { setIsComponentVisible(true) }}
                    >
                        <span className={styles.color_triangle}></span>
                    </div>
                </div>
            </div>
            <div className={styles.button_wrap}>
                <img className={styles.button} src="images/bin.png" />
            </div>
            <div ref={ref} className={(() => {
                if (isComponentVisible) {
                    return styles.pickerWrap
                }
                return
            })()} >
                {isComponentVisible && <ColorPicker backPicker={{ color: color, setColor: setColor }} />}
            </div>
        </div>
    )
}