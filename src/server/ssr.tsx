import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import App from '@/components/App';
import GlobalContextWrapper from '@/context/GlobalContextWrapper';


const ssr = (url: string) => {
    return renderToString(
        <GlobalContextWrapper>
            <StaticRouter location={url}>
                <App isClient={false} />
            </StaticRouter>
        </GlobalContextWrapper>
    );
};

export default ssr;