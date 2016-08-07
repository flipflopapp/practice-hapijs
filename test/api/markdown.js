const should = require('should');
const path = require('path');

const { server, database } = require( path.join(process.cwd(), 'app.js') );
const agent = require('supertest-as-promised').agent(server.listener);

describe("test api /markdown", () => {

    describe("test POST call", () => {

        it("valid requests", (done) => {
            let testdata = { md: '## header', html: '<h2>header</h2>' };
            agent
            .post('/markdown')
            .field('markdown', testdata.md)
            .expect(201)
            .then(res => {
                res.body.html.should.equal(testdata.html, `incorrect html returned - ${res.body.html}`);
                should.exist(res.body._id, 'markdown _id is null');
                return database.Markdown.findOneAsync({_id: res.body._id});
            })
            .then(doc => {
                should.exist(doc, 'markdown was not saved in database');
                done();
            })
            .catch(done);
        });

        it("invalid requests - no 'markdown' field", (done) => {
            agent
            .post('/markdown')
            .expect(400)
            .end(done);
        });
        
        it("invalid requests - empty markdown field", (done) => { 
            agent
            .post('/markdown')
            .field('markdown', '')
            .expect(400)
            .end(done);
        });
        
    });
    
    describe("test GET call", () => {
        
        it("valid requests", (done) => {
            agent
            .get('/markdown/1')
            .expect(200)
            .then((res) => {
                done(null, res);
            })
            .catch(done);
        });

        it("invalid requests", (done) => {
            agent
            .get('/markdown/1!%^&2') // invalid id 
            .expect(400)
            .end(done);
        });
    
    });

});
