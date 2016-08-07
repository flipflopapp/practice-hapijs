'use strict';

function MarkdownController(database, converter) {
    this.database = database;
    this.model = database.Markdown;
    this.convertToHtml = converter;
}

MarkdownController.prototype = {
    get,
    create,
    update
};

function get(req, reply) {
    let _id = req.params.id;

    this.model.findOneAsync({ _id })
    .then(doc => {
        reply(doc).code(200);
    })
    .catch(err => {
        reply.badImplementation(err.message);
    });
}

function create(req, reply) {
    let markdown = req.payload.markdown;
    let html = this.convertToHtml(markdown); // expensive!!

    this.model
    .createAsync({ markdown, html })
    .then(doc => {
        reply(doc).code(201);
    })
    .catch(err => {
        reply.badImplementation(err.message);
    });
}

function update(req, reply) {
    return reply('update API called');
}

module.exports = MarkdownController;
