import { useForm } from 'react-hook-form';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

import { TDefaultObject } from 'src/types/general';
import Button from '../button';
import InputText from '../input-text';

import './player-form.scss';

type IProps = {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>;
};

const SignUpForm = ({ socket }: IProps) => {
    const { control, handleSubmit, register } = useForm<TDefaultObject>({ mode: 'all' });

    const sendJoinRequest = (values: TDefaultObject) => {
        if (!!values['name']) {
          socket.emit('join', values['name']);
        } else {
          alert('Name cannot be empty');
        }
      };

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
                Join
            </Button>
        </form>
    );
};

export default SignUpForm;
