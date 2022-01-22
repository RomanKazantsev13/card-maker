import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import { Card } from './components/Card'
import { store } from './store/store'


function render() {
  ReactDOM.render(
    <Provider store={store}>
      <Card />
    </Provider>,
    document.getElementById('root')
  )
}

store.subscribe(() => {
  render()
})
render()
