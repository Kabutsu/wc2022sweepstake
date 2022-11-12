import Button from 'src/components/button';
import ResultsBox from 'src/components/results-box';

import { TPlayerDraw } from 'src/types/general';

import './team-draw.scss';

type IProps = {
    drawData: Array<TPlayerDraw>;
    onReturn: () => void;
};

const animationDelayMS = 2000;

const TeamDraw = ({ drawData, onReturn }: IProps) => (
    <div className="p-team-draw">
        <div className="p-team-draw__info">
            {drawData.map((draw, index) => (
                <ResultsBox
                    result={draw}
                    animationStartDelay={index * animationDelayMS}
                    animationWaitDelay={drawData.length * animationDelayMS}
                />
            ))}
        </div>
        <Button onClick={onReturn} className="p-team-draw__return">Return</Button>
    </div>
);

export default TeamDraw;
