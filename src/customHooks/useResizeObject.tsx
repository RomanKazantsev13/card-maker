import { RefObject, useEffect, useState } from "react"
import { pointsSelectElement } from "../components/Workspace/Canvas/Elements/Elements"
import { getCentreAndSizeOfElement } from "../components/Workspace/Canvas/SelectElement/SelectElementFunction"
import { dispatch } from "../editor"
import { Element, setCentre, setSelectElement } from "../model/Canvas/Element/element"
import { isFigure } from "../model/Canvas/Element/Figure/figure"
import { isImage } from "../model/Canvas/Element/Image/image"
import { isText } from "../model/Canvas/Element/Text/text"

export function useResizeObject(
  elementRef: RefObject<HTMLDivElement | null>,
  position: { x: number; y: number },
  setPosition: (position: { x: number; y: number }) => void,
  setPositionSelectElement: (points: pointsSelectElement) => void,
  setSize: (size: {width: number, height: number}) => void,
) {
  const [isMoving, setIsMoving] = useState(false)
  let startPos: { x: number; y: number } = position
  let newPos: { x: number; y: number } = position

  useEffect(() => {
    {!isMoving && setPosition(position)}
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
    // setPositionSelectElement(newPos)
  }

  const MouseUpListener = () => {
    if (newPos !== position) {
      dispatch(setCentre, newPos)
    }
    document.removeEventListener("mousemove", MouseMoveListener)
    document.removeEventListener("mouseup", MouseUpListener)
    setIsMoving(false)
  }
}