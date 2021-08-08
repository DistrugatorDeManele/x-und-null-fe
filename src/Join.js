import React from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
const io = require('socket.io-client');
const socket = io('http://localhost:3000/');
export default class Join extends React.Component {
  constructor(props) {
    super(props);
    socket.emit('invite', window.location.search.substring(1));
    socket.on('invite', function(inv) {
      ReactDOM.render(
        <Link
          to={{
            pathname: '/game',
            search: inv,
            state: { fromDashboard: true }
          }}
        >
          Enter Session
        </Link>
      );
      console.log('da');
    });
  }
  render() {
    return <h1> Loading... {window.location.search.substring(1)}</h1>;
  }
}

