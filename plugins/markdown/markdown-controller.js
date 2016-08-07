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
    return reply('get API called');
}

function create(req, reply) {
    let markdown = req.payload.markdown;
    let html = this.convertToHtml(markdown); // expensive!!
    return reply({html});
}

function update(req, reply) {
    return reply('update API called');
}

module.exports = MarkdownController;
