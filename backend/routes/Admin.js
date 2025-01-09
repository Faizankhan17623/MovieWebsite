// These are the some routes kept for the admin only 
const express = require('express')
const route = express.Router()
const {AdminController,VerifyOrgaineser} = require('../controllers/Admin')
const {IsAdmin,auth} = require("../middlewares/verification")
route.get('/FindOrganizer',auth,IsAdmin,AdminController)
route.put('/VerifyOrganizer',auth,IsAdmin,VerifyOrgaineser)
module.exports = route