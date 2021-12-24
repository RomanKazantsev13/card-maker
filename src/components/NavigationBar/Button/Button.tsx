import React from 'react'
import useComponentVisible from '../../../customHooks/useComponentVisible'
import styles from './Button.module.css'
import { ButtonList } from './ButtonList'

interface ButtonPropsType {
    name: string,
    children: React.ReactNode,
    functional: string,
    height: string,
}

export function Button(props: ButtonPropsType) {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

    return (
        <div ref={ref} onClick={() => { return isComponentVisible ? setIsComponentVisible(false) : setIsComponentVisible(true) }}>
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