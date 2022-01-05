import React, { MutableRefObject, useRef, useState } from 'react'
import styles from './Canvas.module.css'
import { Canvas as CanvasType } from './../../../model/Canvas/canvas'
import { SelectElement } from './SelectElement/SelectElement'
import { InputText } from './InputText/InputText'
import Elements from './Elements/Elements'

interface CanvasPropsType {
    canvas: CanvasType,
    stateViewEditor: {
        viewEditor: { view: boolean, state: string }
        setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    }
    refSvg: MutableRefObject<SVGSVGElement | null>,
    refEditor: MutableRefObject<HTMLDivElement | null>,
}

export function Canvas(props: CanvasPropsType) {
    const refInputText: MutableRefObject<HTMLInputElement | null> = useRef(null)
    const [size, setSize] = useState({ width: 0, height: 0 })
    const [viewInput, setViewInput] = useState(false)
    const [positionSelectElement, setPositionSelectElement] = useState({ x: 0, y: 0 })
    const [inputValue, setInputValue] = useState('')
    return (
        <div style={{
            width: props.canvas.size.width,
            height: props.canvas.size.height,
            background: props.canvas.background,
            zoom: 0.8
        }}
            className={styles.canvas}   
        >
            <svg style={{ width: props.canvas.size.width, height: props.canvas.size.height }} ref={props.refSvg}>
                <Elements
                    setInputValue={setInputValue}
                    canvas={props.canvas}
                    stateViewEditor={{
                        viewEditor: props.stateViewEditor.viewEditor,
                        setViewEditor: props.stateViewEditor.setViewEditor
                    }}
                    refEditor={props.refEditor}
                    refInputText={refInputText}
                    positionSelectElement={positionSelectElement}
                    setPositionSelectElement={setPositionSelectElement}
                    setViewInput={setViewInput}
                    setSize={setSize}
                />
                {props.canvas.selectElement !== null && <SelectElement
                    selectElement={props.canvas.selectElement}
                    setViewEditor={props.stateViewEditor.setViewEditor}
                    setViewInput={setViewInput}
                    positionSelectElement={positionSelectElement}
                    setPositionSelectElement={setPositionSelectElement}
                    size={size}
                />}
                {viewInput && <InputText
                    selectElement={props.canvas.selectElement}
                    positionSelectElement={positionSelectElement}
                    refInputText={refInputText}
                    setViewEditor={props.stateViewEditor.setViewEditor}
                    stateInputValue={{ inputValue, setInputValue }}
                    stateViewInput={{ viewInput, setViewInput }}
                    stateSize={{ size, setSize }}
                />}
            </svg>
        </div>
    )
}