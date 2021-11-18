import React, { useState } from 'react'
import styles from './Editor.module.css'
import { Image } from './Image/Image'
import { Customize } from './Customize/Customize'
import { Templates } from './Templates/Templates'
import { Graphics } from './Graphics/Graphics'
import { Text } from './Text/Text'




export function Editor(props: {
    viewEditor: {
        view: boolean,
        state: string,
    },
    backPicker: {
        color: string,
        setColor: (color: string) => void
    },
}) {
    const State = (() => {
        if (props.viewEditor.state == 'Image Manager') {
            return <Image />
        }
        if (props.viewEditor.state == 'Customize') {
            return <Customize backPicker={{color: props.backPicker.color, setColor: props.backPicker.setColor}}/>
        }
        if (props.viewEditor.state == 'Templates') {
            return <Templates />
        }
        if (props.viewEditor.state == 'Graphics') {
            return <Graphics />
        }
        if (props.viewEditor.state == 'Text') {
            return <Text />
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



