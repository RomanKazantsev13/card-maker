/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { LegacyRef, MutableRefObject, useRef } from 'react'
import styles from './Workspace.module.css'
import type { Canvas as CanvasType } from '../../model/Canvas/canvas'
import { Canvas } from '../Workspace/Canvas/Canvas'

interface WorkspacePropsType {
    canvas: CanvasType,
    width: string,
    setViewEditor: (viewEditor: {view: boolean, state: string}) => void,
    refEditor: any
}

export function Workspace(props: WorkspacePropsType) {
    return (
        <div className={styles.workspace} style={{width: props.width}}>
           <Canvas canvas={props.canvas} setViewEditor={props.setViewEditor} refEditor={props.refEditor} /> 
        </div>
    )
}