const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

var UserSchema = new Schema({
    username:{
        type:String,
        unique:true,
        require:true
    }
})
module.exports = mongoose.model("user",UserSchema);