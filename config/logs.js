'use strict';

const Good = require('good');

exports.register = (server, options, next) => {
    const opts = {
        //ops: { interval: 1000 },
        reporters: {
            console: [
            {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    log: '*',
                    response: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout'],

            file: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ ops: '*' }]
            }, {
                module: 'good-squeeze',
                name: 'SafeJson',
                args: [
                    null,
                    { separator: ',' }
                ]
            }, {
                module: 'rotating-file-stream',
                args: [
                    'ops_log',
                    {
                        size: '1000B',
                        path: './logs'
                    }
                ]
            }]
        }
    };

    server.register({
        register: Good,
        options: opts
    }, (err) => {
        return next(err);
    });
};

exports.register.attributes = {
    name: 'logs',
    version: '1.0.0'
};
