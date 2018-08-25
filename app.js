const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dev = process.env !== 'production';

const next = require('next');
const app = next({dir: './src', dev});

const handle = app.getRequestHandler();

let server = express();
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));

app.prepare()
	.then( () => {
    
    // custom route; handle ourselves
		server.get('/api', (req, res) => {
			res.send({heh: 'nice'});
    });
    
    // custom route but make next render it
    server.get('/custom-route', (req, res) => app.render(req, res, '/index'));
    // send all requests that dont match above to next to handle
		server.all('*', (req, res) => handle(req, res));

	});

module.exports = server;
