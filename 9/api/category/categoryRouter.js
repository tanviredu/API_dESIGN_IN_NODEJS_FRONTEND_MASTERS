let router       = require("express").Router();
let controller   = require("./categoryController");
let createRoutes = require("../../util/createRoute");
createRoutes(controller,router);
module.exports = router;