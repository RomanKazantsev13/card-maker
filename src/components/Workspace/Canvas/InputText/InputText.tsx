import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { dispatch } from '../../../../editor';
import { Element, setSelectElement } from '../../../../model/Canvas/Element/element';
import { changeText, isText } from '../../../../model/Canvas/Element/Text/text';
import styles from './InputText.module.css'

interface InputTextPropsType {
    selectElement: Element | null,
    positionSelectElement: {x: number, y: number},
    refInputText: MutableRefObject<HTMLInputElement | null>,
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    stateViewInput: {
        viewInput: boolean,
        setViewInput: (view: boolean) => void,
    }
    stateInputValue: {
        inputValue: string,
        setInputValue: (value: string) => void,
    }
    stateSize: {
        size: {width: number, height: number},
        setSize: (size: {width: number, height: number}) => void,
    }
}

export function InputText(props: InputTextPropsType) {
    const str: string = (() => {
        if (props.selectElement && isText(props.selectElement.object)) {
            return props.selectElement.object.str
        }
        props.stateViewInput.setViewInput(false)
        return ''
    })()

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        props.stateInputValue.setInputValue(event.target.value)
    }

    // const escFunction = (event: KeyboardEvent) => {
    //     if (event.keyCode === 13) {
    //         {props.refInputText.current && props.refInputText.current.blur() }
    //         props.setViewEditor({view: true, state: 'Text'})
    //     }
    // }

    // useEffect(() => {
    //     document.addEventListener("keydown", escFunction)
    //     return () => {
    //         document.removeEventListener("keydown", escFunction)
    //     }
    // }, [])

    return (
        <foreignObject x={props.positionSelectElement.x - 20} y={props.positionSelectElement.y - 20}
            style={{
                width: props.stateSize.size.width + 40,
                height: props.stateSize.size.height + 40
            }}>
            <input
                ref={props.refInputText}
                value={props.stateInputValue.inputValue}
                className={styles.input}
                type="text"
                style={{ width: props.stateSize.size.width + 40, height: props.stateSize.size.height + 40 }}
                onBlur={() => {
                    dispatch(changeText, props.stateInputValue.inputValue)
                    dispatch(setSelectElement, null)
                    props.stateViewInput.setViewInput(false)
                    props.setViewEditor({view: true, state: 'Text'})
                }}
                onChange={handleChange}
            />
        </foreignObject>
    )
}