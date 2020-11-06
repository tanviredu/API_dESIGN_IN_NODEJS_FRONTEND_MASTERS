var express    = require("express");
var bodyParser = require("body-parser") 
var _          = require("lodash");
var morgan     = require("morgan");
app = express();

var lionRouter  = require("./lions");
var tigerRouter = require("./tigers"); 


app.use(morgan("dev"));
app.use(express.static('../client'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());


app.use("/lions",lionRouter);
app.use("/tigers",tigerRouter);


app.use(function(err,req,res,next){
    if(err){
        res.status(500).send(err);
    }
})



// for testing we are not going to run this server
// we aer going to export

// app.listen(3000,()=>{
//     console.log("SERVER RUNNING");
// })

module.exports = app;