import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Routes } from 'react-router';

import Layout from './components/layout';

import RouteProvider from './route-provider';

import './index.css';

const App = () => (
  <RouteProvider>
    {({ routes }) => (
      <Routes>
        <Route path="" element={<Layout routes={routes} />}>
          {routes.map(route => (
            <Route
              key={`route_${route.id}`}
              path={route.path}
              element={route.component}
            />
          ))}
        </Route>
      </Routes>
    )}
  </RouteProvider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);