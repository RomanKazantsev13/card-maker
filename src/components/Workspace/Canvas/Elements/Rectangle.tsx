import React, { MutableRefObject, RefObject, useRef, useState } from 'react'
import { useDragAndDrop } from '../../../../customHooks/useDragAndDrop'
import useObjectVisible from '../../../../customHooks/useObjectVisibtle'
import { pointNames, pointsSelectElement } from './Elements'
import { useResizeObject } from '../../../../customHooks/useResizeObject'
import { Element } from '../../../../utils/types'

interface RectanglePropsType {
    size: { width: number, height: number },
    color: string,
    element: Element,
    selectElement: Element | null,
    refEditor: RefObject<HTMLDivElement | null>,
    refInputText: MutableRefObject<HTMLInputElement | null>,
    viewEditor: { view: boolean, state: string },
    setViewEditor: (viewEditor: {view: boolean, state: string}) => void,
    statePointsSelectElement: {
        positionPoints: pointsSelectElement,
        setPositionPoints: (points: pointsSelectElement) => void,
    },
    stateSizeSelectElement: {
        size: {width: number, height: number},
        setSize: (size: {width: number, height: number}) => void,
    },
    refs: Array<RefObject<HTMLDivElement>>,
}

export function Rectangle(props: RectanglePropsType) {
    const [position, setPosition] = useState(props.element.centre)
    const [size, setSize] = useState(props.size)
    const ref: RefObject<SVGRectElement> = useRef(null)
    const [isMoving, setIsMoving] = useState(false)
    useDragAndDrop(props.element, ref, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.setViewEditor, props.stateSizeSelectElement.setSize, isMoving, setIsMoving)
    useObjectVisible(ref, props.element, props.selectElement, props.refEditor, props.refInputText, props.viewEditor, props.setViewEditor, false)
    for (let i = 0; i < pointNames.length; i++) {
        useResizeObject(props.element, props.selectElement, props.refs[i], pointNames[i], props.size, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    }
    return (
        <rect
            ref={ref}
            x={position.x}
            y={position.y}
            width={size.width}
            height={size.height}
            fill={props.color}
        />
    )
}