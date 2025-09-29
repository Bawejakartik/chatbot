const express = require("express");

const { signup, login, logout, GetOtherUsers } = require("../controller/user");
const isAuthenticated = require("../middleware/AuthMiddleware");
const { forgetpassword, verifyOtp, resetpassword } = require("../controller/Forgetpasswordcontroller");

const route = express.Router();

route.post("/signup", signup);
route.post("/login", login);
route.get("/logout", logout);
route.get("/",isAuthenticated,GetOtherUsers);
route.post("/forgetpassword",forgetpassword);
route.post("/verify-otp",verifyOtp);
route.post('/setnewpassword',resetpassword);

module.exports = route;



// import express from "express";
// import { signup, login, logout, GetOtherUsers } from "../controller/user.js";
// import isAuthenticated from "../middleware/AuthMiddleware.js";
// import {
//   forgetpassword,
//   verifyOtp,
//   resetpassword,
// } from "../controller/Forgetpasswordcontroller.js";

// const route = express.Router();

// route.post("/signup", signup);
// route.post("/login", login);
// route.get("/logout", logout);
// route.get("/", isAuthenticated, GetOtherUsers);
// route.post("/forgetpassword", forgetpassword);
// route.post("/verify-otp", verifyOtp);
// route.post("/setnewpassword", resetpassword);

// export default route;

