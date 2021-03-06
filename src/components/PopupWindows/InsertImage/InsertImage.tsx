import React from 'react'
import styles from './InsertImage.module.css'
import { Button } from '../SaveComputer/Button'
import { store } from '../../../store/store'
import { addImage } from '../../../store/actionCreators/ImageActionCreators'
import { setSizeCanvas } from '../../../store/actionCreators/CanvasActionCreators'

interface InsertImagePropsType {
    stateSizeInsertImage: {
        sizeInsertImage: {image: {size: {width: number, height: number}, url: string}, view: boolean},
        setSizeInsertImage: (insertImage: {image: {size: {width: number, height: number}, url: string}, view: boolean}) => void,
    }
}

export function InsertImage(props: InsertImagePropsType) {
    return (
        <div className={styles.wrap}>
            <div className={styles.content_layout}>
                <div className={styles.text}>
                    The picture you want to insert is larger than the size of your canvas.
                    Choose what you need to do: <br/>
                    •  increase the canvas to the size of the image<br/>
                    •  save the canvas size <br/>
                    •  cancel the insertion
                </div>
                <div className={styles.button_layout}>
                    <Button content={"Cancel"} background={["#353948", "#484d61"]} color={"#f1f1f1"} onclick={() => {
                        props.stateSizeInsertImage.setSizeInsertImage({
                            image: {size: props.stateSizeInsertImage.sizeInsertImage.image.size, url: ''}, 
                            view: false
                        })
                    }} />
                    <Button content={"Save"} background={["#8a9dff", "#647dff"]} color={"#000"} onclick={() => {
                        store.dispatch(addImage( 
                            props.stateSizeInsertImage.sizeInsertImage.image.url, 
                            props.stateSizeInsertImage.sizeInsertImage.image.size
                        ))
                        props.stateSizeInsertImage.setSizeInsertImage({
                            image: {size: props.stateSizeInsertImage.sizeInsertImage.image.size, url: ''}, 
                            view: false
                        })
                    }} />
                    <Button content={"Increase"} background={["#8a9dff", "#647dff"]} color={"#000"} onclick={() => {
                        store.dispatch(setSizeCanvas(props.stateSizeInsertImage.sizeInsertImage.image.size))
                        store.dispatch(addImage(
                            props.stateSizeInsertImage.sizeInsertImage.image.url, 
                            props.stateSizeInsertImage.sizeInsertImage.image.size
                        ))
                        props.stateSizeInsertImage.setSizeInsertImage({
                            image: {size: props.stateSizeInsertImage.sizeInsertImage.image.size, url: ''}, 
                            view: false
                        })
                    }} />
                </div>
            </div>
        </div>
    )
}