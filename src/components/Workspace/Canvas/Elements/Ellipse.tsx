import React, { RefObject, useRef, useState } from 'react'
import { Element, setSelectElement } from '../../../../model/Canvas/Element/element'

import { dispatch } from '../../../../editor'
import { getCentreAndSizeOfElement } from '../SelectElement/SelectElementFunction'
import { useDragAndDrop } from '../../../../customHooks/useDragAndDrop'

interface EllipsePropsType {
    radius: { rx: number, ry: number },
    color: string,
    element: Element,
    setViewEditor: (viewEditor: {view: boolean, state: string}) => void,
    position: { x: number, y: number },
    setPosition: (position: {x: number, y: number}) => void,
    setSize: (size: {width: number, height: number}) => void,
}

export function Ellipse(props: EllipsePropsType) {
    const [position, setPosition] = useState(props.element.centre)
    const ref: RefObject<SVGEllipseElement> = useRef(null)
    useDragAndDrop(props.element, ref, props.element.centre, setPosition, props.setPosition, props.setViewEditor, props.setSize)
    return (
        <ellipse
            ref={ref}
            cx={position.x + props.radius.rx}
            cy={position.y + props.radius.ry}
            rx={props.radius.rx}
            ry={props.radius.ry}
            fill={props.color}
            onClick={() => {
            }}
        />
    )
}