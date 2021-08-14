const { render } = require('@testing-library/react');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
const ids = [1, 2];
var numar = 0;
var once = 0;
var once1 = 0;
var once2 = 0;
var number = Math.random();
console.log(number);
var idSesiuneCatreTabla = {};
idSesiuneCatreTabla = {};
io.on('connection', (socket) => {
    console.log("user connected");
      socket.on('invite', (inv) => {
        socket.join(inv);
        var room = io.sockets.adapter.rooms.get(inv).size;
        console.log(room);
        if(room == 2){
          io.to(inv).emit('invite', inv);
        }
      });
    socket.on('user', (link) =>{
      socket.join(link);
      var room = io.sockets.adapter.rooms.get(link).size;
      if(ids[0] != 1 && ids[1] == 2 && room == 2)
      ids[1] = socket.id;
      if(ids[0] == 1)
      ids[0] = socket.id;
      if(room == 1 && once1 == 0){
        console.log(ids[0]);
        once1 = 1;
        if(number < 0.5);{
          io.to(ids[0]).emit('user', true);
        }
        if(number >= 0.5){
          io.to(ids[0]).emit('user', false);
        }
      }
      if(room == 2 && once2 == 0){
        console.log(ids[1]);
        once2 = 1;
        if(number < 0.5){
          io.to(ids[1]).emit('user', false);
        }
        if(number >= 0.5){
          io.to(ids[1]).emit('user', true);
        }
      }
    });
    socket.on('table', (squares) =>{
      numar++;
      console.log(numar);
      var id = socket.id;
      var tabla = squares;
      idSesiuneCatreTabla[id] = tabla;
      if(calculateWinner(tabla) != null){
        var winner = calculateWinner(tabla);
        io.to(ids[1]).emit('table', idSesiuneCatreTabla[id]);
        io.to(ids[0]).emit('table', idSesiuneCatreTabla[id]);
        io.to(ids[0]).emit('winner', winner);
        io.to(ids[1]).emit('winner', winner);
      }else{
        if(fillsquare(tabla) == 1){
          var nimic = null;
          io.to(ids[1]).emit('table', idSesiuneCatreTabla[id]);
          io.to(ids[0]).emit('table', idSesiuneCatreTabla[id]);
          io.to(ids[0]).emit('draw', nimic);
          io.to(ids[1]).emit('draw', nimic);
        }else{
          if(id == ids[0]){
            io.to(ids[1]).emit('table', idSesiuneCatreTabla[id]);
          }else{
            io.to(ids[0]).emit('table', idSesiuneCatreTabla[id]);
          }
        }
      }
    });
});
function fillsquare(squares){
  for(let i = 0; i < squares.length; i++){
    if(squares[i] == null){
      return 0;
    }
  }
  return 1;
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
    //   if(once == 0 && room == 2){
    //     number = Math.random();
    //     once = 1;
    //     if(number < 0.5){
    //       io.to(ids[0]).emit('user', true);
    //       io.to(ids[1]).emit('user', false);
    //       console.log(number);
    //     }
    //     if(number >= 0.5){
    //       io.to(ids[0]).emit('user', false);
    //       io.to(ids[1]).emit('user', true);
    //       console.log(number);
    //     }
    // }
server.listen(3000, () => {
  console.log('listening on *:3000');
});
