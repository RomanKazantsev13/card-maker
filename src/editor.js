import { initializationCard } from "./model/Card/card"

let editor = initializationCard([])
let editorChangeHandler = null

export function getEditor() {
    return editor
}

function setEditor(newEditor) {
    editor = newEditor
}

export function addEditorChangeHandler(handler) {
    editorChangeHandler = handler
}

export function dispatch(modifyFn, payload) {
    const newEditor = modifyFn(editor, payload)
    setEditor(newEditor)

    if(editorChangeHandler) {
        editorChangeHandler()
    }
}