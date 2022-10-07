import React, { useState } from 'react';

const Home = () => {
  const [message, setMessage] = useState('No message set');

  const getData = () => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
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
      </header>
    </div>
  );
};

export default Home;
