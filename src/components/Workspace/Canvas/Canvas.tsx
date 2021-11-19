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

// при большем размере -> скрол

export function Canvas(props: {
    color: string
}) {
    return (
        <div style={{width: 800, height: 600, background: props.color, zoom: 0.8}} >
            {/* size={props.size} background={props.background}  */}
        </div>
    )
}