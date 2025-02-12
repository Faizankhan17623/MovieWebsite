const express = require('express')
const route  = express.Router()
const {auth,IsOrganizer} = require('../middlewares/verification')
const {CreateCast} = require('../controllers/Orgainezer/CreateCast')
route.post('/CreateCast',auth,IsOrganizer,CreateCast)
module.exports = route