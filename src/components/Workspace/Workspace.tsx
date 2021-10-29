/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Canvas as CanvasType } from '../../model/Canvas/canvas'
import { Canvas } from '../Workspace/Canvas/Canvas'
import styles from './PrimaryPanel.module.css'

export function Workspace() {
    return (
        <div>
           <Canvas  /> {/* size={props.size} background={props.background} */}
        </div>
    )
}