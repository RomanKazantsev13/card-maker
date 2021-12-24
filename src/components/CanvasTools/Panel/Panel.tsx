import React from 'react'
import { uuid } from 'uuidv4'
import { PanelItem } from '../CanvasTools'
import styles from './Panel.module.css'


export function Panel(props: {
    name: string,
    elements: Array<PanelItem>,
    style: string,
    view: string,
    setView: (view: string) => void,
}) {

    let PanelElements: Array<JSX.Element> = props.elements.map(function (element, index) {
        return <div key={uuid()} className={styles.elementWrap} style={element.style}>
            <img className={styles.panelImage} src={element.image} />
            <div className={styles.PanleText}>{element.name}</div>
        </div>
    })

    PanelElements = PanelElements.reverse()

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