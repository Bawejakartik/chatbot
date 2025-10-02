const express = require("express");
const { sendmessage, getmessage } = require("../controller/messagecontroller");
const route = express.Router();
const isAuthenticated = require("../middleware/AuthMiddleware");

route.post("/send/:id",isAuthenticated,sendmessage);
route.get("/get/:id",isAuthenticated,getmessage)
module.exports = route; 

