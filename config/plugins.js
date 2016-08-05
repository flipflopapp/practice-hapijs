'use strict';

exports.register = (server, options, next) => {
    // load plugins
    server.register([
        {
            register: require('./../plugins/markdown/markdown-routes'),
            options
        } 
    ], next);
};

exports.register.attributes = {
    name: 'plugins',
    version: '1.0.0'
};
