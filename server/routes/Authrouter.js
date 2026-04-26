const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../model/user");
require("../config/passport_google");

const { signup, login, logout, GetOtherUsers } = require("../controller/user");
const isAuthenticated = require("../middleware/AuthMiddleware");
const {
  forgetpassword,
  verifyOtp,
  resetpassword,
} = require("../controller/Forgetpasswordcontroller");
const usermodel = require("../model/user");
const message = require("../model/messagemodel");

const route = express.Router();
route.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

route.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: `http://localhost:5173/login?error=${encodeURIComponent("GitHub authentication failed")}`,
    session: false,
  }),

  (req, res) => {
    const user = req.user;

    if (!user) {
      console.log("no user from the github strategy ");
      return res.redirect(`http://localhost:5173/login?error=${encodeURIComponent("GitHub authentication failed")}`);
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });

    res.redirect(`http://localhost:5173/homepage?token=${token}`);
  }
);

//google sso
route.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);
route.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `http://localhost:5173/login?error=${encodeURIComponent("Google authentication failed")}`,
    session: false,
  }),
  (req, res) => {
    const user = req.user;
    if (!user) {
      return res.redirect(`http://localhost:5173/login?error=${encodeURIComponent("Google authentication failed")}`);
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    }).header("Authorization", "Bearer " + token)
    .redirect(`http://localhost:5173/homepage?token=${token}`);
  }
);

route.get("/me",isAuthenticated,async(req,res)=>{
  try{
    const user = await User.findById(req.id).select("-password");
    if(!user){
      return res.status(404).json({
        success:false,
        message:"user not found "
      })
    }
    res.status(200).json({
      success:true,
      user
    })
  }catch(err){
    console.error(err);
    res.status(500).json({
      success:false,
      message:"internal server error"
    })
  }
})

route.post("/signup", signup);
route.post("/login", login);
route.get("/logout", logout);
route.get("/", isAuthenticated, GetOtherUsers);
route.post("/forgetpassword", forgetpassword);
route.post("/verify-otp", verifyOtp);
route.post("/setnewpassword", resetpassword);

module.exports = route;
