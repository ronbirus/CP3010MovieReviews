const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); 

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /api/movies', () => {
  it('should return status code 200', (done) => {
    chai.request(app)
      .get('/api/movies')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

//Could not figure out question 4 