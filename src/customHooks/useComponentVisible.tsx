import { useState, useEffect, useRef } from 'react'


// check ref

export default function useComponentVisible(initialIsVisible: boolean) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible)
    const ref: any = useRef(null)

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false)
        } 
    };

    useEffect(() => {
        console.log('add', ref)
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            console.log('remove', ref)
            document.removeEventListener('click', handleClickOutside, true)
        };
    });

    return { ref, isComponentVisible, setIsComponentVisible }
}