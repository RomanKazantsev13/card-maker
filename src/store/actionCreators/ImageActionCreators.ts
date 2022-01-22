import { Point, Size } from "../../utils/types"

export function addImage(url: string, size: Size) {
    return {
        type: 'ADD_IMAGE',
        url: url,
        size: size
    }
}

export function resizeImage(size: Size, centre: Point) {
    return {
        type: 'RESIZE_IMAGE',
        size: size,
        centre: centre
    }
}