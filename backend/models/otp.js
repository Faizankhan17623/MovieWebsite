const mongoose  = require("mongoose");
const mailSenders = require("../utils/mailsender");
const sendingOtpTeemplate = require('../templates/emailTemplate')
const otpschema = new mongoose.Schema({
    otp:{
        type:String,
        required:true
    },
    email:{type:String,required:true},
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60 * 1
    },
},{timestamps:true})

async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSenders(email, "Verification Email", sendingOtpTeemplate(otp));
        console.log("Mail sent successfully:", mailResponse);
    } catch (error) {
        console.error("Error in sendVerificationEmail:", error.message);
        throw new Error("Failed to send verification email");
    }
}

otpschema.pre("save", async function (next) {
    console.log("New document saved to the DB");
    try {
        if (this.isNew) {
            await sendVerificationEmail(this.email, this.otp);
        }
        next();
    } catch (error) {
        console.log("Error in thee email sending code",error.message)
       next() 
    }
});
module.exports =mongoose.model("otp",otpschema) 