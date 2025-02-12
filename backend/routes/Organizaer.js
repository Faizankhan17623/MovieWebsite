const express = require('express')
const route = express.Router()
const {login} = require('../controllers/user/auth')
route.post('/OrgLogin',login)
module.exports = route