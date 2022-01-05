import React, { MutableRefObject, RefObject, useRef, useState } from 'react'
import { Element, setSelectElement } from '../../../../model/Canvas/Element/element'

import { dispatch } from '../../../../editor'
import { getCentreAndSizeOfElement } from '../SelectElement/SelectElementFunction'
import { useDragAndDrop } from '../../../../customHooks/useDragAndDrop'
import useObjectVisible from '../../../../customHooks/useObjectVisibtle'

interface TextPropsType {
    string: string,
    fontFamily: string,
    fontSize: number,
    color: string,
    element: Element,
    selectElement: Element | null,
    refEditor: RefObject <HTMLDivElement | null>,
    refInputText: MutableRefObject<HTMLInputElement | null>,
    viewEditor: { view: boolean, state: string },
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    position: { x: number, y: number },
    setPosition: (position: {x: number, y: number}) => void,
    setInputValue: (value: string) => void,
    setViewInput: (view: boolean) => void,
    setSize: (size: {width: number, height: number}) => void,
}

export function Text(props: TextPropsType) {
    const ref = useRef(null)
    const { centre, size, type } = getCentreAndSizeOfElement(props.element, ref)

    const [position, setPosition] = useState(centre)
    useDragAndDrop(props.element, ref, centre, setPosition, props.setPosition, props.setViewEditor, props.setSize)
    useObjectVisible(ref, props.element, props.selectElement, props.refEditor, props.refInputText, props.viewEditor, props.setViewEditor)
    return (
        <text
            ref={ref}
            x={position.x} 
            y={position.y}
            style={{ fontFamily: props.fontFamily, fontSize: props.fontSize, fill: props.color }}
            onClick={() => {
                props.setInputValue(props.string)
                props.setViewInput(false)
            }}
            onDoubleClick={() => {
                props.setViewInput(true)
            }}
        >
            {props.string}
        </text>
    )
}