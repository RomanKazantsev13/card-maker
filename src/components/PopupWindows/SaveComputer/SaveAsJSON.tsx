import React, { createRef, RefObject, useCallback, useEffect, useState } from 'react'
import { store } from '../../../store/store'
import { Canvas } from '../../../utils/types'
import { Button } from './Button'
import styles from './SaveAsJSON.module.css'

interface SaveComputerPropsType {
    setView: (view: boolean) => void,
}

export function SaveAsJSON(props: SaveComputerPropsType) {
    const refCanvas: RefObject<HTMLCanvasElement> = createRef()
    const refInput: RefObject<HTMLInputElement> = createRef()
    const [format, setFormat] = useState('JPEG')
    const [fileName, setFileName] = useState('')
    const [boxShadow, setBoxShadow] = useState('none')

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

    const handleSetFileName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(event.target.value)
    }

    const handleFocusInput = () => {
        setBoxShadow('0 0 0 2px #424284')
    }

    const handleFocusOutInput = () => {
        setBoxShadow('none')
    }

    return (
        <div className={styles.modal_window}>
            <div className={styles.content_layout}>
                <div className={styles.header}>Save as JSON</div>
                <label className={styles.subHeader}>Filename</label>
                <input
                    ref={refInput}
                    className={styles.input}
                    style={{
                        boxShadow: boxShadow
                    }}
                    onFocus={handleFocusInput}
                    onBlur={handleFocusOutInput}
                    type="text" maxLength={100}
                    required
                    placeholder="Назови меня!"
                    onChange={handleSetFileName}
                />
                <div className={styles.button_layout}>
                    <Button content={"Close"} background={["#353948", "#484d61"]} color={"#f1f1f1"} onclick={props.setView} />
                    <Button content={"Save"} background={["#8a9dff", "#647dff"]} color={"#000"} onclick={() => {
                        if (fileName) {
                            let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(store.getState().canvas));
                            let dlAnchorElem = document.createElement('a');
                            dlAnchorElem.setAttribute("href",     dataStr     );
                            dlAnchorElem.setAttribute("download", fileName + ".json");
                            dlAnchorElem.click();
                            setBoxShadow('0 0 0 2px #424284')
                        } else {
                            const input = refInput.current
                            if (input) {
                                input.focus()
                                setBoxShadow('0 0 0 2px #FF0000')
                            }
                        } 
                    } }/>
                </div>
            </div>
        </div>
    )
}