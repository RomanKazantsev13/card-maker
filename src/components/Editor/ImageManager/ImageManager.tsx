import React, { ChangeEvent, RefObject, useRef } from 'react'
import { addImage } from '../../../store/actionCreators/ImageActionCreators';
import { store } from '../../../store/store'
import { Size } from '../../../utils/types';
import styles from './ImageManager.module.css'

interface ImageManagerPropsType {
    setSizeInsertImage: (insertImage: {image: {size: {width: number, height: number}, url: string}, view: boolean}) => void,
    setNotification: (viewResize: boolean) => void,
}

export function ImageManager(props: ImageManagerPropsType) {
    const ref: RefObject<HTMLInputElement> = useRef(null)
    async function getImage(file: File): Promise<{src: string, size: Size}> {
        const imgReaderPromise = new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject
        })
    
        const img = new Image();
        img.src = await imgReaderPromise as string;
        await img.decode();
    
        return{
            src: img.src,
            size: {width: img.width, height: img.height}
        }
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
                        getImage(event.currentTarget.files[0]).then(image => { 
                            if (store.getState().canvas.size.width < image.size.width || store.getState().canvas.size.height < image.size.height) {
                                props.setSizeInsertImage({image: {size: image.size, url: image.src}, view: true})
                            } else {
                                store.dispatch(addImage(image.src, image.size))
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