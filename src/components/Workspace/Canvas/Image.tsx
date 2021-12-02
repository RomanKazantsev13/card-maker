import React from 'react'
import { dispatch } from '../../../editor'
import { Element, setSelectElement } from '../../../model/Canvas/Element/element'

export function Image(props: {
    centre: { x: number, y: number },
    size: { width: number, height: number },
    url: string,
    setValue: (value: {
        size: { width: number, height: number },
        centre: { x: number, y: number }
    }) => void,
    element: Element,
}) {
    return (
        <image
            href={props.url}
            x={props.centre.x}
            y={props.centre.y}
            width={props.size.width}
            height={props.size.height}
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