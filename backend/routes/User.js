const express = require('express')
const route = express.Router()
const {auth,IsUSER} = require('../middlewares/verification')
const {Createuser,CreateOtp,updateUserName,updatePassword,UpdateImage,updateNUmber,CurrentLoginUser} = require('../controllers/user/Createuser')
const {login} = require('../controllers/user/auth')
const {SendMessage} = require('../controllers/common/SendMessage')
const {Comment} = require('../controllers/common/Comment')
const {PosterLike,BannerDisliked} = require('../controllers/Orgainezer/CreateTheatreShow')
const {LinkSend,ResetPassword} = require('../controllers/user/Resetpassword')
const {AllShows,usingtitle} = require('../controllers/common/Showlist')
// const {TicketPurchased,TicketPurchasedFullDetails} = require("../controllers/Dashboard/UserDashboard")

// DONE 
// This is the first route that will be used to create the user and all the things that the user will do releated to his personal info
route.post("/Create-User",Createuser)
route.post("/Create-OTP",CreateOtp) 

route.put("/Update-userName",auth,updateUserName)
route.put("/Update-Password",auth,updatePassword) 
route.put("/Update-Image",auth,UpdateImage) 
route.put("/Update-Number",auth,updateNUmber) 
route.get("/Current-UserDetails",auth,CurrentLoginUser)
// DONE

// DONE
// This is the login route
route.post("/Login",login)
// DONE

// This are the route that are going to be used to reseet thee password
// 1 Before resetting the password you neeed to send the link of the password via the email
route.post("/Send-Link",LinkSend) 
// 2 The second step is the reset the password once the link is been send
route.put("/Change-Password",ResetPassword) 

// This is the route that will help us to see all the shows that are going on
route.get("/Shows",auth,IsUSER,AllShows) 
// for Finding specific shows
route.get("/Specific-Show",auth,IsUSER,usingtitle)

// This are the route that are going to be used to like and dislike the banner
route.put("/Like-Banner",auth,PosterLike) 
route.put("/Dislike-Banner",auth,BannerDisliked) 


route.put("/Comment-Banner",auth,Comment) 

route.put("/Send-Message",auth,SendMessage) 
// This is the route that will be used to create the user dashboard and this is going to be used in the dashboard
// route.get("/Ticket-Purchased",auth,TicketPurchased)
module.exports = route      


// memphis