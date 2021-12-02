import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Card } from './components/Card'
import { addEditorChangeHandler, getEditor } from './editor'

function render() {
  ReactDOM.render(
    <Card card={getEditor()} />,
    document.getElementById('root')
  )
}

addEditorChangeHandler(render)
render()
