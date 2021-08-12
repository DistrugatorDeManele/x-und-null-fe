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
      WhoAmI: null,
      winnerpage: false,
      winner: null
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidMountTable = this.componentDidMountTable.bind(this);
    //dam emit la link ul de la server
    this.socket.emit('user', window.location.search.substring(1));
    //si se trimite la link ul de la server cine esti(doar o data)
  }
  componentDidMount(nr) {
    if (nr == true) {
      this.setState({ WhoAmI: 'X' });
    } else {
      this.setState({ WhoAmI: 'O' });
    }
  }
  componentDidMountTable(tabla) {
    this.setState({ squares: tabla });
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (this.MutEu(squares) == 0) {
      return;
    }
    if (squares[i] == null) {
      squares[i] = this.state.WhoAmI;
    } else {
      return;
    }
    this.setState({
      //pui in patratel cine esti
      squares: squares
    });
    this.socket.emit('table', squares);
  }
  MutEu(squares) {
    var spatii_ocupate = 0;
    for (let i = 0; i < 9; i++) {
      if (squares[i] != null) spatii_ocupate++;
    }
    if (this.state.WhoAmI == 'X') {
      if (spatii_ocupate % 2 == 0) {
        return 1;
      } else {
        return 0;
      }
    } else {
      if (spatii_ocupate % 2 == 0) {
        return 0;
      } else {
        return 1;
      }
    }
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
    //si se trimite la link ul de la server cine esti(doar o data)
    this.socket.on(
      'user',
      function(nr) {
        this.componentDidMount(nr);
      }.bind(this)
    );
    this.socket.on(
      'table',
      function(tabla) {
        this.componentDidMountTable(tabla);
      }.bind(this)
    );
    this.socket.on(
      'winner',
      function(car) {
        this.setState({ winnerpage: true });
        this.setState({ winner: car });
      }.bind(this)
    );
    return (
      <div>
        <div className="status">Player: {this.state.WhoAmI} </div>
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
        {this.state.winnerpage && <h1> Winner is {this.state.winner}</h1>}
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
