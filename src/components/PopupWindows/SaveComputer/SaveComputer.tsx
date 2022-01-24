import React, { createRef, MutableRefObject, RefObject, useCallback, useEffect, useState } from 'react'
import { store } from '../../../store/store'
import { isEllipse, isFigure, isImage, isRectangle, isText, isTriangle } from '../../../utils/typeGuards'
import { Canvas, Element, Ellipse, Image as ImageType, Point, Rectangle, Size, Text, Triangle } from '../../../utils/types'
import { Button } from './Button'
import styles from './SaveComputer.module.css'

interface SaveComputerPropsType {
    setView: (view: boolean) => void,
    refSvg: MutableRefObject<SVGSVGElement | null>,
}

export function SaveComputer(props: SaveComputerPropsType) {
    const refCanvas: RefObject<HTMLCanvasElement> = createRef()
    const refButton: RefObject<HTMLAnchorElement> = createRef()
    const [format, setFormat] = useState('JPG')

    const isJpg = () => {
        return format == 'JPG' ? styles.format_selected : ''
    }
    const isPng = () => {
        return format == 'PNG' ? styles.format_selected : ''
    }

    const escFunction = useCallback((event) => {
        if (event.keyCode === 27) {
            props.setView(false)
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
        return () => {
            document.removeEventListener("keydown", escFunction, false);
        };
    }, []);

    const canvasModel: Canvas = store.getState().canvas

    return (
        <div className={styles.modal_window}>
            <div className={styles.content_layout}>
                <div className={styles.header}>Save to Computer</div>
                <label className={styles.subHeader}>Filename</label>
                <input className={styles.input} type="text" maxLength={100} required placeholder="Назови меня!" />
                <label className={styles.subHeader}>Format</label>
                <div className={styles.format}>
                    <div className={styles.format__buttonWrap + ' ' + styles.format__buttonJPG + ' ' + isJpg()} onClick={() => { setFormat('JPG') }}>
                        <div>JPG</div>
                    </div>
                    <div className={styles.format__buttonWrap + ' ' + styles.format__buttonPNG + ' ' + isPng()} onClick={() => { setFormat('PNG') }}>
                        <div>PNG</div>
                    </div>
                </div>
                <a ref={refButton} className={styles.subHeader}>Dimensions</a>
                <div className={styles.canvasSize}>{store.getState().canvas.size.width} × {store.getState().canvas.size.height} px</div>
                <div className={styles.button_layout}>
                    <Button content={"Cancel"} background={["#353948", "#484d61"]} color={"#f1f1f1"} onclick={props.setView} />
                    <Button content={"Save"} background={["#8a9dff", "#647dff"]} color={"#000"} onclick={() => {
                        saveCanvas(refCanvas.current, canvasModel.elements, canvasModel.background, canvasModel.size)
                    }} />
                </div>
            </div>
            <canvas
                ref={refCanvas}
                width={canvasModel.size.width}
                height={canvasModel.size.height}
                style={{
                    display: "none"
                }}
            >
            </canvas>
        </div>
    )
}

async function saveCanvas(canvas: HTMLCanvasElement | null, elements: Array<Element>, background: string, size: Size) {
    if (canvas !== null) {
        const ctx = canvas.getContext("2d")
        if (ctx !== null) {
            drawBackground(ctx, background, size)
            let element: Element
            for (element of elements) {
                if (isFigure(element.object)) {
                    if (isTriangle(element.object.figure)) {
                        drawTriangle(ctx, element.object.figure, element.object.color)
                    }
                    if (isRectangle(element.object.figure)) {
                        drawRectangle(ctx, element.object.figure, element.object.color, element.centre)
                    }
                    if (isEllipse(element.object.figure)) {
                        drawEllipse(ctx, element.object.figure, element.object.color, element.centre)
                    }
                }
                if (isImage(element.object)) {
                    await drawImage(ctx, element.object, element.centre)
                }
                if (isText(element.object)) {
                    drawText(ctx, element.centre, element.object)
                }
            }
            const url = canvas.toDataURL("text.png")
            const download = document.createElement("a")
            download.href = url
            download.download = "WTF"
            download.click()
        }
    }
}

function drawBackground(context: any, background: string, size: Size) {
    context.fillStyle = background
    context.fillRect(0, 0, size.width, size.height)
}

function drawTriangle(context: any, triangle: Triangle, color: string) {
    context.beginPath()
    context.moveTo(triangle.firstPoint.x, triangle.firstPoint.y)
    context.lineTo(triangle.secondPoint.x, triangle.secondPoint.y)
    context.lineTo(triangle.thirdPoint.x, triangle.thirdPoint.y)
    context.fillStyle = color
    context.fill()
}

function drawRectangle(context: any, rectangle: Rectangle, color: string, centre: Point) {
    context.fillStyle = color
    context.fillRect(centre.x, centre.y, rectangle.size.width, rectangle.size.height)
}

function drawEllipse(context: any, ellipse: Ellipse, color: string, centre: Point) {
    context.fillStyle = color
    context.beginPath()
    context.ellipse(centre.x + ellipse.rx, centre.y + ellipse.ry, ellipse.rx, ellipse.ry, 0, 0, 2 * Math.PI)
    context.fill()
}

async function drawImage(context: any, imageFromModel: ImageType, centre: Point) {
    const image: HTMLImageElement = new Image()
    image.src = imageFromModel.url
    await image.decode()
    context.drawImage(image, centre.x, centre.y, imageFromModel.size.width, imageFromModel.size.height)
}

function drawText(context: any, centre: Point, text: Text) {
    context.font = "" + text.fontSize + "px " + text.font
    context.fillStyle = text.color
    context.fillText(text.str, centre.x, centre.y)
}