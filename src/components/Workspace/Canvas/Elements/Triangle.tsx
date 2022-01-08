import React, { MutableRefObject, RefObject, useEffect, useRef, useState } from 'react'
import { Element, setSelectElement } from '../../../../model/Canvas/Element/element'

import { dispatch } from '../../../../editor'
import { getCentreAndSizeOfElement } from '../SelectElement/SelectElementFunction'
import { useDragAndDrop } from '../../../../customHooks/useDragAndDrop'
import { isTriangle } from '../../../../model/Canvas/Element/Figure/Triangle/triangle'
import { isFigure } from '../../../../model/Canvas/Element/Figure/figure'
import useObjectVisible from '../../../../customHooks/useObjectVisibtle'
import { pointsSelectElement } from './Elements'

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
    }
    setSize: (size: {width: number, height: number}) => void,
}

export function Triangle(props: TrianglePropsType) {
    const [position, setPosition] = useState(props.element.centre)
    const ref: RefObject<SVGPolygonElement> = useRef(null)
    useDragAndDrop(props.element, ref, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.setViewEditor, props.setSize)
    useObjectVisible(ref, props.element, props.selectElement, props.refEditor, props.refInputText, props.viewEditor, props.setViewEditor, false)

    return (
        <polygon
            ref={ref}
            points={
                position.x + ' ' + (position.y + props.points.first.y - props.points.second.y) + ',' +
                (position.x + props.points.third.x - props.points.second.x) + ' ' + position.y + ',' +
                (position.x + props.points.third.x - props.points.first.x) + ' ' + (position.y + props.points.third.y - props.points.second.y)
            }
            fill={props.color}
            onClick={() => {
            }}
        />
    )
}