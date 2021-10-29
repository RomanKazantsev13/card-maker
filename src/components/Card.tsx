import React from 'react'
import styles from './Card.module.css'
import type { Template } from './../model/Card/Templates/templates'
import type { Canvas } from './../model/Canvas/canvas'
import { CanvasTools } from './CanvasTools/CanvasTools'
import { NavigationBar } from './NavigationBar/NavigationBar'
import { PrimaryPanel } from './PrimaryPanel/PrimaryPanel'
import { Workspace } from './Workspace/Workspace'

interface CardType {
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

export function Card() {
    return (
        <div className={styles.size}>
            <NavigationBar />
            <div className={styles.layout}>
                <PrimaryPanel /> {/* templates={props.allTemplates} */}
                <Workspace /> {/* canvas={props.canvas} */}
            </div>
            <CanvasTools /> {/* canvas={props.canvas} history={props.history*/} 
        </div>
    )
}