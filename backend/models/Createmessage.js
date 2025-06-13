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
        enum:['Chat','enquiry','Personal'],
        default:'Chat'
    },
    showid:{
        type:String
        // required:true
    }
},{timestamps:true})
module.exports = mongoose.model("Message",CreateMessageSchema)