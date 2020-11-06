var express = require("express");
var app     = express();
var api     = require("./api/api"); // this is the express router
require("./middleware/appMiddleware")(app)

app.use("/api/",api);



module.exports = app;