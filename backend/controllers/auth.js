const user = require('../models/user')
const jwt = require('jsonwebtoken')
const decrypt = require('decrypt')
const transporter = require('../config/nodemailer')
// This is the user sign in 
const Createsign  = async(req,res) =>{
    try {
        const {} = req.body
    } catch (error) {
        console.log(error)
        console.log(error.message)
        return res.json({
            message:"There is na error in the code"
        })
    }
}
module.exports = {
    Createsign,
}