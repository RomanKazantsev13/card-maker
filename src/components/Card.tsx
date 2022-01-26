import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import styles from './Card.module.css'
import { CanvasTools } from './CanvasTools/CanvasTools'
import { NavigationBar } from './NavigationBar/NavigationBar'
import { PrimaryPanel } from './PrimaryPanel/PrimaryPanel'
import { Workspace } from './Workspace/Workspace'
import { Editor } from './Editor/Editor'
import { SaveComputer } from './PopupWindows/SaveComputer/SaveComputer'
import { ResizeTemplate } from './PopupWindows/ResizeTemplate/ResizeTemplate'
import { ResetCanvas } from './PopupWindows/ResetCanvas/ResetCanvas'
import { InsertImage } from './PopupWindows/InsertImage/InsertImage'
import { UnavailableContent } from './PopupWindows/UnavailableContent/UnavailableContent'
import { store } from '../store/store'
import { redo, undo } from '../store/actionCreators/HistoryActionCreators'
import { SaveAsJSON } from './PopupWindows/SaveComputer/SaveAsJSON'

export function Card() {
    const refEditor: MutableRefObject<HTMLDivElement | null> = useRef(null)

    const [viewSave, setViewSave] = useState(false)
    const [viewResize, setViewResize] = useState(false)
    const [viewReset, setViewReset] = useState(false)
    const [viewNotification, setViewNotification] = useState(false)
    const [viewEditor, setViewEditor] = useState({ view: false, state: '' })
    const [viewSaveJSON, setViewSaveJSON] = useState(false)

    const [sizeInsertImage, setSizeInsertImage] = useState({image: {size: {width: 0, height: 0}, url: ''}, view: false})
    const [sizeSelectElement, setSizeSelectElement] = useState({ width: 0, height: 0 })
    const [hoverPanel, setHoverPanel] = useState({
        widthPanel: '55px',
        workspaceMarginLeft: '0',
        widthEditor: '0',
        widthWorkspace: 'calc(100% - 55px)',
        hoverImage: false,
        displayButtonText: 'none',
        widthButton: '44px',
    })

    const escFunction = (event: KeyboardEvent) => {
        { event.ctrlKey && event.key === 'z' && (store.getState().history.undo.length - 1) && store.dispatch(undo())}
        { event.ctrlKey && event.key === 'y' && store.getState().history.redo.length && store.dispatch(redo())}
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
                setSaveJSON={setViewSaveJSON}
            />
            <div className={styles.card__content}>
                <PrimaryPanel
                    stateHoverPanel={{ hoverPanel, setHoverPanel }}
                    stateViewEditor={{ viewEditor, setViewEditor }}
                />
                <div className={styles.card__workspace} style={{ width: hoverPanel.widthWorkspace, marginLeft: hoverPanel.workspaceMarginLeft }}>
                    <div className={(() => { return viewEditor.view ? styles.flex : styles.block })()}>
                        <Editor
                            refEditor={refEditor}
                            stateViewEditor={{ viewEditor, setViewEditor }}
                            setViewResize={setViewResize}
                            setSizeInsertImage={setSizeInsertImage}
                            setSizeSelectElement={setSizeSelectElement}
                            setNotification={setViewNotification}
                        />
                        <Workspace
                            refEditor={refEditor}
                            stateViewEditor={{ viewEditor, setViewEditor }}
                            stateSizeSelectElement={{sizeSelectElement, setSizeSelectElement}}
                        />
                    </div>
                    <CanvasTools canvas={store.getState().canvas} history={store.getState().history} setViewReset={setViewReset} />
                </div>
            </div>
            {(viewSave || viewSaveJSON || viewResize || viewReset || sizeInsertImage.view || viewNotification) && <div className={styles.shadow}></div>}
            {viewSave && <SaveComputer setView={setViewSave} /> }
            {viewSaveJSON && <SaveAsJSON setView={setViewSaveJSON} /> }
            {viewResize && <ResizeTemplate setView={setViewResize} />}
            {viewReset && <ResetCanvas setView={setViewReset} stateViewEditor={{ viewEditor, setViewEditor }} />}
            {sizeInsertImage.view && <InsertImage stateSizeInsertImage={{sizeInsertImage, setSizeInsertImage}} />}
            {viewNotification && <UnavailableContent setView={setViewNotification} />}
        </div>
    )
}



