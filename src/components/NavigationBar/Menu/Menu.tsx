import React from 'react'
import useComponentVisible from '../../../customHooks/useComponentVisible'
import styles from './Menu.module.css'
import { Popup } from './Popup'

interface MenuPropsType {
    name: string,
    children: React.ReactNode,
    functional: string,
    height: string,
}

export function Menu(props: MenuPropsType) {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

    return (
        <div ref={ref} onClick={() => { return isComponentVisible ? setIsComponentVisible(false) : setIsComponentVisible(true) }}>
            <div className={styles.button}>
                <div className={styles.text}>{props.name}</div>
                <img className={styles.image} src="images/arrow_down.png" />
            </div>
            <div>
                <Popup click={isComponentVisible} functional={props.functional} height={props.height}>
                    {props.children}
                </Popup>
            </div>
        </div>
    )
}