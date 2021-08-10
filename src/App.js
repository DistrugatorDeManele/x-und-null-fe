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
      squares: Array(9).fill(null),
      nextX: true
    };
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.nextX ? 'X' : 'O';
    this.setState({
      squares: squares,
      nextX: !this.state.nextX
    });
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
  Restart() {
    for (let i = 0; i < this.state.squares.length; i++) {
      var newSquares = new Array(this.state.squares.length);
      this.setState({ squares: newSquares });
    }
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    const squares = this.state.squares.slice();
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      if (fill(squares) == 1) {
        status = 'Draw';
      } else {
        if (empty(squares) == 1) {
          this.socket.emit('user', window.location.search.substring(1));
          this.socket.on(
            'user',
            function(nr) {
              this.setState({ nextX: nr });
            }.bind(this)
          );
        }
        status = 'Next player: ' + (this.state.nextX ? 'X' : 'O');
        }
      }

    return (
      <div>
        <div className="status">{status}</div>
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
        <button onClick={() => this.Restart()}> Restart </button>
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
function fill(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == null) return 0;
  }
  return 1;
}
function empty(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] != null) return 0;
  }
  return 1;
}
function calculateWinner(squares) {
  const castigator = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < castigator.length; i++) {
    const [a, b, c] = castigator[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
