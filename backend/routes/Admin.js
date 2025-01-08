// These are the some routes kept for the admin only 
const express = require('express')
const route = express.Router()
const {AdminController,VerifyOrgaineser} = require('../controllers/Admin')
const {IsAdmin} = require("../middlewares/verification")
route.get('/FindOrganizer',IsAdmin,AdminController)
route.put('/VerifyOrganizer',IsAdmin,VerifyOrgaineser)
module.exports = route