import React from 'react'
import { Canvas } from '../../model/Canvas/canvas'
import styles from './CanvasTools.module.css'

interface CanvasTools{
    canvas: Canvas,
    history: {
        undo: Array<Canvas>,
        redo: Array<Canvas>
    },
}

export function CanvasTools(props: CanvasTools) {
    return (
        <div className={styles.canvasTools}>
            {/* <LayersButton layers={props.canvas.elements} />
            <ResetButton />
            <UndoButton />
            <RedoButton />
            <HistoryButton history={props.history} /> */}
        </div>
    )
}