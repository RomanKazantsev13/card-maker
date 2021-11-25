import React from 'react'
import styles from './Graphics.module.css'

export function Graphics(props: {
    setViewEditor: (viewEditor: {view: boolean, state: string}) => void,
}) {
    return (
        <div>
            <div className={styles.header}>Graphics</div>
            <div className={styles.graphics_layout}>
                <div className={styles.button_layout} onClick={() => {props.setViewEditor({view: true, state: 'Figure Properties'})}}>
                    <svg className={styles.svg}>
                        <rect width="50" height="50" fill="#5c607e" className={styles.button} />
                    </svg>
                </div>
                <div className={styles.button_layout + ' ' + styles.ellipse_back} onClick={() => {props.setViewEditor({view: true, state: 'Figure Properties'})}}>
                    <svg className={styles.svg}>
                        <ellipse cx="25" cy="25" rx="25" ry="25" fill="#5c607e" className={styles.button} />
                    </svg>
                </div>
                <div className={styles.button_layout + ' ' + styles.triangle_back} onClick={() => {props.setViewEditor({view: true, state: 'Figure Properties'})}}>
                    <svg className={styles.svg} style={{marginTop: '2px' }}>
                        <polygon points="0,50 25,0 50,50" fill="#5c607e" className={styles.button} />
                    </svg>
                </div>
            </div>
        </div >
    )
}