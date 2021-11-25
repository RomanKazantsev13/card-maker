import React, { useState } from 'react'
import useComponentVisible from '../../../../customHooks/useComponentVisible'
import { ColorPicker } from '../../../Workspace/ColorPicker/ColorPicker'
import styles from './TextProperties.module.css'

export function TextProperties(props: {
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    font: string,
}) {
    const [color, setColor] = useState('#FFF')
    const [fontSize, setFontSize] = useState(15)
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

    function handleChangeFontSize(event: React.ChangeEvent<HTMLInputElement>) {
        setFontSize(Number(event.target.value));
    }

    return (
        <div>
            <div className={styles.header_layout}>
                <div className={styles.header}>Text Properties</div>
                <div className={styles.image_wrap} onClick={() => {
                    props.setViewEditor({ view: false, state: '' })
                }}>
                    <img className={styles.image} src="images/close.png" />
                </div>
            </div>
            <div className={styles.style_wrap} onClick={() => {props.setViewEditor({view: true, state: 'FontChoose'})}}>
                <div className={styles.font} style={{ fontFamily: props.font }}>{props.font}</div>
                <img className={styles.arrow} src="images/arrow_right.png" />
            </div>
            <div className={styles.layout}>
                <div className={styles.px}>px</div>
                <input className={styles.size_value} maxLength={5} type="number" value={fontSize} onChange={handleChangeFontSize} />
                <div
                    className={styles.color}
                    style={{ backgroundColor: color, position: 'relative' }}
                    onClick={() => { setIsComponentVisible(true) }}
                >
                    <span className={styles.color_triangle}></span>
                </div>
                <div className={styles.button_wrap}>
                    <img className={styles.button} src="images/bin.png" />
                </div>
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