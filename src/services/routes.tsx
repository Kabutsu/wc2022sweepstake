import { matchPath } from 'react-router';
import { TDefaultObject } from 'src/types/general';

import Home from '../pages/home';

export type TRoute = {
    id: string;
    path: string;
    component: any;
    label?: string;
}

export const routeIds = {
    homePage: 'home-route',
};

const getRoutes = (): Array<TRoute> => [{
    id: routeIds.homePage,
    path: '/',
    component: <Home />,
}];

export const getRoute = (id: string) => getRoutes().find(route => route.id === id);

export const getRoutePath = (id: string) => getRoute(id)?.path;

export default getRoutes;
