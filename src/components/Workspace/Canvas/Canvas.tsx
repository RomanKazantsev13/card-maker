/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import styles from './Canvas.module.css'

interface CanvasType {
    size: {
        width: number,
        height: number
    },
    background: string
}

export function Canvas() {
    return (
        <div style={{width: 800, height: 600, background: '#FFF', zoom: 0.8}} >
            {/* size={props.size} background={props.background}  */}
        </div>
    )
}