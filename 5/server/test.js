// THIS TEST MODULE IS JUST LIKE 
// AJAX/AXIOS FETCH THE DATA AND TEST IT
// you need to install mocha globally 
// npm install -g mocha
// ./node_modules/mocha/bin/mocha server/test.js


var app     = require("./server");
var request = require("supertest");
var expect =  require("chai").expect;

// WE ARE  GOING TO TEST THE TIGER
describe("[TIGERS]",function(){
    it("SHOULD GET ALL THE TIGERS",function(done){
        request(app)
        .get("/tigers")
        .set("Accept",'Application/json') // setting that we take the data based on JSON
        .expect('Content-Type','/json/')  // this is the content type that we are excepting
        .expect(200)
        .end(function(err,resp){
            // after getting the data
            expect(resp.body).to.be.an("array");
            done()
        })
    });
})


describe("[LIONS]",function(){
    it("SHOULD RETUEN ALL THE LIONS",function(done){
        request(app)
        .get("/lions")
        .set("Accept","Application/json")
        .expect(200)
        .end(function(err,resp){
            expect(resp.body).to.be.an("array");
            done();
        })
    })
})


// Create a Lion

// Create a Tiger