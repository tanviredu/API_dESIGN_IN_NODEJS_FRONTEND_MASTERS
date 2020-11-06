// EXPRESS ROUTER
// BREAK THE APP IN MINI APP
// AND IN SEPARATE FILE
var express    = require("express");
var bodyParser = require("body-parser");
var _          = require("lodash");
var morgan     = require("morgan");
const app      = express();
const PORT     = 3000;

// importing the file
var lionsRouter = require("./lions");
var tigerRouter = require("./tigers");



// APPLY THE GLOBAL MIDDLEWARE
app.use(morgan('dev'));
app.use(express.static("../client"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



// setting the branch route

app.use("/lions",lionsRouter);
app.use("/tigers",tigerRouter);


// THE ERROR HANDLING
app.use(function(err,req,res,next){
    if(err){
        console.log(err.message);
        res.status(500).send(err);
    }

});


app.listen(PORT,()=>{
    console.log("SERVER HAS STARTED");
})