import React, { useState } from 'react'
import { Canvas } from '../../model/Canvas/canvas'
import { Button } from './Button/Button'
import { Logo } from './Logo/Logo'
import styles from './NavigationBar.module.css'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Tools {
    history: Array<Canvas>,
    canvas: Canvas
}

export function NavigationBar(props: {   
    setViewEditor: (viewEditor: {view: boolean, state: string}) => void,
    setHoverPanel: (hoverPanel: {
        widthPanel: string,
        workspaceMarginLeft: string,
        widthEditor: string,                     
        widthWorkspace: string,   
        hoverImage: boolean,
        displayButtonText: string,
        widthButton: string,
    }) => void,
    hoverPanel: {
        widthPanel: string,
        workspaceMarginLeft: string,
        widthEditor: string,                     
        widthWorkspace: string,   
        hoverImage: boolean,
        displayButtonText: string,
        widthButton: string,
    },
    setViewSave: (view: boolean) => void,
    setViewReset: (view: boolean) => void,
}) {

    return (
        <div className={styles.navbar}>
            <Logo />
            <div className={styles.button__layout}>

                <Button name={'Open'} functional={'New Design'} height={'102px'}>
                    <div className={styles.list_element} onClick={() => {props.setViewReset(true)}}>
                        <img className={styles.list_image} src="images/blankCanvas.png" />
                        <div className={styles.list_text}>Blank Canvas</div>
                    </div>
                    <div className={styles.list_element} onClick={() => {
                        props.setViewEditor({
                            view: true,
                            state: 'Templates'
                        })
                        props.setHoverPanel({
                            ...props.hoverPanel,
                            widthEditor: '260px',
                            widthWorkspace: 'calc(100% - 55px)',
                        })
                    }}>
                        <img className={styles.list_image} src="images/template__hover.png" />
                        <div className={styles.list_text}>Template</div>
                    </div>
                </Button>

                <Button name={'Save'} functional={'Save as Image'} height={'69px'}>
                    <div className={styles.list_element} onClick={() => {props.setViewSave(true)}} >
                        <img className={styles.list_image} src="images/computer.png" />
                        <div className={styles.list_text}>Computer</div>
                    </div>
                </Button>
            </div>
        </div>
    )
}