var _ = require("lodash");
var tigerRouter = require("express").Router();


var tigers = [];
var id   = 0;

// this is the custom middleware
var updateId = function(req,res,next){
    if(!req.body.id){
        // auto generate the id field
        // if there is not any
        id++;
        req.body.id = id +""; // convert it to the string
    }
    next(); // go to the next

}

// this is error handling middleware
// the error handling middleware should have a err in the parameter
// with the other middleware

tigerRouter.use(function(err,req,res,next){
    if(err){
        res.status(500).send();
    }

});

// this is a parameter based middleware
// this will decide what to do with the 
// paramter and then what to do with that
// what you will do if the id is in the parameter
// it is used to abstract the common functionality
// it run when it detects the id in the query parameter
// then you need to show what it will do with the id

tigerRouter.param('id',(req,res,next,id)=>{
    // it will also take the id as a 
    // parameter
    var tiger = _.find(tigers,{"id":id});
    if(tiger){
        req.tiger = tiger; // make a new property in request object
        next();
    }else{
        res.send();
    }
});



tigerRouter.get("/",(req,res)=>{
    res.json(tigers);
});

tigerRouter.get("/:id",(req,res)=>{
    // take the value from the middleware
    var tiger = req.tiger;
    res.json(tiger || {});
});

// apply the route level middleware

tigerRouter.post('/',updateId,(req,res)=>{
    var tiger = req.body;
    tigers.push(tiger);
    res.json(tiger);
})

// you cant use this updateId middleware
// here because it already have id 
// you need to delete this
tigerRouter.put("/:id",(req,res)=>{
    var update = req.body;
    if(update.id){
        delete update.id;
    }

    var tigerIndex = _.findIndex(tigers,{id:req.params.id});
    if(!tigers[tigerIndex]){
        res.send();
    }else{
        var updatedTiger = _.assign(tigers[tigerIndex],update);
        res.json(updatedTiger);
    }
})


module.exports = tigerRouter;