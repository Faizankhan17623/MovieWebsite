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
        type:String,
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
    showDate:{
        type:String,
        required:true
    },
    allotedToTheatres:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Theatrees"
    }]
},{timestamps:true})
module.exports = mongoose.model('Ticket',CreateTicket)