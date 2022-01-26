import React, { ChangeEvent, createRef, RefObject, useState } from 'react'
import { Menu } from './Menu/Menu'
import { Logo } from './Logo/Logo'
import styles from './NavigationBar.module.css'
import { store } from '../../store/store'
import { addCanvasFromJSON } from '../../store/actionCreators/CanvasActionCreators'
import { Canvas } from '../../utils/types'

interface StateHoverPanelType {
    widthPanel: string,
    workspaceMarginLeft: string,
    widthEditor: string,
    widthWorkspace: string,
    hoverImage: boolean,
    displayButtonText: string,
    widthButton: string,
}

interface NavigationBarPropsType {
    stateHoverPanel: {
        hoverPanel: StateHoverPanelType,
        setHoverPanel: (hoverPanel: StateHoverPanelType) => void,
    }
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    setViewSave: (view: boolean) => void,
    setViewReset: (view: boolean) => void,
    setSaveJSON: (view: boolean) => void,
}

export function NavigationBar(props: NavigationBarPropsType) {
    const refInput: RefObject<HTMLInputElement> = createRef()
    return (
        <div className={styles.navbar}>
            <Logo />
            <div className={styles.button__layout}>
                <Menu name={'Open'} functional={'New Design'} height={'135px'}>
                    <div className={styles.list_element} onClick={() => { props.setViewReset(true) }}>
                        <img className={styles.list_image} src="images/blank_canvas.png" />
                        <div className={styles.list_text}>Blank Canvas</div>
                    </div>
                    <div className={styles.list_element} onClick={() => {
                        props.setViewEditor({
                            view: true,
                            state: 'Templates'
                        })
                        props.stateHoverPanel.setHoverPanel({
                            ...props.stateHoverPanel.hoverPanel,
                            widthEditor: '260px',
                            widthWorkspace: 'calc(100% - 55px)',
                        })
                    }}>
                        <img className={styles.list_image} src="images/template__hover.png" />
                        <div className={styles.list_text}>Template</div>
                    </div>
                    <label className={styles.list_element} htmlFor="fileJSON">
                        <img className={styles.list_image} src="images/json.png" />
                        <div className={styles.list_text}>Open JSON</div>
                    </label>
                    <input ref={refInput} id="fileJSON" style={{ display: 'none' }} type="file" accept='application/JSON' onChange={
                        async (event: ChangeEvent<HTMLInputElement>) => {
                            if (event.currentTarget.files) {
                                let input = refInput.current
                                function getCanvas(): Promise<Canvas> {
                                    return new Promise((resolve, reject) => {
                                        let canvas = store.getState().canvas
                                        if (input !== null && input.files !== null) {
                                            let file_to_read = input.files[0]
                                            var fileread = new FileReader()
                                            fileread.onload = function (e) {
                                                if (e.target !== null) {
                                                    var content: any = e.target.result
                                                    if (content !== null) {
                                                        canvas = JSON.parse(content)
                                                        resolve(canvas)
                                                    }
                                                }
                                                fileread.onerror = () => reject()
                                            }
                                            fileread.readAsText(file_to_read)
                                        }
                                    })
                                }
                                store.dispatch(addCanvasFromJSON(await getCanvas()))
                                event.target.value = ""
                            }
                        }} />
                </Menu>
                <Menu name={'Save'} functional={'Save as'} height={'102px'} >
                    <div className={styles.list_element} onClick={() => { props.setViewSave(true) }} >
                        <img className={styles.list_image} src="images/computer.png" />
                        <div className={styles.list_text}>Computer</div>
                    </div>
                    <div className={styles.list_element} onClick={() => { props.setSaveJSON(true) }} >
                        <img className={styles.list_image} src="images/json.png" />
                        <div className={styles.list_text}>JSON</div>
                    </div>
                </Menu>
            </div>
        </div>
    )
}