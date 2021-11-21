import React, { useState } from 'react'
import { Canvas } from '../../model/Canvas/canvas'
import styles from './CanvasTools.module.css'
import { ToolsButton } from './ToolsButton'
import { Panel } from './Panel/Panel'

interface CanvasTools {
    canvas: Canvas,
    history: {
        undo: Array<Canvas>,
        redo: Array<Canvas>
    },
}

const layers = [
    { image: "images/image.png", name: "Image 1" },
    { image: "images/triangle.png", name: "Shape 1" },
    { image: "images/square.png", name: "Shape 2" },
    { image: "images/circle.png", name: "Shape 3" },
    { image: "images/text.png", name: "Text 1" },
    { image: "images/image.png", name: "Image 2" },
    { image: "images/square.png", name: "Shape 4" },
    { image: "images/circle.png", name: "Shape 5" },
    { image: "images/text.png", name: "Text 2" },
    { image: "images/image.png", name: "Image 3" },
]

const history = [
    { image: "images/square.png", name: "New Template" },
    { image: "images/triangle.png", name: "Add Triangle" },
    { image: "images/square.png", name: "Add Rectangle" },
    { image: "images/circle.png", name: "Add Ellipse" },
    { image: "images/text.png", name: "Add Text" },
    { image: "images/image.png", name: "Move Image" },
]

export function CanvasTools(props: CanvasTools) {

    const [viewLayers, setViewLayers] = useState(styles.viewOff)
    const [viewHistory, setViewHistory] = useState(styles.viewOff)
    return (
        <div className={styles.canvasTools}>
            <ToolsButton block={(
                () => {
                    if (layers.length == 0) {
                        return true
                    }
                    return false
                }
            )()} image={"images/layers.png"} name={"Layers"} onclick={() => {
                if (viewLayers == styles.viewOff) {
                    setViewLayers(styles.viewOn)
                    return
                }
                setViewLayers(styles.viewOff)
            }} />
            <Panel style={styles.layers} name={'Layers'} elements={layers} view={viewLayers} setView={setViewLayers} />
            <div className={styles.toolButtons}>
                <ToolsButton block={false} image={"images/reset.png"} name={"Reset"} onclick={() => {}} />
                <ToolsButton block={true} image={"images/undo.png"} name={"Undo"} onclick={() => {}}  />
                <ToolsButton block={true} image={"images/redo.png"} name={"Redo"} onclick={() => {}}  />
                <ToolsButton block={(
                () => {
                    if (history.length == 0) {
                        return true
                    }
                    return false
                }
            )()} image={"images/history.png"} name={"History"} onclick={() => {
                    if (viewHistory == styles.viewOff) {
                        setViewHistory(styles.viewOn)
                        return
                    }
                    setViewHistory(styles.viewOff)
                }} />
                <Panel style={styles.history} name={'History'} elements={history} view={viewHistory} setView={setViewHistory} />
            </div>
        </div>
    )
}