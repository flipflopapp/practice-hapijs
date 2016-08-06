const supertest = require('supertest-as-promised');
const should = require('should');
const path = require('path');

const app = require( path.join(process.cwd(), 'app.js') );
const request = supertest(app.server);

describe("test api /markdown", () => {

    describe("test POST call", () => {

        it("valid requests", (done) => {
        });

        it("invalid requests", (done) => {
        });
    
    });
    
    describe("test GET call", () => {
        
        it("valid requests", (done) => {
        });

        it("invalid requests", (done) => {
        });
    
    });

});
