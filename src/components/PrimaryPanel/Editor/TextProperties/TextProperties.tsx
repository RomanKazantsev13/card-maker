import React, { useState } from 'react'
import useComponentVisible from '../../../../customHooks/useComponentVisible'
import { dispatch } from '../../../../editor'
import { deleteSelectElement, Element } from '../../../../model/Canvas/Element/element'
import { isText, resizeText, setColorText, setFontText, setSizeText, Text } from '../../../../model/Canvas/Element/Text/text'
import { Point } from '../../../../model/Card/card'
import { ColorPicker } from '../../../ColorPicker/ColorPicker'
import { SelectElement } from '../../../Workspace/Canvas/SelectElement/SelectElement'
import styles from './TextProperties.module.css'

export function TextProperties(props: {
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    font: string,
    element: Text,
    selectElement: Element,
}) {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

    const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    function handleChangeFontSize(event: React.ChangeEvent<HTMLInputElement>) {
        if (digits.includes(event.target.value.slice(-1))) {
            dispatch(setSizeText, Number(event.target.value))
        }
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
            <div className={styles.style_wrap} onClick={() => { props.setViewEditor({ view: true, state: 'FontChoose' }) }}>
                <div className={styles.font} style={{ fontFamily: props.font }}>{props.font}</div>
                <img className={styles.arrow} src="images/arrow_right.png" />
            </div>
            <div className={styles.layout}>
                <div className={styles.px}>px</div>
                <input className={styles.size_value} maxLength={5} type="text" onChange={handleChangeFontSize} />
                <div
                    className={styles.color}
                    style={{
                        backgroundColor: (() => { if (isText(props.selectElement.object)) { return props.selectElement.object.color } })(),
                        position: 'relative'
                    }}
                    onClick={() => { setIsComponentVisible(true) }}
                >
                    <span className={styles.color_triangle}></span>
                </div>
                <div className={styles.button_wrap} onClick={() => dispatch(deleteSelectElement)}>
                    <img className={styles.button} src="images/bin.png" />
                </div>
            </div>
            <div ref={ref} className={(() => {
                if (isComponentVisible) {
                    return styles.pickerWrap
                }
                return
            })()} >
                {isComponentVisible && <ColorPicker
                    color={(() => {
                        if (isText(props.selectElement.object)) {
                            return props.selectElement.object.color
                        }
                        return '#FFF'
                    })()}
                    function={setColorText}
                />}
            </div>
        </div>
    )
}