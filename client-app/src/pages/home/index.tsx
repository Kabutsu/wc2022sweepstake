import { useState, useEffect } from 'react';
import io from 'socket.io-client';

import { TUser } from '../../types/web-server';
import PlayerInfo, { TDrawData } from '../player-info';

import { drawTeams } from 'src/services/draw-logic';

import './home.scss';
import { TPlayerDraw } from 'src/types/general';
import TeamDraw from '../team-draw';

enum Stage {
  Info,
  Draw,
};

type TProps = {};

const socket = io('https://wc-2022-sweepstake-back-end.azurewebsites.net');

const Home = ({}: TProps) => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const [name, setName] = useState('');
  const [users, setUsers] = useState<Array<TUser>>([]);
  const [userId, setUserId] = useState('');
  const [isLeader, setIsLeader] = useState(false);

  const [currentStage, setCurrentStage] = useState<Stage>(Stage.Info);
  const [drawData, setDrawData] = useState<Array<TPlayerDraw>>(null);

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

    socket.on('teamsDrawn', (data: Array<TPlayerDraw>) => {
      setDrawData(data);
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
    const teamDraw = drawTeams(data);
    setDrawData(teamDraw);

    socket.emit('drawTeams', teamDraw);
  }

  return (
    <div className="p-home">
      {!drawData ? (
        <PlayerInfo
          socket={socket}
          connected={!!userId}
          isLeader={isLeader}
          players={users}
          setPlayerData={submitDrawData}
        />
      ) : (
        <TeamDraw drawData={drawData} onReturn={() => setDrawData(null)} />
      )}
    </div>
  );
};

export default Home;
