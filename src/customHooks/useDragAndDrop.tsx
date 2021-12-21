import { RefObject, useEffect, useState } from "react"

export function useDragAndDrop(
  elementRef: any,
  position: { x: number; y: number },
  setPosition: (position: { x: number; y: number }) => void,
) {
  let startPos: { x: number; y: number } = { x: 0, y: 0 }

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
    console.log('mousedown')
    startPos = {
      x: e.pageX,
      y: e.pageY,
    }

    document.addEventListener("mousemove", MouseMoveListener)
    document.addEventListener("mouseup", MouseUpListener)
  }

  const MouseMoveListener = (e: MouseEvent) => {
    console.log("mousemove")
    const delta = {
      x: e.pageX - startPos.x,
      y: e.pageY - startPos.y,
    }
    const newPos = {
      x: position.x + delta.x,
      y: position.y + delta.y,
    }
    setPosition(newPos)
  }

  const MouseUpListener = () => {
    console.log("mouseup")
    document.removeEventListener("mousemove", MouseMoveListener)
    document.removeEventListener("mouseup", MouseUpListener)
  }
}