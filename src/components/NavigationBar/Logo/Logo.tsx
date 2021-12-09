import React from 'react'
import styles from './Logo.module.css'


export function Logo() {
    return (
        <div className={styles.logo}>
            <img className={styles.svg} src="images/logo.svg" />
        </div>
    )
}