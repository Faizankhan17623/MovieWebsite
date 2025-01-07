const express = require('express')
const route = express.Router()
const {auth,IsAdmin} = require('../middlewares/verification')
const {CreateOtp,Createuser,login,GetAllUsers} = require('../controllers/auth') 
route.post('/otp',CreateOtp)
route.post('/SignUp',Createuser)
route.post('/SignIn',login)
route.get('/user',auth,IsAdmin,GetAllUsers)
module.exports = route