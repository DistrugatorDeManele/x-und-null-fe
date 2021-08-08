import React from 'react';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: this.genereaza()
    };
    this.genereaza = this.genereaza.bind(this);
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
    return link1;
  }
  render() {
    return (
      <div>
        <p> {this.state.link} </p>
        <button onClick={this.genereaza}>Change Invite Link</button>
        <br />
        <Link
          to={{
            pathname: '/game',
            search: this.state.link,
            state: { fromDashboard: true }
          }}
        >
          Enter Session
        </Link>
      </div>
    );
  }
}
