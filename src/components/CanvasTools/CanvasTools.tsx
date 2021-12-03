import React, { useState } from 'react'
import { Canvas } from '../../model/Canvas/canvas'
import styles from './CanvasTools.module.css'
import { ToolsButton } from './ToolsButton'
import { Panel } from './Panel/Panel'
import { redo, Stack, undo } from '../../model/Card/History/history'
import { Figure, isFigure } from '../../model/Canvas/Element/Figure/figure'
import { isTriangle } from '../../model/Canvas/Element/Figure/Triangle/triangle'
import { isRectangle } from '../../model/Canvas/Element/Figure/Rectangle/rectangle'
import { isEllipse } from '../../model/Canvas/Element/Figure/Ellipse/ellipse'
import {    isImage } from '../../model/Canvas/Element/Image/image'
import { isText } from '../../model/Canvas/Element/Text/text'
import { dispatch } from '../../editor'

interface CanvasTools {
    canvas: Canvas,
    history: {
        undo: Array<Stack>,
        redo: Array<Stack>
    },
    setViewReset: (view: boolean) => void,
}

export type panelItem = {
    image: string,
    name: string,
    style: React.CSSProperties
}

export function CanvasTools(props: CanvasTools) {

    const history: Array<panelItem> = (() => {
        let undo: Array<panelItem> = []
        let redo: Array<panelItem> = []
        for (let i = props.history.undo.length - 1; i >= 0; i--) {
            undo.push({
                image: props.history.undo[i].image,
                name: props.history.undo[i].name,
                style: { background: '2e313f' }
            })
        }

        undo[0].style = { background: '#36365f' }

        for (let i = 0; i < props.history.redo.length; i++) {
            redo.push({
                image: props.history.redo[i].image,
                name: props.history.redo[i].name,
                style: { opacity: 0.3 }
            })
        }
        return redo.concat(undo)
    })()

    const layers: Array<panelItem> = (() => {
        let elements: Array<panelItem> = []
        let shapeCount: number = 0
        let imageCount: number = 0
        let textCount: number = 0
        for (let i = 0; i < props.canvas.elements.length; i++) {
            let style: React.CSSProperties
            if (props.canvas.elements[i] === props.canvas.selectElement) {
                style = {background: '#36365f'}
            } else {
                style = {background: '#2e313f'}
            }
            const object = props.canvas.elements[i].object
            if (isFigure(object)) {
                const figure: Figure = object
                if (isTriangle(figure)) {
                    shapeCount++
                    elements.push(
                        {name: 'Shape ' + shapeCount, image: 'images/triangle.png', style: style}
                    )
                }
                if (isRectangle(figure)) {
                    shapeCount++
                    elements.push(
                            {name: 'Shape ' + shapeCount, image: 'images/square.png', style: style}
                    )
                }
                if (isEllipse(figure)) {
                    shapeCount++
                    elements.push(
                            {name: 'Shape ' + shapeCount, image: 'images/circle.png', style: style}
                    )
                }
            } else if (isImage(object)) {
                imageCount++
                elements.push(
                    {name: 'Image ' + imageCount, image: 'images/image.png', style: style}
                )
            } else if (isText(object)) {
                textCount++
                elements.push(
                    {name: 'Text ' + textCount, image: 'images/text__hover.png', style: style}
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
            <Panel style={styles.layers} name={'Layers'} elements={layers} view={viewLayers} setView={setViewLayers} />
            <div className={styles.toolButtons}>
                <ToolsButton block={false} image={"images/reset.png"} name={"Reset"} onclick={() => { props.setViewReset(true) }} />
                <ToolsButton
                    block={(() => {
                        if (props.history.undo.length <= 1) {
                            return true
                        }
                        return false
                    })()}
                    image={"images/undo.png"} name={"Undo"} onclick={() => {dispatch(undo)}} />
                <ToolsButton
                    block={(() => {
                        if (props.history.redo.length == 0) {
                            return true
                        }
                        return false
                    })()}
                    image={"images/redo.png"} name={"Redo"} onclick={() => {dispatch(redo)}} />
                <ToolsButton
                    block={(
                        () => {
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
                <Panel style={styles.history} name={'History'} elements={history} view={viewHistory} setView={setViewHistory} />
            </div>
        </div>
    )
}