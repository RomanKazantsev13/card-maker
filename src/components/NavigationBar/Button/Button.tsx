import React, { useState } from 'react'
import styles from './Button.module.css'
import { ButtonList } from './ButtonList'

// 

export function Button(props: {
    name: string,
    children: React.ReactNode,
    functional: string,
    height: string,
}) {    
    const [clickButton, setClickButton] = useState(false)

    return (
        <div onClick={() => {
            if (clickButton) {
                setClickButton(false)
            } else {
                setClickButton(true)
            }
        }}>
            <div className={styles.button}>
                <div className={styles.text}>{props.name}</div>
                <img className={styles.image} src="images/arrow_down.png" />
            </div>
            <ButtonList click={clickButton} functional={props.functional} height={props.height}>
                {props.children}
            </ButtonList>
        </div>
    )
}