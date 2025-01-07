const mongoose  = require("mongoose");
const onlineschema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    subsections:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"onlinesubsection"
    }
},{timestamps:true})
module.exports = mongoose.model('onlinesection',onlineschema)