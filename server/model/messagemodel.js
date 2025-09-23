const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usermodel",
      required: true,
    },
    receiverid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usermodel",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const message = mongoose.model("message", messageSchema);
module.exports = message;
