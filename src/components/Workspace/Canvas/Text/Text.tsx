import React from 'react'

export function Text(props: {
    stroka: string,
    center: {x: number, y: number},
    fontFamily: string,
    fontSize: number,
    color: string
}) {
    return( 
        <text 
            x={props.center.x} 
            y={props.center.y} 
            style={{fontFamily: props.fontFamily, fontSize: props.fontSize, fill: props.color}}
            onClick={() => {alert("click text " + props.stroka)}}
        >
            {props.stroka}
        </text>
)}