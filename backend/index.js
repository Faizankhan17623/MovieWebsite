require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT_NUMBER || 4001
const DatabaseConnection  = require('./config/database')
const mailSenders = require('./utils/mailsender')
const cloduinary = require('./config/cloudinary')
app.use(cors(
    origin="http://localhost:5173/",
    optionsSuccessStatus=200
))
cloduinary.config({
    secure:true
})
app.use('/',(req,res)=>{
    res.json({
        message:"This is the default route",
        success:true
    })
})
mailSenders('This is the testing of the new code','fk3701@gmail.com',"This is the testing","testing")
app.listen(port,()=>{
    console.log("This is running on the port number",port)
})

DatabaseConnection()
cloduinary()