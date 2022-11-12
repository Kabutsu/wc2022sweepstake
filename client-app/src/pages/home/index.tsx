import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';

type TUser = {
  id: string;
  name: string;
}

const socket = io('http://localhost:3001');

const Home = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [message, setMessage] = useState('No message set');

  const [name, setName] = useState('');
  const [users, setUsers] = useState<Array<string>>([]);
  const [userId, setUserId] = useState('');
  const [isLeader, setIsLeader] = useState(false);

  const getData = () => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  };

  const updateLeader = useCallback((id?: string) => {
    console.log(`id:= ${id}`);
    console.log(`userId:= ${userId}`);
    setIsLeader(!id || id === userId);
  }, [userId]);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('makeLeader', () => {
      setIsLeader(true);
    });

    socket.on('askLeader', (leaderId: string) => {
      socket.emit('checkLeader', leaderId);
    });

    socket.on('loaded', (usersOnServer: Array<TUser>) => {
      setUsers(usersOnServer.map(({ name }) => name));
    });

    socket.on('joined', (id: string) => {
      setUserId(id);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('makeLeader');
      socket.off('askLeader');
      socket.off('loaded');
      socket.off('joined');
    };
  }, []);

  const sendJoinRequest = () => {
    if (!!name) {
      socket.emit('join', name);
      setName('');
    } else {
      alert('Name cannot be empty');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={getData}>Fetch data</button>
        <p>{message}</p>
        <br />
        <p>{`${isConnected ? 'Connected to' : 'Disconnected from'} websocket server`}</p>
        {isLeader && (
          <p>You are the leader!</p>
        )}
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={sendJoinRequest}>Join</button>
        {users.length && (
          <ul>
            {users.map(user => (
              <li>{user}</li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
};

export default Home;
