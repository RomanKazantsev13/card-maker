import React from 'react'
import { Element, setSelectElement } from '../../../model/Canvas/Element/element'

import { dispatch } from '../../../editor'

interface RectanglePropsType {
    centre: { x: number, y: number },
    size: { width: number, height: number },
    color: string,
    element: Element,
    setViewEditor: (viewEditor: {view: boolean, state: string}) => void,
    position: { x: number, y: number },
    setPosition: (position: {x: number, y: number}) => void,
}

export function Rectangle(props: RectanglePropsType) {
    return (
        <rect
            x={props.position.x}
            y={props.position.y}
            width={props.size.width}
            height={props.size.height}
            fill={props.color}
            onClick={() => {
                props.setPosition(props.centre)
                props.setViewEditor({view: true, state: 'Figure Properties'})
                dispatch(setSelectElement, props.element)
            }}
        />
    )
}