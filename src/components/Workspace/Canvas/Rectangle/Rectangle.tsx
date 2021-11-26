import React, { createRef, useRef, useState } from 'react'
import useDragAndDrop from '../../../../customHooks/useDragAndDrop'

export function Rectangle(props: {
    centre: { x: number, y: number },
    size: { width: number, height: number },
    color: string,
}) {
    const ref: React.RefObject<SVGElement> = useRef(null)
    const [position, setPosition] = useState(props.centre)
    //const [pos, setPos] = useDragAndDrop({ref, setPosition})

    return (
        <rect
            x={props.centre.x}
            y={props.centre.y}
            width={props.size.width}
            height={props.size.height}
            fill={props.color}
            onClick={() => {}}
        />
    )
}