import React, { MutableRefObject, useRef, useState } from 'react'
import styles from './Canvas.module.css'
import { Canvas as CanvasType } from './../../../model/Canvas/canvas'
import { SelectElement } from './SelectElement/SelectElement'
import { InputText } from './InputText/InputText'
import Elements from './Elements'

interface CanvasPropsType {
    canvas: CanvasType,
    stateViewEditor: {
        viewEditor: { view: boolean, state: string }
        setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    }
    refEditor: MutableRefObject<HTMLDivElement | null>,
}

export function Canvas(props: CanvasPropsType) {
    const ref: MutableRefObject<SVGTextElement | null> = useRef(null)
    const [viewInput, setViewInput] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    return (
        <div style={{
            width: props.canvas.size.width,
            height: props.canvas.size.height,
            background: props.canvas.background,
            zoom: 0.8
        }}
            className={styles.canvas}
        >
            <svg style={{ width: props.canvas.size.width, height: props.canvas.size.height }}>
                <Elements
                    canvas={props.canvas}
                    stateViewEditor={{
                        viewEditor: props.stateViewEditor.viewEditor,
                        setViewEditor: props.stateViewEditor.setViewEditor
                    }}
                    refEditor={props.refEditor} 
                    refText={ref}
                    position={position}
                    setPosition={setPosition}
                />
                <SelectElement
                    refText={ref}
                    selectElement={props.canvas.selectElement}
                    setViewEditor={props.stateViewEditor.setViewEditor}
                    setViewInput={setViewInput}
                    position={position}
                    setPosition={setPosition}
                />
                <InputText
                    refText={ref}
                    selectElement={props.canvas.selectElement}
                    view={viewInput}
                    setView={setViewInput}
                />
            </svg>
        </div>
    )
}