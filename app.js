'use strict';

// setup HAPI

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
    host: process.env.SERVER_HOST || 'localhost',
    port: process.env.SERVER_PORT || 3000
});

// API logging
/*
server.on('response', function (request) {
    console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode);
});
*/

// setup mongo

const mongoose = require('mongoose');

const DB_URI = "mongodb://localhost:27017/markdown"; // TODO use config

mongoose.connect(DB_URI);

mongoose.connection
.on('connected', () => console.log('db connected'))
.on('disconnected', () => console.log('db disconnected'))
.on('error', (err) => console.log(`db error ${err.message}`));

// models

const database = require('./store/models');

// plugins

server.register(
    [
        require('./config/logs'),
        {
            register: require('./config/plugins'),
            options: { database }
        }
    ],
    (err) => {
        if(err) {
            console.error('Failed to load a plugin:', err);
            throw err;
        }

        server.start((err) => {
            console.log(`Server started at ${server.info.uri}`);
        });
    }
 );

// if env is test - expose db

if (process.env.NODE_ENV == 'test') {
    module.exports = { db };
}
