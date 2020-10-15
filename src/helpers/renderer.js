import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import Routes from '../client/routes';
import { Helmet } from 'react-helmet';
import serialize from 'serialize-javascript';
import { Provider } from 'react-redux';

export default (request, store, context) => {
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter context={context} location={request.path}>
                {renderRoutes(Routes)}
            </StaticRouter>
        </Provider>
    );
    const preloadData = store.getState();
    const helmet = Helmet.renderStatic();
    return `<!DOCTYPE html>
                <head>
                    ${helmet.title.toString()}
                    ${helmet.meta.toString()}
                    ${helmet.link.toString()}
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <link rel="stylesheet" href="/main.css" />
                </head>
                <body>
                    <div id="root">${content}</div>
                    <script>
                        window.__PRELOADED_DATA__ = ${serialize(preloadData).replace(/</g, '\\u003c')}
                    </script>
                    <script src="/bundle.js"></script>
                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                </body>
            </html>`;
}