const express = require("express");
const { addtocart, getusercart, updatetocart } = require("../controllers/cartcontroller");
const userauth= require('../middleware/auth.js')
const cartrouter = express.Router();


cartrouter.post("/addtocart", userauth,addtocart);
cartrouter.get("/getcart",userauth, getusercart);
cartrouter.put("/update",userauth, updatetocart);

module.exports = cartrouter;
