import React, { useState } from 'react'
import styles from './ToolsButton.module.css'

export function ToolsButton(props: {
    block: boolean,
    image: string,
    name: string,
    onclick: () => void,
}) {
    const [hoverButton, setHoverButton] = useState(styles.viewOff)
    const buttonStyles = () => {
        if (props.block) {
            return styles.block
        }
        return styles.unblock
    }

    const mouseOutHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        setHoverButton(styles.viewOff)
    };

    const mouseOverHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        setHoverButton(styles.viewOn)
    };
    return (
        <div onClick={() => {
                if (!props.block) {
                    props.onclick()
                }
            }
        }>
            <div 
                className={styles.wrap + ' ' + buttonStyles()}
                onMouseOut={mouseOutHandler}
                onMouseOver={mouseOverHandler}
            >
                <img className={styles.image} src={props.image} />
            </div>
            <p className={styles.comment + ' ' + hoverButton    }>
                <div className={styles.textWrap}>
                    <div className={styles.text}>{props.name}</div>
                </div>
            </p>
        </div>
    )
}