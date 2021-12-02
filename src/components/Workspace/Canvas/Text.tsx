import React from 'react'
import { dispatch } from '../../../editor'
import { Element, setSelectElement } from '../../../model/Canvas/Element/element'

export function Text(props: {
    stroka: string,
    center: { x: number, y: number },
    fontFamily: string,
    fontSize: number,
    color: string,
    setValue: (value: {
        size: { width: number, height: number },
        centre: { x: number, y: number }
    }) => void,
    element: Element,
}) {

    return (
        <text
            x={props.center.x}
            y={props.center.y}
            style={{ fontFamily: props.fontFamily, fontSize: props.fontSize, fill: props.color }}
            onClick={() => {
                dispatch(setSelectElement, props.element)
            }}
        >
            {props.stroka}
        </text>
    )
}