const mongoose = require('mongoose')
const ticketBookingSchema = new mongoose.Schema({
    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
        required: true,
    }],
    // ticketid:[{
    //     type:String,
    //     required:true
    // }],
    ticketbooked:{
        type:String,
        required:true,
    },
    paymentId:{
        type:String
    },
    paymentType:{
        type:String
    }

},{timestamps:true})
module.exports = mongoose.model('ticketboooking',ticketBookingSchema)