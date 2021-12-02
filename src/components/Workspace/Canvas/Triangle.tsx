import React from 'react'
import useComponentVisible from '../../../customHooks/useComponentVisible'
import { dispatch } from '../../../editor'
import { Element, setSelectElement } from '../../../model/Canvas/Element/element'


export function Triangle(props: {
    points: {
        first: { x: number, y: number },
        second: { x: number, y: number },
        third: { x: number, y: number }
    },
    color: string,
    setValue: (value: {
        size: { width: number, height: number },
        centre: { x: number, y: number }
    }) => void,
    element: Element,
}) {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)
    if (isComponentVisible) {
        dispatch(setSelectElement, props.element)
    } else {
        dispatch(setSelectElement, null)
    }
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
                props.setValue({
                    size: { width: props.points.third.x - props.points.first.x, height: props.points.first.y - props.points.second.y },
                    centre: { x: props.points.first.x, y: props.points.second.y }
                })
                setIsComponentVisible(true)
            }}
        />
    )
}