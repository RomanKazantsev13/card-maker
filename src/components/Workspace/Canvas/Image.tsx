import React from 'react'
import { Element, setSelectElement } from '../../../model/Canvas/Element/element'

import { dispatch } from '../../../editor'

interface ImagePropsType {
    centre: { x: number, y: number },
    size: { width: number, height: number },
    url: string,
    element: Element,
    setPosition: (position: {x: number, y: number}) => void,
}

export function Image(props: ImagePropsType) {
    return (
        <image
            href={props.url}
            x={props.centre.x}
            y={props.centre.y}
            width={props.size.width}
            height={props.size.height}
            onClick={() => {
                props.setPosition(props.centre)
                dispatch(setSelectElement, props.element)
            }}
        />
    )
}