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
import { StickersManager } from './StickersManager/StickersManager'

interface EditorPropsType {
    stateViewEditor: {
        viewEditor: {
            view: boolean,
            state: string,
        },
        setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    }
    setViewResize: (viewResize: boolean) => void,
    setNotification: (viewResize: boolean) => void,
    refEditor: MutableRefObject<HTMLDivElement | null>,
    setSizeInsertImage: (insertImage: { image: { size: { width: number, height: number }, url: string }, view: boolean }) => void,
    setSizeSelectElement: (size: { width: number, height: number }) => void,
}


export function Editor(props: EditorPropsType) {
    const [font, setFont] = useState('Times New Roman')
    const State: JSX.Element | undefined = (() => {
        if (props.stateViewEditor.viewEditor.state == 'Image Manager') {
            return <ImageManager setSizeInsertImage={props.setSizeInsertImage} setNotification={props.setNotification} />
        }
        if (props.stateViewEditor.viewEditor.state == 'Customize') {
            return <Customize setViewResize={props.setViewResize} />
        }
        if (props.stateViewEditor.viewEditor.state == 'Templates') {
            return <Templates setNotification={props.setNotification} />
        }
        if (props.stateViewEditor.viewEditor.state == 'Graphics') {
            return <Graphics setViewEditor={props.stateViewEditor.setViewEditor} />
        }
        if (props.stateViewEditor.viewEditor.state == 'Text') {
            return <Text />
        }
        if (props.stateViewEditor.viewEditor.state == 'Figure Properties') {
            return <FigureProperties setViewEditor={props.stateViewEditor.setViewEditor} />
        }
        if (props.stateViewEditor.viewEditor.state == 'Text Properties') {
            return <TextProperties
                setViewEditor={props.stateViewEditor.setViewEditor}
                font={font}
            />
        }
        if (props.stateViewEditor.viewEditor.state == 'FontChoose') {
            return <FontChoose
                setViewEditor={props.stateViewEditor.setViewEditor}
                font={font}
                setFont={setFont}
                setNotification={props.setNotification}
            />

        }
        if (props.stateViewEditor.viewEditor.state == 'Stickers') {
            return <StickersManager />
        }
    })()
    return (
        <div className={styles.editor} ref={props.refEditor} style={{ display: (() => { return props.stateViewEditor.viewEditor ? 'block' : 'none' })() }}>
            {State}
        </div>
    )
}



