const express = require('express')
const route = express.Router()
const {auth,IsAdmin} = require('../middlewares/verification')
const {CreateOtp,Createuser,login,GetAllUsers} = require('../controllers/auth') 
route.post('/otp',CreateOtp)
route.post('/SignUp',Createuser)
route.post('/SignIn',login)
route.get('/user',auth,IsAdmin,GetAllUsers)
module.exports = route
// This is somethings important and is going to neeed in the future pelase keep it
// route.post('/otp',(req,res)=>{
//     res.redirect('/newOtp')
// },CreateOtp)