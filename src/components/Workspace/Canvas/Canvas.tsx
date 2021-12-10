import React, { MutableRefObject, useRef } from 'react'
import styles from './Canvas.module.css'
import { Canvas as CanvasType } from './../../../model/Canvas/canvas'
import { SelectElement } from './SelectElement/SelectElement'

import { Triangle as TriangleType, isTriangle} from '../../../model/Canvas/Element/Figure/Triangle/triangle'
import { Rectangle as RectangleType, isRectangle } from '../../../model/Canvas/Element/Figure/Rectangle/rectangle'
import { Ellipse as EllipseType, isEllipse } from '../../../model/Canvas/Element/Figure/Ellipse/ellipse'
import { Image as ImageType, isImage } from '../../../model/Canvas/Element/Image/image'
import { Text as TextType, isText } from '../../../model/Canvas/Element/Text/text'
import { Figure as FigureType, isFigure } from '../../../model/Canvas/Element/Figure/figure'
import { Triangle } from './Triangle'
import { Rectangle } from './Rectangle'
import { Ellipse } from './Ellipse'
import { Image } from './Image'
import { Text } from './Text'

interface CanvasPropsType {
    canvas: CanvasType,
    setViewEditor: (viewEditor: {view: boolean, state: string}) => void,
    refEditor: any
}

export function Canvas(props: CanvasPropsType) {
    function getArrayJSXElements(canvas: CanvasType): Array<JSX.Element> {
        let elements: Array<JSX.Element> = []
        for (let i = 0; i < canvas.elements.length; i++) {
            const object = canvas.elements[i].object
            if (isFigure(object)) {
                const figure: FigureType = object
                if (isTriangle(figure.figure)) {
                    const triangle: TriangleType = figure.figure
                    elements.push(
                        <Triangle
                            points={{
                                first: { x: triangle.firstPoint.x, y: triangle.firstPoint.y },
                                second: { x: triangle.secondPoint.x, y: triangle.secondPoint.y },
                                third: { x: triangle.thirdPoint.x, y: triangle.thirdPoint.y }
                            }}
                            color={figure.color}
                            element={canvas.elements[i]}
                            setViewEditor={props.setViewEditor}
                            refEditor={props.refEditor}
                        />
                    )
                }
                if (isRectangle(figure.figure)) {
                    const rectangle: RectangleType = figure.figure
                    elements.push(
                        <Rectangle
                            centre={{ x: canvas.elements[i].centre.x, y: canvas.elements[i].centre.y }}
                            size={{ width: rectangle.size.width, height: rectangle.size.height }}
                            color={figure.color}
                            element={canvas.elements[i]}
                            setViewEditor={props.setViewEditor}
                        />
                    )
                }
                if (isEllipse(figure.figure)) {
                    const ellipse: EllipseType = figure.figure
                    elements.push(
                        <Ellipse
                            centre={{ x: canvas.elements[i].centre.x, y: canvas.elements[i].centre.y }}
                            radius={{ rx: ellipse.rx, ry: ellipse.ry }}
                            color={figure.color}
                            element={canvas.elements[i]}
                            setViewEditor={props.setViewEditor}
                        />
                    )
                }
            } else if (isImage(object)) {
                const image: ImageType = object
                elements.push(
                    <Image
                        url={image.url}
                        centre={{ x: canvas.elements[i].centre.x, y: canvas.elements[i].centre.y }}
                        size={{ width: image.size.width, height: image.size.width }}
                        element={canvas.elements[i]}
                    />
                )
            } else if (isText(object)) {
                const text: TextType = object
                elements.push(
                    <Text
                        stroka={text.str}
                        center={{ x: canvas.elements[i].centre.x, y: canvas.elements[i].centre.y }}
                        fontFamily={text.font}
                        fontSize={text.sizeText}
                        color={text.color}
                        element={canvas.elements[i]}
                        setViewEditor={props.setViewEditor}
                    />
                )
            }
        }
        return elements
    }

    const elements: Array<JSX.Element> = getArrayJSXElements(props.canvas)
    return (
        <div style={{
            width: props.canvas.size.width,
            height: props.canvas.size.height,
            background: props.canvas.background,
            zoom: 0.8
        }}
            className={styles.canvas}
        >
            <svg style={{ width: props.canvas.size.width, height: props.canvas.size.height }}>
                {elements}
                <SelectElement
                    selectElement={props.canvas.selectElement}
                    setViewEditor={props.setViewEditor}
                />
            </svg>
        </div>
    )
}