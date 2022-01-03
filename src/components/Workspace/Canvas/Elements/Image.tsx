import React, { RefObject, useRef, useState } from 'react'
import { Element, setSelectElement } from '../../../../model/Canvas/Element/element'

import { dispatch } from '../../../../editor'
import { useDragAndDrop } from '../../../../customHooks/useDragAndDrop'
import { getCentreAndSizeOfElement } from '../SelectElement/SelectElementFunction'

interface ImagePropsType {
    size: { width: number, height: number },
    url: string,
    element: Element,
    position: { x: number, y: number },
    setPosition: (position: {x: number, y: number}) => void,
    setSize: (size: {width: number, height: number}) => void,
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
}

export function Image(props: ImagePropsType) {
    const [position, setPosition] = useState(props.element.centre)
    const ref: RefObject<SVGImageElement> = useRef(null)
    useDragAndDrop(props.element, ref, props.element.centre, setPosition, props.setPosition, props.setViewEditor, props.setSize)
    return (
        <image
            ref={ref}
            href={props.url}
            x={position.x}
            y={position.y}
            width={props.size.width}
            height={props.size.height}
            onClick={() => {
            }}
        />
    )
}