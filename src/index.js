// This will serve react application from server

import '@babel/polyfill';
import express from 'express';
import compression from 'compression';
import { matchRoutes } from 'react-router-config';
import Routes from './client/routes';
import renderer from './helpers/renderer';
import createStore from './store/createStore';

const port = process.env.PORT || 3000;

const app = express();

const shouldCompress = (request, response) => {
    if (request.headers['x-no-compression']) return false;
    return compression.filter(request, response);
}
app.use(compression({
    level: 2, // set compression level from 1 to 9 (6 by default)
    filter: shouldCompress // set predicate to determine whether to compress
}));

// To be able to serve static files
app.use(express.static('public'));

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get('*', (request, response) => {
    
    // We create store before rendering html and We pass store to renderer
    const store = createStore();

    // Checks the given path, matches with component and returns array of items about to be rendered
    const routes = matchRoutes(Routes, request.path);
    const promises = routes.map(({ route }) => route.loadData ? route.loadData(store) : Promise.resolve(null));

    Promise.all(promises).then(() => {
        const context = {};
        const content = renderer(request, store, context);

        response.send(content);
    });
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})
