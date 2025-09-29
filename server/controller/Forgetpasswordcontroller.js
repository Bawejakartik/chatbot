const express = require("express");
const User = require("../model/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrpyt = require("bcrypt");
const {sendEmail} = require("../config/emailconfig")
require("dotenv").config();



exports.forgetpassword = async (req, res) => {
 try{
 const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(402).json({
      success: false,
      message: "user mail is not register , please sign up firstly ",
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const token = await jwt.sign({ email, otp }, process.env.SECRET_KEY, {
    expiresIn: "10m",
  });


res.cookie('resetToken' ,token,{

  httpOnly:true,
   maxAge: 15 * 60 * 1000,

})
await sendEmail({to:email,subject:"password reset otp ",otp})
res.status(200).json({
  success: true,
  message: "otp is send to the registered mail ",
  token,
});
 }
 catch(err){
      console.log(err);
      return res.status(500).json({
        success:false,
        message:"server error "
      })
 }

}

exports.verifyOtp = async (req, res) => {
  try {
    const { otp} = req.body;

   const token =
      req.cookies.resetToken || req.headers.authorization?.split(" ")[1]; 
    
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.otp !== otp) {
      return res.status(402).json({
        success: false,
        message: "invalid otp ",
      });
    }
    const resetToken = jwt.sign(
      { email: decoded.email },
      process.env.SECRET_KEY,
      { expiresIn: "10m" }
    );

      res.cookie("resetToken", resetToken, {
      httpOnly: true,
    
      maxAge: 10 * 60 * 1000,
    });


    return res.status(201).json({ success: true, message: "correct otp" });
  } catch (err) {
    console.log(err);
    return res.status(501).json({
      success: false,
      message: "otp is expired ",
    });
  }
};


exports.resetpassword =async(req,res) =>{
try{

    
    const { newpassword } = req.body;

    
    const token =
      req.cookies.resetToken || req.headers.authorization?.split(" ")[1];


    if (!token) {
      return res.status(404).json({
        success: false,
        message: "unauthorized",
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(402).json({
        success: false,
        message: "user not found ",
      });
    }
 const hashedpassword =  await   bcrpyt.hash(newpassword,10);
   user.password = hashedpassword;
   await user.save();
    
  


  res.status(201).json({
    success:true,
    message:"password reset successfully",
  })

   res.clearCookie("resetToken");

}
catch(err){
    console.log(err);
    return res.status(501).json({
        success:false,
        message:"resetpassword expired "
    })
}
}