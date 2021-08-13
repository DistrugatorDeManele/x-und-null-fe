import React from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import './stylehp.css';
export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.socket = this.props.socket;
    this.state = {
      link: this.genereaza(),
      join: ''
    };
    this.genereaza = this.genereaza.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendToServer = this.sendToServer.bind(this);
  }
  genereaza() {
    var link1 = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 1; i <= 10; i++) {
      link1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.setState({ link: link1 });
    //this.socket.emit('invite', window.location.search.substring(1));
    return link1;
  }
  handleChange(event) {
    this.setState({ join: event.target.value });
  }
  sendToServer() {
    this.socket.emit('invite', window.location.search.substring(1));
  }
  render() {
    return (
      <div>
        <p> {this.state.link} </p>
        <AwesomeButton onPress={this.genereaza} size="medium">
          Change invite link
        </AwesomeButton>
        <br />
        <br />
        <Link
          to={{
            pathname: '/loading',
            search: this.state.link,
            state: { fromDashboard: true }
          }}
          onClick={this.sendToServer}
        >
          <AwesomeButton type="primary" id="b1">Enter Session</AwesomeButton>
        </Link>
        <br/>
        <br/>
        <form>
          <label>
            Your invite link
            <br />
            <input
              type="text"
              name="name"
              value={this.state.join}
              onChange={this.handleChange}
            />
          </label>
          <Link
            to={{
              pathname: '/loading',
              search: this.state.join,
              state: { fromDashboard: true }
            }}
            onClick={this.sendToServer}
          >
            <AwesomeButton type = "primary" id = "b2">Enter Session</AwesomeButton>
          </Link>
        </form>
      </div>
    );
  }
}
