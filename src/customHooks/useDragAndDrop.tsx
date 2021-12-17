import { RefObject, useEffect, useState } from "react"

export function useDragAndDrop(
  elementRef: any,
  initPosition: { x: number; y: number },
) {
  const [position, setPosition] = useState(initPosition)
  let startPos: { x: number; y: number } = { x: 0, y: 0 }

  useEffect(() => {
    if (elementRef.current !== null) {
        elementRef.current.addEventListener("mousedown", mouseDownHandler)
    }
    return () => {
        if (elementRef.current !== null) {
            elementRef.current.removeEventListener("mousedown", mouseDownHandler)
        }
    }
  })

  const mouseDownHandler = (e: MouseEvent) => {
    console.log('mousedown')
    startPos = {
      x: e.pageX,
      y: e.pageY,
    }

    document.addEventListener("mousemove", mouseMoveHandler)
    document.addEventListener("mouseup", mouseUpHandler)
  }

  const mouseUpHandler = () => {
    console.log("mouseup")
    document.removeEventListener("mousemove", mouseMoveHandler)
    document.removeEventListener("mouseup", mouseUpHandler)
  }

  const mouseMoveHandler = (e: MouseEvent) => {
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

  return position
}