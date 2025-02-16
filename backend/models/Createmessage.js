const mongoose = require('mongoose')
const CreateMessageSchema = new mongoose.Schema({
    to:{
        type:String,
        required:true,
    },
    message:[{
        type:String,
        maxlength:500,
        required:true
    }],
    typeOfmessage:{
        type:String,
        required:true,
        enum:['Personal','Professional','enquiry'],
        default:'Professional'
    },
    personalMessage:{
        type:Boolean,
        required:true,
        default:false
    },
    professionalMessage:{
        type:Boolean,
        required:true,
        default:false
    },
    showid:{
        type:String,
        required:true
    }
},{timestamps:true})
module.exports = mongoose.model("Message",CreateMessageSchema)