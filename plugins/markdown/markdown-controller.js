'use strict';

function MarkdownController(database) {
    this.database = database;
    this.model = database.Markdown;
}

MarkdownController.prototype = {
    get,
    create,
    update
};

function get(request, response) {
    return response('get API called');
}

function create(request, response) {
    return response('create API called');
}

function update(request, response) {
    return response('update API called');
}

module.exports = MarkdownController;
