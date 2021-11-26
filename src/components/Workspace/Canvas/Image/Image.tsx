import React from 'react'

export function Image(props: {
    centre: { x: number, y: number },
    size: { width: number, height: number },
    url: string,
}) {
    return( 
        <image 
            href={props.url} 
            x={props.centre.x} 
            y={props.centre.y} 
            width={props.size.width} 
            height={props.size.height}
            onClick={() => {}}
        />
)}