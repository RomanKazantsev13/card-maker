import React, { createRef, MutableRefObject, RefObject, useCallback, useEffect, useState } from 'react'
import { store } from '../../../store/store'
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

    const saveCanvas = () => {
        const canvas = refCanvas.current
        if (canvas) {
            const ctx = canvas.getContext("2D")
            if (ctx) {

            }
        }
    }

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
                        saveCanvas()
                    }} />
                </div>
            </div>
            <canvas ref={refCanvas} width={store.getState().canvas.size.width} height={store.getState().canvas.size.height} style={{ display: 'none' }}></canvas>
        </div>
    )
}