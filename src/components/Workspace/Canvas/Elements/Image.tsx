import React, { MutableRefObject, RefObject, useRef, useState } from 'react'
import { Element, setSelectElement } from '../../../../model/Canvas/Element/element'

import { dispatch } from '../../../../editor'
import { useDragAndDrop } from '../../../../customHooks/useDragAndDrop'
import { getCentreAndSizeOfElement } from '../SelectElement/SelectElementFunction'
import useObjectVisible from '../../../../customHooks/useObjectVisibtle'
import { pointNames, pointsSelectElement } from './Elements'
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
    for (let i = 0; i < pointNames.length; i++) {
        useResizeObject(props.element, props.selectElement, props.refs[i], pointNames[i], props.size, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    }
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