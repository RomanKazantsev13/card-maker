import React, { useState } from 'react'
import styles from './Button.module.css'


export function Button(props: {
    name: string,
    background: Array<string>,
    color: string,  
    onclick: (value: boolean) => void,
}) {

    const [background, setBackground] = useState(props.background[0])

    const mouseOutHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        setBackground(props.background[0])
    };

    const mouseOverHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        setBackground(props.background[1])
    };

    return (
        <div className={styles.wrap} style={{background: background}} onMouseOver={mouseOverHandler} onMouseOut={mouseOutHandler} onClick={() => {
            props.onclick(false)
        }}>
            <div className={styles.text} style={{color: props.color}}>{props.name}</div>
        </div>
    )
}