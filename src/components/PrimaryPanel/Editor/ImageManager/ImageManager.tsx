import React, { ChangeEvent } from 'react'
import { dispatch } from '../../../../editor'
import { addImage } from '../../../../model/Canvas/Element/Image/image'
import { Size } from '../../../../model/Card/card'
import styles from './ImageManager.module.css'

interface ImageManagerPropsType {
    setSizeInsertImage: (insertImage: {image: {size: {width: number, height: number}, url: string}, view: boolean}) => void,
    canvasSize: {width: number, height: number},
}

export function ImageManager(props: ImageManagerPropsType) {
    let size: Size = { width: 0, height: 0 }
    function createImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            let img: HTMLImageElement = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject();
            img.src = url;
        });
    }
    async function getSize(imgSrc: string) {
        let img: HTMLImageElement = await createImage(imgSrc);
        let width: number = img.width;
        let height: number = img.height;
        size = { width: width, height: height }
        return size
    }

    return (
        <div>
            <div className={styles.header}>Image Manager</div>
            <label htmlFor="file" className={styles.button}>
                <div className={styles.text}>Computer</div>
            </label>
            <input id="file" type="file" className={styles.input} accept="image/png, image/gif, image/jpeg" onChange={
                (event: ChangeEvent<HTMLInputElement>) => {
                    if (event.currentTarget.files) {
                        const imgUrl = URL.createObjectURL(event.currentTarget.files[0])
                        getSize(imgUrl).then(size => {
                            if (props.canvasSize.width < size.width || props.canvasSize.height < size.height) {
                                props.setSizeInsertImage({image: {size: size, url: imgUrl}, view: true})
                            } else {
                                dispatch(addImage, { url: imgUrl, size: size })
                            }
                        })
                    }
                }} />
            <div className={styles.button}>
                <div className={styles.text}>Pixels</div>
            </div>
        </div>
    )
}