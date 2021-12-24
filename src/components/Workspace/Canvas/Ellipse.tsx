import React from 'react'
import { Element, setSelectElement } from '../../../model/Canvas/Element/element'

import { dispatch } from '../../../editor'
import { getCentreAndSizeOfElement } from './SelectElement/SelectElementFunction'

interface EllipsePropsType {
    centre: { x: number, y: number },
    radius: { rx: number, ry: number },
    color: string,
    element: Element,
    setViewEditor: (viewEditor: {view: boolean, state: string}) => void,
    position: { x: number, y: number },
    setPosition: (position: {x: number, y: number}) => void,
}

export function Ellipse(props: EllipsePropsType) {
    const {centre, size, type} = getCentreAndSizeOfElement(props.element, null)
    return (
        <ellipse
            cx={props.centre.x}
            cy={props.centre.y}
            rx={props.radius.rx}
            ry={props.radius.ry}
            fill={props.color}
            onClick={() => {
                props.setPosition(centre)
                props.setViewEditor({view: true, state: 'Figure Properties'})
                dispatch(setSelectElement, props.element)
            }}
        />
    )
}