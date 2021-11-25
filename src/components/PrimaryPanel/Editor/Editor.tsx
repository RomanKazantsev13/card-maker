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




export function Editor(props: {
    viewEditor: {
        view: boolean,
        state: string,
    },
    setViewResize: (viewResize: boolean) => void,
    setViewEditor: (viewEditor: {view: boolean, state: string}) => void,
}) {
    
    const [font, setFont] = useState('Arial')

    const State = (() => {
        if (props.viewEditor.state == 'Image Manager') {
            return <Image />
        }
        if (props.viewEditor.state == 'Customize') {
            return <Customize 
                        setViewResize={props.setViewResize}
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
            return <FigureProperties setViewEditor={props.setViewEditor} />
        }
        if (props.viewEditor.state == 'Text Properties') {
            return <TextProperties setViewEditor={props.setViewEditor} font={font} />
        }
        if (props.viewEditor.state == 'FontChoose') {
            return <FontChoose setViewEditor={props.setViewEditor} font={font} setFont={setFont} />
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



