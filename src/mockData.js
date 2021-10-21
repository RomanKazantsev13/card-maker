/* eslint-disable @typescript-eslint/no-unused-vars */
let card = {
    templates: [],
    canvas: canvas,
    history: {
        undo: [],
        redo: []
    }
}

let canvas = {
    currentId: 0,
    selectElement: null,
    size: {
        width: 800,
        height: 600
    },
    background: '#FFF',
    elements: []
}

let element = {
    centre: {
        x: 50, 
        y: 50
    },
    id: 1,
    object: figure
}

let figure = {
    color: '#000',
    object: circle
}

let circle = {
    radius: 10
}