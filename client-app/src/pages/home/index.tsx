import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';

import PlayerInfo, { TDrawData, TPlayerData } from '../player-info';

import './home.scss';

enum Stage {
  Info,
  Draw,
};

type TUser = {
  id: string;
  name: string;
}

type TProps = {};

const socket = io('http://localhost:3001');

const Home = ({}: TProps) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [message, setMessage] = useState('No message set');

  const [name, setName] = useState('');
  const [users, setUsers] = useState<Array<string>>([]);
  const [userId, setUserId] = useState('');
  const [isLeader, setIsLeader] = useState(false);

  const [currentStage, setCurrentStage] = useState<Stage>(Stage.Info);
  const [drawData, setDrawData] = useState<TDrawData>(null);

  useEffect(() => {
    if (drawData?.playerData.length) {
      setCurrentStage(Stage.Draw);
    }
  }, [drawData]);

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

  const renderStage = () => (
    <PlayerInfo setPlayerData={(data: TDrawData) => setDrawData(data)} />
  );

  return (
    <div className="p-home">
      <PlayerInfo setPlayerData={(data: TDrawData) => setDrawData(data)} />
    </div>
  );
};

export default Home;
