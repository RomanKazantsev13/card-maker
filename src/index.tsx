import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Card } from './components/Card';
import { card } from './model/model'

ReactDOM.render(
  <Card model={card}/>,
  document.getElementById('root')
);
