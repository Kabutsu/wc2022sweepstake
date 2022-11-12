import React, { useState, useEffect } from 'react';
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
  const [userId, setUserId] = useState<string>();
  const [isLeader, setIsLeader] = useState(false);

  const getData = () => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  };

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('leader', (id?: string) => {
      setIsLeader(!id || id === userId);
    });

    socket.on('loaded', (usersOnServer: Array<TUser>) => {
      setUsers(usersOnServer.map(({ name }) => name));
    });

    socket.on('joined', (usersOnServer: Array<TUser>) => {
      setUsers(usersOnServer.map(({ name }) => name));
      //setUserId(id);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      // socket.off('loaded');
      // socket.off('joined');
      socket.off('leader');
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
