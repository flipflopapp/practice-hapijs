'use strict';

const Promise = require('bluebird');
const mongoose = require('mongoose');

// create models

const MarkdownModel = mongoose.model('Markdown',
    new mongoose.Schema({
        markdown: String,
        html: String,
        createdOn: { type: Date, default: Date.now }
    })
  );

// export models

module.exports = {
    Markdown: Promise.promisifyAll(MarkdownModel)
};
