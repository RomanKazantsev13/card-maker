import React from 'react'
import { Element, setSelectElement } from '../../../model/Canvas/Element/element'

import { dispatch } from '../../../editor'

interface TextPropsType {
    stroka: string,
    center: { x: number, y: number },
    fontFamily: string,
    fontSize: number,
    color: string,
    element: Element,
    setViewEditor: (viewEditor: {view: boolean, state: string}) => void,
}

export function Text(props: TextPropsType) {
    return (
        <text
            x={props.center.x}
            y={props.center.y}
            style={{ fontFamily: props.fontFamily, fontSize: props.fontSize, fill: props.color }}
            onClick={() => {
                props.setViewEditor({view: true, state: 'Text Properties'})
                dispatch(setSelectElement, props.element)
            }}
        >
            {props.stroka}
        </text>
    )
}