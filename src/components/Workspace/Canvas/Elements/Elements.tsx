import React, { MutableRefObject, RefObject } from 'react'
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

export interface pointsSelectElement {
    border: {x: number, y: number},
    pointTopLeft: {x: number, y: number},
    pointTopRight: {x: number, y: number},
    pointBottomLeft: {x: number, y: number},
    pointBottomRight: {x: number, y: number},
    blockTop: {x: number, y: number},
    blockLeft: {x: number, y: number},
    blockRight: {x: number, y: number},
    blockBottom: {x: number, y: number}
}

interface CanvasPropsType {
    canvas: CanvasType,
    stateViewEditor: {
        viewEditor: { view: boolean, state: string }
        setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    }
    refEditor: MutableRefObject<HTMLDivElement | null>,
    refInputText: MutableRefObject<HTMLInputElement | null>,
    statePointsSelectElement: {
        positionPoints: pointsSelectElement,
        setPositionPoints: (points: pointsSelectElement) => void,
    }
    stateViewInput: {
        viewInput: boolean,
        setViewInput: (view: boolean) => void,
    },
    setInputValue: (value: string) => void,
    stateSizeSelectElement: {
        size: {width: number, height: number},
        setSize: (size: {width: number, height: number}) => void,
    }
    setRefText: (refText: MutableRefObject<SVGTextElement | null>) => void,
    refs: Array<RefObject<HTMLDivElement>>,
}

export const pointNames: Array<string> = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight', 'Top', 'Left', 'Right', 'Bottom']

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
                    selectElement={props.canvas.selectElement}
                    viewEditor={props.stateViewEditor.viewEditor}
                    setViewEditor={props.stateViewEditor.setViewEditor}
                    refEditor={props.refEditor}
                    refInputText={props.refInputText}
                    stateSizeSelectElement={props.stateSizeSelectElement}
                    statePointsSelectElement={props.statePointsSelectElement}
                    setSize={props.stateSizeSelectElement.setSize}
                    refs={props.refs}
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
                    refEditor={props.refEditor}
                    refInputText={props.refInputText}
                    viewEditor={props.stateViewEditor.viewEditor}
                    setViewEditor={props.stateViewEditor.setViewEditor}
                    statePointsSelectElement={props.statePointsSelectElement}
                    stateSizeSelectElement={props.stateSizeSelectElement}
                    refs={props.refs}
                />
            }
            if (isEllipse(figure.figure)) {
                const ellipse: EllipseType = figure.figure
                return <Ellipse
                    key={element.id}
                    radius={{ rx: ellipse.rx, ry: ellipse.ry }}
                    color={figure.color}
                    element={element}
                    selectElement={props.canvas.selectElement}
                    refEditor={props.refEditor}
                    refInputText={props.refInputText}
                    viewEditor={props.stateViewEditor.viewEditor}
                    setViewEditor={props.stateViewEditor.setViewEditor}
                    statePointsSelectElement={props.statePointsSelectElement}
                    setSize={props.stateSizeSelectElement.setSize}
                    stateSizeSelectElement={props.stateSizeSelectElement}
                    refs={props.refs}
                />
            }
        } else if (isImage(object)) {
            const image: ImageType = object
            return <Image
                key={element.id}
                url={image.url}
                size={image.size}
                element={element}
                selectElement={props.canvas.selectElement}
                refEditor={props.refEditor}
                refInputText={props.refInputText}
                viewEditor={props.stateViewEditor.viewEditor}
                statePointsSelectElement={props.statePointsSelectElement}
                setSize={props.stateSizeSelectElement.setSize}
                stateSizeSelectElement={props.stateSizeSelectElement}
                setViewEditor={props.stateViewEditor.setViewEditor}
                refs={props.refs}
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
                selectElement={props.canvas.selectElement}
                refEditor={props.refEditor}
                refInputText={props.refInputText}
                setRefText={props.setRefText}
                viewEditor={props.stateViewEditor.viewEditor}
                setViewEditor={props.stateViewEditor.setViewEditor}
                statePointsSelectElement={props.statePointsSelectElement}
                setInputValue={props.setInputValue}
                stateViewInput={props.stateViewInput}
                setSize={props.stateSizeSelectElement.setSize}
            />
        }
    })
    return <>
        {elements}
    </>
}