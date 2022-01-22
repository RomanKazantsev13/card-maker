import React, { useState } from 'react'
import styles from './CanvasTools.module.css'
import { ToolsButton } from './ToolsButton'
import { Panel } from './Panel/Panel'
import { Canvas, Figure, Stack } from '../../utils/types'
import { isEllipse, isFigure, isImage, isRectangle, isText, isTriangle } from '../../utils/typeGuards'
import { store } from '../../store/store'
import { redo, undo } from '../../store/actionCreators/HistoryActionCreators'

interface CanvasTools {
    canvas: Canvas,
    history: {
        undo: Array<Stack>,
        redo: Array<Stack>
    },
    setViewReset: (view: boolean) => void,
}

export type PanelItem = {
    image: string,
    name: string,
    style: React.CSSProperties
}

export function CanvasTools(props: CanvasTools) {

    const history: Array<PanelItem> = (() => {
        let undo: Array<PanelItem> = props.history.undo.map(function (elem, index) {
            return {
                image: elem.image,
                name: elem.name,
                style: { background: (() => { return (index !== props.history.undo.length - 1) ? '2e313f' : '#36365f' })() }
            }
        })
        let redo: Array<PanelItem> = props.history.redo.map(function (elem) {
            return {
                image: elem.image,
                name: elem.name,
                style: { opacity: 0.3 }
            }
        })
        undo = undo.concat(redo.reverse())
        return undo.reverse()
    })()

    const layers: Array<PanelItem> = (() => {
        let elements: Array<PanelItem> = []
        let shapeCount: number = 0
        let imageCount: number = 0
        let textCount: number = 0
        for (let i = 0; i < props.canvas.elements.length; i++) {
            let style: React.CSSProperties
            if (props.canvas.elements[i] === props.canvas.selectElement) {
                style = { background: '#36365f' }
            } else {
                style = { background: '#2e313f' }
            }
            const object = props.canvas.elements[i].object
            if (isFigure(object)) {
                const figure: Figure = object
                if (isTriangle(figure.figure)) {
                    shapeCount++
                    elements.push(
                        { name: 'Shape ' + shapeCount, image: 'images/triangle.png', style: style }
                    )
                }
                if (isRectangle(figure.figure)) {
                    shapeCount++
                    elements.push(
                        { name: 'Shape ' + shapeCount, image: 'images/square.png', style: style }
                    )
                }
                if (isEllipse(figure.figure)) {
                    shapeCount++
                    elements.push(
                        { name: 'Shape ' + shapeCount, image: 'images/circle.png', style: style }
                    )
                }
            } else if (isImage(object)) {
                imageCount++
                elements.push(
                    { name: 'Image ' + imageCount, image: 'images/image.png', style: style }
                )
            } else if (isText(object)) {
                textCount++
                elements.push(
                    { name: 'Text ' + textCount, image: 'images/text__hover.png', style: style }
                )
            }
        }
        return elements.reverse()
    })()

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
            {layers.length > 0 && <Panel style={styles.layers} name={'Layers'} elements={layers} view={viewLayers} setView={setViewLayers} />}
            <div className={styles.toolButtons}>
                <ToolsButton block={false} image={"images/reset.png"} name={"Reset"} onclick={() => { props.setViewReset(true) }} />
                <ToolsButton
                    block={(() => {
                        if (props.history.undo.length <= 1) {
                            return true
                        }
                        return false
                    })()}
                    image={"images/undo.png"} name={"Undo"} onclick={() => { store.dispatch(undo())  }} />
                <ToolsButton
                    block={(() => {
                        if (props.history.redo.length == 0) {
                            return true
                        }
                        return false
                    })()}
                    image={"images/redo.png"} name={"Redo"} onclick={() => { store.dispatch(redo()) }} />
                <ToolsButton
                    block={(() => {
                        if (history.length == 0) {
                            return true
                        }
                        return false
                    })()}
                    image={"images/history.png"} name={"History"}
                    onclick={() => {
                        if (viewHistory == styles.viewOff) {
                            setViewHistory(styles.viewOn)
                            return
                        }
                        setViewHistory(styles.viewOff)
                    }} />
                <Panel style={styles.history} name={'History'} elements={history} 
                    view={(() => {
                        return history.length == 0 ? styles.viewOff : viewHistory
                    })()} 
                    setView={setViewHistory} 
                />
            </div>
        </div>
    )
}