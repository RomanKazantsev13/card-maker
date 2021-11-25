import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './Button'
import styles from './SaveComputer.module.css'


export function SaveComputer(props: {
    view: boolean,
    setView: (view: boolean) => void,
}) {

    const [format, setFormat] = useState('JPG')

    const isJpg = () => {
        if (format == 'JPG') {
            return styles.selected
        }
        return ''
    }

    const isPng = () => {
        if (format == 'PNG') {
            return styles.selected
        }
        return ''
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
        <div className={styles.wrap + ' ' + (() => {
            if (props.view) {
                return styles.viewOn
            }
            return styles.viewOff
        })()}>
            <div className={styles.content_layout}>
                <div className={styles.header}>Save to Computer</div>
                <label className={styles.subHeader}>Filename</label>
                <input className={styles.input} type="text" maxLength={100} required placeholder="Назови меня!" />
                <label className={styles.subHeader}>Format</label>
                <div className={styles.format}>
                    <div className={styles.buttonWrap + ' ' + styles.buttonJPG + ' ' + isJpg()} onClick={() => { setFormat('JPG') }}>
                        <div>JPG</div>
                    </div>
                    <div className={styles.buttonWrap + ' ' + styles.buttonPNG + ' ' + isPng()} onClick={() => { setFormat('PNG') }}>
                        <div>PNG</div>
                    </div>
                </div>
                <label className={styles.subHeader}>Dimensions</label>
                <div className={styles.canvasSize}>width × height px</div>
                <div className={styles.buttonLayout}>
                    <Button name={"Cancel"} background={["#353948", "#484d61"]} color={"#f1f1f1"} onclick={props.setView} />
                    <Button name={"Save"} background={["#8a9dff", "#647dff"]} color={"#000"} onclick={() => { }} />
                </div>
            </div>
        </div>
    )
}