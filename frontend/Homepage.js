import React from 'react';
import ReactDOM from 'react-dom';
import './Hp.css'
import { Link } from 'react-router-dom';
var link;
function Homepage() {
  return (
    <nav>
      <div>
        <input id="buton" type="button" value="Invite Link" onClick={genereaza(10)} />
        {link}
        <br></br>
        <Link to="">Enter session</Link>
      </div>
    </nav>
  )
}
function genereaza(length) {
  link = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 1; i <= length; i++) {
    link += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
}

export default Homepage;