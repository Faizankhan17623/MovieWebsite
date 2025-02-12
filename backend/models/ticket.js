const mongoose = require('mongoose')
const CreateTicket = new mongoose.Schema({
    showid:{
        type:String,
        required:true
    },
    showtype:{
        type:String,
        required:true
    },
    overallTicketCreated:{
        type:Number,
        required:true
    },
    priceoftheticket:{
        type:String,
        required:true
    },
    typeofticket:{
        type:String,
        required:true
    },
    showtime:{
        type:String,
        required:true
    },
    showDate:{
        type:String,
        required:true
    }
},{timestamps:true})
module.exports = mongoose.model('Ticket',CreateTicket)