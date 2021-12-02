import React, { useState } from 'react'
import { panelItem } from '../CanvasTools'
import styles from './Panel.module.css'


export function Panel(props: {
    name: string,
    elements: Array<panelItem>,
    style: string,
    view: string,
    setView: (view: string) => void,
}) {
    let PanelElements: Array<JSX.Element> = []
    for (let i = props.elements.length - 1; i >= 0; i--) {
        PanelElements.push(
            <div className={styles.elementWrap} style={props.elements[i].style}>
                <img className={styles.panelImage} src={props.elements[i].image} />
                <div className={styles.PanleText}>{props.elements[i].name}</div>
            </div>
        )
    }

    return (
        <div className={styles.wrap + ' ' + props.style + ' ' + props.view}>
            <div className={styles.line}>
                <h3 className={styles.header}>
                    {props.name}
                </h3>
                <img className={styles.image} src="images/close.png" onClick={() => { props.setView(styles.viewOff) }} />
            </div>
            <div className={styles.elementsWrap}>
                {PanelElements}
            </div>
        </div>
    )
}