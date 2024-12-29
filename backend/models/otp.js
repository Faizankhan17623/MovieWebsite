const mongoose  = require("mongoose");
const otpschema = new mongoose.Schema({
    number:{type:Number,maxlength:10,required:true},
    email:{type:String},
    createdAt:{
        type:Date.now()
    },
    expiresIn:{
        type:String,
        default: 60 * 1 
    }
})

module.exports = mongoose.model('otp',otpschema)