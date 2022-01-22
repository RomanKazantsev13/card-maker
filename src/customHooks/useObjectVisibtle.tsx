import { useEffect, RefObject, MutableRefObject } from 'react'
import { setSelectElement } from '../store/actionCreators/ElementsActionCreators'
import { store } from '../store/store'
import { isText } from '../utils/typeGuards'
import { Element } from '../utils/types'

export default function useObjectVisible(
    ref: RefObject<SVGRectElement | SVGEllipseElement | SVGPolygonElement | SVGTextElement | SVGImageElement | null>,
    element: Element,
    selectElement: Element |null,
    refEditor: RefObject<HTMLDivElement | null>,
    refInputText: MutableRefObject<HTMLInputElement | null>,
    viewEditor: { view: boolean, state: string },
    setViewEditor: (viewEditor: { view: boolean, state: string }) => void,
    viewInput: boolean,
) {
    const handleClickOutside = (event: MouseEvent) => {
        if (
            ref.current && !ref.current.contains(event.target as Node) && 
            refEditor.current && !refEditor.current.contains(event.target as Node) &&
            element === selectElement
        ) {
            
            if (viewEditor.state == 'Text Properties' || viewEditor.state == 'FontChoose') {
                setViewEditor({ view: true, state: 'Text' })
            }
            if (viewEditor.state == 'Figure Properties') {
                setViewEditor({ view: true, state: 'Graphics' })
            }
            if (!isText(selectElement.object)) {
                store.dispatch(setSelectElement(null))
            } else {
                if (viewInput) {
                    if (refInputText.current && !refInputText.current.contains(event.target as Node)) {
                        store.dispatch(setSelectElement(null))
                    }
                } else {
                    store.dispatch(setSelectElement(null))
                }
            }
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    })
}