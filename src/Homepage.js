import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    var link = '';
    var adresa = "https://react-wk9gvk.stackblitz.io/game" + link;
    console.log({adresa});
  }
  genereaza(length) {
    this.link = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 1; i <= length; i++) {
      this.link += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
  }
  render() {
    return (
      <div>
        <input
          id="buton"
          type="button"
          value="Invite Link"
          onClick={this.genereaza(10)}
        />
        {this.link}
        <br />
        <Link
          to={{
          pathname: "/game",
          search: this.link,
          state: { fromDashboard: true }
          }}
        >Enter Session</Link>
      </div>
    );
  }
}
