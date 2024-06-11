import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import GlobalContextWrapper from '@/context/GlobalContextWrapper';

const domNode = document.getElementById('root') as HTMLElement;
const root = createRoot(domNode);

const AppWithRouter = () => (
    <GlobalContextWrapper>
        <BrowserRouter>
            <App isClient={true} />
        </BrowserRouter>
    </GlobalContextWrapper>
);

root.render(<AppWithRouter />);