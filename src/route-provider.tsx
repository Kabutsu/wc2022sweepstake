import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

import getRoutes, { TRoute } from './services/routes';

type TChildProps = {
    routes: Array<TRoute>;
}

interface IProps {
    children: ({ routes }: TChildProps) => React.ReactNode;
}

const RouteProvider: FC<IProps> = ({ children }) => {
    const routes = getRoutes();

    return (
        <BrowserRouter>
            {children({ routes })}
        </BrowserRouter>
    );
};

export default RouteProvider;
