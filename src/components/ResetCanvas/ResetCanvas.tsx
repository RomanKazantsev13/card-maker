import React, { useCallback, useEffect, useState } from 'react'
import { dispatch } from '../../editor';
import { resetCanvas } from '../../model/Canvas/canvas';
import { Button } from '../SaveComputer/Button';
import styles from './ResetCanvas.module.css'


export function ResetCanvas(props: {
    view: boolean, 
    setView: (view: boolean) => void,
}) {

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
                <div className={styles.text}>You're about to start a new project. Your current project will be cleared and all unsaved changes will be a lost. Are you sure you woud like to continue?</div>
                <div className={styles.button_layout}>
                    <Button name={"No"} background={["#353948", "#484d61"]} color={"#f1f1f1"} onclick={props.setView} />
                    <Button name={"Yes"} background={["#8a9dff", "#647dff"]} color={"#000"} onclick={() => {
                        dispatch(resetCanvas, [])
                        props.setView(false)
                    }} />
                </div>
            </div>
        </div>
    )
}