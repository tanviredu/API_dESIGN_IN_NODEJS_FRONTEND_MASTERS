var express    = require("express");
var bodyParser = require("body-parser");
var _ = require("lodash");
var app = express(); 



// global middleware
// for serviing static content
// search for index html and put in the root get request
// specfy the folder and it will serve everything 
// html css client side js everything

app.use(express.static('client'));

// for handling json with body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// the lion storage
var lions = []

// the Id initializer
var id = 0;

