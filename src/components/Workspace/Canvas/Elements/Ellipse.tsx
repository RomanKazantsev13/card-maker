import React, { MutableRefObject, RefObject, useRef, useState } from 'react'
import { Element, setSelectElement } from '../../../../model/Canvas/Element/element'

import { dispatch } from '../../../../editor'
import { getCentreAndSizeOfElement } from '../SelectElement/SelectElementFunction'
import { useDragAndDrop } from '../../../../customHooks/useDragAndDrop'
import useObjectVisible from '../../../../customHooks/useObjectVisibtle'
import { pointsSelectElement } from './Elements'
import { useResizeObject } from '../../../../customHooks/useResizeObject'

interface EllipsePropsType {
    radius: { rx: number, ry: number },
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
    setSize: (size: {width: number, height: number}) => void,
    refs: Array<RefObject<HTMLDivElement>>,
}

export function Ellipse(props: EllipsePropsType) {
    const [position, setPosition] = useState(props.element.centre)
    const [size, setSize] = useState({width: props.radius.rx * 2, height: props.radius.ry * 2})
    const [isMoving, setIsMoving] = useState(false)
    const ref: RefObject<SVGEllipseElement> = useRef(null)
    useDragAndDrop(props.element, ref, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.setViewEditor, props.setSize, isMoving, setIsMoving)
    useObjectVisible(ref, props.element, props.selectElement, props.refEditor, props.refInputText, props.viewEditor, props.setViewEditor, false)
    useResizeObject(props.element, props.selectElement, props.refs[0], 'TopLeft', {width: props.radius.rx * 2, height: props.radius.ry * 2}, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    useResizeObject(props.element, props.selectElement, props.refs[1], 'TopRight', {width: props.radius.rx * 2, height: props.radius.ry * 2}, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    useResizeObject(props.element, props.selectElement, props.refs[2], 'BottomLeft', {width: props.radius.rx * 2, height: props.radius.ry * 2}, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    useResizeObject(props.element, props.selectElement, props.refs[3], 'BottomRight', {width: props.radius.rx * 2, height: props.radius.ry * 2}, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    useResizeObject(props.element, props.selectElement, props.refs[4], 'Top', {width: props.radius.rx * 2, height: props.radius.ry * 2}, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    useResizeObject(props.element, props.selectElement, props.refs[5], 'Left', {width: props.radius.rx * 2, height: props.radius.ry * 2}, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    useResizeObject(props.element, props.selectElement, props.refs[6], 'Right', {width: props.radius.rx * 2, height: props.radius.ry * 2}, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    useResizeObject(props.element, props.selectElement, props.refs[7], 'Bottom', {width: props.radius.rx * 2, height: props.radius.ry * 2}, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    return (
        <ellipse
            ref={ref}
            cx={position.x + size.width / 2}
            cy={position.y + size.height / 2}
            rx={size.width / 2}
            ry={size.height / 2}
            fill={props.color}
            onClick={() => {
            }}
        />
    )
}