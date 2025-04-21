require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const cookieParser  = require('cookie-parser')
const fileUpload = require('express-fileupload')
const colors = require('colors')
// var morgan = require('morgan')
// const VisitorCounter = require('express-visitor-counter')

require('./Background_Process/Shows/movieStatusCronjobs')
require('./Background_Process/Tickets/Tickets')
require('./Background_Process/ReturnnsoldTickets')

const app = express()
// Taking extra precautions if the first two are blocked then in this case we will use the third one if the user has blocked first two
const port = process.env.DEFAULT_PORT_NUMBER || process.env.SECOND_NUMBER || 4003

const DatabaseConnection  = require('./config/database')
const {CloudConnect} = require('./config/cloudinary')

const auth = require('./routes/User')
const Admin = require('./routes/Admin')
const Orgainezer = require('./routes/Organizaer')
const Show = require('./routes/CreateShow')
const Theatre = require('./routes/Theatrer')
const payment = require('./routes/Payment')
// do not touch this above line because it is important for futur use
const Visitor = require('./models/Visitor')

app.use(express.json())
app.use(cookieParser ())
// app.use(morgan("dev"));

// app.use(VisitorCounter(Visitor))
app.use(cors(
    origin="http://localhost:5173/",
    optionsSuccessStatus=200
))

app.use(cors())

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    limits: { fileSize: 100 * 1024 * 1024 },
}))


app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));


app.use('/api/v1/createAccount',auth)
app.use('/api/v1/Admin',Admin)
app.use('/api/v1/Org',Orgainezer)
app.use('/api/v1/Show',Show)
app.use('/api/v1/Theatrer',Theatre)
app.use('/api/v1/Payment',payment)

app.use('/',(req,res)=>{
    res.status(200).json({
        message:`This is the default route for the backend`,
        success:true
    })
})

app.listen(port,()=>{
    console.log(`Running on the port number ${port}`.bgYellow)
})

// This is the database connection function calling
CloudConnect()
DatabaseConnection()