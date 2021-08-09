import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Homepage from './Homepage';
import Join from './Join';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { link } from './Homepage';
const io = require('socket.io-client');
const socket = io('http://localhost:3000/');
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/loading">
          <Join socket={socket} />
        </Route>
        <Route path="/game">
          <App />
        </Route>
        <Route path="/">
          <Homepage socket={socket} />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
