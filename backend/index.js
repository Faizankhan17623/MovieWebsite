require('dotenv').config()
const express = require('express')
const cloudinary = require('cloudinary')
const cors = require('cors')
const cookieParser  = require('cookie-parser')
const app = express()

const port = process.env.DEFAULT_PORT_NUMBER || process.env.SECOND_NUMBER || 4003

const DatabaseConnection  = require('./config/database')
const auth = require('./routes/auth')
app.use(express.json())
app.use(cookieParser ())
app.use(cors(
    origin="http://localhost:5173/",
    optionsSuccessStatus=200
))


cloudinary.config({
    secure:true
})



// This are going to be the main urls 
app.use('/api/v1/createAccount',auth)

app.use('/',(req,res)=>{
    res.json({
        message:"This is the default route",
        success:true
    })
})
app.listen(port,()=>{
    console.log("This is running on the port number",port)
})
// This is the database connection function calling
DatabaseConnection()