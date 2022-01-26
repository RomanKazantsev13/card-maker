import React, { MutableRefObject, useState } from 'react'
import useComponentVisible from '../../../customHooks/useComponentVisible'
import { deleteSelectElement, setSelectElement } from '../../../store/actionCreators/ElementsActionCreators'
import { setColorText, setSizeText } from '../../../store/actionCreators/TextActionCreators'
import { store } from '../../../store/store'
import { isText } from '../../../utils/typeGuards'
import { Element, Text } from '../../../utils/types'
import { ColorPicker } from '../../ColorPicker/ColorPicker'
import styles from './TextProperties.module.css'

interface TextPropertiesPropsType {
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    font: string,
}

export function TextProperties(props: TextPropertiesPropsType) {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)
    const selectElement: Element | null = store.getState().canvas.selectElement
    const object: unknown = selectElement !== null ? selectElement.object : null
    const sizeText = (object !== null && isText(object)) ? object.fontSize : 0
    const [size, setSize] = useState(sizeText)

    const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    function handleChangeFontSize(event: React.ChangeEvent<HTMLInputElement>) {
        if (digits.includes(event.target.value.slice(-1))) {
            setSize(Number(event.target.value))
            store.dispatch(setSizeText(Number(event.target.value)))
        }
    }

    return (
        <div>
            <div className={styles.header_layout}>
                <div className={styles.header}>Text Properties</div>
                <div className={styles.image_wrap} onClick={() => { 
                    props.setViewEditor({ view: false, state: '' })
                    store.dispatch(setSelectElement(null)) 
                }}>
                    <img className={styles.image} src="images/close.png" />
                </div>
            </div>
            <div className={styles.style_wrap} onClick={() => { props.setViewEditor({ view: true, state: 'FontChoose' }) }}>
                <div className={styles.font} style={{ fontFamily: (object !== null && isText(object)) ? object.font : 'error' }}>{(object !== null && isText(object)) ? object.font : 'error'}</div>
                <img className={styles.arrow} src="images/arrow_right.png" />
            </div>
            <div className={styles.layout}>
                <div className={styles.px}>px</div>
                <input className={styles.size_value} maxLength={5} type="text" value={sizeText} onChange={handleChangeFontSize} />
                <div
                    className={styles.color}
                    style={{
                        backgroundColor: (object !== null && isText(object)) ? object.color : 'error',
                        position: 'relative'
                    }}
                    onClick={() => { setIsComponentVisible(true) }}
                >
                    <span className={styles.color_triangle}></span>
                </div>
                <div className={styles.button_wrap} onClick={() => {
                    store.dispatch(deleteSelectElement())
                    props.setViewEditor({view: true, state: 'Text'})
                }}>
                    <img className={styles.button} src="images/bin.png" />
                </div>
            </div>
            <div ref={ref} className={(() => { return isComponentVisible ? styles.pickerWrap : '' })()} >
                {isComponentVisible && <ColorPicker
                    color={(object !== null && isText(object)) ? object.color : 'error'}
                    function={setColorText}
                />}
            </div>
        </div>
    )
}