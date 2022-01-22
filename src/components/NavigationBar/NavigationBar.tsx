import React from 'react'
import { Menu } from './Menu/Menu'
import { Logo } from './Logo/Logo'
import styles from './NavigationBar.module.css'

interface StateHoverPanelType {
    widthPanel: string,
    workspaceMarginLeft: string,
    widthEditor: string,
    widthWorkspace: string,
    hoverImage: boolean,
    displayButtonText: string,
    widthButton: string,
}

interface NavigationBarPropsType {
    stateHoverPanel: {
        hoverPanel: StateHoverPanelType,
        setHoverPanel: (hoverPanel: StateHoverPanelType) => void,
    }
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    setViewSave: (view: boolean) => void,
    setViewReset: (view: boolean) => void,
}

export function NavigationBar(props: NavigationBarPropsType) {
    return (
        <div className={styles.navbar}>
            <Logo />
            <div className={styles.button__layout}>
                <Menu name={'Open'} functional={'New Design'} height={'102px'}>
                    <div className={styles.list_element} onClick={() => { props.setViewReset(true) }}>
                        <img className={styles.list_image} src="images/blank_canvas.png" />
                        <div className={styles.list_text}>Blank Canvas</div>
                    </div>
                    <div className={styles.list_element} onClick={() => {
                        props.setViewEditor({
                            view: true,
                            state: 'Templates'
                        })
                        props.stateHoverPanel.setHoverPanel({
                            ...props.stateHoverPanel.hoverPanel,
                            widthEditor: '260px',
                            widthWorkspace: 'calc(100% - 55px)',
                        })
                    }}>
                        <img className={styles.list_image} src="images/template__hover.png" />
                        <div className={styles.list_text}>Template</div>
                    </div>
                </Menu>
                <Menu name={'Save'} functional={'Save as Image'} height={'69px'}>
                    <div className={styles.list_element} onClick={() => { props.setViewSave(true) }} >
                        <img className={styles.list_image} src="images/computer.png" />
                        <div className={styles.list_text}>Computer</div>
                    </div>
                </Menu>
            </div>
        </div>
    )
}