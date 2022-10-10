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
const room = 'staging';

app.get('/api', (req, res) => {
  res.send({ message: 'Hello World! My name is Sam!' });
});

io.on('connection', async (socket) => {
  console.log(`User ${socket.id} connected`);

  const hub = io.in(room);
  const currentMembers = await hub.allSockets();
  
  if (!currentMembers.size) {
    console.log(`No members currently in staging. User ${socket.id} to be made leader.`);
    io.emit('leader');
  }

  socket.join(room);

  socket.on('join', (name) => {
    // save to DB
    // emit 'joined' event to subscribers
    hub.emit('joined', name);
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
