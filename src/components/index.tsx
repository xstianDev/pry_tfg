import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const domNode = document.getElementById('root') as HTMLElement;
const root = createRoot(domNode);

const AppWithRouter = () => (
    // <React.StrictMode>
    <BrowserRouter>
        <App isClient={true} />
    </BrowserRouter>
    // </React.StrictMode>
);

// Client
root.render(<AppWithRouter />);
