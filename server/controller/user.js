const express = require("express");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(401).json({
        success: false,
        message: "user is already loggedin ",
      });
    }

    let hashedpassword;
    try {
      hashedpassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "error in hashing password",
      });
    }

    const user = await User.create({
      name,
      email,
      password: hashedpassword,
    });

    return res.status(200).json({
      success: true,
      message: "user created successfully ",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "user not registered  try again later ",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email , password } = req.body;

    if (!password || !email) {
      return res.status(401).json({
        success: false,
        message: "enter the both filled ",
      });
    }
   let  user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "please register for further process",
      });
    }
 const payload = {
   id: user._id,
   email: user.email,
 };

    if (await bcrypt.compare(password, user.password)) {
     
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "2h",

      
      });
      const option = {
        expiresIn:new Date(Date.now()+2*24*60*60*1000),
        httpOnly:true,
      }

      res.cookie("token",token,option).status(200).json({
        success:true,
        token,
       message:"user loggedin successfully",

      })
      
    }
    else{
        return res.status(401).json({
            success:false,
            message:"your password is incorrect so please fill the true cridentials"
        });

    }
  } catch (err) {
    console.error(err);

    return res.status(501).json({
        success:false,
        message:"login failure"
        })
  }
};
