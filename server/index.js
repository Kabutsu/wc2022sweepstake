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

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('ping', () => {
    io.emit('pong');
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
