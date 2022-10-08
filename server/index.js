const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

const port = 3001;

app.get('/api', (req, res) => {
  res.send({ message: 'Hello World! My name is Sam!' });
});

io.on('connection', async (socket) => {
  console.log(`User ${socket.id} connected`);

  const room1 = io.in('room1');
  const currentMembers = await room1.allSockets();
  
  if (!currentMembers.size) {
    console.log(`No members currently in room1. User ${socket.id} to be made leader.`);

    io.emit('leader');
  }

  socket.join('room1');

  socket.on('ping', () => {
    room1.emit('pong');
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
