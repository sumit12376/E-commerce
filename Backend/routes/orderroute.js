const express =require('express')
const {placeorder,placeorderrazorpay,placeorderstripe,allorderadmin,userorder,updatestatus,verifystripe}=require('../controllers/ordercontroleer.js')
const adminauth = require('../middleware/Adminauth.js')
const userauth = require('../middleware/auth.js')
const orderrouter=express.Router()
//admin feature

orderrouter.post('/list',adminauth,allorderadmin)
orderrouter.post('/status',adminauth,updatestatus)

// payment feature

orderrouter.post('/place',userauth, placeorder)//cod
orderrouter.post('/stripe',userauth,placeorderstripe)
orderrouter.post('/razorpay',userauth, placeorderrazorpay)
orderrouter.post('/verify',userauth, verifystripe)
//user feature

orderrouter.post('/userorders',userauth, userorder)

module.exports = orderrouter;


