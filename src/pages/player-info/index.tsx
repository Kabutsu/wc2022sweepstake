import { useState } from 'react';
import { Socket } from 'socket.io-client';
import Button from 'src/components/button';
import { RadioGroup, RadioOptionType } from 'src/components/input-radio';
import InputToggle from 'src/components/input-toggle';
import SignUpForm from 'src/components/player-form';
import Tooltip from 'src/components/tooltip';
import { DataOptionType } from 'src/types/general';
import { TUser } from 'src/types/web-server';

import './player-info.scss';

export enum Balance {
    Full = 0,
    Some = 1,
    None = 2
};

export type TDrawData = {
    playerData: Array<TUser>;
    balanceDraw: Balance;
    balanceTeams: boolean;
    oneTeamEach: boolean;
    allowTeamsFromSameGroup: boolean;
};

const balanceOptions: Array<RadioOptionType> = [{
    value: Balance.Full,
    label: 'Very Balanced',
    tooltip: 'Everyone draws the same number of top & bottom seeds (caution: if playing with fewer than 6 players, some top seeds will not be drawn)',
}, {
    value: Balance.Some,
    label: 'Some Balancing',
    tooltip: 'Players will draw roughly the same number of top and bottom seeds'
}, {
    value: Balance.None,
    label: 'No Balancing',
    tooltip: 'Anything goes - you could get only top teams, or only the worst of the bunch!'
}];

type IProps = {
    socket: Socket;
    connected: boolean;
    isLeader: boolean;
    players: Array<TUser>;
    setPlayerData: (data: TDrawData) => void;
}

const PlayerInfo = ({ socket, connected, isLeader, players, setPlayerData }: IProps) => {
    const [balanceDraw, setBalanceDraw] = useState<Balance>(Balance.Some);
    const [balanceTeams, setBalanceTeams] = useState<boolean>(false);
    const [allowTeamsFromSameGroup, setAllowTeamsFromSameGroup] = useState<boolean>(false);
    const [oneTeamEach, setOneTeamEach] = useState<boolean>(true);

    const handleSubmit = (playerData: Array<TUser>) => {
        const drawData: TDrawData = {
            balanceDraw,
            balanceTeams,
            allowTeamsFromSameGroup,
            oneTeamEach,
            playerData,
        };

        setPlayerData(drawData);
    };

    return (
        <div className="p-player-info">
            {!connected ? (
                <div className="p-player-info__section">
                    <span className="u-text--title">Join Group</span>
                    <SignUpForm socket={socket} />
                </div>
            ) : (
                <>
                    {isLeader && (
                        <div className="p-player-info__section">
                            <span className="u-text--title">Draw Settings</span>
                            <div className="p-player-info__input">
                                <label htmlFor="oneTeamEach">Assign One Team Each?</label>
                                <InputToggle id="one-team-each" value={oneTeamEach} onChange={(on: boolean) => setOneTeamEach(on)} />
                            </div>
                            {!oneTeamEach && (
                                <>
                                    <div className="p-player-info__input">
                                        <label htmlFor="balanceTeams">
                                            Split Options Evenly?
                                            <Tooltip
                                                className="p-player-info__input-tooltip"
                                                label={'Selecting "Yes" will give everyone the same number of teams (this may mean some teams are not drawn)'}
                                            />
                                        </label>
                                        <InputToggle id="balance-teams" value={balanceTeams} onChange={(on: boolean) => setBalanceTeams(on)} />
                                    </div>
                                    <div className="p-player-info__input">
                                        <label htmlFor="allowTeamsFromSameGroup">
                                            Allow Teams from the Same Group?
                                            <Tooltip
                                                className="p-player-info__input-tooltip"
                                                label={'Let players draw teams from the same group (e.g. England and Scotland)'}
                                            />
                                        </label>
                                        <InputToggle id="allow-teams-from-same-group" value={allowTeamsFromSameGroup} onChange={(on: boolean) => setAllowTeamsFromSameGroup(on)} />
                                    </div>
                                    <div className="p-player-info__input">
                                        <label htmlFor="balanceDraw">How Balanced Should the Draw Be?</label>
                                        <RadioGroup
                                            id="balance-draw"
                                            className="p-player-info__input-balance"
                                            options={balanceOptions}
                                            value={balanceDraw}
                                            onChange={(value: number) => setBalanceDraw(value)}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </>
            )}
            <div className="p-player-info__section">
                <span className="u-text--title">Names of People Playing (Max. 32)</span>
                <div className="p-player-info__summary">
                    <div className="o-summary__players">
                        {players.map(player => (
                            <div className="o-summary__players-name">
                                <span>{player.name}</span>
                            </div>
                        ))}
                    </div>

                    <Button disabled={!isLeader} onClick={() => handleSubmit(players)}>
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PlayerInfo;
