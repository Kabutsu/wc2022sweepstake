import React from 'react';

import { TPlayerDraw } from 'src/types/general';
import CountryImage from '../country-image';
import './results-box.scss';

type IProps = {
    result: TPlayerDraw,
    animationStartDelay: number;
    animationWaitDelay: number;
};

const ResultsBox = ({ result, animationStartDelay, animationWaitDelay }: IProps) => (
    <div className="c-results-box">
        <div className="c-results-box__title">{result.playerData.playerName}</div>
        <div className="c-results-box__countries">
            {result.countries.sort((a, b) => b.id - a.id).map((country, index) => (
                <CountryImage countryName={country.name} timeout={animationStartDelay + (animationWaitDelay * index)} />
            ))}
        </div>
    </div>
);

export default ResultsBox;
