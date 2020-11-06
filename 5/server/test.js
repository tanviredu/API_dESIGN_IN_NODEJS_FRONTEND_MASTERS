// THIS TEST MODULE IS JUST LIKE 
// AJAX/AXIOS FETCH THE DATA AND TEST IT
// you need to install mocha globally 
// npm install -g mocha
// => ./node_modules/mocha/bin/mocha server/test.js


var app     = require("./server");
var request = require("supertest");
var expect =  require("chai").expect;

// WE ARE  GOING TO TEST THE TIGER
// Each describe is a separate Test function
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

    // Create a Tiger
    it("SHOULD CREATE A TIGER",function(done){
        request(app)
        .post("/lions")
        .send({
            name: "Tanvir",
            breed: "human"
        })
        .set("Accept","application/json")
        .expect("Content-Type","/json/")
        .expect(201)
        .end(function(err,resp){
            expect(resp.body).to.be.an("object");
            done();
        })
    })


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
    // Create a Lion
    it("SHOULD CREATE A LION",function(done){
        request(app)
        .post("/lions")
        .send({
                name: "Tanvir",
                breed: "human"
         })
         .set("Accept",'applicaion/json')
         .expect("Content-Type",'/json/')
         .expect(201)
         .end(function(err,resp){
             expect(resp.body).to.be.an("object");
             done();
         })
    })
})



// YOU HAVE TO REMEMBER BEFORE MAKING ANY
// DELETE REQUEST YOU NEED TO POST SOMETHING
// DELETE A LION AND TIGER IS SAME

describe("[LIONS DELETE]",function(){
    it("SHOULD DELETE A LION",function(done){
        request(app)
        .post("/lions")
        .send({
            name:"Tanvir",
            breed:"human"
        })
        .set("Accept","application/json")
        .expect("Content-Type",'/json/')
        .expect(201)
        .end(function(err,resp){
            var lion = resp.body;
            request(app)
            .delete("/lions/"+lion.id)
            .end(function(err,resp){
                expect(resp.body).to.eql(lion);
                done();
            })
        })
})

})



// DELETE A TIGER
describe("[TIGER DELETE]",function(){
    it("IT SHOULD DELETE A TIGER",function(done){
        request(app)
        .post("/tigers")
        .send({
            name:"Royal bengal",
            breed:"Bangladeshi"
        })
        .set("Accept","application/json")
        .expect("Content-Type","/json/")
        .expect(201)
        .end(function(err,resp){
            var tiger = resp.body;
            request(app)
            .delete("/tigers/"+tiger.id)
            .end(function(err,resp){
                expect(resp.body).to.eql(tiger);
                done();
            })
        })
    })
})


// this test is for making a single lion

describe("[GET SINGLE LION]",function(){
    it("SHOULD GET A SINGLE LION",function(done){
        request(app)
        .get("/lions/"+1)
        .set("Accept","application/json")
        .expect("Content-Type","/json/")
        .expect(200)
        .end(function(err,resp){
            expect(resp.body).to.be.an("object");
            done();
        })
    })
})
