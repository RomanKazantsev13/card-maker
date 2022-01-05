import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import styles from './Card.module.css'
import type { Template } from './../model/Card/Templates/templates'
import type { Canvas } from './../model/Canvas/canvas'
import { redo, Stack, undo } from '../model/Card/History/history'
import { CanvasTools } from './CanvasTools/CanvasTools'
import { NavigationBar } from './NavigationBar/NavigationBar'
import { PrimaryPanel } from './PrimaryPanel/PrimaryPanel'
import { Workspace } from './Workspace/Workspace'
import { Editor } from './PrimaryPanel/Editor/Editor'
import { SaveComputer } from './SaveComputer/SaveComputer'
import { ResizeTemplate } from './ResizeTemplate/ResizeTemplate'
import { ResetCanvas } from './ResetCanvas/ResetCanvas'
import { dispatch } from '../editor'
import { InsertImage } from './InsertImage/InsertImage'

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
    const refEditor: MutableRefObject<HTMLDivElement | null> = useRef(null)
    const refSvg: MutableRefObject<SVGSVGElement | null> = useRef(null)
    const [viewSave, setViewSave] = useState(false)
    const [viewResize, setViewResize] = useState(false)
    const [viewReset, setViewReset] = useState(false)
    const [viewEditor, setViewEditor] = useState({ view: false, state: '' })
    const [sizeInsertImage, setSizeInsertImage] = useState({image: {size: {width: 0, height: 0}, url: ''}, view: false})
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

    const escFunction = (event: KeyboardEvent) => {
        { event.ctrlKey && event.key === 'z' && (props.card.history.undo.length - 1) && dispatch(undo)}
        { event.ctrlKey && event.key === 'y' && props.card.history.redo && dispatch(redo)}
    }

    useEffect(() => {
        document.addEventListener("keydown", escFunction)
        return () => {
            document.removeEventListener("keydown", escFunction)
        }
    }, [])

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
                            refEditor={refEditor}
                            stateViewEditor={{ viewEditor, setViewEditor }}
                            setViewResize={setViewResize}
                            canvas={props.card.canvas}
                            setSizeInsertImage={setSizeInsertImage}
                        />
                        <Workspace
                            refEditor={refEditor}
                            refSvg={refSvg}
                            stateViewEditor={{ viewEditor, setViewEditor }}
                            width={(() => { return viewEditor.view ? 'calc(100% - 270px)' : '100%' })()}
                            canvas={props.card.canvas}
                        />
                    </div>
                    <CanvasTools canvas={props.card.canvas} history={props.card.history} setViewReset={setViewReset} />
                </div>
            </div>
            {sizeInsertImage.view && <InsertImage stateSizeInsertImage={{sizeInsertImage, setSizeInsertImage}} />}
            {(viewSave || viewResize || viewReset || sizeInsertImage.view) && <div className={styles.shadow}></div>}
            {viewSave && <SaveComputer setView={setViewSave} size={props.card.canvas.size} refSvg={refSvg} /> }
            {viewResize && <ResizeTemplate setView={setViewResize} size={props.card.canvas.size} />}
            {viewReset && <ResetCanvas setView={setViewReset} />}
        </div>
    )
}



