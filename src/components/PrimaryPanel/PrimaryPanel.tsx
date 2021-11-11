import React, { useState } from 'react'
import { Template } from '../../model/Card/Templates/templates'
import { Button } from './Button/Button'
import styles from './PrimaryPanel.module.css'


export function PrimaryPanel(props: {
    templates: {
        templates: Array<Template>,
        customTemplates: Array<Template>
    },
    hoverPanel: {
        panelWidth: string,
        workspaceMargin: string,
        hoverImage: boolean,
        displayButtonText: string,
        buttonWidth: string,
    }
    handler: {
        over: any,
        out: any
    },
}) {

    const panelStyle = {
        primaryPanel: {
            width: props.hoverPanel.panelWidth
        }
    }
    return (
        <div className={styles.panel}
            style={panelStyle.primaryPanel}
            onMouseOut={props.handler.out}
            onMouseOver={props.handler.over}
        >
            <Button name={'Image Manager'} imageName={'picture'} hoverPanel={props.hoverPanel} />
            <Button name={'Customize'} imageName={'customize'} hoverPanel={props.hoverPanel} />
            <Button name={'Templates'} imageName={'template'} hoverPanel={props.hoverPanel} />
            <Button name={'Graphics'} imageName={'figures'} hoverPanel={props.hoverPanel} />
            <Button name={'Text'} imageName={'text'} hoverPanel={props.hoverPanel} />
        </div>
    )
}





