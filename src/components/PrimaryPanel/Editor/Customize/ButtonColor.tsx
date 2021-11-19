import React from 'react'
import styles from './ButtonColor.module.css'

export function ButtonColor(props: {
    color: string,
    setColor: (color: string) => void,
}) {
    return (
        <div 
            className={styles.color}
            style={{ backgroundColor: props.color }}
            onClick={() => props.setColor(props.color)}
        >
        </div>
    )
}