import React, { useState } from 'react'
import useComponentVisible from '../../../customHooks/useComponentVisible'
import styles from './Button.module.css'
import { ButtonList } from './ButtonList'

// 

export function Button(props: {
    name: string,
    children: React.ReactNode,
    functional: string,
    height: string,
}) {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

    return (
        <div ref={ref} onClick={() => {
            if (isComponentVisible) {
                setIsComponentVisible(false)
            } else {
                setIsComponentVisible(true)
            }
        }}>
            <div className={styles.button}>
                <div className={styles.text}>{props.name}</div>
                <img className={styles.image} src="images/arrow_down.png" />
            </div>
            <div>
                <ButtonList click={isComponentVisible} functional={props.functional} height={props.height}>
                    {props.children}
                </ButtonList>
            </div>
        </div>
    )
}