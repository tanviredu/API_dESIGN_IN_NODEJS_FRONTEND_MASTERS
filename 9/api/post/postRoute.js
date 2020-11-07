var router      = require("express").Router();
var controller = require("./postController");
var createRoute      = require("../../util/createRoute");
createRoute(controller,router);
module.exports = router;
