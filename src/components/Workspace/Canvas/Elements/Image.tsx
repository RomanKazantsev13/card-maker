import React, { MutableRefObject, RefObject, useRef, useState } from 'react'
import { Element, setSelectElement } from '../../../../model/Canvas/Element/element'

import { dispatch } from '../../../../editor'
import { useDragAndDrop } from '../../../../customHooks/useDragAndDrop'
import { getCentreAndSizeOfElement } from '../SelectElement/SelectElementFunction'
import useObjectVisible from '../../../../customHooks/useObjectVisibtle'
import { pointsSelectElement } from './Elements'
import { useResizeObject } from '../../../../customHooks/useResizeObject'

interface ImagePropsType {
    size: { width: number, height: number },
    url: string,
    element: Element,
    selectElement: Element | null,
    refEditor: RefObject<HTMLDivElement | null>,
    refInputText: MutableRefObject<HTMLInputElement | null>,
    viewEditor: { view: boolean, state: string },
    statePointsSelectElement: {
        positionPoints: pointsSelectElement,
        setPositionPoints: (points: pointsSelectElement) => void,
    }
    stateSizeSelectElement: {
        size: {width: number, height: number},
        setSize: (size: {width: number, height: number}) => void,
    }
    setSize: (size: {width: number, height: number}) => void,
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    refs: Array<RefObject<HTMLDivElement>>,
}

export function Image(props: ImagePropsType) {
    const [position, setPosition] = useState(props.element.centre)
    const [size, setSize] = useState(props.size)
    const ref: RefObject<SVGImageElement> = useRef(null)
    const [isMoving, setIsMoving] = useState(false)
    useDragAndDrop(props.element, ref, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.setViewEditor, props.setSize, isMoving, setIsMoving)
    useObjectVisible(ref, props.element, props.selectElement, props.refEditor, props.refInputText, props.viewEditor, props.setViewEditor, false)
    useResizeObject(props.element, props.selectElement, props.refs[0], 'TopLeft', props.size, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    useResizeObject(props.element, props.selectElement, props.refs[1], 'TopRight', props.size, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    useResizeObject(props.element, props.selectElement, props.refs[2], 'BottomLeft', props.size, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    useResizeObject(props.element, props.selectElement, props.refs[3], 'BottomRight', props.size, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    useResizeObject(props.element, props.selectElement, props.refs[4], 'Top', props.size, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    useResizeObject(props.element, props.selectElement, props.refs[5], 'Left', props.size, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    useResizeObject(props.element, props.selectElement, props.refs[6], 'Right', props.size, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    useResizeObject(props.element, props.selectElement, props.refs[7], 'Bottom', props.size, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    return (
        <image
            ref={ref}
            crossOrigin={'anonymous'}
            href={props.url}
            x={position.x}
            y={position.y}
            width={size.width}
            height={size.height}
            onClick={() => {
            }}
        />
    )
}