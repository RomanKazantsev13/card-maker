import React, { useRef, useState } from 'react'
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
    const [viewSave, setViewSave] = useState(false)
    const [viewResize, setViewResize] = useState(false)
    const [viewReset, setViewReset] = useState(false)
    const [viewEditor, setViewEditor] = useState({
        view: false,
        state: ''
    })
    const [hoverPanel, setHoverPanel] = useState({
        widthPanel: '55px',
        workspaceMarginLeft: '0',
        widthEditor: '0',
        widthWorkspace: 'calc(100% - 55px)',
        hoverImage: false,
        displayButtonText: 'none',
        widthButton: '44px',
    })
    const ref: any = useRef(null)

    const mouseOutHandler = (event: React.MouseEvent<HTMLDivElement>) => {
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

    const mouseOverHandler = (event: React.MouseEvent<HTMLDivElement>) => {
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
                setHoverPanel={setHoverPanel}
                setViewEditor={setViewEditor}
                setViewSave={setViewSave}
                setViewReset={setViewReset}
                hoverPanel={hoverPanel}
            />
            <div className={styles.card__content}>
                <PrimaryPanel
                    handler={{
                        mouseOver: mouseOverHandler,
                        mouseOut: mouseOutHandler
                    }}
                    hoverPanel={hoverPanel}
                    viewEditor={viewEditor}
                    setHoverPanel={setHoverPanel}
                    setViewEditor={setViewEditor}
                />
                <div className={styles.card__workspace}
                     style={{
                        width: hoverPanel.widthWorkspace,
                        marginLeft: hoverPanel.workspaceMarginLeft
                    }}>
                    <div className={(() => {
                        if (viewEditor.view) {
                            return styles.flex
                        }
                        return styles.block
                    })()
                    }>
                        <Editor
                            refEditor={ref}
                            viewEditor={viewEditor}
                            setViewResize={setViewResize}
                            setViewEditor={setViewEditor}
                            canvas={{ size: props.card.canvas.size, background: props.card.canvas.background, selectElement: props.card.canvas.selectElement }}
                        />
                        <Workspace
                            canvas={props.card.canvas}
                            viewEditor={viewEditor}
                            setViewEditor={setViewEditor}
                            width={(() => {
                                if (viewEditor.view) {
                                    return 'calc(100% - 270px)'
                                }
                                return '100%'
                            })()}
                            refEditor={ref}
                        />
                    </div>
                    <CanvasTools canvas={props.card.canvas} history={props.card.history} setViewReset={setViewReset} />
                </div>
            </div>
            <div className={styles.shadow + ' ' + (() => {
                if (viewSave || viewResize || viewReset) {
                    return styles.viewOn
                }
                return styles.viewOff
            })()}></div>
            <SaveComputer view={viewSave} setView={setViewSave} size={props.card.canvas.size} />
            <ResizeTemplate view={viewResize} setView={setViewResize} size={props.card.canvas.size} />
            <ResetCanvas view={viewReset} setView={setViewReset} />
        </div>
    )
}



