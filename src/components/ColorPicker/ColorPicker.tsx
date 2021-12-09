import React from 'react'
import { ChromePicker, ColorResult } from 'react-color'
import { dispatch } from '../../editor'
import styles from './ColorPicker.module.css'

export function ColorPicker(props: {
    color: string,
    function: any,
}) {

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
                onChange={(newColor: ColorResult) => {
                    dispatch(props.function, newColor.hex)
                }}
                styles={chromePickerStyles}
            />
        </div>
    )
}