import React, { MutableRefObject } from 'react'
import styles from './Workspace.module.css'
import type { Canvas as CanvasType } from '../../model/Canvas/canvas'
import { Canvas } from '../Workspace/Canvas/Canvas'

interface WorkspacePropsType {
    canvas: CanvasType,
    refEditor: MutableRefObject<HTMLDivElement | null>,
    refSvg: MutableRefObject<SVGSVGElement | null>,
    width: string,
    stateSizeSelectElement: {
        sizeSelectElement: {width: number, height: number},
        setSizeSelectElement: (size: {width: number, height: number}) => void,
    },
    stateViewEditor: {
        viewEditor: { view: boolean, state: string }
        setViewEditor: (viewEditor: { view: boolean, state: string }) => void
    },
    setRefText: (refText: MutableRefObject<SVGTextElement | null>) => void,
}

export function Workspace(props: WorkspacePropsType) {
    return (
        <div className={styles.workspace} style={{ width: props.width }}>
            <Canvas
                canvas={props.canvas}
                stateSizeSelectElement={{
                    sizeSelectElement: props.stateSizeSelectElement.sizeSelectElement, 
                    setSizeSelectElement: props.stateSizeSelectElement.setSizeSelectElement
                }}
                stateViewEditor={{
                    viewEditor: props.stateViewEditor.viewEditor,
                    setViewEditor: props.stateViewEditor.setViewEditor
                }}
                refSvg={props.refSvg}
                refEditor={props.refEditor}
                setRefText={props.setRefText}
            />
        </div>
    )
}