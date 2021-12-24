import React, { MutableRefObject } from 'react'
import { Element, setSelectElement } from '../../../model/Canvas/Element/element'

import { dispatch } from '../../../editor'
import { getCentreAndSizeOfElement } from './SelectElement/SelectElementFunction'

interface TextPropsType {
    string: string,
    center: { x: number, y: number },
    fontFamily: string,
    fontSize: number,
    color: string,
    element: Element,
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    refText: MutableRefObject<SVGTextElement | null>,
    position: { x: number, y: number },
    setPosition: (position: {x: number, y: number}) => void,
}

export function Text(props: TextPropsType) {
    const {centre, size, type} = getCentreAndSizeOfElement(props.element, props.refText)
    console.log(centre)
    return (
        <text
            ref={props.refText}
            x={props.center.x} 
            y={props.center.y}
            style={{ fontFamily: props.fontFamily, fontSize: props.fontSize, fill: props.color }}
            onClick={() => {
                props.setPosition(centre)
                props.setViewEditor({ view: true, state: 'Text Properties' })
                dispatch(setSelectElement, props.element)
            }}
        >
            {props.string}
        </text>
    )
}