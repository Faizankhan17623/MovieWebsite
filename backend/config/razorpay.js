require('dotenv').config()
const Razorpay = require('razorpay')
const instance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRETS,
})
.then(()=>{
    console.log("The razorpay is been connected".bgBlack)
})
.catch((error)=>{
    console.log(error)
})

module.exports = instance