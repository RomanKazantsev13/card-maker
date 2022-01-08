import React from 'react'
import styles from './Templates.module.css'

interface TempaltesPropsType {
    setNotification: (viewResize: boolean) => void,
}

export function Templates(props: TempaltesPropsType) {
    return (
        <div>
            <div className={styles.header}>Templates</div>
            
            <div className={styles.button} onClick={() => {
                props.setNotification(true)
            }}>
                <div className={styles.text}>Collection of Templates</div>
            </div>
        </div>
    )
}