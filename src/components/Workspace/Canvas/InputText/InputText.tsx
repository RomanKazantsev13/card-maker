import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { dispatch } from '../../../../editor';
import { Element, setSelectElement } from '../../../../model/Canvas/Element/element';
import { changeText, isText } from '../../../../model/Canvas/Element/Text/text';
import { getCentreAndSizeOfElement } from '../SelectElement/SelectElementFunction';

interface InputTextPropsType {
    selectElement: Element | null,
    positionSelectElement: {x: number, y: number},
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
    const ref: MutableRefObject<HTMLInputElement | null> = useRef(null)
    const str: string = (() => {
        if (props.selectElement !== null && isText(props.selectElement.object)) {
            return props.selectElement.object.str
        }
        props.stateViewInput.setViewInput(false)
        return ''
    })()

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        props.stateInputValue.setInputValue(event.target.value)
    }

    const escFunction = (event: KeyboardEvent) => {
        { event.keyCode === 13 && ref.current !== null && ref.current.blur() }
    }

    useEffect(() => {
        document.addEventListener("keydown", escFunction)
        return () => {
            document.removeEventListener("keydown", escFunction)
        }
    }, [])

    
    const { centre, size, type } = getCentreAndSizeOfElement(props.selectElement, null)

    return (
        <foreignObject x={props.positionSelectElement.x - 20} y={props.positionSelectElement.y - 20}
            style={{
                width: props.stateSize.size.width + 40,
                height: props.stateSize.size.height + 40,
                display: (() => { return props.stateViewInput.viewInput ? 'block' : 'none' })()
            }}>
            <input
                ref={ref}
                value={props.stateInputValue.inputValue}
                type="text"
                style={{ width: props.stateSize.size.width + 40, height: props.stateSize.size.height + 40 }}
                onBlur={() => {
                    dispatch(changeText, props.stateInputValue.inputValue)
                    dispatch(setSelectElement, null)
                    props.stateViewInput.setViewInput(false)
                }}
                onChange={handleChange}
            />
        </foreignObject>
    )
}