import React from 'react'
import styles from './Button.module.css'

interface HoverPanelType {
    widthPanel: string,
    workspaceMarginLeft: string,
    widthEditor: string,
    widthWorkspace: string,
    hoverImage: boolean,
    displayButtonText: string,
    widthButton: string,
}

interface ButtonPropsType {
    name: string,
    imageName: string,
    stateHoverPanel: {
        hoverPanel: HoverPanelType,
        setHoverPanel: (hoverPanel: HoverPanelType) => void,
    }
    stateViewEditor: {
        viewEditor: {
            view: boolean,
            state: string,
        },
        setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    }
}

export function Button(props: ButtonPropsType) {
    const imageVal = () => { return props.stateHoverPanel.hoverPanel.hoverImage ? '__hover.png)' : '.png)' }
    const imageStyle = {
        backgroundImage: 'url(images/' + props.imageName + imageVal(),
    }
    return (
        <div
            className={styles.button}
            style={{ width: props.stateHoverPanel.hoverPanel.widthButton }}
            onClick={() => {
                if (props.stateViewEditor.viewEditor.view && props.stateViewEditor.viewEditor.state == props.name) {
                    props.stateViewEditor.setViewEditor({
                        view: false,
                        state: ''
                    })
                    props.stateHoverPanel.setHoverPanel({
                        ...props.stateHoverPanel.hoverPanel,
                        widthEditor: '0',
                        widthWorkspace: 'calc(100% - 55px)',
                    })
                } else {
                    props.stateViewEditor.setViewEditor({
                        view: true,
                        state: props.name
                    })
                    props.stateHoverPanel.setHoverPanel({
                        ...props.stateHoverPanel.hoverPanel,
                        widthEditor: '260px',
                        widthWorkspace: 'calc(100% - 55px)',
                    })
                }
            }}
        >
            <div style={imageStyle} className={styles.button_image}></div>
            <span
                className={styles.button_name}
                style={{ display: props.stateHoverPanel.hoverPanel.displayButtonText }}
            >{props.name}</span>
        </div>
    )
}





