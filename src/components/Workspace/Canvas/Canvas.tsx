/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'
import styles from './Canvas.module.css'

import { Canvas as CanvasType } from './../../../model/Canvas/canvas'
import { SelectElement } from './SelectElement/SelectElement'
import { Ellipse } from './Ellipse'
import { Image } from './Image'
import { Rectangle } from './Rectangle'
import { Text } from './Text'
import { Triangle } from './Triangle'
import { isTriangle, Triangle as TriangleType } from '../../../model/Canvas/Element/Figure/Triangle/triangle'
import { isRectangle, Rectangle as RectangleType } from '../../../model/Canvas/Element/Figure/Rectangle/rectangle'
import { Ellipse as EllipseType, isEllipse } from '../../../model/Canvas/Element/Figure/Ellipse/ellipse'
import { Image as ImageType, isImage } from '../../../model/Canvas/Element/Image/image'
import { isText, Text as TextType } from '../../../model/Canvas/Element/Text/text'
import { Figure, isFigure } from '../../../model/Canvas/Element/Figure/figure'

interface CanvasT {
    canvas: CanvasType
}

// при большем размере -> скрол



export function Canvas(props: CanvasT) {
    const [value, setValue] = useState({
        size: { width: 0, height: 0 },
        centre: { x: 0, y: 0 }
    })


    const elements = []
    for (let i = 0; i < props.canvas.elements.length; i++) {
        const object = props.canvas.elements[i].object
        if (isFigure(object)) {
            const figure: Figure = object
            if (isTriangle(figure)) {
                const triangle: any = figure.figure
                elements.push(
                    <Triangle
                        points={{
                            first: { x: triangle.firstPoint.x, y: triangle.firstPoint.y },
                            second: { x: triangle.secondPoint.x, y: triangle.secondPoint.y },
                            third: { x: triangle.thirdPoint.x, y: triangle.thirdPoint.y }
                        }}
                        color={'red'}
                        setValue={setValue}
                        element={props.canvas.elements[i]}
                    />
                )
            }
            if (isRectangle(figure)) {
                const rectangle: any = figure.figure
                elements.push(
                    <Rectangle
                        centre={{ x: props.canvas.elements[i].centre.x, y: props.canvas.elements[i].centre.y }}
                        size={{ width: rectangle.size.width, height: rectangle.size.height }}
                        color={figure.color}
                        setValue={setValue}
                        element={props.canvas.elements[i]}
                    />
                )
            }
            if (isEllipse(figure)) {
                const ellipse: any = figure.figure
                elements.push(
                    <Ellipse
                        centre={{ x: props.canvas.elements[i].centre.x, y: props.canvas.elements[i].centre.y }}
                        radius={{ rx: ellipse.rx, ry: ellipse.ry }}
                        color={figure.color}
                        setValue={setValue}
                        element={props.canvas.elements[i]}
                    />
                )
            }
        } else if (isImage(object)) {
            const image: ImageType = object
            elements.push(
                <Image
                    url={image.url}
                    centre={{ x: props.canvas.elements[i].centre.x, y: props.canvas.elements[i].centre.y }}
                    size={{ width: image.size.width, height: image.size.width }}
                    setValue={setValue}
                    element={props.canvas.elements[i]}
                />
            )
        } else if (isText(object)) {
            const text: TextType = object
            elements.push(
                <Text
                    stroka={text.str}
                    center={{ x: props.canvas.elements[i].centre.x, y: props.canvas.elements[i].centre.y }}
                    fontFamily={text.font}
                    fontSize={text.sizeText}
                    color={text.color}
                    setValue={setValue}
                    element={props.canvas.elements[i]}
                />
            )
        }
    }

    return (
        <div style={{ width: props.canvas.size.width, height: props.canvas.size.height, background: props.canvas.background, zoom: 0.8, overflow: 'hidden' }} >
            <svg style={{ width: props.canvas.size.width, height: props.canvas.size.height }}>
                {elements}
                <SelectElement
                    centre={{ x: value.centre.x, y: value.centre.y }}
                    size={{ width: value.size.width, height: value.size.height }}
                    selectElement={props.canvas.selectElement}
                />
            </svg>
        </div>
    )
}