import { RefObject, useEffect } from "react"
import { pointsSelectElement } from "../components/Workspace/Canvas/Elements/Elements"
import { getCentreAndSizeOfElement } from "../components/Workspace/Canvas/SelectElement/SelectElementFunction"
import { setCentreElement, setSelectElement } from "../store/actionCreators/ElementsActionCreators"
import { store } from "../store/store"
import { isFigure, isImage, isText } from "../utils/typeGuards"
import { Element } from "../utils/types"

export function useDragAndDrop(
  element: Element,
  elementRef: RefObject<SVGRectElement | SVGEllipseElement | SVGPolygonElement | SVGTextElement | SVGImageElement | null>,
  position: { x: number; y: number },
  setPosition: (position: { x: number; y: number }) => void,
  setPositionSelectElement: (points: pointsSelectElement) => void,
  setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
  setSize: (size: { width: number, height: number }) => void,
  isMoving: boolean,
  setIsMoving: (isMoving: boolean) => void,
) {
  let startPos: { x: number; y: number } = position
  let newPos: { x: number; y: number } = position

  useEffect(() => {
    if (!isMoving && position === newPos) {
      setPosition(position)
    }
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
      const textPosition = { x: position.x, y: position.y - element.object.fontSize }
      setPositionSelectElement({
        border: textPosition,
        pointTopLeft: textPosition,
        pointTopRight: textPosition,
        pointBottomLeft: textPosition,
        pointBottomRight: textPosition,
        blockTop: textPosition,
        blockLeft: textPosition,
        blockRight: textPosition,
        blockBottom: textPosition
      })
      setSize(getCentreAndSizeOfElement(element, elementRef).size)
      setViewEditor({ view: true, state: 'Text Properties' })
    } else {
      setPositionSelectElement({
        border: position,
        pointTopLeft: position,
        pointTopRight: position,
        pointBottomLeft: position,
        pointBottomRight: position,
        blockTop: position,
        blockLeft: position,
        blockRight: position,
        blockBottom: position
      })
      setSize(getCentreAndSizeOfElement(element, null).size)
      if (element !== null && isFigure(element.object)) {
        setViewEditor({ view: true, state: 'Figure Properties' })
      }
      if (element !== null && isImage(element.object)) {
        setViewEditor({ view: true, state: 'Image Manager' })
      }
    }
    store.dispatch(setSelectElement(element))
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
      const textPosition = { x: newPos.x, y: newPos.y - element.object.fontSize }
      setPositionSelectElement({
        border: textPosition,
        pointTopLeft: textPosition,
        pointTopRight: textPosition,
        pointBottomLeft: textPosition,
        pointBottomRight: textPosition,
        blockTop: textPosition,
        blockLeft: textPosition,
        blockRight: textPosition,
        blockBottom: textPosition
      })
    } else {
      setPositionSelectElement({
        border: newPos,
        pointTopLeft: newPos,
        pointTopRight: newPos,
        pointBottomLeft: newPos,
        pointBottomRight: newPos,
        blockTop: newPos,
        blockLeft: newPos,
        blockRight: newPos,
        blockBottom: newPos
      })
    }
  }

  const MouseUpListener = () => {
    if (newPos !== position) {
      store.dispatch(setCentreElement(newPos))
    }
    document.removeEventListener("mousemove", MouseMoveListener)
    document.removeEventListener("mouseup", MouseUpListener)
    setIsMoving(false)
  }
}