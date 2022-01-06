import { MutableRefObject, RefObject } from 'react'
import { Element } from '../../../../model/Canvas/Element/element'
import { Ellipse, isEllipse } from '../../../../model/Canvas/Element/Figure/Ellipse/ellipse'
import { Figure, isFigure } from '../../../../model/Canvas/Element/Figure/figure'
import { isRectangle, Rectangle } from '../../../../model/Canvas/Element/Figure/Rectangle/rectangle'
import { isTriangle, Triangle } from '../../../../model/Canvas/Element/Figure/Triangle/triangle'
import { Image, isImage } from '../../../../model/Canvas/Element/Image/image'
import { isText, Text } from '../../../../model/Canvas/Element/Text/text'
import { Point, Size } from '../../../../model/Card/card'

export function getCentreAndSizeOfElement(
    selectElement: Element | null, 
    refText: RefObject<SVGRectElement | SVGEllipseElement | SVGPolygonElement | SVGTextElement | SVGImageElement | null> | null
    ) {
    let size: Size = { width: 0, height: 0 }
    let centre: Point = { x: 30, y: 350 }
    let type: string = ''
    if (selectElement !== null && isFigure(selectElement.object)) {
        const figure: Figure = selectElement.object
        type = 'Figure'
        if (isTriangle(figure.figure)) {
            const triangle: Triangle = figure.figure
            size = {
                width: triangle.thirdPoint.x - triangle.firstPoint.x,
                height: triangle.firstPoint.y - triangle.secondPoint.y
            }
            centre = {
                x: triangle.firstPoint.x,
                y: triangle.secondPoint.y
            }
        }
        if (isRectangle(figure.figure)) {
            const rectangle: Rectangle = figure.figure
            size = {
                width: rectangle.size.width,
                height: rectangle.size.height
            }
            centre = {
                x: selectElement.centre.x,
                y: selectElement.centre.y
            }
        }
        if (isEllipse(figure.figure)) {
            const ellipse: Ellipse = figure.figure
            size = {
                width: 2 * ellipse.rx,
                height: 2 * ellipse.ry
            }
            centre = {
                x: selectElement.centre.x - ellipse.rx,
                y: selectElement.centre.y - ellipse.ry
            }
        }
    } else if (selectElement !== null && isImage(selectElement.object)) {
        const image: Image = selectElement.object
        size = {
            width: image.size.width,
            height: image.size.height
        }
        centre = {
            x: selectElement.centre.x,
            y: selectElement.centre.y
        }
    } else if (selectElement !== null && isText(selectElement.object)) {
        type = 'Text'
        const element: SVGRectElement | SVGEllipseElement | SVGPolygonElement | SVGTextElement | SVGImageElement | null = (() => {
            return refText !== null ? refText.current : null
        })()
        if (element !== null) {
            centre.x = selectElement.centre.x
            centre.y = selectElement.centre.y
            size.width = element.getBoundingClientRect().width
            size.height = element.getBoundingClientRect().height
        }
    }
    return {
        centre: centre,
        size: size,
        type: type
    }
}