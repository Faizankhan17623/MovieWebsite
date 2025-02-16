// This is the orgainezer personal route the Things that the org will do will come here
const express = require('express')
const route = express.Router()

const {Createtags} = require('../controllers/Orgainezer/CreateHashtags')
const {auth,IsOrganizer} = require('../middlewares/verification')
const {CreateOrgainezer} = require('../controllers/Orgainezer/CreateOrg')
const {login} = require('../controllers/user/auth')
const {CreateTicket} = require('../controllers/Orgainezer/CreateTicket')
// The login route will be the same for both of them we can just create a seperate route but it need to be redirected to the main login page only
// There is a seperate route to create orgainezer 
route.post('/CreateOrgainezer',CreateOrgainezer)

route.post('/OrgainezerLogin',(req,res)=>{
    res.redirect('/Login')
},login)

route.post('/Createhashtags',auth,IsOrganizer,Createtags)
route.post('/CreateTicket',auth,IsOrganizer,CreateTicket)

module.exports = route