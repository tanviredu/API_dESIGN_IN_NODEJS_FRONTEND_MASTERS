// THIS WILL BE  A TODO APP
// AND WE HAVE TO DEPLOY THIS API IN
// GLITCH
// DATABASE WILL BE MONGODB AND CLOUD HOSTED
const express  = require("express");
const mongoose = require("mongoose");
const config   = require("./config/config");
const app      = express();
const port     = 3000; 
const api      = require("./api/api");
require("./middleware/appMiddleware")(app)
app.use("/api",api);



const url     = config.mongourl;
const connect = mongoose.connect(url);
connect.then(()=>{
    console.info("[+] Database is Connected");
    app.listen(port);
    console.info("[+] Server Started");
})


// you can export even after starting server
module.exports = app