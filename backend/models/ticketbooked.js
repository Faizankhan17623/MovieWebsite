const mongoose = require('mongoose')
const ticketBookingSchema = new mongoose.Schema({
    ticketid:[{
        type:String,
        required:true
    }],
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

})
module.exports = mongoose.model('ticketboooking',ticketBookingSchema)