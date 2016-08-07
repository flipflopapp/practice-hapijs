const should = require('should');
const path = require('path');

const { server, database } = require( path.join(process.cwd(), 'app.js') );
const agent = require('supertest-as-promised').agent(server.listener);

describe("test api /markdown", () => {

    describe("test POST call", () => {

        it("valid requests", (done) => {
            let testdata = { md: '## header', html: '<h2>header</h2>' };
            agent
            .post('/markdown/save')
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
        })

        it("invalid requests - no 'markdown' field", (done) => {
            agent
            .post('/markdown/save')
            .expect(400)
            .end(done);
        })
        
        it("invalid requests - empty markdown field", (done) => { 
            agent
            .post('/markdown/save')
            .field('markdown', '')
            .expect(400)
            .end(done);
        })
        
    })
    
    describe("test GET call", () => {

        let response;

        before((done) => {
            let testdata = { md: '## header', html: '<h2>header</h2>' };
            agent
            .post('/markdown/save')
            .field('markdown', testdata.md)
            .expect(201)
            .then(res => {
                response = res.body;
                done();
            })
            .catch(done);
        })
        
        it("valid requests", (done) => {
            agent
            .get(`/markdown/get/${response._id}`)
            .expect(200)
            .then((res) => {
                const body = res.body;
                body._id.should.equal(response._id);
                body.__v.should.equal(response.__v);
                body.html.should.equal(response.html);
                body.markdown.should.equal(response.markdown);
                body.createdOn.should.equal(response.createdOn);
                done();
            })
            .catch(done);
        });

        it("invalid requests", (done) => {
            agent
            .get(`/markdown/get/${response._id}*`) // added a '*' to id
            .expect(400)
            .end(done);
        });
    
    });

});
