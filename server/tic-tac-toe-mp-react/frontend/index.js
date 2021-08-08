import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './Homepage';
import Game from './Game';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Homepage />
      <Game />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);