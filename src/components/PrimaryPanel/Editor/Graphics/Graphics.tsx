import React from 'react'
import { dispatch } from '../../../../editor'
import { addEllipse } from '../../../../model/Canvas/Element/Figure/Ellipse/ellipse'
import { addRectangle } from '../../../../model/Canvas/Element/Figure/Rectangle/rectangle'
import { addTriangle } from '../../../../model/Canvas/Element/Figure/Triangle/triangle'
import styles from './Graphics.module.css'

interface GraphicsPropsType {
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
}

export function Graphics(props: GraphicsPropsType) {
    return (
        <div>
            <div className={styles.header}>Graphics</div>
            <div className={styles.graphics_layout}>
                <div className={styles.button_layout} onClick={() => { dispatch(addRectangle) }}>
                    <svg className={styles.svg}>
                        <rect width="50" height="50" fill="#5c607e" className={styles.button} />
                    </svg>
                </div>
                <div className={styles.button_layout + ' ' + styles.ellipse_back} onClick={() => { dispatch(addEllipse) }}>
                    <svg className={styles.svg}>
                        <ellipse cx="25" cy="25" rx="25" ry="25" fill="#5c607e" className={styles.button} />
                    </svg>
                </div>
                <div className={styles.button_layout + ' ' + styles.triangle_back} onClick={() => { dispatch(addTriangle) }}>
                    <svg className={styles.svg} style={{ marginTop: '2px' }}>
                        <polygon points="0,50 25,0 50,50" fill="#5c607e" className={styles.button} />
                    </svg>
                </div>
            </div>
        </div >
    )
}