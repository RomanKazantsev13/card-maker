import React, { MutableRefObject, useEffect, useRef } from 'react'
import { Element, setSelectElement } from '../../../model/Canvas/Element/element'
import useComponentVisible from '../../../customHooks/useComponentVisible'

import { dispatch } from '../../../editor'

interface TrianglePropsType {
    points: {
        first: { x: number, y: number },
        second: { x: number, y: number },
        third: { x: number, y: number }
    },
    color: string,
    element: Element,
    viewEditor: {view: boolean, state: string},
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    refEditor: any,
    setPosition: (position: {x: number, y: number}) => void,
}

export function Triangle(props: TrianglePropsType) {
    const ref: any = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target)) {
                console.log(props.refEditor)
                if (props.refEditor.current && !props.refEditor.current.contains(event.target)) {
                    if (props.viewEditor.state == 'Text Properties') {
                        props.setViewEditor({view: true, state: 'Text'})
                    }
                    if (props.viewEditor.state == 'Figure Properties') {
                        props.setViewEditor({view: true, state: 'Graphics'})
                    }
                    dispatch(setSelectElement, null)
                }
            }
        }

        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    })

    return (
        <polygon
            ref={ref}
            points={
                props.points.first.x + ' ' + props.points.first.y + ',' +
                props.points.second.x + ' ' + props.points.second.y + ',' +
                props.points.third.x + ' ' + props.points.third.y
            }
            fill={props.color}
            onClick={() => {
                props.setPosition(props.element.centre)
                props.setViewEditor({ view: true, state: 'Figure Properties' })
                dispatch(setSelectElement, props.element)
            }}
        />
    )
}