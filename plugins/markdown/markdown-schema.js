'use strict';

const Joi = require('joi');

module.exports = {
    get,
    create,
    update
}

function get() {
    return {
        params: {
            id: Joi
                .string()
                .alphanum()
                .required()
        }
    };
}

function create() {
    return {
        payload: {
            markdown: Joi
                .string()
                .min(1)
                .max(2048) // max size
                .trim()
                .required()
        }
    };
}

function update() {
    return {
        payload: {
            id: Joi
                .string()
                .alphanum()
                .required()
        }
    };
}
