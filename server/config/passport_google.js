const passport = require("passport");
const User = require("../model/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const bcrypt = require("bcrypt");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://chatbot-rj8b.onrender.com/api/v8/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
      
        let user = await User.findOne({ googleId: profile.id });

        
        if (!user && email) {
          user = await User.findOne({ email: email });
          if (user) {
         
            user.googleId = profile.id;
            await user.save();
          }
        }

        if (!user) {
          let randomPassword = Math.random().toString(36).slice(-8);
          let hashedpassword = await bcrypt.hash(randomPassword, 10);

          user = await User.create({
            username: profile.displayName,
            fullname: profile.displayName,
            email: email || `google_${profile.id}@app.com`,
            googleId: profile.id,
            profileimage: profile.photos?.[0]?.value || "",
            password: hashedpassword,
          });
        }
        return done(null, user);
      } catch (err) {
        console.log(err);
        return done(err, null);
      }
    }
  )
);
passport.serializeUser((userId, done) => {
  done(null, userId);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
