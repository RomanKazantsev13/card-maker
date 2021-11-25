import { useState, useEffect, useRef } from 'react'


export default function useDragAndDrop(props: {
    ref: React.RefObject<SVGElement>,
    setPosition: (centre: {x: number, y: number}) => void,
}) {
    const [position, setPosition] = useState()
    useEffect(() => {
        //onMouseDown={}
        // Указываем как производить очистку после этого эффекта:
        return  
          // Код отписки
        
      })

    const onMouseMove = (e: MouseEvent) => {
        props.setPosition({
            x: e.pageX,
            y: e.pageY
        })
    }
    return {position, setPosition}
}