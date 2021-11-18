import React, { useState } from 'react'
import { Template } from '../../model/Card/Templates/templates'
import { Button } from './Button/Button'
import styles from './PrimaryPanel.module.css'

interface IEditor {
    name: string,
    value: boolean,
    widthWorkspace: string,
    widthEditor: string,
}

export function PrimaryPanel(props: {
    templates: {
        templates: Array<Template>,
        customTemplates: Array<Template>
    },
    handler: {
        mouseOver: (event: React.MouseEvent<HTMLDivElement>) => void,
        mouseOut: (event: React.MouseEvent<HTMLDivElement>) => void,
    },  
    hoverPanel: {
        widthPanel: string,
        workspaceMarginLeft: string,
        widthEditor: string,                     
        widthWorkspace: string,   
        hoverImage: boolean,
        displayButtonText: string,
        widthButton: string,
    },
    viewEditor: {
        view: boolean,
        state: string,
    },
    setHoverPanel: (hoverPanel: {
        widthPanel: string,
        workspaceMarginLeft: string,
        widthEditor: string,                     
        widthWorkspace: string,   
        hoverImage: boolean,
        displayButtonText: string,
        widthButton: string,
    }) => void,
    setViewEditor: (viewEditor: {view: boolean, state: string}) => void,
}) {

    const panelStyle = {
    }
    return (
        <div className={styles.panel}
             style={{width: props.hoverPanel.widthPanel}}
             onMouseOut={props.handler.mouseOut}
             onMouseOver={props.handler.mouseOver}>
            <Button 
                name={'Image Manager'} 
                imageName={'picture'} 
                hoverPanel={props.hoverPanel} 
                viewEditor={{
                    view: props.viewEditor.view,
                    state: props.viewEditor.state
                }} 
                setHoverPanel={props.setHoverPanel}
                setViewEditor={props.setViewEditor}/>
            <Button 
                name={'Customize'} 
                imageName={'customize'} 
                hoverPanel={props.hoverPanel} 
                viewEditor={{
                    view: props.viewEditor.view,
                    state: props.viewEditor.state
                }} 
                setHoverPanel={props.setHoverPanel} 
                setViewEditor={props.setViewEditor}/>
            <Button 
                name={'Templates'} 
                imageName={'template'} 
                hoverPanel={props.hoverPanel} 
                viewEditor={{
                    view: props.viewEditor.view,
                    state: props.viewEditor.state
                }} 
                setHoverPanel={props.setHoverPanel}
                setViewEditor={props.setViewEditor}/>
            <Button 
                name={'Graphics'} 
                imageName={'figures'}
                hoverPanel={props.hoverPanel} 
                viewEditor={{
                    view: props.viewEditor.view,
                    state: props.viewEditor.state
                }} 
                setHoverPanel={props.setHoverPanel}
                setViewEditor={props.setViewEditor}/>
            <Button 
                name={'Text'} 
                imageName={'text'} 
                hoverPanel={props.hoverPanel} 
                viewEditor={{
                    view: props.viewEditor.view,
                    state: props.viewEditor.state
                }} 
                setHoverPanel={props.setHoverPanel}
                setViewEditor={props.setViewEditor}/>
        </div>
    )
}





