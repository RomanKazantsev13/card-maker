import React, { MutableRefObject } from 'react'
import styles from './Workspace.module.css'
import type { Canvas as CanvasType } from '../../model/Canvas/canvas'
import { Canvas } from '../Workspace/Canvas/Canvas'

interface WorkspacePropsType {
    canvas: CanvasType,
    refEditor: MutableRefObject<HTMLDivElement | null>,
    width: string,
    stateViewEditor: {
        viewEditor: { view: boolean, state: string }
        setViewEditor: (viewEditor: { view: boolean, state: string }) => void
    }
}

export function Workspace(props: WorkspacePropsType) {
    return (
        <div className={styles.workspace} style={{ width: props.width }}>
            <Canvas
                canvas={props.canvas}
                stateViewEditor={{
                    viewEditor: props.stateViewEditor.viewEditor,
                    setViewEditor: props.stateViewEditor.setViewEditor
                }}
                refEditor={props.refEditor}
            />
        </div>
    )
}