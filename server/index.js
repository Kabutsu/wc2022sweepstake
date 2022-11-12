import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { Low, MemorySync } from 'lowdb';

const adapter = new MemorySync();
const db = new Low(adapter);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

const port = 3001;
const room = 'staging';

db.data ||= { members: [] };

app.get('/api', (req, res) => {
  res.send({ message: 'Hello World! My name is Sam!' });
});

io.on('connection', async (socket) => {
  console.log(`User ${socket.id} connected`);

  const hub = io.in(room);

  socket.join(room);

  io.emit('loaded', db.data.members);

  socket.on('join', (name) => {
    if (!db.data.members.length) {
      console.log(`No members currently in DB. User ${socket.id} to be made leader.`);
      io.emit('leader');
    }

    db.data.members.push({ id: socket.id, name });

    hub.emit('joined', db.data.members);
  });

  socket.on('disconnecting', (reason) => {
    const member = db.data.members.findIndex(x => x.id === socket.id);

    if (member >= 0) {
      db.data.members.splice(member, 1);
    }

    hub.emit('joined', db.data.members);
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
