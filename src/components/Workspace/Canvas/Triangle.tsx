import React, { useEffect, useRef } from 'react'
import { Element, setSelectElement } from '../../../model/Canvas/Element/element'

import { dispatch } from '../../../editor'
import { getCentreAndSizeOfElement } from './SelectElement/SelectElementFunction'

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
    refEditor: any,
    position: { x: number, y: number },
    setPosition: (position: { x: number, y: number }) => void,
}

export function Triangle(props: TrianglePropsType) {
    const handleClickOutside = (event: MouseEvent) => {
        if (props.refEditor.current && !props.refEditor.current.contains(event.target)) {
            if (props.viewEditor.state == 'Text Properties') {
                props.setViewEditor({ view: true, state: 'Text' })
            }
            if (props.viewEditor.state == 'Figure Properties') {
                props.setViewEditor({ view: true, state: 'Graphics' })
            }
            dispatch(setSelectElement, null)
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    })

    const {centre, size, type} = getCentreAndSizeOfElement(props.element, null)

    return (
        <polygon
            points={
                props.points.first.x + ' ' + props.points.first.y + ',' +
                props.points.second.x + ' ' + props.points.second.y + ',' +
                props.points.third.x + ' ' + props.points.third.y
            }
            fill={props.color}
            onClick={() => {
                props.setPosition(centre)
                props.setViewEditor({ view: true, state: 'Figure Properties' })
                dispatch(setSelectElement, props.element)
            }}
        />
    )
}