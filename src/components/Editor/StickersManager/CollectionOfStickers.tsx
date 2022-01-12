import React from 'react'
import { dispatch } from '../../../editor'
import { addImage } from '../../../model/Canvas/Element/Image/image'
import styles from './CollectionOfStickers.module.css'

interface CollectionOfStickersPropsType {
    stickersName: string,
}

export function CollectionOfStickers(props: CollectionOfStickersPropsType) {
    let stickers: Array<JSX.Element> = []
    const pushImage = () => {
        for (let i = 1; i <= 20; i++) {
            let path: string = "images/" + props.stickersName + "/" + i + ".png"
            stickers.push(
                <img className={styles.sticker} src={path} onClick={() => {
                    dispatch(addImage, {url: path, size: {width: 128, height: 128}})
                }} />
            )
        }
    }
    pushImage()
    return(
        <div>
            <div className={styles.stickers}>
                {stickers}
            </div>
        </div>
    )
}