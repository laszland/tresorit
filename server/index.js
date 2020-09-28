'use strict';

const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');

const app = express();
const directoryToServe = 'client';
const port = 4000;

app.use('/', express.static(path.join(__dirname, '..', directoryToServe)));
app.use('/session', express.static(path.join(__dirname, '..', directoryToServe, 'session.html')));
app.use('/reciever', express.static(path.join(__dirname, '..', directoryToServe, 'reciever.html')));

const httpsOptions = {
  cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
  key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key'))
};

https.createServer(httpsOptions, app).listen(port, () => {
  console.log(`Serving the ${directoryToServe}/ directory at https://localhost:${port}`);
});
