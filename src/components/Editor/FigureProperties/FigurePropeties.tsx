import React from 'react'
import useComponentVisible from '../../../customHooks/useComponentVisible'
import { deleteSelectElement, setSelectElement } from '../../../store/actionCreators/ElementsActionCreators'
import { setColorFigure } from '../../../store/actionCreators/FigureActionCreators'
import { store } from '../../../store/store'
import { isFigure } from '../../../utils/typeGuards'
import { Element } from '../../../utils/types'
import { ColorPicker } from '../../ColorPicker/ColorPicker'
import styles from './FigureProperties.module.css'

interface FigurePropertiesPropsType {
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
}

export function FigureProperties(props: FigurePropertiesPropsType) {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)
    return (
        <div>
            <div className={styles.header_layout}>
                <div className={styles.header}>Figure Properties</div>
                <div className={styles.image_wrap} onClick={() => {
                    props.setViewEditor({ view: false, state: '' })
                    store.dispatch(setSelectElement(null))
                }}>
                    <img className={styles.image} src="images/close.png" />
                </div>
            </div>
            <div className={styles.colors}>
                <div className={styles.text}>Color</div>
                <div className={styles.picker_layout}>
                    <div
                        className={styles.color}
                        style={{
                            backgroundColor: (() => {
                                const selectElement: Element | null = store.getState().canvas.selectElement
                                const figure: unknown = selectElement !== null ? selectElement.object : null
                                if (figure !== null && isFigure(figure)) {
                                    return figure.color
                                }
                                return '#FFF'
                            })(),
                            position: 'relative'
                        }}
                        onClick={() => { setIsComponentVisible(true) }}
                    >
                        <span className={styles.color_triangle}></span>
                    </div>
                </div>
            </div>
            <div className={styles.button_wrap} onClick={() => {
                props.setViewEditor({ view: true, state: 'Graphics' })
                store.dispatch(deleteSelectElement())
            }}>
                <img className={styles.button} src="images/bin.png" />
            </div>
            <div ref={ref} className={(() => { return isComponentVisible ? styles.pickerWrap : '' })()} >
                {isComponentVisible && <ColorPicker color={(() => {
                    const selectElement: Element | null = store.getState().canvas.selectElement
                    const figure: unknown = selectElement !== null ? selectElement.object : null
                    if (figure !== null && isFigure(figure)) {
                        return figure.color
                    }
                    return '#FFF'
                })()} function={setColorFigure} />}
            </div>
        </div>
    )
}