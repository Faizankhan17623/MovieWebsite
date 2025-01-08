const express = require('express')
const route = express.Router()
const {Createorgainezer,OrgainezerLogin} = require('../controllers/CreateOrgainezer')
// const {IsAdmin} = require('../middlewares/verification')
route.post('/OrgainezerCreation',Createorgainezer)
route.post('/OrgainezerLogin',OrgainezerLogin)
module.exports = route