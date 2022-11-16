import React, { useEffect, useState } from 'react';

import './country-image.scss';

type IProps = {
    countryName: string;
    timeout: number;
};

const CountryImage = ({ countryName, timeout = 0 }: IProps) => {
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), timeout);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`c-country-image ${show ? 'is-visible' : ''}`}>
            <img src={`${process.env.PUBLIC_URL}/flags/${countryName.toLowerCase().replaceAll(/(\s)/g, '-')}-flag-square-icon-128.png`} />
            <span>{countryName}</span>
        </div>
    );
};

export default CountryImage;
