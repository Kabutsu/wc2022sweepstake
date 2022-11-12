import { useForm } from 'react-hook-form';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { TPlayerData } from 'src/pages/player-info';

import { TDefaultObject } from 'src/types/general';
import Button from '../button';
import InputText from '../input-text';

import './player-form.scss';

type IProps = {
    onSubmit: (playerNames: Array<TPlayerData>) => void;
    socket: Socket<DefaultEventsMap, DefaultEventsMap>;
};

const MAX_PLAYERS: number = 24;

const generatePlayers = () => {
    const players: TDefaultObject = {};
    for(var i = 0; i < MAX_PLAYERS; i++) {
        players[`player_${i}`] = '';
    }

    return players;
}

const showRow = (index: number, values: TDefaultObject) => {
    if (index <=4) return true;

    const startOfPrevRow = index - (4 + ((index - 1) % 4));
    const prevRow = [0,1,2,3].map(x => x + startOfPrevRow);
    const show = prevRow.every(cell => !!values[`player_${cell - 1}`]);
    return show;
}

const PlayerForm = ({ socket, onSubmit }: IProps) => {
    const initialValues = generatePlayers();

    const { control, handleSubmit, register, reset, watch } = useForm<TDefaultObject>({ mode: 'all' });
    //const values = watch();

    const sendJoinRequest = (values: TDefaultObject) => {
        if (!!values['name']) {
          socket.emit('join', values['name']);
        } else {
          alert('Name cannot be empty');
        }
      };

    const submitForm = (values: TDefaultObject) => onSubmit(Object.values(values).filter((x, index) => !!x && showRow(index + 1, values)).map((playerName, index) => ({ playerName, playerId: index })));

    return (
        <form
            className="c-player-form"
            onSubmit={handleSubmit(sendJoinRequest)}
        >
            <div className="c-player-form__players">
                <div className="c-player-form__players-input">
                    <InputText
                        control={control}
                        placeholder="Enter Name"
                        {...register('name')}
                    />
                </div>
            </div>
            
            <Button
                type="submit"
                className="c-player-form__submit"
            >
                Submit
            </Button>
        </form>
    );
};

export default PlayerForm;
