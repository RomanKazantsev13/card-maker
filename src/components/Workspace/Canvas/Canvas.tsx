import React, { MutableRefObject, useRef, useState } from 'react'
import styles from './Canvas.module.css'
import { Canvas as CanvasType } from './../../../model/Canvas/canvas'
import { SelectElement } from './SelectElement/SelectElement'
import { InputText } from './InputText/InputText'
import Elements from './Elements/Elements'

interface CanvasPropsType {
    canvas: CanvasType,
    stateSizeSelectElement: {
        sizeSelectElement: {width: number, height: number},
        setSizeSelectElement: (size: {width: number, height: number}) => void,
    },
    stateViewEditor: {
        viewEditor: { view: boolean, state: string }
        setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    }
    refSvg: MutableRefObject<SVGSVGElement | null>,
    refEditor: MutableRefObject<HTMLDivElement | null>,
    setRefText: (refText: MutableRefObject<SVGTextElement | null>) => void,
}

export function Canvas(props: CanvasPropsType) {
    const refInputText: MutableRefObject<HTMLInputElement | null> = useRef(null)
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
                    setRefText={props.setRefText}
                    positionSelectElement={positionSelectElement}
                    setPositionSelectElement={setPositionSelectElement}
                    setViewInput={setViewInput}
                    setSize={props.stateSizeSelectElement.setSizeSelectElement}
                />
                {props.canvas.selectElement !== null && <SelectElement
                    selectElement={props.canvas.selectElement}
                    setViewEditor={props.stateViewEditor.setViewEditor}
                    setViewInput={setViewInput}
                    positionSelectElement={positionSelectElement}
                    setPositionSelectElement={setPositionSelectElement}
                    size={props.stateSizeSelectElement.sizeSelectElement}
                />}
                {viewInput && <InputText
                    selectElement={props.canvas.selectElement}
                    positionSelectElement={positionSelectElement}
                    refInputText={refInputText}
                    setViewEditor={props.stateViewEditor.setViewEditor}
                    stateInputValue={{ inputValue, setInputValue }}
                    stateViewInput={{ viewInput, setViewInput }}
                    stateSize={{
                        size: props.stateSizeSelectElement.sizeSelectElement, 
                        setSize: props.stateSizeSelectElement.setSizeSelectElement
                    }}
                />}
            </svg>
        </div>
    )
}