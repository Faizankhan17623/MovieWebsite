const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        maxlength :20,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5
    },
    confirmpass:{
        type:String,
        required:true,
    },
    token:{
        type:String
    },
    id:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    usertype:{
        type:String,
        required:true,
        enum:["Viewer","Organizer","Administrator"],
        default:"Viewer"
    },
    verified:{
        type:Boolean,
        default:false
    },
    number:{
        type:String,
        required:true,
        match: [/^\d{10}$/, "Invalid phone number"],
    },
    image:{
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
    },
    categoriesCreated:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categories"
    }
},{timestamps:true})
module.exports = mongoose.model('user',userSchema)