import React, { MutableRefObject, useState } from 'react'
import styles from './Editor.module.css'
import { ImageManager } from './ImageManager/ImageManager'
import { Customize } from './Customize/Customize'
import { Templates } from './Templates/Templates'
import { Graphics } from './Graphics/Graphics'
import { Text } from './Text/Text'
import { FigureProperties } from './FigureProperties/FigurePropeties'
import { TextProperties } from './TextProperties/TextProperties'
import { FontChoose } from './FontChoose/FontChoose'
import { isText } from '../../../model/Canvas/Element/Text/text'
import { isFigure } from '../../../model/Canvas/Element/Figure/figure'
import { Canvas } from '../../../model/Canvas/canvas'

interface EditorPropsType {
    stateViewEditor: {
        viewEditor: {
            view: boolean,
            state: string,
        },
        setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    }
    setViewResize: (viewResize: boolean) => void,
    canvas: Canvas,
    refEditor: MutableRefObject<HTMLDivElement | null>,
    setSizeInsertImage: (insertImage: {image: {size: {width: number, height: number}, url: string}, view: boolean}) => void,
}


export function Editor(props: EditorPropsType) {
    const [font, setFont] = useState('Times New Roman')
    const State: JSX.Element | undefined = (() => {
        if (props.stateViewEditor.viewEditor.state == 'Image Manager') {
            return <ImageManager setSizeInsertImage={props.setSizeInsertImage} canvasSize={props.canvas.size} />
        }
        if (props.stateViewEditor.viewEditor.state == 'Customize') {
            return <Customize setViewResize={props.setViewResize} canvas={props.canvas} />
        }
        if (props.stateViewEditor.viewEditor.state == 'Templates') {
            return <Templates />
        }
        if (props.stateViewEditor.viewEditor.state == 'Graphics') {
            return <Graphics setViewEditor={props.stateViewEditor.setViewEditor} />
        }
        if (props.stateViewEditor.viewEditor.state == 'Text') {
            return <Text setViewEditor={props.stateViewEditor.setViewEditor} />
        }
        if (props.stateViewEditor.viewEditor.state == 'Figure Properties') {
            if (props.canvas.selectElement !== null && isFigure(props.canvas.selectElement.object)) {
                return <FigureProperties setViewEditor={props.stateViewEditor.setViewEditor} element={props.canvas.selectElement.object} />
            }
        }
        if (props.stateViewEditor.viewEditor.state == 'Text Properties') {
            if (props.canvas.selectElement !== null && isText(props.canvas.selectElement.object)) {
                return <TextProperties
                    setViewEditor={props.stateViewEditor.setViewEditor}
                    font={font}
                    element={props.canvas.selectElement.object}
                    selectElement={props.canvas.selectElement}
                />
            }
        }
        if (props.stateViewEditor.viewEditor.state == 'FontChoose') {
            if (props.canvas.selectElement !== null && isText(props.canvas.selectElement.object)) {
                return <FontChoose setViewEditor={props.stateViewEditor.setViewEditor} font={props.canvas.selectElement.object.font} setFont={setFont} />
            }
        }
    })()
    return (
        <div className={styles.editor} ref={props.refEditor} style={{ display: (() => { return props.stateViewEditor.viewEditor ? 'block' : 'none' })() }}>
            {State}
        </div>
    )
}



