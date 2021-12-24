import React, { useState } from 'react'
import styles from './ToolsButton.module.css'

interface ToolsButtonPropsType {
    block: boolean,
    image: string,
    name: string,
    onclick: () => void,
}

export function ToolsButton(props: ToolsButtonPropsType) {
    const [hoverButton, setHoverButton] = useState(styles.viewOff)
    const buttonStyles = () => { return props.block ? styles.block : styles.unblock }

    const mouseOutHandler = () => {
        setHoverButton(styles.viewOff)
    };

    const mouseOverHandler = () => {
        setHoverButton(styles.viewOn)
    };
    return (
        <div onClick={() => {
            { !props.block && props.onclick() }
        }
        }>
            <div
                className={styles.wrap + ' ' + buttonStyles()}
                onMouseOut={mouseOutHandler}
                onMouseOver={mouseOverHandler}
            >
                <img className={styles.image} src={props.image} />
            </div>
            <div className={styles.comment + ' ' + hoverButton}>
                <div className={styles.textWrap}>
                    <div className={styles.text}>{props.name}</div>
                </div>
            </div>
        </div>
    )
}