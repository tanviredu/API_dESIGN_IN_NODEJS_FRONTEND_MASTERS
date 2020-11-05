// this server will be in express
// with global middleware and the 
// front and will be don with jquery
// and axios
var express    = require("express");
var bodyParser = require("body-parser");
var _          = require("lodash");
const app      = express();
const PORT     = 3000;

// global middleware
// this is the global middleware
app.use(express.static("../client"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// this is the database [the array]
var lions = [];
var id    = 0;


// this is the whole get
app.get('/lions',(req,res)=>{
    res.json(lions);
});

// this is the single get
app.get('/lions/:id',(req,res)=>{
    // use the uderscorejs/lodash to try to make a partial match
    var lion = _.find(lions,{id:req.params.id});
    // either send the lion that is found
    // or return the {}
    res.json(lion||{});
});

app.post('/lions',(req,res)=>{
    // take the posted value
    // take everything except the id
    // we are not posting the id
    // id will be auto generated

    var lion = req.body;
    id++;
    // making it string 
    // when stroing everything
    lion.id = id+ "";
    lions.push(lion);
    res.json(lion);
})

app.put('/lions/:id',(req,res)=>{
    var update = req.body;
    // if it has an id remove it 
    // cause we assign it new id
    // after updating it
    if(update.id){
        delete update.id;
    }
    // find the index of the lions
    // remember this id is string 
    /// we are searching
    var lionIndex = _.findIndex(lions,{id:req.params.id})
    // check if the index is even exists
    if(!lions[lionIndex]){
        res.send(); // nothing
    }else{
        // update the value if the index
        // or replace the data
        // we update the array
        // so it will saved in the array
        var updatedlion = _.assign(lions[lionIndex],update);
        res.json(updatedlion);
    }


})


// make a delete request
app.delete("/lions/:id",(req,res)=>{
    try{
        var objIndex = _.findIndex(lions,{id:req.params.id});
        var data = _.remove(lions,lions[objIndex]);
        res.json(data)
    }catch{

    }
})


app.listen(PORT,()=>{
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});