import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import App from '@/components/App';


const ssr = (url: string) => {
    return renderToString(
        // <React.StrictMode>
        <StaticRouter location={url}>
            <App isClient={false} />
        </StaticRouter>
        // </React.StrictMode>
    );
};

export default ssr;