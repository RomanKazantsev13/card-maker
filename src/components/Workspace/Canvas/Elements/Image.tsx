import React, { MutableRefObject, RefObject, useRef, useState } from 'react'
import { Element, setSelectElement } from '../../../../model/Canvas/Element/element'

import { dispatch } from '../../../../editor'
import { useDragAndDrop } from '../../../../customHooks/useDragAndDrop'
import { getCentreAndSizeOfElement } from '../SelectElement/SelectElementFunction'
import useObjectVisible from '../../../../customHooks/useObjectVisibtle'
import { pointsSelectElement } from './Elements'

interface ImagePropsType {
    size: { width: number, height: number },
    url: string,
    element: Element,
    selectElement: Element | null,
    refEditor: RefObject<HTMLDivElement | null>,
    refInputText: MutableRefObject<HTMLInputElement | null>,
    viewEditor: { view: boolean, state: string },
    statePointsSelectElement: {
        positionPoints: pointsSelectElement,
        setPositionPoints: (points: pointsSelectElement) => void,
    }
    setSize: (size: {width: number, height: number}) => void,
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
}

export function Image(props: ImagePropsType) {
    const [position, setPosition] = useState(props.element.centre)
    const ref: RefObject<SVGImageElement> = useRef(null)
    useDragAndDrop(props.element, ref, props.element.centre, setPosition, props.statePointsSelectElement.setPositionPoints, props.setViewEditor, props.setSize)
    useObjectVisible(ref, props.element, props.selectElement, props.refEditor, props.refInputText, props.viewEditor, props.setViewEditor, false)
    return (
        <image
            ref={ref}
            crossOrigin={'anonymous'}
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