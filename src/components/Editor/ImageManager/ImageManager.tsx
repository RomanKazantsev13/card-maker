import React, { ChangeEvent, RefObject, useRef } from 'react'
import { addImage } from '../../../store/actionCreators/ImageActionCreators';
import { store } from '../../../store/store'
import styles from './ImageManager.module.css'

interface ImageManagerPropsType {
    setSizeInsertImage: (insertImage: {image: {size: {width: number, height: number}, url: string}, view: boolean}) => void,
    setNotification: (viewResize: boolean) => void,
}

export function ImageManager(props: ImageManagerPropsType) {
    const ref: RefObject<HTMLInputElement> = useRef(null)
    function createImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            let img: HTMLImageElement = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject();
            img.src = url;
        });
    }
    async function getSize(imgSrc: string) {
        const image: HTMLImageElement = await createImage(imgSrc);
        return { width: image.width, height: image.height }
    }

    return (
        <div>
            <div className={styles.header}>Image Manager</div>
            <label htmlFor="fileImage" className={styles.button}>
                <div className={styles.text}>Computer</div>
            </label>
            <input ref={ref} id="fileImage" type="file" className={styles.input} accept="image/png, image/gif, image/jpeg" onChange={
                (event: ChangeEvent<HTMLInputElement>) => {
                    if (event.currentTarget.files) {
                        const imgUrl = URL.createObjectURL(event.currentTarget.files[0])
                        getSize(imgUrl).then(size => { 
                            if (store.getState().canvas.size.width < size.width || store.getState().canvas.size.height < size.height) {
                                props.setSizeInsertImage({image: {size: size, url: imgUrl}, view: true})
                            } else {
                                store.dispatch(addImage(imgUrl, size))
                            }
                        })
                        event.target.value = "";
                    }
                }} />
            <div className={styles.button} onClick={() => {
                props.setNotification(true)
            }}>
                <div className={styles.text}>Pixels</div>
            </div>
        </div>
    )
}