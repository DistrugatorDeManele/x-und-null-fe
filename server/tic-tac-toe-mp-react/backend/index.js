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
io.on('connection', (socket) => {
    console.log("user connected");
    socket.on('chat message', (msg) => {
      io.emit("chat message", msg);
    });
});
server.listen(3000, () => {
  console.log('listening on *:3000');
});
