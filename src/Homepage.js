import React from 'react';
import { Link } from 'react-router-dom';

export default class Homepage extends React.Component() {
  constructor(props) {
    super(props);
    var link = '';
  }

  render() {
    return (
      <div>
        <input
          id="buton"
          type="button"
          value="Invite Link"
          onClick={genereaza(10)}
        />
        {link}
        <br />
        <Link to="">Enter session</Link>
      </div>
    );
  }
}
