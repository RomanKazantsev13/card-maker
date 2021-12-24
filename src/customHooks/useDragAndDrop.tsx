import { useEffect } from "react"
import { dispatch } from "../editor"
import { setCentre } from "../model/Canvas/Element/element"

export function useDragAndDrop(
  elementRef: any,
  position: { x: number; y: number },
  setPosition: (position: { x: number; y: number }) => void,
) {
  let startPos: { x: number; y: number } = position
  let newPos: { x: number; y: number }

  useEffect(() => {
    if (elementRef.current !== null) {
      elementRef.current.addEventListener("mousedown", MouseDownListener)
    }
    return () => {
      if (elementRef.current !== null) {
        elementRef.current.removeEventListener("mousedown", MouseDownListener)
      }
    }
  })

  const MouseDownListener = (e: MouseEvent) => {
    startPos = {
      x: e.pageX,
      y: e.pageY,
    }

    document.addEventListener("mousemove", MouseMoveListener)
    document.addEventListener("mouseup", MouseUpListener)
  }

  const MouseMoveListener = (e: MouseEvent) => {
    const delta = {
      x: e.pageX - startPos.x,
      y: e.pageY - startPos.y,
    }
    newPos = {
      x: position.x + delta.x,
      y: position.y + delta.y,
    }
    setPosition(newPos)
  }

  const MouseUpListener = () => {
    dispatch(setCentre, newPos)
    document.removeEventListener("mousemove", MouseMoveListener)
    document.removeEventListener("mouseup", MouseUpListener)
  }
}