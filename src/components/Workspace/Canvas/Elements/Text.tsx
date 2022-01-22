import React, { MutableRefObject, RefObject, useEffect, useRef, useState } from 'react'
import { getCentreAndSizeOfElement } from '../SelectElement/SelectElementFunction'
import { useDragAndDrop } from '../../../../customHooks/useDragAndDrop'
import useObjectVisible from '../../../../customHooks/useObjectVisibtle'
import { pointsSelectElement } from './Elements'
import { Element } from '../../../../utils/types'

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
    statePointsSelectElement: {
        positionPoints: pointsSelectElement,
        setPositionPoints: (points: pointsSelectElement) => void,
    }
    setInputValue: (value: string) => void,
    stateViewInput: {
        viewInput: boolean,
        setViewInput: (view: boolean) => void,
    },
    setSize: (size: {width: number, height: number}) => void,
}

export function Text(props: TextPropsType) {
    const ref = useRef(null)
    const { centre, size, type } = getCentreAndSizeOfElement(props.element, ref)

    useEffect(() => {
        props.setSize(getCentreAndSizeOfElement(props.element, ref).size)
        props.statePointsSelectElement.setPositionPoints({
            ...props.statePointsSelectElement.positionPoints,
            border: {x: getCentreAndSizeOfElement(props.element, ref).centre.x, y: getCentreAndSizeOfElement(props.element, ref).centre.y - props.fontSize}
        })
      }, [props.fontFamily, props.fontSize])

    const [position, setPosition] = useState(centre)
    const [isMoving, setIsMoving] = useState(false)
    useDragAndDrop(props.element, ref, centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.setViewEditor, props.setSize, isMoving, setIsMoving)
    useObjectVisible(ref, props.element, props.selectElement, props.refEditor, props.refInputText, props.viewEditor, props.setViewEditor, props.stateViewInput.viewInput)
    return (
        <text
            ref={ref}
            x={position.x} 
            y={position.y}
            style={{ fontFamily: props.fontFamily, fontSize: props.fontSize, fill: props.color }}
            onClick={() => {
                props.setInputValue(props.string)
                props.stateViewInput.setViewInput(false)
            }}
            onDoubleClick={() => {
                props.stateViewInput.setViewInput(true)
            }}
        >
            {props.string}
        </text>
    )
}