const express = require('express')
const route = express.Router()
const {Createsign} = require('../controllers/auth') 
route.post('/THis is the postroute',Createsign)
module.exports = route