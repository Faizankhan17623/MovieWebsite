const mongoose  = require("mongoose");
const otpschema = new mongoose.Schema({
    otp:{
        type:String,
        required:true
    },
    email:{type:String},
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60 * 1
    },
},{timestamps:true})
module.exports = mongoose.model('otp',otpschema)
