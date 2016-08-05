'use strict';

const Validator = require('./markdown-schema');
const Controller = require('./markdown-controller');

exports.register = (server, options, next) => {

    const controller = new Controller(options.database);

    server.route([
        {
            method: 'GET',
            path: '/markdown/{id}',
            config: {
                handler: controller.get,
                validate: Validator.get()
            }
        },
        {
            method: 'POST',
            path: '/markdown',
            config: {
                handler: controller.create,
                validate: Validator.create()
            }
        },
        {
            method: ['PATCH', 'POST', 'PUT'],
            path: '/markdown/{id}',
            config: {
                handler: controller.update,
                validate: Validator.update()
            }
        }
    ]);

    next();
}

exports.register.attributes = {
    name: 'markdown-route',
    version: '1.0.0'
};

