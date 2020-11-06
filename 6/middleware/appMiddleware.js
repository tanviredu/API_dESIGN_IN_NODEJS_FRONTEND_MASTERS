var morgan     = require("morgan");
var bodyParser = require("body-parser");
const app = require("../server");


// you can exports anything with module.exports
// it will take  a parameter
// then it will set it up
// so we are exporting a function

module.exports = function(app){
    // this are the global middleware
    app.use(morgan("dev"));
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())
}