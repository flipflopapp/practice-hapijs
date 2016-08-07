'use strict';

const Validator = require('./markdown-schema');
const Controller = require('./markdown-controller');

exports.register = (server, options, next) => {
    const controller = new Controller(options.database, options.converter);

    server.bind(controller);
    server.route([
        {
            method: 'GET',
            path: '/markdown/get/{id}',
            config: {
                handler: controller.get,
                validate: Validator.get()
            }
        },
        {
            method: 'POST',
            path: '/markdown/save',
            config: {
                handler: controller.create,
                validate: Validator.create()
            }
        } /*,
        {
            method: ['PATCH', 'POST', 'PUT'],
            path: '/markdown{id}',
            config: {
                handler: controller.update,
                validate: Validator.update()
            }
        } */
    ]);

    next();
}

exports.register.attributes = {
    name: 'markdown-route',
    version: '1.0.0'
};

