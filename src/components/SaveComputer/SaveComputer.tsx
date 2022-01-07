import React, { createRef, LabelHTMLAttributes, MutableRefObject, RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { InputType } from 'zlib'
import { dispatch } from '../../editor'
import { setSelectElement } from '../../model/Canvas/Element/element'
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
                <div className={styles.canvasSize}>{props.size.width} × {props.size.height} px</div>
                <div className={styles.button_layout}>
                    <Button content={"Cancel"} background={["#353948", "#484d61"]} color={"#f1f1f1"} onclick={props.setView} />
                    <Button content={"Save"} background={["#8a9dff", "#647dff"]} color={"#000"} onclick={() => {
                        dispatch(setSelectElement, null)
                        var btn = refButton.current;
                        var svg = props.refSvg.current;
                        var canvas = refCanvas.current;
                        
                        function triggerDownload(imgURI: string) {
                          var evt = new MouseEvent('click', {
                            view: window,
                            bubbles: false,
                            cancelable: true
                          });
                        
                          var a = document.createElement('a');
                          a.setAttribute('download', 'MY_COOL_IMAGE.png');
                          a.setAttribute('href', imgURI);
                          a.setAttribute('target', '_blank');
                        
                          a.dispatchEvent(evt);
                        }
                        
                        if (btn !== null) {
                            btn.addEventListener('click', function () {
                                var canvas = refCanvas.current;
                                if (canvas !== null) {
                                    var ctx = canvas.getContext('2d');
                                    if (svg !== null) {
                                        var data = (new XMLSerializer()).serializeToString(svg);
                                        var DOMURL = window.URL || window.webkitURL || window;
                              
                                        var img = new Image();
                                        img.crossOrigin = "anonymous"
                                        var svgBlob = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
                                        var url = DOMURL.createObjectURL(svgBlob);
                              
                                        img.onload = function () {
                                            if (ctx !== null) {
                                                ctx.drawImage(img, 0, 0);
                                                DOMURL.revokeObjectURL(url);
                              
                                                if (canvas !== null) {
                                                    var imgURI = canvas
                                                                    .toDataURL('image/png')
                                                                    .replace('image/png', 'image/octet-stream');
                              
                                                    triggerDownload(imgURI);
                                                }
                                            }
                                        }
                                        img.src = url;
                                    };
                                }
                            });
                        }
                        {refButton.current && refButton.current.click()}
                }} />
                </div>
            </div>
            <canvas ref={refCanvas} width={props.size.width} height={props.size.height} style={{display: 'none'}}></canvas>
        </div>
    )
}