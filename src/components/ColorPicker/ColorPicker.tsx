import React, { useState } from 'react'
import { ChromePicker, ColorResult } from 'react-color'
import { dispatch } from '../../editor'
import { Card } from '../../model/Card/card'
import styles from './ColorPicker.module.css'

interface ColorPickerPropstype {
    color: string,
    function: (card: Card, newColor: string) => Card,
}

export function ColorPicker(props: ColorPickerPropstype) {
    const [color, setColor] = useState('#FFF')
    const chromePickerStyles = {
        default: {
            picker: { 
                width: '250px',
                height: '255px',
                borderRadius: '13px',
                backgroundColor: '#242631',
                paddingTop: '15px',
            },
        },
    }
    return (
        <div>
            <div className={styles.header}>Picker</div>
            <ChromePicker
                color={props.color}
                onChange={(newColor: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => {
                    dispatch(props.function, newColor.hex)
                }}
                styles={chromePickerStyles}
            />
        </div>
    )
}