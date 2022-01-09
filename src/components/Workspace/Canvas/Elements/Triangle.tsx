import React, { MutableRefObject, RefObject, useEffect, useRef, useState } from 'react'
import { Element, setSelectElement } from '../../../../model/Canvas/Element/element'

import { dispatch } from '../../../../editor'
import { getCentreAndSizeOfElement } from '../SelectElement/SelectElementFunction'
import { useDragAndDrop } from '../../../../customHooks/useDragAndDrop'
import { isTriangle } from '../../../../model/Canvas/Element/Figure/Triangle/triangle'
import { isFigure } from '../../../../model/Canvas/Element/Figure/figure'
import useObjectVisible from '../../../../customHooks/useObjectVisibtle'
import { pointsSelectElement } from './Elements'
import { useResizeObject } from '../../../../customHooks/useResizeObject'

interface TrianglePropsType {
    points: {
        first: { x: number, y: number },
        second: { x: number, y: number },
        third: { x: number, y: number }
    },
    color: string,
    element: Element,
    selectElement: Element | null,
    viewEditor: { view: boolean, state: string },
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    refEditor: RefObject<HTMLDivElement | null>,
    refInputText: MutableRefObject<HTMLInputElement | null>,
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

export function Triangle(props: TrianglePropsType) {
    const [position, setPosition] = useState(props.element.centre)
    const [size, setSize] = useState({width: props.points.third.x - props.points.first.x, height: props.points.first.y - props.points.second.y})
    const ref: RefObject<SVGPolygonElement> = useRef(null)
    const [isMoving, setIsMoving] = useState(false)
    useDragAndDrop(props.element, ref, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.setViewEditor, props.setSize, isMoving, setIsMoving)
    useObjectVisible(ref, props.element, props.selectElement, props.refEditor, props.refInputText, props.viewEditor, props.setViewEditor, false)
    useResizeObject(props.element, props.selectElement, props.refs[0], 'TopLeft', {width: props.points.third.x - props.points.first.x, height: props.points.first.y - props.points.second.y}, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    useResizeObject(props.element, props.selectElement, props.refs[1], 'TopRight', {width: props.points.third.x - props.points.first.x, height: props.points.first.y - props.points.second.y}, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    useResizeObject(props.element, props.selectElement, props.refs[2], 'BottomLeft', {width: props.points.third.x - props.points.first.x, height: props.points.first.y - props.points.second.y}, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    useResizeObject(props.element, props.selectElement, props.refs[3], 'BottomRight', {width: props.points.third.x - props.points.first.x, height: props.points.first.y - props.points.second.y}, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    useResizeObject(props.element, props.selectElement, props.refs[4], 'Top', {width: props.points.third.x - props.points.first.x, height: props.points.first.y - props.points.second.y}, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    useResizeObject(props.element, props.selectElement, props.refs[5], 'Left', {width: props.points.third.x - props.points.first.x, height: props.points.first.y - props.points.second.y}, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    useResizeObject(props.element, props.selectElement, props.refs[6], 'Right', {width: props.points.third.x - props.points.first.x, height: props.points.first.y - props.points.second.y}, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    useResizeObject(props.element, props.selectElement, props.refs[7], 'Bottom', {width: props.points.third.x - props.points.first.x, height: props.points.first.y - props.points.second.y}, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.stateSizeSelectElement, setSize, isMoving, setIsMoving)
    return (
        <polygon
            ref={ref} 
            points={
                position.x + ' ' + (position.y + size.height) + ',' +
                (position.x + (size.width / 2)) + ' ' + position.y + ',' +
                (position.x + size.width) + ' ' + (position.y + size.height)
            }
            fill={props.color}
            onClick={() => {
            }}
        />
    )
}