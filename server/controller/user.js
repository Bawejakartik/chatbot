const express = require("express");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



exports.signup = async (req, res) => {
  try {
    const { fullname, username, email, password, gender } = req.body;

    if (!fullname || !username || !email || !password || !gender) {
      return res.status(401).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existinguser = await User.findOne({ $or: [{ email }, { username }] });
    if (existinguser) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

   
    const maleprofileimage = `https://api.dicebear.com/9.x/adventurer/svg?seed=${username}`;
    const femaleprofileimage = `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${username}`;

    const user = await User.create({
      fullname,
      username,
      gender,
      email,
      profileimage: gender.toLowerCase() === "male" ? maleprofileimage : femaleprofileimage,
      password: hashedpassword,
    });

    return res.status(200).json({
      user,
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "User not registered. Try again later.",
    });
  }
};



exports.login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !password || !email) {
      return res.status(401).json({
        success: false,
        message: "enter the both filled ",
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "please register for further process",
      });
    }
    const payload = {
      id: user._id,
    };

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "2h",
      });
      const option = {
        expiresIn: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, option).status(200).json({
        success: true,
        user,
        
        token,
        message: "user loggedin successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message:
          "your password is incorrect so please fill the true cridentials",
      });
    }
  } catch (err) {
    console.error(err);

    return res.status(501).json({
      success: false,
      message: "login failure",
    });
  }
};

exports.logout = (req, res) => {
  try {
    const option = {
      expiresIn: 0,
    };

    return res.status(200).cookie("token", "", option).json({
      success: true,

      message: "user logout successfully",
    });
  } catch (err) {
    console.error(err);
  }
};

exports.GetOtherUsers = async (req, res) => {
  try {
    const loggedinUserid = req.id;
    const otheruser = await User.find({ _id: { $ne: loggedinUserid } }).select(
      "-password"
    );
    return res.status(200).json({
      otheruser,
    });
  } catch (err) {
    console.log(err);
    
  }
};
