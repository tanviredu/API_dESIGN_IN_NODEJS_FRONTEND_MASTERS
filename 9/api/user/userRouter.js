let controller  = require("./userController");
let createRoute = require("../../util/createRoute")
let router  = require("express").Router();
createRoute(controller,router)

module.exports = router;