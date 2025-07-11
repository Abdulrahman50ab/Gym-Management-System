const mongoose = require("mongoose");

const Membershipschema = mongoose.Schema({
    months:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    gym:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"gym",
        required:true
    }
},{timestamps:true})

const modalMembership = mongoose.model("membership",Membershipschema)

module.exports = modalMembership;