const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    profileimage: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },

    password: {
      type: String,
      required: true,
    },
    githubId:{type:String },
    googleId:{type:String},
  },
  { timestamps: true }
);

const usermodel = mongoose.model("users", userSchema);
module.exports = usermodel;
