const express  = require("express");
const mongoose = require("mongoose");
const config   = require("./config/config")
const api      = require("./api/api");
const port     = 3000;
const app      = express();
require("./middleware/appMiddleware")(app)
app.use("/api",api);

const url     = config.mongourl;
const connect = mongoose.connect(url);
connect.then(()=>{
    console.log("[+] Database is connect");
    app.listen(port);
    console.log("[+] Server is started");
})

// you can expose this app even after the server is running
module.exports = app;