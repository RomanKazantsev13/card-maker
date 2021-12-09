import React from 'react'
import { Element, setSelectElement } from '../../../model/Canvas/Element/element'

import { dispatch } from '../../../editor'

interface EllipsePropsType {
    centre: { x: number, y: number },
    radius: { rx: number, ry: number },
    color: string,
    element: Element,
    setViewEditor: (viewEditor: {view: boolean, state: string}) => void,
}

export function Ellipse(props: EllipsePropsType) {
    return (
        <ellipse
            cx={props.centre.x}
            cy={props.centre.y}
            rx={props.radius.rx}
            ry={props.radius.ry}
            fill={props.color}
            onClick={() => {
                props.setViewEditor({view: true, state: 'Figure Properties'})
                dispatch(setSelectElement, props.element)
            }}
        />
    )
}