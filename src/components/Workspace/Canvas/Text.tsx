import React, { ElementType, ReactElement, useRef } from 'react'
import { Element, setSelectElement } from '../../../model/Canvas/Element/element'

import { dispatch } from '../../../editor'

interface TextPropsType {
    string: string,
    center: { x: number, y: number },
    fontFamily: string,
    fontSize: number,
    color: string,
    element: Element,
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    refText: any,
    setPosition: (position: {x: number, y: number}) => void,
}

export function Text(props: TextPropsType) {
    return (
        <text
            ref={props.refText}
            x={props.center.x} 
            y={props.center.y}
            style={{ fontFamily: props.fontFamily, fontSize: props.fontSize, fill: props.color }}
            onClick={() => {
                props.setPosition(props.element.centre)
                props.setViewEditor({ view: true, state: 'Text Properties' })
                
                dispatch(setSelectElement, props.element)
            }}
        >
            {props.string}
        </text>
    )
}