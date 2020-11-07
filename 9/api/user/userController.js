let User = require("./userModel");
let _    = require("lodash");

exports.params = (req,res,next,id)=>{
    // this function will take the
    // parameter and do what
    User.findById(id)
        .then((user)=>{
            if(!user){
                next(new Error("NO USER WITH THAT ID"));
            }else{
                req.user = user;
                next();
            }
            // the then gives promises
            // if it return error you need to handle it
        },(err)=>{
            next(err);
        })
}

// get all the user
exports.get = (req,res,next)=>{
    User.find({})
        .then((users)=>{
            res.json(users)
        },(err)=>{
            next(err);
        })
}

// get one user with the id
exports.getOne = (req,res,next)=>{
    // the id is handled with the
    // params so we fetch the user with the req.user
    let user = req.user;
    res.json(user)
};

// update the user
exports.put = (req,res,next)=>{
    // put already has a id
    // so we have the user
    let user = req.user; // this is a document of mongodb so we can save it
    let update = req.body;
    _.merge(user,update); // replace the user
    user.save((err,saved)=>{
        if(err){
            next(err); // pass the error
        }else {
            res.json(saved); // return the response
        }
    })
};

exports.post = (req,res,next)=>{
    let newUser = req.body;
    // using promises
    // you can do it with async and await too
    User.create(newUser)
        .then((user)=>{
            res.json(user)
        },(err)=>{
            // this is the promise error handling
            next(err);
        })
}

exports.delete = function(req,res,next){
    // already have an id
    req.user.remove((err,removed)=>{
        if(err){
            next(err);
        }else{
            res.json(removed)
        }
    })
}