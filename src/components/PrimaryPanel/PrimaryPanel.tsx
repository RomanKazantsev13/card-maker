import React from 'react'
import { Button } from './Button/Button'
import styles from './PrimaryPanel.module.css'

interface StateHoverPanelType {
    widthPanel: string,
    workspaceMarginLeft: string,
    widthEditor: string,
    widthWorkspace: string,
    hoverImage: boolean,
    displayButtonText: string,
    widthButton: string,
}

interface PrimaryPanelPropsType {
    stateHoverPanel: {
        hoverPanel: StateHoverPanelType,
        setHoverPanel: (hoverPanel: StateHoverPanelType) => void,
    },
    stateViewEditor: {
        viewEditor: { view: boolean, state: string },
        setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    }
}

const buttons = [
    { name: 'Image Manager', imageName: 'picture' },
    { name: 'Customize', imageName: 'customize' },
    { name: 'Templates', imageName: 'template' },
    { name: 'Graphics', imageName: 'figures' },
    { name: 'Stickers', imageName: 'art' },
    { name: 'Text', imageName: 'text' },
]

export function PrimaryPanel(props: PrimaryPanelPropsType) {
    const mouseOutHandler = () => {
        props.stateHoverPanel.setHoverPanel({
            widthPanel: '55px',
            workspaceMarginLeft: '0',
            widthEditor: props.stateHoverPanel.hoverPanel.widthEditor,
            widthWorkspace: props.stateHoverPanel.hoverPanel.widthWorkspace,
            hoverImage: false,
            displayButtonText: 'none',
            widthButton: '44px',
        })
    }

    const mouseOverHandler = () => {
        props.stateHoverPanel.setHoverPanel({
            widthPanel: '175px',
            workspaceMarginLeft: '-120px',
            widthEditor: props.stateHoverPanel.hoverPanel.widthEditor,
            widthWorkspace: props.stateHoverPanel.hoverPanel.widthWorkspace,
            hoverImage: true,
            displayButtonText: 'block',
            widthButton: '162px',
        })
    }
    const Buttons = buttons.map(function (button, index) {
        return <Button
            key={index}
            name={button.name}
            imageName={button.imageName}
            stateHoverPanel={{
                hoverPanel: props.stateHoverPanel.hoverPanel,
                setHoverPanel: props.stateHoverPanel.setHoverPanel
            }}
            stateViewEditor={{
                viewEditor: {
                    view: props.stateViewEditor.viewEditor.view,
                    state: props.stateViewEditor.viewEditor.state
                },
                setViewEditor: props.stateViewEditor.setViewEditor
            }}
        />
    })
    return (
        <div className={styles.panel}
            style={{ width: props.stateHoverPanel.hoverPanel.widthPanel }}
            onMouseOut={mouseOutHandler}
            onMouseOver={mouseOverHandler}
        >
            {Buttons}
        </div>
    )
}





