import React from 'react'
import { ChromePicker } from 'react-color'
import { dispatch } from '../../editor'
import styles from './ColorPicker.module.css'

export function ColorPicker(props: {
    backPicker: {
        color: string,
        setColor: (color: string) => void
    },
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
                color={props.backPicker.color}
                onChange={(updateColor: any) => {
                    props.backPicker.setColor(updateColor.hex)
                    dispatch(props.function, updateColor.hex)
                }}
                styles={chromePickerStyles}
            />
        </div>
    )
}