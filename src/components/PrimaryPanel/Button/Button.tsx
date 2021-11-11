import React, { useState } from 'react'
import styles from './Button.module.css'

export function Button(props: {
    name: string,
    imageName: string,
    hoverPanel: {
        panelWidth: string,
        workspaceMargin: string,
        hoverImage: boolean,
        displayButtonText: string,
        buttonWidth: string,
    }
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
        <div style={{ width: props.hoverPanel.buttonWidth }} className={styles.button}>
            <div style={imageStyle} className={styles.button_image}></div>
            <span className={styles.button_name} style={{
                display: props.hoverPanel.displayButtonText,
                transition: '0.3s'
            }}>{props.name}</span>
        </div>
    )
}





