const express = require("express");
const { signup, login, logout, GetOtherUsers } = require("../controller/user");
const isAuthenticated = require("../middleware/AuthMiddleware");

const route = express.Router();

route.post("/signup", signup);
route.post("/login", login);
route.get("/logout", logout);
route.get("/",isAuthenticated,GetOtherUsers)
module.exports = route;

