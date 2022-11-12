import React, { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';

import PlayerInfo, { TDrawData } from '../player-info';

import { TUser } from '../../types/web-server';

import './home.scss';

enum Stage {
  Info,
  Draw,
};

type TProps = {};

const socket = io('http://localhost:3001');

const Home = ({}: TProps) => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const [name, setName] = useState('');
  const [users, setUsers] = useState<Array<TUser>>([]);
  const [userId, setUserId] = useState('');
  const [isLeader, setIsLeader] = useState(false);

  const [currentStage, setCurrentStage] = useState<Stage>(Stage.Info);
  const [drawData, setDrawData] = useState<TDrawData>(null);

  useEffect(() => {
    if (drawData?.playerData.length) {
      setCurrentStage(Stage.Draw);
    }
  }, [drawData]);

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
      setUsers(usersOnServer);
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

  const submitDrawData = (data: TDrawData) => {
    setDrawData(data);
  }

  return (
    <div className="p-home">
      <PlayerInfo
        socket={socket}
        connected={!!userId}
        isLeader={isLeader}
        players={users}
        setPlayerData={submitDrawData}
      />
    </div>
  );
};

export default Home;
