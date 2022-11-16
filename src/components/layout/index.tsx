import { useEffect } from 'react';
import { Outlet, useLocation, matchPath, useNavigate, matchRoutes } from 'react-router';
import { Link } from 'react-router-dom';

import Header from '../header';

import { TRoute } from '../../services/routes';

import './layout.scss';

type TProps = {
    routes: Array<TRoute>;
};

const Layout = ({ routes }: TProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [{ route: { path } }] = matchRoutes(routes, location) ?? [{ route: { path: location.pathname } }];
    const currentRoute = routes.find(route => matchPath(path, route.path));

    return (
        <div className="c-layout">
            <Header className="c-layout__header" />
            <div className="c-layout__page">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
