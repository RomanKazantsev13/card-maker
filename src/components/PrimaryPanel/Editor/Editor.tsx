import React, { useState } from 'react'
import styles from './Editor.module.css'
import { Image } from './Image/Image'
import { Customize } from './Customize/Customize'
import { Templates } from './Templates/Templates'
import { Graphics } from './Graphics/Graphics'
import { Text } from './Text/Text'
import { FigureProperties } from './FigureProperties/FigurePropeties'
import { TextProperties } from './TextProperties/TextProperties'
import { FontChoose } from './FontChoose/FontChoose'
import { Element } from '../../../model/Canvas/Element/element'
import { isText } from '../../../model/Canvas/Element/Text/text'
import { isFigure } from '../../../model/Canvas/Element/Figure/figure'




export function Editor(props: {
    viewEditor: {
        view: boolean,
        state: string,
    },
    setViewResize: (viewResize: boolean) => void,
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    canvas: {
        size: {
            height: number,
            width: number,
        },
        background: string,
        selectElement: Element | null,
    },
}) {

    const [font, setFont] = useState('Arial')

    const State = (() => {
        if (props.viewEditor.state == 'Image Manager') {
            return <Image />
        }
        if (props.viewEditor.state == 'Customize') {
            return <Customize
                setViewResize={props.setViewResize}
                canvas={props.canvas}
            />
        }
        if (props.viewEditor.state == 'Templates') {
            return <Templates />
        }
        if (props.viewEditor.state == 'Graphics') {
            return <Graphics setViewEditor={props.setViewEditor} />
        }
        if (props.viewEditor.state == 'Text') {
            return <Text setViewEditor={props.setViewEditor} />
        }
        if (props.viewEditor.state == 'Figure Properties') {
            if (props.canvas.selectElement !== null && isFigure(props.canvas.selectElement.object)) {
                return <FigureProperties setViewEditor={props.setViewEditor} element={props.canvas.selectElement.object} />
            }
        }
        if (props.viewEditor.state == 'Text Properties') {
            if (props.canvas.selectElement !== null && isText(props.canvas.selectElement.object)) {
                return <TextProperties setViewEditor={props.setViewEditor} font={props.canvas.selectElement.object.font} element={props.canvas.selectElement.object} />
            }
        }
        if (props.viewEditor.state == 'FontChoose') {
            if (props.canvas.selectElement !== null && isText(props.canvas.selectElement.object)) {
                return <FontChoose setViewEditor={props.setViewEditor} font={props.canvas.selectElement.object.font} setFont={setFont} />
            }
        }
    })()
    return (
        <div className={styles.editor} style={{
            display: (() => {
                if (props.viewEditor) {
                    return 'block'
                }
                return 'none'
            })()
        }}>
            {State}
        </div>
    )
}



