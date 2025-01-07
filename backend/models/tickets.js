const mongoose = require('mongoose')

const TicketBookingschema = new mongoose.Schema({
    totaltickets:{
        required:true,
        type:String
    },
    premiumtickets:{
        required:true,
        type:String
    },
    viptickets:{
        required:true,
        type:String
    },
    firstclasstickets:{
        required:true,
        type:String
    },
    normaltickets:{
        required:true,
        type:String
    },
    ticketsId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ticketbooking",
        required: true,
    }
},{timestamps:true})

module.exports = mongoose.model("ticket",TicketBookingschema)