const mongoose = require('mongoose')
const paymentSchema = new mongoose.Schema({
    razorpay_payment_id:{
        type:String,
        required:true
    },
    razorpay_order_id:{
        type:String,
        required:true
    },
    razorpay_signature:{
        type:String,
        required:true
    },
    amount: {
        type: Number,
        required: true,
    },
    Payment_Status: {
        type: String,
        enum: ["success", "failure", "pending"],
        default: "pending",
    },
},{timestamps:true})
module.exports = mongoose.model("payment",paymentSchema)