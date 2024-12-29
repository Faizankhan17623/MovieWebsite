require('dotenv').config()
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    host: process.env.Host_Name,
    port: 587,
    secure: false,
    auth: {
      user: process.env.User_Name,
      pass: process.env.Password_Name,
    },
})
module.exports = transporter