import React, { MutableRefObject, RefObject, useEffect, useRef, useState } from 'react'
import { Element, setSelectElement } from '../../../../model/Canvas/Element/element'

import { dispatch } from '../../../../editor'
import { getCentreAndSizeOfElement } from '../SelectElement/SelectElementFunction'
import { useDragAndDrop } from '../../../../customHooks/useDragAndDrop'
import { isTriangle } from '../../../../model/Canvas/Element/Figure/Triangle/triangle'
import { isFigure } from '../../../../model/Canvas/Element/Figure/figure'

interface TrianglePropsType {
    points: {
        first: { x: number, y: number },
        second: { x: number, y: number },
        third: { x: number, y: number }
    },
    color: string,
    element: Element,
    viewEditor: { view: boolean, state: string },
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    refEditor: RefObject<HTMLDivElement | null>,
    position: { x: number, y: number },
    setPosition: (position: { x: number, y: number }) => void,
    setSize: (size: {width: number, height: number}) => void,
}

export function Triangle(props: TrianglePropsType) {
    // const handleClickOutside = (event: MouseEvent) => {
    //     if (props.refEditor.current && !props.refEditor.current.contains(event.target as Node)) {
    //         if (props.viewEditor.state == 'Text Properties') {
    //             props.setViewEditor({ view: true, state: 'Text' })
    //         }
    //         if (props.viewEditor.state == 'Figure Properties') {
    //             props.setViewEditor({ view: true, state: 'Graphics' })
    //         }
    //         dispatch(setSelectElement, null)
    //     }
    // }
    // useEffect(() => {
    //     document.addEventListener('click', handleClickOutside, true)
    //     return () => {
    //         document.removeEventListener('click', handleClickOutside, true)
    //     }
    // })
    const [position, setPosition] = useState(props.element.centre)
    const ref: RefObject<SVGPolygonElement> = useRef(null)
    useDragAndDrop(props.element, ref, props.element.centre, setPosition, props.setPosition, props.setViewEditor, props.setSize)

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