import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const Home = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [message, setMessage] = useState('No message set');

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

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    socket.on('leader', () => {
      alert('You are the leader!');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
      socket.off('leader');
    };
  }, []);

  const sendPing = () => {
    socket.emit('ping');
  }

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
        <button onClick={sendPing}>Ping</button>
        <p>{lastPong || '-'}</p>
      </header>
    </div>
  );
};

export default Home;
