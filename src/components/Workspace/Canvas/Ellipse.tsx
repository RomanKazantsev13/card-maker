import React from 'react'
import { dispatch } from '../../../editor'
import { Element, setSelectElement } from '../../../model/Canvas/Element/element'

export function Ellipse(props: {
    centre: { x: number, y: number },
    radius: { rx: number, ry: number },
    color: string,
    setValue: (value: {
        size: { width: number, height: number },
        centre: { x: number, y: number }
    }) => void,
    element: Element,
}) {
    return (
        <ellipse
            cx={props.centre.x}
            cy={props.centre.y}
            rx={props.radius.rx}
            ry={props.radius.ry}
            fill={props.color}
            onClick={() => {
                props.setValue({
                    size: { width: 2 * props.radius.rx, height: 2 * props.radius.ry },
                    centre: { x: props.centre.x - props.radius.rx, y: props.centre.y - props.radius.ry }
                })
                dispatch(setSelectElement, props.element)
            }}
        />
    )
}