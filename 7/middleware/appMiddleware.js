const bodyParser = require("body-parser");
const morgan     = require("morgan");
module.exports = function(app){
    // this are the global middleware
    app.use(morgan("dev"));
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())
}