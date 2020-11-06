var router         = require("express").Router();
var userRouter     = require("./user/userRouter");
var categoryRouter = require("./category/categoryRouter");
var postRouter     = require("./post/postRouter");


router.use("/posts",postRouter);
router.use("/categories",categoryRouter);
router.use("/users",userRouter);


module.exports = router;