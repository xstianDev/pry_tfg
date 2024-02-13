import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import '/src/styles/main.css';

const domNode = document.getElementById('root');
const root = ReactDOM.createRoot(domNode);

const AppWithRouter = () => (
    <BrowserRouter>
        <App isServer={true} />
    </BrowserRouter>
);

root.render(
    <React.StrictMode>
        <AppWithRouter />
    </React.StrictMode>
);
