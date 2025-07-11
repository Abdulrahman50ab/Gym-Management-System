const mongoose = require("mongoose");

const gymschema = mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
       username:{
        type:String,
        required:true,
        unique:true
    },
       password:{
        type:String,
        required:true,
    },
       profilepic:{
        type:String,
    },
       gymname:{
        type:String,
        required:true,
    },
       resetpasswordtoken:{
        type:String,
    },
       resetpasswordexpire:{
        type:Date,
    }
},{timestamps:true})

const modal = mongoose.model("gym",gymschema);
module.exports = modal;