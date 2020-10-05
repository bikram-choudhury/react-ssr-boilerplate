import React from 'react';
import { renderToString } from 'react-dom/server';
import Path from 'path';
import fs from 'fs';
import App from './src/App';
import getTodos from './src/todos';
import express from 'express';
import serializeJavascript from 'serialize-javascript';

const app = express();

app.use(express.static('./public'));

app.get('**', (req, res) => {
    getTodos().then(todos => {
        const html = renderToString(<App todos={todos} />);
        const indexFile = Path.resolve('./build/index.html');

        fs.readFile(indexFile, 'utf8', (err, content) => {
            if (err) {
                console.error('Something went wrong:', err);
                return res.status(500).send('Oops, better luck next time!');
            }
            res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
            return res.send(
                content
                    .replace('<!-- ::APP:: -->', html)
                    .replace('</body>',
                        `<script>window.__ROUTE_DATA__ = ${serializeJavascript(todos)}</script></body>`
                        //  can be accessed by staticContext when rendering on the server
                    )
            );
        });
    })
})

app.listen(3000, () => {
    console.log("server listening 3000");
});