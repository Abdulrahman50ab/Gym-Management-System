const mongoose = require("mongoose");
const modalMembership = require("./membership");

const memberschema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mobileno: {
        type: String,
    },
    address: {
        type: String,
    },
    membership: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'membership',
        required: true,
    },
    gym: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gym',
        required: true,
    },
    profilepic:{
        type: String,
        required: true,
    },
    joiningdate:{
        type: String,
    },
    status:{
        type: String,
       default:"Active"
    },
    lastpayment: {
        type: Date,
        default:new Date()
    },
    nextbilldate:{
        type:Date,
        required:true
    }
},{timestamps:true})

const memberModel = mongoose.model("member",memberschema);
module.exports = memberModel;