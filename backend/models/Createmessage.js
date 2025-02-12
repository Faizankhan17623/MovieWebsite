const mongoose = require('mongoose')
const CreateMessageSchema = new mongoose.Schema({
    to:{
        type:String,
        required:true,
    },
    message:[{
        type:String,
        maxlength:100,
        required:true
    }]
},{timestamps:true})
module.exports = mongoose.model("Message",CreateMessageSchema)