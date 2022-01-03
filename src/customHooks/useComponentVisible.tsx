import { useState, useEffect, useRef, RefObject, MutableRefObject } from 'react'

export default function useComponentVisible(initialIsVisible: boolean) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible)
    const ref: any = useRef(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsComponentVisible(false)
        } 
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        };
    });

    return { ref, isComponentVisible, setIsComponentVisible }
}