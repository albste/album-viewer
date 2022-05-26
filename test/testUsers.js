var supertest = require("supertest");
var should = require("should"); 
var server = supertest.agent("http://localhost:3001"); 

describe("USERS unit test", function () {
 
    it("should return the users id list", function (done) {
        server
            .get("/users")
            .expect("Content-type", /json/)
            .expect(200) // THis is HTTP response
            .end(function (err, res) {
                // HTTP status should be 200
                res.status.should.equal(200);
                res.body.should.not.have.property('error');
                done();
            });
    });
});