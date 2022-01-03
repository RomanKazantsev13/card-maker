import { useState, useEffect, useRef, RefObject, MutableRefObject } from 'react'
import { dispatch } from '../editor'
import { Element, setSelectElement } from '../model/Canvas/Element/element'



export default function useObjectVisible(
    ref: RefObject<SVGRectElement | SVGEllipseElement | SVGPolygonElement | SVGTextElement | SVGImageElement | null>,
    element: Element,
    selectElement: Element |null,
    refEditor: RefObject<HTMLDivElement | null>,
    viewEditor: { view: boolean, state: string },
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
) {
    const handleClickOutside = (event: MouseEvent) => {
        console.log('click')
        if (
            ref.current && !ref.current.contains(event.target as Node) && 
            refEditor.current && !refEditor.current.contains(event.target as Node) &&
            element === selectElement
        ) {
            
            if (viewEditor.state == 'Text Properties') {
                setViewEditor({ view: true, state: 'Text' })
            }
            if (viewEditor.state == 'Figure Properties') {
                setViewEditor({ view: true, state: 'Graphics' })
            }
            dispatch(setSelectElement, null)
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    })
}