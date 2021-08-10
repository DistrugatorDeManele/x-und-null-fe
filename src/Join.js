import React from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';

export default class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.socket = this.props.socket;
  }
  componentDidMount() {
    this.socket.on(
      'invite',
      function(inv) {
        this.setState({ loading: false });
      }.bind(this)
    );
  }
  render() {
    return (
      <div>
        {this.state.loading && (
          <h1> Loading... {window.location.search.substring(1)}</h1>
        )}
        {!this.state.loading && (
          <Link
            to={{
              pathname: '/game',
              search: window.location.search.substring(1),
              state: { fromDashboard: true }
            }}
          >
            Enter Session
          </Link>
        )}
      </div>
    );
  }
}
