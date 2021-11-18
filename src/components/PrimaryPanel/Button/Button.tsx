import React, { useState } from 'react'
import styles from './Button.module.css'

interface IEditor {
    name: string,
    value: boolean,
    widthWorkspace: string,
    widthEditor: string
}

export function Button(props: {
    name: string,
    imageName: string,
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

    const imageVal = () => {
        if (props.hoverPanel.hoverImage) {
            return '__hover.png)'
        }
        return '.png)'
    }

    const imageStyle = {
        backgroundImage: 'url(images/' + props.imageName + imageVal(),
    }

    return (
        <div 
            className={styles.button}
            style={{width: props.hoverPanel.widthButton}}
            onClick={()=>{
                if (props.viewEditor.view && props.viewEditor.state == props.name) {
                    props.setViewEditor({
                        view: false,
                        state: ''
                    })
                    props.setHoverPanel({
                        ...props.hoverPanel,
                        widthEditor: '0',                    
                        widthWorkspace: 'calc(100% - 55px)', 
                    })
                } else {
                    props.setViewEditor({
                        view: true,
                        state: props.name
                    })
                    props.setHoverPanel({
                        ...props.hoverPanel,
                        widthEditor: '260px',                    
                        widthWorkspace: 'calc(100% - 55px)', 
                    })
                }
            }}
        >
            <div style={imageStyle} className={styles.button_image}></div>
            <span 
                className={styles.button_name}
                style={{display: props.hoverPanel.displayButtonText}}
            >{props.name}</span>
        </div>
    )
}





