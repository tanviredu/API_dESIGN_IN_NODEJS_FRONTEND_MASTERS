var express    = require("express");
var bodyParser = require("body-parser");
var _          = require("lodash");
var logger     = require("morgan");
const app      = express();
const PORT     = 3000;

// this is the global middleware

app.use(express.static("../client"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(logger('dev'));




var lions = [];
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

app.use(function(err,req,res,next){
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

app.param('id',(req,res,next,id)=>{
    // it will also take the id as a 
    // parameter
    var lion = _.find(lions,{"id":id});
    if(lion){
        req.lion = lion; // make a new property in request object
        next();
    }else{
        res.send();
    }
});



app.get("/lions",(req,res)=>{
    res.json(lions);
});

app.get("/lions/:id",(req,res)=>{
    // take the value from the middleware
    var lion = req.lion;
    res.json(lion || {});
});

// apply the route level middleware

app.post('/lions',updateId,(req,res)=>{
    var lion = req.body;
    lions.push(lion);
    res.json(lion);
})

// you cant use this updateId middleware
// here because it already have id 
// you need to delete this
app.put("/lions/:id",(req,res)=>{
    var update = req.body;
    if(update.id){
        delete update.id;
    }

    var lionIndex = _.findIndex(lions,{id:req.params.id});
    if(!lions[lionIndex]){
        res.send();
    }else{
        var updatedLion = _.assign(lions[lionIndex],update);
        res.json(updatedLion);
    }
})

app.listen(PORT,()=>{
    console.log(`SERVER STARTED AT PORT ${PORT}`);
})