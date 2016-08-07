'use strict';

const fs = require('fs');
const assert = require('assert');
const path = require('path');

const markdown_module = path.join(process.cwd(), 'utils', 'markdown', 'converter.js'); 

const convert = require(markdown_module);
const testdata = require('./testdata');

function helperTestfn_array(testcases, done) {
    let errs = [];
    for(let [markdown, expect] of testcases) {
        const result = convert(markdown).toString();
        if (expect !== result) {
            errs.push( ['\nExpected: ', expect, 'Actual: ', result, 'Markdown: ', markdown].join('\n') );
        }
    }
    assert(errs.length === 0, new Error(errs.join('\n.\n')));
    done();
}

function helperTestfn_file(name, done) {
    let markdown = String(fs.readFileSync( path.join(__dirname, `${name}.md`) ));
    let expect = String(fs.readFileSync( path.join(__dirname, `${name}.html`) )).trim();
    
    const result = convert(markdown).toString().trim();
    assert(expect === result, ['\nExpected: ', expect, 'Actual: ', result, 'Markdown: ', markdown].join('\n') );
    done();
}

describe('test markdown to html conversion', () => {

    it('tests headings', (done) => {
        helperTestfn_array(testdata.headers, done);
    });

    it('tests paragraph formatting', (done) => {
        helperTestfn_array(testdata.formatting, done);
    });

    it('tests links', (done) => {
        helperTestfn_array(testdata.links, done);
    });

    it('tests markdown easy block', (done) => {
        helperTestfn_file('easy_block', done);
    });
    
    it('tests markdown lists block', (done) => {
        helperTestfn_file('list_block', done);
    });

    it('tests markdown hard block', (done) => {
        helperTestfn_file('hard_block', done);
    });

});
