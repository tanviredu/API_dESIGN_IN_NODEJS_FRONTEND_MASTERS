const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

var UserSchema = new Schema({
    username:{
        type:String,
        unique:true,
        require:true
    }
})

//method will be added like 
// class method
// and instane method 

module.exports = mongoose.model("user",UserSchema);