import React from 'react'
import styles from './ButtonList.module.css'

// 

export function ButtonList(props: { 
    click: boolean,
    children: React.ReactNode,
    functional: string,
    height: string 
}) {
    const listStyle = () => {
        if (props.click) {
            return {
                marginTop: '10px',
                display: 'block',
                transition: '0.3s',
                height: props.height,
            }
        } else {
            return {
                marginTop: '-15px',
                display: 'none',
                transition: '0.3s',
                height: props.height,
            }
        }
    }
    return (
        <div className={styles.list} style={listStyle()}>
           <div className={styles.functional}>
               {props.functional}
           </div>
           <div className={styles.lists}>
               {props.children}
           </div>
        </div>
    )
}