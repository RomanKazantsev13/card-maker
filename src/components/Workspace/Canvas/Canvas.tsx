/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import styles from './Canvas.module.css'
import { Ellipse } from './Ellipse/Ellipse'
import { Image } from './Image/Image'
import { Rectangle } from './Rectangle/Rectangle'
import { Text } from './Text/Text'
import { Triangle } from './Triangle/Triangle'

interface CanvasType {
    size: {
        width: number,
        height: number
    },
    background: string
}

// при большем размере -> скрол

export function Canvas() {
    return (
        <div style={{ width: 800, height: 600, background: '#FFF', zoom: 0.8, overflow: 'hidden'}} >
            <svg style={{width: 800, height: 600}}>
                <Rectangle centre={{ x: 100, y: 200 }} size={{ width: 200, height: 200 }} color={'green'} />
                <Rectangle centre={{ x: 250, y: 500 }} size={{ width: 200, height: 200 }} color={'yellow'} />
                <Image url={'images/text.png'} centre={{x: 20, y: 40}} size={{width: 50, height: 50}} />
                <Ellipse centre={{x: 300, y: 400}} radius={{rx: 50, ry: 70}} color={'blue'} />
                <Triangle points={{first: {x: 100, y: 100}, second: {x: 100, y: 150}, third: {x: 150, y: 150}}} color={'red'} />
                <Text stroka={'example'} center={{x: 400, y: 400}} fontFamily={'Comic Sans MS'} fontSize={15} color={'black'} />
            </svg>
        </div>
    )
}