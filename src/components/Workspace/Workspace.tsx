import React, { MutableRefObject } from 'react'
import styles from './Workspace.module.css'
import { Canvas } from '../Workspace/Canvas/Canvas'
import { store } from '../../store/store'

interface WorkspacePropsType {
    refEditor: MutableRefObject<HTMLDivElement | null>,
    refSvg: MutableRefObject<SVGSVGElement | null>,
    stateSizeSelectElement: {
        sizeSelectElement: {width: number, height: number},
        setSizeSelectElement: (size: {width: number, height: number}) => void,
    },
    stateViewEditor: {
        viewEditor: { view: boolean, state: string }
        setViewEditor: (viewEditor: { view: boolean, state: string }) => void
    },
}

export function Workspace(props: WorkspacePropsType) {
    return (
        <div className={styles.workspace} style={{ width: (() => { return props.stateViewEditor.viewEditor.view ? 'calc(100% - 270px)' : '100%' })() }}>
            <Canvas
                canvas={store.getState().canvas}
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
            />
        </div>
    )
}