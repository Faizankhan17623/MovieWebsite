const express = require('express')
const route = express.Router()
const {auth,IsOrganizer} = require('../middlewares/verification')
const {CreateShow,UpdateShowtitle,PosterLike,Dislike} = require('../controllers/Orgainezer/CreateTheatreShow')
route.post('/CreateShow',auth,IsOrganizer,CreateShow)
route.put('/UpdateTitle/:id',auth,IsOrganizer,UpdateShowtitle)
route.put('/likePoster',auth,PosterLike)
// route.put('/DislikePoster',auth,Dislike)
module.exports = route