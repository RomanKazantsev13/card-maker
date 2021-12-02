import React, { createRef, useRef, useState } from 'react'
import useDragAndDrop from '../../../customHooks/useDragAndDrop'
import { dispatch } from '../../../editor'
import { Element, setSelectElement } from '../../../model/Canvas/Element/element'

export function Rectangle(props: {
    centre: { x: number, y: number },
    size: { width: number, height: number },
    color: string,
    setValue: (value: {
        size: { width: number, height: number },
        centre: { x: number, y: number }
    }) => void,
    element: Element,
}) {
    const ref: React.RefObject<SVGElement> = useRef(null)
    const [position, setPosition] = useState(props.centre)
    //const [pos, setPos] = useDragAndDrop({ref, setPosition})

    return (
        <rect
            x={props.centre.x}
            y={props.centre.y}
            width={props.size.width}
            height={props.size.height}
            fill={props.color}
            onClick={() => {
                props.setValue({
                    size: { width: props.size.width, height: props.size.height },
                    centre: { x: props.centre.x, y: props.centre.y }
                })
                dispatch(setSelectElement, props.element)
            }}
        />
    )
}