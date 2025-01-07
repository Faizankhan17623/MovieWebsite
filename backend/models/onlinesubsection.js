const mongoose  = require("mongoose");
const subsectionsschema = new mongoose.Schema({
    title:[{
        type:String,
        required:true
    }],
    video:[
        {
            type:String
        }
    ]
},{timestamps:true})
module.exports = mongoose.model('onlinesubsection',subsectionsschema)