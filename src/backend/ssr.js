import React from "react";
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from '../components/App';

// ssr: Server Side Rendering

const render = (req, res) => {
    const AppWithRouter = () => (
        <StaticRouter>
            <App isServer={true} />
        </StaticRouter>
    );

    const markup = renderToString(<AppWithRouter />);

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>SSR workshop</title>
            <script src="/app.js" defer></script>
            <script src="/vendor.js" defer></script>
        </head>
        <body>
            <div id="root">
                ${markup}
            </div>
        </body>
        </html>
    `);
};

export default render;