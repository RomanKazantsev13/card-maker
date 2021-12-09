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
    setViewEditor: (viewEditor: {view: boolean, state: string}) => void,
    ref: MutableRefObject<HTMLDivElement | null>
} 

export function Triangle(props: TrianglePropsType) {
    const ref: any = useRef(null)

    const handleClickOutside = (event: MouseEvent) => {
        console.log('ref', ref)
        console.log('props.ref', props.ref)
        if (ref.current && !ref.current.contains(event.target)) {
            if (props.ref.current) {
                dispatch(setSelectElement, null)
            }
        } 
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        };
    });

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
                props.setViewEditor({view: true, state: 'Figure Properties'})
                dispatch(setSelectElement, props.element)
            }}
        />
    )
}