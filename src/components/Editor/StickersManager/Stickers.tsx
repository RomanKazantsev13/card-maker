import React, { useState } from 'react'
import { CollectionOfStickers } from './CollectionOfStickers'
import styles from './Stickers.module.css'

interface StickersPropsType {
    stickersName: string,
}

export function Stickers(props: StickersPropsType) {
    const [viewStickers, setViewStickers] = useState(false)
    const [arrow, setArrow] = useState('arrow_down')
    const getHeader = () => {
        let header = props.stickersName[0]
        const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
        if (digits.includes(header)) {
            return props.stickersName
        }
        for (let i = 1; i < props.stickersName.length; i++) {
            if (props.stickersName[i].toUpperCase() == props.stickersName[i]) {
                header += ' ' + props.stickersName[i]
            } else {
                header += props.stickersName[i]
            }
        }
        return header
    }
    return(
        <div>
            <div className={styles.popup} onClick={() => {
                if (viewStickers) {
                    setViewStickers(false)
                    setArrow('arrow_down')
                } else {
                    setViewStickers(true)
                    setArrow('arrow_up')
                }
            }}>
                <div className={styles.subheader}>{getHeader()}</div>
                <img className={styles.img} src={"images/" + arrow + ".png"}/>
            </div>
            { viewStickers && <CollectionOfStickers stickersName={props.stickersName} />}
        </div>
    )
}