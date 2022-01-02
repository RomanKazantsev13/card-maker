import { RefObject, useEffect, useState } from "react"
import { getCentreAndSizeOfElement } from "../components/Workspace/Canvas/SelectElement/SelectElementFunction"
import { dispatch } from "../editor"
import { Element, setCentre, setSelectElement } from "../model/Canvas/Element/element"
import { isFigure } from "../model/Canvas/Element/Figure/figure"
import { isImage } from "../model/Canvas/Element/Image/image"
import { isText } from "../model/Canvas/Element/Text/text"

export function useDragAndDrop(
  element: Element,
  elementRef: RefObject<SVGRectElement | SVGEllipseElement | SVGPolygonElement | SVGTextElement | SVGImageElement | null>,
  position: { x: number; y: number },
  setPosition: (position: { x: number; y: number }) => void,
  setPositionSelectElement: (position: { x: number; y: number }) => void,
  setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
  setSize: (size: { width: number, height: number }) => void,
) {
  const [isMoving, setIsMoving] = useState(false)
  let startPos: { x: number; y: number } = position
  let newPos: { x: number; y: number } = position

  useEffect(() => {
    { !isMoving && setPosition(position) }
    if (elementRef.current !== null) {
      elementRef.current.addEventListener("mousedown", MouseDownListener)
    }
    return () => {
      if (elementRef.current !== null) {
        elementRef.current.removeEventListener("mousedown", MouseDownListener)
      }
    }
  })

  const MouseDownListener = (e: any) => {

    if (element !== null && isText(element.object)) {
      setPositionSelectElement({ x: position.x, y: position.y - element.object.sizeText })
      setSize(getCentreAndSizeOfElement(element, elementRef).size)
      setViewEditor({ view: true, state: 'Text Properties' })
    } else {
      setPositionSelectElement(position)
      setSize(getCentreAndSizeOfElement(element, null).size)
      if (element !== null && isFigure(element.object)) {
        setViewEditor({ view: true, state: 'Figure Properties' })
      }
      if (element !== null && isImage(element.object)) {
        setViewEditor({ view: true, state: 'Image Manager' })
      }
    }
    dispatch(setSelectElement, element)
    startPos = {
      x: e.pageX,
      y: e.pageY,
    }
    document.addEventListener("mousemove", MouseMoveListener)
    document.addEventListener("mouseup", MouseUpListener)
  }

  const MouseMoveListener = (e: any) => {
    setIsMoving(true)
    const delta = {
      x: e.pageX - startPos.x,
      y: e.pageY - startPos.y,
    }
    newPos = {
      x: position.x + delta.x,
      y: position.y + delta.y,
    }
    setPosition(newPos)
    if (element !== null && isText(element.object)) {
      setPositionSelectElement({ x: newPos.x, y: newPos.y - element.object.sizeText })
    } else {
      setPositionSelectElement(newPos)
    }
  }

  const MouseUpListener = () => {
    console.log('--------')
    dispatch(setCentre, newPos)
    document.removeEventListener("mousemove", MouseMoveListener)
    document.removeEventListener("mouseup", MouseUpListener)
    setIsMoving(false)
  }
}