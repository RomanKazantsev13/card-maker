/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Canvas as CanvasT } from '../../model/Canvas/canvas'
import { Canvas } from '../Workspace/Canvas/Canvas'
import styles from './Workspace.module.css'

interface CanvasType {
    canvas: CanvasT,
}

export function Workspace(props: CanvasType) {
    return (
        <div className={styles.workspace} >
           <Canvas  /> {/* size={props.size} background={props.background} */}
        </div>
    )
}