const express = require('express');

const jwt = require("jsonwebtoken");
require("dotenv").config();
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "user not authenticated ",
      });
    }

    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    console.log(decode);

    if (!decode) {
      return res.status(401).json({
        message: "invalid token",
        success: false,
      });

    }
    req.id=decode.id;

    console.log(token);
    next();
  } catch (Err) {
    console.error(Err);
  }
};

module.exports = isAuthenticated;
 