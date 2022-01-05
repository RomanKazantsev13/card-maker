import React, { createRef, LabelHTMLAttributes, MutableRefObject, RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { InputType } from 'zlib'
import { Button } from './Button'
import styles from './SaveComputer.module.css'

interface SaveComputerPropsType {
    setView: (view: boolean) => void,
    size: {
        width: number,
        height: number
    },
    refSvg: MutableRefObject<SVGSVGElement | null>,
}

export function SaveComputer(props: SaveComputerPropsType) {
    const ref: RefObject<HTMLCanvasElement> = createRef()
    const refDow: RefObject<HTMLAnchorElement> = createRef()
    const refImage: RefObject<HTMLImageElement> = createRef()
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
                <a ref={refDow} className={styles.subHeader}>Dimensions</a>
                <div className={styles.canvasSize}>{props.size.width} × {props.size.height} px</div>
                <div className={styles.button_layout}>
                    <Button content={"Cancel"} background={["#353948", "#484d61"]} color={"#f1f1f1"} onclick={props.setView} />
                    <Button content={"Save"} background={["#8a9dff", "#647dff"]} color={"#000"} onclick={() => {
                        
                    let html = props.refSvg.current && props.refSvg.current.innerHTML;
                    let imgsrc = ''
                    if (html !== null) {
                        imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
                    }
                    let canvas: HTMLCanvasElement | null = ref.current
                    let context: CanvasRenderingContext2D | null = canvas && canvas.getContext("2d")
                    let image = refImage.current
                    if (imgsrc !== null && image !== null) {
                        image.onload = function() {
                            console.log('1')
                            if (context !== null && canvas !== null) {
                            if (image !== null) {context.drawImage(image, 0, 0);}      
                            var canvasdata = canvas.toDataURL("image/png");
                            var a = refDow.current
                            console.log(a)
                            if (a !== null) {
                                a.download = "export_"+Date.now()+".png";
                                a.href = canvasdata; 
                            }
                        }
                        if (image !== null) {
                            image.src = imgsrc
                        }
                    }}
                }} />
                </div>
            </div>
            <canvas ref={ref} width={props.size.width} height={props.size.height}></canvas>
            <img ref={refImage} />
        </div>
    )
}