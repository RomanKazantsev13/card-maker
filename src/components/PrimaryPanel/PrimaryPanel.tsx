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
    handler: {
        mouseOver: (event: React.MouseEvent<HTMLDivElement>) => void,
        mouseOut: (event: React.MouseEvent<HTMLDivElement>) => void,
    },
    stateHoverPanel: {
        hoverPanel: StateHoverPanelType,
        setHoverPanel: (hoverPanel: StateHoverPanelType) => void,
    }
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
    { name: 'Stickers', imageName: 'art'},
    { name: 'Text', imageName: 'text' },
]

export function PrimaryPanel(props: PrimaryPanelPropsType) {
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
            onMouseOut={props.handler.mouseOut}
            onMouseOver={props.handler.mouseOver}
        >
            {Buttons}
        </div>
    )
}





