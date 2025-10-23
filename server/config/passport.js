const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const User = require("../model/user");
require("dotenv").config();
const bcrypt = require("bcrypt");

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
  console.warn(
    "Passport GitHub: CLIENT_ID or CLIENT_SECRET is missing or empty. Check your .env"
  );
}

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:4000/api/v8/auth/github/callback",
    },
    async (accesstoken, refreshtoken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });
        let randomPassword = Math.random().toString(36).slice(-8);
        let hashedpassword = await bcrypt.hash(randomPassword, 10);

        if (!user) {
          user = await User.create({
            username: profile.username,
            fullname: profile.displayName || profile.username,
            email: profile.emails?.[0]?.value || `github_${profile.id}@app.com`,
            githubId: profile.id,
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

passport.serializeUser((user, done) => {
  done(null, user.id);
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
