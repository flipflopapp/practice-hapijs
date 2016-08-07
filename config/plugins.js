'use strict';

exports.register = (server, options, next) => {
    let database = options.database;
    
    // load plugins
    server.register([
        {
            register: require('./../plugins/markdown/markdown-routes'),
            options: {
                database,
                converter: require('./../utils/markdown/converter.js')
            }
        } 
    ], next);
};

exports.register.attributes = {
    name: 'plugins',
    version: '1.0.0'
};
