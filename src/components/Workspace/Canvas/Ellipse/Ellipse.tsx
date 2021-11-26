import React from 'react'

export function Ellipse(props: {
    centre: {x: number, y: number},
    radius: {rx: number, ry: number}
    color: string
}) {
    return (
        <ellipse 
            cx={props.centre.x} 
            cy={props.centre.y} 
            rx={props.radius.rx} 
            ry={props.radius.ry} 
            fill={props.color}
            onClick={() => {}}
        />
    )
}