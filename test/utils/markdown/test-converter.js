'use strict';

const assert = require('assert');
const path = require('path');

const markdown_module = path.join(process.cwd(), 'utils', 'markdown', 'converter.js'); 

const convert = require(markdown_module);
const testdata = require('./testdata');

describe('test markdown to html conversion', () => {

    it('tests headings', (done) => {
        let errs = [];
        for(let [markdown, expect] of testdata.headers) {
            const result = convert(markdown).toString();
            if (expect !== result) {
                errs.push( ['Expected: ', expect, 'Actual: ', result, 'Markdown: ', markdown].join('\n') );
            }
        }
        assert(errs.length === 0, new Error(errs.join('\n.\n')));
        done();
    });

    it('tests bold and italics formatting', (done) => {
        let errs = [];
        for(let [markdown, expect] of testdata.formatting) {
            const result = convert(markdown).toString();
            if (expect !== result) {
                errs.push( ['Expected: ', expect, 'Actual: ', result, 'Markdown: ', markdown].join('\n') );
            }
        }
        assert(errs.length === 0, new Error(errs.join('\n.\n')));
        done();
    });

});
