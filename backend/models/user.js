const mongoose = require('mongoose')
const userSchema =  new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        maxlength :20,
        unique:true
    },
    password :{
        type:String,
        required:true,
        maxlength:15
    },
    confirmpass:{
        type:String,
        required:true,
        maxlength:15
    },
    token:{
        type:String
    },
    id:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    usertype:{
        type:String,
        required:true,
        enum:["Viewer","Organizer","administrator"],
        default:"Viewer"
    },
    verified:{
        type:Boolean,
        // required:true
    },
    number:{
        type:String,
        required:true
    },
    showscreated:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"shows"
    },
    ticketcreated:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ticket"
    },
    ticketBooked:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ticketboooking"
    }
})
module.exports = mongoose.model('user',userSchema)