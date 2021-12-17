import React, { MutableRefObject, useEffect, useRef, useState } from 'react'
import { dispatch } from '../../../../editor';
import { Element, setSelectElement } from '../../../../model/Canvas/Element/element';
import { changeText, isText } from '../../../../model/Canvas/Element/Text/text';
import { getCentreAndSizeOfElement } from '../SelectElement/SelectElementFunction';

interface InputTextPropsType {
    selectElement: Element | null,
    refText: any,
    view: boolean,
    setView: (view: boolean) => void,
}

export function InputText(props: InputTextPropsType) {
    const ref: MutableRefObject<HTMLInputElement | null> = useRef(null)
    const { centre, size, type } = getCentreAndSizeOfElement(props.selectElement, props.refText)
    const str = (() => {
        if (props.selectElement !== null && isText(props.selectElement.object)) {
            return props.selectElement.object.str
        }
    })()
    const [string, setString] = useState(str)

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setString(event.target.value)
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

    return (
        <foreignObject x={centre.x - 20} y={centre.y - 20}
            style={{
                width: size.width + 40,
                height: size.height + 40,
                display: (() => {
                    if (props.view) {
                        return 'block'
                    }
                    return 'none'
                })()
            }}>
            <input
                ref={ref}
                value={string}
                type="text"
                style={{width: size.width + 40, height: size.height + 40}}
                onBlur={() => {
                    dispatch(changeText, string)
                    dispatch(setSelectElement, null)
                    props.setView(false)
                }}
                onChange={handleChange}
            />
        </foreignObject>
    )
}