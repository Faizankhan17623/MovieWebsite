const express = require('express')
const route = express.Router()
const {auth,IsUSER} = require('../middlewares/verification')
const {MakePayment,Verifypayment} = require('../controllers/common/Payment')
// DONE
route.post("/Make-Payment",MakePayment)
route.post("/Verify-Payment",Verifypayment)
// DONE

module.exports = route