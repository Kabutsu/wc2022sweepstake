import React from 'react';
import { createRoot } from 'react-dom/client';

import Home from './pages/home';

import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);