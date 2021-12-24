import React, { ChangeEvent } from 'react'
import { dispatch } from '../../../../editor'
import { addImage } from '../../../../model/Canvas/Element/Image/image'
import { Size } from '../../../../model/Card/card'
import styles from './Image.module.css'
import { getImgSize } from './ImageFunction'

export function Image() {
    return (
        <div>
            <div className={styles.header}>Image Manager</div>
            <label htmlFor="file" className={styles.button}>
                <div className={styles.text}>Computer</div>
            </label>
            <input id="file" type="file" className={styles.input} accept=".jpg,.jpeg,.png" onChange={
                (event: ChangeEvent<HTMLInputElement>) => {
                    if (event.currentTarget.files) {
                        const imgUrl = URL.createObjectURL(event.currentTarget.files[0])
                        const sizeImage: Size = getImgSize(imgUrl)
                        dispatch(addImage, { url: imgUrl, size: sizeImage })
                    }
                }} />
            <div className={styles.button}>
                <div className={styles.text}>Pixels</div>
            </div>
        </div>
    )
}