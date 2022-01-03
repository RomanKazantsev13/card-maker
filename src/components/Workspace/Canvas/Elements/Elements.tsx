import React, { MutableRefObject } from 'react'
import { Canvas as CanvasType } from '../../../../model/Canvas/canvas'
import { Triangle as TriangleType, isTriangle } from '../../../../model/Canvas/Element/Figure/Triangle/triangle'
import { Rectangle as RectangleType, isRectangle } from '../../../../model/Canvas/Element/Figure/Rectangle/rectangle'
import { Ellipse as EllipseType, isEllipse } from '../../../../model/Canvas/Element/Figure/Ellipse/ellipse'
import { Image as ImageType, isImage } from '../../../../model/Canvas/Element/Image/image'
import { Text as TextType, isText } from '../../../../model/Canvas/Element/Text/text'
import { Figure as FigureType, isFigure } from '../../../../model/Canvas/Element/Figure/figure'
import { Triangle } from './Triangle'
import { Rectangle } from './Rectangle'
import { Ellipse } from './Ellipse'
import { Image } from './Image'
import { Text } from './Text'

interface CanvasPropsType {
    canvas: CanvasType,
    stateViewEditor: {
        viewEditor: { view: boolean, state: string }
        setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    }
    refEditor: MutableRefObject<HTMLDivElement | null>,
    setPositionSelectElement: (position: { x: number, y: number }) => void,
    positionSelectElement: { x: number, y: number },
    setInputValue: (value: string) => void,
    setViewInput: (view: boolean) => void,
    setSize: (size: {width: number, height: number}) => void,
}

export default function Elements(props: CanvasPropsType): JSX.Element {
    let elements: Array<JSX.Element | undefined> = props.canvas.elements.map(function (element) {
        const object = element.object
        if (isFigure(object)) {
            const figure: FigureType = object
            if (isTriangle(figure.figure)) {
                const triangle: TriangleType = figure.figure
                return <Triangle
                    key={element.id}
                    points={{
                        first: { x: triangle.firstPoint.x, y: triangle.firstPoint.y },
                        second: { x: triangle.secondPoint.x, y: triangle.secondPoint.y },
                        third: { x: triangle.thirdPoint.x, y: triangle.thirdPoint.y }
                    }}
                    color={figure.color}
                    element={element}
                    viewEditor={props.stateViewEditor.viewEditor}
                    setViewEditor={props.stateViewEditor.setViewEditor}
                    refEditor={props.refEditor}
                    position={props.positionSelectElement}
                    setPosition={props.setPositionSelectElement}
                    setSize={props.setSize}
                />
            }
            if (isRectangle(figure.figure)) {
                const rectangle: RectangleType = figure.figure
                return <Rectangle
                    key={element.id}
                    size={{ width: rectangle.size.width, height: rectangle.size.height }}
                    color={figure.color}
                    element={element}
                    selectElement={props.canvas.selectElement}
                    setViewEditor={props.stateViewEditor.setViewEditor}
                    position={props.positionSelectElement}
                    setPosition={props.setPositionSelectElement}
                    setSize={props.setSize}
                />
            }
            if (isEllipse(figure.figure)) {
                const ellipse: EllipseType = figure.figure
                return <Ellipse
                    key={element.id}
                    radius={{ rx: ellipse.rx, ry: ellipse.ry }}
                    color={figure.color}
                    element={element}
                    setViewEditor={props.stateViewEditor.setViewEditor}
                    position={props.positionSelectElement}
                    setPosition={props.setPositionSelectElement}
                    setSize={props.setSize}
                />
            }
        } else if (isImage(object)) {
            const image: ImageType = object
            return <Image
                key={element.id}
                url={image.url}
                size={{ width: image.size.width, height: image.size.width }}
                element={element}
                position={props.positionSelectElement}
                setPosition={props.setPositionSelectElement}
                setSize={props.setSize}
                setViewEditor={props.stateViewEditor.setViewEditor}
            />
        } else if (isText(object)) {
            const text: TextType = object
            return <Text
                key={element.id}
                string={text.str}
                fontFamily={text.font}
                fontSize={text.sizeText}
                color={text.color}
                element={element}
                setViewEditor={props.stateViewEditor.setViewEditor}
                position={props.positionSelectElement}
                setPosition={props.setPositionSelectElement}
                setInputValue={props.setInputValue}
                setViewInput={props.setViewInput}
                setSize={props.setSize}
            />
        }
    })
    return <>
        {elements}
    </>
}