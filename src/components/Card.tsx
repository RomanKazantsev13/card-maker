import React, { useState } from 'react'
import styles from './Card.module.css'

import type { Template } from './../model/Card/Templates/templates'
import type { Canvas } from './../model/Canvas/canvas'

import { CanvasTools } from './CanvasTools/CanvasTools'
import { NavigationBar } from './NavigationBar/NavigationBar'
import { PrimaryPanel } from './PrimaryPanel/PrimaryPanel'
import { Workspace } from './Workspace/Workspace'

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

export function Card(props: CardType) {
    const [hoverPanel, setHoverPanel] = useState({
        panelWidth: '55px',
        workspaceMargin: '0',
        hoverImage: false,
        displayButtonText: 'none',
        buttonWidth: '44px',
    })

    const mouseOutHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        setHoverPanel({
            panelWidth: '55px',
            workspaceMargin: '0',
            hoverImage: false,
            displayButtonText: 'none',
            buttonWidth: '44px',
        })
    };

    const mouseOverHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        setHoverPanel({
            panelWidth: '175px',
            workspaceMargin: '-120px',
            hoverImage: true,
            displayButtonText: 'block',
            buttonWidth: '162px',
        })
    };

    return (
        <div className={styles.card_size}>
            <NavigationBar />
            <div className={styles.layout}>
                <PrimaryPanel templates={props.model.allTemplates}
                    hoverPanel={hoverPanel}
                    handler={{
                        over: mouseOverHandler,
                        out: mouseOutHandler
                    }}
                />
                <div style={{
                    width: 'calc(100% - 55px)',
                    marginLeft: hoverPanel.workspaceMargin
                }}
                    className={styles.workspace}>
                    <Workspace canvas={props.model.canvas} />
                    <CanvasTools canvas={props.model.canvas} history={props.model.history} />
                </div>
            </div>
        </div>
    )
}

function calc(arg0: number): import("csstype").Property.Width<string | number> | undefined {
    throw new Error('Function not implemented.')
}

