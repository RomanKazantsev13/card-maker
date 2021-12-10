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
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    refEditor: any
}

export function Triangle(props: TrianglePropsType) {
    const ref: any = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target)) {
                console.log(props.refEditor)
                if (props.refEditor.current && !props.refEditor.current.contains(event.target)) {
                    props.setViewEditor({view: false, state: ''})
                    dispatch(setSelectElement, null)
                }
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
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
                props.setViewEditor({ view: true, state: 'Figure Properties' })
                dispatch(setSelectElement, props.element)
            }}
        />
    )
}