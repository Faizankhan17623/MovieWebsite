const express = require('express')
const route = express.Router()
const {auth,IsAdmin,IsOrganizer,IsViewer} = require('../middlewares/verification')
const{CreateLanguage} = require('../controllers/Orgainezer/CreateLanguage')
const {CreateTheatre} = require('../controllers/Administrator/CreateTheatres')
const {Createtags} = require('../controllers/Orgainezer/CreateHashtags')
const {Creategenre} = require('../controllers/Administrator/CreateGenre')
const {CreateSubgenre} = require('../controllers/Administrator/CreateSubGenre')
// This are the special routes to create the languages 
route.post('/CreateLanguages',auth,IsAdmin,CreateLanguage)


// THis is the route or the admin to create hashtags 
route.post('/Createhashtags',auth,IsAdmin,Createtags)

// This is the route for the admins to create theatre
route.post('/Createtheatres',auth,IsAdmin,CreateTheatre)


// This is the route that is only kept for creating the genre 
route.post('/Creategenre',auth,IsAdmin,Creategenre)


// This is the route that is kept reserved fro creating the sub genre 
route.post('/CreateSubGenre',auth,IsAdmin,CreateSubgenre)


module.exports = route