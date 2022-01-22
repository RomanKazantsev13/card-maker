export function addText() {
    return {
        type: 'ADD_TEXT'
    }
}

export function changeText(str: string) {
    return {
        type: 'CHANGE_TEXT',
        str: str
    }
}

export function setFontText(font: string) {
    return {
        type: 'SET_FONT_TEXT',
        font: font
    }
}

export function setColorText(color: string) {
    return {
        type: 'SET_COLOR_TEXT',
        color: color
    }
}

export function setSizeText(size: number) {
    return {
        type: 'SET_SIZE_TEXT',
        size: size
    }
}