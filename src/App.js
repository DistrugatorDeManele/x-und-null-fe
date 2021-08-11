import React from 'react';
import './style.css';
import ReactDOM from 'react-dom';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.socket = this.props.socket;
  }
  render() {
    return (
      <div>
        <Game socket={this.socket} />
      </div>
    );
  }
}

class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick({ value: 'X' })}
      >
        {this.props.value}
      </button>
    );
  }
}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.socket = this.props.socket;
    this.state = {
      squares: Array(9).fill(null)
    };
    var aflam = true;
    this.socket.emit('user', window.location.search.substring(1));
    this.socket.on(
      'user',
      function(nr) {
        if (nr == true) {
          this.WhoAmI = 'X';
        } else {
          this.WhoAmI = 'O';
        }
        this.aflam = false;
      }.bind(this)
    );
    this.socket.on('table', function(tabla) {
      this.setState({ squares: tabla });
    });
  }
  handleClick(i) {
    //daca nu s eu dau return(if)
    const squares = this.state.squares.slice();
    squares[i] = this.setState({ //pui in patratel cine esti
      squares: squares
    });
    //se da emit la tabla cu x si 0
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="status">Urmeaza sa mute {currentPlayer}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.socket = this.props.socket;
  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board socket={this.socket} />
        </div>
      </div>
    );
  }
}
