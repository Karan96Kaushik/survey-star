const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Adjust the path as needed
const expect = chai.expect;

chai.use(chaiHttp);

describe('App', () => {
    describe('GET /', () => {
        it('should return Hello, World! message', (done) => {
            chai.request(app)
                .get('/api/question')
                .query({ 
                    currentID: 0 
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equal('Hello, World!');
                    done();
                });
        }).timeout(5000);
    });
});

