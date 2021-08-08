import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './Game.css'
function Game(){
    return(
    <body>
        <ul id="messages"></ul>
        <form id="form" action="">
            <input id="input" autocomplete="off" /><button>Send</button>
        </form>
    </body>
    )
}
export default Game;