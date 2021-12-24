import React, { MutableRefObject, useRef, useState } from 'react'
import styles from './Card.module.css'
import type { Template } from './../model/Card/Templates/templates'
import type { Canvas } from './../model/Canvas/canvas'
import type { Stack } from '../model/Card/History/history'
import { CanvasTools } from './CanvasTools/CanvasTools'
import { NavigationBar } from './NavigationBar/NavigationBar'
import { PrimaryPanel } from './PrimaryPanel/PrimaryPanel'
import { Workspace } from './Workspace/Workspace'
import { Editor } from './PrimaryPanel/Editor/Editor'
import { SaveComputer } from './SaveComputer/SaveComputer'
import { ResizeTemplate } from './ResizeTemplate/ResizeTemplate'
import { ResetCanvas } from './ResetCanvas/ResetCanvas'

interface CardPropsType {
    card: {
        allTemplates: {
            templates: Array<Template>,
            customTemplates: Array<Template>
        },
        canvas: Canvas,
        history: {
            undo: Array<Stack>,
            redo: Array<Stack>
        }
    }
}

export function Card(props: CardPropsType) {
    const ref: MutableRefObject<HTMLDivElement | null> = useRef(null)
    const [viewSave, setViewSave] = useState(false)
    const [viewResize, setViewResize] = useState(false)
    const [viewReset, setViewReset] = useState(false)
    const [viewEditor, setViewEditor] = useState({ view: false, state: '' })
    const [hoverPanel, setHoverPanel] = useState({
        widthPanel: '55px',
        workspaceMarginLeft: '0',
        widthEditor: '0',
        widthWorkspace: 'calc(100% - 55px)',
        hoverImage: false,
        displayButtonText: 'none',
        widthButton: '44px',
    })

    const mouseOutHandler = () => {
        setHoverPanel({
            widthPanel: '55px',
            workspaceMarginLeft: '0',
            widthEditor: hoverPanel.widthEditor,
            widthWorkspace: hoverPanel.widthWorkspace,
            hoverImage: false,
            displayButtonText: 'none',
            widthButton: '44px',
        })
    };

    const mouseOverHandler = () => {
        setHoverPanel({
            widthPanel: '175px',
            workspaceMarginLeft: '-120px',
            widthEditor: hoverPanel.widthEditor,
            widthWorkspace: hoverPanel.widthWorkspace,
            hoverImage: true,
            displayButtonText: 'block',
            widthButton: '162px',
        })
    };

    return (
        <div className={styles.card_size}>
            <NavigationBar
                stateHoverPanel={{ hoverPanel, setHoverPanel }}
                setViewEditor={setViewEditor}
                setViewSave={setViewSave}
                setViewReset={setViewReset}
            />
            <div className={styles.card__content}>
                <PrimaryPanel
                    handler={{ mouseOver: mouseOverHandler, mouseOut: mouseOutHandler }}
                    stateHoverPanel={{ hoverPanel, setHoverPanel }}
                    stateViewEditor={{ viewEditor, setViewEditor }}
                />
                <div className={styles.card__workspace} style={{ width: hoverPanel.widthWorkspace, marginLeft: hoverPanel.workspaceMarginLeft }}>
                    <div className={(() => { return viewEditor.view ? styles.flex : styles.block })()}>
                        <Editor
                            refEditor={ref}
                            stateViewEditor={{ viewEditor, setViewEditor }}
                            setViewResize={setViewResize}
                            canvas={props.card.canvas}
                        />
                        <Workspace
                            refEditor={ref}
                            stateViewEditor={{ viewEditor, setViewEditor }}
                            width={(() => { return viewEditor.view ? 'calc(100% - 270px)' : '100%' })()}
                            canvas={props.card.canvas}
                        />
                    </div>
                    <CanvasTools canvas={props.card.canvas} history={props.card.history} setViewReset={setViewReset} />
                </div>
            </div>
            {(viewSave || viewResize || viewReset) && <div className={styles.shadow}></div>}
            {viewSave && <SaveComputer setView={setViewSave} size={props.card.canvas.size} />}
            {viewResize && <ResizeTemplate setView={setViewResize} size={props.card.canvas.size} />}
            {viewReset && <ResetCanvas setView={setViewReset} />}
        </div>
    )
}



