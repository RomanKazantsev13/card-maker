import React, { MutableRefObject, RefObject, useCallback, useEffect, useRef, useState } from 'react'
import styles from './Canvas.module.css'
import { Canvas as CanvasType } from './../../../model/Canvas/canvas'
import { SelectElement } from './SelectElement/SelectElement'
import { InputText } from './InputText/InputText'
import Elements from './Elements/Elements'
import { dispatch } from '../../../editor'
import { deleteSelectElement } from '../../../model/Canvas/Element/element'

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
    const [positionPoints, setPositionPoints] = useState({
        border: {x: 0, y: 0},
        pointTopLeft: {x: 0, y: 0},
        pointTopRight: {x: 0, y: 0},
        pointBottomLeft: {x: 0, y: 0},
        pointBottomRight: {x: 0, y: 0},
        blockTop: {x: 0, y: 0},
        blockLeft: {x: 0, y: 0},
        blockRight: {x: 0, y: 0},
        blockBottom: {x: 0, y: 0},
    })
    const pointTopLeftRef: RefObject<HTMLDivElement> = useRef(null)
    const pointTopRightRef: RefObject<HTMLDivElement> = useRef(null)
    const pointBottomLeftRef: RefObject<HTMLDivElement> = useRef(null)
    const pointBottomRightRef: RefObject<HTMLDivElement> = useRef(null)
    const borderTopRef: RefObject<HTMLDivElement> = useRef(null)
    const borderLeftRef: RefObject<HTMLDivElement> = useRef(null)
    const borderRightRef: RefObject<HTMLDivElement> = useRef(null)
    const borderBottomRef: RefObject<HTMLDivElement> = useRef(null)
    let refs = [pointTopLeftRef, pointTopRightRef, pointBottomLeftRef, pointBottomRightRef, borderTopRef, borderLeftRef, borderRightRef, borderBottomRef]
    const refInputText: RefObject<HTMLInputElement> = useRef(null)
    const [viewInput, setViewInput] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const escFunction = (event: any) => {
        if (event.keyCode === 46 && props.canvas.selectElement !== null) {
            dispatch(deleteSelectElement)
            if (props.stateViewEditor.viewEditor.state == 'Figure Properties') {
                props.stateViewEditor.setViewEditor({view: true, state: 'Graphics'})
            }
            if (props.stateViewEditor.viewEditor.state == 'Text Properties') {
                props.stateViewEditor.setViewEditor({view: true, state: 'Text'})
            }
            if (props.stateViewEditor.viewEditor.state == 'FontChoose') {
                props.stateViewEditor.setViewEditor({view: true, state: 'Text'})
            }
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    });

    return (
        <div style={{
            width: props.canvas.size.width,
            height: props.canvas.size.height,
            zoom: 0.8
        }}
            className={styles.canvas}   
        >
            <svg style={{ width: props.canvas.size.width, height: props.canvas.size.height, background: props.canvas.background }} ref={props.refSvg}>
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
                    statePointsSelectElement={{positionPoints, setPositionPoints}}
                    stateViewInput={{ viewInput, setViewInput }}
                    stateSizeSelectElement={{size: props.stateSizeSelectElement.sizeSelectElement, setSize: props.stateSizeSelectElement.setSizeSelectElement}}
                    refs={refs}
                />
                {props.canvas.selectElement !== null && <SelectElement
                    selectElement={props.canvas.selectElement}
                    setViewEditor={props.stateViewEditor.setViewEditor}
                    setViewInput={setViewInput}
                    statePointsSelectElement={{positionPoints, setPositionPoints}}
                    size={props.stateSizeSelectElement.sizeSelectElement}
                    refs={refs}
                />}
                {viewInput && <InputText
                    selectElement={props.canvas.selectElement}
                    positionSelectElement={positionPoints.pointTopLeft}
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