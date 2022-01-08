import React, { useCallback, useEffect, useState } from 'react'
import { dispatch } from '../../../editor';
import { Button } from '../SaveComputer/Button';
import styles from './UnavailableContent.module.css'

interface UnavailableContentPropsType {
    setView: (view: boolean) => void,
}

export function UnavailableContent(props: UnavailableContentPropsType) {

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
        <div className={styles.wrap}>
            <div className={styles.content_layout}>
                <div className={styles.text}>
                This functionality is currently unavailable. The author apologizes for the inconvenience, please try again later.
                </div>
                <div className={styles.button_layout}>
                    <Button content={"Okey"} background={["#8a9dff", "#647dff"]} color={"#000"} onclick={() => {
                        props.setView(false)
                    }} />
                </div>
            </div>
        </div>
    )
}