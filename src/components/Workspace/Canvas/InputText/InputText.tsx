import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { dispatch } from '../../../../editor';
import { Element, setSelectElement } from '../../../../model/Canvas/Element/element';
import { changeText, isText } from '../../../../model/Canvas/Element/Text/text';
import { getCentreAndSizeOfElement } from '../SelectElement/SelectElementFunction';

interface InputTextPropsType {
    selectElement: Element | null,
    view: boolean,
    setView: (view: boolean) => void,
    value: string,
    setValue: (value: string) => void,
}

export function InputText(props: InputTextPropsType) {
    const ref: MutableRefObject<HTMLInputElement | null> = useRef(null)
    const str: string = (() => {
        if (props.selectElement !== null && isText(props.selectElement.object)) {
            return props.selectElement.object.str
        }
        props.setView(false)
        return ''
    })()

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        props.setValue(event.target.value)
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
        <foreignObject x={centre.x - 20} y={centre.y - 20}
            style={{
                width: size.width + 40,
                height: size.height + 40,
                display: (() => { return props.view ? 'block' : 'none' })()
            }}>
            <input
                ref={ref}
                value={props.value}
                type="text"
                style={{ width: size.width + 40, height: size.height + 40 }}
                onBlur={() => {
                    dispatch(changeText, props.value)
                    dispatch(setSelectElement, null)
                    props.setView(false)
                }}
                onChange={handleChange}
            />
        </foreignObject>
    )
}