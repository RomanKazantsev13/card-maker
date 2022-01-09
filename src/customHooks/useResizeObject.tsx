import { RefObject, useEffect, useState } from "react"
import { pointsSelectElement } from "../components/Workspace/Canvas/Elements/Elements"
import { getCentreAndSizeOfElement } from "../components/Workspace/Canvas/SelectElement/SelectElementFunction"
import { dispatch } from "../editor"
import { Element, setCentre, setSelectElement } from "../model/Canvas/Element/element"
import { isEllipse, resizeEllipse } from "../model/Canvas/Element/Figure/Ellipse/ellipse"
import { isFigure } from "../model/Canvas/Element/Figure/figure"
import { isRectangle, resizeRectangle } from "../model/Canvas/Element/Figure/Rectangle/rectangle"
import { isTriangle, resizeTriangle } from "../model/Canvas/Element/Figure/Triangle/triangle"
import { isImage, resizeImage } from "../model/Canvas/Element/Image/image"
import { isText } from "../model/Canvas/Element/Text/text"

export function useResizeObject(
  element: Element,
  selectElement: Element | null,
  elementRef: RefObject<HTMLDivElement | null>,
  type: string,
  initSize: {width: number, height: number},
  position: { x: number; y: number },
  setPosition: (position: { x: number; y: number }) => void,
  setPositionSelectElement: (points: pointsSelectElement) => void,
  stateSizeSelectElement: {
      size: {width: number, height: number},
      setSize: (size: {width: number, height: number}) => void,
  },
  setSize: (size: {width: number, height: number}) => void,
  isMoving: boolean,
  setIsMoving: (isMoving: boolean) => void,
) {
  let startPos: { x: number; y: number } = position
  let newPos: { x: number; y: number } = position
  let newSize = stateSizeSelectElement.size

  function MoveTopLeftPoint(delta: {x: number, y: number}) {
    newPos = {
      x: position.x + delta.x,
      y: position.y + delta.y,
    }
    newSize = {
      width: stateSizeSelectElement.size.width - delta.x,
      height: stateSizeSelectElement.size.height - delta.y
    }
    if (newSize.width < 1) {
      newSize.width = 1 
    }  
    if (newSize.height < 1) {
      newSize.height = 1 
    } 
    if ((newPos.y < position.y + stateSizeSelectElement.size.height && newPos.x < position.x + stateSizeSelectElement.size.width)) {
      setPosition(newPos)
      setPositionSelectElement({ border: newPos, pointTopLeft: newPos, pointTopRight: newPos, pointBottomLeft: newPos, pointBottomRight: newPos, blockTop: newPos, blockLeft: newPos, blockRight: newPos, blockBottom: newPos })
    } else if (newSize.width == 1 && newSize.height == 1) {
      //
    } else if (newSize.width == 1) {
      newPos = {
        x: position.x + stateSizeSelectElement.size.width,
        y: newPos.y
      }
      setPosition(newPos)
      setPositionSelectElement({ border: newPos, pointTopLeft: newPos, pointTopRight: newPos, pointBottomLeft: newPos, pointBottomRight: newPos, blockTop: newPos, blockLeft: newPos, blockRight: newPos, blockBottom: newPos })
    } else if (newSize.height == 1) {
      newPos = {
        x: newPos.x,
        y: position.y + stateSizeSelectElement.size.height
      }
      setPosition(newPos)
      setPositionSelectElement({ border: newPos, pointTopLeft: newPos, pointTopRight: newPos, pointBottomLeft: newPos, pointBottomRight: newPos, blockTop: newPos, blockLeft: newPos, blockRight: newPos, blockBottom: newPos })
    }
    stateSizeSelectElement.setSize(newSize)
    setSize(newSize)
  }

  function MoveBottomLeftPoint(delta: {x: number, y: number}) {
    newPos = {
      x: position.x + delta.x,
      y: position.y + delta.y,
    }
    newSize = {
      width: stateSizeSelectElement.size.width - delta.x,
      height: stateSizeSelectElement.size.height + delta.y
    }
    if (newSize.width < 1) {
      newSize.width = 1 
    }  
    if (newSize.height < 1) {
      newSize.height = 1 
    } 
    if ((newPos.y > position.y && newPos.x < position.x + stateSizeSelectElement.size.width)) {
      newPos = {
        x: newPos.x,
        y: position.y
      }
      setPosition(newPos)
      setPositionSelectElement({ border: newPos, pointTopLeft: newPos, pointTopRight: newPos, pointBottomLeft: newPos, pointBottomRight: newPos, blockTop: newPos, blockLeft: newPos, blockRight: newPos, blockBottom: newPos })
    } else if (newSize.width == 1 && newSize.height == 1) {
      //
    } else if (newSize.width == 1) {
      newPos = {
        x: position.x + stateSizeSelectElement.size.width,
        y: position.y
      }
      setPosition(newPos)
      setPositionSelectElement({ border: newPos, pointTopLeft: newPos, pointTopRight: newPos, pointBottomLeft: newPos, pointBottomRight: newPos, blockTop: newPos, blockLeft: newPos, blockRight: newPos, blockBottom: newPos })
    } else if (newSize.height == 1) {
      newPos = {
        x: newPos.x,
        y: position.y
      }
      setPosition(newPos)
      setPositionSelectElement({ border: newPos, pointTopLeft: newPos, pointTopRight: newPos, pointBottomLeft: newPos, pointBottomRight: newPos, blockTop: newPos, blockLeft: newPos, blockRight: newPos, blockBottom: newPos })
    }
    stateSizeSelectElement.setSize(newSize)
    setSize(newSize)
  }

  function MoveTopRightPoint(delta: {x: number, y: number}) {
    newPos = {
      x: position.x + delta.x,
      y: position.y + delta.y,
    }
    newSize = {
      width: stateSizeSelectElement.size.width + delta.x,
      height: stateSizeSelectElement.size.height - delta.y
    }
    if (newSize.width < 1) {
      newSize.width = 1 
    }  
    if (newSize.height < 1) {
      newSize.height = 1 
    } 
    if ((newPos.y < position.y + stateSizeSelectElement.size.height && newPos.x > position.x)) {
      newPos = {
        x: position.x,
        y: newPos.y
      }
      setPosition(newPos)
      setPositionSelectElement({ border: newPos, pointTopLeft: newPos, pointTopRight: newPos, pointBottomLeft: newPos, pointBottomRight: newPos, blockTop: newPos, blockLeft: newPos, blockRight: newPos, blockBottom: newPos })
    } else if (newSize.width == 1 && newSize.height == 1) {
      //
    } else if (newSize.width == 1) {
      newPos = {
        x: position.x,
        y: newPos.y
      }
      setPosition(newPos)
      setPositionSelectElement({ border: newPos, pointTopLeft: newPos, pointTopRight: newPos, pointBottomLeft: newPos, pointBottomRight: newPos, blockTop: newPos, blockLeft: newPos, blockRight: newPos, blockBottom: newPos })
    } else if (newSize.height == 1) {
      newPos = {
        x: position.x,
        y: position.y + stateSizeSelectElement.size.height
      }
      setPosition(newPos)
      setPositionSelectElement({ border: newPos, pointTopLeft: newPos, pointTopRight: newPos, pointBottomLeft: newPos, pointBottomRight: newPos, blockTop: newPos, blockLeft: newPos, blockRight: newPos, blockBottom: newPos })
    }
    stateSizeSelectElement.setSize(newSize)
    setSize(newSize)
  }

  function MoveBottomRightPoint(delta: {x: number, y: number}) {
    newSize = {
      width: stateSizeSelectElement.size.width + delta.x,
      height: stateSizeSelectElement.size.height + delta.y
    }
    if (newSize.width < 1) {
      newSize.width = 1 
    }  
    if (newSize.height < 1) {
      newSize.height = 1 
    } 
    stateSizeSelectElement.setSize(newSize)
    setSize(newSize)
  }

  function MoveTopBlock(delta: {x: number, y: number}) {
    newPos = {
      x: position.x,
      y: position.y + delta.y,
    }
    newSize = {
      width: stateSizeSelectElement.size.width,
      height: stateSizeSelectElement.size.height - delta.y
    }
    if (newSize.height < 1) {
      newSize.height = 1 
    } 
    if ((newPos.y < position.y + stateSizeSelectElement.size.height)) {
      setPosition(newPos)
      setPositionSelectElement({ border: newPos, pointTopLeft: newPos, pointTopRight: newPos, pointBottomLeft: newPos, pointBottomRight: newPos, blockTop: newPos, blockLeft: newPos, blockRight: newPos, blockBottom: newPos })
    } else if (newSize.width == 1 && newSize.height == 1) {
      //
    } else if (newSize.height == 1) {
      newPos = {
        x: newPos.x,
        y: position.y + stateSizeSelectElement.size.height
      }
      setPosition(newPos)
      setPositionSelectElement({ border: newPos, pointTopLeft: newPos, pointTopRight: newPos, pointBottomLeft: newPos, pointBottomRight: newPos, blockTop: newPos, blockLeft: newPos, blockRight: newPos, blockBottom: newPos })
    }
    stateSizeSelectElement.setSize(newSize)
    setSize(newSize)
  }

  function MoveRightBlock(delta: {x: number, y: number}) {
    newSize = {
      width: stateSizeSelectElement.size.width + delta.x,
      height: stateSizeSelectElement.size.height
    }
    if (newSize.width < 1) {
      newSize.width = 1 
    }  
    stateSizeSelectElement.setSize(newSize)
    setSize(newSize)
  }

  function MoveLeftBlock(delta: {x: number, y: number}) {
    newPos = {
      x: position.x + delta.x,
      y: position.y,
    }
    newSize = {
      width: stateSizeSelectElement.size.width - delta.x,
      height: stateSizeSelectElement.size.height
    }
    if (newSize.width < 1) {
      newSize.width = 1 
    }  
    if ((newPos.x < position.x + stateSizeSelectElement.size.width)) {
      setPosition(newPos)
      setPositionSelectElement({ border: newPos, pointTopLeft: newPos, pointTopRight: newPos, pointBottomLeft: newPos, pointBottomRight: newPos, blockTop: newPos, blockLeft: newPos, blockRight: newPos, blockBottom: newPos })
    } else if (newSize.width == 1 && newSize.height == 1) {
      //
    } else if (newSize.width == 1) {
      newPos = {
        x: position.x + stateSizeSelectElement.size.width,
        y: position.y
      }
      setPosition(newPos)
      setPositionSelectElement({ border: newPos, pointTopLeft: newPos, pointTopRight: newPos, pointBottomLeft: newPos, pointBottomRight: newPos, blockTop: newPos, blockLeft: newPos, blockRight: newPos, blockBottom: newPos })
    }
    stateSizeSelectElement.setSize(newSize)
    setSize(newSize)
  }

  function MoveBottomBlock(delta: {x: number, y: number}) {
    newSize = {
      width: stateSizeSelectElement.size.width,
      height: stateSizeSelectElement.size.height + delta.y
    }
    if (newSize.height < 1) {
      newSize.height = 1 
    } 
    stateSizeSelectElement.setSize(newSize)
    setSize(newSize)
  }

  useEffect(() => {
    {!isMoving && setSize(initSize)}
    if (elementRef.current !== null && element == selectElement) {
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
  }

  const MouseMoveListener = (e: any) => {
    setIsMoving(true)
    const delta = {
      x: e.pageX - startPos.x,
      y: e.pageY - startPos.y,
    } 
    if (type == 'TopLeft') {
      MoveTopLeftPoint(delta)
    }
    if (type == 'TopRight') {
      MoveTopRightPoint(delta)
    }
    if (type == 'BottomLeft') {
      MoveBottomLeftPoint(delta)
    }
    if (type == 'BottomRight') {
      MoveBottomRightPoint(delta)
    }
    if (type == 'Top') {
      MoveTopBlock(delta)
    }
    if (type == 'Left') {
      MoveLeftBlock(delta)
    }
    if (type == 'Right') {
      MoveRightBlock(delta)
    }
    if (type == 'Bottom') {
      MoveBottomBlock(delta)
    }
    document.addEventListener("mouseup", MouseUpListener)
  }

  const MouseUpListener = () => {
    console.log(isMoving)
    if (!isMoving) {
      if (isFigure(element.object)) {
        if (isRectangle(element.object.figure)) {
          dispatch(resizeRectangle, {newSize: newSize, newCentre: newPos})
        }
        if (isTriangle(element.object.figure)) {
          dispatch(resizeTriangle, {points: {
            firstPoint: {x: newPos.x, y: newPos.y + newSize.height}, 
            secondPoint: {x: newPos.x + newSize.width / 2, y: newPos.y }, 
            thirdPoint: {x: newPos.x + newSize.width , y: newPos.y + newSize.height}
          }, centre: newPos})
        }
        if (isEllipse(element.object.figure)) {
          dispatch(resizeEllipse, {newSize: newSize, newCentre: newPos})
        }
      }
      if (isImage(element.object)) {
        dispatch(resizeImage, {newSize: newSize, newCentre: newPos})
      }
    }
    setIsMoving(false)
    document.removeEventListener("mousemove", MouseMoveListener)
    document.removeEventListener("mouseup", MouseUpListener)
  }
}