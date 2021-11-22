import React, { useState } from 'react'
import styles from './Card.module.css'

import type { Template } from './../model/Card/Templates/templates'
import type { Canvas } from './../model/Canvas/canvas'

import { CanvasTools } from './CanvasTools/CanvasTools'
import { NavigationBar } from './NavigationBar/NavigationBar'
import { PrimaryPanel } from './PrimaryPanel/PrimaryPanel'
import { Workspace } from './Workspace/Workspace'
import { Editor } from './PrimaryPanel/Editor/Editor'
import { SaveComputer } from './SaveComputer/SaveComputer'

interface CardType {
    model: {
        allTemplates: {
            templates: Array<Template>,
            customTemplates: Array<Template>
        },
        canvas: Canvas,
        history: {
            undo: Array<Canvas>,
            redo: Array<Canvas>
        }
    }
}

// css вынести в .css
// в компоненте оставить данные расчитываемые через пропсы

export function Card(props: CardType) {
    const [color, setColor] = useState('#FFF')
    const [viewSave, setViewSave] = useState(false)
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
                hoverPanel={hoverPanel}
            />
            <div className={styles.layout}>
                <PrimaryPanel
                    templates={props.model.allTemplates}
                    handler={{
                        mouseOver: mouseOverHandler,
                        mouseOut: mouseOutHandler
                    }}
                    hoverPanel={hoverPanel}
                    viewEditor={viewEditor}
                    setHoverPanel={setHoverPanel}
                    setViewEditor={setViewEditor}
                />
                <div className={styles.workspace}
                    style={{
                        width: hoverPanel.widthWorkspace,
                        marginLeft: hoverPanel.workspaceMarginLeft
                    }}>
                    <div style={{
                        display: (() => {
                            if (viewEditor.view) {
                                return 'flex'
                            }
                            return 'block'
                        })()
                    }}>
                        <Editor
                            viewEditor={viewEditor}
                            backPicker={{ color: color, setColor: setColor }}
                        />
                        <Workspace
                            color={color}
                            canvas={props.model.canvas}
                            width={(() => {
                                if (viewEditor.view) {
                                    return 'calc(100% - 270px)'
                                }
                                return '100%'
                            })()} />
                    </div>
                    <CanvasTools canvas={props.model.canvas} history={props.model.history} />
                </div>
            </div>
            <div className={styles.shadow + ' ' + ( () => {
                if (viewSave) {
                    return styles.viewOn
                }
                return styles.viewOff
            })()}></div>
            <SaveComputer view={viewSave} setView={setViewSave} />
        </div>
    )
}



