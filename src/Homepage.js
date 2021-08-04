import React from 'react';
import { Link } from 'react-router-dom';
export default class Homepage extends React.Component() {
  constructor(props){
    super(props);
    var link = '';
  }
  genereaza(length) {
    link = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 1; i <= length; i++) {
      link += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  }
  return (
    <nav>
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
    </nav>
  );
}
