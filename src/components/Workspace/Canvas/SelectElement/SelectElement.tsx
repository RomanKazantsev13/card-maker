import React from 'react'
import { Element } from '../../../../model/Canvas/Element/element'

export function SelectElement(props: {
    centre: { x: number, y: number },
    size: { width: number, height: number },
    selectElement: Element | null,
}) {
    return (
        <foreignObject 
            id="2" 
            x={props.centre.x - 20} 
            y={props.centre.y - 20} 
            width={props.size.width + 40} 
            height={props.size.height + 40} 
            style={(() => {
                if (props.selectElement !== null) {
                    return {display: 'block'}
                }
                return {display: 'none'}
            })()}
        >
            <div style={{ zIndex: 5, position: 'absolute', top: 10, left: 10, border: '1px dashed  #000', width: props.size.width + 20, height: props.size.height + 20 }}></div>

            <div style={{ position: 'absolute', top: 5, left: 5, borderRadius: '50%', background: '#000', width: 13, height: 13 }}></div>
            <div style={{ position: 'absolute', top: props.size.height + 20 + 3, left: 5, borderRadius: '50%', background: '#000', width: 13, height: 13 }}></div>
            <div style={{ position: 'absolute', top: props.size.height + 20 + 3, left: props.size.width + 20 + 3, borderRadius: '50%', background: '#000', width: 13, height: 13 }}></div>
            <div style={{ position: 'absolute', top: 5, left: props.size.width + 20 + 3, borderRadius: '50%', background: '#000', width: 13, height: 13 }}></div>

            <div style={{ position: 'absolute', top: 8, left: props.size.width / 2 + 20 + 3 - 10, background: '#000', width: 20, height: 6 }}></div>
            <div style={{ position: 'absolute', top: props.size.height / 2 + 20 + 3 - 10, left: props.size.width + 20 + 6, background: '#000', width: 6, height: 20 }}></div>
            <div style={{ position: 'absolute', top: props.size.height / 2 + 20 + 3 - 10, left: 8, background: '#000', width: 6, height: 20 }}></div>
            <div style={{ position: 'absolute', top: props.size.height + 20 + 6, left: props.size.width / 2 + 20 + 3 - 10, background: '#000', width: 20, height: 6 }}></div>
        </foreignObject>
    )
}
