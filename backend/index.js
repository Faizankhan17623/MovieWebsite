require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser  = require('cookie-parser')
const fileUpload = require('express-fileupload')
const colors = require('colors')
var morgan = require('morgan')

const port = process.env.DEFAULT_PORT_NUMBER || process.env.SECOND_NUMBER || 4003

const DatabaseConnection  = require('./config/database')
const {CloudConnect} = require('./config/cloudinary')
const auth = require('./routes/User')
const Admin = require('./routes/Admin')
const Show = require('./routes/CreateShow')
const OrgLogin = require('./routes/CreateCast')

app.use(express.json())
app.use(cookieParser ())
app.use(morgan("dev"));
app.use(cors(
    origin="http://localhost:5173/",
    optionsSuccessStatus=200
))

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    limits: { fileSize: 100 * 1024 * 1024 },
}))
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
// This are going tof be the main urls 

app.use('/api/v1/createAccount',auth)
app.use('/api/v1/Admins',Admin)
app.use('/api/v1/ShowCreation',Show)
app.use('/api/v1/Cast',OrgLogin)

app.use('/',(req,res)=>{
    res.status(200).json({
        message:"This is the default route for the backend",
        success:true
    })
})

app.listen(port,()=>{
    console.log(`Running on the port number ${port}`.white.bgYellow)
})

// This is the database connection function calling
CloudConnect()
DatabaseConnection()

// This is somethings important and is going to neeed in the future pelase keep it
// route.post('/otp',(req,res)=>{
//     res.redirect('/newOtp')
// },CreateOtp)